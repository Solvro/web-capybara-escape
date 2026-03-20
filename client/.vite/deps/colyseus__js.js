import { __commonJS, __esm, __export, __toCommonJS } from "./chunk-V4OQ3NZ2.js";

// node_modules/colyseus.js/build/cjs/legacy.js
var require_legacy = __commonJS({
  "node_modules/colyseus.js/build/cjs/legacy.js"() {
    "use strict";
    if (!ArrayBuffer.isView) {
      ArrayBuffer.isView = (a) => {
        return (
          a !== null && typeof a === "object" && a.buffer instanceof ArrayBuffer
        );
      };
    }
    if (typeof globalThis === "undefined" && typeof window !== "undefined") {
      window["globalThis"] = window;
    }
    if (typeof FormData === "undefined") {
      globalThis["FormData"] = class {};
    }
  },
});

// node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default,
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError(
      "Class extends value " + String(b) + " is not a constructor or null",
    );
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target2, key, desc) {
  var c = arguments.length,
    r =
      c < 3
        ? target2
        : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target2, key))
          : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target2, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i]))
        r = (c < 3 ? d(r) : c > 3 ? d(target2, key, r) : d(target2, key)) || r;
  return (c > 3 && r && Object.defineProperty(target2, key, r), r);
}
function __param(paramIndex, decorator) {
  return function (target2, key) {
    decorator(target2, key, paramIndex);
  };
}
function __esDecorate(
  ctor,
  descriptorIn,
  decorators,
  contextIn,
  initializers,
  extraInitializers,
) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function")
      throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind,
    key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target2 =
    !descriptorIn && ctor
      ? contextIn["static"]
        ? ctor
        : ctor.prototype
      : null;
  var descriptor =
    descriptorIn ||
    (target2 ? Object.getOwnPropertyDescriptor(target2, contextIn.name) : {});
  var _,
    done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) {
      if (done)
        throw new TypeError(
          "Cannot add initializers after decoration has completed",
        );
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(
      kind === "accessor"
        ? { get: descriptor.get, set: descriptor.set }
        : descriptor[key],
      context,
    );
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object")
        throw new TypeError("Object expected");
      if ((_ = accept(result.get))) descriptor.get = _;
      if ((_ = accept(result.set))) descriptor.set = _;
      if ((_ = accept(result.init))) initializers.unshift(_);
    } else if ((_ = accept(result))) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target2) Object.defineProperty(target2, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue
      ? initializers[i].call(thisArg, value)
      : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol")
    name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", {
    configurable: true,
    value: prefix ? "".concat(prefix, " ", name) : name,
  });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g = Object.create(
      (typeof Iterator === "function" ? Iterator : Object).prototype,
    );
  return (
    (g.next = verb(0)),
    (g["throw"] = verb(1)),
    (g["return"] = verb(2)),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while ((g && ((g = 0), op[0] && (_ = 0)), _))
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      },
    };
  throw new TypeError(
    s ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack2) {
  if (pack2 || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? ((this.v = v), this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return (
    (i = Object.create(
      (typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype,
    )),
    verb("next"),
    verb("throw"),
    verb("return", awaitReturn),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function awaitReturn(f) {
    return function (v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await
      ? Promise.resolve(r.value.v).then(fulfill, reject)
      : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return (
    (i = {}),
    verb("next"),
    verb("throw", function (e) {
      throw e;
    }),
    verb("return"),
    (i[Symbol.iterator] = function () {
      return this;
    }),
    i
  );
  function verb(n, f) {
    i[n] = o[n]
      ? function (v) {
          return (p = !p)
            ? { value: __await(o[n](v)), done: false }
            : f
              ? f(v)
              : v;
        }
      : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
    i;
  return m
    ? m.call(o)
    : ((o =
        typeof __values === "function" ? __values(o) : o[Symbol.iterator]()),
      (i = {}),
      verb("next"),
      verb("throw"),
      verb("return"),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i);
  function verb(n) {
    i[n] =
      o[n] &&
      function (v) {
        return new Promise(function (resolve, reject) {
          ((v = o[n](v)), settle(resolve, reject, v.done, v.value));
        });
      };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k = ownKeys(mod), i = 0; i < k.length; i++)
      if (k[i] !== "default") __createBinding(result, mod, k[i]);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (
    typeof state === "function"
      ? receiver !== state || !f
      : !state.has(receiver)
  )
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  return kind === "m"
    ? f
    : kind === "a"
      ? f.call(receiver)
      : f
        ? f.value
        : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (
    typeof state === "function"
      ? receiver !== state || !f
      : !state.has(receiver)
  )
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  return (
    kind === "a"
      ? f.call(receiver, value)
      : f
        ? (f.value = value)
        : state.set(receiver, value),
    value
  );
}
function __classPrivateFieldIn(state, receiver) {
  if (
    receiver === null ||
    (typeof receiver !== "object" && typeof receiver !== "function")
  )
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function")
      throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function")
      throw new TypeError("Object not disposable.");
    if (inner)
      dispose = function () {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError
      ? new _SuppressedError(
          e,
          env.error,
          "An error was suppressed during disposal.",
        )
      : e;
    env.hasError = true;
  }
  var r,
    s = 0;
  function next() {
    while ((r = env.stack.pop())) {
      try {
        if (!r.async && s === 1)
          return ((s = 0), env.stack.push(r), Promise.resolve().then(next));
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async)
            return (
              (s |= 2),
              Promise.resolve(result).then(next, function (e) {
                fail(e);
                return next();
              })
            );
        } else s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1)
      return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
    return path.replace(
      /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
      function (m, tsx, d, ext, cm) {
        return tsx
          ? preserveJsx
            ? ".jsx"
            : ".js"
          : d && (!ext || !cm)
            ? m
            : d + ext + "." + cm.toLowerCase() + "js";
      },
    );
  }
  return path;
}
var extendStatics,
  __assign,
  __createBinding,
  __setModuleDefault,
  ownKeys,
  _SuppressedError,
  tslib_es6_default;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d2, b2) {
            d2.__proto__ = b2;
          }) ||
        function (d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
      return extendStatics(d, b);
    };
    __assign = function () {
      __assign =
        Object.assign ||
        function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create
      ? function (o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          o[k2] = m[k];
        };
    __setModuleDefault = Object.create
      ? function (o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
        }
      : function (o, v) {
          o["default"] = v;
        };
    ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    _SuppressedError =
      typeof SuppressedError === "function"
        ? SuppressedError
        : function (error, suppressed, message) {
            var e = new Error(message);
            return (
              (e.name = "SuppressedError"),
              (e.error = error),
              (e.suppressed = suppressed),
              e
            );
          };
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __esDecorate,
      __runInitializers,
      __propKey,
      __setFunctionName,
      __metadata,
      __awaiter,
      __generator,
      __createBinding,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources,
      __rewriteRelativeImportExtension,
    };
  },
});

// node_modules/colyseus.js/build/cjs/errors/Errors.js
var require_Errors = __commonJS({
  "node_modules/colyseus.js/build/cjs/errors/Errors.js"(exports) {
    "use strict";
    exports.CloseCode = void 0;
    (function (CloseCode) {
      CloseCode[(CloseCode["CONSENTED"] = 4e3)] = "CONSENTED";
      CloseCode[(CloseCode["DEVMODE_RESTART"] = 4010)] = "DEVMODE_RESTART";
    })(exports.CloseCode || (exports.CloseCode = {}));
    var ServerError = class extends Error {
      constructor(code, message) {
        super(message);
        this.name = "ServerError";
        this.code = code;
      }
    };
    var AbortError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "AbortError";
      }
    };
    exports.AbortError = AbortError;
    exports.ServerError = ServerError;
  },
});

