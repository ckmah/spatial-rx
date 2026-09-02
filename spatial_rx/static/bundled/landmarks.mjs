var iy = (n) => {
  throw TypeError(n);
};
var ry = (n, o, r) => o.has(n) || iy("Cannot " + r);
var Gn = (n, o, r) => (ry(n, o, "read from private field"), r ? r.call(n) : o.get(n)), ay = (n, o, r) => o.has(n) ? iy("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Ad = (n, o, r, a) => (ry(n, o, "write to private field"), a ? a.call(n, r) : o.set(n, r), r);
function WE(n, o) {
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
function eC(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Md = { exports: {} }, $a = {};
var sy;
function tC() {
  if (sy) return $a;
  sy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(a, c, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), c.key !== void 0 && (d = "" + c.key), "key" in c) {
      f = {};
      for (var h in c)
        h !== "key" && (f[h] = c[h]);
    } else f = c;
    return c = f.ref, {
      $$typeof: n,
      type: a,
      key: d,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return $a.Fragment = o, $a.jsx = r, $a.jsxs = r, $a;
}
var cy;
function nC() {
  return cy || (cy = 1, Md.exports = tC()), Md.exports;
}
var S = nC(), Td = { exports: {} }, Ja = {}, Od = { exports: {} }, Nd = {};
var uy;
function lC() {
  return uy || (uy = 1, (function(n) {
    function o(V, H) {
      var K = V.length;
      V.push(H);
      e: for (; 0 < K; ) {
        var Se = K - 1 >>> 1, ie = V[Se];
        if (0 < c(ie, H))
          V[Se] = H, V[K] = ie, K = Se;
        else break e;
      }
    }
    function r(V) {
      return V.length === 0 ? null : V[0];
    }
    function a(V) {
      if (V.length === 0) return null;
      var H = V[0], K = V.pop();
      if (K !== H) {
        V[0] = K;
        e: for (var Se = 0, ie = V.length, k = ie >>> 1; Se < k; ) {
          var X = 2 * (Se + 1) - 1, W = V[X], te = X + 1, ge = V[te];
          if (0 > c(W, K))
            te < ie && 0 > c(ge, W) ? (V[Se] = ge, V[te] = K, Se = te) : (V[Se] = W, V[X] = K, Se = X);
          else if (te < ie && 0 > c(ge, K))
            V[Se] = ge, V[te] = K, Se = te;
          else break e;
        }
      }
      return H;
    }
    function c(V, H) {
      var K = V.sortIndex - H.sortIndex;
      return K !== 0 ? K : V.id - H.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, h = d.now();
      n.unstable_now = function() {
        return d.now() - h;
      };
    }
    var g = [], p = [], y = 1, v = null, x = 3, C = !1, _ = !1, T = !1, N = !1, M = typeof setTimeout == "function" ? setTimeout : null, A = typeof clearTimeout == "function" ? clearTimeout : null, w = typeof setImmediate < "u" ? setImmediate : null;
    function z(V) {
      for (var H = r(p); H !== null; ) {
        if (H.callback === null) a(p);
        else if (H.startTime <= V)
          a(p), H.sortIndex = H.expirationTime, o(g, H);
        else break;
        H = r(p);
      }
    }
    function I(V) {
      if (T = !1, z(V), !_)
        if (r(g) !== null)
          _ = !0, Y || (Y = !0, ue());
        else {
          var H = r(p);
          H !== null && ye(I, H.startTime - V);
        }
    }
    var Y = !1, B = -1, L = 5, P = -1;
    function J() {
      return N ? !0 : !(n.unstable_now() - P < L);
    }
    function ae() {
      if (N = !1, Y) {
        var V = n.unstable_now();
        P = V;
        var H = !0;
        try {
          e: {
            _ = !1, T && (T = !1, A(B), B = -1), C = !0;
            var K = x;
            try {
              t: {
                for (z(V), v = r(g); v !== null && !(v.expirationTime > V && J()); ) {
                  var Se = v.callback;
                  if (typeof Se == "function") {
                    v.callback = null, x = v.priorityLevel;
                    var ie = Se(
                      v.expirationTime <= V
                    );
                    if (V = n.unstable_now(), typeof ie == "function") {
                      v.callback = ie, z(V), H = !0;
                      break t;
                    }
                    v === r(g) && a(g), z(V);
                  } else a(g);
                  v = r(g);
                }
                if (v !== null) H = !0;
                else {
                  var k = r(p);
                  k !== null && ye(
                    I,
                    k.startTime - V
                  ), H = !1;
                }
              }
              break e;
            } finally {
              v = null, x = K, C = !1;
            }
            H = void 0;
          }
        } finally {
          H ? ue() : Y = !1;
        }
      }
    }
    var ue;
    if (typeof w == "function")
      ue = function() {
        w(ae);
      };
    else if (typeof MessageChannel < "u") {
      var ee = new MessageChannel(), de = ee.port2;
      ee.port1.onmessage = ae, ue = function() {
        de.postMessage(null);
      };
    } else
      ue = function() {
        M(ae, 0);
      };
    function ye(V, H) {
      B = M(function() {
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
      return x;
    }, n.unstable_next = function(V) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = x;
      }
      var K = x;
      x = H;
      try {
        return V();
      } finally {
        x = K;
      }
    }, n.unstable_requestPaint = function() {
      N = !0;
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
      var K = x;
      x = V;
      try {
        return H();
      } finally {
        x = K;
      }
    }, n.unstable_scheduleCallback = function(V, H, K) {
      var Se = n.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? Se + K : Se) : K = Se, V) {
        case 1:
          var ie = -1;
          break;
        case 2:
          ie = 250;
          break;
        case 5:
          ie = 1073741823;
          break;
        case 4:
          ie = 1e4;
          break;
        default:
          ie = 5e3;
      }
      return ie = K + ie, V = {
        id: y++,
        callback: H,
        priorityLevel: V,
        startTime: K,
        expirationTime: ie,
        sortIndex: -1
      }, K > Se ? (V.sortIndex = K, o(p, V), r(g) === null && V === r(p) && (T ? (A(B), B = -1) : T = !0, ye(I, K - Se))) : (V.sortIndex = ie, o(g, V), _ || C || (_ = !0, Y || (Y = !0, ue()))), V;
    }, n.unstable_shouldYield = J, n.unstable_wrapCallback = function(V) {
      var H = x;
      return function() {
        var K = x;
        x = H;
        try {
          return V.apply(this, arguments);
        } finally {
          x = K;
        }
      };
    };
  })(Nd)), Nd;
}
var fy;
function oC() {
  return fy || (fy = 1, Od.exports = lC()), Od.exports;
}
var zd = { exports: {} }, lt = {};
var dy;
function iC() {
  if (dy) return lt;
  dy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), p = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), x = Symbol.iterator;
  function C(k) {
    return k === null || typeof k != "object" ? null : (k = x && k[x] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, T = Object.assign, N = {};
  function M(k, X, W) {
    this.props = k, this.context = X, this.refs = N, this.updater = W || _;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(k, X) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, X, "setState");
  }, M.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function A() {
  }
  A.prototype = M.prototype;
  function w(k, X, W) {
    this.props = k, this.context = X, this.refs = N, this.updater = W || _;
  }
  var z = w.prototype = new A();
  z.constructor = w, T(z, M.prototype), z.isPureReactComponent = !0;
  var I = Array.isArray;
  function Y() {
  }
  var B = { H: null, A: null, T: null, S: null }, L = Object.prototype.hasOwnProperty;
  function P(k, X, W) {
    var te = W.ref;
    return {
      $$typeof: n,
      type: k,
      key: X,
      ref: te !== void 0 ? te : null,
      props: W
    };
  }
  function J(k, X) {
    return P(k.type, X, k.props);
  }
  function ae(k) {
    return typeof k == "object" && k !== null && k.$$typeof === n;
  }
  function ue(k) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(W) {
      return X[W];
    });
  }
  var ee = /\/+/g;
  function de(k, X) {
    return typeof k == "object" && k !== null && k.key != null ? ue("" + k.key) : X.toString(36);
  }
  function ye(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(Y, Y) : (k.status = "pending", k.then(
          function(X) {
            k.status === "pending" && (k.status = "fulfilled", k.value = X);
          },
          function(X) {
            k.status === "pending" && (k.status = "rejected", k.reason = X);
          }
        )), k.status) {
          case "fulfilled":
            return k.value;
          case "rejected":
            throw k.reason;
        }
    }
    throw k;
  }
  function V(k, X, W, te, ge) {
    var Ae = typeof k;
    (Ae === "undefined" || Ae === "boolean") && (k = null);
    var qe = !1;
    if (k === null) qe = !0;
    else
      switch (Ae) {
        case "bigint":
        case "string":
        case "number":
          qe = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case n:
            case o:
              qe = !0;
              break;
            case y:
              return qe = k._init, V(
                qe(k._payload),
                X,
                W,
                te,
                ge
              );
          }
      }
    if (qe)
      return ge = ge(k), qe = te === "" ? "." + de(k, 0) : te, I(ge) ? (W = "", qe != null && (W = qe.replace(ee, "$&/") + "/"), V(ge, X, W, "", function(it) {
        return it;
      })) : ge != null && (ae(ge) && (ge = J(
        ge,
        W + (ge.key == null || k && k.key === ge.key ? "" : ("" + ge.key).replace(
          ee,
          "$&/"
        ) + "/") + qe
      )), X.push(ge)), 1;
    qe = 0;
    var Te = te === "" ? "." : te + ":";
    if (I(k))
      for (var Oe = 0; Oe < k.length; Oe++)
        te = k[Oe], Ae = Te + de(te, Oe), qe += V(
          te,
          X,
          W,
          Ae,
          ge
        );
    else if (Oe = C(k), typeof Oe == "function")
      for (k = Oe.call(k), Oe = 0; !(te = k.next()).done; )
        te = te.value, Ae = Te + de(te, Oe++), qe += V(
          te,
          X,
          W,
          Ae,
          ge
        );
    else if (Ae === "object") {
      if (typeof k.then == "function")
        return V(
          ye(k),
          X,
          W,
          te,
          ge
        );
      throw X = String(k), Error(
        "Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return qe;
  }
  function H(k, X, W) {
    if (k == null) return k;
    var te = [], ge = 0;
    return V(k, te, "", "", function(Ae) {
      return X.call(W, Ae, ge++);
    }), te;
  }
  function K(k) {
    if (k._status === -1) {
      var X = k._result;
      X = X(), X.then(
        function(W) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = W);
        },
        function(W) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = W);
        }
      ), k._status === -1 && (k._status = 0, k._result = X);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var Se = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var X = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(X)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, ie = {
    map: H,
    forEach: function(k, X, W) {
      H(
        k,
        function() {
          X.apply(this, arguments);
        },
        W
      );
    },
    count: function(k) {
      var X = 0;
      return H(k, function() {
        X++;
      }), X;
    },
    toArray: function(k) {
      return H(k, function(X) {
        return X;
      }) || [];
    },
    only: function(k) {
      if (!ae(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return lt.Activity = v, lt.Children = ie, lt.Component = M, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = w, lt.StrictMode = a, lt.Suspense = g, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return B.H.useMemoCache(k);
    }
  }, lt.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(k, X, W) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var te = T({}, k.props), ge = k.key;
    if (X != null)
      for (Ae in X.key !== void 0 && (ge = "" + X.key), X)
        !L.call(X, Ae) || Ae === "key" || Ae === "__self" || Ae === "__source" || Ae === "ref" && X.ref === void 0 || (te[Ae] = X[Ae]);
    var Ae = arguments.length - 2;
    if (Ae === 1) te.children = W;
    else if (1 < Ae) {
      for (var qe = Array(Ae), Te = 0; Te < Ae; Te++)
        qe[Te] = arguments[Te + 2];
      te.children = qe;
    }
    return P(k.type, ge, te);
  }, lt.createContext = function(k) {
    return k = {
      $$typeof: d,
      _currentValue: k,
      _currentValue2: k,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, k.Provider = k, k.Consumer = {
      $$typeof: f,
      _context: k
    }, k;
  }, lt.createElement = function(k, X, W) {
    var te, ge = {}, Ae = null;
    if (X != null)
      for (te in X.key !== void 0 && (Ae = "" + X.key), X)
        L.call(X, te) && te !== "key" && te !== "__self" && te !== "__source" && (ge[te] = X[te]);
    var qe = arguments.length - 2;
    if (qe === 1) ge.children = W;
    else if (1 < qe) {
      for (var Te = Array(qe), Oe = 0; Oe < qe; Oe++)
        Te[Oe] = arguments[Oe + 2];
      ge.children = Te;
    }
    if (k && k.defaultProps)
      for (te in qe = k.defaultProps, qe)
        ge[te] === void 0 && (ge[te] = qe[te]);
    return P(k, Ae, ge);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(k) {
    return { $$typeof: h, render: k };
  }, lt.isValidElement = ae, lt.lazy = function(k) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: k },
      _init: K
    };
  }, lt.memo = function(k, X) {
    return {
      $$typeof: p,
      type: k,
      compare: X === void 0 ? null : X
    };
  }, lt.startTransition = function(k) {
    var X = B.T, W = {};
    B.T = W;
    try {
      var te = k(), ge = B.S;
      ge !== null && ge(W, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(Y, Se);
    } catch (Ae) {
      Se(Ae);
    } finally {
      X !== null && W.types !== null && (X.types = W.types), B.T = X;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, lt.use = function(k) {
    return B.H.use(k);
  }, lt.useActionState = function(k, X, W) {
    return B.H.useActionState(k, X, W);
  }, lt.useCallback = function(k, X) {
    return B.H.useCallback(k, X);
  }, lt.useContext = function(k) {
    return B.H.useContext(k);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(k, X) {
    return B.H.useDeferredValue(k, X);
  }, lt.useEffect = function(k, X) {
    return B.H.useEffect(k, X);
  }, lt.useEffectEvent = function(k) {
    return B.H.useEffectEvent(k);
  }, lt.useId = function() {
    return B.H.useId();
  }, lt.useImperativeHandle = function(k, X, W) {
    return B.H.useImperativeHandle(k, X, W);
  }, lt.useInsertionEffect = function(k, X) {
    return B.H.useInsertionEffect(k, X);
  }, lt.useLayoutEffect = function(k, X) {
    return B.H.useLayoutEffect(k, X);
  }, lt.useMemo = function(k, X) {
    return B.H.useMemo(k, X);
  }, lt.useOptimistic = function(k, X) {
    return B.H.useOptimistic(k, X);
  }, lt.useReducer = function(k, X, W) {
    return B.H.useReducer(k, X, W);
  }, lt.useRef = function(k) {
    return B.H.useRef(k);
  }, lt.useState = function(k) {
    return B.H.useState(k);
  }, lt.useSyncExternalStore = function(k, X, W) {
    return B.H.useSyncExternalStore(
      k,
      X,
      W
    );
  }, lt.useTransition = function() {
    return B.H.useTransition();
  }, lt.version = "19.2.8", lt;
}
var py;
function hs() {
  return py || (py = 1, zd.exports = iC()), zd.exports;
}
var kd = { exports: {} }, Yn = {};
var hy;
function rC() {
  if (hy) return Yn;
  hy = 1;
  var n = hs();
  function o(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        p += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function f(g, p, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: p,
      implementation: y
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Yn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Yn.createPortal = function(g, p) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(o(299));
    return f(g, p, null, y);
  }, Yn.flushSync = function(g) {
    var p = d.T, y = a.p;
    try {
      if (d.T = null, a.p = 2, g) return g();
    } finally {
      d.T = p, a.p = y, a.d.f();
    }
  }, Yn.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, a.d.C(g, p));
  }, Yn.prefetchDNS = function(g) {
    typeof g == "string" && a.d.D(g);
  }, Yn.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var y = p.as, v = h(y, p.crossOrigin), x = typeof p.integrity == "string" ? p.integrity : void 0, C = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      y === "style" ? a.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: x,
          fetchPriority: C
        }
      ) : y === "script" && a.d.X(g, {
        crossOrigin: v,
        integrity: x,
        fetchPriority: C,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Yn.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var y = h(
            p.as,
            p.crossOrigin
          );
          a.d.M(g, {
            crossOrigin: y,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && a.d.M(g);
  }, Yn.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var y = p.as, v = h(y, p.crossOrigin);
      a.d.L(g, y, {
        crossOrigin: v,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Yn.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var y = h(p.as, p.crossOrigin);
        a.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else a.d.m(g);
  }, Yn.requestFormReset = function(g) {
    a.d.r(g);
  }, Yn.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, Yn.useFormState = function(g, p, y) {
    return d.H.useFormState(g, p, y);
  }, Yn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Yn.version = "19.2.8", Yn;
}
var my;
function Uv() {
  if (my) return kd.exports;
  my = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), kd.exports = rC(), kd.exports;
}
var gy;
function aC() {
  if (gy) return Ja;
  gy = 1;
  var n = oC(), o = hs(), r = Uv();
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
  function h(e) {
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
  function p(e) {
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
  var v = Object.assign, x = /* @__PURE__ */ Symbol.for("react.element"), C = /* @__PURE__ */ Symbol.for("react.transitional.element"), _ = /* @__PURE__ */ Symbol.for("react.portal"), T = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), A = /* @__PURE__ */ Symbol.for("react.consumer"), w = /* @__PURE__ */ Symbol.for("react.context"), z = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), Y = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), P = /* @__PURE__ */ Symbol.for("react.activity"), J = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
  function ue(e) {
    return e === null || typeof e != "object" ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ee = /* @__PURE__ */ Symbol.for("react.client.reference");
  function de(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ee ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case M:
        return "Profiler";
      case N:
        return "StrictMode";
      case I:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return "Portal";
        case w:
          return e.displayName || "Context";
        case A:
          return (e._context.displayName || "Context") + ".Consumer";
        case z:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case B:
          return t = e.displayName || null, t !== null ? t : de(e.type) || "Memo";
        case L:
          t = e._payload, e = e._init;
          try {
            return de(e(t));
          } catch {
          }
      }
    return null;
  }
  var ye = Array.isArray, V = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Se = [], ie = -1;
  function k(e) {
    return { current: e };
  }
  function X(e) {
    0 > ie || (e.current = Se[ie], Se[ie] = null, ie--);
  }
  function W(e, t) {
    ie++, Se[ie] = e.current, e.current = t;
  }
  var te = k(null), ge = k(null), Ae = k(null), qe = k(null);
  function Te(e, t) {
    switch (W(Ae, t), W(ge, e), W(te, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Mb(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Mb(t), e = Tb(t, e);
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
    X(te), W(te, e);
  }
  function Oe() {
    X(te), X(ge), X(Ae);
  }
  function it(e) {
    e.memoizedState !== null && W(qe, e);
    var t = te.current, l = Tb(t, e.type);
    t !== l && (W(ge, e), W(te, l));
  }
  function bt(e) {
    ge.current === e && (X(te), X(ge)), qe.current === e && (X(qe), Ka._currentValue = K);
  }
  var ke, et;
  function ze(e) {
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
  var Le = !1;
  function He(e, t) {
    if (!e || Le) return "";
    Le = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var he = function() {
                throw Error();
              };
              if (Object.defineProperty(he.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(he, []);
                } catch (le) {
                  var $ = le;
                }
                Reflect.construct(e, [], he);
              } else {
                try {
                  he.call();
                } catch (le) {
                  $ = le;
                }
                e.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (le) {
                $ = le;
              }
              (he = e()) && typeof he.catch == "function" && he.catch(function() {
              });
            }
          } catch (le) {
            if (le && $ && typeof le.stack == "string")
              return [le.stack, $.stack];
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
`), Z = E.split(`
`);
        for (s = i = 0; i < j.length && !j[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < Z.length && !Z[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === j.length || s === Z.length)
          for (i = j.length - 1, s = Z.length - 1; 1 <= i && 0 <= s && j[i] !== Z[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (j[i] !== Z[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || j[i] !== Z[s]) {
                  var ce = `
` + j[i].replace(" at new ", " at ");
                  return e.displayName && ce.includes("<anonymous>") && (ce = ce.replace("<anonymous>", e.displayName)), ce;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      Le = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? ze(l) : "";
  }
  function Me(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ze(e.type);
      case 16:
        return ze("Lazy");
      case 13:
        return e.child !== t && t !== null ? ze("Suspense Fallback") : ze("Suspense");
      case 19:
        return ze("SuspenseList");
      case 0:
      case 15:
        return He(e.type, !1);
      case 11:
        return He(e.type.render, !1);
      case 1:
        return He(e.type, !0);
      case 31:
        return ze("Activity");
      default:
        return "";
    }
  }
  function Qe(e) {
    try {
      var t = "", l = null;
      do
        t += Me(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Ne = Object.prototype.hasOwnProperty, $e = n.unstable_scheduleCallback, tt = n.unstable_cancelCallback, Xe = n.unstable_shouldYield, ve = n.unstable_requestPaint, F = n.unstable_now, se = n.unstable_getCurrentPriorityLevel, Ie = n.unstable_ImmediatePriority, Re = n.unstable_UserBlockingPriority, Ge = n.unstable_NormalPriority, nt = n.unstable_LowPriority, Ot = n.unstable_IdlePriority, wt = n.log, Yt = n.unstable_setDisableYieldValue, zt = null, xt = null;
  function Wt(e) {
    if (typeof wt == "function" && Yt(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(zt, e);
      } catch {
      }
  }
  var dt = Math.clz32 ? Math.clz32 : Mn, on = Math.log, pt = Math.LN2;
  function Mn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (on(e) / pt | 0) | 0;
  }
  var Tn = 256, kt = 262144, ot = 4194304;
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
  function Dt(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function On(e, t) {
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
  function Cn() {
    var e = ot;
    return ot <<= 1, (ot & 62914560) === 0 && (ot = 4194304), e;
  }
  function Ft(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function tl(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function jt(e, t, l, i, s, u) {
    var m = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var E = e.entanglements, j = e.expirationTimes, Z = e.hiddenUpdates;
    for (l = m & ~l; 0 < l; ) {
      var ce = 31 - dt(l), he = 1 << ce;
      E[ce] = 0, j[ce] = -1;
      var $ = Z[ce];
      if ($ !== null)
        for (Z[ce] = null, ce = 0; ce < $.length; ce++) {
          var le = $[ce];
          le !== null && (le.lane &= -536870913);
        }
      l &= ~he;
    }
    i !== 0 && lo(e, i, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(m & ~t));
  }
  function lo(e, t, l) {
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
  function fn(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : oo(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function oo(e) {
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
  function zl(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function nl() {
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Jb(e.type));
  }
  function vo(e, t) {
    var l = H.p;
    try {
      return H.p = e, t();
    } finally {
      H.p = l;
    }
  }
  var Rn = Math.random().toString(36).slice(2), _t = "__reactFiber$" + Rn, Rt = "__reactProps$" + Rn, Ye = "__reactContainer$" + Rn, Fn = "__reactEvents$" + Rn, Oi = "__reactListeners$" + Rn, Ni = "__reactHandles$" + Rn, ct = "__reactResources$" + Rn, io = "__reactMarker$" + Rn;
  function Yo(e) {
    delete e[_t], delete e[Rt], delete e[Fn], delete e[Oi], delete e[Ni];
  }
  function gl(e) {
    var t = e[_t];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ye] || l[_t]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Lb(e); e !== null; ) {
            if (l = e[_t]) return l;
            e = Lb(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function ll(e) {
    if (e = e[_t] || e[Ye]) {
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
    var t = e[ct];
    return t || (t = e[ct] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function rn(e) {
    e[io] = !0;
  }
  var an = /* @__PURE__ */ new Set(), Qn = {};
  function kl(e, t) {
    Fl(e, t), Fl(e + "Capture", t);
  }
  function Fl(e, t) {
    for (Qn[e] = t, e = 0; e < t.length; e++)
      an.add(t[e]);
  }
  var zi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), mr = {}, qo = {};
  function gr(e) {
    return Ne.call(qo, e) ? !0 : Ne.call(mr, e) ? !1 : zi.test(e) ? qo[e] = !0 : (mr[e] = !0, !1);
  }
  function ro(e, t, l) {
    if (gr(t))
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
  function Po(e, t, l) {
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
  function Zn(e, t, l, i) {
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
  function Bt(e) {
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
  function nn(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function $n(e, t, l) {
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
  function Ql(e) {
    if (!e._valueTracker) {
      var t = nn(e) ? "checked" : "value";
      e._valueTracker = $n(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function xo(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = nn(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Xo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var da = /[\n"\\]/g;
  function Nn(e) {
    return e.replace(
      da,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ki(e, t, l, i, s, u, m, E) {
    e.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.type = m : e.removeAttribute("type"), t != null ? m === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Bt(t)) : e.value !== "" + Bt(t) && (e.value = "" + Bt(t)) : m !== "submit" && m !== "reset" || e.removeAttribute("value"), t != null ? Ko(e, m, Bt(t)) : l != null ? Ko(e, m, Bt(l)) : i != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Bt(E) : e.removeAttribute("name");
  }
  function br(e, t, l, i, s, u, m, E) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Ql(e);
        return;
      }
      l = l != null ? "" + Bt(l) : "", t = t != null ? "" + Bt(t) : l, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = E ? e.checked : !!i, e.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.name = m), Ql(e);
  }
  function Ko(e, t, l) {
    t === "number" && Xo(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function rl(e, t, l, i) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < l.length; s++)
        t["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = t.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && i && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Bt(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, i && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function bl(e, t, l) {
    if (t != null && (t = "" + Bt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Bt(l) : "";
  }
  function ao(e, t, l, i) {
    if (t == null) {
      if (i != null) {
        if (l != null) throw Error(a(92));
        if (ye(i)) {
          if (1 < i.length) throw Error(a(93));
          i = i[0];
        }
        l = i;
      }
      l == null && (l = ""), t = l;
    }
    l = Bt(t), e.defaultValue = l, i = e.textContent, i === l && i !== "" && i !== null && (e.value = i), Ql(e);
  }
  function ln(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var so = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Zl(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || so.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function $l(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(a(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var s in t)
        i = t[s], t.hasOwnProperty(s) && l[s] !== i && Zl(e, s, i);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Zl(e, u, t[u]);
  }
  function yl(e) {
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
  var Di = /* @__PURE__ */ new Map([
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
  ]), R = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function O(e) {
    return R.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function D() {
  }
  var G = null;
  function ne(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var oe = null, be = null;
  function pe(e) {
    var t = ll(e);
    if (t && (e = t.stateNode)) {
      var l = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ki(
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
              'input[name="' + Nn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var i = l[t];
              if (i !== e && i.form === e.form) {
                var s = i[Rt] || null;
                if (!s) throw Error(a(90));
                ki(
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
              i = l[t], i.form === e.form && xo(i);
          }
          break e;
        case "textarea":
          bl(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && rl(e, !!l.multiple, t, !1);
      }
    }
  }
  var xe = !1;
  function Ue(e, t, l) {
    if (xe) return e(t, l);
    xe = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (xe = !1, (oe !== null || be !== null) && (rc(), oe && (t = oe, e = be, be = oe = null, pe(t), e)))
        for (t = 0; t < e.length; t++) pe(e[t]);
    }
  }
  function re(e, t) {
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
  var me = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), we = !1;
  if (me)
    try {
      var _e = {};
      Object.defineProperty(_e, "passive", {
        get: function() {
          we = !0;
        }
      }), window.addEventListener("test", _e, _e), window.removeEventListener("test", _e, _e);
    } catch {
      we = !1;
    }
  var ut = null, qt = null, St = null;
  function sn() {
    if (St) return St;
    var e, t = qt, l = t.length, i, s = "value" in ut ? ut.value : ut.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var m = l - e;
    for (i = 1; i <= m && t[l - i] === s[u - i]; i++) ;
    return St = s.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Pt(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function jn() {
    return !0;
  }
  function gn() {
    return !1;
  }
  function Xt(e) {
    function t(l, i, s, u, m) {
      this._reactName = l, this._targetInst = s, this.type = i, this.nativeEvent = u, this.target = m, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (l = e[E], this[E] = l ? l(u) : u[E]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? jn : gn, this.isPropagationStopped = gn, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = jn);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = jn);
      },
      persist: function() {
      },
      isPersistent: jn
    }), t;
  }
  var wn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, bn = Xt(wn), Jn = v({}, wn, { view: 0, detail: 0 }), yr = Xt(Jn), vr, xr, pa, Rs = v({}, Jn, {
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
    getModifierState: Nu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== pa && (pa && e.type === "mousemove" ? (vr = e.screenX - pa.screenX, xr = e.screenY - pa.screenY) : xr = vr = 0, pa = e), vr);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : xr;
    }
  }), Nh = Xt(Rs), J1 = v({}, Rs, { dataTransfer: 0 }), W1 = Xt(J1), eS = v({}, Jn, { relatedTarget: 0 }), Ou = Xt(eS), tS = v({}, wn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), nS = Xt(tS), lS = v({}, wn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), oS = Xt(lS), iS = v({}, wn, { data: 0 }), zh = Xt(iS), rS = {
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
  }, aS = {
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
  }, sS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function cS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = sS[e]) ? !!t[e] : !1;
  }
  function Nu() {
    return cS;
  }
  var uS = v({}, Jn, {
    key: function(e) {
      if (e.key) {
        var t = rS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Pt(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? aS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Nu,
    charCode: function(e) {
      return e.type === "keypress" ? Pt(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Pt(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), fS = Xt(uS), dS = v({}, Rs, {
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
  }), kh = Xt(dS), pS = v({}, Jn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Nu
  }), hS = Xt(pS), mS = v({}, wn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), gS = Xt(mS), bS = v({}, Rs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), yS = Xt(bS), vS = v({}, wn, {
    newState: 0,
    oldState: 0
  }), xS = Xt(vS), SS = [9, 13, 27, 32], zu = me && "CompositionEvent" in window, ha = null;
  me && "documentMode" in document && (ha = document.documentMode);
  var ES = me && "TextEvent" in window && !ha, Dh = me && (!zu || ha && 8 < ha && 11 >= ha), jh = " ", Lh = !1;
  function Vh(e, t) {
    switch (e) {
      case "keyup":
        return SS.indexOf(t.keyCode) !== -1;
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
  function Ih(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Sr = !1;
  function CS(e, t) {
    switch (e) {
      case "compositionend":
        return Ih(t);
      case "keypress":
        return t.which !== 32 ? null : (Lh = !0, jh);
      case "textInput":
        return e = t.data, e === jh && Lh ? null : e;
      default:
        return null;
    }
  }
  function RS(e, t) {
    if (Sr)
      return e === "compositionend" || !zu && Vh(e, t) ? (e = sn(), St = qt = ut = null, Sr = !1, e) : null;
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
        return Dh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var wS = {
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
  function Hh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!wS[e.type] : t === "textarea";
  }
  function Uh(e, t, l, i) {
    oe ? be ? be.push(i) : be = [i] : oe = i, t = pc(t, "onChange"), 0 < t.length && (l = new bn(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var ma = null, ga = null;
  function _S(e) {
    Eb(e, 0);
  }
  function ws(e) {
    var t = ol(e);
    if (xo(t)) return e;
  }
  function Bh(e, t) {
    if (e === "change") return t;
  }
  var Gh = !1;
  if (me) {
    var ku;
    if (me) {
      var Du = "oninput" in document;
      if (!Du) {
        var Yh = document.createElement("div");
        Yh.setAttribute("oninput", "return;"), Du = typeof Yh.oninput == "function";
      }
      ku = Du;
    } else ku = !1;
    Gh = ku && (!document.documentMode || 9 < document.documentMode);
  }
  function qh() {
    ma && (ma.detachEvent("onpropertychange", Ph), ga = ma = null);
  }
  function Ph(e) {
    if (e.propertyName === "value" && ws(ga)) {
      var t = [];
      Uh(
        t,
        ga,
        e,
        ne(e)
      ), Ue(_S, t);
    }
  }
  function AS(e, t, l) {
    e === "focusin" ? (qh(), ma = t, ga = l, ma.attachEvent("onpropertychange", Ph)) : e === "focusout" && qh();
  }
  function MS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ws(ga);
  }
  function TS(e, t) {
    if (e === "click") return ws(t);
  }
  function OS(e, t) {
    if (e === "input" || e === "change")
      return ws(t);
  }
  function NS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var vl = typeof Object.is == "function" ? Object.is : NS;
  function ba(e, t) {
    if (vl(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var s = l[i];
      if (!Ne.call(t, s) || !vl(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Xh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Kh(e, t) {
    var l = Xh(e);
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
      l = Xh(l);
    }
  }
  function Fh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Qh(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Xo(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Xo(e.document);
    }
    return t;
  }
  function ju(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var zS = me && "documentMode" in document && 11 >= document.documentMode, Er = null, Lu = null, ya = null, Vu = !1;
  function Zh(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Vu || Er == null || Er !== Xo(i) || (i = Er, "selectionStart" in i && ju(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), ya && ba(ya, i) || (ya = i, i = pc(Lu, "onSelect"), 0 < i.length && (t = new bn(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = Er)));
  }
  function ji(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Cr = {
    animationend: ji("Animation", "AnimationEnd"),
    animationiteration: ji("Animation", "AnimationIteration"),
    animationstart: ji("Animation", "AnimationStart"),
    transitionrun: ji("Transition", "TransitionRun"),
    transitionstart: ji("Transition", "TransitionStart"),
    transitioncancel: ji("Transition", "TransitionCancel"),
    transitionend: ji("Transition", "TransitionEnd")
  }, Iu = {}, $h = {};
  me && ($h = document.createElement("div").style, "AnimationEvent" in window || (delete Cr.animationend.animation, delete Cr.animationiteration.animation, delete Cr.animationstart.animation), "TransitionEvent" in window || delete Cr.transitionend.transition);
  function Li(e) {
    if (Iu[e]) return Iu[e];
    if (!Cr[e]) return e;
    var t = Cr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in $h)
        return Iu[e] = t[l];
    return e;
  }
  var Jh = Li("animationend"), Wh = Li("animationiteration"), em = Li("animationstart"), kS = Li("transitionrun"), DS = Li("transitionstart"), jS = Li("transitioncancel"), tm = Li("transitionend"), nm = /* @__PURE__ */ new Map(), Hu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Hu.push("scrollEnd");
  function Jl(e, t) {
    nm.set(e, t), kl(t, [e]);
  }
  var _s = typeof reportError == "function" ? reportError : function(e) {
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
  }, Dl = [], Rr = 0, Uu = 0;
  function As() {
    for (var e = Rr, t = Uu = Rr = 0; t < e; ) {
      var l = Dl[t];
      Dl[t++] = null;
      var i = Dl[t];
      Dl[t++] = null;
      var s = Dl[t];
      Dl[t++] = null;
      var u = Dl[t];
      if (Dl[t++] = null, i !== null && s !== null) {
        var m = i.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), i.pending = s;
      }
      u !== 0 && lm(l, s, u);
    }
  }
  function Ms(e, t, l, i) {
    Dl[Rr++] = e, Dl[Rr++] = t, Dl[Rr++] = l, Dl[Rr++] = i, Uu |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Bu(e, t, l, i) {
    return Ms(e, t, l, i), Ts(e);
  }
  function Vi(e, t) {
    return Ms(e, null, null, t), Ts(e);
  }
  function lm(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, i = u.alternate, i !== null && (i.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - dt(l), e = u.hiddenUpdates, i = e[s], i === null ? e[s] = [t] : i.push(t), t.lane = l | 536870912), u) : null;
  }
  function Ts(e) {
    if (50 < Ua)
      throw Ua = 0, $f = null, Error(a(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var wr = {};
  function LS(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function xl(e, t, l, i) {
    return new LS(e, t, l, i);
  }
  function Gu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function So(e, t) {
    var l = e.alternate;
    return l === null ? (l = xl(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function om(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Os(e, t, l, i, s, u) {
    var m = 0;
    if (i = e, typeof e == "function") Gu(e) && (m = 1);
    else if (typeof e == "string")
      m = BE(
        e,
        l,
        te.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case P:
          return e = xl(31, l, t, s), e.elementType = P, e.lanes = u, e;
        case T:
          return Ii(l.children, s, u, t);
        case N:
          m = 8, s |= 24;
          break;
        case M:
          return e = xl(12, l, t, s | 2), e.elementType = M, e.lanes = u, e;
        case I:
          return e = xl(13, l, t, s), e.elementType = I, e.lanes = u, e;
        case Y:
          return e = xl(19, l, t, s), e.elementType = Y, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case w:
                m = 10;
                break e;
              case A:
                m = 9;
                break e;
              case z:
                m = 11;
                break e;
              case B:
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
    return t = xl(m, l, t, s), t.elementType = e, t.type = i, t.lanes = u, t;
  }
  function Ii(e, t, l, i) {
    return e = xl(7, e, i, t), e.lanes = l, e;
  }
  function Yu(e, t, l) {
    return e = xl(6, e, null, t), e.lanes = l, e;
  }
  function im(e) {
    var t = xl(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function qu(e, t, l) {
    return t = xl(
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
  var rm = /* @__PURE__ */ new WeakMap();
  function jl(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = rm.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Qe(t)
      }, rm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Qe(t)
    };
  }
  var _r = [], Ar = 0, Ns = null, va = 0, Ll = [], Vl = 0, Fo = null, co = 1, uo = "";
  function Eo(e, t) {
    _r[Ar++] = va, _r[Ar++] = Ns, Ns = e, va = t;
  }
  function am(e, t, l) {
    Ll[Vl++] = co, Ll[Vl++] = uo, Ll[Vl++] = Fo, Fo = e;
    var i = co;
    e = uo;
    var s = 32 - dt(i) - 1;
    i &= ~(1 << s), l += 1;
    var u = 32 - dt(t) + s;
    if (30 < u) {
      var m = s - s % 5;
      u = (i & (1 << m) - 1).toString(32), i >>= m, s -= m, co = 1 << 32 - dt(t) + s | l << s | i, uo = u + e;
    } else
      co = 1 << u | l << s | i, uo = e;
  }
  function Pu(e) {
    e.return !== null && (Eo(e, 1), am(e, 1, 0));
  }
  function Xu(e) {
    for (; e === Ns; )
      Ns = _r[--Ar], _r[Ar] = null, va = _r[--Ar], _r[Ar] = null;
    for (; e === Fo; )
      Fo = Ll[--Vl], Ll[Vl] = null, uo = Ll[--Vl], Ll[Vl] = null, co = Ll[--Vl], Ll[Vl] = null;
  }
  function sm(e, t) {
    Ll[Vl++] = co, Ll[Vl++] = uo, Ll[Vl++] = Fo, co = t.id, uo = t.overflow, Fo = e;
  }
  var Ln = null, Qt = null, Et = !1, Qo = null, Il = !1, Ku = Error(a(519));
  function Zo(e) {
    var t = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw xa(jl(t, e)), Ku;
  }
  function cm(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[_t] = e, t[Rt] = i, l) {
      case "dialog":
        gt("cancel", t), gt("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        gt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ga.length; l++)
          gt(Ga[l], t);
        break;
      case "source":
        gt("error", t);
        break;
      case "img":
      case "image":
      case "link":
        gt("error", t), gt("load", t);
        break;
      case "details":
        gt("toggle", t);
        break;
      case "input":
        gt("invalid", t), br(
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
        gt("invalid", t);
        break;
      case "textarea":
        gt("invalid", t), ao(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || _b(t.textContent, l) ? (i.popover != null && (gt("beforetoggle", t), gt("toggle", t)), i.onScroll != null && gt("scroll", t), i.onScrollEnd != null && gt("scrollend", t), i.onClick != null && (t.onclick = D), t = !0) : t = !1, t || Zo(e, !0);
  }
  function um(e) {
    for (Ln = e.return; Ln; )
      switch (Ln.tag) {
        case 5:
        case 31:
        case 13:
          Il = !1;
          return;
        case 27:
        case 3:
          Il = !0;
          return;
        default:
          Ln = Ln.return;
      }
  }
  function Mr(e) {
    if (e !== Ln) return !1;
    if (!Et) return um(e), Et = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || dd(e.type, e.memoizedProps)), l = !l), l && Qt && Zo(e), um(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Qt = jb(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Qt = jb(e);
    } else
      t === 27 ? (t = Qt, ui(e.type) ? (e = bd, bd = null, Qt = e) : Qt = t) : Qt = Ln ? Ul(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Hi() {
    Qt = Ln = null, Et = !1;
  }
  function Fu() {
    var e = Qo;
    return e !== null && (ul === null ? ul = e : ul.push.apply(
      ul,
      e
    ), Qo = null), e;
  }
  function xa(e) {
    Qo === null ? Qo = [e] : Qo.push(e);
  }
  var Qu = k(null), Ui = null, Co = null;
  function $o(e, t, l) {
    W(Qu, t._currentValue), t._currentValue = l;
  }
  function Ro(e) {
    e._currentValue = Qu.current, X(Qu);
  }
  function Zu(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function $u(e, t, l, i) {
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
              u.lanes |= l, E = u.alternate, E !== null && (E.lanes |= l), Zu(
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
        m.lanes |= l, u = m.alternate, u !== null && (u.lanes |= l), Zu(m, l, e), m = null;
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
  function Tr(e, t, l, i) {
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
          vl(s.pendingProps.value, m.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (s === qe.current) {
        if (m = s.alternate, m === null) throw Error(a(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(Ka) : e = [Ka]);
      }
      s = s.return;
    }
    e !== null && $u(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function zs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!vl(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Bi(e) {
    Ui = e, Co = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Vn(e) {
    return fm(Ui, e);
  }
  function ks(e, t) {
    return Ui === null && Bi(e), fm(e, t);
  }
  function fm(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Co === null) {
      if (e === null) throw Error(a(308));
      Co = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Co = Co.next = t;
    return l;
  }
  var VS = typeof AbortController < "u" ? AbortController : function() {
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
  }, IS = n.unstable_scheduleCallback, HS = n.unstable_NormalPriority, yn = {
    $$typeof: w,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ju() {
    return {
      controller: new VS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Sa(e) {
    e.refCount--, e.refCount === 0 && IS(HS, function() {
      e.controller.abort();
    });
  }
  var Ea = null, Wu = 0, Or = 0, Nr = null;
  function US(e, t) {
    if (Ea === null) {
      var l = Ea = [];
      Wu = 0, Or = ld(), Nr = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return Wu++, t.then(dm, dm), t;
  }
  function dm() {
    if (--Wu === 0 && Ea !== null) {
      Nr !== null && (Nr.status = "fulfilled");
      var e = Ea;
      Ea = null, Or = 0, Nr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function BS(e, t) {
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
  var pm = V.S;
  V.S = function(e, t) {
    Zg = F(), typeof t == "object" && t !== null && typeof t.then == "function" && US(e, t), pm !== null && pm(e, t);
  };
  var Gi = k(null);
  function ef() {
    var e = Gi.current;
    return e !== null ? e : Gt.pooledCache;
  }
  function Ds(e, t) {
    t === null ? W(Gi, Gi.current) : W(Gi, t.pool);
  }
  function hm() {
    var e = ef();
    return e === null ? null : { parent: yn._currentValue, pool: e };
  }
  var zr = Error(a(460)), tf = Error(a(474)), js = Error(a(542)), Ls = { then: function() {
  } };
  function mm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function gm(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(D, D), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, ym(e), e;
      default:
        if (typeof t.status == "string") t.then(D, D);
        else {
          if (e = Gt, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, ym(e), e;
        }
        throw qi = t, zr;
    }
  }
  function Yi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (qi = l, zr) : l;
    }
  }
  var qi = null;
  function bm() {
    if (qi === null) throw Error(a(459));
    var e = qi;
    return qi = null, e;
  }
  function ym(e) {
    if (e === zr || e === js)
      throw Error(a(483));
  }
  var kr = null, Ca = 0;
  function Vs(e) {
    var t = Ca;
    return Ca += 1, kr === null && (kr = []), gm(kr, e, t);
  }
  function Ra(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Is(e, t) {
    throw t.$$typeof === x ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function vm(e) {
    function t(q, U) {
      if (e) {
        var Q = q.deletions;
        Q === null ? (q.deletions = [U], q.flags |= 16) : Q.push(U);
      }
    }
    function l(q, U) {
      if (!e) return null;
      for (; U !== null; )
        t(q, U), U = U.sibling;
      return null;
    }
    function i(q) {
      for (var U = /* @__PURE__ */ new Map(); q !== null; )
        q.key !== null ? U.set(q.key, q) : U.set(q.index, q), q = q.sibling;
      return U;
    }
    function s(q, U) {
      return q = So(q, U), q.index = 0, q.sibling = null, q;
    }
    function u(q, U, Q) {
      return q.index = Q, e ? (Q = q.alternate, Q !== null ? (Q = Q.index, Q < U ? (q.flags |= 67108866, U) : Q) : (q.flags |= 67108866, U)) : (q.flags |= 1048576, U);
    }
    function m(q) {
      return e && q.alternate === null && (q.flags |= 67108866), q;
    }
    function E(q, U, Q, fe) {
      return U === null || U.tag !== 6 ? (U = Yu(Q, q.mode, fe), U.return = q, U) : (U = s(U, Q), U.return = q, U);
    }
    function j(q, U, Q, fe) {
      var Pe = Q.type;
      return Pe === T ? ce(
        q,
        U,
        Q.props.children,
        fe,
        Q.key
      ) : U !== null && (U.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && Yi(Pe) === U.type) ? (U = s(U, Q.props), Ra(U, Q), U.return = q, U) : (U = Os(
        Q.type,
        Q.key,
        Q.props,
        null,
        q.mode,
        fe
      ), Ra(U, Q), U.return = q, U);
    }
    function Z(q, U, Q, fe) {
      return U === null || U.tag !== 4 || U.stateNode.containerInfo !== Q.containerInfo || U.stateNode.implementation !== Q.implementation ? (U = qu(Q, q.mode, fe), U.return = q, U) : (U = s(U, Q.children || []), U.return = q, U);
    }
    function ce(q, U, Q, fe, Pe) {
      return U === null || U.tag !== 7 ? (U = Ii(
        Q,
        q.mode,
        fe,
        Pe
      ), U.return = q, U) : (U = s(U, Q), U.return = q, U);
    }
    function he(q, U, Q) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return U = Yu(
          "" + U,
          q.mode,
          Q
        ), U.return = q, U;
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case C:
            return Q = Os(
              U.type,
              U.key,
              U.props,
              null,
              q.mode,
              Q
            ), Ra(Q, U), Q.return = q, Q;
          case _:
            return U = qu(
              U,
              q.mode,
              Q
            ), U.return = q, U;
          case L:
            return U = Yi(U), he(q, U, Q);
        }
        if (ye(U) || ue(U))
          return U = Ii(
            U,
            q.mode,
            Q,
            null
          ), U.return = q, U;
        if (typeof U.then == "function")
          return he(q, Vs(U), Q);
        if (U.$$typeof === w)
          return he(
            q,
            ks(q, U),
            Q
          );
        Is(q, U);
      }
      return null;
    }
    function $(q, U, Q, fe) {
      var Pe = U !== null ? U.key : null;
      if (typeof Q == "string" && Q !== "" || typeof Q == "number" || typeof Q == "bigint")
        return Pe !== null ? null : E(q, U, "" + Q, fe);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case C:
            return Q.key === Pe ? j(q, U, Q, fe) : null;
          case _:
            return Q.key === Pe ? Z(q, U, Q, fe) : null;
          case L:
            return Q = Yi(Q), $(q, U, Q, fe);
        }
        if (ye(Q) || ue(Q))
          return Pe !== null ? null : ce(q, U, Q, fe, null);
        if (typeof Q.then == "function")
          return $(
            q,
            U,
            Vs(Q),
            fe
          );
        if (Q.$$typeof === w)
          return $(
            q,
            U,
            ks(q, Q),
            fe
          );
        Is(q, Q);
      }
      return null;
    }
    function le(q, U, Q, fe, Pe) {
      if (typeof fe == "string" && fe !== "" || typeof fe == "number" || typeof fe == "bigint")
        return q = q.get(Q) || null, E(U, q, "" + fe, Pe);
      if (typeof fe == "object" && fe !== null) {
        switch (fe.$$typeof) {
          case C:
            return q = q.get(
              fe.key === null ? Q : fe.key
            ) || null, j(U, q, fe, Pe);
          case _:
            return q = q.get(
              fe.key === null ? Q : fe.key
            ) || null, Z(U, q, fe, Pe);
          case L:
            return fe = Yi(fe), le(
              q,
              U,
              Q,
              fe,
              Pe
            );
        }
        if (ye(fe) || ue(fe))
          return q = q.get(Q) || null, ce(U, q, fe, Pe, null);
        if (typeof fe.then == "function")
          return le(
            q,
            U,
            Q,
            Vs(fe),
            Pe
          );
        if (fe.$$typeof === w)
          return le(
            q,
            U,
            Q,
            ks(U, fe),
            Pe
          );
        Is(U, fe);
      }
      return null;
    }
    function Ve(q, U, Q, fe) {
      for (var Pe = null, At = null, Be = U, st = U = 0, vt = null; Be !== null && st < Q.length; st++) {
        Be.index > st ? (vt = Be, Be = null) : vt = Be.sibling;
        var Mt = $(
          q,
          Be,
          Q[st],
          fe
        );
        if (Mt === null) {
          Be === null && (Be = vt);
          break;
        }
        e && Be && Mt.alternate === null && t(q, Be), U = u(Mt, U, st), At === null ? Pe = Mt : At.sibling = Mt, At = Mt, Be = vt;
      }
      if (st === Q.length)
        return l(q, Be), Et && Eo(q, st), Pe;
      if (Be === null) {
        for (; st < Q.length; st++)
          Be = he(q, Q[st], fe), Be !== null && (U = u(
            Be,
            U,
            st
          ), At === null ? Pe = Be : At.sibling = Be, At = Be);
        return Et && Eo(q, st), Pe;
      }
      for (Be = i(Be); st < Q.length; st++)
        vt = le(
          Be,
          q,
          st,
          Q[st],
          fe
        ), vt !== null && (e && vt.alternate !== null && Be.delete(
          vt.key === null ? st : vt.key
        ), U = u(
          vt,
          U,
          st
        ), At === null ? Pe = vt : At.sibling = vt, At = vt);
      return e && Be.forEach(function(mi) {
        return t(q, mi);
      }), Et && Eo(q, st), Pe;
    }
    function Ze(q, U, Q, fe) {
      if (Q == null) throw Error(a(151));
      for (var Pe = null, At = null, Be = U, st = U = 0, vt = null, Mt = Q.next(); Be !== null && !Mt.done; st++, Mt = Q.next()) {
        Be.index > st ? (vt = Be, Be = null) : vt = Be.sibling;
        var mi = $(q, Be, Mt.value, fe);
        if (mi === null) {
          Be === null && (Be = vt);
          break;
        }
        e && Be && mi.alternate === null && t(q, Be), U = u(mi, U, st), At === null ? Pe = mi : At.sibling = mi, At = mi, Be = vt;
      }
      if (Mt.done)
        return l(q, Be), Et && Eo(q, st), Pe;
      if (Be === null) {
        for (; !Mt.done; st++, Mt = Q.next())
          Mt = he(q, Mt.value, fe), Mt !== null && (U = u(Mt, U, st), At === null ? Pe = Mt : At.sibling = Mt, At = Mt);
        return Et && Eo(q, st), Pe;
      }
      for (Be = i(Be); !Mt.done; st++, Mt = Q.next())
        Mt = le(Be, q, st, Mt.value, fe), Mt !== null && (e && Mt.alternate !== null && Be.delete(Mt.key === null ? st : Mt.key), U = u(Mt, U, st), At === null ? Pe = Mt : At.sibling = Mt, At = Mt);
      return e && Be.forEach(function(JE) {
        return t(q, JE);
      }), Et && Eo(q, st), Pe;
    }
    function Ut(q, U, Q, fe) {
      if (typeof Q == "object" && Q !== null && Q.type === T && Q.key === null && (Q = Q.props.children), typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case C:
            e: {
              for (var Pe = Q.key; U !== null; ) {
                if (U.key === Pe) {
                  if (Pe = Q.type, Pe === T) {
                    if (U.tag === 7) {
                      l(
                        q,
                        U.sibling
                      ), fe = s(
                        U,
                        Q.props.children
                      ), fe.return = q, q = fe;
                      break e;
                    }
                  } else if (U.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && Yi(Pe) === U.type) {
                    l(
                      q,
                      U.sibling
                    ), fe = s(U, Q.props), Ra(fe, Q), fe.return = q, q = fe;
                    break e;
                  }
                  l(q, U);
                  break;
                } else t(q, U);
                U = U.sibling;
              }
              Q.type === T ? (fe = Ii(
                Q.props.children,
                q.mode,
                fe,
                Q.key
              ), fe.return = q, q = fe) : (fe = Os(
                Q.type,
                Q.key,
                Q.props,
                null,
                q.mode,
                fe
              ), Ra(fe, Q), fe.return = q, q = fe);
            }
            return m(q);
          case _:
            e: {
              for (Pe = Q.key; U !== null; ) {
                if (U.key === Pe)
                  if (U.tag === 4 && U.stateNode.containerInfo === Q.containerInfo && U.stateNode.implementation === Q.implementation) {
                    l(
                      q,
                      U.sibling
                    ), fe = s(U, Q.children || []), fe.return = q, q = fe;
                    break e;
                  } else {
                    l(q, U);
                    break;
                  }
                else t(q, U);
                U = U.sibling;
              }
              fe = qu(Q, q.mode, fe), fe.return = q, q = fe;
            }
            return m(q);
          case L:
            return Q = Yi(Q), Ut(
              q,
              U,
              Q,
              fe
            );
        }
        if (ye(Q))
          return Ve(
            q,
            U,
            Q,
            fe
          );
        if (ue(Q)) {
          if (Pe = ue(Q), typeof Pe != "function") throw Error(a(150));
          return Q = Pe.call(Q), Ze(
            q,
            U,
            Q,
            fe
          );
        }
        if (typeof Q.then == "function")
          return Ut(
            q,
            U,
            Vs(Q),
            fe
          );
        if (Q.$$typeof === w)
          return Ut(
            q,
            U,
            ks(q, Q),
            fe
          );
        Is(q, Q);
      }
      return typeof Q == "string" && Q !== "" || typeof Q == "number" || typeof Q == "bigint" ? (Q = "" + Q, U !== null && U.tag === 6 ? (l(q, U.sibling), fe = s(U, Q), fe.return = q, q = fe) : (l(q, U), fe = Yu(Q, q.mode, fe), fe.return = q, q = fe), m(q)) : l(q, U);
    }
    return function(q, U, Q, fe) {
      try {
        Ca = 0;
        var Pe = Ut(
          q,
          U,
          Q,
          fe
        );
        return kr = null, Pe;
      } catch (Be) {
        if (Be === zr || Be === js) throw Be;
        var At = xl(29, Be, null, q.mode);
        return At.lanes = fe, At.return = q, At;
      }
    };
  }
  var Pi = vm(!0), xm = vm(!1), Jo = !1;
  function nf(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function lf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Wo(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ei(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Nt & 2) !== 0) {
      var s = i.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, t = Ts(e), lm(e, null, l), t;
    }
    return Ms(e, i, t, l), Ts(e);
  }
  function wa(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Kn(e, l);
    }
  }
  function of(e, t) {
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
  var rf = !1;
  function _a() {
    if (rf) {
      var e = Nr;
      if (e !== null) throw e;
    }
  }
  function Aa(e, t, l, i) {
    rf = !1;
    var s = e.updateQueue;
    Jo = !1;
    var u = s.firstBaseUpdate, m = s.lastBaseUpdate, E = s.shared.pending;
    if (E !== null) {
      s.shared.pending = null;
      var j = E, Z = j.next;
      j.next = null, m === null ? u = Z : m.next = Z, m = j;
      var ce = e.alternate;
      ce !== null && (ce = ce.updateQueue, E = ce.lastBaseUpdate, E !== m && (E === null ? ce.firstBaseUpdate = Z : E.next = Z, ce.lastBaseUpdate = j));
    }
    if (u !== null) {
      var he = s.baseState;
      m = 0, ce = Z = j = null, E = u;
      do {
        var $ = E.lane & -536870913, le = $ !== E.lane;
        if (le ? (yt & $) === $ : (i & $) === $) {
          $ !== 0 && $ === Or && (rf = !0), ce !== null && (ce = ce.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Ve = e, Ze = E;
            $ = t;
            var Ut = l;
            switch (Ze.tag) {
              case 1:
                if (Ve = Ze.payload, typeof Ve == "function") {
                  he = Ve.call(Ut, he, $);
                  break e;
                }
                he = Ve;
                break e;
              case 3:
                Ve.flags = Ve.flags & -65537 | 128;
              case 0:
                if (Ve = Ze.payload, $ = typeof Ve == "function" ? Ve.call(Ut, he, $) : Ve, $ == null) break e;
                he = v({}, he, $);
                break e;
              case 2:
                Jo = !0;
            }
          }
          $ = E.callback, $ !== null && (e.flags |= 64, le && (e.flags |= 8192), le = s.callbacks, le === null ? s.callbacks = [$] : le.push($));
        } else
          le = {
            lane: $,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ce === null ? (Z = ce = le, j = he) : ce = ce.next = le, m |= $;
        if (E = E.next, E === null) {
          if (E = s.shared.pending, E === null)
            break;
          le = E, E = le.next, le.next = null, s.lastBaseUpdate = le, s.shared.pending = null;
        }
      } while (!0);
      ce === null && (j = he), s.baseState = j, s.firstBaseUpdate = Z, s.lastBaseUpdate = ce, u === null && (s.shared.lanes = 0), ii |= m, e.lanes = m, e.memoizedState = he;
    }
  }
  function Sm(e, t) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(t);
  }
  function Em(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Sm(l[e], t);
  }
  var Dr = k(null), Hs = k(0);
  function Cm(e, t) {
    e = ko, W(Hs, e), W(Dr, t), ko = e | t.baseLanes;
  }
  function af() {
    W(Hs, ko), W(Dr, Dr.current);
  }
  function sf() {
    ko = Hs.current, X(Dr), X(Hs);
  }
  var Sl = k(null), Hl = null;
  function ti(e) {
    var t = e.alternate;
    W(dn, dn.current & 1), W(Sl, e), Hl === null && (t === null || Dr.current !== null || t.memoizedState !== null) && (Hl = e);
  }
  function cf(e) {
    W(dn, dn.current), W(Sl, e), Hl === null && (Hl = e);
  }
  function Rm(e) {
    e.tag === 22 ? (W(dn, dn.current), W(Sl, e), Hl === null && (Hl = e)) : ni();
  }
  function ni() {
    W(dn, dn.current), W(Sl, Sl.current);
  }
  function El(e) {
    X(Sl), Hl === e && (Hl = null), X(dn);
  }
  var dn = k(0);
  function Us(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || md(l) || gd(l)))
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
  var wo = 0, rt = null, It = null, vn = null, Bs = !1, jr = !1, Xi = !1, Gs = 0, Ma = 0, Lr = null, GS = 0;
  function cn() {
    throw Error(a(321));
  }
  function uf(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!vl(e[l], t[l])) return !1;
    return !0;
  }
  function ff(e, t, l, i, s, u) {
    return wo = u, rt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? ag : _f, Xi = !1, u = l(i, s), Xi = !1, jr && (u = _m(
      t,
      l,
      i,
      s
    )), wm(e), u;
  }
  function wm(e) {
    V.H = Na;
    var t = It !== null && It.next !== null;
    if (wo = 0, vn = It = rt = null, Bs = !1, Ma = 0, Lr = null, t) throw Error(a(300));
    e === null || xn || (e = e.dependencies, e !== null && zs(e) && (xn = !0));
  }
  function _m(e, t, l, i) {
    rt = e;
    var s = 0;
    do {
      if (jr && (Lr = null), Ma = 0, jr = !1, 25 <= s) throw Error(a(301));
      if (s += 1, vn = It = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = sg, u = t(l, i);
    } while (jr);
    return u;
  }
  function YS() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ta(t) : t, e = e.useState()[0], (It !== null ? It.memoizedState : null) !== e && (rt.flags |= 1024), t;
  }
  function df() {
    var e = Gs !== 0;
    return Gs = 0, e;
  }
  function pf(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function hf(e) {
    if (Bs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Bs = !1;
    }
    wo = 0, vn = It = rt = null, jr = !1, Ma = Gs = 0, Lr = null;
  }
  function Wn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return vn === null ? rt.memoizedState = vn = e : vn = vn.next = e, vn;
  }
  function pn() {
    if (It === null) {
      var e = rt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = It.next;
    var t = vn === null ? rt.memoizedState : vn.next;
    if (t !== null)
      vn = t, It = e;
    else {
      if (e === null)
        throw rt.alternate === null ? Error(a(467)) : Error(a(310));
      It = e, e = {
        memoizedState: It.memoizedState,
        baseState: It.baseState,
        baseQueue: It.baseQueue,
        queue: It.queue,
        next: null
      }, vn === null ? rt.memoizedState = vn = e : vn = vn.next = e;
    }
    return vn;
  }
  function Ys() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ta(e) {
    var t = Ma;
    return Ma += 1, Lr === null && (Lr = []), e = gm(Lr, e, t), t = rt, (vn === null ? t.memoizedState : vn.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? ag : _f), e;
  }
  function qs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ta(e);
      if (e.$$typeof === w) return Vn(e);
    }
    throw Error(a(438, String(e)));
  }
  function mf(e) {
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
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Ys(), rt.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = J;
    return t.index++, l;
  }
  function _o(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ps(e) {
    var t = pn();
    return gf(t, It, e);
  }
  function gf(e, t, l) {
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
      var E = m = null, j = null, Z = t, ce = !1;
      do {
        var he = Z.lane & -536870913;
        if (he !== Z.lane ? (yt & he) === he : (wo & he) === he) {
          var $ = Z.revertLane;
          if ($ === 0)
            j !== null && (j = j.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }), he === Or && (ce = !0);
          else if ((wo & $) === $) {
            Z = Z.next, $ === Or && (ce = !0);
            continue;
          } else
            he = {
              lane: 0,
              revertLane: Z.revertLane,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }, j === null ? (E = j = he, m = u) : j = j.next = he, rt.lanes |= $, ii |= $;
          he = Z.action, Xi && l(u, he), u = Z.hasEagerState ? Z.eagerState : l(u, he);
        } else
          $ = {
            lane: he,
            revertLane: Z.revertLane,
            gesture: Z.gesture,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          }, j === null ? (E = j = $, m = u) : j = j.next = $, rt.lanes |= he, ii |= he;
        Z = Z.next;
      } while (Z !== null && Z !== t);
      if (j === null ? m = u : j.next = E, !vl(u, e.memoizedState) && (xn = !0, ce && (l = Nr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = m, e.baseQueue = j, i.lastRenderedState = u;
    }
    return s === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function bf(e) {
    var t = pn(), l = t.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = e;
    var i = l.dispatch, s = l.pending, u = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var m = s = s.next;
      do
        u = e(u, m.action), m = m.next;
      while (m !== s);
      vl(u, t.memoizedState) || (xn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, i];
  }
  function Am(e, t, l) {
    var i = rt, s = pn(), u = Et;
    if (u) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = t();
    var m = !vl(
      (It || s).memoizedState,
      l
    );
    if (m && (s.memoizedState = l, xn = !0), s = s.queue, xf(Om.bind(null, i, s, e), [
      e
    ]), s.getSnapshot !== t || m || vn !== null && vn.memoizedState.tag & 1) {
      if (i.flags |= 2048, Vr(
        9,
        { destroy: void 0 },
        Tm.bind(
          null,
          i,
          s,
          l,
          t
        ),
        null
      ), Gt === null) throw Error(a(349));
      u || (wo & 127) !== 0 || Mm(i, t, l);
    }
    return l;
  }
  function Mm(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = rt.updateQueue, t === null ? (t = Ys(), rt.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Tm(e, t, l, i) {
    t.value = l, t.getSnapshot = i, Nm(t) && zm(e);
  }
  function Om(e, t, l) {
    return l(function() {
      Nm(t) && zm(e);
    });
  }
  function Nm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !vl(e, l);
    } catch {
      return !0;
    }
  }
  function zm(e) {
    var t = Vi(e, 2);
    t !== null && fl(t, e, 2);
  }
  function yf(e) {
    var t = Wn();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Xi) {
        Wt(!0);
        try {
          l();
        } finally {
          Wt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _o,
      lastRenderedState: e
    }, t;
  }
  function km(e, t, l, i) {
    return e.baseState = l, gf(
      e,
      It,
      typeof i == "function" ? i : _o
    );
  }
  function qS(e, t, l, i, s) {
    if (Fs(e)) throw Error(a(485));
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
      V.T !== null ? l(!0) : u.isTransition = !1, i(u), l = t.pending, l === null ? (u.next = t.pending = u, Dm(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Dm(e, t) {
    var l = t.action, i = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, m = {};
      V.T = m;
      try {
        var E = l(s, i), j = V.S;
        j !== null && j(m, E), jm(e, t, E);
      } catch (Z) {
        vf(e, t, Z);
      } finally {
        u !== null && m.types !== null && (u.types = m.types), V.T = u;
      }
    } else
      try {
        u = l(s, i), jm(e, t, u);
      } catch (Z) {
        vf(e, t, Z);
      }
  }
  function jm(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Lm(e, t, i);
      },
      function(i) {
        return vf(e, t, i);
      }
    ) : Lm(e, t, l);
  }
  function Lm(e, t, l) {
    t.status = "fulfilled", t.value = l, Vm(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Dm(e, l)));
  }
  function vf(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Vm(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Vm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Im(e, t) {
    return t;
  }
  function Hm(e, t) {
    if (Et) {
      var l = Gt.formState;
      if (l !== null) {
        e: {
          var i = rt;
          if (Et) {
            if (Qt) {
              t: {
                for (var s = Qt, u = Il; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = Ul(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                Qt = Ul(
                  s.nextSibling
                ), i = s.data === "F!";
                break e;
              }
            }
            Zo(i);
          }
          i = !1;
        }
        i && (t = l[0]);
      }
    }
    return l = Wn(), l.memoizedState = l.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Im,
      lastRenderedState: t
    }, l.queue = i, l = og.bind(
      null,
      rt,
      i
    ), i.dispatch = l, i = yf(!1), u = wf.bind(
      null,
      rt,
      !1,
      i.queue
    ), i = Wn(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = s, l = qS.bind(
      null,
      rt,
      s,
      u,
      l
    ), s.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function Um(e) {
    var t = pn();
    return Bm(t, It, e);
  }
  function Bm(e, t, l) {
    if (t = gf(
      e,
      t,
      Im
    )[0], e = Ps(_o)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = Ta(t);
      } catch (m) {
        throw m === zr ? js : m;
      }
    else i = t;
    t = pn();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (rt.flags |= 2048, Vr(
      9,
      { destroy: void 0 },
      PS.bind(null, s, l),
      null
    )), [i, u, e];
  }
  function PS(e, t) {
    e.action = t;
  }
  function Gm(e) {
    var t = pn(), l = It;
    if (l !== null)
      return Bm(t, l, e);
    pn(), t = t.memoizedState, l = pn();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function Vr(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = rt.updateQueue, t === null && (t = Ys(), rt.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Ym() {
    return pn().memoizedState;
  }
  function Xs(e, t, l, i) {
    var s = Wn();
    rt.flags |= e, s.memoizedState = Vr(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function Ks(e, t, l, i) {
    var s = pn();
    i = i === void 0 ? null : i;
    var u = s.memoizedState.inst;
    It !== null && i !== null && uf(i, It.memoizedState.deps) ? s.memoizedState = Vr(t, u, l, i) : (rt.flags |= e, s.memoizedState = Vr(
      1 | t,
      u,
      l,
      i
    ));
  }
  function qm(e, t) {
    Xs(8390656, 8, e, t);
  }
  function xf(e, t) {
    Ks(2048, 8, e, t);
  }
  function XS(e) {
    rt.flags |= 4;
    var t = rt.updateQueue;
    if (t === null)
      t = Ys(), rt.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Pm(e) {
    var t = pn().memoizedState;
    return XS({ ref: t, nextImpl: e }), function() {
      if ((Nt & 2) !== 0) throw Error(a(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Xm(e, t) {
    return Ks(4, 2, e, t);
  }
  function Km(e, t) {
    return Ks(4, 4, e, t);
  }
  function Fm(e, t) {
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
  function Qm(e, t, l) {
    l = l != null ? l.concat([e]) : null, Ks(4, 4, Fm.bind(null, t, e), l);
  }
  function Sf() {
  }
  function Zm(e, t) {
    var l = pn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && uf(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function $m(e, t) {
    var l = pn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && uf(t, i[1]))
      return i[0];
    if (i = e(), Xi) {
      Wt(!0);
      try {
        e();
      } finally {
        Wt(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function Ef(e, t, l) {
    return l === void 0 || (wo & 1073741824) !== 0 && (yt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Jg(), rt.lanes |= e, ii |= e, l);
  }
  function Jm(e, t, l, i) {
    return vl(l, t) ? l : Dr.current !== null ? (e = Ef(e, l, i), vl(e, t) || (xn = !0), e) : (wo & 42) === 0 || (wo & 1073741824) !== 0 && (yt & 261930) === 0 ? (xn = !0, e.memoizedState = l) : (e = Jg(), rt.lanes |= e, ii |= e, t);
  }
  function Wm(e, t, l, i, s) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var m = V.T, E = {};
    V.T = E, wf(e, !1, t, l);
    try {
      var j = s(), Z = V.S;
      if (Z !== null && Z(E, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var ce = BS(
          j,
          i
        );
        Oa(
          e,
          t,
          ce,
          wl(e)
        );
      } else
        Oa(
          e,
          t,
          i,
          wl(e)
        );
    } catch (he) {
      Oa(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: he },
        wl()
      );
    } finally {
      H.p = u, m !== null && E.types !== null && (m.types = E.types), V.T = m;
    }
  }
  function KS() {
  }
  function Cf(e, t, l, i) {
    if (e.tag !== 5) throw Error(a(476));
    var s = eg(e).queue;
    Wm(
      e,
      s,
      t,
      K,
      l === null ? KS : function() {
        return tg(e), l(i);
      }
    );
  }
  function eg(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _o,
        lastRenderedState: K
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
        lastRenderedReducer: _o,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function tg(e) {
    var t = eg(e);
    t.next === null && (t = e.alternate.memoizedState), Oa(
      e,
      t.next.queue,
      {},
      wl()
    );
  }
  function Rf() {
    return Vn(Ka);
  }
  function ng() {
    return pn().memoizedState;
  }
  function lg() {
    return pn().memoizedState;
  }
  function FS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = wl();
          e = Wo(l);
          var i = ei(t, e, l);
          i !== null && (fl(i, t, l), wa(i, t, l)), t = { cache: Ju() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function QS(e, t, l) {
    var i = wl();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fs(e) ? ig(t, l) : (l = Bu(e, t, l, i), l !== null && (fl(l, e, i), rg(l, t, i)));
  }
  function og(e, t, l) {
    var i = wl();
    Oa(e, t, l, i);
  }
  function Oa(e, t, l, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Fs(e)) ig(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var m = t.lastRenderedState, E = u(m, l);
          if (s.hasEagerState = !0, s.eagerState = E, vl(E, m))
            return Ms(e, t, s, 0), Gt === null && As(), !1;
        } catch {
        }
      if (l = Bu(e, t, s, i), l !== null)
        return fl(l, e, i), rg(l, t, i), !0;
    }
    return !1;
  }
  function wf(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: ld(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Fs(e)) {
      if (t) throw Error(a(479));
    } else
      t = Bu(
        e,
        l,
        i,
        2
      ), t !== null && fl(t, e, 2);
  }
  function Fs(e) {
    var t = e.alternate;
    return e === rt || t !== null && t === rt;
  }
  function ig(e, t) {
    jr = Bs = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function rg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Kn(e, l);
    }
  }
  var Na = {
    readContext: Vn,
    use: qs,
    useCallback: cn,
    useContext: cn,
    useEffect: cn,
    useImperativeHandle: cn,
    useLayoutEffect: cn,
    useInsertionEffect: cn,
    useMemo: cn,
    useReducer: cn,
    useRef: cn,
    useState: cn,
    useDebugValue: cn,
    useDeferredValue: cn,
    useTransition: cn,
    useSyncExternalStore: cn,
    useId: cn,
    useHostTransitionStatus: cn,
    useFormState: cn,
    useActionState: cn,
    useOptimistic: cn,
    useMemoCache: cn,
    useCacheRefresh: cn
  };
  Na.useEffectEvent = cn;
  var ag = {
    readContext: Vn,
    use: qs,
    useCallback: function(e, t) {
      return Wn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Vn,
    useEffect: qm,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Xs(
        4194308,
        4,
        Fm.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Xs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Xs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = Wn();
      t = t === void 0 ? null : t;
      var i = e();
      if (Xi) {
        Wt(!0);
        try {
          e();
        } finally {
          Wt(!1);
        }
      }
      return l.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, l) {
      var i = Wn();
      if (l !== void 0) {
        var s = l(t);
        if (Xi) {
          Wt(!0);
          try {
            l(t);
          } finally {
            Wt(!1);
          }
        }
      } else s = t;
      return i.memoizedState = i.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, i.queue = e, e = e.dispatch = QS.bind(
        null,
        rt,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = Wn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = yf(e);
      var t = e.queue, l = og.bind(null, rt, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Sf,
    useDeferredValue: function(e, t) {
      var l = Wn();
      return Ef(l, e, t);
    },
    useTransition: function() {
      var e = yf(!1);
      return e = Wm.bind(
        null,
        rt,
        e.queue,
        !0,
        !1
      ), Wn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = rt, s = Wn();
      if (Et) {
        if (l === void 0)
          throw Error(a(407));
        l = l();
      } else {
        if (l = t(), Gt === null)
          throw Error(a(349));
        (yt & 127) !== 0 || Mm(i, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, qm(Om.bind(null, i, u, e), [
        e
      ]), i.flags |= 2048, Vr(
        9,
        { destroy: void 0 },
        Tm.bind(
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
      var e = Wn(), t = Gt.identifierPrefix;
      if (Et) {
        var l = uo, i = co;
        l = (i & ~(1 << 32 - dt(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Gs++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = GS++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Rf,
    useFormState: Hm,
    useActionState: Hm,
    useOptimistic: function(e) {
      var t = Wn();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = wf.bind(
        null,
        rt,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: mf,
    useCacheRefresh: function() {
      return Wn().memoizedState = FS.bind(
        null,
        rt
      );
    },
    useEffectEvent: function(e) {
      var t = Wn(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Nt & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, _f = {
    readContext: Vn,
    use: qs,
    useCallback: Zm,
    useContext: Vn,
    useEffect: xf,
    useImperativeHandle: Qm,
    useInsertionEffect: Xm,
    useLayoutEffect: Km,
    useMemo: $m,
    useReducer: Ps,
    useRef: Ym,
    useState: function() {
      return Ps(_o);
    },
    useDebugValue: Sf,
    useDeferredValue: function(e, t) {
      var l = pn();
      return Jm(
        l,
        It.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ps(_o)[0], t = pn().memoizedState;
      return [
        typeof e == "boolean" ? e : Ta(e),
        t
      ];
    },
    useSyncExternalStore: Am,
    useId: ng,
    useHostTransitionStatus: Rf,
    useFormState: Um,
    useActionState: Um,
    useOptimistic: function(e, t) {
      var l = pn();
      return km(l, It, e, t);
    },
    useMemoCache: mf,
    useCacheRefresh: lg
  };
  _f.useEffectEvent = Pm;
  var sg = {
    readContext: Vn,
    use: qs,
    useCallback: Zm,
    useContext: Vn,
    useEffect: xf,
    useImperativeHandle: Qm,
    useInsertionEffect: Xm,
    useLayoutEffect: Km,
    useMemo: $m,
    useReducer: bf,
    useRef: Ym,
    useState: function() {
      return bf(_o);
    },
    useDebugValue: Sf,
    useDeferredValue: function(e, t) {
      var l = pn();
      return It === null ? Ef(l, e, t) : Jm(
        l,
        It.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = bf(_o)[0], t = pn().memoizedState;
      return [
        typeof e == "boolean" ? e : Ta(e),
        t
      ];
    },
    useSyncExternalStore: Am,
    useId: ng,
    useHostTransitionStatus: Rf,
    useFormState: Gm,
    useActionState: Gm,
    useOptimistic: function(e, t) {
      var l = pn();
      return It !== null ? km(l, It, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: mf,
    useCacheRefresh: lg
  };
  sg.useEffectEvent = Pm;
  function Af(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : v({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Mf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = wl(), s = Wo(i);
      s.payload = t, l != null && (s.callback = l), t = ei(e, s, i), t !== null && (fl(t, e, i), wa(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = wl(), s = Wo(i);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = ei(e, s, i), t !== null && (fl(t, e, i), wa(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = wl(), i = Wo(l);
      i.tag = 2, t != null && (i.callback = t), t = ei(e, i, l), t !== null && (fl(t, e, l), wa(t, e, l));
    }
  };
  function cg(e, t, l, i, s, u, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, u, m) : t.prototype && t.prototype.isPureReactComponent ? !ba(l, i) || !ba(s, u) : !0;
  }
  function ug(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && Mf.enqueueReplaceState(t, t.state, null);
  }
  function Ki(e, t) {
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
  function fg(e) {
    _s(e);
  }
  function dg(e) {
    console.error(e);
  }
  function pg(e) {
    _s(e);
  }
  function Qs(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function hg(e, t, l) {
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
  function Tf(e, t, l) {
    return l = Wo(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Qs(e, t);
    }, l;
  }
  function mg(e) {
    return e = Wo(e), e.tag = 3, e;
  }
  function gg(e, t, l, i) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = i.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        hg(t, l, i);
      };
    }
    var m = l.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (e.callback = function() {
      hg(t, l, i), typeof s != "function" && (ri === null ? ri = /* @__PURE__ */ new Set([this]) : ri.add(this));
      var E = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function ZS(e, t, l, i, s) {
    if (l.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = l.alternate, t !== null && Tr(
        t,
        l,
        s,
        !0
      ), l = Sl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Hl === null ? ac() : l.alternate === null && un === 0 && (un = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, i === Ls ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), ed(e, i, s)), !1;
          case 22:
            return l.flags |= 65536, i === Ls ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), ed(e, i, s)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return ed(e, i, s), ac(), !1;
    }
    if (Et)
      return t = Sl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, i !== Ku && (e = Error(a(422), { cause: i }), xa(jl(e, l)))) : (i !== Ku && (t = Error(a(423), {
        cause: i
      }), xa(
        jl(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, i = jl(i, l), s = Tf(
        e.stateNode,
        i,
        s
      ), of(e, s), un !== 4 && (un = 2)), !1;
    var u = Error(a(520), { cause: i });
    if (u = jl(u, l), Ha === null ? Ha = [u] : Ha.push(u), un !== 4 && (un = 2), t === null) return !0;
    i = jl(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = Tf(l.stateNode, i, e), of(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ri === null || !ri.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = mg(s), gg(
              s,
              e,
              l,
              i
            ), of(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Of = Error(a(461)), xn = !1;
  function In(e, t, l, i) {
    t.child = e === null ? xm(t, null, l, i) : Pi(
      t,
      e.child,
      l,
      i
    );
  }
  function bg(e, t, l, i, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in i) {
      var m = {};
      for (var E in i)
        E !== "ref" && (m[E] = i[E]);
    } else m = i;
    return Bi(t), i = ff(
      e,
      t,
      l,
      m,
      u,
      s
    ), E = df(), e !== null && !xn ? (pf(e, t, s), Ao(e, t, s)) : (Et && E && Pu(t), t.flags |= 1, In(e, t, i, s), t.child);
  }
  function yg(e, t, l, i, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !Gu(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, vg(
        e,
        t,
        u,
        i,
        s
      )) : (e = Os(
        l.type,
        null,
        i,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !If(e, s)) {
      var m = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : ba, l(m, i) && e.ref === t.ref)
        return Ao(e, t, s);
    }
    return t.flags |= 1, e = So(u, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function vg(e, t, l, i, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (ba(u, i) && e.ref === t.ref)
        if (xn = !1, t.pendingProps = i = u, If(e, s))
          (e.flags & 131072) !== 0 && (xn = !0);
        else
          return t.lanes = e.lanes, Ao(e, t, s);
    }
    return Nf(
      e,
      t,
      l,
      i,
      s
    );
  }
  function xg(e, t, l, i) {
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
        return Sg(
          e,
          t,
          u,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ds(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Cm(t, u) : af(), Rm(t);
      else
        return i = t.lanes = 536870912, Sg(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          i
        );
    } else
      u !== null ? (Ds(t, u.cachePool), Cm(t, u), ni(), t.memoizedState = null) : (e !== null && Ds(t, null), af(), ni());
    return In(e, t, s, l), t.child;
  }
  function za(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Sg(e, t, l, i, s) {
    var u = ef();
    return u = u === null ? null : { parent: yn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Ds(t, null), af(), Rm(t), e !== null && Tr(e, t, i, !0), t.childLanes = s, null;
  }
  function Zs(e, t) {
    return t = Js(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Eg(e, t, l) {
    return Pi(t, e.child, null, l), e = Zs(t, t.pendingProps), e.flags |= 2, El(t), t.memoizedState = null, e;
  }
  function $S(e, t, l) {
    var i = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Et) {
        if (i.mode === "hidden")
          return e = Zs(t, i), t.lanes = 536870912, za(null, e);
        if (cf(t), (e = Qt) ? (e = Db(
          e,
          Il
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fo !== null ? { id: co, overflow: uo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = im(e), l.return = t, t.child = l, Ln = t, Qt = null)) : e = null, e === null) throw Zo(t);
        return t.lanes = 536870912, null;
      }
      return Zs(t, i);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var m = u.dehydrated;
      if (cf(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Eg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(a(558));
      else if (xn || Tr(e, t, l, !1), s = (l & e.childLanes) !== 0, xn || s) {
        if (i = Gt, i !== null && (m = fn(i, l), m !== 0 && m !== u.retryLane))
          throw u.retryLane = m, Vi(e, m), fl(i, e, m), Of;
        ac(), t = Eg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, Qt = Ul(m.nextSibling), Ln = t, Et = !0, Qo = null, Il = !1, e !== null && sm(t, e), t = Zs(t, i), t.flags |= 4096;
      return t;
    }
    return e = So(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function $s(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Nf(e, t, l, i, s) {
    return Bi(t), l = ff(
      e,
      t,
      l,
      i,
      void 0,
      s
    ), i = df(), e !== null && !xn ? (pf(e, t, s), Ao(e, t, s)) : (Et && i && Pu(t), t.flags |= 1, In(e, t, l, s), t.child);
  }
  function Cg(e, t, l, i, s, u) {
    return Bi(t), t.updateQueue = null, l = _m(
      t,
      i,
      l,
      s
    ), wm(e), i = df(), e !== null && !xn ? (pf(e, t, u), Ao(e, t, u)) : (Et && i && Pu(t), t.flags |= 1, In(e, t, l, u), t.child);
  }
  function Rg(e, t, l, i, s) {
    if (Bi(t), t.stateNode === null) {
      var u = wr, m = l.contextType;
      typeof m == "object" && m !== null && (u = Vn(m)), u = new l(i, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Mf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = i, u.state = t.memoizedState, u.refs = {}, nf(t), m = l.contextType, u.context = typeof m == "object" && m !== null ? Vn(m) : wr, u.state = t.memoizedState, m = l.getDerivedStateFromProps, typeof m == "function" && (Af(
        t,
        l,
        m,
        i
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (m = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), m !== u.state && Mf.enqueueReplaceState(u, u.state, null), Aa(t, i, u, s), _a(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      u = t.stateNode;
      var E = t.memoizedProps, j = Ki(l, E);
      u.props = j;
      var Z = u.context, ce = l.contextType;
      m = wr, typeof ce == "object" && ce !== null && (m = Vn(ce));
      var he = l.getDerivedStateFromProps;
      ce = typeof he == "function" || typeof u.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ce || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (E || Z !== m) && ug(
        t,
        u,
        i,
        m
      ), Jo = !1;
      var $ = t.memoizedState;
      u.state = $, Aa(t, i, u, s), _a(), Z = t.memoizedState, E || $ !== Z || Jo ? (typeof he == "function" && (Af(
        t,
        l,
        he,
        i
      ), Z = t.memoizedState), (j = Jo || cg(
        t,
        l,
        j,
        i,
        $,
        Z,
        m
      )) ? (ce || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = Z), u.props = i, u.state = Z, u.context = m, i = j) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      u = t.stateNode, lf(e, t), m = t.memoizedProps, ce = Ki(l, m), u.props = ce, he = t.pendingProps, $ = u.context, Z = l.contextType, j = wr, typeof Z == "object" && Z !== null && (j = Vn(Z)), E = l.getDerivedStateFromProps, (Z = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (m !== he || $ !== j) && ug(
        t,
        u,
        i,
        j
      ), Jo = !1, $ = t.memoizedState, u.state = $, Aa(t, i, u, s), _a();
      var le = t.memoizedState;
      m !== he || $ !== le || Jo || e !== null && e.dependencies !== null && zs(e.dependencies) ? (typeof E == "function" && (Af(
        t,
        l,
        E,
        i
      ), le = t.memoizedState), (ce = Jo || cg(
        t,
        l,
        ce,
        i,
        $,
        le,
        j
      ) || e !== null && e.dependencies !== null && zs(e.dependencies)) ? (Z || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, le, j), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        i,
        le,
        j
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || m === e.memoizedProps && $ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && $ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = le), u.props = i, u.state = le, u.context = j, i = ce) : (typeof u.componentDidUpdate != "function" || m === e.memoizedProps && $ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && $ === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return u = i, $s(e, t), i = (t.flags & 128) !== 0, u || i ? (u = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && i ? (t.child = Pi(
      t,
      e.child,
      null,
      s
    ), t.child = Pi(
      t,
      null,
      l,
      s
    )) : In(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = Ao(
      e,
      t,
      s
    ), e;
  }
  function wg(e, t, l, i) {
    return Hi(), t.flags |= 256, In(e, t, l, i), t.child;
  }
  var zf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kf(e) {
    return { baseLanes: e, cachePool: hm() };
  }
  function Df(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Rl), e;
  }
  function _g(e, t, l) {
    var i = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, m;
    if ((m = u) || (m = e !== null && e.memoizedState === null ? !1 : (dn.current & 2) !== 0), m && (s = !0, t.flags &= -129), m = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Et) {
        if (s ? ti(t) : ni(), (e = Qt) ? (e = Db(
          e,
          Il
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fo !== null ? { id: co, overflow: uo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = im(e), l.return = t, t.child = l, Ln = t, Qt = null)) : e = null, e === null) throw Zo(t);
        return gd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = i.children;
      return i = i.fallback, s ? (ni(), s = t.mode, E = Js(
        { mode: "hidden", children: E },
        s
      ), i = Ii(
        i,
        s,
        l,
        null
      ), E.return = t, i.return = t, E.sibling = i, t.child = E, i = t.child, i.memoizedState = kf(l), i.childLanes = Df(
        e,
        m,
        l
      ), t.memoizedState = zf, za(null, i)) : (ti(t), jf(t, E));
    }
    var j = e.memoizedState;
    if (j !== null && (E = j.dehydrated, E !== null)) {
      if (u)
        t.flags & 256 ? (ti(t), t.flags &= -257, t = Lf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (ni(), t.child = e.child, t.flags |= 128, t = null) : (ni(), E = i.fallback, s = t.mode, i = Js(
          { mode: "visible", children: i.children },
          s
        ), E = Ii(
          E,
          s,
          l,
          null
        ), E.flags |= 2, i.return = t, E.return = t, i.sibling = E, t.child = i, Pi(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = kf(l), i.childLanes = Df(
          e,
          m,
          l
        ), t.memoizedState = zf, t = za(null, i));
      else if (ti(t), gd(E)) {
        if (m = E.nextSibling && E.nextSibling.dataset, m) var Z = m.dgst;
        m = Z, i = Error(a(419)), i.stack = "", i.digest = m, xa({ value: i, source: null, stack: null }), t = Lf(
          e,
          t,
          l
        );
      } else if (xn || Tr(e, t, l, !1), m = (l & e.childLanes) !== 0, xn || m) {
        if (m = Gt, m !== null && (i = fn(m, l), i !== 0 && i !== j.retryLane))
          throw j.retryLane = i, Vi(e, i), fl(m, e, i), Of;
        md(E) || ac(), t = Lf(
          e,
          t,
          l
        );
      } else
        md(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = j.treeContext, Qt = Ul(
          E.nextSibling
        ), Ln = t, Et = !0, Qo = null, Il = !1, e !== null && sm(t, e), t = jf(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (ni(), E = i.fallback, s = t.mode, j = e.child, Z = j.sibling, i = So(j, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = j.subtreeFlags & 65011712, Z !== null ? E = So(
      Z,
      E
    ) : (E = Ii(
      E,
      s,
      l,
      null
    ), E.flags |= 2), E.return = t, i.return = t, i.sibling = E, t.child = i, za(null, i), i = t.child, E = e.child.memoizedState, E === null ? E = kf(l) : (s = E.cachePool, s !== null ? (j = yn._currentValue, s = s.parent !== j ? { parent: j, pool: j } : s) : s = hm(), E = {
      baseLanes: E.baseLanes | l,
      cachePool: s
    }), i.memoizedState = E, i.childLanes = Df(
      e,
      m,
      l
    ), t.memoizedState = zf, za(e.child, i)) : (ti(t), l = e.child, e = l.sibling, l = So(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (m = t.deletions, m === null ? (t.deletions = [e], t.flags |= 16) : m.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function jf(e, t) {
    return t = Js(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Js(e, t) {
    return e = xl(22, e, null, t), e.lanes = 0, e;
  }
  function Lf(e, t, l) {
    return Pi(t, e.child, null, l), e = jf(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ag(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), Zu(e.return, t, l);
  }
  function Vf(e, t, l, i, s, u) {
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
  function Mg(e, t, l) {
    var i = t.pendingProps, s = i.revealOrder, u = i.tail;
    i = i.children;
    var m = dn.current, E = (m & 2) !== 0;
    if (E ? (m = m & 1 | 2, t.flags |= 128) : m &= 1, W(dn, m), In(e, t, i, l), i = Et ? va : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ag(e, l, t);
        else if (e.tag === 19)
          Ag(e, l, t);
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
          e = l.alternate, e !== null && Us(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), Vf(
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
          if (e = s.alternate, e !== null && Us(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        Vf(
          t,
          !0,
          l,
          null,
          u,
          i
        );
        break;
      case "together":
        Vf(
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
  function Ao(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), ii |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Tr(
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
      for (e = t.child, l = So(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = So(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function If(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && zs(e)));
  }
  function JS(e, t, l) {
    switch (t.tag) {
      case 3:
        Te(t, t.stateNode.containerInfo), $o(t, yn, e.memoizedState.cache), Hi();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        Te(t, t.stateNode.containerInfo);
        break;
      case 10:
        $o(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, cf(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (ti(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? _g(e, t, l) : (ti(t), e = Ao(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ti(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (i = (l & t.childLanes) !== 0, i || (Tr(
          e,
          t,
          l,
          !1
        ), i = (l & t.childLanes) !== 0), s) {
          if (i)
            return Mg(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), W(dn, dn.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, xg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        $o(t, yn, e.memoizedState.cache);
    }
    return Ao(e, t, l);
  }
  function Tg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        xn = !0;
      else {
        if (!If(e, l) && (t.flags & 128) === 0)
          return xn = !1, JS(
            e,
            t,
            l
          );
        xn = (e.flags & 131072) !== 0;
      }
    else
      xn = !1, Et && (t.flags & 1048576) !== 0 && am(t, va, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Yi(t.elementType), t.type = e, typeof e == "function")
            Gu(e) ? (i = Ki(e, i), t.tag = 1, t = Rg(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = Nf(
              null,
              t,
              e,
              i,
              l
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === z) {
                t.tag = 11, t = bg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (s === B) {
                t.tag = 14, t = yg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              }
            }
            throw t = de(e) || e, Error(a(306, t, ""));
          }
        }
        return t;
      case 0:
        return Nf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, s = Ki(
          i,
          t.pendingProps
        ), Rg(
          e,
          t,
          i,
          s,
          l
        );
      case 3:
        e: {
          if (Te(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          i = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, lf(e, t), Aa(t, i, null, l);
          var m = t.memoizedState;
          if (i = m.cache, $o(t, yn, i), i !== u.cache && $u(
            t,
            [yn],
            l,
            !0
          ), _a(), i = m.element, u.isDehydrated)
            if (u = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = wg(
                e,
                t,
                i,
                l
              );
              break e;
            } else if (i !== s) {
              s = jl(
                Error(a(424)),
                t
              ), xa(s), t = wg(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Qt = Ul(e.firstChild), Ln = t, Et = !0, Qo = null, Il = !0, l = xm(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Hi(), i === s) {
              t = Ao(
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
        return $s(e, t), e === null ? (l = Ub(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : Et || (l = t.type, e = t.pendingProps, i = hc(
          Ae.current
        ).createElement(l), i[_t] = t, i[Rt] = e, Hn(i, l, e), rn(i), t.stateNode = i) : t.memoizedState = Ub(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && Et && (i = t.stateNode = Vb(
          t.type,
          t.pendingProps,
          Ae.current
        ), Ln = t, Il = !0, s = Qt, ui(t.type) ? (bd = s, Qt = Ul(i.firstChild)) : Qt = s), In(
          e,
          t,
          t.pendingProps.children,
          l
        ), $s(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Et && ((s = i = Qt) && (i = ME(
          i,
          t.type,
          t.pendingProps,
          Il
        ), i !== null ? (t.stateNode = i, Ln = t, Qt = Ul(i.firstChild), Il = !1, s = !0) : s = !1), s || Zo(t)), it(t), s = t.type, u = t.pendingProps, m = e !== null ? e.memoizedProps : null, i = u.children, dd(s, u) ? i = null : m !== null && dd(s, m) && (t.flags |= 32), t.memoizedState !== null && (s = ff(
          e,
          t,
          YS,
          null,
          null,
          l
        ), Ka._currentValue = s), $s(e, t), In(e, t, i, l), t.child;
      case 6:
        return e === null && Et && ((e = l = Qt) && (l = TE(
          l,
          t.pendingProps,
          Il
        ), l !== null ? (t.stateNode = l, Ln = t, Qt = null, e = !0) : e = !1), e || Zo(t)), null;
      case 13:
        return _g(e, t, l);
      case 4:
        return Te(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Pi(
          t,
          null,
          i,
          l
        ) : In(e, t, i, l), t.child;
      case 11:
        return bg(
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
        return i = t.pendingProps, $o(t, t.type, i.value), In(e, t, i.children, l), t.child;
      case 9:
        return s = t.type._context, i = t.pendingProps.children, Bi(t), s = Vn(s), i = i(s), t.flags |= 1, In(e, t, i, l), t.child;
      case 14:
        return yg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return vg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Mg(e, t, l);
      case 31:
        return $S(e, t, l);
      case 22:
        return xg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Bi(t), i = Vn(yn), e === null ? (s = ef(), s === null && (s = Gt, u = Ju(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: i, cache: s }, nf(t), $o(t, yn, s)) : ((e.lanes & l) !== 0 && (lf(e, t), Aa(t, null, null, l), _a()), s = e.memoizedState, u = t.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), $o(t, yn, i)) : (i = u.cache, $o(t, yn, i), i !== s.cache && $u(
          t,
          [yn],
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
  function Mo(e) {
    e.flags |= 4;
  }
  function Hf(e, t, l, i, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (nb()) e.flags |= 8192;
        else
          throw qi = Ls, tf;
    } else e.flags &= -16777217;
  }
  function Og(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Pb(t))
      if (nb()) e.flags |= 8192;
      else
        throw qi = Ls, tf;
  }
  function Ws(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Cn() : 536870912, e.lanes |= t, Br |= t);
  }
  function ka(e, t) {
    if (!Et)
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
  function Zt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, i = 0;
    if (t)
      for (var s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, i |= s.subtreeFlags & 65011712, i |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= i, e.childLanes = l, t;
  }
  function WS(e, t, l) {
    var i = t.pendingProps;
    switch (Xu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Zt(t), null;
      case 1:
        return Zt(t), null;
      case 3:
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Ro(yn), Oe(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Mr(t) ? Mo(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Fu())), Zt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Mo(t), u !== null ? (Zt(t), Og(t, u)) : (Zt(t), Hf(
          t,
          s,
          null,
          i,
          l
        ))) : u ? u !== e.memoizedState ? (Mo(t), Zt(t), Og(t, u)) : (Zt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Mo(t), Zt(t), Hf(
          t,
          s,
          e,
          i,
          l
        )), null;
      case 27:
        if (bt(t), l = Ae.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Mo(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Zt(t), null;
          }
          e = te.current, Mr(t) ? cm(t) : (e = Vb(s, i, l), t.stateNode = e, Mo(t));
        }
        return Zt(t), null;
      case 5:
        if (bt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Mo(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Zt(t), null;
          }
          if (u = te.current, Mr(t))
            cm(t);
          else {
            var m = hc(
              Ae.current
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
            u[_t] = t, u[Rt] = i;
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
            i && Mo(t);
          }
        }
        return Zt(t), Hf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Mo(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(a(166));
          if (e = Ae.current, Mr(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, s = Ln, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            e[_t] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || _b(e.nodeValue, l)), e || Zo(t, !0);
          } else
            e = hc(e).createTextNode(
              i
            ), e[_t] = t, t.stateNode = e;
        }
        return Zt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = Mr(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(a(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[_t] = t;
            } else
              Hi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Zt(t), e = !1;
          } else
            l = Fu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (El(t), t) : (El(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Zt(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Mr(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(a(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(a(317));
              s[_t] = t;
            } else
              Hi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Zt(t), s = !1;
          } else
            s = Fu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (El(t), t) : (El(t), null);
        }
        return El(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), u = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (u = i.memoizedState.cachePool.pool), u !== s && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Ws(t, t.updateQueue), Zt(t), null);
      case 4:
        return Oe(), e === null && ad(t.stateNode.containerInfo), Zt(t), null;
      case 10:
        return Ro(t.type), Zt(t), null;
      case 19:
        if (X(dn), i = t.memoizedState, i === null) return Zt(t), null;
        if (s = (t.flags & 128) !== 0, u = i.rendering, u === null)
          if (s) ka(i, !1);
          else {
            if (un !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Us(e), u !== null) {
                  for (t.flags |= 128, ka(i, !1), e = u.updateQueue, t.updateQueue = e, Ws(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    om(l, e), l = l.sibling;
                  return W(
                    dn,
                    dn.current & 1 | 2
                  ), Et && Eo(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && F() > oc && (t.flags |= 128, s = !0, ka(i, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Us(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, Ws(t, e), ka(i, !0), i.tail === null && i.tailMode === "hidden" && !u.alternate && !Et)
                return Zt(t), null;
            } else
              2 * F() - i.renderingStartTime > oc && l !== 536870912 && (t.flags |= 128, s = !0, ka(i, !1), t.lanes = 4194304);
          i.isBackwards ? (u.sibling = t.child, t.child = u) : (e = i.last, e !== null ? e.sibling = u : t.child = u, i.last = u);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = F(), e.sibling = null, l = dn.current, W(
          dn,
          s ? l & 1 | 2 : l & 1
        ), Et && Eo(t, i.treeForkCount), e) : (Zt(t), null);
      case 22:
      case 23:
        return El(t), sf(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Zt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Zt(t), l = t.updateQueue, l !== null && Ws(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && X(Gi), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Ro(yn), Zt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function eE(e, t) {
    switch (Xu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ro(yn), Oe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return bt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (El(t), t.alternate === null)
            throw Error(a(340));
          Hi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (El(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(a(340));
          Hi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return X(dn), null;
      case 4:
        return Oe(), null;
      case 10:
        return Ro(t.type), null;
      case 22:
      case 23:
        return El(t), sf(), e !== null && X(Gi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ro(yn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ng(e, t) {
    switch (Xu(t), t.tag) {
      case 3:
        Ro(yn), Oe();
        break;
      case 26:
      case 27:
      case 5:
        bt(t);
        break;
      case 4:
        Oe();
        break;
      case 31:
        t.memoizedState !== null && El(t);
        break;
      case 13:
        El(t);
        break;
      case 19:
        X(dn);
        break;
      case 10:
        Ro(t.type);
        break;
      case 22:
      case 23:
        El(t), sf(), e !== null && X(Gi);
        break;
      case 24:
        Ro(yn);
    }
  }
  function Da(e, t) {
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
      Vt(t, t.return, E);
    }
  }
  function li(e, t, l) {
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
              var j = l, Z = E;
              try {
                Z();
              } catch (ce) {
                Vt(
                  s,
                  j,
                  ce
                );
              }
            }
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (ce) {
      Vt(t, t.return, ce);
    }
  }
  function zg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Em(t, l);
      } catch (i) {
        Vt(e, e.return, i);
      }
    }
  }
  function kg(e, t, l) {
    l.props = Ki(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      Vt(e, t, i);
    }
  }
  function ja(e, t) {
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
      Vt(e, t, s);
    }
  }
  function fo(e, t) {
    var l = e.ref, i = e.refCleanup;
    if (l !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          Vt(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (s) {
          Vt(e, t, s);
        }
      else l.current = null;
  }
  function Dg(e) {
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
      Vt(e, e.return, s);
    }
  }
  function Uf(e, t, l) {
    try {
      var i = e.stateNode;
      EE(i, e.type, l, t), i[Rt] = t;
    } catch (s) {
      Vt(e, e.return, s);
    }
  }
  function jg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ui(e.type) || e.tag === 4;
  }
  function Bf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || jg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ui(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Gf(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = D));
    else if (i !== 4 && (i === 27 && ui(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Gf(e, t, l), e = e.sibling; e !== null; )
        Gf(e, t, l), e = e.sibling;
  }
  function ec(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && ui(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (ec(e, t, l), e = e.sibling; e !== null; )
        ec(e, t, l), e = e.sibling;
  }
  function Lg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Hn(t, i, l), t[_t] = e, t[Rt] = l;
    } catch (u) {
      Vt(e, e.return, u);
    }
  }
  var To = !1, Sn = !1, Yf = !1, Vg = typeof WeakSet == "function" ? WeakSet : Set, zn = null;
  function tE(e, t) {
    if (e = e.containerInfo, ud = Sc, e = Qh(e), ju(e)) {
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
            var m = 0, E = -1, j = -1, Z = 0, ce = 0, he = e, $ = null;
            t: for (; ; ) {
              for (var le; he !== l || s !== 0 && he.nodeType !== 3 || (E = m + s), he !== u || i !== 0 && he.nodeType !== 3 || (j = m + i), he.nodeType === 3 && (m += he.nodeValue.length), (le = he.firstChild) !== null; )
                $ = he, he = le;
              for (; ; ) {
                if (he === e) break t;
                if ($ === l && ++Z === s && (E = m), $ === u && ++ce === i && (j = m), (le = he.nextSibling) !== null) break;
                he = $, $ = he.parentNode;
              }
              he = le;
            }
            l = E === -1 || j === -1 ? null : { start: E, end: j };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (fd = { focusedElem: e, selectionRange: l }, Sc = !1, zn = t; zn !== null; )
      if (t = zn, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, zn = e;
      else
        for (; zn !== null; ) {
          switch (t = zn, u = t.alternate, e = t.flags, t.tag) {
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
                  var Ve = Ki(
                    l.type,
                    s
                  );
                  e = i.getSnapshotBeforeUpdate(
                    Ve,
                    u
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ze) {
                  Vt(
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
                  hd(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      hd(e);
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
            e.return = t.return, zn = e;
            break;
          }
          zn = t.return;
        }
  }
  function Ig(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        No(e, l), i & 4 && Da(5, l);
        break;
      case 1:
        if (No(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (m) {
              Vt(l, l.return, m);
            }
          else {
            var s = Ki(
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
              Vt(
                l,
                l.return,
                m
              );
            }
          }
        i & 64 && zg(l), i & 512 && ja(l, l.return);
        break;
      case 3:
        if (No(e, l), i & 64 && (e = l.updateQueue, e !== null)) {
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
            Em(e, t);
          } catch (m) {
            Vt(l, l.return, m);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Lg(l);
      case 26:
      case 5:
        No(e, l), t === null && i & 4 && Dg(l), i & 512 && ja(l, l.return);
        break;
      case 12:
        No(e, l);
        break;
      case 31:
        No(e, l), i & 4 && Bg(e, l);
        break;
      case 13:
        No(e, l), i & 4 && Gg(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = uE.bind(
          null,
          l
        ), OE(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || To, !i) {
          t = t !== null && t.memoizedState !== null || Sn, s = To;
          var u = Sn;
          To = i, (Sn = t) && !u ? zo(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : No(e, l), To = s, Sn = u;
        }
        break;
      case 30:
        break;
      default:
        No(e, l);
    }
  }
  function Hg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Hg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Yo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var en = null, al = !1;
  function Oo(e, t, l) {
    for (l = l.child; l !== null; )
      Ug(e, t, l), l = l.sibling;
  }
  function Ug(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(zt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Sn || fo(l, t), Oo(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Sn || fo(l, t);
        var i = en, s = al;
        ui(l.type) && (en = l.stateNode, al = !1), Oo(
          e,
          t,
          l
        ), qa(l.stateNode), en = i, al = s;
        break;
      case 5:
        Sn || fo(l, t);
      case 6:
        if (i = en, s = al, en = null, Oo(
          e,
          t,
          l
        ), en = i, al = s, en !== null)
          if (al)
            try {
              (en.nodeType === 9 ? en.body : en.nodeName === "HTML" ? en.ownerDocument.body : en).removeChild(l.stateNode);
            } catch (u) {
              Vt(
                l,
                t,
                u
              );
            }
          else
            try {
              en.removeChild(l.stateNode);
            } catch (u) {
              Vt(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        en !== null && (al ? (e = en, zb(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Qr(e)) : zb(en, l.stateNode));
        break;
      case 4:
        i = en, s = al, en = l.stateNode.containerInfo, al = !0, Oo(
          e,
          t,
          l
        ), en = i, al = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        li(2, l, t), Sn || li(4, l, t), Oo(
          e,
          t,
          l
        );
        break;
      case 1:
        Sn || (fo(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && kg(
          l,
          t,
          i
        )), Oo(
          e,
          t,
          l
        );
        break;
      case 21:
        Oo(
          e,
          t,
          l
        );
        break;
      case 22:
        Sn = (i = Sn) || l.memoizedState !== null, Oo(
          e,
          t,
          l
        ), Sn = i;
        break;
      default:
        Oo(
          e,
          t,
          l
        );
    }
  }
  function Bg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Qr(e);
      } catch (l) {
        Vt(t, t.return, l);
      }
    }
  }
  function Gg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Qr(e);
      } catch (l) {
        Vt(t, t.return, l);
      }
  }
  function nE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Vg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Vg()), t;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function tc(e, t) {
    var l = nE(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var s = fE.bind(null, e, i);
        i.then(s, s);
      }
    });
  }
  function sl(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var s = l[i], u = e, m = t, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (ui(E.type)) {
                en = E.stateNode, al = !1;
                break e;
              }
              break;
            case 5:
              en = E.stateNode, al = !1;
              break e;
            case 3:
            case 4:
              en = E.stateNode.containerInfo, al = !0;
              break e;
          }
          E = E.return;
        }
        if (en === null) throw Error(a(160));
        Ug(u, m, s), en = null, al = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Yg(t, e), t = t.sibling;
  }
  var Wl = null;
  function Yg(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        sl(t, e), cl(e), i & 4 && (li(3, e, e.return), Da(3, e), li(5, e, e.return));
        break;
      case 1:
        sl(t, e), cl(e), i & 512 && (Sn || l === null || fo(l, l.return)), i & 64 && To && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var s = Wl;
        if (sl(t, e), cl(e), i & 512 && (Sn || l === null || fo(l, l.return)), i & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (i) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[io] || u[_t] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(i), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Hn(u, i, l), u[_t] = e, rn(u), i = u;
                      break e;
                    case "link":
                      var m = Yb(
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
                      u = s.createElement(i), Hn(u, i, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (m = Yb(
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
                      u = s.createElement(i), Hn(u, i, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(a(468, i));
                  }
                  u[_t] = e, rn(u), i = u;
                }
                e.stateNode = i;
              } else
                qb(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Gb(
                s,
                i,
                e.memoizedProps
              );
          else
            u !== i ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, i === null ? qb(
              s,
              e.type,
              e.stateNode
            ) : Gb(
              s,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && Uf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        sl(t, e), cl(e), i & 512 && (Sn || l === null || fo(l, l.return)), l !== null && i & 4 && Uf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (sl(t, e), cl(e), i & 512 && (Sn || l === null || fo(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            ln(s, "");
          } catch (Ve) {
            Vt(e, e.return, Ve);
          }
        }
        i & 4 && e.stateNode != null && (s = e.memoizedProps, Uf(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), i & 1024 && (Yf = !0);
        break;
      case 6:
        if (sl(t, e), cl(e), i & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (Ve) {
            Vt(e, e.return, Ve);
          }
        }
        break;
      case 3:
        if (bc = null, s = Wl, Wl = mc(t.containerInfo), sl(t, e), Wl = s, cl(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Qr(t.containerInfo);
          } catch (Ve) {
            Vt(e, e.return, Ve);
          }
        Yf && (Yf = !1, qg(e));
        break;
      case 4:
        i = Wl, Wl = mc(
          e.stateNode.containerInfo
        ), sl(t, e), cl(e), Wl = i;
        break;
      case 12:
        sl(t, e), cl(e);
        break;
      case 31:
        sl(t, e), cl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, tc(e, i)));
        break;
      case 13:
        sl(t, e), cl(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (lc = F()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, tc(e, i)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var j = l !== null && l.memoizedState !== null, Z = To, ce = Sn;
        if (To = Z || s, Sn = ce || j, sl(t, e), Sn = ce, To = Z, cl(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || j || To || Sn || Fi(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                j = l = t;
                try {
                  if (u = j.stateNode, s)
                    m = u.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    E = j.stateNode;
                    var he = j.memoizedProps.style, $ = he != null && he.hasOwnProperty("display") ? he.display : null;
                    E.style.display = $ == null || typeof $ == "boolean" ? "" : ("" + $).trim();
                  }
                } catch (Ve) {
                  Vt(j, j.return, Ve);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = s ? "" : j.memoizedProps;
                } catch (Ve) {
                  Vt(j, j.return, Ve);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                j = t;
                try {
                  var le = j.stateNode;
                  s ? kb(le, !0) : kb(j.stateNode, !1);
                } catch (Ve) {
                  Vt(j, j.return, Ve);
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
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, tc(e, l))));
        break;
      case 19:
        sl(t, e), cl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, tc(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        sl(t, e), cl(e);
    }
  }
  function cl(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, i = e.return; i !== null; ) {
          if (jg(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = Bf(e);
            ec(e, u, s);
            break;
          case 5:
            var m = l.stateNode;
            l.flags & 32 && (ln(m, ""), l.flags &= -33);
            var E = Bf(e);
            ec(e, E, m);
            break;
          case 3:
          case 4:
            var j = l.stateNode.containerInfo, Z = Bf(e);
            Gf(
              e,
              Z,
              j
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (ce) {
        Vt(e, e.return, ce);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function qg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        qg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function No(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ig(e, t.alternate, t), t = t.sibling;
  }
  function Fi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          li(4, t, t.return), Fi(t);
          break;
        case 1:
          fo(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && kg(
            t,
            t.return,
            l
          ), Fi(t);
          break;
        case 27:
          qa(t.stateNode);
        case 26:
        case 5:
          fo(t, t.return), Fi(t);
          break;
        case 22:
          t.memoizedState === null && Fi(t);
          break;
        case 30:
          Fi(t);
          break;
        default:
          Fi(t);
      }
      e = e.sibling;
    }
  }
  function zo(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, s = e, u = t, m = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          zo(
            s,
            u,
            l
          ), Da(4, u);
          break;
        case 1:
          if (zo(
            s,
            u,
            l
          ), i = u, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (Z) {
              Vt(i, i.return, Z);
            }
          if (i = u, s = i.updateQueue, s !== null) {
            var E = i.stateNode;
            try {
              var j = s.shared.hiddenCallbacks;
              if (j !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < j.length; s++)
                  Sm(j[s], E);
            } catch (Z) {
              Vt(i, i.return, Z);
            }
          }
          l && m & 64 && zg(u), ja(u, u.return);
          break;
        case 27:
          Lg(u);
        case 26:
        case 5:
          zo(
            s,
            u,
            l
          ), l && i === null && m & 4 && Dg(u), ja(u, u.return);
          break;
        case 12:
          zo(
            s,
            u,
            l
          );
          break;
        case 31:
          zo(
            s,
            u,
            l
          ), l && m & 4 && Bg(s, u);
          break;
        case 13:
          zo(
            s,
            u,
            l
          ), l && m & 4 && Gg(s, u);
          break;
        case 22:
          u.memoizedState === null && zo(
            s,
            u,
            l
          ), ja(u, u.return);
          break;
        case 30:
          break;
        default:
          zo(
            s,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function qf(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Sa(l));
  }
  function Pf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Sa(e));
  }
  function eo(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Pg(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Pg(e, t, l, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        eo(
          e,
          t,
          l,
          i
        ), s & 2048 && Da(9, t);
        break;
      case 1:
        eo(
          e,
          t,
          l,
          i
        );
        break;
      case 3:
        eo(
          e,
          t,
          l,
          i
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Sa(e)));
        break;
      case 12:
        if (s & 2048) {
          eo(
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
            Vt(t, t.return, j);
          }
        } else
          eo(
            e,
            t,
            l,
            i
          );
        break;
      case 31:
        eo(
          e,
          t,
          l,
          i
        );
        break;
      case 13:
        eo(
          e,
          t,
          l,
          i
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, m = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? eo(
          e,
          t,
          l,
          i
        ) : La(e, t) : u._visibility & 2 ? eo(
          e,
          t,
          l,
          i
        ) : (u._visibility |= 2, Ir(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && qf(m, t);
        break;
      case 24:
        eo(
          e,
          t,
          l,
          i
        ), s & 2048 && Pf(t.alternate, t);
        break;
      default:
        eo(
          e,
          t,
          l,
          i
        );
    }
  }
  function Ir(e, t, l, i, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, m = t, E = l, j = i, Z = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Ir(
            u,
            m,
            E,
            j,
            s
          ), Da(8, m);
          break;
        case 23:
          break;
        case 22:
          var ce = m.stateNode;
          m.memoizedState !== null ? ce._visibility & 2 ? Ir(
            u,
            m,
            E,
            j,
            s
          ) : La(
            u,
            m
          ) : (ce._visibility |= 2, Ir(
            u,
            m,
            E,
            j,
            s
          )), s && Z & 2048 && qf(
            m.alternate,
            m
          );
          break;
        case 24:
          Ir(
            u,
            m,
            E,
            j,
            s
          ), s && Z & 2048 && Pf(m.alternate, m);
          break;
        default:
          Ir(
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
  function La(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, s = i.flags;
        switch (i.tag) {
          case 22:
            La(l, i), s & 2048 && qf(
              i.alternate,
              i
            );
            break;
          case 24:
            La(l, i), s & 2048 && Pf(i.alternate, i);
            break;
          default:
            La(l, i);
        }
        t = t.sibling;
      }
  }
  var Va = 8192;
  function Hr(e, t, l) {
    if (e.subtreeFlags & Va)
      for (e = e.child; e !== null; )
        Xg(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Xg(e, t, l) {
    switch (e.tag) {
      case 26:
        Hr(
          e,
          t,
          l
        ), e.flags & Va && e.memoizedState !== null && GE(
          l,
          Wl,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Hr(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = Wl;
        Wl = mc(e.stateNode.containerInfo), Hr(
          e,
          t,
          l
        ), Wl = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = Va, Va = 16777216, Hr(
          e,
          t,
          l
        ), Va = i) : Hr(
          e,
          t,
          l
        ));
        break;
      default:
        Hr(
          e,
          t,
          l
        );
    }
  }
  function Kg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ia(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          zn = i, Qg(
            i,
            e
          );
        }
      Kg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Fg(e), e = e.sibling;
  }
  function Fg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ia(e), e.flags & 2048 && li(9, e, e.return);
        break;
      case 3:
        Ia(e);
        break;
      case 12:
        Ia(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, nc(e)) : Ia(e);
        break;
      default:
        Ia(e);
    }
  }
  function nc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          zn = i, Qg(
            i,
            e
          );
        }
      Kg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          li(8, t, t.return), nc(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, nc(t));
          break;
        default:
          nc(t);
      }
      e = e.sibling;
    }
  }
  function Qg(e, t) {
    for (; zn !== null; ) {
      var l = zn;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          li(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Sa(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, zn = i;
      else
        e: for (l = e; zn !== null; ) {
          i = zn;
          var s = i.sibling, u = i.return;
          if (Hg(i), i === l) {
            zn = null;
            break e;
          }
          if (s !== null) {
            s.return = u, zn = s;
            break e;
          }
          zn = u;
        }
    }
  }
  var lE = {
    getCacheForType: function(e) {
      var t = Vn(yn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Vn(yn).controller.signal;
    }
  }, oE = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Gt = null, mt = null, yt = 0, Lt = 0, Cl = null, oi = !1, Ur = !1, Xf = !1, ko = 0, un = 0, ii = 0, Qi = 0, Kf = 0, Rl = 0, Br = 0, Ha = null, ul = null, Ff = !1, lc = 0, Zg = 0, oc = 1 / 0, ic = null, ri = null, _n = 0, ai = null, Gr = null, Do = 0, Qf = 0, Zf = null, $g = null, Ua = 0, $f = null;
  function wl() {
    return (Nt & 2) !== 0 && yt !== 0 ? yt & -yt : V.T !== null ? ld() : nl();
  }
  function Jg() {
    if (Rl === 0)
      if ((yt & 536870912) === 0 || Et) {
        var e = kt;
        kt <<= 1, (kt & 3932160) === 0 && (kt = 262144), Rl = e;
      } else Rl = 536870912;
    return e = Sl.current, e !== null && (e.flags |= 32), Rl;
  }
  function fl(e, t, l) {
    (e === Gt && (Lt === 2 || Lt === 9) || e.cancelPendingCommit !== null) && (Yr(e, 0), si(
      e,
      yt,
      Rl,
      !1
    )), tl(e, l), ((Nt & 2) === 0 || e !== Gt) && (e === Gt && ((Nt & 2) === 0 && (Qi |= l), un === 4 && si(
      e,
      yt,
      Rl,
      !1
    )), po(e));
  }
  function Wg(e, t, l) {
    if ((Nt & 6) !== 0) throw Error(a(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Dt(e, t), s = i ? aE(e, t) : Wf(e, t, !0), u = i;
    do {
      if (s === 0) {
        Ur && !i && si(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !iE(l)) {
          s = Wf(e, t, !1), u = !1;
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
              s = Ha;
              var j = E.current.memoizedState.isDehydrated;
              if (j && (Yr(E, m).flags |= 256), m = Wf(
                E,
                m,
                !1
              ), m !== 2) {
                if (Xf && !j) {
                  E.errorRecoveryDisabledLanes |= u, Qi |= u, s = 4;
                  break e;
                }
                u = ul, ul = s, u !== null && (ul === null ? ul = u : ul.push.apply(
                  ul,
                  u
                ));
              }
              s = m;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Yr(e, 0), si(e, t, 0, !0);
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
              si(
                i,
                t,
                Rl,
                !oi
              );
              break e;
            case 2:
              ul = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((t & 62914560) === t && (s = lc + 300 - F(), 10 < s)) {
            if (si(
              i,
              t,
              Rl,
              !oi
            ), Je(i, 0, !0) !== 0) break e;
            Do = t, i.timeoutHandle = Ob(
              eb.bind(
                null,
                i,
                l,
                ul,
                ic,
                Ff,
                t,
                Rl,
                Qi,
                Br,
                oi,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          eb(
            i,
            l,
            ul,
            ic,
            Ff,
            t,
            Rl,
            Qi,
            Br,
            oi,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    po(e);
  }
  function eb(e, t, l, i, s, u, m, E, j, Z, ce, he, $, le) {
    if (e.timeoutHandle = -1, he = t.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: D
      }, Xg(
        t,
        u,
        he
      );
      var Ve = (u & 62914560) === u ? lc - F() : (u & 4194048) === u ? Zg - F() : 0;
      if (Ve = YE(
        he,
        Ve
      ), Ve !== null) {
        Do = u, e.cancelPendingCommit = Ve(
          sb.bind(
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
            ce,
            he,
            null,
            $,
            le
          )
        ), si(e, u, m, !Z);
        return;
      }
    }
    sb(
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
  function iE(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var i = 0; i < l.length; i++) {
          var s = l[i], u = s.getSnapshot;
          s = s.value;
          try {
            if (!vl(u(), s)) return !1;
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
  function si(e, t, l, i) {
    t &= ~Kf, t &= ~Qi, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - dt(s), m = 1 << u;
      i[u] = -1, s &= ~m;
    }
    l !== 0 && lo(e, l, t);
  }
  function rc() {
    return (Nt & 6) === 0 ? (Ba(0), !1) : !0;
  }
  function Jf() {
    if (mt !== null) {
      if (Lt === 0)
        var e = mt.return;
      else
        e = mt, Co = Ui = null, hf(e), kr = null, Ca = 0, e = mt;
      for (; e !== null; )
        Ng(e.alternate, e), e = e.return;
      mt = null;
    }
  }
  function Yr(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, wE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Do = 0, Jf(), Gt = e, mt = l = So(e.current, null), yt = t, Lt = 0, Cl = null, oi = !1, Ur = Dt(e, t), Xf = !1, Br = Rl = Kf = Qi = ii = un = 0, ul = Ha = null, Ff = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - dt(i), u = 1 << s;
        t |= e[s], i &= ~u;
      }
    return ko = t, As(), l;
  }
  function tb(e, t) {
    rt = null, V.H = Na, t === zr || t === js ? (t = bm(), Lt = 3) : t === tf ? (t = bm(), Lt = 4) : Lt = t === Of ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Cl = t, mt === null && (un = 1, Qs(
      e,
      jl(t, e.current)
    ));
  }
  function nb() {
    var e = Sl.current;
    return e === null ? !0 : (yt & 4194048) === yt ? Hl === null : (yt & 62914560) === yt || (yt & 536870912) !== 0 ? e === Hl : !1;
  }
  function lb() {
    var e = V.H;
    return V.H = Na, e === null ? Na : e;
  }
  function ob() {
    var e = V.A;
    return V.A = lE, e;
  }
  function ac() {
    un = 4, oi || (yt & 4194048) !== yt && Sl.current !== null || (Ur = !0), (ii & 134217727) === 0 && (Qi & 134217727) === 0 || Gt === null || si(
      Gt,
      yt,
      Rl,
      !1
    );
  }
  function Wf(e, t, l) {
    var i = Nt;
    Nt |= 2;
    var s = lb(), u = ob();
    (Gt !== e || yt !== t) && (ic = null, Yr(e, t)), t = !1;
    var m = un;
    e: do
      try {
        if (Lt !== 0 && mt !== null) {
          var E = mt, j = Cl;
          switch (Lt) {
            case 8:
              Jf(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Sl.current === null && (t = !0);
              var Z = Lt;
              if (Lt = 0, Cl = null, qr(e, E, j, Z), l && Ur) {
                m = 0;
                break e;
              }
              break;
            default:
              Z = Lt, Lt = 0, Cl = null, qr(e, E, j, Z);
          }
        }
        rE(), m = un;
        break;
      } catch (ce) {
        tb(e, ce);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Co = Ui = null, Nt = i, V.H = s, V.A = u, mt === null && (Gt = null, yt = 0, As()), m;
  }
  function rE() {
    for (; mt !== null; ) ib(mt);
  }
  function aE(e, t) {
    var l = Nt;
    Nt |= 2;
    var i = lb(), s = ob();
    Gt !== e || yt !== t ? (ic = null, oc = F() + 500, Yr(e, t)) : Ur = Dt(
      e,
      t
    );
    e: do
      try {
        if (Lt !== 0 && mt !== null) {
          t = mt;
          var u = Cl;
          t: switch (Lt) {
            case 1:
              Lt = 0, Cl = null, qr(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (mm(u)) {
                Lt = 0, Cl = null, rb(t);
                break;
              }
              t = function() {
                Lt !== 2 && Lt !== 9 || Gt !== e || (Lt = 7), po(e);
              }, u.then(t, t);
              break e;
            case 3:
              Lt = 7;
              break e;
            case 4:
              Lt = 5;
              break e;
            case 7:
              mm(u) ? (Lt = 0, Cl = null, rb(t)) : (Lt = 0, Cl = null, qr(e, t, u, 7));
              break;
            case 5:
              var m = null;
              switch (mt.tag) {
                case 26:
                  m = mt.memoizedState;
                case 5:
                case 27:
                  var E = mt;
                  if (m ? Pb(m) : E.stateNode.complete) {
                    Lt = 0, Cl = null;
                    var j = E.sibling;
                    if (j !== null) mt = j;
                    else {
                      var Z = E.return;
                      Z !== null ? (mt = Z, sc(Z)) : mt = null;
                    }
                    break t;
                  }
              }
              Lt = 0, Cl = null, qr(e, t, u, 5);
              break;
            case 6:
              Lt = 0, Cl = null, qr(e, t, u, 6);
              break;
            case 8:
              Jf(), un = 6;
              break e;
            default:
              throw Error(a(462));
          }
        }
        sE();
        break;
      } catch (ce) {
        tb(e, ce);
      }
    while (!0);
    return Co = Ui = null, V.H = i, V.A = s, Nt = l, mt !== null ? 0 : (Gt = null, yt = 0, As(), un);
  }
  function sE() {
    for (; mt !== null && !Xe(); )
      ib(mt);
  }
  function ib(e) {
    var t = Tg(e.alternate, e, ko);
    e.memoizedProps = e.pendingProps, t === null ? sc(e) : mt = t;
  }
  function rb(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Cg(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          yt
        );
        break;
      case 11:
        t = Cg(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          yt
        );
        break;
      case 5:
        hf(t);
      default:
        Ng(l, t), t = mt = om(t, ko), t = Tg(l, t, ko);
    }
    e.memoizedProps = e.pendingProps, t === null ? sc(e) : mt = t;
  }
  function qr(e, t, l, i) {
    Co = Ui = null, hf(t), kr = null, Ca = 0;
    var s = t.return;
    try {
      if (ZS(
        e,
        s,
        t,
        l,
        yt
      )) {
        un = 1, Qs(
          e,
          jl(l, e.current)
        ), mt = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw mt = s, u;
      un = 1, Qs(
        e,
        jl(l, e.current)
      ), mt = null;
      return;
    }
    t.flags & 32768 ? (Et || i === 1 ? e = !0 : Ur || (yt & 536870912) !== 0 ? e = !1 : (oi = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Sl.current, i !== null && i.tag === 13 && (i.flags |= 16384))), ab(t, e)) : sc(t);
  }
  function sc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        ab(
          t,
          oi
        );
        return;
      }
      e = t.return;
      var l = WS(
        t.alternate,
        t,
        ko
      );
      if (l !== null) {
        mt = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        mt = t;
        return;
      }
      mt = t = e;
    } while (t !== null);
    un === 0 && (un = 5);
  }
  function ab(e, t) {
    do {
      var l = eE(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, mt = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        mt = e;
        return;
      }
      mt = e = l;
    } while (e !== null);
    un = 6, mt = null;
  }
  function sb(e, t, l, i, s, u, m, E, j) {
    e.cancelPendingCommit = null;
    do
      cc();
    while (_n !== 0);
    if ((Nt & 6) !== 0) throw Error(a(327));
    if (t !== null) {
      if (t === e.current) throw Error(a(177));
      if (u = t.lanes | t.childLanes, u |= Uu, jt(
        e,
        l,
        u,
        m,
        E,
        j
      ), e === Gt && (mt = Gt = null, yt = 0), Gr = t, ai = e, Do = l, Qf = u, Zf = s, $g = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, dE(Ge, function() {
        return pb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null, s = H.p, H.p = 2, m = Nt, Nt |= 4;
        try {
          tE(e, t, l);
        } finally {
          Nt = m, H.p = s, V.T = i;
        }
      }
      _n = 1, cb(), ub(), fb();
    }
  }
  function cb() {
    if (_n === 1) {
      _n = 0;
      var e = ai, t = Gr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = V.T, V.T = null;
        var i = H.p;
        H.p = 2;
        var s = Nt;
        Nt |= 4;
        try {
          Yg(t, e);
          var u = fd, m = Qh(e.containerInfo), E = u.focusedElem, j = u.selectionRange;
          if (m !== E && E && E.ownerDocument && Fh(
            E.ownerDocument.documentElement,
            E
          )) {
            if (j !== null && ju(E)) {
              var Z = j.start, ce = j.end;
              if (ce === void 0 && (ce = Z), "selectionStart" in E)
                E.selectionStart = Z, E.selectionEnd = Math.min(
                  ce,
                  E.value.length
                );
              else {
                var he = E.ownerDocument || document, $ = he && he.defaultView || window;
                if ($.getSelection) {
                  var le = $.getSelection(), Ve = E.textContent.length, Ze = Math.min(j.start, Ve), Ut = j.end === void 0 ? Ze : Math.min(j.end, Ve);
                  !le.extend && Ze > Ut && (m = Ut, Ut = Ze, Ze = m);
                  var q = Kh(
                    E,
                    Ze
                  ), U = Kh(
                    E,
                    Ut
                  );
                  if (q && U && (le.rangeCount !== 1 || le.anchorNode !== q.node || le.anchorOffset !== q.offset || le.focusNode !== U.node || le.focusOffset !== U.offset)) {
                    var Q = he.createRange();
                    Q.setStart(q.node, q.offset), le.removeAllRanges(), Ze > Ut ? (le.addRange(Q), le.extend(U.node, U.offset)) : (Q.setEnd(U.node, U.offset), le.addRange(Q));
                  }
                }
              }
            }
            for (he = [], le = E; le = le.parentNode; )
              le.nodeType === 1 && he.push({
                element: le,
                left: le.scrollLeft,
                top: le.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < he.length; E++) {
              var fe = he[E];
              fe.element.scrollLeft = fe.left, fe.element.scrollTop = fe.top;
            }
          }
          Sc = !!ud, fd = ud = null;
        } finally {
          Nt = s, H.p = i, V.T = l;
        }
      }
      e.current = t, _n = 2;
    }
  }
  function ub() {
    if (_n === 2) {
      _n = 0;
      var e = ai, t = Gr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var i = H.p;
        H.p = 2;
        var s = Nt;
        Nt |= 4;
        try {
          Ig(e, t.alternate, t);
        } finally {
          Nt = s, H.p = i, V.T = l;
        }
      }
      _n = 3;
    }
  }
  function fb() {
    if (_n === 4 || _n === 3) {
      _n = 0, ve();
      var e = ai, t = Gr, l = Do, i = $g;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? _n = 5 : (_n = 0, Gr = ai = null, db(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (ri = null), zl(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            zt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = V.T, s = H.p, H.p = 2, V.T = null;
        try {
          for (var u = e.onRecoverableError, m = 0; m < i.length; m++) {
            var E = i[m];
            u(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          V.T = t, H.p = s;
        }
      }
      (Do & 3) !== 0 && cc(), po(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === $f ? Ua++ : (Ua = 0, $f = e) : Ua = 0, Ba(0);
    }
  }
  function db(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Sa(t)));
  }
  function cc() {
    return cb(), ub(), fb(), pb();
  }
  function pb() {
    if (_n !== 5) return !1;
    var e = ai, t = Qf;
    Qf = 0;
    var l = zl(Do), i = V.T, s = H.p;
    try {
      H.p = 32 > l ? 32 : l, V.T = null, l = Zf, Zf = null;
      var u = ai, m = Do;
      if (_n = 0, Gr = ai = null, Do = 0, (Nt & 6) !== 0) throw Error(a(331));
      var E = Nt;
      if (Nt |= 4, Fg(u.current), Pg(
        u,
        u.current,
        m,
        l
      ), Nt = E, Ba(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(zt, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = s, V.T = i, db(e, t);
    }
  }
  function hb(e, t, l) {
    t = jl(l, t), t = Tf(e.stateNode, t, 2), e = ei(e, t, 2), e !== null && (tl(e, 2), po(e));
  }
  function Vt(e, t, l) {
    if (e.tag === 3)
      hb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          hb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ri === null || !ri.has(i))) {
            e = jl(l, e), l = mg(2), i = ei(t, l, 2), i !== null && (gg(
              l,
              i,
              t,
              e
            ), tl(i, 2), po(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function ed(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new oE();
      var s = /* @__PURE__ */ new Set();
      i.set(t, s);
    } else
      s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
    s.has(l) || (Xf = !0, s.add(l), e = cE.bind(null, e, t, l), t.then(e, e));
  }
  function cE(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Gt === e && (yt & l) === l && (un === 4 || un === 3 && (yt & 62914560) === yt && 300 > F() - lc ? (Nt & 2) === 0 && Yr(e, 0) : Kf |= l, Br === yt && (Br = 0)), po(e);
  }
  function mb(e, t) {
    t === 0 && (t = Cn()), e = Vi(e, t), e !== null && (tl(e, t), po(e));
  }
  function uE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), mb(e, l);
  }
  function fE(e, t) {
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
    i !== null && i.delete(t), mb(e, l);
  }
  function dE(e, t) {
    return $e(e, t);
  }
  var uc = null, Pr = null, td = !1, fc = !1, nd = !1, ci = 0;
  function po(e) {
    e !== Pr && e.next === null && (Pr === null ? uc = Pr = e : Pr = Pr.next = e), fc = !0, td || (td = !0, hE());
  }
  function Ba(e, t) {
    if (!nd && fc) {
      nd = !0;
      do
        for (var l = !1, i = uc; i !== null; ) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var m = i.suspendedLanes, E = i.pingedLanes;
              u = (1 << 31 - dt(42 | e) + 1) - 1, u &= s & ~(m & ~E), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, vb(i, u));
          } else
            u = yt, u = Je(
              i,
              i === Gt ? u : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (u & 3) === 0 || Dt(i, u) || (l = !0, vb(i, u));
          i = i.next;
        }
      while (l);
      nd = !1;
    }
  }
  function pE() {
    gb();
  }
  function gb() {
    fc = td = !1;
    var e = 0;
    ci !== 0 && RE() && (e = ci);
    for (var t = F(), l = null, i = uc; i !== null; ) {
      var s = i.next, u = bb(i, t);
      u === 0 ? (i.next = null, l === null ? uc = s : l.next = s, s === null && (Pr = l)) : (l = i, (e !== 0 || (u & 3) !== 0) && (fc = !0)), i = s;
    }
    _n !== 0 && _n !== 5 || Ba(e), ci !== 0 && (ci = 0);
  }
  function bb(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var m = 31 - dt(u), E = 1 << m, j = s[m];
      j === -1 ? ((E & l) === 0 || (E & i) !== 0) && (s[m] = On(E, t)) : j <= t && (e.expiredLanes |= E), u &= ~E;
    }
    if (t = Gt, l = yt, l = Je(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, l === 0 || e === t && (Lt === 2 || Lt === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && tt(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Dt(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (i !== null && tt(i), zl(l)) {
        case 2:
        case 8:
          l = Re;
          break;
        case 32:
          l = Ge;
          break;
        case 268435456:
          l = Ot;
          break;
        default:
          l = Ge;
      }
      return i = yb.bind(null, e), l = $e(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && tt(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function yb(e, t) {
    if (_n !== 0 && _n !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (cc() && e.callbackNode !== l)
      return null;
    var i = yt;
    return i = Je(
      e,
      e === Gt ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (Wg(e, i, t), bb(e, F()), e.callbackNode != null && e.callbackNode === l ? yb.bind(null, e) : null);
  }
  function vb(e, t) {
    if (cc()) return null;
    Wg(e, t, !0);
  }
  function hE() {
    _E(function() {
      (Nt & 6) !== 0 ? $e(
        Ie,
        pE
      ) : gb();
    });
  }
  function ld() {
    if (ci === 0) {
      var e = Or;
      e === 0 && (e = Tn, Tn <<= 1, (Tn & 261888) === 0 && (Tn = 256)), ci = e;
    }
    return ci;
  }
  function xb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : O("" + e);
  }
  function Sb(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function mE(e, t, l, i, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = xb(
        (s[Rt] || null).action
      ), m = i.submitter;
      m && (t = (t = m[Rt] || null) ? xb(t.formAction) : m.getAttribute("formAction"), t !== null && (u = t, m = null));
      var E = new bn(
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
                if (ci !== 0) {
                  var j = m ? Sb(s, m) : new FormData(s);
                  Cf(
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
                typeof u == "function" && (E.preventDefault(), j = m ? Sb(s, m) : new FormData(s), Cf(
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
  for (var od = 0; od < Hu.length; od++) {
    var id = Hu[od], gE = id.toLowerCase(), bE = id[0].toUpperCase() + id.slice(1);
    Jl(
      gE,
      "on" + bE
    );
  }
  Jl(Jh, "onAnimationEnd"), Jl(Wh, "onAnimationIteration"), Jl(em, "onAnimationStart"), Jl("dblclick", "onDoubleClick"), Jl("focusin", "onFocus"), Jl("focusout", "onBlur"), Jl(kS, "onTransitionRun"), Jl(DS, "onTransitionStart"), Jl(jS, "onTransitionCancel"), Jl(tm, "onTransitionEnd"), Fl("onMouseEnter", ["mouseout", "mouseover"]), Fl("onMouseLeave", ["mouseout", "mouseover"]), Fl("onPointerEnter", ["pointerout", "pointerover"]), Fl("onPointerLeave", ["pointerout", "pointerover"]), kl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), kl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), kl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), kl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), kl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), kl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ga = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), yE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ga)
  );
  function Eb(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], s = i.event;
      i = i.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var m = i.length - 1; 0 <= m; m--) {
            var E = i[m], j = E.instance, Z = E.currentTarget;
            if (E = E.listener, j !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = Z;
            try {
              u(s);
            } catch (ce) {
              _s(ce);
            }
            s.currentTarget = null, u = j;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (E = i[m], j = E.instance, Z = E.currentTarget, E = E.listener, j !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = Z;
            try {
              u(s);
            } catch (ce) {
              _s(ce);
            }
            s.currentTarget = null, u = j;
          }
      }
    }
  }
  function gt(e, t) {
    var l = t[Fn];
    l === void 0 && (l = t[Fn] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (Cb(t, e, 2, !1), l.add(i));
  }
  function rd(e, t, l) {
    var i = 0;
    t && (i |= 4), Cb(
      l,
      e,
      i,
      t
    );
  }
  var dc = "_reactListening" + Math.random().toString(36).slice(2);
  function ad(e) {
    if (!e[dc]) {
      e[dc] = !0, an.forEach(function(l) {
        l !== "selectionchange" && (yE.has(l) || rd(l, !1, e), rd(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[dc] || (t[dc] = !0, rd("selectionchange", !1, t));
    }
  }
  function Cb(e, t, l, i) {
    switch (Jb(t)) {
      case 2:
        var s = XE;
        break;
      case 8:
        s = KE;
        break;
      default:
        s = Ed;
    }
    l = s.bind(
      null,
      t,
      l,
      e
    ), s = void 0, !we || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), i ? s !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, l, !0) : s !== void 0 ? e.addEventListener(t, l, {
      passive: s
    }) : e.addEventListener(t, l, !1);
  }
  function sd(e, t, l, i, s) {
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
            if (m = gl(E), m === null) return;
            if (j = m.tag, j === 5 || j === 6 || j === 26 || j === 27) {
              i = u = m;
              continue e;
            }
            E = E.parentNode;
          }
        }
        i = i.return;
      }
    Ue(function() {
      var Z = u, ce = ne(l), he = [];
      e: {
        var $ = nm.get(e);
        if ($ !== void 0) {
          var le = bn, Ve = e;
          switch (e) {
            case "keypress":
              if (Pt(l) === 0) break e;
            case "keydown":
            case "keyup":
              le = fS;
              break;
            case "focusin":
              Ve = "focus", le = Ou;
              break;
            case "focusout":
              Ve = "blur", le = Ou;
              break;
            case "beforeblur":
            case "afterblur":
              le = Ou;
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
              le = Nh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              le = W1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              le = hS;
              break;
            case Jh:
            case Wh:
            case em:
              le = nS;
              break;
            case tm:
              le = gS;
              break;
            case "scroll":
            case "scrollend":
              le = yr;
              break;
            case "wheel":
              le = yS;
              break;
            case "copy":
            case "cut":
            case "paste":
              le = oS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              le = kh;
              break;
            case "toggle":
            case "beforetoggle":
              le = xS;
          }
          var Ze = (t & 4) !== 0, Ut = !Ze && (e === "scroll" || e === "scrollend"), q = Ze ? $ !== null ? $ + "Capture" : null : $;
          Ze = [];
          for (var U = Z, Q; U !== null; ) {
            var fe = U;
            if (Q = fe.stateNode, fe = fe.tag, fe !== 5 && fe !== 26 && fe !== 27 || Q === null || q === null || (fe = re(U, q), fe != null && Ze.push(
              Ya(U, fe, Q)
            )), Ut) break;
            U = U.return;
          }
          0 < Ze.length && ($ = new le(
            $,
            Ve,
            null,
            l,
            ce
          ), he.push({ event: $, listeners: Ze }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if ($ = e === "mouseover" || e === "pointerover", le = e === "mouseout" || e === "pointerout", $ && l !== G && (Ve = l.relatedTarget || l.fromElement) && (gl(Ve) || Ve[Ye]))
            break e;
          if ((le || $) && ($ = ce.window === ce ? ce : ($ = ce.ownerDocument) ? $.defaultView || $.parentWindow : window, le ? (Ve = l.relatedTarget || l.toElement, le = Z, Ve = Ve ? gl(Ve) : null, Ve !== null && (Ut = f(Ve), Ze = Ve.tag, Ve !== Ut || Ze !== 5 && Ze !== 27 && Ze !== 6) && (Ve = null)) : (le = null, Ve = Z), le !== Ve)) {
            if (Ze = Nh, fe = "onMouseLeave", q = "onMouseEnter", U = "mouse", (e === "pointerout" || e === "pointerover") && (Ze = kh, fe = "onPointerLeave", q = "onPointerEnter", U = "pointer"), Ut = le == null ? $ : ol(le), Q = Ve == null ? $ : ol(Ve), $ = new Ze(
              fe,
              U + "leave",
              le,
              l,
              ce
            ), $.target = Ut, $.relatedTarget = Q, fe = null, gl(ce) === Z && (Ze = new Ze(
              q,
              U + "enter",
              Ve,
              l,
              ce
            ), Ze.target = Q, Ze.relatedTarget = Ut, fe = Ze), Ut = fe, le && Ve)
              t: {
                for (Ze = vE, q = le, U = Ve, Q = 0, fe = q; fe; fe = Ze(fe))
                  Q++;
                fe = 0;
                for (var Pe = U; Pe; Pe = Ze(Pe))
                  fe++;
                for (; 0 < Q - fe; )
                  q = Ze(q), Q--;
                for (; 0 < fe - Q; )
                  U = Ze(U), fe--;
                for (; Q--; ) {
                  if (q === U || U !== null && q === U.alternate) {
                    Ze = q;
                    break t;
                  }
                  q = Ze(q), U = Ze(U);
                }
                Ze = null;
              }
            else Ze = null;
            le !== null && Rb(
              he,
              $,
              le,
              Ze,
              !1
            ), Ve !== null && Ut !== null && Rb(
              he,
              Ut,
              Ve,
              Ze,
              !0
            );
          }
        }
        e: {
          if ($ = Z ? ol(Z) : window, le = $.nodeName && $.nodeName.toLowerCase(), le === "select" || le === "input" && $.type === "file")
            var At = Bh;
          else if (Hh($))
            if (Gh)
              At = OS;
            else {
              At = MS;
              var Be = AS;
            }
          else
            le = $.nodeName, !le || le.toLowerCase() !== "input" || $.type !== "checkbox" && $.type !== "radio" ? Z && yl(Z.elementType) && (At = Bh) : At = TS;
          if (At && (At = At(e, Z))) {
            Uh(
              he,
              At,
              l,
              ce
            );
            break e;
          }
          Be && Be(e, $, Z), e === "focusout" && Z && $.type === "number" && Z.memoizedProps.value != null && Ko($, "number", $.value);
        }
        switch (Be = Z ? ol(Z) : window, e) {
          case "focusin":
            (Hh(Be) || Be.contentEditable === "true") && (Er = Be, Lu = Z, ya = null);
            break;
          case "focusout":
            ya = Lu = Er = null;
            break;
          case "mousedown":
            Vu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Vu = !1, Zh(he, l, ce);
            break;
          case "selectionchange":
            if (zS) break;
          case "keydown":
          case "keyup":
            Zh(he, l, ce);
        }
        var st;
        if (zu)
          e: {
            switch (e) {
              case "compositionstart":
                var vt = "onCompositionStart";
                break e;
              case "compositionend":
                vt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                vt = "onCompositionUpdate";
                break e;
            }
            vt = void 0;
          }
        else
          Sr ? Vh(e, l) && (vt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (vt = "onCompositionStart");
        vt && (Dh && l.locale !== "ko" && (Sr || vt !== "onCompositionStart" ? vt === "onCompositionEnd" && Sr && (st = sn()) : (ut = ce, qt = "value" in ut ? ut.value : ut.textContent, Sr = !0)), Be = pc(Z, vt), 0 < Be.length && (vt = new zh(
          vt,
          e,
          null,
          l,
          ce
        ), he.push({ event: vt, listeners: Be }), st ? vt.data = st : (st = Ih(l), st !== null && (vt.data = st)))), (st = ES ? CS(e, l) : RS(e, l)) && (vt = pc(Z, "onBeforeInput"), 0 < vt.length && (Be = new zh(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ce
        ), he.push({
          event: Be,
          listeners: vt
        }), Be.data = st)), mE(
          he,
          e,
          Z,
          l,
          ce
        );
      }
      Eb(he, t);
    });
  }
  function Ya(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function pc(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = re(e, l), s != null && i.unshift(
        Ya(e, s, u)
      ), s = re(e, t), s != null && i.push(
        Ya(e, s, u)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function vE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Rb(e, t, l, i, s) {
    for (var u = t._reactName, m = []; l !== null && l !== i; ) {
      var E = l, j = E.alternate, Z = E.stateNode;
      if (E = E.tag, j !== null && j === i) break;
      E !== 5 && E !== 26 && E !== 27 || Z === null || (j = Z, s ? (Z = re(l, u), Z != null && m.unshift(
        Ya(l, Z, j)
      )) : s || (Z = re(l, u), Z != null && m.push(
        Ya(l, Z, j)
      ))), l = l.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var xE = /\r\n?/g, SE = /\u0000|\uFFFD/g;
  function wb(e) {
    return (typeof e == "string" ? e : "" + e).replace(xE, `
`).replace(SE, "");
  }
  function _b(e, t) {
    return t = wb(t), wb(e) === t;
  }
  function Ht(e, t, l, i, s, u) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || ln(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && ln(e, "" + i);
        break;
      case "className":
        Po(e, "class", i);
        break;
      case "tabIndex":
        Po(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Po(e, l, i);
        break;
      case "style":
        $l(e, i, u);
        break;
      case "data":
        if (t !== "object") {
          Po(e, "data", i);
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
        i = O("" + i), e.setAttribute(l, i);
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
          typeof u == "function" && (l === "formAction" ? (t !== "input" && Ht(e, t, "name", s.name, s, null), Ht(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Ht(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Ht(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Ht(e, t, "encType", s.encType, s, null), Ht(e, t, "method", s.method, s, null), Ht(e, t, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = O("" + i), e.setAttribute(l, i);
        break;
      case "onClick":
        i != null && (e.onclick = D);
        break;
      case "onScroll":
        i != null && gt("scroll", e);
        break;
      case "onScrollEnd":
        i != null && gt("scrollend", e);
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
        l = O("" + i), e.setAttributeNS(
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
        gt("beforetoggle", e), gt("toggle", e), ro(e, "popover", i);
        break;
      case "xlinkActuate":
        Zn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Zn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Zn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Zn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Zn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Zn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Zn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Zn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Zn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        ro(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Di.get(l) || l, ro(e, l, i));
    }
  }
  function cd(e, t, l, i, s, u) {
    switch (l) {
      case "style":
        $l(e, i, u);
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
        typeof i == "string" ? ln(e, i) : (typeof i == "number" || typeof i == "bigint") && ln(e, "" + i);
        break;
      case "onScroll":
        i != null && gt("scroll", e);
        break;
      case "onScrollEnd":
        i != null && gt("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = D);
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
        if (!Qn.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[Rt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof i == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, s);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : ro(e, l, i);
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
        gt("error", e), gt("load", e);
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
                  Ht(e, t, u, m, l, null);
              }
          }
        s && Ht(e, t, "srcSet", l.srcSet, l, null), i && Ht(e, t, "src", l.src, l, null);
        return;
      case "input":
        gt("invalid", e);
        var E = u = m = s = null, j = null, Z = null;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var ce = l[i];
            if (ce != null)
              switch (i) {
                case "name":
                  s = ce;
                  break;
                case "type":
                  m = ce;
                  break;
                case "checked":
                  j = ce;
                  break;
                case "defaultChecked":
                  Z = ce;
                  break;
                case "value":
                  u = ce;
                  break;
                case "defaultValue":
                  E = ce;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ce != null)
                    throw Error(a(137, t));
                  break;
                default:
                  Ht(e, t, i, ce, l, null);
              }
          }
        br(
          e,
          u,
          E,
          j,
          Z,
          m,
          s,
          !1
        );
        return;
      case "select":
        gt("invalid", e), i = m = u = null;
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
                Ht(e, t, s, E, l, null);
            }
        t = u, l = m, e.multiple = !!i, t != null ? rl(e, !!i, t, !1) : l != null && rl(e, !!i, l, !0);
        return;
      case "textarea":
        gt("invalid", e), u = s = i = null;
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
                Ht(e, t, m, E, l, null);
            }
        ao(e, i, s, u);
        return;
      case "option":
        for (j in l)
          l.hasOwnProperty(j) && (i = l[j], i != null) && (j === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Ht(e, t, j, i, l, null));
        return;
      case "dialog":
        gt("beforetoggle", e), gt("toggle", e), gt("cancel", e), gt("close", e);
        break;
      case "iframe":
      case "object":
        gt("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ga.length; i++)
          gt(Ga[i], e);
        break;
      case "image":
        gt("error", e), gt("load", e);
        break;
      case "details":
        gt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        gt("error", e), gt("load", e);
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
        for (Z in l)
          if (l.hasOwnProperty(Z) && (i = l[Z], i != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, t));
              default:
                Ht(e, t, Z, i, l, null);
            }
        return;
      default:
        if (yl(t)) {
          for (ce in l)
            l.hasOwnProperty(ce) && (i = l[ce], i !== void 0 && cd(
              e,
              t,
              ce,
              i,
              l,
              void 0
            ));
          return;
        }
    }
    for (E in l)
      l.hasOwnProperty(E) && (i = l[E], i != null && Ht(e, t, E, i, l, null));
  }
  function EE(e, t, l, i) {
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
        var s = null, u = null, m = null, E = null, j = null, Z = null, ce = null;
        for (le in l) {
          var he = l[le];
          if (l.hasOwnProperty(le) && he != null)
            switch (le) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                j = he;
              default:
                i.hasOwnProperty(le) || Ht(e, t, le, null, i, he);
            }
        }
        for (var $ in i) {
          var le = i[$];
          if (he = l[$], i.hasOwnProperty($) && (le != null || he != null))
            switch ($) {
              case "type":
                u = le;
                break;
              case "name":
                s = le;
                break;
              case "checked":
                Z = le;
                break;
              case "defaultChecked":
                ce = le;
                break;
              case "value":
                m = le;
                break;
              case "defaultValue":
                E = le;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(a(137, t));
                break;
              default:
                le !== he && Ht(
                  e,
                  t,
                  $,
                  le,
                  i,
                  he
                );
            }
        }
        ki(
          e,
          m,
          E,
          j,
          Z,
          ce,
          u,
          s
        );
        return;
      case "select":
        le = m = E = $ = null;
        for (u in l)
          if (j = l[u], l.hasOwnProperty(u) && j != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                le = j;
              default:
                i.hasOwnProperty(u) || Ht(
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
                $ = u;
                break;
              case "defaultValue":
                E = u;
                break;
              case "multiple":
                m = u;
              default:
                u !== j && Ht(
                  e,
                  t,
                  s,
                  u,
                  i,
                  j
                );
            }
        t = E, l = m, i = le, $ != null ? rl(e, !!l, $, !1) : !!i != !!l && (t != null ? rl(e, !!l, t, !0) : rl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        le = $ = null;
        for (E in l)
          if (s = l[E], l.hasOwnProperty(E) && s != null && !i.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ht(e, t, E, null, i, s);
            }
        for (m in i)
          if (s = i[m], u = l[m], i.hasOwnProperty(m) && (s != null || u != null))
            switch (m) {
              case "value":
                $ = s;
                break;
              case "defaultValue":
                le = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(a(91));
                break;
              default:
                s !== u && Ht(e, t, m, s, i, u);
            }
        bl(e, $, le);
        return;
      case "option":
        for (var Ve in l)
          $ = l[Ve], l.hasOwnProperty(Ve) && $ != null && !i.hasOwnProperty(Ve) && (Ve === "selected" ? e.selected = !1 : Ht(
            e,
            t,
            Ve,
            null,
            i,
            $
          ));
        for (j in i)
          $ = i[j], le = l[j], i.hasOwnProperty(j) && $ !== le && ($ != null || le != null) && (j === "selected" ? e.selected = $ && typeof $ != "function" && typeof $ != "symbol" : Ht(
            e,
            t,
            j,
            $,
            i,
            le
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
          $ = l[Ze], l.hasOwnProperty(Ze) && $ != null && !i.hasOwnProperty(Ze) && Ht(e, t, Ze, null, i, $);
        for (Z in i)
          if ($ = i[Z], le = l[Z], i.hasOwnProperty(Z) && $ !== le && ($ != null || le != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(a(137, t));
                break;
              default:
                Ht(
                  e,
                  t,
                  Z,
                  $,
                  i,
                  le
                );
            }
        return;
      default:
        if (yl(t)) {
          for (var Ut in l)
            $ = l[Ut], l.hasOwnProperty(Ut) && $ !== void 0 && !i.hasOwnProperty(Ut) && cd(
              e,
              t,
              Ut,
              void 0,
              i,
              $
            );
          for (ce in i)
            $ = i[ce], le = l[ce], !i.hasOwnProperty(ce) || $ === le || $ === void 0 && le === void 0 || cd(
              e,
              t,
              ce,
              $,
              i,
              le
            );
          return;
        }
    }
    for (var q in l)
      $ = l[q], l.hasOwnProperty(q) && $ != null && !i.hasOwnProperty(q) && Ht(e, t, q, null, i, $);
    for (he in i)
      $ = i[he], le = l[he], !i.hasOwnProperty(he) || $ === le || $ == null && le == null || Ht(e, t, he, $, i, le);
  }
  function Ab(e) {
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
  function CE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var s = l[i], u = s.transferSize, m = s.initiatorType, E = s.duration;
        if (u && E && Ab(m)) {
          for (m = 0, E = s.responseEnd, i += 1; i < l.length; i++) {
            var j = l[i], Z = j.startTime;
            if (Z > E) break;
            var ce = j.transferSize, he = j.initiatorType;
            ce && Ab(he) && (j = j.responseEnd, m += ce * (j < E ? 1 : (E - Z) / (j - Z)));
          }
          if (--i, t += 8 * (u + m) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ud = null, fd = null;
  function hc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Mb(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Tb(e, t) {
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
  function dd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var pd = null;
  function RE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === pd ? !1 : (pd = e, !0) : (pd = null, !1);
  }
  var Ob = typeof setTimeout == "function" ? setTimeout : void 0, wE = typeof clearTimeout == "function" ? clearTimeout : void 0, Nb = typeof Promise == "function" ? Promise : void 0, _E = typeof queueMicrotask == "function" ? queueMicrotask : typeof Nb < "u" ? function(e) {
    return Nb.resolve(null).then(e).catch(AE);
  } : Ob;
  function AE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ui(e) {
    return e === "head";
  }
  function zb(e, t) {
    var l = t, i = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(s), Qr(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          qa(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, qa(l);
          for (var u = l.firstChild; u; ) {
            var m = u.nextSibling, E = u.nodeName;
            u[io] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = m;
          }
        } else
          l === "body" && qa(e.ownerDocument.body);
      l = s;
    } while (l);
    Qr(t);
  }
  function kb(e, t) {
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
  function hd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          hd(l), Yo(l);
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
  function ME(e, t, l, i) {
    for (; e.nodeType === 1; ) {
      var s = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[io])
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
      if (e = Ul(e.nextSibling), e === null) break;
    }
    return null;
  }
  function TE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Ul(e.nextSibling), e === null)) return null;
    return e;
  }
  function Db(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ul(e.nextSibling), e === null)) return null;
    return e;
  }
  function md(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function gd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function OE(e, t) {
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
  function Ul(e) {
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
  var bd = null;
  function jb(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Ul(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Lb(e) {
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
  function Vb(e, t, l) {
    switch (t = hc(l), e) {
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
  function qa(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Yo(e);
  }
  var Bl = /* @__PURE__ */ new Map(), Ib = /* @__PURE__ */ new Set();
  function mc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var jo = H.d;
  H.d = {
    f: NE,
    r: zE,
    D: kE,
    C: DE,
    L: jE,
    m: LE,
    X: IE,
    S: VE,
    M: HE
  };
  function NE() {
    var e = jo.f(), t = rc();
    return e || t;
  }
  function zE(e) {
    var t = ll(e);
    t !== null && t.tag === 5 && t.type === "form" ? tg(t) : jo.r(e);
  }
  var Xr = typeof document > "u" ? null : document;
  function Hb(e, t, l) {
    var i = Xr;
    if (i && typeof t == "string" && t) {
      var s = Nn(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Ib.has(s) || (Ib.add(s), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(s) === null && (t = i.createElement("link"), Hn(t, "link", e), rn(t), i.head.appendChild(t)));
    }
  }
  function kE(e) {
    jo.D(e), Hb("dns-prefetch", e, null);
  }
  function DE(e, t) {
    jo.C(e, t), Hb("preconnect", e, t);
  }
  function jE(e, t, l) {
    jo.L(e, t, l);
    var i = Xr;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + Nn(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + Nn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + Nn(
        l.imageSizes
      ) + '"]')) : s += '[href="' + Nn(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = Kr(e);
          break;
        case "script":
          u = Fr(e);
      }
      Bl.has(u) || (e = v(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Bl.set(u, e), i.querySelector(s) !== null || t === "style" && i.querySelector(Pa(u)) || t === "script" && i.querySelector(Xa(u)) || (t = i.createElement("link"), Hn(t, "link", e), rn(t), i.head.appendChild(t)));
    }
  }
  function LE(e, t) {
    jo.m(e, t);
    var l = Xr;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Nn(i) + '"][href="' + Nn(e) + '"]', u = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Fr(e);
      }
      if (!Bl.has(u) && (e = v({ rel: "modulepreload", href: e }, t), Bl.set(u, e), l.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Xa(u)))
              return;
        }
        i = l.createElement("link"), Hn(i, "link", e), rn(i), l.head.appendChild(i);
      }
    }
  }
  function VE(e, t, l) {
    jo.S(e, t, l);
    var i = Xr;
    if (i && e) {
      var s = il(i).hoistableStyles, u = Kr(e);
      t = t || "default";
      var m = s.get(u);
      if (!m) {
        var E = { loading: 0, preload: null };
        if (m = i.querySelector(
          Pa(u)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Bl.get(u)) && yd(e, l);
          var j = m = i.createElement("link");
          rn(j), Hn(j, "link", e), j._p = new Promise(function(Z, ce) {
            j.onload = Z, j.onerror = ce;
          }), j.addEventListener("load", function() {
            E.loading |= 1;
          }), j.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, gc(m, t, i);
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
  function IE(e, t) {
    jo.X(e, t);
    var l = Xr;
    if (l && e) {
      var i = il(l).hoistableScripts, s = Fr(e), u = i.get(s);
      u || (u = l.querySelector(Xa(s)), u || (e = v({ src: e, async: !0 }, t), (t = Bl.get(s)) && vd(e, t), u = l.createElement("script"), rn(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function HE(e, t) {
    jo.M(e, t);
    var l = Xr;
    if (l && e) {
      var i = il(l).hoistableScripts, s = Fr(e), u = i.get(s);
      u || (u = l.querySelector(Xa(s)), u || (e = v({ src: e, async: !0, type: "module" }, t), (t = Bl.get(s)) && vd(e, t), u = l.createElement("script"), rn(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function Ub(e, t, l, i) {
    var s = (s = Ae.current) ? mc(s) : null;
    if (!s) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Kr(l.href), l = il(
          s
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Kr(l.href);
          var u = il(
            s
          ).hoistableStyles, m = u.get(e);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, m), (u = s.querySelector(
            Pa(e)
          )) && !u._p && (m.instance = u, m.state.loading = 5), Bl.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Bl.set(e, l), u || UE(
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
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Fr(l), l = il(
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
  function Kr(e) {
    return 'href="' + Nn(e) + '"';
  }
  function Pa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Bb(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function UE(e, t, l, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), Hn(t, "link", l), rn(t), e.head.appendChild(t));
  }
  function Fr(e) {
    return '[src="' + Nn(e) + '"]';
  }
  function Xa(e) {
    return "script[async]" + e;
  }
  function Gb(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Nn(l.href) + '"]'
          );
          if (i)
            return t.instance = i, rn(i), i;
          var s = v({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), rn(i), Hn(i, "style", s), gc(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          s = Kr(l.href);
          var u = e.querySelector(
            Pa(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, rn(u), u;
          i = Bb(l), (s = Bl.get(s)) && yd(i, s), u = (e.ownerDocument || e).createElement("link"), rn(u);
          var m = u;
          return m._p = new Promise(function(E, j) {
            m.onload = E, m.onerror = j;
          }), Hn(u, "link", i), t.state.loading |= 4, gc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = Fr(l.src), (s = e.querySelector(
            Xa(u)
          )) ? (t.instance = s, rn(s), s) : (i = l, (s = Bl.get(u)) && (i = v({}, l), vd(i, s)), e = e.ownerDocument || e, s = e.createElement("script"), rn(s), Hn(s, "link", i), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(a(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, gc(i, l.precedence, e));
    return t.instance;
  }
  function gc(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, u = s, m = 0; m < i.length; m++) {
      var E = i[m];
      if (E.dataset.precedence === t) u = E;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function yd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function vd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var bc = null;
  function Yb(e, t, l) {
    if (bc === null) {
      var i = /* @__PURE__ */ new Map(), s = bc = /* @__PURE__ */ new Map();
      s.set(l, i);
    } else
      s = bc, i = s.get(l), i || (i = /* @__PURE__ */ new Map(), s.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[io] || u[_t] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = u.getAttribute(t) || "";
        m = e + m;
        var E = i.get(m);
        E ? E.push(u) : i.set(m, [u]);
      }
    }
    return i;
  }
  function qb(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function BE(e, t, l) {
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
  function Pb(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function GE(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = Kr(i.href), u = t.querySelector(
          Pa(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = yc.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, rn(u);
          return;
        }
        u = t.ownerDocument || t, i = Bb(i), (s = Bl.get(s)) && yd(i, s), u = u.createElement("link"), rn(u);
        var m = u;
        m._p = new Promise(function(E, j) {
          m.onload = E, m.onerror = j;
        }), Hn(u, "link", i), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = yc.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var xd = 0;
  function YE(e, t) {
    return e.stylesheets && e.count === 0 && xc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && xc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && xd === 0 && (xd = 62500 * CE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && xc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > xd ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function yc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) xc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var vc = null;
  function xc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, vc = /* @__PURE__ */ new Map(), t.forEach(qE, e), vc = null, yc.call(e));
  }
  function qE(e, t) {
    if (!(t.state.loading & 4)) {
      var l = vc.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), vc.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var m = s[u];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (l.set(m.dataset.precedence, m), i = m);
        }
        i && l.set(null, i);
      }
      s = t.instance, m = s.getAttribute("data-precedence"), u = l.get(m) || i, u === i && l.set(null, s), l.set(m, s), this.count++, i = yc.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ka = {
    $$typeof: w,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0
  };
  function PE(e, t, l, i, s, u, m, E, j) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ft(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ft(0), this.hiddenUpdates = Ft(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xb(e, t, l, i, s, u, m, E, j, Z, ce, he) {
    return e = new PE(
      e,
      t,
      l,
      m,
      j,
      Z,
      ce,
      he,
      E
    ), t = 1, u === !0 && (t |= 24), u = xl(3, null, null, t), e.current = u, u.stateNode = e, t = Ju(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, nf(u), e;
  }
  function Kb(e) {
    return e ? (e = wr, e) : wr;
  }
  function Fb(e, t, l, i, s, u) {
    s = Kb(s), i.context === null ? i.context = s : i.pendingContext = s, i = Wo(t), i.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (i.callback = u), l = ei(e, i, t), l !== null && (fl(l, e, t), wa(l, e, t));
  }
  function Qb(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Sd(e, t) {
    Qb(e, t), (e = e.alternate) && Qb(e, t);
  }
  function Zb(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vi(e, 67108864);
      t !== null && fl(t, e, 67108864), Sd(e, 67108864);
    }
  }
  function $b(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = wl();
      t = oo(t);
      var l = Vi(e, t);
      l !== null && fl(l, e, t), Sd(e, t);
    }
  }
  var Sc = !0;
  function XE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 2, Ed(e, t, l, i);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function KE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 8, Ed(e, t, l, i);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function Ed(e, t, l, i) {
    if (Sc) {
      var s = Cd(i);
      if (s === null)
        sd(
          e,
          t,
          i,
          Ec,
          l
        ), Wb(e, i);
      else if (QE(
        s,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (Wb(e, i), t & 4 && -1 < FE.indexOf(e)) {
        for (; s !== null; ) {
          var u = ll(s);
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
                    po(u), (Nt & 6) === 0 && (oc = F() + 500, Ba(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Vi(u, 2), E !== null && fl(E, u, 2), rc(), Sd(u, 2);
            }
          if (u = Cd(i), u === null && sd(
            e,
            t,
            i,
            Ec,
            l
          ), u === s) break;
          s = u;
        }
        s !== null && i.stopPropagation();
      } else
        sd(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function Cd(e) {
    return e = ne(e), Rd(e);
  }
  var Ec = null;
  function Rd(e) {
    if (Ec = null, e = gl(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Ec = e, null;
  }
  function Jb(e) {
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
        switch (se()) {
          case Ie:
            return 2;
          case Re:
            return 8;
          case Ge:
          case nt:
            return 32;
          case Ot:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var wd = !1, fi = null, di = null, pi = null, Fa = /* @__PURE__ */ new Map(), Qa = /* @__PURE__ */ new Map(), hi = [], FE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Wb(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        fi = null;
        break;
      case "dragenter":
      case "dragleave":
        di = null;
        break;
      case "mouseover":
      case "mouseout":
        pi = null;
        break;
      case "pointerover":
      case "pointerout":
        Fa.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Qa.delete(t.pointerId);
    }
  }
  function Za(e, t, l, i, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = ll(t), t !== null && Zb(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function QE(e, t, l, i, s) {
    switch (t) {
      case "focusin":
        return fi = Za(
          fi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "dragenter":
        return di = Za(
          di,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "mouseover":
        return pi = Za(
          pi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Fa.set(
          u,
          Za(
            Fa.get(u) || null,
            e,
            t,
            l,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, Qa.set(
          u,
          Za(
            Qa.get(u) || null,
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
  function ey(e) {
    var t = gl(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, vo(e.priority, function() {
              $b(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(l), t !== null) {
            e.blockedOn = t, vo(e.priority, function() {
              $b(l);
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
  function Cc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Cd(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        G = i, l.target.dispatchEvent(i), G = null;
      } else
        return t = ll(l), t !== null && Zb(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function ty(e, t, l) {
    Cc(e) && l.delete(t);
  }
  function ZE() {
    wd = !1, fi !== null && Cc(fi) && (fi = null), di !== null && Cc(di) && (di = null), pi !== null && Cc(pi) && (pi = null), Fa.forEach(ty), Qa.forEach(ty);
  }
  function Rc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, wd || (wd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      ZE
    )));
  }
  var wc = null;
  function ny(e) {
    wc !== e && (wc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        wc === e && (wc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], s = e[t + 2];
          if (typeof i != "function") {
            if (Rd(i || l) === null)
              continue;
            break;
          }
          var u = ll(l);
          u !== null && (e.splice(t, 3), t -= 3, Cf(
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
  function Qr(e) {
    function t(j) {
      return Rc(j, e);
    }
    fi !== null && Rc(fi, e), di !== null && Rc(di, e), pi !== null && Rc(pi, e), Fa.forEach(t), Qa.forEach(t);
    for (var l = 0; l < hi.length; l++) {
      var i = hi[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < hi.length && (l = hi[0], l.blockedOn === null); )
      ey(l), l.blockedOn === null && hi.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var s = l[i], u = l[i + 1], m = s[Rt] || null;
        if (typeof u == "function")
          m || ny(l);
        else if (m) {
          var E = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, m = u[Rt] || null)
              E = m.formAction;
            else if (Rd(s) !== null) continue;
          } else E = m.action;
          typeof E == "function" ? l[i + 1] = E : (l.splice(i, 3), i -= 3), ny(l);
        }
      }
  }
  function ly() {
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
  function _d(e) {
    this._internalRoot = e;
  }
  _c.prototype.render = _d.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    var l = t.current, i = wl();
    Fb(l, i, e, t, null, null);
  }, _c.prototype.unmount = _d.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Fb(e.current, 2, null, e, null, null), rc(), t[Ye] = null;
    }
  };
  function _c(e) {
    this._internalRoot = e;
  }
  _c.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = nl();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < hi.length && t !== 0 && t < hi[l].priority; l++) ;
      hi.splice(l, 0, e), l === 0 && ey(e);
    }
  };
  var oy = o.version;
  if (oy !== "19.2.8")
    throw Error(
      a(
        527,
        oy,
        "19.2.8"
      )
    );
  H.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = p(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var $E = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ac.isDisabled && Ac.supportsFiber)
      try {
        zt = Ac.inject(
          $E
        ), xt = Ac;
      } catch {
      }
  }
  return Ja.createRoot = function(e, t) {
    if (!c(e)) throw Error(a(299));
    var l = !1, i = "", s = fg, u = dg, m = pg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (m = t.onRecoverableError)), t = Xb(
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
      ly
    ), e[Ye] = t.current, ad(e), new _d(t);
  }, Ja.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(a(299));
    var i = !1, s = "", u = fg, m = dg, E = pg, j = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (m = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (j = l.formState)), t = Xb(
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
      ly
    ), t.context = Kb(null), l = t.current, i = wl(), i = oo(i), s = Wo(i), s.callback = null, ei(l, s, i), l = i, t.current.lanes = l, tl(t, l), po(t), e[Ye] = t.current, ad(e), new _c(t);
  }, Ja.version = "19.2.8", Ja;
}
var by;
function sC() {
  if (by) return Td.exports;
  by = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Td.exports = aC(), Td.exports;
}
var cC = sC(), b = hs();
const uC = /* @__PURE__ */ eC(b), ur = /* @__PURE__ */ WE({
  __proto__: null,
  default: uC
}, [b]);
function yy(n) {
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
function fC(n) {
  const [o, r] = b.useState(() => yy(n));
  return b.useEffect(() => {
    if (!n) return;
    const a = () => r(yy(n));
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
function Bv(n) {
  var o, r, a = "";
  if (typeof n == "string" || typeof n == "number") a += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = Bv(n[o])) && (a && (a += " "), a += r);
  } else for (r in n) n[r] && (a && (a += " "), a += r);
  return a;
}
function Gv() {
  for (var n, o, r = 0, a = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = Bv(n)) && (a && (a += " "), a += o);
  return a;
}
const dC = (n, o) => {
  const r = new Array(n.length + o.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n[a];
  for (let a = 0; a < o.length; a++)
    r[n.length + a] = o[a];
  return r;
}, pC = (n, o) => ({
  classGroupId: n,
  validator: o
}), Yv = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), Kc = "-", vy = [], hC = "arbitrary..", mC = (n) => {
  const o = bC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: a
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return gC(d);
      const h = d.split(Kc), g = h[0] === "" && h.length > 1 ? 1 : 0;
      return qv(h, g, o);
    },
    getConflictingClassGroupIds: (d, h) => {
      if (h) {
        const g = a[d], p = r[d];
        return g ? p ? dC(p, g) : g : p || vy;
      }
      return r[d] || vy;
    }
  };
}, qv = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const p = qv(n, o + 1, f);
    if (p) return p;
  }
  const d = r.validators;
  if (d === null)
    return;
  const h = o === 0 ? n.join(Kc) : n.slice(o).join(Kc), g = d.length;
  for (let p = 0; p < g; p++) {
    const y = d[p];
    if (y.validator(h))
      return y.classGroupId;
  }
}, gC = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = n.slice(1, -1), r = o.indexOf(":"), a = o.slice(0, r);
  return a ? hC + a : void 0;
})(), bC = (n) => {
  const {
    theme: o,
    classGroups: r
  } = n;
  return yC(r, o);
}, yC = (n, o) => {
  const r = Yv();
  for (const a in n) {
    const c = n[a];
    Vp(c, r, a, o);
  }
  return r;
}, Vp = (n, o, r, a) => {
  const c = n.length;
  for (let f = 0; f < c; f++) {
    const d = n[f];
    vC(d, o, r, a);
  }
}, vC = (n, o, r, a) => {
  if (typeof n == "string") {
    xC(n, o, r);
    return;
  }
  if (typeof n == "function") {
    SC(n, o, r, a);
    return;
  }
  EC(n, o, r, a);
}, xC = (n, o, r) => {
  const a = n === "" ? o : Pv(o, n);
  a.classGroupId = r;
}, SC = (n, o, r, a) => {
  if (CC(n)) {
    Vp(n(a), o, r, a);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(pC(r, n));
}, EC = (n, o, r, a) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [h, g] = c[d];
    Vp(g, Pv(o, h), r, a);
  }
}, Pv = (n, o) => {
  let r = n;
  const a = o.split(Kc), c = a.length;
  for (let f = 0; f < c; f++) {
    const d = a[f];
    let h = r.nextPart.get(d);
    h || (h = Yv(), r.nextPart.set(d, h)), r = h;
  }
  return r;
}, CC = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, RC = (n) => {
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
}, pp = "!", xy = ":", wC = [], Sy = (n, o, r, a, c) => ({
  modifiers: n,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: a,
  isExternal: c
}), _C = (n) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = n;
  let a = (c) => {
    const f = [];
    let d = 0, h = 0, g = 0, p;
    const y = c.length;
    for (let T = 0; T < y; T++) {
      const N = c[T];
      if (d === 0 && h === 0) {
        if (N === xy) {
          f.push(c.slice(g, T)), g = T + 1;
          continue;
        }
        if (N === "/") {
          p = T;
          continue;
        }
      }
      N === "[" ? d++ : N === "]" ? d-- : N === "(" ? h++ : N === ")" && h--;
    }
    const v = f.length === 0 ? c : c.slice(g);
    let x = v, C = !1;
    v.endsWith(pp) ? (x = v.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      v.startsWith(pp) && (x = v.slice(1), C = !0)
    );
    const _ = p && p > g ? p - g : void 0;
    return Sy(f, C, x, _);
  };
  if (o) {
    const c = o + xy, f = a;
    a = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Sy(wC, !1, d, void 0, !0);
  }
  if (r) {
    const c = a;
    a = (f) => r({
      className: f,
      parseClassName: c
    });
  }
  return a;
}, AC = (n) => {
  const o = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((r, a) => {
    o.set(r, 1e6 + a);
  }), (r) => {
    const a = [];
    let c = [];
    for (let f = 0; f < r.length; f++) {
      const d = r[f], h = d[0] === "[", g = o.has(d);
      h || g ? (c.length > 0 && (c.sort(), a.push(...c), c = []), a.push(d)) : c.push(d);
    }
    return c.length > 0 && (c.sort(), a.push(...c)), a;
  };
}, MC = (n) => ({
  cache: RC(n.cacheSize),
  parseClassName: _C(n),
  sortModifiers: AC(n),
  postfixLookupClassGroupIds: TC(n),
  ...mC(n)
}), TC = (n) => {
  const o = /* @__PURE__ */ Object.create(null), r = n.postfixLookupClassGroups;
  if (r)
    for (let a = 0; a < r.length; a++)
      o[r[a]] = !0;
  return o;
}, OC = /\s+/, NC = (n, o) => {
  const {
    parseClassName: r,
    getClassGroupId: a,
    getConflictingClassGroupIds: c,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = o, h = [], g = n.trim().split(OC);
  let p = "";
  for (let y = g.length - 1; y >= 0; y -= 1) {
    const v = g[y], {
      isExternal: x,
      modifiers: C,
      hasImportantModifier: _,
      baseClassName: T,
      maybePostfixModifierPosition: N
    } = r(v);
    if (x) {
      p = v + (p.length > 0 ? " " + p : p);
      continue;
    }
    let M = !!N, A;
    if (M) {
      const B = T.substring(0, N);
      A = a(B);
      const L = A && d[A] ? a(T) : void 0;
      L && L !== A && (A = L, M = !1);
    } else
      A = a(T);
    if (!A) {
      if (!M) {
        p = v + (p.length > 0 ? " " + p : p);
        continue;
      }
      if (A = a(T), !A) {
        p = v + (p.length > 0 ? " " + p : p);
        continue;
      }
      M = !1;
    }
    const w = C.length === 0 ? "" : C.length === 1 ? C[0] : f(C).join(":"), z = _ ? w + pp : w, I = z + A;
    if (h.indexOf(I) > -1)
      continue;
    h.push(I);
    const Y = c(A, M);
    for (let B = 0; B < Y.length; ++B) {
      const L = Y[B];
      h.push(z + L);
    }
    p = v + (p.length > 0 ? " " + p : p);
  }
  return p;
}, zC = (...n) => {
  let o = 0, r, a, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (a = Xv(r)) && (c && (c += " "), c += a);
  return c;
}, Xv = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let a = 0; a < n.length; a++)
    n[a] && (o = Xv(n[a])) && (r && (r += " "), r += o);
  return r;
}, kC = (n, ...o) => {
  let r, a, c, f;
  const d = (g) => {
    const p = o.reduce((y, v) => v(y), n());
    return r = MC(p), a = r.cache.get, c = r.cache.set, f = h, h(g);
  }, h = (g) => {
    const p = a(g);
    if (p)
      return p;
    const y = NC(g, r);
    return c(g, y), y;
  };
  return f = d, (...g) => f(zC(...g));
}, DC = [], An = (n) => {
  const o = (r) => r[n] || DC;
  return o.isThemeGetter = !0, o;
}, Kv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Fv = /^\((?:(\w[\w-]*):)?(.+)\)$/i, jC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, LC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, VC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, IC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, HC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, UC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, gi = (n) => jC.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), ho = (n) => !!n && Number.isInteger(Number(n)), Dd = (n) => n.endsWith("%") && ft(n.slice(0, -1)), Lo = (n) => LC.test(n), Qv = () => !0, BC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  VC.test(n) && !IC.test(n)
), Ip = () => !1, GC = (n) => HC.test(n), YC = (n) => UC.test(n), qC = (n) => !De(n) && !je(n), PC = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), XC = (n) => Ai(n, Jv, Ip), De = (n) => Kv.test(n), Zi = (n) => Ai(n, Wv, BC), Ey = (n) => Ai(n, eR, ft), KC = (n) => Ai(n, t0, Qv), FC = (n) => Ai(n, e0, Ip), Cy = (n) => Ai(n, Zv, Ip), QC = (n) => Ai(n, $v, YC), Mc = (n) => Ai(n, n0, GC), je = (n) => Fv.test(n), Wa = (n) => fr(n, Wv), ZC = (n) => fr(n, e0), Ry = (n) => fr(n, Zv), $C = (n) => fr(n, Jv), JC = (n) => fr(n, $v), Tc = (n) => fr(n, n0, !0), WC = (n) => fr(n, t0, !0), Ai = (n, o, r) => {
  const a = Kv.exec(n);
  return a ? a[1] ? o(a[1]) : r(a[2]) : !1;
}, fr = (n, o, r = !1) => {
  const a = Fv.exec(n);
  return a ? a[1] ? o(a[1]) : r : !1;
}, Zv = (n) => n === "position" || n === "percentage", $v = (n) => n === "image" || n === "url", Jv = (n) => n === "length" || n === "size" || n === "bg-size", Wv = (n) => n === "length", eR = (n) => n === "number", e0 = (n) => n === "family-name", t0 = (n) => n === "number" || n === "weight", n0 = (n) => n === "shadow", tR = () => {
  const n = An("color"), o = An("font"), r = An("text"), a = An("font-weight"), c = An("tracking"), f = An("leading"), d = An("breakpoint"), h = An("container"), g = An("spacing"), p = An("radius"), y = An("shadow"), v = An("inset-shadow"), x = An("text-shadow"), C = An("drop-shadow"), _ = An("blur"), T = An("perspective"), N = An("aspect"), M = An("ease"), A = An("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [
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
  ], I = () => [...z(), je, De], Y = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", "contain", "none"], L = () => [je, De, g], P = () => [gi, "full", "auto", ...L()], J = () => [ho, "none", "subgrid", je, De], ae = () => ["auto", {
    span: ["full", ho, je, De]
  }, ho, je, De], ue = () => [ho, "auto", je, De], ee = () => ["auto", "min", "max", "fr", je, De], de = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ye = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...L()], H = () => [gi, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...L()], K = () => [gi, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...L()], Se = () => [gi, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...L()], ie = () => [n, je, De], k = () => [...z(), Ry, Cy, {
    position: [je, De]
  }], X = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], W = () => ["auto", "cover", "contain", $C, XC, {
    size: [je, De]
  }], te = () => [Dd, Wa, Zi], ge = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    p,
    je,
    De
  ], Ae = () => ["", ft, Wa, Zi], qe = () => ["solid", "dashed", "dotted", "double"], Te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Oe = () => [ft, Dd, Ry, Cy], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    _,
    je,
    De
  ], bt = () => ["none", ft, je, De], ke = () => ["none", ft, je, De], et = () => [ft, je, De], ze = () => [gi, "full", ...L()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Lo],
      breakpoint: [Lo],
      color: [Qv],
      container: [Lo],
      "drop-shadow": [Lo],
      ease: ["in", "out", "in-out"],
      font: [qC],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Lo],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Lo],
      shadow: [Lo],
      spacing: ["px", ft],
      text: [Lo],
      "text-shadow": [Lo],
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
        aspect: ["auto", "square", gi, De, je, N]
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
      "container-named": [PC],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ft, De, je, h]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": w()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": w()
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
        overflow: Y()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Y()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Y()
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
        z: [ho, "auto", je, De]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [gi, "full", "auto", h, ...L()]
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
        flex: [ft, gi, "auto", "initial", "none", De]
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
        order: [ho, "first", "last", "none", je, De]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": J()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ae()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ue()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ue()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": J()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ae()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ue()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ue()
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
        "auto-cols": ee()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ee()
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
        justify: [...de(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ye(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ye()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...de()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ye(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ye(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": de()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ye(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ye()]
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
        block: ["auto", ...Se()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...Se()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...Se()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [h, "screen", ...H()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          h,
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
          h,
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
        text: ["base", r, Wa, Zi]
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
        font: [a, WC, KC]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Dd, De]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ZC, FC, o]
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
        "line-clamp": [ft, "none", je, Ey]
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
        placeholder: ie()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: ie()
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
        decoration: [ft, "from-font", "auto", je, Zi]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: ie()
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
        tab: [ho, je, De]
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
        bg: k()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: X()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: W()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ho, je, De],
          radial: ["", je, De],
          conic: [ho, je, De]
        }, JC, QC]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: ie()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: te()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: te()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: te()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: ie()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: ie()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: ie()
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
        border: Ae()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Ae()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Ae()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Ae()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Ae()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": Ae()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": Ae()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Ae()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Ae()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Ae()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Ae()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Ae()
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
        "divide-y": Ae()
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
        border: ie()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": ie()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": ie()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": ie()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": ie()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": ie()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": ie()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": ie()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": ie()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": ie()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": ie()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: ie()
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
        outline: ["", ft, Wa, Zi]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: ie()
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
          Tc,
          Mc
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: ie()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", v, Tc, Mc]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": ie()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Ae()
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
        ring: ie()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ft, Zi]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": ie()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Ae()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": ie()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", x, Tc, Mc]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": ie()
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
        "mix-blend": [...Te(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Te()
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
        "mask-linear-from": Oe()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Oe()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": ie()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": ie()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Oe()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Oe()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": ie()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": ie()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Oe()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Oe()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": ie()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": ie()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Oe()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Oe()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": ie()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": ie()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Oe()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Oe()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": ie()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": ie()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Oe()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Oe()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": ie()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": ie()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Oe()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Oe()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": ie()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": ie()
      }],
      "mask-image-radial": [{
        "mask-radial": [je, De]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Oe()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Oe()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": ie()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": ie()
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
        "mask-radial-at": z()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ft]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Oe()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Oe()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": ie()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": ie()
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
        mask: k()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: X()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: W()
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
          Tc,
          Mc
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": ie()
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
        animate: ["none", A, je, De]
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
        rotate: bt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": bt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": bt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": bt()
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
        translate: ze()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ze()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ze()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ze()
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
        zoom: [ho, je, De]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ie()
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
        caret: ie()
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
        "scrollbar-thumb": ie()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": ie()
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
        fill: ["none", ...ie()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ft, Wa, Zi, Ey]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...ie()]
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
}, nR = /* @__PURE__ */ kC(tR);
function We(...n) {
  return nR(Gv(n));
}
const l0 = (...n) => n.filter((o, r, a) => !!o && o.trim() !== "" && a.indexOf(o) === r).join(" ").trim();
const lR = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const oR = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, a) => a ? a.toUpperCase() : r.toLowerCase()
);
const wy = (n) => {
  const o = oR(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var jd = {
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
const iR = (n) => {
  for (const o in n)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
  return !1;
}, rR = b.createContext({}), aR = () => b.useContext(rR), sR = b.forwardRef(
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: a, className: c = "", children: f, iconNode: d, ...h }, g) => {
    const {
      size: p = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: v = !1,
      color: x = "currentColor",
      className: C = ""
    } = aR() ?? {}, _ = a ?? v ? Number(r ?? y) * 24 / Number(o ?? p) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...jd,
        width: o ?? p ?? jd.width,
        height: o ?? p ?? jd.height,
        stroke: n ?? x,
        strokeWidth: _,
        className: l0("lucide", C, c),
        ...!f && !iR(h) && { "aria-hidden": "true" },
        ...h
      },
      [
        ...d.map(([T, N]) => b.createElement(T, N)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const Xn = (n, o) => {
  const r = b.forwardRef(
    ({ className: a, ...c }, f) => b.createElement(sR, {
      ref: f,
      iconNode: o,
      className: l0(
        `lucide-${lR(wy(n))}`,
        `lucide-${n}`,
        a
      ),
      ...c
    })
  );
  return r.displayName = wy(n), r;
};
const cR = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], uR = Xn("check", cR);
const fR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], o0 = Xn("chevron-down", fR);
const dR = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], pR = Xn("chevron-right", dR);
const hR = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], _y = Xn("circle", hR);
const mR = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], gR = Xn("eye", mR);
const bR = [
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
], yR = Xn("eye-off", bR);
const vR = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], xR = Xn("lasso", vR);
const SR = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], ER = Xn("maximize", SR);
const CR = [["path", { d: "M5 12h14", key: "1ays0h" }]], i0 = Xn("minus", CR);
const RR = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], wR = Xn("move", RR);
const _R = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], AR = Xn("pentagon", _R);
const MR = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], TR = Xn("plus", MR);
const OR = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], r0 = Xn("shapes", OR);
const NR = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], zR = Xn("spline", NR);
const kR = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], DR = Xn("square", kR);
const jR = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], a0 = Xn("x", jR);
var sa = Uv(), LR = Object.defineProperty, Hp = (n, o) => LR(n, "name", { value: o, configurable: !0 });
function hp(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Hp(hp, "setRef");
function s0(...n) {
  return (o) => {
    let r = !1;
    const a = n.map((c) => {
      const f = hp(c, o);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let c = 0; c < a.length; c++) {
          const f = a[c];
          typeof f == "function" ? f() : hp(n[c], null);
        }
      };
  };
}
Hp(s0, "composeRefs");
function Pn(...n) {
  return b.useCallback(s0(...n), n);
}
Hp(Pn, "useComposedRefs");
var VR = Object.defineProperty, no = (n, o) => VR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function lr(n) {
  const o = b.forwardRef((r, a) => {
    let { children: c, ...f } = r, d = null, h = !1;
    const g = [];
    mp(c) && typeof Oc == "function" && (c = Oc(c._payload)), b.Children.forEach(c, (x) => {
      if (p0(x)) {
        h = !0;
        const C = x;
        let _ = "child" in C.props ? C.props.child : C.props.children;
        mp(_) && typeof Oc == "function" && (_ = Oc(_._payload)), d = HR(C, _), g.push(d?.props?.children);
      } else
        g.push(x);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !h && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const p = d ? d0(d) : void 0, y = Pn(a, p);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          h ? GR(n) : BR(n)
        );
      return c;
    }
    const v = f0(f, d.props ?? {});
    return d.type !== b.Fragment && (v.ref = a ? y : p), b.cloneElement(d, v);
  });
  return o.displayName = `${n}.Slot`, o;
}
no(lr, "createSlot");
var c0 = /* @__PURE__ */ lr("Slot"), u0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function IR(n) {
  const o = /* @__PURE__ */ no((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = u0, o;
}
no(IR, "createSlottable");
var HR = /* @__PURE__ */ no((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function f0(n, o) {
  const r = { ...o };
  for (const a in o) {
    const c = n[a], f = o[a];
    /^on[A-Z]/.test(a) ? c && f ? r[a] = (...h) => {
      const g = f(...h);
      return c(...h), g;
    } : c && (r[a] = c) : a === "style" ? r[a] = { ...c, ...f } : a === "className" && (r[a] = [c, f].filter(Boolean).join(" "));
  }
  return { ...n, ...r };
}
no(f0, "mergeProps");
function d0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
no(d0, "getElementRef");
function p0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === u0;
}
no(p0, "isSlottable");
var UR = /* @__PURE__ */ Symbol.for("react.lazy");
function mp(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === UR && "_payload" in n && h0(n._payload);
}
no(mp, "isLazyComponent");
function h0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
no(h0, "isPromiseLike");
var BR = /* @__PURE__ */ no((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), GR = /* @__PURE__ */ no((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Oc = ur[" use ".trim().toString()], YR = Object.defineProperty, qR = (n, o) => YR(n, "name", { value: o, configurable: !0 }), PR = [
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
], Un = PR.reduce((n, o) => {
  const r = /* @__PURE__ */ lr(`Primitive.${o}`), a = b.forwardRef((c, f) => {
    const { asChild: d, ...h } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(g, { ...h, ref: f });
  });
  return a.displayName = `Primitive.${o}`, { ...n, [o]: a };
}, {});
function XR(n, o) {
  n && sa.flushSync(() => n.dispatchEvent(o));
}
qR(XR, "dispatchDiscreteCustomEvent");
var KR = Object.defineProperty, ql = (n, o) => KR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function FR(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const a = /* @__PURE__ */ ql((f) => {
    const { children: d, ...h } = f, g = b.useMemo(() => h, Object.values(h));
    return /* @__PURE__ */ S.jsx(r.Provider, { value: g, children: d });
  }, "Provider");
  a.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: h = !1 } = d, g = b.useContext(r);
    if (g) return g;
    if (o !== void 0) return o;
    if (!h)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return ql(c, "useContext"), [a, c];
}
ql(FR, "createContext");
// @__NO_SIDE_EFFECTS__
function Mi(n, o = []) {
  let r = [];
  function a(f, d) {
    const h = b.createContext(d);
    h.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const p = /* @__PURE__ */ ql((v) => {
      const { scope: x, children: C, ..._ } = v, T = x?.[n]?.[g] || h, N = b.useMemo(() => _, Object.values(_));
      return /* @__PURE__ */ S.jsx(T.Provider, { value: N, children: C });
    }, "Provider");
    p.displayName = f + "Provider";
    function y(v, x, C = {}) {
      const { optional: _ = !1 } = C, T = x?.[n]?.[g] || h, N = b.useContext(T);
      if (N) return N;
      if (d !== void 0) return d;
      if (!_)
        throw new Error(`\`${v}\` must be used within \`${f}\``);
    }
    return ql(y, "useContext"), [p, y];
  }
  ql(a, "createContext");
  const c = /* @__PURE__ */ ql(() => {
    const f = r.map((d) => b.createContext(d));
    return /* @__PURE__ */ ql(function(h) {
      const g = h?.[n] || f;
      return b.useMemo(
        () => ({ [`__scope${n}`]: { ...h, [n]: g } }),
        [h, g]
      );
    }, "useScope");
  }, "createScope");
  return c.scopeName = n, [a, m0(c, ...o)];
}
ql(Mi, "createContextScope");
function m0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ ql(() => {
    const a = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ ql(function(f) {
      const d = a.reduce((h, { useScope: g, scopeName: p }) => {
        const v = g(f)[`__scope${p}`];
        return { ...h, ...v };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
ql(m0, "composeContextScopes");
var QR = Object.defineProperty, Dn = (n, o) => QR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function iu(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Mi(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Dn((T) => {
    const { scope: N, children: M } = T, A = b.useRef(null), w = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(c, { scope: N, itemMap: w, collectionRef: A, children: M });
  }, "CollectionProvider");
  d.displayName = o;
  const h = n + "CollectionSlot", g = /* @__PURE__ */ lr(h), p = b.forwardRef(
    (T, N) => {
      const { scope: M, children: A } = T, w = f(h, M), z = Pn(N, w.collectionRef);
      return /* @__PURE__ */ S.jsx(g, { ref: z, children: A });
    }
  );
  p.displayName = h;
  const y = n + "CollectionItemSlot", v = "data-radix-collection-item", x = /* @__PURE__ */ lr(y), C = b.forwardRef(
    (T, N) => {
      const { scope: M, children: A, ...w } = T, z = b.useRef(null), I = Pn(N, z), Y = f(y, M);
      return b.useEffect(() => (Y.itemMap.set(z, { ref: z, ...w }), () => {
        Y.itemMap.delete(z);
      })), /* @__PURE__ */ S.jsx(x, { [v]: "", ref: I, children: A });
    }
  );
  C.displayName = y;
  function _(T) {
    const N = f(n + "CollectionConsumer", T);
    return b.useCallback(() => {
      const A = N.collectionRef.current;
      if (!A) return [];
      const w = Array.from(A.querySelectorAll(`[${v}]`));
      return Array.from(N.itemMap.values()).sort(
        (Y, B) => w.indexOf(Y.ref.current) - w.indexOf(B.ref.current)
      );
    }, [N.collectionRef, N.itemMap]);
  }
  return Dn(_, "useCollection"), [
    { Provider: d, Slot: p, ItemSlot: C },
    _,
    a
  ];
}
Dn(iu, "createCollection");
var Ay = /* @__PURE__ */ new WeakMap(), En, _l, Ld = (_l = class extends Map {
  constructor(r) {
    super(r);
    ay(this, En);
    Ad(this, En, [...super.keys()]), Ay.set(this, !0);
  }
  set(r, a) {
    return Ay.get(this) && (this.has(r) ? Gn(this, En)[Gn(this, En).indexOf(r)] = r : Gn(this, En).push(r)), super.set(r, a), this;
  }
  insert(r, a, c) {
    const f = this.has(a), d = Gn(this, En).length, h = Up(r);
    let g = h >= 0 ? h : d + h;
    const p = g < 0 || g >= d ? -1 : g;
    if (p === this.size || f && p === this.size - 1 || p === -1)
      return this.set(a, c), this;
    const y = this.size + (f ? 0 : 1);
    h < 0 && g++;
    const v = [...Gn(this, En)];
    let x, C = !1;
    for (let _ = g; _ < y; _++)
      if (g === _) {
        let T = v[_];
        v[_] === a && (T = v[_ + 1]), f && this.delete(a), x = this.get(T), this.set(a, c);
      } else {
        !C && v[_ - 1] === a && (C = !0);
        const T = v[C ? _ : _ - 1], N = x;
        x = this.get(T), this.delete(T), this.set(T, N);
      }
    return this;
  }
  with(r, a, c) {
    const f = new _l(this);
    return f.insert(r, a, c), f;
  }
  before(r) {
    const a = Gn(this, En).indexOf(r) - 1;
    if (!(a < 0))
      return this.entryAt(a);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(r, a, c) {
    const f = Gn(this, En).indexOf(r);
    return f === -1 ? this : this.insert(f, a, c);
  }
  after(r) {
    let a = Gn(this, En).indexOf(r);
    if (a = a === -1 || a === this.size - 1 ? -1 : a + 1, a !== -1)
      return this.entryAt(a);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(r, a, c) {
    const f = Gn(this, En).indexOf(r);
    return f === -1 ? this : this.insert(f + 1, a, c);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Ad(this, En, []), super.clear();
  }
  delete(r) {
    const a = super.delete(r);
    return a && Gn(this, En).splice(Gn(this, En).indexOf(r), 1), a;
  }
  deleteAt(r) {
    const a = this.keyAt(r);
    return a !== void 0 ? this.delete(a) : !1;
  }
  at(r) {
    const a = Gc(Gn(this, En), r);
    if (a !== void 0)
      return this.get(a);
  }
  entryAt(r) {
    const a = Gc(Gn(this, En), r);
    if (a !== void 0)
      return [a, this.get(a)];
  }
  indexOf(r) {
    return Gn(this, En).indexOf(r);
  }
  keyAt(r) {
    return Gc(Gn(this, En), r);
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
    return new _l(c);
  }
  map(r, a) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, a, [d, f, this])]), f++;
    return new _l(c);
  }
  reduce(...r) {
    const [a, c] = r;
    let f = 0, d = c ?? this.at(0);
    for (const h of this)
      f === 0 && r.length === 1 ? d = h : d = Reflect.apply(a, this, [d, h, f, this]), f++;
    return d;
  }
  reduceRight(...r) {
    const [a, c] = r;
    let f = c ?? this.at(-1);
    for (let d = this.size - 1; d >= 0; d--) {
      const h = this.at(d);
      d === this.size - 1 && r.length === 1 ? f = h : f = Reflect.apply(a, this, [f, h, d, this]);
    }
    return f;
  }
  toSorted(r) {
    const a = [...this.entries()].sort(r);
    return new _l(a);
  }
  toReversed() {
    const r = new _l();
    for (let a = this.size - 1; a >= 0; a--) {
      const c = this.keyAt(a), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const a = [...this.entries()];
    return a.splice(...r), new _l(a);
  }
  slice(r, a) {
    const c = new _l();
    let f = this.size - 1;
    if (r === void 0)
      return c;
    r < 0 && (r = r + this.size), a !== void 0 && a > 0 && (f = a - 1);
    for (let d = r; d <= f; d++) {
      const h = this.keyAt(d), g = this.get(h);
      c.set(h, g);
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
}, En = new WeakMap(), Dn(_l, "OrderedDict"), _l);
function Gc(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = g0(n, o);
  return r === -1 ? void 0 : n[r];
}
Dn(Gc, "at");
function g0(n, o) {
  const r = n.length, a = Up(o), c = a >= 0 ? a : r + a;
  return c < 0 || c >= r ? -1 : c;
}
Dn(g0, "toSafeIndex");
function Up(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Dn(Up, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function ZR(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Mi(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Ld(),
      setItemMap: /* @__PURE__ */ Dn(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Dn(({ state: w, ...z }) => w ? /* @__PURE__ */ S.jsx(g, { ...z, state: w }) : /* @__PURE__ */ S.jsx(h, { ...z }), "CollectionProvider");
  d.displayName = o;
  const h = /* @__PURE__ */ Dn((w) => {
    const z = N();
    return /* @__PURE__ */ S.jsx(g, { ...w, state: z });
  }, "CollectionInit");
  h.displayName = o + "Init";
  const g = /* @__PURE__ */ Dn((w) => {
    const { scope: z, children: I, state: Y } = w, B = b.useRef(null), [L, P] = b.useState(
      null
    ), J = Pn(B, P), [ae, ue] = Y;
    return b.useEffect(() => {
      if (!L) return;
      const ee = v0(() => {
      });
      return ee.observe(L, {
        childList: !0,
        subtree: !0
      }), () => {
        ee.disconnect();
      };
    }, [L]), /* @__PURE__ */ S.jsx(
      c,
      {
        scope: z,
        itemMap: ae,
        setItemMap: ue,
        collectionRef: J,
        collectionRefObject: B,
        collectionElement: L,
        children: I
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const p = n + "CollectionSlot", y = /* @__PURE__ */ lr(p), v = b.forwardRef(
    (w, z) => {
      const { scope: I, children: Y } = w, B = f(p, I), L = Pn(z, B.collectionRef);
      return /* @__PURE__ */ S.jsx(y, { ref: L, children: Y });
    }
  );
  v.displayName = p;
  const x = n + "CollectionItemSlot", C = "data-radix-collection-item", _ = /* @__PURE__ */ lr(x), T = b.forwardRef(
    (w, z) => {
      const { scope: I, children: Y, ...B } = w, L = b.useRef(null), [P, J] = b.useState(null), ae = Pn(z, L, J), ue = f(x, I), { setItemMap: ee } = ue, de = b.useRef(B);
      b0(de.current, B) || (de.current = B);
      const ye = de.current;
      return b.useEffect(() => {
        const V = ye;
        return ee((H) => P ? H.has(P) ? H.set(P, { ...V, element: P }).toSorted(gp) : (H.set(P, { ...V, element: P }), H.toSorted(gp)) : H), () => {
          ee((H) => !P || !H.has(P) ? H : (H.delete(P), new Ld(H)));
        };
      }, [P, ye, ee]), /* @__PURE__ */ S.jsx(_, { [C]: "", ref: ae, children: Y });
    }
  );
  T.displayName = x;
  function N() {
    return b.useState(new Ld());
  }
  Dn(N, "useInitCollection");
  function M(w) {
    const { itemMap: z } = f(n + "CollectionConsumer", w);
    return z;
  }
  return Dn(M, "useCollection"), [
    { Provider: d, Slot: v, ItemSlot: T },
    {
      createCollectionScope: a,
      useCollection: M,
      useInitCollection: N
    }
  ];
}
Dn(ZR, "createCollection");
function b0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), a = Object.keys(o);
  if (r.length !== a.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
Dn(b0, "shallowEqual");
function y0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Dn(y0, "isElementPreceding");
function gp(n, o) {
  return !n[1].element || !o[1].element ? 0 : y0(n[1].element, o[1].element) ? -1 : 1;
}
Dn(gp, "sortByDocumentPosition");
function v0(n) {
  return new MutationObserver((r) => {
    for (const a of r)
      if (a.type === "childList") {
        n();
        return;
      }
  });
}
Dn(v0, "getChildListObserver");
var $R = Object.defineProperty, ca = (n, o) => $R(n, "name", { value: o, configurable: !0 }), x0 = !!(typeof window < "u" && window.document && window.document.createElement);
function qn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ ca(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
ca(qn, "composeEventHandlers");
function JR(n) {
  if (!x0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
ca(JR, "getOwnerWindow");
function bp(n) {
  if (!x0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
ca(bp, "getOwnerDocument");
function S0(n, o = !1) {
  const { activeElement: r } = bp(n);
  if (!r?.nodeName)
    return null;
  if (E0(r) && r.contentDocument)
    return S0(r.contentDocument.body, o);
  if (o) {
    const a = r.getAttribute("aria-activedescendant");
    if (a) {
      const c = bp(r).getElementById(a);
      if (c)
        return c;
    }
  }
  return r;
}
ca(S0, "getActiveElement");
function E0(n) {
  return n.tagName === "IFRAME";
}
ca(E0, "isFrame");
var Si = globalThis?.document ? b.useLayoutEffect : () => {
}, WR = Object.defineProperty, ew = (n, o) => WR(n, "name", { value: o, configurable: !0 }), My = ur[" useEffectEvent ".trim().toString()], Ty = ur[" useInsertionEffect ".trim().toString()];
function C0(n) {
  if (typeof My == "function")
    return My(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Ty == "function" ? Ty(() => {
    o.current = n;
  }) : Si(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
ew(C0, "useEffectEvent");
var tw = Object.defineProperty, ms = (n, o) => tw(n, "name", { value: o, configurable: !0 }), nw = ur[" useInsertionEffect ".trim().toString()] || Si;
function Bo({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ ms(() => {
  }, "onChange"),
  caller: a
}) {
  const [c, f, d] = R0({
    defaultProp: o,
    onChange: r
  }), h = n !== void 0, g = h ? n : c, p = b.useCallback(
    (y) => {
      if (h) {
        const v = w0(y) ? y(n) : y;
        v !== n && d.current?.(v);
      } else
        f(y);
    },
    [h, n, f, d]
  );
  return [g, p];
}
ms(Bo, "useControllableState");
function R0({
  defaultProp: n,
  onChange: o
}) {
  const [r, a] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return nw(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, a, f];
}
ms(R0, "useUncontrolledState");
function w0(n) {
  return typeof n == "function";
}
ms(w0, "isFunction");
var Oy = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function lw(n, o, r, a) {
  const { prop: c, defaultProp: f, onChange: d, caller: h } = o, g = c !== void 0, p = C0(d), y = [{ ...r, state: f }];
  a && y.push(a);
  const [v, x] = b.useReducer(
    (N, M) => {
      if (M.type === Oy)
        return { ...N, state: M.state };
      const A = n(N, M);
      return g && !Object.is(A.state, N.state) && p(A.state), A;
    },
    ...y
  ), C = v.state, _ = b.useRef(C);
  b.useEffect(() => {
    _.current !== C && (_.current = C, g || p(C));
  }, [C, _, g]);
  const T = b.useMemo(() => c !== void 0 ? { ...v, state: c } : v, [v, c]);
  return b.useEffect(() => {
    g && !Object.is(c, v.state) && x({ type: Oy, state: c });
  }, [c, v.state, g]), [T, x];
}
ms(lw, "useControllableStateReducer");
var ow = Object.defineProperty, Uo = (n, o) => ow(n, "name", { value: o, configurable: !0 });
function _0(n, o) {
  return b.useReducer((r, a) => o[r][a] ?? r, n);
}
Uo(_0, "useStateMachine");
var iw = /* @__PURE__ */ Uo((n) => {
  const { present: o, children: r } = n, a = A0(o), c = typeof r == "function" ? r({ present: a.isPresent }) : b.Children.only(r), f = M0(a.ref, T0(c));
  return typeof r == "function" || a.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function A0(n) {
  const [o, r] = b.useState(), a = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), h = n ? "mounted" : "unmounted", [g, p] = _0(h, {
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
    g === "mounted" ? (f.current = d.current ?? Zr(a.current), d.current = void 0) : f.current = "none";
  }, [g]), Si(() => {
    const y = a.current, v = c.current;
    if (v !== n) {
      const C = f.current, _ = Zr(y);
      n ? (d.current = _, p("MOUNT")) : _ === "none" || y?.display === "none" ? p("UNMOUNT") : p(v && C !== _ ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, p]), Si(() => {
    if (o) {
      let y;
      const v = o.ownerDocument.defaultView ?? window, x = /* @__PURE__ */ Uo((_) => {
        const N = Zr(a.current).includes(CSS.escape(_.animationName));
        if (_.target === o && N && (p("ANIMATION_END"), !c.current)) {
          const M = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = v.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = M);
          });
        }
      }, "handleAnimationEnd"), C = /* @__PURE__ */ Uo((_) => {
        _.target === o && (f.current = Zr(a.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", C), o.addEventListener("animationcancel", x), o.addEventListener("animationend", x), () => {
        v.clearTimeout(y), o.removeEventListener("animationstart", C), o.removeEventListener("animationcancel", x), o.removeEventListener("animationend", x);
      };
    } else
      p("ANIMATION_END");
  }, [o, p]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: b.useCallback((y) => {
      if (y) {
        const v = getComputedStyle(y);
        a.current = v, d.current = Zr(v);
      } else
        a.current = null;
      r(y);
    }, [])
  };
}
Uo(A0, "usePresence");
function yp(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Uo(yp, "setRef");
function M0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const a = o.current;
    let c = !1;
    const f = a.map((d) => {
      const h = yp(d, r);
      return !c && typeof h == "function" && (c = !0), h;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const h = f[d];
          typeof h == "function" ? h() : yp(a[d], null);
        }
      };
  }, []);
}
Uo(M0, "useStableComposedRefs");
function Zr(n) {
  return n?.animationName || "none";
}
Uo(Zr, "getAnimationName");
function T0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
Uo(T0, "getElementRef");
var rw = Object.defineProperty, aw = (n, o) => rw(n, "name", { value: o, configurable: !0 }), sw = ur[" useId ".trim().toString()] || (() => {
}), cw = 0;
function ru(n) {
  const [o, r] = b.useState(sw());
  return Si(() => {
    n || r((a) => a ?? String(cw++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
aw(ru, "useId");
var uw = Object.defineProperty, gs = (n, o) => uw(n, "name", { value: o, configurable: !0 }), Bp = "Collapsible", [fw, O0] = /* @__PURE__ */ Mi(Bp), [dw, Gp] = fw(Bp), pw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ gs(function(o, r) {
    const {
      __scopeCollapsible: a,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: h,
      ...g
    } = o, [p, y] = Bo({
      prop: c,
      defaultProp: f ?? !1,
      onChange: h,
      caller: Bp
    });
    return /* @__PURE__ */ S.jsx(
      dw,
      {
        scope: a,
        disabled: d,
        contentId: ru(),
        open: p,
        onOpenToggle: b.useCallback(() => y((v) => !v), [y]),
        children: /* @__PURE__ */ S.jsx(
          Un.div,
          {
            "data-state": au(p),
            "data-disabled": d ? "" : void 0,
            ...g,
            ref: r
          }
        )
      }
    );
  }, "Collapsible")
), hw = "CollapsibleTrigger", N0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ gs(function(o, r) {
    const { __scopeCollapsible: a, ...c } = o, f = Gp(hw, a);
    return /* @__PURE__ */ S.jsx(
      Un.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": au(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...c,
        ref: r,
        onClick: qn(o.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), z0 = "CollapsibleContent", k0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ gs(function(o, r) {
    const { forceMount: a, ...c } = o, f = Gp(z0, o.__scopeCollapsible);
    return /* @__PURE__ */ S.jsx(iw, { present: a || f.open, children: ({ present: d }) => /* @__PURE__ */ S.jsx(mw, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), mw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ gs(function(o, r) {
  const { __scopeCollapsible: a, present: c, children: f, ...d } = o, h = Gp(z0, a), [g, p] = b.useState(c), y = b.useRef(null), v = Pn(r, y), x = b.useRef(0), C = x.current, _ = b.useRef(0), T = _.current, N = h.open || g, M = b.useRef(N), A = b.useRef(void 0);
  return b.useEffect(() => {
    const w = requestAnimationFrame(() => M.current = !1);
    return () => cancelAnimationFrame(w);
  }, []), Si(() => {
    const w = y.current;
    if (w) {
      A.current = A.current || {
        transitionDuration: w.style.transitionDuration,
        animationName: w.style.animationName
      }, w.style.transitionDuration = "0s", w.style.animationName = "none";
      const z = w.getBoundingClientRect();
      x.current = z.height, _.current = z.width, M.current || (w.style.transitionDuration = A.current.transitionDuration, w.style.animationName = A.current.animationName), p(c);
    }
  }, [h.open, c]), /* @__PURE__ */ S.jsx(
    Un.div,
    {
      "data-state": au(h.open),
      "data-disabled": h.disabled ? "" : void 0,
      id: h.contentId,
      hidden: !N,
      ...d,
      ref: v,
      style: {
        "--radix-collapsible-content-height": C ? `${C}px` : void 0,
        "--radix-collapsible-content-width": T ? `${T}px` : void 0,
        ...o.style
      },
      children: N && f
    }
  );
}, "CollapsibleContentImpl"));
function au(n) {
  return n ? "open" : "closed";
}
gs(au, "getState");
var D0 = pw, gw = N0, bw = k0, yw = Object.defineProperty, vw = (n, o) => yw(n, "name", { value: o, configurable: !0 }), xw = b.createContext(void 0);
function bs(n) {
  const o = b.useContext(xw);
  return n || o || "ltr";
}
vw(bs, "useDirection");
var Sw = Object.defineProperty, Ml = (n, o) => Sw(n, "name", { value: o, configurable: !0 }), bo = "Accordion", Ew = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Yp, Cw, Rw] = /* @__PURE__ */ iu(bo), [su, HN] = /* @__PURE__ */ Mi(bo, [
  Rw,
  O0
]), qp = O0(), ww = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ml(function(o, r) {
    const { type: a, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ S.jsx(Yp.Provider, { scope: o.__scopeAccordion, children: a === "multiple" ? /* @__PURE__ */ S.jsx(Tw, { ...d, ref: r }) : /* @__PURE__ */ S.jsx(Mw, { ...f, ref: r }) });
  }, "Accordion")
), [j0, _w] = su(bo), [L0, Aw] = su(
  bo,
  { collapsible: !1 }
), Mw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ml(function(o, r) {
    const {
      value: a,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Ml(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...h
    } = o, [g, p] = Bo({
      prop: a,
      defaultProp: c ?? "",
      onChange: f,
      caller: bo
    });
    return /* @__PURE__ */ S.jsx(
      j0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: p,
        onItemClose: b.useCallback(() => d && p(""), [d, p]),
        children: /* @__PURE__ */ S.jsx(L0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ S.jsx(V0, { ...h, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), Tw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ml(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ml(() => {
    }, "onValueChange"),
    ...d
  } = o, [h, g] = Bo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: bo
  }), p = b.useCallback(
    (v) => g((x = []) => [...x, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((x = []) => x.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    j0,
    {
      scope: o.__scopeAccordion,
      value: h,
      onItemOpen: p,
      onItemClose: y,
      children: /* @__PURE__ */ S.jsx(L0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ S.jsx(V0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [Ow, cu] = su(bo), V0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ml(function(o, r) {
    const { __scopeAccordion: a, disabled: c, dir: f, orientation: d = "vertical", ...h } = o, g = b.useRef(null), p = Pn(g, r), y = Cw(a), x = bs(f) === "ltr", C = qn(o.onKeyDown, (_) => {
      if (!Ew.includes(_.key)) return;
      const T = _.target, N = y().filter((P) => !P.ref.current?.disabled), M = N.findIndex((P) => P.ref.current === T), A = N.length;
      if (M === -1) return;
      _.preventDefault();
      let w = M;
      const z = 0, I = A - 1, Y = /* @__PURE__ */ Ml(() => {
        w = M + 1, w > I && (w = z);
      }, "moveNext"), B = /* @__PURE__ */ Ml(() => {
        w = M - 1, w < z && (w = I);
      }, "movePrev");
      switch (_.key) {
        case "Home":
          w = z;
          break;
        case "End":
          w = I;
          break;
        case "ArrowRight":
          d === "horizontal" && (x ? Y() : B());
          break;
        case "ArrowDown":
          d === "vertical" && Y();
          break;
        case "ArrowLeft":
          d === "horizontal" && (x ? B() : Y());
          break;
        case "ArrowUp":
          d === "vertical" && B();
          break;
      }
      const L = w % A;
      N[L].ref.current?.focus();
    });
    return /* @__PURE__ */ S.jsx(
      Ow,
      {
        scope: a,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ S.jsx(Yp.Slot, { scope: a, children: /* @__PURE__ */ S.jsx(
          Un.div,
          {
            ...h,
            "data-orientation": d,
            ref: p,
            onKeyDown: c ? void 0 : C
          }
        ) })
      }
    );
  }, "AccordionImpl")
), vp = "AccordionItem", [Nw, Pp] = su(vp), zw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ml(function(o, r) {
    const { __scopeAccordion: a, value: c, ...f } = o, d = cu(vp, a), h = _w(vp, a), g = qp(a), p = ru(), y = c && h.value.includes(c) || !1, v = d.disabled || o.disabled;
    return /* @__PURE__ */ S.jsx(
      Nw,
      {
        scope: a,
        open: y,
        disabled: v,
        triggerId: p,
        children: /* @__PURE__ */ S.jsx(
          D0,
          {
            "data-orientation": d.orientation,
            "data-state": Xp(y),
            ...g,
            ...f,
            ref: r,
            disabled: v,
            open: y,
            onOpenChange: (x) => {
              x ? h.onItemOpen(c) : h.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), kw = "AccordionHeader", Dw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ml(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = cu(bo, a), d = Pp(kw, a);
    return /* @__PURE__ */ S.jsx(
      Un.h3,
      {
        "data-orientation": f.orientation,
        "data-state": Xp(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), Ny = "AccordionTrigger", jw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ml(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = cu(bo, a), d = Pp(Ny, a), h = Aw(Ny, a), g = qp(a);
    return /* @__PURE__ */ S.jsx(Yp.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
      gw,
      {
        "aria-disabled": d.open && !h.collapsible || void 0,
        "data-orientation": f.orientation,
        id: d.triggerId,
        ...g,
        ...c,
        ref: r
      }
    ) });
  }, "AccordionTrigger")
), Lw = "AccordionContent", Vw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ml(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = cu(bo, a), d = Pp(Lw, a), h = qp(a);
    return /* @__PURE__ */ S.jsx(
      bw,
      {
        role: "region",
        "aria-labelledby": d.triggerId,
        "data-orientation": f.orientation,
        ...h,
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
function Xp(n) {
  return n ? "open" : "closed";
}
Ml(Xp, "getState");
var Iw = ww, Hw = zw, Uw = Dw, Bw = jw, Gw = Vw, Yw = Object.defineProperty, qw = (n, o) => Yw(n, "name", { value: o, configurable: !0 });
function I0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
qw(I0, "useCallbackRef");
var Pw = Object.defineProperty, Xw = (n, o) => Pw(n, "name", { value: o, configurable: !0 });
function H0(n) {
  const [o, r] = b.useState(void 0);
  return Si(() => {
    if (n) {
      r({ width: n.offsetWidth, height: n.offsetHeight });
      const a = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const f = c[0];
        let d, h;
        if ("borderBoxSize" in f) {
          const g = f.borderBoxSize, p = Array.isArray(g) ? g[0] : g;
          d = p.inlineSize, h = p.blockSize;
        } else
          d = n.offsetWidth, h = n.offsetHeight;
        r({ width: d, height: h });
      });
      return a.observe(n, { box: "border-box" }), () => a.unobserve(n);
    } else
      r(void 0);
  }, [n]), o;
}
Xw(H0, "useSize");
const ia = Math.min, Io = Math.max, Fc = Math.round, Wi = Math.floor, Ho = (n) => ({
  x: n,
  y: n
}), Kw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function U0(n, o, r) {
  return Io(n, ia(o, r));
}
function Ei(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function Xl(n) {
  return n.split("-")[0];
}
function Ti(n) {
  return n.split("-")[1];
}
function Kp(n) {
  return n === "x" ? "y" : "x";
}
function Fp(n) {
  return n === "y" ? "height" : "width";
}
function Pl(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function Qp(n) {
  return Kp(Pl(n));
}
function Fw(n, o, r) {
  r === void 0 && (r = !1);
  const a = Ti(n), c = Qp(n), f = Fp(c);
  let d = c === "x" ? a === (r ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = Qc(d)), [d, Qc(d)];
}
function Qw(n) {
  const o = Qc(n);
  return [xp(n), o, xp(o)];
}
function xp(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const zy = ["left", "right"], ky = ["right", "left"], Zw = ["top", "bottom"], $w = ["bottom", "top"];
function Jw(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? ky : zy : o ? zy : ky;
    case "left":
    case "right":
      return o ? Zw : $w;
    default:
      return [];
  }
}
function Ww(n, o, r, a) {
  const c = Ti(n);
  let f = Jw(Xl(n), r === "start", a);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(xp)))), f;
}
function Qc(n) {
  const o = Xl(n);
  return Kw[o] + n.slice(o.length);
}
function e_(n) {
  var o, r, a, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (a = n.bottom) != null ? a : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function B0(n) {
  return typeof n != "number" ? e_(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function Zc(n) {
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
function Dy(n, o, r) {
  let {
    reference: a,
    floating: c
  } = n;
  const f = Pl(o), d = Qp(o), h = Fp(d), g = Xl(o), p = f === "y", y = a.x + a.width / 2 - c.width / 2, v = a.y + a.height / 2 - c.height / 2, x = a[h] / 2 - c[h] / 2;
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
  const _ = Ti(o);
  return _ && (C[d] += x * (_ === "end" ? 1 : -1) * (r && p ? -1 : 1)), C;
}
async function t_(n, o) {
  var r;
  o === void 0 && (o = {});
  const {
    x: a,
    y: c,
    platform: f,
    rects: d,
    elements: h,
    strategy: g
  } = n, {
    boundary: p = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: v = "floating",
    altBoundary: x = !1,
    padding: C = 0
  } = Ei(o, n), _ = B0(C), N = h[x ? v === "floating" ? "reference" : "floating" : v], M = Zc(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(N))) == null || r ? N : N.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(h.floating)),
    boundary: p,
    rootBoundary: y,
    strategy: g
  })), A = v === "floating" ? {
    x: a,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, w = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(h.floating)), z = await (f.isElement == null ? void 0 : f.isElement(w)) && await (f.getScale == null ? void 0 : f.getScale(w)) || {
    x: 1,
    y: 1
  }, I = Zc(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: h,
    rect: A,
    offsetParent: w,
    strategy: g
  }) : A);
  return {
    top: (M.top - I.top + _.top) / z.y,
    bottom: (I.bottom - M.bottom + _.bottom) / z.y,
    left: (M.left - I.left + _.left) / z.x,
    right: (I.right - M.right + _.right) / z.x
  };
}
const n_ = 50, l_ = async (n, o, r) => {
  const {
    placement: a = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, h = d.detectOverflow ? d : {
    ...d,
    detectOverflow: t_
  }, g = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let p = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: y,
    y: v
  } = Dy(p, a, g), x = a, C = 0;
  const _ = {};
  for (let T = 0; T < f.length; T++) {
    const N = f[T];
    if (!N)
      continue;
    const {
      name: M,
      fn: A
    } = N, {
      x: w,
      y: z,
      data: I,
      reset: Y
    } = await A({
      x: y,
      y: v,
      initialPlacement: a,
      placement: x,
      strategy: c,
      middlewareData: _,
      rects: p,
      platform: h,
      elements: {
        reference: n,
        floating: o
      }
    });
    y = w ?? y, v = z ?? v, _[M] = {
      ..._[M],
      ...I
    }, Y && C < n_ && (C++, typeof Y == "object" && (Y.placement && (x = Y.placement), Y.rects && (p = Y.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : Y.rects), {
      x: y,
      y: v
    } = Dy(p, x, g)), T = -1);
  }
  return {
    x: y,
    y: v,
    placement: x,
    strategy: c,
    middlewareData: _
  };
}, o_ = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(o) {
      var r, a;
      const {
        placement: c,
        middlewareData: f,
        rects: d,
        initialPlacement: h,
        platform: g,
        elements: p
      } = o, {
        mainAxis: y = !0,
        crossAxis: v = !0,
        fallbackPlacements: x,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: T = !0,
        ...N
      } = Ei(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const M = Xl(c), A = Pl(h), w = Xl(h) === h, z = await (g.isRTL == null ? void 0 : g.isRTL(p.floating)), I = x || (w || !T ? [Qc(h)] : Qw(h)), Y = _ !== "none";
      !x && Y && I.push(...Ww(h, T, _, z));
      const B = [h, ...I], L = await g.detectOverflow(o, N), P = [];
      let J = ((a = f.flip) == null ? void 0 : a.overflows) || [];
      if (y && P.push(L[M]), v) {
        const de = Fw(c, d, z);
        P.push(L[de[0]], L[de[1]]);
      }
      if (J = [...J, {
        placement: c,
        overflows: P
      }], !P.every((de) => de <= 0)) {
        var ae, ue;
        const de = (((ae = f.flip) == null ? void 0 : ae.index) || 0) + 1, ye = B[de];
        if (ye && (!(v === "alignment" ? A !== Pl(ye) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        J.every((K) => Pl(K.placement) === A ? K.overflows[0] > 0 : !0)))
          return {
            data: {
              index: de,
              overflows: J
            },
            reset: {
              placement: ye
            }
          };
        let V = (ue = J.filter((H) => H.overflows[0] <= 0).sort((H, K) => H.overflows[1] - K.overflows[1])[0]) == null ? void 0 : ue.placement;
        if (!V)
          switch (C) {
            case "bestFit": {
              var ee;
              const H = (ee = J.filter((K) => {
                if (Y) {
                  const Se = Pl(K.placement);
                  return Se === A || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Se === "y";
                }
                return !0;
              }).map((K) => [K.placement, K.overflows.filter((Se) => Se > 0).reduce((Se, ie) => Se + ie, 0)]).sort((K, Se) => K[1] - Se[1])[0]) == null ? void 0 : ee[0];
              H && (V = H);
              break;
            }
            case "initialPlacement":
              V = h;
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
}, G0 = /* @__PURE__ */ new Set(["left", "top"]);
async function i_(n, o) {
  const {
    placement: r,
    platform: a,
    elements: c
  } = n, f = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), d = Xl(r), h = Ti(r), g = Pl(r) === "y", p = G0.has(d) ? -1 : 1, y = f && g ? -1 : 1, v = Ei(o, n);
  let {
    mainAxis: x,
    crossAxis: C,
    alignmentAxis: _
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return h && typeof _ == "number" && (C = h === "end" ? _ * -1 : _), g ? {
    x: C * y,
    y: x * p
  } : {
    x: x * p,
    y: C * y
  };
}
const r_ = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(o) {
      var r, a;
      const {
        x: c,
        y: f,
        placement: d,
        middlewareData: h
      } = o, g = await i_(o, n);
      return d === ((r = h.offset) == null ? void 0 : r.placement) && (a = h.arrow) != null && a.alignmentOffset ? {} : {
        x: c + g.x,
        y: f + g.y,
        data: {
          ...g,
          placement: d
        }
      };
    }
  };
}, a_ = function(n) {
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
        crossAxis: h = !1,
        limiter: g = {
          fn: (A) => {
            let {
              x: w,
              y: z
            } = A;
            return {
              x: w,
              y: z
            };
          }
        },
        ...p
      } = Ei(n, o), y = {
        x: r,
        y: a
      }, v = await f.detectOverflow(o, p), x = Pl(c), C = Kp(x);
      let _ = y[C], T = y[x];
      const N = (A, w) => U0(w + v[A === "y" ? "top" : "left"], w, w - v[A === "y" ? "bottom" : "right"]);
      d && (_ = N(C, _)), h && (T = N(x, T));
      const M = g.fn({
        ...o,
        [C]: _,
        [x]: T
      });
      return {
        ...M,
        data: {
          x: M.x - r,
          y: M.y - a,
          enabled: {
            [C]: d,
            [x]: h
          }
        }
      };
    }
  };
}, s_ = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(o) {
      var r, a;
      const {
        x: c,
        y: f,
        placement: d,
        rects: h,
        middlewareData: g
      } = o, {
        offset: p = 0,
        mainAxis: y = !0,
        crossAxis: v = !0
      } = Ei(n, o), x = {
        x: c,
        y: f
      }, C = Pl(d), _ = Kp(C);
      let T = x[_], N = x[C];
      const M = Ei(p, o), A = typeof M == "number" ? {
        mainAxis: M,
        crossAxis: 0
      } : {
        mainAxis: (r = M.mainAxis) != null ? r : 0,
        crossAxis: (a = M.crossAxis) != null ? a : 0
      };
      if (y) {
        const I = _ === "y" ? "height" : "width", Y = h.reference[_] - h.floating[I] + A.mainAxis, B = h.reference[_] + h.reference[I] - A.mainAxis;
        T < Y ? T = Y : T > B && (T = B);
      }
      if (v) {
        var w, z;
        const I = _ === "y" ? "width" : "height", Y = G0.has(Xl(d)), B = h.reference[C] - h.floating[I] + (Y && ((w = g.offset) == null ? void 0 : w[C]) || 0) + (Y ? 0 : A.crossAxis), L = h.reference[C] + h.reference[I] + (Y ? 0 : ((z = g.offset) == null ? void 0 : z[C]) || 0) - (Y ? A.crossAxis : 0);
        N < B ? N = B : N > L && (N = L);
      }
      return {
        [_]: T,
        [C]: N
      };
    }
  };
}, c_ = function(n) {
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
        ...h
      } = Ei(n, o), g = await c.detectOverflow(o, h), p = Xl(r), y = Ti(r), v = Pl(r) === "y", {
        width: x,
        height: C
      } = a.floating;
      let _, T;
      p === "top" || p === "bottom" ? (_ = p, T = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (T = p, _ = y === "end" ? "top" : "bottom");
      const N = C - g.top - g.bottom, M = x - g.left - g.right, A = ia(C - g[_], N), w = ia(x - g[T], M), z = o.middlewareData.shift, I = !z;
      let Y = A, B = w;
      z != null && z.enabled.x && (B = M), z != null && z.enabled.y && (Y = N), I && !y && (v ? B = x - 2 * Io(g.left, g.right) : Y = C - 2 * Io(g.top, g.bottom)), await d({
        ...o,
        availableWidth: B,
        availableHeight: Y
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
function uu() {
  return typeof window < "u";
}
function Bn(n) {
  return Zp(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function mn(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function Go(n) {
  var o;
  return (o = (Zp(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function Zp(n) {
  return uu() ? n instanceof Node || n instanceof mn(n).Node : !1;
}
function hn(n) {
  return uu() ? n instanceof Element || n instanceof mn(n).Element : !1;
}
function Jt(n) {
  return uu() ? n instanceof HTMLElement || n instanceof mn(n).HTMLElement : !1;
}
function ra(n) {
  return !uu() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof mn(n).ShadowRoot;
}
function ys(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: a,
    display: c
  } = ml(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + a + r) && c !== "inline" && c !== "contents";
}
function u_(n) {
  return /^(table|td|th)$/.test(Bn(n));
}
function fu(n) {
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
const f_ = /transform|translate|scale|rotate|perspective|filter/, d_ = /paint|layout|strict|content/, $i = (n) => !!n && n !== "none";
let Vd;
function $p(n) {
  const o = hn(n) ? ml(n) : n;
  return $i(o.transform) || $i(o.translate) || $i(o.scale) || $i(o.rotate) || $i(o.perspective) || !Jp() && ($i(o.backdropFilter) || $i(o.filter)) || f_.test(o.willChange || "") || d_.test(o.contain || "");
}
function p_(n) {
  let o = Ci(n);
  for (; Jt(o) && !xi(o); ) {
    if ($p(o))
      return o;
    if (fu(o))
      return null;
    o = Ci(o);
  }
  return null;
}
function Jp() {
  return Vd == null && (Vd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Vd;
}
function xi(n) {
  return /^(html|body|#document)$/.test(Bn(n));
}
function ml(n) {
  return mn(n).getComputedStyle(n);
}
function du(n) {
  return hn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Ci(n) {
  if (Bn(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    ra(n) && n.host || // Fallback.
    Go(n)
  );
  return ra(o) ? o.host : o;
}
function Y0(n) {
  const o = Ci(n);
  return xi(o) ? (n.ownerDocument || n).body : Jt(o) && ys(o) ? o : Y0(o);
}
function aa(n, o, r) {
  var a;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = Y0(n), f = c === ((a = n.ownerDocument) == null ? void 0 : a.body), d = mn(c);
  if (f) {
    const h = Sp(d);
    return o.concat(d, d.visualViewport || [], ys(c) ? c : [], h && r ? aa(h) : []);
  } else
    return o.concat(c, aa(c, [], r));
}
function Sp(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function q0(n) {
  const o = ml(n);
  let r = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
  const c = Jt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : a, h = Fc(r) !== f || Fc(a) !== d;
  return h && (r = f, a = d), {
    width: r,
    height: a,
    $: h
  };
}
function Wp(n) {
  return hn(n) ? n : n.contextElement;
}
function na(n) {
  const o = Wp(n);
  if (!Jt(o))
    return Ho(1);
  const r = o.getBoundingClientRect(), {
    width: a,
    height: c,
    $: f
  } = q0(o);
  let d = (f ? Fc(r.width) : r.width) / a, h = (f ? Fc(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!h || !Number.isFinite(h)) && (h = 1), {
    x: d,
    y: h
  };
}
const h_ = /* @__PURE__ */ Ho(0);
function P0(n) {
  const o = mn(n);
  return !Jp() || !o.visualViewport ? h_ : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function m_(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === mn(n);
}
function or(n, o, r, a) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = Wp(n);
  let d = Ho(1);
  o && (a ? hn(a) && (d = na(a)) : d = na(n));
  const h = m_(f, r, a) ? P0(f) : Ho(0);
  let g = (c.left + h.x) / d.x, p = (c.top + h.y) / d.y, y = c.width / d.x, v = c.height / d.y;
  if (f && a) {
    const x = mn(f), C = hn(a) ? mn(a) : a;
    let _ = x, T = Sp(_);
    for (; T && C !== _; ) {
      const N = na(T), M = T.getBoundingClientRect(), A = ml(T), w = M.left + (T.clientLeft + parseFloat(A.paddingLeft)) * N.x, z = M.top + (T.clientTop + parseFloat(A.paddingTop)) * N.y;
      g *= N.x, p *= N.y, y *= N.x, v *= N.y, g += w, p += z, _ = mn(T), T = Sp(_);
    }
  }
  return Zc({
    width: y,
    height: v,
    x: g,
    y: p
  });
}
function pu(n, o) {
  const r = du(n).scrollLeft;
  return o ? o.left + r : or(Go(n)).left + r;
}
function X0(n, o) {
  const r = n.getBoundingClientRect(), a = r.left + o.scrollLeft - pu(n, r), c = r.top + o.scrollTop;
  return {
    x: a,
    y: c
  };
}
function g_(n) {
  let {
    elements: o,
    rect: r,
    offsetParent: a,
    strategy: c
  } = n;
  const f = c === "fixed", d = Go(a), h = o ? fu(o.floating) : !1;
  if (a === d || h && f)
    return r;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, p = Ho(1);
  const y = Ho(0), v = Jt(a);
  if ((v || !f) && ((Bn(a) !== "body" || ys(d)) && (g = du(a)), v)) {
    const C = or(a);
    p = na(a), y.x = C.x + a.clientLeft, y.y = C.y + a.clientTop;
  }
  const x = d && !v && !f ? X0(d, g) : Ho(0);
  return {
    width: r.width * p.x,
    height: r.height * p.y,
    x: r.x * p.x - g.scrollLeft * p.x + y.x + x.x,
    y: r.y * p.y - g.scrollTop * p.y + y.y + x.y
  };
}
function b_(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function y_(n) {
  const o = du(n), r = n.ownerDocument.body, a = Io(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = Io(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + pu(n);
  const d = -o.scrollTop;
  return ml(r).direction === "rtl" && (f += Io(n.clientWidth, r.clientWidth) - a), {
    width: a,
    height: c,
    x: f,
    y: d
  };
}
const v_ = 25;
function x_(n, o, r) {
  r === void 0 && (r = "viewport");
  const a = r === "layoutViewport", c = mn(n), f = Go(n), d = c.visualViewport;
  let h = f.clientWidth, g = f.clientHeight, p = 0, y = 0;
  if (d) {
    const x = !Jp() || o === "fixed";
    a ? x || (p = -d.offsetLeft, y = -d.offsetTop) : (h = d.width, g = d.height, x && (p = d.offsetLeft, y = d.offsetTop));
  }
  if (pu(f) <= 0) {
    const x = f.ownerDocument, C = x.body, _ = getComputedStyle(C), T = x.compatMode === "CSS1Compat" && parseFloat(_.marginLeft) + parseFloat(_.marginRight) || 0, N = Math.abs(f.clientWidth - C.clientWidth - T), M = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? N / 2 : N;
    M <= v_ && (h -= M);
  }
  return {
    width: h,
    height: g,
    x: p,
    y
  };
}
function S_(n, o) {
  const r = or(n, !0, o === "fixed"), a = r.top + n.clientTop, c = r.left + n.clientLeft, f = na(n), d = n.clientWidth * f.x, h = n.clientHeight * f.y, g = c * f.x, p = a * f.y;
  return {
    width: d,
    height: h,
    x: g,
    y: p
  };
}
function jy(n, o, r) {
  let a;
  if (o === "viewport" || o === "layoutViewport")
    a = x_(n, r, o);
  else if (o === "document")
    a = y_(Go(n));
  else if (hn(o))
    a = S_(o, r);
  else {
    const c = P0(n);
    a = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return Zc(a);
}
function E_(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let a = aa(n, [], !1).filter((h) => hn(h) && Bn(h) !== "body"), c = null;
  const f = ml(n).position === "fixed";
  let d = f ? Ci(n) : n;
  for (; hn(d) && !xi(d); ) {
    const h = ml(d), g = $p(d), p = c ? c.position : f ? "fixed" : "";
    !g && (p === "fixed" || p === "absolute" && h.position === "static") ? a = a.filter((v) => v !== d) : c = h, d = Ci(d);
  }
  return o.set(n, a), a;
}
function C_(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: a,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? fu(o) ? [] : E_(o, this._c) : [].concat(r), a], h = jy(o, d[0], c);
  let g = h.top, p = h.right, y = h.bottom, v = h.left;
  for (let x = 1; x < d.length; x++) {
    const C = jy(o, d[x], c);
    g = Io(C.top, g), p = ia(C.right, p), y = ia(C.bottom, y), v = Io(C.left, v);
  }
  return {
    width: p - v,
    height: y - g,
    x: v,
    y: g
  };
}
function R_(n) {
  const {
    width: o,
    height: r
  } = q0(n);
  return {
    width: o,
    height: r
  };
}
function w_(n, o, r) {
  const a = Jt(o), c = Go(o), f = r === "fixed", d = or(n, !0, f, o);
  let h = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = Ho(0);
  if ((a || !f) && ((Bn(o) !== "body" || ys(c)) && (h = du(o)), a)) {
    const x = or(o, !0, f, o);
    g.x = x.x + o.clientLeft, g.y = x.y + o.clientTop;
  }
  !a && c && (g.x = pu(c));
  const p = c && !a && !f ? X0(c, h) : Ho(0), y = d.left + h.scrollLeft - g.x - p.x, v = d.top + h.scrollTop - g.y - p.y;
  return {
    x: y,
    y: v,
    width: d.width,
    height: d.height
  };
}
function Id(n) {
  return ml(n).position === "static";
}
function Ly(n, o) {
  if (!Jt(n) || ml(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Go(n) === r && (r = r.ownerDocument.body), r;
}
function K0(n, o) {
  const r = mn(n);
  if (fu(n))
    return r;
  if (!Jt(n)) {
    let c = Ci(n);
    for (; c && !xi(c); ) {
      if (hn(c) && !Id(c))
        return c;
      c = Ci(c);
    }
    return r;
  }
  let a = Ly(n, o);
  for (; a && u_(a) && Id(a); )
    a = Ly(a, o);
  return a && xi(a) && Id(a) && !$p(a) ? r : a || p_(n) || r;
}
const __ = async function(n) {
  const o = this.getOffsetParent || K0, r = this.getDimensions, a = await r(n.floating);
  return {
    reference: w_(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: a.width,
      height: a.height
    }
  };
};
function A_(n) {
  return ml(n).direction === "rtl";
}
const M_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: g_,
  getDocumentElement: Go,
  getClippingRect: C_,
  getOffsetParent: K0,
  getElementRects: __,
  getClientRects: b_,
  getDimensions: R_,
  getScale: na,
  isElement: hn,
  isRTL: A_
};
function F0(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function T_(n, o, r) {
  let a = null, c;
  const f = Go(n);
  function d() {
    var y;
    clearTimeout(c), (y = a) == null || y.disconnect(), a = null;
  }
  function h(y, v) {
    y === void 0 && (y = !1), v === void 0 && (v = 1), d();
    const x = n.getBoundingClientRect(), {
      left: C,
      top: _,
      width: T,
      height: N
    } = x;
    if (y || o(), !T || !N)
      return;
    const M = Wi(_), A = Wi(f.clientWidth - (C + T)), w = Wi(f.clientHeight - (_ + N)), z = Wi(C), Y = {
      rootMargin: -M + "px " + -A + "px " + -w + "px " + -z + "px",
      threshold: Io(0, ia(1, v)) || 1
    };
    let B = !0;
    function L(P) {
      const J = P[0].intersectionRatio;
      if (!F0(x, n.getBoundingClientRect()))
        return h();
      if (J !== v) {
        if (!B)
          return h();
        J ? h(!1, J) : c = setTimeout(() => {
          h(!1, 1e-7);
        }, 1e3);
      }
      B = !1;
    }
    try {
      a = new IntersectionObserver(L, {
        ...Y,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      a = new IntersectionObserver(L, Y);
    }
    a.observe(n);
  }
  const g = mn(n), p = () => h(r);
  return g.addEventListener("resize", p), h(!0), () => {
    g.removeEventListener("resize", p), d();
  };
}
function Vy(n, o, r, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: h = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = a, p = Wp(n), y = c || f ? [...p ? aa(p) : [], ...o ? aa(o) : []] : [];
  y.forEach((M) => {
    c && M.addEventListener("scroll", r), f && M.addEventListener("resize", r);
  });
  const v = p && h ? T_(p, r, f) : null;
  let x = -1, C = null;
  d && (C = new ResizeObserver((M) => {
    let [A] = M;
    A && A.target === p && C && o && (C.unobserve(o), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
      var w;
      (w = C) == null || w.observe(o);
    })), r();
  }), p && !g && C.observe(p), o && C.observe(o));
  let _, T = g ? or(n) : null;
  g && N();
  function N() {
    const M = or(n);
    T && !F0(T, M) && r(), T = M, _ = requestAnimationFrame(N);
  }
  return r(), () => {
    var M;
    y.forEach((A) => {
      c && A.removeEventListener("scroll", r), f && A.removeEventListener("resize", r);
    }), v?.(), (M = C) == null || M.disconnect(), C = null, g && cancelAnimationFrame(_);
  };
}
const O_ = r_, N_ = a_, z_ = o_, k_ = c_, D_ = s_, j_ = (n, o, r) => {
  const a = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...M_,
    ...c.platform,
    _c: a
  };
  return l_(n, o, {
    ...c,
    platform: f
  });
};
var L_ = typeof document < "u", V_ = function() {
}, Yc = L_ ? b.useLayoutEffect : V_;
function $c(n, o) {
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
        if (!$c(n[a], o[a]))
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
      if (!(f === "_owner" && n.$$typeof) && !$c(n[f], o[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function Q0(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Iy(n, o) {
  const r = Q0(n);
  return Math.round(o * r) / r;
}
function Hd(n) {
  const o = b.useRef(n);
  return Yc(() => {
    o.current = n;
  }), o;
}
function I_(n) {
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
    transform: h = !0,
    whileElementsMounted: g,
    open: p
  } = n, [y, v] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [x, C] = b.useState(a);
  $c(x, a) || C(a);
  const [_, T] = b.useState(null), [N, M] = b.useState(null), A = b.useCallback((K) => {
    K !== Y.current && (Y.current = K, T(K));
  }, []), w = b.useCallback((K) => {
    K !== B.current && (B.current = K, M(K));
  }, []), z = f || _, I = d || N, Y = b.useRef(null), B = b.useRef(null), L = b.useRef(y), P = g != null, J = Hd(g), ae = Hd(c), ue = Hd(p), ee = b.useCallback(() => {
    if (!Y.current || !B.current)
      return;
    const K = {
      placement: o,
      strategy: r,
      middleware: x
    };
    ae.current && (K.platform = ae.current), j_(Y.current, B.current, K).then((Se) => {
      const ie = {
        ...Se,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: ue.current !== !1
      };
      de.current && !$c(L.current, ie) && (L.current = ie, sa.flushSync(() => {
        v(ie);
      }));
    });
  }, [x, o, r, ae, ue]);
  Yc(() => {
    p === !1 && L.current.isPositioned && (L.current.isPositioned = !1, v((K) => ({
      ...K,
      isPositioned: !1
    })));
  }, [p]);
  const de = b.useRef(!1);
  Yc(() => (de.current = !0, () => {
    de.current = !1;
  }), []), Yc(() => {
    if (z && (Y.current = z), I && (B.current = I), z && I) {
      if (J.current)
        return J.current(z, I, ee);
      ee();
    }
  }, [z, I, ee, J, P]);
  const ye = b.useMemo(() => ({
    reference: Y,
    floating: B,
    setReference: A,
    setFloating: w
  }), [A, w]), V = b.useMemo(() => ({
    reference: z,
    floating: I
  }), [z, I]), H = b.useMemo(() => {
    const K = {
      position: r,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return K;
    const Se = Iy(V.floating, y.x), ie = Iy(V.floating, y.y);
    return h ? {
      ...K,
      transform: "translate(" + Se + "px, " + ie + "px)",
      ...Q0(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: Se,
      top: ie
    };
  }, [r, h, V.floating, y.x, y.y]);
  return b.useMemo(() => ({
    ...y,
    update: ee,
    refs: ye,
    elements: V,
    floatingStyles: H
  }), [y, ee, ye, V, H]);
}
const H_ = (n, o) => {
  const r = O_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, U_ = (n, o) => {
  const r = N_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, B_ = (n, o) => ({
  fn: D_(n).fn,
  options: [n, o]
}), G_ = (n, o) => {
  const r = z_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, Y_ = (n, o) => {
  const r = k_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var q_ = Object.defineProperty, eh = (n, o) => q_(n, "name", { value: o, configurable: !0 }), Ud = !1;
function Z0() {
  const [n, o] = b.useState(Ud);
  return b.useEffect(() => {
    Ud || (Ud = !0, o(!0));
  }, []), n;
}
eh(Z0, "useIsHydrated");
var $0 = ur[" useSyncExternalStore ".trim().toString()];
function J0() {
  return () => {
  };
}
eh(J0, "subscribe");
function W0() {
  return $0(
    J0,
    () => !0,
    () => !1
  );
}
eh(W0, "useIsHydratedModern");
var P_ = typeof $0 == "function" ? W0 : Z0, X_ = Object.defineProperty, dr = (n, o) => X_(n, "name", { value: o, configurable: !0 }), Bd = "rovingFocusGroup.onEntryFocus", K_ = { bubbles: !1, cancelable: !0 }, hu = "RovingFocusGroup", [Ep, ex, F_] = /* @__PURE__ */ iu(hu), [Q_, tx] = /* @__PURE__ */ Mi(
  hu,
  [F_]
), [Z_, $_] = Q_(hu), J_ = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ dr(function(o, r) {
    return /* @__PURE__ */ S.jsx(Ep.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(Ep.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(W_, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), W_ = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ dr(function(o, r) {
  const {
    __scopeRovingFocusGroup: a,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: h,
    defaultCurrentTabStopId: g,
    onCurrentTabStopIdChange: p,
    onEntryFocus: y,
    preventScrollOnEntryFocus: v = !1,
    ...x
  } = o, C = b.useRef(null), _ = Pn(r, C), T = bs(d), [N, M] = Bo({
    prop: h,
    defaultProp: g ?? null,
    onChange: p,
    caller: hu
  }), [A, w] = b.useState(!1), z = I0(y), I = ex(a), Y = b.useRef(!1), [B, L] = b.useState(0);
  return b.useEffect(() => {
    const P = C.current;
    if (P)
      return P.addEventListener(Bd, z), () => P.removeEventListener(Bd, z);
  }, [z]), /* @__PURE__ */ S.jsx(
    Z_,
    {
      scope: a,
      orientation: c,
      dir: T,
      loop: f,
      currentTabStopId: N,
      onItemFocus: b.useCallback(
        (P) => M(P),
        [M]
      ),
      onItemShiftTab: b.useCallback(() => w(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => L((P) => P + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => L((P) => P - 1),
        []
      ),
      children: /* @__PURE__ */ S.jsx(
        Un.div,
        {
          tabIndex: A || B === 0 ? -1 : 0,
          "data-orientation": c,
          ...x,
          ref: _,
          style: { outline: "none", ...o.style },
          onMouseDown: qn(o.onMouseDown, () => {
            Y.current = !0;
          }),
          onFocus: qn(o.onFocus, (P) => {
            const J = !Y.current;
            if (P.target === P.currentTarget && J && !A) {
              const ae = new CustomEvent(Bd, K_);
              if (P.currentTarget.dispatchEvent(ae), !ae.defaultPrevented) {
                const ue = I().filter((H) => H.focusable), ee = ue.find((H) => H.active), de = ue.find((H) => H.id === N), V = [ee, de, ...ue].filter(
                  Boolean
                ).map((H) => H.ref.current);
                th(V, v);
              }
            }
            Y.current = !1;
          }),
          onBlur: qn(o.onBlur, () => w(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), eA = "RovingFocusGroupItem", tA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ dr(function(o, r) {
    const {
      __scopeRovingFocusGroup: a,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: h,
      ...g
    } = o, p = ru(), y = d || p, v = $_(eA, a), x = v.currentTabStopId === y, C = ex(a), { onFocusableItemAdd: _, onFocusableItemRemove: T, currentTabStopId: N } = v, M = P_();
    return Si(() => {
      if (!(!M || !c))
        return _(), () => T();
    }, [M, c, _, T]), b.useEffect(() => {
      if (!(M || !c))
        return _(), () => T();
    }, [M, c, _, T]), /* @__PURE__ */ S.jsx(
      Ep.ItemSlot,
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
            onMouseDown: qn(o.onMouseDown, (A) => {
              c ? v.onItemFocus(y) : A.preventDefault();
            }),
            onFocus: qn(o.onFocus, () => v.onItemFocus(y)),
            onKeyDown: qn(o.onKeyDown, (A) => {
              if (A.key === "Tab" && A.shiftKey) {
                v.onItemShiftTab();
                return;
              }
              if (A.target !== A.currentTarget) return;
              const w = lx(A, v.orientation, v.dir);
              if (w !== void 0) {
                if (A.metaKey || A.ctrlKey || A.altKey || A.shiftKey) return;
                A.preventDefault();
                let I = C().filter((Y) => Y.focusable).map((Y) => Y.ref.current);
                if (w === "last") I.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && I.reverse();
                  const Y = I.indexOf(A.currentTarget);
                  I = v.loop ? ox(I, Y + 1) : I.slice(Y + 1);
                }
                setTimeout(() => th(I));
              }
            }),
            children: typeof h == "function" ? h({ isCurrentTabStop: x, hasTabStop: N != null }) : h
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), nA = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function nx(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
dr(nx, "getDirectionAwareKey");
function lx(n, o, r) {
  const a = nx(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a)))
    return nA[a];
}
dr(lx, "getFocusIntent");
function th(n, o = !1) {
  const r = document.activeElement;
  for (const a of n)
    if (a === r || (a.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
dr(th, "focusFirst");
function ox(n, o) {
  return n.map((r, a) => n[(o + a) % n.length]);
}
dr(ox, "wrapArray");
var lA = J_, oA = tA, iA = Object.defineProperty, rA = (n, o) => iA(n, "name", { value: o, configurable: !0 }), aA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ rA(function(o, r) {
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
), sA = aA, cA = Object.defineProperty, uA = (n, o) => cA(n, "name", { value: o, configurable: !0 });
function ix(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
uA(ix, "usePrevious");
var fA = Object.defineProperty, dA = (n, o) => fA(n, "name", { value: o, configurable: !0 });
function nh(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
dA(nh, "clamp");
var pA = Object.defineProperty, rx = (n, o) => pA(n, "name", { value: o, configurable: !0 }), Hy = "horizontal", hA = ["horizontal", "vertical"], mA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ rx(function(o, r) {
    const { decorative: a, orientation: c = Hy, ...f } = o, d = ax(c) ? c : Hy, g = a ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
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
function ax(n) {
  return hA.includes(n);
}
rx(ax, "isValidOrientation");
var gA = mA, bA = Object.defineProperty, Tt = (n, o) => bA(n, "name", { value: o, configurable: !0 }), sx = ["PageUp", "PageDown"], cx = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], ux = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, vs = "Slider", [Cp, yA, vA] = /* @__PURE__ */ iu(vs), [lh, UN] = /* @__PURE__ */ Mi(vs, [
  vA
]), [xA, xs] = lh(vs), SA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Tt(function(o, r) {
    const {
      name: a,
      min: c = 0,
      max: f = 100,
      step: d = 1,
      orientation: h = "horizontal",
      disabled: g = !1,
      minStepsBetweenThumbs: p = 0,
      defaultValue: y = [c],
      value: v,
      onValueChange: x = /* @__PURE__ */ Tt(() => {
      }, "onValueChange"),
      onValueCommit: C = /* @__PURE__ */ Tt(() => {
      }, "onValueCommit"),
      inverted: _ = !1,
      form: T,
      ...N
    } = o, M = b.useRef(/* @__PURE__ */ new Set()), A = b.useRef(0), w = b.useRef(!1), I = h === "horizontal" ? EA : CA, [Y, B] = b.useState(null), L = Pn(r, B), [P = [], J] = Bo({
      prop: v,
      defaultProp: y,
      onChange: /* @__PURE__ */ Tt((H) => {
        [...M.current][A.current]?.focus({
          preventScroll: !0,
          focusVisible: w.current
        }), w.current = !1, x(H);
      }, "onChange")
    }), ae = b.useRef(P), ue = b.useRef(P);
    b.useEffect(() => {
      const H = T ? Y?.ownerDocument.getElementById(T) : Y?.closest("form");
      if (H instanceof HTMLFormElement) {
        const K = /* @__PURE__ */ Tt(() => J(ue.current), "reset");
        return H.addEventListener("reset", K), () => H.removeEventListener("reset", K);
      }
    }, [Y, T, J]);
    function ee(H) {
      const K = yx(P, H);
      V(H, K);
    }
    Tt(ee, "handleSlideStart");
    function de(H) {
      V(H, A.current);
    }
    Tt(de, "handleSlideMove");
    function ye() {
      String(P) !== String(ae.current) && C(P);
    }
    Tt(ye, "handleSlideEnd");
    function V(H, K, { commit: Se } = { commit: !1 }) {
      const ie = ih(d), k = is(Math.round((H - c) / d) * d + c, ie), X = nh(k, [c, f]);
      J((W = []) => {
        const te = gx(W, X, K);
        if (Sx(te, p * d)) {
          A.current = te.indexOf(X);
          const ge = String(te) !== String(W);
          return ge && Se && C(te), ge ? te : W;
        } else
          return W;
      });
    }
    return Tt(V, "updateValues"), /* @__PURE__ */ S.jsx(
      xA,
      {
        scope: o.__scopeSlider,
        name: a,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: A,
        thumbs: M.current,
        values: P,
        orientation: h,
        form: T,
        children: /* @__PURE__ */ S.jsx(Cp.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(Cp.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          I,
          {
            "aria-disabled": g,
            "data-disabled": g ? "" : void 0,
            ...N,
            ref: L,
            onPointerDown: qn(N.onPointerDown, () => {
              g || (ae.current = P, w.current = !1);
            }),
            min: c,
            max: f,
            inverted: _,
            onSlideStart: g ? void 0 : ee,
            onSlideMove: g ? void 0 : de,
            onSlideEnd: g ? void 0 : ye,
            onHomeKeyDown: () => {
              g || (w.current = !0, V(c, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              g || (w.current = !0, V(f, P.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: H, direction: K }) => {
              if (!g) {
                w.current = !0;
                const k = sx.includes(H.key) || H.shiftKey && cx.includes(H.key) ? 10 : 1, X = A.current, W = P[X], te = Ex(W, {
                  min: c,
                  step: d,
                  direction: K,
                  multiplier: k
                });
                V(te, X, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [fx, dx] = lh(vs, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), EA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Tt(function(o, r) {
    const {
      min: a,
      max: c,
      dir: f,
      inverted: d,
      onSlideStart: h,
      onSlideMove: g,
      onSlideEnd: p,
      onStepKeyDown: y,
      ...v
    } = o, [x, C] = b.useState(null), _ = Pn(r, C), T = b.useRef(void 0), N = bs(f), M = N === "ltr", A = M && !d || !M && d;
    function w(z) {
      const I = T.current || x.getBoundingClientRect(), Y = [0, I.width], L = mu(Y, A ? [a, c] : [c, a]);
      return T.current = I, L(z - I.left);
    }
    return Tt(w, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      fx,
      {
        scope: o.__scopeSlider,
        startEdge: A ? "left" : "right",
        endEdge: A ? "right" : "left",
        direction: A ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          px,
          {
            dir: N,
            "data-orientation": "horizontal",
            ...v,
            ref: _,
            style: {
              ...v.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (z) => {
              const I = w(z.clientX);
              h?.(I);
            },
            onSlideMove: (z) => {
              const I = w(z.clientX);
              g?.(I);
            },
            onSlideEnd: () => {
              T.current = void 0, p?.();
            },
            onStepKeyDown: (z) => {
              const Y = ux[A ? "from-left" : "from-right"].includes(z.key);
              y?.({ event: z, direction: Y ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), CA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Tt(function(o, r) {
    const {
      min: a,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: h,
      onSlideEnd: g,
      onStepKeyDown: p,
      ...y
    } = o, v = b.useRef(null), x = Pn(r, v), C = b.useRef(void 0), _ = !f;
    function T(N) {
      const M = C.current || v.current.getBoundingClientRect(), A = [0, M.height], z = mu(A, _ ? [c, a] : [a, c]);
      return C.current = M, z(N - M.top);
    }
    return Tt(T, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      fx,
      {
        scope: o.__scopeSlider,
        startEdge: _ ? "bottom" : "top",
        endEdge: _ ? "top" : "bottom",
        size: "height",
        direction: _ ? 1 : -1,
        children: /* @__PURE__ */ S.jsx(
          px,
          {
            "data-orientation": "vertical",
            ...y,
            ref: x,
            style: {
              ...y.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (N) => {
              const M = T(N.clientY);
              d?.(M);
            },
            onSlideMove: (N) => {
              const M = T(N.clientY);
              h?.(M);
            },
            onSlideEnd: () => {
              C.current = void 0, g?.();
            },
            onStepKeyDown: (N) => {
              const A = ux[_ ? "from-bottom" : "from-top"].includes(N.key);
              p?.({ event: N, direction: A ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), px = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Tt(function(o, r) {
    const {
      __scopeSlider: a,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: h,
      onEndKeyDown: g,
      onStepKeyDown: p,
      ...y
    } = o, v = xs(vs, a);
    return /* @__PURE__ */ S.jsx(
      Un.span,
      {
        ...y,
        ref: r,
        onKeyDown: qn(o.onKeyDown, (x) => {
          x.key === "Home" ? (h(x), x.preventDefault()) : x.key === "End" ? (g(x), x.preventDefault()) : sx.concat(cx).includes(x.key) && (p(x), x.preventDefault());
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
), RA = "SliderTrack", wA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Tt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = xs(RA, a);
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
), Uy = "SliderRange", _A = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Tt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = xs(Uy, a), d = dx(Uy, a), h = b.useRef(null), g = Pn(r, h), p = f.values.length, y = f.values.map(
      (C) => oh(C, f.min, f.max)
    ), v = p > 1 ? Math.min(...y) : 0, x = 100 - Math.max(...y);
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
), AA = "SliderThumb", [MA, hx] = lh(AA), TA = "SliderThumbProvider";
function mx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: a,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = xs(TA, o), d = yA(o), [h, g] = b.useState(null), p = b.useMemo(
    () => h ? d().findIndex((N) => N.ref.current === h) : -1,
    [d, h]
  ), y = H0(h), v = h ? !!f.form || !!h.closest("form") : !0, x = f.values[p], C = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), _ = x === void 0 ? 0 : oh(x, f.min, f.max);
  b.useEffect(() => {
    if (h)
      return f.thumbs.add(h), () => {
        f.thumbs.delete(h);
      };
  }, [h, f.thumbs]);
  const T = {
    value: x,
    name: C,
    form: f.form,
    isFormControl: v,
    index: p,
    thumb: h,
    onThumbChange: g,
    percent: _,
    size: y
  };
  return /* @__PURE__ */ S.jsx(MA, { scope: o, ...T, children: Cx(c) ? c(T) : a });
}
Tt(mx, "SliderThumbProvider");
var Gd = "SliderThumbTrigger", OA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Tt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = xs(Gd, a), d = dx(Gd, a), { index: h, value: g, percent: p, size: y, onThumbChange: v } = hx(
      Gd,
      a
    ), x = Pn(r, v), C = bx(h, f.values.length), _ = y?.[d.size], T = _ ? vx(_, p, d.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${p}% + ${T}px)`
        },
        children: /* @__PURE__ */ S.jsx(Cp.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
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
            onFocus: qn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = h;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), NA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Tt(function(o, r) {
    const { __scopeSlider: a, name: c, ...f } = o;
    return /* @__PURE__ */ S.jsx(
      mx,
      {
        __scopeSlider: a,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: h }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            OA,
            {
              ...f,
              ref: r,
              __scopeSlider: a
            }
          ),
          h ? /* @__PURE__ */ S.jsx(
            kA,
            {
              __scopeSlider: a
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), zA = "SliderBubbleInput", kA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Tt(function({ __scopeSlider: o, ...r }, a) {
    const { value: c, name: f, form: d } = hx(zA, o), h = b.useRef(null), g = Pn(h, a), p = ix(c);
    return b.useEffect(() => {
      const y = h.current;
      if (!y) return;
      const v = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(v, "value").set;
      if (p !== c && C) {
        const _ = new Event("input", { bubbles: !0 });
        C.call(y, c), y.dispatchEvent(_);
      }
    }, [p, c]), /* @__PURE__ */ S.jsx(
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
function gx(n = [], o, r) {
  const a = [...n];
  return a[r] = o, a.sort((c, f) => c - f);
}
Tt(gx, "getNextSortedValues");
function oh(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return nh(f, [0, 100]);
}
Tt(oh, "convertValueToPercentage");
function bx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
Tt(bx, "getLabel");
function yx(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), a = Math.min(...r);
  return r.indexOf(a);
}
Tt(yx, "getClosestValueIndex");
function vx(n, o, r) {
  const a = n / 2, f = mu([0, 50], [0, a]);
  return (a - f(o) * r) * r;
}
Tt(vx, "getThumbInBoundsOffset");
function xx(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
Tt(xx, "getStepsBetweenValues");
function Sx(n, o) {
  if (o > 0) {
    const r = xx(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
Tt(Sx, "hasMinStepsBetweenValues");
function mu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const a = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + a * (r - n[0]);
  };
}
Tt(mu, "linearScale");
function ih(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [a, c] = o.split("e"), f = a.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
Tt(ih, "getDecimalCount");
function is(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
Tt(is, "roundValue");
function Ex(n, {
  min: o,
  step: r,
  direction: a,
  multiplier: c
}) {
  const f = ih(r), d = (n - o) / r, h = Math.round(d), g = is(h * r + o, f) === is(n, f);
  let p;
  return g ? p = h + c * a : a > 0 ? p = Math.ceil(d) : p = Math.floor(d), is(p * r + o, f);
}
Tt(Ex, "getNextStepValue");
function Cx(n) {
  return typeof n == "function";
}
Tt(Cx, "isFunction");
var DA = Object.defineProperty, jA = (n, o) => DA(n, "name", { value: o, configurable: !0 }), LA = "Toggle", VA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ jA(function(o, r) {
    const { pressed: a, defaultPressed: c, onPressedChange: f, ...d } = o, [h, g] = Bo({
      prop: a,
      onChange: f,
      defaultProp: c ?? !1,
      caller: LA
    });
    return /* @__PURE__ */ S.jsx(
      Un.button,
      {
        type: "button",
        "aria-pressed": h,
        "data-state": h ? "on" : "off",
        "data-disabled": o.disabled ? "" : void 0,
        ...d,
        ref: r,
        onClick: qn(o.onClick, () => {
          o.disabled || g(!h);
        })
      }
    );
  }, "Toggle")
), IA = Object.defineProperty, Ri = (n, o) => IA(n, "name", { value: o, configurable: !0 }), ua = "ToggleGroup", [Rx, BN] = /* @__PURE__ */ Mi(ua, [
  tx
]), wx = tx(), HA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ri(function(o, r) {
  const { type: a, ...c } = o;
  if (a === "single") {
    const f = c;
    return /* @__PURE__ */ S.jsx(UA, { role: "radiogroup", ...f, ref: r });
  }
  if (a === "multiple") {
    const f = c;
    return /* @__PURE__ */ S.jsx(BA, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${ua}\``);
}, "ToggleGroup")), [_x, Ax] = Rx(ua), UA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ri(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ri(() => {
    }, "onValueChange"),
    ...d
  } = o, [h, g] = Bo({
    prop: a,
    defaultProp: c ?? "",
    onChange: f,
    caller: ua
  });
  return /* @__PURE__ */ S.jsx(
    _x,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => h ? [h] : [], [h]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ S.jsx(Mx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), BA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ri(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ri(() => {
    }, "onValueChange"),
    ...d
  } = o, [h, g] = Bo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: ua
  }), p = b.useCallback(
    (v) => g((x = []) => [...x, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((x = []) => x.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    _x,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: h,
      onItemActivate: p,
      onItemDeactivate: y,
      children: /* @__PURE__ */ S.jsx(Mx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [GA, YA] = Rx(ua), Mx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ri(function(o, r) {
    const {
      __scopeToggleGroup: a,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: h,
      loop: g = !0,
      ...p
    } = o, y = wx(a), v = bs(h), x = { dir: v, ...p };
    return /* @__PURE__ */ S.jsx(GA, { scope: a, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ S.jsx(
      lA,
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
), Rp = "ToggleGroupItem", qA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ri(function(o, r) {
    const a = Ax(Rp, o.__scopeToggleGroup), c = YA(Rp, o.__scopeToggleGroup), f = wx(o.__scopeToggleGroup), d = a.value.includes(o.value), h = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: h }, p = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ S.jsx(
      oA,
      {
        asChild: !0,
        ...f,
        focusable: !h,
        active: d,
        ref: p,
        children: /* @__PURE__ */ S.jsx(By, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(By, { ...g, ref: r });
  }, "ToggleGroupItem")
), By = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ri(function(o, r) {
    const { __scopeToggleGroup: a, value: c, ...f } = o, d = Ax(Rp, a), h = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? h : void 0;
    return /* @__PURE__ */ S.jsx(
      VA,
      {
        ...g,
        ...f,
        ref: r,
        onPressedChange: (p) => {
          p ? d.onItemActivate(c) : d.onItemDeactivate(c);
        }
      }
    );
  }, "ToggleGroupItemImpl")
);
function Tx({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(Iw, { "data-slot": "accordion", ...n });
}
function $r({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    Hw,
    {
      "data-slot": "accordion-item",
      className: We("border-b last:border-b-0", n),
      ...o
    }
  );
}
function Jr({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(Uw, { className: "flex", children: /* @__PURE__ */ S.jsxs(
    Bw,
    {
      "data-slot": "accordion-trigger",
      className: We(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(o0, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function Wr({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    Gw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ S.jsx("div", { className: We("pt-0 pb-4", n), children: o })
    }
  );
}
const Gy = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, Yy = Gv, pr = (n, o) => (r) => {
  var a;
  if (o?.variants == null) return Yy(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((p) => {
    const y = r?.[p], v = f?.[p];
    if (y === null) return null;
    const x = Gy(y) || Gy(v);
    return c[p][x];
  }), h = r && Object.entries(r).reduce((p, y) => {
    let [v, x] = y;
    return x === void 0 || (p[v] = x), p;
  }, {}), g = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((p, y) => {
    let { class: v, className: x, ...C } = y;
    return Object.entries(C).every((_) => {
      let [T, N] = _;
      return Array.isArray(N) ? N.includes({
        ...f,
        ...h
      }[T]) : {
        ...f,
        ...h
      }[T] === N;
    }) ? [
      ...p,
      v,
      x
    ] : p;
  }, []);
  return Yy(n, d, g, r?.class, r?.className);
}, PA = pr(
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
function er({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? c0 : "button";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: We(PA({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function XA({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...a
}) {
  return /* @__PURE__ */ S.jsx(
    gA,
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
const KA = pr(
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
function FA({
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
      className: We(KA({ orientation: o }), n),
      ...r
    }
  );
}
function Ox({ className: n, ...o }) {
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
function kx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: We("px-6", n),
      ...o
    }
  );
}
function QA({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(D0, { "data-slot": "collapsible", ...n });
}
function ZA({
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
function $A({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    k0,
    {
      "data-slot": "collapsible-content",
      ...n
    }
  );
}
function qc({
  controlled: n,
  default: o,
  name: r,
  state: a = "value"
}) {
  const {
    current: c
  } = b.useRef(n !== void 0), [f, d] = b.useState(o), h = c ? n : f, g = b.useCallback((p) => {
    c || d(p);
  }, []);
  return [h, g];
}
const rh = {
  ...ur
}, qy = {};
function Ol(n, o) {
  const r = b.useRef(qy);
  return r.current === qy && (r.current = n(o)), r;
}
const Yd = rh.useInsertionEffect, JA = (
  // React 17 doesn't have useInsertionEffect.
  Yd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Yd !== rh.useLayoutEffect ? Yd : (n) => n()
);
function Ke(n) {
  const o = Ol(WA).current;
  return o.next = n, JA(o.effect), o.trampoline;
}
function WA() {
  const n = {
    next: void 0,
    callback: e2,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function e2() {
}
const t2 = () => {
}, Fe = typeof document < "u" ? b.useLayoutEffect : t2, Dx = /* @__PURE__ */ b.createContext({
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
function n2() {
  return b.useContext(Dx);
}
function l2(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: a,
    onMapChange: c
  } = n, f = Ke(c), [, d] = b.useState(!1), h = Ol(i2).current, g = Ol(o2).current, p = b.useRef(0), y = b.useRef(!0), v = b.useRef([]), x = b.useRef(null), C = Ke(() => {
    y.current || (y.current = !0, d((I) => !I));
  }), _ = Ke((I, Y) => {
    g.set(I, Y), C();
  }), T = Ke((I) => {
    g.delete(I), C();
  }), N = Ke((I) => {
    const Y = /* @__PURE__ */ new Map();
    return r.current.length = 0, a && (a.current.length = 0), I.forEach((B) => {
      Y.set(B.element, {
        ...B.registration.metadata ?? {},
        index: B.index
      }), r.current[B.index] = B.element, a && (a.current[B.index] = B.registration.label !== void 0 ? B.registration.label : B.registration.textRef?.current?.textContent ?? B.element.textContent);
    }), p.current = r.current.length, Y;
  });
  function M(I) {
    if (x.current?.disconnect(), x.current = null, typeof MutationObserver != "function" || I.length < 2)
      return;
    const Y = new MutationObserver((L) => {
      if (!s2(L))
        return;
      let P = null;
      for (const J of I)
        if (J.isConnected) {
          if (P && jx(P, J) > 0) {
            Y.disconnect(), C();
            return;
          }
          P = J;
        }
    });
    x.current = Y;
    const B = /* @__PURE__ */ new Set();
    for (let L = 1; L < I.length; L += 1) {
      const P = a2(I[L - 1], I[L]);
      P && B.add(P);
    }
    B.forEach((L) => Y.observe(L, {
      childList: !0
    }));
  }
  const A = Ke(() => {
    const [I, Y] = r2(g), B = N(I);
    M(Y), v.current = I, y.current = !1, h.forEach((L) => L(B)), f(B);
  });
  Fe(() => (y.current || N(v.current), () => {
    r.current = [], a && (a.current = []);
  }), [r, a, N]), Fe(() => {
    y.current && A();
  }), Fe(() => () => {
    x.current?.disconnect(), y.current = !0;
  }, []);
  const w = Ke((I) => (h.add(I), () => {
    h.delete(I);
  })), z = b.useMemo(() => ({
    register: _,
    unregister: T,
    subscribeMapChange: w,
    nextIndexRef: p
  }), [_, T, w, p]);
  return /* @__PURE__ */ S.jsx(Dx.Provider, {
    value: z,
    children: o
  });
}
function o2() {
  return /* @__PURE__ */ new Map();
}
function i2() {
  return /* @__PURE__ */ new Set();
}
function r2(n) {
  const o = /* @__PURE__ */ new Set(), r = [], a = [];
  n.forEach((f, d) => {
    if (!d.isConnected)
      return;
    const h = f.index, g = {
      index: h ?? -1,
      element: d,
      registration: f
    };
    h === null ? a.push(g) : h >= 0 && (o.add(h), r.push(g));
  });
  let c = 0;
  return a.sort((f, d) => jx(f.element, d.element)), a.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, a.map((f) => f.element)];
}
function a2(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function s2(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function jx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function c2(n, o) {
  return function(a, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", a.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${a}; visit ${f} for the full message.`;
  };
}
const yo = c2("https://base-ui.com/production-error", "Base UI");
function ir(n, o, r, a) {
  const c = Ol(Lx).current;
  return f2(c, n, o, r, a) && Vx(c, [n, o, r, a]), c.callback;
}
function u2(n) {
  const o = Ol(Lx).current;
  return d2(o, n) && Vx(o, n), o.callback;
}
function Lx() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function f2(n, o, r, a, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== a || n.refs[3] !== c;
}
function d2(n, o) {
  return n.refs.length !== o.length || n.refs.some((r, a) => r !== o[a]);
}
function Vx(n, o) {
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
const p2 = parseInt(b.version, 10);
function ah(n) {
  return p2 >= n;
}
function Py(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (ah(19) ? r?.ref : o.ref) ?? null;
}
function wp(n, o) {
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
function $t() {
}
const ea = Object.freeze([]), hl = Object.freeze({});
function h2(n, o) {
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
function m2(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function g2(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const sh = {};
function la(n, o, r, a, c) {
  if (!r && !a && !c && !n)
    return Jc(o);
  let f = Jc(n);
  return o && (f = os(f, o)), r && (f = os(f, r)), a && (f = os(f, a)), c && (f = os(f, c)), f;
}
function b2(n) {
  if (n.length === 0)
    return sh;
  if (n.length === 1)
    return Jc(n[0]);
  let o = Jc(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = os(o, n[r]);
  return o;
}
function Jc(n) {
  return ch(n) ? {
    ...Hx(n, sh)
  } : y2(n);
}
function os(n, o) {
  return ch(o) ? Hx(o, n) : v2(n, o);
}
function y2(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const a = o[r];
    Ix(r, a) && (o[r] = Ux(a));
  }
  return o;
}
function v2(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const a = o[r];
    switch (r) {
      case "style": {
        n[r] = wp(n.style, a);
        break;
      }
      case "className": {
        n[r] = Bx(n.className, a);
        break;
      }
      default:
        Ix(r, a) ? n[r] = x2(n[r], a) : n[r] = a;
    }
  }
  return n;
}
function Ix(n, o) {
  const r = n.charCodeAt(0), a = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && a === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function ch(n) {
  return typeof n == "function";
}
function Hx(n, o) {
  return ch(n) ? n(o) : n ?? sh;
}
function x2(n, o) {
  return o ? n ? (...r) => {
    const a = r[0];
    if (Gx(a)) {
      const f = a;
      Wc(f);
      const d = o(...r);
      return f.baseUIHandlerPrevented || n?.(...r), d;
    }
    const c = o(...r);
    return n?.(...r), c;
  } : Ux(o) : n;
}
function Ux(n) {
  return n && ((...o) => {
    const r = o[0];
    return Gx(r) && Wc(r), n(...o);
  });
}
function Wc(n) {
  return n.preventBaseUIHandler = () => {
    n.baseUIHandlerPrevented = !0;
  }, n;
}
function Bx(n, o) {
  return o ? n ? o + " " + n : o : n;
}
function Gx(n) {
  return n != null && typeof n == "object" && "nativeEvent" in n;
}
function Kl(n, o, r = {}) {
  const a = o.render, c = S2(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? hl;
  return R2(n, a, c, f);
}
function S2(n, o = {}) {
  const {
    className: r,
    style: a,
    render: c
  } = n, {
    state: f = hl,
    ref: d,
    props: h,
    stateAttributesMapping: g,
    enabled: p = !0
  } = o, y = p ? m2(r, f) : void 0, v = p ? g2(a, f) : void 0, x = p ? h2(f, g) : hl, C = p && h ? E2(h) : void 0, _ = p ? wp(x, C) ?? {} : hl;
  return typeof document < "u" && (p ? Array.isArray(d) ? _.ref = u2([_.ref, Py(c), ...d]) : _.ref = ir(_.ref, Py(c), d) : ir(null, null)), p ? (y !== void 0 && (_.className = Bx(_.className, y)), v !== void 0 && (_.style = wp(_.style, v)), _) : hl;
}
function E2(n) {
  return Array.isArray(n) ? b2(n) : la(void 0, n);
}
const C2 = /* @__PURE__ */ Symbol.for("react.lazy");
function R2(n, o, r, a) {
  if (o) {
    if (typeof o == "function")
      return o(r, a);
    const c = la(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === C2 && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return w2(n, r);
  throw new Error(yo(8));
}
function w2(n, o) {
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
let Xy = 0;
function _2(n, o = "mui") {
  const [r, a] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (Xy += 1, a(`${o}-${Xy}`));
  }, [r, o]), c;
}
const Ky = rh.useId;
function uh(n, o) {
  if (Ky !== void 0) {
    const r = Ky();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return _2(n, o);
}
function gu(n) {
  return uh(n, "base-ui");
}
const Yl = "none", Yx = "trigger-press", A2 = "trigger-hover", fh = "outside-press", M2 = "item-press", T2 = "close-press", Fy = "clear-press", rs = "input-change", mo = "input-clear", O2 = "input-press", bu = "focus-out", dh = "escape-key", _p = "list-navigation", ph = "keyboard", hh = "pointer", N2 = "cancel-open";
function Ct(n, o, r, a) {
  let c = !1, f = !1;
  const d = hl;
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
function z2(n, o, r) {
  const a = r ?? hl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...a
  };
}
function qx(n) {
  b.useEffect(n, ea);
}
const Nc = null;
class k2 {
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
let zc = new k2();
class go {
  static create() {
    return new go();
  }
  static request(o) {
    return zc.request(o);
  }
  static cancel(o) {
    return zc.cancel(o);
  }
  currentId = Nc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = zc.request(() => {
      this.currentId = Nc, o();
    });
  }
  cancel = () => {
    this.currentId !== Nc && (zc.cancel(this.currentId), this.currentId = Nc);
  };
  disposeEffect = () => this.cancel;
}
function ss() {
  const n = Ol(go.create).current;
  return qx(n.disposeEffect), n;
}
function mh(n, o = !1, r = !1) {
  const [a, c] = b.useState(n && o ? "idle" : void 0), [f, d] = b.useState(n);
  return n && !f && (d(!0), c("starting")), !n && f && a !== "ending" && !r && c("ending"), !n && !f && a === "ending" && c(void 0), Fe(() => {
    if (!n && f && a !== "ending" && r) {
      const h = go.request(() => {
        c("ending");
      });
      return () => {
        go.cancel(h);
      };
    }
  }, [n, f, a, r]), Fe(() => {
    if (!n || o)
      return;
    const h = go.request(() => {
      c(void 0);
    });
    return () => {
      go.cancel(h);
    };
  }, [o, n]), Fe(() => {
    if (!n || !o)
      return;
    n && f && a !== "idle" && c("starting");
    const h = go.request(() => {
      c("idle");
    });
    return () => {
      go.cancel(h);
    };
  }, [o, n, f, a]), {
    mounted: f,
    setMounted: d,
    transitionStatus: a
  };
}
function D2(n = {}) {
  const {
    guess: o,
    label: r,
    metadata: a,
    textRef: c,
    index: f
  } = n, {
    register: d,
    unregister: h,
    subscribeMapChange: g,
    nextIndexRef: p
  } = n2(), y = b.useRef(-1), [v, x] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const N = p.current;
      p.current += 1, y.current = N;
    }
    return y.current;
  } : -1), C = f ?? v, _ = b.useRef(null), T = b.useCallback((N) => {
    const M = _.current;
    M && h(M), _.current = N, N && d(N, {
      metadata: a ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, h, a, r, c]);
  return Fe(() => {
    if (f == null)
      return g((N) => {
        const M = _.current ? N.get(_.current)?.index : null;
        M != null && x(M);
      });
  }, [f, g]), {
    ref: T,
    index: C
  };
}
let Qy = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const j2 = {
  "data-starting-style": ""
}, L2 = {
  "data-ending-style": ""
}, yu = {
  transitionStatus(n) {
    return n === "starting" ? j2 : n === "ending" ? L2 : null;
  }
}, V2 = /* @__PURE__ */ b.createContext(void 0);
function I2(n = !1) {
  const o = b.useContext(V2);
  if (o === void 0 && !n)
    throw new Error(yo(16));
  return o;
}
function H2(n) {
  const {
    focusableWhenDisabled: o,
    disabled: r,
    composite: a = !1,
    tabIndex: c = 0,
    isNativeButton: f
  } = n, d = a && o !== !1, h = a && o === !1;
  return {
    props: b.useMemo(() => {
      const p = {
        // allow Tabbing away from focusableWhenDisabled elements
        onKeyDown(y) {
          r && o && y.key !== "Tab" && y.preventDefault();
        }
      };
      return a || (p.tabIndex = c, !f && r && (p.tabIndex = o ? c : -1)), (f && (o || d) || !f && r) && (p["aria-disabled"] = r), f && (!o || h) && (p.disabled = r), p;
    }, [a, r, o, d, h, f, c])
  };
}
function tn(n) {
  return n?.ownerDocument || document;
}
function Pc(n, o, {
  detail: r = 0
} = {}) {
  n.dispatchEvent(new (mn(n)).PointerEvent("click", {
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
function Ss(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: a = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), h = I2(!0), g = f ?? h !== void 0, {
    props: p
  } = H2({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: a,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const C = d.current;
    qd(C) && g && o && p.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [o, p.disabled, g]);
  Fe(y, [y]);
  const v = b.useCallback((C = {}) => {
    const {
      onClick: _,
      onMouseDown: T,
      onKeyUp: N,
      onKeyDown: M,
      onPointerDown: A,
      ...w
    } = C;
    return la({
      onClick(z) {
        if (o) {
          z.preventDefault();
          return;
        }
        _?.(z);
      },
      onMouseDown(z) {
        o || T?.(z);
      },
      onKeyDown(z) {
        if (o || (Wc(z), M?.(z), z.baseUIHandlerPrevented))
          return;
        const I = z.target === z.currentTarget, Y = z.currentTarget, B = qd(Y), L = !c && U2(Y), P = I && (c ? B : !L), J = z.key === "Enter", ae = z.key === " ", ue = Y.getAttribute("role"), ee = ue?.startsWith("menuitem") || ue === "option" || ue === "gridcell";
        if (I && g && ae) {
          if (z.defaultPrevented && ee)
            return;
          z.preventDefault(), (!c || B) && (z.preventBaseUIHandler(), Pc(Y, z));
          return;
        }
        if (!P || c || !ae && !J) {
          I && L && ae && z.preventDefault();
          return;
        }
        z.defaultPrevented || (z.preventDefault(), J && (z.preventBaseUIHandler(), Pc(Y, z)));
      },
      onKeyUp(z) {
        if (!o) {
          if (Wc(z), N?.(z), z.target === z.currentTarget && c && g && qd(z.currentTarget) && z.key === " ") {
            z.preventDefault();
            return;
          }
          z.baseUIHandlerPrevented || z.target === z.currentTarget && !c && !g && !z.defaultPrevented && z.key === " " && (z.preventBaseUIHandler(), Pc(z.currentTarget, z));
        }
      },
      onPointerDown(z) {
        if (o) {
          z.preventDefault();
          return;
        }
        A?.(z);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, p, w);
  }, [o, p, g, c]), x = Ke((C) => {
    d.current = C, y();
  });
  return {
    getButtonProps: v,
    buttonRef: x
  };
}
function qd(n) {
  return Jt(n) && n.tagName === "BUTTON";
}
function U2(n) {
  return Jt(n) && n.tagName === "A" && !!n.href;
}
function Kt(n, o, r, a) {
  return n.addEventListener(o, r, a), () => {
    n.removeEventListener(o, r, a);
  };
}
function pl(n) {
  const o = Ol(B2, n).current;
  return o.next = n, Fe(o.effect), o;
}
function B2(n) {
  const o = {
    current: n,
    next: n,
    effect: () => {
      o.current = o.next;
    }
  };
  return o;
}
function Vo(n) {
  return n == null ? n : "current" in n ? n.current : n;
}
function G2(n, o = !1) {
  const r = ss();
  return Ke((a, c = null) => {
    r.cancel();
    const f = Vo(n);
    if (f == null)
      return;
    const d = f, h = () => {
      sa.flushSync(a);
    };
    if (typeof d.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      a();
      return;
    }
    function g() {
      Promise.all(d.getAnimations().map((p) => p.finished)).then(() => {
        c?.aborted || h();
      }, () => {
        if (c?.aborted)
          return;
        if (d.getAnimations().some((y) => y.pending || y.playState !== "finished")) {
          g();
          return;
        }
        h();
      });
    }
    if (o) {
      const p = "data-starting-style";
      if (!d.hasAttribute(p)) {
        r.request(g);
        return;
      }
      const y = new MutationObserver(() => {
        d.hasAttribute(p) || (y.disconnect(), g());
      });
      y.observe(d, {
        attributes: !0,
        attributeFilter: [p]
      }), c?.addEventListener("abort", () => y.disconnect(), {
        once: !0
      });
      return;
    }
    r.request(g);
  });
}
function vu(n) {
  const {
    enabled: o = !0,
    open: r,
    ref: a,
    onComplete: c
  } = n, f = Ke(c), d = G2(a, r);
  b.useEffect(() => {
    if (!o)
      return;
    const h = new AbortController();
    return d(f, h.signal), () => {
      h.abort();
    };
  }, [o, r, f, d]);
}
function Y2() {
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
  userAgent: q2,
  platform: P2,
  maxTouchPoints: X2
} = Y2(), xu = q2.toLowerCase(), cs = P2.toLowerCase(), Es = /^i(os$|p)/.test(cs) || cs === "macintel" && X2 > 1, Zy = "android", eu = cs === Zy || xu.includes(Zy), K2 = !Es && cs.startsWith("mac");
cs.startsWith("win");
const F2 = K2 || Es, hr = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), $y = !hr && xu.includes("firefox");
!hr && xu.includes("chrom");
const Q2 = F2, Px = /jsdom|happydom/.test(xu), es = 0;
class rr {
  static create() {
    return new rr();
  }
  currentId = es;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(o, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = es, r();
    }, o);
  }
  isStarted() {
    return this.currentId !== es;
  }
  clear = () => {
    this.currentId !== es && (clearTimeout(this.currentId), this.currentId = es);
  };
  disposeEffect = () => this.clear;
}
function wi() {
  const n = Ol(rr.create).current;
  return qx(n.disposeEffect), n;
}
let Jy = {}, Wy = {}, ev = "";
function Su(n, o) {
  return ys(n) ? n : o;
}
function tv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(Su(o, r)).overflowY);
}
function Z2(n) {
  if (typeof document > "u")
    return !1;
  const o = tn(n);
  return mn(o).innerWidth - o.documentElement.clientWidth > 0;
}
function $2(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = tn(n), a = r.documentElement, c = r.body, f = Su(a, c), d = f.style.overflowY, h = a.style.scrollbarGutter;
  a.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const p = f.offsetWidth;
  return f.style.overflowY = d, a.style.scrollbarGutter = h, g === p;
}
function J2(n) {
  const o = tn(n), r = o.documentElement, a = o.body, c = Su(r, a), f = {
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
function W2(n) {
  const o = tn(n), r = o.documentElement, a = o.body, c = mn(r);
  let f = 0, d = 0, h = !1;
  const g = go.create();
  if (hr && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function p() {
    const C = c.getComputedStyle(r), _ = c.getComputedStyle(a), M = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, Jy = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, ev = r.style.scrollBehavior, Wy = {
      position: a.style.position,
      height: a.style.height,
      width: a.style.width,
      boxSizing: a.style.boxSizing,
      overflowY: a.style.overflowY,
      overflowX: a.style.overflowX,
      scrollBehavior: a.style.scrollBehavior
    };
    const A = r.scrollHeight > r.clientHeight, w = r.scrollWidth > r.clientWidth, z = C.overflowY === "scroll" || _.overflowY === "scroll", I = C.overflowX === "scroll" || _.overflowX === "scroll", Y = Math.max(0, c.innerWidth - a.clientWidth), B = Math.max(0, c.innerHeight - a.clientHeight), L = parseFloat(_.marginTop) + parseFloat(_.marginBottom), P = parseFloat(_.marginLeft) + parseFloat(_.marginRight), J = Su(r, a);
    if (h = $2(n), h) {
      r.style.scrollbarGutter = M, J.style.overflowY = "hidden", J.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: M,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (A || z) && (r.style.overflowY = "scroll"), (w || I) && (r.style.overflowX = "scroll"), Object.assign(a.style, {
      position: "relative",
      height: L || B ? `calc(100dvh - ${L + B}px)` : "100dvh",
      width: P || Y ? `calc(100vw - ${P + Y}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), a.scrollTop = f, a.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function y() {
    Object.assign(r.style, Jy), Object.assign(a.style, Wy), h || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = ev);
  }
  function v() {
    y(), g.request(p);
  }
  p();
  const x = Kt(c, "resize", v);
  return () => {
    g.cancel(), y(), typeof c.removeEventListener == "function" && x();
  };
}
class eM {
  lockCount = 0;
  restore = null;
  timeoutLock = rr.create();
  timeoutUnlock = rr.create();
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
    const r = tn(o), a = r.documentElement, c = r.body, f = mn(a);
    if (tv(f, a, c)) {
      const h = new f.MutationObserver(() => {
        tv(f, a, c) || (h.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      h.observe(a, g), h.observe(c, g), this.restore = () => h.disconnect();
      return;
    }
    const d = Es || !Z2(o);
    this.restore = d ? J2(o) : W2(o);
  }
}
const tM = new eM();
function nM(n = !0, o = null) {
  Fe(() => {
    if (n)
      return tM.acquire(o);
  }, [n, o]);
}
function kn(n) {
  n.preventDefault(), n.stopPropagation();
}
function lM(n) {
  return "nativeEvent" in n;
}
function Xx(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : eu && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function gh(n) {
  return Px ? !1 : !eu && n.width === 0 && n.height === 0 || eu && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function Pd(n, o) {
  return ["mouse", "pen"].includes(n);
}
function oM(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const Ap = "data-base-ui-focusable", iM = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", tr = "ArrowLeft", nr = "ArrowRight", bh = "ArrowUp", Eu = "ArrowDown";
function Gl(n) {
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
  if (r && ra(r)) {
    let a = o;
    for (; a; ) {
      if (n === a)
        return !0;
      a = a.parentNode || a.host;
    }
  }
  return !1;
}
function Tl(n) {
  return "composedPath" in n ? n.composedPath()[0] : n.target;
}
function Xd(n, o) {
  if (o == null)
    return !1;
  if ("composedPath" in n)
    return n.composedPath().includes(o);
  const r = n;
  return r.target != null && o.contains(r.target);
}
function rM(n) {
  return n.matches("html,body");
}
function yh(n) {
  return Jt(n) && n.matches(iM);
}
function Mp(n) {
  return n ? n.getAttribute("role") === "combobox" && yh(n) : !1;
}
function Tp(n) {
  return n ? n.hasAttribute(Ap) ? n : n.querySelector(`[${Ap}]`) || n : null;
}
function oa(...n) {
  return () => {
    for (let o = 0; o < n.length; o += 1) {
      const r = n[o];
      r && r();
    }
  };
}
const Kx = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, vh = {
  ...Kx,
  position: "fixed",
  top: 0,
  left: 0
}, xh = {
  ...Kx,
  position: "absolute"
}, tu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [a, c] = b.useState();
  Fe(() => {
    Q2 && hr && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: a
  };
  return /* @__PURE__ */ S.jsx("span", {
    ...o,
    ref: r,
    style: vh,
    "aria-hidden": a ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function kc(n, o, r) {
  return Math.floor(n / o) !== r;
}
function us(n, o) {
  return o < 0 || o >= n.length;
}
function Kd(n, o) {
  return el(n.current, {
    disabledIndices: o
  });
}
function nv(n, o) {
  return el(n.current, {
    decrement: !0,
    startingIndex: n.current.length,
    disabledIndices: o
  });
}
function el(n, {
  startingIndex: o = -1,
  decrement: r = !1,
  disabledIndices: a,
  amount: c = 1
} = {}) {
  let f = o;
  do
    f += r ? -c : c;
  while (f >= 0 && f <= n.length - 1 && nu(n, f, a));
  return f;
}
function aM(n, {
  event: o,
  orientation: r,
  loopFocus: a,
  onLoop: c,
  rtl: f,
  cols: d,
  disabledIndices: h,
  minIndex: g,
  maxIndex: p,
  prevIndex: y,
  stopEvent: v = !1
}) {
  let x = y, C;
  if (o.key === bh ? C = "up" : o.key === Eu && (C = "down"), C) {
    const _ = [], T = [];
    let N = !1, M = 0;
    {
      let P = null, J = -1;
      n.forEach((ae, ue) => {
        if (ae == null)
          return;
        M += 1;
        const ee = ae.closest('[role="row"]');
        ee && (N = !0), (ee !== P || J === -1) && (P = ee, J += 1, _[J] = []), _[J].push(ue), T[ue] = J;
      });
    }
    let A = !1, w = 0;
    if (N)
      for (const P of _) {
        const J = P.length;
        J > w && (w = J), J !== d && (A = !0);
      }
    const z = A && M < n.length, I = w || d, Y = (P) => {
      if (!A || y === -1)
        return;
      const J = T[y];
      if (J == null)
        return;
      const ae = _[J].indexOf(y), ue = P === "up" ? -1 : 1;
      for (let ee = J + ue, de = 0; de < _.length; de += 1, ee += ue) {
        if (ee < 0 || ee >= _.length) {
          if (!a || z)
            return;
          if (ee = ee < 0 ? _.length - 1 : 0, c) {
            const V = Math.min(ae, _[ee].length - 1), H = _[ee][V] ?? _[ee][0], K = c(o, y, H);
            ee = T[K] ?? ee;
          }
        }
        const ye = _[ee];
        for (let V = Math.min(ae, ye.length - 1); V >= 0; V -= 1) {
          const H = ye[V];
          if (!nu(n, H, h))
            return H;
        }
      }
    }, B = (P) => {
      if (!z || y === -1)
        return;
      const J = y % I, ae = P === "up" ? -I : I, ue = p - p % I, ee = Wi(p / I) + 1;
      for (let de = y - J + ae, ye = 0; ye < ee; ye += 1, de += ae) {
        if (de < 0 || de > p) {
          if (!a)
            return;
          de = de < 0 ? ue : 0;
        }
        const V = Math.min(de + I - 1, p);
        for (let H = Math.min(de + J, V); H >= de; H -= 1)
          if (!nu(n, H, h))
            return H;
      }
    };
    v && kn(o);
    const L = Y(C) ?? B(C);
    if (L !== void 0)
      x = L;
    else if (y === -1)
      x = C === "up" ? p : g;
    else if (x = el(n, {
      startingIndex: y,
      amount: I,
      decrement: C === "up",
      disabledIndices: h
    }), a) {
      if (C === "up" && (y - I < g || x < 0)) {
        const P = y % I, J = p % I, ae = p - (J - P);
        J === P ? x = p : x = J > P ? ae : ae - I, c && (x = c(o, y, x));
      }
      C === "down" && y + I > p && (x = el(n, {
        startingIndex: y % I - I,
        amount: I,
        disabledIndices: h
      }), c && (x = c(o, y, x)));
    }
    us(n, x) && (x = y);
  }
  if (r === "both") {
    const _ = Wi(y / d);
    o.key === (f ? tr : nr) && (v && kn(o), y % d !== d - 1 ? (x = el(n, {
      startingIndex: y,
      disabledIndices: h
    }), a && kc(x, d, _) && (x = el(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: h
    }), c && (x = c(o, y, x)))) : a && (x = el(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: h
    }), c && (x = c(o, y, x))), kc(x, d, _) && (x = y)), o.key === (f ? nr : tr) && (v && kn(o), y % d !== 0 ? (x = el(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: h
    }), a && kc(x, d, _) && (x = el(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: h
    }), c && (x = c(o, y, x)))) : a && (x = el(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: h
    }), c && (x = c(o, y, x))), kc(x, d, _) && (x = y));
    const T = Wi(p / d) === _;
    us(n, x) && (a && T ? (x = o.key === (f ? nr : tr) ? p : el(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: h
    }), c && (x = c(o, y, x))) : x = y);
  }
  return x;
}
function nu(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !Cu(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function sM(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function Cu(n, o = n ? ml(n) : null) {
  return !n || !n.isConnected || !o || sM(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const cM = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function uM(n) {
  const o = n.assignedSlot;
  if (o)
    return o;
  if (n.parentElement)
    return n.parentElement;
  const r = n.getRootNode();
  return ra(r) ? r.host : null;
}
function Op(n) {
  for (const o of Array.from(n.children))
    if (Bn(o) === "summary")
      return o;
  return null;
}
function fM(n, o) {
  const r = Op(o);
  return !!r && (n === r || at(r, n));
}
function Fx(n) {
  const o = n ? Bn(n) : "";
  return n != null && n.matches(cM) && (o !== "summary" || n.parentElement != null && Bn(n.parentElement) === "details" && Op(n.parentElement) === n) && (o !== "details" || Op(n) == null) && (o !== "input" || n.type !== "hidden");
}
function Qx(n) {
  if (!Fx(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = uM(o)) {
    const r = o !== n, a = Bn(o) === "slot";
    if (o.hasAttribute("inert") || r && Bn(o) === "details" && !o.open && !fM(n, o) || o.hasAttribute("hidden") || !a && !dM(o, r))
      return !1;
  }
  return !0;
}
function dM(n, o) {
  const r = ml(n);
  return o ? r.display !== "none" : Cu(n, r);
}
function Zx(n) {
  const o = n.tabIndex;
  if (o < 0) {
    const r = Bn(n);
    if (r === "details" || r === "audio" || r === "video" || Jt(n) && n.isContentEditable)
      return 0;
  }
  return o;
}
function Fd(n) {
  if (Bn(n) !== "input")
    return null;
  const o = n;
  return o.type === "radio" && o.name !== "" ? o : null;
}
function pM(n, o) {
  const r = Fd(n);
  if (!r)
    return !0;
  const a = o.find((c) => {
    const f = Fd(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return a ? a === r : o.find((c) => {
    const f = Fd(c);
    return f?.name === r.name && f.form === r.form;
  }) === r;
}
function $x(n) {
  if (Jt(n) && Bn(n) === "slot") {
    const o = n.assignedElements({
      flatten: !0
    });
    if (o.length > 0)
      return o;
  }
  return Jt(n) && n.shadowRoot ? Array.from(n.shadowRoot.children) : Array.from(n.children);
}
function Jx(n, o) {
  $x(n).forEach((r) => {
    Fx(r) && o.push(r), Jx(r, o);
  });
}
function Wx(n, o, r) {
  $x(n).forEach((a) => {
    Jt(a) && a.matches(o) && r.push(a), Wx(a, o, r);
  });
}
function Sh(n) {
  return Qx(n) && Zx(n) >= 0;
}
function e1(n) {
  const o = [];
  return Jx(n, o), o.filter(Qx);
}
function Ru(n) {
  const o = e1(n);
  return o.filter((r) => Zx(r) >= 0 && pM(r, o));
}
function t1(n, o) {
  const r = Ru(n), a = r.length;
  if (a === 0)
    return;
  const c = Gl(tn(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : a - 1 : f + o;
  return r[d];
}
function n1(n) {
  return t1(tn(n).body, 1) || n;
}
function l1(n) {
  return t1(tn(n).body, -1) || n;
}
function as(n, o) {
  const r = o || n.currentTarget, a = n.relatedTarget;
  return !a || !at(r, a);
}
function hM(n) {
  Ru(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function lv(n) {
  const o = [];
  Wx(n, "[data-tabindex]", o), o.forEach((r) => {
    const a = r.dataset.tabindex;
    delete r.dataset.tabindex, a ? r.setAttribute("tabindex", a) : r.removeAttribute("tabindex");
  });
}
function fs(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...fs(n, c.id, r)]);
}
function ov(n, o) {
  let r = [], a = n.find((c) => c.id === o)?.parentId;
  for (; a; ) {
    const c = n.find((f) => f.id === a);
    a = c?.parentId, c && (r = r.concat(c));
  }
  return r;
}
function lu(n) {
  return `data-base-ui-${n}`;
}
let Dc = 0;
function Xc(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: a = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(Dc);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (a)
    return f(), $t;
  const d = requestAnimationFrame(f);
  return Dc = d, () => {
    Dc === d && (cancelAnimationFrame(d), Dc = 0);
  };
}
const Qd = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, iv = "data-base-ui-inert", Np = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let ts = /* @__PURE__ */ new WeakMap(), Zd = 0;
function mM(n) {
  return Np[n];
}
function o1(n) {
  return n ? ra(n) ? n.host : o1(n.parentNode) : null;
}
const rv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const a = o1(r);
  return n.contains(a) ? a : null;
}).filter((r) => r != null), av = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let a = r;
    for (; a && !o.has(a); )
      o.add(a), a = a.parentNode;
  }), o;
}, sv = (n, o, r) => {
  const a = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      Bn(d) !== "script" && (o.has(d) ? c(d) : a.push(d));
    });
  };
  return c(n), a;
};
function gM(n, o, r, a, {
  mark: c = !0
}) {
  let f = null;
  a ? f = "inert" : r && (f = "aria-hidden");
  let d = null, h = null;
  const g = rv(o, n), p = c ? sv(o, av(g), new Set(g)) : [], y = [], v = [];
  if (f) {
    const x = Qd[f], C = mM(f);
    h = C, d = x;
    const _ = rv(o, Array.from(o.querySelectorAll("[aria-live]"))), T = g.concat(_);
    sv(o, av(T), new Set(T)).forEach((M) => {
      const A = M.getAttribute(f), w = A !== null && A !== "false", z = (x.get(M) || 0) + 1;
      x.set(M, z), y.push(M), z === 1 && w && C.add(M), w || M.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && p.forEach((x) => {
    const C = (ts.get(x) || 0) + 1;
    ts.set(x, C), v.push(x), C === 1 && x.setAttribute(iv, "");
  }), Zd += 1, () => {
    d && y.forEach((x) => {
      const _ = (d.get(x) || 0) - 1;
      d.set(x, _), _ || (!h?.has(x) && f && x.removeAttribute(f), h?.delete(x));
    }), c && v.forEach((x) => {
      const C = (ts.get(x) || 0) - 1;
      ts.set(x, C), C || x.removeAttribute(iv);
    }), Zd -= 1, Zd || (Qd.inert = /* @__PURE__ */ new WeakMap(), Qd["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Np.inert = /* @__PURE__ */ new WeakSet(), Np["aria-hidden"] = /* @__PURE__ */ new WeakSet(), ts = /* @__PURE__ */ new WeakMap());
  };
}
function cv(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: a = !1,
    mark: c = !0
  } = o, f = tn(n[0]).body;
  return gM(n, f, r, a, {
    mark: c
  });
}
const bM = {
  style: {
    transition: "none"
  }
}, yM = "data-base-ui-click-trigger", vM = {
  fallbackAxisSide: "none"
}, xM = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, i1 = /* @__PURE__ */ b.createContext(null), r1 = () => b.useContext(i1), SM = lu("portal");
function EM(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: a = hl,
    elementProps: c
  } = n, f = uh(), h = r1()?.portalNode, [g, p] = b.useState(null), [y, v] = b.useState(null), x = Ke((N) => {
    N !== null && v(N);
  }), C = b.useRef(null);
  Fe(() => {
    if (r === null) {
      C.current && (C.current = null, v(null), p(null));
      return;
    }
    const N = (r && (Zp(r) ? r : r.current)) ?? h ?? document.body;
    if (N == null) {
      C.current && (C.current = null, v(null), p(null));
      return;
    }
    C.current !== N && (C.current = N, v(null), p(N));
  }, [r, h]);
  const _ = Kl("div", a, {
    ref: [o, x],
    props: [{
      id: f,
      [SM]: ""
    }, c]
  }), T = g && _ ? /* @__PURE__ */ sa.createPortal(_, g) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(_) ? _.props.id : void 0,
    subtree: T
  };
}
const CM = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    container: h,
    ...g
  } = o, {
    node: p,
    nodeId: y,
    subtree: v
  } = EM({
    container: h,
    ref: r,
    componentProps: o,
    elementProps: g
  }), x = b.useRef(null), C = b.useRef(null), _ = b.useRef(null), T = b.useRef(null), [N, M] = b.useState(null), A = b.useRef(!1), w = N?.modal, z = N?.open, I = !!N && !N.modal && N.open && !!p;
  b.useEffect(() => {
    if (!p || w)
      return;
    function B(L) {
      p && L.relatedTarget && as(L) && (L.type === "focusin" ? A.current && (lv(p), A.current = !1) : (hM(p), A.current = !0));
    }
    return oa(Kt(p, "focusin", B, !0), Kt(p, "focusout", B, !0));
  }, [p, w]), Fe(() => {
    !p || z !== !0 || !A.current || (lv(p), A.current = !1);
  }, [z, p]);
  const Y = b.useMemo(() => ({
    beforeOutsideRef: x,
    afterOutsideRef: C,
    beforeInsideRef: _,
    afterInsideRef: T,
    portalNode: p,
    setFocusManagerState: M
  }), [p]);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [v, /* @__PURE__ */ S.jsxs(i1.Provider, {
      value: Y,
      children: [I && p && /* @__PURE__ */ S.jsx(tu, {
        "data-type": "outside",
        ref: x,
        onFocus: (B) => {
          if (as(B, p))
            _.current?.focus();
          else {
            const L = N ? N.domReference : null;
            l1(L)?.focus();
          }
        }
      }), I && p && /* @__PURE__ */ S.jsx("span", {
        "aria-owns": y,
        style: xM
      }), p && /* @__PURE__ */ sa.createPortal(d, p), I && p && /* @__PURE__ */ S.jsx(tu, {
        "data-type": "outside",
        ref: C,
        onFocus: (B) => {
          if (as(B, p))
            T.current?.focus();
          else {
            const L = N ? N.domReference : null;
            n1(L)?.focus(), N?.closeOnFocusOut && N?.onOpenChange(!1, Ct(bu, B.nativeEvent));
          }
        }
      })]
    })]
  });
});
function RM() {
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
const wM = /* @__PURE__ */ b.createContext(null), _M = /* @__PURE__ */ b.createContext(null), a1 = () => b.useContext(wM)?.id || null, wu = (n) => {
  const o = b.useContext(_M);
  return n ?? o;
};
function AM(n, o) {
  const r = mn(Tl(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const uv = 20;
let vi = [];
function Eh() {
  vi = vi.filter((n) => n.deref()?.isConnected);
}
function fv(n) {
  Eh(), n && Bn(n) !== "body" && (vi.push(new WeakRef(n)), vi.length > uv && (vi = vi.slice(-uv)));
}
function dv() {
  return Eh(), vi[vi.length - 1]?.deref();
}
function MM(n) {
  return n ? Sh(n) ? n : Ru(n)[0] || n : null;
}
function pv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = e1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return Sh(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), a = n.getAttribute("tabindex");
  r.length === 0 ? a !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (a !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function TM(n) {
  const {
    context: o,
    children: r,
    disabled: a = !1,
    initialFocus: c = !0,
    returnFocus: f = !0,
    restoreFocus: d = !1,
    modal: h = !0,
    closeOnFocusOut: g = !0,
    openInteractionType: p = "",
    nextFocusableElement: y,
    previousFocusableElement: v,
    beforeContentFocusGuardRef: x,
    externalTree: C,
    getInsideElements: _
  } = n, T = "rootStore" in o ? o.rootStore : o, N = T.useState("open"), M = T.useState("domReferenceElement"), A = T.useState("floatingElement"), {
    events: w,
    dataRef: z
  } = T.context, I = Ke(() => z.current.floatingContext?.nodeId), Y = c === !1, B = Mp(M) && Y, L = pl(c), P = pl(f), J = pl(p), ae = pl(N), ue = wu(C), ee = r1(), de = b.useRef(!1), ye = b.useRef(!1), V = b.useRef(!1), H = b.useRef(null), K = b.useRef(""), Se = b.useRef(""), ie = b.useRef(null), k = b.useRef(null), X = ir(ie, x, ee?.beforeInsideRef), W = ir(k, ee?.afterInsideRef), te = wi(), ge = wi(), Ae = ss(), qe = ee != null, Te = Tp(A), Oe = Ke((ke = Te) => ke ? Ru(ke) : []), it = Ke(() => _?.().filter((ke) => ke != null) ?? []);
  b.useEffect(() => {
    if (a || !h)
      return;
    function ke(ze) {
      ze.key === "Tab" && at(Te, Gl(tn(Te))) && Oe().length === 0 && !B && kn(ze);
    }
    const et = tn(Te);
    return Kt(et, "keydown", ke);
  }, [a, Te, h, B, Oe]), b.useEffect(() => {
    if (a || !N)
      return;
    const ke = tn(Te);
    function et() {
      V.current = !1;
    }
    function ze(He) {
      const Me = Tl(He), Qe = it(), Ne = at(A, Me) || at(M, Me) || at(ee?.portalNode, Me) || Qe.some(($e) => $e === Me || at($e, Me));
      V.current = !Ne, Se.current = He.pointerType || "keyboard", Me?.closest(`[${yM}]`) && (ye.current = !0, ge.start(0, () => {
        ye.current = !1;
      }));
    }
    function Le() {
      Se.current = "keyboard";
    }
    return oa(
      Kt(ke, "pointerdown", ze, !0),
      Kt(ke, "pointerup", et, !0),
      Kt(ke, "pointercancel", et, !0),
      Kt(ke, "keydown", Le, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      et
    );
  }, [a, A, M, Te, N, ee, ge, it]), b.useEffect(() => {
    if (a || !g)
      return;
    const ke = tn(Te);
    function et() {
      ye.current = !0, ge.start(0, () => {
        ye.current = !1;
      });
    }
    function ze(Qe) {
      const Ne = Tl(Qe);
      Sh(Ne) && (H.current = Ne);
    }
    function Le(Qe) {
      const Ne = Qe.relatedTarget, $e = Qe.currentTarget, tt = Tl(Qe);
      h && Ne == null && tt != null && at(A, tt) && fv(tt), queueMicrotask(() => {
        const Xe = I(), ve = T.context.triggerElements, F = it(), se = Ne?.hasAttribute(lu("focus-guard")) && [ie.current, k.current, ee?.beforeInsideRef.current, ee?.afterInsideRef.current, ee?.beforeOutsideRef.current, ee?.afterOutsideRef.current, Vo(v), Vo(y)].includes(Ne), Ie = !(at(M, Ne) || at(A, Ne) || at(Ne, A) || at(ee?.portalNode, Ne) || F.some((Re) => Re === Ne || at(Re, Ne)) || ve.hasMatchingElement((Re) => at(Re, Ne)) || se || ue && (fs(ue.nodesRef.current, Xe).find((Re) => at(Re.context?.elements.floating, Ne) || at(Re.context?.elements.domReference, Ne)) || ov(ue.nodesRef.current, Xe).find((Re) => [Re.context?.elements.floating, Tp(Re.context?.elements.floating)].includes(Ne) || Re.context?.elements.domReference === Ne)));
        if ($e === M && Te && pv(Te), d && $e !== M && !Cu(tt) && Gl(ke) === ke.body) {
          if (Jt(Te) && (Te.focus(), d === "popup")) {
            Ae.request(() => {
              Te.focus();
            });
            return;
          }
          const Re = Oe(), Ge = H.current, nt = (Ge && Re.includes(Ge) ? Ge : null) || Re[Re.length - 1] || Te;
          Jt(nt) && nt.focus();
        }
        if (z.current.insideReactTree) {
          z.current.insideReactTree = !1;
          return;
        }
        (B || !h) && Ne && Ie && !ye.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (B || Ne !== dv()) && (de.current = !0, T.setOpen(!1, Ct(bu, Qe)));
      });
    }
    function He() {
      V.current || (z.current.insideReactTree = !0, te.start(0, () => {
        z.current.insideReactTree = !1;
      }));
    }
    const Me = Jt(M) ? M : null;
    if (!(!A && !Me))
      return oa(Me && Kt(Me, "focusout", Le), Me && Kt(Me, "pointerdown", et), A && Kt(A, "focusin", ze), A && Kt(A, "focusout", Le), A && ee && Kt(A, "focusout", He, !0));
  }, [a, M, A, Te, h, ue, ee, T, g, d, Oe, B, I, z, te, ge, Ae, y, v, it]), b.useEffect(() => {
    if (a || !A || !N)
      return;
    const ke = Array.from(ee?.portalNode?.querySelectorAll(`[${lu("portal")}]`) || []), ze = (ue ? ov(ue.nodesRef.current, I()) : []).find(($e) => Mp($e.context?.elements.domReference || null))?.context?.elements.domReference, He = [...[A, ...ke, ie.current, k.current, ee?.beforeOutsideRef.current, ee?.afterOutsideRef.current, ...it()], ze, Vo(v), Vo(y), B ? M : null].filter(($e) => $e != null), Me = cv(He, {
      ariaHidden: h || B,
      mark: !1
    }), Qe = [A, ...ke].filter(($e) => $e != null), Ne = cv(Qe);
    return () => {
      Ne(), Me();
    };
  }, [N, a, M, A, h, ee, B, ue, I, y, v, it]), Fe(() => {
    if (!N || a || !Jt(Te))
      return;
    K.current = "", Se.current = "";
    const ke = tn(Te), et = Gl(ke);
    queueMicrotask(() => {
      const ze = L.current, Le = typeof ze == "function" ? ze(J.current || "") : ze;
      if (Le === void 0 || Le === !1 || at(Te, et))
        return;
      let Me = null;
      const Qe = () => (Me == null && (Me = Oe(Te)), Me[0] || Te);
      let Ne;
      Le === !0 || Le === null ? Ne = Qe() : Ne = Vo(Le), Ne = Ne || Qe();
      const $e = at(Te, Gl(ke));
      Xc(Ne, {
        preventScroll: Ne === Te,
        shouldFocus() {
          if (!ae.current)
            return !1;
          if ($e)
            return !0;
          const tt = Gl(ke);
          return !(tt !== Ne && at(Te, tt));
        }
      });
    });
  }, [a, N, Te, Oe, L, J, ae]), Fe(() => {
    if (a || !Te)
      return;
    const ke = tn(Te), et = Gl(ke), ze = J.current == null;
    fv(et);
    function Le(Me) {
      if (Me.open || (K.current = AM(Me.nativeEvent, Se.current)), Me.reason === A2 && Me.nativeEvent.type === "mouseleave" && (de.current = !0), Me.reason === fh)
        if (Me.nested)
          de.current = !1;
        else if (Xx(Me.nativeEvent) || gh(Me.nativeEvent))
          de.current = !1;
        else {
          let Qe = !1;
          tn(Te).createElement("div").focus({
            get preventScroll() {
              return Qe = !0, !1;
            }
          }), Qe ? de.current = !1 : de.current = !0;
        }
    }
    w.on("openchange", Le);
    function He(Me) {
      const Qe = P.current;
      let Ne = typeof Qe == "function" ? Qe(Me) : Qe;
      if (Ne === void 0 || Ne === !1)
        return null;
      Ne === null && (Ne = !0);
      const $e = M?.isConnected ? M : null, tt = et?.isConnected && Bn(et) !== "body" ? et : null;
      let Xe = ze ? tt || $e : $e || tt;
      return Xe || (Xe = dv() || null), typeof Ne == "boolean" ? Xe : Vo(Ne) || Xe || null;
    }
    return () => {
      w.off("openchange", Le);
      const Me = Gl(ke), Qe = it(), Ne = at(A, Me) || Qe.some((ve) => ve === Me || at(ve, Me)) || ue && fs(ue.nodesRef.current, I(), !1).some((ve) => at(ve.context?.elements.floating, Me)), $e = P.current, tt = K.current, Xe = He(tt);
      queueMicrotask(() => {
        const ve = MM(Xe), F = typeof $e != "boolean";
        if ($e && !de.current && Jt(ve) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!F && ve !== Me && Me !== ke.body) || Ne)) {
          const se = {
            preventScroll: !0
          };
          tt === "keyboard" && (se.focusVisible = !0), ve.focus(se);
        }
        de.current = !1;
      });
    };
  }, [a, A, Te, P, J, w, ue, M, I, it]), Fe(() => {
    if (!hr || N || !A)
      return;
    const ke = Gl(tn(A));
    !Jt(ke) || !yh(ke) || at(A, ke) && ke.blur();
  }, [N, A]), Fe(() => {
    if (!(a || !ee))
      return ee.setFocusManagerState({
        modal: h,
        closeOnFocusOut: g,
        open: N,
        onOpenChange: T.setOpen,
        domReference: M
      }), () => {
        ee.setFocusManagerState(null);
      };
  }, [a, ee, h, N, T, g, M]), Fe(() => {
    if (!(a || !Te))
      return pv(Te), () => {
        queueMicrotask(Eh);
      };
  }, [a, Te]);
  const bt = !a && (h ? !B : !0) && (qe || h);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [bt && /* @__PURE__ */ S.jsx(tu, {
      "data-type": "inside",
      ref: X,
      onFocus: (ke) => {
        if (h) {
          const et = Oe();
          Xc(et[et.length - 1]);
        } else ee?.portalNode && (de.current = !1, as(ke, ee.portalNode) ? n1(M)?.focus() : Vo(v ?? ee.beforeOutsideRef)?.focus());
      }
    }), r, bt && /* @__PURE__ */ S.jsx(tu, {
      "data-type": "inside",
      ref: W,
      onFocus: (ke) => {
        h ? Xc(Oe()[0]) : ee?.portalNode && (g && (de.current = !0), as(ke, ee.portalNode) ? l1(M)?.focus() : Vo(y ?? ee.afterOutsideRef)?.focus());
      }
    })]
  });
}
function s1(n, o = {}) {
  const {
    enabled: r = !0,
    event: a = "click",
    toggle: c = !0,
    ignoreMouse: f = !1,
    stickIfOpen: d = !0,
    touchOpenDelay: h = 0,
    reason: g = Yx
  } = o, p = "rootStore" in n ? n.rootStore : n, y = p.context.dataRef, v = b.useRef(void 0), x = ss(), C = wi(), _ = b.useMemo(() => {
    function T(M, A, w, z) {
      const I = Ct(g, A, w);
      M && z === "touch" && h > 0 ? C.start(h, () => {
        p.setOpen(!0, I);
      }) : p.setOpen(M, I);
    }
    function N(M, A, w) {
      const z = y.current.openEvent, I = p.select("domReferenceElement") !== A;
      return M && I || !M || !c ? !0 : z && d ? !w(z.type) : !1;
    }
    return {
      onPointerDown(M) {
        v.current = Pd(M.pointerType) && gh(M.nativeEvent) ? "virtual" : M.pointerType;
      },
      onMouseDown(M) {
        const A = v.current, w = M.nativeEvent, z = p.select("open");
        if (M.button !== 0 || a === "click" || Pd(A) && f)
          return;
        const I = N(z, M.currentTarget, (L) => L === "click" || L === "mousedown"), Y = Tl(w);
        if (yh(Y)) {
          T(I, w, Y, A);
          return;
        }
        const B = M.currentTarget;
        x.request(() => {
          T(I, w, B, A);
        });
      },
      onClick(M) {
        if (a === "mousedown-only")
          return;
        const A = v.current;
        if (a === "mousedown" && A) {
          v.current = void 0;
          return;
        }
        if (Pd(A) && f)
          return;
        const w = p.select("open"), z = N(w, M.currentTarget, (I) => I === "click" || I === "mousedown" || I === "keydown" || I === "keyup");
        T(z, M.nativeEvent, M.currentTarget, A);
      },
      onKeyDown() {
        v.current = void 0;
      }
    };
  }, [y, a, f, g, p, d, c, x, C, h]);
  return b.useMemo(() => r ? {
    reference: _
  } : hl, [r, _]);
}
function OM() {
  return !1;
}
function NM(n) {
  return {
    escapeKey: typeof n == "boolean" ? n : n?.escapeKey ?? !1,
    outsidePress: typeof n == "boolean" ? n : n?.outsidePress ?? !0
  };
}
function zM(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: a = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = OM,
    bubbles: h,
    externalTree: g
  } = o, p = "rootStore" in n ? n.rootStore : n, y = p.useState("open"), v = p.useState("floatingElement"), {
    dataRef: x
  } = p.context, C = wu(g), _ = Ke(typeof c == "function" ? c : () => !1), T = typeof c == "function" ? _ : c, N = T !== !1, M = Ke(() => f), {
    escapeKey: A,
    outsidePress: w
  } = NM(h), z = b.useRef(!1), I = b.useRef(!1), Y = b.useRef(!1), B = b.useRef(!1), L = b.useRef(""), P = b.useRef(null), J = wi(), ae = wi(), ue = Ke(() => {
    ae.clear(), x.current.insideReactTree = !1;
  }), ee = Ke((X) => {
    const W = x.current.floatingContext?.nodeId;
    return (C ? fs(C.nodesRef.current, W) : []).some((ge) => ge.context?.open && !ge.context.dataRef.current[X]);
  }), de = Ke((X) => Xd(X, p.select("floatingElement")) || Xd(X, p.select("domReferenceElement"))), ye = Ke((X) => {
    d() && p.setOpen(!1, Ct(Yx, X.nativeEvent));
  }), V = Ke((X) => {
    if (!y || !r || !a || X.key !== "Escape" || B.current || !A && ee("__escapeKeyBubbles"))
      return;
    const W = lM(X) ? X.nativeEvent : X, te = Ct(dh, W);
    p.setOpen(!1, te), te.isCanceled || X.preventDefault(), !A && !te.isPropagationAllowed && X.stopPropagation();
  }), H = Ke(() => {
    x.current.insideReactTree = !0, ae.start(0, ue);
  }), K = Ke((X) => {
    if (!y || !r || X.button !== 0)
      return;
    const W = Tl(X.nativeEvent);
    at(p.select("floatingElement"), W) && (z.current || (z.current = !0, I.current = !1));
  }), Se = Ke((X) => {
    !y || !r || (X.defaultPrevented || X.nativeEvent.defaultPrevented) && z.current && (I.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return ue;
    x.current.__escapeKeyBubbles = A, x.current.__outsidePressBubbles = w;
    const X = new rr(), W = new rr();
    function te() {
      X.clear(), B.current = !0;
    }
    function ge() {
      X.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        hr ? 5 : 0,
        () => {
          B.current = !1;
        }
      );
    }
    function Ae() {
      Y.current = !0, W.start(0, () => {
        Y.current = !1;
      });
    }
    function qe() {
      z.current = !1, I.current = !1;
    }
    function Te() {
      const F = L.current, se = F === "pen" || !F ? "mouse" : F, Ie = M(), Re = typeof Ie == "function" ? Ie() : Ie;
      return typeof Re == "string" ? Re : Re[se];
    }
    function Oe(F) {
      const se = Te();
      return se === "intentional" && F.type !== "click" || se === "sloppy" && F.type === "click";
    }
    function it(F) {
      const se = x.current.floatingContext?.nodeId, Ie = C && fs(C.nodesRef.current, se).some((Re) => Xd(F, Re.context?.elements.floating));
      return de(F) || Ie;
    }
    function bt(F) {
      if (Oe(F)) {
        F.type !== "click" && !de(F) && (W.clear(), Y.current = !1), ue();
        return;
      }
      if (x.current.insideReactTree) {
        ue();
        return;
      }
      const se = Tl(F), Ie = `[${lu("inert")}]`, Re = hn(se) ? se.getRootNode() : null, Ge = Array.from((ra(Re) ? Re : tn(p.select("floatingElement"))).querySelectorAll(Ie)), nt = p.context.triggerElements;
      if (se && (nt.hasElement(se) || nt.hasMatchingElement((wt) => at(wt, se))))
        return;
      let Ot = hn(se) ? se : null;
      for (; Ot && !xi(Ot); ) {
        const wt = Ci(Ot);
        if (xi(wt) || !hn(wt))
          break;
        Ot = wt;
      }
      if (!(Ge.length && hn(se) && !rM(se) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !at(se, p.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ge.every((wt) => !at(Ot, wt)))) {
        if (Jt(se) && !("touches" in F)) {
          const wt = xi(se), Yt = ml(se), zt = /auto|scroll/, xt = wt || zt.test(Yt.overflowX), Wt = wt || zt.test(Yt.overflowY), dt = xt && se.clientWidth > 0 && se.scrollWidth > se.clientWidth, on = Wt && se.clientHeight > 0 && se.scrollHeight > se.clientHeight, pt = Yt.direction === "rtl", Mn = on && (pt ? F.offsetX <= se.offsetWidth - se.clientWidth : F.offsetX > se.clientWidth), Tn = dt && F.offsetY > se.clientHeight;
          if (Mn || Tn)
            return;
        }
        if (!it(F)) {
          if (Te() === "intentional" && Y.current) {
            W.clear(), Y.current = !1;
            return;
          }
          typeof T == "function" && !T(F) || ee("__outsidePressBubbles") || (p.setOpen(!1, Ct(fh, F)), ue());
        }
      }
    }
    function ke(F) {
      Te() !== "sloppy" || F.pointerType === "touch" || !p.select("open") || !r || de(F) || bt(F);
    }
    function et(F) {
      if (Te() !== "sloppy" || !p.select("open") || !r || de(F))
        return;
      const se = F.touches[0];
      se && (P.current = {
        startTime: Date.now(),
        startX: se.clientX,
        startY: se.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, J.start(1e3, () => {
        P.current && (P.current.dismissOnTouchEnd = !1, P.current.dismissOnMouseDown = !1);
      }));
    }
    function ze(F, se) {
      const Ie = Tl(F);
      if (!Ie)
        return;
      const Re = Kt(Ie, F.type, () => {
        se(F), Re();
      });
    }
    function Le(F) {
      L.current = "touch", ze(F, et);
    }
    function He(F) {
      J.clear(), F.type === "pointerdown" && (L.current = F.pointerType), !(F.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) && ze(F, (se) => {
        se.type === "pointerdown" ? ke(se) : bt(se);
      });
    }
    function Me(F) {
      if (!z.current)
        return;
      const se = I.current;
      if (qe(), Te() === "intentional") {
        if (F.type === "pointercancel") {
          se && Ae();
          return;
        }
        if (!it(F)) {
          if (se) {
            Ae();
            return;
          }
          typeof T == "function" && !T(F) || (W.clear(), Y.current = !0, ue());
        }
      }
    }
    function Qe(F) {
      if (Te() !== "sloppy" || !P.current || de(F))
        return;
      const se = F.touches[0];
      if (!se)
        return;
      const Ie = Math.abs(se.clientX - P.current.startX), Re = Math.abs(se.clientY - P.current.startY), Ge = Math.sqrt(Ie * Ie + Re * Re);
      Ge > 5 && (P.current.dismissOnTouchEnd = !0), Ge > 10 && (bt(F), J.clear(), P.current = null);
    }
    function Ne(F) {
      ze(F, Qe);
    }
    function $e(F) {
      Te() !== "sloppy" || !P.current || de(F) || (P.current.dismissOnTouchEnd && bt(F), J.clear(), P.current = null);
    }
    function tt(F) {
      ze(F, $e);
    }
    const Xe = tn(v), ve = oa(a && oa(Kt(Xe, "keydown", V), Kt(Xe, "compositionstart", te), Kt(Xe, "compositionend", ge)), N && oa(Kt(Xe, "click", He, !0), Kt(Xe, "pointerdown", He, !0), Kt(Xe, "pointerup", Me, !0), Kt(Xe, "pointercancel", Me, !0), Kt(Xe, "mousedown", He, !0), Kt(Xe, "mouseup", Me, !0), Kt(Xe, "touchstart", Le, !0), Kt(Xe, "touchmove", Ne, !0), Kt(Xe, "touchend", tt, !0)));
    return () => {
      ve(), X.clear(), W.clear(), qe(), Y.current = !1, ue();
    };
  }, [x, v, a, N, T, y, r, A, w, V, ue, M, ee, de, C, p, J]);
  const ie = b.useMemo(() => ({
    onKeyDown: V,
    onPointerDown: ye,
    onClick: ye
  }), [V, ye]), k = b.useMemo(() => ({
    onKeyDown: V,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: Se,
    onMouseDown: Se,
    onClickCapture: H,
    onMouseDownCapture(X) {
      H(), K(X);
    },
    onPointerDownCapture(X) {
      H(), K(X);
    },
    onMouseUpCapture: H,
    onTouchEndCapture: H,
    onTouchMoveCapture: H
  }), [V, H, K, Se]);
  return b.useMemo(() => r ? {
    reference: ie,
    floating: k,
    trigger: ie
  } : {}, [r, ie, k]);
}
var $d = { exports: {} }, Jd = {};
var hv;
function kM() {
  if (hv) return Jd;
  hv = 1;
  var n = hs();
  function o(v, x) {
    return v === x && (v !== 0 || 1 / v === 1 / x) || v !== v && x !== x;
  }
  var r = typeof Object.is == "function" ? Object.is : o, a = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function h(v, x) {
    var C = x(), _ = a({ inst: { value: C, getSnapshot: x } }), T = _[0].inst, N = _[1];
    return f(
      function() {
        T.value = C, T.getSnapshot = x, g(T) && N({ inst: T });
      },
      [v, C, x]
    ), c(
      function() {
        return g(T) && N({ inst: T }), v(function() {
          g(T) && N({ inst: T });
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
  function p(v, x) {
    return x();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : h;
  return Jd.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, Jd;
}
var mv;
function c1() {
  return mv || (mv = 1, $d.exports = kM()), $d.exports;
}
var DM = c1(), Wd = { exports: {} }, ep = {};
var gv;
function jM() {
  if (gv) return ep;
  gv = 1;
  var n = hs(), o = c1();
  function r(p, y) {
    return p === y && (p !== 0 || 1 / p === 1 / y) || p !== p && y !== y;
  }
  var a = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, h = n.useMemo, g = n.useDebugValue;
  return ep.useSyncExternalStoreWithSelector = function(p, y, v, x, C) {
    var _ = f(null);
    if (_.current === null) {
      var T = { hasValue: !1, value: null };
      _.current = T;
    } else T = _.current;
    _ = h(
      function() {
        function M(Y) {
          if (!A) {
            if (A = !0, w = Y, Y = x(Y), C !== void 0 && T.hasValue) {
              var B = T.value;
              if (C(B, Y))
                return z = B;
            }
            return z = Y;
          }
          if (B = z, a(w, Y)) return B;
          var L = x(Y);
          return C !== void 0 && C(B, L) ? (w = Y, B) : (w = Y, z = L);
        }
        var A = !1, w, z, I = v === void 0 ? null : v;
        return [
          function() {
            return M(y());
          },
          I === null ? void 0 : function() {
            return M(I());
          }
        ];
      },
      [y, v, x, C]
    );
    var N = c(p, _[0], _[1]);
    return d(
      function() {
        T.hasValue = !0, T.value = N;
      },
      [N]
    ), g(N), N;
  }, ep;
}
var bv;
function LM() {
  return bv || (bv = 1, Wd.exports = jM()), Wd.exports;
}
var VM = LM();
const IM = ah(19), HM = IM ? BM : GM;
function Ee(n, o, r, a, c) {
  return HM(n, o, r, a, c);
}
function UM(n, o, r, a, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, a, c), [n, o, r, a, c]);
  return DM.useSyncExternalStore(n.subscribe, f, f);
}
function BM(n, o, r, a, c) {
  return UM(n, o, r, a, c);
}
function GM(n, o, r, a, c) {
  return VM.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, a, c));
}
class u1 {
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
    return Ee(this, o, r, a, c);
  }
}
class YM extends u1 {
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
    return b.useDebugValue(o), Ee(this, this.selectors[o], r, a, c);
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
    const a = Ke(r ?? $t);
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
        const h = c;
        c = d, r(d, h, this);
      }
    });
  }
}
const qM = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class PM extends YM {
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
      events: RM(),
      nested: a,
      triggerElements: f
    }, qM), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && oM(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
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
const XM = {
  tabIndex: -1,
  [Ap]: ""
};
class KM {
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
function FM(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: a = {}
  } = n, c = uh(), f = a1() != null, d = Ol(() => new PM({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: a.reference ?? null,
    floatingElement: a.floating ?? null,
    triggerElements: new KM(),
    floatingId: c,
    syncOnly: !1,
    nested: f
  })).current;
  return Fe(() => {
    const h = {
      open: o,
      floatingId: c
    };
    a.reference !== void 0 && (h.referenceElement = a.reference, h.domReferenceElement = hn(a.reference) ? a.reference : null), a.floating !== void 0 && (h.floatingElement = a.floating), d.update(h);
  }, [o, c, a.reference, a.floating, d]), d.context.onOpenChange = r, d.context.nested = f, d;
}
function QM(n) {
  return ZM(n, n.rootContext);
}
function ZM(n, o) {
  const {
    nodeId: r,
    externalTree: a
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), h = o.useState("open"), g = o.useState("floatingId"), [p, y] = b.useState(null), [v, x] = b.useState(void 0), [C, _] = b.useState(void 0), T = b.useRef(null), N = wu(a), M = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), A = I_({
    ...n,
    elements: {
      ...M,
      ...p && {
        reference: p
      }
    }
  }), w = hn(v) ? v : null, z = C === void 0 ? o.state.floatingElement : C;
  o.useSyncedValue("referenceElement", v ?? null), o.useSyncedValue("domReferenceElement", v === void 0 ? d : w), o.useSyncedValue("floatingElement", z);
  const I = b.useCallback((ae) => {
    const ue = hn(ae) ? {
      getBoundingClientRect: () => ae.getBoundingClientRect(),
      getClientRects: () => ae.getClientRects(),
      contextElement: ae
    } : ae;
    y(ue), A.refs.setReference(ue);
  }, [A.refs]), Y = b.useCallback((ae) => {
    (hn(ae) || ae === null) && (T.current = ae, x(ae)), (hn(A.refs.reference.current) || A.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    ae !== null && !hn(ae)) && A.refs.setReference(ae);
  }, [A.refs, x]), B = b.useCallback((ae) => {
    _(ae), A.refs.setFloating(ae);
  }, [A.refs]), L = b.useMemo(() => ({
    ...A.refs,
    setReference: Y,
    setFloating: B,
    setPositionReference: I,
    domReference: T
  }), [A.refs, Y, B, I]), P = b.useMemo(() => ({
    ...A.elements,
    domReference: d
  }), [A.elements, d]), J = b.useMemo(() => ({
    ...A,
    dataRef: o.context.dataRef,
    open: h,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: g,
    refs: L,
    elements: P,
    nodeId: r,
    rootStore: o
  }), [A, L, P, r, o, h, g]);
  return Fe(() => {
    d && (T.current = d);
  }, [d]), Fe(() => {
    o.context.dataRef.current.floatingContext = J;
    const ae = N?.nodesRef.current.find((ue) => ue.id === r);
    ae && (ae.context = J);
  }), b.useMemo(() => ({
    ...A,
    context: J,
    refs: L,
    elements: P,
    rootStore: o
  }), [A, L, P, J, o]);
}
const $M = "Escape";
function yv(n) {
  return hr && n.movementX === 0 && n.movementY === 0;
}
function _u(n, o, r) {
  switch (n) {
    case "vertical":
      return o;
    case "horizontal":
      return r;
    default:
      return o || r;
  }
}
function jc(n, o) {
  return _u(o, n === bh || n === Eu, n === tr || n === nr);
}
function tp(n, o, r) {
  return _u(o, n === Eu, r ? n === tr : n === nr) || n === "Enter" || n === " " || n === "";
}
function JM(n, o, r) {
  return _u(o, r ? n === tr : n === nr, n === Eu);
}
function WM(n, o, r, a) {
  const c = r ? n === nr : n === tr, f = n === bh;
  return o === "both" || o === "horizontal" && a ? n === $M : _u(o, c, f);
}
function eT(n, o) {
  const {
    listRef: r,
    activeIndex: a,
    onNavigate: c = () => {
    },
    enabled: f = !0,
    selectedIndex: d = null,
    allowEscape: h = !1,
    loopFocus: g = !1,
    nested: p = !1,
    rtl: y = !1,
    virtual: v = !1,
    focusItemOnOpen: x = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: _ = !0,
    disabledIndices: T = void 0,
    orientation: N = "vertical",
    parentOrientation: M,
    id: A,
    resetOnPointerLeave: w = !0,
    externalTree: z,
    grid: I
  } = o, Y = I != null, B = "rootStore" in n ? n.rootStore : n, L = B.useState("open"), P = B.useState("floatingElement"), J = B.useState("domReferenceElement"), ae = B.context.dataRef, ue = Tp(P), ee = Mp(J), de = pl(ue), ye = a1(), V = wu(z), H = b.useRef(x), K = b.useRef(d ?? -1), Se = b.useRef(null), ie = b.useRef(!0), k = Ke((F) => {
    c(K.current === -1 ? null : K.current, F);
  }), X = b.useRef(!!P), W = b.useRef(L), te = b.useRef(!1), ge = b.useRef(!1), Ae = b.useRef(null), qe = pl(T), Te = pl(L), Oe = pl(d), it = pl(w), bt = ss(), ke = ss(), et = Ke(() => {
    function F(Ge) {
      v ? V?.events.emit("virtualfocus", Ge) : Ae.current = Xc(Ge, {
        sync: te.current,
        preventScroll: !0
      });
    }
    const se = r.current[K.current], Ie = ge.current;
    se && F(se), (te.current ? (Ge) => Ge() : (Ge) => bt.request(Ge))(() => {
      const Ge = r.current[K.current] || se;
      if (!Ge)
        return;
      se || F(Ge), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      Ne && (Ie || !ie.current) && Ge.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Fe(() => {
    ae.current.orientation = N;
  }, [ae, N]), Fe(() => {
    f && (L && P ? (K.current = d ?? -1, H.current && d != null && (ge.current = !0, k())) : X.current && (K.current = -1, k()));
  }, [f, L, P, d, k]), Fe(() => {
    if (f) {
      if (!L) {
        te.current = !1;
        return;
      }
      if (P)
        if (a == null) {
          if (te.current = !1, Oe.current != null)
            return;
          if (X.current && (K.current = -1, et()), (!W.current || !X.current) && H.current && (Se.current != null || H.current === !0 && Se.current == null)) {
            let F = 0;
            const se = () => {
              r.current[0] == null ? (F < 2 && (F ? (Re) => ke.request(Re) : queueMicrotask)(se), F += 1) : (K.current = Se.current == null || tp(Se.current, N, y) || p ? Kd(r) : nv(r), Se.current = null, k());
            };
            se();
          }
        } else us(r.current, a) || (K.current = a, et(), ge.current = !1);
    }
  }, [f, L, P, a, Oe, p, r, N, y, k, et, ke]), Fe(() => {
    if (!f || P || !V || v || !X.current)
      return;
    const F = V.nodesRef.current, se = F.find((Ge) => Ge.id === ye)?.context?.elements.floating, Ie = Gl(tn(J ?? se ?? null)), Re = F.some((Ge) => Ge.context && at(Ge.context.elements.floating, Ie));
    se && !Re && ie.current && se.focus({
      preventScroll: !0
    });
  }, [f, P, J, V, ye, v]), Fe(() => {
    W.current = L, X.current = !!P;
  }), Fe(() => {
    L || (Se.current = null, H.current = x);
  }, [L, x]);
  const ze = a != null, Le = Ke((F) => {
    if (!Te.current)
      return;
    const se = r.current.indexOf(F.currentTarget);
    se !== -1 && (K.current !== se || a !== se) && (K.current = se, k(F));
  }), He = Ke(() => M ?? V?.nodesRef.current.find((F) => F.id === ye)?.context?.dataRef?.current.orientation), Me = Ke(() => Kd(r, qe.current)), Qe = Ke((F) => {
    if (ie.current = !1, te.current = !0, F.which === 229 || !Te.current && F.currentTarget === de.current)
      return;
    if (p && WM(F.key, N, y, Y)) {
      jc(F.key, He()) || kn(F), B.setOpen(!1, Ct(_p, F.nativeEvent)), Jt(J) && (v ? V?.events.emit("virtualfocus", J) : J.focus());
      return;
    }
    const se = K.current, Ie = Kd(r, T), Re = nv(r, T);
    if (ee || (F.key === "Home" && (kn(F), K.current = Ie, k(F)), F.key === "End" && (kn(F), K.current = Re, k(F))), I != null) {
      const Ge = I(F, K.current, r, N, g, y, T, Ie, Re);
      if (Ge != null && (K.current = Ge, k(F)), N === "both")
        return;
    }
    if (jc(F.key, N)) {
      if (kn(F), L && !v && Gl(F.currentTarget.ownerDocument) === F.currentTarget) {
        K.current = tp(F.key, N, y) ? Ie : Re, k(F);
        return;
      }
      tp(F.key, N, y) ? g ? se >= Re ? h && se !== r.current.length ? K.current = -1 : (te.current = !1, K.current = Ie) : K.current = el(r.current, {
        startingIndex: se,
        disabledIndices: T
      }) : K.current = Math.min(Re, el(r.current, {
        startingIndex: se,
        disabledIndices: T
      })) : g ? se <= Ie ? h && se !== -1 ? K.current = r.current.length : (te.current = !1, K.current = Re) : K.current = el(r.current, {
        startingIndex: se,
        decrement: !0,
        disabledIndices: T
      }) : K.current = Math.max(Ie, el(r.current, {
        startingIndex: se,
        decrement: !0,
        disabledIndices: T
      })), us(r.current, K.current) && (K.current = -1), k(F);
    }
  }), Ne = b.useMemo(() => ({
    onFocus(se) {
      te.current = !0, Le(se);
    },
    onClick: ({
      currentTarget: se
    }) => se.focus({
      preventScroll: !0
    }),
    // Safari
    onMouseMove(se) {
      yv(se) || (te.current = !0, ge.current = !1, C && Le(se));
    },
    onPointerLeave(se) {
      if (!Te.current || !ie.current || se.pointerType === "touch")
        return;
      te.current = !0;
      const Ie = se.relatedTarget;
      if (!(!C || r.current.includes(Ie)) && it.current && (Ae.current?.(), Ae.current = null, K.current = -1, k(se), !v)) {
        const Re = de.current, Ge = Gl(tn(Re));
        Re && at(Re, Ge) && Re.focus({
          preventScroll: !0
        });
      }
    }
  }), [Le, Te, de, C, r, k, it, v]), $e = b.useMemo(() => v && L && ze && {
    "aria-activedescendant": `${A}-${a}`
  }, [v, L, ze, A, a]), tt = b.useMemo(() => ({
    "aria-orientation": N === "both" ? void 0 : N,
    ...ee ? {} : $e,
    onKeyDown(F) {
      if (F.key === "Tab" && F.shiftKey && L && !v) {
        const se = Tl(F.nativeEvent);
        if (se && !at(de.current, se))
          return;
        kn(F), B.setOpen(!1, Ct(bu, F.nativeEvent)), Jt(J) && J.focus();
        return;
      }
      Qe(F);
    },
    onPointerMove(F) {
      yv(F) || (ie.current = !0);
    }
  }), [$e, Qe, de, N, ee, B, L, v, J]), Xe = b.useMemo(() => {
    function F(Re) {
      B.setOpen(!0, Ct(_p, Re.nativeEvent, Re.currentTarget));
    }
    function se(Re) {
      x === "auto" && Xx(Re.nativeEvent) && (H.current = !v);
    }
    function Ie(Re) {
      H.current = x, x === "auto" && gh(Re.nativeEvent) && (H.current = !0);
    }
    return {
      onKeyDown(Re) {
        const Ge = B.select("open");
        ie.current = !1;
        const nt = Re.key.startsWith("Arrow"), Ot = JM(Re.key, He(), y), wt = jc(Re.key, N), Yt = (p ? Ot : wt) || Re.key === "Enter" || Re.key.trim() === "";
        if (v && Ge)
          return Qe(Re);
        if (!(!Ge && !_ && nt)) {
          if (Yt) {
            const zt = jc(Re.key, He());
            Se.current = p && zt ? null : Re.key;
          }
          if (p) {
            Ot && (kn(Re), Ge ? (K.current = Me(), k(Re)) : F(Re));
            return;
          }
          wt && (Oe.current != null && (K.current = Oe.current), kn(Re), !Ge && _ ? F(Re) : Qe(Re), Ge && k(Re));
        }
      },
      onFocus(Re) {
        B.select("open") && !v && (K.current = -1, k(Re));
      },
      onPointerDown: Ie,
      onPointerEnter: Ie,
      onMouseDown: se,
      onClick: se
    };
  }, [Qe, x, Me, p, k, B, _, N, He, y, Oe, v]), ve = b.useMemo(() => ({
    ...$e,
    ...Xe
  }), [$e, Xe]);
  return b.useMemo(() => f ? {
    reference: ve,
    floating: tt,
    item: Ne,
    trigger: Xe
  } : {}, [f, ve, tt, Xe, Ne]);
}
function tT(n, o) {
  const {
    listRef: r,
    elementsRef: a,
    activeIndex: c,
    onMatch: f,
    disabledIndices: d,
    onTyping: h,
    enabled: g = !0,
    resetMs: p = 750,
    selectedIndex: y = null
  } = o, v = "rootStore" in n ? n.rootStore : n, x = v.useState("open"), C = wi(), _ = b.useRef(""), T = b.useRef(y ?? c ?? -1), N = b.useRef(null), M = Ke((z) => {
    function I(de) {
      return a?.current[de];
    }
    function Y(de) {
      const ye = I(de);
      return ye && !Cu(ye) || ye?.matches(":disabled") ? !1 : d == null || !nu(ea, de, d);
    }
    function B(de, ye, V = 0) {
      if (de.length === 0)
        return -1;
      const H = (V % de.length + de.length) % de.length, K = ye.toLowerCase();
      for (let Se = 0; Se < de.length; Se += 1) {
        const ie = (H + Se) % de.length;
        if (!(!de[ie]?.toLowerCase().startsWith(K) || !Y(ie)))
          return ie;
      }
      return -1;
    }
    const L = r.current;
    if (_.current.length > 0 && z.key === " " && (kn(z), h?.(!0)), _.current.length > 0 && _.current[0] !== " " && B(L, _.current) === -1 && z.key !== " " && h?.(!1), L == null || // Character key.
    z.key.length !== 1 || // Modifier key.
    z.ctrlKey || z.metaKey || z.altKey)
      return;
    x && z.key !== " " && (kn(z), h?.(!0));
    const P = _.current === "";
    P && (T.current = y ?? c ?? -1), L.every((de, ye) => de && Y(ye) ? de[0]?.toLowerCase() !== de[1]?.toLowerCase() : !0) && _.current === z.key && (_.current = "", T.current = N.current), _.current += z.key, C.start(p, () => {
      _.current = "", T.current = N.current, h?.(!1);
    });
    const ue = ((P ? y ?? c ?? -1 : T.current) ?? 0) + 1, ee = B(L, _.current, ue);
    ee !== -1 ? (f?.(ee), N.current = ee) : z.key !== " " && (_.current = "", h?.(!1));
  }), A = Ke((z) => {
    const I = z.relatedTarget, Y = v.select("domReferenceElement"), B = v.select("floatingElement");
    at(Y, I) || at(B, I) || (C.clear(), _.current = "", T.current = N.current, h?.(!1));
  });
  Fe(() => {
    !x && y !== null || (C.clear(), N.current = null, _.current !== "" && (_.current = ""));
  }, [x, y, C]);
  const w = b.useMemo(() => ({
    onKeyDown: M,
    onBlur: A
  }), [M, A]);
  return b.useMemo(() => g ? {
    reference: w,
    floating: w
  } : {}, [g, w]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = Qy.startingStyle] = "startingStyle", n[n.endingStyle = Qy.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const nT = {
  "data-popup-open": ""
}, lT = {
  "data-popup-open": "",
  "data-pressed": ""
}, oT = {
  "data-open": ""
}, iT = {
  "data-closed": ""
}, rT = {
  "data-anchor-hidden": ""
}, aT = {
  open(n) {
    return n ? nT : null;
  }
}, sT = {
  open(n) {
    return n ? lT : null;
  }
}, Ch = {
  open(n) {
    return n ? oT : iT;
  },
  anchorHidden(n) {
    return n ? rT : null;
  }
};
({
  ...Ch,
  ...yu
});
function cT(n) {
  return ah(19) ? n : n ? "true" : void 0;
}
const uT = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
function fT(n) {
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
function ta(n, o) {
  const r = b.useRef(n), a = Ke(o);
  Fe(() => {
    r.current !== n && a(r.current), r.current = n;
  }, [n, a]);
}
function dT(n, o) {
  const r = Ke((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (Es ? "touch" : ""));
  }), {
    onClick: a,
    onPointerDown: c
  } = fT(r);
  return b.useMemo(() => ({
    onClick: a,
    onPointerDown: c
  }), [a, c]);
}
function pT(n) {
  const [o, r] = b.useState(null), a = dT(n, r);
  return ta(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: a
  }), [o, a]);
}
function hT(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function mT(n, o, r, a, c, f, d, h, g, p = 2) {
  const y = aM(r.current, {
    event: n,
    orientation: a,
    loopFocus: c,
    rtl: f,
    cols: p,
    disabledIndices: d,
    minIndex: h,
    maxIndex: g,
    // An out-of-range previous index falls back to the first enabled item.
    prevIndex: o > g ? h : o,
    stopEvent: !0
  });
  return us(r.current, y) ? void 0 : y;
}
const f1 = /* @__PURE__ */ b.createContext(void 0), d1 = /* @__PURE__ */ b.createContext(void 0), p1 = /* @__PURE__ */ b.createContext(void 0), h1 = /* @__PURE__ */ b.createContext(!1), m1 = /* @__PURE__ */ b.createContext("");
function Nl() {
  const n = b.useContext(f1);
  if (!n)
    throw new Error(yo(22));
  return n;
}
function Au() {
  const n = b.useContext(d1);
  if (!n)
    throw new Error(yo(23));
  return n;
}
function Cs() {
  const n = b.useContext(p1);
  if (!n)
    throw new Error(yo(24));
  return n;
}
function Rh() {
  return b.useContext(m1);
}
function gT() {
  return b.useContext(h1);
}
const bT = (n, o) => Object.is(n, o);
function _i(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function yT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((a) => a === void 0 ? !1 : _i(o, a, r));
}
function g1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((a) => a === void 0 ? !1 : _i(a, o, r));
}
function np(n, o, r, a) {
  const c = a && Array.isArray(o) ? o[o.length - 1] : o, f = g1(n, c, r);
  return f === -1 ? null : f;
}
function vT(n, o, r) {
  return n.filter((a) => !_i(o, a, r));
}
function zp(n) {
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
function wh(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function xT(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (wh(o)) {
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
function to(n, o) {
  if (o && n != null)
    return o(n) ?? "";
  if (n && typeof n == "object") {
    if ("label" in n && n.label != null)
      return String(n.label);
    if ("value" in n)
      return String(n.value);
  }
  return zp(n);
}
function ns(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? zp(n.value) : zp(n);
}
function b1(n, o, r) {
  function a() {
    return to(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? a();
  if (Array.isArray(o)) {
    const c = o, f = wh(c) ? c.flatMap((d) => d.items) : c;
    if (n == null || typeof n != "object") {
      const d = f.find((h) => h.value === n);
      return d && d.label != null ? d.label : a();
    }
    if ("value" in n) {
      const d = f.find((h) => h && h.value === n.value);
      if (d && d.label != null)
        return d.label;
    }
  }
  return a();
}
function ST(n, o, r) {
  return n.reduce((a, c, f) => (f > 0 && a.push(", "), a.push(/* @__PURE__ */ S.jsx(b.Fragment, {
    children: b1(c, o, r)
  }, f)), a), []);
}
const Ce = {
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
  hasNullItemLabel: (n, o) => o ? xT(n.items) : !1,
  open: (n) => n.open,
  mounted: (n) => n.mounted,
  forceMounted: (n) => n.forceMounted,
  inline: (n) => n.inline,
  activeIndex: (n) => n.activeIndex,
  selectedIndex: (n) => n.selectedIndex,
  isActive: (n, o) => n.activeIndex === o,
  isSelected: (n, o) => {
    const r = n.isItemEqualToValue, a = n.selectedValue;
    return Array.isArray(a) ? a.some((c) => _i(o, c, r)) : _i(o, a, r);
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
}, ET = {
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
}, y1 = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, CT = {
  disabled: !1,
  ...y1
}, v1 = {
  valid(n) {
    return n === null ? null : n ? {
      "data-valid": ""
    } : {
      "data-invalid": ""
    };
  }
}, x1 = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: ET,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: $t,
  disabled: void 0,
  setTouched: $t,
  setDirty: $t,
  setFilled: $t,
  setFocused: $t,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => !1,
  state: CT,
  registerFieldControl: $t,
  validation: {
    getValidationProps: (n, o = hl) => o,
    inputRef: {
      current: null
    },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: $t,
    getInputControl: () => null,
    commit: async () => {
    },
    change: $t
  }
}, S1 = /* @__PURE__ */ b.createContext(x1);
function fa(n = !0) {
  const o = b.useContext(S1);
  if (o.setValidityData === $t && !n)
    throw new Error(yo(28));
  return o;
}
function E1(n, o, r, a, c = !0, f) {
  const {
    registerFieldControl: d
  } = fa(), h = Ol(() => /* @__PURE__ */ Symbol());
  Fe(() => {
    const g = h.current;
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
  }, [n, c, a, o, f, d, h, r]), Fe(() => {
    const g = h.current;
    return () => {
      d(g, void 0);
    };
  }, [d, h]);
}
const RT = /* @__PURE__ */ b.createContext({
  elementRef: {
    current: null
  },
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: $t,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: !1
  }
});
function C1() {
  return b.useContext(RT);
}
const wT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: $t,
  labelId: void 0,
  setLabelId: $t,
  messageIds: [],
  setMessageIds: $t,
  getDescriptionProps: (n) => n
});
function Mu() {
  return b.useContext(wT);
}
function _h(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: a
  } = n, {
    controlId: c,
    registerControlId: f
  } = Mu(), d = gu(o), h = r ? c : void 0, g = Ol(() => /* @__PURE__ */ Symbol()), p = b.useRef(!1), y = b.useRef(o != null), v = Ke(() => {
    !p.current || f === $t || (p.current = !1, f(g.current, void 0));
  });
  return Fe(() => {
    if (f === $t)
      return;
    let x;
    if (r) {
      const C = a?.current;
      hn(C) && C.closest("label") != null ? x = o ?? null : x = h ?? d;
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
    p.current = !0, f(g.current, x);
  }, [o, a, h, f, r, d, g, v]), b.useEffect(() => v, [v]), c ?? d;
}
function R1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function _T(n, o) {
  return (r, a) => r == null ? !1 : n.contains(r, a, o);
}
function w1(n) {
  return Array.isArray(n) ? n.map((o) => w1(o)).join(",") : n == null ? "" : String(n);
}
const vv = /* @__PURE__ */ new Map();
function AT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${w1(n.locale)}|${JSON.stringify(o)}`, a = vv.get(r);
  if (a)
    return a;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, h, g) {
      if (!h)
        return !0;
      const p = to(d, g);
      for (let y = 0; y <= p.length - h.length; y += 1)
        if (c.compare(p.slice(y, y + h.length), h) === 0)
          return !0;
      return !1;
    },
    startsWith(d, h, g) {
      if (!h)
        return !0;
      const p = to(d, g);
      return c.compare(p.slice(0, h.length), h) === 0;
    },
    endsWith(d, h, g) {
      if (!h)
        return !0;
      const p = to(d, g), y = h.length;
      return p.length >= y && c.compare(p.slice(p.length - y), h) === 0;
    }
  };
  return vv.set(r, f), f;
}
const MT = AT;
function TT(n, o = !1) {
  const {
    overflowY: r
  } = ml(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function OT(n, o, r = (a, c) => a === c) {
  return n.length === o.length && n.every((a, c) => r(a, o[c]));
}
const _1 = /* @__PURE__ */ Symbol("none"), lp = {
  value: _1,
  index: -1
}, NT = /* @__PURE__ */ b.createContext(void 0);
function Ah() {
  return b.useContext(NT)?.direction ?? "ltr";
}
function zT(n) {
  const {
    id: o,
    onOpenChangeComplete: r,
    defaultSelectedValue: a = null,
    selectedValue: c,
    onSelectedValueChange: f,
    defaultInputValue: d,
    inputValue: h,
    open: g,
    defaultOpen: p = !1,
    selectionMode: y,
    onItemHighlighted: v,
    name: x,
    form: C,
    disabled: _ = !1,
    readOnly: T = !1,
    required: N = !1,
    inputRef: M,
    grid: A = !1,
    items: w,
    filteredItems: z,
    filter: I,
    openOnInputClick: Y = !0,
    autoHighlight: B = !1,
    keepHighlight: L = !1,
    highlightItemOnHover: P = !0,
    loopFocus: J = !0,
    itemToStringLabel: ae,
    itemToStringValue: ue,
    isItemEqualToValue: ee = bT,
    virtualized: de = !1,
    inline: ye = !1,
    fillInputOnItemPress: V = !0,
    modal: H = !1,
    limit: K = -1,
    autoComplete: Se = "list",
    formAutoComplete: ie,
    locale: k,
    submitOnItemClick: X = !1
  } = n, {
    clearErrors: W
  } = C1(), {
    setDirty: te,
    validityData: ge,
    setFilled: Ae,
    name: qe,
    disabled: Te,
    setTouched: Oe,
    setFocused: it,
    validationMode: bt,
    validation: ke
  } = fa(), et = Ah(), ze = _h({
    id: o
  }), Le = MT({
    locale: k
  }), [He, Me] = b.useState(!1), [Qe, Ne] = b.useState(null), $e = b.useRef([]), tt = b.useRef([]), Xe = b.useRef(null), ve = b.useRef(null), F = b.useRef(null), se = b.useRef(null), Ie = b.useRef(null), Re = b.useRef(!0), Ge = b.useRef(!1), nt = b.useRef(null), Ot = b.useRef(null), wt = b.useRef(null), Yt = b.useRef(lp), zt = b.useRef(null), xt = b.useRef([]), Wt = b.useRef(null), dt = Te || _, on = qe ?? x, pt = y === "multiple", Mn = y === "single", Tn = h !== void 0 || d !== void 0, kt = w !== void 0, ot = z !== void 0;
  let ht;
  B === "always" ? ht = "always" : ht = B ? "input-change" : !1;
  const [Je, Dt] = qc({
    controlled: c,
    default: pt ? a ?? ea : a,
    name: "Combobox",
    state: "selectedValue"
  }), On = b.useMemo(() => I === null ? () => !0 : I !== void 0 ? I : _T(Le, ae), [I, Le, ae]), Cn = Ol(() => Tn ? d ?? "" : Mn ? to(Je, ae) : "").current, [Ft, tl] = qc({
    controlled: h,
    default: Cn,
    name: "Combobox",
    state: "inputValue"
  }), [jt, lo] = qc({
    controlled: g,
    default: p,
    name: "Combobox",
    state: "open"
  }), Kn = wh(w), fn = Qe ?? String(Ft).trim(), oo = Mn ? to(Je, ae) : "", zl = Mn && !He && fn !== "" && oo.length === fn.length && Le.contains(oo, fn), nl = zl ? "" : fn, vo = kt && ot && zl, Rn = b.useMemo(() => w ? Kn ? w.flatMap((re) => re.items) : w : ea, [w, Kn]), _t = b.useMemo(() => {
    if (z && !vo)
      return z;
    if (!w)
      return ea;
    if (Kn) {
      const me = w, we = [];
      let _e = 0;
      for (const ut of me) {
        if (K > -1 && _e >= K)
          break;
        const qt = K > -1 ? K - _e : 1 / 0, St = nl === "" ? ut.items.slice(0, qt) : [];
        if (nl !== "")
          for (const sn of ut.items) {
            if (St.length >= qt)
              break;
            On(sn, nl, ae) && St.push(sn);
          }
        if (St.length > 0) {
          const sn = {
            ...ut,
            items: St
          };
          we.push(sn), _e += St.length;
        }
      }
      return we;
    }
    if (nl === "")
      return K > -1 ? Rn.slice(0, K) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        Rn
      );
    const re = [];
    for (const me of Rn) {
      if (K > -1 && re.length >= K)
        break;
      On(me, nl, ae) && re.push(me);
    }
    return re;
  }, [z, vo, w, Kn, nl, K, On, ae, Rn]), Rt = b.useMemo(() => Kn ? _t.flatMap((me) => me.items) : _t, [_t, Kn]), Ye = Ol(() => {
    let re = null;
    return ye && jt && kt && y !== "none" && (re = np(Rt, Je, ee, pt)), new u1({
      id: ze,
      labelId: void 0,
      selectedValue: Je,
      open: jt,
      items: w,
      selectionMode: y,
      listRef: $e,
      labelsRef: tt,
      popupRef: Xe,
      emptyRef: Ie,
      inputRef: ve,
      startDismissRef: F,
      endDismissRef: se,
      keyboardActiveRef: Re,
      chipsContainerRef: nt,
      clearRef: Ot,
      valuesRef: xt,
      pointerDownItemRef: Wt,
      selectionEventRef: wt,
      name: on,
      form: C,
      disabled: dt,
      readOnly: T,
      required: N,
      grid: A,
      virtualized: de,
      openOnInputClick: Y,
      itemToStringLabel: ae,
      isItemEqualToValue: ee,
      modal: H,
      autoHighlight: ht,
      submitOnItemClick: X,
      hasInputValue: Tn,
      mounted: !1,
      forceMounted: !1,
      transitionStatus: "idle",
      inline: ye,
      activeIndex: null,
      selectedIndex: re,
      popupProps: {},
      listProps: {},
      inputProps: {},
      triggerProps: {},
      itemProps: hl,
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
      onOpenChangeComplete: $t,
      setOpen: $t,
      setInputValue: $t,
      setSelectedValue: $t,
      setIndices: $t,
      handleSelection: $t,
      forceMount: $t,
      requestSubmit: $t
    });
  }).current, Fn = y === "none" ? Ft : Je, Oi = b.useMemo(() => y === "none" ? Fn : Array.isArray(Je) ? Je.map((re) => ns(re, ue)) : ns(Je, ue), [Fn, ue, y, Je]), Ni = Ke(v), ct = Ke(r), io = Ee(Ye, Ce.activeIndex), Yo = Ee(Ye, Ce.selectedIndex), gl = Ee(Ye, Ce.positionerElement), ll = Ee(Ye, Ce.listElement), ol = Ee(Ye, Ce.triggerElement), il = Ee(Ye, Ce.inputElement), rn = Ee(Ye, Ce.inputGroupElement), an = Ee(Ye, Ce.inline), Qn = Ee(Ye, Ce.inputInsidePopup), kl = Ee(Ye, Ce.inputOwnsFormValue), Fl = pl(ol), {
    mounted: zi,
    setMounted: mr,
    transitionStatus: qo
  } = mh(jt), {
    openMethod: gr,
    triggerProps: ro
  } = pT(jt), Po = Ke(() => Oi);
  E1(Qn ? Fl : ve, ze, Fn, Po, !dt, x);
  const Zn = Ke(() => {
    w ? tt.current = Rt.map((re) => to(re, ae)) : Ye.set("forceMounted", !0);
  }), Bt = Ke((re, me, we) => {
    if (me === -1) {
      if (Yt.current === lp)
        return;
      Yt.current = lp;
    } else
      Yt.current = {
        value: re,
        index: me
      };
    Ni(re, z2(we, void 0, {
      index: me
    }));
  }), nn = Ke((re) => {
    Ye.update(re);
    const me = re.activeIndex;
    if (me === void 0)
      return;
    const we = re.type || Yl;
    me === null ? Bt(void 0, -1, we) : Bt(xt.current[me], me, we);
  }), $n = Ke((re, me) => {
    if (Ge.current = me.reason === mo, n.onInputValueChange?.(re, me), !me.isCanceled) {
      if (me.reason === rs) {
        jt && Qe !== null && Ne(null);
        const we = me.event, _e = we.inputType;
        if (we.type === "compositionend" || _e != null && _e !== "" && _e !== "insertReplacementText") {
          const qt = re.trim() !== "";
          qt && Me(!0), zt.current = {
            hasQuery: qt
          };
          const St = Ye.state.listElement;
          if (!Ye.state.virtualized && St) {
            const sn = Xe.current;
            for (const Pt of aa(St.firstElementChild ?? St)) {
              if (!Jt(Pt) || (sn ? !at(sn, Pt) : Pt.getAttribute("role") === "dialog"))
                break;
              if (TT(Pt)) {
                Pt.scrollTop = 0;
                break;
              }
            }
          }
          qt && ht && Ye.state.activeIndex == null && (jt || an) && Ye.set("activeIndex", 0);
        }
      } else me.reason === mo && re === "" && Ye.state.inputInsidePopup && (zt.current = {
        hasQuery: !1,
        selection: !0
      });
      tl(re);
    }
  }), Ql = Ke((re, me) => {
    if (jt !== re && (me.reason === dh && kt && Rt.length === 0 && !Ie.current && me.allowPropagation(), n.onOpenChange?.(re, me), !me.isCanceled && (re && Qn && !an && Qe !== null && (Me(!1), Ne(null), Ft !== "" && me.reason !== rs && $n("", Ct(mo, me.event))), !re && He && (Mn ? (an || Ne(fn), fn === "" && Me(!1)) : pt && (an || Ne(fn), Qn && nn({
      activeIndex: null
    }), (!Qn || an) && $n("", Ct(mo, me.event)))), lo(re), !re && Qn && (me.reason === bu || me.reason === fh) && (Oe(!0), it(!1), bt === "onBlur")))) {
      const we = y === "none" ? Ft : Je;
      ke.commit(we);
    }
  }), xo = Ke((re, me) => {
    if (f?.(re, me), me.isCanceled)
      return;
    Dt(re), (y === "none" && Xe.current && V || Mn && !Ye.state.inputInsidePopup) && $n(to(re, ae), Ct(me.reason, me.event));
  }), Xo = Ke((re, me) => {
    const we = Tl(re), _e = wt.current ?? re;
    wt.current = null;
    const ut = Ct(M2, _e), qt = we?.closest("a")?.getAttribute("href");
    if (qt) {
      qt.startsWith("#") && Ql(!1, ut);
      return;
    }
    if (pt) {
      const St = Array.isArray(Je) ? Je : [], Pt = yT(St, me, ee) ? vT(St, me, ee) : [...St, me];
      if (xo(Pt, ut), ut.isCanceled || !(ve.current ? ve.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? $n("", Ct(mo, ut.event)) : Ql(!1, ut);
    } else {
      if (xo(me, ut), ut.isCanceled)
        return;
      Ql(!1, ut);
    }
  }), da = Ke(() => {
    const re = ke.inputRef.current?.form ?? Ye.state.inputElement?.form;
    re && typeof re.requestSubmit == "function" && re.requestSubmit();
  }), Nn = Ke(() => {
    if (mr(!1), ct?.(!1), Me(!1), Ne(null), nn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), pt && ve.current && ve.current.value !== "" && !Ge.current && $n("", Ct(mo)), Mn)
      if (Ye.state.inputInsidePopup)
        ve.current && ve.current.value !== "" && $n("", Ct(mo));
      else {
        const re = to(Je, ae);
        ve.current && ve.current.value !== re && $n(re, Ct(re === "" ? mo : Yl));
      }
  }), ki = b.useMemo(() => an && gl ? {
    current: gl.closest('[role="dialog"]')
  } : Xe, [an, gl]);
  vu({
    enabled: !n.actionsRef,
    open: jt,
    ref: ki,
    onComplete() {
      jt || Nn();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: Nn
  }), [Nn]), Fe(function() {
    if (jt || (Wt.current = null, y === "none"))
      return;
    const me = kt ? Rn : xt.current;
    nn({
      selectedIndex: np(me, Je, ee, pt)
    });
  }, [jt, Je, y, pt, kt, Rn, ee, nn]), Fe(() => {
    w && (xt.current = Rt, $e.current.length = Rt.length);
  }, [w, Rt]), Fe(() => {
    const re = zt.current;
    if (re) {
      const sn = jt || an || Ye.state.positionerElement?.hidden === !1;
      if (re.hasQuery)
        ht && sn && Ye.set("activeIndex", 0), zt.current = null;
      else if (String(Ft).trim() === "" && (zt.current = null, sn)) {
        const Pt = re.selection;
        ht === "always" && !Pt && Ye.state.selectionMode === "none" && Ye.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ye.state.open && !Ye.state.inline || ve.current && ve.current.value.trim() !== "")
            return;
          const jn = Ye.state.selectedValue, gn = Ye.state.selectionMode === "multiple", Xt = gn && Array.isArray(jn) ? jn[jn.length - 1] : jn, wn = Ye.state.selectionMode !== "none" && Xt != null;
          if (wn || Pt) {
            const bn = kt || ot ? Rt : xt.current;
            Ye.set("activeIndex", wn ? np(bn, jn, Ye.state.isItemEqualToValue, gn) : null);
          } else ht === "always" && Ye.set("activeIndex", 0);
        });
      }
    }
    if (!jt && !an)
      return;
    const we = kt || ot ? Rt : xt.current, _e = Ye.state.activeIndex;
    if (_e == null) {
      if (ht === "always" && we.length > 0) {
        Ye.set("activeIndex", 0);
        return;
      }
      Bt(void 0, -1, Yl);
      return;
    }
    if (_e >= we.length) {
      Bt(void 0, -1, Yl), Ye.set("activeIndex", null);
      return;
    }
    const ut = we[_e], qt = Yt.current.value, St = qt !== _1 && _i(ut, qt, Ye.state.isItemEqualToValue);
    (Yt.current.index !== _e || !St) && Bt(ut, _e, Yl);
  }, [
    io,
    ht,
    Bt,
    ot,
    kt,
    Rt,
    an,
    jt,
    Ye,
    // Reruns the effect when the query changes without affecting the deps above, such as
    // clearing the input when no items are filtered out (individually rendered items).
    Ft
  ]), Fe(() => {
    if (y === "none") {
      Ae(String(Ft) !== "");
      return;
    }
    Ae(pt ? Array.isArray(Je) && Je.length > 0 : Je != null);
  }, [Ae, y, Ft, Je, pt]), b.useEffect(() => {
    kt && ht && Rt.length === 0 && nn({
      activeIndex: null
    });
  }, [kt, ht, Rt.length, nn]);
  function br(re) {
    const me = ge.initialValue;
    return Array.isArray(re) && Array.isArray(me) ? !OT(re, me, (we, _e) => _i(we, _e, ee)) : re !== me;
  }
  ta(fn, () => {
    !jt || fn === "" || fn === String(Cn) || Me(!0);
  });
  function Ko() {
    const re = to(Je, ae);
    Ft !== re && $n(re, Ct(Yl));
  }
  ta(Je, () => {
    y !== "none" && (W(on), te(br(Je)), ke.change(Je), Mn && !Tn && !Qn && Ko());
  }), ta(Ft, () => {
    y === "none" && (W(on), te(Ft !== ge.initialValue), ke.change(Ft));
  }), ta(w, () => {
    !Mn || Tn || Qn || He || Ko();
  });
  const rl = FM({
    open: an ? !0 : jt,
    onOpenChange: Ql,
    elements: {
      reference: Qn ? ol : il,
      floating: gl
    }
  }), bl = A ? "grid" : "listbox", ao = jt || an, ln = ao ? "true" : "false", so = b.useMemo(() => {
    const re = il?.tagName === "INPUT", me = il == null || re, we = me || ao, _e = me ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return we && (_e.role = "combobox", _e["aria-expanded"] = ln, _e["aria-haspopup"] = bl, _e["aria-controls"] = ao ? ll?.id : void 0, _e["aria-autocomplete"] = Se), {
      reference: _e,
      floating: {
        role: "presentation"
      }
    };
  }, [il, ao, ln, bl, ll?.id, Se]), Zl = s1(rl, {
    enabled: !T && !dt && Y,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Qn ? 0 : 100,
    reason: O2
  }), $l = zM(rl, {
    enabled: !T && !dt && !an,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: an ? !0 : void 0,
    outsidePress(re) {
      const me = Tl(re);
      return !at(ol, me) && !at(Ot.current, me) && !at(nt.current, me) && !at(rn, me);
    }
  }), yl = eT(rl, {
    enabled: !T && !dt,
    id: ze,
    listRef: $e,
    activeIndex: io,
    selectedIndex: Yo,
    virtual: !0,
    loopFocus: J,
    allowEscape: J && !ht,
    focusItemOnOpen: He || y === "none" && !ht ? !1 : "auto",
    focusItemOnHover: P,
    resetOnPointerLeave: !L,
    orientation: A ? "horizontal" : void 0,
    rtl: et === "rtl",
    disabledIndices: ea,
    grid: A ? mT : void 0,
    onNavigate(re, me) {
      !me && !jt || qo === "ending" || nn(me ? {
        activeIndex: re,
        type: Re.current ? ph : hh
      } : {
        activeIndex: re
      });
    }
  }), Di = b.useMemo(() => la(yl.reference, {
    onKeyDown(re) {
      A && Ye.state.activeIndex == null && (re.key === "ArrowLeft" || re.key === "ArrowRight") && re.preventBaseUIHandler();
    }
  }, $l.reference, Zl.reference, so.reference), [yl.reference, $l.reference, Zl.reference, so.reference, A, Ye]), R = b.useMemo(() => la(XM, $l.floating), [$l.floating]), O = b.useMemo(() => la(yl.floating, so.floating), [yl.floating, so.floating]), D = b.useMemo(() => {
    const re = yl.item;
    return re ? {
      ...re,
      onFocus: void 0
    } : hl;
  }, [yl.item]);
  hT(() => {
    Ye.update({
      inline: ye,
      popupProps: R,
      listProps: O,
      inputProps: Di,
      triggerProps: ro,
      itemProps: D,
      setOpen: Ql,
      setInputValue: $n,
      setSelectedValue: xo,
      setIndices: nn,
      handleSelection: Xo,
      forceMount: Zn,
      requestSubmit: da,
      onOpenChangeComplete: ct
    });
  }), Fe(() => {
    Ye.update({
      id: ze,
      selectedValue: Je,
      open: jt,
      mounted: zi,
      transitionStatus: qo,
      items: w,
      inline: ye,
      popupProps: R,
      listProps: O,
      inputProps: Di,
      triggerProps: ro,
      openMethod: gr,
      itemProps: D,
      selectionMode: y,
      name: on,
      form: C,
      disabled: dt,
      readOnly: T,
      required: N,
      grid: A,
      virtualized: de,
      openOnInputClick: Y,
      itemToStringLabel: ae,
      modal: H,
      autoHighlight: ht,
      isItemEqualToValue: ee,
      submitOnItemClick: X,
      hasInputValue: Tn,
      inputOwnsFormValue: y === "none" && (ye || !Ye.state.inputInsidePopup)
    });
  }, [Ye, ze, Je, jt, zi, qo, w, R, O, Di, D, gr, ro, y, on, dt, T, N, A, de, Y, ae, H, ee, X, Tn, ye, ht, C]);
  const G = ir(M, ke.inputRef), ne = b.useMemo(() => ({
    query: fn,
    hasItems: kt,
    filteredItems: _t,
    flatFilteredItems: Rt
  }), [fn, kt, _t, Rt]), oe = b.useMemo(() => Array.isArray(Fn) ? "" : ns(Fn, ue), [Fn, ue]), be = pt && Array.isArray(Je) && Je.length > 0, pe = pt || y === "none" && kl ? void 0 : on, xe = b.useMemo(() => !pt || !Array.isArray(Je) || !on ? null : Je.map((re) => {
    const me = ns(re, ue);
    return /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: C,
      name: on,
      value: me,
      disabled: dt
    }, me);
  }), [pt, Je, C, on, ue, dt]), Ue = /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ S.jsx("input", {
      ...ke.getValidationProps(dt, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (Qn) {
            ol?.focus();
            return;
          }
          (ve.current || ol)?.focus();
        },
        // Handle browser autofill.
        onChange(re) {
          if (re.nativeEvent.defaultPrevented || dt || T)
            return;
          const me = re.currentTarget.value, we = me.toLowerCase(), _e = Ct(Yl, re.nativeEvent), ut = () => xt.current.findIndex((St) => ns(St, ue).toLowerCase() === we || to(St, ae).toLowerCase() === we);
          function qt() {
            if (pt)
              return;
            if (y === "none") {
              $n(me, _e);
              return;
            }
            let St = ut();
            St === -1 && (St = xt.current.findIndex((Pt, jn) => {
              const gn = tt.current[jn];
              return gn != null && gn.toLowerCase() === we;
            }));
            const sn = St === -1 ? void 0 : xt.current[St];
            sn != null && xo?.(sn, _e);
          }
          Mn && (Zn(), w && ut() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(qt);
        }
      }),
      id: ze && pe == null ? `${ze}-hidden-input` : void 0,
      form: C,
      name: pe,
      autoComplete: ie,
      disabled: dt,
      required: N && !be,
      readOnly: T,
      value: oe,
      ref: G,
      style: pe ? xh : vh,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), xe]
  });
  return /* @__PURE__ */ S.jsx(f1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ S.jsx(d1.Provider, {
      value: rl,
      children: /* @__PURE__ */ S.jsx(h1.Provider, {
        value: kt,
        children: /* @__PURE__ */ S.jsx(p1.Provider, {
          value: ne,
          children: /* @__PURE__ */ S.jsx(m1.Provider, {
            value: Ft,
            children: Ue
          })
        })
      })
    })
  });
}
const A1 = {
  ...sT,
  ...v1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Lc = 5;
function kT(n, o) {
  const r = DT(o);
  return n.clientX >= r.left - Lc && n.clientX <= r.right + Lc && n.clientY >= r.top - Lc && n.clientY <= r.bottom + Lc;
}
function DT(n) {
  const o = n.getBoundingClientRect(), r = mn(n);
  if (Px)
    return o;
  const a = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(a.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(a.width) || 0, h = parseFloat(a.height) || 0, g = parseFloat(c.width) || 0, p = parseFloat(c.height) || 0, y = Math.max(o.width, d, g), v = Math.max(o.height, h, p), x = y - o.width, C = v - o.height;
  return {
    left: o.left - x / 2,
    right: o.right + x / 2,
    top: o.top - C / 2,
    bottom: o.bottom + C / 2
  };
}
function jT(n, o) {
  return n ?? o;
}
function M1(n) {
  const o = Ee(n, Ce.mounted), r = Ee(n, Ce.popupSide), a = Ee(n, Ce.positionerElement);
  return o && a ? r : null;
}
function Tu() {
  return Cs().filteredItems.length === 0;
}
function LT(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function VT(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function T1(n, o, r) {
  const a = n.state.listRef.current[o];
  a && (n.state.selectionEventRef.current = r, a.click(), n.state.selectionEventRef.current = null);
}
const IT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    nativeButton: f = !0,
    disabled: d = !1,
    id: h,
    style: g,
    ...p
  } = o, {
    state: y,
    disabled: v,
    setTouched: x,
    setFocused: C,
    validationMode: _,
    validation: T
  } = fa(), {
    labelId: N
  } = Mu(), M = Nl(), A = Ee(M, Ce.selectionMode), w = Ee(M, Ce.disabled), z = Ee(M, Ce.readOnly), I = Ee(M, Ce.required), Y = Ee(M, Ce.positionerElement), B = Ee(M, Ce.listElement), L = Ee(M, Ce.popupId), P = Ee(M, Ce.triggerProps), J = Ee(M, Ce.inputInsidePopup), ae = Ee(M, Ce.id), ue = Ee(M, Ce.labelId), ee = Ee(M, Ce.open), de = Ee(M, Ce.selectedValue), ye = Ee(M, Ce.activeIndex), V = Ee(M, Ce.selectedIndex), H = Ee(M, Ce.hasSelectedValue), K = Au(), Se = Rh(), ie = wi(), k = v || w || d, X = Tu(), W = M1(M);
  _h({
    id: J ? h : void 0
  });
  const te = J ? h ?? ae : h, ge = jT(N, ue);
  let Ae;
  ee && J ? Ae = L ?? R1(ae) : ee && (Ae = B?.id);
  const qe = b.useRef("");
  function Te(He) {
    qe.current = He.pointerType;
  }
  const {
    reference: Oe
  } = tT(K, {
    enabled: !ee && !z && !w && A === "single",
    listRef: M.state.labelsRef,
    activeIndex: ye,
    selectedIndex: V,
    onMatch(He) {
      const Me = M.state.valuesRef.current[He];
      Me !== void 0 && M.state.setSelectedValue(Me, Ct(Yl));
    }
  }), {
    reference: it
  } = s1(K, {
    enabled: !z && !w,
    event: "mousedown"
  }), {
    buttonRef: bt,
    getButtonProps: ke
  } = Ss({
    native: f,
    disabled: k
  }), et = {
    ...y,
    open: ee,
    disabled: k,
    popupSide: W,
    listEmpty: X,
    placeholder: A === "none" ? !1 : !H
  }, ze = Ke((He) => {
    M.set("triggerElement", He);
  });
  return Kl("button", o, {
    ref: [r, bt, ze],
    state: et,
    props: [P, it, Oe, {
      id: te,
      tabIndex: J ? 0 : -1,
      role: J ? "combobox" : void 0,
      "aria-expanded": ee,
      "aria-haspopup": J ? "dialog" : "listbox",
      "aria-controls": Ae,
      "aria-required": J && I || void 0,
      "aria-labelledby": ge,
      onPointerDown: Te,
      onPointerEnter: Te,
      onFocus() {
        C(!0), !(k || z) && ie.start(0, M.state.forceMount);
      },
      onBlur(He) {
        if (!at(Y, He.relatedTarget) && (x(!0), C(!1), _ === "onBlur")) {
          const Me = A === "none" ? Se : de;
          T.commit(Me);
        }
      },
      onMouseDown(He) {
        if (k || z || (J || K.set("domReferenceElement", He.currentTarget), M.state.forceMount(), qe.current !== "touch" && (M.state.inputRef.current?.focus(), J || He.preventDefault()), ee))
          return;
        const Me = tn(He.currentTarget);
        function Qe(Ne) {
          const $e = M.state.triggerElement;
          if (!$e)
            return;
          const tt = Tl(Ne), Xe = M.state.positionerElement, ve = M.state.listElement;
          at($e, tt) || at(Xe, tt) || at(ve, tt) || kT(Ne, $e) || M.state.setOpen(!1, Ct(N2, Ne));
        }
        J && Me.addEventListener("mouseup", Qe, {
          once: !0
        });
      },
      onKeyDown(He) {
        z || (He.key === "ArrowDown" || He.key === "ArrowUp") && (kn(He), M.state.setOpen(!0, Ct(_p, He.nativeEvent)), M.state.inputRef.current?.focus());
      }
    }, T.getValidationProps(k, p), ke],
    stateAttributesMapping: A1
  });
}), HT = /* @__PURE__ */ b.createContext(void 0);
function UT() {
  return b.useContext(HT);
}
const O1 = /* @__PURE__ */ b.createContext(void 0);
function Mh(n) {
  const o = b.useContext(O1);
  if (o === void 0 && !n)
    throw new Error(yo(21));
  return o;
}
const N1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Nl(), {
    buttonRef: c,
    getButtonProps: f
  } = Ss({
    native: !1
  }), d = ir(r, c);
  function h(p) {
    a.state.setOpen(!1, Ct(T2, p.nativeEvent, p.currentTarget));
  }
  const g = f({
    onClick: h
  });
  return /* @__PURE__ */ S.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: xh
  });
}), BT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    id: d,
    style: h,
    ...g
  } = o, {
    state: p,
    disabled: y,
    setTouched: v,
    setFocused: x,
    validationMode: C,
    validation: _
  } = fa(), {
    labelId: T
  } = Mu(), N = UT(), A = !!Mh(!0), w = Nl(), z = Rh(), I = Ah(), Y = Ee(w, Ce.required), B = Ee(w, Ce.disabled), L = Ee(w, Ce.readOnly), P = Ee(w, Ce.name), J = Ee(w, Ce.form), ae = Ee(w, Ce.selectionMode), ue = Ee(w, Ce.autoHighlight), ee = Ee(w, Ce.inputProps), de = Ee(w, Ce.triggerProps), ye = Ee(w, Ce.open), V = Ee(w, Ce.mounted), H = Ee(w, Ce.selectedValue), K = Ee(w, Ce.id), Se = Ee(w, Ce.inline), ie = Ee(w, Ce.modal), k = !!ue, X = M1(w), W = y || B || f, te = Tu(), ge = A || Se, Ae = !ge || ie, qe = gu(d ?? (ge ? void 0 : K)), Te = A ? y1 : p, [Oe, it] = b.useState(null), bt = b.useRef(!1), ke = b.useRef(null), et = b.useRef(!1), ze = ae === "none" && !A, Le = Ke((ve) => {
    const F = A || w.state.inline;
    F && !w.state.hasInputValue && w.state.setInputValue("", Ct(Yl)), w.update({
      inputElement: ve,
      inputInsidePopup: F,
      inputOwnsFormValue: ze
    });
  }), He = A ? g : _.getValidationProps(W, g);
  function Me() {
    w.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: w.state.keyboardActiveRef.current ? ph : hh
    });
  }
  function Qe() {
    w.state.keyboardActiveRef.current = !1;
  }
  const Ne = {
    ...Te,
    open: ye,
    disabled: W,
    readOnly: L,
    popupSide: X,
    listEmpty: te
  };
  function $e(ve) {
    if (!N)
      return;
    let F;
    const {
      highlightedChipIndex: se
    } = N, Ie = N.chipsRef.current.length, [Re, Ge] = LT(I);
    return se !== void 0 ? (ve.key === Re ? (ve.preventDefault(), se > 0 ? F = se - 1 : F = void 0) : ve.key === Ge ? (ve.preventDefault(), se < Ie - 1 ? F = se + 1 : F = void 0) : (ve.key === "Backspace" || ve.key === "Delete") && (ve.preventDefault(), F = VT(se, H.length), Me()), F) : (ve.key === Re && (ve.currentTarget.selectionStart ?? 0) === 0 && H.length > 0 && (ve.preventDefault(), F = Ie > 0 ? Ie - 1 : void 0), F);
  }
  const tt = Kl("input", o, {
    state: Ne,
    ref: [r, w.state.inputRef, Le],
    props: [ee, de, {
      value: Oe ?? z,
      "aria-readonly": L || void 0,
      "aria-required": Y || void 0,
      "aria-labelledby": T,
      disabled: W,
      readOnly: L,
      required: ae === "none" ? Y : void 0,
      form: J,
      ...ze && P && {
        name: P
      },
      id: qe,
      onFocus() {
        if (x(!0), !Se || !et.current)
          return;
        et.current = !1;
        const ve = ke.current;
        ve == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(w.state.valuesRef.current, ve) || w.state.setIndices({
          activeIndex: ve
        });
      },
      onBlur() {
        v(!0), x(!1);
        const ve = w.state.activeIndex;
        if (Se && ve !== null && ue !== "always" && (ke.current = ve, et.current = !0, w.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const F = ae === "none" ? z : H;
          _.commit(F);
        }
      },
      onCompositionStart(ve) {
        eu || (bt.current = !0, it(ve.currentTarget.value));
      },
      onCompositionEnd(ve) {
        bt.current = !1;
        const F = ve.currentTarget.value;
        it(null), w.state.setInputValue(F, Ct(rs, ve.nativeEvent));
      },
      onChange(ve) {
        const F = ve.nativeEvent, se = F.inputType, Ie = !se || se === "insertReplacementText", Re = bt.current || !Ie;
        function Ge(Yt) {
          L || W || !Yt || !Re || (w.state.setOpen(!0, Ct(rs, F)), k || Me());
        }
        if (bt.current) {
          const Yt = ve.currentTarget.value;
          it(Yt), Yt === "" && !w.state.openOnInputClick && !w.state.inputInsidePopup && w.state.setOpen(!1, Ct(mo, F));
          const zt = Yt.trim(), xt = k && zt !== "";
          Ge(zt), ye && w.state.activeIndex !== null && !xt && Me();
          return;
        }
        const nt = Ct(rs, F);
        if (w.state.setInputValue(ve.currentTarget.value, nt), nt.isCanceled)
          return;
        const Ot = ve.currentTarget.value === "", wt = Ct(mo, F);
        Ot && !w.state.inputInsidePopup && (ae === "single" && w.state.setSelectedValue(null, wt), w.state.openOnInputClick || w.state.setOpen(!1, wt)), Ge(ve.currentTarget.value.trim()), ye && w.state.activeIndex !== null && !k && Me();
      },
      onKeyDown(ve) {
        if (W || L || ve.ctrlKey || ve.shiftKey || ve.altKey || ve.metaKey)
          return;
        w.state.keyboardActiveRef.current = !0;
        const F = ve.currentTarget, se = F.scrollWidth - F.clientWidth, Ie = I === "rtl";
        if (ve.key === "Home") {
          kn(ve);
          const nt = $y && Ie ? F.value.length : 0;
          F.setSelectionRange(nt, nt), F.scrollLeft = 0;
          return;
        }
        if (ve.key === "End") {
          kn(ve);
          const nt = $y && Ie ? 0 : F.value.length;
          F.setSelectionRange(nt, nt), F.scrollLeft = Ie ? -se : se;
          return;
        }
        if (!V && ve.key === "Escape") {
          const nt = ae === "multiple" && Array.isArray(H) ? H.length === 0 : H === null, Ot = Ct(dh, ve.nativeEvent), wt = ae === "multiple" ? [] : null;
          w.state.setInputValue("", Ot), w.state.setSelectedValue(wt, Ot), !nt && !w.state.inline && !Ot.isPropagationAllowed && ve.stopPropagation();
          return;
        }
        if (N && ve.key === "Backspace" && F.value === "" && N.highlightedChipIndex === void 0 && Array.isArray(H) && H.length > 0) {
          const nt = N.chipsRef.current.length, Ot = nt > 0 ? nt - 1 : H.length - 1, wt = H.filter((Yt, zt) => zt !== Ot);
          Me(), w.state.setSelectedValue(wt, Ct(Yl, ve.nativeEvent));
          return;
        }
        const Re = N?.highlightedChipIndex !== void 0, Ge = $e(ve);
        if (N?.setHighlightedChipIndex(Ge), Ge !== void 0 ? N?.chipsRef.current[Ge]?.focus() : Re && w.state.inputRef.current?.focus(), ve.which !== 229 && ve.key === "Enter" && ye) {
          const nt = w.state.activeIndex, Ot = ve.nativeEvent;
          if (nt === null) {
            if (Se)
              return;
            w.state.setOpen(!1, Ct(Yl, Ot));
            return;
          }
          kn(ve), T1(w, nt, Ot);
        }
      },
      onPointerMove: Qe,
      onPointerDown: Qe
    }, He],
    stateAttributesMapping: A1
  }), Xe = A ? /* @__PURE__ */ S.jsx(S1.Provider, {
    value: x1,
    children: tt
  }) : tt;
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [ye && Ae && /* @__PURE__ */ S.jsx(N1, {
      ref: w.state.startDismissRef
    }), Xe]
  });
}), GT = {
  ...yu,
  ...aT
}, YT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    nativeButton: d = !0,
    keepMounted: h = !1,
    style: g,
    ...p
  } = o, {
    disabled: y
  } = fa(), v = Nl(), x = Ee(v, Ce.selectionMode), C = Ee(v, Ce.disabled), _ = Ee(v, Ce.readOnly), T = Ee(v, Ce.open), N = Ee(v, Ce.selectedValue), M = Ee(v, Ce.hasSelectionChips), A = Rh();
  let w = !1;
  x === "none" ? w = A !== "" : x === "single" ? w = N != null : w = M;
  const z = y || C || f, {
    buttonRef: I,
    getButtonProps: Y
  } = Ss({
    native: d,
    disabled: z
  }), {
    mounted: B,
    transitionStatus: L,
    setMounted: P
  } = mh(w), J = {
    disabled: z,
    visible: w,
    open: T,
    transitionStatus: L
  };
  vu({
    open: w,
    ref: v.state.clearRef,
    onComplete() {
      w || P(!1);
    }
  });
  const ae = Kl("button", o, {
    state: J,
    ref: [r, I, v.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(ee) {
        ee.preventDefault();
      },
      onClick(ee) {
        if (z || _)
          return;
        const de = v.state.keyboardActiveRef.current ? ph : hh;
        v.state.setInputValue("", Ct(Fy, ee.nativeEvent)), x !== "none" ? (v.state.setSelectedValue(Array.isArray(N) ? [] : null, Ct(Fy, ee.nativeEvent)), v.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: de
        })) : v.state.setIndices({
          activeIndex: null,
          type: de
        }), v.state.inputRef.current?.focus();
      }
    }, p, Y],
    stateAttributesMapping: GT
  });
  return h || B ? ae : null;
}), qT = /* @__PURE__ */ b.createContext(null);
function PT() {
  return b.useContext(qT);
}
function XT(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = Cs(), a = PT(), c = a ? a.items : r;
  return /* @__PURE__ */ S.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const KT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var a;
  const {
    render: c,
    className: f,
    style: d,
    children: h,
    ...g
  } = o, p = Nl(), y = Au(), v = !!Mh(!0), {
    filteredItems: x,
    hasItems: C
  } = Cs(), _ = Ee(p, Ce.selectionMode), T = Ee(p, Ce.grid), N = Ee(p, Ce.listProps), M = Ee(p, Ce.virtualized), A = Ee(p, Ce.forceMounted), w = _ === "multiple", z = x.length === 0, I = Ke((ue) => {
    p.set("positionerElement", ue);
  }), Y = Ke((ue) => {
    p.set("listElement", ue);
  }), B = b.useMemo(() => typeof h == "function" ? a || (a = /* @__PURE__ */ S.jsx(XT, {
    children: h
  })) : h, [h]), L = {
    empty: z
  }, P = y.useState("floatingId"), J = Kl("div", o, {
    state: L,
    ref: [r, Y, v ? null : I],
    props: [N, {
      children: B,
      tabIndex: -1,
      id: P,
      role: T ? "grid" : "listbox",
      "aria-multiselectable": w ? "true" : void 0,
      onKeyDown(ue) {
        if (!(p.state.disabled || p.state.readOnly) && ue.key === "Enter") {
          const ee = p.state.activeIndex;
          if (ee == null)
            return;
          kn(ue), T1(p, ee, ue.nativeEvent);
        }
      },
      onKeyDownCapture() {
        p.state.keyboardActiveRef.current = !0;
      },
      onPointerMoveCapture() {
        p.state.keyboardActiveRef.current = !1;
      }
    }, g]
  });
  if (M)
    return J;
  const ae = C && !A ? void 0 : p.state.labelsRef;
  return /* @__PURE__ */ S.jsx(l2, {
    elementsRef: p.state.listRef,
    labelsRef: ae,
    children: J
  });
}), FT = "⁠", QT = 200;
function ZT(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const a = o.currentNode;
    a.nodeValue !== "" && (r = a);
  }
  return r;
}
function $T() {
  const n = wi(), o = b.useRef(null);
  return b.useEffect(() => {
    if (Es)
      return;
    const r = o.current;
    if (r == null)
      return;
    const a = ZT(r);
    if (a == null)
      return;
    const c = a.data, f = `${c}${FT}`;
    return a.nodeValue = f, n.start(QT, () => {
      a.nodeValue === f && (a.nodeValue = c);
    }), () => {
      n.clear(), a.nodeValue === f && (a.nodeValue = c);
    };
  }, [o, n]), o;
}
const z1 = /* @__PURE__ */ b.createContext(void 0);
function JT() {
  const n = b.useContext(z1);
  if (n === void 0)
    throw new Error(yo(20));
  return n;
}
const WT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: a = !1,
    ...c
  } = o, f = Nl(), d = Ee(f, Ce.mounted), h = Ee(f, Ce.forceMounted);
  return d || a || h ? /* @__PURE__ */ S.jsx(z1.Provider, {
    value: a,
    children: /* @__PURE__ */ S.jsx(CM, {
      ref: r,
      ...c
    })
  }) : null;
}), eO = (n) => ({
  name: "arrow",
  options: n,
  async fn(o) {
    const {
      x: r,
      y: a,
      placement: c,
      rects: f,
      platform: d,
      elements: h,
      middlewareData: g
    } = o, {
      element: p,
      padding: y = 0,
      offsetParent: v = "real"
    } = Ei(n, o) || {};
    if (p == null)
      return {};
    const x = B0(y), C = {
      x: r,
      y: a
    }, _ = Qp(c), T = Fp(_), N = await d.getDimensions(p), M = _ === "y", A = M ? "top" : "left", w = M ? "bottom" : "right", z = M ? "clientHeight" : "clientWidth", I = f.reference[T] + f.reference[_] - C[_] - f.floating[T], Y = C[_] - f.reference[_], B = v === "real" ? await d.getOffsetParent?.(p) : h.floating;
    let L = h.floating[z] || f.floating[T];
    (!L || !await d.isElement?.(B)) && (L = h.floating[z] || f.floating[T]);
    const P = I / 2 - Y / 2, J = L / 2 - N[T] / 2 - 1, ae = Math.min(x[A], J), ue = Math.min(x[w], J), ee = ae, de = L - N[T] - ue, ye = L / 2 - N[T] / 2 + P, V = U0(ee, ye, de), H = !g.arrow && Ti(c) != null && ye !== V && f.reference[T] / 2 - (ye < ee ? ae : ue) - N[T] / 2 < 0, K = H ? ye < ee ? ye - ee : ye - de : 0;
    return {
      [_]: C[_] + K,
      data: {
        [_]: V,
        centerOffset: ye - V - K,
        ...H && {
          alignmentOffset: K
        }
      },
      reset: H
    };
  }
}), tO = (n, o) => ({
  ...eO(n),
  options: [n, o]
}), nO = {
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
}, lO = {
  sideX: "left",
  sideY: "top"
}, xv = "--available-width", Sv = "--available-height";
function k1(n, o, r) {
  const a = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: a ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: a ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function Ev(n, o, r) {
  const {
    rects: a,
    placement: c
  } = n;
  return {
    side: k1(o, Xl(c), r),
    align: Ti(c) || "center",
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
function oO(n) {
  return iO(n, QM);
}
function iO(n, o) {
  const {
    // Public parameters
    anchor: r,
    positionMethod: a = "absolute",
    side: c = "bottom",
    sideOffset: f = 0,
    align: d = "center",
    alignOffset: h = 0,
    collisionBoundary: g,
    collisionPadding: p = 5,
    sticky: y = !1,
    arrowPadding: v = 5,
    disableAnchorTracking: x = !1,
    inline: C,
    // Private parameters
    keepMounted: _ = !1,
    floatingRootContext: T,
    mounted: N,
    collisionAvoidance: M,
    shift: A,
    nodeId: w,
    adaptiveOrigin: z,
    lazyFlip: I = !1,
    externalTree: Y
  } = n, [B, L] = b.useState(null);
  !N && B !== null && L(null);
  const P = M.side || "flip", J = M.align || "flip", ae = M.fallbackAxisSide || "end", ue = A?.crossAxis ?? !1, ee = A?.rootBoundary, de = typeof r == "function" ? r : void 0, ye = Ke(de), V = de ? ye : r, H = pl(r), K = pl(N), ie = Ah() === "rtl", k = B || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": ie ? "left" : "right",
    "inline-start": ie ? "right" : "left"
  }[c], X = d === "center" ? k : `${k}-${d}`;
  let W = p;
  typeof W == "number" ? W = {
    top: W,
    right: W,
    bottom: W,
    left: W
  } : W && (W = {
    top: W.top || 0,
    right: W.right || 0,
    bottom: W.bottom || 0,
    left: W.left || 0
  });
  const te = 1, ge = c === "bottom" ? te : 0, Ae = c === "top" ? te : 0, qe = c === "right" ? te : 0, Te = c === "left" ? te : 0, Oe = {
    boundary: g === "clipping-ancestors" ? "clippingAncestors" : g,
    padding: W
  }, it = b.useRef(null), bt = pl(f), ke = pl(h), et = typeof f != "function" ? f : 0, ze = typeof h != "function" ? h : 0, Le = [];
  C && Le.push(C), Le.push(H_((ot) => {
    const ht = Ev(ot, c, ie), Je = typeof bt.current == "function" ? bt.current(ht) : bt.current, Dt = typeof ke.current == "function" ? ke.current(ht) : ke.current;
    return {
      mainAxis: Je,
      crossAxis: Dt,
      alignmentAxis: Dt
    };
  }, [et, ze, ie, c]));
  const He = J === "none" && P !== "shift", Me = !He && (y || ue || P === "shift"), Qe = P === "none" ? null : G_({
    ...Oe,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: W.top + te + ge,
      right: W.right + te + Te,
      bottom: W.bottom + te + Ae,
      left: W.left + te + qe
    },
    mainAxis: !ue && P === "flip",
    crossAxis: J === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: ae
  }), Ne = He ? null : U_({
    ...Oe,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: ee,
    mainAxis: J !== "none",
    crossAxis: Me,
    limiter: y || ue ? void 0 : B_((ot) => {
      if (!it.current)
        return {};
      const {
        width: ht,
        height: Je
      } = it.current.getBoundingClientRect(), Dt = Pl(Xl(ot.placement)), On = Dt === "y" ? ht : Je, Cn = Dt === "y" ? W.left + W.right : W.top + W.bottom;
      return {
        offset: On / 2 + Cn / 2
      };
    })
  }, [Oe, y, ue, ee, W, J]);
  P === "shift" || J === "shift" || d === "center" ? Le.push(Ne, Qe) : Le.push(Qe, Ne), Le.push(Y_({
    ...Oe,
    apply({
      elements: {
        floating: ot
      },
      availableWidth: ht,
      availableHeight: Je,
      rects: Dt
    }) {
      if (!K.current)
        return;
      const On = ot.style;
      On.setProperty(xv, `${ht}px`), On.setProperty(Sv, `${Je}px`);
      const Cn = mn(ot).devicePixelRatio || 1, {
        x: Ft,
        y: tl,
        width: jt,
        height: lo
      } = Dt.reference, Kn = (Math.round((Ft + jt) * Cn) - Math.round(Ft * Cn)) / Cn, fn = (Math.round((tl + lo) * Cn) - Math.round(tl * Cn)) / Cn;
      On.setProperty("--anchor-width", `${Kn}px`), On.setProperty("--anchor-height", `${fn}px`);
    }
  }), tO((ot) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: it.current || tn(ot.elements.floating).createElement("div"),
    padding: v,
    offsetParent: "floating"
  }), [v]), {
    name: "transformOrigin",
    fn(ot) {
      const {
        elements: ht,
        middlewareData: Je,
        placement: Dt,
        rects: On,
        y: Cn
      } = ot, Ft = Xl(Dt), tl = Pl(Ft), jt = it.current, lo = Je.arrow?.x || 0, Kn = Je.arrow?.y || 0, fn = jt?.clientWidth || 0, oo = jt?.clientHeight || 0, zl = lo + fn / 2, nl = Kn + oo / 2, vo = Math.abs(Je.shift?.y || 0), Rn = On.reference.height / 2, _t = typeof f == "function" ? f(Ev(ot, c, ie)) : f, Rt = vo > _t, Ye = {
        top: `${zl}px calc(100% + ${_t}px)`,
        bottom: `${zl}px ${-_t}px`,
        left: `calc(100% + ${_t}px) ${nl}px`,
        right: `${-_t}px ${nl}px`
      }[Ft], Fn = `${zl}px ${On.reference.y + Rn - Cn}px`;
      return ht.floating.style.setProperty("--transform-origin", Me && tl === "y" && Rt ? Fn : Ye), {};
    }
  }, nO, z), Fe(() => {
    !N && T && T.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [N, T]);
  const $e = b.useMemo(() => ({
    elementResize: !x && typeof ResizeObserver < "u",
    layoutShift: !x && typeof IntersectionObserver < "u"
  }), [x]), {
    refs: tt,
    elements: Xe,
    x: ve,
    y: F,
    middlewareData: se,
    update: Ie,
    placement: Re,
    context: Ge,
    isPositioned: nt,
    floatingStyles: Ot
  } = o({
    rootContext: T,
    open: _ ? N : void 0,
    placement: X,
    middleware: Le,
    strategy: a,
    whileElementsMounted: _ ? void 0 : (...ot) => Vy(...ot, $e),
    nodeId: w,
    externalTree: Y
  }), {
    sideX: wt,
    sideY: Yt
  } = se.adaptiveOrigin || lO, zt = nt ? a : "fixed", xt = b.useMemo(() => {
    let ot;
    return nt ? z ? ot = {
      position: zt,
      [wt]: ve,
      [Yt]: F
    } : ot = {
      ...Ot,
      position: zt
    } : ot = {
      position: zt,
      top: 0,
      left: 0
    }, ot[xv] = "100vw", ot[Sv] = "100vh", nt || (ot.opacity = 0), ot;
  }, [z, zt, wt, ve, Yt, F, Ot, nt]), Wt = b.useRef(null);
  Fe(() => {
    if (!N)
      return;
    const ot = H.current, ht = typeof ot == "function" ? ot() : ot, Dt = (Cv(ht) ? ht.current : ht) || null || null;
    Dt !== Wt.current && (tt.setPositionReference(Dt), Wt.current = Dt);
  }, [N, tt, V, H]), b.useEffect(() => {
    if (!N)
      return;
    const ot = H.current;
    typeof ot != "function" && Cv(ot) && ot.current !== Wt.current && (tt.setPositionReference(ot.current), Wt.current = ot.current);
  }, [N, tt, V, H]), b.useEffect(() => {
    if (_ && N && Xe.reference && Xe.floating)
      return Vy(Xe.reference, Xe.floating, Ie, $e);
  }, [_, N, Xe, Ie, $e]);
  const dt = Xl(Re), on = k1(c, dt, ie), pt = Ti(Re) || "center", Mn = !!se.hide?.referenceHidden;
  Fe(() => {
    I && N && nt && dt !== k && L(dt);
  }, [I, N, nt, dt, k]);
  const Tn = b.useMemo(() => ({
    position: "absolute",
    top: se.arrow?.y,
    left: se.arrow?.x
  }), [se.arrow]), kt = se.arrow?.centerOffset !== 0;
  return b.useMemo(() => ({
    positionerStyles: xt,
    arrowStyles: Tn,
    arrowRef: it,
    arrowUncentered: kt,
    side: on,
    align: pt,
    physicalSide: dt,
    anchorHidden: Mn,
    refs: tt,
    context: Ge,
    isPositioned: nt,
    update: Ie
  }), [xt, Tn, it, kt, on, pt, dt, Mn, tt, Ge, nt, Ie]);
}
function Cv(n) {
  return n != null && "current" in n;
}
function D1(n) {
  return n === "starting" ? bM : hl;
}
function rO(n, o, {
  styles: r,
  transitionStatus: a,
  props: c,
  refs: f,
  hidden: d,
  inert: h = !1
}) {
  const g = {
    ...r
  };
  return h && (g.pointerEvents = "none"), Kl("div", n, {
    state: o,
    ref: f,
    props: [{
      role: "presentation",
      hidden: d,
      style: g
    }, D1(a), c],
    stateAttributesMapping: Ch
  });
}
const aO = 20;
function sO(n, o, r, a) {
  const [c, f] = b.useState(!1);
  Fe(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = tn(r).documentElement.clientWidth, h = r.offsetWidth;
    f(d > 0 && h > 0 && h >= d - aO);
  }, [n, o, r]), nM(n && (!o || c), a);
}
const cO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    anchor: f,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod: d,
    side: h,
    align: g,
    sideOffset: p,
    alignOffset: y,
    collisionBoundary: v = "clipping-ancestors",
    collisionPadding: x,
    arrowPadding: C,
    sticky: _,
    disableAnchorTracking: T = !1,
    collisionAvoidance: N = vM,
    style: M,
    ...A
  } = o, w = Nl(), z = Au(), I = JT(), Y = Ee(w, Ce.modal), B = Ee(w, Ce.open), L = Ee(w, Ce.mounted), P = Ee(w, Ce.openMethod), J = Ee(w, Ce.positionerElement), ae = Ee(w, Ce.triggerElement), ue = Ee(w, Ce.inputElement), ee = Ee(w, Ce.inputGroupElement), de = Ee(w, Ce.inputInsidePopup), ye = Ee(w, Ce.transitionStatus), V = Tu(), K = oO({
    anchor: f ?? (de ? ae : ee ?? ue),
    floatingRootContext: z,
    positionMethod: d,
    mounted: L,
    side: h,
    sideOffset: p,
    align: g,
    alignOffset: y,
    arrowPadding: C,
    collisionBoundary: v,
    collisionPadding: x,
    sticky: _,
    disableAnchorTracking: T,
    keepMounted: I,
    collisionAvoidance: N,
    lazyFlip: !0
  });
  sO(B && Y, P === "touch", J, ae);
  const Se = {
    open: B,
    side: K.side,
    align: K.align,
    anchorHidden: K.anchorHidden,
    empty: V
  };
  Fe(() => {
    w.set("popupSide", K.side);
  }, [w, K.side]);
  const ie = Ke((X) => {
    w.set("positionerElement", X);
  }), k = rO(o, Se, {
    styles: K.positionerStyles,
    transitionStatus: ye,
    props: A,
    refs: [r, ie],
    hidden: !L,
    inert: !B
  });
  return /* @__PURE__ */ S.jsxs(O1.Provider, {
    value: K,
    children: [L && Y && /* @__PURE__ */ S.jsx(uT, {
      inert: cT(!B),
      cutout: ee ?? ue ?? ae
    }), k]
  });
}), uO = {
  ...Ch,
  ...yu
}, fO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: h,
    ...g
  } = o, p = Nl(), y = Mh(), v = Au(), x = Ee(p, Ce.mounted), C = Ee(p, Ce.open), _ = Ee(p, Ce.openMethod), T = Ee(p, Ce.popupProps), N = Ee(p, Ce.transitionStatus), M = Ee(p, Ce.inputInsidePopup), A = Ee(p, Ce.inputElement), w = Ee(p, Ce.modal), z = Ee(p, Ce.id), I = Tu(), Y = g.id ?? (M ? R1(z) : void 0);
  Fe(() => (p.set("popupId", p.state.popupRef.current?.id || Y), () => {
    p.set("popupId", void 0);
  }), [p, Y]), vu({
    open: C,
    ref: p.state.popupRef,
    onComplete() {
      C && p.state.onOpenChangeComplete(!0);
    }
  });
  const B = {
    open: C,
    side: y.side,
    align: y.align,
    anchorHidden: y.anchorHidden,
    transitionStatus: N,
    empty: I
  }, L = Kl("div", o, {
    state: B,
    ref: [r, p.state.popupRef],
    props: [T, {
      id: Y,
      role: M ? "dialog" : "presentation",
      onFocus(ee) {
        const de = Tl(ee.nativeEvent);
        _ !== "touch" && (at(p.state.listElement, de) || de === ee.currentTarget) && p.state.inputRef.current?.focus();
      }
    }, D1(N), g],
    stateAttributesMapping: uO
  }), J = d === void 0 ? M ? (ee) => ee === "touch" ? p.state.popupRef.current : A : !1 : d;
  let ae;
  h != null ? ae = h : ae = M ? void 0 : !1;
  const ue = !M || w;
  return /* @__PURE__ */ S.jsx(TM, {
    context: v,
    disabled: !x,
    modal: ue,
    openInteractionType: _,
    initialFocus: J,
    returnFocus: ae,
    getInsideElements: () => [p.state.startDismissRef.current, p.state.endDismissRef.current],
    children: /* @__PURE__ */ S.jsxs(b.Fragment, {
      children: [L, ue && /* @__PURE__ */ S.jsx(N1, {
        ref: p.state.endDismissRef
      })]
    })
  });
}), j1 = /* @__PURE__ */ b.createContext(void 0);
function L1() {
  const n = b.useContext(j1);
  if (!n)
    throw new Error(yo(19));
  return n;
}
const dO = /* @__PURE__ */ b.createContext(!1);
function pO() {
  return b.useContext(dO);
}
function V1(n) {
  const {
    componentProps: o,
    forwardedRef: r,
    virtualized: a,
    indexFromFilter: c
  } = n, {
    render: f,
    className: d,
    style: h,
    value: g = null,
    index: p,
    disabled: y = !1,
    nativeButton: v = !1,
    ...x
  } = o, C = b.useRef(null), _ = D2({
    guess: !0,
    index: p,
    textRef: C
  }), T = Nl(), N = pO(), M = gT(), A = Ee(T, Ce.selectionMode), w = Ee(T, Ce.disabled), z = Ee(T, Ce.readOnly), I = Ee(T, Ce.isItemEqualToValue), Y = w || y, B = A !== "none", L = p ?? c ?? _.index, P = L !== -1, J = Ee(T, Ce.id), ae = Ee(T, Ce.isActive, L), ue = Ee(T, Ce.isSelected, g), ee = Ee(T, Ce.itemProps), de = b.useRef(null), ye = J != null && P ? `${J}-${L}` : void 0, V = ue && B;
  Fe(() => {
    if (!(P && (a || p != null)))
      return;
    const ge = T.state.listRef.current;
    return ge[L] = de.current, () => {
      delete ge[L];
    };
  }, [P, a, L, p, T]), Fe(() => {
    if (!P || M)
      return;
    const te = T.state.valuesRef.current;
    return te[L] = g, () => {
      delete te[L];
    };
  }, [P, M, L, g, T]), Fe(() => {
    if (!P || M)
      return;
    const te = T.state.selectedValue, ge = Array.isArray(te) ? te[te.length - 1] : te;
    _i(g, ge, I) && T.set("selectedIndex", L);
  }, [P, M, T, L, g, I]);
  const {
    getButtonProps: H,
    buttonRef: K
  } = Ss({
    disabled: Y,
    focusableWhenDisabled: !0,
    native: v,
    composite: !0
  }), Se = {
    disabled: Y,
    selected: V,
    highlighted: ae
  };
  function ie(te) {
    function ge() {
      T.state.handleSelection(te, g);
    }
    T.state.submitOnItemClick ? (sa.flushSync(ge), T.state.requestSubmit()) : ge();
  }
  const k = {
    id: ye,
    role: N ? "gridcell" : "option",
    "aria-selected": B ? V : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(te) {
      te.isPrimary && (T.state.pointerDownItemRef.current = te.currentTarget), te.preventDefault();
    },
    onMouseDown(te) {
      te.preventDefault();
    },
    onClick(te) {
      Y || z || ie(te.nativeEvent);
    },
    onMouseUp(te) {
      const ge = T.state.pointerDownItemRef.current === te.currentTarget;
      T.state.pointerDownItemRef.current = null, !(Y || z || te.button !== 0 || ge || !ae) && ie(te.nativeEvent);
    }
  }, X = Kl("div", o, {
    ref: [K, r, _.ref, de],
    state: Se,
    props: [ee, k, x, H]
  }), W = b.useMemo(() => ({
    selected: V,
    textRef: C
  }), [V, C]);
  return /* @__PURE__ */ S.jsx(j1.Provider, {
    value: W,
    children: X
  });
}
function hO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, a = Nl(), c = Ee(a, Ce.isItemEqualToValue), {
    flatFilteredItems: f
  } = Cs(), d = g1(f, o.value ?? null, c);
  return /* @__PURE__ */ S.jsx(V1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const mO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Nl(), c = Ee(a, Ce.virtualized);
  return c && o.index == null ? /* @__PURE__ */ S.jsx(hO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ S.jsx(V1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), gO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    ...h
  } = o, {
    filteredItems: g
  } = Cs(), p = Nl(), y = $T(), v = g.length === 0 ? d : null;
  return Kl("div", o, {
    ref: [r, p.state.emptyRef, y],
    props: [{
      children: v,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, h]
  });
});
function bO(n, o, r, a = !0, c) {
  const [f, d] = b.useState(), h = gu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
  return Fe(() => {
    const p = n || o || !a ? void 0 : yO(r.current, h);
    f !== p && d(p);
  }), g;
}
function yO(n, o) {
  const r = vO(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function vO(n) {
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
function xO(n) {
  const {
    multiple: o = !1,
    defaultValue: r,
    value: a,
    onValueChange: c,
    autoComplete: f,
    ...d
  } = n;
  return /* @__PURE__ */ S.jsx(zT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: a,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function SO(n) {
  const {
    children: o,
    placeholder: r
  } = n, a = Nl(), c = Ee(a, Ce.itemToStringLabel), f = Ee(a, Ce.selectedValue), d = Ee(a, Ce.items), h = Ee(a, Ce.selectionMode) === "multiple", g = Ee(a, Ce.hasSelectedValue), p = !g && r != null && o == null, y = Ee(a, Ce.hasNullItemLabel, p);
  let v = null;
  return typeof o == "function" ? v = o(f) : o != null ? v = o : !g && r != null && !y ? v = r : h && Array.isArray(f) ? v = ST(f, d, c) : v = b1(f, d, c), /* @__PURE__ */ S.jsx(b.Fragment, {
    children: v
  });
}
const EO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: a
  } = L1();
  return o.keepMounted || a ? /* @__PURE__ */ S.jsx(CO, {
    ...o,
    ref: r
  }) : null;
}), CO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: a,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: h
  } = L1(), g = b.useRef(null), {
    transitionStatus: p,
    setMounted: y
  } = mh(h), x = Kl("span", n, {
    ref: [o, g],
    state: {
      selected: h,
      transitionStatus: p
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, d],
    stateAttributesMapping: yu
  });
  return vu({
    open: h,
    ref: g,
    onComplete() {
      h || y(!1);
    }
  }), x;
})), I1 = /* @__PURE__ */ b.createContext(void 0);
function RO() {
  const n = b.useContext(I1);
  if (n === void 0)
    throw new Error(yo(63));
  return n;
}
const H1 = {
  ...v1,
  checked(n) {
    return n ? {
      "data-checked": ""
    } : {
      "data-unchecked": ""
    };
  }
}, wO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: a,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: h,
    id: g,
    inputRef: p,
    name: y,
    nativeButton: v = !1,
    onCheckedChange: x,
    readOnly: C = !1,
    required: _ = !1,
    disabled: T = !1,
    render: N,
    uncheckedValue: M,
    value: A,
    style: w,
    ...z
  } = o, {
    clearErrors: I
  } = C1(), {
    state: Y,
    setTouched: B,
    setDirty: L,
    validityData: P,
    setFilled: J,
    setFocused: ae,
    validationMode: ue,
    disabled: ee,
    name: de,
    validation: ye
  } = fa(), {
    labelId: V
  } = Mu(), H = ee || T, K = de ?? y, Se = b.useRef(null), ie = ir(Se, p, ye.inputRef), k = b.useRef(null), X = gu(), W = _h({
    id: g,
    implicit: !1,
    controlRef: k
  }), te = v ? void 0 : W, [ge, Ae] = qc({
    controlled: a,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  E1(k, X, ge, void 0, !H, y), Fe(() => {
    Se.current && J(Se.current.checked);
  }, [J]), ta(ge, () => {
    I(K), L(ge !== P.initialValue), J(ge), ye.change(ge);
  });
  const {
    getButtonProps: qe,
    buttonRef: Te
  } = Ss({
    disabled: H,
    native: v
  }), Oe = bO(d, V, Se, !v, te), it = {
    id: v ? W : X,
    role: "switch",
    "aria-checked": ge,
    "aria-readonly": C || void 0,
    "aria-required": _ || void 0,
    "aria-labelledby": Oe,
    onFocus() {
      H || ae(!0);
    },
    onBlur() {
      const ze = Se.current;
      !ze || H || (B(!0), ae(!1), ue === "onBlur" && ye.commit(ze.checked));
    },
    onClick(ze) {
      if (C || H)
        return;
      ze.preventDefault();
      const Le = Se.current;
      Le && Pc(Le, ze);
    }
  }, bt = {
    ...ye.getValidationProps(H),
    checked: ge,
    disabled: H,
    form: h,
    id: te,
    name: K,
    required: _,
    style: K ? xh : vh,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": !0,
    ref: ie,
    onChange(ze) {
      if (ze.nativeEvent.defaultPrevented)
        return;
      if (C) {
        ze.preventDefault();
        return;
      }
      const Le = ze.currentTarget.checked, He = Ct(Yl, ze.nativeEvent);
      x?.(Le, He), !He.isCanceled && Ae(Le);
    },
    onClick(ze) {
      ze.stopPropagation();
    },
    onFocus() {
      k.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...A !== void 0 ? {
      value: A
    } : hl
  }, ke = b.useMemo(() => ({
    ...Y,
    checked: ge,
    disabled: H,
    readOnly: C,
    required: _
  }), [Y, ge, H, C, _]), et = Kl("span", o, {
    state: ke,
    ref: [r, k, Te],
    props: [it, z, qe, (ze) => ye.getValidationProps(H, ze)],
    stateAttributesMapping: H1
  });
  return /* @__PURE__ */ S.jsxs(I1.Provider, {
    value: ke,
    children: [et, !ge && K && M !== void 0 && /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: h,
      name: K,
      value: M,
      disabled: H
    }), /* @__PURE__ */ S.jsx("input", {
      ...bt,
      suppressHydrationWarning: !0
    })]
  });
}), _O = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    ...d
  } = o, h = RO();
  return Kl("span", o, {
    state: h,
    ref: r,
    stateAttributesMapping: H1,
    props: d
  });
});
function U1({ className: n, type: o, ...r }) {
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
function AO({ className: n, ...o }) {
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
const MO = pr(
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
function TO({
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
      className: We(MO({ align: o }), n),
      onClick: (a) => {
        a.target.closest("button") || a.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const OO = pr(
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
function B1({
  className: n,
  type: o = "button",
  variant: r = "ghost",
  size: a = "xs",
  ...c
}) {
  return /* @__PURE__ */ S.jsx(
    er,
    {
      type: o,
      "data-size": a,
      variant: r,
      className: We(OO({ size: a }), n),
      ...c
    }
  );
}
function NO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    U1,
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
const zO = xO;
function kO({ ...n }) {
  return /* @__PURE__ */ S.jsx(SO, { "data-slot": "combobox-value", ...n });
}
function G1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    IT,
    {
      "data-slot": "combobox-trigger",
      className: We("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          o0,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function DO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    YT,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ S.jsx(B1, { variant: "ghost", size: "icon-xs" }),
      className: We(n),
      ...o,
      children: /* @__PURE__ */ S.jsx(a0, { className: "pointer-events-none" })
    }
  );
}
function jO({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: a = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ S.jsxs(AO, { className: We("w-auto", n), children: [
    /* @__PURE__ */ S.jsx(
      BT,
      {
        render: /* @__PURE__ */ S.jsx(NO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ S.jsxs(TO, { align: "inline-end", children: [
      a && /* @__PURE__ */ S.jsx(
        B1,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ S.jsx(G1, {})
        }
      ),
      c && /* @__PURE__ */ S.jsx(DO, { disabled: r })
    ] }),
    o
  ] });
}
function LO({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: a = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...h
}) {
  return /* @__PURE__ */ S.jsx(WT, { container: d, children: /* @__PURE__ */ S.jsx(
    cO,
    {
      side: o,
      sideOffset: r,
      align: a,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ S.jsx(
        fO,
        {
          "data-slot": "combobox-content",
          "data-chips": !!f,
          className: We(
            "group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            n
          ),
          ...h
        }
      )
    }
  ) });
}
function VO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    KT,
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
function IO({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    mO,
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
          EO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ S.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ S.jsx(uR, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function HO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    gO,
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
function UO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    sA,
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
function Rv({ className: n, ...o }) {
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
const BO = pr(
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
function Vc({
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
      className: We(BO({ orientation: o }), n),
      ...r
    }
  );
}
function Ic({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    UO,
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
function yi({ className: n, ...o }) {
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
function op({ className: n, ...o }) {
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
const GO = pr(
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
function YO({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? c0 : "div";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": o,
      "data-size": r,
      className: We(GO({ variant: o, size: r }), n),
      ...c
    }
  );
}
function qO({ className: n, ...o }) {
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
function PO({ className: n, ...o }) {
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
function wv({
  className: n,
  defaultValue: o,
  value: r,
  min: a = 0,
  max: c = 100,
  ...f
}) {
  const d = o ?? [a], h = b.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(d) ? d : [a],
    [r, d, a]
  );
  return /* @__PURE__ */ S.jsxs(
    SA,
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
          wA,
          {
            "data-slot": "slider-track",
            className: We(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              _A,
              {
                "data-slot": "slider-range",
                className: We(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: h.length }, (g, p) => /* @__PURE__ */ S.jsx(
          NA,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          p
        ))
      ]
    }
  );
}
function _v({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    wO,
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
        _O,
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
const XO = pr(
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
), Y1 = b.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function kp({
  className: n,
  variant: o,
  size: r,
  spacing: a = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ S.jsx(
    HA,
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
      children: /* @__PURE__ */ S.jsx(Y1.Provider, { value: { variant: o, size: r, spacing: a }, children: c })
    }
  );
}
function Ji({
  className: n,
  children: o,
  variant: r,
  size: a,
  ...c
}) {
  const f = b.useContext(Y1);
  return /* @__PURE__ */ S.jsx(
    qA,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || a,
      "data-spacing": f.spacing,
      className: We(
        XO({
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
const Av = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Mv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], Al = ["#ff0099", "#b8ff00", "#00b7ff"], KO = Al.length, FO = ["line", "spline", "gradient"], QO = ["spline", "shape", "gradient"], ZO = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, $O = ["select", "lasso"], JO = ["point", "line", "spline", "shape"];
function WO(n, o) {
  const [r, a] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(a - r), Math.abs(f - c));
}
function eN(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function Tv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const tN = {
  select: wR,
  lasso: xR,
  polygon: AR,
  rectangle: DR,
  ellipse: _y,
  point: _y,
  line: i0,
  spline: zR,
  shape: r0
};
function Ov({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ S.jsx(
    kp,
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
        const c = tN[a] ?? r0, f = ZO[a] ?? a;
        return /* @__PURE__ */ S.jsx(
          Ji,
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
function ds({ color: n, className: o }) {
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
function q1({ active: n }) {
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
function nN({
  modes: n,
  mode: o,
  onMode: r
}) {
  const a = n.filter((f) => $O.includes(f)), c = n.filter((f) => JO.includes(f));
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      children: [
        a.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Select" }),
          /* @__PURE__ */ S.jsx(Ov, { modes: a, value: o, onChange: r })
        ] }) : null,
        a.length && c.length ? /* @__PURE__ */ S.jsx(XA, { orientation: "vertical", className: "h-5" }) : null,
        c.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Landmarks" }),
          /* @__PURE__ */ S.jsx(Ov, { modes: c, value: o, onChange: r })
        ] }) : null
      ]
    }
  );
}
function ip({
  active: n,
  color: o,
  label: r,
  hidden: a,
  shown: c,
  onSelect: f,
  onRename: d,
  onDelete: h,
  onToggleHidden: g
}) {
  const [p, y] = b.useState(!1), [v, x] = b.useState(r);
  return /* @__PURE__ */ S.jsxs(
    YO,
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
          er,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": a ? "Show landmark" : "Hide landmark",
            onClick: (C) => {
              C.stopPropagation(), g();
            },
            children: a ? /* @__PURE__ */ S.jsx(yR, {}) : /* @__PURE__ */ S.jsx(gR, {})
          }
        ) : null,
        o ? /* @__PURE__ */ S.jsx(ds, { color: o }) : null,
        c !== void 0 ? /* @__PURE__ */ S.jsx(q1, { active: c }) : null,
        /* @__PURE__ */ S.jsx(qO, { className: "min-w-0 gap-0", children: p && d ? /* @__PURE__ */ S.jsx(
          U1,
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
          PO,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: d ? "Double-click to rename" : r,
            onDoubleClick: (C) => {
              d && (C.preventDefault(), C.stopPropagation(), x(r), y(!0));
            },
            children: r
          }
        ) }),
        h ? /* @__PURE__ */ S.jsx(
          er,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (C) => {
              C.stopPropagation(), h();
            },
            children: /* @__PURE__ */ S.jsx(a0, {})
          }
        ) : null
      ]
    }
  );
}
const ou = "px-3";
function Nv(n, o) {
  const r = n?.vmin ?? 0, a = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, a));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function lN({
  colors: n,
  labels: o,
  lo: r,
  hi: a
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${oN(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ S.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ S.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ S.jsx(ds, { color: n[d] || "#94a3b8" }),
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
      /* @__PURE__ */ S.jsx("span", { children: Tv(r) }),
      /* @__PURE__ */ S.jsx("span", { children: Tv(a) })
    ] })
  ] });
}
function oN(n, o) {
  const r = n.replace("#", ""), a = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), h = parseInt(a.slice(0, 2), 16), g = parseInt(a.slice(2, 4), 16), p = parseInt(a.slice(4, 6), 16), y = Math.min(255, c + h), v = Math.min(255, f + g), x = Math.min(255, d + p);
  return `#${[y, v, x].map((C) => C.toString(16).padStart(2, "0")).join("")}`;
}
function iN(n, o, r, a, c, f, d) {
  const h = [
    [n, o],
    [r, a],
    [c, f]
  ], g = [];
  for (let p = 0; p < 3; p++) {
    const [y, v] = h[(p + 2) % 3], [x, C] = h[p], [_, T] = h[(p + 1) % 3], N = Math.hypot(x - y, C - v) || 1, M = Math.hypot(_ - x, T - C) || 1, A = Math.min(d, N * 0.35, M * 0.35), w = x + (y - x) / N * A, z = C + (v - C) / N * A, I = x + (_ - x) / M * A, Y = C + (T - C) / M * A;
    p === 0 ? g.push(`M ${w} ${z}`) : g.push(`L ${w} ${z}`), g.push(`Q ${x} ${C} ${I} ${Y}`);
  }
  return g.push("Z"), g.join(" ");
}
const dl = 80, Th = 12, rp = 4, zv = 5, rN = dl - 2 * Th, P1 = Math.sqrt(3) / 2 * rN, X1 = (dl - P1) / 2, K1 = X1 + P1, ar = { x: dl / 2, y: X1 }, sr = { x: Th, y: K1 }, cr = { x: dl - Th, y: K1 }, kv = {
  x: (sr.x + ar.x + cr.x) / 3,
  y: (sr.y + ar.y + cr.y) / 3
};
function Oh(n) {
  const o = n.x - kv.x, r = n.y - kv.y, a = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / a * zv,
    y: n.y + r / a * zv
  };
}
const Dv = Oh(sr), jv = Oh(ar), Lv = Oh(cr), Vv = iN(
  sr.x,
  sr.y,
  ar.x,
  ar.y,
  cr.x,
  cr.y,
  8
);
function ap(n) {
  const o = n.replace("#", "");
  return [
    parseInt(o.slice(0, 2), 16),
    parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ];
}
function aN() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const a = r.createImageData(o, o), c = ap(Al[0]), f = ap(Al[1]), d = ap(Al[2]), h = sr.x / dl, g = sr.y / dl, p = ar.x / dl, y = ar.y / dl, v = cr.x / dl, x = cr.y / dl, C = (y - x) * (h - v) + (v - p) * (g - x);
  for (let _ = 0; _ < o; _++)
    for (let T = 0; T < o; T++) {
      const N = (T + 0.5) / o, M = (_ + 0.5) / o, A = ((y - x) * (N - v) + (v - p) * (M - x)) / C, w = ((x - g) * (N - v) + (h - v) * (M - x)) / C, z = 1 - A - w, I = (_ * o + T) * 4;
      if (A < -0.02 || w < -0.02 || z < -0.02) {
        a.data[I + 3] = 0;
        continue;
      }
      const Y = Math.max(0, A), B = Math.max(0, w), L = Math.max(0, z);
      a.data[I] = Math.min(255, Math.round(c[0] * Y + f[0] * B + d[0] * L)), a.data[I + 1] = Math.min(
        255,
        Math.round(c[1] * Y + f[1] * B + d[1] * L)
      ), a.data[I + 2] = Math.min(
        255,
        Math.round(c[2] * Y + f[2] * B + d[2] * L)
      ), a.data[I + 3] = 255;
    }
  return r.putImageData(a, 0, 0), n.toDataURL();
}
function sN() {
  const n = b.useId(), o = b.useMemo(() => aN(), []);
  return /* @__PURE__ */ S.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ S.jsxs(
    "svg",
    {
      viewBox: `0 0 ${dl} ${dl}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ S.jsx("defs", { children: /* @__PURE__ */ S.jsx("clipPath", { id: n, children: /* @__PURE__ */ S.jsx("path", { d: Vv }) }) }),
        o ? /* @__PURE__ */ S.jsx(
          "image",
          {
            href: o,
            width: dl,
            height: dl,
            clipPath: `url(#${n})`,
            preserveAspectRatio: "none"
          }
        ) : null,
        /* @__PURE__ */ S.jsx(
          "path",
          {
            d: Vv,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Dv.x,
            cy: Dv.y,
            r: rp,
            fill: Al[0]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: jv.x,
            cy: jv.y,
            r: rp,
            fill: Al[1]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Lv.x,
            cy: Lv.y,
            r: rp,
            fill: Al[2]
          }
        )
      ]
    }
  ) });
}
function cN({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: a, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (a !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ S.jsx(sN, {});
  const h = d.map((y, v) => Al[v % Al.length]);
  let g = 0, p = 1;
  if (f === "shared") {
    p = 0;
    for (const y of d) {
      const v = r.find((x) => x.name === y);
      p = Math.max(p, Nv(v, c).hi);
    }
    p > 0 || (p = 1);
  } else {
    const y = r.find((x) => x.name === d[0]), v = Nv(y, c);
    g = v.lo, p = v.hi;
  }
  return /* @__PURE__ */ S.jsx(
    lN,
    {
      colors: h,
      labels: d,
      lo: g,
      hi: p
    }
  );
}
function uN({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: a, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ S.jsx(
        _v,
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
        _v,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function fN() {
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
function dN({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, a = o.map((g) => g.name), c = r || [], f = c.length >= KO, [d, h] = fN();
  return /* @__PURE__ */ S.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs(
      zO,
      {
        items: a,
        multiple: !0,
        value: c,
        onValueChange: (g) => {
          const p = Array.isArray(g) ? g.map(String) : [];
          n.setActiveGenes(p);
        },
        children: [
          /* @__PURE__ */ S.jsx(
            G1,
            {
              render: /* @__PURE__ */ S.jsx(
                er,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 w-full justify-between px-2 font-normal text-xs",
                  children: /* @__PURE__ */ S.jsx(kO, { children: (g) => {
                    const p = Array.isArray(g) ? g : [];
                    return p.length ? /* @__PURE__ */ S.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: p.map((y, v) => /* @__PURE__ */ S.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ S.jsx(
                            ds,
                            {
                              color: Al[v % Al.length]
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
            LO,
            {
              container: h,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ S.jsx(
                  jO,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto text-xs"
                  }
                ),
                /* @__PURE__ */ S.jsx(HO, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ S.jsx(VO, { children: (g) => {
                  const p = String(g), y = c.indexOf(p), v = f && y < 0;
                  return /* @__PURE__ */ S.jsxs(
                    IO,
                    {
                      value: p,
                      disabled: v,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ S.jsx(
                          ds,
                          {
                            color: y >= 0 ? Al[y % Al.length] : "#94a3b8"
                          }
                        ),
                        p
                      ]
                    },
                    p
                  );
                } })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ S.jsx(cN, { lm: n }),
    /* @__PURE__ */ S.jsx(uN, { lm: n })
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
    gene_columns: h,
    active_genes: g,
    color_by: p
  } = n, y = p === "continuous" && (g?.length || 0) > 0;
  return /* @__PURE__ */ S.jsxs(Ox, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(Nx, { className: We("shrink-0 py-0", ou), children: /* @__PURE__ */ S.jsx(zx, { className: "text-sm font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ S.jsx(kx, { className: We("min-h-0 overflow-y-auto pb-2", ou), children: /* @__PURE__ */ S.jsxs(
      Tx,
      {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"],
        children: [
          /* @__PURE__ */ S.jsxs($r, { value: "selections", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Jr, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Selections" }),
            /* @__PURE__ */ S.jsx(Wr, { className: "px-0 pb-2", children: o.length ? /* @__PURE__ */ S.jsx(op, { className: "max-h-40 gap-0.5 overflow-y-auto", children: o.map((v, x) => /* @__PURE__ */ S.jsx(
              ip,
              {
                active: a === "selection" && c === x,
                color: Mv[x % Mv.length],
                label: v.id,
                onSelect: () => n.select("selection", x),
                onRename: (C) => n.renameSelection(x, C),
                onDelete: () => n.deleteSelection(x)
              },
              `${v.id}-${x}`
            )) }) : /* @__PURE__ */ S.jsx(yi, { children: "No selections yet." }) })
          ] }),
          f.length ? /* @__PURE__ */ S.jsxs($r, { value: "categories", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Jr, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Categories" }),
            /* @__PURE__ */ S.jsx(Wr, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: f.map((v) => {
              const x = !y && v.name === d;
              return /* @__PURE__ */ S.jsxs(QA, { className: "group/cat", children: [
                /* @__PURE__ */ S.jsxs(
                  ZA,
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
                      /* @__PURE__ */ S.jsx(q1, { active: x }),
                      /* @__PURE__ */ S.jsx("span", { className: "min-w-0 flex-1 truncate", children: v.name })
                    ]
                  }
                ),
                /* @__PURE__ */ S.jsx($A, { className: "pl-4", children: /* @__PURE__ */ S.jsx(op, { className: "gap-0.5", children: (v.labels || []).map((C, _) => /* @__PURE__ */ S.jsx(
                  ip,
                  {
                    active: a === "type" && v.name === d && c === _,
                    color: (v.palette || [])[_ % Math.max((v.palette || []).length, 1)] || "#888888",
                    label: C,
                    onSelect: () => n.selectType(v, _)
                  },
                  `${v.name}-${C}`
                )) }) })
              ] }, v.name);
            }) }) })
          ] }) : null,
          h.length ? /* @__PURE__ */ S.jsxs($r, { value: "genes", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Jr, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Genes" }),
            /* @__PURE__ */ S.jsx(Wr, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(dN, { lm: n }) })
          ] }) : null,
          /* @__PURE__ */ S.jsxs($r, { value: "landmarks", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(Jr, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmarks" }),
            /* @__PURE__ */ S.jsx(Wr, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ S.jsx(op, { className: "max-h-40 gap-0.5 overflow-y-auto", children: r.map((v, x) => /* @__PURE__ */ S.jsx(
              ip,
              {
                active: a === "landmark" && c === x,
                color: Av[x % Av.length],
                label: v.id,
                hidden: !!v.hidden,
                onSelect: () => n.select("landmark", x),
                onRename: (C) => n.renameLandmark(x, C),
                onToggleHidden: () => n.toggleLandmarkHidden(x),
                onDelete: () => n.deleteLandmark(x)
              },
              `${v.id}-${x}`
            )) }) : /* @__PURE__ */ S.jsx(yi, { children: "No landmarks yet." }) })
          ] })
        ]
      }
    ) })
  ] });
}
function hN({ lm: n }) {
  const { default_tension: o, x_bounds: r, y_bounds: a } = n, c = n.selectedLandmark(), f = !!c && QO.includes(c.type), d = !!c && FO.includes(c.type), h = n.activeNeighborhood(), g = !!h, p = Math.max(WO(r, a), 1);
  return /* @__PURE__ */ S.jsxs(Ox, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(Nx, { className: We("shrink-0 py-0", ou), children: /* @__PURE__ */ S.jsx(zx, { className: "text-sm font-semibold tracking-tight", children: "Tools" }) }),
    /* @__PURE__ */ S.jsx(kx, { className: We("min-h-0 overflow-hidden pb-2", ou), children: /* @__PURE__ */ S.jsxs(
      Tx,
      {
        type: "multiple",
        defaultValue: ["neighbors", "landmark"],
        children: [
          /* @__PURE__ */ S.jsxs($r, { value: "neighbors", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Jr, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Neighbors" }),
            /* @__PURE__ */ S.jsx(Wr, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(Rv, { className: "gap-2", children: g ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
              /* @__PURE__ */ S.jsx(yi, { children: h.id ? String(h.id) : "Selection" }),
              /* @__PURE__ */ S.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                  "seed"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx(ds, { color: "#00e5cc" }),
                  "neighborhood"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                  "other"
                ] })
              ] }),
              /* @__PURE__ */ S.jsxs(Vc, { children: [
                /* @__PURE__ */ S.jsx(Ic, { children: "Neighborhood" }),
                /* @__PURE__ */ S.jsxs(
                  kp,
                  {
                    type: "single",
                    variant: "outline",
                    size: "sm",
                    spacing: 0,
                    value: h.neighborhood || "off",
                    onValueChange: (y) => {
                      y && n.patchNeighborhood({ neighborhood: y });
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(Ji, { value: "off", children: "Off" }),
                      /* @__PURE__ */ S.jsx(Ji, { value: "radius", children: "Radius" }),
                      /* @__PURE__ */ S.jsx(Ji, { value: "knn", children: "k-NN" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ S.jsx(yi, { children: "Uses the k-NN or radius graph computed before the widget." })
            ] }) : /* @__PURE__ */ S.jsx(yi, { children: "Select a type or selection to edit neighbors." }) }) })
          ] }),
          f || d ? /* @__PURE__ */ S.jsxs($r, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(Jr, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmark" }),
            /* @__PURE__ */ S.jsx(Wr, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(Rv, { className: "gap-2", children: [
              f ? /* @__PURE__ */ S.jsxs(Vc, { children: [
                /* @__PURE__ */ S.jsx(Ic, { children: "Tension" }),
                /* @__PURE__ */ S.jsx(
                  wv,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [
                      Number(c?.tension ?? o ?? 0)
                    ],
                    onValueChange: (y) => n.patchLandmark({ tension: y[0] ?? 0 })
                  }
                ),
                /* @__PURE__ */ S.jsxs(yi, { children: [
                  Number(
                    c?.tension ?? o ?? 0
                  ).toPrecision(3),
                  ". 0 = smooth, 1 = straight."
                ] })
              ] }) : null,
              d ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
                /* @__PURE__ */ S.jsxs(Vc, { children: [
                  /* @__PURE__ */ S.jsx(Ic, { children: "Buffer" }),
                  /* @__PURE__ */ S.jsxs(
                    kp,
                    {
                      type: "single",
                      variant: "outline",
                      size: "sm",
                      spacing: 0,
                      value: c?.buffer_side || "both",
                      onValueChange: (y) => {
                        y && n.patchLandmark({ buffer_side: y });
                      },
                      children: [
                        /* @__PURE__ */ S.jsx(Ji, { value: "left", children: "Left" }),
                        /* @__PURE__ */ S.jsx(Ji, { value: "both", children: "Both" }),
                        /* @__PURE__ */ S.jsx(Ji, { value: "right", children: "Right" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ S.jsxs(Vc, { children: [
                  /* @__PURE__ */ S.jsx(Ic, { children: "Width" }),
                  /* @__PURE__ */ S.jsx(
                    wv,
                    {
                      min: 0,
                      max: p,
                      step: p / 200,
                      value: [
                        Math.min(
                          Number(c?.buffer_width || 0),
                          p
                        )
                      ],
                      onValueChange: (y) => n.patchLandmark({ buffer_width: y[0] ?? 0 })
                    }
                  ),
                  /* @__PURE__ */ S.jsx(yi, { children: eN(Number(c?.buffer_width || 0)) })
                ] }),
                /* @__PURE__ */ S.jsx(yi, { children: "Shift+wheel sizes the buffer." })
              ] }) : null
            ] }) })
          ] }) : null
        ]
      }
    ) })
  ] });
}
function mN({
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
      children: /* @__PURE__ */ S.jsxs(FA, { orientation: "vertical", children: [
        /* @__PURE__ */ S.jsx(
          er,
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
            children: /* @__PURE__ */ S.jsx(TR, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          er,
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
            children: /* @__PURE__ */ S.jsx(i0, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          er,
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
            children: /* @__PURE__ */ S.jsx(ER, {})
          }
        )
      ] })
    }
  );
}
const ps = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, gN = 3;
function Hc(n) {
  return { ...ps, ...n };
}
function Dp(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function bN(n, o) {
  const r = n.get("gene_columns") || [], a = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!a.has(f) || c.includes(f)) && (c.push(f), c.length >= gN))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", h = f.find((g) => g.name === d) || f[0];
    if (h) {
      Dp(n, h);
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
function yN(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function vN(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function F1(n, o, r, a, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...ps, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const h = a.find(
      (g) => g.id === d && (!g.column || g.column === f)
    );
    return { ...ps, id: d, column: f, ...h || {} };
  }
  return null;
}
function xN(n, o, r, a, c, f, d, h) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (x, C) => C === r ? { ...ps, ...x, ...a } : x
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const p = [...f], y = p.findIndex(
    (x) => x.id === g && (!x.column || x.column === h)
  ), v = {
    ...ps,
    id: g,
    column: h,
    ...y >= 0 ? p[y] : {},
    ...a
  };
  y >= 0 ? p[y] = v : p.push(v), n.set("type_neighborhoods", p), n.save_changes();
}
function Q1(n, o, r, a) {
  n.set(
    "landmarks",
    a.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function jp(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function SN(n, o) {
  n.set("mode", o), n.save_changes();
}
function Z1(n, o) {
  return n.filter((r, a) => a !== o);
}
function $1(n, o, r, a) {
  return o !== n ? { kind: o, index: r } : r === a ? { kind: "", index: -1 } : r > a ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function EN(n, o, r, a, c) {
  const f = $1("selection", a, c, o);
  n.set("selections", Z1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function CN(n, o, r, a, c) {
  const f = $1("landmark", a, c, o);
  n.set("landmarks", Z1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
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
const Lp = "9.1.14", AN = `https://esm.sh/@deck.gl/core@${Lp}`, MN = `https://esm.sh/@deck.gl/layers@${Lp}?deps=@deck.gl/core@${Lp}`, bi = { depthCompare: "always", depthWriteEnabled: !1 }, Iv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], sp = "#00e5cc", TN = 0.3, ON = 0.9, Uc = 2, cp = 1, NN = 0.55, up = ["line", "spline", "gradient"];
function fp(n) {
  if (!n) return new Float32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let a = 0; a < o.length; a++) r[a] = o.charCodeAt(a);
  return new Float32Array(r.buffer);
}
function dp(n) {
  if (!n) return new Int32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let a = 0; a < o.length; a++) r[a] = o.charCodeAt(a);
  return new Int32Array(r.buffer);
}
function zN(n) {
  return 1 - (1 - n) ** 4;
}
function Bc(n) {
  const o = document.createElement("canvas");
  o.width = o.height = 1;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  r.fillStyle = "#000000", r.fillStyle = n, r.fillRect(0, 0, 1, 1);
  const [a, c, f, d] = r.getImageData(0, 0, 1, 1).data;
  return [a / 255, c / 255, f / 255, d / 255 || 1];
}
function Hv({ model: n, host: o }) {
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
  const h = document.createElement("div");
  h.className = "landmarks__legend", h.hidden = !0;
  const g = document.createElement("div");
  g.className = "landmarks__tooltip", g.hidden = !0, f.append(d, h), o.append(f, g);
  let p = () => {
  };
  const y = new MutationObserver(() => {
    p(), A && ct();
  });
  y.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function v(R, O, D) {
    g.textContent = R, g.hidden = !1;
    const G = o.getBoundingClientRect();
    g.style.left = `${O - G.left + 12}px`, g.style.top = `${D - G.top + 12}px`;
  }
  function x() {
    g.hidden = !0;
  }
  h.addEventListener("mousedown", (R) => R.stopPropagation()), h.addEventListener("wheel", (R) => R.stopPropagation(), { passive: !0 });
  const C = n.get("modes") || [], _ = ["select", "lasso"].filter(
    (R) => C.includes(R)
  ), T = ["point", "line", "spline", "shape"].filter(
    (R) => C.includes(R)
  ), N = [..._, ...T];
  let M = n.get("mode") || "select";
  N.includes(M) || (M = N[0] || "select");
  let A = null, w = null, z = null, I = 0, Y = !1, B = null, L = null, P = { key: "", data: [] }, J = null, ae = !1, ue = [], ee = () => {
  }, de = () => {
  }, ye = null, V = null, H = null, K = null;
  function Se() {
    const R = n.get("category_codes") || "";
    ye = R ? dp(R) : null;
  }
  Se();
  function ie() {
    const R = n.get("gene_values") || "";
    V = R ? fp(R) : null;
  }
  ie();
  function k() {
    H = X(
      n.get("neighbor_indptr") || "",
      n.get("neighbor_indices") || "",
      n.get("neighbor_distances") || ""
    ), K = X(
      n.get("radius_indptr") || "",
      n.get("radius_indices") || "",
      n.get("radius_distances") || ""
    );
  }
  function X(R, O, D) {
    const G = dp(R), ne = dp(O), oe = fp(D);
    return G.length ? { indptr: G, indices: ne, distances: oe } : null;
  }
  k();
  function W() {
    const R = n.get("category_columns") || [], O = n.get("active_category") || "";
    return R.findIndex((D) => D.name === O);
  }
  function te(R) {
    n.get("category_columns");
    const O = W(), D = Dt();
    return O < 0 || !ye || !D.length ? Math.round(D[R]?.valueA || 0) : ye[O * D.length + R];
  }
  const ge = ["#ff0099", "#b8ff00", "#00b7ff"];
  function Ae(R) {
    return (n.get("gene_columns") || []).find((D) => D.name === R) || null;
  }
  function qe(R, O) {
    const G = (n.get("gene_columns") || []).findIndex((oe) => oe.name === O), ne = Dt();
    return G < 0 || !V || !V.length || !ne.length ? null : V[G * ne.length + R];
  }
  function Te(R, O, D) {
    const G = Number.isFinite(O) ? O : 0, ne = Number.isFinite(D) && D > G ? D : G + 1, oe = Math.max(0, Math.min(1, R ?? 0)), be = Math.max(0, G + oe * (ne - G));
    return n.get("gene_log1p") ? Math.log1p(be) : be;
  }
  function Oe(R, O) {
    const D = Number.isFinite(R) ? R : 0, G = Number.isFinite(O) && O > D ? O : D + 1, ne = Math.max(0, G), oe = Math.max(0, D);
    if (n.get("gene_log1p")) {
      const be = Math.log1p(oe), pe = Math.log1p(ne);
      return pe > be ? pe : pe + 1e-6;
    }
    return ne > oe ? ne : ne + 1e-6;
  }
  function it(R, O) {
    const D = Number.isFinite(R) ? R : 0, G = Math.max(0, D);
    return n.get("gene_log1p") ? Math.log1p(G) : G;
  }
  function bt(R, O, D) {
    const G = Ae(O);
    if (!G) return 0;
    const ne = qe(R, O);
    if (ne == null) return 0;
    const oe = G.vmin ?? 0, be = G.vmax ?? 1, pe = Te(ne, oe, be);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const me = D > 0 ? D : Oe(oe, be);
      return Math.max(0, Math.min(1, pe / me));
    }
    const Ue = it(oe), re = Oe(oe, be);
    return re <= Ue ? 0 : Math.max(0, Math.min(1, (pe - Ue) / (re - Ue)));
  }
  function ke(R) {
    let O = 0;
    for (const D of R) {
      const G = Ae(D);
      G && (O = Math.max(O, Oe(G.vmin ?? 0, G.vmax ?? 1)));
    }
    return O;
  }
  function et(R, O) {
    const D = n.get("active_genes") || [], G = Dt();
    if (!D.length || !G.length) return null;
    const ne = (n.get("gene_scale_mode") || "independent") === "shared" ? ke(D) : 0;
    let oe = 0, be = 0, pe = 0, xe = 0;
    for (let Ue = 0; Ue < D.length; Ue++) {
      const re = bt(R, D[Ue], ne);
      if (!(re > 0)) continue;
      const me = pt(ge[Ue % ge.length], 1);
      oe += me[0] * re, be += me[1] * re, pe += me[2] * re, xe += re;
    }
    return xe < 1e-6 ? pt("#6b7280", O * 0.35) : [
      Math.min(255, Math.round(oe)),
      Math.min(255, Math.round(be)),
      Math.min(255, Math.round(pe)),
      Math.round(Math.max(0, Math.min(1, O)) * 255)
    ];
  }
  let ze = null, Le = [], He = !1, Me = null, Qe = "", Ne = -1, $e = !1, tt = !1, Xe = !1, ve = [], F = !1, se = null, Ie = null;
  function Re(R, O) {
    const D = new Set((O || []).map((G) => String(G.id)));
    for (let G = 1; ; G++) {
      const ne = `${R} ${G}`;
      if (!D.has(ne)) return ne;
    }
  }
  function Ge(R) {
    return Re("landmark", R);
  }
  function nt(R) {
    return Re("selection", R);
  }
  function Ot() {
    Le = [], ve = [], Xe = !1, F = !1, se = null, Ie = null;
  }
  function wt(R) {
    const O = d.getBoundingClientRect();
    if (!O.width || !O.height) return null;
    const D = R.clientX - O.left, G = R.clientY - O.top, ne = A?.isInitialized ? A.getViewports()[0] : null;
    if (!ne) return null;
    const [oe, be] = ne.unproject([D, G]);
    return { x: oe, y: be, px: D, py: G };
  }
  function Yt() {
    return {
      dragPan: M === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function zt() {
    const R = M === "select";
    d.style.cursor = R ? "grab" : "crosshair", A && A.setProps({ controller: Yt() });
  }
  function xt() {
    const R = Math.max(1, Number(n.get("width")) || 400), O = Math.max(1, Number(n.get("height")) || 400);
    r.style.width = `${R}px`, r.style.maxWidth = "100%", a.style.height = `${O}px`, c.style.width = "", c.style.height = "", c.style.maxWidth = "", c.style.aspectRatio = "";
  }
  function Wt() {
    const R = Math.max(1, Math.round(c.clientWidth || n.get("width") || 400)), O = Math.max(1, Math.round(c.clientHeight || n.get("height") || 400));
    d.width !== R && (d.width = R), d.height !== O && (d.height = O), A && A.setProps({ width: R, height: O });
    const D = n.get("axes_pixel_bounds") || [0, 0, R, O];
    return (D[2] !== R || D[3] !== O) && (n.set("axes_pixel_bounds", [0, 0, R, O]), n.save_changes()), { w: R, h: O };
  }
  function dt(R) {
    if (!Number.isFinite(R)) return "";
    const O = Math.abs(R);
    return O !== 0 && (O >= 1e3 || O < 0.01) ? R.toExponential(1) : O >= 100 ? R.toFixed(0) : O >= 10 ? R.toFixed(1) : R.toFixed(2);
  }
  function on() {
    if (!h) return;
    const R = n.get("color_by") || "categorical", O = n.get("legend_title") || "", D = n.get("point_palette") || [], G = n.get("active_genes") || [];
    if (h.innerHTML = "", O) {
      const ne = document.createElement("div");
      ne.className = "landmarks__legend-title", ne.textContent = O, h.appendChild(ne);
    }
    if (R === "continuous" && G.length > 0) {
      h.hidden = !0;
      return;
    }
    if (R === "continuous" && D.length > 1) {
      const ne = document.createElement("div");
      ne.className = "landmarks__legend-bar", ne.style.background = `linear-gradient(to top, ${D[0]}, ${D[Math.floor(D.length / 2)]}, ${D[D.length - 1]})`;
      const oe = document.createElement("div");
      oe.className = "landmarks__legend-scale";
      const be = document.createElement("span");
      be.textContent = dt(n.get("color_vmax"));
      const pe = document.createElement("span");
      pe.textContent = dt(n.get("color_vmin")), oe.appendChild(be), oe.appendChild(pe);
      const xe = document.createElement("div");
      xe.className = "landmarks__legend-continuous", xe.appendChild(ne), xe.appendChild(oe), h.appendChild(xe), h.hidden = !1;
      return;
    }
    if (R === "categorical") {
      h.hidden = !0;
      return;
    }
    h.hidden = !O;
  }
  function pt(R, O) {
    const D = String(R || "#60a5fa").replace("#", ""), G = D.length === 3 ? D.split("").map((oe) => oe + oe).join("") : D.padEnd(6, "0").slice(0, 6), ne = Number.parseInt(G, 16);
    return [
      ne >> 16 & 255,
      ne >> 8 & 255,
      ne & 255,
      Math.round(Math.max(0, Math.min(1, O)) * 255)
    ];
  }
  function Mn(R) {
    const O = n.get("point_opacity") ?? 0.75, D = n.get("color_by") || "categorical";
    let G;
    if (D === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        G = et(R.i, O) || pt("#6b7280", O * 0.35);
      else {
        const be = n.get("point_palette") || ["#60a5fa"];
        if (be.length > 1) {
          const xe = Math.max(0, Math.min(1, R.valueA)) * (be.length - 1), Ue = Math.floor(xe), re = Math.min(be.length - 1, Ue + 1), me = xe - Ue, we = pt(be[Ue], O), _e = pt(be[re], O);
          G = we.map((ut, qt) => Math.round(ut + (_e[qt] - ut) * me));
        } else
          G = pt(be[0], O);
      }
    else {
      const oe = n.get("category_columns") || [], be = W(), pe = be >= 0 ? oe[be] : null, xe = pe && pe.palette || n.get("point_palette") || ["#60a5fa"], Ue = pe ? te(R.i) : Math.round(R.valueA);
      G = pt(xe[(Ue % xe.length + xe.length) % xe.length], O);
    }
    if (!ae || !J) return G;
    const ne = J[R.i] || 0;
    return ne === Uc || ne === cp ? (G[3] = 255, G) : (G[3] = Math.round((G[3] || 255) * 0.28), G);
  }
  function Tn(R) {
    const O = n.get("point_size") ?? 2;
    if (!ae || !J) return O;
    const D = J[R.i] || 0;
    return D === Uc || D === cp ? O : O * NN;
  }
  function kt(R) {
    return R.map((O) => [O.x, O.y]);
  }
  function ot(R) {
    const O = kt(R);
    if (!O.length) return O;
    const D = O[0], G = O[O.length - 1];
    return (D[0] !== G[0] || D[1] !== G[1]) && O.push(D), O;
  }
  function ht(R, O) {
    if (M === "ellipse") {
      const D = (R.x + O.x) / 2, G = (R.y + O.y) / 2, ne = Math.abs(O.x - R.x) / 2, oe = Math.abs(O.y - R.y) / 2, be = [];
      for (let pe = 0; pe < 64; pe++) {
        const xe = pe / 64 * Math.PI * 2;
        be.push([D + ne * Math.cos(xe), G + oe * Math.sin(xe)]);
      }
      return be;
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
      return (R.vertices || []).map(([D, G]) => [D, G]);
    const O = -(R.angle || 0);
    if (R.type === "rectangle") {
      const D = R.cx, G = R.cy, ne = R.width, oe = R.height, be = { x: D, y: G };
      return [
        { x: D - ne / 2, y: G - oe / 2 },
        { x: D + ne / 2, y: G - oe / 2 },
        { x: D + ne / 2, y: G + oe / 2 },
        { x: D - ne / 2, y: G + oe / 2 }
      ].map((pe) => {
        const xe = ol(pe, be, O);
        return [xe.x, xe.y];
      });
    }
    if (R.type === "ellipse") {
      const D = R.cx, G = R.cy, ne = R.rx, oe = R.ry, be = { x: D, y: G }, pe = [];
      for (let xe = 0; xe < 64; xe++) {
        const Ue = xe / 64 * Math.PI * 2, re = ol(
          { x: D + ne * Math.cos(Ue), y: G + oe * Math.sin(Ue) },
          be,
          O
        );
        pe.push([re.x, re.y]);
      }
      return pe;
    }
    return [];
  }
  function Dt() {
    const R = n.get("points_data") || "", [O, D] = n.get("x_bounds"), [G, ne] = n.get("y_bounds"), oe = `${R.length}:${O}:${D}:${G}:${ne}:${R.slice(0, 32)}:${R.slice(-32)}`;
    if (oe === P.key) return P.data;
    const be = fp(R), pe = Math.floor(be.length / 4), xe = new Array(pe);
    for (let Ue = 0; Ue < pe; Ue++) {
      const re = Ue * 4;
      xe[Ue] = {
        i: Ue,
        x: O + (be[re] + 1) / 2 * (D - O),
        y: G + (be[re + 1] + 1) / 2 * (ne - G),
        valueA: be[re + 2]
      };
    }
    return P = { key: oe, data: xe }, xe;
  }
  function On(R, O = 8) {
    const D = R / Math.max(O, 1), ne = 10 ** Math.floor(Math.log10(Math.max(D, 1e-12))), oe = D / ne;
    return (oe <= 1 ? 1 : oe <= 2 ? 2 : oe <= 5 ? 5 : 10) * ne;
  }
  function Cn() {
    const R = A?.isInitialized ? A.getViewports()?.[0] : null;
    if (R?.unproject && R.width > 1 && R.height > 1) {
      const [oe, be] = R.unproject([0, R.height]), [pe, xe] = R.unproject([R.width, 0]);
      return {
        xMin: Math.min(oe, pe),
        xMax: Math.max(oe, pe),
        yMin: Math.min(be, xe),
        yMax: Math.max(be, xe)
      };
    }
    const [O, D] = n.get("x_bounds"), [G, ne] = n.get("y_bounds");
    return { xMin: O, xMax: D, yMin: G, yMax: ne };
  }
  function Ft() {
    const R = Cn(), O = Math.max(R.xMax - R.xMin, R.yMax - R.yMin, 1e-9);
    return On(O, 8);
  }
  function tl(R = !1) {
    const O = Ft();
    !R && O === L || (L = O, ct());
  }
  function jt() {
    if (!w) return null;
    const { PathLayer: R } = w, O = Cn(), D = L || On(Math.max(O.xMax - O.xMin, O.yMax - O.yMin, 1e-9), 8);
    L = D;
    const G = D * 2, ne = Math.floor((O.xMin - G) / D) * D, oe = Math.floor((O.yMin - G) / D) * D, be = [];
    for (let we = ne; we <= O.xMax + G + D * 0.5; we += D)
      be.push({
        path: [
          [we, O.yMin - G],
          [we, O.yMax + G]
        ]
      });
    for (let we = oe; we <= O.yMax + G + D * 0.5; we += D)
      be.push({
        path: [
          [O.xMin - G, we],
          [O.xMax + G, we]
        ]
      });
    const pe = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [xe, Ue, re] = Bc(pe), me = [Math.round(xe * 255), Math.round(Ue * 255), Math.round(re * 255), 160];
    return new R({
      id: "landmarks-grid",
      data: be,
      getPath: (we) => we.path,
      getColor: me,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function lo() {
    if (!w) return null;
    const { ScatterplotLayer: R } = w, O = Dt();
    if (!O.length) return null;
    const G = [
      n.get("point_size") ?? 2,
      ae,
      n.get("selected_kind"),
      n.get("selected_index"),
      n.get("type_neighborhoods"),
      n.get("selections"),
      n.get("active_category")
    ], ne = [
      n.get("point_palette"),
      n.get("point_opacity"),
      n.get("color_by"),
      n.get("active_genes"),
      n.get("gene_values"),
      n.get("gene_scale_mode"),
      n.get("gene_log1p"),
      ...G
    ];
    return [
      new R({
        id: "landmarks-points",
        data: O,
        getPosition: (oe) => [oe.x, oe.y, 0],
        getFillColor: (oe) => Mn(oe),
        getRadius: (oe) => Tn(oe),
        radiusUnits: "common",
        radiusMinPixels: 0,
        stroked: !1,
        filled: !0,
        pickable: !1,
        updateTriggers: {
          getFillColor: ne,
          getRadius: G
        }
      })
    ];
  }
  function Kn() {
    if (!w) return [];
    const { PolygonLayer: R } = w, O = n.get("selected_kind"), D = n.get("selected_index"), G = getComputedStyle(r).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", ne = [];
    return (n.get("selections") || []).forEach((oe, be) => {
      const pe = Je(oe);
      if (pe.length < 3) return;
      const xe = O === "selection" && be === D;
      ne.push({
        polygon: pe,
        fill: pt(G, xe ? 0.08 : 0.04),
        line: pt(G, xe ? 1 : 0.85),
        width: xe ? 2.5 : 2,
        kind: "selection",
        index: be
      });
    }), ne.length ? [
      new R({
        id: "selections",
        data: ne,
        getPolygon: (oe) => oe.polygon,
        getFillColor: (oe) => oe.fill,
        getLineColor: (oe) => oe.line,
        getLineWidth: (oe) => oe.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: bi
      })
    ] : [];
  }
  function fn() {
    if (!w) return [];
    const { PathLayer: R, PolygonLayer: O, ScatterplotLayer: D } = w, G = n.get("selected_kind"), ne = n.get("selected_index"), oe = n.get("stroke_width") || 2, be = n.get("landmark_opacity") || 0.25, pe = [], xe = [], Ue = [], re = [], me = zl(14);
    (n.get("landmarks") || []).forEach((_e, ut) => {
      if (_e.hidden) return;
      const qt = Iv[ut % Iv.length], St = G === "landmark" && ut === ne, sn = St ? oe + 1 : oe, Pt = pt(qt, 1), jn = pt(qt, be), gn = { kind: "landmark", index: ut };
      if (_e.type === "point") {
        const bn = (_e.vertices || [])[0];
        if (!bn) return;
        Ue.push({
          position: [bn[0], bn[1], 0],
          fill: Pt,
          radius: St ? 7 : 6,
          ...gn
        });
        return;
      }
      const Xt = il(_e);
      if (_e.type === "shape" && Xt.length >= 3) {
        pe.push({
          polygon: kt(Xt),
          fill: jn,
          line: Pt,
          width: sn,
          ...gn
        }), (_e.vertices || []).forEach(([bn, Jn]) => {
          Ue.push({
            position: [bn, Jn, 0],
            fill: Pt,
            radius: St ? 5 : 4,
            ...gn
          });
        });
        return;
      }
      const wn = Qn(_e);
      if (wn && pe.push({
        polygon: kt(wn),
        fill: pt(sp, TN),
        line: pt(sp, ON),
        width: 1.5,
        ...gn
      }), Xt.length >= 2) {
        const bn = kt(Xt);
        if (xe.push({
          path: bn,
          color: Pt,
          width: sn,
          ...gn
        }), ["line", "spline", "gradient"].includes(_e.type)) {
          const Jn = nl(bn, me);
          Jn && re.push({ polygon: Jn, fill: Pt, line: Pt, width: 1, ...gn });
        }
        (_e.vertices || []).forEach(([Jn, yr]) => {
          Ue.push({
            position: [Jn, yr, 0],
            fill: Pt,
            radius: St ? 5 : 4,
            ...gn
          });
        });
      }
    });
    const we = [];
    return (pe.length || re.length) && we.push(
      new O({
        id: "landmark-polygons",
        data: [...pe, ...re],
        getPolygon: (_e) => _e.polygon,
        getFillColor: (_e) => _e.fill,
        getLineColor: (_e) => _e.line,
        getLineWidth: (_e) => _e.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: bi
      })
    ), xe.length && we.push(
      new R({
        id: "landmark-paths",
        data: xe,
        getPath: (_e) => _e.path,
        getColor: (_e) => _e.color,
        getWidth: (_e) => _e.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: bi
      })
    ), Ue.length && we.push(
      new D({
        id: "landmark-markers",
        data: Ue,
        getPosition: (_e) => _e.position,
        getFillColor: (_e) => _e.fill,
        getRadius: (_e) => _e.radius,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: bi
      })
    ), we;
  }
  function oo() {
    if (!w) return [];
    const { PathLayer: R, PolygonLayer: O, ScatterplotLayer: D } = w, G = ["lasso", "polygon", "rectangle", "ellipse"].includes(M), ne = G ? "#94a3b8" : "#00e5ff", oe = pt(ne, 1), be = pt(ne, 0.15), pe = n.get("stroke_width") || 4, xe = [];
    let Ue = null, re = null, me = [];
    if (Xe && ve.length >= 2)
      Ue = kt(ve);
    else if (F && se && Ie)
      re = ht(se, Ie);
    else if (Le.length) {
      const we = M === "spline" ? ll(Le, n.get("default_tension") ?? 0, 20, !1) : M === "shape" ? ll(Le, n.get("default_tension") ?? 0, 20, !0) : Le;
      M === "polygon" || M === "shape" ? (re = kt(we), Ue = ot(we)) : Ue = kt(we), me = Le.map((_e) => ({ position: [_e.x, _e.y, 0], fill: oe }));
    }
    return re && re.length >= 3 ? xe.push(
      new O({
        id: "draft-polygon",
        data: [{ polygon: re, fill: be, line: oe, width: 2 }],
        getPolygon: (we) => we.polygon,
        getFillColor: (we) => we.fill,
        getLineColor: (we) => we.line,
        getLineWidth: (we) => we.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: bi
      })
    ) : Ue && Ue.length >= 2 && xe.push(
      new R({
        id: "draft-path",
        data: [{ path: Ue, color: oe, width: G ? 2 : pe }],
        getPath: (we) => we.path,
        getColor: (we) => we.color,
        getWidth: (we) => we.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: bi
      })
    ), me.length && xe.push(
      new D({
        id: "draft-markers",
        data: me,
        getPosition: (we) => we.position,
        getFillColor: (we) => we.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: bi
      })
    ), xe;
  }
  function zl(R) {
    const O = A?.isInitialized ? A.getViewports()?.[0] : null;
    if (!O?.unproject) return R;
    const [D] = O.unproject([0, 0]), [G] = O.unproject([R, 0]);
    return Math.max(Math.abs(G - D), 1e-9);
  }
  function nl(R, O) {
    if (!R || R.length < 2 || !(O > 0)) return null;
    const D = R[R.length - 2], G = R[R.length - 1], ne = Math.hypot(G[0] - D[0], G[1] - D[1]) || 1, oe = (G[0] - D[0]) / ne, be = (G[1] - D[1]) / ne, pe = -be, xe = oe, Ue = [G[0] + oe * O * 0.15, G[1] + be * O * 0.15], re = [G[0] - oe * O, G[1] - be * O];
    return [
      Ue,
      [re[0] + pe * O * 0.55, re[1] + xe * O * 0.55],
      [re[0] - pe * O * 0.55, re[1] - xe * O * 0.55]
    ];
  }
  function vo(R, O, D) {
    const G = [], ne = [];
    if (!R || !D.length) return { edges: G, neighbors: ne };
    const { indptr: oe, indices: be } = R, pe = /* @__PURE__ */ new Set();
    for (const xe of D) {
      const Ue = oe[xe] | 0, re = oe[xe + 1] | 0, me = O[xe];
      for (let we = Ue; we < re; we++) {
        const _e = be[we] | 0;
        pe.has(_e) || (pe.add(_e), ne.push(_e)), G.push({
          path: [
            [me.x, me.y],
            [O[_e].x, O[_e].y]
          ]
        });
      }
    }
    return { edges: G, neighbors: ne };
  }
  function Rn() {
    if (!w) return [];
    const R = kl(), O = zi(R);
    if (!R || !O || O.neighborhood === "off") return [];
    Dt();
    const D = [], { PathLayer: G } = w, ne = { kind: R.kind, index: R.index };
    return (O.neighborhood === "radius" || O.neighborhood === "knn") && ue.length && D.push(
      new G({
        id: `neighborhood-${O.neighborhood}`,
        data: ue.map((oe) => ({ ...oe, ...ne })),
        getPath: (oe) => oe.path,
        getColor: pt(sp, 0.45),
        getWidth: 1.25,
        widthUnits: "pixels",
        pickable: !0,
        parameters: bi
      })
    ), D;
  }
  function _t() {
    return ro(), [
      jt(),
      ...Rn(),
      ...lo(),
      ...Kn(),
      ...fn(),
      ...oo()
    ].filter(Boolean);
  }
  function Rt(R, O) {
    const [D, G] = n.get("x_bounds"), [ne, oe] = n.get("y_bounds"), be = (D + G) / 2, pe = (ne + oe) / 2, xe = Math.max(G - D, 1e-6), Ue = Math.max(oe - ne, 1e-6), re = 40, me = Math.log2(
      Math.min((R - re * 2) / xe, (O - re * 2) / Ue)
    );
    return {
      target: [be, pe, 0],
      zoom: me,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function Ye() {
    if (!A) return;
    const R = Math.max(1, d.clientWidth || d.width), O = Math.max(1, d.clientHeight || d.height);
    R <= 1 || O <= 1 || (z = Rt(R, O), B = z.zoom, A.setProps({ viewState: z, width: R, height: O }), Y = !0);
  }
  function Fn(R, { animate: O = !1, duration: D = 320 } = {}) {
    if (!A) return;
    const G = {
      ...z,
      ...R,
      transitionDuration: O ? D : 0
    };
    O && (!ze && w?.LinearInterpolator && (ze = new w.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), ze && (G.transitionInterpolator = ze), G.transitionEasing = zN), z = G, A.setProps({ viewState: G });
  }
  ee = (R) => {
    if (!A || !z) return;
    const O = z.minZoom ?? -20, D = z.maxZoom ?? 20, G = Math.max(O, Math.min(D, (z.zoom ?? 0) + R));
    Fn({ zoom: G }, { animate: !0 });
  }, de = () => {
    if (!A) return;
    const R = Math.max(1, d.clientWidth || d.width), O = Math.max(1, d.clientHeight || d.height);
    if (R <= 1 || O <= 1) return;
    const D = Rt(R, O);
    B = D.zoom, Y = !0, Fn(
      {
        target: D.target,
        zoom: D.zoom,
        minZoom: D.minZoom,
        maxZoom: D.maxZoom
      },
      { animate: !0, duration: 320 }
    ), ct();
  };
  function Oi() {
    const R = String(n.get("plot_background") || "").trim();
    if (R) return R;
    const O = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return O || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  p = () => {
    const R = Oi();
    f.style.background = R, d.style.background = R, A && (A.setProps({
      parameters: { clearColor: Bc(R) },
      ...z ? { viewState: z } : {}
    }), typeof A.redraw == "function" && A.redraw(!0));
  };
  function Ni(R) {
    if (!A) return;
    const O = Oi();
    A.setProps({
      parameters: { clearColor: Bc(O) },
      ...R,
      ...z ? { viewState: z } : {}
    });
  }
  function ct() {
    !A || !w || I || (I = requestAnimationFrame(() => {
      I = 0, Ni({ layers: _t() });
    }));
  }
  async function io() {
    if (w) return w;
    const R = await import(
      /* @vite-ignore */
      AN
    ), O = await import(
      /* @vite-ignore */
      MN
    );
    return w = {
      Deck: R.Deck,
      OrthographicView: R.OrthographicView,
      LinearInterpolator: R.LinearInterpolator,
      ScatterplotLayer: O.ScatterplotLayer,
      PathLayer: O.PathLayer,
      PolygonLayer: O.PolygonLayer
    }, w;
  }
  async function Yo() {
    if (A) return;
    xt();
    const { w: R, h: O } = Wt();
    d.style.display = "block", p();
    try {
      const { Deck: D, OrthographicView: G } = await io(), ne = _t();
      if (!ne.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const oe = Rt(R, O);
      z = oe, B = oe.zoom;
      const be = Oi();
      A = new D({
        canvas: d,
        width: R,
        height: O,
        views: new G(),
        controller: Yt(),
        initialViewState: oe,
        parameters: { clearColor: Bc(be) },
        layers: ne,
        pickingRadius: 8,
        getCursor: ({ isDragging: pe, isHovering: xe }) => pe ? "grabbing" : xe ? "pointer" : M === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: pe }) => {
          z = pe, A.setProps({ viewState: pe }), tl();
        },
        onClick: (pe) => {
          if (M !== "select") return;
          const xe = pe?.object;
          xe?.kind === "landmark" || xe?.kind === "selection" || xe?.kind === "type" ? Bt(xe.kind, xe.index) : Bt("", -1);
        },
        onHover: (pe) => {
          const xe = pe?.object;
          if (xe?.kind === "landmark" || xe?.kind === "selection" || xe?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          M === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          on(), requestAnimationFrame(() => {
            Wt(), Ye(), Ni({ layers: _t() }), typeof A.redraw == "function" && A.redraw(!0);
          });
        }
      }), zt();
    } catch (D) {
      console.error("landmarks deck init failed", D);
      const G = document.createElement("div");
      G.className = "landmarks__error", G.textContent = `Deck renderer failed: ${D?.message || D}`, f.appendChild(G);
    }
  }
  function gl() {
    if (!A) return;
    const { w: R, h: O } = Wt();
    Ni({ width: R, height: O }), !Y && R > 1 && O > 1 ? Ye() : typeof A.redraw == "function" && A.redraw(!0);
  }
  function ll(R, O, D, G) {
    const ne = D, be = (1 - Math.max(0, Math.min(1, O ?? 0))) / 2;
    let pe = R.slice(), xe, Ue;
    if (G) {
      if (pe.length >= 2) {
        const we = pe[0], _e = pe[pe.length - 1];
        we.x === _e.x && we.y === _e.y && (pe = pe.slice(0, -1));
      }
      if (pe.length < 3) return pe.slice();
      const me = pe.length;
      Ue = (we) => pe[(we % me + me) % me], xe = me;
    } else {
      if (pe.length < 2 || pe.length === 2) return pe.slice();
      const me = [
        { x: 2 * pe[0].x - pe[1].x, y: 2 * pe[0].y - pe[1].y },
        ...pe,
        {
          x: 2 * pe[pe.length - 1].x - pe[pe.length - 2].x,
          y: 2 * pe[pe.length - 1].y - pe[pe.length - 2].y
        }
      ];
      Ue = (we) => me[we + 1], xe = pe.length - 1;
    }
    const re = [];
    for (let me = 0; me < xe; me++) {
      const we = Ue(me - 1), _e = Ue(me), ut = Ue(me + 1), qt = Ue(me + 2), St = be * (ut.x - we.x), sn = be * (ut.y - we.y), Pt = be * (qt.x - _e.x), jn = be * (qt.y - _e.y);
      for (let gn = 0; gn < ne; gn++) {
        const Xt = gn / ne, wn = Xt * Xt, bn = wn * Xt, Jn = 2 * bn - 3 * wn + 1, yr = bn - 2 * wn + Xt, vr = -2 * bn + 3 * wn, xr = bn - wn;
        re.push({
          x: Jn * _e.x + yr * St + vr * ut.x + xr * Pt,
          y: Jn * _e.y + yr * sn + vr * ut.y + xr * jn
        });
      }
    }
    return re.push({ ...Ue(G ? xe : pe.length - 1) }), re;
  }
  function ol(R, O, D) {
    const G = Math.cos(D), ne = Math.sin(D), oe = R.x - O.x, be = R.y - O.y;
    return { x: O.x + oe * G - be * ne, y: O.y + oe * ne + be * G };
  }
  function il(R) {
    const O = (R.vertices || []).map(([D, G]) => ({ x: D, y: G }));
    return R.type === "spline" || R.type === "gradient" ? ll(O, R.tension ?? 0, 20, !1) : R.type === "shape" ? ll(O, R.tension ?? 0, 20, !0) : O;
  }
  function rn() {
    const [R, O] = n.get("x_bounds"), [D, G] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(O - R), Math.abs(G - D));
  }
  function an(R, O) {
    return R.map((D, G) => {
      const ne = R[Math.max(0, G - 1)], oe = R[Math.min(R.length - 1, G + 1)], be = Math.hypot(oe.x - ne.x, oe.y - ne.y) || 1, pe = (oe.x - ne.x) / be, xe = (oe.y - ne.y) / be;
      return { x: D.x - xe * O, y: D.y + pe * O };
    });
  }
  function Qn(R) {
    const O = Number(R.buffer_width || 0);
    if (!(O > 0) || !up.includes(R.type)) return null;
    const D = il(R);
    if (D.length < 2) return null;
    const G = R.buffer_side || "both";
    return G === "left" ? [...D, ...an(D, O).reverse()] : G === "right" ? [...D, ...an(D, -O).reverse()] : [...an(D, O), ...an(D, -O).reverse()];
  }
  function kl() {
    const R = n.get("selected_kind"), O = n.get("selected_index");
    return R === "type" || R === "selection" ? { kind: R, index: O } : null;
  }
  function Fl() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function zi(R) {
    return R ? F1(
      R.kind,
      R.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function mr() {
    const R = Fl();
    if (!R) return null;
    const O = n.get("landmarks") || [];
    return R.index >= 0 && R.index < O.length ? O[R.index] : null;
  }
  function qo(R) {
    const O = Dt();
    if (!R) return [];
    if (R.kind === "type")
      return O.reduce((D, G, ne) => (te(ne) === R.index && D.push(ne), D), []);
    if (R.kind === "selection") {
      const D = (n.get("selections") || [])[R.index], G = Je(D || {});
      return G.length < 3 ? [] : O.reduce((ne, oe, be) => (gr(oe, G) && ne.push(be), ne), []);
    }
    return [];
  }
  function gr(R, O) {
    let D = !1;
    for (let G = 0, ne = O.length - 1; G < O.length; ne = G++) {
      const oe = O[G][0], be = O[G][1], pe = O[ne][0], xe = O[ne][1];
      be > R.y != xe > R.y && R.x < (pe - oe) * (R.y - be) / (xe - be + 1e-12) + oe && (D = !D);
    }
    return D;
  }
  function ro() {
    const R = Dt();
    J = new Uint8Array(R.length), ae = !1, ue = [];
    const O = kl();
    if (!O) return;
    const D = qo(O);
    if (!D.length) {
      ae = !0;
      return;
    }
    ae = !0;
    for (const oe of D) J[oe] = Uc;
    const G = zi(O);
    if (!G || G.neighborhood === "off") return;
    const ne = G.neighborhood === "radius" ? K : H;
    if (G.neighborhood === "radius" || G.neighborhood === "knn") {
      const oe = vo(ne, R, D);
      ue = oe.edges;
      for (const be of oe.neighbors)
        J[be] !== Uc && (J[be] = cp);
    }
  }
  function Po(R) {
    const O = Fl();
    O && (Q1(n, O.index, R, n.get("landmarks") || []), ct());
  }
  function Zn(R) {
    if (!A?.isInitialized || !R) return null;
    const D = A.pickObject({ x: R.px, y: R.py, radius: 8 })?.object;
    return D?.kind ? { kind: D.kind, index: D.index } : null;
  }
  function Bt(R, O) {
    jp(n, R, O), ct();
  }
  function nn() {
    on();
  }
  function $n() {
    if (!["polygon", "line", "spline", "shape"].includes(M)) return;
    const O = M === "line" || M === "spline" ? 2 : 3;
    if (Le.length < O) {
      Le = [], ct();
      return;
    }
    if (M === "polygon") {
      const ne = [...n.get("selections") || []];
      ne.push(Hc({
        id: nt(ne),
        type: "polygon",
        vertices: Le.map((oe) => [oe.x, oe.y])
      })), Le = [], n.set("selections", ne), n.set("selected_kind", "selection"), n.set("selected_index", ne.length - 1), n.save_changes(), nn(), ct();
      return;
    }
    const D = [...n.get("landmarks") || []], G = {
      id: Ge(D),
      type: M,
      vertices: Le.map((ne) => [ne.x, ne.y])
    };
    (M === "spline" || M === "shape") && (G.tension = n.get("default_tension") ?? 0), up.includes(M) && (G.buffer_width = n.get("default_buffer_width") ?? 0, G.buffer_side = n.get("default_buffer_side") || "both"), D.push(G), Le = [], n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), nn(), ct();
  }
  function Ql(R, O) {
    if (A?.isInitialized) {
      const D = A.getViewports()[0];
      if (D) {
        const G = D.unproject([0, 0]), ne = D.unproject([R, O]);
        return { dx: ne[0] - G[0], dy: ne[1] - G[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function xo(R, O, D, G) {
    const { dx: ne, dy: oe } = Ql(D, G);
    if (R === "landmark") {
      const be = n.get("landmarks") || [];
      n.set(
        "landmarks",
        be.map(
          (pe, xe) => xe !== O ? pe : { ...pe, vertices: (pe.vertices || []).map(([Ue, re]) => [Ue + ne, re + oe]) }
        )
      );
    } else {
      const be = n.get("selections") || [];
      n.set(
        "selections",
        be.map((pe, xe) => xe !== O ? pe : pe.vertices ? { ...pe, vertices: pe.vertices.map(([Ue, re]) => [Ue + ne, re + oe]) } : { ...pe, cx: pe.cx + ne, cy: pe.cy + oe })
      );
    }
    n.save_changes(), ct();
  }
  function Xo(R) {
    if (M === "select") return;
    R.preventDefault(), d.focus();
    const O = wt(R);
    if (!O) return;
    $e = !1;
    const D = Zn(O);
    if (M === "lasso") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        He = !0, Me = O, Qe = D.kind, Ne = D.index;
        return;
      }
      if (D) {
        Bt(D.kind, D.index), tt = !0;
        return;
      }
      Xe = !0, ve = [O], ct();
      return;
    }
    if (M === "rectangle" || M === "ellipse") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        He = !0, Me = O, Qe = D.kind, Ne = D.index;
        return;
      }
      if (D) {
        Bt(D.kind, D.index), tt = !0;
        return;
      }
      F = !0, se = O, Ie = O, ct();
      return;
    }
    if (Le.length === 0) {
      const G = n.get("selected_kind"), ne = n.get("selected_index");
      if (D && D.kind === G && D.index === ne) {
        He = !0, Me = O, Qe = D.kind, Ne = D.index, d.style.cursor = "grabbing";
        return;
      }
      if (D) {
        Bt(D.kind, D.index), tt = !0;
        return;
      }
      ne >= 0 && Bt("", -1);
    }
  }
  function da(R) {
    const O = wt(R);
    if (!O) return;
    if (He && Me && Ne >= 0) {
      const ne = O.px - Me.px, oe = O.py - Me.py;
      (ne || oe) && ($e = !0), xo(Qe, Ne, ne, oe), Me = O;
      return;
    }
    if (Xe) {
      ve.push(O), ct();
      return;
    }
    if (F) {
      Ie = O, ct();
      return;
    }
    if (Le.length > 0 && ["polygon", "line", "spline", "shape"].includes(M)) {
      const ne = M === "line" || M === "spline" ? 2 : 3;
      v(Le.length >= ne ? "Enter to finish" : "Click", R.clientX, R.clientY);
      return;
    }
    if (M === "select") return;
    const G = Zn(O);
    if (G && (G.kind === "landmark" || G.kind === "selection")) {
      const oe = (G.kind === "landmark" ? n.get("landmarks") : n.get("selections"))?.[G.index]?.id;
      if (oe) {
        v(String(oe), R.clientX, R.clientY);
        return;
      }
    }
    x();
  }
  function Nn(R) {
    if (M === "select" && !He) return;
    const O = wt(R);
    if (Xe) {
      if (Xe = !1, ve.length >= 3) {
        const D = [...n.get("selections") || []];
        D.push(Hc({
          id: nt(D),
          type: "lasso",
          vertices: ve.map((G) => [G.x, G.y])
        })), n.set("selections", D), n.set("selected_kind", "selection"), n.set("selected_index", D.length - 1), n.save_changes();
      }
      ve = [], nn(), ct();
      return;
    }
    if (F) {
      if (F = !1, se && Ie) {
        const D = se, G = Ie, ne = (D.x + G.x) / 2, oe = (D.y + G.y) / 2, be = Math.abs(G.x - D.x), pe = Math.abs(G.y - D.y);
        if (be > 1e-6 && pe > 1e-6) {
          const xe = [...n.get("selections") || []];
          M === "rectangle" ? xe.push(Hc({ id: nt(xe), type: "rectangle", cx: ne, cy: oe, width: be, height: pe, angle: 0 })) : xe.push(Hc({ id: nt(xe), type: "ellipse", cx: ne, cy: oe, rx: be / 2, ry: pe / 2, angle: 0 })), n.set("selections", xe), n.set("selected_kind", "selection"), n.set("selected_index", xe.length - 1), n.save_changes();
        }
      }
      se = null, Ie = null, nn(), ct();
      return;
    }
    if (He && (He = !1, Me = null, Qe = "", Ne = -1, d.style.cursor = "crosshair", $e)) {
      tt = !0, $e = !1;
      return;
    }
    if (tt) {
      tt = !1;
      return;
    }
    if (O && !(M === "select" || M === "lasso" || M === "rectangle" || M === "ellipse")) {
      if (M === "point") {
        const D = [...n.get("landmarks") || []];
        D.push({ id: Ge(D), type: "point", vertices: [[O.x, O.y]] }), n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), nn(), ct();
        return;
      }
      Le.push({ x: O.x, y: O.y }), ct();
    }
  }
  function ki() {
    x(), He && (He = !1, Me = null), Xe && (Xe = !1, ve = [], ct()), F && (F = !1, se = null, Ie = null, ct());
  }
  function br(R) {
    R.preventDefault(), Le.length && Le.pop(), $n(), x();
  }
  function Ko(R) {
    R.key === "Enter" ? (R.preventDefault(), $n(), x()) : R.key === "Escape" ? (Ot(), Bt("", -1), ct()) : (R.key === "Backspace" || R.key === "Delete") && Le.length && (Le.pop(), ct());
  }
  const rl = new AbortController(), { signal: bl } = rl;
  d.addEventListener(
    "wheel",
    (R) => {
      if (!R.shiftKey) return;
      const O = mr();
      if (O && up.includes(O.type)) {
        R.preventDefault(), R.stopImmediatePropagation();
        const D = rn(), G = D / 40, ne = Math.max(
          0,
          Math.min(D, (Number(O.buffer_width) || 0) + (R.deltaY > 0 ? -G : G))
        );
        Po({ buffer_width: ne });
        return;
      }
    },
    { capture: !0, passive: !1, signal: bl }
  ), d.addEventListener("mousedown", Xo, { signal: bl }), d.addEventListener("mousemove", da, { signal: bl }), d.addEventListener("mouseup", Nn, { signal: bl }), d.addEventListener("mouseleave", ki, { signal: bl }), d.addEventListener("dblclick", br, { signal: bl }), d.addEventListener("keydown", Ko, { signal: bl });
  const ao = [];
  function ln(R, O) {
    const D = `change:${R}`;
    n.on(D, O), ao.push(() => n.off?.(D, O));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((R) => {
    ln(R, () => {
      ct(), nn();
    });
  }), ln("mode", () => {
    M = n.get("mode"), Ot(), zt(), ct();
  }), ln("width", () => {
    xt(), Wt(), ct();
  }), ln("height", () => {
    xt(), Wt(), ct();
  }), ln("points_data", () => {
    P = { key: "", data: [] }, A ? ct() : Yo(), on();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((R) => {
    ln(R, () => {
      A && ct(), on();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((R) => {
    ln(R, () => {
      ct();
    });
  }), ln("category_codes", () => {
    Se(), ct();
  }), ln("gene_values", () => {
    ie(), ct();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "radius_indptr", "radius_indices", "radius_distances"].forEach((R) => {
    ln(R, () => {
      k(), A && ct();
    });
  }), ["category_columns", "active_category"].forEach((R) => {
    ln(R, () => {
      nn(), ct();
    });
  }), ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((R) => {
    ln(R, () => {
      nn(), on(), ct();
    });
  }), ln("plot_background", () => p()), nn(), xt();
  let so = null, Zl = 0, $l = !1;
  const yl = () => {
    if ($l) return;
    const R = c.clientWidth, O = c.clientHeight;
    if (R <= 1 || O <= 1) {
      Zl = requestAnimationFrame(yl);
      return;
    }
    Zl = requestAnimationFrame(async () => {
      if (await Yo(), $l) {
        A && typeof A.finalize == "function" && A.finalize(), A = null;
        return;
      }
      ct(), so = new ResizeObserver(() => gl()), so.observe(c);
    });
  };
  Zl = requestAnimationFrame(yl);
  function Di() {
    $l = !0, rl.abort(), ao.forEach((R) => R()), y.disconnect(), so?.disconnect(), Zl && cancelAnimationFrame(Zl), I && cancelAnimationFrame(I), A && typeof A.finalize == "function" && A.finalize(), A = null, o.replaceChildren();
  }
  return { zoomBy: (R) => ee(R), resetZoom: () => de(), destroy: Di };
}
function kN(n, o) {
  const r = b.useRef(o);
  r.current = o;
  const a = (d) => {
    const h = r.current.map((g) => {
      const p = `change:${String(g)}`, y = () => d();
      return n.on(p, y), { event: p, handler: y };
    });
    return () => {
      for (const { event: g, handler: p } of h)
        n.off?.(g, p);
    };
  }, c = () => {
    const d = {};
    for (const h of r.current)
      d[String(h)] = n.get(String(h));
    return JSON.stringify(d);
  }, f = b.useSyncExternalStore(a, c, c);
  return JSON.parse(f);
}
const DN = [
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
function jN(n) {
  const o = kN(n, DN);
  return {
    ...o,
    setMode(r) {
      SN(n, r);
    },
    select(r, a) {
      jp(n, r, a);
    },
    setActiveCategory(r) {
      Dp(n, r);
    },
    setActiveGenes(r) {
      bN(n, r);
    },
    setGeneScaleMode(r) {
      yN(n, r);
    },
    setGeneLog1p(r) {
      vN(n, r);
    },
    selectType(r, a) {
      r.name !== o.active_category && Dp(n, r), jp(n, "type", a);
    },
    patchNeighborhood(r) {
      xN(
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
      o.selected_kind !== "landmark" || o.selected_index < 0 || Q1(n, o.selected_index, r, o.landmarks);
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
      return F1(
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
function LN({
  model: n,
  hostEl: o
}) {
  const r = fC(o.parentElement), a = jN(n), c = b.useRef(null), f = b.useRef(null);
  return b.useEffect(() => {
    const d = c.current;
    if (!d) return;
    const h = Hv({ model: n, host: d });
    return f.current = h, () => {
      h.destroy(), f.current = null;
    };
  }, [n, Hv]), /* @__PURE__ */ S.jsxs(
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
            nN,
            {
              modes: a.modes,
              mode: a.mode,
              onMode: (d) => a.setMode(d)
            }
          ),
          /* @__PURE__ */ S.jsxs("div", { className: "landmarks__main landmarks__main--plot", children: [
            /* @__PURE__ */ S.jsx("div", { ref: c, className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full" }),
            /* @__PURE__ */ S.jsx(
              mN,
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
              children: /* @__PURE__ */ S.jsx(hN, { lm: a })
            }
          )
        ] })
      ]
    }
  );
}
const ls = /* @__PURE__ */ new WeakMap();
function VN({ model: n, el: o }) {
  const r = ls.get(o);
  r && (r.unmount(), ls.delete(o));
  const a = cC.createRoot(o);
  return ls.set(o, a), a.render(/* @__PURE__ */ S.jsx(LN, { model: n, hostEl: o })), () => {
    a.unmount(), ls.get(o) === a && ls.delete(o);
  };
}
const GN = { render: VN };
export {
  GN as default
};
