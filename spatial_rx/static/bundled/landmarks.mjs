var by = (n) => {
  throw TypeError(n);
};
var yy = (n, o, r) => o.has(n) || by("Cannot " + r);
var Bn = (n, o, r) => (yy(n, o, "read from private field"), r ? r.call(n) : o.get(n)), vy = (n, o, r) => o.has(n) ? by("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Ld = (n, o, r, i) => (yy(n, o, "write to private field"), i ? i.call(n, r) : o.set(n, r), r);
function fC(n, o) {
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
function dC(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Vd = { exports: {} }, as = {};
var xy;
function hC() {
  if (xy) return as;
  xy = 1;
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
  return as.Fragment = o, as.jsx = r, as.jsxs = r, as;
}
var Sy;
function mC() {
  return Sy || (Sy = 1, Vd.exports = hC()), Vd.exports;
}
var x = mC(), Id = { exports: {} }, rs = {}, Hd = { exports: {} }, Ud = {};
var Ey;
function pC() {
  return Ey || (Ey = 1, (function(n) {
    function o(U, G) {
      var K = U.length;
      U.push(G);
      e: for (; 0 < K; ) {
        var ve = K - 1 >>> 1, ie = U[ve];
        if (0 < c(ie, G))
          U[ve] = G, U[K] = ie, K = ve;
        else break e;
      }
    }
    function r(U) {
      return U.length === 0 ? null : U[0];
    }
    function i(U) {
      if (U.length === 0) return null;
      var G = U[0], K = U.pop();
      if (K !== G) {
        U[0] = K;
        e: for (var ve = 0, ie = U.length, j = ie >>> 1; ve < j; ) {
          var F = 2 * (ve + 1) - 1, te = U[F], oe = F + 1, ge = U[oe];
          if (0 > c(te, K))
            oe < ie && 0 > c(ge, te) ? (U[ve] = ge, U[oe] = K, ve = oe) : (U[ve] = te, U[F] = K, ve = F);
          else if (oe < ie && 0 > c(ge, K))
            U[ve] = ge, U[oe] = K, ve = oe;
          else break e;
        }
      }
      return G;
    }
    function c(U, G) {
      var K = U.sortIndex - G.sortIndex;
      return K !== 0 ? K : U.id - G.id;
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
    var g = [], h = [], y = 1, S = null, v = 3, C = !1, _ = !1, A = !1, R = !1, w = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function D(U) {
      for (var G = r(h); G !== null; ) {
        if (G.callback === null) i(h);
        else if (G.startTime <= U)
          i(h), G.sortIndex = G.expirationTime, o(g, G);
        else break;
        G = r(h);
      }
    }
    function L(U) {
      if (A = !1, D(U), !_)
        if (r(g) !== null)
          _ = !0, I || (I = !0, fe());
        else {
          var G = r(h);
          G !== null && be(L, G.startTime - U);
        }
    }
    var I = !1, B = -1, V = 5, P = -1;
    function ee() {
      return R ? !0 : !(n.unstable_now() - P < V);
    }
    function se() {
      if (R = !1, I) {
        var U = n.unstable_now();
        P = U;
        var G = !0;
        try {
          e: {
            _ = !1, A && (A = !1, O(B), B = -1), C = !0;
            var K = v;
            try {
              t: {
                for (D(U), S = r(g); S !== null && !(S.expirationTime > U && ee()); ) {
                  var ve = S.callback;
                  if (typeof ve == "function") {
                    S.callback = null, v = S.priorityLevel;
                    var ie = ve(
                      S.expirationTime <= U
                    );
                    if (U = n.unstable_now(), typeof ie == "function") {
                      S.callback = ie, D(U), G = !0;
                      break t;
                    }
                    S === r(g) && i(g), D(U);
                  } else i(g);
                  S = r(g);
                }
                if (S !== null) G = !0;
                else {
                  var j = r(h);
                  j !== null && be(
                    L,
                    j.startTime - U
                  ), G = !1;
                }
              }
              break e;
            } finally {
              S = null, v = K, C = !1;
            }
            G = void 0;
          }
        } finally {
          G ? fe() : I = !1;
        }
      }
    }
    var fe;
    if (typeof k == "function")
      fe = function() {
        k(se);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), me = le.port2;
      le.port1.onmessage = se, fe = function() {
        me.postMessage(null);
      };
    } else
      fe = function() {
        w(se, 0);
      };
    function be(U, G) {
      B = w(function() {
        U(n.unstable_now());
      }, G);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, n.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : V = 0 < U ? Math.floor(1e3 / U) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, n.unstable_next = function(U) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = v;
      }
      var K = v;
      v = G;
      try {
        return U();
      } finally {
        v = K;
      }
    }, n.unstable_requestPaint = function() {
      R = !0;
    }, n.unstable_runWithPriority = function(U, G) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var K = v;
      v = U;
      try {
        return G();
      } finally {
        v = K;
      }
    }, n.unstable_scheduleCallback = function(U, G, K) {
      var ve = n.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ve + K : ve) : K = ve, U) {
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
      return ie = K + ie, U = {
        id: y++,
        callback: G,
        priorityLevel: U,
        startTime: K,
        expirationTime: ie,
        sortIndex: -1
      }, K > ve ? (U.sortIndex = K, o(h, U), r(g) === null && U === r(h) && (A ? (O(B), B = -1) : A = !0, be(L, K - ve))) : (U.sortIndex = ie, o(g, U), _ || C || (_ = !0, I || (I = !0, fe()))), U;
    }, n.unstable_shouldYield = ee, n.unstable_wrapCallback = function(U) {
      var G = v;
      return function() {
        var K = v;
        v = G;
        try {
          return U.apply(this, arguments);
        } finally {
          v = K;
        }
      };
    };
  })(Ud)), Ud;
}
var Cy;
function gC() {
  return Cy || (Cy = 1, Hd.exports = pC()), Hd.exports;
}
var Bd = { exports: {} }, ot = {};
var _y;
function bC() {
  if (_y) return ot;
  _y = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function C(j) {
    return j === null || typeof j != "object" ? null : (j = v && j[v] || j["@@iterator"], typeof j == "function" ? j : null);
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
  }, A = Object.assign, R = {};
  function w(j, F, te) {
    this.props = j, this.context = F, this.refs = R, this.updater = te || _;
  }
  w.prototype.isReactComponent = {}, w.prototype.setState = function(j, F) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, F, "setState");
  }, w.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function O() {
  }
  O.prototype = w.prototype;
  function k(j, F, te) {
    this.props = j, this.context = F, this.refs = R, this.updater = te || _;
  }
  var D = k.prototype = new O();
  D.constructor = k, A(D, w.prototype), D.isPureReactComponent = !0;
  var L = Array.isArray;
  function I() {
  }
  var B = { H: null, A: null, T: null, S: null }, V = Object.prototype.hasOwnProperty;
  function P(j, F, te) {
    var oe = te.ref;
    return {
      $$typeof: n,
      type: j,
      key: F,
      ref: oe !== void 0 ? oe : null,
      props: te
    };
  }
  function ee(j, F) {
    return P(j.type, F, j.props);
  }
  function se(j) {
    return typeof j == "object" && j !== null && j.$$typeof === n;
  }
  function fe(j) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(te) {
      return F[te];
    });
  }
  var le = /\/+/g;
  function me(j, F) {
    return typeof j == "object" && j !== null && j.key != null ? fe("" + j.key) : F.toString(36);
  }
  function be(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(I, I) : (j.status = "pending", j.then(
          function(F) {
            j.status === "pending" && (j.status = "fulfilled", j.value = F);
          },
          function(F) {
            j.status === "pending" && (j.status = "rejected", j.reason = F);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function U(j, F, te, oe, ge) {
    var _e = typeof j;
    (_e === "undefined" || _e === "boolean") && (j = null);
    var Ye = !1;
    if (j === null) Ye = !0;
    else
      switch (_e) {
        case "bigint":
        case "string":
        case "number":
          Ye = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case n:
            case o:
              Ye = !0;
              break;
            case y:
              return Ye = j._init, U(
                Ye(j._payload),
                F,
                te,
                oe,
                ge
              );
          }
      }
    if (Ye)
      return ge = ge(j), Ye = oe === "" ? "." + me(j, 0) : oe, L(ge) ? (te = "", Ye != null && (te = Ye.replace(le, "$&/") + "/"), U(ge, F, te, "", function(it) {
        return it;
      })) : ge != null && (se(ge) && (ge = ee(
        ge,
        te + (ge.key == null || j && j.key === ge.key ? "" : ("" + ge.key).replace(
          le,
          "$&/"
        ) + "/") + Ye
      )), F.push(ge)), 1;
    Ye = 0;
    var we = oe === "" ? "." : oe + ":";
    if (L(j))
      for (var Me = 0; Me < j.length; Me++)
        oe = j[Me], _e = we + me(oe, Me), Ye += U(
          oe,
          F,
          te,
          _e,
          ge
        );
    else if (Me = C(j), typeof Me == "function")
      for (j = Me.call(j), Me = 0; !(oe = j.next()).done; )
        oe = oe.value, _e = we + me(oe, Me++), Ye += U(
          oe,
          F,
          te,
          _e,
          ge
        );
    else if (_e === "object") {
      if (typeof j.then == "function")
        return U(
          be(j),
          F,
          te,
          oe,
          ge
        );
      throw F = String(j), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ye;
  }
  function G(j, F, te) {
    if (j == null) return j;
    var oe = [], ge = 0;
    return U(j, oe, "", "", function(_e) {
      return F.call(te, _e, ge++);
    }), oe;
  }
  function K(j) {
    if (j._status === -1) {
      var F = j._result;
      F = F(), F.then(
        function(te) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = te);
        },
        function(te) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = te);
        }
      ), j._status === -1 && (j._status = 0, j._result = F);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var F = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(F)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, ie = {
    map: G,
    forEach: function(j, F, te) {
      G(
        j,
        function() {
          F.apply(this, arguments);
        },
        te
      );
    },
    count: function(j) {
      var F = 0;
      return G(j, function() {
        F++;
      }), F;
    },
    toArray: function(j) {
      return G(j, function(F) {
        return F;
      }) || [];
    },
    only: function(j) {
      if (!se(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return ot.Activity = S, ot.Children = ie, ot.Component = w, ot.Fragment = r, ot.Profiler = c, ot.PureComponent = k, ot.StrictMode = i, ot.Suspense = g, ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, ot.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return B.H.useMemoCache(j);
    }
  }, ot.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, ot.cacheSignal = function() {
    return null;
  }, ot.cloneElement = function(j, F, te) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var oe = A({}, j.props), ge = j.key;
    if (F != null)
      for (_e in F.key !== void 0 && (ge = "" + F.key), F)
        !V.call(F, _e) || _e === "key" || _e === "__self" || _e === "__source" || _e === "ref" && F.ref === void 0 || (oe[_e] = F[_e]);
    var _e = arguments.length - 2;
    if (_e === 1) oe.children = te;
    else if (1 < _e) {
      for (var Ye = Array(_e), we = 0; we < _e; we++)
        Ye[we] = arguments[we + 2];
      oe.children = Ye;
    }
    return P(j.type, ge, oe);
  }, ot.createContext = function(j) {
    return j = {
      $$typeof: d,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: f,
      _context: j
    }, j;
  }, ot.createElement = function(j, F, te) {
    var oe, ge = {}, _e = null;
    if (F != null)
      for (oe in F.key !== void 0 && (_e = "" + F.key), F)
        V.call(F, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (ge[oe] = F[oe]);
    var Ye = arguments.length - 2;
    if (Ye === 1) ge.children = te;
    else if (1 < Ye) {
      for (var we = Array(Ye), Me = 0; Me < Ye; Me++)
        we[Me] = arguments[Me + 2];
      ge.children = we;
    }
    if (j && j.defaultProps)
      for (oe in Ye = j.defaultProps, Ye)
        ge[oe] === void 0 && (ge[oe] = Ye[oe]);
    return P(j, _e, ge);
  }, ot.createRef = function() {
    return { current: null };
  }, ot.forwardRef = function(j) {
    return { $$typeof: m, render: j };
  }, ot.isValidElement = se, ot.lazy = function(j) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: j },
      _init: K
    };
  }, ot.memo = function(j, F) {
    return {
      $$typeof: h,
      type: j,
      compare: F === void 0 ? null : F
    };
  }, ot.startTransition = function(j) {
    var F = B.T, te = {};
    B.T = te;
    try {
      var oe = j(), ge = B.S;
      ge !== null && ge(te, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(I, ve);
    } catch (_e) {
      ve(_e);
    } finally {
      F !== null && te.types !== null && (F.types = te.types), B.T = F;
    }
  }, ot.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, ot.use = function(j) {
    return B.H.use(j);
  }, ot.useActionState = function(j, F, te) {
    return B.H.useActionState(j, F, te);
  }, ot.useCallback = function(j, F) {
    return B.H.useCallback(j, F);
  }, ot.useContext = function(j) {
    return B.H.useContext(j);
  }, ot.useDebugValue = function() {
  }, ot.useDeferredValue = function(j, F) {
    return B.H.useDeferredValue(j, F);
  }, ot.useEffect = function(j, F) {
    return B.H.useEffect(j, F);
  }, ot.useEffectEvent = function(j) {
    return B.H.useEffectEvent(j);
  }, ot.useId = function() {
    return B.H.useId();
  }, ot.useImperativeHandle = function(j, F, te) {
    return B.H.useImperativeHandle(j, F, te);
  }, ot.useInsertionEffect = function(j, F) {
    return B.H.useInsertionEffect(j, F);
  }, ot.useLayoutEffect = function(j, F) {
    return B.H.useLayoutEffect(j, F);
  }, ot.useMemo = function(j, F) {
    return B.H.useMemo(j, F);
  }, ot.useOptimistic = function(j, F) {
    return B.H.useOptimistic(j, F);
  }, ot.useReducer = function(j, F, te) {
    return B.H.useReducer(j, F, te);
  }, ot.useRef = function(j) {
    return B.H.useRef(j);
  }, ot.useState = function(j) {
    return B.H.useState(j);
  }, ot.useSyncExternalStore = function(j, F, te) {
    return B.H.useSyncExternalStore(
      j,
      F,
      te
    );
  }, ot.useTransition = function() {
    return B.H.useTransition();
  }, ot.version = "19.2.8", ot;
}
var Ry;
function Cs() {
  return Ry || (Ry = 1, Bd.exports = bC()), Bd.exports;
}
var Gd = { exports: {} }, Gn = {};
var wy;
function yC() {
  if (wy) return Gn;
  wy = 1;
  var n = Cs();
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
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: S == null ? null : "" + S,
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
  return Gn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, Gn.createPortal = function(g, h) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return f(g, h, null, y);
  }, Gn.flushSync = function(g) {
    var h = d.T, y = i.p;
    try {
      if (d.T = null, i.p = 2, g) return g();
    } finally {
      d.T = h, i.p = y, i.d.f();
    }
  }, Gn.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, i.d.C(g, h));
  }, Gn.prefetchDNS = function(g) {
    typeof g == "string" && i.d.D(g);
  }, Gn.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var y = h.as, S = m(y, h.crossOrigin), v = typeof h.integrity == "string" ? h.integrity : void 0, C = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      y === "style" ? i.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: S,
          integrity: v,
          fetchPriority: C
        }
      ) : y === "script" && i.d.X(g, {
        crossOrigin: S,
        integrity: v,
        fetchPriority: C,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Gn.preinitModule = function(g, h) {
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
  }, Gn.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var y = h.as, S = m(y, h.crossOrigin);
      i.d.L(g, y, {
        crossOrigin: S,
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
  }, Gn.preloadModule = function(g, h) {
    if (typeof g == "string")
      if (h) {
        var y = m(h.as, h.crossOrigin);
        i.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: y,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else i.d.m(g);
  }, Gn.requestFormReset = function(g) {
    i.d.r(g);
  }, Gn.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, Gn.useFormState = function(g, h, y) {
    return d.H.useFormState(g, h, y);
  }, Gn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Gn.version = "19.2.8", Gn;
}
var My;
function e0() {
  if (My) return Gd.exports;
  My = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Gd.exports = yC(), Gd.exports;
}
var Ay;
function vC() {
  if (Ay) return rs;
  Ay = 1;
  var n = gC(), o = Cs(), r = e0();
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
        for (var p = !1, E = s.child; E; ) {
          if (E === l) {
            p = !0, l = s, a = u;
            break;
          }
          if (E === a) {
            p = !0, a = s, l = u;
            break;
          }
          E = E.sibling;
        }
        if (!p) {
          for (E = u.child; E; ) {
            if (E === l) {
              p = !0, l = u, a = s;
              break;
            }
            if (E === a) {
              p = !0, a = u, l = s;
              break;
            }
            E = E.sibling;
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
  var S = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), C = /* @__PURE__ */ Symbol.for("react.transitional.element"), _ = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), R = /* @__PURE__ */ Symbol.for("react.strict_mode"), w = /* @__PURE__ */ Symbol.for("react.profiler"), O = /* @__PURE__ */ Symbol.for("react.consumer"), k = /* @__PURE__ */ Symbol.for("react.context"), D = /* @__PURE__ */ Symbol.for("react.forward_ref"), L = /* @__PURE__ */ Symbol.for("react.suspense"), I = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), V = /* @__PURE__ */ Symbol.for("react.lazy"), P = /* @__PURE__ */ Symbol.for("react.activity"), ee = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
  function fe(e) {
    return e === null || typeof e != "object" ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = /* @__PURE__ */ Symbol.for("react.client.reference");
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case w:
        return "Profiler";
      case R:
        return "StrictMode";
      case L:
        return "Suspense";
      case I:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return "Portal";
        case k:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case D:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case B:
          return t = e.displayName || null, t !== null ? t : me(e.type) || "Memo";
        case V:
          t = e._payload, e = e._init;
          try {
            return me(e(t));
          } catch {
          }
      }
    return null;
  }
  var be = Array.isArray, U = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ve = [], ie = -1;
  function j(e) {
    return { current: e };
  }
  function F(e) {
    0 > ie || (e.current = ve[ie], ve[ie] = null, ie--);
  }
  function te(e, t) {
    ie++, ve[ie] = e.current, e.current = t;
  }
  var oe = j(null), ge = j(null), _e = j(null), Ye = j(null);
  function we(e, t) {
    switch (te(_e, t), te(ge, e), te(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Ub(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Ub(t), e = Bb(t, e);
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
    F(oe), te(oe, e);
  }
  function Me() {
    F(oe), F(ge), F(_e);
  }
  function it(e) {
    e.memoizedState !== null && te(Ye, e);
    var t = oe.current, l = Bb(t, e.type);
    t !== l && (te(ge, e), te(oe, l));
  }
  function pt(e) {
    ge.current === e && (F(oe), F(ge)), Ye.current === e && (F(Ye), ts._currentValue = K);
  }
  var ke, tt;
  function Te(e) {
    if (ke === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ke = t && t[1] || "", tt = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ke + e + tt;
  }
  var Oe = !1;
  function Ue(e, t) {
    if (!e || Oe) return "";
    Oe = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var pe = function() {
                throw Error();
              };
              if (Object.defineProperty(pe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(pe, []);
                } catch (ae) {
                  var W = ae;
                }
                Reflect.construct(e, [], pe);
              } else {
                try {
                  pe.call();
                } catch (ae) {
                  W = ae;
                }
                e.call(pe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ae) {
                W = ae;
              }
              (pe = e()) && typeof pe.catch == "function" && pe.catch(function() {
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
      var u = a.DetermineComponentFrameRoot(), p = u[0], E = u[1];
      if (p && E) {
        var H = p.split(`
`), J = E.split(`
`);
        for (s = a = 0; a < H.length && !H[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; s < J.length && !J[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (a === H.length || s === J.length)
          for (a = H.length - 1, s = J.length - 1; 1 <= a && 0 <= s && H[a] !== J[s]; )
            s--;
        for (; 1 <= a && 0 <= s; a--, s--)
          if (H[a] !== J[s]) {
            if (a !== 1 || s !== 1)
              do
                if (a--, s--, 0 > s || H[a] !== J[s]) {
                  var ue = `
` + H[a].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= a && 0 <= s);
            break;
          }
      }
    } finally {
      Oe = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Te(l) : "";
  }
  function Re(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Te(e.type);
      case 16:
        return Te("Lazy");
      case 13:
        return e.child !== t && t !== null ? Te("Suspense Fallback") : Te("Suspense");
      case 19:
        return Te("SuspenseList");
      case 0:
      case 15:
        return Ue(e.type, !1);
      case 11:
        return Ue(e.type.render, !1);
      case 1:
        return Ue(e.type, !0);
      case 31:
        return Te("Activity");
      default:
        return "";
    }
  }
  function Fe(e) {
    try {
      var t = "", l = null;
      do
        t += Re(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ae = Object.prototype.hasOwnProperty, $e = n.unstable_scheduleCallback, nt = n.unstable_cancelCallback, Ke = n.unstable_shouldYield, Se = n.unstable_requestPaint, Z = n.unstable_now, ce = n.unstable_getCurrentPriorityLevel, He = n.unstable_ImmediatePriority, ye = n.unstable_UserBlockingPriority, Le = n.unstable_NormalPriority, Je = n.unstable_LowPriority, Mt = n.unstable_IdlePriority, Et = n.log, jt = n.unstable_setDisableYieldValue, Ot = null, xt = null;
  function an(e) {
    if (typeof Et == "function" && jt(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Ot, e);
      } catch {
      }
  }
  var dt = Math.clz32 ? Math.clz32 : tn, mn = Math.log, Qt = Math.LN2;
  function tn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (mn(e) / Qt | 0) | 0;
  }
  var St = 256, Jt = 262144, at = 4194304;
  function lt(e) {
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
  function We(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var s = 0, u = e.suspendedLanes, p = e.pingedLanes;
    e = e.warmLanes;
    var E = a & 134217727;
    return E !== 0 ? (a = E & ~u, a !== 0 ? s = lt(a) : (p &= E, p !== 0 ? s = lt(p) : l || (l = E & ~e, l !== 0 && (s = lt(l))))) : (E = a & ~u, E !== 0 ? s = lt(E) : p !== 0 ? s = lt(p) : l || (l = a & ~e, l !== 0 && (s = lt(l)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : s;
  }
  function Wt(e, t) {
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
  function qt() {
    var e = at;
    return at <<= 1, (at & 62914560) === 0 && (at = 4194304), e;
  }
  function Bt(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Pn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function kt(e, t, l, a, s, u) {
    var p = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var E = e.entanglements, H = e.expirationTimes, J = e.hiddenUpdates;
    for (l = p & ~l; 0 < l; ) {
      var ue = 31 - dt(l), pe = 1 << ue;
      E[ue] = 0, H[ue] = -1;
      var W = J[ue];
      if (W !== null)
        for (J[ue] = null, ue = 0; ue < W.length; ue++) {
          var ae = W[ue];
          ae !== null && (ae.lane &= -536870913);
        }
      l &= ~pe;
    }
    a !== 0 && uo(e, a, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(p & ~t));
  }
  function uo(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - dt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function Xn(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - dt(l), s = 1 << a;
      s & t | e[a] & t && (e[a] |= t), l &= ~s;
    }
  }
  function rn(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : fo(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function fo(e) {
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
  function Ml(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Jn() {
    var e = G.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : uy(e.type));
  }
  function Eo(e, t) {
    var l = G.p;
    try {
      return G.p = e, t();
    } finally {
      G.p = l;
    }
  }
  var En = Math.random().toString(36).slice(2), At = "__reactFiber$" + En, Ct = "__reactProps$" + En, Ge = "__reactContainer$" + En, Ln = "__reactEvents$" + En, wr = "__reactListeners$" + En, Mr = "__reactHandles$" + En, Co = "__reactResources$" + En, Al = "__reactMarker$" + En;
  function rt(e) {
    delete e[At], delete e[Ct], delete e[Ln], delete e[wr], delete e[Mr];
  }
  function fl(e) {
    var t = e[At];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ge] || l[At]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Kb(e); e !== null; ) {
            if (l = e[At]) return l;
            e = Kb(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Tl(e) {
    if (e = e[At] || e[Ge]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Vn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(i(33));
  }
  function In(e) {
    var t = e[Co];
    return t || (t = e[Co] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function en(e) {
    e[Al] = !0;
  }
  var pn = /* @__PURE__ */ new Set(), Hn = {};
  function Ol(e, t) {
    Ql(e, t), Ql(e + "Capture", t);
  }
  function Ql(e, t) {
    for (Hn[e] = t, e = 0; e < t.length; e++)
      pn.add(t[e]);
  }
  var _o = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ar = {}, Zl = {};
  function Ro(e) {
    return Ae.call(Zl, e) ? !0 : Ae.call(Ar, e) ? !1 : _o.test(e) ? Zl[e] = !0 : (Ar[e] = !0, !1);
  }
  function kl(e, t, l) {
    if (Ro(t))
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
  function ea(e, t, l) {
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
  function Wn(e, t, l, a) {
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
  function nn(e) {
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
  function Kn(e, t, l) {
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
  function $l(e) {
    if (!e._valueTracker) {
      var t = Fn(e) ? "checked" : "value";
      e._valueTracker = Kn(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function wo(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = Fn(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Mo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Jl = /[\n"\\]/g;
  function Gt(e) {
    return e.replace(
      Jl,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ao(e, t, l, a, s, u, p, E) {
    e.name = "", p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.type = p : e.removeAttribute("type"), t != null ? p === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + nn(t)) : e.value !== "" + nn(t) && (e.value = "" + nn(t)) : p !== "submit" && p !== "reset" || e.removeAttribute("value"), t != null ? ta(e, p, nn(t)) : l != null ? ta(e, p, nn(l)) : a != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + nn(E) : e.removeAttribute("name");
  }
  function Tr(e, t, l, a, s, u, p, E) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        $l(e);
        return;
      }
      l = l != null ? "" + nn(l) : "", t = t != null ? "" + nn(t) : l, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? s, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = E ? e.checked : !!a, e.defaultChecked = !!a, p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.name = p), $l(e);
  }
  function ta(e, t, l) {
    t === "number" && Mo(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function dl(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < l.length; s++)
        t["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = t.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + nn(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, a && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Fa(e, t, l) {
    if (t != null && (t = "" + nn(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + nn(l) : "";
  }
  function To(e, t, l, a) {
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
    l = nn(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), $l(e);
  }
  function Wl(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var na = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ka(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || na.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Oo(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(i(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var s in t)
        a = t[s], t.hasOwnProperty(s) && l[s] !== a && Ka(e, s, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Ka(e, u, t[u]);
  }
  function Nl(e) {
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
  var la = /* @__PURE__ */ new Map([
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
  ]), hl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function eo(e) {
    return hl.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Ht() {
  }
  var ko = null;
  function to(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var zl = null, no = null;
  function oa(e) {
    var t = Tl(e);
    if (t && (e = t.stateNode)) {
      var l = e[Ct] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ao(
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
              'input[name="' + Gt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var s = a[Ct] || null;
                if (!s) throw Error(i(90));
                Ao(
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
              a = l[t], a.form === e.form && wo(a);
          }
          break e;
        case "textarea":
          Fa(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && dl(e, !!l.multiple, t, !1);
      }
    }
  }
  var T = !1;
  function N(e, t, l) {
    if (T) return e(t, l);
    T = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (T = !1, (zl !== null || no !== null) && (gc(), zl && (t = zl, e = no, no = zl = null, oa(t), e)))
        for (t = 0; t < e.length; t++) oa(e[t]);
    }
  }
  function M(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[Ct] || null;
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
  var z = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), q = !1;
  if (z)
    try {
      var Q = {};
      Object.defineProperty(Q, "passive", {
        get: function() {
          q = !0;
        }
      }), window.addEventListener("test", Q, Q), window.removeEventListener("test", Q, Q);
    } catch {
      q = !1;
    }
  var ne = null, re = null, de = null;
  function Ce() {
    if (de) return de;
    var e, t = re, l = t.length, a, s = "value" in ne ? ne.value : ne.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var p = l - e;
    for (a = 1; a <= p && t[l - a] === s[u - a]; a++) ;
    return de = s.slice(e, 1 < a ? 1 - a : void 0);
  }
  function ze(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Qe() {
    return !0;
  }
  function Ie() {
    return !1;
  }
  function Ne(e) {
    function t(l, a, s, u, p) {
      this._reactName = l, this._targetInst = s, this.type = a, this.nativeEvent = u, this.target = p, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (l = e[E], this[E] = l ? l(u) : u[E]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Qe : Ie, this.isPropagationStopped = Ie, this;
    }
    return S(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Qe);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Qe);
      },
      persist: function() {
      },
      isPersistent: Qe
    }), t;
  }
  var Nt = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, sn = Ne(Nt), Un = S({}, Nt, { view: 0, detail: 0 }), aa = Ne(Un), gn, el, wn, tl = S({}, Un, {
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
    getModifierState: Uu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== wn && (wn && e.type === "mousemove" ? (gn = e.screenX - wn.screenX, el = e.screenY - wn.screenY) : el = gn = 0, wn = e), gn);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : el;
    }
  }), lo = Ne(tl), Qn = S({}, tl, { dataTransfer: 0 }), oo = Ne(Qn), Or = S({}, Un, { relatedTarget: 0 }), kr = Ne(Or), Ds = S({}, Nt, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mS = Ne(Ds), pS = S({}, Nt, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), gS = Ne(pS), bS = S({}, Nt, { data: 0 }), qm = Ne(bS), yS = {
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
  }, vS = {
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
  }, xS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function SS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = xS[e]) ? !!t[e] : !1;
  }
  function Uu() {
    return SS;
  }
  var ES = S({}, Un, {
    key: function(e) {
      if (e.key) {
        var t = yS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ze(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? vS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Uu,
    charCode: function(e) {
      return e.type === "keypress" ? ze(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ze(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), CS = Ne(ES), _S = S({}, tl, {
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
  }), Pm = Ne(_S), RS = S({}, Un, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Uu
  }), wS = Ne(RS), MS = S({}, Nt, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), AS = Ne(MS), TS = S({}, tl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), OS = Ne(TS), kS = S({}, Nt, {
    newState: 0,
    oldState: 0
  }), NS = Ne(kS), zS = [9, 13, 27, 32], Bu = z && "CompositionEvent" in window, Ei = null;
  z && "documentMode" in document && (Ei = document.documentMode);
  var DS = z && "TextEvent" in window && !Ei, Xm = z && (!Bu || Ei && 8 < Ei && 11 >= Ei), Fm = " ", Km = !1;
  function Qm(e, t) {
    switch (e) {
      case "keyup":
        return zS.indexOf(t.keyCode) !== -1;
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
  function Zm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Nr = !1;
  function jS(e, t) {
    switch (e) {
      case "compositionend":
        return Zm(t);
      case "keypress":
        return t.which !== 32 ? null : (Km = !0, Fm);
      case "textInput":
        return e = t.data, e === Fm && Km ? null : e;
      default:
        return null;
    }
  }
  function LS(e, t) {
    if (Nr)
      return e === "compositionend" || !Bu && Qm(e, t) ? (e = Ce(), de = re = ne = null, Nr = !1, e) : null;
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
        return Xm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var VS = {
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
  function $m(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!VS[e.type] : t === "textarea";
  }
  function Jm(e, t, l, a) {
    zl ? no ? no.push(a) : no = [a] : zl = a, t = Cc(t, "onChange"), 0 < t.length && (l = new sn(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var Ci = null, _i = null;
  function IS(e) {
    Db(e, 0);
  }
  function js(e) {
    var t = Vn(e);
    if (wo(t)) return e;
  }
  function Wm(e, t) {
    if (e === "change") return t;
  }
  var ep = !1;
  if (z) {
    var Gu;
    if (z) {
      var Yu = "oninput" in document;
      if (!Yu) {
        var tp = document.createElement("div");
        tp.setAttribute("oninput", "return;"), Yu = typeof tp.oninput == "function";
      }
      Gu = Yu;
    } else Gu = !1;
    ep = Gu && (!document.documentMode || 9 < document.documentMode);
  }
  function np() {
    Ci && (Ci.detachEvent("onpropertychange", lp), _i = Ci = null);
  }
  function lp(e) {
    if (e.propertyName === "value" && js(_i)) {
      var t = [];
      Jm(
        t,
        _i,
        e,
        to(e)
      ), N(IS, t);
    }
  }
  function HS(e, t, l) {
    e === "focusin" ? (np(), Ci = t, _i = l, Ci.attachEvent("onpropertychange", lp)) : e === "focusout" && np();
  }
  function US(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return js(_i);
  }
  function BS(e, t) {
    if (e === "click") return js(t);
  }
  function GS(e, t) {
    if (e === "input" || e === "change")
      return js(t);
  }
  function YS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ml = typeof Object.is == "function" ? Object.is : YS;
  function Ri(e, t) {
    if (ml(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var s = l[a];
      if (!Ae.call(t, s) || !ml(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function op(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ap(e, t) {
    var l = op(e);
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
      l = op(l);
    }
  }
  function rp(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? rp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ip(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Mo(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Mo(e.document);
    }
    return t;
  }
  function qu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var qS = z && "documentMode" in document && 11 >= document.documentMode, zr = null, Pu = null, wi = null, Xu = !1;
  function sp(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Xu || zr == null || zr !== Mo(a) || (a = zr, "selectionStart" in a && qu(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), wi && Ri(wi, a) || (wi = a, a = Cc(Pu, "onSelect"), 0 < a.length && (t = new sn(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = zr)));
  }
  function Qa(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Dr = {
    animationend: Qa("Animation", "AnimationEnd"),
    animationiteration: Qa("Animation", "AnimationIteration"),
    animationstart: Qa("Animation", "AnimationStart"),
    transitionrun: Qa("Transition", "TransitionRun"),
    transitionstart: Qa("Transition", "TransitionStart"),
    transitioncancel: Qa("Transition", "TransitionCancel"),
    transitionend: Qa("Transition", "TransitionEnd")
  }, Fu = {}, cp = {};
  z && (cp = document.createElement("div").style, "AnimationEvent" in window || (delete Dr.animationend.animation, delete Dr.animationiteration.animation, delete Dr.animationstart.animation), "TransitionEvent" in window || delete Dr.transitionend.transition);
  function Za(e) {
    if (Fu[e]) return Fu[e];
    if (!Dr[e]) return e;
    var t = Dr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in cp)
        return Fu[e] = t[l];
    return e;
  }
  var up = Za("animationend"), fp = Za("animationiteration"), dp = Za("animationstart"), PS = Za("transitionrun"), XS = Za("transitionstart"), FS = Za("transitioncancel"), hp = Za("transitionend"), mp = /* @__PURE__ */ new Map(), Ku = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ku.push("scrollEnd");
  function ao(e, t) {
    mp.set(e, t), Ol(t, [e]);
  }
  var Ls = typeof reportError == "function" ? reportError : function(e) {
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
  }, Dl = [], jr = 0, Qu = 0;
  function Vs() {
    for (var e = jr, t = Qu = jr = 0; t < e; ) {
      var l = Dl[t];
      Dl[t++] = null;
      var a = Dl[t];
      Dl[t++] = null;
      var s = Dl[t];
      Dl[t++] = null;
      var u = Dl[t];
      if (Dl[t++] = null, a !== null && s !== null) {
        var p = a.pending;
        p === null ? s.next = s : (s.next = p.next, p.next = s), a.pending = s;
      }
      u !== 0 && pp(l, s, u);
    }
  }
  function Is(e, t, l, a) {
    Dl[jr++] = e, Dl[jr++] = t, Dl[jr++] = l, Dl[jr++] = a, Qu |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Zu(e, t, l, a) {
    return Is(e, t, l, a), Hs(e);
  }
  function $a(e, t) {
    return Is(e, null, null, t), Hs(e);
  }
  function pp(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - dt(l), e = u.hiddenUpdates, a = e[s], a === null ? e[s] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function Hs(e) {
    if (50 < Ki)
      throw Ki = 0, rd = null, Error(i(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Lr = {};
  function KS(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function pl(e, t, l, a) {
    return new KS(e, t, l, a);
  }
  function $u(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function No(e, t) {
    var l = e.alternate;
    return l === null ? (l = pl(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function gp(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Us(e, t, l, a, s, u) {
    var p = 0;
    if (a = e, typeof e == "function") $u(e) && (p = 1);
    else if (typeof e == "string")
      p = WE(
        e,
        l,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case P:
          return e = pl(31, l, t, s), e.elementType = P, e.lanes = u, e;
        case A:
          return Ja(l.children, s, u, t);
        case R:
          p = 8, s |= 24;
          break;
        case w:
          return e = pl(12, l, t, s | 2), e.elementType = w, e.lanes = u, e;
        case L:
          return e = pl(13, l, t, s), e.elementType = L, e.lanes = u, e;
        case I:
          return e = pl(19, l, t, s), e.elementType = I, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case k:
                p = 10;
                break e;
              case O:
                p = 9;
                break e;
              case D:
                p = 11;
                break e;
              case B:
                p = 14;
                break e;
              case V:
                p = 16, a = null;
                break e;
            }
          p = 29, l = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = pl(p, l, t, s), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function Ja(e, t, l, a) {
    return e = pl(7, e, a, t), e.lanes = l, e;
  }
  function Ju(e, t, l) {
    return e = pl(6, e, null, t), e.lanes = l, e;
  }
  function bp(e) {
    var t = pl(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Wu(e, t, l) {
    return t = pl(
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
  var yp = /* @__PURE__ */ new WeakMap();
  function jl(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = yp.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Fe(t)
      }, yp.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Fe(t)
    };
  }
  var Vr = [], Ir = 0, Bs = null, Mi = 0, Ll = [], Vl = 0, ra = null, ho = 1, mo = "";
  function zo(e, t) {
    Vr[Ir++] = Mi, Vr[Ir++] = Bs, Bs = e, Mi = t;
  }
  function vp(e, t, l) {
    Ll[Vl++] = ho, Ll[Vl++] = mo, Ll[Vl++] = ra, ra = e;
    var a = ho;
    e = mo;
    var s = 32 - dt(a) - 1;
    a &= ~(1 << s), l += 1;
    var u = 32 - dt(t) + s;
    if (30 < u) {
      var p = s - s % 5;
      u = (a & (1 << p) - 1).toString(32), a >>= p, s -= p, ho = 1 << 32 - dt(t) + s | l << s | a, mo = u + e;
    } else
      ho = 1 << u | l << s | a, mo = e;
  }
  function ef(e) {
    e.return !== null && (zo(e, 1), vp(e, 1, 0));
  }
  function tf(e) {
    for (; e === Bs; )
      Bs = Vr[--Ir], Vr[Ir] = null, Mi = Vr[--Ir], Vr[Ir] = null;
    for (; e === ra; )
      ra = Ll[--Vl], Ll[Vl] = null, mo = Ll[--Vl], Ll[Vl] = null, ho = Ll[--Vl], Ll[Vl] = null;
  }
  function xp(e, t) {
    Ll[Vl++] = ho, Ll[Vl++] = mo, Ll[Vl++] = ra, ho = t.id, mo = t.overflow, ra = e;
  }
  var On = null, Pt = null, yt = !1, ia = null, Il = !1, nf = Error(i(519));
  function sa(e) {
    var t = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ai(jl(t, e)), nf;
  }
  function Sp(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[At] = e, t[Ct] = a, l) {
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
        for (l = 0; l < Zi.length; l++)
          mt(Zi[l], t);
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
        mt("invalid", t), Tr(
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
        mt("invalid", t), To(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Ib(t.textContent, l) ? (a.popover != null && (mt("beforetoggle", t), mt("toggle", t)), a.onScroll != null && mt("scroll", t), a.onScrollEnd != null && mt("scrollend", t), a.onClick != null && (t.onclick = Ht), t = !0) : t = !1, t || sa(e, !0);
  }
  function Ep(e) {
    for (On = e.return; On; )
      switch (On.tag) {
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
          On = On.return;
      }
  }
  function Hr(e) {
    if (e !== On) return !1;
    if (!yt) return Ep(e), yt = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Sd(e.type, e.memoizedProps)), l = !l), l && Pt && sa(e), Ep(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Pt = Fb(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Pt = Fb(e);
    } else
      t === 27 ? (t = Pt, Ea(e.type) ? (e = wd, wd = null, Pt = e) : Pt = t) : Pt = On ? Ul(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Wa() {
    Pt = On = null, yt = !1;
  }
  function lf() {
    var e = ia;
    return e !== null && (al === null ? al = e : al.push.apply(
      al,
      e
    ), ia = null), e;
  }
  function Ai(e) {
    ia === null ? ia = [e] : ia.push(e);
  }
  var of = j(null), er = null, Do = null;
  function ca(e, t, l) {
    te(of, t._currentValue), t._currentValue = l;
  }
  function jo(e) {
    e._currentValue = of.current, F(of);
  }
  function af(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function rf(e, t, l, a) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var p = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var E = u;
          u = s;
          for (var H = 0; H < t.length; H++)
            if (E.context === t[H]) {
              u.lanes |= l, E = u.alternate, E !== null && (E.lanes |= l), af(
                u.return,
                l,
                e
              ), a || (p = null);
              break e;
            }
          u = E.next;
        }
      } else if (s.tag === 18) {
        if (p = s.return, p === null) throw Error(i(341));
        p.lanes |= l, u = p.alternate, u !== null && (u.lanes |= l), af(p, l, e), p = null;
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
  function Ur(e, t, l, a) {
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
          var E = s.type;
          ml(s.pendingProps.value, p.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (s === Ye.current) {
        if (p = s.alternate, p === null) throw Error(i(387));
        p.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(ts) : e = [ts]);
      }
      s = s.return;
    }
    e !== null && rf(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function Gs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ml(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function tr(e) {
    er = e, Do = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function kn(e) {
    return Cp(er, e);
  }
  function Ys(e, t) {
    return er === null && tr(e), Cp(e, t);
  }
  function Cp(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Do === null) {
      if (e === null) throw Error(i(308));
      Do = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Do = Do.next = t;
    return l;
  }
  var QS = typeof AbortController < "u" ? AbortController : function() {
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
  }, ZS = n.unstable_scheduleCallback, $S = n.unstable_NormalPriority, bn = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function sf() {
    return {
      controller: new QS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ti(e) {
    e.refCount--, e.refCount === 0 && ZS($S, function() {
      e.controller.abort();
    });
  }
  var Oi = null, cf = 0, Br = 0, Gr = null;
  function JS(e, t) {
    if (Oi === null) {
      var l = Oi = [];
      cf = 0, Br = dd(), Gr = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return cf++, t.then(_p, _p), t;
  }
  function _p() {
    if (--cf === 0 && Oi !== null) {
      Gr !== null && (Gr.status = "fulfilled");
      var e = Oi;
      Oi = null, Br = 0, Gr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function WS(e, t) {
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
  var Rp = U.S;
  U.S = function(e, t) {
    sb = Z(), typeof t == "object" && t !== null && typeof t.then == "function" && JS(e, t), Rp !== null && Rp(e, t);
  };
  var nr = j(null);
  function uf() {
    var e = nr.current;
    return e !== null ? e : Ut.pooledCache;
  }
  function qs(e, t) {
    t === null ? te(nr, nr.current) : te(nr, t.pool);
  }
  function wp() {
    var e = uf();
    return e === null ? null : { parent: bn._currentValue, pool: e };
  }
  var Yr = Error(i(460)), ff = Error(i(474)), Ps = Error(i(542)), Xs = { then: function() {
  } };
  function Mp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ap(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Ht, Ht), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Op(e), e;
      default:
        if (typeof t.status == "string") t.then(Ht, Ht);
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
            throw e = t.reason, Op(e), e;
        }
        throw or = t, Yr;
    }
  }
  function lr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (or = l, Yr) : l;
    }
  }
  var or = null;
  function Tp() {
    if (or === null) throw Error(i(459));
    var e = or;
    return or = null, e;
  }
  function Op(e) {
    if (e === Yr || e === Ps)
      throw Error(i(483));
  }
  var qr = null, ki = 0;
  function Fs(e) {
    var t = ki;
    return ki += 1, qr === null && (qr = []), Ap(qr, e, t);
  }
  function Ni(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ks(e, t) {
    throw t.$$typeof === v ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function kp(e) {
    function t(X, Y) {
      if (e) {
        var $ = X.deletions;
        $ === null ? (X.deletions = [Y], X.flags |= 16) : $.push(Y);
      }
    }
    function l(X, Y) {
      if (!e) return null;
      for (; Y !== null; )
        t(X, Y), Y = Y.sibling;
      return null;
    }
    function a(X) {
      for (var Y = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? Y.set(X.key, X) : Y.set(X.index, X), X = X.sibling;
      return Y;
    }
    function s(X, Y) {
      return X = No(X, Y), X.index = 0, X.sibling = null, X;
    }
    function u(X, Y, $) {
      return X.index = $, e ? ($ = X.alternate, $ !== null ? ($ = $.index, $ < Y ? (X.flags |= 67108866, Y) : $) : (X.flags |= 67108866, Y)) : (X.flags |= 1048576, Y);
    }
    function p(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, Y, $, he) {
      return Y === null || Y.tag !== 6 ? (Y = Ju($, X.mode, he), Y.return = X, Y) : (Y = s(Y, $), Y.return = X, Y);
    }
    function H(X, Y, $, he) {
      var qe = $.type;
      return qe === A ? ue(
        X,
        Y,
        $.props.children,
        he,
        $.key
      ) : Y !== null && (Y.elementType === qe || typeof qe == "object" && qe !== null && qe.$$typeof === V && lr(qe) === Y.type) ? (Y = s(Y, $.props), Ni(Y, $), Y.return = X, Y) : (Y = Us(
        $.type,
        $.key,
        $.props,
        null,
        X.mode,
        he
      ), Ni(Y, $), Y.return = X, Y);
    }
    function J(X, Y, $, he) {
      return Y === null || Y.tag !== 4 || Y.stateNode.containerInfo !== $.containerInfo || Y.stateNode.implementation !== $.implementation ? (Y = Wu($, X.mode, he), Y.return = X, Y) : (Y = s(Y, $.children || []), Y.return = X, Y);
    }
    function ue(X, Y, $, he, qe) {
      return Y === null || Y.tag !== 7 ? (Y = Ja(
        $,
        X.mode,
        he,
        qe
      ), Y.return = X, Y) : (Y = s(Y, $), Y.return = X, Y);
    }
    function pe(X, Y, $) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Y = Ju(
          "" + Y,
          X.mode,
          $
        ), Y.return = X, Y;
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case C:
            return $ = Us(
              Y.type,
              Y.key,
              Y.props,
              null,
              X.mode,
              $
            ), Ni($, Y), $.return = X, $;
          case _:
            return Y = Wu(
              Y,
              X.mode,
              $
            ), Y.return = X, Y;
          case V:
            return Y = lr(Y), pe(X, Y, $);
        }
        if (be(Y) || fe(Y))
          return Y = Ja(
            Y,
            X.mode,
            $,
            null
          ), Y.return = X, Y;
        if (typeof Y.then == "function")
          return pe(X, Fs(Y), $);
        if (Y.$$typeof === k)
          return pe(
            X,
            Ys(X, Y),
            $
          );
        Ks(X, Y);
      }
      return null;
    }
    function W(X, Y, $, he) {
      var qe = Y !== null ? Y.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return qe !== null ? null : E(X, Y, "" + $, he);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            return $.key === qe ? H(X, Y, $, he) : null;
          case _:
            return $.key === qe ? J(X, Y, $, he) : null;
          case V:
            return $ = lr($), W(X, Y, $, he);
        }
        if (be($) || fe($))
          return qe !== null ? null : ue(X, Y, $, he, null);
        if (typeof $.then == "function")
          return W(
            X,
            Y,
            Fs($),
            he
          );
        if ($.$$typeof === k)
          return W(
            X,
            Y,
            Ys(X, $),
            he
          );
        Ks(X, $);
      }
      return null;
    }
    function ae(X, Y, $, he, qe) {
      if (typeof he == "string" && he !== "" || typeof he == "number" || typeof he == "bigint")
        return X = X.get($) || null, E(Y, X, "" + he, qe);
      if (typeof he == "object" && he !== null) {
        switch (he.$$typeof) {
          case C:
            return X = X.get(
              he.key === null ? $ : he.key
            ) || null, H(Y, X, he, qe);
          case _:
            return X = X.get(
              he.key === null ? $ : he.key
            ) || null, J(Y, X, he, qe);
          case V:
            return he = lr(he), ae(
              X,
              Y,
              $,
              he,
              qe
            );
        }
        if (be(he) || fe(he))
          return X = X.get($) || null, ue(Y, X, he, qe, null);
        if (typeof he.then == "function")
          return ae(
            X,
            Y,
            $,
            Fs(he),
            qe
          );
        if (he.$$typeof === k)
          return ae(
            X,
            Y,
            $,
            Ys(Y, he),
            qe
          );
        Ks(Y, he);
      }
      return null;
    }
    function Ve(X, Y, $, he) {
      for (var qe = null, _t = null, Be = Y, ut = Y = 0, bt = null; Be !== null && ut < $.length; ut++) {
        Be.index > ut ? (bt = Be, Be = null) : bt = Be.sibling;
        var Rt = W(
          X,
          Be,
          $[ut],
          he
        );
        if (Rt === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Rt.alternate === null && t(X, Be), Y = u(Rt, Y, ut), _t === null ? qe = Rt : _t.sibling = Rt, _t = Rt, Be = bt;
      }
      if (ut === $.length)
        return l(X, Be), yt && zo(X, ut), qe;
      if (Be === null) {
        for (; ut < $.length; ut++)
          Be = pe(X, $[ut], he), Be !== null && (Y = u(
            Be,
            Y,
            ut
          ), _t === null ? qe = Be : _t.sibling = Be, _t = Be);
        return yt && zo(X, ut), qe;
      }
      for (Be = a(Be); ut < $.length; ut++)
        bt = ae(
          Be,
          X,
          ut,
          $[ut],
          he
        ), bt !== null && (e && bt.alternate !== null && Be.delete(
          bt.key === null ? ut : bt.key
        ), Y = u(
          bt,
          Y,
          ut
        ), _t === null ? qe = bt : _t.sibling = bt, _t = bt);
      return e && Be.forEach(function(Ma) {
        return t(X, Ma);
      }), yt && zo(X, ut), qe;
    }
    function Ze(X, Y, $, he) {
      if ($ == null) throw Error(i(151));
      for (var qe = null, _t = null, Be = Y, ut = Y = 0, bt = null, Rt = $.next(); Be !== null && !Rt.done; ut++, Rt = $.next()) {
        Be.index > ut ? (bt = Be, Be = null) : bt = Be.sibling;
        var Ma = W(X, Be, Rt.value, he);
        if (Ma === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Ma.alternate === null && t(X, Be), Y = u(Ma, Y, ut), _t === null ? qe = Ma : _t.sibling = Ma, _t = Ma, Be = bt;
      }
      if (Rt.done)
        return l(X, Be), yt && zo(X, ut), qe;
      if (Be === null) {
        for (; !Rt.done; ut++, Rt = $.next())
          Rt = pe(X, Rt.value, he), Rt !== null && (Y = u(Rt, Y, ut), _t === null ? qe = Rt : _t.sibling = Rt, _t = Rt);
        return yt && zo(X, ut), qe;
      }
      for (Be = a(Be); !Rt.done; ut++, Rt = $.next())
        Rt = ae(Be, X, ut, Rt.value, he), Rt !== null && (e && Rt.alternate !== null && Be.delete(Rt.key === null ? ut : Rt.key), Y = u(Rt, Y, ut), _t === null ? qe = Rt : _t.sibling = Rt, _t = Rt);
      return e && Be.forEach(function(uC) {
        return t(X, uC);
      }), yt && zo(X, ut), qe;
    }
    function It(X, Y, $, he) {
      if (typeof $ == "object" && $ !== null && $.type === A && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            e: {
              for (var qe = $.key; Y !== null; ) {
                if (Y.key === qe) {
                  if (qe = $.type, qe === A) {
                    if (Y.tag === 7) {
                      l(
                        X,
                        Y.sibling
                      ), he = s(
                        Y,
                        $.props.children
                      ), he.return = X, X = he;
                      break e;
                    }
                  } else if (Y.elementType === qe || typeof qe == "object" && qe !== null && qe.$$typeof === V && lr(qe) === Y.type) {
                    l(
                      X,
                      Y.sibling
                    ), he = s(Y, $.props), Ni(he, $), he.return = X, X = he;
                    break e;
                  }
                  l(X, Y);
                  break;
                } else t(X, Y);
                Y = Y.sibling;
              }
              $.type === A ? (he = Ja(
                $.props.children,
                X.mode,
                he,
                $.key
              ), he.return = X, X = he) : (he = Us(
                $.type,
                $.key,
                $.props,
                null,
                X.mode,
                he
              ), Ni(he, $), he.return = X, X = he);
            }
            return p(X);
          case _:
            e: {
              for (qe = $.key; Y !== null; ) {
                if (Y.key === qe)
                  if (Y.tag === 4 && Y.stateNode.containerInfo === $.containerInfo && Y.stateNode.implementation === $.implementation) {
                    l(
                      X,
                      Y.sibling
                    ), he = s(Y, $.children || []), he.return = X, X = he;
                    break e;
                  } else {
                    l(X, Y);
                    break;
                  }
                else t(X, Y);
                Y = Y.sibling;
              }
              he = Wu($, X.mode, he), he.return = X, X = he;
            }
            return p(X);
          case V:
            return $ = lr($), It(
              X,
              Y,
              $,
              he
            );
        }
        if (be($))
          return Ve(
            X,
            Y,
            $,
            he
          );
        if (fe($)) {
          if (qe = fe($), typeof qe != "function") throw Error(i(150));
          return $ = qe.call($), Ze(
            X,
            Y,
            $,
            he
          );
        }
        if (typeof $.then == "function")
          return It(
            X,
            Y,
            Fs($),
            he
          );
        if ($.$$typeof === k)
          return It(
            X,
            Y,
            Ys(X, $),
            he
          );
        Ks(X, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, Y !== null && Y.tag === 6 ? (l(X, Y.sibling), he = s(Y, $), he.return = X, X = he) : (l(X, Y), he = Ju($, X.mode, he), he.return = X, X = he), p(X)) : l(X, Y);
    }
    return function(X, Y, $, he) {
      try {
        ki = 0;
        var qe = It(
          X,
          Y,
          $,
          he
        );
        return qr = null, qe;
      } catch (Be) {
        if (Be === Yr || Be === Ps) throw Be;
        var _t = pl(29, Be, null, X.mode);
        return _t.lanes = he, _t.return = X, _t;
      }
    };
  }
  var ar = kp(!0), Np = kp(!1), ua = !1;
  function df(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function hf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function fa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function da(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Tt & 2) !== 0) {
      var s = a.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), a.pending = t, t = Hs(e), pp(e, null, l), t;
    }
    return Is(e, a, t, l), Hs(e);
  }
  function zi(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Xn(e, l);
    }
  }
  function mf(e, t) {
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
  var pf = !1;
  function Di() {
    if (pf) {
      var e = Gr;
      if (e !== null) throw e;
    }
  }
  function ji(e, t, l, a) {
    pf = !1;
    var s = e.updateQueue;
    ua = !1;
    var u = s.firstBaseUpdate, p = s.lastBaseUpdate, E = s.shared.pending;
    if (E !== null) {
      s.shared.pending = null;
      var H = E, J = H.next;
      H.next = null, p === null ? u = J : p.next = J, p = H;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== p && (E === null ? ue.firstBaseUpdate = J : E.next = J, ue.lastBaseUpdate = H));
    }
    if (u !== null) {
      var pe = s.baseState;
      p = 0, ue = J = H = null, E = u;
      do {
        var W = E.lane & -536870913, ae = W !== E.lane;
        if (ae ? (gt & W) === W : (a & W) === W) {
          W !== 0 && W === Br && (pf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Ve = e, Ze = E;
            W = t;
            var It = l;
            switch (Ze.tag) {
              case 1:
                if (Ve = Ze.payload, typeof Ve == "function") {
                  pe = Ve.call(It, pe, W);
                  break e;
                }
                pe = Ve;
                break e;
              case 3:
                Ve.flags = Ve.flags & -65537 | 128;
              case 0:
                if (Ve = Ze.payload, W = typeof Ve == "function" ? Ve.call(It, pe, W) : Ve, W == null) break e;
                pe = S({}, pe, W);
                break e;
              case 2:
                ua = !0;
            }
          }
          W = E.callback, W !== null && (e.flags |= 64, ae && (e.flags |= 8192), ae = s.callbacks, ae === null ? s.callbacks = [W] : ae.push(W));
        } else
          ae = {
            lane: W,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ue === null ? (J = ue = ae, H = pe) : ue = ue.next = ae, p |= W;
        if (E = E.next, E === null) {
          if (E = s.shared.pending, E === null)
            break;
          ae = E, E = ae.next, ae.next = null, s.lastBaseUpdate = ae, s.shared.pending = null;
        }
      } while (!0);
      ue === null && (H = pe), s.baseState = H, s.firstBaseUpdate = J, s.lastBaseUpdate = ue, u === null && (s.shared.lanes = 0), ba |= p, e.lanes = p, e.memoizedState = pe;
    }
  }
  function zp(e, t) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(t);
  }
  function Dp(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        zp(l[e], t);
  }
  var Pr = j(null), Qs = j(0);
  function jp(e, t) {
    e = qo, te(Qs, e), te(Pr, t), qo = e | t.baseLanes;
  }
  function gf() {
    te(Qs, qo), te(Pr, Pr.current);
  }
  function bf() {
    qo = Qs.current, F(Pr), F(Qs);
  }
  var gl = j(null), Hl = null;
  function ha(e) {
    var t = e.alternate;
    te(cn, cn.current & 1), te(gl, e), Hl === null && (t === null || Pr.current !== null || t.memoizedState !== null) && (Hl = e);
  }
  function yf(e) {
    te(cn, cn.current), te(gl, e), Hl === null && (Hl = e);
  }
  function Lp(e) {
    e.tag === 22 ? (te(cn, cn.current), te(gl, e), Hl === null && (Hl = e)) : ma();
  }
  function ma() {
    te(cn, cn.current), te(gl, gl.current);
  }
  function bl(e) {
    F(gl), Hl === e && (Hl = null), F(cn);
  }
  var cn = j(0);
  function Zs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || _d(l) || Rd(l)))
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
  var Lo = 0, st = null, Lt = null, yn = null, $s = !1, Xr = !1, rr = !1, Js = 0, Li = 0, Fr = null, eE = 0;
  function ln() {
    throw Error(i(321));
  }
  function vf(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!ml(e[l], t[l])) return !1;
    return !0;
  }
  function xf(e, t, l, a, s, u) {
    return Lo = u, st = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? vg : jf, rr = !1, u = l(a, s), rr = !1, Xr && (u = Ip(
      t,
      l,
      a,
      s
    )), Vp(e), u;
  }
  function Vp(e) {
    U.H = Hi;
    var t = Lt !== null && Lt.next !== null;
    if (Lo = 0, yn = Lt = st = null, $s = !1, Li = 0, Fr = null, t) throw Error(i(300));
    e === null || vn || (e = e.dependencies, e !== null && Gs(e) && (vn = !0));
  }
  function Ip(e, t, l, a) {
    st = e;
    var s = 0;
    do {
      if (Xr && (Fr = null), Li = 0, Xr = !1, 25 <= s) throw Error(i(301));
      if (s += 1, yn = Lt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      U.H = xg, u = t(l, a);
    } while (Xr);
    return u;
  }
  function tE() {
    var e = U.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Vi(t) : t, e = e.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== e && (st.flags |= 1024), t;
  }
  function Sf() {
    var e = Js !== 0;
    return Js = 0, e;
  }
  function Ef(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Cf(e) {
    if ($s) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      $s = !1;
    }
    Lo = 0, yn = Lt = st = null, Xr = !1, Li = Js = 0, Fr = null;
  }
  function Zn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return yn === null ? st.memoizedState = yn = e : yn = yn.next = e, yn;
  }
  function un() {
    if (Lt === null) {
      var e = st.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Lt.next;
    var t = yn === null ? st.memoizedState : yn.next;
    if (t !== null)
      yn = t, Lt = e;
    else {
      if (e === null)
        throw st.alternate === null ? Error(i(467)) : Error(i(310));
      Lt = e, e = {
        memoizedState: Lt.memoizedState,
        baseState: Lt.baseState,
        baseQueue: Lt.baseQueue,
        queue: Lt.queue,
        next: null
      }, yn === null ? st.memoizedState = yn = e : yn = yn.next = e;
    }
    return yn;
  }
  function Ws() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Vi(e) {
    var t = Li;
    return Li += 1, Fr === null && (Fr = []), e = Ap(Fr, e, t), t = st, (yn === null ? t.memoizedState : yn.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? vg : jf), e;
  }
  function ec(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Vi(e);
      if (e.$$typeof === k) return kn(e);
    }
    throw Error(i(438, String(e)));
  }
  function _f(e) {
    var t = null, l = st.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = st.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Ws(), st.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = ee;
    return t.index++, l;
  }
  function Vo(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function tc(e) {
    var t = un();
    return Rf(t, Lt, e);
  }
  function Rf(e, t, l) {
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
      var E = p = null, H = null, J = t, ue = !1;
      do {
        var pe = J.lane & -536870913;
        if (pe !== J.lane ? (gt & pe) === pe : (Lo & pe) === pe) {
          var W = J.revertLane;
          if (W === 0)
            H !== null && (H = H.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }), pe === Br && (ue = !0);
          else if ((Lo & W) === W) {
            J = J.next, W === Br && (ue = !0);
            continue;
          } else
            pe = {
              lane: 0,
              revertLane: J.revertLane,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }, H === null ? (E = H = pe, p = u) : H = H.next = pe, st.lanes |= W, ba |= W;
          pe = J.action, rr && l(u, pe), u = J.hasEagerState ? J.eagerState : l(u, pe);
        } else
          W = {
            lane: pe,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, H === null ? (E = H = W, p = u) : H = H.next = W, st.lanes |= pe, ba |= pe;
        J = J.next;
      } while (J !== null && J !== t);
      if (H === null ? p = u : H.next = E, !ml(u, e.memoizedState) && (vn = !0, ue && (l = Gr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = p, e.baseQueue = H, a.lastRenderedState = u;
    }
    return s === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function wf(e) {
    var t = un(), l = t.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, s = l.pending, u = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var p = s = s.next;
      do
        u = e(u, p.action), p = p.next;
      while (p !== s);
      ml(u, t.memoizedState) || (vn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Hp(e, t, l) {
    var a = st, s = un(), u = yt;
    if (u) {
      if (l === void 0) throw Error(i(407));
      l = l();
    } else l = t();
    var p = !ml(
      (Lt || s).memoizedState,
      l
    );
    if (p && (s.memoizedState = l, vn = !0), s = s.queue, Tf(Gp.bind(null, a, s, e), [
      e
    ]), s.getSnapshot !== t || p || yn !== null && yn.memoizedState.tag & 1) {
      if (a.flags |= 2048, Kr(
        9,
        { destroy: void 0 },
        Bp.bind(
          null,
          a,
          s,
          l,
          t
        ),
        null
      ), Ut === null) throw Error(i(349));
      u || (Lo & 127) !== 0 || Up(a, t, l);
    }
    return l;
  }
  function Up(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = st.updateQueue, t === null ? (t = Ws(), st.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Bp(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Yp(t) && qp(e);
  }
  function Gp(e, t, l) {
    return l(function() {
      Yp(t) && qp(e);
    });
  }
  function Yp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !ml(e, l);
    } catch {
      return !0;
    }
  }
  function qp(e) {
    var t = $a(e, 2);
    t !== null && rl(t, e, 2);
  }
  function Mf(e) {
    var t = Zn();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), rr) {
        an(!0);
        try {
          l();
        } finally {
          an(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vo,
      lastRenderedState: e
    }, t;
  }
  function Pp(e, t, l, a) {
    return e.baseState = l, Rf(
      e,
      Lt,
      typeof a == "function" ? a : Vo
    );
  }
  function nE(e, t, l, a, s) {
    if (oc(e)) throw Error(i(485));
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
      U.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, Xp(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Xp(e, t) {
    var l = t.action, a = t.payload, s = e.state;
    if (t.isTransition) {
      var u = U.T, p = {};
      U.T = p;
      try {
        var E = l(s, a), H = U.S;
        H !== null && H(p, E), Fp(e, t, E);
      } catch (J) {
        Af(e, t, J);
      } finally {
        u !== null && p.types !== null && (u.types = p.types), U.T = u;
      }
    } else
      try {
        u = l(s, a), Fp(e, t, u);
      } catch (J) {
        Af(e, t, J);
      }
  }
  function Fp(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Kp(e, t, a);
      },
      function(a) {
        return Af(e, t, a);
      }
    ) : Kp(e, t, l);
  }
  function Kp(e, t, l) {
    t.status = "fulfilled", t.value = l, Qp(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Xp(e, l)));
  }
  function Af(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, Qp(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Qp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Zp(e, t) {
    return t;
  }
  function $p(e, t) {
    if (yt) {
      var l = Ut.formState;
      if (l !== null) {
        e: {
          var a = st;
          if (yt) {
            if (Pt) {
              t: {
                for (var s = Pt, u = Il; s.nodeType !== 8; ) {
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
                Pt = Ul(
                  s.nextSibling
                ), a = s.data === "F!";
                break e;
              }
            }
            sa(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return l = Zn(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zp,
      lastRenderedState: t
    }, l.queue = a, l = gg.bind(
      null,
      st,
      a
    ), a.dispatch = l, a = Mf(!1), u = Df.bind(
      null,
      st,
      !1,
      a.queue
    ), a = Zn(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = s, l = nE.bind(
      null,
      st,
      s,
      u,
      l
    ), s.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function Jp(e) {
    var t = un();
    return Wp(t, Lt, e);
  }
  function Wp(e, t, l) {
    if (t = Rf(
      e,
      t,
      Zp
    )[0], e = tc(Vo)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Vi(t);
      } catch (p) {
        throw p === Yr ? Ps : p;
      }
    else a = t;
    t = un();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (st.flags |= 2048, Kr(
      9,
      { destroy: void 0 },
      lE.bind(null, s, l),
      null
    )), [a, u, e];
  }
  function lE(e, t) {
    e.action = t;
  }
  function eg(e) {
    var t = un(), l = Lt;
    if (l !== null)
      return Wp(t, l, e);
    un(), t = t.memoizedState, l = un();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function Kr(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = st.updateQueue, t === null && (t = Ws(), st.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function tg() {
    return un().memoizedState;
  }
  function nc(e, t, l, a) {
    var s = Zn();
    st.flags |= e, s.memoizedState = Kr(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function lc(e, t, l, a) {
    var s = un();
    a = a === void 0 ? null : a;
    var u = s.memoizedState.inst;
    Lt !== null && a !== null && vf(a, Lt.memoizedState.deps) ? s.memoizedState = Kr(t, u, l, a) : (st.flags |= e, s.memoizedState = Kr(
      1 | t,
      u,
      l,
      a
    ));
  }
  function ng(e, t) {
    nc(8390656, 8, e, t);
  }
  function Tf(e, t) {
    lc(2048, 8, e, t);
  }
  function oE(e) {
    st.flags |= 4;
    var t = st.updateQueue;
    if (t === null)
      t = Ws(), st.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function lg(e) {
    var t = un().memoizedState;
    return oE({ ref: t, nextImpl: e }), function() {
      if ((Tt & 2) !== 0) throw Error(i(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function og(e, t) {
    return lc(4, 2, e, t);
  }
  function ag(e, t) {
    return lc(4, 4, e, t);
  }
  function rg(e, t) {
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
  function ig(e, t, l) {
    l = l != null ? l.concat([e]) : null, lc(4, 4, rg.bind(null, t, e), l);
  }
  function Of() {
  }
  function sg(e, t) {
    var l = un();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && vf(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function cg(e, t) {
    var l = un();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && vf(t, a[1]))
      return a[0];
    if (a = e(), rr) {
      an(!0);
      try {
        e();
      } finally {
        an(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function kf(e, t, l) {
    return l === void 0 || (Lo & 1073741824) !== 0 && (gt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = ub(), st.lanes |= e, ba |= e, l);
  }
  function ug(e, t, l, a) {
    return ml(l, t) ? l : Pr.current !== null ? (e = kf(e, l, a), ml(e, t) || (vn = !0), e) : (Lo & 42) === 0 || (Lo & 1073741824) !== 0 && (gt & 261930) === 0 ? (vn = !0, e.memoizedState = l) : (e = ub(), st.lanes |= e, ba |= e, t);
  }
  function fg(e, t, l, a, s) {
    var u = G.p;
    G.p = u !== 0 && 8 > u ? u : 8;
    var p = U.T, E = {};
    U.T = E, Df(e, !1, t, l);
    try {
      var H = s(), J = U.S;
      if (J !== null && J(E, H), H !== null && typeof H == "object" && typeof H.then == "function") {
        var ue = WS(
          H,
          a
        );
        Ii(
          e,
          t,
          ue,
          xl(e)
        );
      } else
        Ii(
          e,
          t,
          a,
          xl(e)
        );
    } catch (pe) {
      Ii(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: pe },
        xl()
      );
    } finally {
      G.p = u, p !== null && E.types !== null && (p.types = E.types), U.T = p;
    }
  }
  function aE() {
  }
  function Nf(e, t, l, a) {
    if (e.tag !== 5) throw Error(i(476));
    var s = dg(e).queue;
    fg(
      e,
      s,
      t,
      K,
      l === null ? aE : function() {
        return hg(e), l(a);
      }
    );
  }
  function dg(e) {
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
        lastRenderedReducer: Vo,
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
        lastRenderedReducer: Vo,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function hg(e) {
    var t = dg(e);
    t.next === null && (t = e.alternate.memoizedState), Ii(
      e,
      t.next.queue,
      {},
      xl()
    );
  }
  function zf() {
    return kn(ts);
  }
  function mg() {
    return un().memoizedState;
  }
  function pg() {
    return un().memoizedState;
  }
  function rE(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = xl();
          e = fa(l);
          var a = da(t, e, l);
          a !== null && (rl(a, t, l), zi(a, t, l)), t = { cache: sf() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function iE(e, t, l) {
    var a = xl();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oc(e) ? bg(t, l) : (l = Zu(e, t, l, a), l !== null && (rl(l, e, a), yg(l, t, a)));
  }
  function gg(e, t, l) {
    var a = xl();
    Ii(e, t, l, a);
  }
  function Ii(e, t, l, a) {
    var s = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (oc(e)) bg(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var p = t.lastRenderedState, E = u(p, l);
          if (s.hasEagerState = !0, s.eagerState = E, ml(E, p))
            return Is(e, t, s, 0), Ut === null && Vs(), !1;
        } catch {
        }
      if (l = Zu(e, t, s, a), l !== null)
        return rl(l, e, a), yg(l, t, a), !0;
    }
    return !1;
  }
  function Df(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: dd(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oc(e)) {
      if (t) throw Error(i(479));
    } else
      t = Zu(
        e,
        l,
        a,
        2
      ), t !== null && rl(t, e, 2);
  }
  function oc(e) {
    var t = e.alternate;
    return e === st || t !== null && t === st;
  }
  function bg(e, t) {
    Xr = $s = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function yg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Xn(e, l);
    }
  }
  var Hi = {
    readContext: kn,
    use: ec,
    useCallback: ln,
    useContext: ln,
    useEffect: ln,
    useImperativeHandle: ln,
    useLayoutEffect: ln,
    useInsertionEffect: ln,
    useMemo: ln,
    useReducer: ln,
    useRef: ln,
    useState: ln,
    useDebugValue: ln,
    useDeferredValue: ln,
    useTransition: ln,
    useSyncExternalStore: ln,
    useId: ln,
    useHostTransitionStatus: ln,
    useFormState: ln,
    useActionState: ln,
    useOptimistic: ln,
    useMemoCache: ln,
    useCacheRefresh: ln
  };
  Hi.useEffectEvent = ln;
  var vg = {
    readContext: kn,
    use: ec,
    useCallback: function(e, t) {
      return Zn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: kn,
    useEffect: ng,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, nc(
        4194308,
        4,
        rg.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return nc(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      nc(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = Zn();
      t = t === void 0 ? null : t;
      var a = e();
      if (rr) {
        an(!0);
        try {
          e();
        } finally {
          an(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = Zn();
      if (l !== void 0) {
        var s = l(t);
        if (rr) {
          an(!0);
          try {
            l(t);
          } finally {
            an(!1);
          }
        }
      } else s = t;
      return a.memoizedState = a.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, a.queue = e, e = e.dispatch = iE.bind(
        null,
        st,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = Zn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Mf(e);
      var t = e.queue, l = gg.bind(null, st, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Of,
    useDeferredValue: function(e, t) {
      var l = Zn();
      return kf(l, e, t);
    },
    useTransition: function() {
      var e = Mf(!1);
      return e = fg.bind(
        null,
        st,
        e.queue,
        !0,
        !1
      ), Zn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = st, s = Zn();
      if (yt) {
        if (l === void 0)
          throw Error(i(407));
        l = l();
      } else {
        if (l = t(), Ut === null)
          throw Error(i(349));
        (gt & 127) !== 0 || Up(a, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, ng(Gp.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, Kr(
        9,
        { destroy: void 0 },
        Bp.bind(
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
      var e = Zn(), t = Ut.identifierPrefix;
      if (yt) {
        var l = mo, a = ho;
        l = (a & ~(1 << 32 - dt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Js++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = eE++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: zf,
    useFormState: $p,
    useActionState: $p,
    useOptimistic: function(e) {
      var t = Zn();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Df.bind(
        null,
        st,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: _f,
    useCacheRefresh: function() {
      return Zn().memoizedState = rE.bind(
        null,
        st
      );
    },
    useEffectEvent: function(e) {
      var t = Zn(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Tt & 2) !== 0)
          throw Error(i(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, jf = {
    readContext: kn,
    use: ec,
    useCallback: sg,
    useContext: kn,
    useEffect: Tf,
    useImperativeHandle: ig,
    useInsertionEffect: og,
    useLayoutEffect: ag,
    useMemo: cg,
    useReducer: tc,
    useRef: tg,
    useState: function() {
      return tc(Vo);
    },
    useDebugValue: Of,
    useDeferredValue: function(e, t) {
      var l = un();
      return ug(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = tc(Vo)[0], t = un().memoizedState;
      return [
        typeof e == "boolean" ? e : Vi(e),
        t
      ];
    },
    useSyncExternalStore: Hp,
    useId: mg,
    useHostTransitionStatus: zf,
    useFormState: Jp,
    useActionState: Jp,
    useOptimistic: function(e, t) {
      var l = un();
      return Pp(l, Lt, e, t);
    },
    useMemoCache: _f,
    useCacheRefresh: pg
  };
  jf.useEffectEvent = lg;
  var xg = {
    readContext: kn,
    use: ec,
    useCallback: sg,
    useContext: kn,
    useEffect: Tf,
    useImperativeHandle: ig,
    useInsertionEffect: og,
    useLayoutEffect: ag,
    useMemo: cg,
    useReducer: wf,
    useRef: tg,
    useState: function() {
      return wf(Vo);
    },
    useDebugValue: Of,
    useDeferredValue: function(e, t) {
      var l = un();
      return Lt === null ? kf(l, e, t) : ug(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = wf(Vo)[0], t = un().memoizedState;
      return [
        typeof e == "boolean" ? e : Vi(e),
        t
      ];
    },
    useSyncExternalStore: Hp,
    useId: mg,
    useHostTransitionStatus: zf,
    useFormState: eg,
    useActionState: eg,
    useOptimistic: function(e, t) {
      var l = un();
      return Lt !== null ? Pp(l, Lt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: _f,
    useCacheRefresh: pg
  };
  xg.useEffectEvent = lg;
  function Lf(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : S({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Vf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = xl(), s = fa(a);
      s.payload = t, l != null && (s.callback = l), t = da(e, s, a), t !== null && (rl(t, e, a), zi(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = xl(), s = fa(a);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = da(e, s, a), t !== null && (rl(t, e, a), zi(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = xl(), a = fa(l);
      a.tag = 2, t != null && (a.callback = t), t = da(e, a, l), t !== null && (rl(t, e, l), zi(t, e, l));
    }
  };
  function Sg(e, t, l, a, s, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, p) : t.prototype && t.prototype.isPureReactComponent ? !Ri(l, a) || !Ri(s, u) : !0;
  }
  function Eg(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && Vf.enqueueReplaceState(t, t.state, null);
  }
  function ir(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = S({}, l));
      for (var s in e)
        l[s] === void 0 && (l[s] = e[s]);
    }
    return l;
  }
  function Cg(e) {
    Ls(e);
  }
  function _g(e) {
    console.error(e);
  }
  function Rg(e) {
    Ls(e);
  }
  function ac(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function wg(e, t, l) {
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
  function If(e, t, l) {
    return l = fa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ac(e, t);
    }, l;
  }
  function Mg(e) {
    return e = fa(e), e.tag = 3, e;
  }
  function Ag(e, t, l, a) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = a.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        wg(t, l, a);
      };
    }
    var p = l.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      wg(t, l, a), typeof s != "function" && (ya === null ? ya = /* @__PURE__ */ new Set([this]) : ya.add(this));
      var E = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function sE(e, t, l, a, s) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && Ur(
        t,
        l,
        s,
        !0
      ), l = gl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Hl === null ? bc() : l.alternate === null && on === 0 && (on = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, a === Xs ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), cd(e, a, s)), !1;
          case 22:
            return l.flags |= 65536, a === Xs ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), cd(e, a, s)), !1;
        }
        throw Error(i(435, l.tag));
      }
      return cd(e, a, s), bc(), !1;
    }
    if (yt)
      return t = gl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, a !== nf && (e = Error(i(422), { cause: a }), Ai(jl(e, l)))) : (a !== nf && (t = Error(i(423), {
        cause: a
      }), Ai(
        jl(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, a = jl(a, l), s = If(
        e.stateNode,
        a,
        s
      ), mf(e, s), on !== 4 && (on = 2)), !1;
    var u = Error(i(520), { cause: a });
    if (u = jl(u, l), Fi === null ? Fi = [u] : Fi.push(u), on !== 4 && (on = 2), t === null) return !0;
    a = jl(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = If(l.stateNode, a, e), mf(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ya === null || !ya.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = Mg(s), Ag(
              s,
              e,
              l,
              a
            ), mf(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Hf = Error(i(461)), vn = !1;
  function Nn(e, t, l, a) {
    t.child = e === null ? Np(t, null, l, a) : ar(
      t,
      e.child,
      l,
      a
    );
  }
  function Tg(e, t, l, a, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var p = {};
      for (var E in a)
        E !== "ref" && (p[E] = a[E]);
    } else p = a;
    return tr(t), a = xf(
      e,
      t,
      l,
      p,
      u,
      s
    ), E = Sf(), e !== null && !vn ? (Ef(e, t, s), Io(e, t, s)) : (yt && E && ef(t), t.flags |= 1, Nn(e, t, a, s), t.child);
  }
  function Og(e, t, l, a, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !$u(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, kg(
        e,
        t,
        u,
        a,
        s
      )) : (e = Us(
        l.type,
        null,
        a,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Ff(e, s)) {
      var p = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ri, l(p, a) && e.ref === t.ref)
        return Io(e, t, s);
    }
    return t.flags |= 1, e = No(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function kg(e, t, l, a, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ri(u, a) && e.ref === t.ref)
        if (vn = !1, t.pendingProps = a = u, Ff(e, s))
          (e.flags & 131072) !== 0 && (vn = !0);
        else
          return t.lanes = e.lanes, Io(e, t, s);
    }
    return Uf(
      e,
      t,
      l,
      a,
      s
    );
  }
  function Ng(e, t, l, a) {
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
        return zg(
          e,
          t,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && qs(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? jp(t, u) : gf(), Lp(t);
      else
        return a = t.lanes = 536870912, zg(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (qs(t, u.cachePool), jp(t, u), ma(), t.memoizedState = null) : (e !== null && qs(t, null), gf(), ma());
    return Nn(e, t, s, l), t.child;
  }
  function Ui(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function zg(e, t, l, a, s) {
    var u = uf();
    return u = u === null ? null : { parent: bn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && qs(t, null), gf(), Lp(t), e !== null && Ur(e, t, a, !0), t.childLanes = s, null;
  }
  function rc(e, t) {
    return t = sc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Dg(e, t, l) {
    return ar(t, e.child, null, l), e = rc(t, t.pendingProps), e.flags |= 2, bl(t), t.memoizedState = null, e;
  }
  function cE(e, t, l) {
    var a = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (yt) {
        if (a.mode === "hidden")
          return e = rc(t, a), t.lanes = 536870912, Ui(null, e);
        if (yf(t), (e = Pt) ? (e = Xb(
          e,
          Il
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ra !== null ? { id: ho, overflow: mo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = bp(e), l.return = t, t.child = l, On = t, Pt = null)) : e = null, e === null) throw sa(t);
        return t.lanes = 536870912, null;
      }
      return rc(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var p = u.dehydrated;
      if (yf(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Dg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(i(558));
      else if (vn || Ur(e, t, l, !1), s = (l & e.childLanes) !== 0, vn || s) {
        if (a = Ut, a !== null && (p = rn(a, l), p !== 0 && p !== u.retryLane))
          throw u.retryLane = p, $a(e, p), rl(a, e, p), Hf;
        bc(), t = Dg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, Pt = Ul(p.nextSibling), On = t, yt = !0, ia = null, Il = !1, e !== null && xp(t, e), t = rc(t, a), t.flags |= 4096;
      return t;
    }
    return e = No(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ic(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(i(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Uf(e, t, l, a, s) {
    return tr(t), l = xf(
      e,
      t,
      l,
      a,
      void 0,
      s
    ), a = Sf(), e !== null && !vn ? (Ef(e, t, s), Io(e, t, s)) : (yt && a && ef(t), t.flags |= 1, Nn(e, t, l, s), t.child);
  }
  function jg(e, t, l, a, s, u) {
    return tr(t), t.updateQueue = null, l = Ip(
      t,
      a,
      l,
      s
    ), Vp(e), a = Sf(), e !== null && !vn ? (Ef(e, t, u), Io(e, t, u)) : (yt && a && ef(t), t.flags |= 1, Nn(e, t, l, u), t.child);
  }
  function Lg(e, t, l, a, s) {
    if (tr(t), t.stateNode === null) {
      var u = Lr, p = l.contextType;
      typeof p == "object" && p !== null && (u = kn(p)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Vf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, df(t), p = l.contextType, u.context = typeof p == "object" && p !== null ? kn(p) : Lr, u.state = t.memoizedState, p = l.getDerivedStateFromProps, typeof p == "function" && (Lf(
        t,
        l,
        p,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (p = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), p !== u.state && Vf.enqueueReplaceState(u, u.state, null), ji(t, a, u, s), Di(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var E = t.memoizedProps, H = ir(l, E);
      u.props = H;
      var J = u.context, ue = l.contextType;
      p = Lr, typeof ue == "object" && ue !== null && (p = kn(ue));
      var pe = l.getDerivedStateFromProps;
      ue = typeof pe == "function" || typeof u.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ue || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (E || J !== p) && Eg(
        t,
        u,
        a,
        p
      ), ua = !1;
      var W = t.memoizedState;
      u.state = W, ji(t, a, u, s), Di(), J = t.memoizedState, E || W !== J || ua ? (typeof pe == "function" && (Lf(
        t,
        l,
        pe,
        a
      ), J = t.memoizedState), (H = ua || Sg(
        t,
        l,
        H,
        a,
        W,
        J,
        p
      )) ? (ue || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = J), u.props = a, u.state = J, u.context = p, a = H) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, hf(e, t), p = t.memoizedProps, ue = ir(l, p), u.props = ue, pe = t.pendingProps, W = u.context, J = l.contextType, H = Lr, typeof J == "object" && J !== null && (H = kn(J)), E = l.getDerivedStateFromProps, (J = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p !== pe || W !== H) && Eg(
        t,
        u,
        a,
        H
      ), ua = !1, W = t.memoizedState, u.state = W, ji(t, a, u, s), Di();
      var ae = t.memoizedState;
      p !== pe || W !== ae || ua || e !== null && e.dependencies !== null && Gs(e.dependencies) ? (typeof E == "function" && (Lf(
        t,
        l,
        E,
        a
      ), ae = t.memoizedState), (ue = ua || Sg(
        t,
        l,
        ue,
        a,
        W,
        ae,
        H
      ) || e !== null && e.dependencies !== null && Gs(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, ae, H), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        ae,
        H
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = ae), u.props = a, u.state = ae, u.context = H, a = ue) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, ic(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = ar(
      t,
      e.child,
      null,
      s
    ), t.child = ar(
      t,
      null,
      l,
      s
    )) : Nn(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = Io(
      e,
      t,
      s
    ), e;
  }
  function Vg(e, t, l, a) {
    return Wa(), t.flags |= 256, Nn(e, t, l, a), t.child;
  }
  var Bf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Gf(e) {
    return { baseLanes: e, cachePool: wp() };
  }
  function Yf(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= vl), e;
  }
  function Ig(e, t, l) {
    var a = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, p;
    if ((p = u) || (p = e !== null && e.memoizedState === null ? !1 : (cn.current & 2) !== 0), p && (s = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (yt) {
        if (s ? ha(t) : ma(), (e = Pt) ? (e = Xb(
          e,
          Il
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ra !== null ? { id: ho, overflow: mo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = bp(e), l.return = t, t.child = l, On = t, Pt = null)) : e = null, e === null) throw sa(t);
        return Rd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = a.children;
      return a = a.fallback, s ? (ma(), s = t.mode, E = sc(
        { mode: "hidden", children: E },
        s
      ), a = Ja(
        a,
        s,
        l,
        null
      ), E.return = t, a.return = t, E.sibling = a, t.child = E, a = t.child, a.memoizedState = Gf(l), a.childLanes = Yf(
        e,
        p,
        l
      ), t.memoizedState = Bf, Ui(null, a)) : (ha(t), qf(t, E));
    }
    var H = e.memoizedState;
    if (H !== null && (E = H.dehydrated, E !== null)) {
      if (u)
        t.flags & 256 ? (ha(t), t.flags &= -257, t = Pf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (ma(), t.child = e.child, t.flags |= 128, t = null) : (ma(), E = a.fallback, s = t.mode, a = sc(
          { mode: "visible", children: a.children },
          s
        ), E = Ja(
          E,
          s,
          l,
          null
        ), E.flags |= 2, a.return = t, E.return = t, a.sibling = E, t.child = a, ar(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = Gf(l), a.childLanes = Yf(
          e,
          p,
          l
        ), t.memoizedState = Bf, t = Ui(null, a));
      else if (ha(t), Rd(E)) {
        if (p = E.nextSibling && E.nextSibling.dataset, p) var J = p.dgst;
        p = J, a = Error(i(419)), a.stack = "", a.digest = p, Ai({ value: a, source: null, stack: null }), t = Pf(
          e,
          t,
          l
        );
      } else if (vn || Ur(e, t, l, !1), p = (l & e.childLanes) !== 0, vn || p) {
        if (p = Ut, p !== null && (a = rn(p, l), a !== 0 && a !== H.retryLane))
          throw H.retryLane = a, $a(e, a), rl(p, e, a), Hf;
        _d(E) || bc(), t = Pf(
          e,
          t,
          l
        );
      } else
        _d(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = H.treeContext, Pt = Ul(
          E.nextSibling
        ), On = t, yt = !0, ia = null, Il = !1, e !== null && xp(t, e), t = qf(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (ma(), E = a.fallback, s = t.mode, H = e.child, J = H.sibling, a = No(H, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = H.subtreeFlags & 65011712, J !== null ? E = No(
      J,
      E
    ) : (E = Ja(
      E,
      s,
      l,
      null
    ), E.flags |= 2), E.return = t, a.return = t, a.sibling = E, t.child = a, Ui(null, a), a = t.child, E = e.child.memoizedState, E === null ? E = Gf(l) : (s = E.cachePool, s !== null ? (H = bn._currentValue, s = s.parent !== H ? { parent: H, pool: H } : s) : s = wp(), E = {
      baseLanes: E.baseLanes | l,
      cachePool: s
    }), a.memoizedState = E, a.childLanes = Yf(
      e,
      p,
      l
    ), t.memoizedState = Bf, Ui(e.child, a)) : (ha(t), l = e.child, e = l.sibling, l = No(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (p = t.deletions, p === null ? (t.deletions = [e], t.flags |= 16) : p.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function qf(e, t) {
    return t = sc(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function sc(e, t) {
    return e = pl(22, e, null, t), e.lanes = 0, e;
  }
  function Pf(e, t, l) {
    return ar(t, e.child, null, l), e = qf(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Hg(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), af(e.return, t, l);
  }
  function Xf(e, t, l, a, s, u) {
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
  function Ug(e, t, l) {
    var a = t.pendingProps, s = a.revealOrder, u = a.tail;
    a = a.children;
    var p = cn.current, E = (p & 2) !== 0;
    if (E ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, te(cn, p), Nn(e, t, a, l), a = yt ? Mi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Hg(e, l, t);
        else if (e.tag === 19)
          Hg(e, l, t);
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
          e = l.alternate, e !== null && Zs(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), Xf(
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
          if (e = s.alternate, e !== null && Zs(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        Xf(
          t,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Xf(
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
  function Io(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), ba |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Ur(
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
      for (e = t.child, l = No(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = No(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Ff(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Gs(e)));
  }
  function uE(e, t, l) {
    switch (t.tag) {
      case 3:
        we(t, t.stateNode.containerInfo), ca(t, bn, e.memoizedState.cache), Wa();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        we(t, t.stateNode.containerInfo);
        break;
      case 10:
        ca(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, yf(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ha(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Ig(e, t, l) : (ha(t), e = Io(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ha(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (Ur(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), s) {
          if (a)
            return Ug(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), te(cn, cn.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Ng(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        ca(t, bn, e.memoizedState.cache);
    }
    return Io(e, t, l);
  }
  function Bg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        vn = !0;
      else {
        if (!Ff(e, l) && (t.flags & 128) === 0)
          return vn = !1, uE(
            e,
            t,
            l
          );
        vn = (e.flags & 131072) !== 0;
      }
    else
      vn = !1, yt && (t.flags & 1048576) !== 0 && vp(t, Mi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = lr(t.elementType), t.type = e, typeof e == "function")
            $u(e) ? (a = ir(e, a), t.tag = 1, t = Lg(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = Uf(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === D) {
                t.tag = 11, t = Tg(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (s === B) {
                t.tag = 14, t = Og(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = me(e) || e, Error(i(306, t, ""));
          }
        }
        return t;
      case 0:
        return Uf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return a = t.type, s = ir(
          a,
          t.pendingProps
        ), Lg(
          e,
          t,
          a,
          s,
          l
        );
      case 3:
        e: {
          if (we(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, hf(e, t), ji(t, a, null, l);
          var p = t.memoizedState;
          if (a = p.cache, ca(t, bn, a), a !== u.cache && rf(
            t,
            [bn],
            l,
            !0
          ), Di(), a = p.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: p.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Vg(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== s) {
              s = jl(
                Error(i(424)),
                t
              ), Ai(s), t = Vg(
                e,
                t,
                a,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Pt = Ul(e.firstChild), On = t, yt = !0, ia = null, Il = !0, l = Np(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Wa(), a === s) {
              t = Io(
                e,
                t,
                l
              );
              break e;
            }
            Nn(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ic(e, t), e === null ? (l = Jb(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : yt || (l = t.type, e = t.pendingProps, a = _c(
          _e.current
        ).createElement(l), a[At] = t, a[Ct] = e, zn(a, l, e), en(a), t.stateNode = a) : t.memoizedState = Jb(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && yt && (a = t.stateNode = Qb(
          t.type,
          t.pendingProps,
          _e.current
        ), On = t, Il = !0, s = Pt, Ea(t.type) ? (wd = s, Pt = Ul(a.firstChild)) : Pt = s), Nn(
          e,
          t,
          t.pendingProps.children,
          l
        ), ic(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && yt && ((s = a = Pt) && (a = UE(
          a,
          t.type,
          t.pendingProps,
          Il
        ), a !== null ? (t.stateNode = a, On = t, Pt = Ul(a.firstChild), Il = !1, s = !0) : s = !1), s || sa(t)), it(t), s = t.type, u = t.pendingProps, p = e !== null ? e.memoizedProps : null, a = u.children, Sd(s, u) ? a = null : p !== null && Sd(s, p) && (t.flags |= 32), t.memoizedState !== null && (s = xf(
          e,
          t,
          tE,
          null,
          null,
          l
        ), ts._currentValue = s), ic(e, t), Nn(e, t, a, l), t.child;
      case 6:
        return e === null && yt && ((e = l = Pt) && (l = BE(
          l,
          t.pendingProps,
          Il
        ), l !== null ? (t.stateNode = l, On = t, Pt = null, e = !0) : e = !1), e || sa(t)), null;
      case 13:
        return Ig(e, t, l);
      case 4:
        return we(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = ar(
          t,
          null,
          a,
          l
        ) : Nn(e, t, a, l), t.child;
      case 11:
        return Tg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Nn(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Nn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Nn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return a = t.pendingProps, ca(t, t.type, a.value), Nn(e, t, a.children, l), t.child;
      case 9:
        return s = t.type._context, a = t.pendingProps.children, tr(t), s = kn(s), a = a(s), t.flags |= 1, Nn(e, t, a, l), t.child;
      case 14:
        return Og(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return kg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Ug(e, t, l);
      case 31:
        return cE(e, t, l);
      case 22:
        return Ng(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return tr(t), a = kn(bn), e === null ? (s = uf(), s === null && (s = Ut, u = sf(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: a, cache: s }, df(t), ca(t, bn, s)) : ((e.lanes & l) !== 0 && (hf(e, t), ji(t, null, null, l), Di()), s = e.memoizedState, u = t.memoizedState, s.parent !== a ? (s = { parent: a, cache: a }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), ca(t, bn, a)) : (a = u.cache, ca(t, bn, a), a !== s.cache && rf(
          t,
          [bn],
          l,
          !0
        ))), Nn(
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
  function Ho(e) {
    e.flags |= 4;
  }
  function Kf(e, t, l, a, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (mb()) e.flags |= 8192;
        else
          throw or = Xs, ff;
    } else e.flags &= -16777217;
  }
  function Gg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !ly(t))
      if (mb()) e.flags |= 8192;
      else
        throw or = Xs, ff;
  }
  function cc(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? qt() : 536870912, e.lanes |= t, Jr |= t);
  }
  function Bi(e, t) {
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
  function Xt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, a |= s.subtreeFlags & 65011712, a |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function fE(e, t, l) {
    var a = t.pendingProps;
    switch (tf(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Xt(t), null;
      case 1:
        return Xt(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), jo(bn), Me(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Hr(t) ? Ho(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, lf())), Xt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Ho(t), u !== null ? (Xt(t), Gg(t, u)) : (Xt(t), Kf(
          t,
          s,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (Ho(t), Xt(t), Gg(t, u)) : (Xt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Ho(t), Xt(t), Kf(
          t,
          s,
          e,
          a,
          l
        )), null;
      case 27:
        if (pt(t), l = _e.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Ho(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(i(166));
            return Xt(t), null;
          }
          e = oe.current, Hr(t) ? Sp(t) : (e = Qb(s, a, l), t.stateNode = e, Ho(t));
        }
        return Xt(t), null;
      case 5:
        if (pt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Ho(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(i(166));
            return Xt(t), null;
          }
          if (u = oe.current, Hr(t))
            Sp(t);
          else {
            var p = _c(
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
            u[At] = t, u[Ct] = a;
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
            e: switch (zn(u, s, a), s) {
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
            a && Ho(t);
          }
        }
        return Xt(t), Kf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Ho(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(i(166));
          if (e = _e.current, Hr(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, s = On, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  a = s.memoizedProps;
              }
            e[At] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Ib(e.nodeValue, l)), e || sa(t, !0);
          } else
            e = _c(e).createTextNode(
              a
            ), e[At] = t, t.stateNode = e;
        }
        return Xt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Hr(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(i(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[At] = t;
            } else
              Wa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Xt(t), e = !1;
          } else
            l = lf(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (bl(t), t) : (bl(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Xt(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Hr(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(i(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(i(317));
              s[At] = t;
            } else
              Wa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Xt(t), s = !1;
          } else
            s = lf(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (bl(t), t) : (bl(t), null);
        }
        return bl(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, s = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (s = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== s && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), cc(t, t.updateQueue), Xt(t), null);
      case 4:
        return Me(), e === null && gd(t.stateNode.containerInfo), Xt(t), null;
      case 10:
        return jo(t.type), Xt(t), null;
      case 19:
        if (F(cn), a = t.memoizedState, a === null) return Xt(t), null;
        if (s = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (s) Bi(a, !1);
          else {
            if (on !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Zs(e), u !== null) {
                  for (t.flags |= 128, Bi(a, !1), e = u.updateQueue, t.updateQueue = e, cc(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    gp(l, e), l = l.sibling;
                  return te(
                    cn,
                    cn.current & 1 | 2
                  ), yt && zo(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && Z() > mc && (t.flags |= 128, s = !0, Bi(a, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Zs(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, cc(t, e), Bi(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !yt)
                return Xt(t), null;
            } else
              2 * Z() - a.renderingStartTime > mc && l !== 536870912 && (t.flags |= 128, s = !0, Bi(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Z(), e.sibling = null, l = cn.current, te(
          cn,
          s ? l & 1 | 2 : l & 1
        ), yt && zo(t, a.treeForkCount), e) : (Xt(t), null);
      case 22:
      case 23:
        return bl(t), bf(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Xt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Xt(t), l = t.updateQueue, l !== null && cc(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && F(nr), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), jo(bn), Xt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function dE(e, t) {
    switch (tf(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return jo(bn), Me(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return pt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (bl(t), t.alternate === null)
            throw Error(i(340));
          Wa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (bl(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(i(340));
          Wa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return F(cn), null;
      case 4:
        return Me(), null;
      case 10:
        return jo(t.type), null;
      case 22:
      case 23:
        return bl(t), bf(), e !== null && F(nr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return jo(bn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Yg(e, t) {
    switch (tf(t), t.tag) {
      case 3:
        jo(bn), Me();
        break;
      case 26:
      case 27:
      case 5:
        pt(t);
        break;
      case 4:
        Me();
        break;
      case 31:
        t.memoizedState !== null && bl(t);
        break;
      case 13:
        bl(t);
        break;
      case 19:
        F(cn);
        break;
      case 10:
        jo(t.type);
        break;
      case 22:
      case 23:
        bl(t), bf(), e !== null && F(nr);
        break;
      case 24:
        jo(bn);
    }
  }
  function Gi(e, t) {
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
    } catch (E) {
      Dt(t, t.return, E);
    }
  }
  function pa(e, t, l) {
    try {
      var a = t.updateQueue, s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var p = a.inst, E = p.destroy;
            if (E !== void 0) {
              p.destroy = void 0, s = t;
              var H = l, J = E;
              try {
                J();
              } catch (ue) {
                Dt(
                  s,
                  H,
                  ue
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (ue) {
      Dt(t, t.return, ue);
    }
  }
  function qg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Dp(t, l);
      } catch (a) {
        Dt(e, e.return, a);
      }
    }
  }
  function Pg(e, t, l) {
    l.props = ir(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Dt(e, t, a);
    }
  }
  function Yi(e, t) {
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
      Dt(e, t, s);
    }
  }
  function po(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (s) {
          Dt(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (s) {
          Dt(e, t, s);
        }
      else l.current = null;
  }
  function Xg(e) {
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
      Dt(e, e.return, s);
    }
  }
  function Qf(e, t, l) {
    try {
      var a = e.stateNode;
      DE(a, e.type, l, t), a[Ct] = t;
    } catch (s) {
      Dt(e, e.return, s);
    }
  }
  function Fg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ea(e.type) || e.tag === 4;
  }
  function Zf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Fg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ea(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function $f(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Ht));
    else if (a !== 4 && (a === 27 && Ea(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for ($f(e, t, l), e = e.sibling; e !== null; )
        $f(e, t, l), e = e.sibling;
  }
  function uc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && Ea(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (uc(e, t, l), e = e.sibling; e !== null; )
        uc(e, t, l), e = e.sibling;
  }
  function Kg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      zn(t, a, l), t[At] = e, t[Ct] = l;
    } catch (u) {
      Dt(e, e.return, u);
    }
  }
  var Uo = !1, xn = !1, Jf = !1, Qg = typeof WeakSet == "function" ? WeakSet : Set, Mn = null;
  function hE(e, t) {
    if (e = e.containerInfo, vd = kc, e = ip(e), qu(e)) {
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
            var p = 0, E = -1, H = -1, J = 0, ue = 0, pe = e, W = null;
            t: for (; ; ) {
              for (var ae; pe !== l || s !== 0 && pe.nodeType !== 3 || (E = p + s), pe !== u || a !== 0 && pe.nodeType !== 3 || (H = p + a), pe.nodeType === 3 && (p += pe.nodeValue.length), (ae = pe.firstChild) !== null; )
                W = pe, pe = ae;
              for (; ; ) {
                if (pe === e) break t;
                if (W === l && ++J === s && (E = p), W === u && ++ue === a && (H = p), (ae = pe.nextSibling) !== null) break;
                pe = W, W = pe.parentNode;
              }
              pe = ae;
            }
            l = E === -1 || H === -1 ? null : { start: E, end: H };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (xd = { focusedElem: e, selectionRange: l }, kc = !1, Mn = t; Mn !== null; )
      if (t = Mn, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Mn = e;
      else
        for (; Mn !== null; ) {
          switch (t = Mn, u = t.alternate, e = t.flags, t.tag) {
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
                  var Ve = ir(
                    l.type,
                    s
                  );
                  e = a.getSnapshotBeforeUpdate(
                    Ve,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ze) {
                  Dt(
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
                  Cd(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Cd(e);
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
            e.return = t.return, Mn = e;
            break;
          }
          Mn = t.return;
        }
  }
  function Zg(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Go(e, l), a & 4 && Gi(5, l);
        break;
      case 1:
        if (Go(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (p) {
              Dt(l, l.return, p);
            }
          else {
            var s = ir(
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
              Dt(
                l,
                l.return,
                p
              );
            }
          }
        a & 64 && qg(l), a & 512 && Yi(l, l.return);
        break;
      case 3:
        if (Go(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
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
            Dp(e, t);
          } catch (p) {
            Dt(l, l.return, p);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Kg(l);
      case 26:
      case 5:
        Go(e, l), t === null && a & 4 && Xg(l), a & 512 && Yi(l, l.return);
        break;
      case 12:
        Go(e, l);
        break;
      case 31:
        Go(e, l), a & 4 && Wg(e, l);
        break;
      case 13:
        Go(e, l), a & 4 && eb(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = EE.bind(
          null,
          l
        ), GE(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || Uo, !a) {
          t = t !== null && t.memoizedState !== null || xn, s = Uo;
          var u = xn;
          Uo = a, (xn = t) && !u ? Yo(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Go(e, l), Uo = s, xn = u;
        }
        break;
      case 30:
        break;
      default:
        Go(e, l);
    }
  }
  function $g(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, $g(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && rt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Zt = null, nl = !1;
  function Bo(e, t, l) {
    for (l = l.child; l !== null; )
      Jg(e, t, l), l = l.sibling;
  }
  function Jg(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Ot, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        xn || po(l, t), Bo(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        xn || po(l, t);
        var a = Zt, s = nl;
        Ea(l.type) && (Zt = l.stateNode, nl = !1), Bo(
          e,
          t,
          l
        ), Ji(l.stateNode), Zt = a, nl = s;
        break;
      case 5:
        xn || po(l, t);
      case 6:
        if (a = Zt, s = nl, Zt = null, Bo(
          e,
          t,
          l
        ), Zt = a, nl = s, Zt !== null)
          if (nl)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(l.stateNode);
            } catch (u) {
              Dt(
                l,
                t,
                u
              );
            }
          else
            try {
              Zt.removeChild(l.stateNode);
            } catch (u) {
              Dt(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        Zt !== null && (nl ? (e = Zt, qb(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), ri(e)) : qb(Zt, l.stateNode));
        break;
      case 4:
        a = Zt, s = nl, Zt = l.stateNode.containerInfo, nl = !0, Bo(
          e,
          t,
          l
        ), Zt = a, nl = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        pa(2, l, t), xn || pa(4, l, t), Bo(
          e,
          t,
          l
        );
        break;
      case 1:
        xn || (po(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Pg(
          l,
          t,
          a
        )), Bo(
          e,
          t,
          l
        );
        break;
      case 21:
        Bo(
          e,
          t,
          l
        );
        break;
      case 22:
        xn = (a = xn) || l.memoizedState !== null, Bo(
          e,
          t,
          l
        ), xn = a;
        break;
      default:
        Bo(
          e,
          t,
          l
        );
    }
  }
  function Wg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ri(e);
      } catch (l) {
        Dt(t, t.return, l);
      }
    }
  }
  function eb(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ri(e);
      } catch (l) {
        Dt(t, t.return, l);
      }
  }
  function mE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Qg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Qg()), t;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function fc(e, t) {
    var l = mE(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var s = CE.bind(null, e, a);
        a.then(s, s);
      }
    });
  }
  function ll(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var s = l[a], u = e, p = t, E = p;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (Ea(E.type)) {
                Zt = E.stateNode, nl = !1;
                break e;
              }
              break;
            case 5:
              Zt = E.stateNode, nl = !1;
              break e;
            case 3:
            case 4:
              Zt = E.stateNode.containerInfo, nl = !0;
              break e;
          }
          E = E.return;
        }
        if (Zt === null) throw Error(i(160));
        Jg(u, p, s), Zt = null, nl = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        tb(t, e), t = t.sibling;
  }
  var ro = null;
  function tb(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ll(t, e), ol(e), a & 4 && (pa(3, e, e.return), Gi(3, e), pa(5, e, e.return));
        break;
      case 1:
        ll(t, e), ol(e), a & 512 && (xn || l === null || po(l, l.return)), a & 64 && Uo && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var s = ro;
        if (ll(t, e), ol(e), a & 512 && (xn || l === null || po(l, l.return)), a & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (a) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[Al] || u[At] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(a), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), zn(u, a, l), u[At] = e, en(u), a = u;
                      break e;
                    case "link":
                      var p = ty(
                        "link",
                        "href",
                        s
                      ).get(a + (l.href || ""));
                      if (p) {
                        for (var E = 0; E < p.length; E++)
                          if (u = p[E], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            p.splice(E, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), zn(u, a, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (p = ty(
                        "meta",
                        "content",
                        s
                      ).get(a + (l.content || ""))) {
                        for (E = 0; E < p.length; E++)
                          if (u = p[E], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            p.splice(E, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), zn(u, a, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(i(468, a));
                  }
                  u[At] = e, en(u), a = u;
                }
                e.stateNode = a;
              } else
                ny(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ey(
                s,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? ny(
              s,
              e.type,
              e.stateNode
            ) : ey(
              s,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Qf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ll(t, e), ol(e), a & 512 && (xn || l === null || po(l, l.return)), l !== null && a & 4 && Qf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ll(t, e), ol(e), a & 512 && (xn || l === null || po(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            Wl(s, "");
          } catch (Ve) {
            Dt(e, e.return, Ve);
          }
        }
        a & 4 && e.stateNode != null && (s = e.memoizedProps, Qf(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), a & 1024 && (Jf = !0);
        break;
      case 6:
        if (ll(t, e), ol(e), a & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (Ve) {
            Dt(e, e.return, Ve);
          }
        }
        break;
      case 3:
        if (Mc = null, s = ro, ro = Rc(t.containerInfo), ll(t, e), ro = s, ol(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ri(t.containerInfo);
          } catch (Ve) {
            Dt(e, e.return, Ve);
          }
        Jf && (Jf = !1, nb(e));
        break;
      case 4:
        a = ro, ro = Rc(
          e.stateNode.containerInfo
        ), ll(t, e), ol(e), ro = a;
        break;
      case 12:
        ll(t, e), ol(e);
        break;
      case 31:
        ll(t, e), ol(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, fc(e, a)));
        break;
      case 13:
        ll(t, e), ol(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (hc = Z()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, fc(e, a)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var H = l !== null && l.memoizedState !== null, J = Uo, ue = xn;
        if (Uo = J || s, xn = ue || H, ll(t, e), xn = ue, Uo = J, ol(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || H || Uo || xn || sr(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                H = l = t;
                try {
                  if (u = H.stateNode, s)
                    p = u.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none";
                  else {
                    E = H.stateNode;
                    var pe = H.memoizedProps.style, W = pe != null && pe.hasOwnProperty("display") ? pe.display : null;
                    E.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
                  }
                } catch (Ve) {
                  Dt(H, H.return, Ve);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                H = t;
                try {
                  H.stateNode.nodeValue = s ? "" : H.memoizedProps;
                } catch (Ve) {
                  Dt(H, H.return, Ve);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                H = t;
                try {
                  var ae = H.stateNode;
                  s ? Pb(ae, !0) : Pb(H.stateNode, !1);
                } catch (Ve) {
                  Dt(H, H.return, Ve);
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
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, fc(e, l))));
        break;
      case 19:
        ll(t, e), ol(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, fc(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ll(t, e), ol(e);
    }
  }
  function ol(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (Fg(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(i(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = Zf(e);
            uc(e, u, s);
            break;
          case 5:
            var p = l.stateNode;
            l.flags & 32 && (Wl(p, ""), l.flags &= -33);
            var E = Zf(e);
            uc(e, E, p);
            break;
          case 3:
          case 4:
            var H = l.stateNode.containerInfo, J = Zf(e);
            $f(
              e,
              J,
              H
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (ue) {
        Dt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function nb(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        nb(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Go(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Zg(e, t.alternate, t), t = t.sibling;
  }
  function sr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          pa(4, t, t.return), sr(t);
          break;
        case 1:
          po(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Pg(
            t,
            t.return,
            l
          ), sr(t);
          break;
        case 27:
          Ji(t.stateNode);
        case 26:
        case 5:
          po(t, t.return), sr(t);
          break;
        case 22:
          t.memoizedState === null && sr(t);
          break;
        case 30:
          sr(t);
          break;
        default:
          sr(t);
      }
      e = e.sibling;
    }
  }
  function Yo(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, s = e, u = t, p = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Yo(
            s,
            u,
            l
          ), Gi(4, u);
          break;
        case 1:
          if (Yo(
            s,
            u,
            l
          ), a = u, s = a.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (J) {
              Dt(a, a.return, J);
            }
          if (a = u, s = a.updateQueue, s !== null) {
            var E = a.stateNode;
            try {
              var H = s.shared.hiddenCallbacks;
              if (H !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < H.length; s++)
                  zp(H[s], E);
            } catch (J) {
              Dt(a, a.return, J);
            }
          }
          l && p & 64 && qg(u), Yi(u, u.return);
          break;
        case 27:
          Kg(u);
        case 26:
        case 5:
          Yo(
            s,
            u,
            l
          ), l && a === null && p & 4 && Xg(u), Yi(u, u.return);
          break;
        case 12:
          Yo(
            s,
            u,
            l
          );
          break;
        case 31:
          Yo(
            s,
            u,
            l
          ), l && p & 4 && Wg(s, u);
          break;
        case 13:
          Yo(
            s,
            u,
            l
          ), l && p & 4 && eb(s, u);
          break;
        case 22:
          u.memoizedState === null && Yo(
            s,
            u,
            l
          ), Yi(u, u.return);
          break;
        case 30:
          break;
        default:
          Yo(
            s,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Wf(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Ti(l));
  }
  function ed(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ti(e));
  }
  function io(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        lb(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function lb(e, t, l, a) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        io(
          e,
          t,
          l,
          a
        ), s & 2048 && Gi(9, t);
        break;
      case 1:
        io(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        io(
          e,
          t,
          l,
          a
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ti(e)));
        break;
      case 12:
        if (s & 2048) {
          io(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, p = u.id, E = u.onPostCommit;
            typeof E == "function" && E(
              p,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (H) {
            Dt(t, t.return, H);
          }
        } else
          io(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        io(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        io(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, p = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? io(
          e,
          t,
          l,
          a
        ) : qi(e, t) : u._visibility & 2 ? io(
          e,
          t,
          l,
          a
        ) : (u._visibility |= 2, Qr(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Wf(p, t);
        break;
      case 24:
        io(
          e,
          t,
          l,
          a
        ), s & 2048 && ed(t.alternate, t);
        break;
      default:
        io(
          e,
          t,
          l,
          a
        );
    }
  }
  function Qr(e, t, l, a, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, p = t, E = l, H = a, J = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Qr(
            u,
            p,
            E,
            H,
            s
          ), Gi(8, p);
          break;
        case 23:
          break;
        case 22:
          var ue = p.stateNode;
          p.memoizedState !== null ? ue._visibility & 2 ? Qr(
            u,
            p,
            E,
            H,
            s
          ) : qi(
            u,
            p
          ) : (ue._visibility |= 2, Qr(
            u,
            p,
            E,
            H,
            s
          )), s && J & 2048 && Wf(
            p.alternate,
            p
          );
          break;
        case 24:
          Qr(
            u,
            p,
            E,
            H,
            s
          ), s && J & 2048 && ed(p.alternate, p);
          break;
        default:
          Qr(
            u,
            p,
            E,
            H,
            s
          );
      }
      t = t.sibling;
    }
  }
  function qi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, s = a.flags;
        switch (a.tag) {
          case 22:
            qi(l, a), s & 2048 && Wf(
              a.alternate,
              a
            );
            break;
          case 24:
            qi(l, a), s & 2048 && ed(a.alternate, a);
            break;
          default:
            qi(l, a);
        }
        t = t.sibling;
      }
  }
  var Pi = 8192;
  function Zr(e, t, l) {
    if (e.subtreeFlags & Pi)
      for (e = e.child; e !== null; )
        ob(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function ob(e, t, l) {
    switch (e.tag) {
      case 26:
        Zr(
          e,
          t,
          l
        ), e.flags & Pi && e.memoizedState !== null && eC(
          l,
          ro,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Zr(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = ro;
        ro = Rc(e.stateNode.containerInfo), Zr(
          e,
          t,
          l
        ), ro = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Pi, Pi = 16777216, Zr(
          e,
          t,
          l
        ), Pi = a) : Zr(
          e,
          t,
          l
        ));
        break;
      default:
        Zr(
          e,
          t,
          l
        );
    }
  }
  function ab(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Xi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Mn = a, ib(
            a,
            e
          );
        }
      ab(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        rb(e), e = e.sibling;
  }
  function rb(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Xi(e), e.flags & 2048 && pa(9, e, e.return);
        break;
      case 3:
        Xi(e);
        break;
      case 12:
        Xi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, dc(e)) : Xi(e);
        break;
      default:
        Xi(e);
    }
  }
  function dc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Mn = a, ib(
            a,
            e
          );
        }
      ab(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          pa(8, t, t.return), dc(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, dc(t));
          break;
        default:
          dc(t);
      }
      e = e.sibling;
    }
  }
  function ib(e, t) {
    for (; Mn !== null; ) {
      var l = Mn;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          pa(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ti(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Mn = a;
      else
        e: for (l = e; Mn !== null; ) {
          a = Mn;
          var s = a.sibling, u = a.return;
          if ($g(a), a === l) {
            Mn = null;
            break e;
          }
          if (s !== null) {
            s.return = u, Mn = s;
            break e;
          }
          Mn = u;
        }
    }
  }
  var pE = {
    getCacheForType: function(e) {
      var t = kn(bn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return kn(bn).controller.signal;
    }
  }, gE = typeof WeakMap == "function" ? WeakMap : Map, Tt = 0, Ut = null, ht = null, gt = 0, zt = 0, yl = null, ga = !1, $r = !1, td = !1, qo = 0, on = 0, ba = 0, cr = 0, nd = 0, vl = 0, Jr = 0, Fi = null, al = null, ld = !1, hc = 0, sb = 0, mc = 1 / 0, pc = null, ya = null, Cn = 0, va = null, Wr = null, Po = 0, od = 0, ad = null, cb = null, Ki = 0, rd = null;
  function xl() {
    return (Tt & 2) !== 0 && gt !== 0 ? gt & -gt : U.T !== null ? dd() : Jn();
  }
  function ub() {
    if (vl === 0)
      if ((gt & 536870912) === 0 || yt) {
        var e = Jt;
        Jt <<= 1, (Jt & 3932160) === 0 && (Jt = 262144), vl = e;
      } else vl = 536870912;
    return e = gl.current, e !== null && (e.flags |= 32), vl;
  }
  function rl(e, t, l) {
    (e === Ut && (zt === 2 || zt === 9) || e.cancelPendingCommit !== null) && (ei(e, 0), xa(
      e,
      gt,
      vl,
      !1
    )), Pn(e, l), ((Tt & 2) === 0 || e !== Ut) && (e === Ut && ((Tt & 2) === 0 && (cr |= l), on === 4 && xa(
      e,
      gt,
      vl,
      !1
    )), go(e));
  }
  function fb(e, t, l) {
    if ((Tt & 6) !== 0) throw Error(i(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Wt(e, t), s = a ? vE(e, t) : sd(e, t, !0), u = a;
    do {
      if (s === 0) {
        $r && !a && xa(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !bE(l)) {
          s = sd(e, t, !1), u = !1;
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
              s = Fi;
              var H = E.current.memoizedState.isDehydrated;
              if (H && (ei(E, p).flags |= 256), p = sd(
                E,
                p,
                !1
              ), p !== 2) {
                if (td && !H) {
                  E.errorRecoveryDisabledLanes |= u, cr |= u, s = 4;
                  break e;
                }
                u = al, al = s, u !== null && (al === null ? al = u : al.push.apply(
                  al,
                  u
                ));
              }
              s = p;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          ei(e, 0), xa(e, t, 0, !0);
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
              xa(
                a,
                t,
                vl,
                !ga
              );
              break e;
            case 2:
              al = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((t & 62914560) === t && (s = hc + 300 - Z(), 10 < s)) {
            if (xa(
              a,
              t,
              vl,
              !ga
            ), We(a, 0, !0) !== 0) break e;
            Po = t, a.timeoutHandle = Gb(
              db.bind(
                null,
                a,
                l,
                al,
                pc,
                ld,
                t,
                vl,
                cr,
                Jr,
                ga,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          db(
            a,
            l,
            al,
            pc,
            ld,
            t,
            vl,
            cr,
            Jr,
            ga,
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
  function db(e, t, l, a, s, u, p, E, H, J, ue, pe, W, ae) {
    if (e.timeoutHandle = -1, pe = t.subtreeFlags, pe & 8192 || (pe & 16785408) === 16785408) {
      pe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ht
      }, ob(
        t,
        u,
        pe
      );
      var Ve = (u & 62914560) === u ? hc - Z() : (u & 4194048) === u ? sb - Z() : 0;
      if (Ve = tC(
        pe,
        Ve
      ), Ve !== null) {
        Po = u, e.cancelPendingCommit = Ve(
          xb.bind(
            null,
            e,
            t,
            u,
            l,
            a,
            s,
            p,
            E,
            H,
            ue,
            pe,
            null,
            W,
            ae
          )
        ), xa(e, u, p, !J);
        return;
      }
    }
    xb(
      e,
      t,
      u,
      l,
      a,
      s,
      p,
      E,
      H
    );
  }
  function bE(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var s = l[a], u = s.getSnapshot;
          s = s.value;
          try {
            if (!ml(u(), s)) return !1;
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
  function xa(e, t, l, a) {
    t &= ~nd, t &= ~cr, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - dt(s), p = 1 << u;
      a[u] = -1, s &= ~p;
    }
    l !== 0 && uo(e, l, t);
  }
  function gc() {
    return (Tt & 6) === 0 ? (Qi(0), !1) : !0;
  }
  function id() {
    if (ht !== null) {
      if (zt === 0)
        var e = ht.return;
      else
        e = ht, Do = er = null, Cf(e), qr = null, ki = 0, e = ht;
      for (; e !== null; )
        Yg(e.alternate, e), e = e.return;
      ht = null;
    }
  }
  function ei(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, VE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Po = 0, id(), Ut = e, ht = l = No(e.current, null), gt = t, zt = 0, yl = null, ga = !1, $r = Wt(e, t), td = !1, Jr = vl = nd = cr = ba = on = 0, al = Fi = null, ld = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var s = 31 - dt(a), u = 1 << s;
        t |= e[s], a &= ~u;
      }
    return qo = t, Vs(), l;
  }
  function hb(e, t) {
    st = null, U.H = Hi, t === Yr || t === Ps ? (t = Tp(), zt = 3) : t === ff ? (t = Tp(), zt = 4) : zt = t === Hf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, yl = t, ht === null && (on = 1, ac(
      e,
      jl(t, e.current)
    ));
  }
  function mb() {
    var e = gl.current;
    return e === null ? !0 : (gt & 4194048) === gt ? Hl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? e === Hl : !1;
  }
  function pb() {
    var e = U.H;
    return U.H = Hi, e === null ? Hi : e;
  }
  function gb() {
    var e = U.A;
    return U.A = pE, e;
  }
  function bc() {
    on = 4, ga || (gt & 4194048) !== gt && gl.current !== null || ($r = !0), (ba & 134217727) === 0 && (cr & 134217727) === 0 || Ut === null || xa(
      Ut,
      gt,
      vl,
      !1
    );
  }
  function sd(e, t, l) {
    var a = Tt;
    Tt |= 2;
    var s = pb(), u = gb();
    (Ut !== e || gt !== t) && (pc = null, ei(e, t)), t = !1;
    var p = on;
    e: do
      try {
        if (zt !== 0 && ht !== null) {
          var E = ht, H = yl;
          switch (zt) {
            case 8:
              id(), p = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              gl.current === null && (t = !0);
              var J = zt;
              if (zt = 0, yl = null, ti(e, E, H, J), l && $r) {
                p = 0;
                break e;
              }
              break;
            default:
              J = zt, zt = 0, yl = null, ti(e, E, H, J);
          }
        }
        yE(), p = on;
        break;
      } catch (ue) {
        hb(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Do = er = null, Tt = a, U.H = s, U.A = u, ht === null && (Ut = null, gt = 0, Vs()), p;
  }
  function yE() {
    for (; ht !== null; ) bb(ht);
  }
  function vE(e, t) {
    var l = Tt;
    Tt |= 2;
    var a = pb(), s = gb();
    Ut !== e || gt !== t ? (pc = null, mc = Z() + 500, ei(e, t)) : $r = Wt(
      e,
      t
    );
    e: do
      try {
        if (zt !== 0 && ht !== null) {
          t = ht;
          var u = yl;
          t: switch (zt) {
            case 1:
              zt = 0, yl = null, ti(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Mp(u)) {
                zt = 0, yl = null, yb(t);
                break;
              }
              t = function() {
                zt !== 2 && zt !== 9 || Ut !== e || (zt = 7), go(e);
              }, u.then(t, t);
              break e;
            case 3:
              zt = 7;
              break e;
            case 4:
              zt = 5;
              break e;
            case 7:
              Mp(u) ? (zt = 0, yl = null, yb(t)) : (zt = 0, yl = null, ti(e, t, u, 7));
              break;
            case 5:
              var p = null;
              switch (ht.tag) {
                case 26:
                  p = ht.memoizedState;
                case 5:
                case 27:
                  var E = ht;
                  if (p ? ly(p) : E.stateNode.complete) {
                    zt = 0, yl = null;
                    var H = E.sibling;
                    if (H !== null) ht = H;
                    else {
                      var J = E.return;
                      J !== null ? (ht = J, yc(J)) : ht = null;
                    }
                    break t;
                  }
              }
              zt = 0, yl = null, ti(e, t, u, 5);
              break;
            case 6:
              zt = 0, yl = null, ti(e, t, u, 6);
              break;
            case 8:
              id(), on = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        xE();
        break;
      } catch (ue) {
        hb(e, ue);
      }
    while (!0);
    return Do = er = null, U.H = a, U.A = s, Tt = l, ht !== null ? 0 : (Ut = null, gt = 0, Vs(), on);
  }
  function xE() {
    for (; ht !== null && !Ke(); )
      bb(ht);
  }
  function bb(e) {
    var t = Bg(e.alternate, e, qo);
    e.memoizedProps = e.pendingProps, t === null ? yc(e) : ht = t;
  }
  function yb(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = jg(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          gt
        );
        break;
      case 11:
        t = jg(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          gt
        );
        break;
      case 5:
        Cf(t);
      default:
        Yg(l, t), t = ht = gp(t, qo), t = Bg(l, t, qo);
    }
    e.memoizedProps = e.pendingProps, t === null ? yc(e) : ht = t;
  }
  function ti(e, t, l, a) {
    Do = er = null, Cf(t), qr = null, ki = 0;
    var s = t.return;
    try {
      if (sE(
        e,
        s,
        t,
        l,
        gt
      )) {
        on = 1, ac(
          e,
          jl(l, e.current)
        ), ht = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw ht = s, u;
      on = 1, ac(
        e,
        jl(l, e.current)
      ), ht = null;
      return;
    }
    t.flags & 32768 ? (yt || a === 1 ? e = !0 : $r || (gt & 536870912) !== 0 ? e = !1 : (ga = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = gl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), vb(t, e)) : yc(t);
  }
  function yc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        vb(
          t,
          ga
        );
        return;
      }
      e = t.return;
      var l = fE(
        t.alternate,
        t,
        qo
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
    on === 0 && (on = 5);
  }
  function vb(e, t) {
    do {
      var l = dE(e.alternate, e);
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
    on = 6, ht = null;
  }
  function xb(e, t, l, a, s, u, p, E, H) {
    e.cancelPendingCommit = null;
    do
      vc();
    while (Cn !== 0);
    if ((Tt & 6) !== 0) throw Error(i(327));
    if (t !== null) {
      if (t === e.current) throw Error(i(177));
      if (u = t.lanes | t.childLanes, u |= Qu, kt(
        e,
        l,
        u,
        p,
        E,
        H
      ), e === Ut && (ht = Ut = null, gt = 0), Wr = t, va = e, Po = l, od = u, ad = s, cb = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, _E(Le, function() {
        return Rb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = U.T, U.T = null, s = G.p, G.p = 2, p = Tt, Tt |= 4;
        try {
          hE(e, t, l);
        } finally {
          Tt = p, G.p = s, U.T = a;
        }
      }
      Cn = 1, Sb(), Eb(), Cb();
    }
  }
  function Sb() {
    if (Cn === 1) {
      Cn = 0;
      var e = va, t = Wr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = U.T, U.T = null;
        var a = G.p;
        G.p = 2;
        var s = Tt;
        Tt |= 4;
        try {
          tb(t, e);
          var u = xd, p = ip(e.containerInfo), E = u.focusedElem, H = u.selectionRange;
          if (p !== E && E && E.ownerDocument && rp(
            E.ownerDocument.documentElement,
            E
          )) {
            if (H !== null && qu(E)) {
              var J = H.start, ue = H.end;
              if (ue === void 0 && (ue = J), "selectionStart" in E)
                E.selectionStart = J, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var pe = E.ownerDocument || document, W = pe && pe.defaultView || window;
                if (W.getSelection) {
                  var ae = W.getSelection(), Ve = E.textContent.length, Ze = Math.min(H.start, Ve), It = H.end === void 0 ? Ze : Math.min(H.end, Ve);
                  !ae.extend && Ze > It && (p = It, It = Ze, Ze = p);
                  var X = ap(
                    E,
                    Ze
                  ), Y = ap(
                    E,
                    It
                  );
                  if (X && Y && (ae.rangeCount !== 1 || ae.anchorNode !== X.node || ae.anchorOffset !== X.offset || ae.focusNode !== Y.node || ae.focusOffset !== Y.offset)) {
                    var $ = pe.createRange();
                    $.setStart(X.node, X.offset), ae.removeAllRanges(), Ze > It ? (ae.addRange($), ae.extend(Y.node, Y.offset)) : ($.setEnd(Y.node, Y.offset), ae.addRange($));
                  }
                }
              }
            }
            for (pe = [], ae = E; ae = ae.parentNode; )
              ae.nodeType === 1 && pe.push({
                element: ae,
                left: ae.scrollLeft,
                top: ae.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < pe.length; E++) {
              var he = pe[E];
              he.element.scrollLeft = he.left, he.element.scrollTop = he.top;
            }
          }
          kc = !!vd, xd = vd = null;
        } finally {
          Tt = s, G.p = a, U.T = l;
        }
      }
      e.current = t, Cn = 2;
    }
  }
  function Eb() {
    if (Cn === 2) {
      Cn = 0;
      var e = va, t = Wr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = U.T, U.T = null;
        var a = G.p;
        G.p = 2;
        var s = Tt;
        Tt |= 4;
        try {
          Zg(e, t.alternate, t);
        } finally {
          Tt = s, G.p = a, U.T = l;
        }
      }
      Cn = 3;
    }
  }
  function Cb() {
    if (Cn === 4 || Cn === 3) {
      Cn = 0, Se();
      var e = va, t = Wr, l = Po, a = cb;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Cn = 5 : (Cn = 0, Wr = va = null, _b(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (ya = null), Ml(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Ot,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = U.T, s = G.p, G.p = 2, U.T = null;
        try {
          for (var u = e.onRecoverableError, p = 0; p < a.length; p++) {
            var E = a[p];
            u(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          U.T = t, G.p = s;
        }
      }
      (Po & 3) !== 0 && vc(), go(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === rd ? Ki++ : (Ki = 0, rd = e) : Ki = 0, Qi(0);
    }
  }
  function _b(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ti(t)));
  }
  function vc() {
    return Sb(), Eb(), Cb(), Rb();
  }
  function Rb() {
    if (Cn !== 5) return !1;
    var e = va, t = od;
    od = 0;
    var l = Ml(Po), a = U.T, s = G.p;
    try {
      G.p = 32 > l ? 32 : l, U.T = null, l = ad, ad = null;
      var u = va, p = Po;
      if (Cn = 0, Wr = va = null, Po = 0, (Tt & 6) !== 0) throw Error(i(331));
      var E = Tt;
      if (Tt |= 4, rb(u.current), lb(
        u,
        u.current,
        p,
        l
      ), Tt = E, Qi(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Ot, u);
        } catch {
        }
      return !0;
    } finally {
      G.p = s, U.T = a, _b(e, t);
    }
  }
  function wb(e, t, l) {
    t = jl(l, t), t = If(e.stateNode, t, 2), e = da(e, t, 2), e !== null && (Pn(e, 2), go(e));
  }
  function Dt(e, t, l) {
    if (e.tag === 3)
      wb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          wb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ya === null || !ya.has(a))) {
            e = jl(l, e), l = Mg(2), a = da(t, l, 2), a !== null && (Ag(
              l,
              a,
              t,
              e
            ), Pn(a, 2), go(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function cd(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new gE();
      var s = /* @__PURE__ */ new Set();
      a.set(t, s);
    } else
      s = a.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), a.set(t, s));
    s.has(l) || (td = !0, s.add(l), e = SE.bind(null, e, t, l), t.then(e, e));
  }
  function SE(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ut === e && (gt & l) === l && (on === 4 || on === 3 && (gt & 62914560) === gt && 300 > Z() - hc ? (Tt & 2) === 0 && ei(e, 0) : nd |= l, Jr === gt && (Jr = 0)), go(e);
  }
  function Mb(e, t) {
    t === 0 && (t = qt()), e = $a(e, t), e !== null && (Pn(e, t), go(e));
  }
  function EE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Mb(e, l);
  }
  function CE(e, t) {
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
    a !== null && a.delete(t), Mb(e, l);
  }
  function _E(e, t) {
    return $e(e, t);
  }
  var xc = null, ni = null, ud = !1, Sc = !1, fd = !1, Sa = 0;
  function go(e) {
    e !== ni && e.next === null && (ni === null ? xc = ni = e : ni = ni.next = e), Sc = !0, ud || (ud = !0, wE());
  }
  function Qi(e, t) {
    if (!fd && Sc) {
      fd = !0;
      do
        for (var l = !1, a = xc; a !== null; ) {
          if (e !== 0) {
            var s = a.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var p = a.suspendedLanes, E = a.pingedLanes;
              u = (1 << 31 - dt(42 | e) + 1) - 1, u &= s & ~(p & ~E), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, kb(a, u));
          } else
            u = gt, u = We(
              a,
              a === Ut ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Wt(a, u) || (l = !0, kb(a, u));
          a = a.next;
        }
      while (l);
      fd = !1;
    }
  }
  function RE() {
    Ab();
  }
  function Ab() {
    Sc = ud = !1;
    var e = 0;
    Sa !== 0 && LE() && (e = Sa);
    for (var t = Z(), l = null, a = xc; a !== null; ) {
      var s = a.next, u = Tb(a, t);
      u === 0 ? (a.next = null, l === null ? xc = s : l.next = s, s === null && (ni = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (Sc = !0)), a = s;
    }
    Cn !== 0 && Cn !== 5 || Qi(e), Sa !== 0 && (Sa = 0);
  }
  function Tb(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var p = 31 - dt(u), E = 1 << p, H = s[p];
      H === -1 ? ((E & l) === 0 || (E & a) !== 0) && (s[p] = Rn(E, t)) : H <= t && (e.expiredLanes |= E), u &= ~E;
    }
    if (t = Ut, l = gt, l = We(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (zt === 2 || zt === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && nt(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Wt(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && nt(a), Ml(l)) {
        case 2:
        case 8:
          l = ye;
          break;
        case 32:
          l = Le;
          break;
        case 268435456:
          l = Mt;
          break;
        default:
          l = Le;
      }
      return a = Ob.bind(null, e), l = $e(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && nt(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ob(e, t) {
    if (Cn !== 0 && Cn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (vc() && e.callbackNode !== l)
      return null;
    var a = gt;
    return a = We(
      e,
      e === Ut ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (fb(e, a, t), Tb(e, Z()), e.callbackNode != null && e.callbackNode === l ? Ob.bind(null, e) : null);
  }
  function kb(e, t) {
    if (vc()) return null;
    fb(e, t, !0);
  }
  function wE() {
    IE(function() {
      (Tt & 6) !== 0 ? $e(
        He,
        RE
      ) : Ab();
    });
  }
  function dd() {
    if (Sa === 0) {
      var e = Br;
      e === 0 && (e = St, St <<= 1, (St & 261888) === 0 && (St = 256)), Sa = e;
    }
    return Sa;
  }
  function Nb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : eo("" + e);
  }
  function zb(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function ME(e, t, l, a, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = Nb(
        (s[Ct] || null).action
      ), p = a.submitter;
      p && (t = (t = p[Ct] || null) ? Nb(t.formAction) : p.getAttribute("formAction"), t !== null && (u = t, p = null));
      var E = new sn(
        "action",
        "action",
        null,
        a,
        s
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Sa !== 0) {
                  var H = p ? zb(s, p) : new FormData(s);
                  Nf(
                    l,
                    {
                      pending: !0,
                      data: H,
                      method: s.method,
                      action: u
                    },
                    null,
                    H
                  );
                }
              } else
                typeof u == "function" && (E.preventDefault(), H = p ? zb(s, p) : new FormData(s), Nf(
                  l,
                  {
                    pending: !0,
                    data: H,
                    method: s.method,
                    action: u
                  },
                  u,
                  H
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var hd = 0; hd < Ku.length; hd++) {
    var md = Ku[hd], AE = md.toLowerCase(), TE = md[0].toUpperCase() + md.slice(1);
    ao(
      AE,
      "on" + TE
    );
  }
  ao(up, "onAnimationEnd"), ao(fp, "onAnimationIteration"), ao(dp, "onAnimationStart"), ao("dblclick", "onDoubleClick"), ao("focusin", "onFocus"), ao("focusout", "onBlur"), ao(PS, "onTransitionRun"), ao(XS, "onTransitionStart"), ao(FS, "onTransitionCancel"), ao(hp, "onTransitionEnd"), Ql("onMouseEnter", ["mouseout", "mouseover"]), Ql("onMouseLeave", ["mouseout", "mouseover"]), Ql("onPointerEnter", ["pointerout", "pointerover"]), Ql("onPointerLeave", ["pointerout", "pointerover"]), Ol(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ol(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ol("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ol(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ol(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ol(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Zi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), OE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zi)
  );
  function Db(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], s = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var p = a.length - 1; 0 <= p; p--) {
            var E = a[p], H = E.instance, J = E.currentTarget;
            if (E = E.listener, H !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              Ls(ue);
            }
            s.currentTarget = null, u = H;
          }
        else
          for (p = 0; p < a.length; p++) {
            if (E = a[p], H = E.instance, J = E.currentTarget, E = E.listener, H !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              Ls(ue);
            }
            s.currentTarget = null, u = H;
          }
      }
    }
  }
  function mt(e, t) {
    var l = t[Ln];
    l === void 0 && (l = t[Ln] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (jb(t, e, 2, !1), l.add(a));
  }
  function pd(e, t, l) {
    var a = 0;
    t && (a |= 4), jb(
      l,
      e,
      a,
      t
    );
  }
  var Ec = "_reactListening" + Math.random().toString(36).slice(2);
  function gd(e) {
    if (!e[Ec]) {
      e[Ec] = !0, pn.forEach(function(l) {
        l !== "selectionchange" && (OE.has(l) || pd(l, !1, e), pd(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ec] || (t[Ec] = !0, pd("selectionchange", !1, t));
    }
  }
  function jb(e, t, l, a) {
    switch (uy(t)) {
      case 2:
        var s = oC;
        break;
      case 8:
        s = aC;
        break;
      default:
        s = kd;
    }
    l = s.bind(
      null,
      t,
      l,
      e
    ), s = void 0, !q || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), a ? s !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, l, !0) : s !== void 0 ? e.addEventListener(t, l, {
      passive: s
    }) : e.addEventListener(t, l, !1);
  }
  function bd(e, t, l, a, s) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var p = a.tag;
        if (p === 3 || p === 4) {
          var E = a.stateNode.containerInfo;
          if (E === s) break;
          if (p === 4)
            for (p = a.return; p !== null; ) {
              var H = p.tag;
              if ((H === 3 || H === 4) && p.stateNode.containerInfo === s)
                return;
              p = p.return;
            }
          for (; E !== null; ) {
            if (p = fl(E), p === null) return;
            if (H = p.tag, H === 5 || H === 6 || H === 26 || H === 27) {
              a = u = p;
              continue e;
            }
            E = E.parentNode;
          }
        }
        a = a.return;
      }
    N(function() {
      var J = u, ue = to(l), pe = [];
      e: {
        var W = mp.get(e);
        if (W !== void 0) {
          var ae = sn, Ve = e;
          switch (e) {
            case "keypress":
              if (ze(l) === 0) break e;
            case "keydown":
            case "keyup":
              ae = CS;
              break;
            case "focusin":
              Ve = "focus", ae = kr;
              break;
            case "focusout":
              Ve = "blur", ae = kr;
              break;
            case "beforeblur":
            case "afterblur":
              ae = kr;
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
              ae = lo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ae = oo;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ae = wS;
              break;
            case up:
            case fp:
            case dp:
              ae = mS;
              break;
            case hp:
              ae = AS;
              break;
            case "scroll":
            case "scrollend":
              ae = aa;
              break;
            case "wheel":
              ae = OS;
              break;
            case "copy":
            case "cut":
            case "paste":
              ae = gS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ae = Pm;
              break;
            case "toggle":
            case "beforetoggle":
              ae = NS;
          }
          var Ze = (t & 4) !== 0, It = !Ze && (e === "scroll" || e === "scrollend"), X = Ze ? W !== null ? W + "Capture" : null : W;
          Ze = [];
          for (var Y = J, $; Y !== null; ) {
            var he = Y;
            if ($ = he.stateNode, he = he.tag, he !== 5 && he !== 26 && he !== 27 || $ === null || X === null || (he = M(Y, X), he != null && Ze.push(
              $i(Y, he, $)
            )), It) break;
            Y = Y.return;
          }
          0 < Ze.length && (W = new ae(
            W,
            Ve,
            null,
            l,
            ue
          ), pe.push({ event: W, listeners: Ze }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (W = e === "mouseover" || e === "pointerover", ae = e === "mouseout" || e === "pointerout", W && l !== ko && (Ve = l.relatedTarget || l.fromElement) && (fl(Ve) || Ve[Ge]))
            break e;
          if ((ae || W) && (W = ue.window === ue ? ue : (W = ue.ownerDocument) ? W.defaultView || W.parentWindow : window, ae ? (Ve = l.relatedTarget || l.toElement, ae = J, Ve = Ve ? fl(Ve) : null, Ve !== null && (It = f(Ve), Ze = Ve.tag, Ve !== It || Ze !== 5 && Ze !== 27 && Ze !== 6) && (Ve = null)) : (ae = null, Ve = J), ae !== Ve)) {
            if (Ze = lo, he = "onMouseLeave", X = "onMouseEnter", Y = "mouse", (e === "pointerout" || e === "pointerover") && (Ze = Pm, he = "onPointerLeave", X = "onPointerEnter", Y = "pointer"), It = ae == null ? W : Vn(ae), $ = Ve == null ? W : Vn(Ve), W = new Ze(
              he,
              Y + "leave",
              ae,
              l,
              ue
            ), W.target = It, W.relatedTarget = $, he = null, fl(ue) === J && (Ze = new Ze(
              X,
              Y + "enter",
              Ve,
              l,
              ue
            ), Ze.target = $, Ze.relatedTarget = It, he = Ze), It = he, ae && Ve)
              t: {
                for (Ze = kE, X = ae, Y = Ve, $ = 0, he = X; he; he = Ze(he))
                  $++;
                he = 0;
                for (var qe = Y; qe; qe = Ze(qe))
                  he++;
                for (; 0 < $ - he; )
                  X = Ze(X), $--;
                for (; 0 < he - $; )
                  Y = Ze(Y), he--;
                for (; $--; ) {
                  if (X === Y || Y !== null && X === Y.alternate) {
                    Ze = X;
                    break t;
                  }
                  X = Ze(X), Y = Ze(Y);
                }
                Ze = null;
              }
            else Ze = null;
            ae !== null && Lb(
              pe,
              W,
              ae,
              Ze,
              !1
            ), Ve !== null && It !== null && Lb(
              pe,
              It,
              Ve,
              Ze,
              !0
            );
          }
        }
        e: {
          if (W = J ? Vn(J) : window, ae = W.nodeName && W.nodeName.toLowerCase(), ae === "select" || ae === "input" && W.type === "file")
            var _t = Wm;
          else if ($m(W))
            if (ep)
              _t = GS;
            else {
              _t = US;
              var Be = HS;
            }
          else
            ae = W.nodeName, !ae || ae.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? J && Nl(J.elementType) && (_t = Wm) : _t = BS;
          if (_t && (_t = _t(e, J))) {
            Jm(
              pe,
              _t,
              l,
              ue
            );
            break e;
          }
          Be && Be(e, W, J), e === "focusout" && J && W.type === "number" && J.memoizedProps.value != null && ta(W, "number", W.value);
        }
        switch (Be = J ? Vn(J) : window, e) {
          case "focusin":
            ($m(Be) || Be.contentEditable === "true") && (zr = Be, Pu = J, wi = null);
            break;
          case "focusout":
            wi = Pu = zr = null;
            break;
          case "mousedown":
            Xu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Xu = !1, sp(pe, l, ue);
            break;
          case "selectionchange":
            if (qS) break;
          case "keydown":
          case "keyup":
            sp(pe, l, ue);
        }
        var ut;
        if (Bu)
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
          Nr ? Qm(e, l) && (bt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (bt = "onCompositionStart");
        bt && (Xm && l.locale !== "ko" && (Nr || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && Nr && (ut = Ce()) : (ne = ue, re = "value" in ne ? ne.value : ne.textContent, Nr = !0)), Be = Cc(J, bt), 0 < Be.length && (bt = new qm(
          bt,
          e,
          null,
          l,
          ue
        ), pe.push({ event: bt, listeners: Be }), ut ? bt.data = ut : (ut = Zm(l), ut !== null && (bt.data = ut)))), (ut = DS ? jS(e, l) : LS(e, l)) && (bt = Cc(J, "onBeforeInput"), 0 < bt.length && (Be = new qm(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ue
        ), pe.push({
          event: Be,
          listeners: bt
        }), Be.data = ut)), ME(
          pe,
          e,
          J,
          l,
          ue
        );
      }
      Db(pe, t);
    });
  }
  function $i(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Cc(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = M(e, l), s != null && a.unshift(
        $i(e, s, u)
      ), s = M(e, t), s != null && a.push(
        $i(e, s, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function kE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Lb(e, t, l, a, s) {
    for (var u = t._reactName, p = []; l !== null && l !== a; ) {
      var E = l, H = E.alternate, J = E.stateNode;
      if (E = E.tag, H !== null && H === a) break;
      E !== 5 && E !== 26 && E !== 27 || J === null || (H = J, s ? (J = M(l, u), J != null && p.unshift(
        $i(l, J, H)
      )) : s || (J = M(l, u), J != null && p.push(
        $i(l, J, H)
      ))), l = l.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var NE = /\r\n?/g, zE = /\u0000|\uFFFD/g;
  function Vb(e) {
    return (typeof e == "string" ? e : "" + e).replace(NE, `
`).replace(zE, "");
  }
  function Ib(e, t) {
    return t = Vb(t), Vb(e) === t;
  }
  function Vt(e, t, l, a, s, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Wl(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Wl(e, "" + a);
        break;
      case "className":
        ea(e, "class", a);
        break;
      case "tabIndex":
        ea(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ea(e, l, a);
        break;
      case "style":
        Oo(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          ea(e, "data", a);
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
        a = eo("" + a), e.setAttribute(l, a);
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
        a = eo("" + a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = Ht);
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
        l = eo("" + a), e.setAttributeNS(
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
        mt("beforetoggle", e), mt("toggle", e), kl(e, "popover", a);
        break;
      case "xlinkActuate":
        Wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Wn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Wn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        kl(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = la.get(l) || l, kl(e, l, a));
    }
  }
  function yd(e, t, l, a, s, u) {
    switch (l) {
      case "style":
        Oo(e, a, u);
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
        typeof a == "string" ? Wl(e, a) : (typeof a == "number" || typeof a == "bigint") && Wl(e, "" + a);
        break;
      case "onScroll":
        a != null && mt("scroll", e);
        break;
      case "onScrollEnd":
        a != null && mt("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Ht);
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
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[Ct] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof a == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, s);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : kl(e, l, a);
          }
    }
  }
  function zn(e, t, l) {
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
        var E = u = p = s = null, H = null, J = null;
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
                  H = ue;
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
                    throw Error(i(137, t));
                  break;
                default:
                  Vt(e, t, a, ue, l, null);
              }
          }
        Tr(
          e,
          u,
          E,
          H,
          J,
          p,
          s,
          !1
        );
        return;
      case "select":
        mt("invalid", e), a = p = u = null;
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
                a = E;
              default:
                Vt(e, t, s, E, l, null);
            }
        t = u, l = p, e.multiple = !!a, t != null ? dl(e, !!a, t, !1) : l != null && dl(e, !!a, l, !0);
        return;
      case "textarea":
        mt("invalid", e), u = s = a = null;
        for (p in l)
          if (l.hasOwnProperty(p) && (E = l[p], E != null))
            switch (p) {
              case "value":
                a = E;
                break;
              case "defaultValue":
                s = E;
                break;
              case "children":
                u = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(i(91));
                break;
              default:
                Vt(e, t, p, E, l, null);
            }
        To(e, a, s, u);
        return;
      case "option":
        for (H in l)
          l.hasOwnProperty(H) && (a = l[H], a != null) && (H === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Vt(e, t, H, a, l, null));
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
        for (a = 0; a < Zi.length; a++)
          mt(Zi[a], e);
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
        if (Nl(t)) {
          for (ue in l)
            l.hasOwnProperty(ue) && (a = l[ue], a !== void 0 && yd(
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
    for (E in l)
      l.hasOwnProperty(E) && (a = l[E], a != null && Vt(e, t, E, a, l, null));
  }
  function DE(e, t, l, a) {
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
        var s = null, u = null, p = null, E = null, H = null, J = null, ue = null;
        for (ae in l) {
          var pe = l[ae];
          if (l.hasOwnProperty(ae) && pe != null)
            switch (ae) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                H = pe;
              default:
                a.hasOwnProperty(ae) || Vt(e, t, ae, null, a, pe);
            }
        }
        for (var W in a) {
          var ae = a[W];
          if (pe = l[W], a.hasOwnProperty(W) && (ae != null || pe != null))
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
                E = ae;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ae != null)
                  throw Error(i(137, t));
                break;
              default:
                ae !== pe && Vt(
                  e,
                  t,
                  W,
                  ae,
                  a,
                  pe
                );
            }
        }
        Ao(
          e,
          p,
          E,
          H,
          J,
          ue,
          u,
          s
        );
        return;
      case "select":
        ae = p = E = W = null;
        for (u in l)
          if (H = l[u], l.hasOwnProperty(u) && H != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                ae = H;
              default:
                a.hasOwnProperty(u) || Vt(
                  e,
                  t,
                  u,
                  null,
                  a,
                  H
                );
            }
        for (s in a)
          if (u = a[s], H = l[s], a.hasOwnProperty(s) && (u != null || H != null))
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
                u !== H && Vt(
                  e,
                  t,
                  s,
                  u,
                  a,
                  H
                );
            }
        t = E, l = p, a = ae, W != null ? dl(e, !!l, W, !1) : !!a != !!l && (t != null ? dl(e, !!l, t, !0) : dl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        ae = W = null;
        for (E in l)
          if (s = l[E], l.hasOwnProperty(E) && s != null && !a.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Vt(e, t, E, null, a, s);
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
        Fa(e, W, ae);
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
        for (H in a)
          W = a[H], ae = l[H], a.hasOwnProperty(H) && W !== ae && (W != null || ae != null) && (H === "selected" ? e.selected = W && typeof W != "function" && typeof W != "symbol" : Vt(
            e,
            t,
            H,
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
        for (var Ze in l)
          W = l[Ze], l.hasOwnProperty(Ze) && W != null && !a.hasOwnProperty(Ze) && Vt(e, t, Ze, null, a, W);
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
        if (Nl(t)) {
          for (var It in l)
            W = l[It], l.hasOwnProperty(It) && W !== void 0 && !a.hasOwnProperty(It) && yd(
              e,
              t,
              It,
              void 0,
              a,
              W
            );
          for (ue in a)
            W = a[ue], ae = l[ue], !a.hasOwnProperty(ue) || W === ae || W === void 0 && ae === void 0 || yd(
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
    for (pe in a)
      W = a[pe], ae = l[pe], !a.hasOwnProperty(pe) || W === ae || W == null && ae == null || Vt(e, t, pe, W, a, ae);
  }
  function Hb(e) {
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
  function jE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var s = l[a], u = s.transferSize, p = s.initiatorType, E = s.duration;
        if (u && E && Hb(p)) {
          for (p = 0, E = s.responseEnd, a += 1; a < l.length; a++) {
            var H = l[a], J = H.startTime;
            if (J > E) break;
            var ue = H.transferSize, pe = H.initiatorType;
            ue && Hb(pe) && (H = H.responseEnd, p += ue * (H < E ? 1 : (E - J) / (H - J)));
          }
          if (--a, t += 8 * (u + p) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var vd = null, xd = null;
  function _c(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ub(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Bb(e, t) {
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
  function Sd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ed = null;
  function LE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ed ? !1 : (Ed = e, !0) : (Ed = null, !1);
  }
  var Gb = typeof setTimeout == "function" ? setTimeout : void 0, VE = typeof clearTimeout == "function" ? clearTimeout : void 0, Yb = typeof Promise == "function" ? Promise : void 0, IE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yb < "u" ? function(e) {
    return Yb.resolve(null).then(e).catch(HE);
  } : Gb;
  function HE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ea(e) {
    return e === "head";
  }
  function qb(e, t) {
    var l = t, a = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(s), ri(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Ji(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Ji(l);
          for (var u = l.firstChild; u; ) {
            var p = u.nextSibling, E = u.nodeName;
            u[Al] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = p;
          }
        } else
          l === "body" && Ji(e.ownerDocument.body);
      l = s;
    } while (l);
    ri(t);
  }
  function Pb(e, t) {
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
  function Cd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Cd(l), rt(l);
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
  function UE(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var s = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[Al])
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
  function BE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Ul(e.nextSibling), e === null)) return null;
    return e;
  }
  function Xb(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ul(e.nextSibling), e === null)) return null;
    return e;
  }
  function _d(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Rd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function GE(e, t) {
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
  var wd = null;
  function Fb(e) {
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
  function Kb(e) {
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
  function Qb(e, t, l) {
    switch (t = _c(l), e) {
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
  function Ji(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    rt(e);
  }
  var Bl = /* @__PURE__ */ new Map(), Zb = /* @__PURE__ */ new Set();
  function Rc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Xo = G.d;
  G.d = {
    f: YE,
    r: qE,
    D: PE,
    C: XE,
    L: FE,
    m: KE,
    X: ZE,
    S: QE,
    M: $E
  };
  function YE() {
    var e = Xo.f(), t = gc();
    return e || t;
  }
  function qE(e) {
    var t = Tl(e);
    t !== null && t.tag === 5 && t.type === "form" ? hg(t) : Xo.r(e);
  }
  var li = typeof document > "u" ? null : document;
  function $b(e, t, l) {
    var a = li;
    if (a && typeof t == "string" && t) {
      var s = Gt(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Zb.has(s) || (Zb.add(s), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(s) === null && (t = a.createElement("link"), zn(t, "link", e), en(t), a.head.appendChild(t)));
    }
  }
  function PE(e) {
    Xo.D(e), $b("dns-prefetch", e, null);
  }
  function XE(e, t) {
    Xo.C(e, t), $b("preconnect", e, t);
  }
  function FE(e, t, l) {
    Xo.L(e, t, l);
    var a = li;
    if (a && e && t) {
      var s = 'link[rel="preload"][as="' + Gt(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + Gt(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + Gt(
        l.imageSizes
      ) + '"]')) : s += '[href="' + Gt(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = oi(e);
          break;
        case "script":
          u = ai(e);
      }
      Bl.has(u) || (e = S(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Bl.set(u, e), a.querySelector(s) !== null || t === "style" && a.querySelector(Wi(u)) || t === "script" && a.querySelector(es(u)) || (t = a.createElement("link"), zn(t, "link", e), en(t), a.head.appendChild(t)));
    }
  }
  function KE(e, t) {
    Xo.m(e, t);
    var l = li;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Gt(a) + '"][href="' + Gt(e) + '"]', u = s;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ai(e);
      }
      if (!Bl.has(u) && (e = S({ rel: "modulepreload", href: e }, t), Bl.set(u, e), l.querySelector(s) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(es(u)))
              return;
        }
        a = l.createElement("link"), zn(a, "link", e), en(a), l.head.appendChild(a);
      }
    }
  }
  function QE(e, t, l) {
    Xo.S(e, t, l);
    var a = li;
    if (a && e) {
      var s = In(a).hoistableStyles, u = oi(e);
      t = t || "default";
      var p = s.get(u);
      if (!p) {
        var E = { loading: 0, preload: null };
        if (p = a.querySelector(
          Wi(u)
        ))
          E.loading = 5;
        else {
          e = S(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Bl.get(u)) && Md(e, l);
          var H = p = a.createElement("link");
          en(H), zn(H, "link", e), H._p = new Promise(function(J, ue) {
            H.onload = J, H.onerror = ue;
          }), H.addEventListener("load", function() {
            E.loading |= 1;
          }), H.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, wc(p, t, a);
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
  function ZE(e, t) {
    Xo.X(e, t);
    var l = li;
    if (l && e) {
      var a = In(l).hoistableScripts, s = ai(e), u = a.get(s);
      u || (u = l.querySelector(es(s)), u || (e = S({ src: e, async: !0 }, t), (t = Bl.get(s)) && Ad(e, t), u = l.createElement("script"), en(u), zn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function $E(e, t) {
    Xo.M(e, t);
    var l = li;
    if (l && e) {
      var a = In(l).hoistableScripts, s = ai(e), u = a.get(s);
      u || (u = l.querySelector(es(s)), u || (e = S({ src: e, async: !0, type: "module" }, t), (t = Bl.get(s)) && Ad(e, t), u = l.createElement("script"), en(u), zn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function Jb(e, t, l, a) {
    var s = (s = _e.current) ? Rc(s) : null;
    if (!s) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = oi(l.href), l = In(
          s
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = oi(l.href);
          var u = In(
            s
          ).hoistableStyles, p = u.get(e);
          if (p || (s = s.ownerDocument || s, p = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, p), (u = s.querySelector(
            Wi(e)
          )) && !u._p && (p.instance = u, p.state.loading = 5), Bl.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Bl.set(e, l), u || JE(
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
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ai(l), l = In(
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
  function oi(e) {
    return 'href="' + Gt(e) + '"';
  }
  function Wi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Wb(e) {
    return S({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function JE(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), zn(t, "link", l), en(t), e.head.appendChild(t));
  }
  function ai(e) {
    return '[src="' + Gt(e) + '"]';
  }
  function es(e) {
    return "script[async]" + e;
  }
  function ey(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Gt(l.href) + '"]'
          );
          if (a)
            return t.instance = a, en(a), a;
          var s = S({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), en(a), zn(a, "style", s), wc(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          s = oi(l.href);
          var u = e.querySelector(
            Wi(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, en(u), u;
          a = Wb(l), (s = Bl.get(s)) && Md(a, s), u = (e.ownerDocument || e).createElement("link"), en(u);
          var p = u;
          return p._p = new Promise(function(E, H) {
            p.onload = E, p.onerror = H;
          }), zn(u, "link", a), t.state.loading |= 4, wc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = ai(l.src), (s = e.querySelector(
            es(u)
          )) ? (t.instance = s, en(s), s) : (a = l, (s = Bl.get(u)) && (a = S({}, l), Ad(a, s)), e = e.ownerDocument || e, s = e.createElement("script"), en(s), zn(s, "link", a), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(i(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, wc(a, l.precedence, e));
    return t.instance;
  }
  function wc(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = a.length ? a[a.length - 1] : null, u = s, p = 0; p < a.length; p++) {
      var E = a[p];
      if (E.dataset.precedence === t) u = E;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Md(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ad(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Mc = null;
  function ty(e, t, l) {
    if (Mc === null) {
      var a = /* @__PURE__ */ new Map(), s = Mc = /* @__PURE__ */ new Map();
      s.set(l, a);
    } else
      s = Mc, a = s.get(l), a || (a = /* @__PURE__ */ new Map(), s.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[Al] || u[At] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var p = u.getAttribute(t) || "";
        p = e + p;
        var E = a.get(p);
        E ? E.push(u) : a.set(p, [u]);
      }
    }
    return a;
  }
  function ny(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function WE(e, t, l) {
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
  function ly(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function eC(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = oi(a.href), u = t.querySelector(
          Wi(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ac.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, en(u);
          return;
        }
        u = t.ownerDocument || t, a = Wb(a), (s = Bl.get(s)) && Md(a, s), u = u.createElement("link"), en(u);
        var p = u;
        p._p = new Promise(function(E, H) {
          p.onload = E, p.onerror = H;
        }), zn(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Ac.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Td = 0;
  function tC(e, t) {
    return e.stylesheets && e.count === 0 && Oc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && Oc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Td === 0 && (Td = 62500 * jE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Oc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Td ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(s);
      };
    } : null;
  }
  function Ac() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Oc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Tc = null;
  function Oc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Tc = /* @__PURE__ */ new Map(), t.forEach(nC, e), Tc = null, Ac.call(e));
  }
  function nC(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Tc.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Tc.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var p = s[u];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") && (l.set(p.dataset.precedence, p), a = p);
        }
        a && l.set(null, a);
      }
      s = t.instance, p = s.getAttribute("data-precedence"), u = l.get(p) || a, u === a && l.set(null, s), l.set(p, s), this.count++, a = Ac.bind(this), s.addEventListener("load", a), s.addEventListener("error", a), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ts = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0
  };
  function lC(e, t, l, a, s, u, p, E, H) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Bt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bt(0), this.hiddenUpdates = Bt(null), this.identifierPrefix = a, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = p, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = H, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function oy(e, t, l, a, s, u, p, E, H, J, ue, pe) {
    return e = new lC(
      e,
      t,
      l,
      p,
      H,
      J,
      ue,
      pe,
      E
    ), t = 1, u === !0 && (t |= 24), u = pl(3, null, null, t), e.current = u, u.stateNode = e, t = sf(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, df(u), e;
  }
  function ay(e) {
    return e ? (e = Lr, e) : Lr;
  }
  function ry(e, t, l, a, s, u) {
    s = ay(s), a.context === null ? a.context = s : a.pendingContext = s, a = fa(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = da(e, a, t), l !== null && (rl(l, e, t), zi(l, e, t));
  }
  function iy(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Od(e, t) {
    iy(e, t), (e = e.alternate) && iy(e, t);
  }
  function sy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $a(e, 67108864);
      t !== null && rl(t, e, 67108864), Od(e, 67108864);
    }
  }
  function cy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xl();
      t = fo(t);
      var l = $a(e, t);
      l !== null && rl(l, e, t), Od(e, t);
    }
  }
  var kc = !0;
  function oC(e, t, l, a) {
    var s = U.T;
    U.T = null;
    var u = G.p;
    try {
      G.p = 2, kd(e, t, l, a);
    } finally {
      G.p = u, U.T = s;
    }
  }
  function aC(e, t, l, a) {
    var s = U.T;
    U.T = null;
    var u = G.p;
    try {
      G.p = 8, kd(e, t, l, a);
    } finally {
      G.p = u, U.T = s;
    }
  }
  function kd(e, t, l, a) {
    if (kc) {
      var s = Nd(a);
      if (s === null)
        bd(
          e,
          t,
          a,
          Nc,
          l
        ), fy(e, a);
      else if (iC(
        s,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (fy(e, a), t & 4 && -1 < rC.indexOf(e)) {
        for (; s !== null; ) {
          var u = Tl(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var p = lt(u.pendingLanes);
                  if (p !== 0) {
                    var E = u;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; p; ) {
                      var H = 1 << 31 - dt(p);
                      E.entanglements[1] |= H, p &= ~H;
                    }
                    go(u), (Tt & 6) === 0 && (mc = Z() + 500, Qi(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = $a(u, 2), E !== null && rl(E, u, 2), gc(), Od(u, 2);
            }
          if (u = Nd(a), u === null && bd(
            e,
            t,
            a,
            Nc,
            l
          ), u === s) break;
          s = u;
        }
        s !== null && a.stopPropagation();
      } else
        bd(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function Nd(e) {
    return e = to(e), zd(e);
  }
  var Nc = null;
  function zd(e) {
    if (Nc = null, e = fl(e), e !== null) {
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
    return Nc = e, null;
  }
  function uy(e) {
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
          case ye:
            return 8;
          case Le:
          case Je:
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
  var Dd = !1, Ca = null, _a = null, Ra = null, ns = /* @__PURE__ */ new Map(), ls = /* @__PURE__ */ new Map(), wa = [], rC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function fy(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ca = null;
        break;
      case "dragenter":
      case "dragleave":
        _a = null;
        break;
      case "mouseover":
      case "mouseout":
        Ra = null;
        break;
      case "pointerover":
      case "pointerout":
        ns.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ls.delete(t.pointerId);
    }
  }
  function os(e, t, l, a, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = Tl(t), t !== null && sy(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function iC(e, t, l, a, s) {
    switch (t) {
      case "focusin":
        return Ca = os(
          Ca,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "dragenter":
        return _a = os(
          _a,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "mouseover":
        return Ra = os(
          Ra,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return ns.set(
          u,
          os(
            ns.get(u) || null,
            e,
            t,
            l,
            a,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, ls.set(
          u,
          os(
            ls.get(u) || null,
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
  function dy(e) {
    var t = fl(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, Eo(e.priority, function() {
              cy(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, Eo(e.priority, function() {
              cy(l);
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
  function zc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Nd(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        ko = a, l.target.dispatchEvent(a), ko = null;
      } else
        return t = Tl(l), t !== null && sy(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function hy(e, t, l) {
    zc(e) && l.delete(t);
  }
  function sC() {
    Dd = !1, Ca !== null && zc(Ca) && (Ca = null), _a !== null && zc(_a) && (_a = null), Ra !== null && zc(Ra) && (Ra = null), ns.forEach(hy), ls.forEach(hy);
  }
  function Dc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      sC
    )));
  }
  var jc = null;
  function my(e) {
    jc !== e && (jc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        jc === e && (jc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], s = e[t + 2];
          if (typeof a != "function") {
            if (zd(a || l) === null)
              continue;
            break;
          }
          var u = Tl(l);
          u !== null && (e.splice(t, 3), t -= 3, Nf(
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
  function ri(e) {
    function t(H) {
      return Dc(H, e);
    }
    Ca !== null && Dc(Ca, e), _a !== null && Dc(_a, e), Ra !== null && Dc(Ra, e), ns.forEach(t), ls.forEach(t);
    for (var l = 0; l < wa.length; l++) {
      var a = wa[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < wa.length && (l = wa[0], l.blockedOn === null); )
      dy(l), l.blockedOn === null && wa.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var s = l[a], u = l[a + 1], p = s[Ct] || null;
        if (typeof u == "function")
          p || my(l);
        else if (p) {
          var E = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, p = u[Ct] || null)
              E = p.formAction;
            else if (zd(s) !== null) continue;
          } else E = p.action;
          typeof E == "function" ? l[a + 1] = E : (l.splice(a, 3), a -= 3), my(l);
        }
      }
  }
  function py() {
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
  function jd(e) {
    this._internalRoot = e;
  }
  Lc.prototype.render = jd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    var l = t.current, a = xl();
    ry(l, a, e, t, null, null);
  }, Lc.prototype.unmount = jd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ry(e.current, 2, null, e, null, null), gc(), t[Ge] = null;
    }
  };
  function Lc(e) {
    this._internalRoot = e;
  }
  Lc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Jn();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < wa.length && t !== 0 && t < wa[l].priority; l++) ;
      wa.splice(l, 0, e), l === 0 && dy(e);
    }
  };
  var gy = o.version;
  if (gy !== "19.2.8")
    throw Error(
      i(
        527,
        gy,
        "19.2.8"
      )
    );
  G.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = h(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var cC = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vc.isDisabled && Vc.supportsFiber)
      try {
        Ot = Vc.inject(
          cC
        ), xt = Vc;
      } catch {
      }
  }
  return rs.createRoot = function(e, t) {
    if (!c(e)) throw Error(i(299));
    var l = !1, a = "", s = Cg, u = _g, p = Rg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = oy(
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
      py
    ), e[Ge] = t.current, gd(e), new jd(t);
  }, rs.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(i(299));
    var a = !1, s = "", u = Cg, p = _g, E = Rg, H = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (p = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (H = l.formState)), t = oy(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      s,
      H,
      u,
      p,
      E,
      py
    ), t.context = ay(null), l = t.current, a = xl(), a = fo(a), s = fa(a), s.callback = null, da(l, s, a), l = a, t.current.lanes = l, Pn(t, l), go(t), e[Ge] = t.current, gd(e), new Lc(t);
  }, rs.version = "19.2.8", rs;
}
var Ty;
function xC() {
  if (Ty) return Id.exports;
  Ty = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Id.exports = vC(), Id.exports;
}
var SC = xC(), b = Cs();
const EC = /* @__PURE__ */ dC(b), Er = /* @__PURE__ */ fC({
  __proto__: null,
  default: EC
}, [b]);
function Oy(n) {
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
function CC(n) {
  const [o, r] = b.useState(() => Oy(n));
  return b.useEffect(() => {
    if (!n) return;
    const i = () => r(Oy(n));
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
function t0(n) {
  var o, r, i = "";
  if (typeof n == "string" || typeof n == "number") i += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = t0(n[o])) && (i && (i += " "), i += r);
  } else for (r in n) n[r] && (i && (i += " "), i += r);
  return i;
}
function n0() {
  for (var n, o, r = 0, i = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = t0(n)) && (i && (i += " "), i += o);
  return i;
}
const _C = (n, o) => {
  const r = new Array(n.length + o.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n[i];
  for (let i = 0; i < o.length; i++)
    r[n.length + i] = o[i];
  return r;
}, RC = (n, o) => ({
  classGroupId: n,
  validator: o
}), l0 = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), lu = "-", ky = [], wC = "arbitrary..", MC = (n) => {
  const o = TC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return AC(d);
      const m = d.split(lu), g = m[0] === "" && m.length > 1 ? 1 : 0;
      return o0(m, g, o);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const g = i[d], h = r[d];
        return g ? h ? _C(h, g) : g : h || ky;
      }
      return r[d] || ky;
    }
  };
}, o0 = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = o0(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const m = o === 0 ? n.join(lu) : n.slice(o).join(lu), g = d.length;
  for (let h = 0; h < g; h++) {
    const y = d[h];
    if (y.validator(m))
      return y.classGroupId;
  }
}, AC = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = n.slice(1, -1), r = o.indexOf(":"), i = o.slice(0, r);
  return i ? wC + i : void 0;
})(), TC = (n) => {
  const {
    theme: o,
    classGroups: r
  } = n;
  return OC(r, o);
}, OC = (n, o) => {
  const r = l0();
  for (const i in n) {
    const c = n[i];
    Kh(c, r, i, o);
  }
  return r;
}, Kh = (n, o, r, i) => {
  const c = n.length;
  for (let f = 0; f < c; f++) {
    const d = n[f];
    kC(d, o, r, i);
  }
}, kC = (n, o, r, i) => {
  if (typeof n == "string") {
    NC(n, o, r);
    return;
  }
  if (typeof n == "function") {
    zC(n, o, r, i);
    return;
  }
  DC(n, o, r, i);
}, NC = (n, o, r) => {
  const i = n === "" ? o : a0(o, n);
  i.classGroupId = r;
}, zC = (n, o, r, i) => {
  if (jC(n)) {
    Kh(n(i), o, r, i);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(RC(r, n));
}, DC = (n, o, r, i) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [m, g] = c[d];
    Kh(g, a0(o, m), r, i);
  }
}, a0 = (n, o) => {
  let r = n;
  const i = o.split(lu), c = i.length;
  for (let f = 0; f < c; f++) {
    const d = i[f];
    let m = r.nextPart.get(d);
    m || (m = l0(), r.nextPart.set(d, m)), r = m;
  }
  return r;
}, jC = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, LC = (n) => {
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
}, Rh = "!", Ny = ":", VC = [], zy = (n, o, r, i, c) => ({
  modifiers: n,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: i,
  isExternal: c
}), IC = (n) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = n;
  let i = (c) => {
    const f = [];
    let d = 0, m = 0, g = 0, h;
    const y = c.length;
    for (let A = 0; A < y; A++) {
      const R = c[A];
      if (d === 0 && m === 0) {
        if (R === Ny) {
          f.push(c.slice(g, A)), g = A + 1;
          continue;
        }
        if (R === "/") {
          h = A;
          continue;
        }
      }
      R === "[" ? d++ : R === "]" ? d-- : R === "(" ? m++ : R === ")" && m--;
    }
    const S = f.length === 0 ? c : c.slice(g);
    let v = S, C = !1;
    S.endsWith(Rh) ? (v = S.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      S.startsWith(Rh) && (v = S.slice(1), C = !0)
    );
    const _ = h && h > g ? h - g : void 0;
    return zy(f, C, v, _);
  };
  if (o) {
    const c = o + Ny, f = i;
    i = (d) => d.startsWith(c) ? f(d.slice(c.length)) : zy(VC, !1, d, void 0, !0);
  }
  if (r) {
    const c = i;
    i = (f) => r({
      className: f,
      parseClassName: c
    });
  }
  return i;
}, HC = (n) => {
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
}, UC = (n) => ({
  cache: LC(n.cacheSize),
  parseClassName: IC(n),
  sortModifiers: HC(n),
  postfixLookupClassGroupIds: BC(n),
  ...MC(n)
}), BC = (n) => {
  const o = /* @__PURE__ */ Object.create(null), r = n.postfixLookupClassGroups;
  if (r)
    for (let i = 0; i < r.length; i++)
      o[r[i]] = !0;
  return o;
}, GC = /\s+/, YC = (n, o) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: c,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = o, m = [], g = n.trim().split(GC);
  let h = "";
  for (let y = g.length - 1; y >= 0; y -= 1) {
    const S = g[y], {
      isExternal: v,
      modifiers: C,
      hasImportantModifier: _,
      baseClassName: A,
      maybePostfixModifierPosition: R
    } = r(S);
    if (v) {
      h = S + (h.length > 0 ? " " + h : h);
      continue;
    }
    let w = !!R, O;
    if (w) {
      const B = A.substring(0, R);
      O = i(B);
      const V = O && d[O] ? i(A) : void 0;
      V && V !== O && (O = V, w = !1);
    } else
      O = i(A);
    if (!O) {
      if (!w) {
        h = S + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (O = i(A), !O) {
        h = S + (h.length > 0 ? " " + h : h);
        continue;
      }
      w = !1;
    }
    const k = C.length === 0 ? "" : C.length === 1 ? C[0] : f(C).join(":"), D = _ ? k + Rh : k, L = D + O;
    if (m.indexOf(L) > -1)
      continue;
    m.push(L);
    const I = c(O, w);
    for (let B = 0; B < I.length; ++B) {
      const V = I[B];
      m.push(D + V);
    }
    h = S + (h.length > 0 ? " " + h : h);
  }
  return h;
}, qC = (...n) => {
  let o = 0, r, i, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (i = r0(r)) && (c && (c += " "), c += i);
  return c;
}, r0 = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let i = 0; i < n.length; i++)
    n[i] && (o = r0(n[i])) && (r && (r += " "), r += o);
  return r;
}, PC = (n, ...o) => {
  let r, i, c, f;
  const d = (g) => {
    const h = o.reduce((y, S) => S(y), n());
    return r = UC(h), i = r.cache.get, c = r.cache.set, f = m, m(g);
  }, m = (g) => {
    const h = i(g);
    if (h)
      return h;
    const y = YC(g, r);
    return c(g, y), y;
  };
  return f = d, (...g) => f(qC(...g));
}, XC = [], _n = (n) => {
  const o = (r) => r[n] || XC;
  return o.isThemeGetter = !0, o;
}, i0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, s0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, FC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, KC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, QC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ZC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, $C = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, JC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Aa = (n) => FC.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), bo = (n) => !!n && Number.isInteger(Number(n)), Yd = (n) => n.endsWith("%") && ft(n.slice(0, -1)), Fo = (n) => KC.test(n), c0 = () => !0, WC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  QC.test(n) && !ZC.test(n)
), Qh = () => !1, e_ = (n) => $C.test(n), t_ = (n) => JC.test(n), n_ = (n) => !De(n) && !je(n), l_ = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), o_ = (n) => qa(n, d0, Qh), De = (n) => i0.test(n), ur = (n) => qa(n, h0, WC), Dy = (n) => qa(n, d_, ft), a_ = (n) => qa(n, p0, c0), r_ = (n) => qa(n, m0, Qh), jy = (n) => qa(n, u0, Qh), i_ = (n) => qa(n, f0, t_), Ic = (n) => qa(n, g0, e_), je = (n) => s0.test(n), is = (n) => Cr(n, h0), s_ = (n) => Cr(n, m0), Ly = (n) => Cr(n, u0), c_ = (n) => Cr(n, d0), u_ = (n) => Cr(n, f0), Hc = (n) => Cr(n, g0, !0), f_ = (n) => Cr(n, p0, !0), qa = (n, o, r) => {
  const i = i0.exec(n);
  return i ? i[1] ? o(i[1]) : r(i[2]) : !1;
}, Cr = (n, o, r = !1) => {
  const i = s0.exec(n);
  return i ? i[1] ? o(i[1]) : r : !1;
}, u0 = (n) => n === "position" || n === "percentage", f0 = (n) => n === "image" || n === "url", d0 = (n) => n === "length" || n === "size" || n === "bg-size", h0 = (n) => n === "length", d_ = (n) => n === "number", m0 = (n) => n === "family-name", p0 = (n) => n === "number" || n === "weight", g0 = (n) => n === "shadow", h_ = () => {
  const n = _n("color"), o = _n("font"), r = _n("text"), i = _n("font-weight"), c = _n("tracking"), f = _n("leading"), d = _n("breakpoint"), m = _n("container"), g = _n("spacing"), h = _n("radius"), y = _n("shadow"), S = _n("inset-shadow"), v = _n("text-shadow"), C = _n("drop-shadow"), _ = _n("blur"), A = _n("perspective"), R = _n("aspect"), w = _n("ease"), O = _n("animate"), k = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [
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
  ], L = () => [...D(), je, De], I = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", "contain", "none"], V = () => [je, De, g], P = () => [Aa, "full", "auto", ...V()], ee = () => [bo, "none", "subgrid", je, De], se = () => ["auto", {
    span: ["full", bo, je, De]
  }, bo, je, De], fe = () => [bo, "auto", je, De], le = () => ["auto", "min", "max", "fr", je, De], me = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], be = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], U = () => ["auto", ...V()], G = () => [Aa, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...V()], K = () => [Aa, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...V()], ve = () => [Aa, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...V()], ie = () => [n, je, De], j = () => [...D(), Ly, jy, {
    position: [je, De]
  }], F = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], te = () => ["auto", "cover", "contain", c_, o_, {
    size: [je, De]
  }], oe = () => [Yd, is, ur], ge = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    je,
    De
  ], _e = () => ["", ft, is, ur], Ye = () => ["solid", "dashed", "dotted", "double"], we = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Me = () => [ft, Yd, Ly, jy], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    _,
    je,
    De
  ], pt = () => ["none", ft, je, De], ke = () => ["none", ft, je, De], tt = () => [ft, je, De], Te = () => [Aa, "full", ...V()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Fo],
      breakpoint: [Fo],
      color: [c0],
      container: [Fo],
      "drop-shadow": [Fo],
      ease: ["in", "out", "in-out"],
      font: [n_],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Fo],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Fo],
      shadow: [Fo],
      spacing: ["px", ft],
      text: [Fo],
      "text-shadow": [Fo],
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
        aspect: ["auto", "square", Aa, De, je, R]
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
      "container-named": [l_],
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
        "break-after": k()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": k()
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
        object: L()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: I()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": I()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": I()
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
        basis: [Aa, "full", "auto", m, ...V()]
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
        flex: [ft, Aa, "auto", "initial", "none", De]
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
        "grid-cols": ee()
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
        "grid-rows": ee()
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
        gap: V()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": V()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": V()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...me(), "normal"]
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
        content: ["normal", ...me()]
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
        "place-content": me()
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
        p: V()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: V()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: V()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: V()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: V()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: V()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: V()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: V()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: V()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: V()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: V()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: U()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: U()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: U()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: U()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: U()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: U()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: U()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: U()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: U()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: U()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: U()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": V()
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
        "space-y": V()
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
        size: G()
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
        w: [m, "screen", ...G()]
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
          ...G()
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
          ...G()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...G()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...G()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...G()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, is, ur]
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
        font: [i, f_, a_]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Yd, De]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [s_, r_, o]
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
        "line-clamp": [ft, "none", je, Dy]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...V()
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
        decoration: [...Ye(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ft, "from-font", "auto", je, ur]
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
        indent: V()
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
        bg: j()
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
        bg: te()
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
        }, u_, i_]
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
        border: [...Ye(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...Ye(), "hidden", "none"]
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
        outline: [...Ye(), "none", "hidden"]
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
        outline: ["", ft, is, ur]
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
          Hc,
          Ic
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
        "inset-shadow": ["none", S, Hc, Ic]
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
        ring: ie()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ft, ur]
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
        "inset-ring": _e()
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
        "text-shadow": ["none", v, Hc, Ic]
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
        "mix-blend": [...we(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": we()
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
        "mask-linear-from": Me()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Me()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": ie()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": ie()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Me()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Me()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": ie()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": ie()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Me()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Me()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": ie()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": ie()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Me()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Me()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": ie()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": ie()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Me()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Me()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": ie()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": ie()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Me()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Me()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": ie()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": ie()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Me()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Me()
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
        "mask-radial-from": Me()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Me()
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
        "mask-radial-at": D()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ft]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Me()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Me()
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
        mask: j()
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
        mask: te()
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
          Hc,
          Ic
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
        "border-spacing": V()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": V()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": V()
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
        animate: ["none", O, je, De]
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
        "perspective-origin": L()
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
        skew: tt()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": tt()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": tt()
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
        origin: L()
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
        translate: Te()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Te()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Te()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Te()
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
        "scroll-m": V()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": V()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": V()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": V()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": V()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": V()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": V()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": V()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": V()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": V()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": V()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": V()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": V()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": V()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": V()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": V()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": V()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": V()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": V()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": V()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": V()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": V()
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
        stroke: [ft, is, ur, Dy]
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
}, m_ = /* @__PURE__ */ PC(h_);
function et(...n) {
  return m_(n0(n));
}
const b0 = (...n) => n.filter((o, r, i) => !!o && o.trim() !== "" && i.indexOf(o) === r).join(" ").trim();
const p_ = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const g_ = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, i) => i ? i.toUpperCase() : r.toLowerCase()
);
const Vy = (n) => {
  const o = g_(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var qd = {
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
const b_ = (n) => {
  for (const o in n)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
  return !1;
}, y_ = b.createContext({}), v_ = () => b.useContext(y_), x_ = b.forwardRef(
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: i, className: c = "", children: f, iconNode: d, ...m }, g) => {
    const {
      size: h = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: S = !1,
      color: v = "currentColor",
      className: C = ""
    } = v_() ?? {}, _ = i ?? S ? Number(r ?? y) * 24 / Number(o ?? h) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...qd,
        width: o ?? h ?? qd.width,
        height: o ?? h ?? qd.height,
        stroke: n ?? v,
        strokeWidth: _,
        className: b0("lucide", C, c),
        ...!f && !b_(m) && { "aria-hidden": "true" },
        ...m
      },
      [
        ...d.map(([A, R]) => b.createElement(A, R)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const hn = (n, o) => {
  const r = b.forwardRef(
    ({ className: i, ...c }, f) => b.createElement(x_, {
      ref: f,
      iconNode: o,
      className: b0(
        `lucide-${p_(Vy(n))}`,
        `lucide-${n}`,
        i
      ),
      ...c
    })
  );
  return r.displayName = Vy(n), r;
};
const S_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], E_ = hn("check", S_);
const C_ = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], __ = hn("chevron-down", C_);
const R_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], w_ = hn("chevron-right", R_);
const M_ = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Iy = hn("circle", M_);
const A_ = [
  ["path", { d: "M11 14h10", key: "1w8e9d" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
  ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
], T_ = hn("clipboard-paste", A_);
const O_ = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], k_ = hn("copy", O_);
const N_ = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], z_ = hn("expand", N_);
const D_ = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], j_ = hn("eye", D_);
const L_ = [
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
], V_ = hn("eye-off", L_);
const I_ = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], H_ = hn("lasso", I_);
const U_ = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], B_ = hn("maximize", U_);
const G_ = [["path", { d: "M5 12h14", key: "1ays0h" }]], y0 = hn("minus", G_);
const Y_ = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], q_ = hn("move", Y_);
const P_ = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], X_ = hn("pentagon", P_);
const F_ = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], v0 = hn("plus", F_);
const K_ = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], x0 = hn("shapes", K_);
const Q_ = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], Z_ = hn("shrink", Q_);
const $_ = [["path", { d: "M22 2 2 22", key: "y4kqgn" }]], J_ = hn("slash", $_);
const W_ = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], eR = hn("spline", W_);
const tR = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], nR = hn("square", tR);
const lR = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Zh = hn("x", lR);
var yi = e0(), oR = Object.defineProperty, $h = (n, o) => oR(n, "name", { value: o, configurable: !0 });
function wh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
$h(wh, "setRef");
function S0(...n) {
  return (o) => {
    let r = !1;
    const i = n.map((c) => {
      const f = wh(c, o);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let c = 0; c < i.length; c++) {
          const f = i[c];
          typeof f == "function" ? f() : wh(n[c], null);
        }
      };
  };
}
$h(S0, "composeRefs");
function qn(...n) {
  return b.useCallback(S0(...n), n);
}
$h(qn, "useComposedRefs");
var aR = Object.defineProperty, co = (n, o) => aR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function pr(n) {
  const o = b.forwardRef((r, i) => {
    let { children: c, ...f } = r, d = null, m = !1;
    const g = [];
    Mh(c) && typeof Uc == "function" && (c = Uc(c._payload)), b.Children.forEach(c, (v) => {
      if (R0(v)) {
        m = !0;
        const C = v;
        let _ = "child" in C.props ? C.props.child : C.props.children;
        Mh(_) && typeof Uc == "function" && (_ = Uc(_._payload)), d = sR(C, _), g.push(d?.props?.children);
      } else
        g.push(v);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? _0(d) : void 0, y = qn(i, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          m ? fR(n) : uR(n)
        );
      return c;
    }
    const S = C0(f, d.props ?? {});
    return d.type !== b.Fragment && (S.ref = i ? y : h), b.cloneElement(d, S);
  });
  return o.displayName = `${n}.Slot`, o;
}
co(pr, "createSlot");
var rR = /* @__PURE__ */ pr("Slot"), E0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function iR(n) {
  const o = /* @__PURE__ */ co((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = E0, o;
}
co(iR, "createSlottable");
var sR = /* @__PURE__ */ co((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function C0(n, o) {
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
co(C0, "mergeProps");
function _0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
co(_0, "getElementRef");
function R0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === E0;
}
co(R0, "isSlottable");
var cR = /* @__PURE__ */ Symbol.for("react.lazy");
function Mh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === cR && "_payload" in n && w0(n._payload);
}
co(Mh, "isLazyComponent");
function w0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
co(w0, "isPromiseLike");
var uR = /* @__PURE__ */ co((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), fR = /* @__PURE__ */ co((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Uc = Er[" use ".trim().toString()], dR = Object.defineProperty, hR = (n, o) => dR(n, "name", { value: o, configurable: !0 }), mR = [
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
], Dn = mR.reduce((n, o) => {
  const r = /* @__PURE__ */ pr(`Primitive.${o}`), i = b.forwardRef((c, f) => {
    const { asChild: d, ...m } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ x.jsx(g, { ...m, ref: f });
  });
  return i.displayName = `Primitive.${o}`, { ...n, [o]: i };
}, {});
function pR(n, o) {
  n && yi.flushSync(() => n.dispatchEvent(o));
}
hR(pR, "dispatchDiscreteCustomEvent");
var gR = Object.defineProperty, ql = (n, o) => gR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function bR(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const i = /* @__PURE__ */ ql((f) => {
    const { children: d, ...m } = f, g = b.useMemo(() => m, Object.values(m));
    return /* @__PURE__ */ x.jsx(r.Provider, { value: g, children: d });
  }, "Provider");
  i.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: m = !1 } = d, g = b.useContext(r);
    if (g) return g;
    if (o !== void 0) return o;
    if (!m)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return ql(c, "useContext"), [i, c];
}
ql(bR, "createContext");
// @__NO_SIDE_EFFECTS__
function Pa(n, o = []) {
  let r = [];
  function i(f, d) {
    const m = b.createContext(d);
    m.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ ql((S) => {
      const { scope: v, children: C, ..._ } = S, A = v?.[n]?.[g] || m, R = b.useMemo(() => _, Object.values(_));
      return /* @__PURE__ */ x.jsx(A.Provider, { value: R, children: C });
    }, "Provider");
    h.displayName = f + "Provider";
    function y(S, v, C = {}) {
      const { optional: _ = !1 } = C, A = v?.[n]?.[g] || m, R = b.useContext(A);
      if (R) return R;
      if (d !== void 0) return d;
      if (!_)
        throw new Error(`\`${S}\` must be used within \`${f}\``);
    }
    return ql(y, "useContext"), [h, y];
  }
  ql(i, "createContext");
  const c = /* @__PURE__ */ ql(() => {
    const f = r.map((d) => b.createContext(d));
    return /* @__PURE__ */ ql(function(m) {
      const g = m?.[n] || f;
      return b.useMemo(
        () => ({ [`__scope${n}`]: { ...m, [n]: g } }),
        [m, g]
      );
    }, "useScope");
  }, "createScope");
  return c.scopeName = n, [i, M0(c, ...o)];
}
ql(Pa, "createContextScope");
function M0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ ql(() => {
    const i = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ ql(function(f) {
      const d = i.reduce((m, { useScope: g, scopeName: h }) => {
        const S = g(f)[`__scope${h}`];
        return { ...m, ...S };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
ql(M0, "composeContextScopes");
var yR = Object.defineProperty, Tn = (n, o) => yR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function pu(n) {
  const o = n + "CollectionProvider", [r, i] = /* @__PURE__ */ Pa(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Tn((A) => {
    const { scope: R, children: w } = A, O = b.useRef(null), k = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ x.jsx(c, { scope: R, itemMap: k, collectionRef: O, children: w });
  }, "CollectionProvider");
  d.displayName = o;
  const m = n + "CollectionSlot", g = /* @__PURE__ */ pr(m), h = b.forwardRef(
    (A, R) => {
      const { scope: w, children: O } = A, k = f(m, w), D = qn(R, k.collectionRef);
      return /* @__PURE__ */ x.jsx(g, { ref: D, children: O });
    }
  );
  h.displayName = m;
  const y = n + "CollectionItemSlot", S = "data-radix-collection-item", v = /* @__PURE__ */ pr(y), C = b.forwardRef(
    (A, R) => {
      const { scope: w, children: O, ...k } = A, D = b.useRef(null), L = qn(R, D), I = f(y, w);
      return b.useEffect(() => (I.itemMap.set(D, { ref: D, ...k }), () => {
        I.itemMap.delete(D);
      })), /* @__PURE__ */ x.jsx(v, { [S]: "", ref: L, children: O });
    }
  );
  C.displayName = y;
  function _(A) {
    const R = f(n + "CollectionConsumer", A);
    return b.useCallback(() => {
      const O = R.collectionRef.current;
      if (!O) return [];
      const k = Array.from(O.querySelectorAll(`[${S}]`));
      return Array.from(R.itemMap.values()).sort(
        (I, B) => k.indexOf(I.ref.current) - k.indexOf(B.ref.current)
      );
    }, [R.collectionRef, R.itemMap]);
  }
  return Tn(_, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: C },
    _,
    i
  ];
}
Tn(pu, "createCollection");
var Hy = /* @__PURE__ */ new WeakMap(), Sn, Sl, Pd = (Sl = class extends Map {
  constructor(r) {
    super(r);
    vy(this, Sn);
    Ld(this, Sn, [...super.keys()]), Hy.set(this, !0);
  }
  set(r, i) {
    return Hy.get(this) && (this.has(r) ? Bn(this, Sn)[Bn(this, Sn).indexOf(r)] = r : Bn(this, Sn).push(r)), super.set(r, i), this;
  }
  insert(r, i, c) {
    const f = this.has(i), d = Bn(this, Sn).length, m = Jh(r);
    let g = m >= 0 ? m : d + m;
    const h = g < 0 || g >= d ? -1 : g;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(i, c), this;
    const y = this.size + (f ? 0 : 1);
    m < 0 && g++;
    const S = [...Bn(this, Sn)];
    let v, C = !1;
    for (let _ = g; _ < y; _++)
      if (g === _) {
        let A = S[_];
        S[_] === i && (A = S[_ + 1]), f && this.delete(i), v = this.get(A), this.set(i, c);
      } else {
        !C && S[_ - 1] === i && (C = !0);
        const A = S[C ? _ : _ - 1], R = v;
        v = this.get(A), this.delete(A), this.set(A, R);
      }
    return this;
  }
  with(r, i, c) {
    const f = new Sl(this);
    return f.insert(r, i, c), f;
  }
  before(r) {
    const i = Bn(this, Sn).indexOf(r) - 1;
    if (!(i < 0))
      return this.entryAt(i);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(r, i, c) {
    const f = Bn(this, Sn).indexOf(r);
    return f === -1 ? this : this.insert(f, i, c);
  }
  after(r) {
    let i = Bn(this, Sn).indexOf(r);
    if (i = i === -1 || i === this.size - 1 ? -1 : i + 1, i !== -1)
      return this.entryAt(i);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(r, i, c) {
    const f = Bn(this, Sn).indexOf(r);
    return f === -1 ? this : this.insert(f + 1, i, c);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Ld(this, Sn, []), super.clear();
  }
  delete(r) {
    const i = super.delete(r);
    return i && Bn(this, Sn).splice(Bn(this, Sn).indexOf(r), 1), i;
  }
  deleteAt(r) {
    const i = this.keyAt(r);
    return i !== void 0 ? this.delete(i) : !1;
  }
  at(r) {
    const i = $c(Bn(this, Sn), r);
    if (i !== void 0)
      return this.get(i);
  }
  entryAt(r) {
    const i = $c(Bn(this, Sn), r);
    if (i !== void 0)
      return [i, this.get(i)];
  }
  indexOf(r) {
    return Bn(this, Sn).indexOf(r);
  }
  keyAt(r) {
    return $c(Bn(this, Sn), r);
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
    return new Sl(c);
  }
  map(r, i) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, i, [d, f, this])]), f++;
    return new Sl(c);
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
    return new Sl(i);
  }
  toReversed() {
    const r = new Sl();
    for (let i = this.size - 1; i >= 0; i--) {
      const c = this.keyAt(i), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const i = [...this.entries()];
    return i.splice(...r), new Sl(i);
  }
  slice(r, i) {
    const c = new Sl();
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
}, Sn = new WeakMap(), Tn(Sl, "OrderedDict"), Sl);
function $c(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = A0(n, o);
  return r === -1 ? void 0 : n[r];
}
Tn($c, "at");
function A0(n, o) {
  const r = n.length, i = Jh(o), c = i >= 0 ? i : r + i;
  return c < 0 || c >= r ? -1 : c;
}
Tn(A0, "toSafeIndex");
function Jh(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Tn(Jh, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function vR(n) {
  const o = n + "CollectionProvider", [r, i] = /* @__PURE__ */ Pa(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Pd(),
      setItemMap: /* @__PURE__ */ Tn(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Tn(({ state: k, ...D }) => k ? /* @__PURE__ */ x.jsx(g, { ...D, state: k }) : /* @__PURE__ */ x.jsx(m, { ...D }), "CollectionProvider");
  d.displayName = o;
  const m = /* @__PURE__ */ Tn((k) => {
    const D = R();
    return /* @__PURE__ */ x.jsx(g, { ...k, state: D });
  }, "CollectionInit");
  m.displayName = o + "Init";
  const g = /* @__PURE__ */ Tn((k) => {
    const { scope: D, children: L, state: I } = k, B = b.useRef(null), [V, P] = b.useState(
      null
    ), ee = qn(B, P), [se, fe] = I;
    return b.useEffect(() => {
      if (!V) return;
      const le = k0(() => {
      });
      return le.observe(V, {
        childList: !0,
        subtree: !0
      }), () => {
        le.disconnect();
      };
    }, [V]), /* @__PURE__ */ x.jsx(
      c,
      {
        scope: D,
        itemMap: se,
        setItemMap: fe,
        collectionRef: ee,
        collectionRefObject: B,
        collectionElement: V,
        children: L
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const h = n + "CollectionSlot", y = /* @__PURE__ */ pr(h), S = b.forwardRef(
    (k, D) => {
      const { scope: L, children: I } = k, B = f(h, L), V = qn(D, B.collectionRef);
      return /* @__PURE__ */ x.jsx(y, { ref: V, children: I });
    }
  );
  S.displayName = h;
  const v = n + "CollectionItemSlot", C = "data-radix-collection-item", _ = /* @__PURE__ */ pr(v), A = b.forwardRef(
    (k, D) => {
      const { scope: L, children: I, ...B } = k, V = b.useRef(null), [P, ee] = b.useState(null), se = qn(D, V, ee), fe = f(v, L), { setItemMap: le } = fe, me = b.useRef(B);
      T0(me.current, B) || (me.current = B);
      const be = me.current;
      return b.useEffect(() => {
        const U = be;
        return le((G) => P ? G.has(P) ? G.set(P, { ...U, element: P }).toSorted(Ah) : (G.set(P, { ...U, element: P }), G.toSorted(Ah)) : G), () => {
          le((G) => !P || !G.has(P) ? G : (G.delete(P), new Pd(G)));
        };
      }, [P, be, le]), /* @__PURE__ */ x.jsx(_, { [C]: "", ref: se, children: I });
    }
  );
  A.displayName = v;
  function R() {
    return b.useState(new Pd());
  }
  Tn(R, "useInitCollection");
  function w(k) {
    const { itemMap: D } = f(n + "CollectionConsumer", k);
    return D;
  }
  return Tn(w, "useCollection"), [
    { Provider: d, Slot: S, ItemSlot: A },
    {
      createCollectionScope: i,
      useCollection: w,
      useInitCollection: R
    }
  ];
}
Tn(vR, "createCollection");
function T0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), i = Object.keys(o);
  if (r.length !== i.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
Tn(T0, "shallowEqual");
function O0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Tn(O0, "isElementPreceding");
function Ah(n, o) {
  return !n[1].element || !o[1].element ? 0 : O0(n[1].element, o[1].element) ? -1 : 1;
}
Tn(Ah, "sortByDocumentPosition");
function k0(n) {
  return new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList") {
        n();
        return;
      }
  });
}
Tn(k0, "getChildListObserver");
var xR = Object.defineProperty, vi = (n, o) => xR(n, "name", { value: o, configurable: !0 }), N0 = !!(typeof window < "u" && window.document && window.document.createElement);
function Yn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ vi(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
vi(Yn, "composeEventHandlers");
function SR(n) {
  if (!N0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
vi(SR, "getOwnerWindow");
function Th(n) {
  if (!N0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
vi(Th, "getOwnerDocument");
function z0(n, o = !1) {
  const { activeElement: r } = Th(n);
  if (!r?.nodeName)
    return null;
  if (D0(r) && r.contentDocument)
    return z0(r.contentDocument.body, o);
  if (o) {
    const i = r.getAttribute("aria-activedescendant");
    if (i) {
      const c = Th(r).getElementById(i);
      if (c)
        return c;
    }
  }
  return r;
}
vi(z0, "getActiveElement");
function D0(n) {
  return n.tagName === "IFRAME";
}
vi(D0, "isFrame");
var Ia = globalThis?.document ? b.useLayoutEffect : () => {
}, ER = Object.defineProperty, CR = (n, o) => ER(n, "name", { value: o, configurable: !0 }), Uy = Er[" useEffectEvent ".trim().toString()], By = Er[" useInsertionEffect ".trim().toString()];
function j0(n) {
  if (typeof Uy == "function")
    return Uy(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof By == "function" ? By(() => {
    o.current = n;
  }) : Ia(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
CR(j0, "useEffectEvent");
var _R = Object.defineProperty, _s = (n, o) => _R(n, "name", { value: o, configurable: !0 }), RR = Er[" useInsertionEffect ".trim().toString()] || Ia;
function Jo({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ _s(() => {
  }, "onChange"),
  caller: i
}) {
  const [c, f, d] = L0({
    defaultProp: o,
    onChange: r
  }), m = n !== void 0, g = m ? n : c, h = b.useCallback(
    (y) => {
      if (m) {
        const S = V0(y) ? y(n) : y;
        S !== n && d.current?.(S);
      } else
        f(y);
    },
    [m, n, f, d]
  );
  return [g, h];
}
_s(Jo, "useControllableState");
function L0({
  defaultProp: n,
  onChange: o
}) {
  const [r, i] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return RR(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, i, f];
}
_s(L0, "useUncontrolledState");
function V0(n) {
  return typeof n == "function";
}
_s(V0, "isFunction");
var Gy = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function wR(n, o, r, i) {
  const { prop: c, defaultProp: f, onChange: d, caller: m } = o, g = c !== void 0, h = j0(d), y = [{ ...r, state: f }];
  i && y.push(i);
  const [S, v] = b.useReducer(
    (R, w) => {
      if (w.type === Gy)
        return { ...R, state: w.state };
      const O = n(R, w);
      return g && !Object.is(O.state, R.state) && h(O.state), O;
    },
    ...y
  ), C = S.state, _ = b.useRef(C);
  b.useEffect(() => {
    _.current !== C && (_.current = C, g || h(C));
  }, [C, _, g]);
  const A = b.useMemo(() => c !== void 0 ? { ...S, state: c } : S, [S, c]);
  return b.useEffect(() => {
    g && !Object.is(c, S.state) && v({ type: Gy, state: c });
  }, [c, S.state, g]), [A, v];
}
_s(wR, "useControllableStateReducer");
var MR = Object.defineProperty, $o = (n, o) => MR(n, "name", { value: o, configurable: !0 });
function I0(n, o) {
  return b.useReducer((r, i) => o[r][i] ?? r, n);
}
$o(I0, "useStateMachine");
var AR = /* @__PURE__ */ $o((n) => {
  const { present: o, children: r } = n, i = H0(o), c = typeof r == "function" ? r({ present: i.isPresent }) : b.Children.only(r), f = U0(i.ref, B0(c));
  return typeof r == "function" || i.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function H0(n) {
  const [o, r] = b.useState(), i = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), m = n ? "mounted" : "unmounted", [g, h] = I0(m, {
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
    g === "mounted" ? (f.current = d.current ?? si(i.current), d.current = void 0) : f.current = "none";
  }, [g]), Ia(() => {
    const y = i.current, S = c.current;
    if (S !== n) {
      const C = f.current, _ = si(y);
      n ? (d.current = _, h("MOUNT")) : _ === "none" || y?.display === "none" ? h("UNMOUNT") : h(S && C !== _ ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), Ia(() => {
    if (o) {
      let y;
      const S = o.ownerDocument.defaultView ?? window, v = /* @__PURE__ */ $o((_) => {
        const R = si(i.current).includes(CSS.escape(_.animationName));
        if (_.target === o && R && (h("ANIMATION_END"), !c.current)) {
          const w = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = S.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = w);
          });
        }
      }, "handleAnimationEnd"), C = /* @__PURE__ */ $o((_) => {
        _.target === o && (f.current = si(i.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", C), o.addEventListener("animationcancel", v), o.addEventListener("animationend", v), () => {
        S.clearTimeout(y), o.removeEventListener("animationstart", C), o.removeEventListener("animationcancel", v), o.removeEventListener("animationend", v);
      };
    } else
      h("ANIMATION_END");
  }, [o, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: b.useCallback((y) => {
      if (y) {
        const S = getComputedStyle(y);
        i.current = S, d.current = si(S);
      } else
        i.current = null;
      r(y);
    }, [])
  };
}
$o(H0, "usePresence");
function Oh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
$o(Oh, "setRef");
function U0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const i = o.current;
    let c = !1;
    const f = i.map((d) => {
      const m = Oh(d, r);
      return !c && typeof m == "function" && (c = !0), m;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const m = f[d];
          typeof m == "function" ? m() : Oh(i[d], null);
        }
      };
  }, []);
}
$o(U0, "useStableComposedRefs");
function si(n) {
  return n?.animationName || "none";
}
$o(si, "getAnimationName");
function B0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
$o(B0, "getElementRef");
var TR = Object.defineProperty, OR = (n, o) => TR(n, "name", { value: o, configurable: !0 }), kR = Er[" useId ".trim().toString()] || (() => {
}), NR = 0;
function gu(n) {
  const [o, r] = b.useState(kR());
  return Ia(() => {
    n || r((i) => i ?? String(NR++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
OR(gu, "useId");
var zR = Object.defineProperty, Rs = (n, o) => zR(n, "name", { value: o, configurable: !0 }), Wh = "Collapsible", [DR, G0] = /* @__PURE__ */ Pa(Wh), [jR, em] = DR(Wh), LR = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Rs(function(o, r) {
    const {
      __scopeCollapsible: i,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: m,
      ...g
    } = o, [h, y] = Jo({
      prop: c,
      defaultProp: f ?? !1,
      onChange: m,
      caller: Wh
    });
    return /* @__PURE__ */ x.jsx(
      jR,
      {
        scope: i,
        disabled: d,
        contentId: gu(),
        open: h,
        onOpenToggle: b.useCallback(() => y((S) => !S), [y]),
        children: /* @__PURE__ */ x.jsx(
          Dn.div,
          {
            "data-state": bu(h),
            "data-disabled": d ? "" : void 0,
            ...g,
            ref: r
          }
        )
      }
    );
  }, "Collapsible")
), VR = "CollapsibleTrigger", Y0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rs(function(o, r) {
    const { __scopeCollapsible: i, ...c } = o, f = em(VR, i);
    return /* @__PURE__ */ x.jsx(
      Dn.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": bu(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...c,
        ref: r,
        onClick: Yn(o.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), q0 = "CollapsibleContent", P0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rs(function(o, r) {
    const { forceMount: i, ...c } = o, f = em(q0, o.__scopeCollapsible);
    return /* @__PURE__ */ x.jsx(AR, { present: i || f.open, children: ({ present: d }) => /* @__PURE__ */ x.jsx(IR, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), IR = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Rs(function(o, r) {
  const { __scopeCollapsible: i, present: c, children: f, ...d } = o, m = em(q0, i), [g, h] = b.useState(c), y = b.useRef(null), S = qn(r, y), v = b.useRef(0), C = v.current, _ = b.useRef(0), A = _.current, R = m.open || g, w = b.useRef(R), O = b.useRef(void 0);
  return b.useEffect(() => {
    const k = requestAnimationFrame(() => w.current = !1);
    return () => cancelAnimationFrame(k);
  }, []), Ia(() => {
    const k = y.current;
    if (k) {
      O.current = O.current || {
        transitionDuration: k.style.transitionDuration,
        animationName: k.style.animationName
      }, k.style.transitionDuration = "0s", k.style.animationName = "none";
      const D = k.getBoundingClientRect();
      v.current = D.height, _.current = D.width, w.current || (k.style.transitionDuration = O.current.transitionDuration, k.style.animationName = O.current.animationName), h(c);
    }
  }, [m.open, c]), /* @__PURE__ */ x.jsx(
    Dn.div,
    {
      "data-state": bu(m.open),
      "data-disabled": m.disabled ? "" : void 0,
      id: m.contentId,
      hidden: !R,
      ...d,
      ref: S,
      style: {
        "--radix-collapsible-content-height": C ? `${C}px` : void 0,
        "--radix-collapsible-content-width": A ? `${A}px` : void 0,
        ...o.style
      },
      children: R && f
    }
  );
}, "CollapsibleContentImpl"));
function bu(n) {
  return n ? "open" : "closed";
}
Rs(bu, "getState");
var X0 = LR, HR = Y0, UR = P0, BR = Object.defineProperty, GR = (n, o) => BR(n, "name", { value: o, configurable: !0 }), YR = b.createContext(void 0);
function ws(n) {
  const o = b.useContext(YR);
  return n || o || "ltr";
}
GR(ws, "useDirection");
var qR = Object.defineProperty, Cl = (n, o) => qR(n, "name", { value: o, configurable: !0 }), xo = "Accordion", PR = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [tm, XR, FR] = /* @__PURE__ */ pu(xo), [yu, cN] = /* @__PURE__ */ Pa(xo, [
  FR,
  G0
]), nm = G0(), KR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cl(function(o, r) {
    const { type: i, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ x.jsx(tm.Provider, { scope: o.__scopeAccordion, children: i === "multiple" ? /* @__PURE__ */ x.jsx(JR, { ...d, ref: r }) : /* @__PURE__ */ x.jsx($R, { ...f, ref: r }) });
  }, "Accordion")
), [F0, QR] = yu(xo), [K0, ZR] = yu(
  xo,
  { collapsible: !1 }
), $R = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cl(function(o, r) {
    const {
      value: i,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Cl(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...m
    } = o, [g, h] = Jo({
      prop: i,
      defaultProp: c ?? "",
      onChange: f,
      caller: xo
    });
    return /* @__PURE__ */ x.jsx(
      F0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ x.jsx(K0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ x.jsx(Q0, { ...m, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), JR = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Cl(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Cl(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Jo({
    prop: i,
    defaultProp: c ?? [],
    onChange: f,
    caller: xo
  }), h = b.useCallback(
    (S) => g((v = []) => [...v, S]),
    [g]
  ), y = b.useCallback(
    (S) => g((v = []) => v.filter((C) => C !== S)),
    [g]
  );
  return /* @__PURE__ */ x.jsx(
    F0,
    {
      scope: o.__scopeAccordion,
      value: m,
      onItemOpen: h,
      onItemClose: y,
      children: /* @__PURE__ */ x.jsx(K0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ x.jsx(Q0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [WR, vu] = yu(xo), Q0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Cl(function(o, r) {
    const { __scopeAccordion: i, disabled: c, dir: f, orientation: d = "vertical", ...m } = o, g = b.useRef(null), h = qn(g, r), y = XR(i), v = ws(f) === "ltr", C = Yn(o.onKeyDown, (_) => {
      if (!PR.includes(_.key)) return;
      const A = _.target, R = y().filter((P) => !P.ref.current?.disabled), w = R.findIndex((P) => P.ref.current === A), O = R.length;
      if (w === -1) return;
      _.preventDefault();
      let k = w;
      const D = 0, L = O - 1, I = /* @__PURE__ */ Cl(() => {
        k = w + 1, k > L && (k = D);
      }, "moveNext"), B = /* @__PURE__ */ Cl(() => {
        k = w - 1, k < D && (k = L);
      }, "movePrev");
      switch (_.key) {
        case "Home":
          k = D;
          break;
        case "End":
          k = L;
          break;
        case "ArrowRight":
          d === "horizontal" && (v ? I() : B());
          break;
        case "ArrowDown":
          d === "vertical" && I();
          break;
        case "ArrowLeft":
          d === "horizontal" && (v ? B() : I());
          break;
        case "ArrowUp":
          d === "vertical" && B();
          break;
      }
      const V = k % O;
      R[V].ref.current?.focus();
    });
    return /* @__PURE__ */ x.jsx(
      WR,
      {
        scope: i,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ x.jsx(tm.Slot, { scope: i, children: /* @__PURE__ */ x.jsx(
          Dn.div,
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
), kh = "AccordionItem", [ew, lm] = yu(kh), tw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Cl(function(o, r) {
    const { __scopeAccordion: i, value: c, ...f } = o, d = vu(kh, i), m = QR(kh, i), g = nm(i), h = gu(), y = c && m.value.includes(c) || !1, S = d.disabled || o.disabled;
    return /* @__PURE__ */ x.jsx(
      ew,
      {
        scope: i,
        open: y,
        disabled: S,
        triggerId: h,
        children: /* @__PURE__ */ x.jsx(
          X0,
          {
            "data-orientation": d.orientation,
            "data-state": om(y),
            ...g,
            ...f,
            ref: r,
            disabled: S,
            open: y,
            onOpenChange: (v) => {
              v ? m.onItemOpen(c) : m.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), nw = "AccordionHeader", lw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cl(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = vu(xo, i), d = lm(nw, i);
    return /* @__PURE__ */ x.jsx(
      Dn.h3,
      {
        "data-orientation": f.orientation,
        "data-state": om(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), Yy = "AccordionTrigger", ow = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cl(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = vu(xo, i), d = lm(Yy, i), m = ZR(Yy, i), g = nm(i);
    return /* @__PURE__ */ x.jsx(tm.ItemSlot, { scope: i, children: /* @__PURE__ */ x.jsx(
      HR,
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
), aw = "AccordionContent", rw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cl(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = vu(xo, i), d = lm(aw, i), m = nm(i);
    return /* @__PURE__ */ x.jsx(
      UR,
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
function om(n) {
  return n ? "open" : "closed";
}
Cl(om, "getState");
var iw = KR, sw = tw, cw = lw, uw = ow, fw = rw, dw = Object.defineProperty, hw = (n, o) => dw(n, "name", { value: o, configurable: !0 });
function Z0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
hw(Z0, "useCallbackRef");
var mw = Object.defineProperty, pw = (n, o) => mw(n, "name", { value: o, configurable: !0 });
function $0(n) {
  const [o, r] = b.useState(void 0);
  return Ia(() => {
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
pw($0, "useSize");
const pi = Math.min, Qo = Math.max, ou = Math.round, dr = Math.floor, Zo = (n) => ({
  x: n,
  y: n
}), gw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function J0(n, o, r) {
  return Qo(n, pi(o, r));
}
function Ha(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function Fl(n) {
  return n.split("-")[0];
}
function Xa(n) {
  return n.split("-")[1];
}
function am(n) {
  return n === "x" ? "y" : "x";
}
function rm(n) {
  return n === "y" ? "height" : "width";
}
function Pl(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function im(n) {
  return am(Pl(n));
}
function bw(n, o, r) {
  r === void 0 && (r = !1);
  const i = Xa(n), c = im(n), f = rm(c);
  let d = c === "x" ? i === (r ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = au(d)), [d, au(d)];
}
function yw(n) {
  const o = au(n);
  return [Nh(n), o, Nh(o)];
}
function Nh(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const qy = ["left", "right"], Py = ["right", "left"], vw = ["top", "bottom"], xw = ["bottom", "top"];
function Sw(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? Py : qy : o ? qy : Py;
    case "left":
    case "right":
      return o ? vw : xw;
    default:
      return [];
  }
}
function Ew(n, o, r, i) {
  const c = Xa(n);
  let f = Sw(Fl(n), r === "start", i);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(Nh)))), f;
}
function au(n) {
  const o = Fl(n);
  return gw[o] + n.slice(o.length);
}
function Cw(n) {
  var o, r, i, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (i = n.bottom) != null ? i : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function W0(n) {
  return typeof n != "number" ? Cw(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function ru(n) {
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
function Xy(n, o, r) {
  let {
    reference: i,
    floating: c
  } = n;
  const f = Pl(o), d = im(o), m = rm(d), g = Fl(o), h = f === "y", y = i.x + i.width / 2 - c.width / 2, S = i.y + i.height / 2 - c.height / 2, v = i[m] / 2 - c[m] / 2;
  let C;
  switch (g) {
    case "top":
      C = {
        x: y,
        y: i.y - c.height
      };
      break;
    case "bottom":
      C = {
        x: y,
        y: i.y + i.height
      };
      break;
    case "right":
      C = {
        x: i.x + i.width,
        y: S
      };
      break;
    case "left":
      C = {
        x: i.x - c.width,
        y: S
      };
      break;
    default:
      C = {
        x: i.x,
        y: i.y
      };
  }
  const _ = Xa(o);
  return _ && (C[d] += v * (_ === "end" ? 1 : -1) * (r && h ? -1 : 1)), C;
}
async function _w(n, o) {
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
    elementContext: S = "floating",
    altBoundary: v = !1,
    padding: C = 0
  } = Ha(o, n), _ = W0(C), R = m[v ? S === "floating" ? "reference" : "floating" : S], w = ru(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(R))) == null || r ? R : R.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: h,
    rootBoundary: y,
    strategy: g
  })), O = S === "floating" ? {
    x: i,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, k = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), D = await (f.isElement == null ? void 0 : f.isElement(k)) && await (f.getScale == null ? void 0 : f.getScale(k)) || {
    x: 1,
    y: 1
  }, L = ru(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: O,
    offsetParent: k,
    strategy: g
  }) : O);
  return {
    top: (w.top - L.top + _.top) / D.y,
    bottom: (L.bottom - w.bottom + _.bottom) / D.y,
    left: (w.left - L.left + _.left) / D.x,
    right: (L.right - w.right + _.right) / D.x
  };
}
const Rw = 50, ww = async (n, o, r) => {
  const {
    placement: i = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, m = d.detectOverflow ? d : {
    ...d,
    detectOverflow: _w
  }, g = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let h = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: y,
    y: S
  } = Xy(h, i, g), v = i, C = 0;
  const _ = {};
  for (let A = 0; A < f.length; A++) {
    const R = f[A];
    if (!R)
      continue;
    const {
      name: w,
      fn: O
    } = R, {
      x: k,
      y: D,
      data: L,
      reset: I
    } = await O({
      x: y,
      y: S,
      initialPlacement: i,
      placement: v,
      strategy: c,
      middlewareData: _,
      rects: h,
      platform: m,
      elements: {
        reference: n,
        floating: o
      }
    });
    y = k ?? y, S = D ?? S, _[w] = {
      ..._[w],
      ...L
    }, I && C < Rw && (C++, typeof I == "object" && (I.placement && (v = I.placement), I.rects && (h = I.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : I.rects), {
      x: y,
      y: S
    } = Xy(h, v, g)), A = -1);
  }
  return {
    x: y,
    y: S,
    placement: v,
    strategy: c,
    middlewareData: _
  };
}, Mw = function(n) {
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
        crossAxis: S = !0,
        fallbackPlacements: v,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: A = !0,
        ...R
      } = Ha(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const w = Fl(c), O = Pl(m), k = Fl(m) === m, D = await (g.isRTL == null ? void 0 : g.isRTL(h.floating)), L = v || (k || !A ? [au(m)] : yw(m)), I = _ !== "none";
      !v && I && L.push(...Ew(m, A, _, D));
      const B = [m, ...L], V = await g.detectOverflow(o, R), P = [];
      let ee = ((i = f.flip) == null ? void 0 : i.overflows) || [];
      if (y && P.push(V[w]), S) {
        const me = bw(c, d, D);
        P.push(V[me[0]], V[me[1]]);
      }
      if (ee = [...ee, {
        placement: c,
        overflows: P
      }], !P.every((me) => me <= 0)) {
        var se, fe;
        const me = (((se = f.flip) == null ? void 0 : se.index) || 0) + 1, be = B[me];
        if (be && (!(S === "alignment" ? O !== Pl(be) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ee.every((K) => Pl(K.placement) === O ? K.overflows[0] > 0 : !0)))
          return {
            data: {
              index: me,
              overflows: ee
            },
            reset: {
              placement: be
            }
          };
        let U = (fe = ee.filter((G) => G.overflows[0] <= 0).sort((G, K) => G.overflows[1] - K.overflows[1])[0]) == null ? void 0 : fe.placement;
        if (!U)
          switch (C) {
            case "bestFit": {
              var le;
              const G = (le = ee.filter((K) => {
                if (I) {
                  const ve = Pl(K.placement);
                  return ve === O || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ve === "y";
                }
                return !0;
              }).map((K) => [K.placement, K.overflows.filter((ve) => ve > 0).reduce((ve, ie) => ve + ie, 0)]).sort((K, ve) => K[1] - ve[1])[0]) == null ? void 0 : le[0];
              G && (U = G);
              break;
            }
            case "initialPlacement":
              U = m;
              break;
          }
        if (c !== U)
          return {
            reset: {
              placement: U
            }
          };
      }
      return {};
    }
  };
}, ex = /* @__PURE__ */ new Set(["left", "top"]);
async function Aw(n, o) {
  const {
    placement: r,
    platform: i,
    elements: c
  } = n, f = await (i.isRTL == null ? void 0 : i.isRTL(c.floating)), d = Fl(r), m = Xa(r), g = Pl(r) === "y", h = ex.has(d) ? -1 : 1, y = f && g ? -1 : 1, S = Ha(o, n);
  let {
    mainAxis: v,
    crossAxis: C,
    alignmentAxis: _
  } = typeof S == "number" ? {
    mainAxis: S,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: S.mainAxis || 0,
    crossAxis: S.crossAxis || 0,
    alignmentAxis: S.alignmentAxis
  };
  return m && typeof _ == "number" && (C = m === "end" ? _ * -1 : _), g ? {
    x: C * y,
    y: v * h
  } : {
    x: v * h,
    y: C * y
  };
}
const Tw = function(n) {
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
      } = o, g = await Aw(o, n);
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
}, Ow = function(n) {
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
          fn: (O) => {
            let {
              x: k,
              y: D
            } = O;
            return {
              x: k,
              y: D
            };
          }
        },
        ...h
      } = Ha(n, o), y = {
        x: r,
        y: i
      }, S = await f.detectOverflow(o, h), v = Pl(c), C = am(v);
      let _ = y[C], A = y[v];
      const R = (O, k) => J0(k + S[O === "y" ? "top" : "left"], k, k - S[O === "y" ? "bottom" : "right"]);
      d && (_ = R(C, _)), m && (A = R(v, A));
      const w = g.fn({
        ...o,
        [C]: _,
        [v]: A
      });
      return {
        ...w,
        data: {
          x: w.x - r,
          y: w.y - i,
          enabled: {
            [C]: d,
            [v]: m
          }
        }
      };
    }
  };
}, kw = function(n) {
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
        crossAxis: S = !0
      } = Ha(n, o), v = {
        x: c,
        y: f
      }, C = Pl(d), _ = am(C);
      let A = v[_], R = v[C];
      const w = Ha(h, o), O = typeof w == "number" ? {
        mainAxis: w,
        crossAxis: 0
      } : {
        mainAxis: (r = w.mainAxis) != null ? r : 0,
        crossAxis: (i = w.crossAxis) != null ? i : 0
      };
      if (y) {
        const L = _ === "y" ? "height" : "width", I = m.reference[_] - m.floating[L] + O.mainAxis, B = m.reference[_] + m.reference[L] - O.mainAxis;
        A < I ? A = I : A > B && (A = B);
      }
      if (S) {
        var k, D;
        const L = _ === "y" ? "width" : "height", I = ex.has(Fl(d)), B = m.reference[C] - m.floating[L] + (I && ((k = g.offset) == null ? void 0 : k[C]) || 0) + (I ? 0 : O.crossAxis), V = m.reference[C] + m.reference[L] + (I ? 0 : ((D = g.offset) == null ? void 0 : D[C]) || 0) - (I ? O.crossAxis : 0);
        R < B ? R = B : R > V && (R = V);
      }
      return {
        [_]: A,
        [C]: R
      };
    }
  };
}, Nw = function(n) {
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
      } = Ha(n, o), g = await c.detectOverflow(o, m), h = Fl(r), y = Xa(r), S = Pl(r) === "y", {
        width: v,
        height: C
      } = i.floating;
      let _, A;
      h === "top" || h === "bottom" ? (_ = h, A = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (A = h, _ = y === "end" ? "top" : "bottom");
      const R = C - g.top - g.bottom, w = v - g.left - g.right, O = pi(C - g[_], R), k = pi(v - g[A], w), D = o.middlewareData.shift, L = !D;
      let I = O, B = k;
      D != null && D.enabled.x && (B = w), D != null && D.enabled.y && (I = R), L && !y && (S ? B = v - 2 * Qo(g.left, g.right) : I = C - 2 * Qo(g.top, g.bottom)), await d({
        ...o,
        availableWidth: B,
        availableHeight: I
      });
      const V = await c.getDimensions(f.floating);
      return v !== V.width || C !== V.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function xu() {
  return typeof window < "u";
}
function jn(n) {
  return sm(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function dn(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function Wo(n) {
  var o;
  return (o = (sm(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function sm(n) {
  return xu() ? n instanceof Node || n instanceof dn(n).Node : !1;
}
function fn(n) {
  return xu() ? n instanceof Element || n instanceof dn(n).Element : !1;
}
function Kt(n) {
  return xu() ? n instanceof HTMLElement || n instanceof dn(n).HTMLElement : !1;
}
function gi(n) {
  return !xu() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof dn(n).ShadowRoot;
}
function Ms(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: i,
    display: c
  } = ul(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + i + r) && c !== "inline" && c !== "contents";
}
function zw(n) {
  return /^(table|td|th)$/.test(jn(n));
}
function Su(n) {
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
const Dw = /transform|translate|scale|rotate|perspective|filter/, jw = /paint|layout|strict|content/, fr = (n) => !!n && n !== "none";
let Xd;
function cm(n) {
  const o = fn(n) ? ul(n) : n;
  return fr(o.transform) || fr(o.translate) || fr(o.scale) || fr(o.rotate) || fr(o.perspective) || !um() && (fr(o.backdropFilter) || fr(o.filter)) || Dw.test(o.willChange || "") || jw.test(o.contain || "");
}
function Lw(n) {
  let o = Ua(n);
  for (; Kt(o) && !Va(o); ) {
    if (cm(o))
      return o;
    if (Su(o))
      return null;
    o = Ua(o);
  }
  return null;
}
function um() {
  return Xd == null && (Xd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Xd;
}
function Va(n) {
  return /^(html|body|#document)$/.test(jn(n));
}
function ul(n) {
  return dn(n).getComputedStyle(n);
}
function Eu(n) {
  return fn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Ua(n) {
  if (jn(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    gi(n) && n.host || // Fallback.
    Wo(n)
  );
  return gi(o) ? o.host : o;
}
function tx(n) {
  const o = Ua(n);
  return Va(o) ? (n.ownerDocument || n).body : Kt(o) && Ms(o) ? o : tx(o);
}
function bi(n, o, r) {
  var i;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = tx(n), f = c === ((i = n.ownerDocument) == null ? void 0 : i.body), d = dn(c);
  if (f) {
    const m = zh(d);
    return o.concat(d, d.visualViewport || [], Ms(c) ? c : [], m && r ? bi(m) : []);
  } else
    return o.concat(c, bi(c, [], r));
}
function zh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function nx(n) {
  const o = ul(n);
  let r = parseFloat(o.width) || 0, i = parseFloat(o.height) || 0;
  const c = Kt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : i, m = ou(r) !== f || ou(i) !== d;
  return m && (r = f, i = d), {
    width: r,
    height: i,
    $: m
  };
}
function fm(n) {
  return fn(n) ? n : n.contextElement;
}
function di(n) {
  const o = fm(n);
  if (!Kt(o))
    return Zo(1);
  const r = o.getBoundingClientRect(), {
    width: i,
    height: c,
    $: f
  } = nx(o);
  let d = (f ? ou(r.width) : r.width) / i, m = (f ? ou(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const Vw = /* @__PURE__ */ Zo(0);
function lx(n) {
  const o = dn(n);
  return !um() || !o.visualViewport ? Vw : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function Iw(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === dn(n);
}
function gr(n, o, r, i) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = fm(n);
  let d = Zo(1);
  o && (i ? fn(i) && (d = di(i)) : d = di(n));
  const m = Iw(f, r, i) ? lx(f) : Zo(0);
  let g = (c.left + m.x) / d.x, h = (c.top + m.y) / d.y, y = c.width / d.x, S = c.height / d.y;
  if (f && i) {
    const v = dn(f), C = fn(i) ? dn(i) : i;
    let _ = v, A = zh(_);
    for (; A && C !== _; ) {
      const R = di(A), w = A.getBoundingClientRect(), O = ul(A), k = w.left + (A.clientLeft + parseFloat(O.paddingLeft)) * R.x, D = w.top + (A.clientTop + parseFloat(O.paddingTop)) * R.y;
      g *= R.x, h *= R.y, y *= R.x, S *= R.y, g += k, h += D, _ = dn(A), A = zh(_);
    }
  }
  return ru({
    width: y,
    height: S,
    x: g,
    y: h
  });
}
function Cu(n, o) {
  const r = Eu(n).scrollLeft;
  return o ? o.left + r : gr(Wo(n)).left + r;
}
function ox(n, o) {
  const r = n.getBoundingClientRect(), i = r.left + o.scrollLeft - Cu(n, r), c = r.top + o.scrollTop;
  return {
    x: i,
    y: c
  };
}
function Hw(n) {
  let {
    elements: o,
    rect: r,
    offsetParent: i,
    strategy: c
  } = n;
  const f = c === "fixed", d = Wo(i), m = o ? Su(o.floating) : !1;
  if (i === d || m && f)
    return r;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Zo(1);
  const y = Zo(0), S = Kt(i);
  if ((S || !f) && ((jn(i) !== "body" || Ms(d)) && (g = Eu(i)), S)) {
    const C = gr(i);
    h = di(i), y.x = C.x + i.clientLeft, y.y = C.y + i.clientTop;
  }
  const v = d && !S && !f ? ox(d, g) : Zo(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - g.scrollLeft * h.x + y.x + v.x,
    y: r.y * h.y - g.scrollTop * h.y + y.y + v.y
  };
}
function Uw(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function Bw(n) {
  const o = Eu(n), r = n.ownerDocument.body, i = Qo(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = Qo(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + Cu(n);
  const d = -o.scrollTop;
  return ul(r).direction === "rtl" && (f += Qo(n.clientWidth, r.clientWidth) - i), {
    width: i,
    height: c,
    x: f,
    y: d
  };
}
const Gw = 25;
function Yw(n, o, r) {
  r === void 0 && (r = "viewport");
  const i = r === "layoutViewport", c = dn(n), f = Wo(n), d = c.visualViewport;
  let m = f.clientWidth, g = f.clientHeight, h = 0, y = 0;
  if (d) {
    const v = !um() || o === "fixed";
    i ? v || (h = -d.offsetLeft, y = -d.offsetTop) : (m = d.width, g = d.height, v && (h = d.offsetLeft, y = d.offsetTop));
  }
  if (Cu(f) <= 0) {
    const v = f.ownerDocument, C = v.body, _ = getComputedStyle(C), A = v.compatMode === "CSS1Compat" && parseFloat(_.marginLeft) + parseFloat(_.marginRight) || 0, R = Math.abs(f.clientWidth - C.clientWidth - A), w = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? R / 2 : R;
    w <= Gw && (m -= w);
  }
  return {
    width: m,
    height: g,
    x: h,
    y
  };
}
function qw(n, o) {
  const r = gr(n, !0, o === "fixed"), i = r.top + n.clientTop, c = r.left + n.clientLeft, f = di(n), d = n.clientWidth * f.x, m = n.clientHeight * f.y, g = c * f.x, h = i * f.y;
  return {
    width: d,
    height: m,
    x: g,
    y: h
  };
}
function Fy(n, o, r) {
  let i;
  if (o === "viewport" || o === "layoutViewport")
    i = Yw(n, r, o);
  else if (o === "document")
    i = Bw(Wo(n));
  else if (fn(o))
    i = qw(o, r);
  else {
    const c = lx(n);
    i = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return ru(i);
}
function Pw(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let i = bi(n, [], !1).filter((m) => fn(m) && jn(m) !== "body"), c = null;
  const f = ul(n).position === "fixed";
  let d = f ? Ua(n) : n;
  for (; fn(d) && !Va(d); ) {
    const m = ul(d), g = cm(d), h = c ? c.position : f ? "fixed" : "";
    !g && (h === "fixed" || h === "absolute" && m.position === "static") ? i = i.filter((S) => S !== d) : c = m, d = Ua(d);
  }
  return o.set(n, i), i;
}
function Xw(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: i,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? Su(o) ? [] : Pw(o, this._c) : [].concat(r), i], m = Fy(o, d[0], c);
  let g = m.top, h = m.right, y = m.bottom, S = m.left;
  for (let v = 1; v < d.length; v++) {
    const C = Fy(o, d[v], c);
    g = Qo(C.top, g), h = pi(C.right, h), y = pi(C.bottom, y), S = Qo(C.left, S);
  }
  return {
    width: h - S,
    height: y - g,
    x: S,
    y: g
  };
}
function Fw(n) {
  const {
    width: o,
    height: r
  } = nx(n);
  return {
    width: o,
    height: r
  };
}
function Kw(n, o, r) {
  const i = Kt(o), c = Wo(o), f = r === "fixed", d = gr(n, !0, f, o);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = Zo(0);
  if ((i || !f) && ((jn(o) !== "body" || Ms(c)) && (m = Eu(o)), i)) {
    const v = gr(o, !0, f, o);
    g.x = v.x + o.clientLeft, g.y = v.y + o.clientTop;
  }
  !i && c && (g.x = Cu(c));
  const h = c && !i && !f ? ox(c, m) : Zo(0), y = d.left + m.scrollLeft - g.x - h.x, S = d.top + m.scrollTop - g.y - h.y;
  return {
    x: y,
    y: S,
    width: d.width,
    height: d.height
  };
}
function Fd(n) {
  return ul(n).position === "static";
}
function Ky(n, o) {
  if (!Kt(n) || ul(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Wo(n) === r && (r = r.ownerDocument.body), r;
}
function ax(n, o) {
  const r = dn(n);
  if (Su(n))
    return r;
  if (!Kt(n)) {
    let c = Ua(n);
    for (; c && !Va(c); ) {
      if (fn(c) && !Fd(c))
        return c;
      c = Ua(c);
    }
    return r;
  }
  let i = Ky(n, o);
  for (; i && zw(i) && Fd(i); )
    i = Ky(i, o);
  return i && Va(i) && Fd(i) && !cm(i) ? r : i || Lw(n) || r;
}
const Qw = async function(n) {
  const o = this.getOffsetParent || ax, r = this.getDimensions, i = await r(n.floating);
  return {
    reference: Kw(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function Zw(n) {
  return ul(n).direction === "rtl";
}
const $w = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Hw,
  getDocumentElement: Wo,
  getClippingRect: Xw,
  getOffsetParent: ax,
  getElementRects: Qw,
  getClientRects: Uw,
  getDimensions: Fw,
  getScale: di,
  isElement: fn,
  isRTL: Zw
};
function rx(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function Jw(n, o, r) {
  let i = null, c;
  const f = Wo(n);
  function d() {
    var y;
    clearTimeout(c), (y = i) == null || y.disconnect(), i = null;
  }
  function m(y, S) {
    y === void 0 && (y = !1), S === void 0 && (S = 1), d();
    const v = n.getBoundingClientRect(), {
      left: C,
      top: _,
      width: A,
      height: R
    } = v;
    if (y || o(), !A || !R)
      return;
    const w = dr(_), O = dr(f.clientWidth - (C + A)), k = dr(f.clientHeight - (_ + R)), D = dr(C), I = {
      rootMargin: -w + "px " + -O + "px " + -k + "px " + -D + "px",
      threshold: Qo(0, pi(1, S)) || 1
    };
    let B = !0;
    function V(P) {
      const ee = P[0].intersectionRatio;
      if (!rx(v, n.getBoundingClientRect()))
        return m();
      if (ee !== S) {
        if (!B)
          return m();
        ee ? m(!1, ee) : c = setTimeout(() => {
          m(!1, 1e-7);
        }, 1e3);
      }
      B = !1;
    }
    try {
      i = new IntersectionObserver(V, {
        ...I,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(V, I);
    }
    i.observe(n);
  }
  const g = dn(n), h = () => m(r);
  return g.addEventListener("resize", h), m(!0), () => {
    g.removeEventListener("resize", h), d();
  };
}
function Qy(n, o, r, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = i, h = fm(n), y = c || f ? [...h ? bi(h) : [], ...o ? bi(o) : []] : [];
  y.forEach((w) => {
    c && w.addEventListener("scroll", r), f && w.addEventListener("resize", r);
  });
  const S = h && m ? Jw(h, r, f) : null;
  let v = -1, C = null;
  d && (C = new ResizeObserver((w) => {
    let [O] = w;
    O && O.target === h && C && o && (C.unobserve(o), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var k;
      (k = C) == null || k.observe(o);
    })), r();
  }), h && !g && C.observe(h), o && C.observe(o));
  let _, A = g ? gr(n) : null;
  g && R();
  function R() {
    const w = gr(n);
    A && !rx(A, w) && r(), A = w, _ = requestAnimationFrame(R);
  }
  return r(), () => {
    var w;
    y.forEach((O) => {
      c && O.removeEventListener("scroll", r), f && O.removeEventListener("resize", r);
    }), S?.(), (w = C) == null || w.disconnect(), C = null, g && cancelAnimationFrame(_);
  };
}
const Ww = Tw, e2 = Ow, t2 = Mw, n2 = Nw, l2 = kw, o2 = (n, o, r) => {
  const i = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...$w,
    ...c.platform,
    _c: i
  };
  return ww(n, o, {
    ...c,
    platform: f
  });
};
var a2 = typeof document < "u", r2 = function() {
}, Jc = a2 ? b.useLayoutEffect : r2;
function iu(n, o) {
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
        if (!iu(n[i], o[i]))
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
      if (!(f === "_owner" && n.$$typeof) && !iu(n[f], o[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function ix(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Zy(n, o) {
  const r = ix(n);
  return Math.round(o * r) / r;
}
function Kd(n) {
  const o = b.useRef(n);
  return Jc(() => {
    o.current = n;
  }), o;
}
function i2(n) {
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
  } = n, [y, S] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [v, C] = b.useState(i);
  iu(v, i) || C(i);
  const [_, A] = b.useState(null), [R, w] = b.useState(null), O = b.useCallback((K) => {
    K !== I.current && (I.current = K, A(K));
  }, []), k = b.useCallback((K) => {
    K !== B.current && (B.current = K, w(K));
  }, []), D = f || _, L = d || R, I = b.useRef(null), B = b.useRef(null), V = b.useRef(y), P = g != null, ee = Kd(g), se = Kd(c), fe = Kd(h), le = b.useCallback(() => {
    if (!I.current || !B.current)
      return;
    const K = {
      placement: o,
      strategy: r,
      middleware: v
    };
    se.current && (K.platform = se.current), o2(I.current, B.current, K).then((ve) => {
      const ie = {
        ...ve,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: fe.current !== !1
      };
      me.current && !iu(V.current, ie) && (V.current = ie, yi.flushSync(() => {
        S(ie);
      }));
    });
  }, [v, o, r, se, fe]);
  Jc(() => {
    h === !1 && V.current.isPositioned && (V.current.isPositioned = !1, S((K) => ({
      ...K,
      isPositioned: !1
    })));
  }, [h]);
  const me = b.useRef(!1);
  Jc(() => (me.current = !0, () => {
    me.current = !1;
  }), []), Jc(() => {
    if (D && (I.current = D), L && (B.current = L), D && L) {
      if (ee.current)
        return ee.current(D, L, le);
      le();
    }
  }, [D, L, le, ee, P]);
  const be = b.useMemo(() => ({
    reference: I,
    floating: B,
    setReference: O,
    setFloating: k
  }), [O, k]), U = b.useMemo(() => ({
    reference: D,
    floating: L
  }), [D, L]), G = b.useMemo(() => {
    const K = {
      position: r,
      left: 0,
      top: 0
    };
    if (!U.floating)
      return K;
    const ve = Zy(U.floating, y.x), ie = Zy(U.floating, y.y);
    return m ? {
      ...K,
      transform: "translate(" + ve + "px, " + ie + "px)",
      ...ix(U.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: ve,
      top: ie
    };
  }, [r, m, U.floating, y.x, y.y]);
  return b.useMemo(() => ({
    ...y,
    update: le,
    refs: be,
    elements: U,
    floatingStyles: G
  }), [y, le, be, U, G]);
}
const s2 = (n, o) => {
  const r = Ww(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, c2 = (n, o) => {
  const r = e2(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, u2 = (n, o) => ({
  fn: l2(n).fn,
  options: [n, o]
}), f2 = (n, o) => {
  const r = t2(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, d2 = (n, o) => {
  const r = n2(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var h2 = Object.defineProperty, dm = (n, o) => h2(n, "name", { value: o, configurable: !0 }), Qd = !1;
function sx() {
  const [n, o] = b.useState(Qd);
  return b.useEffect(() => {
    Qd || (Qd = !0, o(!0));
  }, []), n;
}
dm(sx, "useIsHydrated");
var cx = Er[" useSyncExternalStore ".trim().toString()];
function ux() {
  return () => {
  };
}
dm(ux, "subscribe");
function fx() {
  return cx(
    ux,
    () => !0,
    () => !1
  );
}
dm(fx, "useIsHydratedModern");
var m2 = typeof cx == "function" ? fx : sx, p2 = Object.defineProperty, _r = (n, o) => p2(n, "name", { value: o, configurable: !0 }), Zd = "rovingFocusGroup.onEntryFocus", g2 = { bubbles: !1, cancelable: !0 }, _u = "RovingFocusGroup", [Dh, dx, b2] = /* @__PURE__ */ pu(_u), [y2, hx] = /* @__PURE__ */ Pa(
  _u,
  [b2]
), [v2, x2] = y2(_u), S2 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ _r(function(o, r) {
    return /* @__PURE__ */ x.jsx(Dh.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ x.jsx(Dh.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ x.jsx(E2, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), E2 = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ _r(function(o, r) {
  const {
    __scopeRovingFocusGroup: i,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: m,
    defaultCurrentTabStopId: g,
    onCurrentTabStopIdChange: h,
    onEntryFocus: y,
    preventScrollOnEntryFocus: S = !1,
    ...v
  } = o, C = b.useRef(null), _ = qn(r, C), A = ws(d), [R, w] = Jo({
    prop: m,
    defaultProp: g ?? null,
    onChange: h,
    caller: _u
  }), [O, k] = b.useState(!1), D = Z0(y), L = dx(i), I = b.useRef(!1), [B, V] = b.useState(0);
  return b.useEffect(() => {
    const P = C.current;
    if (P)
      return P.addEventListener(Zd, D), () => P.removeEventListener(Zd, D);
  }, [D]), /* @__PURE__ */ x.jsx(
    v2,
    {
      scope: i,
      orientation: c,
      dir: A,
      loop: f,
      currentTabStopId: R,
      onItemFocus: b.useCallback(
        (P) => w(P),
        [w]
      ),
      onItemShiftTab: b.useCallback(() => k(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => V((P) => P + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => V((P) => P - 1),
        []
      ),
      children: /* @__PURE__ */ x.jsx(
        Dn.div,
        {
          tabIndex: O || B === 0 ? -1 : 0,
          "data-orientation": c,
          ...v,
          ref: _,
          style: { outline: "none", ...o.style },
          onMouseDown: Yn(o.onMouseDown, () => {
            I.current = !0;
          }),
          onFocus: Yn(o.onFocus, (P) => {
            const ee = !I.current;
            if (P.target === P.currentTarget && ee && !O) {
              const se = new CustomEvent(Zd, g2);
              if (P.currentTarget.dispatchEvent(se), !se.defaultPrevented) {
                const fe = L().filter((G) => G.focusable), le = fe.find((G) => G.active), me = fe.find((G) => G.id === R), U = [le, me, ...fe].filter(
                  Boolean
                ).map((G) => G.ref.current);
                hm(U, S);
              }
            }
            I.current = !1;
          }),
          onBlur: Yn(o.onBlur, () => k(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), C2 = "RovingFocusGroupItem", _2 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ _r(function(o, r) {
    const {
      __scopeRovingFocusGroup: i,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: m,
      ...g
    } = o, h = gu(), y = d || h, S = x2(C2, i), v = S.currentTabStopId === y, C = dx(i), { onFocusableItemAdd: _, onFocusableItemRemove: A, currentTabStopId: R } = S, w = m2();
    return Ia(() => {
      if (!(!w || !c))
        return _(), () => A();
    }, [w, c, _, A]), b.useEffect(() => {
      if (!(w || !c))
        return _(), () => A();
    }, [w, c, _, A]), /* @__PURE__ */ x.jsx(
      Dh.ItemSlot,
      {
        scope: i,
        id: y,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ x.jsx(
          Dn.span,
          {
            tabIndex: v ? 0 : -1,
            "data-orientation": S.orientation,
            ...g,
            ref: r,
            onMouseDown: Yn(o.onMouseDown, (O) => {
              c ? S.onItemFocus(y) : O.preventDefault();
            }),
            onFocus: Yn(o.onFocus, () => S.onItemFocus(y)),
            onKeyDown: Yn(o.onKeyDown, (O) => {
              if (O.key === "Tab" && O.shiftKey) {
                S.onItemShiftTab();
                return;
              }
              if (O.target !== O.currentTarget) return;
              const k = px(O, S.orientation, S.dir);
              if (k !== void 0) {
                if (O.metaKey || O.ctrlKey || O.altKey || O.shiftKey) return;
                O.preventDefault();
                let L = C().filter((I) => I.focusable).map((I) => I.ref.current);
                if (k === "last") L.reverse();
                else if (k === "prev" || k === "next") {
                  k === "prev" && L.reverse();
                  const I = L.indexOf(O.currentTarget);
                  L = S.loop ? gx(L, I + 1) : L.slice(I + 1);
                }
                setTimeout(() => hm(L));
              }
            }),
            children: typeof m == "function" ? m({ isCurrentTabStop: v, hasTabStop: R != null }) : m
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), R2 = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function mx(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
_r(mx, "getDirectionAwareKey");
function px(n, o, r) {
  const i = mx(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(i)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(i)))
    return R2[i];
}
_r(px, "getFocusIntent");
function hm(n, o = !1) {
  const r = document.activeElement;
  for (const i of n)
    if (i === r || (i.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
_r(hm, "focusFirst");
function gx(n, o) {
  return n.map((r, i) => n[(o + i) % n.length]);
}
_r(gx, "wrapArray");
var w2 = S2, M2 = _2, A2 = Object.defineProperty, T2 = (n, o) => A2(n, "name", { value: o, configurable: !0 }), O2 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ T2(function(o, r) {
    return /* @__PURE__ */ x.jsx(
      Dn.label,
      {
        ...o,
        ref: r,
        onMouseDown: (i) => {
          i.target.closest("button, input, select, textarea") || (o.onMouseDown?.(i), !i.defaultPrevented && i.detail > 1 && i.preventDefault());
        }
      }
    );
  }, "Label")
), k2 = O2, N2 = Object.defineProperty, z2 = (n, o) => N2(n, "name", { value: o, configurable: !0 });
function bx(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
z2(bx, "usePrevious");
var D2 = Object.defineProperty, j2 = (n, o) => D2(n, "name", { value: o, configurable: !0 });
function mm(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
j2(mm, "clamp");
var L2 = Object.defineProperty, yx = (n, o) => L2(n, "name", { value: o, configurable: !0 }), $y = "horizontal", V2 = ["horizontal", "vertical"], I2 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ yx(function(o, r) {
    const { decorative: i, orientation: c = $y, ...f } = o, d = vx(c) ? c : $y, g = i ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
    return /* @__PURE__ */ x.jsx(
      Dn.div,
      {
        "data-orientation": d,
        ...g,
        ...f,
        ref: r
      }
    );
  }, "Separator")
);
function vx(n) {
  return V2.includes(n);
}
yx(vx, "isValidOrientation");
var H2 = I2, U2 = Object.defineProperty, wt = (n, o) => U2(n, "name", { value: o, configurable: !0 }), xx = ["PageUp", "PageDown"], Sx = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Ex = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, As = "Slider", [jh, B2, G2] = /* @__PURE__ */ pu(As), [pm, uN] = /* @__PURE__ */ Pa(As, [
  G2
]), [Y2, Ts] = pm(As), q2 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wt(function(o, r) {
    const {
      name: i,
      min: c = 0,
      max: f = 100,
      step: d = 1,
      orientation: m = "horizontal",
      disabled: g = !1,
      minStepsBetweenThumbs: h = 0,
      defaultValue: y = [c],
      value: S,
      onValueChange: v = /* @__PURE__ */ wt(() => {
      }, "onValueChange"),
      onValueCommit: C = /* @__PURE__ */ wt(() => {
      }, "onValueCommit"),
      inverted: _ = !1,
      form: A,
      ...R
    } = o, w = b.useRef(/* @__PURE__ */ new Set()), O = b.useRef(0), k = b.useRef(!1), L = m === "horizontal" ? P2 : X2, [I, B] = b.useState(null), V = qn(r, B), [P = [], ee] = Jo({
      prop: S,
      defaultProp: y,
      onChange: /* @__PURE__ */ wt((G) => {
        [...w.current][O.current]?.focus({
          preventScroll: !0,
          focusVisible: k.current
        }), k.current = !1, v(G);
      }, "onChange")
    }), se = b.useRef(P), fe = b.useRef(P);
    b.useEffect(() => {
      const G = A ? I?.ownerDocument.getElementById(A) : I?.closest("form");
      if (G instanceof HTMLFormElement) {
        const K = /* @__PURE__ */ wt(() => ee(fe.current), "reset");
        return G.addEventListener("reset", K), () => G.removeEventListener("reset", K);
      }
    }, [I, A, ee]);
    function le(G) {
      const K = Ox(P, G);
      U(G, K);
    }
    wt(le, "handleSlideStart");
    function me(G) {
      U(G, O.current);
    }
    wt(me, "handleSlideMove");
    function be() {
      String(P) !== String(se.current) && C(P);
    }
    wt(be, "handleSlideEnd");
    function U(G, K, { commit: ve } = { commit: !1 }) {
      const ie = bm(d), j = ms(Math.round((G - c) / d) * d + c, ie), F = mm(j, [c, f]);
      ee((te = []) => {
        const oe = Ax(te, F, K);
        if (zx(oe, h * d)) {
          O.current = oe.indexOf(F);
          const ge = String(oe) !== String(te);
          return ge && ve && C(oe), ge ? oe : te;
        } else
          return te;
      });
    }
    return wt(U, "updateValues"), /* @__PURE__ */ x.jsx(
      Y2,
      {
        scope: o.__scopeSlider,
        name: i,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: O,
        thumbs: w.current,
        values: P,
        orientation: m,
        form: A,
        children: /* @__PURE__ */ x.jsx(jh.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ x.jsx(jh.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ x.jsx(
          L,
          {
            "aria-disabled": g,
            "data-disabled": g ? "" : void 0,
            ...R,
            ref: V,
            onPointerDown: Yn(R.onPointerDown, () => {
              g || (se.current = P, k.current = !1);
            }),
            min: c,
            max: f,
            inverted: _,
            onSlideStart: g ? void 0 : le,
            onSlideMove: g ? void 0 : me,
            onSlideEnd: g ? void 0 : be,
            onHomeKeyDown: () => {
              g || (k.current = !0, U(c, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              g || (k.current = !0, U(f, P.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: G, direction: K }) => {
              if (!g) {
                k.current = !0;
                const j = xx.includes(G.key) || G.shiftKey && Sx.includes(G.key) ? 10 : 1, F = O.current, te = P[F], oe = Dx(te, {
                  min: c,
                  step: d,
                  direction: K,
                  multiplier: j
                });
                U(oe, F, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [Cx, _x] = pm(As, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), P2 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wt(function(o, r) {
    const {
      min: i,
      max: c,
      dir: f,
      inverted: d,
      onSlideStart: m,
      onSlideMove: g,
      onSlideEnd: h,
      onStepKeyDown: y,
      ...S
    } = o, [v, C] = b.useState(null), _ = qn(r, C), A = b.useRef(void 0), R = ws(f), w = R === "ltr", O = w && !d || !w && d;
    function k(D) {
      const L = A.current || v.getBoundingClientRect(), I = [0, L.width], V = Ru(I, O ? [i, c] : [c, i]);
      return A.current = L, V(D - L.left);
    }
    return wt(k, "getValueFromPointer"), /* @__PURE__ */ x.jsx(
      Cx,
      {
        scope: o.__scopeSlider,
        startEdge: O ? "left" : "right",
        endEdge: O ? "right" : "left",
        direction: O ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ x.jsx(
          Rx,
          {
            dir: R,
            "data-orientation": "horizontal",
            ...S,
            ref: _,
            style: {
              ...S.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (D) => {
              const L = k(D.clientX);
              m?.(L);
            },
            onSlideMove: (D) => {
              const L = k(D.clientX);
              g?.(L);
            },
            onSlideEnd: () => {
              A.current = void 0, h?.();
            },
            onStepKeyDown: (D) => {
              const I = Ex[O ? "from-left" : "from-right"].includes(D.key);
              y?.({ event: D, direction: I ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), X2 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ wt(function(o, r) {
    const {
      min: i,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: m,
      onSlideEnd: g,
      onStepKeyDown: h,
      ...y
    } = o, S = b.useRef(null), v = qn(r, S), C = b.useRef(void 0), _ = !f;
    function A(R) {
      const w = C.current || S.current.getBoundingClientRect(), O = [0, w.height], D = Ru(O, _ ? [c, i] : [i, c]);
      return C.current = w, D(R - w.top);
    }
    return wt(A, "getValueFromPointer"), /* @__PURE__ */ x.jsx(
      Cx,
      {
        scope: o.__scopeSlider,
        startEdge: _ ? "bottom" : "top",
        endEdge: _ ? "top" : "bottom",
        size: "height",
        direction: _ ? 1 : -1,
        children: /* @__PURE__ */ x.jsx(
          Rx,
          {
            "data-orientation": "vertical",
            ...y,
            ref: v,
            style: {
              ...y.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (R) => {
              const w = A(R.clientY);
              d?.(w);
            },
            onSlideMove: (R) => {
              const w = A(R.clientY);
              m?.(w);
            },
            onSlideEnd: () => {
              C.current = void 0, g?.();
            },
            onStepKeyDown: (R) => {
              const O = Ex[_ ? "from-bottom" : "from-top"].includes(R.key);
              h?.({ event: R, direction: O ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), Rx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ wt(function(o, r) {
    const {
      __scopeSlider: i,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: m,
      onEndKeyDown: g,
      onStepKeyDown: h,
      ...y
    } = o, S = Ts(As, i);
    return /* @__PURE__ */ x.jsx(
      Dn.span,
      {
        ...y,
        ref: r,
        onKeyDown: Yn(o.onKeyDown, (v) => {
          v.key === "Home" ? (m(v), v.preventDefault()) : v.key === "End" ? (g(v), v.preventDefault()) : xx.concat(Sx).includes(v.key) && (h(v), v.preventDefault());
        }),
        onPointerDown: Yn(o.onPointerDown, (v) => {
          const C = v.target;
          C.setPointerCapture(v.pointerId), v.preventDefault(), S.thumbs.has(C) ? C.focus({ preventScroll: !0, focusVisible: !1 }) : c(v);
        }),
        onPointerMove: Yn(o.onPointerMove, (v) => {
          v.target.hasPointerCapture(v.pointerId) && f(v);
        }),
        onPointerUp: Yn(o.onPointerUp, (v) => {
          const C = v.target;
          C.hasPointerCapture(v.pointerId) && (C.releasePointerCapture(v.pointerId), d(v));
        })
      }
    );
  }, "SliderImpl")
), F2 = "SliderTrack", K2 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ wt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = Ts(F2, i);
    return /* @__PURE__ */ x.jsx(
      Dn.span,
      {
        "data-disabled": f.disabled ? "" : void 0,
        "data-orientation": f.orientation,
        ...c,
        ref: r
      }
    );
  }, "SliderTrack")
), Jy = "SliderRange", Q2 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ wt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = Ts(Jy, i), d = _x(Jy, i), m = b.useRef(null), g = qn(r, m), h = f.values.length, y = f.values.map(
      (C) => gm(C, f.min, f.max)
    ), S = h > 1 ? Math.min(...y) : 0, v = 100 - Math.max(...y);
    return /* @__PURE__ */ x.jsx(
      Dn.span,
      {
        "data-orientation": f.orientation,
        "data-disabled": f.disabled ? "" : void 0,
        ...c,
        ref: g,
        style: {
          ...o.style,
          [d.startEdge]: S + "%",
          [d.endEdge]: v + "%"
        }
      }
    );
  }, "SliderRange")
), Z2 = "SliderThumb", [$2, wx] = pm(Z2), J2 = "SliderThumbProvider";
function Mx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: i,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = Ts(J2, o), d = B2(o), [m, g] = b.useState(null), h = b.useMemo(
    () => m ? d().findIndex((R) => R.ref.current === m) : -1,
    [d, m]
  ), y = $0(m), S = m ? !!f.form || !!m.closest("form") : !0, v = f.values[h], C = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), _ = v === void 0 ? 0 : gm(v, f.min, f.max);
  b.useEffect(() => {
    if (m)
      return f.thumbs.add(m), () => {
        f.thumbs.delete(m);
      };
  }, [m, f.thumbs]);
  const A = {
    value: v,
    name: C,
    form: f.form,
    isFormControl: S,
    index: h,
    thumb: m,
    onThumbChange: g,
    percent: _,
    size: y
  };
  return /* @__PURE__ */ x.jsx($2, { scope: o, ...A, children: jx(c) ? c(A) : i });
}
wt(Mx, "SliderThumbProvider");
var $d = "SliderThumbTrigger", W2 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = Ts($d, i), d = _x($d, i), { index: m, value: g, percent: h, size: y, onThumbChange: S } = wx(
      $d,
      i
    ), v = qn(r, S), C = Tx(m, f.values.length), _ = y?.[d.size], A = _ ? kx(_, h, d.direction) : 0;
    return /* @__PURE__ */ x.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${A}px)`
        },
        children: /* @__PURE__ */ x.jsx(jh.ItemSlot, { scope: i, children: /* @__PURE__ */ x.jsx(
          Dn.span,
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
            ref: v,
            style: g === void 0 ? { display: "none" } : o.style,
            onFocus: Yn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = m;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), eM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ wt(function(o, r) {
    const { __scopeSlider: i, name: c, ...f } = o;
    return /* @__PURE__ */ x.jsx(
      Mx,
      {
        __scopeSlider: i,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: m }) => /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
          /* @__PURE__ */ x.jsx(
            W2,
            {
              ...f,
              ref: r,
              __scopeSlider: i
            }
          ),
          m ? /* @__PURE__ */ x.jsx(
            nM,
            {
              __scopeSlider: i
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), tM = "SliderBubbleInput", nM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ wt(function({ __scopeSlider: o, ...r }, i) {
    const { value: c, name: f, form: d } = wx(tM, o), m = b.useRef(null), g = qn(m, i), h = bx(c);
    return b.useEffect(() => {
      const y = m.current;
      if (!y) return;
      const S = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(S, "value").set;
      if (h !== c && C) {
        const _ = new Event("input", { bubbles: !0 });
        C.call(y, c), y.dispatchEvent(_);
      }
    }, [h, c]), /* @__PURE__ */ x.jsx(
      Dn.input,
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
function Ax(n = [], o, r) {
  const i = [...n];
  return i[r] = o, i.sort((c, f) => c - f);
}
wt(Ax, "getNextSortedValues");
function gm(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return mm(f, [0, 100]);
}
wt(gm, "convertValueToPercentage");
function Tx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
wt(Tx, "getLabel");
function Ox(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), i = Math.min(...r);
  return r.indexOf(i);
}
wt(Ox, "getClosestValueIndex");
function kx(n, o, r) {
  const i = n / 2, f = Ru([0, 50], [0, i]);
  return (i - f(o) * r) * r;
}
wt(kx, "getThumbInBoundsOffset");
function Nx(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
wt(Nx, "getStepsBetweenValues");
function zx(n, o) {
  if (o > 0) {
    const r = Nx(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
wt(zx, "hasMinStepsBetweenValues");
function Ru(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const i = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + i * (r - n[0]);
  };
}
wt(Ru, "linearScale");
function bm(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [i, c] = o.split("e"), f = i.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
wt(bm, "getDecimalCount");
function ms(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
wt(ms, "roundValue");
function Dx(n, {
  min: o,
  step: r,
  direction: i,
  multiplier: c
}) {
  const f = bm(r), d = (n - o) / r, m = Math.round(d), g = ms(m * r + o, f) === ms(n, f);
  let h;
  return g ? h = m + c * i : i > 0 ? h = Math.ceil(d) : h = Math.floor(d), ms(h * r + o, f);
}
wt(Dx, "getNextStepValue");
function jx(n) {
  return typeof n == "function";
}
wt(jx, "isFunction");
var lM = Object.defineProperty, oM = (n, o) => lM(n, "name", { value: o, configurable: !0 }), aM = "Toggle", rM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ oM(function(o, r) {
    const { pressed: i, defaultPressed: c, onPressedChange: f, ...d } = o, [m, g] = Jo({
      prop: i,
      onChange: f,
      defaultProp: c ?? !1,
      caller: aM
    });
    return /* @__PURE__ */ x.jsx(
      Dn.button,
      {
        type: "button",
        "aria-pressed": m,
        "data-state": m ? "on" : "off",
        "data-disabled": o.disabled ? "" : void 0,
        ...d,
        ref: r,
        onClick: Yn(o.onClick, () => {
          o.disabled || g(!m);
        })
      }
    );
  }, "Toggle")
), iM = Object.defineProperty, Ba = (n, o) => iM(n, "name", { value: o, configurable: !0 }), xi = "ToggleGroup", [Lx, fN] = /* @__PURE__ */ Pa(xi, [
  hx
]), Vx = hx(), sM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ba(function(o, r) {
  const { type: i, ...c } = o;
  if (i === "single") {
    const f = c;
    return /* @__PURE__ */ x.jsx(cM, { role: "radiogroup", ...f, ref: r });
  }
  if (i === "multiple") {
    const f = c;
    return /* @__PURE__ */ x.jsx(uM, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${xi}\``);
}, "ToggleGroup")), [Ix, Hx] = Lx(xi), cM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ba(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ba(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Jo({
    prop: i,
    defaultProp: c ?? "",
    onChange: f,
    caller: xi
  });
  return /* @__PURE__ */ x.jsx(
    Ix,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => m ? [m] : [], [m]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ x.jsx(Ux, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), uM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ba(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ba(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Jo({
    prop: i,
    defaultProp: c ?? [],
    onChange: f,
    caller: xi
  }), h = b.useCallback(
    (S) => g((v = []) => [...v, S]),
    [g]
  ), y = b.useCallback(
    (S) => g((v = []) => v.filter((C) => C !== S)),
    [g]
  );
  return /* @__PURE__ */ x.jsx(
    Ix,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: h,
      onItemDeactivate: y,
      children: /* @__PURE__ */ x.jsx(Ux, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [fM, dM] = Lx(xi), Ux = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ba(function(o, r) {
    const {
      __scopeToggleGroup: i,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: m,
      loop: g = !0,
      ...h
    } = o, y = Vx(i), S = ws(m), v = { dir: S, ...h };
    return /* @__PURE__ */ x.jsx(fM, { scope: i, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ x.jsx(
      w2,
      {
        asChild: !0,
        ...y,
        orientation: d,
        dir: S,
        loop: g,
        children: /* @__PURE__ */ x.jsx(Dn.div, { ...v, ref: r })
      }
    ) : /* @__PURE__ */ x.jsx(Dn.div, { ...v, ref: r }) });
  }, "ToggleGroupImpl")
), Lh = "ToggleGroupItem", hM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ba(function(o, r) {
    const i = Hx(Lh, o.__scopeToggleGroup), c = dM(Lh, o.__scopeToggleGroup), f = Vx(o.__scopeToggleGroup), d = i.value.includes(o.value), m = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: m }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ x.jsx(
      M2,
      {
        asChild: !0,
        ...f,
        focusable: !m,
        active: d,
        ref: h,
        children: /* @__PURE__ */ x.jsx(Wy, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ x.jsx(Wy, { ...g, ref: r });
  }, "ToggleGroupItem")
), Wy = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ba(function(o, r) {
    const { __scopeToggleGroup: i, value: c, ...f } = o, d = Hx(Lh, i), m = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? m : void 0;
    return /* @__PURE__ */ x.jsx(
      rM,
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
function Bx({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(iw, { "data-slot": "accordion", ...n });
}
function Na({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    sw,
    {
      "data-slot": "accordion-item",
      className: et("border-b last:border-b-0", n),
      ...o
    }
  );
}
function za({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsx(cw, { className: "flex", children: /* @__PURE__ */ x.jsxs(
    uw,
    {
      "data-slot": "accordion-trigger",
      className: et(
        "group/accordion-trigger flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ x.jsxs("span", { className: "relative size-3.5 shrink-0", "aria-hidden": !0, children: [
          /* @__PURE__ */ x.jsx(v0, { className: "absolute inset-0 size-3.5 text-muted-foreground transition-[opacity,transform] duration-150 ease-out group-data-[state=open]/accordion-trigger:scale-75 group-data-[state=open]/accordion-trigger:opacity-0" }),
          /* @__PURE__ */ x.jsx(y0, { className: "absolute inset-0 size-3.5 scale-75 text-muted-foreground opacity-0 transition-[opacity,transform] duration-150 ease-out group-data-[state=open]/accordion-trigger:scale-100 group-data-[state=open]/accordion-trigger:opacity-100" })
        ] })
      ]
    }
  ) });
}
function Da({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    fw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ x.jsx("div", { className: et("pt-0 pb-4", n), children: o })
    }
  );
}
const ev = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, tv = n0, Os = (n, o) => (r) => {
  var i;
  if (o?.variants == null) return tv(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const y = r?.[h], S = f?.[h];
    if (y === null) return null;
    const v = ev(y) || ev(S);
    return c[h][v];
  }), m = r && Object.entries(r).reduce((h, y) => {
    let [S, v] = y;
    return v === void 0 || (h[S] = v), h;
  }, {}), g = o == null || (i = o.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((h, y) => {
    let { class: S, className: v, ...C } = y;
    return Object.entries(C).every((_) => {
      let [A, R] = _;
      return Array.isArray(R) ? R.includes({
        ...f,
        ...m
      }[A]) : {
        ...f,
        ...m
      }[A] === R;
    }) ? [
      ...h,
      S,
      v
    ] : h;
  }, []);
  return tv(n, d, g, r?.class, r?.className);
}, mM = Os(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "bg-background shadow-xs ring-1 ring-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:ring-input dark:hover:bg-input/50",
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
function Xl({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: i = !1,
  ...c
}) {
  const f = i ? rR : "button";
  return /* @__PURE__ */ x.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: et(mM({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function Gx({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "card",
      className: et(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        n
      ),
      ...o
    }
  );
}
function Yx({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: et("px-6", n),
      ...o
    }
  );
}
function pM({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(X0, { "data-slot": "collapsible", ...n });
}
function gM({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(
    Y0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function bM({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(
    P0,
    {
      "data-slot": "collapsible-content",
      ...n
    }
  );
}
function Wc({
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
const ym = {
  ...Er
}, nv = {};
function Rl(n, o) {
  const r = b.useRef(nv);
  return r.current === nv && (r.current = n(o)), r;
}
const Jd = ym.useInsertionEffect, yM = (
  // React 17 doesn't have useInsertionEffect.
  Jd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Jd !== ym.useLayoutEffect ? Jd : (n) => n()
);
function Pe(n) {
  const o = Rl(vM).current;
  return o.next = n, yM(o.effect), o.trampoline;
}
function vM() {
  const n = {
    next: void 0,
    callback: xM,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function xM() {
}
const SM = () => {
}, Xe = typeof document < "u" ? b.useLayoutEffect : SM, qx = /* @__PURE__ */ b.createContext({
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
function EM() {
  return b.useContext(qx);
}
function CM(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: i,
    onMapChange: c
  } = n, f = Pe(c), [, d] = b.useState(!1), m = Rl(RM).current, g = Rl(_M).current, h = b.useRef(0), y = b.useRef(!0), S = b.useRef([]), v = b.useRef(null), C = Pe(() => {
    y.current || (y.current = !0, d((L) => !L));
  }), _ = Pe((L, I) => {
    g.set(L, I), C();
  }), A = Pe((L) => {
    g.delete(L), C();
  }), R = Pe((L) => {
    const I = /* @__PURE__ */ new Map();
    return r.current.length = 0, i && (i.current.length = 0), L.forEach((B) => {
      I.set(B.element, {
        ...B.registration.metadata ?? {},
        index: B.index
      }), r.current[B.index] = B.element, i && (i.current[B.index] = B.registration.label !== void 0 ? B.registration.label : B.registration.textRef?.current?.textContent ?? B.element.textContent);
    }), h.current = r.current.length, I;
  });
  function w(L) {
    if (v.current?.disconnect(), v.current = null, typeof MutationObserver != "function" || L.length < 2)
      return;
    const I = new MutationObserver((V) => {
      if (!AM(V))
        return;
      let P = null;
      for (const ee of L)
        if (ee.isConnected) {
          if (P && Px(P, ee) > 0) {
            I.disconnect(), C();
            return;
          }
          P = ee;
        }
    });
    v.current = I;
    const B = /* @__PURE__ */ new Set();
    for (let V = 1; V < L.length; V += 1) {
      const P = MM(L[V - 1], L[V]);
      P && B.add(P);
    }
    B.forEach((V) => I.observe(V, {
      childList: !0
    }));
  }
  const O = Pe(() => {
    const [L, I] = wM(g), B = R(L);
    w(I), S.current = L, y.current = !1, m.forEach((V) => V(B)), f(B);
  });
  Xe(() => (y.current || R(S.current), () => {
    r.current = [], i && (i.current = []);
  }), [r, i, R]), Xe(() => {
    y.current && O();
  }), Xe(() => () => {
    v.current?.disconnect(), y.current = !0;
  }, []);
  const k = Pe((L) => (m.add(L), () => {
    m.delete(L);
  })), D = b.useMemo(() => ({
    register: _,
    unregister: A,
    subscribeMapChange: k,
    nextIndexRef: h
  }), [_, A, k, h]);
  return /* @__PURE__ */ x.jsx(qx.Provider, {
    value: D,
    children: o
  });
}
function _M() {
  return /* @__PURE__ */ new Map();
}
function RM() {
  return /* @__PURE__ */ new Set();
}
function wM(n) {
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
  return i.sort((f, d) => Px(f.element, d.element)), i.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, i.map((f) => f.element)];
}
function MM(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function AM(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Px(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function TM(n, o) {
  return function(i, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", i.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${i}; visit ${f} for the full message.`;
  };
}
const So = TM("https://base-ui.com/production-error", "Base UI");
function br(n, o, r, i) {
  const c = Rl(Xx).current;
  return kM(c, n, o, r, i) && Fx(c, [n, o, r, i]), c.callback;
}
function OM(n) {
  const o = Rl(Xx).current;
  return NM(o, n) && Fx(o, n), o.callback;
}
function Xx() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function kM(n, o, r, i, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== i || n.refs[3] !== c;
}
function NM(n, o) {
  return n.refs.length !== o.length || n.refs.some((r, i) => r !== o[i]);
}
function Fx(n, o) {
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
const zM = parseInt(b.version, 10);
function vm(n) {
  return zM >= n;
}
function lv(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (vm(19) ? r?.ref : o.ref) ?? null;
}
function Vh(n, o) {
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
function Ft() {
}
const ci = Object.freeze([]), cl = Object.freeze({});
function DM(n, o) {
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
function jM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function LM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const xm = {};
function hi(n, o, r, i, c) {
  if (!r && !i && !c && !n)
    return su(o);
  let f = su(n);
  return o && (f = ds(f, o)), r && (f = ds(f, r)), i && (f = ds(f, i)), c && (f = ds(f, c)), f;
}
function VM(n) {
  if (n.length === 0)
    return xm;
  if (n.length === 1)
    return su(n[0]);
  let o = su(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = ds(o, n[r]);
  return o;
}
function su(n) {
  return Sm(n) ? {
    ...Qx(n, xm)
  } : IM(n);
}
function ds(n, o) {
  return Sm(o) ? Qx(o, n) : HM(n, o);
}
function IM(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const i = o[r];
    Kx(r, i) && (o[r] = Zx(i));
  }
  return o;
}
function HM(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const i = o[r];
    switch (r) {
      case "style": {
        n[r] = Vh(n.style, i);
        break;
      }
      case "className": {
        n[r] = $x(n.className, i);
        break;
      }
      default:
        Kx(r, i) ? n[r] = UM(n[r], i) : n[r] = i;
    }
  }
  return n;
}
function Kx(n, o) {
  const r = n.charCodeAt(0), i = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && i === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function Sm(n) {
  return typeof n == "function";
}
function Qx(n, o) {
  return Sm(n) ? n(o) : n ?? xm;
}
function UM(n, o) {
  return o ? n ? (...r) => {
    const i = r[0];
    if (Jx(i)) {
      const f = i;
      cu(f);
      const d = o(...r);
      return f.baseUIHandlerPrevented || n?.(...r), d;
    }
    const c = o(...r);
    return n?.(...r), c;
  } : Zx(o) : n;
}
function Zx(n) {
  return n && ((...o) => {
    const r = o[0];
    return Jx(r) && cu(r), n(...o);
  });
}
function cu(n) {
  return n.preventBaseUIHandler = () => {
    n.baseUIHandlerPrevented = !0;
  }, n;
}
function $x(n, o) {
  return o ? n ? o + " " + n : o : n;
}
function Jx(n) {
  return n != null && typeof n == "object" && "nativeEvent" in n;
}
function Kl(n, o, r = {}) {
  const i = o.render, c = BM(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? cl;
  return qM(n, i, c, f);
}
function BM(n, o = {}) {
  const {
    className: r,
    style: i,
    render: c
  } = n, {
    state: f = cl,
    ref: d,
    props: m,
    stateAttributesMapping: g,
    enabled: h = !0
  } = o, y = h ? jM(r, f) : void 0, S = h ? LM(i, f) : void 0, v = h ? DM(f, g) : cl, C = h && m ? GM(m) : void 0, _ = h ? Vh(v, C) ?? {} : cl;
  return typeof document < "u" && (h ? Array.isArray(d) ? _.ref = OM([_.ref, lv(c), ...d]) : _.ref = br(_.ref, lv(c), d) : br(null, null)), h ? (y !== void 0 && (_.className = $x(_.className, y)), S !== void 0 && (_.style = Vh(_.style, S)), _) : cl;
}
function GM(n) {
  return Array.isArray(n) ? VM(n) : hi(void 0, n);
}
const YM = /* @__PURE__ */ Symbol.for("react.lazy");
function qM(n, o, r, i) {
  if (o) {
    if (typeof o == "function")
      return o(r, i);
    const c = hi(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === YM && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return PM(n, r);
  throw new Error(So(8));
}
function PM(n, o) {
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
let ov = 0;
function XM(n, o = "mui") {
  const [r, i] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (ov += 1, i(`${o}-${ov}`));
  }, [r, o]), c;
}
const av = ym.useId;
function Em(n, o) {
  if (av !== void 0) {
    const r = av();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return XM(n, o);
}
function wu(n) {
  return Em(n, "base-ui");
}
const Yl = "none", Wx = "trigger-press", FM = "trigger-hover", Cm = "outside-press", KM = "item-press", QM = "close-press", rv = "clear-press", ps = "input-change", yo = "input-clear", ZM = "input-press", Mu = "focus-out", _m = "escape-key", Ih = "list-navigation", Rm = "keyboard", wm = "pointer", $M = "cancel-open";
function vt(n, o, r, i) {
  let c = !1, f = !1;
  const d = cl;
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
function JM(n, o, r) {
  const i = r ?? cl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...i
  };
}
function e1(n) {
  b.useEffect(n, ci);
}
const Bc = null;
class WM {
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
let Gc = new WM();
class vo {
  static create() {
    return new vo();
  }
  static request(o) {
    return Gc.request(o);
  }
  static cancel(o) {
    return Gc.cancel(o);
  }
  currentId = Bc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = Gc.request(() => {
      this.currentId = Bc, o();
    });
  }
  cancel = () => {
    this.currentId !== Bc && (Gc.cancel(this.currentId), this.currentId = Bc);
  };
  disposeEffect = () => this.cancel;
}
function bs() {
  const n = Rl(vo.create).current;
  return e1(n.disposeEffect), n;
}
function Mm(n, o = !1, r = !1) {
  const [i, c] = b.useState(n && o ? "idle" : void 0), [f, d] = b.useState(n);
  return n && !f && (d(!0), c("starting")), !n && f && i !== "ending" && !r && c("ending"), !n && !f && i === "ending" && c(void 0), Xe(() => {
    if (!n && f && i !== "ending" && r) {
      const m = vo.request(() => {
        c("ending");
      });
      return () => {
        vo.cancel(m);
      };
    }
  }, [n, f, i, r]), Xe(() => {
    if (!n || o)
      return;
    const m = vo.request(() => {
      c(void 0);
    });
    return () => {
      vo.cancel(m);
    };
  }, [o, n]), Xe(() => {
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
function eA(n = {}) {
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
  } = EM(), y = b.useRef(-1), [S, v] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const R = h.current;
      h.current += 1, y.current = R;
    }
    return y.current;
  } : -1), C = f ?? S, _ = b.useRef(null), A = b.useCallback((R) => {
    const w = _.current;
    w && m(w), _.current = R, R && d(R, {
      metadata: i ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, m, i, r, c]);
  return Xe(() => {
    if (f == null)
      return g((R) => {
        const w = _.current ? R.get(_.current)?.index : null;
        w != null && v(w);
      });
  }, [f, g]), {
    ref: A,
    index: C
  };
}
let iv = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const tA = {
  "data-starting-style": ""
}, nA = {
  "data-ending-style": ""
}, Au = {
  transitionStatus(n) {
    return n === "starting" ? tA : n === "ending" ? nA : null;
  }
}, lA = /* @__PURE__ */ b.createContext(void 0);
function oA(n = !1) {
  const o = b.useContext(lA);
  if (o === void 0 && !n)
    throw new Error(So(16));
  return o;
}
function aA(n) {
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
function eu(n, o, {
  detail: r = 0
} = {}) {
  n.dispatchEvent(new (dn(n)).PointerEvent("click", {
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
function ks(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: i = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), m = oA(!0), g = f ?? m !== void 0, {
    props: h
  } = aA({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: i,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const C = d.current;
    Wd(C) && g && o && h.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [o, h.disabled, g]);
  Xe(y, [y]);
  const S = b.useCallback((C = {}) => {
    const {
      onClick: _,
      onMouseDown: A,
      onKeyUp: R,
      onKeyDown: w,
      onPointerDown: O,
      ...k
    } = C;
    return hi({
      onClick(D) {
        if (o) {
          D.preventDefault();
          return;
        }
        _?.(D);
      },
      onMouseDown(D) {
        o || A?.(D);
      },
      onKeyDown(D) {
        if (o || (cu(D), w?.(D), D.baseUIHandlerPrevented))
          return;
        const L = D.target === D.currentTarget, I = D.currentTarget, B = Wd(I), V = !c && rA(I), P = L && (c ? B : !V), ee = D.key === "Enter", se = D.key === " ", fe = I.getAttribute("role"), le = fe?.startsWith("menuitem") || fe === "option" || fe === "gridcell";
        if (L && g && se) {
          if (D.defaultPrevented && le)
            return;
          D.preventDefault(), (!c || B) && (D.preventBaseUIHandler(), eu(I, D));
          return;
        }
        if (!P || c || !se && !ee) {
          L && V && se && D.preventDefault();
          return;
        }
        D.defaultPrevented || (D.preventDefault(), ee && (D.preventBaseUIHandler(), eu(I, D)));
      },
      onKeyUp(D) {
        if (!o) {
          if (cu(D), R?.(D), D.target === D.currentTarget && c && g && Wd(D.currentTarget) && D.key === " ") {
            D.preventDefault();
            return;
          }
          D.baseUIHandlerPrevented || D.target === D.currentTarget && !c && !g && !D.defaultPrevented && D.key === " " && (D.preventBaseUIHandler(), eu(D.currentTarget, D));
        }
      },
      onPointerDown(D) {
        if (o) {
          D.preventDefault();
          return;
        }
        O?.(D);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, h, k);
  }, [o, h, g, c]), v = Pe((C) => {
    d.current = C, y();
  });
  return {
    getButtonProps: S,
    buttonRef: v
  };
}
function Wd(n) {
  return Kt(n) && n.tagName === "BUTTON";
}
function rA(n) {
  return Kt(n) && n.tagName === "A" && !!n.href;
}
function Yt(n, o, r, i) {
  return n.addEventListener(o, r, i), () => {
    n.removeEventListener(o, r, i);
  };
}
function sl(n) {
  const o = Rl(iA, n).current;
  return o.next = n, Xe(o.effect), o;
}
function iA(n) {
  const o = {
    current: n,
    next: n,
    effect: () => {
      o.current = o.next;
    }
  };
  return o;
}
function Ko(n) {
  return n == null ? n : "current" in n ? n.current : n;
}
function sA(n, o = !1) {
  const r = bs();
  return Pe((i, c = null) => {
    r.cancel();
    const f = Ko(n);
    if (f == null)
      return;
    const d = f, m = () => {
      yi.flushSync(i);
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
function Tu(n) {
  const {
    enabled: o = !0,
    open: r,
    ref: i,
    onComplete: c
  } = n, f = Pe(c), d = sA(i, r);
  b.useEffect(() => {
    if (!o)
      return;
    const m = new AbortController();
    return d(f, m.signal), () => {
      m.abort();
    };
  }, [o, r, f, d]);
}
function cA() {
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
  userAgent: uA,
  platform: fA,
  maxTouchPoints: dA
} = cA(), Ou = uA.toLowerCase(), ys = fA.toLowerCase(), Ns = /^i(os$|p)/.test(ys) || ys === "macintel" && dA > 1, sv = "android", uu = ys === sv || Ou.includes(sv), hA = !Ns && ys.startsWith("mac");
ys.startsWith("win");
const mA = hA || Ns, Rr = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), cv = !Rr && Ou.includes("firefox");
!Rr && Ou.includes("chrom");
const pA = mA, t1 = /jsdom|happydom/.test(Ou), ss = 0;
class yr {
  static create() {
    return new yr();
  }
  currentId = ss;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(o, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = ss, r();
    }, o);
  }
  isStarted() {
    return this.currentId !== ss;
  }
  clear = () => {
    this.currentId !== ss && (clearTimeout(this.currentId), this.currentId = ss);
  };
  disposeEffect = () => this.clear;
}
function Ga() {
  const n = Rl(yr.create).current;
  return e1(n.disposeEffect), n;
}
let uv = {}, fv = {}, dv = "";
function ku(n, o) {
  return Ms(n) ? n : o;
}
function hv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(ku(o, r)).overflowY);
}
function gA(n) {
  if (typeof document > "u")
    return !1;
  const o = $t(n);
  return dn(o).innerWidth - o.documentElement.clientWidth > 0;
}
function bA(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = $t(n), i = r.documentElement, c = r.body, f = ku(i, c), d = f.style.overflowY, m = i.style.scrollbarGutter;
  i.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, i.style.scrollbarGutter = m, g === h;
}
function yA(n) {
  const o = $t(n), r = o.documentElement, i = o.body, c = ku(r, i), f = {
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
function vA(n) {
  const o = $t(n), r = o.documentElement, i = o.body, c = dn(r);
  let f = 0, d = 0, m = !1;
  const g = vo.create();
  if (Rr && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const C = c.getComputedStyle(r), _ = c.getComputedStyle(i), w = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, uv = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, dv = r.style.scrollBehavior, fv = {
      position: i.style.position,
      height: i.style.height,
      width: i.style.width,
      boxSizing: i.style.boxSizing,
      overflowY: i.style.overflowY,
      overflowX: i.style.overflowX,
      scrollBehavior: i.style.scrollBehavior
    };
    const O = r.scrollHeight > r.clientHeight, k = r.scrollWidth > r.clientWidth, D = C.overflowY === "scroll" || _.overflowY === "scroll", L = C.overflowX === "scroll" || _.overflowX === "scroll", I = Math.max(0, c.innerWidth - i.clientWidth), B = Math.max(0, c.innerHeight - i.clientHeight), V = parseFloat(_.marginTop) + parseFloat(_.marginBottom), P = parseFloat(_.marginLeft) + parseFloat(_.marginRight), ee = ku(r, i);
    if (m = bA(n), m) {
      r.style.scrollbarGutter = w, ee.style.overflowY = "hidden", ee.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: w,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (O || D) && (r.style.overflowY = "scroll"), (k || L) && (r.style.overflowX = "scroll"), Object.assign(i.style, {
      position: "relative",
      height: V || B ? `calc(100dvh - ${V + B}px)` : "100dvh",
      width: P || I ? `calc(100vw - ${P + I}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), i.scrollTop = f, i.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function y() {
    Object.assign(r.style, uv), Object.assign(i.style, fv), m || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = dv);
  }
  function S() {
    y(), g.request(h);
  }
  h();
  const v = Yt(c, "resize", S);
  return () => {
    g.cancel(), y(), typeof c.removeEventListener == "function" && v();
  };
}
class xA {
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
    const r = $t(o), i = r.documentElement, c = r.body, f = dn(i);
    if (hv(f, i, c)) {
      const m = new f.MutationObserver(() => {
        hv(f, i, c) || (m.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      m.observe(i, g), m.observe(c, g), this.restore = () => m.disconnect();
      return;
    }
    const d = Ns || !gA(o);
    this.restore = d ? yA(o) : vA(o);
  }
}
const SA = new xA();
function EA(n = !0, o = null) {
  Xe(() => {
    if (n)
      return SA.acquire(o);
  }, [n, o]);
}
function An(n) {
  n.preventDefault(), n.stopPropagation();
}
function CA(n) {
  return "nativeEvent" in n;
}
function n1(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : uu && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function Am(n) {
  return t1 ? !1 : !uu && n.width === 0 && n.height === 0 || uu && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function eh(n, o) {
  return ["mouse", "pen"].includes(n);
}
function _A(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const Hh = "data-base-ui-focusable", RA = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", hr = "ArrowLeft", mr = "ArrowRight", Tm = "ArrowUp", Nu = "ArrowDown";
function Gl(n) {
  let o = n.activeElement;
  for (; o?.shadowRoot?.activeElement != null; )
    o = o.shadowRoot.activeElement;
  return o;
}
function ct(n, o) {
  if (!n || !o)
    return !1;
  const r = o.getRootNode?.();
  if (n.contains(o))
    return !0;
  if (r && gi(r)) {
    let i = o;
    for (; i; ) {
      if (n === i)
        return !0;
      i = i.parentNode || i.host;
    }
  }
  return !1;
}
function _l(n) {
  return "composedPath" in n ? n.composedPath()[0] : n.target;
}
function th(n, o) {
  if (o == null)
    return !1;
  if ("composedPath" in n)
    return n.composedPath().includes(o);
  const r = n;
  return r.target != null && o.contains(r.target);
}
function wA(n) {
  return n.matches("html,body");
}
function Om(n) {
  return Kt(n) && n.matches(RA);
}
function Uh(n) {
  return n ? n.getAttribute("role") === "combobox" && Om(n) : !1;
}
function Bh(n) {
  return n ? n.hasAttribute(Hh) ? n : n.querySelector(`[${Hh}]`) || n : null;
}
function mi(...n) {
  return () => {
    for (let o = 0; o < n.length; o += 1) {
      const r = n[o];
      r && r();
    }
  };
}
const l1 = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, km = {
  ...l1,
  position: "fixed",
  top: 0,
  left: 0
}, Nm = {
  ...l1,
  position: "absolute"
}, fu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [i, c] = b.useState();
  Xe(() => {
    pA && Rr && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: i
  };
  return /* @__PURE__ */ x.jsx("span", {
    ...o,
    ref: r,
    style: km,
    "aria-hidden": i ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function Yc(n, o, r) {
  return Math.floor(n / o) !== r;
}
function vs(n, o) {
  return o < 0 || o >= n.length;
}
function nh(n, o) {
  return $n(n.current, {
    disabledIndices: o
  });
}
function mv(n, o) {
  return $n(n.current, {
    decrement: !0,
    startingIndex: n.current.length,
    disabledIndices: o
  });
}
function $n(n, {
  startingIndex: o = -1,
  decrement: r = !1,
  disabledIndices: i,
  amount: c = 1
} = {}) {
  let f = o;
  do
    f += r ? -c : c;
  while (f >= 0 && f <= n.length - 1 && du(n, f, i));
  return f;
}
function MA(n, {
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
  stopEvent: S = !1
}) {
  let v = y, C;
  if (o.key === Tm ? C = "up" : o.key === Nu && (C = "down"), C) {
    const _ = [], A = [];
    let R = !1, w = 0;
    {
      let P = null, ee = -1;
      n.forEach((se, fe) => {
        if (se == null)
          return;
        w += 1;
        const le = se.closest('[role="row"]');
        le && (R = !0), (le !== P || ee === -1) && (P = le, ee += 1, _[ee] = []), _[ee].push(fe), A[fe] = ee;
      });
    }
    let O = !1, k = 0;
    if (R)
      for (const P of _) {
        const ee = P.length;
        ee > k && (k = ee), ee !== d && (O = !0);
      }
    const D = O && w < n.length, L = k || d, I = (P) => {
      if (!O || y === -1)
        return;
      const ee = A[y];
      if (ee == null)
        return;
      const se = _[ee].indexOf(y), fe = P === "up" ? -1 : 1;
      for (let le = ee + fe, me = 0; me < _.length; me += 1, le += fe) {
        if (le < 0 || le >= _.length) {
          if (!i || D)
            return;
          if (le = le < 0 ? _.length - 1 : 0, c) {
            const U = Math.min(se, _[le].length - 1), G = _[le][U] ?? _[le][0], K = c(o, y, G);
            le = A[K] ?? le;
          }
        }
        const be = _[le];
        for (let U = Math.min(se, be.length - 1); U >= 0; U -= 1) {
          const G = be[U];
          if (!du(n, G, m))
            return G;
        }
      }
    }, B = (P) => {
      if (!D || y === -1)
        return;
      const ee = y % L, se = P === "up" ? -L : L, fe = h - h % L, le = dr(h / L) + 1;
      for (let me = y - ee + se, be = 0; be < le; be += 1, me += se) {
        if (me < 0 || me > h) {
          if (!i)
            return;
          me = me < 0 ? fe : 0;
        }
        const U = Math.min(me + L - 1, h);
        for (let G = Math.min(me + ee, U); G >= me; G -= 1)
          if (!du(n, G, m))
            return G;
      }
    };
    S && An(o);
    const V = I(C) ?? B(C);
    if (V !== void 0)
      v = V;
    else if (y === -1)
      v = C === "up" ? h : g;
    else if (v = $n(n, {
      startingIndex: y,
      amount: L,
      decrement: C === "up",
      disabledIndices: m
    }), i) {
      if (C === "up" && (y - L < g || v < 0)) {
        const P = y % L, ee = h % L, se = h - (ee - P);
        ee === P ? v = h : v = ee > P ? se : se - L, c && (v = c(o, y, v));
      }
      C === "down" && y + L > h && (v = $n(n, {
        startingIndex: y % L - L,
        amount: L,
        disabledIndices: m
      }), c && (v = c(o, y, v)));
    }
    vs(n, v) && (v = y);
  }
  if (r === "both") {
    const _ = dr(y / d);
    o.key === (f ? hr : mr) && (S && An(o), y % d !== d - 1 ? (v = $n(n, {
      startingIndex: y,
      disabledIndices: m
    }), i && Yc(v, d, _) && (v = $n(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v)))) : i && (v = $n(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v))), Yc(v, d, _) && (v = y)), o.key === (f ? mr : hr) && (S && An(o), y % d !== 0 ? (v = $n(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: m
    }), i && Yc(v, d, _) && (v = $n(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (v = c(o, y, v)))) : i && (v = $n(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (v = c(o, y, v))), Yc(v, d, _) && (v = y));
    const A = dr(h / d) === _;
    vs(n, v) && (i && A ? (v = o.key === (f ? mr : hr) ? h : $n(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v))) : v = y);
  }
  return v;
}
function du(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !zu(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function AA(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function zu(n, o = n ? ul(n) : null) {
  return !n || !n.isConnected || !o || AA(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const TA = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function OA(n) {
  const o = n.assignedSlot;
  if (o)
    return o;
  if (n.parentElement)
    return n.parentElement;
  const r = n.getRootNode();
  return gi(r) ? r.host : null;
}
function Gh(n) {
  for (const o of Array.from(n.children))
    if (jn(o) === "summary")
      return o;
  return null;
}
function kA(n, o) {
  const r = Gh(o);
  return !!r && (n === r || ct(r, n));
}
function o1(n) {
  const o = n ? jn(n) : "";
  return n != null && n.matches(TA) && (o !== "summary" || n.parentElement != null && jn(n.parentElement) === "details" && Gh(n.parentElement) === n) && (o !== "details" || Gh(n) == null) && (o !== "input" || n.type !== "hidden");
}
function a1(n) {
  if (!o1(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = OA(o)) {
    const r = o !== n, i = jn(o) === "slot";
    if (o.hasAttribute("inert") || r && jn(o) === "details" && !o.open && !kA(n, o) || o.hasAttribute("hidden") || !i && !NA(o, r))
      return !1;
  }
  return !0;
}
function NA(n, o) {
  const r = ul(n);
  return o ? r.display !== "none" : zu(n, r);
}
function r1(n) {
  const o = n.tabIndex;
  if (o < 0) {
    const r = jn(n);
    if (r === "details" || r === "audio" || r === "video" || Kt(n) && n.isContentEditable)
      return 0;
  }
  return o;
}
function lh(n) {
  if (jn(n) !== "input")
    return null;
  const o = n;
  return o.type === "radio" && o.name !== "" ? o : null;
}
function zA(n, o) {
  const r = lh(n);
  if (!r)
    return !0;
  const i = o.find((c) => {
    const f = lh(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return i ? i === r : o.find((c) => {
    const f = lh(c);
    return f?.name === r.name && f.form === r.form;
  }) === r;
}
function i1(n) {
  if (Kt(n) && jn(n) === "slot") {
    const o = n.assignedElements({
      flatten: !0
    });
    if (o.length > 0)
      return o;
  }
  return Kt(n) && n.shadowRoot ? Array.from(n.shadowRoot.children) : Array.from(n.children);
}
function s1(n, o) {
  i1(n).forEach((r) => {
    o1(r) && o.push(r), s1(r, o);
  });
}
function c1(n, o, r) {
  i1(n).forEach((i) => {
    Kt(i) && i.matches(o) && r.push(i), c1(i, o, r);
  });
}
function zm(n) {
  return a1(n) && r1(n) >= 0;
}
function u1(n) {
  const o = [];
  return s1(n, o), o.filter(a1);
}
function Du(n) {
  const o = u1(n);
  return o.filter((r) => r1(r) >= 0 && zA(r, o));
}
function f1(n, o) {
  const r = Du(n), i = r.length;
  if (i === 0)
    return;
  const c = Gl($t(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : i - 1 : f + o;
  return r[d];
}
function d1(n) {
  return f1($t(n).body, 1) || n;
}
function h1(n) {
  return f1($t(n).body, -1) || n;
}
function gs(n, o) {
  const r = o || n.currentTarget, i = n.relatedTarget;
  return !i || !ct(r, i);
}
function DA(n) {
  Du(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function pv(n) {
  const o = [];
  c1(n, "[data-tabindex]", o), o.forEach((r) => {
    const i = r.dataset.tabindex;
    delete r.dataset.tabindex, i ? r.setAttribute("tabindex", i) : r.removeAttribute("tabindex");
  });
}
function xs(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...xs(n, c.id, r)]);
}
function gv(n, o) {
  let r = [], i = n.find((c) => c.id === o)?.parentId;
  for (; i; ) {
    const c = n.find((f) => f.id === i);
    i = c?.parentId, c && (r = r.concat(c));
  }
  return r;
}
function hu(n) {
  return `data-base-ui-${n}`;
}
let qc = 0;
function tu(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: i = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(qc);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (i)
    return f(), Ft;
  const d = requestAnimationFrame(f);
  return qc = d, () => {
    qc === d && (cancelAnimationFrame(d), qc = 0);
  };
}
const oh = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, bv = "data-base-ui-inert", Yh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let cs = /* @__PURE__ */ new WeakMap(), ah = 0;
function jA(n) {
  return Yh[n];
}
function m1(n) {
  return n ? gi(n) ? n.host : m1(n.parentNode) : null;
}
const yv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const i = m1(r);
  return n.contains(i) ? i : null;
}).filter((r) => r != null), vv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let i = r;
    for (; i && !o.has(i); )
      o.add(i), i = i.parentNode;
  }), o;
}, xv = (n, o, r) => {
  const i = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      jn(d) !== "script" && (o.has(d) ? c(d) : i.push(d));
    });
  };
  return c(n), i;
};
function LA(n, o, r, i, {
  mark: c = !0
}) {
  let f = null;
  i ? f = "inert" : r && (f = "aria-hidden");
  let d = null, m = null;
  const g = yv(o, n), h = c ? xv(o, vv(g), new Set(g)) : [], y = [], S = [];
  if (f) {
    const v = oh[f], C = jA(f);
    m = C, d = v;
    const _ = yv(o, Array.from(o.querySelectorAll("[aria-live]"))), A = g.concat(_);
    xv(o, vv(A), new Set(A)).forEach((w) => {
      const O = w.getAttribute(f), k = O !== null && O !== "false", D = (v.get(w) || 0) + 1;
      v.set(w, D), y.push(w), D === 1 && k && C.add(w), k || w.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((v) => {
    const C = (cs.get(v) || 0) + 1;
    cs.set(v, C), S.push(v), C === 1 && v.setAttribute(bv, "");
  }), ah += 1, () => {
    d && y.forEach((v) => {
      const _ = (d.get(v) || 0) - 1;
      d.set(v, _), _ || (!m?.has(v) && f && v.removeAttribute(f), m?.delete(v));
    }), c && S.forEach((v) => {
      const C = (cs.get(v) || 0) - 1;
      cs.set(v, C), C || v.removeAttribute(bv);
    }), ah -= 1, ah || (oh.inert = /* @__PURE__ */ new WeakMap(), oh["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Yh.inert = /* @__PURE__ */ new WeakSet(), Yh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), cs = /* @__PURE__ */ new WeakMap());
  };
}
function Sv(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: i = !1,
    mark: c = !0
  } = o, f = $t(n[0]).body;
  return LA(n, f, r, i, {
    mark: c
  });
}
const VA = {
  style: {
    transition: "none"
  }
}, IA = "data-base-ui-click-trigger", HA = {
  fallbackAxisSide: "none"
}, UA = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, p1 = /* @__PURE__ */ b.createContext(null), g1 = () => b.useContext(p1), BA = hu("portal");
function GA(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: i = cl,
    elementProps: c
  } = n, f = Em(), m = g1()?.portalNode, [g, h] = b.useState(null), [y, S] = b.useState(null), v = Pe((R) => {
    R !== null && S(R);
  }), C = b.useRef(null);
  Xe(() => {
    if (r === null) {
      C.current && (C.current = null, S(null), h(null));
      return;
    }
    const R = (r && (sm(r) ? r : r.current)) ?? m ?? document.body;
    if (R == null) {
      C.current && (C.current = null, S(null), h(null));
      return;
    }
    C.current !== R && (C.current = R, S(null), h(R));
  }, [r, m]);
  const _ = Kl("div", i, {
    ref: [o, v],
    props: [{
      id: f,
      [BA]: ""
    }, c]
  }), A = g && _ ? /* @__PURE__ */ yi.createPortal(_, g) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(_) ? _.props.id : void 0,
    subtree: A
  };
}
const YA = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
    subtree: S
  } = GA({
    container: m,
    ref: r,
    componentProps: o,
    elementProps: g
  }), v = b.useRef(null), C = b.useRef(null), _ = b.useRef(null), A = b.useRef(null), [R, w] = b.useState(null), O = b.useRef(!1), k = R?.modal, D = R?.open, L = !!R && !R.modal && R.open && !!h;
  b.useEffect(() => {
    if (!h || k)
      return;
    function B(V) {
      h && V.relatedTarget && gs(V) && (V.type === "focusin" ? O.current && (pv(h), O.current = !1) : (DA(h), O.current = !0));
    }
    return mi(Yt(h, "focusin", B, !0), Yt(h, "focusout", B, !0));
  }, [h, k]), Xe(() => {
    !h || D !== !0 || !O.current || (pv(h), O.current = !1);
  }, [D, h]);
  const I = b.useMemo(() => ({
    beforeOutsideRef: v,
    afterOutsideRef: C,
    beforeInsideRef: _,
    afterInsideRef: A,
    portalNode: h,
    setFocusManagerState: w
  }), [h]);
  return /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [S, /* @__PURE__ */ x.jsxs(p1.Provider, {
      value: I,
      children: [L && h && /* @__PURE__ */ x.jsx(fu, {
        "data-type": "outside",
        ref: v,
        onFocus: (B) => {
          if (gs(B, h))
            _.current?.focus();
          else {
            const V = R ? R.domReference : null;
            h1(V)?.focus();
          }
        }
      }), L && h && /* @__PURE__ */ x.jsx("span", {
        "aria-owns": y,
        style: UA
      }), h && /* @__PURE__ */ yi.createPortal(d, h), L && h && /* @__PURE__ */ x.jsx(fu, {
        "data-type": "outside",
        ref: C,
        onFocus: (B) => {
          if (gs(B, h))
            A.current?.focus();
          else {
            const V = R ? R.domReference : null;
            d1(V)?.focus(), R?.closeOnFocusOut && R?.onOpenChange(!1, vt(Mu, B.nativeEvent));
          }
        }
      })]
    })]
  });
});
function qA() {
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
const PA = /* @__PURE__ */ b.createContext(null), XA = /* @__PURE__ */ b.createContext(null), b1 = () => b.useContext(PA)?.id || null, ju = (n) => {
  const o = b.useContext(XA);
  return n ?? o;
};
function FA(n, o) {
  const r = dn(_l(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const Ev = 20;
let ja = [];
function Dm() {
  ja = ja.filter((n) => n.deref()?.isConnected);
}
function Cv(n) {
  Dm(), n && jn(n) !== "body" && (ja.push(new WeakRef(n)), ja.length > Ev && (ja = ja.slice(-Ev)));
}
function _v() {
  return Dm(), ja[ja.length - 1]?.deref();
}
function KA(n) {
  return n ? zm(n) ? n : Du(n)[0] || n : null;
}
function Rv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = u1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return zm(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), i = n.getAttribute("tabindex");
  r.length === 0 ? i !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (i !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function QA(n) {
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
    previousFocusableElement: S,
    beforeContentFocusGuardRef: v,
    externalTree: C,
    getInsideElements: _
  } = n, A = "rootStore" in o ? o.rootStore : o, R = A.useState("open"), w = A.useState("domReferenceElement"), O = A.useState("floatingElement"), {
    events: k,
    dataRef: D
  } = A.context, L = Pe(() => D.current.floatingContext?.nodeId), I = c === !1, B = Uh(w) && I, V = sl(c), P = sl(f), ee = sl(h), se = sl(R), fe = ju(C), le = g1(), me = b.useRef(!1), be = b.useRef(!1), U = b.useRef(!1), G = b.useRef(null), K = b.useRef(""), ve = b.useRef(""), ie = b.useRef(null), j = b.useRef(null), F = br(ie, v, le?.beforeInsideRef), te = br(j, le?.afterInsideRef), oe = Ga(), ge = Ga(), _e = bs(), Ye = le != null, we = Bh(O), Me = Pe((ke = we) => ke ? Du(ke) : []), it = Pe(() => _?.().filter((ke) => ke != null) ?? []);
  b.useEffect(() => {
    if (i || !m)
      return;
    function ke(Te) {
      Te.key === "Tab" && ct(we, Gl($t(we))) && Me().length === 0 && !B && An(Te);
    }
    const tt = $t(we);
    return Yt(tt, "keydown", ke);
  }, [i, we, m, B, Me]), b.useEffect(() => {
    if (i || !R)
      return;
    const ke = $t(we);
    function tt() {
      U.current = !1;
    }
    function Te(Ue) {
      const Re = _l(Ue), Fe = it(), Ae = ct(O, Re) || ct(w, Re) || ct(le?.portalNode, Re) || Fe.some(($e) => $e === Re || ct($e, Re));
      U.current = !Ae, ve.current = Ue.pointerType || "keyboard", Re?.closest(`[${IA}]`) && (be.current = !0, ge.start(0, () => {
        be.current = !1;
      }));
    }
    function Oe() {
      ve.current = "keyboard";
    }
    return mi(
      Yt(ke, "pointerdown", Te, !0),
      Yt(ke, "pointerup", tt, !0),
      Yt(ke, "pointercancel", tt, !0),
      Yt(ke, "keydown", Oe, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      tt
    );
  }, [i, O, w, we, R, le, ge, it]), b.useEffect(() => {
    if (i || !g)
      return;
    const ke = $t(we);
    function tt() {
      be.current = !0, ge.start(0, () => {
        be.current = !1;
      });
    }
    function Te(Fe) {
      const Ae = _l(Fe);
      zm(Ae) && (G.current = Ae);
    }
    function Oe(Fe) {
      const Ae = Fe.relatedTarget, $e = Fe.currentTarget, nt = _l(Fe);
      m && Ae == null && nt != null && ct(O, nt) && Cv(nt), queueMicrotask(() => {
        const Ke = L(), Se = A.context.triggerElements, Z = it(), ce = Ae?.hasAttribute(hu("focus-guard")) && [ie.current, j.current, le?.beforeInsideRef.current, le?.afterInsideRef.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, Ko(S), Ko(y)].includes(Ae), He = !(ct(w, Ae) || ct(O, Ae) || ct(Ae, O) || ct(le?.portalNode, Ae) || Z.some((ye) => ye === Ae || ct(ye, Ae)) || Se.hasMatchingElement((ye) => ct(ye, Ae)) || ce || fe && (xs(fe.nodesRef.current, Ke).find((ye) => ct(ye.context?.elements.floating, Ae) || ct(ye.context?.elements.domReference, Ae)) || gv(fe.nodesRef.current, Ke).find((ye) => [ye.context?.elements.floating, Bh(ye.context?.elements.floating)].includes(Ae) || ye.context?.elements.domReference === Ae)));
        if ($e === w && we && Rv(we), d && $e !== w && !zu(nt) && Gl(ke) === ke.body) {
          if (Kt(we) && (we.focus(), d === "popup")) {
            _e.request(() => {
              we.focus();
            });
            return;
          }
          const ye = Me(), Le = G.current, Je = (Le && ye.includes(Le) ? Le : null) || ye[ye.length - 1] || we;
          Kt(Je) && Je.focus();
        }
        if (D.current.insideReactTree) {
          D.current.insideReactTree = !1;
          return;
        }
        (B || !m) && Ae && He && !be.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (B || Ae !== _v()) && (me.current = !0, A.setOpen(!1, vt(Mu, Fe)));
      });
    }
    function Ue() {
      U.current || (D.current.insideReactTree = !0, oe.start(0, () => {
        D.current.insideReactTree = !1;
      }));
    }
    const Re = Kt(w) ? w : null;
    if (!(!O && !Re))
      return mi(Re && Yt(Re, "focusout", Oe), Re && Yt(Re, "pointerdown", tt), O && Yt(O, "focusin", Te), O && Yt(O, "focusout", Oe), O && le && Yt(O, "focusout", Ue, !0));
  }, [i, w, O, we, m, fe, le, A, g, d, Me, B, L, D, oe, ge, _e, y, S, it]), b.useEffect(() => {
    if (i || !O || !R)
      return;
    const ke = Array.from(le?.portalNode?.querySelectorAll(`[${hu("portal")}]`) || []), Te = (fe ? gv(fe.nodesRef.current, L()) : []).find(($e) => Uh($e.context?.elements.domReference || null))?.context?.elements.domReference, Ue = [...[O, ...ke, ie.current, j.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, ...it()], Te, Ko(S), Ko(y), B ? w : null].filter(($e) => $e != null), Re = Sv(Ue, {
      ariaHidden: m || B,
      mark: !1
    }), Fe = [O, ...ke].filter(($e) => $e != null), Ae = Sv(Fe);
    return () => {
      Ae(), Re();
    };
  }, [R, i, w, O, m, le, B, fe, L, y, S, it]), Xe(() => {
    if (!R || i || !Kt(we))
      return;
    K.current = "", ve.current = "";
    const ke = $t(we), tt = Gl(ke);
    queueMicrotask(() => {
      const Te = V.current, Oe = typeof Te == "function" ? Te(ee.current || "") : Te;
      if (Oe === void 0 || Oe === !1 || ct(we, tt))
        return;
      let Re = null;
      const Fe = () => (Re == null && (Re = Me(we)), Re[0] || we);
      let Ae;
      Oe === !0 || Oe === null ? Ae = Fe() : Ae = Ko(Oe), Ae = Ae || Fe();
      const $e = ct(we, Gl(ke));
      tu(Ae, {
        preventScroll: Ae === we,
        shouldFocus() {
          if (!se.current)
            return !1;
          if ($e)
            return !0;
          const nt = Gl(ke);
          return !(nt !== Ae && ct(we, nt));
        }
      });
    });
  }, [i, R, we, Me, V, ee, se]), Xe(() => {
    if (i || !we)
      return;
    const ke = $t(we), tt = Gl(ke), Te = ee.current == null;
    Cv(tt);
    function Oe(Re) {
      if (Re.open || (K.current = FA(Re.nativeEvent, ve.current)), Re.reason === FM && Re.nativeEvent.type === "mouseleave" && (me.current = !0), Re.reason === Cm)
        if (Re.nested)
          me.current = !1;
        else if (n1(Re.nativeEvent) || Am(Re.nativeEvent))
          me.current = !1;
        else {
          let Fe = !1;
          $t(we).createElement("div").focus({
            get preventScroll() {
              return Fe = !0, !1;
            }
          }), Fe ? me.current = !1 : me.current = !0;
        }
    }
    k.on("openchange", Oe);
    function Ue(Re) {
      const Fe = P.current;
      let Ae = typeof Fe == "function" ? Fe(Re) : Fe;
      if (Ae === void 0 || Ae === !1)
        return null;
      Ae === null && (Ae = !0);
      const $e = w?.isConnected ? w : null, nt = tt?.isConnected && jn(tt) !== "body" ? tt : null;
      let Ke = Te ? nt || $e : $e || nt;
      return Ke || (Ke = _v() || null), typeof Ae == "boolean" ? Ke : Ko(Ae) || Ke || null;
    }
    return () => {
      k.off("openchange", Oe);
      const Re = Gl(ke), Fe = it(), Ae = ct(O, Re) || Fe.some((Se) => Se === Re || ct(Se, Re)) || fe && xs(fe.nodesRef.current, L(), !1).some((Se) => ct(Se.context?.elements.floating, Re)), $e = P.current, nt = K.current, Ke = Ue(nt);
      queueMicrotask(() => {
        const Se = KA(Ke), Z = typeof $e != "boolean";
        if ($e && !me.current && Kt(Se) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!Z && Se !== Re && Re !== ke.body) || Ae)) {
          const ce = {
            preventScroll: !0
          };
          nt === "keyboard" && (ce.focusVisible = !0), Se.focus(ce);
        }
        me.current = !1;
      });
    };
  }, [i, O, we, P, ee, k, fe, w, L, it]), Xe(() => {
    if (!Rr || R || !O)
      return;
    const ke = Gl($t(O));
    !Kt(ke) || !Om(ke) || ct(O, ke) && ke.blur();
  }, [R, O]), Xe(() => {
    if (!(i || !le))
      return le.setFocusManagerState({
        modal: m,
        closeOnFocusOut: g,
        open: R,
        onOpenChange: A.setOpen,
        domReference: w
      }), () => {
        le.setFocusManagerState(null);
      };
  }, [i, le, m, R, A, g, w]), Xe(() => {
    if (!(i || !we))
      return Rv(we), () => {
        queueMicrotask(Dm);
      };
  }, [i, we]);
  const pt = !i && (m ? !B : !0) && (Ye || m);
  return /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [pt && /* @__PURE__ */ x.jsx(fu, {
      "data-type": "inside",
      ref: F,
      onFocus: (ke) => {
        if (m) {
          const tt = Me();
          tu(tt[tt.length - 1]);
        } else le?.portalNode && (me.current = !1, gs(ke, le.portalNode) ? d1(w)?.focus() : Ko(S ?? le.beforeOutsideRef)?.focus());
      }
    }), r, pt && /* @__PURE__ */ x.jsx(fu, {
      "data-type": "inside",
      ref: te,
      onFocus: (ke) => {
        m ? tu(Me()[0]) : le?.portalNode && (g && (me.current = !0), gs(ke, le.portalNode) ? h1(w)?.focus() : Ko(y ?? le.afterOutsideRef)?.focus());
      }
    })]
  });
}
function y1(n, o = {}) {
  const {
    enabled: r = !0,
    event: i = "click",
    toggle: c = !0,
    ignoreMouse: f = !1,
    stickIfOpen: d = !0,
    touchOpenDelay: m = 0,
    reason: g = Wx
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.context.dataRef, S = b.useRef(void 0), v = bs(), C = Ga(), _ = b.useMemo(() => {
    function A(w, O, k, D) {
      const L = vt(g, O, k);
      w && D === "touch" && m > 0 ? C.start(m, () => {
        h.setOpen(!0, L);
      }) : h.setOpen(w, L);
    }
    function R(w, O, k) {
      const D = y.current.openEvent, L = h.select("domReferenceElement") !== O;
      return w && L || !w || !c ? !0 : D && d ? !k(D.type) : !1;
    }
    return {
      onPointerDown(w) {
        S.current = eh(w.pointerType) && Am(w.nativeEvent) ? "virtual" : w.pointerType;
      },
      onMouseDown(w) {
        const O = S.current, k = w.nativeEvent, D = h.select("open");
        if (w.button !== 0 || i === "click" || eh(O) && f)
          return;
        const L = R(D, w.currentTarget, (V) => V === "click" || V === "mousedown"), I = _l(k);
        if (Om(I)) {
          A(L, k, I, O);
          return;
        }
        const B = w.currentTarget;
        v.request(() => {
          A(L, k, B, O);
        });
      },
      onClick(w) {
        if (i === "mousedown-only")
          return;
        const O = S.current;
        if (i === "mousedown" && O) {
          S.current = void 0;
          return;
        }
        if (eh(O) && f)
          return;
        const k = h.select("open"), D = R(k, w.currentTarget, (L) => L === "click" || L === "mousedown" || L === "keydown" || L === "keyup");
        A(D, w.nativeEvent, w.currentTarget, O);
      },
      onKeyDown() {
        S.current = void 0;
      }
    };
  }, [y, i, f, g, h, d, c, v, C, m]);
  return b.useMemo(() => r ? {
    reference: _
  } : cl, [r, _]);
}
function ZA() {
  return !1;
}
function $A(n) {
  return {
    escapeKey: typeof n == "boolean" ? n : n?.escapeKey ?? !1,
    outsidePress: typeof n == "boolean" ? n : n?.outsidePress ?? !0
  };
}
function JA(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: i = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = ZA,
    bubbles: m,
    externalTree: g
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.useState("open"), S = h.useState("floatingElement"), {
    dataRef: v
  } = h.context, C = ju(g), _ = Pe(typeof c == "function" ? c : () => !1), A = typeof c == "function" ? _ : c, R = A !== !1, w = Pe(() => f), {
    escapeKey: O,
    outsidePress: k
  } = $A(m), D = b.useRef(!1), L = b.useRef(!1), I = b.useRef(!1), B = b.useRef(!1), V = b.useRef(""), P = b.useRef(null), ee = Ga(), se = Ga(), fe = Pe(() => {
    se.clear(), v.current.insideReactTree = !1;
  }), le = Pe((F) => {
    const te = v.current.floatingContext?.nodeId;
    return (C ? xs(C.nodesRef.current, te) : []).some((ge) => ge.context?.open && !ge.context.dataRef.current[F]);
  }), me = Pe((F) => th(F, h.select("floatingElement")) || th(F, h.select("domReferenceElement"))), be = Pe((F) => {
    d() && h.setOpen(!1, vt(Wx, F.nativeEvent));
  }), U = Pe((F) => {
    if (!y || !r || !i || F.key !== "Escape" || B.current || !O && le("__escapeKeyBubbles"))
      return;
    const te = CA(F) ? F.nativeEvent : F, oe = vt(_m, te);
    h.setOpen(!1, oe), oe.isCanceled || F.preventDefault(), !O && !oe.isPropagationAllowed && F.stopPropagation();
  }), G = Pe(() => {
    v.current.insideReactTree = !0, se.start(0, fe);
  }), K = Pe((F) => {
    if (!y || !r || F.button !== 0)
      return;
    const te = _l(F.nativeEvent);
    ct(h.select("floatingElement"), te) && (D.current || (D.current = !0, L.current = !1));
  }), ve = Pe((F) => {
    !y || !r || (F.defaultPrevented || F.nativeEvent.defaultPrevented) && D.current && (L.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return fe;
    v.current.__escapeKeyBubbles = O, v.current.__outsidePressBubbles = k;
    const F = new yr(), te = new yr();
    function oe() {
      F.clear(), B.current = !0;
    }
    function ge() {
      F.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        Rr ? 5 : 0,
        () => {
          B.current = !1;
        }
      );
    }
    function _e() {
      I.current = !0, te.start(0, () => {
        I.current = !1;
      });
    }
    function Ye() {
      D.current = !1, L.current = !1;
    }
    function we() {
      const Z = V.current, ce = Z === "pen" || !Z ? "mouse" : Z, He = w(), ye = typeof He == "function" ? He() : He;
      return typeof ye == "string" ? ye : ye[ce];
    }
    function Me(Z) {
      const ce = we();
      return ce === "intentional" && Z.type !== "click" || ce === "sloppy" && Z.type === "click";
    }
    function it(Z) {
      const ce = v.current.floatingContext?.nodeId, He = C && xs(C.nodesRef.current, ce).some((ye) => th(Z, ye.context?.elements.floating));
      return me(Z) || He;
    }
    function pt(Z) {
      if (Me(Z)) {
        Z.type !== "click" && !me(Z) && (te.clear(), I.current = !1), fe();
        return;
      }
      if (v.current.insideReactTree) {
        fe();
        return;
      }
      const ce = _l(Z), He = `[${hu("inert")}]`, ye = fn(ce) ? ce.getRootNode() : null, Le = Array.from((gi(ye) ? ye : $t(h.select("floatingElement"))).querySelectorAll(He)), Je = h.context.triggerElements;
      if (ce && (Je.hasElement(ce) || Je.hasMatchingElement((Et) => ct(Et, ce))))
        return;
      let Mt = fn(ce) ? ce : null;
      for (; Mt && !Va(Mt); ) {
        const Et = Ua(Mt);
        if (Va(Et) || !fn(Et))
          break;
        Mt = Et;
      }
      if (!(Le.length && fn(ce) && !wA(ce) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !ct(ce, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Le.every((Et) => !ct(Mt, Et)))) {
        if (Kt(ce) && !("touches" in Z)) {
          const Et = Va(ce), jt = ul(ce), Ot = /auto|scroll/, xt = Et || Ot.test(jt.overflowX), an = Et || Ot.test(jt.overflowY), dt = xt && ce.clientWidth > 0 && ce.scrollWidth > ce.clientWidth, mn = an && ce.clientHeight > 0 && ce.scrollHeight > ce.clientHeight, Qt = jt.direction === "rtl", tn = mn && (Qt ? Z.offsetX <= ce.offsetWidth - ce.clientWidth : Z.offsetX > ce.clientWidth), St = dt && Z.offsetY > ce.clientHeight;
          if (tn || St)
            return;
        }
        if (!it(Z)) {
          if (we() === "intentional" && I.current) {
            te.clear(), I.current = !1;
            return;
          }
          typeof A == "function" && !A(Z) || le("__outsidePressBubbles") || (h.setOpen(!1, vt(Cm, Z)), fe());
        }
      }
    }
    function ke(Z) {
      we() !== "sloppy" || Z.pointerType === "touch" || !h.select("open") || !r || me(Z) || pt(Z);
    }
    function tt(Z) {
      if (we() !== "sloppy" || !h.select("open") || !r || me(Z))
        return;
      const ce = Z.touches[0];
      ce && (P.current = {
        startTime: Date.now(),
        startX: ce.clientX,
        startY: ce.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, ee.start(1e3, () => {
        P.current && (P.current.dismissOnTouchEnd = !1, P.current.dismissOnMouseDown = !1);
      }));
    }
    function Te(Z, ce) {
      const He = _l(Z);
      if (!He)
        return;
      const ye = Yt(He, Z.type, () => {
        ce(Z), ye();
      });
    }
    function Oe(Z) {
      V.current = "touch", Te(Z, tt);
    }
    function Ue(Z) {
      ee.clear(), Z.type === "pointerdown" && (V.current = Z.pointerType), !(Z.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) && Te(Z, (ce) => {
        ce.type === "pointerdown" ? ke(ce) : pt(ce);
      });
    }
    function Re(Z) {
      if (!D.current)
        return;
      const ce = L.current;
      if (Ye(), we() === "intentional") {
        if (Z.type === "pointercancel") {
          ce && _e();
          return;
        }
        if (!it(Z)) {
          if (ce) {
            _e();
            return;
          }
          typeof A == "function" && !A(Z) || (te.clear(), I.current = !0, fe());
        }
      }
    }
    function Fe(Z) {
      if (we() !== "sloppy" || !P.current || me(Z))
        return;
      const ce = Z.touches[0];
      if (!ce)
        return;
      const He = Math.abs(ce.clientX - P.current.startX), ye = Math.abs(ce.clientY - P.current.startY), Le = Math.sqrt(He * He + ye * ye);
      Le > 5 && (P.current.dismissOnTouchEnd = !0), Le > 10 && (pt(Z), ee.clear(), P.current = null);
    }
    function Ae(Z) {
      Te(Z, Fe);
    }
    function $e(Z) {
      we() !== "sloppy" || !P.current || me(Z) || (P.current.dismissOnTouchEnd && pt(Z), ee.clear(), P.current = null);
    }
    function nt(Z) {
      Te(Z, $e);
    }
    const Ke = $t(S), Se = mi(i && mi(Yt(Ke, "keydown", U), Yt(Ke, "compositionstart", oe), Yt(Ke, "compositionend", ge)), R && mi(Yt(Ke, "click", Ue, !0), Yt(Ke, "pointerdown", Ue, !0), Yt(Ke, "pointerup", Re, !0), Yt(Ke, "pointercancel", Re, !0), Yt(Ke, "mousedown", Ue, !0), Yt(Ke, "mouseup", Re, !0), Yt(Ke, "touchstart", Oe, !0), Yt(Ke, "touchmove", Ae, !0), Yt(Ke, "touchend", nt, !0)));
    return () => {
      Se(), F.clear(), te.clear(), Ye(), I.current = !1, fe();
    };
  }, [v, S, i, R, A, y, r, O, k, U, fe, w, le, me, C, h, ee]);
  const ie = b.useMemo(() => ({
    onKeyDown: U,
    onPointerDown: be,
    onClick: be
  }), [U, be]), j = b.useMemo(() => ({
    onKeyDown: U,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: ve,
    onMouseDown: ve,
    onClickCapture: G,
    onMouseDownCapture(F) {
      G(), K(F);
    },
    onPointerDownCapture(F) {
      G(), K(F);
    },
    onMouseUpCapture: G,
    onTouchEndCapture: G,
    onTouchMoveCapture: G
  }), [U, G, K, ve]);
  return b.useMemo(() => r ? {
    reference: ie,
    floating: j,
    trigger: ie
  } : {}, [r, ie, j]);
}
var rh = { exports: {} }, ih = {};
var wv;
function WA() {
  if (wv) return ih;
  wv = 1;
  var n = Cs();
  function o(S, v) {
    return S === v && (S !== 0 || 1 / S === 1 / v) || S !== S && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : o, i = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function m(S, v) {
    var C = v(), _ = i({ inst: { value: C, getSnapshot: v } }), A = _[0].inst, R = _[1];
    return f(
      function() {
        A.value = C, A.getSnapshot = v, g(A) && R({ inst: A });
      },
      [S, C, v]
    ), c(
      function() {
        return g(A) && R({ inst: A }), S(function() {
          g(A) && R({ inst: A });
        });
      },
      [S]
    ), d(C), C;
  }
  function g(S) {
    var v = S.getSnapshot;
    S = S.value;
    try {
      var C = v();
      return !r(S, C);
    } catch {
      return !0;
    }
  }
  function h(S, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : m;
  return ih.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, ih;
}
var Mv;
function v1() {
  return Mv || (Mv = 1, rh.exports = WA()), rh.exports;
}
var eT = v1(), sh = { exports: {} }, ch = {};
var Av;
function tT() {
  if (Av) return ch;
  Av = 1;
  var n = Cs(), o = v1();
  function r(h, y) {
    return h === y && (h !== 0 || 1 / h === 1 / y) || h !== h && y !== y;
  }
  var i = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, m = n.useMemo, g = n.useDebugValue;
  return ch.useSyncExternalStoreWithSelector = function(h, y, S, v, C) {
    var _ = f(null);
    if (_.current === null) {
      var A = { hasValue: !1, value: null };
      _.current = A;
    } else A = _.current;
    _ = m(
      function() {
        function w(I) {
          if (!O) {
            if (O = !0, k = I, I = v(I), C !== void 0 && A.hasValue) {
              var B = A.value;
              if (C(B, I))
                return D = B;
            }
            return D = I;
          }
          if (B = D, i(k, I)) return B;
          var V = v(I);
          return C !== void 0 && C(B, V) ? (k = I, B) : (k = I, D = V);
        }
        var O = !1, k, D, L = S === void 0 ? null : S;
        return [
          function() {
            return w(y());
          },
          L === null ? void 0 : function() {
            return w(L());
          }
        ];
      },
      [y, S, v, C]
    );
    var R = c(h, _[0], _[1]);
    return d(
      function() {
        A.hasValue = !0, A.value = R;
      },
      [R]
    ), g(R), R;
  }, ch;
}
var Tv;
function nT() {
  return Tv || (Tv = 1, sh.exports = tT()), sh.exports;
}
var lT = nT();
const oT = vm(19), aT = oT ? iT : sT;
function xe(n, o, r, i, c) {
  return aT(n, o, r, i, c);
}
function rT(n, o, r, i, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, i, c), [n, o, r, i, c]);
  return eT.useSyncExternalStore(n.subscribe, f, f);
}
function iT(n, o, r, i, c) {
  return rT(n, o, r, i, c);
}
function sT(n, o, r, i, c) {
  return lT.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, i, c));
}
class x1 {
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
class cT extends x1 {
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
    Xe(() => {
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
    Xe(() => (i.state[o] !== r && i.set(o, r), () => {
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
    Xe(() => {
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
    Xe(() => {
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
    const i = Pe(r ?? Ft);
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
const uT = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class fT extends cT {
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
      events: qA(),
      nested: i,
      triggerElements: f
    }, uT), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && _A(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
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
const dT = {
  tabIndex: -1,
  [Hh]: ""
};
class hT {
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
function mT(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: i = {}
  } = n, c = Em(), f = b1() != null, d = Rl(() => new fT({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: i.reference ?? null,
    floatingElement: i.floating ?? null,
    triggerElements: new hT(),
    floatingId: c,
    syncOnly: !1,
    nested: f
  })).current;
  return Xe(() => {
    const m = {
      open: o,
      floatingId: c
    };
    i.reference !== void 0 && (m.referenceElement = i.reference, m.domReferenceElement = fn(i.reference) ? i.reference : null), i.floating !== void 0 && (m.floatingElement = i.floating), d.update(m);
  }, [o, c, i.reference, i.floating, d]), d.context.onOpenChange = r, d.context.nested = f, d;
}
function pT(n) {
  return gT(n, n.rootContext);
}
function gT(n, o) {
  const {
    nodeId: r,
    externalTree: i
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), m = o.useState("open"), g = o.useState("floatingId"), [h, y] = b.useState(null), [S, v] = b.useState(void 0), [C, _] = b.useState(void 0), A = b.useRef(null), R = ju(i), w = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), O = i2({
    ...n,
    elements: {
      ...w,
      ...h && {
        reference: h
      }
    }
  }), k = fn(S) ? S : null, D = C === void 0 ? o.state.floatingElement : C;
  o.useSyncedValue("referenceElement", S ?? null), o.useSyncedValue("domReferenceElement", S === void 0 ? d : k), o.useSyncedValue("floatingElement", D);
  const L = b.useCallback((se) => {
    const fe = fn(se) ? {
      getBoundingClientRect: () => se.getBoundingClientRect(),
      getClientRects: () => se.getClientRects(),
      contextElement: se
    } : se;
    y(fe), O.refs.setReference(fe);
  }, [O.refs]), I = b.useCallback((se) => {
    (fn(se) || se === null) && (A.current = se, v(se)), (fn(O.refs.reference.current) || O.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    se !== null && !fn(se)) && O.refs.setReference(se);
  }, [O.refs, v]), B = b.useCallback((se) => {
    _(se), O.refs.setFloating(se);
  }, [O.refs]), V = b.useMemo(() => ({
    ...O.refs,
    setReference: I,
    setFloating: B,
    setPositionReference: L,
    domReference: A
  }), [O.refs, I, B, L]), P = b.useMemo(() => ({
    ...O.elements,
    domReference: d
  }), [O.elements, d]), ee = b.useMemo(() => ({
    ...O,
    dataRef: o.context.dataRef,
    open: m,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: g,
    refs: V,
    elements: P,
    nodeId: r,
    rootStore: o
  }), [O, V, P, r, o, m, g]);
  return Xe(() => {
    d && (A.current = d);
  }, [d]), Xe(() => {
    o.context.dataRef.current.floatingContext = ee;
    const se = R?.nodesRef.current.find((fe) => fe.id === r);
    se && (se.context = ee);
  }), b.useMemo(() => ({
    ...O,
    context: ee,
    refs: V,
    elements: P,
    rootStore: o
  }), [O, V, P, ee, o]);
}
const bT = "Escape";
function Ov(n) {
  return Rr && n.movementX === 0 && n.movementY === 0;
}
function Lu(n, o, r) {
  switch (n) {
    case "vertical":
      return o;
    case "horizontal":
      return r;
    default:
      return o || r;
  }
}
function Pc(n, o) {
  return Lu(o, n === Tm || n === Nu, n === hr || n === mr);
}
function uh(n, o, r) {
  return Lu(o, n === Nu, r ? n === hr : n === mr) || n === "Enter" || n === " " || n === "";
}
function yT(n, o, r) {
  return Lu(o, r ? n === hr : n === mr, n === Nu);
}
function vT(n, o, r, i) {
  const c = r ? n === mr : n === hr, f = n === Tm;
  return o === "both" || o === "horizontal" && i ? n === bT : Lu(o, c, f);
}
function xT(n, o) {
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
    virtual: S = !1,
    focusItemOnOpen: v = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: _ = !0,
    disabledIndices: A = void 0,
    orientation: R = "vertical",
    parentOrientation: w,
    id: O,
    resetOnPointerLeave: k = !0,
    externalTree: D,
    grid: L
  } = o, I = L != null, B = "rootStore" in n ? n.rootStore : n, V = B.useState("open"), P = B.useState("floatingElement"), ee = B.useState("domReferenceElement"), se = B.context.dataRef, fe = Bh(P), le = Uh(ee), me = sl(fe), be = b1(), U = ju(D), G = b.useRef(v), K = b.useRef(d ?? -1), ve = b.useRef(null), ie = b.useRef(!0), j = Pe((Z) => {
    c(K.current === -1 ? null : K.current, Z);
  }), F = b.useRef(!!P), te = b.useRef(V), oe = b.useRef(!1), ge = b.useRef(!1), _e = b.useRef(null), Ye = sl(A), we = sl(V), Me = sl(d), it = sl(k), pt = bs(), ke = bs(), tt = Pe(() => {
    function Z(Le) {
      S ? U?.events.emit("virtualfocus", Le) : _e.current = tu(Le, {
        sync: oe.current,
        preventScroll: !0
      });
    }
    const ce = r.current[K.current], He = ge.current;
    ce && Z(ce), (oe.current ? (Le) => Le() : (Le) => pt.request(Le))(() => {
      const Le = r.current[K.current] || ce;
      if (!Le)
        return;
      ce || Z(Le), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      Ae && (He || !ie.current) && Le.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Xe(() => {
    se.current.orientation = R;
  }, [se, R]), Xe(() => {
    f && (V && P ? (K.current = d ?? -1, G.current && d != null && (ge.current = !0, j())) : F.current && (K.current = -1, j()));
  }, [f, V, P, d, j]), Xe(() => {
    if (f) {
      if (!V) {
        oe.current = !1;
        return;
      }
      if (P)
        if (i == null) {
          if (oe.current = !1, Me.current != null)
            return;
          if (F.current && (K.current = -1, tt()), (!te.current || !F.current) && G.current && (ve.current != null || G.current === !0 && ve.current == null)) {
            let Z = 0;
            const ce = () => {
              r.current[0] == null ? (Z < 2 && (Z ? (ye) => ke.request(ye) : queueMicrotask)(ce), Z += 1) : (K.current = ve.current == null || uh(ve.current, R, y) || h ? nh(r) : mv(r), ve.current = null, j());
            };
            ce();
          }
        } else vs(r.current, i) || (K.current = i, tt(), ge.current = !1);
    }
  }, [f, V, P, i, Me, h, r, R, y, j, tt, ke]), Xe(() => {
    if (!f || P || !U || S || !F.current)
      return;
    const Z = U.nodesRef.current, ce = Z.find((Le) => Le.id === be)?.context?.elements.floating, He = Gl($t(ee ?? ce ?? null)), ye = Z.some((Le) => Le.context && ct(Le.context.elements.floating, He));
    ce && !ye && ie.current && ce.focus({
      preventScroll: !0
    });
  }, [f, P, ee, U, be, S]), Xe(() => {
    te.current = V, F.current = !!P;
  }), Xe(() => {
    V || (ve.current = null, G.current = v);
  }, [V, v]);
  const Te = i != null, Oe = Pe((Z) => {
    if (!we.current)
      return;
    const ce = r.current.indexOf(Z.currentTarget);
    ce !== -1 && (K.current !== ce || i !== ce) && (K.current = ce, j(Z));
  }), Ue = Pe(() => w ?? U?.nodesRef.current.find((Z) => Z.id === be)?.context?.dataRef?.current.orientation), Re = Pe(() => nh(r, Ye.current)), Fe = Pe((Z) => {
    if (ie.current = !1, oe.current = !0, Z.which === 229 || !we.current && Z.currentTarget === me.current)
      return;
    if (h && vT(Z.key, R, y, I)) {
      Pc(Z.key, Ue()) || An(Z), B.setOpen(!1, vt(Ih, Z.nativeEvent)), Kt(ee) && (S ? U?.events.emit("virtualfocus", ee) : ee.focus());
      return;
    }
    const ce = K.current, He = nh(r, A), ye = mv(r, A);
    if (le || (Z.key === "Home" && (An(Z), K.current = He, j(Z)), Z.key === "End" && (An(Z), K.current = ye, j(Z))), L != null) {
      const Le = L(Z, K.current, r, R, g, y, A, He, ye);
      if (Le != null && (K.current = Le, j(Z)), R === "both")
        return;
    }
    if (Pc(Z.key, R)) {
      if (An(Z), V && !S && Gl(Z.currentTarget.ownerDocument) === Z.currentTarget) {
        K.current = uh(Z.key, R, y) ? He : ye, j(Z);
        return;
      }
      uh(Z.key, R, y) ? g ? ce >= ye ? m && ce !== r.current.length ? K.current = -1 : (oe.current = !1, K.current = He) : K.current = $n(r.current, {
        startingIndex: ce,
        disabledIndices: A
      }) : K.current = Math.min(ye, $n(r.current, {
        startingIndex: ce,
        disabledIndices: A
      })) : g ? ce <= He ? m && ce !== -1 ? K.current = r.current.length : (oe.current = !1, K.current = ye) : K.current = $n(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: A
      }) : K.current = Math.max(He, $n(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: A
      })), vs(r.current, K.current) && (K.current = -1), j(Z);
    }
  }), Ae = b.useMemo(() => ({
    onFocus(ce) {
      oe.current = !0, Oe(ce);
    },
    onClick: ({
      currentTarget: ce
    }) => ce.focus({
      preventScroll: !0
    }),
    // Safari
    onMouseMove(ce) {
      Ov(ce) || (oe.current = !0, ge.current = !1, C && Oe(ce));
    },
    onPointerLeave(ce) {
      if (!we.current || !ie.current || ce.pointerType === "touch")
        return;
      oe.current = !0;
      const He = ce.relatedTarget;
      if (!(!C || r.current.includes(He)) && it.current && (_e.current?.(), _e.current = null, K.current = -1, j(ce), !S)) {
        const ye = me.current, Le = Gl($t(ye));
        ye && ct(ye, Le) && ye.focus({
          preventScroll: !0
        });
      }
    }
  }), [Oe, we, me, C, r, j, it, S]), $e = b.useMemo(() => S && V && Te && {
    "aria-activedescendant": `${O}-${i}`
  }, [S, V, Te, O, i]), nt = b.useMemo(() => ({
    "aria-orientation": R === "both" ? void 0 : R,
    ...le ? {} : $e,
    onKeyDown(Z) {
      if (Z.key === "Tab" && Z.shiftKey && V && !S) {
        const ce = _l(Z.nativeEvent);
        if (ce && !ct(me.current, ce))
          return;
        An(Z), B.setOpen(!1, vt(Mu, Z.nativeEvent)), Kt(ee) && ee.focus();
        return;
      }
      Fe(Z);
    },
    onPointerMove(Z) {
      Ov(Z) || (ie.current = !0);
    }
  }), [$e, Fe, me, R, le, B, V, S, ee]), Ke = b.useMemo(() => {
    function Z(ye) {
      B.setOpen(!0, vt(Ih, ye.nativeEvent, ye.currentTarget));
    }
    function ce(ye) {
      v === "auto" && n1(ye.nativeEvent) && (G.current = !S);
    }
    function He(ye) {
      G.current = v, v === "auto" && Am(ye.nativeEvent) && (G.current = !0);
    }
    return {
      onKeyDown(ye) {
        const Le = B.select("open");
        ie.current = !1;
        const Je = ye.key.startsWith("Arrow"), Mt = yT(ye.key, Ue(), y), Et = Pc(ye.key, R), jt = (h ? Mt : Et) || ye.key === "Enter" || ye.key.trim() === "";
        if (S && Le)
          return Fe(ye);
        if (!(!Le && !_ && Je)) {
          if (jt) {
            const Ot = Pc(ye.key, Ue());
            ve.current = h && Ot ? null : ye.key;
          }
          if (h) {
            Mt && (An(ye), Le ? (K.current = Re(), j(ye)) : Z(ye));
            return;
          }
          Et && (Me.current != null && (K.current = Me.current), An(ye), !Le && _ ? Z(ye) : Fe(ye), Le && j(ye));
        }
      },
      onFocus(ye) {
        B.select("open") && !S && (K.current = -1, j(ye));
      },
      onPointerDown: He,
      onPointerEnter: He,
      onMouseDown: ce,
      onClick: ce
    };
  }, [Fe, v, Re, h, j, B, _, R, Ue, y, Me, S]), Se = b.useMemo(() => ({
    ...$e,
    ...Ke
  }), [$e, Ke]);
  return b.useMemo(() => f ? {
    reference: Se,
    floating: nt,
    item: Ae,
    trigger: Ke
  } : {}, [f, Se, nt, Ke, Ae]);
}
function ST(n, o) {
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
  } = o, S = "rootStore" in n ? n.rootStore : n, v = S.useState("open"), C = Ga(), _ = b.useRef(""), A = b.useRef(y ?? c ?? -1), R = b.useRef(null), w = Pe((D) => {
    function L(me) {
      return i?.current[me];
    }
    function I(me) {
      const be = L(me);
      return be && !zu(be) || be?.matches(":disabled") ? !1 : d == null || !du(ci, me, d);
    }
    function B(me, be, U = 0) {
      if (me.length === 0)
        return -1;
      const G = (U % me.length + me.length) % me.length, K = be.toLowerCase();
      for (let ve = 0; ve < me.length; ve += 1) {
        const ie = (G + ve) % me.length;
        if (!(!me[ie]?.toLowerCase().startsWith(K) || !I(ie)))
          return ie;
      }
      return -1;
    }
    const V = r.current;
    if (_.current.length > 0 && D.key === " " && (An(D), m?.(!0)), _.current.length > 0 && _.current[0] !== " " && B(V, _.current) === -1 && D.key !== " " && m?.(!1), V == null || // Character key.
    D.key.length !== 1 || // Modifier key.
    D.ctrlKey || D.metaKey || D.altKey)
      return;
    v && D.key !== " " && (An(D), m?.(!0));
    const P = _.current === "";
    P && (A.current = y ?? c ?? -1), V.every((me, be) => me && I(be) ? me[0]?.toLowerCase() !== me[1]?.toLowerCase() : !0) && _.current === D.key && (_.current = "", A.current = R.current), _.current += D.key, C.start(h, () => {
      _.current = "", A.current = R.current, m?.(!1);
    });
    const fe = ((P ? y ?? c ?? -1 : A.current) ?? 0) + 1, le = B(V, _.current, fe);
    le !== -1 ? (f?.(le), R.current = le) : D.key !== " " && (_.current = "", m?.(!1));
  }), O = Pe((D) => {
    const L = D.relatedTarget, I = S.select("domReferenceElement"), B = S.select("floatingElement");
    ct(I, L) || ct(B, L) || (C.clear(), _.current = "", A.current = R.current, m?.(!1));
  });
  Xe(() => {
    !v && y !== null || (C.clear(), R.current = null, _.current !== "" && (_.current = ""));
  }, [v, y, C]);
  const k = b.useMemo(() => ({
    onKeyDown: w,
    onBlur: O
  }), [w, O]);
  return b.useMemo(() => g ? {
    reference: k,
    floating: k
  } : {}, [g, k]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = iv.startingStyle] = "startingStyle", n[n.endingStyle = iv.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const ET = {
  "data-popup-open": ""
}, CT = {
  "data-popup-open": "",
  "data-pressed": ""
}, _T = {
  "data-open": ""
}, RT = {
  "data-closed": ""
}, wT = {
  "data-anchor-hidden": ""
}, MT = {
  open(n) {
    return n ? ET : null;
  }
}, AT = {
  open(n) {
    return n ? CT : null;
  }
}, jm = {
  open(n) {
    return n ? _T : RT;
  },
  anchorHidden(n) {
    return n ? wT : null;
  }
};
({
  ...jm,
  ...Au
});
function TT(n) {
  return vm(19) ? n : n ? "true" : void 0;
}
const OT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    cutout: i,
    ...c
  } = o;
  let f;
  if (i) {
    const d = i.getBoundingClientRect();
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
function kT(n) {
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
function ui(n, o) {
  const r = b.useRef(n), i = Pe(o);
  Xe(() => {
    r.current !== n && i(r.current), r.current = n;
  }, [n, i]);
}
function NT(n, o) {
  const r = Pe((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (Ns ? "touch" : ""));
  }), {
    onClick: i,
    onPointerDown: c
  } = kT(r);
  return b.useMemo(() => ({
    onClick: i,
    onPointerDown: c
  }), [i, c]);
}
function zT(n) {
  const [o, r] = b.useState(null), i = NT(n, r);
  return ui(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: i
  }), [o, i]);
}
function DT(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function jT(n, o, r, i, c, f, d, m, g, h = 2) {
  const y = MA(r.current, {
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
  return vs(r.current, y) ? void 0 : y;
}
const S1 = /* @__PURE__ */ b.createContext(void 0), E1 = /* @__PURE__ */ b.createContext(void 0), C1 = /* @__PURE__ */ b.createContext(void 0), _1 = /* @__PURE__ */ b.createContext(!1), R1 = /* @__PURE__ */ b.createContext("");
function wl() {
  const n = b.useContext(S1);
  if (!n)
    throw new Error(So(22));
  return n;
}
function Vu() {
  const n = b.useContext(E1);
  if (!n)
    throw new Error(So(23));
  return n;
}
function zs() {
  const n = b.useContext(C1);
  if (!n)
    throw new Error(So(24));
  return n;
}
function Lm() {
  return b.useContext(R1);
}
function LT() {
  return b.useContext(_1);
}
const VT = (n, o) => Object.is(n, o);
function Ya(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function IT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((i) => i === void 0 ? !1 : Ya(o, i, r));
}
function w1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((i) => i === void 0 ? !1 : Ya(i, o, r));
}
function fh(n, o, r, i) {
  const c = i && Array.isArray(o) ? o[o.length - 1] : o, f = w1(n, c, r);
  return f === -1 ? null : f;
}
function HT(n, o, r) {
  return n.filter((i) => !Ya(o, i, r));
}
function qh(n) {
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
function Vm(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function UT(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (Vm(o)) {
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
function so(n, o) {
  if (o && n != null)
    return o(n) ?? "";
  if (n && typeof n == "object") {
    if ("label" in n && n.label != null)
      return String(n.label);
    if ("value" in n)
      return String(n.value);
  }
  return qh(n);
}
function us(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? qh(n.value) : qh(n);
}
function M1(n, o, r) {
  function i() {
    return so(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? i();
  if (Array.isArray(o)) {
    const c = o, f = Vm(c) ? c.flatMap((d) => d.items) : c;
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
function BT(n, o, r) {
  return n.reduce((i, c, f) => (f > 0 && i.push(", "), i.push(/* @__PURE__ */ x.jsx(b.Fragment, {
    children: M1(c, o, r)
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
  hasNullItemLabel: (n, o) => o ? UT(n.items) : !1,
  open: (n) => n.open,
  mounted: (n) => n.mounted,
  forceMounted: (n) => n.forceMounted,
  inline: (n) => n.inline,
  activeIndex: (n) => n.activeIndex,
  selectedIndex: (n) => n.selectedIndex,
  isActive: (n, o) => n.activeIndex === o,
  isSelected: (n, o) => {
    const r = n.isItemEqualToValue, i = n.selectedValue;
    return Array.isArray(i) ? i.some((c) => Ya(o, c, r)) : Ya(o, i, r);
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
}, GT = {
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
}, A1 = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, YT = {
  disabled: !1,
  ...A1
}, T1 = {
  valid(n) {
    return n === null ? null : n ? {
      "data-valid": ""
    } : {
      "data-invalid": ""
    };
  }
}, O1 = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: GT,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: Ft,
  disabled: void 0,
  setTouched: Ft,
  setDirty: Ft,
  setFilled: Ft,
  setFocused: Ft,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => !1,
  state: YT,
  registerFieldControl: Ft,
  validation: {
    getValidationProps: (n, o = cl) => o,
    inputRef: {
      current: null
    },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: Ft,
    getInputControl: () => null,
    commit: async () => {
    },
    change: Ft
  }
}, k1 = /* @__PURE__ */ b.createContext(O1);
function Si(n = !0) {
  const o = b.useContext(k1);
  if (o.setValidityData === Ft && !n)
    throw new Error(So(28));
  return o;
}
function N1(n, o, r, i, c = !0, f) {
  const {
    registerFieldControl: d
  } = Si(), m = Rl(() => /* @__PURE__ */ Symbol());
  Xe(() => {
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
  }, [n, c, i, o, f, d, m, r]), Xe(() => {
    const g = m.current;
    return () => {
      d(g, void 0);
    };
  }, [d, m]);
}
const qT = /* @__PURE__ */ b.createContext({
  elementRef: {
    current: null
  },
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: Ft,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: !1
  }
});
function z1() {
  return b.useContext(qT);
}
const PT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: Ft,
  labelId: void 0,
  setLabelId: Ft,
  messageIds: [],
  setMessageIds: Ft,
  getDescriptionProps: (n) => n
});
function Iu() {
  return b.useContext(PT);
}
function Im(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: i
  } = n, {
    controlId: c,
    registerControlId: f
  } = Iu(), d = wu(o), m = r ? c : void 0, g = Rl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), y = b.useRef(o != null), S = Pe(() => {
    !h.current || f === Ft || (h.current = !1, f(g.current, void 0));
  });
  return Xe(() => {
    if (f === Ft)
      return;
    let v;
    if (r) {
      const C = i?.current;
      fn(C) && C.closest("label") != null ? v = o ?? null : v = m ?? d;
    } else if (o != null)
      y.current = !0, v = o;
    else if (y.current)
      v = d;
    else {
      S();
      return;
    }
    if (v === void 0) {
      S();
      return;
    }
    h.current = !0, f(g.current, v);
  }, [o, i, m, f, r, d, g, S]), b.useEffect(() => S, [S]), c ?? d;
}
function D1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function XT(n, o) {
  return (r, i) => r == null ? !1 : n.contains(r, i, o);
}
function j1(n) {
  return Array.isArray(n) ? n.map((o) => j1(o)).join(",") : n == null ? "" : String(n);
}
const kv = /* @__PURE__ */ new Map();
function FT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${j1(n.locale)}|${JSON.stringify(o)}`, i = kv.get(r);
  if (i)
    return i;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, m, g) {
      if (!m)
        return !0;
      const h = so(d, g);
      for (let y = 0; y <= h.length - m.length; y += 1)
        if (c.compare(h.slice(y, y + m.length), m) === 0)
          return !0;
      return !1;
    },
    startsWith(d, m, g) {
      if (!m)
        return !0;
      const h = so(d, g);
      return c.compare(h.slice(0, m.length), m) === 0;
    },
    endsWith(d, m, g) {
      if (!m)
        return !0;
      const h = so(d, g), y = m.length;
      return h.length >= y && c.compare(h.slice(h.length - y), m) === 0;
    }
  };
  return kv.set(r, f), f;
}
const KT = FT;
function QT(n, o = !1) {
  const {
    overflowY: r
  } = ul(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function ZT(n, o, r = (i, c) => i === c) {
  return n.length === o.length && n.every((i, c) => r(i, o[c]));
}
const L1 = /* @__PURE__ */ Symbol("none"), dh = {
  value: L1,
  index: -1
}, $T = /* @__PURE__ */ b.createContext(void 0);
function Hm() {
  return b.useContext($T)?.direction ?? "ltr";
}
function JT(n) {
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
    onItemHighlighted: S,
    name: v,
    form: C,
    disabled: _ = !1,
    readOnly: A = !1,
    required: R = !1,
    inputRef: w,
    grid: O = !1,
    items: k,
    filteredItems: D,
    filter: L,
    openOnInputClick: I = !0,
    autoHighlight: B = !1,
    keepHighlight: V = !1,
    highlightItemOnHover: P = !0,
    loopFocus: ee = !0,
    itemToStringLabel: se,
    itemToStringValue: fe,
    isItemEqualToValue: le = VT,
    virtualized: me = !1,
    inline: be = !1,
    fillInputOnItemPress: U = !0,
    modal: G = !1,
    limit: K = -1,
    autoComplete: ve = "list",
    formAutoComplete: ie,
    locale: j,
    submitOnItemClick: F = !1
  } = n, {
    clearErrors: te
  } = z1(), {
    setDirty: oe,
    validityData: ge,
    setFilled: _e,
    name: Ye,
    disabled: we,
    setTouched: Me,
    setFocused: it,
    validationMode: pt,
    validation: ke
  } = Si(), tt = Hm(), Te = Im({
    id: o
  }), Oe = KT({
    locale: j
  }), [Ue, Re] = b.useState(!1), [Fe, Ae] = b.useState(null), $e = b.useRef([]), nt = b.useRef([]), Ke = b.useRef(null), Se = b.useRef(null), Z = b.useRef(null), ce = b.useRef(null), He = b.useRef(null), ye = b.useRef(!0), Le = b.useRef(!1), Je = b.useRef(null), Mt = b.useRef(null), Et = b.useRef(null), jt = b.useRef(dh), Ot = b.useRef(null), xt = b.useRef([]), an = b.useRef(null), dt = we || _, mn = Ye ?? v, Qt = y === "multiple", tn = y === "single", St = m !== void 0 || d !== void 0, Jt = k !== void 0, at = D !== void 0;
  let lt;
  B === "always" ? lt = "always" : lt = B ? "input-change" : !1;
  const [We, Wt] = Wc({
    controlled: c,
    default: Qt ? i ?? ci : i,
    name: "Combobox",
    state: "selectedValue"
  }), Rn = b.useMemo(() => L === null ? () => !0 : L !== void 0 ? L : XT(Oe, se), [L, Oe, se]), qt = Rl(() => St ? d ?? "" : tn ? so(We, se) : "").current, [Bt, Pn] = Wc({
    controlled: m,
    default: qt,
    name: "Combobox",
    state: "inputValue"
  }), [kt, uo] = Wc({
    controlled: g,
    default: h,
    name: "Combobox",
    state: "open"
  }), Xn = Vm(k), rn = Fe ?? String(Bt).trim(), fo = tn ? so(We, se) : "", Ml = tn && !Ue && rn !== "" && fo.length === rn.length && Oe.contains(fo, rn), Jn = Ml ? "" : rn, Eo = Jt && at && Ml, En = b.useMemo(() => k ? Xn ? k.flatMap((M) => M.items) : k : ci, [k, Xn]), At = b.useMemo(() => {
    if (D && !Eo)
      return D;
    if (!k)
      return ci;
    if (Xn) {
      const z = k, q = [];
      let Q = 0;
      for (const ne of z) {
        if (K > -1 && Q >= K)
          break;
        const re = K > -1 ? K - Q : 1 / 0, de = Jn === "" ? ne.items.slice(0, re) : [];
        if (Jn !== "")
          for (const Ce of ne.items) {
            if (de.length >= re)
              break;
            Rn(Ce, Jn, se) && de.push(Ce);
          }
        if (de.length > 0) {
          const Ce = {
            ...ne,
            items: de
          };
          q.push(Ce), Q += de.length;
        }
      }
      return q;
    }
    if (Jn === "")
      return K > -1 ? En.slice(0, K) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        En
      );
    const M = [];
    for (const z of En) {
      if (K > -1 && M.length >= K)
        break;
      Rn(z, Jn, se) && M.push(z);
    }
    return M;
  }, [D, Eo, k, Xn, Jn, K, Rn, se, En]), Ct = b.useMemo(() => Xn ? At.flatMap((z) => z.items) : At, [At, Xn]), Ge = Rl(() => {
    let M = null;
    return be && kt && Jt && y !== "none" && (M = fh(Ct, We, le, Qt)), new x1({
      id: Te,
      labelId: void 0,
      selectedValue: We,
      open: kt,
      items: k,
      selectionMode: y,
      listRef: $e,
      labelsRef: nt,
      popupRef: Ke,
      emptyRef: He,
      inputRef: Se,
      startDismissRef: Z,
      endDismissRef: ce,
      keyboardActiveRef: ye,
      chipsContainerRef: Je,
      clearRef: Mt,
      valuesRef: xt,
      pointerDownItemRef: an,
      selectionEventRef: Et,
      name: mn,
      form: C,
      disabled: dt,
      readOnly: A,
      required: R,
      grid: O,
      virtualized: me,
      openOnInputClick: I,
      itemToStringLabel: se,
      isItemEqualToValue: le,
      modal: G,
      autoHighlight: lt,
      submitOnItemClick: F,
      hasInputValue: St,
      mounted: !1,
      forceMounted: !1,
      transitionStatus: "idle",
      inline: be,
      activeIndex: null,
      selectedIndex: M,
      popupProps: {},
      listProps: {},
      inputProps: {},
      triggerProps: {},
      itemProps: cl,
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
      onOpenChangeComplete: Ft,
      setOpen: Ft,
      setInputValue: Ft,
      setSelectedValue: Ft,
      setIndices: Ft,
      handleSelection: Ft,
      forceMount: Ft,
      requestSubmit: Ft
    });
  }).current, Ln = y === "none" ? Bt : We, wr = b.useMemo(() => y === "none" ? Ln : Array.isArray(We) ? We.map((M) => us(M, fe)) : us(We, fe), [Ln, fe, y, We]), Mr = Pe(S), Co = Pe(r), Al = xe(Ge, Ee.activeIndex), rt = xe(Ge, Ee.selectedIndex), fl = xe(Ge, Ee.positionerElement), Tl = xe(Ge, Ee.listElement), Vn = xe(Ge, Ee.triggerElement), In = xe(Ge, Ee.inputElement), en = xe(Ge, Ee.inputGroupElement), pn = xe(Ge, Ee.inline), Hn = xe(Ge, Ee.inputInsidePopup), Ol = xe(Ge, Ee.inputOwnsFormValue), Ql = sl(Vn), {
    mounted: _o,
    setMounted: Ar,
    transitionStatus: Zl
  } = Mm(kt), {
    openMethod: Ro,
    triggerProps: kl
  } = zT(kt), ea = Pe(() => wr);
  N1(Hn ? Ql : Se, Te, Ln, ea, !dt, v);
  const Wn = Pe(() => {
    k ? nt.current = Ct.map((M) => so(M, se)) : Ge.set("forceMounted", !0);
  }), nn = Pe((M, z, q) => {
    if (z === -1) {
      if (jt.current === dh)
        return;
      jt.current = dh;
    } else
      jt.current = {
        value: M,
        index: z
      };
    Mr(M, JM(q, void 0, {
      index: z
    }));
  }), Fn = Pe((M) => {
    Ge.update(M);
    const z = M.activeIndex;
    if (z === void 0)
      return;
    const q = M.type || Yl;
    z === null ? nn(void 0, -1, q) : nn(xt.current[z], z, q);
  }), Kn = Pe((M, z) => {
    if (Le.current = z.reason === yo, n.onInputValueChange?.(M, z), !z.isCanceled) {
      if (z.reason === ps) {
        kt && Fe !== null && Ae(null);
        const q = z.event, Q = q.inputType;
        if (q.type === "compositionend" || Q != null && Q !== "" && Q !== "insertReplacementText") {
          const re = M.trim() !== "";
          re && Re(!0), Ot.current = {
            hasQuery: re
          };
          const de = Ge.state.listElement;
          if (!Ge.state.virtualized && de) {
            const Ce = Ke.current;
            for (const ze of bi(de.firstElementChild ?? de)) {
              if (!Kt(ze) || (Ce ? !ct(Ce, ze) : ze.getAttribute("role") === "dialog"))
                break;
              if (QT(ze)) {
                ze.scrollTop = 0;
                break;
              }
            }
          }
          re && lt && Ge.state.activeIndex == null && (kt || pn) && Ge.set("activeIndex", 0);
        }
      } else z.reason === yo && M === "" && Ge.state.inputInsidePopup && (Ot.current = {
        hasQuery: !1,
        selection: !0
      });
      Pn(M);
    }
  }), $l = Pe((M, z) => {
    if (kt !== M && (z.reason === _m && Jt && Ct.length === 0 && !He.current && z.allowPropagation(), n.onOpenChange?.(M, z), !z.isCanceled && (M && Hn && !pn && Fe !== null && (Re(!1), Ae(null), Bt !== "" && z.reason !== ps && Kn("", vt(yo, z.event))), !M && Ue && (tn ? (pn || Ae(rn), rn === "" && Re(!1)) : Qt && (pn || Ae(rn), Hn && Fn({
      activeIndex: null
    }), (!Hn || pn) && Kn("", vt(yo, z.event)))), uo(M), !M && Hn && (z.reason === Mu || z.reason === Cm) && (Me(!0), it(!1), pt === "onBlur")))) {
      const q = y === "none" ? Bt : We;
      ke.commit(q);
    }
  }), wo = Pe((M, z) => {
    if (f?.(M, z), z.isCanceled)
      return;
    Wt(M), (y === "none" && Ke.current && U || tn && !Ge.state.inputInsidePopup) && Kn(so(M, se), vt(z.reason, z.event));
  }), Mo = Pe((M, z) => {
    const q = _l(M), Q = Et.current ?? M;
    Et.current = null;
    const ne = vt(KM, Q), re = q?.closest("a")?.getAttribute("href");
    if (re) {
      re.startsWith("#") && $l(!1, ne);
      return;
    }
    if (Qt) {
      const de = Array.isArray(We) ? We : [], ze = IT(de, z, le) ? HT(de, z, le) : [...de, z];
      if (wo(ze, ne), ne.isCanceled || !(Se.current ? Se.current.value.trim() !== "" : !1))
        return;
      Ge.state.inputInsidePopup ? Kn("", vt(yo, ne.event)) : $l(!1, ne);
    } else {
      if (wo(z, ne), ne.isCanceled)
        return;
      $l(!1, ne);
    }
  }), Jl = Pe(() => {
    const M = ke.inputRef.current?.form ?? Ge.state.inputElement?.form;
    M && typeof M.requestSubmit == "function" && M.requestSubmit();
  }), Gt = Pe(() => {
    if (Ar(!1), Co?.(!1), Re(!1), Ae(null), Fn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), Qt && Se.current && Se.current.value !== "" && !Le.current && Kn("", vt(yo)), tn)
      if (Ge.state.inputInsidePopup)
        Se.current && Se.current.value !== "" && Kn("", vt(yo));
      else {
        const M = so(We, se);
        Se.current && Se.current.value !== M && Kn(M, vt(M === "" ? yo : Yl));
      }
  }), Ao = b.useMemo(() => pn && fl ? {
    current: fl.closest('[role="dialog"]')
  } : Ke, [pn, fl]);
  Tu({
    enabled: !n.actionsRef,
    open: kt,
    ref: Ao,
    onComplete() {
      kt || Gt();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: Gt
  }), [Gt]), Xe(function() {
    if (kt || (an.current = null, y === "none"))
      return;
    const z = Jt ? En : xt.current;
    Fn({
      selectedIndex: fh(z, We, le, Qt)
    });
  }, [kt, We, y, Qt, Jt, En, le, Fn]), Xe(() => {
    k && (xt.current = Ct, $e.current.length = Ct.length);
  }, [k, Ct]), Xe(() => {
    const M = Ot.current;
    if (M) {
      const Ce = kt || pn || Ge.state.positionerElement?.hidden === !1;
      if (M.hasQuery)
        lt && Ce && Ge.set("activeIndex", 0), Ot.current = null;
      else if (String(Bt).trim() === "" && (Ot.current = null, Ce)) {
        const ze = M.selection;
        lt === "always" && !ze && Ge.state.selectionMode === "none" && Ge.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ge.state.open && !Ge.state.inline || Se.current && Se.current.value.trim() !== "")
            return;
          const Qe = Ge.state.selectedValue, Ie = Ge.state.selectionMode === "multiple", Ne = Ie && Array.isArray(Qe) ? Qe[Qe.length - 1] : Qe, Nt = Ge.state.selectionMode !== "none" && Ne != null;
          if (Nt || ze) {
            const sn = Jt || at ? Ct : xt.current;
            Ge.set("activeIndex", Nt ? fh(sn, Qe, Ge.state.isItemEqualToValue, Ie) : null);
          } else lt === "always" && Ge.set("activeIndex", 0);
        });
      }
    }
    if (!kt && !pn)
      return;
    const q = Jt || at ? Ct : xt.current, Q = Ge.state.activeIndex;
    if (Q == null) {
      if (lt === "always" && q.length > 0) {
        Ge.set("activeIndex", 0);
        return;
      }
      nn(void 0, -1, Yl);
      return;
    }
    if (Q >= q.length) {
      nn(void 0, -1, Yl), Ge.set("activeIndex", null);
      return;
    }
    const ne = q[Q], re = jt.current.value, de = re !== L1 && Ya(ne, re, Ge.state.isItemEqualToValue);
    (jt.current.index !== Q || !de) && nn(ne, Q, Yl);
  }, [
    Al,
    lt,
    nn,
    at,
    Jt,
    Ct,
    pn,
    kt,
    Ge,
    // Reruns the effect when the query changes without affecting the deps above, such as
    // clearing the input when no items are filtered out (individually rendered items).
    Bt
  ]), Xe(() => {
    if (y === "none") {
      _e(String(Bt) !== "");
      return;
    }
    _e(Qt ? Array.isArray(We) && We.length > 0 : We != null);
  }, [_e, y, Bt, We, Qt]), b.useEffect(() => {
    Jt && lt && Ct.length === 0 && Fn({
      activeIndex: null
    });
  }, [Jt, lt, Ct.length, Fn]);
  function Tr(M) {
    const z = ge.initialValue;
    return Array.isArray(M) && Array.isArray(z) ? !ZT(M, z, (q, Q) => Ya(q, Q, le)) : M !== z;
  }
  ui(rn, () => {
    !kt || rn === "" || rn === String(qt) || Re(!0);
  });
  function ta() {
    const M = so(We, se);
    Bt !== M && Kn(M, vt(Yl));
  }
  ui(We, () => {
    y !== "none" && (te(mn), oe(Tr(We)), ke.change(We), tn && !St && !Hn && ta());
  }), ui(Bt, () => {
    y === "none" && (te(mn), oe(Bt !== ge.initialValue), ke.change(Bt));
  }), ui(k, () => {
    !tn || St || Hn || Ue || ta();
  });
  const dl = mT({
    open: pn ? !0 : kt,
    onOpenChange: $l,
    elements: {
      reference: Hn ? Vn : In,
      floating: fl
    }
  }), Fa = O ? "grid" : "listbox", To = kt || pn, Wl = To ? "true" : "false", na = b.useMemo(() => {
    const M = In?.tagName === "INPUT", z = In == null || M, q = z || To, Q = z ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return q && (Q.role = "combobox", Q["aria-expanded"] = Wl, Q["aria-haspopup"] = Fa, Q["aria-controls"] = To ? Tl?.id : void 0, Q["aria-autocomplete"] = ve), {
      reference: Q,
      floating: {
        role: "presentation"
      }
    };
  }, [In, To, Wl, Fa, Tl?.id, ve]), Ka = y1(dl, {
    enabled: !A && !dt && I,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Hn ? 0 : 100,
    reason: ZM
  }), Oo = JA(dl, {
    enabled: !A && !dt && !pn,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: pn ? !0 : void 0,
    outsidePress(M) {
      const z = _l(M);
      return !ct(Vn, z) && !ct(Mt.current, z) && !ct(Je.current, z) && !ct(en, z);
    }
  }), Nl = xT(dl, {
    enabled: !A && !dt,
    id: Te,
    listRef: $e,
    activeIndex: Al,
    selectedIndex: rt,
    virtual: !0,
    loopFocus: ee,
    allowEscape: ee && !lt,
    focusItemOnOpen: Ue || y === "none" && !lt ? !1 : "auto",
    focusItemOnHover: P,
    resetOnPointerLeave: !V,
    orientation: O ? "horizontal" : void 0,
    rtl: tt === "rtl",
    disabledIndices: ci,
    grid: O ? jT : void 0,
    onNavigate(M, z) {
      !z && !kt || Zl === "ending" || Fn(z ? {
        activeIndex: M,
        type: ye.current ? Rm : wm
      } : {
        activeIndex: M
      });
    }
  }), la = b.useMemo(() => hi(Nl.reference, {
    onKeyDown(M) {
      O && Ge.state.activeIndex == null && (M.key === "ArrowLeft" || M.key === "ArrowRight") && M.preventBaseUIHandler();
    }
  }, Oo.reference, Ka.reference, na.reference), [Nl.reference, Oo.reference, Ka.reference, na.reference, O, Ge]), hl = b.useMemo(() => hi(dT, Oo.floating), [Oo.floating]), eo = b.useMemo(() => hi(Nl.floating, na.floating), [Nl.floating, na.floating]), Ht = b.useMemo(() => {
    const M = Nl.item;
    return M ? {
      ...M,
      onFocus: void 0
    } : cl;
  }, [Nl.item]);
  DT(() => {
    Ge.update({
      inline: be,
      popupProps: hl,
      listProps: eo,
      inputProps: la,
      triggerProps: kl,
      itemProps: Ht,
      setOpen: $l,
      setInputValue: Kn,
      setSelectedValue: wo,
      setIndices: Fn,
      handleSelection: Mo,
      forceMount: Wn,
      requestSubmit: Jl,
      onOpenChangeComplete: Co
    });
  }), Xe(() => {
    Ge.update({
      id: Te,
      selectedValue: We,
      open: kt,
      mounted: _o,
      transitionStatus: Zl,
      items: k,
      inline: be,
      popupProps: hl,
      listProps: eo,
      inputProps: la,
      triggerProps: kl,
      openMethod: Ro,
      itemProps: Ht,
      selectionMode: y,
      name: mn,
      form: C,
      disabled: dt,
      readOnly: A,
      required: R,
      grid: O,
      virtualized: me,
      openOnInputClick: I,
      itemToStringLabel: se,
      modal: G,
      autoHighlight: lt,
      isItemEqualToValue: le,
      submitOnItemClick: F,
      hasInputValue: St,
      inputOwnsFormValue: y === "none" && (be || !Ge.state.inputInsidePopup)
    });
  }, [Ge, Te, We, kt, _o, Zl, k, hl, eo, la, Ht, Ro, kl, y, mn, dt, A, R, O, me, I, se, G, le, F, St, be, lt, C]);
  const ko = br(w, ke.inputRef), to = b.useMemo(() => ({
    query: rn,
    hasItems: Jt,
    filteredItems: At,
    flatFilteredItems: Ct
  }), [rn, Jt, At, Ct]), zl = b.useMemo(() => Array.isArray(Ln) ? "" : us(Ln, fe), [Ln, fe]), no = Qt && Array.isArray(We) && We.length > 0, oa = Qt || y === "none" && Ol ? void 0 : mn, T = b.useMemo(() => !Qt || !Array.isArray(We) || !mn ? null : We.map((M) => {
    const z = us(M, fe);
    return /* @__PURE__ */ x.jsx("input", {
      type: "hidden",
      form: C,
      name: mn,
      value: z,
      disabled: dt
    }, z);
  }), [Qt, We, C, mn, fe, dt]), N = /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ x.jsx("input", {
      ...ke.getValidationProps(dt, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (Hn) {
            Vn?.focus();
            return;
          }
          (Se.current || Vn)?.focus();
        },
        // Handle browser autofill.
        onChange(M) {
          if (M.nativeEvent.defaultPrevented || dt || A)
            return;
          const z = M.currentTarget.value, q = z.toLowerCase(), Q = vt(Yl, M.nativeEvent), ne = () => xt.current.findIndex((de) => us(de, fe).toLowerCase() === q || so(de, se).toLowerCase() === q);
          function re() {
            if (Qt)
              return;
            if (y === "none") {
              Kn(z, Q);
              return;
            }
            let de = ne();
            de === -1 && (de = xt.current.findIndex((ze, Qe) => {
              const Ie = nt.current[Qe];
              return Ie != null && Ie.toLowerCase() === q;
            }));
            const Ce = de === -1 ? void 0 : xt.current[de];
            Ce != null && wo?.(Ce, Q);
          }
          tn && (Wn(), k && ne() === -1 && Ge.set("forceMounted", !0)), queueMicrotask(re);
        }
      }),
      id: Te && oa == null ? `${Te}-hidden-input` : void 0,
      form: C,
      name: oa,
      autoComplete: ie,
      disabled: dt,
      required: R && !no,
      readOnly: A,
      value: zl,
      ref: ko,
      style: oa ? Nm : km,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), T]
  });
  return /* @__PURE__ */ x.jsx(S1.Provider, {
    value: Ge,
    children: /* @__PURE__ */ x.jsx(E1.Provider, {
      value: dl,
      children: /* @__PURE__ */ x.jsx(_1.Provider, {
        value: Jt,
        children: /* @__PURE__ */ x.jsx(C1.Provider, {
          value: to,
          children: /* @__PURE__ */ x.jsx(R1.Provider, {
            value: Bt,
            children: N
          })
        })
      })
    })
  });
}
const V1 = {
  ...AT,
  ...T1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Xc = 5;
function WT(n, o) {
  const r = eO(o);
  return n.clientX >= r.left - Xc && n.clientX <= r.right + Xc && n.clientY >= r.top - Xc && n.clientY <= r.bottom + Xc;
}
function eO(n) {
  const o = n.getBoundingClientRect(), r = dn(n);
  if (t1)
    return o;
  const i = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(i.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(i.width) || 0, m = parseFloat(i.height) || 0, g = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, y = Math.max(o.width, d, g), S = Math.max(o.height, m, h), v = y - o.width, C = S - o.height;
  return {
    left: o.left - v / 2,
    right: o.right + v / 2,
    top: o.top - C / 2,
    bottom: o.bottom + C / 2
  };
}
function tO(n, o) {
  return n ?? o;
}
function I1(n) {
  const o = xe(n, Ee.mounted), r = xe(n, Ee.popupSide), i = xe(n, Ee.positionerElement);
  return o && i ? r : null;
}
function Hu() {
  return zs().filteredItems.length === 0;
}
function nO(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function lO(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function H1(n, o, r) {
  const i = n.state.listRef.current[o];
  i && (n.state.selectionEventRef.current = r, i.click(), n.state.selectionEventRef.current = null);
}
const oO = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
    disabled: S,
    setTouched: v,
    setFocused: C,
    validationMode: _,
    validation: A
  } = Si(), {
    labelId: R
  } = Iu(), w = wl(), O = xe(w, Ee.selectionMode), k = xe(w, Ee.disabled), D = xe(w, Ee.readOnly), L = xe(w, Ee.required), I = xe(w, Ee.positionerElement), B = xe(w, Ee.listElement), V = xe(w, Ee.popupId), P = xe(w, Ee.triggerProps), ee = xe(w, Ee.inputInsidePopup), se = xe(w, Ee.id), fe = xe(w, Ee.labelId), le = xe(w, Ee.open), me = xe(w, Ee.selectedValue), be = xe(w, Ee.activeIndex), U = xe(w, Ee.selectedIndex), G = xe(w, Ee.hasSelectedValue), K = Vu(), ve = Lm(), ie = Ga(), j = S || k || d, F = Hu(), te = I1(w);
  Im({
    id: ee ? m : void 0
  });
  const oe = ee ? m ?? se : m, ge = tO(R, fe);
  let _e;
  le && ee ? _e = V ?? D1(se) : le && (_e = B?.id);
  const Ye = b.useRef("");
  function we(Ue) {
    Ye.current = Ue.pointerType;
  }
  const {
    reference: Me
  } = ST(K, {
    enabled: !le && !D && !k && O === "single",
    listRef: w.state.labelsRef,
    activeIndex: be,
    selectedIndex: U,
    onMatch(Ue) {
      const Re = w.state.valuesRef.current[Ue];
      Re !== void 0 && w.state.setSelectedValue(Re, vt(Yl));
    }
  }), {
    reference: it
  } = y1(K, {
    enabled: !D && !k,
    event: "mousedown"
  }), {
    buttonRef: pt,
    getButtonProps: ke
  } = ks({
    native: f,
    disabled: j
  }), tt = {
    ...y,
    open: le,
    disabled: j,
    popupSide: te,
    listEmpty: F,
    placeholder: O === "none" ? !1 : !G
  }, Te = Pe((Ue) => {
    w.set("triggerElement", Ue);
  });
  return Kl("button", o, {
    ref: [r, pt, Te],
    state: tt,
    props: [P, it, Me, {
      id: oe,
      tabIndex: ee ? 0 : -1,
      role: ee ? "combobox" : void 0,
      "aria-expanded": le,
      "aria-haspopup": ee ? "dialog" : "listbox",
      "aria-controls": _e,
      "aria-required": ee && L || void 0,
      "aria-labelledby": ge,
      onPointerDown: we,
      onPointerEnter: we,
      onFocus() {
        C(!0), !(j || D) && ie.start(0, w.state.forceMount);
      },
      onBlur(Ue) {
        if (!ct(I, Ue.relatedTarget) && (v(!0), C(!1), _ === "onBlur")) {
          const Re = O === "none" ? ve : me;
          A.commit(Re);
        }
      },
      onMouseDown(Ue) {
        if (j || D || (ee || K.set("domReferenceElement", Ue.currentTarget), w.state.forceMount(), Ye.current !== "touch" && (w.state.inputRef.current?.focus(), ee || Ue.preventDefault()), le))
          return;
        const Re = $t(Ue.currentTarget);
        function Fe(Ae) {
          const $e = w.state.triggerElement;
          if (!$e)
            return;
          const nt = _l(Ae), Ke = w.state.positionerElement, Se = w.state.listElement;
          ct($e, nt) || ct(Ke, nt) || ct(Se, nt) || WT(Ae, $e) || w.state.setOpen(!1, vt($M, Ae));
        }
        ee && Re.addEventListener("mouseup", Fe, {
          once: !0
        });
      },
      onKeyDown(Ue) {
        D || (Ue.key === "ArrowDown" || Ue.key === "ArrowUp") && (An(Ue), w.state.setOpen(!0, vt(Ih, Ue.nativeEvent)), w.state.inputRef.current?.focus());
      }
    }, A.getValidationProps(j, h), ke],
    stateAttributesMapping: V1
  });
}), aO = /* @__PURE__ */ b.createContext(void 0);
function rO() {
  return b.useContext(aO);
}
const U1 = /* @__PURE__ */ b.createContext(void 0);
function Um(n) {
  const o = b.useContext(U1);
  if (o === void 0 && !n)
    throw new Error(So(21));
  return o;
}
const B1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const i = wl(), {
    buttonRef: c,
    getButtonProps: f
  } = ks({
    native: !1
  }), d = br(r, c);
  function m(h) {
    i.state.setOpen(!1, vt(QM, h.nativeEvent, h.currentTarget));
  }
  const g = f({
    onClick: m
  });
  return /* @__PURE__ */ x.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Nm
  });
}), iO = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
    setTouched: S,
    setFocused: v,
    validationMode: C,
    validation: _
  } = Si(), {
    labelId: A
  } = Iu(), R = rO(), O = !!Um(!0), k = wl(), D = Lm(), L = Hm(), I = xe(k, Ee.required), B = xe(k, Ee.disabled), V = xe(k, Ee.readOnly), P = xe(k, Ee.name), ee = xe(k, Ee.form), se = xe(k, Ee.selectionMode), fe = xe(k, Ee.autoHighlight), le = xe(k, Ee.inputProps), me = xe(k, Ee.triggerProps), be = xe(k, Ee.open), U = xe(k, Ee.mounted), G = xe(k, Ee.selectedValue), K = xe(k, Ee.id), ve = xe(k, Ee.inline), ie = xe(k, Ee.modal), j = !!fe, F = I1(k), te = y || B || f, oe = Hu(), ge = O || ve, _e = !ge || ie, Ye = wu(d ?? (ge ? void 0 : K)), we = O ? A1 : h, [Me, it] = b.useState(null), pt = b.useRef(!1), ke = b.useRef(null), tt = b.useRef(!1), Te = se === "none" && !O, Oe = Pe((Se) => {
    const Z = O || k.state.inline;
    Z && !k.state.hasInputValue && k.state.setInputValue("", vt(Yl)), k.update({
      inputElement: Se,
      inputInsidePopup: Z,
      inputOwnsFormValue: Te
    });
  }), Ue = O ? g : _.getValidationProps(te, g);
  function Re() {
    k.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: k.state.keyboardActiveRef.current ? Rm : wm
    });
  }
  function Fe() {
    k.state.keyboardActiveRef.current = !1;
  }
  const Ae = {
    ...we,
    open: be,
    disabled: te,
    readOnly: V,
    popupSide: F,
    listEmpty: oe
  };
  function $e(Se) {
    if (!R)
      return;
    let Z;
    const {
      highlightedChipIndex: ce
    } = R, He = R.chipsRef.current.length, [ye, Le] = nO(L);
    return ce !== void 0 ? (Se.key === ye ? (Se.preventDefault(), ce > 0 ? Z = ce - 1 : Z = void 0) : Se.key === Le ? (Se.preventDefault(), ce < He - 1 ? Z = ce + 1 : Z = void 0) : (Se.key === "Backspace" || Se.key === "Delete") && (Se.preventDefault(), Z = lO(ce, G.length), Re()), Z) : (Se.key === ye && (Se.currentTarget.selectionStart ?? 0) === 0 && G.length > 0 && (Se.preventDefault(), Z = He > 0 ? He - 1 : void 0), Z);
  }
  const nt = Kl("input", o, {
    state: Ae,
    ref: [r, k.state.inputRef, Oe],
    props: [le, me, {
      value: Me ?? D,
      "aria-readonly": V || void 0,
      "aria-required": I || void 0,
      "aria-labelledby": A,
      disabled: te,
      readOnly: V,
      required: se === "none" ? I : void 0,
      form: ee,
      ...Te && P && {
        name: P
      },
      id: Ye,
      onFocus() {
        if (v(!0), !ve || !tt.current)
          return;
        tt.current = !1;
        const Se = ke.current;
        Se == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(k.state.valuesRef.current, Se) || k.state.setIndices({
          activeIndex: Se
        });
      },
      onBlur() {
        S(!0), v(!1);
        const Se = k.state.activeIndex;
        if (ve && Se !== null && fe !== "always" && (ke.current = Se, tt.current = !0, k.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const Z = se === "none" ? D : G;
          _.commit(Z);
        }
      },
      onCompositionStart(Se) {
        uu || (pt.current = !0, it(Se.currentTarget.value));
      },
      onCompositionEnd(Se) {
        pt.current = !1;
        const Z = Se.currentTarget.value;
        it(null), k.state.setInputValue(Z, vt(ps, Se.nativeEvent));
      },
      onChange(Se) {
        const Z = Se.nativeEvent, ce = Z.inputType, He = !ce || ce === "insertReplacementText", ye = pt.current || !He;
        function Le(jt) {
          V || te || !jt || !ye || (k.state.setOpen(!0, vt(ps, Z)), j || Re());
        }
        if (pt.current) {
          const jt = Se.currentTarget.value;
          it(jt), jt === "" && !k.state.openOnInputClick && !k.state.inputInsidePopup && k.state.setOpen(!1, vt(yo, Z));
          const Ot = jt.trim(), xt = j && Ot !== "";
          Le(Ot), be && k.state.activeIndex !== null && !xt && Re();
          return;
        }
        const Je = vt(ps, Z);
        if (k.state.setInputValue(Se.currentTarget.value, Je), Je.isCanceled)
          return;
        const Mt = Se.currentTarget.value === "", Et = vt(yo, Z);
        Mt && !k.state.inputInsidePopup && (se === "single" && k.state.setSelectedValue(null, Et), k.state.openOnInputClick || k.state.setOpen(!1, Et)), Le(Se.currentTarget.value.trim()), be && k.state.activeIndex !== null && !j && Re();
      },
      onKeyDown(Se) {
        if (te || V || Se.ctrlKey || Se.shiftKey || Se.altKey || Se.metaKey)
          return;
        k.state.keyboardActiveRef.current = !0;
        const Z = Se.currentTarget, ce = Z.scrollWidth - Z.clientWidth, He = L === "rtl";
        if (Se.key === "Home") {
          An(Se);
          const Je = cv && He ? Z.value.length : 0;
          Z.setSelectionRange(Je, Je), Z.scrollLeft = 0;
          return;
        }
        if (Se.key === "End") {
          An(Se);
          const Je = cv && He ? 0 : Z.value.length;
          Z.setSelectionRange(Je, Je), Z.scrollLeft = He ? -ce : ce;
          return;
        }
        if (!U && Se.key === "Escape") {
          const Je = se === "multiple" && Array.isArray(G) ? G.length === 0 : G === null, Mt = vt(_m, Se.nativeEvent), Et = se === "multiple" ? [] : null;
          k.state.setInputValue("", Mt), k.state.setSelectedValue(Et, Mt), !Je && !k.state.inline && !Mt.isPropagationAllowed && Se.stopPropagation();
          return;
        }
        if (R && Se.key === "Backspace" && Z.value === "" && R.highlightedChipIndex === void 0 && Array.isArray(G) && G.length > 0) {
          const Je = R.chipsRef.current.length, Mt = Je > 0 ? Je - 1 : G.length - 1, Et = G.filter((jt, Ot) => Ot !== Mt);
          Re(), k.state.setSelectedValue(Et, vt(Yl, Se.nativeEvent));
          return;
        }
        const ye = R?.highlightedChipIndex !== void 0, Le = $e(Se);
        if (R?.setHighlightedChipIndex(Le), Le !== void 0 ? R?.chipsRef.current[Le]?.focus() : ye && k.state.inputRef.current?.focus(), Se.which !== 229 && Se.key === "Enter" && be) {
          const Je = k.state.activeIndex, Mt = Se.nativeEvent;
          if (Je === null) {
            if (ve)
              return;
            k.state.setOpen(!1, vt(Yl, Mt));
            return;
          }
          An(Se), H1(k, Je, Mt);
        }
      },
      onPointerMove: Fe,
      onPointerDown: Fe
    }, Ue],
    stateAttributesMapping: V1
  }), Ke = O ? /* @__PURE__ */ x.jsx(k1.Provider, {
    value: O1,
    children: nt
  }) : nt;
  return /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [be && _e && /* @__PURE__ */ x.jsx(B1, {
      ref: k.state.startDismissRef
    }), Ke]
  });
}), sO = {
  ...Au,
  ...MT
}, cO = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
  } = Si(), S = wl(), v = xe(S, Ee.selectionMode), C = xe(S, Ee.disabled), _ = xe(S, Ee.readOnly), A = xe(S, Ee.open), R = xe(S, Ee.selectedValue), w = xe(S, Ee.hasSelectionChips), O = Lm();
  let k = !1;
  v === "none" ? k = O !== "" : v === "single" ? k = R != null : k = w;
  const D = y || C || f, {
    buttonRef: L,
    getButtonProps: I
  } = ks({
    native: d,
    disabled: D
  }), {
    mounted: B,
    transitionStatus: V,
    setMounted: P
  } = Mm(k), ee = {
    disabled: D,
    visible: k,
    open: A,
    transitionStatus: V
  };
  Tu({
    open: k,
    ref: S.state.clearRef,
    onComplete() {
      k || P(!1);
    }
  });
  const se = Kl("button", o, {
    state: ee,
    ref: [r, L, S.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(le) {
        le.preventDefault();
      },
      onClick(le) {
        if (D || _)
          return;
        const me = S.state.keyboardActiveRef.current ? Rm : wm;
        S.state.setInputValue("", vt(rv, le.nativeEvent)), v !== "none" ? (S.state.setSelectedValue(Array.isArray(R) ? [] : null, vt(rv, le.nativeEvent)), S.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: me
        })) : S.state.setIndices({
          activeIndex: null,
          type: me
        }), S.state.inputRef.current?.focus();
      }
    }, h, I],
    stateAttributesMapping: sO
  });
  return m || B ? se : null;
}), uO = /* @__PURE__ */ b.createContext(null);
function fO() {
  return b.useContext(uO);
}
function dO(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = zs(), i = fO(), c = i ? i.items : r;
  return /* @__PURE__ */ x.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const hO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var i;
  const {
    render: c,
    className: f,
    style: d,
    children: m,
    ...g
  } = o, h = wl(), y = Vu(), S = !!Um(!0), {
    filteredItems: v,
    hasItems: C
  } = zs(), _ = xe(h, Ee.selectionMode), A = xe(h, Ee.grid), R = xe(h, Ee.listProps), w = xe(h, Ee.virtualized), O = xe(h, Ee.forceMounted), k = _ === "multiple", D = v.length === 0, L = Pe((fe) => {
    h.set("positionerElement", fe);
  }), I = Pe((fe) => {
    h.set("listElement", fe);
  }), B = b.useMemo(() => typeof m == "function" ? i || (i = /* @__PURE__ */ x.jsx(dO, {
    children: m
  })) : m, [m]), V = {
    empty: D
  }, P = y.useState("floatingId"), ee = Kl("div", o, {
    state: V,
    ref: [r, I, S ? null : L],
    props: [R, {
      children: B,
      tabIndex: -1,
      id: P,
      role: A ? "grid" : "listbox",
      "aria-multiselectable": k ? "true" : void 0,
      onKeyDown(fe) {
        if (!(h.state.disabled || h.state.readOnly) && fe.key === "Enter") {
          const le = h.state.activeIndex;
          if (le == null)
            return;
          An(fe), H1(h, le, fe.nativeEvent);
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
    return ee;
  const se = C && !O ? void 0 : h.state.labelsRef;
  return /* @__PURE__ */ x.jsx(CM, {
    elementsRef: h.state.listRef,
    labelsRef: se,
    children: ee
  });
}), mO = "⁠", pO = 200;
function gO(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const i = o.currentNode;
    i.nodeValue !== "" && (r = i);
  }
  return r;
}
function bO() {
  const n = Ga(), o = b.useRef(null);
  return b.useEffect(() => {
    if (Ns)
      return;
    const r = o.current;
    if (r == null)
      return;
    const i = gO(r);
    if (i == null)
      return;
    const c = i.data, f = `${c}${mO}`;
    return i.nodeValue = f, n.start(pO, () => {
      i.nodeValue === f && (i.nodeValue = c);
    }), () => {
      n.clear(), i.nodeValue === f && (i.nodeValue = c);
    };
  }, [o, n]), o;
}
const G1 = /* @__PURE__ */ b.createContext(void 0);
function yO() {
  const n = b.useContext(G1);
  if (n === void 0)
    throw new Error(So(20));
  return n;
}
const vO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: i = !1,
    ...c
  } = o, f = wl(), d = xe(f, Ee.mounted), m = xe(f, Ee.forceMounted);
  return d || i || m ? /* @__PURE__ */ x.jsx(G1.Provider, {
    value: i,
    children: /* @__PURE__ */ x.jsx(YA, {
      ref: r,
      ...c
    })
  }) : null;
}), xO = (n) => ({
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
      offsetParent: S = "real"
    } = Ha(n, o) || {};
    if (h == null)
      return {};
    const v = W0(y), C = {
      x: r,
      y: i
    }, _ = im(c), A = rm(_), R = await d.getDimensions(h), w = _ === "y", O = w ? "top" : "left", k = w ? "bottom" : "right", D = w ? "clientHeight" : "clientWidth", L = f.reference[A] + f.reference[_] - C[_] - f.floating[A], I = C[_] - f.reference[_], B = S === "real" ? await d.getOffsetParent?.(h) : m.floating;
    let V = m.floating[D] || f.floating[A];
    (!V || !await d.isElement?.(B)) && (V = m.floating[D] || f.floating[A]);
    const P = L / 2 - I / 2, ee = V / 2 - R[A] / 2 - 1, se = Math.min(v[O], ee), fe = Math.min(v[k], ee), le = se, me = V - R[A] - fe, be = V / 2 - R[A] / 2 + P, U = J0(le, be, me), G = !g.arrow && Xa(c) != null && be !== U && f.reference[A] / 2 - (be < le ? se : fe) - R[A] / 2 < 0, K = G ? be < le ? be - le : be - me : 0;
    return {
      [_]: C[_] + K,
      data: {
        [_]: U,
        centerOffset: be - U - K,
        ...G && {
          alignmentOffset: K
        }
      },
      reset: G
    };
  }
}), SO = (n, o) => ({
  ...xO(n),
  options: [n, o]
}), EO = {
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
}, CO = {
  sideX: "left",
  sideY: "top"
}, Nv = "--available-width", zv = "--available-height";
function Y1(n, o, r) {
  const i = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: i ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: i ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function Dv(n, o, r) {
  const {
    rects: i,
    placement: c
  } = n;
  return {
    side: Y1(o, Fl(c), r),
    align: Xa(c) || "center",
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
function _O(n) {
  return RO(n, pT);
}
function RO(n, o) {
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
    arrowPadding: S = 5,
    disableAnchorTracking: v = !1,
    inline: C,
    // Private parameters
    keepMounted: _ = !1,
    floatingRootContext: A,
    mounted: R,
    collisionAvoidance: w,
    shift: O,
    nodeId: k,
    adaptiveOrigin: D,
    lazyFlip: L = !1,
    externalTree: I
  } = n, [B, V] = b.useState(null);
  !R && B !== null && V(null);
  const P = w.side || "flip", ee = w.align || "flip", se = w.fallbackAxisSide || "end", fe = O?.crossAxis ?? !1, le = O?.rootBoundary, me = typeof r == "function" ? r : void 0, be = Pe(me), U = me ? be : r, G = sl(r), K = sl(R), ie = Hm() === "rtl", j = B || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": ie ? "left" : "right",
    "inline-start": ie ? "right" : "left"
  }[c], F = d === "center" ? j : `${j}-${d}`;
  let te = h;
  typeof te == "number" ? te = {
    top: te,
    right: te,
    bottom: te,
    left: te
  } : te && (te = {
    top: te.top || 0,
    right: te.right || 0,
    bottom: te.bottom || 0,
    left: te.left || 0
  });
  const oe = 1, ge = c === "bottom" ? oe : 0, _e = c === "top" ? oe : 0, Ye = c === "right" ? oe : 0, we = c === "left" ? oe : 0, Me = {
    boundary: g === "clipping-ancestors" ? "clippingAncestors" : g,
    padding: te
  }, it = b.useRef(null), pt = sl(f), ke = sl(m), tt = typeof f != "function" ? f : 0, Te = typeof m != "function" ? m : 0, Oe = [];
  C && Oe.push(C), Oe.push(s2((at) => {
    const lt = Dv(at, c, ie), We = typeof pt.current == "function" ? pt.current(lt) : pt.current, Wt = typeof ke.current == "function" ? ke.current(lt) : ke.current;
    return {
      mainAxis: We,
      crossAxis: Wt,
      alignmentAxis: Wt
    };
  }, [tt, Te, ie, c]));
  const Ue = ee === "none" && P !== "shift", Re = !Ue && (y || fe || P === "shift"), Fe = P === "none" ? null : f2({
    ...Me,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: te.top + oe + ge,
      right: te.right + oe + we,
      bottom: te.bottom + oe + _e,
      left: te.left + oe + Ye
    },
    mainAxis: !fe && P === "flip",
    crossAxis: ee === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: se
  }), Ae = Ue ? null : c2({
    ...Me,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: le,
    mainAxis: ee !== "none",
    crossAxis: Re,
    limiter: y || fe ? void 0 : u2((at) => {
      if (!it.current)
        return {};
      const {
        width: lt,
        height: We
      } = it.current.getBoundingClientRect(), Wt = Pl(Fl(at.placement)), Rn = Wt === "y" ? lt : We, qt = Wt === "y" ? te.left + te.right : te.top + te.bottom;
      return {
        offset: Rn / 2 + qt / 2
      };
    })
  }, [Me, y, fe, le, te, ee]);
  P === "shift" || ee === "shift" || d === "center" ? Oe.push(Ae, Fe) : Oe.push(Fe, Ae), Oe.push(d2({
    ...Me,
    apply({
      elements: {
        floating: at
      },
      availableWidth: lt,
      availableHeight: We,
      rects: Wt
    }) {
      if (!K.current)
        return;
      const Rn = at.style;
      Rn.setProperty(Nv, `${lt}px`), Rn.setProperty(zv, `${We}px`);
      const qt = dn(at).devicePixelRatio || 1, {
        x: Bt,
        y: Pn,
        width: kt,
        height: uo
      } = Wt.reference, Xn = (Math.round((Bt + kt) * qt) - Math.round(Bt * qt)) / qt, rn = (Math.round((Pn + uo) * qt) - Math.round(Pn * qt)) / qt;
      Rn.setProperty("--anchor-width", `${Xn}px`), Rn.setProperty("--anchor-height", `${rn}px`);
    }
  }), SO((at) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: it.current || $t(at.elements.floating).createElement("div"),
    padding: S,
    offsetParent: "floating"
  }), [S]), {
    name: "transformOrigin",
    fn(at) {
      const {
        elements: lt,
        middlewareData: We,
        placement: Wt,
        rects: Rn,
        y: qt
      } = at, Bt = Fl(Wt), Pn = Pl(Bt), kt = it.current, uo = We.arrow?.x || 0, Xn = We.arrow?.y || 0, rn = kt?.clientWidth || 0, fo = kt?.clientHeight || 0, Ml = uo + rn / 2, Jn = Xn + fo / 2, Eo = Math.abs(We.shift?.y || 0), En = Rn.reference.height / 2, At = typeof f == "function" ? f(Dv(at, c, ie)) : f, Ct = Eo > At, Ge = {
        top: `${Ml}px calc(100% + ${At}px)`,
        bottom: `${Ml}px ${-At}px`,
        left: `calc(100% + ${At}px) ${Jn}px`,
        right: `${-At}px ${Jn}px`
      }[Bt], Ln = `${Ml}px ${Rn.reference.y + En - qt}px`;
      return lt.floating.style.setProperty("--transform-origin", Re && Pn === "y" && Ct ? Ln : Ge), {};
    }
  }, EO, D), Xe(() => {
    !R && A && A.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [R, A]);
  const $e = b.useMemo(() => ({
    elementResize: !v && typeof ResizeObserver < "u",
    layoutShift: !v && typeof IntersectionObserver < "u"
  }), [v]), {
    refs: nt,
    elements: Ke,
    x: Se,
    y: Z,
    middlewareData: ce,
    update: He,
    placement: ye,
    context: Le,
    isPositioned: Je,
    floatingStyles: Mt
  } = o({
    rootContext: A,
    open: _ ? R : void 0,
    placement: F,
    middleware: Oe,
    strategy: i,
    whileElementsMounted: _ ? void 0 : (...at) => Qy(...at, $e),
    nodeId: k,
    externalTree: I
  }), {
    sideX: Et,
    sideY: jt
  } = ce.adaptiveOrigin || CO, Ot = Je ? i : "fixed", xt = b.useMemo(() => {
    let at;
    return Je ? D ? at = {
      position: Ot,
      [Et]: Se,
      [jt]: Z
    } : at = {
      ...Mt,
      position: Ot
    } : at = {
      position: Ot,
      top: 0,
      left: 0
    }, at[Nv] = "100vw", at[zv] = "100vh", Je || (at.opacity = 0), at;
  }, [D, Ot, Et, Se, jt, Z, Mt, Je]), an = b.useRef(null);
  Xe(() => {
    if (!R)
      return;
    const at = G.current, lt = typeof at == "function" ? at() : at, Wt = (jv(lt) ? lt.current : lt) || null || null;
    Wt !== an.current && (nt.setPositionReference(Wt), an.current = Wt);
  }, [R, nt, U, G]), b.useEffect(() => {
    if (!R)
      return;
    const at = G.current;
    typeof at != "function" && jv(at) && at.current !== an.current && (nt.setPositionReference(at.current), an.current = at.current);
  }, [R, nt, U, G]), b.useEffect(() => {
    if (_ && R && Ke.reference && Ke.floating)
      return Qy(Ke.reference, Ke.floating, He, $e);
  }, [_, R, Ke, He, $e]);
  const dt = Fl(ye), mn = Y1(c, dt, ie), Qt = Xa(ye) || "center", tn = !!ce.hide?.referenceHidden;
  Xe(() => {
    L && R && Je && dt !== j && V(dt);
  }, [L, R, Je, dt, j]);
  const St = b.useMemo(() => ({
    position: "absolute",
    top: ce.arrow?.y,
    left: ce.arrow?.x
  }), [ce.arrow]), Jt = ce.arrow?.centerOffset !== 0;
  return b.useMemo(() => ({
    positionerStyles: xt,
    arrowStyles: St,
    arrowRef: it,
    arrowUncentered: Jt,
    side: mn,
    align: Qt,
    physicalSide: dt,
    anchorHidden: tn,
    refs: nt,
    context: Le,
    isPositioned: Je,
    update: He
  }), [xt, St, it, Jt, mn, Qt, dt, tn, nt, Le, Je, He]);
}
function jv(n) {
  return n != null && "current" in n;
}
function q1(n) {
  return n === "starting" ? VA : cl;
}
function wO(n, o, {
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
  return m && (g.pointerEvents = "none"), Kl("div", n, {
    state: o,
    ref: f,
    props: [{
      role: "presentation",
      hidden: d,
      style: g
    }, q1(i), c],
    stateAttributesMapping: jm
  });
}
const MO = 20;
function AO(n, o, r, i) {
  const [c, f] = b.useState(!1);
  Xe(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = $t(r).documentElement.clientWidth, m = r.offsetWidth;
    f(d > 0 && m > 0 && m >= d - MO);
  }, [n, o, r]), EA(n && (!o || c), i);
}
const TO = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
    collisionBoundary: S = "clipping-ancestors",
    collisionPadding: v,
    arrowPadding: C,
    sticky: _,
    disableAnchorTracking: A = !1,
    collisionAvoidance: R = HA,
    style: w,
    ...O
  } = o, k = wl(), D = Vu(), L = yO(), I = xe(k, Ee.modal), B = xe(k, Ee.open), V = xe(k, Ee.mounted), P = xe(k, Ee.openMethod), ee = xe(k, Ee.positionerElement), se = xe(k, Ee.triggerElement), fe = xe(k, Ee.inputElement), le = xe(k, Ee.inputGroupElement), me = xe(k, Ee.inputInsidePopup), be = xe(k, Ee.transitionStatus), U = Hu(), K = _O({
    anchor: f ?? (me ? se : le ?? fe),
    floatingRootContext: D,
    positionMethod: d,
    mounted: V,
    side: m,
    sideOffset: h,
    align: g,
    alignOffset: y,
    arrowPadding: C,
    collisionBoundary: S,
    collisionPadding: v,
    sticky: _,
    disableAnchorTracking: A,
    keepMounted: L,
    collisionAvoidance: R,
    lazyFlip: !0
  });
  AO(B && I, P === "touch", ee, se);
  const ve = {
    open: B,
    side: K.side,
    align: K.align,
    anchorHidden: K.anchorHidden,
    empty: U
  };
  Xe(() => {
    k.set("popupSide", K.side);
  }, [k, K.side]);
  const ie = Pe((F) => {
    k.set("positionerElement", F);
  }), j = wO(o, ve, {
    styles: K.positionerStyles,
    transitionStatus: be,
    props: O,
    refs: [r, ie],
    hidden: !V,
    inert: !B
  });
  return /* @__PURE__ */ x.jsxs(U1.Provider, {
    value: K,
    children: [V && I && /* @__PURE__ */ x.jsx(OT, {
      inert: TT(!B),
      cutout: le ?? fe ?? se
    }), j]
  });
}), OO = {
  ...jm,
  ...Au
}, kO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: m,
    ...g
  } = o, h = wl(), y = Um(), S = Vu(), v = xe(h, Ee.mounted), C = xe(h, Ee.open), _ = xe(h, Ee.openMethod), A = xe(h, Ee.popupProps), R = xe(h, Ee.transitionStatus), w = xe(h, Ee.inputInsidePopup), O = xe(h, Ee.inputElement), k = xe(h, Ee.modal), D = xe(h, Ee.id), L = Hu(), I = g.id ?? (w ? D1(D) : void 0);
  Xe(() => (h.set("popupId", h.state.popupRef.current?.id || I), () => {
    h.set("popupId", void 0);
  }), [h, I]), Tu({
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
    transitionStatus: R,
    empty: L
  }, V = Kl("div", o, {
    state: B,
    ref: [r, h.state.popupRef],
    props: [A, {
      id: I,
      role: w ? "dialog" : "presentation",
      onFocus(le) {
        const me = _l(le.nativeEvent);
        _ !== "touch" && (ct(h.state.listElement, me) || me === le.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, q1(R), g],
    stateAttributesMapping: OO
  }), ee = d === void 0 ? w ? (le) => le === "touch" ? h.state.popupRef.current : O : !1 : d;
  let se;
  m != null ? se = m : se = w ? void 0 : !1;
  const fe = !w || k;
  return /* @__PURE__ */ x.jsx(QA, {
    context: S,
    disabled: !v,
    modal: fe,
    openInteractionType: _,
    initialFocus: ee,
    returnFocus: se,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ x.jsxs(b.Fragment, {
      children: [V, fe && /* @__PURE__ */ x.jsx(B1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), P1 = /* @__PURE__ */ b.createContext(void 0);
function X1() {
  const n = b.useContext(P1);
  if (!n)
    throw new Error(So(19));
  return n;
}
const NO = /* @__PURE__ */ b.createContext(!1);
function zO() {
  return b.useContext(NO);
}
function F1(n) {
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
    nativeButton: S = !1,
    ...v
  } = o, C = b.useRef(null), _ = eA({
    guess: !0,
    index: h,
    textRef: C
  }), A = wl(), R = zO(), w = LT(), O = xe(A, Ee.selectionMode), k = xe(A, Ee.disabled), D = xe(A, Ee.readOnly), L = xe(A, Ee.isItemEqualToValue), I = k || y, B = O !== "none", V = h ?? c ?? _.index, P = V !== -1, ee = xe(A, Ee.id), se = xe(A, Ee.isActive, V), fe = xe(A, Ee.isSelected, g), le = xe(A, Ee.itemProps), me = b.useRef(null), be = ee != null && P ? `${ee}-${V}` : void 0, U = fe && B;
  Xe(() => {
    if (!(P && (i || h != null)))
      return;
    const ge = A.state.listRef.current;
    return ge[V] = me.current, () => {
      delete ge[V];
    };
  }, [P, i, V, h, A]), Xe(() => {
    if (!P || w)
      return;
    const oe = A.state.valuesRef.current;
    return oe[V] = g, () => {
      delete oe[V];
    };
  }, [P, w, V, g, A]), Xe(() => {
    if (!P || w)
      return;
    const oe = A.state.selectedValue, ge = Array.isArray(oe) ? oe[oe.length - 1] : oe;
    Ya(g, ge, L) && A.set("selectedIndex", V);
  }, [P, w, A, V, g, L]);
  const {
    getButtonProps: G,
    buttonRef: K
  } = ks({
    disabled: I,
    focusableWhenDisabled: !0,
    native: S,
    composite: !0
  }), ve = {
    disabled: I,
    selected: U,
    highlighted: se
  };
  function ie(oe) {
    function ge() {
      A.state.handleSelection(oe, g);
    }
    A.state.submitOnItemClick ? (yi.flushSync(ge), A.state.requestSubmit()) : ge();
  }
  const j = {
    id: be,
    role: R ? "gridcell" : "option",
    "aria-selected": B ? U : void 0,
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
      I || D || ie(oe.nativeEvent);
    },
    onMouseUp(oe) {
      const ge = A.state.pointerDownItemRef.current === oe.currentTarget;
      A.state.pointerDownItemRef.current = null, !(I || D || oe.button !== 0 || ge || !se) && ie(oe.nativeEvent);
    }
  }, F = Kl("div", o, {
    ref: [K, r, _.ref, me],
    state: ve,
    props: [le, j, v, G]
  }), te = b.useMemo(() => ({
    selected: U,
    textRef: C
  }), [U, C]);
  return /* @__PURE__ */ x.jsx(P1.Provider, {
    value: te,
    children: F
  });
}
function DO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, i = wl(), c = xe(i, Ee.isItemEqualToValue), {
    flatFilteredItems: f
  } = zs(), d = w1(f, o.value ?? null, c);
  return /* @__PURE__ */ x.jsx(F1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const jO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const i = wl(), c = xe(i, Ee.virtualized);
  return c && o.index == null ? /* @__PURE__ */ x.jsx(DO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ x.jsx(F1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), LO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    children: d,
    ...m
  } = o, {
    filteredItems: g
  } = zs(), h = wl(), y = bO(), S = g.length === 0 ? d : null;
  return Kl("div", o, {
    ref: [r, h.state.emptyRef, y],
    props: [{
      children: S,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, m]
  });
});
function VO(n, o, r, i = !0, c) {
  const [f, d] = b.useState(), m = wu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
  return Xe(() => {
    const h = n || o || !i ? void 0 : IO(r.current, m);
    f !== h && d(h);
  }), g;
}
function IO(n, o) {
  const r = HO(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function HO(n) {
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
function UO(n) {
  const {
    multiple: o = !1,
    defaultValue: r,
    value: i,
    onValueChange: c,
    autoComplete: f,
    ...d
  } = n;
  return /* @__PURE__ */ x.jsx(JT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: i,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function BO(n) {
  const {
    children: o,
    placeholder: r
  } = n, i = wl(), c = xe(i, Ee.itemToStringLabel), f = xe(i, Ee.selectedValue), d = xe(i, Ee.items), m = xe(i, Ee.selectionMode) === "multiple", g = xe(i, Ee.hasSelectedValue), h = !g && r != null && o == null, y = xe(i, Ee.hasNullItemLabel, h);
  let S = null;
  return typeof o == "function" ? S = o(f) : o != null ? S = o : !g && r != null && !y ? S = r : m && Array.isArray(f) ? S = BT(f, d, c) : S = M1(f, d, c), /* @__PURE__ */ x.jsx(b.Fragment, {
    children: S
  });
}
const GO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: i
  } = X1();
  return o.keepMounted || i ? /* @__PURE__ */ x.jsx(YO, {
    ...o,
    ref: r
  }) : null;
}), YO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: i,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: m
  } = X1(), g = b.useRef(null), {
    transitionStatus: h,
    setMounted: y
  } = Mm(m), v = Kl("span", n, {
    ref: [o, g],
    state: {
      selected: m,
      transitionStatus: h
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, d],
    stateAttributesMapping: Au
  });
  return Tu({
    open: m,
    ref: g,
    onComplete() {
      m || y(!1);
    }
  }), v;
})), K1 = /* @__PURE__ */ b.createContext(void 0);
function qO() {
  const n = b.useContext(K1);
  if (n === void 0)
    throw new Error(So(63));
  return n;
}
const Q1 = {
  ...T1,
  checked(n) {
    return n ? {
      "data-checked": ""
    } : {
      "data-unchecked": ""
    };
  }
}, PO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: i,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: m,
    id: g,
    inputRef: h,
    name: y,
    nativeButton: S = !1,
    onCheckedChange: v,
    readOnly: C = !1,
    required: _ = !1,
    disabled: A = !1,
    render: R,
    uncheckedValue: w,
    value: O,
    style: k,
    ...D
  } = o, {
    clearErrors: L
  } = z1(), {
    state: I,
    setTouched: B,
    setDirty: V,
    validityData: P,
    setFilled: ee,
    setFocused: se,
    validationMode: fe,
    disabled: le,
    name: me,
    validation: be
  } = Si(), {
    labelId: U
  } = Iu(), G = le || A, K = me ?? y, ve = b.useRef(null), ie = br(ve, h, be.inputRef), j = b.useRef(null), F = wu(), te = Im({
    id: g,
    implicit: !1,
    controlRef: j
  }), oe = S ? void 0 : te, [ge, _e] = Wc({
    controlled: i,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  N1(j, F, ge, void 0, !G, y), Xe(() => {
    ve.current && ee(ve.current.checked);
  }, [ee]), ui(ge, () => {
    L(K), V(ge !== P.initialValue), ee(ge), be.change(ge);
  });
  const {
    getButtonProps: Ye,
    buttonRef: we
  } = ks({
    disabled: G,
    native: S
  }), Me = VO(d, U, ve, !S, oe), it = {
    id: S ? te : F,
    role: "switch",
    "aria-checked": ge,
    "aria-readonly": C || void 0,
    "aria-required": _ || void 0,
    "aria-labelledby": Me,
    onFocus() {
      G || se(!0);
    },
    onBlur() {
      const Te = ve.current;
      !Te || G || (B(!0), se(!1), fe === "onBlur" && be.commit(Te.checked));
    },
    onClick(Te) {
      if (C || G)
        return;
      Te.preventDefault();
      const Oe = ve.current;
      Oe && eu(Oe, Te);
    }
  }, pt = {
    ...be.getValidationProps(G),
    checked: ge,
    disabled: G,
    form: m,
    id: oe,
    name: K,
    required: _,
    style: K ? Nm : km,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": !0,
    ref: ie,
    onChange(Te) {
      if (Te.nativeEvent.defaultPrevented)
        return;
      if (C) {
        Te.preventDefault();
        return;
      }
      const Oe = Te.currentTarget.checked, Ue = vt(Yl, Te.nativeEvent);
      v?.(Oe, Ue), !Ue.isCanceled && _e(Oe);
    },
    onClick(Te) {
      Te.stopPropagation();
    },
    onFocus() {
      j.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...O !== void 0 ? {
      value: O
    } : cl
  }, ke = b.useMemo(() => ({
    ...I,
    checked: ge,
    disabled: G,
    readOnly: C,
    required: _
  }), [I, ge, G, C, _]), tt = Kl("span", o, {
    state: ke,
    ref: [r, j, we],
    props: [it, D, Ye, (Te) => be.getValidationProps(G, Te)],
    stateAttributesMapping: Q1
  });
  return /* @__PURE__ */ x.jsxs(K1.Provider, {
    value: ke,
    children: [tt, !ge && K && w !== void 0 && /* @__PURE__ */ x.jsx("input", {
      type: "hidden",
      form: m,
      name: K,
      value: w,
      disabled: G
    }), /* @__PURE__ */ x.jsx("input", {
      ...pt,
      suppressHydrationWarning: !0
    })]
  });
}), XO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    ...d
  } = o, m = qO();
  return Kl("span", o, {
    state: m,
    ref: r,
    stateAttributesMapping: Q1,
    props: d
  });
});
function Bm({ className: n, type: o, ...r }) {
  return /* @__PURE__ */ x.jsx(
    "input",
    {
      type: o,
      "data-slot": "input",
      className: et(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        n
      ),
      ...r
    }
  );
}
function FO({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: et(
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
const KO = Os(
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
function QO({
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
      className: et(KO({ align: o }), n),
      onClick: (i) => {
        i.target.closest("button") || i.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const ZO = Os(
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
function Z1({
  className: n,
  type: o = "button",
  variant: r = "ghost",
  size: i = "xs",
  ...c
}) {
  return /* @__PURE__ */ x.jsx(
    Xl,
    {
      type: o,
      "data-size": i,
      variant: r,
      className: et(ZO({ size: i }), n),
      ...c
    }
  );
}
function $O({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    Bm,
    {
      "data-slot": "input-group-control",
      className: et(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        n
      ),
      ...o
    }
  );
}
const JO = UO;
function WO({ ...n }) {
  return /* @__PURE__ */ x.jsx(BO, { "data-slot": "combobox-value", ...n });
}
function $1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsxs(
    oO,
    {
      "data-slot": "combobox-trigger",
      className: et("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ x.jsx(
          __,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function ek({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    cO,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ x.jsx(Z1, { variant: "ghost", size: "icon-xs" }),
      className: et(n),
      ...o,
      children: /* @__PURE__ */ x.jsx(Zh, { className: "pointer-events-none" })
    }
  );
}
function tk({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: i = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ x.jsxs(FO, { className: et("w-auto", n), children: [
    /* @__PURE__ */ x.jsx(
      iO,
      {
        render: /* @__PURE__ */ x.jsx($O, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ x.jsxs(QO, { align: "inline-end", children: [
      i && /* @__PURE__ */ x.jsx(
        Z1,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ x.jsx($1, {})
        }
      ),
      c && /* @__PURE__ */ x.jsx(ek, { disabled: r })
    ] }),
    o
  ] });
}
function nk({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: i = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...m
}) {
  return /* @__PURE__ */ x.jsx(vO, { container: d, children: /* @__PURE__ */ x.jsx(
    TO,
    {
      side: o,
      sideOffset: r,
      align: i,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ x.jsx(
        kO,
        {
          "data-slot": "combobox-content",
          "data-chips": !!f,
          className: et(
            "group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            n
          ),
          ...m
        }
      )
    }
  ) });
}
function lk({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    hO,
    {
      "data-slot": "combobox-list",
      className: et(
        "max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
        n
      ),
      ...o
    }
  );
}
function ok({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsxs(
    jO,
    {
      "data-slot": "combobox-item",
      className: et(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ x.jsx(
          GO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ x.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ x.jsx(E_, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function ak({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    LO,
    {
      "data-slot": "combobox-empty",
      className: et(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        n
      ),
      ...o
    }
  );
}
function rk({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    k2,
    {
      "data-slot": "label",
      className: et(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        n
      ),
      ...o
    }
  );
}
function hh({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...i
}) {
  return /* @__PURE__ */ x.jsx(
    H2,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: o,
      className: et(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        n
      ),
      ...i
    }
  );
}
function mh({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: et(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        n
      ),
      ...o
    }
  );
}
const ik = Os(
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
function hs({
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
      className: et(ik({ orientation: o }), n),
      ...r
    }
  );
}
function nu({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    rk,
    {
      "data-slot": "field-label",
      className: et(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        n
      ),
      ...o
    }
  );
}
function fi({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: et(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        n
      ),
      ...o
    }
  );
}
function ph({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: et("group/item-group flex flex-col", n),
      ...o
    }
  );
}
function Ta({
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
  return /* @__PURE__ */ x.jsxs(
    q2,
    {
      "data-slot": "slider",
      defaultValue: r == null ? d : void 0,
      value: r,
      min: i,
      max: c,
      className: et(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        n
      ),
      ...f,
      children: [
        /* @__PURE__ */ x.jsx(
          K2,
          {
            "data-slot": "slider-track",
            className: et(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ x.jsx(
              Q2,
              {
                "data-slot": "slider-range",
                className: et(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: m.length }, (g, h) => /* @__PURE__ */ x.jsx(
          eM,
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
function Lv({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    PO,
    {
      "data-slot": "switch",
      className: et(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        o === "default" && "h-[1.15rem] w-8",
        o === "sm" && "h-3.5 w-6",
        n
      ),
      ...r,
      children: /* @__PURE__ */ x.jsx(
        XO,
        {
          "data-slot": "switch-thumb",
          className: et(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
            o === "default" && "size-4",
            o === "sm" && "size-3"
          )
        }
      )
    }
  );
}
const sk = Os(
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
), J1 = b.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function W1({
  className: n,
  variant: o,
  size: r,
  spacing: i = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ x.jsx(
    sM,
    {
      "data-slot": "toggle-group",
      "data-variant": o,
      "data-size": r,
      "data-spacing": i,
      style: { "--gap": i },
      className: et(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        n
      ),
      ...f,
      children: /* @__PURE__ */ x.jsx(J1.Provider, { value: { variant: o, size: r, spacing: i }, children: c })
    }
  );
}
function eS({
  className: n,
  children: o,
  variant: r,
  size: i,
  ...c
}) {
  const f = b.useContext(J1);
  return /* @__PURE__ */ x.jsx(
    hM,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || i,
      "data-spacing": f.spacing,
      className: et(
        sk({
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
const Vv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Iv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], El = ["#ff0099", "#b8ff00", "#00b7ff"], ck = El.length, tS = ["line", "spline", "gradient"], nS = ["spline", "shape", "gradient"], uk = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, fk = ["select", "lasso"], dk = ["point", "line", "spline", "shape"];
function hk(n, o) {
  const [r, i] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(i - r), Math.abs(f - c));
}
function mk(n, o) {
  const [r, i] = n, [c, f] = o;
  return Math.hypot(Math.abs(i - r), Math.abs(f - c));
}
function ii(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function Hv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const pk = {
  select: q_,
  lasso: H_,
  polygon: X_,
  rectangle: nR,
  ellipse: Iy,
  point: Iy,
  line: J_,
  spline: eR,
  shape: x0
};
function Uv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ x.jsx(
    W1,
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
        const c = pk[i] ?? x0, f = uk[i] ?? i;
        return /* @__PURE__ */ x.jsx(
          eS,
          {
            value: i,
            title: f,
            "aria-label": f,
            className: "size-8 min-w-8 rounded-full border-0 px-0 text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none",
            children: /* @__PURE__ */ x.jsx(c, { className: "size-4" })
          },
          i
        );
      })
    }
  ) : null;
}
function Ss({
  color: n,
  variant: o = "solid",
  fillOpacity: r = 0.25,
  className: i
}) {
  if (o === "landmark") {
    const c = Math.round(Math.min(1, Math.max(0, r)) * 100);
    return /* @__PURE__ */ x.jsx(
      "span",
      {
        className: et(
          "landmarks-layer-swatch landmarks-layer-swatch--landmark inline-block shrink-0 rounded-full",
          i
        ),
        style: {
          borderColor: n,
          backgroundColor: `color-mix(in srgb, ${n} ${c}%, transparent)`
        },
        "aria-hidden": !0
      }
    );
  }
  return o === "selection" ? /* @__PURE__ */ x.jsx(
    "span",
    {
      className: et(
        "landmarks-layer-swatch landmarks-layer-swatch--selection inline-block shrink-0 rounded-full",
        i
      ),
      style: { borderColor: n },
      "aria-hidden": !0
    }
  ) : /* @__PURE__ */ x.jsx(
    "span",
    {
      className: et(
        "landmarks-layer-swatch inline-block shrink-0 rounded-full ring-1 ring-border",
        i
      ),
      style: { backgroundColor: n },
      "aria-hidden": !0
    }
  );
}
const Fc = "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground";
function gk({
  modes: n,
  mode: o,
  onMode: r,
  fullscreen: i,
  onToggleFullscreen: c,
  onZoomIn: f,
  onZoomOut: d,
  onReset: m
}) {
  const g = n.filter((S) => fk.includes(S)), h = n.filter((S) => dk.includes(S)), y = g.length > 0 && h.length > 0;
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: "landmarks-float landmarks-float--toolbar pointer-events-auto flex items-center gap-1 rounded-full px-1.5 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      onMouseDown: (S) => S.stopPropagation(),
      onWheel: (S) => S.stopPropagation(),
      children: [
        g.length ? /* @__PURE__ */ x.jsx(Uv, { modes: g, value: o, onChange: r }) : null,
        y ? /* @__PURE__ */ x.jsx(hh, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }) : null,
        h.length ? /* @__PURE__ */ x.jsx(Uv, { modes: h, value: o, onChange: r }) : null,
        /* @__PURE__ */ x.jsx(hh, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }),
        /* @__PURE__ */ x.jsx(
          Xl,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Zoom in",
            "aria-label": "Zoom in",
            className: Fc,
            onClick: (S) => {
              S.stopPropagation(), f();
            },
            children: /* @__PURE__ */ x.jsx(v0, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ x.jsx(
          Xl,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Zoom out",
            "aria-label": "Zoom out",
            className: Fc,
            onClick: (S) => {
              S.stopPropagation(), d();
            },
            children: /* @__PURE__ */ x.jsx(y0, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ x.jsx(
          Xl,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Reset view",
            "aria-label": "Reset view",
            className: Fc,
            onClick: (S) => {
              S.stopPropagation(), m();
            },
            children: /* @__PURE__ */ x.jsx(B_, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ x.jsx(hh, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }),
        /* @__PURE__ */ x.jsx(
          Xl,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            className: Fc,
            title: i ? "Exit full screen" : "Full screen",
            "aria-label": i ? "Exit full screen" : "Full screen",
            "aria-pressed": i,
            onClick: c,
            children: i ? /* @__PURE__ */ x.jsx(Z_, { className: "size-4" }) : /* @__PURE__ */ x.jsx(z_, { className: "size-4" })
          }
        )
      ]
    }
  );
}
function gh({
  active: n,
  color: o,
  swatchVariant: r = "solid",
  swatchFillOpacity: i,
  label: c,
  hidden: f,
  onSelect: d,
  onRename: m,
  onDelete: g,
  onToggleHidden: h
}) {
  const [y, S] = b.useState(!1), [v, C] = b.useState(c);
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      role: "listitem",
      className: et(
        "landmarks-layer-row cursor-pointer text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        n && "landmarks-layer-row--active",
        f && "opacity-50"
      ),
      tabIndex: 0,
      onClick: d,
      onKeyDown: (_) => {
        (_.key === "Enter" || _.key === " ") && (_.preventDefault(), d());
      },
      children: [
        o ? /* @__PURE__ */ x.jsx(
          Ss,
          {
            color: o,
            variant: r,
            fillOpacity: i,
            className: "landmarks-layer-swatch"
          }
        ) : null,
        /* @__PURE__ */ x.jsx("div", { className: "landmarks-layer-label", children: y && m ? /* @__PURE__ */ x.jsx(
          Bm,
          {
            "aria-label": "Rename layer",
            value: v,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (_) => _.stopPropagation(),
            onChange: (_) => C(_.target.value),
            onBlur: () => {
              m(v), S(!1);
            },
            onKeyDown: (_) => {
              _.stopPropagation(), _.key === "Enter" ? (_.preventDefault(), m(v), S(!1)) : _.key === "Escape" && (_.preventDefault(), C(c), S(!1));
            }
          }
        ) : /* @__PURE__ */ x.jsx(
          "span",
          {
            className: et(
              "max-w-full truncate text-xs text-foreground",
              n ? "font-medium" : "font-normal"
            ),
            title: m ? "Double-click to rename" : c,
            onDoubleClick: (_) => {
              m && (_.preventDefault(), _.stopPropagation(), C(c), S(!0));
            },
            children: c
          }
        ) }),
        /* @__PURE__ */ x.jsxs("div", { className: "landmarks-trail", children: [
          h ? /* @__PURE__ */ x.jsx(
            Xl,
            {
              type: "button",
              variant: "ghost",
              size: "icon-xs",
              className: "landmarks-trail-hit",
              "aria-label": f ? "Show landmark" : "Hide landmark",
              onClick: (_) => {
                _.stopPropagation(), h();
              },
              children: f ? /* @__PURE__ */ x.jsx(V_, {}) : /* @__PURE__ */ x.jsx(j_, {})
            }
          ) : /* @__PURE__ */ x.jsx("span", { className: "landmarks-trail-cell", "aria-hidden": !0 }),
          g ? /* @__PURE__ */ x.jsx(
            Xl,
            {
              type: "button",
              variant: "ghost",
              size: "icon-xs",
              className: "landmarks-trail-hit",
              "aria-label": "Delete",
              onClick: (_) => {
                _.stopPropagation(), g();
              },
              children: /* @__PURE__ */ x.jsx(Zh, {})
            }
          ) : /* @__PURE__ */ x.jsx("span", { className: "landmarks-trail-cell", "aria-hidden": !0 })
        ] })
      ]
    }
  );
}
const mu = "px-2.5", La = "landmarks-section-trigger px-0 py-1.5 text-left hover:no-underline", lS = "landmarks-float landmarks-float--panel pointer-events-auto max-h-full gap-1 overflow-hidden py-1", bk = /* @__PURE__ */ new Set([
  "selections",
  "categories",
  "genes",
  "landmarks"
]), Bv = {
  selections: { label: "Selections" },
  categories: { label: "Categories" },
  genes: { label: "Genes" },
  landmarks: { label: "Landmarks" },
  style: { label: "Style" },
  stats: { label: "Stats" },
  neighbors: { label: "Neighbors" },
  landmark: { label: "Landmark" }
};
function Oa({
  label: n,
  valueLabel: o,
  children: r
}) {
  return /* @__PURE__ */ x.jsx(hs, { className: "gap-0", children: /* @__PURE__ */ x.jsxs("div", { className: "landmarks-slider-row", children: [
    /* @__PURE__ */ x.jsx(nu, { className: "landmarks-slider-label", children: n }),
    /* @__PURE__ */ x.jsxs("div", { className: "landmarks-slider-capsule", children: [
      /* @__PURE__ */ x.jsx("div", { className: "landmarks-slider-control", children: r }),
      /* @__PURE__ */ x.jsx("span", { className: "landmarks-slider-value", "aria-hidden": !0, children: o })
    ] })
  ] }) });
}
function Gv({
  value: n,
  onChange: o,
  options: r
}) {
  return /* @__PURE__ */ x.jsx(
    W1,
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
      children: r.map((i) => /* @__PURE__ */ x.jsx(
        eS,
        {
          value: i.value,
          className: "h-7 min-w-0 flex-1 rounded-md border-0 px-2 text-[0.6875rem] text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground",
          children: i.label
        },
        i.value
      ))
    }
  );
}
function Yv(n, o) {
  const r = n?.vmin ?? 0, i = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, i));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function yk({
  colors: n,
  labels: o,
  lo: r,
  hi: i
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${vk(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ x.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ x.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ x.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ x.jsx(Ss, { color: n[d] || "#94a3b8" }),
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
      /* @__PURE__ */ x.jsx("span", { children: Hv(r) }),
      /* @__PURE__ */ x.jsx("span", { children: Hv(i) })
    ] })
  ] });
}
function vk(n, o) {
  const r = n.replace("#", ""), i = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), m = parseInt(i.slice(0, 2), 16), g = parseInt(i.slice(2, 4), 16), h = parseInt(i.slice(4, 6), 16), y = Math.min(255, c + m), S = Math.min(255, f + g), v = Math.min(255, d + h);
  return `#${[y, S, v].map((C) => C.toString(16).padStart(2, "0")).join("")}`;
}
function xk(n, o, r, i, c, f, d) {
  const m = [
    [n, o],
    [r, i],
    [c, f]
  ], g = [];
  for (let h = 0; h < 3; h++) {
    const [y, S] = m[(h + 2) % 3], [v, C] = m[h], [_, A] = m[(h + 1) % 3], R = Math.hypot(v - y, C - S) || 1, w = Math.hypot(_ - v, A - C) || 1, O = Math.min(d, R * 0.35, w * 0.35), k = v + (y - v) / R * O, D = C + (S - C) / R * O, L = v + (_ - v) / w * O, I = C + (A - C) / w * O;
    h === 0 ? g.push(`M ${k} ${D}`) : g.push(`L ${k} ${D}`), g.push(`Q ${v} ${C} ${L} ${I}`);
  }
  return g.push("Z"), g.join(" ");
}
const il = 80, Gm = 12, bh = 4, qv = 5, Sk = il - 2 * Gm, oS = Math.sqrt(3) / 2 * Sk, aS = (il - oS) / 2, rS = aS + oS, vr = { x: il / 2, y: aS }, xr = { x: Gm, y: rS }, Sr = { x: il - Gm, y: rS }, Pv = {
  x: (xr.x + vr.x + Sr.x) / 3,
  y: (xr.y + vr.y + Sr.y) / 3
};
function Ym(n) {
  const o = n.x - Pv.x, r = n.y - Pv.y, i = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / i * qv,
    y: n.y + r / i * qv
  };
}
const Xv = Ym(xr), Fv = Ym(vr), Kv = Ym(Sr), Qv = xk(
  xr.x,
  xr.y,
  vr.x,
  vr.y,
  Sr.x,
  Sr.y,
  8
);
function yh(n) {
  const o = n.replace("#", "");
  return [
    parseInt(o.slice(0, 2), 16),
    parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ];
}
function Ek() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const i = r.createImageData(o, o), c = yh(El[0]), f = yh(El[1]), d = yh(El[2]), m = xr.x / il, g = xr.y / il, h = vr.x / il, y = vr.y / il, S = Sr.x / il, v = Sr.y / il, C = (y - v) * (m - S) + (S - h) * (g - v);
  for (let _ = 0; _ < o; _++)
    for (let A = 0; A < o; A++) {
      const R = (A + 0.5) / o, w = (_ + 0.5) / o, O = ((y - v) * (R - S) + (S - h) * (w - v)) / C, k = ((v - g) * (R - S) + (m - S) * (w - v)) / C, D = 1 - O - k, L = (_ * o + A) * 4;
      if (O < -0.02 || k < -0.02 || D < -0.02) {
        i.data[L + 3] = 0;
        continue;
      }
      const I = Math.max(0, O), B = Math.max(0, k), V = Math.max(0, D);
      i.data[L] = Math.min(255, Math.round(c[0] * I + f[0] * B + d[0] * V)), i.data[L + 1] = Math.min(
        255,
        Math.round(c[1] * I + f[1] * B + d[1] * V)
      ), i.data[L + 2] = Math.min(
        255,
        Math.round(c[2] * I + f[2] * B + d[2] * V)
      ), i.data[L + 3] = 255;
    }
  return r.putImageData(i, 0, 0), n.toDataURL();
}
function Ck() {
  const n = b.useId(), o = b.useMemo(() => Ek(), []);
  return /* @__PURE__ */ x.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ x.jsxs(
    "svg",
    {
      viewBox: `0 0 ${il} ${il}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ x.jsx("defs", { children: /* @__PURE__ */ x.jsx("clipPath", { id: n, children: /* @__PURE__ */ x.jsx("path", { d: Qv }) }) }),
        o ? /* @__PURE__ */ x.jsx(
          "image",
          {
            href: o,
            width: il,
            height: il,
            clipPath: `url(#${n})`,
            preserveAspectRatio: "none"
          }
        ) : null,
        /* @__PURE__ */ x.jsx(
          "path",
          {
            d: Qv,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ x.jsx(
          "circle",
          {
            cx: Xv.x,
            cy: Xv.y,
            r: bh,
            fill: El[0]
          }
        ),
        /* @__PURE__ */ x.jsx(
          "circle",
          {
            cx: Fv.x,
            cy: Fv.y,
            r: bh,
            fill: El[1]
          }
        ),
        /* @__PURE__ */ x.jsx(
          "circle",
          {
            cx: Kv.x,
            cy: Kv.y,
            r: bh,
            fill: El[2]
          }
        )
      ]
    }
  ) });
}
function _k({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: i, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (i !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ x.jsx(Ck, {});
  const m = d.map((y, S) => El[S % El.length]);
  let g = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const y of d) {
      const S = r.find((v) => v.name === y);
      h = Math.max(h, Yv(S, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const y = r.find((v) => v.name === d[0]), S = Yv(y, c);
    g = S.lo, h = S.hi;
  }
  return /* @__PURE__ */ x.jsx(
    yk,
    {
      colors: m,
      labels: d,
      lo: g,
      hi: h
    }
  );
}
function Rk({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: i, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ x.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ x.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ x.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ x.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ x.jsx(
        Lv,
        {
          size: "sm",
          checked: i === "shared",
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
        Lv,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function wk() {
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
    d || (d = i.ownerDocument.createElement("div"), d.setAttribute("data-spatial-rx-portal", ""), f.appendChild(d)), d.className = et(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      i.classList.contains("dark") && "dark"
    ), r(d);
  }, []), [n, o];
}
function Mk({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, i = o.map((g) => g.name), c = r || [], f = c.length >= ck, [d, m] = wk();
  return /* @__PURE__ */ x.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ x.jsxs(
      JO,
      {
        items: i,
        multiple: !0,
        value: c,
        onValueChange: (g) => {
          const h = Array.isArray(g) ? g.map(String) : [];
          n.setActiveGenes(h);
        },
        children: [
          /* @__PURE__ */ x.jsx(
            $1,
            {
              render: /* @__PURE__ */ x.jsx(
                Xl,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-8 w-full justify-between bg-muted/45 px-2 font-normal text-xs hover:bg-muted/70",
                  children: /* @__PURE__ */ x.jsx(WO, { children: (g) => {
                    const h = Array.isArray(g) ? g : [];
                    return h.length ? /* @__PURE__ */ x.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((y, S) => /* @__PURE__ */ x.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ x.jsx(
                            Ss,
                            {
                              color: El[S % El.length]
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
            nk,
            {
              container: m,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ x.jsx(
                  tk,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto bg-transparent text-xs shadow-none ring-0"
                  }
                ),
                /* @__PURE__ */ x.jsx(ak, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ x.jsx(lk, { children: (g) => {
                  const h = String(g), y = c.indexOf(h), S = f && y < 0;
                  return /* @__PURE__ */ x.jsxs(
                    ok,
                    {
                      value: h,
                      disabled: S,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ x.jsx(
                          Ss,
                          {
                            color: y >= 0 ? El[y % El.length] : "#94a3b8"
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
    /* @__PURE__ */ x.jsx(_k, { lm: n }),
    /* @__PURE__ */ x.jsx(Rk, { lm: n })
  ] });
}
function iS({
  lm: n,
  forceSection: o,
  embedded: r = !1
}) {
  const {
    selections: i,
    landmarks: c,
    selected_kind: f,
    selected_index: d,
    category_columns: m,
    active_category: g,
    gene_columns: h,
    active_genes: y,
    color_by: S,
    landmark_opacity: v
  } = n, C = S === "continuous" && (y?.length || 0) > 0, _ = /* @__PURE__ */ x.jsxs(
    Bx,
    {
      className: et(o && "landmarks-section-solo"),
      ...o ? { type: "single", value: o, collapsible: !0 } : {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"]
      },
      children: [
        /* @__PURE__ */ x.jsxs(Na, { value: "selections", className: "border-b", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Selections" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: i.length ? /* @__PURE__ */ x.jsx(ph, { className: "max-h-40 gap-0.5 overflow-y-auto", children: i.map((A, R) => /* @__PURE__ */ x.jsx(
            gh,
            {
              active: f === "selection" && d === R,
              color: Iv[R % Iv.length],
              swatchVariant: "selection",
              label: A.id,
              onSelect: () => n.select("selection", R),
              onRename: (w) => n.renameSelection(R, w),
              onDelete: () => n.deleteSelection(R)
            },
            `${A.id}-${R}`
          )) }) : /* @__PURE__ */ x.jsx(fi, { children: "No selections yet." }) })
        ] }),
        m.length ? /* @__PURE__ */ x.jsxs(Na, { value: "categories", className: "border-b", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Categories" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: m.map((A) => {
            const R = !C && A.name === g;
            return /* @__PURE__ */ x.jsxs(pM, { className: "group/cat", children: [
              /* @__PURE__ */ x.jsxs(
                gM,
                {
                  className: et(
                    "landmarks-cat-trigger cursor-pointer text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    R && "landmarks-cat-trigger--active text-foreground"
                  ),
                  onClick: () => {
                    A.name === g && !C || (n.setActiveCategory(A), n.select("", -1));
                  },
                  children: [
                    /* @__PURE__ */ x.jsx(w_, { className: "landmarks-layer-icon shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                    /* @__PURE__ */ x.jsx("span", { className: "min-w-0 flex-1 truncate", children: A.name }),
                    /* @__PURE__ */ x.jsxs("span", { className: "landmarks-trail", "aria-hidden": !0, children: [
                      /* @__PURE__ */ x.jsx("span", { className: "landmarks-trail-cell" }),
                      /* @__PURE__ */ x.jsx("span", { className: "landmarks-trail-cell" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ x.jsx(bM, { className: "pl-4", children: /* @__PURE__ */ x.jsx(ph, { className: "gap-0.5", children: (A.labels || []).map((w, O) => /* @__PURE__ */ x.jsx(
                gh,
                {
                  active: f === "type" && A.name === g && d === O,
                  color: (A.palette || [])[O % Math.max((A.palette || []).length, 1)] || "#888888",
                  label: w,
                  onSelect: () => n.selectType(A, O)
                },
                `${A.name}-${w}`
              )) }) })
            ] }, A.name);
          }) }) })
        ] }) : null,
        h.length ? /* @__PURE__ */ x.jsxs(Na, { value: "genes", className: "border-b", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Genes" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsx(Mk, { lm: n }) })
        ] }) : null,
        /* @__PURE__ */ x.jsxs(Na, { value: "landmarks", className: "border-b-0", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Landmarks" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: c.length ? /* @__PURE__ */ x.jsx(ph, { className: "max-h-40 gap-0.5 overflow-y-auto", children: c.map((A, R) => /* @__PURE__ */ x.jsx(
            gh,
            {
              active: f === "landmark" && d === R,
              color: Vv[R % Vv.length],
              swatchVariant: "landmark",
              swatchFillOpacity: v,
              label: A.id,
              hidden: !!A.hidden,
              onSelect: () => n.select("landmark", R),
              onRename: (w) => n.renameLandmark(R, w),
              onToggleHidden: () => n.toggleLandmarkHidden(R),
              onDelete: () => n.deleteLandmark(R)
            },
            `${A.id}-${R}`
          )) }) : /* @__PURE__ */ x.jsx(fi, { children: "No landmarks yet." }) })
        ] })
      ]
    }
  );
  return r ? /* @__PURE__ */ x.jsx("div", { className: et("min-h-0 overflow-y-auto py-0", mu), children: _ }) : /* @__PURE__ */ x.jsx(Gx, { className: lS, children: /* @__PURE__ */ x.jsx(Yx, { className: et("min-h-0 overflow-y-auto py-0", mu), children: _ }) });
}
function sS({
  lm: n,
  forceSection: o,
  embedded: r = !1
}) {
  const {
    default_tension: i,
    neighbor_radius_max: c,
    neighbor_k_max: f,
    x_bounds: d,
    y_bounds: m
  } = n, g = mk(n.x_bounds, n.y_bounds), h = Math.max(g * 0.05, n.point_size * 5, 1e-6), y = Math.min(Math.max(n.point_size, 0), h), S = `${ii(g, "0")} across`, v = n.selectedLandmark(), C = !!v && nS.includes(v.type), _ = !!v && tS.includes(v.type), A = n.activeNeighborhood(), R = !!A, w = Math.max(hk(d, m), 1), O = c > 0 ? c : w, k = Math.max(1, f || 64), D = Math.min(Number(A?.neighborhood_radius || 0), O), L = /* @__PURE__ */ x.jsxs(
    Bx,
    {
      className: et(o && "landmarks-section-solo"),
      ...o ? { type: "single", value: o, collapsible: !0 } : {
        type: "multiple",
        defaultValue: ["style", "neighbors", "landmark"]
      },
      children: [
        /* @__PURE__ */ x.jsxs(Na, { value: "style", className: "border-b", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Style" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsxs(mh, { className: "gap-2.5", children: [
            /* @__PURE__ */ x.jsx(Oa, { label: "Point radius", valueLabel: ii(n.point_size, "0"), children: /* @__PURE__ */ x.jsx(
              Ta,
              {
                min: 0,
                max: h,
                step: h / 200,
                value: [y],
                onValueChange: (I) => n.setPointSize(I[0] ?? 0)
              }
            ) }),
            /* @__PURE__ */ x.jsx(
              Oa,
              {
                label: "Point opacity",
                valueLabel: n.point_opacity.toFixed(2),
                children: /* @__PURE__ */ x.jsx(
                  Ta,
                  {
                    min: 0.05,
                    max: 1,
                    step: 0.01,
                    value: [n.point_opacity],
                    onValueChange: (I) => n.setPointOpacity(I[0] ?? 0.8)
                  }
                )
              }
            ),
            /* @__PURE__ */ x.jsx(
              Oa,
              {
                label: "Landmark opacity",
                valueLabel: n.landmark_opacity.toFixed(2),
                children: /* @__PURE__ */ x.jsx(
                  Ta,
                  {
                    min: 0.05,
                    max: 1,
                    step: 0.01,
                    value: [n.landmark_opacity],
                    onValueChange: (I) => n.setLandmarkOpacity(I[0] ?? 0.28)
                  }
                )
              }
            ),
            /* @__PURE__ */ x.jsx(Oa, { label: "Stroke", valueLabel: `${n.stroke_width} px`, children: /* @__PURE__ */ x.jsx(
              Ta,
              {
                min: 1,
                max: 8,
                step: 1,
                value: [n.stroke_width],
                onValueChange: (I) => n.setStrokeWidth(I[0] ?? 2)
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ x.jsxs(Na, { value: "stats", className: "border-b", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Stats" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsxs("dl", { className: "landmarks-stat-grid", children: [
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Points" }),
              /* @__PURE__ */ x.jsx("dd", { children: n.n_points })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Categories" }),
              /* @__PURE__ */ x.jsx("dd", { children: n.category_columns.length })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Genes" }),
              /* @__PURE__ */ x.jsx("dd", { children: n.gene_columns.length })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Selections" }),
              /* @__PURE__ */ x.jsx("dd", { children: n.selections.length })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Landmarks" }),
              /* @__PURE__ */ x.jsx("dd", { children: n.landmarks.length })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Color" }),
              /* @__PURE__ */ x.jsx("dd", { className: "truncate", children: n.color_by })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "k max" }),
              /* @__PURE__ */ x.jsx("dd", { children: n.neighbor_k_max })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "r max" }),
              /* @__PURE__ */ x.jsx("dd", { children: ii(n.neighbor_radius_max, "0") })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "landmarks-stat-chip col-span-2", children: [
              /* @__PURE__ */ x.jsx("dt", { children: "Extent" }),
              /* @__PURE__ */ x.jsx("dd", { className: "truncate", children: S })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ x.jsxs(
          Na,
          {
            value: "neighbors",
            className: C || _ ? "border-b" : "border-b-0",
            children: [
              /* @__PURE__ */ x.jsx(za, { className: La, children: "Neighbors" }),
              /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsx(mh, { className: "gap-2.5", children: R ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
                /* @__PURE__ */ x.jsx(fi, { className: "text-[0.6875rem]", children: A.id ? String(A.id) : "Selection" }),
                /* @__PURE__ */ x.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-[0.6875rem]", children: [
                  /* @__PURE__ */ x.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ x.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                    "seed"
                  ] }),
                  /* @__PURE__ */ x.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ x.jsx(Ss, { color: "#00e5cc" }),
                    "neighborhood"
                  ] }),
                  /* @__PURE__ */ x.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ x.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                    "other"
                  ] })
                ] }),
                /* @__PURE__ */ x.jsxs(hs, { className: "gap-1.5", children: [
                  /* @__PURE__ */ x.jsx(nu, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Neighborhood" }),
                  /* @__PURE__ */ x.jsx(
                    Gv,
                    {
                      value: A.neighborhood || "off",
                      onChange: (I) => n.patchNeighborhood({ neighborhood: I }),
                      options: [
                        { value: "off", label: "Off" },
                        { value: "radius", label: "Radius" },
                        { value: "knn", label: "k-NN" }
                      ]
                    }
                  )
                ] }),
                A.neighborhood === "radius" ? /* @__PURE__ */ x.jsx(
                  Oa,
                  {
                    label: "Radius",
                    valueLabel: `${ii(D, "0")}${O > 0 ? ` / ${ii(O, "0")}` : ""}`,
                    children: /* @__PURE__ */ x.jsx(
                      Ta,
                      {
                        min: 0,
                        max: O,
                        step: O / 200 || 1,
                        value: [D],
                        onValueChange: (I) => {
                          const B = Math.min(Math.max(I[0] ?? 0, 0), O);
                          n.patchNeighborhood({
                            neighborhood: "radius",
                            neighborhood_radius: B
                          });
                        }
                      }
                    )
                  }
                ) : null,
                A.neighborhood === "knn" ? /* @__PURE__ */ x.jsx(
                  Oa,
                  {
                    label: "k",
                    valueLabel: String(
                      Math.min(Number(A.neighborhood_k || 12), k)
                    ),
                    children: /* @__PURE__ */ x.jsx(
                      Ta,
                      {
                        min: 1,
                        max: k,
                        step: 1,
                        value: [Math.min(Number(A.neighborhood_k || 12), k)],
                        onValueChange: (I) => n.patchNeighborhood({
                          neighborhood: "knn",
                          neighborhood_k: I[0] ?? 12
                        })
                      }
                    )
                  }
                ) : null,
                /* @__PURE__ */ x.jsx(fi, { className: "text-[0.6875rem]", children: "Sliders subset precomputed graphs. Shift+wheel sizes the neighborhood." })
              ] }) : /* @__PURE__ */ x.jsx(fi, { className: "text-[0.6875rem]", children: "Select a type or selection to edit neighbors." }) }) })
            ]
          }
        ),
        C || _ ? /* @__PURE__ */ x.jsxs(Na, { value: "landmark", className: "border-b-0", children: [
          /* @__PURE__ */ x.jsx(za, { className: La, children: "Landmark" }),
          /* @__PURE__ */ x.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsxs(mh, { className: "gap-2.5", children: [
            C ? /* @__PURE__ */ x.jsx(
              Oa,
              {
                label: "Tension",
                valueLabel: Number(
                  v?.tension ?? i ?? 0
                ).toPrecision(3),
                children: /* @__PURE__ */ x.jsx(
                  Ta,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [Number(v?.tension ?? i ?? 0)],
                    onValueChange: (I) => n.patchLandmark({ tension: I[0] ?? 0 })
                  }
                )
              }
            ) : null,
            _ ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
              /* @__PURE__ */ x.jsxs(hs, { className: "gap-1.5", children: [
                /* @__PURE__ */ x.jsx(nu, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Buffer" }),
                /* @__PURE__ */ x.jsx(
                  Gv,
                  {
                    value: v?.buffer_side || "both",
                    onChange: (I) => n.patchLandmark({ buffer_side: I }),
                    options: [
                      { value: "left", label: "Left" },
                      { value: "both", label: "Both" },
                      { value: "right", label: "Right" }
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ x.jsx(
                Oa,
                {
                  label: "Width",
                  valueLabel: ii(Number(v?.buffer_width || 0)),
                  children: /* @__PURE__ */ x.jsx(
                    Ta,
                    {
                      min: 0,
                      max: w,
                      step: w / 200,
                      value: [
                        Math.min(Number(v?.buffer_width || 0), w)
                      ],
                      onValueChange: (I) => n.patchLandmark({ buffer_width: I[0] ?? 0 })
                    }
                  )
                }
              ),
              /* @__PURE__ */ x.jsx(fi, { className: "text-[0.6875rem]", children: "Shift+wheel sizes the buffer." })
            ] }) : null,
            /* @__PURE__ */ x.jsxs(hs, { className: "gap-1.5", children: [
              /* @__PURE__ */ x.jsx(nu, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ x.jsx(
                Bm,
                {
                  "aria-label": "Landmark label",
                  value: v?.label || "",
                  className: "h-6 text-xs",
                  autoFocus: !0,
                  onChange: (I) => {
                    const B = I.target.value || "";
                    n.setLandmarkLabel(B);
                  },
                  onKeyDown: (I) => {
                    if (I.stopPropagation(), I.key === "Enter") {
                      I.preventDefault();
                      const B = I.target.value || "";
                      n.setLandmarkLabel(B);
                    } else I.key === "Escape" && I.preventDefault();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ x.jsxs(hs, { className: "gap-1.5", children: [
              /* @__PURE__ */ x.jsx(
                Xl,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon-xs",
                  className: "landmarks-trail-hit",
                  "aria-label": "Copy landmark",
                  onClick: (I) => {
                    I.stopPropagation(), n.copyLandmark(n.selected_index);
                  },
                  children: /* @__PURE__ */ x.jsx(k_, { className: "size-3.5" })
                }
              ),
              /* @__PURE__ */ x.jsx(
                Xl,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon-xs",
                  className: "landmarks-trail-hit ml-1",
                  "aria-label": "Paste landmark",
                  onClick: (I) => {
                    I.stopPropagation(), n.pasteLandmark();
                  },
                  children: /* @__PURE__ */ x.jsx(T_, { className: "size-3.5" })
                }
              )
            ] })
          ] }) })
        ] }) : null
      ]
    }
  );
  return r ? /* @__PURE__ */ x.jsx("div", { className: et("min-h-0 overflow-y-auto py-0", mu), children: L }) : /* @__PURE__ */ x.jsx(Gx, { className: lS, children: /* @__PURE__ */ x.jsx(Yx, { className: et("min-h-0 overflow-y-auto py-0", mu), children: L }) });
}
function Ak({
  lm: n,
  open: o,
  onOpenChange: r
}) {
  const i = n.selectedLandmark(), c = !!i && nS.includes(i.type), f = !!i && tS.includes(i.type), d = n.category_columns.length, m = n.gene_columns.length, g = b.useRef(null), [h, y] = b.useState(!1), [S, v] = b.useState(!1), C = b.useMemo(() => {
    const R = ["selections"];
    return d && R.push("categories"), m && R.push("genes"), R.push("landmarks", "style", "stats", "neighbors"), (c || f) && R.push("landmark"), R;
  }, [d, m, c, f]);
  b.useEffect(() => {
    o && !C.includes(o) && r(null);
  }, [o, C, r]);
  const _ = b.useCallback(() => {
    const R = g.current;
    if (!R) return;
    const w = R.scrollWidth - R.clientWidth;
    if (w <= 1) {
      y(!1), v(!1);
      return;
    }
    y(R.scrollLeft > 1), v(R.scrollLeft < w - 1);
  }, []);
  b.useLayoutEffect(() => {
    const R = g.current;
    if (!R) return;
    _();
    const w = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => _());
    return w?.observe(R), () => w?.disconnect();
  }, [C, _]), b.useLayoutEffect(() => {
    if (!o || !g.current) return;
    g.current.querySelector(
      `[data-section-id="${o}"]`
    )?.scrollIntoView({ inline: "nearest", block: "nearest" }), _();
  }, [o, _]);
  const A = o ? Bv[o] : null;
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: "landmarks__chrome-sections",
      onMouseDown: (R) => R.stopPropagation(),
      onWheel: (R) => R.stopPropagation(),
      children: [
        o && A ? /* @__PURE__ */ x.jsxs(
          "div",
          {
            className: "landmarks__chrome-sheet landmarks-float landmarks-float--panel",
            role: "dialog",
            "aria-label": A.label,
            children: [
              /* @__PURE__ */ x.jsxs("div", { className: "landmarks__chrome-sheet-head", children: [
                /* @__PURE__ */ x.jsx("span", { className: "text-sm font-medium", children: A.label }),
                /* @__PURE__ */ x.jsx(
                  Xl,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon-sm",
                    className: "size-7 shrink-0 text-muted-foreground",
                    "aria-label": `Close ${A.label}`,
                    onClick: () => r(null),
                    children: /* @__PURE__ */ x.jsx(Zh, { className: "size-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ x.jsx("div", { className: "landmarks__chrome-sheet-body", children: bk.has(o) ? /* @__PURE__ */ x.jsx(iS, { lm: n, forceSection: o, embedded: !0 }) : /* @__PURE__ */ x.jsx(sS, { lm: n, forceSection: o, embedded: !0 }) })
            ]
          }
        ) : null,
        /* @__PURE__ */ x.jsx(
          "div",
          {
            className: et(
              "landmarks__chrome-section-bar landmarks-float landmarks-float--toolbar",
              h && "landmarks__chrome-section-bar--fade-start",
              S && "landmarks__chrome-section-bar--fade-end"
            ),
            children: /* @__PURE__ */ x.jsx(
              "div",
              {
                ref: g,
                className: "landmarks__chrome-section-scroll",
                role: "toolbar",
                "aria-label": "Panel sections",
                onScroll: _,
                children: C.map((R) => {
                  const { label: w } = Bv[R], O = o === R;
                  return /* @__PURE__ */ x.jsx(
                    Xl,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      "data-section-id": R,
                      "aria-pressed": O,
                      className: et(
                        "h-7 shrink-0 rounded-full px-2.5 text-[0.6875rem] font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                        O && "bg-muted text-foreground"
                      ),
                      onClick: () => r(O ? null : R),
                      children: w
                    },
                    R
                  );
                })
              }
            )
          }
        )
      ]
    }
  );
}
const Es = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, Tk = 3;
function Kc(n) {
  return { ...Es, ...n };
}
function Ph(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function Ok(n, o) {
  const r = n.get("gene_columns") || [], i = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!i.has(f) || c.includes(f)) && (c.push(f), c.length >= Tk))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", m = f.find((g) => g.name === d) || f[0];
    if (m) {
      Ph(n, m);
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
function kk(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function Nk(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function cS(n, o, r, i, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...Es, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const m = i.find(
      (g) => g.id === d && (!g.column || g.column === f)
    );
    return { ...Es, id: d, column: f, ...m || {} };
  }
  return null;
}
function uS(n, o, r, i, c, f, d, m) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (v, C) => C === r ? { ...Es, ...v, ...i } : v
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const h = [...f], y = h.findIndex(
    (v) => v.id === g && (!v.column || v.column === m)
  ), S = {
    ...Es,
    id: g,
    column: m,
    ...y >= 0 ? h[y] : {},
    ...i
  };
  y >= 0 ? h[y] = S : h.push(S), n.set("type_neighborhoods", h), n.save_changes();
}
function fS(n, o, r, i) {
  n.set(
    "landmarks",
    i.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function Xh(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function zk(n, o) {
  n.set("mode", o), n.save_changes();
}
function dS(n, o) {
  return n.filter((r, i) => i !== o);
}
function hS(n, o, r, i) {
  return o !== n ? { kind: o, index: r } : r === i ? { kind: "", index: -1 } : r > i ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function Dk(n, o, r, i, c) {
  const f = hS("selection", i, c, o);
  n.set("selections", dS(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function jk(n, o, r, i, c) {
  const f = hS("landmark", i, c, o);
  n.set("landmarks", dS(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function Lk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    i.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Vk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    i.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Ik(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (i, c) => c === o ? { ...i, hidden: !i.hidden } : i
    )
  ), n.save_changes();
}
function Hk(n, o) {
  const r = Number(o);
  !Number.isFinite(r) || r < 0 || (n.set("point_size", r), n.save_changes());
}
function Uk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("point_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Bk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("landmark_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Gk(n, o) {
  const r = Math.round(Number(o));
  Number.isFinite(r) && (n.set("stroke_width", Math.min(12, Math.max(1, r))), n.save_changes());
}
function Yk(n, o, r) {
  const i = r[o];
  i && (n.set("copied_landmark", { ...i }), n.save_changes());
}
function qk(n, o, r) {
  const i = n.get("copied_landmark");
  if (!i) return;
  const c = Pk("landmark", [...r, i]), f = r.length;
  n.set(
    "landmarks",
    [...r, { ...i, id: c }]
  ), n.set("selected_kind", "landmark"), n.set("selected_index", f), n.save_changes();
}
function Pk(n, o) {
  const r = new Set(o.map((i) => String(i.id)));
  for (let i = 1; ; i++) {
    const c = `${n} ${i}`;
    if (!r.has(c)) return c;
  }
}
function Xk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    i.map(
      (f, d) => d === o ? { ...f, label: c } : f
    )
  ), n.save_changes());
}
const Fh = "9.1.14", Fk = `https://esm.sh/@deck.gl/core@${Fh}`, Kk = `https://esm.sh/@deck.gl/layers@${Fh}?deps=@deck.gl/core@${Fh}`, ka = { depthCompare: "always", depthWriteEnabled: !1 }, Zv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], $v = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], vh = "#00e5cc", Qk = 0.3, Zk = 0.9, Qc = 2, xh = 1, $k = 0.55, Sh = ["line", "spline", "gradient"];
function Eh(n) {
  if (!n) return new Float32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let i = 0; i < o.length; i++) r[i] = o.charCodeAt(i);
  return new Float32Array(r.buffer);
}
function Ch(n) {
  if (!n) return new Int32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let i = 0; i < o.length; i++) r[i] = o.charCodeAt(i);
  return new Int32Array(r.buffer);
}
function Jk(n) {
  return 1 - (1 - n) ** 4;
}
function Zc(n) {
  const o = document.createElement("canvas");
  o.width = o.height = 1;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  r.fillStyle = "#000000", r.fillStyle = n, r.fillRect(0, 0, 1, 1);
  const [i, c, f, d] = r.getImageData(0, 0, 1, 1).data;
  return [i / 255, c / 255, f / 255, d / 255 || 1];
}
function Jv({ model: n, host: o }) {
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
    h(), O && rt();
  });
  y.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function S(T, N, M) {
    g.textContent = T, g.hidden = !1;
    const z = o.getBoundingClientRect();
    g.style.left = `${N - z.left + 12}px`, g.style.top = `${M - z.top + 12}px`;
  }
  function v() {
    g.hidden = !0;
  }
  m.addEventListener("mousedown", (T) => T.stopPropagation()), m.addEventListener("wheel", (T) => T.stopPropagation(), { passive: !0 });
  const C = n.get("modes") || [], _ = ["select", "lasso"].filter(
    (T) => C.includes(T)
  ), A = ["point", "line", "spline", "shape"].filter(
    (T) => C.includes(T)
  ), R = [..._, ...A];
  let w = n.get("mode") || "select";
  R.includes(w) || (w = R[0] || "select");
  let O = null, k = null, D = null, L = 0, I = !1, B = null, V = null, P = { key: "", data: [] }, ee = null, se = !1, fe = [], le = () => {
  }, me = () => {
  }, be = null, U = null, G = null, K = null;
  function ve() {
    const T = n.get("category_codes") || "";
    be = T ? Ch(T) : null;
  }
  ve();
  function ie() {
    const T = n.get("gene_values") || "";
    U = T ? Eh(T) : null;
  }
  ie();
  function j() {
    G = F(
      n.get("neighbor_indptr") || "",
      n.get("neighbor_indices") || "",
      n.get("neighbor_distances") || ""
    ), K = F(
      n.get("radius_indptr") || "",
      n.get("radius_indices") || "",
      n.get("radius_distances") || ""
    );
  }
  function F(T, N, M) {
    const z = Ch(T), q = Ch(N), Q = Eh(M);
    return z.length ? { indptr: z, indices: q, distances: Q } : null;
  }
  j();
  function te() {
    const T = n.get("category_columns") || [], N = n.get("active_category") || "";
    return T.findIndex((M) => M.name === N);
  }
  function oe(T) {
    n.get("category_columns");
    const N = te(), M = qt();
    return N < 0 || !be || !M.length ? Math.round(M[T]?.valueA || 0) : be[N * M.length + T];
  }
  const ge = ["#ff0099", "#b8ff00", "#00b7ff"];
  function _e(T) {
    return (n.get("gene_columns") || []).find((M) => M.name === T) || null;
  }
  function Ye(T, N) {
    const z = (n.get("gene_columns") || []).findIndex((Q) => Q.name === N), q = qt();
    return z < 0 || !U || !U.length || !q.length ? null : U[z * q.length + T];
  }
  function we(T, N, M) {
    const z = Number.isFinite(N) ? N : 0, q = Number.isFinite(M) && M > z ? M : z + 1, Q = Math.max(0, Math.min(1, T ?? 0)), ne = Math.max(0, z + Q * (q - z));
    return n.get("gene_log1p") ? Math.log1p(ne) : ne;
  }
  function Me(T, N) {
    const M = Number.isFinite(T) ? T : 0, z = Number.isFinite(N) && N > M ? N : M + 1, q = Math.max(0, z), Q = Math.max(0, M);
    if (n.get("gene_log1p")) {
      const ne = Math.log1p(Q), re = Math.log1p(q);
      return re > ne ? re : re + 1e-6;
    }
    return q > Q ? q : q + 1e-6;
  }
  function it(T, N) {
    const M = Number.isFinite(T) ? T : 0, z = Math.max(0, M);
    return n.get("gene_log1p") ? Math.log1p(z) : z;
  }
  function pt(T, N, M) {
    const z = _e(N);
    if (!z) return 0;
    const q = Ye(T, N);
    if (q == null) return 0;
    const Q = z.vmin ?? 0, ne = z.vmax ?? 1, re = we(q, Q, ne);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const Qe = M > 0 ? M : Me(Q, ne);
      return Math.max(0, Math.min(1, re / Qe));
    }
    const Ce = it(Q), ze = Me(Q, ne);
    return ze <= Ce ? 0 : Math.max(0, Math.min(1, (re - Ce) / (ze - Ce)));
  }
  function ke(T) {
    let N = 0;
    for (const M of T) {
      const z = _e(M);
      z && (N = Math.max(N, Me(z.vmin ?? 0, z.vmax ?? 1)));
    }
    return N;
  }
  function tt(T, N) {
    const M = n.get("active_genes") || [], z = qt();
    if (!M.length || !z.length) return null;
    const q = (n.get("gene_scale_mode") || "independent") === "shared" ? ke(M) : 0;
    let Q = 0, ne = 0, re = 0, de = 0;
    for (let Ce = 0; Ce < M.length; Ce++) {
      const ze = pt(T, M[Ce], q);
      if (!(ze > 0)) continue;
      const Qe = St(ge[Ce % ge.length], 1);
      Q += Qe[0] * ze, ne += Qe[1] * ze, re += Qe[2] * ze, de += ze;
    }
    return de < 1e-6 ? St("#6b7280", N * 0.35) : [
      Math.min(255, Math.round(Q)),
      Math.min(255, Math.round(ne)),
      Math.min(255, Math.round(re)),
      Math.round(Math.max(0, Math.min(1, N)) * 255)
    ];
  }
  let Te = null, Oe = [], Ue = !1, Re = null, Fe = "", Ae = -1, $e = !1, nt = !1, Ke = null, Se = -1, Z = -1, ce = !1, He = [], ye = !1, Le = null, Je = null;
  function Mt(T, N) {
    const M = new Set((N || []).map((z) => String(z.id)));
    for (let z = 1; ; z++) {
      const q = `${T} ${z}`;
      if (!M.has(q)) return q;
    }
  }
  function Et(T) {
    return Mt("landmark", T);
  }
  function jt(T) {
    return Mt("selection", T);
  }
  function Ot() {
    Oe = [], He = [], ce = !1, ye = !1, Le = null, Je = null;
  }
  function xt(T) {
    const N = d.getBoundingClientRect();
    if (!N.width || !N.height) return null;
    const M = T.clientX - N.left, z = T.clientY - N.top, q = O?.isInitialized ? O.getViewports()[0] : null;
    if (!q) return null;
    const [Q, ne] = q.unproject([M, z]);
    return { x: Q, y: ne, px: M, py: z };
  }
  function an() {
    return {
      dragPan: w === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function dt() {
    const T = w === "select";
    d.style.cursor = T ? "grab" : "crosshair", O && O.setProps({ controller: an() });
  }
  function mn() {
    const T = Math.max(1, Math.round(c.clientWidth || 1)), N = Math.max(1, Math.round(c.clientHeight || 1));
    O && O.setProps({ width: T, height: N, useDevicePixels: !0 });
    const M = n.get("axes_pixel_bounds") || [0, 0, T, N];
    return (M[2] !== T || M[3] !== N) && (n.set("axes_pixel_bounds", [0, 0, T, N]), n.save_changes()), { w: T, h: N };
  }
  function Qt(T) {
    if (!Number.isFinite(T)) return "";
    const N = Math.abs(T);
    return N !== 0 && (N >= 1e3 || N < 0.01) ? T.toExponential(1) : N >= 100 ? T.toFixed(0) : N >= 10 ? T.toFixed(1) : T.toFixed(2);
  }
  function tn() {
    if (!m) return;
    const T = n.get("color_by") || "categorical", N = n.get("legend_title") || "", M = n.get("point_palette") || [], z = n.get("active_genes") || [];
    if (m.innerHTML = "", N) {
      const q = document.createElement("div");
      q.className = "landmarks__legend-title", q.textContent = N, m.appendChild(q);
    }
    if (T === "continuous" && z.length > 0) {
      m.hidden = !0;
      return;
    }
    if (T === "continuous" && M.length > 1) {
      const q = document.createElement("div");
      q.className = "landmarks__legend-bar", q.style.background = `linear-gradient(to top, ${M[0]}, ${M[Math.floor(M.length / 2)]}, ${M[M.length - 1]})`;
      const Q = document.createElement("div");
      Q.className = "landmarks__legend-scale";
      const ne = document.createElement("span");
      ne.textContent = Qt(n.get("color_vmax"));
      const re = document.createElement("span");
      re.textContent = Qt(n.get("color_vmin")), Q.appendChild(ne), Q.appendChild(re);
      const de = document.createElement("div");
      de.className = "landmarks__legend-continuous", de.appendChild(q), de.appendChild(Q), m.appendChild(de), m.hidden = !1;
      return;
    }
    if (T === "categorical") {
      m.hidden = !0;
      return;
    }
    m.hidden = !N;
  }
  function St(T, N) {
    const M = String(T || "#60a5fa").replace("#", ""), z = M.length === 3 ? M.split("").map((Q) => Q + Q).join("") : M.padEnd(6, "0").slice(0, 6), q = Number.parseInt(z, 16);
    return [
      q >> 16 & 255,
      q >> 8 & 255,
      q & 255,
      Math.round(Math.max(0, Math.min(1, N)) * 255)
    ];
  }
  function Jt(T) {
    const N = n.get("point_opacity") ?? 0.75, M = n.get("color_by") || "categorical";
    let z;
    if (M === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        z = tt(T.i, N) || St("#6b7280", N * 0.35);
      else {
        const ne = n.get("point_palette") || ["#60a5fa"];
        if (ne.length > 1) {
          const de = Math.max(0, Math.min(1, T.valueA)) * (ne.length - 1), Ce = Math.floor(de), ze = Math.min(ne.length - 1, Ce + 1), Qe = de - Ce, Ie = St(ne[Ce], N), Ne = St(ne[ze], N);
          z = Ie.map((Nt, sn) => Math.round(Nt + (Ne[sn] - Nt) * Qe));
        } else
          z = St(ne[0], N);
      }
    else {
      const Q = n.get("category_columns") || [], ne = te(), re = ne >= 0 ? Q[ne] : null, de = re && re.palette || n.get("point_palette") || ["#60a5fa"], Ce = re ? oe(T.i) : Math.round(T.valueA);
      z = St(de[(Ce % de.length + de.length) % de.length], N);
    }
    if (!se || !ee) return z;
    const q = ee[T.i] || 0;
    return q === Qc || q === xh ? (z[3] = 255, z) : (z[3] = Math.round((z[3] || 255) * 0.28), z);
  }
  function at(T) {
    const N = n.get("point_size") ?? 2;
    if (!se || !ee) return N;
    const M = ee[T.i] || 0;
    return M === Qc || M === xh ? N : N * $k;
  }
  function lt(T) {
    return T.map((N) => [N.x, N.y]);
  }
  function We(T) {
    const N = lt(T);
    if (!N.length) return N;
    const M = N[0], z = N[N.length - 1];
    return (M[0] !== z[0] || M[1] !== z[1]) && N.push(M), N;
  }
  function Wt(T, N) {
    if (w === "ellipse") {
      const M = (T.x + N.x) / 2, z = (T.y + N.y) / 2, q = Math.abs(N.x - T.x) / 2, Q = Math.abs(N.y - T.y) / 2, ne = [];
      for (let re = 0; re < 64; re++) {
        const de = re / 64 * Math.PI * 2;
        ne.push([M + q * Math.cos(de), z + Q * Math.sin(de)]);
      }
      return ne;
    }
    return [
      [T.x, T.y],
      [N.x, T.y],
      [N.x, N.y],
      [T.x, N.y]
    ];
  }
  function Rn(T) {
    if (T.type === "polygon" || T.type === "lasso")
      return (T.vertices || []).map(([M, z]) => [M, z]);
    const N = -(T.angle || 0);
    if (T.type === "rectangle") {
      const M = T.cx, z = T.cy, q = T.width, Q = T.height, ne = { x: M, y: z };
      return [
        { x: M - q / 2, y: z - Q / 2 },
        { x: M + q / 2, y: z - Q / 2 },
        { x: M + q / 2, y: z + Q / 2 },
        { x: M - q / 2, y: z + Q / 2 }
      ].map((re) => {
        const de = en(re, ne, N);
        return [de.x, de.y];
      });
    }
    if (T.type === "ellipse") {
      const M = T.cx, z = T.cy, q = T.rx, Q = T.ry, ne = { x: M, y: z }, re = [];
      for (let de = 0; de < 64; de++) {
        const Ce = de / 64 * Math.PI * 2, ze = en(
          { x: M + q * Math.cos(Ce), y: z + Q * Math.sin(Ce) },
          ne,
          N
        );
        re.push([ze.x, ze.y]);
      }
      return re;
    }
    return [];
  }
  function qt() {
    const T = n.get("points_data") || "", [N, M] = n.get("x_bounds"), [z, q] = n.get("y_bounds"), Q = `${T.length}:${N}:${M}:${z}:${q}:${T.slice(0, 32)}:${T.slice(-32)}`;
    if (Q === P.key) return P.data;
    const ne = Eh(T), re = Math.floor(ne.length / 4), de = new Array(re);
    for (let Ce = 0; Ce < re; Ce++) {
      const ze = Ce * 4;
      de[Ce] = {
        i: Ce,
        x: N + (ne[ze] + 1) / 2 * (M - N),
        y: z + (ne[ze + 1] + 1) / 2 * (q - z),
        valueA: ne[ze + 2]
      };
    }
    return P = { key: Q, data: de }, de;
  }
  function Bt(T, N = 8) {
    const M = T / Math.max(N, 1), q = 10 ** Math.floor(Math.log10(Math.max(M, 1e-12))), Q = M / q;
    return (Q <= 1 ? 1 : Q <= 2 ? 2 : Q <= 5 ? 5 : 10) * q;
  }
  function Pn() {
    const T = O?.isInitialized ? O.getViewports()?.[0] : null;
    if (T?.unproject && T.width > 1 && T.height > 1) {
      const [Q, ne] = T.unproject([0, T.height]), [re, de] = T.unproject([T.width, 0]);
      return {
        xMin: Math.min(Q, re),
        xMax: Math.max(Q, re),
        yMin: Math.min(ne, de),
        yMax: Math.max(ne, de)
      };
    }
    const [N, M] = n.get("x_bounds"), [z, q] = n.get("y_bounds");
    return { xMin: N, xMax: M, yMin: z, yMax: q };
  }
  function kt() {
    const T = Pn(), N = Math.max(T.xMax - T.xMin, T.yMax - T.yMin, 1e-9);
    return Bt(N, 8);
  }
  function uo(T = !1) {
    const N = kt();
    !T && N === V || (V = N, rt());
  }
  function Xn() {
    if (!k) return null;
    const { PathLayer: T } = k, N = Pn(), M = V || Bt(Math.max(N.xMax - N.xMin, N.yMax - N.yMin, 1e-9), 8);
    V = M;
    const z = M * 2, q = Math.floor((N.xMin - z) / M) * M, Q = Math.floor((N.yMin - z) / M) * M, ne = [];
    for (let Ie = q; Ie <= N.xMax + z + M * 0.5; Ie += M)
      ne.push({
        path: [
          [Ie, N.yMin - z],
          [Ie, N.yMax + z]
        ]
      });
    for (let Ie = Q; Ie <= N.yMax + z + M * 0.5; Ie += M)
      ne.push({
        path: [
          [N.xMin - z, Ie],
          [N.xMax + z, Ie]
        ]
      });
    const re = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [de, Ce, ze] = Zc(re), Qe = [Math.round(de * 255), Math.round(Ce * 255), Math.round(ze * 255), 160];
    return new T({
      id: "landmarks-grid",
      data: ne,
      getPath: (Ie) => Ie.path,
      getColor: Qe,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function rn() {
    if (!k) return null;
    const { ScatterplotLayer: T } = k, N = qt();
    if (!N.length) return null;
    const z = [
      n.get("point_size") ?? 2,
      se,
      n.get("selected_kind"),
      n.get("selected_index"),
      n.get("type_neighborhoods"),
      n.get("selections"),
      n.get("active_category")
    ], q = [
      n.get("point_palette"),
      n.get("point_opacity"),
      n.get("color_by"),
      n.get("active_genes"),
      n.get("gene_values"),
      n.get("gene_scale_mode"),
      n.get("gene_log1p"),
      ...z
    ];
    return [
      new T({
        id: "landmarks-points",
        data: N,
        getPosition: (Q) => [Q.x, Q.y, 0],
        getFillColor: (Q) => Jt(Q),
        getRadius: (Q) => at(Q),
        radiusUnits: "common",
        radiusMinPixels: 1.5,
        stroked: !1,
        filled: !0,
        pickable: !1,
        updateTriggers: {
          getFillColor: q,
          getRadius: z
        }
      })
    ];
  }
  function fo() {
    if (!k) return [];
    const { ScatterplotLayer: T } = k, N = n.get("selected_kind"), M = n.get("selected_index"), z = n.get("point_size") ?? 2, q = qt(), Q = [];
    return (n.get("selections") || []).forEach((ne, re) => {
      const de = Rn(ne);
      if (de.length < 3) return;
      const Ce = N === "selection" && re === M, ze = $v[re % $v.length], Qe = St(ze, Ce ? 0.22 : 0.1), Ie = St(ze, Ce ? 1 : 0.7), Ne = Ce ? z * 1.15 : z;
      for (let Nt = 0; Nt < q.length; Nt++) {
        const sn = q[Nt];
        Kn(sn, de) && Q.push({
          position: [sn.x, sn.y, 0],
          fill: Qe,
          line: Ie,
          radius: Ne,
          kind: "selection",
          index: re
        });
      }
    }), Q.length ? [
      new T({
        id: "selections",
        data: Q,
        getPosition: (ne) => ne.position,
        getFillColor: (ne) => ne.fill,
        getLineColor: (ne) => ne.line,
        getRadius: (ne) => ne.radius,
        getLineWidth: 1.5,
        radiusUnits: "common",
        radiusMinPixels: 2,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: ka,
        updateTriggers: {
          getFillColor: [N, M, n.get("selections")],
          getLineColor: [N, M, n.get("selections")],
          getRadius: [z, N, M, n.get("selections")]
        }
      })
    ] : [];
  }
  function Ml() {
    if (!k) return [];
    const { PathLayer: T, PolygonLayer: N, ScatterplotLayer: M } = k, z = n.get("selected_kind"), q = n.get("selected_index"), Q = n.get("stroke_width") || 2, ne = n.get("landmark_opacity") || 0.25, re = [], de = [], Ce = [], ze = [], Qe = Eo(14);
    (n.get("landmarks") || []).forEach((Ne, Nt) => {
      if (Ne.hidden) return;
      const sn = Zv[Nt % Zv.length], Un = z === "landmark" && Nt === q, aa = Un ? Q + 1 : Q, gn = St(sn, 1), el = St(sn, ne), wn = { kind: "landmark", index: Nt };
      if (Ne.type === "point") {
        const Qn = (Ne.vertices || [])[0];
        if (!Qn) return;
        Ce.push({
          position: [Qn[0], Qn[1], 0],
          fill: el,
          line: gn,
          lineWidth: Un ? 2 : 1.5,
          radius: Un ? 7 : 6,
          ...wn
        });
        return;
      }
      const tl = pn(Ne);
      if (Ne.type === "shape" && tl.length >= 3) {
        re.push({
          polygon: lt(tl),
          fill: el,
          line: gn,
          width: aa,
          ...wn
        }), (Ne.vertices || []).forEach(([Qn, oo]) => {
          Ce.push({
            position: [Qn, oo, 0],
            fill: gn,
            line: gn,
            lineWidth: 0,
            radius: Un ? 5 : 4,
            ...wn
          });
        });
        return;
      }
      const lo = Ar(Ne);
      if (lo && re.push({
        polygon: lt(lo),
        fill: St(vh, Qk),
        line: St(vh, Zk),
        width: 1.5,
        ...wn
      }), tl.length >= 2) {
        const Qn = lt(tl);
        if (de.push({
          path: Qn,
          color: gn,
          width: aa,
          ...wn
        }), ["line", "spline", "gradient"].includes(Ne.type)) {
          const oo = En(Qn, Qe);
          oo && ze.push({ polygon: oo, fill: gn, line: gn, width: 1, ...wn });
        }
        (Ne.vertices || []).forEach(([oo, Or]) => {
          Ce.push({
            position: [oo, Or, 0],
            fill: gn,
            line: gn,
            lineWidth: 0,
            radius: Un ? 5 : 4,
            ...wn
          });
        });
      }
    });
    const Ie = [];
    return (re.length || ze.length) && Ie.push(
      new N({
        id: "landmark-polygons",
        data: [...re, ...ze],
        getPolygon: (Ne) => Ne.polygon,
        getFillColor: (Ne) => Ne.fill,
        getLineColor: (Ne) => Ne.line,
        getLineWidth: (Ne) => Ne.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: ka
      })
    ), de.length && Ie.push(
      new T({
        id: "landmark-paths",
        data: de,
        getPath: (Ne) => Ne.path,
        getColor: (Ne) => Ne.color,
        getWidth: (Ne) => Ne.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: ka
      })
    ), Ce.length && Ie.push(
      new M({
        id: "landmark-markers",
        data: Ce,
        getPosition: (Ne) => Ne.position,
        getFillColor: (Ne) => Ne.fill,
        getLineColor: (Ne) => Ne.line,
        getRadius: (Ne) => Ne.radius,
        getLineWidth: (Ne) => Ne.lineWidth ?? 0,
        radiusUnits: "pixels",
        lineWidthUnits: "pixels",
        filled: !0,
        stroked: !0,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: ka
      })
    ), Ie;
  }
  function Jn() {
    if (!k) return [];
    const { PathLayer: T, PolygonLayer: N, ScatterplotLayer: M } = k, z = ["lasso", "polygon", "rectangle", "ellipse"].includes(w), q = z ? "#94a3b8" : "#00e5ff", Q = St(q, 1), ne = St(q, 0.15), re = n.get("stroke_width") || 4, de = [];
    let Ce = null, ze = null, Qe = [];
    if (ce && He.length >= 2)
      Ce = lt(He);
    else if (ye && Le && Je)
      ze = Wt(Le, Je);
    else if (Oe.length) {
      const Ie = w === "spline" ? In(Oe, n.get("default_tension") ?? 0, 20, !1) : w === "shape" ? In(Oe, n.get("default_tension") ?? 0, 20, !0) : Oe;
      w === "polygon" || w === "shape" ? (ze = lt(Ie), Ce = We(Ie)) : Ce = lt(Ie), Qe = Oe.map((Ne) => ({ position: [Ne.x, Ne.y, 0], fill: Q }));
    }
    return ze && ze.length >= 3 ? de.push(
      new N({
        id: "draft-polygon",
        data: [{ polygon: ze, fill: ne, line: Q, width: 2 }],
        getPolygon: (Ie) => Ie.polygon,
        getFillColor: (Ie) => Ie.fill,
        getLineColor: (Ie) => Ie.line,
        getLineWidth: (Ie) => Ie.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: ka
      })
    ) : Ce && Ce.length >= 2 && de.push(
      new T({
        id: "draft-path",
        data: [{ path: Ce, color: Q, width: z ? 2 : re }],
        getPath: (Ie) => Ie.path,
        getColor: (Ie) => Ie.color,
        getWidth: (Ie) => Ie.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: ka
      })
    ), Qe.length && de.push(
      new M({
        id: "draft-markers",
        data: Qe,
        getPosition: (Ie) => Ie.position,
        getFillColor: (Ie) => Ie.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: ka
      })
    ), de;
  }
  function Eo(T) {
    const N = O?.isInitialized ? O.getViewports()?.[0] : null;
    if (!N?.unproject) return T;
    const [M] = N.unproject([0, 0]), [z] = N.unproject([T, 0]);
    return Math.max(Math.abs(z - M), 1e-9);
  }
  function En(T, N) {
    if (!T || T.length < 2 || !(N > 0)) return null;
    const M = T[T.length - 2], z = T[T.length - 1], q = Math.hypot(z[0] - M[0], z[1] - M[1]) || 1, Q = (z[0] - M[0]) / q, ne = (z[1] - M[1]) / q, re = -ne, de = Q, Ce = [z[0] + Q * N * 0.15, z[1] + ne * N * 0.15], ze = [z[0] - Q * N, z[1] - ne * N];
    return [
      Ce,
      [ze[0] + re * N * 0.55, ze[1] + de * N * 0.55],
      [ze[0] - re * N * 0.55, ze[1] - de * N * 0.55]
    ];
  }
  function At(T, N, M, z) {
    const q = [], Q = [];
    if (!T || !M.length) return { edges: q, neighbors: Q };
    const ne = z?.mode || "knn", re = Math.max(0, z?.k | 0), de = Number(z?.radius) || 0;
    if (ne === "knn" && re <= 0) return { edges: q, neighbors: Q };
    if (ne === "radius" && !(de > 0)) return { edges: q, neighbors: Q };
    const { indptr: Ce, indices: ze, distances: Qe } = T, Ie = /* @__PURE__ */ new Set();
    for (const Ne of M) {
      const Nt = Ce[Ne] | 0, sn = Ce[Ne + 1] | 0, Un = N[Ne], aa = ne === "knn" ? Math.min(sn, Nt + re) : sn;
      for (let gn = Nt; gn < aa && !(ne === "radius" && (Qe && Qe.length ? Qe[gn] : 0) > de); gn++) {
        const el = ze[gn] | 0;
        Ie.has(el) || (Ie.add(el), Q.push(el)), q.push({
          path: [
            [Un.x, Un.y],
            [N[el].x, N[el].y]
          ]
        });
      }
    }
    return { edges: q, neighbors: Q };
  }
  function Ct() {
    if (!k) return [];
    const T = Zl(), N = kl(T);
    if (!T || !N || N.neighborhood === "off") return [];
    qt();
    const M = [], { PathLayer: z } = k, q = { kind: T.kind, index: T.index };
    return (N.neighborhood === "radius" || N.neighborhood === "knn") && fe.length && M.push(
      new z({
        id: `neighborhood-${N.neighborhood}`,
        data: fe.map((Q) => ({ ...Q, ...q })),
        getPath: (Q) => Q.path,
        getColor: St(vh, 0.45),
        getWidth: 1.25,
        widthUnits: "pixels",
        pickable: !0,
        parameters: ka
      })
    ), M;
  }
  function Ge() {
    return $l(), [
      Xn(),
      ...Ct(),
      ...rn(),
      ...fo(),
      ...Ml(),
      ...Jn()
    ].filter(Boolean);
  }
  function Ln(T, N) {
    const [M, z] = n.get("x_bounds"), [q, Q] = n.get("y_bounds"), ne = (M + z) / 2, re = (q + Q) / 2, de = Math.max(z - M, 1e-6), Ce = Math.max(Q - q, 1e-6), ze = 40, Qe = Math.log2(
      Math.min((T - ze * 2) / de, (N - ze * 2) / Ce)
    );
    return {
      target: [ne, re, 0],
      zoom: Qe,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function wr() {
    if (!O) return;
    const T = Math.max(1, d.clientWidth || d.width), N = Math.max(1, d.clientHeight || d.height);
    T <= 1 || N <= 1 || (D = Ln(T, N), B = D.zoom, O.setProps({ viewState: D, width: T, height: N }), I = !0);
  }
  function Mr(T, { animate: N = !1, duration: M = 320 } = {}) {
    if (!O) return;
    const z = {
      ...D,
      ...T,
      transitionDuration: N ? M : 0
    };
    N && (!Te && k?.LinearInterpolator && (Te = new k.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), Te && (z.transitionInterpolator = Te), z.transitionEasing = Jk), D = z, O.setProps({ viewState: z });
  }
  le = (T) => {
    if (!O || !D) return;
    const N = D.minZoom ?? -20, M = D.maxZoom ?? 20, z = Math.max(N, Math.min(M, (D.zoom ?? 0) + T));
    Mr({ zoom: z }, { animate: !0 });
  }, me = () => {
    if (!O) return;
    const T = Math.max(1, d.clientWidth || d.width), N = Math.max(1, d.clientHeight || d.height);
    if (T <= 1 || N <= 1) return;
    const M = Ln(T, N);
    B = M.zoom, I = !0, Mr(
      {
        target: M.target,
        zoom: M.zoom,
        minZoom: M.minZoom,
        maxZoom: M.maxZoom
      },
      { animate: !0, duration: 320 }
    ), rt();
  };
  function Co() {
    const T = String(n.get("plot_background") || "").trim();
    if (T) return T;
    const N = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return N || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  h = () => {
    const T = Co();
    f.style.background = T, d.style.background = T, O && (O.setProps({
      parameters: { clearColor: Zc(T) },
      ...D ? { viewState: D } : {}
    }), typeof O.redraw == "function" && O.redraw(!0));
  };
  function Al(T) {
    if (!O) return;
    const N = Co();
    O.setProps({
      parameters: { clearColor: Zc(N) },
      ...T,
      ...D ? { viewState: D } : {}
    });
  }
  function rt() {
    !O || !k || L || (L = requestAnimationFrame(() => {
      L = 0, Al({ layers: Ge() });
    }));
  }
  async function fl() {
    if (k) return k;
    const T = await import(
      /* @vite-ignore */
      Fk
    ), N = await import(
      /* @vite-ignore */
      Kk
    );
    return k = {
      Deck: T.Deck,
      OrthographicView: T.OrthographicView,
      LinearInterpolator: T.LinearInterpolator,
      ScatterplotLayer: N.ScatterplotLayer,
      PathLayer: N.PathLayer,
      PolygonLayer: N.PolygonLayer
    }, k;
  }
  async function Tl() {
    if (O) return;
    const { w: T, h: N } = mn();
    d.style.display = "block", h();
    try {
      const { Deck: M, OrthographicView: z } = await fl(), q = Ge();
      if (!q.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const Q = Ln(T, N);
      D = Q, B = Q.zoom;
      const ne = Co();
      O = new M({
        canvas: d,
        width: T,
        height: N,
        useDevicePixels: !0,
        views: new z(),
        controller: an(),
        initialViewState: Q,
        parameters: { clearColor: Zc(ne) },
        layers: q,
        pickingRadius: 8,
        getCursor: ({ isDragging: re, isHovering: de }) => re ? "grabbing" : de ? "pointer" : w === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: re }) => {
          D = re, O.setProps({ viewState: re }), uo();
        },
        onClick: (re) => {
          if (w !== "select") return;
          const de = re?.object;
          de?.kind === "landmark" || de?.kind === "selection" || de?.kind === "type" ? Jl(de.kind, de.index) : Jl("", -1);
        },
        onHover: (re) => {
          const de = re?.object;
          if (de?.kind === "landmark" || de?.kind === "selection" || de?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          w === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          tn(), requestAnimationFrame(() => {
            mn(), wr(), Al({ layers: Ge() }), typeof O.redraw == "function" && O.redraw(!0);
          });
        }
      }), dt();
    } catch (M) {
      console.error("landmarks deck init failed", M);
      const z = document.createElement("div");
      z.className = "landmarks__error", z.textContent = `Deck renderer failed: ${M?.message || M}`, f.appendChild(z);
    }
  }
  function Vn() {
    if (!O) return;
    const { w: T, h: N } = mn();
    Al({ width: T, height: N }), !I && T > 1 && N > 1 ? wr() : typeof O.redraw == "function" && O.redraw(!0);
  }
  function In(T, N, M, z) {
    const q = M, ne = (1 - Math.max(0, Math.min(1, N ?? 0))) / 2;
    let re = T.slice(), de, Ce;
    if (z) {
      if (re.length >= 2) {
        const Ie = re[0], Ne = re[re.length - 1];
        Ie.x === Ne.x && Ie.y === Ne.y && (re = re.slice(0, -1));
      }
      if (re.length < 3) return re.slice();
      const Qe = re.length;
      Ce = (Ie) => re[(Ie % Qe + Qe) % Qe], de = Qe;
    } else {
      if (re.length < 2 || re.length === 2) return re.slice();
      const Qe = [
        { x: 2 * re[0].x - re[1].x, y: 2 * re[0].y - re[1].y },
        ...re,
        {
          x: 2 * re[re.length - 1].x - re[re.length - 2].x,
          y: 2 * re[re.length - 1].y - re[re.length - 2].y
        }
      ];
      Ce = (Ie) => Qe[Ie + 1], de = re.length - 1;
    }
    const ze = [];
    for (let Qe = 0; Qe < de; Qe++) {
      const Ie = Ce(Qe - 1), Ne = Ce(Qe), Nt = Ce(Qe + 1), sn = Ce(Qe + 2), Un = ne * (Nt.x - Ie.x), aa = ne * (Nt.y - Ie.y), gn = ne * (sn.x - Ne.x), el = ne * (sn.y - Ne.y);
      for (let wn = 0; wn < q; wn++) {
        const tl = wn / q, lo = tl * tl, Qn = lo * tl, oo = 2 * Qn - 3 * lo + 1, Or = Qn - 2 * lo + tl, kr = -2 * Qn + 3 * lo, Ds = Qn - lo;
        ze.push({
          x: oo * Ne.x + Or * Un + kr * Nt.x + Ds * gn,
          y: oo * Ne.y + Or * aa + kr * Nt.y + Ds * el
        });
      }
    }
    return ze.push({ ...Ce(z ? de : re.length - 1) }), ze;
  }
  function en(T, N, M) {
    const z = Math.cos(M), q = Math.sin(M), Q = T.x - N.x, ne = T.y - N.y;
    return { x: N.x + Q * z - ne * q, y: N.y + Q * q + ne * z };
  }
  function pn(T) {
    const N = (T.vertices || []).map(([M, z]) => ({ x: M, y: z }));
    return T.type === "spline" || T.type === "gradient" ? In(N, T.tension ?? 0, 20, !1) : T.type === "shape" ? In(N, T.tension ?? 0, 20, !0) : N;
  }
  function Hn() {
    const [T, N] = n.get("x_bounds"), [M, z] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(N - T), Math.abs(z - M));
  }
  function Ol() {
    return Math.max(1, n.get("neighbor_k_max") || 64);
  }
  function Ql() {
    const T = Number(n.get("neighbor_radius_max") || 0);
    return T > 0 ? T : Hn();
  }
  function _o(T, N) {
    return T.map((M, z) => {
      const q = T[Math.max(0, z - 1)], Q = T[Math.min(T.length - 1, z + 1)], ne = Math.hypot(Q.x - q.x, Q.y - q.y) || 1, re = (Q.x - q.x) / ne, de = (Q.y - q.y) / ne;
      return { x: M.x - de * N, y: M.y + re * N };
    });
  }
  function Ar(T) {
    const N = Number(T.buffer_width || 0);
    if (!(N > 0) || !Sh.includes(T.type)) return null;
    const M = pn(T);
    if (M.length < 2) return null;
    const z = T.buffer_side || "both";
    return z === "left" ? [...M, ..._o(M, N).reverse()] : z === "right" ? [...M, ..._o(M, -N).reverse()] : [..._o(M, N), ..._o(M, -N).reverse()];
  }
  function Zl() {
    const T = n.get("selected_kind"), N = n.get("selected_index");
    return T === "type" || T === "selection" ? { kind: T, index: N } : null;
  }
  function Ro() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function kl(T) {
    return T ? cS(
      T.kind,
      T.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function ea() {
    return kl(Zl());
  }
  function Wn() {
    const T = Ro();
    if (!T) return null;
    const N = n.get("landmarks") || [];
    return T.index >= 0 && T.index < N.length ? N[T.index] : null;
  }
  function nn(T) {
    const N = Zl();
    N && (uS(
      n,
      N.kind,
      N.index,
      T,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ), rt());
  }
  function Fn(T) {
    const N = qt();
    if (!T) return [];
    if (T.kind === "type")
      return N.reduce((M, z, q) => (oe(q) === T.index && M.push(q), M), []);
    if (T.kind === "selection") {
      const M = (n.get("selections") || [])[T.index], z = Rn(M || {});
      return z.length < 3 ? [] : N.reduce((q, Q, ne) => (Kn(Q, z) && q.push(ne), q), []);
    }
    return [];
  }
  function Kn(T, N) {
    let M = !1;
    for (let z = 0, q = N.length - 1; z < N.length; q = z++) {
      const Q = N[z][0], ne = N[z][1], re = N[q][0], de = N[q][1];
      ne > T.y != de > T.y && T.x < (re - Q) * (T.y - ne) / (de - ne + 1e-12) + Q && (M = !M);
    }
    return M;
  }
  function $l() {
    const T = qt();
    ee = new Uint8Array(T.length), se = !1, fe = [];
    const N = Zl();
    if (!N) return;
    const M = Fn(N);
    if (!M.length) {
      se = !0;
      return;
    }
    se = !0;
    for (const Q of M) ee[Q] = Qc;
    const z = kl(N);
    if (!z || z.neighborhood === "off") return;
    const q = z.neighborhood === "radius" ? K : G;
    if (z.neighborhood === "radius" || z.neighborhood === "knn") {
      const Q = Math.min(Number(z.neighborhood_k) || 12, Ol());
      let ne = Number(z.neighborhood_radius) || 0;
      const re = Ql();
      re > 0 && (ne = Math.min(ne, re));
      const de = At(q, T, M, {
        mode: z.neighborhood,
        k: Q,
        radius: ne
      });
      fe = de.edges;
      for (const Ce of de.neighbors)
        ee[Ce] !== Qc && (ee[Ce] = xh);
    }
  }
  function wo(T) {
    const N = Ro();
    N && (fS(n, N.index, T, n.get("landmarks") || []), rt());
  }
  function Mo(T) {
    if (!O?.isInitialized || !T) return null;
    const M = O.pickObject({ x: T.px, y: T.py, radius: 8 })?.object;
    return M?.kind ? { kind: M.kind, index: M.index } : null;
  }
  function Jl(T, N) {
    Xh(n, T, N), rt();
  }
  function Gt() {
    tn();
  }
  function Ao() {
    if (!["polygon", "line", "spline", "shape"].includes(w)) return;
    const N = w === "line" || w === "spline" ? 2 : 3;
    if (Oe.length < N) {
      Oe = [], rt();
      return;
    }
    if (w === "polygon") {
      const q = [...n.get("selections") || []];
      q.push(Kc({
        id: jt(q),
        type: "polygon",
        vertices: Oe.map((Q) => [Q.x, Q.y])
      })), Oe = [], n.set("selections", q), n.set("selected_kind", "selection"), n.set("selected_index", q.length - 1), n.save_changes(), Gt(), rt();
      return;
    }
    const M = [...n.get("landmarks") || []], z = {
      id: Et(M),
      type: w,
      vertices: Oe.map((q) => [q.x, q.y])
    };
    (w === "spline" || w === "shape") && (z.tension = n.get("default_tension") ?? 0), Sh.includes(w) && (z.buffer_width = n.get("default_buffer_width") ?? 0, z.buffer_side = n.get("default_buffer_side") || "both"), M.push(z), Oe = [], n.set("landmarks", M), n.set("selected_kind", "landmark"), n.set("selected_index", M.length - 1), n.save_changes(), Gt(), rt();
  }
  function Tr(T, N) {
    if (O?.isInitialized) {
      const M = O.getViewports()[0];
      if (M) {
        const z = M.unproject([0, 0]), q = M.unproject([T, N]);
        return { dx: q[0] - z[0], dy: q[1] - z[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function ta(T, N, M, z) {
    const { dx: q, dy: Q } = Tr(M, z);
    if (T === "landmark") {
      const ne = n.get("landmarks") || [];
      n.set(
        "landmarks",
        ne.map(
          (re, de) => de !== N ? re : { ...re, vertices: (re.vertices || []).map(([Ce, ze]) => [Ce + q, ze + Q]) }
        )
      );
    } else {
      const ne = n.get("selections") || [];
      n.set(
        "selections",
        ne.map((re, de) => de !== N ? re : re.vertices ? { ...re, vertices: re.vertices.map(([Ce, ze]) => [Ce + q, ze + Q]) } : { ...re, cx: re.cx + q, cy: re.cy + Q })
      );
    }
    n.save_changes(), rt();
  }
  function dl(T) {
    const N = Ro();
    if (!N) return null;
    const M = n.get("landmarks") || [], z = N.index >= 0 && N.index < M.length ? M[N.index] : null;
    if (!z || !z.vertices) return null;
    for (let q = 0; q < z.vertices.length; q++) {
      const Q = z.vertices[q], ne = T.x - Q[0], re = T.y - Q[1];
      if (Math.hypot(ne, re) < 6) return { index: q, landmarkIdx: N.index };
    }
    return null;
  }
  function Fa(T, N) {
    Se = T, Z = N;
  }
  function To(T) {
    if (w === "select") return;
    T.preventDefault(), d.focus();
    const N = xt(T);
    if (!N) return;
    $e = !1;
    const M = Mo(N);
    if (w === "lasso") {
      if (M && M.kind === n.get("selected_kind") && M.index === n.get("selected_index")) {
        Ue = !0, Re = N, Fe = M.kind, Ae = M.index;
        return;
      }
      if (M) {
        Jl(M.kind, M.index), suppressClick = !0;
        return;
      }
      ce = !0, He = [N], rt();
      return;
    }
    if (w === "rectangle" || w === "ellipse") {
      if (M && M.kind === n.get("selected_kind") && M.index === n.get("selected_index")) {
        Ue = !0, Re = N, Fe = M.kind, Ae = M.index;
        return;
      }
      if (M) {
        Jl(M.kind, M.index), suppressClick = !0;
        return;
      }
      ye = !0, Le = N, Je = N, rt();
      return;
    }
    if (Oe.length === 0) {
      const q = n.get("selected_kind"), Q = n.get("selected_index");
      if (M && M.kind === q && M.index === Q) {
        Ue = !0, Re = N, Fe = M.kind, Ae = M.index, d.style.cursor = "grabbing";
        return;
      }
      if (M) {
        Jl(M.kind, M.index), suppressClick = !0;
        return;
      }
      Q >= 0 && Jl("", -1);
    }
    w !== "select" && Oe.length === 0 && !M && (nt = !0, Ke = N, Oe = [N], rt());
    const z = dl(N);
    if (z && w !== "select") {
      Fa(z.index, z.landmarkIndex);
      return;
    }
  }
  function Wl(T) {
    const N = xt(T);
    if (!N) return;
    if (Ue && Re && Ae >= 0) {
      const q = N.px - Re.px, Q = N.py - Re.py;
      (q || Q) && ($e = !0), ta(Fe, Ae, q, Q), Re = N;
      return;
    }
    if (ce) {
      He.push(N), rt();
      return;
    }
    if (ye) {
      Je = N, rt();
      return;
    }
    if (Se >= 0 && Z >= 0) {
      const q = Ro();
      if (q && q.index === Z) {
        const Q = n.get("landmarks") || [], ne = Q[q.index];
        ne && ne.vertices && Se < ne.vertices.length && (ne.vertices[Se] = [N.x, N.y], n.set("landmarks", Q), rt());
      }
      Se = -1, Z = -1;
      return;
    }
    if (Oe.length > 0 && ["polygon", "line", "spline", "shape"].includes(w)) {
      const q = w === "line" || w === "spline" ? 2 : 3;
      S(Oe.length >= q ? "Enter to finish" : "Click", T.clientX, T.clientY);
      return;
    }
    if (nt && Ke) {
      const q = N.px - Ke.px, Q = N.py - Ke.py;
      q * q + Q * Q > 9 && (Oe.push(N), Ke = N, rt());
      return;
    }
    if (w === "select") return;
    const z = Mo(N);
    if (z && (z.kind === "landmark" || z.kind === "selection")) {
      const q = z.kind === "landmark" ? n.get("landmarks") : n.get("selections"), Q = q?.[z.index]?.id, ne = q?.[z.index]?.label;
      if (Q) {
        const re = ne ? `${Q} (${ne})` : Q;
        S(String(re), T.clientX, T.clientY);
        return;
      }
    }
    v();
  }
  function na(T) {
    if (w === "select" && !Ue) return;
    const N = xt(T);
    if (ce) {
      if (ce = !1, He.length >= 3) {
        const M = [...n.get("selections") || []];
        M.push(Kc({
          id: jt(M),
          type: "lasso",
          vertices: He.map((z) => [z.x, z.y])
        })), n.set("selections", M), n.set("selected_kind", "selection"), n.set("selected_index", M.length - 1), n.save_changes();
      }
      He = [], Gt(), rt();
      return;
    }
    if (ye) {
      if (ye = !1, Le && Je) {
        const M = Le, z = Je, q = (M.x + z.x) / 2, Q = (M.y + z.y) / 2, ne = Math.abs(z.x - M.x), re = Math.abs(z.y - M.y);
        if (ne > 1e-6 && re > 1e-6) {
          const de = [...n.get("selections") || []];
          w === "rectangle" ? de.push(Kc({ id: jt(de), type: "rectangle", cx: q, cy: Q, width: ne, height: re, angle: 0 })) : de.push(Kc({ id: jt(de), type: "ellipse", cx: q, cy: Q, rx: ne / 2, ry: re / 2, angle: 0 })), n.set("selections", de), n.set("selected_kind", "selection"), n.set("selected_index", de.length - 1), n.save_changes();
        }
      }
      Le = null, Je = null, Gt(), rt();
      return;
    }
    if (Ue && (Ue = !1, Re = null, Fe = "", Ae = -1, d.style.cursor = "crosshair", $e)) {
      suppressClick = !0, $e = !1;
      return;
    }
    if (suppressClick) {
      suppressClick = !1;
      return;
    }
    if (N) {
      if (nt) {
        nt = !1, Oe.length >= 2 ? Ao() : (Oe = [], rt());
        return;
      }
      if (!(w === "select" || w === "lasso" || w === "rectangle" || w === "ellipse")) {
        if (w === "point") {
          const M = [...n.get("landmarks") || []];
          M.push({ id: Et(M), type: "point", vertices: [[N.x, N.y]] }), n.set("landmarks", M), n.set("selected_kind", "landmark"), n.set("selected_index", M.length - 1), n.save_changes(), Gt(), rt();
          return;
        }
        Oe.push({ x: N.x, y: N.y }), rt();
      }
    }
  }
  function Ka() {
    v(), Ue && (Ue = !1, Re = null), ce && (ce = !1, He = [], rt()), ye && (ye = !1, Le = null, Je = null, rt());
  }
  function Oo(T) {
    T.preventDefault(), Oe.length && Oe.pop(), Ao(), v();
  }
  function Nl(T) {
    T.key === "Enter" ? (T.preventDefault(), Ao(), v()) : T.key === "Escape" ? (Ot(), Jl("", -1), rt()) : (T.key === "Backspace" || T.key === "Delete") && Oe.length && (Oe.pop(), rt());
  }
  const la = new AbortController(), { signal: hl } = la;
  d.addEventListener(
    "wheel",
    (T) => {
      if (!T.shiftKey) return;
      const N = Wn();
      if (N && Sh.includes(N.type)) {
        T.preventDefault(), T.stopImmediatePropagation();
        const z = Hn(), q = z / 40, Q = Math.max(
          0,
          Math.min(z, (Number(N.buffer_width) || 0) + (T.deltaY > 0 ? -q : q))
        );
        wo({ buffer_width: Q });
        return;
      }
      const M = ea();
      if (!(!M || M.neighborhood === "off")) {
        if (T.preventDefault(), T.stopImmediatePropagation(), M.neighborhood === "knn") {
          const z = Ol(), q = Math.max(
            1,
            Math.min(z, (Number(M.neighborhood_k) || 12) + (T.deltaY > 0 ? -1 : 1))
          );
          nn({ neighborhood: "knn", neighborhood_k: q });
          return;
        }
        if (M.neighborhood === "radius") {
          const z = Ql(), q = z / 40, Q = Math.max(
            0,
            Math.min(z, (Number(M.neighborhood_radius) || 0) + (T.deltaY > 0 ? -q : q))
          );
          nn({ neighborhood: "radius", neighborhood_radius: Q });
        }
      }
    },
    { capture: !0, passive: !1, signal: hl }
  ), d.addEventListener("mousedown", To, { signal: hl }), d.addEventListener("mousemove", Wl, { signal: hl }), d.addEventListener("mouseup", na, { signal: hl }), d.addEventListener("mouseleave", Ka, { signal: hl }), d.addEventListener("dblclick", Oo, { signal: hl }), d.addEventListener("keydown", Nl, { signal: hl });
  const eo = [];
  function Ht(T, N) {
    const M = `change:${T}`;
    n.on(M, N), eo.push(() => n.off?.(M, N));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((T) => {
    Ht(T, () => {
      rt(), Gt();
    });
  }), Ht("mode", () => {
    w = n.get("mode"), Ot(), dt(), rt();
  }), Ht("width", () => {
    Vn();
  }), Ht("height", () => {
    Vn();
  }), Ht("points_data", () => {
    P = { key: "", data: [] }, O ? rt() : Tl(), tn();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((T) => {
    Ht(T, () => {
      O && rt(), tn();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((T) => {
    Ht(T, () => {
      rt();
    });
  }), Ht("category_codes", () => {
    ve(), rt();
  }), Ht("gene_values", () => {
    ie(), rt();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "radius_indptr", "radius_indices", "radius_distances"].forEach((T) => {
    Ht(T, () => {
      j(), O && rt();
    });
  }), ["category_columns", "active_category"].forEach((T) => {
    Ht(T, () => {
      Gt(), rt();
    });
  }), ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((T) => {
    Ht(T, () => {
      Gt(), tn(), rt();
    });
  }), Ht("plot_background", () => h()), Gt();
  let ko = null, to = 0, zl = !1;
  const no = () => {
    if (zl) return;
    const T = c.clientWidth, N = c.clientHeight;
    if (T <= 1 || N <= 1) {
      to = requestAnimationFrame(no);
      return;
    }
    to = requestAnimationFrame(async () => {
      if (await Tl(), zl) {
        O && typeof O.finalize == "function" && O.finalize(), O = null;
        return;
      }
      rt(), ko = new ResizeObserver(() => Vn()), ko.observe(c);
    });
  };
  to = requestAnimationFrame(no);
  function oa() {
    zl = !0, la.abort(), eo.forEach((T) => T()), y.disconnect(), ko?.disconnect(), to && cancelAnimationFrame(to), L && cancelAnimationFrame(L), O && typeof O.finalize == "function" && O.finalize(), O = null, o.replaceChildren();
  }
  return {
    zoomBy: (T) => le(T),
    resetZoom: () => me(),
    resize: () => Vn(),
    destroy: oa
  };
}
function Wk(n, o) {
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
const eN = [
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
function tN(n) {
  const o = Wk(n, eN);
  return {
    ...o,
    setMode(r) {
      zk(n, r);
    },
    select(r, i) {
      Xh(n, r, i);
    },
    setActiveCategory(r) {
      Ph(n, r);
    },
    setActiveGenes(r) {
      Ok(n, r);
    },
    setGeneScaleMode(r) {
      kk(n, r);
    },
    setGeneLog1p(r) {
      Nk(n, r);
    },
    selectType(r, i) {
      r.name !== o.active_category && Ph(n, r), Xh(n, "type", i);
    },
    patchNeighborhood(r) {
      uS(
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
      o.selected_kind !== "landmark" || o.selected_index < 0 || fS(n, o.selected_index, r, o.landmarks);
    },
    deleteSelection(r) {
      Dk(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      jk(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, i) {
      Lk(n, r, i, o.selections);
    },
    renameLandmark(r, i) {
      Vk(n, r, i, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      Ik(n, r, o.landmarks);
    },
    setPointSize(r) {
      Hk(n, r);
    },
    setPointOpacity(r) {
      Uk(n, r);
    },
    setLandmarkOpacity(r) {
      Bk(n, r);
    },
    setStrokeWidth(r) {
      Gk(n, r);
    },
    copyLandmark(r) {
      const i = o.landmarks || [];
      Yk(n, r, i);
    },
    pasteLandmark() {
      const r = o.landmarks || [];
      qk(n, o.selected_index, r);
    },
    setLandmarkLabel(r) {
      o.selected_kind !== "landmark" || o.selected_index < 0 || Xk(
        n,
        o.selected_index,
        r,
        o.landmarks
      );
    },
    activeNeighborhood() {
      return cS(
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
function _h(n) {
  if (document.fullscreenElement === n) return !0;
  try {
    return n.matches(":fullscreen") || n.matches(":-webkit-full-screen");
  } catch {
    return !1;
  }
}
function nN(n, o) {
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
      if (_h(v)) {
        r.current !== "native" && (d("native"), document.body.style.overflow = "hidden", f());
        return;
      }
      r.current === "native" && m();
    }
  }, [n, m, d, f]);
  b.useEffect(() => (document.addEventListener("fullscreenchange", g), g(), () => document.removeEventListener("fullscreenchange", g)), [g]), b.useEffect(() => {
    if (i !== "overlay") return;
    const v = (C) => {
      C.key === "Escape" && m();
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i, m]);
  const h = b.useCallback(() => {
    const v = n.current;
    return r.current !== "off" ? !0 : !!v && _h(v);
  }, [n]), y = b.useCallback(() => {
    const v = n.current;
    if (v) {
      if (r.current === "overlay") {
        m();
        return;
      }
      if (_h(v) || document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      r.current !== "off" && m();
    }
  }, [n, m]), S = b.useCallback(async () => {
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
    toggle: S,
    leave: y
  };
}
const lN = 700, oN = 400, aN = 1400, Wv = 640;
function rN({
  model: n,
  hostEl: o,
  defaultHeight: r = lN
}) {
  const i = CC(o.parentElement), c = tN(n), f = b.useRef(null), d = b.useRef(null), m = b.useRef(null), [g, h] = b.useState(r), [y, S] = b.useState(!1), [v, C] = b.useState(null), _ = b.useRef(null), A = b.useRef(!1), R = b.useCallback(() => {
    m.current?.resize();
  }, []), { isFullscreen: w, overlay: O, toggle: k } = nN(
    d,
    R
  );
  b.useEffect(() => {
    const L = d.current;
    if (!L || typeof ResizeObserver > "u") return;
    const I = new ResizeObserver((B) => {
      const V = B[0]?.contentRect.width ?? L.clientWidth;
      S(V < Wv);
    });
    return I.observe(L), S(L.clientWidth < Wv), () => I.disconnect();
  }, []), b.useEffect(() => {
    y || C(null);
  }, [y]), b.useEffect(() => {
    w && !A.current && (_.current = g), !w && A.current && _.current != null && (h(_.current), _.current = null, R()), A.current = w;
  }, [w, g, R]), b.useEffect(() => {
    o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  }, [o]), b.useEffect(() => {
    const L = f.current;
    if (!L) return;
    const I = Jv({ model: n, host: L });
    return m.current = I, () => {
      I.destroy(), m.current = null;
    };
  }, [n, Jv]);
  const D = b.useCallback(
    (L) => {
      L.preventDefault(), L.stopPropagation();
      const I = Math.min(window.innerHeight * 0.9, aN), B = {
        y: L.clientY,
        h: g,
        maxH: I
      }, V = (ee) => {
        h(
          Math.round(
            Math.min(B.maxH, Math.max(oN, B.h + (ee.clientY - B.y)))
          )
        ), R();
      }, P = () => {
        window.removeEventListener("pointermove", V), window.removeEventListener("pointerup", P), R();
      };
      window.addEventListener("pointermove", V), window.addEventListener("pointerup", P);
    },
    [g, R]
  );
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      ref: d,
      className: et(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        i && "dark landmarks--dark",
        !i && "landmarks--light",
        y && "landmarks--narrow",
        w && "landmarks--fs",
        O && "landmarks--overlay-fs"
      ),
      children: [
        /* @__PURE__ */ x.jsxs(
          "div",
          {
            className: "landmarks__body",
            style: w ? void 0 : { height: g },
            children: [
              /* @__PURE__ */ x.jsx("div", { className: "landmarks__figure", children: /* @__PURE__ */ x.jsx("div", { className: "landmarks__main landmarks__main--plot", children: /* @__PURE__ */ x.jsx(
                "div",
                {
                  ref: f,
                  className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
                }
              ) }) }),
              w ? null : /* @__PURE__ */ x.jsx(
                "button",
                {
                  type: "button",
                  className: "landmarks__resize",
                  "aria-label": "Resize height",
                  title: "Resize height",
                  onPointerDown: D
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ x.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ x.jsx(
            "div",
            {
              className: "landmarks__chrome-tools",
              onMouseDown: (L) => L.stopPropagation(),
              onWheel: (L) => L.stopPropagation(),
              children: /* @__PURE__ */ x.jsx(
                gk,
                {
                  modes: c.modes,
                  mode: c.mode,
                  onMode: (L) => c.setMode(L),
                  fullscreen: w,
                  onToggleFullscreen: () => {
                    k();
                  },
                  onZoomIn: () => m.current?.zoomBy(1),
                  onZoomOut: () => m.current?.zoomBy(-1),
                  onReset: () => m.current?.resetZoom()
                }
              )
            }
          ),
          y ? /* @__PURE__ */ x.jsx(
            Ak,
            {
              lm: c,
              open: v,
              onOpenChange: C
            }
          ) : /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
            /* @__PURE__ */ x.jsx(
              "div",
              {
                className: "landmarks__chrome-dock landmarks__chrome-dock--left",
                onMouseDown: (L) => L.stopPropagation(),
                onWheel: (L) => L.stopPropagation(),
                children: /* @__PURE__ */ x.jsx(iS, { lm: c })
              }
            ),
            /* @__PURE__ */ x.jsx(
              "div",
              {
                className: "landmarks__chrome-dock landmarks__chrome-dock--right",
                onMouseDown: (L) => L.stopPropagation(),
                onWheel: (L) => L.stopPropagation(),
                children: /* @__PURE__ */ x.jsx(sS, { lm: c })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const fs = /* @__PURE__ */ new WeakMap();
function iN({ model: n, el: o }) {
  o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  const r = fs.get(o);
  r && (r.unmount(), fs.delete(o));
  const i = SC.createRoot(o);
  return fs.set(o, i), i.render(/* @__PURE__ */ x.jsx(rN, { model: n, hostEl: o })), () => {
    i.unmount(), fs.get(o) === i && fs.delete(o);
  };
}
const dN = { render: iN };
export {
  dN as default
};