// node_modules/@colyseus/schema/build/umd/index.js
var require_umd = __commonJS({
  "node_modules/@colyseus/schema/build/umd/index.js"(exports, module) {
    (function (global, factory) {
      typeof exports === "object" && typeof module !== "undefined"
        ? factory(exports)
        : typeof define === "function" && define.amd
          ? define(["exports"], factory)
          : ((global =
              typeof globalThis !== "undefined" ? globalThis : global || self),
            factory((global.schema = {})));
    })(exports, function (exports2) {
      "use strict";
      const SWITCH_TO_STRUCTURE = 255;
      const TYPE_ID = 213;
      exports2.OPERATION = void 0;
      (function (OPERATION) {
        OPERATION[(OPERATION["ADD"] = 128)] = "ADD";
        OPERATION[(OPERATION["REPLACE"] = 0)] = "REPLACE";
        OPERATION[(OPERATION["DELETE"] = 64)] = "DELETE";
        OPERATION[(OPERATION["DELETE_AND_MOVE"] = 96)] = "DELETE_AND_MOVE";
        OPERATION[(OPERATION["MOVE_AND_ADD"] = 160)] = "MOVE_AND_ADD";
        OPERATION[(OPERATION["DELETE_AND_ADD"] = 192)] = "DELETE_AND_ADD";
        OPERATION[(OPERATION["CLEAR"] = 10)] = "CLEAR";
        OPERATION[(OPERATION["REVERSE"] = 15)] = "REVERSE";
        OPERATION[(OPERATION["MOVE"] = 32)] = "MOVE";
        OPERATION[(OPERATION["DELETE_BY_REFID"] = 33)] = "DELETE_BY_REFID";
        OPERATION[(OPERATION["ADD_BY_REFID"] = 129)] = "ADD_BY_REFID";
      })(exports2.OPERATION || (exports2.OPERATION = {}));
      Symbol.metadata ??= Symbol.for("Symbol.metadata");
      const $track = "~track";
      const $encoder = "~encoder";
      const $decoder = "~decoder";
      const $filter = "~filter";
      const $getByIndex = "~getByIndex";
      const $deleteByIndex = "~deleteByIndex";
      const $changes = "~changes";
      const $childType = "~childType";
      const $onEncodeEnd = "~onEncodeEnd";
      const $onDecodeEnd = "~onDecodeEnd";
      const $descriptors = "~descriptors";
      const $numFields = "~__numFields";
      const $refTypeFieldIndexes = "~__refTypeFieldIndexes";
      const $viewFieldIndexes = "~__viewFieldIndexes";
      const $fieldIndexesByViewTag = "$__fieldIndexesByViewTag";
      let textEncoder2;
      try {
        textEncoder2 = new TextEncoder();
      } catch (e) {}
      const _convoBuffer$1 = new ArrayBuffer(8);
      const _int32$1 = new Int32Array(_convoBuffer$1);
      const _float32$1 = new Float32Array(_convoBuffer$1);
      const _float64$1 = new Float64Array(_convoBuffer$1);
      const _int64$1 = new BigInt64Array(_convoBuffer$1);
      const hasBufferByteLength =
        typeof Buffer !== "undefined" && Buffer.byteLength;
      const utf8Length = hasBufferByteLength
        ? Buffer.byteLength
        : function (str, _) {
            var c = 0,
              length = 0;
            for (var i = 0, l = str.length; i < l; i++) {
              c = str.charCodeAt(i);
              if (c < 128) {
                length += 1;
              } else if (c < 2048) {
                length += 2;
              } else if (c < 55296 || c >= 57344) {
                length += 3;
              } else {
                i++;
                length += 4;
              }
            }
            return length;
          };
      function utf8Write(view2, str, it) {
        var c = 0;
        for (var i = 0, l = str.length; i < l; i++) {
          c = str.charCodeAt(i);
          if (c < 128) {
            view2[it.offset++] = c;
          } else if (c < 2048) {
            view2[it.offset] = 192 | (c >> 6);
            view2[it.offset + 1] = 128 | (c & 63);
            it.offset += 2;
          } else if (c < 55296 || c >= 57344) {
            view2[it.offset] = 224 | (c >> 12);
            view2[it.offset + 1] = 128 | ((c >> 6) & 63);
            view2[it.offset + 2] = 128 | (c & 63);
            it.offset += 3;
          } else {
            i++;
            c = 65536 + (((c & 1023) << 10) | (str.charCodeAt(i) & 1023));
            view2[it.offset] = 240 | (c >> 18);
            view2[it.offset + 1] = 128 | ((c >> 12) & 63);
            view2[it.offset + 2] = 128 | ((c >> 6) & 63);
            view2[it.offset + 3] = 128 | (c & 63);
            it.offset += 4;
          }
        }
      }
      function int8$1(bytes, value, it) {
        bytes[it.offset++] = value & 255;
      }
      function uint8$1(bytes, value, it) {
        bytes[it.offset++] = value & 255;
      }
      function int16$1(bytes, value, it) {
        bytes[it.offset++] = value & 255;
        bytes[it.offset++] = (value >> 8) & 255;
      }
      function uint16$1(bytes, value, it) {
        bytes[it.offset++] = value & 255;
        bytes[it.offset++] = (value >> 8) & 255;
      }
      function int32$1(bytes, value, it) {
        bytes[it.offset++] = value & 255;
        bytes[it.offset++] = (value >> 8) & 255;
        bytes[it.offset++] = (value >> 16) & 255;
        bytes[it.offset++] = (value >> 24) & 255;
      }
      function uint32$1(bytes, value, it) {
        const b4 = value >> 24;
        const b3 = value >> 16;
        const b2 = value >> 8;
        const b1 = value;
        bytes[it.offset++] = b1 & 255;
        bytes[it.offset++] = b2 & 255;
        bytes[it.offset++] = b3 & 255;
        bytes[it.offset++] = b4 & 255;
      }
      function int64$1(bytes, value, it) {
        const high = Math.floor(value / Math.pow(2, 32));
        const low = value >>> 0;
        uint32$1(bytes, low, it);
        uint32$1(bytes, high, it);
      }
      function uint64$1(bytes, value, it) {
        const high = (value / Math.pow(2, 32)) >> 0;
        const low = value >>> 0;
        uint32$1(bytes, low, it);
        uint32$1(bytes, high, it);
      }
      function bigint64$1(bytes, value, it) {
        _int64$1[0] = BigInt.asIntN(64, value);
        int32$1(bytes, _int32$1[0], it);
        int32$1(bytes, _int32$1[1], it);
      }
      function biguint64$1(bytes, value, it) {
        _int64$1[0] = BigInt.asIntN(64, value);
        int32$1(bytes, _int32$1[0], it);
        int32$1(bytes, _int32$1[1], it);
      }
      function float32$1(bytes, value, it) {
        _float32$1[0] = value;
        int32$1(bytes, _int32$1[0], it);
      }
      function float64$1(bytes, value, it) {
        _float64$1[0] = value;
        int32$1(bytes, _int32$1[0], it);
        int32$1(bytes, _int32$1[1], it);
      }
      function boolean$1(bytes, value, it) {
        bytes[it.offset++] = value ? 1 : 0;
      }
      function string$1(bytes, value, it) {
        if (!value) {
          value = "";
        }
        let length = utf8Length(value, "utf8");
        let size = 0;
        if (length < 32) {
          bytes[it.offset++] = length | 160;
          size = 1;
        } else if (length < 256) {
          bytes[it.offset++] = 217;
          bytes[it.offset++] = length % 255;
          size = 2;
        } else if (length < 65536) {
          bytes[it.offset++] = 218;
          uint16$1(bytes, length, it);
          size = 3;
        } else if (length < 4294967296) {
          bytes[it.offset++] = 219;
          uint32$1(bytes, length, it);
          size = 5;
        } else {
          throw new Error("String too long");
        }
        utf8Write(bytes, value, it);
        return size + length;
      }
      function number$1(bytes, value, it) {
        if (isNaN(value)) {
          return number$1(bytes, 0, it);
        } else if (!isFinite(value)) {
          return number$1(
            bytes,
            value > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER,
            it,
          );
        } else if (value !== (value | 0)) {
          if (Math.abs(value) <= 34028235e31) {
            _float32$1[0] = value;
            if (Math.abs(Math.abs(_float32$1[0]) - Math.abs(value)) < 1e-4) {
              bytes[it.offset++] = 202;
              float32$1(bytes, value, it);
              return 5;
            }
          }
          bytes[it.offset++] = 203;
          float64$1(bytes, value, it);
          return 9;
        }
        if (value >= 0) {
          if (value < 128) {
            bytes[it.offset++] = value & 255;
            return 1;
          }
          if (value < 256) {
            bytes[it.offset++] = 204;
            bytes[it.offset++] = value & 255;
            return 2;
          }
          if (value < 65536) {
            bytes[it.offset++] = 205;
            uint16$1(bytes, value, it);
            return 3;
          }
          if (value < 4294967296) {
            bytes[it.offset++] = 206;
            uint32$1(bytes, value, it);
            return 5;
          }
          bytes[it.offset++] = 207;
          uint64$1(bytes, value, it);
          return 9;
        } else {
          if (value >= -32) {
            bytes[it.offset++] = 224 | (value + 32);
            return 1;
          }
          if (value >= -128) {
            bytes[it.offset++] = 208;
            int8$1(bytes, value, it);
            return 2;
          }
          if (value >= -32768) {
            bytes[it.offset++] = 209;
            int16$1(bytes, value, it);
            return 3;
          }
          if (value >= -2147483648) {
            bytes[it.offset++] = 210;
            int32$1(bytes, value, it);
            return 5;
          }
          bytes[it.offset++] = 211;
          int64$1(bytes, value, it);
          return 9;
        }
      }
      const encode2 = {
        int8: int8$1,
        uint8: uint8$1,
        int16: int16$1,
        uint16: uint16$1,
        int32: int32$1,
        uint32: uint32$1,
        int64: int64$1,
        uint64: uint64$1,
        bigint64: bigint64$1,
        biguint64: biguint64$1,
        float32: float32$1,
        float64: float64$1,
        boolean: boolean$1,
        string: string$1,
        number: number$1,
        utf8Write,
        utf8Length,
      };
      const _convoBuffer = new ArrayBuffer(8);
      const _int32 = new Int32Array(_convoBuffer);
      const _float32 = new Float32Array(_convoBuffer);
      const _float64 = new Float64Array(_convoBuffer);
      const _uint64 = new BigUint64Array(_convoBuffer);
      const _int64 = new BigInt64Array(_convoBuffer);
      function utf8Read(bytes, it, length) {
        if (length > bytes.length - it.offset) {
          length = bytes.length - it.offset;
        }
        var string2 = "",
          chr = 0;
        for (var i = it.offset, end = it.offset + length; i < end; i++) {
          var byte = bytes[i];
          if ((byte & 128) === 0) {
            string2 += String.fromCharCode(byte);
            continue;
          }
          if ((byte & 224) === 192) {
            string2 += String.fromCharCode(
              ((byte & 31) << 6) | (bytes[++i] & 63),
            );
            continue;
          }
          if ((byte & 240) === 224) {
            string2 += String.fromCharCode(
              ((byte & 15) << 12) |
                ((bytes[++i] & 63) << 6) |
                ((bytes[++i] & 63) << 0),
            );
            continue;
          }
          if ((byte & 248) === 240) {
            chr =
              ((byte & 7) << 18) |
              ((bytes[++i] & 63) << 12) |
              ((bytes[++i] & 63) << 6) |
              ((bytes[++i] & 63) << 0);
            if (chr >= 65536) {
              chr -= 65536;
              string2 += String.fromCharCode(
                (chr >>> 10) + 55296,
                (chr & 1023) + 56320,
              );
            } else {
              string2 += String.fromCharCode(chr);
            }
            continue;
          }
          console.error(
            "decode.utf8Read(): Invalid byte " +
              byte +
              " at offset " +
              i +
              ". Skip to end of string: " +
              (it.offset + length),
          );
          break;
        }
        it.offset += length;
        return string2;
      }
      function int8(bytes, it) {
        return (uint8(bytes, it) << 24) >> 24;
      }
      function uint8(bytes, it) {
        return bytes[it.offset++];
      }
      function int16(bytes, it) {
        return (uint16(bytes, it) << 16) >> 16;
      }
      function uint16(bytes, it) {
        return bytes[it.offset++] | (bytes[it.offset++] << 8);
      }
      function int32(bytes, it) {
        return (
          bytes[it.offset++] |
          (bytes[it.offset++] << 8) |
          (bytes[it.offset++] << 16) |
          (bytes[it.offset++] << 24)
        );
      }
      function uint32(bytes, it) {
        return int32(bytes, it) >>> 0;
      }
      function float32(bytes, it) {
        _int32[0] = int32(bytes, it);
        return _float32[0];
      }
      function float64(bytes, it) {
        _int32[0] = int32(bytes, it);
        _int32[1] = int32(bytes, it);
        return _float64[0];
      }
      function int64(bytes, it) {
        const low = uint32(bytes, it);
        const high = int32(bytes, it) * Math.pow(2, 32);
        return high + low;
      }
      function uint64(bytes, it) {
        const low = uint32(bytes, it);
        const high = uint32(bytes, it) * Math.pow(2, 32);
        return high + low;
      }
      function bigint64(bytes, it) {
        _int32[0] = int32(bytes, it);
        _int32[1] = int32(bytes, it);
        return _int64[0];
      }
      function biguint64(bytes, it) {
        _int32[0] = int32(bytes, it);
        _int32[1] = int32(bytes, it);
        return _uint64[0];
      }
      function boolean(bytes, it) {
        return uint8(bytes, it) > 0;
      }
      function string(bytes, it) {
        const prefix = bytes[it.offset++];
        let length;
        if (prefix < 192) {
          length = prefix & 31;
        } else if (prefix === 217) {
          length = uint8(bytes, it);
        } else if (prefix === 218) {
          length = uint16(bytes, it);
        } else if (prefix === 219) {
          length = uint32(bytes, it);
        }
        return utf8Read(bytes, it, length);
      }
      function number(bytes, it) {
        const prefix = bytes[it.offset++];
        if (prefix < 128) {
          return prefix;
        } else if (prefix === 202) {
          return float32(bytes, it);
        } else if (prefix === 203) {
          return float64(bytes, it);
        } else if (prefix === 204) {
          return uint8(bytes, it);
        } else if (prefix === 205) {
          return uint16(bytes, it);
        } else if (prefix === 206) {
          return uint32(bytes, it);
        } else if (prefix === 207) {
          return uint64(bytes, it);
        } else if (prefix === 208) {
          return int8(bytes, it);
        } else if (prefix === 209) {
          return int16(bytes, it);
        } else if (prefix === 210) {
          return int32(bytes, it);
        } else if (prefix === 211) {
          return int64(bytes, it);
        } else if (prefix > 223) {
          return (255 - prefix + 1) * -1;
        }
      }
      function stringCheck(bytes, it) {
        const prefix = bytes[it.offset];
        return (
          // fixstr
          (prefix < 192 && prefix > 160) || // str 8
          prefix === 217 || // str 16
          prefix === 218 || // str 32
          prefix === 219
        );
      }
      const decode2 = {
        utf8Read,
        int8,
        uint8,
        int16,
        uint16,
        int32,
        uint32,
        float32,
        float64,
        int64,
        uint64,
        bigint64,
        biguint64,
        boolean,
        string,
        number,
        stringCheck,
      };
      const registeredTypes = {};
      const identifiers = /* @__PURE__ */ new Map();
      function registerType(identifier, definition) {
        if (definition.constructor) {
          identifiers.set(definition.constructor, identifier);
          registeredTypes[identifier] = definition;
        }
        if (definition.encode) {
          encode2[identifier] = definition.encode;
        }
        if (definition.decode) {
          decode2[identifier] = definition.decode;
        }
      }
      function getType(identifier) {
        return registeredTypes[identifier];
      }
      function defineCustomTypes(types) {
        for (const identifier in types) {
          registerType(identifier, types[identifier]);
        }
        return (t) => type(t);
      }
      const _TypeContext = class _TypeContext {
        static register(target2) {
          const parent = Object.getPrototypeOf(target2);
          if (parent !== Schema) {
            let inherits = _TypeContext.inheritedTypes.get(parent);
            if (!inherits) {
              inherits = /* @__PURE__ */ new Set();
              _TypeContext.inheritedTypes.set(parent, inherits);
            }
            inherits.add(target2);
          }
        }
        static cache(rootClass) {
          let context = _TypeContext.cachedContexts.get(rootClass);
          if (!context) {
            context = new _TypeContext(rootClass);
            _TypeContext.cachedContexts.set(rootClass, context);
          }
          return context;
        }
        constructor(rootClass) {
          this.types = {};
          this.schemas = /* @__PURE__ */ new Map();
          this.hasFilters = false;
          this.parentFiltered = {};
          if (rootClass) {
            this.discoverTypes(rootClass);
          }
        }
        has(schema2) {
          return this.schemas.has(schema2);
        }
        get(typeid) {
          return this.types[typeid];
        }
        add(schema2, typeid = this.schemas.size) {
          if (this.schemas.has(schema2)) {
            return false;
          }
          this.types[typeid] = schema2;
          if (schema2[Symbol.metadata] === void 0) {
            Metadata.initialize(schema2);
          }
          this.schemas.set(schema2, typeid);
          return true;
        }
        getTypeId(klass) {
          return this.schemas.get(klass);
        }
        discoverTypes(klass, parentType, parentIndex, parentHasViewTag) {
          if (parentHasViewTag) {
            this.registerFilteredByParent(klass, parentType, parentIndex);
          }
          if (!this.add(klass)) {
            return;
          }
          _TypeContext.inheritedTypes.get(klass)?.forEach((child) => {
            this.discoverTypes(
              child,
              parentType,
              parentIndex,
              parentHasViewTag,
            );
          });
          let parent = klass;
          while (
            (parent = Object.getPrototypeOf(parent)) &&
            parent !== Schema && // stop at root (Schema)
            parent !== Function.prototype
          ) {
            this.discoverTypes(parent);
          }
          const metadata = (klass[Symbol.metadata] ??= {});
          if (metadata[$viewFieldIndexes]) {
            this.hasFilters = true;
          }
          for (const fieldIndex in metadata) {
            const index = fieldIndex;
            const fieldType = metadata[index].type;
            const fieldHasViewTag = metadata[index].tag !== void 0;
            if (typeof fieldType === "string") {
              continue;
            }
            if (typeof fieldType === "function") {
              this.discoverTypes(
                fieldType,
                klass,
                index,
                parentHasViewTag || fieldHasViewTag,
              );
            } else {
              const type2 = Object.values(fieldType)[0];
              if (typeof type2 === "string") {
                continue;
              }
              this.discoverTypes(
                type2,
                klass,
                index,
                parentHasViewTag || fieldHasViewTag,
              );
            }
          }
        }
        /**
         * Keep track of which classes have filters applied.
         * Format: `${typeid}-${parentTypeid}-${parentIndex}`
         */
        registerFilteredByParent(schema2, parentType, parentIndex) {
          const typeid = this.schemas.get(schema2) ?? this.schemas.size;
          let key = `${typeid}`;
          if (parentType) {
            key += `-${this.schemas.get(parentType)}`;
          }
          key += `-${parentIndex}`;
          this.parentFiltered[key] = true;
        }
        debug() {
          let parentFiltered = "";
          for (const key in this.parentFiltered) {
            const keys = key.split("-").map(Number);
            const fieldIndex = keys.pop();
            parentFiltered += `
		`;
            parentFiltered += `${key}: ${keys
              .reverse()
              .map((id, i) => {
                const klass = this.types[id];
                const metadata = klass[Symbol.metadata];
                let txt = klass.name;
                if (i === 0) {
                  txt += `[${metadata[fieldIndex].name}]`;
                }
                return `${txt}`;
              })
              .join(" -> ")}`;
          }
          return `TypeContext ->
	Schema types: ${this.schemas.size}
	hasFilters: ${this.hasFilters}
	parentFiltered:${parentFiltered}`;
        }
      };
      _TypeContext.inheritedTypes = /* @__PURE__ */ new Map();
      _TypeContext.cachedContexts = /* @__PURE__ */ new Map();
      let TypeContext = _TypeContext;
      function getNormalizedType(type2) {
        if (Array.isArray(type2)) {
          return { array: getNormalizedType(type2[0]) };
        } else if (typeof type2["type"] !== "undefined") {
          return type2["type"];
        } else if (isTSEnum(type2)) {
          return Object.keys(type2).every(
            (key) => typeof type2[key] === "string",
          )
            ? "string"
            : "number";
        } else if (typeof type2 === "object" && type2 !== null) {
          const collectionType = Object.keys(type2).find(
            (k) => registeredTypes[k] !== void 0,
          );
          if (collectionType) {
            type2[collectionType] = getNormalizedType(type2[collectionType]);
            return type2;
          }
        }
        return type2;
      }
      function isTSEnum(_enum) {
        if (typeof _enum === "function" && _enum[Symbol.metadata]) {
          return false;
        }
        const keys = Object.keys(_enum);
        const numericFields = keys.filter((k) => /\d+/.test(k));
        if (
          numericFields.length > 0 &&
          numericFields.length === keys.length / 2 &&
          _enum[_enum[numericFields[0]]] == numericFields[0]
        ) {
          return true;
        }
        if (
          keys.length > 0 &&
          keys.every(
            (key) => typeof _enum[key] === "string" && _enum[key] === key,
          )
        ) {
          return true;
        }
        return false;
      }
      const Metadata = {
        addField(metadata, index, name, type2, descriptor) {
          if (index > 64) {
            throw new Error(`Can't define field '${name}'.
Schema instances may only have up to 64 fields.`);
          }
          metadata[index] = Object.assign(
            metadata[index] || {},
            // avoid overwriting previous field metadata (@owned / @deprecated)
            {
              type: getNormalizedType(type2),
              index,
              name,
            },
          );
          Object.defineProperty(metadata, $descriptors, {
            value: metadata[$descriptors] || {},
            enumerable: false,
            configurable: true,
          });
          if (descriptor) {
            metadata[$descriptors][name] = descriptor;
            metadata[$descriptors][`_${name}`] = {
              value: void 0,
              writable: true,
              enumerable: false,
              configurable: true,
            };
          } else {
            metadata[$descriptors][name] = {
              value: void 0,
              writable: true,
              enumerable: true,
              configurable: true,
            };
          }
          Object.defineProperty(metadata, $numFields, {
            value: index,
            enumerable: false,
            configurable: true,
          });
          Object.defineProperty(metadata, name, {
            value: index,
            enumerable: false,
            configurable: true,
          });
          if (typeof metadata[index].type !== "string") {
            if (metadata[$refTypeFieldIndexes] === void 0) {
              Object.defineProperty(metadata, $refTypeFieldIndexes, {
                value: [],
                enumerable: false,
                configurable: true,
              });
            }
            metadata[$refTypeFieldIndexes].push(index);
          }
        },
        setTag(metadata, fieldName, tag) {
          const index = metadata[fieldName];
          const field = metadata[index];
          field.tag = tag;
          if (!metadata[$viewFieldIndexes]) {
            Object.defineProperty(metadata, $viewFieldIndexes, {
              value: [],
              enumerable: false,
              configurable: true,
            });
            Object.defineProperty(metadata, $fieldIndexesByViewTag, {
              value: {},
              enumerable: false,
              configurable: true,
            });
          }
          metadata[$viewFieldIndexes].push(index);
          if (!metadata[$fieldIndexesByViewTag][tag]) {
            metadata[$fieldIndexesByViewTag][tag] = [];
          }
          metadata[$fieldIndexesByViewTag][tag].push(index);
        },
        setFields(target2, fields) {
          const constructor = target2.prototype.constructor;
          TypeContext.register(constructor);
          const parentClass = Object.getPrototypeOf(constructor);
          const parentMetadata = parentClass && parentClass[Symbol.metadata];
          const metadata = Metadata.initialize(constructor);
          if (!constructor[$track]) {
            constructor[$track] = Schema[$track];
          }
          if (!constructor[$encoder]) {
            constructor[$encoder] = Schema[$encoder];
          }
          if (!constructor[$decoder]) {
            constructor[$decoder] = Schema[$decoder];
          }
          if (!constructor.prototype.toJSON) {
            constructor.prototype.toJSON = Schema.prototype.toJSON;
          }
          let fieldIndex =
            metadata[$numFields] ??
            (parentMetadata && parentMetadata[$numFields]) ??
            -1;
          fieldIndex++;
          for (const field in fields) {
            const type2 = getNormalizedType(fields[field]);
            const complexTypeKlass =
              typeof Object.keys(type2)[0] === "string" &&
              getType(Object.keys(type2)[0]);
            const childType = complexTypeKlass
              ? Object.values(type2)[0]
              : type2;
            Metadata.addField(
              metadata,
              fieldIndex,
              field,
              type2,
              getPropertyDescriptor(
                `_${field}`,
                fieldIndex,
                childType,
                complexTypeKlass,
              ),
            );
            fieldIndex++;
          }
          return target2;
        },
        isDeprecated(metadata, field) {
          return metadata[field].deprecated === true;
        },
        init(klass) {
          const metadata = {};
          klass[Symbol.metadata] = metadata;
          Object.defineProperty(metadata, $numFields, {
            value: 0,
            enumerable: false,
            configurable: true,
          });
        },
        initialize(constructor) {
          const parentClass = Object.getPrototypeOf(constructor);
          const parentMetadata = parentClass[Symbol.metadata];
          let metadata =
            constructor[Symbol.metadata] ?? /* @__PURE__ */ Object.create(null);
          if (parentClass !== Schema && metadata === parentMetadata) {
            metadata = /* @__PURE__ */ Object.create(null);
            if (parentMetadata) {
              Object.setPrototypeOf(metadata, parentMetadata);
              Object.defineProperty(metadata, $numFields, {
                value: parentMetadata[$numFields],
                enumerable: false,
                configurable: true,
                writable: true,
              });
              if (parentMetadata[$viewFieldIndexes] !== void 0) {
                Object.defineProperty(metadata, $viewFieldIndexes, {
                  value: [...parentMetadata[$viewFieldIndexes]],
                  enumerable: false,
                  configurable: true,
                  writable: true,
                });
                Object.defineProperty(metadata, $fieldIndexesByViewTag, {
                  value: { ...parentMetadata[$fieldIndexesByViewTag] },
                  enumerable: false,
                  configurable: true,
                  writable: true,
                });
              }
              if (parentMetadata[$refTypeFieldIndexes] !== void 0) {
                Object.defineProperty(metadata, $refTypeFieldIndexes, {
                  value: [...parentMetadata[$refTypeFieldIndexes]],
                  enumerable: false,
                  configurable: true,
                  writable: true,
                });
              }
              Object.defineProperty(metadata, $descriptors, {
                value: { ...parentMetadata[$descriptors] },
                enumerable: false,
                configurable: true,
                writable: true,
              });
            }
          }
          constructor[Symbol.metadata] = metadata;
          return metadata;
        },
        isValidInstance(klass) {
          return (
            klass.constructor[Symbol.metadata] &&
            Object.prototype.hasOwnProperty.call(
              klass.constructor[Symbol.metadata],
              $numFields,
            )
          );
        },
        getFields(klass) {
          const metadata = klass[Symbol.metadata];
          const fields = {};
          for (let i = 0; i <= metadata[$numFields]; i++) {
            fields[metadata[i].name] = metadata[i].type;
          }
          return fields;
        },
        hasViewTagAtIndex(metadata, index) {
          return metadata?.[$viewFieldIndexes]?.includes(index);
        },
      };
      function createChangeSet(queueRootNode) {
        return { indexes: {}, operations: [], queueRootNode };
      }
      function createChangeTreeList() {
        return { next: void 0, tail: void 0 };
      }
      function setOperationAtIndex(changeSet, index) {
        const operationsIndex = changeSet.indexes[index];
        if (operationsIndex === void 0) {
          changeSet.indexes[index] = changeSet.operations.push(index) - 1;
        } else {
          changeSet.operations[operationsIndex] = index;
        }
      }
      function deleteOperationAtIndex(changeSet, index) {
        let operationsIndex = changeSet.indexes[index];
        if (operationsIndex === void 0) {
          operationsIndex = Object.values(changeSet.indexes).at(-1);
          index = Object.entries(changeSet.indexes).find(
            ([_, value]) => value === operationsIndex,
          )?.[0];
        }
        changeSet.operations[operationsIndex] = void 0;
        delete changeSet.indexes[index];
      }
      class ChangeTree {
        constructor(ref) {
          this.isFiltered = false;
          this.indexedOperations = {};
          this.changes = { indexes: {}, operations: [] };
          this.allChanges = { indexes: {}, operations: [] };
          this.isNew = true;
          this.ref = ref;
          this.metadata = ref.constructor[Symbol.metadata];
          if (this.metadata?.[$viewFieldIndexes]) {
            this.allFilteredChanges = { indexes: {}, operations: [] };
            this.filteredChanges = { indexes: {}, operations: [] };
          }
        }
        setRoot(root) {
          this.root = root;
          const isNewChangeTree = this.root.add(this);
          this.checkIsFiltered(this.parent, this.parentIndex, isNewChangeTree);
          if (isNewChangeTree) {
            this.forEachChild((child, _) => {
              if (child.root !== root) {
                child.setRoot(root);
              } else {
                root.add(child);
              }
            });
          }
        }
        setParent(parent, root, parentIndex) {
          this.addParent(parent, parentIndex);
          if (!root) {
            return;
          }
          const isNewChangeTree = root.add(this);
          if (root !== this.root) {
            this.root = root;
            this.checkIsFiltered(parent, parentIndex, isNewChangeTree);
          }
          if (isNewChangeTree) {
            this.forEachChild((child, index) => {
              if (child.root === root) {
                root.add(child);
                root.moveNextToParent(child);
                return;
              }
              child.setParent(this.ref, root, index);
            });
          }
        }
        forEachChild(callback) {
          if (this.ref[$childType]) {
            if (typeof this.ref[$childType] !== "string") {
              for (const [key, value] of this.ref.entries()) {
                if (!value) {
                  continue;
                }
                callback(value[$changes], this.indexes?.[key] ?? key);
              }
            }
          } else {
            for (const index of this.metadata?.[$refTypeFieldIndexes] ?? []) {
              const field = this.metadata[index];
              const value = this.ref[field.name];
              if (!value) {
                continue;
              }
              callback(value[$changes], index);
            }
          }
        }
        operation(op) {
          if (this.filteredChanges !== void 0) {
            this.filteredChanges.operations.push(-op);
            this.root?.enqueueChangeTree(this, "filteredChanges");
          } else {
            this.changes.operations.push(-op);
            this.root?.enqueueChangeTree(this, "changes");
          }
        }
        change(index, operation = exports2.OPERATION.ADD) {
          const isFiltered =
            this.isFiltered || this.metadata?.[index]?.tag !== void 0;
          const changeSet = isFiltered ? this.filteredChanges : this.changes;
          const previousOperation = this.indexedOperations[index];
          if (
            !previousOperation ||
            previousOperation === exports2.OPERATION.DELETE
          ) {
            const op = !previousOperation
              ? operation
              : previousOperation === exports2.OPERATION.DELETE
                ? exports2.OPERATION.DELETE_AND_ADD
                : operation;
            this.indexedOperations[index] = op;
          }
          setOperationAtIndex(changeSet, index);
          if (isFiltered) {
            setOperationAtIndex(this.allFilteredChanges, index);
            if (this.root) {
              this.root.enqueueChangeTree(this, "filteredChanges");
              this.root.enqueueChangeTree(this, "allFilteredChanges");
            }
          } else {
            setOperationAtIndex(this.allChanges, index);
            this.root?.enqueueChangeTree(this, "changes");
          }
        }
        shiftChangeIndexes(shiftIndex) {
          const changeSet = this.isFiltered
            ? this.filteredChanges
            : this.changes;
          const newIndexedOperations = {};
          const newIndexes = {};
          for (const index in this.indexedOperations) {
            newIndexedOperations[Number(index) + shiftIndex] =
              this.indexedOperations[index];
            newIndexes[Number(index) + shiftIndex] = changeSet.indexes[index];
          }
          this.indexedOperations = newIndexedOperations;
          changeSet.indexes = newIndexes;
          changeSet.operations = changeSet.operations.map(
            (index) => index + shiftIndex,
          );
        }
        shiftAllChangeIndexes(shiftIndex, startIndex = 0) {
          if (this.filteredChanges !== void 0) {
            this._shiftAllChangeIndexes(
              shiftIndex,
              startIndex,
              this.allFilteredChanges,
            );
            this._shiftAllChangeIndexes(
              shiftIndex,
              startIndex,
              this.allChanges,
            );
          } else {
            this._shiftAllChangeIndexes(
              shiftIndex,
              startIndex,
              this.allChanges,
            );
          }
        }
        _shiftAllChangeIndexes(shiftIndex, startIndex = 0, changeSet) {
          const newIndexes = {};
          let newKey = 0;
          for (const key in changeSet.indexes) {
            newIndexes[newKey++] = changeSet.indexes[key];
          }
          changeSet.indexes = newIndexes;
          for (let i = 0; i < changeSet.operations.length; i++) {
            const index = changeSet.operations[i];
            if (index > startIndex) {
              changeSet.operations[i] = index + shiftIndex;
            }
          }
        }
        indexedOperation(index, operation, allChangesIndex = index) {
          this.indexedOperations[index] = operation;
          if (this.filteredChanges !== void 0) {
            setOperationAtIndex(this.allFilteredChanges, allChangesIndex);
            setOperationAtIndex(this.filteredChanges, index);
            this.root?.enqueueChangeTree(this, "filteredChanges");
          } else {
            setOperationAtIndex(this.allChanges, allChangesIndex);
            setOperationAtIndex(this.changes, index);
            this.root?.enqueueChangeTree(this, "changes");
          }
        }
        getType(index) {
          return (
            //
            // Get the child type from parent structure.
            // - ["string"] => "string"
            // - { map: "string" } => "string"
            // - { set: "string" } => "string"
            //
            this.ref[$childType] || // ArraySchema | MapSchema | SetSchema | CollectionSchema
            this.metadata[index].type
          );
        }
        getChange(index) {
          return this.indexedOperations[index];
        }
        //
        // used during `.encode()`
        //
        getValue(index, isEncodeAll = false) {
          return this.ref[$getByIndex](index, isEncodeAll);
        }
        delete(index, operation, allChangesIndex = index) {
          if (index === void 0) {
            try {
              throw new Error(
                `@colyseus/schema ${this.ref.constructor.name}: trying to delete non-existing index '${index}'`,
              );
            } catch (e) {
              console.warn(e);
            }
            return;
          }
          const changeSet =
            this.filteredChanges !== void 0
              ? this.filteredChanges
              : this.changes;
          this.indexedOperations[index] =
            operation ?? exports2.OPERATION.DELETE;
          setOperationAtIndex(changeSet, index);
          deleteOperationAtIndex(this.allChanges, allChangesIndex);
          const previousValue = this.getValue(index);
          if (previousValue && previousValue[$changes]) {
            this.root?.remove(previousValue[$changes]);
          }
          if (this.filteredChanges !== void 0) {
            deleteOperationAtIndex(this.allFilteredChanges, allChangesIndex);
            this.root?.enqueueChangeTree(this, "filteredChanges");
          } else {
            this.root?.enqueueChangeTree(this, "changes");
          }
          return previousValue;
        }
        endEncode(changeSetName) {
          this.indexedOperations = {};
          this[changeSetName] = createChangeSet();
          this.ref[$onEncodeEnd]?.();
          this.isNew = false;
        }
        discard(discardAll = false) {
          this.ref[$onEncodeEnd]?.();
          this.indexedOperations = {};
          this.changes = createChangeSet(this.changes.queueRootNode);
          if (this.filteredChanges !== void 0) {
            this.filteredChanges = createChangeSet(
              this.filteredChanges.queueRootNode,
            );
          }
          if (discardAll) {
            this.allChanges = createChangeSet(this.allChanges.queueRootNode);
            if (this.allFilteredChanges !== void 0) {
              this.allFilteredChanges = createChangeSet(
                this.allFilteredChanges.queueRootNode,
              );
            }
          }
        }
        /**
         * Recursively discard all changes from this, and child structures.
         * (Used in tests only)
         */
        discardAll() {
          const keys = Object.keys(this.indexedOperations);
          for (let i = 0, len = keys.length; i < len; i++) {
            const value = this.getValue(Number(keys[i]));
            if (value && value[$changes]) {
              value[$changes].discardAll();
            }
          }
          this.discard();
        }
        get changed() {
          return Object.entries(this.indexedOperations).length > 0;
        }
        checkIsFiltered(parent, parentIndex, isNewChangeTree) {
          if (this.root.types.hasFilters) {
            this._checkFilteredByParent(parent, parentIndex);
            if (this.filteredChanges !== void 0) {
              this.root?.enqueueChangeTree(this, "filteredChanges");
              if (isNewChangeTree) {
                this.root?.enqueueChangeTree(this, "allFilteredChanges");
              }
            }
          }
          if (!this.isFiltered) {
            this.root?.enqueueChangeTree(this, "changes");
            if (isNewChangeTree) {
              this.root?.enqueueChangeTree(this, "allChanges");
            }
          }
        }
        _checkFilteredByParent(parent, parentIndex) {
          if (!parent) {
            return;
          }
          const refType = Metadata.isValidInstance(this.ref)
            ? this.ref.constructor
            : this.ref[$childType];
          let parentChangeTree;
          let parentIsCollection = !Metadata.isValidInstance(parent);
          if (parentIsCollection) {
            parentChangeTree = parent[$changes];
            parent = parentChangeTree.parent;
            parentIndex = parentChangeTree.parentIndex;
          } else {
            parentChangeTree = parent[$changes];
          }
          const parentConstructor = parent.constructor;
          let key = `${this.root.types.getTypeId(refType)}`;
          if (parentConstructor) {
            key += `-${this.root.types.schemas.get(parentConstructor)}`;
          }
          key += `-${parentIndex}`;
          const fieldHasViewTag = Metadata.hasViewTagAtIndex(
            parentConstructor?.[Symbol.metadata],
            parentIndex,
          );
          this.isFiltered =
            parent[$changes].isFiltered ||
            this.root.types.parentFiltered[key] ||
            fieldHasViewTag;
          if (this.isFiltered) {
            this.isVisibilitySharedWithParent =
              parentChangeTree.isFiltered &&
              typeof refType !== "string" &&
              !fieldHasViewTag &&
              parentIsCollection;
            if (!this.filteredChanges) {
              this.filteredChanges = createChangeSet();
              this.allFilteredChanges = createChangeSet();
            }
            if (this.changes.operations.length > 0) {
              this.changes.operations.forEach((index) =>
                setOperationAtIndex(this.filteredChanges, index),
              );
              this.allChanges.operations.forEach((index) =>
                setOperationAtIndex(this.allFilteredChanges, index),
              );
              this.changes = createChangeSet();
              this.allChanges = createChangeSet();
            }
          }
        }
        /**
         * Get the immediate parent
         */
        get parent() {
          return this.parentChain?.ref;
        }
        /**
         * Get the immediate parent index
         */
        get parentIndex() {
          return this.parentChain?.index;
        }
        /**
         * Add a parent to the chain
         */
        addParent(parent, index) {
          if (this.hasParent((p, _) => p[$changes] === parent[$changes])) {
            this.parentChain.index = index;
            return;
          }
          this.parentChain = {
            ref: parent,
            index,
            next: this.parentChain,
          };
        }
        /**
         * Remove a parent from the chain
         * @param parent - The parent to remove
         * @returns true if parent was removed
         */
        removeParent(parent = this.parent) {
          let current = this.parentChain;
          let previous = null;
          while (current) {
            if (current.ref[$changes] === parent[$changes]) {
              if (previous) {
                previous.next = current.next;
              } else {
                this.parentChain = current.next;
              }
              return true;
            }
            previous = current;
            current = current.next;
          }
          return this.parentChain === void 0;
        }
        /**
         * Find a specific parent in the chain
         */
        findParent(predicate) {
          let current = this.parentChain;
          while (current) {
            if (predicate(current.ref, current.index)) {
              return current;
            }
            current = current.next;
          }
          return void 0;
        }
        /**
         * Check if this ChangeTree has a specific parent
         */
        hasParent(predicate) {
          return this.findParent(predicate) !== void 0;
        }
        /**
         * Get all parents as an array (for debugging/testing)
         */
        getAllParents() {
          const parents = [];
          let current = this.parentChain;
          while (current) {
            parents.push({ ref: current.ref, index: current.index });
            current = current.next;
          }
          return parents;
        }
      }
      function encodeValue(encoder, bytes, type2, value, operation, it) {
        if (typeof type2 === "string") {
          encode2[type2]?.(bytes, value, it);
        } else if (type2[Symbol.metadata] !== void 0) {
          encode2.number(bytes, value[$changes].refId, it);
          if ((operation & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
            encoder.tryEncodeTypeId(bytes, type2, value.constructor, it);
          }
        } else {
          encode2.number(bytes, value[$changes].refId, it);
        }
      }
      const encodeSchemaOperation = function (
        encoder,
        bytes,
        changeTree,
        index,
        operation,
        it,
        _,
        __,
        metadata,
      ) {
        bytes[it.offset++] = (index | operation) & 255;
        if (operation === exports2.OPERATION.DELETE) {
          return;
        }
        const ref = changeTree.ref;
        const field = metadata[index];
        encodeValue(
          encoder,
          bytes,
          metadata[index].type,
          ref[field.name],
          operation,
          it,
        );
      };
      const encodeKeyValueOperation = function (
        encoder,
        bytes,
        changeTree,
        index,
        operation,
        it,
      ) {
        bytes[it.offset++] = operation & 255;
        encode2.number(bytes, index, it);
        if (operation === exports2.OPERATION.DELETE) {
          return;
        }
        const ref = changeTree.ref;
        if ((operation & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
          if (typeof ref["set"] === "function") {
            const dynamicIndex = changeTree.ref["$indexes"].get(index);
            encode2.string(bytes, dynamicIndex, it);
          }
        }
        const type2 = ref[$childType];
        const value = ref[$getByIndex](index);
        encodeValue(encoder, bytes, type2, value, operation, it);
      };
      const encodeArray = function (
        encoder,
        bytes,
        changeTree,
        field,
        operation,
        it,
        isEncodeAll,
        hasView,
      ) {
        const ref = changeTree.ref;
        const useOperationByRefId =
          hasView &&
          changeTree.isFiltered &&
          typeof changeTree.getType(field) !== "string";
        let refOrIndex;
        if (useOperationByRefId) {
          const item = ref["tmpItems"][field];
          if (!item) {
            return;
          }
          refOrIndex = item[$changes].refId;
          if (operation === exports2.OPERATION.DELETE) {
            operation = exports2.OPERATION.DELETE_BY_REFID;
          } else if (operation === exports2.OPERATION.ADD) {
            operation = exports2.OPERATION.ADD_BY_REFID;
          }
        } else {
          refOrIndex = field;
        }
        bytes[it.offset++] = operation & 255;
        encode2.number(bytes, refOrIndex, it);
        if (
          operation === exports2.OPERATION.DELETE ||
          operation === exports2.OPERATION.DELETE_BY_REFID
        ) {
          return;
        }
        const type2 = changeTree.getType(field);
        const value = changeTree.getValue(field, isEncodeAll);
        encodeValue(encoder, bytes, type2, value, operation, it);
      };
      const DEFINITION_MISMATCH = -1;
      function decodeValue(
        decoder2,
        operation,
        ref,
        index,
        type2,
        bytes,
        it,
        allChanges,
      ) {
        const $root = decoder2.root;
        const previousValue = ref[$getByIndex](index);
        let value;
        if (
          (operation & exports2.OPERATION.DELETE) ===
          exports2.OPERATION.DELETE
        ) {
          const previousRefId = $root.refIds.get(previousValue);
          if (previousRefId !== void 0) {
            $root.removeRef(previousRefId);
          }
          if (operation !== exports2.OPERATION.DELETE_AND_ADD) {
            ref[$deleteByIndex](index);
          }
          value = void 0;
        }
        if (operation === exports2.OPERATION.DELETE);
        else if (Schema.is(type2)) {
          const refId = decode2.number(bytes, it);
          value = $root.refs.get(refId);
          if ((operation & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
            const childType = decoder2.getInstanceType(bytes, it, type2);
            if (!value) {
              value = decoder2.createInstanceOfType(childType);
            }
            $root.addRef(
              refId,
              value,
              value !== previousValue || // increment ref count if value has changed
                (operation === exports2.OPERATION.DELETE_AND_ADD &&
                  value === previousValue),
            );
          }
        } else if (typeof type2 === "string") {
          value = decode2[type2](bytes, it);
        } else {
          const typeDef = getType(Object.keys(type2)[0]);
          const refId = decode2.number(bytes, it);
          const valueRef = $root.refs.has(refId)
            ? previousValue || $root.refs.get(refId)
            : new typeDef.constructor();
          value = valueRef.clone(true);
          value[$childType] = Object.values(type2)[0];
          if (previousValue) {
            let previousRefId = $root.refIds.get(previousValue);
            if (previousRefId !== void 0 && refId !== previousRefId) {
              const entries = previousValue.entries();
              let iter;
              while ((iter = entries.next()) && !iter.done) {
                const [key, value2] = iter.value;
                if (typeof value2 === "object") {
                  previousRefId = $root.refIds.get(value2);
                  $root.removeRef(previousRefId);
                }
                allChanges.push({
                  ref: previousValue,
                  refId: previousRefId,
                  op: exports2.OPERATION.DELETE,
                  field: key,
                  value: void 0,
                  previousValue: value2,
                });
              }
            }
          }
          $root.addRef(
            refId,
            value,
            valueRef !== previousValue ||
              (operation === exports2.OPERATION.DELETE_AND_ADD &&
                valueRef === previousValue),
          );
        }
        return { value, previousValue };
      }
      const decodeSchemaOperation = function (
        decoder2,
        bytes,
        it,
        ref,
        allChanges,
      ) {
        const first_byte = bytes[it.offset++];
        const metadata = ref.constructor[Symbol.metadata];
        const operation = (first_byte >> 6) << 6;
        const index = first_byte % (operation || 255);
        const field = metadata[index];
        if (field === void 0) {
          console.warn("@colyseus/schema: field not defined at", {
            index,
            ref: ref.constructor.name,
            metadata,
          });
          return DEFINITION_MISMATCH;
        }
        const { value, previousValue } = decodeValue(
          decoder2,
          operation,
          ref,
          index,
          field.type,
          bytes,
          it,
          allChanges,
        );
        if (value !== null && value !== void 0) {
          ref[field.name] = value;
        }
        if (previousValue !== value) {
          allChanges.push({
            ref,
            refId: decoder2.currentRefId,
            op: operation,
            field: field.name,
            value,
            previousValue,
          });
        }
      };
      const decodeKeyValueOperation = function (
        decoder2,
        bytes,
        it,
        ref,
        allChanges,
      ) {
        const operation = bytes[it.offset++];
        if (operation === exports2.OPERATION.CLEAR) {
          decoder2.removeChildRefs(ref, allChanges);
          ref.clear();
          return;
        }
        const index = decode2.number(bytes, it);
        const type2 = ref[$childType];
        let dynamicIndex;
        if ((operation & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
          if (typeof ref["set"] === "function") {
            dynamicIndex = decode2.string(bytes, it);
            ref["setIndex"](index, dynamicIndex);
          } else {
            dynamicIndex = index;
          }
        } else {
          dynamicIndex = ref["getIndex"](index);
        }
        const { value, previousValue } = decodeValue(
          decoder2,
          operation,
          ref,
          index,
          type2,
          bytes,
          it,
          allChanges,
        );
        if (value !== null && value !== void 0) {
          if (typeof ref["set"] === "function") {
            ref["$items"].set(dynamicIndex, value);
          } else if (typeof ref["$setAt"] === "function") {
            ref["$setAt"](index, value, operation);
          } else if (typeof ref["add"] === "function") {
            const index2 = ref.add(value);
            if (typeof index2 === "number") {
              ref["setIndex"](index2, index2);
            }
          }
        }
        if (previousValue !== value) {
          allChanges.push({
            ref,
            refId: decoder2.currentRefId,
            op: operation,
            field: "",
            // FIXME: remove this
            dynamicIndex,
            value,
            previousValue,
          });
        }
      };
      const decodeArray = function (decoder2, bytes, it, ref, allChanges) {
        let operation = bytes[it.offset++];
        let index;
        if (operation === exports2.OPERATION.CLEAR) {
          decoder2.removeChildRefs(ref, allChanges);
          ref.clear();
          return;
        } else if (operation === exports2.OPERATION.REVERSE) {
          ref.reverse();
          return;
        } else if (operation === exports2.OPERATION.DELETE_BY_REFID) {
          const refId = decode2.number(bytes, it);
          const previousValue2 = decoder2.root.refs.get(refId);
          index = ref.findIndex((value2) => value2 === previousValue2);
          ref[$deleteByIndex](index);
          allChanges.push({
            ref,
            refId: decoder2.currentRefId,
            op: exports2.OPERATION.DELETE,
            field: "",
            // FIXME: remove this
            dynamicIndex: index,
            value: void 0,
            previousValue: previousValue2,
          });
          return;
        } else if (operation === exports2.OPERATION.ADD_BY_REFID) {
          const refId = decode2.number(bytes, it);
          const itemByRefId = decoder2.root.refs.get(refId);
          if (itemByRefId) {
            index = ref.findIndex((value2) => value2 === itemByRefId);
          }
          if (index === -1 || index === void 0) {
            index = ref.length;
          }
        } else {
          index = decode2.number(bytes, it);
        }
        const type2 = ref[$childType];
        let dynamicIndex = index;
        const { value, previousValue } = decodeValue(
          decoder2,
          operation,
          ref,
          index,
          type2,
          bytes,
          it,
          allChanges,
        );
        if (value !== null && value !== void 0 && value !== previousValue) {
          ref["$setAt"](index, value, operation);
        }
        if (previousValue !== value) {
          allChanges.push({
            ref,
            refId: decoder2.currentRefId,
            op: operation,
            field: "",
            // FIXME: remove this
            dynamicIndex,
            value,
            previousValue,
          });
        }
      };
      class EncodeSchemaError extends Error {}
      function assertType(value, type2, klass, field) {
        let typeofTarget;
        let allowNull = false;
        switch (type2) {
          case "number":
          case "int8":
          case "uint8":
          case "int16":
          case "uint16":
          case "int32":
          case "uint32":
          case "int64":
          case "uint64":
          case "float32":
          case "float64":
            typeofTarget = "number";
            if (isNaN(value)) {
              console.log(
                `trying to encode "NaN" in ${klass.constructor.name}#${field}`,
              );
            }
            break;
          case "bigint64":
          case "biguint64":
            typeofTarget = "bigint";
            break;
          case "string":
            typeofTarget = "string";
            allowNull = true;
            break;
          case "boolean":
            return;
          default:
            return;
        }
        if (
          typeof value !== typeofTarget &&
          (!allowNull || (allowNull && value !== null))
        ) {
          let foundValue = `'${JSON.stringify(value)}'${(value && value.constructor && ` (${value.constructor.name})`) || ""}`;
          throw new EncodeSchemaError(
            `a '${typeofTarget}' was expected, but ${foundValue} was provided in ${klass.constructor.name}#${field}`,
          );
        }
      }
      function assertInstanceType(value, type2, instance, field) {
        if (!(value instanceof type2)) {
          throw new EncodeSchemaError(
            `a '${type2.name}' was expected, but '${value && value.constructor.name}' was provided in ${instance.constructor.name}#${field}`,
          );
        }
      }
      var _a$4, _b$4;
      const DEFAULT_SORT = (a, b) => {
        const A = a.toString();
        const B = b.toString();
        if (A < B) return -1;
        else if (A > B) return 1;
        else return 0;
      };
      const _ArraySchema = class _ArraySchema {
        /**
         * Determine if a property must be filtered.
         * - If returns false, the property is NOT going to be encoded.
         * - If returns true, the property is going to be encoded.
         *
         * Encoding with "filters" happens in two steps:
         * - First, the encoder iterates over all "not owned" properties and encodes them.
         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
         */
        static [((_a$4 = $encoder), (_b$4 = $decoder), $filter)](
          ref,
          index,
          view2,
        ) {
          return (
            !view2 ||
            typeof ref[$childType] === "string" ||
            view2.isChangeTreeVisible(ref["tmpItems"][index]?.[$changes])
          );
        }
        static is(type2) {
          return (
            // type format: ["string"]
            Array.isArray(type2) || // type format: { array: "string" }
            type2["array"] !== void 0
          );
        }
        static from(iterable) {
          return new _ArraySchema(...Array.from(iterable));
        }
        constructor(...items) {
          this.items = [];
          this.tmpItems = [];
          this.deletedIndexes = {};
          this.isMovingItems = false;
          Object.defineProperty(this, $childType, {
            value: void 0,
            enumerable: false,
            writable: true,
            configurable: true,
          });
          const proxy = new Proxy(this, {
            get: (obj, prop) => {
              if (
                typeof prop !== "symbol" && // FIXME: d8 accuses this as low performance
                !isNaN(prop)
              ) {
                return this.items[prop];
              } else {
                return Reflect.get(obj, prop);
              }
            },
            set: (obj, key, setValue) => {
              if (typeof key !== "symbol" && !isNaN(key)) {
                if (setValue === void 0 || setValue === null) {
                  obj.$deleteAt(key);
                } else {
                  if (setValue[$changes]) {
                    assertInstanceType(setValue, obj[$childType], obj, key);
                    const previousValue = obj.items[key];
                    if (!obj.isMovingItems) {
                      obj.$changeAt(Number(key), setValue);
                    } else {
                      if (previousValue !== void 0) {
                        if (setValue[$changes].isNew) {
                          obj[$changes].indexedOperation(
                            Number(key),
                            exports2.OPERATION.MOVE_AND_ADD,
                          );
                        } else {
                          if (
                            (obj[$changes].getChange(Number(key)) &
                              exports2.OPERATION.DELETE) ===
                            exports2.OPERATION.DELETE
                          ) {
                            obj[$changes].indexedOperation(
                              Number(key),
                              exports2.OPERATION.DELETE_AND_MOVE,
                            );
                          } else {
                            obj[$changes].indexedOperation(
                              Number(key),
                              exports2.OPERATION.MOVE,
                            );
                          }
                        }
                      } else if (setValue[$changes].isNew) {
                        obj[$changes].indexedOperation(
                          Number(key),
                          exports2.OPERATION.ADD,
                        );
                      }
                      setValue[$changes].setParent(
                        this,
                        obj[$changes].root,
                        key,
                      );
                    }
                    if (previousValue !== void 0) {
                      previousValue[$changes].root?.remove(
                        previousValue[$changes],
                      );
                    }
                  } else {
                    obj.$changeAt(Number(key), setValue);
                  }
                  obj.items[key] = setValue;
                  obj.tmpItems[key] = setValue;
                }
                return true;
              } else {
                return Reflect.set(obj, key, setValue);
              }
            },
            deleteProperty: (obj, prop) => {
              if (typeof prop === "number") {
                obj.$deleteAt(prop);
              } else {
                delete obj[prop];
              }
              return true;
            },
            has: (obj, key) => {
              if (typeof key !== "symbol" && !isNaN(Number(key))) {
                return Reflect.has(this.items, key);
              }
              return Reflect.has(obj, key);
            },
          });
          Object.defineProperty(this, $changes, {
            value: new ChangeTree(proxy),
            enumerable: false,
            writable: true,
          });
          if (items.length > 0) {
            this.push(...items);
          }
          return proxy;
        }
        set length(newLength) {
          if (newLength === 0) {
            this.clear();
          } else if (newLength < this.items.length) {
            this.splice(newLength, this.length - newLength);
          } else {
            console.warn(
              "ArraySchema: can't set .length to a higher value than its length.",
            );
          }
        }
        get length() {
          return this.items.length;
        }
        push(...values) {
          let length = this.tmpItems.length;
          const changeTree = this[$changes];
          for (let i = 0, l = values.length; i < l; i++, length++) {
            const value = values[i];
            if (value === void 0 || value === null) {
              return;
            } else if (typeof value === "object" && this[$childType]) {
              assertInstanceType(value, this[$childType], this, i);
            }
            changeTree.indexedOperation(
              length,
              exports2.OPERATION.ADD,
              this.items.length,
            );
            this.items.push(value);
            this.tmpItems.push(value);
            value[$changes]?.setParent(this, changeTree.root, length);
          }
          return length;
        }
        /**
         * Removes the last element from an array and returns it.
         */
        pop() {
          let index = -1;
          for (let i = this.tmpItems.length - 1; i >= 0; i--) {
            if (this.deletedIndexes[i] !== true) {
              index = i;
              break;
            }
          }
          if (index < 0) {
            return void 0;
          }
          this[$changes].delete(index, void 0, this.items.length - 1);
          this.deletedIndexes[index] = true;
          return this.items.pop();
        }
        at(index) {
          if (index < 0) index += this.length;
          return this.items[index];
        }
        // encoding only
        $changeAt(index, value) {
          if (value === void 0 || value === null) {
            console.error(
              "ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.",
            );
            return;
          }
          if (this.items[index] === value) {
            return;
          }
          const operation =
            this.items[index] !== void 0
              ? typeof value === "object"
                ? exports2.OPERATION.DELETE_AND_ADD
                : exports2.OPERATION.REPLACE
              : exports2.OPERATION.ADD;
          const changeTree = this[$changes];
          changeTree.change(index, operation);
          value[$changes]?.setParent(this, changeTree.root, index);
        }
        // encoding only
        $deleteAt(index, operation) {
          this[$changes].delete(index, operation);
        }
        // decoding only
        $setAt(index, value, operation) {
          if (
            index === 0 &&
            operation === exports2.OPERATION.ADD &&
            this.items[index] !== void 0
          ) {
            this.items.unshift(value);
          } else if (operation === exports2.OPERATION.DELETE_AND_MOVE) {
            this.items.splice(index, 1);
            this.items[index] = value;
          } else {
            this.items[index] = value;
          }
        }
        clear() {
          if (this.items.length === 0) {
            return;
          }
          const changeTree = this[$changes];
          changeTree.forEachChild((childChangeTree, _) => {
            changeTree.root?.remove(childChangeTree);
          });
          changeTree.discard(true);
          changeTree.operation(exports2.OPERATION.CLEAR);
          this.items.length = 0;
          this.tmpItems.length = 0;
        }
        /**
         * Combines two or more arrays.
         * @param items Additional items to add to the end of array1.
         */
        // @ts-ignore
        concat(...items) {
          return new _ArraySchema(...this.items.concat(...items));
        }
        /**
         * Adds all the elements of an array separated by the specified separator string.
         * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
         */
        join(separator) {
          return this.items.join(separator);
        }
        /**
         * Reverses the elements in an Array.
         */
        // @ts-ignore
        reverse() {
          this[$changes].operation(exports2.OPERATION.REVERSE);
          this.items.reverse();
          this.tmpItems.reverse();
          return this;
        }
        /**
         * Removes the first element from an array and returns it.
         */
        shift() {
          if (this.items.length === 0) {
            return void 0;
          }
          const changeTree = this[$changes];
          const index = this.tmpItems.findIndex(
            (item) => item === this.items[0],
          );
          const allChangesIndex = this.items.findIndex(
            (item) => item === this.items[0],
          );
          changeTree.delete(index, exports2.OPERATION.DELETE, allChangesIndex);
          changeTree.shiftAllChangeIndexes(-1, allChangesIndex);
          this.deletedIndexes[index] = true;
          return this.items.shift();
        }
        /**
         * Returns a section of an array.
         * @param start The beginning of the specified portion of the array.
         * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
         */
        slice(start, end) {
          const sliced = new _ArraySchema();
          sliced.push(...this.items.slice(start, end));
          return sliced;
        }
        /**
         * Sorts an array.
         * @param compareFn Function used to determine the order of the elements. It is expected to return
         * a negative value if first argument is less than second argument, zero if they're equal and a positive
         * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
         * ```ts
         * [11,2,22,1].sort((a, b) => a - b)
         * ```
         */
        sort(compareFn = DEFAULT_SORT) {
          this.isMovingItems = true;
          const changeTree = this[$changes];
          const sortedItems = this.items.sort(compareFn);
          sortedItems.forEach((_, i) =>
            changeTree.change(i, exports2.OPERATION.REPLACE),
          );
          this.tmpItems.sort(compareFn);
          this.isMovingItems = false;
          return this;
        }
        /**
         * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
         * @param start The zero-based location in the array from which to start removing elements.
         * @param deleteCount The number of elements to remove.
         * @param insertItems Elements to insert into the array in place of the deleted elements.
         */
        splice(start, deleteCount, ...insertItems) {
          const changeTree = this[$changes];
          const itemsLength = this.items.length;
          const tmpItemsLength = this.tmpItems.length;
          const insertCount = insertItems.length;
          const indexes = [];
          for (let i = 0; i < tmpItemsLength; i++) {
            if (this.deletedIndexes[i] !== true) {
              indexes.push(i);
            }
          }
          if (itemsLength > start) {
            if (deleteCount === void 0) {
              deleteCount = itemsLength - start;
            }
            for (let i = start; i < start + deleteCount; i++) {
              const index = indexes[i];
              changeTree.delete(index, exports2.OPERATION.DELETE);
              this.deletedIndexes[index] = true;
            }
          } else {
            deleteCount = 0;
          }
          if (insertCount > 0) {
            if (insertCount > deleteCount) {
              console.error(
                "Inserting more elements than deleting during ArraySchema#splice()",
              );
              throw new Error(
                "ArraySchema#splice(): insertCount must be equal or lower than deleteCount.",
              );
            }
            for (let i = 0; i < insertCount; i++) {
              const addIndex = (indexes[start] ?? itemsLength) + i;
              changeTree.indexedOperation(
                addIndex,
                this.deletedIndexes[addIndex]
                  ? exports2.OPERATION.DELETE_AND_ADD
                  : exports2.OPERATION.ADD,
              );
              insertItems[i][$changes]?.setParent(
                this,
                changeTree.root,
                addIndex,
              );
            }
          }
          if (deleteCount > insertCount) {
            changeTree.shiftAllChangeIndexes(
              -(deleteCount - insertCount),
              indexes[start + insertCount],
            );
          }
          if (changeTree.filteredChanges !== void 0) {
            changeTree.root?.enqueueChangeTree(changeTree, "filteredChanges");
          } else {
            changeTree.root?.enqueueChangeTree(changeTree, "changes");
          }
          return this.items.splice(start, deleteCount, ...insertItems);
        }
        /**
         * Inserts new elements at the start of an array.
         * @param items  Elements to insert at the start of the Array.
         */
        unshift(...items) {
          const changeTree = this[$changes];
          changeTree.shiftChangeIndexes(items.length);
          if (changeTree.isFiltered) {
            setOperationAtIndex(changeTree.filteredChanges, this.items.length);
          } else {
            setOperationAtIndex(changeTree.allChanges, this.items.length);
          }
          items.forEach((_, index) => {
            changeTree.change(index, exports2.OPERATION.ADD);
          });
          this.tmpItems.unshift(...items);
          return this.items.unshift(...items);
        }
        /**
         * Returns the index of the first occurrence of a value in an array.
         * @param searchElement The value to locate in the array.
         * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
         */
        indexOf(searchElement, fromIndex) {
          return this.items.indexOf(searchElement, fromIndex);
        }
        /**
         * Returns the index of the last occurrence of a specified value in an array.
         * @param searchElement The value to locate in the array.
         * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
         */
        lastIndexOf(searchElement, fromIndex = this.length - 1) {
          return this.items.lastIndexOf(searchElement, fromIndex);
        }
        every(callbackfn, thisArg) {
          return this.items.every(callbackfn, thisArg);
        }
        /**
         * Determines whether the specified callback function returns true for any element of an array.
         * @param callbackfn A function that accepts up to three arguments. The some method calls
         * the callbackfn function for each element in the array until the callbackfn returns a value
         * which is coercible to the Boolean value true, or until the end of the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function.
         * If thisArg is omitted, undefined is used as the this value.
         */
        some(callbackfn, thisArg) {
          return this.items.some(callbackfn, thisArg);
        }
        /**
         * Performs the specified action for each element in an array.
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        forEach(callbackfn, thisArg) {
          return this.items.forEach(callbackfn, thisArg);
        }
        /**
         * Calls a defined callback function on each element of an array, and returns an array that contains the results.
         * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        map(callbackfn, thisArg) {
          return this.items.map(callbackfn, thisArg);
        }
        filter(callbackfn, thisArg) {
          return this.items.filter(callbackfn, thisArg);
        }
        /**
         * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
         */
        reduce(callbackfn, initialValue) {
          return this.items.reduce(callbackfn, initialValue);
        }
        /**
         * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
         */
        reduceRight(callbackfn, initialValue) {
          return this.items.reduceRight(callbackfn, initialValue);
        }
        /**
         * Returns the value of the first element in the array where predicate is true, and undefined
         * otherwise.
         * @param predicate find calls predicate once for each element of the array, in ascending
         * order, until it finds one where predicate returns true. If such an element is found, find
         * immediately returns that element value. Otherwise, find returns undefined.
         * @param thisArg If provided, it will be used as the this value for each invocation of
         * predicate. If it is not provided, undefined is used instead.
         */
        find(predicate, thisArg) {
          return this.items.find(predicate, thisArg);
        }
        /**
         * Returns the index of the first element in the array where predicate is true, and -1
         * otherwise.
         * @param predicate find calls predicate once for each element of the array, in ascending
         * order, until it finds one where predicate returns true. If such an element is found,
         * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
         * @param thisArg If provided, it will be used as the this value for each invocation of
         * predicate. If it is not provided, undefined is used instead.
         */
        findIndex(predicate, thisArg) {
          return this.items.findIndex(predicate, thisArg);
        }
        /**
         * Returns the this object after filling the section identified by start and end with value
         * @param value value to fill array section with
         * @param start index to start filling the array at. If start is negative, it is treated as
         * length+start where length is the length of the array.
         * @param end index to stop filling the array at. If end is negative, it is treated as
         * length+end.
         */
        fill(value, start, end) {
          throw new Error("ArraySchema#fill() not implemented");
        }
        /**
         * Returns the this object after copying a section of the array identified by start and end
         * to the same array starting at position target
         * @param target If target is negative, it is treated as length+target where length is the
         * length of the array.
         * @param start If start is negative, it is treated as length+start. If end is negative, it
         * is treated as length+end.
         * @param end If not specified, length of the this object is used as its default value.
         */
        copyWithin(target2, start, end) {
          throw new Error("ArraySchema#copyWithin() not implemented");
        }
        /**
         * Returns a string representation of an array.
         */
        toString() {
          return this.items.toString();
        }
        /**
         * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
         */
        toLocaleString() {
          return this.items.toLocaleString();
        }
        /** Iterator */
        [Symbol.iterator]() {
          return this.items[Symbol.iterator]();
        }
        static get [Symbol.species]() {
          return _ArraySchema;
        }
        /**
         * Returns an iterable of key, value pairs for every entry in the array
         */
        entries() {
          return this.items.entries();
        }
        /**
         * Returns an iterable of keys in the array
         */
        keys() {
          return this.items.keys();
        }
        /**
         * Returns an iterable of values in the array
         */
        values() {
          return this.items.values();
        }
        /**
         * Determines whether an array includes a certain element, returning true or false as appropriate.
         * @param searchElement The element to search for.
         * @param fromIndex The position in this array at which to begin searching for searchElement.
         */
        includes(searchElement, fromIndex) {
          return this.items.includes(searchElement, fromIndex);
        }
        //
        // ES2022
        //
        /**
         * Calls a defined callback function on each element of an array. Then, flattens the result into
         * a new array.
         * This is identical to a map followed by flat with depth 1.
         *
         * @param callback A function that accepts up to three arguments. The flatMap method calls the
         * callback function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callback function. If
         * thisArg is omitted, undefined is used as the this value.
         */
        // @ts-ignore
        flatMap(callback, thisArg) {
          throw new Error("ArraySchema#flatMap() is not supported.");
        }
        /**
         * Returns a new array with all sub-array elements concatenated into it recursively up to the
         * specified depth.
         *
         * @param depth The maximum recursion depth
         */
        // @ts-ignore
        flat(depth) {
          throw new Error("ArraySchema#flat() is not supported.");
        }
        findLast() {
          return this.items.findLast.apply(this.items, arguments);
        }
        findLastIndex(...args) {
          return this.items.findLastIndex.apply(this.items, arguments);
        }
        //
        // ES2023
        //
        with(index, value) {
          const copy2 = this.items.slice();
          if (index < 0) index += this.length;
          copy2[index] = value;
          return new _ArraySchema(...copy2);
        }
        toReversed() {
          return this.items.slice().reverse();
        }
        toSorted(compareFn) {
          return this.items.slice().sort(compareFn);
        }
        // @ts-ignore
        toSpliced(start, deleteCount, ...items) {
          return this.items.toSpliced.apply(copy, arguments);
        }
        shuffle() {
          return this.move((_) => {
            let currentIndex = this.items.length;
            while (currentIndex != 0) {
              let randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [this[currentIndex], this[randomIndex]] = [
                this[randomIndex],
                this[currentIndex],
              ];
            }
          });
        }
        /**
         * Allows to move items around in the array.
         *
         * Example:
         *     state.cards.move((cards) => {
         *         [cards[4], cards[3]] = [cards[3], cards[4]];
         *         [cards[3], cards[2]] = [cards[2], cards[3]];
         *         [cards[2], cards[0]] = [cards[0], cards[2]];
         *         [cards[1], cards[1]] = [cards[1], cards[1]];
         *         [cards[0], cards[0]] = [cards[0], cards[0]];
         *     })
         *
         * @param cb
         * @returns
         */
        move(cb) {
          this.isMovingItems = true;
          cb(this);
          this.isMovingItems = false;
          return this;
        }
        [$getByIndex](index, isEncodeAll = false) {
          return isEncodeAll
            ? this.items[index]
            : this.deletedIndexes[index]
              ? this.items[index]
              : this.tmpItems[index] || this.items[index];
        }
        [$deleteByIndex](index) {
          this.items[index] = void 0;
          this.tmpItems[index] = void 0;
        }
        [$onEncodeEnd]() {
          this.tmpItems = this.items.slice();
          this.deletedIndexes = {};
        }
        [$onDecodeEnd]() {
          this.items = this.items.filter((item) => item !== void 0);
          this.tmpItems = this.items.slice();
        }
        toArray() {
          return this.items.slice(0);
        }
        toJSON() {
          return this.toArray().map((value) => {
            return typeof value["toJSON"] === "function"
              ? value["toJSON"]()
              : value;
          });
        }
        //
        // Decoding utilities
        //
        clone(isDecoding) {
          let cloned;
          if (isDecoding) {
            cloned = new _ArraySchema();
            cloned.push(...this.items);
          } else {
            cloned = new _ArraySchema(
              ...this.map((item) => (item[$changes] ? item.clone() : item)),
            );
          }
          return cloned;
        }
      };
      _ArraySchema[_a$4] = encodeArray;
      _ArraySchema[_b$4] = decodeArray;
      let ArraySchema = _ArraySchema;
      registerType("array", { constructor: ArraySchema });
      var _a$3, _b$3;
      const _MapSchema = class _MapSchema {
        /**
         * Determine if a property must be filtered.
         * - If returns false, the property is NOT going to be encoded.
         * - If returns true, the property is going to be encoded.
         *
         * Encoding with "filters" happens in two steps:
         * - First, the encoder iterates over all "not owned" properties and encodes them.
         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
         */
        static [((_a$3 = $encoder), (_b$3 = $decoder), $filter)](
          ref,
          index,
          view2,
        ) {
          return (
            !view2 ||
            typeof ref[$childType] === "string" ||
            view2.isChangeTreeVisible(
              (ref[$getByIndex](index) ?? ref.deletedItems[index])[$changes],
            )
          );
        }
        static is(type2) {
          return type2["map"] !== void 0;
        }
        constructor(initialValues) {
          this.$items = /* @__PURE__ */ new Map();
          this.$indexes = /* @__PURE__ */ new Map();
          this.deletedItems = {};
          const changeTree = new ChangeTree(this);
          changeTree.indexes = {};
          Object.defineProperty(this, $changes, {
            value: changeTree,
            enumerable: false,
            writable: true,
          });
          if (initialValues) {
            if (
              initialValues instanceof Map ||
              initialValues instanceof _MapSchema
            ) {
              initialValues.forEach((v, k) => this.set(k, v));
            } else {
              for (const k in initialValues) {
                this.set(k, initialValues[k]);
              }
            }
          }
          Object.defineProperty(this, $childType, {
            value: void 0,
            enumerable: false,
            writable: true,
            configurable: true,
          });
        }
        /** Iterator */
        [Symbol.iterator]() {
          return this.$items[Symbol.iterator]();
        }
        get [Symbol.toStringTag]() {
          return this.$items[Symbol.toStringTag];
        }
        static get [Symbol.species]() {
          return _MapSchema;
        }
        set(key, value) {
          if (value === void 0 || value === null) {
            throw new Error(
              `MapSchema#set('${key}', ${value}): trying to set ${value} value on '${key}'.`,
            );
          } else if (typeof value === "object" && this[$childType]) {
            assertInstanceType(value, this[$childType], this, key);
          }
          key = key.toString();
          const changeTree = this[$changes];
          const isRef = value[$changes] !== void 0;
          let index;
          let operation;
          if (typeof changeTree.indexes[key] !== "undefined") {
            index = changeTree.indexes[key];
            operation = exports2.OPERATION.REPLACE;
            const previousValue = this.$items.get(key);
            if (previousValue === value) {
              return;
            } else if (isRef) {
              operation = exports2.OPERATION.DELETE_AND_ADD;
              if (previousValue !== void 0) {
                previousValue[$changes].root?.remove(previousValue[$changes]);
              }
            }
            if (this.deletedItems[index]) {
              delete this.deletedItems[index];
            }
          } else {
            index = changeTree.indexes[$numFields] ?? 0;
            operation = exports2.OPERATION.ADD;
            this.$indexes.set(index, key);
            changeTree.indexes[key] = index;
            changeTree.indexes[$numFields] = index + 1;
          }
          this.$items.set(key, value);
          changeTree.change(index, operation);
          if (isRef) {
            value[$changes].setParent(this, changeTree.root, index);
          }
          return this;
        }
        get(key) {
          return this.$items.get(key);
        }
        delete(key) {
          if (!this.$items.has(key)) {
            return false;
          }
          const index = this[$changes].indexes[key];
          this.deletedItems[index] = this[$changes].delete(index);
          return this.$items.delete(key);
        }
        clear() {
          const changeTree = this[$changes];
          changeTree.discard(true);
          changeTree.indexes = {};
          changeTree.forEachChild((childChangeTree, _) => {
            changeTree.root?.remove(childChangeTree);
          });
          this.$indexes.clear();
          this.$items.clear();
          changeTree.operation(exports2.OPERATION.CLEAR);
        }
        has(key) {
          return this.$items.has(key);
        }
        forEach(callbackfn) {
          this.$items.forEach(callbackfn);
        }
        entries() {
          return this.$items.entries();
        }
        keys() {
          return this.$items.keys();
        }
        values() {
          return this.$items.values();
        }
        get size() {
          return this.$items.size;
        }
        setIndex(index, key) {
          this.$indexes.set(index, key);
        }
        getIndex(index) {
          return this.$indexes.get(index);
        }
        [$getByIndex](index) {
          return this.$items.get(this.$indexes.get(index));
        }
        [$deleteByIndex](index) {
          const key = this.$indexes.get(index);
          this.$items.delete(key);
          this.$indexes.delete(index);
        }
        [$onEncodeEnd]() {
          const changeTree = this[$changes];
          for (const indexStr in this.deletedItems) {
            const index = parseInt(indexStr);
            const key = this.$indexes.get(index);
            delete changeTree.indexes[key];
            this.$indexes.delete(index);
          }
          this.deletedItems = {};
        }
        toJSON() {
          const map = {};
          this.forEach((value, key) => {
            map[key] =
              typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
          });
          return map;
        }
        //
        // Decoding utilities
        //
        // @ts-ignore
        clone(isDecoding) {
          let cloned;
          if (isDecoding) {
            cloned = Object.assign(new _MapSchema(), this);
          } else {
            cloned = new _MapSchema();
            this.forEach((value, key) => {
              if (value[$changes]) {
                cloned.set(key, value["clone"]());
              } else {
                cloned.set(key, value);
              }
            });
          }
          return cloned;
        }
      };
      _MapSchema[_a$3] = encodeKeyValueOperation;
      _MapSchema[_b$3] = decodeKeyValueOperation;
      let MapSchema = _MapSchema;
      registerType("map", { constructor: MapSchema });
      var _a$2, _b$2;
      const _CollectionSchema = class _CollectionSchema {
        /**
         * Determine if a property must be filtered.
         * - If returns false, the property is NOT going to be encoded.
         * - If returns true, the property is going to be encoded.
         *
         * Encoding with "filters" happens in two steps:
         * - First, the encoder iterates over all "not owned" properties and encodes them.
         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
         */
        static [((_a$2 = $encoder), (_b$2 = $decoder), $filter)](
          ref,
          index,
          view2,
        ) {
          return (
            !view2 ||
            typeof ref[$childType] === "string" ||
            view2.isChangeTreeVisible(
              (ref[$getByIndex](index) ?? ref.deletedItems[index])[$changes],
            )
          );
        }
        static is(type2) {
          return type2["collection"] !== void 0;
        }
        constructor(initialValues) {
          this.$items = /* @__PURE__ */ new Map();
          this.$indexes = /* @__PURE__ */ new Map();
          this.deletedItems = {};
          this.$refId = 0;
          this[$changes] = new ChangeTree(this);
          this[$changes].indexes = {};
          if (initialValues) {
            initialValues.forEach((v) => this.add(v));
          }
          Object.defineProperty(this, $childType, {
            value: void 0,
            enumerable: false,
            writable: true,
            configurable: true,
          });
        }
        add(value) {
          const index = this.$refId++;
          const isRef = value[$changes] !== void 0;
          if (isRef) {
            value[$changes].setParent(this, this[$changes].root, index);
          }
          this[$changes].indexes[index] = index;
          this.$indexes.set(index, index);
          this.$items.set(index, value);
          this[$changes].change(index);
          return index;
        }
        at(index) {
          const key = Array.from(this.$items.keys())[index];
          return this.$items.get(key);
        }
        entries() {
          return this.$items.entries();
        }
        delete(item) {
          const entries = this.$items.entries();
          let index;
          let entry;
          while ((entry = entries.next())) {
            if (entry.done) {
              break;
            }
            if (item === entry.value[1]) {
              index = entry.value[0];
              break;
            }
          }
          if (index === void 0) {
            return false;
          }
          this.deletedItems[index] = this[$changes].delete(index);
          this.$indexes.delete(index);
          return this.$items.delete(index);
        }
        clear() {
          const changeTree = this[$changes];
          changeTree.discard(true);
          changeTree.indexes = {};
          changeTree.forEachChild((childChangeTree, _) => {
            changeTree.root?.remove(childChangeTree);
          });
          this.$indexes.clear();
          this.$items.clear();
          changeTree.operation(exports2.OPERATION.CLEAR);
        }
        has(value) {
          return Array.from(this.$items.values()).some((v) => v === value);
        }
        forEach(callbackfn) {
          this.$items.forEach((value, key, _) => callbackfn(value, key, this));
        }
        values() {
          return this.$items.values();
        }
        get size() {
          return this.$items.size;
        }
        /** Iterator */
        [Symbol.iterator]() {
          return this.$items.values();
        }
        setIndex(index, key) {
          this.$indexes.set(index, key);
        }
        getIndex(index) {
          return this.$indexes.get(index);
        }
        [$getByIndex](index) {
          return this.$items.get(this.$indexes.get(index));
        }
        [$deleteByIndex](index) {
          const key = this.$indexes.get(index);
          this.$items.delete(key);
          this.$indexes.delete(index);
        }
        [$onEncodeEnd]() {
          this.deletedItems = {};
        }
        toArray() {
          return Array.from(this.$items.values());
        }
        toJSON() {
          const values = [];
          this.forEach((value, key) => {
            values.push(
              typeof value["toJSON"] === "function" ? value["toJSON"]() : value,
            );
          });
          return values;
        }
        //
        // Decoding utilities
        //
        clone(isDecoding) {
          let cloned;
          if (isDecoding) {
            cloned = Object.assign(new _CollectionSchema(), this);
          } else {
            cloned = new _CollectionSchema();
            this.forEach((value) => {
              if (value[$changes]) {
                cloned.add(value["clone"]());
              } else {
                cloned.add(value);
              }
            });
          }
          return cloned;
        }
      };
      _CollectionSchema[_a$2] = encodeKeyValueOperation;
      _CollectionSchema[_b$2] = decodeKeyValueOperation;
      let CollectionSchema = _CollectionSchema;
      registerType("collection", { constructor: CollectionSchema });
      var _a$1, _b$1;
      const _SetSchema = class _SetSchema {
        /**
         * Determine if a property must be filtered.
         * - If returns false, the property is NOT going to be encoded.
         * - If returns true, the property is going to be encoded.
         *
         * Encoding with "filters" happens in two steps:
         * - First, the encoder iterates over all "not owned" properties and encodes them.
         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
         */
        static [((_a$1 = $encoder), (_b$1 = $decoder), $filter)](
          ref,
          index,
          view2,
        ) {
          return (
            !view2 ||
            typeof ref[$childType] === "string" ||
            view2.visible.has(
              (ref[$getByIndex](index) ?? ref.deletedItems[index])[$changes],
            )
          );
        }
        static is(type2) {
          return type2["set"] !== void 0;
        }
        constructor(initialValues) {
          this.$items = /* @__PURE__ */ new Map();
          this.$indexes = /* @__PURE__ */ new Map();
          this.deletedItems = {};
          this.$refId = 0;
          this[$changes] = new ChangeTree(this);
          this[$changes].indexes = {};
          if (initialValues) {
            initialValues.forEach((v) => this.add(v));
          }
          Object.defineProperty(this, $childType, {
            value: void 0,
            enumerable: false,
            writable: true,
            configurable: true,
          });
        }
        add(value) {
          if (this.has(value)) {
            return false;
          }
          const index = this.$refId++;
          if (value[$changes] !== void 0) {
            value[$changes].setParent(this, this[$changes].root, index);
          }
          const operation =
            this[$changes].indexes[index]?.op ?? exports2.OPERATION.ADD;
          this[$changes].indexes[index] = index;
          this.$indexes.set(index, index);
          this.$items.set(index, value);
          this[$changes].change(index, operation);
          return index;
        }
        entries() {
          return this.$items.entries();
        }
        delete(item) {
          const entries = this.$items.entries();
          let index;
          let entry;
          while ((entry = entries.next())) {
            if (entry.done) {
              break;
            }
            if (item === entry.value[1]) {
              index = entry.value[0];
              break;
            }
          }
          if (index === void 0) {
            return false;
          }
          this.deletedItems[index] = this[$changes].delete(index);
          this.$indexes.delete(index);
          return this.$items.delete(index);
        }
        clear() {
          const changeTree = this[$changes];
          changeTree.discard(true);
          changeTree.indexes = {};
          this.$indexes.clear();
          this.$items.clear();
          changeTree.operation(exports2.OPERATION.CLEAR);
        }
        has(value) {
          const values = this.$items.values();
          let has = false;
          let entry;
          while ((entry = values.next())) {
            if (entry.done) {
              break;
            }
            if (value === entry.value) {
              has = true;
              break;
            }
          }
          return has;
        }
        forEach(callbackfn) {
          this.$items.forEach((value, key, _) => callbackfn(value, key, this));
        }
        values() {
          return this.$items.values();
        }
        get size() {
          return this.$items.size;
        }
        /** Iterator */
        [Symbol.iterator]() {
          return this.$items.values();
        }
        setIndex(index, key) {
          this.$indexes.set(index, key);
        }
        getIndex(index) {
          return this.$indexes.get(index);
        }
        [$getByIndex](index) {
          return this.$items.get(this.$indexes.get(index));
        }
        [$deleteByIndex](index) {
          const key = this.$indexes.get(index);
          this.$items.delete(key);
          this.$indexes.delete(index);
        }
        [$onEncodeEnd]() {
          this.deletedItems = {};
        }
        toArray() {
          return Array.from(this.$items.values());
        }
        toJSON() {
          const values = [];
          this.forEach((value, key) => {
            values.push(
              typeof value["toJSON"] === "function" ? value["toJSON"]() : value,
            );
          });
          return values;
        }
        //
        // Decoding utilities
        //
        clone(isDecoding) {
          let cloned;
          if (isDecoding) {
            cloned = Object.assign(new _SetSchema(), this);
          } else {
            cloned = new _SetSchema();
            this.forEach((value) => {
              if (value[$changes]) {
                cloned.add(value["clone"]());
              } else {
                cloned.add(value);
              }
            });
          }
          return cloned;
        }
      };
      _SetSchema[_a$1] = encodeKeyValueOperation;
      _SetSchema[_b$1] = decodeKeyValueOperation;
      let SetSchema = _SetSchema;
      registerType("set", { constructor: SetSchema });
      const DEFAULT_VIEW_TAG = -1;
      function entity(constructor) {
        TypeContext.register(constructor);
        return constructor;
      }
      function view(tag = DEFAULT_VIEW_TAG) {
        return function (target2, fieldName) {
          const constructor = target2.constructor;
          const parentClass = Object.getPrototypeOf(constructor);
          const parentMetadata = parentClass[Symbol.metadata];
          const metadata = (constructor[Symbol.metadata] ??= Object.assign(
            {},
            constructor[Symbol.metadata],
            parentMetadata ?? /* @__PURE__ */ Object.create(null),
          ));
          Metadata.setTag(metadata, fieldName, tag);
        };
      }
      function type(type2, options) {
        return function (target2, field) {
          const constructor = target2.constructor;
          if (!type2) {
            throw new Error(
              `${constructor.name}: @type() reference provided for "${field}" is undefined. Make sure you don't have any circular dependencies.`,
            );
          }
          type2 = getNormalizedType(type2);
          TypeContext.register(constructor);
          const parentClass = Object.getPrototypeOf(constructor);
          const parentMetadata = parentClass[Symbol.metadata];
          const metadata = Metadata.initialize(constructor);
          let fieldIndex = metadata[field];
          if (metadata[fieldIndex] !== void 0) {
            if (metadata[fieldIndex].deprecated) {
              return;
            } else if (metadata[fieldIndex].type !== void 0) {
              try {
                throw new Error(`@colyseus/schema: Duplicate '${field}' definition on '${constructor.name}'.
Check @type() annotation`);
              } catch (e) {
                const definitionAtLine = e.stack.split("\n")[4].trim();
                throw new Error(`${e.message} ${definitionAtLine}`);
              }
            }
          } else {
            fieldIndex =
              metadata[$numFields] ??
              (parentMetadata && parentMetadata[$numFields]) ??
              -1;
            fieldIndex++;
          }
          if (options && options.manual) {
            Metadata.addField(metadata, fieldIndex, field, type2, {
              // do not declare getter/setter descriptor
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            const complexTypeKlass =
              typeof Object.keys(type2)[0] === "string" &&
              getType(Object.keys(type2)[0]);
            const childType = complexTypeKlass
              ? Object.values(type2)[0]
              : type2;
            Metadata.addField(
              metadata,
              fieldIndex,
              field,
              type2,
              getPropertyDescriptor(
                `_${field}`,
                fieldIndex,
                childType,
                complexTypeKlass,
              ),
            );
          }
        };
      }
      function getPropertyDescriptor(
        fieldCached,
        fieldIndex,
        type2,
        complexTypeKlass,
      ) {
        return {
          get: function () {
            return this[fieldCached];
          },
          set: function (value) {
            const previousValue = this[fieldCached] ?? void 0;
            if (value === previousValue) {
              return;
            }
            if (value !== void 0 && value !== null) {
              if (complexTypeKlass) {
                if (
                  complexTypeKlass.constructor === ArraySchema &&
                  !(value instanceof ArraySchema)
                ) {
                  value = new ArraySchema(...value);
                }
                if (
                  complexTypeKlass.constructor === MapSchema &&
                  !(value instanceof MapSchema)
                ) {
                  value = new MapSchema(value);
                }
                value[$childType] = type2;
              } else if (typeof type2 !== "string") {
                assertInstanceType(
                  value,
                  type2,
                  this,
                  fieldCached.substring(1),
                );
              } else {
                assertType(value, type2, this, fieldCached.substring(1));
              }
              const changeTree = this[$changes];
              if (previousValue !== void 0 && previousValue[$changes]) {
                changeTree.root?.remove(previousValue[$changes]);
                this.constructor[$track](
                  changeTree,
                  fieldIndex,
                  exports2.OPERATION.DELETE_AND_ADD,
                );
              } else {
                this.constructor[$track](
                  changeTree,
                  fieldIndex,
                  exports2.OPERATION.ADD,
                );
              }
              value[$changes]?.setParent(this, changeTree.root, fieldIndex);
            } else if (previousValue !== void 0) {
              this[$changes].delete(fieldIndex);
            }
            this[fieldCached] = value;
          },
          enumerable: true,
          configurable: true,
        };
      }
      function deprecated(throws = true) {
        return function (klass, field) {
          const constructor = klass.constructor;
          const parentClass = Object.getPrototypeOf(constructor);
          const parentMetadata = parentClass[Symbol.metadata];
          const metadata = (constructor[Symbol.metadata] ??= Object.assign(
            {},
            constructor[Symbol.metadata],
            parentMetadata ?? /* @__PURE__ */ Object.create(null),
          ));
          const fieldIndex = metadata[field];
          metadata[fieldIndex].deprecated = true;
          if (throws) {
            metadata[$descriptors] ??= {};
            metadata[$descriptors][field] = {
              get: function () {
                throw new Error(`${field} is deprecated.`);
              },
              set: function (value) {},
              enumerable: false,
              configurable: true,
            };
          }
          Object.defineProperty(metadata, fieldIndex, {
            value: metadata[fieldIndex],
            enumerable: false,
            configurable: true,
          });
        };
      }
      function defineTypes(target2, fields, options) {
        for (let field in fields) {
          type(fields[field], options)(target2.prototype, field);
        }
        return target2;
      }
      function schema(fieldsAndMethods, name, inherits = Schema) {
        const fields = {};
        const methods = {};
        const defaultValues = {};
        const viewTagFields = {};
        for (let fieldName in fieldsAndMethods) {
          const value = fieldsAndMethods[fieldName];
          if (typeof value === "object") {
            if (value["view"] !== void 0) {
              viewTagFields[fieldName] =
                typeof value["view"] === "boolean"
                  ? DEFAULT_VIEW_TAG
                  : value["view"];
            }
            fields[fieldName] = getNormalizedType(value);
            if (!Object.prototype.hasOwnProperty.call(value, "default")) {
              if (Array.isArray(value) || value["array"] !== void 0) {
                defaultValues[fieldName] = new ArraySchema();
              } else if (value["map"] !== void 0) {
                defaultValues[fieldName] = new MapSchema();
              } else if (value["collection"] !== void 0) {
                defaultValues[fieldName] = new CollectionSchema();
              } else if (value["set"] !== void 0) {
                defaultValues[fieldName] = new SetSchema();
              } else if (value["type"] !== void 0 && Schema.is(value["type"])) {
                defaultValues[fieldName] = new value["type"]();
              }
            } else {
              defaultValues[fieldName] = value["default"];
            }
          } else if (typeof value === "function") {
            if (Schema.is(value)) {
              defaultValues[fieldName] = new value();
              fields[fieldName] = getNormalizedType(value);
            } else {
              methods[fieldName] = value;
            }
          } else {
            fields[fieldName] = getNormalizedType(value);
          }
        }
        const getDefaultValues = () => {
          const defaults = {};
          for (const fieldName in defaultValues) {
            const defaultValue = defaultValues[fieldName];
            if (defaultValue && typeof defaultValue.clone === "function") {
              defaults[fieldName] = defaultValue.clone();
            } else {
              defaults[fieldName] = defaultValue;
            }
          }
          return defaults;
        };
        const klass = Metadata.setFields(
          class extends inherits {
            constructor(...args) {
              super(Object.assign({}, getDefaultValues(), args[0] || {}));
              if (
                methods.initialize &&
                typeof methods.initialize === "function"
              ) {
                methods.initialize.apply(this, args);
              }
            }
          },
          fields,
        );
        klass._getDefaultValues = getDefaultValues;
        Object.assign(klass.prototype, methods);
        for (let fieldName in viewTagFields) {
          view(viewTagFields[fieldName])(klass.prototype, fieldName);
        }
        if (name) {
          Object.defineProperty(klass, "name", { value: name });
        }
        klass.extends = (fields2, name2) => schema(fields2, name2, klass);
        return klass;
      }
      function getIndent(level) {
        return new Array(level)
          .fill(0)
          .map((_, i) => (i === level - 1 ? `└─ ` : `   `))
          .join("");
      }
      function dumpChanges(schema2) {
        const $root = schema2[$changes].root;
        const dump = {
          ops: {},
          refs: [],
        };
        let current = $root.changes.next;
        while (current) {
          const changeTree = current.changeTree;
          if (changeTree === void 0) {
            current = current.next;
            continue;
          }
          const changes = changeTree.indexedOperations;
          dump.refs.push(`refId#${changeTree.refId}`);
          for (const index in changes) {
            const op = changes[index];
            const opName = exports2.OPERATION[op];
            if (!dump.ops[opName]) {
              dump.ops[opName] = 0;
            }
            dump.ops[exports2.OPERATION[op]]++;
          }
          current = current.next;
        }
        return dump;
      }
      var _a, _b;
      const _Schema = class _Schema {
        /**
         * Assign the property descriptors required to track changes on this instance.
         * @param instance
         */
        static initialize(instance) {
          Object.defineProperty(instance, $changes, {
            value: new ChangeTree(instance),
            enumerable: false,
            writable: true,
          });
          Object.defineProperties(
            instance,
            instance.constructor[Symbol.metadata]?.[$descriptors] || {},
          );
        }
        static is(type2) {
          return typeof type2[Symbol.metadata] === "object";
        }
        /**
         * Track property changes
         */
        static [((_a = $encoder), (_b = $decoder), $track)](
          changeTree,
          index,
          operation = exports2.OPERATION.ADD,
        ) {
          changeTree.change(index, operation);
        }
        /**
         * Determine if a property must be filtered.
         * - If returns false, the property is NOT going to be encoded.
         * - If returns true, the property is going to be encoded.
         *
         * Encoding with "filters" happens in two steps:
         * - First, the encoder iterates over all "not owned" properties and encodes them.
         * - Then, the encoder iterates over all "owned" properties per instance and encodes them.
         */
        static [$filter](ref, index, view2) {
          const metadata = ref.constructor[Symbol.metadata];
          const tag = metadata[index]?.tag;
          if (view2 === void 0) {
            return tag === void 0;
          } else if (tag === void 0) {
            return true;
          } else if (tag === DEFAULT_VIEW_TAG) {
            return view2.isChangeTreeVisible(ref[$changes]);
          } else {
            const tags = view2.tags?.get(ref[$changes]);
            return tags && tags.has(tag);
          }
        }
        // allow inherited classes to have a constructor
        constructor(arg) {
          _Schema.initialize(this);
          if (arg) {
            Object.assign(this, arg);
          }
        }
        assign(props) {
          Object.assign(this, props);
          return this;
        }
        /**
         * (Server-side): Flag a property to be encoded for the next patch.
         * @param instance Schema instance
         * @param property string representing the property name, or number representing the index of the property.
         * @param operation OPERATION to perform (detected automatically)
         */
        setDirty(property, operation) {
          const metadata = this.constructor[Symbol.metadata];
          this[$changes].change(metadata[metadata[property]].index, operation);
        }
        clone() {
          const cloned = Object.create(this.constructor.prototype);
          _Schema.initialize(cloned);
          const metadata = this.constructor[Symbol.metadata];
          for (const fieldIndex in metadata) {
            const field = metadata[fieldIndex].name;
            if (
              typeof this[field] === "object" &&
              typeof this[field]?.clone === "function"
            ) {
              cloned[field] = this[field].clone();
            } else {
              cloned[field] = this[field];
            }
          }
          return cloned;
        }
        toJSON() {
          const obj = {};
          const metadata = this.constructor[Symbol.metadata];
          for (const index in metadata) {
            const field = metadata[index];
            const fieldName = field.name;
            if (
              !field.deprecated &&
              this[fieldName] !== null &&
              typeof this[fieldName] !== "undefined"
            ) {
              obj[fieldName] =
                typeof this[fieldName]["toJSON"] === "function"
                  ? this[fieldName]["toJSON"]()
                  : this[fieldName];
            }
          }
          return obj;
        }
        /**
         * Used in tests only
         * @internal
         */
        discardAllChanges() {
          this[$changes].discardAll();
        }
        [$getByIndex](index) {
          const metadata = this.constructor[Symbol.metadata];
          return this[metadata[index].name];
        }
        [$deleteByIndex](index) {
          const metadata = this.constructor[Symbol.metadata];
          this[metadata[index].name] = void 0;
        }
        /**
         * Inspect the `refId` of all Schema instances in the tree. Optionally display the contents of the instance.
         *
         * @param ref Schema instance
         * @param showContents display JSON contents of the instance
         * @returns
         */
        static debugRefIds(
          ref,
          showContents = false,
          level = 0,
          decoder2,
          keyPrefix = "",
        ) {
          const contents = showContents
            ? ` - ${JSON.stringify(ref.toJSON())}`
            : "";
          const changeTree = ref[$changes];
          const refId = decoder2
            ? decoder2.root.refIds.get(ref)
            : changeTree.refId;
          const root = decoder2 ? decoder2.root : changeTree.root;
          const refCount =
            root?.refCount?.[refId] > 1 ? ` [×${root.refCount[refId]}]` : "";
          let output = `${getIndent(level)}${keyPrefix}${ref.constructor.name} (refId: ${refId})${refCount}${contents}
`;
          changeTree.forEachChild((childChangeTree, indexOrKey) => {
            let key = indexOrKey;
            if (typeof indexOrKey === "number" && ref["$indexes"]) {
              key = ref["$indexes"].get(indexOrKey) ?? indexOrKey;
            }
            const keyPrefix2 =
              ref["forEach"] !== void 0 && key !== void 0 ? `["${key}"]: ` : "";
            output += this.debugRefIds(
              childChangeTree.ref,
              showContents,
              level + 1,
              decoder2,
              keyPrefix2,
            );
          });
          return output;
        }
        static debugRefIdEncodingOrder(ref, changeSet = "allChanges") {
          let encodeOrder = [];
          let current = ref[$changes].root[changeSet].next;
          while (current) {
            if (current.changeTree) {
              encodeOrder.push(current.changeTree.refId);
            }
            current = current.next;
          }
          return encodeOrder;
        }
        static debugRefIdsFromDecoder(decoder2) {
          return this.debugRefIds(decoder2.state, false, 0, decoder2);
        }
        /**
         * Return a string representation of the changes on a Schema instance.
         * The list of changes is cleared after each encode.
         *
         * @param instance Schema instance
         * @param isEncodeAll Return "full encode" instead of current change set.
         * @returns
         */
        static debugChanges(instance, isEncodeAll = false) {
          const changeTree = instance[$changes];
          const changeSet = isEncodeAll
            ? changeTree.allChanges
            : changeTree.changes;
          const changeSetName = isEncodeAll ? "allChanges" : "changes";
          let output = `${instance.constructor.name} (${changeTree.refId}) -> .${changeSetName}:
`;
          function dumpChangeSet(changeSet2) {
            changeSet2.operations
              .filter((op) => op)
              .forEach((index) => {
                const operation = changeTree.indexedOperations[index];
                output += `- [${index}]: ${exports2.OPERATION[operation]} (${JSON.stringify(changeTree.getValue(Number(index), isEncodeAll))})
`;
              });
          }
          dumpChangeSet(changeSet);
          if (
            !isEncodeAll &&
            changeTree.filteredChanges &&
            changeTree.filteredChanges.operations.filter((op) => op).length > 0
          ) {
            output += `${instance.constructor.name} (${changeTree.refId}) -> .filteredChanges:
`;
            dumpChangeSet(changeTree.filteredChanges);
          }
          if (
            isEncodeAll &&
            changeTree.allFilteredChanges &&
            changeTree.allFilteredChanges.operations.filter((op) => op).length >
              0
          ) {
            output += `${instance.constructor.name} (${changeTree.refId}) -> .allFilteredChanges:
`;
            dumpChangeSet(changeTree.allFilteredChanges);
          }
          return output;
        }
        static debugChangesDeep(ref, changeSetName = "changes") {
          let output = "";
          const rootChangeTree = ref[$changes];
          const root = rootChangeTree.root;
          const changeTrees = /* @__PURE__ */ new Map();
          const instanceRefIds = [];
          let totalOperations = 0;
          for (const [refId, changes] of Object.entries(root[changeSetName])) {
            const changeTree = root.changeTrees[refId];
            if (!changeTree) {
              continue;
            }
            let includeChangeTree = false;
            let parentChangeTrees = [];
            let parentChangeTree = changeTree.parent?.[$changes];
            if (changeTree === rootChangeTree) {
              includeChangeTree = true;
            } else {
              while (parentChangeTree !== void 0) {
                parentChangeTrees.push(parentChangeTree);
                if (parentChangeTree.ref === ref) {
                  includeChangeTree = true;
                  break;
                }
                parentChangeTree = parentChangeTree.parent?.[$changes];
              }
            }
            if (includeChangeTree) {
              instanceRefIds.push(changeTree.refId);
              totalOperations += Object.keys(changes).length;
              changeTrees.set(changeTree, parentChangeTrees.reverse());
            }
          }
          output += "---\n";
          output += `root refId: ${rootChangeTree.refId}
`;
          output += `Total instances: ${instanceRefIds.length} (refIds: ${instanceRefIds.join(", ")})
`;
          output += `Total changes: ${totalOperations}
`;
          output += "---\n";
          const visitedParents = /* @__PURE__ */ new WeakSet();
          for (const [changeTree, parentChangeTrees] of changeTrees.entries()) {
            parentChangeTrees.forEach((parentChangeTree, level2) => {
              if (!visitedParents.has(parentChangeTree)) {
                output += `${getIndent(level2)}${parentChangeTree.ref.constructor.name} (refId: ${parentChangeTree.refId})
`;
                visitedParents.add(parentChangeTree);
              }
            });
            const changes = changeTree.indexedOperations;
            const level = parentChangeTrees.length;
            const indent = getIndent(level);
            const parentIndex = level > 0 ? `(${changeTree.parentIndex}) ` : "";
            output += `${indent}${parentIndex}${changeTree.ref.constructor.name} (refId: ${changeTree.refId}) - changes: ${Object.keys(changes).length}
`;
            for (const index in changes) {
              const operation = changes[index];
              output += `${getIndent(level + 1)}${exports2.OPERATION[operation]}: ${index}
`;
            }
          }
          return `${output}`;
        }
      };
      _Schema[_a] = encodeSchemaOperation;
      _Schema[_b] = decodeSchemaOperation;
      let Schema = _Schema;
      function __decorate2(decorators, target2, key, desc) {
        var c = arguments.length,
          r =
            c < 3
              ? target2
              : desc === null
                ? (desc = Object.getOwnPropertyDescriptor(target2, key))
                : desc,
          d;
        if (
          typeof Reflect === "object" &&
          typeof Reflect.decorate === "function"
        )
          r = Reflect.decorate(decorators, target2, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if ((d = decorators[i]))
              r =
                (c < 3 ? d(r) : c > 3 ? d(target2, key, r) : d(target2, key)) ||
                r;
        return (c > 3 && r && Object.defineProperty(target2, key, r), r);
      }
      typeof SuppressedError === "function"
        ? SuppressedError
        : function (error, suppressed, message) {
            var e = new Error(message);
            return (
              (e.name = "SuppressedError"),
              (e.error = error),
              (e.suppressed = suppressed),
              e
            );
          };
      class Root {
        constructor(types) {
          this.types = types;
          this.nextUniqueId = 0;
          this.refCount = {};
          this.changeTrees = {};
          this.allChanges = createChangeTreeList();
          this.allFilteredChanges = createChangeTreeList();
          this.changes = createChangeTreeList();
          this.filteredChanges = createChangeTreeList();
        }
        getNextUniqueId() {
          return this.nextUniqueId++;
        }
        add(changeTree) {
          if (changeTree.refId === void 0) {
            changeTree.refId = this.getNextUniqueId();
          }
          const isNewChangeTree = this.changeTrees[changeTree.refId] === void 0;
          if (isNewChangeTree) {
            this.changeTrees[changeTree.refId] = changeTree;
          }
          const previousRefCount = this.refCount[changeTree.refId];
          if (previousRefCount === 0) {
            const ops = changeTree.allChanges.operations;
            let len = ops.length;
            while (len--) {
              changeTree.indexedOperations[ops[len]] = exports2.OPERATION.ADD;
              setOperationAtIndex(changeTree.changes, len);
            }
          }
          this.refCount[changeTree.refId] = (previousRefCount || 0) + 1;
          return isNewChangeTree;
        }
        remove(changeTree) {
          const refCount = this.refCount[changeTree.refId] - 1;
          if (refCount <= 0) {
            changeTree.root = void 0;
            delete this.changeTrees[changeTree.refId];
            this.removeChangeFromChangeSet("allChanges", changeTree);
            this.removeChangeFromChangeSet("changes", changeTree);
            if (changeTree.filteredChanges) {
              this.removeChangeFromChangeSet("allFilteredChanges", changeTree);
              this.removeChangeFromChangeSet("filteredChanges", changeTree);
            }
            this.refCount[changeTree.refId] = 0;
            changeTree.forEachChild((child, _) => {
              if (child.removeParent(changeTree.ref)) {
                if (
                  child.parentChain === void 0 || // no parent, remove it
                  (child.parentChain && this.refCount[child.refId] > 0)
                ) {
                  this.remove(child);
                } else if (child.parentChain) {
                  this.moveNextToParent(child);
                }
              }
            });
          } else {
            this.refCount[changeTree.refId] = refCount;
            this.recursivelyMoveNextToParent(changeTree);
          }
          return refCount;
        }
        recursivelyMoveNextToParent(changeTree) {
          this.moveNextToParent(changeTree);
          changeTree.forEachChild((child, _) =>
            this.recursivelyMoveNextToParent(child),
          );
        }
        moveNextToParent(changeTree) {
          if (changeTree.filteredChanges) {
            this.moveNextToParentInChangeTreeList(
              "filteredChanges",
              changeTree,
            );
            this.moveNextToParentInChangeTreeList(
              "allFilteredChanges",
              changeTree,
            );
          } else {
            this.moveNextToParentInChangeTreeList("changes", changeTree);
            this.moveNextToParentInChangeTreeList("allChanges", changeTree);
          }
        }
        moveNextToParentInChangeTreeList(changeSetName, changeTree) {
          const changeSet = this[changeSetName];
          const node = changeTree[changeSetName].queueRootNode;
          if (!node) return;
          const parent = changeTree.parent;
          if (!parent || !parent[$changes]) return;
          const parentNode = parent[$changes][changeSetName]?.queueRootNode;
          if (!parentNode || parentNode === node) return;
          const parentPosition = parentNode.position;
          const childPosition = node.position;
          if (childPosition > parentPosition) return;
          if (node.prev) {
            node.prev.next = node.next;
          } else {
            changeSet.next = node.next;
          }
          if (node.next) {
            node.next.prev = node.prev;
          } else {
            changeSet.tail = node.prev;
          }
          node.prev = parentNode;
          node.next = parentNode.next;
          if (parentNode.next) {
            parentNode.next.prev = node;
          } else {
            changeSet.tail = node;
          }
          parentNode.next = node;
          this.updatePositionsAfterMove(changeSet, node, parentPosition + 1);
        }
        enqueueChangeTree(
          changeTree,
          changeSet,
          queueRootNode = changeTree[changeSet].queueRootNode,
        ) {
          if (queueRootNode) {
            return;
          }
          changeTree[changeSet].queueRootNode = this.addToChangeTreeList(
            this[changeSet],
            changeTree,
          );
        }
        addToChangeTreeList(list, changeTree) {
          const node = {
            changeTree,
            next: void 0,
            prev: void 0,
            position: list.tail ? list.tail.position + 1 : 0,
          };
          if (!list.next) {
            list.next = node;
            list.tail = node;
          } else {
            node.prev = list.tail;
            list.tail.next = node;
            list.tail = node;
          }
          return node;
        }
        updatePositionsAfterRemoval(list, removedPosition) {
          let current = list.next;
          let position3 = 0;
          while (current) {
            if (position3 >= removedPosition) {
              current.position = position3;
            }
            current = current.next;
            position3++;
          }
        }
        updatePositionsAfterMove(list, node, newPosition) {
          let current = list.next;
          let position3 = 0;
          while (current) {
            current.position = position3;
            current = current.next;
            position3++;
          }
        }
        removeChangeFromChangeSet(changeSetName, changeTree) {
          const changeSet = this[changeSetName];
          const node = changeTree[changeSetName].queueRootNode;
          if (node && node.changeTree === changeTree) {
            const removedPosition = node.position;
            if (node.prev) {
              node.prev.next = node.next;
            } else {
              changeSet.next = node.next;
            }
            if (node.next) {
              node.next.prev = node.prev;
            } else {
              changeSet.tail = node.prev;
            }
            this.updatePositionsAfterRemoval(changeSet, removedPosition);
            changeTree[changeSetName].queueRootNode = void 0;
            return true;
          }
          return false;
        }
      }
      const _Encoder = class _Encoder {
        // 8KB
        constructor(state) {
          this.sharedBuffer = Buffer.allocUnsafe(_Encoder.BUFFER_SIZE);
          this.context = TypeContext.cache(state.constructor);
          this.root = new Root(this.context);
          this.setState(state);
        }
        setState(state) {
          this.state = state;
          this.state[$changes].setRoot(this.root);
        }
        encode(
          it = { offset: 0 },
          view2,
          buffer = this.sharedBuffer,
          changeSetName = "changes",
          isEncodeAll = changeSetName === "allChanges",
          initialOffset = it.offset,
        ) {
          const hasView = view2 !== void 0;
          const rootChangeTree = this.state[$changes];
          let current = this.root[changeSetName];
          while ((current = current.next)) {
            const changeTree = current.changeTree;
            if (hasView) {
              if (!view2.isChangeTreeVisible(changeTree)) {
                view2.invisible.add(changeTree);
                continue;
              }
              view2.invisible.delete(changeTree);
            }
            const changeSet = changeTree[changeSetName];
            const ref = changeTree.ref;
            const numChanges = changeSet.operations.length;
            if (numChanges === 0) {
              continue;
            }
            const ctor = ref.constructor;
            const encoder = ctor[$encoder];
            const filter = ctor[$filter];
            const metadata = ctor[Symbol.metadata];
            if (
              hasView ||
              it.offset > initialOffset ||
              changeTree !== rootChangeTree
            ) {
              buffer[it.offset++] = SWITCH_TO_STRUCTURE & 255;
              encode2.number(buffer, changeTree.refId, it);
            }
            for (let j = 0; j < numChanges; j++) {
              const fieldIndex = changeSet.operations[j];
              if (fieldIndex < 0) {
                buffer[it.offset++] = Math.abs(fieldIndex) & 255;
                continue;
              }
              const operation = isEncodeAll
                ? exports2.OPERATION.ADD
                : changeTree.indexedOperations[fieldIndex];
              if (
                fieldIndex === void 0 ||
                operation === void 0 ||
                (filter && !filter(ref, fieldIndex, view2))
              ) {
                continue;
              }
              encoder(
                this,
                buffer,
                changeTree,
                fieldIndex,
                operation,
                it,
                isEncodeAll,
                hasView,
                metadata,
              );
            }
          }
          if (it.offset > buffer.byteLength) {
            const newSize =
              Math.ceil(it.offset / (Buffer.poolSize ?? 8 * 1024)) *
              (Buffer.poolSize ?? 8 * 1024);
            console.warn(`@colyseus/schema buffer overflow. Encoded state is higher than default BUFFER_SIZE. Use the following to increase default BUFFER_SIZE:

    import { Encoder } from "@colyseus/schema";
    Encoder.BUFFER_SIZE = ${Math.round(newSize / 1024)} * 1024; // ${Math.round(newSize / 1024)} KB
`);
            buffer = Buffer.alloc(newSize, buffer);
            if (buffer === this.sharedBuffer) {
              this.sharedBuffer = buffer;
            }
            return this.encode(
              { offset: initialOffset },
              view2,
              buffer,
              changeSetName,
              isEncodeAll,
            );
          } else {
            return buffer.subarray(0, it.offset);
          }
        }
        encodeAll(it = { offset: 0 }, buffer = this.sharedBuffer) {
          return this.encode(it, void 0, buffer, "allChanges", true);
        }
        encodeAllView(view2, sharedOffset, it, bytes = this.sharedBuffer) {
          const viewOffset = it.offset;
          this.encode(it, view2, bytes, "allFilteredChanges", true, viewOffset);
          return Buffer.concat([
            bytes.subarray(0, sharedOffset),
            bytes.subarray(viewOffset, it.offset),
          ]);
        }
        encodeView(view2, sharedOffset, it, bytes = this.sharedBuffer) {
          const viewOffset = it.offset;
          for (const [refId, changes] of view2.changes) {
            const changeTree = this.root.changeTrees[refId];
            if (changeTree === void 0) {
              view2.changes.delete(refId);
              continue;
            }
            const keys = Object.keys(changes);
            if (keys.length === 0) {
              continue;
            }
            const ref = changeTree.ref;
            const ctor = ref.constructor;
            const encoder = ctor[$encoder];
            const metadata = ctor[Symbol.metadata];
            bytes[it.offset++] = SWITCH_TO_STRUCTURE & 255;
            encode2.number(bytes, changeTree.refId, it);
            for (let i = 0, numChanges = keys.length; i < numChanges; i++) {
              const index = Number(keys[i]);
              const value = changeTree.ref[$getByIndex](index);
              const operation =
                (value !== void 0 && changes[index]) ||
                exports2.OPERATION.DELETE;
              encoder(
                this,
                bytes,
                changeTree,
                index,
                operation,
                it,
                false,
                true,
                metadata,
              );
            }
          }
          view2.changes.clear();
          this.encode(it, view2, bytes, "filteredChanges", false, viewOffset);
          return Buffer.concat([
            bytes.subarray(0, sharedOffset),
            bytes.subarray(viewOffset, it.offset),
          ]);
        }
        discardChanges() {
          let current = this.root.changes.next;
          while (current) {
            current.changeTree.endEncode("changes");
            current = current.next;
          }
          this.root.changes = createChangeTreeList();
          current = this.root.filteredChanges.next;
          while (current) {
            current.changeTree.endEncode("filteredChanges");
            current = current.next;
          }
          this.root.filteredChanges = createChangeTreeList();
        }
        tryEncodeTypeId(bytes, baseType, targetType, it) {
          const baseTypeId = this.context.getTypeId(baseType);
          const targetTypeId = this.context.getTypeId(targetType);
          if (targetTypeId === void 0) {
            console.warn(
              `@colyseus/schema WARNING: Class "${targetType.name}" is not registered on TypeRegistry - Please either tag the class with @entity or define a @type() field.`,
            );
            return;
          }
          if (baseTypeId !== targetTypeId) {
            bytes[it.offset++] = TYPE_ID & 255;
            encode2.number(bytes, targetTypeId, it);
          }
        }
        get hasChanges() {
          return (
            this.root.changes.next !== void 0 ||
            this.root.filteredChanges.next !== void 0
          );
        }
      };
      _Encoder.BUFFER_SIZE =
        (typeof Buffer !== "undefined" && Buffer.poolSize) || 8 * 1024;
      let Encoder2 = _Encoder;
      function spliceOne(arr, index) {
        if (index === -1 || index >= arr.length) {
          return false;
        }
        const len = arr.length - 1;
        for (let i = index; i < len; i++) {
          arr[i] = arr[i + 1];
        }
        arr.length = len;
        return true;
      }
      class DecodingWarning extends Error {
        constructor(message) {
          super(message);
          this.name = "DecodingWarning";
        }
      }
      class ReferenceTracker {
        constructor() {
          this.refs = /* @__PURE__ */ new Map();
          this.refIds = /* @__PURE__ */ new WeakMap();
          this.refCount = {};
          this.deletedRefs = /* @__PURE__ */ new Set();
          this.callbacks = {};
          this.nextUniqueId = 0;
        }
        getNextUniqueId() {
          return this.nextUniqueId++;
        }
        // for decoding
        addRef(refId, ref, incrementCount = true) {
          this.refs.set(refId, ref);
          this.refIds.set(ref, refId);
          if (incrementCount) {
            this.refCount[refId] = (this.refCount[refId] || 0) + 1;
          }
          if (this.deletedRefs.has(refId)) {
            this.deletedRefs.delete(refId);
          }
        }
        // for decoding
        removeRef(refId) {
          const refCount = this.refCount[refId];
          if (refCount === void 0) {
            try {
              throw new DecodingWarning(
                "trying to remove refId that doesn't exist: " + refId,
              );
            } catch (e) {
              console.warn(e);
            }
            return;
          }
          if (refCount === 0) {
            try {
              const ref = this.refs.get(refId);
              throw new DecodingWarning(
                `trying to remove refId '${refId}' with 0 refCount (${ref.constructor.name}: ${JSON.stringify(ref)})`,
              );
            } catch (e) {
              console.warn(e);
            }
            return;
          }
          if ((this.refCount[refId] = refCount - 1) <= 0) {
            this.deletedRefs.add(refId);
          }
        }
        clearRefs() {
          this.refs.clear();
          this.deletedRefs.clear();
          this.callbacks = {};
          this.refCount = {};
        }
        // for decoding
        garbageCollectDeletedRefs() {
          this.deletedRefs.forEach((refId) => {
            if (this.refCount[refId] > 0) {
              return;
            }
            const ref = this.refs.get(refId);
            if (ref.constructor[Symbol.metadata] !== void 0) {
              const metadata = ref.constructor[Symbol.metadata];
              for (const index in metadata) {
                const field = metadata[index].name;
                const childRefId =
                  typeof ref[field] === "object" && this.refIds.get(ref[field]);
                if (childRefId && !this.deletedRefs.has(childRefId)) {
                  this.removeRef(childRefId);
                }
              }
            } else {
              if (typeof ref[$childType] === "function") {
                Array.from(ref.values()).forEach((child) => {
                  const childRefId = this.refIds.get(child);
                  if (!this.deletedRefs.has(childRefId)) {
                    this.removeRef(childRefId);
                  }
                });
              }
            }
            this.refs.delete(refId);
            delete this.refCount[refId];
            delete this.callbacks[refId];
          });
          this.deletedRefs.clear();
        }
        addCallback(refId, fieldOrOperation, callback) {
          if (refId === void 0) {
            const name =
              typeof fieldOrOperation === "number"
                ? exports2.OPERATION[fieldOrOperation]
                : fieldOrOperation;
            throw new Error(
              `Can't addCallback on '${name}' (refId is undefined)`,
            );
          }
          if (!this.callbacks[refId]) {
            this.callbacks[refId] = {};
          }
          if (!this.callbacks[refId][fieldOrOperation]) {
            this.callbacks[refId][fieldOrOperation] = [];
          }
          this.callbacks[refId][fieldOrOperation].push(callback);
          return () => this.removeCallback(refId, fieldOrOperation, callback);
        }
        removeCallback(refId, field, callback) {
          const index = this.callbacks?.[refId]?.[field]?.indexOf(callback);
          if (index !== void 0 && index !== -1) {
            spliceOne(this.callbacks[refId][field], index);
          }
        }
      }
      class Decoder2 {
        constructor(root, context) {
          this.currentRefId = 0;
          this.setState(root);
          this.context = context || new TypeContext(root.constructor);
        }
        setState(root) {
          this.state = root;
          this.root = new ReferenceTracker();
          this.root.addRef(0, root);
        }
        decode(bytes, it = { offset: 0 }, ref = this.state) {
          const allChanges = [];
          const $root = this.root;
          const totalBytes = bytes.byteLength;
          let decoder2 = ref["constructor"][$decoder];
          this.currentRefId = 0;
          while (it.offset < totalBytes) {
            if (bytes[it.offset] == SWITCH_TO_STRUCTURE) {
              it.offset++;
              ref[$onDecodeEnd]?.();
              const nextRefId = decode2.number(bytes, it);
              const nextRef = $root.refs.get(nextRefId);
              if (!nextRef) {
                console.error(`"refId" not found: ${nextRefId}`, {
                  previousRef: ref,
                  previousRefId: this.currentRefId,
                });
                console.warn("Please report this issue to the developers.");
                this.skipCurrentStructure(bytes, it, totalBytes);
              } else {
                ref = nextRef;
                decoder2 = ref.constructor[$decoder];
                this.currentRefId = nextRefId;
              }
              continue;
            }
            const result = decoder2(this, bytes, it, ref, allChanges);
            if (result === DEFINITION_MISMATCH) {
              console.warn("@colyseus/schema: definition mismatch");
              this.skipCurrentStructure(bytes, it, totalBytes);
              continue;
            }
          }
          ref[$onDecodeEnd]?.();
          this.triggerChanges?.(allChanges);
          $root.garbageCollectDeletedRefs();
          return allChanges;
        }
        skipCurrentStructure(bytes, it, totalBytes) {
          const nextIterator = { offset: it.offset };
          while (it.offset < totalBytes) {
            if (bytes[it.offset] === SWITCH_TO_STRUCTURE) {
              nextIterator.offset = it.offset + 1;
              if (this.root.refs.has(decode2.number(bytes, nextIterator))) {
                break;
              }
            }
            it.offset++;
          }
        }
        getInstanceType(bytes, it, defaultType) {
          let type2;
          if (bytes[it.offset] === TYPE_ID) {
            it.offset++;
            const type_id = decode2.number(bytes, it);
            type2 = this.context.get(type_id);
          }
          return type2 || defaultType;
        }
        createInstanceOfType(type2) {
          return new type2();
        }
        removeChildRefs(ref, allChanges) {
          const needRemoveRef = typeof ref[$childType] !== "string";
          const refId = this.root.refIds.get(ref);
          ref.forEach((value, key) => {
            allChanges.push({
              ref,
              refId,
              op: exports2.OPERATION.DELETE,
              field: key,
              value: void 0,
              previousValue: value,
            });
            if (needRemoveRef) {
              this.root.removeRef(this.root.refIds.get(value));
            }
          });
        }
      }
      class ReflectionField extends Schema {}
      __decorate2([type("string")], ReflectionField.prototype, "name", void 0);
      __decorate2([type("string")], ReflectionField.prototype, "type", void 0);
      __decorate2(
        [type("number")],
        ReflectionField.prototype,
        "referencedType",
        void 0,
      );
      class ReflectionType extends Schema {
        constructor() {
          super(...arguments);
          this.fields = new ArraySchema();
        }
      }
      __decorate2([type("number")], ReflectionType.prototype, "id", void 0);
      __decorate2(
        [type("number")],
        ReflectionType.prototype,
        "extendsId",
        void 0,
      );
      __decorate2(
        [type([ReflectionField])],
        ReflectionType.prototype,
        "fields",
        void 0,
      );
      class Reflection extends Schema {
        constructor() {
          super(...arguments);
          this.types = new ArraySchema();
        }
        /**
         * Encodes the TypeContext of an Encoder into a buffer.
         *
         * @param encoder Encoder instance
         * @param it
         * @returns
         */
        static encode(encoder, it = { offset: 0 }) {
          const context = encoder.context;
          const reflection = new Reflection();
          const reflectionEncoder = new Encoder2(reflection);
          const rootType = context.schemas.get(encoder.state.constructor);
          if (rootType > 0) {
            reflection.rootType = rootType;
          }
          const includedTypeIds = /* @__PURE__ */ new Set();
          const pendingReflectionTypes = {};
          const addType = (type2) => {
            if (
              type2.extendsId === void 0 ||
              includedTypeIds.has(type2.extendsId)
            ) {
              includedTypeIds.add(type2.id);
              reflection.types.push(type2);
              const deps = pendingReflectionTypes[type2.id];
              if (deps !== void 0) {
                delete pendingReflectionTypes[type2.id];
                deps.forEach((childType) => addType(childType));
              }
            } else {
              if (pendingReflectionTypes[type2.extendsId] === void 0) {
                pendingReflectionTypes[type2.extendsId] = [];
              }
              pendingReflectionTypes[type2.extendsId].push(type2);
            }
          };
          context.schemas.forEach((typeid, klass) => {
            const type2 = new ReflectionType();
            type2.id = Number(typeid);
            const inheritFrom = Object.getPrototypeOf(klass);
            if (inheritFrom !== Schema) {
              type2.extendsId = context.schemas.get(inheritFrom);
            }
            const metadata = klass[Symbol.metadata];
            if (metadata !== inheritFrom[Symbol.metadata]) {
              for (const fieldIndex in metadata) {
                const index = Number(fieldIndex);
                const fieldName = metadata[index].name;
                if (
                  !Object.prototype.hasOwnProperty.call(metadata, fieldName)
                ) {
                  continue;
                }
                const reflectionField = new ReflectionField();
                reflectionField.name = fieldName;
                let fieldType;
                const field = metadata[index];
                if (typeof field.type === "string") {
                  fieldType = field.type;
                } else {
                  let childTypeSchema;
                  if (Schema.is(field.type)) {
                    fieldType = "ref";
                    childTypeSchema = field.type;
                  } else {
                    fieldType = Object.keys(field.type)[0];
                    if (typeof field.type[fieldType] === "string") {
                      fieldType += ":" + field.type[fieldType];
                    } else {
                      childTypeSchema = field.type[fieldType];
                    }
                  }
                  reflectionField.referencedType = childTypeSchema
                    ? context.getTypeId(childTypeSchema)
                    : -1;
                }
                reflectionField.type = fieldType;
                type2.fields.push(reflectionField);
              }
            }
            addType(type2);
          });
          for (const typeid in pendingReflectionTypes) {
            pendingReflectionTypes[typeid].forEach((type2) =>
              reflection.types.push(type2),
            );
          }
          const buf = reflectionEncoder.encodeAll(it);
          return buf.slice(0, it.offset);
        }
        /**
         * Decodes the TypeContext from a buffer into a Decoder instance.
         *
         * @param bytes Reflection.encode() output
         * @param it
         * @returns Decoder instance
         */
        static decode(bytes, it) {
          const reflection = new Reflection();
          const reflectionDecoder = new Decoder2(reflection);
          reflectionDecoder.decode(bytes, it);
          const typeContext = new TypeContext();
          reflection.types.forEach((reflectionType) => {
            const parentClass =
              typeContext.get(reflectionType.extendsId) ?? Schema;
            const schema2 = class _ extends parentClass {};
            TypeContext.register(schema2);
            typeContext.add(schema2, reflectionType.id);
          }, {});
          const addFields = (metadata, reflectionType, parentFieldIndex) => {
            reflectionType.fields.forEach((field, i) => {
              const fieldIndex = parentFieldIndex + i;
              if (field.referencedType !== void 0) {
                let fieldType = field.type;
                let refType = typeContext.get(field.referencedType);
                if (!refType) {
                  const typeInfo = field.type.split(":");
                  fieldType = typeInfo[0];
                  refType = typeInfo[1];
                }
                if (fieldType === "ref") {
                  Metadata.addField(metadata, fieldIndex, field.name, refType);
                } else {
                  Metadata.addField(metadata, fieldIndex, field.name, {
                    [fieldType]: refType,
                  });
                }
              } else {
                Metadata.addField(metadata, fieldIndex, field.name, field.type);
              }
            });
          };
          reflection.types.forEach((reflectionType) => {
            const schema2 = typeContext.get(reflectionType.id);
            const metadata = Metadata.initialize(schema2);
            const inheritedTypes = [];
            let parentType = reflectionType;
            do {
              inheritedTypes.push(parentType);
              parentType = reflection.types.find(
                (t) => t.id === parentType.extendsId,
              );
            } while (parentType);
            let parentFieldIndex = 0;
            inheritedTypes.reverse().forEach((reflectionType2) => {
              addFields(metadata, reflectionType2, parentFieldIndex);
              parentFieldIndex += reflectionType2.fields.length;
            });
          });
          const state = new (typeContext.get(reflection.rootType || 0))();
          return new Decoder2(state, typeContext);
        }
      }
      __decorate2(
        [type([ReflectionType])],
        Reflection.prototype,
        "types",
        void 0,
      );
      __decorate2([type("number")], Reflection.prototype, "rootType", void 0);
      function getDecoderStateCallbacks(decoder2) {
        const $root = decoder2.root;
        const callbacks = $root.callbacks;
        const onAddCalls = /* @__PURE__ */ new WeakMap();
        let currentOnAddCallback;
        decoder2.triggerChanges = function (allChanges) {
          const uniqueRefIds = /* @__PURE__ */ new Set();
          for (let i = 0, l = allChanges.length; i < l; i++) {
            const change = allChanges[i];
            const refId = change.refId;
            const ref = change.ref;
            const $callbacks = callbacks[refId];
            if (!$callbacks) {
              continue;
            }
            if (
              (change.op & exports2.OPERATION.DELETE) ===
                exports2.OPERATION.DELETE &&
              change.previousValue instanceof Schema
            ) {
              const deleteCallbacks =
                callbacks[$root.refIds.get(change.previousValue)]?.[
                  exports2.OPERATION.DELETE
                ];
              for (let i2 = deleteCallbacks?.length - 1; i2 >= 0; i2--) {
                deleteCallbacks[i2]();
              }
            }
            if (ref instanceof Schema) {
              if (!uniqueRefIds.has(refId)) {
                const replaceCallbacks =
                  $callbacks?.[exports2.OPERATION.REPLACE];
                for (let i2 = replaceCallbacks?.length - 1; i2 >= 0; i2--) {
                  replaceCallbacks[i2]();
                }
              }
              if ($callbacks.hasOwnProperty(change.field)) {
                const fieldCallbacks = $callbacks[change.field];
                for (let i2 = fieldCallbacks?.length - 1; i2 >= 0; i2--) {
                  fieldCallbacks[i2](change.value, change.previousValue);
                }
              }
            } else {
              if (
                (change.op & exports2.OPERATION.DELETE) ===
                exports2.OPERATION.DELETE
              ) {
                if (change.previousValue !== void 0) {
                  const deleteCallbacks = $callbacks[exports2.OPERATION.DELETE];
                  for (let i2 = deleteCallbacks?.length - 1; i2 >= 0; i2--) {
                    deleteCallbacks[i2](
                      change.previousValue,
                      change.dynamicIndex ?? change.field,
                    );
                  }
                }
                if (
                  (change.op & exports2.OPERATION.ADD) ===
                  exports2.OPERATION.ADD
                ) {
                  const addCallbacks = $callbacks[exports2.OPERATION.ADD];
                  for (let i2 = addCallbacks?.length - 1; i2 >= 0; i2--) {
                    addCallbacks[i2](
                      change.value,
                      change.dynamicIndex ?? change.field,
                    );
                  }
                }
              } else if (
                (change.op & exports2.OPERATION.ADD) ===
                  exports2.OPERATION.ADD &&
                change.previousValue !== change.value
              ) {
                const addCallbacks = $callbacks[exports2.OPERATION.ADD];
                for (let i2 = addCallbacks?.length - 1; i2 >= 0; i2--) {
                  addCallbacks[i2](
                    change.value,
                    change.dynamicIndex ?? change.field,
                  );
                }
              }
              if (
                change.value !== change.previousValue && // FIXME: see "should not encode item if added and removed at the same patch" test case.
                // some "ADD" + "DELETE" operations on same patch are being encoded as "DELETE"
                (change.value !== void 0 || change.previousValue !== void 0)
              ) {
                const replaceCallbacks = $callbacks[exports2.OPERATION.REPLACE];
                for (let i2 = replaceCallbacks?.length - 1; i2 >= 0; i2--) {
                  replaceCallbacks[i2](
                    change.value,
                    change.dynamicIndex ?? change.field,
                  );
                }
              }
            }
            uniqueRefIds.add(refId);
          }
        };
        function getProxy(metadataOrType, context) {
          let metadata =
            context.instance?.constructor[Symbol.metadata] || metadataOrType;
          let isCollection =
            (context.instance &&
              typeof context.instance["forEach"] === "function") ||
            (metadataOrType &&
              typeof metadataOrType[Symbol.metadata] === "undefined");
          if (metadata && !isCollection) {
            const onAddListen = function (ref, prop, callback, immediate) {
              if (
                immediate &&
                context.instance[prop] !== void 0 &&
                !onAddCalls.has(currentOnAddCallback)
              ) {
                callback(context.instance[prop], void 0);
              }
              return $root.addCallback($root.refIds.get(ref), prop, callback);
            };
            return new Proxy(
              {
                listen: function listen(prop, callback, immediate = true) {
                  if (context.instance) {
                    return onAddListen(
                      context.instance,
                      prop,
                      callback,
                      immediate,
                    );
                  } else {
                    let detachCallback = () => {};
                    context.onInstanceAvailable((ref, existing) => {
                      detachCallback = onAddListen(
                        ref,
                        prop,
                        callback,
                        immediate &&
                          existing &&
                          !onAddCalls.has(currentOnAddCallback),
                      );
                    });
                    return () => detachCallback();
                  }
                },
                onChange: function onChange(callback) {
                  return $root.addCallback(
                    $root.refIds.get(context.instance),
                    exports2.OPERATION.REPLACE,
                    callback,
                  );
                },
                //
                // TODO: refactor `bindTo()` implementation.
                // There is room for improvement.
                //
                bindTo: function bindTo(targetObject, properties) {
                  if (!properties) {
                    properties = Object.keys(metadata).map(
                      (index) => metadata[index].name,
                    );
                  }
                  return $root.addCallback(
                    $root.refIds.get(context.instance),
                    exports2.OPERATION.REPLACE,
                    () => {
                      properties.forEach(
                        (prop) => (targetObject[prop] = context.instance[prop]),
                      );
                    },
                  );
                },
              },
              {
                get(target2, prop) {
                  const metadataField = metadata[metadata[prop]];
                  if (metadataField) {
                    const instance = context.instance?.[prop];
                    const onInstanceAvailable = (callback) => {
                      const unbind = $(context.instance).listen(
                        prop,
                        (value, _) => {
                          callback(value, false);
                          unbind?.();
                        },
                        false,
                      );
                      if ($root.refIds.get(instance) !== void 0) {
                        callback(instance, true);
                      }
                    };
                    return getProxy(metadataField.type, {
                      // make sure refId is available, otherwise need to wait for the instance to be available.
                      instance: $root.refIds.get(instance) && instance,
                      parentInstance: context.instance,
                      onInstanceAvailable,
                    });
                  } else {
                    return target2[prop];
                  }
                },
                has(target2, prop) {
                  return metadata[prop] !== void 0;
                },
                set(_, _1, _2) {
                  throw new Error("not allowed");
                },
                deleteProperty(_, _1) {
                  throw new Error("not allowed");
                },
              },
            );
          } else {
            const onAdd = function (ref, callback, immediate) {
              if (immediate) {
                ref.forEach((v, k) => callback(v, k));
              }
              return $root.addCallback(
                $root.refIds.get(ref),
                exports2.OPERATION.ADD,
                (value, key) => {
                  onAddCalls.set(callback, true);
                  currentOnAddCallback = callback;
                  callback(value, key);
                  onAddCalls.delete(callback);
                  currentOnAddCallback = void 0;
                },
              );
            };
            const onRemove = function (ref, callback) {
              return $root.addCallback(
                $root.refIds.get(ref),
                exports2.OPERATION.DELETE,
                callback,
              );
            };
            const onChange = function (ref, callback) {
              return $root.addCallback(
                $root.refIds.get(ref),
                exports2.OPERATION.REPLACE,
                callback,
              );
            };
            return new Proxy(
              {
                onAdd: function (callback, immediate = true) {
                  if (context.instance) {
                    return onAdd(
                      context.instance,
                      callback,
                      immediate && !onAddCalls.has(currentOnAddCallback),
                    );
                  } else if (context.onInstanceAvailable) {
                    let detachCallback = () => {};
                    context.onInstanceAvailable((ref, existing) => {
                      detachCallback = onAdd(
                        ref,
                        callback,
                        immediate &&
                          existing &&
                          !onAddCalls.has(currentOnAddCallback),
                      );
                    });
                    return () => detachCallback();
                  }
                },
                onRemove: function (callback) {
                  if (context.instance) {
                    return onRemove(context.instance, callback);
                  } else if (context.onInstanceAvailable) {
                    let detachCallback = () => {};
                    context.onInstanceAvailable((ref) => {
                      detachCallback = onRemove(ref, callback);
                    });
                    return () => detachCallback();
                  }
                },
                onChange: function (callback) {
                  if (context.instance) {
                    return onChange(context.instance, callback);
                  } else if (context.onInstanceAvailable) {
                    let detachCallback = () => {};
                    context.onInstanceAvailable((ref) => {
                      detachCallback = onChange(ref, callback);
                    });
                    return () => detachCallback();
                  }
                },
              },
              {
                get(target2, prop) {
                  if (!target2[prop]) {
                    throw new Error(
                      `Can't access '${prop}' through callback proxy. access the instance directly.`,
                    );
                  }
                  return target2[prop];
                },
                has(target2, prop) {
                  return target2[prop] !== void 0;
                },
                set(_, _1, _2) {
                  throw new Error("not allowed");
                },
                deleteProperty(_, _1) {
                  throw new Error("not allowed");
                },
              },
            );
          }
        }
        function $(instance) {
          return getProxy(void 0, { instance });
        }
        return $;
      }
      function getRawChangesCallback(decoder2, callback) {
        decoder2.triggerChanges = callback;
      }
      class StateView {
        constructor(iterable = false) {
          this.iterable = iterable;
          this.visible = /* @__PURE__ */ new WeakSet();
          this.invisible = /* @__PURE__ */ new WeakSet();
          this.changes = /* @__PURE__ */ new Map();
          if (iterable) {
            this.items = [];
          }
        }
        // TODO: allow to set multiple tags at once
        add(obj, tag = DEFAULT_VIEW_TAG, checkIncludeParent = true) {
          const changeTree = obj?.[$changes];
          const parentChangeTree = changeTree.parent;
          if (!changeTree) {
            console.warn("StateView#add(), invalid object:", obj);
            return false;
          } else if (!parentChangeTree && changeTree.refId !== 0) {
            throw new Error(
              `Cannot add a detached instance to the StateView. Make sure to assign the "${changeTree.ref.constructor.name}" instance to the state before calling view.add()`,
            );
          }
          const metadata = obj.constructor[Symbol.metadata];
          this.visible.add(changeTree);
          if (this.iterable && checkIncludeParent) {
            this.items.push(obj);
          }
          if (checkIncludeParent && parentChangeTree) {
            this.addParentOf(changeTree, tag);
          }
          let changes = this.changes.get(changeTree.refId);
          if (changes === void 0) {
            changes = {};
            this.changes.set(changeTree.refId, changes);
          }
          let isChildAdded = false;
          changeTree.forEachChild((change, index) => {
            if (
              metadata &&
              metadata[index].tag !== void 0 &&
              metadata[index].tag !== tag
            ) {
              return;
            }
            if (this.add(change.ref, tag, false)) {
              isChildAdded = true;
            }
          });
          if (tag !== DEFAULT_VIEW_TAG) {
            if (!this.tags) {
              this.tags = /* @__PURE__ */ new WeakMap();
            }
            let tags;
            if (!this.tags.has(changeTree)) {
              tags = /* @__PURE__ */ new Set();
              this.tags.set(changeTree, tags);
            } else {
              tags = this.tags.get(changeTree);
            }
            tags.add(tag);
            metadata?.[$fieldIndexesByViewTag]?.[tag]?.forEach((index) => {
              if (changeTree.getChange(index) !== exports2.OPERATION.DELETE) {
                changes[index] = exports2.OPERATION.ADD;
              }
            });
          } else if (!changeTree.isNew || isChildAdded) {
            const changeSet =
              changeTree.filteredChanges !== void 0
                ? changeTree.allFilteredChanges
                : changeTree.allChanges;
            const isInvisible = this.invisible.has(changeTree);
            for (let i = 0, len = changeSet.operations.length; i < len; i++) {
              const index = changeSet.operations[i];
              if (index === void 0) {
                continue;
              }
              const op =
                changeTree.indexedOperations[index] ?? exports2.OPERATION.ADD;
              const tagAtIndex = metadata?.[index].tag;
              if (
                op !== exports2.OPERATION.DELETE &&
                (isInvisible || // if "invisible", include all
                  tagAtIndex === void 0 || // "all change" with no tag
                  tagAtIndex === tag)
              ) {
                changes[index] = op;
                isChildAdded = true;
              }
            }
          }
          return isChildAdded;
        }
        addParentOf(childChangeTree, tag) {
          const changeTree = childChangeTree.parent[$changes];
          const parentIndex = childChangeTree.parentIndex;
          if (!this.visible.has(changeTree)) {
            this.visible.add(changeTree);
            const parentChangeTree = changeTree.parent?.[$changes];
            if (
              parentChangeTree &&
              parentChangeTree.filteredChanges !== void 0
            ) {
              this.addParentOf(changeTree, tag);
            }
          }
          if (changeTree.getChange(parentIndex) !== exports2.OPERATION.DELETE) {
            let changes = this.changes.get(changeTree.refId);
            if (changes === void 0) {
              changes = {};
              this.changes.set(changeTree.refId, changes);
            }
            if (!this.tags) {
              this.tags = /* @__PURE__ */ new WeakMap();
            }
            let tags;
            if (!this.tags.has(changeTree)) {
              tags = /* @__PURE__ */ new Set();
              this.tags.set(changeTree, tags);
            } else {
              tags = this.tags.get(changeTree);
            }
            tags.add(tag);
            changes[parentIndex] = exports2.OPERATION.ADD;
          }
        }
        remove(obj, tag = DEFAULT_VIEW_TAG, _isClear = false) {
          const changeTree = obj[$changes];
          if (!changeTree) {
            console.warn("StateView#remove(), invalid object:", obj);
            return this;
          }
          this.visible.delete(changeTree);
          if (this.iterable && !_isClear) {
            spliceOne(this.items, this.items.indexOf(obj));
          }
          const ref = changeTree.ref;
          const metadata = ref.constructor[Symbol.metadata];
          let changes = this.changes.get(changeTree.refId);
          if (changes === void 0) {
            changes = {};
            this.changes.set(changeTree.refId, changes);
          }
          if (tag === DEFAULT_VIEW_TAG) {
            const parent = changeTree.parent;
            if (
              parent &&
              !Metadata.isValidInstance(parent) &&
              changeTree.isFiltered
            ) {
              const parentChangeTree = parent[$changes];
              let changes2 = this.changes.get(parentChangeTree.refId);
              if (changes2 === void 0) {
                changes2 = {};
                this.changes.set(parentChangeTree.refId, changes2);
              } else if (
                changes2[changeTree.parentIndex] === exports2.OPERATION.ADD
              ) {
                this.changes.delete(changeTree.refId);
              }
              changes2[changeTree.parentIndex] = exports2.OPERATION.DELETE;
              this._recursiveDeleteVisibleChangeTree(changeTree);
            } else {
              metadata?.[$viewFieldIndexes]?.forEach(
                (index) => (changes[index] = exports2.OPERATION.DELETE),
              );
            }
          } else {
            metadata?.[$fieldIndexesByViewTag][tag].forEach(
              (index) => (changes[index] = exports2.OPERATION.DELETE),
            );
          }
          if (this.tags && this.tags.has(changeTree)) {
            const tags = this.tags.get(changeTree);
            if (tag === void 0) {
              this.tags.delete(changeTree);
            } else {
              tags.delete(tag);
              if (tags.size === 0) {
                this.tags.delete(changeTree);
              }
            }
          }
          return this;
        }
        has(obj) {
          return this.visible.has(obj[$changes]);
        }
        hasTag(ob, tag = DEFAULT_VIEW_TAG) {
          const tags = this.tags?.get(ob[$changes]);
          return tags?.has(tag) ?? false;
        }
        clear() {
          if (!this.iterable) {
            throw new Error(
              "StateView#clear() is only available for iterable StateView's. Use StateView(iterable: true) constructor.",
            );
          }
          for (let i = 0, l = this.items.length; i < l; i++) {
            this.remove(this.items[i], DEFAULT_VIEW_TAG, true);
          }
          this.items.length = 0;
        }
        isChangeTreeVisible(changeTree) {
          let isVisible = this.visible.has(changeTree);
          if (!isVisible && changeTree.isVisibilitySharedWithParent) {
            if (this.visible.has(changeTree.parent[$changes])) {
              this.visible.add(changeTree);
              isVisible = true;
            }
          }
          return isVisible;
        }
        _recursiveDeleteVisibleChangeTree(changeTree) {
          changeTree.forEachChild((childChangeTree) => {
            this.visible.delete(childChangeTree);
            this._recursiveDeleteVisibleChangeTree(childChangeTree);
          });
        }
      }
      registerType("map", { constructor: MapSchema });
      registerType("array", { constructor: ArraySchema });
      registerType("set", { constructor: SetSchema });
      registerType("collection", { constructor: CollectionSchema });
      exports2.$changes = $changes;
      exports2.$childType = $childType;
      exports2.$decoder = $decoder;
      exports2.$deleteByIndex = $deleteByIndex;
      exports2.$encoder = $encoder;
      exports2.$filter = $filter;
      exports2.$getByIndex = $getByIndex;
      exports2.$track = $track;
      exports2.ArraySchema = ArraySchema;
      exports2.ChangeTree = ChangeTree;
      exports2.CollectionSchema = CollectionSchema;
      exports2.Decoder = Decoder2;
      exports2.Encoder = Encoder2;
      exports2.MapSchema = MapSchema;
      exports2.Metadata = Metadata;
      exports2.Reflection = Reflection;
      exports2.ReflectionField = ReflectionField;
      exports2.ReflectionType = ReflectionType;
      exports2.Schema = Schema;
      exports2.SetSchema = SetSchema;
      exports2.StateView = StateView;
      exports2.TypeContext = TypeContext;
      exports2.decode = decode2;
      exports2.decodeKeyValueOperation = decodeKeyValueOperation;
      exports2.decodeSchemaOperation = decodeSchemaOperation;
      exports2.defineCustomTypes = defineCustomTypes;
      exports2.defineTypes = defineTypes;
      exports2.deprecated = deprecated;
      exports2.dumpChanges = dumpChanges;
      exports2.encode = encode2;
      exports2.encodeArray = encodeArray;
      exports2.encodeKeyValueOperation = encodeKeyValueOperation;
      exports2.encodeSchemaOperation = encodeSchemaOperation;
      exports2.entity = entity;
      exports2.getDecoderStateCallbacks = getDecoderStateCallbacks;
      exports2.getRawChangesCallback = getRawChangesCallback;
      exports2.registerType = registerType;
      exports2.schema = schema;
      exports2.type = type;
      exports2.view = view;
    });
  },
});

// node_modules/colyseus.js/build/cjs/transport/H3Transport.js
var require_H3Transport = __commonJS({
  "node_modules/colyseus.js/build/cjs/transport/H3Transport.js"(exports) {
    "use strict";
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var schema = require_umd();
    var H3TransportTransport = class {
      constructor(events) {
        this.events = events;
        this.isOpen = false;
        this.lengthPrefixBuffer = new Uint8Array(9);
      }
      connect(url, options = {}) {
        const wtOpts =
          (options.fingerprint && {
            // requireUnreliable: true,
            // congestionControl: "default", // "low-latency" || "throughput"
            serverCertificateHashes: [
              {
                algorithm: "sha-256",
                value: new Uint8Array(options.fingerprint).buffer,
              },
            ],
          }) ||
          void 0;
        this.wt = new WebTransport(url, wtOpts);
        this.wt.ready
          .then((e) => {
            console.log("WebTransport ready!", e);
            this.isOpen = true;
            this.unreliableReader = this.wt.datagrams.readable.getReader();
            this.unreliableWriter = this.wt.datagrams.writable.getWriter();
            const incomingBidi =
              this.wt.incomingBidirectionalStreams.getReader();
            incomingBidi
              .read()
              .then((stream) => {
                this.reader = stream.value.readable.getReader();
                this.writer = stream.value.writable.getWriter();
                this.sendSeatReservation(
                  options.room.roomId,
                  options.sessionId,
                  options.reconnectionToken,
                );
                this.readIncomingData();
                this.readIncomingUnreliableData();
              })
              .catch((e2) => {
                console.error("failed to read incoming stream", e2);
                console.error("TODO: close the connection");
              });
          })
          .catch((e) => {
            console.log("WebTransport not ready!", e);
            this._close();
          });
        this.wt.closed
          .then((e) => {
            console.log("WebTransport closed w/ success", e);
            this.events.onclose({ code: e.closeCode, reason: e.reason });
          })
          .catch((e) => {
            console.log("WebTransport closed w/ error", e);
            this.events.onerror(e);
            this.events.onclose({ code: e.closeCode, reason: e.reason });
          })
          .finally(() => {
            this._close();
          });
      }
      send(data) {
        const prefixLength = schema.encode.number(
          this.lengthPrefixBuffer,
          data.length,
          { offset: 0 },
        );
        const dataWithPrefixedLength = new Uint8Array(
          prefixLength + data.length,
        );
        dataWithPrefixedLength.set(
          this.lengthPrefixBuffer.subarray(0, prefixLength),
          0,
        );
        dataWithPrefixedLength.set(data, prefixLength);
        this.writer.write(dataWithPrefixedLength);
      }
      sendUnreliable(data) {
        const prefixLength = schema.encode.number(
          this.lengthPrefixBuffer,
          data.length,
          { offset: 0 },
        );
        const dataWithPrefixedLength = new Uint8Array(
          prefixLength + data.length,
        );
        dataWithPrefixedLength.set(
          this.lengthPrefixBuffer.subarray(0, prefixLength),
          0,
        );
        dataWithPrefixedLength.set(data, prefixLength);
        this.unreliableWriter.write(dataWithPrefixedLength);
      }
      close(code, reason) {
        try {
          this.wt.close({ closeCode: code, reason });
        } catch (e) {
          console.error(e);
        }
      }
      readIncomingData() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          let result;
          while (this.isOpen) {
            try {
              result = yield this.reader.read();
              const messages = result.value;
              const it = { offset: 0 };
              do {
                const length = schema.decode.number(messages, it);
                this.events.onmessage({
                  data: messages.subarray(it.offset, it.offset + length),
                });
                it.offset += length;
              } while (it.offset < messages.length);
            } catch (e) {
              if (e.message.indexOf("session is closed") === -1) {
                console.error("H3Transport: failed to read incoming data", e);
              }
              break;
            }
            if (result.done) {
              break;
            }
          }
        });
      }
      readIncomingUnreliableData() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          let result;
          while (this.isOpen) {
            try {
              result = yield this.unreliableReader.read();
              const messages = result.value;
              const it = { offset: 0 };
              do {
                const length = schema.decode.number(messages, it);
                this.events.onmessage({
                  data: messages.subarray(it.offset, it.offset + length),
                });
                it.offset += length;
              } while (it.offset < messages.length);
            } catch (e) {
              if (e.message.indexOf("session is closed") === -1) {
                console.error("H3Transport: failed to read incoming data", e);
              }
              break;
            }
            if (result.done) {
              break;
            }
          }
        });
      }
      sendSeatReservation(roomId, sessionId, reconnectionToken) {
        const it = { offset: 0 };
        const bytes = [];
        schema.encode.string(bytes, roomId, it);
        schema.encode.string(bytes, sessionId, it);
        if (reconnectionToken) {
          schema.encode.string(bytes, reconnectionToken, it);
        }
        this.writer.write(new Uint8Array(bytes).buffer);
      }
      _close() {
        this.isOpen = false;
      }
    };
    exports.H3TransportTransport = H3TransportTransport;
  },
});

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function () {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object",
      );
    };
  },
});

