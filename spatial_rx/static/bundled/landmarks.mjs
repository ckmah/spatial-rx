var lg = (i) => {
  throw TypeError(i);
};
var ag = (i, r, c) => r.has(i) || lg("Cannot " + c);
var Bt = (i, r, c) => (ag(i, r, "read from private field"), c ? c.call(i) : r.get(i)), ig = (i, r, c) => r.has(i) ? lg("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(i) : r.set(i, c), zs = (i, r, c, u) => (ag(i, r, "write to private field"), u ? u.call(i, c) : r.set(i, c), c);
function Vy(i, r) {
  for (var c = 0; c < r.length; c++) {
    const u = r[c];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const d in u)
        if (d !== "default" && !(d in i)) {
          const f = Object.getOwnPropertyDescriptor(u, d);
          f && Object.defineProperty(i, d, f.get ? f : {
            enumerable: !0,
            get: () => u[d]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
function Yy(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var ws = { exports: {} }, xo = {};
var og;
function qy() {
  if (og) return xo;
  og = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
  function c(u, d, f) {
    var h = null;
    if (f !== void 0 && (h = "" + f), d.key !== void 0 && (h = "" + d.key), "key" in d) {
      f = {};
      for (var b in d)
        b !== "key" && (f[b] = d[b]);
    } else f = d;
    return d = f.ref, {
      $$typeof: i,
      type: u,
      key: h,
      ref: d !== void 0 ? d : null,
      props: f
    };
  }
  return xo.Fragment = r, xo.jsx = c, xo.jsxs = c, xo;
}
var rg;
function Xy() {
  return rg || (rg = 1, ws.exports = qy()), ws.exports;
}
var y = Xy(), Rs = { exports: {} }, So = {}, Ns = { exports: {} }, Os = {};
var ug;
function Zy() {
  return ug || (ug = 1, (function(i) {
    function r(D, X) {
      var ce = D.length;
      D.push(X);
      e: for (; 0 < ce; ) {
        var Re = ce - 1 >>> 1, ne = D[Re];
        if (0 < d(ne, X))
          D[Re] = X, D[ce] = ne, ce = Re;
        else break e;
      }
    }
    function c(D) {
      return D.length === 0 ? null : D[0];
    }
    function u(D) {
      if (D.length === 0) return null;
      var X = D[0], ce = D.pop();
      if (ce !== X) {
        D[0] = ce;
        e: for (var Re = 0, ne = D.length, C = ne >>> 1; Re < C; ) {
          var V = 2 * (Re + 1) - 1, ee = D[V], F = V + 1, oe = D[F];
          if (0 > d(ee, ce))
            F < ne && 0 > d(oe, ee) ? (D[Re] = oe, D[F] = ce, Re = F) : (D[Re] = ee, D[V] = ce, Re = V);
          else if (F < ne && 0 > d(oe, ce))
            D[Re] = oe, D[F] = ce, Re = F;
          else break e;
        }
      }
      return X;
    }
    function d(D, X) {
      var ce = D.sortIndex - X.sortIndex;
      return ce !== 0 ? ce : D.id - X.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      i.unstable_now = function() {
        return f.now();
      };
    } else {
      var h = Date, b = h.now();
      i.unstable_now = function() {
        return h.now() - b;
      };
    }
    var p = [], g = [], z = 1, E = null, M = 3, k = !1, q = !1, Q = !1, W = !1, $ = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    function le(D) {
      for (var X = c(g); X !== null; ) {
        if (X.callback === null) u(g);
        else if (X.startTime <= D)
          u(g), X.sortIndex = X.expirationTime, r(p, X);
        else break;
        X = c(g);
      }
    }
    function me(D) {
      if (Q = !1, le(D), !q)
        if (c(p) !== null)
          q = !0, fe || (fe = !0, we());
        else {
          var X = c(g);
          X !== null && Xe(me, X.startTime - D);
        }
    }
    var fe = !1, ie = -1, P = 5, ae = -1;
    function Se() {
      return W ? !0 : !(i.unstable_now() - ae < P);
    }
    function Ae() {
      if (W = !1, fe) {
        var D = i.unstable_now();
        ae = D;
        var X = !0;
        try {
          e: {
            q = !1, Q && (Q = !1, L(ie), ie = -1), k = !0;
            var ce = M;
            try {
              t: {
                for (le(D), E = c(p); E !== null && !(E.expirationTime > D && Se()); ) {
                  var Re = E.callback;
                  if (typeof Re == "function") {
                    E.callback = null, M = E.priorityLevel;
                    var ne = Re(
                      E.expirationTime <= D
                    );
                    if (D = i.unstable_now(), typeof ne == "function") {
                      E.callback = ne, le(D), X = !0;
                      break t;
                    }
                    E === c(p) && u(p), le(D);
                  } else u(p);
                  E = c(p);
                }
                if (E !== null) X = !0;
                else {
                  var C = c(g);
                  C !== null && Xe(
                    me,
                    C.startTime - D
                  ), X = !1;
                }
              }
              break e;
            } finally {
              E = null, M = ce, k = !1;
            }
            X = void 0;
          }
        } finally {
          X ? we() : fe = !1;
        }
      }
    }
    var we;
    if (typeof J == "function")
      we = function() {
        J(Ae);
      };
    else if (typeof MessageChannel < "u") {
      var We = new MessageChannel(), Fe = We.port2;
      We.port1.onmessage = Ae, we = function() {
        Fe.postMessage(null);
      };
    } else
      we = function() {
        $(Ae, 0);
      };
    function Xe(D, X) {
      ie = $(function() {
        D(i.unstable_now());
      }, X);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, i.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : P = 0 < D ? Math.floor(1e3 / D) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, i.unstable_next = function(D) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = M;
      }
      var ce = M;
      M = X;
      try {
        return D();
      } finally {
        M = ce;
      }
    }, i.unstable_requestPaint = function() {
      W = !0;
    }, i.unstable_runWithPriority = function(D, X) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var ce = M;
      M = D;
      try {
        return X();
      } finally {
        M = ce;
      }
    }, i.unstable_scheduleCallback = function(D, X, ce) {
      var Re = i.unstable_now();
      switch (typeof ce == "object" && ce !== null ? (ce = ce.delay, ce = typeof ce == "number" && 0 < ce ? Re + ce : Re) : ce = Re, D) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return ne = ce + ne, D = {
        id: z++,
        callback: X,
        priorityLevel: D,
        startTime: ce,
        expirationTime: ne,
        sortIndex: -1
      }, ce > Re ? (D.sortIndex = ce, r(g, D), c(p) === null && D === c(g) && (Q ? (L(ie), ie = -1) : Q = !0, Xe(me, ce - Re))) : (D.sortIndex = ne, r(p, D), q || k || (q = !0, fe || (fe = !0, we()))), D;
    }, i.unstable_shouldYield = Se, i.unstable_wrapCallback = function(D) {
      var X = M;
      return function() {
        var ce = M;
        M = X;
        try {
          return D.apply(this, arguments);
        } finally {
          M = ce;
        }
      };
    };
  })(Os)), Os;
}
var cg;
function Qy() {
  return cg || (cg = 1, Ns.exports = Zy()), Ns.exports;
}
var Ds = { exports: {} }, Ee = {};
var sg;
function Ky() {
  if (sg) return Ee;
  sg = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), d = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), b = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), g = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), E = /* @__PURE__ */ Symbol.for("react.activity"), M = Symbol.iterator;
  function k(C) {
    return C === null || typeof C != "object" ? null : (C = M && C[M] || C["@@iterator"], typeof C == "function" ? C : null);
  }
  var q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Q = Object.assign, W = {};
  function $(C, V, ee) {
    this.props = C, this.context = V, this.refs = W, this.updater = ee || q;
  }
  $.prototype.isReactComponent = {}, $.prototype.setState = function(C, V) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, V, "setState");
  }, $.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function L() {
  }
  L.prototype = $.prototype;
  function J(C, V, ee) {
    this.props = C, this.context = V, this.refs = W, this.updater = ee || q;
  }
  var le = J.prototype = new L();
  le.constructor = J, Q(le, $.prototype), le.isPureReactComponent = !0;
  var me = Array.isArray;
  function fe() {
  }
  var ie = { H: null, A: null, T: null, S: null }, P = Object.prototype.hasOwnProperty;
  function ae(C, V, ee) {
    var F = ee.ref;
    return {
      $$typeof: i,
      type: C,
      key: V,
      ref: F !== void 0 ? F : null,
      props: ee
    };
  }
  function Se(C, V) {
    return ae(C.type, V, C.props);
  }
  function Ae(C) {
    return typeof C == "object" && C !== null && C.$$typeof === i;
  }
  function we(C) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(ee) {
      return V[ee];
    });
  }
  var We = /\/+/g;
  function Fe(C, V) {
    return typeof C == "object" && C !== null && C.key != null ? we("" + C.key) : V.toString(36);
  }
  function Xe(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then(fe, fe) : (C.status = "pending", C.then(
          function(V) {
            C.status === "pending" && (C.status = "fulfilled", C.value = V);
          },
          function(V) {
            C.status === "pending" && (C.status = "rejected", C.reason = V);
          }
        )), C.status) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function D(C, V, ee, F, oe) {
    var he = typeof C;
    (he === "undefined" || he === "boolean") && (C = null);
    var Te = !1;
    if (C === null) Te = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          Te = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case i:
            case r:
              Te = !0;
              break;
            case z:
              return Te = C._init, D(
                Te(C._payload),
                V,
                ee,
                F,
                oe
              );
          }
      }
    if (Te)
      return oe = oe(C), Te = F === "" ? "." + Fe(C, 0) : F, me(oe) ? (ee = "", Te != null && (ee = Te.replace(We, "$&/") + "/"), D(oe, V, ee, "", function(Vt) {
        return Vt;
      })) : oe != null && (Ae(oe) && (oe = Se(
        oe,
        ee + (oe.key == null || C && C.key === oe.key ? "" : ("" + oe.key).replace(
          We,
          "$&/"
        ) + "/") + Te
      )), V.push(oe)), 1;
    Te = 0;
    var Ie = F === "" ? "." : F + ":";
    if (me(C))
      for (var _e = 0; _e < C.length; _e++)
        F = C[_e], he = Ie + Fe(F, _e), Te += D(
          F,
          V,
          ee,
          he,
          oe
        );
    else if (_e = k(C), typeof _e == "function")
      for (C = _e.call(C), _e = 0; !(F = C.next()).done; )
        F = F.value, he = Ie + Fe(F, _e++), Te += D(
          F,
          V,
          ee,
          he,
          oe
        );
    else if (he === "object") {
      if (typeof C.then == "function")
        return D(
          Xe(C),
          V,
          ee,
          F,
          oe
        );
      throw V = String(C), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Te;
  }
  function X(C, V, ee) {
    if (C == null) return C;
    var F = [], oe = 0;
    return D(C, F, "", "", function(he) {
      return V.call(ee, he, oe++);
    }), F;
  }
  function ce(C) {
    if (C._status === -1) {
      var V = C._result;
      V = V(), V.then(
        function(ee) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = ee);
        },
        function(ee) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = ee);
        }
      ), C._status === -1 && (C._status = 0, C._result = V);
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var Re = typeof reportError == "function" ? reportError : function(C) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof C == "object" && C !== null && typeof C.message == "string" ? String(C.message) : String(C),
        error: C
      });
      if (!window.dispatchEvent(V)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", C);
      return;
    }
    console.error(C);
  }, ne = {
    map: X,
    forEach: function(C, V, ee) {
      X(
        C,
        function() {
          V.apply(this, arguments);
        },
        ee
      );
    },
    count: function(C) {
      var V = 0;
      return X(C, function() {
        V++;
      }), V;
    },
    toArray: function(C) {
      return X(C, function(V) {
        return V;
      }) || [];
    },
    only: function(C) {
      if (!Ae(C))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return C;
    }
  };
  return Ee.Activity = E, Ee.Children = ne, Ee.Component = $, Ee.Fragment = c, Ee.Profiler = d, Ee.PureComponent = J, Ee.StrictMode = u, Ee.Suspense = p, Ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, Ee.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(C) {
      return ie.H.useMemoCache(C);
    }
  }, Ee.cache = function(C) {
    return function() {
      return C.apply(null, arguments);
    };
  }, Ee.cacheSignal = function() {
    return null;
  }, Ee.cloneElement = function(C, V, ee) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var F = Q({}, C.props), oe = C.key;
    if (V != null)
      for (he in V.key !== void 0 && (oe = "" + V.key), V)
        !P.call(V, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && V.ref === void 0 || (F[he] = V[he]);
    var he = arguments.length - 2;
    if (he === 1) F.children = ee;
    else if (1 < he) {
      for (var Te = Array(he), Ie = 0; Ie < he; Ie++)
        Te[Ie] = arguments[Ie + 2];
      F.children = Te;
    }
    return ae(C.type, oe, F);
  }, Ee.createContext = function(C) {
    return C = {
      $$typeof: h,
      _currentValue: C,
      _currentValue2: C,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, C.Provider = C, C.Consumer = {
      $$typeof: f,
      _context: C
    }, C;
  }, Ee.createElement = function(C, V, ee) {
    var F, oe = {}, he = null;
    if (V != null)
      for (F in V.key !== void 0 && (he = "" + V.key), V)
        P.call(V, F) && F !== "key" && F !== "__self" && F !== "__source" && (oe[F] = V[F]);
    var Te = arguments.length - 2;
    if (Te === 1) oe.children = ee;
    else if (1 < Te) {
      for (var Ie = Array(Te), _e = 0; _e < Te; _e++)
        Ie[_e] = arguments[_e + 2];
      oe.children = Ie;
    }
    if (C && C.defaultProps)
      for (F in Te = C.defaultProps, Te)
        oe[F] === void 0 && (oe[F] = Te[F]);
    return ae(C, he, oe);
  }, Ee.createRef = function() {
    return { current: null };
  }, Ee.forwardRef = function(C) {
    return { $$typeof: b, render: C };
  }, Ee.isValidElement = Ae, Ee.lazy = function(C) {
    return {
      $$typeof: z,
      _payload: { _status: -1, _result: C },
      _init: ce
    };
  }, Ee.memo = function(C, V) {
    return {
      $$typeof: g,
      type: C,
      compare: V === void 0 ? null : V
    };
  }, Ee.startTransition = function(C) {
    var V = ie.T, ee = {};
    ie.T = ee;
    try {
      var F = C(), oe = ie.S;
      oe !== null && oe(ee, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(fe, Re);
    } catch (he) {
      Re(he);
    } finally {
      V !== null && ee.types !== null && (V.types = ee.types), ie.T = V;
    }
  }, Ee.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, Ee.use = function(C) {
    return ie.H.use(C);
  }, Ee.useActionState = function(C, V, ee) {
    return ie.H.useActionState(C, V, ee);
  }, Ee.useCallback = function(C, V) {
    return ie.H.useCallback(C, V);
  }, Ee.useContext = function(C) {
    return ie.H.useContext(C);
  }, Ee.useDebugValue = function() {
  }, Ee.useDeferredValue = function(C, V) {
    return ie.H.useDeferredValue(C, V);
  }, Ee.useEffect = function(C, V) {
    return ie.H.useEffect(C, V);
  }, Ee.useEffectEvent = function(C) {
    return ie.H.useEffectEvent(C);
  }, Ee.useId = function() {
    return ie.H.useId();
  }, Ee.useImperativeHandle = function(C, V, ee) {
    return ie.H.useImperativeHandle(C, V, ee);
  }, Ee.useInsertionEffect = function(C, V) {
    return ie.H.useInsertionEffect(C, V);
  }, Ee.useLayoutEffect = function(C, V) {
    return ie.H.useLayoutEffect(C, V);
  }, Ee.useMemo = function(C, V) {
    return ie.H.useMemo(C, V);
  }, Ee.useOptimistic = function(C, V) {
    return ie.H.useOptimistic(C, V);
  }, Ee.useReducer = function(C, V, ee) {
    return ie.H.useReducer(C, V, ee);
  }, Ee.useRef = function(C) {
    return ie.H.useRef(C);
  }, Ee.useState = function(C) {
    return ie.H.useState(C);
  }, Ee.useSyncExternalStore = function(C, V, ee) {
    return ie.H.useSyncExternalStore(
      C,
      V,
      ee
    );
  }, Ee.useTransition = function() {
    return ie.H.useTransition();
  }, Ee.version = "19.2.8", Ee;
}
var fg;
function cf() {
  return fg || (fg = 1, Ds.exports = Ky()), Ds.exports;
}
var js = { exports: {} }, Gt = {};
var dg;
function Jy() {
  if (dg) return Gt;
  dg = 1;
  var i = cf();
  function r(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var z = 2; z < arguments.length; z++)
        g += "&args[]=" + encodeURIComponent(arguments[z]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var u = {
    d: {
      f: c,
      r: function() {
        throw Error(r(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, d = /* @__PURE__ */ Symbol.for("react.portal");
  function f(p, g, z) {
    var E = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: E == null ? null : "" + E,
      children: p,
      containerInfo: g,
      implementation: z
    };
  }
  var h = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function b(p, g) {
    if (p === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return Gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, Gt.createPortal = function(p, g) {
    var z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(r(299));
    return f(p, g, null, z);
  }, Gt.flushSync = function(p) {
    var g = h.T, z = u.p;
    try {
      if (h.T = null, u.p = 2, p) return p();
    } finally {
      h.T = g, u.p = z, u.d.f();
    }
  }, Gt.preconnect = function(p, g) {
    typeof p == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, u.d.C(p, g));
  }, Gt.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, Gt.preinit = function(p, g) {
    if (typeof p == "string" && g && typeof g.as == "string") {
      var z = g.as, E = b(z, g.crossOrigin), M = typeof g.integrity == "string" ? g.integrity : void 0, k = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      z === "style" ? u.d.S(
        p,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: E,
          integrity: M,
          fetchPriority: k
        }
      ) : z === "script" && u.d.X(p, {
        crossOrigin: E,
        integrity: M,
        fetchPriority: k,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, Gt.preinitModule = function(p, g) {
    if (typeof p == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var z = b(
            g.as,
            g.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: z,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && u.d.M(p);
  }, Gt.preload = function(p, g) {
    if (typeof p == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var z = g.as, E = b(z, g.crossOrigin);
      u.d.L(p, z, {
        crossOrigin: E,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, Gt.preloadModule = function(p, g) {
    if (typeof p == "string")
      if (g) {
        var z = b(g.as, g.crossOrigin);
        u.d.m(p, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: z,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else u.d.m(p);
  }, Gt.requestFormReset = function(p) {
    u.d.r(p);
  }, Gt.unstable_batchedUpdates = function(p, g) {
    return p(g);
  }, Gt.useFormState = function(p, g, z) {
    return h.H.useFormState(p, g, z);
  }, Gt.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, Gt.version = "19.2.8", Gt;
}
var hg;
function qg() {
  if (hg) return js.exports;
  hg = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (r) {
        console.error(r);
      }
  }
  return i(), js.exports = Jy(), js.exports;
}
var mg;
function $y() {
  if (mg) return So;
  mg = 1;
  var i = Qy(), r = cf(), c = qg();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function f(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function b(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (f(e) !== e)
      throw Error(u(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var o = a.alternate;
      if (o === null) {
        if (l = a.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === o.child) {
        for (o = a.child; o; ) {
          if (o === n) return p(a), e;
          if (o === l) return p(a), t;
          o = o.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== l.return) n = a, l = o;
      else {
        for (var s = !1, m = a.child; m; ) {
          if (m === n) {
            s = !0, n = a, l = o;
            break;
          }
          if (m === l) {
            s = !0, l = a, n = o;
            break;
          }
          m = m.sibling;
        }
        if (!s) {
          for (m = o.child; m; ) {
            if (m === n) {
              s = !0, n = o, l = a;
              break;
            }
            if (m === l) {
              s = !0, l = o, n = a;
              break;
            }
            m = m.sibling;
          }
          if (!s) throw Error(u(189));
        }
      }
      if (n.alternate !== l) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function z(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = z(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var E = Object.assign, M = /* @__PURE__ */ Symbol.for("react.element"), k = /* @__PURE__ */ Symbol.for("react.transitional.element"), q = /* @__PURE__ */ Symbol.for("react.portal"), Q = /* @__PURE__ */ Symbol.for("react.fragment"), W = /* @__PURE__ */ Symbol.for("react.strict_mode"), $ = /* @__PURE__ */ Symbol.for("react.profiler"), L = /* @__PURE__ */ Symbol.for("react.consumer"), J = /* @__PURE__ */ Symbol.for("react.context"), le = /* @__PURE__ */ Symbol.for("react.forward_ref"), me = /* @__PURE__ */ Symbol.for("react.suspense"), fe = /* @__PURE__ */ Symbol.for("react.suspense_list"), ie = /* @__PURE__ */ Symbol.for("react.memo"), P = /* @__PURE__ */ Symbol.for("react.lazy"), ae = /* @__PURE__ */ Symbol.for("react.activity"), Se = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ae = Symbol.iterator;
  function we(e) {
    return e === null || typeof e != "object" ? null : (e = Ae && e[Ae] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var We = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Fe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === We ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Q:
        return "Fragment";
      case $:
        return "Profiler";
      case W:
        return "StrictMode";
      case me:
        return "Suspense";
      case fe:
        return "SuspenseList";
      case ae:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case q:
          return "Portal";
        case J:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case le:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return t = e.displayName || null, t !== null ? t : Fe(e.type) || "Memo";
        case P:
          t = e._payload, e = e._init;
          try {
            return Fe(e(t));
          } catch {
          }
      }
    return null;
  }
  var Xe = Array.isArray, D = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Re = [], ne = -1;
  function C(e) {
    return { current: e };
  }
  function V(e) {
    0 > ne || (e.current = Re[ne], Re[ne] = null, ne--);
  }
  function ee(e, t) {
    ne++, Re[ne] = e.current, e.current = t;
  }
  var F = C(null), oe = C(null), he = C(null), Te = C(null);
  function Ie(e, t) {
    switch (ee(he, t), ee(oe, e), ee(F, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Tm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Tm(t), e = Mm(t, e);
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
    V(F), ee(F, e);
  }
  function _e() {
    V(F), V(oe), V(he);
  }
  function Vt(e) {
    e.memoizedState !== null && ee(Te, e);
    var t = F.current, n = Mm(t, e.type);
    t !== n && (ee(oe, e), ee(F, n));
  }
  function Tt(e) {
    oe.current === e && (V(F), V(oe)), Te.current === e && (V(Te), po._currentValue = ce);
  }
  var Mt, Yt;
  function ct(e) {
    if (Mt === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Mt = t && t[1] || "", Yt = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Mt + e + Yt;
  }
  var Ft = !1;
  function za(e, t) {
    if (!e || Ft) return "";
    Ft = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var K = function() {
                throw Error();
              };
              if (Object.defineProperty(K.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(K, []);
                } catch (U) {
                  var j = U;
                }
                Reflect.construct(e, [], K);
              } else {
                try {
                  K.call();
                } catch (U) {
                  j = U;
                }
                e.call(K.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                j = U;
              }
              (K = e()) && typeof K.catch == "function" && K.catch(function() {
              });
            }
          } catch (U) {
            if (U && j && typeof U.stack == "string")
              return [U.stack, j.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var o = l.DetermineComponentFrameRoot(), s = o[0], m = o[1];
      if (s && m) {
        var _ = s.split(`
`), O = m.split(`
`);
        for (a = l = 0; l < _.length && !_[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; a < O.length && !O[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (l === _.length || a === O.length)
          for (l = _.length - 1, a = O.length - 1; 1 <= l && 0 <= a && _[l] !== O[a]; )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (_[l] !== O[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || _[l] !== O[a]) {
                  var B = `
` + _[l].replace(" at new ", " at ");
                  return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      Ft = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? ct(n) : "";
  }
  function Go(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ct(e.type);
      case 16:
        return ct("Lazy");
      case 13:
        return e.child !== t && t !== null ? ct("Suspense Fallback") : ct("Suspense");
      case 19:
        return ct("SuspenseList");
      case 0:
      case 15:
        return za(e.type, !1);
      case 11:
        return za(e.type.render, !1);
      case 1:
        return za(e.type, !0);
      case 31:
        return ct("Activity");
      default:
        return "";
    }
  }
  function Jl(e) {
    try {
      var t = "", n = null;
      do
        t += Go(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var wa = Object.prototype.hasOwnProperty, $l = i.unstable_scheduleCallback, Ra = i.unstable_cancelCallback, Vo = i.unstable_shouldYield, Na = i.unstable_requestPaint, yt = i.unstable_now, Yo = i.unstable_getCurrentPriorityLevel, Pl = i.unstable_ImmediatePriority, Ot = i.unstable_UserBlockingPriority, Oa = i.unstable_NormalPriority, Su = i.unstable_LowPriority, Rn = i.unstable_IdlePriority, _u = i.log, Eu = i.unstable_setDisableYieldValue, xl = null, dt = null;
  function _n(e) {
    if (typeof _u == "function" && Eu(e), dt && typeof dt.setStrictMode == "function")
      try {
        dt.setStrictMode(xl, e);
      } catch {
      }
  }
  var Ht = Math.clz32 ? Math.clz32 : Tu, Au = Math.log, Cu = Math.LN2;
  function Tu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Au(e) / Cu | 0) | 0;
  }
  var Da = 256, ja = 262144, ka = 4194304;
  function Vn(e) {
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
  function Ua(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0, o = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var m = l & 134217727;
    return m !== 0 ? (l = m & ~o, l !== 0 ? a = Vn(l) : (s &= m, s !== 0 ? a = Vn(s) : n || (n = m & ~e, n !== 0 && (a = Vn(n))))) : (m = l & ~o, m !== 0 ? a = Vn(m) : s !== 0 ? a = Vn(s) : n || (n = l & ~e, n !== 0 && (a = Vn(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & o) === 0 && (o = a & -a, n = t & -t, o >= n || o === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function Wl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mu(e, t) {
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
  function qo() {
    var e = ka;
    return ka <<= 1, (ka & 62914560) === 0 && (ka = 4194304), e;
  }
  function Ti(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Fl(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Mi(e, t, n, l, a, o) {
    var s = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var m = e.entanglements, _ = e.expirationTimes, O = e.hiddenUpdates;
    for (n = s & ~n; 0 < n; ) {
      var B = 31 - Ht(n), K = 1 << B;
      m[B] = 0, _[B] = -1;
      var j = O[B];
      if (j !== null)
        for (O[B] = null, B = 0; B < j.length; B++) {
          var U = j[B];
          U !== null && (U.lane &= -536870913);
        }
      n &= ~K;
    }
    l !== 0 && La(e, l, 0), o !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(s & ~t));
  }
  function La(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Ht(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function zi(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - Ht(n), a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), n &= ~a;
    }
  }
  function wi(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Il(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function Il(e) {
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
  function ea(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ke() {
    var e = X.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Pm(e.type));
  }
  function Xo(e, t) {
    var n = X.p;
    try {
      return X.p = e, t();
    } finally {
      X.p = n;
    }
  }
  var En = Math.random().toString(36).slice(2), xt = "__reactFiber$" + En, St = "__reactProps$" + En, Yn = "__reactContainer$" + En, Ha = "__reactEvents$" + En, Zo = "__reactListeners$" + En, Ba = "__reactHandles$" + En, Qo = "__reactResources$" + En, Nn = "__reactMarker$" + En;
  function Ga(e) {
    delete e[xt], delete e[St], delete e[Ha], delete e[Zo], delete e[Ba];
  }
  function On(e) {
    var t = e[xt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Yn] || n[xt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = jm(e); e !== null; ) {
            if (n = e[xt]) return n;
            e = jm(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Sl(e) {
    if (e = e[xt] || e[Yn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ta(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function qn(e) {
    var t = e[Qo];
    return t || (t = e[Qo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ht(e) {
    e[Nn] = !0;
  }
  var Ko = /* @__PURE__ */ new Set(), Jo = {};
  function Xn(e, t) {
    Zn(e, t), Zn(e + "Capture", t);
  }
  function Zn(e, t) {
    for (Jo[e] = t, e = 0; e < t.length; e++)
      Ko.add(t[e]);
  }
  var Qn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), An = {}, Ri = {};
  function zu(e) {
    return wa.call(Ri, e) ? !0 : wa.call(An, e) ? !1 : Qn.test(e) ? Ri[e] = !0 : (An[e] = !0, !1);
  }
  function Va(e, t, n) {
    if (zu(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Ya(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Cn(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  function Zt(e) {
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
  function $o(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function wu(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var a = l.get, o = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(s) {
          n = "" + s, o.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(s) {
          n = "" + s;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ni(e) {
    if (!e._valueTracker) {
      var t = $o(e) ? "checked" : "value";
      e._valueTracker = wu(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Oi(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = $o(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function cn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Po = /[\n"\\]/g;
  function nt(e) {
    return e.replace(
      Po,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function na(e, t, n, l, a, o, s, m) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? la(e, s, Zt(t)) : n != null ? la(e, s, Zt(n)) : l != null && e.removeAttribute("value"), a == null && o != null && (e.defaultChecked = !!o), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.name = "" + Zt(m) : e.removeAttribute("name");
  }
  function _l(e, t, n, l, a, o, s, m) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.type = o), t != null || n != null) {
      if (!(o !== "submit" && o !== "reset" || t != null)) {
        Ni(e);
        return;
      }
      n = n != null ? "" + Zt(n) : "", t = t != null ? "" + Zt(t) : n, m || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = m ? e.checked : !!l, e.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), Ni(e);
  }
  function la(e, t, n) {
    t === "number" && cn(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Kn(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++)
        t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Zt(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Wo(e, t, n) {
    if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Zt(n) : "";
  }
  function v(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(u(92));
        if (Xe(l)) {
          if (1 < l.length) throw Error(u(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Zt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), Ni(e);
  }
  function x(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var A = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function R(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || A.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function H(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var a in t)
        l = t[a], t.hasOwnProperty(a) && n[a] !== l && R(e, a, l);
    } else
      for (var o in t)
        t.hasOwnProperty(o) && R(e, o, t[o]);
  }
  function G(e) {
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
  var te = /* @__PURE__ */ new Map([
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
  ]), Y = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function I(e) {
    return Y.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function de() {
  }
  var xe = null;
  function ze(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var pe = null, be = null;
  function _t(e) {
    var t = Sl(e);
    if (t && (e = t.stateNode)) {
      var n = e[St] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (na(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + nt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var a = l[St] || null;
                if (!a) throw Error(u(90));
                na(
                  l,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              l = n[t], l.form === e.form && Oi(l);
          }
          break e;
        case "textarea":
          Wo(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Kn(e, !!n.multiple, t, !1);
      }
    }
  }
  var Jn = !1;
  function $n(e, t, n) {
    if (Jn) return e(t, n);
    Jn = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Jn = !1, (pe !== null || be !== null) && (kr(), pe && (t = pe, e = be, be = pe = null, _t(t), e)))
        for (t = 0; t < e.length; t++) _t(e[t]);
    }
  }
  function Dn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[St] || null;
    if (l === null) return null;
    n = l[t];
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        u(231, t, typeof n)
      );
    return n;
  }
  var Et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), aa = !1;
  if (Et)
    try {
      var Dt = {};
      Object.defineProperty(Dt, "passive", {
        get: function() {
          aa = !0;
        }
      }), window.addEventListener("test", Dt, Dt), window.removeEventListener("test", Dt, Dt);
    } catch {
      aa = !1;
    }
  var zt = null, sn = null, wt = null;
  function fn() {
    if (wt) return wt;
    var e, t = sn, n = t.length, l, a = "value" in zt ? zt.value : zt.textContent, o = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var s = n - e;
    for (l = 1; l <= s && t[n - l] === a[o - l]; l++) ;
    return wt = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Pn(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ia() {
    return !0;
  }
  function Di() {
    return !1;
  }
  function Qt(e) {
    function t(n, l, a, o, s) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = o, this.target = s, this.currentTarget = null;
      for (var m in e)
        e.hasOwnProperty(m) && (n = e[m], this[m] = n ? n(o) : o[m]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ia : Di, this.isPropagationStopped = Di, this;
    }
    return E(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ia);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ia);
      },
      persist: function() {
      },
      isPersistent: ia
    }), t;
  }
  var oa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Fo = Qt(oa), ji = E({}, oa, { view: 0, detail: 0 }), Bv = Qt(ji), Ru, Nu, ki, Io = E({}, ji, {
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
      return "movementX" in e ? e.movementX : (e !== ki && (ki && e.type === "mousemove" ? (Ru = e.screenX - ki.screenX, Nu = e.screenY - ki.screenY) : Nu = Ru = 0, ki = e), Ru);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Nu;
    }
  }), wf = Qt(Io), Gv = E({}, Io, { dataTransfer: 0 }), Vv = Qt(Gv), Yv = E({}, ji, { relatedTarget: 0 }), Ou = Qt(Yv), qv = E({}, oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xv = Qt(qv), Zv = E({}, oa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Qv = Qt(Zv), Kv = E({}, oa, { data: 0 }), Rf = Qt(Kv), Jv = {
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
  }, $v = {
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
  }, Pv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Wv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Pv[e]) ? !!t[e] : !1;
  }
  function Du() {
    return Wv;
  }
  var Fv = E({}, ji, {
    key: function(e) {
      if (e.key) {
        var t = Jv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Pn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $v[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? Pn(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Pn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Iv = Qt(Fv), eb = E({}, Io, {
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
  }), Nf = Qt(eb), tb = E({}, ji, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Du
  }), nb = Qt(tb), lb = E({}, oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ab = Qt(lb), ib = E({}, Io, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ob = Qt(ib), rb = E({}, oa, {
    newState: 0,
    oldState: 0
  }), ub = Qt(rb), cb = [9, 13, 27, 32], ju = Et && "CompositionEvent" in window, Ui = null;
  Et && "documentMode" in document && (Ui = document.documentMode);
  var sb = Et && "TextEvent" in window && !Ui, Of = Et && (!ju || Ui && 8 < Ui && 11 >= Ui), Df = " ", jf = !1;
  function kf(e, t) {
    switch (e) {
      case "keyup":
        return cb.indexOf(t.keyCode) !== -1;
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
  function Uf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var qa = !1;
  function fb(e, t) {
    switch (e) {
      case "compositionend":
        return Uf(t);
      case "keypress":
        return t.which !== 32 ? null : (jf = !0, Df);
      case "textInput":
        return e = t.data, e === Df && jf ? null : e;
      default:
        return null;
    }
  }
  function db(e, t) {
    if (qa)
      return e === "compositionend" || !ju && kf(e, t) ? (e = fn(), wt = sn = zt = null, qa = !1, e) : null;
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
        return Of && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var hb = {
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
  function Lf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!hb[e.type] : t === "textarea";
  }
  function Hf(e, t, n, l) {
    pe ? be ? be.push(l) : be = [l] : pe = l, t = Yr(t, "onChange"), 0 < t.length && (n = new Fo(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var Li = null, Hi = null;
  function mb(e) {
    xm(e, 0);
  }
  function er(e) {
    var t = ta(e);
    if (Oi(t)) return e;
  }
  function Bf(e, t) {
    if (e === "change") return t;
  }
  var Gf = !1;
  if (Et) {
    var ku;
    if (Et) {
      var Uu = "oninput" in document;
      if (!Uu) {
        var Vf = document.createElement("div");
        Vf.setAttribute("oninput", "return;"), Uu = typeof Vf.oninput == "function";
      }
      ku = Uu;
    } else ku = !1;
    Gf = ku && (!document.documentMode || 9 < document.documentMode);
  }
  function Yf() {
    Li && (Li.detachEvent("onpropertychange", qf), Hi = Li = null);
  }
  function qf(e) {
    if (e.propertyName === "value" && er(Hi)) {
      var t = [];
      Hf(
        t,
        Hi,
        e,
        ze(e)
      ), $n(mb, t);
    }
  }
  function gb(e, t, n) {
    e === "focusin" ? (Yf(), Li = t, Hi = n, Li.attachEvent("onpropertychange", qf)) : e === "focusout" && Yf();
  }
  function pb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return er(Hi);
  }
  function vb(e, t) {
    if (e === "click") return er(t);
  }
  function bb(e, t) {
    if (e === "input" || e === "change")
      return er(t);
  }
  function yb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var It = typeof Object.is == "function" ? Object.is : yb;
  function Bi(e, t) {
    if (It(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!wa.call(t, a) || !It(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  function Xf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Zf(e, t) {
    var n = Xf(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = e + n.textContent.length, e <= t && l >= t)
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Xf(n);
    }
  }
  function Qf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Kf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = cn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = cn(e.document);
    }
    return t;
  }
  function Lu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var xb = Et && "documentMode" in document && 11 >= document.documentMode, Xa = null, Hu = null, Gi = null, Bu = !1;
  function Jf(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Bu || Xa == null || Xa !== cn(l) || (l = Xa, "selectionStart" in l && Lu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Gi && Bi(Gi, l) || (Gi = l, l = Yr(Hu, "onSelect"), 0 < l.length && (t = new Fo(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = Xa)));
  }
  function ra(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Za = {
    animationend: ra("Animation", "AnimationEnd"),
    animationiteration: ra("Animation", "AnimationIteration"),
    animationstart: ra("Animation", "AnimationStart"),
    transitionrun: ra("Transition", "TransitionRun"),
    transitionstart: ra("Transition", "TransitionStart"),
    transitioncancel: ra("Transition", "TransitionCancel"),
    transitionend: ra("Transition", "TransitionEnd")
  }, Gu = {}, $f = {};
  Et && ($f = document.createElement("div").style, "AnimationEvent" in window || (delete Za.animationend.animation, delete Za.animationiteration.animation, delete Za.animationstart.animation), "TransitionEvent" in window || delete Za.transitionend.transition);
  function ua(e) {
    if (Gu[e]) return Gu[e];
    if (!Za[e]) return e;
    var t = Za[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in $f)
        return Gu[e] = t[n];
    return e;
  }
  var Pf = ua("animationend"), Wf = ua("animationiteration"), Ff = ua("animationstart"), Sb = ua("transitionrun"), _b = ua("transitionstart"), Eb = ua("transitioncancel"), If = ua("transitionend"), ed = /* @__PURE__ */ new Map(), Vu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Vu.push("scrollEnd");
  function Tn(e, t) {
    ed.set(e, t), Xn(t, [e]);
  }
  var tr = typeof reportError == "function" ? reportError : function(e) {
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
  }, dn = [], Qa = 0, Yu = 0;
  function nr() {
    for (var e = Qa, t = Yu = Qa = 0; t < e; ) {
      var n = dn[t];
      dn[t++] = null;
      var l = dn[t];
      dn[t++] = null;
      var a = dn[t];
      dn[t++] = null;
      var o = dn[t];
      if (dn[t++] = null, l !== null && a !== null) {
        var s = l.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), l.pending = a;
      }
      o !== 0 && td(n, a, o);
    }
  }
  function lr(e, t, n, l) {
    dn[Qa++] = e, dn[Qa++] = t, dn[Qa++] = n, dn[Qa++] = l, Yu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function qu(e, t, n, l) {
    return lr(e, t, n, l), ar(e);
  }
  function ca(e, t) {
    return lr(e, null, null, t), ar(e);
  }
  function td(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, o = e.return; o !== null; )
      o.childLanes |= n, l = o.alternate, l !== null && (l.childLanes |= n), o.tag === 22 && (e = o.stateNode, e === null || e._visibility & 1 || (a = !0)), e = o, o = o.return;
    return e.tag === 3 ? (o = e.stateNode, a && t !== null && (a = 31 - Ht(n), e = o.hiddenUpdates, l = e[a], l === null ? e[a] = [t] : l.push(t), t.lane = n | 536870912), o) : null;
  }
  function ar(e) {
    if (50 < uo)
      throw uo = 0, Fc = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ka = {};
  function Ab(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function en(e, t, n, l) {
    return new Ab(e, t, n, l);
  }
  function Xu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Wn(e, t) {
    var n = e.alternate;
    return n === null ? (n = en(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function nd(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function ir(e, t, n, l, a, o) {
    var s = 0;
    if (l = e, typeof e == "function") Xu(e) && (s = 1);
    else if (typeof e == "string")
      s = wy(
        e,
        n,
        F.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ae:
          return e = en(31, n, t, a), e.elementType = ae, e.lanes = o, e;
        case Q:
          return sa(n.children, a, o, t);
        case W:
          s = 8, a |= 24;
          break;
        case $:
          return e = en(12, n, t, a | 2), e.elementType = $, e.lanes = o, e;
        case me:
          return e = en(13, n, t, a), e.elementType = me, e.lanes = o, e;
        case fe:
          return e = en(19, n, t, a), e.elementType = fe, e.lanes = o, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case J:
                s = 10;
                break e;
              case L:
                s = 9;
                break e;
              case le:
                s = 11;
                break e;
              case ie:
                s = 14;
                break e;
              case P:
                s = 16, l = null;
                break e;
            }
          s = 29, n = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = en(s, n, t, a), t.elementType = e, t.type = l, t.lanes = o, t;
  }
  function sa(e, t, n, l) {
    return e = en(7, e, l, t), e.lanes = n, e;
  }
  function Zu(e, t, n) {
    return e = en(6, e, null, t), e.lanes = n, e;
  }
  function ld(e) {
    var t = en(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Qu(e, t, n) {
    return t = en(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var ad = /* @__PURE__ */ new WeakMap();
  function hn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = ad.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Jl(t)
      }, ad.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Jl(t)
    };
  }
  var Ja = [], $a = 0, or = null, Vi = 0, mn = [], gn = 0, El = null, jn = 1, kn = "";
  function Fn(e, t) {
    Ja[$a++] = Vi, Ja[$a++] = or, or = e, Vi = t;
  }
  function id(e, t, n) {
    mn[gn++] = jn, mn[gn++] = kn, mn[gn++] = El, El = e;
    var l = jn;
    e = kn;
    var a = 32 - Ht(l) - 1;
    l &= ~(1 << a), n += 1;
    var o = 32 - Ht(t) + a;
    if (30 < o) {
      var s = a - a % 5;
      o = (l & (1 << s) - 1).toString(32), l >>= s, a -= s, jn = 1 << 32 - Ht(t) + a | n << a | l, kn = o + e;
    } else
      jn = 1 << o | n << a | l, kn = e;
  }
  function Ku(e) {
    e.return !== null && (Fn(e, 1), id(e, 1, 0));
  }
  function Ju(e) {
    for (; e === or; )
      or = Ja[--$a], Ja[$a] = null, Vi = Ja[--$a], Ja[$a] = null;
    for (; e === El; )
      El = mn[--gn], mn[gn] = null, kn = mn[--gn], mn[gn] = null, jn = mn[--gn], mn[gn] = null;
  }
  function od(e, t) {
    mn[gn++] = jn, mn[gn++] = kn, mn[gn++] = El, jn = t.id, kn = t.overflow, El = e;
  }
  var jt = null, et = null, Be = !1, Al = null, pn = !1, $u = Error(u(519));
  function Cl(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Yi(hn(t, e)), $u;
  }
  function rd(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[xt] = e, t[St] = l, n) {
      case "dialog":
        De("cancel", t), De("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        De("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < so.length; n++)
          De(so[n], t);
        break;
      case "source":
        De("error", t);
        break;
      case "img":
      case "image":
      case "link":
        De("error", t), De("load", t);
        break;
      case "details":
        De("toggle", t);
        break;
      case "input":
        De("invalid", t), _l(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        De("invalid", t);
        break;
      case "textarea":
        De("invalid", t), v(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || Am(t.textContent, n) ? (l.popover != null && (De("beforetoggle", t), De("toggle", t)), l.onScroll != null && De("scroll", t), l.onScrollEnd != null && De("scrollend", t), l.onClick != null && (t.onclick = de), t = !0) : t = !1, t || Cl(e, !0);
  }
  function ud(e) {
    for (jt = e.return; jt; )
      switch (jt.tag) {
        case 5:
        case 31:
        case 13:
          pn = !1;
          return;
        case 27:
        case 3:
          pn = !0;
          return;
        default:
          jt = jt.return;
      }
  }
  function Pa(e) {
    if (e !== jt) return !1;
    if (!Be) return ud(e), Be = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || hs(e.type, e.memoizedProps)), n = !n), n && et && Cl(e), ud(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      et = Dm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      et = Dm(e);
    } else
      t === 27 ? (t = et, Bl(e.type) ? (e = bs, bs = null, et = e) : et = t) : et = jt ? bn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function fa() {
    et = jt = null, Be = !1;
  }
  function Pu() {
    var e = Al;
    return e !== null && (Pt === null ? Pt = e : Pt.push.apply(
      Pt,
      e
    ), Al = null), e;
  }
  function Yi(e) {
    Al === null ? Al = [e] : Al.push(e);
  }
  var Wu = C(null), da = null, In = null;
  function Tl(e, t, n) {
    ee(Wu, t._currentValue), t._currentValue = n;
  }
  function el(e) {
    e._currentValue = Wu.current, V(Wu);
  }
  function Fu(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Iu(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var o = a.dependencies;
      if (o !== null) {
        var s = a.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var m = o;
          o = a;
          for (var _ = 0; _ < t.length; _++)
            if (m.context === t[_]) {
              o.lanes |= n, m = o.alternate, m !== null && (m.lanes |= n), Fu(
                o.return,
                n,
                e
              ), l || (s = null);
              break e;
            }
          o = m.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(u(341));
        s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Fu(s, n, e), s = null;
      } else s = a.child;
      if (s !== null) s.return = a;
      else
        for (s = a; s !== null; ) {
          if (s === e) {
            s = null;
            break;
          }
          if (a = s.sibling, a !== null) {
            a.return = s.return, s = a;
            break;
          }
          s = s.return;
        }
      a = s;
    }
  }
  function Wa(e, t, n, l) {
    e = null;
    for (var a = t, o = !1; a !== null; ) {
      if (!o) {
        if ((a.flags & 524288) !== 0) o = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(u(387));
        if (s = s.memoizedProps, s !== null) {
          var m = a.type;
          It(a.pendingProps.value, s.value) || (e !== null ? e.push(m) : e = [m]);
        }
      } else if (a === Te.current) {
        if (s = a.alternate, s === null) throw Error(u(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(po) : e = [po]);
      }
      a = a.return;
    }
    e !== null && Iu(
      t,
      e,
      n,
      l
    ), t.flags |= 262144;
  }
  function rr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!It(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ha(e) {
    da = e, In = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function kt(e) {
    return cd(da, e);
  }
  function ur(e, t) {
    return da === null && ha(e), cd(e, t);
  }
  function cd(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, In === null) {
      if (e === null) throw Error(u(308));
      In = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else In = In.next = t;
    return n;
  }
  var Cb = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, Tb = i.unstable_scheduleCallback, Mb = i.unstable_NormalPriority, mt = {
    $$typeof: J,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ec() {
    return {
      controller: new Cb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function qi(e) {
    e.refCount--, e.refCount === 0 && Tb(Mb, function() {
      e.controller.abort();
    });
  }
  var Xi = null, tc = 0, Fa = 0, Ia = null;
  function zb(e, t) {
    if (Xi === null) {
      var n = Xi = [];
      tc = 0, Fa = as(), Ia = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return tc++, t.then(sd, sd), t;
  }
  function sd() {
    if (--tc === 0 && Xi !== null) {
      Ia !== null && (Ia.status = "fulfilled");
      var e = Xi;
      Xi = null, Fa = 0, Ia = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function wb(e, t) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        n.push(a);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var a = 0; a < n.length; a++) (0, n[a])(t);
      },
      function(a) {
        for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++)
          (0, n[a])(void 0);
      }
    ), l;
  }
  var fd = D.S;
  D.S = function(e, t) {
    Jh = yt(), typeof t == "object" && t !== null && typeof t.then == "function" && zb(e, t), fd !== null && fd(e, t);
  };
  var ma = C(null);
  function nc() {
    var e = ma.current;
    return e !== null ? e : Pe.pooledCache;
  }
  function cr(e, t) {
    t === null ? ee(ma, ma.current) : ee(ma, t.pool);
  }
  function dd() {
    var e = nc();
    return e === null ? null : { parent: mt._currentValue, pool: e };
  }
  var ei = Error(u(460)), lc = Error(u(474)), sr = Error(u(542)), fr = { then: function() {
  } };
  function hd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function md(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(de, de), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, pd(e), e;
      default:
        if (typeof t.status == "string") t.then(de, de);
        else {
          if (e = Pe, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var a = t;
                a.status = "fulfilled", a.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var a = t;
                a.status = "rejected", a.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, pd(e), e;
        }
        throw pa = t, ei;
    }
  }
  function ga(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (pa = n, ei) : n;
    }
  }
  var pa = null;
  function gd() {
    if (pa === null) throw Error(u(459));
    var e = pa;
    return pa = null, e;
  }
  function pd(e) {
    if (e === ei || e === sr)
      throw Error(u(483));
  }
  var ti = null, Zi = 0;
  function dr(e) {
    var t = Zi;
    return Zi += 1, ti === null && (ti = []), md(ti, e, t);
  }
  function Qi(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function hr(e, t) {
    throw t.$$typeof === M ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function vd(e) {
    function t(w, T) {
      if (e) {
        var N = w.deletions;
        N === null ? (w.deletions = [T], w.flags |= 16) : N.push(T);
      }
    }
    function n(w, T) {
      if (!e) return null;
      for (; T !== null; )
        t(w, T), T = T.sibling;
      return null;
    }
    function l(w) {
      for (var T = /* @__PURE__ */ new Map(); w !== null; )
        w.key !== null ? T.set(w.key, w) : T.set(w.index, w), w = w.sibling;
      return T;
    }
    function a(w, T) {
      return w = Wn(w, T), w.index = 0, w.sibling = null, w;
    }
    function o(w, T, N) {
      return w.index = N, e ? (N = w.alternate, N !== null ? (N = N.index, N < T ? (w.flags |= 67108866, T) : N) : (w.flags |= 67108866, T)) : (w.flags |= 1048576, T);
    }
    function s(w) {
      return e && w.alternate === null && (w.flags |= 67108866), w;
    }
    function m(w, T, N, Z) {
      return T === null || T.tag !== 6 ? (T = Zu(N, w.mode, Z), T.return = w, T) : (T = a(T, N), T.return = w, T);
    }
    function _(w, T, N, Z) {
      var ve = N.type;
      return ve === Q ? B(
        w,
        T,
        N.props.children,
        Z,
        N.key
      ) : T !== null && (T.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === P && ga(ve) === T.type) ? (T = a(T, N.props), Qi(T, N), T.return = w, T) : (T = ir(
        N.type,
        N.key,
        N.props,
        null,
        w.mode,
        Z
      ), Qi(T, N), T.return = w, T);
    }
    function O(w, T, N, Z) {
      return T === null || T.tag !== 4 || T.stateNode.containerInfo !== N.containerInfo || T.stateNode.implementation !== N.implementation ? (T = Qu(N, w.mode, Z), T.return = w, T) : (T = a(T, N.children || []), T.return = w, T);
    }
    function B(w, T, N, Z, ve) {
      return T === null || T.tag !== 7 ? (T = sa(
        N,
        w.mode,
        Z,
        ve
      ), T.return = w, T) : (T = a(T, N), T.return = w, T);
    }
    function K(w, T, N) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return T = Zu(
          "" + T,
          w.mode,
          N
        ), T.return = w, T;
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case k:
            return N = ir(
              T.type,
              T.key,
              T.props,
              null,
              w.mode,
              N
            ), Qi(N, T), N.return = w, N;
          case q:
            return T = Qu(
              T,
              w.mode,
              N
            ), T.return = w, T;
          case P:
            return T = ga(T), K(w, T, N);
        }
        if (Xe(T) || we(T))
          return T = sa(
            T,
            w.mode,
            N,
            null
          ), T.return = w, T;
        if (typeof T.then == "function")
          return K(w, dr(T), N);
        if (T.$$typeof === J)
          return K(
            w,
            ur(w, T),
            N
          );
        hr(w, T);
      }
      return null;
    }
    function j(w, T, N, Z) {
      var ve = T !== null ? T.key : null;
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return ve !== null ? null : m(w, T, "" + N, Z);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case k:
            return N.key === ve ? _(w, T, N, Z) : null;
          case q:
            return N.key === ve ? O(w, T, N, Z) : null;
          case P:
            return N = ga(N), j(w, T, N, Z);
        }
        if (Xe(N) || we(N))
          return ve !== null ? null : B(w, T, N, Z, null);
        if (typeof N.then == "function")
          return j(
            w,
            T,
            dr(N),
            Z
          );
        if (N.$$typeof === J)
          return j(
            w,
            T,
            ur(w, N),
            Z
          );
        hr(w, N);
      }
      return null;
    }
    function U(w, T, N, Z, ve) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return w = w.get(N) || null, m(T, w, "" + Z, ve);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case k:
            return w = w.get(
              Z.key === null ? N : Z.key
            ) || null, _(T, w, Z, ve);
          case q:
            return w = w.get(
              Z.key === null ? N : Z.key
            ) || null, O(T, w, Z, ve);
          case P:
            return Z = ga(Z), U(
              w,
              T,
              N,
              Z,
              ve
            );
        }
        if (Xe(Z) || we(Z))
          return w = w.get(N) || null, B(T, w, Z, ve, null);
        if (typeof Z.then == "function")
          return U(
            w,
            T,
            N,
            dr(Z),
            ve
          );
        if (Z.$$typeof === J)
          return U(
            w,
            T,
            N,
            ur(T, Z),
            ve
          );
        hr(T, Z);
      }
      return null;
    }
    function se(w, T, N, Z) {
      for (var ve = null, Ge = null, ge = T, Me = T = 0, Le = null; ge !== null && Me < N.length; Me++) {
        ge.index > Me ? (Le = ge, ge = null) : Le = ge.sibling;
        var Ve = j(
          w,
          ge,
          N[Me],
          Z
        );
        if (Ve === null) {
          ge === null && (ge = Le);
          break;
        }
        e && ge && Ve.alternate === null && t(w, ge), T = o(Ve, T, Me), Ge === null ? ve = Ve : Ge.sibling = Ve, Ge = Ve, ge = Le;
      }
      if (Me === N.length)
        return n(w, ge), Be && Fn(w, Me), ve;
      if (ge === null) {
        for (; Me < N.length; Me++)
          ge = K(w, N[Me], Z), ge !== null && (T = o(
            ge,
            T,
            Me
          ), Ge === null ? ve = ge : Ge.sibling = ge, Ge = ge);
        return Be && Fn(w, Me), ve;
      }
      for (ge = l(ge); Me < N.length; Me++)
        Le = U(
          ge,
          w,
          Me,
          N[Me],
          Z
        ), Le !== null && (e && Le.alternate !== null && ge.delete(
          Le.key === null ? Me : Le.key
        ), T = o(
          Le,
          T,
          Me
        ), Ge === null ? ve = Le : Ge.sibling = Le, Ge = Le);
      return e && ge.forEach(function(Xl) {
        return t(w, Xl);
      }), Be && Fn(w, Me), ve;
    }
    function ye(w, T, N, Z) {
      if (N == null) throw Error(u(151));
      for (var ve = null, Ge = null, ge = T, Me = T = 0, Le = null, Ve = N.next(); ge !== null && !Ve.done; Me++, Ve = N.next()) {
        ge.index > Me ? (Le = ge, ge = null) : Le = ge.sibling;
        var Xl = j(w, ge, Ve.value, Z);
        if (Xl === null) {
          ge === null && (ge = Le);
          break;
        }
        e && ge && Xl.alternate === null && t(w, ge), T = o(Xl, T, Me), Ge === null ? ve = Xl : Ge.sibling = Xl, Ge = Xl, ge = Le;
      }
      if (Ve.done)
        return n(w, ge), Be && Fn(w, Me), ve;
      if (ge === null) {
        for (; !Ve.done; Me++, Ve = N.next())
          Ve = K(w, Ve.value, Z), Ve !== null && (T = o(Ve, T, Me), Ge === null ? ve = Ve : Ge.sibling = Ve, Ge = Ve);
        return Be && Fn(w, Me), ve;
      }
      for (ge = l(ge); !Ve.done; Me++, Ve = N.next())
        Ve = U(ge, w, Me, Ve.value, Z), Ve !== null && (e && Ve.alternate !== null && ge.delete(Ve.key === null ? Me : Ve.key), T = o(Ve, T, Me), Ge === null ? ve = Ve : Ge.sibling = Ve, Ge = Ve);
      return e && ge.forEach(function(Gy) {
        return t(w, Gy);
      }), Be && Fn(w, Me), ve;
    }
    function $e(w, T, N, Z) {
      if (typeof N == "object" && N !== null && N.type === Q && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case k:
            e: {
              for (var ve = N.key; T !== null; ) {
                if (T.key === ve) {
                  if (ve = N.type, ve === Q) {
                    if (T.tag === 7) {
                      n(
                        w,
                        T.sibling
                      ), Z = a(
                        T,
                        N.props.children
                      ), Z.return = w, w = Z;
                      break e;
                    }
                  } else if (T.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === P && ga(ve) === T.type) {
                    n(
                      w,
                      T.sibling
                    ), Z = a(T, N.props), Qi(Z, N), Z.return = w, w = Z;
                    break e;
                  }
                  n(w, T);
                  break;
                } else t(w, T);
                T = T.sibling;
              }
              N.type === Q ? (Z = sa(
                N.props.children,
                w.mode,
                Z,
                N.key
              ), Z.return = w, w = Z) : (Z = ir(
                N.type,
                N.key,
                N.props,
                null,
                w.mode,
                Z
              ), Qi(Z, N), Z.return = w, w = Z);
            }
            return s(w);
          case q:
            e: {
              for (ve = N.key; T !== null; ) {
                if (T.key === ve)
                  if (T.tag === 4 && T.stateNode.containerInfo === N.containerInfo && T.stateNode.implementation === N.implementation) {
                    n(
                      w,
                      T.sibling
                    ), Z = a(T, N.children || []), Z.return = w, w = Z;
                    break e;
                  } else {
                    n(w, T);
                    break;
                  }
                else t(w, T);
                T = T.sibling;
              }
              Z = Qu(N, w.mode, Z), Z.return = w, w = Z;
            }
            return s(w);
          case P:
            return N = ga(N), $e(
              w,
              T,
              N,
              Z
            );
        }
        if (Xe(N))
          return se(
            w,
            T,
            N,
            Z
          );
        if (we(N)) {
          if (ve = we(N), typeof ve != "function") throw Error(u(150));
          return N = ve.call(N), ye(
            w,
            T,
            N,
            Z
          );
        }
        if (typeof N.then == "function")
          return $e(
            w,
            T,
            dr(N),
            Z
          );
        if (N.$$typeof === J)
          return $e(
            w,
            T,
            ur(w, N),
            Z
          );
        hr(w, N);
      }
      return typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint" ? (N = "" + N, T !== null && T.tag === 6 ? (n(w, T.sibling), Z = a(T, N), Z.return = w, w = Z) : (n(w, T), Z = Zu(N, w.mode, Z), Z.return = w, w = Z), s(w)) : n(w, T);
    }
    return function(w, T, N, Z) {
      try {
        Zi = 0;
        var ve = $e(
          w,
          T,
          N,
          Z
        );
        return ti = null, ve;
      } catch (ge) {
        if (ge === ei || ge === sr) throw ge;
        var Ge = en(29, ge, null, w.mode);
        return Ge.lanes = Z, Ge.return = w, Ge;
      }
    };
  }
  var va = vd(!0), bd = vd(!1), Ml = !1;
  function ac(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ic(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function zl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function wl(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (qe & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, t = ar(e), td(e, null, n), t;
    }
    return lr(e, l, t, n), ar(e);
  }
  function Ki(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, zi(e, n);
    }
  }
  function oc(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var a = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var s = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          o === null ? a = o = s : o = o.next = s, n = n.next;
        } while (n !== null);
        o === null ? a = o = t : o = o.next = t;
      } else a = o = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: o,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var rc = !1;
  function Ji() {
    if (rc) {
      var e = Ia;
      if (e !== null) throw e;
    }
  }
  function $i(e, t, n, l) {
    rc = !1;
    var a = e.updateQueue;
    Ml = !1;
    var o = a.firstBaseUpdate, s = a.lastBaseUpdate, m = a.shared.pending;
    if (m !== null) {
      a.shared.pending = null;
      var _ = m, O = _.next;
      _.next = null, s === null ? o = O : s.next = O, s = _;
      var B = e.alternate;
      B !== null && (B = B.updateQueue, m = B.lastBaseUpdate, m !== s && (m === null ? B.firstBaseUpdate = O : m.next = O, B.lastBaseUpdate = _));
    }
    if (o !== null) {
      var K = a.baseState;
      s = 0, B = O = _ = null, m = o;
      do {
        var j = m.lane & -536870913, U = j !== m.lane;
        if (U ? (Ue & j) === j : (l & j) === j) {
          j !== 0 && j === Fa && (rc = !0), B !== null && (B = B.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var se = e, ye = m;
            j = t;
            var $e = n;
            switch (ye.tag) {
              case 1:
                if (se = ye.payload, typeof se == "function") {
                  K = se.call($e, K, j);
                  break e;
                }
                K = se;
                break e;
              case 3:
                se.flags = se.flags & -65537 | 128;
              case 0:
                if (se = ye.payload, j = typeof se == "function" ? se.call($e, K, j) : se, j == null) break e;
                K = E({}, K, j);
                break e;
              case 2:
                Ml = !0;
            }
          }
          j = m.callback, j !== null && (e.flags |= 64, U && (e.flags |= 8192), U = a.callbacks, U === null ? a.callbacks = [j] : U.push(j));
        } else
          U = {
            lane: j,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, B === null ? (O = B = U, _ = K) : B = B.next = U, s |= j;
        if (m = m.next, m === null) {
          if (m = a.shared.pending, m === null)
            break;
          U = m, m = U.next, U.next = null, a.lastBaseUpdate = U, a.shared.pending = null;
        }
      } while (!0);
      B === null && (_ = K), a.baseState = _, a.firstBaseUpdate = O, a.lastBaseUpdate = B, o === null && (a.shared.lanes = 0), jl |= s, e.lanes = s, e.memoizedState = K;
    }
  }
  function yd(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function xd(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        yd(n[e], t);
  }
  var ni = C(null), mr = C(0);
  function Sd(e, t) {
    e = cl, ee(mr, e), ee(ni, t), cl = e | t.baseLanes;
  }
  function uc() {
    ee(mr, cl), ee(ni, ni.current);
  }
  function cc() {
    cl = mr.current, V(ni), V(mr);
  }
  var tn = C(null), vn = null;
  function Rl(e) {
    var t = e.alternate;
    ee(st, st.current & 1), ee(tn, e), vn === null && (t === null || ni.current !== null || t.memoizedState !== null) && (vn = e);
  }
  function sc(e) {
    ee(st, st.current), ee(tn, e), vn === null && (vn = e);
  }
  function _d(e) {
    e.tag === 22 ? (ee(st, st.current), ee(tn, e), vn === null && (vn = e)) : Nl();
  }
  function Nl() {
    ee(st, st.current), ee(tn, tn.current);
  }
  function nn(e) {
    V(tn), vn === e && (vn = null), V(st);
  }
  var st = C(0);
  function gr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || ps(n) || vs(n)))
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
  var tl = 0, Ce = null, Ke = null, gt = null, pr = !1, li = !1, ba = !1, vr = 0, Pi = 0, ai = null, Rb = 0;
  function it() {
    throw Error(u(321));
  }
  function fc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!It(e[n], t[n])) return !1;
    return !0;
  }
  function dc(e, t, n, l, a, o) {
    return tl = o, Ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? ih : Mc, ba = !1, o = n(l, a), ba = !1, li && (o = Ad(
      t,
      n,
      l,
      a
    )), Ed(e), o;
  }
  function Ed(e) {
    D.H = Ii;
    var t = Ke !== null && Ke.next !== null;
    if (tl = 0, gt = Ke = Ce = null, pr = !1, Pi = 0, ai = null, t) throw Error(u(300));
    e === null || pt || (e = e.dependencies, e !== null && rr(e) && (pt = !0));
  }
  function Ad(e, t, n, l) {
    Ce = e;
    var a = 0;
    do {
      if (li && (ai = null), Pi = 0, li = !1, 25 <= a) throw Error(u(301));
      if (a += 1, gt = Ke = null, e.updateQueue != null) {
        var o = e.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      D.H = oh, o = t(n, l);
    } while (li);
    return o;
  }
  function Nb() {
    var e = D.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Wi(t) : t, e = e.useState()[0], (Ke !== null ? Ke.memoizedState : null) !== e && (Ce.flags |= 1024), t;
  }
  function hc() {
    var e = vr !== 0;
    return vr = 0, e;
  }
  function mc(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function gc(e) {
    if (pr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      pr = !1;
    }
    tl = 0, gt = Ke = Ce = null, li = !1, Pi = vr = 0, ai = null;
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return gt === null ? Ce.memoizedState = gt = e : gt = gt.next = e, gt;
  }
  function ft() {
    if (Ke === null) {
      var e = Ce.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ke.next;
    var t = gt === null ? Ce.memoizedState : gt.next;
    if (t !== null)
      gt = t, Ke = e;
    else {
      if (e === null)
        throw Ce.alternate === null ? Error(u(467)) : Error(u(310));
      Ke = e, e = {
        memoizedState: Ke.memoizedState,
        baseState: Ke.baseState,
        baseQueue: Ke.baseQueue,
        queue: Ke.queue,
        next: null
      }, gt === null ? Ce.memoizedState = gt = e : gt = gt.next = e;
    }
    return gt;
  }
  function br() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Wi(e) {
    var t = Pi;
    return Pi += 1, ai === null && (ai = []), e = md(ai, e, t), t = Ce, (gt === null ? t.memoizedState : gt.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? ih : Mc), e;
  }
  function yr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Wi(e);
      if (e.$$typeof === J) return kt(e);
    }
    throw Error(u(438, String(e)));
  }
  function pc(e) {
    var t = null, n = Ce.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = Ce.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = br(), Ce.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = Se;
    return t.index++, n;
  }
  function nl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function xr(e) {
    var t = ft();
    return vc(t, Ke, e);
  }
  function vc(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue, o = l.pending;
    if (o !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = o.next, o.next = s;
      }
      t.baseQueue = a = o, l.pending = null;
    }
    if (o = e.baseState, a === null) e.memoizedState = o;
    else {
      t = a.next;
      var m = s = null, _ = null, O = t, B = !1;
      do {
        var K = O.lane & -536870913;
        if (K !== O.lane ? (Ue & K) === K : (tl & K) === K) {
          var j = O.revertLane;
          if (j === 0)
            _ !== null && (_ = _.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), K === Fa && (B = !0);
          else if ((tl & j) === j) {
            O = O.next, j === Fa && (B = !0);
            continue;
          } else
            K = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, _ === null ? (m = _ = K, s = o) : _ = _.next = K, Ce.lanes |= j, jl |= j;
          K = O.action, ba && n(o, K), o = O.hasEagerState ? O.eagerState : n(o, K);
        } else
          j = {
            lane: K,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, _ === null ? (m = _ = j, s = o) : _ = _.next = j, Ce.lanes |= K, jl |= K;
        O = O.next;
      } while (O !== null && O !== t);
      if (_ === null ? s = o : _.next = m, !It(o, e.memoizedState) && (pt = !0, B && (n = Ia, n !== null)))
        throw n;
      e.memoizedState = o, e.baseState = s, e.baseQueue = _, l.lastRenderedState = o;
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function bc(e) {
    var t = ft(), n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, a = n.pending, o = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var s = a = a.next;
      do
        o = e(o, s.action), s = s.next;
      while (s !== a);
      It(o, t.memoizedState) || (pt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, l];
  }
  function Cd(e, t, n) {
    var l = Ce, a = ft(), o = Be;
    if (o) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var s = !It(
      (Ke || a).memoizedState,
      n
    );
    if (s && (a.memoizedState = n, pt = !0), a = a.queue, Sc(zd.bind(null, l, a, e), [
      e
    ]), a.getSnapshot !== t || s || gt !== null && gt.memoizedState.tag & 1) {
      if (l.flags |= 2048, ii(
        9,
        { destroy: void 0 },
        Md.bind(
          null,
          l,
          a,
          n,
          t
        ),
        null
      ), Pe === null) throw Error(u(349));
      o || (tl & 127) !== 0 || Td(l, t, n);
    }
    return n;
  }
  function Td(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ce.updateQueue, t === null ? (t = br(), Ce.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Md(e, t, n, l) {
    t.value = n, t.getSnapshot = l, wd(t) && Rd(e);
  }
  function zd(e, t, n) {
    return n(function() {
      wd(t) && Rd(e);
    });
  }
  function wd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !It(e, n);
    } catch {
      return !0;
    }
  }
  function Rd(e) {
    var t = ca(e, 2);
    t !== null && Wt(t, e, 2);
  }
  function yc(e) {
    var t = qt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ba) {
        _n(!0);
        try {
          n();
        } finally {
          _n(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nl,
      lastRenderedState: e
    }, t;
  }
  function Nd(e, t, n, l) {
    return e.baseState = n, vc(
      e,
      Ke,
      typeof l == "function" ? l : nl
    );
  }
  function Ob(e, t, n, l, a) {
    if (Er(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var o = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          o.listeners.push(s);
        }
      };
      D.T !== null ? n(!0) : o.isTransition = !1, l(o), n = t.pending, n === null ? (o.next = t.pending = o, Od(t, o)) : (o.next = n.next, t.pending = n.next = o);
    }
  }
  function Od(e, t) {
    var n = t.action, l = t.payload, a = e.state;
    if (t.isTransition) {
      var o = D.T, s = {};
      D.T = s;
      try {
        var m = n(a, l), _ = D.S;
        _ !== null && _(s, m), Dd(e, t, m);
      } catch (O) {
        xc(e, t, O);
      } finally {
        o !== null && s.types !== null && (o.types = s.types), D.T = o;
      }
    } else
      try {
        o = n(a, l), Dd(e, t, o);
      } catch (O) {
        xc(e, t, O);
      }
  }
  function Dd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        jd(e, t, l);
      },
      function(l) {
        return xc(e, t, l);
      }
    ) : jd(e, t, n);
  }
  function jd(e, t, n) {
    t.status = "fulfilled", t.value = n, kd(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Od(e, n)));
  }
  function xc(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, kd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function kd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Ud(e, t) {
    return t;
  }
  function Ld(e, t) {
    if (Be) {
      var n = Pe.formState;
      if (n !== null) {
        e: {
          var l = Ce;
          if (Be) {
            if (et) {
              t: {
                for (var a = et, o = pn; a.nodeType !== 8; ) {
                  if (!o) {
                    a = null;
                    break t;
                  }
                  if (a = bn(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break t;
                  }
                }
                o = a.data, a = o === "F!" || o === "F" ? a : null;
              }
              if (a) {
                et = bn(
                  a.nextSibling
                ), l = a.data === "F!";
                break e;
              }
            }
            Cl(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = qt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ud,
      lastRenderedState: t
    }, n.queue = l, n = nh.bind(
      null,
      Ce,
      l
    ), l.dispatch = n, l = yc(!1), o = Tc.bind(
      null,
      Ce,
      !1,
      l.queue
    ), l = qt(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = a, n = Ob.bind(
      null,
      Ce,
      a,
      o,
      n
    ), a.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Hd(e) {
    var t = ft();
    return Bd(t, Ke, e);
  }
  function Bd(e, t, n) {
    if (t = vc(
      e,
      t,
      Ud
    )[0], e = xr(nl)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Wi(t);
      } catch (s) {
        throw s === ei ? sr : s;
      }
    else l = t;
    t = ft();
    var a = t.queue, o = a.dispatch;
    return n !== t.memoizedState && (Ce.flags |= 2048, ii(
      9,
      { destroy: void 0 },
      Db.bind(null, a, n),
      null
    )), [l, o, e];
  }
  function Db(e, t) {
    e.action = t;
  }
  function Gd(e) {
    var t = ft(), n = Ke;
    if (n !== null)
      return Bd(t, n, e);
    ft(), t = t.memoizedState, n = ft();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function ii(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = Ce.updateQueue, t === null && (t = br(), Ce.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Vd() {
    return ft().memoizedState;
  }
  function Sr(e, t, n, l) {
    var a = qt();
    Ce.flags |= e, a.memoizedState = ii(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function _r(e, t, n, l) {
    var a = ft();
    l = l === void 0 ? null : l;
    var o = a.memoizedState.inst;
    Ke !== null && l !== null && fc(l, Ke.memoizedState.deps) ? a.memoizedState = ii(t, o, n, l) : (Ce.flags |= e, a.memoizedState = ii(
      1 | t,
      o,
      n,
      l
    ));
  }
  function Yd(e, t) {
    Sr(8390656, 8, e, t);
  }
  function Sc(e, t) {
    _r(2048, 8, e, t);
  }
  function jb(e) {
    Ce.flags |= 4;
    var t = Ce.updateQueue;
    if (t === null)
      t = br(), Ce.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function qd(e) {
    var t = ft().memoizedState;
    return jb({ ref: t, nextImpl: e }), function() {
      if ((qe & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Xd(e, t) {
    return _r(4, 2, e, t);
  }
  function Zd(e, t) {
    return _r(4, 4, e, t);
  }
  function Qd(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Kd(e, t, n) {
    n = n != null ? n.concat([e]) : null, _r(4, 4, Qd.bind(null, t, e), n);
  }
  function _c() {
  }
  function Jd(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && fc(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function $d(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && fc(t, l[1]))
      return l[0];
    if (l = e(), ba) {
      _n(!0);
      try {
        e();
      } finally {
        _n(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function Ec(e, t, n) {
    return n === void 0 || (tl & 1073741824) !== 0 && (Ue & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = Ph(), Ce.lanes |= e, jl |= e, n);
  }
  function Pd(e, t, n, l) {
    return It(n, t) ? n : ni.current !== null ? (e = Ec(e, n, l), It(e, t) || (pt = !0), e) : (tl & 42) === 0 || (tl & 1073741824) !== 0 && (Ue & 261930) === 0 ? (pt = !0, e.memoizedState = n) : (e = Ph(), Ce.lanes |= e, jl |= e, t);
  }
  function Wd(e, t, n, l, a) {
    var o = X.p;
    X.p = o !== 0 && 8 > o ? o : 8;
    var s = D.T, m = {};
    D.T = m, Tc(e, !1, t, n);
    try {
      var _ = a(), O = D.S;
      if (O !== null && O(m, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var B = wb(
          _,
          l
        );
        Fi(
          e,
          t,
          B,
          on(e)
        );
      } else
        Fi(
          e,
          t,
          l,
          on(e)
        );
    } catch (K) {
      Fi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: K },
        on()
      );
    } finally {
      X.p = o, s !== null && m.types !== null && (s.types = m.types), D.T = s;
    }
  }
  function kb() {
  }
  function Ac(e, t, n, l) {
    if (e.tag !== 5) throw Error(u(476));
    var a = Fd(e).queue;
    Wd(
      e,
      a,
      t,
      ce,
      n === null ? kb : function() {
        return Id(e), n(l);
      }
    );
  }
  function Fd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ce,
      baseState: ce,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nl,
        lastRenderedState: ce
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nl,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Id(e) {
    var t = Fd(e);
    t.next === null && (t = e.alternate.memoizedState), Fi(
      e,
      t.next.queue,
      {},
      on()
    );
  }
  function Cc() {
    return kt(po);
  }
  function eh() {
    return ft().memoizedState;
  }
  function th() {
    return ft().memoizedState;
  }
  function Ub(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = on();
          e = zl(n);
          var l = wl(t, e, n);
          l !== null && (Wt(l, t, n), Ki(l, t, n)), t = { cache: ec() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Lb(e, t, n) {
    var l = on();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Er(e) ? lh(t, n) : (n = qu(e, t, n, l), n !== null && (Wt(n, e, l), ah(n, t, l)));
  }
  function nh(e, t, n) {
    var l = on();
    Fi(e, t, n, l);
  }
  function Fi(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Er(e)) lh(t, a);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
        try {
          var s = t.lastRenderedState, m = o(s, n);
          if (a.hasEagerState = !0, a.eagerState = m, It(m, s))
            return lr(e, t, a, 0), Pe === null && nr(), !1;
        } catch {
        }
      if (n = qu(e, t, a, l), n !== null)
        return Wt(n, e, l), ah(n, t, l), !0;
    }
    return !1;
  }
  function Tc(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: as(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Er(e)) {
      if (t) throw Error(u(479));
    } else
      t = qu(
        e,
        n,
        l,
        2
      ), t !== null && Wt(t, e, 2);
  }
  function Er(e) {
    var t = e.alternate;
    return e === Ce || t !== null && t === Ce;
  }
  function lh(e, t) {
    li = pr = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function ah(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, zi(e, n);
    }
  }
  var Ii = {
    readContext: kt,
    use: yr,
    useCallback: it,
    useContext: it,
    useEffect: it,
    useImperativeHandle: it,
    useLayoutEffect: it,
    useInsertionEffect: it,
    useMemo: it,
    useReducer: it,
    useRef: it,
    useState: it,
    useDebugValue: it,
    useDeferredValue: it,
    useTransition: it,
    useSyncExternalStore: it,
    useId: it,
    useHostTransitionStatus: it,
    useFormState: it,
    useActionState: it,
    useOptimistic: it,
    useMemoCache: it,
    useCacheRefresh: it
  };
  Ii.useEffectEvent = it;
  var ih = {
    readContext: kt,
    use: yr,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: kt,
    useEffect: Yd,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Sr(
        4194308,
        4,
        Qd.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Sr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Sr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = qt();
      t = t === void 0 ? null : t;
      var l = e();
      if (ba) {
        _n(!0);
        try {
          e();
        } finally {
          _n(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = qt();
      if (n !== void 0) {
        var a = n(t);
        if (ba) {
          _n(!0);
          try {
            n(t);
          } finally {
            _n(!1);
          }
        }
      } else a = t;
      return l.memoizedState = l.baseState = a, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      }, l.queue = e, e = e.dispatch = Lb.bind(
        null,
        Ce,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = yc(e);
      var t = e.queue, n = nh.bind(null, Ce, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: _c,
    useDeferredValue: function(e, t) {
      var n = qt();
      return Ec(n, e, t);
    },
    useTransition: function() {
      var e = yc(!1);
      return e = Wd.bind(
        null,
        Ce,
        e.queue,
        !0,
        !1
      ), qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = Ce, a = qt();
      if (Be) {
        if (n === void 0)
          throw Error(u(407));
        n = n();
      } else {
        if (n = t(), Pe === null)
          throw Error(u(349));
        (Ue & 127) !== 0 || Td(l, t, n);
      }
      a.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return a.queue = o, Yd(zd.bind(null, l, o, e), [
        e
      ]), l.flags |= 2048, ii(
        9,
        { destroy: void 0 },
        Md.bind(
          null,
          l,
          o,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = qt(), t = Pe.identifierPrefix;
      if (Be) {
        var n = kn, l = jn;
        n = (l & ~(1 << 32 - Ht(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = vr++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Rb++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Cc,
    useFormState: Ld,
    useActionState: Ld,
    useOptimistic: function(e) {
      var t = qt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Tc.bind(
        null,
        Ce,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: pc,
    useCacheRefresh: function() {
      return qt().memoizedState = Ub.bind(
        null,
        Ce
      );
    },
    useEffectEvent: function(e) {
      var t = qt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((qe & 2) !== 0)
          throw Error(u(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Mc = {
    readContext: kt,
    use: yr,
    useCallback: Jd,
    useContext: kt,
    useEffect: Sc,
    useImperativeHandle: Kd,
    useInsertionEffect: Xd,
    useLayoutEffect: Zd,
    useMemo: $d,
    useReducer: xr,
    useRef: Vd,
    useState: function() {
      return xr(nl);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, t) {
      var n = ft();
      return Pd(
        n,
        Ke.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = xr(nl)[0], t = ft().memoizedState;
      return [
        typeof e == "boolean" ? e : Wi(e),
        t
      ];
    },
    useSyncExternalStore: Cd,
    useId: eh,
    useHostTransitionStatus: Cc,
    useFormState: Hd,
    useActionState: Hd,
    useOptimistic: function(e, t) {
      var n = ft();
      return Nd(n, Ke, e, t);
    },
    useMemoCache: pc,
    useCacheRefresh: th
  };
  Mc.useEffectEvent = qd;
  var oh = {
    readContext: kt,
    use: yr,
    useCallback: Jd,
    useContext: kt,
    useEffect: Sc,
    useImperativeHandle: Kd,
    useInsertionEffect: Xd,
    useLayoutEffect: Zd,
    useMemo: $d,
    useReducer: bc,
    useRef: Vd,
    useState: function() {
      return bc(nl);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, t) {
      var n = ft();
      return Ke === null ? Ec(n, e, t) : Pd(
        n,
        Ke.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = bc(nl)[0], t = ft().memoizedState;
      return [
        typeof e == "boolean" ? e : Wi(e),
        t
      ];
    },
    useSyncExternalStore: Cd,
    useId: eh,
    useHostTransitionStatus: Cc,
    useFormState: Gd,
    useActionState: Gd,
    useOptimistic: function(e, t) {
      var n = ft();
      return Ke !== null ? Nd(n, Ke, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: pc,
    useCacheRefresh: th
  };
  oh.useEffectEvent = qd;
  function zc(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : E({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var wc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = on(), a = zl(l);
      a.payload = t, n != null && (a.callback = n), t = wl(e, a, l), t !== null && (Wt(t, e, l), Ki(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = on(), a = zl(l);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = wl(e, a, l), t !== null && (Wt(t, e, l), Ki(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = on(), l = zl(n);
      l.tag = 2, t != null && (l.callback = t), t = wl(e, l, n), t !== null && (Wt(t, e, n), Ki(t, e, n));
    }
  };
  function rh(e, t, n, l, a, o, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, o, s) : t.prototype && t.prototype.isPureReactComponent ? !Bi(n, l) || !Bi(a, o) : !0;
  }
  function uh(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && wc.enqueueReplaceState(t, t.state, null);
  }
  function ya(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = E({}, n));
      for (var a in e)
        n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function ch(e) {
    tr(e);
  }
  function sh(e) {
    console.error(e);
  }
  function fh(e) {
    tr(e);
  }
  function Ar(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function dh(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Rc(e, t, n) {
    return n = zl(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Ar(e, t);
    }, n;
  }
  function hh(e) {
    return e = zl(e), e.tag = 3, e;
  }
  function mh(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var o = l.value;
      e.payload = function() {
        return a(o);
      }, e.callback = function() {
        dh(t, n, l);
      };
    }
    var s = n.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      dh(t, n, l), typeof a != "function" && (kl === null ? kl = /* @__PURE__ */ new Set([this]) : kl.add(this));
      var m = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function Hb(e, t, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Wa(
        t,
        n,
        a,
        !0
      ), n = tn.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return vn === null ? Ur() : n.alternate === null && ot === 0 && (ot = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === fr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), ts(e, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === fr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), ts(e, l, a)), !1;
        }
        throw Error(u(435, n.tag));
      }
      return ts(e, l, a), Ur(), !1;
    }
    if (Be)
      return t = tn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, l !== $u && (e = Error(u(422), { cause: l }), Yi(hn(e, n)))) : (l !== $u && (t = Error(u(423), {
        cause: l
      }), Yi(
        hn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, l = hn(l, n), a = Rc(
        e.stateNode,
        l,
        a
      ), oc(e, a), ot !== 4 && (ot = 2)), !1;
    var o = Error(u(520), { cause: l });
    if (o = hn(o, n), ro === null ? ro = [o] : ro.push(o), ot !== 4 && (ot = 2), t === null) return !0;
    l = hn(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Rc(n.stateNode, l, e), oc(n, e), !1;
        case 1:
          if (t = n.type, o = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (kl === null || !kl.has(o))))
            return n.flags |= 65536, a &= -a, n.lanes |= a, a = hh(a), mh(
              a,
              e,
              n,
              l
            ), oc(n, a), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Nc = Error(u(461)), pt = !1;
  function Ut(e, t, n, l) {
    t.child = e === null ? bd(t, null, n, l) : va(
      t,
      e.child,
      n,
      l
    );
  }
  function gh(e, t, n, l, a) {
    n = n.render;
    var o = t.ref;
    if ("ref" in l) {
      var s = {};
      for (var m in l)
        m !== "ref" && (s[m] = l[m]);
    } else s = l;
    return ha(t), l = dc(
      e,
      t,
      n,
      s,
      o,
      a
    ), m = hc(), e !== null && !pt ? (mc(e, t, a), ll(e, t, a)) : (Be && m && Ku(t), t.flags |= 1, Ut(e, t, l, a), t.child);
  }
  function ph(e, t, n, l, a) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Xu(o) && o.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = o, vh(
        e,
        t,
        o,
        l,
        a
      )) : (e = ir(
        n.type,
        null,
        l,
        t,
        t.mode,
        a
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, !Bc(e, a)) {
      var s = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Bi, n(s, l) && e.ref === t.ref)
        return ll(e, t, a);
    }
    return t.flags |= 1, e = Wn(o, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function vh(e, t, n, l, a) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Bi(o, l) && e.ref === t.ref)
        if (pt = !1, t.pendingProps = l = o, Bc(e, a))
          (e.flags & 131072) !== 0 && (pt = !0);
        else
          return t.lanes = e.lanes, ll(e, t, a);
    }
    return Oc(
      e,
      t,
      n,
      l,
      a
    );
  }
  function bh(e, t, n, l) {
    var a = l.children, o = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (o = o !== null ? o.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, a = 0; l !== null; )
            a = a | l.lanes | l.childLanes, l = l.sibling;
          l = a & ~o;
        } else l = 0, t.child = null;
        return yh(
          e,
          t,
          o,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && cr(
          t,
          o !== null ? o.cachePool : null
        ), o !== null ? Sd(t, o) : uc(), _d(t);
      else
        return l = t.lanes = 536870912, yh(
          e,
          t,
          o !== null ? o.baseLanes | n : n,
          n,
          l
        );
    } else
      o !== null ? (cr(t, o.cachePool), Sd(t, o), Nl(), t.memoizedState = null) : (e !== null && cr(t, null), uc(), Nl());
    return Ut(e, t, a, n), t.child;
  }
  function eo(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function yh(e, t, n, l, a) {
    var o = nc();
    return o = o === null ? null : { parent: mt._currentValue, pool: o }, t.memoizedState = {
      baseLanes: n,
      cachePool: o
    }, e !== null && cr(t, null), uc(), _d(t), e !== null && Wa(e, t, l, !0), t.childLanes = a, null;
  }
  function Cr(e, t) {
    return t = Mr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function xh(e, t, n) {
    return va(t, e.child, null, n), e = Cr(t, t.pendingProps), e.flags |= 2, nn(t), t.memoizedState = null, e;
  }
  function Bb(e, t, n) {
    var l = t.pendingProps, a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Be) {
        if (l.mode === "hidden")
          return e = Cr(t, l), t.lanes = 536870912, eo(null, e);
        if (sc(t), (e = et) ? (e = Om(
          e,
          pn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: El !== null ? { id: jn, overflow: kn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = ld(e), n.return = t, t.child = n, jt = t, et = null)) : e = null, e === null) throw Cl(t);
        return t.lanes = 536870912, null;
      }
      return Cr(t, l);
    }
    var o = e.memoizedState;
    if (o !== null) {
      var s = o.dehydrated;
      if (sc(t), a)
        if (t.flags & 256)
          t.flags &= -257, t = xh(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (pt || Wa(e, t, n, !1), a = (n & e.childLanes) !== 0, pt || a) {
        if (l = Pe, l !== null && (s = wi(l, n), s !== 0 && s !== o.retryLane))
          throw o.retryLane = s, ca(e, s), Wt(l, e, s), Nc;
        Ur(), t = xh(
          e,
          t,
          n
        );
      } else
        e = o.treeContext, et = bn(s.nextSibling), jt = t, Be = !0, Al = null, pn = !1, e !== null && od(t, e), t = Cr(t, l), t.flags |= 4096;
      return t;
    }
    return e = Wn(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Tr(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Oc(e, t, n, l, a) {
    return ha(t), n = dc(
      e,
      t,
      n,
      l,
      void 0,
      a
    ), l = hc(), e !== null && !pt ? (mc(e, t, a), ll(e, t, a)) : (Be && l && Ku(t), t.flags |= 1, Ut(e, t, n, a), t.child);
  }
  function Sh(e, t, n, l, a, o) {
    return ha(t), t.updateQueue = null, n = Ad(
      t,
      l,
      n,
      a
    ), Ed(e), l = hc(), e !== null && !pt ? (mc(e, t, o), ll(e, t, o)) : (Be && l && Ku(t), t.flags |= 1, Ut(e, t, n, o), t.child);
  }
  function _h(e, t, n, l, a) {
    if (ha(t), t.stateNode === null) {
      var o = Ka, s = n.contextType;
      typeof s == "object" && s !== null && (o = kt(s)), o = new n(l, o), t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = wc, t.stateNode = o, o._reactInternals = t, o = t.stateNode, o.props = l, o.state = t.memoizedState, o.refs = {}, ac(t), s = n.contextType, o.context = typeof s == "object" && s !== null ? kt(s) : Ka, o.state = t.memoizedState, s = n.getDerivedStateFromProps, typeof s == "function" && (zc(
        t,
        n,
        s,
        l
      ), o.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (s = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), s !== o.state && wc.enqueueReplaceState(o, o.state, null), $i(t, l, o, a), Ji(), o.state = t.memoizedState), typeof o.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      o = t.stateNode;
      var m = t.memoizedProps, _ = ya(n, m);
      o.props = _;
      var O = o.context, B = n.contextType;
      s = Ka, typeof B == "object" && B !== null && (s = kt(B));
      var K = n.getDerivedStateFromProps;
      B = typeof K == "function" || typeof o.getSnapshotBeforeUpdate == "function", m = t.pendingProps !== m, B || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (m || O !== s) && uh(
        t,
        o,
        l,
        s
      ), Ml = !1;
      var j = t.memoizedState;
      o.state = j, $i(t, l, o, a), Ji(), O = t.memoizedState, m || j !== O || Ml ? (typeof K == "function" && (zc(
        t,
        n,
        K,
        l
      ), O = t.memoizedState), (_ = Ml || rh(
        t,
        n,
        _,
        l,
        j,
        O,
        s
      )) ? (B || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = O), o.props = l, o.state = O, o.context = s, l = _) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      o = t.stateNode, ic(e, t), s = t.memoizedProps, B = ya(n, s), o.props = B, K = t.pendingProps, j = o.context, O = n.contextType, _ = Ka, typeof O == "object" && O !== null && (_ = kt(O)), m = n.getDerivedStateFromProps, (O = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== K || j !== _) && uh(
        t,
        o,
        l,
        _
      ), Ml = !1, j = t.memoizedState, o.state = j, $i(t, l, o, a), Ji();
      var U = t.memoizedState;
      s !== K || j !== U || Ml || e !== null && e.dependencies !== null && rr(e.dependencies) ? (typeof m == "function" && (zc(
        t,
        n,
        m,
        l
      ), U = t.memoizedState), (B = Ml || rh(
        t,
        n,
        B,
        l,
        j,
        U,
        _
      ) || e !== null && e.dependencies !== null && rr(e.dependencies)) ? (O || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(l, U, _), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        l,
        U,
        _
      )), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = U), o.props = l, o.state = U, o.context = _, l = B) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return o = l, Tr(e, t), l = (t.flags & 128) !== 0, o || l ? (o = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : o.render(), t.flags |= 1, e !== null && l ? (t.child = va(
      t,
      e.child,
      null,
      a
    ), t.child = va(
      t,
      null,
      n,
      a
    )) : Ut(e, t, n, a), t.memoizedState = o.state, e = t.child) : e = ll(
      e,
      t,
      a
    ), e;
  }
  function Eh(e, t, n, l) {
    return fa(), t.flags |= 256, Ut(e, t, n, l), t.child;
  }
  var Dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jc(e) {
    return { baseLanes: e, cachePool: dd() };
  }
  function kc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= an), e;
  }
  function Ah(e, t, n) {
    var l = t.pendingProps, a = !1, o = (t.flags & 128) !== 0, s;
    if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (st.current & 2) !== 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Be) {
        if (a ? Rl(t) : Nl(), (e = et) ? (e = Om(
          e,
          pn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: El !== null ? { id: jn, overflow: kn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = ld(e), n.return = t, t.child = n, jt = t, et = null)) : e = null, e === null) throw Cl(t);
        return vs(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var m = l.children;
      return l = l.fallback, a ? (Nl(), a = t.mode, m = Mr(
        { mode: "hidden", children: m },
        a
      ), l = sa(
        l,
        a,
        n,
        null
      ), m.return = t, l.return = t, m.sibling = l, t.child = m, l = t.child, l.memoizedState = jc(n), l.childLanes = kc(
        e,
        s,
        n
      ), t.memoizedState = Dc, eo(null, l)) : (Rl(t), Uc(t, m));
    }
    var _ = e.memoizedState;
    if (_ !== null && (m = _.dehydrated, m !== null)) {
      if (o)
        t.flags & 256 ? (Rl(t), t.flags &= -257, t = Lc(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (Nl(), t.child = e.child, t.flags |= 128, t = null) : (Nl(), m = l.fallback, a = t.mode, l = Mr(
          { mode: "visible", children: l.children },
          a
        ), m = sa(
          m,
          a,
          n,
          null
        ), m.flags |= 2, l.return = t, m.return = t, l.sibling = m, t.child = l, va(
          t,
          e.child,
          null,
          n
        ), l = t.child, l.memoizedState = jc(n), l.childLanes = kc(
          e,
          s,
          n
        ), t.memoizedState = Dc, t = eo(null, l));
      else if (Rl(t), vs(m)) {
        if (s = m.nextSibling && m.nextSibling.dataset, s) var O = s.dgst;
        s = O, l = Error(u(419)), l.stack = "", l.digest = s, Yi({ value: l, source: null, stack: null }), t = Lc(
          e,
          t,
          n
        );
      } else if (pt || Wa(e, t, n, !1), s = (n & e.childLanes) !== 0, pt || s) {
        if (s = Pe, s !== null && (l = wi(s, n), l !== 0 && l !== _.retryLane))
          throw _.retryLane = l, ca(e, l), Wt(s, e, l), Nc;
        ps(m) || Ur(), t = Lc(
          e,
          t,
          n
        );
      } else
        ps(m) ? (t.flags |= 192, t.child = e.child, t = null) : (e = _.treeContext, et = bn(
          m.nextSibling
        ), jt = t, Be = !0, Al = null, pn = !1, e !== null && od(t, e), t = Uc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return a ? (Nl(), m = l.fallback, a = t.mode, _ = e.child, O = _.sibling, l = Wn(_, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = _.subtreeFlags & 65011712, O !== null ? m = Wn(
      O,
      m
    ) : (m = sa(
      m,
      a,
      n,
      null
    ), m.flags |= 2), m.return = t, l.return = t, l.sibling = m, t.child = l, eo(null, l), l = t.child, m = e.child.memoizedState, m === null ? m = jc(n) : (a = m.cachePool, a !== null ? (_ = mt._currentValue, a = a.parent !== _ ? { parent: _, pool: _ } : a) : a = dd(), m = {
      baseLanes: m.baseLanes | n,
      cachePool: a
    }), l.memoizedState = m, l.childLanes = kc(
      e,
      s,
      n
    ), t.memoizedState = Dc, eo(e.child, l)) : (Rl(t), n = e.child, e = n.sibling, n = Wn(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Uc(e, t) {
    return t = Mr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Mr(e, t) {
    return e = en(22, e, null, t), e.lanes = 0, e;
  }
  function Lc(e, t, n) {
    return va(t, e.child, null, n), e = Uc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ch(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Fu(e.return, t, n);
  }
  function Hc(e, t, n, l, a, o) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: a,
      treeForkCount: o
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = l, s.tail = n, s.tailMode = a, s.treeForkCount = o);
  }
  function Th(e, t, n) {
    var l = t.pendingProps, a = l.revealOrder, o = l.tail;
    l = l.children;
    var s = st.current, m = (s & 2) !== 0;
    if (m ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, ee(st, s), Ut(e, t, l, n), l = Be ? Vi : 0, !m && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ch(e, n, t);
        else if (e.tag === 19)
          Ch(e, n, t);
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
    switch (a) {
      case "forwards":
        for (n = t.child, a = null; n !== null; )
          e = n.alternate, e !== null && gr(e) === null && (a = n), n = n.sibling;
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Hc(
          t,
          !1,
          a,
          n,
          o,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && gr(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        Hc(
          t,
          !0,
          n,
          null,
          o,
          l
        );
        break;
      case "together":
        Hc(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ll(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), jl |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Wa(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, n = Wn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Wn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Bc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && rr(e)));
  }
  function Gb(e, t, n) {
    switch (t.tag) {
      case 3:
        Ie(t, t.stateNode.containerInfo), Tl(t, mt, e.memoizedState.cache), fa();
        break;
      case 27:
      case 5:
        Vt(t);
        break;
      case 4:
        Ie(t, t.stateNode.containerInfo);
        break;
      case 10:
        Tl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, sc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Rl(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Ah(e, t, n) : (Rl(t), e = ll(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Rl(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (Wa(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), a) {
          if (l)
            return Th(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), ee(st, st.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, bh(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Tl(t, mt, e.memoizedState.cache);
    }
    return ll(e, t, n);
  }
  function Mh(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        pt = !0;
      else {
        if (!Bc(e, n) && (t.flags & 128) === 0)
          return pt = !1, Gb(
            e,
            t,
            n
          );
        pt = (e.flags & 131072) !== 0;
      }
    else
      pt = !1, Be && (t.flags & 1048576) !== 0 && id(t, Vi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = ga(t.elementType), t.type = e, typeof e == "function")
            Xu(e) ? (l = ya(e, l), t.tag = 1, t = _h(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Oc(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === le) {
                t.tag = 11, t = gh(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === ie) {
                t.tag = 14, t = ph(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              }
            }
            throw t = Fe(e) || e, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return Oc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, a = ya(
          l,
          t.pendingProps
        ), _h(
          e,
          t,
          l,
          a,
          n
        );
      case 3:
        e: {
          if (Ie(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          l = t.pendingProps;
          var o = t.memoizedState;
          a = o.element, ic(e, t), $i(t, l, null, n);
          var s = t.memoizedState;
          if (l = s.cache, Tl(t, mt, l), l !== o.cache && Iu(
            t,
            [mt],
            n,
            !0
          ), Ji(), l = s.element, o.isDehydrated)
            if (o = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
              t = Eh(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== a) {
              a = hn(
                Error(u(424)),
                t
              ), Yi(a), t = Eh(
                e,
                t,
                l,
                n
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, et = bn(e.firstChild), jt = t, Be = !0, Al = null, pn = !0, n = bd(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (fa(), l === a) {
              t = ll(
                e,
                t,
                n
              );
              break e;
            }
            Ut(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Tr(e, t), e === null ? (n = Hm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Be || (n = t.type, e = t.pendingProps, l = qr(
          he.current
        ).createElement(n), l[xt] = t, l[St] = e, Lt(l, n, e), ht(l), t.stateNode = l) : t.memoizedState = Hm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Vt(t), e === null && Be && (l = t.stateNode = km(
          t.type,
          t.pendingProps,
          he.current
        ), jt = t, pn = !0, a = et, Bl(t.type) ? (bs = a, et = bn(l.firstChild)) : et = a), Ut(
          e,
          t,
          t.pendingProps.children,
          n
        ), Tr(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Be && ((a = l = et) && (l = py(
          l,
          t.type,
          t.pendingProps,
          pn
        ), l !== null ? (t.stateNode = l, jt = t, et = bn(l.firstChild), pn = !1, a = !0) : a = !1), a || Cl(t)), Vt(t), a = t.type, o = t.pendingProps, s = e !== null ? e.memoizedProps : null, l = o.children, hs(a, o) ? l = null : s !== null && hs(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = dc(
          e,
          t,
          Nb,
          null,
          null,
          n
        ), po._currentValue = a), Tr(e, t), Ut(e, t, l, n), t.child;
      case 6:
        return e === null && Be && ((e = n = et) && (n = vy(
          n,
          t.pendingProps,
          pn
        ), n !== null ? (t.stateNode = n, jt = t, et = null, e = !0) : e = !1), e || Cl(t)), null;
      case 13:
        return Ah(e, t, n);
      case 4:
        return Ie(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = va(
          t,
          null,
          l,
          n
        ) : Ut(e, t, l, n), t.child;
      case 11:
        return gh(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return Ut(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return Ut(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return Ut(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return l = t.pendingProps, Tl(t, t.type, l.value), Ut(e, t, l.children, n), t.child;
      case 9:
        return a = t.type._context, l = t.pendingProps.children, ha(t), a = kt(a), l = l(a), t.flags |= 1, Ut(e, t, l, n), t.child;
      case 14:
        return ph(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return vh(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Th(e, t, n);
      case 31:
        return Bb(e, t, n);
      case 22:
        return bh(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return ha(t), l = kt(mt), e === null ? (a = nc(), a === null && (a = Pe, o = ec(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = { parent: l, cache: a }, ac(t), Tl(t, mt, a)) : ((e.lanes & n) !== 0 && (ic(e, t), $i(t, null, null, n), Ji()), a = e.memoizedState, o = t.memoizedState, a.parent !== l ? (a = { parent: l, cache: l }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Tl(t, mt, l)) : (l = o.cache, Tl(t, mt, l), l !== a.cache && Iu(
          t,
          [mt],
          n,
          !0
        ))), Ut(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function al(e) {
    e.flags |= 4;
  }
  function Gc(e, t, n, l, a) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (a & 335544128) === a)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (em()) e.flags |= 8192;
        else
          throw pa = fr, lc;
    } else e.flags &= -16777217;
  }
  function zh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !qm(t))
      if (em()) e.flags |= 8192;
      else
        throw pa = fr, lc;
  }
  function zr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? qo() : 536870912, e.lanes |= t, ci |= t);
  }
  function to(e, t) {
    if (!Be)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function tt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 65011712, l |= a.flags & 65011712, a.return = e, a = a.sibling;
    else
      for (a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function Vb(e, t, n) {
    var l = t.pendingProps;
    switch (Ju(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return tt(t), null;
      case 1:
        return tt(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), el(mt), _e(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Pa(t) ? al(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Pu())), tt(t), null;
      case 26:
        var a = t.type, o = t.memoizedState;
        return e === null ? (al(t), o !== null ? (tt(t), zh(t, o)) : (tt(t), Gc(
          t,
          a,
          null,
          l,
          n
        ))) : o ? o !== e.memoizedState ? (al(t), tt(t), zh(t, o)) : (tt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && al(t), tt(t), Gc(
          t,
          a,
          e,
          l,
          n
        )), null;
      case 27:
        if (Tt(t), n = he.current, a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && al(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(u(166));
            return tt(t), null;
          }
          e = F.current, Pa(t) ? rd(t) : (e = km(a, l, n), t.stateNode = e, al(t));
        }
        return tt(t), null;
      case 5:
        if (Tt(t), a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && al(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(u(166));
            return tt(t), null;
          }
          if (o = F.current, Pa(t))
            rd(t);
          else {
            var s = qr(
              he.current
            );
            switch (o) {
              case 1:
                o = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                o = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    o = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    o = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(
                      o.firstChild
                    );
                    break;
                  case "select":
                    o = typeof l.is == "string" ? s.createElement("select", {
                      is: l.is
                    }) : s.createElement("select"), l.multiple ? o.multiple = !0 : l.size && (o.size = l.size);
                    break;
                  default:
                    o = typeof l.is == "string" ? s.createElement(a, { is: l.is }) : s.createElement(a);
                }
            }
            o[xt] = t, o[St] = l;
            e: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                o.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === t) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === t)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            t.stateNode = o;
            e: switch (Lt(o, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && al(t);
          }
        }
        return tt(t), Gc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && al(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = he.current, Pa(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, a = jt, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            e[xt] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Am(e.nodeValue, n)), e || Cl(t, !0);
          } else
            e = qr(e).createTextNode(
              l
            ), e[xt] = t, t.stateNode = e;
        }
        return tt(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Pa(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[xt] = t;
            } else
              fa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            tt(t), e = !1;
          } else
            n = Pu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (nn(t), t) : (nn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return tt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Pa(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(u(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(u(317));
              a[xt] = t;
            } else
              fa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            tt(t), a = !1;
          } else
            a = Pu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return t.flags & 256 ? (nn(t), t) : (nn(t), null);
        }
        return nn(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), o = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (o = l.memoizedState.cachePool.pool), o !== a && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), zr(t, t.updateQueue), tt(t), null);
      case 4:
        return _e(), e === null && us(t.stateNode.containerInfo), tt(t), null;
      case 10:
        return el(t.type), tt(t), null;
      case 19:
        if (V(st), l = t.memoizedState, l === null) return tt(t), null;
        if (a = (t.flags & 128) !== 0, o = l.rendering, o === null)
          if (a) to(l, !1);
          else {
            if (ot !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (o = gr(e), o !== null) {
                  for (t.flags |= 128, to(l, !1), e = o.updateQueue, t.updateQueue = e, zr(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    nd(n, e), n = n.sibling;
                  return ee(
                    st,
                    st.current & 1 | 2
                  ), Be && Fn(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && yt() > Dr && (t.flags |= 128, a = !0, to(l, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (e = gr(o), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, zr(t, e), to(l, !0), l.tail === null && l.tailMode === "hidden" && !o.alternate && !Be)
                return tt(t), null;
            } else
              2 * yt() - l.renderingStartTime > Dr && n !== 536870912 && (t.flags |= 128, a = !0, to(l, !1), t.lanes = 4194304);
          l.isBackwards ? (o.sibling = t.child, t.child = o) : (e = l.last, e !== null ? e.sibling = o : t.child = o, l.last = o);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = yt(), e.sibling = null, n = st.current, ee(
          st,
          a ? n & 1 | 2 : n & 1
        ), Be && Fn(t, l.treeForkCount), e) : (tt(t), null);
      case 22:
      case 23:
        return nn(t), cc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (tt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : tt(t), n = t.updateQueue, n !== null && zr(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && V(ma), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), el(mt), tt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Yb(e, t) {
    switch (Ju(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return el(mt), _e(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Tt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (nn(t), t.alternate === null)
            throw Error(u(340));
          fa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (nn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          fa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return V(st), null;
      case 4:
        return _e(), null;
      case 10:
        return el(t.type), null;
      case 22:
      case 23:
        return nn(t), cc(), e !== null && V(ma), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return el(mt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wh(e, t) {
    switch (Ju(t), t.tag) {
      case 3:
        el(mt), _e();
        break;
      case 26:
      case 27:
      case 5:
        Tt(t);
        break;
      case 4:
        _e();
        break;
      case 31:
        t.memoizedState !== null && nn(t);
        break;
      case 13:
        nn(t);
        break;
      case 19:
        V(st);
        break;
      case 10:
        el(t.type);
        break;
      case 22:
      case 23:
        nn(t), cc(), e !== null && V(ma);
        break;
      case 24:
        el(mt);
    }
  }
  function no(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var o = n.create, s = n.inst;
            l = o(), s.destroy = l;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (m) {
      Qe(t, t.return, m);
    }
  }
  function Ol(e, t, n) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var o = a.next;
        l = o;
        do {
          if ((l.tag & e) === e) {
            var s = l.inst, m = s.destroy;
            if (m !== void 0) {
              s.destroy = void 0, a = t;
              var _ = n, O = m;
              try {
                O();
              } catch (B) {
                Qe(
                  a,
                  _,
                  B
                );
              }
            }
          }
          l = l.next;
        } while (l !== o);
      }
    } catch (B) {
      Qe(t, t.return, B);
    }
  }
  function Rh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        xd(t, n);
      } catch (l) {
        Qe(e, e.return, l);
      }
    }
  }
  function Nh(e, t, n) {
    n.props = ya(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Qe(e, t, l);
    }
  }
  function lo(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (a) {
      Qe(e, t, a);
    }
  }
  function Un(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          Qe(e, t, a);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          Qe(e, t, a);
        }
      else n.current = null;
  }
  function Oh(e) {
    var t = e.type, n = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      Qe(e, e.return, a);
    }
  }
  function Vc(e, t, n) {
    try {
      var l = e.stateNode;
      sy(l, e.type, n, t), l[St] = t;
    } catch (a) {
      Qe(e, e.return, a);
    }
  }
  function Dh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Bl(e.type) || e.tag === 4;
  }
  function Yc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Dh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Bl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function qc(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = de));
    else if (l !== 4 && (l === 27 && Bl(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (qc(e, t, n), e = e.sibling; e !== null; )
        qc(e, t, n), e = e.sibling;
  }
  function wr(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (l !== 4 && (l === 27 && Bl(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (wr(e, t, n), e = e.sibling; e !== null; )
        wr(e, t, n), e = e.sibling;
  }
  function jh(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      Lt(t, l, n), t[xt] = e, t[St] = n;
    } catch (o) {
      Qe(e, e.return, o);
    }
  }
  var il = !1, vt = !1, Xc = !1, kh = typeof WeakSet == "function" ? WeakSet : Set, Rt = null;
  function qb(e, t) {
    if (e = e.containerInfo, fs = Pr, e = Kf(e), Lu(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var a = l.anchorOffset, o = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, o.nodeType;
            } catch {
              n = null;
              break e;
            }
            var s = 0, m = -1, _ = -1, O = 0, B = 0, K = e, j = null;
            t: for (; ; ) {
              for (var U; K !== n || a !== 0 && K.nodeType !== 3 || (m = s + a), K !== o || l !== 0 && K.nodeType !== 3 || (_ = s + l), K.nodeType === 3 && (s += K.nodeValue.length), (U = K.firstChild) !== null; )
                j = K, K = U;
              for (; ; ) {
                if (K === e) break t;
                if (j === n && ++O === a && (m = s), j === o && ++B === l && (_ = s), (U = K.nextSibling) !== null) break;
                K = j, j = K.parentNode;
              }
              K = U;
            }
            n = m === -1 || _ === -1 ? null : { start: m, end: _ };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ds = { focusedElem: e, selectionRange: n }, Pr = !1, Rt = t; Rt !== null; )
      if (t = Rt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Rt = e;
      else
        for (; Rt !== null; ) {
          switch (t = Rt, o = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  a = e[n], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && o !== null) {
                e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, l = n.stateNode;
                try {
                  var se = ya(
                    n.type,
                    a
                  );
                  e = l.getSnapshotBeforeUpdate(
                    se,
                    o
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ye) {
                  Qe(
                    n,
                    n.return,
                    ye
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  gs(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      gs(e);
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
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Rt = e;
            break;
          }
          Rt = t.return;
        }
  }
  function Uh(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        rl(e, n), l & 4 && no(5, n);
        break;
      case 1:
        if (rl(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (s) {
              Qe(n, n.return, s);
            }
          else {
            var a = ya(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                a,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              Qe(
                n,
                n.return,
                s
              );
            }
          }
        l & 64 && Rh(n), l & 512 && lo(n, n.return);
        break;
      case 3:
        if (rl(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            xd(e, t);
          } catch (s) {
            Qe(n, n.return, s);
          }
        }
        break;
      case 27:
        t === null && l & 4 && jh(n);
      case 26:
      case 5:
        rl(e, n), t === null && l & 4 && Oh(n), l & 512 && lo(n, n.return);
        break;
      case 12:
        rl(e, n);
        break;
      case 31:
        rl(e, n), l & 4 && Bh(e, n);
        break;
      case 13:
        rl(e, n), l & 4 && Gh(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Fb.bind(
          null,
          n
        ), by(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || il, !l) {
          t = t !== null && t.memoizedState !== null || vt, a = il;
          var o = vt;
          il = l, (vt = t) && !o ? ul(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : rl(e, n), il = a, vt = o;
        }
        break;
      case 30:
        break;
      default:
        rl(e, n);
    }
  }
  function Lh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Lh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ga(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var lt = null, Kt = !1;
  function ol(e, t, n) {
    for (n = n.child; n !== null; )
      Hh(e, t, n), n = n.sibling;
  }
  function Hh(e, t, n) {
    if (dt && typeof dt.onCommitFiberUnmount == "function")
      try {
        dt.onCommitFiberUnmount(xl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        vt || Un(n, t), ol(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        vt || Un(n, t);
        var l = lt, a = Kt;
        Bl(n.type) && (lt = n.stateNode, Kt = !1), ol(
          e,
          t,
          n
        ), ho(n.stateNode), lt = l, Kt = a;
        break;
      case 5:
        vt || Un(n, t);
      case 6:
        if (l = lt, a = Kt, lt = null, ol(
          e,
          t,
          n
        ), lt = l, Kt = a, lt !== null)
          if (Kt)
            try {
              (lt.nodeType === 9 ? lt.body : lt.nodeName === "HTML" ? lt.ownerDocument.body : lt).removeChild(n.stateNode);
            } catch (o) {
              Qe(
                n,
                t,
                o
              );
            }
          else
            try {
              lt.removeChild(n.stateNode);
            } catch (o) {
              Qe(
                n,
                t,
                o
              );
            }
        break;
      case 18:
        lt !== null && (Kt ? (e = lt, Rm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), vi(e)) : Rm(lt, n.stateNode));
        break;
      case 4:
        l = lt, a = Kt, lt = n.stateNode.containerInfo, Kt = !0, ol(
          e,
          t,
          n
        ), lt = l, Kt = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ol(2, n, t), vt || Ol(4, n, t), ol(
          e,
          t,
          n
        );
        break;
      case 1:
        vt || (Un(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && Nh(
          n,
          t,
          l
        )), ol(
          e,
          t,
          n
        );
        break;
      case 21:
        ol(
          e,
          t,
          n
        );
        break;
      case 22:
        vt = (l = vt) || n.memoizedState !== null, ol(
          e,
          t,
          n
        ), vt = l;
        break;
      default:
        ol(
          e,
          t,
          n
        );
    }
  }
  function Bh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        vi(e);
      } catch (n) {
        Qe(t, t.return, n);
      }
    }
  }
  function Gh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        vi(e);
      } catch (n) {
        Qe(t, t.return, n);
      }
  }
  function Xb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new kh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new kh()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Rr(e, t) {
    var n = Xb(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var a = Ib.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function Jt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l], o = e, s = t, m = s;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Bl(m.type)) {
                lt = m.stateNode, Kt = !1;
                break e;
              }
              break;
            case 5:
              lt = m.stateNode, Kt = !1;
              break e;
            case 3:
            case 4:
              lt = m.stateNode.containerInfo, Kt = !0;
              break e;
          }
          m = m.return;
        }
        if (lt === null) throw Error(u(160));
        Hh(o, s, a), lt = null, Kt = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Vh(t, e), t = t.sibling;
  }
  var Mn = null;
  function Vh(e, t) {
    var n = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Jt(t, e), $t(e), l & 4 && (Ol(3, e, e.return), no(3, e), Ol(5, e, e.return));
        break;
      case 1:
        Jt(t, e), $t(e), l & 512 && (vt || n === null || Un(n, n.return)), l & 64 && il && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var a = Mn;
        if (Jt(t, e), $t(e), l & 512 && (vt || n === null || Un(n, n.return)), l & 4) {
          var o = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
                  t: switch (l) {
                    case "title":
                      o = a.getElementsByTagName("title")[0], (!o || o[Nn] || o[xt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(l), a.head.insertBefore(
                        o,
                        a.querySelector("head > title")
                      )), Lt(o, l, n), o[xt] = e, ht(o), l = o;
                      break e;
                    case "link":
                      var s = Vm(
                        "link",
                        "href",
                        a
                      ).get(l + (n.href || ""));
                      if (s) {
                        for (var m = 0; m < s.length; m++)
                          if (o = s[m], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            s.splice(m, 1);
                            break t;
                          }
                      }
                      o = a.createElement(l), Lt(o, l, n), a.head.appendChild(o);
                      break;
                    case "meta":
                      if (s = Vm(
                        "meta",
                        "content",
                        a
                      ).get(l + (n.content || ""))) {
                        for (m = 0; m < s.length; m++)
                          if (o = s[m], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            s.splice(m, 1);
                            break t;
                          }
                      }
                      o = a.createElement(l), Lt(o, l, n), a.head.appendChild(o);
                      break;
                    default:
                      throw Error(u(468, l));
                  }
                  o[xt] = e, ht(o), l = o;
                }
                e.stateNode = l;
              } else
                Ym(
                  a,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Gm(
                a,
                l,
                e.memoizedProps
              );
          else
            o !== l ? (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, l === null ? Ym(
              a,
              e.type,
              e.stateNode
            ) : Gm(
              a,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Vc(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Jt(t, e), $t(e), l & 512 && (vt || n === null || Un(n, n.return)), n !== null && l & 4 && Vc(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Jt(t, e), $t(e), l & 512 && (vt || n === null || Un(n, n.return)), e.flags & 32) {
          a = e.stateNode;
          try {
            x(a, "");
          } catch (se) {
            Qe(e, e.return, se);
          }
        }
        l & 4 && e.stateNode != null && (a = e.memoizedProps, Vc(
          e,
          a,
          n !== null ? n.memoizedProps : a
        )), l & 1024 && (Xc = !0);
        break;
      case 6:
        if (Jt(t, e), $t(e), l & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (se) {
            Qe(e, e.return, se);
          }
        }
        break;
      case 3:
        if (Qr = null, a = Mn, Mn = Xr(t.containerInfo), Jt(t, e), Mn = a, $t(e), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            vi(t.containerInfo);
          } catch (se) {
            Qe(e, e.return, se);
          }
        Xc && (Xc = !1, Yh(e));
        break;
      case 4:
        l = Mn, Mn = Xr(
          e.stateNode.containerInfo
        ), Jt(t, e), $t(e), Mn = l;
        break;
      case 12:
        Jt(t, e), $t(e);
        break;
      case 31:
        Jt(t, e), $t(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Rr(e, l)));
        break;
      case 13:
        Jt(t, e), $t(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Or = yt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Rr(e, l)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var _ = n !== null && n.memoizedState !== null, O = il, B = vt;
        if (il = O || a, vt = B || _, Jt(t, e), vt = B, il = O, $t(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || _ || il || vt || xa(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                _ = n = t;
                try {
                  if (o = _.stateNode, a)
                    s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                  else {
                    m = _.stateNode;
                    var K = _.memoizedProps.style, j = K != null && K.hasOwnProperty("display") ? K.display : null;
                    m.style.display = j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (se) {
                  Qe(_, _.return, se);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                _ = t;
                try {
                  _.stateNode.nodeValue = a ? "" : _.memoizedProps;
                } catch (se) {
                  Qe(_, _.return, se);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                _ = t;
                try {
                  var U = _.stateNode;
                  a ? Nm(U, !0) : Nm(_.stateNode, !1);
                } catch (se) {
                  Qe(_, _.return, se);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), t = t.return;
            }
            n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, Rr(e, n))));
        break;
      case 19:
        Jt(t, e), $t(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Rr(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Jt(t, e), $t(e);
    }
  }
  function $t(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (Dh(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode, o = Yc(e);
            wr(e, o, a);
            break;
          case 5:
            var s = n.stateNode;
            n.flags & 32 && (x(s, ""), n.flags &= -33);
            var m = Yc(e);
            wr(e, m, s);
            break;
          case 3:
          case 4:
            var _ = n.stateNode.containerInfo, O = Yc(e);
            qc(
              e,
              O,
              _
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (B) {
        Qe(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Yh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Yh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function rl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Uh(e, t.alternate, t), t = t.sibling;
  }
  function xa(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ol(4, t, t.return), xa(t);
          break;
        case 1:
          Un(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Nh(
            t,
            t.return,
            n
          ), xa(t);
          break;
        case 27:
          ho(t.stateNode);
        case 26:
        case 5:
          Un(t, t.return), xa(t);
          break;
        case 22:
          t.memoizedState === null && xa(t);
          break;
        case 30:
          xa(t);
          break;
        default:
          xa(t);
      }
      e = e.sibling;
    }
  }
  function ul(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, a = e, o = t, s = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          ul(
            a,
            o,
            n
          ), no(4, o);
          break;
        case 1:
          if (ul(
            a,
            o,
            n
          ), l = o, a = l.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (O) {
              Qe(l, l.return, O);
            }
          if (l = o, a = l.updateQueue, a !== null) {
            var m = l.stateNode;
            try {
              var _ = a.shared.hiddenCallbacks;
              if (_ !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < _.length; a++)
                  yd(_[a], m);
            } catch (O) {
              Qe(l, l.return, O);
            }
          }
          n && s & 64 && Rh(o), lo(o, o.return);
          break;
        case 27:
          jh(o);
        case 26:
        case 5:
          ul(
            a,
            o,
            n
          ), n && l === null && s & 4 && Oh(o), lo(o, o.return);
          break;
        case 12:
          ul(
            a,
            o,
            n
          );
          break;
        case 31:
          ul(
            a,
            o,
            n
          ), n && s & 4 && Bh(a, o);
          break;
        case 13:
          ul(
            a,
            o,
            n
          ), n && s & 4 && Gh(a, o);
          break;
        case 22:
          o.memoizedState === null && ul(
            a,
            o,
            n
          ), lo(o, o.return);
          break;
        case 30:
          break;
        default:
          ul(
            a,
            o,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Zc(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && qi(n));
  }
  function Qc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && qi(e));
  }
  function zn(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        qh(
          e,
          t,
          n,
          l
        ), t = t.sibling;
  }
  function qh(e, t, n, l) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        zn(
          e,
          t,
          n,
          l
        ), a & 2048 && no(9, t);
        break;
      case 1:
        zn(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        zn(
          e,
          t,
          n,
          l
        ), a & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && qi(e)));
        break;
      case 12:
        if (a & 2048) {
          zn(
            e,
            t,
            n,
            l
          ), e = t.stateNode;
          try {
            var o = t.memoizedProps, s = o.id, m = o.onPostCommit;
            typeof m == "function" && m(
              s,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (_) {
            Qe(t, t.return, _);
          }
        } else
          zn(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        zn(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        zn(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        o = t.stateNode, s = t.alternate, t.memoizedState !== null ? o._visibility & 2 ? zn(
          e,
          t,
          n,
          l
        ) : ao(e, t) : o._visibility & 2 ? zn(
          e,
          t,
          n,
          l
        ) : (o._visibility |= 2, oi(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Zc(s, t);
        break;
      case 24:
        zn(
          e,
          t,
          n,
          l
        ), a & 2048 && Qc(t.alternate, t);
        break;
      default:
        zn(
          e,
          t,
          n,
          l
        );
    }
  }
  function oi(e, t, n, l, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var o = e, s = t, m = n, _ = l, O = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          oi(
            o,
            s,
            m,
            _,
            a
          ), no(8, s);
          break;
        case 23:
          break;
        case 22:
          var B = s.stateNode;
          s.memoizedState !== null ? B._visibility & 2 ? oi(
            o,
            s,
            m,
            _,
            a
          ) : ao(
            o,
            s
          ) : (B._visibility |= 2, oi(
            o,
            s,
            m,
            _,
            a
          )), a && O & 2048 && Zc(
            s.alternate,
            s
          );
          break;
        case 24:
          oi(
            o,
            s,
            m,
            _,
            a
          ), a && O & 2048 && Qc(s.alternate, s);
          break;
        default:
          oi(
            o,
            s,
            m,
            _,
            a
          );
      }
      t = t.sibling;
    }
  }
  function ao(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, a = l.flags;
        switch (l.tag) {
          case 22:
            ao(n, l), a & 2048 && Zc(
              l.alternate,
              l
            );
            break;
          case 24:
            ao(n, l), a & 2048 && Qc(l.alternate, l);
            break;
          default:
            ao(n, l);
        }
        t = t.sibling;
      }
  }
  var io = 8192;
  function ri(e, t, n) {
    if (e.subtreeFlags & io)
      for (e = e.child; e !== null; )
        Xh(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Xh(e, t, n) {
    switch (e.tag) {
      case 26:
        ri(
          e,
          t,
          n
        ), e.flags & io && e.memoizedState !== null && Ry(
          n,
          Mn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ri(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var l = Mn;
        Mn = Xr(e.stateNode.containerInfo), ri(
          e,
          t,
          n
        ), Mn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = io, io = 16777216, ri(
          e,
          t,
          n
        ), io = l) : ri(
          e,
          t,
          n
        ));
        break;
      default:
        ri(
          e,
          t,
          n
        );
    }
  }
  function Zh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function oo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Rt = l, Kh(
            l,
            e
          );
        }
      Zh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Qh(e), e = e.sibling;
  }
  function Qh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        oo(e), e.flags & 2048 && Ol(9, e, e.return);
        break;
      case 3:
        oo(e);
        break;
      case 12:
        oo(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Nr(e)) : oo(e);
        break;
      default:
        oo(e);
    }
  }
  function Nr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Rt = l, Kh(
            l,
            e
          );
        }
      Zh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Ol(8, t, t.return), Nr(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Nr(t));
          break;
        default:
          Nr(t);
      }
      e = e.sibling;
    }
  }
  function Kh(e, t) {
    for (; Rt !== null; ) {
      var n = Rt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Ol(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          qi(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Rt = l;
      else
        e: for (n = e; Rt !== null; ) {
          l = Rt;
          var a = l.sibling, o = l.return;
          if (Lh(l), l === n) {
            Rt = null;
            break e;
          }
          if (a !== null) {
            a.return = o, Rt = a;
            break e;
          }
          Rt = o;
        }
    }
  }
  var Zb = {
    getCacheForType: function(e) {
      var t = kt(mt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return kt(mt).controller.signal;
    }
  }, Qb = typeof WeakMap == "function" ? WeakMap : Map, qe = 0, Pe = null, Oe = null, Ue = 0, Ze = 0, ln = null, Dl = !1, ui = !1, Kc = !1, cl = 0, ot = 0, jl = 0, Sa = 0, Jc = 0, an = 0, ci = 0, ro = null, Pt = null, $c = !1, Or = 0, Jh = 0, Dr = 1 / 0, jr = null, kl = null, At = 0, Ul = null, si = null, sl = 0, Pc = 0, Wc = null, $h = null, uo = 0, Fc = null;
  function on() {
    return (qe & 2) !== 0 && Ue !== 0 ? Ue & -Ue : D.T !== null ? as() : ke();
  }
  function Ph() {
    if (an === 0)
      if ((Ue & 536870912) === 0 || Be) {
        var e = ja;
        ja <<= 1, (ja & 3932160) === 0 && (ja = 262144), an = e;
      } else an = 536870912;
    return e = tn.current, e !== null && (e.flags |= 32), an;
  }
  function Wt(e, t, n) {
    (e === Pe && (Ze === 2 || Ze === 9) || e.cancelPendingCommit !== null) && (fi(e, 0), Ll(
      e,
      Ue,
      an,
      !1
    )), Fl(e, n), ((qe & 2) === 0 || e !== Pe) && (e === Pe && ((qe & 2) === 0 && (Sa |= n), ot === 4 && Ll(
      e,
      Ue,
      an,
      !1
    )), Ln(e));
  }
  function Wh(e, t, n) {
    if ((qe & 6) !== 0) throw Error(u(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Wl(e, t), a = l ? $b(e, t) : es(e, t, !0), o = l;
    do {
      if (a === 0) {
        ui && !l && Ll(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, o && !Kb(n)) {
          a = es(e, t, !1), o = !1;
          continue;
        }
        if (a === 2) {
          if (o = t, e.errorRecoveryDisabledLanes & o)
            var s = 0;
          else
            s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            t = s;
            e: {
              var m = e;
              a = ro;
              var _ = m.current.memoizedState.isDehydrated;
              if (_ && (fi(m, s).flags |= 256), s = es(
                m,
                s,
                !1
              ), s !== 2) {
                if (Kc && !_) {
                  m.errorRecoveryDisabledLanes |= o, Sa |= o, a = 4;
                  break e;
                }
                o = Pt, Pt = a, o !== null && (Pt === null ? Pt = o : Pt.push.apply(
                  Pt,
                  o
                ));
              }
              a = s;
            }
            if (o = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          fi(e, 0), Ll(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, o = a, o) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ll(
                l,
                t,
                an,
                !Dl
              );
              break e;
            case 2:
              Pt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (a = Or + 300 - yt(), 10 < a)) {
            if (Ll(
              l,
              t,
              an,
              !Dl
            ), Ua(l, 0, !0) !== 0) break e;
            sl = t, l.timeoutHandle = zm(
              Fh.bind(
                null,
                l,
                n,
                Pt,
                jr,
                $c,
                t,
                an,
                Sa,
                ci,
                Dl,
                o,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break e;
          }
          Fh(
            l,
            n,
            Pt,
            jr,
            $c,
            t,
            an,
            Sa,
            ci,
            Dl,
            o,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ln(e);
  }
  function Fh(e, t, n, l, a, o, s, m, _, O, B, K, j, U) {
    if (e.timeoutHandle = -1, K = t.subtreeFlags, K & 8192 || (K & 16785408) === 16785408) {
      K = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: de
      }, Xh(
        t,
        o,
        K
      );
      var se = (o & 62914560) === o ? Or - yt() : (o & 4194048) === o ? Jh - yt() : 0;
      if (se = Ny(
        K,
        se
      ), se !== null) {
        sl = o, e.cancelPendingCommit = se(
          om.bind(
            null,
            e,
            t,
            o,
            n,
            l,
            a,
            s,
            m,
            _,
            B,
            K,
            null,
            j,
            U
          )
        ), Ll(e, o, s, !O);
        return;
      }
    }
    om(
      e,
      t,
      o,
      n,
      l,
      a,
      s,
      m,
      _
    );
  }
  function Kb(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var a = n[l], o = a.getSnapshot;
          a = a.value;
          try {
            if (!It(o(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
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
  function Ll(e, t, n, l) {
    t &= ~Jc, t &= ~Sa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var o = 31 - Ht(a), s = 1 << o;
      l[o] = -1, a &= ~s;
    }
    n !== 0 && La(e, n, t);
  }
  function kr() {
    return (qe & 6) === 0 ? (co(0), !1) : !0;
  }
  function Ic() {
    if (Oe !== null) {
      if (Ze === 0)
        var e = Oe.return;
      else
        e = Oe, In = da = null, gc(e), ti = null, Zi = 0, e = Oe;
      for (; e !== null; )
        wh(e.alternate, e), e = e.return;
      Oe = null;
    }
  }
  function fi(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, hy(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), sl = 0, Ic(), Pe = e, Oe = n = Wn(e.current, null), Ue = t, Ze = 0, ln = null, Dl = !1, ui = Wl(e, t), Kc = !1, ci = an = Jc = Sa = jl = ot = 0, Pt = ro = null, $c = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var a = 31 - Ht(l), o = 1 << a;
        t |= e[a], l &= ~o;
      }
    return cl = t, nr(), n;
  }
  function Ih(e, t) {
    Ce = null, D.H = Ii, t === ei || t === sr ? (t = gd(), Ze = 3) : t === lc ? (t = gd(), Ze = 4) : Ze = t === Nc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ln = t, Oe === null && (ot = 1, Ar(
      e,
      hn(t, e.current)
    ));
  }
  function em() {
    var e = tn.current;
    return e === null ? !0 : (Ue & 4194048) === Ue ? vn === null : (Ue & 62914560) === Ue || (Ue & 536870912) !== 0 ? e === vn : !1;
  }
  function tm() {
    var e = D.H;
    return D.H = Ii, e === null ? Ii : e;
  }
  function nm() {
    var e = D.A;
    return D.A = Zb, e;
  }
  function Ur() {
    ot = 4, Dl || (Ue & 4194048) !== Ue && tn.current !== null || (ui = !0), (jl & 134217727) === 0 && (Sa & 134217727) === 0 || Pe === null || Ll(
      Pe,
      Ue,
      an,
      !1
    );
  }
  function es(e, t, n) {
    var l = qe;
    qe |= 2;
    var a = tm(), o = nm();
    (Pe !== e || Ue !== t) && (jr = null, fi(e, t)), t = !1;
    var s = ot;
    e: do
      try {
        if (Ze !== 0 && Oe !== null) {
          var m = Oe, _ = ln;
          switch (Ze) {
            case 8:
              Ic(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              tn.current === null && (t = !0);
              var O = Ze;
              if (Ze = 0, ln = null, di(e, m, _, O), n && ui) {
                s = 0;
                break e;
              }
              break;
            default:
              O = Ze, Ze = 0, ln = null, di(e, m, _, O);
          }
        }
        Jb(), s = ot;
        break;
      } catch (B) {
        Ih(e, B);
      }
    while (!0);
    return t && e.shellSuspendCounter++, In = da = null, qe = l, D.H = a, D.A = o, Oe === null && (Pe = null, Ue = 0, nr()), s;
  }
  function Jb() {
    for (; Oe !== null; ) lm(Oe);
  }
  function $b(e, t) {
    var n = qe;
    qe |= 2;
    var l = tm(), a = nm();
    Pe !== e || Ue !== t ? (jr = null, Dr = yt() + 500, fi(e, t)) : ui = Wl(
      e,
      t
    );
    e: do
      try {
        if (Ze !== 0 && Oe !== null) {
          t = Oe;
          var o = ln;
          t: switch (Ze) {
            case 1:
              Ze = 0, ln = null, di(e, t, o, 1);
              break;
            case 2:
            case 9:
              if (hd(o)) {
                Ze = 0, ln = null, am(t);
                break;
              }
              t = function() {
                Ze !== 2 && Ze !== 9 || Pe !== e || (Ze = 7), Ln(e);
              }, o.then(t, t);
              break e;
            case 3:
              Ze = 7;
              break e;
            case 4:
              Ze = 5;
              break e;
            case 7:
              hd(o) ? (Ze = 0, ln = null, am(t)) : (Ze = 0, ln = null, di(e, t, o, 7));
              break;
            case 5:
              var s = null;
              switch (Oe.tag) {
                case 26:
                  s = Oe.memoizedState;
                case 5:
                case 27:
                  var m = Oe;
                  if (s ? qm(s) : m.stateNode.complete) {
                    Ze = 0, ln = null;
                    var _ = m.sibling;
                    if (_ !== null) Oe = _;
                    else {
                      var O = m.return;
                      O !== null ? (Oe = O, Lr(O)) : Oe = null;
                    }
                    break t;
                  }
              }
              Ze = 0, ln = null, di(e, t, o, 5);
              break;
            case 6:
              Ze = 0, ln = null, di(e, t, o, 6);
              break;
            case 8:
              Ic(), ot = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        Pb();
        break;
      } catch (B) {
        Ih(e, B);
      }
    while (!0);
    return In = da = null, D.H = l, D.A = a, qe = n, Oe !== null ? 0 : (Pe = null, Ue = 0, nr(), ot);
  }
  function Pb() {
    for (; Oe !== null && !Vo(); )
      lm(Oe);
  }
  function lm(e) {
    var t = Mh(e.alternate, e, cl);
    e.memoizedProps = e.pendingProps, t === null ? Lr(e) : Oe = t;
  }
  function am(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Sh(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ue
        );
        break;
      case 11:
        t = Sh(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ue
        );
        break;
      case 5:
        gc(t);
      default:
        wh(n, t), t = Oe = nd(t, cl), t = Mh(n, t, cl);
    }
    e.memoizedProps = e.pendingProps, t === null ? Lr(e) : Oe = t;
  }
  function di(e, t, n, l) {
    In = da = null, gc(t), ti = null, Zi = 0;
    var a = t.return;
    try {
      if (Hb(
        e,
        a,
        t,
        n,
        Ue
      )) {
        ot = 1, Ar(
          e,
          hn(n, e.current)
        ), Oe = null;
        return;
      }
    } catch (o) {
      if (a !== null) throw Oe = a, o;
      ot = 1, Ar(
        e,
        hn(n, e.current)
      ), Oe = null;
      return;
    }
    t.flags & 32768 ? (Be || l === 1 ? e = !0 : ui || (Ue & 536870912) !== 0 ? e = !1 : (Dl = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = tn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), im(t, e)) : Lr(t);
  }
  function Lr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        im(
          t,
          Dl
        );
        return;
      }
      e = t.return;
      var n = Vb(
        t.alternate,
        t,
        cl
      );
      if (n !== null) {
        Oe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Oe = t;
        return;
      }
      Oe = t = e;
    } while (t !== null);
    ot === 0 && (ot = 5);
  }
  function im(e, t) {
    do {
      var n = Yb(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Oe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Oe = e;
        return;
      }
      Oe = e = n;
    } while (e !== null);
    ot = 6, Oe = null;
  }
  function om(e, t, n, l, a, o, s, m, _) {
    e.cancelPendingCommit = null;
    do
      Hr();
    while (At !== 0);
    if ((qe & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (o = t.lanes | t.childLanes, o |= Yu, Mi(
        e,
        n,
        o,
        s,
        m,
        _
      ), e === Pe && (Oe = Pe = null, Ue = 0), si = t, Ul = e, sl = n, Pc = o, Wc = a, $h = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, ey(Oa, function() {
        return fm(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = D.T, D.T = null, a = X.p, X.p = 2, s = qe, qe |= 4;
        try {
          qb(e, t, n);
        } finally {
          qe = s, X.p = a, D.T = l;
        }
      }
      At = 1, rm(), um(), cm();
    }
  }
  function rm() {
    if (At === 1) {
      At = 0;
      var e = Ul, t = si, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = D.T, D.T = null;
        var l = X.p;
        X.p = 2;
        var a = qe;
        qe |= 4;
        try {
          Vh(t, e);
          var o = ds, s = Kf(e.containerInfo), m = o.focusedElem, _ = o.selectionRange;
          if (s !== m && m && m.ownerDocument && Qf(
            m.ownerDocument.documentElement,
            m
          )) {
            if (_ !== null && Lu(m)) {
              var O = _.start, B = _.end;
              if (B === void 0 && (B = O), "selectionStart" in m)
                m.selectionStart = O, m.selectionEnd = Math.min(
                  B,
                  m.value.length
                );
              else {
                var K = m.ownerDocument || document, j = K && K.defaultView || window;
                if (j.getSelection) {
                  var U = j.getSelection(), se = m.textContent.length, ye = Math.min(_.start, se), $e = _.end === void 0 ? ye : Math.min(_.end, se);
                  !U.extend && ye > $e && (s = $e, $e = ye, ye = s);
                  var w = Zf(
                    m,
                    ye
                  ), T = Zf(
                    m,
                    $e
                  );
                  if (w && T && (U.rangeCount !== 1 || U.anchorNode !== w.node || U.anchorOffset !== w.offset || U.focusNode !== T.node || U.focusOffset !== T.offset)) {
                    var N = K.createRange();
                    N.setStart(w.node, w.offset), U.removeAllRanges(), ye > $e ? (U.addRange(N), U.extend(T.node, T.offset)) : (N.setEnd(T.node, T.offset), U.addRange(N));
                  }
                }
              }
            }
            for (K = [], U = m; U = U.parentNode; )
              U.nodeType === 1 && K.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < K.length; m++) {
              var Z = K[m];
              Z.element.scrollLeft = Z.left, Z.element.scrollTop = Z.top;
            }
          }
          Pr = !!fs, ds = fs = null;
        } finally {
          qe = a, X.p = l, D.T = n;
        }
      }
      e.current = t, At = 2;
    }
  }
  function um() {
    if (At === 2) {
      At = 0;
      var e = Ul, t = si, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = D.T, D.T = null;
        var l = X.p;
        X.p = 2;
        var a = qe;
        qe |= 4;
        try {
          Uh(e, t.alternate, t);
        } finally {
          qe = a, X.p = l, D.T = n;
        }
      }
      At = 3;
    }
  }
  function cm() {
    if (At === 4 || At === 3) {
      At = 0, Na();
      var e = Ul, t = si, n = sl, l = $h;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? At = 5 : (At = 0, si = Ul = null, sm(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (a === 0 && (kl = null), ea(n), t = t.stateNode, dt && typeof dt.onCommitFiberRoot == "function")
        try {
          dt.onCommitFiberRoot(
            xl,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = D.T, a = X.p, X.p = 2, D.T = null;
        try {
          for (var o = e.onRecoverableError, s = 0; s < l.length; s++) {
            var m = l[s];
            o(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          D.T = t, X.p = a;
        }
      }
      (sl & 3) !== 0 && Hr(), Ln(e), a = e.pendingLanes, (n & 261930) !== 0 && (a & 42) !== 0 ? e === Fc ? uo++ : (uo = 0, Fc = e) : uo = 0, co(0);
    }
  }
  function sm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, qi(t)));
  }
  function Hr() {
    return rm(), um(), cm(), fm();
  }
  function fm() {
    if (At !== 5) return !1;
    var e = Ul, t = Pc;
    Pc = 0;
    var n = ea(sl), l = D.T, a = X.p;
    try {
      X.p = 32 > n ? 32 : n, D.T = null, n = Wc, Wc = null;
      var o = Ul, s = sl;
      if (At = 0, si = Ul = null, sl = 0, (qe & 6) !== 0) throw Error(u(331));
      var m = qe;
      if (qe |= 4, Qh(o.current), qh(
        o,
        o.current,
        s,
        n
      ), qe = m, co(0, !1), dt && typeof dt.onPostCommitFiberRoot == "function")
        try {
          dt.onPostCommitFiberRoot(xl, o);
        } catch {
        }
      return !0;
    } finally {
      X.p = a, D.T = l, sm(e, t);
    }
  }
  function dm(e, t, n) {
    t = hn(n, t), t = Rc(e.stateNode, t, 2), e = wl(e, t, 2), e !== null && (Fl(e, 2), Ln(e));
  }
  function Qe(e, t, n) {
    if (e.tag === 3)
      dm(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          dm(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (kl === null || !kl.has(l))) {
            e = hn(n, e), n = hh(2), l = wl(t, n, 2), l !== null && (mh(
              n,
              l,
              t,
              e
            ), Fl(l, 2), Ln(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function ts(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Qb();
      var a = /* @__PURE__ */ new Set();
      l.set(t, a);
    } else
      a = l.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(t, a));
    a.has(n) || (Kc = !0, a.add(n), e = Wb.bind(null, e, t, n), t.then(e, e));
  }
  function Wb(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Pe === e && (Ue & n) === n && (ot === 4 || ot === 3 && (Ue & 62914560) === Ue && 300 > yt() - Or ? (qe & 2) === 0 && fi(e, 0) : Jc |= n, ci === Ue && (ci = 0)), Ln(e);
  }
  function hm(e, t) {
    t === 0 && (t = qo()), e = ca(e, t), e !== null && (Fl(e, t), Ln(e));
  }
  function Fb(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), hm(e, n);
  }
  function Ib(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    l !== null && l.delete(t), hm(e, n);
  }
  function ey(e, t) {
    return $l(e, t);
  }
  var Br = null, hi = null, ns = !1, Gr = !1, ls = !1, Hl = 0;
  function Ln(e) {
    e !== hi && e.next === null && (hi === null ? Br = hi = e : hi = hi.next = e), Gr = !0, ns || (ns = !0, ny());
  }
  function co(e, t) {
    if (!ls && Gr) {
      ls = !0;
      do
        for (var n = !1, l = Br; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var o = 0;
            else {
              var s = l.suspendedLanes, m = l.pingedLanes;
              o = (1 << 31 - Ht(42 | e) + 1) - 1, o &= a & ~(s & ~m), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (n = !0, vm(l, o));
          } else
            o = Ue, o = Ua(
              l,
              l === Pe ? o : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (o & 3) === 0 || Wl(l, o) || (n = !0, vm(l, o));
          l = l.next;
        }
      while (n);
      ls = !1;
    }
  }
  function ty() {
    mm();
  }
  function mm() {
    Gr = ns = !1;
    var e = 0;
    Hl !== 0 && dy() && (e = Hl);
    for (var t = yt(), n = null, l = Br; l !== null; ) {
      var a = l.next, o = gm(l, t);
      o === 0 ? (l.next = null, n === null ? Br = a : n.next = a, a === null && (hi = n)) : (n = l, (e !== 0 || (o & 3) !== 0) && (Gr = !0)), l = a;
    }
    At !== 0 && At !== 5 || co(e), Hl !== 0 && (Hl = 0);
  }
  function gm(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes & -62914561; 0 < o; ) {
      var s = 31 - Ht(o), m = 1 << s, _ = a[s];
      _ === -1 ? ((m & n) === 0 || (m & l) !== 0) && (a[s] = Mu(m, t)) : _ <= t && (e.expiredLanes |= m), o &= ~m;
    }
    if (t = Pe, n = Ue, n = Ua(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (Ze === 2 || Ze === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Ra(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Wl(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && Ra(l), ea(n)) {
        case 2:
        case 8:
          n = Ot;
          break;
        case 32:
          n = Oa;
          break;
        case 268435456:
          n = Rn;
          break;
        default:
          n = Oa;
      }
      return l = pm.bind(null, e), n = $l(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && Ra(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function pm(e, t) {
    if (At !== 0 && At !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Hr() && e.callbackNode !== n)
      return null;
    var l = Ue;
    return l = Ua(
      e,
      e === Pe ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Wh(e, l, t), gm(e, yt()), e.callbackNode != null && e.callbackNode === n ? pm.bind(null, e) : null);
  }
  function vm(e, t) {
    if (Hr()) return null;
    Wh(e, t, !0);
  }
  function ny() {
    my(function() {
      (qe & 6) !== 0 ? $l(
        Pl,
        ty
      ) : mm();
    });
  }
  function as() {
    if (Hl === 0) {
      var e = Fa;
      e === 0 && (e = Da, Da <<= 1, (Da & 261888) === 0 && (Da = 256)), Hl = e;
    }
    return Hl;
  }
  function bm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : I("" + e);
  }
  function ym(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function ly(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var o = bm(
        (a[St] || null).action
      ), s = l.submitter;
      s && (t = (t = s[St] || null) ? bm(t.formAction) : s.getAttribute("formAction"), t !== null && (o = t, s = null));
      var m = new Fo(
        "action",
        "action",
        null,
        l,
        a
      );
      e.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Hl !== 0) {
                  var _ = s ? ym(a, s) : new FormData(a);
                  Ac(
                    n,
                    {
                      pending: !0,
                      data: _,
                      method: a.method,
                      action: o
                    },
                    null,
                    _
                  );
                }
              } else
                typeof o == "function" && (m.preventDefault(), _ = s ? ym(a, s) : new FormData(a), Ac(
                  n,
                  {
                    pending: !0,
                    data: _,
                    method: a.method,
                    action: o
                  },
                  o,
                  _
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var is = 0; is < Vu.length; is++) {
    var os = Vu[is], ay = os.toLowerCase(), iy = os[0].toUpperCase() + os.slice(1);
    Tn(
      ay,
      "on" + iy
    );
  }
  Tn(Pf, "onAnimationEnd"), Tn(Wf, "onAnimationIteration"), Tn(Ff, "onAnimationStart"), Tn("dblclick", "onDoubleClick"), Tn("focusin", "onFocus"), Tn("focusout", "onBlur"), Tn(Sb, "onTransitionRun"), Tn(_b, "onTransitionStart"), Tn(Eb, "onTransitionCancel"), Tn(If, "onTransitionEnd"), Zn("onMouseEnter", ["mouseout", "mouseover"]), Zn("onMouseLeave", ["mouseout", "mouseover"]), Zn("onPointerEnter", ["pointerout", "pointerover"]), Zn("onPointerLeave", ["pointerout", "pointerover"]), Xn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Xn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Xn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Xn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Xn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Xn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var so = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), oy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(so)
  );
  function xm(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], a = l.event;
      l = l.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var s = l.length - 1; 0 <= s; s--) {
            var m = l[s], _ = m.instance, O = m.currentTarget;
            if (m = m.listener, _ !== o && a.isPropagationStopped())
              break e;
            o = m, a.currentTarget = O;
            try {
              o(a);
            } catch (B) {
              tr(B);
            }
            a.currentTarget = null, o = _;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (m = l[s], _ = m.instance, O = m.currentTarget, m = m.listener, _ !== o && a.isPropagationStopped())
              break e;
            o = m, a.currentTarget = O;
            try {
              o(a);
            } catch (B) {
              tr(B);
            }
            a.currentTarget = null, o = _;
          }
      }
    }
  }
  function De(e, t) {
    var n = t[Ha];
    n === void 0 && (n = t[Ha] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (Sm(t, e, 2, !1), n.add(l));
  }
  function rs(e, t, n) {
    var l = 0;
    t && (l |= 4), Sm(
      n,
      e,
      l,
      t
    );
  }
  var Vr = "_reactListening" + Math.random().toString(36).slice(2);
  function us(e) {
    if (!e[Vr]) {
      e[Vr] = !0, Ko.forEach(function(n) {
        n !== "selectionchange" && (oy.has(n) || rs(n, !1, e), rs(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Vr] || (t[Vr] = !0, rs("selectionchange", !1, t));
    }
  }
  function Sm(e, t, n, l) {
    switch (Pm(t)) {
      case 2:
        var a = jy;
        break;
      case 8:
        a = ky;
        break;
      default:
        a = Es;
    }
    n = a.bind(
      null,
      t,
      n,
      e
    ), a = void 0, !aa || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function cs(e, t, n, l, a) {
    var o = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var s = l.tag;
        if (s === 3 || s === 4) {
          var m = l.stateNode.containerInfo;
          if (m === a) break;
          if (s === 4)
            for (s = l.return; s !== null; ) {
              var _ = s.tag;
              if ((_ === 3 || _ === 4) && s.stateNode.containerInfo === a)
                return;
              s = s.return;
            }
          for (; m !== null; ) {
            if (s = On(m), s === null) return;
            if (_ = s.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              l = o = s;
              continue e;
            }
            m = m.parentNode;
          }
        }
        l = l.return;
      }
    $n(function() {
      var O = o, B = ze(n), K = [];
      e: {
        var j = ed.get(e);
        if (j !== void 0) {
          var U = Fo, se = e;
          switch (e) {
            case "keypress":
              if (Pn(n) === 0) break e;
            case "keydown":
            case "keyup":
              U = Iv;
              break;
            case "focusin":
              se = "focus", U = Ou;
              break;
            case "focusout":
              se = "blur", U = Ou;
              break;
            case "beforeblur":
            case "afterblur":
              U = Ou;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = wf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Vv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = nb;
              break;
            case Pf:
            case Wf:
            case Ff:
              U = Xv;
              break;
            case If:
              U = ab;
              break;
            case "scroll":
            case "scrollend":
              U = Bv;
              break;
            case "wheel":
              U = ob;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = Qv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = Nf;
              break;
            case "toggle":
            case "beforetoggle":
              U = ub;
          }
          var ye = (t & 4) !== 0, $e = !ye && (e === "scroll" || e === "scrollend"), w = ye ? j !== null ? j + "Capture" : null : j;
          ye = [];
          for (var T = O, N; T !== null; ) {
            var Z = T;
            if (N = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || N === null || w === null || (Z = Dn(T, w), Z != null && ye.push(
              fo(T, Z, N)
            )), $e) break;
            T = T.return;
          }
          0 < ye.length && (j = new U(
            j,
            se,
            null,
            n,
            B
          ), K.push({ event: j, listeners: ye }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", j && n !== xe && (se = n.relatedTarget || n.fromElement) && (On(se) || se[Yn]))
            break e;
          if ((U || j) && (j = B.window === B ? B : (j = B.ownerDocument) ? j.defaultView || j.parentWindow : window, U ? (se = n.relatedTarget || n.toElement, U = O, se = se ? On(se) : null, se !== null && ($e = f(se), ye = se.tag, se !== $e || ye !== 5 && ye !== 27 && ye !== 6) && (se = null)) : (U = null, se = O), U !== se)) {
            if (ye = wf, Z = "onMouseLeave", w = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (ye = Nf, Z = "onPointerLeave", w = "onPointerEnter", T = "pointer"), $e = U == null ? j : ta(U), N = se == null ? j : ta(se), j = new ye(
              Z,
              T + "leave",
              U,
              n,
              B
            ), j.target = $e, j.relatedTarget = N, Z = null, On(B) === O && (ye = new ye(
              w,
              T + "enter",
              se,
              n,
              B
            ), ye.target = N, ye.relatedTarget = $e, Z = ye), $e = Z, U && se)
              t: {
                for (ye = ry, w = U, T = se, N = 0, Z = w; Z; Z = ye(Z))
                  N++;
                Z = 0;
                for (var ve = T; ve; ve = ye(ve))
                  Z++;
                for (; 0 < N - Z; )
                  w = ye(w), N--;
                for (; 0 < Z - N; )
                  T = ye(T), Z--;
                for (; N--; ) {
                  if (w === T || T !== null && w === T.alternate) {
                    ye = w;
                    break t;
                  }
                  w = ye(w), T = ye(T);
                }
                ye = null;
              }
            else ye = null;
            U !== null && _m(
              K,
              j,
              U,
              ye,
              !1
            ), se !== null && $e !== null && _m(
              K,
              $e,
              se,
              ye,
              !0
            );
          }
        }
        e: {
          if (j = O ? ta(O) : window, U = j.nodeName && j.nodeName.toLowerCase(), U === "select" || U === "input" && j.type === "file")
            var Ge = Bf;
          else if (Lf(j))
            if (Gf)
              Ge = bb;
            else {
              Ge = pb;
              var ge = gb;
            }
          else
            U = j.nodeName, !U || U.toLowerCase() !== "input" || j.type !== "checkbox" && j.type !== "radio" ? O && G(O.elementType) && (Ge = Bf) : Ge = vb;
          if (Ge && (Ge = Ge(e, O))) {
            Hf(
              K,
              Ge,
              n,
              B
            );
            break e;
          }
          ge && ge(e, j, O), e === "focusout" && O && j.type === "number" && O.memoizedProps.value != null && la(j, "number", j.value);
        }
        switch (ge = O ? ta(O) : window, e) {
          case "focusin":
            (Lf(ge) || ge.contentEditable === "true") && (Xa = ge, Hu = O, Gi = null);
            break;
          case "focusout":
            Gi = Hu = Xa = null;
            break;
          case "mousedown":
            Bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bu = !1, Jf(K, n, B);
            break;
          case "selectionchange":
            if (xb) break;
          case "keydown":
          case "keyup":
            Jf(K, n, B);
        }
        var Me;
        if (ju)
          e: {
            switch (e) {
              case "compositionstart":
                var Le = "onCompositionStart";
                break e;
              case "compositionend":
                Le = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Le = "onCompositionUpdate";
                break e;
            }
            Le = void 0;
          }
        else
          qa ? kf(e, n) && (Le = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Le = "onCompositionStart");
        Le && (Of && n.locale !== "ko" && (qa || Le !== "onCompositionStart" ? Le === "onCompositionEnd" && qa && (Me = fn()) : (zt = B, sn = "value" in zt ? zt.value : zt.textContent, qa = !0)), ge = Yr(O, Le), 0 < ge.length && (Le = new Rf(
          Le,
          e,
          null,
          n,
          B
        ), K.push({ event: Le, listeners: ge }), Me ? Le.data = Me : (Me = Uf(n), Me !== null && (Le.data = Me)))), (Me = sb ? fb(e, n) : db(e, n)) && (Le = Yr(O, "onBeforeInput"), 0 < Le.length && (ge = new Rf(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          B
        ), K.push({
          event: ge,
          listeners: Le
        }), ge.data = Me)), ly(
          K,
          e,
          O,
          n,
          B
        );
      }
      xm(K, t);
    });
  }
  function fo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Yr(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e, o = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || o === null || (a = Dn(e, n), a != null && l.unshift(
        fo(e, a, o)
      ), a = Dn(e, t), a != null && l.push(
        fo(e, a, o)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function ry(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function _m(e, t, n, l, a) {
    for (var o = t._reactName, s = []; n !== null && n !== l; ) {
      var m = n, _ = m.alternate, O = m.stateNode;
      if (m = m.tag, _ !== null && _ === l) break;
      m !== 5 && m !== 26 && m !== 27 || O === null || (_ = O, a ? (O = Dn(n, o), O != null && s.unshift(
        fo(n, O, _)
      )) : a || (O = Dn(n, o), O != null && s.push(
        fo(n, O, _)
      ))), n = n.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var uy = /\r\n?/g, cy = /\u0000|\uFFFD/g;
  function Em(e) {
    return (typeof e == "string" ? e : "" + e).replace(uy, `
`).replace(cy, "");
  }
  function Am(e, t) {
    return t = Em(t), Em(e) === t;
  }
  function Je(e, t, n, l, a, o) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || x(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && x(e, "" + l);
        break;
      case "className":
        Ya(e, "class", l);
        break;
      case "tabIndex":
        Ya(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ya(e, n, l);
        break;
      case "style":
        H(e, l, o);
        break;
      case "data":
        if (t !== "object") {
          Ya(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = I("" + l), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" && (n === "formAction" ? (t !== "input" && Je(e, t, "name", a.name, a, null), Je(
            e,
            t,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Je(
            e,
            t,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Je(
            e,
            t,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Je(e, t, "encType", a.encType, a, null), Je(e, t, "method", a.method, a, null), Je(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = I("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = de);
        break;
      case "onScroll":
        l != null && De("scroll", e);
        break;
      case "onScrollEnd":
        l != null && De("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(u(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
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
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = I("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "" + l) : e.removeAttribute(n);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
        break;
      case "popover":
        De("beforetoggle", e), De("toggle", e), Va(e, "popover", l);
        break;
      case "xlinkActuate":
        Cn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Cn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Cn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Cn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Cn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Cn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Cn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Cn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Cn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Va(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = te.get(n) || n, Va(e, n, l));
    }
  }
  function ss(e, t, n, l, a, o) {
    switch (n) {
      case "style":
        H(e, l, o);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(u(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? x(e, l) : (typeof l == "number" || typeof l == "bigint") && x(e, "" + l);
        break;
      case "onScroll":
        l != null && De("scroll", e);
        break;
      case "onScrollEnd":
        l != null && De("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = de);
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
        if (!Jo.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[St] || null, o = o != null ? o[n] : null, typeof o == "function" && e.removeEventListener(t, o, a), typeof l == "function")) {
              typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, a);
              break e;
            }
            n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : Va(e, n, l);
          }
    }
  }
  function Lt(e, t, n) {
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
        De("error", e), De("load", e);
        var l = !1, a = !1, o;
        for (o in n)
          if (n.hasOwnProperty(o)) {
            var s = n[o];
            if (s != null)
              switch (o) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Je(e, t, o, s, n, null);
              }
          }
        a && Je(e, t, "srcSet", n.srcSet, n, null), l && Je(e, t, "src", n.src, n, null);
        return;
      case "input":
        De("invalid", e);
        var m = o = s = a = null, _ = null, O = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var B = n[l];
            if (B != null)
              switch (l) {
                case "name":
                  a = B;
                  break;
                case "type":
                  s = B;
                  break;
                case "checked":
                  _ = B;
                  break;
                case "defaultChecked":
                  O = B;
                  break;
                case "value":
                  o = B;
                  break;
                case "defaultValue":
                  m = B;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Je(e, t, l, B, n, null);
              }
          }
        _l(
          e,
          o,
          m,
          _,
          O,
          s,
          a,
          !1
        );
        return;
      case "select":
        De("invalid", e), l = s = o = null;
        for (a in n)
          if (n.hasOwnProperty(a) && (m = n[a], m != null))
            switch (a) {
              case "value":
                o = m;
                break;
              case "defaultValue":
                s = m;
                break;
              case "multiple":
                l = m;
              default:
                Je(e, t, a, m, n, null);
            }
        t = o, n = s, e.multiple = !!l, t != null ? Kn(e, !!l, t, !1) : n != null && Kn(e, !!l, n, !0);
        return;
      case "textarea":
        De("invalid", e), o = a = l = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (m = n[s], m != null))
            switch (s) {
              case "value":
                l = m;
                break;
              case "defaultValue":
                a = m;
                break;
              case "children":
                o = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(u(91));
                break;
              default:
                Je(e, t, s, m, n, null);
            }
        v(e, l, a, o);
        return;
      case "option":
        for (_ in n)
          n.hasOwnProperty(_) && (l = n[_], l != null) && (_ === "selected" ? e.selected = l && typeof l != "function" && typeof l != "symbol" : Je(e, t, _, l, n, null));
        return;
      case "dialog":
        De("beforetoggle", e), De("toggle", e), De("cancel", e), De("close", e);
        break;
      case "iframe":
      case "object":
        De("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < so.length; l++)
          De(so[l], e);
        break;
      case "image":
        De("error", e), De("load", e);
        break;
      case "details":
        De("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        De("error", e), De("load", e);
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
        for (O in n)
          if (n.hasOwnProperty(O) && (l = n[O], l != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Je(e, t, O, l, n, null);
            }
        return;
      default:
        if (G(t)) {
          for (B in n)
            n.hasOwnProperty(B) && (l = n[B], l !== void 0 && ss(
              e,
              t,
              B,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (l = n[m], l != null && Je(e, t, m, l, n, null));
  }
  function sy(e, t, n, l) {
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
        var a = null, o = null, s = null, m = null, _ = null, O = null, B = null;
        for (U in n) {
          var K = n[U];
          if (n.hasOwnProperty(U) && K != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = K;
              default:
                l.hasOwnProperty(U) || Je(e, t, U, null, l, K);
            }
        }
        for (var j in l) {
          var U = l[j];
          if (K = n[j], l.hasOwnProperty(j) && (U != null || K != null))
            switch (j) {
              case "type":
                o = U;
                break;
              case "name":
                a = U;
                break;
              case "checked":
                O = U;
                break;
              case "defaultChecked":
                B = U;
                break;
              case "value":
                s = U;
                break;
              case "defaultValue":
                m = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(u(137, t));
                break;
              default:
                U !== K && Je(
                  e,
                  t,
                  j,
                  U,
                  l,
                  K
                );
            }
        }
        na(
          e,
          s,
          m,
          _,
          O,
          B,
          o,
          a
        );
        return;
      case "select":
        U = s = m = j = null;
        for (o in n)
          if (_ = n[o], n.hasOwnProperty(o) && _ != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                U = _;
              default:
                l.hasOwnProperty(o) || Je(
                  e,
                  t,
                  o,
                  null,
                  l,
                  _
                );
            }
        for (a in l)
          if (o = l[a], _ = n[a], l.hasOwnProperty(a) && (o != null || _ != null))
            switch (a) {
              case "value":
                j = o;
                break;
              case "defaultValue":
                m = o;
                break;
              case "multiple":
                s = o;
              default:
                o !== _ && Je(
                  e,
                  t,
                  a,
                  o,
                  l,
                  _
                );
            }
        t = m, n = s, l = U, j != null ? Kn(e, !!n, j, !1) : !!l != !!n && (t != null ? Kn(e, !!n, t, !0) : Kn(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        U = j = null;
        for (m in n)
          if (a = n[m], n.hasOwnProperty(m) && a != null && !l.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Je(e, t, m, null, l, a);
            }
        for (s in l)
          if (a = l[s], o = n[s], l.hasOwnProperty(s) && (a != null || o != null))
            switch (s) {
              case "value":
                j = a;
                break;
              case "defaultValue":
                U = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(u(91));
                break;
              default:
                a !== o && Je(e, t, s, a, l, o);
            }
        Wo(e, j, U);
        return;
      case "option":
        for (var se in n)
          j = n[se], n.hasOwnProperty(se) && j != null && !l.hasOwnProperty(se) && (se === "selected" ? e.selected = !1 : Je(
            e,
            t,
            se,
            null,
            l,
            j
          ));
        for (_ in l)
          j = l[_], U = n[_], l.hasOwnProperty(_) && j !== U && (j != null || U != null) && (_ === "selected" ? e.selected = j && typeof j != "function" && typeof j != "symbol" : Je(
            e,
            t,
            _,
            j,
            l,
            U
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
        for (var ye in n)
          j = n[ye], n.hasOwnProperty(ye) && j != null && !l.hasOwnProperty(ye) && Je(e, t, ye, null, l, j);
        for (O in l)
          if (j = l[O], U = n[O], l.hasOwnProperty(O) && j !== U && (j != null || U != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(u(137, t));
                break;
              default:
                Je(
                  e,
                  t,
                  O,
                  j,
                  l,
                  U
                );
            }
        return;
      default:
        if (G(t)) {
          for (var $e in n)
            j = n[$e], n.hasOwnProperty($e) && j !== void 0 && !l.hasOwnProperty($e) && ss(
              e,
              t,
              $e,
              void 0,
              l,
              j
            );
          for (B in l)
            j = l[B], U = n[B], !l.hasOwnProperty(B) || j === U || j === void 0 && U === void 0 || ss(
              e,
              t,
              B,
              j,
              l,
              U
            );
          return;
        }
    }
    for (var w in n)
      j = n[w], n.hasOwnProperty(w) && j != null && !l.hasOwnProperty(w) && Je(e, t, w, null, l, j);
    for (K in l)
      j = l[K], U = n[K], !l.hasOwnProperty(K) || j === U || j == null && U == null || Je(e, t, K, j, l, U);
  }
  function Cm(e) {
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
  function fy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l], o = a.transferSize, s = a.initiatorType, m = a.duration;
        if (o && m && Cm(s)) {
          for (s = 0, m = a.responseEnd, l += 1; l < n.length; l++) {
            var _ = n[l], O = _.startTime;
            if (O > m) break;
            var B = _.transferSize, K = _.initiatorType;
            B && Cm(K) && (_ = _.responseEnd, s += B * (_ < m ? 1 : (m - O) / (_ - O)));
          }
          if (--l, t += 8 * (o + s) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var fs = null, ds = null;
  function qr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Tm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Mm(e, t) {
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
  function hs(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ms = null;
  function dy() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ms ? !1 : (ms = e, !0) : (ms = null, !1);
  }
  var zm = typeof setTimeout == "function" ? setTimeout : void 0, hy = typeof clearTimeout == "function" ? clearTimeout : void 0, wm = typeof Promise == "function" ? Promise : void 0, my = typeof queueMicrotask == "function" ? queueMicrotask : typeof wm < "u" ? function(e) {
    return wm.resolve(null).then(e).catch(gy);
  } : zm;
  function gy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Bl(e) {
    return e === "head";
  }
  function Rm(e, t) {
    var n = t, l = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8)
        if (n = a.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(a), vi(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          ho(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, ho(n);
          for (var o = n.firstChild; o; ) {
            var s = o.nextSibling, m = o.nodeName;
            o[Nn] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && o.rel.toLowerCase() === "stylesheet" || n.removeChild(o), o = s;
          }
        } else
          n === "body" && ho(e.ownerDocument.body);
      n = a;
    } while (n);
    vi(t);
  }
  function Nm(e, t) {
    var n = e;
    e = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = l;
    } while (n);
  }
  function gs(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          gs(n), Ga(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function py(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Nn])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (o = e.getAttribute("rel"), o === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (o !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (o = e.getAttribute("src"), (o !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && o && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var o = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === o)
          return e;
      } else return e;
      if (e = bn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function vy(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = bn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Om(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = bn(e.nextSibling), e === null)) return null;
    return e;
  }
  function ps(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function vs(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function by(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function bn(e) {
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
  var bs = null;
  function Dm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return bn(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function jm(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function km(e, t, n) {
    switch (t = qr(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function ho(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ga(e);
  }
  var yn = /* @__PURE__ */ new Map(), Um = /* @__PURE__ */ new Set();
  function Xr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fl = X.d;
  X.d = {
    f: yy,
    r: xy,
    D: Sy,
    C: _y,
    L: Ey,
    m: Ay,
    X: Ty,
    S: Cy,
    M: My
  };
  function yy() {
    var e = fl.f(), t = kr();
    return e || t;
  }
  function xy(e) {
    var t = Sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Id(t) : fl.r(e);
  }
  var mi = typeof document > "u" ? null : document;
  function Lm(e, t, n) {
    var l = mi;
    if (l && typeof t == "string" && t) {
      var a = nt(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), Um.has(a) || (Um.add(a), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(a) === null && (t = l.createElement("link"), Lt(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function Sy(e) {
    fl.D(e), Lm("dns-prefetch", e, null);
  }
  function _y(e, t) {
    fl.C(e, t), Lm("preconnect", e, t);
  }
  function Ey(e, t, n) {
    fl.L(e, t, n);
    var l = mi;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + nt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + nt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + nt(
        n.imageSizes
      ) + '"]')) : a += '[href="' + nt(e) + '"]';
      var o = a;
      switch (t) {
        case "style":
          o = gi(e);
          break;
        case "script":
          o = pi(e);
      }
      yn.has(o) || (e = E(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), yn.set(o, e), l.querySelector(a) !== null || t === "style" && l.querySelector(mo(o)) || t === "script" && l.querySelector(go(o)) || (t = l.createElement("link"), Lt(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function Ay(e, t) {
    fl.m(e, t);
    var n = mi;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + nt(l) + '"][href="' + nt(e) + '"]', o = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = pi(e);
      }
      if (!yn.has(o) && (e = E({ rel: "modulepreload", href: e }, t), yn.set(o, e), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(go(o)))
              return;
        }
        l = n.createElement("link"), Lt(l, "link", e), ht(l), n.head.appendChild(l);
      }
    }
  }
  function Cy(e, t, n) {
    fl.S(e, t, n);
    var l = mi;
    if (l && e) {
      var a = qn(l).hoistableStyles, o = gi(e);
      t = t || "default";
      var s = a.get(o);
      if (!s) {
        var m = { loading: 0, preload: null };
        if (s = l.querySelector(
          mo(o)
        ))
          m.loading = 5;
        else {
          e = E(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = yn.get(o)) && ys(e, n);
          var _ = s = l.createElement("link");
          ht(_), Lt(_, "link", e), _._p = new Promise(function(O, B) {
            _.onload = O, _.onerror = B;
          }), _.addEventListener("load", function() {
            m.loading |= 1;
          }), _.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Zr(s, t, l);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: m
        }, a.set(o, s);
      }
    }
  }
  function Ty(e, t) {
    fl.X(e, t);
    var n = mi;
    if (n && e) {
      var l = qn(n).hoistableScripts, a = pi(e), o = l.get(a);
      o || (o = n.querySelector(go(a)), o || (e = E({ src: e, async: !0 }, t), (t = yn.get(a)) && xs(e, t), o = n.createElement("script"), ht(o), Lt(o, "link", e), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, l.set(a, o));
    }
  }
  function My(e, t) {
    fl.M(e, t);
    var n = mi;
    if (n && e) {
      var l = qn(n).hoistableScripts, a = pi(e), o = l.get(a);
      o || (o = n.querySelector(go(a)), o || (e = E({ src: e, async: !0, type: "module" }, t), (t = yn.get(a)) && xs(e, t), o = n.createElement("script"), ht(o), Lt(o, "link", e), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, l.set(a, o));
    }
  }
  function Hm(e, t, n, l) {
    var a = (a = he.current) ? Xr(a) : null;
    if (!a) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = gi(n.href), n = qn(
          a
        ).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = gi(n.href);
          var o = qn(
            a
          ).hoistableStyles, s = o.get(e);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(e, s), (o = a.querySelector(
            mo(e)
          )) && !o._p && (s.instance = o, s.state.loading = 5), yn.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, yn.set(e, n), o || zy(
            a,
            e,
            n,
            s.state
          ))), t && l === null)
            throw Error(u(528, ""));
          return s;
        }
        if (t && l !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = pi(n), n = qn(
          a
        ).hoistableScripts, l = n.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function gi(e) {
    return 'href="' + nt(e) + '"';
  }
  function mo(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Bm(e) {
    return E({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function zy(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Lt(t, "link", n), ht(t), e.head.appendChild(t));
  }
  function pi(e) {
    return '[src="' + nt(e) + '"]';
  }
  function go(e) {
    return "script[async]" + e;
  }
  function Gm(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + nt(n.href) + '"]'
          );
          if (l)
            return t.instance = l, ht(l), l;
          var a = E({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ht(l), Lt(l, "style", a), Zr(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          a = gi(n.href);
          var o = e.querySelector(
            mo(a)
          );
          if (o)
            return t.state.loading |= 4, t.instance = o, ht(o), o;
          l = Bm(n), (a = yn.get(a)) && ys(l, a), o = (e.ownerDocument || e).createElement("link"), ht(o);
          var s = o;
          return s._p = new Promise(function(m, _) {
            s.onload = m, s.onerror = _;
          }), Lt(o, "link", l), t.state.loading |= 4, Zr(o, n.precedence, e), t.instance = o;
        case "script":
          return o = pi(n.src), (a = e.querySelector(
            go(o)
          )) ? (t.instance = a, ht(a), a) : (l = n, (a = yn.get(o)) && (l = E({}, n), xs(l, a)), e = e.ownerDocument || e, a = e.createElement("script"), ht(a), Lt(a, "link", l), e.head.appendChild(a), t.instance = a);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Zr(l, n.precedence, e));
    return t.instance;
  }
  function Zr(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = l.length ? l[l.length - 1] : null, o = a, s = 0; s < l.length; s++) {
      var m = l[s];
      if (m.dataset.precedence === t) o = m;
      else if (o !== a) break;
    }
    o ? o.parentNode.insertBefore(e, o.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function ys(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function xs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Qr = null;
  function Vm(e, t, n) {
    if (Qr === null) {
      var l = /* @__PURE__ */ new Map(), a = Qr = /* @__PURE__ */ new Map();
      a.set(n, l);
    } else
      a = Qr, l = a.get(n), l || (l = /* @__PURE__ */ new Map(), a.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var o = n[a];
      if (!(o[Nn] || o[xt] || e === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = o.getAttribute(t) || "";
        s = e + s;
        var m = l.get(s);
        m ? m.push(o) : l.set(s, [o]);
      }
    }
    return l;
  }
  function Ym(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function wy(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
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
  function qm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Ry(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = gi(l.href), o = t.querySelector(
          mo(a)
        );
        if (o) {
          t = o._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Kr.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = o, ht(o);
          return;
        }
        o = t.ownerDocument || t, l = Bm(l), (a = yn.get(a)) && ys(l, a), o = o.createElement("link"), ht(o);
        var s = o;
        s._p = new Promise(function(m, _) {
          s.onload = m, s.onerror = _;
        }), Lt(o, "link", l), n.instance = o;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Kr.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Ss = 0;
  function Ny(e, t) {
    return e.stylesheets && e.count === 0 && $r(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && $r(e, e.stylesheets), e.unsuspend) {
          var o = e.unsuspend;
          e.unsuspend = null, o();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ss === 0 && (Ss = 62500 * fy());
      var a = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && $r(e, e.stylesheets), e.unsuspend)) {
            var o = e.unsuspend;
            e.unsuspend = null, o();
          }
        },
        (e.imgBytes > Ss ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function Kr() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) $r(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Jr = null;
  function $r(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Jr = /* @__PURE__ */ new Map(), t.forEach(Oy, e), Jr = null, Kr.call(e));
  }
  function Oy(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Jr.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Jr.set(e, n);
        for (var a = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < a.length; o++) {
          var s = a[o];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (n.set(s.dataset.precedence, s), l = s);
        }
        l && n.set(null, l);
      }
      a = t.instance, s = a.getAttribute("data-precedence"), o = n.get(s) || l, o === l && n.set(null, a), n.set(s, a), this.count++, l = Kr.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), o ? o.parentNode.insertBefore(a, o.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var po = {
    $$typeof: J,
    Provider: null,
    Consumer: null,
    _currentValue: ce,
    _currentValue2: ce,
    _threadCount: 0
  };
  function Dy(e, t, n, l, a, o, s, m, _) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ti(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ti(0), this.hiddenUpdates = Ti(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = o, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xm(e, t, n, l, a, o, s, m, _, O, B, K) {
    return e = new Dy(
      e,
      t,
      n,
      s,
      _,
      O,
      B,
      K,
      m
    ), t = 1, o === !0 && (t |= 24), o = en(3, null, null, t), e.current = o, o.stateNode = e, t = ec(), t.refCount++, e.pooledCache = t, t.refCount++, o.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, ac(o), e;
  }
  function Zm(e) {
    return e ? (e = Ka, e) : Ka;
  }
  function Qm(e, t, n, l, a, o) {
    a = Zm(a), l.context === null ? l.context = a : l.pendingContext = a, l = zl(t), l.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (l.callback = o), n = wl(e, l, t), n !== null && (Wt(n, e, t), Ki(n, e, t));
  }
  function Km(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function _s(e, t) {
    Km(e, t), (e = e.alternate) && Km(e, t);
  }
  function Jm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ca(e, 67108864);
      t !== null && Wt(t, e, 67108864), _s(e, 67108864);
    }
  }
  function $m(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = on();
      t = Il(t);
      var n = ca(e, t);
      n !== null && Wt(n, e, t), _s(e, t);
    }
  }
  var Pr = !0;
  function jy(e, t, n, l) {
    var a = D.T;
    D.T = null;
    var o = X.p;
    try {
      X.p = 2, Es(e, t, n, l);
    } finally {
      X.p = o, D.T = a;
    }
  }
  function ky(e, t, n, l) {
    var a = D.T;
    D.T = null;
    var o = X.p;
    try {
      X.p = 8, Es(e, t, n, l);
    } finally {
      X.p = o, D.T = a;
    }
  }
  function Es(e, t, n, l) {
    if (Pr) {
      var a = As(l);
      if (a === null)
        cs(
          e,
          t,
          l,
          Wr,
          n
        ), Wm(e, l);
      else if (Ly(
        a,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (Wm(e, l), t & 4 && -1 < Uy.indexOf(e)) {
        for (; a !== null; ) {
          var o = Sl(a);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                  var s = Vn(o.pendingLanes);
                  if (s !== 0) {
                    var m = o;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; s; ) {
                      var _ = 1 << 31 - Ht(s);
                      m.entanglements[1] |= _, s &= ~_;
                    }
                    Ln(o), (qe & 6) === 0 && (Dr = yt() + 500, co(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = ca(o, 2), m !== null && Wt(m, o, 2), kr(), _s(o, 2);
            }
          if (o = As(l), o === null && cs(
            e,
            t,
            l,
            Wr,
            n
          ), o === a) break;
          a = o;
        }
        a !== null && l.stopPropagation();
      } else
        cs(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function As(e) {
    return e = ze(e), Cs(e);
  }
  var Wr = null;
  function Cs(e) {
    if (Wr = null, e = On(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = b(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Wr = e, null;
  }
  function Pm(e) {
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
        switch (Yo()) {
          case Pl:
            return 2;
          case Ot:
            return 8;
          case Oa:
          case Su:
            return 32;
          case Rn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ts = !1, Gl = null, Vl = null, Yl = null, vo = /* @__PURE__ */ new Map(), bo = /* @__PURE__ */ new Map(), ql = [], Uy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Wm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Gl = null;
        break;
      case "dragenter":
      case "dragleave":
        Vl = null;
        break;
      case "mouseover":
      case "mouseout":
        Yl = null;
        break;
      case "pointerover":
      case "pointerout":
        vo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bo.delete(t.pointerId);
    }
  }
  function yo(e, t, n, l, a, o) {
    return e === null || e.nativeEvent !== o ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: o,
      targetContainers: [a]
    }, t !== null && (t = Sl(t), t !== null && Jm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Ly(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return Gl = yo(
          Gl,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "dragenter":
        return Vl = yo(
          Vl,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "mouseover":
        return Yl = yo(
          Yl,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "pointerover":
        var o = a.pointerId;
        return vo.set(
          o,
          yo(
            vo.get(o) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
      case "gotpointercapture":
        return o = a.pointerId, bo.set(
          o,
          yo(
            bo.get(o) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
    }
    return !1;
  }
  function Fm(e) {
    var t = On(e.target);
    if (t !== null) {
      var n = f(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = h(n), t !== null) {
            e.blockedOn = t, Xo(e.priority, function() {
              $m(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = b(n), t !== null) {
            e.blockedOn = t, Xo(e.priority, function() {
              $m(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Fr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = As(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        xe = l, n.target.dispatchEvent(l), xe = null;
      } else
        return t = Sl(n), t !== null && Jm(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Im(e, t, n) {
    Fr(e) && n.delete(t);
  }
  function Hy() {
    Ts = !1, Gl !== null && Fr(Gl) && (Gl = null), Vl !== null && Fr(Vl) && (Vl = null), Yl !== null && Fr(Yl) && (Yl = null), vo.forEach(Im), bo.forEach(Im);
  }
  function Ir(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ts || (Ts = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Hy
    )));
  }
  var eu = null;
  function eg(e) {
    eu !== e && (eu = e, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        eu === e && (eu = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], a = e[t + 2];
          if (typeof l != "function") {
            if (Cs(l || n) === null)
              continue;
            break;
          }
          var o = Sl(n);
          o !== null && (e.splice(t, 3), t -= 3, Ac(
            o,
            {
              pending: !0,
              data: a,
              method: n.method,
              action: l
            },
            l,
            a
          ));
        }
      }
    ));
  }
  function vi(e) {
    function t(_) {
      return Ir(_, e);
    }
    Gl !== null && Ir(Gl, e), Vl !== null && Ir(Vl, e), Yl !== null && Ir(Yl, e), vo.forEach(t), bo.forEach(t);
    for (var n = 0; n < ql.length; n++) {
      var l = ql[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ql.length && (n = ql[0], n.blockedOn === null); )
      Fm(n), n.blockedOn === null && ql.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var a = n[l], o = n[l + 1], s = a[St] || null;
        if (typeof o == "function")
          s || eg(n);
        else if (s) {
          var m = null;
          if (o && o.hasAttribute("formAction")) {
            if (a = o, s = o[St] || null)
              m = s.formAction;
            else if (Cs(a) !== null) continue;
          } else m = s.action;
          typeof m == "function" ? n[l + 1] = m : (n.splice(l, 3), l -= 3), eg(n);
        }
      }
  }
  function tg() {
    function e(o) {
      o.canIntercept && o.info === "react-transition" && o.intercept({
        handler: function() {
          return new Promise(function(s) {
            return a = s;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      a !== null && (a(), a = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var o = navigation.currentEntry;
        o && o.url != null && navigation.navigate(o.url, {
          state: o.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, a = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), a !== null && (a(), a = null);
      };
    }
  }
  function Ms(e) {
    this._internalRoot = e;
  }
  tu.prototype.render = Ms.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var n = t.current, l = on();
    Qm(n, l, e, t, null, null);
  }, tu.prototype.unmount = Ms.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Qm(e.current, 2, null, e, null, null), kr(), t[Yn] = null;
    }
  };
  function tu(e) {
    this._internalRoot = e;
  }
  tu.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ke();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < ql.length && t !== 0 && t < ql[n].priority; n++) ;
      ql.splice(n, 0, e), n === 0 && Fm(e);
    }
  };
  var ng = r.version;
  if (ng !== "19.2.8")
    throw Error(
      u(
        527,
        ng,
        "19.2.8"
      )
    );
  X.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = g(t), e = e !== null ? z(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var By = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var nu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!nu.isDisabled && nu.supportsFiber)
      try {
        xl = nu.inject(
          By
        ), dt = nu;
      } catch {
      }
  }
  return So.createRoot = function(e, t) {
    if (!d(e)) throw Error(u(299));
    var n = !1, l = "", a = ch, o = sh, s = fh;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Xm(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      a,
      o,
      s,
      tg
    ), e[Yn] = t.current, us(e), new Ms(t);
  }, So.hydrateRoot = function(e, t, n) {
    if (!d(e)) throw Error(u(299));
    var l = !1, a = "", o = ch, s = sh, m = fh, _ = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (s = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (_ = n.formState)), t = Xm(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      a,
      _,
      o,
      s,
      m,
      tg
    ), t.context = Zm(null), n = t.current, l = on(), l = Il(l), a = zl(l), a.callback = null, wl(n, a, l), n = l, t.current.lanes = n, Fl(t, n), Ln(t), e[Yn] = t.current, us(e), new tu(t);
  }, So.version = "19.2.8", So;
}
var gg;
function Py() {
  if (gg) return Rs.exports;
  gg = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (r) {
        console.error(r);
      }
  }
  return i(), Rs.exports = $y(), Rs.exports;
}
var Wy = Py(), S = cf();
const Fy = /* @__PURE__ */ Yy(S), _i = /* @__PURE__ */ Vy({
  __proto__: null,
  default: Fy
}, [S]);
function pg(i) {
  let r = i;
  for (; r; ) {
    if (r.classList.contains("dark") || r.classList.contains("dark-theme") || r.classList.contains("theme-dark"))
      return !0;
    if (r.classList.contains("light") || r.classList.contains("light-theme") || r.classList.contains("theme-light"))
      return !1;
    const c = r.getAttribute("data-theme") ?? r.getAttribute("data-mode");
    if (c === "dark") return !0;
    if (c === "light") return !1;
    r = r.parentElement;
  }
  for (const c of [document.documentElement, document.body]) {
    if (c.classList.contains("dark") || c.classList.contains("dark-theme") || c.getAttribute("data-theme") === "dark" || c.getAttribute("data-mode") === "dark")
      return !0;
    if (c.classList.contains("light") || c.classList.contains("light-theme") || c.getAttribute("data-theme") === "light" || c.getAttribute("data-mode") === "light")
      return !1;
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? !1;
}
function Iy(i) {
  const [r, c] = S.useState(() => pg(i));
  return S.useEffect(() => {
    if (!i) return;
    const u = () => c(pg(i));
    u();
    const d = new MutationObserver(u);
    d.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    }), document.body && d.observe(document.body, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    });
    const f = window.matchMedia?.("(prefers-color-scheme: dark)");
    return f?.addEventListener("change", u), () => {
      d.disconnect(), f?.removeEventListener("change", u);
    };
  }, [i]), r;
}
function Xg(i) {
  var r, c, u = "";
  if (typeof i == "string" || typeof i == "number") u += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var d = i.length;
    for (r = 0; r < d; r++) i[r] && (c = Xg(i[r])) && (u && (u += " "), u += c);
  } else for (c in i) i[c] && (u && (u += " "), u += c);
  return u;
}
function Zg() {
  for (var i, r, c = 0, u = "", d = arguments.length; c < d; c++) (i = arguments[c]) && (r = Xg(i)) && (u && (u += " "), u += r);
  return u;
}
const e0 = (i, r) => {
  const c = new Array(i.length + r.length);
  for (let u = 0; u < i.length; u++)
    c[u] = i[u];
  for (let u = 0; u < r.length; u++)
    c[i.length + u] = r[u];
  return c;
}, t0 = (i, r) => ({
  classGroupId: i,
  validator: r
}), Qg = (i = /* @__PURE__ */ new Map(), r = null, c) => ({
  nextPart: i,
  validators: r,
  classGroupId: c
}), fu = "-", vg = [], n0 = "arbitrary..", l0 = (i) => {
  const r = i0(i), {
    conflictingClassGroups: c,
    conflictingClassGroupModifiers: u
  } = i;
  return {
    getClassGroupId: (h) => {
      if (h.startsWith("[") && h.endsWith("]"))
        return a0(h);
      const b = h.split(fu), p = b[0] === "" && b.length > 1 ? 1 : 0;
      return Kg(b, p, r);
    },
    getConflictingClassGroupIds: (h, b) => {
      if (b) {
        const p = u[h], g = c[h];
        return p ? g ? e0(g, p) : p : g || vg;
      }
      return c[h] || vg;
    }
  };
}, Kg = (i, r, c) => {
  if (i.length - r === 0)
    return c.classGroupId;
  const d = i[r], f = c.nextPart.get(d);
  if (f) {
    const g = Kg(i, r + 1, f);
    if (g) return g;
  }
  const h = c.validators;
  if (h === null)
    return;
  const b = r === 0 ? i.join(fu) : i.slice(r).join(fu), p = h.length;
  for (let g = 0; g < p; g++) {
    const z = h[g];
    if (z.validator(b))
      return z.classGroupId;
  }
}, a0 = (i) => i.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = i.slice(1, -1), c = r.indexOf(":"), u = r.slice(0, c);
  return u ? n0 + u : void 0;
})(), i0 = (i) => {
  const {
    theme: r,
    classGroups: c
  } = i;
  return o0(c, r);
}, o0 = (i, r) => {
  const c = Qg();
  for (const u in i) {
    const d = i[u];
    sf(d, c, u, r);
  }
  return c;
}, sf = (i, r, c, u) => {
  const d = i.length;
  for (let f = 0; f < d; f++) {
    const h = i[f];
    r0(h, r, c, u);
  }
}, r0 = (i, r, c, u) => {
  if (typeof i == "string") {
    u0(i, r, c);
    return;
  }
  if (typeof i == "function") {
    c0(i, r, c, u);
    return;
  }
  s0(i, r, c, u);
}, u0 = (i, r, c) => {
  const u = i === "" ? r : Jg(r, i);
  u.classGroupId = c;
}, c0 = (i, r, c, u) => {
  if (f0(i)) {
    sf(i(u), r, c, u);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(t0(c, i));
}, s0 = (i, r, c, u) => {
  const d = Object.entries(i), f = d.length;
  for (let h = 0; h < f; h++) {
    const [b, p] = d[h];
    sf(p, Jg(r, b), c, u);
  }
}, Jg = (i, r) => {
  let c = i;
  const u = r.split(fu), d = u.length;
  for (let f = 0; f < d; f++) {
    const h = u[f];
    let b = c.nextPart.get(h);
    b || (b = Qg(), c.nextPart.set(h, b)), c = b;
  }
  return c;
}, f0 = (i) => "isThemeGetter" in i && i.isThemeGetter === !0, d0 = (i) => {
  if (i < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, c = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
  const d = (f, h) => {
    c[f] = h, r++, r > i && (r = 0, u = c, c = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(f) {
      let h = c[f];
      if (h !== void 0)
        return h;
      if ((h = u[f]) !== void 0)
        return d(f, h), h;
    },
    set(f, h) {
      f in c ? c[f] = h : d(f, h);
    }
  };
}, Ks = "!", bg = ":", h0 = [], yg = (i, r, c, u, d) => ({
  modifiers: i,
  hasImportantModifier: r,
  baseClassName: c,
  maybePostfixModifierPosition: u,
  isExternal: d
}), m0 = (i) => {
  const {
    prefix: r,
    experimentalParseClassName: c
  } = i;
  let u = (d) => {
    const f = [];
    let h = 0, b = 0, p = 0, g;
    const z = d.length;
    for (let Q = 0; Q < z; Q++) {
      const W = d[Q];
      if (h === 0 && b === 0) {
        if (W === bg) {
          f.push(d.slice(p, Q)), p = Q + 1;
          continue;
        }
        if (W === "/") {
          g = Q;
          continue;
        }
      }
      W === "[" ? h++ : W === "]" ? h-- : W === "(" ? b++ : W === ")" && b--;
    }
    const E = f.length === 0 ? d : d.slice(p);
    let M = E, k = !1;
    E.endsWith(Ks) ? (M = E.slice(0, -1), k = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      E.startsWith(Ks) && (M = E.slice(1), k = !0)
    );
    const q = g && g > p ? g - p : void 0;
    return yg(f, k, M, q);
  };
  if (r) {
    const d = r + bg, f = u;
    u = (h) => h.startsWith(d) ? f(h.slice(d.length)) : yg(h0, !1, h, void 0, !0);
  }
  if (c) {
    const d = u;
    u = (f) => c({
      className: f,
      parseClassName: d
    });
  }
  return u;
}, g0 = (i) => {
  const r = /* @__PURE__ */ new Map();
  return i.orderSensitiveModifiers.forEach((c, u) => {
    r.set(c, 1e6 + u);
  }), (c) => {
    const u = [];
    let d = [];
    for (let f = 0; f < c.length; f++) {
      const h = c[f], b = h[0] === "[", p = r.has(h);
      b || p ? (d.length > 0 && (d.sort(), u.push(...d), d = []), u.push(h)) : d.push(h);
    }
    return d.length > 0 && (d.sort(), u.push(...d)), u;
  };
}, p0 = (i) => ({
  cache: d0(i.cacheSize),
  parseClassName: m0(i),
  sortModifiers: g0(i),
  postfixLookupClassGroupIds: v0(i),
  ...l0(i)
}), v0 = (i) => {
  const r = /* @__PURE__ */ Object.create(null), c = i.postfixLookupClassGroups;
  if (c)
    for (let u = 0; u < c.length; u++)
      r[c[u]] = !0;
  return r;
}, b0 = /\s+/, y0 = (i, r) => {
  const {
    parseClassName: c,
    getClassGroupId: u,
    getConflictingClassGroupIds: d,
    sortModifiers: f,
    postfixLookupClassGroupIds: h
  } = r, b = [], p = i.trim().split(b0);
  let g = "";
  for (let z = p.length - 1; z >= 0; z -= 1) {
    const E = p[z], {
      isExternal: M,
      modifiers: k,
      hasImportantModifier: q,
      baseClassName: Q,
      maybePostfixModifierPosition: W
    } = c(E);
    if (M) {
      g = E + (g.length > 0 ? " " + g : g);
      continue;
    }
    let $ = !!W, L;
    if ($) {
      const ie = Q.substring(0, W);
      L = u(ie);
      const P = L && h[L] ? u(Q) : void 0;
      P && P !== L && (L = P, $ = !1);
    } else
      L = u(Q);
    if (!L) {
      if (!$) {
        g = E + (g.length > 0 ? " " + g : g);
        continue;
      }
      if (L = u(Q), !L) {
        g = E + (g.length > 0 ? " " + g : g);
        continue;
      }
      $ = !1;
    }
    const J = k.length === 0 ? "" : k.length === 1 ? k[0] : f(k).join(":"), le = q ? J + Ks : J, me = le + L;
    if (b.indexOf(me) > -1)
      continue;
    b.push(me);
    const fe = d(L, $);
    for (let ie = 0; ie < fe.length; ++ie) {
      const P = fe[ie];
      b.push(le + P);
    }
    g = E + (g.length > 0 ? " " + g : g);
  }
  return g;
}, x0 = (...i) => {
  let r = 0, c, u, d = "";
  for (; r < i.length; )
    (c = i[r++]) && (u = $g(c)) && (d && (d += " "), d += u);
  return d;
}, $g = (i) => {
  if (typeof i == "string")
    return i;
  let r, c = "";
  for (let u = 0; u < i.length; u++)
    i[u] && (r = $g(i[u])) && (c && (c += " "), c += r);
  return c;
}, S0 = (i, ...r) => {
  let c, u, d, f;
  const h = (p) => {
    const g = r.reduce((z, E) => E(z), i());
    return c = p0(g), u = c.cache.get, d = c.cache.set, f = b, b(p);
  }, b = (p) => {
    const g = u(p);
    if (g)
      return g;
    const z = y0(p, c);
    return d(p, z), z;
  };
  return f = h, (...p) => f(x0(...p));
}, _0 = [], Ct = (i) => {
  const r = (c) => c[i] || _0;
  return r.isThemeGetter = !0, r;
}, Pg = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Wg = /^\((?:(\w[\w-]*):)?(.+)\)$/i, E0 = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, A0 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, C0 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, T0 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, M0 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, z0 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Zl = (i) => E0.test(i), Ne = (i) => !!i && !Number.isNaN(Number(i)), Hn = (i) => !!i && Number.isInteger(Number(i)), ks = (i) => i.endsWith("%") && Ne(i.slice(0, -1)), dl = (i) => A0.test(i), Fg = () => !0, w0 = (i) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  C0.test(i) && !T0.test(i)
), ff = () => !1, R0 = (i) => M0.test(i), N0 = (i) => z0.test(i), O0 = (i) => !re(i) && !ue(i), D0 = (i) => i.startsWith("@container") && (i[10] === "/" && i[11] !== void 0 || i[11] === "s" && i[16] !== void 0 && i.startsWith("-size/", 10) || i[11] === "n" && i[18] !== void 0 && i.startsWith("-normal/", 10)), j0 = (i) => Kl(i, tp, ff), re = (i) => Pg.test(i), _a = (i) => Kl(i, np, w0), xg = (i) => Kl(i, Y0, Ne), k0 = (i) => Kl(i, ap, Fg), U0 = (i) => Kl(i, lp, ff), Sg = (i) => Kl(i, Ig, ff), L0 = (i) => Kl(i, ep, N0), lu = (i) => Kl(i, ip, R0), ue = (i) => Wg.test(i), _o = (i) => Ta(i, np), H0 = (i) => Ta(i, lp), _g = (i) => Ta(i, Ig), B0 = (i) => Ta(i, tp), G0 = (i) => Ta(i, ep), au = (i) => Ta(i, ip, !0), V0 = (i) => Ta(i, ap, !0), Kl = (i, r, c) => {
  const u = Pg.exec(i);
  return u ? u[1] ? r(u[1]) : c(u[2]) : !1;
}, Ta = (i, r, c = !1) => {
  const u = Wg.exec(i);
  return u ? u[1] ? r(u[1]) : c : !1;
}, Ig = (i) => i === "position" || i === "percentage", ep = (i) => i === "image" || i === "url", tp = (i) => i === "length" || i === "size" || i === "bg-size", np = (i) => i === "length", Y0 = (i) => i === "number", lp = (i) => i === "family-name", ap = (i) => i === "number" || i === "weight", ip = (i) => i === "shadow", q0 = () => {
  const i = Ct("color"), r = Ct("font"), c = Ct("text"), u = Ct("font-weight"), d = Ct("tracking"), f = Ct("leading"), h = Ct("breakpoint"), b = Ct("container"), p = Ct("spacing"), g = Ct("radius"), z = Ct("shadow"), E = Ct("inset-shadow"), M = Ct("text-shadow"), k = Ct("drop-shadow"), q = Ct("blur"), Q = Ct("perspective"), W = Ct("aspect"), $ = Ct("ease"), L = Ct("animate"), J = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], le = () => [
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
  ], me = () => [...le(), ue, re], fe = () => ["auto", "hidden", "clip", "visible", "scroll"], ie = () => ["auto", "contain", "none"], P = () => [ue, re, p], ae = () => [Zl, "full", "auto", ...P()], Se = () => [Hn, "none", "subgrid", ue, re], Ae = () => ["auto", {
    span: ["full", Hn, ue, re]
  }, Hn, ue, re], we = () => [Hn, "auto", ue, re], We = () => ["auto", "min", "max", "fr", ue, re], Fe = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Xe = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], D = () => ["auto", ...P()], X = () => [Zl, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...P()], ce = () => [Zl, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...P()], Re = () => [Zl, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...P()], ne = () => [i, ue, re], C = () => [...le(), _g, Sg, {
    position: [ue, re]
  }], V = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ee = () => ["auto", "cover", "contain", B0, j0, {
    size: [ue, re]
  }], F = () => [ks, _o, _a], oe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    g,
    ue,
    re
  ], he = () => ["", Ne, _o, _a], Te = () => ["solid", "dashed", "dotted", "double"], Ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], _e = () => [Ne, ks, _g, Sg], Vt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    q,
    ue,
    re
  ], Tt = () => ["none", Ne, ue, re], Mt = () => ["none", Ne, ue, re], Yt = () => [Ne, ue, re], ct = () => [Zl, "full", ...P()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [dl],
      breakpoint: [dl],
      color: [Fg],
      container: [dl],
      "drop-shadow": [dl],
      ease: ["in", "out", "in-out"],
      font: [O0],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [dl],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [dl],
      shadow: [dl],
      spacing: ["px", Ne],
      text: [dl],
      "text-shadow": [dl],
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
        aspect: ["auto", "square", Zl, re, ue, W]
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
        "@container": ["", "normal", "size", ue, re]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [D0],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Ne, re, ue, b]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": J()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": J()
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
        object: me()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: fe()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": fe()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": fe()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: ie()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": ie()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": ie()
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
        inset: ae()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": ae()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": ae()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": ae(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: ae()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": ae(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: ae()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": ae()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": ae()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: ae()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: ae()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: ae()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: ae()
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
        z: [Hn, "auto", ue, re]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Zl, "full", "auto", b, ...P()]
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
        flex: [Ne, Zl, "auto", "initial", "none", re]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Ne, ue, re]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Ne, ue, re]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Hn, "first", "last", "none", ue, re]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": Se()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: Ae()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": we()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": we()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": Se()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: Ae()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": we()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": we()
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
        "auto-cols": We()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": We()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: P()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": P()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": P()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Fe(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Xe(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Xe()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Fe()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Xe(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Xe(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Fe()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Xe(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Xe()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: P()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: P()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: P()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: P()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: P()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: P()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: P()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: P()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: P()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: P()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: P()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: D()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: D()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: D()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: D()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: D()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: D()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: D()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: D()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: D()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: D()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: D()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": P()
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
        "space-y": P()
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
        size: X()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...ce()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...ce()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...ce()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...Re()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...Re()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...Re()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [b, "screen", ...X()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          b,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...X()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          b,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [h]
          },
          ...X()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...X()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...X()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...X()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", c, _o, _a]
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
        font: [u, V0, k0]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ks, re]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [H0, U0, r]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [re]
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
        tracking: [d, ue, re]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Ne, "none", ue, xg]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...P()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ue, re]
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
        list: ["disc", "decimal", "none", ue, re]
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
        placeholder: ne()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: ne()
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
        decoration: [...Te(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Ne, "from-font", "auto", ue, _a]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: ne()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Ne, "auto", ue, re]
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
        indent: P()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [Hn, ue, re]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ue, re]
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
        content: ["none", ue, re]
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
        bg: C()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: V()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ee()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Hn, ue, re],
          radial: ["", ue, re],
          conic: [Hn, ue, re]
        }, G0, L0]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: ne()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: F()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: F()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: F()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: ne()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: ne()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: ne()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: oe()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": oe()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": oe()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": oe()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": oe()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": oe()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": oe()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": oe()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": oe()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": oe()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": oe()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": oe()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": oe()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": oe()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": oe()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: he()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": he()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": he()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": he()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": he()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": he()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": he()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": he()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": he()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": he()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": he()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": he()
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
        "divide-y": he()
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
        border: [...Te(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...Te(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: ne()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": ne()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": ne()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": ne()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": ne()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": ne()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": ne()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": ne()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": ne()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": ne()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": ne()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: ne()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...Te(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Ne, ue, re]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Ne, _o, _a]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: ne()
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
          z,
          au,
          lu
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: ne()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", E, au, lu]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": ne()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: he()
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
        ring: ne()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Ne, _a]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": ne()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": he()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": ne()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", M, au, lu]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": ne()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Ne, ue, re]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ie(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ie()
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
        "mask-linear": [Ne]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": _e()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": _e()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": ne()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": ne()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": _e()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": _e()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": ne()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": ne()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": _e()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": _e()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": ne()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": ne()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": _e()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": _e()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": ne()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": ne()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": _e()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": _e()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": ne()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": ne()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": _e()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": _e()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": ne()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": ne()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": _e()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": _e()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": ne()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": ne()
      }],
      "mask-image-radial": [{
        "mask-radial": [ue, re]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": _e()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": _e()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": ne()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": ne()
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
        "mask-radial-at": le()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Ne]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": _e()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": _e()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": ne()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": ne()
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
        mask: C()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: V()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ee()
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
        mask: ["none", ue, re]
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
          ue,
          re
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Vt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Ne, ue, re]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Ne, ue, re]
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
          k,
          au,
          lu
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": ne()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Ne, ue, re]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Ne, ue, re]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Ne, ue, re]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Ne, ue, re]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Ne, ue, re]
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
          ue,
          re
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Vt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Ne, ue, re]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Ne, ue, re]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Ne, ue, re]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Ne, ue, re]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Ne, ue, re]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Ne, ue, re]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Ne, ue, re]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Ne, ue, re]
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
        "border-spacing": P()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": P()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": P()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ue, re]
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
        duration: [Ne, "initial", ue, re]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", $, ue, re]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Ne, ue, re]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", L, ue, re]
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
        perspective: [Q, ue, re]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": me()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Tt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Tt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Tt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Tt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Mt()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Mt()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Mt()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Mt()
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
        skew: Yt()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Yt()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Yt()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ue, re, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: me()
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
        translate: ct()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ct()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ct()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ct()
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
        zoom: [Hn, ue, re]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ne()
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
        caret: ne()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ue, re]
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
        "scrollbar-thumb": ne()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": ne()
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
        "scroll-m": P()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": P()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": P()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
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
        "will-change": ["auto", "scroll", "contents", "transform", ue, re]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...ne()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Ne, _o, _a, xg]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...ne()]
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
}, X0 = /* @__PURE__ */ S0(q0);
function He(...i) {
  return X0(Zg(i));
}
const op = (...i) => i.filter((r, c, u) => !!r && r.trim() !== "" && u.indexOf(r) === c).join(" ").trim();
const Z0 = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const Q0 = (i) => i.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, c, u) => u ? u.toUpperCase() : c.toLowerCase()
);
const Eg = (i) => {
  const r = Q0(i);
  return r.charAt(0).toUpperCase() + r.slice(1);
};
var Us = {
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
const K0 = (i) => {
  for (const r in i)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
  return !1;
}, J0 = S.createContext({}), $0 = () => S.useContext(J0), P0 = S.forwardRef(
  ({ color: i, size: r, strokeWidth: c, absoluteStrokeWidth: u, className: d = "", children: f, iconNode: h, ...b }, p) => {
    const {
      size: g = 24,
      strokeWidth: z = 2,
      absoluteStrokeWidth: E = !1,
      color: M = "currentColor",
      className: k = ""
    } = $0() ?? {}, q = u ?? E ? Number(c ?? z) * 24 / Number(r ?? g) : c ?? z;
    return S.createElement(
      "svg",
      {
        ref: p,
        ...Us,
        width: r ?? g ?? Us.width,
        height: r ?? g ?? Us.height,
        stroke: i ?? M,
        strokeWidth: q,
        className: op("lucide", k, d),
        ...!f && !K0(b) && { "aria-hidden": "true" },
        ...b
      },
      [
        ...h.map(([Q, W]) => S.createElement(Q, W)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const Xt = (i, r) => {
  const c = S.forwardRef(
    ({ className: u, ...d }, f) => S.createElement(P0, {
      ref: f,
      iconNode: r,
      className: op(
        `lucide-${Z0(Eg(i))}`,
        `lucide-${i}`,
        u
      ),
      ...d
    })
  );
  return c.displayName = Eg(i), c;
};
const W0 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], F0 = Xt("chevron-down", W0);
const I0 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], e1 = Xt("chevron-right", I0);
const t1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Ag = Xt("circle", t1);
const n1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], l1 = Xt("eye", n1);
const a1 = [
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
], i1 = Xt("eye-off", a1);
const o1 = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], r1 = Xt("lasso", o1);
const u1 = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], c1 = Xt("maximize", u1);
const s1 = [["path", { d: "M5 12h14", key: "1ays0h" }]], rp = Xt("minus", s1);
const f1 = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], d1 = Xt("move", f1);
const h1 = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], m1 = Xt("pentagon", h1);
const g1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], p1 = Xt("plus", g1);
const v1 = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], up = Xt("shapes", v1);
const b1 = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], y1 = Xt("spline", b1);
const x1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], S1 = Xt("square", x1);
const _1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], E1 = Xt("x", _1);
var A1 = qg(), C1 = Object.defineProperty, df = (i, r) => C1(i, "name", { value: r, configurable: !0 });
function Js(i, r) {
  if (typeof i == "function")
    return i(r);
  i != null && (i.current = r);
}
df(Js, "setRef");
function cp(...i) {
  return (r) => {
    let c = !1;
    const u = i.map((d) => {
      const f = Js(d, r);
      return !c && typeof f == "function" && (c = !0), f;
    });
    if (c)
      return () => {
        for (let d = 0; d < u.length; d++) {
          const f = u[d];
          typeof f == "function" ? f() : Js(i[d], null);
        }
      };
  };
}
df(cp, "composeRefs");
function rt(...i) {
  return S.useCallback(cp(...i), i);
}
df(rt, "useComposedRefs");
var T1 = Object.defineProperty, wn = (i, r) => T1(i, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Aa(i) {
  const r = S.forwardRef((c, u) => {
    let { children: d, ...f } = c, h = null, b = !1;
    const p = [];
    $s(d) && typeof iu == "function" && (d = iu(d._payload)), S.Children.forEach(d, (M) => {
      if (mp(M)) {
        b = !0;
        const k = M;
        let q = "child" in k.props ? k.props.child : k.props.children;
        $s(q) && typeof iu == "function" && (q = iu(q._payload)), h = z1(k, q), p.push(h?.props?.children);
      } else
        p.push(M);
    }), h ? h = S.cloneElement(h, void 0, p) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !b && S.Children.count(d) === 1 && S.isValidElement(d) && (h = d)
    );
    const g = h ? hp(h) : void 0, z = rt(u, g);
    if (!h) {
      if (d || d === 0)
        throw new Error(
          b ? N1(i) : R1(i)
        );
      return d;
    }
    const E = dp(f, h.props ?? {});
    return h.type !== S.Fragment && (E.ref = u ? z : g), S.cloneElement(h, E);
  });
  return r.displayName = `${i}.Slot`, r;
}
wn(Aa, "createSlot");
var sp = /* @__PURE__ */ Aa("Slot"), fp = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function M1(i) {
  const r = /* @__PURE__ */ wn((c) => "child" in c ? c.children(c.child) : c.children, "Slottable");
  return r.displayName = `${i}.Slottable`, r.__radixId = fp, r;
}
wn(M1, "createSlottable");
var z1 = /* @__PURE__ */ wn((i, r) => {
  if ("child" in i.props) {
    const c = i.props.child;
    return S.isValidElement(c) ? S.cloneElement(c, void 0, i.props.children(c.props.children)) : null;
  }
  return S.isValidElement(r) ? r : null;
}, "getSlottableElementFromSlottable");
function dp(i, r) {
  const c = { ...r };
  for (const u in r) {
    const d = i[u], f = r[u];
    /^on[A-Z]/.test(u) ? d && f ? c[u] = (...b) => {
      const p = f(...b);
      return d(...b), p;
    } : d && (c[u] = d) : u === "style" ? c[u] = { ...d, ...f } : u === "className" && (c[u] = [d, f].filter(Boolean).join(" "));
  }
  return { ...i, ...c };
}
wn(dp, "mergeProps");
function hp(i) {
  let r = Object.getOwnPropertyDescriptor(i.props, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning;
  return c ? i.ref : (r = Object.getOwnPropertyDescriptor(i, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning, c ? i.props.ref : i.props.ref || i.ref);
}
wn(hp, "getElementRef");
function mp(i) {
  return S.isValidElement(i) && typeof i.type == "function" && "__radixId" in i.type && i.type.__radixId === fp;
}
wn(mp, "isSlottable");
var w1 = /* @__PURE__ */ Symbol.for("react.lazy");
function $s(i) {
  return i != null && typeof i == "object" && "$$typeof" in i && i.$$typeof === w1 && "_payload" in i && gp(i._payload);
}
wn($s, "isLazyComponent");
function gp(i) {
  return typeof i == "object" && i !== null && "then" in i;
}
wn(gp, "isPromiseLike");
var R1 = /* @__PURE__ */ wn((i) => `${i} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), N1 = /* @__PURE__ */ wn((i) => `${i} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), iu = _i[" use ".trim().toString()], O1 = Object.defineProperty, D1 = (i, r) => O1(i, "name", { value: r, configurable: !0 }), j1 = [
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
], ut = j1.reduce((i, r) => {
  const c = /* @__PURE__ */ Aa(`Primitive.${r}`), u = S.forwardRef((d, f) => {
    const { asChild: h, ...b } = d, p = h ? c : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ y.jsx(p, { ...b, ref: f });
  });
  return u.displayName = `Primitive.${r}`, { ...i, [r]: u };
}, {});
function k1(i, r) {
  i && A1.flushSync(() => i.dispatchEvent(r));
}
D1(k1, "dispatchDiscreteCustomEvent");
var U1 = Object.defineProperty, xn = (i, r) => U1(i, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function L1(i, r) {
  const c = S.createContext(r);
  c.displayName = i + "Context";
  const u = /* @__PURE__ */ xn((f) => {
    const { children: h, ...b } = f, p = S.useMemo(() => b, Object.values(b));
    return /* @__PURE__ */ y.jsx(c.Provider, { value: p, children: h });
  }, "Provider");
  u.displayName = i + "Provider";
  function d(f, h = {}) {
    const { optional: b = !1 } = h, p = S.useContext(c);
    if (p) return p;
    if (r !== void 0) return r;
    if (!b)
      throw new Error(`\`${f}\` must be used within \`${i}\``);
  }
  return xn(d, "useContext"), [u, d];
}
xn(L1, "createContext");
// @__NO_SIDE_EFFECTS__
function vl(i, r = []) {
  let c = [];
  function u(f, h) {
    const b = S.createContext(h);
    b.displayName = f + "Context";
    const p = c.length;
    c = [...c, h];
    const g = /* @__PURE__ */ xn((E) => {
      const { scope: M, children: k, ...q } = E, Q = M?.[i]?.[p] || b, W = S.useMemo(() => q, Object.values(q));
      return /* @__PURE__ */ y.jsx(Q.Provider, { value: W, children: k });
    }, "Provider");
    g.displayName = f + "Provider";
    function z(E, M, k = {}) {
      const { optional: q = !1 } = k, Q = M?.[i]?.[p] || b, W = S.useContext(Q);
      if (W) return W;
      if (h !== void 0) return h;
      if (!q)
        throw new Error(`\`${E}\` must be used within \`${f}\``);
    }
    return xn(z, "useContext"), [g, z];
  }
  xn(u, "createContext");
  const d = /* @__PURE__ */ xn(() => {
    const f = c.map((h) => S.createContext(h));
    return /* @__PURE__ */ xn(function(b) {
      const p = b?.[i] || f;
      return S.useMemo(
        () => ({ [`__scope${i}`]: { ...b, [i]: p } }),
        [b, p]
      );
    }, "useScope");
  }, "createScope");
  return d.scopeName = i, [u, pp(d, ...r)];
}
xn(vl, "createContextScope");
function pp(...i) {
  const r = i[0];
  if (i.length === 1) return r;
  const c = /* @__PURE__ */ xn(() => {
    const u = i.map((d) => ({
      useScope: d(),
      scopeName: d.scopeName
    }));
    return /* @__PURE__ */ xn(function(f) {
      const h = u.reduce((b, { useScope: p, scopeName: g }) => {
        const E = p(f)[`__scope${g}`];
        return { ...b, ...E };
      }, {});
      return S.useMemo(() => ({ [`__scope${r.scopeName}`]: h }), [h]);
    }, "useComposedScopes");
  }, "createScope");
  return c.scopeName = r.scopeName, c;
}
xn(pp, "composeContextScopes");
var H1 = Object.defineProperty, Nt = (i, r) => H1(i, "name", { value: r, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function hu(i) {
  const r = i + "CollectionProvider", [c, u] = /* @__PURE__ */ vl(r), [d, f] = c(
    r,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), h = /* @__PURE__ */ Nt((Q) => {
    const { scope: W, children: $ } = Q, L = S.useRef(null), J = S.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ y.jsx(d, { scope: W, itemMap: J, collectionRef: L, children: $ });
  }, "CollectionProvider");
  h.displayName = r;
  const b = i + "CollectionSlot", p = /* @__PURE__ */ Aa(b), g = S.forwardRef(
    (Q, W) => {
      const { scope: $, children: L } = Q, J = f(b, $), le = rt(W, J.collectionRef);
      return /* @__PURE__ */ y.jsx(p, { ref: le, children: L });
    }
  );
  g.displayName = b;
  const z = i + "CollectionItemSlot", E = "data-radix-collection-item", M = /* @__PURE__ */ Aa(z), k = S.forwardRef(
    (Q, W) => {
      const { scope: $, children: L, ...J } = Q, le = S.useRef(null), me = rt(W, le), fe = f(z, $);
      return S.useEffect(() => (fe.itemMap.set(le, { ref: le, ...J }), () => {
        fe.itemMap.delete(le);
      })), /* @__PURE__ */ y.jsx(M, { [E]: "", ref: me, children: L });
    }
  );
  k.displayName = z;
  function q(Q) {
    const W = f(i + "CollectionConsumer", Q);
    return S.useCallback(() => {
      const L = W.collectionRef.current;
      if (!L) return [];
      const J = Array.from(L.querySelectorAll(`[${E}]`));
      return Array.from(W.itemMap.values()).sort(
        (fe, ie) => J.indexOf(fe.ref.current) - J.indexOf(ie.ref.current)
      );
    }, [W.collectionRef, W.itemMap]);
  }
  return Nt(q, "useCollection"), [
    { Provider: h, Slot: g, ItemSlot: k },
    q,
    u
  ];
}
Nt(hu, "createCollection");
var Cg = /* @__PURE__ */ new WeakMap(), bt, rn, Ls = (rn = class extends Map {
  constructor(c) {
    super(c);
    ig(this, bt);
    zs(this, bt, [...super.keys()]), Cg.set(this, !0);
  }
  set(c, u) {
    return Cg.get(this) && (this.has(c) ? Bt(this, bt)[Bt(this, bt).indexOf(c)] = c : Bt(this, bt).push(c)), super.set(c, u), this;
  }
  insert(c, u, d) {
    const f = this.has(u), h = Bt(this, bt).length, b = hf(c);
    let p = b >= 0 ? b : h + b;
    const g = p < 0 || p >= h ? -1 : p;
    if (g === this.size || f && g === this.size - 1 || g === -1)
      return this.set(u, d), this;
    const z = this.size + (f ? 0 : 1);
    b < 0 && p++;
    const E = [...Bt(this, bt)];
    let M, k = !1;
    for (let q = p; q < z; q++)
      if (p === q) {
        let Q = E[q];
        E[q] === u && (Q = E[q + 1]), f && this.delete(u), M = this.get(Q), this.set(u, d);
      } else {
        !k && E[q - 1] === u && (k = !0);
        const Q = E[k ? q : q - 1], W = M;
        M = this.get(Q), this.delete(Q), this.set(Q, W);
      }
    return this;
  }
  with(c, u, d) {
    const f = new rn(this);
    return f.insert(c, u, d), f;
  }
  before(c) {
    const u = Bt(this, bt).indexOf(c) - 1;
    if (!(u < 0))
      return this.entryAt(u);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(c, u, d) {
    const f = Bt(this, bt).indexOf(c);
    return f === -1 ? this : this.insert(f, u, d);
  }
  after(c) {
    let u = Bt(this, bt).indexOf(c);
    if (u = u === -1 || u === this.size - 1 ? -1 : u + 1, u !== -1)
      return this.entryAt(u);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(c, u, d) {
    const f = Bt(this, bt).indexOf(c);
    return f === -1 ? this : this.insert(f + 1, u, d);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return zs(this, bt, []), super.clear();
  }
  delete(c) {
    const u = super.delete(c);
    return u && Bt(this, bt).splice(Bt(this, bt).indexOf(c), 1), u;
  }
  deleteAt(c) {
    const u = this.keyAt(c);
    return u !== void 0 ? this.delete(u) : !1;
  }
  at(c) {
    const u = su(Bt(this, bt), c);
    if (u !== void 0)
      return this.get(u);
  }
  entryAt(c) {
    const u = su(Bt(this, bt), c);
    if (u !== void 0)
      return [u, this.get(u)];
  }
  indexOf(c) {
    return Bt(this, bt).indexOf(c);
  }
  keyAt(c) {
    return su(Bt(this, bt), c);
  }
  from(c, u) {
    const d = this.indexOf(c);
    if (d === -1)
      return;
    let f = d + u;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.at(f);
  }
  keyFrom(c, u) {
    const d = this.indexOf(c);
    if (d === -1)
      return;
    let f = d + u;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.keyAt(f);
  }
  find(c, u) {
    let d = 0;
    for (const f of this) {
      if (Reflect.apply(c, u, [f, d, this]))
        return f;
      d++;
    }
  }
  findIndex(c, u) {
    let d = 0;
    for (const f of this) {
      if (Reflect.apply(c, u, [f, d, this]))
        return d;
      d++;
    }
    return -1;
  }
  filter(c, u) {
    const d = [];
    let f = 0;
    for (const h of this)
      Reflect.apply(c, u, [h, f, this]) && d.push(h), f++;
    return new rn(d);
  }
  map(c, u) {
    const d = [];
    let f = 0;
    for (const h of this)
      d.push([h[0], Reflect.apply(c, u, [h, f, this])]), f++;
    return new rn(d);
  }
  reduce(...c) {
    const [u, d] = c;
    let f = 0, h = d ?? this.at(0);
    for (const b of this)
      f === 0 && c.length === 1 ? h = b : h = Reflect.apply(u, this, [h, b, f, this]), f++;
    return h;
  }
  reduceRight(...c) {
    const [u, d] = c;
    let f = d ?? this.at(-1);
    for (let h = this.size - 1; h >= 0; h--) {
      const b = this.at(h);
      h === this.size - 1 && c.length === 1 ? f = b : f = Reflect.apply(u, this, [f, b, h, this]);
    }
    return f;
  }
  toSorted(c) {
    const u = [...this.entries()].sort(c);
    return new rn(u);
  }
  toReversed() {
    const c = new rn();
    for (let u = this.size - 1; u >= 0; u--) {
      const d = this.keyAt(u), f = this.get(d);
      c.set(d, f);
    }
    return c;
  }
  toSpliced(...c) {
    const u = [...this.entries()];
    return u.splice(...c), new rn(u);
  }
  slice(c, u) {
    const d = new rn();
    let f = this.size - 1;
    if (c === void 0)
      return d;
    c < 0 && (c = c + this.size), u !== void 0 && u > 0 && (f = u - 1);
    for (let h = c; h <= f; h++) {
      const b = this.keyAt(h), p = this.get(b);
      d.set(b, p);
    }
    return d;
  }
  every(c, u) {
    let d = 0;
    for (const f of this) {
      if (!Reflect.apply(c, u, [f, d, this]))
        return !1;
      d++;
    }
    return !0;
  }
  some(c, u) {
    let d = 0;
    for (const f of this) {
      if (Reflect.apply(c, u, [f, d, this]))
        return !0;
      d++;
    }
    return !1;
  }
}, bt = new WeakMap(), Nt(rn, "OrderedDict"), rn);
function su(i, r) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(i, r);
  const c = vp(i, r);
  return c === -1 ? void 0 : i[c];
}
Nt(su, "at");
function vp(i, r) {
  const c = i.length, u = hf(r), d = u >= 0 ? u : c + u;
  return d < 0 || d >= c ? -1 : d;
}
Nt(vp, "toSafeIndex");
function hf(i) {
  return i !== i || i === 0 ? 0 : Math.trunc(i);
}
Nt(hf, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function B1(i) {
  const r = i + "CollectionProvider", [c, u] = /* @__PURE__ */ vl(r), [d, f] = c(
    r,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Ls(),
      setItemMap: /* @__PURE__ */ Nt(() => {
      }, "setItemMap")
    }
  ), h = /* @__PURE__ */ Nt(({ state: J, ...le }) => J ? /* @__PURE__ */ y.jsx(p, { ...le, state: J }) : /* @__PURE__ */ y.jsx(b, { ...le }), "CollectionProvider");
  h.displayName = r;
  const b = /* @__PURE__ */ Nt((J) => {
    const le = W();
    return /* @__PURE__ */ y.jsx(p, { ...J, state: le });
  }, "CollectionInit");
  b.displayName = r + "Init";
  const p = /* @__PURE__ */ Nt((J) => {
    const { scope: le, children: me, state: fe } = J, ie = S.useRef(null), [P, ae] = S.useState(
      null
    ), Se = rt(ie, ae), [Ae, we] = fe;
    return S.useEffect(() => {
      if (!P) return;
      const We = xp(() => {
      });
      return We.observe(P, {
        childList: !0,
        subtree: !0
      }), () => {
        We.disconnect();
      };
    }, [P]), /* @__PURE__ */ y.jsx(
      d,
      {
        scope: le,
        itemMap: Ae,
        setItemMap: we,
        collectionRef: Se,
        collectionRefObject: ie,
        collectionElement: P,
        children: me
      }
    );
  }, "CollectionProviderImpl");
  p.displayName = r + "Impl";
  const g = i + "CollectionSlot", z = /* @__PURE__ */ Aa(g), E = S.forwardRef(
    (J, le) => {
      const { scope: me, children: fe } = J, ie = f(g, me), P = rt(le, ie.collectionRef);
      return /* @__PURE__ */ y.jsx(z, { ref: P, children: fe });
    }
  );
  E.displayName = g;
  const M = i + "CollectionItemSlot", k = "data-radix-collection-item", q = /* @__PURE__ */ Aa(M), Q = S.forwardRef(
    (J, le) => {
      const { scope: me, children: fe, ...ie } = J, P = S.useRef(null), [ae, Se] = S.useState(null), Ae = rt(le, P, Se), we = f(M, me), { setItemMap: We } = we, Fe = S.useRef(ie);
      bp(Fe.current, ie) || (Fe.current = ie);
      const Xe = Fe.current;
      return S.useEffect(() => {
        const D = Xe;
        return We((X) => ae ? X.has(ae) ? X.set(ae, { ...D, element: ae }).toSorted(Ps) : (X.set(ae, { ...D, element: ae }), X.toSorted(Ps)) : X), () => {
          We((X) => !ae || !X.has(ae) ? X : (X.delete(ae), new Ls(X)));
        };
      }, [ae, Xe, We]), /* @__PURE__ */ y.jsx(q, { [k]: "", ref: Ae, children: fe });
    }
  );
  Q.displayName = M;
  function W() {
    return S.useState(new Ls());
  }
  Nt(W, "useInitCollection");
  function $(J) {
    const { itemMap: le } = f(i + "CollectionConsumer", J);
    return le;
  }
  return Nt($, "useCollection"), [
    { Provider: h, Slot: E, ItemSlot: Q },
    {
      createCollectionScope: u,
      useCollection: $,
      useInitCollection: W
    }
  ];
}
Nt(B1, "createCollection");
function bp(i, r) {
  if (i === r) return !0;
  if (typeof i != "object" || typeof r != "object" || i == null || r == null) return !1;
  const c = Object.keys(i), u = Object.keys(r);
  if (c.length !== u.length) return !1;
  for (const d of c)
    if (!Object.prototype.hasOwnProperty.call(r, d) || i[d] !== r[d]) return !1;
  return !0;
}
Nt(bp, "shallowEqual");
function yp(i, r) {
  return !!(r.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_PRECEDING);
}
Nt(yp, "isElementPreceding");
function Ps(i, r) {
  return !i[1].element || !r[1].element ? 0 : yp(i[1].element, r[1].element) ? -1 : 1;
}
Nt(Ps, "sortByDocumentPosition");
function xp(i) {
  return new MutationObserver((c) => {
    for (const u of c)
      if (u.type === "childList") {
        i();
        return;
      }
  });
}
Nt(xp, "getChildListObserver");
var G1 = Object.defineProperty, Ei = (i, r) => G1(i, "name", { value: r, configurable: !0 }), Sp = !!(typeof window < "u" && window.document && window.document.createElement);
function at(i, r, { checkForDefaultPrevented: c = !0 } = {}) {
  return /* @__PURE__ */ Ei(function(d) {
    if (i?.(d), c === !1 || !d || !d.defaultPrevented)
      return r?.(d);
  }, "handleEvent");
}
Ei(at, "composeEventHandlers");
function V1(i) {
  if (!Sp)
    throw new Error("Cannot access window outside of the DOM");
  return i?.ownerDocument?.defaultView ?? window;
}
Ei(V1, "getOwnerWindow");
function Ws(i) {
  if (!Sp)
    throw new Error("Cannot access document outside of the DOM");
  return i?.ownerDocument ?? document;
}
Ei(Ws, "getOwnerDocument");
function _p(i, r = !1) {
  const { activeElement: c } = Ws(i);
  if (!c?.nodeName)
    return null;
  if (Ep(c) && c.contentDocument)
    return _p(c.contentDocument.body, r);
  if (r) {
    const u = c.getAttribute("aria-activedescendant");
    if (u) {
      const d = Ws(c).getElementById(u);
      if (d)
        return d;
    }
  }
  return c;
}
Ei(_p, "getActiveElement");
function Ep(i) {
  return i.tagName === "IFRAME";
}
Ei(Ep, "isFrame");
var gl = globalThis?.document ? S.useLayoutEffect : () => {
}, Y1 = Object.defineProperty, q1 = (i, r) => Y1(i, "name", { value: r, configurable: !0 }), Tg = _i[" useEffectEvent ".trim().toString()], Mg = _i[" useInsertionEffect ".trim().toString()];
function Ap(i) {
  if (typeof Tg == "function")
    return Tg(i);
  const r = S.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Mg == "function" ? Mg(() => {
    r.current = i;
  }) : gl(() => {
    r.current = i;
  }), S.useMemo(() => ((...c) => r.current?.(...c)), []);
}
q1(Ap, "useEffectEvent");
var X1 = Object.defineProperty, Oo = (i, r) => X1(i, "name", { value: r, configurable: !0 }), Z1 = _i[" useInsertionEffect ".trim().toString()] || gl;
function bl({
  prop: i,
  defaultProp: r,
  onChange: c = /* @__PURE__ */ Oo(() => {
  }, "onChange"),
  caller: u
}) {
  const [d, f, h] = Cp({
    defaultProp: r,
    onChange: c
  }), b = i !== void 0, p = b ? i : d, g = S.useCallback(
    (z) => {
      if (b) {
        const E = Tp(z) ? z(i) : z;
        E !== i && h.current?.(E);
      } else
        f(z);
    },
    [b, i, f, h]
  );
  return [p, g];
}
Oo(bl, "useControllableState");
function Cp({
  defaultProp: i,
  onChange: r
}) {
  const [c, u] = S.useState(i), d = S.useRef(c), f = S.useRef(r);
  return Z1(() => {
    f.current = r;
  }, [r]), S.useEffect(() => {
    d.current !== c && (f.current?.(c), d.current = c);
  }, [c, d]), [c, u, f];
}
Oo(Cp, "useUncontrolledState");
function Tp(i) {
  return typeof i == "function";
}
Oo(Tp, "isFunction");
var zg = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function Q1(i, r, c, u) {
  const { prop: d, defaultProp: f, onChange: h, caller: b } = r, p = d !== void 0, g = Ap(h), z = [{ ...c, state: f }];
  u && z.push(u);
  const [E, M] = S.useReducer(
    (W, $) => {
      if ($.type === zg)
        return { ...W, state: $.state };
      const L = i(W, $);
      return p && !Object.is(L.state, W.state) && g(L.state), L;
    },
    ...z
  ), k = E.state, q = S.useRef(k);
  S.useEffect(() => {
    q.current !== k && (q.current = k, p || g(k));
  }, [k, q, p]);
  const Q = S.useMemo(() => d !== void 0 ? { ...E, state: d } : E, [E, d]);
  return S.useEffect(() => {
    p && !Object.is(d, E.state) && M({ type: zg, state: d });
  }, [d, E.state, p]), [Q, M];
}
Oo(Q1, "useControllableStateReducer");
var K1 = Object.defineProperty, pl = (i, r) => K1(i, "name", { value: r, configurable: !0 });
function Mp(i, r) {
  return S.useReducer((c, u) => r[c][u] ?? c, i);
}
pl(Mp, "useStateMachine");
var Do = /* @__PURE__ */ pl((i) => {
  const { present: r, children: c } = i, u = zp(r), d = typeof c == "function" ? c({ present: u.isPresent }) : S.Children.only(c), f = wp(u.ref, Rp(d));
  return typeof c == "function" || u.isPresent ? S.cloneElement(d, { ref: f }) : null;
}, "Presence");
function zp(i) {
  const [r, c] = S.useState(), u = S.useRef(null), d = S.useRef(i), f = S.useRef("none"), h = S.useRef(void 0), b = i ? "mounted" : "unmounted", [p, g] = Mp(b, {
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
  return S.useEffect(() => {
    p === "mounted" ? (f.current = h.current ?? Si(u.current), h.current = void 0) : f.current = "none";
  }, [p]), gl(() => {
    const z = u.current, E = d.current;
    if (E !== i) {
      const k = f.current, q = Si(z);
      i ? (h.current = q, g("MOUNT")) : q === "none" || z?.display === "none" ? g("UNMOUNT") : g(E && k !== q ? "ANIMATION_OUT" : "UNMOUNT"), d.current = i;
    }
  }, [i, g]), gl(() => {
    if (r) {
      let z;
      const E = r.ownerDocument.defaultView ?? window, M = /* @__PURE__ */ pl((q) => {
        const W = Si(u.current).includes(CSS.escape(q.animationName));
        if (q.target === r && W && (g("ANIMATION_END"), !d.current)) {
          const $ = r.style.animationFillMode;
          r.style.animationFillMode = "forwards", z = E.setTimeout(() => {
            r.style.animationFillMode === "forwards" && (r.style.animationFillMode = $);
          });
        }
      }, "handleAnimationEnd"), k = /* @__PURE__ */ pl((q) => {
        q.target === r && (f.current = Si(u.current));
      }, "handleAnimationStart");
      return r.addEventListener("animationstart", k), r.addEventListener("animationcancel", M), r.addEventListener("animationend", M), () => {
        E.clearTimeout(z), r.removeEventListener("animationstart", k), r.removeEventListener("animationcancel", M), r.removeEventListener("animationend", M);
      };
    } else
      g("ANIMATION_END");
  }, [r, g]), {
    isPresent: ["mounted", "unmountSuspended"].includes(p),
    ref: S.useCallback((z) => {
      if (z) {
        const E = getComputedStyle(z);
        u.current = E, h.current = Si(E);
      } else
        u.current = null;
      c(z);
    }, [])
  };
}
pl(zp, "usePresence");
function Fs(i, r) {
  if (typeof i == "function")
    return i(r);
  i != null && (i.current = r);
}
pl(Fs, "setRef");
function wp(...i) {
  const r = S.useRef(i);
  return r.current = i, S.useCallback((c) => {
    const u = r.current;
    let d = !1;
    const f = u.map((h) => {
      const b = Fs(h, c);
      return !d && typeof b == "function" && (d = !0), b;
    });
    if (d)
      return () => {
        for (let h = 0; h < f.length; h++) {
          const b = f[h];
          typeof b == "function" ? b() : Fs(u[h], null);
        }
      };
  }, []);
}
pl(wp, "useStableComposedRefs");
function Si(i) {
  return i?.animationName || "none";
}
pl(Si, "getAnimationName");
function Rp(i) {
  let r = Object.getOwnPropertyDescriptor(i.props, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning;
  return c ? i.ref : (r = Object.getOwnPropertyDescriptor(i, "ref")?.get, c = r && "isReactWarning" in r && r.isReactWarning, c ? i.props.ref : i.props.ref || i.ref);
}
pl(Rp, "getElementRef");
var J1 = Object.defineProperty, $1 = (i, r) => J1(i, "name", { value: r, configurable: !0 }), P1 = _i[" useId ".trim().toString()] || (() => {
}), W1 = 0;
function mu(i) {
  const [r, c] = S.useState(P1());
  return gl(() => {
    i || c((u) => u ?? String(W1++));
  }, [i]), i || (r ? `radix-${r}` : "");
}
$1(mu, "useId");
var F1 = Object.defineProperty, jo = (i, r) => F1(i, "name", { value: r, configurable: !0 }), mf = "Collapsible", [I1, Np] = /* @__PURE__ */ vl(mf), [ex, gf] = I1(mf), tx = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ jo(function(r, c) {
    const {
      __scopeCollapsible: u,
      open: d,
      defaultOpen: f,
      disabled: h,
      onOpenChange: b,
      ...p
    } = r, [g, z] = bl({
      prop: d,
      defaultProp: f ?? !1,
      onChange: b,
      caller: mf
    });
    return /* @__PURE__ */ y.jsx(
      ex,
      {
        scope: u,
        disabled: h,
        contentId: mu(),
        open: g,
        onOpenToggle: S.useCallback(() => z((E) => !E), [z]),
        children: /* @__PURE__ */ y.jsx(
          ut.div,
          {
            "data-state": gu(g),
            "data-disabled": h ? "" : void 0,
            ...p,
            ref: c
          }
        )
      }
    );
  }, "Collapsible")
), nx = "CollapsibleTrigger", Op = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ jo(function(r, c) {
    const { __scopeCollapsible: u, ...d } = r, f = gf(nx, u);
    return /* @__PURE__ */ y.jsx(
      ut.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": gu(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...d,
        ref: c,
        onClick: at(r.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), Dp = "CollapsibleContent", jp = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ jo(function(r, c) {
    const { forceMount: u, ...d } = r, f = gf(Dp, r.__scopeCollapsible);
    return /* @__PURE__ */ y.jsx(Do, { present: u || f.open, children: ({ present: h }) => /* @__PURE__ */ y.jsx(lx, { ...d, ref: c, present: h }) });
  }, "CollapsibleContent")
), lx = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ jo(function(r, c) {
  const { __scopeCollapsible: u, present: d, children: f, ...h } = r, b = gf(Dp, u), [p, g] = S.useState(d), z = S.useRef(null), E = rt(c, z), M = S.useRef(0), k = M.current, q = S.useRef(0), Q = q.current, W = b.open || p, $ = S.useRef(W), L = S.useRef(void 0);
  return S.useEffect(() => {
    const J = requestAnimationFrame(() => $.current = !1);
    return () => cancelAnimationFrame(J);
  }, []), gl(() => {
    const J = z.current;
    if (J) {
      L.current = L.current || {
        transitionDuration: J.style.transitionDuration,
        animationName: J.style.animationName
      }, J.style.transitionDuration = "0s", J.style.animationName = "none";
      const le = J.getBoundingClientRect();
      M.current = le.height, q.current = le.width, $.current || (J.style.transitionDuration = L.current.transitionDuration, J.style.animationName = L.current.animationName), g(d);
    }
  }, [b.open, d]), /* @__PURE__ */ y.jsx(
    ut.div,
    {
      "data-state": gu(b.open),
      "data-disabled": b.disabled ? "" : void 0,
      id: b.contentId,
      hidden: !W,
      ...h,
      ref: E,
      style: {
        "--radix-collapsible-content-height": k ? `${k}px` : void 0,
        "--radix-collapsible-content-width": Q ? `${Q}px` : void 0,
        ...r.style
      },
      children: W && f
    }
  );
}, "CollapsibleContentImpl"));
function gu(i) {
  return i ? "open" : "closed";
}
jo(gu, "getState");
var kp = tx, ax = Op, ix = jp, ox = Object.defineProperty, rx = (i, r) => ox(i, "name", { value: r, configurable: !0 }), ux = S.createContext(void 0);
function Ai(i) {
  const r = S.useContext(ux);
  return i || r || "ltr";
}
rx(Ai, "useDirection");
var cx = Object.defineProperty, un = (i, r) => cx(i, "name", { value: r, configurable: !0 }), Gn = "Accordion", sx = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [pf, fx, dx] = /* @__PURE__ */ hu(Gn), [pu, $_] = /* @__PURE__ */ vl(Gn, [
  dx,
  Np
]), vf = Np(), hx = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ un(function(r, c) {
    const { type: u, ...d } = r, f = d, h = d;
    return /* @__PURE__ */ y.jsx(pf.Provider, { scope: r.__scopeAccordion, children: u === "multiple" ? /* @__PURE__ */ y.jsx(vx, { ...h, ref: c }) : /* @__PURE__ */ y.jsx(px, { ...f, ref: c }) });
  }, "Accordion")
), [Up, mx] = pu(Gn), [Lp, gx] = pu(
  Gn,
  { collapsible: !1 }
), px = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ un(function(r, c) {
    const {
      value: u,
      defaultValue: d,
      onValueChange: f = /* @__PURE__ */ un(() => {
      }, "onValueChange"),
      collapsible: h = !1,
      ...b
    } = r, [p, g] = bl({
      prop: u,
      defaultProp: d ?? "",
      onChange: f,
      caller: Gn
    });
    return /* @__PURE__ */ y.jsx(
      Up,
      {
        scope: r.__scopeAccordion,
        value: S.useMemo(() => p ? [p] : [], [p]),
        onItemOpen: g,
        onItemClose: S.useCallback(() => h && g(""), [h, g]),
        children: /* @__PURE__ */ y.jsx(Lp, { scope: r.__scopeAccordion, collapsible: h, children: /* @__PURE__ */ y.jsx(Hp, { ...b, ref: c }) })
      }
    );
  }, "AccordionImplSingle")
), vx = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ un(function(r, c) {
  const {
    value: u,
    defaultValue: d,
    onValueChange: f = /* @__PURE__ */ un(() => {
    }, "onValueChange"),
    ...h
  } = r, [b, p] = bl({
    prop: u,
    defaultProp: d ?? [],
    onChange: f,
    caller: Gn
  }), g = S.useCallback(
    (E) => p((M = []) => [...M, E]),
    [p]
  ), z = S.useCallback(
    (E) => p((M = []) => M.filter((k) => k !== E)),
    [p]
  );
  return /* @__PURE__ */ y.jsx(
    Up,
    {
      scope: r.__scopeAccordion,
      value: b,
      onItemOpen: g,
      onItemClose: z,
      children: /* @__PURE__ */ y.jsx(Lp, { scope: r.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ y.jsx(Hp, { ...h, ref: c }) })
    }
  );
}, "AccordionImplMultiple")), [bx, vu] = pu(Gn), Hp = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ un(function(r, c) {
    const { __scopeAccordion: u, disabled: d, dir: f, orientation: h = "vertical", ...b } = r, p = S.useRef(null), g = rt(p, c), z = fx(u), M = Ai(f) === "ltr", k = at(r.onKeyDown, (q) => {
      if (!sx.includes(q.key)) return;
      const Q = q.target, W = z().filter((ae) => !ae.ref.current?.disabled), $ = W.findIndex((ae) => ae.ref.current === Q), L = W.length;
      if ($ === -1) return;
      q.preventDefault();
      let J = $;
      const le = 0, me = L - 1, fe = /* @__PURE__ */ un(() => {
        J = $ + 1, J > me && (J = le);
      }, "moveNext"), ie = /* @__PURE__ */ un(() => {
        J = $ - 1, J < le && (J = me);
      }, "movePrev");
      switch (q.key) {
        case "Home":
          J = le;
          break;
        case "End":
          J = me;
          break;
        case "ArrowRight":
          h === "horizontal" && (M ? fe() : ie());
          break;
        case "ArrowDown":
          h === "vertical" && fe();
          break;
        case "ArrowLeft":
          h === "horizontal" && (M ? ie() : fe());
          break;
        case "ArrowUp":
          h === "vertical" && ie();
          break;
      }
      const P = J % L;
      W[P].ref.current?.focus();
    });
    return /* @__PURE__ */ y.jsx(
      bx,
      {
        scope: u,
        disabled: d,
        direction: f,
        orientation: h,
        children: /* @__PURE__ */ y.jsx(pf.Slot, { scope: u, children: /* @__PURE__ */ y.jsx(
          ut.div,
          {
            ...b,
            "data-orientation": h,
            ref: g,
            onKeyDown: d ? void 0 : k
          }
        ) })
      }
    );
  }, "AccordionImpl")
), Is = "AccordionItem", [yx, bf] = pu(Is), xx = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ un(function(r, c) {
    const { __scopeAccordion: u, value: d, ...f } = r, h = vu(Is, u), b = mx(Is, u), p = vf(u), g = mu(), z = d && b.value.includes(d) || !1, E = h.disabled || r.disabled;
    return /* @__PURE__ */ y.jsx(
      yx,
      {
        scope: u,
        open: z,
        disabled: E,
        triggerId: g,
        children: /* @__PURE__ */ y.jsx(
          kp,
          {
            "data-orientation": h.orientation,
            "data-state": yf(z),
            ...p,
            ...f,
            ref: c,
            disabled: E,
            open: z,
            onOpenChange: (M) => {
              M ? b.onItemOpen(d) : b.onItemClose(d);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), Sx = "AccordionHeader", _x = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ un(function(r, c) {
    const { __scopeAccordion: u, ...d } = r, f = vu(Gn, u), h = bf(Sx, u);
    return /* @__PURE__ */ y.jsx(
      ut.h3,
      {
        "data-orientation": f.orientation,
        "data-state": yf(h.open),
        "data-disabled": h.disabled ? "" : void 0,
        ...d,
        ref: c
      }
    );
  }, "AccordionHeader")
), wg = "AccordionTrigger", Ex = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ un(function(r, c) {
    const { __scopeAccordion: u, ...d } = r, f = vu(Gn, u), h = bf(wg, u), b = gx(wg, u), p = vf(u);
    return /* @__PURE__ */ y.jsx(pf.ItemSlot, { scope: u, children: /* @__PURE__ */ y.jsx(
      ax,
      {
        "aria-disabled": h.open && !b.collapsible || void 0,
        "data-orientation": f.orientation,
        id: h.triggerId,
        ...p,
        ...d,
        ref: c
      }
    ) });
  }, "AccordionTrigger")
), Ax = "AccordionContent", Cx = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ un(function(r, c) {
    const { __scopeAccordion: u, ...d } = r, f = vu(Gn, u), h = bf(Ax, u), b = vf(u);
    return /* @__PURE__ */ y.jsx(
      ix,
      {
        role: "region",
        "aria-labelledby": h.triggerId,
        "data-orientation": f.orientation,
        ...b,
        ...d,
        ref: c,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...r.style
        }
      }
    );
  }, "AccordionContent")
);
function yf(i) {
  return i ? "open" : "closed";
}
un(yf, "getState");
var Tx = hx, Mx = xx, zx = _x, wx = Ex, Rx = Cx, Nx = Object.defineProperty, Ox = (i, r) => Nx(i, "name", { value: r, configurable: !0 });
function ml(i) {
  const r = S.useRef(i);
  return S.useEffect(() => {
    r.current = i;
  }), S.useMemo(() => ((...c) => r.current?.(...c)), []);
}
Ox(ml, "useCallbackRef");
var Dx = Object.defineProperty, jx = (i, r) => Dx(i, "name", { value: r, configurable: !0 });
function Bp(i) {
  const [r, c] = S.useState(void 0);
  return gl(() => {
    if (i) {
      c({ width: i.offsetWidth, height: i.offsetHeight });
      const u = new ResizeObserver((d) => {
        if (!Array.isArray(d) || !d.length)
          return;
        const f = d[0];
        let h, b;
        if ("borderBoxSize" in f) {
          const p = f.borderBoxSize, g = Array.isArray(p) ? p[0] : p;
          h = g.inlineSize, b = g.blockSize;
        } else
          h = i.offsetWidth, b = i.offsetHeight;
        c({ width: h, height: b });
      });
      return u.observe(i, { box: "border-box" }), () => u.unobserve(i);
    } else
      c(void 0);
  }, [i]), r;
}
jx(Bp, "useSize");
var kx = Object.defineProperty, xf = (i, r) => kx(i, "name", { value: r, configurable: !0 }), Hs = !1;
function Gp() {
  const [i, r] = S.useState(Hs);
  return S.useEffect(() => {
    Hs || (Hs = !0, r(!0));
  }, []), i;
}
xf(Gp, "useIsHydrated");
var Vp = _i[" useSyncExternalStore ".trim().toString()];
function Yp() {
  return () => {
  };
}
xf(Yp, "subscribe");
function qp() {
  return Vp(
    Yp,
    () => !0,
    () => !1
  );
}
xf(qp, "useIsHydratedModern");
var Ux = typeof Vp == "function" ? qp : Gp, Lx = Object.defineProperty, Ma = (i, r) => Lx(i, "name", { value: r, configurable: !0 }), Bs = "rovingFocusGroup.onEntryFocus", Hx = { bubbles: !1, cancelable: !0 }, bu = "RovingFocusGroup", [ef, Xp, Bx] = /* @__PURE__ */ hu(bu), [Gx, Zp] = /* @__PURE__ */ vl(
  bu,
  [Bx]
), [Vx, Yx] = Gx(bu), qx = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ma(function(r, c) {
    return /* @__PURE__ */ y.jsx(ef.Provider, { scope: r.__scopeRovingFocusGroup, children: /* @__PURE__ */ y.jsx(ef.Slot, { scope: r.__scopeRovingFocusGroup, children: /* @__PURE__ */ y.jsx(Xx, { ...r, ref: c }) }) });
  }, "RovingFocusGroup")
), Xx = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ Ma(function(r, c) {
  const {
    __scopeRovingFocusGroup: u,
    orientation: d,
    loop: f = !1,
    dir: h,
    currentTabStopId: b,
    defaultCurrentTabStopId: p,
    onCurrentTabStopIdChange: g,
    onEntryFocus: z,
    preventScrollOnEntryFocus: E = !1,
    ...M
  } = r, k = S.useRef(null), q = rt(c, k), Q = Ai(h), [W, $] = bl({
    prop: b,
    defaultProp: p ?? null,
    onChange: g,
    caller: bu
  }), [L, J] = S.useState(!1), le = ml(z), me = Xp(u), fe = S.useRef(!1), [ie, P] = S.useState(0);
  return S.useEffect(() => {
    const ae = k.current;
    if (ae)
      return ae.addEventListener(Bs, le), () => ae.removeEventListener(Bs, le);
  }, [le]), /* @__PURE__ */ y.jsx(
    Vx,
    {
      scope: u,
      orientation: d,
      dir: Q,
      loop: f,
      currentTabStopId: W,
      onItemFocus: S.useCallback(
        (ae) => $(ae),
        [$]
      ),
      onItemShiftTab: S.useCallback(() => J(!0), []),
      onFocusableItemAdd: S.useCallback(
        () => P((ae) => ae + 1),
        []
      ),
      onFocusableItemRemove: S.useCallback(
        () => P((ae) => ae - 1),
        []
      ),
      children: /* @__PURE__ */ y.jsx(
        ut.div,
        {
          tabIndex: L || ie === 0 ? -1 : 0,
          "data-orientation": d,
          ...M,
          ref: q,
          style: { outline: "none", ...r.style },
          onMouseDown: at(r.onMouseDown, () => {
            fe.current = !0;
          }),
          onFocus: at(r.onFocus, (ae) => {
            const Se = !fe.current;
            if (ae.target === ae.currentTarget && Se && !L) {
              const Ae = new CustomEvent(Bs, Hx);
              if (ae.currentTarget.dispatchEvent(Ae), !Ae.defaultPrevented) {
                const we = me().filter((X) => X.focusable), We = we.find((X) => X.active), Fe = we.find((X) => X.id === W), D = [We, Fe, ...we].filter(
                  Boolean
                ).map((X) => X.ref.current);
                Sf(D, E);
              }
            }
            fe.current = !1;
          }),
          onBlur: at(r.onBlur, () => J(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), Zx = "RovingFocusGroupItem", Qx = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ma(function(r, c) {
    const {
      __scopeRovingFocusGroup: u,
      focusable: d = !0,
      active: f = !1,
      tabStopId: h,
      children: b,
      ...p
    } = r, g = mu(), z = h || g, E = Yx(Zx, u), M = E.currentTabStopId === z, k = Xp(u), { onFocusableItemAdd: q, onFocusableItemRemove: Q, currentTabStopId: W } = E, $ = Ux();
    return gl(() => {
      if (!(!$ || !d))
        return q(), () => Q();
    }, [$, d, q, Q]), S.useEffect(() => {
      if (!($ || !d))
        return q(), () => Q();
    }, [$, d, q, Q]), /* @__PURE__ */ y.jsx(
      ef.ItemSlot,
      {
        scope: u,
        id: z,
        focusable: d,
        active: f,
        children: /* @__PURE__ */ y.jsx(
          ut.span,
          {
            tabIndex: M ? 0 : -1,
            "data-orientation": E.orientation,
            ...p,
            ref: c,
            onMouseDown: at(r.onMouseDown, (L) => {
              d ? E.onItemFocus(z) : L.preventDefault();
            }),
            onFocus: at(r.onFocus, () => E.onItemFocus(z)),
            onKeyDown: at(r.onKeyDown, (L) => {
              if (L.key === "Tab" && L.shiftKey) {
                E.onItemShiftTab();
                return;
              }
              if (L.target !== L.currentTarget) return;
              const J = Kp(L, E.orientation, E.dir);
              if (J !== void 0) {
                if (L.metaKey || L.ctrlKey || L.altKey || L.shiftKey) return;
                L.preventDefault();
                let me = k().filter((fe) => fe.focusable).map((fe) => fe.ref.current);
                if (J === "last") me.reverse();
                else if (J === "prev" || J === "next") {
                  J === "prev" && me.reverse();
                  const fe = me.indexOf(L.currentTarget);
                  me = E.loop ? Jp(me, fe + 1) : me.slice(fe + 1);
                }
                setTimeout(() => Sf(me));
              }
            }),
            children: typeof b == "function" ? b({ isCurrentTabStop: M, hasTabStop: W != null }) : b
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), Kx = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Qp(i, r) {
  return r !== "rtl" ? i : i === "ArrowLeft" ? "ArrowRight" : i === "ArrowRight" ? "ArrowLeft" : i;
}
Ma(Qp, "getDirectionAwareKey");
function Kp(i, r, c) {
  const u = Qp(i.key, c);
  if (!(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(u)) && !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(u)))
    return Kx[u];
}
Ma(Kp, "getFocusIntent");
function Sf(i, r = !1) {
  const c = document.activeElement;
  for (const u of i)
    if (u === c || (u.focus({ preventScroll: r }), document.activeElement !== c)) return;
}
Ma(Sf, "focusFirst");
function Jp(i, r) {
  return i.map((c, u) => i[(r + u) % i.length]);
}
Ma(Jp, "wrapArray");
var Jx = qx, $x = Qx, Px = Object.defineProperty, Wx = (i, r) => Px(i, "name", { value: r, configurable: !0 }), Fx = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Wx(function(r, c) {
    return /* @__PURE__ */ y.jsx(
      ut.label,
      {
        ...r,
        ref: c,
        onMouseDown: (u) => {
          u.target.closest("button, input, select, textarea") || (r.onMouseDown?.(u), !u.defaultPrevented && u.detail > 1 && u.preventDefault());
        }
      }
    );
  }, "Label")
), Ix = Fx, eS = Object.defineProperty, tS = (i, r) => eS(i, "name", { value: r, configurable: !0 });
function $p(i) {
  const r = S.useRef({ value: i, previous: i });
  return S.useMemo(() => (r.current.value !== i && (r.current.previous = r.current.value, r.current.value = i), r.current.previous), [i]);
}
tS($p, "usePrevious");
var nS = Object.defineProperty, lS = (i, r) => nS(i, "name", { value: r, configurable: !0 });
function yu(i, [r, c]) {
  return Math.min(c, Math.max(r, i));
}
lS(yu, "clamp");
var aS = Object.defineProperty, je = (i, r) => aS(i, "name", { value: r, configurable: !0 });
function Pp(i, r) {
  return S.useReducer((c, u) => r[c][u] ?? c, i);
}
je(Pp, "useStateMachine");
var Wp = "ScrollArea", [Fp, P_] = /* @__PURE__ */ vl(Wp), [iS, Sn] = Fp(Wp), oS = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ je(function(r, c) {
    const {
      __scopeScrollArea: u,
      type: d = "hover",
      dir: f,
      scrollHideDelay: h = 600,
      ...b
    } = r, [p, g] = S.useState(null), [z, E] = S.useState(null), [M, k] = S.useState(null), [q, Q] = S.useState(null), [W, $] = S.useState(null), [L, J] = S.useState(0), [le, me] = S.useState(0), [fe, ie] = S.useState(!1), [P, ae] = S.useState(!1), Se = rt(c, g), Ae = Ai(f);
    return /* @__PURE__ */ y.jsx(
      iS,
      {
        scope: u,
        type: d,
        dir: Ae,
        scrollHideDelay: h,
        scrollArea: p,
        viewport: z,
        onViewportChange: E,
        content: M,
        onContentChange: k,
        scrollbarX: q,
        onScrollbarXChange: Q,
        scrollbarXEnabled: fe,
        onScrollbarXEnabledChange: ie,
        scrollbarY: W,
        onScrollbarYChange: $,
        scrollbarYEnabled: P,
        onScrollbarYEnabledChange: ae,
        onCornerWidthChange: J,
        onCornerHeightChange: me,
        children: /* @__PURE__ */ y.jsx(
          ut.div,
          {
            dir: Ae,
            ...b,
            ref: Se,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": L + "px",
              "--radix-scroll-area-corner-height": le + "px",
              ...r.style
            }
          }
        )
      }
    );
  }, "ScrollArea")
), rS = "ScrollAreaViewport", uS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ je(function(r, c) {
    const { __scopeScrollArea: u, children: d, nonce: f, ...h } = r, b = Sn(rS, u), p = S.useRef(null), g = rt(c, p, b.onViewportChange);
    return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(cS, { nonce: f }),
      /* @__PURE__ */ y.jsx(
        ut.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...h,
          ref: g,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: b.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: b.scrollbarYEnabled ? "scroll" : "hidden",
            ...r.style
          },
          children: /* @__PURE__ */ y.jsx("div", { ref: b.onContentChange, style: { minWidth: "100%", display: "table" }, children: d })
        }
      )
    ] });
  }, "ScrollAreaViewport")
), cS = /* @__PURE__ */ S.memo(
  /* @__PURE__ */ je(function({ nonce: r }) {
    return /* @__PURE__ */ y.jsx(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
        },
        nonce: r
      }
    );
  }, "ScrollAreaViewportStyle"),
  (i, r) => i.nonce === r.nonce
), yl = "ScrollAreaScrollbar", sS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ je(function(r, c) {
    const { forceMount: u, ...d } = r, f = Sn(yl, r.__scopeScrollArea), { onScrollbarXEnabledChange: h, onScrollbarYEnabledChange: b } = f, p = r.orientation === "horizontal";
    return S.useEffect(() => (p ? h(!0) : b(!0), () => {
      p ? h(!1) : b(!1);
    }), [p, h, b]), f.type === "hover" ? /* @__PURE__ */ y.jsx(fS, { ...d, ref: c, forceMount: u }) : f.type === "scroll" ? /* @__PURE__ */ y.jsx(dS, { ...d, ref: c, forceMount: u }) : f.type === "auto" ? /* @__PURE__ */ y.jsx(Ip, { ...d, ref: c, forceMount: u }) : f.type === "always" ? /* @__PURE__ */ y.jsx(_f, { ...d, ref: c, "data-state": "visible" }) : null;
  }, "ScrollAreaScrollbar")
), fS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const { forceMount: u, ...d } = r, f = Sn(yl, r.__scopeScrollArea), [h, b] = S.useState(!1);
  return S.useEffect(() => {
    const p = f.scrollArea;
    let g = 0;
    if (p) {
      const z = /* @__PURE__ */ je(() => {
        window.clearTimeout(g), b(!0);
      }, "handlePointerEnter"), E = /* @__PURE__ */ je(() => {
        g = window.setTimeout(() => b(!1), f.scrollHideDelay);
      }, "handlePointerLeave");
      return p.addEventListener("pointerenter", z), p.addEventListener("pointerleave", E), () => {
        window.clearTimeout(g), p.removeEventListener("pointerenter", z), p.removeEventListener("pointerleave", E);
      };
    }
  }, [f.scrollArea, f.scrollHideDelay]), /* @__PURE__ */ y.jsx(Do, { present: u || h, children: /* @__PURE__ */ y.jsx(
    Ip,
    {
      "data-state": h ? "visible" : "hidden",
      ...d,
      ref: c
    }
  ) });
}, "ScrollAreaScrollbarHover")), dS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const { forceMount: u, ...d } = r, f = Sn(yl, r.__scopeScrollArea), h = r.orientation === "horizontal", b = Uo(() => g("SCROLL_END"), 100), [p, g] = Pp("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return S.useEffect(() => {
    if (p === "idle") {
      const z = window.setTimeout(() => g("HIDE"), f.scrollHideDelay);
      return () => window.clearTimeout(z);
    }
  }, [p, f.scrollHideDelay, g]), S.useEffect(() => {
    const z = f.viewport, E = h ? "scrollLeft" : "scrollTop";
    if (z) {
      let M = z[E];
      const k = /* @__PURE__ */ je(() => {
        const q = z[E];
        M !== q && (g("SCROLL"), b()), M = q;
      }, "handleScroll");
      return z.addEventListener("scroll", k), () => z.removeEventListener("scroll", k);
    }
  }, [f.viewport, h, g, b]), /* @__PURE__ */ y.jsx(Do, { present: u || p !== "hidden", children: /* @__PURE__ */ y.jsx(
    _f,
    {
      "data-state": p === "hidden" ? "hidden" : "visible",
      ...d,
      ref: c,
      onPointerEnter: at(r.onPointerEnter, () => g("POINTER_ENTER")),
      onPointerLeave: at(r.onPointerLeave, () => g("POINTER_LEAVE"))
    }
  ) });
}, "ScrollAreaScrollbarScroll")), Ip = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const u = Sn(yl, r.__scopeScrollArea), { forceMount: d, ...f } = r, [h, b] = S.useState(!1), p = r.orientation === "horizontal", g = Uo(() => {
    if (u.viewport) {
      const z = u.viewport.offsetWidth < u.viewport.scrollWidth, E = u.viewport.offsetHeight < u.viewport.scrollHeight;
      b(p ? z : E);
    }
  }, 10);
  return Ca(u.viewport, g), Ca(u.content, g), /* @__PURE__ */ y.jsx(Do, { present: d || h, children: /* @__PURE__ */ y.jsx(
    _f,
    {
      "data-state": h ? "visible" : "hidden",
      ...f,
      ref: c
    }
  ) });
}, "ScrollAreaScrollbarAuto")), _f = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const { orientation: u = "vertical", ...d } = r, f = Sn(yl, r.__scopeScrollArea), h = S.useRef(null), b = S.useRef(0), [p, g] = S.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), z = Ef(p.viewport, p.content), E = {
    ...d,
    sizes: p,
    onSizesChange: g,
    hasThumb: z > 0 && z < 1,
    onThumbChange: /* @__PURE__ */ je((k) => h.current = k, "onThumbChange"),
    onThumbPointerUp: /* @__PURE__ */ je(() => b.current = 0, "onThumbPointerUp"),
    onThumbPointerDown: /* @__PURE__ */ je((k) => b.current = k, "onThumbPointerDown")
  };
  function M(k, q) {
    return lv(k, b.current, p, q);
  }
  return je(M, "getScrollPosition"), u === "horizontal" ? /* @__PURE__ */ y.jsx(
    hS,
    {
      ...E,
      ref: c,
      onThumbPositionChange: () => {
        if (f.viewport && h.current) {
          const k = f.viewport.scrollLeft, q = nf(k, p, f.dir);
          h.current.style.transform = `translate3d(${q}px, 0, 0)`;
        }
      },
      onWheelScroll: (k) => {
        f.viewport && (f.viewport.scrollLeft = k);
      },
      onDragScroll: (k) => {
        f.viewport && (f.viewport.scrollLeft = M(k, f.dir));
      }
    }
  ) : u === "vertical" ? /* @__PURE__ */ y.jsx(
    mS,
    {
      ...E,
      ref: c,
      onThumbPositionChange: () => {
        if (f.viewport && h.current) {
          const k = f.viewport.scrollTop, q = nf(k, p);
          h.current.style.transform = `translate3d(0, ${q}px, 0)`;
        }
      },
      onWheelScroll: (k) => {
        f.viewport && (f.viewport.scrollTop = k);
      },
      onDragScroll: (k) => {
        f.viewport && (f.viewport.scrollTop = M(k));
      }
    }
  ) : null;
}, "ScrollAreaScrollbarVisible")), hS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const { sizes: u, onSizesChange: d, ...f } = r, h = Sn(yl, r.__scopeScrollArea), [b, p] = S.useState(), g = S.useRef(null), z = rt(c, g, h.onScrollbarXChange);
  return S.useEffect(() => {
    g.current && p(getComputedStyle(g.current));
  }, [g]), /* @__PURE__ */ y.jsx(
    tv,
    {
      "data-orientation": "horizontal",
      ...f,
      ref: z,
      sizes: u,
      style: {
        bottom: 0,
        left: h.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: h.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": ko(u) + "px",
        ...r.style
      },
      onThumbPointerDown: (E) => r.onThumbPointerDown(E.x),
      onDragScroll: (E) => r.onDragScroll(E.x),
      onWheelScroll: (E, M) => {
        if (h.viewport) {
          const k = h.viewport.scrollLeft + E.deltaX;
          r.onWheelScroll(k), Cf(k, M) && E.preventDefault();
        }
      },
      onResize: () => {
        g.current && h.viewport && b && d({
          content: h.viewport.scrollWidth,
          viewport: h.viewport.offsetWidth,
          scrollbar: {
            size: g.current.clientWidth,
            paddingStart: Ro(b.paddingLeft),
            paddingEnd: Ro(b.paddingRight)
          }
        });
      }
    }
  );
}, "ScrollAreaScrollbarX")), mS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const { sizes: u, onSizesChange: d, ...f } = r, h = Sn(yl, r.__scopeScrollArea), [b, p] = S.useState(), g = S.useRef(null), z = rt(c, g, h.onScrollbarYChange);
  return S.useEffect(() => {
    g.current && p(getComputedStyle(g.current));
  }, [g]), /* @__PURE__ */ y.jsx(
    tv,
    {
      "data-orientation": "vertical",
      ...f,
      ref: z,
      sizes: u,
      style: {
        top: 0,
        right: h.dir === "ltr" ? 0 : void 0,
        left: h.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": ko(u) + "px",
        ...r.style
      },
      onThumbPointerDown: (E) => r.onThumbPointerDown(E.y),
      onDragScroll: (E) => r.onDragScroll(E.y),
      onWheelScroll: (E, M) => {
        if (h.viewport) {
          const k = h.viewport.scrollTop + E.deltaY;
          r.onWheelScroll(k), Cf(k, M) && E.preventDefault();
        }
      },
      onResize: () => {
        g.current && h.viewport && b && d({
          content: h.viewport.scrollHeight,
          viewport: h.viewport.offsetHeight,
          scrollbar: {
            size: g.current.clientHeight,
            paddingStart: Ro(b.paddingTop),
            paddingEnd: Ro(b.paddingBottom)
          }
        });
      }
    }
  );
}, "ScrollAreaScrollbarY")), [gS, ev] = Fp(yl), tv = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const {
    __scopeScrollArea: u,
    sizes: d,
    hasThumb: f,
    onThumbChange: h,
    onThumbPointerUp: b,
    onThumbPointerDown: p,
    onThumbPositionChange: g,
    onDragScroll: z,
    onWheelScroll: E,
    onResize: M,
    ...k
  } = r, q = Sn(yl, u), [Q, W] = S.useState(null), $ = rt(c, W), L = S.useRef(null), J = S.useRef(""), le = q.viewport, me = d.content - d.viewport, fe = ml(E), ie = ml(g), P = Uo(M, 10);
  function ae(Se) {
    if (L.current) {
      const Ae = Se.clientX - L.current.left, we = Se.clientY - L.current.top;
      z({ x: Ae, y: we });
    }
  }
  return je(ae, "handleDragScroll"), S.useEffect(() => {
    const Se = /* @__PURE__ */ je((Ae) => {
      const we = Ae.target;
      Q?.contains(we) && fe(Ae, me);
    }, "handleWheel");
    return document.addEventListener("wheel", Se, { passive: !1 }), () => document.removeEventListener("wheel", Se, { passive: !1 });
  }, [le, Q, me, fe]), S.useEffect(ie, [d, ie]), Ca(Q, P), Ca(q.content, P), /* @__PURE__ */ y.jsx(
    gS,
    {
      scope: u,
      scrollbar: Q,
      hasThumb: f,
      onThumbChange: ml(h),
      onThumbPointerUp: ml(b),
      onThumbPositionChange: ie,
      onThumbPointerDown: ml(p),
      children: /* @__PURE__ */ y.jsx(
        ut.div,
        {
          ...k,
          ref: $,
          style: { position: "absolute", ...k.style },
          onPointerDown: at(r.onPointerDown, (Se) => {
            Se.button === 0 && (Se.target.setPointerCapture(Se.pointerId), L.current = Q.getBoundingClientRect(), J.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", q.viewport && (q.viewport.style.scrollBehavior = "auto"), ae(Se));
          }),
          onPointerMove: at(r.onPointerMove, ae),
          onPointerUp: at(r.onPointerUp, (Se) => {
            const Ae = Se.target;
            Ae.hasPointerCapture(Se.pointerId) && Ae.releasePointerCapture(Se.pointerId), document.body.style.webkitUserSelect = J.current, q.viewport && (q.viewport.style.scrollBehavior = ""), L.current = null;
          })
        }
      )
    }
  );
}, "ScrollAreaScrollbarImpl")), tf = "ScrollAreaThumb", pS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ je(function(r, c) {
    const { forceMount: u, ...d } = r, f = ev(tf, r.__scopeScrollArea);
    return /* @__PURE__ */ y.jsx(Do, { present: u || f.hasThumb, children: /* @__PURE__ */ y.jsx(vS, { ref: c, ...d }) });
  }, "ScrollAreaThumb")
), vS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ je(function(r, c) {
    const { __scopeScrollArea: u, style: d, ...f } = r, h = Sn(tf, u), b = ev(tf, u), { onThumbPositionChange: p } = b, g = rt(c, b.onThumbChange), z = S.useRef(void 0), E = Uo(() => {
      z.current && (z.current(), z.current = void 0);
    }, 100);
    return S.useEffect(() => {
      const M = h.viewport;
      if (M) {
        const k = /* @__PURE__ */ je(() => {
          if (E(), !z.current) {
            const q = xS(M, p);
            z.current = q, p();
          }
        }, "handleScroll");
        return p(), M.addEventListener("scroll", k), () => M.removeEventListener("scroll", k);
      }
    }, [h.viewport, E, p]), /* @__PURE__ */ y.jsx(
      ut.div,
      {
        "data-state": b.hasThumb ? "visible" : "hidden",
        ...f,
        ref: g,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...d
        },
        onPointerDownCapture: at(r.onPointerDownCapture, (M) => {
          const q = M.target.getBoundingClientRect(), Q = M.clientX - q.left, W = M.clientY - q.top;
          b.onThumbPointerDown({ x: Q, y: W });
        }),
        onPointerUp: at(r.onPointerUp, b.onThumbPointerUp)
      }
    );
  }, "ScrollAreaThumbImpl")
), nv = "ScrollAreaCorner", bS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ je(function(r, c) {
    const u = Sn(nv, r.__scopeScrollArea), d = !!(u.scrollbarX && u.scrollbarY);
    return u.type !== "scroll" && d ? /* @__PURE__ */ y.jsx(yS, { ...r, ref: c }) : null;
  }, "ScrollAreaCorner")
), yS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ je(function(r, c) {
  const { __scopeScrollArea: u, ...d } = r, f = Sn(nv, u), [h, b] = S.useState(0), [p, g] = S.useState(0), z = !!(h && p), { onCornerWidthChange: E, onCornerHeightChange: M } = f;
  return Ca(f.scrollbarX, () => {
    const k = f.scrollbarX?.offsetHeight || 0;
    f.onCornerHeightChange(k), g(k);
  }), Ca(f.scrollbarY, () => {
    const k = f.scrollbarY?.offsetWidth || 0;
    f.onCornerWidthChange(k), b(k);
  }), S.useEffect(() => () => {
    E(0), M(0);
  }, [E, M]), z ? /* @__PURE__ */ y.jsx(
    ut.div,
    {
      ...d,
      ref: c,
      style: {
        width: h,
        height: p,
        position: "absolute",
        right: f.dir === "ltr" ? 0 : void 0,
        left: f.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...r.style
      }
    }
  ) : null;
}, "ScrollAreaCornerImpl"));
function Ro(i) {
  return i ? parseInt(i, 10) : 0;
}
je(Ro, "toInt");
function Ef(i, r) {
  const c = i / r;
  return isNaN(c) ? 0 : c;
}
je(Ef, "getThumbRatio");
function ko(i) {
  const r = Ef(i.viewport, i.content), c = i.scrollbar.paddingStart + i.scrollbar.paddingEnd, u = (i.scrollbar.size - c) * r;
  return Math.max(u, 18);
}
je(ko, "getThumbSize");
function lv(i, r, c, u = "ltr") {
  const d = ko(c), f = d / 2, h = r || f, b = d - h, p = c.scrollbar.paddingStart + h, g = c.scrollbar.size - c.scrollbar.paddingEnd - b, z = c.content - c.viewport, E = u === "ltr" ? [0, z] : [z * -1, 0];
  return Af([p, g], E)(i);
}
je(lv, "getScrollPositionFromPointer");
function nf(i, r, c = "ltr") {
  const u = ko(r), d = r.scrollbar.paddingStart + r.scrollbar.paddingEnd, f = r.scrollbar.size - d, h = r.content - r.viewport, b = f - u, p = c === "ltr" ? [0, h] : [h * -1, 0], g = yu(i, p);
  return Af([0, h], [0, b])(g);
}
je(nf, "getThumbOffsetFromScroll");
function Af(i, r) {
  return (c) => {
    if (i[0] === i[1] || r[0] === r[1]) return r[0];
    const u = (r[1] - r[0]) / (i[1] - i[0]);
    return r[0] + u * (c - i[0]);
  };
}
je(Af, "linearScale");
function Cf(i, r) {
  return i > 0 && i < r;
}
je(Cf, "isScrollingWithinScrollbarBounds");
var xS = /* @__PURE__ */ je((i, r = () => {
}) => {
  let c = { left: i.scrollLeft, top: i.scrollTop }, u = 0;
  return (/* @__PURE__ */ je((function d() {
    const f = { left: i.scrollLeft, top: i.scrollTop }, h = c.left !== f.left, b = c.top !== f.top;
    (h || b) && r(), c = f, u = window.requestAnimationFrame(d);
  }), "loop"))(), () => window.cancelAnimationFrame(u);
}, "addUnlinkedScrollListener");
function Uo(i, r) {
  const c = ml(i), u = S.useRef(0);
  return S.useEffect(() => () => window.clearTimeout(u.current), []), S.useCallback(() => {
    window.clearTimeout(u.current), u.current = window.setTimeout(c, r);
  }, [c, r]);
}
je(Uo, "useDebounceCallback");
function Ca(i, r) {
  const c = ml(r);
  gl(() => {
    let u = 0;
    if (i) {
      const d = new ResizeObserver(() => {
        cancelAnimationFrame(u), u = window.requestAnimationFrame(c);
      });
      return d.observe(i), () => {
        window.cancelAnimationFrame(u), d.unobserve(i);
      };
    }
  }, [i, c]);
}
je(Ca, "useResizeObserver");
var SS = oS, _S = uS, ES = bS, AS = Object.defineProperty, av = (i, r) => AS(i, "name", { value: r, configurable: !0 }), Rg = "horizontal", CS = ["horizontal", "vertical"], TS = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ av(function(r, c) {
    const { decorative: u, orientation: d = Rg, ...f } = r, h = iv(d) ? d : Rg, p = u ? { role: "none" } : { "aria-orientation": h === "vertical" ? h : void 0, role: "separator" };
    return /* @__PURE__ */ y.jsx(
      ut.div,
      {
        "data-orientation": h,
        ...p,
        ...f,
        ref: c
      }
    );
  }, "Separator")
);
function iv(i) {
  return CS.includes(i);
}
av(iv, "isValidOrientation");
var MS = TS, zS = Object.defineProperty, Ye = (i, r) => zS(i, "name", { value: r, configurable: !0 }), ov = ["PageUp", "PageDown"], rv = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], uv = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, Lo = "Slider", [lf, wS, RS] = /* @__PURE__ */ hu(Lo), [Tf, W_] = /* @__PURE__ */ vl(Lo, [
  RS
]), [NS, Ho] = Tf(Lo), OS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ye(function(r, c) {
    const {
      name: u,
      min: d = 0,
      max: f = 100,
      step: h = 1,
      orientation: b = "horizontal",
      disabled: p = !1,
      minStepsBetweenThumbs: g = 0,
      defaultValue: z = [d],
      value: E,
      onValueChange: M = /* @__PURE__ */ Ye(() => {
      }, "onValueChange"),
      onValueCommit: k = /* @__PURE__ */ Ye(() => {
      }, "onValueCommit"),
      inverted: q = !1,
      form: Q,
      ...W
    } = r, $ = S.useRef(/* @__PURE__ */ new Set()), L = S.useRef(0), J = S.useRef(!1), me = b === "horizontal" ? DS : jS, [fe, ie] = S.useState(null), P = rt(c, ie), [ae = [], Se] = bl({
      prop: E,
      defaultProp: z,
      onChange: /* @__PURE__ */ Ye((X) => {
        [...$.current][L.current]?.focus({
          preventScroll: !0,
          focusVisible: J.current
        }), J.current = !1, M(X);
      }, "onChange")
    }), Ae = S.useRef(ae), we = S.useRef(ae);
    S.useEffect(() => {
      const X = Q ? fe?.ownerDocument.getElementById(Q) : fe?.closest("form");
      if (X instanceof HTMLFormElement) {
        const ce = /* @__PURE__ */ Ye(() => Se(we.current), "reset");
        return X.addEventListener("reset", ce), () => X.removeEventListener("reset", ce);
      }
    }, [fe, Q, Se]);
    function We(X) {
      const ce = pv(ae, X);
      D(X, ce);
    }
    Ye(We, "handleSlideStart");
    function Fe(X) {
      D(X, L.current);
    }
    Ye(Fe, "handleSlideMove");
    function Xe() {
      String(ae) !== String(Ae.current) && k(ae);
    }
    Ye(Xe, "handleSlideEnd");
    function D(X, ce, { commit: Re } = { commit: !1 }) {
      const ne = zf(h), C = Ao(Math.round((X - d) / h) * h + d, ne), V = yu(C, [d, f]);
      Se((ee = []) => {
        const F = mv(ee, V, ce);
        if (yv(F, g * h)) {
          L.current = F.indexOf(V);
          const oe = String(F) !== String(ee);
          return oe && Re && k(F), oe ? F : ee;
        } else
          return ee;
      });
    }
    return Ye(D, "updateValues"), /* @__PURE__ */ y.jsx(
      NS,
      {
        scope: r.__scopeSlider,
        name: u,
        disabled: p,
        min: d,
        max: f,
        valueIndexToChangeRef: L,
        thumbs: $.current,
        values: ae,
        orientation: b,
        form: Q,
        children: /* @__PURE__ */ y.jsx(lf.Provider, { scope: r.__scopeSlider, children: /* @__PURE__ */ y.jsx(lf.Slot, { scope: r.__scopeSlider, children: /* @__PURE__ */ y.jsx(
          me,
          {
            "aria-disabled": p,
            "data-disabled": p ? "" : void 0,
            ...W,
            ref: P,
            onPointerDown: at(W.onPointerDown, () => {
              p || (Ae.current = ae, J.current = !1);
            }),
            min: d,
            max: f,
            inverted: q,
            onSlideStart: p ? void 0 : We,
            onSlideMove: p ? void 0 : Fe,
            onSlideEnd: p ? void 0 : Xe,
            onHomeKeyDown: () => {
              p || (J.current = !0, D(d, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              p || (J.current = !0, D(f, ae.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: X, direction: ce }) => {
              if (!p) {
                J.current = !0;
                const C = ov.includes(X.key) || X.shiftKey && rv.includes(X.key) ? 10 : 1, V = L.current, ee = ae[V], F = xv(ee, {
                  min: d,
                  step: h,
                  direction: ce,
                  multiplier: C
                });
                D(F, V, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [cv, sv] = Tf(Lo, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), DS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ye(function(r, c) {
    const {
      min: u,
      max: d,
      dir: f,
      inverted: h,
      onSlideStart: b,
      onSlideMove: p,
      onSlideEnd: g,
      onStepKeyDown: z,
      ...E
    } = r, [M, k] = S.useState(null), q = rt(c, k), Q = S.useRef(void 0), W = Ai(f), $ = W === "ltr", L = $ && !h || !$ && h;
    function J(le) {
      const me = Q.current || M.getBoundingClientRect(), fe = [0, me.width], P = xu(fe, L ? [u, d] : [d, u]);
      return Q.current = me, P(le - me.left);
    }
    return Ye(J, "getValueFromPointer"), /* @__PURE__ */ y.jsx(
      cv,
      {
        scope: r.__scopeSlider,
        startEdge: L ? "left" : "right",
        endEdge: L ? "right" : "left",
        direction: L ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ y.jsx(
          fv,
          {
            dir: W,
            "data-orientation": "horizontal",
            ...E,
            ref: q,
            style: {
              ...E.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (le) => {
              const me = J(le.clientX);
              b?.(me);
            },
            onSlideMove: (le) => {
              const me = J(le.clientX);
              p?.(me);
            },
            onSlideEnd: () => {
              Q.current = void 0, g?.();
            },
            onStepKeyDown: (le) => {
              const fe = uv[L ? "from-left" : "from-right"].includes(le.key);
              z?.({ event: le, direction: fe ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), jS = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Ye(function(r, c) {
    const {
      min: u,
      max: d,
      inverted: f,
      onSlideStart: h,
      onSlideMove: b,
      onSlideEnd: p,
      onStepKeyDown: g,
      ...z
    } = r, E = S.useRef(null), M = rt(c, E), k = S.useRef(void 0), q = !f;
    function Q(W) {
      const $ = k.current || E.current.getBoundingClientRect(), L = [0, $.height], le = xu(L, q ? [d, u] : [u, d]);
      return k.current = $, le(W - $.top);
    }
    return Ye(Q, "getValueFromPointer"), /* @__PURE__ */ y.jsx(
      cv,
      {
        scope: r.__scopeSlider,
        startEdge: q ? "bottom" : "top",
        endEdge: q ? "top" : "bottom",
        size: "height",
        direction: q ? 1 : -1,
        children: /* @__PURE__ */ y.jsx(
          fv,
          {
            "data-orientation": "vertical",
            ...z,
            ref: M,
            style: {
              ...z.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (W) => {
              const $ = Q(W.clientY);
              h?.($);
            },
            onSlideMove: (W) => {
              const $ = Q(W.clientY);
              b?.($);
            },
            onSlideEnd: () => {
              k.current = void 0, p?.();
            },
            onStepKeyDown: (W) => {
              const L = uv[q ? "from-bottom" : "from-top"].includes(W.key);
              g?.({ event: W, direction: L ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), fv = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Ye(function(r, c) {
    const {
      __scopeSlider: u,
      onSlideStart: d,
      onSlideMove: f,
      onSlideEnd: h,
      onHomeKeyDown: b,
      onEndKeyDown: p,
      onStepKeyDown: g,
      ...z
    } = r, E = Ho(Lo, u);
    return /* @__PURE__ */ y.jsx(
      ut.span,
      {
        ...z,
        ref: c,
        onKeyDown: at(r.onKeyDown, (M) => {
          M.key === "Home" ? (b(M), M.preventDefault()) : M.key === "End" ? (p(M), M.preventDefault()) : ov.concat(rv).includes(M.key) && (g(M), M.preventDefault());
        }),
        onPointerDown: at(r.onPointerDown, (M) => {
          const k = M.target;
          k.setPointerCapture(M.pointerId), M.preventDefault(), E.thumbs.has(k) ? k.focus({ preventScroll: !0, focusVisible: !1 }) : d(M);
        }),
        onPointerMove: at(r.onPointerMove, (M) => {
          M.target.hasPointerCapture(M.pointerId) && f(M);
        }),
        onPointerUp: at(r.onPointerUp, (M) => {
          const k = M.target;
          k.hasPointerCapture(M.pointerId) && (k.releasePointerCapture(M.pointerId), h(M));
        })
      }
    );
  }, "SliderImpl")
), kS = "SliderTrack", US = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Ye(function(r, c) {
    const { __scopeSlider: u, ...d } = r, f = Ho(kS, u);
    return /* @__PURE__ */ y.jsx(
      ut.span,
      {
        "data-disabled": f.disabled ? "" : void 0,
        "data-orientation": f.orientation,
        ...d,
        ref: c
      }
    );
  }, "SliderTrack")
), Ng = "SliderRange", LS = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Ye(function(r, c) {
    const { __scopeSlider: u, ...d } = r, f = Ho(Ng, u), h = sv(Ng, u), b = S.useRef(null), p = rt(c, b), g = f.values.length, z = f.values.map(
      (k) => Mf(k, f.min, f.max)
    ), E = g > 1 ? Math.min(...z) : 0, M = 100 - Math.max(...z);
    return /* @__PURE__ */ y.jsx(
      ut.span,
      {
        "data-orientation": f.orientation,
        "data-disabled": f.disabled ? "" : void 0,
        ...d,
        ref: p,
        style: {
          ...r.style,
          [h.startEdge]: E + "%",
          [h.endEdge]: M + "%"
        }
      }
    );
  }, "SliderRange")
), HS = "SliderThumb", [BS, dv] = Tf(HS), GS = "SliderThumbProvider";
function hv(i) {
  const {
    __scopeSlider: r,
    name: c,
    children: u,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: d
  } = i, f = Ho(GS, r), h = wS(r), [b, p] = S.useState(null), g = S.useMemo(
    () => b ? h().findIndex((W) => W.ref.current === b) : -1,
    [h, b]
  ), z = Bp(b), E = b ? !!f.form || !!b.closest("form") : !0, M = f.values[g], k = c ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), q = M === void 0 ? 0 : Mf(M, f.min, f.max);
  S.useEffect(() => {
    if (b)
      return f.thumbs.add(b), () => {
        f.thumbs.delete(b);
      };
  }, [b, f.thumbs]);
  const Q = {
    value: M,
    name: k,
    form: f.form,
    isFormControl: E,
    index: g,
    thumb: b,
    onThumbChange: p,
    percent: q,
    size: z
  };
  return /* @__PURE__ */ y.jsx(BS, { scope: r, ...Q, children: Sv(d) ? d(Q) : u });
}
Ye(hv, "SliderThumbProvider");
var Gs = "SliderThumbTrigger", VS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ye(function(r, c) {
    const { __scopeSlider: u, ...d } = r, f = Ho(Gs, u), h = sv(Gs, u), { index: b, value: p, percent: g, size: z, onThumbChange: E } = dv(
      Gs,
      u
    ), M = rt(c, E), k = gv(b, f.values.length), q = z?.[h.size], Q = q ? vv(q, g, h.direction) : 0;
    return /* @__PURE__ */ y.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [h.startEdge]: `calc(${g}% + ${Q}px)`
        },
        children: /* @__PURE__ */ y.jsx(lf.ItemSlot, { scope: u, children: /* @__PURE__ */ y.jsx(
          ut.span,
          {
            role: "slider",
            "aria-label": r["aria-label"] || k,
            "aria-valuemin": f.min,
            "aria-valuenow": p,
            "aria-valuemax": f.max,
            "aria-orientation": f.orientation,
            "data-orientation": f.orientation,
            "data-disabled": f.disabled ? "" : void 0,
            tabIndex: f.disabled ? void 0 : 0,
            ...d,
            ref: M,
            style: p === void 0 ? { display: "none" } : r.style,
            onFocus: at(r.onFocus, () => {
              f.valueIndexToChangeRef.current = b;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), YS = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ Ye(function(r, c) {
    const { __scopeSlider: u, name: d, ...f } = r;
    return /* @__PURE__ */ y.jsx(
      hv,
      {
        __scopeSlider: u,
        name: d,
        internal_do_not_use_render: ({ index: h, isFormControl: b }) => /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
          /* @__PURE__ */ y.jsx(
            VS,
            {
              ...f,
              ref: c,
              __scopeSlider: u
            }
          ),
          b ? /* @__PURE__ */ y.jsx(
            XS,
            {
              __scopeSlider: u
            },
            h
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), qS = "SliderBubbleInput", XS = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ye(function({ __scopeSlider: r, ...c }, u) {
    const { value: d, name: f, form: h } = dv(qS, r), b = S.useRef(null), p = rt(b, u), g = $p(d);
    return S.useEffect(() => {
      const z = b.current;
      if (!z) return;
      const E = window.HTMLInputElement.prototype, k = Object.getOwnPropertyDescriptor(E, "value").set;
      if (g !== d && k) {
        const q = new Event("input", { bubbles: !0 });
        k.call(z, d), z.dispatchEvent(q);
      }
    }, [g, d]), /* @__PURE__ */ y.jsx(
      ut.input,
      {
        style: { display: "none" },
        name: f,
        form: h,
        ...c,
        ref: p,
        defaultValue: d
      }
    );
  }, "SliderBubbleInput")
);
function mv(i = [], r, c) {
  const u = [...i];
  return u[c] = r, u.sort((d, f) => d - f);
}
Ye(mv, "getNextSortedValues");
function Mf(i, r, c) {
  const f = 100 / (c - r) * (i - r);
  return yu(f, [0, 100]);
}
Ye(Mf, "convertValueToPercentage");
function gv(i, r) {
  return r > 2 ? `Value ${i + 1} of ${r}` : r === 2 ? ["Minimum", "Maximum"][i] : void 0;
}
Ye(gv, "getLabel");
function pv(i, r) {
  if (i.length === 1) return 0;
  const c = i.map((d) => Math.abs(d - r)), u = Math.min(...c);
  return c.indexOf(u);
}
Ye(pv, "getClosestValueIndex");
function vv(i, r, c) {
  const u = i / 2, f = xu([0, 50], [0, u]);
  return (u - f(r) * c) * c;
}
Ye(vv, "getThumbInBoundsOffset");
function bv(i) {
  return i.slice(0, -1).map((r, c) => i[c + 1] - r);
}
Ye(bv, "getStepsBetweenValues");
function yv(i, r) {
  if (r > 0) {
    const c = bv(i);
    return Math.min(...c) >= r;
  }
  return !0;
}
Ye(yv, "hasMinStepsBetweenValues");
function xu(i, r) {
  return (c) => {
    if (i[0] === i[1] || r[0] === r[1]) return r[0];
    const u = (r[1] - r[0]) / (i[1] - i[0]);
    return r[0] + u * (c - i[0]);
  };
}
Ye(xu, "linearScale");
function zf(i) {
  if (!Number.isFinite(i)) return 0;
  const r = i.toString();
  if (r.includes("e")) {
    const [u, d] = r.split("e"), f = u.split(".")[1] || "", h = Number(d);
    return Math.max(0, f.length - h);
  }
  const c = r.split(".")[1];
  return c ? c.length : 0;
}
Ye(zf, "getDecimalCount");
function Ao(i, r) {
  const c = Math.pow(10, r);
  return Math.round(i * c) / c;
}
Ye(Ao, "roundValue");
function xv(i, {
  min: r,
  step: c,
  direction: u,
  multiplier: d
}) {
  const f = zf(c), h = (i - r) / c, b = Math.round(h), p = Ao(b * c + r, f) === Ao(i, f);
  let g;
  return p ? g = b + d * u : u > 0 ? g = Math.ceil(h) : g = Math.floor(h), Ao(g * c + r, f);
}
Ye(xv, "getNextStepValue");
function Sv(i) {
  return typeof i == "function";
}
Ye(Sv, "isFunction");
var ZS = Object.defineProperty, QS = (i, r) => ZS(i, "name", { value: r, configurable: !0 }), KS = "Toggle", JS = /* @__PURE__ */ S.forwardRef(
  /* @__PURE__ */ QS(function(r, c) {
    const { pressed: u, defaultPressed: d, onPressedChange: f, ...h } = r, [b, p] = bl({
      prop: u,
      onChange: f,
      defaultProp: d ?? !1,
      caller: KS
    });
    return /* @__PURE__ */ y.jsx(
      ut.button,
      {
        type: "button",
        "aria-pressed": b,
        "data-state": b ? "on" : "off",
        "data-disabled": r.disabled ? "" : void 0,
        ...h,
        ref: c,
        onClick: at(r.onClick, () => {
          r.disabled || p(!b);
        })
      }
    );
  }, "Toggle")
), $S = Object.defineProperty, Ql = (i, r) => $S(i, "name", { value: r, configurable: !0 }), Ci = "ToggleGroup", [_v, F_] = /* @__PURE__ */ vl(Ci, [
  Zp
]), Ev = Zp(), PS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ Ql(function(r, c) {
  const { type: u, ...d } = r;
  if (u === "single") {
    const f = d;
    return /* @__PURE__ */ y.jsx(WS, { role: "radiogroup", ...f, ref: c });
  }
  if (u === "multiple") {
    const f = d;
    return /* @__PURE__ */ y.jsx(FS, { role: "toolbar", ...f, ref: c });
  }
  throw new Error(`Missing prop \`type\` expected on \`${Ci}\``);
}, "ToggleGroup")), [Av, Cv] = _v(Ci), WS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ Ql(function(r, c) {
  const {
    value: u,
    defaultValue: d,
    onValueChange: f = /* @__PURE__ */ Ql(() => {
    }, "onValueChange"),
    ...h
  } = r, [b, p] = bl({
    prop: u,
    defaultProp: d ?? "",
    onChange: f,
    caller: Ci
  });
  return /* @__PURE__ */ y.jsx(
    Av,
    {
      scope: r.__scopeToggleGroup,
      type: "single",
      value: S.useMemo(() => b ? [b] : [], [b]),
      onItemActivate: p,
      onItemDeactivate: S.useCallback(() => p(""), [p]),
      children: /* @__PURE__ */ y.jsx(Tv, { ...h, ref: c })
    }
  );
}, "ToggleGroupImplSingle")), FS = /* @__PURE__ */ S.forwardRef(/* @__PURE__ */ Ql(function(r, c) {
  const {
    value: u,
    defaultValue: d,
    onValueChange: f = /* @__PURE__ */ Ql(() => {
    }, "onValueChange"),
    ...h
  } = r, [b, p] = bl({
    prop: u,
    defaultProp: d ?? [],
    onChange: f,
    caller: Ci
  }), g = S.useCallback(
    (E) => p((M = []) => [...M, E]),
    [p]
  ), z = S.useCallback(
    (E) => p((M = []) => M.filter((k) => k !== E)),
    [p]
  );
  return /* @__PURE__ */ y.jsx(
    Av,
    {
      scope: r.__scopeToggleGroup,
      type: "multiple",
      value: b,
      onItemActivate: g,
      onItemDeactivate: z,
      children: /* @__PURE__ */ y.jsx(Tv, { ...h, ref: c })
    }
  );
}, "ToggleGroupImplMultiple")), [IS, e_] = _v(Ci), Tv = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ql(function(r, c) {
    const {
      __scopeToggleGroup: u,
      disabled: d = !1,
      rovingFocus: f = !0,
      orientation: h,
      dir: b,
      loop: p = !0,
      ...g
    } = r, z = Ev(u), E = Ai(b), M = { dir: E, ...g };
    return /* @__PURE__ */ y.jsx(IS, { scope: u, rovingFocus: f, disabled: d, children: f ? /* @__PURE__ */ y.jsx(
      Jx,
      {
        asChild: !0,
        ...z,
        orientation: h,
        dir: E,
        loop: p,
        children: /* @__PURE__ */ y.jsx(ut.div, { ...M, ref: c })
      }
    ) : /* @__PURE__ */ y.jsx(ut.div, { ...M, ref: c }) });
  }, "ToggleGroupImpl")
), af = "ToggleGroupItem", t_ = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ql(function(r, c) {
    const u = Cv(af, r.__scopeToggleGroup), d = e_(af, r.__scopeToggleGroup), f = Ev(r.__scopeToggleGroup), h = u.value.includes(r.value), b = d.disabled || r.disabled, p = { ...r, pressed: h, disabled: b }, g = S.useRef(null);
    return d.rovingFocus ? /* @__PURE__ */ y.jsx(
      $x,
      {
        asChild: !0,
        ...f,
        focusable: !b,
        active: h,
        ref: g,
        children: /* @__PURE__ */ y.jsx(Og, { ...p, ref: c })
      }
    ) : /* @__PURE__ */ y.jsx(Og, { ...p, ref: c });
  }, "ToggleGroupItem")
), Og = /* @__PURE__ */ S.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ql(function(r, c) {
    const { __scopeToggleGroup: u, value: d, ...f } = r, h = Cv(af, u), b = { role: "radio", "aria-checked": r.pressed, "aria-pressed": void 0 }, p = h.type === "single" ? b : void 0;
    return /* @__PURE__ */ y.jsx(
      JS,
      {
        ...p,
        ...f,
        ref: c,
        onPressedChange: (g) => {
          g ? h.onItemActivate(d) : h.onItemDeactivate(d);
        }
      }
    );
  }, "ToggleGroupItemImpl")
);
function Mv({
  ...i
}) {
  return /* @__PURE__ */ y.jsx(Tx, { "data-slot": "accordion", ...i });
}
function Co({
  className: i,
  ...r
}) {
  return /* @__PURE__ */ y.jsx(
    Mx,
    {
      "data-slot": "accordion-item",
      className: He("border-b last:border-b-0", i),
      ...r
    }
  );
}
function To({
  className: i,
  children: r,
  ...c
}) {
  return /* @__PURE__ */ y.jsx(zx, { className: "flex", children: /* @__PURE__ */ y.jsxs(
    wx,
    {
      "data-slot": "accordion-trigger",
      className: He(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        i
      ),
      ...c,
      children: [
        r,
        /* @__PURE__ */ y.jsx(F0, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function Mo({
  className: i,
  children: r,
  ...c
}) {
  return /* @__PURE__ */ y.jsx(
    Rx,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...c,
      children: /* @__PURE__ */ y.jsx("div", { className: He("pt-0 pb-4", i), children: r })
    }
  );
}
const Dg = (i) => typeof i == "boolean" ? `${i}` : i === 0 ? "0" : i, jg = Zg, Bo = (i, r) => (c) => {
  var u;
  if (r?.variants == null) return jg(i, c?.class, c?.className);
  const { variants: d, defaultVariants: f } = r, h = Object.keys(d).map((g) => {
    const z = c?.[g], E = f?.[g];
    if (z === null) return null;
    const M = Dg(z) || Dg(E);
    return d[g][M];
  }), b = c && Object.entries(c).reduce((g, z) => {
    let [E, M] = z;
    return M === void 0 || (g[E] = M), g;
  }, {}), p = r == null || (u = r.compoundVariants) === null || u === void 0 ? void 0 : u.reduce((g, z) => {
    let { class: E, className: M, ...k } = z;
    return Object.entries(k).every((q) => {
      let [Q, W] = q;
      return Array.isArray(W) ? W.includes({
        ...f,
        ...b
      }[Q]) : {
        ...f,
        ...b
      }[Q] === W;
    }) ? [
      ...g,
      E,
      M
    ] : g;
  }, []);
  return jg(i, h, p, c?.class, c?.className);
}, n_ = Bo(
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
function zo({
  className: i,
  variant: r = "default",
  size: c = "default",
  asChild: u = !1,
  ...d
}) {
  const f = u ? sp : "button";
  return /* @__PURE__ */ y.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": r,
      "data-size": c,
      className: He(n_({ variant: r, size: c }), i),
      ...d
    }
  );
}
function l_({
  className: i,
  orientation: r = "horizontal",
  decorative: c = !0,
  ...u
}) {
  return /* @__PURE__ */ y.jsx(
    MS,
    {
      "data-slot": "separator",
      decorative: c,
      orientation: r,
      className: He(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        i
      ),
      ...u
    }
  );
}
const a_ = Bo(
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
function i_({
  className: i,
  orientation: r,
  ...c
}) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": r,
      className: He(a_({ orientation: r }), i),
      ...c
    }
  );
}
function zv({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "card",
      className: He(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        i
      ),
      ...r
    }
  );
}
function wv({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: He(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        i
      ),
      ...r
    }
  );
}
function Rv({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: He("leading-none font-semibold", i),
      ...r
    }
  );
}
function Nv({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: He("px-6", i),
      ...r
    }
  );
}
function o_({
  ...i
}) {
  return /* @__PURE__ */ y.jsx(kp, { "data-slot": "collapsible", ...i });
}
function r_({
  ...i
}) {
  return /* @__PURE__ */ y.jsx(
    Op,
    {
      "data-slot": "collapsible-trigger",
      ...i
    }
  );
}
function u_({
  ...i
}) {
  return /* @__PURE__ */ y.jsx(
    jp,
    {
      "data-slot": "collapsible-content",
      ...i
    }
  );
}
function c_({
  className: i,
  ...r
}) {
  return /* @__PURE__ */ y.jsx(
    Ix,
    {
      "data-slot": "label",
      className: He(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        i
      ),
      ...r
    }
  );
}
function kg({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: He(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        i
      ),
      ...r
    }
  );
}
const s_ = Bo(
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
function bi({
  className: i,
  orientation: r = "vertical",
  ...c
}) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": r,
      className: He(s_({ orientation: r }), i),
      ...c
    }
  );
}
function yi({
  className: i,
  ...r
}) {
  return /* @__PURE__ */ y.jsx(
    c_,
    {
      "data-slot": "field-label",
      className: He(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        i
      ),
      ...r
    }
  );
}
function Bn({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: He(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        i
      ),
      ...r
    }
  );
}
function f_({ className: i, type: r, ...c }) {
  return /* @__PURE__ */ y.jsx(
    "input",
    {
      type: r,
      "data-slot": "input",
      className: He(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        i
      ),
      ...c
    }
  );
}
function Vs({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: He("group/item-group flex flex-col", i),
      ...r
    }
  );
}
const d_ = Bo(
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
function h_({
  className: i,
  variant: r = "default",
  size: c = "default",
  asChild: u = !1,
  ...d
}) {
  const f = u ? sp : "div";
  return /* @__PURE__ */ y.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": r,
      "data-size": c,
      className: He(d_({ variant: r, size: c }), i),
      ...d
    }
  );
}
function m_({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "item-content",
      className: He(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        i
      ),
      ...r
    }
  );
}
function g_({ className: i, ...r }) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      "data-slot": "item-title",
      className: He(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        i
      ),
      ...r
    }
  );
}
function wo({
  className: i,
  children: r,
  ...c
}) {
  return /* @__PURE__ */ y.jsxs(
    SS,
    {
      "data-slot": "scroll-area",
      className: He("relative", i),
      ...c,
      children: [
        /* @__PURE__ */ y.jsx(
          _S,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children: r
          }
        ),
        /* @__PURE__ */ y.jsx(p_, {}),
        /* @__PURE__ */ y.jsx(ES, {})
      ]
    }
  );
}
function p_({
  className: i,
  orientation: r = "vertical",
  ...c
}) {
  return /* @__PURE__ */ y.jsx(
    sS,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation: r,
      className: He(
        "flex touch-none p-px transition-colors select-none",
        r === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        r === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        i
      ),
      ...c,
      children: /* @__PURE__ */ y.jsx(
        pS,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}
function ou({
  className: i,
  defaultValue: r,
  value: c,
  min: u = 0,
  max: d = 100,
  ...f
}) {
  const h = r ?? [u], b = S.useMemo(
    () => Array.isArray(c) ? c : Array.isArray(h) ? h : [u],
    [c, h, u]
  );
  return /* @__PURE__ */ y.jsxs(
    OS,
    {
      "data-slot": "slider",
      defaultValue: c == null ? h : void 0,
      value: c,
      min: u,
      max: d,
      className: He(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        i
      ),
      ...f,
      children: [
        /* @__PURE__ */ y.jsx(
          US,
          {
            "data-slot": "slider-track",
            className: He(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ y.jsx(
              LS,
              {
                "data-slot": "slider-range",
                className: He(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: b.length }, (p, g) => /* @__PURE__ */ y.jsx(
          YS,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          g
        ))
      ]
    }
  );
}
const v_ = Bo(
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
), Ov = S.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function of({
  className: i,
  variant: r,
  size: c,
  spacing: u = 0,
  children: d,
  ...f
}) {
  return /* @__PURE__ */ y.jsx(
    PS,
    {
      "data-slot": "toggle-group",
      "data-variant": r,
      "data-size": c,
      "data-spacing": u,
      style: { "--gap": u },
      className: He(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        i
      ),
      ...f,
      children: /* @__PURE__ */ y.jsx(Ov.Provider, { value: { variant: r, size: c, spacing: u }, children: d })
    }
  );
}
function Ea({
  className: i,
  children: r,
  variant: c,
  size: u,
  ...d
}) {
  const f = S.useContext(Ov);
  return /* @__PURE__ */ y.jsx(
    t_,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || c,
      "data-size": f.size || u,
      "data-spacing": f.spacing,
      className: He(
        v_({
          variant: f.variant || c,
          size: f.size || u
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        i
      ),
      ...d,
      children: r
    }
  );
}
const Ug = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Lg = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], b_ = ["line", "spline", "gradient"], y_ = ["spline", "shape", "gradient"], x_ = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, S_ = ["select", "lasso"], __ = ["point", "line", "spline", "shape"];
function E_(i, r) {
  const [c, u] = i, [d, f] = r;
  return 0.25 * Math.min(Math.abs(u - c), Math.abs(f - d));
}
function Ys(i, r = "off") {
  return i ? i.toPrecision(3) : r;
}
const A_ = {
  select: d1,
  lasso: r1,
  polygon: m1,
  rectangle: S1,
  ellipse: Ag,
  point: Ag,
  line: rp,
  spline: y1,
  shape: up
};
function Hg({
  modes: i,
  value: r,
  onChange: c
}) {
  return i.length ? /* @__PURE__ */ y.jsx(
    of,
    {
      type: "single",
      variant: "outline",
      size: "sm",
      spacing: 0,
      value: r,
      onValueChange: (u) => {
        u && c(u);
      },
      children: i.map((u) => {
        const d = A_[u] ?? up, f = x_[u] ?? u;
        return /* @__PURE__ */ y.jsx(
          Ea,
          {
            value: u,
            title: f,
            "aria-label": f,
            className: "size-6 min-w-6 px-0",
            children: /* @__PURE__ */ y.jsx(d, {})
          },
          u
        );
      })
    }
  ) : null;
}
function Dv({ color: i, className: r }) {
  return /* @__PURE__ */ y.jsx(
    "span",
    {
      className: He(
        "inline-block size-2.5 shrink-0 rounded-full ring-1 ring-border",
        r
      ),
      style: { backgroundColor: i },
      "aria-hidden": !0
    }
  );
}
function C_({ active: i }) {
  return /* @__PURE__ */ y.jsx(
    "span",
    {
      className: He(
        "inline-block size-2.5 shrink-0 rounded-full border border-foreground",
        i ? "bg-foreground" : "bg-transparent"
      ),
      "aria-hidden": !0
    }
  );
}
function T_({
  modes: i,
  mode: r,
  onMode: c
}) {
  const u = i.filter((f) => S_.includes(f)), d = i.filter((f) => __.includes(f));
  return /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      children: [
        u.length ? /* @__PURE__ */ y.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ y.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Select" }),
          /* @__PURE__ */ y.jsx(Hg, { modes: u, value: r, onChange: c })
        ] }) : null,
        u.length && d.length ? /* @__PURE__ */ y.jsx(l_, { orientation: "vertical", className: "h-5" }) : null,
        d.length ? /* @__PURE__ */ y.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ y.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Landmarks" }),
          /* @__PURE__ */ y.jsx(Hg, { modes: d, value: r, onChange: c })
        ] }) : null
      ]
    }
  );
}
function qs({
  active: i,
  color: r,
  label: c,
  hidden: u,
  onSelect: d,
  onRename: f,
  onDelete: h,
  onToggleHidden: b
}) {
  const [p, g] = S.useState(!1), [z, E] = S.useState(c);
  return /* @__PURE__ */ y.jsxs(
    h_,
    {
      variant: i ? "muted" : "default",
      size: "sm",
      className: He(
        "w-full min-w-0 cursor-pointer flex-nowrap gap-1 px-0 py-0.5",
        i && "border-ring ring-[3px] ring-ring/35",
        u && "opacity-50"
      ),
      onClick: d,
      children: [
        b ? /* @__PURE__ */ y.jsx(
          zo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": u ? "Show landmark" : "Hide landmark",
            onClick: (M) => {
              M.stopPropagation(), b();
            },
            children: u ? /* @__PURE__ */ y.jsx(i1, {}) : /* @__PURE__ */ y.jsx(l1, {})
          }
        ) : null,
        r ? /* @__PURE__ */ y.jsx(Dv, { color: r }) : null,
        /* @__PURE__ */ y.jsx(m_, { className: "min-w-0 gap-0", children: p && f ? /* @__PURE__ */ y.jsx(
          f_,
          {
            "aria-label": "Rename layer",
            value: z,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (M) => M.stopPropagation(),
            onChange: (M) => E(M.target.value),
            onBlur: () => {
              f(z), g(!1);
            },
            onKeyDown: (M) => {
              M.stopPropagation(), M.key === "Enter" ? (M.preventDefault(), f(z), g(!1)) : M.key === "Escape" && (M.preventDefault(), E(c), g(!1));
            }
          }
        ) : /* @__PURE__ */ y.jsx(
          g_,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: f ? "Double-click to rename" : c,
            onDoubleClick: (M) => {
              f && (M.preventDefault(), M.stopPropagation(), E(c), g(!0));
            },
            children: c
          }
        ) }),
        h ? /* @__PURE__ */ y.jsx(
          zo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (M) => {
              M.stopPropagation(), h();
            },
            children: /* @__PURE__ */ y.jsx(E1, {})
          }
        ) : null
      ]
    }
  );
}
const du = "px-3";
function M_({ lm: i }) {
  const {
    selections: r,
    landmarks: c,
    selected_kind: u,
    selected_index: d,
    category_columns: f,
    active_category: h
  } = i;
  return /* @__PURE__ */ y.jsxs(zv, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ y.jsx(wv, { className: He("shrink-0 py-0", du), children: /* @__PURE__ */ y.jsx(Rv, { className: "text-sm font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ y.jsx(Nv, { className: He("min-h-0 overflow-hidden pb-2", du), children: /* @__PURE__ */ y.jsxs(Mv, { type: "multiple", defaultValue: ["selections", "categories", "landmarks"], children: [
      /* @__PURE__ */ y.jsxs(Co, { value: "selections", className: "border-b", children: [
        /* @__PURE__ */ y.jsx(To, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Selections" }),
        /* @__PURE__ */ y.jsx(Mo, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ y.jsx(wo, { className: "h-40", children: /* @__PURE__ */ y.jsx(Vs, { className: "gap-0.5", children: r.map((b, p) => /* @__PURE__ */ y.jsx(
          qs,
          {
            active: u === "selection" && d === p,
            color: Lg[p % Lg.length],
            label: b.id,
            onSelect: () => i.select("selection", p),
            onRename: (g) => i.renameSelection(p, g),
            onDelete: () => i.deleteSelection(p)
          },
          `${b.id}-${p}`
        )) }) }) : /* @__PURE__ */ y.jsx(Bn, { children: "No selections yet." }) })
      ] }),
      f.length ? /* @__PURE__ */ y.jsxs(Co, { value: "categories", className: "border-b", children: [
        /* @__PURE__ */ y.jsx(To, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Categories" }),
        /* @__PURE__ */ y.jsx(Mo, { className: "px-0 pb-2", children: /* @__PURE__ */ y.jsx(wo, { className: "h-48", children: /* @__PURE__ */ y.jsx("div", { className: "flex flex-col gap-0.5", children: f.map((b) => {
          const p = b.name === h;
          return /* @__PURE__ */ y.jsxs(o_, { className: "group/cat", children: [
            /* @__PURE__ */ y.jsxs(
              r_,
              {
                className: He(
                  "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                  p && "text-foreground"
                ),
                onClick: () => {
                  b.name !== h && (i.setActiveCategory(b), i.select("", -1));
                },
                children: [
                  /* @__PURE__ */ y.jsx(e1, { className: "size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                  /* @__PURE__ */ y.jsx(C_, { active: p }),
                  /* @__PURE__ */ y.jsx("span", { className: "min-w-0 flex-1 truncate", children: b.name })
                ]
              }
            ),
            /* @__PURE__ */ y.jsx(u_, { className: "pl-4", children: /* @__PURE__ */ y.jsx(Vs, { className: "gap-0.5", children: (b.labels || []).map((g, z) => /* @__PURE__ */ y.jsx(
              qs,
              {
                active: u === "type" && b.name === h && d === z,
                color: (b.palette || [])[z % Math.max((b.palette || []).length, 1)] || "#888888",
                label: g,
                onSelect: () => i.selectType(b, z)
              },
              `${b.name}-${g}`
            )) }) })
          ] }, b.name);
        }) }) }) })
      ] }) : null,
      /* @__PURE__ */ y.jsxs(Co, { value: "landmarks", className: "border-b-0", children: [
        /* @__PURE__ */ y.jsx(To, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmarks" }),
        /* @__PURE__ */ y.jsx(Mo, { className: "px-0 pb-2", children: c.length ? /* @__PURE__ */ y.jsx(wo, { className: "h-40", children: /* @__PURE__ */ y.jsx(Vs, { className: "gap-0.5", children: c.map((b, p) => /* @__PURE__ */ y.jsx(
          qs,
          {
            active: u === "landmark" && d === p,
            color: Ug[p % Ug.length],
            label: b.id,
            hidden: !!b.hidden,
            onSelect: () => i.select("landmark", p),
            onRename: (g) => i.renameLandmark(p, g),
            onToggleHidden: () => i.toggleLandmarkHidden(p),
            onDelete: () => i.deleteLandmark(p)
          },
          `${b.id}-${p}`
        )) }) }) : /* @__PURE__ */ y.jsx(Bn, { children: "No landmarks yet." }) })
      ] })
    ] }) })
  ] });
}
function z_({ lm: i }) {
  const {
    default_tension: r,
    neighbor_radius_max: c,
    neighbor_k_max: u,
    x_bounds: d,
    y_bounds: f
  } = i, h = i.selectedLandmark(), b = !!h && y_.includes(h.type), p = !!h && b_.includes(h.type), g = i.activeNeighborhood(), z = !!g, E = Math.max(E_(d, f), 1), M = c > 0 ? c : E, k = Math.max(1, u || 64), q = Math.min(Number(g?.neighborhood_radius || 0), M);
  return /* @__PURE__ */ y.jsxs(zv, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ y.jsx(wv, { className: He("shrink-0 py-0", du), children: /* @__PURE__ */ y.jsx(Rv, { className: "text-sm font-semibold tracking-tight", children: "Tools" }) }),
    /* @__PURE__ */ y.jsx(Nv, { className: He("min-h-0 overflow-hidden pb-2", du), children: /* @__PURE__ */ y.jsxs(
      Mv,
      {
        type: "multiple",
        defaultValue: ["neighbors", "landmark"],
        children: [
          /* @__PURE__ */ y.jsxs(Co, { value: "neighbors", className: "border-b", children: [
            /* @__PURE__ */ y.jsx(To, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Neighbors" }),
            /* @__PURE__ */ y.jsx(Mo, { className: "px-0 pb-2", children: /* @__PURE__ */ y.jsx(wo, { className: "h-48", children: /* @__PURE__ */ y.jsx(kg, { className: "gap-2", children: z ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
              /* @__PURE__ */ y.jsx(Bn, { children: g.id ? String(g.id) : "Selection" }),
              /* @__PURE__ */ y.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ y.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ y.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                  "seed"
                ] }),
                /* @__PURE__ */ y.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ y.jsx(Dv, { color: "#00e5cc" }),
                  "neighborhood"
                ] }),
                /* @__PURE__ */ y.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ y.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                  "other"
                ] })
              ] }),
              /* @__PURE__ */ y.jsxs(bi, { children: [
                /* @__PURE__ */ y.jsx(yi, { children: "Neighborhood" }),
                /* @__PURE__ */ y.jsxs(
                  of,
                  {
                    type: "single",
                    variant: "outline",
                    size: "sm",
                    spacing: 0,
                    value: g.neighborhood || "off",
                    onValueChange: (Q) => {
                      Q && i.patchNeighborhood({ neighborhood: Q });
                    },
                    children: [
                      /* @__PURE__ */ y.jsx(Ea, { value: "off", children: "Off" }),
                      /* @__PURE__ */ y.jsx(Ea, { value: "radius", children: "Radius" }),
                      /* @__PURE__ */ y.jsx(Ea, { value: "knn", children: "k-NN" })
                    ]
                  }
                )
              ] }),
              g.neighborhood === "radius" ? /* @__PURE__ */ y.jsxs(bi, { children: [
                /* @__PURE__ */ y.jsx(yi, { children: "Radius" }),
                /* @__PURE__ */ y.jsx(
                  ou,
                  {
                    min: 0,
                    max: M,
                    step: M / 200 || 1,
                    value: [q],
                    onValueChange: (Q) => {
                      const W = Math.min(Math.max(Q[0] ?? 0, 0), M);
                      i.patchNeighborhood({
                        neighborhood: "radius",
                        neighborhood_radius: W
                      });
                    }
                  }
                ),
                /* @__PURE__ */ y.jsxs(Bn, { children: [
                  Ys(q, "0"),
                  M > 0 ? ` / ${Ys(M, "0")}` : ""
                ] })
              ] }) : null,
              g.neighborhood === "knn" ? /* @__PURE__ */ y.jsxs(bi, { children: [
                /* @__PURE__ */ y.jsx(yi, { children: "k" }),
                /* @__PURE__ */ y.jsx(
                  ou,
                  {
                    min: 1,
                    max: k,
                    step: 1,
                    value: [
                      Math.min(Number(g.neighborhood_k || 12), k)
                    ],
                    onValueChange: (Q) => i.patchNeighborhood({
                      neighborhood: "knn",
                      neighborhood_k: Q[0] ?? 12
                    })
                  }
                ),
                /* @__PURE__ */ y.jsx(Bn, { children: String(
                  Math.min(Number(g.neighborhood_k || 12), k)
                ) })
              ] }) : null,
              /* @__PURE__ */ y.jsx(Bn, { children: "Shift+wheel sizes the neighborhood." })
            ] }) : /* @__PURE__ */ y.jsx(Bn, { children: "Select a type or selection to edit neighbors." }) }) }) })
          ] }),
          b || p ? /* @__PURE__ */ y.jsxs(Co, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ y.jsx(To, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmark" }),
            /* @__PURE__ */ y.jsx(Mo, { className: "px-0 pb-2", children: /* @__PURE__ */ y.jsx(wo, { className: "h-40", children: /* @__PURE__ */ y.jsxs(kg, { className: "gap-2", children: [
              b ? /* @__PURE__ */ y.jsxs(bi, { children: [
                /* @__PURE__ */ y.jsx(yi, { children: "Tension" }),
                /* @__PURE__ */ y.jsx(
                  ou,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [
                      Number(h?.tension ?? r ?? 0)
                    ],
                    onValueChange: (Q) => i.patchLandmark({ tension: Q[0] ?? 0 })
                  }
                ),
                /* @__PURE__ */ y.jsxs(Bn, { children: [
                  Number(
                    h?.tension ?? r ?? 0
                  ).toPrecision(3),
                  ". 0 = smooth, 1 = straight."
                ] })
              ] }) : null,
              p ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
                /* @__PURE__ */ y.jsxs(bi, { children: [
                  /* @__PURE__ */ y.jsx(yi, { children: "Buffer" }),
                  /* @__PURE__ */ y.jsxs(
                    of,
                    {
                      type: "single",
                      variant: "outline",
                      size: "sm",
                      spacing: 0,
                      value: h?.buffer_side || "both",
                      onValueChange: (Q) => {
                        Q && i.patchLandmark({ buffer_side: Q });
                      },
                      children: [
                        /* @__PURE__ */ y.jsx(Ea, { value: "left", children: "Left" }),
                        /* @__PURE__ */ y.jsx(Ea, { value: "both", children: "Both" }),
                        /* @__PURE__ */ y.jsx(Ea, { value: "right", children: "Right" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ y.jsxs(bi, { children: [
                  /* @__PURE__ */ y.jsx(yi, { children: "Width" }),
                  /* @__PURE__ */ y.jsx(
                    ou,
                    {
                      min: 0,
                      max: E,
                      step: E / 200,
                      value: [
                        Math.min(
                          Number(h?.buffer_width || 0),
                          E
                        )
                      ],
                      onValueChange: (Q) => i.patchLandmark({ buffer_width: Q[0] ?? 0 })
                    }
                  ),
                  /* @__PURE__ */ y.jsx(Bn, { children: Ys(Number(h?.buffer_width || 0)) })
                ] }),
                /* @__PURE__ */ y.jsx(Bn, { children: "Shift+wheel sizes the buffer." })
              ] }) : null
            ] }) }) })
          ] }) : null
        ]
      }
    ) })
  ] });
}
function w_({
  onZoomIn: i,
  onZoomOut: r,
  onReset: c
}) {
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      className: "absolute right-2 bottom-2 z-10 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm",
      onMouseDown: (u) => u.stopPropagation(),
      onWheel: (u) => u.stopPropagation(),
      onDoubleClick: (u) => u.stopPropagation(),
      children: /* @__PURE__ */ y.jsxs(i_, { orientation: "vertical", children: [
        /* @__PURE__ */ y.jsx(
          zo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: "Zoom in",
            "aria-label": "Zoom in",
            className: "rounded-none",
            onClick: (u) => {
              u.stopPropagation(), i();
            },
            children: /* @__PURE__ */ y.jsx(p1, {})
          }
        ),
        /* @__PURE__ */ y.jsx(
          zo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: "Zoom out",
            "aria-label": "Zoom out",
            className: "rounded-none border-t border-border",
            onClick: (u) => {
              u.stopPropagation(), r();
            },
            children: /* @__PURE__ */ y.jsx(rp, {})
          }
        ),
        /* @__PURE__ */ y.jsx(
          zo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: "Reset view",
            "aria-label": "Reset view",
            className: "rounded-none border-t border-border",
            onClick: (u) => {
              u.stopPropagation(), c();
            },
            children: /* @__PURE__ */ y.jsx(c1, {})
          }
        )
      ] })
    }
  );
}
const No = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
};
function ru(i) {
  return { ...No, ...i };
}
function Bg(i, r) {
  i.set("active_category", r.name), i.set("point_palette", r.palette || []), i.set("legend_labels", r.labels || []), i.set("legend_title", r.name || ""), i.set("color_by", "categorical"), i.save_changes();
}
function jv(i, r, c, u, d, f) {
  if (i === "selection") {
    const h = c[r];
    return h ? { ...No, ...h } : null;
  }
  if (i === "type") {
    const h = d[r];
    if (!h) return null;
    const b = u.find(
      (p) => p.id === h && (!p.column || p.column === f)
    );
    return { ...No, id: h, column: f, ...b || {} };
  }
  return null;
}
function kv(i, r, c, u, d, f, h, b) {
  if (r === "selection") {
    i.set(
      "selections",
      d.map(
        (M, k) => k === c ? { ...No, ...M, ...u } : M
      )
    ), i.save_changes();
    return;
  }
  if (r !== "type") return;
  const p = h[c];
  if (!p) return;
  const g = [...f], z = g.findIndex(
    (M) => M.id === p && (!M.column || M.column === b)
  ), E = {
    ...No,
    id: p,
    column: b,
    ...z >= 0 ? g[z] : {},
    ...u
  };
  z >= 0 ? g[z] = E : g.push(E), i.set("type_neighborhoods", g), i.save_changes();
}
function Uv(i, r, c, u) {
  i.set(
    "landmarks",
    u.map((d, f) => f === r ? { ...d, ...c } : d)
  ), i.save_changes();
}
function rf(i, r, c) {
  i.set("selected_kind", r || ""), i.set("selected_index", c), i.save_changes();
}
function R_(i, r) {
  i.set("mode", r), i.save_changes();
}
function Lv(i, r) {
  return i.filter((c, u) => u !== r);
}
function Hv(i, r, c, u) {
  return r !== i ? { kind: r, index: c } : c === u ? { kind: "", index: -1 } : c > u ? { kind: r, index: c - 1 } : { kind: r, index: c };
}
function N_(i, r, c, u, d) {
  const f = Hv("selection", u, d, r);
  i.set("selections", Lv(c, r)), i.set("selected_kind", f.kind), i.set("selected_index", f.index), i.save_changes();
}
function O_(i, r, c, u, d) {
  const f = Hv("landmark", u, d, r);
  i.set("landmarks", Lv(c, r)), i.set("selected_kind", f.kind), i.set("selected_index", f.index), i.save_changes();
}
function D_(i, r, c, u) {
  const d = String(c || "").trim();
  d && (i.set(
    "selections",
    u.map((f, h) => h === r ? { ...f, id: d } : f)
  ), i.save_changes());
}
function j_(i, r, c, u) {
  const d = String(c || "").trim();
  d && (i.set(
    "landmarks",
    u.map((f, h) => h === r ? { ...f, id: d } : f)
  ), i.save_changes());
}
function k_(i, r, c) {
  i.set(
    "landmarks",
    c.map(
      (u, d) => d === r ? { ...u, hidden: !u.hidden } : u
    )
  ), i.save_changes();
}
const uf = "9.1.14", U_ = `https://esm.sh/@deck.gl/core@${uf}`, L_ = `https://esm.sh/@deck.gl/layers@${uf}?deps=@deck.gl/core@${uf}`, hl = { depthCompare: "always", depthWriteEnabled: !1 }, Gg = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], Xs = "#00e5cc", H_ = 0.3, B_ = 0.9, G_ = "#00453d", xi = 2, uu = 1, V_ = 0.55, Zs = ["line", "spline", "gradient"];
function Vg(i) {
  if (!i) return new Float32Array(0);
  const r = atob(i), c = new Uint8Array(r.length);
  for (let u = 0; u < r.length; u++) c[u] = r.charCodeAt(u);
  return new Float32Array(c.buffer);
}
function Qs(i) {
  if (!i) return new Int32Array(0);
  const r = atob(i), c = new Uint8Array(r.length);
  for (let u = 0; u < r.length; u++) c[u] = r.charCodeAt(u);
  return new Int32Array(c.buffer);
}
function Y_(i) {
  return 1 - (1 - i) ** 4;
}
function cu(i) {
  const r = document.createElement("canvas");
  r.width = r.height = 1;
  const c = r.getContext("2d", { willReadFrequently: !0 });
  c.fillStyle = "#000000", c.fillStyle = i, c.fillRect(0, 0, 1, 1);
  const [u, d, f, h] = c.getImageData(0, 0, 1, 1).data;
  return [u / 255, d / 255, f / 255, h / 255 || 1];
}
function Yg({ model: i, host: r }) {
  if (!r) throw new Error("mountEngine: host element is required");
  const c = r.closest(".landmarks"), u = r.closest(".landmarks__body"), d = r.closest(".landmarks__main") || r.parentElement;
  if (!c || !u || !d)
    throw new Error(
      "mountEngine: host must sit inside .landmarks > .landmarks__body > .landmarks__main"
    );
  r.replaceChildren(), r.classList.add("landmarks__plot-host"), r.style.position = "relative", r.style.flex = "1 1 auto", r.style.minHeight = "0", r.style.width = "100%", r.style.height = "100%";
  const f = document.createElement("div");
  f.className = "landmarks__plot";
  const h = document.createElement("canvas");
  h.className = "landmarks__webgl", h.tabIndex = 0;
  const b = document.createElement("div");
  b.className = "landmarks__legend", b.hidden = !0;
  const p = document.createElement("div");
  p.className = "landmarks__tooltip", p.hidden = !0, f.append(h, b), r.append(f, p);
  let g = () => {
  };
  const z = new MutationObserver(() => {
    g(), L && ke();
  });
  z.observe(c, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function E(v, x, A) {
    p.textContent = v, p.hidden = !1;
    const R = r.getBoundingClientRect();
    p.style.left = `${x - R.left + 12}px`, p.style.top = `${A - R.top + 12}px`;
  }
  function M() {
    p.hidden = !0;
  }
  b.addEventListener("mousedown", (v) => v.stopPropagation()), b.addEventListener("wheel", (v) => v.stopPropagation(), { passive: !0 });
  const k = i.get("modes") || [], q = ["select", "lasso"].filter(
    (v) => k.includes(v)
  ), Q = ["point", "line", "spline", "shape"].filter(
    (v) => k.includes(v)
  ), W = [...q, ...Q];
  let $ = i.get("mode") || "select";
  W.includes($) || ($ = W[0] || "select");
  let L = null, J = null, le = null, me = 0, fe = !1, ie = null, P = null, ae = { key: "", data: [] }, Se = null, Ae = !1, we = [], We = () => {
  }, Fe = () => {
  }, Xe = null, D = null;
  function X() {
    const v = i.get("category_codes") || "";
    Xe = v ? Qs(v) : null;
  }
  X();
  function ce() {
    const v = Qs(i.get("neighbor_indptr") || ""), x = Qs(i.get("neighbor_indices") || ""), A = Vg(i.get("neighbor_distances") || "");
    if (!v.length) {
      D = null;
      return;
    }
    D = {
      indptr: v,
      indices: x,
      distances: A,
      radiusMax: Number(i.get("neighbor_radius_max")) || 0,
      kMax: Number(i.get("neighbor_k_max")) || 64
    };
  }
  ce();
  function Re() {
    const v = Number(i.get("neighbor_radius_max")) || 0;
    return v > 0 ? v : Zo();
  }
  function ne() {
    const v = Number(i.get("neighbor_k_max")) || 64;
    return Math.max(1, v);
  }
  function C() {
    const v = i.get("category_columns") || [], x = i.get("active_category") || "";
    return v.findIndex((A) => A.name === x);
  }
  function V(v) {
    i.get("category_columns");
    const x = C(), A = dt();
    return x < 0 || !Xe || !A.length ? Math.round(A[v]?.valueA || 0) : Xe[x * A.length + v];
  }
  let ee = null, F = [], oe = !1, he = null, Te = "", Ie = -1, _e = !1, Vt = !1, Tt = !1, Mt = [], Yt = !1, ct = null, Ft = null;
  function za(v, x) {
    const A = new Set((x || []).map((R) => String(R.id)));
    for (let R = 1; ; R++) {
      const H = `${v} ${R}`;
      if (!A.has(H)) return H;
    }
  }
  function Go(v) {
    return za("landmark", v);
  }
  function Jl(v) {
    return za("selection", v);
  }
  function wa() {
    F = [], Mt = [], Tt = !1, Yt = !1, ct = null, Ft = null;
  }
  function $l(v) {
    const x = h.getBoundingClientRect();
    if (!x.width || !x.height) return null;
    const A = v.clientX - x.left, R = v.clientY - x.top, H = L?.isInitialized ? L.getViewports()[0] : null;
    if (!H) return null;
    const [G, te] = H.unproject([A, R]);
    return { x: G, y: te, px: A, py: R };
  }
  function Ra() {
    return {
      dragPan: $ === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function Vo() {
    const v = $ === "select";
    h.style.cursor = v ? "grab" : "crosshair", L && L.setProps({ controller: Ra() });
  }
  function Na() {
    const v = Math.max(1, Number(i.get("width")) || 400), x = Math.max(1, Number(i.get("height")) || 400);
    c.style.width = `${v}px`, c.style.maxWidth = "100%", u.style.height = `${x}px`, d.style.width = "", d.style.height = "", d.style.maxWidth = "", d.style.aspectRatio = "";
  }
  function yt() {
    const v = Math.max(1, Math.round(d.clientWidth || i.get("width") || 400)), x = Math.max(1, Math.round(d.clientHeight || i.get("height") || 400));
    h.width !== v && (h.width = v), h.height !== x && (h.height = x), L && L.setProps({ width: v, height: x });
    const A = i.get("axes_pixel_bounds") || [0, 0, v, x];
    return (A[2] !== v || A[3] !== x) && (i.set("axes_pixel_bounds", [0, 0, v, x]), i.save_changes()), { w: v, h: x };
  }
  function Yo(v) {
    if (!Number.isFinite(v)) return "";
    const x = Math.abs(v);
    return x !== 0 && (x >= 1e3 || x < 0.01) ? v.toExponential(1) : x >= 100 ? v.toFixed(0) : x >= 10 ? v.toFixed(1) : v.toFixed(2);
  }
  function Pl() {
    if (!b) return;
    const v = i.get("color_by") || "categorical", x = i.get("legend_title") || "", A = i.get("point_palette") || [];
    if (i.get("legend_labels"), b.innerHTML = "", x) {
      const R = document.createElement("div");
      R.className = "landmarks__legend-title", R.textContent = x, b.appendChild(R);
    }
    if (v === "continuous" && A.length > 1) {
      const R = document.createElement("div");
      R.className = "landmarks__legend-bar", R.style.background = `linear-gradient(to top, ${A[0]}, ${A[Math.floor(A.length / 2)]}, ${A[A.length - 1]})`;
      const H = document.createElement("div");
      H.className = "landmarks__legend-scale";
      const G = document.createElement("span");
      G.textContent = Yo(i.get("color_vmax"));
      const te = document.createElement("span");
      te.textContent = Yo(i.get("color_vmin")), H.appendChild(G), H.appendChild(te);
      const Y = document.createElement("div");
      Y.className = "landmarks__legend-continuous", Y.appendChild(R), Y.appendChild(H), b.appendChild(Y), b.hidden = !1;
      return;
    }
    if (v === "categorical") {
      b.hidden = !0;
      return;
    }
    b.hidden = !x;
  }
  function Ot(v, x) {
    const A = String(v || "#60a5fa").replace("#", ""), R = A.length === 3 ? A.split("").map((G) => G + G).join("") : A.padEnd(6, "0").slice(0, 6), H = Number.parseInt(R, 16);
    return [
      H >> 16 & 255,
      H >> 8 & 255,
      H & 255,
      Math.round(Math.max(0, Math.min(1, x)) * 255)
    ];
  }
  function Oa(v) {
    const x = i.get("point_opacity") ?? 0.75, A = i.get("color_by") || "categorical";
    let R;
    if (A === "continuous") {
      const G = i.get("point_palette") || ["#60a5fa"];
      if (G.length > 1) {
        const Y = Math.max(0, Math.min(1, v.valueA)) * (G.length - 1), I = Math.floor(Y), de = Math.min(G.length - 1, I + 1), xe = Y - I, ze = Ot(G[I], x), pe = Ot(G[de], x);
        R = ze.map((be, _t) => Math.round(be + (pe[_t] - be) * xe));
      } else
        R = Ot(G[0], x);
    } else {
      const G = i.get("category_columns") || [], te = C(), Y = te >= 0 ? G[te] : null, I = Y && Y.palette || i.get("point_palette") || ["#60a5fa"], de = Y ? V(v.i) : Math.round(v.valueA);
      R = Ot(I[(de % I.length + I.length) % I.length], x);
    }
    if (!Ae || !Se) return R;
    const H = Se[v.i] || 0;
    return H === xi || H === uu ? (R[3] = 255, R) : (R[3] = Math.round((R[3] || 255) * 0.28), R);
  }
  function Su(v) {
    const x = i.get("point_size") ?? 2;
    if (!Ae || !Se) return x;
    const A = Se[v.i] || 0;
    return A === xi || A === uu ? x : x * V_;
  }
  function Rn(v) {
    return v.map((x) => [x.x, x.y]);
  }
  function _u(v) {
    const x = Rn(v);
    if (!x.length) return x;
    const A = x[0], R = x[x.length - 1];
    return (A[0] !== R[0] || A[1] !== R[1]) && x.push(A), x;
  }
  function Eu(v, x) {
    if ($ === "ellipse") {
      const A = (v.x + x.x) / 2, R = (v.y + x.y) / 2, H = Math.abs(x.x - v.x) / 2, G = Math.abs(x.y - v.y) / 2, te = [];
      for (let Y = 0; Y < 64; Y++) {
        const I = Y / 64 * Math.PI * 2;
        te.push([A + H * Math.cos(I), R + G * Math.sin(I)]);
      }
      return te;
    }
    return [
      [v.x, v.y],
      [x.x, v.y],
      [x.x, x.y],
      [v.x, x.y]
    ];
  }
  function xl(v) {
    if (v.type === "polygon" || v.type === "lasso")
      return (v.vertices || []).map(([A, R]) => [A, R]);
    const x = -(v.angle || 0);
    if (v.type === "rectangle") {
      const A = v.cx, R = v.cy, H = v.width, G = v.height, te = { x: A, y: R };
      return [
        { x: A - H / 2, y: R - G / 2 },
        { x: A + H / 2, y: R - G / 2 },
        { x: A + H / 2, y: R + G / 2 },
        { x: A - H / 2, y: R + G / 2 }
      ].map((Y) => {
        const I = Yn(Y, te, x);
        return [I.x, I.y];
      });
    }
    if (v.type === "ellipse") {
      const A = v.cx, R = v.cy, H = v.rx, G = v.ry, te = { x: A, y: R }, Y = [];
      for (let I = 0; I < 64; I++) {
        const de = I / 64 * Math.PI * 2, xe = Yn(
          { x: A + H * Math.cos(de), y: R + G * Math.sin(de) },
          te,
          x
        );
        Y.push([xe.x, xe.y]);
      }
      return Y;
    }
    return [];
  }
  function dt() {
    const v = i.get("points_data") || "", [x, A] = i.get("x_bounds"), [R, H] = i.get("y_bounds"), G = `${v.length}:${x}:${A}:${R}:${H}:${v.slice(0, 32)}:${v.slice(-32)}`;
    if (G === ae.key) return ae.data;
    const te = Vg(v), Y = Math.floor(te.length / 4), I = new Array(Y);
    for (let de = 0; de < Y; de++) {
      const xe = de * 4;
      I[de] = {
        i: de,
        x: x + (te[xe] + 1) / 2 * (A - x),
        y: R + (te[xe + 1] + 1) / 2 * (H - R),
        valueA: te[xe + 2]
      };
    }
    return ae = { key: G, data: I }, I;
  }
  function _n(v, x = 8) {
    const A = v / Math.max(x, 1), H = 10 ** Math.floor(Math.log10(Math.max(A, 1e-12))), G = A / H;
    return (G <= 1 ? 1 : G <= 2 ? 2 : G <= 5 ? 5 : 10) * H;
  }
  function Ht() {
    const v = L?.isInitialized ? L.getViewports()?.[0] : null;
    if (v?.unproject && v.width > 1 && v.height > 1) {
      const [G, te] = v.unproject([0, v.height]), [Y, I] = v.unproject([v.width, 0]);
      return {
        xMin: Math.min(G, Y),
        xMax: Math.max(G, Y),
        yMin: Math.min(te, I),
        yMax: Math.max(te, I)
      };
    }
    const [x, A] = i.get("x_bounds"), [R, H] = i.get("y_bounds");
    return { xMin: x, xMax: A, yMin: R, yMax: H };
  }
  function Au() {
    const v = Ht(), x = Math.max(v.xMax - v.xMin, v.yMax - v.yMin, 1e-9);
    return _n(x, 8);
  }
  function Cu(v = !1) {
    const x = Au();
    !v && x === P || (P = x, ke());
  }
  function Tu() {
    if (!J) return null;
    const { PathLayer: v } = J, x = Ht(), A = P || _n(Math.max(x.xMax - x.xMin, x.yMax - x.yMin, 1e-9), 8);
    P = A;
    const R = A * 2, H = Math.floor((x.xMin - R) / A) * A, G = Math.floor((x.yMin - R) / A) * A, te = [];
    for (let pe = H; pe <= x.xMax + R + A * 0.5; pe += A)
      te.push({
        path: [
          [pe, x.yMin - R],
          [pe, x.yMax + R]
        ]
      });
    for (let pe = G; pe <= x.yMax + R + A * 0.5; pe += A)
      te.push({
        path: [
          [x.xMin - R, pe],
          [x.xMax + R, pe]
        ]
      });
    const Y = getComputedStyle(c).getPropertyValue("--lm-grid").trim() || getComputedStyle(c).getPropertyValue("--lm-border").trim() || "#94a3b8", [I, de, xe] = cu(Y), ze = [Math.round(I * 255), Math.round(de * 255), Math.round(xe * 255), 160];
    return new v({
      id: "landmarks-grid",
      data: te,
      getPath: (pe) => pe.path,
      getColor: ze,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function Da() {
    if (!J) return null;
    const { ScatterplotLayer: v } = J, x = dt();
    if (!x.length) return null;
    const R = [
      i.get("point_size") ?? 2,
      Ae,
      i.get("selected_kind"),
      i.get("selected_index"),
      i.get("type_neighborhoods"),
      i.get("selections"),
      i.get("active_category")
    ], H = [
      i.get("point_palette"),
      i.get("point_opacity"),
      i.get("color_by"),
      ...R
    ];
    return [
      new v({
        id: "landmarks-points",
        data: x,
        getPosition: (G) => [G.x, G.y, 0],
        getFillColor: (G) => Oa(G),
        getRadius: (G) => Su(G),
        radiusUnits: "common",
        radiusMinPixels: 0,
        stroked: !1,
        filled: !0,
        pickable: !1,
        updateTriggers: {
          getFillColor: H,
          getRadius: R
        }
      })
    ];
  }
  function ja() {
    if (!J) return [];
    const { PolygonLayer: v } = J, x = i.get("selected_kind"), A = i.get("selected_index"), R = getComputedStyle(c).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", H = [];
    return (i.get("selections") || []).forEach((G, te) => {
      const Y = xl(G);
      if (Y.length < 3) return;
      const I = x === "selection" && te === A;
      H.push({
        polygon: Y,
        fill: Ot(R, I ? 0.08 : 0.04),
        line: Ot(R, I ? 1 : 0.85),
        width: I ? 2.5 : 2,
        kind: "selection",
        index: te
      });
    }), H.length ? [
      new v({
        id: "selections",
        data: H,
        getPolygon: (G) => G.polygon,
        getFillColor: (G) => G.fill,
        getLineColor: (G) => G.line,
        getLineWidth: (G) => G.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: hl
      })
    ] : [];
  }
  function ka() {
    if (!J) return [];
    const { PathLayer: v, PolygonLayer: x, ScatterplotLayer: A } = J, R = i.get("selected_kind"), H = i.get("selected_index"), G = i.get("stroke_width") || 2, te = i.get("landmark_opacity") || 0.25, Y = [], I = [], de = [], xe = [], ze = Ua(14);
    (i.get("landmarks") || []).forEach((be, _t) => {
      if (be.hidden) return;
      const Jn = Gg[_t % Gg.length], $n = R === "landmark" && _t === H, Dn = $n ? G + 1 : G, Et = Ot(Jn, 1), aa = Ot(Jn, te), Dt = { kind: "landmark", index: _t };
      if (be.type === "point") {
        const wt = (be.vertices || [])[0];
        if (!wt) return;
        de.push({
          position: [wt[0], wt[1], 0],
          fill: Et,
          radius: $n ? 7 : 6,
          ...Dt
        });
        return;
      }
      const zt = Ha(be);
      if (be.type === "shape" && zt.length >= 3) {
        Y.push({
          polygon: Rn(zt),
          fill: aa,
          line: Et,
          width: Dn,
          ...Dt
        }), (be.vertices || []).forEach(([wt, fn]) => {
          de.push({
            position: [wt, fn, 0],
            fill: Et,
            radius: $n ? 5 : 4,
            ...Dt
          });
        });
        return;
      }
      const sn = Qo(be);
      if (sn && Y.push({
        polygon: Rn(sn),
        fill: Ot(Xs, H_),
        line: Ot(Xs, B_),
        width: 1.5,
        ...Dt
      }), zt.length >= 2) {
        const wt = Rn(zt);
        if (I.push({
          path: wt,
          color: Et,
          width: Dn,
          ...Dt
        }), ["line", "spline", "gradient"].includes(be.type)) {
          const fn = Wl(wt, ze);
          fn && xe.push({ polygon: fn, fill: Et, line: Et, width: 1, ...Dt });
        }
        (be.vertices || []).forEach(([fn, Pn]) => {
          de.push({
            position: [fn, Pn, 0],
            fill: Et,
            radius: $n ? 5 : 4,
            ...Dt
          });
        });
      }
    });
    const pe = [];
    return (Y.length || xe.length) && pe.push(
      new x({
        id: "landmark-polygons",
        data: [...Y, ...xe],
        getPolygon: (be) => be.polygon,
        getFillColor: (be) => be.fill,
        getLineColor: (be) => be.line,
        getLineWidth: (be) => be.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: hl
      })
    ), I.length && pe.push(
      new v({
        id: "landmark-paths",
        data: I,
        getPath: (be) => be.path,
        getColor: (be) => be.color,
        getWidth: (be) => be.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: hl
      })
    ), de.length && pe.push(
      new A({
        id: "landmark-markers",
        data: de,
        getPosition: (be) => be.position,
        getFillColor: (be) => be.fill,
        getRadius: (be) => be.radius,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: hl
      })
    ), pe;
  }
  function Vn() {
    if (!J) return [];
    const { PathLayer: v, PolygonLayer: x, ScatterplotLayer: A } = J, R = ["lasso", "polygon", "rectangle", "ellipse"].includes($), H = R ? "#94a3b8" : "#00e5ff", G = Ot(H, 1), te = Ot(H, 0.15), Y = i.get("stroke_width") || 4, I = [];
    let de = null, xe = null, ze = [];
    if (Tt && Mt.length >= 2)
      de = Rn(Mt);
    else if (Yt && ct && Ft)
      xe = Eu(ct, Ft);
    else if (F.length) {
      const pe = $ === "spline" ? St(F, i.get("default_tension") ?? 0, 20, !1) : $ === "shape" ? St(F, i.get("default_tension") ?? 0, 20, !0) : F;
      $ === "polygon" || $ === "shape" ? (xe = Rn(pe), de = _u(pe)) : de = Rn(pe), ze = F.map((be) => ({ position: [be.x, be.y, 0], fill: G }));
    }
    return xe && xe.length >= 3 ? I.push(
      new x({
        id: "draft-polygon",
        data: [{ polygon: xe, fill: te, line: G, width: 2 }],
        getPolygon: (pe) => pe.polygon,
        getFillColor: (pe) => pe.fill,
        getLineColor: (pe) => pe.line,
        getLineWidth: (pe) => pe.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: hl
      })
    ) : de && de.length >= 2 && I.push(
      new v({
        id: "draft-path",
        data: [{ path: de, color: G, width: R ? 2 : Y }],
        getPath: (pe) => pe.path,
        getColor: (pe) => pe.color,
        getWidth: (pe) => pe.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: hl
      })
    ), ze.length && I.push(
      new A({
        id: "draft-markers",
        data: ze,
        getPosition: (pe) => pe.position,
        getFillColor: (pe) => pe.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: hl
      })
    ), I;
  }
  function Ua(v) {
    const x = L?.isInitialized ? L.getViewports()?.[0] : null;
    if (!x?.unproject) return v;
    const [A] = x.unproject([0, 0]), [R] = x.unproject([v, 0]);
    return Math.max(Math.abs(R - A), 1e-9);
  }
  function Wl(v, x) {
    if (!v || v.length < 2 || !(x > 0)) return null;
    const A = v[v.length - 2], R = v[v.length - 1], H = Math.hypot(R[0] - A[0], R[1] - A[1]) || 1, G = (R[0] - A[0]) / H, te = (R[1] - A[1]) / H, Y = -te, I = G, de = [R[0] + G * x * 0.15, R[1] + te * x * 0.15], xe = [R[0] - G * x, R[1] - te * x];
    return [
      de,
      [xe[0] + Y * x * 0.55, xe[1] + I * x * 0.55],
      [xe[0] - Y * x * 0.55, xe[1] - I * x * 0.55]
    ];
  }
  function Mu(v, x, A) {
    if (!(x > 0) || !v.length) return;
    const R = dt(), H = x * x;
    for (let G = 0; G < R.length; G++) {
      if (A[G] === xi) continue;
      const te = R[G];
      for (let Y = 0; Y < v.length; Y++) {
        const I = R[v[Y]], de = te.x - I.x, xe = te.y - I.y;
        if (de * de + xe * xe <= H) {
          A[G] = uu;
          break;
        }
      }
    }
  }
  function qo(v, x, A) {
    const R = [], H = [];
    if (!D || !x.length) return { edges: R, neighbors: H };
    const G = Math.max(1, Math.min(A | 0, D.kMax | 0)), { indptr: te, indices: Y } = D, I = /* @__PURE__ */ new Set();
    for (const de of x) {
      const xe = te[de] | 0, ze = Math.min(te[de + 1] | 0, xe + G), pe = v[de];
      for (let be = xe; be < ze; be++) {
        const _t = Y[be] | 0;
        I.has(_t) || (I.add(_t), H.push(_t)), R.push({
          path: [
            [pe.x, pe.y],
            [v[_t].x, v[_t].y]
          ]
        });
      }
    }
    return { edges: R, neighbors: H };
  }
  function Ti() {
    const v = getComputedStyle(c).getPropertyValue("--lm-neigh-fill").trim() || G_;
    return Ot(v, 1);
  }
  function Fl() {
    if (!J) return [];
    const v = Nn(), x = On(v);
    if (!v || !x || x.neighborhood === "off") return [];
    const A = dt(), R = [], { PathLayer: H, ScatterplotLayer: G } = J, te = { kind: v.kind, index: v.index };
    if (x.neighborhood === "radius") {
      const Y = Number(x.neighborhood_radius) || 0;
      if (Y <= 0) return [];
      const I = [];
      if (Se)
        for (let ze = 0; ze < A.length; ze++)
          Se[ze] === xi && I.push({ x: A[ze].x, y: A[ze].y, ...te });
      if (!I.length) return [];
      const de = Re(), xe = de > 0 ? Math.min(Y, de) : Y;
      R.push(
        new G({
          id: "neighborhood-radius",
          data: I,
          getPosition: (ze) => [ze.x, ze.y, 0],
          getRadius: xe,
          radiusUnits: "common",
          radiusMinPixels: 0,
          radiusMaxPixels: 1e7,
          getFillColor: Ti(),
          stroked: !1,
          filled: !0,
          pickable: !0,
          // Opaque dim fill (alpha 255) — blend only so circle AA doesn't leave a hard rim.
          parameters: {
            ...hl,
            depthTest: !1,
            blend: !0
          },
          updateTriggers: { getRadius: xe }
        })
      );
    }
    if (x.neighborhood === "knn") {
      if (!we.length) return [];
      R.push(
        new H({
          id: "neighborhood-knn",
          data: we.map((Y) => ({ ...Y, ...te })),
          getPath: (Y) => Y.path,
          getColor: Ot(Xs, 0.45),
          getWidth: 1.25,
          widthUnits: "pixels",
          pickable: !0,
          parameters: hl
        })
      );
    }
    return R;
  }
  function Mi() {
    return Jo(), [
      Tu(),
      ...Fl(),
      ...Da(),
      ...ja(),
      ...ka(),
      ...Vn()
    ].filter(Boolean);
  }
  function La(v, x) {
    const [A, R] = i.get("x_bounds"), [H, G] = i.get("y_bounds"), te = (A + R) / 2, Y = (H + G) / 2, I = Math.max(R - A, 1e-6), de = Math.max(G - H, 1e-6), xe = 40, ze = Math.log2(
      Math.min((v - xe * 2) / I, (x - xe * 2) / de)
    );
    return {
      target: [te, Y, 0],
      zoom: ze,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function zi() {
    if (!L) return;
    const v = Math.max(1, h.clientWidth || h.width), x = Math.max(1, h.clientHeight || h.height);
    v <= 1 || x <= 1 || (le = La(v, x), ie = le.zoom, L.setProps({ viewState: le, width: v, height: x }), fe = !0);
  }
  function wi(v, { animate: x = !1, duration: A = 320 } = {}) {
    if (!L) return;
    const R = {
      ...le,
      ...v,
      transitionDuration: x ? A : 0
    };
    x && (!ee && J?.LinearInterpolator && (ee = new J.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), ee && (R.transitionInterpolator = ee), R.transitionEasing = Y_), le = R, L.setProps({ viewState: R });
  }
  We = (v) => {
    if (!L || !le) return;
    const x = le.minZoom ?? -20, A = le.maxZoom ?? 20, R = Math.max(x, Math.min(A, (le.zoom ?? 0) + v));
    wi({ zoom: R }, { animate: !0 });
  }, Fe = () => {
    if (!L) return;
    const v = Math.max(1, h.clientWidth || h.width), x = Math.max(1, h.clientHeight || h.height);
    if (v <= 1 || x <= 1) return;
    const A = La(v, x);
    ie = A.zoom, fe = !0, wi(
      {
        target: A.target,
        zoom: A.zoom,
        minZoom: A.minZoom,
        maxZoom: A.maxZoom
      },
      { animate: !0, duration: 320 }
    ), ke();
  };
  function Il() {
    const v = String(i.get("plot_background") || "").trim();
    if (v) return v;
    const x = getComputedStyle(c).getPropertyValue("--lm-bg").trim();
    return x || (c.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  g = () => {
    const v = Il();
    f.style.background = v, h.style.background = v, L && (L.setProps({
      parameters: { clearColor: cu(v) },
      ...le ? { viewState: le } : {}
    }), typeof L.redraw == "function" && L.redraw(!0));
  };
  function ea(v) {
    if (!L) return;
    const x = Il();
    L.setProps({
      parameters: { clearColor: cu(x) },
      ...v,
      ...le ? { viewState: le } : {}
    });
  }
  function ke() {
    !L || !J || me || (me = requestAnimationFrame(() => {
      me = 0, ea({ layers: Mi() });
    }));
  }
  async function Xo() {
    if (J) return J;
    const v = await import(
      /* @vite-ignore */
      U_
    ), x = await import(
      /* @vite-ignore */
      L_
    );
    return J = {
      Deck: v.Deck,
      OrthographicView: v.OrthographicView,
      LinearInterpolator: v.LinearInterpolator,
      ScatterplotLayer: x.ScatterplotLayer,
      PathLayer: x.PathLayer,
      PolygonLayer: x.PolygonLayer
    }, J;
  }
  async function En() {
    if (L) return;
    Na();
    const { w: v, h: x } = yt();
    h.style.display = "block", g();
    try {
      const { Deck: A, OrthographicView: R } = await Xo(), H = Mi();
      if (!H.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const G = La(v, x);
      le = G, ie = G.zoom;
      const te = Il();
      L = new A({
        canvas: h,
        width: v,
        height: x,
        views: new R(),
        controller: Ra(),
        initialViewState: G,
        parameters: { clearColor: cu(te) },
        layers: H,
        pickingRadius: 8,
        getCursor: ({ isDragging: Y, isHovering: I }) => Y ? "grabbing" : I ? "pointer" : $ === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: Y }) => {
          le = Y, L.setProps({ viewState: Y }), Cu();
        },
        onClick: (Y) => {
          if ($ !== "select") return;
          const I = Y?.object;
          I?.kind === "landmark" || I?.kind === "selection" || I?.kind === "type" ? Qn(I.kind, I.index) : Qn("", -1);
        },
        onHover: (Y) => {
          const I = Y?.object;
          if (I?.kind === "landmark" || I?.kind === "selection" || I?.kind === "type") {
            h.style.cursor = "pointer";
            return;
          }
          $ === "select" ? h.style.cursor = "grab" : h.style.cursor = "crosshair";
        },
        onLoad: () => {
          Pl(), requestAnimationFrame(() => {
            yt(), zi(), ea({ layers: Mi() }), typeof L.redraw == "function" && L.redraw(!0);
          });
        }
      }), Vo();
    } catch (A) {
      console.error("landmarks deck init failed", A);
      const R = document.createElement("div");
      R.className = "landmarks__error", R.textContent = `Deck renderer failed: ${A?.message || A}`, f.appendChild(R);
    }
  }
  function xt() {
    if (!L) return;
    const { w: v, h: x } = yt();
    ea({ width: v, height: x }), !fe && v > 1 && x > 1 ? zi() : typeof L.redraw == "function" && L.redraw(!0);
  }
  function St(v, x, A, R) {
    const H = A, te = (1 - Math.max(0, Math.min(1, x ?? 0))) / 2;
    let Y = v.slice(), I, de;
    if (R) {
      if (Y.length >= 2) {
        const pe = Y[0], be = Y[Y.length - 1];
        pe.x === be.x && pe.y === be.y && (Y = Y.slice(0, -1));
      }
      if (Y.length < 3) return Y.slice();
      const ze = Y.length;
      de = (pe) => Y[(pe % ze + ze) % ze], I = ze;
    } else {
      if (Y.length < 2 || Y.length === 2) return Y.slice();
      const ze = [
        { x: 2 * Y[0].x - Y[1].x, y: 2 * Y[0].y - Y[1].y },
        ...Y,
        {
          x: 2 * Y[Y.length - 1].x - Y[Y.length - 2].x,
          y: 2 * Y[Y.length - 1].y - Y[Y.length - 2].y
        }
      ];
      de = (pe) => ze[pe + 1], I = Y.length - 1;
    }
    const xe = [];
    for (let ze = 0; ze < I; ze++) {
      const pe = de(ze - 1), be = de(ze), _t = de(ze + 1), Jn = de(ze + 2), $n = te * (_t.x - pe.x), Dn = te * (_t.y - pe.y), Et = te * (Jn.x - be.x), aa = te * (Jn.y - be.y);
      for (let Dt = 0; Dt < H; Dt++) {
        const zt = Dt / H, sn = zt * zt, wt = sn * zt, fn = 2 * wt - 3 * sn + 1, Pn = wt - 2 * sn + zt, ia = -2 * wt + 3 * sn, Di = wt - sn;
        xe.push({
          x: fn * be.x + Pn * $n + ia * _t.x + Di * Et,
          y: fn * be.y + Pn * Dn + ia * _t.y + Di * aa
        });
      }
    }
    return xe.push({ ...de(R ? I : Y.length - 1) }), xe;
  }
  function Yn(v, x, A) {
    const R = Math.cos(A), H = Math.sin(A), G = v.x - x.x, te = v.y - x.y;
    return { x: x.x + G * R - te * H, y: x.y + G * H + te * R };
  }
  function Ha(v) {
    const x = (v.vertices || []).map(([A, R]) => ({ x: A, y: R }));
    return v.type === "spline" || v.type === "gradient" ? St(x, v.tension ?? 0, 20, !1) : v.type === "shape" ? St(x, v.tension ?? 0, 20, !0) : x;
  }
  function Zo() {
    const [v, x] = i.get("x_bounds"), [A, R] = i.get("y_bounds");
    return 0.25 * Math.min(Math.abs(x - v), Math.abs(R - A));
  }
  function Ba(v, x) {
    return v.map((A, R) => {
      const H = v[Math.max(0, R - 1)], G = v[Math.min(v.length - 1, R + 1)], te = Math.hypot(G.x - H.x, G.y - H.y) || 1, Y = (G.x - H.x) / te, I = (G.y - H.y) / te;
      return { x: A.x - I * x, y: A.y + Y * x };
    });
  }
  function Qo(v) {
    const x = Number(v.buffer_width || 0);
    if (!(x > 0) || !Zs.includes(v.type)) return null;
    const A = Ha(v);
    if (A.length < 2) return null;
    const R = v.buffer_side || "both";
    return R === "left" ? [...A, ...Ba(A, x).reverse()] : R === "right" ? [...A, ...Ba(A, -x).reverse()] : [...Ba(A, x), ...Ba(A, -x).reverse()];
  }
  function Nn() {
    const v = i.get("selected_kind"), x = i.get("selected_index");
    return v === "type" || v === "selection" ? { kind: v, index: x } : null;
  }
  function Ga() {
    return i.get("selected_kind") === "landmark" ? { kind: "landmark", index: i.get("selected_index") } : null;
  }
  function On(v) {
    return v ? jv(
      v.kind,
      v.index,
      i.get("selections") || [],
      i.get("type_neighborhoods") || [],
      i.get("legend_labels") || [],
      i.get("active_category") || ""
    ) : null;
  }
  function Sl() {
    return On(Nn());
  }
  function ta() {
    const v = Ga();
    if (!v) return null;
    const x = i.get("landmarks") || [];
    return v.index >= 0 && v.index < x.length ? x[v.index] : null;
  }
  function qn(v) {
    const x = Nn();
    x && (kv(
      i,
      x.kind,
      x.index,
      v,
      i.get("selections") || [],
      i.get("type_neighborhoods") || [],
      i.get("legend_labels") || [],
      i.get("active_category") || ""
    ), ke());
  }
  function ht(v) {
    const x = dt();
    if (!v) return [];
    if (v.kind === "type")
      return x.reduce((A, R, H) => (V(H) === v.index && A.push(H), A), []);
    if (v.kind === "selection") {
      const A = (i.get("selections") || [])[v.index], R = xl(A || {});
      return R.length < 3 ? [] : x.reduce((H, G, te) => (Ko(G, R) && H.push(te), H), []);
    }
    return [];
  }
  function Ko(v, x) {
    let A = !1;
    for (let R = 0, H = x.length - 1; R < x.length; H = R++) {
      const G = x[R][0], te = x[R][1], Y = x[H][0], I = x[H][1];
      te > v.y != I > v.y && v.x < (Y - G) * (v.y - te) / (I - te + 1e-12) + G && (A = !A);
    }
    return A;
  }
  function Jo() {
    const v = dt();
    Se = new Uint8Array(v.length), Ae = !1, we = [];
    const x = Nn();
    if (!x) return;
    const A = ht(x);
    if (!A.length) {
      Ae = !0;
      return;
    }
    Ae = !0;
    for (const H of A) Se[H] = xi;
    const R = On(x);
    if (!(!R || R.neighborhood === "off")) {
      if (R.neighborhood === "radius") {
        let H = Number(R.neighborhood_radius) || 0;
        const G = Re();
        G > 0 && (H = Math.min(H, G)), H > 0 && Mu(A, H, Se);
        return;
      }
      if (R.neighborhood === "knn") {
        let H = Number(R.neighborhood_k) || 12;
        H = Math.min(H, ne());
        const G = qo(v, A, H);
        we = G.edges;
        for (const te of G.neighbors)
          Se[te] !== xi && (Se[te] = uu);
      }
    }
  }
  function Xn(v) {
    const x = Ga();
    x && (Uv(i, x.index, v, i.get("landmarks") || []), ke());
  }
  function Zn(v) {
    if (!L?.isInitialized || !v) return null;
    const A = L.pickObject({ x: v.px, y: v.py, radius: 8 })?.object;
    return A?.kind ? { kind: A.kind, index: A.index } : null;
  }
  function Qn(v, x) {
    rf(i, v, x), ke();
  }
  function An() {
    Pl();
  }
  function Ri() {
    if (!["polygon", "line", "spline", "shape"].includes($)) return;
    const x = $ === "line" || $ === "spline" ? 2 : 3;
    if (F.length < x) {
      F = [], ke();
      return;
    }
    if ($ === "polygon") {
      const H = [...i.get("selections") || []];
      H.push(ru({
        id: Jl(H),
        type: "polygon",
        vertices: F.map((G) => [G.x, G.y])
      })), F = [], i.set("selections", H), i.set("selected_kind", "selection"), i.set("selected_index", H.length - 1), i.save_changes(), An(), ke();
      return;
    }
    const A = [...i.get("landmarks") || []], R = {
      id: Go(A),
      type: $,
      vertices: F.map((H) => [H.x, H.y])
    };
    ($ === "spline" || $ === "shape") && (R.tension = i.get("default_tension") ?? 0), Zs.includes($) && (R.buffer_width = i.get("default_buffer_width") ?? 0, R.buffer_side = i.get("default_buffer_side") || "both"), A.push(R), F = [], i.set("landmarks", A), i.set("selected_kind", "landmark"), i.set("selected_index", A.length - 1), i.save_changes(), An(), ke();
  }
  function zu(v, x) {
    if (L?.isInitialized) {
      const A = L.getViewports()[0];
      if (A) {
        const R = A.unproject([0, 0]), H = A.unproject([v, x]);
        return { dx: H[0] - R[0], dy: H[1] - R[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function Va(v, x, A, R) {
    const { dx: H, dy: G } = zu(A, R);
    if (v === "landmark") {
      const te = i.get("landmarks") || [];
      i.set(
        "landmarks",
        te.map(
          (Y, I) => I !== x ? Y : { ...Y, vertices: (Y.vertices || []).map(([de, xe]) => [de + H, xe + G]) }
        )
      );
    } else {
      const te = i.get("selections") || [];
      i.set(
        "selections",
        te.map((Y, I) => I !== x ? Y : Y.vertices ? { ...Y, vertices: Y.vertices.map(([de, xe]) => [de + H, xe + G]) } : { ...Y, cx: Y.cx + H, cy: Y.cy + G })
      );
    }
    i.save_changes(), ke();
  }
  function Ya(v) {
    if ($ === "select") return;
    v.preventDefault(), h.focus();
    const x = $l(v);
    if (!x) return;
    _e = !1;
    const A = Zn(x);
    if ($ === "lasso") {
      if (A && A.kind === i.get("selected_kind") && A.index === i.get("selected_index")) {
        oe = !0, he = x, Te = A.kind, Ie = A.index;
        return;
      }
      if (A) {
        Qn(A.kind, A.index), Vt = !0;
        return;
      }
      Tt = !0, Mt = [x], ke();
      return;
    }
    if ($ === "rectangle" || $ === "ellipse") {
      if (A && A.kind === i.get("selected_kind") && A.index === i.get("selected_index")) {
        oe = !0, he = x, Te = A.kind, Ie = A.index;
        return;
      }
      if (A) {
        Qn(A.kind, A.index), Vt = !0;
        return;
      }
      Yt = !0, ct = x, Ft = x, ke();
      return;
    }
    if (F.length === 0) {
      const R = i.get("selected_kind"), H = i.get("selected_index");
      if (A && A.kind === R && A.index === H) {
        oe = !0, he = x, Te = A.kind, Ie = A.index, h.style.cursor = "grabbing";
        return;
      }
      if (A) {
        Qn(A.kind, A.index), Vt = !0;
        return;
      }
      H >= 0 && Qn("", -1);
    }
  }
  function Cn(v) {
    const x = $l(v);
    if (!x) return;
    if (oe && he && Ie >= 0) {
      const H = x.px - he.px, G = x.py - he.py;
      (H || G) && (_e = !0), Va(Te, Ie, H, G), he = x;
      return;
    }
    if (Tt) {
      Mt.push(x), ke();
      return;
    }
    if (Yt) {
      Ft = x, ke();
      return;
    }
    if (F.length > 0 && ["polygon", "line", "spline", "shape"].includes($)) {
      const H = $ === "line" || $ === "spline" ? 2 : 3;
      E(F.length >= H ? "Enter to finish" : "Click", v.clientX, v.clientY);
      return;
    }
    if ($ === "select") return;
    const R = Zn(x);
    if (R && (R.kind === "landmark" || R.kind === "selection")) {
      const G = (R.kind === "landmark" ? i.get("landmarks") : i.get("selections"))?.[R.index]?.id;
      if (G) {
        E(String(G), v.clientX, v.clientY);
        return;
      }
    }
    M();
  }
  function Zt(v) {
    if ($ === "select" && !oe) return;
    const x = $l(v);
    if (Tt) {
      if (Tt = !1, Mt.length >= 3) {
        const A = [...i.get("selections") || []];
        A.push(ru({
          id: Jl(A),
          type: "lasso",
          vertices: Mt.map((R) => [R.x, R.y])
        })), i.set("selections", A), i.set("selected_kind", "selection"), i.set("selected_index", A.length - 1), i.save_changes();
      }
      Mt = [], An(), ke();
      return;
    }
    if (Yt) {
      if (Yt = !1, ct && Ft) {
        const A = ct, R = Ft, H = (A.x + R.x) / 2, G = (A.y + R.y) / 2, te = Math.abs(R.x - A.x), Y = Math.abs(R.y - A.y);
        if (te > 1e-6 && Y > 1e-6) {
          const I = [...i.get("selections") || []];
          $ === "rectangle" ? I.push(ru({ id: Jl(I), type: "rectangle", cx: H, cy: G, width: te, height: Y, angle: 0 })) : I.push(ru({ id: Jl(I), type: "ellipse", cx: H, cy: G, rx: te / 2, ry: Y / 2, angle: 0 })), i.set("selections", I), i.set("selected_kind", "selection"), i.set("selected_index", I.length - 1), i.save_changes();
        }
      }
      ct = null, Ft = null, An(), ke();
      return;
    }
    if (oe && (oe = !1, he = null, Te = "", Ie = -1, h.style.cursor = "crosshair", _e)) {
      Vt = !0, _e = !1;
      return;
    }
    if (Vt) {
      Vt = !1;
      return;
    }
    if (x && !($ === "select" || $ === "lasso" || $ === "rectangle" || $ === "ellipse")) {
      if ($ === "point") {
        const A = [...i.get("landmarks") || []];
        A.push({ id: Go(A), type: "point", vertices: [[x.x, x.y]] }), i.set("landmarks", A), i.set("selected_kind", "landmark"), i.set("selected_index", A.length - 1), i.save_changes(), An(), ke();
        return;
      }
      F.push({ x: x.x, y: x.y }), ke();
    }
  }
  function $o() {
    M(), oe && (oe = !1, he = null), Tt && (Tt = !1, Mt = [], ke()), Yt && (Yt = !1, ct = null, Ft = null, ke());
  }
  function wu(v) {
    v.preventDefault(), F.length && F.pop(), Ri(), M();
  }
  function Ni(v) {
    v.key === "Enter" ? (v.preventDefault(), Ri(), M()) : v.key === "Escape" ? (wa(), Qn("", -1), ke()) : (v.key === "Backspace" || v.key === "Delete") && F.length && (F.pop(), ke());
  }
  const Oi = new AbortController(), { signal: cn } = Oi;
  h.addEventListener(
    "wheel",
    (v) => {
      if (!v.shiftKey) return;
      const x = ta();
      if (x && Zs.includes(x.type)) {
        v.preventDefault(), v.stopImmediatePropagation();
        const te = Zo(), Y = te / 40, I = Math.max(
          0,
          Math.min(te, (Number(x.buffer_width) || 0) + (v.deltaY > 0 ? -Y : Y))
        );
        Xn({ buffer_width: I });
        return;
      }
      const A = Sl();
      if (!A) return;
      if (v.preventDefault(), v.stopImmediatePropagation(), A.neighborhood === "knn") {
        const te = ne(), Y = Math.max(
          1,
          Math.min(te, (Number(A.neighborhood_k) || 12) + (v.deltaY > 0 ? -1 : 1))
        );
        qn({ neighborhood: "knn", neighborhood_k: Y });
        return;
      }
      const R = Re(), H = R / 40, G = Math.max(
        0,
        Math.min(R, (Number(A.neighborhood_radius) || 0) + (v.deltaY > 0 ? -H : H))
      );
      qn({ neighborhood: "radius", neighborhood_radius: G });
    },
    { capture: !0, passive: !1, signal: cn }
  ), h.addEventListener("mousedown", Ya, { signal: cn }), h.addEventListener("mousemove", Cn, { signal: cn }), h.addEventListener("mouseup", Zt, { signal: cn }), h.addEventListener("mouseleave", $o, { signal: cn }), h.addEventListener("dblclick", wu, { signal: cn }), h.addEventListener("keydown", Ni, { signal: cn });
  const Po = [];
  function nt(v, x) {
    const A = `change:${v}`;
    i.on(A, x), Po.push(() => i.off?.(A, x));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((v) => {
    nt(v, () => {
      ke(), An();
    });
  }), nt("mode", () => {
    $ = i.get("mode"), wa(), Vo(), ke();
  }), nt("width", () => {
    Na(), yt(), ke();
  }), nt("height", () => {
    Na(), yt(), ke();
  }), nt("points_data", () => {
    ae = { key: "", data: [] }, L ? ke() : En(), Pl();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((v) => {
    nt(v, () => {
      L && ke(), Pl();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((v) => {
    nt(v, () => {
      ke();
    });
  }), nt("category_codes", () => {
    X(), ke();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "neighbor_radius_max", "neighbor_k_max"].forEach((v) => {
    nt(v, () => {
      ce(), L && ke();
    });
  }), ["category_columns", "active_category"].forEach((v) => {
    nt(v, () => {
      An(), ke();
    });
  }), nt("plot_background", () => g()), An(), Na();
  let na = null, _l = 0, la = !1;
  const Kn = () => {
    if (la) return;
    const v = d.clientWidth, x = d.clientHeight;
    if (v <= 1 || x <= 1) {
      _l = requestAnimationFrame(Kn);
      return;
    }
    _l = requestAnimationFrame(async () => {
      if (await En(), la) {
        L && typeof L.finalize == "function" && L.finalize(), L = null;
        return;
      }
      ke(), na = new ResizeObserver(() => xt()), na.observe(d);
    });
  };
  _l = requestAnimationFrame(Kn);
  function Wo() {
    la = !0, Oi.abort(), Po.forEach((v) => v()), z.disconnect(), na?.disconnect(), _l && cancelAnimationFrame(_l), me && cancelAnimationFrame(me), L && typeof L.finalize == "function" && L.finalize(), L = null, r.replaceChildren();
  }
  return { zoomBy: (v) => We(v), resetZoom: () => Fe(), destroy: Wo };
}
function q_(i, r) {
  const c = S.useRef(r);
  c.current = r;
  const u = (h) => {
    const b = c.current.map((p) => {
      const g = `change:${String(p)}`, z = () => h();
      return i.on(g, z), { event: g, handler: z };
    });
    return () => {
      for (const { event: p, handler: g } of b)
        i.off?.(p, g);
    };
  }, d = () => {
    const h = {};
    for (const b of c.current)
      h[String(b)] = i.get(String(b));
    return JSON.stringify(h);
  }, f = S.useSyncExternalStore(u, d, d);
  return JSON.parse(f);
}
const X_ = [
  "mode",
  "modes",
  "selections",
  "landmarks",
  "selected_kind",
  "selected_index",
  "category_columns",
  "active_category",
  "legend_labels",
  "type_neighborhoods",
  "default_tension",
  "neighbor_radius_max",
  "neighbor_k_max",
  "x_bounds",
  "y_bounds"
];
function Z_(i) {
  const r = q_(i, X_);
  return {
    ...r,
    setMode(c) {
      R_(i, c);
    },
    select(c, u) {
      rf(i, c, u);
    },
    setActiveCategory(c) {
      Bg(i, c);
    },
    selectType(c, u) {
      c.name !== r.active_category && Bg(i, c), rf(i, "type", u);
    },
    patchNeighborhood(c) {
      kv(
        i,
        r.selected_kind,
        r.selected_index,
        c,
        r.selections,
        r.type_neighborhoods,
        r.legend_labels,
        r.active_category
      );
    },
    patchLandmark(c) {
      r.selected_kind !== "landmark" || r.selected_index < 0 || Uv(i, r.selected_index, c, r.landmarks);
    },
    deleteSelection(c) {
      N_(
        i,
        c,
        r.selections,
        r.selected_kind,
        r.selected_index
      );
    },
    deleteLandmark(c) {
      O_(
        i,
        c,
        r.landmarks,
        r.selected_kind,
        r.selected_index
      );
    },
    renameSelection(c, u) {
      D_(i, c, u, r.selections);
    },
    renameLandmark(c, u) {
      j_(i, c, u, r.landmarks);
    },
    toggleLandmarkHidden(c) {
      k_(i, c, r.landmarks);
    },
    activeNeighborhood() {
      return jv(
        r.selected_kind,
        r.selected_index,
        r.selections,
        r.type_neighborhoods,
        r.legend_labels,
        r.active_category
      );
    },
    selectedLandmark() {
      return r.selected_kind !== "landmark" || r.selected_index < 0 ? null : r.landmarks[r.selected_index] ?? null;
    }
  };
}
function Q_({
  model: i,
  hostEl: r
}) {
  const c = Iy(r.parentElement), u = Z_(i), d = S.useRef(null), f = S.useRef(null);
  return S.useEffect(() => {
    const h = d.current;
    if (!h) return;
    const b = Yg({ model: i, host: h });
    return f.current = b, () => {
      b.destroy(), f.current = null;
    };
  }, [i, Yg]), /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: He(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        c && "dark landmarks--dark",
        !c && "landmarks--light"
      ),
      children: [
        /* @__PURE__ */ y.jsx("div", { className: "landmarks__body", children: /* @__PURE__ */ y.jsxs("div", { className: "landmarks__figure", children: [
          /* @__PURE__ */ y.jsx(
            T_,
            {
              modes: u.modes,
              mode: u.mode,
              onMode: (h) => u.setMode(h)
            }
          ),
          /* @__PURE__ */ y.jsxs("div", { className: "landmarks__main landmarks__main--plot", children: [
            /* @__PURE__ */ y.jsx("div", { ref: d, className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full" }),
            /* @__PURE__ */ y.jsx(
              w_,
              {
                onZoomIn: () => f.current?.zoomBy(1),
                onZoomOut: () => f.current?.zoomBy(-1),
                onReset: () => f.current?.resetZoom()
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ y.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ y.jsx(
            "div",
            {
              className: "absolute top-12 left-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (h) => h.stopPropagation(),
              onWheel: (h) => h.stopPropagation(),
              children: /* @__PURE__ */ y.jsx(M_, { lm: u })
            }
          ),
          /* @__PURE__ */ y.jsx(
            "div",
            {
              className: "absolute top-12 right-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (h) => h.stopPropagation(),
              onWheel: (h) => h.stopPropagation(),
              children: /* @__PURE__ */ y.jsx(z_, { lm: u })
            }
          )
        ] })
      ]
    }
  );
}
const Eo = /* @__PURE__ */ new WeakMap();
function K_({ model: i, el: r }) {
  const c = Eo.get(r);
  c && (c.unmount(), Eo.delete(r));
  const u = Wy.createRoot(r);
  return Eo.set(r, u), u.render(/* @__PURE__ */ y.jsx(Q_, { model: i, hostEl: r })), () => {
    u.unmount(), Eo.get(r) === u && Eo.delete(r);
  };
}
const I_ = { render: K_ };
export {
  I_ as default
};
