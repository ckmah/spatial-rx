var _y = (n) => {
  throw TypeError(n);
};
var Ry = (n, o, r) => o.has(n) || _y("Cannot " + r);
var Fn = (n, o, r) => (Ry(n, o, "read from private field"), r ? r.call(n) : o.get(n)), wy = (n, o, r) => o.has(n) ? _y("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Yd = (n, o, r, i) => (Ry(n, o, "write to private field"), i ? i.call(n, r) : o.set(n, r), r);
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
var qd = { exports: {} }, ds = {};
var My;
function hC() {
  if (My) return ds;
  My = 1;
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
  return ds.Fragment = o, ds.jsx = r, ds.jsxs = r, ds;
}
var Ay;
function mC() {
  return Ay || (Ay = 1, qd.exports = hC()), qd.exports;
}
var S = mC(), Pd = { exports: {} }, hs = {}, Xd = { exports: {} }, Fd = {};
var Ty;
function pC() {
  return Ty || (Ty = 1, (function(n) {
    function o(H, B) {
      var Q = H.length;
      H.push(B);
      e: for (; 0 < Q; ) {
        var ye = Q - 1 >>> 1, ce = H[ye];
        if (0 < c(ce, B))
          H[ye] = B, H[Q] = ce, Q = ye;
        else break e;
      }
    }
    function r(H) {
      return H.length === 0 ? null : H[0];
    }
    function i(H) {
      if (H.length === 0) return null;
      var B = H[0], Q = H.pop();
      if (Q !== B) {
        H[0] = Q;
        e: for (var ye = 0, ce = H.length, z = ce >>> 1; ye < z; ) {
          var P = 2 * (ye + 1) - 1, te = H[P], ae = P + 1, be = H[ae];
          if (0 > c(te, Q))
            ae < ce && 0 > c(be, te) ? (H[ye] = be, H[ae] = Q, ye = ae) : (H[ye] = te, H[P] = Q, ye = P);
          else if (ae < ce && 0 > c(be, Q))
            H[ye] = be, H[ae] = Q, ye = ae;
          else break e;
        }
      }
      return B;
    }
    function c(H, B) {
      var Q = H.sortIndex - B.sortIndex;
      return Q !== 0 ? Q : H.id - B.id;
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
    var p = [], h = [], y = 1, x = null, v = 3, R = !1, _ = !1, A = !1, w = !1, O = typeof setTimeout == "function" ? setTimeout : null, N = typeof clearTimeout == "function" ? clearTimeout : null, T = typeof setImmediate < "u" ? setImmediate : null;
    function D(H) {
      for (var B = r(h); B !== null; ) {
        if (B.callback === null) i(h);
        else if (B.startTime <= H)
          i(h), B.sortIndex = B.expirationTime, o(p, B);
        else break;
        B = r(h);
      }
    }
    function j(H) {
      if (A = !1, D(H), !_)
        if (r(p) !== null)
          _ = !0, U || (U = !0, W());
        else {
          var B = r(h);
          B !== null && ge(j, B.startTime - H);
        }
    }
    var U = !1, G = -1, L = 5, K = -1;
    function ie() {
      return w ? !0 : !(n.unstable_now() - K < L);
    }
    function ue() {
      if (w = !1, U) {
        var H = n.unstable_now();
        K = H;
        var B = !0;
        try {
          e: {
            _ = !1, A && (A = !1, N(G), G = -1), R = !0;
            var Q = v;
            try {
              t: {
                for (D(H), x = r(p); x !== null && !(x.expirationTime > H && ie()); ) {
                  var ye = x.callback;
                  if (typeof ye == "function") {
                    x.callback = null, v = x.priorityLevel;
                    var ce = ye(
                      x.expirationTime <= H
                    );
                    if (H = n.unstable_now(), typeof ce == "function") {
                      x.callback = ce, D(H), B = !0;
                      break t;
                    }
                    x === r(p) && i(p), D(H);
                  } else i(p);
                  x = r(p);
                }
                if (x !== null) B = !0;
                else {
                  var z = r(h);
                  z !== null && ge(
                    j,
                    z.startTime - H
                  ), B = !1;
                }
              }
              break e;
            } finally {
              x = null, v = Q, R = !1;
            }
            B = void 0;
          }
        } finally {
          B ? W() : U = !1;
        }
      }
    }
    var W;
    if (typeof T == "function")
      W = function() {
        T(ue);
      };
    else if (typeof MessageChannel < "u") {
      var q = new MessageChannel(), se = q.port2;
      q.port1.onmessage = ue, W = function() {
        se.postMessage(null);
      };
    } else
      W = function() {
        O(ue, 0);
      };
    function ge(H, B) {
      G = O(function() {
        H(n.unstable_now());
      }, B);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(H) {
      H.callback = null;
    }, n.unstable_forceFrameRate = function(H) {
      0 > H || 125 < H ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : L = 0 < H ? Math.floor(1e3 / H) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, n.unstable_next = function(H) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = v;
      }
      var Q = v;
      v = B;
      try {
        return H();
      } finally {
        v = Q;
      }
    }, n.unstable_requestPaint = function() {
      w = !0;
    }, n.unstable_runWithPriority = function(H, B) {
      switch (H) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          H = 3;
      }
      var Q = v;
      v = H;
      try {
        return B();
      } finally {
        v = Q;
      }
    }, n.unstable_scheduleCallback = function(H, B, Q) {
      var ye = n.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? ye + Q : ye) : Q = ye, H) {
        case 1:
          var ce = -1;
          break;
        case 2:
          ce = 250;
          break;
        case 5:
          ce = 1073741823;
          break;
        case 4:
          ce = 1e4;
          break;
        default:
          ce = 5e3;
      }
      return ce = Q + ce, H = {
        id: y++,
        callback: B,
        priorityLevel: H,
        startTime: Q,
        expirationTime: ce,
        sortIndex: -1
      }, Q > ye ? (H.sortIndex = Q, o(h, H), r(p) === null && H === r(h) && (A ? (N(G), G = -1) : A = !0, ge(j, Q - ye))) : (H.sortIndex = ce, o(p, H), _ || R || (_ = !0, U || (U = !0, W()))), H;
    }, n.unstable_shouldYield = ie, n.unstable_wrapCallback = function(H) {
      var B = v;
      return function() {
        var Q = v;
        v = B;
        try {
          return H.apply(this, arguments);
        } finally {
          v = Q;
        }
      };
    };
  })(Fd)), Fd;
}
var Oy;
function gC() {
  return Oy || (Oy = 1, Xd.exports = pC()), Xd.exports;
}
var Kd = { exports: {} }, rt = {};
var ky;
function bC() {
  if (ky) return rt;
  ky = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), x = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function R(z) {
    return z === null || typeof z != "object" ? null : (z = v && z[v] || z["@@iterator"], typeof z == "function" ? z : null);
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
  }, A = Object.assign, w = {};
  function O(z, P, te) {
    this.props = z, this.context = P, this.refs = w, this.updater = te || _;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(z, P) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, P, "setState");
  }, O.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function N() {
  }
  N.prototype = O.prototype;
  function T(z, P, te) {
    this.props = z, this.context = P, this.refs = w, this.updater = te || _;
  }
  var D = T.prototype = new N();
  D.constructor = T, A(D, O.prototype), D.isPureReactComponent = !0;
  var j = Array.isArray;
  function U() {
  }
  var G = { H: null, A: null, T: null, S: null }, L = Object.prototype.hasOwnProperty;
  function K(z, P, te) {
    var ae = te.ref;
    return {
      $$typeof: n,
      type: z,
      key: P,
      ref: ae !== void 0 ? ae : null,
      props: te
    };
  }
  function ie(z, P) {
    return K(z.type, P, z.props);
  }
  function ue(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function W(z) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(te) {
      return P[te];
    });
  }
  var q = /\/+/g;
  function se(z, P) {
    return typeof z == "object" && z !== null && z.key != null ? W("" + z.key) : P.toString(36);
  }
  function ge(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(U, U) : (z.status = "pending", z.then(
          function(P) {
            z.status === "pending" && (z.status = "fulfilled", z.value = P);
          },
          function(P) {
            z.status === "pending" && (z.status = "rejected", z.reason = P);
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
  function H(z, P, te, ae, be) {
    var we = typeof z;
    (we === "undefined" || we === "boolean") && (z = null);
    var Ge = !1;
    if (z === null) Ge = !0;
    else
      switch (we) {
        case "bigint":
        case "string":
        case "number":
          Ge = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case n:
            case o:
              Ge = !0;
              break;
            case y:
              return Ge = z._init, H(
                Ge(z._payload),
                P,
                te,
                ae,
                be
              );
          }
      }
    if (Ge)
      return be = be(z), Ge = ae === "" ? "." + se(z, 0) : ae, j(be) ? (te = "", Ge != null && (te = Ge.replace(q, "$&/") + "/"), H(be, P, te, "", function(it) {
        return it;
      })) : be != null && (ue(be) && (be = ie(
        be,
        te + (be.key == null || z && z.key === be.key ? "" : ("" + be.key).replace(
          q,
          "$&/"
        ) + "/") + Ge
      )), P.push(be)), 1;
    Ge = 0;
    var Ae = ae === "" ? "." : ae + ":";
    if (j(z))
      for (var Oe = 0; Oe < z.length; Oe++)
        ae = z[Oe], we = Ae + se(ae, Oe), Ge += H(
          ae,
          P,
          te,
          we,
          be
        );
    else if (Oe = R(z), typeof Oe == "function")
      for (z = Oe.call(z), Oe = 0; !(ae = z.next()).done; )
        ae = ae.value, we = Ae + se(ae, Oe++), Ge += H(
          ae,
          P,
          te,
          we,
          be
        );
    else if (we === "object") {
      if (typeof z.then == "function")
        return H(
          ge(z),
          P,
          te,
          ae,
          be
        );
      throw P = String(z), Error(
        "Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ge;
  }
  function B(z, P, te) {
    if (z == null) return z;
    var ae = [], be = 0;
    return H(z, ae, "", "", function(we) {
      return P.call(te, we, be++);
    }), ae;
  }
  function Q(z) {
    if (z._status === -1) {
      var P = z._result;
      P = P(), P.then(
        function(te) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = te);
        },
        function(te) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = te);
        }
      ), z._status === -1 && (z._status = 0, z._result = P);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var ye = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var P = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent(P)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  }, ce = {
    map: B,
    forEach: function(z, P, te) {
      B(
        z,
        function() {
          P.apply(this, arguments);
        },
        te
      );
    },
    count: function(z) {
      var P = 0;
      return B(z, function() {
        P++;
      }), P;
    },
    toArray: function(z) {
      return B(z, function(P) {
        return P;
      }) || [];
    },
    only: function(z) {
      if (!ue(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  };
  return rt.Activity = x, rt.Children = ce, rt.Component = O, rt.Fragment = r, rt.Profiler = c, rt.PureComponent = T, rt.StrictMode = i, rt.Suspense = p, rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, rt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return G.H.useMemoCache(z);
    }
  }, rt.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, rt.cacheSignal = function() {
    return null;
  }, rt.cloneElement = function(z, P, te) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var ae = A({}, z.props), be = z.key;
    if (P != null)
      for (we in P.key !== void 0 && (be = "" + P.key), P)
        !L.call(P, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && P.ref === void 0 || (ae[we] = P[we]);
    var we = arguments.length - 2;
    if (we === 1) ae.children = te;
    else if (1 < we) {
      for (var Ge = Array(we), Ae = 0; Ae < we; Ae++)
        Ge[Ae] = arguments[Ae + 2];
      ae.children = Ge;
    }
    return K(z.type, be, ae);
  }, rt.createContext = function(z) {
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
  }, rt.createElement = function(z, P, te) {
    var ae, be = {}, we = null;
    if (P != null)
      for (ae in P.key !== void 0 && (we = "" + P.key), P)
        L.call(P, ae) && ae !== "key" && ae !== "__self" && ae !== "__source" && (be[ae] = P[ae]);
    var Ge = arguments.length - 2;
    if (Ge === 1) be.children = te;
    else if (1 < Ge) {
      for (var Ae = Array(Ge), Oe = 0; Oe < Ge; Oe++)
        Ae[Oe] = arguments[Oe + 2];
      be.children = Ae;
    }
    if (z && z.defaultProps)
      for (ae in Ge = z.defaultProps, Ge)
        be[ae] === void 0 && (be[ae] = Ge[ae]);
    return K(z, we, be);
  }, rt.createRef = function() {
    return { current: null };
  }, rt.forwardRef = function(z) {
    return { $$typeof: m, render: z };
  }, rt.isValidElement = ue, rt.lazy = function(z) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: z },
      _init: Q
    };
  }, rt.memo = function(z, P) {
    return {
      $$typeof: h,
      type: z,
      compare: P === void 0 ? null : P
    };
  }, rt.startTransition = function(z) {
    var P = G.T, te = {};
    G.T = te;
    try {
      var ae = z(), be = G.S;
      be !== null && be(te, ae), typeof ae == "object" && ae !== null && typeof ae.then == "function" && ae.then(U, ye);
    } catch (we) {
      ye(we);
    } finally {
      P !== null && te.types !== null && (P.types = te.types), G.T = P;
    }
  }, rt.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, rt.use = function(z) {
    return G.H.use(z);
  }, rt.useActionState = function(z, P, te) {
    return G.H.useActionState(z, P, te);
  }, rt.useCallback = function(z, P) {
    return G.H.useCallback(z, P);
  }, rt.useContext = function(z) {
    return G.H.useContext(z);
  }, rt.useDebugValue = function() {
  }, rt.useDeferredValue = function(z, P) {
    return G.H.useDeferredValue(z, P);
  }, rt.useEffect = function(z, P) {
    return G.H.useEffect(z, P);
  }, rt.useEffectEvent = function(z) {
    return G.H.useEffectEvent(z);
  }, rt.useId = function() {
    return G.H.useId();
  }, rt.useImperativeHandle = function(z, P, te) {
    return G.H.useImperativeHandle(z, P, te);
  }, rt.useInsertionEffect = function(z, P) {
    return G.H.useInsertionEffect(z, P);
  }, rt.useLayoutEffect = function(z, P) {
    return G.H.useLayoutEffect(z, P);
  }, rt.useMemo = function(z, P) {
    return G.H.useMemo(z, P);
  }, rt.useOptimistic = function(z, P) {
    return G.H.useOptimistic(z, P);
  }, rt.useReducer = function(z, P, te) {
    return G.H.useReducer(z, P, te);
  }, rt.useRef = function(z) {
    return G.H.useRef(z);
  }, rt.useState = function(z) {
    return G.H.useState(z);
  }, rt.useSyncExternalStore = function(z, P, te) {
    return G.H.useSyncExternalStore(
      z,
      P,
      te
    );
  }, rt.useTransition = function() {
    return G.H.useTransition();
  }, rt.version = "19.2.8", rt;
}
var Ny;
function Os() {
  return Ny || (Ny = 1, Kd.exports = bC()), Kd.exports;
}
var Qd = { exports: {} }, Kn = {};
var zy;
function yC() {
  if (zy) return Kn;
  zy = 1;
  var n = Os();
  function o(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        h += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function f(p, h, y) {
    var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: x == null ? null : "" + x,
      children: p,
      containerInfo: h,
      implementation: y
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Kn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, Kn.createPortal = function(p, h) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return f(p, h, null, y);
  }, Kn.flushSync = function(p) {
    var h = d.T, y = i.p;
    try {
      if (d.T = null, i.p = 2, p) return p();
    } finally {
      d.T = h, i.p = y, i.d.f();
    }
  }, Kn.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, i.d.C(p, h));
  }, Kn.prefetchDNS = function(p) {
    typeof p == "string" && i.d.D(p);
  }, Kn.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var y = h.as, x = m(y, h.crossOrigin), v = typeof h.integrity == "string" ? h.integrity : void 0, R = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      y === "style" ? i.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: x,
          integrity: v,
          fetchPriority: R
        }
      ) : y === "script" && i.d.X(p, {
        crossOrigin: x,
        integrity: v,
        fetchPriority: R,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Kn.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var y = m(
            h.as,
            h.crossOrigin
          );
          i.d.M(p, {
            crossOrigin: y,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && i.d.M(p);
  }, Kn.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var y = h.as, x = m(y, h.crossOrigin);
      i.d.L(p, y, {
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
  }, Kn.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var y = m(h.as, h.crossOrigin);
        i.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: y,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else i.d.m(p);
  }, Kn.requestFormReset = function(p) {
    i.d.r(p);
  }, Kn.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, Kn.useFormState = function(p, h, y) {
    return d.H.useFormState(p, h, y);
  }, Kn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Kn.version = "19.2.8", Kn;
}
var Dy;
function a0() {
  if (Dy) return Qd.exports;
  Dy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Qd.exports = yC(), Qd.exports;
}
var jy;
function vC() {
  if (jy) return hs;
  jy = 1;
  var n = gC(), o = Os(), r = a0();
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
  function p(e) {
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
          if (u === l) return p(s), e;
          if (u === a) return p(s), t;
          u = u.sibling;
        }
        throw Error(i(188));
      }
      if (l.return !== a.return) l = s, a = u;
      else {
        for (var g = !1, C = s.child; C; ) {
          if (C === l) {
            g = !0, l = s, a = u;
            break;
          }
          if (C === a) {
            g = !0, a = s, l = u;
            break;
          }
          C = C.sibling;
        }
        if (!g) {
          for (C = u.child; C; ) {
            if (C === l) {
              g = !0, l = u, a = s;
              break;
            }
            if (C === a) {
              g = !0, a = u, l = s;
              break;
            }
            C = C.sibling;
          }
          if (!g) throw Error(i(189));
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
  var x = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), R = /* @__PURE__ */ Symbol.for("react.transitional.element"), _ = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), w = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), N = /* @__PURE__ */ Symbol.for("react.consumer"), T = /* @__PURE__ */ Symbol.for("react.context"), D = /* @__PURE__ */ Symbol.for("react.forward_ref"), j = /* @__PURE__ */ Symbol.for("react.suspense"), U = /* @__PURE__ */ Symbol.for("react.suspense_list"), G = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), K = /* @__PURE__ */ Symbol.for("react.activity"), ie = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), ue = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = ue && e[ue] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var q = /* @__PURE__ */ Symbol.for("react.client.reference");
  function se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === q ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case O:
        return "Profiler";
      case w:
        return "StrictMode";
      case j:
        return "Suspense";
      case U:
        return "SuspenseList";
      case K:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return "Portal";
        case T:
          return e.displayName || "Context";
        case N:
          return (e._context.displayName || "Context") + ".Consumer";
        case D:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case G:
          return t = e.displayName || null, t !== null ? t : se(e.type) || "Memo";
        case L:
          t = e._payload, e = e._init;
          try {
            return se(e(t));
          } catch {
          }
      }
    return null;
  }
  var ge = Array.isArray, H = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ye = [], ce = -1;
  function z(e) {
    return { current: e };
  }
  function P(e) {
    0 > ce || (e.current = ye[ce], ye[ce] = null, ce--);
  }
  function te(e, t) {
    ce++, ye[ce] = e.current, e.current = t;
  }
  var ae = z(null), be = z(null), we = z(null), Ge = z(null);
  function Ae(e, t) {
    switch (te(we, t), te(be, e), te(ae, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Fb(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Fb(t), e = Kb(t, e);
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
    P(ae), te(ae, e);
  }
  function Oe() {
    P(ae), P(be), P(we);
  }
  function it(e) {
    e.memoizedState !== null && te(Ge, e);
    var t = ae.current, l = Kb(t, e.type);
    t !== l && (te(be, e), te(ae, l));
  }
  function gt(e) {
    be.current === e && (P(ae), P(be)), Ge.current === e && (P(Ge), ss._currentValue = Q);
  }
  var ze, Je;
  function je(e) {
    if (ze === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ze = t && t[1] || "", Je = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ze + e + Je;
  }
  var We = !1;
  function qe(e, t) {
    if (!e || We) return "";
    We = !0;
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
                } catch (re) {
                  var ee = re;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (re) {
                  ee = re;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (re) {
                ee = re;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
              });
            }
          } catch (re) {
            if (re && ee && typeof re.stack == "string")
              return [re.stack, ee.stack];
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
      var u = a.DetermineComponentFrameRoot(), g = u[0], C = u[1];
      if (g && C) {
        var I = g.split(`
`), J = C.split(`
`);
        for (s = a = 0; a < I.length && !I[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; s < J.length && !J[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (a === I.length || s === J.length)
          for (a = I.length - 1, s = J.length - 1; 1 <= a && 0 <= s && I[a] !== J[s]; )
            s--;
        for (; 1 <= a && 0 <= s; a--, s--)
          if (I[a] !== J[s]) {
            if (a !== 1 || s !== 1)
              do
                if (a--, s--, 0 > s || I[a] !== J[s]) {
                  var fe = `
` + I[a].replace(" at new ", " at ");
                  return e.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", e.displayName)), fe;
                }
              while (1 <= a && 0 <= s);
            break;
          }
      }
    } finally {
      We = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? je(l) : "";
  }
  function De(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return je(e.type);
      case 16:
        return je("Lazy");
      case 13:
        return e.child !== t && t !== null ? je("Suspense Fallback") : je("Suspense");
      case 19:
        return je("SuspenseList");
      case 0:
      case 15:
        return qe(e.type, !1);
      case 11:
        return qe(e.type.render, !1);
      case 1:
        return qe(e.type, !0);
      case 31:
        return je("Activity");
      default:
        return "";
    }
  }
  function nt(e) {
    try {
      var t = "", l = null;
      do
        t += De(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Le = Object.prototype.hasOwnProperty, et = n.unstable_scheduleCallback, st = n.unstable_cancelCallback, lt = n.unstable_shouldYield, Ce = n.unstable_requestPaint, Z = n.unstable_now, de = n.unstable_getCurrentPriorityLevel, Te = n.unstable_ImmediatePriority, Ee = n.unstable_UserBlockingPriority, Ie = n.unstable_NormalPriority, Ze = n.unstable_LowPriority, wt = n.unstable_IdlePriority, vt = n.log, Gt = n.unstable_setDisableYieldValue, Mt = null, mt = null;
  function Yt(e) {
    if (typeof vt == "function" && Gt(e), mt && typeof mt.setStrictMode == "function")
      try {
        mt.setStrictMode(Mt, e);
      } catch {
      }
  }
  var ot = Math.clz32 ? Math.clz32 : _n, Zt = Math.log, zt = Math.LN2;
  function _n(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Zt(e) / zt | 0) | 0;
  }
  var Rn = 256, Kt = 262144, at = 4194304;
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
  function $e(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var s = 0, u = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var C = a & 134217727;
    return C !== 0 ? (a = C & ~u, a !== 0 ? s = ht(a) : (g &= C, g !== 0 ? s = ht(g) : l || (l = C & ~e, l !== 0 && (s = ht(l))))) : (C = a & ~u, C !== 0 ? s = ht(C) : g !== 0 ? s = ht(g) : l || (l = a & ~e, l !== 0 && (s = ht(l)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : s;
  }
  function tn(e, t) {
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
  function Mn() {
    var e = at;
    return at <<= 1, (at & 62914560) === 0 && (at = 4194304), e;
  }
  function Vt(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function It(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ht(e, t, l, a, s, u) {
    var g = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var C = e.entanglements, I = e.expirationTimes, J = e.hiddenUpdates;
    for (l = g & ~l; 0 < l; ) {
      var fe = 31 - ot(l), me = 1 << fe;
      C[fe] = 0, I[fe] = -1;
      var ee = J[fe];
      if (ee !== null)
        for (J[fe] = null, fe = 0; fe < ee.length; fe++) {
          var re = ee[fe];
          re !== null && (re.lane &= -536870913);
        }
      l &= ~me;
    }
    a !== 0 && fo(e, a, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(g & ~t));
  }
  function fo(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - ot(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function un(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - ot(l), s = 1 << a;
      s & t | e[a] & t && (e[a] |= t), l &= ~s;
    }
  }
  function fn(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : ho(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function ho(e) {
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
  function al(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function an() {
    var e = B.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : by(e.type));
  }
  function mo(e, t) {
    var l = B.p;
    try {
      return B.p = e, t();
    } finally {
      B.p = l;
    }
  }
  var gn = Math.random().toString(36).slice(2), Dt = "__reactFiber$" + gn, At = "__reactProps$" + gn, Ye = "__reactContainer$" + gn, rl = "__reactEvents$" + gn, Mi = "__reactListeners$" + gn, Ai = "__reactHandles$" + gn, Fa = "__reactResources$" + gn, po = "__reactMarker$" + gn;
  function Ka(e) {
    delete e[Dt], delete e[At], delete e[rl], delete e[Mi], delete e[Ai];
  }
  function xl(e) {
    var t = e[Dt];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ye] || l[Dt]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = ty(e); e !== null; ) {
            if (l = e[Dt]) return l;
            e = ty(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Wl(e) {
    if (e = e[Dt] || e[Ye]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function $n(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Jn(e) {
    var t = e[Fa];
    return t || (t = e[Fa] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function on(e) {
    e[po] = !0;
  }
  var bn = /* @__PURE__ */ new Set(), Vn = {};
  function Sl(e, t) {
    ct(e, t), ct(e + "Capture", t);
  }
  function ct(e, t) {
    for (Vn[e] = t, e = 0; e < t.length; e++)
      bn.add(t[e]);
  }
  var Lr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Qa = {}, eo = {};
  function ko(e) {
    return Le.call(eo, e) ? !0 : Le.call(Qa, e) ? !1 : Lr.test(e) ? eo[e] = !0 : (Qa[e] = !0, !1);
  }
  function to(e, t, l) {
    if (ko(t))
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
  function go(e, t, l) {
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
  function rn(e) {
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
  function Xn(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function In(e, t, l) {
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
        set: function(g) {
          l = "" + g, u.call(this, g);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(g) {
          l = "" + g;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ll(e) {
    if (!e._valueTracker) {
      var t = Xn(e) ? "checked" : "value";
      e._valueTracker = In(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function El(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = Xn(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function No(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var na = /[\n"\\]/g;
  function kn(e) {
    return e.replace(
      na,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Za(e, t, l, a, s, u, g, C) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + rn(t)) : e.value !== "" + rn(t) && (e.value = "" + rn(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? la(e, g, rn(t)) : l != null ? la(e, g, rn(l)) : a != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? e.name = "" + rn(C) : e.removeAttribute("name");
  }
  function $a(e, t, l, a, s, u, g, C) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Ll(e);
        return;
      }
      l = l != null ? "" + rn(l) : "", t = t != null ? "" + rn(t) : l, C || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? s, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = C ? e.checked : !!a, e.defaultChecked = !!a, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), Ll(e);
  }
  function la(e, t, l) {
    t === "number" && No(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function Hn(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < l.length; s++)
        t["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = t.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + rn(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, a && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ja(e, t, l) {
    if (t != null && (t = "" + rn(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + rn(l) : "";
  }
  function zo(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(i(92));
        if (ge(a)) {
          if (1 < a.length) throw Error(i(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = rn(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), Ll(e);
  }
  function no(e, t) {
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
  function el(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || il.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function bo(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(i(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var s in t)
        a = t[s], t.hasOwnProperty(s) && l[s] !== a && el(e, s, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && el(e, u, t[u]);
  }
  function Vl(e) {
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
  var Wa = /* @__PURE__ */ new Map([
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
  ]), er = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yo(e) {
    return er.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function tl() {
  }
  var tr = null;
  function nr(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var vo = null, lo = null;
  function sl(e) {
    var t = Wl(e);
    if (t && (e = t.stateNode)) {
      var l = e[At] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Za(
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
              'input[name="' + kn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var s = a[At] || null;
                if (!s) throw Error(i(90));
                Za(
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
              a = l[t], a.form === e.form && El(a);
          }
          break e;
        case "textarea":
          Ja(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && Hn(e, !!l.multiple, t, !1);
      }
    }
  }
  var oa = !1;
  function Nn(e, t, l) {
    if (oa) return e(t, l);
    oa = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (oa = !1, (vo !== null || lo !== null) && (_c(), vo && (t = vo, e = lo, lo = vo = null, sl(t), e)))
        for (t = 0; t < e.length; t++) sl(e[t]);
    }
  }
  function _e(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[At] || null;
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
  var Re = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ct = !1;
  if (Re)
    try {
      var xt = {};
      Object.defineProperty(xt, "passive", {
        get: function() {
          Ct = !0;
        }
      }), window.addEventListener("test", xt, xt), window.removeEventListener("test", xt, xt);
    } catch {
      Ct = !1;
    }
  var Lt = null, E = null, M = null;
  function k() {
    if (M) return M;
    var e, t = E, l = t.length, a, s = "value" in Lt ? Lt.value : Lt.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var g = l - e;
    for (a = 1; a <= g && t[l - a] === s[u - a]; a++) ;
    return M = s.slice(e, 1 < a ? 1 - a : void 0);
  }
  function V(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function X() {
    return !0;
  }
  function le() {
    return !1;
  }
  function oe(e) {
    function t(l, a, s, u, g) {
      this._reactName = l, this._targetInst = s, this.type = a, this.nativeEvent = u, this.target = g, this.currentTarget = null;
      for (var C in e)
        e.hasOwnProperty(C) && (l = e[C], this[C] = l ? l(u) : u[C]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? X : le, this.isPropagationStopped = le, this;
    }
    return x(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = X);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = X);
      },
      persist: function() {
      },
      isPersistent: X
    }), t;
  }
  var ne = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, pe = oe(ne), ve = x({}, ne, { view: 0, detail: 0 }), Ne = oe(ve), Fe, Me, ke, Tt = x({}, ve, {
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
    getModifierState: Fu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ke && (ke && e.type === "mousemove" ? (Fe = e.screenX - ke.screenX, Me = e.screenY - ke.screenY) : Me = Fe = 0, ke = e), Fe);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Me;
    }
  }), yn = oe(Tt), Il = x({}, Tt, { dataTransfer: 0 }), aa = oe(Il), zn = x({}, ve, { relatedTarget: 0 }), cl = oe(zn), ul = x({}, ne, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), oo = oe(ul), xo = x({}, ne, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), nl = oe(xo), ao = x({}, ne, { data: 0 }), lr = oe(ao), Bs = {
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
  }, Gs = {
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
  function Fu() {
    return SS;
  }
  var ES = x({}, ve, {
    key: function(e) {
      if (e.key) {
        var t = Bs[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = V(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Gs[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fu,
    charCode: function(e) {
      return e.type === "keypress" ? V(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? V(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), CS = oe(ES), _S = x({}, Tt, {
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
  }), Jm = oe(_S), RS = x({}, ve, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fu
  }), wS = oe(RS), MS = x({}, ne, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), AS = oe(MS), TS = x({}, Tt, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), OS = oe(TS), kS = x({}, ne, {
    newState: 0,
    oldState: 0
  }), NS = oe(kS), zS = [9, 13, 27, 32], Ku = Re && "CompositionEvent" in window, Ti = null;
  Re && "documentMode" in document && (Ti = document.documentMode);
  var DS = Re && "TextEvent" in window && !Ti, Wm = Re && (!Ku || Ti && 8 < Ti && 11 >= Ti), ep = " ", tp = !1;
  function np(e, t) {
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
  function lp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Vr = !1;
  function jS(e, t) {
    switch (e) {
      case "compositionend":
        return lp(t);
      case "keypress":
        return t.which !== 32 ? null : (tp = !0, ep);
      case "textInput":
        return e = t.data, e === ep && tp ? null : e;
      default:
        return null;
    }
  }
  function LS(e, t) {
    if (Vr)
      return e === "compositionend" || !Ku && np(e, t) ? (e = k(), M = E = Lt = null, Vr = !1, e) : null;
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
        return Wm && t.locale !== "ko" ? null : t.data;
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
  function op(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!VS[e.type] : t === "textarea";
  }
  function ap(e, t, l, a) {
    vo ? lo ? lo.push(a) : lo = [a] : vo = a, t = kc(t, "onChange"), 0 < t.length && (l = new pe(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var Oi = null, ki = null;
  function IS(e) {
    Bb(e, 0);
  }
  function Ys(e) {
    var t = $n(e);
    if (El(t)) return e;
  }
  function rp(e, t) {
    if (e === "change") return t;
  }
  var ip = !1;
  if (Re) {
    var Qu;
    if (Re) {
      var Zu = "oninput" in document;
      if (!Zu) {
        var sp = document.createElement("div");
        sp.setAttribute("oninput", "return;"), Zu = typeof sp.oninput == "function";
      }
      Qu = Zu;
    } else Qu = !1;
    ip = Qu && (!document.documentMode || 9 < document.documentMode);
  }
  function cp() {
    Oi && (Oi.detachEvent("onpropertychange", up), ki = Oi = null);
  }
  function up(e) {
    if (e.propertyName === "value" && Ys(ki)) {
      var t = [];
      ap(
        t,
        ki,
        e,
        nr(e)
      ), Nn(IS, t);
    }
  }
  function HS(e, t, l) {
    e === "focusin" ? (cp(), Oi = t, ki = l, Oi.attachEvent("onpropertychange", up)) : e === "focusout" && cp();
  }
  function US(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ys(ki);
  }
  function BS(e, t) {
    if (e === "click") return Ys(t);
  }
  function GS(e, t) {
    if (e === "input" || e === "change")
      return Ys(t);
  }
  function YS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Cl = typeof Object.is == "function" ? Object.is : YS;
  function Ni(e, t) {
    if (Cl(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var s = l[a];
      if (!Le.call(t, s) || !Cl(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function fp(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function dp(e, t) {
    var l = fp(e);
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
      l = fp(l);
    }
  }
  function hp(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? hp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function mp(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = No(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = No(e.document);
    }
    return t;
  }
  function $u(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var qS = Re && "documentMode" in document && 11 >= document.documentMode, Ir = null, Ju = null, zi = null, Wu = !1;
  function pp(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Wu || Ir == null || Ir !== No(a) || (a = Ir, "selectionStart" in a && $u(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), zi && Ni(zi, a) || (zi = a, a = kc(Ju, "onSelect"), 0 < a.length && (t = new pe(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = Ir)));
  }
  function or(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Hr = {
    animationend: or("Animation", "AnimationEnd"),
    animationiteration: or("Animation", "AnimationIteration"),
    animationstart: or("Animation", "AnimationStart"),
    transitionrun: or("Transition", "TransitionRun"),
    transitionstart: or("Transition", "TransitionStart"),
    transitioncancel: or("Transition", "TransitionCancel"),
    transitionend: or("Transition", "TransitionEnd")
  }, ef = {}, gp = {};
  Re && (gp = document.createElement("div").style, "AnimationEvent" in window || (delete Hr.animationend.animation, delete Hr.animationiteration.animation, delete Hr.animationstart.animation), "TransitionEvent" in window || delete Hr.transitionend.transition);
  function ar(e) {
    if (ef[e]) return ef[e];
    if (!Hr[e]) return e;
    var t = Hr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in gp)
        return ef[e] = t[l];
    return e;
  }
  var bp = ar("animationend"), yp = ar("animationiteration"), vp = ar("animationstart"), PS = ar("transitionrun"), XS = ar("transitionstart"), FS = ar("transitioncancel"), xp = ar("transitionend"), Sp = /* @__PURE__ */ new Map(), tf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  tf.push("scrollEnd");
  function ro(e, t) {
    Sp.set(e, t), Sl(t, [e]);
  }
  var qs = typeof reportError == "function" ? reportError : function(e) {
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
  }, Hl = [], Ur = 0, nf = 0;
  function Ps() {
    for (var e = Ur, t = nf = Ur = 0; t < e; ) {
      var l = Hl[t];
      Hl[t++] = null;
      var a = Hl[t];
      Hl[t++] = null;
      var s = Hl[t];
      Hl[t++] = null;
      var u = Hl[t];
      if (Hl[t++] = null, a !== null && s !== null) {
        var g = a.pending;
        g === null ? s.next = s : (s.next = g.next, g.next = s), a.pending = s;
      }
      u !== 0 && Ep(l, s, u);
    }
  }
  function Xs(e, t, l, a) {
    Hl[Ur++] = e, Hl[Ur++] = t, Hl[Ur++] = l, Hl[Ur++] = a, nf |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function lf(e, t, l, a) {
    return Xs(e, t, l, a), Fs(e);
  }
  function rr(e, t) {
    return Xs(e, null, null, t), Fs(e);
  }
  function Ep(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - ot(l), e = u.hiddenUpdates, a = e[s], a === null ? e[s] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function Fs(e) {
    if (50 < ts)
      throw ts = 0, hd = null, Error(i(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Br = {};
  function KS(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _l(e, t, l, a) {
    return new KS(e, t, l, a);
  }
  function of(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Do(e, t) {
    var l = e.alternate;
    return l === null ? (l = _l(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Cp(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ks(e, t, l, a, s, u) {
    var g = 0;
    if (a = e, typeof e == "function") of(e) && (g = 1);
    else if (typeof e == "string")
      g = WE(
        e,
        l,
        ae.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case K:
          return e = _l(31, l, t, s), e.elementType = K, e.lanes = u, e;
        case A:
          return ir(l.children, s, u, t);
        case w:
          g = 8, s |= 24;
          break;
        case O:
          return e = _l(12, l, t, s | 2), e.elementType = O, e.lanes = u, e;
        case j:
          return e = _l(13, l, t, s), e.elementType = j, e.lanes = u, e;
        case U:
          return e = _l(19, l, t, s), e.elementType = U, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case T:
                g = 10;
                break e;
              case N:
                g = 9;
                break e;
              case D:
                g = 11;
                break e;
              case G:
                g = 14;
                break e;
              case L:
                g = 16, a = null;
                break e;
            }
          g = 29, l = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = _l(g, l, t, s), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function ir(e, t, l, a) {
    return e = _l(7, e, a, t), e.lanes = l, e;
  }
  function af(e, t, l) {
    return e = _l(6, e, null, t), e.lanes = l, e;
  }
  function _p(e) {
    var t = _l(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function rf(e, t, l) {
    return t = _l(
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
  var Rp = /* @__PURE__ */ new WeakMap();
  function Ul(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Rp.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: nt(t)
      }, Rp.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: nt(t)
    };
  }
  var Gr = [], Yr = 0, Qs = null, Di = 0, Bl = [], Gl = 0, ra = null, So = 1, Eo = "";
  function jo(e, t) {
    Gr[Yr++] = Di, Gr[Yr++] = Qs, Qs = e, Di = t;
  }
  function wp(e, t, l) {
    Bl[Gl++] = So, Bl[Gl++] = Eo, Bl[Gl++] = ra, ra = e;
    var a = So;
    e = Eo;
    var s = 32 - ot(a) - 1;
    a &= ~(1 << s), l += 1;
    var u = 32 - ot(t) + s;
    if (30 < u) {
      var g = s - s % 5;
      u = (a & (1 << g) - 1).toString(32), a >>= g, s -= g, So = 1 << 32 - ot(t) + s | l << s | a, Eo = u + e;
    } else
      So = 1 << u | l << s | a, Eo = e;
  }
  function sf(e) {
    e.return !== null && (jo(e, 1), wp(e, 1, 0));
  }
  function cf(e) {
    for (; e === Qs; )
      Qs = Gr[--Yr], Gr[Yr] = null, Di = Gr[--Yr], Gr[Yr] = null;
    for (; e === ra; )
      ra = Bl[--Gl], Bl[Gl] = null, Eo = Bl[--Gl], Bl[Gl] = null, So = Bl[--Gl], Bl[Gl] = null;
  }
  function Mp(e, t) {
    Bl[Gl++] = So, Bl[Gl++] = Eo, Bl[Gl++] = ra, So = t.id, Eo = t.overflow, ra = e;
  }
  var Un = null, $t = null, _t = !1, ia = null, Yl = !1, uf = Error(i(519));
  function sa(e) {
    var t = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ji(Ul(t, e)), uf;
  }
  function Ap(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Dt] = e, t[At] = a, l) {
      case "dialog":
        yt("cancel", t), yt("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        yt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < ls.length; l++)
          yt(ls[l], t);
        break;
      case "source":
        yt("error", t);
        break;
      case "img":
      case "image":
      case "link":
        yt("error", t), yt("load", t);
        break;
      case "details":
        yt("toggle", t);
        break;
      case "input":
        yt("invalid", t), $a(
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
        yt("invalid", t);
        break;
      case "textarea":
        yt("invalid", t), zo(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Pb(t.textContent, l) ? (a.popover != null && (yt("beforetoggle", t), yt("toggle", t)), a.onScroll != null && yt("scroll", t), a.onScrollEnd != null && yt("scrollend", t), a.onClick != null && (t.onclick = tl), t = !0) : t = !1, t || sa(e, !0);
  }
  function Tp(e) {
    for (Un = e.return; Un; )
      switch (Un.tag) {
        case 5:
        case 31:
        case 13:
          Yl = !1;
          return;
        case 27:
        case 3:
          Yl = !0;
          return;
        default:
          Un = Un.return;
      }
  }
  function qr(e) {
    if (e !== Un) return !1;
    if (!_t) return Tp(e), _t = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Ad(e.type, e.memoizedProps)), l = !l), l && $t && sa(e), Tp(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      $t = ey(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      $t = ey(e);
    } else
      t === 27 ? (t = $t, Ea(e.type) ? (e = zd, zd = null, $t = e) : $t = t) : $t = Un ? Pl(e.stateNode.nextSibling) : null;
    return !0;
  }
  function sr() {
    $t = Un = null, _t = !1;
  }
  function ff() {
    var e = ia;
    return e !== null && (ml === null ? ml = e : ml.push.apply(
      ml,
      e
    ), ia = null), e;
  }
  function ji(e) {
    ia === null ? ia = [e] : ia.push(e);
  }
  var df = z(null), cr = null, Lo = null;
  function ca(e, t, l) {
    te(df, t._currentValue), t._currentValue = l;
  }
  function Vo(e) {
    e._currentValue = df.current, P(df);
  }
  function hf(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function mf(e, t, l, a) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var g = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var C = u;
          u = s;
          for (var I = 0; I < t.length; I++)
            if (C.context === t[I]) {
              u.lanes |= l, C = u.alternate, C !== null && (C.lanes |= l), hf(
                u.return,
                l,
                e
              ), a || (g = null);
              break e;
            }
          u = C.next;
        }
      } else if (s.tag === 18) {
        if (g = s.return, g === null) throw Error(i(341));
        g.lanes |= l, u = g.alternate, u !== null && (u.lanes |= l), hf(g, l, e), g = null;
      } else g = s.child;
      if (g !== null) g.return = s;
      else
        for (g = s; g !== null; ) {
          if (g === e) {
            g = null;
            break;
          }
          if (s = g.sibling, s !== null) {
            s.return = g.return, g = s;
            break;
          }
          g = g.return;
        }
      s = g;
    }
  }
  function Pr(e, t, l, a) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var g = s.alternate;
        if (g === null) throw Error(i(387));
        if (g = g.memoizedProps, g !== null) {
          var C = s.type;
          Cl(s.pendingProps.value, g.value) || (e !== null ? e.push(C) : e = [C]);
        }
      } else if (s === Ge.current) {
        if (g = s.alternate, g === null) throw Error(i(387));
        g.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(ss) : e = [ss]);
      }
      s = s.return;
    }
    e !== null && mf(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function Zs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Cl(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ur(e) {
    cr = e, Lo = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Bn(e) {
    return Op(cr, e);
  }
  function $s(e, t) {
    return cr === null && ur(e), Op(e, t);
  }
  function Op(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Lo === null) {
      if (e === null) throw Error(i(308));
      Lo = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Lo = Lo.next = t;
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
  }, ZS = n.unstable_scheduleCallback, $S = n.unstable_NormalPriority, vn = {
    $$typeof: T,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function pf() {
    return {
      controller: new QS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Li(e) {
    e.refCount--, e.refCount === 0 && ZS($S, function() {
      e.controller.abort();
    });
  }
  var Vi = null, gf = 0, Xr = 0, Fr = null;
  function JS(e, t) {
    if (Vi === null) {
      var l = Vi = [];
      gf = 0, Xr = vd(), Fr = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return gf++, t.then(kp, kp), t;
  }
  function kp() {
    if (--gf === 0 && Vi !== null) {
      Fr !== null && (Fr.status = "fulfilled");
      var e = Vi;
      Vi = null, Xr = 0, Fr = null;
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
  var Np = H.S;
  H.S = function(e, t) {
    pb = Z(), typeof t == "object" && t !== null && typeof t.then == "function" && JS(e, t), Np !== null && Np(e, t);
  };
  var fr = z(null);
  function bf() {
    var e = fr.current;
    return e !== null ? e : Ft.pooledCache;
  }
  function Js(e, t) {
    t === null ? te(fr, fr.current) : te(fr, t.pool);
  }
  function zp() {
    var e = bf();
    return e === null ? null : { parent: vn._currentValue, pool: e };
  }
  var Kr = Error(i(460)), yf = Error(i(474)), Ws = Error(i(542)), ec = { then: function() {
  } };
  function Dp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jp(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(tl, tl), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Vp(e), e;
      default:
        if (typeof t.status == "string") t.then(tl, tl);
        else {
          if (e = Ft, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, Vp(e), e;
        }
        throw hr = t, Kr;
    }
  }
  function dr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (hr = l, Kr) : l;
    }
  }
  var hr = null;
  function Lp() {
    if (hr === null) throw Error(i(459));
    var e = hr;
    return hr = null, e;
  }
  function Vp(e) {
    if (e === Kr || e === Ws)
      throw Error(i(483));
  }
  var Qr = null, Ii = 0;
  function tc(e) {
    var t = Ii;
    return Ii += 1, Qr === null && (Qr = []), jp(Qr, e, t);
  }
  function Hi(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function nc(e, t) {
    throw t.$$typeof === v ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Ip(e) {
    function t(F, Y) {
      if (e) {
        var $ = F.deletions;
        $ === null ? (F.deletions = [Y], F.flags |= 16) : $.push(Y);
      }
    }
    function l(F, Y) {
      if (!e) return null;
      for (; Y !== null; )
        t(F, Y), Y = Y.sibling;
      return null;
    }
    function a(F) {
      for (var Y = /* @__PURE__ */ new Map(); F !== null; )
        F.key !== null ? Y.set(F.key, F) : Y.set(F.index, F), F = F.sibling;
      return Y;
    }
    function s(F, Y) {
      return F = Do(F, Y), F.index = 0, F.sibling = null, F;
    }
    function u(F, Y, $) {
      return F.index = $, e ? ($ = F.alternate, $ !== null ? ($ = $.index, $ < Y ? (F.flags |= 67108866, Y) : $) : (F.flags |= 67108866, Y)) : (F.flags |= 1048576, Y);
    }
    function g(F) {
      return e && F.alternate === null && (F.flags |= 67108866), F;
    }
    function C(F, Y, $, he) {
      return Y === null || Y.tag !== 6 ? (Y = af($, F.mode, he), Y.return = F, Y) : (Y = s(Y, $), Y.return = F, Y);
    }
    function I(F, Y, $, he) {
      var Pe = $.type;
      return Pe === A ? fe(
        F,
        Y,
        $.props.children,
        he,
        $.key
      ) : Y !== null && (Y.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && dr(Pe) === Y.type) ? (Y = s(Y, $.props), Hi(Y, $), Y.return = F, Y) : (Y = Ks(
        $.type,
        $.key,
        $.props,
        null,
        F.mode,
        he
      ), Hi(Y, $), Y.return = F, Y);
    }
    function J(F, Y, $, he) {
      return Y === null || Y.tag !== 4 || Y.stateNode.containerInfo !== $.containerInfo || Y.stateNode.implementation !== $.implementation ? (Y = rf($, F.mode, he), Y.return = F, Y) : (Y = s(Y, $.children || []), Y.return = F, Y);
    }
    function fe(F, Y, $, he, Pe) {
      return Y === null || Y.tag !== 7 ? (Y = ir(
        $,
        F.mode,
        he,
        Pe
      ), Y.return = F, Y) : (Y = s(Y, $), Y.return = F, Y);
    }
    function me(F, Y, $) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Y = af(
          "" + Y,
          F.mode,
          $
        ), Y.return = F, Y;
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case R:
            return $ = Ks(
              Y.type,
              Y.key,
              Y.props,
              null,
              F.mode,
              $
            ), Hi($, Y), $.return = F, $;
          case _:
            return Y = rf(
              Y,
              F.mode,
              $
            ), Y.return = F, Y;
          case L:
            return Y = dr(Y), me(F, Y, $);
        }
        if (ge(Y) || W(Y))
          return Y = ir(
            Y,
            F.mode,
            $,
            null
          ), Y.return = F, Y;
        if (typeof Y.then == "function")
          return me(F, tc(Y), $);
        if (Y.$$typeof === T)
          return me(
            F,
            $s(F, Y),
            $
          );
        nc(F, Y);
      }
      return null;
    }
    function ee(F, Y, $, he) {
      var Pe = Y !== null ? Y.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return Pe !== null ? null : C(F, Y, "" + $, he);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case R:
            return $.key === Pe ? I(F, Y, $, he) : null;
          case _:
            return $.key === Pe ? J(F, Y, $, he) : null;
          case L:
            return $ = dr($), ee(F, Y, $, he);
        }
        if (ge($) || W($))
          return Pe !== null ? null : fe(F, Y, $, he, null);
        if (typeof $.then == "function")
          return ee(
            F,
            Y,
            tc($),
            he
          );
        if ($.$$typeof === T)
          return ee(
            F,
            Y,
            $s(F, $),
            he
          );
        nc(F, $);
      }
      return null;
    }
    function re(F, Y, $, he, Pe) {
      if (typeof he == "string" && he !== "" || typeof he == "number" || typeof he == "bigint")
        return F = F.get($) || null, C(Y, F, "" + he, Pe);
      if (typeof he == "object" && he !== null) {
        switch (he.$$typeof) {
          case R:
            return F = F.get(
              he.key === null ? $ : he.key
            ) || null, I(Y, F, he, Pe);
          case _:
            return F = F.get(
              he.key === null ? $ : he.key
            ) || null, J(Y, F, he, Pe);
          case L:
            return he = dr(he), re(
              F,
              Y,
              $,
              he,
              Pe
            );
        }
        if (ge(he) || W(he))
          return F = F.get($) || null, fe(Y, F, he, Pe, null);
        if (typeof he.then == "function")
          return re(
            F,
            Y,
            $,
            tc(he),
            Pe
          );
        if (he.$$typeof === T)
          return re(
            F,
            Y,
            $,
            $s(Y, he),
            Pe
          );
        nc(Y, he);
      }
      return null;
    }
    function Ue(F, Y, $, he) {
      for (var Pe = null, Ot = null, Be = Y, dt = Y = 0, Et = null; Be !== null && dt < $.length; dt++) {
        Be.index > dt ? (Et = Be, Be = null) : Et = Be.sibling;
        var kt = ee(
          F,
          Be,
          $[dt],
          he
        );
        if (kt === null) {
          Be === null && (Be = Et);
          break;
        }
        e && Be && kt.alternate === null && t(F, Be), Y = u(kt, Y, dt), Ot === null ? Pe = kt : Ot.sibling = kt, Ot = kt, Be = Et;
      }
      if (dt === $.length)
        return l(F, Be), _t && jo(F, dt), Pe;
      if (Be === null) {
        for (; dt < $.length; dt++)
          Be = me(F, $[dt], he), Be !== null && (Y = u(
            Be,
            Y,
            dt
          ), Ot === null ? Pe = Be : Ot.sibling = Be, Ot = Be);
        return _t && jo(F, dt), Pe;
      }
      for (Be = a(Be); dt < $.length; dt++)
        Et = re(
          Be,
          F,
          dt,
          $[dt],
          he
        ), Et !== null && (e && Et.alternate !== null && Be.delete(
          Et.key === null ? dt : Et.key
        ), Y = u(
          Et,
          Y,
          dt
        ), Ot === null ? Pe = Et : Ot.sibling = Et, Ot = Et);
      return e && Be.forEach(function(Ma) {
        return t(F, Ma);
      }), _t && jo(F, dt), Pe;
    }
    function Qe(F, Y, $, he) {
      if ($ == null) throw Error(i(151));
      for (var Pe = null, Ot = null, Be = Y, dt = Y = 0, Et = null, kt = $.next(); Be !== null && !kt.done; dt++, kt = $.next()) {
        Be.index > dt ? (Et = Be, Be = null) : Et = Be.sibling;
        var Ma = ee(F, Be, kt.value, he);
        if (Ma === null) {
          Be === null && (Be = Et);
          break;
        }
        e && Be && Ma.alternate === null && t(F, Be), Y = u(Ma, Y, dt), Ot === null ? Pe = Ma : Ot.sibling = Ma, Ot = Ma, Be = Et;
      }
      if (kt.done)
        return l(F, Be), _t && jo(F, dt), Pe;
      if (Be === null) {
        for (; !kt.done; dt++, kt = $.next())
          kt = me(F, kt.value, he), kt !== null && (Y = u(kt, Y, dt), Ot === null ? Pe = kt : Ot.sibling = kt, Ot = kt);
        return _t && jo(F, dt), Pe;
      }
      for (Be = a(Be); !kt.done; dt++, kt = $.next())
        kt = re(Be, F, dt, kt.value, he), kt !== null && (e && kt.alternate !== null && Be.delete(kt.key === null ? dt : kt.key), Y = u(kt, Y, dt), Ot === null ? Pe = kt : Ot.sibling = kt, Ot = kt);
      return e && Be.forEach(function(uC) {
        return t(F, uC);
      }), _t && jo(F, dt), Pe;
    }
    function Xt(F, Y, $, he) {
      if (typeof $ == "object" && $ !== null && $.type === A && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case R:
            e: {
              for (var Pe = $.key; Y !== null; ) {
                if (Y.key === Pe) {
                  if (Pe = $.type, Pe === A) {
                    if (Y.tag === 7) {
                      l(
                        F,
                        Y.sibling
                      ), he = s(
                        Y,
                        $.props.children
                      ), he.return = F, F = he;
                      break e;
                    }
                  } else if (Y.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && dr(Pe) === Y.type) {
                    l(
                      F,
                      Y.sibling
                    ), he = s(Y, $.props), Hi(he, $), he.return = F, F = he;
                    break e;
                  }
                  l(F, Y);
                  break;
                } else t(F, Y);
                Y = Y.sibling;
              }
              $.type === A ? (he = ir(
                $.props.children,
                F.mode,
                he,
                $.key
              ), he.return = F, F = he) : (he = Ks(
                $.type,
                $.key,
                $.props,
                null,
                F.mode,
                he
              ), Hi(he, $), he.return = F, F = he);
            }
            return g(F);
          case _:
            e: {
              for (Pe = $.key; Y !== null; ) {
                if (Y.key === Pe)
                  if (Y.tag === 4 && Y.stateNode.containerInfo === $.containerInfo && Y.stateNode.implementation === $.implementation) {
                    l(
                      F,
                      Y.sibling
                    ), he = s(Y, $.children || []), he.return = F, F = he;
                    break e;
                  } else {
                    l(F, Y);
                    break;
                  }
                else t(F, Y);
                Y = Y.sibling;
              }
              he = rf($, F.mode, he), he.return = F, F = he;
            }
            return g(F);
          case L:
            return $ = dr($), Xt(
              F,
              Y,
              $,
              he
            );
        }
        if (ge($))
          return Ue(
            F,
            Y,
            $,
            he
          );
        if (W($)) {
          if (Pe = W($), typeof Pe != "function") throw Error(i(150));
          return $ = Pe.call($), Qe(
            F,
            Y,
            $,
            he
          );
        }
        if (typeof $.then == "function")
          return Xt(
            F,
            Y,
            tc($),
            he
          );
        if ($.$$typeof === T)
          return Xt(
            F,
            Y,
            $s(F, $),
            he
          );
        nc(F, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, Y !== null && Y.tag === 6 ? (l(F, Y.sibling), he = s(Y, $), he.return = F, F = he) : (l(F, Y), he = af($, F.mode, he), he.return = F, F = he), g(F)) : l(F, Y);
    }
    return function(F, Y, $, he) {
      try {
        Ii = 0;
        var Pe = Xt(
          F,
          Y,
          $,
          he
        );
        return Qr = null, Pe;
      } catch (Be) {
        if (Be === Kr || Be === Ws) throw Be;
        var Ot = _l(29, Be, null, F.mode);
        return Ot.lanes = he, Ot.return = F, Ot;
      }
    };
  }
  var mr = Ip(!0), Hp = Ip(!1), ua = !1;
  function vf(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function xf(e, t) {
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
    if (a = a.shared, (jt & 2) !== 0) {
      var s = a.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), a.pending = t, t = Fs(e), Ep(e, null, l), t;
    }
    return Xs(e, a, t, l), Fs(e);
  }
  function Ui(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, un(e, l);
    }
  }
  function Sf(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var s = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var g = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = g : u = u.next = g, l = l.next;
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
  var Ef = !1;
  function Bi() {
    if (Ef) {
      var e = Fr;
      if (e !== null) throw e;
    }
  }
  function Gi(e, t, l, a) {
    Ef = !1;
    var s = e.updateQueue;
    ua = !1;
    var u = s.firstBaseUpdate, g = s.lastBaseUpdate, C = s.shared.pending;
    if (C !== null) {
      s.shared.pending = null;
      var I = C, J = I.next;
      I.next = null, g === null ? u = J : g.next = J, g = I;
      var fe = e.alternate;
      fe !== null && (fe = fe.updateQueue, C = fe.lastBaseUpdate, C !== g && (C === null ? fe.firstBaseUpdate = J : C.next = J, fe.lastBaseUpdate = I));
    }
    if (u !== null) {
      var me = s.baseState;
      g = 0, fe = J = I = null, C = u;
      do {
        var ee = C.lane & -536870913, re = ee !== C.lane;
        if (re ? (St & ee) === ee : (a & ee) === ee) {
          ee !== 0 && ee === Xr && (Ef = !0), fe !== null && (fe = fe.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          e: {
            var Ue = e, Qe = C;
            ee = t;
            var Xt = l;
            switch (Qe.tag) {
              case 1:
                if (Ue = Qe.payload, typeof Ue == "function") {
                  me = Ue.call(Xt, me, ee);
                  break e;
                }
                me = Ue;
                break e;
              case 3:
                Ue.flags = Ue.flags & -65537 | 128;
              case 0:
                if (Ue = Qe.payload, ee = typeof Ue == "function" ? Ue.call(Xt, me, ee) : Ue, ee == null) break e;
                me = x({}, me, ee);
                break e;
              case 2:
                ua = !0;
            }
          }
          ee = C.callback, ee !== null && (e.flags |= 64, re && (e.flags |= 8192), re = s.callbacks, re === null ? s.callbacks = [ee] : re.push(ee));
        } else
          re = {
            lane: ee,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, fe === null ? (J = fe = re, I = me) : fe = fe.next = re, g |= ee;
        if (C = C.next, C === null) {
          if (C = s.shared.pending, C === null)
            break;
          re = C, C = re.next, re.next = null, s.lastBaseUpdate = re, s.shared.pending = null;
        }
      } while (!0);
      fe === null && (I = me), s.baseState = I, s.firstBaseUpdate = J, s.lastBaseUpdate = fe, u === null && (s.shared.lanes = 0), ba |= g, e.lanes = g, e.memoizedState = me;
    }
  }
  function Up(e, t) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(t);
  }
  function Bp(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Up(l[e], t);
  }
  var Zr = z(null), lc = z(0);
  function Gp(e, t) {
    e = Xo, te(lc, e), te(Zr, t), Xo = e | t.baseLanes;
  }
  function Cf() {
    te(lc, Xo), te(Zr, Zr.current);
  }
  function _f() {
    Xo = lc.current, P(Zr), P(lc);
  }
  var Rl = z(null), ql = null;
  function ha(e) {
    var t = e.alternate;
    te(dn, dn.current & 1), te(Rl, e), ql === null && (t === null || Zr.current !== null || t.memoizedState !== null) && (ql = e);
  }
  function Rf(e) {
    te(dn, dn.current), te(Rl, e), ql === null && (ql = e);
  }
  function Yp(e) {
    e.tag === 22 ? (te(dn, dn.current), te(Rl, e), ql === null && (ql = e)) : ma();
  }
  function ma() {
    te(dn, dn.current), te(Rl, Rl.current);
  }
  function wl(e) {
    P(Rl), ql === e && (ql = null), P(dn);
  }
  var dn = z(0);
  function oc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || kd(l) || Nd(l)))
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
  var Io = 0, ut = null, qt = null, xn = null, ac = !1, $r = !1, pr = !1, rc = 0, Yi = 0, Jr = null, eE = 0;
  function sn() {
    throw Error(i(321));
  }
  function wf(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Cl(e[l], t[l])) return !1;
    return !0;
  }
  function Mf(e, t, l, a, s, u) {
    return Io = u, ut = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e === null || e.memoizedState === null ? wg : Gf, pr = !1, u = l(a, s), pr = !1, $r && (u = Pp(
      t,
      l,
      a,
      s
    )), qp(e), u;
  }
  function qp(e) {
    H.H = Xi;
    var t = qt !== null && qt.next !== null;
    if (Io = 0, xn = qt = ut = null, ac = !1, Yi = 0, Jr = null, t) throw Error(i(300));
    e === null || Sn || (e = e.dependencies, e !== null && Zs(e) && (Sn = !0));
  }
  function Pp(e, t, l, a) {
    ut = e;
    var s = 0;
    do {
      if ($r && (Jr = null), Yi = 0, $r = !1, 25 <= s) throw Error(i(301));
      if (s += 1, xn = qt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      H.H = Mg, u = t(l, a);
    } while ($r);
    return u;
  }
  function tE() {
    var e = H.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? qi(t) : t, e = e.useState()[0], (qt !== null ? qt.memoizedState : null) !== e && (ut.flags |= 1024), t;
  }
  function Af() {
    var e = rc !== 0;
    return rc = 0, e;
  }
  function Tf(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Of(e) {
    if (ac) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ac = !1;
    }
    Io = 0, xn = qt = ut = null, $r = !1, Yi = rc = 0, Jr = null;
  }
  function ll() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return xn === null ? ut.memoizedState = xn = e : xn = xn.next = e, xn;
  }
  function hn() {
    if (qt === null) {
      var e = ut.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qt.next;
    var t = xn === null ? ut.memoizedState : xn.next;
    if (t !== null)
      xn = t, qt = e;
    else {
      if (e === null)
        throw ut.alternate === null ? Error(i(467)) : Error(i(310));
      qt = e, e = {
        memoizedState: qt.memoizedState,
        baseState: qt.baseState,
        baseQueue: qt.baseQueue,
        queue: qt.queue,
        next: null
      }, xn === null ? ut.memoizedState = xn = e : xn = xn.next = e;
    }
    return xn;
  }
  function ic() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qi(e) {
    var t = Yi;
    return Yi += 1, Jr === null && (Jr = []), e = jp(Jr, e, t), t = ut, (xn === null ? t.memoizedState : xn.next) === null && (t = t.alternate, H.H = t === null || t.memoizedState === null ? wg : Gf), e;
  }
  function sc(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return qi(e);
      if (e.$$typeof === T) return Bn(e);
    }
    throw Error(i(438, String(e)));
  }
  function kf(e) {
    var t = null, l = ut.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = ut.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = ic(), ut.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = ie;
    return t.index++, l;
  }
  function Ho(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function cc(e) {
    var t = hn();
    return Nf(t, qt, e);
  }
  function Nf(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(i(311));
    a.lastRenderedReducer = l;
    var s = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (s !== null) {
        var g = s.next;
        s.next = u.next, u.next = g;
      }
      t.baseQueue = s = u, a.pending = null;
    }
    if (u = e.baseState, s === null) e.memoizedState = u;
    else {
      t = s.next;
      var C = g = null, I = null, J = t, fe = !1;
      do {
        var me = J.lane & -536870913;
        if (me !== J.lane ? (St & me) === me : (Io & me) === me) {
          var ee = J.revertLane;
          if (ee === 0)
            I !== null && (I = I.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }), me === Xr && (fe = !0);
          else if ((Io & ee) === ee) {
            J = J.next, ee === Xr && (fe = !0);
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
            }, I === null ? (C = I = me, g = u) : I = I.next = me, ut.lanes |= ee, ba |= ee;
          me = J.action, pr && l(u, me), u = J.hasEagerState ? J.eagerState : l(u, me);
        } else
          ee = {
            lane: me,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, I === null ? (C = I = ee, g = u) : I = I.next = ee, ut.lanes |= me, ba |= me;
        J = J.next;
      } while (J !== null && J !== t);
      if (I === null ? g = u : I.next = C, !Cl(u, e.memoizedState) && (Sn = !0, fe && (l = Fr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = g, e.baseQueue = I, a.lastRenderedState = u;
    }
    return s === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function zf(e) {
    var t = hn(), l = t.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, s = l.pending, u = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var g = s = s.next;
      do
        u = e(u, g.action), g = g.next;
      while (g !== s);
      Cl(u, t.memoizedState) || (Sn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Xp(e, t, l) {
    var a = ut, s = hn(), u = _t;
    if (u) {
      if (l === void 0) throw Error(i(407));
      l = l();
    } else l = t();
    var g = !Cl(
      (qt || s).memoizedState,
      l
    );
    if (g && (s.memoizedState = l, Sn = !0), s = s.queue, Lf(Qp.bind(null, a, s, e), [
      e
    ]), s.getSnapshot !== t || g || xn !== null && xn.memoizedState.tag & 1) {
      if (a.flags |= 2048, Wr(
        9,
        { destroy: void 0 },
        Kp.bind(
          null,
          a,
          s,
          l,
          t
        ),
        null
      ), Ft === null) throw Error(i(349));
      u || (Io & 127) !== 0 || Fp(a, t, l);
    }
    return l;
  }
  function Fp(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = ut.updateQueue, t === null ? (t = ic(), ut.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Kp(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Zp(t) && $p(e);
  }
  function Qp(e, t, l) {
    return l(function() {
      Zp(t) && $p(e);
    });
  }
  function Zp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Cl(e, l);
    } catch {
      return !0;
    }
  }
  function $p(e) {
    var t = rr(e, 2);
    t !== null && pl(t, e, 2);
  }
  function Df(e) {
    var t = ll();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), pr) {
        Yt(!0);
        try {
          l();
        } finally {
          Yt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ho,
      lastRenderedState: e
    }, t;
  }
  function Jp(e, t, l, a) {
    return e.baseState = l, Nf(
      e,
      qt,
      typeof a == "function" ? a : Ho
    );
  }
  function nE(e, t, l, a, s) {
    if (dc(e)) throw Error(i(485));
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
        then: function(g) {
          u.listeners.push(g);
        }
      };
      H.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, Wp(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Wp(e, t) {
    var l = t.action, a = t.payload, s = e.state;
    if (t.isTransition) {
      var u = H.T, g = {};
      H.T = g;
      try {
        var C = l(s, a), I = H.S;
        I !== null && I(g, C), eg(e, t, C);
      } catch (J) {
        jf(e, t, J);
      } finally {
        u !== null && g.types !== null && (u.types = g.types), H.T = u;
      }
    } else
      try {
        u = l(s, a), eg(e, t, u);
      } catch (J) {
        jf(e, t, J);
      }
  }
  function eg(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        tg(e, t, a);
      },
      function(a) {
        return jf(e, t, a);
      }
    ) : tg(e, t, l);
  }
  function tg(e, t, l) {
    t.status = "fulfilled", t.value = l, ng(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Wp(e, l)));
  }
  function jf(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, ng(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function ng(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function lg(e, t) {
    return t;
  }
  function og(e, t) {
    if (_t) {
      var l = Ft.formState;
      if (l !== null) {
        e: {
          var a = ut;
          if (_t) {
            if ($t) {
              t: {
                for (var s = $t, u = Yl; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = Pl(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                $t = Pl(
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
    return l = ll(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lg,
      lastRenderedState: t
    }, l.queue = a, l = Cg.bind(
      null,
      ut,
      a
    ), a.dispatch = l, a = Df(!1), u = Bf.bind(
      null,
      ut,
      !1,
      a.queue
    ), a = ll(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = s, l = nE.bind(
      null,
      ut,
      s,
      u,
      l
    ), s.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function ag(e) {
    var t = hn();
    return rg(t, qt, e);
  }
  function rg(e, t, l) {
    if (t = Nf(
      e,
      t,
      lg
    )[0], e = cc(Ho)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = qi(t);
      } catch (g) {
        throw g === Kr ? Ws : g;
      }
    else a = t;
    t = hn();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (ut.flags |= 2048, Wr(
      9,
      { destroy: void 0 },
      lE.bind(null, s, l),
      null
    )), [a, u, e];
  }
  function lE(e, t) {
    e.action = t;
  }
  function ig(e) {
    var t = hn(), l = qt;
    if (l !== null)
      return rg(t, l, e);
    hn(), t = t.memoizedState, l = hn();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function Wr(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = ut.updateQueue, t === null && (t = ic(), ut.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function sg() {
    return hn().memoizedState;
  }
  function uc(e, t, l, a) {
    var s = ll();
    ut.flags |= e, s.memoizedState = Wr(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function fc(e, t, l, a) {
    var s = hn();
    a = a === void 0 ? null : a;
    var u = s.memoizedState.inst;
    qt !== null && a !== null && wf(a, qt.memoizedState.deps) ? s.memoizedState = Wr(t, u, l, a) : (ut.flags |= e, s.memoizedState = Wr(
      1 | t,
      u,
      l,
      a
    ));
  }
  function cg(e, t) {
    uc(8390656, 8, e, t);
  }
  function Lf(e, t) {
    fc(2048, 8, e, t);
  }
  function oE(e) {
    ut.flags |= 4;
    var t = ut.updateQueue;
    if (t === null)
      t = ic(), ut.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function ug(e) {
    var t = hn().memoizedState;
    return oE({ ref: t, nextImpl: e }), function() {
      if ((jt & 2) !== 0) throw Error(i(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function fg(e, t) {
    return fc(4, 2, e, t);
  }
  function dg(e, t) {
    return fc(4, 4, e, t);
  }
  function hg(e, t) {
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
  function mg(e, t, l) {
    l = l != null ? l.concat([e]) : null, fc(4, 4, hg.bind(null, t, e), l);
  }
  function Vf() {
  }
  function pg(e, t) {
    var l = hn();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && wf(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function gg(e, t) {
    var l = hn();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && wf(t, a[1]))
      return a[0];
    if (a = e(), pr) {
      Yt(!0);
      try {
        e();
      } finally {
        Yt(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function If(e, t, l) {
    return l === void 0 || (Io & 1073741824) !== 0 && (St & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = bb(), ut.lanes |= e, ba |= e, l);
  }
  function bg(e, t, l, a) {
    return Cl(l, t) ? l : Zr.current !== null ? (e = If(e, l, a), Cl(e, t) || (Sn = !0), e) : (Io & 42) === 0 || (Io & 1073741824) !== 0 && (St & 261930) === 0 ? (Sn = !0, e.memoizedState = l) : (e = bb(), ut.lanes |= e, ba |= e, t);
  }
  function yg(e, t, l, a, s) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var g = H.T, C = {};
    H.T = C, Bf(e, !1, t, l);
    try {
      var I = s(), J = H.S;
      if (J !== null && J(C, I), I !== null && typeof I == "object" && typeof I.then == "function") {
        var fe = WS(
          I,
          a
        );
        Pi(
          e,
          t,
          fe,
          Tl(e)
        );
      } else
        Pi(
          e,
          t,
          a,
          Tl(e)
        );
    } catch (me) {
      Pi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: me },
        Tl()
      );
    } finally {
      B.p = u, g !== null && C.types !== null && (g.types = C.types), H.T = g;
    }
  }
  function aE() {
  }
  function Hf(e, t, l, a) {
    if (e.tag !== 5) throw Error(i(476));
    var s = vg(e).queue;
    yg(
      e,
      s,
      t,
      Q,
      l === null ? aE : function() {
        return xg(e), l(a);
      }
    );
  }
  function vg(e) {
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
        lastRenderedReducer: Ho,
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
        lastRenderedReducer: Ho,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function xg(e) {
    var t = vg(e);
    t.next === null && (t = e.alternate.memoizedState), Pi(
      e,
      t.next.queue,
      {},
      Tl()
    );
  }
  function Uf() {
    return Bn(ss);
  }
  function Sg() {
    return hn().memoizedState;
  }
  function Eg() {
    return hn().memoizedState;
  }
  function rE(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Tl();
          e = fa(l);
          var a = da(t, e, l);
          a !== null && (pl(a, t, l), Ui(a, t, l)), t = { cache: pf() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function iE(e, t, l) {
    var a = Tl();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, dc(e) ? _g(t, l) : (l = lf(e, t, l, a), l !== null && (pl(l, e, a), Rg(l, t, a)));
  }
  function Cg(e, t, l) {
    var a = Tl();
    Pi(e, t, l, a);
  }
  function Pi(e, t, l, a) {
    var s = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (dc(e)) _g(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var g = t.lastRenderedState, C = u(g, l);
          if (s.hasEagerState = !0, s.eagerState = C, Cl(C, g))
            return Xs(e, t, s, 0), Ft === null && Ps(), !1;
        } catch {
        }
      if (l = lf(e, t, s, a), l !== null)
        return pl(l, e, a), Rg(l, t, a), !0;
    }
    return !1;
  }
  function Bf(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: vd(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, dc(e)) {
      if (t) throw Error(i(479));
    } else
      t = lf(
        e,
        l,
        a,
        2
      ), t !== null && pl(t, e, 2);
  }
  function dc(e) {
    var t = e.alternate;
    return e === ut || t !== null && t === ut;
  }
  function _g(e, t) {
    $r = ac = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Rg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, un(e, l);
    }
  }
  var Xi = {
    readContext: Bn,
    use: sc,
    useCallback: sn,
    useContext: sn,
    useEffect: sn,
    useImperativeHandle: sn,
    useLayoutEffect: sn,
    useInsertionEffect: sn,
    useMemo: sn,
    useReducer: sn,
    useRef: sn,
    useState: sn,
    useDebugValue: sn,
    useDeferredValue: sn,
    useTransition: sn,
    useSyncExternalStore: sn,
    useId: sn,
    useHostTransitionStatus: sn,
    useFormState: sn,
    useActionState: sn,
    useOptimistic: sn,
    useMemoCache: sn,
    useCacheRefresh: sn
  };
  Xi.useEffectEvent = sn;
  var wg = {
    readContext: Bn,
    use: sc,
    useCallback: function(e, t) {
      return ll().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Bn,
    useEffect: cg,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, uc(
        4194308,
        4,
        hg.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return uc(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      uc(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = ll();
      t = t === void 0 ? null : t;
      var a = e();
      if (pr) {
        Yt(!0);
        try {
          e();
        } finally {
          Yt(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = ll();
      if (l !== void 0) {
        var s = l(t);
        if (pr) {
          Yt(!0);
          try {
            l(t);
          } finally {
            Yt(!1);
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
        ut,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = ll();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Df(e);
      var t = e.queue, l = Cg.bind(null, ut, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Vf,
    useDeferredValue: function(e, t) {
      var l = ll();
      return If(l, e, t);
    },
    useTransition: function() {
      var e = Df(!1);
      return e = yg.bind(
        null,
        ut,
        e.queue,
        !0,
        !1
      ), ll().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = ut, s = ll();
      if (_t) {
        if (l === void 0)
          throw Error(i(407));
        l = l();
      } else {
        if (l = t(), Ft === null)
          throw Error(i(349));
        (St & 127) !== 0 || Fp(a, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, cg(Qp.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, Wr(
        9,
        { destroy: void 0 },
        Kp.bind(
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
      var e = ll(), t = Ft.identifierPrefix;
      if (_t) {
        var l = Eo, a = So;
        l = (a & ~(1 << 32 - ot(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = rc++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = eE++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Uf,
    useFormState: og,
    useActionState: og,
    useOptimistic: function(e) {
      var t = ll();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Bf.bind(
        null,
        ut,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: kf,
    useCacheRefresh: function() {
      return ll().memoizedState = rE.bind(
        null,
        ut
      );
    },
    useEffectEvent: function(e) {
      var t = ll(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((jt & 2) !== 0)
          throw Error(i(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Gf = {
    readContext: Bn,
    use: sc,
    useCallback: pg,
    useContext: Bn,
    useEffect: Lf,
    useImperativeHandle: mg,
    useInsertionEffect: fg,
    useLayoutEffect: dg,
    useMemo: gg,
    useReducer: cc,
    useRef: sg,
    useState: function() {
      return cc(Ho);
    },
    useDebugValue: Vf,
    useDeferredValue: function(e, t) {
      var l = hn();
      return bg(
        l,
        qt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = cc(Ho)[0], t = hn().memoizedState;
      return [
        typeof e == "boolean" ? e : qi(e),
        t
      ];
    },
    useSyncExternalStore: Xp,
    useId: Sg,
    useHostTransitionStatus: Uf,
    useFormState: ag,
    useActionState: ag,
    useOptimistic: function(e, t) {
      var l = hn();
      return Jp(l, qt, e, t);
    },
    useMemoCache: kf,
    useCacheRefresh: Eg
  };
  Gf.useEffectEvent = ug;
  var Mg = {
    readContext: Bn,
    use: sc,
    useCallback: pg,
    useContext: Bn,
    useEffect: Lf,
    useImperativeHandle: mg,
    useInsertionEffect: fg,
    useLayoutEffect: dg,
    useMemo: gg,
    useReducer: zf,
    useRef: sg,
    useState: function() {
      return zf(Ho);
    },
    useDebugValue: Vf,
    useDeferredValue: function(e, t) {
      var l = hn();
      return qt === null ? If(l, e, t) : bg(
        l,
        qt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = zf(Ho)[0], t = hn().memoizedState;
      return [
        typeof e == "boolean" ? e : qi(e),
        t
      ];
    },
    useSyncExternalStore: Xp,
    useId: Sg,
    useHostTransitionStatus: Uf,
    useFormState: ig,
    useActionState: ig,
    useOptimistic: function(e, t) {
      var l = hn();
      return qt !== null ? Jp(l, qt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: kf,
    useCacheRefresh: Eg
  };
  Mg.useEffectEvent = ug;
  function Yf(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : x({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var qf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = Tl(), s = fa(a);
      s.payload = t, l != null && (s.callback = l), t = da(e, s, a), t !== null && (pl(t, e, a), Ui(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = Tl(), s = fa(a);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = da(e, s, a), t !== null && (pl(t, e, a), Ui(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Tl(), a = fa(l);
      a.tag = 2, t != null && (a.callback = t), t = da(e, a, l), t !== null && (pl(t, e, l), Ui(t, e, l));
    }
  };
  function Ag(e, t, l, a, s, u, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, g) : t.prototype && t.prototype.isPureReactComponent ? !Ni(l, a) || !Ni(s, u) : !0;
  }
  function Tg(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && qf.enqueueReplaceState(t, t.state, null);
  }
  function gr(e, t) {
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
  function Og(e) {
    qs(e);
  }
  function kg(e) {
    console.error(e);
  }
  function Ng(e) {
    qs(e);
  }
  function hc(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function zg(e, t, l) {
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
  function Pf(e, t, l) {
    return l = fa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      hc(e, t);
    }, l;
  }
  function Dg(e) {
    return e = fa(e), e.tag = 3, e;
  }
  function jg(e, t, l, a) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = a.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        zg(t, l, a);
      };
    }
    var g = l.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      zg(t, l, a), typeof s != "function" && (ya === null ? ya = /* @__PURE__ */ new Set([this]) : ya.add(this));
      var C = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function sE(e, t, l, a, s) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && Pr(
        t,
        l,
        s,
        !0
      ), l = Rl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return ql === null ? Rc() : l.alternate === null && cn === 0 && (cn = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, a === ec ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), gd(e, a, s)), !1;
          case 22:
            return l.flags |= 65536, a === ec ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), gd(e, a, s)), !1;
        }
        throw Error(i(435, l.tag));
      }
      return gd(e, a, s), Rc(), !1;
    }
    if (_t)
      return t = Rl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, a !== uf && (e = Error(i(422), { cause: a }), ji(Ul(e, l)))) : (a !== uf && (t = Error(i(423), {
        cause: a
      }), ji(
        Ul(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, a = Ul(a, l), s = Pf(
        e.stateNode,
        a,
        s
      ), Sf(e, s), cn !== 4 && (cn = 2)), !1;
    var u = Error(i(520), { cause: a });
    if (u = Ul(u, l), es === null ? es = [u] : es.push(u), cn !== 4 && (cn = 2), t === null) return !0;
    a = Ul(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = Pf(l.stateNode, a, e), Sf(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ya === null || !ya.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = Dg(s), jg(
              s,
              e,
              l,
              a
            ), Sf(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Xf = Error(i(461)), Sn = !1;
  function Gn(e, t, l, a) {
    t.child = e === null ? Hp(t, null, l, a) : mr(
      t,
      e.child,
      l,
      a
    );
  }
  function Lg(e, t, l, a, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var g = {};
      for (var C in a)
        C !== "ref" && (g[C] = a[C]);
    } else g = a;
    return ur(t), a = Mf(
      e,
      t,
      l,
      g,
      u,
      s
    ), C = Af(), e !== null && !Sn ? (Tf(e, t, s), Uo(e, t, s)) : (_t && C && sf(t), t.flags |= 1, Gn(e, t, a, s), t.child);
  }
  function Vg(e, t, l, a, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !of(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Ig(
        e,
        t,
        u,
        a,
        s
      )) : (e = Ks(
        l.type,
        null,
        a,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !ed(e, s)) {
      var g = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ni, l(g, a) && e.ref === t.ref)
        return Uo(e, t, s);
    }
    return t.flags |= 1, e = Do(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Ig(e, t, l, a, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ni(u, a) && e.ref === t.ref)
        if (Sn = !1, t.pendingProps = a = u, ed(e, s))
          (e.flags & 131072) !== 0 && (Sn = !0);
        else
          return t.lanes = e.lanes, Uo(e, t, s);
    }
    return Ff(
      e,
      t,
      l,
      a,
      s
    );
  }
  function Hg(e, t, l, a) {
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
        return Ug(
          e,
          t,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Js(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Gp(t, u) : Cf(), Yp(t);
      else
        return a = t.lanes = 536870912, Ug(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Js(t, u.cachePool), Gp(t, u), ma(), t.memoizedState = null) : (e !== null && Js(t, null), Cf(), ma());
    return Gn(e, t, s, l), t.child;
  }
  function Fi(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Ug(e, t, l, a, s) {
    var u = bf();
    return u = u === null ? null : { parent: vn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Js(t, null), Cf(), Yp(t), e !== null && Pr(e, t, a, !0), t.childLanes = s, null;
  }
  function mc(e, t) {
    return t = gc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Bg(e, t, l) {
    return mr(t, e.child, null, l), e = mc(t, t.pendingProps), e.flags |= 2, wl(t), t.memoizedState = null, e;
  }
  function cE(e, t, l) {
    var a = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (_t) {
        if (a.mode === "hidden")
          return e = mc(t, a), t.lanes = 536870912, Fi(null, e);
        if (Rf(t), (e = $t) ? (e = Wb(
          e,
          Yl
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ra !== null ? { id: So, overflow: Eo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = _p(e), l.return = t, t.child = l, Un = t, $t = null)) : e = null, e === null) throw sa(t);
        return t.lanes = 536870912, null;
      }
      return mc(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var g = u.dehydrated;
      if (Rf(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Bg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(i(558));
      else if (Sn || Pr(e, t, l, !1), s = (l & e.childLanes) !== 0, Sn || s) {
        if (a = Ft, a !== null && (g = fn(a, l), g !== 0 && g !== u.retryLane))
          throw u.retryLane = g, rr(e, g), pl(a, e, g), Xf;
        Rc(), t = Bg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, $t = Pl(g.nextSibling), Un = t, _t = !0, ia = null, Yl = !1, e !== null && Mp(t, e), t = mc(t, a), t.flags |= 4096;
      return t;
    }
    return e = Do(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function pc(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(i(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Ff(e, t, l, a, s) {
    return ur(t), l = Mf(
      e,
      t,
      l,
      a,
      void 0,
      s
    ), a = Af(), e !== null && !Sn ? (Tf(e, t, s), Uo(e, t, s)) : (_t && a && sf(t), t.flags |= 1, Gn(e, t, l, s), t.child);
  }
  function Gg(e, t, l, a, s, u) {
    return ur(t), t.updateQueue = null, l = Pp(
      t,
      a,
      l,
      s
    ), qp(e), a = Af(), e !== null && !Sn ? (Tf(e, t, u), Uo(e, t, u)) : (_t && a && sf(t), t.flags |= 1, Gn(e, t, l, u), t.child);
  }
  function Yg(e, t, l, a, s) {
    if (ur(t), t.stateNode === null) {
      var u = Br, g = l.contextType;
      typeof g == "object" && g !== null && (u = Bn(g)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = qf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, vf(t), g = l.contextType, u.context = typeof g == "object" && g !== null ? Bn(g) : Br, u.state = t.memoizedState, g = l.getDerivedStateFromProps, typeof g == "function" && (Yf(
        t,
        l,
        g,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (g = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), g !== u.state && qf.enqueueReplaceState(u, u.state, null), Gi(t, a, u, s), Bi(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var C = t.memoizedProps, I = gr(l, C);
      u.props = I;
      var J = u.context, fe = l.contextType;
      g = Br, typeof fe == "object" && fe !== null && (g = Bn(fe));
      var me = l.getDerivedStateFromProps;
      fe = typeof me == "function" || typeof u.getSnapshotBeforeUpdate == "function", C = t.pendingProps !== C, fe || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (C || J !== g) && Tg(
        t,
        u,
        a,
        g
      ), ua = !1;
      var ee = t.memoizedState;
      u.state = ee, Gi(t, a, u, s), Bi(), J = t.memoizedState, C || ee !== J || ua ? (typeof me == "function" && (Yf(
        t,
        l,
        me,
        a
      ), J = t.memoizedState), (I = ua || Ag(
        t,
        l,
        I,
        a,
        ee,
        J,
        g
      )) ? (fe || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = J), u.props = a, u.state = J, u.context = g, a = I) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, xf(e, t), g = t.memoizedProps, fe = gr(l, g), u.props = fe, me = t.pendingProps, ee = u.context, J = l.contextType, I = Br, typeof J == "object" && J !== null && (I = Bn(J)), C = l.getDerivedStateFromProps, (J = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (g !== me || ee !== I) && Tg(
        t,
        u,
        a,
        I
      ), ua = !1, ee = t.memoizedState, u.state = ee, Gi(t, a, u, s), Bi();
      var re = t.memoizedState;
      g !== me || ee !== re || ua || e !== null && e.dependencies !== null && Zs(e.dependencies) ? (typeof C == "function" && (Yf(
        t,
        l,
        C,
        a
      ), re = t.memoizedState), (fe = ua || Ag(
        t,
        l,
        fe,
        a,
        ee,
        re,
        I
      ) || e !== null && e.dependencies !== null && Zs(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, re, I), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        re,
        I
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || g === e.memoizedProps && ee === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && ee === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = re), u.props = a, u.state = re, u.context = I, a = fe) : (typeof u.componentDidUpdate != "function" || g === e.memoizedProps && ee === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && ee === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, pc(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = mr(
      t,
      e.child,
      null,
      s
    ), t.child = mr(
      t,
      null,
      l,
      s
    )) : Gn(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = Uo(
      e,
      t,
      s
    ), e;
  }
  function qg(e, t, l, a) {
    return sr(), t.flags |= 256, Gn(e, t, l, a), t.child;
  }
  var Kf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Qf(e) {
    return { baseLanes: e, cachePool: zp() };
  }
  function Zf(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Al), e;
  }
  function Pg(e, t, l) {
    var a = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, g;
    if ((g = u) || (g = e !== null && e.memoizedState === null ? !1 : (dn.current & 2) !== 0), g && (s = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (_t) {
        if (s ? ha(t) : ma(), (e = $t) ? (e = Wb(
          e,
          Yl
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ra !== null ? { id: So, overflow: Eo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = _p(e), l.return = t, t.child = l, Un = t, $t = null)) : e = null, e === null) throw sa(t);
        return Nd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var C = a.children;
      return a = a.fallback, s ? (ma(), s = t.mode, C = gc(
        { mode: "hidden", children: C },
        s
      ), a = ir(
        a,
        s,
        l,
        null
      ), C.return = t, a.return = t, C.sibling = a, t.child = C, a = t.child, a.memoizedState = Qf(l), a.childLanes = Zf(
        e,
        g,
        l
      ), t.memoizedState = Kf, Fi(null, a)) : (ha(t), $f(t, C));
    }
    var I = e.memoizedState;
    if (I !== null && (C = I.dehydrated, C !== null)) {
      if (u)
        t.flags & 256 ? (ha(t), t.flags &= -257, t = Jf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (ma(), t.child = e.child, t.flags |= 128, t = null) : (ma(), C = a.fallback, s = t.mode, a = gc(
          { mode: "visible", children: a.children },
          s
        ), C = ir(
          C,
          s,
          l,
          null
        ), C.flags |= 2, a.return = t, C.return = t, a.sibling = C, t.child = a, mr(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = Qf(l), a.childLanes = Zf(
          e,
          g,
          l
        ), t.memoizedState = Kf, t = Fi(null, a));
      else if (ha(t), Nd(C)) {
        if (g = C.nextSibling && C.nextSibling.dataset, g) var J = g.dgst;
        g = J, a = Error(i(419)), a.stack = "", a.digest = g, ji({ value: a, source: null, stack: null }), t = Jf(
          e,
          t,
          l
        );
      } else if (Sn || Pr(e, t, l, !1), g = (l & e.childLanes) !== 0, Sn || g) {
        if (g = Ft, g !== null && (a = fn(g, l), a !== 0 && a !== I.retryLane))
          throw I.retryLane = a, rr(e, a), pl(g, e, a), Xf;
        kd(C) || Rc(), t = Jf(
          e,
          t,
          l
        );
      } else
        kd(C) ? (t.flags |= 192, t.child = e.child, t = null) : (e = I.treeContext, $t = Pl(
          C.nextSibling
        ), Un = t, _t = !0, ia = null, Yl = !1, e !== null && Mp(t, e), t = $f(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (ma(), C = a.fallback, s = t.mode, I = e.child, J = I.sibling, a = Do(I, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = I.subtreeFlags & 65011712, J !== null ? C = Do(
      J,
      C
    ) : (C = ir(
      C,
      s,
      l,
      null
    ), C.flags |= 2), C.return = t, a.return = t, a.sibling = C, t.child = a, Fi(null, a), a = t.child, C = e.child.memoizedState, C === null ? C = Qf(l) : (s = C.cachePool, s !== null ? (I = vn._currentValue, s = s.parent !== I ? { parent: I, pool: I } : s) : s = zp(), C = {
      baseLanes: C.baseLanes | l,
      cachePool: s
    }), a.memoizedState = C, a.childLanes = Zf(
      e,
      g,
      l
    ), t.memoizedState = Kf, Fi(e.child, a)) : (ha(t), l = e.child, e = l.sibling, l = Do(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function $f(e, t) {
    return t = gc(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function gc(e, t) {
    return e = _l(22, e, null, t), e.lanes = 0, e;
  }
  function Jf(e, t, l) {
    return mr(t, e.child, null, l), e = $f(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Xg(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), hf(e.return, t, l);
  }
  function Wf(e, t, l, a, s, u) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: s,
      treeForkCount: u
    } : (g.isBackwards = t, g.rendering = null, g.renderingStartTime = 0, g.last = a, g.tail = l, g.tailMode = s, g.treeForkCount = u);
  }
  function Fg(e, t, l) {
    var a = t.pendingProps, s = a.revealOrder, u = a.tail;
    a = a.children;
    var g = dn.current, C = (g & 2) !== 0;
    if (C ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, te(dn, g), Gn(e, t, a, l), a = _t ? Di : 0, !C && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Xg(e, l, t);
        else if (e.tag === 19)
          Xg(e, l, t);
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
          e = l.alternate, e !== null && oc(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), Wf(
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
          if (e = s.alternate, e !== null && oc(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        Wf(
          t,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Wf(
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
  function Uo(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), ba |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Pr(
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
      for (e = t.child, l = Do(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Do(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function ed(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Zs(e)));
  }
  function uE(e, t, l) {
    switch (t.tag) {
      case 3:
        Ae(t, t.stateNode.containerInfo), ca(t, vn, e.memoizedState.cache), sr();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        Ae(t, t.stateNode.containerInfo);
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
          return t.flags |= 128, Rf(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ha(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Pg(e, t, l) : (ha(t), e = Uo(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ha(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (Pr(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), s) {
          if (a)
            return Fg(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), te(dn, dn.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Hg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        ca(t, vn, e.memoizedState.cache);
    }
    return Uo(e, t, l);
  }
  function Kg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Sn = !0;
      else {
        if (!ed(e, l) && (t.flags & 128) === 0)
          return Sn = !1, uE(
            e,
            t,
            l
          );
        Sn = (e.flags & 131072) !== 0;
      }
    else
      Sn = !1, _t && (t.flags & 1048576) !== 0 && wp(t, Di, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = dr(t.elementType), t.type = e, typeof e == "function")
            of(e) ? (a = gr(e, a), t.tag = 1, t = Yg(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = Ff(
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
                t.tag = 11, t = Lg(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (s === G) {
                t.tag = 14, t = Vg(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = se(e) || e, Error(i(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ff(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return a = t.type, s = gr(
          a,
          t.pendingProps
        ), Yg(
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
          s = u.element, xf(e, t), Gi(t, a, null, l);
          var g = t.memoizedState;
          if (a = g.cache, ca(t, vn, a), a !== u.cache && mf(
            t,
            [vn],
            l,
            !0
          ), Bi(), a = g.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = qg(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== s) {
              s = Ul(
                Error(i(424)),
                t
              ), ji(s), t = qg(
                e,
                t,
                a,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, $t = Pl(e.firstChild), Un = t, _t = !0, ia = null, Yl = !0, l = Hp(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (sr(), a === s) {
              t = Uo(
                e,
                t,
                l
              );
              break e;
            }
            Gn(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return pc(e, t), e === null ? (l = ay(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : _t || (l = t.type, e = t.pendingProps, a = Nc(
          we.current
        ).createElement(l), a[Dt] = t, a[At] = e, Yn(a, l, e), on(a), t.stateNode = a) : t.memoizedState = ay(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && _t && (a = t.stateNode = ny(
          t.type,
          t.pendingProps,
          we.current
        ), Un = t, Yl = !0, s = $t, Ea(t.type) ? (zd = s, $t = Pl(a.firstChild)) : $t = s), Gn(
          e,
          t,
          t.pendingProps.children,
          l
        ), pc(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && _t && ((s = a = $t) && (a = UE(
          a,
          t.type,
          t.pendingProps,
          Yl
        ), a !== null ? (t.stateNode = a, Un = t, $t = Pl(a.firstChild), Yl = !1, s = !0) : s = !1), s || sa(t)), it(t), s = t.type, u = t.pendingProps, g = e !== null ? e.memoizedProps : null, a = u.children, Ad(s, u) ? a = null : g !== null && Ad(s, g) && (t.flags |= 32), t.memoizedState !== null && (s = Mf(
          e,
          t,
          tE,
          null,
          null,
          l
        ), ss._currentValue = s), pc(e, t), Gn(e, t, a, l), t.child;
      case 6:
        return e === null && _t && ((e = l = $t) && (l = BE(
          l,
          t.pendingProps,
          Yl
        ), l !== null ? (t.stateNode = l, Un = t, $t = null, e = !0) : e = !1), e || sa(t)), null;
      case 13:
        return Pg(e, t, l);
      case 4:
        return Ae(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = mr(
          t,
          null,
          a,
          l
        ) : Gn(e, t, a, l), t.child;
      case 11:
        return Lg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Gn(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Gn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Gn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return a = t.pendingProps, ca(t, t.type, a.value), Gn(e, t, a.children, l), t.child;
      case 9:
        return s = t.type._context, a = t.pendingProps.children, ur(t), s = Bn(s), a = a(s), t.flags |= 1, Gn(e, t, a, l), t.child;
      case 14:
        return Vg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Ig(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Fg(e, t, l);
      case 31:
        return cE(e, t, l);
      case 22:
        return Hg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return ur(t), a = Bn(vn), e === null ? (s = bf(), s === null && (s = Ft, u = pf(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: a, cache: s }, vf(t), ca(t, vn, s)) : ((e.lanes & l) !== 0 && (xf(e, t), Gi(t, null, null, l), Bi()), s = e.memoizedState, u = t.memoizedState, s.parent !== a ? (s = { parent: a, cache: a }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), ca(t, vn, a)) : (a = u.cache, ca(t, vn, a), a !== s.cache && mf(
          t,
          [vn],
          l,
          !0
        ))), Gn(
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
  function Bo(e) {
    e.flags |= 4;
  }
  function td(e, t, l, a, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Sb()) e.flags |= 8192;
        else
          throw hr = ec, yf;
    } else e.flags &= -16777217;
  }
  function Qg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !uy(t))
      if (Sb()) e.flags |= 8192;
      else
        throw hr = ec, yf;
  }
  function bc(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Mn() : 536870912, e.lanes |= t, li |= t);
  }
  function Ki(e, t) {
    if (!_t)
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
  function Jt(e) {
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
    switch (cf(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Jt(t), null;
      case 1:
        return Jt(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Vo(vn), Oe(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (qr(t) ? Bo(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ff())), Jt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Bo(t), u !== null ? (Jt(t), Qg(t, u)) : (Jt(t), td(
          t,
          s,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (Bo(t), Jt(t), Qg(t, u)) : (Jt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Bo(t), Jt(t), td(
          t,
          s,
          e,
          a,
          l
        )), null;
      case 27:
        if (gt(t), l = we.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Bo(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(i(166));
            return Jt(t), null;
          }
          e = ae.current, qr(t) ? Ap(t) : (e = ny(s, a, l), t.stateNode = e, Bo(t));
        }
        return Jt(t), null;
      case 5:
        if (gt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Bo(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(i(166));
            return Jt(t), null;
          }
          if (u = ae.current, qr(t))
            Ap(t);
          else {
            var g = Nc(
              we.current
            );
            switch (u) {
              case 1:
                u = g.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = g.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = g.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = g.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = g.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? g.createElement("select", {
                      is: a.is
                    }) : g.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? g.createElement(s, { is: a.is }) : g.createElement(s);
                }
            }
            u[Dt] = t, u[At] = a;
            e: for (g = t.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6)
                u.appendChild(g.stateNode);
              else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
                g.child.return = g, g = g.child;
                continue;
              }
              if (g === t) break e;
              for (; g.sibling === null; ) {
                if (g.return === null || g.return === t)
                  break e;
                g = g.return;
              }
              g.sibling.return = g.return, g = g.sibling;
            }
            t.stateNode = u;
            e: switch (Yn(u, s, a), s) {
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
            a && Bo(t);
          }
        }
        return Jt(t), td(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Bo(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(i(166));
          if (e = we.current, qr(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, s = Un, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  a = s.memoizedProps;
              }
            e[Dt] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Pb(e.nodeValue, l)), e || sa(t, !0);
          } else
            e = Nc(e).createTextNode(
              a
            ), e[Dt] = t, t.stateNode = e;
        }
        return Jt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = qr(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(i(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Dt] = t;
            } else
              sr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Jt(t), e = !1;
          } else
            l = ff(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (wl(t), t) : (wl(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Jt(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = qr(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(i(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(i(317));
              s[Dt] = t;
            } else
              sr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Jt(t), s = !1;
          } else
            s = ff(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (wl(t), t) : (wl(t), null);
        }
        return wl(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, s = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (s = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== s && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), bc(t, t.updateQueue), Jt(t), null);
      case 4:
        return Oe(), e === null && Cd(t.stateNode.containerInfo), Jt(t), null;
      case 10:
        return Vo(t.type), Jt(t), null;
      case 19:
        if (P(dn), a = t.memoizedState, a === null) return Jt(t), null;
        if (s = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (s) Ki(a, !1);
          else {
            if (cn !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = oc(e), u !== null) {
                  for (t.flags |= 128, Ki(a, !1), e = u.updateQueue, t.updateQueue = e, bc(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    Cp(l, e), l = l.sibling;
                  return te(
                    dn,
                    dn.current & 1 | 2
                  ), _t && jo(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && Z() > Ec && (t.flags |= 128, s = !0, Ki(a, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = oc(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, bc(t, e), Ki(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !_t)
                return Jt(t), null;
            } else
              2 * Z() - a.renderingStartTime > Ec && l !== 536870912 && (t.flags |= 128, s = !0, Ki(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Z(), e.sibling = null, l = dn.current, te(
          dn,
          s ? l & 1 | 2 : l & 1
        ), _t && jo(t, a.treeForkCount), e) : (Jt(t), null);
      case 22:
      case 23:
        return wl(t), _f(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Jt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Jt(t), l = t.updateQueue, l !== null && bc(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && P(fr), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Vo(vn), Jt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function dE(e, t) {
    switch (cf(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Vo(vn), Oe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return gt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (wl(t), t.alternate === null)
            throw Error(i(340));
          sr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (wl(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(i(340));
          sr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return P(dn), null;
      case 4:
        return Oe(), null;
      case 10:
        return Vo(t.type), null;
      case 22:
      case 23:
        return wl(t), _f(), e !== null && P(fr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Vo(vn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zg(e, t) {
    switch (cf(t), t.tag) {
      case 3:
        Vo(vn), Oe();
        break;
      case 26:
      case 27:
      case 5:
        gt(t);
        break;
      case 4:
        Oe();
        break;
      case 31:
        t.memoizedState !== null && wl(t);
        break;
      case 13:
        wl(t);
        break;
      case 19:
        P(dn);
        break;
      case 10:
        Vo(t.type);
        break;
      case 22:
      case 23:
        wl(t), _f(), e !== null && P(fr);
        break;
      case 24:
        Vo(vn);
    }
  }
  function Qi(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var s = a.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create, g = l.inst;
            a = u(), g.destroy = a;
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (C) {
      Bt(t, t.return, C);
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
            var g = a.inst, C = g.destroy;
            if (C !== void 0) {
              g.destroy = void 0, s = t;
              var I = l, J = C;
              try {
                J();
              } catch (fe) {
                Bt(
                  s,
                  I,
                  fe
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (fe) {
      Bt(t, t.return, fe);
    }
  }
  function $g(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Bp(t, l);
      } catch (a) {
        Bt(e, e.return, a);
      }
    }
  }
  function Jg(e, t, l) {
    l.props = gr(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Bt(e, t, a);
    }
  }
  function Zi(e, t) {
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
      Bt(e, t, s);
    }
  }
  function Co(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (s) {
          Bt(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (s) {
          Bt(e, t, s);
        }
      else l.current = null;
  }
  function Wg(e) {
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
      Bt(e, e.return, s);
    }
  }
  function nd(e, t, l) {
    try {
      var a = e.stateNode;
      DE(a, e.type, l, t), a[At] = t;
    } catch (s) {
      Bt(e, e.return, s);
    }
  }
  function eb(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ea(e.type) || e.tag === 4;
  }
  function ld(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || eb(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ea(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function od(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = tl));
    else if (a !== 4 && (a === 27 && Ea(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (od(e, t, l), e = e.sibling; e !== null; )
        od(e, t, l), e = e.sibling;
  }
  function yc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && Ea(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (yc(e, t, l), e = e.sibling; e !== null; )
        yc(e, t, l), e = e.sibling;
  }
  function tb(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Yn(t, a, l), t[Dt] = e, t[At] = l;
    } catch (u) {
      Bt(e, e.return, u);
    }
  }
  var Go = !1, En = !1, ad = !1, nb = typeof WeakSet == "function" ? WeakSet : Set, Dn = null;
  function hE(e, t) {
    if (e = e.containerInfo, wd = Hc, e = mp(e), $u(e)) {
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
            var g = 0, C = -1, I = -1, J = 0, fe = 0, me = e, ee = null;
            t: for (; ; ) {
              for (var re; me !== l || s !== 0 && me.nodeType !== 3 || (C = g + s), me !== u || a !== 0 && me.nodeType !== 3 || (I = g + a), me.nodeType === 3 && (g += me.nodeValue.length), (re = me.firstChild) !== null; )
                ee = me, me = re;
              for (; ; ) {
                if (me === e) break t;
                if (ee === l && ++J === s && (C = g), ee === u && ++fe === a && (I = g), (re = me.nextSibling) !== null) break;
                me = ee, ee = me.parentNode;
              }
              me = re;
            }
            l = C === -1 || I === -1 ? null : { start: C, end: I };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Md = { focusedElem: e, selectionRange: l }, Hc = !1, Dn = t; Dn !== null; )
      if (t = Dn, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Dn = e;
      else
        for (; Dn !== null; ) {
          switch (t = Dn, u = t.alternate, e = t.flags, t.tag) {
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
                  var Ue = gr(
                    l.type,
                    s
                  );
                  e = a.getSnapshotBeforeUpdate(
                    Ue,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Qe) {
                  Bt(
                    l,
                    l.return,
                    Qe
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  Od(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Od(e);
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
            e.return = t.return, Dn = e;
            break;
          }
          Dn = t.return;
        }
  }
  function lb(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        qo(e, l), a & 4 && Qi(5, l);
        break;
      case 1:
        if (qo(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              Bt(l, l.return, g);
            }
          else {
            var s = gr(
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
            } catch (g) {
              Bt(
                l,
                l.return,
                g
              );
            }
          }
        a & 64 && $g(l), a & 512 && Zi(l, l.return);
        break;
      case 3:
        if (qo(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
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
            Bp(e, t);
          } catch (g) {
            Bt(l, l.return, g);
          }
        }
        break;
      case 27:
        t === null && a & 4 && tb(l);
      case 26:
      case 5:
        qo(e, l), t === null && a & 4 && Wg(l), a & 512 && Zi(l, l.return);
        break;
      case 12:
        qo(e, l);
        break;
      case 31:
        qo(e, l), a & 4 && rb(e, l);
        break;
      case 13:
        qo(e, l), a & 4 && ib(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = EE.bind(
          null,
          l
        ), GE(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || Go, !a) {
          t = t !== null && t.memoizedState !== null || En, s = Go;
          var u = En;
          Go = a, (En = t) && !u ? Po(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : qo(e, l), Go = s, En = u;
        }
        break;
      case 30:
        break;
      default:
        qo(e, l);
    }
  }
  function ob(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ob(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ka(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var nn = null, fl = !1;
  function Yo(e, t, l) {
    for (l = l.child; l !== null; )
      ab(e, t, l), l = l.sibling;
  }
  function ab(e, t, l) {
    if (mt && typeof mt.onCommitFiberUnmount == "function")
      try {
        mt.onCommitFiberUnmount(Mt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        En || Co(l, t), Yo(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        En || Co(l, t);
        var a = nn, s = fl;
        Ea(l.type) && (nn = l.stateNode, fl = !1), Yo(
          e,
          t,
          l
        ), as(l.stateNode), nn = a, fl = s;
        break;
      case 5:
        En || Co(l, t);
      case 6:
        if (a = nn, s = fl, nn = null, Yo(
          e,
          t,
          l
        ), nn = a, fl = s, nn !== null)
          if (fl)
            try {
              (nn.nodeType === 9 ? nn.body : nn.nodeName === "HTML" ? nn.ownerDocument.body : nn).removeChild(l.stateNode);
            } catch (u) {
              Bt(
                l,
                t,
                u
              );
            }
          else
            try {
              nn.removeChild(l.stateNode);
            } catch (u) {
              Bt(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        nn !== null && (fl ? (e = nn, $b(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), fi(e)) : $b(nn, l.stateNode));
        break;
      case 4:
        a = nn, s = fl, nn = l.stateNode.containerInfo, fl = !0, Yo(
          e,
          t,
          l
        ), nn = a, fl = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        pa(2, l, t), En || pa(4, l, t), Yo(
          e,
          t,
          l
        );
        break;
      case 1:
        En || (Co(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Jg(
          l,
          t,
          a
        )), Yo(
          e,
          t,
          l
        );
        break;
      case 21:
        Yo(
          e,
          t,
          l
        );
        break;
      case 22:
        En = (a = En) || l.memoizedState !== null, Yo(
          e,
          t,
          l
        ), En = a;
        break;
      default:
        Yo(
          e,
          t,
          l
        );
    }
  }
  function rb(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        fi(e);
      } catch (l) {
        Bt(t, t.return, l);
      }
    }
  }
  function ib(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        fi(e);
      } catch (l) {
        Bt(t, t.return, l);
      }
  }
  function mE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new nb()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nb()), t;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function vc(e, t) {
    var l = mE(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var s = CE.bind(null, e, a);
        a.then(s, s);
      }
    });
  }
  function dl(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var s = l[a], u = e, g = t, C = g;
        e: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (Ea(C.type)) {
                nn = C.stateNode, fl = !1;
                break e;
              }
              break;
            case 5:
              nn = C.stateNode, fl = !1;
              break e;
            case 3:
            case 4:
              nn = C.stateNode.containerInfo, fl = !0;
              break e;
          }
          C = C.return;
        }
        if (nn === null) throw Error(i(160));
        ab(u, g, s), nn = null, fl = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        sb(t, e), t = t.sibling;
  }
  var io = null;
  function sb(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dl(t, e), hl(e), a & 4 && (pa(3, e, e.return), Qi(3, e), pa(5, e, e.return));
        break;
      case 1:
        dl(t, e), hl(e), a & 512 && (En || l === null || Co(l, l.return)), a & 64 && Go && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var s = io;
        if (dl(t, e), hl(e), a & 512 && (En || l === null || Co(l, l.return)), a & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (a) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[po] || u[Dt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(a), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Yn(u, a, l), u[Dt] = e, on(u), a = u;
                      break e;
                    case "link":
                      var g = sy(
                        "link",
                        "href",
                        s
                      ).get(a + (l.href || ""));
                      if (g) {
                        for (var C = 0; C < g.length; C++)
                          if (u = g[C], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            g.splice(C, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), Yn(u, a, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (g = sy(
                        "meta",
                        "content",
                        s
                      ).get(a + (l.content || ""))) {
                        for (C = 0; C < g.length; C++)
                          if (u = g[C], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            g.splice(C, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), Yn(u, a, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(i(468, a));
                  }
                  u[Dt] = e, on(u), a = u;
                }
                e.stateNode = a;
              } else
                cy(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = iy(
                s,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? cy(
              s,
              e.type,
              e.stateNode
            ) : iy(
              s,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && nd(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        dl(t, e), hl(e), a & 512 && (En || l === null || Co(l, l.return)), l !== null && a & 4 && nd(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (dl(t, e), hl(e), a & 512 && (En || l === null || Co(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            no(s, "");
          } catch (Ue) {
            Bt(e, e.return, Ue);
          }
        }
        a & 4 && e.stateNode != null && (s = e.memoizedProps, nd(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), a & 1024 && (ad = !0);
        break;
      case 6:
        if (dl(t, e), hl(e), a & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (Ue) {
            Bt(e, e.return, Ue);
          }
        }
        break;
      case 3:
        if (jc = null, s = io, io = zc(t.containerInfo), dl(t, e), io = s, hl(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            fi(t.containerInfo);
          } catch (Ue) {
            Bt(e, e.return, Ue);
          }
        ad && (ad = !1, cb(e));
        break;
      case 4:
        a = io, io = zc(
          e.stateNode.containerInfo
        ), dl(t, e), hl(e), io = a;
        break;
      case 12:
        dl(t, e), hl(e);
        break;
      case 31:
        dl(t, e), hl(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, vc(e, a)));
        break;
      case 13:
        dl(t, e), hl(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Sc = Z()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, vc(e, a)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var I = l !== null && l.memoizedState !== null, J = Go, fe = En;
        if (Go = J || s, En = fe || I, dl(t, e), En = fe, Go = J, hl(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || I || Go || En || br(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                I = l = t;
                try {
                  if (u = I.stateNode, s)
                    g = u.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    C = I.stateNode;
                    var me = I.memoizedProps.style, ee = me != null && me.hasOwnProperty("display") ? me.display : null;
                    C.style.display = ee == null || typeof ee == "boolean" ? "" : ("" + ee).trim();
                  }
                } catch (Ue) {
                  Bt(I, I.return, Ue);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                I = t;
                try {
                  I.stateNode.nodeValue = s ? "" : I.memoizedProps;
                } catch (Ue) {
                  Bt(I, I.return, Ue);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                I = t;
                try {
                  var re = I.stateNode;
                  s ? Jb(re, !0) : Jb(I.stateNode, !1);
                } catch (Ue) {
                  Bt(I, I.return, Ue);
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
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, vc(e, l))));
        break;
      case 19:
        dl(t, e), hl(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, vc(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        dl(t, e), hl(e);
    }
  }
  function hl(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (eb(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(i(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = ld(e);
            yc(e, u, s);
            break;
          case 5:
            var g = l.stateNode;
            l.flags & 32 && (no(g, ""), l.flags &= -33);
            var C = ld(e);
            yc(e, C, g);
            break;
          case 3:
          case 4:
            var I = l.stateNode.containerInfo, J = ld(e);
            od(
              e,
              J,
              I
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (fe) {
        Bt(e, e.return, fe);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function cb(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        cb(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function qo(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        lb(e, t.alternate, t), t = t.sibling;
  }
  function br(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          pa(4, t, t.return), br(t);
          break;
        case 1:
          Co(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Jg(
            t,
            t.return,
            l
          ), br(t);
          break;
        case 27:
          as(t.stateNode);
        case 26:
        case 5:
          Co(t, t.return), br(t);
          break;
        case 22:
          t.memoizedState === null && br(t);
          break;
        case 30:
          br(t);
          break;
        default:
          br(t);
      }
      e = e.sibling;
    }
  }
  function Po(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, s = e, u = t, g = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Po(
            s,
            u,
            l
          ), Qi(4, u);
          break;
        case 1:
          if (Po(
            s,
            u,
            l
          ), a = u, s = a.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (J) {
              Bt(a, a.return, J);
            }
          if (a = u, s = a.updateQueue, s !== null) {
            var C = a.stateNode;
            try {
              var I = s.shared.hiddenCallbacks;
              if (I !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < I.length; s++)
                  Up(I[s], C);
            } catch (J) {
              Bt(a, a.return, J);
            }
          }
          l && g & 64 && $g(u), Zi(u, u.return);
          break;
        case 27:
          tb(u);
        case 26:
        case 5:
          Po(
            s,
            u,
            l
          ), l && a === null && g & 4 && Wg(u), Zi(u, u.return);
          break;
        case 12:
          Po(
            s,
            u,
            l
          );
          break;
        case 31:
          Po(
            s,
            u,
            l
          ), l && g & 4 && rb(s, u);
          break;
        case 13:
          Po(
            s,
            u,
            l
          ), l && g & 4 && ib(s, u);
          break;
        case 22:
          u.memoizedState === null && Po(
            s,
            u,
            l
          ), Zi(u, u.return);
          break;
        case 30:
          break;
        default:
          Po(
            s,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function rd(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Li(l));
  }
  function id(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Li(e));
  }
  function so(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ub(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function ub(e, t, l, a) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        so(
          e,
          t,
          l,
          a
        ), s & 2048 && Qi(9, t);
        break;
      case 1:
        so(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        so(
          e,
          t,
          l,
          a
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Li(e)));
        break;
      case 12:
        if (s & 2048) {
          so(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, g = u.id, C = u.onPostCommit;
            typeof C == "function" && C(
              g,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (I) {
            Bt(t, t.return, I);
          }
        } else
          so(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        so(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        so(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, g = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? so(
          e,
          t,
          l,
          a
        ) : $i(e, t) : u._visibility & 2 ? so(
          e,
          t,
          l,
          a
        ) : (u._visibility |= 2, ei(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && rd(g, t);
        break;
      case 24:
        so(
          e,
          t,
          l,
          a
        ), s & 2048 && id(t.alternate, t);
        break;
      default:
        so(
          e,
          t,
          l,
          a
        );
    }
  }
  function ei(e, t, l, a, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, g = t, C = l, I = a, J = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          ei(
            u,
            g,
            C,
            I,
            s
          ), Qi(8, g);
          break;
        case 23:
          break;
        case 22:
          var fe = g.stateNode;
          g.memoizedState !== null ? fe._visibility & 2 ? ei(
            u,
            g,
            C,
            I,
            s
          ) : $i(
            u,
            g
          ) : (fe._visibility |= 2, ei(
            u,
            g,
            C,
            I,
            s
          )), s && J & 2048 && rd(
            g.alternate,
            g
          );
          break;
        case 24:
          ei(
            u,
            g,
            C,
            I,
            s
          ), s && J & 2048 && id(g.alternate, g);
          break;
        default:
          ei(
            u,
            g,
            C,
            I,
            s
          );
      }
      t = t.sibling;
    }
  }
  function $i(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, s = a.flags;
        switch (a.tag) {
          case 22:
            $i(l, a), s & 2048 && rd(
              a.alternate,
              a
            );
            break;
          case 24:
            $i(l, a), s & 2048 && id(a.alternate, a);
            break;
          default:
            $i(l, a);
        }
        t = t.sibling;
      }
  }
  var Ji = 8192;
  function ti(e, t, l) {
    if (e.subtreeFlags & Ji)
      for (e = e.child; e !== null; )
        fb(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function fb(e, t, l) {
    switch (e.tag) {
      case 26:
        ti(
          e,
          t,
          l
        ), e.flags & Ji && e.memoizedState !== null && eC(
          l,
          io,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ti(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = io;
        io = zc(e.stateNode.containerInfo), ti(
          e,
          t,
          l
        ), io = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Ji, Ji = 16777216, ti(
          e,
          t,
          l
        ), Ji = a) : ti(
          e,
          t,
          l
        ));
        break;
      default:
        ti(
          e,
          t,
          l
        );
    }
  }
  function db(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Wi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Dn = a, mb(
            a,
            e
          );
        }
      db(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        hb(e), e = e.sibling;
  }
  function hb(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Wi(e), e.flags & 2048 && pa(9, e, e.return);
        break;
      case 3:
        Wi(e);
        break;
      case 12:
        Wi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, xc(e)) : Wi(e);
        break;
      default:
        Wi(e);
    }
  }
  function xc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Dn = a, mb(
            a,
            e
          );
        }
      db(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          pa(8, t, t.return), xc(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, xc(t));
          break;
        default:
          xc(t);
      }
      e = e.sibling;
    }
  }
  function mb(e, t) {
    for (; Dn !== null; ) {
      var l = Dn;
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
          Li(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Dn = a;
      else
        e: for (l = e; Dn !== null; ) {
          a = Dn;
          var s = a.sibling, u = a.return;
          if (ob(a), a === l) {
            Dn = null;
            break e;
          }
          if (s !== null) {
            s.return = u, Dn = s;
            break e;
          }
          Dn = u;
        }
    }
  }
  var pE = {
    getCacheForType: function(e) {
      var t = Bn(vn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Bn(vn).controller.signal;
    }
  }, gE = typeof WeakMap == "function" ? WeakMap : Map, jt = 0, Ft = null, bt = null, St = 0, Ut = 0, Ml = null, ga = !1, ni = !1, sd = !1, Xo = 0, cn = 0, ba = 0, yr = 0, cd = 0, Al = 0, li = 0, es = null, ml = null, ud = !1, Sc = 0, pb = 0, Ec = 1 / 0, Cc = null, ya = null, An = 0, va = null, oi = null, Fo = 0, fd = 0, dd = null, gb = null, ts = 0, hd = null;
  function Tl() {
    return (jt & 2) !== 0 && St !== 0 ? St & -St : H.T !== null ? vd() : an();
  }
  function bb() {
    if (Al === 0)
      if ((St & 536870912) === 0 || _t) {
        var e = Kt;
        Kt <<= 1, (Kt & 3932160) === 0 && (Kt = 262144), Al = e;
      } else Al = 536870912;
    return e = Rl.current, e !== null && (e.flags |= 32), Al;
  }
  function pl(e, t, l) {
    (e === Ft && (Ut === 2 || Ut === 9) || e.cancelPendingCommit !== null) && (ai(e, 0), xa(
      e,
      St,
      Al,
      !1
    )), It(e, l), ((jt & 2) === 0 || e !== Ft) && (e === Ft && ((jt & 2) === 0 && (yr |= l), cn === 4 && xa(
      e,
      St,
      Al,
      !1
    )), _o(e));
  }
  function yb(e, t, l) {
    if ((jt & 6) !== 0) throw Error(i(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || tn(e, t), s = a ? vE(e, t) : pd(e, t, !0), u = a;
    do {
      if (s === 0) {
        ni && !a && xa(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !bE(l)) {
          s = pd(e, t, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var g = 0;
          else
            g = e.pendingLanes & -536870913, g = g !== 0 ? g : g & 536870912 ? 536870912 : 0;
          if (g !== 0) {
            t = g;
            e: {
              var C = e;
              s = es;
              var I = C.current.memoizedState.isDehydrated;
              if (I && (ai(C, g).flags |= 256), g = pd(
                C,
                g,
                !1
              ), g !== 2) {
                if (sd && !I) {
                  C.errorRecoveryDisabledLanes |= u, yr |= u, s = 4;
                  break e;
                }
                u = ml, ml = s, u !== null && (ml === null ? ml = u : ml.push.apply(
                  ml,
                  u
                ));
              }
              s = g;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          ai(e, 0), xa(e, t, 0, !0);
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
                Al,
                !ga
              );
              break e;
            case 2:
              ml = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((t & 62914560) === t && (s = Sc + 300 - Z(), 10 < s)) {
            if (xa(
              a,
              t,
              Al,
              !ga
            ), $e(a, 0, !0) !== 0) break e;
            Fo = t, a.timeoutHandle = Qb(
              vb.bind(
                null,
                a,
                l,
                ml,
                Cc,
                ud,
                t,
                Al,
                yr,
                li,
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
          vb(
            a,
            l,
            ml,
            Cc,
            ud,
            t,
            Al,
            yr,
            li,
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
    _o(e);
  }
  function vb(e, t, l, a, s, u, g, C, I, J, fe, me, ee, re) {
    if (e.timeoutHandle = -1, me = t.subtreeFlags, me & 8192 || (me & 16785408) === 16785408) {
      me = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: tl
      }, fb(
        t,
        u,
        me
      );
      var Ue = (u & 62914560) === u ? Sc - Z() : (u & 4194048) === u ? pb - Z() : 0;
      if (Ue = tC(
        me,
        Ue
      ), Ue !== null) {
        Fo = u, e.cancelPendingCommit = Ue(
          Mb.bind(
            null,
            e,
            t,
            u,
            l,
            a,
            s,
            g,
            C,
            I,
            fe,
            me,
            null,
            ee,
            re
          )
        ), xa(e, u, g, !J);
        return;
      }
    }
    Mb(
      e,
      t,
      u,
      l,
      a,
      s,
      g,
      C,
      I
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
            if (!Cl(u(), s)) return !1;
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
    t &= ~cd, t &= ~yr, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - ot(s), g = 1 << u;
      a[u] = -1, s &= ~g;
    }
    l !== 0 && fo(e, l, t);
  }
  function _c() {
    return (jt & 6) === 0 ? (ns(0), !1) : !0;
  }
  function md() {
    if (bt !== null) {
      if (Ut === 0)
        var e = bt.return;
      else
        e = bt, Lo = cr = null, Of(e), Qr = null, Ii = 0, e = bt;
      for (; e !== null; )
        Zg(e.alternate, e), e = e.return;
      bt = null;
    }
  }
  function ai(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, VE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Fo = 0, md(), Ft = e, bt = l = Do(e.current, null), St = t, Ut = 0, Ml = null, ga = !1, ni = tn(e, t), sd = !1, li = Al = cd = yr = ba = cn = 0, ml = es = null, ud = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var s = 31 - ot(a), u = 1 << s;
        t |= e[s], a &= ~u;
      }
    return Xo = t, Ps(), l;
  }
  function xb(e, t) {
    ut = null, H.H = Xi, t === Kr || t === Ws ? (t = Lp(), Ut = 3) : t === yf ? (t = Lp(), Ut = 4) : Ut = t === Xf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ml = t, bt === null && (cn = 1, hc(
      e,
      Ul(t, e.current)
    ));
  }
  function Sb() {
    var e = Rl.current;
    return e === null ? !0 : (St & 4194048) === St ? ql === null : (St & 62914560) === St || (St & 536870912) !== 0 ? e === ql : !1;
  }
  function Eb() {
    var e = H.H;
    return H.H = Xi, e === null ? Xi : e;
  }
  function Cb() {
    var e = H.A;
    return H.A = pE, e;
  }
  function Rc() {
    cn = 4, ga || (St & 4194048) !== St && Rl.current !== null || (ni = !0), (ba & 134217727) === 0 && (yr & 134217727) === 0 || Ft === null || xa(
      Ft,
      St,
      Al,
      !1
    );
  }
  function pd(e, t, l) {
    var a = jt;
    jt |= 2;
    var s = Eb(), u = Cb();
    (Ft !== e || St !== t) && (Cc = null, ai(e, t)), t = !1;
    var g = cn;
    e: do
      try {
        if (Ut !== 0 && bt !== null) {
          var C = bt, I = Ml;
          switch (Ut) {
            case 8:
              md(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Rl.current === null && (t = !0);
              var J = Ut;
              if (Ut = 0, Ml = null, ri(e, C, I, J), l && ni) {
                g = 0;
                break e;
              }
              break;
            default:
              J = Ut, Ut = 0, Ml = null, ri(e, C, I, J);
          }
        }
        yE(), g = cn;
        break;
      } catch (fe) {
        xb(e, fe);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Lo = cr = null, jt = a, H.H = s, H.A = u, bt === null && (Ft = null, St = 0, Ps()), g;
  }
  function yE() {
    for (; bt !== null; ) _b(bt);
  }
  function vE(e, t) {
    var l = jt;
    jt |= 2;
    var a = Eb(), s = Cb();
    Ft !== e || St !== t ? (Cc = null, Ec = Z() + 500, ai(e, t)) : ni = tn(
      e,
      t
    );
    e: do
      try {
        if (Ut !== 0 && bt !== null) {
          t = bt;
          var u = Ml;
          t: switch (Ut) {
            case 1:
              Ut = 0, Ml = null, ri(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Dp(u)) {
                Ut = 0, Ml = null, Rb(t);
                break;
              }
              t = function() {
                Ut !== 2 && Ut !== 9 || Ft !== e || (Ut = 7), _o(e);
              }, u.then(t, t);
              break e;
            case 3:
              Ut = 7;
              break e;
            case 4:
              Ut = 5;
              break e;
            case 7:
              Dp(u) ? (Ut = 0, Ml = null, Rb(t)) : (Ut = 0, Ml = null, ri(e, t, u, 7));
              break;
            case 5:
              var g = null;
              switch (bt.tag) {
                case 26:
                  g = bt.memoizedState;
                case 5:
                case 27:
                  var C = bt;
                  if (g ? uy(g) : C.stateNode.complete) {
                    Ut = 0, Ml = null;
                    var I = C.sibling;
                    if (I !== null) bt = I;
                    else {
                      var J = C.return;
                      J !== null ? (bt = J, wc(J)) : bt = null;
                    }
                    break t;
                  }
              }
              Ut = 0, Ml = null, ri(e, t, u, 5);
              break;
            case 6:
              Ut = 0, Ml = null, ri(e, t, u, 6);
              break;
            case 8:
              md(), cn = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        xE();
        break;
      } catch (fe) {
        xb(e, fe);
      }
    while (!0);
    return Lo = cr = null, H.H = a, H.A = s, jt = l, bt !== null ? 0 : (Ft = null, St = 0, Ps(), cn);
  }
  function xE() {
    for (; bt !== null && !lt(); )
      _b(bt);
  }
  function _b(e) {
    var t = Kg(e.alternate, e, Xo);
    e.memoizedProps = e.pendingProps, t === null ? wc(e) : bt = t;
  }
  function Rb(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Gg(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          St
        );
        break;
      case 11:
        t = Gg(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          St
        );
        break;
      case 5:
        Of(t);
      default:
        Zg(l, t), t = bt = Cp(t, Xo), t = Kg(l, t, Xo);
    }
    e.memoizedProps = e.pendingProps, t === null ? wc(e) : bt = t;
  }
  function ri(e, t, l, a) {
    Lo = cr = null, Of(t), Qr = null, Ii = 0;
    var s = t.return;
    try {
      if (sE(
        e,
        s,
        t,
        l,
        St
      )) {
        cn = 1, hc(
          e,
          Ul(l, e.current)
        ), bt = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw bt = s, u;
      cn = 1, hc(
        e,
        Ul(l, e.current)
      ), bt = null;
      return;
    }
    t.flags & 32768 ? (_t || a === 1 ? e = !0 : ni || (St & 536870912) !== 0 ? e = !1 : (ga = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Rl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), wb(t, e)) : wc(t);
  }
  function wc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        wb(
          t,
          ga
        );
        return;
      }
      e = t.return;
      var l = fE(
        t.alternate,
        t,
        Xo
      );
      if (l !== null) {
        bt = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        bt = t;
        return;
      }
      bt = t = e;
    } while (t !== null);
    cn === 0 && (cn = 5);
  }
  function wb(e, t) {
    do {
      var l = dE(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, bt = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        bt = e;
        return;
      }
      bt = e = l;
    } while (e !== null);
    cn = 6, bt = null;
  }
  function Mb(e, t, l, a, s, u, g, C, I) {
    e.cancelPendingCommit = null;
    do
      Mc();
    while (An !== 0);
    if ((jt & 6) !== 0) throw Error(i(327));
    if (t !== null) {
      if (t === e.current) throw Error(i(177));
      if (u = t.lanes | t.childLanes, u |= nf, Ht(
        e,
        l,
        u,
        g,
        C,
        I
      ), e === Ft && (bt = Ft = null, St = 0), oi = t, va = e, Fo = l, fd = u, dd = s, gb = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, _E(Ie, function() {
        return Nb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = H.T, H.T = null, s = B.p, B.p = 2, g = jt, jt |= 4;
        try {
          hE(e, t, l);
        } finally {
          jt = g, B.p = s, H.T = a;
        }
      }
      An = 1, Ab(), Tb(), Ob();
    }
  }
  function Ab() {
    if (An === 1) {
      An = 0;
      var e = va, t = oi, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = H.T, H.T = null;
        var a = B.p;
        B.p = 2;
        var s = jt;
        jt |= 4;
        try {
          sb(t, e);
          var u = Md, g = mp(e.containerInfo), C = u.focusedElem, I = u.selectionRange;
          if (g !== C && C && C.ownerDocument && hp(
            C.ownerDocument.documentElement,
            C
          )) {
            if (I !== null && $u(C)) {
              var J = I.start, fe = I.end;
              if (fe === void 0 && (fe = J), "selectionStart" in C)
                C.selectionStart = J, C.selectionEnd = Math.min(
                  fe,
                  C.value.length
                );
              else {
                var me = C.ownerDocument || document, ee = me && me.defaultView || window;
                if (ee.getSelection) {
                  var re = ee.getSelection(), Ue = C.textContent.length, Qe = Math.min(I.start, Ue), Xt = I.end === void 0 ? Qe : Math.min(I.end, Ue);
                  !re.extend && Qe > Xt && (g = Xt, Xt = Qe, Qe = g);
                  var F = dp(
                    C,
                    Qe
                  ), Y = dp(
                    C,
                    Xt
                  );
                  if (F && Y && (re.rangeCount !== 1 || re.anchorNode !== F.node || re.anchorOffset !== F.offset || re.focusNode !== Y.node || re.focusOffset !== Y.offset)) {
                    var $ = me.createRange();
                    $.setStart(F.node, F.offset), re.removeAllRanges(), Qe > Xt ? (re.addRange($), re.extend(Y.node, Y.offset)) : ($.setEnd(Y.node, Y.offset), re.addRange($));
                  }
                }
              }
            }
            for (me = [], re = C; re = re.parentNode; )
              re.nodeType === 1 && me.push({
                element: re,
                left: re.scrollLeft,
                top: re.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < me.length; C++) {
              var he = me[C];
              he.element.scrollLeft = he.left, he.element.scrollTop = he.top;
            }
          }
          Hc = !!wd, Md = wd = null;
        } finally {
          jt = s, B.p = a, H.T = l;
        }
      }
      e.current = t, An = 2;
    }
  }
  function Tb() {
    if (An === 2) {
      An = 0;
      var e = va, t = oi, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = H.T, H.T = null;
        var a = B.p;
        B.p = 2;
        var s = jt;
        jt |= 4;
        try {
          lb(e, t.alternate, t);
        } finally {
          jt = s, B.p = a, H.T = l;
        }
      }
      An = 3;
    }
  }
  function Ob() {
    if (An === 4 || An === 3) {
      An = 0, Ce();
      var e = va, t = oi, l = Fo, a = gb;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? An = 5 : (An = 0, oi = va = null, kb(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (ya = null), al(l), t = t.stateNode, mt && typeof mt.onCommitFiberRoot == "function")
        try {
          mt.onCommitFiberRoot(
            Mt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = H.T, s = B.p, B.p = 2, H.T = null;
        try {
          for (var u = e.onRecoverableError, g = 0; g < a.length; g++) {
            var C = a[g];
            u(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          H.T = t, B.p = s;
        }
      }
      (Fo & 3) !== 0 && Mc(), _o(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === hd ? ts++ : (ts = 0, hd = e) : ts = 0, ns(0);
    }
  }
  function kb(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Li(t)));
  }
  function Mc() {
    return Ab(), Tb(), Ob(), Nb();
  }
  function Nb() {
    if (An !== 5) return !1;
    var e = va, t = fd;
    fd = 0;
    var l = al(Fo), a = H.T, s = B.p;
    try {
      B.p = 32 > l ? 32 : l, H.T = null, l = dd, dd = null;
      var u = va, g = Fo;
      if (An = 0, oi = va = null, Fo = 0, (jt & 6) !== 0) throw Error(i(331));
      var C = jt;
      if (jt |= 4, hb(u.current), ub(
        u,
        u.current,
        g,
        l
      ), jt = C, ns(0, !1), mt && typeof mt.onPostCommitFiberRoot == "function")
        try {
          mt.onPostCommitFiberRoot(Mt, u);
        } catch {
        }
      return !0;
    } finally {
      B.p = s, H.T = a, kb(e, t);
    }
  }
  function zb(e, t, l) {
    t = Ul(l, t), t = Pf(e.stateNode, t, 2), e = da(e, t, 2), e !== null && (It(e, 2), _o(e));
  }
  function Bt(e, t, l) {
    if (e.tag === 3)
      zb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          zb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ya === null || !ya.has(a))) {
            e = Ul(l, e), l = Dg(2), a = da(t, l, 2), a !== null && (jg(
              l,
              a,
              t,
              e
            ), It(a, 2), _o(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function gd(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new gE();
      var s = /* @__PURE__ */ new Set();
      a.set(t, s);
    } else
      s = a.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), a.set(t, s));
    s.has(l) || (sd = !0, s.add(l), e = SE.bind(null, e, t, l), t.then(e, e));
  }
  function SE(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ft === e && (St & l) === l && (cn === 4 || cn === 3 && (St & 62914560) === St && 300 > Z() - Sc ? (jt & 2) === 0 && ai(e, 0) : cd |= l, li === St && (li = 0)), _o(e);
  }
  function Db(e, t) {
    t === 0 && (t = Mn()), e = rr(e, t), e !== null && (It(e, t), _o(e));
  }
  function EE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Db(e, l);
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
    a !== null && a.delete(t), Db(e, l);
  }
  function _E(e, t) {
    return et(e, t);
  }
  var Ac = null, ii = null, bd = !1, Tc = !1, yd = !1, Sa = 0;
  function _o(e) {
    e !== ii && e.next === null && (ii === null ? Ac = ii = e : ii = ii.next = e), Tc = !0, bd || (bd = !0, wE());
  }
  function ns(e, t) {
    if (!yd && Tc) {
      yd = !0;
      do
        for (var l = !1, a = Ac; a !== null; ) {
          if (e !== 0) {
            var s = a.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var g = a.suspendedLanes, C = a.pingedLanes;
              u = (1 << 31 - ot(42 | e) + 1) - 1, u &= s & ~(g & ~C), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Ib(a, u));
          } else
            u = St, u = $e(
              a,
              a === Ft ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || tn(a, u) || (l = !0, Ib(a, u));
          a = a.next;
        }
      while (l);
      yd = !1;
    }
  }
  function RE() {
    jb();
  }
  function jb() {
    Tc = bd = !1;
    var e = 0;
    Sa !== 0 && LE() && (e = Sa);
    for (var t = Z(), l = null, a = Ac; a !== null; ) {
      var s = a.next, u = Lb(a, t);
      u === 0 ? (a.next = null, l === null ? Ac = s : l.next = s, s === null && (ii = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (Tc = !0)), a = s;
    }
    An !== 0 && An !== 5 || ns(e), Sa !== 0 && (Sa = 0);
  }
  function Lb(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var g = 31 - ot(u), C = 1 << g, I = s[g];
      I === -1 ? ((C & l) === 0 || (C & a) !== 0) && (s[g] = wn(C, t)) : I <= t && (e.expiredLanes |= C), u &= ~C;
    }
    if (t = Ft, l = St, l = $e(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (Ut === 2 || Ut === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && st(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || tn(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && st(a), al(l)) {
        case 2:
        case 8:
          l = Ee;
          break;
        case 32:
          l = Ie;
          break;
        case 268435456:
          l = wt;
          break;
        default:
          l = Ie;
      }
      return a = Vb.bind(null, e), l = et(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && st(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Vb(e, t) {
    if (An !== 0 && An !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Mc() && e.callbackNode !== l)
      return null;
    var a = St;
    return a = $e(
      e,
      e === Ft ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (yb(e, a, t), Lb(e, Z()), e.callbackNode != null && e.callbackNode === l ? Vb.bind(null, e) : null);
  }
  function Ib(e, t) {
    if (Mc()) return null;
    yb(e, t, !0);
  }
  function wE() {
    IE(function() {
      (jt & 6) !== 0 ? et(
        Te,
        RE
      ) : jb();
    });
  }
  function vd() {
    if (Sa === 0) {
      var e = Xr;
      e === 0 && (e = Rn, Rn <<= 1, (Rn & 261888) === 0 && (Rn = 256)), Sa = e;
    }
    return Sa;
  }
  function Hb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : yo("" + e);
  }
  function Ub(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function ME(e, t, l, a, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = Hb(
        (s[At] || null).action
      ), g = a.submitter;
      g && (t = (t = g[At] || null) ? Hb(t.formAction) : g.getAttribute("formAction"), t !== null && (u = t, g = null));
      var C = new pe(
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
                if (Sa !== 0) {
                  var I = g ? Ub(s, g) : new FormData(s);
                  Hf(
                    l,
                    {
                      pending: !0,
                      data: I,
                      method: s.method,
                      action: u
                    },
                    null,
                    I
                  );
                }
              } else
                typeof u == "function" && (C.preventDefault(), I = g ? Ub(s, g) : new FormData(s), Hf(
                  l,
                  {
                    pending: !0,
                    data: I,
                    method: s.method,
                    action: u
                  },
                  u,
                  I
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var xd = 0; xd < tf.length; xd++) {
    var Sd = tf[xd], AE = Sd.toLowerCase(), TE = Sd[0].toUpperCase() + Sd.slice(1);
    ro(
      AE,
      "on" + TE
    );
  }
  ro(bp, "onAnimationEnd"), ro(yp, "onAnimationIteration"), ro(vp, "onAnimationStart"), ro("dblclick", "onDoubleClick"), ro("focusin", "onFocus"), ro("focusout", "onBlur"), ro(PS, "onTransitionRun"), ro(XS, "onTransitionStart"), ro(FS, "onTransitionCancel"), ro(xp, "onTransitionEnd"), ct("onMouseEnter", ["mouseout", "mouseover"]), ct("onMouseLeave", ["mouseout", "mouseover"]), ct("onPointerEnter", ["pointerout", "pointerover"]), ct("onPointerLeave", ["pointerout", "pointerover"]), Sl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Sl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Sl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Sl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Sl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Sl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ls = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), OE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ls)
  );
  function Bb(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], s = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var g = a.length - 1; 0 <= g; g--) {
            var C = a[g], I = C.instance, J = C.currentTarget;
            if (C = C.listener, I !== u && s.isPropagationStopped())
              break e;
            u = C, s.currentTarget = J;
            try {
              u(s);
            } catch (fe) {
              qs(fe);
            }
            s.currentTarget = null, u = I;
          }
        else
          for (g = 0; g < a.length; g++) {
            if (C = a[g], I = C.instance, J = C.currentTarget, C = C.listener, I !== u && s.isPropagationStopped())
              break e;
            u = C, s.currentTarget = J;
            try {
              u(s);
            } catch (fe) {
              qs(fe);
            }
            s.currentTarget = null, u = I;
          }
      }
    }
  }
  function yt(e, t) {
    var l = t[rl];
    l === void 0 && (l = t[rl] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (Gb(t, e, 2, !1), l.add(a));
  }
  function Ed(e, t, l) {
    var a = 0;
    t && (a |= 4), Gb(
      l,
      e,
      a,
      t
    );
  }
  var Oc = "_reactListening" + Math.random().toString(36).slice(2);
  function Cd(e) {
    if (!e[Oc]) {
      e[Oc] = !0, bn.forEach(function(l) {
        l !== "selectionchange" && (OE.has(l) || Ed(l, !1, e), Ed(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Oc] || (t[Oc] = !0, Ed("selectionchange", !1, t));
    }
  }
  function Gb(e, t, l, a) {
    switch (by(t)) {
      case 2:
        var s = oC;
        break;
      case 8:
        s = aC;
        break;
      default:
        s = Id;
    }
    l = s.bind(
      null,
      t,
      l,
      e
    ), s = void 0, !Ct || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), a ? s !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, l, !0) : s !== void 0 ? e.addEventListener(t, l, {
      passive: s
    }) : e.addEventListener(t, l, !1);
  }
  function _d(e, t, l, a, s) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var g = a.tag;
        if (g === 3 || g === 4) {
          var C = a.stateNode.containerInfo;
          if (C === s) break;
          if (g === 4)
            for (g = a.return; g !== null; ) {
              var I = g.tag;
              if ((I === 3 || I === 4) && g.stateNode.containerInfo === s)
                return;
              g = g.return;
            }
          for (; C !== null; ) {
            if (g = xl(C), g === null) return;
            if (I = g.tag, I === 5 || I === 6 || I === 26 || I === 27) {
              a = u = g;
              continue e;
            }
            C = C.parentNode;
          }
        }
        a = a.return;
      }
    Nn(function() {
      var J = u, fe = nr(l), me = [];
      e: {
        var ee = Sp.get(e);
        if (ee !== void 0) {
          var re = pe, Ue = e;
          switch (e) {
            case "keypress":
              if (V(l) === 0) break e;
            case "keydown":
            case "keyup":
              re = CS;
              break;
            case "focusin":
              Ue = "focus", re = cl;
              break;
            case "focusout":
              Ue = "blur", re = cl;
              break;
            case "beforeblur":
            case "afterblur":
              re = cl;
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
              re = yn;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              re = aa;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              re = wS;
              break;
            case bp:
            case yp:
            case vp:
              re = oo;
              break;
            case xp:
              re = AS;
              break;
            case "scroll":
            case "scrollend":
              re = Ne;
              break;
            case "wheel":
              re = OS;
              break;
            case "copy":
            case "cut":
            case "paste":
              re = nl;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              re = Jm;
              break;
            case "toggle":
            case "beforetoggle":
              re = NS;
          }
          var Qe = (t & 4) !== 0, Xt = !Qe && (e === "scroll" || e === "scrollend"), F = Qe ? ee !== null ? ee + "Capture" : null : ee;
          Qe = [];
          for (var Y = J, $; Y !== null; ) {
            var he = Y;
            if ($ = he.stateNode, he = he.tag, he !== 5 && he !== 26 && he !== 27 || $ === null || F === null || (he = _e(Y, F), he != null && Qe.push(
              os(Y, he, $)
            )), Xt) break;
            Y = Y.return;
          }
          0 < Qe.length && (ee = new re(
            ee,
            Ue,
            null,
            l,
            fe
          ), me.push({ event: ee, listeners: Qe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (ee = e === "mouseover" || e === "pointerover", re = e === "mouseout" || e === "pointerout", ee && l !== tr && (Ue = l.relatedTarget || l.fromElement) && (xl(Ue) || Ue[Ye]))
            break e;
          if ((re || ee) && (ee = fe.window === fe ? fe : (ee = fe.ownerDocument) ? ee.defaultView || ee.parentWindow : window, re ? (Ue = l.relatedTarget || l.toElement, re = J, Ue = Ue ? xl(Ue) : null, Ue !== null && (Xt = f(Ue), Qe = Ue.tag, Ue !== Xt || Qe !== 5 && Qe !== 27 && Qe !== 6) && (Ue = null)) : (re = null, Ue = J), re !== Ue)) {
            if (Qe = yn, he = "onMouseLeave", F = "onMouseEnter", Y = "mouse", (e === "pointerout" || e === "pointerover") && (Qe = Jm, he = "onPointerLeave", F = "onPointerEnter", Y = "pointer"), Xt = re == null ? ee : $n(re), $ = Ue == null ? ee : $n(Ue), ee = new Qe(
              he,
              Y + "leave",
              re,
              l,
              fe
            ), ee.target = Xt, ee.relatedTarget = $, he = null, xl(fe) === J && (Qe = new Qe(
              F,
              Y + "enter",
              Ue,
              l,
              fe
            ), Qe.target = $, Qe.relatedTarget = Xt, he = Qe), Xt = he, re && Ue)
              t: {
                for (Qe = kE, F = re, Y = Ue, $ = 0, he = F; he; he = Qe(he))
                  $++;
                he = 0;
                for (var Pe = Y; Pe; Pe = Qe(Pe))
                  he++;
                for (; 0 < $ - he; )
                  F = Qe(F), $--;
                for (; 0 < he - $; )
                  Y = Qe(Y), he--;
                for (; $--; ) {
                  if (F === Y || Y !== null && F === Y.alternate) {
                    Qe = F;
                    break t;
                  }
                  F = Qe(F), Y = Qe(Y);
                }
                Qe = null;
              }
            else Qe = null;
            re !== null && Yb(
              me,
              ee,
              re,
              Qe,
              !1
            ), Ue !== null && Xt !== null && Yb(
              me,
              Xt,
              Ue,
              Qe,
              !0
            );
          }
        }
        e: {
          if (ee = J ? $n(J) : window, re = ee.nodeName && ee.nodeName.toLowerCase(), re === "select" || re === "input" && ee.type === "file")
            var Ot = rp;
          else if (op(ee))
            if (ip)
              Ot = GS;
            else {
              Ot = US;
              var Be = HS;
            }
          else
            re = ee.nodeName, !re || re.toLowerCase() !== "input" || ee.type !== "checkbox" && ee.type !== "radio" ? J && Vl(J.elementType) && (Ot = rp) : Ot = BS;
          if (Ot && (Ot = Ot(e, J))) {
            ap(
              me,
              Ot,
              l,
              fe
            );
            break e;
          }
          Be && Be(e, ee, J), e === "focusout" && J && ee.type === "number" && J.memoizedProps.value != null && la(ee, "number", ee.value);
        }
        switch (Be = J ? $n(J) : window, e) {
          case "focusin":
            (op(Be) || Be.contentEditable === "true") && (Ir = Be, Ju = J, zi = null);
            break;
          case "focusout":
            zi = Ju = Ir = null;
            break;
          case "mousedown":
            Wu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Wu = !1, pp(me, l, fe);
            break;
          case "selectionchange":
            if (qS) break;
          case "keydown":
          case "keyup":
            pp(me, l, fe);
        }
        var dt;
        if (Ku)
          e: {
            switch (e) {
              case "compositionstart":
                var Et = "onCompositionStart";
                break e;
              case "compositionend":
                Et = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Et = "onCompositionUpdate";
                break e;
            }
            Et = void 0;
          }
        else
          Vr ? np(e, l) && (Et = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Et = "onCompositionStart");
        Et && (Wm && l.locale !== "ko" && (Vr || Et !== "onCompositionStart" ? Et === "onCompositionEnd" && Vr && (dt = k()) : (Lt = fe, E = "value" in Lt ? Lt.value : Lt.textContent, Vr = !0)), Be = kc(J, Et), 0 < Be.length && (Et = new lr(
          Et,
          e,
          null,
          l,
          fe
        ), me.push({ event: Et, listeners: Be }), dt ? Et.data = dt : (dt = lp(l), dt !== null && (Et.data = dt)))), (dt = DS ? jS(e, l) : LS(e, l)) && (Et = kc(J, "onBeforeInput"), 0 < Et.length && (Be = new lr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          fe
        ), me.push({
          event: Be,
          listeners: Et
        }), Be.data = dt)), ME(
          me,
          e,
          J,
          l,
          fe
        );
      }
      Bb(me, t);
    });
  }
  function os(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function kc(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = _e(e, l), s != null && a.unshift(
        os(e, s, u)
      ), s = _e(e, t), s != null && a.push(
        os(e, s, u)
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
  function Yb(e, t, l, a, s) {
    for (var u = t._reactName, g = []; l !== null && l !== a; ) {
      var C = l, I = C.alternate, J = C.stateNode;
      if (C = C.tag, I !== null && I === a) break;
      C !== 5 && C !== 26 && C !== 27 || J === null || (I = J, s ? (J = _e(l, u), J != null && g.unshift(
        os(l, J, I)
      )) : s || (J = _e(l, u), J != null && g.push(
        os(l, J, I)
      ))), l = l.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var NE = /\r\n?/g, zE = /\u0000|\uFFFD/g;
  function qb(e) {
    return (typeof e == "string" ? e : "" + e).replace(NE, `
`).replace(zE, "");
  }
  function Pb(e, t) {
    return t = qb(t), qb(e) === t;
  }
  function Pt(e, t, l, a, s, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || no(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && no(e, "" + a);
        break;
      case "className":
        go(e, "class", a);
        break;
      case "tabIndex":
        go(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        go(e, l, a);
        break;
      case "style":
        bo(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          go(e, "data", a);
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
        a = yo("" + a), e.setAttribute(l, a);
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
          typeof u == "function" && (l === "formAction" ? (t !== "input" && Pt(e, t, "name", s.name, s, null), Pt(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Pt(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Pt(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Pt(e, t, "encType", s.encType, s, null), Pt(e, t, "method", s.method, s, null), Pt(e, t, "target", s.target, s, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = yo("" + a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = tl);
        break;
      case "onScroll":
        a != null && yt("scroll", e);
        break;
      case "onScrollEnd":
        a != null && yt("scrollend", e);
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
        l = yo("" + a), e.setAttributeNS(
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
        yt("beforetoggle", e), yt("toggle", e), to(e, "popover", a);
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
        to(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Wa.get(l) || l, to(e, l, a));
    }
  }
  function Rd(e, t, l, a, s, u) {
    switch (l) {
      case "style":
        bo(e, a, u);
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
        typeof a == "string" ? no(e, a) : (typeof a == "number" || typeof a == "bigint") && no(e, "" + a);
        break;
      case "onScroll":
        a != null && yt("scroll", e);
        break;
      case "onScrollEnd":
        a != null && yt("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = tl);
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
        if (!Vn.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[At] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof a == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, s);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : to(e, l, a);
          }
    }
  }
  function Yn(e, t, l) {
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
        yt("error", e), yt("load", e);
        var a = !1, s = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var g = l[u];
            if (g != null)
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
                  Pt(e, t, u, g, l, null);
              }
          }
        s && Pt(e, t, "srcSet", l.srcSet, l, null), a && Pt(e, t, "src", l.src, l, null);
        return;
      case "input":
        yt("invalid", e);
        var C = u = g = s = null, I = null, J = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var fe = l[a];
            if (fe != null)
              switch (a) {
                case "name":
                  s = fe;
                  break;
                case "type":
                  g = fe;
                  break;
                case "checked":
                  I = fe;
                  break;
                case "defaultChecked":
                  J = fe;
                  break;
                case "value":
                  u = fe;
                  break;
                case "defaultValue":
                  C = fe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (fe != null)
                    throw Error(i(137, t));
                  break;
                default:
                  Pt(e, t, a, fe, l, null);
              }
          }
        $a(
          e,
          u,
          C,
          I,
          J,
          g,
          s,
          !1
        );
        return;
      case "select":
        yt("invalid", e), a = g = u = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (C = l[s], C != null))
            switch (s) {
              case "value":
                u = C;
                break;
              case "defaultValue":
                g = C;
                break;
              case "multiple":
                a = C;
              default:
                Pt(e, t, s, C, l, null);
            }
        t = u, l = g, e.multiple = !!a, t != null ? Hn(e, !!a, t, !1) : l != null && Hn(e, !!a, l, !0);
        return;
      case "textarea":
        yt("invalid", e), u = s = a = null;
        for (g in l)
          if (l.hasOwnProperty(g) && (C = l[g], C != null))
            switch (g) {
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
                Pt(e, t, g, C, l, null);
            }
        zo(e, a, s, u);
        return;
      case "option":
        for (I in l)
          l.hasOwnProperty(I) && (a = l[I], a != null) && (I === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Pt(e, t, I, a, l, null));
        return;
      case "dialog":
        yt("beforetoggle", e), yt("toggle", e), yt("cancel", e), yt("close", e);
        break;
      case "iframe":
      case "object":
        yt("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ls.length; a++)
          yt(ls[a], e);
        break;
      case "image":
        yt("error", e), yt("load", e);
        break;
      case "details":
        yt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        yt("error", e), yt("load", e);
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
                Pt(e, t, J, a, l, null);
            }
        return;
      default:
        if (Vl(t)) {
          for (fe in l)
            l.hasOwnProperty(fe) && (a = l[fe], a !== void 0 && Rd(
              e,
              t,
              fe,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (C in l)
      l.hasOwnProperty(C) && (a = l[C], a != null && Pt(e, t, C, a, l, null));
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
        var s = null, u = null, g = null, C = null, I = null, J = null, fe = null;
        for (re in l) {
          var me = l[re];
          if (l.hasOwnProperty(re) && me != null)
            switch (re) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                I = me;
              default:
                a.hasOwnProperty(re) || Pt(e, t, re, null, a, me);
            }
        }
        for (var ee in a) {
          var re = a[ee];
          if (me = l[ee], a.hasOwnProperty(ee) && (re != null || me != null))
            switch (ee) {
              case "type":
                u = re;
                break;
              case "name":
                s = re;
                break;
              case "checked":
                J = re;
                break;
              case "defaultChecked":
                fe = re;
                break;
              case "value":
                g = re;
                break;
              case "defaultValue":
                C = re;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(i(137, t));
                break;
              default:
                re !== me && Pt(
                  e,
                  t,
                  ee,
                  re,
                  a,
                  me
                );
            }
        }
        Za(
          e,
          g,
          C,
          I,
          J,
          fe,
          u,
          s
        );
        return;
      case "select":
        re = g = C = ee = null;
        for (u in l)
          if (I = l[u], l.hasOwnProperty(u) && I != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                re = I;
              default:
                a.hasOwnProperty(u) || Pt(
                  e,
                  t,
                  u,
                  null,
                  a,
                  I
                );
            }
        for (s in a)
          if (u = a[s], I = l[s], a.hasOwnProperty(s) && (u != null || I != null))
            switch (s) {
              case "value":
                ee = u;
                break;
              case "defaultValue":
                C = u;
                break;
              case "multiple":
                g = u;
              default:
                u !== I && Pt(
                  e,
                  t,
                  s,
                  u,
                  a,
                  I
                );
            }
        t = C, l = g, a = re, ee != null ? Hn(e, !!l, ee, !1) : !!a != !!l && (t != null ? Hn(e, !!l, t, !0) : Hn(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        re = ee = null;
        for (C in l)
          if (s = l[C], l.hasOwnProperty(C) && s != null && !a.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Pt(e, t, C, null, a, s);
            }
        for (g in a)
          if (s = a[g], u = l[g], a.hasOwnProperty(g) && (s != null || u != null))
            switch (g) {
              case "value":
                ee = s;
                break;
              case "defaultValue":
                re = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(i(91));
                break;
              default:
                s !== u && Pt(e, t, g, s, a, u);
            }
        Ja(e, ee, re);
        return;
      case "option":
        for (var Ue in l)
          ee = l[Ue], l.hasOwnProperty(Ue) && ee != null && !a.hasOwnProperty(Ue) && (Ue === "selected" ? e.selected = !1 : Pt(
            e,
            t,
            Ue,
            null,
            a,
            ee
          ));
        for (I in a)
          ee = a[I], re = l[I], a.hasOwnProperty(I) && ee !== re && (ee != null || re != null) && (I === "selected" ? e.selected = ee && typeof ee != "function" && typeof ee != "symbol" : Pt(
            e,
            t,
            I,
            ee,
            a,
            re
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
        for (var Qe in l)
          ee = l[Qe], l.hasOwnProperty(Qe) && ee != null && !a.hasOwnProperty(Qe) && Pt(e, t, Qe, null, a, ee);
        for (J in a)
          if (ee = a[J], re = l[J], a.hasOwnProperty(J) && ee !== re && (ee != null || re != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ee != null)
                  throw Error(i(137, t));
                break;
              default:
                Pt(
                  e,
                  t,
                  J,
                  ee,
                  a,
                  re
                );
            }
        return;
      default:
        if (Vl(t)) {
          for (var Xt in l)
            ee = l[Xt], l.hasOwnProperty(Xt) && ee !== void 0 && !a.hasOwnProperty(Xt) && Rd(
              e,
              t,
              Xt,
              void 0,
              a,
              ee
            );
          for (fe in a)
            ee = a[fe], re = l[fe], !a.hasOwnProperty(fe) || ee === re || ee === void 0 && re === void 0 || Rd(
              e,
              t,
              fe,
              ee,
              a,
              re
            );
          return;
        }
    }
    for (var F in l)
      ee = l[F], l.hasOwnProperty(F) && ee != null && !a.hasOwnProperty(F) && Pt(e, t, F, null, a, ee);
    for (me in a)
      ee = a[me], re = l[me], !a.hasOwnProperty(me) || ee === re || ee == null && re == null || Pt(e, t, me, ee, a, re);
  }
  function Xb(e) {
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
        var s = l[a], u = s.transferSize, g = s.initiatorType, C = s.duration;
        if (u && C && Xb(g)) {
          for (g = 0, C = s.responseEnd, a += 1; a < l.length; a++) {
            var I = l[a], J = I.startTime;
            if (J > C) break;
            var fe = I.transferSize, me = I.initiatorType;
            fe && Xb(me) && (I = I.responseEnd, g += fe * (I < C ? 1 : (C - J) / (I - J)));
          }
          if (--a, t += 8 * (u + g) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var wd = null, Md = null;
  function Nc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Fb(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kb(e, t) {
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
  function Ad(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Td = null;
  function LE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Td ? !1 : (Td = e, !0) : (Td = null, !1);
  }
  var Qb = typeof setTimeout == "function" ? setTimeout : void 0, VE = typeof clearTimeout == "function" ? clearTimeout : void 0, Zb = typeof Promise == "function" ? Promise : void 0, IE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zb < "u" ? function(e) {
    return Zb.resolve(null).then(e).catch(HE);
  } : Qb;
  function HE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ea(e) {
    return e === "head";
  }
  function $b(e, t) {
    var l = t, a = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(s), fi(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          as(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, as(l);
          for (var u = l.firstChild; u; ) {
            var g = u.nextSibling, C = u.nodeName;
            u[po] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = g;
          }
        } else
          l === "body" && as(e.ownerDocument.body);
      l = s;
    } while (l);
    fi(t);
  }
  function Jb(e, t) {
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
  function Od(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Od(l), Ka(l);
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
        if (!e[po])
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
      if (e = Pl(e.nextSibling), e === null) break;
    }
    return null;
  }
  function BE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Pl(e.nextSibling), e === null)) return null;
    return e;
  }
  function Wb(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Pl(e.nextSibling), e === null)) return null;
    return e;
  }
  function kd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Nd(e) {
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
  function Pl(e) {
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
  var zd = null;
  function ey(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Pl(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function ty(e) {
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
  function ny(e, t, l) {
    switch (t = Nc(l), e) {
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
  function as(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ka(e);
  }
  var Xl = /* @__PURE__ */ new Map(), ly = /* @__PURE__ */ new Set();
  function zc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ko = B.d;
  B.d = {
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
    var e = Ko.f(), t = _c();
    return e || t;
  }
  function qE(e) {
    var t = Wl(e);
    t !== null && t.tag === 5 && t.type === "form" ? xg(t) : Ko.r(e);
  }
  var si = typeof document > "u" ? null : document;
  function oy(e, t, l) {
    var a = si;
    if (a && typeof t == "string" && t) {
      var s = kn(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), ly.has(s) || (ly.add(s), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(s) === null && (t = a.createElement("link"), Yn(t, "link", e), on(t), a.head.appendChild(t)));
    }
  }
  function PE(e) {
    Ko.D(e), oy("dns-prefetch", e, null);
  }
  function XE(e, t) {
    Ko.C(e, t), oy("preconnect", e, t);
  }
  function FE(e, t, l) {
    Ko.L(e, t, l);
    var a = si;
    if (a && e && t) {
      var s = 'link[rel="preload"][as="' + kn(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + kn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + kn(
        l.imageSizes
      ) + '"]')) : s += '[href="' + kn(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = ci(e);
          break;
        case "script":
          u = ui(e);
      }
      Xl.has(u) || (e = x(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Xl.set(u, e), a.querySelector(s) !== null || t === "style" && a.querySelector(rs(u)) || t === "script" && a.querySelector(is(u)) || (t = a.createElement("link"), Yn(t, "link", e), on(t), a.head.appendChild(t)));
    }
  }
  function KE(e, t) {
    Ko.m(e, t);
    var l = si;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + kn(a) + '"][href="' + kn(e) + '"]', u = s;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ui(e);
      }
      if (!Xl.has(u) && (e = x({ rel: "modulepreload", href: e }, t), Xl.set(u, e), l.querySelector(s) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(is(u)))
              return;
        }
        a = l.createElement("link"), Yn(a, "link", e), on(a), l.head.appendChild(a);
      }
    }
  }
  function QE(e, t, l) {
    Ko.S(e, t, l);
    var a = si;
    if (a && e) {
      var s = Jn(a).hoistableStyles, u = ci(e);
      t = t || "default";
      var g = s.get(u);
      if (!g) {
        var C = { loading: 0, preload: null };
        if (g = a.querySelector(
          rs(u)
        ))
          C.loading = 5;
        else {
          e = x(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Xl.get(u)) && Dd(e, l);
          var I = g = a.createElement("link");
          on(I), Yn(I, "link", e), I._p = new Promise(function(J, fe) {
            I.onload = J, I.onerror = fe;
          }), I.addEventListener("load", function() {
            C.loading |= 1;
          }), I.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Dc(g, t, a);
        }
        g = {
          type: "stylesheet",
          instance: g,
          count: 1,
          state: C
        }, s.set(u, g);
      }
    }
  }
  function ZE(e, t) {
    Ko.X(e, t);
    var l = si;
    if (l && e) {
      var a = Jn(l).hoistableScripts, s = ui(e), u = a.get(s);
      u || (u = l.querySelector(is(s)), u || (e = x({ src: e, async: !0 }, t), (t = Xl.get(s)) && jd(e, t), u = l.createElement("script"), on(u), Yn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function $E(e, t) {
    Ko.M(e, t);
    var l = si;
    if (l && e) {
      var a = Jn(l).hoistableScripts, s = ui(e), u = a.get(s);
      u || (u = l.querySelector(is(s)), u || (e = x({ src: e, async: !0, type: "module" }, t), (t = Xl.get(s)) && jd(e, t), u = l.createElement("script"), on(u), Yn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function ay(e, t, l, a) {
    var s = (s = we.current) ? zc(s) : null;
    if (!s) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = ci(l.href), l = Jn(
          s
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = ci(l.href);
          var u = Jn(
            s
          ).hoistableStyles, g = u.get(e);
          if (g || (s = s.ownerDocument || s, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, g), (u = s.querySelector(
            rs(e)
          )) && !u._p && (g.instance = u, g.state.loading = 5), Xl.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Xl.set(e, l), u || JE(
            s,
            e,
            l,
            g.state
          ))), t && a === null)
            throw Error(i(528, ""));
          return g;
        }
        if (t && a !== null)
          throw Error(i(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ui(l), l = Jn(
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
  function ci(e) {
    return 'href="' + kn(e) + '"';
  }
  function rs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function ry(e) {
    return x({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function JE(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Yn(t, "link", l), on(t), e.head.appendChild(t));
  }
  function ui(e) {
    return '[src="' + kn(e) + '"]';
  }
  function is(e) {
    return "script[async]" + e;
  }
  function iy(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + kn(l.href) + '"]'
          );
          if (a)
            return t.instance = a, on(a), a;
          var s = x({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), on(a), Yn(a, "style", s), Dc(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          s = ci(l.href);
          var u = e.querySelector(
            rs(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, on(u), u;
          a = ry(l), (s = Xl.get(s)) && Dd(a, s), u = (e.ownerDocument || e).createElement("link"), on(u);
          var g = u;
          return g._p = new Promise(function(C, I) {
            g.onload = C, g.onerror = I;
          }), Yn(u, "link", a), t.state.loading |= 4, Dc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = ui(l.src), (s = e.querySelector(
            is(u)
          )) ? (t.instance = s, on(s), s) : (a = l, (s = Xl.get(u)) && (a = x({}, l), jd(a, s)), e = e.ownerDocument || e, s = e.createElement("script"), on(s), Yn(s, "link", a), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(i(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Dc(a, l.precedence, e));
    return t.instance;
  }
  function Dc(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = a.length ? a[a.length - 1] : null, u = s, g = 0; g < a.length; g++) {
      var C = a[g];
      if (C.dataset.precedence === t) u = C;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Dd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function jd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var jc = null;
  function sy(e, t, l) {
    if (jc === null) {
      var a = /* @__PURE__ */ new Map(), s = jc = /* @__PURE__ */ new Map();
      s.set(l, a);
    } else
      s = jc, a = s.get(l), a || (a = /* @__PURE__ */ new Map(), s.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[po] || u[Dt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = u.getAttribute(t) || "";
        g = e + g;
        var C = a.get(g);
        C ? C.push(u) : a.set(g, [u]);
      }
    }
    return a;
  }
  function cy(e, t, l) {
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
  function uy(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function eC(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = ci(a.href), u = t.querySelector(
          rs(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Lc.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, on(u);
          return;
        }
        u = t.ownerDocument || t, a = ry(a), (s = Xl.get(s)) && Dd(a, s), u = u.createElement("link"), on(u);
        var g = u;
        g._p = new Promise(function(C, I) {
          g.onload = C, g.onerror = I;
        }), Yn(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Lc.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Ld = 0;
  function tC(e, t) {
    return e.stylesheets && e.count === 0 && Ic(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && Ic(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ld === 0 && (Ld = 62500 * jE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ic(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Ld ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(s);
      };
    } : null;
  }
  function Lc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ic(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Vc = null;
  function Ic(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Vc = /* @__PURE__ */ new Map(), t.forEach(nC, e), Vc = null, Lc.call(e));
  }
  function nC(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Vc.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Vc.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var g = s[u];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (l.set(g.dataset.precedence, g), a = g);
        }
        a && l.set(null, a);
      }
      s = t.instance, g = s.getAttribute("data-precedence"), u = l.get(g) || a, u === a && l.set(null, s), l.set(g, s), this.count++, a = Lc.bind(this), s.addEventListener("load", a), s.addEventListener("error", a), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ss = {
    $$typeof: T,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function lC(e, t, l, a, s, u, g, C, I) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vt(0), this.hiddenUpdates = Vt(null), this.identifierPrefix = a, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = I, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function fy(e, t, l, a, s, u, g, C, I, J, fe, me) {
    return e = new lC(
      e,
      t,
      l,
      g,
      I,
      J,
      fe,
      me,
      C
    ), t = 1, u === !0 && (t |= 24), u = _l(3, null, null, t), e.current = u, u.stateNode = e, t = pf(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, vf(u), e;
  }
  function dy(e) {
    return e ? (e = Br, e) : Br;
  }
  function hy(e, t, l, a, s, u) {
    s = dy(s), a.context === null ? a.context = s : a.pendingContext = s, a = fa(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = da(e, a, t), l !== null && (pl(l, e, t), Ui(l, e, t));
  }
  function my(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Vd(e, t) {
    my(e, t), (e = e.alternate) && my(e, t);
  }
  function py(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = rr(e, 67108864);
      t !== null && pl(t, e, 67108864), Vd(e, 67108864);
    }
  }
  function gy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Tl();
      t = ho(t);
      var l = rr(e, t);
      l !== null && pl(l, e, t), Vd(e, t);
    }
  }
  var Hc = !0;
  function oC(e, t, l, a) {
    var s = H.T;
    H.T = null;
    var u = B.p;
    try {
      B.p = 2, Id(e, t, l, a);
    } finally {
      B.p = u, H.T = s;
    }
  }
  function aC(e, t, l, a) {
    var s = H.T;
    H.T = null;
    var u = B.p;
    try {
      B.p = 8, Id(e, t, l, a);
    } finally {
      B.p = u, H.T = s;
    }
  }
  function Id(e, t, l, a) {
    if (Hc) {
      var s = Hd(a);
      if (s === null)
        _d(
          e,
          t,
          a,
          Uc,
          l
        ), yy(e, a);
      else if (iC(
        s,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (yy(e, a), t & 4 && -1 < rC.indexOf(e)) {
        for (; s !== null; ) {
          var u = Wl(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var g = ht(u.pendingLanes);
                  if (g !== 0) {
                    var C = u;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; g; ) {
                      var I = 1 << 31 - ot(g);
                      C.entanglements[1] |= I, g &= ~I;
                    }
                    _o(u), (jt & 6) === 0 && (Ec = Z() + 500, ns(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = rr(u, 2), C !== null && pl(C, u, 2), _c(), Vd(u, 2);
            }
          if (u = Hd(a), u === null && _d(
            e,
            t,
            a,
            Uc,
            l
          ), u === s) break;
          s = u;
        }
        s !== null && a.stopPropagation();
      } else
        _d(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function Hd(e) {
    return e = nr(e), Ud(e);
  }
  var Uc = null;
  function Ud(e) {
    if (Uc = null, e = xl(e), e !== null) {
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
    return Uc = e, null;
  }
  function by(e) {
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
        switch (de()) {
          case Te:
            return 2;
          case Ee:
            return 8;
          case Ie:
          case Ze:
            return 32;
          case wt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bd = !1, Ca = null, _a = null, Ra = null, cs = /* @__PURE__ */ new Map(), us = /* @__PURE__ */ new Map(), wa = [], rC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function yy(e, t) {
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
        cs.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        us.delete(t.pointerId);
    }
  }
  function fs(e, t, l, a, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = Wl(t), t !== null && py(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function iC(e, t, l, a, s) {
    switch (t) {
      case "focusin":
        return Ca = fs(
          Ca,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "dragenter":
        return _a = fs(
          _a,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "mouseover":
        return Ra = fs(
          Ra,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return cs.set(
          u,
          fs(
            cs.get(u) || null,
            e,
            t,
            l,
            a,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, us.set(
          u,
          fs(
            us.get(u) || null,
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
  function vy(e) {
    var t = xl(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, mo(e.priority, function() {
              gy(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, mo(e.priority, function() {
              gy(l);
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
  function Bc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Hd(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        tr = a, l.target.dispatchEvent(a), tr = null;
      } else
        return t = Wl(l), t !== null && py(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function xy(e, t, l) {
    Bc(e) && l.delete(t);
  }
  function sC() {
    Bd = !1, Ca !== null && Bc(Ca) && (Ca = null), _a !== null && Bc(_a) && (_a = null), Ra !== null && Bc(Ra) && (Ra = null), cs.forEach(xy), us.forEach(xy);
  }
  function Gc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bd || (Bd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      sC
    )));
  }
  var Yc = null;
  function Sy(e) {
    Yc !== e && (Yc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Yc === e && (Yc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], s = e[t + 2];
          if (typeof a != "function") {
            if (Ud(a || l) === null)
              continue;
            break;
          }
          var u = Wl(l);
          u !== null && (e.splice(t, 3), t -= 3, Hf(
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
  function fi(e) {
    function t(I) {
      return Gc(I, e);
    }
    Ca !== null && Gc(Ca, e), _a !== null && Gc(_a, e), Ra !== null && Gc(Ra, e), cs.forEach(t), us.forEach(t);
    for (var l = 0; l < wa.length; l++) {
      var a = wa[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < wa.length && (l = wa[0], l.blockedOn === null); )
      vy(l), l.blockedOn === null && wa.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var s = l[a], u = l[a + 1], g = s[At] || null;
        if (typeof u == "function")
          g || Sy(l);
        else if (g) {
          var C = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, g = u[At] || null)
              C = g.formAction;
            else if (Ud(s) !== null) continue;
          } else C = g.action;
          typeof C == "function" ? l[a + 1] = C : (l.splice(a, 3), a -= 3), Sy(l);
        }
      }
  }
  function Ey() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(g) {
            return s = g;
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
  function Gd(e) {
    this._internalRoot = e;
  }
  qc.prototype.render = Gd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    var l = t.current, a = Tl();
    hy(l, a, e, t, null, null);
  }, qc.prototype.unmount = Gd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      hy(e.current, 2, null, e, null, null), _c(), t[Ye] = null;
    }
  };
  function qc(e) {
    this._internalRoot = e;
  }
  qc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = an();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < wa.length && t !== 0 && t < wa[l].priority; l++) ;
      wa.splice(l, 0, e), l === 0 && vy(e);
    }
  };
  var Cy = o.version;
  if (Cy !== "19.2.8")
    throw Error(
      i(
        527,
        Cy,
        "19.2.8"
      )
    );
  B.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = h(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var cC = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: H,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pc.isDisabled && Pc.supportsFiber)
      try {
        Mt = Pc.inject(
          cC
        ), mt = Pc;
      } catch {
      }
  }
  return hs.createRoot = function(e, t) {
    if (!c(e)) throw Error(i(299));
    var l = !1, a = "", s = Og, u = kg, g = Ng;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = fy(
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
      g,
      Ey
    ), e[Ye] = t.current, Cd(e), new Gd(t);
  }, hs.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(i(299));
    var a = !1, s = "", u = Og, g = kg, C = Ng, I = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (g = l.onCaughtError), l.onRecoverableError !== void 0 && (C = l.onRecoverableError), l.formState !== void 0 && (I = l.formState)), t = fy(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      s,
      I,
      u,
      g,
      C,
      Ey
    ), t.context = dy(null), l = t.current, a = Tl(), a = ho(a), s = fa(a), s.callback = null, da(l, s, a), l = a, t.current.lanes = l, It(t, l), _o(t), e[Ye] = t.current, Cd(e), new qc(t);
  }, hs.version = "19.2.8", hs;
}
var Ly;
function xC() {
  if (Ly) return Pd.exports;
  Ly = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Pd.exports = vC(), Pd.exports;
}
var SC = xC(), b = Os();
const EC = /* @__PURE__ */ dC(b), Nr = /* @__PURE__ */ fC({
  __proto__: null,
  default: EC
}, [b]);
function Vy(n) {
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
  const [o, r] = b.useState(() => Vy(n));
  return b.useEffect(() => {
    if (!n) return;
    const i = () => r(Vy(n));
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
function r0(n) {
  var o, r, i = "";
  if (typeof n == "string" || typeof n == "number") i += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = r0(n[o])) && (i && (i += " "), i += r);
  } else for (r in n) n[r] && (i && (i += " "), i += r);
  return i;
}
function i0() {
  for (var n, o, r = 0, i = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = r0(n)) && (i && (i += " "), i += o);
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
}), s0 = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), uu = "-", Iy = [], wC = "arbitrary..", MC = (n) => {
  const o = TC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return AC(d);
      const m = d.split(uu), p = m[0] === "" && m.length > 1 ? 1 : 0;
      return c0(m, p, o);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const p = i[d], h = r[d];
        return p ? h ? _C(h, p) : p : h || Iy;
      }
      return r[d] || Iy;
    }
  };
}, c0 = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = c0(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const m = o === 0 ? n.join(uu) : n.slice(o).join(uu), p = d.length;
  for (let h = 0; h < p; h++) {
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
  const r = s0();
  for (const i in n) {
    const c = n[i];
    lm(c, r, i, o);
  }
  return r;
}, lm = (n, o, r, i) => {
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
  const i = n === "" ? o : u0(o, n);
  i.classGroupId = r;
}, zC = (n, o, r, i) => {
  if (jC(n)) {
    lm(n(i), o, r, i);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(RC(r, n));
}, DC = (n, o, r, i) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [m, p] = c[d];
    lm(p, u0(o, m), r, i);
  }
}, u0 = (n, o) => {
  let r = n;
  const i = o.split(uu), c = i.length;
  for (let f = 0; f < c; f++) {
    const d = i[f];
    let m = r.nextPart.get(d);
    m || (m = s0(), r.nextPart.set(d, m)), r = m;
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
}, Nh = "!", Hy = ":", VC = [], Uy = (n, o, r, i, c) => ({
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
    let d = 0, m = 0, p = 0, h;
    const y = c.length;
    for (let A = 0; A < y; A++) {
      const w = c[A];
      if (d === 0 && m === 0) {
        if (w === Hy) {
          f.push(c.slice(p, A)), p = A + 1;
          continue;
        }
        if (w === "/") {
          h = A;
          continue;
        }
      }
      w === "[" ? d++ : w === "]" ? d-- : w === "(" ? m++ : w === ")" && m--;
    }
    const x = f.length === 0 ? c : c.slice(p);
    let v = x, R = !1;
    x.endsWith(Nh) ? (v = x.slice(0, -1), R = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      x.startsWith(Nh) && (v = x.slice(1), R = !0)
    );
    const _ = h && h > p ? h - p : void 0;
    return Uy(f, R, v, _);
  };
  if (o) {
    const c = o + Hy, f = i;
    i = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Uy(VC, !1, d, void 0, !0);
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
      const d = r[f], m = d[0] === "[", p = o.has(d);
      m || p ? (c.length > 0 && (c.sort(), i.push(...c), c = []), i.push(d)) : c.push(d);
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
  } = o, m = [], p = n.trim().split(GC);
  let h = "";
  for (let y = p.length - 1; y >= 0; y -= 1) {
    const x = p[y], {
      isExternal: v,
      modifiers: R,
      hasImportantModifier: _,
      baseClassName: A,
      maybePostfixModifierPosition: w
    } = r(x);
    if (v) {
      h = x + (h.length > 0 ? " " + h : h);
      continue;
    }
    let O = !!w, N;
    if (O) {
      const G = A.substring(0, w);
      N = i(G);
      const L = N && d[N] ? i(A) : void 0;
      L && L !== N && (N = L, O = !1);
    } else
      N = i(A);
    if (!N) {
      if (!O) {
        h = x + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (N = i(A), !N) {
        h = x + (h.length > 0 ? " " + h : h);
        continue;
      }
      O = !1;
    }
    const T = R.length === 0 ? "" : R.length === 1 ? R[0] : f(R).join(":"), D = _ ? T + Nh : T, j = D + N;
    if (m.indexOf(j) > -1)
      continue;
    m.push(j);
    const U = c(N, O);
    for (let G = 0; G < U.length; ++G) {
      const L = U[G];
      m.push(D + L);
    }
    h = x + (h.length > 0 ? " " + h : h);
  }
  return h;
}, qC = (...n) => {
  let o = 0, r, i, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (i = f0(r)) && (c && (c += " "), c += i);
  return c;
}, f0 = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let i = 0; i < n.length; i++)
    n[i] && (o = f0(n[i])) && (r && (r += " "), r += o);
  return r;
}, PC = (n, ...o) => {
  let r, i, c, f;
  const d = (p) => {
    const h = o.reduce((y, x) => x(y), n());
    return r = UC(h), i = r.cache.get, c = r.cache.set, f = m, m(p);
  }, m = (p) => {
    const h = i(p);
    if (h)
      return h;
    const y = YC(p, r);
    return c(p, y), y;
  };
  return f = d, (...p) => f(qC(...p));
}, XC = [], Tn = (n) => {
  const o = (r) => r[n] || XC;
  return o.isThemeGetter = !0, o;
}, d0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, h0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, FC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, KC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, QC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ZC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, $C = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, JC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Aa = (n) => FC.test(n), pt = (n) => !!n && !Number.isNaN(Number(n)), Ro = (n) => !!n && Number.isInteger(Number(n)), Zd = (n) => n.endsWith("%") && pt(n.slice(0, -1)), Qo = (n) => KC.test(n), m0 = () => !0, WC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  QC.test(n) && !ZC.test(n)
), om = () => !1, e_ = (n) => $C.test(n), t_ = (n) => JC.test(n), n_ = (n) => !Ve(n) && !He(n), l_ = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), o_ = (n) => qa(n, b0, om), Ve = (n) => d0.test(n), vr = (n) => qa(n, y0, WC), By = (n) => qa(n, d_, pt), a_ = (n) => qa(n, x0, m0), r_ = (n) => qa(n, v0, om), Gy = (n) => qa(n, p0, om), i_ = (n) => qa(n, g0, t_), Xc = (n) => qa(n, S0, e_), He = (n) => h0.test(n), ms = (n) => zr(n, y0), s_ = (n) => zr(n, v0), Yy = (n) => zr(n, p0), c_ = (n) => zr(n, b0), u_ = (n) => zr(n, g0), Fc = (n) => zr(n, S0, !0), f_ = (n) => zr(n, x0, !0), qa = (n, o, r) => {
  const i = d0.exec(n);
  return i ? i[1] ? o(i[1]) : r(i[2]) : !1;
}, zr = (n, o, r = !1) => {
  const i = h0.exec(n);
  return i ? i[1] ? o(i[1]) : r : !1;
}, p0 = (n) => n === "position" || n === "percentage", g0 = (n) => n === "image" || n === "url", b0 = (n) => n === "length" || n === "size" || n === "bg-size", y0 = (n) => n === "length", d_ = (n) => n === "number", v0 = (n) => n === "family-name", x0 = (n) => n === "number" || n === "weight", S0 = (n) => n === "shadow", h_ = () => {
  const n = Tn("color"), o = Tn("font"), r = Tn("text"), i = Tn("font-weight"), c = Tn("tracking"), f = Tn("leading"), d = Tn("breakpoint"), m = Tn("container"), p = Tn("spacing"), h = Tn("radius"), y = Tn("shadow"), x = Tn("inset-shadow"), v = Tn("text-shadow"), R = Tn("drop-shadow"), _ = Tn("blur"), A = Tn("perspective"), w = Tn("aspect"), O = Tn("ease"), N = Tn("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [
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
  ], j = () => [...D(), He, Ve], U = () => ["auto", "hidden", "clip", "visible", "scroll"], G = () => ["auto", "contain", "none"], L = () => [He, Ve, p], K = () => [Aa, "full", "auto", ...L()], ie = () => [Ro, "none", "subgrid", He, Ve], ue = () => ["auto", {
    span: ["full", Ro, He, Ve]
  }, Ro, He, Ve], W = () => [Ro, "auto", He, Ve], q = () => ["auto", "min", "max", "fr", He, Ve], se = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ge = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], H = () => ["auto", ...L()], B = () => [Aa, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...L()], Q = () => [Aa, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...L()], ye = () => [Aa, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...L()], ce = () => [n, He, Ve], z = () => [...D(), Yy, Gy, {
    position: [He, Ve]
  }], P = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], te = () => ["auto", "cover", "contain", c_, o_, {
    size: [He, Ve]
  }], ae = () => [Zd, ms, vr], be = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    He,
    Ve
  ], we = () => ["", pt, ms, vr], Ge = () => ["solid", "dashed", "dotted", "double"], Ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Oe = () => [pt, Zd, Yy, Gy], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    _,
    He,
    Ve
  ], gt = () => ["none", pt, He, Ve], ze = () => ["none", pt, He, Ve], Je = () => [pt, He, Ve], je = () => [Aa, "full", ...L()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Qo],
      breakpoint: [Qo],
      color: [m0],
      container: [Qo],
      "drop-shadow": [Qo],
      ease: ["in", "out", "in-out"],
      font: [n_],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Qo],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Qo],
      shadow: [Qo],
      spacing: ["px", pt],
      text: [Qo],
      "text-shadow": [Qo],
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
        aspect: ["auto", "square", Aa, Ve, He, w]
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
        "@container": ["", "normal", "size", He, Ve]
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
        columns: [pt, Ve, He, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": T()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": T()
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
        object: j()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: U()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": U()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": U()
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
        z: [Ro, "auto", He, Ve]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Aa, "full", "auto", m, ...L()]
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
        flex: [pt, Aa, "auto", "initial", "none", Ve]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", pt, He, Ve]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", pt, He, Ve]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ro, "first", "last", "none", He, Ve]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": ie()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ue()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": W()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": W()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": ie()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ue()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": W()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": W()
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
        "auto-cols": q()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": q()
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
        justify: [...se(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ge(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ge()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...se()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ge(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ge(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": se()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ge(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ge()]
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
        m: H()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: H()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: H()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: H()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: H()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: H()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: H()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: H()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: H()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: H()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: H()
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
        size: B()
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
        block: ["auto", ...ye()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ye()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ye()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [m, "screen", ...B()]
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
          ...B()
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
          ...B()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...B()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...B()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...B()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, ms, vr]
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
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Zd, Ve]
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
        "font-features": [Ve]
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
        tracking: [c, He, Ve]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [pt, "none", He, By]
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
        "list-image": ["none", He, Ve]
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
        list: ["disc", "decimal", "none", He, Ve]
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
        placeholder: ce()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: ce()
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
        decoration: [...Ge(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [pt, "from-font", "auto", He, vr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: ce()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [pt, "auto", He, Ve]
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
        tab: [Ro, He, Ve]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", He, Ve]
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
        content: ["none", He, Ve]
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
        bg: P()
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
          }, Ro, He, Ve],
          radial: ["", He, Ve],
          conic: [Ro, He, Ve]
        }, u_, i_]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: ce()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ae()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ae()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ae()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: ce()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: ce()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: ce()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: be()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": be()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": be()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": be()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": be()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": be()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": be()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": be()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": be()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": be()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": be()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": be()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": be()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": be()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": be()
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
        border: [...Ge(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...Ge(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: ce()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": ce()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": ce()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": ce()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": ce()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": ce()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": ce()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": ce()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": ce()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": ce()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": ce()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: ce()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...Ge(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [pt, He, Ve]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", pt, ms, vr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: ce()
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
          Fc,
          Xc
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: ce()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", x, Fc, Xc]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": ce()
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
        ring: ce()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [pt, vr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": ce()
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
        "inset-ring": ce()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", v, Fc, Xc]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": ce()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [pt, He, Ve]
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
        "mask-linear": [pt]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Oe()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Oe()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": ce()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": ce()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Oe()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Oe()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": ce()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": ce()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Oe()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Oe()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": ce()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": ce()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Oe()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Oe()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": ce()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": ce()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Oe()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Oe()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": ce()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": ce()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Oe()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Oe()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": ce()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": ce()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Oe()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Oe()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": ce()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": ce()
      }],
      "mask-image-radial": [{
        "mask-radial": [He, Ve]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Oe()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Oe()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": ce()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": ce()
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
        "mask-conic": [pt]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Oe()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Oe()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": ce()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": ce()
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
        mask: P()
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
        mask: ["none", He, Ve]
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
          He,
          Ve
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
        brightness: [pt, He, Ve]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [pt, He, Ve]
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
          R,
          Fc,
          Xc
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": ce()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", pt, He, Ve]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [pt, He, Ve]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", pt, He, Ve]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [pt, He, Ve]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", pt, He, Ve]
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
          He,
          Ve
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
        "backdrop-brightness": [pt, He, Ve]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [pt, He, Ve]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", pt, He, Ve]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [pt, He, Ve]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", pt, He, Ve]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [pt, He, Ve]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [pt, He, Ve]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", pt, He, Ve]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", He, Ve]
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
        duration: [pt, "initial", He, Ve]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", O, He, Ve]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [pt, He, Ve]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", N, He, Ve]
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
        perspective: [A, He, Ve]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": j()
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
        skew: Je()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Je()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Je()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [He, Ve, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: j()
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
        translate: je()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": je()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": je()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": je()
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
        zoom: [Ro, He, Ve]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ce()
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
        caret: ce()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", He, Ve]
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
        "scrollbar-thumb": ce()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": ce()
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
        "will-change": ["auto", "scroll", "contents", "transform", He, Ve]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...ce()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [pt, ms, vr, By]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...ce()]
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
function tt(...n) {
  return m_(i0(n));
}
const E0 = (...n) => n.filter((o, r, i) => !!o && o.trim() !== "" && i.indexOf(o) === r).join(" ").trim();
const p_ = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const g_ = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, i) => i ? i.toUpperCase() : r.toLowerCase()
);
const qy = (n) => {
  const o = g_(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var $d = {
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
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: i, className: c = "", children: f, iconNode: d, ...m }, p) => {
    const {
      size: h = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: x = !1,
      color: v = "currentColor",
      className: R = ""
    } = v_() ?? {}, _ = i ?? x ? Number(r ?? y) * 24 / Number(o ?? h) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: p,
        ...$d,
        width: o ?? h ?? $d.width,
        height: o ?? h ?? $d.height,
        stroke: n ?? v,
        strokeWidth: _,
        className: E0("lucide", R, c),
        ...!f && !b_(m) && { "aria-hidden": "true" },
        ...m
      },
      [
        ...d.map(([A, w]) => b.createElement(A, w)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const On = (n, o) => {
  const r = b.forwardRef(
    ({ className: i, ...c }, f) => b.createElement(x_, {
      ref: f,
      iconNode: o,
      className: E0(
        `lucide-${p_(qy(n))}`,
        `lucide-${n}`,
        i
      ),
      ...c
    })
  );
  return r.displayName = qy(n), r;
};
const S_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], E_ = On("check", S_);
const C_ = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], __ = On("chevron-down", C_);
const R_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], w_ = On("chevron-right", R_);
const M_ = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Py = On("circle", M_);
const A_ = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], T_ = On("expand", A_);
const O_ = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], k_ = On("eye", O_);
const N_ = [
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
], z_ = On("eye-off", N_);
const D_ = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], j_ = On("lasso", D_);
const L_ = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], V_ = On("maximize", L_);
const I_ = [["path", { d: "M5 12h14", key: "1ays0h" }]], C0 = On("minus", I_);
const H_ = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], U_ = On("move", H_);
const B_ = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], G_ = On("pentagon", B_);
const Y_ = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], _0 = On("plus", Y_);
const q_ = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], R0 = On("shapes", q_);
const P_ = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], X_ = On("shrink", P_);
const F_ = [["path", { d: "M22 2 2 22", key: "y4kqgn" }]], K_ = On("slash", F_);
const Q_ = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], Z_ = On("spline", Q_);
const $_ = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], J_ = On("square", $_);
const W_ = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], am = On("x", W_);
var Ci = a0(), eR = Object.defineProperty, rm = (n, o) => eR(n, "name", { value: o, configurable: !0 });
function zh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
rm(zh, "setRef");
function w0(...n) {
  return (o) => {
    let r = !1;
    const i = n.map((c) => {
      const f = zh(c, o);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let c = 0; c < i.length; c++) {
          const f = i[c];
          typeof f == "function" ? f() : zh(n[c], null);
        }
      };
  };
}
rm(w0, "composeRefs");
function Zn(...n) {
  return b.useCallback(w0(...n), n);
}
rm(Zn, "useComposedRefs");
var tR = Object.defineProperty, uo = (n, o) => tR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Rr(n) {
  const o = b.forwardRef((r, i) => {
    let { children: c, ...f } = r, d = null, m = !1;
    const p = [];
    Dh(c) && typeof Kc == "function" && (c = Kc(c._payload)), b.Children.forEach(c, (v) => {
      if (O0(v)) {
        m = !0;
        const R = v;
        let _ = "child" in R.props ? R.props.child : R.props.children;
        Dh(_) && typeof Kc == "function" && (_ = Kc(_._payload)), d = oR(R, _), p.push(d?.props?.children);
      } else
        p.push(v);
    }), d ? d = b.cloneElement(d, void 0, p) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? T0(d) : void 0, y = Zn(i, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          m ? iR(n) : rR(n)
        );
      return c;
    }
    const x = A0(f, d.props ?? {});
    return d.type !== b.Fragment && (x.ref = i ? y : h), b.cloneElement(d, x);
  });
  return o.displayName = `${n}.Slot`, o;
}
uo(Rr, "createSlot");
var nR = /* @__PURE__ */ Rr("Slot"), M0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function lR(n) {
  const o = /* @__PURE__ */ uo((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = M0, o;
}
uo(lR, "createSlottable");
var oR = /* @__PURE__ */ uo((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function A0(n, o) {
  const r = { ...o };
  for (const i in o) {
    const c = n[i], f = o[i];
    /^on[A-Z]/.test(i) ? c && f ? r[i] = (...m) => {
      const p = f(...m);
      return c(...m), p;
    } : c && (r[i] = c) : i === "style" ? r[i] = { ...c, ...f } : i === "className" && (r[i] = [c, f].filter(Boolean).join(" "));
  }
  return { ...n, ...r };
}
uo(A0, "mergeProps");
function T0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
uo(T0, "getElementRef");
function O0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === M0;
}
uo(O0, "isSlottable");
var aR = /* @__PURE__ */ Symbol.for("react.lazy");
function Dh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === aR && "_payload" in n && k0(n._payload);
}
uo(Dh, "isLazyComponent");
function k0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
uo(k0, "isPromiseLike");
var rR = /* @__PURE__ */ uo((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), iR = /* @__PURE__ */ uo((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Kc = Nr[" use ".trim().toString()], sR = Object.defineProperty, cR = (n, o) => sR(n, "name", { value: o, configurable: !0 }), uR = [
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
], qn = uR.reduce((n, o) => {
  const r = /* @__PURE__ */ Rr(`Primitive.${o}`), i = b.forwardRef((c, f) => {
    const { asChild: d, ...m } = c, p = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(p, { ...m, ref: f });
  });
  return i.displayName = `Primitive.${o}`, { ...n, [o]: i };
}, {});
function fR(n, o) {
  n && Ci.flushSync(() => n.dispatchEvent(o));
}
cR(fR, "dispatchDiscreteCustomEvent");
var dR = Object.defineProperty, Ql = (n, o) => dR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function hR(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const i = /* @__PURE__ */ Ql((f) => {
    const { children: d, ...m } = f, p = b.useMemo(() => m, Object.values(m));
    return /* @__PURE__ */ S.jsx(r.Provider, { value: p, children: d });
  }, "Provider");
  i.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: m = !1 } = d, p = b.useContext(r);
    if (p) return p;
    if (o !== void 0) return o;
    if (!m)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return Ql(c, "useContext"), [i, c];
}
Ql(hR, "createContext");
// @__NO_SIDE_EFFECTS__
function Pa(n, o = []) {
  let r = [];
  function i(f, d) {
    const m = b.createContext(d);
    m.displayName = f + "Context";
    const p = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ Ql((x) => {
      const { scope: v, children: R, ..._ } = x, A = v?.[n]?.[p] || m, w = b.useMemo(() => _, Object.values(_));
      return /* @__PURE__ */ S.jsx(A.Provider, { value: w, children: R });
    }, "Provider");
    h.displayName = f + "Provider";
    function y(x, v, R = {}) {
      const { optional: _ = !1 } = R, A = v?.[n]?.[p] || m, w = b.useContext(A);
      if (w) return w;
      if (d !== void 0) return d;
      if (!_)
        throw new Error(`\`${x}\` must be used within \`${f}\``);
    }
    return Ql(y, "useContext"), [h, y];
  }
  Ql(i, "createContext");
  const c = /* @__PURE__ */ Ql(() => {
    const f = r.map((d) => b.createContext(d));
    return /* @__PURE__ */ Ql(function(m) {
      const p = m?.[n] || f;
      return b.useMemo(
        () => ({ [`__scope${n}`]: { ...m, [n]: p } }),
        [m, p]
      );
    }, "useScope");
  }, "createScope");
  return c.scopeName = n, [i, N0(c, ...o)];
}
Ql(Pa, "createContextScope");
function N0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ Ql(() => {
    const i = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ Ql(function(f) {
      const d = i.reduce((m, { useScope: p, scopeName: h }) => {
        const x = p(f)[`__scope${h}`];
        return { ...m, ...x };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
Ql(N0, "composeContextScopes");
var mR = Object.defineProperty, Ln = (n, o) => mR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Eu(n) {
  const o = n + "CollectionProvider", [r, i] = /* @__PURE__ */ Pa(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Ln((A) => {
    const { scope: w, children: O } = A, N = b.useRef(null), T = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(c, { scope: w, itemMap: T, collectionRef: N, children: O });
  }, "CollectionProvider");
  d.displayName = o;
  const m = n + "CollectionSlot", p = /* @__PURE__ */ Rr(m), h = b.forwardRef(
    (A, w) => {
      const { scope: O, children: N } = A, T = f(m, O), D = Zn(w, T.collectionRef);
      return /* @__PURE__ */ S.jsx(p, { ref: D, children: N });
    }
  );
  h.displayName = m;
  const y = n + "CollectionItemSlot", x = "data-radix-collection-item", v = /* @__PURE__ */ Rr(y), R = b.forwardRef(
    (A, w) => {
      const { scope: O, children: N, ...T } = A, D = b.useRef(null), j = Zn(w, D), U = f(y, O);
      return b.useEffect(() => (U.itemMap.set(D, { ref: D, ...T }), () => {
        U.itemMap.delete(D);
      })), /* @__PURE__ */ S.jsx(v, { [x]: "", ref: j, children: N });
    }
  );
  R.displayName = y;
  function _(A) {
    const w = f(n + "CollectionConsumer", A);
    return b.useCallback(() => {
      const N = w.collectionRef.current;
      if (!N) return [];
      const T = Array.from(N.querySelectorAll(`[${x}]`));
      return Array.from(w.itemMap.values()).sort(
        (U, G) => T.indexOf(U.ref.current) - T.indexOf(G.ref.current)
      );
    }, [w.collectionRef, w.itemMap]);
  }
  return Ln(_, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: R },
    _,
    i
  ];
}
Ln(Eu, "createCollection");
var Xy = /* @__PURE__ */ new WeakMap(), Cn, Ol, Jd = (Ol = class extends Map {
  constructor(r) {
    super(r);
    wy(this, Cn);
    Yd(this, Cn, [...super.keys()]), Xy.set(this, !0);
  }
  set(r, i) {
    return Xy.get(this) && (this.has(r) ? Fn(this, Cn)[Fn(this, Cn).indexOf(r)] = r : Fn(this, Cn).push(r)), super.set(r, i), this;
  }
  insert(r, i, c) {
    const f = this.has(i), d = Fn(this, Cn).length, m = im(r);
    let p = m >= 0 ? m : d + m;
    const h = p < 0 || p >= d ? -1 : p;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(i, c), this;
    const y = this.size + (f ? 0 : 1);
    m < 0 && p++;
    const x = [...Fn(this, Cn)];
    let v, R = !1;
    for (let _ = p; _ < y; _++)
      if (p === _) {
        let A = x[_];
        x[_] === i && (A = x[_ + 1]), f && this.delete(i), v = this.get(A), this.set(i, c);
      } else {
        !R && x[_ - 1] === i && (R = !0);
        const A = x[R ? _ : _ - 1], w = v;
        v = this.get(A), this.delete(A), this.set(A, w);
      }
    return this;
  }
  with(r, i, c) {
    const f = new Ol(this);
    return f.insert(r, i, c), f;
  }
  before(r) {
    const i = Fn(this, Cn).indexOf(r) - 1;
    if (!(i < 0))
      return this.entryAt(i);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(r, i, c) {
    const f = Fn(this, Cn).indexOf(r);
    return f === -1 ? this : this.insert(f, i, c);
  }
  after(r) {
    let i = Fn(this, Cn).indexOf(r);
    if (i = i === -1 || i === this.size - 1 ? -1 : i + 1, i !== -1)
      return this.entryAt(i);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(r, i, c) {
    const f = Fn(this, Cn).indexOf(r);
    return f === -1 ? this : this.insert(f + 1, i, c);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Yd(this, Cn, []), super.clear();
  }
  delete(r) {
    const i = super.delete(r);
    return i && Fn(this, Cn).splice(Fn(this, Cn).indexOf(r), 1), i;
  }
  deleteAt(r) {
    const i = this.keyAt(r);
    return i !== void 0 ? this.delete(i) : !1;
  }
  at(r) {
    const i = au(Fn(this, Cn), r);
    if (i !== void 0)
      return this.get(i);
  }
  entryAt(r) {
    const i = au(Fn(this, Cn), r);
    if (i !== void 0)
      return [i, this.get(i)];
  }
  indexOf(r) {
    return Fn(this, Cn).indexOf(r);
  }
  keyAt(r) {
    return au(Fn(this, Cn), r);
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
    return new Ol(c);
  }
  map(r, i) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, i, [d, f, this])]), f++;
    return new Ol(c);
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
    return new Ol(i);
  }
  toReversed() {
    const r = new Ol();
    for (let i = this.size - 1; i >= 0; i--) {
      const c = this.keyAt(i), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const i = [...this.entries()];
    return i.splice(...r), new Ol(i);
  }
  slice(r, i) {
    const c = new Ol();
    let f = this.size - 1;
    if (r === void 0)
      return c;
    r < 0 && (r = r + this.size), i !== void 0 && i > 0 && (f = i - 1);
    for (let d = r; d <= f; d++) {
      const m = this.keyAt(d), p = this.get(m);
      c.set(m, p);
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
}, Cn = new WeakMap(), Ln(Ol, "OrderedDict"), Ol);
function au(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = z0(n, o);
  return r === -1 ? void 0 : n[r];
}
Ln(au, "at");
function z0(n, o) {
  const r = n.length, i = im(o), c = i >= 0 ? i : r + i;
  return c < 0 || c >= r ? -1 : c;
}
Ln(z0, "toSafeIndex");
function im(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Ln(im, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function pR(n) {
  const o = n + "CollectionProvider", [r, i] = /* @__PURE__ */ Pa(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Jd(),
      setItemMap: /* @__PURE__ */ Ln(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Ln(({ state: T, ...D }) => T ? /* @__PURE__ */ S.jsx(p, { ...D, state: T }) : /* @__PURE__ */ S.jsx(m, { ...D }), "CollectionProvider");
  d.displayName = o;
  const m = /* @__PURE__ */ Ln((T) => {
    const D = w();
    return /* @__PURE__ */ S.jsx(p, { ...T, state: D });
  }, "CollectionInit");
  m.displayName = o + "Init";
  const p = /* @__PURE__ */ Ln((T) => {
    const { scope: D, children: j, state: U } = T, G = b.useRef(null), [L, K] = b.useState(
      null
    ), ie = Zn(G, K), [ue, W] = U;
    return b.useEffect(() => {
      if (!L) return;
      const q = L0(() => {
      });
      return q.observe(L, {
        childList: !0,
        subtree: !0
      }), () => {
        q.disconnect();
      };
    }, [L]), /* @__PURE__ */ S.jsx(
      c,
      {
        scope: D,
        itemMap: ue,
        setItemMap: W,
        collectionRef: ie,
        collectionRefObject: G,
        collectionElement: L,
        children: j
      }
    );
  }, "CollectionProviderImpl");
  p.displayName = o + "Impl";
  const h = n + "CollectionSlot", y = /* @__PURE__ */ Rr(h), x = b.forwardRef(
    (T, D) => {
      const { scope: j, children: U } = T, G = f(h, j), L = Zn(D, G.collectionRef);
      return /* @__PURE__ */ S.jsx(y, { ref: L, children: U });
    }
  );
  x.displayName = h;
  const v = n + "CollectionItemSlot", R = "data-radix-collection-item", _ = /* @__PURE__ */ Rr(v), A = b.forwardRef(
    (T, D) => {
      const { scope: j, children: U, ...G } = T, L = b.useRef(null), [K, ie] = b.useState(null), ue = Zn(D, L, ie), W = f(v, j), { setItemMap: q } = W, se = b.useRef(G);
      D0(se.current, G) || (se.current = G);
      const ge = se.current;
      return b.useEffect(() => {
        const H = ge;
        return q((B) => K ? B.has(K) ? B.set(K, { ...H, element: K }).toSorted(jh) : (B.set(K, { ...H, element: K }), B.toSorted(jh)) : B), () => {
          q((B) => !K || !B.has(K) ? B : (B.delete(K), new Jd(B)));
        };
      }, [K, ge, q]), /* @__PURE__ */ S.jsx(_, { [R]: "", ref: ue, children: U });
    }
  );
  A.displayName = v;
  function w() {
    return b.useState(new Jd());
  }
  Ln(w, "useInitCollection");
  function O(T) {
    const { itemMap: D } = f(n + "CollectionConsumer", T);
    return D;
  }
  return Ln(O, "useCollection"), [
    { Provider: d, Slot: x, ItemSlot: A },
    {
      createCollectionScope: i,
      useCollection: O,
      useInitCollection: w
    }
  ];
}
Ln(pR, "createCollection");
function D0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), i = Object.keys(o);
  if (r.length !== i.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
Ln(D0, "shallowEqual");
function j0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Ln(j0, "isElementPreceding");
function jh(n, o) {
  return !n[1].element || !o[1].element ? 0 : j0(n[1].element, o[1].element) ? -1 : 1;
}
Ln(jh, "sortByDocumentPosition");
function L0(n) {
  return new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList") {
        n();
        return;
      }
  });
}
Ln(L0, "getChildListObserver");
var gR = Object.defineProperty, _i = (n, o) => gR(n, "name", { value: o, configurable: !0 }), V0 = !!(typeof window < "u" && window.document && window.document.createElement);
function Qn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ _i(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
_i(Qn, "composeEventHandlers");
function bR(n) {
  if (!V0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
_i(bR, "getOwnerWindow");
function Lh(n) {
  if (!V0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
_i(Lh, "getOwnerDocument");
function I0(n, o = !1) {
  const { activeElement: r } = Lh(n);
  if (!r?.nodeName)
    return null;
  if (H0(r) && r.contentDocument)
    return I0(r.contentDocument.body, o);
  if (o) {
    const i = r.getAttribute("aria-activedescendant");
    if (i) {
      const c = Lh(r).getElementById(i);
      if (c)
        return c;
    }
  }
  return r;
}
_i(I0, "getActiveElement");
function H0(n) {
  return n.tagName === "IFRAME";
}
_i(H0, "isFrame");
var Ia = globalThis?.document ? b.useLayoutEffect : () => {
}, yR = Object.defineProperty, vR = (n, o) => yR(n, "name", { value: o, configurable: !0 }), Fy = Nr[" useEffectEvent ".trim().toString()], Ky = Nr[" useInsertionEffect ".trim().toString()];
function U0(n) {
  if (typeof Fy == "function")
    return Fy(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Ky == "function" ? Ky(() => {
    o.current = n;
  }) : Ia(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
vR(U0, "useEffectEvent");
var xR = Object.defineProperty, ks = (n, o) => xR(n, "name", { value: o, configurable: !0 }), SR = Nr[" useInsertionEffect ".trim().toString()] || Ia;
function ea({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ ks(() => {
  }, "onChange"),
  caller: i
}) {
  const [c, f, d] = B0({
    defaultProp: o,
    onChange: r
  }), m = n !== void 0, p = m ? n : c, h = b.useCallback(
    (y) => {
      if (m) {
        const x = G0(y) ? y(n) : y;
        x !== n && d.current?.(x);
      } else
        f(y);
    },
    [m, n, f, d]
  );
  return [p, h];
}
ks(ea, "useControllableState");
function B0({
  defaultProp: n,
  onChange: o
}) {
  const [r, i] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return SR(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, i, f];
}
ks(B0, "useUncontrolledState");
function G0(n) {
  return typeof n == "function";
}
ks(G0, "isFunction");
var Qy = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function ER(n, o, r, i) {
  const { prop: c, defaultProp: f, onChange: d, caller: m } = o, p = c !== void 0, h = U0(d), y = [{ ...r, state: f }];
  i && y.push(i);
  const [x, v] = b.useReducer(
    (w, O) => {
      if (O.type === Qy)
        return { ...w, state: O.state };
      const N = n(w, O);
      return p && !Object.is(N.state, w.state) && h(N.state), N;
    },
    ...y
  ), R = x.state, _ = b.useRef(R);
  b.useEffect(() => {
    _.current !== R && (_.current = R, p || h(R));
  }, [R, _, p]);
  const A = b.useMemo(() => c !== void 0 ? { ...x, state: c } : x, [x, c]);
  return b.useEffect(() => {
    p && !Object.is(c, x.state) && v({ type: Qy, state: c });
  }, [c, x.state, p]), [A, v];
}
ks(ER, "useControllableStateReducer");
var CR = Object.defineProperty, Wo = (n, o) => CR(n, "name", { value: o, configurable: !0 });
function Y0(n, o) {
  return b.useReducer((r, i) => o[r][i] ?? r, n);
}
Wo(Y0, "useStateMachine");
var _R = /* @__PURE__ */ Wo((n) => {
  const { present: o, children: r } = n, i = q0(o), c = typeof r == "function" ? r({ present: i.isPresent }) : b.Children.only(r), f = P0(i.ref, X0(c));
  return typeof r == "function" || i.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function q0(n) {
  const [o, r] = b.useState(), i = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), m = n ? "mounted" : "unmounted", [p, h] = Y0(m, {
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
    p === "mounted" ? (f.current = d.current ?? hi(i.current), d.current = void 0) : f.current = "none";
  }, [p]), Ia(() => {
    const y = i.current, x = c.current;
    if (x !== n) {
      const R = f.current, _ = hi(y);
      n ? (d.current = _, h("MOUNT")) : _ === "none" || y?.display === "none" ? h("UNMOUNT") : h(x && R !== _ ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), Ia(() => {
    if (o) {
      let y;
      const x = o.ownerDocument.defaultView ?? window, v = /* @__PURE__ */ Wo((_) => {
        const w = hi(i.current).includes(CSS.escape(_.animationName));
        if (_.target === o && w && (h("ANIMATION_END"), !c.current)) {
          const O = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = x.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = O);
          });
        }
      }, "handleAnimationEnd"), R = /* @__PURE__ */ Wo((_) => {
        _.target === o && (f.current = hi(i.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", R), o.addEventListener("animationcancel", v), o.addEventListener("animationend", v), () => {
        x.clearTimeout(y), o.removeEventListener("animationstart", R), o.removeEventListener("animationcancel", v), o.removeEventListener("animationend", v);
      };
    } else
      h("ANIMATION_END");
  }, [o, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(p),
    ref: b.useCallback((y) => {
      if (y) {
        const x = getComputedStyle(y);
        i.current = x, d.current = hi(x);
      } else
        i.current = null;
      r(y);
    }, [])
  };
}
Wo(q0, "usePresence");
function Vh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Wo(Vh, "setRef");
function P0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const i = o.current;
    let c = !1;
    const f = i.map((d) => {
      const m = Vh(d, r);
      return !c && typeof m == "function" && (c = !0), m;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const m = f[d];
          typeof m == "function" ? m() : Vh(i[d], null);
        }
      };
  }, []);
}
Wo(P0, "useStableComposedRefs");
function hi(n) {
  return n?.animationName || "none";
}
Wo(hi, "getAnimationName");
function X0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
Wo(X0, "getElementRef");
var RR = Object.defineProperty, wR = (n, o) => RR(n, "name", { value: o, configurable: !0 }), MR = Nr[" useId ".trim().toString()] || (() => {
}), AR = 0;
function Cu(n) {
  const [o, r] = b.useState(MR());
  return Ia(() => {
    n || r((i) => i ?? String(AR++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
wR(Cu, "useId");
var TR = Object.defineProperty, Ns = (n, o) => TR(n, "name", { value: o, configurable: !0 }), sm = "Collapsible", [OR, F0] = /* @__PURE__ */ Pa(sm), [kR, cm] = OR(sm), NR = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ns(function(o, r) {
    const {
      __scopeCollapsible: i,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: m,
      ...p
    } = o, [h, y] = ea({
      prop: c,
      defaultProp: f ?? !1,
      onChange: m,
      caller: sm
    });
    return /* @__PURE__ */ S.jsx(
      kR,
      {
        scope: i,
        disabled: d,
        contentId: Cu(),
        open: h,
        onOpenToggle: b.useCallback(() => y((x) => !x), [y]),
        children: /* @__PURE__ */ S.jsx(
          qn.div,
          {
            "data-state": _u(h),
            "data-disabled": d ? "" : void 0,
            ...p,
            ref: r
          }
        )
      }
    );
  }, "Collapsible")
), zR = "CollapsibleTrigger", K0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ns(function(o, r) {
    const { __scopeCollapsible: i, ...c } = o, f = cm(zR, i);
    return /* @__PURE__ */ S.jsx(
      qn.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": _u(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...c,
        ref: r,
        onClick: Qn(o.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), Q0 = "CollapsibleContent", Z0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ns(function(o, r) {
    const { forceMount: i, ...c } = o, f = cm(Q0, o.__scopeCollapsible);
    return /* @__PURE__ */ S.jsx(_R, { present: i || f.open, children: ({ present: d }) => /* @__PURE__ */ S.jsx(DR, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), DR = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ns(function(o, r) {
  const { __scopeCollapsible: i, present: c, children: f, ...d } = o, m = cm(Q0, i), [p, h] = b.useState(c), y = b.useRef(null), x = Zn(r, y), v = b.useRef(0), R = v.current, _ = b.useRef(0), A = _.current, w = m.open || p, O = b.useRef(w), N = b.useRef(void 0);
  return b.useEffect(() => {
    const T = requestAnimationFrame(() => O.current = !1);
    return () => cancelAnimationFrame(T);
  }, []), Ia(() => {
    const T = y.current;
    if (T) {
      N.current = N.current || {
        transitionDuration: T.style.transitionDuration,
        animationName: T.style.animationName
      }, T.style.transitionDuration = "0s", T.style.animationName = "none";
      const D = T.getBoundingClientRect();
      v.current = D.height, _.current = D.width, O.current || (T.style.transitionDuration = N.current.transitionDuration, T.style.animationName = N.current.animationName), h(c);
    }
  }, [m.open, c]), /* @__PURE__ */ S.jsx(
    qn.div,
    {
      "data-state": _u(m.open),
      "data-disabled": m.disabled ? "" : void 0,
      id: m.contentId,
      hidden: !w,
      ...d,
      ref: x,
      style: {
        "--radix-collapsible-content-height": R ? `${R}px` : void 0,
        "--radix-collapsible-content-width": A ? `${A}px` : void 0,
        ...o.style
      },
      children: w && f
    }
  );
}, "CollapsibleContentImpl"));
function _u(n) {
  return n ? "open" : "closed";
}
Ns(_u, "getState");
var $0 = NR, jR = K0, LR = Z0, VR = Object.defineProperty, IR = (n, o) => VR(n, "name", { value: o, configurable: !0 }), HR = b.createContext(void 0);
function zs(n) {
  const o = b.useContext(HR);
  return n || o || "ltr";
}
IR(zs, "useDirection");
var UR = Object.defineProperty, Nl = (n, o) => UR(n, "name", { value: o, configurable: !0 }), To = "Accordion", BR = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [um, GR, YR] = /* @__PURE__ */ Eu(To), [Ru, tN] = /* @__PURE__ */ Pa(To, [
  YR,
  F0
]), fm = F0(), qR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { type: i, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ S.jsx(um.Provider, { scope: o.__scopeAccordion, children: i === "multiple" ? /* @__PURE__ */ S.jsx(KR, { ...d, ref: r }) : /* @__PURE__ */ S.jsx(FR, { ...f, ref: r }) });
  }, "Accordion")
), [J0, PR] = Ru(To), [W0, XR] = Ru(
  To,
  { collapsible: !1 }
), FR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const {
      value: i,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Nl(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...m
    } = o, [p, h] = ea({
      prop: i,
      defaultProp: c ?? "",
      onChange: f,
      caller: To
    });
    return /* @__PURE__ */ S.jsx(
      J0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => p ? [p] : [], [p]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ S.jsx(W0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ S.jsx(ex, { ...m, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), KR = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Nl(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Nl(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, p] = ea({
    prop: i,
    defaultProp: c ?? [],
    onChange: f,
    caller: To
  }), h = b.useCallback(
    (x) => p((v = []) => [...v, x]),
    [p]
  ), y = b.useCallback(
    (x) => p((v = []) => v.filter((R) => R !== x)),
    [p]
  );
  return /* @__PURE__ */ S.jsx(
    J0,
    {
      scope: o.__scopeAccordion,
      value: m,
      onItemOpen: h,
      onItemClose: y,
      children: /* @__PURE__ */ S.jsx(W0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ S.jsx(ex, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [QR, wu] = Ru(To), ex = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: i, disabled: c, dir: f, orientation: d = "vertical", ...m } = o, p = b.useRef(null), h = Zn(p, r), y = GR(i), v = zs(f) === "ltr", R = Qn(o.onKeyDown, (_) => {
      if (!BR.includes(_.key)) return;
      const A = _.target, w = y().filter((K) => !K.ref.current?.disabled), O = w.findIndex((K) => K.ref.current === A), N = w.length;
      if (O === -1) return;
      _.preventDefault();
      let T = O;
      const D = 0, j = N - 1, U = /* @__PURE__ */ Nl(() => {
        T = O + 1, T > j && (T = D);
      }, "moveNext"), G = /* @__PURE__ */ Nl(() => {
        T = O - 1, T < D && (T = j);
      }, "movePrev");
      switch (_.key) {
        case "Home":
          T = D;
          break;
        case "End":
          T = j;
          break;
        case "ArrowRight":
          d === "horizontal" && (v ? U() : G());
          break;
        case "ArrowDown":
          d === "vertical" && U();
          break;
        case "ArrowLeft":
          d === "horizontal" && (v ? G() : U());
          break;
        case "ArrowUp":
          d === "vertical" && G();
          break;
      }
      const L = T % N;
      w[L].ref.current?.focus();
    });
    return /* @__PURE__ */ S.jsx(
      QR,
      {
        scope: i,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ S.jsx(um.Slot, { scope: i, children: /* @__PURE__ */ S.jsx(
          qn.div,
          {
            ...m,
            "data-orientation": d,
            ref: h,
            onKeyDown: c ? void 0 : R
          }
        ) })
      }
    );
  }, "AccordionImpl")
), Ih = "AccordionItem", [ZR, dm] = Ru(Ih), $R = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: i, value: c, ...f } = o, d = wu(Ih, i), m = PR(Ih, i), p = fm(i), h = Cu(), y = c && m.value.includes(c) || !1, x = d.disabled || o.disabled;
    return /* @__PURE__ */ S.jsx(
      ZR,
      {
        scope: i,
        open: y,
        disabled: x,
        triggerId: h,
        children: /* @__PURE__ */ S.jsx(
          $0,
          {
            "data-orientation": d.orientation,
            "data-state": hm(y),
            ...p,
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
), JR = "AccordionHeader", WR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = wu(To, i), d = dm(JR, i);
    return /* @__PURE__ */ S.jsx(
      qn.h3,
      {
        "data-orientation": f.orientation,
        "data-state": hm(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), Zy = "AccordionTrigger", ew = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = wu(To, i), d = dm(Zy, i), m = XR(Zy, i), p = fm(i);
    return /* @__PURE__ */ S.jsx(um.ItemSlot, { scope: i, children: /* @__PURE__ */ S.jsx(
      jR,
      {
        "aria-disabled": d.open && !m.collapsible || void 0,
        "data-orientation": f.orientation,
        id: d.triggerId,
        ...p,
        ...c,
        ref: r
      }
    ) });
  }, "AccordionTrigger")
), tw = "AccordionContent", nw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = wu(To, i), d = dm(tw, i), m = fm(i);
    return /* @__PURE__ */ S.jsx(
      LR,
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
function hm(n) {
  return n ? "open" : "closed";
}
Nl(hm, "getState");
var lw = qR, ow = $R, aw = WR, rw = ew, iw = nw, sw = Object.defineProperty, cw = (n, o) => sw(n, "name", { value: o, configurable: !0 });
function tx(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
cw(tx, "useCallbackRef");
var uw = Object.defineProperty, fw = (n, o) => uw(n, "name", { value: o, configurable: !0 });
function nx(n) {
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
          const p = f.borderBoxSize, h = Array.isArray(p) ? p[0] : p;
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
fw(nx, "useSize");
const xi = Math.min, $o = Math.max, fu = Math.round, Er = Math.floor, Jo = (n) => ({
  x: n,
  y: n
}), dw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function lx(n, o, r) {
  return $o(n, xi(o, r));
}
function Ha(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function $l(n) {
  return n.split("-")[0];
}
function Xa(n) {
  return n.split("-")[1];
}
function mm(n) {
  return n === "x" ? "y" : "x";
}
function pm(n) {
  return n === "y" ? "height" : "width";
}
function Zl(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function gm(n) {
  return mm(Zl(n));
}
function hw(n, o, r) {
  r === void 0 && (r = !1);
  const i = Xa(n), c = gm(n), f = pm(c);
  let d = c === "x" ? i === (r ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = du(d)), [d, du(d)];
}
function mw(n) {
  const o = du(n);
  return [Hh(n), o, Hh(o)];
}
function Hh(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const $y = ["left", "right"], Jy = ["right", "left"], pw = ["top", "bottom"], gw = ["bottom", "top"];
function bw(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? Jy : $y : o ? $y : Jy;
    case "left":
    case "right":
      return o ? pw : gw;
    default:
      return [];
  }
}
function yw(n, o, r, i) {
  const c = Xa(n);
  let f = bw($l(n), r === "start", i);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(Hh)))), f;
}
function du(n) {
  const o = $l(n);
  return dw[o] + n.slice(o.length);
}
function vw(n) {
  var o, r, i, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (i = n.bottom) != null ? i : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function ox(n) {
  return typeof n != "number" ? vw(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function hu(n) {
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
function Wy(n, o, r) {
  let {
    reference: i,
    floating: c
  } = n;
  const f = Zl(o), d = gm(o), m = pm(d), p = $l(o), h = f === "y", y = i.x + i.width / 2 - c.width / 2, x = i.y + i.height / 2 - c.height / 2, v = i[m] / 2 - c[m] / 2;
  let R;
  switch (p) {
    case "top":
      R = {
        x: y,
        y: i.y - c.height
      };
      break;
    case "bottom":
      R = {
        x: y,
        y: i.y + i.height
      };
      break;
    case "right":
      R = {
        x: i.x + i.width,
        y: x
      };
      break;
    case "left":
      R = {
        x: i.x - c.width,
        y: x
      };
      break;
    default:
      R = {
        x: i.x,
        y: i.y
      };
  }
  const _ = Xa(o);
  return _ && (R[d] += v * (_ === "end" ? 1 : -1) * (r && h ? -1 : 1)), R;
}
async function xw(n, o) {
  var r;
  o === void 0 && (o = {});
  const {
    x: i,
    y: c,
    platform: f,
    rects: d,
    elements: m,
    strategy: p
  } = n, {
    boundary: h = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: x = "floating",
    altBoundary: v = !1,
    padding: R = 0
  } = Ha(o, n), _ = ox(R), w = m[v ? x === "floating" ? "reference" : "floating" : x], O = hu(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(w))) == null || r ? w : w.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: h,
    rootBoundary: y,
    strategy: p
  })), N = x === "floating" ? {
    x: i,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, T = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), D = await (f.isElement == null ? void 0 : f.isElement(T)) && await (f.getScale == null ? void 0 : f.getScale(T)) || {
    x: 1,
    y: 1
  }, j = hu(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: N,
    offsetParent: T,
    strategy: p
  }) : N);
  return {
    top: (O.top - j.top + _.top) / D.y,
    bottom: (j.bottom - O.bottom + _.bottom) / D.y,
    left: (O.left - j.left + _.left) / D.x,
    right: (j.right - O.right + _.right) / D.x
  };
}
const Sw = 50, Ew = async (n, o, r) => {
  const {
    placement: i = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, m = d.detectOverflow ? d : {
    ...d,
    detectOverflow: xw
  }, p = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let h = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: y,
    y: x
  } = Wy(h, i, p), v = i, R = 0;
  const _ = {};
  for (let A = 0; A < f.length; A++) {
    const w = f[A];
    if (!w)
      continue;
    const {
      name: O,
      fn: N
    } = w, {
      x: T,
      y: D,
      data: j,
      reset: U
    } = await N({
      x: y,
      y: x,
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
    y = T ?? y, x = D ?? x, _[O] = {
      ..._[O],
      ...j
    }, U && R < Sw && (R++, typeof U == "object" && (U.placement && (v = U.placement), U.rects && (h = U.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : U.rects), {
      x: y,
      y: x
    } = Wy(h, v, p)), A = -1);
  }
  return {
    x: y,
    y: x,
    placement: v,
    strategy: c,
    middlewareData: _
  };
}, Cw = function(n) {
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
        platform: p,
        elements: h
      } = o, {
        mainAxis: y = !0,
        crossAxis: x = !0,
        fallbackPlacements: v,
        fallbackStrategy: R = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: A = !0,
        ...w
      } = Ha(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const O = $l(c), N = Zl(m), T = $l(m) === m, D = await (p.isRTL == null ? void 0 : p.isRTL(h.floating)), j = v || (T || !A ? [du(m)] : mw(m)), U = _ !== "none";
      !v && U && j.push(...yw(m, A, _, D));
      const G = [m, ...j], L = await p.detectOverflow(o, w), K = [];
      let ie = ((i = f.flip) == null ? void 0 : i.overflows) || [];
      if (y && K.push(L[O]), x) {
        const se = hw(c, d, D);
        K.push(L[se[0]], L[se[1]]);
      }
      if (ie = [...ie, {
        placement: c,
        overflows: K
      }], !K.every((se) => se <= 0)) {
        var ue, W;
        const se = (((ue = f.flip) == null ? void 0 : ue.index) || 0) + 1, ge = G[se];
        if (ge && (!(x === "alignment" ? N !== Zl(ge) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ie.every((Q) => Zl(Q.placement) === N ? Q.overflows[0] > 0 : !0)))
          return {
            data: {
              index: se,
              overflows: ie
            },
            reset: {
              placement: ge
            }
          };
        let H = (W = ie.filter((B) => B.overflows[0] <= 0).sort((B, Q) => B.overflows[1] - Q.overflows[1])[0]) == null ? void 0 : W.placement;
        if (!H)
          switch (R) {
            case "bestFit": {
              var q;
              const B = (q = ie.filter((Q) => {
                if (U) {
                  const ye = Zl(Q.placement);
                  return ye === N || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ye === "y";
                }
                return !0;
              }).map((Q) => [Q.placement, Q.overflows.filter((ye) => ye > 0).reduce((ye, ce) => ye + ce, 0)]).sort((Q, ye) => Q[1] - ye[1])[0]) == null ? void 0 : q[0];
              B && (H = B);
              break;
            }
            case "initialPlacement":
              H = m;
              break;
          }
        if (c !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
}, ax = /* @__PURE__ */ new Set(["left", "top"]);
async function _w(n, o) {
  const {
    placement: r,
    platform: i,
    elements: c
  } = n, f = await (i.isRTL == null ? void 0 : i.isRTL(c.floating)), d = $l(r), m = Xa(r), p = Zl(r) === "y", h = ax.has(d) ? -1 : 1, y = f && p ? -1 : 1, x = Ha(o, n);
  let {
    mainAxis: v,
    crossAxis: R,
    alignmentAxis: _
  } = typeof x == "number" ? {
    mainAxis: x,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: x.mainAxis || 0,
    crossAxis: x.crossAxis || 0,
    alignmentAxis: x.alignmentAxis
  };
  return m && typeof _ == "number" && (R = m === "end" ? _ * -1 : _), p ? {
    x: R * y,
    y: v * h
  } : {
    x: v * h,
    y: R * y
  };
}
const Rw = function(n) {
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
      } = o, p = await _w(o, n);
      return d === ((r = m.offset) == null ? void 0 : r.placement) && (i = m.arrow) != null && i.alignmentOffset ? {} : {
        x: c + p.x,
        y: f + p.y,
        data: {
          ...p,
          placement: d
        }
      };
    }
  };
}, ww = function(n) {
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
        limiter: p = {
          fn: (N) => {
            let {
              x: T,
              y: D
            } = N;
            return {
              x: T,
              y: D
            };
          }
        },
        ...h
      } = Ha(n, o), y = {
        x: r,
        y: i
      }, x = await f.detectOverflow(o, h), v = Zl(c), R = mm(v);
      let _ = y[R], A = y[v];
      const w = (N, T) => lx(T + x[N === "y" ? "top" : "left"], T, T - x[N === "y" ? "bottom" : "right"]);
      d && (_ = w(R, _)), m && (A = w(v, A));
      const O = p.fn({
        ...o,
        [R]: _,
        [v]: A
      });
      return {
        ...O,
        data: {
          x: O.x - r,
          y: O.y - i,
          enabled: {
            [R]: d,
            [v]: m
          }
        }
      };
    }
  };
}, Mw = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(o) {
      var r, i;
      const {
        x: c,
        y: f,
        placement: d,
        rects: m,
        middlewareData: p
      } = o, {
        offset: h = 0,
        mainAxis: y = !0,
        crossAxis: x = !0
      } = Ha(n, o), v = {
        x: c,
        y: f
      }, R = Zl(d), _ = mm(R);
      let A = v[_], w = v[R];
      const O = Ha(h, o), N = typeof O == "number" ? {
        mainAxis: O,
        crossAxis: 0
      } : {
        mainAxis: (r = O.mainAxis) != null ? r : 0,
        crossAxis: (i = O.crossAxis) != null ? i : 0
      };
      if (y) {
        const j = _ === "y" ? "height" : "width", U = m.reference[_] - m.floating[j] + N.mainAxis, G = m.reference[_] + m.reference[j] - N.mainAxis;
        A < U ? A = U : A > G && (A = G);
      }
      if (x) {
        var T, D;
        const j = _ === "y" ? "width" : "height", U = ax.has($l(d)), G = m.reference[R] - m.floating[j] + (U && ((T = p.offset) == null ? void 0 : T[R]) || 0) + (U ? 0 : N.crossAxis), L = m.reference[R] + m.reference[j] + (U ? 0 : ((D = p.offset) == null ? void 0 : D[R]) || 0) - (U ? N.crossAxis : 0);
        w < G ? w = G : w > L && (w = L);
      }
      return {
        [_]: A,
        [R]: w
      };
    }
  };
}, Aw = function(n) {
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
      } = Ha(n, o), p = await c.detectOverflow(o, m), h = $l(r), y = Xa(r), x = Zl(r) === "y", {
        width: v,
        height: R
      } = i.floating;
      let _, A;
      h === "top" || h === "bottom" ? (_ = h, A = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (A = h, _ = y === "end" ? "top" : "bottom");
      const w = R - p.top - p.bottom, O = v - p.left - p.right, N = xi(R - p[_], w), T = xi(v - p[A], O), D = o.middlewareData.shift, j = !D;
      let U = N, G = T;
      D != null && D.enabled.x && (G = O), D != null && D.enabled.y && (U = w), j && !y && (x ? G = v - 2 * $o(p.left, p.right) : U = R - 2 * $o(p.top, p.bottom)), await d({
        ...o,
        availableWidth: G,
        availableHeight: U
      });
      const L = await c.getDimensions(f.floating);
      return v !== L.width || R !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Mu() {
  return typeof window < "u";
}
function Pn(n) {
  return bm(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function pn(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function ta(n) {
  var o;
  return (o = (bm(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function bm(n) {
  return Mu() ? n instanceof Node || n instanceof pn(n).Node : !1;
}
function mn(n) {
  return Mu() ? n instanceof Element || n instanceof pn(n).Element : !1;
}
function en(n) {
  return Mu() ? n instanceof HTMLElement || n instanceof pn(n).HTMLElement : !1;
}
function Si(n) {
  return !Mu() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof pn(n).ShadowRoot;
}
function Ds(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: i,
    display: c
  } = vl(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + i + r) && c !== "inline" && c !== "contents";
}
function Tw(n) {
  return /^(table|td|th)$/.test(Pn(n));
}
function Au(n) {
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
const Ow = /transform|translate|scale|rotate|perspective|filter/, kw = /paint|layout|strict|content/, xr = (n) => !!n && n !== "none";
let Wd;
function ym(n) {
  const o = mn(n) ? vl(n) : n;
  return xr(o.transform) || xr(o.translate) || xr(o.scale) || xr(o.rotate) || xr(o.perspective) || !vm() && (xr(o.backdropFilter) || xr(o.filter)) || Ow.test(o.willChange || "") || kw.test(o.contain || "");
}
function Nw(n) {
  let o = Ua(n);
  for (; en(o) && !Va(o); ) {
    if (ym(o))
      return o;
    if (Au(o))
      return null;
    o = Ua(o);
  }
  return null;
}
function vm() {
  return Wd == null && (Wd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Wd;
}
function Va(n) {
  return /^(html|body|#document)$/.test(Pn(n));
}
function vl(n) {
  return pn(n).getComputedStyle(n);
}
function Tu(n) {
  return mn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Ua(n) {
  if (Pn(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    Si(n) && n.host || // Fallback.
    ta(n)
  );
  return Si(o) ? o.host : o;
}
function rx(n) {
  const o = Ua(n);
  return Va(o) ? (n.ownerDocument || n).body : en(o) && Ds(o) ? o : rx(o);
}
function Ei(n, o, r) {
  var i;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = rx(n), f = c === ((i = n.ownerDocument) == null ? void 0 : i.body), d = pn(c);
  if (f) {
    const m = Uh(d);
    return o.concat(d, d.visualViewport || [], Ds(c) ? c : [], m && r ? Ei(m) : []);
  } else
    return o.concat(c, Ei(c, [], r));
}
function Uh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function ix(n) {
  const o = vl(n);
  let r = parseFloat(o.width) || 0, i = parseFloat(o.height) || 0;
  const c = en(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : i, m = fu(r) !== f || fu(i) !== d;
  return m && (r = f, i = d), {
    width: r,
    height: i,
    $: m
  };
}
function xm(n) {
  return mn(n) ? n : n.contextElement;
}
function bi(n) {
  const o = xm(n);
  if (!en(o))
    return Jo(1);
  const r = o.getBoundingClientRect(), {
    width: i,
    height: c,
    $: f
  } = ix(o);
  let d = (f ? fu(r.width) : r.width) / i, m = (f ? fu(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const zw = /* @__PURE__ */ Jo(0);
function sx(n) {
  const o = pn(n);
  return !vm() || !o.visualViewport ? zw : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function Dw(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === pn(n);
}
function wr(n, o, r, i) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = xm(n);
  let d = Jo(1);
  o && (i ? mn(i) && (d = bi(i)) : d = bi(n));
  const m = Dw(f, r, i) ? sx(f) : Jo(0);
  let p = (c.left + m.x) / d.x, h = (c.top + m.y) / d.y, y = c.width / d.x, x = c.height / d.y;
  if (f && i) {
    const v = pn(f), R = mn(i) ? pn(i) : i;
    let _ = v, A = Uh(_);
    for (; A && R !== _; ) {
      const w = bi(A), O = A.getBoundingClientRect(), N = vl(A), T = O.left + (A.clientLeft + parseFloat(N.paddingLeft)) * w.x, D = O.top + (A.clientTop + parseFloat(N.paddingTop)) * w.y;
      p *= w.x, h *= w.y, y *= w.x, x *= w.y, p += T, h += D, _ = pn(A), A = Uh(_);
    }
  }
  return hu({
    width: y,
    height: x,
    x: p,
    y: h
  });
}
function Ou(n, o) {
  const r = Tu(n).scrollLeft;
  return o ? o.left + r : wr(ta(n)).left + r;
}
function cx(n, o) {
  const r = n.getBoundingClientRect(), i = r.left + o.scrollLeft - Ou(n, r), c = r.top + o.scrollTop;
  return {
    x: i,
    y: c
  };
}
function jw(n) {
  let {
    elements: o,
    rect: r,
    offsetParent: i,
    strategy: c
  } = n;
  const f = c === "fixed", d = ta(i), m = o ? Au(o.floating) : !1;
  if (i === d || m && f)
    return r;
  let p = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Jo(1);
  const y = Jo(0), x = en(i);
  if ((x || !f) && ((Pn(i) !== "body" || Ds(d)) && (p = Tu(i)), x)) {
    const R = wr(i);
    h = bi(i), y.x = R.x + i.clientLeft, y.y = R.y + i.clientTop;
  }
  const v = d && !x && !f ? cx(d, p) : Jo(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - p.scrollLeft * h.x + y.x + v.x,
    y: r.y * h.y - p.scrollTop * h.y + y.y + v.y
  };
}
function Lw(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function Vw(n) {
  const o = Tu(n), r = n.ownerDocument.body, i = $o(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = $o(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + Ou(n);
  const d = -o.scrollTop;
  return vl(r).direction === "rtl" && (f += $o(n.clientWidth, r.clientWidth) - i), {
    width: i,
    height: c,
    x: f,
    y: d
  };
}
const Iw = 25;
function Hw(n, o, r) {
  r === void 0 && (r = "viewport");
  const i = r === "layoutViewport", c = pn(n), f = ta(n), d = c.visualViewport;
  let m = f.clientWidth, p = f.clientHeight, h = 0, y = 0;
  if (d) {
    const v = !vm() || o === "fixed";
    i ? v || (h = -d.offsetLeft, y = -d.offsetTop) : (m = d.width, p = d.height, v && (h = d.offsetLeft, y = d.offsetTop));
  }
  if (Ou(f) <= 0) {
    const v = f.ownerDocument, R = v.body, _ = getComputedStyle(R), A = v.compatMode === "CSS1Compat" && parseFloat(_.marginLeft) + parseFloat(_.marginRight) || 0, w = Math.abs(f.clientWidth - R.clientWidth - A), O = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? w / 2 : w;
    O <= Iw && (m -= O);
  }
  return {
    width: m,
    height: p,
    x: h,
    y
  };
}
function Uw(n, o) {
  const r = wr(n, !0, o === "fixed"), i = r.top + n.clientTop, c = r.left + n.clientLeft, f = bi(n), d = n.clientWidth * f.x, m = n.clientHeight * f.y, p = c * f.x, h = i * f.y;
  return {
    width: d,
    height: m,
    x: p,
    y: h
  };
}
function ev(n, o, r) {
  let i;
  if (o === "viewport" || o === "layoutViewport")
    i = Hw(n, r, o);
  else if (o === "document")
    i = Vw(ta(n));
  else if (mn(o))
    i = Uw(o, r);
  else {
    const c = sx(n);
    i = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return hu(i);
}
function Bw(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let i = Ei(n, [], !1).filter((m) => mn(m) && Pn(m) !== "body"), c = null;
  const f = vl(n).position === "fixed";
  let d = f ? Ua(n) : n;
  for (; mn(d) && !Va(d); ) {
    const m = vl(d), p = ym(d), h = c ? c.position : f ? "fixed" : "";
    !p && (h === "fixed" || h === "absolute" && m.position === "static") ? i = i.filter((x) => x !== d) : c = m, d = Ua(d);
  }
  return o.set(n, i), i;
}
function Gw(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: i,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? Au(o) ? [] : Bw(o, this._c) : [].concat(r), i], m = ev(o, d[0], c);
  let p = m.top, h = m.right, y = m.bottom, x = m.left;
  for (let v = 1; v < d.length; v++) {
    const R = ev(o, d[v], c);
    p = $o(R.top, p), h = xi(R.right, h), y = xi(R.bottom, y), x = $o(R.left, x);
  }
  return {
    width: h - x,
    height: y - p,
    x,
    y: p
  };
}
function Yw(n) {
  const {
    width: o,
    height: r
  } = ix(n);
  return {
    width: o,
    height: r
  };
}
function qw(n, o, r) {
  const i = en(o), c = ta(o), f = r === "fixed", d = wr(n, !0, f, o);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const p = Jo(0);
  if ((i || !f) && ((Pn(o) !== "body" || Ds(c)) && (m = Tu(o)), i)) {
    const v = wr(o, !0, f, o);
    p.x = v.x + o.clientLeft, p.y = v.y + o.clientTop;
  }
  !i && c && (p.x = Ou(c));
  const h = c && !i && !f ? cx(c, m) : Jo(0), y = d.left + m.scrollLeft - p.x - h.x, x = d.top + m.scrollTop - p.y - h.y;
  return {
    x: y,
    y: x,
    width: d.width,
    height: d.height
  };
}
function eh(n) {
  return vl(n).position === "static";
}
function tv(n, o) {
  if (!en(n) || vl(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return ta(n) === r && (r = r.ownerDocument.body), r;
}
function ux(n, o) {
  const r = pn(n);
  if (Au(n))
    return r;
  if (!en(n)) {
    let c = Ua(n);
    for (; c && !Va(c); ) {
      if (mn(c) && !eh(c))
        return c;
      c = Ua(c);
    }
    return r;
  }
  let i = tv(n, o);
  for (; i && Tw(i) && eh(i); )
    i = tv(i, o);
  return i && Va(i) && eh(i) && !ym(i) ? r : i || Nw(n) || r;
}
const Pw = async function(n) {
  const o = this.getOffsetParent || ux, r = this.getDimensions, i = await r(n.floating);
  return {
    reference: qw(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function Xw(n) {
  return vl(n).direction === "rtl";
}
const Fw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: jw,
  getDocumentElement: ta,
  getClippingRect: Gw,
  getOffsetParent: ux,
  getElementRects: Pw,
  getClientRects: Lw,
  getDimensions: Yw,
  getScale: bi,
  isElement: mn,
  isRTL: Xw
};
function fx(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function Kw(n, o, r) {
  let i = null, c;
  const f = ta(n);
  function d() {
    var y;
    clearTimeout(c), (y = i) == null || y.disconnect(), i = null;
  }
  function m(y, x) {
    y === void 0 && (y = !1), x === void 0 && (x = 1), d();
    const v = n.getBoundingClientRect(), {
      left: R,
      top: _,
      width: A,
      height: w
    } = v;
    if (y || o(), !A || !w)
      return;
    const O = Er(_), N = Er(f.clientWidth - (R + A)), T = Er(f.clientHeight - (_ + w)), D = Er(R), U = {
      rootMargin: -O + "px " + -N + "px " + -T + "px " + -D + "px",
      threshold: $o(0, xi(1, x)) || 1
    };
    let G = !0;
    function L(K) {
      const ie = K[0].intersectionRatio;
      if (!fx(v, n.getBoundingClientRect()))
        return m();
      if (ie !== x) {
        if (!G)
          return m();
        ie ? m(!1, ie) : c = setTimeout(() => {
          m(!1, 1e-7);
        }, 1e3);
      }
      G = !1;
    }
    try {
      i = new IntersectionObserver(L, {
        ...U,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(L, U);
    }
    i.observe(n);
  }
  const p = pn(n), h = () => m(r);
  return p.addEventListener("resize", h), m(!0), () => {
    p.removeEventListener("resize", h), d();
  };
}
function nv(n, o, r, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: p = !1
  } = i, h = xm(n), y = c || f ? [...h ? Ei(h) : [], ...o ? Ei(o) : []] : [];
  y.forEach((O) => {
    c && O.addEventListener("scroll", r), f && O.addEventListener("resize", r);
  });
  const x = h && m ? Kw(h, r, f) : null;
  let v = -1, R = null;
  d && (R = new ResizeObserver((O) => {
    let [N] = O;
    N && N.target === h && R && o && (R.unobserve(o), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var T;
      (T = R) == null || T.observe(o);
    })), r();
  }), h && !p && R.observe(h), o && R.observe(o));
  let _, A = p ? wr(n) : null;
  p && w();
  function w() {
    const O = wr(n);
    A && !fx(A, O) && r(), A = O, _ = requestAnimationFrame(w);
  }
  return r(), () => {
    var O;
    y.forEach((N) => {
      c && N.removeEventListener("scroll", r), f && N.removeEventListener("resize", r);
    }), x?.(), (O = R) == null || O.disconnect(), R = null, p && cancelAnimationFrame(_);
  };
}
const Qw = Rw, Zw = ww, $w = Cw, Jw = Aw, Ww = Mw, eM = (n, o, r) => {
  const i = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...Fw,
    ...c.platform,
    _c: i
  };
  return Ew(n, o, {
    ...c,
    platform: f
  });
};
var tM = typeof document < "u", nM = function() {
}, ru = tM ? b.useLayoutEffect : nM;
function mu(n, o) {
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
        if (!mu(n[i], o[i]))
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
      if (!(f === "_owner" && n.$$typeof) && !mu(n[f], o[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function dx(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function lv(n, o) {
  const r = dx(n);
  return Math.round(o * r) / r;
}
function th(n) {
  const o = b.useRef(n);
  return ru(() => {
    o.current = n;
  }), o;
}
function lM(n) {
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
    whileElementsMounted: p,
    open: h
  } = n, [y, x] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [v, R] = b.useState(i);
  mu(v, i) || R(i);
  const [_, A] = b.useState(null), [w, O] = b.useState(null), N = b.useCallback((Q) => {
    Q !== U.current && (U.current = Q, A(Q));
  }, []), T = b.useCallback((Q) => {
    Q !== G.current && (G.current = Q, O(Q));
  }, []), D = f || _, j = d || w, U = b.useRef(null), G = b.useRef(null), L = b.useRef(y), K = p != null, ie = th(p), ue = th(c), W = th(h), q = b.useCallback(() => {
    if (!U.current || !G.current)
      return;
    const Q = {
      placement: o,
      strategy: r,
      middleware: v
    };
    ue.current && (Q.platform = ue.current), eM(U.current, G.current, Q).then((ye) => {
      const ce = {
        ...ye,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: W.current !== !1
      };
      se.current && !mu(L.current, ce) && (L.current = ce, Ci.flushSync(() => {
        x(ce);
      }));
    });
  }, [v, o, r, ue, W]);
  ru(() => {
    h === !1 && L.current.isPositioned && (L.current.isPositioned = !1, x((Q) => ({
      ...Q,
      isPositioned: !1
    })));
  }, [h]);
  const se = b.useRef(!1);
  ru(() => (se.current = !0, () => {
    se.current = !1;
  }), []), ru(() => {
    if (D && (U.current = D), j && (G.current = j), D && j) {
      if (ie.current)
        return ie.current(D, j, q);
      q();
    }
  }, [D, j, q, ie, K]);
  const ge = b.useMemo(() => ({
    reference: U,
    floating: G,
    setReference: N,
    setFloating: T
  }), [N, T]), H = b.useMemo(() => ({
    reference: D,
    floating: j
  }), [D, j]), B = b.useMemo(() => {
    const Q = {
      position: r,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return Q;
    const ye = lv(H.floating, y.x), ce = lv(H.floating, y.y);
    return m ? {
      ...Q,
      transform: "translate(" + ye + "px, " + ce + "px)",
      ...dx(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: ye,
      top: ce
    };
  }, [r, m, H.floating, y.x, y.y]);
  return b.useMemo(() => ({
    ...y,
    update: q,
    refs: ge,
    elements: H,
    floatingStyles: B
  }), [y, q, ge, H, B]);
}
const oM = (n, o) => {
  const r = Qw(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, aM = (n, o) => {
  const r = Zw(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, rM = (n, o) => ({
  fn: Ww(n).fn,
  options: [n, o]
}), iM = (n, o) => {
  const r = $w(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, sM = (n, o) => {
  const r = Jw(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var cM = Object.defineProperty, Sm = (n, o) => cM(n, "name", { value: o, configurable: !0 }), nh = !1;
function hx() {
  const [n, o] = b.useState(nh);
  return b.useEffect(() => {
    nh || (nh = !0, o(!0));
  }, []), n;
}
Sm(hx, "useIsHydrated");
var mx = Nr[" useSyncExternalStore ".trim().toString()];
function px() {
  return () => {
  };
}
Sm(px, "subscribe");
function gx() {
  return mx(
    px,
    () => !0,
    () => !1
  );
}
Sm(gx, "useIsHydratedModern");
var uM = typeof mx == "function" ? gx : hx, fM = Object.defineProperty, Dr = (n, o) => fM(n, "name", { value: o, configurable: !0 }), lh = "rovingFocusGroup.onEntryFocus", dM = { bubbles: !1, cancelable: !0 }, ku = "RovingFocusGroup", [Bh, bx, hM] = /* @__PURE__ */ Eu(ku), [mM, yx] = /* @__PURE__ */ Pa(
  ku,
  [hM]
), [pM, gM] = mM(ku), bM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Dr(function(o, r) {
    return /* @__PURE__ */ S.jsx(Bh.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(Bh.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(yM, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), yM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Dr(function(o, r) {
  const {
    __scopeRovingFocusGroup: i,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: m,
    defaultCurrentTabStopId: p,
    onCurrentTabStopIdChange: h,
    onEntryFocus: y,
    preventScrollOnEntryFocus: x = !1,
    ...v
  } = o, R = b.useRef(null), _ = Zn(r, R), A = zs(d), [w, O] = ea({
    prop: m,
    defaultProp: p ?? null,
    onChange: h,
    caller: ku
  }), [N, T] = b.useState(!1), D = tx(y), j = bx(i), U = b.useRef(!1), [G, L] = b.useState(0);
  return b.useEffect(() => {
    const K = R.current;
    if (K)
      return K.addEventListener(lh, D), () => K.removeEventListener(lh, D);
  }, [D]), /* @__PURE__ */ S.jsx(
    pM,
    {
      scope: i,
      orientation: c,
      dir: A,
      loop: f,
      currentTabStopId: w,
      onItemFocus: b.useCallback(
        (K) => O(K),
        [O]
      ),
      onItemShiftTab: b.useCallback(() => T(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => L((K) => K + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => L((K) => K - 1),
        []
      ),
      children: /* @__PURE__ */ S.jsx(
        qn.div,
        {
          tabIndex: N || G === 0 ? -1 : 0,
          "data-orientation": c,
          ...v,
          ref: _,
          style: { outline: "none", ...o.style },
          onMouseDown: Qn(o.onMouseDown, () => {
            U.current = !0;
          }),
          onFocus: Qn(o.onFocus, (K) => {
            const ie = !U.current;
            if (K.target === K.currentTarget && ie && !N) {
              const ue = new CustomEvent(lh, dM);
              if (K.currentTarget.dispatchEvent(ue), !ue.defaultPrevented) {
                const W = j().filter((B) => B.focusable), q = W.find((B) => B.active), se = W.find((B) => B.id === w), H = [q, se, ...W].filter(
                  Boolean
                ).map((B) => B.ref.current);
                Em(H, x);
              }
            }
            U.current = !1;
          }),
          onBlur: Qn(o.onBlur, () => T(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), vM = "RovingFocusGroupItem", xM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Dr(function(o, r) {
    const {
      __scopeRovingFocusGroup: i,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: m,
      ...p
    } = o, h = Cu(), y = d || h, x = gM(vM, i), v = x.currentTabStopId === y, R = bx(i), { onFocusableItemAdd: _, onFocusableItemRemove: A, currentTabStopId: w } = x, O = uM();
    return Ia(() => {
      if (!(!O || !c))
        return _(), () => A();
    }, [O, c, _, A]), b.useEffect(() => {
      if (!(O || !c))
        return _(), () => A();
    }, [O, c, _, A]), /* @__PURE__ */ S.jsx(
      Bh.ItemSlot,
      {
        scope: i,
        id: y,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ S.jsx(
          qn.span,
          {
            tabIndex: v ? 0 : -1,
            "data-orientation": x.orientation,
            ...p,
            ref: r,
            onMouseDown: Qn(o.onMouseDown, (N) => {
              c ? x.onItemFocus(y) : N.preventDefault();
            }),
            onFocus: Qn(o.onFocus, () => x.onItemFocus(y)),
            onKeyDown: Qn(o.onKeyDown, (N) => {
              if (N.key === "Tab" && N.shiftKey) {
                x.onItemShiftTab();
                return;
              }
              if (N.target !== N.currentTarget) return;
              const T = xx(N, x.orientation, x.dir);
              if (T !== void 0) {
                if (N.metaKey || N.ctrlKey || N.altKey || N.shiftKey) return;
                N.preventDefault();
                let j = R().filter((U) => U.focusable).map((U) => U.ref.current);
                if (T === "last") j.reverse();
                else if (T === "prev" || T === "next") {
                  T === "prev" && j.reverse();
                  const U = j.indexOf(N.currentTarget);
                  j = x.loop ? Sx(j, U + 1) : j.slice(U + 1);
                }
                setTimeout(() => Em(j));
              }
            }),
            children: typeof m == "function" ? m({ isCurrentTabStop: v, hasTabStop: w != null }) : m
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), SM = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function vx(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
Dr(vx, "getDirectionAwareKey");
function xx(n, o, r) {
  const i = vx(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(i)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(i)))
    return SM[i];
}
Dr(xx, "getFocusIntent");
function Em(n, o = !1) {
  const r = document.activeElement;
  for (const i of n)
    if (i === r || (i.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
Dr(Em, "focusFirst");
function Sx(n, o) {
  return n.map((r, i) => n[(o + i) % n.length]);
}
Dr(Sx, "wrapArray");
var EM = bM, CM = xM, _M = Object.defineProperty, RM = (n, o) => _M(n, "name", { value: o, configurable: !0 }), wM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ RM(function(o, r) {
    return /* @__PURE__ */ S.jsx(
      qn.label,
      {
        ...o,
        ref: r,
        onMouseDown: (i) => {
          i.target.closest("button, input, select, textarea") || (o.onMouseDown?.(i), !i.defaultPrevented && i.detail > 1 && i.preventDefault());
        }
      }
    );
  }, "Label")
), MM = wM, AM = Object.defineProperty, TM = (n, o) => AM(n, "name", { value: o, configurable: !0 });
function Ex(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
TM(Ex, "usePrevious");
var OM = Object.defineProperty, kM = (n, o) => OM(n, "name", { value: o, configurable: !0 });
function Cm(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
kM(Cm, "clamp");
var NM = Object.defineProperty, Cx = (n, o) => NM(n, "name", { value: o, configurable: !0 }), ov = "horizontal", zM = ["horizontal", "vertical"], DM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Cx(function(o, r) {
    const { decorative: i, orientation: c = ov, ...f } = o, d = _x(c) ? c : ov, p = i ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
    return /* @__PURE__ */ S.jsx(
      qn.div,
      {
        "data-orientation": d,
        ...p,
        ...f,
        ref: r
      }
    );
  }, "Separator")
);
function _x(n) {
  return zM.includes(n);
}
Cx(_x, "isValidOrientation");
var jM = DM, LM = Object.defineProperty, Nt = (n, o) => LM(n, "name", { value: o, configurable: !0 }), Rx = ["PageUp", "PageDown"], wx = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Mx = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, js = "Slider", [Gh, VM, IM] = /* @__PURE__ */ Eu(js), [_m, nN] = /* @__PURE__ */ Pa(js, [
  IM
]), [HM, Ls] = _m(js), UM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nt(function(o, r) {
    const {
      name: i,
      min: c = 0,
      max: f = 100,
      step: d = 1,
      orientation: m = "horizontal",
      disabled: p = !1,
      minStepsBetweenThumbs: h = 0,
      defaultValue: y = [c],
      value: x,
      onValueChange: v = /* @__PURE__ */ Nt(() => {
      }, "onValueChange"),
      onValueCommit: R = /* @__PURE__ */ Nt(() => {
      }, "onValueCommit"),
      inverted: _ = !1,
      form: A,
      ...w
    } = o, O = b.useRef(/* @__PURE__ */ new Set()), N = b.useRef(0), T = b.useRef(!1), j = m === "horizontal" ? BM : GM, [U, G] = b.useState(null), L = Zn(r, G), [K = [], ie] = ea({
      prop: x,
      defaultProp: y,
      onChange: /* @__PURE__ */ Nt((B) => {
        [...O.current][N.current]?.focus({
          preventScroll: !0,
          focusVisible: T.current
        }), T.current = !1, v(B);
      }, "onChange")
    }), ue = b.useRef(K), W = b.useRef(K);
    b.useEffect(() => {
      const B = A ? U?.ownerDocument.getElementById(A) : U?.closest("form");
      if (B instanceof HTMLFormElement) {
        const Q = /* @__PURE__ */ Nt(() => ie(W.current), "reset");
        return B.addEventListener("reset", Q), () => B.removeEventListener("reset", Q);
      }
    }, [U, A, ie]);
    function q(B) {
      const Q = jx(K, B);
      H(B, Q);
    }
    Nt(q, "handleSlideStart");
    function se(B) {
      H(B, N.current);
    }
    Nt(se, "handleSlideMove");
    function ge() {
      String(K) !== String(ue.current) && R(K);
    }
    Nt(ge, "handleSlideEnd");
    function H(B, Q, { commit: ye } = { commit: !1 }) {
      const ce = wm(d), z = Ss(Math.round((B - c) / d) * d + c, ce), P = Cm(z, [c, f]);
      ie((te = []) => {
        const ae = zx(te, P, Q);
        if (Ix(ae, h * d)) {
          N.current = ae.indexOf(P);
          const be = String(ae) !== String(te);
          return be && ye && R(ae), be ? ae : te;
        } else
          return te;
      });
    }
    return Nt(H, "updateValues"), /* @__PURE__ */ S.jsx(
      HM,
      {
        scope: o.__scopeSlider,
        name: i,
        disabled: p,
        min: c,
        max: f,
        valueIndexToChangeRef: N,
        thumbs: O.current,
        values: K,
        orientation: m,
        form: A,
        children: /* @__PURE__ */ S.jsx(Gh.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(Gh.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          j,
          {
            "aria-disabled": p,
            "data-disabled": p ? "" : void 0,
            ...w,
            ref: L,
            onPointerDown: Qn(w.onPointerDown, () => {
              p || (ue.current = K, T.current = !1);
            }),
            min: c,
            max: f,
            inverted: _,
            onSlideStart: p ? void 0 : q,
            onSlideMove: p ? void 0 : se,
            onSlideEnd: p ? void 0 : ge,
            onHomeKeyDown: () => {
              p || (T.current = !0, H(c, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              p || (T.current = !0, H(f, K.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: B, direction: Q }) => {
              if (!p) {
                T.current = !0;
                const z = Rx.includes(B.key) || B.shiftKey && wx.includes(B.key) ? 10 : 1, P = N.current, te = K[P], ae = Hx(te, {
                  min: c,
                  step: d,
                  direction: Q,
                  multiplier: z
                });
                H(ae, P, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [Ax, Tx] = _m(js, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), BM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nt(function(o, r) {
    const {
      min: i,
      max: c,
      dir: f,
      inverted: d,
      onSlideStart: m,
      onSlideMove: p,
      onSlideEnd: h,
      onStepKeyDown: y,
      ...x
    } = o, [v, R] = b.useState(null), _ = Zn(r, R), A = b.useRef(void 0), w = zs(f), O = w === "ltr", N = O && !d || !O && d;
    function T(D) {
      const j = A.current || v.getBoundingClientRect(), U = [0, j.width], L = Nu(U, N ? [i, c] : [c, i]);
      return A.current = j, L(D - j.left);
    }
    return Nt(T, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      Ax,
      {
        scope: o.__scopeSlider,
        startEdge: N ? "left" : "right",
        endEdge: N ? "right" : "left",
        direction: N ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          Ox,
          {
            dir: w,
            "data-orientation": "horizontal",
            ...x,
            ref: _,
            style: {
              ...x.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (D) => {
              const j = T(D.clientX);
              m?.(j);
            },
            onSlideMove: (D) => {
              const j = T(D.clientX);
              p?.(j);
            },
            onSlideEnd: () => {
              A.current = void 0, h?.();
            },
            onStepKeyDown: (D) => {
              const U = Mx[N ? "from-left" : "from-right"].includes(D.key);
              y?.({ event: D, direction: U ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), GM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nt(function(o, r) {
    const {
      min: i,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: m,
      onSlideEnd: p,
      onStepKeyDown: h,
      ...y
    } = o, x = b.useRef(null), v = Zn(r, x), R = b.useRef(void 0), _ = !f;
    function A(w) {
      const O = R.current || x.current.getBoundingClientRect(), N = [0, O.height], D = Nu(N, _ ? [c, i] : [i, c]);
      return R.current = O, D(w - O.top);
    }
    return Nt(A, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      Ax,
      {
        scope: o.__scopeSlider,
        startEdge: _ ? "bottom" : "top",
        endEdge: _ ? "top" : "bottom",
        size: "height",
        direction: _ ? 1 : -1,
        children: /* @__PURE__ */ S.jsx(
          Ox,
          {
            "data-orientation": "vertical",
            ...y,
            ref: v,
            style: {
              ...y.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (w) => {
              const O = A(w.clientY);
              d?.(O);
            },
            onSlideMove: (w) => {
              const O = A(w.clientY);
              m?.(O);
            },
            onSlideEnd: () => {
              R.current = void 0, p?.();
            },
            onStepKeyDown: (w) => {
              const N = Mx[_ ? "from-bottom" : "from-top"].includes(w.key);
              h?.({ event: w, direction: N ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), Ox = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nt(function(o, r) {
    const {
      __scopeSlider: i,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: m,
      onEndKeyDown: p,
      onStepKeyDown: h,
      ...y
    } = o, x = Ls(js, i);
    return /* @__PURE__ */ S.jsx(
      qn.span,
      {
        ...y,
        ref: r,
        onKeyDown: Qn(o.onKeyDown, (v) => {
          v.key === "Home" ? (m(v), v.preventDefault()) : v.key === "End" ? (p(v), v.preventDefault()) : Rx.concat(wx).includes(v.key) && (h(v), v.preventDefault());
        }),
        onPointerDown: Qn(o.onPointerDown, (v) => {
          const R = v.target;
          R.setPointerCapture(v.pointerId), v.preventDefault(), x.thumbs.has(R) ? R.focus({ preventScroll: !0, focusVisible: !1 }) : c(v);
        }),
        onPointerMove: Qn(o.onPointerMove, (v) => {
          v.target.hasPointerCapture(v.pointerId) && f(v);
        }),
        onPointerUp: Qn(o.onPointerUp, (v) => {
          const R = v.target;
          R.hasPointerCapture(v.pointerId) && (R.releasePointerCapture(v.pointerId), d(v));
        })
      }
    );
  }, "SliderImpl")
), YM = "SliderTrack", qM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = Ls(YM, i);
    return /* @__PURE__ */ S.jsx(
      qn.span,
      {
        "data-disabled": f.disabled ? "" : void 0,
        "data-orientation": f.orientation,
        ...c,
        ref: r
      }
    );
  }, "SliderTrack")
), av = "SliderRange", PM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = Ls(av, i), d = Tx(av, i), m = b.useRef(null), p = Zn(r, m), h = f.values.length, y = f.values.map(
      (R) => Rm(R, f.min, f.max)
    ), x = h > 1 ? Math.min(...y) : 0, v = 100 - Math.max(...y);
    return /* @__PURE__ */ S.jsx(
      qn.span,
      {
        "data-orientation": f.orientation,
        "data-disabled": f.disabled ? "" : void 0,
        ...c,
        ref: p,
        style: {
          ...o.style,
          [d.startEdge]: x + "%",
          [d.endEdge]: v + "%"
        }
      }
    );
  }, "SliderRange")
), XM = "SliderThumb", [FM, kx] = _m(XM), KM = "SliderThumbProvider";
function Nx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: i,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = Ls(KM, o), d = VM(o), [m, p] = b.useState(null), h = b.useMemo(
    () => m ? d().findIndex((w) => w.ref.current === m) : -1,
    [d, m]
  ), y = nx(m), x = m ? !!f.form || !!m.closest("form") : !0, v = f.values[h], R = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), _ = v === void 0 ? 0 : Rm(v, f.min, f.max);
  b.useEffect(() => {
    if (m)
      return f.thumbs.add(m), () => {
        f.thumbs.delete(m);
      };
  }, [m, f.thumbs]);
  const A = {
    value: v,
    name: R,
    form: f.form,
    isFormControl: x,
    index: h,
    thumb: m,
    onThumbChange: p,
    percent: _,
    size: y
  };
  return /* @__PURE__ */ S.jsx(FM, { scope: o, ...A, children: Ux(c) ? c(A) : i });
}
Nt(Nx, "SliderThumbProvider");
var oh = "SliderThumbTrigger", QM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = Ls(oh, i), d = Tx(oh, i), { index: m, value: p, percent: h, size: y, onThumbChange: x } = kx(
      oh,
      i
    ), v = Zn(r, x), R = Dx(m, f.values.length), _ = y?.[d.size], A = _ ? Lx(_, h, d.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${A}px)`
        },
        children: /* @__PURE__ */ S.jsx(Gh.ItemSlot, { scope: i, children: /* @__PURE__ */ S.jsx(
          qn.span,
          {
            role: "slider",
            "aria-label": o["aria-label"] || R,
            "aria-valuemin": f.min,
            "aria-valuenow": p,
            "aria-valuemax": f.max,
            "aria-orientation": f.orientation,
            "data-orientation": f.orientation,
            "data-disabled": f.disabled ? "" : void 0,
            tabIndex: f.disabled ? void 0 : 0,
            ...c,
            ref: v,
            style: p === void 0 ? { display: "none" } : o.style,
            onFocus: Qn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = m;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), ZM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nt(function(o, r) {
    const { __scopeSlider: i, name: c, ...f } = o;
    return /* @__PURE__ */ S.jsx(
      Nx,
      {
        __scopeSlider: i,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: m }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            QM,
            {
              ...f,
              ref: r,
              __scopeSlider: i
            }
          ),
          m ? /* @__PURE__ */ S.jsx(
            JM,
            {
              __scopeSlider: i
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), $M = "SliderBubbleInput", JM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nt(function({ __scopeSlider: o, ...r }, i) {
    const { value: c, name: f, form: d } = kx($M, o), m = b.useRef(null), p = Zn(m, i), h = Ex(c);
    return b.useEffect(() => {
      const y = m.current;
      if (!y) return;
      const x = window.HTMLInputElement.prototype, R = Object.getOwnPropertyDescriptor(x, "value").set;
      if (h !== c && R) {
        const _ = new Event("input", { bubbles: !0 });
        R.call(y, c), y.dispatchEvent(_);
      }
    }, [h, c]), /* @__PURE__ */ S.jsx(
      qn.input,
      {
        style: { display: "none" },
        name: f,
        form: d,
        ...r,
        ref: p,
        defaultValue: c
      }
    );
  }, "SliderBubbleInput")
);
function zx(n = [], o, r) {
  const i = [...n];
  return i[r] = o, i.sort((c, f) => c - f);
}
Nt(zx, "getNextSortedValues");
function Rm(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return Cm(f, [0, 100]);
}
Nt(Rm, "convertValueToPercentage");
function Dx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
Nt(Dx, "getLabel");
function jx(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), i = Math.min(...r);
  return r.indexOf(i);
}
Nt(jx, "getClosestValueIndex");
function Lx(n, o, r) {
  const i = n / 2, f = Nu([0, 50], [0, i]);
  return (i - f(o) * r) * r;
}
Nt(Lx, "getThumbInBoundsOffset");
function Vx(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
Nt(Vx, "getStepsBetweenValues");
function Ix(n, o) {
  if (o > 0) {
    const r = Vx(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
Nt(Ix, "hasMinStepsBetweenValues");
function Nu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const i = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + i * (r - n[0]);
  };
}
Nt(Nu, "linearScale");
function wm(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [i, c] = o.split("e"), f = i.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
Nt(wm, "getDecimalCount");
function Ss(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
Nt(Ss, "roundValue");
function Hx(n, {
  min: o,
  step: r,
  direction: i,
  multiplier: c
}) {
  const f = wm(r), d = (n - o) / r, m = Math.round(d), p = Ss(m * r + o, f) === Ss(n, f);
  let h;
  return p ? h = m + c * i : i > 0 ? h = Math.ceil(d) : h = Math.floor(d), Ss(h * r + o, f);
}
Nt(Hx, "getNextStepValue");
function Ux(n) {
  return typeof n == "function";
}
Nt(Ux, "isFunction");
var WM = Object.defineProperty, eA = (n, o) => WM(n, "name", { value: o, configurable: !0 }), tA = "Toggle", nA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ eA(function(o, r) {
    const { pressed: i, defaultPressed: c, onPressedChange: f, ...d } = o, [m, p] = ea({
      prop: i,
      onChange: f,
      defaultProp: c ?? !1,
      caller: tA
    });
    return /* @__PURE__ */ S.jsx(
      qn.button,
      {
        type: "button",
        "aria-pressed": m,
        "data-state": m ? "on" : "off",
        "data-disabled": o.disabled ? "" : void 0,
        ...d,
        ref: r,
        onClick: Qn(o.onClick, () => {
          o.disabled || p(!m);
        })
      }
    );
  }, "Toggle")
), lA = Object.defineProperty, Ba = (n, o) => lA(n, "name", { value: o, configurable: !0 }), Ri = "ToggleGroup", [Bx, lN] = /* @__PURE__ */ Pa(Ri, [
  yx
]), Gx = yx(), oA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ba(function(o, r) {
  const { type: i, ...c } = o;
  if (i === "single") {
    const f = c;
    return /* @__PURE__ */ S.jsx(aA, { role: "radiogroup", ...f, ref: r });
  }
  if (i === "multiple") {
    const f = c;
    return /* @__PURE__ */ S.jsx(rA, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${Ri}\``);
}, "ToggleGroup")), [Yx, qx] = Bx(Ri), aA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ba(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ba(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, p] = ea({
    prop: i,
    defaultProp: c ?? "",
    onChange: f,
    caller: Ri
  });
  return /* @__PURE__ */ S.jsx(
    Yx,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => m ? [m] : [], [m]),
      onItemActivate: p,
      onItemDeactivate: b.useCallback(() => p(""), [p]),
      children: /* @__PURE__ */ S.jsx(Px, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), rA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ba(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ba(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, p] = ea({
    prop: i,
    defaultProp: c ?? [],
    onChange: f,
    caller: Ri
  }), h = b.useCallback(
    (x) => p((v = []) => [...v, x]),
    [p]
  ), y = b.useCallback(
    (x) => p((v = []) => v.filter((R) => R !== x)),
    [p]
  );
  return /* @__PURE__ */ S.jsx(
    Yx,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: h,
      onItemDeactivate: y,
      children: /* @__PURE__ */ S.jsx(Px, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [iA, sA] = Bx(Ri), Px = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ba(function(o, r) {
    const {
      __scopeToggleGroup: i,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: m,
      loop: p = !0,
      ...h
    } = o, y = Gx(i), x = zs(m), v = { dir: x, ...h };
    return /* @__PURE__ */ S.jsx(iA, { scope: i, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ S.jsx(
      EM,
      {
        asChild: !0,
        ...y,
        orientation: d,
        dir: x,
        loop: p,
        children: /* @__PURE__ */ S.jsx(qn.div, { ...v, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(qn.div, { ...v, ref: r }) });
  }, "ToggleGroupImpl")
), Yh = "ToggleGroupItem", cA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ba(function(o, r) {
    const i = qx(Yh, o.__scopeToggleGroup), c = sA(Yh, o.__scopeToggleGroup), f = Gx(o.__scopeToggleGroup), d = i.value.includes(o.value), m = c.disabled || o.disabled, p = { ...o, pressed: d, disabled: m }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ S.jsx(
      CM,
      {
        asChild: !0,
        ...f,
        focusable: !m,
        active: d,
        ref: h,
        children: /* @__PURE__ */ S.jsx(rv, { ...p, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(rv, { ...p, ref: r });
  }, "ToggleGroupItem")
), rv = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ba(function(o, r) {
    const { __scopeToggleGroup: i, value: c, ...f } = o, d = qx(Yh, i), m = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, p = d.type === "single" ? m : void 0;
    return /* @__PURE__ */ S.jsx(
      nA,
      {
        ...p,
        ...f,
        ref: r,
        onPressedChange: (h) => {
          h ? d.onItemActivate(c) : d.onItemDeactivate(c);
        }
      }
    );
  }, "ToggleGroupItemImpl")
);
function Xx({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(lw, { "data-slot": "accordion", ...n });
}
function Na({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    ow,
    {
      "data-slot": "accordion-item",
      className: tt("border-b last:border-b-0", n),
      ...o
    }
  );
}
function za({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(aw, { className: "flex", children: /* @__PURE__ */ S.jsxs(
    rw,
    {
      "data-slot": "accordion-trigger",
      className: tt(
        "group/accordion-trigger flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsxs("span", { className: "relative size-3.5 shrink-0", "aria-hidden": !0, children: [
          /* @__PURE__ */ S.jsx(_0, { className: "absolute inset-0 size-3.5 text-muted-foreground transition-[opacity,transform] duration-150 ease-out group-data-[state=open]/accordion-trigger:scale-75 group-data-[state=open]/accordion-trigger:opacity-0" }),
          /* @__PURE__ */ S.jsx(C0, { className: "absolute inset-0 size-3.5 scale-75 text-muted-foreground opacity-0 transition-[opacity,transform] duration-150 ease-out group-data-[state=open]/accordion-trigger:scale-100 group-data-[state=open]/accordion-trigger:opacity-100" })
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
  return /* @__PURE__ */ S.jsx(
    iw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ S.jsx("div", { className: tt("pt-0 pb-4", n), children: o })
    }
  );
}
const iv = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, sv = i0, Vs = (n, o) => (r) => {
  var i;
  if (o?.variants == null) return sv(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const y = r?.[h], x = f?.[h];
    if (y === null) return null;
    const v = iv(y) || iv(x);
    return c[h][v];
  }), m = r && Object.entries(r).reduce((h, y) => {
    let [x, v] = y;
    return v === void 0 || (h[x] = v), h;
  }, {}), p = o == null || (i = o.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((h, y) => {
    let { class: x, className: v, ...R } = y;
    return Object.entries(R).every((_) => {
      let [A, w] = _;
      return Array.isArray(w) ? w.includes({
        ...f,
        ...m
      }[A]) : {
        ...f,
        ...m
      }[A] === w;
    }) ? [
      ...h,
      x,
      v
    ] : h;
  }, []);
  return sv(n, d, p, r?.class, r?.className);
}, uA = Vs(
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
function Ao({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: i = !1,
  ...c
}) {
  const f = i ? nR : "button";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: tt(uA({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function Fx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card",
      className: tt(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        n
      ),
      ...o
    }
  );
}
function Kx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: tt("px-6", n),
      ...o
    }
  );
}
function fA({
  ...n
}) {
  return /* @__PURE__ */ S.jsx($0, { "data-slot": "collapsible", ...n });
}
function dA({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    K0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function hA({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    Z0,
    {
      "data-slot": "collapsible-content",
      ...n
    }
  );
}
function iu({
  controlled: n,
  default: o,
  name: r,
  state: i = "value"
}) {
  const {
    current: c
  } = b.useRef(n !== void 0), [f, d] = b.useState(o), m = c ? n : f, p = b.useCallback((h) => {
    c || d(h);
  }, []);
  return [m, p];
}
const Mm = {
  ...Nr
}, cv = {};
function Dl(n, o) {
  const r = b.useRef(cv);
  return r.current === cv && (r.current = n(o)), r;
}
const ah = Mm.useInsertionEffect, mA = (
  // React 17 doesn't have useInsertionEffect.
  ah && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  ah !== Mm.useLayoutEffect ? ah : (n) => n()
);
function Xe(n) {
  const o = Dl(pA).current;
  return o.next = n, mA(o.effect), o.trampoline;
}
function pA() {
  const n = {
    next: void 0,
    callback: gA,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function gA() {
}
const bA = () => {
}, Ke = typeof document < "u" ? b.useLayoutEffect : bA, Qx = /* @__PURE__ */ b.createContext({
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
function yA() {
  return b.useContext(Qx);
}
function vA(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: i,
    onMapChange: c
  } = n, f = Xe(c), [, d] = b.useState(!1), m = Dl(SA).current, p = Dl(xA).current, h = b.useRef(0), y = b.useRef(!0), x = b.useRef([]), v = b.useRef(null), R = Xe(() => {
    y.current || (y.current = !0, d((j) => !j));
  }), _ = Xe((j, U) => {
    p.set(j, U), R();
  }), A = Xe((j) => {
    p.delete(j), R();
  }), w = Xe((j) => {
    const U = /* @__PURE__ */ new Map();
    return r.current.length = 0, i && (i.current.length = 0), j.forEach((G) => {
      U.set(G.element, {
        ...G.registration.metadata ?? {},
        index: G.index
      }), r.current[G.index] = G.element, i && (i.current[G.index] = G.registration.label !== void 0 ? G.registration.label : G.registration.textRef?.current?.textContent ?? G.element.textContent);
    }), h.current = r.current.length, U;
  });
  function O(j) {
    if (v.current?.disconnect(), v.current = null, typeof MutationObserver != "function" || j.length < 2)
      return;
    const U = new MutationObserver((L) => {
      if (!_A(L))
        return;
      let K = null;
      for (const ie of j)
        if (ie.isConnected) {
          if (K && Zx(K, ie) > 0) {
            U.disconnect(), R();
            return;
          }
          K = ie;
        }
    });
    v.current = U;
    const G = /* @__PURE__ */ new Set();
    for (let L = 1; L < j.length; L += 1) {
      const K = CA(j[L - 1], j[L]);
      K && G.add(K);
    }
    G.forEach((L) => U.observe(L, {
      childList: !0
    }));
  }
  const N = Xe(() => {
    const [j, U] = EA(p), G = w(j);
    O(U), x.current = j, y.current = !1, m.forEach((L) => L(G)), f(G);
  });
  Ke(() => (y.current || w(x.current), () => {
    r.current = [], i && (i.current = []);
  }), [r, i, w]), Ke(() => {
    y.current && N();
  }), Ke(() => () => {
    v.current?.disconnect(), y.current = !0;
  }, []);
  const T = Xe((j) => (m.add(j), () => {
    m.delete(j);
  })), D = b.useMemo(() => ({
    register: _,
    unregister: A,
    subscribeMapChange: T,
    nextIndexRef: h
  }), [_, A, T, h]);
  return /* @__PURE__ */ S.jsx(Qx.Provider, {
    value: D,
    children: o
  });
}
function xA() {
  return /* @__PURE__ */ new Map();
}
function SA() {
  return /* @__PURE__ */ new Set();
}
function EA(n) {
  const o = /* @__PURE__ */ new Set(), r = [], i = [];
  n.forEach((f, d) => {
    if (!d.isConnected)
      return;
    const m = f.index, p = {
      index: m ?? -1,
      element: d,
      registration: f
    };
    m === null ? i.push(p) : m >= 0 && (o.add(m), r.push(p));
  });
  let c = 0;
  return i.sort((f, d) => Zx(f.element, d.element)), i.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, i.map((f) => f.element)];
}
function CA(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function _A(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Zx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function RA(n, o) {
  return function(i, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", i.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${i}; visit ${f} for the full message.`;
  };
}
const Oo = RA("https://base-ui.com/production-error", "Base UI");
function Mr(n, o, r, i) {
  const c = Dl($x).current;
  return MA(c, n, o, r, i) && Jx(c, [n, o, r, i]), c.callback;
}
function wA(n) {
  const o = Dl($x).current;
  return AA(o, n) && Jx(o, n), o.callback;
}
function $x() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function MA(n, o, r, i, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== i || n.refs[3] !== c;
}
function AA(n, o) {
  return n.refs.length !== o.length || n.refs.some((r, i) => r !== o[i]);
}
function Jx(n, o) {
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
const TA = parseInt(b.version, 10);
function Am(n) {
  return TA >= n;
}
function uv(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (Am(19) ? r?.ref : o.ref) ?? null;
}
function qh(n, o) {
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
function Wt() {
}
const mi = Object.freeze([]), yl = Object.freeze({});
function OA(n, o) {
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
function kA(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function NA(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const Tm = {};
function yi(n, o, r, i, c) {
  if (!r && !i && !c && !n)
    return pu(o);
  let f = pu(n);
  return o && (f = xs(f, o)), r && (f = xs(f, r)), i && (f = xs(f, i)), c && (f = xs(f, c)), f;
}
function zA(n) {
  if (n.length === 0)
    return Tm;
  if (n.length === 1)
    return pu(n[0]);
  let o = pu(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = xs(o, n[r]);
  return o;
}
function pu(n) {
  return Om(n) ? {
    ...e1(n, Tm)
  } : DA(n);
}
function xs(n, o) {
  return Om(o) ? e1(o, n) : jA(n, o);
}
function DA(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const i = o[r];
    Wx(r, i) && (o[r] = t1(i));
  }
  return o;
}
function jA(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const i = o[r];
    switch (r) {
      case "style": {
        n[r] = qh(n.style, i);
        break;
      }
      case "className": {
        n[r] = n1(n.className, i);
        break;
      }
      default:
        Wx(r, i) ? n[r] = LA(n[r], i) : n[r] = i;
    }
  }
  return n;
}
function Wx(n, o) {
  const r = n.charCodeAt(0), i = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && i === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function Om(n) {
  return typeof n == "function";
}
function e1(n, o) {
  return Om(n) ? n(o) : n ?? Tm;
}
function LA(n, o) {
  return o ? n ? (...r) => {
    const i = r[0];
    if (l1(i)) {
      const f = i;
      gu(f);
      const d = o(...r);
      return f.baseUIHandlerPrevented || n?.(...r), d;
    }
    const c = o(...r);
    return n?.(...r), c;
  } : t1(o) : n;
}
function t1(n) {
  return n && ((...o) => {
    const r = o[0];
    return l1(r) && gu(r), n(...o);
  });
}
function gu(n) {
  return n.preventBaseUIHandler = () => {
    n.baseUIHandlerPrevented = !0;
  }, n;
}
function n1(n, o) {
  return o ? n ? o + " " + n : o : n;
}
function l1(n) {
  return n != null && typeof n == "object" && "nativeEvent" in n;
}
function Jl(n, o, r = {}) {
  const i = o.render, c = VA(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? yl;
  return UA(n, i, c, f);
}
function VA(n, o = {}) {
  const {
    className: r,
    style: i,
    render: c
  } = n, {
    state: f = yl,
    ref: d,
    props: m,
    stateAttributesMapping: p,
    enabled: h = !0
  } = o, y = h ? kA(r, f) : void 0, x = h ? NA(i, f) : void 0, v = h ? OA(f, p) : yl, R = h && m ? IA(m) : void 0, _ = h ? qh(v, R) ?? {} : yl;
  return typeof document < "u" && (h ? Array.isArray(d) ? _.ref = wA([_.ref, uv(c), ...d]) : _.ref = Mr(_.ref, uv(c), d) : Mr(null, null)), h ? (y !== void 0 && (_.className = n1(_.className, y)), x !== void 0 && (_.style = qh(_.style, x)), _) : yl;
}
function IA(n) {
  return Array.isArray(n) ? zA(n) : yi(void 0, n);
}
const HA = /* @__PURE__ */ Symbol.for("react.lazy");
function UA(n, o, r, i) {
  if (o) {
    if (typeof o == "function")
      return o(r, i);
    const c = yi(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === HA && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return BA(n, r);
  throw new Error(Oo(8));
}
function BA(n, o) {
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
let fv = 0;
function GA(n, o = "mui") {
  const [r, i] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (fv += 1, i(`${o}-${fv}`));
  }, [r, o]), c;
}
const dv = Mm.useId;
function km(n, o) {
  if (dv !== void 0) {
    const r = dv();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return GA(n, o);
}
function zu(n) {
  return km(n, "base-ui");
}
const Kl = "none", o1 = "trigger-press", YA = "trigger-hover", Nm = "outside-press", qA = "item-press", PA = "close-press", hv = "clear-press", Es = "input-change", wo = "input-clear", XA = "input-press", Du = "focus-out", zm = "escape-key", Ph = "list-navigation", Dm = "keyboard", jm = "pointer", FA = "cancel-open";
function Rt(n, o, r, i) {
  let c = !1, f = !1;
  const d = yl;
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
function KA(n, o, r) {
  const i = r ?? yl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...i
  };
}
function a1(n) {
  b.useEffect(n, mi);
}
const Qc = null;
class QA {
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
let Zc = new QA();
class Mo {
  static create() {
    return new Mo();
  }
  static request(o) {
    return Zc.request(o);
  }
  static cancel(o) {
    return Zc.cancel(o);
  }
  currentId = Qc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = Zc.request(() => {
      this.currentId = Qc, o();
    });
  }
  cancel = () => {
    this.currentId !== Qc && (Zc.cancel(this.currentId), this.currentId = Qc);
  };
  disposeEffect = () => this.cancel;
}
function _s() {
  const n = Dl(Mo.create).current;
  return a1(n.disposeEffect), n;
}
function Lm(n, o = !1, r = !1) {
  const [i, c] = b.useState(n && o ? "idle" : void 0), [f, d] = b.useState(n);
  return n && !f && (d(!0), c("starting")), !n && f && i !== "ending" && !r && c("ending"), !n && !f && i === "ending" && c(void 0), Ke(() => {
    if (!n && f && i !== "ending" && r) {
      const m = Mo.request(() => {
        c("ending");
      });
      return () => {
        Mo.cancel(m);
      };
    }
  }, [n, f, i, r]), Ke(() => {
    if (!n || o)
      return;
    const m = Mo.request(() => {
      c(void 0);
    });
    return () => {
      Mo.cancel(m);
    };
  }, [o, n]), Ke(() => {
    if (!n || !o)
      return;
    n && f && i !== "idle" && c("starting");
    const m = Mo.request(() => {
      c("idle");
    });
    return () => {
      Mo.cancel(m);
    };
  }, [o, n, f, i]), {
    mounted: f,
    setMounted: d,
    transitionStatus: i
  };
}
function ZA(n = {}) {
  const {
    guess: o,
    label: r,
    metadata: i,
    textRef: c,
    index: f
  } = n, {
    register: d,
    unregister: m,
    subscribeMapChange: p,
    nextIndexRef: h
  } = yA(), y = b.useRef(-1), [x, v] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const w = h.current;
      h.current += 1, y.current = w;
    }
    return y.current;
  } : -1), R = f ?? x, _ = b.useRef(null), A = b.useCallback((w) => {
    const O = _.current;
    O && m(O), _.current = w, w && d(w, {
      metadata: i ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, m, i, r, c]);
  return Ke(() => {
    if (f == null)
      return p((w) => {
        const O = _.current ? w.get(_.current)?.index : null;
        O != null && v(O);
      });
  }, [f, p]), {
    ref: A,
    index: R
  };
}
let mv = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const $A = {
  "data-starting-style": ""
}, JA = {
  "data-ending-style": ""
}, ju = {
  transitionStatus(n) {
    return n === "starting" ? $A : n === "ending" ? JA : null;
  }
}, WA = /* @__PURE__ */ b.createContext(void 0);
function e2(n = !1) {
  const o = b.useContext(WA);
  if (o === void 0 && !n)
    throw new Error(Oo(16));
  return o;
}
function t2(n) {
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
function ln(n) {
  return n?.ownerDocument || document;
}
function su(n, o, {
  detail: r = 0
} = {}) {
  n.dispatchEvent(new (pn(n)).PointerEvent("click", {
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
function Is(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: i = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), m = e2(!0), p = f ?? m !== void 0, {
    props: h
  } = t2({
    focusableWhenDisabled: r,
    disabled: o,
    composite: p,
    tabIndex: i,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const R = d.current;
    rh(R) && p && o && h.disabled === void 0 && R.disabled && (R.disabled = !1);
  }, [o, h.disabled, p]);
  Ke(y, [y]);
  const x = b.useCallback((R = {}) => {
    const {
      onClick: _,
      onMouseDown: A,
      onKeyUp: w,
      onKeyDown: O,
      onPointerDown: N,
      ...T
    } = R;
    return yi({
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
        if (o || (gu(D), O?.(D), D.baseUIHandlerPrevented))
          return;
        const j = D.target === D.currentTarget, U = D.currentTarget, G = rh(U), L = !c && n2(U), K = j && (c ? G : !L), ie = D.key === "Enter", ue = D.key === " ", W = U.getAttribute("role"), q = W?.startsWith("menuitem") || W === "option" || W === "gridcell";
        if (j && p && ue) {
          if (D.defaultPrevented && q)
            return;
          D.preventDefault(), (!c || G) && (D.preventBaseUIHandler(), su(U, D));
          return;
        }
        if (!K || c || !ue && !ie) {
          j && L && ue && D.preventDefault();
          return;
        }
        D.defaultPrevented || (D.preventDefault(), ie && (D.preventBaseUIHandler(), su(U, D)));
      },
      onKeyUp(D) {
        if (!o) {
          if (gu(D), w?.(D), D.target === D.currentTarget && c && p && rh(D.currentTarget) && D.key === " ") {
            D.preventDefault();
            return;
          }
          D.baseUIHandlerPrevented || D.target === D.currentTarget && !c && !p && !D.defaultPrevented && D.key === " " && (D.preventBaseUIHandler(), su(D.currentTarget, D));
        }
      },
      onPointerDown(D) {
        if (o) {
          D.preventDefault();
          return;
        }
        N?.(D);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, h, T);
  }, [o, h, p, c]), v = Xe((R) => {
    d.current = R, y();
  });
  return {
    getButtonProps: x,
    buttonRef: v
  };
}
function rh(n) {
  return en(n) && n.tagName === "BUTTON";
}
function n2(n) {
  return en(n) && n.tagName === "A" && !!n.href;
}
function Qt(n, o, r, i) {
  return n.addEventListener(o, r, i), () => {
    n.removeEventListener(o, r, i);
  };
}
function bl(n) {
  const o = Dl(l2, n).current;
  return o.next = n, Ke(o.effect), o;
}
function l2(n) {
  const o = {
    current: n,
    next: n,
    effect: () => {
      o.current = o.next;
    }
  };
  return o;
}
function Zo(n) {
  return n == null ? n : "current" in n ? n.current : n;
}
function o2(n, o = !1) {
  const r = _s();
  return Xe((i, c = null) => {
    r.cancel();
    const f = Zo(n);
    if (f == null)
      return;
    const d = f, m = () => {
      Ci.flushSync(i);
    };
    if (typeof d.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      i();
      return;
    }
    function p() {
      Promise.all(d.getAnimations().map((h) => h.finished)).then(() => {
        c?.aborted || m();
      }, () => {
        if (c?.aborted)
          return;
        if (d.getAnimations().some((y) => y.pending || y.playState !== "finished")) {
          p();
          return;
        }
        m();
      });
    }
    if (o) {
      const h = "data-starting-style";
      if (!d.hasAttribute(h)) {
        r.request(p);
        return;
      }
      const y = new MutationObserver(() => {
        d.hasAttribute(h) || (y.disconnect(), p());
      });
      y.observe(d, {
        attributes: !0,
        attributeFilter: [h]
      }), c?.addEventListener("abort", () => y.disconnect(), {
        once: !0
      });
      return;
    }
    r.request(p);
  });
}
function Lu(n) {
  const {
    enabled: o = !0,
    open: r,
    ref: i,
    onComplete: c
  } = n, f = Xe(c), d = o2(i, r);
  b.useEffect(() => {
    if (!o)
      return;
    const m = new AbortController();
    return d(f, m.signal), () => {
      m.abort();
    };
  }, [o, r, f, d]);
}
function a2() {
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
  userAgent: r2,
  platform: i2,
  maxTouchPoints: s2
} = a2(), Vu = r2.toLowerCase(), Rs = i2.toLowerCase(), Hs = /^i(os$|p)/.test(Rs) || Rs === "macintel" && s2 > 1, pv = "android", bu = Rs === pv || Vu.includes(pv), c2 = !Hs && Rs.startsWith("mac");
Rs.startsWith("win");
const u2 = c2 || Hs, jr = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), gv = !jr && Vu.includes("firefox");
!jr && Vu.includes("chrom");
const f2 = u2, r1 = /jsdom|happydom/.test(Vu), ps = 0;
class Ar {
  static create() {
    return new Ar();
  }
  currentId = ps;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(o, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = ps, r();
    }, o);
  }
  isStarted() {
    return this.currentId !== ps;
  }
  clear = () => {
    this.currentId !== ps && (clearTimeout(this.currentId), this.currentId = ps);
  };
  disposeEffect = () => this.clear;
}
function Ga() {
  const n = Dl(Ar.create).current;
  return a1(n.disposeEffect), n;
}
let bv = {}, yv = {}, vv = "";
function Iu(n, o) {
  return Ds(n) ? n : o;
}
function xv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(Iu(o, r)).overflowY);
}
function d2(n) {
  if (typeof document > "u")
    return !1;
  const o = ln(n);
  return pn(o).innerWidth - o.documentElement.clientWidth > 0;
}
function h2(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = ln(n), i = r.documentElement, c = r.body, f = Iu(i, c), d = f.style.overflowY, m = i.style.scrollbarGutter;
  i.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const p = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, i.style.scrollbarGutter = m, p === h;
}
function m2(n) {
  const o = ln(n), r = o.documentElement, i = o.body, c = Iu(r, i), f = {
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
function p2(n) {
  const o = ln(n), r = o.documentElement, i = o.body, c = pn(r);
  let f = 0, d = 0, m = !1;
  const p = Mo.create();
  if (jr && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const R = c.getComputedStyle(r), _ = c.getComputedStyle(i), O = (R.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, bv = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, vv = r.style.scrollBehavior, yv = {
      position: i.style.position,
      height: i.style.height,
      width: i.style.width,
      boxSizing: i.style.boxSizing,
      overflowY: i.style.overflowY,
      overflowX: i.style.overflowX,
      scrollBehavior: i.style.scrollBehavior
    };
    const N = r.scrollHeight > r.clientHeight, T = r.scrollWidth > r.clientWidth, D = R.overflowY === "scroll" || _.overflowY === "scroll", j = R.overflowX === "scroll" || _.overflowX === "scroll", U = Math.max(0, c.innerWidth - i.clientWidth), G = Math.max(0, c.innerHeight - i.clientHeight), L = parseFloat(_.marginTop) + parseFloat(_.marginBottom), K = parseFloat(_.marginLeft) + parseFloat(_.marginRight), ie = Iu(r, i);
    if (m = h2(n), m) {
      r.style.scrollbarGutter = O, ie.style.overflowY = "hidden", ie.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: O,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (N || D) && (r.style.overflowY = "scroll"), (T || j) && (r.style.overflowX = "scroll"), Object.assign(i.style, {
      position: "relative",
      height: L || G ? `calc(100dvh - ${L + G}px)` : "100dvh",
      width: K || U ? `calc(100vw - ${K + U}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), i.scrollTop = f, i.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function y() {
    Object.assign(r.style, bv), Object.assign(i.style, yv), m || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = vv);
  }
  function x() {
    y(), p.request(h);
  }
  h();
  const v = Qt(c, "resize", x);
  return () => {
    p.cancel(), y(), typeof c.removeEventListener == "function" && v();
  };
}
class g2 {
  lockCount = 0;
  restore = null;
  timeoutLock = Ar.create();
  timeoutUnlock = Ar.create();
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
    const r = ln(o), i = r.documentElement, c = r.body, f = pn(i);
    if (xv(f, i, c)) {
      const m = new f.MutationObserver(() => {
        xv(f, i, c) || (m.disconnect(), this.restore = null, this.lock(o));
      }), p = {
        attributes: !0
      };
      m.observe(i, p), m.observe(c, p), this.restore = () => m.disconnect();
      return;
    }
    const d = Hs || !d2(o);
    this.restore = d ? m2(o) : p2(o);
  }
}
const b2 = new g2();
function y2(n = !0, o = null) {
  Ke(() => {
    if (n)
      return b2.acquire(o);
  }, [n, o]);
}
function jn(n) {
  n.preventDefault(), n.stopPropagation();
}
function v2(n) {
  return "nativeEvent" in n;
}
function i1(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : bu && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function Vm(n) {
  return r1 ? !1 : !bu && n.width === 0 && n.height === 0 || bu && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function ih(n, o) {
  return ["mouse", "pen"].includes(n);
}
function x2(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const Xh = "data-base-ui-focusable", S2 = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", Cr = "ArrowLeft", _r = "ArrowRight", Im = "ArrowUp", Hu = "ArrowDown";
function Fl(n) {
  let o = n.activeElement;
  for (; o?.shadowRoot?.activeElement != null; )
    o = o.shadowRoot.activeElement;
  return o;
}
function ft(n, o) {
  if (!n || !o)
    return !1;
  const r = o.getRootNode?.();
  if (n.contains(o))
    return !0;
  if (r && Si(r)) {
    let i = o;
    for (; i; ) {
      if (n === i)
        return !0;
      i = i.parentNode || i.host;
    }
  }
  return !1;
}
function zl(n) {
  return "composedPath" in n ? n.composedPath()[0] : n.target;
}
function sh(n, o) {
  if (o == null)
    return !1;
  if ("composedPath" in n)
    return n.composedPath().includes(o);
  const r = n;
  return r.target != null && o.contains(r.target);
}
function E2(n) {
  return n.matches("html,body");
}
function Hm(n) {
  return en(n) && n.matches(S2);
}
function Fh(n) {
  return n ? n.getAttribute("role") === "combobox" && Hm(n) : !1;
}
function Kh(n) {
  return n ? n.hasAttribute(Xh) ? n : n.querySelector(`[${Xh}]`) || n : null;
}
function vi(...n) {
  return () => {
    for (let o = 0; o < n.length; o += 1) {
      const r = n[o];
      r && r();
    }
  };
}
const s1 = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, Um = {
  ...s1,
  position: "fixed",
  top: 0,
  left: 0
}, Bm = {
  ...s1,
  position: "absolute"
}, yu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [i, c] = b.useState();
  Ke(() => {
    f2 && jr && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: i
  };
  return /* @__PURE__ */ S.jsx("span", {
    ...o,
    ref: r,
    style: Um,
    "aria-hidden": i ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function $c(n, o, r) {
  return Math.floor(n / o) !== r;
}
function ws(n, o) {
  return o < 0 || o >= n.length;
}
function ch(n, o) {
  return ol(n.current, {
    disabledIndices: o
  });
}
function Sv(n, o) {
  return ol(n.current, {
    decrement: !0,
    startingIndex: n.current.length,
    disabledIndices: o
  });
}
function ol(n, {
  startingIndex: o = -1,
  decrement: r = !1,
  disabledIndices: i,
  amount: c = 1
} = {}) {
  let f = o;
  do
    f += r ? -c : c;
  while (f >= 0 && f <= n.length - 1 && vu(n, f, i));
  return f;
}
function C2(n, {
  event: o,
  orientation: r,
  loopFocus: i,
  onLoop: c,
  rtl: f,
  cols: d,
  disabledIndices: m,
  minIndex: p,
  maxIndex: h,
  prevIndex: y,
  stopEvent: x = !1
}) {
  let v = y, R;
  if (o.key === Im ? R = "up" : o.key === Hu && (R = "down"), R) {
    const _ = [], A = [];
    let w = !1, O = 0;
    {
      let K = null, ie = -1;
      n.forEach((ue, W) => {
        if (ue == null)
          return;
        O += 1;
        const q = ue.closest('[role="row"]');
        q && (w = !0), (q !== K || ie === -1) && (K = q, ie += 1, _[ie] = []), _[ie].push(W), A[W] = ie;
      });
    }
    let N = !1, T = 0;
    if (w)
      for (const K of _) {
        const ie = K.length;
        ie > T && (T = ie), ie !== d && (N = !0);
      }
    const D = N && O < n.length, j = T || d, U = (K) => {
      if (!N || y === -1)
        return;
      const ie = A[y];
      if (ie == null)
        return;
      const ue = _[ie].indexOf(y), W = K === "up" ? -1 : 1;
      for (let q = ie + W, se = 0; se < _.length; se += 1, q += W) {
        if (q < 0 || q >= _.length) {
          if (!i || D)
            return;
          if (q = q < 0 ? _.length - 1 : 0, c) {
            const H = Math.min(ue, _[q].length - 1), B = _[q][H] ?? _[q][0], Q = c(o, y, B);
            q = A[Q] ?? q;
          }
        }
        const ge = _[q];
        for (let H = Math.min(ue, ge.length - 1); H >= 0; H -= 1) {
          const B = ge[H];
          if (!vu(n, B, m))
            return B;
        }
      }
    }, G = (K) => {
      if (!D || y === -1)
        return;
      const ie = y % j, ue = K === "up" ? -j : j, W = h - h % j, q = Er(h / j) + 1;
      for (let se = y - ie + ue, ge = 0; ge < q; ge += 1, se += ue) {
        if (se < 0 || se > h) {
          if (!i)
            return;
          se = se < 0 ? W : 0;
        }
        const H = Math.min(se + j - 1, h);
        for (let B = Math.min(se + ie, H); B >= se; B -= 1)
          if (!vu(n, B, m))
            return B;
      }
    };
    x && jn(o);
    const L = U(R) ?? G(R);
    if (L !== void 0)
      v = L;
    else if (y === -1)
      v = R === "up" ? h : p;
    else if (v = ol(n, {
      startingIndex: y,
      amount: j,
      decrement: R === "up",
      disabledIndices: m
    }), i) {
      if (R === "up" && (y - j < p || v < 0)) {
        const K = y % j, ie = h % j, ue = h - (ie - K);
        ie === K ? v = h : v = ie > K ? ue : ue - j, c && (v = c(o, y, v));
      }
      R === "down" && y + j > h && (v = ol(n, {
        startingIndex: y % j - j,
        amount: j,
        disabledIndices: m
      }), c && (v = c(o, y, v)));
    }
    ws(n, v) && (v = y);
  }
  if (r === "both") {
    const _ = Er(y / d);
    o.key === (f ? Cr : _r) && (x && jn(o), y % d !== d - 1 ? (v = ol(n, {
      startingIndex: y,
      disabledIndices: m
    }), i && $c(v, d, _) && (v = ol(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v)))) : i && (v = ol(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v))), $c(v, d, _) && (v = y)), o.key === (f ? _r : Cr) && (x && jn(o), y % d !== 0 ? (v = ol(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: m
    }), i && $c(v, d, _) && (v = ol(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (v = c(o, y, v)))) : i && (v = ol(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (v = c(o, y, v))), $c(v, d, _) && (v = y));
    const A = Er(h / d) === _;
    ws(n, v) && (i && A ? (v = o.key === (f ? _r : Cr) ? h : ol(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v))) : v = y);
  }
  return v;
}
function vu(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !Uu(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function _2(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function Uu(n, o = n ? vl(n) : null) {
  return !n || !n.isConnected || !o || _2(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const R2 = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function w2(n) {
  const o = n.assignedSlot;
  if (o)
    return o;
  if (n.parentElement)
    return n.parentElement;
  const r = n.getRootNode();
  return Si(r) ? r.host : null;
}
function Qh(n) {
  for (const o of Array.from(n.children))
    if (Pn(o) === "summary")
      return o;
  return null;
}
function M2(n, o) {
  const r = Qh(o);
  return !!r && (n === r || ft(r, n));
}
function c1(n) {
  const o = n ? Pn(n) : "";
  return n != null && n.matches(R2) && (o !== "summary" || n.parentElement != null && Pn(n.parentElement) === "details" && Qh(n.parentElement) === n) && (o !== "details" || Qh(n) == null) && (o !== "input" || n.type !== "hidden");
}
function u1(n) {
  if (!c1(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = w2(o)) {
    const r = o !== n, i = Pn(o) === "slot";
    if (o.hasAttribute("inert") || r && Pn(o) === "details" && !o.open && !M2(n, o) || o.hasAttribute("hidden") || !i && !A2(o, r))
      return !1;
  }
  return !0;
}
function A2(n, o) {
  const r = vl(n);
  return o ? r.display !== "none" : Uu(n, r);
}
function f1(n) {
  const o = n.tabIndex;
  if (o < 0) {
    const r = Pn(n);
    if (r === "details" || r === "audio" || r === "video" || en(n) && n.isContentEditable)
      return 0;
  }
  return o;
}
function uh(n) {
  if (Pn(n) !== "input")
    return null;
  const o = n;
  return o.type === "radio" && o.name !== "" ? o : null;
}
function T2(n, o) {
  const r = uh(n);
  if (!r)
    return !0;
  const i = o.find((c) => {
    const f = uh(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return i ? i === r : o.find((c) => {
    const f = uh(c);
    return f?.name === r.name && f.form === r.form;
  }) === r;
}
function d1(n) {
  if (en(n) && Pn(n) === "slot") {
    const o = n.assignedElements({
      flatten: !0
    });
    if (o.length > 0)
      return o;
  }
  return en(n) && n.shadowRoot ? Array.from(n.shadowRoot.children) : Array.from(n.children);
}
function h1(n, o) {
  d1(n).forEach((r) => {
    c1(r) && o.push(r), h1(r, o);
  });
}
function m1(n, o, r) {
  d1(n).forEach((i) => {
    en(i) && i.matches(o) && r.push(i), m1(i, o, r);
  });
}
function Gm(n) {
  return u1(n) && f1(n) >= 0;
}
function p1(n) {
  const o = [];
  return h1(n, o), o.filter(u1);
}
function Bu(n) {
  const o = p1(n);
  return o.filter((r) => f1(r) >= 0 && T2(r, o));
}
function g1(n, o) {
  const r = Bu(n), i = r.length;
  if (i === 0)
    return;
  const c = Fl(ln(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : i - 1 : f + o;
  return r[d];
}
function b1(n) {
  return g1(ln(n).body, 1) || n;
}
function y1(n) {
  return g1(ln(n).body, -1) || n;
}
function Cs(n, o) {
  const r = o || n.currentTarget, i = n.relatedTarget;
  return !i || !ft(r, i);
}
function O2(n) {
  Bu(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function Ev(n) {
  const o = [];
  m1(n, "[data-tabindex]", o), o.forEach((r) => {
    const i = r.dataset.tabindex;
    delete r.dataset.tabindex, i ? r.setAttribute("tabindex", i) : r.removeAttribute("tabindex");
  });
}
function Ms(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...Ms(n, c.id, r)]);
}
function Cv(n, o) {
  let r = [], i = n.find((c) => c.id === o)?.parentId;
  for (; i; ) {
    const c = n.find((f) => f.id === i);
    i = c?.parentId, c && (r = r.concat(c));
  }
  return r;
}
function xu(n) {
  return `data-base-ui-${n}`;
}
let Jc = 0;
function cu(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: i = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(Jc);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (i)
    return f(), Wt;
  const d = requestAnimationFrame(f);
  return Jc = d, () => {
    Jc === d && (cancelAnimationFrame(d), Jc = 0);
  };
}
const fh = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, _v = "data-base-ui-inert", Zh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let gs = /* @__PURE__ */ new WeakMap(), dh = 0;
function k2(n) {
  return Zh[n];
}
function v1(n) {
  return n ? Si(n) ? n.host : v1(n.parentNode) : null;
}
const Rv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const i = v1(r);
  return n.contains(i) ? i : null;
}).filter((r) => r != null), wv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let i = r;
    for (; i && !o.has(i); )
      o.add(i), i = i.parentNode;
  }), o;
}, Mv = (n, o, r) => {
  const i = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      Pn(d) !== "script" && (o.has(d) ? c(d) : i.push(d));
    });
  };
  return c(n), i;
};
function N2(n, o, r, i, {
  mark: c = !0
}) {
  let f = null;
  i ? f = "inert" : r && (f = "aria-hidden");
  let d = null, m = null;
  const p = Rv(o, n), h = c ? Mv(o, wv(p), new Set(p)) : [], y = [], x = [];
  if (f) {
    const v = fh[f], R = k2(f);
    m = R, d = v;
    const _ = Rv(o, Array.from(o.querySelectorAll("[aria-live]"))), A = p.concat(_);
    Mv(o, wv(A), new Set(A)).forEach((O) => {
      const N = O.getAttribute(f), T = N !== null && N !== "false", D = (v.get(O) || 0) + 1;
      v.set(O, D), y.push(O), D === 1 && T && R.add(O), T || O.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((v) => {
    const R = (gs.get(v) || 0) + 1;
    gs.set(v, R), x.push(v), R === 1 && v.setAttribute(_v, "");
  }), dh += 1, () => {
    d && y.forEach((v) => {
      const _ = (d.get(v) || 0) - 1;
      d.set(v, _), _ || (!m?.has(v) && f && v.removeAttribute(f), m?.delete(v));
    }), c && x.forEach((v) => {
      const R = (gs.get(v) || 0) - 1;
      gs.set(v, R), R || v.removeAttribute(_v);
    }), dh -= 1, dh || (fh.inert = /* @__PURE__ */ new WeakMap(), fh["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Zh.inert = /* @__PURE__ */ new WeakSet(), Zh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), gs = /* @__PURE__ */ new WeakMap());
  };
}
function Av(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: i = !1,
    mark: c = !0
  } = o, f = ln(n[0]).body;
  return N2(n, f, r, i, {
    mark: c
  });
}
const z2 = {
  style: {
    transition: "none"
  }
}, D2 = "data-base-ui-click-trigger", j2 = {
  fallbackAxisSide: "none"
}, L2 = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, x1 = /* @__PURE__ */ b.createContext(null), S1 = () => b.useContext(x1), V2 = xu("portal");
function I2(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: i = yl,
    elementProps: c
  } = n, f = km(), m = S1()?.portalNode, [p, h] = b.useState(null), [y, x] = b.useState(null), v = Xe((w) => {
    w !== null && x(w);
  }), R = b.useRef(null);
  Ke(() => {
    if (r === null) {
      R.current && (R.current = null, x(null), h(null));
      return;
    }
    const w = (r && (bm(r) ? r : r.current)) ?? m ?? document.body;
    if (w == null) {
      R.current && (R.current = null, x(null), h(null));
      return;
    }
    R.current !== w && (R.current = w, x(null), h(w));
  }, [r, m]);
  const _ = Jl("div", i, {
    ref: [o, v],
    props: [{
      id: f,
      [V2]: ""
    }, c]
  }), A = p && _ ? /* @__PURE__ */ Ci.createPortal(_, p) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(_) ? _.props.id : void 0,
    subtree: A
  };
}
const H2 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    children: d,
    container: m,
    ...p
  } = o, {
    node: h,
    nodeId: y,
    subtree: x
  } = I2({
    container: m,
    ref: r,
    componentProps: o,
    elementProps: p
  }), v = b.useRef(null), R = b.useRef(null), _ = b.useRef(null), A = b.useRef(null), [w, O] = b.useState(null), N = b.useRef(!1), T = w?.modal, D = w?.open, j = !!w && !w.modal && w.open && !!h;
  b.useEffect(() => {
    if (!h || T)
      return;
    function G(L) {
      h && L.relatedTarget && Cs(L) && (L.type === "focusin" ? N.current && (Ev(h), N.current = !1) : (O2(h), N.current = !0));
    }
    return vi(Qt(h, "focusin", G, !0), Qt(h, "focusout", G, !0));
  }, [h, T]), Ke(() => {
    !h || D !== !0 || !N.current || (Ev(h), N.current = !1);
  }, [D, h]);
  const U = b.useMemo(() => ({
    beforeOutsideRef: v,
    afterOutsideRef: R,
    beforeInsideRef: _,
    afterInsideRef: A,
    portalNode: h,
    setFocusManagerState: O
  }), [h]);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [x, /* @__PURE__ */ S.jsxs(x1.Provider, {
      value: U,
      children: [j && h && /* @__PURE__ */ S.jsx(yu, {
        "data-type": "outside",
        ref: v,
        onFocus: (G) => {
          if (Cs(G, h))
            _.current?.focus();
          else {
            const L = w ? w.domReference : null;
            y1(L)?.focus();
          }
        }
      }), j && h && /* @__PURE__ */ S.jsx("span", {
        "aria-owns": y,
        style: L2
      }), h && /* @__PURE__ */ Ci.createPortal(d, h), j && h && /* @__PURE__ */ S.jsx(yu, {
        "data-type": "outside",
        ref: R,
        onFocus: (G) => {
          if (Cs(G, h))
            A.current?.focus();
          else {
            const L = w ? w.domReference : null;
            b1(L)?.focus(), w?.closeOnFocusOut && w?.onOpenChange(!1, Rt(Du, G.nativeEvent));
          }
        }
      })]
    })]
  });
});
function U2() {
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
const B2 = /* @__PURE__ */ b.createContext(null), G2 = /* @__PURE__ */ b.createContext(null), E1 = () => b.useContext(B2)?.id || null, Gu = (n) => {
  const o = b.useContext(G2);
  return n ?? o;
};
function Y2(n, o) {
  const r = pn(zl(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const Tv = 20;
let ja = [];
function Ym() {
  ja = ja.filter((n) => n.deref()?.isConnected);
}
function Ov(n) {
  Ym(), n && Pn(n) !== "body" && (ja.push(new WeakRef(n)), ja.length > Tv && (ja = ja.slice(-Tv)));
}
function kv() {
  return Ym(), ja[ja.length - 1]?.deref();
}
function q2(n) {
  return n ? Gm(n) ? n : Bu(n)[0] || n : null;
}
function Nv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = p1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return Gm(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), i = n.getAttribute("tabindex");
  r.length === 0 ? i !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (i !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function P2(n) {
  const {
    context: o,
    children: r,
    disabled: i = !1,
    initialFocus: c = !0,
    returnFocus: f = !0,
    restoreFocus: d = !1,
    modal: m = !0,
    closeOnFocusOut: p = !0,
    openInteractionType: h = "",
    nextFocusableElement: y,
    previousFocusableElement: x,
    beforeContentFocusGuardRef: v,
    externalTree: R,
    getInsideElements: _
  } = n, A = "rootStore" in o ? o.rootStore : o, w = A.useState("open"), O = A.useState("domReferenceElement"), N = A.useState("floatingElement"), {
    events: T,
    dataRef: D
  } = A.context, j = Xe(() => D.current.floatingContext?.nodeId), U = c === !1, G = Fh(O) && U, L = bl(c), K = bl(f), ie = bl(h), ue = bl(w), W = Gu(R), q = S1(), se = b.useRef(!1), ge = b.useRef(!1), H = b.useRef(!1), B = b.useRef(null), Q = b.useRef(""), ye = b.useRef(""), ce = b.useRef(null), z = b.useRef(null), P = Mr(ce, v, q?.beforeInsideRef), te = Mr(z, q?.afterInsideRef), ae = Ga(), be = Ga(), we = _s(), Ge = q != null, Ae = Kh(N), Oe = Xe((ze = Ae) => ze ? Bu(ze) : []), it = Xe(() => _?.().filter((ze) => ze != null) ?? []);
  b.useEffect(() => {
    if (i || !m)
      return;
    function ze(je) {
      je.key === "Tab" && ft(Ae, Fl(ln(Ae))) && Oe().length === 0 && !G && jn(je);
    }
    const Je = ln(Ae);
    return Qt(Je, "keydown", ze);
  }, [i, Ae, m, G, Oe]), b.useEffect(() => {
    if (i || !w)
      return;
    const ze = ln(Ae);
    function Je() {
      H.current = !1;
    }
    function je(qe) {
      const De = zl(qe), nt = it(), Le = ft(N, De) || ft(O, De) || ft(q?.portalNode, De) || nt.some((et) => et === De || ft(et, De));
      H.current = !Le, ye.current = qe.pointerType || "keyboard", De?.closest(`[${D2}]`) && (ge.current = !0, be.start(0, () => {
        ge.current = !1;
      }));
    }
    function We() {
      ye.current = "keyboard";
    }
    return vi(
      Qt(ze, "pointerdown", je, !0),
      Qt(ze, "pointerup", Je, !0),
      Qt(ze, "pointercancel", Je, !0),
      Qt(ze, "keydown", We, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      Je
    );
  }, [i, N, O, Ae, w, q, be, it]), b.useEffect(() => {
    if (i || !p)
      return;
    const ze = ln(Ae);
    function Je() {
      ge.current = !0, be.start(0, () => {
        ge.current = !1;
      });
    }
    function je(nt) {
      const Le = zl(nt);
      Gm(Le) && (B.current = Le);
    }
    function We(nt) {
      const Le = nt.relatedTarget, et = nt.currentTarget, st = zl(nt);
      m && Le == null && st != null && ft(N, st) && Ov(st), queueMicrotask(() => {
        const lt = j(), Ce = A.context.triggerElements, Z = it(), de = Le?.hasAttribute(xu("focus-guard")) && [ce.current, z.current, q?.beforeInsideRef.current, q?.afterInsideRef.current, q?.beforeOutsideRef.current, q?.afterOutsideRef.current, Zo(x), Zo(y)].includes(Le), Te = !(ft(O, Le) || ft(N, Le) || ft(Le, N) || ft(q?.portalNode, Le) || Z.some((Ee) => Ee === Le || ft(Ee, Le)) || Ce.hasMatchingElement((Ee) => ft(Ee, Le)) || de || W && (Ms(W.nodesRef.current, lt).find((Ee) => ft(Ee.context?.elements.floating, Le) || ft(Ee.context?.elements.domReference, Le)) || Cv(W.nodesRef.current, lt).find((Ee) => [Ee.context?.elements.floating, Kh(Ee.context?.elements.floating)].includes(Le) || Ee.context?.elements.domReference === Le)));
        if (et === O && Ae && Nv(Ae), d && et !== O && !Uu(st) && Fl(ze) === ze.body) {
          if (en(Ae) && (Ae.focus(), d === "popup")) {
            we.request(() => {
              Ae.focus();
            });
            return;
          }
          const Ee = Oe(), Ie = B.current, Ze = (Ie && Ee.includes(Ie) ? Ie : null) || Ee[Ee.length - 1] || Ae;
          en(Ze) && Ze.focus();
        }
        if (D.current.insideReactTree) {
          D.current.insideReactTree = !1;
          return;
        }
        (G || !m) && Le && Te && !ge.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (G || Le !== kv()) && (se.current = !0, A.setOpen(!1, Rt(Du, nt)));
      });
    }
    function qe() {
      H.current || (D.current.insideReactTree = !0, ae.start(0, () => {
        D.current.insideReactTree = !1;
      }));
    }
    const De = en(O) ? O : null;
    if (!(!N && !De))
      return vi(De && Qt(De, "focusout", We), De && Qt(De, "pointerdown", Je), N && Qt(N, "focusin", je), N && Qt(N, "focusout", We), N && q && Qt(N, "focusout", qe, !0));
  }, [i, O, N, Ae, m, W, q, A, p, d, Oe, G, j, D, ae, be, we, y, x, it]), b.useEffect(() => {
    if (i || !N || !w)
      return;
    const ze = Array.from(q?.portalNode?.querySelectorAll(`[${xu("portal")}]`) || []), je = (W ? Cv(W.nodesRef.current, j()) : []).find((et) => Fh(et.context?.elements.domReference || null))?.context?.elements.domReference, qe = [...[N, ...ze, ce.current, z.current, q?.beforeOutsideRef.current, q?.afterOutsideRef.current, ...it()], je, Zo(x), Zo(y), G ? O : null].filter((et) => et != null), De = Av(qe, {
      ariaHidden: m || G,
      mark: !1
    }), nt = [N, ...ze].filter((et) => et != null), Le = Av(nt);
    return () => {
      Le(), De();
    };
  }, [w, i, O, N, m, q, G, W, j, y, x, it]), Ke(() => {
    if (!w || i || !en(Ae))
      return;
    Q.current = "", ye.current = "";
    const ze = ln(Ae), Je = Fl(ze);
    queueMicrotask(() => {
      const je = L.current, We = typeof je == "function" ? je(ie.current || "") : je;
      if (We === void 0 || We === !1 || ft(Ae, Je))
        return;
      let De = null;
      const nt = () => (De == null && (De = Oe(Ae)), De[0] || Ae);
      let Le;
      We === !0 || We === null ? Le = nt() : Le = Zo(We), Le = Le || nt();
      const et = ft(Ae, Fl(ze));
      cu(Le, {
        preventScroll: Le === Ae,
        shouldFocus() {
          if (!ue.current)
            return !1;
          if (et)
            return !0;
          const st = Fl(ze);
          return !(st !== Le && ft(Ae, st));
        }
      });
    });
  }, [i, w, Ae, Oe, L, ie, ue]), Ke(() => {
    if (i || !Ae)
      return;
    const ze = ln(Ae), Je = Fl(ze), je = ie.current == null;
    Ov(Je);
    function We(De) {
      if (De.open || (Q.current = Y2(De.nativeEvent, ye.current)), De.reason === YA && De.nativeEvent.type === "mouseleave" && (se.current = !0), De.reason === Nm)
        if (De.nested)
          se.current = !1;
        else if (i1(De.nativeEvent) || Vm(De.nativeEvent))
          se.current = !1;
        else {
          let nt = !1;
          ln(Ae).createElement("div").focus({
            get preventScroll() {
              return nt = !0, !1;
            }
          }), nt ? se.current = !1 : se.current = !0;
        }
    }
    T.on("openchange", We);
    function qe(De) {
      const nt = K.current;
      let Le = typeof nt == "function" ? nt(De) : nt;
      if (Le === void 0 || Le === !1)
        return null;
      Le === null && (Le = !0);
      const et = O?.isConnected ? O : null, st = Je?.isConnected && Pn(Je) !== "body" ? Je : null;
      let lt = je ? st || et : et || st;
      return lt || (lt = kv() || null), typeof Le == "boolean" ? lt : Zo(Le) || lt || null;
    }
    return () => {
      T.off("openchange", We);
      const De = Fl(ze), nt = it(), Le = ft(N, De) || nt.some((Ce) => Ce === De || ft(Ce, De)) || W && Ms(W.nodesRef.current, j(), !1).some((Ce) => ft(Ce.context?.elements.floating, De)), et = K.current, st = Q.current, lt = qe(st);
      queueMicrotask(() => {
        const Ce = q2(lt), Z = typeof et != "boolean";
        if (et && !se.current && en(Ce) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!Z && Ce !== De && De !== ze.body) || Le)) {
          const de = {
            preventScroll: !0
          };
          st === "keyboard" && (de.focusVisible = !0), Ce.focus(de);
        }
        se.current = !1;
      });
    };
  }, [i, N, Ae, K, ie, T, W, O, j, it]), Ke(() => {
    if (!jr || w || !N)
      return;
    const ze = Fl(ln(N));
    !en(ze) || !Hm(ze) || ft(N, ze) && ze.blur();
  }, [w, N]), Ke(() => {
    if (!(i || !q))
      return q.setFocusManagerState({
        modal: m,
        closeOnFocusOut: p,
        open: w,
        onOpenChange: A.setOpen,
        domReference: O
      }), () => {
        q.setFocusManagerState(null);
      };
  }, [i, q, m, w, A, p, O]), Ke(() => {
    if (!(i || !Ae))
      return Nv(Ae), () => {
        queueMicrotask(Ym);
      };
  }, [i, Ae]);
  const gt = !i && (m ? !G : !0) && (Ge || m);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [gt && /* @__PURE__ */ S.jsx(yu, {
      "data-type": "inside",
      ref: P,
      onFocus: (ze) => {
        if (m) {
          const Je = Oe();
          cu(Je[Je.length - 1]);
        } else q?.portalNode && (se.current = !1, Cs(ze, q.portalNode) ? b1(O)?.focus() : Zo(x ?? q.beforeOutsideRef)?.focus());
      }
    }), r, gt && /* @__PURE__ */ S.jsx(yu, {
      "data-type": "inside",
      ref: te,
      onFocus: (ze) => {
        m ? cu(Oe()[0]) : q?.portalNode && (p && (se.current = !0), Cs(ze, q.portalNode) ? y1(O)?.focus() : Zo(y ?? q.afterOutsideRef)?.focus());
      }
    })]
  });
}
function C1(n, o = {}) {
  const {
    enabled: r = !0,
    event: i = "click",
    toggle: c = !0,
    ignoreMouse: f = !1,
    stickIfOpen: d = !0,
    touchOpenDelay: m = 0,
    reason: p = o1
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.context.dataRef, x = b.useRef(void 0), v = _s(), R = Ga(), _ = b.useMemo(() => {
    function A(O, N, T, D) {
      const j = Rt(p, N, T);
      O && D === "touch" && m > 0 ? R.start(m, () => {
        h.setOpen(!0, j);
      }) : h.setOpen(O, j);
    }
    function w(O, N, T) {
      const D = y.current.openEvent, j = h.select("domReferenceElement") !== N;
      return O && j || !O || !c ? !0 : D && d ? !T(D.type) : !1;
    }
    return {
      onPointerDown(O) {
        x.current = ih(O.pointerType) && Vm(O.nativeEvent) ? "virtual" : O.pointerType;
      },
      onMouseDown(O) {
        const N = x.current, T = O.nativeEvent, D = h.select("open");
        if (O.button !== 0 || i === "click" || ih(N) && f)
          return;
        const j = w(D, O.currentTarget, (L) => L === "click" || L === "mousedown"), U = zl(T);
        if (Hm(U)) {
          A(j, T, U, N);
          return;
        }
        const G = O.currentTarget;
        v.request(() => {
          A(j, T, G, N);
        });
      },
      onClick(O) {
        if (i === "mousedown-only")
          return;
        const N = x.current;
        if (i === "mousedown" && N) {
          x.current = void 0;
          return;
        }
        if (ih(N) && f)
          return;
        const T = h.select("open"), D = w(T, O.currentTarget, (j) => j === "click" || j === "mousedown" || j === "keydown" || j === "keyup");
        A(D, O.nativeEvent, O.currentTarget, N);
      },
      onKeyDown() {
        x.current = void 0;
      }
    };
  }, [y, i, f, p, h, d, c, v, R, m]);
  return b.useMemo(() => r ? {
    reference: _
  } : yl, [r, _]);
}
function X2() {
  return !1;
}
function F2(n) {
  return {
    escapeKey: typeof n == "boolean" ? n : n?.escapeKey ?? !1,
    outsidePress: typeof n == "boolean" ? n : n?.outsidePress ?? !0
  };
}
function K2(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: i = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = X2,
    bubbles: m,
    externalTree: p
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.useState("open"), x = h.useState("floatingElement"), {
    dataRef: v
  } = h.context, R = Gu(p), _ = Xe(typeof c == "function" ? c : () => !1), A = typeof c == "function" ? _ : c, w = A !== !1, O = Xe(() => f), {
    escapeKey: N,
    outsidePress: T
  } = F2(m), D = b.useRef(!1), j = b.useRef(!1), U = b.useRef(!1), G = b.useRef(!1), L = b.useRef(""), K = b.useRef(null), ie = Ga(), ue = Ga(), W = Xe(() => {
    ue.clear(), v.current.insideReactTree = !1;
  }), q = Xe((P) => {
    const te = v.current.floatingContext?.nodeId;
    return (R ? Ms(R.nodesRef.current, te) : []).some((be) => be.context?.open && !be.context.dataRef.current[P]);
  }), se = Xe((P) => sh(P, h.select("floatingElement")) || sh(P, h.select("domReferenceElement"))), ge = Xe((P) => {
    d() && h.setOpen(!1, Rt(o1, P.nativeEvent));
  }), H = Xe((P) => {
    if (!y || !r || !i || P.key !== "Escape" || G.current || !N && q("__escapeKeyBubbles"))
      return;
    const te = v2(P) ? P.nativeEvent : P, ae = Rt(zm, te);
    h.setOpen(!1, ae), ae.isCanceled || P.preventDefault(), !N && !ae.isPropagationAllowed && P.stopPropagation();
  }), B = Xe(() => {
    v.current.insideReactTree = !0, ue.start(0, W);
  }), Q = Xe((P) => {
    if (!y || !r || P.button !== 0)
      return;
    const te = zl(P.nativeEvent);
    ft(h.select("floatingElement"), te) && (D.current || (D.current = !0, j.current = !1));
  }), ye = Xe((P) => {
    !y || !r || (P.defaultPrevented || P.nativeEvent.defaultPrevented) && D.current && (j.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return W;
    v.current.__escapeKeyBubbles = N, v.current.__outsidePressBubbles = T;
    const P = new Ar(), te = new Ar();
    function ae() {
      P.clear(), G.current = !0;
    }
    function be() {
      P.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        jr ? 5 : 0,
        () => {
          G.current = !1;
        }
      );
    }
    function we() {
      U.current = !0, te.start(0, () => {
        U.current = !1;
      });
    }
    function Ge() {
      D.current = !1, j.current = !1;
    }
    function Ae() {
      const Z = L.current, de = Z === "pen" || !Z ? "mouse" : Z, Te = O(), Ee = typeof Te == "function" ? Te() : Te;
      return typeof Ee == "string" ? Ee : Ee[de];
    }
    function Oe(Z) {
      const de = Ae();
      return de === "intentional" && Z.type !== "click" || de === "sloppy" && Z.type === "click";
    }
    function it(Z) {
      const de = v.current.floatingContext?.nodeId, Te = R && Ms(R.nodesRef.current, de).some((Ee) => sh(Z, Ee.context?.elements.floating));
      return se(Z) || Te;
    }
    function gt(Z) {
      if (Oe(Z)) {
        Z.type !== "click" && !se(Z) && (te.clear(), U.current = !1), W();
        return;
      }
      if (v.current.insideReactTree) {
        W();
        return;
      }
      const de = zl(Z), Te = `[${xu("inert")}]`, Ee = mn(de) ? de.getRootNode() : null, Ie = Array.from((Si(Ee) ? Ee : ln(h.select("floatingElement"))).querySelectorAll(Te)), Ze = h.context.triggerElements;
      if (de && (Ze.hasElement(de) || Ze.hasMatchingElement((vt) => ft(vt, de))))
        return;
      let wt = mn(de) ? de : null;
      for (; wt && !Va(wt); ) {
        const vt = Ua(wt);
        if (Va(vt) || !mn(vt))
          break;
        wt = vt;
      }
      if (!(Ie.length && mn(de) && !E2(de) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !ft(de, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ie.every((vt) => !ft(wt, vt)))) {
        if (en(de) && !("touches" in Z)) {
          const vt = Va(de), Gt = vl(de), Mt = /auto|scroll/, mt = vt || Mt.test(Gt.overflowX), Yt = vt || Mt.test(Gt.overflowY), ot = mt && de.clientWidth > 0 && de.scrollWidth > de.clientWidth, Zt = Yt && de.clientHeight > 0 && de.scrollHeight > de.clientHeight, zt = Gt.direction === "rtl", _n = Zt && (zt ? Z.offsetX <= de.offsetWidth - de.clientWidth : Z.offsetX > de.clientWidth), Rn = ot && Z.offsetY > de.clientHeight;
          if (_n || Rn)
            return;
        }
        if (!it(Z)) {
          if (Ae() === "intentional" && U.current) {
            te.clear(), U.current = !1;
            return;
          }
          typeof A == "function" && !A(Z) || q("__outsidePressBubbles") || (h.setOpen(!1, Rt(Nm, Z)), W());
        }
      }
    }
    function ze(Z) {
      Ae() !== "sloppy" || Z.pointerType === "touch" || !h.select("open") || !r || se(Z) || gt(Z);
    }
    function Je(Z) {
      if (Ae() !== "sloppy" || !h.select("open") || !r || se(Z))
        return;
      const de = Z.touches[0];
      de && (K.current = {
        startTime: Date.now(),
        startX: de.clientX,
        startY: de.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, ie.start(1e3, () => {
        K.current && (K.current.dismissOnTouchEnd = !1, K.current.dismissOnMouseDown = !1);
      }));
    }
    function je(Z, de) {
      const Te = zl(Z);
      if (!Te)
        return;
      const Ee = Qt(Te, Z.type, () => {
        de(Z), Ee();
      });
    }
    function We(Z) {
      L.current = "touch", je(Z, Je);
    }
    function qe(Z) {
      ie.clear(), Z.type === "pointerdown" && (L.current = Z.pointerType), !(Z.type === "mousedown" && K.current && !K.current.dismissOnMouseDown) && je(Z, (de) => {
        de.type === "pointerdown" ? ze(de) : gt(de);
      });
    }
    function De(Z) {
      if (!D.current)
        return;
      const de = j.current;
      if (Ge(), Ae() === "intentional") {
        if (Z.type === "pointercancel") {
          de && we();
          return;
        }
        if (!it(Z)) {
          if (de) {
            we();
            return;
          }
          typeof A == "function" && !A(Z) || (te.clear(), U.current = !0, W());
        }
      }
    }
    function nt(Z) {
      if (Ae() !== "sloppy" || !K.current || se(Z))
        return;
      const de = Z.touches[0];
      if (!de)
        return;
      const Te = Math.abs(de.clientX - K.current.startX), Ee = Math.abs(de.clientY - K.current.startY), Ie = Math.sqrt(Te * Te + Ee * Ee);
      Ie > 5 && (K.current.dismissOnTouchEnd = !0), Ie > 10 && (gt(Z), ie.clear(), K.current = null);
    }
    function Le(Z) {
      je(Z, nt);
    }
    function et(Z) {
      Ae() !== "sloppy" || !K.current || se(Z) || (K.current.dismissOnTouchEnd && gt(Z), ie.clear(), K.current = null);
    }
    function st(Z) {
      je(Z, et);
    }
    const lt = ln(x), Ce = vi(i && vi(Qt(lt, "keydown", H), Qt(lt, "compositionstart", ae), Qt(lt, "compositionend", be)), w && vi(Qt(lt, "click", qe, !0), Qt(lt, "pointerdown", qe, !0), Qt(lt, "pointerup", De, !0), Qt(lt, "pointercancel", De, !0), Qt(lt, "mousedown", qe, !0), Qt(lt, "mouseup", De, !0), Qt(lt, "touchstart", We, !0), Qt(lt, "touchmove", Le, !0), Qt(lt, "touchend", st, !0)));
    return () => {
      Ce(), P.clear(), te.clear(), Ge(), U.current = !1, W();
    };
  }, [v, x, i, w, A, y, r, N, T, H, W, O, q, se, R, h, ie]);
  const ce = b.useMemo(() => ({
    onKeyDown: H,
    onPointerDown: ge,
    onClick: ge
  }), [H, ge]), z = b.useMemo(() => ({
    onKeyDown: H,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: ye,
    onMouseDown: ye,
    onClickCapture: B,
    onMouseDownCapture(P) {
      B(), Q(P);
    },
    onPointerDownCapture(P) {
      B(), Q(P);
    },
    onMouseUpCapture: B,
    onTouchEndCapture: B,
    onTouchMoveCapture: B
  }), [H, B, Q, ye]);
  return b.useMemo(() => r ? {
    reference: ce,
    floating: z,
    trigger: ce
  } : {}, [r, ce, z]);
}
var hh = { exports: {} }, mh = {};
var zv;
function Q2() {
  if (zv) return mh;
  zv = 1;
  var n = Os();
  function o(x, v) {
    return x === v && (x !== 0 || 1 / x === 1 / v) || x !== x && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : o, i = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function m(x, v) {
    var R = v(), _ = i({ inst: { value: R, getSnapshot: v } }), A = _[0].inst, w = _[1];
    return f(
      function() {
        A.value = R, A.getSnapshot = v, p(A) && w({ inst: A });
      },
      [x, R, v]
    ), c(
      function() {
        return p(A) && w({ inst: A }), x(function() {
          p(A) && w({ inst: A });
        });
      },
      [x]
    ), d(R), R;
  }
  function p(x) {
    var v = x.getSnapshot;
    x = x.value;
    try {
      var R = v();
      return !r(x, R);
    } catch {
      return !0;
    }
  }
  function h(x, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : m;
  return mh.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, mh;
}
var Dv;
function _1() {
  return Dv || (Dv = 1, hh.exports = Q2()), hh.exports;
}
var Z2 = _1(), ph = { exports: {} }, gh = {};
var jv;
function $2() {
  if (jv) return gh;
  jv = 1;
  var n = Os(), o = _1();
  function r(h, y) {
    return h === y && (h !== 0 || 1 / h === 1 / y) || h !== h && y !== y;
  }
  var i = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, m = n.useMemo, p = n.useDebugValue;
  return gh.useSyncExternalStoreWithSelector = function(h, y, x, v, R) {
    var _ = f(null);
    if (_.current === null) {
      var A = { hasValue: !1, value: null };
      _.current = A;
    } else A = _.current;
    _ = m(
      function() {
        function O(U) {
          if (!N) {
            if (N = !0, T = U, U = v(U), R !== void 0 && A.hasValue) {
              var G = A.value;
              if (R(G, U))
                return D = G;
            }
            return D = U;
          }
          if (G = D, i(T, U)) return G;
          var L = v(U);
          return R !== void 0 && R(G, L) ? (T = U, G) : (T = U, D = L);
        }
        var N = !1, T, D, j = x === void 0 ? null : x;
        return [
          function() {
            return O(y());
          },
          j === null ? void 0 : function() {
            return O(j());
          }
        ];
      },
      [y, x, v, R]
    );
    var w = c(h, _[0], _[1]);
    return d(
      function() {
        A.hasValue = !0, A.value = w;
      },
      [w]
    ), p(w), w;
  }, gh;
}
var Lv;
function J2() {
  return Lv || (Lv = 1, ph.exports = $2()), ph.exports;
}
var W2 = J2();
const eT = Am(19), tT = eT ? lT : oT;
function xe(n, o, r, i, c) {
  return tT(n, o, r, i, c);
}
function nT(n, o, r, i, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, i, c), [n, o, r, i, c]);
  return Z2.useSyncExternalStore(n.subscribe, f, f);
}
function lT(n, o, r, i, c) {
  return nT(n, o, r, i, c);
}
function oT(n, o, r, i, c) {
  return W2.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, i, c));
}
class R1 {
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
class aT extends R1 {
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
    Ke(() => {
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
    Ke(() => (i.state[o] !== r && i.set(o, r), () => {
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
    Ke(() => {
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
    Ke(() => {
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
    const i = Xe(r ?? Wt);
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
const rT = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class iT extends aT {
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
      events: U2(),
      nested: i,
      triggerElements: f
    }, rT), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && x2(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
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
const sT = {
  tabIndex: -1,
  [Xh]: ""
};
class cT {
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
function uT(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: i = {}
  } = n, c = km(), f = E1() != null, d = Dl(() => new iT({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: i.reference ?? null,
    floatingElement: i.floating ?? null,
    triggerElements: new cT(),
    floatingId: c,
    syncOnly: !1,
    nested: f
  })).current;
  return Ke(() => {
    const m = {
      open: o,
      floatingId: c
    };
    i.reference !== void 0 && (m.referenceElement = i.reference, m.domReferenceElement = mn(i.reference) ? i.reference : null), i.floating !== void 0 && (m.floatingElement = i.floating), d.update(m);
  }, [o, c, i.reference, i.floating, d]), d.context.onOpenChange = r, d.context.nested = f, d;
}
function fT(n) {
  return dT(n, n.rootContext);
}
function dT(n, o) {
  const {
    nodeId: r,
    externalTree: i
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), m = o.useState("open"), p = o.useState("floatingId"), [h, y] = b.useState(null), [x, v] = b.useState(void 0), [R, _] = b.useState(void 0), A = b.useRef(null), w = Gu(i), O = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), N = lM({
    ...n,
    elements: {
      ...O,
      ...h && {
        reference: h
      }
    }
  }), T = mn(x) ? x : null, D = R === void 0 ? o.state.floatingElement : R;
  o.useSyncedValue("referenceElement", x ?? null), o.useSyncedValue("domReferenceElement", x === void 0 ? d : T), o.useSyncedValue("floatingElement", D);
  const j = b.useCallback((ue) => {
    const W = mn(ue) ? {
      getBoundingClientRect: () => ue.getBoundingClientRect(),
      getClientRects: () => ue.getClientRects(),
      contextElement: ue
    } : ue;
    y(W), N.refs.setReference(W);
  }, [N.refs]), U = b.useCallback((ue) => {
    (mn(ue) || ue === null) && (A.current = ue, v(ue)), (mn(N.refs.reference.current) || N.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    ue !== null && !mn(ue)) && N.refs.setReference(ue);
  }, [N.refs, v]), G = b.useCallback((ue) => {
    _(ue), N.refs.setFloating(ue);
  }, [N.refs]), L = b.useMemo(() => ({
    ...N.refs,
    setReference: U,
    setFloating: G,
    setPositionReference: j,
    domReference: A
  }), [N.refs, U, G, j]), K = b.useMemo(() => ({
    ...N.elements,
    domReference: d
  }), [N.elements, d]), ie = b.useMemo(() => ({
    ...N,
    dataRef: o.context.dataRef,
    open: m,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: p,
    refs: L,
    elements: K,
    nodeId: r,
    rootStore: o
  }), [N, L, K, r, o, m, p]);
  return Ke(() => {
    d && (A.current = d);
  }, [d]), Ke(() => {
    o.context.dataRef.current.floatingContext = ie;
    const ue = w?.nodesRef.current.find((W) => W.id === r);
    ue && (ue.context = ie);
  }), b.useMemo(() => ({
    ...N,
    context: ie,
    refs: L,
    elements: K,
    rootStore: o
  }), [N, L, K, ie, o]);
}
const hT = "Escape";
function Vv(n) {
  return jr && n.movementX === 0 && n.movementY === 0;
}
function Yu(n, o, r) {
  switch (n) {
    case "vertical":
      return o;
    case "horizontal":
      return r;
    default:
      return o || r;
  }
}
function Wc(n, o) {
  return Yu(o, n === Im || n === Hu, n === Cr || n === _r);
}
function bh(n, o, r) {
  return Yu(o, n === Hu, r ? n === Cr : n === _r) || n === "Enter" || n === " " || n === "";
}
function mT(n, o, r) {
  return Yu(o, r ? n === Cr : n === _r, n === Hu);
}
function pT(n, o, r, i) {
  const c = r ? n === _r : n === Cr, f = n === Im;
  return o === "both" || o === "horizontal" && i ? n === hT : Yu(o, c, f);
}
function gT(n, o) {
  const {
    listRef: r,
    activeIndex: i,
    onNavigate: c = () => {
    },
    enabled: f = !0,
    selectedIndex: d = null,
    allowEscape: m = !1,
    loopFocus: p = !1,
    nested: h = !1,
    rtl: y = !1,
    virtual: x = !1,
    focusItemOnOpen: v = "auto",
    focusItemOnHover: R = !0,
    openOnArrowKeyDown: _ = !0,
    disabledIndices: A = void 0,
    orientation: w = "vertical",
    parentOrientation: O,
    id: N,
    resetOnPointerLeave: T = !0,
    externalTree: D,
    grid: j
  } = o, U = j != null, G = "rootStore" in n ? n.rootStore : n, L = G.useState("open"), K = G.useState("floatingElement"), ie = G.useState("domReferenceElement"), ue = G.context.dataRef, W = Kh(K), q = Fh(ie), se = bl(W), ge = E1(), H = Gu(D), B = b.useRef(v), Q = b.useRef(d ?? -1), ye = b.useRef(null), ce = b.useRef(!0), z = Xe((Z) => {
    c(Q.current === -1 ? null : Q.current, Z);
  }), P = b.useRef(!!K), te = b.useRef(L), ae = b.useRef(!1), be = b.useRef(!1), we = b.useRef(null), Ge = bl(A), Ae = bl(L), Oe = bl(d), it = bl(T), gt = _s(), ze = _s(), Je = Xe(() => {
    function Z(Ie) {
      x ? H?.events.emit("virtualfocus", Ie) : we.current = cu(Ie, {
        sync: ae.current,
        preventScroll: !0
      });
    }
    const de = r.current[Q.current], Te = be.current;
    de && Z(de), (ae.current ? (Ie) => Ie() : (Ie) => gt.request(Ie))(() => {
      const Ie = r.current[Q.current] || de;
      if (!Ie)
        return;
      de || Z(Ie), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      Le && (Te || !ce.current) && Ie.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Ke(() => {
    ue.current.orientation = w;
  }, [ue, w]), Ke(() => {
    f && (L && K ? (Q.current = d ?? -1, B.current && d != null && (be.current = !0, z())) : P.current && (Q.current = -1, z()));
  }, [f, L, K, d, z]), Ke(() => {
    if (f) {
      if (!L) {
        ae.current = !1;
        return;
      }
      if (K)
        if (i == null) {
          if (ae.current = !1, Oe.current != null)
            return;
          if (P.current && (Q.current = -1, Je()), (!te.current || !P.current) && B.current && (ye.current != null || B.current === !0 && ye.current == null)) {
            let Z = 0;
            const de = () => {
              r.current[0] == null ? (Z < 2 && (Z ? (Ee) => ze.request(Ee) : queueMicrotask)(de), Z += 1) : (Q.current = ye.current == null || bh(ye.current, w, y) || h ? ch(r) : Sv(r), ye.current = null, z());
            };
            de();
          }
        } else ws(r.current, i) || (Q.current = i, Je(), be.current = !1);
    }
  }, [f, L, K, i, Oe, h, r, w, y, z, Je, ze]), Ke(() => {
    if (!f || K || !H || x || !P.current)
      return;
    const Z = H.nodesRef.current, de = Z.find((Ie) => Ie.id === ge)?.context?.elements.floating, Te = Fl(ln(ie ?? de ?? null)), Ee = Z.some((Ie) => Ie.context && ft(Ie.context.elements.floating, Te));
    de && !Ee && ce.current && de.focus({
      preventScroll: !0
    });
  }, [f, K, ie, H, ge, x]), Ke(() => {
    te.current = L, P.current = !!K;
  }), Ke(() => {
    L || (ye.current = null, B.current = v);
  }, [L, v]);
  const je = i != null, We = Xe((Z) => {
    if (!Ae.current)
      return;
    const de = r.current.indexOf(Z.currentTarget);
    de !== -1 && (Q.current !== de || i !== de) && (Q.current = de, z(Z));
  }), qe = Xe(() => O ?? H?.nodesRef.current.find((Z) => Z.id === ge)?.context?.dataRef?.current.orientation), De = Xe(() => ch(r, Ge.current)), nt = Xe((Z) => {
    if (ce.current = !1, ae.current = !0, Z.which === 229 || !Ae.current && Z.currentTarget === se.current)
      return;
    if (h && pT(Z.key, w, y, U)) {
      Wc(Z.key, qe()) || jn(Z), G.setOpen(!1, Rt(Ph, Z.nativeEvent)), en(ie) && (x ? H?.events.emit("virtualfocus", ie) : ie.focus());
      return;
    }
    const de = Q.current, Te = ch(r, A), Ee = Sv(r, A);
    if (q || (Z.key === "Home" && (jn(Z), Q.current = Te, z(Z)), Z.key === "End" && (jn(Z), Q.current = Ee, z(Z))), j != null) {
      const Ie = j(Z, Q.current, r, w, p, y, A, Te, Ee);
      if (Ie != null && (Q.current = Ie, z(Z)), w === "both")
        return;
    }
    if (Wc(Z.key, w)) {
      if (jn(Z), L && !x && Fl(Z.currentTarget.ownerDocument) === Z.currentTarget) {
        Q.current = bh(Z.key, w, y) ? Te : Ee, z(Z);
        return;
      }
      bh(Z.key, w, y) ? p ? de >= Ee ? m && de !== r.current.length ? Q.current = -1 : (ae.current = !1, Q.current = Te) : Q.current = ol(r.current, {
        startingIndex: de,
        disabledIndices: A
      }) : Q.current = Math.min(Ee, ol(r.current, {
        startingIndex: de,
        disabledIndices: A
      })) : p ? de <= Te ? m && de !== -1 ? Q.current = r.current.length : (ae.current = !1, Q.current = Ee) : Q.current = ol(r.current, {
        startingIndex: de,
        decrement: !0,
        disabledIndices: A
      }) : Q.current = Math.max(Te, ol(r.current, {
        startingIndex: de,
        decrement: !0,
        disabledIndices: A
      })), ws(r.current, Q.current) && (Q.current = -1), z(Z);
    }
  }), Le = b.useMemo(() => ({
    onFocus(de) {
      ae.current = !0, We(de);
    },
    onClick: ({
      currentTarget: de
    }) => de.focus({
      preventScroll: !0
    }),
    // Safari
    onMouseMove(de) {
      Vv(de) || (ae.current = !0, be.current = !1, R && We(de));
    },
    onPointerLeave(de) {
      if (!Ae.current || !ce.current || de.pointerType === "touch")
        return;
      ae.current = !0;
      const Te = de.relatedTarget;
      if (!(!R || r.current.includes(Te)) && it.current && (we.current?.(), we.current = null, Q.current = -1, z(de), !x)) {
        const Ee = se.current, Ie = Fl(ln(Ee));
        Ee && ft(Ee, Ie) && Ee.focus({
          preventScroll: !0
        });
      }
    }
  }), [We, Ae, se, R, r, z, it, x]), et = b.useMemo(() => x && L && je && {
    "aria-activedescendant": `${N}-${i}`
  }, [x, L, je, N, i]), st = b.useMemo(() => ({
    "aria-orientation": w === "both" ? void 0 : w,
    ...q ? {} : et,
    onKeyDown(Z) {
      if (Z.key === "Tab" && Z.shiftKey && L && !x) {
        const de = zl(Z.nativeEvent);
        if (de && !ft(se.current, de))
          return;
        jn(Z), G.setOpen(!1, Rt(Du, Z.nativeEvent)), en(ie) && ie.focus();
        return;
      }
      nt(Z);
    },
    onPointerMove(Z) {
      Vv(Z) || (ce.current = !0);
    }
  }), [et, nt, se, w, q, G, L, x, ie]), lt = b.useMemo(() => {
    function Z(Ee) {
      G.setOpen(!0, Rt(Ph, Ee.nativeEvent, Ee.currentTarget));
    }
    function de(Ee) {
      v === "auto" && i1(Ee.nativeEvent) && (B.current = !x);
    }
    function Te(Ee) {
      B.current = v, v === "auto" && Vm(Ee.nativeEvent) && (B.current = !0);
    }
    return {
      onKeyDown(Ee) {
        const Ie = G.select("open");
        ce.current = !1;
        const Ze = Ee.key.startsWith("Arrow"), wt = mT(Ee.key, qe(), y), vt = Wc(Ee.key, w), Gt = (h ? wt : vt) || Ee.key === "Enter" || Ee.key.trim() === "";
        if (x && Ie)
          return nt(Ee);
        if (!(!Ie && !_ && Ze)) {
          if (Gt) {
            const Mt = Wc(Ee.key, qe());
            ye.current = h && Mt ? null : Ee.key;
          }
          if (h) {
            wt && (jn(Ee), Ie ? (Q.current = De(), z(Ee)) : Z(Ee));
            return;
          }
          vt && (Oe.current != null && (Q.current = Oe.current), jn(Ee), !Ie && _ ? Z(Ee) : nt(Ee), Ie && z(Ee));
        }
      },
      onFocus(Ee) {
        G.select("open") && !x && (Q.current = -1, z(Ee));
      },
      onPointerDown: Te,
      onPointerEnter: Te,
      onMouseDown: de,
      onClick: de
    };
  }, [nt, v, De, h, z, G, _, w, qe, y, Oe, x]), Ce = b.useMemo(() => ({
    ...et,
    ...lt
  }), [et, lt]);
  return b.useMemo(() => f ? {
    reference: Ce,
    floating: st,
    item: Le,
    trigger: lt
  } : {}, [f, Ce, st, lt, Le]);
}
function bT(n, o) {
  const {
    listRef: r,
    elementsRef: i,
    activeIndex: c,
    onMatch: f,
    disabledIndices: d,
    onTyping: m,
    enabled: p = !0,
    resetMs: h = 750,
    selectedIndex: y = null
  } = o, x = "rootStore" in n ? n.rootStore : n, v = x.useState("open"), R = Ga(), _ = b.useRef(""), A = b.useRef(y ?? c ?? -1), w = b.useRef(null), O = Xe((D) => {
    function j(se) {
      return i?.current[se];
    }
    function U(se) {
      const ge = j(se);
      return ge && !Uu(ge) || ge?.matches(":disabled") ? !1 : d == null || !vu(mi, se, d);
    }
    function G(se, ge, H = 0) {
      if (se.length === 0)
        return -1;
      const B = (H % se.length + se.length) % se.length, Q = ge.toLowerCase();
      for (let ye = 0; ye < se.length; ye += 1) {
        const ce = (B + ye) % se.length;
        if (!(!se[ce]?.toLowerCase().startsWith(Q) || !U(ce)))
          return ce;
      }
      return -1;
    }
    const L = r.current;
    if (_.current.length > 0 && D.key === " " && (jn(D), m?.(!0)), _.current.length > 0 && _.current[0] !== " " && G(L, _.current) === -1 && D.key !== " " && m?.(!1), L == null || // Character key.
    D.key.length !== 1 || // Modifier key.
    D.ctrlKey || D.metaKey || D.altKey)
      return;
    v && D.key !== " " && (jn(D), m?.(!0));
    const K = _.current === "";
    K && (A.current = y ?? c ?? -1), L.every((se, ge) => se && U(ge) ? se[0]?.toLowerCase() !== se[1]?.toLowerCase() : !0) && _.current === D.key && (_.current = "", A.current = w.current), _.current += D.key, R.start(h, () => {
      _.current = "", A.current = w.current, m?.(!1);
    });
    const W = ((K ? y ?? c ?? -1 : A.current) ?? 0) + 1, q = G(L, _.current, W);
    q !== -1 ? (f?.(q), w.current = q) : D.key !== " " && (_.current = "", m?.(!1));
  }), N = Xe((D) => {
    const j = D.relatedTarget, U = x.select("domReferenceElement"), G = x.select("floatingElement");
    ft(U, j) || ft(G, j) || (R.clear(), _.current = "", A.current = w.current, m?.(!1));
  });
  Ke(() => {
    !v && y !== null || (R.clear(), w.current = null, _.current !== "" && (_.current = ""));
  }, [v, y, R]);
  const T = b.useMemo(() => ({
    onKeyDown: O,
    onBlur: N
  }), [O, N]);
  return b.useMemo(() => p ? {
    reference: T,
    floating: T
  } : {}, [p, T]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = mv.startingStyle] = "startingStyle", n[n.endingStyle = mv.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const yT = {
  "data-popup-open": ""
}, vT = {
  "data-popup-open": "",
  "data-pressed": ""
}, xT = {
  "data-open": ""
}, ST = {
  "data-closed": ""
}, ET = {
  "data-anchor-hidden": ""
}, CT = {
  open(n) {
    return n ? yT : null;
  }
}, _T = {
  open(n) {
    return n ? vT : null;
  }
}, qm = {
  open(n) {
    return n ? xT : ST;
  },
  anchorHidden(n) {
    return n ? ET : null;
  }
};
({
  ...qm,
  ...ju
});
function RT(n) {
  return Am(19) ? n : n ? "true" : void 0;
}
const wT = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
function MT(n) {
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
function pi(n, o) {
  const r = b.useRef(n), i = Xe(o);
  Ke(() => {
    r.current !== n && i(r.current), r.current = n;
  }, [n, i]);
}
function AT(n, o) {
  const r = Xe((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (Hs ? "touch" : ""));
  }), {
    onClick: i,
    onPointerDown: c
  } = MT(r);
  return b.useMemo(() => ({
    onClick: i,
    onPointerDown: c
  }), [i, c]);
}
function TT(n) {
  const [o, r] = b.useState(null), i = AT(n, r);
  return pi(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: i
  }), [o, i]);
}
function OT(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function kT(n, o, r, i, c, f, d, m, p, h = 2) {
  const y = C2(r.current, {
    event: n,
    orientation: i,
    loopFocus: c,
    rtl: f,
    cols: h,
    disabledIndices: d,
    minIndex: m,
    maxIndex: p,
    // An out-of-range previous index falls back to the first enabled item.
    prevIndex: o > p ? m : o,
    stopEvent: !0
  });
  return ws(r.current, y) ? void 0 : y;
}
const w1 = /* @__PURE__ */ b.createContext(void 0), M1 = /* @__PURE__ */ b.createContext(void 0), A1 = /* @__PURE__ */ b.createContext(void 0), T1 = /* @__PURE__ */ b.createContext(!1), O1 = /* @__PURE__ */ b.createContext("");
function jl() {
  const n = b.useContext(w1);
  if (!n)
    throw new Error(Oo(22));
  return n;
}
function qu() {
  const n = b.useContext(M1);
  if (!n)
    throw new Error(Oo(23));
  return n;
}
function Us() {
  const n = b.useContext(A1);
  if (!n)
    throw new Error(Oo(24));
  return n;
}
function Pm() {
  return b.useContext(O1);
}
function NT() {
  return b.useContext(T1);
}
const zT = (n, o) => Object.is(n, o);
function Ya(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function DT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((i) => i === void 0 ? !1 : Ya(o, i, r));
}
function k1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((i) => i === void 0 ? !1 : Ya(i, o, r));
}
function yh(n, o, r, i) {
  const c = i && Array.isArray(o) ? o[o.length - 1] : o, f = k1(n, c, r);
  return f === -1 ? null : f;
}
function jT(n, o, r) {
  return n.filter((i) => !Ya(o, i, r));
}
function $h(n) {
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
function Xm(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function LT(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (Xm(o)) {
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
function co(n, o) {
  if (o && n != null)
    return o(n) ?? "";
  if (n && typeof n == "object") {
    if ("label" in n && n.label != null)
      return String(n.label);
    if ("value" in n)
      return String(n.value);
  }
  return $h(n);
}
function bs(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? $h(n.value) : $h(n);
}
function N1(n, o, r) {
  function i() {
    return co(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? i();
  if (Array.isArray(o)) {
    const c = o, f = Xm(c) ? c.flatMap((d) => d.items) : c;
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
function VT(n, o, r) {
  return n.reduce((i, c, f) => (f > 0 && i.push(", "), i.push(/* @__PURE__ */ S.jsx(b.Fragment, {
    children: N1(c, o, r)
  }, f)), i), []);
}
const Se = {
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
  hasNullItemLabel: (n, o) => o ? LT(n.items) : !1,
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
}, IT = {
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
}, z1 = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, HT = {
  disabled: !1,
  ...z1
}, D1 = {
  valid(n) {
    return n === null ? null : n ? {
      "data-valid": ""
    } : {
      "data-invalid": ""
    };
  }
}, j1 = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: IT,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: Wt,
  disabled: void 0,
  setTouched: Wt,
  setDirty: Wt,
  setFilled: Wt,
  setFocused: Wt,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => !1,
  state: HT,
  registerFieldControl: Wt,
  validation: {
    getValidationProps: (n, o = yl) => o,
    inputRef: {
      current: null
    },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: Wt,
    getInputControl: () => null,
    commit: async () => {
    },
    change: Wt
  }
}, L1 = /* @__PURE__ */ b.createContext(j1);
function wi(n = !0) {
  const o = b.useContext(L1);
  if (o.setValidityData === Wt && !n)
    throw new Error(Oo(28));
  return o;
}
function V1(n, o, r, i, c = !0, f) {
  const {
    registerFieldControl: d
  } = wi(), m = Dl(() => /* @__PURE__ */ Symbol());
  Ke(() => {
    const p = m.current;
    if (!c) {
      d(p, void 0);
      return;
    }
    d(p, {
      controlRef: n,
      getValue: i,
      id: o,
      name: f,
      value: r
    });
  }, [n, c, i, o, f, d, m, r]), Ke(() => {
    const p = m.current;
    return () => {
      d(p, void 0);
    };
  }, [d, m]);
}
const UT = /* @__PURE__ */ b.createContext({
  elementRef: {
    current: null
  },
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: Wt,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: !1
  }
});
function I1() {
  return b.useContext(UT);
}
const BT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: Wt,
  labelId: void 0,
  setLabelId: Wt,
  messageIds: [],
  setMessageIds: Wt,
  getDescriptionProps: (n) => n
});
function Pu() {
  return b.useContext(BT);
}
function Fm(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: i
  } = n, {
    controlId: c,
    registerControlId: f
  } = Pu(), d = zu(o), m = r ? c : void 0, p = Dl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), y = b.useRef(o != null), x = Xe(() => {
    !h.current || f === Wt || (h.current = !1, f(p.current, void 0));
  });
  return Ke(() => {
    if (f === Wt)
      return;
    let v;
    if (r) {
      const R = i?.current;
      mn(R) && R.closest("label") != null ? v = o ?? null : v = m ?? d;
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
    h.current = !0, f(p.current, v);
  }, [o, i, m, f, r, d, p, x]), b.useEffect(() => x, [x]), c ?? d;
}
function H1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function GT(n, o) {
  return (r, i) => r == null ? !1 : n.contains(r, i, o);
}
function U1(n) {
  return Array.isArray(n) ? n.map((o) => U1(o)).join(",") : n == null ? "" : String(n);
}
const Iv = /* @__PURE__ */ new Map();
function YT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${U1(n.locale)}|${JSON.stringify(o)}`, i = Iv.get(r);
  if (i)
    return i;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, m, p) {
      if (!m)
        return !0;
      const h = co(d, p);
      for (let y = 0; y <= h.length - m.length; y += 1)
        if (c.compare(h.slice(y, y + m.length), m) === 0)
          return !0;
      return !1;
    },
    startsWith(d, m, p) {
      if (!m)
        return !0;
      const h = co(d, p);
      return c.compare(h.slice(0, m.length), m) === 0;
    },
    endsWith(d, m, p) {
      if (!m)
        return !0;
      const h = co(d, p), y = m.length;
      return h.length >= y && c.compare(h.slice(h.length - y), m) === 0;
    }
  };
  return Iv.set(r, f), f;
}
const qT = YT;
function PT(n, o = !1) {
  const {
    overflowY: r
  } = vl(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function XT(n, o, r = (i, c) => i === c) {
  return n.length === o.length && n.every((i, c) => r(i, o[c]));
}
const B1 = /* @__PURE__ */ Symbol("none"), vh = {
  value: B1,
  index: -1
}, FT = /* @__PURE__ */ b.createContext(void 0);
function Km() {
  return b.useContext(FT)?.direction ?? "ltr";
}
function KT(n) {
  const {
    id: o,
    onOpenChangeComplete: r,
    defaultSelectedValue: i = null,
    selectedValue: c,
    onSelectedValueChange: f,
    defaultInputValue: d,
    inputValue: m,
    open: p,
    defaultOpen: h = !1,
    selectionMode: y,
    onItemHighlighted: x,
    name: v,
    form: R,
    disabled: _ = !1,
    readOnly: A = !1,
    required: w = !1,
    inputRef: O,
    grid: N = !1,
    items: T,
    filteredItems: D,
    filter: j,
    openOnInputClick: U = !0,
    autoHighlight: G = !1,
    keepHighlight: L = !1,
    highlightItemOnHover: K = !0,
    loopFocus: ie = !0,
    itemToStringLabel: ue,
    itemToStringValue: W,
    isItemEqualToValue: q = zT,
    virtualized: se = !1,
    inline: ge = !1,
    fillInputOnItemPress: H = !0,
    modal: B = !1,
    limit: Q = -1,
    autoComplete: ye = "list",
    formAutoComplete: ce,
    locale: z,
    submitOnItemClick: P = !1
  } = n, {
    clearErrors: te
  } = I1(), {
    setDirty: ae,
    validityData: be,
    setFilled: we,
    name: Ge,
    disabled: Ae,
    setTouched: Oe,
    setFocused: it,
    validationMode: gt,
    validation: ze
  } = wi(), Je = Km(), je = Fm({
    id: o
  }), We = qT({
    locale: z
  }), [qe, De] = b.useState(!1), [nt, Le] = b.useState(null), et = b.useRef([]), st = b.useRef([]), lt = b.useRef(null), Ce = b.useRef(null), Z = b.useRef(null), de = b.useRef(null), Te = b.useRef(null), Ee = b.useRef(!0), Ie = b.useRef(!1), Ze = b.useRef(null), wt = b.useRef(null), vt = b.useRef(null), Gt = b.useRef(vh), Mt = b.useRef(null), mt = b.useRef([]), Yt = b.useRef(null), ot = Ae || _, Zt = Ge ?? v, zt = y === "multiple", _n = y === "single", Rn = m !== void 0 || d !== void 0, Kt = T !== void 0, at = D !== void 0;
  let ht;
  G === "always" ? ht = "always" : ht = G ? "input-change" : !1;
  const [$e, tn] = iu({
    controlled: c,
    default: zt ? i ?? mi : i,
    name: "Combobox",
    state: "selectedValue"
  }), wn = b.useMemo(() => j === null ? () => !0 : j !== void 0 ? j : GT(We, ue), [j, We, ue]), Mn = Dl(() => Rn ? d ?? "" : _n ? co($e, ue) : "").current, [Vt, It] = iu({
    controlled: m,
    default: Mn,
    name: "Combobox",
    state: "inputValue"
  }), [Ht, fo] = iu({
    controlled: p,
    default: h,
    name: "Combobox",
    state: "open"
  }), un = Xm(T), fn = nt ?? String(Vt).trim(), ho = _n ? co($e, ue) : "", al = _n && !qe && fn !== "" && ho.length === fn.length && We.contains(ho, fn), an = al ? "" : fn, mo = Kt && at && al, gn = b.useMemo(() => T ? un ? T.flatMap((_e) => _e.items) : T : mi, [T, un]), Dt = b.useMemo(() => {
    if (D && !mo)
      return D;
    if (!T)
      return mi;
    if (un) {
      const Re = T, Ct = [];
      let xt = 0;
      for (const Lt of Re) {
        if (Q > -1 && xt >= Q)
          break;
        const E = Q > -1 ? Q - xt : 1 / 0, M = an === "" ? Lt.items.slice(0, E) : [];
        if (an !== "")
          for (const k of Lt.items) {
            if (M.length >= E)
              break;
            wn(k, an, ue) && M.push(k);
          }
        if (M.length > 0) {
          const k = {
            ...Lt,
            items: M
          };
          Ct.push(k), xt += M.length;
        }
      }
      return Ct;
    }
    if (an === "")
      return Q > -1 ? gn.slice(0, Q) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        gn
      );
    const _e = [];
    for (const Re of gn) {
      if (Q > -1 && _e.length >= Q)
        break;
      wn(Re, an, ue) && _e.push(Re);
    }
    return _e;
  }, [D, mo, T, un, an, Q, wn, ue, gn]), At = b.useMemo(() => un ? Dt.flatMap((Re) => Re.items) : Dt, [Dt, un]), Ye = Dl(() => {
    let _e = null;
    return ge && Ht && Kt && y !== "none" && (_e = yh(At, $e, q, zt)), new R1({
      id: je,
      labelId: void 0,
      selectedValue: $e,
      open: Ht,
      items: T,
      selectionMode: y,
      listRef: et,
      labelsRef: st,
      popupRef: lt,
      emptyRef: Te,
      inputRef: Ce,
      startDismissRef: Z,
      endDismissRef: de,
      keyboardActiveRef: Ee,
      chipsContainerRef: Ze,
      clearRef: wt,
      valuesRef: mt,
      pointerDownItemRef: Yt,
      selectionEventRef: vt,
      name: Zt,
      form: R,
      disabled: ot,
      readOnly: A,
      required: w,
      grid: N,
      virtualized: se,
      openOnInputClick: U,
      itemToStringLabel: ue,
      isItemEqualToValue: q,
      modal: B,
      autoHighlight: ht,
      submitOnItemClick: P,
      hasInputValue: Rn,
      mounted: !1,
      forceMounted: !1,
      transitionStatus: "idle",
      inline: ge,
      activeIndex: null,
      selectedIndex: _e,
      popupProps: {},
      listProps: {},
      inputProps: {},
      triggerProps: {},
      itemProps: yl,
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
      onOpenChangeComplete: Wt,
      setOpen: Wt,
      setInputValue: Wt,
      setSelectedValue: Wt,
      setIndices: Wt,
      handleSelection: Wt,
      forceMount: Wt,
      requestSubmit: Wt
    });
  }).current, rl = y === "none" ? Vt : $e, Mi = b.useMemo(() => y === "none" ? rl : Array.isArray($e) ? $e.map((_e) => bs(_e, W)) : bs($e, W), [rl, W, y, $e]), Ai = Xe(x), Fa = Xe(r), po = xe(Ye, Se.activeIndex), Ka = xe(Ye, Se.selectedIndex), xl = xe(Ye, Se.positionerElement), Wl = xe(Ye, Se.listElement), $n = xe(Ye, Se.triggerElement), Jn = xe(Ye, Se.inputElement), on = xe(Ye, Se.inputGroupElement), bn = xe(Ye, Se.inline), Vn = xe(Ye, Se.inputInsidePopup), Sl = xe(Ye, Se.inputOwnsFormValue), ct = bl($n), {
    mounted: Lr,
    setMounted: Qa,
    transitionStatus: eo
  } = Lm(Ht), {
    openMethod: ko,
    triggerProps: to
  } = TT(Ht), go = Xe(() => Mi);
  V1(Vn ? ct : Ce, je, rl, go, !ot, v);
  const Wn = Xe(() => {
    T ? st.current = At.map((_e) => co(_e, ue)) : Ye.set("forceMounted", !0);
  }), rn = Xe((_e, Re, Ct) => {
    if (Re === -1) {
      if (Gt.current === vh)
        return;
      Gt.current = vh;
    } else
      Gt.current = {
        value: _e,
        index: Re
      };
    Ai(_e, KA(Ct, void 0, {
      index: Re
    }));
  }), Xn = Xe((_e) => {
    Ye.update(_e);
    const Re = _e.activeIndex;
    if (Re === void 0)
      return;
    const Ct = _e.type || Kl;
    Re === null ? rn(void 0, -1, Ct) : rn(mt.current[Re], Re, Ct);
  }), In = Xe((_e, Re) => {
    if (Ie.current = Re.reason === wo, n.onInputValueChange?.(_e, Re), !Re.isCanceled) {
      if (Re.reason === Es) {
        Ht && nt !== null && Le(null);
        const Ct = Re.event, xt = Ct.inputType;
        if (Ct.type === "compositionend" || xt != null && xt !== "" && xt !== "insertReplacementText") {
          const E = _e.trim() !== "";
          E && De(!0), Mt.current = {
            hasQuery: E
          };
          const M = Ye.state.listElement;
          if (!Ye.state.virtualized && M) {
            const k = lt.current;
            for (const V of Ei(M.firstElementChild ?? M)) {
              if (!en(V) || (k ? !ft(k, V) : V.getAttribute("role") === "dialog"))
                break;
              if (PT(V)) {
                V.scrollTop = 0;
                break;
              }
            }
          }
          E && ht && Ye.state.activeIndex == null && (Ht || bn) && Ye.set("activeIndex", 0);
        }
      } else Re.reason === wo && _e === "" && Ye.state.inputInsidePopup && (Mt.current = {
        hasQuery: !1,
        selection: !0
      });
      It(_e);
    }
  }), Ll = Xe((_e, Re) => {
    if (Ht !== _e && (Re.reason === zm && Kt && At.length === 0 && !Te.current && Re.allowPropagation(), n.onOpenChange?.(_e, Re), !Re.isCanceled && (_e && Vn && !bn && nt !== null && (De(!1), Le(null), Vt !== "" && Re.reason !== Es && In("", Rt(wo, Re.event))), !_e && qe && (_n ? (bn || Le(fn), fn === "" && De(!1)) : zt && (bn || Le(fn), Vn && Xn({
      activeIndex: null
    }), (!Vn || bn) && In("", Rt(wo, Re.event)))), fo(_e), !_e && Vn && (Re.reason === Du || Re.reason === Nm) && (Oe(!0), it(!1), gt === "onBlur")))) {
      const Ct = y === "none" ? Vt : $e;
      ze.commit(Ct);
    }
  }), El = Xe((_e, Re) => {
    if (f?.(_e, Re), Re.isCanceled)
      return;
    tn(_e), (y === "none" && lt.current && H || _n && !Ye.state.inputInsidePopup) && In(co(_e, ue), Rt(Re.reason, Re.event));
  }), No = Xe((_e, Re) => {
    const Ct = zl(_e), xt = vt.current ?? _e;
    vt.current = null;
    const Lt = Rt(qA, xt), E = Ct?.closest("a")?.getAttribute("href");
    if (E) {
      E.startsWith("#") && Ll(!1, Lt);
      return;
    }
    if (zt) {
      const M = Array.isArray($e) ? $e : [], V = DT(M, Re, q) ? jT(M, Re, q) : [...M, Re];
      if (El(V, Lt), Lt.isCanceled || !(Ce.current ? Ce.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? In("", Rt(wo, Lt.event)) : Ll(!1, Lt);
    } else {
      if (El(Re, Lt), Lt.isCanceled)
        return;
      Ll(!1, Lt);
    }
  }), na = Xe(() => {
    const _e = ze.inputRef.current?.form ?? Ye.state.inputElement?.form;
    _e && typeof _e.requestSubmit == "function" && _e.requestSubmit();
  }), kn = Xe(() => {
    if (Qa(!1), Fa?.(!1), De(!1), Le(null), Xn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), zt && Ce.current && Ce.current.value !== "" && !Ie.current && In("", Rt(wo)), _n)
      if (Ye.state.inputInsidePopup)
        Ce.current && Ce.current.value !== "" && In("", Rt(wo));
      else {
        const _e = co($e, ue);
        Ce.current && Ce.current.value !== _e && In(_e, Rt(_e === "" ? wo : Kl));
      }
  }), Za = b.useMemo(() => bn && xl ? {
    current: xl.closest('[role="dialog"]')
  } : lt, [bn, xl]);
  Lu({
    enabled: !n.actionsRef,
    open: Ht,
    ref: Za,
    onComplete() {
      Ht || kn();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: kn
  }), [kn]), Ke(function() {
    if (Ht || (Yt.current = null, y === "none"))
      return;
    const Re = Kt ? gn : mt.current;
    Xn({
      selectedIndex: yh(Re, $e, q, zt)
    });
  }, [Ht, $e, y, zt, Kt, gn, q, Xn]), Ke(() => {
    T && (mt.current = At, et.current.length = At.length);
  }, [T, At]), Ke(() => {
    const _e = Mt.current;
    if (_e) {
      const k = Ht || bn || Ye.state.positionerElement?.hidden === !1;
      if (_e.hasQuery)
        ht && k && Ye.set("activeIndex", 0), Mt.current = null;
      else if (String(Vt).trim() === "" && (Mt.current = null, k)) {
        const V = _e.selection;
        ht === "always" && !V && Ye.state.selectionMode === "none" && Ye.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ye.state.open && !Ye.state.inline || Ce.current && Ce.current.value.trim() !== "")
            return;
          const X = Ye.state.selectedValue, le = Ye.state.selectionMode === "multiple", oe = le && Array.isArray(X) ? X[X.length - 1] : X, ne = Ye.state.selectionMode !== "none" && oe != null;
          if (ne || V) {
            const pe = Kt || at ? At : mt.current;
            Ye.set("activeIndex", ne ? yh(pe, X, Ye.state.isItemEqualToValue, le) : null);
          } else ht === "always" && Ye.set("activeIndex", 0);
        });
      }
    }
    if (!Ht && !bn)
      return;
    const Ct = Kt || at ? At : mt.current, xt = Ye.state.activeIndex;
    if (xt == null) {
      if (ht === "always" && Ct.length > 0) {
        Ye.set("activeIndex", 0);
        return;
      }
      rn(void 0, -1, Kl);
      return;
    }
    if (xt >= Ct.length) {
      rn(void 0, -1, Kl), Ye.set("activeIndex", null);
      return;
    }
    const Lt = Ct[xt], E = Gt.current.value, M = E !== B1 && Ya(Lt, E, Ye.state.isItemEqualToValue);
    (Gt.current.index !== xt || !M) && rn(Lt, xt, Kl);
  }, [
    po,
    ht,
    rn,
    at,
    Kt,
    At,
    bn,
    Ht,
    Ye,
    // Reruns the effect when the query changes without affecting the deps above, such as
    // clearing the input when no items are filtered out (individually rendered items).
    Vt
  ]), Ke(() => {
    if (y === "none") {
      we(String(Vt) !== "");
      return;
    }
    we(zt ? Array.isArray($e) && $e.length > 0 : $e != null);
  }, [we, y, Vt, $e, zt]), b.useEffect(() => {
    Kt && ht && At.length === 0 && Xn({
      activeIndex: null
    });
  }, [Kt, ht, At.length, Xn]);
  function $a(_e) {
    const Re = be.initialValue;
    return Array.isArray(_e) && Array.isArray(Re) ? !XT(_e, Re, (Ct, xt) => Ya(Ct, xt, q)) : _e !== Re;
  }
  pi(fn, () => {
    !Ht || fn === "" || fn === String(Mn) || De(!0);
  });
  function la() {
    const _e = co($e, ue);
    Vt !== _e && In(_e, Rt(Kl));
  }
  pi($e, () => {
    y !== "none" && (te(Zt), ae($a($e)), ze.change($e), _n && !Rn && !Vn && la());
  }), pi(Vt, () => {
    y === "none" && (te(Zt), ae(Vt !== be.initialValue), ze.change(Vt));
  }), pi(T, () => {
    !_n || Rn || Vn || qe || la();
  });
  const Hn = uT({
    open: bn ? !0 : Ht,
    onOpenChange: Ll,
    elements: {
      reference: Vn ? $n : Jn,
      floating: xl
    }
  }), Ja = N ? "grid" : "listbox", zo = Ht || bn, no = zo ? "true" : "false", il = b.useMemo(() => {
    const _e = Jn?.tagName === "INPUT", Re = Jn == null || _e, Ct = Re || zo, xt = Re ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return Ct && (xt.role = "combobox", xt["aria-expanded"] = no, xt["aria-haspopup"] = Ja, xt["aria-controls"] = zo ? Wl?.id : void 0, xt["aria-autocomplete"] = ye), {
      reference: xt,
      floating: {
        role: "presentation"
      }
    };
  }, [Jn, zo, no, Ja, Wl?.id, ye]), el = C1(Hn, {
    enabled: !A && !ot && U,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Vn ? 0 : 100,
    reason: XA
  }), bo = K2(Hn, {
    enabled: !A && !ot && !bn,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: bn ? !0 : void 0,
    outsidePress(_e) {
      const Re = zl(_e);
      return !ft($n, Re) && !ft(wt.current, Re) && !ft(Ze.current, Re) && !ft(on, Re);
    }
  }), Vl = gT(Hn, {
    enabled: !A && !ot,
    id: je,
    listRef: et,
    activeIndex: po,
    selectedIndex: Ka,
    virtual: !0,
    loopFocus: ie,
    allowEscape: ie && !ht,
    focusItemOnOpen: qe || y === "none" && !ht ? !1 : "auto",
    focusItemOnHover: K,
    resetOnPointerLeave: !L,
    orientation: N ? "horizontal" : void 0,
    rtl: Je === "rtl",
    disabledIndices: mi,
    grid: N ? kT : void 0,
    onNavigate(_e, Re) {
      !Re && !Ht || eo === "ending" || Xn(Re ? {
        activeIndex: _e,
        type: Ee.current ? Dm : jm
      } : {
        activeIndex: _e
      });
    }
  }), Wa = b.useMemo(() => yi(Vl.reference, {
    onKeyDown(_e) {
      N && Ye.state.activeIndex == null && (_e.key === "ArrowLeft" || _e.key === "ArrowRight") && _e.preventBaseUIHandler();
    }
  }, bo.reference, el.reference, il.reference), [Vl.reference, bo.reference, el.reference, il.reference, N, Ye]), er = b.useMemo(() => yi(sT, bo.floating), [bo.floating]), yo = b.useMemo(() => yi(Vl.floating, il.floating), [Vl.floating, il.floating]), tl = b.useMemo(() => {
    const _e = Vl.item;
    return _e ? {
      ..._e,
      onFocus: void 0
    } : yl;
  }, [Vl.item]);
  OT(() => {
    Ye.update({
      inline: ge,
      popupProps: er,
      listProps: yo,
      inputProps: Wa,
      triggerProps: to,
      itemProps: tl,
      setOpen: Ll,
      setInputValue: In,
      setSelectedValue: El,
      setIndices: Xn,
      handleSelection: No,
      forceMount: Wn,
      requestSubmit: na,
      onOpenChangeComplete: Fa
    });
  }), Ke(() => {
    Ye.update({
      id: je,
      selectedValue: $e,
      open: Ht,
      mounted: Lr,
      transitionStatus: eo,
      items: T,
      inline: ge,
      popupProps: er,
      listProps: yo,
      inputProps: Wa,
      triggerProps: to,
      openMethod: ko,
      itemProps: tl,
      selectionMode: y,
      name: Zt,
      form: R,
      disabled: ot,
      readOnly: A,
      required: w,
      grid: N,
      virtualized: se,
      openOnInputClick: U,
      itemToStringLabel: ue,
      modal: B,
      autoHighlight: ht,
      isItemEqualToValue: q,
      submitOnItemClick: P,
      hasInputValue: Rn,
      inputOwnsFormValue: y === "none" && (ge || !Ye.state.inputInsidePopup)
    });
  }, [Ye, je, $e, Ht, Lr, eo, T, er, yo, Wa, tl, ko, to, y, Zt, ot, A, w, N, se, U, ue, B, q, P, Rn, ge, ht, R]);
  const tr = Mr(O, ze.inputRef), nr = b.useMemo(() => ({
    query: fn,
    hasItems: Kt,
    filteredItems: Dt,
    flatFilteredItems: At
  }), [fn, Kt, Dt, At]), vo = b.useMemo(() => Array.isArray(rl) ? "" : bs(rl, W), [rl, W]), lo = zt && Array.isArray($e) && $e.length > 0, sl = zt || y === "none" && Sl ? void 0 : Zt, oa = b.useMemo(() => !zt || !Array.isArray($e) || !Zt ? null : $e.map((_e) => {
    const Re = bs(_e, W);
    return /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: R,
      name: Zt,
      value: Re,
      disabled: ot
    }, Re);
  }), [zt, $e, R, Zt, W, ot]), Nn = /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ S.jsx("input", {
      ...ze.getValidationProps(ot, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (Vn) {
            $n?.focus();
            return;
          }
          (Ce.current || $n)?.focus();
        },
        // Handle browser autofill.
        onChange(_e) {
          if (_e.nativeEvent.defaultPrevented || ot || A)
            return;
          const Re = _e.currentTarget.value, Ct = Re.toLowerCase(), xt = Rt(Kl, _e.nativeEvent), Lt = () => mt.current.findIndex((M) => bs(M, W).toLowerCase() === Ct || co(M, ue).toLowerCase() === Ct);
          function E() {
            if (zt)
              return;
            if (y === "none") {
              In(Re, xt);
              return;
            }
            let M = Lt();
            M === -1 && (M = mt.current.findIndex((V, X) => {
              const le = st.current[X];
              return le != null && le.toLowerCase() === Ct;
            }));
            const k = M === -1 ? void 0 : mt.current[M];
            k != null && El?.(k, xt);
          }
          _n && (Wn(), T && Lt() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(E);
        }
      }),
      id: je && sl == null ? `${je}-hidden-input` : void 0,
      form: R,
      name: sl,
      autoComplete: ce,
      disabled: ot,
      required: w && !lo,
      readOnly: A,
      value: vo,
      ref: tr,
      style: sl ? Bm : Um,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), oa]
  });
  return /* @__PURE__ */ S.jsx(w1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ S.jsx(M1.Provider, {
      value: Hn,
      children: /* @__PURE__ */ S.jsx(T1.Provider, {
        value: Kt,
        children: /* @__PURE__ */ S.jsx(A1.Provider, {
          value: nr,
          children: /* @__PURE__ */ S.jsx(O1.Provider, {
            value: Vt,
            children: Nn
          })
        })
      })
    })
  });
}
const G1 = {
  ..._T,
  ...D1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, eu = 5;
function QT(n, o) {
  const r = ZT(o);
  return n.clientX >= r.left - eu && n.clientX <= r.right + eu && n.clientY >= r.top - eu && n.clientY <= r.bottom + eu;
}
function ZT(n) {
  const o = n.getBoundingClientRect(), r = pn(n);
  if (r1)
    return o;
  const i = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(i.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(i.width) || 0, m = parseFloat(i.height) || 0, p = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, y = Math.max(o.width, d, p), x = Math.max(o.height, m, h), v = y - o.width, R = x - o.height;
  return {
    left: o.left - v / 2,
    right: o.right + v / 2,
    top: o.top - R / 2,
    bottom: o.bottom + R / 2
  };
}
function $T(n, o) {
  return n ?? o;
}
function Y1(n) {
  const o = xe(n, Se.mounted), r = xe(n, Se.popupSide), i = xe(n, Se.positionerElement);
  return o && i ? r : null;
}
function Xu() {
  return Us().filteredItems.length === 0;
}
function JT(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function WT(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function q1(n, o, r) {
  const i = n.state.listRef.current[o];
  i && (n.state.selectionEventRef.current = r, i.click(), n.state.selectionEventRef.current = null);
}
const eO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    nativeButton: f = !0,
    disabled: d = !1,
    id: m,
    style: p,
    ...h
  } = o, {
    state: y,
    disabled: x,
    setTouched: v,
    setFocused: R,
    validationMode: _,
    validation: A
  } = wi(), {
    labelId: w
  } = Pu(), O = jl(), N = xe(O, Se.selectionMode), T = xe(O, Se.disabled), D = xe(O, Se.readOnly), j = xe(O, Se.required), U = xe(O, Se.positionerElement), G = xe(O, Se.listElement), L = xe(O, Se.popupId), K = xe(O, Se.triggerProps), ie = xe(O, Se.inputInsidePopup), ue = xe(O, Se.id), W = xe(O, Se.labelId), q = xe(O, Se.open), se = xe(O, Se.selectedValue), ge = xe(O, Se.activeIndex), H = xe(O, Se.selectedIndex), B = xe(O, Se.hasSelectedValue), Q = qu(), ye = Pm(), ce = Ga(), z = x || T || d, P = Xu(), te = Y1(O);
  Fm({
    id: ie ? m : void 0
  });
  const ae = ie ? m ?? ue : m, be = $T(w, W);
  let we;
  q && ie ? we = L ?? H1(ue) : q && (we = G?.id);
  const Ge = b.useRef("");
  function Ae(qe) {
    Ge.current = qe.pointerType;
  }
  const {
    reference: Oe
  } = bT(Q, {
    enabled: !q && !D && !T && N === "single",
    listRef: O.state.labelsRef,
    activeIndex: ge,
    selectedIndex: H,
    onMatch(qe) {
      const De = O.state.valuesRef.current[qe];
      De !== void 0 && O.state.setSelectedValue(De, Rt(Kl));
    }
  }), {
    reference: it
  } = C1(Q, {
    enabled: !D && !T,
    event: "mousedown"
  }), {
    buttonRef: gt,
    getButtonProps: ze
  } = Is({
    native: f,
    disabled: z
  }), Je = {
    ...y,
    open: q,
    disabled: z,
    popupSide: te,
    listEmpty: P,
    placeholder: N === "none" ? !1 : !B
  }, je = Xe((qe) => {
    O.set("triggerElement", qe);
  });
  return Jl("button", o, {
    ref: [r, gt, je],
    state: Je,
    props: [K, it, Oe, {
      id: ae,
      tabIndex: ie ? 0 : -1,
      role: ie ? "combobox" : void 0,
      "aria-expanded": q,
      "aria-haspopup": ie ? "dialog" : "listbox",
      "aria-controls": we,
      "aria-required": ie && j || void 0,
      "aria-labelledby": be,
      onPointerDown: Ae,
      onPointerEnter: Ae,
      onFocus() {
        R(!0), !(z || D) && ce.start(0, O.state.forceMount);
      },
      onBlur(qe) {
        if (!ft(U, qe.relatedTarget) && (v(!0), R(!1), _ === "onBlur")) {
          const De = N === "none" ? ye : se;
          A.commit(De);
        }
      },
      onMouseDown(qe) {
        if (z || D || (ie || Q.set("domReferenceElement", qe.currentTarget), O.state.forceMount(), Ge.current !== "touch" && (O.state.inputRef.current?.focus(), ie || qe.preventDefault()), q))
          return;
        const De = ln(qe.currentTarget);
        function nt(Le) {
          const et = O.state.triggerElement;
          if (!et)
            return;
          const st = zl(Le), lt = O.state.positionerElement, Ce = O.state.listElement;
          ft(et, st) || ft(lt, st) || ft(Ce, st) || QT(Le, et) || O.state.setOpen(!1, Rt(FA, Le));
        }
        ie && De.addEventListener("mouseup", nt, {
          once: !0
        });
      },
      onKeyDown(qe) {
        D || (qe.key === "ArrowDown" || qe.key === "ArrowUp") && (jn(qe), O.state.setOpen(!0, Rt(Ph, qe.nativeEvent)), O.state.inputRef.current?.focus());
      }
    }, A.getValidationProps(z, h), ze],
    stateAttributesMapping: G1
  });
}), tO = /* @__PURE__ */ b.createContext(void 0);
function nO() {
  return b.useContext(tO);
}
const P1 = /* @__PURE__ */ b.createContext(void 0);
function Qm(n) {
  const o = b.useContext(P1);
  if (o === void 0 && !n)
    throw new Error(Oo(21));
  return o;
}
const X1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const i = jl(), {
    buttonRef: c,
    getButtonProps: f
  } = Is({
    native: !1
  }), d = Mr(r, c);
  function m(h) {
    i.state.setOpen(!1, Rt(PA, h.nativeEvent, h.currentTarget));
  }
  const p = f({
    onClick: m
  });
  return /* @__PURE__ */ S.jsx("span", {
    ref: d,
    ...p,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Bm
  });
}), lO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    disabled: f = !1,
    id: d,
    style: m,
    ...p
  } = o, {
    state: h,
    disabled: y,
    setTouched: x,
    setFocused: v,
    validationMode: R,
    validation: _
  } = wi(), {
    labelId: A
  } = Pu(), w = nO(), N = !!Qm(!0), T = jl(), D = Pm(), j = Km(), U = xe(T, Se.required), G = xe(T, Se.disabled), L = xe(T, Se.readOnly), K = xe(T, Se.name), ie = xe(T, Se.form), ue = xe(T, Se.selectionMode), W = xe(T, Se.autoHighlight), q = xe(T, Se.inputProps), se = xe(T, Se.triggerProps), ge = xe(T, Se.open), H = xe(T, Se.mounted), B = xe(T, Se.selectedValue), Q = xe(T, Se.id), ye = xe(T, Se.inline), ce = xe(T, Se.modal), z = !!W, P = Y1(T), te = y || G || f, ae = Xu(), be = N || ye, we = !be || ce, Ge = zu(d ?? (be ? void 0 : Q)), Ae = N ? z1 : h, [Oe, it] = b.useState(null), gt = b.useRef(!1), ze = b.useRef(null), Je = b.useRef(!1), je = ue === "none" && !N, We = Xe((Ce) => {
    const Z = N || T.state.inline;
    Z && !T.state.hasInputValue && T.state.setInputValue("", Rt(Kl)), T.update({
      inputElement: Ce,
      inputInsidePopup: Z,
      inputOwnsFormValue: je
    });
  }), qe = N ? p : _.getValidationProps(te, p);
  function De() {
    T.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: T.state.keyboardActiveRef.current ? Dm : jm
    });
  }
  function nt() {
    T.state.keyboardActiveRef.current = !1;
  }
  const Le = {
    ...Ae,
    open: ge,
    disabled: te,
    readOnly: L,
    popupSide: P,
    listEmpty: ae
  };
  function et(Ce) {
    if (!w)
      return;
    let Z;
    const {
      highlightedChipIndex: de
    } = w, Te = w.chipsRef.current.length, [Ee, Ie] = JT(j);
    return de !== void 0 ? (Ce.key === Ee ? (Ce.preventDefault(), de > 0 ? Z = de - 1 : Z = void 0) : Ce.key === Ie ? (Ce.preventDefault(), de < Te - 1 ? Z = de + 1 : Z = void 0) : (Ce.key === "Backspace" || Ce.key === "Delete") && (Ce.preventDefault(), Z = WT(de, B.length), De()), Z) : (Ce.key === Ee && (Ce.currentTarget.selectionStart ?? 0) === 0 && B.length > 0 && (Ce.preventDefault(), Z = Te > 0 ? Te - 1 : void 0), Z);
  }
  const st = Jl("input", o, {
    state: Le,
    ref: [r, T.state.inputRef, We],
    props: [q, se, {
      value: Oe ?? D,
      "aria-readonly": L || void 0,
      "aria-required": U || void 0,
      "aria-labelledby": A,
      disabled: te,
      readOnly: L,
      required: ue === "none" ? U : void 0,
      form: ie,
      ...je && K && {
        name: K
      },
      id: Ge,
      onFocus() {
        if (v(!0), !ye || !Je.current)
          return;
        Je.current = !1;
        const Ce = ze.current;
        Ce == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(T.state.valuesRef.current, Ce) || T.state.setIndices({
          activeIndex: Ce
        });
      },
      onBlur() {
        x(!0), v(!1);
        const Ce = T.state.activeIndex;
        if (ye && Ce !== null && W !== "always" && (ze.current = Ce, Je.current = !0, T.state.setIndices({
          activeIndex: null
        })), R === "onBlur") {
          const Z = ue === "none" ? D : B;
          _.commit(Z);
        }
      },
      onCompositionStart(Ce) {
        bu || (gt.current = !0, it(Ce.currentTarget.value));
      },
      onCompositionEnd(Ce) {
        gt.current = !1;
        const Z = Ce.currentTarget.value;
        it(null), T.state.setInputValue(Z, Rt(Es, Ce.nativeEvent));
      },
      onChange(Ce) {
        const Z = Ce.nativeEvent, de = Z.inputType, Te = !de || de === "insertReplacementText", Ee = gt.current || !Te;
        function Ie(Gt) {
          L || te || !Gt || !Ee || (T.state.setOpen(!0, Rt(Es, Z)), z || De());
        }
        if (gt.current) {
          const Gt = Ce.currentTarget.value;
          it(Gt), Gt === "" && !T.state.openOnInputClick && !T.state.inputInsidePopup && T.state.setOpen(!1, Rt(wo, Z));
          const Mt = Gt.trim(), mt = z && Mt !== "";
          Ie(Mt), ge && T.state.activeIndex !== null && !mt && De();
          return;
        }
        const Ze = Rt(Es, Z);
        if (T.state.setInputValue(Ce.currentTarget.value, Ze), Ze.isCanceled)
          return;
        const wt = Ce.currentTarget.value === "", vt = Rt(wo, Z);
        wt && !T.state.inputInsidePopup && (ue === "single" && T.state.setSelectedValue(null, vt), T.state.openOnInputClick || T.state.setOpen(!1, vt)), Ie(Ce.currentTarget.value.trim()), ge && T.state.activeIndex !== null && !z && De();
      },
      onKeyDown(Ce) {
        if (te || L || Ce.ctrlKey || Ce.shiftKey || Ce.altKey || Ce.metaKey)
          return;
        T.state.keyboardActiveRef.current = !0;
        const Z = Ce.currentTarget, de = Z.scrollWidth - Z.clientWidth, Te = j === "rtl";
        if (Ce.key === "Home") {
          jn(Ce);
          const Ze = gv && Te ? Z.value.length : 0;
          Z.setSelectionRange(Ze, Ze), Z.scrollLeft = 0;
          return;
        }
        if (Ce.key === "End") {
          jn(Ce);
          const Ze = gv && Te ? 0 : Z.value.length;
          Z.setSelectionRange(Ze, Ze), Z.scrollLeft = Te ? -de : de;
          return;
        }
        if (!H && Ce.key === "Escape") {
          const Ze = ue === "multiple" && Array.isArray(B) ? B.length === 0 : B === null, wt = Rt(zm, Ce.nativeEvent), vt = ue === "multiple" ? [] : null;
          T.state.setInputValue("", wt), T.state.setSelectedValue(vt, wt), !Ze && !T.state.inline && !wt.isPropagationAllowed && Ce.stopPropagation();
          return;
        }
        if (w && Ce.key === "Backspace" && Z.value === "" && w.highlightedChipIndex === void 0 && Array.isArray(B) && B.length > 0) {
          const Ze = w.chipsRef.current.length, wt = Ze > 0 ? Ze - 1 : B.length - 1, vt = B.filter((Gt, Mt) => Mt !== wt);
          De(), T.state.setSelectedValue(vt, Rt(Kl, Ce.nativeEvent));
          return;
        }
        const Ee = w?.highlightedChipIndex !== void 0, Ie = et(Ce);
        if (w?.setHighlightedChipIndex(Ie), Ie !== void 0 ? w?.chipsRef.current[Ie]?.focus() : Ee && T.state.inputRef.current?.focus(), Ce.which !== 229 && Ce.key === "Enter" && ge) {
          const Ze = T.state.activeIndex, wt = Ce.nativeEvent;
          if (Ze === null) {
            if (ye)
              return;
            T.state.setOpen(!1, Rt(Kl, wt));
            return;
          }
          jn(Ce), q1(T, Ze, wt);
        }
      },
      onPointerMove: nt,
      onPointerDown: nt
    }, qe],
    stateAttributesMapping: G1
  }), lt = N ? /* @__PURE__ */ S.jsx(L1.Provider, {
    value: j1,
    children: st
  }) : st;
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [ge && we && /* @__PURE__ */ S.jsx(X1, {
      ref: T.state.startDismissRef
    }), lt]
  });
}), oO = {
  ...ju,
  ...CT
}, aO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    disabled: f = !1,
    nativeButton: d = !0,
    keepMounted: m = !1,
    style: p,
    ...h
  } = o, {
    disabled: y
  } = wi(), x = jl(), v = xe(x, Se.selectionMode), R = xe(x, Se.disabled), _ = xe(x, Se.readOnly), A = xe(x, Se.open), w = xe(x, Se.selectedValue), O = xe(x, Se.hasSelectionChips), N = Pm();
  let T = !1;
  v === "none" ? T = N !== "" : v === "single" ? T = w != null : T = O;
  const D = y || R || f, {
    buttonRef: j,
    getButtonProps: U
  } = Is({
    native: d,
    disabled: D
  }), {
    mounted: G,
    transitionStatus: L,
    setMounted: K
  } = Lm(T), ie = {
    disabled: D,
    visible: T,
    open: A,
    transitionStatus: L
  };
  Lu({
    open: T,
    ref: x.state.clearRef,
    onComplete() {
      T || K(!1);
    }
  });
  const ue = Jl("button", o, {
    state: ie,
    ref: [r, j, x.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(q) {
        q.preventDefault();
      },
      onClick(q) {
        if (D || _)
          return;
        const se = x.state.keyboardActiveRef.current ? Dm : jm;
        x.state.setInputValue("", Rt(hv, q.nativeEvent)), v !== "none" ? (x.state.setSelectedValue(Array.isArray(w) ? [] : null, Rt(hv, q.nativeEvent)), x.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: se
        })) : x.state.setIndices({
          activeIndex: null,
          type: se
        }), x.state.inputRef.current?.focus();
      }
    }, h, U],
    stateAttributesMapping: oO
  });
  return m || G ? ue : null;
}), rO = /* @__PURE__ */ b.createContext(null);
function iO() {
  return b.useContext(rO);
}
function sO(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = Us(), i = iO(), c = i ? i.items : r;
  return /* @__PURE__ */ S.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const cO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var i;
  const {
    render: c,
    className: f,
    style: d,
    children: m,
    ...p
  } = o, h = jl(), y = qu(), x = !!Qm(!0), {
    filteredItems: v,
    hasItems: R
  } = Us(), _ = xe(h, Se.selectionMode), A = xe(h, Se.grid), w = xe(h, Se.listProps), O = xe(h, Se.virtualized), N = xe(h, Se.forceMounted), T = _ === "multiple", D = v.length === 0, j = Xe((W) => {
    h.set("positionerElement", W);
  }), U = Xe((W) => {
    h.set("listElement", W);
  }), G = b.useMemo(() => typeof m == "function" ? i || (i = /* @__PURE__ */ S.jsx(sO, {
    children: m
  })) : m, [m]), L = {
    empty: D
  }, K = y.useState("floatingId"), ie = Jl("div", o, {
    state: L,
    ref: [r, U, x ? null : j],
    props: [w, {
      children: G,
      tabIndex: -1,
      id: K,
      role: A ? "grid" : "listbox",
      "aria-multiselectable": T ? "true" : void 0,
      onKeyDown(W) {
        if (!(h.state.disabled || h.state.readOnly) && W.key === "Enter") {
          const q = h.state.activeIndex;
          if (q == null)
            return;
          jn(W), q1(h, q, W.nativeEvent);
        }
      },
      onKeyDownCapture() {
        h.state.keyboardActiveRef.current = !0;
      },
      onPointerMoveCapture() {
        h.state.keyboardActiveRef.current = !1;
      }
    }, p]
  });
  if (O)
    return ie;
  const ue = R && !N ? void 0 : h.state.labelsRef;
  return /* @__PURE__ */ S.jsx(vA, {
    elementsRef: h.state.listRef,
    labelsRef: ue,
    children: ie
  });
}), uO = "⁠", fO = 200;
function dO(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const i = o.currentNode;
    i.nodeValue !== "" && (r = i);
  }
  return r;
}
function hO() {
  const n = Ga(), o = b.useRef(null);
  return b.useEffect(() => {
    if (Hs)
      return;
    const r = o.current;
    if (r == null)
      return;
    const i = dO(r);
    if (i == null)
      return;
    const c = i.data, f = `${c}${uO}`;
    return i.nodeValue = f, n.start(fO, () => {
      i.nodeValue === f && (i.nodeValue = c);
    }), () => {
      n.clear(), i.nodeValue === f && (i.nodeValue = c);
    };
  }, [o, n]), o;
}
const F1 = /* @__PURE__ */ b.createContext(void 0);
function mO() {
  const n = b.useContext(F1);
  if (n === void 0)
    throw new Error(Oo(20));
  return n;
}
const pO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: i = !1,
    ...c
  } = o, f = jl(), d = xe(f, Se.mounted), m = xe(f, Se.forceMounted);
  return d || i || m ? /* @__PURE__ */ S.jsx(F1.Provider, {
    value: i,
    children: /* @__PURE__ */ S.jsx(H2, {
      ref: r,
      ...c
    })
  }) : null;
}), gO = (n) => ({
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
      middlewareData: p
    } = o, {
      element: h,
      padding: y = 0,
      offsetParent: x = "real"
    } = Ha(n, o) || {};
    if (h == null)
      return {};
    const v = ox(y), R = {
      x: r,
      y: i
    }, _ = gm(c), A = pm(_), w = await d.getDimensions(h), O = _ === "y", N = O ? "top" : "left", T = O ? "bottom" : "right", D = O ? "clientHeight" : "clientWidth", j = f.reference[A] + f.reference[_] - R[_] - f.floating[A], U = R[_] - f.reference[_], G = x === "real" ? await d.getOffsetParent?.(h) : m.floating;
    let L = m.floating[D] || f.floating[A];
    (!L || !await d.isElement?.(G)) && (L = m.floating[D] || f.floating[A]);
    const K = j / 2 - U / 2, ie = L / 2 - w[A] / 2 - 1, ue = Math.min(v[N], ie), W = Math.min(v[T], ie), q = ue, se = L - w[A] - W, ge = L / 2 - w[A] / 2 + K, H = lx(q, ge, se), B = !p.arrow && Xa(c) != null && ge !== H && f.reference[A] / 2 - (ge < q ? ue : W) - w[A] / 2 < 0, Q = B ? ge < q ? ge - q : ge - se : 0;
    return {
      [_]: R[_] + Q,
      data: {
        [_]: H,
        centerOffset: ge - H - Q,
        ...B && {
          alignmentOffset: Q
        }
      },
      reset: B
    };
  }
}), bO = (n, o) => ({
  ...gO(n),
  options: [n, o]
}), yO = {
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
}, vO = {
  sideX: "left",
  sideY: "top"
}, Hv = "--available-width", Uv = "--available-height";
function K1(n, o, r) {
  const i = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: i ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: i ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function Bv(n, o, r) {
  const {
    rects: i,
    placement: c
  } = n;
  return {
    side: K1(o, $l(c), r),
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
function xO(n) {
  return SO(n, fT);
}
function SO(n, o) {
  const {
    // Public parameters
    anchor: r,
    positionMethod: i = "absolute",
    side: c = "bottom",
    sideOffset: f = 0,
    align: d = "center",
    alignOffset: m = 0,
    collisionBoundary: p,
    collisionPadding: h = 5,
    sticky: y = !1,
    arrowPadding: x = 5,
    disableAnchorTracking: v = !1,
    inline: R,
    // Private parameters
    keepMounted: _ = !1,
    floatingRootContext: A,
    mounted: w,
    collisionAvoidance: O,
    shift: N,
    nodeId: T,
    adaptiveOrigin: D,
    lazyFlip: j = !1,
    externalTree: U
  } = n, [G, L] = b.useState(null);
  !w && G !== null && L(null);
  const K = O.side || "flip", ie = O.align || "flip", ue = O.fallbackAxisSide || "end", W = N?.crossAxis ?? !1, q = N?.rootBoundary, se = typeof r == "function" ? r : void 0, ge = Xe(se), H = se ? ge : r, B = bl(r), Q = bl(w), ce = Km() === "rtl", z = G || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": ce ? "left" : "right",
    "inline-start": ce ? "right" : "left"
  }[c], P = d === "center" ? z : `${z}-${d}`;
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
  const ae = 1, be = c === "bottom" ? ae : 0, we = c === "top" ? ae : 0, Ge = c === "right" ? ae : 0, Ae = c === "left" ? ae : 0, Oe = {
    boundary: p === "clipping-ancestors" ? "clippingAncestors" : p,
    padding: te
  }, it = b.useRef(null), gt = bl(f), ze = bl(m), Je = typeof f != "function" ? f : 0, je = typeof m != "function" ? m : 0, We = [];
  R && We.push(R), We.push(oM((at) => {
    const ht = Bv(at, c, ce), $e = typeof gt.current == "function" ? gt.current(ht) : gt.current, tn = typeof ze.current == "function" ? ze.current(ht) : ze.current;
    return {
      mainAxis: $e,
      crossAxis: tn,
      alignmentAxis: tn
    };
  }, [Je, je, ce, c]));
  const qe = ie === "none" && K !== "shift", De = !qe && (y || W || K === "shift"), nt = K === "none" ? null : iM({
    ...Oe,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: te.top + ae + be,
      right: te.right + ae + Ae,
      bottom: te.bottom + ae + we,
      left: te.left + ae + Ge
    },
    mainAxis: !W && K === "flip",
    crossAxis: ie === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: ue
  }), Le = qe ? null : aM({
    ...Oe,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: q,
    mainAxis: ie !== "none",
    crossAxis: De,
    limiter: y || W ? void 0 : rM((at) => {
      if (!it.current)
        return {};
      const {
        width: ht,
        height: $e
      } = it.current.getBoundingClientRect(), tn = Zl($l(at.placement)), wn = tn === "y" ? ht : $e, Mn = tn === "y" ? te.left + te.right : te.top + te.bottom;
      return {
        offset: wn / 2 + Mn / 2
      };
    })
  }, [Oe, y, W, q, te, ie]);
  K === "shift" || ie === "shift" || d === "center" ? We.push(Le, nt) : We.push(nt, Le), We.push(sM({
    ...Oe,
    apply({
      elements: {
        floating: at
      },
      availableWidth: ht,
      availableHeight: $e,
      rects: tn
    }) {
      if (!Q.current)
        return;
      const wn = at.style;
      wn.setProperty(Hv, `${ht}px`), wn.setProperty(Uv, `${$e}px`);
      const Mn = pn(at).devicePixelRatio || 1, {
        x: Vt,
        y: It,
        width: Ht,
        height: fo
      } = tn.reference, un = (Math.round((Vt + Ht) * Mn) - Math.round(Vt * Mn)) / Mn, fn = (Math.round((It + fo) * Mn) - Math.round(It * Mn)) / Mn;
      wn.setProperty("--anchor-width", `${un}px`), wn.setProperty("--anchor-height", `${fn}px`);
    }
  }), bO((at) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: it.current || ln(at.elements.floating).createElement("div"),
    padding: x,
    offsetParent: "floating"
  }), [x]), {
    name: "transformOrigin",
    fn(at) {
      const {
        elements: ht,
        middlewareData: $e,
        placement: tn,
        rects: wn,
        y: Mn
      } = at, Vt = $l(tn), It = Zl(Vt), Ht = it.current, fo = $e.arrow?.x || 0, un = $e.arrow?.y || 0, fn = Ht?.clientWidth || 0, ho = Ht?.clientHeight || 0, al = fo + fn / 2, an = un + ho / 2, mo = Math.abs($e.shift?.y || 0), gn = wn.reference.height / 2, Dt = typeof f == "function" ? f(Bv(at, c, ce)) : f, At = mo > Dt, Ye = {
        top: `${al}px calc(100% + ${Dt}px)`,
        bottom: `${al}px ${-Dt}px`,
        left: `calc(100% + ${Dt}px) ${an}px`,
        right: `${-Dt}px ${an}px`
      }[Vt], rl = `${al}px ${wn.reference.y + gn - Mn}px`;
      return ht.floating.style.setProperty("--transform-origin", De && It === "y" && At ? rl : Ye), {};
    }
  }, yO, D), Ke(() => {
    !w && A && A.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [w, A]);
  const et = b.useMemo(() => ({
    elementResize: !v && typeof ResizeObserver < "u",
    layoutShift: !v && typeof IntersectionObserver < "u"
  }), [v]), {
    refs: st,
    elements: lt,
    x: Ce,
    y: Z,
    middlewareData: de,
    update: Te,
    placement: Ee,
    context: Ie,
    isPositioned: Ze,
    floatingStyles: wt
  } = o({
    rootContext: A,
    open: _ ? w : void 0,
    placement: P,
    middleware: We,
    strategy: i,
    whileElementsMounted: _ ? void 0 : (...at) => nv(...at, et),
    nodeId: T,
    externalTree: U
  }), {
    sideX: vt,
    sideY: Gt
  } = de.adaptiveOrigin || vO, Mt = Ze ? i : "fixed", mt = b.useMemo(() => {
    let at;
    return Ze ? D ? at = {
      position: Mt,
      [vt]: Ce,
      [Gt]: Z
    } : at = {
      ...wt,
      position: Mt
    } : at = {
      position: Mt,
      top: 0,
      left: 0
    }, at[Hv] = "100vw", at[Uv] = "100vh", Ze || (at.opacity = 0), at;
  }, [D, Mt, vt, Ce, Gt, Z, wt, Ze]), Yt = b.useRef(null);
  Ke(() => {
    if (!w)
      return;
    const at = B.current, ht = typeof at == "function" ? at() : at, tn = (Gv(ht) ? ht.current : ht) || null || null;
    tn !== Yt.current && (st.setPositionReference(tn), Yt.current = tn);
  }, [w, st, H, B]), b.useEffect(() => {
    if (!w)
      return;
    const at = B.current;
    typeof at != "function" && Gv(at) && at.current !== Yt.current && (st.setPositionReference(at.current), Yt.current = at.current);
  }, [w, st, H, B]), b.useEffect(() => {
    if (_ && w && lt.reference && lt.floating)
      return nv(lt.reference, lt.floating, Te, et);
  }, [_, w, lt, Te, et]);
  const ot = $l(Ee), Zt = K1(c, ot, ce), zt = Xa(Ee) || "center", _n = !!de.hide?.referenceHidden;
  Ke(() => {
    j && w && Ze && ot !== z && L(ot);
  }, [j, w, Ze, ot, z]);
  const Rn = b.useMemo(() => ({
    position: "absolute",
    top: de.arrow?.y,
    left: de.arrow?.x
  }), [de.arrow]), Kt = de.arrow?.centerOffset !== 0;
  return b.useMemo(() => ({
    positionerStyles: mt,
    arrowStyles: Rn,
    arrowRef: it,
    arrowUncentered: Kt,
    side: Zt,
    align: zt,
    physicalSide: ot,
    anchorHidden: _n,
    refs: st,
    context: Ie,
    isPositioned: Ze,
    update: Te
  }), [mt, Rn, it, Kt, Zt, zt, ot, _n, st, Ie, Ze, Te]);
}
function Gv(n) {
  return n != null && "current" in n;
}
function Q1(n) {
  return n === "starting" ? z2 : yl;
}
function EO(n, o, {
  styles: r,
  transitionStatus: i,
  props: c,
  refs: f,
  hidden: d,
  inert: m = !1
}) {
  const p = {
    ...r
  };
  return m && (p.pointerEvents = "none"), Jl("div", n, {
    state: o,
    ref: f,
    props: [{
      role: "presentation",
      hidden: d,
      style: p
    }, Q1(i), c],
    stateAttributesMapping: qm
  });
}
const CO = 20;
function _O(n, o, r, i) {
  const [c, f] = b.useState(!1);
  Ke(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = ln(r).documentElement.clientWidth, m = r.offsetWidth;
    f(d > 0 && m > 0 && m >= d - CO);
  }, [n, o, r]), y2(n && (!o || c), i);
}
const RO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    anchor: f,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod: d,
    side: m,
    align: p,
    sideOffset: h,
    alignOffset: y,
    collisionBoundary: x = "clipping-ancestors",
    collisionPadding: v,
    arrowPadding: R,
    sticky: _,
    disableAnchorTracking: A = !1,
    collisionAvoidance: w = j2,
    style: O,
    ...N
  } = o, T = jl(), D = qu(), j = mO(), U = xe(T, Se.modal), G = xe(T, Se.open), L = xe(T, Se.mounted), K = xe(T, Se.openMethod), ie = xe(T, Se.positionerElement), ue = xe(T, Se.triggerElement), W = xe(T, Se.inputElement), q = xe(T, Se.inputGroupElement), se = xe(T, Se.inputInsidePopup), ge = xe(T, Se.transitionStatus), H = Xu(), Q = xO({
    anchor: f ?? (se ? ue : q ?? W),
    floatingRootContext: D,
    positionMethod: d,
    mounted: L,
    side: m,
    sideOffset: h,
    align: p,
    alignOffset: y,
    arrowPadding: R,
    collisionBoundary: x,
    collisionPadding: v,
    sticky: _,
    disableAnchorTracking: A,
    keepMounted: j,
    collisionAvoidance: w,
    lazyFlip: !0
  });
  _O(G && U, K === "touch", ie, ue);
  const ye = {
    open: G,
    side: Q.side,
    align: Q.align,
    anchorHidden: Q.anchorHidden,
    empty: H
  };
  Ke(() => {
    T.set("popupSide", Q.side);
  }, [T, Q.side]);
  const ce = Xe((P) => {
    T.set("positionerElement", P);
  }), z = EO(o, ye, {
    styles: Q.positionerStyles,
    transitionStatus: ge,
    props: N,
    refs: [r, ce],
    hidden: !L,
    inert: !G
  });
  return /* @__PURE__ */ S.jsxs(P1.Provider, {
    value: Q,
    children: [L && U && /* @__PURE__ */ S.jsx(wT, {
      inert: RT(!G),
      cutout: q ?? W ?? ue
    }), z]
  });
}), wO = {
  ...qm,
  ...ju
}, MO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: m,
    ...p
  } = o, h = jl(), y = Qm(), x = qu(), v = xe(h, Se.mounted), R = xe(h, Se.open), _ = xe(h, Se.openMethod), A = xe(h, Se.popupProps), w = xe(h, Se.transitionStatus), O = xe(h, Se.inputInsidePopup), N = xe(h, Se.inputElement), T = xe(h, Se.modal), D = xe(h, Se.id), j = Xu(), U = p.id ?? (O ? H1(D) : void 0);
  Ke(() => (h.set("popupId", h.state.popupRef.current?.id || U), () => {
    h.set("popupId", void 0);
  }), [h, U]), Lu({
    open: R,
    ref: h.state.popupRef,
    onComplete() {
      R && h.state.onOpenChangeComplete(!0);
    }
  });
  const G = {
    open: R,
    side: y.side,
    align: y.align,
    anchorHidden: y.anchorHidden,
    transitionStatus: w,
    empty: j
  }, L = Jl("div", o, {
    state: G,
    ref: [r, h.state.popupRef],
    props: [A, {
      id: U,
      role: O ? "dialog" : "presentation",
      onFocus(q) {
        const se = zl(q.nativeEvent);
        _ !== "touch" && (ft(h.state.listElement, se) || se === q.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, Q1(w), p],
    stateAttributesMapping: wO
  }), ie = d === void 0 ? O ? (q) => q === "touch" ? h.state.popupRef.current : N : !1 : d;
  let ue;
  m != null ? ue = m : ue = O ? void 0 : !1;
  const W = !O || T;
  return /* @__PURE__ */ S.jsx(P2, {
    context: x,
    disabled: !v,
    modal: W,
    openInteractionType: _,
    initialFocus: ie,
    returnFocus: ue,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ S.jsxs(b.Fragment, {
      children: [L, W && /* @__PURE__ */ S.jsx(X1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), Z1 = /* @__PURE__ */ b.createContext(void 0);
function $1() {
  const n = b.useContext(Z1);
  if (!n)
    throw new Error(Oo(19));
  return n;
}
const AO = /* @__PURE__ */ b.createContext(!1);
function TO() {
  return b.useContext(AO);
}
function J1(n) {
  const {
    componentProps: o,
    forwardedRef: r,
    virtualized: i,
    indexFromFilter: c
  } = n, {
    render: f,
    className: d,
    style: m,
    value: p = null,
    index: h,
    disabled: y = !1,
    nativeButton: x = !1,
    ...v
  } = o, R = b.useRef(null), _ = ZA({
    guess: !0,
    index: h,
    textRef: R
  }), A = jl(), w = TO(), O = NT(), N = xe(A, Se.selectionMode), T = xe(A, Se.disabled), D = xe(A, Se.readOnly), j = xe(A, Se.isItemEqualToValue), U = T || y, G = N !== "none", L = h ?? c ?? _.index, K = L !== -1, ie = xe(A, Se.id), ue = xe(A, Se.isActive, L), W = xe(A, Se.isSelected, p), q = xe(A, Se.itemProps), se = b.useRef(null), ge = ie != null && K ? `${ie}-${L}` : void 0, H = W && G;
  Ke(() => {
    if (!(K && (i || h != null)))
      return;
    const be = A.state.listRef.current;
    return be[L] = se.current, () => {
      delete be[L];
    };
  }, [K, i, L, h, A]), Ke(() => {
    if (!K || O)
      return;
    const ae = A.state.valuesRef.current;
    return ae[L] = p, () => {
      delete ae[L];
    };
  }, [K, O, L, p, A]), Ke(() => {
    if (!K || O)
      return;
    const ae = A.state.selectedValue, be = Array.isArray(ae) ? ae[ae.length - 1] : ae;
    Ya(p, be, j) && A.set("selectedIndex", L);
  }, [K, O, A, L, p, j]);
  const {
    getButtonProps: B,
    buttonRef: Q
  } = Is({
    disabled: U,
    focusableWhenDisabled: !0,
    native: x,
    composite: !0
  }), ye = {
    disabled: U,
    selected: H,
    highlighted: ue
  };
  function ce(ae) {
    function be() {
      A.state.handleSelection(ae, p);
    }
    A.state.submitOnItemClick ? (Ci.flushSync(be), A.state.requestSubmit()) : be();
  }
  const z = {
    id: ge,
    role: w ? "gridcell" : "option",
    "aria-selected": G ? H : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(ae) {
      ae.isPrimary && (A.state.pointerDownItemRef.current = ae.currentTarget), ae.preventDefault();
    },
    onMouseDown(ae) {
      ae.preventDefault();
    },
    onClick(ae) {
      U || D || ce(ae.nativeEvent);
    },
    onMouseUp(ae) {
      const be = A.state.pointerDownItemRef.current === ae.currentTarget;
      A.state.pointerDownItemRef.current = null, !(U || D || ae.button !== 0 || be || !ue) && ce(ae.nativeEvent);
    }
  }, P = Jl("div", o, {
    ref: [Q, r, _.ref, se],
    state: ye,
    props: [q, z, v, B]
  }), te = b.useMemo(() => ({
    selected: H,
    textRef: R
  }), [H, R]);
  return /* @__PURE__ */ S.jsx(Z1.Provider, {
    value: te,
    children: P
  });
}
function OO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, i = jl(), c = xe(i, Se.isItemEqualToValue), {
    flatFilteredItems: f
  } = Us(), d = k1(f, o.value ?? null, c);
  return /* @__PURE__ */ S.jsx(J1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const kO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const i = jl(), c = xe(i, Se.virtualized);
  return c && o.index == null ? /* @__PURE__ */ S.jsx(OO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ S.jsx(J1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), NO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    children: d,
    ...m
  } = o, {
    filteredItems: p
  } = Us(), h = jl(), y = hO(), x = p.length === 0 ? d : null;
  return Jl("div", o, {
    ref: [r, h.state.emptyRef, y],
    props: [{
      children: x,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, m]
  });
});
function zO(n, o, r, i = !0, c) {
  const [f, d] = b.useState(), m = zu(c ? `${c}-label` : void 0), p = n ?? o ?? f;
  return Ke(() => {
    const h = n || o || !i ? void 0 : DO(r.current, m);
    f !== h && d(h);
  }), p;
}
function DO(n, o) {
  const r = jO(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function jO(n) {
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
function LO(n) {
  const {
    multiple: o = !1,
    defaultValue: r,
    value: i,
    onValueChange: c,
    autoComplete: f,
    ...d
  } = n;
  return /* @__PURE__ */ S.jsx(KT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: i,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function VO(n) {
  const {
    children: o,
    placeholder: r
  } = n, i = jl(), c = xe(i, Se.itemToStringLabel), f = xe(i, Se.selectedValue), d = xe(i, Se.items), m = xe(i, Se.selectionMode) === "multiple", p = xe(i, Se.hasSelectedValue), h = !p && r != null && o == null, y = xe(i, Se.hasNullItemLabel, h);
  let x = null;
  return typeof o == "function" ? x = o(f) : o != null ? x = o : !p && r != null && !y ? x = r : m && Array.isArray(f) ? x = VT(f, d, c) : x = N1(f, d, c), /* @__PURE__ */ S.jsx(b.Fragment, {
    children: x
  });
}
const IO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: i
  } = $1();
  return o.keepMounted || i ? /* @__PURE__ */ S.jsx(HO, {
    ...o,
    ref: r
  }) : null;
}), HO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: i,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: m
  } = $1(), p = b.useRef(null), {
    transitionStatus: h,
    setMounted: y
  } = Lm(m), v = Jl("span", n, {
    ref: [o, p],
    state: {
      selected: m,
      transitionStatus: h
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, d],
    stateAttributesMapping: ju
  });
  return Lu({
    open: m,
    ref: p,
    onComplete() {
      m || y(!1);
    }
  }), v;
})), W1 = /* @__PURE__ */ b.createContext(void 0);
function UO() {
  const n = b.useContext(W1);
  if (n === void 0)
    throw new Error(Oo(63));
  return n;
}
const eS = {
  ...D1,
  checked(n) {
    return n ? {
      "data-checked": ""
    } : {
      "data-unchecked": ""
    };
  }
}, BO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: i,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: m,
    id: p,
    inputRef: h,
    name: y,
    nativeButton: x = !1,
    onCheckedChange: v,
    readOnly: R = !1,
    required: _ = !1,
    disabled: A = !1,
    render: w,
    uncheckedValue: O,
    value: N,
    style: T,
    ...D
  } = o, {
    clearErrors: j
  } = I1(), {
    state: U,
    setTouched: G,
    setDirty: L,
    validityData: K,
    setFilled: ie,
    setFocused: ue,
    validationMode: W,
    disabled: q,
    name: se,
    validation: ge
  } = wi(), {
    labelId: H
  } = Pu(), B = q || A, Q = se ?? y, ye = b.useRef(null), ce = Mr(ye, h, ge.inputRef), z = b.useRef(null), P = zu(), te = Fm({
    id: p,
    implicit: !1,
    controlRef: z
  }), ae = x ? void 0 : te, [be, we] = iu({
    controlled: i,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  V1(z, P, be, void 0, !B, y), Ke(() => {
    ye.current && ie(ye.current.checked);
  }, [ie]), pi(be, () => {
    j(Q), L(be !== K.initialValue), ie(be), ge.change(be);
  });
  const {
    getButtonProps: Ge,
    buttonRef: Ae
  } = Is({
    disabled: B,
    native: x
  }), Oe = zO(d, H, ye, !x, ae), it = {
    id: x ? te : P,
    role: "switch",
    "aria-checked": be,
    "aria-readonly": R || void 0,
    "aria-required": _ || void 0,
    "aria-labelledby": Oe,
    onFocus() {
      B || ue(!0);
    },
    onBlur() {
      const je = ye.current;
      !je || B || (G(!0), ue(!1), W === "onBlur" && ge.commit(je.checked));
    },
    onClick(je) {
      if (R || B)
        return;
      je.preventDefault();
      const We = ye.current;
      We && su(We, je);
    }
  }, gt = {
    ...ge.getValidationProps(B),
    checked: be,
    disabled: B,
    form: m,
    id: ae,
    name: Q,
    required: _,
    style: Q ? Bm : Um,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": !0,
    ref: ce,
    onChange(je) {
      if (je.nativeEvent.defaultPrevented)
        return;
      if (R) {
        je.preventDefault();
        return;
      }
      const We = je.currentTarget.checked, qe = Rt(Kl, je.nativeEvent);
      v?.(We, qe), !qe.isCanceled && we(We);
    },
    onClick(je) {
      je.stopPropagation();
    },
    onFocus() {
      z.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...N !== void 0 ? {
      value: N
    } : yl
  }, ze = b.useMemo(() => ({
    ...U,
    checked: be,
    disabled: B,
    readOnly: R,
    required: _
  }), [U, be, B, R, _]), Je = Jl("span", o, {
    state: ze,
    ref: [r, z, Ae],
    props: [it, D, Ge, (je) => ge.getValidationProps(B, je)],
    stateAttributesMapping: eS
  });
  return /* @__PURE__ */ S.jsxs(W1.Provider, {
    value: ze,
    children: [Je, !be && Q && O !== void 0 && /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: m,
      name: Q,
      value: O,
      disabled: B
    }), /* @__PURE__ */ S.jsx("input", {
      ...gt,
      suppressHydrationWarning: !0
    })]
  });
}), GO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    ...d
  } = o, m = UO();
  return Jl("span", o, {
    state: m,
    ref: r,
    stateAttributesMapping: eS,
    props: d
  });
});
function tS({ className: n, type: o, ...r }) {
  return /* @__PURE__ */ S.jsx(
    "input",
    {
      type: o,
      "data-slot": "input",
      className: tt(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        n
      ),
      ...r
    }
  );
}
function YO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: tt(
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
const qO = Vs(
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
function PO({
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
      className: tt(qO({ align: o }), n),
      onClick: (i) => {
        i.target.closest("button") || i.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const XO = Vs(
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
function nS({
  className: n,
  type: o = "button",
  variant: r = "ghost",
  size: i = "xs",
  ...c
}) {
  return /* @__PURE__ */ S.jsx(
    Ao,
    {
      type: o,
      "data-size": i,
      variant: r,
      className: tt(XO({ size: i }), n),
      ...c
    }
  );
}
function FO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    tS,
    {
      "data-slot": "input-group-control",
      className: tt(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        n
      ),
      ...o
    }
  );
}
const KO = LO;
function QO({ ...n }) {
  return /* @__PURE__ */ S.jsx(VO, { "data-slot": "combobox-value", ...n });
}
function lS({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    eO,
    {
      "data-slot": "combobox-trigger",
      className: tt("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
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
function ZO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    aO,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ S.jsx(nS, { variant: "ghost", size: "icon-xs" }),
      className: tt(n),
      ...o,
      children: /* @__PURE__ */ S.jsx(am, { className: "pointer-events-none" })
    }
  );
}
function $O({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: i = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ S.jsxs(YO, { className: tt("w-auto", n), children: [
    /* @__PURE__ */ S.jsx(
      lO,
      {
        render: /* @__PURE__ */ S.jsx(FO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ S.jsxs(PO, { align: "inline-end", children: [
      i && /* @__PURE__ */ S.jsx(
        nS,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ S.jsx(lS, {})
        }
      ),
      c && /* @__PURE__ */ S.jsx(ZO, { disabled: r })
    ] }),
    o
  ] });
}
function JO({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: i = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...m
}) {
  return /* @__PURE__ */ S.jsx(pO, { container: d, children: /* @__PURE__ */ S.jsx(
    RO,
    {
      side: o,
      sideOffset: r,
      align: i,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ S.jsx(
        MO,
        {
          "data-slot": "combobox-content",
          "data-chips": !!f,
          className: tt(
            "group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            n
          ),
          ...m
        }
      )
    }
  ) });
}
function WO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    cO,
    {
      "data-slot": "combobox-list",
      className: tt(
        "max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
        n
      ),
      ...o
    }
  );
}
function ek({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    kO,
    {
      "data-slot": "combobox-item",
      className: tt(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          IO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ S.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ S.jsx(E_, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function tk({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    NO,
    {
      "data-slot": "combobox-empty",
      className: tt(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        n
      ),
      ...o
    }
  );
}
function nk({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    MM,
    {
      "data-slot": "label",
      className: tt(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        n
      ),
      ...o
    }
  );
}
function xh({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...i
}) {
  return /* @__PURE__ */ S.jsx(
    jM,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: o,
      className: tt(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        n
      ),
      ...i
    }
  );
}
function Sh({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: tt(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        n
      ),
      ...o
    }
  );
}
const lk = Vs(
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
function Jh({
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
      className: tt(lk({ orientation: o }), n),
      ...r
    }
  );
}
function Wh({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    nk,
    {
      "data-slot": "field-label",
      className: tt(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        n
      ),
      ...o
    }
  );
}
function gi({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: tt(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        n
      ),
      ...o
    }
  );
}
function Eh({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: tt("group/item-group flex flex-col", n),
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
  return /* @__PURE__ */ S.jsxs(
    UM,
    {
      "data-slot": "slider",
      defaultValue: r == null ? d : void 0,
      value: r,
      min: i,
      max: c,
      className: tt(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        n
      ),
      ...f,
      children: [
        /* @__PURE__ */ S.jsx(
          qM,
          {
            "data-slot": "slider-track",
            className: tt(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              PM,
              {
                "data-slot": "slider-range",
                className: tt(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: m.length }, (p, h) => /* @__PURE__ */ S.jsx(
          ZM,
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
function Yv({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    BO,
    {
      "data-slot": "switch",
      className: tt(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        o === "default" && "h-[1.15rem] w-8",
        o === "sm" && "h-3.5 w-6",
        n
      ),
      ...r,
      children: /* @__PURE__ */ S.jsx(
        GO,
        {
          "data-slot": "switch-thumb",
          className: tt(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
            o === "default" && "size-4",
            o === "sm" && "size-3"
          )
        }
      )
    }
  );
}
const ok = Vs(
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
), oS = b.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function aS({
  className: n,
  variant: o,
  size: r,
  spacing: i = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ S.jsx(
    oA,
    {
      "data-slot": "toggle-group",
      "data-variant": o,
      "data-size": r,
      "data-spacing": i,
      style: { "--gap": i },
      className: tt(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        n
      ),
      ...f,
      children: /* @__PURE__ */ S.jsx(oS.Provider, { value: { variant: o, size: r, spacing: i }, children: c })
    }
  );
}
function rS({
  className: n,
  children: o,
  variant: r,
  size: i,
  ...c
}) {
  const f = b.useContext(oS);
  return /* @__PURE__ */ S.jsx(
    cA,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || i,
      "data-spacing": f.spacing,
      className: tt(
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
const qv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Pv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], kl = ["#ff0099", "#b8ff00", "#00b7ff"], ak = kl.length, iS = ["line", "spline", "gradient"], sS = ["spline", "shape", "gradient"], rk = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, ik = ["select", "lasso"], sk = ["point", "line", "spline", "shape"];
function ck(n, o) {
  const [r, i] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(i - r), Math.abs(f - c));
}
function uk(n, o) {
  const [r, i] = n, [c, f] = o;
  return Math.hypot(Math.abs(i - r), Math.abs(f - c));
}
function di(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function Xv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const fk = {
  select: U_,
  lasso: j_,
  polygon: G_,
  rectangle: J_,
  ellipse: Py,
  point: Py,
  line: K_,
  spline: Z_,
  shape: R0
};
function Fv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ S.jsx(
    aS,
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
        const c = fk[i] ?? R0, f = rk[i] ?? i;
        return /* @__PURE__ */ S.jsx(
          rS,
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
function As({
  color: n,
  variant: o = "solid",
  fillOpacity: r = 0.25,
  className: i
}) {
  if (o === "landmark") {
    const c = Math.round(Math.min(1, Math.max(0, r)) * 100);
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        className: tt(
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
  return o === "selection" ? /* @__PURE__ */ S.jsx(
    "span",
    {
      className: tt(
        "landmarks-layer-swatch landmarks-layer-swatch--selection inline-block shrink-0 rounded-full",
        i
      ),
      style: { borderColor: n },
      "aria-hidden": !0
    }
  ) : /* @__PURE__ */ S.jsx(
    "span",
    {
      className: tt(
        "landmarks-layer-swatch inline-block shrink-0 rounded-full ring-1 ring-border",
        i
      ),
      style: { backgroundColor: n },
      "aria-hidden": !0
    }
  );
}
const tu = "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground";
function dk({
  modes: n,
  mode: o,
  onMode: r,
  fullscreen: i,
  onToggleFullscreen: c,
  onZoomIn: f,
  onZoomOut: d,
  onReset: m
}) {
  const p = n.filter((x) => ik.includes(x)), h = n.filter((x) => sk.includes(x)), y = p.length > 0 && h.length > 0;
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "landmarks-float landmarks-float--toolbar pointer-events-auto flex items-center gap-1 rounded-full px-1.5 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      onMouseDown: (x) => x.stopPropagation(),
      onWheel: (x) => x.stopPropagation(),
      children: [
        p.length ? /* @__PURE__ */ S.jsx(Fv, { modes: p, value: o, onChange: r }) : null,
        y ? /* @__PURE__ */ S.jsx(xh, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }) : null,
        h.length ? /* @__PURE__ */ S.jsx(Fv, { modes: h, value: o, onChange: r }) : null,
        /* @__PURE__ */ S.jsx(xh, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }),
        /* @__PURE__ */ S.jsx(
          Ao,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Zoom in",
            "aria-label": "Zoom in",
            className: tu,
            onClick: (x) => {
              x.stopPropagation(), f();
            },
            children: /* @__PURE__ */ S.jsx(_0, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ S.jsx(
          Ao,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Zoom out",
            "aria-label": "Zoom out",
            className: tu,
            onClick: (x) => {
              x.stopPropagation(), d();
            },
            children: /* @__PURE__ */ S.jsx(C0, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ S.jsx(
          Ao,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Reset view",
            "aria-label": "Reset view",
            className: tu,
            onClick: (x) => {
              x.stopPropagation(), m();
            },
            children: /* @__PURE__ */ S.jsx(V_, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ S.jsx(xh, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }),
        /* @__PURE__ */ S.jsx(
          Ao,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            className: tu,
            title: i ? "Exit full screen" : "Full screen",
            "aria-label": i ? "Exit full screen" : "Full screen",
            "aria-pressed": i,
            onClick: c,
            children: i ? /* @__PURE__ */ S.jsx(X_, { className: "size-4" }) : /* @__PURE__ */ S.jsx(T_, { className: "size-4" })
          }
        )
      ]
    }
  );
}
function Ch({
  active: n,
  color: o,
  swatchVariant: r = "solid",
  swatchFillOpacity: i,
  label: c,
  hidden: f,
  onSelect: d,
  onRename: m,
  onDelete: p,
  onToggleHidden: h
}) {
  const [y, x] = b.useState(!1), [v, R] = b.useState(c);
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      role: "listitem",
      className: tt(
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
        o ? /* @__PURE__ */ S.jsx(
          As,
          {
            color: o,
            variant: r,
            fillOpacity: i,
            className: "landmarks-layer-swatch"
          }
        ) : null,
        /* @__PURE__ */ S.jsx("div", { className: "landmarks-layer-label", children: y && m ? /* @__PURE__ */ S.jsx(
          tS,
          {
            "aria-label": "Rename layer",
            value: v,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (_) => _.stopPropagation(),
            onChange: (_) => R(_.target.value),
            onBlur: () => {
              m(v), x(!1);
            },
            onKeyDown: (_) => {
              _.stopPropagation(), _.key === "Enter" ? (_.preventDefault(), m(v), x(!1)) : _.key === "Escape" && (_.preventDefault(), R(c), x(!1));
            }
          }
        ) : /* @__PURE__ */ S.jsx(
          "span",
          {
            className: tt(
              "max-w-full truncate text-xs text-foreground",
              n ? "font-medium" : "font-normal"
            ),
            title: m ? "Double-click to rename" : c,
            onDoubleClick: (_) => {
              m && (_.preventDefault(), _.stopPropagation(), R(c), x(!0));
            },
            children: c
          }
        ) }),
        /* @__PURE__ */ S.jsxs("div", { className: "landmarks-trail", children: [
          h ? /* @__PURE__ */ S.jsx(
            Ao,
            {
              type: "button",
              variant: "ghost",
              size: "icon-xs",
              className: "landmarks-trail-hit",
              "aria-label": f ? "Show landmark" : "Hide landmark",
              onClick: (_) => {
                _.stopPropagation(), h();
              },
              children: f ? /* @__PURE__ */ S.jsx(z_, {}) : /* @__PURE__ */ S.jsx(k_, {})
            }
          ) : /* @__PURE__ */ S.jsx("span", { className: "landmarks-trail-cell", "aria-hidden": !0 }),
          p ? /* @__PURE__ */ S.jsx(
            Ao,
            {
              type: "button",
              variant: "ghost",
              size: "icon-xs",
              className: "landmarks-trail-hit",
              "aria-label": "Delete",
              onClick: (_) => {
                _.stopPropagation(), p();
              },
              children: /* @__PURE__ */ S.jsx(am, {})
            }
          ) : /* @__PURE__ */ S.jsx("span", { className: "landmarks-trail-cell", "aria-hidden": !0 })
        ] })
      ]
    }
  );
}
const Su = "px-2.5", La = "landmarks-section-trigger px-0 py-1.5 text-left hover:no-underline", cS = "landmarks-float landmarks-float--panel pointer-events-auto max-h-full gap-1 overflow-hidden py-1", hk = /* @__PURE__ */ new Set([
  "selections",
  "categories",
  "genes",
  "landmarks"
]), Kv = {
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
  return /* @__PURE__ */ S.jsx(Jh, { className: "gap-0", children: /* @__PURE__ */ S.jsxs("div", { className: "landmarks-slider-row", children: [
    /* @__PURE__ */ S.jsx(Wh, { className: "landmarks-slider-label", children: n }),
    /* @__PURE__ */ S.jsxs("div", { className: "landmarks-slider-capsule", children: [
      /* @__PURE__ */ S.jsx("div", { className: "landmarks-slider-control", children: r }),
      /* @__PURE__ */ S.jsx("span", { className: "landmarks-slider-value", "aria-hidden": !0, children: o })
    ] })
  ] }) });
}
function Qv({
  value: n,
  onChange: o,
  options: r
}) {
  return /* @__PURE__ */ S.jsx(
    aS,
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
        rS,
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
function Zv(n, o) {
  const r = n?.vmin ?? 0, i = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, i));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function mk({
  colors: n,
  labels: o,
  lo: r,
  hi: i
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${pk(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ S.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ S.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ S.jsx(As, { color: n[d] || "#94a3b8" }),
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
      /* @__PURE__ */ S.jsx("span", { children: Xv(r) }),
      /* @__PURE__ */ S.jsx("span", { children: Xv(i) })
    ] })
  ] });
}
function pk(n, o) {
  const r = n.replace("#", ""), i = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), m = parseInt(i.slice(0, 2), 16), p = parseInt(i.slice(2, 4), 16), h = parseInt(i.slice(4, 6), 16), y = Math.min(255, c + m), x = Math.min(255, f + p), v = Math.min(255, d + h);
  return `#${[y, x, v].map((R) => R.toString(16).padStart(2, "0")).join("")}`;
}
function gk(n, o, r, i, c, f, d) {
  const m = [
    [n, o],
    [r, i],
    [c, f]
  ], p = [];
  for (let h = 0; h < 3; h++) {
    const [y, x] = m[(h + 2) % 3], [v, R] = m[h], [_, A] = m[(h + 1) % 3], w = Math.hypot(v - y, R - x) || 1, O = Math.hypot(_ - v, A - R) || 1, N = Math.min(d, w * 0.35, O * 0.35), T = v + (y - v) / w * N, D = R + (x - R) / w * N, j = v + (_ - v) / O * N, U = R + (A - R) / O * N;
    h === 0 ? p.push(`M ${T} ${D}`) : p.push(`L ${T} ${D}`), p.push(`Q ${v} ${R} ${j} ${U}`);
  }
  return p.push("Z"), p.join(" ");
}
const gl = 80, Zm = 12, _h = 4, $v = 5, bk = gl - 2 * Zm, uS = Math.sqrt(3) / 2 * bk, fS = (gl - uS) / 2, dS = fS + uS, Tr = { x: gl / 2, y: fS }, Or = { x: Zm, y: dS }, kr = { x: gl - Zm, y: dS }, Jv = {
  x: (Or.x + Tr.x + kr.x) / 3,
  y: (Or.y + Tr.y + kr.y) / 3
};
function $m(n) {
  const o = n.x - Jv.x, r = n.y - Jv.y, i = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / i * $v,
    y: n.y + r / i * $v
  };
}
const Wv = $m(Or), e0 = $m(Tr), t0 = $m(kr), n0 = gk(
  Or.x,
  Or.y,
  Tr.x,
  Tr.y,
  kr.x,
  kr.y,
  8
);
function Rh(n) {
  const o = n.replace("#", "");
  return [
    parseInt(o.slice(0, 2), 16),
    parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ];
}
function yk() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const i = r.createImageData(o, o), c = Rh(kl[0]), f = Rh(kl[1]), d = Rh(kl[2]), m = Or.x / gl, p = Or.y / gl, h = Tr.x / gl, y = Tr.y / gl, x = kr.x / gl, v = kr.y / gl, R = (y - v) * (m - x) + (x - h) * (p - v);
  for (let _ = 0; _ < o; _++)
    for (let A = 0; A < o; A++) {
      const w = (A + 0.5) / o, O = (_ + 0.5) / o, N = ((y - v) * (w - x) + (x - h) * (O - v)) / R, T = ((v - p) * (w - x) + (m - x) * (O - v)) / R, D = 1 - N - T, j = (_ * o + A) * 4;
      if (N < -0.02 || T < -0.02 || D < -0.02) {
        i.data[j + 3] = 0;
        continue;
      }
      const U = Math.max(0, N), G = Math.max(0, T), L = Math.max(0, D);
      i.data[j] = Math.min(255, Math.round(c[0] * U + f[0] * G + d[0] * L)), i.data[j + 1] = Math.min(
        255,
        Math.round(c[1] * U + f[1] * G + d[1] * L)
      ), i.data[j + 2] = Math.min(
        255,
        Math.round(c[2] * U + f[2] * G + d[2] * L)
      ), i.data[j + 3] = 255;
    }
  return r.putImageData(i, 0, 0), n.toDataURL();
}
function vk() {
  const n = b.useId(), o = b.useMemo(() => yk(), []);
  return /* @__PURE__ */ S.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ S.jsxs(
    "svg",
    {
      viewBox: `0 0 ${gl} ${gl}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ S.jsx("defs", { children: /* @__PURE__ */ S.jsx("clipPath", { id: n, children: /* @__PURE__ */ S.jsx("path", { d: n0 }) }) }),
        o ? /* @__PURE__ */ S.jsx(
          "image",
          {
            href: o,
            width: gl,
            height: gl,
            clipPath: `url(#${n})`,
            preserveAspectRatio: "none"
          }
        ) : null,
        /* @__PURE__ */ S.jsx(
          "path",
          {
            d: n0,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Wv.x,
            cy: Wv.y,
            r: _h,
            fill: kl[0]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: e0.x,
            cy: e0.y,
            r: _h,
            fill: kl[1]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: t0.x,
            cy: t0.y,
            r: _h,
            fill: kl[2]
          }
        )
      ]
    }
  ) });
}
function xk({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: i, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (i !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ S.jsx(vk, {});
  const m = d.map((y, x) => kl[x % kl.length]);
  let p = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const y of d) {
      const x = r.find((v) => v.name === y);
      h = Math.max(h, Zv(x, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const y = r.find((v) => v.name === d[0]), x = Zv(y, c);
    p = x.lo, h = x.hi;
  }
  return /* @__PURE__ */ S.jsx(
    mk,
    {
      colors: m,
      labels: d,
      lo: p,
      hi: h
    }
  );
}
function Sk({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: i, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ S.jsx(
        Yv,
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
        Yv,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function Ek() {
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
    d || (d = i.ownerDocument.createElement("div"), d.setAttribute("data-spatial-rx-portal", ""), f.appendChild(d)), d.className = tt(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      i.classList.contains("dark") && "dark"
    ), r(d);
  }, []), [n, o];
}
function Ck({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, i = o.map((p) => p.name), c = r || [], f = c.length >= ak, [d, m] = Ek();
  return /* @__PURE__ */ S.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs(
      KO,
      {
        items: i,
        multiple: !0,
        value: c,
        onValueChange: (p) => {
          const h = Array.isArray(p) ? p.map(String) : [];
          n.setActiveGenes(h);
        },
        children: [
          /* @__PURE__ */ S.jsx(
            lS,
            {
              render: /* @__PURE__ */ S.jsx(
                Ao,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-8 w-full justify-between bg-muted/45 px-2 font-normal text-xs hover:bg-muted/70",
                  children: /* @__PURE__ */ S.jsx(QO, { children: (p) => {
                    const h = Array.isArray(p) ? p : [];
                    return h.length ? /* @__PURE__ */ S.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((y, x) => /* @__PURE__ */ S.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ S.jsx(
                            As,
                            {
                              color: kl[x % kl.length]
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
            JO,
            {
              container: m,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ S.jsx(
                  $O,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto bg-transparent text-xs shadow-none ring-0"
                  }
                ),
                /* @__PURE__ */ S.jsx(tk, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ S.jsx(WO, { children: (p) => {
                  const h = String(p), y = c.indexOf(h), x = f && y < 0;
                  return /* @__PURE__ */ S.jsxs(
                    ek,
                    {
                      value: h,
                      disabled: x,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ S.jsx(
                          As,
                          {
                            color: y >= 0 ? kl[y % kl.length] : "#94a3b8"
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
    /* @__PURE__ */ S.jsx(xk, { lm: n }),
    /* @__PURE__ */ S.jsx(Sk, { lm: n })
  ] });
}
function hS({
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
    active_category: p,
    gene_columns: h,
    active_genes: y,
    color_by: x,
    landmark_opacity: v
  } = n, R = x === "continuous" && (y?.length || 0) > 0, _ = /* @__PURE__ */ S.jsxs(
    Xx,
    {
      className: tt(o && "landmarks-section-solo"),
      ...o ? { type: "single", value: o, collapsible: !0 } : {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"]
      },
      children: [
        /* @__PURE__ */ S.jsxs(Na, { value: "selections", className: "border-b", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Selections" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: i.length ? /* @__PURE__ */ S.jsx(Eh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: i.map((A, w) => /* @__PURE__ */ S.jsx(
            Ch,
            {
              active: f === "selection" && d === w,
              color: Pv[w % Pv.length],
              swatchVariant: "selection",
              label: A.id,
              onSelect: () => n.select("selection", w),
              onRename: (O) => n.renameSelection(w, O),
              onDelete: () => n.deleteSelection(w)
            },
            `${A.id}-${w}`
          )) }) : /* @__PURE__ */ S.jsx(gi, { children: "No selections yet." }) })
        ] }),
        m.length ? /* @__PURE__ */ S.jsxs(Na, { value: "categories", className: "border-b", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Categories" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: m.map((A) => {
            const w = !R && A.name === p;
            return /* @__PURE__ */ S.jsxs(fA, { className: "group/cat", children: [
              /* @__PURE__ */ S.jsxs(
                dA,
                {
                  className: tt(
                    "landmarks-cat-trigger cursor-pointer text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    w && "landmarks-cat-trigger--active text-foreground"
                  ),
                  onClick: () => {
                    A.name === p && !R || (n.setActiveCategory(A), n.select("", -1));
                  },
                  children: [
                    /* @__PURE__ */ S.jsx(w_, { className: "landmarks-layer-icon shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                    /* @__PURE__ */ S.jsx("span", { className: "min-w-0 flex-1 truncate", children: A.name }),
                    /* @__PURE__ */ S.jsxs("span", { className: "landmarks-trail", "aria-hidden": !0, children: [
                      /* @__PURE__ */ S.jsx("span", { className: "landmarks-trail-cell" }),
                      /* @__PURE__ */ S.jsx("span", { className: "landmarks-trail-cell" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ S.jsx(hA, { className: "pl-4", children: /* @__PURE__ */ S.jsx(Eh, { className: "gap-0.5", children: (A.labels || []).map((O, N) => /* @__PURE__ */ S.jsx(
                Ch,
                {
                  active: f === "type" && A.name === p && d === N,
                  color: (A.palette || [])[N % Math.max((A.palette || []).length, 1)] || "#888888",
                  label: O,
                  onSelect: () => n.selectType(A, N)
                },
                `${A.name}-${O}`
              )) }) })
            ] }, A.name);
          }) }) })
        ] }) : null,
        h.length ? /* @__PURE__ */ S.jsxs(Na, { value: "genes", className: "border-b", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Genes" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(Ck, { lm: n }) })
        ] }) : null,
        /* @__PURE__ */ S.jsxs(Na, { value: "landmarks", className: "border-b-0", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Landmarks" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: c.length ? /* @__PURE__ */ S.jsx(Eh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: c.map((A, w) => /* @__PURE__ */ S.jsx(
            Ch,
            {
              active: f === "landmark" && d === w,
              color: qv[w % qv.length],
              swatchVariant: "landmark",
              swatchFillOpacity: v,
              label: A.id,
              hidden: !!A.hidden,
              onSelect: () => n.select("landmark", w),
              onRename: (O) => n.renameLandmark(w, O),
              onToggleHidden: () => n.toggleLandmarkHidden(w),
              onDelete: () => n.deleteLandmark(w)
            },
            `${A.id}-${w}`
          )) }) : /* @__PURE__ */ S.jsx(gi, { children: "No landmarks yet." }) })
        ] })
      ]
    }
  );
  return r ? /* @__PURE__ */ S.jsx("div", { className: tt("min-h-0 overflow-y-auto py-0", Su), children: _ }) : /* @__PURE__ */ S.jsx(Fx, { className: cS, children: /* @__PURE__ */ S.jsx(Kx, { className: tt("min-h-0 overflow-y-auto py-0", Su), children: _ }) });
}
function mS({
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
  } = n, p = uk(n.x_bounds, n.y_bounds), h = Math.max(p * 0.05, n.point_size * 5, 1e-6), y = Math.min(Math.max(n.point_size, 0), h), x = `${di(p, "0")} across`, v = n.selectedLandmark(), R = !!v && sS.includes(v.type), _ = !!v && iS.includes(v.type), A = n.activeNeighborhood(), w = !!A, O = Math.max(ck(d, m), 1), N = c > 0 ? c : O, T = Math.max(1, f || 64), D = Math.min(Number(A?.neighborhood_radius || 0), N), j = /* @__PURE__ */ S.jsxs(
    Xx,
    {
      className: tt(o && "landmarks-section-solo"),
      ...o ? { type: "single", value: o, collapsible: !0 } : {
        type: "multiple",
        defaultValue: ["style", "neighbors", "landmark"]
      },
      children: [
        /* @__PURE__ */ S.jsxs(Na, { value: "style", className: "border-b", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Style" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(Sh, { className: "gap-2.5", children: [
            /* @__PURE__ */ S.jsx(Oa, { label: "Point radius", valueLabel: di(n.point_size, "0"), children: /* @__PURE__ */ S.jsx(
              Ta,
              {
                min: 0,
                max: h,
                step: h / 200,
                value: [y],
                onValueChange: (U) => n.setPointSize(U[0] ?? 0)
              }
            ) }),
            /* @__PURE__ */ S.jsx(
              Oa,
              {
                label: "Point opacity",
                valueLabel: n.point_opacity.toFixed(2),
                children: /* @__PURE__ */ S.jsx(
                  Ta,
                  {
                    min: 0.05,
                    max: 1,
                    step: 0.01,
                    value: [n.point_opacity],
                    onValueChange: (U) => n.setPointOpacity(U[0] ?? 0.8)
                  }
                )
              }
            ),
            /* @__PURE__ */ S.jsx(
              Oa,
              {
                label: "Landmark opacity",
                valueLabel: n.landmark_opacity.toFixed(2),
                children: /* @__PURE__ */ S.jsx(
                  Ta,
                  {
                    min: 0.05,
                    max: 1,
                    step: 0.01,
                    value: [n.landmark_opacity],
                    onValueChange: (U) => n.setLandmarkOpacity(U[0] ?? 0.28)
                  }
                )
              }
            ),
            /* @__PURE__ */ S.jsx(Oa, { label: "Stroke", valueLabel: `${n.stroke_width} px`, children: /* @__PURE__ */ S.jsx(
              Ta,
              {
                min: 1,
                max: 8,
                step: 1,
                value: [n.stroke_width],
                onValueChange: (U) => n.setStrokeWidth(U[0] ?? 2)
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ S.jsxs(Na, { value: "stats", className: "border-b", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Stats" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs("dl", { className: "landmarks-stat-grid", children: [
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
              /* @__PURE__ */ S.jsx("dd", { children: di(n.neighbor_radius_max, "0") })
            ] }),
            /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip col-span-2", children: [
              /* @__PURE__ */ S.jsx("dt", { children: "Extent" }),
              /* @__PURE__ */ S.jsx("dd", { className: "truncate", children: x })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ S.jsxs(
          Na,
          {
            value: "neighbors",
            className: R || _ ? "border-b" : "border-b-0",
            children: [
              /* @__PURE__ */ S.jsx(za, { className: La, children: "Neighbors" }),
              /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(Sh, { className: "gap-2.5", children: w ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
                /* @__PURE__ */ S.jsx(gi, { className: "text-[0.6875rem]", children: A.id ? String(A.id) : "Selection" }),
                /* @__PURE__ */ S.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-[0.6875rem]", children: [
                  /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                    "seed"
                  ] }),
                  /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ S.jsx(As, { color: "#00e5cc" }),
                    "neighborhood"
                  ] }),
                  /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                    "other"
                  ] })
                ] }),
                /* @__PURE__ */ S.jsxs(Jh, { className: "gap-1.5", children: [
                  /* @__PURE__ */ S.jsx(Wh, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Neighborhood" }),
                  /* @__PURE__ */ S.jsx(
                    Qv,
                    {
                      value: A.neighborhood || "off",
                      onChange: (U) => n.patchNeighborhood({ neighborhood: U }),
                      options: [
                        { value: "off", label: "Off" },
                        { value: "radius", label: "Radius" },
                        { value: "knn", label: "k-NN" }
                      ]
                    }
                  )
                ] }),
                A.neighborhood === "radius" ? /* @__PURE__ */ S.jsx(
                  Oa,
                  {
                    label: "Radius",
                    valueLabel: `${di(D, "0")}${N > 0 ? ` / ${di(N, "0")}` : ""}`,
                    children: /* @__PURE__ */ S.jsx(
                      Ta,
                      {
                        min: 0,
                        max: N,
                        step: N / 200 || 1,
                        value: [D],
                        onValueChange: (U) => {
                          const G = Math.min(Math.max(U[0] ?? 0, 0), N);
                          n.patchNeighborhood({
                            neighborhood: "radius",
                            neighborhood_radius: G
                          });
                        }
                      }
                    )
                  }
                ) : null,
                A.neighborhood === "knn" ? /* @__PURE__ */ S.jsx(
                  Oa,
                  {
                    label: "k",
                    valueLabel: String(
                      Math.min(Number(A.neighborhood_k || 12), T)
                    ),
                    children: /* @__PURE__ */ S.jsx(
                      Ta,
                      {
                        min: 1,
                        max: T,
                        step: 1,
                        value: [Math.min(Number(A.neighborhood_k || 12), T)],
                        onValueChange: (U) => n.patchNeighborhood({
                          neighborhood: "knn",
                          neighborhood_k: U[0] ?? 12
                        })
                      }
                    )
                  }
                ) : null,
                /* @__PURE__ */ S.jsx(gi, { className: "text-[0.6875rem]", children: "Sliders subset precomputed graphs. Shift+wheel sizes the neighborhood." })
              ] }) : /* @__PURE__ */ S.jsx(gi, { className: "text-[0.6875rem]", children: "Select a type or selection to edit neighbors." }) }) })
            ]
          }
        ),
        R || _ ? /* @__PURE__ */ S.jsxs(Na, { value: "landmark", className: "border-b-0", children: [
          /* @__PURE__ */ S.jsx(za, { className: La, children: "Landmark" }),
          /* @__PURE__ */ S.jsx(Da, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(Sh, { className: "gap-2.5", children: [
            R ? /* @__PURE__ */ S.jsx(
              Oa,
              {
                label: "Tension",
                valueLabel: Number(
                  v?.tension ?? i ?? 0
                ).toPrecision(3),
                children: /* @__PURE__ */ S.jsx(
                  Ta,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [Number(v?.tension ?? i ?? 0)],
                    onValueChange: (U) => n.patchLandmark({ tension: U[0] ?? 0 })
                  }
                )
              }
            ) : null,
            _ ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
              /* @__PURE__ */ S.jsxs(Jh, { className: "gap-1.5", children: [
                /* @__PURE__ */ S.jsx(Wh, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Buffer" }),
                /* @__PURE__ */ S.jsx(
                  Qv,
                  {
                    value: v?.buffer_side || "both",
                    onChange: (U) => n.patchLandmark({ buffer_side: U }),
                    options: [
                      { value: "left", label: "Left" },
                      { value: "both", label: "Both" },
                      { value: "right", label: "Right" }
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ S.jsx(
                Oa,
                {
                  label: "Width",
                  valueLabel: di(Number(v?.buffer_width || 0)),
                  children: /* @__PURE__ */ S.jsx(
                    Ta,
                    {
                      min: 0,
                      max: O,
                      step: O / 200,
                      value: [
                        Math.min(Number(v?.buffer_width || 0), O)
                      ],
                      onValueChange: (U) => n.patchLandmark({ buffer_width: U[0] ?? 0 })
                    }
                  )
                }
              ),
              /* @__PURE__ */ S.jsx(gi, { className: "text-[0.6875rem]", children: "Shift+wheel sizes the buffer." })
            ] }) : null
          ] }) })
        ] }) : null
      ]
    }
  );
  return r ? /* @__PURE__ */ S.jsx("div", { className: tt("min-h-0 overflow-y-auto py-0", Su), children: j }) : /* @__PURE__ */ S.jsx(Fx, { className: cS, children: /* @__PURE__ */ S.jsx(Kx, { className: tt("min-h-0 overflow-y-auto py-0", Su), children: j }) });
}
function _k({
  lm: n,
  open: o,
  onOpenChange: r
}) {
  const i = n.selectedLandmark(), c = !!i && sS.includes(i.type), f = !!i && iS.includes(i.type), d = n.category_columns.length, m = n.gene_columns.length, p = b.useRef(null), [h, y] = b.useState(!1), [x, v] = b.useState(!1), R = b.useMemo(() => {
    const w = ["selections"];
    return d && w.push("categories"), m && w.push("genes"), w.push("landmarks", "style", "stats", "neighbors"), (c || f) && w.push("landmark"), w;
  }, [d, m, c, f]);
  b.useEffect(() => {
    o && !R.includes(o) && r(null);
  }, [o, R, r]);
  const _ = b.useCallback(() => {
    const w = p.current;
    if (!w) return;
    const O = w.scrollWidth - w.clientWidth;
    if (O <= 1) {
      y(!1), v(!1);
      return;
    }
    y(w.scrollLeft > 1), v(w.scrollLeft < O - 1);
  }, []);
  b.useLayoutEffect(() => {
    const w = p.current;
    if (!w) return;
    _();
    const O = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => _());
    return O?.observe(w), () => O?.disconnect();
  }, [R, _]), b.useLayoutEffect(() => {
    if (!o || !p.current) return;
    p.current.querySelector(
      `[data-section-id="${o}"]`
    )?.scrollIntoView({ inline: "nearest", block: "nearest" }), _();
  }, [o, _]);
  const A = o ? Kv[o] : null;
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "landmarks__chrome-sections",
      onMouseDown: (w) => w.stopPropagation(),
      onWheel: (w) => w.stopPropagation(),
      children: [
        o && A ? /* @__PURE__ */ S.jsxs(
          "div",
          {
            className: "landmarks__chrome-sheet landmarks-float landmarks-float--panel",
            role: "dialog",
            "aria-label": A.label,
            children: [
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks__chrome-sheet-head", children: [
                /* @__PURE__ */ S.jsx("span", { className: "text-sm font-medium", children: A.label }),
                /* @__PURE__ */ S.jsx(
                  Ao,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon-sm",
                    className: "size-7 shrink-0 text-muted-foreground",
                    "aria-label": `Close ${A.label}`,
                    onClick: () => r(null),
                    children: /* @__PURE__ */ S.jsx(am, { className: "size-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ S.jsx("div", { className: "landmarks__chrome-sheet-body", children: hk.has(o) ? /* @__PURE__ */ S.jsx(hS, { lm: n, forceSection: o, embedded: !0 }) : /* @__PURE__ */ S.jsx(mS, { lm: n, forceSection: o, embedded: !0 }) })
            ]
          }
        ) : null,
        /* @__PURE__ */ S.jsx(
          "div",
          {
            className: tt(
              "landmarks__chrome-section-bar landmarks-float landmarks-float--toolbar",
              h && "landmarks__chrome-section-bar--fade-start",
              x && "landmarks__chrome-section-bar--fade-end"
            ),
            children: /* @__PURE__ */ S.jsx(
              "div",
              {
                ref: p,
                className: "landmarks__chrome-section-scroll",
                role: "toolbar",
                "aria-label": "Panel sections",
                onScroll: _,
                children: R.map((w) => {
                  const { label: O } = Kv[w], N = o === w;
                  return /* @__PURE__ */ S.jsx(
                    Ao,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      "data-section-id": w,
                      "aria-pressed": N,
                      className: tt(
                        "h-7 shrink-0 rounded-full px-2.5 text-[0.6875rem] font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                        N && "bg-muted text-foreground"
                      ),
                      onClick: () => r(N ? null : w),
                      children: O
                    },
                    w
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
const Ts = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, Rk = 3;
function nu(n) {
  return { ...Ts, ...n };
}
function em(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function wk(n, o) {
  const r = n.get("gene_columns") || [], i = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!i.has(f) || c.includes(f)) && (c.push(f), c.length >= Rk))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", m = f.find((p) => p.name === d) || f[0];
    if (m) {
      em(n, m);
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
function Mk(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function Ak(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function pS(n, o, r, i, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...Ts, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const m = i.find(
      (p) => p.id === d && (!p.column || p.column === f)
    );
    return { ...Ts, id: d, column: f, ...m || {} };
  }
  return null;
}
function gS(n, o, r, i, c, f, d, m) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (v, R) => R === r ? { ...Ts, ...v, ...i } : v
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const p = d[r];
  if (!p) return;
  const h = [...f], y = h.findIndex(
    (v) => v.id === p && (!v.column || v.column === m)
  ), x = {
    ...Ts,
    id: p,
    column: m,
    ...y >= 0 ? h[y] : {},
    ...i
  };
  y >= 0 ? h[y] = x : h.push(x), n.set("type_neighborhoods", h), n.save_changes();
}
function bS(n, o, r, i) {
  n.set(
    "landmarks",
    i.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function tm(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function Tk(n, o) {
  n.set("mode", o), n.save_changes();
}
function yS(n, o) {
  return n.filter((r, i) => i !== o);
}
function vS(n, o, r, i) {
  return o !== n ? { kind: o, index: r } : r === i ? { kind: "", index: -1 } : r > i ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function Ok(n, o, r, i, c) {
  const f = vS("selection", i, c, o);
  n.set("selections", yS(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function kk(n, o, r, i, c) {
  const f = vS("landmark", i, c, o);
  n.set("landmarks", yS(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function Nk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    i.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function zk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    i.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Dk(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (i, c) => c === o ? { ...i, hidden: !i.hidden } : i
    )
  ), n.save_changes();
}
function jk(n, o) {
  const r = Number(o);
  !Number.isFinite(r) || r < 0 || (n.set("point_size", r), n.save_changes());
}
function Lk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("point_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Vk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("landmark_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Ik(n, o) {
  const r = Math.round(Number(o));
  Number.isFinite(r) && (n.set("stroke_width", Math.min(12, Math.max(1, r))), n.save_changes());
}
const nm = "9.1.14", Hk = `https://esm.sh/@deck.gl/core@${nm}`, Uk = `https://esm.sh/@deck.gl/layers@${nm}?deps=@deck.gl/core@${nm}`, ka = { depthCompare: "always", depthWriteEnabled: !1 }, Sr = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], ys = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], wh = "#00e5cc", Bk = 0.3, Gk = 0.9, lu = 2, Mh = 1, Yk = 0.55, Ah = ["line", "spline", "gradient"];
function Th(n) {
  if (!n) return new Float32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let i = 0; i < o.length; i++) r[i] = o.charCodeAt(i);
  return new Float32Array(r.buffer);
}
function Oh(n) {
  if (!n) return new Int32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let i = 0; i < o.length; i++) r[i] = o.charCodeAt(i);
  return new Int32Array(r.buffer);
}
function qk(n) {
  return 1 - (1 - n) ** 4;
}
function ou(n) {
  const o = document.createElement("canvas");
  o.width = o.height = 1;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  r.fillStyle = "#000000", r.fillStyle = n, r.fillRect(0, 0, 1, 1);
  const [i, c, f, d] = r.getImageData(0, 0, 1, 1).data;
  return [i / 255, c / 255, f / 255, d / 255 || 1];
}
function l0({ model: n, host: o }) {
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
  const p = document.createElement("div");
  p.className = "landmarks__tooltip", p.hidden = !0, f.append(d, m), o.append(f, p);
  let h = () => {
  };
  const y = new MutationObserver(() => {
    h(), q && ct();
  });
  y.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function x(E, M) {
    const k = o.getBoundingClientRect();
    p.style.left = `${E - k.left + 12}px`, p.style.top = `${M - k.top + 12}px`, p.hidden = !1;
  }
  function v(E, M, k) {
    p.replaceChildren(), p.textContent = E, x(M, k);
  }
  function R(E, M, k) {
    p.replaceChildren();
    const V = document.createElement("div");
    V.className = "landmarks__tooltip-body";
    const X = document.createElement("span");
    X.className = "landmarks__tooltip-swatch", X.style.backgroundColor = E.color || "#94a3b8", X.setAttribute("aria-hidden", "true"), V.appendChild(X);
    const le = document.createElement("span");
    le.className = "landmarks__tooltip-text";
    const oe = document.createElement("span");
    if (oe.className = "landmarks__tooltip-title", oe.textContent = E.title, le.appendChild(oe), E.detail) {
      const ne = document.createElement("span");
      ne.className = "landmarks__tooltip-detail", ne.textContent = E.detail, le.appendChild(ne);
    }
    V.appendChild(le), p.appendChild(V), x(M, k);
  }
  function _() {
    p.hidden = !0;
  }
  function A(E) {
    return E ? E[0].toUpperCase() + E.slice(1) : "";
  }
  function w(E, M) {
    return !M || !M.length ? "#94a3b8" : M[(E % M.length + M.length) % M.length];
  }
  function O(E) {
    const M = n.get("category_columns") || [], k = je();
    if (k < 0) return null;
    const V = M[k], X = V && (V.labels || [])[E];
    return X == null ? null : {
      title: String(X),
      detail: String(V.name || ""),
      color: w(E, V.palette || n.get("point_palette"))
    };
  }
  function N(E) {
    return an()[E] ? O(We(E)) : null;
  }
  function T(E, M, k, V) {
    const X = M[E];
    return !X || V && X.hidden ? null : {
      title: String(X.id),
      detail: A(X.type),
      color: k[E % k.length]
    };
  }
  function D(E) {
    return E ? E.kind === "landmark" ? T(E.index, n.get("landmarks") || [], Sr, !0) : E.kind === "selection" ? T(
      E.index,
      n.get("selections") || [],
      ys,
      !1
    ) : E.kind === "type" ? O(E.index) : typeof E.i == "number" ? N(E.i) : null : null;
  }
  function j(E, M) {
    const k = Math.max(1, d.clientWidth || d.width), V = Math.max(1, d.clientHeight || d.height), X = ge || {}, le = Math.pow(2, X.zoom ?? 0), oe = X.target?.[0] ?? 0, ne = X.target?.[1] ?? 0;
    return [(E - oe) * le + k / 2, V / 2 - (M - ne) * le];
  }
  function U(E, M, k) {
    let V = 1 / 0;
    for (let X = 0; X < k.length - 1; X++) {
      const le = k[X][0], oe = k[X][1], ne = k[X + 1][0], pe = k[X + 1][1], ve = ne - le, Ne = pe - oe, Fe = ve * ve + Ne * Ne;
      let Me = Fe ? ((E - le) * ve + (M - oe) * Ne) / Fe : 0;
      Me = Math.max(0, Math.min(1, Me));
      const ke = le + Me * ve - E, Tt = oe + Me * Ne - M, yn = ke * ke + Tt * Tt;
      yn < V && (V = yn);
    }
    return V;
  }
  function G(E, M) {
    if (!ge) return null;
    const k = n.get("selected_kind") === "landmark", V = n.get("selected_index"), X = n.get("landmarks") || [];
    for (let pe = X.length - 1; pe >= 0; pe--) {
      const ve = X[pe];
      if (!ve || ve.hidden) continue;
      if (ve.type === "point") {
        const Me = (ve.vertices || [])[0];
        if (!Me) continue;
        const ke = j(Me[0], Me[1]), Tt = k && pe === V ? 9 : 8;
        if ((ke[0] - E) ** 2 + (ke[1] - M) ** 2 <= Tt * Tt)
          return T(pe, X, Sr, !0);
        continue;
      }
      const Ne = go(ve);
      if (ve.type === "shape" && Ne.length >= 3) {
        const Me = Ne.map((ke) => j(ke.x, ke.y));
        if (Hn({ x: E, y: M }, Me)) return T(pe, X, Sr, !0);
        continue;
      }
      const Fe = Ll(ve);
      if (Fe && Fe.length >= 3) {
        const Me = Fe.map((ke) => j(ke.x, ke.y));
        if (Hn({ x: E, y: M }, Me)) return T(pe, X, Sr, !0);
      }
      if (Ne.length >= 2) {
        const Me = (n.get("stroke_width") || 2) + 3, ke = Ne.map((Tt) => j(Tt.x, Tt.y));
        if (U(E, M, ke) <= Me * Me)
          return T(pe, X, Sr, !0);
      }
    }
    const le = n.get("selections") || [];
    for (let pe = le.length - 1; pe >= 0; pe--) {
      const ve = al(le[pe] || {});
      if (ve.length < 3) continue;
      const Ne = ve.map(([Fe, Me]) => j(Fe, Me));
      if (Hn({ x: E, y: M }, Ne))
        return T(pe, le, ys, !1);
    }
    const oe = El(), ne = na(oe);
    if (oe && ne && ne.neighborhood !== "off" && te.length) {
      const pe = oe.kind === "type" ? O(oe.index) : T(oe.index, le, ys, !1);
      if (!pe) return null;
      for (const ve of te) {
        const Ne = ve.path;
        if (!Array.isArray(Ne) || Ne.length < 2) continue;
        const Fe = Ne.map((Me) => j(Me[0], Me[1]));
        if (U(E, M, Fe) <= 16) return pe;
      }
    }
    return null;
  }
  m.addEventListener("mousedown", (E) => E.stopPropagation()), m.addEventListener("wheel", (E) => E.stopPropagation(), { passive: !0 });
  const L = n.get("modes") || [], K = ["select", "lasso"].filter(
    (E) => L.includes(E)
  ), ie = ["point", "line", "spline", "shape"].filter(
    (E) => L.includes(E)
  ), ue = [...K, ...ie];
  let W = n.get("mode") || "select";
  ue.includes(W) || (W = ue[0] || "select");
  let q = null, se = null, ge = null, H = 0, B = !1, Q = null, ye = null, ce = { key: "", data: [] }, z = null, P = !1, te = [], ae = () => {
  }, be = () => {
  }, we = null, Ge = null, Ae = null, Oe = null;
  function it() {
    const E = n.get("category_codes") || "";
    we = E ? Oh(E) : null;
  }
  it();
  function gt() {
    const E = n.get("gene_values") || "";
    Ge = E ? Th(E) : null;
  }
  gt();
  function ze() {
    Ae = Je(
      n.get("neighbor_indptr") || "",
      n.get("neighbor_indices") || "",
      n.get("neighbor_distances") || ""
    ), Oe = Je(
      n.get("radius_indptr") || "",
      n.get("radius_indices") || "",
      n.get("radius_distances") || ""
    );
  }
  function Je(E, M, k) {
    const V = Oh(E), X = Oh(M), le = Th(k);
    return V.length ? { indptr: V, indices: X, distances: le } : null;
  }
  ze();
  function je() {
    const E = n.get("category_columns") || [], M = n.get("active_category") || "";
    return E.findIndex((k) => k.name === M);
  }
  function We(E) {
    n.get("category_columns");
    const M = je(), k = an();
    return M < 0 || !we || !k.length ? Math.round(k[E]?.valueA || 0) : we[M * k.length + E];
  }
  const qe = ["#ff0099", "#b8ff00", "#00b7ff"];
  function De(E) {
    return (n.get("gene_columns") || []).find((k) => k.name === E) || null;
  }
  function nt(E, M) {
    const V = (n.get("gene_columns") || []).findIndex((le) => le.name === M), X = an();
    return V < 0 || !Ge || !Ge.length || !X.length ? null : Ge[V * X.length + E];
  }
  function Le(E, M, k) {
    const V = Number.isFinite(M) ? M : 0, X = Number.isFinite(k) && k > V ? k : V + 1, le = Math.max(0, Math.min(1, E ?? 0)), oe = Math.max(0, V + le * (X - V));
    return n.get("gene_log1p") ? Math.log1p(oe) : oe;
  }
  function et(E, M) {
    const k = Number.isFinite(E) ? E : 0, V = Number.isFinite(M) && M > k ? M : k + 1, X = Math.max(0, V), le = Math.max(0, k);
    if (n.get("gene_log1p")) {
      const oe = Math.log1p(le), ne = Math.log1p(X);
      return ne > oe ? ne : ne + 1e-6;
    }
    return X > le ? X : X + 1e-6;
  }
  function st(E, M) {
    const k = Number.isFinite(E) ? E : 0, V = Math.max(0, k);
    return n.get("gene_log1p") ? Math.log1p(V) : V;
  }
  function lt(E, M, k) {
    const V = De(M);
    if (!V) return 0;
    const X = nt(E, M);
    if (X == null) return 0;
    const le = V.vmin ?? 0, oe = V.vmax ?? 1, ne = Le(X, le, oe);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const Fe = k > 0 ? k : et(le, oe);
      return Math.max(0, Math.min(1, ne / Fe));
    }
    const ve = st(le), Ne = et(le, oe);
    return Ne <= ve ? 0 : Math.max(0, Math.min(1, (ne - ve) / (Ne - ve)));
  }
  function Ce(E) {
    let M = 0;
    for (const k of E) {
      const V = De(k);
      V && (M = Math.max(M, et(V.vmin ?? 0, V.vmax ?? 1)));
    }
    return M;
  }
  function Z(E, M) {
    const k = n.get("active_genes") || [], V = an();
    if (!k.length || !V.length) return null;
    const X = (n.get("gene_scale_mode") || "independent") === "shared" ? Ce(k) : 0;
    let le = 0, oe = 0, ne = 0, pe = 0;
    for (let ve = 0; ve < k.length; ve++) {
      const Ne = lt(E, k[ve], X);
      if (!(Ne > 0)) continue;
      const Fe = It(qe[ve % qe.length], 1);
      le += Fe[0] * Ne, oe += Fe[1] * Ne, ne += Fe[2] * Ne, pe += Ne;
    }
    return pe < 1e-6 ? It("#6b7280", M * 0.35) : [
      Math.min(255, Math.round(le)),
      Math.min(255, Math.round(oe)),
      Math.min(255, Math.round(ne)),
      Math.round(Math.max(0, Math.min(1, M)) * 255)
    ];
  }
  let de = null, Te = [];
  function Ee() {
    return Te.length > 0 && ["polygon", "line", "spline", "shape"].includes(W);
  }
  let Ie = !1, Ze = null, wt = "", vt = -1, Gt = !1, Mt = !1, mt = !1, Yt = [], ot = !1, Zt = null, zt = null;
  function _n(E, M) {
    const k = new Set((M || []).map((V) => String(V.id)));
    for (let V = 1; ; V++) {
      const X = `${E} ${V}`;
      if (!k.has(X)) return X;
    }
  }
  function Rn(E) {
    return _n("landmark", E);
  }
  function Kt(E) {
    return _n("selection", E);
  }
  function at() {
    Te = [], Yt = [], mt = !1, ot = !1, Zt = null, zt = null;
  }
  function ht(E) {
    const M = d.getBoundingClientRect();
    if (!M.width || !M.height) return null;
    const k = E.clientX - M.left, V = E.clientY - M.top, X = q?.isInitialized ? q.getViewports()[0] : null;
    if (!X) return null;
    const [le, oe] = X.unproject([k, V]);
    return { x: le, y: oe, px: k, py: V };
  }
  function $e() {
    return {
      dragPan: W === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function tn() {
    const E = W === "select";
    d.style.cursor = E ? "grab" : "crosshair", q && q.setProps({ controller: $e() });
  }
  function wn() {
    const E = Math.max(1, Math.round(c.clientWidth || 1)), M = Math.max(1, Math.round(c.clientHeight || 1));
    q && q.setProps({ width: E, height: M, useDevicePixels: !0 });
    const k = n.get("axes_pixel_bounds") || [0, 0, E, M];
    return (k[2] !== E || k[3] !== M) && (n.set("axes_pixel_bounds", [0, 0, E, M]), n.save_changes()), { w: E, h: M };
  }
  function Mn(E) {
    if (!Number.isFinite(E)) return "";
    const M = Math.abs(E);
    return M !== 0 && (M >= 1e3 || M < 0.01) ? E.toExponential(1) : M >= 100 ? E.toFixed(0) : M >= 10 ? E.toFixed(1) : E.toFixed(2);
  }
  function Vt() {
    if (!m) return;
    const E = n.get("color_by") || "categorical", M = n.get("legend_title") || "", k = n.get("point_palette") || [], V = n.get("active_genes") || [];
    if (m.innerHTML = "", M) {
      const X = document.createElement("div");
      X.className = "landmarks__legend-title", X.textContent = M, m.appendChild(X);
    }
    if (E === "continuous" && V.length > 0) {
      m.hidden = !0;
      return;
    }
    if (E === "continuous" && k.length > 1) {
      const X = document.createElement("div");
      X.className = "landmarks__legend-bar", X.style.background = `linear-gradient(to top, ${k[0]}, ${k[Math.floor(k.length / 2)]}, ${k[k.length - 1]})`;
      const le = document.createElement("div");
      le.className = "landmarks__legend-scale";
      const oe = document.createElement("span");
      oe.textContent = Mn(n.get("color_vmax"));
      const ne = document.createElement("span");
      ne.textContent = Mn(n.get("color_vmin")), le.appendChild(oe), le.appendChild(ne);
      const pe = document.createElement("div");
      pe.className = "landmarks__legend-continuous", pe.appendChild(X), pe.appendChild(le), m.appendChild(pe), m.hidden = !1;
      return;
    }
    if (E === "categorical") {
      m.hidden = !0;
      return;
    }
    m.hidden = !M;
  }
  function It(E, M) {
    const k = String(E || "#60a5fa").replace("#", ""), V = k.length === 3 ? k.split("").map((le) => le + le).join("") : k.padEnd(6, "0").slice(0, 6), X = Number.parseInt(V, 16);
    return [
      X >> 16 & 255,
      X >> 8 & 255,
      X & 255,
      Math.round(Math.max(0, Math.min(1, M)) * 255)
    ];
  }
  function Ht(E) {
    const M = n.get("point_opacity") ?? 0.75, k = n.get("color_by") || "categorical";
    let V;
    if (k === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        V = Z(E.i, M) || It("#6b7280", M * 0.35);
      else {
        const oe = n.get("point_palette") || ["#60a5fa"];
        if (oe.length > 1) {
          const pe = Math.max(0, Math.min(1, E.valueA)) * (oe.length - 1), ve = Math.floor(pe), Ne = Math.min(oe.length - 1, ve + 1), Fe = pe - ve, Me = It(oe[ve], M), ke = It(oe[Ne], M);
          V = Me.map((Tt, yn) => Math.round(Tt + (ke[yn] - Tt) * Fe));
        } else
          V = It(oe[0], M);
      }
    else {
      const le = n.get("category_columns") || [], oe = je(), ne = oe >= 0 ? le[oe] : null, pe = ne && ne.palette || n.get("point_palette") || ["#60a5fa"], ve = ne ? We(E.i) : Math.round(E.valueA);
      V = It(w(ve, pe), M);
    }
    if (!P || !z) return V;
    const X = z[E.i] || 0;
    return X === lu || X === Mh ? (V[3] = 255, V) : (V[3] = Math.round((V[3] || 255) * 0.28), V);
  }
  function fo(E) {
    const M = n.get("point_size") ?? 2;
    if (!P || !z) return M;
    const k = z[E.i] || 0;
    return k === lu || k === Mh ? M : M * Yk;
  }
  function un(E) {
    return E.map((M) => [M.x, M.y]);
  }
  function fn(E) {
    const M = un(E);
    if (!M.length) return M;
    const k = M[0], V = M[M.length - 1];
    return (k[0] !== V[0] || k[1] !== V[1]) && M.push(k), M;
  }
  function ho(E, M) {
    if (W === "ellipse") {
      const k = (E.x + M.x) / 2, V = (E.y + M.y) / 2, X = Math.abs(M.x - E.x) / 2, le = Math.abs(M.y - E.y) / 2, oe = [];
      for (let ne = 0; ne < 64; ne++) {
        const pe = ne / 64 * Math.PI * 2;
        oe.push([k + X * Math.cos(pe), V + le * Math.sin(pe)]);
      }
      return oe;
    }
    return [
      [E.x, E.y],
      [M.x, E.y],
      [M.x, M.y],
      [E.x, M.y]
    ];
  }
  function al(E) {
    if (E.type === "polygon" || E.type === "lasso")
      return (E.vertices || []).map(([k, V]) => [k, V]);
    const M = -(E.angle || 0);
    if (E.type === "rectangle") {
      const k = E.cx, V = E.cy, X = E.width, le = E.height, oe = { x: k, y: V };
      return [
        { x: k - X / 2, y: V - le / 2 },
        { x: k + X / 2, y: V - le / 2 },
        { x: k + X / 2, y: V + le / 2 },
        { x: k - X / 2, y: V + le / 2 }
      ].map((ne) => {
        const pe = to(ne, oe, M);
        return [pe.x, pe.y];
      });
    }
    if (E.type === "ellipse") {
      const k = E.cx, V = E.cy, X = E.rx, le = E.ry, oe = { x: k, y: V }, ne = [];
      for (let pe = 0; pe < 64; pe++) {
        const ve = pe / 64 * Math.PI * 2, Ne = to(
          { x: k + X * Math.cos(ve), y: V + le * Math.sin(ve) },
          oe,
          M
        );
        ne.push([Ne.x, Ne.y]);
      }
      return ne;
    }
    return [];
  }
  function an() {
    const E = n.get("points_data") || "", [M, k] = n.get("x_bounds"), [V, X] = n.get("y_bounds"), le = `${E.length}:${M}:${k}:${V}:${X}:${E.slice(0, 32)}:${E.slice(-32)}`;
    if (le === ce.key) return ce.data;
    const oe = Th(E), ne = Math.floor(oe.length / 4), pe = new Array(ne);
    for (let ve = 0; ve < ne; ve++) {
      const Ne = ve * 4;
      pe[ve] = {
        i: ve,
        x: M + (oe[Ne] + 1) / 2 * (k - M),
        y: V + (oe[Ne + 1] + 1) / 2 * (X - V),
        valueA: oe[Ne + 2]
      };
    }
    return ce = { key: le, data: pe }, pe;
  }
  function mo(E, M = 8) {
    const k = E / Math.max(M, 1), X = 10 ** Math.floor(Math.log10(Math.max(k, 1e-12))), le = k / X;
    return (le <= 1 ? 1 : le <= 2 ? 2 : le <= 5 ? 5 : 10) * X;
  }
  function gn() {
    const E = q?.isInitialized ? q.getViewports()?.[0] : null;
    if (E?.unproject && E.width > 1 && E.height > 1) {
      const [le, oe] = E.unproject([0, E.height]), [ne, pe] = E.unproject([E.width, 0]);
      return {
        xMin: Math.min(le, ne),
        xMax: Math.max(le, ne),
        yMin: Math.min(oe, pe),
        yMax: Math.max(oe, pe)
      };
    }
    const [M, k] = n.get("x_bounds"), [V, X] = n.get("y_bounds");
    return { xMin: M, xMax: k, yMin: V, yMax: X };
  }
  function Dt() {
    const E = gn(), M = Math.max(E.xMax - E.xMin, E.yMax - E.yMin, 1e-9);
    return mo(M, 8);
  }
  function At(E = !1) {
    const M = Dt();
    !E && M === ye || (ye = M, ct());
  }
  function Ye() {
    if (!se) return null;
    const { PathLayer: E } = se, M = gn(), k = ye || mo(Math.max(M.xMax - M.xMin, M.yMax - M.yMin, 1e-9), 8);
    ye = k;
    const V = k * 2, X = Math.floor((M.xMin - V) / k) * k, le = Math.floor((M.yMin - V) / k) * k, oe = [];
    for (let Me = X; Me <= M.xMax + V + k * 0.5; Me += k)
      oe.push({
        path: [
          [Me, M.yMin - V],
          [Me, M.yMax + V]
        ]
      });
    for (let Me = le; Me <= M.yMax + V + k * 0.5; Me += k)
      oe.push({
        path: [
          [M.xMin - V, Me],
          [M.xMax + V, Me]
        ]
      });
    const ne = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [pe, ve, Ne] = ou(ne), Fe = [Math.round(pe * 255), Math.round(ve * 255), Math.round(Ne * 255), 160];
    return new E({
      id: "landmarks-grid",
      data: oe,
      getPath: (Me) => Me.path,
      getColor: Fe,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function rl() {
    if (!se) return null;
    const { ScatterplotLayer: E } = se, M = an();
    if (!M.length) return null;
    const V = [
      n.get("point_size") ?? 2,
      P,
      n.get("selected_kind"),
      n.get("selected_index"),
      n.get("type_neighborhoods"),
      n.get("selections"),
      n.get("active_category")
    ], X = [
      n.get("point_palette"),
      n.get("point_opacity"),
      n.get("color_by"),
      n.get("active_genes"),
      n.get("gene_values"),
      n.get("gene_scale_mode"),
      n.get("gene_log1p"),
      ...V
    ], le = (n.get("category_columns") || []).length > 0;
    return [
      new E({
        id: "landmarks-points",
        data: M,
        getPosition: (oe) => [oe.x, oe.y, 0],
        getFillColor: (oe) => Ht(oe),
        getRadius: (oe) => fo(oe),
        radiusUnits: "common",
        radiusMinPixels: 1.5,
        stroked: !1,
        filled: !0,
        pickable: le,
        updateTriggers: {
          getFillColor: X,
          getRadius: V
        }
      })
    ];
  }
  function Mi() {
    if (!se) return [];
    const { ScatterplotLayer: E } = se, M = n.get("selected_kind"), k = n.get("selected_index"), V = n.get("point_size") ?? 2, X = an(), le = [];
    return (n.get("selections") || []).forEach((oe, ne) => {
      const pe = al(oe);
      if (pe.length < 3) return;
      const ve = M === "selection" && ne === k, Ne = ys[ne % ys.length], Fe = It(Ne, ve ? 0.22 : 0.1), Me = It(Ne, ve ? 1 : 0.7), ke = ve ? V * 1.15 : V;
      for (let Tt = 0; Tt < X.length; Tt++) {
        const yn = X[Tt];
        Hn(yn, pe) && le.push({
          position: [yn.x, yn.y, 0],
          fill: Fe,
          line: Me,
          radius: ke,
          kind: "selection",
          index: ne
        });
      }
    }), le.length ? [
      new E({
        id: "selections",
        data: le,
        getPosition: (oe) => oe.position,
        getFillColor: (oe) => oe.fill,
        getLineColor: (oe) => oe.line,
        getRadius: (oe) => oe.radius,
        getLineWidth: 1.5,
        radiusUnits: "common",
        radiusMinPixels: 2,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: ka,
        updateTriggers: {
          getFillColor: [M, k, n.get("selections")],
          getLineColor: [M, k, n.get("selections")],
          getRadius: [V, M, k, n.get("selections")]
        }
      })
    ] : [];
  }
  function Ai() {
    if (!se) return [];
    const { PathLayer: E, PolygonLayer: M, ScatterplotLayer: k } = se, V = n.get("selected_kind"), X = n.get("selected_index"), le = n.get("stroke_width") || 2, oe = n.get("landmark_opacity") || 0.25, ne = [], pe = [], ve = [], Ne = [], Fe = po(14);
    (n.get("landmarks") || []).forEach((ke, Tt) => {
      if (ke.hidden) return;
      const yn = Sr[Tt % Sr.length], Il = V === "landmark" && Tt === X, aa = Il ? le + 1 : le, zn = It(yn, 1), cl = It(yn, oe), ul = { kind: "landmark", index: Tt };
      if (ke.type === "point") {
        const nl = (ke.vertices || [])[0];
        if (!nl) return;
        ve.push({
          position: [nl[0], nl[1], 0],
          fill: cl,
          line: zn,
          lineWidth: Il ? 2 : 1.5,
          radius: Il ? 7 : 6,
          ...ul
        });
        return;
      }
      const oo = go(ke);
      if (ke.type === "shape" && oo.length >= 3) {
        ne.push({
          polygon: un(oo),
          fill: cl,
          line: zn,
          width: aa,
          ...ul
        }), (ke.vertices || []).forEach(([nl, ao]) => {
          ve.push({
            position: [nl, ao, 0],
            fill: zn,
            line: zn,
            lineWidth: 0,
            radius: Il ? 5 : 4,
            ...ul
          });
        });
        return;
      }
      const xo = Ll(ke);
      if (xo && ne.push({
        polygon: un(xo),
        fill: It(wh, Bk),
        line: It(wh, Gk),
        width: 1.5,
        ...ul
      }), oo.length >= 2) {
        const nl = un(oo);
        if (pe.push({
          path: nl,
          color: zn,
          width: aa,
          ...ul
        }), ["line", "spline", "gradient"].includes(ke.type)) {
          const ao = Ka(nl, Fe);
          ao && Ne.push({ polygon: ao, fill: zn, line: zn, width: 1, ...ul });
        }
        (ke.vertices || []).forEach(([ao, lr]) => {
          ve.push({
            position: [ao, lr, 0],
            fill: zn,
            line: zn,
            lineWidth: 0,
            radius: Il ? 5 : 4,
            ...ul
          });
        });
      }
    });
    const Me = [];
    return (ne.length || Ne.length) && Me.push(
      new M({
        id: "landmark-polygons",
        data: [...ne, ...Ne],
        getPolygon: (ke) => ke.polygon,
        getFillColor: (ke) => ke.fill,
        getLineColor: (ke) => ke.line,
        getLineWidth: (ke) => ke.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: ka
      })
    ), pe.length && Me.push(
      new E({
        id: "landmark-paths",
        data: pe,
        getPath: (ke) => ke.path,
        getColor: (ke) => ke.color,
        getWidth: (ke) => ke.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: ka
      })
    ), ve.length && Me.push(
      new k({
        id: "landmark-markers",
        data: ve,
        getPosition: (ke) => ke.position,
        getFillColor: (ke) => ke.fill,
        getLineColor: (ke) => ke.line,
        getRadius: (ke) => ke.radius,
        getLineWidth: (ke) => ke.lineWidth ?? 0,
        radiusUnits: "pixels",
        lineWidthUnits: "pixels",
        filled: !0,
        stroked: !0,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: ka
      })
    ), Me;
  }
  function Fa() {
    if (!se) return [];
    const { PathLayer: E, PolygonLayer: M, ScatterplotLayer: k } = se, V = ["lasso", "polygon", "rectangle", "ellipse"].includes(W), X = V ? "#94a3b8" : "#00e5ff", le = It(X, 1), oe = It(X, 0.15), ne = n.get("stroke_width") || 4, pe = [];
    let ve = null, Ne = null, Fe = [];
    if (mt && Yt.length >= 2)
      ve = un(Yt);
    else if (ot && Zt && zt)
      Ne = ho(Zt, zt);
    else if (Te.length) {
      const Me = W === "spline" ? ko(Te, n.get("default_tension") ?? 0, 20, !1) : W === "shape" ? ko(Te, n.get("default_tension") ?? 0, 20, !0) : Te;
      W === "polygon" || W === "shape" ? (Ne = un(Me), ve = fn(Me)) : ve = un(Me), Fe = Te.map((ke) => ({ position: [ke.x, ke.y, 0], fill: le }));
    }
    return Ne && Ne.length >= 3 ? pe.push(
      new M({
        id: "draft-polygon",
        data: [{ polygon: Ne, fill: oe, line: le, width: 2 }],
        getPolygon: (Me) => Me.polygon,
        getFillColor: (Me) => Me.fill,
        getLineColor: (Me) => Me.line,
        getLineWidth: (Me) => Me.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: ka
      })
    ) : ve && ve.length >= 2 && pe.push(
      new E({
        id: "draft-path",
        data: [{ path: ve, color: le, width: V ? 2 : ne }],
        getPath: (Me) => Me.path,
        getColor: (Me) => Me.color,
        getWidth: (Me) => Me.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: ka
      })
    ), Fe.length && pe.push(
      new k({
        id: "draft-markers",
        data: Fe,
        getPosition: (Me) => Me.position,
        getFillColor: (Me) => Me.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: ka
      })
    ), pe;
  }
  function po(E) {
    const M = q?.isInitialized ? q.getViewports()?.[0] : null;
    if (!M?.unproject) return E;
    const [k] = M.unproject([0, 0]), [V] = M.unproject([E, 0]);
    return Math.max(Math.abs(V - k), 1e-9);
  }
  function Ka(E, M) {
    if (!E || E.length < 2 || !(M > 0)) return null;
    const k = E[E.length - 2], V = E[E.length - 1], X = Math.hypot(V[0] - k[0], V[1] - k[1]) || 1, le = (V[0] - k[0]) / X, oe = (V[1] - k[1]) / X, ne = -oe, pe = le, ve = [V[0] + le * M * 0.15, V[1] + oe * M * 0.15], Ne = [V[0] - le * M, V[1] - oe * M];
    return [
      ve,
      [Ne[0] + ne * M * 0.55, Ne[1] + pe * M * 0.55],
      [Ne[0] - ne * M * 0.55, Ne[1] - pe * M * 0.55]
    ];
  }
  function xl(E, M, k, V) {
    const X = [], le = [];
    if (!E || !k.length) return { edges: X, neighbors: le };
    const oe = V?.mode || "knn", ne = Math.max(0, V?.k | 0), pe = Number(V?.radius) || 0;
    if (oe === "knn" && ne <= 0) return { edges: X, neighbors: le };
    if (oe === "radius" && !(pe > 0)) return { edges: X, neighbors: le };
    const { indptr: ve, indices: Ne, distances: Fe } = E, Me = /* @__PURE__ */ new Set();
    for (const ke of k) {
      const Tt = ve[ke] | 0, yn = ve[ke + 1] | 0, Il = M[ke], aa = oe === "knn" ? Math.min(yn, Tt + ne) : yn;
      for (let zn = Tt; zn < aa && !(oe === "radius" && (Fe && Fe.length ? Fe[zn] : 0) > pe); zn++) {
        const cl = Ne[zn] | 0;
        Me.has(cl) || (Me.add(cl), le.push(cl)), X.push({
          path: [
            [Il.x, Il.y],
            [M[cl].x, M[cl].y]
          ]
        });
      }
    }
    return { edges: X, neighbors: le };
  }
  function Wl() {
    if (!se) return [];
    const E = El(), M = na(E);
    if (!E || !M || M.neighborhood === "off") return [];
    an();
    const k = [], { PathLayer: V } = se, X = { kind: E.kind, index: E.index };
    return (M.neighborhood === "radius" || M.neighborhood === "knn") && te.length && k.push(
      new V({
        id: `neighborhood-${M.neighborhood}`,
        data: te.map((le) => ({ ...le, ...X })),
        getPath: (le) => le.path,
        getColor: It(wh, 0.45),
        getWidth: 1.25,
        widthUnits: "pixels",
        pickable: !0,
        parameters: ka
      })
    ), k;
  }
  function $n() {
    return Ja(), [
      Ye(),
      ...Wl(),
      ...rl(),
      ...Mi(),
      ...Ai(),
      ...Fa()
    ].filter(Boolean);
  }
  function Jn(E, M) {
    const [k, V] = n.get("x_bounds"), [X, le] = n.get("y_bounds"), oe = (k + V) / 2, ne = (X + le) / 2, pe = Math.max(V - k, 1e-6), ve = Math.max(le - X, 1e-6), Ne = 40, Fe = Math.log2(
      Math.min((E - Ne * 2) / pe, (M - Ne * 2) / ve)
    );
    return {
      target: [oe, ne, 0],
      zoom: Fe,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function on() {
    if (!q) return;
    const E = Math.max(1, d.clientWidth || d.width), M = Math.max(1, d.clientHeight || d.height);
    E <= 1 || M <= 1 || (ge = Jn(E, M), Q = ge.zoom, q.setProps({ viewState: ge, width: E, height: M }), B = !0);
  }
  function bn(E, { animate: M = !1, duration: k = 320 } = {}) {
    if (!q) return;
    const V = {
      ...ge,
      ...E,
      transitionDuration: M ? k : 0
    };
    M && (!de && se?.LinearInterpolator && (de = new se.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), de && (V.transitionInterpolator = de), V.transitionEasing = qk), ge = V, q.setProps({ viewState: V });
  }
  ae = (E) => {
    if (!q || !ge) return;
    const M = ge.minZoom ?? -20, k = ge.maxZoom ?? 20, V = Math.max(M, Math.min(k, (ge.zoom ?? 0) + E));
    bn({ zoom: V }, { animate: !0 });
  }, be = () => {
    if (!q) return;
    const E = Math.max(1, d.clientWidth || d.width), M = Math.max(1, d.clientHeight || d.height);
    if (E <= 1 || M <= 1) return;
    const k = Jn(E, M);
    Q = k.zoom, B = !0, bn(
      {
        target: k.target,
        zoom: k.zoom,
        minZoom: k.minZoom,
        maxZoom: k.maxZoom
      },
      { animate: !0, duration: 320 }
    ), ct();
  };
  function Vn() {
    const E = String(n.get("plot_background") || "").trim();
    if (E) return E;
    const M = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return M || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  h = () => {
    const E = Vn();
    f.style.background = E, d.style.background = E, q && (q.setProps({
      parameters: { clearColor: ou(E) },
      ...ge ? { viewState: ge } : {}
    }), typeof q.redraw == "function" && q.redraw(!0));
  };
  function Sl(E) {
    if (!q) return;
    const M = Vn();
    q.setProps({
      parameters: { clearColor: ou(M) },
      ...E,
      ...ge ? { viewState: ge } : {}
    });
  }
  function ct() {
    !q || !se || H || (H = requestAnimationFrame(() => {
      H = 0, Sl({ layers: $n() });
    }));
  }
  async function Lr() {
    if (se) return se;
    const E = await import(
      /* @vite-ignore */
      Hk
    ), M = await import(
      /* @vite-ignore */
      Uk
    );
    return se = {
      Deck: E.Deck,
      OrthographicView: E.OrthographicView,
      LinearInterpolator: E.LinearInterpolator,
      ScatterplotLayer: M.ScatterplotLayer,
      PathLayer: M.PathLayer,
      PolygonLayer: M.PolygonLayer
    }, se;
  }
  async function Qa() {
    if (q) return;
    const { w: E, h: M } = wn();
    d.style.display = "block", h();
    try {
      const { Deck: k, OrthographicView: V } = await Lr(), X = $n();
      if (!X.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const le = Jn(E, M);
      ge = le, Q = le.zoom;
      const oe = Vn();
      q = new k({
        canvas: d,
        width: E,
        height: M,
        useDevicePixels: !0,
        views: new V(),
        controller: $e(),
        initialViewState: le,
        parameters: { clearColor: ou(oe) },
        layers: X,
        pickingRadius: 8,
        getCursor: ({ isDragging: ne, isHovering: pe }) => ne ? "grabbing" : pe ? "pointer" : W === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: ne }) => {
          ge = ne, q.setProps({ viewState: ne }), At();
        },
        onClick: (ne) => {
          if (W !== "select") return;
          const pe = ne?.object;
          pe?.kind === "landmark" || pe?.kind === "selection" || pe?.kind === "type" ? il(pe.kind, pe.index) : il("", -1);
        },
        onHover: (ne) => {
          if (ne?.isDragging) {
            _();
            return;
          }
          if (!Ee()) {
            let ve = G(ne.x || 0, ne.y || 0);
            if (ve || (ve = D(ne?.object)), ve) {
              const Ne = d.getBoundingClientRect();
              R(
                ve,
                Ne.left + (ne.x || 0),
                Ne.top + (ne.y || 0)
              );
            } else
              _();
          }
          const pe = ne?.object;
          if (pe?.kind === "landmark" || pe?.kind === "selection" || pe?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          W === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          Vt(), requestAnimationFrame(() => {
            wn(), on(), Sl({ layers: $n() }), typeof q.redraw == "function" && q.redraw(!0);
          });
        }
      }), tn();
    } catch (k) {
      console.error("landmarks deck init failed", k);
      const V = document.createElement("div");
      V.className = "landmarks__error", V.textContent = `Deck renderer failed: ${k?.message || k}`, f.appendChild(V);
    }
  }
  function eo() {
    if (!q) return;
    const { w: E, h: M } = wn();
    Sl({ width: E, height: M }), !B && E > 1 && M > 1 ? on() : typeof q.redraw == "function" && q.redraw(!0);
  }
  function ko(E, M, k, V) {
    const X = k, oe = (1 - Math.max(0, Math.min(1, M ?? 0))) / 2;
    let ne = E.slice(), pe, ve;
    if (V) {
      if (ne.length >= 2) {
        const Me = ne[0], ke = ne[ne.length - 1];
        Me.x === ke.x && Me.y === ke.y && (ne = ne.slice(0, -1));
      }
      if (ne.length < 3) return ne.slice();
      const Fe = ne.length;
      ve = (Me) => ne[(Me % Fe + Fe) % Fe], pe = Fe;
    } else {
      if (ne.length < 2 || ne.length === 2) return ne.slice();
      const Fe = [
        { x: 2 * ne[0].x - ne[1].x, y: 2 * ne[0].y - ne[1].y },
        ...ne,
        {
          x: 2 * ne[ne.length - 1].x - ne[ne.length - 2].x,
          y: 2 * ne[ne.length - 1].y - ne[ne.length - 2].y
        }
      ];
      ve = (Me) => Fe[Me + 1], pe = ne.length - 1;
    }
    const Ne = [];
    for (let Fe = 0; Fe < pe; Fe++) {
      const Me = ve(Fe - 1), ke = ve(Fe), Tt = ve(Fe + 1), yn = ve(Fe + 2), Il = oe * (Tt.x - Me.x), aa = oe * (Tt.y - Me.y), zn = oe * (yn.x - ke.x), cl = oe * (yn.y - ke.y);
      for (let ul = 0; ul < X; ul++) {
        const oo = ul / X, xo = oo * oo, nl = xo * oo, ao = 2 * nl - 3 * xo + 1, lr = nl - 2 * xo + oo, Bs = -2 * nl + 3 * xo, Gs = nl - xo;
        Ne.push({
          x: ao * ke.x + lr * Il + Bs * Tt.x + Gs * zn,
          y: ao * ke.y + lr * aa + Bs * Tt.y + Gs * cl
        });
      }
    }
    return Ne.push({ ...ve(V ? pe : ne.length - 1) }), Ne;
  }
  function to(E, M, k) {
    const V = Math.cos(k), X = Math.sin(k), le = E.x - M.x, oe = E.y - M.y;
    return { x: M.x + le * V - oe * X, y: M.y + le * X + oe * V };
  }
  function go(E) {
    const M = (E.vertices || []).map(([k, V]) => ({ x: k, y: V }));
    return E.type === "spline" || E.type === "gradient" ? ko(M, E.tension ?? 0, 20, !1) : E.type === "shape" ? ko(M, E.tension ?? 0, 20, !0) : M;
  }
  function Wn() {
    const [E, M] = n.get("x_bounds"), [k, V] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(M - E), Math.abs(V - k));
  }
  function rn() {
    return Math.max(1, n.get("neighbor_k_max") || 64);
  }
  function Xn() {
    const E = Number(n.get("neighbor_radius_max") || 0);
    return E > 0 ? E : Wn();
  }
  function In(E, M) {
    return E.map((k, V) => {
      const X = E[Math.max(0, V - 1)], le = E[Math.min(E.length - 1, V + 1)], oe = Math.hypot(le.x - X.x, le.y - X.y) || 1, ne = (le.x - X.x) / oe, pe = (le.y - X.y) / oe;
      return { x: k.x - pe * M, y: k.y + ne * M };
    });
  }
  function Ll(E) {
    const M = Number(E.buffer_width || 0);
    if (!(M > 0) || !Ah.includes(E.type)) return null;
    const k = go(E);
    if (k.length < 2) return null;
    const V = E.buffer_side || "both";
    return V === "left" ? [...k, ...In(k, M).reverse()] : V === "right" ? [...k, ...In(k, -M).reverse()] : [...In(k, M), ...In(k, -M).reverse()];
  }
  function El() {
    const E = n.get("selected_kind"), M = n.get("selected_index");
    return E === "type" || E === "selection" ? { kind: E, index: M } : null;
  }
  function No() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function na(E) {
    return E ? pS(
      E.kind,
      E.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function kn() {
    return na(El());
  }
  function Za() {
    const E = No();
    if (!E) return null;
    const M = n.get("landmarks") || [];
    return E.index >= 0 && E.index < M.length ? M[E.index] : null;
  }
  function $a(E) {
    const M = El();
    M && (gS(
      n,
      M.kind,
      M.index,
      E,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ), ct());
  }
  function la(E) {
    const M = an();
    if (!E) return [];
    if (E.kind === "type")
      return M.reduce((k, V, X) => (We(X) === E.index && k.push(X), k), []);
    if (E.kind === "selection") {
      const k = (n.get("selections") || [])[E.index], V = al(k || {});
      return V.length < 3 ? [] : M.reduce((X, le, oe) => (Hn(le, V) && X.push(oe), X), []);
    }
    return [];
  }
  function Hn(E, M) {
    let k = !1;
    for (let V = 0, X = M.length - 1; V < M.length; X = V++) {
      const le = M[V][0], oe = M[V][1], ne = M[X][0], pe = M[X][1];
      oe > E.y != pe > E.y && E.x < (ne - le) * (E.y - oe) / (pe - oe + 1e-12) + le && (k = !k);
    }
    return k;
  }
  function Ja() {
    const E = an();
    z = new Uint8Array(E.length), P = !1, te = [];
    const M = El();
    if (!M) return;
    const k = la(M);
    if (!k.length) {
      P = !0;
      return;
    }
    P = !0;
    for (const le of k) z[le] = lu;
    const V = na(M);
    if (!V || V.neighborhood === "off") return;
    const X = V.neighborhood === "radius" ? Oe : Ae;
    if (V.neighborhood === "radius" || V.neighborhood === "knn") {
      const le = Math.min(Number(V.neighborhood_k) || 12, rn());
      let oe = Number(V.neighborhood_radius) || 0;
      const ne = Xn();
      ne > 0 && (oe = Math.min(oe, ne));
      const pe = xl(X, E, k, {
        mode: V.neighborhood,
        k: le,
        radius: oe
      });
      te = pe.edges;
      for (const ve of pe.neighbors)
        z[ve] !== lu && (z[ve] = Mh);
    }
  }
  function zo(E) {
    const M = No();
    M && (bS(n, M.index, E, n.get("landmarks") || []), ct());
  }
  function no(E) {
    if (!q?.isInitialized || !E) return null;
    const k = q.pickObject({ x: E.px, y: E.py, radius: 8 })?.object;
    return k?.kind ? { kind: k.kind, index: k.index } : null;
  }
  function il(E, M) {
    tm(n, E, M), ct();
  }
  function el() {
    Vt();
  }
  function bo() {
    if (!["polygon", "line", "spline", "shape"].includes(W)) return;
    const M = W === "line" || W === "spline" ? 2 : 3;
    if (Te.length < M) {
      Te = [], ct();
      return;
    }
    if (W === "polygon") {
      const X = [...n.get("selections") || []];
      X.push(nu({
        id: Kt(X),
        type: "polygon",
        vertices: Te.map((le) => [le.x, le.y])
      })), Te = [], n.set("selections", X), n.set("selected_kind", "selection"), n.set("selected_index", X.length - 1), n.save_changes(), el(), ct();
      return;
    }
    const k = [...n.get("landmarks") || []], V = {
      id: Rn(k),
      type: W,
      vertices: Te.map((X) => [X.x, X.y])
    };
    (W === "spline" || W === "shape") && (V.tension = n.get("default_tension") ?? 0), Ah.includes(W) && (V.buffer_width = n.get("default_buffer_width") ?? 0, V.buffer_side = n.get("default_buffer_side") || "both"), k.push(V), Te = [], n.set("landmarks", k), n.set("selected_kind", "landmark"), n.set("selected_index", k.length - 1), n.save_changes(), el(), ct();
  }
  function Vl(E, M) {
    if (q?.isInitialized) {
      const k = q.getViewports()[0];
      if (k) {
        const V = k.unproject([0, 0]), X = k.unproject([E, M]);
        return { dx: X[0] - V[0], dy: X[1] - V[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function Wa(E, M, k, V) {
    const { dx: X, dy: le } = Vl(k, V);
    if (E === "landmark") {
      const oe = n.get("landmarks") || [];
      n.set(
        "landmarks",
        oe.map(
          (ne, pe) => pe !== M ? ne : { ...ne, vertices: (ne.vertices || []).map(([ve, Ne]) => [ve + X, Ne + le]) }
        )
      );
    } else {
      const oe = n.get("selections") || [];
      n.set(
        "selections",
        oe.map((ne, pe) => pe !== M ? ne : ne.vertices ? { ...ne, vertices: ne.vertices.map(([ve, Ne]) => [ve + X, Ne + le]) } : { ...ne, cx: ne.cx + X, cy: ne.cy + le })
      );
    }
    n.save_changes(), ct();
  }
  function er(E) {
    if (W === "select") return;
    E.preventDefault(), d.focus();
    const M = ht(E);
    if (!M) return;
    Gt = !1;
    const k = no(M);
    if (W === "lasso") {
      if (k && k.kind === n.get("selected_kind") && k.index === n.get("selected_index")) {
        Ie = !0, Ze = M, wt = k.kind, vt = k.index;
        return;
      }
      if (k) {
        il(k.kind, k.index), Mt = !0;
        return;
      }
      mt = !0, Yt = [M], ct();
      return;
    }
    if (W === "rectangle" || W === "ellipse") {
      if (k && k.kind === n.get("selected_kind") && k.index === n.get("selected_index")) {
        Ie = !0, Ze = M, wt = k.kind, vt = k.index;
        return;
      }
      if (k) {
        il(k.kind, k.index), Mt = !0;
        return;
      }
      ot = !0, Zt = M, zt = M, ct();
      return;
    }
    if (Te.length === 0) {
      const V = n.get("selected_kind"), X = n.get("selected_index");
      if (k && k.kind === V && k.index === X) {
        Ie = !0, Ze = M, wt = k.kind, vt = k.index, d.style.cursor = "grabbing";
        return;
      }
      if (k) {
        il(k.kind, k.index), Mt = !0;
        return;
      }
      X >= 0 && il("", -1);
    }
  }
  function yo(E) {
    const M = ht(E);
    if (M) {
      if (Ie && Ze && vt >= 0) {
        const k = M.px - Ze.px, V = M.py - Ze.py;
        (k || V) && (Gt = !0), Wa(wt, vt, k, V), Ze = M;
        return;
      }
      if (mt) {
        Yt.push(M), ct();
        return;
      }
      if (ot) {
        zt = M, ct();
        return;
      }
      if (Ee()) {
        const k = W === "line" || W === "spline" ? 2 : 3;
        v(Te.length >= k ? "Enter to finish" : "Click", E.clientX, E.clientY);
        return;
      }
      if (W === "select" && E.buttons & 1) {
        _();
        return;
      }
    }
  }
  function tl(E) {
    if (W === "select" && !Ie) return;
    const M = ht(E);
    if (mt) {
      if (mt = !1, Yt.length >= 3) {
        const k = [...n.get("selections") || []];
        k.push(nu({
          id: Kt(k),
          type: "lasso",
          vertices: Yt.map((V) => [V.x, V.y])
        })), n.set("selections", k), n.set("selected_kind", "selection"), n.set("selected_index", k.length - 1), n.save_changes();
      }
      Yt = [], el(), ct();
      return;
    }
    if (ot) {
      if (ot = !1, Zt && zt) {
        const k = Zt, V = zt, X = (k.x + V.x) / 2, le = (k.y + V.y) / 2, oe = Math.abs(V.x - k.x), ne = Math.abs(V.y - k.y);
        if (oe > 1e-6 && ne > 1e-6) {
          const pe = [...n.get("selections") || []];
          W === "rectangle" ? pe.push(nu({ id: Kt(pe), type: "rectangle", cx: X, cy: le, width: oe, height: ne, angle: 0 })) : pe.push(nu({ id: Kt(pe), type: "ellipse", cx: X, cy: le, rx: oe / 2, ry: ne / 2, angle: 0 })), n.set("selections", pe), n.set("selected_kind", "selection"), n.set("selected_index", pe.length - 1), n.save_changes();
        }
      }
      Zt = null, zt = null, el(), ct();
      return;
    }
    if (Ie && (Ie = !1, Ze = null, wt = "", vt = -1, d.style.cursor = "crosshair", Gt)) {
      Mt = !0, Gt = !1;
      return;
    }
    if (Mt) {
      Mt = !1;
      return;
    }
    if (M && !(W === "select" || W === "lasso" || W === "rectangle" || W === "ellipse")) {
      if (W === "point") {
        const k = [...n.get("landmarks") || []];
        k.push({ id: Rn(k), type: "point", vertices: [[M.x, M.y]] }), n.set("landmarks", k), n.set("selected_kind", "landmark"), n.set("selected_index", k.length - 1), n.save_changes(), el(), ct();
        return;
      }
      Te.push({ x: M.x, y: M.y }), ct();
    }
  }
  function tr() {
    _(), Ie && (Ie = !1, Ze = null), mt && (mt = !1, Yt = [], ct()), ot && (ot = !1, Zt = null, zt = null, ct());
  }
  function nr(E) {
    E.preventDefault(), Te.length && Te.pop(), bo(), _();
  }
  function vo(E) {
    E.key === "Enter" ? (E.preventDefault(), bo(), _()) : E.key === "Escape" ? (at(), il("", -1), ct()) : (E.key === "Backspace" || E.key === "Delete") && Te.length && (Te.pop(), ct());
  }
  const lo = new AbortController(), { signal: sl } = lo;
  d.addEventListener(
    "wheel",
    (E) => {
      if (!E.shiftKey) return;
      const M = Za();
      if (M && Ah.includes(M.type)) {
        E.preventDefault(), E.stopImmediatePropagation();
        const V = Wn(), X = V / 40, le = Math.max(
          0,
          Math.min(V, (Number(M.buffer_width) || 0) + (E.deltaY > 0 ? -X : X))
        );
        zo({ buffer_width: le });
        return;
      }
      const k = kn();
      if (!(!k || k.neighborhood === "off")) {
        if (E.preventDefault(), E.stopImmediatePropagation(), k.neighborhood === "knn") {
          const V = rn(), X = Math.max(
            1,
            Math.min(V, (Number(k.neighborhood_k) || 12) + (E.deltaY > 0 ? -1 : 1))
          );
          $a({ neighborhood: "knn", neighborhood_k: X });
          return;
        }
        if (k.neighborhood === "radius") {
          const V = Xn(), X = V / 40, le = Math.max(
            0,
            Math.min(V, (Number(k.neighborhood_radius) || 0) + (E.deltaY > 0 ? -X : X))
          );
          $a({ neighborhood: "radius", neighborhood_radius: le });
        }
      }
    },
    { capture: !0, passive: !1, signal: sl }
  ), d.addEventListener("mousedown", er, { signal: sl }), d.addEventListener("mousemove", yo, { signal: sl }), d.addEventListener("mouseup", tl, { signal: sl }), d.addEventListener("mouseleave", tr, { signal: sl }), d.addEventListener("dblclick", nr, { signal: sl }), d.addEventListener("keydown", vo, { signal: sl });
  const oa = [];
  function Nn(E, M) {
    const k = `change:${E}`;
    n.on(k, M), oa.push(() => n.off?.(k, M));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((E) => {
    Nn(E, () => {
      ct(), el();
    });
  }), Nn("mode", () => {
    W = n.get("mode"), at(), tn(), ct();
  }), Nn("width", () => {
    eo();
  }), Nn("height", () => {
    eo();
  }), Nn("points_data", () => {
    ce = { key: "", data: [] }, q ? ct() : Qa(), Vt();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((E) => {
    Nn(E, () => {
      q && ct(), Vt();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((E) => {
    Nn(E, () => {
      ct();
    });
  }), Nn("category_codes", () => {
    it(), ct();
  }), Nn("gene_values", () => {
    gt(), ct();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "radius_indptr", "radius_indices", "radius_distances"].forEach((E) => {
    Nn(E, () => {
      ze(), q && ct();
    });
  }), ["category_columns", "active_category"].forEach((E) => {
    Nn(E, () => {
      el(), ct();
    });
  }), ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((E) => {
    Nn(E, () => {
      el(), Vt(), ct();
    });
  }), Nn("plot_background", () => h()), el();
  let _e = null, Re = 0, Ct = !1;
  const xt = () => {
    if (Ct) return;
    const E = c.clientWidth, M = c.clientHeight;
    if (E <= 1 || M <= 1) {
      Re = requestAnimationFrame(xt);
      return;
    }
    Re = requestAnimationFrame(async () => {
      if (await Qa(), Ct) {
        q && typeof q.finalize == "function" && q.finalize(), q = null;
        return;
      }
      ct(), _e = new ResizeObserver(() => eo()), _e.observe(c);
    });
  };
  Re = requestAnimationFrame(xt);
  function Lt() {
    Ct = !0, lo.abort(), oa.forEach((E) => E()), y.disconnect(), _e?.disconnect(), Re && cancelAnimationFrame(Re), H && cancelAnimationFrame(H), q && typeof q.finalize == "function" && q.finalize(), q = null, o.replaceChildren();
  }
  return {
    zoomBy: (E) => ae(E),
    resetZoom: () => be(),
    resize: () => eo(),
    destroy: Lt
  };
}
function Pk(n, o) {
  const r = b.useRef(o);
  r.current = o;
  const i = (d) => {
    const m = r.current.map((p) => {
      const h = `change:${String(p)}`, y = () => d();
      return n.on(h, y), { event: h, handler: y };
    });
    return () => {
      for (const { event: p, handler: h } of m)
        n.off?.(p, h);
    };
  }, c = () => {
    const d = {};
    for (const m of r.current)
      d[String(m)] = n.get(String(m));
    return JSON.stringify(d);
  }, f = b.useSyncExternalStore(i, c, c);
  return JSON.parse(f);
}
const Xk = [
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
function Fk(n) {
  const o = Pk(n, Xk);
  return {
    ...o,
    setMode(r) {
      Tk(n, r);
    },
    select(r, i) {
      tm(n, r, i);
    },
    setActiveCategory(r) {
      em(n, r);
    },
    setActiveGenes(r) {
      wk(n, r);
    },
    setGeneScaleMode(r) {
      Mk(n, r);
    },
    setGeneLog1p(r) {
      Ak(n, r);
    },
    selectType(r, i) {
      r.name !== o.active_category && em(n, r), tm(n, "type", i);
    },
    patchNeighborhood(r) {
      gS(
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
      o.selected_kind !== "landmark" || o.selected_index < 0 || bS(n, o.selected_index, r, o.landmarks);
    },
    deleteSelection(r) {
      Ok(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      kk(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, i) {
      Nk(n, r, i, o.selections);
    },
    renameLandmark(r, i) {
      zk(n, r, i, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      Dk(n, r, o.landmarks);
    },
    setPointSize(r) {
      jk(n, r);
    },
    setPointOpacity(r) {
      Lk(n, r);
    },
    setLandmarkOpacity(r) {
      Vk(n, r);
    },
    setStrokeWidth(r) {
      Ik(n, r);
    },
    activeNeighborhood() {
      return pS(
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
function kh(n) {
  if (document.fullscreenElement === n) return !0;
  try {
    return n.matches(":fullscreen") || n.matches(":-webkit-full-screen");
  } catch {
    return !1;
  }
}
function Kk(n, o) {
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
  }, [n, d, f]), p = b.useCallback(() => {
    const v = n.current;
    if (v) {
      if (kh(v)) {
        r.current !== "native" && (d("native"), document.body.style.overflow = "hidden", f());
        return;
      }
      r.current === "native" && m();
    }
  }, [n, m, d, f]);
  b.useEffect(() => (document.addEventListener("fullscreenchange", p), p(), () => document.removeEventListener("fullscreenchange", p)), [p]), b.useEffect(() => {
    if (i !== "overlay") return;
    const v = (R) => {
      R.key === "Escape" && m();
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i, m]);
  const h = b.useCallback(() => {
    const v = n.current;
    return r.current !== "off" ? !0 : !!v && kh(v);
  }, [n]), y = b.useCallback(() => {
    const v = n.current;
    if (v) {
      if (r.current === "overlay") {
        m();
        return;
      }
      if (kh(v) || document.fullscreenElement) {
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
        await v.requestFullscreen(), p();
      } catch {
        d("overlay"), document.body.style.overflow = "hidden", f();
      }
    }
  }, [n, h, y, d, f, p]);
  return {
    isFullscreen: i !== "off",
    overlay: i === "overlay",
    toggle: x,
    leave: y
  };
}
const Qk = 700, Zk = 400, $k = 1400, o0 = 640;
function Jk({
  model: n,
  hostEl: o,
  defaultHeight: r = Qk
}) {
  const i = CC(o.parentElement), c = Fk(n), f = b.useRef(null), d = b.useRef(null), m = b.useRef(null), [p, h] = b.useState(r), [y, x] = b.useState(!1), [v, R] = b.useState(null), _ = b.useRef(null), A = b.useRef(!1), w = b.useCallback(() => {
    m.current?.resize();
  }, []), { isFullscreen: O, overlay: N, toggle: T } = Kk(
    d,
    w
  );
  b.useEffect(() => {
    const j = d.current;
    if (!j || typeof ResizeObserver > "u") return;
    const U = new ResizeObserver((G) => {
      const L = G[0]?.contentRect.width ?? j.clientWidth;
      x(L < o0);
    });
    return U.observe(j), x(j.clientWidth < o0), () => U.disconnect();
  }, []), b.useEffect(() => {
    y || R(null);
  }, [y]), b.useEffect(() => {
    O && !A.current && (_.current = p), !O && A.current && _.current != null && (h(_.current), _.current = null, w()), A.current = O;
  }, [O, p, w]), b.useEffect(() => {
    o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  }, [o]), b.useEffect(() => {
    const j = f.current;
    if (!j) return;
    const U = l0({ model: n, host: j });
    return m.current = U, () => {
      U.destroy(), m.current = null;
    };
  }, [n, l0]);
  const D = b.useCallback(
    (j) => {
      j.preventDefault(), j.stopPropagation();
      const U = Math.min(window.innerHeight * 0.9, $k), G = {
        y: j.clientY,
        h: p,
        maxH: U
      }, L = (ie) => {
        h(
          Math.round(
            Math.min(G.maxH, Math.max(Zk, G.h + (ie.clientY - G.y)))
          )
        ), w();
      }, K = () => {
        window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", K), w();
      };
      window.addEventListener("pointermove", L), window.addEventListener("pointerup", K);
    },
    [p, w]
  );
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      ref: d,
      className: tt(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        i && "dark landmarks--dark",
        !i && "landmarks--light",
        y && "landmarks--narrow",
        O && "landmarks--fs",
        N && "landmarks--overlay-fs"
      ),
      children: [
        /* @__PURE__ */ S.jsxs(
          "div",
          {
            className: "landmarks__body",
            style: O ? void 0 : { height: p },
            children: [
              /* @__PURE__ */ S.jsx("div", { className: "landmarks__figure", children: /* @__PURE__ */ S.jsx("div", { className: "landmarks__main landmarks__main--plot", children: /* @__PURE__ */ S.jsx(
                "div",
                {
                  ref: f,
                  className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
                }
              ) }) }),
              O ? null : /* @__PURE__ */ S.jsx(
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
        /* @__PURE__ */ S.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "landmarks__chrome-tools",
              onMouseDown: (j) => j.stopPropagation(),
              onWheel: (j) => j.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(
                dk,
                {
                  modes: c.modes,
                  mode: c.mode,
                  onMode: (j) => c.setMode(j),
                  fullscreen: O,
                  onToggleFullscreen: () => {
                    T();
                  },
                  onZoomIn: () => m.current?.zoomBy(1),
                  onZoomOut: () => m.current?.zoomBy(-1),
                  onReset: () => m.current?.resetZoom()
                }
              )
            }
          ),
          y ? /* @__PURE__ */ S.jsx(
            _k,
            {
              lm: c,
              open: v,
              onOpenChange: R
            }
          ) : /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
            /* @__PURE__ */ S.jsx(
              "div",
              {
                className: "landmarks__chrome-dock landmarks__chrome-dock--left",
                onMouseDown: (j) => j.stopPropagation(),
                onWheel: (j) => j.stopPropagation(),
                children: /* @__PURE__ */ S.jsx(hS, { lm: c })
              }
            ),
            /* @__PURE__ */ S.jsx(
              "div",
              {
                className: "landmarks__chrome-dock landmarks__chrome-dock--right",
                onMouseDown: (j) => j.stopPropagation(),
                onWheel: (j) => j.stopPropagation(),
                children: /* @__PURE__ */ S.jsx(mS, { lm: c })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const vs = /* @__PURE__ */ new WeakMap();
function Wk({ model: n, el: o }) {
  o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  const r = vs.get(o);
  r && (r.unmount(), vs.delete(o));
  const i = SC.createRoot(o);
  return vs.set(o, i), i.render(/* @__PURE__ */ S.jsx(Jk, { model: n, hostEl: o })), () => {
    i.unmount(), vs.get(o) === i && vs.delete(o);
  };
}
const oN = { render: Wk };
export {
  oN as default
};