// node_modules/colyseus.js/build/cjs/transport/WebSocketTransport.js
var require_WebSocketTransport = __commonJS({
  "node_modules/colyseus.js/build/cjs/transport/WebSocketTransport.js"(
    exports,
  ) {
    "use strict";
    var NodeWebSocket = require_browser();
    var WebSocket = globalThis.WebSocket || NodeWebSocket;
    var WebSocketTransport = class {
      constructor(events) {
        this.events = events;
      }
      send(data) {
        this.ws.send(data);
      }
      sendUnreliable(data) {
        console.warn(
          "colyseus.js: The WebSocket transport does not support unreliable messages",
        );
      }
      /**
       * @param url URL to connect to
       * @param headers custom headers to send with the connection (only supported in Node.js. Web Browsers do not allow setting custom headers)
       */
      connect(url, headers) {
        try {
          this.ws = new WebSocket(url, { headers, protocols: this.protocols });
        } catch (e) {
          this.ws = new WebSocket(url, this.protocols);
        }
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = this.events.onopen;
        this.ws.onmessage = this.events.onmessage;
        this.ws.onclose = this.events.onclose;
        this.ws.onerror = this.events.onerror;
      }
      close(code, reason) {
        this.ws.close(code, reason);
      }
      get isOpen() {
        return this.ws.readyState === WebSocket.OPEN;
      }
    };
    exports.WebSocketTransport = WebSocketTransport;
  },
});

// node_modules/colyseus.js/build/cjs/Connection.js
var require_Connection = __commonJS({
  "node_modules/colyseus.js/build/cjs/Connection.js"(exports) {
    "use strict";
    var H3Transport = require_H3Transport();
    var WebSocketTransport = require_WebSocketTransport();
    var Connection = class {
      constructor(protocol) {
        this.events = {};
        switch (protocol) {
          case "h3":
            this.transport = new H3Transport.H3TransportTransport(this.events);
            break;
          default:
            this.transport = new WebSocketTransport.WebSocketTransport(
              this.events,
            );
            break;
        }
      }
      connect(url, options) {
        this.transport.connect.call(this.transport, url, options);
      }
      send(data) {
        this.transport.send(data);
      }
      sendUnreliable(data) {
        this.transport.sendUnreliable(data);
      }
      close(code, reason) {
        this.transport.close(code, reason);
      }
      get isOpen() {
        return this.transport.isOpen;
      }
    };
    exports.Connection = Connection;
  },
});

// node_modules/colyseus.js/build/cjs/Protocol.js
var require_Protocol = __commonJS({
  "node_modules/colyseus.js/build/cjs/Protocol.js"(exports) {
    "use strict";
    exports.Protocol = void 0;
    (function (Protocol) {
      Protocol[(Protocol["HANDSHAKE"] = 9)] = "HANDSHAKE";
      Protocol[(Protocol["JOIN_ROOM"] = 10)] = "JOIN_ROOM";
      Protocol[(Protocol["ERROR"] = 11)] = "ERROR";
      Protocol[(Protocol["LEAVE_ROOM"] = 12)] = "LEAVE_ROOM";
      Protocol[(Protocol["ROOM_DATA"] = 13)] = "ROOM_DATA";
      Protocol[(Protocol["ROOM_STATE"] = 14)] = "ROOM_STATE";
      Protocol[(Protocol["ROOM_STATE_PATCH"] = 15)] = "ROOM_STATE_PATCH";
      Protocol[(Protocol["ROOM_DATA_SCHEMA"] = 16)] = "ROOM_DATA_SCHEMA";
      Protocol[(Protocol["ROOM_DATA_BYTES"] = 17)] = "ROOM_DATA_BYTES";
    })(exports.Protocol || (exports.Protocol = {}));
    exports.ErrorCode = void 0;
    (function (ErrorCode) {
      ErrorCode[(ErrorCode["MATCHMAKE_NO_HANDLER"] = 4210)] =
        "MATCHMAKE_NO_HANDLER";
      ErrorCode[(ErrorCode["MATCHMAKE_INVALID_CRITERIA"] = 4211)] =
        "MATCHMAKE_INVALID_CRITERIA";
      ErrorCode[(ErrorCode["MATCHMAKE_INVALID_ROOM_ID"] = 4212)] =
        "MATCHMAKE_INVALID_ROOM_ID";
      ErrorCode[(ErrorCode["MATCHMAKE_UNHANDLED"] = 4213)] =
        "MATCHMAKE_UNHANDLED";
      ErrorCode[(ErrorCode["MATCHMAKE_EXPIRED"] = 4214)] = "MATCHMAKE_EXPIRED";
      ErrorCode[(ErrorCode["AUTH_FAILED"] = 4215)] = "AUTH_FAILED";
      ErrorCode[(ErrorCode["APPLICATION_ERROR"] = 4216)] = "APPLICATION_ERROR";
    })(exports.ErrorCode || (exports.ErrorCode = {}));
  },
});

// node_modules/colyseus.js/build/cjs/serializer/Serializer.js
var require_Serializer = __commonJS({
  "node_modules/colyseus.js/build/cjs/serializer/Serializer.js"(exports) {
    "use strict";
    var serializers = {};
    function registerSerializer(id, serializer) {
      serializers[id] = serializer;
    }
    function getSerializer(id) {
      const serializer = serializers[id];
      if (!serializer) {
        throw new Error("missing serializer: " + id);
      }
      return serializer;
    }
    exports.getSerializer = getSerializer;
    exports.registerSerializer = registerSerializer;
  },
});

// node_modules/colyseus.js/build/cjs/core/nanoevents.js
var require_nanoevents = __commonJS({
  "node_modules/colyseus.js/build/cjs/core/nanoevents.js"(exports) {
    "use strict";
    var createNanoEvents = () => ({
      emit(event, ...args) {
        let callbacks = this.events[event] || [];
        for (let i = 0, length = callbacks.length; i < length; i++) {
          callbacks[i](...args);
        }
      },
      events: {},
      on(event, cb) {
        var _a;
        ((_a = this.events[event]) === null || _a === void 0
          ? void 0
          : _a.push(cb)) || (this.events[event] = [cb]);
        return () => {
          var _a2;
          this.events[event] =
            (_a2 = this.events[event]) === null || _a2 === void 0
              ? void 0
              : _a2.filter((i) => cb !== i);
        };
      },
    });
    exports.createNanoEvents = createNanoEvents;
  },
});

// node_modules/colyseus.js/build/cjs/core/signal.js
var require_signal = __commonJS({
  "node_modules/colyseus.js/build/cjs/core/signal.js"(exports) {
    "use strict";
    var EventEmitter = class {
      constructor() {
        this.handlers = [];
      }
      register(cb, once = false) {
        this.handlers.push(cb);
        return this;
      }
      invoke(...args) {
        this.handlers.forEach((handler) => handler.apply(this, args));
      }
      invokeAsync(...args) {
        return Promise.all(
          this.handlers.map((handler) => handler.apply(this, args)),
        );
      }
      remove(cb) {
        const index = this.handlers.indexOf(cb);
        this.handlers[index] = this.handlers[this.handlers.length - 1];
        this.handlers.pop();
      }
      clear() {
        this.handlers = [];
      }
    };
    function createSignal() {
      const emitter = new EventEmitter();
      function register(cb) {
        return emitter.register(cb, this === null);
      }
      register.once = (cb) => {
        const callback = function (...args) {
          cb.apply(this, args);
          emitter.remove(callback);
        };
        emitter.register(callback);
      };
      register.remove = (cb) => emitter.remove(cb);
      register.invoke = (...args) => emitter.invoke(...args);
      register.invokeAsync = (...args) => emitter.invokeAsync(...args);
      register.clear = () => emitter.clear();
      return register;
    }
    exports.EventEmitter = EventEmitter;
    exports.createSignal = createSignal;
  },
});

// node_modules/colyseus.js/build/cjs/serializer/SchemaSerializer.js
var require_SchemaSerializer = __commonJS({
  "node_modules/colyseus.js/build/cjs/serializer/SchemaSerializer.js"(exports) {
    "use strict";
    var schema = require_umd();
    function getStateCallbacks(room) {
      try {
        return schema.getDecoderStateCallbacks(room["serializer"].decoder);
      } catch (e) {
        return void 0;
      }
    }
    var SchemaSerializer = class {
      setState(encodedState, it) {
        this.decoder.decode(encodedState, it);
      }
      getState() {
        return this.state;
      }
      patch(patches, it) {
        return this.decoder.decode(patches, it);
      }
      teardown() {
        this.decoder.root.clearRefs();
      }
      handshake(bytes, it) {
        if (this.state) {
          schema.Reflection.decode(bytes, it);
          this.decoder = new schema.Decoder(this.state);
        } else {
          this.decoder = schema.Reflection.decode(bytes, it);
          this.state = this.decoder.state;
        }
      }
    };
    exports.SchemaSerializer = SchemaSerializer;
    exports.getStateCallbacks = getStateCallbacks;
  },
});

// node_modules/@colyseus/msgpackr/unpack.js
function checkedRead(options) {
  try {
    if (!currentUnpackr.trusted && !sequentialMode) {
      let sharedLength = currentStructures.sharedLength || 0;
      if (sharedLength < currentStructures.length)
        currentStructures.length = sharedLength;
    }
    let result;
    if (
      currentUnpackr.randomAccessStructure &&
      src[position] < 64 &&
      src[position] >= 32 &&
      readStruct
    ) {
      result = readStruct(src, position, srcEnd, currentUnpackr);
      src = null;
      if (!(options && options.lazy) && result) result = result.toJSON();
      position = srcEnd;
    } else result = read();
    if (bundledStrings) {
      position = bundledStrings.postBundlePosition;
      bundledStrings = null;
    }
    if (sequentialMode) currentStructures.restoreStructures = null;
    if (position == srcEnd) {
      if (currentStructures && currentStructures.restoreStructures)
        restoreStructures();
      currentStructures = null;
      src = null;
      if (referenceMap) referenceMap = null;
    } else if (position > srcEnd) {
      throw new Error("Unexpected end of MessagePack data");
    } else if (!sequentialMode) {
      let jsonView;
      try {
        jsonView = JSON.stringify(result, (_, value) =>
          typeof value === "bigint" ? `${value}n` : value,
        ).slice(0, 100);
      } catch (error) {
        jsonView = "(JSON view not available " + error + ")";
      }
      throw new Error("Data read, but end of buffer not reached " + jsonView);
    }
    return result;
  } catch (error) {
    if (currentStructures && currentStructures.restoreStructures)
      restoreStructures();
    clearSource();
    if (
      error instanceof RangeError ||
      error.message.startsWith("Unexpected end of buffer") ||
      position > srcEnd
    ) {
      error.incomplete = true;
    }
    throw error;
  }
}
function restoreStructures() {
  for (let id in currentStructures.restoreStructures) {
    currentStructures[id] = currentStructures.restoreStructures[id];
  }
  currentStructures.restoreStructures = null;
}
function read() {
  let token = src[position++];
  if (token < 160) {
    if (token < 128) {
      if (token < 64) return token;
      else {
        let structure =
          currentStructures[token & 63] ||
          (currentUnpackr.getStructures && loadStructures()[token & 63]);
        if (structure) {
          if (!structure.read) {
            structure.read = createStructureReader(structure, token & 63);
          }
          return structure.read();
        } else return token;
      }
    } else if (token < 144) {
      token -= 128;
      if (currentUnpackr.mapsAsObjects) {
        let object = {};
        for (let i = 0; i < token; i++) {
          let key = readKey();
          if (key === "__proto__") key = "__proto_";
          object[key] = read();
        }
        return object;
      } else {
        let map = /* @__PURE__ */ new Map();
        for (let i = 0; i < token; i++) {
          map.set(read(), read());
        }
        return map;
      }
    } else {
      token -= 144;
      let array = new Array(token);
      for (let i = 0; i < token; i++) {
        array[i] = read();
      }
      if (currentUnpackr.freezeData) return Object.freeze(array);
      return array;
    }
  } else if (token < 192) {
    let length = token - 160;
    if (srcStringEnd >= position) {
      return srcString.slice(
        position - srcStringStart,
        (position += length) - srcStringStart,
      );
    }
    if (srcStringEnd == 0 && srcEnd < 140) {
      let string =
        length < 16 ? shortStringInJS(length) : longStringInJS(length);
      if (string != null) return string;
    }
    return readFixedString(length);
  } else {
    let value;
    switch (token) {
      case 192:
        return null;
      case 193:
        if (bundledStrings) {
          value = read();
          if (value > 0)
            return bundledStrings[1].slice(
              bundledStrings.position1,
              (bundledStrings.position1 += value),
            );
          else
            return bundledStrings[0].slice(
              bundledStrings.position0,
              (bundledStrings.position0 -= value),
            );
        }
        return C1;
      // "never-used", return special object to denote that
      case 194:
        return false;
      case 195:
        return true;
      case 196:
        value = src[position++];
        if (value === void 0) throw new Error("Unexpected end of buffer");
        return readBin(value);
      case 197:
        value = dataView.getUint16(position);
        position += 2;
        return readBin(value);
      case 198:
        value = dataView.getUint32(position);
        position += 4;
        return readBin(value);
      case 199:
        return readExt(src[position++]);
      case 200:
        value = dataView.getUint16(position);
        position += 2;
        return readExt(value);
      case 201:
        value = dataView.getUint32(position);
        position += 4;
        return readExt(value);
      case 202:
        value = dataView.getFloat32(position);
        if (currentUnpackr.useFloat32 > 2) {
          let multiplier =
            mult10[((src[position] & 127) << 1) | (src[position + 1] >> 7)];
          position += 4;
          return (
            ((multiplier * value + (value > 0 ? 0.5 : -0.5)) >> 0) / multiplier
          );
        }
        position += 4;
        return value;
      case 203:
        value = dataView.getFloat64(position);
        position += 8;
        return value;
      // uint handlers
      case 204:
        return src[position++];
      case 205:
        value = dataView.getUint16(position);
        position += 2;
        return value;
      case 206:
        value = dataView.getUint32(position);
        position += 4;
        return value;
      case 207:
        if (currentUnpackr.int64AsType === "number") {
          value = dataView.getUint32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else if (currentUnpackr.int64AsType === "string") {
          value = dataView.getBigUint64(position).toString();
        } else if (currentUnpackr.int64AsType === "auto") {
          value = dataView.getBigUint64(position);
          if (value <= BigInt(2) << BigInt(52)) value = Number(value);
        } else value = dataView.getBigUint64(position);
        position += 8;
        return value;
      // int handlers
      case 208:
        return dataView.getInt8(position++);
      case 209:
        value = dataView.getInt16(position);
        position += 2;
        return value;
      case 210:
        value = dataView.getInt32(position);
        position += 4;
        return value;
      case 211:
        if (currentUnpackr.int64AsType === "number") {
          value = dataView.getInt32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else if (currentUnpackr.int64AsType === "string") {
          value = dataView.getBigInt64(position).toString();
        } else if (currentUnpackr.int64AsType === "auto") {
          value = dataView.getBigInt64(position);
          if (
            value >= BigInt(-2) << BigInt(52) &&
            value <= BigInt(2) << BigInt(52)
          )
            value = Number(value);
        } else value = dataView.getBigInt64(position);
        position += 8;
        return value;
      case 212:
        value = src[position++];
        if (value == 114) {
          return recordDefinition(src[position++] & 63);
        } else {
          let extension = currentExtensions[value];
          if (extension) {
            if (extension.read) {
              position++;
              return extension.read(read());
            } else if (extension.noBuffer) {
              position++;
              return extension();
            } else return extension(src.subarray(position, ++position));
          } else throw new Error("Unknown extension " + value);
        }
      case 213:
        value = src[position];
        if (value == 114) {
          position++;
          return recordDefinition(src[position++] & 63, src[position++]);
        } else return readExt(2);
      case 214:
        return readExt(4);
      case 215:
        return readExt(8);
      case 216:
        return readExt(16);
      case 217:
        value = src[position++];
        if (srcStringEnd >= position) {
          return srcString.slice(
            position - srcStringStart,
            (position += value) - srcStringStart,
          );
        }
        return readString8(value);
      case 218:
        value = dataView.getUint16(position);
        position += 2;
        if (srcStringEnd >= position) {
          return srcString.slice(
            position - srcStringStart,
            (position += value) - srcStringStart,
          );
        }
        return readString16(value);
      case 219:
        value = dataView.getUint32(position);
        position += 4;
        if (srcStringEnd >= position) {
          return srcString.slice(
            position - srcStringStart,
            (position += value) - srcStringStart,
          );
        }
        return readString32(value);
      case 220:
        value = dataView.getUint16(position);
        position += 2;
        return readArray(value);
      case 221:
        value = dataView.getUint32(position);
        position += 4;
        return readArray(value);
      case 222:
        value = dataView.getUint16(position);
        position += 2;
        return readMap(value);
      case 223:
        value = dataView.getUint32(position);
        position += 4;
        return readMap(value);
      default:
        if (token >= 224) return token - 256;
        if (token === void 0) {
          let error = new Error("Unexpected end of MessagePack data");
          error.incomplete = true;
          throw error;
        }
        throw new Error("Unknown MessagePack token " + token);
    }
  }
}
function createStructureReader(structure, firstId) {
  function readObject() {
    if (readObject.count++ > inlineObjectReadThreshold) {
      let readObject2 = (structure.read = new Function(
        "r",
        "return function(){return " +
          (currentUnpackr.freezeData ? "Object.freeze" : "") +
          "({" +
          structure
            .map((key) =>
              key === "__proto__"
                ? "__proto_:r()"
                : validName.test(key)
                  ? key + ":r()"
                  : "[" + JSON.stringify(key) + "]:r()",
            )
            .join(",") +
          "})}",
      )(read));
      if (structure.highByte === 0)
        structure.read = createSecondByteReader(firstId, structure.read);
      return readObject2();
    }
    let object = {};
    for (let i = 0, l = structure.length; i < l; i++) {
      let key = structure[i];
      if (key === "__proto__") key = "__proto_";
      object[key] = read();
    }
    if (currentUnpackr.freezeData) return Object.freeze(object);
    return object;
  }
  readObject.count = 0;
  if (structure.highByte === 0) {
    return createSecondByteReader(firstId, readObject);
  }
  return readObject;
}
function loadStructures() {
  let loadedStructures = saveState(() => {
    src = null;
    return currentUnpackr.getStructures();
  });
  return (currentStructures = currentUnpackr._mergeStructures(
    loadedStructures,
    currentStructures,
  ));
}
function readStringJS(length) {
  let result;
  if (length < 16) {
    if ((result = shortStringInJS(length))) return result;
  }
  if (length > 64 && decoder)
    return decoder.decode(src.subarray(position, (position += length)));
  const end = position + length;
  const units = [];
  result = "";
  while (position < end) {
    const byte1 = src[position++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src[position++] & 63;
      units.push(((byte1 & 31) << 6) | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      units.push(((byte1 & 31) << 12) | (byte2 << 6) | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      const byte4 = src[position++] & 63;
      let unit = ((byte1 & 7) << 18) | (byte2 << 12) | (byte3 << 6) | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(((unit >>> 10) & 1023) | 55296);
        unit = 56320 | (unit & 1023);
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode.apply(String, units);
  }
  return result;
}
function readArray(length) {
  let array = new Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = read();
  }
  if (currentUnpackr.freezeData) return Object.freeze(array);
  return array;
}
function readMap(length) {
  if (currentUnpackr.mapsAsObjects) {
    let object = {};
    for (let i = 0; i < length; i++) {
      let key = readKey();
      if (key === "__proto__") key = "__proto_";
      object[key] = read();
    }
    return object;
  } else {
    let map = /* @__PURE__ */ new Map();
    for (let i = 0; i < length; i++) {
      map.set(read(), read());
    }
    return map;
  }
}
function longStringInJS(length) {
  let start = position;
  let bytes = new Array(length);
  for (let i = 0; i < length; i++) {
    const byte = src[position++];
    if ((byte & 128) > 0) {
      position = start;
      return;
    }
    bytes[i] = byte;
  }
  return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length) {
  if (length < 4) {
    if (length < 2) {
      if (length === 0) return "";
      else {
        let a = src[position++];
        if ((a & 128) > 1) {
          position -= 1;
          return;
        }
        return fromCharCode(a);
      }
    } else {
      let a = src[position++];
      let b = src[position++];
      if ((a & 128) > 0 || (b & 128) > 0) {
        position -= 2;
        return;
      }
      if (length < 3) return fromCharCode(a, b);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a, b, c);
    }
  } else {
    let a = src[position++];
    let b = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4) return fromCharCode(a, b, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a, b, c, d, e);
      }
    } else if (length < 8) {
      let e = src[position++];
      let f = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position -= 6;
        return;
      }
      if (length < 7) return fromCharCode(a, b, c, d, e, f);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a, b, c, d, e, f, g);
    } else {
      let e = src[position++];
      let f = src[position++];
      let g = src[position++];
      let h = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position -= 8;
        return;
      }
      if (length < 10) {
        if (length === 8) return fromCharCode(a, b, c, d, e, f, g, h);
        else {
          let i = src[position++];
          if ((i & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i);
        }
      } else if (length < 12) {
        let i = src[position++];
        let j = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position -= 10;
          return;
        }
        if (length < 11) return fromCharCode(a, b, c, d, e, f, g, h, i, j);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
      } else {
        let i = src[position++];
        let j = src[position++];
        let k = src[position++];
        let l = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position -= 12;
          return;
        }
        if (length < 14) {
          if (length === 12)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
        }
      }
    }
  }
}
function readOnlyJSString() {
  let token = src[position++];
  let length;
  if (token < 192) {
    length = token - 160;
  } else {
    switch (token) {
      case 217:
        length = src[position++];
        break;
      case 218:
        length = dataView.getUint16(position);
        position += 2;
        break;
      case 219:
        length = dataView.getUint32(position);
        position += 4;
        break;
      default:
        throw new Error("Expected string");
    }
  }
  return readStringJS(length);
}
function readBin(length) {
  return currentUnpackr.copyBuffers
    ? // specifically use the copying slice (not the node one)
      Uint8Array.prototype.slice.call(src, position, (position += length))
    : src.subarray(position, (position += length));
}
function readExt(length) {
  let type = src[position++];
  if (currentExtensions[type]) {
    let end;
    return currentExtensions[type](
      src.subarray(position, (end = position += length)),
      (readPosition) => {
        position = readPosition;
        try {
          return read();
        } finally {
          position = end;
        }
      },
    );
  } else throw new Error("Unknown extension type " + type);
}
function readKey() {
  let length = src[position++];
  if (length >= 160 && length < 192) {
    length = length - 160;
    if (srcStringEnd >= position)
      return srcString.slice(
        position - srcStringStart,
        (position += length) - srcStringStart,
      );
    else if (!(srcStringEnd == 0 && srcEnd < 180))
      return readFixedString(length);
  } else {
    position--;
    return asSafeString(read());
  }
  let key =
    ((length << 5) ^
      (length > 1
        ? dataView.getUint16(position)
        : length > 0
          ? src[position]
          : 0)) &
    4095;
  let entry = keyCache[key];
  let checkPosition = position;
  let end = position + length - 3;
  let chunk;
  let i = 0;
  if (entry && entry.bytes == length) {
    while (checkPosition < end) {
      chunk = dataView.getUint32(checkPosition);
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
      checkPosition += 4;
    }
    end += 3;
    while (checkPosition < end) {
      chunk = src[checkPosition++];
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
    }
    if (checkPosition === end) {
      position = checkPosition;
      return entry.string;
    }
    end -= 3;
    checkPosition = position;
  }
  entry = [];
  keyCache[key] = entry;
  entry.bytes = length;
  while (checkPosition < end) {
    chunk = dataView.getUint32(checkPosition);
    entry.push(chunk);
    checkPosition += 4;
  }
  end += 3;
  while (checkPosition < end) {
    chunk = src[checkPosition++];
    entry.push(chunk);
  }
  let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
  if (string != null) return (entry.string = string);
  return (entry.string = readFixedString(length));
}
function asSafeString(property) {
  if (typeof property === "string") return property;
  if (
    typeof property === "number" ||
    typeof property === "boolean" ||
    typeof property === "bigint"
  )
    return property.toString();
  if (property == null) return property + "";
  if (
    currentUnpackr.allowArraysInMapKeys &&
    Array.isArray(property) &&
    property
      .flat()
      .every((item) =>
        ["string", "number", "boolean", "bigint"].includes(typeof item),
      )
  ) {
    return property.flat().toString();
  }
  throw new Error(`Invalid property type for record: ${typeof property}`);
}
function saveState(callback) {
  if (onSaveState) onSaveState();
  let savedSrcEnd = srcEnd;
  let savedPosition = position;
  let savedStringPosition = stringPosition;
  let savedSrcStringStart = srcStringStart;
  let savedSrcStringEnd = srcStringEnd;
  let savedSrcString = srcString;
  let savedStrings = strings;
  let savedReferenceMap = referenceMap;
  let savedBundledStrings = bundledStrings;
  let savedSrc = new Uint8Array(src.slice(0, srcEnd));
  let savedStructures = currentStructures;
  let savedStructuresContents = currentStructures.slice(
    0,
    currentStructures.length,
  );
  let savedPackr = currentUnpackr;
  let savedSequentialMode = sequentialMode;
  let value = callback();
  srcEnd = savedSrcEnd;
  position = savedPosition;
  stringPosition = savedStringPosition;
  srcStringStart = savedSrcStringStart;
  srcStringEnd = savedSrcStringEnd;
  srcString = savedSrcString;
  strings = savedStrings;
  referenceMap = savedReferenceMap;
  bundledStrings = savedBundledStrings;
  src = savedSrc;
  sequentialMode = savedSequentialMode;
  currentStructures = savedStructures;
  currentStructures.splice(
    0,
    currentStructures.length,
    ...savedStructuresContents,
  );
  currentUnpackr = savedPackr;
  dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
  return value;
}
function clearSource() {
  src = null;
  referenceMap = null;
  currentStructures = null;
}
function addExtension(extension) {
  if (extension.unpack) currentExtensions[extension.type] = extension.unpack;
  else currentExtensions[extension.type] = extension;
}
function roundFloat32(float32Number) {
  f32Array[0] = float32Number;
  let multiplier = mult10[((u8Array[3] & 127) << 1) | (u8Array[2] >> 7)];
  return (
    ((multiplier * float32Number + (float32Number > 0 ? 0.5 : -0.5)) >> 0) /
    multiplier
  );
}
var decoder,
  src,
  srcEnd,
  position,
  EMPTY_ARRAY,
  strings,
  stringPosition,
  currentUnpackr,
  currentStructures,
  srcString,
  srcStringStart,
  srcStringEnd,
  bundledStrings,
  referenceMap,
  currentExtensions,
  dataView,
  defaultOptions,
  C1Type,
  C1,
  sequentialMode,
  inlineObjectReadThreshold,
  readStruct,
  onLoadedStructures,
  onSaveState,
  Unpackr,
  validName,
  createSecondByteReader,
  readFixedString,
  readString8,
  readString16,
  readString32,
  isNativeAccelerationEnabled,
  fromCharCode,
  keyCache,
  recordDefinition,
  errors,
  typedArrays,
  glbl,
  TEMP_BUNDLE,
  mult10,
  Decoder,
  defaultUnpackr,
  unpack,
  unpackMultiple,
  decode,
  FLOAT32_OPTIONS,
  f32Array,
  u8Array;
var init_unpack = __esm({
  "node_modules/@colyseus/msgpackr/unpack.js"() {
    try {
      decoder = new TextDecoder();
    } catch (error) {}
    position = 0;
    EMPTY_ARRAY = [];
    strings = EMPTY_ARRAY;
    stringPosition = 0;
    currentUnpackr = {};
    srcStringStart = 0;
    srcStringEnd = 0;
    currentExtensions = [];
    defaultOptions = {
      useRecords: false,
      mapsAsObjects: true,
    };
    C1Type = class {};
    C1 = new C1Type();
    C1.name = "MessagePack 0xC1";
    sequentialMode = false;
    inlineObjectReadThreshold = 2;
    try {
      new Function("");
    } catch (error) {
      inlineObjectReadThreshold = Infinity;
    }
    Unpackr = class _Unpackr {
      constructor(options) {
        if (options) {
          if (options.useRecords === false && options.mapsAsObjects === void 0)
            options.mapsAsObjects = true;
          if (options.sequential && options.trusted !== false) {
            options.trusted = true;
            if (!options.structures && options.useRecords != false) {
              options.structures = [];
              if (!options.maxSharedStructures) options.maxSharedStructures = 0;
            }
          }
          if (options.structures)
            options.structures.sharedLength = options.structures.length;
          else if (options.getStructures) {
            (options.structures = []).uninitialized = true;
            options.structures.sharedLength = 0;
          }
          if (options.int64AsNumber) {
            options.int64AsType = "number";
          }
        }
        Object.assign(this, options);
      }
      unpack(source, options) {
        if (src) {
          return saveState(() => {
            clearSource();
            return this
              ? this.unpack(source, options)
              : _Unpackr.prototype.unpack.call(defaultOptions, source, options);
          });
        }
        if (!source.buffer && source.constructor === ArrayBuffer)
          source =
            typeof Buffer !== "undefined"
              ? Buffer.from(source)
              : new Uint8Array(source);
        if (typeof options === "object") {
          srcEnd = options.end || source.length;
          position = options.start || 0;
        } else {
          position = 0;
          srcEnd = options > -1 ? options : source.length;
        }
        stringPosition = 0;
        srcStringEnd = 0;
        srcString = null;
        strings = EMPTY_ARRAY;
        bundledStrings = null;
        src = source;
        try {
          dataView =
            source.dataView ||
            (source.dataView = new DataView(
              source.buffer,
              source.byteOffset,
              source.byteLength,
            ));
        } catch (error) {
          src = null;
          if (source instanceof Uint8Array) throw error;
          throw new Error(
            "Source must be a Uint8Array or Buffer but was a " +
              (source && typeof source == "object"
                ? source.constructor.name
                : typeof source),
          );
        }
        if (this instanceof _Unpackr) {
          currentUnpackr = this;
          if (this.structures) {
            currentStructures = this.structures;
            return checkedRead(options);
          } else if (!currentStructures || currentStructures.length > 0) {
            currentStructures = [];
          }
        } else {
          currentUnpackr = defaultOptions;
          if (!currentStructures || currentStructures.length > 0)
            currentStructures = [];
        }
        return checkedRead(options);
      }
      unpackMultiple(source, forEach) {
        let values,
          lastPosition = 0;
        try {
          sequentialMode = true;
          let size = source.length;
          let value = this
            ? this.unpack(source, size)
            : defaultUnpackr.unpack(source, size);
          if (forEach) {
            if (forEach(value, lastPosition, position) === false) return;
            while (position < size) {
              lastPosition = position;
              if (forEach(checkedRead(), lastPosition, position) === false) {
                return;
              }
            }
          } else {
            values = [value];
            while (position < size) {
              lastPosition = position;
              values.push(checkedRead());
            }
            return values;
          }
        } catch (error) {
          error.lastPosition = lastPosition;
          error.values = values;
          throw error;
        } finally {
          sequentialMode = false;
          clearSource();
        }
      }
      _mergeStructures(loadedStructures, existingStructures) {
        if (onLoadedStructures)
          loadedStructures = onLoadedStructures.call(this, loadedStructures);
        loadedStructures = loadedStructures || [];
        if (Object.isFrozen(loadedStructures))
          loadedStructures = loadedStructures.map((structure) =>
            structure.slice(0),
          );
        for (let i = 0, l = loadedStructures.length; i < l; i++) {
          let structure = loadedStructures[i];
          if (structure) {
            structure.isShared = true;
            if (i >= 32) structure.highByte = (i - 32) >> 5;
          }
        }
        loadedStructures.sharedLength = loadedStructures.length;
        for (let id in existingStructures || []) {
          if (id >= 0) {
            let structure = loadedStructures[id];
            let existing = existingStructures[id];
            if (existing) {
              if (structure)
                (loadedStructures.restoreStructures ||
                  (loadedStructures.restoreStructures = []))[id] = structure;
              loadedStructures[id] = existing;
            }
          }
        }
        return (this.structures = loadedStructures);
      }
      decode(source, options) {
        return this.unpack(source, options);
      }
    };
    validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    createSecondByteReader = (firstId, read0) => {
      return function () {
        let highByte = src[position++];
        if (highByte === 0) return read0();
        let id =
          firstId < 32
            ? -(firstId + (highByte << 5))
            : firstId + (highByte << 5);
        let structure = currentStructures[id] || loadStructures()[id];
        if (!structure) {
          throw new Error("Record id is not defined for " + id);
        }
        if (!structure.read)
          structure.read = createStructureReader(structure, firstId);
        return structure.read();
      };
    };
    readFixedString = readStringJS;
    readString8 = readStringJS;
    readString16 = readStringJS;
    readString32 = readStringJS;
    isNativeAccelerationEnabled = false;
    fromCharCode = String.fromCharCode;
    keyCache = new Array(4096);
    recordDefinition = (id, highByte) => {
      let structure = read().map(asSafeString);
      let firstByte = id;
      if (highByte !== void 0) {
        id = id < 32 ? -((highByte << 5) + id) : (highByte << 5) + id;
        structure.highByte = highByte;
      }
      let existingStructure = currentStructures[id];
      if (existingStructure && (existingStructure.isShared || sequentialMode)) {
        (currentStructures.restoreStructures ||
          (currentStructures.restoreStructures = []))[id] = existingStructure;
      }
      currentStructures[id] = structure;
      structure.read = createStructureReader(structure, firstByte);
      return structure.read();
    };
    currentExtensions[0] = () => {};
    currentExtensions[0].noBuffer = true;
    currentExtensions[66] = (data) => {
      let length = data.length;
      let value = BigInt(data[0] & 128 ? data[0] - 256 : data[0]);
      for (let i = 1; i < length; i++) {
        value <<= BigInt(8);
        value += BigInt(data[i]);
      }
      return value;
    };
    errors = { Error, TypeError, ReferenceError };
    currentExtensions[101] = () => {
      let data = read();
      return (errors[data[0]] || Error)(data[1], { cause: data[2] });
    };
    currentExtensions[105] = (data) => {
      if (currentUnpackr.structuredClone === false)
        throw new Error("Structured clone extension is disabled");
      let id = dataView.getUint32(position - 4);
      if (!referenceMap) referenceMap = /* @__PURE__ */ new Map();
      let token = src[position];
      let target2;
      if ((token >= 144 && token < 160) || token == 220 || token == 221)
        target2 = [];
      else target2 = {};
      let refEntry = { target: target2 };
      referenceMap.set(id, refEntry);
      let targetProperties = read();
      if (refEntry.used) return Object.assign(target2, targetProperties);
      refEntry.target = targetProperties;
      return targetProperties;
    };
    currentExtensions[112] = (data) => {
      if (currentUnpackr.structuredClone === false)
        throw new Error("Structured clone extension is disabled");
      let id = dataView.getUint32(position - 4);
      let refEntry = referenceMap.get(id);
      refEntry.used = true;
      return refEntry.target;
    };
    currentExtensions[115] = () => new Set(read());
    typedArrays = [
      "Int8",
      "Uint8",
      "Uint8Clamped",
      "Int16",
      "Uint16",
      "Int32",
      "Uint32",
      "Float32",
      "Float64",
      "BigInt64",
      "BigUint64",
    ].map((type) => type + "Array");
    glbl = typeof globalThis === "object" ? globalThis : window;
    currentExtensions[116] = (data) => {
      let typeCode = data[0];
      let typedArrayName = typedArrays[typeCode];
      if (!typedArrayName) {
        if (typeCode === 16) {
          let ab = new ArrayBuffer(data.length - 1);
          let u8 = new Uint8Array(ab);
          u8.set(data.subarray(1));
          return ab;
        }
        throw new Error("Could not find typed array for code " + typeCode);
      }
      return new glbl[typedArrayName](
        Uint8Array.prototype.slice.call(data, 1).buffer,
      );
    };
    currentExtensions[120] = () => {
      let data = read();
      return new RegExp(data[0], data[1]);
    };
    TEMP_BUNDLE = [];
    currentExtensions[98] = (data) => {
      let dataSize =
        (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
      let dataPosition = position;
      position += dataSize - data.length;
      bundledStrings = TEMP_BUNDLE;
      bundledStrings = [readOnlyJSString(), readOnlyJSString()];
      bundledStrings.position0 = 0;
      bundledStrings.position1 = 0;
      bundledStrings.postBundlePosition = position;
      position = dataPosition;
      return read();
    };
    currentExtensions[255] = (data) => {
      if (data.length == 4)
        return new Date(
          (data[0] * 16777216 + (data[1] << 16) + (data[2] << 8) + data[3]) *
            1e3,
        );
      else if (data.length == 8)
        return new Date(
          ((data[0] << 22) +
            (data[1] << 14) +
            (data[2] << 6) +
            (data[3] >> 2)) /
            1e6 +
            ((data[3] & 3) * 4294967296 +
              data[4] * 16777216 +
              (data[5] << 16) +
              (data[6] << 8) +
              data[7]) *
              1e3,
        );
      else if (data.length == 12)
        return new Date(
          ((data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3]) / 1e6 +
            ((data[4] & 128 ? -281474976710656 : 0) +
              data[6] * 1099511627776 +
              data[7] * 4294967296 +
              data[8] * 16777216 +
              (data[9] << 16) +
              (data[10] << 8) +
              data[11]) *
              1e3,
        );
      else return /* @__PURE__ */ new Date("invalid");
    };
    mult10 = new Array(147);
    for (let i = 0; i < 256; i++) {
      mult10[i] = +("1e" + Math.floor(45.15 - i * 0.30103));
    }
    Decoder = Unpackr;
    defaultUnpackr = new Unpackr({ useRecords: false });
    unpack = defaultUnpackr.unpack;
    unpackMultiple = defaultUnpackr.unpackMultiple;
    decode = defaultUnpackr.unpack;
    FLOAT32_OPTIONS = {
      NEVER: 0,
      ALWAYS: 1,
      DECIMAL_ROUND: 3,
      DECIMAL_FIT: 4,
    };
    f32Array = new Float32Array(1);
    u8Array = new Uint8Array(f32Array.buffer, 0, 4);
  },
});

// node_modules/@colyseus/msgpackr/pack.js
function writeExtBuffer(typedArray, type, allocateForWrite, encode2) {
  let length = typedArray.byteLength;
  if (length + 1 < 256) {
    var { target: target2, position: position3 } = allocateForWrite(4 + length);
    target2[position3++] = 199;
    target2[position3++] = length + 1;
  } else if (length + 1 < 65536) {
    var { target: target2, position: position3 } = allocateForWrite(5 + length);
    target2[position3++] = 200;
    target2[position3++] = (length + 1) >> 8;
    target2[position3++] = (length + 1) & 255;
  } else {
    var {
      target: target2,
      position: position3,
      targetView: targetView2,
    } = allocateForWrite(7 + length);
    target2[position3++] = 201;
    targetView2.setUint32(position3, length + 1);
    position3 += 4;
  }
  target2[position3++] = 116;
  target2[position3++] = type;
  if (!typedArray.buffer) typedArray = new Uint8Array(typedArray);
  target2.set(
    new Uint8Array(
      typedArray.buffer,
      typedArray.byteOffset,
      typedArray.byteLength,
    ),
    position3,
  );
}
function writeBuffer(buffer, allocateForWrite) {
  let length = buffer.byteLength;
  var target2, position3;
  if (length < 256) {
    var { target: target2, position: position3 } = allocateForWrite(length + 2);
    target2[position3++] = 196;
    target2[position3++] = length;
  } else if (length < 65536) {
    var { target: target2, position: position3 } = allocateForWrite(length + 3);
    target2[position3++] = 197;
    target2[position3++] = length >> 8;
    target2[position3++] = length & 255;
  } else {
    var {
      target: target2,
      position: position3,
      targetView: targetView2,
    } = allocateForWrite(length + 5);
    target2[position3++] = 198;
    targetView2.setUint32(position3, length);
    position3 += 4;
  }
  target2.set(buffer, position3);
}
function writeExtensionData(result, target2, position3, type) {
  let length = result.length;
  switch (length) {
    case 1:
      target2[position3++] = 212;
      break;
    case 2:
      target2[position3++] = 213;
      break;
    case 4:
      target2[position3++] = 214;
      break;
    case 8:
      target2[position3++] = 215;
      break;
    case 16:
      target2[position3++] = 216;
      break;
    default:
      if (length < 256) {
        target2[position3++] = 199;
        target2[position3++] = length;
      } else if (length < 65536) {
        target2[position3++] = 200;
        target2[position3++] = length >> 8;
        target2[position3++] = length & 255;
      } else {
        target2[position3++] = 201;
        target2[position3++] = length >> 24;
        target2[position3++] = (length >> 16) & 255;
        target2[position3++] = (length >> 8) & 255;
        target2[position3++] = length & 255;
      }
  }
  target2[position3++] = type;
  target2.set(result, position3);
  position3 += length;
  return position3;
}
function insertIds(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 6;
  let lastEnd = serialized.length - distanceToMove;
  while ((nextId = idsToInsert.pop())) {
    let offset = nextId.offset;
    let id = nextId.id;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 6;
    let position3 = offset + distanceToMove;
    serialized[position3++] = 214;
    serialized[position3++] = 105;
    serialized[position3++] = id >> 24;
    serialized[position3++] = (id >> 16) & 255;
    serialized[position3++] = (id >> 8) & 255;
    serialized[position3++] = id & 255;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles(start, pack2, incrementPosition) {
  if (bundledStrings2.length > 0) {
    targetView.setUint32(
      bundledStrings2.position + start,
      position2 + incrementPosition - bundledStrings2.position - start,
    );
    bundledStrings2.stringsPosition = position2 - start;
    let writeStrings = bundledStrings2;
    bundledStrings2 = null;
    pack2(writeStrings[0]);
    pack2(writeStrings[1]);
  }
}
function addExtension2(extension) {
  if (extension.Class) {
    if (!extension.pack && !extension.write)
      throw new Error("Extension has no pack or write function");
    if (extension.pack && !extension.type)
      throw new Error(
        "Extension has no type (numeric code to identify the extension)",
      );
    extensionClasses.unshift(extension.Class);
    extensions.unshift(extension);
  }
  addExtension(extension);
}
function prepareStructures(structures, packr) {
  structures.isCompatible = (existingStructures) => {
    let compatible =
      !existingStructures ||
      (packr.lastNamedStructuresLength || 0) === existingStructures.length;
    if (!compatible) packr._mergeStructures(existingStructures);
    return compatible;
  };
  return structures;
}
var textEncoder,
  extensions,
  extensionClasses,
  hasNodeBuffer,
  ByteArrayAllocate,
  ByteArray,
  MAX_BUFFER_SIZE,
  target,
  keysTarget,
  targetView,
  position2,
  safeEnd,
  bundledStrings2,
  writeStructSlots,
  MAX_BUNDLE_SIZE,
  hasNonLatin,
  RECORD_SYMBOL,
  Packr,
  defaultPackr,
  pack,
  encode,
  Encoder,
  NEVER,
  ALWAYS,
  DECIMAL_ROUND,
  DECIMAL_FIT,
  REUSE_BUFFER_MODE,
  RESET_BUFFER_MODE,
  RESERVE_START_SPACE;
var init_pack = __esm({
  "node_modules/@colyseus/msgpackr/pack.js"() {
    init_unpack();
    init_unpack();
    init_unpack();
    try {
      textEncoder = new TextEncoder();
    } catch (error) {}
    hasNodeBuffer = typeof Buffer !== "undefined";
    ByteArrayAllocate = hasNodeBuffer
      ? function (length) {
          return Buffer.allocUnsafeSlow(length);
        }
      : Uint8Array;
    ByteArray = hasNodeBuffer ? Buffer : Uint8Array;
    MAX_BUFFER_SIZE = hasNodeBuffer ? 4294967296 : 2144337920;
    position2 = 0;
    bundledStrings2 = null;
    MAX_BUNDLE_SIZE = 21760;
    hasNonLatin = /[\u0080-\uFFFF]/;
    RECORD_SYMBOL = Symbol("record-id");
    Packr = class extends Unpackr {
      constructor(options) {
        super(options);
        this.offset = 0;
        let typeBuffer;
        let start;
        let hasSharedUpdate;
        let structures;
        let referenceMap2;
        let encodeUtf8 = ByteArray.prototype.utf8Write
          ? function (string, position3) {
              return target.utf8Write(
                string,
                position3,
                target.byteLength - position3,
              );
            }
          : textEncoder && textEncoder.encodeInto
            ? function (string, position3) {
                return textEncoder.encodeInto(
                  string,
                  target.subarray(position3),
                ).written;
              }
            : false;
        let packr = this;
        if (!options) options = {};
        let isSequential = options && options.sequential;
        let hasSharedStructures = options.structures || options.saveStructures;
        let maxSharedStructures = options.maxSharedStructures;
        if (maxSharedStructures == null)
          maxSharedStructures = hasSharedStructures ? 32 : 0;
        if (maxSharedStructures > 8160)
          throw new Error("Maximum maxSharedStructure is 8160");
        if (options.structuredClone && options.moreTypes == void 0) {
          this.moreTypes = true;
        }
        let maxOwnStructures = options.maxOwnStructures;
        if (maxOwnStructures == null)
          maxOwnStructures = hasSharedStructures ? 32 : 64;
        if (!this.structures && options.useRecords != false)
          this.structures = [];
        let useTwoByteRecords =
          maxSharedStructures > 32 ||
          maxOwnStructures + maxSharedStructures > 64;
        let sharedLimitId = maxSharedStructures + 64;
        let maxStructureId = maxSharedStructures + maxOwnStructures + 64;
        if (maxStructureId > 8256) {
          throw new Error(
            "Maximum maxSharedStructure + maxOwnStructure is 8192",
          );
        }
        let recordIdsToRemove = [];
        let transitionsCount = 0;
        let serializationsSinceTransitionRebuild = 0;
        this.pack = this.encode = function (value, encodeOptions) {
          if (!target) {
            target = new ByteArrayAllocate(8192);
            targetView =
              target.dataView ||
              (target.dataView = new DataView(target.buffer, 0, 8192));
            position2 = 0;
          }
          safeEnd = target.length - 10;
          if (safeEnd - position2 < 2048) {
            target = new ByteArrayAllocate(target.length);
            targetView =
              target.dataView ||
              (target.dataView = new DataView(target.buffer, 0, target.length));
            safeEnd = target.length - 10;
            position2 = 0;
          } else position2 = (position2 + 7) & 2147483640;
          start = position2;
          if (encodeOptions & RESERVE_START_SPACE)
            position2 += encodeOptions & 255;
          referenceMap2 = packr.structuredClone
            ? /* @__PURE__ */ new Map()
            : null;
          if (packr.bundleStrings && typeof value !== "string") {
            bundledStrings2 = [];
            bundledStrings2.size = Infinity;
          } else bundledStrings2 = null;
          structures = packr.structures;
          if (structures) {
            if (structures.uninitialized)
              structures = packr._mergeStructures(packr.getStructures());
            let sharedLength = structures.sharedLength || 0;
            if (sharedLength > maxSharedStructures) {
              throw new Error(
                "Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " +
                  structures.sharedLength,
              );
            }
            if (!structures.transitions) {
              structures.transitions = /* @__PURE__ */ Object.create(null);
              for (let i = 0; i < sharedLength; i++) {
                let keys = structures[i];
                if (!keys) continue;
                let nextTransition,
                  transition = structures.transitions;
                for (let j = 0, l = keys.length; j < l; j++) {
                  let key = keys[j];
                  nextTransition = transition[key];
                  if (!nextTransition) {
                    nextTransition = transition[key] =
                      /* @__PURE__ */ Object.create(null);
                  }
                  transition = nextTransition;
                }
                transition[RECORD_SYMBOL] = i + 64;
              }
              this.lastNamedStructuresLength = sharedLength;
            }
            if (!isSequential) {
              structures.nextId = sharedLength + 64;
            }
          }
          if (hasSharedUpdate) hasSharedUpdate = false;
          let encodingError;
          try {
            if (
              packr.randomAccessStructure &&
              value &&
              value.constructor &&
              value.constructor === Object
            )
              writeStruct(value);
            else pack2(value);
            let lastBundle = bundledStrings2;
            if (bundledStrings2) writeBundles(start, pack2, 0);
            if (referenceMap2 && referenceMap2.idsToInsert) {
              let idsToInsert = referenceMap2.idsToInsert.sort((a, b) =>
                a.offset > b.offset ? 1 : -1,
              );
              let i = idsToInsert.length;
              let incrementPosition = -1;
              while (lastBundle && i > 0) {
                let insertionPoint = idsToInsert[--i].offset + start;
                if (
                  insertionPoint < lastBundle.stringsPosition + start &&
                  incrementPosition === -1
                )
                  incrementPosition = 0;
                if (insertionPoint > lastBundle.position + start) {
                  if (incrementPosition >= 0) incrementPosition += 6;
                } else {
                  if (incrementPosition >= 0) {
                    targetView.setUint32(
                      lastBundle.position + start,
                      targetView.getUint32(lastBundle.position + start) +
                        incrementPosition,
                    );
                    incrementPosition = -1;
                  }
                  lastBundle = lastBundle.previous;
                  i++;
                }
              }
              if (incrementPosition >= 0 && lastBundle) {
                targetView.setUint32(
                  lastBundle.position + start,
                  targetView.getUint32(lastBundle.position + start) +
                    incrementPosition,
                );
              }
              position2 += idsToInsert.length * 6;
              if (position2 > safeEnd) makeRoom(position2);
              packr.offset = position2;
              let serialized = insertIds(
                target.subarray(start, position2),
                idsToInsert,
              );
              referenceMap2 = null;
              return serialized;
            }
            packr.offset = position2;
            if (encodeOptions & REUSE_BUFFER_MODE) {
              target.start = start;
              target.end = position2;
              return target;
            }
            return target.subarray(start, position2);
          } catch (error) {
            encodingError = error;
            throw error;
          } finally {
            if (structures) {
              resetStructures();
              if (hasSharedUpdate && packr.saveStructures) {
                let sharedLength = structures.sharedLength || 0;
                let returnBuffer = target.subarray(start, position2);
                let newSharedData = prepareStructures(structures, packr);
                if (!encodingError) {
                  if (
                    packr.saveStructures(
                      newSharedData,
                      newSharedData.isCompatible,
                    ) === false
                  ) {
                    return packr.pack(value, encodeOptions);
                  }
                  packr.lastNamedStructuresLength = sharedLength;
                  if (target.length > 1073741824) target = null;
                  return returnBuffer;
                }
              }
            }
            if (target.length > 1073741824) target = null;
            if (encodeOptions & RESET_BUFFER_MODE) position2 = start;
          }
        };
        const resetStructures = () => {
          if (serializationsSinceTransitionRebuild < 10)
            serializationsSinceTransitionRebuild++;
          let sharedLength = structures.sharedLength || 0;
          if (structures.length > sharedLength && !isSequential)
            structures.length = sharedLength;
          if (transitionsCount > 1e4) {
            structures.transitions = null;
            serializationsSinceTransitionRebuild = 0;
            transitionsCount = 0;
            if (recordIdsToRemove.length > 0) recordIdsToRemove = [];
          } else if (recordIdsToRemove.length > 0 && !isSequential) {
            for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
              recordIdsToRemove[i][RECORD_SYMBOL] = 0;
            }
            recordIdsToRemove = [];
          }
        };
        const packArray = (value) => {
          var length = value.length;
          if (length < 16) {
            target[position2++] = 144 | length;
          } else if (length < 65536) {
            target[position2++] = 220;
            target[position2++] = length >> 8;
            target[position2++] = length & 255;
          } else {
            target[position2++] = 221;
            targetView.setUint32(position2, length);
            position2 += 4;
          }
          for (let i = 0; i < length; i++) {
            pack2(value[i]);
          }
        };
        const pack2 = (value) => {
          if (position2 > safeEnd) target = makeRoom(position2);
          var type = typeof value;
          var length;
          if (type === "string") {
            let strLength = value.length;
            if (bundledStrings2 && strLength >= 4 && strLength < 4096) {
              if ((bundledStrings2.size += strLength) > MAX_BUNDLE_SIZE) {
                let extStart;
                let maxBytes2 =
                  (bundledStrings2[0]
                    ? bundledStrings2[0].length * 3 + bundledStrings2[1].length
                    : 0) + 10;
                if (position2 + maxBytes2 > safeEnd)
                  target = makeRoom(position2 + maxBytes2);
                let lastBundle;
                if (bundledStrings2.position) {
                  lastBundle = bundledStrings2;
                  target[position2] = 200;
                  position2 += 3;
                  target[position2++] = 98;
                  extStart = position2 - start;
                  position2 += 4;
                  writeBundles(start, pack2, 0);
                  targetView.setUint16(
                    extStart + start - 3,
                    position2 - start - extStart,
                  );
                } else {
                  target[position2++] = 214;
                  target[position2++] = 98;
                  extStart = position2 - start;
                  position2 += 4;
                }
                bundledStrings2 = ["", ""];
                bundledStrings2.previous = lastBundle;
                bundledStrings2.size = 0;
                bundledStrings2.position = extStart;
              }
              let twoByte = hasNonLatin.test(value);
              bundledStrings2[twoByte ? 0 : 1] += value;
              target[position2++] = 193;
              pack2(twoByte ? -strLength : strLength);
              return;
            }
            let headerSize;
            if (strLength < 32) {
              headerSize = 1;
            } else if (strLength < 256) {
              headerSize = 2;
            } else if (strLength < 65536) {
              headerSize = 3;
            } else {
              headerSize = 5;
            }
            let maxBytes = strLength * 3;
            if (position2 + maxBytes > safeEnd)
              target = makeRoom(position2 + maxBytes);
            if (strLength < 64 || !encodeUtf8) {
              let i,
                c1,
                c2,
                strPosition = position2 + headerSize;
              for (i = 0; i < strLength; i++) {
                c1 = value.charCodeAt(i);
                if (c1 < 128) {
                  target[strPosition++] = c1;
                } else if (c1 < 2048) {
                  target[strPosition++] = (c1 >> 6) | 192;
                  target[strPosition++] = (c1 & 63) | 128;
                } else if (
                  (c1 & 64512) === 55296 &&
                  ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320
                ) {
                  c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
                  i++;
                  target[strPosition++] = (c1 >> 18) | 240;
                  target[strPosition++] = ((c1 >> 12) & 63) | 128;
                  target[strPosition++] = ((c1 >> 6) & 63) | 128;
                  target[strPosition++] = (c1 & 63) | 128;
                } else {
                  target[strPosition++] = (c1 >> 12) | 224;
                  target[strPosition++] = ((c1 >> 6) & 63) | 128;
                  target[strPosition++] = (c1 & 63) | 128;
                }
              }
              length = strPosition - position2 - headerSize;
            } else {
              length = encodeUtf8(value, position2 + headerSize);
            }
            if (length < 32) {
              target[position2++] = 160 | length;
            } else if (length < 256) {
              if (headerSize < 2) {
                target.copyWithin(
                  position2 + 2,
                  position2 + 1,
                  position2 + 1 + length,
                );
              }
              target[position2++] = 217;
              target[position2++] = length;
            } else if (length < 65536) {
              if (headerSize < 3) {
                target.copyWithin(
                  position2 + 3,
                  position2 + 2,
                  position2 + 2 + length,
                );
              }
              target[position2++] = 218;
              target[position2++] = length >> 8;
              target[position2++] = length & 255;
            } else {
              if (headerSize < 5) {
                target.copyWithin(
                  position2 + 5,
                  position2 + 3,
                  position2 + 3 + length,
                );
              }
              target[position2++] = 219;
              targetView.setUint32(position2, length);
              position2 += 4;
            }
            position2 += length;
          } else if (type === "number") {
            if (value >>> 0 === value) {
              if (
                value < 32 ||
                (value < 128 && this.useRecords === false) ||
                (value < 64 && !this.randomAccessStructure)
              ) {
                target[position2++] = value;
              } else if (value < 256) {
                target[position2++] = 204;
                target[position2++] = value;
              } else if (value < 65536) {
                target[position2++] = 205;
                target[position2++] = value >> 8;
                target[position2++] = value & 255;
              } else {
                target[position2++] = 206;
                targetView.setUint32(position2, value);
                position2 += 4;
              }
            } else if (value >> 0 === value) {
              if (value >= -32) {
                target[position2++] = 256 + value;
              } else if (value >= -128) {
                target[position2++] = 208;
                target[position2++] = value + 256;
              } else if (value >= -32768) {
                target[position2++] = 209;
                targetView.setInt16(position2, value);
                position2 += 2;
              } else {
                target[position2++] = 210;
                targetView.setInt32(position2, value);
                position2 += 4;
              }
            } else {
              let useFloat32;
              if (
                (useFloat32 = this.useFloat32) > 0 &&
                value < 4294967296 &&
                value >= -2147483648
              ) {
                target[position2++] = 202;
                targetView.setFloat32(position2, value);
                let xShifted;
                if (
                  useFloat32 < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
                  (xShifted =
                    value *
                    mult10[
                      ((target[position2] & 127) << 1) |
                        (target[position2 + 1] >> 7)
                    ]) >>
                    0 ===
                    xShifted
                ) {
                  position2 += 4;
                  return;
                } else position2--;
              }
              target[position2++] = 203;
              targetView.setFloat64(position2, value);
              position2 += 8;
            }
          } else if (type === "object" || type === "function") {
            if (!value) target[position2++] = 192;
            else {
              if (referenceMap2) {
                let referee = referenceMap2.get(value);
                if (referee) {
                  if (!referee.id) {
                    let idsToInsert =
                      referenceMap2.idsToInsert ||
                      (referenceMap2.idsToInsert = []);
                    referee.id = idsToInsert.push(referee);
                  }
                  target[position2++] = 214;
                  target[position2++] = 112;
                  targetView.setUint32(position2, referee.id);
                  position2 += 4;
                  return;
                } else referenceMap2.set(value, { offset: position2 - start });
              }
              let constructor = value.constructor;
              if (constructor === Object) {
                writeObject(value);
              } else if (constructor === Array) {
                packArray(value);
              } else if (constructor === Map) {
                if (this.mapAsEmptyObject) target[position2++] = 128;
                else {
                  length = value.size;
                  if (length < 16) {
                    target[position2++] = 128 | length;
                  } else if (length < 65536) {
                    target[position2++] = 222;
                    target[position2++] = length >> 8;
                    target[position2++] = length & 255;
                  } else {
                    target[position2++] = 223;
                    targetView.setUint32(position2, length);
                    position2 += 4;
                  }
                  for (let [key, entryValue] of value) {
                    pack2(key);
                    pack2(entryValue);
                  }
                }
              } else {
                for (let i = 0, l = extensions.length; i < l; i++) {
                  let extensionClass = extensionClasses[i];
                  if (value instanceof extensionClass) {
                    let extension = extensions[i];
                    if (extension.write) {
                      if (extension.type) {
                        target[position2++] = 212;
                        target[position2++] = extension.type;
                        target[position2++] = 0;
                      }
                      let writeResult = extension.write.call(this, value);
                      if (writeResult === value) {
                        if (Array.isArray(value)) {
                          packArray(value);
                        } else {
                          writeObject(value);
                        }
                      } else {
                        pack2(writeResult);
                      }
                      return;
                    }
                    let currentTarget = target;
                    let currentTargetView = targetView;
                    let currentPosition = position2;
                    target = null;
                    let result;
                    try {
                      result = extension.pack.call(
                        this,
                        value,
                        (size) => {
                          target = currentTarget;
                          currentTarget = null;
                          position2 += size;
                          if (position2 > safeEnd) makeRoom(position2);
                          return {
                            target,
                            targetView,
                            position: position2 - size,
                          };
                        },
                        pack2,
                      );
                    } finally {
                      if (currentTarget) {
                        target = currentTarget;
                        targetView = currentTargetView;
                        position2 = currentPosition;
                        safeEnd = target.length - 10;
                      }
                    }
                    if (result) {
                      if (result.length + position2 > safeEnd)
                        makeRoom(result.length + position2);
                      position2 = writeExtensionData(
                        result,
                        target,
                        position2,
                        extension.type,
                      );
                    }
                    return;
                  }
                }
                if (Array.isArray(value)) {
                  packArray(value);
                } else {
                  if (value.toJSON) {
                    const json = value.toJSON();
                    if (json !== value) return pack2(json);
                  }
                  if (type === "function")
                    return pack2(
                      this.writeFunction && this.writeFunction(value),
                    );
                  writeObject(value);
                }
              }
            }
          } else if (type === "boolean") {
            target[position2++] = value ? 195 : 194;
          } else if (type === "bigint") {
            if (
              value < BigInt(1) << BigInt(63) &&
              value >= -(BigInt(1) << BigInt(63))
            ) {
              target[position2++] = 211;
              targetView.setBigInt64(position2, value);
            } else if (value < BigInt(1) << BigInt(64) && value > 0) {
              target[position2++] = 207;
              targetView.setBigUint64(position2, value);
            } else {
              if (this.largeBigIntToFloat) {
                target[position2++] = 203;
                targetView.setFloat64(position2, Number(value));
              } else if (this.largeBigIntToString) {
                return pack2(value.toString());
              } else if (
                this.useBigIntExtension &&
                value < BigInt(2) ** BigInt(1023) &&
                value > -(BigInt(2) ** BigInt(1023))
              ) {
                target[position2++] = 199;
                position2++;
                target[position2++] = 66;
                let bytes = [];
                let alignedSign;
                do {
                  let byte = value & BigInt(255);
                  alignedSign =
                    (byte & BigInt(128)) ===
                    (value < BigInt(0) ? BigInt(128) : BigInt(0));
                  bytes.push(byte);
                  value >>= BigInt(8);
                } while (
                  !(
                    (value === BigInt(0) || value === BigInt(-1)) &&
                    alignedSign
                  )
                );
                target[position2 - 2] = bytes.length;
                for (let i = bytes.length; i > 0; ) {
                  target[position2++] = Number(bytes[--i]);
                }
                return;
              } else {
                throw new RangeError(
                  value +
                    " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string",
                );
              }
            }
            position2 += 8;
          } else if (type === "undefined") {
            if (this.encodeUndefinedAsNil) target[position2++] = 192;
            else {
              target[position2++] = 212;
              target[position2++] = 0;
              target[position2++] = 0;
            }
          } else {
            throw new Error("Unknown type: " + type);
          }
        };
        const writePlainObject =
          this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues
            ? (object) => {
                let keys;
                if (this.skipValues) {
                  keys = [];
                  for (let key2 in object) {
                    if (
                      (typeof object.hasOwnProperty !== "function" ||
                        object.hasOwnProperty(key2)) &&
                      !this.skipValues.includes(object[key2])
                    )
                      keys.push(key2);
                  }
                } else {
                  keys = Object.keys(object);
                }
                let length = keys.length;
                if (length < 16) {
                  target[position2++] = 128 | length;
                } else if (length < 65536) {
                  target[position2++] = 222;
                  target[position2++] = length >> 8;
                  target[position2++] = length & 255;
                } else {
                  target[position2++] = 223;
                  targetView.setUint32(position2, length);
                  position2 += 4;
                }
                let key;
                if (this.coercibleKeyAsNumber) {
                  for (let i = 0; i < length; i++) {
                    key = keys[i];
                    let num = Number(key);
                    pack2(isNaN(num) ? key : num);
                    pack2(object[key]);
                  }
                } else {
                  for (let i = 0; i < length; i++) {
                    pack2((key = keys[i]));
                    pack2(object[key]);
                  }
                }
              }
            : (object) => {
                target[position2++] = 222;
                let objectOffset = position2 - start;
                position2 += 2;
                let size = 0;
                for (let key in object) {
                  if (
                    typeof object.hasOwnProperty !== "function" ||
                    object.hasOwnProperty(key)
                  ) {
                    pack2(key);
                    pack2(object[key]);
                    size++;
                  }
                }
                if (size > 65535) {
                  throw new Error(
                    'Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object',
                  );
                }
                target[objectOffset++ + start] = size >> 8;
                target[objectOffset + start] = size & 255;
              };
        const writeRecord =
          this.useRecords === false
            ? writePlainObject
            : options.progressiveRecords && !useTwoByteRecords
              ? // this is about 2% faster for highly stable structures, since it only requires one for-in loop (but much more expensive when new structure needs to be written)
                (object) => {
                  let nextTransition,
                    transition =
                      structures.transitions ||
                      (structures.transitions =
                        /* @__PURE__ */ Object.create(null));
                  let objectOffset = position2++ - start;
                  let wroteKeys;
                  for (let key in object) {
                    if (
                      typeof object.hasOwnProperty !== "function" ||
                      object.hasOwnProperty(key)
                    ) {
                      nextTransition = transition[key];
                      if (nextTransition) transition = nextTransition;
                      else {
                        let keys = Object.keys(object);
                        let lastTransition = transition;
                        transition = structures.transitions;
                        let newTransitions = 0;
                        for (let i = 0, l = keys.length; i < l; i++) {
                          let key2 = keys[i];
                          nextTransition = transition[key2];
                          if (!nextTransition) {
                            nextTransition = transition[key2] =
                              /* @__PURE__ */ Object.create(null);
                            newTransitions++;
                          }
                          transition = nextTransition;
                        }
                        if (objectOffset + start + 1 == position2) {
                          position2--;
                          newRecord(transition, keys, newTransitions);
                        } else
                          insertNewRecord(
                            transition,
                            keys,
                            objectOffset,
                            newTransitions,
                          );
                        wroteKeys = true;
                        transition = lastTransition[key];
                      }
                      pack2(object[key]);
                    }
                  }
                  if (!wroteKeys) {
                    let recordId = transition[RECORD_SYMBOL];
                    if (recordId) target[objectOffset + start] = recordId;
                    else
                      insertNewRecord(
                        transition,
                        Object.keys(object),
                        objectOffset,
                        0,
                      );
                  }
                }
              : (object) => {
                  let nextTransition,
                    transition =
                      structures.transitions ||
                      (structures.transitions =
                        /* @__PURE__ */ Object.create(null));
                  let newTransitions = 0;
                  for (let key in object)
                    if (
                      typeof object.hasOwnProperty !== "function" ||
                      object.hasOwnProperty(key)
                    ) {
                      nextTransition = transition[key];
                      if (!nextTransition) {
                        nextTransition = transition[key] =
                          /* @__PURE__ */ Object.create(null);
                        newTransitions++;
                      }
                      transition = nextTransition;
                    }
                  let recordId = transition[RECORD_SYMBOL];
                  if (recordId) {
                    if (recordId >= 96 && useTwoByteRecords) {
                      target[position2++] = ((recordId -= 96) & 31) + 96;
                      target[position2++] = recordId >> 5;
                    } else target[position2++] = recordId;
                  } else {
                    newRecord(
                      transition,
                      transition.__keys__ || Object.keys(object),
                      newTransitions,
                    );
                  }
                  for (let key in object)
                    if (
                      typeof object.hasOwnProperty !== "function" ||
                      object.hasOwnProperty(key)
                    ) {
                      pack2(object[key]);
                    }
                };
        const checkUseRecords =
          typeof this.useRecords == "function" && this.useRecords;
        const writeObject = checkUseRecords
          ? (object) => {
              checkUseRecords(object)
                ? writeRecord(object)
                : writePlainObject(object);
            }
          : writeRecord;
        const makeRoom = (end) => {
          let newSize;
          if (end > 16777216) {
            if (end - start > MAX_BUFFER_SIZE)
              throw new Error(
                "Packed buffer would be larger than maximum buffer size",
              );
            newSize = Math.min(
              MAX_BUFFER_SIZE,
              Math.round(
                Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) /
                  4096,
              ) * 4096,
            );
          } else
            newSize =
              ((Math.max((end - start) << 2, target.length - 1) >> 12) + 1) <<
              12;
          let newBuffer = new ByteArrayAllocate(newSize);
          targetView =
            newBuffer.dataView ||
            (newBuffer.dataView = new DataView(newBuffer.buffer, 0, newSize));
          end = Math.min(end, target.length);
          if (target.copy) target.copy(newBuffer, 0, start, end);
          else newBuffer.set(target.slice(start, end));
          position2 -= start;
          start = 0;
          safeEnd = newBuffer.length - 10;
          return (target = newBuffer);
        };
        const newRecord = (transition, keys, newTransitions) => {
          let recordId = structures.nextId;
          if (!recordId) recordId = 64;
          if (
            recordId < sharedLimitId &&
            this.shouldShareStructure &&
            !this.shouldShareStructure(keys)
          ) {
            recordId = structures.nextOwnId;
            if (!(recordId < maxStructureId)) recordId = sharedLimitId;
            structures.nextOwnId = recordId + 1;
          } else {
            if (recordId >= maxStructureId) recordId = sharedLimitId;
            structures.nextId = recordId + 1;
          }
          let highByte = (keys.highByte =
            recordId >= 96 && useTwoByteRecords ? (recordId - 96) >> 5 : -1);
          transition[RECORD_SYMBOL] = recordId;
          transition.__keys__ = keys;
          structures[recordId - 64] = keys;
          if (recordId < sharedLimitId) {
            keys.isShared = true;
            structures.sharedLength = recordId - 63;
            hasSharedUpdate = true;
            if (highByte >= 0) {
              target[position2++] = (recordId & 31) + 96;
              target[position2++] = highByte;
            } else {
              target[position2++] = recordId;
            }
          } else {
            if (highByte >= 0) {
              target[position2++] = 213;
              target[position2++] = 114;
              target[position2++] = (recordId & 31) + 96;
              target[position2++] = highByte;
            } else {
              target[position2++] = 212;
              target[position2++] = 114;
              target[position2++] = recordId;
            }
            if (newTransitions)
              transitionsCount +=
                serializationsSinceTransitionRebuild * newTransitions;
            if (recordIdsToRemove.length >= maxOwnStructures)
              recordIdsToRemove.shift()[RECORD_SYMBOL] = 0;
            recordIdsToRemove.push(transition);
            pack2(keys);
          }
        };
        const insertNewRecord = (
          transition,
          keys,
          insertionOffset,
          newTransitions,
        ) => {
          let mainTarget = target;
          let mainPosition = position2;
          let mainSafeEnd = safeEnd;
          let mainStart = start;
          target = keysTarget;
          position2 = 0;
          start = 0;
          if (!target) keysTarget = target = new ByteArrayAllocate(8192);
          safeEnd = target.length - 10;
          newRecord(transition, keys, newTransitions);
          keysTarget = target;
          let keysPosition = position2;
          target = mainTarget;
          position2 = mainPosition;
          safeEnd = mainSafeEnd;
          start = mainStart;
          if (keysPosition > 1) {
            let newEnd = position2 + keysPosition - 1;
            if (newEnd > safeEnd) makeRoom(newEnd);
            let insertionPosition = insertionOffset + start;
            target.copyWithin(
              insertionPosition + keysPosition,
              insertionPosition + 1,
              position2,
            );
            target.set(keysTarget.slice(0, keysPosition), insertionPosition);
            position2 = newEnd;
          } else {
            target[insertionOffset + start] = keysTarget[0];
          }
        };
        const writeStruct = (object) => {
          let newPosition = writeStructSlots(
            object,
            target,
            start,
            position2,
            structures,
            makeRoom,
            (value, newPosition2, notifySharedUpdate) => {
              if (notifySharedUpdate) return (hasSharedUpdate = true);
              position2 = newPosition2;
              let startTarget = target;
              pack2(value);
              resetStructures();
              if (startTarget !== target) {
                return { position: position2, targetView, target };
              }
              return position2;
            },
            this,
          );
          if (newPosition === 0) return writeObject(object);
          position2 = newPosition;
        };
      }
      useBuffer(buffer) {
        target = buffer;
        target.dataView ||
          (target.dataView = new DataView(
            target.buffer,
            target.byteOffset,
            target.byteLength,
          ));
        position2 = 0;
      }
      set position(value) {
        position2 = value;
      }
      get position() {
        return position2;
      }
      set buffer(buffer) {
        target = buffer;
      }
      get buffer() {
        return target;
      }
      clearSharedData() {
        if (this.structures) this.structures = [];
        if (this.typedStructs) this.typedStructs = [];
      }
    };
    extensionClasses = [
      Date,
      Set,
      Error,
      RegExp,
      ArrayBuffer,
      Object.getPrototypeOf(Uint8Array.prototype).constructor,
      C1Type,
    ];
    extensions = [
      {
        pack(date, allocateForWrite, pack2) {
          let seconds = date.getTime() / 1e3;
          if (
            (this.useTimestamp32 || date.getMilliseconds() === 0) &&
            seconds >= 0 &&
            seconds < 4294967296
          ) {
            let {
              target: target2,
              targetView: targetView2,
              position: position3,
            } = allocateForWrite(6);
            target2[position3++] = 214;
            target2[position3++] = 255;
            targetView2.setUint32(position3, seconds);
          } else if (seconds > 0 && seconds < 4294967296) {
            let {
              target: target2,
              targetView: targetView2,
              position: position3,
            } = allocateForWrite(10);
            target2[position3++] = 215;
            target2[position3++] = 255;
            targetView2.setUint32(
              position3,
              date.getMilliseconds() * 4e6 +
                ((seconds / 1e3 / 4294967296) >> 0),
            );
            targetView2.setUint32(position3 + 4, seconds);
          } else if (isNaN(seconds)) {
            if (this.onInvalidDate) {
              allocateForWrite(0);
              return pack2(this.onInvalidDate());
            }
            let {
              target: target2,
              targetView: targetView2,
              position: position3,
            } = allocateForWrite(3);
            target2[position3++] = 212;
            target2[position3++] = 255;
            target2[position3++] = 255;
          } else {
            let {
              target: target2,
              targetView: targetView2,
              position: position3,
            } = allocateForWrite(15);
            target2[position3++] = 199;
            target2[position3++] = 12;
            target2[position3++] = 255;
            targetView2.setUint32(position3, date.getMilliseconds() * 1e6);
            targetView2.setBigInt64(position3 + 4, BigInt(Math.floor(seconds)));
          }
        },
      },
      {
        pack(set, allocateForWrite, pack2) {
          if (this.setAsEmptyObject) {
            allocateForWrite(0);
            return pack2({});
          }
          let array = Array.from(set);
          let { target: target2, position: position3 } = allocateForWrite(
            this.moreTypes ? 3 : 0,
          );
          if (this.moreTypes) {
            target2[position3++] = 212;
            target2[position3++] = 115;
            target2[position3++] = 0;
          }
          pack2(array);
        },
      },
      {
        pack(error, allocateForWrite, pack2) {
          let { target: target2, position: position3 } = allocateForWrite(
            this.moreTypes ? 3 : 0,
          );
          if (this.moreTypes) {
            target2[position3++] = 212;
            target2[position3++] = 101;
            target2[position3++] = 0;
          }
          pack2([error.name, error.message, error.cause]);
        },
      },
      {
        pack(regex, allocateForWrite, pack2) {
          let { target: target2, position: position3 } = allocateForWrite(
            this.moreTypes ? 3 : 0,
          );
          if (this.moreTypes) {
            target2[position3++] = 212;
            target2[position3++] = 120;
            target2[position3++] = 0;
          }
          pack2([regex.source, regex.flags]);
        },
      },
      {
        pack(arrayBuffer, allocateForWrite) {
          if (this.moreTypes) writeExtBuffer(arrayBuffer, 16, allocateForWrite);
          else
            writeBuffer(
              hasNodeBuffer
                ? Buffer.from(arrayBuffer)
                : new Uint8Array(arrayBuffer),
              allocateForWrite,
            );
        },
      },
      {
        pack(typedArray, allocateForWrite) {
          let constructor = typedArray.constructor;
          if (constructor !== ByteArray && this.moreTypes)
            writeExtBuffer(
              typedArray,
              typedArrays.indexOf(constructor.name),
              allocateForWrite,
            );
          else writeBuffer(typedArray, allocateForWrite);
        },
      },
      {
        pack(c1, allocateForWrite) {
          let { target: target2, position: position3 } = allocateForWrite(1);
          target2[position3] = 193;
        },
      },
    ];
    defaultPackr = new Packr({ useRecords: false });
    pack = defaultPackr.pack;
    encode = defaultPackr.pack;
    Encoder = Packr;
    ({ NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS);
    REUSE_BUFFER_MODE = 512;
    RESET_BUFFER_MODE = 1024;
    RESERVE_START_SPACE = 2048;
  },
});

// node_modules/@colyseus/msgpackr/iterators.js
function packIter(objectIterator, options = {}) {
  if (!objectIterator || typeof objectIterator !== "object") {
    throw new Error(
      "first argument must be an Iterable, Async Iterable, or a Promise for an Async Iterable",
    );
  } else if (typeof objectIterator[Symbol.iterator] === "function") {
    return packIterSync(objectIterator, options);
  } else if (
    typeof objectIterator.then === "function" ||
    typeof objectIterator[Symbol.asyncIterator] === "function"
  ) {
    return packIterAsync(objectIterator, options);
  } else {
    throw new Error(
      "first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a Promise",
    );
  }
}
function* packIterSync(objectIterator, options) {
  const packr = new Packr(options);
  for (const value of objectIterator) {
    yield packr.pack(value);
  }
}
async function* packIterAsync(objectIterator, options) {
  const packr = new Packr(options);
  for await (const value of objectIterator) {
    yield packr.pack(value);
  }
}
function unpackIter(bufferIterator, options = {}) {
  if (!bufferIterator || typeof bufferIterator !== "object") {
    throw new Error(
      "first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a promise",
    );
  }
  const unpackr = new Unpackr(options);
  let incomplete;
  const parser = (chunk) => {
    let yields;
    if (incomplete) {
      chunk = Buffer.concat([incomplete, chunk]);
      incomplete = void 0;
    }
    try {
      yields = unpackr.unpackMultiple(chunk);
    } catch (err) {
      if (err.incomplete) {
        incomplete = chunk.slice(err.lastPosition);
        yields = err.values;
      } else {
        throw err;
      }
    }
    return yields;
  };
  if (typeof bufferIterator[Symbol.iterator] === "function") {
    return (function* iter() {
      for (const value of bufferIterator) {
        yield* parser(value);
      }
    })();
  } else if (typeof bufferIterator[Symbol.asyncIterator] === "function") {
    return (async function* iter() {
      for await (const value of bufferIterator) {
        yield* parser(value);
      }
    })();
  }
}
var decodeIter, encodeIter;
var init_iterators = __esm({
  "node_modules/@colyseus/msgpackr/iterators.js"() {
    init_pack();
    init_unpack();
    decodeIter = unpackIter;
    encodeIter = packIter;
  },
});

// node_modules/@colyseus/msgpackr/index.js
var msgpackr_exports = {};
__export(msgpackr_exports, {
  ALWAYS: () => ALWAYS,
  C1: () => C1,
  DECIMAL_FIT: () => DECIMAL_FIT,
  DECIMAL_ROUND: () => DECIMAL_ROUND,
  Decoder: () => Decoder,
  Encoder: () => Encoder,
  FLOAT32_OPTIONS: () => FLOAT32_OPTIONS,
  NEVER: () => NEVER,
  Packr: () => Packr,
  RESERVE_START_SPACE: () => RESERVE_START_SPACE,
  RESET_BUFFER_MODE: () => RESET_BUFFER_MODE,
  REUSE_BUFFER_MODE: () => REUSE_BUFFER_MODE,
  Unpackr: () => Unpackr,
  addExtension: () => addExtension2,
  clearSource: () => clearSource,
  decode: () => decode,
  decodeIter: () => decodeIter,
  encode: () => encode,
  encodeIter: () => encodeIter,
  isNativeAccelerationEnabled: () => isNativeAccelerationEnabled,
  mapsAsObjects: () => mapsAsObjects,
  pack: () => pack,
  roundFloat32: () => roundFloat32,
  unpack: () => unpack,
  unpackMultiple: () => unpackMultiple,
  useRecords: () => useRecords,
});
var useRecords, mapsAsObjects;
var init_msgpackr = __esm({
  "node_modules/@colyseus/msgpackr/index.js"() {
    init_pack();
    init_unpack();
    init_iterators();
    useRecords = false;
    mapsAsObjects = true;
  },
});

// node_modules/colyseus.js/build/cjs/Room.js
var require_Room = __commonJS({
  "node_modules/colyseus.js/build/cjs/Room.js"(exports) {
    "use strict";
    var Connection = require_Connection();
    var Protocol = require_Protocol();
    var Serializer = require_Serializer();
    var nanoevents = require_nanoevents();
    var signal = require_signal();
    var schema = require_umd();
    var SchemaSerializer = require_SchemaSerializer();
    var Errors = require_Errors();
    var msgpackr = (init_msgpackr(), __toCommonJS(msgpackr_exports));
    var Room = class _Room {
      constructor(name, rootSchema) {
        this.onStateChange = signal.createSignal();
        this.onError = signal.createSignal();
        this.onLeave = signal.createSignal();
        this.onJoin = signal.createSignal();
        this.hasJoined = false;
        this.onMessageHandlers = nanoevents.createNanoEvents();
        this.roomId = null;
        this.name = name;
        this.packr = new msgpackr.Packr();
        this.packr.encode(void 0);
        if (rootSchema) {
          this.serializer = new (Serializer.getSerializer("schema"))();
          this.rootSchema = rootSchema;
          this.serializer.state = new rootSchema();
        }
        this.onError((code, message) => {
          var _a;
          return (_a = console.warn) === null || _a === void 0
            ? void 0
            : _a.call(console, `colyseus.js - onError => (${code}) ${message}`);
        });
        this.onLeave(() => this.removeAllListeners());
      }
      connect(endpoint, devModeCloseCallback, room = this, options, headers) {
        const connection = new Connection.Connection(options.protocol);
        room.connection = connection;
        connection.events.onmessage =
          _Room.prototype.onMessageCallback.bind(room);
        connection.events.onclose = function (e) {
          var _a;
          if (!room.hasJoined) {
            (_a = console.warn) === null || _a === void 0
              ? void 0
              : _a.call(
                  console,
                  `Room connection was closed unexpectedly (${e.code}): ${e.reason}`,
                );
            room.onError.invoke(e.code, e.reason);
            return;
          }
          if (
            e.code === Errors.CloseCode.DEVMODE_RESTART &&
            devModeCloseCallback
          ) {
            devModeCloseCallback();
          } else {
            room.onLeave.invoke(e.code, e.reason);
            room.destroy();
          }
        };
        connection.events.onerror = function (e) {
          var _a;
          (_a = console.warn) === null || _a === void 0
            ? void 0
            : _a.call(console, `Room, onError (${e.code}): ${e.reason}`);
          room.onError.invoke(e.code, e.reason);
        };
        if (options.protocol === "h3") {
          const url = new URL(endpoint);
          connection.connect(url.origin, options);
        } else {
          connection.connect(endpoint, headers);
        }
      }
      leave(consented = true) {
        return new Promise((resolve) => {
          this.onLeave((code) => resolve(code));
          if (this.connection) {
            if (consented) {
              this.packr.buffer[0] = Protocol.Protocol.LEAVE_ROOM;
              this.connection.send(this.packr.buffer.subarray(0, 1));
            } else {
              this.connection.close();
            }
          } else {
            this.onLeave.invoke(Errors.CloseCode.CONSENTED);
          }
        });
      }
      onMessage(type, callback) {
        return this.onMessageHandlers.on(
          this.getMessageHandlerKey(type),
          callback,
        );
      }
      send(type, message) {
        const it = { offset: 1 };
        this.packr.buffer[0] = Protocol.Protocol.ROOM_DATA;
        if (typeof type === "string") {
          schema.encode.string(this.packr.buffer, type, it);
        } else {
          schema.encode.number(this.packr.buffer, type, it);
        }
        this.packr.position = 0;
        const data =
          message !== void 0
            ? this.packr.pack(message, 2048 + it.offset)
            : this.packr.buffer.subarray(0, it.offset);
        this.connection.send(data);
      }
      sendUnreliable(type, message) {
        const it = { offset: 1 };
        this.packr.buffer[0] = Protocol.Protocol.ROOM_DATA;
        if (typeof type === "string") {
          schema.encode.string(this.packr.buffer, type, it);
        } else {
          schema.encode.number(this.packr.buffer, type, it);
        }
        this.packr.position = 0;
        const data =
          message !== void 0
            ? this.packr.pack(message, 2048 + it.offset)
            : this.packr.buffer.subarray(0, it.offset);
        this.connection.sendUnreliable(data);
      }
      sendBytes(type, bytes) {
        const it = { offset: 1 };
        this.packr.buffer[0] = Protocol.Protocol.ROOM_DATA_BYTES;
        if (typeof type === "string") {
          schema.encode.string(this.packr.buffer, type, it);
        } else {
          schema.encode.number(this.packr.buffer, type, it);
        }
        if (bytes.byteLength + it.offset > this.packr.buffer.byteLength) {
          const newBuffer = new Uint8Array(it.offset + bytes.byteLength);
          newBuffer.set(this.packr.buffer);
          this.packr.useBuffer(newBuffer);
        }
        this.packr.buffer.set(bytes, it.offset);
        this.connection.send(
          this.packr.buffer.subarray(0, it.offset + bytes.byteLength),
        );
      }
      get state() {
        return this.serializer.getState();
      }
      removeAllListeners() {
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
        this.onMessageHandlers.events = {};
        if (this.serializer instanceof SchemaSerializer.SchemaSerializer) {
          this.serializer.decoder.root.callbacks = {};
        }
      }
      onMessageCallback(event) {
        const buffer = new Uint8Array(event.data);
        const it = { offset: 1 };
        const code = buffer[0];
        if (code === Protocol.Protocol.JOIN_ROOM) {
          const reconnectionToken = schema.decode.utf8Read(
            buffer,
            it,
            buffer[it.offset++],
          );
          this.serializerId = schema.decode.utf8Read(
            buffer,
            it,
            buffer[it.offset++],
          );
          if (!this.serializer) {
            const serializer = Serializer.getSerializer(this.serializerId);
            this.serializer = new serializer();
          }
          if (buffer.byteLength > it.offset && this.serializer.handshake) {
            this.serializer.handshake(buffer, it);
          }
          this.reconnectionToken = `${this.roomId}:${reconnectionToken}`;
          this.hasJoined = true;
          this.onJoin.invoke();
          this.packr.buffer[0] = Protocol.Protocol.JOIN_ROOM;
          this.connection.send(this.packr.buffer.subarray(0, 1));
        } else if (code === Protocol.Protocol.ERROR) {
          const code2 = schema.decode.number(buffer, it);
          const message = schema.decode.string(buffer, it);
          this.onError.invoke(code2, message);
        } else if (code === Protocol.Protocol.LEAVE_ROOM) {
          this.leave();
        } else if (code === Protocol.Protocol.ROOM_STATE) {
          this.serializer.setState(buffer, it);
          this.onStateChange.invoke(this.serializer.getState());
        } else if (code === Protocol.Protocol.ROOM_STATE_PATCH) {
          this.serializer.patch(buffer, it);
          this.onStateChange.invoke(this.serializer.getState());
        } else if (code === Protocol.Protocol.ROOM_DATA) {
          const type = schema.decode.stringCheck(buffer, it)
            ? schema.decode.string(buffer, it)
            : schema.decode.number(buffer, it);
          const message =
            buffer.byteLength > it.offset
              ? msgpackr.unpack(buffer, { start: it.offset })
              : void 0;
          this.dispatchMessage(type, message);
        } else if (code === Protocol.Protocol.ROOM_DATA_BYTES) {
          const type = schema.decode.stringCheck(buffer, it)
            ? schema.decode.string(buffer, it)
            : schema.decode.number(buffer, it);
          this.dispatchMessage(type, buffer.subarray(it.offset));
        }
      }
      dispatchMessage(type, message) {
        var _a;
        const messageType = this.getMessageHandlerKey(type);
        if (this.onMessageHandlers.events[messageType]) {
          this.onMessageHandlers.emit(messageType, message);
        } else if (this.onMessageHandlers.events["*"]) {
          this.onMessageHandlers.emit("*", type, message);
        } else {
          (_a = console.warn) === null || _a === void 0
            ? void 0
            : _a.call(
                console,
                `colyseus.js: onMessage() not registered for type '${type}'.`,
              );
        }
      }
      destroy() {
        if (this.serializer) {
          this.serializer.teardown();
        }
      }
      getMessageHandlerKey(type) {
        switch (typeof type) {
          // string
          case "string":
            return type;
          // number
          case "number":
            return `i${type}`;
          default:
            throw new Error("invalid message type.");
        }
      }
    };
    exports.Room = Room;
  },
});

// node_modules/@colyseus/httpie/xhr/index.mjs
var xhr_exports = {};
__export(xhr_exports, {
  del: () => del,
  get: () => get,
  patch: () => patch,
  post: () => post,
  put: () => put,
  send: () => send,
});
function apply(src2, tar) {
  tar.headers = src2.headers || {};
  tar.statusMessage = src2.statusText;
  tar.statusCode = src2.status;
  tar.data = src2.response;
}
function send(method, uri, opts) {
  return new Promise(function (res, rej) {
    opts = opts || {};
    var req = new XMLHttpRequest();
    var k,
      tmp,
      arr,
      str = opts.body;
    var headers = opts.headers || {};
    if (opts.timeout) req.timeout = opts.timeout;
    req.ontimeout = req.onerror = function (err) {
      err.timeout = err.type == "timeout";
      rej(err);
    };
    req.onabort = function (err) {
      err.aborted = true;
      rej(err);
    };
    req.open(method, uri.href || uri);
    req.onload = function () {
      arr = req
        .getAllResponseHeaders()
        .trim()
        .split(/[\r\n]+/);
      apply(req, req);
      while ((tmp = arr.shift())) {
        tmp = tmp.split(": ");
        req.headers[tmp.shift().toLowerCase()] = tmp.join(": ");
      }
      tmp = req.headers["content-type"];
      if (tmp && !!~tmp.indexOf("application/json")) {
        try {
          req.data = JSON.parse(req.data, opts.reviver);
        } catch (err) {
          apply(req, err);
          return rej(err);
        }
      }
      (req.status >= 400 ? rej : res)(req);
    };
    if (typeof FormData < "u" && str instanceof FormData) {
    } else if (str && typeof str == "object") {
      headers["content-type"] = "application/json";
      str = JSON.stringify(str);
    }
    req.withCredentials = !!opts.withCredentials;
    for (k in headers) {
      req.setRequestHeader(k, headers[k]);
    }
    req.send(str);
    if (opts.signal) {
      opts.signal.addEventListener("abort", function () {
        req.abort();
      });
    }
  });
}
var get, post, patch, del, put;
var init_xhr = __esm({
  "node_modules/@colyseus/httpie/xhr/index.mjs"() {
    get = send.bind(send, "GET");
    post = send.bind(send, "POST");
    patch = send.bind(send, "PATCH");
    del = send.bind(send, "DELETE");
    put = send.bind(send, "PUT");
  },
});

// node_modules/colyseus.js/build/cjs/HTTP.js
var require_HTTP = __commonJS({
  "node_modules/colyseus.js/build/cjs/HTTP.js"(exports) {
    "use strict";
    var Errors = require_Errors();
    var httpie = (init_xhr(), __toCommonJS(xhr_exports));
    function _interopNamespaceDefault(e) {
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function (k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(
              n,
              k,
              d.get
                ? d
                : {
                    enumerable: true,
                    get: function () {
                      return e[k];
                    },
                  },
            );
          }
        });
      }
      n.default = e;
      return Object.freeze(n);
    }
    var httpie__namespace = _interopNamespaceDefault(httpie);
    var HTTP = class {
      constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
      }
      get(path, options = {}) {
        return this.request("get", path, options);
      }
      post(path, options = {}) {
        return this.request("post", path, options);
      }
      del(path, options = {}) {
        return this.request("del", path, options);
      }
      put(path, options = {}) {
        return this.request("put", path, options);
      }
      request(method, path, options = {}) {
        return httpie__namespace[method](
          this.client["getHttpEndpoint"](path),
          this.getOptions(options),
        ).catch((e) => {
          var _a;
          if (e.aborted) {
            throw new Errors.AbortError("Request aborted");
          }
          const status = e.statusCode;
          const message =
            ((_a = e.data) === null || _a === void 0 ? void 0 : _a.error) ||
            e.statusMessage ||
            e.message;
          if (!status && !message) {
            throw e;
          }
          throw new Errors.ServerError(status, message);
        });
      }
      getOptions(options) {
        options.headers = Object.assign({}, this.headers, options.headers);
        if (this.authToken) {
          options.headers["Authorization"] = `Bearer ${this.authToken}`;
        }
        if (typeof cc !== "undefined" && cc.sys && cc.sys.isNative);
        else {
          options.withCredentials = true;
        }
        return options;
      }
    };
    exports.HTTP = HTTP;
  },
});

// node_modules/colyseus.js/build/cjs/Storage.js
var require_Storage = __commonJS({
  "node_modules/colyseus.js/build/cjs/Storage.js"(exports) {
    "use strict";
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var storage;
    function getStorage() {
      if (!storage) {
        try {
          storage =
            typeof cc !== "undefined" && cc.sys && cc.sys.localStorage
              ? cc.sys.localStorage
              : window.localStorage;
        } catch (e) {}
      }
      if (!storage && typeof globalThis.indexedDB !== "undefined") {
        storage = new IndexedDBStorage();
      }
      if (!storage) {
        storage = {
          cache: {},
          setItem: function (key, value) {
            this.cache[key] = value;
          },
          getItem: function (key) {
            this.cache[key];
          },
          removeItem: function (key) {
            delete this.cache[key];
          },
        };
      }
      return storage;
    }
    function setItem(key, value) {
      getStorage().setItem(key, value);
    }
    function removeItem(key) {
      getStorage().removeItem(key);
    }
    function getItem(key, callback) {
      const value = getStorage().getItem(key);
      if (
        typeof Promise === "undefined" || // old browsers
        !(value instanceof Promise)
      ) {
        callback(value);
      } else {
        value.then((id) => callback(id));
      }
    }
    var IndexedDBStorage = class {
      constructor() {
        this.dbPromise = new Promise((resolve) => {
          const request = indexedDB.open("_colyseus_storage", 1);
          request.onupgradeneeded = () =>
            request.result.createObjectStore("store");
          request.onsuccess = () => resolve(request.result);
        });
      }
      tx(mode, fn) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          const db = yield this.dbPromise;
          const store = db.transaction("store", mode).objectStore("store");
          return fn(store);
        });
      }
      setItem(key, value) {
        return this.tx("readwrite", (store) => store.put(value, key)).then();
      }
      getItem(key) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          const request = yield this.tx("readonly", (store) => store.get(key));
          return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
          });
        });
      }
      removeItem(key) {
        return this.tx("readwrite", (store) => store.delete(key)).then();
      }
    };
    exports.getItem = getItem;
    exports.removeItem = removeItem;
    exports.setItem = setItem;
  },
});

// node_modules/colyseus.js/build/cjs/Auth.js
var require_Auth = __commonJS({
  "node_modules/colyseus.js/build/cjs/Auth.js"(exports) {
    "use strict";
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var Storage = require_Storage();
    var nanoevents = require_nanoevents();
    var _Auth__initialized;
    var _Auth__initializationPromise;
    var _Auth__signInWindow;
    var _Auth__events;
    var Auth = class {
      constructor(http) {
        this.http = http;
        this.settings = {
          path: "/auth",
          key: "colyseus-auth-token",
        };
        _Auth__initialized.set(this, false);
        _Auth__initializationPromise.set(this, void 0);
        _Auth__signInWindow.set(this, void 0);
        _Auth__events.set(this, nanoevents.createNanoEvents());
        Storage.getItem(this.settings.key, (token) => (this.token = token));
      }
      set token(token) {
        this.http.authToken = token;
      }
      get token() {
        return this.http.authToken;
      }
      onChange(callback) {
        const unbindChange = tslib
          .__classPrivateFieldGet(this, _Auth__events, "f")
          .on("change", callback);
        if (!tslib.__classPrivateFieldGet(this, _Auth__initialized, "f")) {
          tslib.__classPrivateFieldSet(
            this,
            _Auth__initializationPromise,
            new Promise((resolve, reject) => {
              this.getUserData()
                .then((userData) => {
                  this.emitChange(
                    Object.assign(Object.assign({}, userData), {
                      token: this.token,
                    }),
                  );
                })
                .catch((e) => {
                  this.emitChange({ user: null, token: void 0 });
                })
                .finally(() => {
                  resolve();
                });
            }),
            "f",
          );
        }
        tslib.__classPrivateFieldSet(this, _Auth__initialized, true, "f");
        return unbindChange;
      }
      getUserData() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          if (this.token) {
            return (yield this.http.get(`${this.settings.path}/userdata`)).data;
          } else {
            throw new Error("missing auth.token");
          }
        });
      }
      registerWithEmailAndPassword(email, password, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          const data = (yield this.http.post(`${this.settings.path}/register`, {
            body: { email, password, options },
          })).data;
          this.emitChange(data);
          return data;
        });
      }
      signInWithEmailAndPassword(email, password) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          const data = (yield this.http.post(`${this.settings.path}/login`, {
            body: { email, password },
          })).data;
          this.emitChange(data);
          return data;
        });
      }
      signInAnonymously(options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          const data = (yield this.http.post(
            `${this.settings.path}/anonymous`,
            {
              body: { options },
            },
          )).data;
          this.emitChange(data);
          return data;
        });
      }
      sendPasswordResetEmail(email) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          return (yield this.http.post(
            `${this.settings.path}/forgot-password`,
            {
              body: { email },
            },
          )).data;
        });
      }
      signInWithProvider(providerName_1) {
        return tslib.__awaiter(
          this,
          arguments,
          void 0,
          function* (providerName, settings = {}) {
            return new Promise((resolve, reject) => {
              const w = settings.width || 480;
              const h = settings.height || 768;
              const upgradingToken = this.token ? `?token=${this.token}` : "";
              const title = `Login with ${providerName[0].toUpperCase() + providerName.substring(1)}`;
              const url = this.http["client"]["getHttpEndpoint"](
                `${settings.prefix || `${this.settings.path}/provider`}/${providerName}${upgradingToken}`,
              );
              const left = screen.width / 2 - w / 2;
              const top = screen.height / 2 - h / 2;
              tslib.__classPrivateFieldSet(
                this,
                _Auth__signInWindow,
                window.open(
                  url,
                  title,
                  "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
                    w +
                    ", height=" +
                    h +
                    ", top=" +
                    top +
                    ", left=" +
                    left,
                ),
                "f",
              );
              const onMessage = (event) => {
                if (event.data.user === void 0 && event.data.token === void 0) {
                  return;
                }
                clearInterval(rejectionChecker);
                tslib
                  .__classPrivateFieldGet(this, _Auth__signInWindow, "f")
                  .close();
                tslib.__classPrivateFieldSet(
                  this,
                  _Auth__signInWindow,
                  void 0,
                  "f",
                );
                window.removeEventListener("message", onMessage);
                if (event.data.error !== void 0) {
                  reject(event.data.error);
                } else {
                  resolve(event.data);
                  this.emitChange(event.data);
                }
              };
              const rejectionChecker = setInterval(() => {
                if (
                  !tslib.__classPrivateFieldGet(
                    this,
                    _Auth__signInWindow,
                    "f",
                  ) ||
                  tslib.__classPrivateFieldGet(this, _Auth__signInWindow, "f")
                    .closed
                ) {
                  tslib.__classPrivateFieldSet(
                    this,
                    _Auth__signInWindow,
                    void 0,
                    "f",
                  );
                  reject("cancelled");
                  window.removeEventListener("message", onMessage);
                }
              }, 200);
              window.addEventListener("message", onMessage);
            });
          },
        );
      }
      signOut() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          this.emitChange({ user: null, token: null });
        });
      }
      emitChange(authData) {
        if (authData.token !== void 0) {
          this.token = authData.token;
          if (authData.token === null) {
            Storage.removeItem(this.settings.key);
          } else {
            Storage.setItem(this.settings.key, authData.token);
          }
        }
        tslib
          .__classPrivateFieldGet(this, _Auth__events, "f")
          .emit("change", authData);
      }
    };
    ((_Auth__initialized = /* @__PURE__ */ new WeakMap()),
      (_Auth__initializationPromise = /* @__PURE__ */ new WeakMap()),
      (_Auth__signInWindow = /* @__PURE__ */ new WeakMap()),
      (_Auth__events = /* @__PURE__ */ new WeakMap()));
    exports.Auth = Auth;
  },
});

// node_modules/colyseus.js/build/cjs/3rd_party/discord.js
var require_discord = __commonJS({
  "node_modules/colyseus.js/build/cjs/3rd_party/discord.js"(exports) {
    "use strict";
    function discordURLBuilder(url) {
      var _a;
      const localHostname =
        ((_a =
          window === null || window === void 0 ? void 0 : window.location) ===
          null || _a === void 0
          ? void 0
          : _a.hostname) || "localhost";
      const remoteHostnameSplitted = url.hostname.split(".");
      const subdomain =
        !url.hostname.includes("trycloudflare.com") && // ignore cloudflared subdomains
        !url.hostname.includes("discordsays.com") && // ignore discordsays.com subdomains
        remoteHostnameSplitted.length > 2
          ? `/${remoteHostnameSplitted[0]}`
          : "";
      return url.pathname.startsWith("/.proxy")
        ? `${url.protocol}//${localHostname}${subdomain}${url.pathname}${url.search}`
        : `${url.protocol}//${localHostname}/.proxy/colyseus${subdomain}${url.pathname}${url.search}`;
    }
    exports.discordURLBuilder = discordURLBuilder;
  },
});

// node_modules/colyseus.js/build/cjs/Client.js
var require_Client = __commonJS({
  "node_modules/colyseus.js/build/cjs/Client.js"(exports) {
    "use strict";
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var Errors = require_Errors();
    var Room = require_Room();
    var HTTP = require_HTTP();
    var Auth = require_Auth();
    var discord = require_discord();
    var _a;
    var MatchMakeError = class _MatchMakeError extends Error {
      constructor(message, code) {
        super(message);
        this.code = code;
        this.name = "MatchMakeError";
        Object.setPrototypeOf(this, _MatchMakeError.prototype);
      }
    };
    var DEFAULT_ENDPOINT =
      typeof window !== "undefined" &&
      typeof ((_a =
        window === null || window === void 0 ? void 0 : window.location) ===
        null || _a === void 0
        ? void 0
        : _a.hostname) !== "undefined"
        ? `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}${window.location.port && `:${window.location.port}`}`
        : "ws://127.0.0.1:2567";
    var Client = class {
      constructor(settings = DEFAULT_ENDPOINT, options) {
        var _a2, _b;
        if (typeof settings === "string") {
          const url = settings.startsWith("/")
            ? new URL(settings, DEFAULT_ENDPOINT)
            : new URL(settings);
          const secure = url.protocol === "https:" || url.protocol === "wss:";
          const port = Number(url.port || (secure ? 443 : 80));
          this.settings = {
            hostname: url.hostname,
            pathname: url.pathname,
            port,
            secure,
            searchParams: url.searchParams.toString() || void 0,
          };
        } else {
          if (settings.port === void 0) {
            settings.port = settings.secure ? 443 : 80;
          }
          if (settings.pathname === void 0) {
            settings.pathname = "";
          }
          this.settings = settings;
        }
        if (this.settings.pathname.endsWith("/")) {
          this.settings.pathname = this.settings.pathname.slice(0, -1);
        }
        this.http = new HTTP.HTTP(
          this,
          (options === null || options === void 0 ? void 0 : options.headers) ||
            {},
        );
        this.auth = new Auth.Auth(this.http);
        this.urlBuilder =
          options === null || options === void 0 ? void 0 : options.urlBuilder;
        if (
          !this.urlBuilder &&
          typeof window !== "undefined" &&
          ((_b =
            (_a2 =
              window === null || window === void 0
                ? void 0
                : window.location) === null || _a2 === void 0
              ? void 0
              : _a2.hostname) === null || _b === void 0
            ? void 0
            : _b.includes("discordsays.com"))
        ) {
          this.urlBuilder = discord.discordURLBuilder;
          console.log(
            "Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder.",
          );
        }
      }
      joinOrCreate(roomName_1) {
        return tslib.__awaiter(
          this,
          arguments,
          void 0,
          function* (roomName, options = {}, rootSchema) {
            return yield this.createMatchMakeRequest(
              "joinOrCreate",
              roomName,
              options,
              rootSchema,
            );
          },
        );
      }
      create(roomName_1) {
        return tslib.__awaiter(
          this,
          arguments,
          void 0,
          function* (roomName, options = {}, rootSchema) {
            return yield this.createMatchMakeRequest(
              "create",
              roomName,
              options,
              rootSchema,
            );
          },
        );
      }
      join(roomName_1) {
        return tslib.__awaiter(
          this,
          arguments,
          void 0,
          function* (roomName, options = {}, rootSchema) {
            return yield this.createMatchMakeRequest(
              "join",
              roomName,
              options,
              rootSchema,
            );
          },
        );
      }
      joinById(roomId_1) {
        return tslib.__awaiter(
          this,
          arguments,
          void 0,
          function* (roomId, options = {}, rootSchema) {
            return yield this.createMatchMakeRequest(
              "joinById",
              roomId,
              options,
              rootSchema,
            );
          },
        );
      }
      /**
       * Re-establish connection with a room this client was previously connected to.
       *
       * @param reconnectionToken The `room.reconnectionToken` from previously connected room.
       * @param rootSchema (optional) Concrete root schema definition
       * @returns Promise<Room>
       */
      reconnect(reconnectionToken, rootSchema) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          if (
            typeof reconnectionToken === "string" &&
            typeof rootSchema === "string"
          ) {
            throw new Error(
              "DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`",
            );
          }
          const [roomId, token] = reconnectionToken.split(":");
          if (!roomId || !token) {
            throw new Error(
              "Invalid reconnection token format.\nThe format should be roomId:reconnectionToken",
            );
          }
          return yield this.createMatchMakeRequest(
            "reconnect",
            roomId,
            { reconnectionToken: token },
            rootSchema,
          );
        });
      }
      consumeSeatReservation(response, rootSchema, reuseRoomInstance) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          const room = this.createRoom(response.room.name, rootSchema);
          room.roomId = response.room.roomId;
          room.sessionId = response.sessionId;
          const options = { sessionId: room.sessionId };
          if (response.reconnectionToken) {
            options.reconnectionToken = response.reconnectionToken;
          }
          const targetRoom = reuseRoomInstance || room;
          room.connect(
            this.buildEndpoint(response.room, options, response.protocol),
            response.devMode &&
              (() =>
                tslib.__awaiter(this, void 0, void 0, function* () {
                  console.info(
                    `[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${room.roomId}'...`,
                  );
                  let retryCount = 0;
                  let retryMaxRetries = 8;
                  const retryReconnection = () =>
                    tslib.__awaiter(this, void 0, void 0, function* () {
                      retryCount++;
                      try {
                        yield this.consumeSeatReservation(
                          response,
                          rootSchema,
                          targetRoom,
                        );
                        console.info(
                          `[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${room.roomId}'`,
                        );
                      } catch (e) {
                        if (retryCount < retryMaxRetries) {
                          console.info(
                            `[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${retryCount} out of ${retryMaxRetries})`,
                          );
                          setTimeout(retryReconnection, 2e3);
                        } else {
                          console.info(
                            `[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`,
                          );
                        }
                      }
                    });
                  setTimeout(retryReconnection, 2e3);
                })),
            targetRoom,
            response,
            this.http.headers,
          );
          return new Promise((resolve, reject) => {
            const onError = (code, message) =>
              reject(new Errors.ServerError(code, message));
            targetRoom.onError.once(onError);
            targetRoom["onJoin"].once(() => {
              targetRoom.onError.remove(onError);
              resolve(targetRoom);
            });
          });
        });
      }
      createMatchMakeRequest(method_1, roomName_1) {
        return tslib.__awaiter(
          this,
          arguments,
          void 0,
          function* (
            method,
            roomName,
            options = {},
            rootSchema,
            reuseRoomInstance,
          ) {
            const response = (yield this.http.post(
              `matchmake/${method}/${roomName}`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(options),
              },
            )).data;
            if (response.error) {
              throw new MatchMakeError(response.error, response.code);
            }
            if (method === "reconnect") {
              response.reconnectionToken = options.reconnectionToken;
            }
            return yield this.consumeSeatReservation(
              response,
              rootSchema,
              reuseRoomInstance,
            );
          },
        );
      }
      createRoom(roomName, rootSchema) {
        return new Room.Room(roomName, rootSchema);
      }
      buildEndpoint(room, options = {}, protocol = "ws") {
        let searchParams = this.settings.searchParams || "";
        if (this.http.authToken) {
          options["_authToken"] = this.http.authToken;
        }
        for (const name in options) {
          if (!options.hasOwnProperty(name)) {
            continue;
          }
          searchParams +=
            (searchParams ? "&" : "") + `${name}=${options[name]}`;
        }
        if (protocol === "h3") {
          protocol = "http";
        }
        let endpoint = this.settings.secure
          ? `${protocol}s://`
          : `${protocol}://`;
        if (room.publicAddress) {
          endpoint += `${room.publicAddress}`;
        } else {
          endpoint += `${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;
        }
        const endpointURL = `${endpoint}/${room.processId}/${room.roomId}?${searchParams}`;
        return this.urlBuilder
          ? this.urlBuilder(new URL(endpointURL))
          : endpointURL;
      }
      getHttpEndpoint(segments = "") {
        const path = segments.startsWith("/") ? segments : `/${segments}`;
        let endpointURL = `${this.settings.secure ? "https" : "http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${path}`;
        if (this.settings.searchParams) {
          endpointURL += `?${this.settings.searchParams}`;
        }
        return this.urlBuilder
          ? this.urlBuilder(new URL(endpointURL))
          : endpointURL;
      }
      getEndpointPort() {
        return this.settings.port !== 80 && this.settings.port !== 443
          ? `:${this.settings.port}`
          : "";
      }
    };
    Client.VERSION = "0.16.22";
    exports.Client = Client;
    exports.MatchMakeError = MatchMakeError;
  },
});

// node_modules/colyseus.js/build/cjs/serializer/NoneSerializer.js
var require_NoneSerializer = __commonJS({
  "node_modules/colyseus.js/build/cjs/serializer/NoneSerializer.js"(exports) {
    "use strict";
    var NoneSerializer = class {
      setState(rawState) {}
      getState() {
        return null;
      }
      patch(patches) {}
      teardown() {}
      handshake(bytes) {}
    };
    exports.NoneSerializer = NoneSerializer;
  },
});

// node_modules/colyseus.js/build/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/colyseus.js/build/cjs/index.js"(exports) {
    require_legacy();
    var Client = require_Client();
    var Protocol = require_Protocol();
    var Room = require_Room();
    var Auth = require_Auth();
    var Errors = require_Errors();
    var SchemaSerializer = require_SchemaSerializer();
    var NoneSerializer = require_NoneSerializer();
    var Serializer = require_Serializer();
    Serializer.registerSerializer("schema", SchemaSerializer.SchemaSerializer);
    Serializer.registerSerializer("none", NoneSerializer.NoneSerializer);
    exports.Client = Client.Client;
    exports.MatchMakeError = Client.MatchMakeError;
    Object.defineProperty(exports, "ErrorCode", {
      enumerable: true,
      get: function () {
        return Protocol.ErrorCode;
      },
    });
    Object.defineProperty(exports, "Protocol", {
      enumerable: true,
      get: function () {
        return Protocol.Protocol;
      },
    });
    exports.Room = Room.Room;
    exports.Auth = Auth.Auth;
    exports.ServerError = Errors.ServerError;
    exports.SchemaSerializer = SchemaSerializer.SchemaSerializer;
    exports.getStateCallbacks = SchemaSerializer.getStateCallbacks;
    exports.registerSerializer = Serializer.registerSerializer;
  },
});
export default require_cjs();
//# sourceMappingURL=colyseus__js.js.map
