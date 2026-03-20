import { require_react_dom } from "./chunk-AZZLBHVG.js";
import { require_react } from "./chunk-LTZIYYLR.js";
import { __commonJS, __toESM } from "./chunk-V4OQ3NZ2.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js
var require_use_sync_external_store_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js"(
    exports,
  ) {
    "use strict";
    (function () {
      function is(x10, y10) {
        return (
          (x10 === y10 && (0 !== x10 || 1 / x10 === 1 / y10)) ||
          (x10 !== x10 && y10 !== y10)
        );
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" ===
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React4 = require_react(),
        objectIs = "function" === typeof Object.is ? Object.is : is,
        useSyncExternalStore = React4.useSyncExternalStore,
        useRef5 = React4.useRef,
        useEffect6 = React4.useEffect,
        useMemo3 = React4.useMemo,
        useDebugValue = React4.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function (
        subscribe,
        getSnapshot,
        getServerSnapshot,
        selector,
        isEqual,
      ) {
        var instRef = useRef5(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo3(
          function () {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return (memoizedSelection = currentSelection);
                }
                return (memoizedSelection = nextSnapshot);
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (
                void 0 !== isEqual &&
                isEqual(currentSelection, nextSelection)
              )
                return ((memoizedSnapshot = nextSnapshot), currentSelection);
              memoizedSnapshot = nextSnapshot;
              return (memoizedSelection = nextSelection);
            }
            var hasMemo = false,
              memoizedSnapshot,
              memoizedSelection,
              maybeGetServerSnapshot =
                void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function () {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot
                ? void 0
                : function () {
                    return memoizedSelector(maybeGetServerSnapshot());
                  },
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual],
        );
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect6(
          function () {
            inst.hasValue = true;
            inst.value = value;
          },
          [value],
        );
        useDebugValue(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" ===
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  },
});

// node_modules/use-sync-external-store/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports =
        require_use_sync_external_store_with_selector_development();
    }
  },
});

// node_modules/@react-aria/utils/dist/useLayoutEffect.mjs
var import_react = __toESM(require_react(), 1);
var $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c =
  typeof document !== "undefined"
    ? (0, import_react.default).useLayoutEffect
    : () => {};

// node_modules/@react-aria/utils/dist/useEffectEvent.mjs
var import_react2 = __toESM(require_react(), 1);
var $8ae05eaa5c114e9c$var$_React_useInsertionEffect;
var $8ae05eaa5c114e9c$var$useEarlyEffect =
  ($8ae05eaa5c114e9c$var$_React_useInsertionEffect = (0, import_react2.default)[
    "useInsertionEffect"
  ]) !== null && $8ae05eaa5c114e9c$var$_React_useInsertionEffect !== void 0
    ? $8ae05eaa5c114e9c$var$_React_useInsertionEffect
    : (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c);
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
  const ref = (0, import_react2.useRef)(null);
  $8ae05eaa5c114e9c$var$useEarlyEffect(() => {
    ref.current = fn;
  }, [fn]);
  return (0, import_react2.useCallback)((...args) => {
    const f21 = ref.current;
    return f21 === null || f21 === void 0 ? void 0 : f21(...args);
  }, []);
}

// node_modules/@react-aria/utils/dist/useValueEffect.mjs
var import_react3 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useId.mjs
var import_react5 = __toESM(require_react(), 1);

// node_modules/@react-aria/ssr/dist/SSRProvider.mjs
var import_react4 = __toESM(require_react(), 1);
var $b5e257d569688ac6$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 1e10)),
  current: 0,
};
var $b5e257d569688ac6$var$SSRContext = (0, import_react4.default).createContext(
  $b5e257d569688ac6$var$defaultContext,
);
var $b5e257d569688ac6$var$IsSSRContext = (0,
import_react4.default).createContext(false);
var $b5e257d569688ac6$var$canUseDOM = Boolean(
  typeof window !== "undefined" &&
    window.document &&
    window.document.createElement,
);
var $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled2 = false) {
  let ctx = (0, import_react4.useContext)($b5e257d569688ac6$var$SSRContext);
  let ref = (0, import_react4.useRef)(null);
  if (ref.current === null && !isDisabled2) {
    var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner,
      _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    let currentOwner =
      (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0,
      import_react4.default)
        .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null ||
      _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0
        ? void 0
        : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner =
              _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) ===
              null ||
            _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner ===
              void 0
          ? void 0
          : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
    if (currentOwner) {
      let prevComponentValue =
        $b5e257d569688ac6$var$componentIds.get(currentOwner);
      if (prevComponentValue == null)
        $b5e257d569688ac6$var$componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState,
        });
      else if (currentOwner.memoizedState !== prevComponentValue.state) {
        ctx.current = prevComponentValue.id;
        $b5e257d569688ac6$var$componentIds.delete(currentOwner);
      }
    }
    ref.current = ++ctx.current;
  }
  return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
  let ctx = (0, import_react4.useContext)($b5e257d569688ac6$var$SSRContext);
  if (
    ctx === $b5e257d569688ac6$var$defaultContext &&
    !$b5e257d569688ac6$var$canUseDOM &&
    true
  )
    console.warn(
      "When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.",
    );
  let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
  let prefix =
    ctx === $b5e257d569688ac6$var$defaultContext && false
      ? "react-aria"
      : `react-aria${ctx.prefix}`;
  return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
  let id = (0, import_react4.default).useId();
  let [didSSR] = (0, import_react4.useState)(
    $b5e257d569688ac6$export$535bd6ca7f90a273(),
  );
  let prefix =
    didSSR || false
      ? "react-aria"
      : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
  return defaultId || `${prefix}-${id}`;
}
var $b5e257d569688ac6$export$619500959fc48b26 =
  typeof (0, import_react4.default)["useId"] === "function"
    ? $b5e257d569688ac6$var$useModernSSRSafeId
    : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
  return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
  return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
  return () => {};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
  if (typeof (0, import_react4.default)["useSyncExternalStore"] === "function")
    return (0, import_react4.default)["useSyncExternalStore"](
      $b5e257d569688ac6$var$subscribe,
      $b5e257d569688ac6$var$getSnapshot,
      $b5e257d569688ac6$var$getServerSnapshot,
    );
  return (0, import_react4.useContext)($b5e257d569688ac6$var$IsSSRContext);
}

// node_modules/@react-aria/utils/dist/useId.mjs
var $bdb11010cef70236$var$canUseDOM = Boolean(
  typeof window !== "undefined" &&
    window.document &&
    window.document.createElement,
);
var $bdb11010cef70236$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
var $bdb11010cef70236$var$registry;
if (typeof FinalizationRegistry !== "undefined")
  $bdb11010cef70236$var$registry = new FinalizationRegistry((heldValue) => {
    $bdb11010cef70236$export$d41a04c74483c6ef.delete(heldValue);
  });
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB) return idA;
  let setIdsA = $bdb11010cef70236$export$d41a04c74483c6ef.get(idA);
  if (setIdsA) {
    setIdsA.forEach((ref) => (ref.current = idB));
    return idB;
  }
  let setIdsB = $bdb11010cef70236$export$d41a04c74483c6ef.get(idB);
  if (setIdsB) {
    setIdsB.forEach((ref) => (ref.current = idA));
    return idA;
  }
  return idB;
}

// node_modules/@react-aria/utils/dist/chain.mjs
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks)
      if (typeof callback === "function") callback(...args);
  };
}

// node_modules/@react-aria/utils/dist/domHelpers.mjs
var $431fbd86ca7dc216$export$b204af158042fbac = (el) => {
  var _el_ownerDocument;
  return (_el_ownerDocument =
    el === null || el === void 0 ? void 0 : el.ownerDocument) !== null &&
    _el_ownerDocument !== void 0
    ? _el_ownerDocument
    : document;
};
var $431fbd86ca7dc216$export$f21a1ffae260145a = (el) => {
  if (el && "window" in el && el.window === el) return el;
  const doc = $431fbd86ca7dc216$export$b204af158042fbac(el);
  return doc.defaultView || window;
};
function $431fbd86ca7dc216$var$isNode(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    "nodeType" in value &&
    typeof value.nodeType === "number"
  );
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
  return (
    $431fbd86ca7dc216$var$isNode(node) &&
    node.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
    "host" in node
  );
}

// node_modules/@react-stately/flags/dist/import.mjs
var $f4e2df6bd15f8569$var$_shadowDOM = false;
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
  return $f4e2df6bd15f8569$var$_shadowDOM;
}

// node_modules/@react-aria/utils/dist/DOMFunctions.mjs
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
  if (!(0, $f4e2df6bd15f8569$export$98658e8c59125e6a)())
    return otherNode && node ? node.contains(otherNode) : false;
  if (!node || !otherNode) return false;
  let currentNode = otherNode;
  while (currentNode !== null) {
    if (currentNode === node) return true;
    if (currentNode.tagName === "SLOT" && currentNode.assignedSlot)
      currentNode = currentNode.assignedSlot.parentNode;
    else if ((0, $431fbd86ca7dc216$export$af51f0f06c0f328a)(currentNode))
      currentNode = currentNode.host;
    else currentNode = currentNode.parentNode;
  }
  return false;
}
var $d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document) => {
  var _activeElement_shadowRoot;
  if (!(0, $f4e2df6bd15f8569$export$98658e8c59125e6a)())
    return doc.activeElement;
  let activeElement2 = doc.activeElement;
  while (
    activeElement2 &&
    "shadowRoot" in activeElement2 &&
    ((_activeElement_shadowRoot = activeElement2.shadowRoot) === null ||
    _activeElement_shadowRoot === void 0
      ? void 0
      : _activeElement_shadowRoot.activeElement)
  )
    activeElement2 = activeElement2.shadowRoot.activeElement;
  return activeElement2;
};
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
  if (
    (0, $f4e2df6bd15f8569$export$98658e8c59125e6a)() &&
    event.target.shadowRoot
  ) {
    if (event.composedPath) return event.composedPath()[0];
  }
  return event.target;
}

// node_modules/clsx/dist/clsx.mjs
function r(e9) {
  var t14,
    f21,
    n17 = "";
  if ("string" == typeof e9 || "number" == typeof e9) n17 += e9;
  else if ("object" == typeof e9)
    if (Array.isArray(e9)) {
      var o20 = e9.length;
      for (t14 = 0; t14 < o20; t14++)
        e9[t14] && (f21 = r(e9[t14])) && (n17 && (n17 += " "), (n17 += f21));
    } else for (f21 in e9) e9[f21] && (n17 && (n17 += " "), (n17 += f21));
  return n17;
}
function clsx() {
  for (var e9, t14, f21 = 0, n17 = "", o20 = arguments.length; f21 < o20; f21++)
    (e9 = arguments[f21]) &&
      (t14 = r(e9)) &&
      (n17 && (n17 += " "), (n17 += t14));
  return n17;
}
var clsx_default = clsx;

// node_modules/@react-aria/utils/dist/mergeProps.mjs
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
  let result = {
    ...args[0],
  };
  for (let i16 = 1; i16 < args.length; i16++) {
    let props = args[i16];
    for (let key in props) {
      let a28 = result[key];
      let b14 = props[key];
      if (
        typeof a28 === "function" &&
        typeof b14 === "function" && // This is a lot faster than a regex.
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) /* 'A' */ >= 65 &&
        key.charCodeAt(2) /* 'Z' */ <= 90
      )
        result[key] = (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(a28, b14);
      else if (
        (key === "className" || key === "UNSAFE_className") &&
        typeof a28 === "string" &&
        typeof b14 === "string"
      )
        result[key] = (0, clsx_default)(a28, b14);
      else if (key === "id" && a28 && b14)
        result.id = (0, $bdb11010cef70236$export$cd8c9cb68f842629)(a28, b14);
      else result[key] = b14 !== void 0 ? b14 : a28;
    }
  }
  return result;
}

// node_modules/@react-aria/utils/dist/mergeRefs.mjs
function $5dc95899b306f630$export$c9058316764c140e(...refs) {
  if (refs.length === 1 && refs[0]) return refs[0];
  return (value) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup2 = $5dc95899b306f630$var$setRef(ref, value);
      hasCleanup || (hasCleanup = typeof cleanup2 == "function");
      return cleanup2;
    });
    if (hasCleanup)
      return () => {
        cleanups.forEach((cleanup2, i16) => {
          if (typeof cleanup2 === "function") cleanup2();
          else $5dc95899b306f630$var$setRef(refs[i16], null);
        });
      };
  };
}
function $5dc95899b306f630$var$setRef(ref, value) {
  if (typeof ref === "function") return ref(value);
  else if (ref != null) ref.current = value;
}

// node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs
function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
  if ($7215afc6de606d6b$var$supportsPreventScroll())
    element.focus({
      preventScroll: true,
    });
  else {
    let scrollableElements =
      $7215afc6de606d6b$var$getScrollableElements(element);
    element.focus();
    $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
  }
}
var $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
  if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
    $7215afc6de606d6b$var$supportsPreventScrollCached = false;
    try {
      let focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          $7215afc6de606d6b$var$supportsPreventScrollCached = true;
          return true;
        },
      });
    } catch {}
  }
  return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
  let parent = element.parentNode;
  let scrollableElements = [];
  let rootScrollingElement =
    document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (
      parent.offsetHeight < parent.scrollHeight ||
      parent.offsetWidth < parent.scrollWidth
    )
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      });
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement)
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    });
  return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
  for (let { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

// node_modules/@react-aria/utils/dist/platform.mjs
function $c87311424ea30a05$var$testUserAgent(re4) {
  var _window_navigator_userAgentData;
  if (typeof window === "undefined" || window.navigator == null) return false;
  let brands =
    (_window_navigator_userAgentData = window.navigator["userAgentData"]) ===
      null || _window_navigator_userAgentData === void 0
      ? void 0
      : _window_navigator_userAgentData.brands;
  return (
    (Array.isArray(brands) && brands.some((brand) => re4.test(brand.brand))) ||
    re4.test(window.navigator.userAgent)
  );
}
function $c87311424ea30a05$var$testPlatform(re4) {
  var _window_navigator_userAgentData;
  return typeof window !== "undefined" && window.navigator != null
    ? re4.test(
        ((_window_navigator_userAgentData =
          window.navigator["userAgentData"]) === null ||
        _window_navigator_userAgentData === void 0
          ? void 0
          : _window_navigator_userAgentData.platform) ||
          window.navigator.platform,
      )
    : false;
}
function $c87311424ea30a05$var$cached(fn) {
  if (false) return fn;
  let res = null;
  return () => {
    if (res == null) res = fn();
    return res;
  };
}
var $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(
  function () {
    return $c87311424ea30a05$var$testPlatform(/^Mac/i);
  },
);
var $c87311424ea30a05$export$186c6964ca17d99 = $c87311424ea30a05$var$cached(
  function () {
    return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
  },
);
var $c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(
  function () {
    return (
      $c87311424ea30a05$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
      ($c87311424ea30a05$export$9ac100e40613ea10() &&
        navigator.maxTouchPoints > 1)
    );
  },
);
var $c87311424ea30a05$export$fedb369cb70207f1 = $c87311424ea30a05$var$cached(
  function () {
    return (
      $c87311424ea30a05$export$186c6964ca17d99() ||
      $c87311424ea30a05$export$7bef049ce92e4224()
    );
  },
);
var $c87311424ea30a05$export$e1865c3bedcd822b = $c87311424ea30a05$var$cached(
  function () {
    return (
      $c87311424ea30a05$export$9ac100e40613ea10() ||
      $c87311424ea30a05$export$fedb369cb70207f1()
    );
  },
);
var $c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(
  function () {
    return (
      $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) &&
      !$c87311424ea30a05$export$6446a186d09e379e()
    );
  },
);
var $c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(
  function () {
    return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
  },
);
var $c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(
  function () {
    return $c87311424ea30a05$var$testUserAgent(/Android/i);
  },
);
var $c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(
  function () {
    return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
  },
);

// node_modules/@react-aria/utils/dist/openLink.mjs
var import_react6 = __toESM(require_react(), 1);
var $ea8dcbcb9ea1b556$var$RouterContext = (0, import_react6.createContext)({
  isNative: true,
  open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
  useHref: (href) => href,
});
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(
  target,
  modifiers,
  setOpening = true,
) {
  var _window_event_type, _window_event;
  let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
  if (
    (0, $c87311424ea30a05$export$b7d78993b74f766d)() &&
    ((_window_event = window.event) === null || _window_event === void 0
      ? void 0
      : (_window_event_type = _window_event.type) === null ||
          _window_event_type === void 0
        ? void 0
        : _window_event_type.startsWith("key")) &&
    target.target === "_blank"
  ) {
    if ((0, $c87311424ea30a05$export$9ac100e40613ea10)()) metaKey = true;
    else ctrlKey = true;
  }
  let event =
    (0, $c87311424ea30a05$export$78551043582a6a98)() &&
    (0, $c87311424ea30a05$export$9ac100e40613ea10)() &&
    !(0, $c87311424ea30a05$export$7bef049ce92e4224)() &&
    true
      ? new KeyboardEvent("keydown", {
          keyIdentifier: "Enter",
          metaKey,
          ctrlKey,
          altKey,
          shiftKey,
        })
      : new MouseEvent("click", {
          metaKey,
          ctrlKey,
          altKey,
          shiftKey,
          bubbles: true,
          cancelable: true,
        });
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening;
  (0, $7215afc6de606d6b$export$de79e2c695e052f3)(target);
  target.dispatchEvent(event);
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
}
$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
function $ea8dcbcb9ea1b556$var$getSyntheticLink(target, open) {
  if (target instanceof HTMLAnchorElement) open(target);
  else if (target.hasAttribute("data-href")) {
    let link = document.createElement("a");
    link.href = target.getAttribute("data-href");
    if (target.hasAttribute("data-target"))
      link.target = target.getAttribute("data-target");
    if (target.hasAttribute("data-rel"))
      link.rel = target.getAttribute("data-rel");
    if (target.hasAttribute("data-download"))
      link.download = target.getAttribute("data-download");
    if (target.hasAttribute("data-ping"))
      link.ping = target.getAttribute("data-ping");
    if (target.hasAttribute("data-referrer-policy"))
      link.referrerPolicy = target.getAttribute("data-referrer-policy");
    target.appendChild(link);
    open(link);
    target.removeChild(link);
  }
}
function $ea8dcbcb9ea1b556$var$openSyntheticLink(target, modifiers) {
  $ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) =>
    $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers),
  );
}

// node_modules/@react-aria/utils/dist/runAfterTransition.mjs
var $bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
var $bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
  if (typeof window === "undefined") return;
  function isTransitionEvent(event) {
    return "propertyName" in event;
  }
  let onTransitionStart = (e9) => {
    if (!isTransitionEvent(e9) || !e9.target) return;
    let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e9.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set();
      $bbed8b41f857bcc0$var$transitionsByElement.set(e9.target, transitions);
      e9.target.addEventListener("transitioncancel", onTransitionEnd, {
        once: true,
      });
    }
    transitions.add(e9.propertyName);
  };
  let onTransitionEnd = (e9) => {
    if (!isTransitionEvent(e9) || !e9.target) return;
    let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e9.target);
    if (!properties) return;
    properties.delete(e9.propertyName);
    if (properties.size === 0) {
      e9.target.removeEventListener("transitioncancel", onTransitionEnd);
      $bbed8b41f857bcc0$var$transitionsByElement.delete(e9.target);
    }
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) {
      for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks) cb();
      $bbed8b41f857bcc0$var$transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading")
    $bbed8b41f857bcc0$var$setupGlobalEvents();
  else
    document.addEventListener(
      "DOMContentLoaded",
      $bbed8b41f857bcc0$var$setupGlobalEvents,
    );
}
function $bbed8b41f857bcc0$var$cleanupDetachedElements() {
  for (const [eventTarget] of $bbed8b41f857bcc0$var$transitionsByElement)
    if ("isConnected" in eventTarget && !eventTarget.isConnected)
      $bbed8b41f857bcc0$var$transitionsByElement.delete(eventTarget);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
  requestAnimationFrame(() => {
    $bbed8b41f857bcc0$var$cleanupDetachedElements();
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) fn();
    else $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
  });
}

// node_modules/@react-aria/utils/dist/useDrag1D.mjs
var import_react7 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useGlobalListeners.mjs
var import_react8 = __toESM(require_react(), 1);
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
  let globalListeners = (0, import_react8.useRef)(/* @__PURE__ */ new Map());
  let addGlobalListener = (0, import_react8.useCallback)(
    (eventTarget, type, listener, options) => {
      let fn = (options === null || options === void 0 ? void 0 : options.once)
        ? (...args) => {
            globalListeners.current.delete(listener);
            listener(...args);
          }
        : listener;
      globalListeners.current.set(listener, {
        type,
        eventTarget,
        fn,
        options,
      });
      eventTarget.addEventListener(type, fn, options);
    },
    [],
  );
  let removeGlobalListener = (0, import_react8.useCallback)(
    (eventTarget, type, listener, options) => {
      var _globalListeners_current_get;
      let fn =
        ((_globalListeners_current_get =
          globalListeners.current.get(listener)) === null ||
        _globalListeners_current_get === void 0
          ? void 0
          : _globalListeners_current_get.fn) || listener;
      eventTarget.removeEventListener(type, fn, options);
      globalListeners.current.delete(listener);
    },
    [],
  );
  let removeAllGlobalListeners = (0, import_react8.useCallback)(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [removeGlobalListener]);
  (0, import_react8.useEffect)(() => {
    return removeAllGlobalListeners;
  }, [removeAllGlobalListeners]);
  return {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners,
  };
}

// node_modules/@react-aria/utils/dist/useObjectRef.mjs
var import_react9 = __toESM(require_react(), 1);
function $df56164dff5785e2$export$4338b53315abf666(ref) {
  const objRef = (0, import_react9.useRef)(null);
  const cleanupRef = (0, import_react9.useRef)(void 0);
  const refEffect = (0, import_react9.useCallback)(
    (instance) => {
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return () => {
          if (typeof refCleanup === "function") refCleanup();
          else refCallback(null);
        };
      } else if (ref) {
        ref.current = instance;
        return () => {
          ref.current = null;
        };
      }
    },
    [ref],
  );
  return (0, import_react9.useMemo)(
    () => ({
      get current() {
        return objRef.current;
      },
      set current(value) {
        objRef.current = value;
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = void 0;
        }
        if (value != null) cleanupRef.current = refEffect(value);
      },
    }),
    [refEffect],
  );
}

// node_modules/@react-aria/utils/dist/useUpdateEffect.mjs
var import_react10 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useUpdateLayoutEffect.mjs
var import_react11 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useResizeObserver.mjs
var import_react12 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useSyncRef.mjs
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        if (context.ref) context.ref.current = null;
      };
    }
  });
}

// node_modules/@react-aria/utils/dist/useViewportSize.mjs
var import_react13 = __toESM(require_react(), 1);
var $5df64b3807dc15ee$var$visualViewport =
  typeof document !== "undefined" && window.visualViewport;

// node_modules/@react-aria/utils/dist/useDescription.mjs
var import_react14 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useEvent.mjs
var import_react15 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/isVirtualEvent.mjs
function $6a7db85432448f7f$export$60278871457622de(event) {
  if (event.pointerType === "" && event.isTrusted) return true;
  if ((0, $c87311424ea30a05$export$a11b0059900ceec8)() && event.pointerType)
    return event.type === "click" && event.buttons === 1;
  return event.detail === 0 && !event.pointerType;
}
function $6a7db85432448f7f$export$29bf1b5f2c56cf63(event) {
  return (
    (!(0, $c87311424ea30a05$export$a11b0059900ceec8)() &&
      event.width === 0 &&
      event.height === 0) ||
    (event.width === 1 &&
      event.height === 1 &&
      event.pressure === 0 &&
      event.detail === 0 &&
      event.pointerType === "mouse")
  );
}

// node_modules/@react-aria/utils/dist/useDeepMemo.mjs
var import_react16 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useFormReset.mjs
var import_react17 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useLoadMore.mjs
var import_react18 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useLoadMoreSentinel.mjs
var import_react19 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/inertValue.mjs
var import_react20 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/animation.mjs
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react21 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/isElementVisible.mjs
var $7d2416ea0959daaa$var$supportsCheckVisibility =
  typeof Element !== "undefined" && "checkVisibility" in Element.prototype;
function $7d2416ea0959daaa$var$isStyleVisible(element) {
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  if (
    !(element instanceof windowObject.HTMLElement) &&
    !(element instanceof windowObject.SVGElement)
  )
    return false;
  let { display, visibility } = element.style;
  let isVisible =
    display !== "none" && visibility !== "hidden" && visibility !== "collapse";
  if (isVisible) {
    const { getComputedStyle: getComputedStyle3 } =
      element.ownerDocument.defaultView;
    let { display: computedDisplay, visibility: computedVisibility } =
      getComputedStyle3(element);
    isVisible =
      computedDisplay !== "none" &&
      computedVisibility !== "hidden" &&
      computedVisibility !== "collapse";
  }
  return isVisible;
}
function $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) {
  return (
    !element.hasAttribute("hidden") && // Ignore HiddenSelect when tree walking.
    !element.hasAttribute("data-react-aria-prevent-focus") &&
    (element.nodeName === "DETAILS" &&
    childElement &&
    childElement.nodeName !== "SUMMARY"
      ? element.hasAttribute("open")
      : true)
  );
}
function $7d2416ea0959daaa$export$e989c0fffaa6b27a(element, childElement) {
  if ($7d2416ea0959daaa$var$supportsCheckVisibility)
    return (
      element.checkVisibility({
        visibilityProperty: true,
      }) && !element.closest("[data-react-aria-prevent-focus]")
    );
  return (
    element.nodeName !== "#comment" &&
    $7d2416ea0959daaa$var$isStyleVisible(element) &&
    $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) &&
    (!element.parentElement ||
      $7d2416ea0959daaa$export$e989c0fffaa6b27a(element.parentElement, element))
  );
}

// node_modules/@react-aria/utils/dist/isFocusable.mjs
var $b4b717babfbb907b$var$focusableElements = [
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "a[href]",
  "area[href]",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable^="false"])',
  "permission",
];
var $b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR =
  $b4b717babfbb907b$var$focusableElements.join(":not([hidden]),") +
  ",[tabindex]:not([disabled]):not([hidden])";
$b4b717babfbb907b$var$focusableElements.push(
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
);
var $b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR =
  $b4b717babfbb907b$var$focusableElements.join(
    ':not([hidden]):not([tabindex="-1"]),',
  );
function $b4b717babfbb907b$export$4c063cf1350e6fed(element) {
  return (
    element.matches($b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR) &&
    (0, $7d2416ea0959daaa$export$e989c0fffaa6b27a)(element) &&
    !$b4b717babfbb907b$var$isInert(element)
  );
}
function $b4b717babfbb907b$var$isInert(element) {
  let node = element;
  while (node != null) {
    if (
      node instanceof node.ownerDocument.defaultView.HTMLElement &&
      node.inert
    )
      return true;
    node = node.parentElement;
  }
  return false;
}

// node_modules/@react-stately/utils/dist/useControlledState.mjs
var import_react22 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/utils.mjs
var import_react23 = __toESM(require_react(), 1);
function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
  let event = nativeEvent;
  event.nativeEvent = nativeEvent;
  event.isDefaultPrevented = () => event.defaultPrevented;
  event.isPropagationStopped = () => event.cancelBubble;
  event.persist = () => {};
  return event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
  Object.defineProperty(event, "target", {
    value: target,
  });
  Object.defineProperty(event, "currentTarget", {
    value: target,
  });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = (0, import_react23.useRef)({
    isFocused: false,
    observer: null,
  });
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);
  let dispatchBlur = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e9) => {
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e9);
  });
  return (0, import_react23.useCallback)(
    (e9) => {
      if (
        e9.target instanceof HTMLButtonElement ||
        e9.target instanceof HTMLInputElement ||
        e9.target instanceof HTMLTextAreaElement ||
        e9.target instanceof HTMLSelectElement
      ) {
        stateRef.current.isFocused = true;
        let target = e9.target;
        let onBlurHandler = (e10) => {
          stateRef.current.isFocused = false;
          if (target.disabled) {
            let event = $8a9cb279dc87e130$export$525bc4921d56d4a(e10);
            dispatchBlur(event);
          }
          if (stateRef.current.observer) {
            stateRef.current.observer.disconnect();
            stateRef.current.observer = null;
          }
        };
        target.addEventListener("focusout", onBlurHandler, {
          once: true,
        });
        stateRef.current.observer = new MutationObserver(() => {
          if (stateRef.current.isFocused && target.disabled) {
            var _stateRef_current_observer;
            (_stateRef_current_observer = stateRef.current.observer) === null ||
            _stateRef_current_observer === void 0
              ? void 0
              : _stateRef_current_observer.disconnect();
            let relatedTargetEl =
              target === document.activeElement ? null : document.activeElement;
            target.dispatchEvent(
              new FocusEvent("blur", {
                relatedTarget: relatedTargetEl,
              }),
            );
            target.dispatchEvent(
              new FocusEvent("focusout", {
                bubbles: true,
                relatedTarget: relatedTargetEl,
              }),
            );
          }
        });
        stateRef.current.observer.observe(target, {
          attributes: true,
          attributeFilter: ["disabled"],
        });
      }
    },
    [dispatchBlur],
  );
}
var $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
function $8a9cb279dc87e130$export$cabe61c495ee3649(target) {
  while (target && !(0, $b4b717babfbb907b$export$4c063cf1350e6fed)(target))
    target = target.parentElement;
  let window2 = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(target);
  let activeElement2 = window2.document.activeElement;
  if (!activeElement2 || activeElement2 === target) return;
  $8a9cb279dc87e130$export$fda7da73ab5d4c48 = true;
  let isRefocusing = false;
  let onBlur = (e9) => {
    if (e9.target === activeElement2 || isRefocusing)
      e9.stopImmediatePropagation();
  };
  let onFocusOut = (e9) => {
    if (e9.target === activeElement2 || isRefocusing) {
      e9.stopImmediatePropagation();
      if (!target && !isRefocusing) {
        isRefocusing = true;
        (0, $7215afc6de606d6b$export$de79e2c695e052f3)(activeElement2);
        cleanup2();
      }
    }
  };
  let onFocus = (e9) => {
    if (e9.target === target || isRefocusing) e9.stopImmediatePropagation();
  };
  let onFocusIn = (e9) => {
    if (e9.target === target || isRefocusing) {
      e9.stopImmediatePropagation();
      if (!isRefocusing) {
        isRefocusing = true;
        (0, $7215afc6de606d6b$export$de79e2c695e052f3)(activeElement2);
        cleanup2();
      }
    }
  };
  window2.addEventListener("blur", onBlur, true);
  window2.addEventListener("focusout", onFocusOut, true);
  window2.addEventListener("focusin", onFocusIn, true);
  window2.addEventListener("focus", onFocus, true);
  let cleanup2 = () => {
    cancelAnimationFrame(raf);
    window2.removeEventListener("blur", onBlur, true);
    window2.removeEventListener("focusout", onFocusOut, true);
    window2.removeEventListener("focusin", onFocusIn, true);
    window2.removeEventListener("focus", onFocus, true);
    $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
    isRefocusing = false;
  };
  let raf = requestAnimationFrame(cleanup2);
  return cleanup2;
}

// node_modules/@react-aria/interactions/dist/textSelection.mjs
var $14c0b72509d70225$var$state = "default";
var $14c0b72509d70225$var$savedUserSelect = "";
var $14c0b72509d70225$var$modifiedElementMap = /* @__PURE__ */ new WeakMap();
function $14c0b72509d70225$export$16a4697467175487(target) {
  if ((0, $c87311424ea30a05$export$fedb369cb70207f1)()) {
    if ($14c0b72509d70225$var$state === "default") {
      const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
        target,
      );
      $14c0b72509d70225$var$savedUserSelect =
        documentObject.documentElement.style.webkitUserSelect;
      documentObject.documentElement.style.webkitUserSelect = "none";
    }
    $14c0b72509d70225$var$state = "disabled";
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    let property =
      "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
    $14c0b72509d70225$var$modifiedElementMap.set(
      target,
      target.style[property],
    );
    target.style[property] = "none";
  }
}
function $14c0b72509d70225$export$b0d6fa1ab32e3295(target) {
  if ((0, $c87311424ea30a05$export$fedb369cb70207f1)()) {
    if ($14c0b72509d70225$var$state !== "disabled") return;
    $14c0b72509d70225$var$state = "restoring";
    setTimeout(() => {
      (0, $bbed8b41f857bcc0$export$24490316f764c430)(() => {
        if ($14c0b72509d70225$var$state === "restoring") {
          const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
            target,
          );
          if (documentObject.documentElement.style.webkitUserSelect === "none")
            documentObject.documentElement.style.webkitUserSelect =
              $14c0b72509d70225$var$savedUserSelect || "";
          $14c0b72509d70225$var$savedUserSelect = "";
          $14c0b72509d70225$var$state = "default";
        }
      });
    }, 300);
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    if (target && $14c0b72509d70225$var$modifiedElementMap.has(target)) {
      let targetOldUserSelect =
        $14c0b72509d70225$var$modifiedElementMap.get(target);
      let property =
        "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
      if (target.style[property] === "none")
        target.style[property] = targetOldUserSelect;
      if (target.getAttribute("style") === "") target.removeAttribute("style");
      $14c0b72509d70225$var$modifiedElementMap.delete(target);
    }
  }
}

// node_modules/@react-aria/interactions/dist/context.mjs
var import_react24 = __toESM(require_react(), 1);
var $ae1eeba8b9eafd08$export$5165eccb35aaadb5 = (0,
import_react24.default).createContext({
  register: () => {},
});
$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = "PressResponderContext";

// node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js
function _class_apply_descriptor_get(receiver, descriptor) {
  if (descriptor.get) return descriptor.get.call(receiver);
  return descriptor.value;
}

// node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js
function _class_extract_field_descriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError(
      "attempted to " + action + " private field on non-instance",
    );
  return privateMap.get(receiver);
}

// node_modules/@swc/helpers/esm/_class_private_field_get.js
function _class_private_field_get(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
  return _class_apply_descriptor_get(receiver, descriptor);
}

// node_modules/@swc/helpers/esm/_check_private_redeclaration.js
function _check_private_redeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError(
      "Cannot initialize the same private elements twice on an object",
    );
  }
}

// node_modules/@swc/helpers/esm/_class_private_field_init.js
function _class_private_field_init(obj, privateMap, value) {
  _check_private_redeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

// node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js
function _class_apply_descriptor_set(receiver, descriptor, value) {
  if (descriptor.set) descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}

// node_modules/@swc/helpers/esm/_class_private_field_set.js
function _class_private_field_set(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
  _class_apply_descriptor_set(receiver, descriptor, value);
  return value;
}

// node_modules/@react-aria/interactions/dist/usePress.mjs
var import_react_dom2 = __toESM(require_react_dom(), 1);
var import_react25 = __toESM(require_react(), 1);
function $f6c31cce2adf654f$var$usePressResponderContext(props) {
  let context = (0, import_react25.useContext)(
    (0, $ae1eeba8b9eafd08$export$5165eccb35aaadb5),
  );
  if (context) {
    let { register, ...contextProps } = context;
    props = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(contextProps, props);
    register();
  }
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(context, props.ref);
  return props;
}
var $f6c31cce2adf654f$var$_shouldStopPropagation =
  /* @__PURE__ */ new WeakMap();
var $f6c31cce2adf654f$var$PressEvent = class {
  continuePropagation() {
    (0, _class_private_field_set)(
      this,
      $f6c31cce2adf654f$var$_shouldStopPropagation,
      false,
    );
  }
  get shouldStopPropagation() {
    return (0, _class_private_field_get)(
      this,
      $f6c31cce2adf654f$var$_shouldStopPropagation,
    );
  }
  constructor(type, pointerType, originalEvent, state) {
    (0, _class_private_field_init)(
      this,
      $f6c31cce2adf654f$var$_shouldStopPropagation,
      {
        writable: true,
        value: void 0,
      },
    );
    (0, _class_private_field_set)(
      this,
      $f6c31cce2adf654f$var$_shouldStopPropagation,
      true,
    );
    var _state_target;
    let currentTarget =
      (_state_target =
        state === null || state === void 0 ? void 0 : state.target) !== null &&
      _state_target !== void 0
        ? _state_target
        : originalEvent.currentTarget;
    const rect =
      currentTarget === null || currentTarget === void 0
        ? void 0
        : currentTarget.getBoundingClientRect();
    let x10,
      y10 = 0;
    let clientX,
      clientY = null;
    if (originalEvent.clientX != null && originalEvent.clientY != null) {
      clientX = originalEvent.clientX;
      clientY = originalEvent.clientY;
    }
    if (rect) {
      if (clientX != null && clientY != null) {
        x10 = clientX - rect.left;
        y10 = clientY - rect.top;
      } else {
        x10 = rect.width / 2;
        y10 = rect.height / 2;
      }
    }
    this.type = type;
    this.pointerType = pointerType;
    this.target = originalEvent.currentTarget;
    this.shiftKey = originalEvent.shiftKey;
    this.metaKey = originalEvent.metaKey;
    this.ctrlKey = originalEvent.ctrlKey;
    this.altKey = originalEvent.altKey;
    this.x = x10;
    this.y = y10;
  }
};
var $f6c31cce2adf654f$var$LINK_CLICKED = Symbol("linkClicked");
var $f6c31cce2adf654f$var$STYLE_ID = "react-aria-pressable-style";
var $f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE = "data-react-aria-pressable";
function $f6c31cce2adf654f$export$45712eceda6fad21(props) {
  let {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    onClick,
    isDisabled: isDisabled2,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress,
    ref: domRef,
    ...domProps
  } = $f6c31cce2adf654f$var$usePressResponderContext(props);
  let [isPressed, setPressed] = (0, import_react25.useState)(false);
  let ref = (0, import_react25.useRef)({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    didFirePressStart: false,
    isTriggeringEvent: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null,
    disposables: [],
  });
  let { addGlobalListener, removeAllGlobalListeners } = (0,
  $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let triggerPressStart = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(
    (originalEvent, pointerType) => {
      let state = ref.current;
      if (isDisabled2 || state.didFirePressStart) return false;
      let shouldStopPropagation = true;
      state.isTriggeringEvent = true;
      if (onPressStart) {
        let event = new $f6c31cce2adf654f$var$PressEvent(
          "pressstart",
          pointerType,
          originalEvent,
        );
        onPressStart(event);
        shouldStopPropagation = event.shouldStopPropagation;
      }
      if (onPressChange) onPressChange(true);
      state.isTriggeringEvent = false;
      state.didFirePressStart = true;
      setPressed(true);
      return shouldStopPropagation;
    },
  );
  let triggerPressEnd = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(
    (originalEvent, pointerType, wasPressed = true) => {
      let state = ref.current;
      if (!state.didFirePressStart) return false;
      state.didFirePressStart = false;
      state.isTriggeringEvent = true;
      let shouldStopPropagation = true;
      if (onPressEnd) {
        let event = new $f6c31cce2adf654f$var$PressEvent(
          "pressend",
          pointerType,
          originalEvent,
        );
        onPressEnd(event);
        shouldStopPropagation = event.shouldStopPropagation;
      }
      if (onPressChange) onPressChange(false);
      setPressed(false);
      if (onPress && wasPressed && !isDisabled2) {
        let event = new $f6c31cce2adf654f$var$PressEvent(
          "press",
          pointerType,
          originalEvent,
        );
        onPress(event);
        shouldStopPropagation &&
          (shouldStopPropagation = event.shouldStopPropagation);
      }
      state.isTriggeringEvent = false;
      return shouldStopPropagation;
    },
  );
  let triggerPressUp = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(
    (originalEvent, pointerType) => {
      let state = ref.current;
      if (isDisabled2) return false;
      if (onPressUp) {
        state.isTriggeringEvent = true;
        let event = new $f6c31cce2adf654f$var$PressEvent(
          "pressup",
          pointerType,
          originalEvent,
        );
        onPressUp(event);
        state.isTriggeringEvent = false;
        return event.shouldStopPropagation;
      }
      return true;
    },
  );
  let cancel = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e9) => {
    let state = ref.current;
    if (state.isPressed && state.target) {
      if (state.didFirePressStart && state.pointerType != null)
        triggerPressEnd(
          $f6c31cce2adf654f$var$createEvent(state.target, e9),
          state.pointerType,
          false,
        );
      state.isPressed = false;
      state.isOverTarget = false;
      state.activePointerId = null;
      state.pointerType = null;
      removeAllGlobalListeners();
      if (!allowTextSelectionOnPress)
        (0, $14c0b72509d70225$export$b0d6fa1ab32e3295)(state.target);
      for (let dispose of state.disposables) dispose();
      state.disposables = [];
    }
  });
  let cancelOnPointerExit = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(
    (e9) => {
      if (shouldCancelOnPointerExit) cancel(e9);
    },
  );
  let triggerClick = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e9) => {
    if (isDisabled2) return;
    onClick === null || onClick === void 0 ? void 0 : onClick(e9);
  });
  let triggerSyntheticClick = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(
    (e9, target) => {
      if (isDisabled2) return;
      if (onClick) {
        let event = new MouseEvent("click", e9);
        (0, $8a9cb279dc87e130$export$c2b7abe5d61ec696)(event, target);
        onClick((0, $8a9cb279dc87e130$export$525bc4921d56d4a)(event));
      }
    },
  );
  let pressProps = (0, import_react25.useMemo)(() => {
    let state = ref.current;
    let pressProps2 = {
      onKeyDown(e9) {
        if (
          $f6c31cce2adf654f$var$isValidKeyboardEvent(
            e9.nativeEvent,
            e9.currentTarget,
          ) &&
          (0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        ) {
          var _state_metaKeyEvents;
          if (
            $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(
              (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
              e9.key,
            )
          )
            e9.preventDefault();
          let shouldStopPropagation = true;
          if (!state.isPressed && !e9.repeat) {
            state.target = e9.currentTarget;
            state.isPressed = true;
            state.pointerType = "keyboard";
            shouldStopPropagation = triggerPressStart(e9, "keyboard");
            let originalTarget = e9.currentTarget;
            let pressUp = (e10) => {
              if (
                $f6c31cce2adf654f$var$isValidKeyboardEvent(
                  e10,
                  originalTarget,
                ) &&
                !e10.repeat &&
                (0, $d4ee10de306f2510$export$4282f70798064fe0)(
                  originalTarget,
                  (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e10),
                ) &&
                state.target
              )
                triggerPressUp(
                  $f6c31cce2adf654f$var$createEvent(state.target, e10),
                  "keyboard",
                );
            };
            addGlobalListener(
              (0, $431fbd86ca7dc216$export$b204af158042fbac)(e9.currentTarget),
              "keyup",
              (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(pressUp, onKeyUp),
              true,
            );
          }
          if (shouldStopPropagation) e9.stopPropagation();
          if (e9.metaKey && (0, $c87311424ea30a05$export$9ac100e40613ea10)())
            (_state_metaKeyEvents = state.metaKeyEvents) === null ||
            _state_metaKeyEvents === void 0
              ? void 0
              : _state_metaKeyEvents.set(e9.key, e9.nativeEvent);
        } else if (e9.key === "Meta")
          state.metaKeyEvents = /* @__PURE__ */ new Map();
      },
      onClick(e9) {
        if (
          e9 &&
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if (
          e9 &&
          e9.button === 0 &&
          !state.isTriggeringEvent &&
          !(0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7).isOpening
        ) {
          let shouldStopPropagation = true;
          if (isDisabled2) e9.preventDefault();
          if (
            !state.ignoreEmulatedMouseEvents &&
            !state.isPressed &&
            (state.pointerType === "virtual" ||
              (0, $6a7db85432448f7f$export$60278871457622de)(e9.nativeEvent))
          ) {
            let stopPressStart = triggerPressStart(e9, "virtual");
            let stopPressUp = triggerPressUp(e9, "virtual");
            let stopPressEnd = triggerPressEnd(e9, "virtual");
            triggerClick(e9);
            shouldStopPropagation =
              stopPressStart && stopPressUp && stopPressEnd;
          } else if (state.isPressed && state.pointerType !== "keyboard") {
            let pointerType =
              state.pointerType || e9.nativeEvent.pointerType || "virtual";
            let stopPressUp = triggerPressUp(
              $f6c31cce2adf654f$var$createEvent(e9.currentTarget, e9),
              pointerType,
            );
            let stopPressEnd = triggerPressEnd(
              $f6c31cce2adf654f$var$createEvent(e9.currentTarget, e9),
              pointerType,
              true,
            );
            shouldStopPropagation = stopPressUp && stopPressEnd;
            state.isOverTarget = false;
            triggerClick(e9);
            cancel(e9);
          }
          state.ignoreEmulatedMouseEvents = false;
          if (shouldStopPropagation) e9.stopPropagation();
        }
      },
    };
    let onKeyUp = (e9) => {
      var _state_metaKeyEvents;
      if (
        state.isPressed &&
        state.target &&
        $f6c31cce2adf654f$var$isValidKeyboardEvent(e9, state.target)
      ) {
        var _state_metaKeyEvents1;
        if (
          $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9),
            e9.key,
          )
        )
          e9.preventDefault();
        let target = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9);
        let wasPressed = (0, $d4ee10de306f2510$export$4282f70798064fe0)(
          state.target,
          (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9),
        );
        triggerPressEnd(
          $f6c31cce2adf654f$var$createEvent(state.target, e9),
          "keyboard",
          wasPressed,
        );
        if (wasPressed) triggerSyntheticClick(e9, state.target);
        removeAllGlobalListeners();
        if (
          e9.key !== "Enter" &&
          $f6c31cce2adf654f$var$isHTMLAnchorLink(state.target) &&
          (0, $d4ee10de306f2510$export$4282f70798064fe0)(
            state.target,
            target,
          ) &&
          !e9[$f6c31cce2adf654f$var$LINK_CLICKED]
        ) {
          e9[$f6c31cce2adf654f$var$LINK_CLICKED] = true;
          (0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7)(
            state.target,
            e9,
            false,
          );
        }
        state.isPressed = false;
        (_state_metaKeyEvents1 = state.metaKeyEvents) === null ||
        _state_metaKeyEvents1 === void 0
          ? void 0
          : _state_metaKeyEvents1.delete(e9.key);
      } else if (
        e9.key === "Meta" &&
        ((_state_metaKeyEvents = state.metaKeyEvents) === null ||
        _state_metaKeyEvents === void 0
          ? void 0
          : _state_metaKeyEvents.size)
      ) {
        var _state_target;
        let events = state.metaKeyEvents;
        state.metaKeyEvents = void 0;
        for (let event of events.values())
          (_state_target = state.target) === null || _state_target === void 0
            ? void 0
            : _state_target.dispatchEvent(new KeyboardEvent("keyup", event));
      }
    };
    if (typeof PointerEvent !== "undefined") {
      pressProps2.onPointerDown = (e9) => {
        if (
          e9.button !== 0 ||
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if ((0, $6a7db85432448f7f$export$29bf1b5f2c56cf63)(e9.nativeEvent)) {
          state.pointerType = "virtual";
          return;
        }
        state.pointerType = e9.pointerType;
        let shouldStopPropagation = true;
        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e9.pointerId;
          state.target = e9.currentTarget;
          if (!allowTextSelectionOnPress)
            (0, $14c0b72509d70225$export$16a4697467175487)(state.target);
          shouldStopPropagation = triggerPressStart(e9, state.pointerType);
          let target = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(
            e9.nativeEvent,
          );
          if ("releasePointerCapture" in target)
            target.releasePointerCapture(e9.pointerId);
          addGlobalListener(
            (0, $431fbd86ca7dc216$export$b204af158042fbac)(e9.currentTarget),
            "pointerup",
            onPointerUp,
            false,
          );
          addGlobalListener(
            (0, $431fbd86ca7dc216$export$b204af158042fbac)(e9.currentTarget),
            "pointercancel",
            onPointerCancel,
            false,
          );
        }
        if (shouldStopPropagation) e9.stopPropagation();
      };
      pressProps2.onMouseDown = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if (e9.button === 0) {
          if (preventFocusOnPress) {
            let dispose = (0, $8a9cb279dc87e130$export$cabe61c495ee3649)(
              e9.target,
            );
            if (dispose) state.disposables.push(dispose);
          }
          e9.stopPropagation();
        }
      };
      pressProps2.onPointerUp = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          ) ||
          state.pointerType === "virtual"
        )
          return;
        if (e9.button === 0 && !state.isPressed)
          triggerPressUp(e9, state.pointerType || e9.pointerType);
      };
      pressProps2.onPointerEnter = (e9) => {
        if (
          e9.pointerId === state.activePointerId &&
          state.target &&
          !state.isOverTarget &&
          state.pointerType != null
        ) {
          state.isOverTarget = true;
          triggerPressStart(
            $f6c31cce2adf654f$var$createEvent(state.target, e9),
            state.pointerType,
          );
        }
      };
      pressProps2.onPointerLeave = (e9) => {
        if (
          e9.pointerId === state.activePointerId &&
          state.target &&
          state.isOverTarget &&
          state.pointerType != null
        ) {
          state.isOverTarget = false;
          triggerPressEnd(
            $f6c31cce2adf654f$var$createEvent(state.target, e9),
            state.pointerType,
            false,
          );
          cancelOnPointerExit(e9);
        }
      };
      let onPointerUp = (e9) => {
        if (
          e9.pointerId === state.activePointerId &&
          state.isPressed &&
          e9.button === 0 &&
          state.target
        ) {
          if (
            (0, $d4ee10de306f2510$export$4282f70798064fe0)(
              state.target,
              (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9),
            ) &&
            state.pointerType != null
          ) {
            let clicked = false;
            let timeout = setTimeout(() => {
              if (state.isPressed && state.target instanceof HTMLElement) {
                if (clicked) cancel(e9);
                else {
                  (0, $7215afc6de606d6b$export$de79e2c695e052f3)(state.target);
                  state.target.click();
                }
              }
            }, 80);
            addGlobalListener(
              e9.currentTarget,
              "click",
              () => (clicked = true),
              true,
            );
            state.disposables.push(() => clearTimeout(timeout));
          } else cancel(e9);
          state.isOverTarget = false;
        }
      };
      let onPointerCancel = (e9) => {
        cancel(e9);
      };
      pressProps2.onDragStart = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        cancel(e9);
      };
    } else if (false) {
      pressProps2.onMouseDown = (e9) => {
        if (
          e9.button !== 0 ||
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if (state.ignoreEmulatedMouseEvents) {
          e9.stopPropagation();
          return;
        }
        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e9.currentTarget;
        state.pointerType = (0, $6a7db85432448f7f$export$60278871457622de)(
          e9.nativeEvent,
        )
          ? "virtual"
          : "mouse";
        let shouldStopPropagation = (0, import_react_dom2.flushSync)(() =>
          triggerPressStart(e9, state.pointerType),
        );
        if (shouldStopPropagation) e9.stopPropagation();
        if (preventFocusOnPress) {
          let dispose = (0, $8a9cb279dc87e130$export$cabe61c495ee3649)(
            e9.target,
          );
          if (dispose) state.disposables.push(dispose);
        }
        addGlobalListener(
          (0, $431fbd86ca7dc216$export$b204af158042fbac)(e9.currentTarget),
          "mouseup",
          onMouseUp,
          false,
        );
      };
      pressProps2.onMouseEnter = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        let shouldStopPropagation = true;
        if (
          state.isPressed &&
          !state.ignoreEmulatedMouseEvents &&
          state.pointerType != null
        ) {
          state.isOverTarget = true;
          shouldStopPropagation = triggerPressStart(e9, state.pointerType);
        }
        if (shouldStopPropagation) e9.stopPropagation();
      };
      pressProps2.onMouseLeave = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        let shouldStopPropagation = true;
        if (
          state.isPressed &&
          !state.ignoreEmulatedMouseEvents &&
          state.pointerType != null
        ) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e9, state.pointerType, false);
          cancelOnPointerExit(e9);
        }
        if (shouldStopPropagation) e9.stopPropagation();
      };
      pressProps2.onMouseUp = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if (
          !state.ignoreEmulatedMouseEvents &&
          e9.button === 0 &&
          !state.isPressed
        )
          triggerPressUp(e9, state.pointerType || "mouse");
      };
      let onMouseUp = (e9) => {
        if (e9.button !== 0) return;
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
          return;
        }
        if (
          state.target &&
          state.target.contains(e9.target) &&
          state.pointerType != null
        );
        else cancel(e9);
        state.isOverTarget = false;
      };
      pressProps2.onTouchStart = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        let touch = $f6c31cce2adf654f$var$getTouchFromEvent(e9.nativeEvent);
        if (!touch) return;
        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e9.currentTarget;
        state.pointerType = "touch";
        if (!allowTextSelectionOnPress)
          (0, $14c0b72509d70225$export$16a4697467175487)(state.target);
        let shouldStopPropagation = triggerPressStart(
          $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
          state.pointerType,
        );
        if (shouldStopPropagation) e9.stopPropagation();
        addGlobalListener(
          (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(e9.currentTarget),
          "scroll",
          onScroll,
          true,
        );
      };
      pressProps2.onTouchMove = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if (!state.isPressed) {
          e9.stopPropagation();
          return;
        }
        let touch = $f6c31cce2adf654f$var$getTouchById(
          e9.nativeEvent,
          state.activePointerId,
        );
        let shouldStopPropagation = true;
        if (
          touch &&
          $f6c31cce2adf654f$var$isOverTarget(touch, e9.currentTarget)
        ) {
          if (!state.isOverTarget && state.pointerType != null) {
            state.isOverTarget = true;
            shouldStopPropagation = triggerPressStart(
              $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
              state.pointerType,
            );
          }
        } else if (state.isOverTarget && state.pointerType != null) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(
            $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
            state.pointerType,
            false,
          );
          cancelOnPointerExit(
            $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
          );
        }
        if (shouldStopPropagation) e9.stopPropagation();
      };
      pressProps2.onTouchEnd = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        if (!state.isPressed) {
          e9.stopPropagation();
          return;
        }
        let touch = $f6c31cce2adf654f$var$getTouchById(
          e9.nativeEvent,
          state.activePointerId,
        );
        let shouldStopPropagation = true;
        if (
          touch &&
          $f6c31cce2adf654f$var$isOverTarget(touch, e9.currentTarget) &&
          state.pointerType != null
        ) {
          triggerPressUp(
            $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
            state.pointerType,
          );
          shouldStopPropagation = triggerPressEnd(
            $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
            state.pointerType,
          );
          triggerSyntheticClick(e9.nativeEvent, state.target);
        } else if (state.isOverTarget && state.pointerType != null)
          shouldStopPropagation = triggerPressEnd(
            $f6c31cce2adf654f$var$createTouchEvent(state.target, e9),
            state.pointerType,
            false,
          );
        if (shouldStopPropagation) e9.stopPropagation();
        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;
        if (state.target && !allowTextSelectionOnPress)
          (0, $14c0b72509d70225$export$b0d6fa1ab32e3295)(state.target);
        removeAllGlobalListeners();
      };
      pressProps2.onTouchCancel = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        e9.stopPropagation();
        if (state.isPressed)
          cancel($f6c31cce2adf654f$var$createTouchEvent(state.target, e9));
      };
      let onScroll = (e9) => {
        if (
          state.isPressed &&
          (0, $d4ee10de306f2510$export$4282f70798064fe0)(
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9),
            state.target,
          )
        )
          cancel({
            currentTarget: state.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false,
          });
      };
      pressProps2.onDragStart = (e9) => {
        if (
          !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
            e9.currentTarget,
            (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent),
          )
        )
          return;
        cancel(e9);
      };
    }
    return pressProps2;
  }, [
    addGlobalListener,
    isDisabled2,
    preventFocusOnPress,
    removeAllGlobalListeners,
    allowTextSelectionOnPress,
    cancel,
    cancelOnPointerExit,
    triggerPressEnd,
    triggerPressStart,
    triggerPressUp,
    triggerClick,
    triggerSyntheticClick,
  ]);
  (0, import_react25.useEffect)(() => {
    if (!domRef || false) return;
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
      domRef.current,
    );
    if (
      !ownerDocument ||
      !ownerDocument.head ||
      ownerDocument.getElementById($f6c31cce2adf654f$var$STYLE_ID)
    )
      return;
    const style = ownerDocument.createElement("style");
    style.id = $f6c31cce2adf654f$var$STYLE_ID;
    style.textContent = `
@layer {
  [${$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim();
    ownerDocument.head.prepend(style);
  }, [domRef]);
  (0, import_react25.useEffect)(() => {
    let state = ref.current;
    return () => {
      var _state_target;
      if (!allowTextSelectionOnPress)
        (0, $14c0b72509d70225$export$b0d6fa1ab32e3295)(
          (_state_target = state.target) !== null && _state_target !== void 0
            ? _state_target
            : void 0,
        );
      for (let dispose of state.disposables) dispose();
      state.disposables = [];
    };
  }, [allowTextSelectionOnPress]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(
      domProps,
      pressProps,
      {
        [$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE]: true,
      },
    ),
  };
}
function $f6c31cce2adf654f$var$isHTMLAnchorLink(target) {
  return target.tagName === "A" && target.hasAttribute("href");
}
function $f6c31cce2adf654f$var$isValidKeyboardEvent(event, currentTarget) {
  const { key, code } = event;
  const element = currentTarget;
  const role = element.getAttribute("role");
  return (
    (key === "Enter" ||
      key === " " ||
      key === "Spacebar" ||
      code === "Space") &&
    !(
      (element instanceof
        (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element)
          .HTMLInputElement &&
        !$f6c31cce2adf654f$var$isValidInputKey(element, key)) ||
      element instanceof
        (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element)
          .HTMLTextAreaElement ||
      element.isContentEditable
    ) && // Links should only trigger with Enter key
    !(
      (role === "link" ||
        (!role && $f6c31cce2adf654f$var$isHTMLAnchorLink(element))) &&
      key !== "Enter"
    )
  );
}
function $f6c31cce2adf654f$var$createEvent(target, e9) {
  let clientX = e9.clientX;
  let clientY = e9.clientY;
  return {
    currentTarget: target,
    shiftKey: e9.shiftKey,
    ctrlKey: e9.ctrlKey,
    metaKey: e9.metaKey,
    altKey: e9.altKey,
    clientX,
    clientY,
  };
}
function $f6c31cce2adf654f$var$shouldPreventDefaultUp(target) {
  if (target instanceof HTMLInputElement) return false;
  if (target instanceof HTMLButtonElement)
    return target.type !== "submit" && target.type !== "reset";
  if ($f6c31cce2adf654f$var$isHTMLAnchorLink(target)) return false;
  return true;
}
function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(target, key) {
  if (target instanceof HTMLInputElement)
    return !$f6c31cce2adf654f$var$isValidInputKey(target, key);
  return $f6c31cce2adf654f$var$shouldPreventDefaultUp(target);
}
var $f6c31cce2adf654f$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset",
]);
function $f6c31cce2adf654f$var$isValidInputKey(target, key) {
  return target.type === "checkbox" || target.type === "radio"
    ? key === " "
    : $f6c31cce2adf654f$var$nonTextInputTypes.has(target.type);
}

// node_modules/@react-aria/interactions/dist/useFocusVisible.mjs
var import_react26 = __toESM(require_react(), 1);
var $507fabe10e71c6fb$var$currentModality = null;
var $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
var $507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
var $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
var $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
var $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true,
};
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e9) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers)
    handler(modality, e9);
}
function $507fabe10e71c6fb$var$isValidKey(e9) {
  return !(
    e9.metaKey ||
    (!(0, $c87311424ea30a05$export$9ac100e40613ea10)() && e9.altKey) ||
    e9.ctrlKey ||
    e9.key === "Control" ||
    e9.key === "Shift" ||
    e9.key === "Meta"
  );
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e9) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
  if ($507fabe10e71c6fb$var$isValidKey(e9)) {
    $507fabe10e71c6fb$var$currentModality = "keyboard";
    $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e9);
  }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e9) {
  $507fabe10e71c6fb$var$currentModality = "pointer";
  if (e9.type === "mousedown" || e9.type === "pointerdown") {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e9);
  }
}
function $507fabe10e71c6fb$var$handleClickEvent(e9) {
  if ((0, $6a7db85432448f7f$export$60278871457622de)(e9)) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$currentModality = "virtual";
  }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e9) {
  if (
    e9.target === window ||
    e9.target === document ||
    (0, $8a9cb279dc87e130$export$fda7da73ab5d4c48) ||
    !e9.isTrusted
  )
    return;
  if (
    !$507fabe10e71c6fb$var$hasEventBeforeFocus &&
    !$507fabe10e71c6fb$var$hasBlurredWindowRecently
  ) {
    $507fabe10e71c6fb$var$currentModality = "virtual";
    $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e9);
  }
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  if ((0, $8a9cb279dc87e130$export$fda7da73ab5d4c48)) return;
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    $507fabe10e71c6fb$export$d90243b58daecda7.get(
      (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element),
    )
  )
    return;
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
    element,
  );
  let focus = windowObject.HTMLElement.prototype.focus;
  windowObject.HTMLElement.prototype.focus = function () {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  documentObject.addEventListener(
    "keydown",
    $507fabe10e71c6fb$var$handleKeyboardEvent,
    true,
  );
  documentObject.addEventListener(
    "keyup",
    $507fabe10e71c6fb$var$handleKeyboardEvent,
    true,
  );
  documentObject.addEventListener(
    "click",
    $507fabe10e71c6fb$var$handleClickEvent,
    true,
  );
  windowObject.addEventListener(
    "focus",
    $507fabe10e71c6fb$var$handleFocusEvent,
    true,
  );
  windowObject.addEventListener(
    "blur",
    $507fabe10e71c6fb$var$handleWindowBlur,
    false,
  );
  if (typeof PointerEvent !== "undefined") {
    documentObject.addEventListener(
      "pointerdown",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.addEventListener(
      "pointermove",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.addEventListener(
      "pointerup",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
  } else if (false) {
    documentObject.addEventListener(
      "mousedown",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.addEventListener(
      "mousemove",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.addEventListener(
      "mouseup",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
  }
  windowObject.addEventListener(
    "beforeunload",
    () => {
      $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
    },
    {
      once: true,
    },
  );
  $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, {
    focus,
  });
}
var $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (
  element,
  loadListener,
) => {
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
    element,
  );
  if (loadListener)
    documentObject.removeEventListener("DOMContentLoaded", loadListener);
  if (!$507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject)) return;
  windowObject.HTMLElement.prototype.focus =
    $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus;
  documentObject.removeEventListener(
    "keydown",
    $507fabe10e71c6fb$var$handleKeyboardEvent,
    true,
  );
  documentObject.removeEventListener(
    "keyup",
    $507fabe10e71c6fb$var$handleKeyboardEvent,
    true,
  );
  documentObject.removeEventListener(
    "click",
    $507fabe10e71c6fb$var$handleClickEvent,
    true,
  );
  windowObject.removeEventListener(
    "focus",
    $507fabe10e71c6fb$var$handleFocusEvent,
    true,
  );
  windowObject.removeEventListener(
    "blur",
    $507fabe10e71c6fb$var$handleWindowBlur,
    false,
  );
  if (typeof PointerEvent !== "undefined") {
    documentObject.removeEventListener(
      "pointerdown",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.removeEventListener(
      "pointermove",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.removeEventListener(
      "pointerup",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
  } else if (false) {
    documentObject.removeEventListener(
      "mousedown",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.removeEventListener(
      "mousemove",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
    documentObject.removeEventListener(
      "mouseup",
      $507fabe10e71c6fb$var$handlePointerEvent,
      true,
    );
  }
  $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject);
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
    element,
  );
  let loadListener;
  if (documentObject.readyState !== "loading")
    $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
  else {
    loadListener = () => {
      $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
    };
    documentObject.addEventListener("DOMContentLoaded", loadListener);
  }
  return () =>
    $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined")
  $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
  return $507fabe10e71c6fb$var$currentModality !== "pointer";
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
  return $507fabe10e71c6fb$var$currentModality;
}
var $507fabe10e71c6fb$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset",
]);
function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e9) {
  let document1 = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
    e9 === null || e9 === void 0 ? void 0 : e9.target,
  );
  const IHTMLInputElement =
    typeof window !== "undefined"
      ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(
          e9 === null || e9 === void 0 ? void 0 : e9.target,
        ).HTMLInputElement
      : HTMLInputElement;
  const IHTMLTextAreaElement =
    typeof window !== "undefined"
      ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(
          e9 === null || e9 === void 0 ? void 0 : e9.target,
        ).HTMLTextAreaElement
      : HTMLTextAreaElement;
  const IHTMLElement =
    typeof window !== "undefined"
      ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(
          e9 === null || e9 === void 0 ? void 0 : e9.target,
        ).HTMLElement
      : HTMLElement;
  const IKeyboardEvent =
    typeof window !== "undefined"
      ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(
          e9 === null || e9 === void 0 ? void 0 : e9.target,
        ).KeyboardEvent
      : KeyboardEvent;
  isTextInput =
    isTextInput ||
    (document1.activeElement instanceof IHTMLInputElement &&
      !$507fabe10e71c6fb$var$nonTextInputTypes.has(
        document1.activeElement.type,
      )) ||
    document1.activeElement instanceof IHTMLTextAreaElement ||
    (document1.activeElement instanceof IHTMLElement &&
      document1.activeElement.isContentEditable);
  return !(
    isTextInput &&
    modality === "keyboard" &&
    e9 instanceof IKeyboardEvent &&
    !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e9.key]
  );
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
  $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  (0, import_react26.useEffect)(() => {
    let handler = (modality, e9) => {
      if (
        !$507fabe10e71c6fb$var$isKeyboardFocusEvent(
          !!(opts === null || opts === void 0 ? void 0 : opts.isTextInput),
          modality,
          e9,
        )
      )
        return;
      fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
    };
    $507fabe10e71c6fb$var$changeHandlers.add(handler);
    return () => {
      $507fabe10e71c6fb$var$changeHandlers.delete(handler);
    };
  }, deps);
}

// node_modules/@react-aria/interactions/dist/focusSafely.mjs
function $3ad3f6e1647bc98d$export$80f3e147d781571c(element) {
  const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  const activeElement2 = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(
    ownerDocument,
  );
  if ((0, $507fabe10e71c6fb$export$630ff653c5ada6a9)() === "virtual") {
    let lastFocusedElement = activeElement2;
    (0, $bbed8b41f857bcc0$export$24490316f764c430)(() => {
      if (
        (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument) ===
          lastFocusedElement &&
        element.isConnected
      )
        (0, $7215afc6de606d6b$export$de79e2c695e052f3)(element);
    });
  } else (0, $7215afc6de606d6b$export$de79e2c695e052f3)(element);
}

// node_modules/@react-aria/interactions/dist/useFocus.mjs
var import_react27 = __toESM(require_react(), 1);
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
  let {
    isDisabled: isDisabled2,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onFocusChange,
  } = props;
  const onBlur = (0, import_react27.useCallback)(
    (e9) => {
      if (e9.target === e9.currentTarget) {
        if (onBlurProp) onBlurProp(e9);
        if (onFocusChange) onFocusChange(false);
        return true;
      }
    },
    [onBlurProp, onFocusChange],
  );
  const onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(
    onBlur,
  );
  const onFocus = (0, import_react27.useCallback)(
    (e9) => {
      const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
        e9.target,
      );
      const activeElement2 = ownerDocument
        ? (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument)
        : (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)();
      if (
        e9.target === e9.currentTarget &&
        activeElement2 ===
          (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent)
      ) {
        if (onFocusProp) onFocusProp(e9);
        if (onFocusChange) onFocusChange(true);
        onSyntheticFocus(e9);
      }
    },
    [onFocusChange, onFocusProp, onSyntheticFocus],
  );
  return {
    focusProps: {
      onFocus:
        !isDisabled2 && (onFocusProp || onFocusChange || onBlurProp)
          ? onFocus
          : void 0,
      onBlur: !isDisabled2 && (onBlurProp || onFocusChange) ? onBlur : void 0,
    },
  };
}

// node_modules/@react-aria/interactions/dist/createEventHandler.mjs
function $93925083ecbb358c$export$48d1ea6320830260(handler) {
  if (!handler) return void 0;
  let shouldStopPropagation = true;
  return (e9) => {
    let event = {
      ...e9,
      preventDefault() {
        e9.preventDefault();
      },
      isDefaultPrevented() {
        return e9.isDefaultPrevented();
      },
      stopPropagation() {
        if (shouldStopPropagation && true)
          console.error(
            "stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.",
          );
        else shouldStopPropagation = true;
      },
      continuePropagation() {
        shouldStopPropagation = false;
      },
      isPropagationStopped() {
        return shouldStopPropagation;
      },
    };
    handler(event);
    if (shouldStopPropagation) e9.stopPropagation();
  };
}

// node_modules/@react-aria/interactions/dist/useKeyboard.mjs
function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
  return {
    keyboardProps: props.isDisabled
      ? {}
      : {
          onKeyDown: (0, $93925083ecbb358c$export$48d1ea6320830260)(
            props.onKeyDown,
          ),
          onKeyUp: (0, $93925083ecbb358c$export$48d1ea6320830260)(
            props.onKeyUp,
          ),
        },
  };
}

// node_modules/@react-aria/interactions/dist/useFocusable.mjs
var import_react28 = __toESM(require_react(), 1);
var $f645667febf57a63$export$f9762fab77588ecb = (0,
import_react28.default).createContext(null);
function $f645667febf57a63$var$useFocusableContext(ref) {
  let context =
    (0, import_react28.useContext)($f645667febf57a63$export$f9762fab77588ecb) ||
    {};
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(context, ref);
  let { ref: _10, ...otherProps } = context;
  return otherProps;
}
var $f645667febf57a63$export$13f3202a3e5ddd5 = (0,
import_react28.default).forwardRef(function FocusableProvider(props, ref) {
  let { children, ...otherProps } = props;
  let objRef = (0, $df56164dff5785e2$export$4338b53315abf666)(ref);
  let context = {
    ...otherProps,
    ref: objRef,
  };
  return (0, import_react28.default).createElement(
    $f645667febf57a63$export$f9762fab77588ecb.Provider,
    {
      value: context,
    },
    children,
  );
});
function $f645667febf57a63$export$4c014de7c8940b4c(props, domRef) {
  let { focusProps } = (0, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6)(props);
  let { keyboardProps } = (0, $46d819fcbaf35654$export$8f71654801c2f7cd)(props);
  let interactions = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(
    focusProps,
    keyboardProps,
  );
  let domProps = $f645667febf57a63$var$useFocusableContext(domRef);
  let interactionProps = props.isDisabled ? {} : domProps;
  let autoFocusRef = (0, import_react28.useRef)(props.autoFocus);
  (0, import_react28.useEffect)(() => {
    if (autoFocusRef.current && domRef.current)
      (0, $3ad3f6e1647bc98d$export$80f3e147d781571c)(domRef.current);
    autoFocusRef.current = false;
  }, [domRef]);
  let tabIndex = props.excludeFromTabOrder ? -1 : 0;
  if (props.isDisabled) tabIndex = void 0;
  return {
    focusableProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(
      {
        ...interactions,
        tabIndex,
      },
      interactionProps,
    ),
  };
}
var $f645667febf57a63$export$35a3bebf7ef2d934 = (0, import_react28.forwardRef)(
  ({ children, ...props }, ref) => {
    ref = (0, $df56164dff5785e2$export$4338b53315abf666)(ref);
    let { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c(
      props,
      ref,
    );
    let child = (0, import_react28.default).Children.only(children);
    (0, import_react28.useEffect)(() => {
      if (false) return;
      let el = ref.current;
      if (
        !el ||
        !(
          el instanceof
          (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(el).Element
        )
      ) {
        console.error(
          "<Focusable> child must forward its ref to a DOM element.",
        );
        return;
      }
      if (
        !props.isDisabled &&
        !(0, $b4b717babfbb907b$export$4c063cf1350e6fed)(el)
      ) {
        console.warn(
          "<Focusable> child must be focusable. Please ensure the tabIndex prop is passed through.",
        );
        return;
      }
      if (
        el.localName !== "button" &&
        el.localName !== "input" &&
        el.localName !== "select" &&
        el.localName !== "textarea" &&
        el.localName !== "a" &&
        el.localName !== "area" &&
        el.localName !== "summary" &&
        el.localName !== "img" &&
        el.localName !== "svg"
      ) {
        let role = el.getAttribute("role");
        if (!role)
          console.warn("<Focusable> child must have an interactive ARIA role.");
        else if (
          // https://w3c.github.io/aria/#widget_roles
          role !== "application" &&
          role !== "button" &&
          role !== "checkbox" &&
          role !== "combobox" &&
          role !== "gridcell" &&
          role !== "link" &&
          role !== "menuitem" &&
          role !== "menuitemcheckbox" &&
          role !== "menuitemradio" &&
          role !== "option" &&
          role !== "radio" &&
          role !== "searchbox" &&
          role !== "separator" &&
          role !== "slider" &&
          role !== "spinbutton" &&
          role !== "switch" &&
          role !== "tab" &&
          role !== "tabpanel" &&
          role !== "textbox" &&
          role !== "treeitem" && // aria-describedby is also announced on these roles
          role !== "img" &&
          role !== "meter" &&
          role !== "progressbar"
        )
          console.warn(
            `<Focusable> child must have an interactive ARIA role. Got "${role}".`,
          );
      }
    }, [ref, props.isDisabled]);
    let childRef =
      parseInt((0, import_react28.default).version, 10) < 19
        ? child.ref
        : child.props.ref;
    return (0, import_react28.default).cloneElement(child, {
      ...(0, $3ef42575df84b30b$export$9d1611c77c2fe928)(
        focusableProps,
        child.props,
      ),
      // @ts-ignore
      ref: (0, $5dc95899b306f630$export$c9058316764c140e)(childRef, ref),
    });
  },
);

// node_modules/@react-aria/interactions/dist/Pressable.mjs
var import_react29 = __toESM(require_react(), 1);
var $3b117e43dc0ca95d$export$27c701ed9e449e99 = (0,
import_react29.default).forwardRef(({ children, ...props }, ref) => {
  ref = (0, $df56164dff5785e2$export$4338b53315abf666)(ref);
  let { pressProps } = (0, $f6c31cce2adf654f$export$45712eceda6fad21)({
    ...props,
    ref,
  });
  let { focusableProps } = (0, $f645667febf57a63$export$4c014de7c8940b4c)(
    props,
    ref,
  );
  let child = (0, import_react29.default).Children.only(children);
  (0, import_react29.useEffect)(() => {
    if (false) return;
    let el = ref.current;
    if (
      !el ||
      !(
        el instanceof (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(el).Element
      )
    ) {
      console.error("<Pressable> child must forward its ref to a DOM element.");
      return;
    }
    if (
      !props.isDisabled &&
      !(0, $b4b717babfbb907b$export$4c063cf1350e6fed)(el)
    ) {
      console.warn(
        "<Pressable> child must be focusable. Please ensure the tabIndex prop is passed through.",
      );
      return;
    }
    if (
      el.localName !== "button" &&
      el.localName !== "input" &&
      el.localName !== "select" &&
      el.localName !== "textarea" &&
      el.localName !== "a" &&
      el.localName !== "area" &&
      el.localName !== "summary"
    ) {
      let role = el.getAttribute("role");
      if (!role)
        console.warn("<Pressable> child must have an interactive ARIA role.");
      else if (
        // https://w3c.github.io/aria/#widget_roles
        role !== "application" &&
        role !== "button" &&
        role !== "checkbox" &&
        role !== "combobox" &&
        role !== "gridcell" &&
        role !== "link" &&
        role !== "menuitem" &&
        role !== "menuitemcheckbox" &&
        role !== "menuitemradio" &&
        role !== "option" &&
        role !== "radio" &&
        role !== "searchbox" &&
        role !== "separator" &&
        role !== "slider" &&
        role !== "spinbutton" &&
        role !== "switch" &&
        role !== "tab" &&
        role !== "textbox" &&
        role !== "treeitem"
      )
        console.warn(
          `<Pressable> child must have an interactive ARIA role. Got "${role}".`,
        );
    }
  }, [ref, props.isDisabled]);
  let childRef =
    parseInt((0, import_react29.default).version, 10) < 19
      ? child.ref
      : child.props.ref;
  return (0, import_react29.default).cloneElement(child, {
    ...(0, $3ef42575df84b30b$export$9d1611c77c2fe928)(
      pressProps,
      focusableProps,
      child.props,
    ),
    // @ts-ignore
    ref: (0, $5dc95899b306f630$export$c9058316764c140e)(childRef, ref),
  });
});

// node_modules/@react-aria/interactions/dist/PressResponder.mjs
var import_react30 = __toESM(require_react(), 1);
var $f1ab8c75478c6f73$export$3351871ee4b288b8 = (0,
import_react30.default).forwardRef(({ children, ...props }, ref) => {
  let isRegistered = (0, import_react30.useRef)(false);
  let prevContext = (0, import_react30.useContext)(
    (0, $ae1eeba8b9eafd08$export$5165eccb35aaadb5),
  );
  ref = (0, $df56164dff5785e2$export$4338b53315abf666)(
    ref ||
      (prevContext === null || prevContext === void 0
        ? void 0
        : prevContext.ref),
  );
  let context = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(
    prevContext || {},
    {
      ...props,
      ref,
      register() {
        isRegistered.current = true;
        if (prevContext) prevContext.register();
      },
    },
  );
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(prevContext, ref);
  (0, import_react30.useEffect)(() => {
    if (!isRegistered.current) {
      if (true)
        console.warn(
          "A PressResponder was rendered without a pressable child. Either call the usePress hook, or wrap your DOM node with <Pressable> component.",
        );
      isRegistered.current = true;
    }
  }, []);
  return (0, import_react30.default).createElement(
    (0, $ae1eeba8b9eafd08$export$5165eccb35aaadb5).Provider,
    {
      value: context,
    },
    children,
  );
});

// node_modules/@react-aria/interactions/dist/useFocusWithin.mjs
var import_react31 = __toESM(require_react(), 1);
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let {
    isDisabled: isDisabled2,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
  } = props;
  let state = (0, import_react31.useRef)({
    isFocusWithin: false,
  });
  let { addGlobalListener, removeAllGlobalListeners } = (0,
  $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let onBlur = (0, import_react31.useCallback)(
    (e9) => {
      if (!e9.currentTarget.contains(e9.target)) return;
      if (
        state.current.isFocusWithin &&
        !e9.currentTarget.contains(e9.relatedTarget)
      ) {
        state.current.isFocusWithin = false;
        removeAllGlobalListeners();
        if (onBlurWithin) onBlurWithin(e9);
        if (onFocusWithinChange) onFocusWithinChange(false);
      }
    },
    [onBlurWithin, onFocusWithinChange, state, removeAllGlobalListeners],
  );
  let onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(onBlur);
  let onFocus = (0, import_react31.useCallback)(
    (e9) => {
      if (!e9.currentTarget.contains(e9.target)) return;
      const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(
        e9.target,
      );
      const activeElement2 = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(
        ownerDocument,
      );
      if (
        !state.current.isFocusWithin &&
        activeElement2 ===
          (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9.nativeEvent)
      ) {
        if (onFocusWithin) onFocusWithin(e9);
        if (onFocusWithinChange) onFocusWithinChange(true);
        state.current.isFocusWithin = true;
        onSyntheticFocus(e9);
        let currentTarget = e9.currentTarget;
        addGlobalListener(
          ownerDocument,
          "focus",
          (e10) => {
            if (
              state.current.isFocusWithin &&
              !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
                currentTarget,
                e10.target,
              )
            ) {
              let nativeEvent = new ownerDocument.defaultView.FocusEvent(
                "blur",
                {
                  relatedTarget: e10.target,
                },
              );
              (0, $8a9cb279dc87e130$export$c2b7abe5d61ec696)(
                nativeEvent,
                currentTarget,
              );
              let event = (0, $8a9cb279dc87e130$export$525bc4921d56d4a)(
                nativeEvent,
              );
              onBlur(event);
            }
          },
          {
            capture: true,
          },
        );
      }
    },
    [
      onFocusWithin,
      onFocusWithinChange,
      onSyntheticFocus,
      addGlobalListener,
      onBlur,
    ],
  );
  if (isDisabled2)
    return {
      focusWithinProps: {
        // These cannot be null, that would conflict in mergeProps
        onFocus: void 0,
        onBlur: void 0,
      },
    };
  return {
    focusWithinProps: {
      onFocus,
      onBlur,
    },
  };
}

// node_modules/@react-aria/interactions/dist/useHover.mjs
var import_react32 = __toESM(require_react(), 1);
var $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
var $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
  $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = true;
  setTimeout(() => {
    $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e9) {
  if (e9.pointerType === "touch")
    $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
  if (typeof document === "undefined") return;
  if ($6179b936705e76d3$var$hoverCount === 0) {
    if (typeof PointerEvent !== "undefined")
      document.addEventListener(
        "pointerup",
        $6179b936705e76d3$var$handleGlobalPointerEvent,
      );
    else if (false)
      document.addEventListener(
        "touchend",
        $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents,
      );
  }
  $6179b936705e76d3$var$hoverCount++;
  return () => {
    $6179b936705e76d3$var$hoverCount--;
    if ($6179b936705e76d3$var$hoverCount > 0) return;
    if (typeof PointerEvent !== "undefined")
      document.removeEventListener(
        "pointerup",
        $6179b936705e76d3$var$handleGlobalPointerEvent,
      );
    else if (false)
      document.removeEventListener(
        "touchend",
        $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents,
      );
  };
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
  let {
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled: isDisabled2,
  } = props;
  let [isHovered, setHovered] = (0, import_react32.useState)(false);
  let state = (0, import_react32.useRef)({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: "",
    target: null,
  }).current;
  (0, import_react32.useEffect)(
    $6179b936705e76d3$var$setupGlobalTouchEvents,
    [],
  );
  let { addGlobalListener, removeAllGlobalListeners } = (0,
  $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let { hoverProps, triggerHoverEnd } = (0, import_react32.useMemo)(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;
      if (
        isDisabled2 ||
        pointerType === "touch" ||
        state.isHovered ||
        !event.currentTarget.contains(event.target)
      )
        return;
      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;
      addGlobalListener(
        (0, $431fbd86ca7dc216$export$b204af158042fbac)(event.target),
        "pointerover",
        (e9) => {
          if (
            state.isHovered &&
            state.target &&
            !(0, $d4ee10de306f2510$export$4282f70798064fe0)(
              state.target,
              e9.target,
            )
          )
            triggerHoverEnd2(e9, e9.pointerType);
        },
        {
          capture: true,
        },
      );
      if (onHoverStart)
        onHoverStart({
          type: "hoverstart",
          target,
          pointerType,
        });
      if (onHoverChange) onHoverChange(true);
      setHovered(true);
    };
    let triggerHoverEnd2 = (event, pointerType) => {
      let target = state.target;
      state.pointerType = "";
      state.target = null;
      if (pointerType === "touch" || !state.isHovered || !target) return;
      state.isHovered = false;
      removeAllGlobalListeners();
      if (onHoverEnd)
        onHoverEnd({
          type: "hoverend",
          target,
          pointerType,
        });
      if (onHoverChange) onHoverChange(false);
      setHovered(false);
    };
    let hoverProps2 = {};
    if (typeof PointerEvent !== "undefined") {
      hoverProps2.onPointerEnter = (e9) => {
        if (
          $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents &&
          e9.pointerType === "mouse"
        )
          return;
        triggerHoverStart(e9, e9.pointerType);
      };
      hoverProps2.onPointerLeave = (e9) => {
        if (!isDisabled2 && e9.currentTarget.contains(e9.target))
          triggerHoverEnd2(e9, e9.pointerType);
      };
    } else if (false) {
      hoverProps2.onTouchStart = () => {
        state.ignoreEmulatedMouseEvents = true;
      };
      hoverProps2.onMouseEnter = (e9) => {
        if (
          !state.ignoreEmulatedMouseEvents &&
          !$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents
        )
          triggerHoverStart(e9, "mouse");
        state.ignoreEmulatedMouseEvents = false;
      };
      hoverProps2.onMouseLeave = (e9) => {
        if (!isDisabled2 && e9.currentTarget.contains(e9.target))
          triggerHoverEnd2(e9, "mouse");
      };
    }
    return {
      hoverProps: hoverProps2,
      triggerHoverEnd: triggerHoverEnd2,
    };
  }, [
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled2,
    state,
    addGlobalListener,
    removeAllGlobalListeners,
  ]);
  (0, import_react32.useEffect)(() => {
    if (isDisabled2)
      triggerHoverEnd(
        {
          currentTarget: state.target,
        },
        state.pointerType,
      );
  }, [isDisabled2]);
  return {
    hoverProps,
    isHovered,
  };
}

// node_modules/@react-aria/interactions/dist/useInteractOutside.mjs
var import_react33 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/useMove.mjs
var import_react34 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/useScrollWheel.mjs
var import_react35 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/useLongPress.mjs
var import_react36 = __toESM(require_react(), 1);

// node_modules/@react-aria/focus/dist/FocusScope.mjs
var import_react37 = __toESM(require_react(), 1);
var $9bf71ea28793e738$var$FocusContext = (0,
import_react37.default).createContext(null);
function $9bf71ea28793e738$var$isElementInScope(element, scope) {
  if (!element) return false;
  if (!scope) return false;
  return scope.some((node) => node.contains(element));
}
var $9bf71ea28793e738$var$Tree = class _$9bf71ea28793e738$var$Tree {
  get size() {
    return this.fastMap.size;
  }
  getTreeNode(data) {
    return this.fastMap.get(data);
  }
  addTreeNode(scopeRef, parent, nodeToRestore) {
    let parentNode = this.fastMap.get(
      parent !== null && parent !== void 0 ? parent : null,
    );
    if (!parentNode) return;
    let node = new $9bf71ea28793e738$var$TreeNode({
      scopeRef,
    });
    parentNode.addChild(node);
    node.parent = parentNode;
    this.fastMap.set(scopeRef, node);
    if (nodeToRestore) node.nodeToRestore = nodeToRestore;
  }
  addNode(node) {
    this.fastMap.set(node.scopeRef, node);
  }
  removeTreeNode(scopeRef) {
    if (scopeRef === null) return;
    let node = this.fastMap.get(scopeRef);
    if (!node) return;
    let parentNode = node.parent;
    for (let current of this.traverse())
      if (
        current !== node &&
        node.nodeToRestore &&
        current.nodeToRestore &&
        node.scopeRef &&
        node.scopeRef.current &&
        $9bf71ea28793e738$var$isElementInScope(
          current.nodeToRestore,
          node.scopeRef.current,
        )
      )
        current.nodeToRestore = node.nodeToRestore;
    let children = node.children;
    if (parentNode) {
      parentNode.removeChild(node);
      if (children.size > 0)
        children.forEach((child) => parentNode && parentNode.addChild(child));
    }
    this.fastMap.delete(node.scopeRef);
  }
  // Pre Order Depth First
  *traverse(node = this.root) {
    if (node.scopeRef != null) yield node;
    if (node.children.size > 0)
      for (let child of node.children) yield* this.traverse(child);
  }
  clone() {
    var _node_parent;
    let newTree = new _$9bf71ea28793e738$var$Tree();
    var _node_parent_scopeRef;
    for (let node of this.traverse())
      newTree.addTreeNode(
        node.scopeRef,
        (_node_parent_scopeRef =
          (_node_parent = node.parent) === null || _node_parent === void 0
            ? void 0
            : _node_parent.scopeRef) !== null &&
          _node_parent_scopeRef !== void 0
          ? _node_parent_scopeRef
          : null,
        node.nodeToRestore,
      );
    return newTree;
  }
  constructor() {
    this.fastMap = /* @__PURE__ */ new Map();
    this.root = new $9bf71ea28793e738$var$TreeNode({
      scopeRef: null,
    });
    this.fastMap.set(null, this.root);
  }
};
var $9bf71ea28793e738$var$TreeNode = class {
  addChild(node) {
    this.children.add(node);
    node.parent = this;
  }
  removeChild(node) {
    this.children.delete(node);
    node.parent = void 0;
  }
  constructor(props) {
    this.children = /* @__PURE__ */ new Set();
    this.contain = false;
    this.scopeRef = props.scopeRef;
  }
};
var $9bf71ea28793e738$export$d06fae2ee68b101e =
  new $9bf71ea28793e738$var$Tree();

// node_modules/@react-aria/focus/dist/useFocusRing.mjs
var import_react38 = __toESM(require_react(), 1);
function $f7dceffc5ad7768b$export$4e328f61c538687f(props = {}) {
  let { autoFocus = false, isTextInput, within } = props;
  let state = (0, import_react38.useRef)({
    isFocused: false,
    isFocusVisible:
      autoFocus || (0, $507fabe10e71c6fb$export$b9b3dfddab17db27)(),
  });
  let [isFocused, setFocused] = (0, import_react38.useState)(false);
  let [isFocusVisibleState, setFocusVisible] = (0, import_react38.useState)(
    () => state.current.isFocused && state.current.isFocusVisible,
  );
  let updateState = (0, import_react38.useCallback)(
    () =>
      setFocusVisible(state.current.isFocused && state.current.isFocusVisible),
    [],
  );
  let onFocusChange = (0, import_react38.useCallback)(
    (isFocused2) => {
      state.current.isFocused = isFocused2;
      setFocused(isFocused2);
      updateState();
    },
    [updateState],
  );
  (0, $507fabe10e71c6fb$export$ec71b4b83ac08ec3)(
    (isFocusVisible) => {
      state.current.isFocusVisible = isFocusVisible;
      updateState();
    },
    [],
    {
      isTextInput,
    },
  );
  let { focusProps } = (0, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6)({
    isDisabled: within,
    onFocusChange,
  });
  let { focusWithinProps } = (0, $9ab94262bd0047c7$export$420e68273165f4ec)({
    isDisabled: !within,
    onFocusWithinChange: onFocusChange,
  });
  return {
    isFocused,
    isFocusVisible: isFocusVisibleState,
    focusProps: within ? focusWithinProps : focusProps,
  };
}

// node_modules/@react-aria/focus/dist/FocusRing.mjs
var import_react39 = __toESM(require_react(), 1);

// node_modules/@react-aria/focus/dist/useHasTabbableChild.mjs
var import_react40 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-active-press.js
var import_react45 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/env.js
var i = Object.defineProperty;
var d = (t14, e9, n17) =>
  e9 in t14
    ? i(t14, e9, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: n17,
      })
    : (t14[e9] = n17);
var r2 = (t14, e9, n17) => (
  d(t14, typeof e9 != "symbol" ? e9 + "" : e9, n17),
  n17
);
var o = class {
  constructor() {
    r2(this, "current", this.detect());
    r2(this, "handoffState", "pending");
    r2(this, "currentId", 0);
  }
  set(e9) {
    this.current !== e9 &&
      ((this.handoffState = "pending"),
      (this.currentId = 0),
      (this.current = e9));
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined"
      ? "server"
      : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
var s = new o();

// node_modules/@headlessui/react/dist/utils/owner.js
function l(n17) {
  var u25;
  return s.isServer
    ? null
    : n17 == null
      ? document
      : (u25 = n17 == null ? void 0 : n17.ownerDocument) != null
        ? u25
        : document;
}
function r3(n17) {
  var u25, o20;
  return s.isServer
    ? null
    : n17 == null
      ? document
      : (o20 =
            (u25 = n17 == null ? void 0 : n17.getRootNode) == null
              ? void 0
              : u25.call(n17)) != null
        ? o20
        : document;
}
function e(n17) {
  var u25, o20;
  return (o20 = (u25 = r3(n17)) == null ? void 0 : u25.activeElement) != null
    ? o20
    : null;
}
function d2(n17) {
  return e(n17) === n17;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
var import_react41 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/micro-task.js
function t(e9) {
  typeof queueMicrotask == "function"
    ? queueMicrotask(e9)
    : Promise.resolve()
        .then(e9)
        .catch((o20) =>
          setTimeout(() => {
            throw o20;
          }),
        );
}

// node_modules/@headlessui/react/dist/utils/disposables.js
function o2() {
  let s20 = [],
    r22 = {
      addEventListener(e9, t14, n17, i16) {
        return (
          e9.addEventListener(t14, n17, i16),
          r22.add(() => e9.removeEventListener(t14, n17, i16))
        );
      },
      requestAnimationFrame(...e9) {
        let t14 = requestAnimationFrame(...e9);
        return r22.add(() => cancelAnimationFrame(t14));
      },
      nextFrame(...e9) {
        return r22.requestAnimationFrame(() =>
          r22.requestAnimationFrame(...e9),
        );
      },
      setTimeout(...e9) {
        let t14 = setTimeout(...e9);
        return r22.add(() => clearTimeout(t14));
      },
      microTask(...e9) {
        let t14 = { current: true };
        return (
          t(() => {
            t14.current && e9[0]();
          }),
          r22.add(() => {
            t14.current = false;
          })
        );
      },
      style(e9, t14, n17) {
        let i16 = e9.style.getPropertyValue(t14);
        return (
          Object.assign(e9.style, { [t14]: n17 }),
          this.add(() => {
            Object.assign(e9.style, { [t14]: i16 });
          })
        );
      },
      group(e9) {
        let t14 = o2();
        return (e9(t14), this.add(() => t14.dispose()));
      },
      add(e9) {
        return (
          s20.includes(e9) || s20.push(e9),
          () => {
            let t14 = s20.indexOf(e9);
            if (t14 >= 0) for (let n17 of s20.splice(t14, 1)) n17();
          }
        );
      },
      dispose() {
        for (let e9 of s20.splice(0)) e9();
      },
    };
  return r22;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
function p() {
  let [e9] = (0, import_react41.useState)(o2);
  return ((0, import_react41.useEffect)(() => () => e9.dispose(), [e9]), e9);
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var import_react44 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
var import_react43 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var import_react42 = __toESM(require_react(), 1);
var n = (e9, t14) => {
  s.isServer
    ? (0, import_react42.useEffect)(e9, t14)
    : (0, import_react42.useLayoutEffect)(e9, t14);
};

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
function s3(e9) {
  let r22 = (0, import_react43.useRef)(e9);
  return (
    n(() => {
      r22.current = e9;
    }, [e9]),
    r22
  );
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var o4 = function (t14) {
  let e9 = s3(t14);
  return import_react44.default.useCallback(
    (...r22) => e9.current(...r22),
    [e9],
  );
};

// node_modules/@headlessui/react/dist/hooks/use-active-press.js
function E(e9) {
  let t14 = e9.width / 2,
    n17 = e9.height / 2;
  return {
    top: e9.clientY - n17,
    right: e9.clientX + t14,
    bottom: e9.clientY + n17,
    left: e9.clientX - t14,
  };
}
function P(e9, t14) {
  return !(
    !e9 ||
    !t14 ||
    e9.right < t14.left ||
    e9.left > t14.right ||
    e9.bottom < t14.top ||
    e9.top > t14.bottom
  );
}
function w({ disabled: e9 = false } = {}) {
  let t14 = (0, import_react45.useRef)(null),
    [n17, l19] = (0, import_react45.useState)(false),
    r22 = p(),
    o20 = o4(() => {
      ((t14.current = null), l19(false), r22.dispose());
    }),
    f21 = o4((s20) => {
      if ((r22.dispose(), t14.current === null)) {
        ((t14.current = s20.currentTarget), l19(true));
        {
          let i16 = l(s20.currentTarget);
          (r22.addEventListener(i16, "pointerup", o20, false),
            r22.addEventListener(
              i16,
              "pointermove",
              (c21) => {
                if (t14.current) {
                  let p13 = E(c21);
                  l19(P(p13, t14.current.getBoundingClientRect()));
                }
              },
              false,
            ),
            r22.addEventListener(i16, "pointercancel", o20, false));
        }
      }
    });
  return {
    pressed: n17,
    pressProps: e9
      ? {}
      : { onPointerDown: f21, onPointerUp: o20, onClick: o20 },
  };
}

// node_modules/@headlessui/react/dist/hooks/use-slot.js
var import_react46 = __toESM(require_react(), 1);
function n2(e9) {
  return (0, import_react46.useMemo)(() => e9, Object.values(e9));
}

// node_modules/@headlessui/react/dist/internal/disabled.js
var import_react47 = __toESM(require_react(), 1);
var e2 = (0, import_react47.createContext)(void 0);
function a3() {
  return (0, import_react47.useContext)(e2);
}
function l2({ value: t14, children: o20 }) {
  return import_react47.default.createElement(e2.Provider, { value: t14 }, o20);
}

// node_modules/@headlessui/react/dist/utils/render.js
var import_react48 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/class-names.js
function t4(...r22) {
  return Array.from(
    new Set(
      r22.flatMap((n17) => (typeof n17 == "string" ? n17.split(" ") : [])),
    ),
  )
    .filter(Boolean)
    .join(" ");
}

// node_modules/@headlessui/react/dist/utils/match.js
function u(r22, n17, ...a28) {
  if (r22 in n17) {
    let e9 = n17[r22];
    return typeof e9 == "function" ? e9(...a28) : e9;
  }
  let t14 = new Error(
    `Tried to handle "${r22}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      n17,
    )
      .map((e9) => `"${e9}"`)
      .join(", ")}.`,
  );
  throw (Error.captureStackTrace && Error.captureStackTrace(t14, u), t14);
}

// node_modules/@headlessui/react/dist/utils/render.js
var A = ((a28) => (
  (a28[(a28.None = 0)] = "None"),
  (a28[(a28.RenderStrategy = 1)] = "RenderStrategy"),
  (a28[(a28.Static = 2)] = "Static"),
  a28
))(A || {});
var C = ((e9) => (
  (e9[(e9.Unmount = 0)] = "Unmount"),
  (e9[(e9.Hidden = 1)] = "Hidden"),
  e9
))(C || {});
function K() {
  let n17 = $();
  return (0, import_react48.useCallback)(
    (r22) => U({ mergeRefs: n17, ...r22 }),
    [n17],
  );
}
function U({
  ourProps: n17,
  theirProps: r22,
  slot: e9,
  defaultTag: a28,
  features: s20,
  visible: t14 = true,
  name: l19,
  mergeRefs: i16,
}) {
  i16 = i16 != null ? i16 : I;
  let o20 = P2(r22, n17);
  if (t14) return F(o20, e9, a28, l19, i16);
  let y10 = s20 != null ? s20 : 0;
  if (y10 & 2) {
    let { static: f21 = false, ...u25 } = o20;
    if (f21) return F(u25, e9, a28, l19, i16);
  }
  if (y10 & 1) {
    let { unmount: f21 = true, ...u25 } = o20;
    return u(f21 ? 0 : 1, {
      [0]() {
        return null;
      },
      [1]() {
        return F(
          { ...u25, hidden: true, style: { display: "none" } },
          e9,
          a28,
          l19,
          i16,
        );
      },
    });
  }
  return F(o20, e9, a28, l19, i16);
}
function F(n17, r22 = {}, e9, a28, s20) {
  let {
      as: t14 = e9,
      children: l19,
      refName: i16 = "ref",
      ...o20
    } = h(n17, ["unmount", "static"]),
    y10 = n17.ref !== void 0 ? { [i16]: n17.ref } : {},
    f21 = typeof l19 == "function" ? l19(r22) : l19;
  ("className" in o20 &&
    o20.className &&
    typeof o20.className == "function" &&
    (o20.className = o20.className(r22)),
    o20["aria-labelledby"] &&
      o20["aria-labelledby"] === o20.id &&
      (o20["aria-labelledby"] = void 0));
  let u25 = {};
  if (r22) {
    let d14 = false,
      p13 = [];
    for (let [c21, T10] of Object.entries(r22))
      (typeof T10 == "boolean" && (d14 = true),
        T10 === true &&
          p13.push(c21.replace(/([A-Z])/g, (g6) => `-${g6.toLowerCase()}`)));
    if (d14) {
      u25["data-headlessui-state"] = p13.join(" ");
      for (let c21 of p13) u25[`data-${c21}`] = "";
    }
  }
  if (
    b(t14) &&
    (Object.keys(m2(o20)).length > 0 || Object.keys(m2(u25)).length > 0)
  )
    if (
      !(0, import_react48.isValidElement)(f21) ||
      (Array.isArray(f21) && f21.length > 1) ||
      D(f21)
    ) {
      if (Object.keys(m2(o20)).length > 0)
        throw new Error(
          [
            'Passing props on "Fragment"!',
            "",
            `The current component <${a28} /> is rendering a "Fragment".`,
            "However we need to passthrough the following props:",
            Object.keys(m2(o20))
              .concat(Object.keys(m2(u25)))
              .map((d14) => `  - ${d14}`).join(`
`),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ].map((d14) => `  - ${d14}`).join(`
`),
          ].join(`
`),
        );
    } else {
      let d14 = f21.props,
        p13 = d14 == null ? void 0 : d14.className,
        c21 =
          typeof p13 == "function"
            ? (...R7) => t4(p13(...R7), o20.className)
            : t4(p13, o20.className),
        T10 = c21 ? { className: c21 } : {},
        g6 = P2(f21.props, m2(h(o20, ["ref"])));
      for (let R7 in u25) R7 in g6 && delete u25[R7];
      return (0, import_react48.cloneElement)(
        f21,
        Object.assign({}, g6, u25, y10, { ref: s20(H(f21), y10.ref) }, T10),
      );
    }
  return (0, import_react48.createElement)(
    t14,
    Object.assign({}, h(o20, ["ref"]), !b(t14) && y10, !b(t14) && u25),
    f21,
  );
}
function $() {
  let n17 = (0, import_react48.useRef)([]),
    r22 = (0, import_react48.useCallback)((e9) => {
      for (let a28 of n17.current)
        a28 != null &&
          (typeof a28 == "function" ? a28(e9) : (a28.current = e9));
    }, []);
  return (...e9) => {
    if (!e9.every((a28) => a28 == null)) return ((n17.current = e9), r22);
  };
}
function I(...n17) {
  return n17.every((r22) => r22 == null)
    ? void 0
    : (r22) => {
        for (let e9 of n17)
          e9 != null &&
            (typeof e9 == "function" ? e9(r22) : (e9.current = r22));
      };
}
function P2(...n17) {
  var a28;
  if (n17.length === 0) return {};
  if (n17.length === 1) return n17[0];
  let r22 = {},
    e9 = {};
  for (let s20 of n17)
    for (let t14 in s20)
      t14.startsWith("on") && typeof s20[t14] == "function"
        ? ((a28 = e9[t14]) != null || (e9[t14] = []), e9[t14].push(s20[t14]))
        : (r22[t14] = s20[t14]);
  if (r22.disabled || r22["aria-disabled"])
    for (let s20 in e9)
      /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(s20) &&
        (e9[s20] = [
          (t14) => {
            var l19;
            return (l19 = t14 == null ? void 0 : t14.preventDefault) == null
              ? void 0
              : l19.call(t14);
          },
        ]);
  for (let s20 in e9)
    Object.assign(r22, {
      [s20](t14, ...l19) {
        let i16 = e9[s20];
        for (let o20 of i16) {
          if (
            (t14 instanceof Event ||
              (t14 == null ? void 0 : t14.nativeEvent) instanceof Event) &&
            t14.defaultPrevented
          )
            return;
          o20(t14, ...l19);
        }
      },
    });
  return r22;
}
function V(...n17) {
  var a28;
  if (n17.length === 0) return {};
  if (n17.length === 1) return n17[0];
  let r22 = {},
    e9 = {};
  for (let s20 of n17)
    for (let t14 in s20)
      t14.startsWith("on") && typeof s20[t14] == "function"
        ? ((a28 = e9[t14]) != null || (e9[t14] = []), e9[t14].push(s20[t14]))
        : (r22[t14] = s20[t14]);
  for (let s20 in e9)
    Object.assign(r22, {
      [s20](...t14) {
        let l19 = e9[s20];
        for (let i16 of l19) i16 == null || i16(...t14);
      },
    });
  return r22;
}
function Y(n17) {
  var r22;
  return Object.assign((0, import_react48.forwardRef)(n17), {
    displayName: (r22 = n17.displayName) != null ? r22 : n17.name,
  });
}
function m2(n17) {
  let r22 = Object.assign({}, n17);
  for (let e9 in r22) r22[e9] === void 0 && delete r22[e9];
  return r22;
}
function h(n17, r22 = []) {
  let e9 = Object.assign({}, n17);
  for (let a28 of r22) a28 in e9 && delete e9[a28];
  return e9;
}
function H(n17) {
  return import_react48.default.version.split(".")[0] >= "19"
    ? n17.props.ref
    : n17.ref;
}
function b(n17) {
  return (
    n17 === import_react48.Fragment || n17 === Symbol.for("react.fragment")
  );
}
function D(n17) {
  return b(n17.type);
}

// node_modules/@headlessui/react/dist/components/button/button.js
var R = "button";
function v2(s20, n17) {
  var r22;
  let p13 = a3(),
    { disabled: e9 = p13 || false, autoFocus: t14 = false, ...o20 } = s20,
    { isFocusVisible: a28, focusProps: l19 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: t14 }),
    { isHovered: u25, hoverProps: i16 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e9 }),
    { pressed: T10, pressProps: d14 } = w({ disabled: e9 }),
    f21 = V(
      {
        ref: n17,
        type: (r22 = o20.type) != null ? r22 : "button",
        disabled: e9 || void 0,
        autoFocus: t14,
      },
      l19,
      i16,
      d14,
    ),
    m10 = n2({
      disabled: e9,
      hover: u25,
      focus: a28,
      active: T10,
      autofocus: t14,
    });
  return K()({
    ourProps: f21,
    theirProps: o20,
    slot: m10,
    defaultTag: R,
    name: "Button",
  });
}
var L = Y(v2);

// node_modules/@headlessui/react/dist/components/checkbox/checkbox.js
var import_react58 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-controllable.js
var import_react49 = __toESM(require_react(), 1);
var import_react_dom3 = __toESM(require_react_dom(), 1);
function b2(l19, r22, c21) {
  let [i16, s20] = (0, import_react49.useState)(c21),
    e9 = l19 !== void 0,
    t14 = (0, import_react49.useRef)(e9),
    u25 = (0, import_react49.useRef)(false),
    d14 = (0, import_react49.useRef)(false);
  return (
    e9 && !t14.current && !u25.current
      ? ((u25.current = true),
        (t14.current = e9),
        console.error(
          "A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.",
        ))
      : !e9 &&
        t14.current &&
        !d14.current &&
        ((d14.current = true),
        (t14.current = e9),
        console.error(
          "A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.",
        )),
    [
      e9 ? l19 : i16,
      o4(
        (n17) => (
          e9 || (0, import_react_dom3.flushSync)(() => s20(n17)),
          r22 == null ? void 0 : r22(n17)
        ),
      ),
    ]
  );
}

// node_modules/@headlessui/react/dist/hooks/use-default-value.js
var import_react50 = __toESM(require_react(), 1);
function l3(e9) {
  let [t14] = (0, import_react50.useState)(e9);
  return t14;
}

// node_modules/@headlessui/react/dist/hooks/use-id.js
var import_react51 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/internal/form-fields.js
var import_react53 = __toESM(require_react(), 1);
var import_react_dom4 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/utils/form.js
var import_react52 = __toESM(require_react(), 1);
function p2(t14 = {}, i16 = null, n17 = []) {
  for (let [e9, o20] of Object.entries(t14)) s4(n17, r6(i16, e9), o20);
  return n17;
}
function r6(t14, i16) {
  return t14 ? t14 + "[" + i16 + "]" : i16;
}
function s4(t14, i16, n17) {
  if (Array.isArray(n17))
    for (let [e9, o20] of n17.entries()) s4(t14, r6(i16, e9.toString()), o20);
  else
    n17 instanceof Date
      ? t14.push([i16, n17.toISOString()])
      : typeof n17 == "boolean"
        ? t14.push([i16, n17 ? "1" : "0"])
        : typeof n17 == "string"
          ? t14.push([i16, n17])
          : typeof n17 == "number"
            ? t14.push([i16, `${n17}`])
            : n17 == null
              ? t14.push([i16, ""])
              : c2(n17) &&
                !(0, import_react52.isValidElement)(n17) &&
                p2(n17, i16, t14);
}
function g(t14) {
  var n17, e9;
  let i16 =
    (n17 = t14 == null ? void 0 : t14.form) != null ? n17 : t14.closest("form");
  if (i16) {
    for (let o20 of i16.elements)
      if (
        o20 !== t14 &&
        ((o20.tagName === "INPUT" && o20.type === "submit") ||
          (o20.tagName === "BUTTON" && o20.type === "submit") ||
          (o20.nodeName === "INPUT" && o20.type === "image"))
      ) {
        o20.click();
        return;
      }
    (e9 = i16.requestSubmit) == null || e9.call(i16);
  }
}
function c2(t14) {
  if (Object.prototype.toString.call(t14) !== "[object Object]") return false;
  let i16 = Object.getPrototypeOf(t14);
  return i16 === null || Object.getPrototypeOf(i16) === null;
}

// node_modules/@headlessui/react/dist/internal/hidden.js
var a5 = "span";
var s5 = ((e9) => (
  (e9[(e9.None = 1)] = "None"),
  (e9[(e9.Focusable = 2)] = "Focusable"),
  (e9[(e9.Hidden = 4)] = "Hidden"),
  e9
))(s5 || {});
function l4(t14, r22) {
  var n17;
  let { features: d14 = 1, ...e9 } = t14,
    o20 = {
      ref: r22,
      "aria-hidden":
        (d14 & 2) === 2
          ? true
          : (n17 = e9["aria-hidden"]) != null
            ? n17
            : void 0,
      hidden: (d14 & 4) === 4 ? true : void 0,
      style: {
        position: "fixed",
        top: 1,
        left: 1,
        width: 1,
        height: 0,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
        ...((d14 & 4) === 4 && (d14 & 2) !== 2 && { display: "none" }),
      },
    };
  return K()({
    ourProps: o20,
    theirProps: e9,
    slot: {},
    defaultTag: a5,
    name: "Hidden",
  });
}
var f4 = Y(l4);

// node_modules/@headlessui/react/dist/internal/form-fields.js
var f5 = (0, import_react53.createContext)(null);
function W(t14) {
  let [e9, r22] = (0, import_react53.useState)(null);
  return import_react53.default.createElement(
    f5.Provider,
    { value: { target: e9 } },
    t14.children,
    import_react53.default.createElement(f4, { features: s5.Hidden, ref: r22 }),
  );
}
function c3({ children: t14 }) {
  let e9 = (0, import_react53.useContext)(f5);
  if (!e9)
    return import_react53.default.createElement(
      import_react53.default.Fragment,
      null,
      t14,
    );
  let { target: r22 } = e9;
  return r22
    ? (0, import_react_dom4.createPortal)(
        import_react53.default.createElement(
          import_react53.default.Fragment,
          null,
          t14,
        ),
        r22,
      )
    : null;
}
function j2({
  data: t14,
  form: e9,
  disabled: r22,
  onReset: n17,
  overrides: F7,
}) {
  let [i16, a28] = (0, import_react53.useState)(null),
    p13 = p();
  return (
    (0, import_react53.useEffect)(() => {
      if (n17 && i16) return p13.addEventListener(i16, "reset", n17);
    }, [i16, e9, n17]),
    import_react53.default.createElement(
      c3,
      null,
      import_react53.default.createElement(C2, { setForm: a28, formId: e9 }),
      p2(t14).map(([s20, v11]) =>
        import_react53.default.createElement(f4, {
          features: s5.Hidden,
          ...m2({
            key: s20,
            as: "input",
            type: "hidden",
            hidden: true,
            readOnly: true,
            form: e9,
            disabled: r22,
            name: s20,
            value: v11,
            ...F7,
          }),
        }),
      ),
    )
  );
}
function C2({ setForm: t14, formId: e9 }) {
  return (
    (0, import_react53.useEffect)(() => {
      if (e9) {
        let r22 = document.getElementById(e9);
        r22 && t14(r22);
      }
    }, [t14, e9]),
    e9
      ? null
      : import_react53.default.createElement(f4, {
          features: s5.Hidden,
          as: "input",
          type: "hidden",
          hidden: true,
          readOnly: true,
          ref: (r22) => {
            if (!r22) return;
            let n17 = r22.closest("form");
            n17 && t14(n17);
          },
        })
  );
}

// node_modules/@headlessui/react/dist/internal/id.js
var import_react54 = __toESM(require_react(), 1);
var e3 = (0, import_react54.createContext)(void 0);
function u4() {
  return (0, import_react54.useContext)(e3);
}
function f6({ id: t14, children: r22 }) {
  return import_react54.default.createElement(e3.Provider, { value: t14 }, r22);
}

// node_modules/@headlessui/react/dist/utils/dom.js
function o7(e9) {
  return typeof e9 != "object" || e9 === null ? false : "nodeType" in e9;
}
function t5(e9) {
  return o7(e9) && "tagName" in e9;
}
function n5(e9) {
  return t5(e9) && "accessKey" in e9;
}
function i4(e9) {
  return t5(e9) && "tabIndex" in e9;
}
function r7(e9) {
  return t5(e9) && "style" in e9;
}
function u5(e9) {
  return n5(e9) && e9.nodeName === "IFRAME";
}
function l5(e9) {
  return n5(e9) && e9.nodeName === "INPUT";
}
function m4(e9) {
  return n5(e9) && e9.nodeName === "LABEL";
}
function a6(e9) {
  return n5(e9) && e9.nodeName === "FIELDSET";
}
function E4(e9) {
  return n5(e9) && e9.nodeName === "LEGEND";
}
function L2(e9) {
  return t5(e9)
    ? e9.matches(
        'a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]',
      )
    : false;
}

// node_modules/@headlessui/react/dist/utils/bugs.js
function s6(l19) {
  let e9 = l19.parentElement,
    t14 = null;
  for (; e9 && !a6(e9); ) (E4(e9) && (t14 = e9), (e9 = e9.parentElement));
  let i16 = (e9 == null ? void 0 : e9.getAttribute("disabled")) === "";
  return i16 && r8(t14) ? false : i16;
}
function r8(l19) {
  if (!l19) return false;
  let e9 = l19.previousElementSibling;
  for (; e9 !== null; ) {
    if (E4(e9)) return false;
    e9 = e9.previousElementSibling;
  }
  return true;
}

// node_modules/@headlessui/react/dist/components/description/description.js
var import_react56 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
var import_react55 = __toESM(require_react(), 1);
var u6 = Symbol();
function T(t14, n17 = true) {
  return Object.assign(t14, { [u6]: n17 });
}
function y(...t14) {
  let n17 = (0, import_react55.useRef)(t14);
  (0, import_react55.useEffect)(() => {
    n17.current = t14;
  }, [t14]);
  let c21 = o4((e9) => {
    for (let o20 of n17.current)
      o20 != null && (typeof o20 == "function" ? o20(e9) : (o20.current = e9));
  });
  return t14.every((e9) => e9 == null || (e9 == null ? void 0 : e9[u6]))
    ? void 0
    : c21;
}

// node_modules/@headlessui/react/dist/components/description/description.js
var a7 = (0, import_react56.createContext)(null);
a7.displayName = "DescriptionContext";
function f7() {
  let r22 = (0, import_react56.useContext)(a7);
  if (r22 === null) {
    let e9 = new Error(
      "You used a <Description /> component, but it is not inside a relevant parent.",
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, f7), e9);
  }
  return r22;
}
function w3() {
  var r22, e9;
  return (e9 =
    (r22 = (0, import_react56.useContext)(a7)) == null ? void 0 : r22.value) !=
    null
    ? e9
    : void 0;
}
function H3() {
  let [r22, e9] = (0, import_react56.useState)([]);
  return [
    r22.length > 0 ? r22.join(" ") : void 0,
    (0, import_react56.useMemo)(
      () =>
        function (t14) {
          let i16 = o4(
              (n17) => (
                e9((o20) => [...o20, n17]),
                () =>
                  e9((o20) => {
                    let s20 = o20.slice(),
                      p13 = s20.indexOf(n17);
                    return (p13 !== -1 && s20.splice(p13, 1), s20);
                  })
              ),
            ),
            l19 = (0, import_react56.useMemo)(
              () => ({
                register: i16,
                slot: t14.slot,
                name: t14.name,
                props: t14.props,
                value: t14.value,
              }),
              [i16, t14.slot, t14.name, t14.props, t14.value],
            );
          return import_react56.default.createElement(
            a7.Provider,
            { value: l19 },
            t14.children,
          );
        },
      [e9],
    ),
  ];
}
var I2 = "p";
function C3(r22, e9) {
  let c21 = (0, import_react51.useId)(),
    t14 = a3(),
    { id: i16 = `headlessui-description-${c21}`, ...l19 } = r22,
    n17 = f7(),
    o20 = y(e9);
  n(() => n17.register(i16), [i16, n17.register]);
  let s20 = n2({ ...n17.slot, disabled: t14 || false }),
    p13 = { ref: o20, ...n17.props, id: i16 };
  return K()({
    ourProps: p13,
    theirProps: l19,
    slot: s20,
    defaultTag: I2,
    name: n17.name || "Description",
  });
}
var _ = Y(C3);
var M2 = Object.assign(_, {});

// node_modules/@headlessui/react/dist/components/keyboard.js
var o8 = ((r22) => (
  (r22.Space = " "),
  (r22.Enter = "Enter"),
  (r22.Escape = "Escape"),
  (r22.Backspace = "Backspace"),
  (r22.Delete = "Delete"),
  (r22.ArrowLeft = "ArrowLeft"),
  (r22.ArrowUp = "ArrowUp"),
  (r22.ArrowRight = "ArrowRight"),
  (r22.ArrowDown = "ArrowDown"),
  (r22.Home = "Home"),
  (r22.End = "End"),
  (r22.PageUp = "PageUp"),
  (r22.PageDown = "PageDown"),
  (r22.Tab = "Tab"),
  r22
))(o8 || {});

// node_modules/@headlessui/react/dist/components/label/label.js
var import_react57 = __toESM(require_react(), 1);
var L3 = (0, import_react57.createContext)(null);
L3.displayName = "LabelContext";
function C4() {
  let n17 = (0, import_react57.useContext)(L3);
  if (n17 === null) {
    let l19 = new Error(
      "You used a <Label /> component, but it is not inside a relevant parent.",
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(l19, C4), l19);
  }
  return n17;
}
function N(n17) {
  var a28, e9, o20;
  let l19 =
    (e9 =
      (a28 = (0, import_react57.useContext)(L3)) == null
        ? void 0
        : a28.value) != null
      ? e9
      : void 0;
  return ((o20 = n17 == null ? void 0 : n17.length) != null ? o20 : 0) > 0
    ? [l19, ...n17].filter(Boolean).join(" ")
    : l19;
}
function V2({ inherit: n17 = false } = {}) {
  let l19 = N(),
    [a28, e9] = (0, import_react57.useState)([]),
    o20 = n17 ? [l19, ...a28].filter(Boolean) : a28;
  return [
    o20.length > 0 ? o20.join(" ") : void 0,
    (0, import_react57.useMemo)(
      () =>
        function (t14) {
          let p13 = o4(
              (i16) => (
                e9((u25) => [...u25, i16]),
                () =>
                  e9((u25) => {
                    let d14 = u25.slice(),
                      f21 = d14.indexOf(i16);
                    return (f21 !== -1 && d14.splice(f21, 1), d14);
                  })
              ),
            ),
            b14 = (0, import_react57.useMemo)(
              () => ({
                register: p13,
                slot: t14.slot,
                name: t14.name,
                props: t14.props,
                value: t14.value,
              }),
              [p13, t14.slot, t14.name, t14.props, t14.value],
            );
          return import_react57.default.createElement(
            L3.Provider,
            { value: b14 },
            t14.children,
          );
        },
      [e9],
    ),
  ];
}
var G = "label";
function U2(n17, l19) {
  var y10;
  let a28 = (0, import_react51.useId)(),
    e9 = C4(),
    o20 = u4(),
    T10 = a3(),
    {
      id: t14 = `headlessui-label-${a28}`,
      htmlFor: p13 = o20 != null
        ? o20
        : (y10 = e9.props) == null
          ? void 0
          : y10.htmlFor,
      passive: b14 = false,
      ...i16
    } = n17,
    u25 = y(l19);
  n(() => e9.register(t14), [t14, e9.register]);
  let d14 = o4((s20) => {
      let g6 = s20.currentTarget;
      if (
        !(s20.target !== s20.currentTarget && L2(s20.target)) &&
        (m4(g6) && s20.preventDefault(),
        e9.props &&
          "onClick" in e9.props &&
          typeof e9.props.onClick == "function" &&
          e9.props.onClick(s20),
        m4(g6))
      ) {
        let r22 = document.getElementById(g6.htmlFor);
        if (r22) {
          let E13 = r22.getAttribute("disabled");
          if (E13 === "true" || E13 === "") return;
          let x10 = r22.getAttribute("aria-disabled");
          if (x10 === "true" || x10 === "") return;
          (((l5(r22) &&
            (r22.type === "file" ||
              r22.type === "radio" ||
              r22.type === "checkbox")) ||
            r22.role === "radio" ||
            r22.role === "checkbox" ||
            r22.role === "switch") &&
            r22.click(),
            r22.focus({ preventScroll: true }));
        }
      }
    }),
    f21 = n2({ ...e9.slot, disabled: T10 || false }),
    c21 = { ref: u25, ...e9.props, id: t14, htmlFor: p13, onClick: d14 };
  return (
    b14 &&
      ("onClick" in c21 && (delete c21.htmlFor, delete c21.onClick),
      "onClick" in i16 && delete i16.onClick),
    K()({
      ourProps: c21,
      theirProps: i16,
      slot: f21,
      defaultTag: p13 ? G : "div",
      name: e9.name || "Label",
    })
  );
}
var j3 = Y(U2);
var Z = Object.assign(j3, {});

// node_modules/@headlessui/react/dist/components/checkbox/checkbox.js
var de = "span";
function pe(u25, b14) {
  let f21 = (0, import_react51.useId)(),
    y10 = u4(),
    T10 = a3(),
    {
      id: h15 = y10 || `headlessui-checkbox-${f21}`,
      disabled: o20 = T10 || false,
      autoFocus: i16 = false,
      checked: C11,
      defaultChecked: k13,
      onChange: x10,
      name: d14,
      value: g6,
      form: E13,
      indeterminate: l19 = false,
      tabIndex: v11 = 0,
      ...P8
    } = u25,
    r22 = l3(k13),
    [a28, t14] = b2(C11, x10, r22 != null ? r22 : false),
    D12 = N(),
    R7 = w3(),
    A5 = p(),
    [F7, p13] = (0, import_react58.useState)(false),
    c21 = o4(() => {
      (p13(true),
        t14 == null || t14(!a28),
        A5.nextFrame(() => {
          p13(false);
        }));
    }),
    K4 = o4((e9) => {
      if (s6(e9.currentTarget)) return e9.preventDefault();
      (e9.preventDefault(), c21());
    }),
    _10 = o4((e9) => {
      e9.key === o8.Space
        ? (e9.preventDefault(), c21())
        : e9.key === o8.Enter && g(e9.currentTarget);
    }),
    H9 = o4((e9) => e9.preventDefault()),
    { isFocusVisible: B2, focusProps: I10 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: i16 }),
    { isHovered: L7, hoverProps: M12 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: o20 }),
    { pressed: U3, pressProps: O5 } = w({ disabled: o20 }),
    S10 = V(
      {
        ref: b14,
        id: h15,
        role: "checkbox",
        "aria-checked": l19 ? "mixed" : a28 ? "true" : "false",
        "aria-labelledby": D12,
        "aria-describedby": R7,
        "aria-disabled": o20 ? true : void 0,
        indeterminate: l19 ? "true" : void 0,
        tabIndex: o20 ? void 0 : v11,
        onKeyUp: o20 ? void 0 : _10,
        onKeyPress: o20 ? void 0 : H9,
        onClick: o20 ? void 0 : K4,
      },
      I10,
      M12,
      O5,
    ),
    X5 = n2({
      checked: a28,
      disabled: o20,
      hover: L7,
      focus: B2,
      active: U3,
      indeterminate: l19,
      changing: F7,
      autofocus: i16,
    }),
    G6 = (0, import_react58.useCallback)(() => {
      if (r22 !== void 0) return t14 == null ? void 0 : t14(r22);
    }, [t14, r22]),
    W5 = K();
  return import_react58.default.createElement(
    import_react58.default.Fragment,
    null,
    d14 != null &&
      import_react58.default.createElement(j2, {
        disabled: o20,
        data: { [d14]: g6 || "on" },
        overrides: { type: "checkbox", checked: a28 },
        form: E13,
        onReset: G6,
      }),
    W5({
      ourProps: S10,
      theirProps: P8,
      slot: X5,
      defaultTag: de,
      name: "Checkbox",
    }),
  );
}
var Ke = Y(pe);

// node_modules/@headlessui/react/dist/components/close-button/close-button.js
var import_react60 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/internal/close-provider.js
var import_react59 = __toESM(require_react(), 1);
var e4 = (0, import_react59.createContext)(() => {});
function u8() {
  return (0, import_react59.useContext)(e4);
}
function C5({ value: t14, children: o20 }) {
  return import_react59.default.createElement(e4.Provider, { value: t14 }, o20);
}

// node_modules/@headlessui/react/dist/components/close-button/close-button.js
function l7(t14, e9) {
  let o20 = u8();
  return import_react60.default.createElement(L, {
    ref: e9,
    ...V({ onClick: o20 }, t14),
  });
}
var y2 = Y(l7);

// node_modules/@tanstack/react-virtual/dist/esm/index.js
var React = __toESM(require_react());
var import_react_dom5 = __toESM(require_react_dom());

// node_modules/@tanstack/virtual-core/dist/esm/utils.js
function memo(getDeps, fn, opts) {
  let deps = opts.initialDeps ?? [];
  let result;
  function memoizedFunction() {
    var _a, _b, _c, _d;
    let depTime;
    if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts)))
      depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged =
      newDeps.length !== deps.length ||
      newDeps.some((dep, index3) => deps[index3] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts)))
      resultTime = Date.now();
    result = fn(...newDeps);
    if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
      const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
      const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
      const resultFpsPercentage = resultEndTime / 16;
      const pad = (str, num) => {
        str = String(str);
        while (str.length < num) {
          str = " " + str;
        }
        return str;
      };
      console.info(
        `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
              0,
              Math.min(120 - 120 * resultFpsPercentage, 120),
            )}deg 100% 31%);`,
        opts == null ? void 0 : opts.key,
      );
    }
    (_d = opts == null ? void 0 : opts.onChange) == null
      ? void 0
      : _d.call(opts, result);
    return result;
  }
  memoizedFunction.updateDeps = (newDeps) => {
    deps = newDeps;
  };
  return memoizedFunction;
}
function notUndefined(value, msg) {
  if (value === void 0) {
    throw new Error(`Unexpected undefined${msg ? `: ${msg}` : ""}`);
  } else {
    return value;
  }
}
var approxEqual = (a28, b14) => Math.abs(a28 - b14) < 1.01;
var debounce = (targetWindow, fn, ms) => {
  let timeoutId2;
  return function (...args) {
    targetWindow.clearTimeout(timeoutId2);
    timeoutId2 = targetWindow.setTimeout(() => fn.apply(this, args), ms);
  };
};

// node_modules/@tanstack/virtual-core/dist/esm/index.js
var getRect = (element) => {
  const { offsetWidth, offsetHeight } = element;
  return { width: offsetWidth, height: offsetHeight };
};
var defaultKeyExtractor = (index3) => index3;
var defaultRangeExtractor = (range) => {
  const start = Math.max(range.startIndex - range.overscan, 0);
  const end = Math.min(range.endIndex + range.overscan, range.count - 1);
  const arr = [];
  for (let i16 = start; i16 <= end; i16++) {
    arr.push(i16);
  }
  return arr;
};
var observeElementRect = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  const handler = (rect) => {
    const { width, height } = rect;
    cb({ width: Math.round(width), height: Math.round(height) });
  };
  handler(getRect(element));
  if (!targetWindow.ResizeObserver) {
    return () => {};
  }
  const observer = new targetWindow.ResizeObserver((entries) => {
    const run = () => {
      const entry = entries[0];
      if (entry == null ? void 0 : entry.borderBoxSize) {
        const box = entry.borderBoxSize[0];
        if (box) {
          handler({ width: box.inlineSize, height: box.blockSize });
          return;
        }
      }
      handler(getRect(element));
    };
    instance.options.useAnimationFrameWithResizeObserver
      ? requestAnimationFrame(run)
      : run();
  });
  observer.observe(element, { box: "border-box" });
  return () => {
    observer.unobserve(element);
  };
};
var addEventListenerOptions = {
  passive: true,
};
var supportsScrollend =
  typeof window == "undefined" ? true : "onscrollend" in window;
var observeElementOffset = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  let offset4 = 0;
  const fallback =
    instance.options.useScrollendEvent && supportsScrollend
      ? () => void 0
      : debounce(
          targetWindow,
          () => {
            cb(offset4, false);
          },
          instance.options.isScrollingResetDelay,
        );
  const createHandler = (isScrolling) => () => {
    const { horizontal, isRtl } = instance.options;
    offset4 = horizontal
      ? element["scrollLeft"] * ((isRtl && -1) || 1)
      : element["scrollTop"];
    fallback();
    cb(offset4, isScrolling);
  };
  const handler = createHandler(true);
  const endHandler = createHandler(false);
  endHandler();
  element.addEventListener("scroll", handler, addEventListenerOptions);
  const registerScrollendEvent =
    instance.options.useScrollendEvent && supportsScrollend;
  if (registerScrollendEvent) {
    element.addEventListener("scrollend", endHandler, addEventListenerOptions);
  }
  return () => {
    element.removeEventListener("scroll", handler);
    if (registerScrollendEvent) {
      element.removeEventListener("scrollend", endHandler);
    }
  };
};
var measureElement = (element, entry, instance) => {
  if (entry == null ? void 0 : entry.borderBoxSize) {
    const box = entry.borderBoxSize[0];
    if (box) {
      const size4 = Math.round(
        box[instance.options.horizontal ? "inlineSize" : "blockSize"],
      );
      return size4;
    }
  }
  return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
var elementScroll = (offset4, { adjustments = 0, behavior }, instance) => {
  var _a, _b;
  const toOffset = offset4 + adjustments;
  (_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null
    ? void 0
    : _b.call(_a, {
        [instance.options.horizontal ? "left" : "top"]: toOffset,
        behavior,
      });
};
var Virtualizer = class {
  constructor(opts) {
    this.unsubs = [];
    this.scrollElement = null;
    this.targetWindow = null;
    this.isScrolling = false;
    this.measurementsCache = [];
    this.itemSizeCache = /* @__PURE__ */ new Map();
    this.pendingMeasuredCacheIndexes = [];
    this.scrollRect = null;
    this.scrollOffset = null;
    this.scrollDirection = null;
    this.scrollAdjustments = 0;
    this.elementsCache = /* @__PURE__ */ new Map();
    this.observer = /* @__PURE__ */ (() => {
      let _ro = null;
      const get = () => {
        if (_ro) {
          return _ro;
        }
        if (!this.targetWindow || !this.targetWindow.ResizeObserver) {
          return null;
        }
        return (_ro = new this.targetWindow.ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const run = () => {
              this._measureElement(entry.target, entry);
            };
            this.options.useAnimationFrameWithResizeObserver
              ? requestAnimationFrame(run)
              : run();
          });
        }));
      };
      return {
        disconnect: () => {
          var _a;
          (_a = get()) == null ? void 0 : _a.disconnect();
          _ro = null;
        },
        observe: (target) => {
          var _a;
          return (_a = get()) == null
            ? void 0
            : _a.observe(target, { box: "border-box" });
        },
        unobserve: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.unobserve(target);
        },
      };
    })();
    this.range = null;
    this.setOptions = (opts2) => {
      Object.entries(opts2).forEach(([key, value]) => {
        if (typeof value === "undefined") delete opts2[key];
      });
      this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: defaultKeyExtractor,
        rangeExtractor: defaultRangeExtractor,
        onChange: () => {},
        measureElement,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        isRtl: false,
        useScrollendEvent: false,
        useAnimationFrameWithResizeObserver: false,
        ...opts2,
      };
    };
    this.notify = (sync) => {
      var _a, _b;
      (_b = (_a = this.options).onChange) == null
        ? void 0
        : _b.call(_a, this, sync);
    };
    this.maybeNotify = memo(
      () => {
        this.calculateRange();
        return [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null,
        ];
      },
      (isScrolling) => {
        this.notify(isScrolling);
      },
      {
        key: "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null,
        ],
      },
    );
    this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((d14) => d14());
      this.unsubs = [];
      this.observer.disconnect();
      this.scrollElement = null;
      this.targetWindow = null;
    };
    this._didMount = () => {
      return () => {
        this.cleanup();
      };
    };
    this._willUpdate = () => {
      var _a;
      const scrollElement = this.options.enabled
        ? this.options.getScrollElement()
        : null;
      if (this.scrollElement !== scrollElement) {
        this.cleanup();
        if (!scrollElement) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = scrollElement;
        if (this.scrollElement && "ownerDocument" in this.scrollElement) {
          this.targetWindow = this.scrollElement.ownerDocument.defaultView;
        } else {
          this.targetWindow =
            ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
        }
        this.elementsCache.forEach((cached) => {
          this.observer.observe(cached);
        });
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0,
        });
        this.unsubs.push(
          this.options.observeElementRect(this, (rect) => {
            this.scrollRect = rect;
            this.maybeNotify();
          }),
        );
        this.unsubs.push(
          this.options.observeElementOffset(this, (offset4, isScrolling) => {
            this.scrollAdjustments = 0;
            this.scrollDirection = isScrolling
              ? this.getScrollOffset() < offset4
                ? "forward"
                : "backward"
              : null;
            this.scrollOffset = offset4;
            this.isScrolling = isScrolling;
            this.maybeNotify();
          }),
        );
      }
    };
    this.getSize = () => {
      if (!this.options.enabled) {
        this.scrollRect = null;
        return 0;
      }
      this.scrollRect = this.scrollRect ?? this.options.initialRect;
      return this.scrollRect[this.options.horizontal ? "width" : "height"];
    };
    this.getScrollOffset = () => {
      if (!this.options.enabled) {
        this.scrollOffset = null;
        return 0;
      }
      this.scrollOffset =
        this.scrollOffset ??
        (typeof this.options.initialOffset === "function"
          ? this.options.initialOffset()
          : this.options.initialOffset);
      return this.scrollOffset;
    };
    this.getFurthestMeasurement = (measurements, index3) => {
      const furthestMeasurementsFound = /* @__PURE__ */ new Map();
      const furthestMeasurements = /* @__PURE__ */ new Map();
      for (let m10 = index3 - 1; m10 >= 0; m10--) {
        const measurement = measurements[m10];
        if (furthestMeasurementsFound.has(measurement.lane)) {
          continue;
        }
        const previousFurthestMeasurement = furthestMeasurements.get(
          measurement.lane,
        );
        if (
          previousFurthestMeasurement == null ||
          measurement.end > previousFurthestMeasurement.end
        ) {
          furthestMeasurements.set(measurement.lane, measurement);
        } else if (measurement.end < previousFurthestMeasurement.end) {
          furthestMeasurementsFound.set(measurement.lane, true);
        }
        if (furthestMeasurementsFound.size === this.options.lanes) {
          break;
        }
      }
      return furthestMeasurements.size === this.options.lanes
        ? Array.from(furthestMeasurements.values()).sort((a28, b14) => {
            if (a28.end === b14.end) {
              return a28.index - b14.index;
            }
            return a28.end - b14.end;
          })[0]
        : void 0;
    };
    this.getMeasurementOptions = memo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
      ],
      (count2, paddingStart, scrollMargin, getItemKey, enabled) => {
        this.pendingMeasuredCacheIndexes = [];
        return {
          count: count2,
          paddingStart,
          scrollMargin,
          getItemKey,
          enabled,
        };
      },
      {
        key: false,
      },
    );
    this.getMeasurements = memo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      (
        { count: count2, paddingStart, scrollMargin, getItemKey, enabled },
        itemSizeCache,
      ) => {
        if (!enabled) {
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          return [];
        }
        if (this.measurementsCache.length === 0) {
          this.measurementsCache = this.options.initialMeasurementsCache;
          this.measurementsCache.forEach((item) => {
            this.itemSizeCache.set(item.key, item.size);
          });
        }
        const min2 =
          this.pendingMeasuredCacheIndexes.length > 0
            ? Math.min(...this.pendingMeasuredCacheIndexes)
            : 0;
        this.pendingMeasuredCacheIndexes = [];
        const measurements = this.measurementsCache.slice(0, min2);
        for (let i16 = min2; i16 < count2; i16++) {
          const key = getItemKey(i16);
          const furthestMeasurement =
            this.options.lanes === 1
              ? measurements[i16 - 1]
              : this.getFurthestMeasurement(measurements, i16);
          const start = furthestMeasurement
            ? furthestMeasurement.end + this.options.gap
            : paddingStart + scrollMargin;
          const measuredSize = itemSizeCache.get(key);
          const size4 =
            typeof measuredSize === "number"
              ? measuredSize
              : this.options.estimateSize(i16);
          const end = start + size4;
          const lane = furthestMeasurement
            ? furthestMeasurement.lane
            : i16 % this.options.lanes;
          measurements[i16] = {
            index: i16,
            start,
            size: size4,
            end,
            key,
            lane,
          };
        }
        this.measurementsCache = measurements;
        return measurements;
      },
      {
        key: "getMeasurements",
        debug: () => this.options.debug,
      },
    );
    this.calculateRange = memo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes,
      ],
      (measurements, outerSize, scrollOffset, lanes) => {
        return (this.range =
          measurements.length > 0 && outerSize > 0
            ? calculateRange({
                measurements,
                outerSize,
                scrollOffset,
                lanes,
              })
            : null);
      },
      {
        key: "calculateRange",
        debug: () => this.options.debug,
      },
    );
    this.getVirtualIndexes = memo(
      () => {
        let startIndex = null;
        let endIndex = null;
        const range = this.calculateRange();
        if (range) {
          startIndex = range.startIndex;
          endIndex = range.endIndex;
        }
        this.maybeNotify.updateDeps([this.isScrolling, startIndex, endIndex]);
        return [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          startIndex,
          endIndex,
        ];
      },
      (rangeExtractor, overscan, count2, startIndex, endIndex) => {
        return startIndex === null || endIndex === null
          ? []
          : rangeExtractor({
              startIndex,
              endIndex,
              overscan,
              count: count2,
            });
      },
      {
        key: "getVirtualIndexes",
        debug: () => this.options.debug,
      },
    );
    this.indexFromElement = (node) => {
      const attributeName = this.options.indexAttribute;
      const indexStr = node.getAttribute(attributeName);
      if (!indexStr) {
        console.warn(
          `Missing attribute name '${attributeName}={index}' on measured element.`,
        );
        return -1;
      }
      return parseInt(indexStr, 10);
    };
    this._measureElement = (node, entry) => {
      const index3 = this.indexFromElement(node);
      const item = this.measurementsCache[index3];
      if (!item) {
        return;
      }
      const key = item.key;
      const prevNode = this.elementsCache.get(key);
      if (prevNode !== node) {
        if (prevNode) {
          this.observer.unobserve(prevNode);
        }
        this.observer.observe(node);
        this.elementsCache.set(key, node);
      }
      if (node.isConnected) {
        this.resizeItem(index3, this.options.measureElement(node, entry, this));
      }
    };
    this.resizeItem = (index3, size4) => {
      const item = this.measurementsCache[index3];
      if (!item) {
        return;
      }
      const itemSize = this.itemSizeCache.get(item.key) ?? item.size;
      const delta = size4 - itemSize;
      if (delta !== 0) {
        if (
          this.shouldAdjustScrollPositionOnItemSizeChange !== void 0
            ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this)
            : item.start < this.getScrollOffset() + this.scrollAdjustments
        ) {
          if (this.options.debug) {
            console.info("correction", delta);
          }
          this._scrollToOffset(this.getScrollOffset(), {
            adjustments: (this.scrollAdjustments += delta),
            behavior: void 0,
          });
        }
        this.pendingMeasuredCacheIndexes.push(item.index);
        this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size4));
        this.notify(false);
      }
    };
    this.measureElement = (node) => {
      if (!node) {
        this.elementsCache.forEach((cached, key) => {
          if (!cached.isConnected) {
            this.observer.unobserve(cached);
            this.elementsCache.delete(key);
          }
        });
        return;
      }
      this._measureElement(node, void 0);
    };
    this.getVirtualItems = memo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (indexes, measurements) => {
        const virtualItems = [];
        for (let k13 = 0, len = indexes.length; k13 < len; k13++) {
          const i16 = indexes[k13];
          const measurement = measurements[i16];
          virtualItems.push(measurement);
        }
        return virtualItems;
      },
      {
        key: "getVirtualItems",
        debug: () => this.options.debug,
      },
    );
    this.getVirtualItemForOffset = (offset4) => {
      const measurements = this.getMeasurements();
      if (measurements.length === 0) {
        return void 0;
      }
      return notUndefined(
        measurements[
          findNearestBinarySearch(
            0,
            measurements.length - 1,
            (index3) => notUndefined(measurements[index3]).start,
            offset4,
          )
        ],
      );
    };
    this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
      const size4 = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        align = toOffset >= scrollOffset + size4 ? "end" : "start";
      }
      if (align === "center") {
        toOffset += (itemSize - size4) / 2;
      } else if (align === "end") {
        toOffset -= size4;
      }
      const maxOffset = this.getTotalSize() + this.options.scrollMargin - size4;
      return Math.max(Math.min(maxOffset, toOffset), 0);
    };
    this.getOffsetForIndex = (index3, align = "auto") => {
      index3 = Math.max(0, Math.min(index3, this.options.count - 1));
      const item = this.measurementsCache[index3];
      if (!item) {
        return void 0;
      }
      const size4 = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        if (item.end >= scrollOffset + size4 - this.options.scrollPaddingEnd) {
          align = "end";
        } else if (
          item.start <=
          scrollOffset + this.options.scrollPaddingStart
        ) {
          align = "start";
        } else {
          return [scrollOffset, align];
        }
      }
      const toOffset =
        align === "end"
          ? item.end + this.options.scrollPaddingEnd
          : item.start - this.options.scrollPaddingStart;
      return [this.getOffsetForAlignment(toOffset, align, item.size), align];
    };
    this.isDynamicMode = () => this.elementsCache.size > 0;
    this.scrollToOffset = (toOffset, { align = "start", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size.",
        );
      }
      this._scrollToOffset(this.getOffsetForAlignment(toOffset, align), {
        adjustments: void 0,
        behavior,
      });
    };
    this.scrollToIndex = (
      index3,
      { align: initialAlign = "auto", behavior } = {},
    ) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size.",
        );
      }
      index3 = Math.max(0, Math.min(index3, this.options.count - 1));
      let attempts = 0;
      const maxAttempts = 10;
      const tryScroll = (currentAlign) => {
        if (!this.targetWindow) return;
        const offsetInfo = this.getOffsetForIndex(index3, currentAlign);
        if (!offsetInfo) {
          console.warn("Failed to get offset for index:", index3);
          return;
        }
        const [offset4, align] = offsetInfo;
        this._scrollToOffset(offset4, { adjustments: void 0, behavior });
        this.targetWindow.requestAnimationFrame(() => {
          const currentOffset = this.getScrollOffset();
          const afterInfo = this.getOffsetForIndex(index3, align);
          if (!afterInfo) {
            console.warn("Failed to get offset for index:", index3);
            return;
          }
          if (!approxEqual(afterInfo[0], currentOffset)) {
            scheduleRetry(align);
          }
        });
      };
      const scheduleRetry = (align) => {
        if (!this.targetWindow) return;
        attempts++;
        if (attempts < maxAttempts) {
          if (this.options.debug) {
            console.info("Schedule retry", attempts, maxAttempts);
          }
          this.targetWindow.requestAnimationFrame(() => tryScroll(align));
        } else {
          console.warn(
            `Failed to scroll to index ${index3} after ${maxAttempts} attempts.`,
          );
        }
      };
      tryScroll(initialAlign);
    };
    this.scrollBy = (delta, { behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size.",
        );
      }
      this._scrollToOffset(this.getScrollOffset() + delta, {
        adjustments: void 0,
        behavior,
      });
    };
    this.getTotalSize = () => {
      var _a;
      const measurements = this.getMeasurements();
      let end;
      if (measurements.length === 0) {
        end = this.options.paddingStart;
      } else if (this.options.lanes === 1) {
        end =
          ((_a = measurements[measurements.length - 1]) == null
            ? void 0
            : _a.end) ?? 0;
      } else {
        const endByLane = Array(this.options.lanes).fill(null);
        let endIndex = measurements.length - 1;
        while (endIndex >= 0 && endByLane.some((val) => val === null)) {
          const item = measurements[endIndex];
          if (endByLane[item.lane] === null) {
            endByLane[item.lane] = item.end;
          }
          endIndex--;
        }
        end = Math.max(...endByLane.filter((val) => val !== null));
      }
      return Math.max(
        end - this.options.scrollMargin + this.options.paddingEnd,
        0,
      );
    };
    this._scrollToOffset = (offset4, { adjustments, behavior }) => {
      this.options.scrollToFn(offset4, { behavior, adjustments }, this);
    };
    this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map();
      this.notify(false);
    };
    this.setOptions(opts);
  }
};
var findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    const middle = ((low + high) / 2) | 0;
    const currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange({ measurements, outerSize, scrollOffset, lanes }) {
  const lastIndex = measurements.length - 1;
  const getOffset = (index3) => measurements[index3].start;
  if (measurements.length <= lanes) {
    return {
      startIndex: 0,
      endIndex: lastIndex,
    };
  }
  let startIndex = findNearestBinarySearch(
    0,
    lastIndex,
    getOffset,
    scrollOffset,
  );
  let endIndex = startIndex;
  if (lanes === 1) {
    while (
      endIndex < lastIndex &&
      measurements[endIndex].end < scrollOffset + outerSize
    ) {
      endIndex++;
    }
  } else if (lanes > 1) {
    const endPerLane = Array(lanes).fill(0);
    while (
      endIndex < lastIndex &&
      endPerLane.some((pos) => pos < scrollOffset + outerSize)
    ) {
      const item = measurements[endIndex];
      endPerLane[item.lane] = item.end;
      endIndex++;
    }
    const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
    while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
      const item = measurements[startIndex];
      startPerLane[item.lane] = item.start;
      startIndex--;
    }
    startIndex = Math.max(0, startIndex - (startIndex % lanes));
    endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - (endIndex % lanes)));
  }
  return { startIndex, endIndex };
}

// node_modules/@tanstack/react-virtual/dist/esm/index.js
var useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
function useVirtualizerBase(options) {
  const rerender = React.useReducer(() => ({}), {})[1];
  const resolvedOptions = {
    ...options,
    onChange: (instance2, sync) => {
      var _a;
      if (sync) {
        (0, import_react_dom5.flushSync)(rerender);
      } else {
        rerender();
      }
      (_a = options.onChange) == null
        ? void 0
        : _a.call(options, instance2, sync);
    },
  };
  const [instance] = React.useState(() => new Virtualizer(resolvedOptions));
  instance.setOptions(resolvedOptions);
  useIsomorphicLayoutEffect(() => {
    return instance._didMount();
  }, []);
  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });
  return instance;
}
function useVirtualizer(options) {
  return useVirtualizerBase({
    observeElementRect,
    observeElementOffset,
    scrollToFn: elementScroll,
    ...options,
  });
}

// node_modules/@headlessui/react/dist/components/combobox/combobox.js
var import_react90 = __toESM(require_react(), 1);
var import_react_dom9 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/hooks/use-by-comparator.js
var import_react61 = __toESM(require_react(), 1);
function l8(e9, r22) {
  return e9 !== null &&
    r22 !== null &&
    typeof e9 == "object" &&
    typeof r22 == "object" &&
    "id" in e9 &&
    "id" in r22
    ? e9.id === r22.id
    : e9 === r22;
}
function u9(e9 = l8) {
  return (0, import_react61.useCallback)(
    (r22, t14) => {
      if (typeof e9 == "string") {
        let o20 = e9;
        return (
          (r22 == null ? void 0 : r22[o20]) ===
          (t14 == null ? void 0 : t14[o20])
        );
      }
      return e9(r22, t14);
    },
    [e9],
  );
}

// node_modules/@headlessui/react/dist/hooks/use-element-size.js
var import_react62 = __toESM(require_react(), 1);
function h3(i16) {
  if (i16 === null) return { width: 0, height: 0 };
  let { width: t14, height: e9 } = i16.getBoundingClientRect();
  return { width: t14, height: e9 };
}
function w5(i16, t14, e9 = false) {
  let [r22, f21] = (0, import_react62.useState)(() => h3(t14));
  return (
    n(() => {
      if (!t14 || !i16) return;
      let n17 = o2();
      return (
        n17.requestAnimationFrame(function s20() {
          (n17.requestAnimationFrame(s20),
            f21((u25) => {
              let o20 = h3(t14);
              return o20.width === u25.width && o20.height === u25.height
                ? u25
                : o20;
            }));
        }),
        () => {
          n17.dispose();
        }
      );
    }, [t14, i16]),
    e9 ? { width: `${r22.width}px`, height: `${r22.height}px` } : r22
  );
}

// node_modules/@headlessui/react/dist/hooks/use-handle-toggle.js
var import_react63 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/components/mouse.js
var g3 = ((f21) => (
  (f21[(f21.Left = 0)] = "Left"),
  (f21[(f21.Right = 2)] = "Right"),
  f21
))(g3 || {});

// node_modules/@headlessui/react/dist/hooks/use-handle-toggle.js
function s8(t14) {
  let r22 = (0, import_react63.useRef)(null),
    u25 = o4((e9) => {
      ((r22.current = e9.pointerType),
        !s6(e9.currentTarget) &&
          e9.pointerType === "mouse" &&
          e9.button === g3.Left &&
          (e9.preventDefault(), t14(e9)));
    }),
    i16 = o4((e9) => {
      r22.current !== "mouse" && (s6(e9.currentTarget) || t14(e9));
    });
  return { onPointerDown: u25, onClick: i16 };
}

// node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js
var import_react64 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/default-map.js
var a8 = class extends Map {
  constructor(t14) {
    super();
    this.factory = t14;
  }
  get(t14) {
    let e9 = super.get(t14);
    return (e9 === void 0 && ((e9 = this.factory(t14)), this.set(t14, e9)), e9);
  }
};

// node_modules/@headlessui/react/dist/machine.js
var h4 = Object.defineProperty;
var v4 = (t14, e9, r22) =>
  e9 in t14
    ? h4(t14, e9, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: r22,
      })
    : (t14[e9] = r22);
var S2 = (t14, e9, r22) => (
  v4(t14, typeof e9 != "symbol" ? e9 + "" : e9, r22),
  r22
);
var b3 = (t14, e9, r22) => {
  if (!e9.has(t14)) throw TypeError("Cannot " + r22);
};
var i7 = (t14, e9, r22) => (
  b3(t14, e9, "read from private field"),
  r22 ? r22.call(t14) : e9.get(t14)
);
var c4 = (t14, e9, r22) => {
  if (e9.has(t14))
    throw TypeError("Cannot add the same private member more than once");
  e9 instanceof WeakSet ? e9.add(t14) : e9.set(t14, r22);
};
var u10 = (t14, e9, r22, s20) => (
  b3(t14, e9, "write to private field"),
  s20 ? s20.call(t14, r22) : e9.set(t14, r22),
  r22
);
var n9;
var a9;
var o9;
var T3 = class {
  constructor(e9) {
    c4(this, n9, {});
    c4(this, a9, new a8(() => /* @__PURE__ */ new Set()));
    c4(this, o9, /* @__PURE__ */ new Set());
    S2(this, "disposables", o2());
    (u10(this, n9, e9),
      s.isServer &&
        this.disposables.microTask(() => {
          this.dispose();
        }));
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return i7(this, n9);
  }
  subscribe(e9, r22) {
    if (s.isServer) return () => {};
    let s20 = { selector: e9, callback: r22, current: e9(i7(this, n9)) };
    return (
      i7(this, o9).add(s20),
      this.disposables.add(() => {
        i7(this, o9).delete(s20);
      })
    );
  }
  on(e9, r22) {
    return s.isServer
      ? () => {}
      : (i7(this, a9).get(e9).add(r22),
        this.disposables.add(() => {
          i7(this, a9).get(e9).delete(r22);
        }));
  }
  send(e9) {
    let r22 = this.reduce(i7(this, n9), e9);
    if (r22 !== i7(this, n9)) {
      u10(this, n9, r22);
      for (let s20 of i7(this, o9)) {
        let l19 = s20.selector(i7(this, n9));
        j4(s20.current, l19) || ((s20.current = l19), s20.callback(l19));
      }
      for (let s20 of i7(this, a9).get(e9.type)) s20(i7(this, n9), e9);
    }
  }
};
((n9 = /* @__PURE__ */ new WeakMap()),
  (a9 = /* @__PURE__ */ new WeakMap()),
  (o9 = /* @__PURE__ */ new WeakMap()));
function j4(t14, e9) {
  return Object.is(t14, e9)
    ? true
    : typeof t14 != "object" ||
        t14 === null ||
        typeof e9 != "object" ||
        e9 === null
      ? false
      : Array.isArray(t14) && Array.isArray(e9)
        ? t14.length !== e9.length
          ? false
          : f8(t14[Symbol.iterator](), e9[Symbol.iterator]())
        : (t14 instanceof Map && e9 instanceof Map) ||
            (t14 instanceof Set && e9 instanceof Set)
          ? t14.size !== e9.size
            ? false
            : f8(t14.entries(), e9.entries())
          : p3(t14) && p3(e9)
            ? f8(
                Object.entries(t14)[Symbol.iterator](),
                Object.entries(e9)[Symbol.iterator](),
              )
            : false;
}
function f8(t14, e9) {
  do {
    let r22 = t14.next(),
      s20 = e9.next();
    if (r22.done && s20.done) return true;
    if (r22.done || s20.done || !Object.is(r22.value, s20.value)) return false;
  } while (true);
}
function p3(t14) {
  if (Object.prototype.toString.call(t14) !== "[object Object]") return false;
  let e9 = Object.getPrototypeOf(t14);
  return e9 === null || Object.getPrototypeOf(e9) === null;
}
function k3(t14) {
  let [e9, r22] = t14(),
    s20 = o2();
  return (...l19) => {
    (e9(...l19), s20.dispose(), s20.microTask(r22));
  };
}

// node_modules/@headlessui/react/dist/machines/stack-machine.js
var a10 = Object.defineProperty;
var r10 = (e9, c21, t14) =>
  c21 in e9
    ? a10(e9, c21, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: t14,
      })
    : (e9[c21] = t14);
var p4 = (e9, c21, t14) => (
  r10(e9, typeof c21 != "symbol" ? c21 + "" : c21, t14),
  t14
);
var k4 = ((t14) => (
  (t14[(t14.Push = 0)] = "Push"),
  (t14[(t14.Pop = 1)] = "Pop"),
  t14
))(k4 || {});
var y3 = {
  [0](e9, c21) {
    let t14 = c21.id,
      s20 = e9.stack,
      i16 = e9.stack.indexOf(t14);
    if (i16 !== -1) {
      let n17 = e9.stack.slice();
      return (
        n17.splice(i16, 1),
        n17.push(t14),
        (s20 = n17),
        { ...e9, stack: s20 }
      );
    }
    return { ...e9, stack: [...e9.stack, t14] };
  },
  [1](e9, c21) {
    let t14 = c21.id,
      s20 = e9.stack.indexOf(t14);
    if (s20 === -1) return e9;
    let i16 = e9.stack.slice();
    return (i16.splice(s20, 1), { ...e9, stack: i16 });
  },
};
var o10 = class _o2 extends T3 {
  constructor() {
    super(...arguments);
    p4(this, "actions", {
      push: (t14) => this.send({ type: 0, id: t14 }),
      pop: (t14) => this.send({ type: 1, id: t14 }),
    });
    p4(this, "selectors", {
      isTop: (t14, s20) => t14.stack[t14.stack.length - 1] === s20,
      inStack: (t14, s20) => t14.stack.includes(s20),
    });
  }
  static new() {
    return new _o2({ stack: [] });
  }
  reduce(t14, s20) {
    return u(s20.type, y3, t14, s20);
  }
};
var x2 = new a8(() => o10.new());

// node_modules/@headlessui/react/dist/react-glue.js
var import_with_selector = __toESM(require_with_selector(), 1);
function S3(e9, n17, r22 = j4) {
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(
    o4((i16) => e9.subscribe(s9, i16)),
    o4(() => e9.state),
    o4(() => e9.state),
    o4(n17),
    r22,
  );
}
function s9(e9) {
  return e9;
}

// node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js
function I3(o20, s20) {
  let t14 = (0, import_react64.useId)(),
    r22 = x2.get(s20),
    [i16, c21] = S3(
      r22,
      (0, import_react64.useCallback)(
        (e9) => [r22.selectors.isTop(e9, t14), r22.selectors.inStack(e9, t14)],
        [r22, t14],
      ),
    );
  return (
    n(() => {
      if (o20) return (r22.actions.push(t14), () => r22.actions.pop(t14));
    }, [r22, o20, t14]),
    o20 ? (c21 ? i16 : true) : false
  );
}

// node_modules/@headlessui/react/dist/hooks/use-inert-others.js
var f9 = /* @__PURE__ */ new Map();
var u12 = /* @__PURE__ */ new Map();
function h5(t14) {
  var e9;
  let r22 = (e9 = u12.get(t14)) != null ? e9 : 0;
  return (
    u12.set(t14, r22 + 1),
    r22 !== 0
      ? () => m6(t14)
      : (f9.set(t14, {
          "aria-hidden": t14.getAttribute("aria-hidden"),
          inert: t14.inert,
        }),
        t14.setAttribute("aria-hidden", "true"),
        (t14.inert = true),
        () => m6(t14))
  );
}
function m6(t14) {
  var i16;
  let r22 = (i16 = u12.get(t14)) != null ? i16 : 1;
  if ((r22 === 1 ? u12.delete(t14) : u12.set(t14, r22 - 1), r22 !== 1)) return;
  let e9 = f9.get(t14);
  e9 &&
    (e9["aria-hidden"] === null
      ? t14.removeAttribute("aria-hidden")
      : t14.setAttribute("aria-hidden", e9["aria-hidden"]),
    (t14.inert = e9.inert),
    f9.delete(t14));
}
function y4(t14, { allowed: r22, disallowed: e9 } = {}) {
  let i16 = I3(t14, "inert-others");
  n(() => {
    var d14, c21;
    if (!i16) return;
    let a28 = o2();
    for (let n17 of (d14 = e9 == null ? void 0 : e9()) != null ? d14 : [])
      n17 && a28.add(h5(n17));
    let s20 = (c21 = r22 == null ? void 0 : r22()) != null ? c21 : [];
    for (let n17 of s20) {
      if (!n17) continue;
      let l19 = l(n17);
      if (!l19) continue;
      let o20 = n17.parentElement;
      for (; o20 && o20 !== l19.body; ) {
        for (let p13 of o20.children)
          s20.some((E13) => p13.contains(E13)) || a28.add(h5(p13));
        o20 = o20.parentElement;
      }
    }
    return a28.dispose;
  }, [i16, r22, e9]);
}

// node_modules/@headlessui/react/dist/hooks/use-on-disappear.js
var import_react65 = __toESM(require_react(), 1);
function p5(s20, n17, o20) {
  let i16 = s3((t14) => {
    let e9 = t14.getBoundingClientRect();
    e9.x === 0 && e9.y === 0 && e9.width === 0 && e9.height === 0 && o20();
  });
  (0, import_react65.useEffect)(() => {
    if (!s20) return;
    let t14 = n17 === null ? null : n5(n17) ? n17 : n17.current;
    if (!t14) return;
    let e9 = o2();
    if (typeof ResizeObserver != "undefined") {
      let r22 = new ResizeObserver(() => i16.current(t14));
      (r22.observe(t14), e9.add(() => r22.disconnect()));
    }
    if (typeof IntersectionObserver != "undefined") {
      let r22 = new IntersectionObserver(() => i16.current(t14));
      (r22.observe(t14), e9.add(() => r22.disconnect()));
    }
    return () => e9.dispose();
  }, [n17, i16, s20]);
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var import_react68 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/focus-management.js
var E5 = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "details>summary",
  "textarea:not([disabled])",
]
  .map((e9) => `${e9}:not([tabindex='-1'])`)
  .join(",");
var S4 = ["[data-autofocus]"]
  .map((e9) => `${e9}:not([tabindex='-1'])`)
  .join(",");
var T4 = ((o20) => (
  (o20[(o20.First = 1)] = "First"),
  (o20[(o20.Previous = 2)] = "Previous"),
  (o20[(o20.Next = 4)] = "Next"),
  (o20[(o20.Last = 8)] = "Last"),
  (o20[(o20.WrapAround = 16)] = "WrapAround"),
  (o20[(o20.NoScroll = 32)] = "NoScroll"),
  (o20[(o20.AutoFocus = 64)] = "AutoFocus"),
  o20
))(T4 || {});
var A2 = ((n17) => (
  (n17[(n17.Error = 0)] = "Error"),
  (n17[(n17.Overflow = 1)] = "Overflow"),
  (n17[(n17.Success = 2)] = "Success"),
  (n17[(n17.Underflow = 3)] = "Underflow"),
  n17
))(A2 || {});
var O = ((t14) => (
  (t14[(t14.Previous = -1)] = "Previous"),
  (t14[(t14.Next = 1)] = "Next"),
  t14
))(O || {});
function x3(e9 = document.body) {
  return e9 == null
    ? []
    : Array.from(e9.querySelectorAll(E5)).sort((r22, t14) =>
        Math.sign(
          (r22.tabIndex || Number.MAX_SAFE_INTEGER) -
            (t14.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      );
}
function h6(e9 = document.body) {
  return e9 == null
    ? []
    : Array.from(e9.querySelectorAll(S4)).sort((r22, t14) =>
        Math.sign(
          (r22.tabIndex || Number.MAX_SAFE_INTEGER) -
            (t14.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      );
}
var I4 = ((t14) => (
  (t14[(t14.Strict = 0)] = "Strict"),
  (t14[(t14.Loose = 1)] = "Loose"),
  t14
))(I4 || {});
function H4(e9, r22 = 0) {
  var t14;
  return e9 === ((t14 = l(e9)) == null ? void 0 : t14.body)
    ? false
    : u(r22, {
        [0]() {
          return e9.matches(E5);
        },
        [1]() {
          let l19 = e9;
          for (; l19 !== null; ) {
            if (l19.matches(E5)) return true;
            l19 = l19.parentElement;
          }
          return false;
        },
      });
}
function K2(e9) {
  o2().nextFrame(() => {
    let r22 = e(e9);
    r22 && i4(r22) && !H4(r22, 0) && w6(e9);
  });
}
var g4 = ((t14) => (
  (t14[(t14.Keyboard = 0)] = "Keyboard"),
  (t14[(t14.Mouse = 1)] = "Mouse"),
  t14
))(g4 || {});
typeof window != "undefined" &&
  typeof document != "undefined" &&
  (document.addEventListener(
    "keydown",
    (e9) => {
      e9.metaKey ||
        e9.altKey ||
        e9.ctrlKey ||
        (document.documentElement.dataset.headlessuiFocusVisible = "");
    },
    true,
  ),
  document.addEventListener(
    "click",
    (e9) => {
      e9.detail === 1
        ? delete document.documentElement.dataset.headlessuiFocusVisible
        : e9.detail === 0 &&
          (document.documentElement.dataset.headlessuiFocusVisible = "");
    },
    true,
  ));
function w6(e9) {
  e9 == null || e9.focus({ preventScroll: true });
}
var _2 = ["textarea", "input"].join(",");
function P3(e9) {
  var r22, t14;
  return (t14 =
    (r22 = e9 == null ? void 0 : e9.matches) == null
      ? void 0
      : r22.call(e9, _2)) != null
    ? t14
    : false;
}
function G2(e9, r22 = (t14) => t14) {
  return e9.slice().sort((t14, l19) => {
    let n17 = r22(t14),
      a28 = r22(l19);
    if (n17 === null || a28 === null) return 0;
    let u25 = n17.compareDocumentPosition(a28);
    return u25 & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : u25 & Node.DOCUMENT_POSITION_PRECEDING
        ? 1
        : 0;
  });
}
function R3(e9, r22, t14 = e9 === null ? document.body : r3(e9)) {
  return v5(x3(t14), r22, { relativeTo: e9 });
}
function v5(
  e9,
  r22,
  { sorted: t14 = true, relativeTo: l19 = null, skipElements: n17 = [] } = {},
) {
  let a28 = Array.isArray(e9) ? (e9.length > 0 ? r3(e9[0]) : document) : r3(e9),
    u25 = Array.isArray(e9) ? (t14 ? G2(e9) : e9) : r22 & 64 ? h6(e9) : x3(e9);
  (n17.length > 0 &&
    u25.length > 1 &&
    (u25 = u25.filter(
      (i16) =>
        !n17.some((d14) =>
          d14 != null && "current" in d14
            ? (d14 == null ? void 0 : d14.current) === i16
            : d14 === i16,
        ),
    )),
    (l19 = l19 != null ? l19 : a28 == null ? void 0 : a28.activeElement));
  let o20 = (() => {
      if (r22 & 5) return 1;
      if (r22 & 10) return -1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      );
    })(),
    M12 = (() => {
      if (r22 & 1) return 0;
      if (r22 & 2) return Math.max(0, u25.indexOf(l19)) - 1;
      if (r22 & 4) return Math.max(0, u25.indexOf(l19)) + 1;
      if (r22 & 8) return u25.length - 1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      );
    })(),
    N4 = r22 & 32 ? { preventScroll: true } : {},
    m10 = 0,
    c21 = u25.length,
    s20;
  do {
    if (m10 >= c21 || m10 + c21 <= 0) return 0;
    let i16 = M12 + m10;
    if (r22 & 16) i16 = (i16 + c21) % c21;
    else {
      if (i16 < 0) return 3;
      if (i16 >= c21) return 1;
    }
    ((s20 = u25[i16]), s20 == null || s20.focus(N4), (m10 += o20));
  } while (s20 !== e(s20));
  return (r22 & 6 && P3(s20) && s20.select(), 2);
}

// node_modules/@headlessui/react/dist/utils/platform.js
function t6() {
  return (
    /iPhone/gi.test(window.navigator.platform) ||
    (/Mac/gi.test(window.navigator.platform) &&
      window.navigator.maxTouchPoints > 0)
  );
}
function i8() {
  return /Android/gi.test(window.navigator.userAgent);
}
function n11() {
  return t6() || i8();
}

// node_modules/@headlessui/react/dist/hooks/use-document-event.js
var import_react66 = __toESM(require_react(), 1);
function i9(t14, e9, o20, n17) {
  let u25 = s3(o20);
  (0, import_react66.useEffect)(() => {
    if (!t14) return;
    function r22(m10) {
      u25.current(m10);
    }
    return (
      document.addEventListener(e9, r22, n17),
      () => document.removeEventListener(e9, r22, n17)
    );
  }, [t14, e9, n17]);
}

// node_modules/@headlessui/react/dist/hooks/use-window-event.js
var import_react67 = __toESM(require_react(), 1);
function s10(t14, e9, o20, n17) {
  let i16 = s3(o20);
  (0, import_react67.useEffect)(() => {
    if (!t14) return;
    function r22(d14) {
      i16.current(d14);
    }
    return (
      window.addEventListener(e9, r22, n17),
      () => window.removeEventListener(e9, r22, n17)
    );
  }, [t14, e9, n17]);
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var C6 = 30;
function k5(o20, f21, h15) {
  let m10 = s3(h15),
    s20 = (0, import_react68.useCallback)(
      function (e9, c21) {
        if (e9.defaultPrevented) return;
        let r22 = c21(e9);
        if (
          r22 === null ||
          !r22.getRootNode().contains(r22) ||
          !r22.isConnected
        )
          return;
        let M12 = (function u25(n17) {
          return typeof n17 == "function"
            ? u25(n17())
            : Array.isArray(n17) || n17 instanceof Set
              ? n17
              : [n17];
        })(f21);
        for (let u25 of M12)
          if (
            u25 !== null &&
            (u25.contains(r22) ||
              (e9.composed && e9.composedPath().includes(u25)))
          )
            return;
        return (
          !H4(r22, I4.Loose) && r22.tabIndex !== -1 && e9.preventDefault(),
          m10.current(e9, r22)
        );
      },
      [m10, f21],
    ),
    i16 = (0, import_react68.useRef)(null);
  (i9(
    o20,
    "pointerdown",
    (t14) => {
      var e9, c21;
      n11() ||
        (i16.current =
          ((c21 = (e9 = t14.composedPath) == null ? void 0 : e9.call(t14)) ==
          null
            ? void 0
            : c21[0]) || t14.target);
    },
    true,
  ),
    i9(
      o20,
      "pointerup",
      (t14) => {
        if (n11() || !i16.current) return;
        let e9 = i16.current;
        return ((i16.current = null), s20(t14, () => e9));
      },
      true,
    ));
  let l19 = (0, import_react68.useRef)({ x: 0, y: 0 });
  (i9(
    o20,
    "touchstart",
    (t14) => {
      ((l19.current.x = t14.touches[0].clientX),
        (l19.current.y = t14.touches[0].clientY));
    },
    true,
  ),
    i9(
      o20,
      "touchend",
      (t14) => {
        let e9 = {
          x: t14.changedTouches[0].clientX,
          y: t14.changedTouches[0].clientY,
        };
        if (
          !(
            Math.abs(e9.x - l19.current.x) >= C6 ||
            Math.abs(e9.y - l19.current.y) >= C6
          )
        )
          return s20(t14, () => (i4(t14.target) ? t14.target : null));
      },
      true,
    ),
    s10(
      o20,
      "blur",
      (t14) =>
        s20(t14, () =>
          u5(window.document.activeElement)
            ? window.document.activeElement
            : null,
        ),
      true,
    ));
}

// node_modules/@headlessui/react/dist/hooks/use-owner.js
var import_react69 = __toESM(require_react(), 1);
function u13(...e9) {
  return (0, import_react69.useMemo)(() => l(...e9), [...e9]);
}
function c6(...e9) {
  return (0, import_react69.useMemo)(() => r3(...e9), [...e9]);
}

// node_modules/@headlessui/react/dist/hooks/use-quick-release.js
var import_react70 = __toESM(require_react(), 1);
var H5 = ((e9) => (
  (e9[(e9.Ignore = 0)] = "Ignore"),
  (e9[(e9.Select = 1)] = "Select"),
  (e9[(e9.Close = 2)] = "Close"),
  e9
))(H5 || {});
var S5 = {
  Ignore: { kind: 0 },
  Select: (r22) => ({ kind: 1, target: r22 }),
  Close: { kind: 2 },
};
var M3 = 200;
var f10 = 5;
function L4(r22, { trigger: n17, action: T10, close: e9, select: p13 }) {
  let l19 = (0, import_react70.useRef)(null),
    i16 = (0, import_react70.useRef)(null),
    u25 = (0, import_react70.useRef)(null);
  (i9(r22 && n17 !== null, "pointerdown", (t14) => {
    o7(t14 == null ? void 0 : t14.target) &&
      n17 != null &&
      n17.contains(t14.target) &&
      ((i16.current = t14.x),
      (u25.current = t14.y),
      (l19.current = t14.timeStamp));
  }),
    i9(
      r22 && n17 !== null,
      "pointerup",
      (t14) => {
        var s20, m10;
        let c21 = l19.current;
        if (
          c21 === null ||
          ((l19.current = null), !i4(t14.target)) ||
          (Math.abs(t14.x - ((s20 = i16.current) != null ? s20 : t14.x)) <
            f10 &&
            Math.abs(t14.y - ((m10 = u25.current) != null ? m10 : t14.y)) < f10)
        )
          return;
        let a28 = T10(t14);
        switch (a28.kind) {
          case 0:
            return;
          case 1: {
            t14.timeStamp - c21 > M3 && (p13(a28.target), e9());
            break;
          }
          case 2: {
            e9();
            break;
          }
        }
      },
      { capture: true },
    ));
}

// node_modules/@headlessui/react/dist/hooks/use-refocusable-input.js
var import_react72 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-event-listener.js
var import_react71 = __toESM(require_react(), 1);
function E7(n17, e9, a28, t14) {
  let i16 = s3(a28);
  (0, import_react71.useEffect)(() => {
    n17 = n17 != null ? n17 : window;
    function r22(o20) {
      i16.current(o20);
    }
    return (
      n17.addEventListener(e9, r22, t14),
      () => n17.removeEventListener(e9, r22, t14)
    );
  }, [n17, e9, t14]);
}

// node_modules/@headlessui/react/dist/hooks/use-refocusable-input.js
function v6(e9) {
  let l19 = (0, import_react72.useRef)({
    value: "",
    selectionStart: null,
    selectionEnd: null,
  });
  return (
    E7(e9, "blur", (n17) => {
      let t14 = n17.target;
      l5(t14) &&
        (l19.current = {
          value: t14.value,
          selectionStart: t14.selectionStart,
          selectionEnd: t14.selectionEnd,
        });
    }),
    o4(() => {
      if (!d2(e9) && l5(e9) && e9.isConnected) {
        if ((e9.focus({ preventScroll: true }), e9.value !== l19.current.value))
          e9.setSelectionRange(e9.value.length, e9.value.length);
        else {
          let { selectionStart: n17, selectionEnd: t14 } = l19.current;
          n17 !== null && t14 !== null && e9.setSelectionRange(n17, t14);
        }
        l19.current = { value: "", selectionStart: null, selectionEnd: null };
      }
    })
  );
}

// node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
var import_react73 = __toESM(require_react(), 1);
function e5(t14, u25) {
  return (0, import_react73.useMemo)(() => {
    var n17;
    if (t14.type) return t14.type;
    let r22 = (n17 = t14.as) != null ? n17 : "button";
    if (
      (typeof r22 == "string" && r22.toLowerCase() === "button") ||
      ((u25 == null ? void 0 : u25.tagName) === "BUTTON" &&
        !u25.hasAttribute("type"))
    )
      return "button";
  }, [t14.type, t14.as, u25]);
}

// node_modules/@headlessui/react/dist/hooks/use-store.js
var import_react74 = __toESM(require_react(), 1);
function o13(t14) {
  return (0, import_react74.useSyncExternalStore)(
    t14.subscribe,
    t14.getSnapshot,
    t14.getSnapshot,
  );
}

// node_modules/@headlessui/react/dist/utils/store.js
function a14(o20, r22) {
  let t14 = o20(),
    n17 = /* @__PURE__ */ new Set();
  return {
    getSnapshot() {
      return t14;
    },
    subscribe(e9) {
      return (n17.add(e9), () => n17.delete(e9));
    },
    dispatch(e9, ...s20) {
      let i16 = r22[e9].call(t14, ...s20);
      i16 && ((t14 = i16), n17.forEach((c21) => c21()));
    },
  };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js
function d6() {
  let r22;
  return {
    before({ doc: e9 }) {
      var l19;
      let o20 = e9.documentElement,
        t14 = (l19 = e9.defaultView) != null ? l19 : window;
      r22 = Math.max(0, t14.innerWidth - o20.clientWidth);
    },
    after({ doc: e9, d: o20 }) {
      let t14 = e9.documentElement,
        l19 = Math.max(0, t14.clientWidth - t14.offsetWidth),
        n17 = Math.max(0, r22 - l19);
      o20.style(t14, "paddingRight", `${n17}px`);
    },
  };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js
function w7() {
  return t6()
    ? {
        before({ doc: o20, d: r22, meta: m10 }) {
          function a28(s20) {
            for (let l19 of m10().containers)
              for (let c21 of l19()) if (c21.contains(s20)) return true;
            return false;
          }
          r22.microTask(() => {
            var c21;
            if (
              window.getComputedStyle(o20.documentElement).scrollBehavior !==
              "auto"
            ) {
              let t14 = o2();
              (t14.style(o20.documentElement, "scrollBehavior", "auto"),
                r22.add(() => r22.microTask(() => t14.dispose())));
            }
            let s20 = (c21 = window.scrollY) != null ? c21 : window.pageYOffset,
              l19 = null;
            (r22.addEventListener(
              o20,
              "click",
              (t14) => {
                if (i4(t14.target))
                  try {
                    let e9 = t14.target.closest("a");
                    if (!e9) return;
                    let { hash: n17 } = new URL(e9.href),
                      f21 = o20.querySelector(n17);
                    i4(f21) && !a28(f21) && (l19 = f21);
                  } catch {}
              },
              true,
            ),
              r22.group((t14) => {
                r22.addEventListener(o20, "touchstart", (e9) => {
                  if ((t14.dispose(), i4(e9.target) && r7(e9.target)))
                    if (a28(e9.target)) {
                      let n17 = e9.target;
                      for (; n17.parentElement && a28(n17.parentElement); )
                        n17 = n17.parentElement;
                      t14.style(n17, "overscrollBehavior", "contain");
                    } else t14.style(e9.target, "touchAction", "none");
                });
              }),
              r22.addEventListener(
                o20,
                "touchmove",
                (t14) => {
                  if (i4(t14.target)) {
                    if (l5(t14.target)) return;
                    if (a28(t14.target)) {
                      let e9 = t14.target;
                      for (
                        ;
                        e9.parentElement &&
                        e9.dataset.headlessuiPortal !== "" &&
                        !(
                          e9.scrollHeight > e9.clientHeight ||
                          e9.scrollWidth > e9.clientWidth
                        );

                      )
                        e9 = e9.parentElement;
                      e9.dataset.headlessuiPortal === "" &&
                        t14.preventDefault();
                    } else t14.preventDefault();
                  }
                },
                { passive: false },
              ),
              r22.add(() => {
                var e9;
                let t14 =
                  (e9 = window.scrollY) != null ? e9 : window.pageYOffset;
                (s20 !== t14 && window.scrollTo(0, s20),
                  l19 &&
                    l19.isConnected &&
                    (l19.scrollIntoView({ block: "nearest" }), (l19 = null)));
              }));
          });
        },
      }
    : {};
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js
function r11() {
  return {
    before({ doc: e9, d: o20 }) {
      o20.style(e9.documentElement, "overflow", "hidden");
    },
  };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js
function r12(e9) {
  let o20 = {};
  for (let t14 of e9) Object.assign(o20, t14(o20));
  return o20;
}
var c7 = a14(() => /* @__PURE__ */ new Map(), {
  PUSH(e9, o20) {
    var n17;
    let t14 =
      (n17 = this.get(e9)) != null
        ? n17
        : {
            doc: e9,
            count: 0,
            d: o2(),
            meta: /* @__PURE__ */ new Set(),
            computedMeta: {},
          };
    return (
      t14.count++,
      t14.meta.add(o20),
      (t14.computedMeta = r12(t14.meta)),
      this.set(e9, t14),
      this
    );
  },
  POP(e9, o20) {
    let t14 = this.get(e9);
    return (
      t14 &&
        (t14.count--, t14.meta.delete(o20), (t14.computedMeta = r12(t14.meta))),
      this
    );
  },
  SCROLL_PREVENT(e9) {
    let o20 = {
        doc: e9.doc,
        d: e9.d,
        meta() {
          return e9.computedMeta;
        },
      },
      t14 = [w7(), d6(), r11()];
    (t14.forEach(({ before: n17 }) => (n17 == null ? void 0 : n17(o20))),
      t14.forEach(({ after: n17 }) => (n17 == null ? void 0 : n17(o20))));
  },
  SCROLL_ALLOW({ d: e9 }) {
    e9.dispose();
  },
  TEARDOWN({ doc: e9 }) {
    this.delete(e9);
  },
});
c7.subscribe(() => {
  let e9 = c7.getSnapshot(),
    o20 = /* @__PURE__ */ new Map();
  for (let [t14] of e9) o20.set(t14, t14.documentElement.style.overflow);
  for (let t14 of e9.values()) {
    let n17 = o20.get(t14.doc) === "hidden",
      a28 = t14.count !== 0;
    (((a28 && !n17) || (!a28 && n17)) &&
      c7.dispatch(t14.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t14),
      t14.count === 0 && c7.dispatch("TEARDOWN", t14));
  }
});

// node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js
function a15(r22, e9, n17 = () => ({ containers: [] })) {
  let f21 = o13(c7),
    o20 = e9 ? f21.get(e9) : void 0,
    i16 = o20 ? o20.count > 0 : false;
  return (
    n(() => {
      if (!(!e9 || !r22))
        return (
          c7.dispatch("PUSH", e9, n17),
          () => c7.dispatch("POP", e9, n17)
        );
    }, [r22, e9]),
    i16
  );
}

// node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js
function f11(e9, c21, n17 = () => [document.body]) {
  let r22 = I3(e9, "scroll-lock");
  a15(r22, c21, (t14) => {
    var o20;
    return {
      containers: [...((o20 = t14.containers) != null ? o20 : []), n17],
    };
  });
}

// node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js
var import_react75 = __toESM(require_react(), 1);
function t7(e9) {
  return [e9.screenX, e9.screenY];
}
function u15() {
  let e9 = (0, import_react75.useRef)([-1, -1]);
  return {
    wasMoved(r22) {
      let n17 = t7(r22);
      return e9.current[0] === n17[0] && e9.current[1] === n17[1]
        ? false
        : ((e9.current = n17), true);
    },
    update(r22) {
      e9.current = t7(r22);
    },
  };
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
var import_react77 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-flags.js
var import_react76 = __toESM(require_react(), 1);
function c8(u25 = 0) {
  let [r22, a28] = (0, import_react76.useState)(u25),
    g6 = (0, import_react76.useCallback)((e9) => a28(e9), []),
    s20 = (0, import_react76.useCallback)((e9) => a28((l19) => l19 | e9), []),
    m10 = (0, import_react76.useCallback)((e9) => (r22 & e9) === e9, [r22]),
    n17 = (0, import_react76.useCallback)((e9) => a28((l19) => l19 & ~e9), []),
    F7 = (0, import_react76.useCallback)((e9) => a28((l19) => l19 ^ e9), []);
  return {
    flags: r22,
    setFlag: g6,
    addFlag: s20,
    hasFlag: m10,
    removeFlag: n17,
    toggleFlag: F7,
  };
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
var T6;
var S6;
typeof process != "undefined" &&
  typeof globalThis != "undefined" &&
  typeof Element != "undefined" &&
  ((T6 = process == null ? void 0 : process.env) == null
    ? void 0
    : T6["NODE_ENV"]) === "test" &&
  typeof ((S6 = Element == null ? void 0 : Element.prototype) == null
    ? void 0
    : S6.getAnimations) == "undefined" &&
  (Element.prototype.getAnimations = function () {
    return (
      console.warn(
        [
          "Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.",
          "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.",
          "",
          "Example usage:",
          "```js",
          "import { mockAnimationsApi } from 'jsdom-testing-mocks'",
          "mockAnimationsApi()",
          "```",
        ].join(`
`),
      ),
      []
    );
  });
var A3 = ((i16) => (
  (i16[(i16.None = 0)] = "None"),
  (i16[(i16.Closed = 1)] = "Closed"),
  (i16[(i16.Enter = 2)] = "Enter"),
  (i16[(i16.Leave = 4)] = "Leave"),
  i16
))(A3 || {});
function x4(e9) {
  let r22 = {};
  for (let t14 in e9) e9[t14] === true && (r22[`data-${t14}`] = "");
  return r22;
}
function N2(e9, r22, t14, n17) {
  let [i16, a28] = (0, import_react77.useState)(t14),
    { hasFlag: s20, addFlag: o20, removeFlag: l19 } = c8(e9 && i16 ? 3 : 0),
    u25 = (0, import_react77.useRef)(false),
    f21 = (0, import_react77.useRef)(false),
    E13 = p();
  return (
    n(() => {
      var d14;
      if (e9) {
        if ((t14 && a28(true), !r22)) {
          t14 && o20(3);
          return;
        }
        return (
          (d14 = n17 == null ? void 0 : n17.start) == null ||
            d14.call(n17, t14),
          C7(r22, {
            inFlight: u25,
            prepare() {
              (f21.current
                ? (f21.current = false)
                : (f21.current = u25.current),
                (u25.current = true),
                !f21.current && (t14 ? (o20(3), l19(4)) : (o20(4), l19(2))));
            },
            run() {
              f21.current
                ? t14
                  ? (l19(3), o20(4))
                  : (l19(4), o20(3))
                : t14
                  ? l19(1)
                  : o20(1);
            },
            done() {
              var p13;
              (f21.current && D4(r22)) ||
                ((u25.current = false),
                l19(7),
                t14 || a28(false),
                (p13 = n17 == null ? void 0 : n17.end) == null ||
                  p13.call(n17, t14));
            },
          })
        );
      }
    }, [e9, t14, r22, E13]),
    e9
      ? [
          i16,
          {
            closed: s20(1),
            enter: s20(2),
            leave: s20(4),
            transition: s20(2) || s20(4),
          },
        ]
      : [
          t14,
          { closed: void 0, enter: void 0, leave: void 0, transition: void 0 },
        ]
  );
}
function C7(e9, { prepare: r22, run: t14, done: n17, inFlight: i16 }) {
  let a28 = o2();
  return (
    j5(e9, { prepare: r22, inFlight: i16 }),
    a28.nextFrame(() => {
      (t14(),
        a28.requestAnimationFrame(() => {
          a28.add(M4(e9, n17));
        }));
    }),
    a28.dispose
  );
}
function M4(e9, r22) {
  var a28, s20;
  let t14 = o2();
  if (!e9) return t14.dispose;
  let n17 = false;
  t14.add(() => {
    n17 = true;
  });
  let i16 =
    (s20 =
      (a28 = e9.getAnimations) == null
        ? void 0
        : a28.call(e9).filter((o20) => o20 instanceof CSSTransition)) != null
      ? s20
      : [];
  return i16.length === 0
    ? (r22(), t14.dispose)
    : (Promise.allSettled(i16.map((o20) => o20.finished)).then(() => {
        n17 || r22();
      }),
      t14.dispose);
}
function j5(e9, { inFlight: r22, prepare: t14 }) {
  if (r22 != null && r22.current) {
    t14();
    return;
  }
  let n17 = e9.style.transition;
  ((e9.style.transition = "none"),
    t14(),
    e9.offsetHeight,
    (e9.style.transition = n17));
}
function D4(e9) {
  var t14, n17;
  return (
    (n17 = (t14 = e9.getAnimations) == null ? void 0 : t14.call(e9)) != null
      ? n17
      : []
  ).some((i16) => i16 instanceof CSSTransition && i16.playState !== "finished");
}

// node_modules/@headlessui/react/dist/hooks/use-tree-walker.js
var import_react78 = __toESM(require_react(), 1);
function F2(c21, { container: e9, accept: t14, walk: r22 }) {
  let o20 = (0, import_react78.useRef)(t14),
    l19 = (0, import_react78.useRef)(r22);
  ((0, import_react78.useEffect)(() => {
    ((o20.current = t14), (l19.current = r22));
  }, [t14, r22]),
    n(() => {
      if (!e9 || !c21) return;
      let n17 = l(e9);
      if (!n17) return;
      let f21 = o20.current,
        p13 = l19.current,
        i16 = Object.assign((m10) => f21(m10), { acceptNode: f21 }),
        u25 = n17.createTreeWalker(e9, NodeFilter.SHOW_ELEMENT, i16, false);
      for (; u25.nextNode(); ) p13(u25.currentNode);
    }, [e9, c21, o20, l19]));
}

// node_modules/@headlessui/react/dist/hooks/use-watch.js
var import_react79 = __toESM(require_react(), 1);
function m7(u25, t14) {
  let e9 = (0, import_react79.useRef)([]),
    r22 = o4(u25);
  (0, import_react79.useEffect)(() => {
    let o20 = [...e9.current];
    for (let [a28, l19] of t14.entries())
      if (e9.current[a28] !== l19) {
        let n17 = r22(t14, o20);
        return ((e9.current = t14), n17);
      }
  }, [r22, ...t14]);
}

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var React3 = __toESM(require_react(), 1);
var import_react81 = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (
    (node == null || (_node$ownerDocument = node.ownerDocument) == null
      ? void 0
      : _node$ownerDocument.defaultView) || window
  );
}
function getDocumentElement(node) {
  var _ref;
  return (_ref =
    (isNode(node) ? node.ownerDocument : node.document) || window.document) ==
    null
    ? void 0
    : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return (
    value instanceof HTMLElement ||
    value instanceof getWindow(value).HTMLElement
  );
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return (
    value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
  );
}
var invalidOverflowDisplayValues = /* @__PURE__ */ new Set([
  "inline",
  "contents",
]);
function isOverflowElement(element) {
  const { overflow, overflowX, overflowY, display } =
    getComputedStyle2(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !invalidOverflowDisplayValues.has(display)
  );
}
var tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
var topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (_e4) {
      return false;
    }
  });
}
var transformProperties = [
  "transform",
  "translate",
  "scale",
  "rotate",
  "perspective",
];
var willChangeValues = [
  "transform",
  "translate",
  "scale",
  "rotate",
  "perspective",
  "filter",
];
var containValues = ["paint", "layout", "strict", "content"];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss)
    ? getComputedStyle2(elementOrCss)
    : elementOrCss;
  return (
    transformProperties.some((value) =>
      css[value] ? css[value] !== "none" : false,
    ) ||
    (css.containerType ? css.containerType !== "normal" : false) ||
    (!webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false)) ||
    (!webkit && (css.filter ? css.filter !== "none" : false)) ||
    willChangeValues.some((value) => (css.willChange || "").includes(value)) ||
    containValues.some((value) => (css.contain || "").includes(value))
  );
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
var lastTraversableNodeNames = /* @__PURE__ */ new Set([
  "html",
  "body",
  "#document",
]);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    (isShadowRoot(node) && node.host) || // Fallback.
    getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody =
    scrollableAncestor ===
    ((_node$ownerDocument2 = node.ownerDocument) == null
      ? void 0
      : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : [],
    );
  }
  return list.concat(
    scrollableAncestor,
    getOverflowAncestors(scrollableAncestor, [], traverseIframes),
  );
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent)
    ? win.frameElement
    : null;
}

// node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands
      .map((_ref) => {
        let { brand, version } = _ref;
        return brand + "/" + version;
      })
      .join(" ");
  }
  return navigator.userAgent;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce(
  (acc, side) =>
    acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]),
  [],
);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v11) => ({
  x: v11,
  y: v11,
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom",
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start",
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide =
    alignmentAxis === "x"
      ? alignment === (rtl ? "end" : "start")
        ? "right"
        : "left"
      : alignment === "start"
        ? "bottom"
        : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [
    getOppositeAlignmentPlacement(placement),
    oppositePlacement,
    getOppositeAlignmentPlacement(oppositePlacement),
  ];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(
    /start|end/g,
    (alignment) => oppositeAlignmentMap[alignment],
  );
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(
    /left|right|bottom|top/g,
    (side) => oppositeSideMap[side],
  );
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding,
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number"
    ? expandPaddingObject(padding)
    : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
      };
}
function rectToClientRect(rect) {
  const { x: x10, y: y10, width, height } = rect;
  return {
    width,
    height,
    top: y10,
    left: x10,
    right: x10 + width,
    bottom: y10 + height,
    x: x10,
    y: y10,
  };
}

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = [
  "input:not([inert])",
  "select:not([inert])",
  "textarea:not([inert])",
  "a[href]:not([inert])",
  "button:not([inert])",
  "[tabindex]:not(slot):not([inert])",
  "audio[controls]:not([inert])",
  "video[controls]:not([inert])",
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  "details>summary:first-of-type:not([inert])",
  "details:not([inert])",
];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement
  ? function () {}
  : Element.prototype.matches ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
var getRootNode =
  !NoElement && Element.prototype.getRootNode
    ? function (element) {
        var _element$getRootNode;
        return element === null || element === void 0
          ? void 0
          : (_element$getRootNode = element.getRootNode) === null ||
              _element$getRootNode === void 0
            ? void 0
            : _element$getRootNode.call(element);
      }
    : function (element) {
        return element === null || element === void 0
          ? void 0
          : element.ownerDocument;
      };
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var ReactDOM2 = __toESM(require_react_dom(), 1);

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let { reference, floating } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height,
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height,
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY,
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY,
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y,
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null
    ? void 0
    : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy,
  });
  let { x: x10, y: y10 } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i16 = 0; i16 < validMiddleware.length; i16++) {
    const { name, fn } = validMiddleware[i16];
    const {
      x: nextX,
      y: nextY,
      data,
      reset,
    } = await fn({
      x: x10,
      y: y10,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating,
      },
    });
    x10 = nextX != null ? nextX : x10;
    y10 = nextY != null ? nextY : y10;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data,
      },
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects =
            reset.rects === true
              ? await platform2.getElementRects({
                  reference,
                  floating,
                  strategy,
                })
              : reset.rects;
        }
        ({ x: x10, y: y10 } = computeCoordsFromPlacement(
          rects,
          statefulPlacement,
          rtl,
        ));
      }
      i16 = -1;
    }
  }
  return {
    x: x10,
    y: y10,
    placement: statefulPlacement,
    strategy,
    middlewareData,
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x10,
    y: y10,
    platform: platform2,
    rects,
    elements,
    strategy,
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0,
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(
    await platform2.getClippingRect({
      element: (
        (_await$platform$isEle = await (platform2.isElement == null
          ? void 0
          : platform2.isElement(element))) != null
          ? _await$platform$isEle
          : true
      )
        ? element
        : element.contextElement ||
          (await (platform2.getDocumentElement == null
            ? void 0
            : platform2.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy,
    }),
  );
  const rect =
    elementContext === "floating"
      ? {
          x: x10,
          y: y10,
          width: rects.floating.width,
          height: rects.floating.height,
        }
      : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null
    ? void 0
    : platform2.getOffsetParent(elements.floating));
  const offsetScale = (await (platform2.isElement == null
    ? void 0
    : platform2.isElement(offsetParent)))
    ? (await (platform2.getScale == null
        ? void 0
        : platform2.getScale(offsetParent))) || {
        x: 1,
        y: 1,
      }
    : {
        x: 1,
        y: 1,
      };
  const elementClientRect = rectToClientRect(
    platform2.convertOffsetParentRelativeRectToViewportRelativeRect
      ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
          elements,
          rect,
          offsetParent,
          strategy,
        })
      : rect,
  );
  return {
    top:
      (clippingClientRect.top - elementClientRect.top + paddingObject.top) /
      offsetScale.y,
    bottom:
      (elementClientRect.bottom -
        clippingClientRect.bottom +
        paddingObject.bottom) /
      offsetScale.y,
    left:
      (clippingClientRect.left - elementClientRect.left + paddingObject.left) /
      offsetScale.x,
    right:
      (elementClientRect.right -
        clippingClientRect.right +
        paddingObject.right) /
      offsetScale.x,
  };
}
var flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements,
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if (
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      ) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null
        ? void 0
        : platform2.isRTL(elements.floating));
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipAlignment
          ? [getOppositePlacement(initialPlacement)]
          : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(
          ...getOppositeAxisPlacements(
            initialPlacement,
            flipAlignment,
            fallbackAxisSideDirection,
            rtl,
          ),
        );
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData =
        ((_middlewareData$flip = middlewareData.flip) == null
          ? void 0
          : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [
        ...overflowsData,
        {
          placement,
          overflows,
        },
      ];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex =
          (((_middlewareData$flip2 = middlewareData.flip) == null
            ? void 0
            : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow =
            checkCrossAxis === "alignment"
              ? initialSideAxis !== getSideAxis(nextPlacement)
              : false;
          if (
            !ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every((d14) =>
              getSideAxis(d14.placement) === initialSideAxis
                ? d14.overflows[0] > 0
                : true,
            )
          ) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData,
              },
              reset: {
                placement: nextPlacement,
              },
            };
          }
        }
        let resetPlacement =
          (_overflowsData$filter = overflowsData
            .filter((d14) => d14.overflows[0] <= 0)
            .sort((a28, b14) => a28.overflows[1] - b14.overflows[1])[0]) == null
            ? void 0
            : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 =
                (_overflowsData$filter2 = overflowsData
                  .filter((d14) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d14.placement);
                      return (
                        currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                        // reading directions favoring greater width.
                        currentSideAxis === "y"
                      );
                    }
                    return true;
                  })
                  .map((d14) => [
                    d14.placement,
                    d14.overflows
                      .filter((overflow2) => overflow2 > 0)
                      .reduce((acc, overflow2) => acc + overflow2, 0),
                  ])
                  .sort((a28, b14) => a28[1] - b14[1])[0]) == null
                  ? void 0
                  : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement,
            },
          };
        }
      }
      return {};
    },
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const { placement, platform: platform2, elements } = state;
  const rtl = await (platform2.isRTL == null
    ? void 0
    : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let { mainAxis, crossAxis, alignmentAxis } =
    typeof rawValue === "number"
      ? {
          mainAxis: rawValue,
          crossAxis: 0,
          alignmentAxis: null,
        }
      : {
          mainAxis: rawValue.mainAxis || 0,
          crossAxis: rawValue.crossAxis || 0,
          alignmentAxis: rawValue.alignmentAxis,
        };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical
    ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti,
      }
    : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti,
      };
}
var offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const { x: x10, y: y10, placement, middlewareData } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (
        placement ===
          ((_middlewareData$offse = middlewareData.offset) == null
            ? void 0
            : _middlewareData$offse.placement) &&
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      ) {
        return {};
      }
      return {
        x: x10 + diffCoords.x,
        y: y10 + diffCoords.y,
        data: {
          ...diffCoords,
          placement,
        },
      };
    },
  };
};
var shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const { x: x10, y: y10, placement } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let { x: x11, y: y11 } = _ref;
            return {
              x: x11,
              y: y11,
            };
          },
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x10,
        y: y10,
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x10,
          y: limitedCoords.y - y10,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis,
          },
        },
      };
    },
  };
};
var size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const { placement, rects, platform: platform2, elements } = state;
      const { apply = () => {}, ...detectOverflowOptions } = evaluate(
        options,
        state,
      );
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const { width, height } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide =
          alignment ===
          ((await (platform2.isRTL == null
            ? void 0
            : platform2.isRTL(elements.floating)))
            ? "start"
            : "end")
            ? "left"
            : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(
        height - overflow[heightSide],
        maximumClippingHeight,
      );
      const overflowAvailableWidth = min(
        width - overflow[widthSide],
        maximumClippingWidth,
      );
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (
        (_state$middlewareData = state.middlewareData.shift) != null &&
        _state$middlewareData.enabled.x
      ) {
        availableWidth = maximumClippingWidth;
      }
      if (
        (_state$middlewareData2 = state.middlewareData.shift) != null &&
        _state$middlewareData2.enabled.y
      ) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth =
            width -
            2 *
              (xMin !== 0 || xMax !== 0
                ? xMin + xMax
                : max(overflow.left, overflow.right));
        } else {
          availableHeight =
            height -
            2 *
              (yMin !== 0 || yMax !== 0
                ? yMin + yMax
                : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight,
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true,
          },
        };
      }
      return {};
    },
  };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback =
    round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback,
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const { width, height, $: $6 } = getCssDimensions(domElement);
  let x10 = ($6 ? round(rect.width) : rect.width) / width;
  let y10 = ($6 ? round(rect.height) : rect.height) / height;
  if (!x10 || !Number.isFinite(x10)) {
    x10 = 1;
  }
  if (!y10 || !Number.isFinite(y10)) {
    y10 = 1;
  }
  return {
    x: x10,
    y: y10,
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop,
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (
    !floatingOffsetParent ||
    (isFixed && floatingOffsetParent !== getWindow(element))
  ) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(
  element,
  includeScale,
  isFixedStrategy,
  offsetParent,
) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(
    domElement,
    isFixedStrategy,
    offsetParent,
  )
    ? getVisualOffsets(domElement)
    : createCoords(0);
  let x10 = (clientRect.left + visualOffsets.x) / scale.x;
  let y10 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin =
      offsetParent && isElement(offsetParent)
        ? getWindow(offsetParent)
        : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left =
        iframeRect.left +
        (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) *
          iframeScale.x;
      const top =
        iframeRect.top +
        (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x10 *= iframeScale.x;
      y10 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x10 += left;
      y10 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x10,
    y: y10,
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x10 =
    htmlRect.left +
    scroll.scrollLeft -
    getWindowScrollBarX(documentElement, htmlRect);
  const y10 = htmlRect.top + scroll.scrollTop;
  return {
    x: x10,
    y: y10,
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let { elements, rect, offsetParent, strategy } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || (topLayer && isFixed)) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (
      getNodeName(offsetParent) !== "body" ||
      isOverflowElement(documentElement)
    ) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x:
      rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(
    html.scrollWidth,
    html.clientWidth,
    body.scrollWidth,
    body.clientWidth,
  );
  const height = max(
    html.scrollHeight,
    html.clientHeight,
    body.scrollHeight,
    body.clientHeight,
  );
  let x10 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y10 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x10 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x10,
    y: y10,
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x10 = 0;
  let y10 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || (visualViewportBased && strategy === "fixed")) {
      x10 = visualViewport.offsetLeft;
      y10 = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline =
      doc.compatMode === "CSS1Compat"
        ? parseFloat(bodyStyles.marginLeft) +
            parseFloat(bodyStyles.marginRight) || 0
        : 0;
    const clippingStableScrollbarWidth = Math.abs(
      html.clientWidth - body.clientWidth - bodyMarginInline,
    );
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x: x10,
    y: y10,
  };
}
var absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x10 = left * scale.x;
  const y10 = top * scale.y;
  return {
    width,
    height,
    x: x10,
    y: y10,
  };
}
function getClientRectFromClippingAncestor(
  element,
  clippingAncestor,
  strategy,
) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height,
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (
    parentNode === stopNode ||
    !isElement(parentNode) ||
    isLastTraversableNode(parentNode)
  ) {
    return false;
  }
  return (
    getComputedStyle2(parentNode).position === "fixed" ||
    hasFixedPositionAncestor(parentNode, stopNode)
  );
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(
    (el) => isElement(el) && getNodeName(el) !== "body",
  );
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed
      ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
      : (!currentNodeIsContaining &&
          computedStyle.position === "static" &&
          !!currentContainingBlockComputedStyle &&
          absoluteOrFixed.has(currentContainingBlockComputedStyle.position)) ||
        (isOverflowElement(currentNode) &&
          !currentNodeIsContaining &&
          hasFixedPositionAncestor(element, currentNode));
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let { element, boundary, rootBoundary, strategy } = _ref;
  const elementClippingAncestors =
    boundary === "clippingAncestors"
      ? isTopLayer(element)
        ? []
        : getClippingElementAncestors(element, this._c)
      : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce(
    (accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(
        element,
        clippingAncestor,
        strategy,
      );
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    },
    getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy),
  );
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top,
  };
}
function getDimensions(element) {
  const { width, height } = getCssDimensions(element);
  return {
    width,
    height,
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0,
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (
      getNodeName(offsetParent) !== "body" ||
      isOverflowElement(documentElement)
    ) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(
        offsetParent,
        true,
        isFixed,
        offsetParent,
      );
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll)
      : createCoords(0);
  const x10 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y10 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x10,
    y: y10,
    width: rect.width,
    height: rect.height,
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (
    !isHTMLElement(element) ||
    getComputedStyle2(element).position === "fixed"
  ) {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (
    offsetParent &&
    isTableElement(offsetParent) &&
    isStaticPositioned(offsetParent)
  ) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (
    offsetParent &&
    isLastTraversableNode(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  ) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(
      data.reference,
      await getOffsetParentFn(data.floating),
      data.strategy,
    ),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height,
    },
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL,
};
function rectsAreEqual(a28, b14) {
  return (
    a28.x === b14.x &&
    a28.y === b14.y &&
    a28.width === b14.width &&
    a28.height === b14.height
  );
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement(element);
  function cleanup2() {
    var _io;
    clearTimeout(timeoutId2);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup2();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const { left, top, width, height } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin =
      -insetTop +
      "px " +
      -insetRight +
      "px " +
      -insetBottom +
      "px " +
      -insetLeft +
      "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1,
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (
        ratio === 1 &&
        !rectsAreEqual(
          elementRectForRootMargin,
          element.getBoundingClientRect(),
        )
      ) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument,
      });
    } catch (_e4) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup2;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false,
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors =
    ancestorScroll || ancestorResize
      ? [
          ...(referenceEl ? getOverflowAncestors(referenceEl) : []),
          ...getOverflowAncestors(floating),
        ]
      : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll &&
      ancestor.addEventListener("scroll", update, {
        passive: true,
      });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo =
    referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null ||
            _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null ||
      _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var detectOverflow2 = detectOverflow;
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options,
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache,
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache,
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React2 = __toESM(require_react(), 1);
var import_react80 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var isClient = typeof document !== "undefined";
var noop = function noop2() {};
var index = isClient ? import_react80.useLayoutEffect : noop;
function deepEqual(a28, b14) {
  if (a28 === b14) {
    return true;
  }
  if (typeof a28 !== typeof b14) {
    return false;
  }
  if (typeof a28 === "function" && a28.toString() === b14.toString()) {
    return true;
  }
  let length;
  let i16;
  let keys;
  if (a28 && b14 && typeof a28 === "object") {
    if (Array.isArray(a28)) {
      length = a28.length;
      if (length !== b14.length) return false;
      for (i16 = length; i16-- !== 0; ) {
        if (!deepEqual(a28[i16], b14[i16])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a28);
    length = keys.length;
    if (length !== Object.keys(b14).length) {
      return false;
    }
    for (i16 = length; i16-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b14, keys[i16])) {
        return false;
      }
    }
    for (i16 = length; i16-- !== 0; ) {
      const key = keys[i16];
      if (key === "_owner" && a28.$$typeof) {
        continue;
      }
      if (!deepEqual(a28[key], b14[key])) {
        return false;
      }
    }
    return true;
  }
  return a28 !== a28 && b14 !== b14;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React2.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: { reference: externalReference, floating: externalFloating } = {},
    transform = true,
    whileElementsMounted,
    open,
  } = options;
  const [data, setData] = React2.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false,
  });
  const [latestMiddleware, setLatestMiddleware] = React2.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React2.useState(null);
  const [_floating, _setFloating] = React2.useState(null);
  const setReference = React2.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React2.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React2.useRef(null);
  const floatingRef = React2.useRef(null);
  const dataRef = React2.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React2.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware,
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then(
      (data2) => {
        const fullData = {
          ...data2,
          // The floating element's position may be recomputed while it's closed
          // but still mounted (such as when transitioning out). To ensure
          // `isPositioned` will be `false` initially on the next open, avoid
          // setting it to `true` when `open === false` (must be specified).
          isPositioned: openRef.current !== false,
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          ReactDOM.flushSync(() => {
            setData(fullData);
          });
        }
      },
    );
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false,
      }));
    }
  }, [open]);
  const isMountedRef = React2.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [
    referenceEl,
    floatingEl,
    update,
    whileElementsMountedRef,
    hasWhileElementsMounted,
  ]);
  const refs = React2.useMemo(
    () => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating,
    }),
    [setReference, setFloating],
  );
  const elements = React2.useMemo(
    () => ({
      reference: referenceEl,
      floating: floatingEl,
    }),
    [referenceEl, floatingEl],
  );
  const floatingStyles = React2.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0,
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x10 = roundByDPR(elements.floating, data.x);
    const y10 = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x10 + "px, " + y10 + "px)",
        ...(getDPR(elements.floating) >= 1.5 && {
          willChange: "transform",
        }),
      };
    }
    return {
      position: strategy,
      left: x10,
      top: y10,
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React2.useMemo(
    () => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles,
    }),
    [data, update, refs, elements, floatingStyles],
  );
}
var offset3 = (options, deps) => ({
  ...offset2(options),
  options: [options, deps],
});
var shift3 = (options, deps) => ({
  ...shift2(options),
  options: [options, deps],
});
var flip3 = (options, deps) => ({
  ...flip2(options),
  options: [options, deps],
});
var size3 = (options, deps) => ({
  ...size2(options),
  options: [options, deps],
});

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
function useMergeRefs(refs) {
  return React3.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
var SafeReact = {
  ...React3,
};
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React3.useRef(() => {
    if (true) {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React3.useCallback(function () {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index3, cols, prevRow) {
  return Math.floor(index3 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index3) {
  return index3 < 0 || index3 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices,
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices,
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1,
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index3 = startingIndex;
  do {
    index3 += decrement ? -amount : amount;
  } while (
    index3 >= 0 &&
    index3 <= list.length - 1 &&
    isDisabled(list, index3, disabledIndices)
  );
  return index3;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false,
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices,
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset4 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset4 : offset4 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices,
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: (prevIndex % cols) - cols,
          amount: cols,
          disabledIndices,
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices,
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - (prevIndex % cols) - 1,
            disabledIndices,
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - (prevIndex % cols) - 1,
          disabledIndices,
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices,
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - (prevIndex % cols)),
            decrement: true,
            disabledIndices,
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - (prevIndex % cols)),
          decrement: true,
          disabledIndices,
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex =
          event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)
            ? maxIndex
            : findNonDisabledIndex(elementsRef, {
                startingIndex: prevIndex - (prevIndex % cols) - 1,
                disabledIndices,
              });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index3) => {
    let { width, height } = _ref2;
    if (width > cols) {
      if (true) {
        throw new Error(
          "[Floating UI]: Invalid grid - item width at index " +
            index3 +
            " is greater than grid columns",
        );
      }
    }
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i16 = 0; i16 < width; i16++) {
        for (let j11 = 0; j11 < height; j11++) {
          targetCells.push(startIndex + i16 + j11 * cols);
        }
      }
      if (
        (startIndex % cols) + width <= cols &&
        targetCells.every((cell) => cellMap[cell] == null)
      ) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index3;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getCellIndexOfCorner(index3, sizes, cellMap, cols, corner) {
  if (index3 === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index3);
  const sizeItem = sizes[index3];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index3);
  }
}
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index3, cellIndex) =>
    indices.includes(index3) ? [cellIndex] : [],
  );
}
function isDisabled(list, index3, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index3);
  }
  const element = list[index3];
  return (
    element == null ||
    element.hasAttribute("disabled") ||
    element.getAttribute("aria-disabled") === "true"
  );
}
var index2 =
  typeof document !== "undefined"
    ? import_react81.useLayoutEffect
    : import_react81.useEffect;
function sortByDocumentPosition(a28, b14) {
  const position = a28.compareDocumentPosition(b14);
  if (
    position & Node.DOCUMENT_POSITION_FOLLOWING ||
    position & Node.DOCUMENT_POSITION_CONTAINED_BY
  ) {
    return -1;
  }
  if (
    position & Node.DOCUMENT_POSITION_PRECEDING ||
    position & Node.DOCUMENT_POSITION_CONTAINS
  ) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
var FloatingListContext = React3.createContext({
  register: () => {},
  unregister: () => {},
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: [],
  },
});
function FloatingList(props) {
  const { children, elementsRef, labelsRef } = props;
  const [map, setMap] = React3.useState(() => /* @__PURE__ */ new Map());
  const register = React3.useCallback((node) => {
    setMap((prevMap) => new Map(prevMap).set(node, null));
  }, []);
  const unregister = React3.useCallback((node) => {
    setMap((prevMap) => {
      const map2 = new Map(prevMap);
      map2.delete(node);
      return map2;
    });
  }, []);
  index2(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index3) => {
      newMap.set(node, index3);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return React3.createElement(
    FloatingListContext.Provider,
    {
      value: React3.useMemo(
        () => ({
          register,
          unregister,
          map,
          elementsRef,
          labelsRef,
        }),
        [register, unregister, map, elementsRef, labelsRef],
      ),
    },
    children,
  );
}
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const { label } = props;
  const { register, unregister, map, elementsRef, labelsRef } =
    React3.useContext(FloatingListContext);
  const [index$1, setIndex] = React3.useState(null);
  const componentRef = React3.useRef(null);
  const ref = React3.useCallback(
    (node) => {
      componentRef.current = node;
      if (index$1 !== null) {
        elementsRef.current[index$1] = node;
        if (labelsRef) {
          var _node$textContent;
          const isLabelDefined = label !== void 0;
          labelsRef.current[index$1] = isLabelDefined
            ? label
            : (_node$textContent = node == null ? void 0 : node.textContent) !=
                null
              ? _node$textContent
              : null;
        }
      }
    },
    [index$1, elementsRef, labelsRef, label],
  );
  index2(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index2(() => {
    const index3 = componentRef.current ? map.get(componentRef.current) : null;
    if (index3 != null) {
      setIndex(index3);
    }
  }, [map]);
  return React3.useMemo(
    () => ({
      ref,
      index: index$1 == null ? -1 : index$1,
    }),
    [index$1, ref],
  );
}
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  }
  if (render) {
    return React3.cloneElement(render, computedProps);
  }
  return React3.createElement("div", computedProps);
}
var CompositeContext = React3.createContext({
  activeIndex: 0,
  onNavigate: () => {},
});
var horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
var verticalKeys = [ARROW_UP, ARROW_DOWN];
var allKeys = [...horizontalKeys, ...verticalKeys];
var Composite = React3.forwardRef(function Composite2(props, forwardedRef) {
  const {
    render,
    orientation = "both",
    loop = true,
    rtl = false,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = React3.useState(0);
  const activeIndex =
    externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(
    externalSetActiveIndex != null
      ? externalSetActiveIndex
      : internalSetActiveIndex,
  );
  const elementsRef = React3.useRef([]);
  const renderElementProps =
    render && typeof render !== "function" ? render.props : {};
  const contextValue = React3.useMemo(
    () => ({
      activeIndex,
      onNavigate,
    }),
    [activeIndex, onNavigate],
  );
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    let nextIndex = activeIndex;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    const horizontalEndKey = rtl ? ARROW_LEFT : ARROW_RIGHT;
    const horizontalStartKey = rtl ? ARROW_RIGHT : ARROW_LEFT;
    if (isGrid) {
      const sizes =
        itemSizes ||
        Array.from(
          {
            length: elementsRef.current.length,
          },
          () => ({
            width: 1,
            height: 1,
          }),
        );
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex(
        (index3) =>
          index3 != null &&
          !isDisabled(elementsRef.current, index3, disabledIndices),
      );
      const maxGridIndex = cellMap.reduce(
        (foundIndex, index3, cellIndex) =>
          index3 != null &&
          !isDisabled(elementsRef.current, index3, disabledIndices)
            ? cellIndex
            : foundIndex,
        -1,
      );
      const maybeNextIndex =
        cellMap[
          getGridNavigatedIndex(
            {
              current: cellMap.map((itemIndex) =>
                itemIndex ? elementsRef.current[itemIndex] : null,
              ),
            },
            {
              event,
              orientation,
              loop,
              rtl,
              cols,
              // treat undefined (empty grid spaces) as disabled indices so we
              // don't end up in them
              disabledIndices: getCellIndices(
                [
                  ...(disabledIndices ||
                    elementsRef.current.map((_10, index3) =>
                      isDisabled(elementsRef.current, index3) ? index3 : void 0,
                    )),
                  void 0,
                ],
                cellMap,
              ),
              minIndex: minGridIndex,
              maxIndex: maxGridIndex,
              prevIndex: getCellIndexOfCorner(
                activeIndex > maxIndex ? minIndex : activeIndex,
                sizes,
                cellMap,
                cols,
                // use a corner matching the edge closest to the direction we're
                // moving in so we don't end up in the same item. Prefer
                // top/left over bottom/right.
                event.key === ARROW_DOWN
                  ? "bl"
                  : event.key === horizontalEndKey
                    ? "tr"
                    : "tl",
              ),
            },
          )
        ];
      if (maybeNextIndex != null) {
        nextIndex = maybeNextIndex;
      }
    }
    const toEndKeys = {
      horizontal: [horizontalEndKey],
      vertical: [ARROW_DOWN],
      both: [horizontalEndKey, ARROW_DOWN],
    }[orientation];
    const toStartKeys = {
      horizontal: [horizontalStartKey],
      vertical: [ARROW_UP],
      both: [horizontalStartKey, ARROW_UP],
    }[orientation];
    const preventedKeys = isGrid
      ? allKeys
      : {
          horizontal: horizontalKeys,
          vertical: verticalKeys,
          both: allKeys,
        }[orientation];
    if (
      nextIndex === activeIndex &&
      [...toEndKeys, ...toStartKeys].includes(event.key)
    ) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (
        loop &&
        nextIndex === minIndex &&
        toStartKeys.includes(event.key)
      ) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices,
        });
      }
    }
    if (
      nextIndex !== activeIndex &&
      !isIndexOutOfBounds(elementsRef, nextIndex)
    ) {
      var _elementsRef$current$;
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      (_elementsRef$current$ = elementsRef.current[nextIndex]) == null ||
        _elementsRef$current$.focus();
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e9) {
      domProps.onKeyDown == null || domProps.onKeyDown(e9);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e9);
      handleKeyDown(e9);
    },
  };
  return React3.createElement(
    CompositeContext.Provider,
    {
      value: contextValue,
    },
    React3.createElement(
      FloatingList,
      {
        elementsRef,
      },
      renderJsx(render, computedProps),
    ),
  );
});
var CompositeItem = React3.forwardRef(
  function CompositeItem2(props, forwardedRef) {
    const { render, ...domProps } = props;
    const renderElementProps =
      render && typeof render !== "function" ? render.props : {};
    const { activeIndex, onNavigate } = React3.useContext(CompositeContext);
    const { ref, index: index3 } = useListItem();
    const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
    const isActive = activeIndex === index3;
    const computedProps = {
      ...domProps,
      ...renderElementProps,
      ref: mergedRef,
      tabIndex: isActive ? 0 : -1,
      "data-active": isActive ? "" : void 0,
      onFocus(e9) {
        domProps.onFocus == null || domProps.onFocus(e9);
        renderElementProps.onFocus == null || renderElementProps.onFocus(e9);
        onNavigate(index3);
      },
    };
    return renderJsx(render, computedProps);
  },
);
function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i16 = 1; i16 < arguments.length; i16++) {
          var source = arguments[i16];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}
var serverHandoffComplete = false;
var count = 0;
var genId = () =>
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
function useFloatingId() {
  const [id, setId] = React3.useState(() =>
    serverHandoffComplete ? genId() : void 0,
  );
  index2(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React3.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
var useReactId = SafeReact.useId;
var useId = useReactId || useFloatingId;
var devMessageSet;
if (true) {
  devMessageSet = /* @__PURE__ */ new Set();
}
function warn() {
  var _devMessageSet;
  for (
    var _len = arguments.length, messages = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    messages[_key] = arguments[_key];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (
    !((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message))
  ) {
    var _devMessageSet2;
    (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message);
    console.warn(message);
  }
}
function error() {
  var _devMessageSet3;
  for (
    var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    messages[_key2] = arguments[_key2];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (
    !((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))
  ) {
    var _devMessageSet4;
    (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
    console.error(message);
  }
}
var FloatingArrow = React3.forwardRef(function FloatingArrow2(props, ref) {
  const {
    context: {
      placement,
      elements: { floating },
      middlewareData: { arrow: arrow4, shift: shift4 },
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d: d14,
    style: { transform, ...restStyle } = {},
    ...rest
  } = props;
  if (true) {
    if (!ref) {
      warn("The `ref` prop is required for `FloatingArrow`.");
    }
  }
  const clipPathId = useId();
  const [isRTL2, setIsRTL] = React3.useState(false);
  index2(() => {
    if (!floating) return;
    const isRTL3 = getComputedStyle2(floating).direction === "rtl";
    if (isRTL3) {
      setIsRTL(true);
    }
  }, [floating]);
  if (!floating) {
    return null;
  }
  const [side, alignment] = placement.split("-");
  const isVerticalSide = side === "top" || side === "bottom";
  let computedStaticOffset = staticOffset;
  if (
    (isVerticalSide && shift4 != null && shift4.x) ||
    (!isVerticalSide && shift4 != null && shift4.y)
  ) {
    computedStaticOffset = null;
  }
  const computedStrokeWidth = strokeWidth * 2;
  const halfStrokeWidth = computedStrokeWidth / 2;
  const svgX = (width / 2) * (tipRadius / -8 + 1);
  const svgY = ((height / 2) * tipRadius) / 4;
  const isCustomShape = !!d14;
  const yOffsetProp =
    computedStaticOffset && alignment === "end" ? "bottom" : "top";
  let xOffsetProp =
    computedStaticOffset && alignment === "end" ? "right" : "left";
  if (computedStaticOffset && isRTL2) {
    xOffsetProp = alignment === "end" ? "left" : "right";
  }
  const arrowX =
    (arrow4 == null ? void 0 : arrow4.x) != null
      ? computedStaticOffset || arrow4.x
      : "";
  const arrowY =
    (arrow4 == null ? void 0 : arrow4.y) != null
      ? computedStaticOffset || arrow4.y
      : "";
  const dValue =
    d14 ||
    "M0,0" +
      (" H" + width) +
      (" L" + (width - svgX) + "," + (height - svgY)) +
      (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) +
      " Z";
  const rotation = {
    top: isCustomShape ? "rotate(180deg)" : "",
    left: isCustomShape ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: isCustomShape ? "" : "rotate(180deg)",
    right: isCustomShape ? "rotate(-90deg)" : "rotate(90deg)",
  }[side];
  return React3.createElement(
    "svg",
    _extends({}, rest, {
      "aria-hidden": true,
      ref,
      width: isCustomShape ? width : width + computedStrokeWidth,
      height: width,
      viewBox: "0 0 " + width + " " + (height > width ? height : width),
      style: {
        position: "absolute",
        pointerEvents: "none",
        [xOffsetProp]: arrowX,
        [yOffsetProp]: arrowY,
        [side]:
          isVerticalSide || isCustomShape
            ? "100%"
            : "calc(100% - " + computedStrokeWidth / 2 + "px)",
        transform: [rotation, transform].filter((t14) => !!t14).join(" "),
        ...restStyle,
      },
    }),
    computedStrokeWidth > 0 &&
      React3.createElement("path", {
        clipPath: "url(#" + clipPathId + ")",
        fill: "none",
        stroke,
        strokeWidth: computedStrokeWidth + (d14 ? 0 : 1),
        d: dValue,
      }),
    React3.createElement("path", {
      stroke: computedStrokeWidth && !d14 ? rest.fill : "none",
      d: dValue,
    }),
    React3.createElement(
      "clipPath",
      {
        id: clipPathId,
      },
      React3.createElement("rect", {
        x: -halfStrokeWidth,
        y: halfStrokeWidth * (isCustomShape ? -1 : 1),
        width: width + computedStrokeWidth,
        height: width,
      }),
    ),
  );
});
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null ||
        _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...(map.get(event) || []), listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(
        event,
        ((_map$get2 = map.get(event)) == null
          ? void 0
          : _map$get2.filter((l19) => l19 !== listener)) || [],
      );
    },
  };
}
var FloatingNodeContext = React3.createContext(null);
var FloatingTreeContext = React3.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext;
  return (
    ((_React$useContext = React3.useContext(FloatingNodeContext)) == null
      ? void 0
      : _React$useContext.id) || null
  );
};
var useFloatingTree = () => React3.useContext(FloatingTreeContext);
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
var safePolygonIdentifier = createAttribute("safe-polygon");
var NOOP = () => {};
var FloatingDelayGroupContext = React3.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false,
});
var HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0,
};
var timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
var FocusGuard = React3.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React3.useState();
  index2(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES,
  };
  return React3.createElement("span", _extends({}, props, restProps));
});
var PortalContext = React3.createContext(null);
var attr = createAttribute("portal");
var FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
var VisuallyHiddenDismiss = React3.forwardRef(
  function VisuallyHiddenDismiss2(props, ref) {
    return React3.createElement(
      "button",
      _extends({}, props, {
        type: "button",
        ref,
        tabIndex: -1,
        style: HIDDEN_STYLES,
      }),
    );
  },
);
var lockCount = 0;
function enableScrollLock() {
  const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
  const bodyStyle = document.body.style;
  const scrollbarX =
    Math.round(document.documentElement.getBoundingClientRect().left) +
    document.documentElement.scrollLeft;
  const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.scrollX;
  const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.scrollY;
  bodyStyle.overflow = "hidden";
  if (scrollbarWidth) {
    bodyStyle[paddingProp] = scrollbarWidth + "px";
  }
  if (isIOS) {
    var _window$visualViewpor, _window$visualViewpor2;
    const offsetLeft =
      ((_window$visualViewpor = window.visualViewport) == null
        ? void 0
        : _window$visualViewpor.offsetLeft) || 0;
    const offsetTop =
      ((_window$visualViewpor2 = window.visualViewport) == null
        ? void 0
        : _window$visualViewpor2.offsetTop) || 0;
    Object.assign(bodyStyle, {
      position: "fixed",
      top: -(scrollY - Math.floor(offsetTop)) + "px",
      left: -(scrollX - Math.floor(offsetLeft)) + "px",
      right: "0",
    });
  }
  return () => {
    Object.assign(bodyStyle, {
      overflow: "",
      [paddingProp]: "",
    });
    if (isIOS) {
      Object.assign(bodyStyle, {
        position: "",
        top: "",
        left: "",
        right: "",
      });
      window.scrollTo(scrollX, scrollY);
    }
  };
}
var cleanup = () => {};
var FloatingOverlay = React3.forwardRef(function FloatingOverlay2(props, ref) {
  const { lockScroll = false, ...rest } = props;
  index2(() => {
    if (!lockScroll) return;
    lockCount++;
    if (lockCount === 1) {
      cleanup = enableScrollLock();
    }
    return () => {
      lockCount--;
      if (lockCount === 0) {
        cleanup();
      }
    };
  }, [lockScroll]);
  return React3.createElement(
    "div",
    _extends(
      {
        ref,
      },
      rest,
      {
        style: {
          position: "fixed",
          overflow: "auto",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          ...rest.style,
        },
      },
    ),
  );
});
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp,
  } = options;
  const floatingId = useId();
  const dataRef = React3.useRef({});
  const [events] = React3.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  if (true) {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !isElement(optionDomReference)) {
      error(
        "Cannot pass a virtual element to the `elements.reference` option,",
        "as it must be a real DOM element. Use `refs.setPositionReference()`",
        "instead.",
      );
    }
  }
  const [positionReference, setPositionReference] = React3.useState(
    elementsProp.reference,
  );
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested,
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = React3.useMemo(
    () => ({
      setPositionReference,
    }),
    [],
  );
  const elements = React3.useMemo(
    () => ({
      reference: positionReference || elementsProp.reference || null,
      floating: elementsProp.floating || null,
      domReference: elementsProp.reference,
    }),
    [positionReference, elementsProp.reference, elementsProp.floating],
  );
  return React3.useMemo(
    () => ({
      dataRef,
      open,
      onOpenChange,
      elements,
      events,
      floatingId,
      refs,
    }),
    [open, onOpenChange, elements, events, floatingId, refs],
  );
}
function useFloating2(options) {
  if (options === void 0) {
    options = {};
  }
  const { nodeId } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements,
    },
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = React3.useState(null);
  const [positionReference, _setPositionReference] = React3.useState(null);
  const optionDomReference =
    computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = React3.useRef(null);
  const tree = useFloatingTree();
  index2(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating({
    ...options,
    elements: {
      ...computedElements,
      ...(positionReference && {
        reference: positionReference,
      }),
    },
  });
  const setPositionReference = React3.useCallback(
    (node) => {
      const computedPositionReference = isElement(node)
        ? {
            getBoundingClientRect: () => node.getBoundingClientRect(),
            contextElement: node,
          }
        : node;
      _setPositionReference(computedPositionReference);
      position.refs.setReference(computedPositionReference);
    },
    [position.refs],
  );
  const setReference = React3.useCallback(
    (node) => {
      if (isElement(node) || node === null) {
        domReferenceRef.current = node;
        setDomReference(node);
      }
      if (
        isElement(position.refs.reference.current) ||
        position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
        // `null` to support `positionReference` + an unstable `reference`
        // callback ref.
        (node !== null && !isElement(node))
      ) {
        position.refs.setReference(node);
      }
    },
    [position.refs],
  );
  const refs = React3.useMemo(
    () => ({
      ...position.refs,
      setReference,
      setPositionReference,
      domReference: domReferenceRef,
    }),
    [position.refs, setReference, setPositionReference],
  );
  const elements = React3.useMemo(
    () => ({
      ...position.elements,
      domReference,
    }),
    [position.elements, domReference],
  );
  const context = React3.useMemo(
    () => ({
      ...position,
      ...rootContext,
      refs,
      elements,
      nodeId,
    }),
    [position, refs, elements, nodeId, rootContext],
  );
  index2(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node =
      tree == null
        ? void 0
        : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React3.useMemo(
    () => ({
      ...position,
      context,
      refs,
      elements,
    }),
    [position, refs, elements, context],
  );
}
var ACTIVE_KEY = "active";
var SELECTED_KEY = "selected";
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  let domUserProps = userProps;
  if (isItem && userProps) {
    const { [ACTIVE_KEY]: _10, [SELECTED_KEY]: __, ...validProps } = userProps;
    domUserProps = validProps;
  }
  return {
    ...(elementKey === "floating" && {
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: "",
    }),
    ...domUserProps,
    ...propsList
      .map((value) => {
        const propsOrGetProps = value ? value[elementKey] : null;
        if (typeof propsOrGetProps === "function") {
          return userProps ? propsOrGetProps(userProps) : null;
        }
        return propsOrGetProps;
      })
      .concat(userProps)
      .reduce((acc, props) => {
        if (!props) {
          return acc;
        }
        Object.entries(props).forEach((_ref) => {
          let [key, value] = _ref;
          if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
            return;
          }
          if (key.indexOf("on") === 0) {
            if (!map.has(key)) {
              map.set(key, []);
            }
            if (typeof value === "function") {
              var _map$get;
              (_map$get = map.get(key)) == null || _map$get.push(value);
              acc[key] = function () {
                var _map$get2;
                for (
                  var _len = arguments.length, args = new Array(_len), _key = 0;
                  _key < _len;
                  _key++
                ) {
                  args[_key] = arguments[_key];
                }
                return (_map$get2 = map.get(key)) == null
                  ? void 0
                  : _map$get2
                      .map((fn) => fn(...args))
                      .find((val) => val !== void 0);
              };
            }
          } else {
            acc[key] = value;
          }
        });
        return acc;
      }, {}),
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map((key) =>
    key == null ? void 0 : key.reference,
  );
  const floatingDeps = propsList.map((key) =>
    key == null ? void 0 : key.floating,
  );
  const itemDeps = propsList.map((key) => (key == null ? void 0 : key.item));
  const getReferenceProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps,
  );
  const getFloatingProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps,
  );
  const getItemProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps,
  );
  return React3.useMemo(
    () => ({
      getReferenceProps,
      getFloatingProps,
      getItemProps,
    }),
    [getReferenceProps, getFloatingProps, getItemProps],
  );
}
function getArgsWithCustomFloatingHeight(state, height) {
  return {
    ...state,
    rects: {
      ...state.rects,
      floating: {
        ...state.rects.floating,
        height,
      },
    },
  };
}
var inner = (props) => ({
  name: "inner",
  options: props,
  async fn(state) {
    const {
      listRef,
      overflowRef,
      onFallbackChange,
      offset: innerOffset = 0,
      index: index3 = 0,
      minItemsVisible = 4,
      referenceOverflowThreshold = 0,
      scrollRef,
      ...detectOverflowOptions
    } = evaluate(props, state);
    const {
      rects,
      elements: { floating },
    } = state;
    const item = listRef.current[index3];
    const scrollEl =
      (scrollRef == null ? void 0 : scrollRef.current) || floating;
    const clientTop = floating.clientTop || scrollEl.clientTop;
    const floatingIsBordered = floating.clientTop !== 0;
    const scrollElIsBordered = scrollEl.clientTop !== 0;
    const floatingIsScrollEl = floating === scrollEl;
    if (true) {
      if (!state.placement.startsWith("bottom")) {
        warn(
          '`placement` side must be "bottom" when using the `inner`',
          "middleware.",
        );
      }
    }
    if (!item) {
      return {};
    }
    const nextArgs = {
      ...state,
      ...(await offset3(
        -item.offsetTop -
          floating.clientTop -
          rects.reference.height / 2 -
          item.offsetHeight / 2 -
          innerOffset,
      ).fn(state)),
    };
    const overflow = await detectOverflow2(
      getArgsWithCustomFloatingHeight(
        nextArgs,
        scrollEl.scrollHeight + clientTop + floating.clientTop,
      ),
      detectOverflowOptions,
    );
    const refOverflow = await detectOverflow2(nextArgs, {
      ...detectOverflowOptions,
      elementContext: "reference",
    });
    const diffY = max(0, overflow.top);
    const nextY = nextArgs.y + diffY;
    const isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight;
    const rounder = isScrollable ? (v11) => v11 : round;
    const maxHeight = rounder(
      max(
        0,
        scrollEl.scrollHeight +
          ((floatingIsBordered && floatingIsScrollEl) || scrollElIsBordered
            ? clientTop * 2
            : 0) -
          diffY -
          max(0, overflow.bottom),
      ),
    );
    scrollEl.style.maxHeight = maxHeight + "px";
    scrollEl.scrollTop = diffY;
    if (onFallbackChange) {
      const shouldFallback =
        scrollEl.offsetHeight <
          item.offsetHeight * min(minItemsVisible, listRef.current.length) -
            1 ||
        refOverflow.top >= -referenceOverflowThreshold ||
        refOverflow.bottom >= -referenceOverflowThreshold;
      ReactDOM2.flushSync(() => onFallbackChange(shouldFallback));
    }
    if (overflowRef) {
      overflowRef.current = await detectOverflow2(
        getArgsWithCustomFloatingHeight(
          {
            ...nextArgs,
            y: nextY,
          },
          scrollEl.offsetHeight + clientTop + floating.clientTop,
        ),
        detectOverflowOptions,
      );
    }
    return {
      y: nextY,
    };
  },
});
function useInnerOffset(context, props) {
  const { open, elements } = context;
  const {
    enabled = true,
    overflowRef,
    scrollRef,
    onChange: unstable_onChange,
  } = props;
  const onChange = useEffectEvent(unstable_onChange);
  const controlledScrollingRef = React3.useRef(false);
  const prevScrollTopRef = React3.useRef(null);
  const initialOverflowRef = React3.useRef(null);
  React3.useEffect(() => {
    if (!enabled) return;
    function onWheel(e9) {
      if (e9.ctrlKey || !el || overflowRef.current == null) {
        return;
      }
      const dY = e9.deltaY;
      const isAtTop = overflowRef.current.top >= -0.5;
      const isAtBottom = overflowRef.current.bottom >= -0.5;
      const remainingScroll = el.scrollHeight - el.clientHeight;
      const sign = dY < 0 ? -1 : 1;
      const method = dY < 0 ? "max" : "min";
      if (el.scrollHeight <= el.clientHeight) {
        return;
      }
      if ((!isAtTop && dY > 0) || (!isAtBottom && dY < 0)) {
        e9.preventDefault();
        ReactDOM2.flushSync(() => {
          onChange((d14) => d14 + Math[method](dY, remainingScroll * sign));
        });
      } else if (/firefox/i.test(getUserAgent())) {
        el.scrollTop += dY;
      }
    }
    const el =
      (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
    if (open && el) {
      el.addEventListener("wheel", onWheel);
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
        if (overflowRef.current != null) {
          initialOverflowRef.current = {
            ...overflowRef.current,
          };
        }
      });
      return () => {
        prevScrollTopRef.current = null;
        initialOverflowRef.current = null;
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, [enabled, open, elements.floating, overflowRef, scrollRef, onChange]);
  const floating = React3.useMemo(
    () => ({
      onKeyDown() {
        controlledScrollingRef.current = true;
      },
      onWheel() {
        controlledScrollingRef.current = false;
      },
      onPointerMove() {
        controlledScrollingRef.current = false;
      },
      onScroll() {
        const el =
          (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
        if (!overflowRef.current || !el || !controlledScrollingRef.current) {
          return;
        }
        if (prevScrollTopRef.current !== null) {
          const scrollDiff = el.scrollTop - prevScrollTopRef.current;
          if (
            (overflowRef.current.bottom < -0.5 && scrollDiff < -1) ||
            (overflowRef.current.top < -0.5 && scrollDiff > 1)
          ) {
            ReactDOM2.flushSync(() => onChange((d14) => d14 + scrollDiff));
          }
        }
        requestAnimationFrame(() => {
          prevScrollTopRef.current = el.scrollTop;
        });
      },
    }),
    [elements.floating, onChange, overflowRef, scrollRef],
  );
  return React3.useMemo(
    () =>
      enabled
        ? {
            floating,
          }
        : {},
    [enabled, floating],
  );
}

// node_modules/@headlessui/react/dist/internal/floating.js
var j6 = __toESM(require_react(), 1);
var import_react83 = __toESM(require_react(), 1);
var y5 = (0, import_react83.createContext)({
  styles: void 0,
  setReference: () => {},
  setFloating: () => {},
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  slot: {},
});
y5.displayName = "FloatingContext";
var $2 = (0, import_react83.createContext)(null);
$2.displayName = "PlacementContext";
function ye(e9) {
  return (0, import_react83.useMemo)(
    () => (e9 ? (typeof e9 == "string" ? { to: e9 } : e9) : null),
    [e9],
  );
}
function Fe() {
  return (0, import_react83.useContext)(y5).setReference;
}
function be() {
  return (0, import_react83.useContext)(y5).getReferenceProps;
}
function Te() {
  let { getFloatingProps: e9, slot: t14 } = (0, import_react83.useContext)(y5);
  return (0, import_react83.useCallback)(
    (...n17) => Object.assign({}, e9(...n17), { "data-anchor": t14.anchor }),
    [e9, t14],
  );
}
function Re(e9 = null) {
  (e9 === false && (e9 = null), typeof e9 == "string" && (e9 = { to: e9 }));
  let t14 = (0, import_react83.useContext)($2),
    n17 = (0, import_react83.useMemo)(
      () => e9,
      [
        JSON.stringify(e9, (l19, o20) => {
          var u25;
          return (u25 = o20 == null ? void 0 : o20.outerHTML) != null
            ? u25
            : o20;
        }),
      ],
    );
  n(() => {
    t14 == null || t14(n17 != null ? n17 : null);
  }, [t14, n17]);
  let r22 = (0, import_react83.useContext)(y5);
  return (0, import_react83.useMemo)(
    () => [r22.setFloating, e9 ? r22.styles : {}],
    [r22.setFloating, e9, r22.styles],
  );
}
var D5 = 4;
function Ae({ children: e9, enabled: t14 = true }) {
  let [n17, r22] = (0, import_react83.useState)(null),
    [l19, o20] = (0, import_react83.useState)(0),
    u25 = (0, import_react83.useRef)(null),
    [f21, s20] = (0, import_react83.useState)(null);
  ce(f21);
  let i16 = t14 && n17 !== null && f21 !== null,
    {
      to: F7 = "bottom",
      gap: E13 = 0,
      offset: A5 = 0,
      padding: c21 = 0,
      inner: h15,
    } = ge(n17, f21),
    [a28, p13 = "center"] = F7.split(" ");
  n(() => {
    i16 && o20(0);
  }, [i16]);
  let {
      refs: b14,
      floatingStyles: S10,
      context: g6,
    } = useFloating2({
      open: i16,
      placement:
        a28 === "selection"
          ? p13 === "center"
            ? "bottom"
            : `bottom-${p13}`
          : p13 === "center"
            ? `${a28}`
            : `${a28}-${p13}`,
      strategy: "absolute",
      transform: false,
      middleware: [
        offset3({ mainAxis: a28 === "selection" ? 0 : E13, crossAxis: A5 }),
        shift3({ padding: c21 }),
        a28 !== "selection" && flip3({ padding: c21 }),
        a28 === "selection" && h15
          ? inner({
              ...h15,
              padding: c21,
              overflowRef: u25,
              offset: l19,
              minItemsVisible: D5,
              referenceOverflowThreshold: c21,
              onFallbackChange(P8) {
                var L7, N4;
                if (!P8) return;
                let d14 = g6.elements.floating;
                if (!d14) return;
                let M12 =
                    parseFloat(getComputedStyle(d14).scrollPaddingBottom) || 0,
                  I10 = Math.min(D5, d14.childElementCount),
                  W5 = 0,
                  B2 = 0;
                for (let m10 of (N4 =
                  (L7 = g6.elements.floating) == null
                    ? void 0
                    : L7.childNodes) != null
                  ? N4
                  : [])
                  if (n5(m10)) {
                    let x10 = m10.offsetTop,
                      k13 = x10 + m10.clientHeight + M12,
                      H9 = d14.scrollTop,
                      U3 = H9 + d14.clientHeight;
                    if (x10 >= H9 && k13 <= U3) I10--;
                    else {
                      ((B2 = Math.max(
                        0,
                        Math.min(k13, U3) - Math.max(x10, H9),
                      )),
                        (W5 = m10.clientHeight));
                      break;
                    }
                  }
                I10 >= 1 &&
                  o20((m10) => {
                    let x10 = W5 * I10 - B2 + M12;
                    return m10 >= x10 ? m10 : x10;
                  });
              },
            })
          : null,
        size3({
          padding: c21,
          apply({ availableWidth: P8, availableHeight: d14, elements: M12 }) {
            Object.assign(M12.floating.style, {
              overflow: "auto",
              maxWidth: `${P8}px`,
              maxHeight: `min(var(--anchor-max-height, 100vh), ${d14}px)`,
            });
          },
        }),
      ].filter(Boolean),
      whileElementsMounted: autoUpdate,
    }),
    [w12 = a28, V6 = p13] = g6.placement.split("-");
  a28 === "selection" && (w12 = "selection");
  let G6 = (0, import_react83.useMemo)(
      () => ({ anchor: [w12, V6].filter(Boolean).join(" ") }),
      [w12, V6],
    ),
    K4 = useInnerOffset(g6, { overflowRef: u25, onChange: o20 }),
    { getReferenceProps: Q7, getFloatingProps: X5 } = useInteractions([K4]),
    Y4 = o4((P8) => {
      (s20(P8), b14.setFloating(P8));
    });
  return j6.createElement(
    $2.Provider,
    { value: r22 },
    j6.createElement(
      y5.Provider,
      {
        value: {
          setFloating: Y4,
          setReference: b14.setReference,
          styles: S10,
          getReferenceProps: Q7,
          getFloatingProps: X5,
          slot: G6,
        },
      },
      e9,
    ),
  );
}
function ce(e9) {
  n(() => {
    if (!e9) return;
    let t14 = new MutationObserver(() => {
      let n17 = window.getComputedStyle(e9).maxHeight,
        r22 = parseFloat(n17);
      if (isNaN(r22)) return;
      let l19 = parseInt(n17);
      isNaN(l19) ||
        (r22 !== l19 && (e9.style.maxHeight = `${Math.ceil(r22)}px`));
    });
    return (
      t14.observe(e9, { attributes: true, attributeFilter: ["style"] }),
      () => {
        t14.disconnect();
      }
    );
  }, [e9]);
}
function ge(e9, t14) {
  var o20, u25, f21;
  let n17 = O2(
      (o20 = e9 == null ? void 0 : e9.gap) != null
        ? o20
        : "var(--anchor-gap, 0)",
      t14,
    ),
    r22 = O2(
      (u25 = e9 == null ? void 0 : e9.offset) != null
        ? u25
        : "var(--anchor-offset, 0)",
      t14,
    ),
    l19 = O2(
      (f21 = e9 == null ? void 0 : e9.padding) != null
        ? f21
        : "var(--anchor-padding, 0)",
      t14,
    );
  return { ...e9, gap: n17, offset: r22, padding: l19 };
}
function O2(e9, t14, n17 = void 0) {
  let r22 = p(),
    l19 = o4((s20, i16) => {
      if (s20 == null) return [n17, null];
      if (typeof s20 == "number") return [s20, null];
      if (typeof s20 == "string") {
        if (!i16) return [n17, null];
        let F7 = J2(s20, i16);
        return [
          F7,
          (E13) => {
            let A5 = q(s20);
            {
              let c21 = A5.map((h15) =>
                window.getComputedStyle(i16).getPropertyValue(h15),
              );
              r22.requestAnimationFrame(function h15() {
                r22.nextFrame(h15);
                let a28 = false;
                for (let [b14, S10] of A5.entries()) {
                  let g6 = window.getComputedStyle(i16).getPropertyValue(S10);
                  if (c21[b14] !== g6) {
                    ((c21[b14] = g6), (a28 = true));
                    break;
                  }
                }
                if (!a28) return;
                let p13 = J2(s20, i16);
                F7 !== p13 && (E13(p13), (F7 = p13));
              });
            }
            return r22.dispose;
          },
        ];
      }
      return [n17, null];
    }),
    o20 = (0, import_react83.useMemo)(() => l19(e9, t14)[0], [e9, t14]),
    [u25 = o20, f21] = (0, import_react83.useState)();
  return (
    n(() => {
      let [s20, i16] = l19(e9, t14);
      if ((f21(s20), !!i16)) return i16(f21);
    }, [e9, t14]),
    u25
  );
}
function q(e9) {
  let t14 = /var\((.*)\)/.exec(e9);
  if (t14) {
    let n17 = t14[1].indexOf(",");
    if (n17 === -1) return [t14[1]];
    let r22 = t14[1].slice(0, n17).trim(),
      l19 = t14[1].slice(n17 + 1).trim();
    return l19 ? [r22, ...q(l19)] : [r22];
  }
  return [];
}
function J2(e9, t14) {
  let n17 = document.createElement("div");
  (t14.appendChild(n17),
    n17.style.setProperty("margin-top", "0px", "important"),
    n17.style.setProperty("margin-top", e9, "important"));
  let r22 = parseFloat(window.getComputedStyle(n17).marginTop) || 0;
  return (t14.removeChild(n17), r22);
}

// node_modules/@headlessui/react/dist/internal/frozen.js
var import_react84 = __toESM(require_react(), 1);
function f13({ children: t14, freeze: e9 }, o20) {
  let n17 = u16(e9, t14);
  return (0, import_react84.isValidElement)(n17)
    ? (0, import_react84.cloneElement)(n17, { ref: o20 })
    : import_react84.default.createElement(
        import_react84.default.Fragment,
        null,
        n17,
      );
}
var s12 = import_react84.default.forwardRef(f13);
function u16(t14, e9) {
  let [o20, n17] = (0, import_react84.useState)(e9);
  return (!t14 && o20 !== e9 && n17(e9), t14 ? o20 : e9);
}

// node_modules/@headlessui/react/dist/internal/open-closed.js
var import_react85 = __toESM(require_react(), 1);
var n12 = (0, import_react85.createContext)(null);
n12.displayName = "OpenClosedContext";
var i10 = ((e9) => (
  (e9[(e9.Open = 1)] = "Open"),
  (e9[(e9.Closed = 2)] = "Closed"),
  (e9[(e9.Closing = 4)] = "Closing"),
  (e9[(e9.Opening = 8)] = "Opening"),
  e9
))(i10 || {});
function u17() {
  return (0, import_react85.useContext)(n12);
}
function c11({ value: o20, children: t14 }) {
  return import_react85.default.createElement(
    n12.Provider,
    { value: o20 },
    t14,
  );
}
function s13({ children: o20 }) {
  return import_react85.default.createElement(
    n12.Provider,
    { value: null },
    o20,
  );
}

// node_modules/@headlessui/react/dist/utils/document-ready.js
function t9(n17) {
  function e9() {
    document.readyState !== "loading" &&
      (n17(), document.removeEventListener("DOMContentLoaded", e9));
  }
  typeof window != "undefined" &&
    typeof document != "undefined" &&
    (document.addEventListener("DOMContentLoaded", e9), e9());
}

// node_modules/@headlessui/react/dist/utils/active-element-history.js
var n13 = [];
t9(() => {
  function e9(t14) {
    if (
      !i4(t14.target) ||
      t14.target === document.body ||
      n13[0] === t14.target
    )
      return;
    let r22 = t14.target;
    ((r22 = r22.closest(E5)),
      n13.unshift(r22 != null ? r22 : t14.target),
      (n13 = n13.filter((o20) => o20 != null && o20.isConnected)),
      n13.splice(10));
  }
  (window.addEventListener("click", e9, { capture: true }),
    window.addEventListener("mousedown", e9, { capture: true }),
    window.addEventListener("focus", e9, { capture: true }),
    document.body.addEventListener("click", e9, { capture: true }),
    document.body.addEventListener("mousedown", e9, { capture: true }),
    document.body.addEventListener("focus", e9, { capture: true }));
});

// node_modules/@headlessui/react/dist/utils/calculate-active-index.js
function u18(l19) {
  throw new Error("Unexpected object: " + l19);
}
var c12 = ((i16) => (
  (i16[(i16.First = 0)] = "First"),
  (i16[(i16.Previous = 1)] = "Previous"),
  (i16[(i16.Next = 2)] = "Next"),
  (i16[(i16.Last = 3)] = "Last"),
  (i16[(i16.Specific = 4)] = "Specific"),
  (i16[(i16.Nothing = 5)] = "Nothing"),
  i16
))(c12 || {});
function f14(l19, n17) {
  let t14 = n17.resolveItems();
  if (t14.length <= 0) return null;
  let r22 = n17.resolveActiveIndex(),
    s20 = r22 != null ? r22 : -1;
  switch (l19.focus) {
    case 0: {
      for (let e9 = 0; e9 < t14.length; ++e9)
        if (!n17.resolveDisabled(t14[e9], e9, t14)) return e9;
      return r22;
    }
    case 1: {
      s20 === -1 && (s20 = t14.length);
      for (let e9 = s20 - 1; e9 >= 0; --e9)
        if (!n17.resolveDisabled(t14[e9], e9, t14)) return e9;
      return r22;
    }
    case 2: {
      for (let e9 = s20 + 1; e9 < t14.length; ++e9)
        if (!n17.resolveDisabled(t14[e9], e9, t14)) return e9;
      return r22;
    }
    case 3: {
      for (let e9 = t14.length - 1; e9 >= 0; --e9)
        if (!n17.resolveDisabled(t14[e9], e9, t14)) return e9;
      return r22;
    }
    case 4: {
      for (let e9 = 0; e9 < t14.length; ++e9)
        if (n17.resolveId(t14[e9], e9, t14) === l19.id) return e9;
      return r22;
    }
    case 5:
      return null;
    default:
      u18(l19);
  }
}

// node_modules/@headlessui/react/dist/components/portal/portal.js
var import_react88 = __toESM(require_react(), 1);
var import_react_dom8 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/hooks/use-on-unmount.js
var import_react86 = __toESM(require_react(), 1);
function c13(t14) {
  let r22 = o4(t14),
    e9 = (0, import_react86.useRef)(false);
  (0, import_react86.useEffect)(
    () => (
      (e9.current = false),
      () => {
        ((e9.current = true),
          t(() => {
            e9.current && r22();
          }));
      }
    ),
    [r22],
  );
}

// node_modules/@headlessui/react/dist/internal/portal-force-root.js
var import_react87 = __toESM(require_react(), 1);
var e7 = (0, import_react87.createContext)(false);
function a17() {
  return (0, import_react87.useContext)(e7);
}
function l14(o20) {
  return import_react87.default.createElement(
    e7.Provider,
    { value: o20.force },
    o20.children,
  );
}

// node_modules/@headlessui/react/dist/components/portal/portal.js
function W2(e9) {
  let o20 = a17(),
    l19 = (0, import_react88.useContext)(c15),
    [r22, p13] = (0, import_react88.useState)(() => {
      var s20;
      if (!o20 && l19 !== null) return (s20 = l19.current) != null ? s20 : null;
      if (s.isServer) return null;
      let t14 =
        e9 == null ? void 0 : e9.getElementById("headlessui-portal-root");
      if (t14) return t14;
      if (e9 === null) return null;
      let n17 = e9.createElement("div");
      return (
        n17.setAttribute("id", "headlessui-portal-root"),
        e9.body.appendChild(n17)
      );
    });
  return (
    (0, import_react88.useEffect)(() => {
      r22 !== null &&
        ((e9 != null && e9.body.contains(r22)) ||
          e9 == null ||
          e9.body.appendChild(r22));
    }, [r22, e9]),
    (0, import_react88.useEffect)(() => {
      o20 || (l19 !== null && p13(l19.current));
    }, [l19, p13, o20]),
    r22
  );
}
var _4 = import_react88.Fragment;
var j7 = Y(function (o20, l19) {
  let { ownerDocument: r22 = null, ...p13 } = o20,
    t14 = (0, import_react88.useRef)(null),
    n17 = y(
      T((a28) => {
        t14.current = a28;
      }),
      l19,
    ),
    s20 = u13(t14.current),
    C11 = r22 != null ? r22 : s20,
    u25 = W2(C11),
    y10 = (0, import_react88.useContext)(m8),
    g6 = p(),
    v11 = K();
  return (
    c13(() => {
      var a28;
      u25 &&
        u25.childNodes.length <= 0 &&
        ((a28 = u25.parentElement) == null || a28.removeChild(u25));
    }),
    u25
      ? (0, import_react_dom8.createPortal)(
          import_react88.default.createElement(
            "div",
            {
              "data-headlessui-portal": "",
              ref: (a28) => {
                (g6.dispose(), y10 && a28 && g6.add(y10.register(a28)));
              },
            },
            v11({
              ourProps: { ref: n17 },
              theirProps: p13,
              slot: {},
              defaultTag: _4,
              name: "Portal",
            }),
          ),
          u25,
        )
      : null
  );
});
function S7(e9, o20) {
  let l19 = y(o20),
    { enabled: r22 = true, ownerDocument: p13, ...t14 } = e9,
    n17 = K();
  return r22
    ? import_react88.default.createElement(j7, {
        ...t14,
        ownerDocument: p13,
        ref: l19,
      })
    : n17({
        ourProps: { ref: l19 },
        theirProps: t14,
        slot: {},
        defaultTag: _4,
        name: "Portal",
      });
}
var I5 = import_react88.Fragment;
var c15 = (0, import_react88.createContext)(null);
function D6(e9, o20) {
  let { target: l19, ...r22 } = e9,
    t14 = { ref: y(o20) },
    n17 = K();
  return import_react88.default.createElement(
    c15.Provider,
    { value: l19 },
    n17({
      ourProps: t14,
      theirProps: r22,
      defaultTag: I5,
      name: "Popover.Group",
    }),
  );
}
var m8 = (0, import_react88.createContext)(null);
function ee() {
  let e9 = (0, import_react88.useContext)(m8),
    o20 = (0, import_react88.useRef)([]),
    l19 = o4(
      (t14) => (o20.current.push(t14), e9 && e9.register(t14), () => r22(t14)),
    ),
    r22 = o4((t14) => {
      let n17 = o20.current.indexOf(t14);
      (n17 !== -1 && o20.current.splice(n17, 1), e9 && e9.unregister(t14));
    }),
    p13 = (0, import_react88.useMemo)(
      () => ({ register: l19, unregister: r22, portals: o20 }),
      [l19, r22, o20],
    );
  return [
    o20,
    (0, import_react88.useMemo)(
      () =>
        function ({ children: n17 }) {
          return import_react88.default.createElement(
            m8.Provider,
            { value: p13 },
            n17,
          );
        },
      [p13],
    ),
  ];
}
var J3 = Y(S7);
var X = Y(D6);
var te = Object.assign(J3, { Group: X });

// node_modules/@headlessui/react/dist/utils/element-movement.js
var c16 = {
  Idle: { kind: "Idle" },
  Tracked: (e9) => ({ kind: "Tracked", position: e9 }),
  Moved: { kind: "Moved" },
};
function a18(e9) {
  let t14 = e9.getBoundingClientRect();
  return `${t14.x},${t14.y}`;
}
function p6(e9, t14, i16) {
  let n17 = o2();
  if (t14.kind === "Tracked") {
    let o20 = function () {
      d14 !== a18(e9) && (n17.dispose(), i16());
    };
    var f21 = o20;
    let { position: d14 } = t14,
      s20 = new ResizeObserver(o20);
    (s20.observe(e9),
      n17.add(() => s20.disconnect()),
      n17.addEventListener(window, "scroll", o20, { passive: true }),
      n17.addEventListener(window, "resize", o20));
  }
  return () => n17.dispose();
}

// node_modules/@headlessui/react/dist/components/combobox/combobox-machine.js
var I6 = Object.defineProperty;
var h7 = (t14, i16, e9) =>
  i16 in t14
    ? I6(t14, i16, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: e9,
      })
    : (t14[i16] = e9);
var f15 = (t14, i16, e9) => (
  h7(t14, typeof i16 != "symbol" ? i16 + "" : i16, e9),
  e9
);
var P5 = ((e9) => (
  (e9[(e9.Open = 0)] = "Open"),
  (e9[(e9.Closed = 1)] = "Closed"),
  e9
))(P5 || {});
var k6 = ((e9) => (
  (e9[(e9.Single = 0)] = "Single"),
  (e9[(e9.Multi = 1)] = "Multi"),
  e9
))(k6 || {});
var _5 = ((n17) => (
  (n17[(n17.Pointer = 0)] = "Pointer"),
  (n17[(n17.Focus = 1)] = "Focus"),
  (n17[(n17.Other = 2)] = "Other"),
  n17
))(_5 || {});
var D7 = ((l19) => (
  (l19[(l19.OpenCombobox = 0)] = "OpenCombobox"),
  (l19[(l19.CloseCombobox = 1)] = "CloseCombobox"),
  (l19[(l19.GoToOption = 2)] = "GoToOption"),
  (l19[(l19.SetTyping = 3)] = "SetTyping"),
  (l19[(l19.RegisterOption = 4)] = "RegisterOption"),
  (l19[(l19.UnregisterOption = 5)] = "UnregisterOption"),
  (l19[(l19.DefaultToFirstOption = 6)] = "DefaultToFirstOption"),
  (l19[(l19.SetActivationTrigger = 7)] = "SetActivationTrigger"),
  (l19[(l19.UpdateVirtualConfiguration = 8)] = "UpdateVirtualConfiguration"),
  (l19[(l19.SetInputElement = 9)] = "SetInputElement"),
  (l19[(l19.SetButtonElement = 10)] = "SetButtonElement"),
  (l19[(l19.SetOptionsElement = 11)] = "SetOptionsElement"),
  (l19[(l19.MarkInputAsMoved = 12)] = "MarkInputAsMoved"),
  l19
))(D7 || {});
function v8(t14, i16 = (e9) => e9) {
  let e9 =
      t14.activeOptionIndex !== null
        ? t14.options[t14.activeOptionIndex]
        : null,
    n17 = i16(t14.options.slice()),
    o20 =
      n17.length > 0 && n17[0].dataRef.current.order !== null
        ? n17.sort(
            (u25, a28) => u25.dataRef.current.order - a28.dataRef.current.order,
          )
        : G2(n17, (u25) => u25.dataRef.current.domRef.current),
    r22 = e9 ? o20.indexOf(e9) : null;
  return (r22 === -1 && (r22 = null), { options: o20, activeOptionIndex: r22 });
}
var j8 = {
  [1](t14) {
    var e9;
    if (
      ((e9 = t14.dataRef.current) != null && e9.disabled) ||
      t14.comboboxState === 1
    )
      return t14;
    let i16 = t14.inputElement
      ? c16.Tracked(a18(t14.inputElement))
      : t14.inputPositionState;
    return {
      ...t14,
      activeOptionIndex: null,
      comboboxState: 1,
      isTyping: false,
      activationTrigger: 2,
      inputPositionState: i16,
      __demoMode: false,
    };
  },
  [0](t14) {
    var i16, e9;
    if (
      ((i16 = t14.dataRef.current) != null && i16.disabled) ||
      t14.comboboxState === 0
    )
      return t14;
    if ((e9 = t14.dataRef.current) != null && e9.value) {
      let n17 = t14.dataRef.current.calculateIndex(t14.dataRef.current.value);
      if (n17 !== -1)
        return {
          ...t14,
          activeOptionIndex: n17,
          comboboxState: 0,
          __demoMode: false,
          inputPositionState: c16.Idle,
        };
    }
    return {
      ...t14,
      comboboxState: 0,
      inputPositionState: c16.Idle,
      __demoMode: false,
    };
  },
  [3](t14, i16) {
    return t14.isTyping === i16.isTyping
      ? t14
      : { ...t14, isTyping: i16.isTyping };
  },
  [2](t14, i16) {
    var r22, u25, a28, s20;
    if (
      ((r22 = t14.dataRef.current) != null && r22.disabled) ||
      (t14.optionsElement &&
        !(
          (u25 = t14.dataRef.current) != null &&
          u25.optionsPropsRef.current.static
        ) &&
        t14.comboboxState === 1)
    )
      return t14;
    if (t14.virtual) {
      let { options: p13, disabled: c21 } = t14.virtual,
        m10 =
          i16.focus === c12.Specific
            ? i16.idx
            : f14(i16, {
                resolveItems: () => p13,
                resolveActiveIndex: () => {
                  var l19, x10;
                  return (x10 =
                    (l19 = t14.activeOptionIndex) != null
                      ? l19
                      : p13.findIndex((S10) => !c21(S10))) != null
                    ? x10
                    : null;
                },
                resolveDisabled: c21,
                resolveId() {
                  throw new Error("Function not implemented.");
                },
              }),
        b14 = (a28 = i16.trigger) != null ? a28 : 2;
      return t14.activeOptionIndex === m10 && t14.activationTrigger === b14
        ? t14
        : {
            ...t14,
            activeOptionIndex: m10,
            activationTrigger: b14,
            isTyping: false,
            __demoMode: false,
          };
    }
    let e9 = v8(t14);
    if (e9.activeOptionIndex === null) {
      let p13 = e9.options.findIndex((c21) => !c21.dataRef.current.disabled);
      p13 !== -1 && (e9.activeOptionIndex = p13);
    }
    let n17 =
        i16.focus === c12.Specific
          ? i16.idx
          : f14(i16, {
              resolveItems: () => e9.options,
              resolveActiveIndex: () => e9.activeOptionIndex,
              resolveId: (p13) => p13.id,
              resolveDisabled: (p13) => p13.dataRef.current.disabled,
            }),
      o20 = (s20 = i16.trigger) != null ? s20 : 2;
    return t14.activeOptionIndex === n17 && t14.activationTrigger === o20
      ? t14
      : {
          ...t14,
          ...e9,
          isTyping: false,
          activeOptionIndex: n17,
          activationTrigger: o20,
          __demoMode: false,
        };
  },
  [4]: (t14, i16) => {
    var r22, u25, a28, s20;
    if ((r22 = t14.dataRef.current) != null && r22.virtual)
      return { ...t14, options: [...t14.options, i16.payload] };
    let e9 = i16.payload,
      n17 = v8(t14, (p13) => (p13.push(e9), p13));
    t14.activeOptionIndex === null &&
      (a28 = (u25 = t14.dataRef.current).isSelected) != null &&
      a28.call(u25, i16.payload.dataRef.current.value) &&
      (n17.activeOptionIndex = n17.options.indexOf(e9));
    let o20 = { ...t14, ...n17, activationTrigger: 2 };
    return (
      (s20 = t14.dataRef.current) != null &&
        s20.__demoMode &&
        t14.dataRef.current.value === void 0 &&
        (o20.activeOptionIndex = 0),
      o20
    );
  },
  [5]: (t14, i16) => {
    var n17;
    if ((n17 = t14.dataRef.current) != null && n17.virtual)
      return {
        ...t14,
        options: t14.options.filter((o20) => o20.id !== i16.id),
      };
    let e9 = v8(t14, (o20) => {
      let r22 = o20.findIndex((u25) => u25.id === i16.id);
      return (r22 !== -1 && o20.splice(r22, 1), o20);
    });
    return { ...t14, ...e9, activationTrigger: 2 };
  },
  [6]: (t14, i16) =>
    t14.defaultToFirstOption === i16.value
      ? t14
      : { ...t14, defaultToFirstOption: i16.value },
  [7]: (t14, i16) =>
    t14.activationTrigger === i16.trigger
      ? t14
      : { ...t14, activationTrigger: i16.trigger },
  [8]: (t14, i16) => {
    var n17, o20;
    if (t14.virtual === null)
      return {
        ...t14,
        virtual: {
          options: i16.options,
          disabled: (n17 = i16.disabled) != null ? n17 : () => false,
        },
      };
    if (
      t14.virtual.options === i16.options &&
      t14.virtual.disabled === i16.disabled
    )
      return t14;
    let e9 = t14.activeOptionIndex;
    if (t14.activeOptionIndex !== null) {
      let r22 = i16.options.indexOf(t14.virtual.options[t14.activeOptionIndex]);
      r22 !== -1 ? (e9 = r22) : (e9 = null);
    }
    return {
      ...t14,
      activeOptionIndex: e9,
      virtual: {
        options: i16.options,
        disabled: (o20 = i16.disabled) != null ? o20 : () => false,
      },
    };
  },
  [9]: (t14, i16) =>
    t14.inputElement === i16.element
      ? t14
      : { ...t14, inputElement: i16.element },
  [10]: (t14, i16) =>
    t14.buttonElement === i16.element
      ? t14
      : { ...t14, buttonElement: i16.element },
  [11]: (t14, i16) =>
    t14.optionsElement === i16.element
      ? t14
      : { ...t14, optionsElement: i16.element },
  [12](t14) {
    return t14.inputPositionState.kind !== "Tracked"
      ? t14
      : { ...t14, inputPositionState: c16.Moved };
  },
};
var y6 = class _y extends T3 {
  constructor(e9) {
    super(e9);
    f15(this, "actions", {
      onChange: (e10) => {
        let {
          onChange: n17,
          compare: o20,
          mode: r22,
          value: u25,
        } = this.state.dataRef.current;
        return u(r22, {
          [0]: () => (n17 == null ? void 0 : n17(e10)),
          [1]: () => {
            let a28 = u25.slice(),
              s20 = a28.findIndex((p13) => o20(p13, e10));
            return (
              s20 === -1 ? a28.push(e10) : a28.splice(s20, 1),
              n17 == null ? void 0 : n17(a28)
            );
          },
        });
      },
      registerOption: (e10, n17) => (
        this.send({ type: 4, payload: { id: e10, dataRef: n17 } }),
        () => {
          (this.state.activeOptionIndex ===
            this.state.dataRef.current.calculateIndex(n17.current.value) &&
            this.send({ type: 6, value: true }),
            this.send({ type: 5, id: e10 }));
        }
      ),
      goToOption: (e10, n17) => (
        this.send({ type: 6, value: false }),
        this.send({ type: 2, ...e10, trigger: n17 })
      ),
      setIsTyping: (e10) => {
        this.send({ type: 3, isTyping: e10 });
      },
      closeCombobox: () => {
        var e10, n17;
        (this.send({ type: 1 }),
          this.send({ type: 6, value: false }),
          (n17 = (e10 = this.state.dataRef.current).onClose) == null ||
            n17.call(e10));
      },
      openCombobox: () => {
        (this.send({ type: 0 }), this.send({ type: 6, value: true }));
      },
      setActivationTrigger: (e10) => {
        this.send({ type: 7, trigger: e10 });
      },
      selectActiveOption: () => {
        let e10 = this.selectors.activeOptionIndex(this.state);
        if (e10 !== null) {
          if ((this.actions.setIsTyping(false), this.state.virtual))
            this.actions.onChange(this.state.virtual.options[e10]);
          else {
            let { dataRef: n17 } = this.state.options[e10];
            this.actions.onChange(n17.current.value);
          }
          this.actions.goToOption({ focus: c12.Specific, idx: e10 });
        }
      },
      setInputElement: (e10) => {
        this.send({ type: 9, element: e10 });
      },
      setButtonElement: (e10) => {
        this.send({ type: 10, element: e10 });
      },
      setOptionsElement: (e10) => {
        this.send({ type: 11, element: e10 });
      },
    });
    f15(this, "selectors", {
      activeDescendantId: (e10) => {
        var o20, r22;
        let n17 = this.selectors.activeOptionIndex(e10);
        if (n17 !== null)
          return e10.virtual
            ? (r22 = e10.options.find(
                (u25) =>
                  !u25.dataRef.current.disabled &&
                  e10.dataRef.current.compare(
                    u25.dataRef.current.value,
                    e10.virtual.options[n17],
                  ),
              )) == null
              ? void 0
              : r22.id
            : (o20 = e10.options[n17]) == null
              ? void 0
              : o20.id;
      },
      activeOptionIndex: (e10) => {
        if (
          e10.defaultToFirstOption &&
          e10.activeOptionIndex === null &&
          (e10.virtual
            ? e10.virtual.options.length > 0
            : e10.options.length > 0)
        ) {
          if (e10.virtual) {
            let { options: o20, disabled: r22 } = e10.virtual,
              u25 = o20.findIndex((a28) => {
                var s20;
                return !(
                  (s20 = r22 == null ? void 0 : r22(a28)) != null && s20
                );
              });
            if (u25 !== -1) return u25;
          }
          let n17 = e10.options.findIndex(
            (o20) => !o20.dataRef.current.disabled,
          );
          if (n17 !== -1) return n17;
        }
        return e10.activeOptionIndex;
      },
      activeOption: (e10) => {
        var o20, r22;
        let n17 = this.selectors.activeOptionIndex(e10);
        return n17 === null
          ? null
          : e10.virtual
            ? e10.virtual.options[n17 != null ? n17 : 0]
            : (r22 =
                  (o20 = e10.options[n17]) == null
                    ? void 0
                    : o20.dataRef.current.value) != null
              ? r22
              : null;
      },
      isActive: (e10, n17, o20) => {
        var u25;
        let r22 = this.selectors.activeOptionIndex(e10);
        return r22 === null
          ? false
          : e10.virtual
            ? r22 === e10.dataRef.current.calculateIndex(n17)
            : ((u25 = e10.options[r22]) == null ? void 0 : u25.id) === o20;
      },
      shouldScrollIntoView: (e10, n17, o20) =>
        !(
          e10.virtual ||
          e10.__demoMode ||
          e10.comboboxState !== 0 ||
          e10.activationTrigger === 0 ||
          !this.selectors.isActive(e10, n17, o20)
        ),
      didInputMove(e10) {
        return e10.inputPositionState.kind === "Moved";
      },
    });
    {
      let n17 = this.state.id,
        o20 = x2.get(null);
      (this.disposables.add(
        o20.on(k4.Push, (r22) => {
          !o20.selectors.isTop(r22, n17) &&
            this.state.comboboxState === 0 &&
            this.actions.closeCombobox();
        }),
      ),
        this.on(0, () => o20.actions.push(n17)),
        this.on(1, () => o20.actions.pop(n17)));
    }
    this.disposables.group((n17) => {
      this.on(1, (o20) => {
        o20.inputElement &&
          (n17.dispose(),
          n17.add(
            p6(o20.inputElement, o20.inputPositionState, () => {
              this.send({ type: 12 });
            }),
          ));
      });
    });
  }
  static new({ id: e9, virtual: n17 = null, __demoMode: o20 = false }) {
    var r22;
    return new _y({
      id: e9,
      dataRef: { current: {} },
      comboboxState: o20 ? 0 : 1,
      isTyping: false,
      options: [],
      virtual: n17
        ? {
            options: n17.options,
            disabled: (r22 = n17.disabled) != null ? r22 : () => false,
          }
        : null,
      activeOptionIndex: null,
      activationTrigger: 2,
      inputElement: null,
      buttonElement: null,
      optionsElement: null,
      __demoMode: o20,
      inputPositionState: c16.Idle,
    });
  }
  reduce(e9, n17) {
    return u(n17.type, j8, e9, n17);
  }
};

// node_modules/@headlessui/react/dist/components/combobox/combobox-machine-glue.js
var import_react89 = __toESM(require_react(), 1);
var u20 = (0, import_react89.createContext)(null);
function p7(n17) {
  let o20 = (0, import_react89.useContext)(u20);
  if (o20 === null) {
    let e9 = new Error(
      `<${n17} /> is missing a parent <Combobox /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, b7), e9);
  }
  return o20;
}
function b7({ id: n17, virtual: o20 = null, __demoMode: e9 = false }) {
  let t14 = (0, import_react89.useMemo)(
    () => y6.new({ id: n17, virtual: o20, __demoMode: e9 }),
    [],
  );
  return (c13(() => t14.dispose()), t14);
}

// node_modules/@headlessui/react/dist/components/combobox/combobox.js
var de2 = (0, import_react90.createContext)(null);
de2.displayName = "ComboboxDataContext";
function te2(T10) {
  let O5 = (0, import_react90.useContext)(de2);
  if (O5 === null) {
    let e9 = new Error(
      `<${T10} /> is missing a parent <Combobox /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, te2), e9);
  }
  return O5;
}
var Le = (0, import_react90.createContext)(null);
function Eo(T10) {
  let O5 = p7("VirtualProvider"),
    e9 = te2("VirtualProvider"),
    { options: o20 } = e9.virtual,
    E13 = S3(O5, (a28) => a28.optionsElement),
    [R7, y10] = (0, import_react90.useMemo)(() => {
      let a28 = E13;
      if (!a28) return [0, 0];
      let u25 = window.getComputedStyle(a28);
      return [
        parseFloat(u25.paddingBlockStart || u25.paddingTop),
        parseFloat(u25.paddingBlockEnd || u25.paddingBottom),
      ];
    }, [E13]),
    b14 = useVirtualizer({
      enabled: o20.length !== 0,
      scrollPaddingStart: R7,
      scrollPaddingEnd: y10,
      count: o20.length,
      estimateSize() {
        return 40;
      },
      getScrollElement() {
        return O5.state.optionsElement;
      },
      overscan: 12,
    }),
    [h15, p13] = (0, import_react90.useState)(0);
  n(() => {
    p13((a28) => a28 + 1);
  }, [o20]);
  let f21 = b14.getVirtualItems(),
    n17 = S3(O5, (a28) => a28.activationTrigger === _5.Pointer),
    m10 = S3(O5, O5.selectors.activeOptionIndex);
  return f21.length === 0
    ? null
    : import_react90.default.createElement(
        Le.Provider,
        { value: b14 },
        import_react90.default.createElement(
          "div",
          {
            style: {
              position: "relative",
              width: "100%",
              height: `${b14.getTotalSize()}px`,
            },
            ref: (a28) => {
              a28 &&
                (n17 ||
                  (m10 !== null && o20.length > m10 && b14.scrollToIndex(m10)));
            },
          },
          f21.map((a28) => {
            var u25;
            return import_react90.default.createElement(
              import_react90.Fragment,
              { key: a28.key },
              import_react90.default.cloneElement(
                (u25 = T10.children) == null
                  ? void 0
                  : u25.call(T10, { ...T10.slot, option: o20[a28.index] }),
                {
                  key: `${h15}-${a28.key}`,
                  "data-index": a28.index,
                  "aria-setsize": o20.length,
                  "aria-posinset": a28.index + 1,
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: `translateY(${a28.start}px)`,
                    overflowAnchor: "none",
                  },
                },
              ),
            );
          }),
        ),
      );
}
var ho = import_react90.Fragment;
function Ao(T10, O5) {
  let e9 = (0, import_react51.useId)(),
    o20 = a3(),
    {
      value: E13,
      defaultValue: R7,
      onChange: y10,
      form: b14,
      name: h15,
      by: p13,
      invalid: f21 = false,
      disabled: n17 = o20 || false,
      onClose: m10,
      __demoMode: a28 = false,
      multiple: u25 = false,
      immediate: A5 = false,
      virtual: d14 = null,
      nullable: X5,
      ...G6
    } = T10,
    C11 = l3(R7),
    [x10 = u25 ? [] : void 0, v11] = b2(E13, y10, C11),
    c21 = b7({ id: e9, virtual: d14, __demoMode: a28 }),
    z4 = (0, import_react90.useRef)({ static: false, hold: false }),
    D12 = u9(p13),
    K4 = o4((i16) =>
      d14
        ? p13 === null
          ? d14.options.indexOf(i16)
          : d14.options.findIndex((M12) => D12(M12, i16))
        : c21.state.options.findIndex((M12) =>
            D12(M12.dataRef.current.value, i16),
          ),
    ),
    W5 = (0, import_react90.useCallback)(
      (i16) =>
        u(l19.mode, {
          [k6.Multi]: () => x10.some((M12) => D12(M12, i16)),
          [k6.Single]: () => D12(x10, i16),
        }),
      [x10],
    ),
    S10 = S3(c21, (i16) => i16.virtual),
    j11 = o4(() => (m10 == null ? void 0 : m10())),
    l19 = (0, import_react90.useMemo)(
      () => ({
        __demoMode: a28,
        immediate: A5,
        optionsPropsRef: z4,
        value: x10,
        defaultValue: C11,
        disabled: n17,
        invalid: f21,
        mode: u25 ? k6.Multi : k6.Single,
        virtual: d14 ? S10 : null,
        onChange: v11,
        isSelected: W5,
        calculateIndex: K4,
        compare: D12,
        onClose: j11,
      }),
      [a28, A5, z4, x10, C11, n17, f21, u25, d14, S10, v11, W5, K4, D12, j11],
    );
  (n(() => {
    var i16;
    d14 &&
      c21.send({
        type: D7.UpdateVirtualConfiguration,
        options: d14.options,
        disabled: (i16 = d14.disabled) != null ? i16 : null,
      });
  }, [
    d14,
    d14 == null ? void 0 : d14.options,
    d14 == null ? void 0 : d14.disabled,
  ]),
    n(() => {
      c21.state.dataRef.current = l19;
    }, [l19]));
  let [k13, Y4, s20, U3] = S3(c21, (i16) => [
      i16.comboboxState,
      i16.buttonElement,
      i16.inputElement,
      i16.optionsElement,
    ]),
    $6 = x2.get(null),
    ne4 = S3(
      $6,
      (0, import_react90.useCallback)(
        (i16) => $6.selectors.isTop(i16, e9),
        [$6, e9],
      ),
    );
  k5(ne4, [Y4, s20, U3], () => c21.actions.closeCombobox());
  let be3 = S3(c21, c21.selectors.activeOptionIndex),
    ee7 = S3(c21, c21.selectors.activeOption),
    q5 = n2({
      open: k13 === P5.Open,
      disabled: n17,
      invalid: f21,
      activeIndex: be3,
      activeOption: ee7,
      value: x10,
    }),
    [t14, V6] = V2(),
    P8 = O5 === null ? {} : { ref: O5 },
    N4 = (0, import_react90.useCallback)(() => {
      if (C11 !== void 0) return v11 == null ? void 0 : v11(C11);
    }, [v11, C11]),
    g6 = K();
  return import_react90.default.createElement(
    V6,
    {
      value: t14,
      props: { htmlFor: s20 == null ? void 0 : s20.id },
      slot: { open: k13 === P5.Open, disabled: n17 },
    },
    import_react90.default.createElement(
      Ae,
      null,
      import_react90.default.createElement(
        de2.Provider,
        { value: l19 },
        import_react90.default.createElement(
          u20.Provider,
          { value: c21 },
          import_react90.default.createElement(
            c11,
            { value: u(k13, { [P5.Open]: i10.Open, [P5.Closed]: i10.Closed }) },
            h15 != null &&
              import_react90.default.createElement(j2, {
                disabled: n17,
                data: x10 != null ? { [h15]: x10 } : {},
                form: b14,
                onReset: N4,
              }),
            g6({
              ourProps: P8,
              theirProps: G6,
              slot: q5,
              defaultTag: ho,
              name: "Combobox",
            }),
          ),
        ),
      ),
    ),
  );
}
var Io = "input";
function Ro(T10, O5) {
  var ee7, q5;
  let e9 = p7("Combobox.Input"),
    o20 = te2("Combobox.Input"),
    E13 = (0, import_react51.useId)(),
    R7 = u4(),
    {
      id: y10 = R7 || `headlessui-combobox-input-${E13}`,
      onChange: b14,
      displayValue: h15,
      disabled: p13 = o20.disabled || false,
      autoFocus: f21 = false,
      type: n17 = "text",
      ...m10
    } = T10,
    a28 = (0, import_react90.useRef)(null),
    u25 = y(a28, O5, Fe(), e9.actions.setInputElement),
    [A5, d14] = S3(e9, (t14) => [t14.comboboxState, t14.isTyping]),
    X5 = p(),
    G6 = o4(() => {
      (e9.actions.onChange(null),
        e9.state.optionsElement && (e9.state.optionsElement.scrollTop = 0),
        e9.actions.goToOption({ focus: c12.Nothing }));
    }),
    C11 = (0, import_react90.useMemo)(() => {
      var t14;
      return typeof h15 == "function" && o20.value !== void 0
        ? (t14 = h15(o20.value)) != null
          ? t14
          : ""
        : typeof o20.value == "string"
          ? o20.value
          : "";
    }, [o20.value, h15]);
  (m7(
    ([t14, V6], [P8, N4]) => {
      if (e9.state.isTyping) return;
      let g6 = a28.current;
      g6 &&
        (((N4 === P5.Open && V6 === P5.Closed) || t14 !== P8) &&
          (g6.value = t14),
        requestAnimationFrame(() => {
          if (e9.state.isTyping || !g6 || d2(g6)) return;
          let { selectionStart: i16, selectionEnd: M12 } = g6;
          Math.abs((M12 != null ? M12 : 0) - (i16 != null ? i16 : 0)) === 0 &&
            i16 === 0 &&
            g6.setSelectionRange(g6.value.length, g6.value.length);
        }));
    },
    [C11, A5, d14],
  ),
    m7(
      ([t14], [V6]) => {
        if (t14 === P5.Open && V6 === P5.Closed) {
          if (e9.state.isTyping) return;
          let P8 = a28.current;
          if (!P8) return;
          let N4 = P8.value,
            {
              selectionStart: g6,
              selectionEnd: i16,
              selectionDirection: M12,
            } = P8;
          ((P8.value = ""),
            (P8.value = N4),
            M12 !== null
              ? P8.setSelectionRange(g6, i16, M12)
              : P8.setSelectionRange(g6, i16));
        }
      },
      [A5],
    ));
  let x10 = (0, import_react90.useRef)(false),
    v11 = o4(() => {
      x10.current = true;
    }),
    c21 = o4(() => {
      X5.nextFrame(() => {
        x10.current = false;
      });
    }),
    z4 = o4((t14) => {
      switch ((e9.actions.setIsTyping(true), t14.key)) {
        case o8.Enter:
          if (e9.state.comboboxState !== P5.Open || x10.current) return;
          if (
            (t14.preventDefault(),
            t14.stopPropagation(),
            e9.selectors.activeOptionIndex(e9.state) === null)
          ) {
            e9.actions.closeCombobox();
            return;
          }
          (e9.actions.selectActiveOption(),
            o20.mode === k6.Single && e9.actions.closeCombobox());
          break;
        case o8.ArrowDown:
          return (
            t14.preventDefault(),
            t14.stopPropagation(),
            u(e9.state.comboboxState, {
              [P5.Open]: () => e9.actions.goToOption({ focus: c12.Next }),
              [P5.Closed]: () => e9.actions.openCombobox(),
            })
          );
        case o8.ArrowUp:
          return (
            t14.preventDefault(),
            t14.stopPropagation(),
            u(e9.state.comboboxState, {
              [P5.Open]: () => e9.actions.goToOption({ focus: c12.Previous }),
              [P5.Closed]: () => {
                ((0, import_react_dom9.flushSync)(() =>
                  e9.actions.openCombobox(),
                ),
                  o20.value || e9.actions.goToOption({ focus: c12.Last }));
              },
            })
          );
        case o8.Home:
          if (e9.state.comboboxState === P5.Closed || t14.shiftKey) break;
          return (
            t14.preventDefault(),
            t14.stopPropagation(),
            e9.actions.goToOption({ focus: c12.First })
          );
        case o8.PageUp:
          return (
            t14.preventDefault(),
            t14.stopPropagation(),
            e9.actions.goToOption({ focus: c12.First })
          );
        case o8.End:
          if (e9.state.comboboxState === P5.Closed || t14.shiftKey) break;
          return (
            t14.preventDefault(),
            t14.stopPropagation(),
            e9.actions.goToOption({ focus: c12.Last })
          );
        case o8.PageDown:
          return (
            t14.preventDefault(),
            t14.stopPropagation(),
            e9.actions.goToOption({ focus: c12.Last })
          );
        case o8.Escape:
          return e9.state.comboboxState !== P5.Open
            ? void 0
            : (t14.preventDefault(),
              e9.state.optionsElement &&
                !o20.optionsPropsRef.current.static &&
                t14.stopPropagation(),
              o20.mode === k6.Single && o20.value === null && G6(),
              e9.actions.closeCombobox());
        case o8.Tab:
          if (
            (e9.actions.setIsTyping(false), e9.state.comboboxState !== P5.Open)
          )
            return;
          (o20.mode === k6.Single &&
            e9.state.activationTrigger !== _5.Focus &&
            e9.actions.selectActiveOption(),
            e9.actions.closeCombobox());
          break;
      }
    }),
    D12 = o4((t14) => {
      (b14 == null || b14(t14),
        o20.mode === k6.Single && t14.target.value === "" && G6(),
        e9.actions.openCombobox());
    }),
    K4 = o4((t14) => {
      var P8, N4, g6;
      let V6 =
        (P8 = t14.relatedTarget) != null
          ? P8
          : n13.find((i16) => i16 !== t14.currentTarget);
      if (
        !((N4 = e9.state.optionsElement) != null && N4.contains(V6)) &&
        !((g6 = e9.state.buttonElement) != null && g6.contains(V6)) &&
        e9.state.comboboxState === P5.Open
      )
        return (
          t14.preventDefault(),
          o20.mode === k6.Single && o20.value === null && G6(),
          e9.actions.closeCombobox()
        );
    }),
    W5 = o4((t14) => {
      var P8, N4, g6;
      let V6 =
        (P8 = t14.relatedTarget) != null
          ? P8
          : n13.find((i16) => i16 !== t14.currentTarget);
      ((N4 = e9.state.buttonElement) != null && N4.contains(V6)) ||
        ((g6 = e9.state.optionsElement) != null && g6.contains(V6)) ||
        o20.disabled ||
        (o20.immediate &&
          e9.state.comboboxState !== P5.Open &&
          X5.microTask(() => {
            ((0, import_react_dom9.flushSync)(() => e9.actions.openCombobox()),
              e9.actions.setActivationTrigger(_5.Focus));
          }));
    }),
    S10 = N(),
    j11 = w3(),
    { isFocused: l19, focusProps: k13 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: f21 }),
    { isHovered: Y4, hoverProps: s20 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: p13 }),
    U3 = S3(e9, (t14) => t14.optionsElement),
    $6 = n2({
      open: A5 === P5.Open,
      disabled: p13,
      invalid: o20.invalid,
      hover: Y4,
      focus: l19,
      autofocus: f21,
    }),
    ne4 = V(
      {
        ref: u25,
        id: y10,
        role: "combobox",
        type: n17,
        "aria-controls": U3 == null ? void 0 : U3.id,
        "aria-expanded": A5 === P5.Open,
        "aria-activedescendant": S3(e9, e9.selectors.activeDescendantId),
        "aria-labelledby": S10,
        "aria-describedby": j11,
        "aria-autocomplete": "list",
        defaultValue:
          (q5 =
            (ee7 = T10.defaultValue) != null
              ? ee7
              : o20.defaultValue !== void 0
                ? h15 == null
                  ? void 0
                  : h15(o20.defaultValue)
                : null) != null
            ? q5
            : o20.defaultValue,
        disabled: p13 || void 0,
        autoFocus: f21,
        onCompositionStart: v11,
        onCompositionEnd: c21,
        onKeyDown: z4,
        onChange: D12,
        onFocus: W5,
        onBlur: K4,
      },
      k13,
      s20,
    );
  return K()({
    ourProps: ne4,
    theirProps: m10,
    slot: $6,
    defaultTag: Io,
    name: "Combobox.Input",
  });
}
var _o = "button";
function Fo(T10, O5) {
  let e9 = p7("Combobox.Button"),
    o20 = te2("Combobox.Button"),
    [E13, R7] = (0, import_react90.useState)(null),
    y10 = y(O5, R7, e9.actions.setButtonElement),
    b14 = (0, import_react51.useId)(),
    {
      id: h15 = `headlessui-combobox-button-${b14}`,
      disabled: p13 = o20.disabled || false,
      autoFocus: f21 = false,
      ...n17
    } = T10,
    [m10, a28, u25] = S3(e9, (l19) => [
      l19.comboboxState,
      l19.inputElement,
      l19.optionsElement,
    ]),
    A5 = v6(a28),
    d14 = m10 === P5.Open;
  L4(d14, {
    trigger: E13,
    action: (0, import_react90.useCallback)(
      (l19) => {
        if (E13 != null && E13.contains(l19.target)) return S5.Ignore;
        if (a28 != null && a28.contains(l19.target)) return S5.Ignore;
        let k13 = l19.target.closest('[role="option"]:not([data-disabled])');
        return n5(k13)
          ? S5.Select(k13)
          : u25 != null && u25.contains(l19.target)
            ? S5.Ignore
            : S5.Close;
      },
      [E13, a28, u25],
    ),
    close: e9.actions.closeCombobox,
    select: e9.actions.selectActiveOption,
  });
  let X5 = o4((l19) => {
      switch (l19.key) {
        case o8.Space:
        case o8.Enter:
          (l19.preventDefault(),
            l19.stopPropagation(),
            e9.state.comboboxState === P5.Closed &&
              (0, import_react_dom9.flushSync)(() => e9.actions.openCombobox()),
            A5());
          return;
        case o8.ArrowDown:
          (l19.preventDefault(),
            l19.stopPropagation(),
            e9.state.comboboxState === P5.Closed &&
              ((0, import_react_dom9.flushSync)(() =>
                e9.actions.openCombobox(),
              ),
              e9.state.dataRef.current.value ||
                e9.actions.goToOption({ focus: c12.First })),
            A5());
          return;
        case o8.ArrowUp:
          (l19.preventDefault(),
            l19.stopPropagation(),
            e9.state.comboboxState === P5.Closed &&
              ((0, import_react_dom9.flushSync)(() =>
                e9.actions.openCombobox(),
              ),
              e9.state.dataRef.current.value ||
                e9.actions.goToOption({ focus: c12.Last })),
            A5());
          return;
        case o8.Escape:
          if (e9.state.comboboxState !== P5.Open) return;
          (l19.preventDefault(),
            e9.state.optionsElement &&
              !o20.optionsPropsRef.current.static &&
              l19.stopPropagation(),
            (0, import_react_dom9.flushSync)(() => e9.actions.closeCombobox()),
            A5());
          return;
        default:
          return;
      }
    }),
    G6 = s8(() => {
      (e9.state.comboboxState === P5.Open
        ? e9.actions.closeCombobox()
        : e9.actions.openCombobox(),
        A5());
    }),
    C11 = N([h15]),
    { isFocusVisible: x10, focusProps: v11 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: f21 }),
    { isHovered: c21, hoverProps: z4 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: p13 }),
    { pressed: D12, pressProps: K4 } = w({ disabled: p13 }),
    W5 = n2({
      open: m10 === P5.Open,
      active: D12 || m10 === P5.Open,
      disabled: p13,
      invalid: o20.invalid,
      value: o20.value,
      hover: c21,
      focus: x10,
    }),
    S10 = V(
      {
        ref: y10,
        id: h15,
        type: e5(T10, E13),
        tabIndex: -1,
        "aria-haspopup": "listbox",
        "aria-controls": u25 == null ? void 0 : u25.id,
        "aria-expanded": m10 === P5.Open,
        "aria-labelledby": C11,
        disabled: p13 || void 0,
        autoFocus: f21,
        onKeyDown: X5,
      },
      G6,
      v11,
      z4,
      K4,
    );
  return K()({
    ourProps: S10,
    theirProps: n17,
    slot: W5,
    defaultTag: _o,
    name: "Combobox.Button",
  });
}
var Do = "div";
var So = A.RenderStrategy | A.Static;
function Mo(T10, O5) {
  var M12, Ce5, ve3;
  let e9 = (0, import_react51.useId)(),
    {
      id: o20 = `headlessui-combobox-options-${e9}`,
      hold: E13 = false,
      anchor: R7,
      portal: y10 = false,
      modal: b14 = true,
      transition: h15 = false,
      ...p13
    } = T10,
    f21 = p7("Combobox.Options"),
    n17 = te2("Combobox.Options"),
    m10 = ye(R7);
  m10 && (y10 = true);
  let [a28, u25] = Re(m10),
    [A5, d14] = (0, import_react90.useState)(null),
    X5 = Te(),
    G6 = y(O5, m10 ? a28 : null, f21.actions.setOptionsElement, d14),
    [C11, x10, v11, c21, z4] = S3(f21, (_10) => [
      _10.comboboxState,
      _10.inputElement,
      _10.buttonElement,
      _10.optionsElement,
      _10.activationTrigger,
    ]),
    D12 = u13(x10 || v11),
    K4 = u13(c21),
    W5 = u17(),
    [S10, j11] = N2(
      h15,
      A5,
      W5 !== null ? (W5 & i10.Open) === i10.Open : C11 === P5.Open,
    );
  p5(S10, x10, f21.actions.closeCombobox);
  let l19 = n17.__demoMode ? false : b14 && C11 === P5.Open;
  f11(l19, K4);
  let k13 = n17.__demoMode ? false : b14 && C11 === P5.Open;
  y4(k13, {
    allowed: (0, import_react90.useCallback)(
      () => [x10, v11, c21],
      [x10, v11, c21],
    ),
  });
  let s20 = S3(f21, f21.selectors.didInputMove) ? false : S10;
  (n(() => {
    var _10;
    n17.optionsPropsRef.current.static =
      (_10 = T10.static) != null ? _10 : false;
  }, [n17.optionsPropsRef, T10.static]),
    n(() => {
      n17.optionsPropsRef.current.hold = E13;
    }, [n17.optionsPropsRef, E13]),
    F2(C11 === P5.Open, {
      container: c21,
      accept(_10) {
        return _10.getAttribute("role") === "option"
          ? NodeFilter.FILTER_REJECT
          : _10.hasAttribute("role")
            ? NodeFilter.FILTER_SKIP
            : NodeFilter.FILTER_ACCEPT;
      },
      walk(_10) {
        _10.setAttribute("role", "none");
      },
    }));
  let U3 = N([v11 == null ? void 0 : v11.id]),
    $6 = n2({ open: C11 === P5.Open, option: void 0 }),
    ne4 = o4(() => {
      f21.actions.setActivationTrigger(_5.Pointer);
    }),
    be3 = o4((_10) => {
      (_10.preventDefault(), f21.actions.setActivationTrigger(_5.Pointer));
    }),
    ee7 = V(m10 ? X5() : {}, {
      "aria-labelledby": U3,
      role: "listbox",
      "aria-multiselectable": n17.mode === k6.Multi ? true : void 0,
      id: o20,
      ref: G6,
      style: {
        ...p13.style,
        ...u25,
        "--input-width": w5(S10, x10, true).width,
        "--button-width": w5(S10, v11, true).width,
      },
      onWheel: z4 === _5.Pointer ? void 0 : ne4,
      onMouseDown: be3,
      ...x4(j11),
    }),
    q5 = S10 && C11 === P5.Closed && !T10.static,
    t14 = u16(q5, (M12 = n17.virtual) == null ? void 0 : M12.options),
    V6 = u16(q5, n17.value),
    P8 = (0, import_react90.useCallback)(
      (_10) => n17.compare(V6, _10),
      [n17.compare, V6],
    ),
    N4 = (0, import_react90.useMemo)(() => {
      if (!n17.virtual) return n17;
      if (t14 === void 0) throw new Error("Missing `options` in virtual mode");
      return t14 !== n17.virtual.options
        ? { ...n17, virtual: { ...n17.virtual, options: t14 } }
        : n17;
    }, [n17, t14, (Ce5 = n17.virtual) == null ? void 0 : Ce5.options]);
  n17.virtual &&
    Object.assign(p13, {
      children: import_react90.default.createElement(
        de2.Provider,
        { value: N4 },
        import_react90.default.createElement(Eo, { slot: $6 }, p13.children),
      ),
    });
  let g6 = K(),
    i16 = (0, import_react90.useMemo)(
      () => (n17.mode === k6.Multi ? n17 : { ...n17, isSelected: P8 }),
      [n17, P8],
    );
  return import_react90.default.createElement(
    te,
    { enabled: y10 ? T10.static || S10 : false, ownerDocument: D12 },
    import_react90.default.createElement(
      de2.Provider,
      { value: i16 },
      g6({
        ourProps: ee7,
        theirProps: {
          ...p13,
          children: import_react90.default.createElement(
            s12,
            { freeze: q5 },
            typeof p13.children == "function"
              ? (ve3 = p13.children) == null
                ? void 0
                : ve3.call(p13, $6)
              : p13.children,
          ),
        },
        slot: $6,
        defaultTag: Do,
        features: So,
        visible: s20,
        name: "Combobox.Options",
      }),
    ),
  );
}
var Lo = "div";
function Vo(T10, O5) {
  var l19, k13, Y4;
  let e9 = te2("Combobox.Option"),
    o20 = p7("Combobox.Option"),
    E13 = (0, import_react51.useId)(),
    {
      id: R7 = `headlessui-combobox-option-${E13}`,
      value: y10,
      disabled: b14 = (Y4 =
        (k13 = (l19 = e9.virtual) == null ? void 0 : l19.disabled) == null
          ? void 0
          : k13.call(l19, y10)) != null
        ? Y4
        : false,
      order: h15 = null,
      ...p13
    } = T10,
    [f21] = S3(o20, (s20) => [s20.inputElement]),
    n17 = v6(f21),
    m10 = S3(
      o20,
      (0, import_react90.useCallback)(
        (s20) => o20.selectors.isActive(s20, y10, R7),
        [y10, R7],
      ),
    ),
    a28 = e9.isSelected(y10),
    u25 = (0, import_react90.useRef)(null),
    A5 = s3({ disabled: b14, value: y10, domRef: u25, order: h15 }),
    d14 = (0, import_react90.useContext)(Le),
    X5 = y(O5, u25, d14 ? d14.measureElement : null),
    G6 = o4(() => {
      (o20.actions.setIsTyping(false), o20.actions.onChange(y10));
    });
  n(() => o20.actions.registerOption(R7, A5), [A5, R7]);
  let C11 = S3(
    o20,
    (0, import_react90.useCallback)(
      (s20) => o20.selectors.shouldScrollIntoView(s20, y10, R7),
      [y10, R7],
    ),
  );
  n(() => {
    if (C11)
      return o2().requestAnimationFrame(() => {
        var s20, U3;
        (U3 = (s20 = u25.current) == null ? void 0 : s20.scrollIntoView) ==
          null || U3.call(s20, { block: "nearest" });
      });
  }, [C11, u25]);
  let x10 = o4((s20) => {
      (s20.preventDefault(),
        s20.button === g3.Left &&
          (b14 ||
            (G6(),
            n11() || requestAnimationFrame(() => n17()),
            e9.mode === k6.Single && o20.actions.closeCombobox())));
    }),
    v11 = o4(() => {
      if (b14) return o20.actions.goToOption({ focus: c12.Nothing });
      let s20 = e9.calculateIndex(y10);
      o20.actions.goToOption({ focus: c12.Specific, idx: s20 });
    }),
    c21 = u15(),
    z4 = o4((s20) => c21.update(s20)),
    D12 = o4((s20) => {
      if (
        !c21.wasMoved(s20) ||
        b14 ||
        (m10 && o20.state.activationTrigger === _5.Pointer)
      )
        return;
      let U3 = e9.calculateIndex(y10);
      o20.actions.goToOption({ focus: c12.Specific, idx: U3 }, _5.Pointer);
    }),
    K4 = o4((s20) => {
      c21.wasMoved(s20) &&
        (b14 ||
          (m10 &&
            (e9.optionsPropsRef.current.hold ||
              (o20.state.activationTrigger === _5.Pointer &&
                o20.actions.goToOption({ focus: c12.Nothing })))));
    }),
    W5 = n2({ active: m10, focus: m10, selected: a28, disabled: b14 }),
    S10 = {
      id: R7,
      ref: X5,
      role: "option",
      tabIndex: b14 === true ? void 0 : -1,
      "aria-disabled": b14 === true ? true : void 0,
      "aria-selected": a28,
      disabled: void 0,
      onMouseDown: x10,
      onFocus: v11,
      onPointerEnter: z4,
      onMouseEnter: z4,
      onPointerMove: D12,
      onMouseMove: D12,
      onPointerLeave: K4,
      onMouseLeave: K4,
    };
  return K()({
    ourProps: S10,
    theirProps: p13,
    slot: W5,
    defaultTag: Lo,
    name: "Combobox.Option",
  });
}
var wo = Y(Ao);
var Bo = Y(Fo);
var ko = Y(Ro);
var No = Z;
var Uo = Y(Mo);
var Ho = Y(Vo);
var Ht = Object.assign(wo, {
  Input: ko,
  Button: Bo,
  Label: No,
  Options: Uo,
  Option: Ho,
});

// node_modules/@headlessui/react/dist/components/data-interactive/data-interactive.js
var import_react91 = __toESM(require_react(), 1);
var E10 = import_react91.Fragment;
function d8(t14, r22) {
  let { ...a28 } = t14,
    e9 = false,
    { isFocusVisible: o20, focusProps: n17 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f(),
    { isHovered: p13, hoverProps: s20 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e9 }),
    { pressed: i16, pressProps: T10 } = w({ disabled: e9 }),
    l19 = V({ ref: r22 }, n17, s20, T10),
    m10 = n2({ hover: p13, focus: o20, active: i16 });
  return K()({
    ourProps: l19,
    theirProps: a28,
    slot: m10,
    defaultTag: E10,
    name: "DataInteractive",
  });
}
var b8 = Y(d8);

// node_modules/@headlessui/react/dist/components/dialog/dialog.js
var import_react98 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-escape.js
function a20(
  o20,
  r22 = typeof document != "undefined" ? document.defaultView : null,
  t14,
) {
  let n17 = I3(o20, "escape");
  E7(r22, "keydown", (e9) => {
    n17 && (e9.defaultPrevented || (e9.key === o8.Escape && t14(e9)));
  });
}

// node_modules/@headlessui/react/dist/hooks/use-is-touch-device.js
var import_react92 = __toESM(require_react(), 1);
function f16() {
  var t14;
  let [e9] = (0, import_react92.useState)(() =>
      typeof window != "undefined" && typeof window.matchMedia == "function"
        ? window.matchMedia("(pointer: coarse)")
        : null,
    ),
    [o20, c21] = (0, import_react92.useState)(
      (t14 = e9 == null ? void 0 : e9.matches) != null ? t14 : false,
    );
  return (
    n(() => {
      if (!e9) return;
      function n17(r22) {
        c21(r22.matches);
      }
      return (
        e9.addEventListener("change", n17),
        () => e9.removeEventListener("change", n17)
      );
    }, [e9]),
    o20
  );
}

// node_modules/@headlessui/react/dist/hooks/use-root-containers.js
var import_react93 = __toESM(require_react(), 1);
function S8({
  defaultContainers: l19 = [],
  portals: n17,
  mainTreeNode: o20,
} = {}) {
  let c21 = o4(() => {
    var r22, u25;
    let i16 = l(o20),
      t14 = [];
    for (let e9 of l19)
      e9 !== null &&
        (t5(e9)
          ? t14.push(e9)
          : "current" in e9 && t5(e9.current) && t14.push(e9.current));
    if (n17 != null && n17.current) for (let e9 of n17.current) t14.push(e9);
    for (let e9 of (r22 =
      i16 == null ? void 0 : i16.querySelectorAll("html > *, body > *")) != null
      ? r22
      : [])
      e9 !== document.body &&
        e9 !== document.head &&
        t5(e9) &&
        e9.id !== "headlessui-portal-root" &&
        ((o20 &&
          (e9.contains(o20) ||
            e9.contains(
              (u25 = o20 == null ? void 0 : o20.getRootNode()) == null
                ? void 0
                : u25.host,
            ))) ||
          t14.some((E13) => e9.contains(E13)) ||
          t14.push(e9));
    return t14;
  });
  return {
    resolveContainers: c21,
    contains: o4((i16) => c21().some((t14) => t14.contains(i16))),
  };
}
var d9 = (0, import_react93.createContext)(null);
function j9({ children: l19, node: n17 }) {
  let [o20, c21] = (0, import_react93.useState)(null),
    i16 = x6(n17 != null ? n17 : o20);
  return import_react93.default.createElement(
    d9.Provider,
    { value: i16 },
    l19,
    i16 === null &&
      import_react93.default.createElement(f4, {
        features: s5.Hidden,
        ref: (t14) => {
          var r22, u25;
          if (t14) {
            for (let e9 of (u25 =
              (r22 = l(t14)) == null
                ? void 0
                : r22.querySelectorAll("html > *, body > *")) != null
              ? u25
              : [])
              if (
                e9 !== document.body &&
                e9 !== document.head &&
                t5(e9) &&
                e9 != null &&
                e9.contains(t14)
              ) {
                c21(e9);
                break;
              }
          }
        },
      }),
  );
}
function x6(l19 = null) {
  var n17;
  return (n17 = (0, import_react93.useContext)(d9)) != null ? n17 : l19;
}

// node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
var t11 = __toESM(require_react(), 1);
function s15() {
  let r22 = typeof document == "undefined";
  return "useSyncExternalStore" in t11
    ? ((o20) => o20.useSyncExternalStore)(t11)(
        () => () => {},
        () => false,
        () => !r22,
      )
    : false;
}
function l15() {
  let r22 = s15(),
    [e9, n17] = t11.useState(s.isHandoffComplete);
  return (
    e9 && s.isHandoffComplete === false && n17(false),
    t11.useEffect(() => {
      e9 !== true && n17(true);
    }, [e9]),
    t11.useEffect(() => s.handoff(), []),
    r22 ? false : e9
  );
}

// node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
var import_react96 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-is-mounted.js
var import_react94 = __toESM(require_react(), 1);
function f17() {
  let e9 = (0, import_react94.useRef)(false);
  return (
    n(
      () => (
        (e9.current = true),
        () => {
          e9.current = false;
        }
      ),
      [],
    ),
    e9
  );
}

// node_modules/@headlessui/react/dist/hooks/use-tab-direction.js
var import_react95 = __toESM(require_react(), 1);
var a21 = ((r22) => (
  (r22[(r22.Forwards = 0)] = "Forwards"),
  (r22[(r22.Backwards = 1)] = "Backwards"),
  r22
))(a21 || {});
function u21() {
  let e9 = (0, import_react95.useRef)(0);
  return (
    s10(
      true,
      "keydown",
      (r22) => {
        r22.key === "Tab" && (e9.current = r22.shiftKey ? 1 : 0);
      },
      true,
    ),
    e9
  );
}

// node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
function x7(o20) {
  if (!o20) return /* @__PURE__ */ new Set();
  if (typeof o20 == "function") return new Set(o20());
  let t14 = /* @__PURE__ */ new Set();
  for (let e9 of o20.current) t5(e9.current) && t14.add(e9.current);
  return t14;
}
var $3 = "div";
var G4 = ((n17) => (
  (n17[(n17.None = 0)] = "None"),
  (n17[(n17.InitialFocus = 1)] = "InitialFocus"),
  (n17[(n17.TabLock = 2)] = "TabLock"),
  (n17[(n17.FocusLock = 4)] = "FocusLock"),
  (n17[(n17.RestoreFocus = 8)] = "RestoreFocus"),
  (n17[(n17.AutoFocus = 16)] = "AutoFocus"),
  n17
))(G4 || {});
function w8(o20, t14) {
  let e9 = (0, import_react96.useRef)(null),
    r22 = y(e9, t14),
    {
      initialFocus: u25,
      initialFocusFallback: a28,
      containers: n17,
      features: s20 = 15,
      ...f21
    } = o20;
  l15() || (s20 = 0);
  let l19 = u13(e9.current);
  re(s20, { ownerDocument: l19 });
  let T10 = ne(s20, {
    ownerDocument: l19,
    container: e9,
    initialFocus: u25,
    initialFocusFallback: a28,
  });
  oe2(s20, {
    ownerDocument: l19,
    container: e9,
    containers: n17,
    previousActiveElement: T10,
  });
  let g6 = u21(),
    A5 = o4((c21) => {
      if (!n5(e9.current)) return;
      let E13 = e9.current;
      ((V6) => V6())(() => {
        u(g6.current, {
          [a21.Forwards]: () => {
            v5(E13, T4.First, { skipElements: [c21.relatedTarget, a28] });
          },
          [a21.Backwards]: () => {
            v5(E13, T4.Last, { skipElements: [c21.relatedTarget, a28] });
          },
        });
      });
    }),
    v11 = I3(!!(s20 & 2), "focus-trap#tab-lock"),
    N4 = p(),
    b14 = (0, import_react96.useRef)(false),
    k13 = {
      ref: r22,
      onKeyDown(c21) {
        c21.key == "Tab" &&
          ((b14.current = true),
          N4.requestAnimationFrame(() => {
            b14.current = false;
          }));
      },
      onBlur(c21) {
        if (!(s20 & 4)) return;
        let E13 = x7(n17);
        n5(e9.current) && E13.add(e9.current);
        let L7 = c21.relatedTarget;
        i4(L7) &&
          L7.dataset.headlessuiFocusGuard !== "true" &&
          (I7(E13, L7) ||
            (b14.current
              ? v5(
                  e9.current,
                  u(g6.current, {
                    [a21.Forwards]: () => T4.Next,
                    [a21.Backwards]: () => T4.Previous,
                  }) | T4.WrapAround,
                  { relativeTo: c21.target },
                )
              : i4(c21.target) && w6(c21.target)));
      },
    },
    B2 = K();
  return import_react96.default.createElement(
    import_react96.default.Fragment,
    null,
    v11 &&
      import_react96.default.createElement(f4, {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": true,
        onFocus: A5,
        features: s5.Focusable,
      }),
    B2({ ourProps: k13, theirProps: f21, defaultTag: $3, name: "FocusTrap" }),
    v11 &&
      import_react96.default.createElement(f4, {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": true,
        onFocus: A5,
        features: s5.Focusable,
      }),
  );
}
var ee2 = Y(w8);
var ge2 = Object.assign(ee2, { features: G4 });
function te3(o20 = true) {
  let t14 = (0, import_react96.useRef)(n13.slice());
  return (
    m7(
      ([e9], [r22]) => {
        (r22 === true &&
          e9 === false &&
          t(() => {
            t14.current.splice(0);
          }),
          r22 === false && e9 === true && (t14.current = n13.slice()));
      },
      [o20, n13, t14],
    ),
    o4(() => {
      var e9;
      return (e9 = t14.current.find((r22) => r22 != null && r22.isConnected)) !=
        null
        ? e9
        : null;
    })
  );
}
function re(o20, { ownerDocument: t14 }) {
  let e9 = !!(o20 & 8),
    r22 = te3(e9);
  (m7(() => {
    e9 || (d2(t14 == null ? void 0 : t14.body) && w6(r22()));
  }, [e9]),
    c13(() => {
      e9 && w6(r22());
    }));
}
function ne(
  o20,
  {
    ownerDocument: t14,
    container: e9,
    initialFocus: r22,
    initialFocusFallback: u25,
  },
) {
  let a28 = (0, import_react96.useRef)(null),
    n17 = I3(!!(o20 & 1), "focus-trap#initial-focus"),
    s20 = f17();
  return (
    m7(() => {
      if (o20 === 0) return;
      if (!n17) {
        u25 != null && u25.current && w6(u25.current);
        return;
      }
      let f21 = e9.current;
      f21 &&
        t(() => {
          if (!s20.current) return;
          let l19 = t14 == null ? void 0 : t14.activeElement;
          if (r22 != null && r22.current) {
            if ((r22 == null ? void 0 : r22.current) === l19) {
              a28.current = l19;
              return;
            }
          } else if (f21.contains(l19)) {
            a28.current = l19;
            return;
          }
          if (r22 != null && r22.current) w6(r22.current);
          else {
            if (o20 & 16) {
              if (v5(f21, T4.First | T4.AutoFocus) !== A2.Error) return;
            } else if (v5(f21, T4.First) !== A2.Error) return;
            if (
              u25 != null &&
              u25.current &&
              (w6(u25.current),
              (t14 == null ? void 0 : t14.activeElement) === u25.current)
            )
              return;
            console.warn(
              "There are no focusable elements inside the <FocusTrap />",
            );
          }
          a28.current = t14 == null ? void 0 : t14.activeElement;
        });
    }, [u25, n17, o20]),
    a28
  );
}
function oe2(
  o20,
  {
    ownerDocument: t14,
    container: e9,
    containers: r22,
    previousActiveElement: u25,
  },
) {
  let a28 = f17(),
    n17 = !!(o20 & 4);
  E7(
    t14 == null ? void 0 : t14.defaultView,
    "focus",
    (s20) => {
      if (!n17 || !a28.current) return;
      let f21 = x7(r22);
      n5(e9.current) && f21.add(e9.current);
      let l19 = u25.current;
      if (!l19) return;
      let T10 = s20.target;
      n5(T10)
        ? I7(f21, T10)
          ? ((u25.current = T10), w6(T10))
          : (s20.preventDefault(), s20.stopPropagation(), w6(l19))
        : w6(u25.current);
    },
    true,
  );
}
function I7(o20, t14) {
  for (let e9 of o20) if (e9.contains(t14)) return true;
  return false;
}

// node_modules/@headlessui/react/dist/components/transition/transition.js
var import_react97 = __toESM(require_react(), 1);
function ue2(e9) {
  var t14;
  return (
    !!(
      e9.enter ||
      e9.enterFrom ||
      e9.enterTo ||
      e9.leave ||
      e9.leaveFrom ||
      e9.leaveTo
    ) ||
    !b((t14 = e9.as) != null ? t14 : de3) ||
    import_react97.default.Children.count(e9.children) === 1
  );
}
var V3 = (0, import_react97.createContext)(null);
V3.displayName = "TransitionContext";
var De = ((n17) => ((n17.Visible = "visible"), (n17.Hidden = "hidden"), n17))(
  De || {},
);
function He() {
  let e9 = (0, import_react97.useContext)(V3);
  if (e9 === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
    );
  return e9;
}
function Ae3() {
  let e9 = (0, import_react97.useContext)(w9);
  if (e9 === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
    );
  return e9;
}
var w9 = (0, import_react97.createContext)(null);
w9.displayName = "NestingContext";
function M7(e9) {
  return "children" in e9
    ? M7(e9.children)
    : e9.current
        .filter(({ el: t14 }) => t14.current !== null)
        .filter(({ state: t14 }) => t14 === "visible").length > 0;
}
function Te2(e9, t14) {
  let n17 = s3(e9),
    l19 = (0, import_react97.useRef)([]),
    S10 = f17(),
    R7 = p(),
    d14 = o4((o20, i16 = C.Hidden) => {
      let a28 = l19.current.findIndex(({ el: s20 }) => s20 === o20);
      a28 !== -1 &&
        (u(i16, {
          [C.Unmount]() {
            l19.current.splice(a28, 1);
          },
          [C.Hidden]() {
            l19.current[a28].state = "hidden";
          },
        }),
        R7.microTask(() => {
          var s20;
          !M7(l19) &&
            S10.current &&
            ((s20 = n17.current) == null || s20.call(n17));
        }));
    }),
    y10 = o4((o20) => {
      let i16 = l19.current.find(({ el: a28 }) => a28 === o20);
      return (
        i16
          ? i16.state !== "visible" && (i16.state = "visible")
          : l19.current.push({ el: o20, state: "visible" }),
        () => d14(o20, C.Unmount)
      );
    }),
    C11 = (0, import_react97.useRef)([]),
    p13 = (0, import_react97.useRef)(Promise.resolve()),
    h15 = (0, import_react97.useRef)({ enter: [], leave: [] }),
    g6 = o4((o20, i16, a28) => {
      (C11.current.splice(0),
        t14 &&
          (t14.chains.current[i16] = t14.chains.current[i16].filter(
            ([s20]) => s20 !== o20,
          )),
        t14 == null ||
          t14.chains.current[i16].push([
            o20,
            new Promise((s20) => {
              C11.current.push(s20);
            }),
          ]),
        t14 == null ||
          t14.chains.current[i16].push([
            o20,
            new Promise((s20) => {
              Promise.all(h15.current[i16].map(([r22, f21]) => f21)).then(() =>
                s20(),
              );
            }),
          ]),
        i16 === "enter"
          ? (p13.current = p13.current
              .then(() => (t14 == null ? void 0 : t14.wait.current))
              .then(() => a28(i16)))
          : a28(i16));
    }),
    v11 = o4((o20, i16, a28) => {
      Promise.all(h15.current[i16].splice(0).map(([s20, r22]) => r22))
        .then(() => {
          var s20;
          (s20 = C11.current.shift()) == null || s20();
        })
        .then(() => a28(i16));
    });
  return (0, import_react97.useMemo)(
    () => ({
      children: l19,
      register: y10,
      unregister: d14,
      onStart: g6,
      onStop: v11,
      wait: p13,
      chains: h15,
    }),
    [y10, d14, l19, g6, v11, h15, p13],
  );
}
var de3 = import_react97.Fragment;
var fe = A.RenderStrategy;
function Fe2(e9, t14) {
  var ee7, te6;
  let {
      transition: n17 = true,
      beforeEnter: l19,
      afterEnter: S10,
      beforeLeave: R7,
      afterLeave: d14,
      enter: y10,
      enterFrom: C11,
      enterTo: p13,
      entered: h15,
      leave: g6,
      leaveFrom: v11,
      leaveTo: o20,
      ...i16
    } = e9,
    [a28, s20] = (0, import_react97.useState)(null),
    r22 = (0, import_react97.useRef)(null),
    f21 = ue2(e9),
    U3 = y(...(f21 ? [r22, t14, s20] : t14 === null ? [] : [t14])),
    H9 = (ee7 = i16.unmount) == null || ee7 ? C.Unmount : C.Hidden,
    { show: u25, appear: z4, initial: K4 } = He(),
    [m10, j11] = (0, import_react97.useState)(u25 ? "visible" : "hidden"),
    Q7 = Ae3(),
    { register: A5, unregister: F7 } = Q7;
  (n(() => A5(r22), [A5, r22]),
    n(() => {
      if (H9 === C.Hidden && r22.current) {
        if (u25 && m10 !== "visible") {
          j11("visible");
          return;
        }
        return u(m10, {
          ["hidden"]: () => F7(r22),
          ["visible"]: () => A5(r22),
        });
      }
    }, [m10, r22, A5, F7, u25, H9]));
  let G6 = l15();
  n(() => {
    if (f21 && G6 && m10 === "visible" && r22.current === null)
      throw new Error(
        "Did you forget to passthrough the `ref` to the actual DOM node?",
      );
  }, [r22, m10, G6, f21]);
  let ce3 = K4 && !z4,
    Y4 = z4 && u25 && K4,
    B2 = (0, import_react97.useRef)(false),
    I10 = Te2(() => {
      B2.current || (j11("hidden"), F7(r22));
    }, Q7),
    Z4 = o4((W5) => {
      B2.current = true;
      let L7 = W5 ? "enter" : "leave";
      I10.onStart(r22, L7, (_10) => {
        _10 === "enter"
          ? l19 == null || l19()
          : _10 === "leave" && (R7 == null || R7());
      });
    }),
    $6 = o4((W5) => {
      let L7 = W5 ? "enter" : "leave";
      ((B2.current = false),
        I10.onStop(r22, L7, (_10) => {
          _10 === "enter"
            ? S10 == null || S10()
            : _10 === "leave" && (d14 == null || d14());
        }),
        L7 === "leave" && !M7(I10) && (j11("hidden"), F7(r22)));
    });
  (0, import_react97.useEffect)(() => {
    (f21 && n17) || (Z4(u25), $6(u25));
  }, [u25, f21, n17]);
  let pe4 = /* @__PURE__ */ (() => !(!n17 || !f21 || !G6 || ce3))(),
    [, T10] = N2(pe4, a28, u25, { start: Z4, end: $6 }),
    Ce5 = m2({
      ref: U3,
      className:
        ((te6 = t4(
          i16.className,
          Y4 && y10,
          Y4 && C11,
          T10.enter && y10,
          T10.enter && T10.closed && C11,
          T10.enter && !T10.closed && p13,
          T10.leave && g6,
          T10.leave && !T10.closed && v11,
          T10.leave && T10.closed && o20,
          !T10.transition && u25 && h15,
        )) == null
          ? void 0
          : te6.trim()) || void 0,
      ...x4(T10),
    }),
    N4 = 0;
  (m10 === "visible" && (N4 |= i10.Open),
    m10 === "hidden" && (N4 |= i10.Closed),
    u25 && m10 === "hidden" && (N4 |= i10.Opening),
    !u25 && m10 === "visible" && (N4 |= i10.Closing));
  let he3 = K();
  return import_react97.default.createElement(
    w9.Provider,
    { value: I10 },
    import_react97.default.createElement(
      c11,
      { value: N4 },
      he3({
        ourProps: Ce5,
        theirProps: i16,
        defaultTag: de3,
        features: fe,
        visible: m10 === "visible",
        name: "Transition.Child",
      }),
    ),
  );
}
function Ie(e9, t14) {
  let { show: n17, appear: l19 = false, unmount: S10 = true, ...R7 } = e9,
    d14 = (0, import_react97.useRef)(null),
    y10 = ue2(e9),
    C11 = y(...(y10 ? [d14, t14] : t14 === null ? [] : [t14]));
  l15();
  let p13 = u17();
  if (
    (n17 === void 0 && p13 !== null && (n17 = (p13 & i10.Open) === i10.Open),
    n17 === void 0)
  )
    throw new Error(
      "A <Transition /> is used but it is missing a `show={true | false}` prop.",
    );
  let [h15, g6] = (0, import_react97.useState)(n17 ? "visible" : "hidden"),
    v11 = Te2(() => {
      n17 || g6("hidden");
    }),
    [o20, i16] = (0, import_react97.useState)(true),
    a28 = (0, import_react97.useRef)([n17]);
  n(() => {
    o20 !== false &&
      a28.current[a28.current.length - 1] !== n17 &&
      (a28.current.push(n17), i16(false));
  }, [a28, n17]);
  let s20 = (0, import_react97.useMemo)(
    () => ({ show: n17, appear: l19, initial: o20 }),
    [n17, l19, o20],
  );
  n(() => {
    n17 ? g6("visible") : !M7(v11) && d14.current !== null && g6("hidden");
  }, [n17, v11]);
  let r22 = { unmount: S10 },
    f21 = o4(() => {
      var u25;
      (o20 && i16(false), (u25 = e9.beforeEnter) == null || u25.call(e9));
    }),
    U3 = o4(() => {
      var u25;
      (o20 && i16(false), (u25 = e9.beforeLeave) == null || u25.call(e9));
    }),
    H9 = K();
  return import_react97.default.createElement(
    w9.Provider,
    { value: v11 },
    import_react97.default.createElement(
      V3.Provider,
      { value: s20 },
      H9({
        ourProps: {
          ...r22,
          as: import_react97.Fragment,
          children: import_react97.default.createElement(me2, {
            ref: C11,
            ...r22,
            ...R7,
            beforeEnter: f21,
            beforeLeave: U3,
          }),
        },
        theirProps: {},
        defaultTag: import_react97.Fragment,
        features: fe,
        visible: h15 === "visible",
        name: "Transition",
      }),
    ),
  );
}
function Le2(e9, t14) {
  let n17 = (0, import_react97.useContext)(V3) !== null,
    l19 = u17() !== null;
  return import_react97.default.createElement(
    import_react97.default.Fragment,
    null,
    !n17 && l19
      ? import_react97.default.createElement(X2, { ref: t14, ...e9 })
      : import_react97.default.createElement(me2, { ref: t14, ...e9 }),
  );
}
var X2 = Y(Ie);
var me2 = Y(Fe2);
var Oe = Y(Le2);
var Ke2 = Object.assign(X2, { Child: Oe, Root: X2 });

// node_modules/@headlessui/react/dist/components/dialog/dialog.js
var we = ((o20) => (
  (o20[(o20.Open = 0)] = "Open"),
  (o20[(o20.Closed = 1)] = "Closed"),
  o20
))(we || {});
var Be = ((t14) => ((t14[(t14.SetTitleId = 0)] = "SetTitleId"), t14))(Be || {});
var Ue = {
  [0](e9, t14) {
    return e9.titleId === t14.id ? e9 : { ...e9, titleId: t14.id };
  },
};
var w10 = (0, import_react98.createContext)(null);
w10.displayName = "DialogContext";
function O4(e9) {
  let t14 = (0, import_react98.useContext)(w10);
  if (t14 === null) {
    let o20 = new Error(`<${e9} /> is missing a parent <Dialog /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(o20, O4), o20);
  }
  return t14;
}
function He2(e9, t14) {
  return u(t14.type, Ue, e9, t14);
}
var z = Y(function (t14, o20) {
  let a28 = (0, import_react51.useId)(),
    {
      id: n17 = `headlessui-dialog-${a28}`,
      open: i16,
      onClose: p13,
      initialFocus: d14,
      role: s20 = "dialog",
      autoFocus: f21 = true,
      __demoMode: u25 = false,
      unmount: y10 = false,
      ...S10
    } = t14,
    R7 = (0, import_react98.useRef)(false);
  s20 = (function () {
    return s20 === "dialog" || s20 === "alertdialog"
      ? s20
      : (R7.current ||
          ((R7.current = true),
          console.warn(
            `Invalid role [${s20}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`,
          )),
        "dialog");
  })();
  let g6 = u17();
  i16 === void 0 && g6 !== null && (i16 = (g6 & i10.Open) === i10.Open);
  let T10 = (0, import_react98.useRef)(null),
    I10 = y(T10, o20),
    F7 = u13(T10.current),
    c21 = i16 ? 0 : 1,
    [b14, Q7] = (0, import_react98.useReducer)(He2, {
      titleId: null,
      descriptionId: null,
      panelRef: (0, import_react98.createRef)(),
    }),
    m10 = o4(() => p13(false)),
    B2 = o4((r22) => Q7({ type: 0, id: r22 })),
    D12 = l15() ? c21 === 0 : false,
    [Z4, ee7] = ee(),
    te6 = {
      get current() {
        var r22;
        return (r22 = b14.panelRef.current) != null ? r22 : T10.current;
      },
    },
    v11 = x6(),
    { resolveContainers: M12 } = S8({
      mainTreeNode: v11,
      portals: Z4,
      defaultContainers: [te6],
    }),
    U3 = g6 !== null ? (g6 & i10.Closing) === i10.Closing : false;
  y4(u25 || U3 ? false : D12, {
    allowed: o4(() => {
      var r22, W5;
      return [
        (W5 =
          (r22 = T10.current) == null
            ? void 0
            : r22.closest("[data-headlessui-portal]")) != null
          ? W5
          : null,
      ];
    }),
    disallowed: o4(() => {
      var r22;
      return [
        (r22 =
          v11 == null
            ? void 0
            : v11.closest("body > *:not(#headlessui-portal-root)")) != null
          ? r22
          : null,
      ];
    }),
  });
  let P8 = x2.get(null);
  n(() => {
    if (D12) return (P8.actions.push(n17), () => P8.actions.pop(n17));
  }, [P8, n17, D12]);
  let H9 = S3(
    P8,
    (0, import_react98.useCallback)(
      (r22) => P8.selectors.isTop(r22, n17),
      [P8, n17],
    ),
  );
  (k5(H9, M12, (r22) => {
    (r22.preventDefault(), m10());
  }),
    a20(H9, F7 == null ? void 0 : F7.defaultView, (r22) => {
      (r22.preventDefault(),
        r22.stopPropagation(),
        document.activeElement &&
          "blur" in document.activeElement &&
          typeof document.activeElement.blur == "function" &&
          document.activeElement.blur(),
        m10());
    }),
    f11(u25 || U3 ? false : D12, F7, M12),
    p5(D12, T10, m10));
  let [oe6, ne4] = H3(),
    re4 = (0, import_react98.useMemo)(
      () => [
        { dialogState: c21, close: m10, setTitleId: B2, unmount: y10 },
        b14,
      ],
      [c21, m10, B2, y10, b14],
    ),
    N4 = n2({ open: c21 === 0 }),
    le = {
      ref: I10,
      id: n17,
      role: s20,
      tabIndex: -1,
      "aria-modal": u25 ? void 0 : c21 === 0 ? true : void 0,
      "aria-labelledby": b14.titleId,
      "aria-describedby": oe6,
      unmount: y10,
    },
    ae5 = !f16(),
    E13 = G4.None;
  D12 &&
    !u25 &&
    ((E13 |= G4.RestoreFocus),
    (E13 |= G4.TabLock),
    f21 && (E13 |= G4.AutoFocus),
    ae5 && (E13 |= G4.InitialFocus));
  let ie4 = K();
  return import_react98.default.createElement(
    s13,
    null,
    import_react98.default.createElement(
      l14,
      { force: true },
      import_react98.default.createElement(
        te,
        null,
        import_react98.default.createElement(
          w10.Provider,
          { value: re4 },
          import_react98.default.createElement(
            X,
            { target: T10 },
            import_react98.default.createElement(
              l14,
              { force: false },
              import_react98.default.createElement(
                ne4,
                { slot: N4 },
                import_react98.default.createElement(
                  ee7,
                  null,
                  import_react98.default.createElement(
                    ge2,
                    {
                      initialFocus: d14,
                      initialFocusFallback: T10,
                      containers: M12,
                      features: E13,
                    },
                    import_react98.default.createElement(
                      C5,
                      { value: m10 },
                      ie4({
                        ourProps: le,
                        theirProps: S10,
                        slot: N4,
                        defaultTag: Ne,
                        features: We,
                        visible: c21 === 0,
                        name: "Dialog",
                      }),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
});
var Ne = "div";
var We = A.RenderStrategy | A.Static;
function $e(e9, t14) {
  let { transition: o20 = false, open: a28, ...n17 } = e9,
    i16 = u17(),
    p13 = e9.hasOwnProperty("open") || i16 !== null,
    d14 = e9.hasOwnProperty("onClose");
  if (!p13 && !d14)
    throw new Error(
      "You have to provide an `open` and an `onClose` prop to the `Dialog` component.",
    );
  if (!p13)
    throw new Error(
      "You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.",
    );
  if (!d14)
    throw new Error(
      "You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.",
    );
  if (!i16 && typeof e9.open != "boolean")
    throw new Error(
      `You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e9.open}`,
    );
  if (typeof e9.onClose != "function")
    throw new Error(
      `You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e9.onClose}`,
    );
  return (a28 !== void 0 || o20) && !n17.static
    ? import_react98.default.createElement(
        j9,
        null,
        import_react98.default.createElement(
          Ke2,
          { show: a28, transition: o20, unmount: n17.unmount },
          import_react98.default.createElement(z, { ref: t14, ...n17 }),
        ),
      )
    : import_react98.default.createElement(
        j9,
        null,
        import_react98.default.createElement(z, {
          ref: t14,
          open: a28,
          ...n17,
        }),
      );
}
var je = "div";
function Ye(e9, t14) {
  let o20 = (0, import_react51.useId)(),
    {
      id: a28 = `headlessui-dialog-panel-${o20}`,
      transition: n17 = false,
      ...i16
    } = e9,
    [{ dialogState: p13, unmount: d14 }, s20] = O4("Dialog.Panel"),
    f21 = y(t14, s20.panelRef),
    u25 = n2({ open: p13 === 0 }),
    y10 = o4((I10) => {
      I10.stopPropagation();
    }),
    S10 = { ref: f21, id: a28, onClick: y10 },
    R7 = n17 ? Oe : import_react98.Fragment,
    g6 = n17 ? { unmount: d14 } : {},
    T10 = K();
  return import_react98.default.createElement(
    R7,
    { ...g6 },
    T10({
      ourProps: S10,
      theirProps: i16,
      slot: u25,
      defaultTag: je,
      name: "Dialog.Panel",
    }),
  );
}
var Je = "div";
function Ke3(e9, t14) {
  let { transition: o20 = false, ...a28 } = e9,
    [{ dialogState: n17, unmount: i16 }] = O4("Dialog.Backdrop"),
    p13 = n2({ open: n17 === 0 }),
    d14 = { ref: t14, "aria-hidden": true },
    s20 = o20 ? Oe : import_react98.Fragment,
    f21 = o20 ? { unmount: i16 } : {},
    u25 = K();
  return import_react98.default.createElement(
    s20,
    { ...f21 },
    u25({
      ourProps: d14,
      theirProps: a28,
      slot: p13,
      defaultTag: Je,
      name: "Dialog.Backdrop",
    }),
  );
}
var Xe = "h2";
function Ve(e9, t14) {
  let o20 = (0, import_react51.useId)(),
    { id: a28 = `headlessui-dialog-title-${o20}`, ...n17 } = e9,
    [{ dialogState: i16, setTitleId: p13 }] = O4("Dialog.Title"),
    d14 = y(t14);
  (0, import_react98.useEffect)(() => (p13(a28), () => p13(null)), [a28, p13]);
  let s20 = n2({ open: i16 === 0 }),
    f21 = { ref: d14, id: a28 };
  return K()({
    ourProps: f21,
    theirProps: n17,
    slot: s20,
    defaultTag: Xe,
    name: "Dialog.Title",
  });
}
var qe = Y($e);
var ze = Y(Ye);
var Lt = Y(Ke3);
var Qe = Y(Ve);
var xt = M2;
var ht = Object.assign(qe, { Panel: ze, Title: Qe, Description: M2 });

// node_modules/@headlessui/react/dist/components/disclosure/disclosure.js
var import_react100 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/start-transition.js
var import_react99 = __toESM(require_react(), 1);
var t12;
var a22 =
  (t12 = import_react99.default.startTransition) != null
    ? t12
    : function (i16) {
        i16();
      };

// node_modules/@headlessui/react/dist/components/disclosure/disclosure.js
var me3 = ((l19) => (
  (l19[(l19.Open = 0)] = "Open"),
  (l19[(l19.Closed = 1)] = "Closed"),
  l19
))(me3 || {});
var fe3 = ((n17) => (
  (n17[(n17.ToggleDisclosure = 0)] = "ToggleDisclosure"),
  (n17[(n17.CloseDisclosure = 1)] = "CloseDisclosure"),
  (n17[(n17.SetButtonId = 2)] = "SetButtonId"),
  (n17[(n17.SetPanelId = 3)] = "SetPanelId"),
  (n17[(n17.SetButtonElement = 4)] = "SetButtonElement"),
  (n17[(n17.SetPanelElement = 5)] = "SetPanelElement"),
  n17
))(fe3 || {});
var De2 = {
  [0]: (e9) => ({
    ...e9,
    disclosureState: u(e9.disclosureState, { [0]: 1, [1]: 0 }),
  }),
  [1]: (e9) => (e9.disclosureState === 1 ? e9 : { ...e9, disclosureState: 1 }),
  [2](e9, t14) {
    return e9.buttonId === t14.buttonId
      ? e9
      : { ...e9, buttonId: t14.buttonId };
  },
  [3](e9, t14) {
    return e9.panelId === t14.panelId ? e9 : { ...e9, panelId: t14.panelId };
  },
  [4](e9, t14) {
    return e9.buttonElement === t14.element
      ? e9
      : { ...e9, buttonElement: t14.element };
  },
  [5](e9, t14) {
    return e9.panelElement === t14.element
      ? e9
      : { ...e9, panelElement: t14.element };
  },
};
var _6 = (0, import_react100.createContext)(null);
_6.displayName = "DisclosureContext";
function M8(e9) {
  let t14 = (0, import_react100.useContext)(_6);
  if (t14 === null) {
    let l19 = new Error(
      `<${e9} /> is missing a parent <Disclosure /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(l19, M8), l19);
  }
  return t14;
}
var F4 = (0, import_react100.createContext)(null);
F4.displayName = "DisclosureAPIContext";
function V4(e9) {
  let t14 = (0, import_react100.useContext)(F4);
  if (t14 === null) {
    let l19 = new Error(
      `<${e9} /> is missing a parent <Disclosure /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(l19, V4), l19);
  }
  return t14;
}
var H6 = (0, import_react100.createContext)(null);
H6.displayName = "DisclosurePanelContext";
function ye2() {
  return (0, import_react100.useContext)(H6);
}
function Pe(e9, t14) {
  return u(t14.type, De2, e9, t14);
}
var Ee2 = import_react100.Fragment;
function Se(e9, t14) {
  let { defaultOpen: l19 = false, ...p13 } = e9,
    a28 = (0, import_react100.useRef)(null),
    c21 = y(
      t14,
      T(
        (u25) => {
          a28.current = u25;
        },
        e9.as === void 0 || b(e9.as),
      ),
    ),
    n17 = (0, import_react100.useReducer)(Pe, {
      disclosureState: l19 ? 0 : 1,
      buttonElement: null,
      panelElement: null,
      buttonId: null,
      panelId: null,
    }),
    [{ disclosureState: o20, buttonId: r22 }, f21] = n17,
    s20 = o4((u25) => {
      f21({ type: 1 });
      let m10 = l(a28.current);
      if (!m10 || !r22) return;
      let d14 = (() =>
        u25
          ? i4(u25)
            ? u25
            : "current" in u25 && i4(u25.current)
              ? u25.current
              : m10.getElementById(r22)
          : m10.getElementById(r22))();
      d14 == null || d14.focus();
    }),
    E13 = (0, import_react100.useMemo)(() => ({ close: s20 }), [s20]),
    T10 = n2({ open: o20 === 0, close: s20 }),
    D12 = { ref: c21 },
    S10 = K();
  return import_react100.default.createElement(
    _6.Provider,
    { value: n17 },
    import_react100.default.createElement(
      F4.Provider,
      { value: E13 },
      import_react100.default.createElement(
        C5,
        { value: s20 },
        import_react100.default.createElement(
          c11,
          { value: u(o20, { [0]: i10.Open, [1]: i10.Closed }) },
          S10({
            ourProps: D12,
            theirProps: p13,
            slot: T10,
            defaultTag: Ee2,
            name: "Disclosure",
          }),
        ),
      ),
    ),
  );
}
var ge5 = "button";
function Ae4(e9, t14) {
  let l19 = (0, import_react51.useId)(),
    {
      id: p13 = `headlessui-disclosure-button-${l19}`,
      disabled: a28 = false,
      autoFocus: c21 = false,
      ...n17
    } = e9,
    [o20, r22] = M8("Disclosure.Button"),
    f21 = ye2(),
    s20 = f21 === null ? false : f21 === o20.panelId,
    E13 = (0, import_react100.useRef)(null),
    T10 = y(
      E13,
      t14,
      o4((i16) => {
        if (!s20) return r22({ type: 4, element: i16 });
      }),
    );
  (0, import_react100.useEffect)(() => {
    if (!s20)
      return (
        r22({ type: 2, buttonId: p13 }),
        () => {
          r22({ type: 2, buttonId: null });
        }
      );
  }, [p13, r22, s20]);
  let D12 = o4((i16) => {
      var g6;
      if (s20) {
        if (o20.disclosureState === 1) return;
        switch (i16.key) {
          case o8.Space:
          case o8.Enter:
            (i16.preventDefault(),
              i16.stopPropagation(),
              r22({ type: 0 }),
              (g6 = o20.buttonElement) == null || g6.focus());
            break;
        }
      } else
        switch (i16.key) {
          case o8.Space:
          case o8.Enter:
            (i16.preventDefault(), i16.stopPropagation(), r22({ type: 0 }));
            break;
        }
    }),
    S10 = o4((i16) => {
      switch (i16.key) {
        case o8.Space:
          i16.preventDefault();
          break;
      }
    }),
    u25 = o4((i16) => {
      var g6;
      s6(i16.currentTarget) ||
        a28 ||
        (s20
          ? (r22({ type: 0 }), (g6 = o20.buttonElement) == null || g6.focus())
          : r22({ type: 0 }));
    }),
    { isFocusVisible: m10, focusProps: d14 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: c21 }),
    { isHovered: C11, hoverProps: h15 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: a28 }),
    { pressed: $6, pressProps: U3 } = w({ disabled: a28 }),
    J4 = n2({
      open: o20.disclosureState === 0,
      hover: C11,
      active: $6,
      disabled: a28,
      focus: m10,
      autofocus: c21,
    }),
    G6 = e5(e9, o20.buttonElement),
    X5 = s20
      ? V(
          {
            ref: T10,
            type: G6,
            disabled: a28 || void 0,
            autoFocus: c21,
            onKeyDown: D12,
            onClick: u25,
          },
          d14,
          h15,
          U3,
        )
      : V(
          {
            ref: T10,
            id: p13,
            type: G6,
            "aria-expanded": o20.disclosureState === 0,
            "aria-controls": o20.panelElement ? o20.panelId : void 0,
            disabled: a28 || void 0,
            autoFocus: c21,
            onKeyDown: D12,
            onKeyUp: S10,
            onClick: u25,
          },
          d14,
          h15,
          U3,
        );
  return K()({
    ourProps: X5,
    theirProps: n17,
    slot: J4,
    defaultTag: ge5,
    name: "Disclosure.Button",
  });
}
var be2 = "div";
var Ce = A.RenderStrategy | A.Static;
function Re2(e9, t14) {
  let l19 = (0, import_react51.useId)(),
    {
      id: p13 = `headlessui-disclosure-panel-${l19}`,
      transition: a28 = false,
      ...c21
    } = e9,
    [n17, o20] = M8("Disclosure.Panel"),
    { close: r22 } = V4("Disclosure.Panel"),
    [f21, s20] = (0, import_react100.useState)(null),
    E13 = y(
      t14,
      o4((C11) => {
        a22(() => o20({ type: 5, element: C11 }));
      }),
      s20,
    );
  (0, import_react100.useEffect)(
    () => (
      o20({ type: 3, panelId: p13 }),
      () => {
        o20({ type: 3, panelId: null });
      }
    ),
    [p13, o20],
  );
  let T10 = u17(),
    [D12, S10] = N2(
      a28,
      f21,
      T10 !== null ? (T10 & i10.Open) === i10.Open : n17.disclosureState === 0,
    ),
    u25 = n2({ open: n17.disclosureState === 0, close: r22 }),
    m10 = { ref: E13, id: p13, ...x4(S10) },
    d14 = K();
  return import_react100.default.createElement(
    s13,
    null,
    import_react100.default.createElement(
      H6.Provider,
      { value: n17.panelId },
      d14({
        ourProps: m10,
        theirProps: c21,
        slot: u25,
        defaultTag: be2,
        features: Ce,
        visible: D12,
        name: "Disclosure.Panel",
      }),
    ),
  );
}
var Ie2 = Y(Se);
var xe2 = Y(Ae4);
var Le3 = Y(Re2);
var Xe2 = Object.assign(Ie2, { Button: xe2, Panel: Le3 });

// node_modules/@headlessui/react/dist/components/field/field.js
var import_react101 = __toESM(require_react(), 1);
var _7 = "div";
function c18(d14, l19) {
  let t14 = `headlessui-control-${(0, import_react51.useId)()}`,
    [p13, s20] = V2(),
    [n17, a28] = H3(),
    m10 = a3(),
    { disabled: r22 = m10 || false, ...o20 } = d14,
    i16 = n2({ disabled: r22 }),
    F7 = { ref: l19, disabled: r22 || void 0, "aria-disabled": r22 || void 0 },
    T10 = K();
  return import_react101.default.createElement(
    l2,
    { value: r22 },
    import_react101.default.createElement(
      s20,
      { value: p13 },
      import_react101.default.createElement(
        a28,
        { value: n17 },
        import_react101.default.createElement(
          f6,
          { id: t14 },
          T10({
            ourProps: F7,
            theirProps: {
              ...o20,
              children: import_react101.default.createElement(
                W,
                null,
                typeof o20.children == "function"
                  ? o20.children(i16)
                  : o20.children,
              ),
            },
            slot: i16,
            defaultTag: _7,
            name: "Field",
          }),
        ),
      ),
    ),
  );
}
var W3 = Y(c18);

// node_modules/@headlessui/react/dist/components/fieldset/fieldset.js
var import_react103 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-resolved-tag.js
var import_react102 = __toESM(require_react(), 1);
function d10(t14) {
  let e9 = typeof t14 == "string" ? t14 : void 0,
    [s20, o20] = (0, import_react102.useState)(e9);
  return [
    e9 != null ? e9 : s20,
    (0, import_react102.useCallback)(
      (n17) => {
        e9 || (n5(n17) && o20(n17.tagName.toLowerCase()));
      },
      [e9],
    ),
  ];
}

// node_modules/@headlessui/react/dist/components/fieldset/fieldset.js
var d11 = "fieldset";
function _8(t14, a28) {
  var s20;
  let i16 = a3(),
    { disabled: e9 = i16 || false, ...p13 } = t14,
    [n17, T10] = d10((s20 = t14.as) != null ? s20 : d11),
    l19 = y(a28, T10),
    [r22, f21] = V2(),
    m10 = n2({ disabled: e9 }),
    y10 =
      n17 === "fieldset"
        ? { ref: l19, "aria-labelledby": r22, disabled: e9 || void 0 }
        : {
            ref: l19,
            role: "group",
            "aria-labelledby": r22,
            "aria-disabled": e9 || void 0,
          },
    F7 = K();
  return import_react103.default.createElement(
    l2,
    { value: e9 },
    import_react103.default.createElement(
      f21,
      null,
      F7({
        ourProps: y10,
        theirProps: p13,
        slot: m10,
        defaultTag: d11,
        name: "Fieldset",
      }),
    ),
  );
}
var I9 = Y(_8);

// node_modules/@headlessui/react/dist/components/input/input.js
var x8 = "input";
function h9(r22, p13) {
  let n17 = (0, import_react51.useId)(),
    s20 = u4(),
    a28 = a3(),
    {
      id: l19 = s20 || `headlessui-input-${n17}`,
      disabled: e9 = a28 || false,
      autoFocus: o20 = false,
      invalid: t14 = false,
      ...i16
    } = r22,
    d14 = N(),
    u25 = w3(),
    { isFocused: f21, focusProps: m10 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: o20 }),
    { isHovered: T10, hoverProps: b14 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e9 }),
    y10 = V(
      {
        ref: p13,
        id: l19,
        "aria-labelledby": d14,
        "aria-describedby": u25,
        "aria-invalid": t14 ? "true" : void 0,
        disabled: e9 || void 0,
        autoFocus: o20,
      },
      m10,
      b14,
    ),
    I10 = n2({
      disabled: e9,
      invalid: t14,
      hover: T10,
      focus: f21,
      autofocus: o20,
    });
  return K()({
    ourProps: y10,
    theirProps: i16,
    slot: I10,
    defaultTag: x8,
    name: "Input",
  });
}
var X3 = Y(h9);

// node_modules/@headlessui/react/dist/components/legend/legend.js
var import_react104 = __toESM(require_react(), 1);
function o17(t14, n17) {
  return import_react104.default.createElement(Z, {
    as: "div",
    ref: n17,
    ...t14,
  });
}
var d12 = Y(o17);

// node_modules/@headlessui/react/dist/components/listbox/listbox.js
var import_react107 = __toESM(require_react(), 1);
var import_react_dom10 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/hooks/use-text-value.js
var import_react105 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/get-text-value.js
var a24 =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o18(e9) {
  var l19, n17;
  let i16 = (l19 = e9.innerText) != null ? l19 : "",
    t14 = e9.cloneNode(true);
  if (!n5(t14)) return i16;
  let u25 = false;
  for (let f21 of t14.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))
    (f21.remove(), (u25 = true));
  let r22 = u25 ? ((n17 = t14.innerText) != null ? n17 : "") : i16;
  return (a24.test(r22) && (r22 = r22.replace(a24, "")), r22);
}
function F5(e9) {
  let i16 = e9.getAttribute("aria-label");
  if (typeof i16 == "string") return i16.trim();
  let t14 = e9.getAttribute("aria-labelledby");
  if (t14) {
    let u25 = t14
      .split(" ")
      .map((r22) => {
        let l19 = document.getElementById(r22);
        if (l19) {
          let n17 = l19.getAttribute("aria-label");
          return typeof n17 == "string" ? n17.trim() : o18(l19).trim();
        }
        return null;
      })
      .filter(Boolean);
    if (u25.length > 0) return u25.join(", ");
  }
  return o18(e9).trim();
}

// node_modules/@headlessui/react/dist/hooks/use-text-value.js
function s16(c21) {
  let t14 = (0, import_react105.useRef)(""),
    r22 = (0, import_react105.useRef)("");
  return o4(() => {
    let e9 = c21.current;
    if (!e9) return "";
    let u25 = e9.innerText;
    if (t14.current === u25) return r22.current;
    let n17 = F5(e9).trim().toLowerCase();
    return ((t14.current = u25), (r22.current = n17), n17);
  });
}

// node_modules/@headlessui/react/dist/components/listbox/listbox-machine.js
var T9 = Object.defineProperty;
var y8 = (e9, o20, t14) =>
  o20 in e9
    ? T9(e9, o20, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: t14,
      })
    : (e9[o20] = t14);
var b11 = (e9, o20, t14) => (
  y8(e9, typeof o20 != "symbol" ? o20 + "" : o20, t14),
  t14
);
var F6 = ((t14) => (
  (t14[(t14.Open = 0)] = "Open"),
  (t14[(t14.Closed = 1)] = "Closed"),
  t14
))(F6 || {});
var P6 = ((t14) => (
  (t14[(t14.Single = 0)] = "Single"),
  (t14[(t14.Multi = 1)] = "Multi"),
  t14
))(P6 || {});
var C8 = ((t14) => (
  (t14[(t14.Pointer = 0)] = "Pointer"),
  (t14[(t14.Other = 1)] = "Other"),
  t14
))(C8 || {});
var k9 = ((r22) => (
  (r22[(r22.OpenListbox = 0)] = "OpenListbox"),
  (r22[(r22.CloseListbox = 1)] = "CloseListbox"),
  (r22[(r22.GoToOption = 2)] = "GoToOption"),
  (r22[(r22.Search = 3)] = "Search"),
  (r22[(r22.ClearSearch = 4)] = "ClearSearch"),
  (r22[(r22.SelectOption = 5)] = "SelectOption"),
  (r22[(r22.RegisterOptions = 6)] = "RegisterOptions"),
  (r22[(r22.UnregisterOptions = 7)] = "UnregisterOptions"),
  (r22[(r22.SetButtonElement = 8)] = "SetButtonElement"),
  (r22[(r22.SetOptionsElement = 9)] = "SetOptionsElement"),
  (r22[(r22.SortOptions = 10)] = "SortOptions"),
  (r22[(r22.MarkButtonAsMoved = 11)] = "MarkButtonAsMoved"),
  r22
))(k9 || {});
function g5(e9, o20 = (t14) => t14) {
  let t14 =
      e9.activeOptionIndex !== null ? e9.options[e9.activeOptionIndex] : null,
    n17 = G2(
      o20(e9.options.slice()),
      (s20) => s20.dataRef.current.domRef.current,
    ),
    i16 = t14 ? n17.indexOf(t14) : null;
  return (i16 === -1 && (i16 = null), { options: n17, activeOptionIndex: i16 });
}
var D9 = {
  [1](e9) {
    if (e9.dataRef.current.disabled || e9.listboxState === 1) return e9;
    let o20 = e9.buttonElement
      ? c16.Tracked(a18(e9.buttonElement))
      : e9.buttonPositionState;
    return {
      ...e9,
      activeOptionIndex: null,
      pendingFocus: { focus: c12.Nothing },
      listboxState: 1,
      __demoMode: false,
      buttonPositionState: o20,
    };
  },
  [0](e9, o20) {
    if (e9.dataRef.current.disabled || e9.listboxState === 0) return e9;
    let t14 = e9.activeOptionIndex,
      { isSelected: n17 } = e9.dataRef.current,
      i16 = e9.options.findIndex((s20) => n17(s20.dataRef.current.value));
    return (
      i16 !== -1 && (t14 = i16),
      {
        ...e9,
        frozenValue: false,
        pendingFocus: o20.focus,
        listboxState: 0,
        activeOptionIndex: t14,
        __demoMode: false,
        buttonPositionState: c16.Idle,
      }
    );
  },
  [2](e9, o20) {
    var s20, l19, c21, p13, f21;
    if (e9.dataRef.current.disabled || e9.listboxState === 1) return e9;
    let t14 = {
      ...e9,
      searchQuery: "",
      activationTrigger: (s20 = o20.trigger) != null ? s20 : 1,
      __demoMode: false,
    };
    if (o20.focus === c12.Nothing) return { ...t14, activeOptionIndex: null };
    if (o20.focus === c12.Specific)
      return {
        ...t14,
        activeOptionIndex: e9.options.findIndex((d14) => d14.id === o20.id),
      };
    if (o20.focus === c12.Previous) {
      let d14 = e9.activeOptionIndex;
      if (d14 !== null) {
        let O5 = e9.options[d14].dataRef.current.domRef,
          r22 = f14(o20, {
            resolveItems: () => e9.options,
            resolveActiveIndex: () => e9.activeOptionIndex,
            resolveId: (u25) => u25.id,
            resolveDisabled: (u25) => u25.dataRef.current.disabled,
          });
        if (r22 !== null) {
          let u25 = e9.options[r22].dataRef.current.domRef;
          if (
            ((l19 = O5.current) == null
              ? void 0
              : l19.previousElementSibling) === u25.current ||
            ((c21 = u25.current) == null
              ? void 0
              : c21.previousElementSibling) === null
          )
            return { ...t14, activeOptionIndex: r22 };
        }
      }
    } else if (o20.focus === c12.Next) {
      let d14 = e9.activeOptionIndex;
      if (d14 !== null) {
        let O5 = e9.options[d14].dataRef.current.domRef,
          r22 = f14(o20, {
            resolveItems: () => e9.options,
            resolveActiveIndex: () => e9.activeOptionIndex,
            resolveId: (u25) => u25.id,
            resolveDisabled: (u25) => u25.dataRef.current.disabled,
          });
        if (r22 !== null) {
          let u25 = e9.options[r22].dataRef.current.domRef;
          if (
            ((p13 = O5.current) == null ? void 0 : p13.nextElementSibling) ===
              u25.current ||
            ((f21 = u25.current) == null ? void 0 : f21.nextElementSibling) ===
              null
          )
            return { ...t14, activeOptionIndex: r22 };
        }
      }
    }
    let n17 = g5(e9),
      i16 = f14(o20, {
        resolveItems: () => n17.options,
        resolveActiveIndex: () => n17.activeOptionIndex,
        resolveId: (d14) => d14.id,
        resolveDisabled: (d14) => d14.dataRef.current.disabled,
      });
    return { ...t14, ...n17, activeOptionIndex: i16 };
  },
  [3]: (e9, o20) => {
    if (e9.dataRef.current.disabled || e9.listboxState === 1) return e9;
    let n17 = e9.searchQuery !== "" ? 0 : 1,
      i16 = e9.searchQuery + o20.value.toLowerCase(),
      l19 = (
        e9.activeOptionIndex !== null
          ? e9.options
              .slice(e9.activeOptionIndex + n17)
              .concat(e9.options.slice(0, e9.activeOptionIndex + n17))
          : e9.options
      ).find((p13) => {
        var f21;
        return (
          !p13.dataRef.current.disabled &&
          ((f21 = p13.dataRef.current.textValue) == null
            ? void 0
            : f21.startsWith(i16))
        );
      }),
      c21 = l19 ? e9.options.indexOf(l19) : -1;
    return c21 === -1 || c21 === e9.activeOptionIndex
      ? { ...e9, searchQuery: i16 }
      : {
          ...e9,
          searchQuery: i16,
          activeOptionIndex: c21,
          activationTrigger: 1,
        };
  },
  [4](e9) {
    return e9.dataRef.current.disabled ||
      e9.listboxState === 1 ||
      e9.searchQuery === ""
      ? e9
      : { ...e9, searchQuery: "" };
  },
  [5](e9) {
    return e9.dataRef.current.mode === 0
      ? { ...e9, frozenValue: true }
      : { ...e9 };
  },
  [6]: (e9, o20) => {
    let t14 = e9.options.concat(o20.options),
      n17 = e9.activeOptionIndex;
    if (
      (e9.pendingFocus.focus !== c12.Nothing &&
        (n17 = f14(e9.pendingFocus, {
          resolveItems: () => t14,
          resolveActiveIndex: () => e9.activeOptionIndex,
          resolveId: (i16) => i16.id,
          resolveDisabled: (i16) => i16.dataRef.current.disabled,
        })),
      e9.activeOptionIndex === null)
    ) {
      let { isSelected: i16 } = e9.dataRef.current;
      if (i16) {
        let s20 = t14.findIndex((l19) =>
          i16 == null ? void 0 : i16(l19.dataRef.current.value),
        );
        s20 !== -1 && (n17 = s20);
      }
    }
    return {
      ...e9,
      options: t14,
      activeOptionIndex: n17,
      pendingFocus: { focus: c12.Nothing },
      pendingShouldSort: true,
    };
  },
  [7]: (e9, o20) => {
    let t14 = e9.options,
      n17 = [],
      i16 = new Set(o20.options);
    for (let [s20, l19] of t14.entries())
      if (
        i16.has(l19.id) &&
        (n17.push(s20), i16.delete(l19.id), i16.size === 0)
      )
        break;
    if (n17.length > 0) {
      t14 = t14.slice();
      for (let s20 of n17.reverse()) t14.splice(s20, 1);
    }
    return { ...e9, options: t14, activationTrigger: 1 };
  },
  [8]: (e9, o20) =>
    e9.buttonElement === o20.element
      ? e9
      : { ...e9, buttonElement: o20.element },
  [9]: (e9, o20) =>
    e9.optionsElement === o20.element
      ? e9
      : { ...e9, optionsElement: o20.element },
  [10]: (e9) =>
    e9.pendingShouldSort ? { ...e9, ...g5(e9), pendingShouldSort: false } : e9,
  [11](e9) {
    return e9.buttonPositionState.kind !== "Tracked"
      ? e9
      : { ...e9, buttonPositionState: c16.Moved };
  },
};
var h10 = class _h extends T3 {
  constructor(t14) {
    super(t14);
    b11(this, "actions", {
      onChange: (t15) => {
        let {
          onChange: n17,
          compare: i16,
          mode: s20,
          value: l19,
        } = this.state.dataRef.current;
        return u(s20, {
          [0]: () => (n17 == null ? void 0 : n17(t15)),
          [1]: () => {
            let c21 = l19.slice(),
              p13 = c21.findIndex((f21) => i16(f21, t15));
            return (
              p13 === -1 ? c21.push(t15) : c21.splice(p13, 1),
              n17 == null ? void 0 : n17(c21)
            );
          },
        });
      },
      registerOption: k3(() => {
        let t15 = [],
          n17 = /* @__PURE__ */ new Set();
        return [
          (i16, s20) => {
            n17.has(s20) || (n17.add(s20), t15.push({ id: i16, dataRef: s20 }));
          },
          () => (n17.clear(), this.send({ type: 6, options: t15.splice(0) })),
        ];
      }),
      unregisterOption: k3(() => {
        let t15 = [];
        return [
          (n17) => t15.push(n17),
          () => {
            this.send({ type: 7, options: t15.splice(0) });
          },
        ];
      }),
      goToOption: k3(() => {
        let t15 = null;
        return [
          (n17, i16) => {
            t15 = { type: 2, ...n17, trigger: i16 };
          },
          () => t15 && this.send(t15),
        ];
      }),
      closeListbox: () => {
        this.send({ type: 1 });
      },
      openListbox: (t15) => {
        this.send({ type: 0, focus: t15 });
      },
      selectActiveOption: () => {
        var t15;
        if (this.state.activeOptionIndex !== null) {
          let { dataRef: n17 } =
            this.state.options[this.state.activeOptionIndex];
          this.actions.selectOption(n17.current.value);
        } else
          this.state.dataRef.current.mode === 0 &&
            (this.actions.closeListbox(),
            (t15 = this.state.buttonElement) == null ||
              t15.focus({ preventScroll: true }));
      },
      selectOption: (t15) => {
        this.send({ type: 5, value: t15 });
      },
      search: (t15) => {
        this.send({ type: 3, value: t15 });
      },
      clearSearch: () => {
        this.send({ type: 4 });
      },
      setButtonElement: (t15) => {
        this.send({ type: 8, element: t15 });
      },
      setOptionsElement: (t15) => {
        this.send({ type: 9, element: t15 });
      },
    });
    b11(this, "selectors", {
      activeDescendantId(t15) {
        var s20;
        let n17 = t15.activeOptionIndex,
          i16 = t15.options;
        return n17 === null || (s20 = i16[n17]) == null ? void 0 : s20.id;
      },
      isActive(t15, n17) {
        var l19;
        let i16 = t15.activeOptionIndex,
          s20 = t15.options;
        return i16 !== null
          ? ((l19 = s20[i16]) == null ? void 0 : l19.id) === n17
          : false;
      },
      hasFrozenValue(t15) {
        return t15.frozenValue;
      },
      shouldScrollIntoView(t15, n17) {
        return t15.__demoMode ||
          t15.listboxState !== 0 ||
          t15.activationTrigger === 0
          ? false
          : this.isActive(t15, n17);
      },
      didButtonMove(t15) {
        return t15.buttonPositionState.kind === "Moved";
      },
    });
    this.on(6, () => {
      requestAnimationFrame(() => {
        this.send({ type: 10 });
      });
    });
    {
      let n17 = this.state.id,
        i16 = x2.get(null);
      (this.disposables.add(
        i16.on(k4.Push, (s20) => {
          !i16.selectors.isTop(s20, n17) &&
            this.state.listboxState === 0 &&
            this.actions.closeListbox();
        }),
      ),
        this.on(0, () => i16.actions.push(n17)),
        this.on(1, () => i16.actions.pop(n17)));
    }
    (this.disposables.group((n17) => {
      this.on(1, (i16) => {
        i16.buttonElement &&
          (n17.dispose(),
          n17.add(
            p6(i16.buttonElement, i16.buttonPositionState, () => {
              this.send({ type: 11 });
            }),
          ));
      });
    }),
      this.on(5, (n17, i16) => {
        var s20;
        (this.actions.onChange(i16.value),
          this.state.dataRef.current.mode === 0 &&
            (this.actions.closeListbox(),
            (s20 = this.state.buttonElement) == null ||
              s20.focus({ preventScroll: true })));
      }));
  }
  static new({ id: t14, __demoMode: n17 = false }) {
    return new _h({
      id: t14,
      dataRef: { current: {} },
      listboxState: n17 ? 0 : 1,
      options: [],
      searchQuery: "",
      activeOptionIndex: null,
      activationTrigger: 1,
      buttonElement: null,
      optionsElement: null,
      pendingShouldSort: false,
      pendingFocus: { focus: c12.Nothing },
      frozenValue: false,
      __demoMode: n17,
      buttonPositionState: c16.Idle,
    });
  }
  reduce(t14, n17) {
    return u(n17.type, D9, t14, n17);
  }
};

// node_modules/@headlessui/react/dist/components/listbox/listbox-machine-glue.js
var import_react106 = __toESM(require_react(), 1);
var c19 = (0, import_react106.createContext)(null);
function p10(o20) {
  let e9 = (0, import_react106.useContext)(c19);
  if (e9 === null) {
    let t14 = new Error(
      `<${o20} /> is missing a parent <Listbox /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(t14, u22), t14);
  }
  return e9;
}
function u22({ id: o20, __demoMode: e9 = false }) {
  let t14 = (0, import_react106.useMemo)(
    () => h10.new({ id: o20, __demoMode: e9 }),
    [],
  );
  return (c13(() => t14.dispose()), t14);
}

// node_modules/@headlessui/react/dist/components/listbox/listbox.js
var oe3 = (0, import_react107.createContext)(null);
oe3.displayName = "ListboxDataContext";
function Q3(b14) {
  let E13 = (0, import_react107.useContext)(oe3);
  if (E13 === null) {
    let m10 = new Error(
      `<${b14} /> is missing a parent <Listbox /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(m10, Q3), m10);
  }
  return E13;
}
var Pt = import_react107.Fragment;
function gt(b14, E13) {
  let m10 = (0, import_react51.useId)(),
    u25 = a3(),
    {
      value: s20,
      defaultValue: a28,
      form: _10,
      name: i16,
      onChange: y10,
      by: o20,
      invalid: x10 = false,
      disabled: O5 = u25 || false,
      horizontal: l19 = false,
      multiple: t14 = false,
      __demoMode: p13 = false,
      ...S10
    } = b14;
  const h15 = l19 ? "horizontal" : "vertical";
  let I10 = y(E13),
    R7 = l3(a28),
    [c21 = t14 ? [] : void 0, L7] = b2(s20, y10, R7),
    f21 = u22({ id: m10, __demoMode: p13 }),
    k13 = (0, import_react107.useRef)({ static: false, hold: false }),
    N4 = (0, import_react107.useRef)(/* @__PURE__ */ new Map()),
    C11 = u9(o20),
    V6 = (0, import_react107.useCallback)(
      (P8) =>
        u(n17.mode, {
          [P6.Multi]: () => c21.some((W5) => C11(W5, P8)),
          [P6.Single]: () => C11(c21, P8),
        }),
      [c21],
    ),
    n17 = n2({
      value: c21,
      disabled: O5,
      invalid: x10,
      mode: t14 ? P6.Multi : P6.Single,
      orientation: h15,
      onChange: L7,
      compare: C11,
      isSelected: V6,
      optionsPropsRef: k13,
      listRef: N4,
    });
  n(() => {
    f21.state.dataRef.current = n17;
  }, [n17]);
  let F7 = S3(f21, (P8) => P8.listboxState),
    U3 = x2.get(null),
    H9 = S3(
      U3,
      (0, import_react107.useCallback)(
        (P8) => U3.selectors.isTop(P8, m10),
        [U3, m10],
      ),
    ),
    [A5, $6] = S3(f21, (P8) => [P8.buttonElement, P8.optionsElement]);
  k5(H9, [A5, $6], (P8, W5) => {
    (f21.send({ type: k9.CloseListbox }),
      H4(W5, I4.Loose) || (P8.preventDefault(), A5 == null || A5.focus()));
  });
  let r22 = n2({
      open: F7 === F6.Open,
      disabled: O5,
      invalid: x10,
      value: c21,
    }),
    [M12, ne4] = V2({ inherit: true }),
    re4 = { ref: I10 },
    q5 = (0, import_react107.useCallback)(() => {
      if (R7 !== void 0) return L7 == null ? void 0 : L7(R7);
    }, [L7, R7]),
    le = K();
  return import_react107.default.createElement(
    ne4,
    {
      value: M12,
      props: { htmlFor: A5 == null ? void 0 : A5.id },
      slot: { open: F7 === F6.Open, disabled: O5 },
    },
    import_react107.default.createElement(
      Ae,
      null,
      import_react107.default.createElement(
        c19.Provider,
        { value: f21 },
        import_react107.default.createElement(
          oe3.Provider,
          { value: n17 },
          import_react107.default.createElement(
            c11,
            { value: u(F7, { [F6.Open]: i10.Open, [F6.Closed]: i10.Closed }) },
            i16 != null &&
              c21 != null &&
              import_react107.default.createElement(j2, {
                disabled: O5,
                data: { [i16]: c21 },
                form: _10,
                onReset: q5,
              }),
            le({
              ourProps: re4,
              theirProps: S10,
              slot: r22,
              defaultTag: Pt,
              name: "Listbox",
            }),
          ),
        ),
      ),
    ),
  );
}
var vt = "button";
function Et(b14, E13) {
  let m10 = (0, import_react51.useId)(),
    u25 = u4(),
    s20 = Q3("Listbox.Button"),
    a28 = p10("Listbox.Button"),
    {
      id: _10 = u25 || `headlessui-listbox-button-${m10}`,
      disabled: i16 = s20.disabled || false,
      autoFocus: y10 = false,
      ...o20
    } = b14,
    x10 = y(E13, Fe(), a28.actions.setButtonElement),
    O5 = be(),
    [l19, t14, p13] = S3(a28, (r22) => [
      r22.listboxState,
      r22.buttonElement,
      r22.optionsElement,
    ]),
    S10 = l19 === F6.Open;
  L4(S10, {
    trigger: t14,
    action: (0, import_react107.useCallback)(
      (r22) => {
        if (t14 != null && t14.contains(r22.target)) return S5.Ignore;
        let M12 = r22.target.closest('[role="option"]:not([data-disabled])');
        return n5(M12)
          ? S5.Select(M12)
          : p13 != null && p13.contains(r22.target)
            ? S5.Ignore
            : S5.Close;
      },
      [t14, p13],
    ),
    close: a28.actions.closeListbox,
    select: a28.actions.selectActiveOption,
  });
  let h15 = o4((r22) => {
      switch (r22.key) {
        case o8.Enter:
          g(r22.currentTarget);
          break;
        case o8.Space:
        case o8.ArrowDown:
          (r22.preventDefault(),
            a28.actions.openListbox({
              focus: s20.value ? c12.Nothing : c12.First,
            }));
          break;
        case o8.ArrowUp:
          (r22.preventDefault(),
            a28.actions.openListbox({
              focus: s20.value ? c12.Nothing : c12.Last,
            }));
          break;
      }
    }),
    I10 = o4((r22) => {
      switch (r22.key) {
        case o8.Space:
          r22.preventDefault();
          break;
      }
    }),
    R7 = s8((r22) => {
      var M12;
      a28.state.listboxState === F6.Open
        ? ((0, import_react_dom10.flushSync)(() => a28.actions.closeListbox()),
          (M12 = a28.state.buttonElement) == null ||
            M12.focus({ preventScroll: true }))
        : (r22.preventDefault(),
          a28.actions.openListbox({ focus: c12.Nothing }));
    }),
    c21 = o4((r22) => r22.preventDefault()),
    L7 = N([_10]),
    f21 = w3(),
    { isFocusVisible: k13, focusProps: N4 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: y10 }),
    { isHovered: C11, hoverProps: V6 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: i16 }),
    { pressed: n17, pressProps: F7 } = w({ disabled: i16 }),
    U3 = n2({
      open: l19 === F6.Open,
      active: n17 || l19 === F6.Open,
      disabled: i16,
      invalid: s20.invalid,
      value: s20.value,
      hover: C11,
      focus: k13,
      autofocus: y10,
    }),
    H9 = S3(a28, (r22) => r22.listboxState === F6.Open),
    A5 = V(
      O5(),
      {
        ref: x10,
        id: _10,
        type: e5(b14, t14),
        "aria-haspopup": "listbox",
        "aria-controls": p13 == null ? void 0 : p13.id,
        "aria-expanded": H9,
        "aria-labelledby": L7,
        "aria-describedby": f21,
        disabled: i16 || void 0,
        autoFocus: y10,
        onKeyDown: h15,
        onKeyUp: I10,
        onKeyPress: c21,
      },
      R7,
      N4,
      V6,
      F7,
    );
  return K()({
    ourProps: A5,
    theirProps: o20,
    slot: U3,
    defaultTag: vt,
    name: "Listbox.Button",
  });
}
var Oe2 = (0, import_react107.createContext)(false);
var ht2 = "div";
var At = A.RenderStrategy | A.Static;
function _t(b14, E13) {
  let m10 = (0, import_react51.useId)(),
    {
      id: u25 = `headlessui-listbox-options-${m10}`,
      anchor: s20,
      portal: a28 = false,
      modal: _10 = true,
      transition: i16 = false,
      ...y10
    } = b14,
    o20 = ye(s20),
    [x10, O5] = (0, import_react107.useState)(null);
  o20 && (a28 = true);
  let l19 = Q3("Listbox.Options"),
    t14 = p10("Listbox.Options"),
    [p13, S10, h15, I10] = S3(t14, (e9) => [
      e9.listboxState,
      e9.buttonElement,
      e9.optionsElement,
      e9.__demoMode,
    ]),
    R7 = u13(S10),
    c21 = u13(h15),
    L7 = u17(),
    [f21, k13] = N2(
      i16,
      x10,
      L7 !== null ? (L7 & i10.Open) === i10.Open : p13 === F6.Open,
    );
  p5(f21, S10, t14.actions.closeListbox);
  let N4 = I10 ? false : _10 && p13 === F6.Open;
  f11(N4, c21);
  let C11 = I10 ? false : _10 && p13 === F6.Open;
  y4(C11, {
    allowed: (0, import_react107.useCallback)(() => [S10, h15], [S10, h15]),
  });
  let n17 = S3(t14, t14.selectors.didButtonMove) ? false : f21,
    F7 = S3(t14, t14.selectors.hasFrozenValue) && !b14.static,
    U3 = u16(F7, l19.value),
    H9 = (0, import_react107.useCallback)(
      (e9) => l19.compare(U3, e9),
      [l19.compare, U3],
    ),
    A5 = S3(t14, (e9) => {
      var de6;
      if (
        o20 == null ||
        !(
          (de6 = o20 == null ? void 0 : o20.to) != null &&
          de6.includes("selection")
        )
      )
        return null;
      let w12 = e9.options.findIndex((ve3) => H9(ve3.dataRef.current.value));
      return (w12 === -1 && (w12 = 0), w12);
    }),
    $6 = (() => {
      if (o20 == null) return;
      if (A5 === null) return { ...o20, inner: void 0 };
      let e9 = Array.from(l19.listRef.current.values());
      return { ...o20, inner: { listRef: { current: e9 }, index: A5 } };
    })(),
    [r22, M12] = Re($6),
    ne4 = Te(),
    re4 = y(E13, o20 ? r22 : null, t14.actions.setOptionsElement, O5),
    q5 = p();
  (0, import_react107.useEffect)(() => {
    let e9 = h15;
    e9 &&
      p13 === F6.Open &&
      (d2(e9) || e9 == null || e9.focus({ preventScroll: true }));
  }, [p13, h15]);
  let le = o4((e9) => {
      var w12;
      switch ((q5.dispose(), e9.key)) {
        case o8.Space:
          if (t14.state.searchQuery !== "")
            return (
              e9.preventDefault(),
              e9.stopPropagation(),
              t14.actions.search(e9.key)
            );
        case o8.Enter:
          (e9.preventDefault(),
            e9.stopPropagation(),
            t14.actions.selectActiveOption());
          break;
        case u(l19.orientation, {
          vertical: o8.ArrowDown,
          horizontal: o8.ArrowRight,
        }):
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            t14.actions.goToOption({ focus: c12.Next })
          );
        case u(l19.orientation, {
          vertical: o8.ArrowUp,
          horizontal: o8.ArrowLeft,
        }):
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            t14.actions.goToOption({ focus: c12.Previous })
          );
        case o8.Home:
        case o8.PageUp:
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            t14.actions.goToOption({ focus: c12.First })
          );
        case o8.End:
        case o8.PageDown:
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            t14.actions.goToOption({ focus: c12.Last })
          );
        case o8.Escape:
          (e9.preventDefault(),
            e9.stopPropagation(),
            (0, import_react_dom10.flushSync)(() => t14.actions.closeListbox()),
            (w12 = t14.state.buttonElement) == null ||
              w12.focus({ preventScroll: true }));
          return;
        case o8.Tab:
          (e9.preventDefault(),
            e9.stopPropagation(),
            (0, import_react_dom10.flushSync)(() => t14.actions.closeListbox()),
            R3(t14.state.buttonElement, e9.shiftKey ? T4.Previous : T4.Next));
          break;
        default:
          e9.key.length === 1 &&
            (t14.actions.search(e9.key),
            q5.setTimeout(() => t14.actions.clearSearch(), 350));
          break;
      }
    }),
    P8 = S3(t14, (e9) => {
      var w12;
      return (w12 = e9.buttonElement) == null ? void 0 : w12.id;
    }),
    W5 = n2({ open: p13 === F6.Open }),
    Le6 = V(o20 ? ne4() : {}, {
      id: u25,
      ref: re4,
      "aria-activedescendant": S3(t14, t14.selectors.activeDescendantId),
      "aria-multiselectable": l19.mode === P6.Multi ? true : void 0,
      "aria-labelledby": P8,
      "aria-orientation": l19.orientation,
      onKeyDown: le,
      role: "listbox",
      tabIndex: p13 === F6.Open ? 0 : void 0,
      style: {
        ...y10.style,
        ...M12,
        "--button-width": w5(f21, S10, true).width,
      },
      ...x4(k13),
    }),
    Pe2 = K(),
    ge7 = (0, import_react107.useMemo)(
      () => (l19.mode === P6.Multi ? l19 : { ...l19, isSelected: H9 }),
      [l19, H9],
    );
  return import_react107.default.createElement(
    te,
    { enabled: a28 ? b14.static || f21 : false, ownerDocument: R7 },
    import_react107.default.createElement(
      oe3.Provider,
      { value: ge7 },
      Pe2({
        ourProps: Le6,
        theirProps: y10,
        slot: W5,
        defaultTag: ht2,
        features: At,
        visible: n17,
        name: "Listbox.Options",
      }),
    ),
  );
}
var St = "div";
function Dt(b14, E13) {
  let m10 = (0, import_react51.useId)(),
    {
      id: u25 = `headlessui-listbox-option-${m10}`,
      disabled: s20 = false,
      value: a28,
      ..._10
    } = b14,
    i16 = (0, import_react107.useContext)(Oe2) === true,
    y10 = Q3("Listbox.Option"),
    o20 = p10("Listbox.Option"),
    x10 = S3(o20, (n17) => o20.selectors.isActive(n17, u25)),
    O5 = y10.isSelected(a28),
    l19 = (0, import_react107.useRef)(null),
    t14 = s16(l19),
    p13 = s3({
      disabled: s20,
      value: a28,
      domRef: l19,
      get textValue() {
        return t14();
      },
    }),
    S10 = y(E13, l19, (n17) => {
      n17 ? y10.listRef.current.set(u25, n17) : y10.listRef.current.delete(u25);
    }),
    h15 = S3(o20, (n17) => o20.selectors.shouldScrollIntoView(n17, u25));
  (n(() => {
    if (h15)
      return o2().requestAnimationFrame(() => {
        var n17, F7;
        (F7 = (n17 = l19.current) == null ? void 0 : n17.scrollIntoView) ==
          null || F7.call(n17, { block: "nearest" });
      });
  }, [h15, l19]),
    n(() => {
      if (!i16)
        return (
          o20.actions.registerOption(u25, p13),
          () => o20.actions.unregisterOption(u25)
        );
    }, [p13, u25, i16]));
  let I10 = o4((n17) => {
      if (s20) return n17.preventDefault();
      o20.actions.selectOption(a28);
    }),
    R7 = o4(() => {
      if (s20) return o20.actions.goToOption({ focus: c12.Nothing });
      o20.actions.goToOption({ focus: c12.Specific, id: u25 });
    }),
    c21 = u15(),
    L7 = o4((n17) => c21.update(n17)),
    f21 = o4((n17) => {
      c21.wasMoved(n17) &&
        (s20 ||
          (x10 && o20.state.activationTrigger === C8.Pointer) ||
          o20.actions.goToOption({ focus: c12.Specific, id: u25 }, C8.Pointer));
    }),
    k13 = o4((n17) => {
      c21.wasMoved(n17) &&
        (s20 ||
          (x10 &&
            o20.state.activationTrigger === C8.Pointer &&
            o20.actions.goToOption({ focus: c12.Nothing })));
    }),
    N4 = n2({
      active: x10,
      focus: x10,
      selected: O5,
      disabled: s20,
      selectedOption: O5 && i16,
    }),
    C11 = i16
      ? {}
      : {
          id: u25,
          ref: S10,
          role: "option",
          tabIndex: s20 === true ? void 0 : -1,
          "aria-disabled": s20 === true ? true : void 0,
          "aria-selected": O5,
          disabled: void 0,
          onClick: I10,
          onFocus: R7,
          onPointerEnter: L7,
          onMouseEnter: L7,
          onPointerMove: f21,
          onMouseMove: f21,
          onPointerLeave: k13,
          onMouseLeave: k13,
        },
    V6 = K();
  return !O5 && i16
    ? null
    : V6({
        ourProps: C11,
        theirProps: _10,
        slot: N4,
        defaultTag: St,
        name: "Listbox.Option",
      });
}
var Rt = import_react107.Fragment;
function Ft(b14, E13) {
  let { options: m10, placeholder: u25, ...s20 } = b14,
    _10 = { ref: y(E13) },
    i16 = Q3("ListboxSelectedOption"),
    y10 = n2({}),
    o20 =
      i16.value === void 0 ||
      i16.value === null ||
      (i16.mode === P6.Multi &&
        Array.isArray(i16.value) &&
        i16.value.length === 0),
    x10 = K();
  return import_react107.default.createElement(
    Oe2.Provider,
    { value: true },
    x10({
      ourProps: _10,
      theirProps: {
        ...s20,
        children: import_react107.default.createElement(
          import_react107.default.Fragment,
          null,
          u25 && o20 ? u25 : m10,
        ),
      },
      slot: y10,
      defaultTag: Rt,
      name: "ListboxSelectedOption",
    }),
  );
}
var Ct = Y(gt);
var Mt = Y(Et);
var wt = Z;
var Bt = Y(_t);
var It = Y(Dt);
var kt = Y(Ft);
var Mo2 = Object.assign(Ct, {
  Button: Mt,
  Label: wt,
  Options: Bt,
  Option: It,
  SelectedOption: kt,
});

// node_modules/@headlessui/react/dist/components/menu/menu.js
var import_react109 = __toESM(require_react(), 1);
var import_react_dom11 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/components/menu/menu-machine.js
var y9 = Object.defineProperty;
var M9 = (e9, i16, t14) =>
  i16 in e9
    ? y9(e9, i16, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: t14,
      })
    : (e9[i16] = t14);
var S9 = (e9, i16, t14) => (
  M9(e9, typeof i16 != "symbol" ? i16 + "" : i16, t14),
  t14
);
var P7 = ((t14) => (
  (t14[(t14.Open = 0)] = "Open"),
  (t14[(t14.Closed = 1)] = "Closed"),
  t14
))(P7 || {});
var D11 = ((t14) => (
  (t14[(t14.Pointer = 0)] = "Pointer"),
  (t14[(t14.Other = 1)] = "Other"),
  t14
))(D11 || {});
var C9 = ((o20) => (
  (o20[(o20.OpenMenu = 0)] = "OpenMenu"),
  (o20[(o20.CloseMenu = 1)] = "CloseMenu"),
  (o20[(o20.GoToItem = 2)] = "GoToItem"),
  (o20[(o20.Search = 3)] = "Search"),
  (o20[(o20.ClearSearch = 4)] = "ClearSearch"),
  (o20[(o20.RegisterItems = 5)] = "RegisterItems"),
  (o20[(o20.UnregisterItems = 6)] = "UnregisterItems"),
  (o20[(o20.SetButtonElement = 7)] = "SetButtonElement"),
  (o20[(o20.SetItemsElement = 8)] = "SetItemsElement"),
  (o20[(o20.SortItems = 9)] = "SortItems"),
  (o20[(o20.MarkButtonAsMoved = 10)] = "MarkButtonAsMoved"),
  o20
))(C9 || {});
function x9(e9, i16 = (t14) => t14) {
  let t14 = e9.activeItemIndex !== null ? e9.items[e9.activeItemIndex] : null,
    n17 = G2(
      i16(e9.items.slice()),
      (s20) => s20.dataRef.current.domRef.current,
    ),
    r22 = t14 ? n17.indexOf(t14) : null;
  return (r22 === -1 && (r22 = null), { items: n17, activeItemIndex: r22 });
}
var k10 = {
  [1](e9) {
    if (e9.menuState === 1) return e9;
    let i16 = e9.buttonElement
      ? c16.Tracked(a18(e9.buttonElement))
      : e9.buttonPositionState;
    return {
      ...e9,
      activeItemIndex: null,
      pendingFocus: { focus: c12.Nothing },
      menuState: 1,
      buttonPositionState: i16,
    };
  },
  [0](e9, i16) {
    return e9.menuState === 0
      ? e9
      : {
          ...e9,
          __demoMode: false,
          pendingFocus: i16.focus,
          menuState: 0,
          buttonPositionState: c16.Idle,
        };
  },
  [2]: (e9, i16) => {
    var s20, l19, a28, I10, f21;
    if (e9.menuState === 1) return e9;
    let t14 = {
      ...e9,
      searchQuery: "",
      activationTrigger: (s20 = i16.trigger) != null ? s20 : 1,
      __demoMode: false,
    };
    if (i16.focus === c12.Nothing) return { ...t14, activeItemIndex: null };
    if (i16.focus === c12.Specific)
      return {
        ...t14,
        activeItemIndex: e9.items.findIndex((d14) => d14.id === i16.id),
      };
    if (i16.focus === c12.Previous) {
      let d14 = e9.activeItemIndex;
      if (d14 !== null) {
        let o20 = e9.items[d14].dataRef.current.domRef,
          c21 = f14(i16, {
            resolveItems: () => e9.items,
            resolveActiveIndex: () => e9.activeItemIndex,
            resolveId: (u25) => u25.id,
            resolveDisabled: (u25) => u25.dataRef.current.disabled,
          });
        if (c21 !== null) {
          let u25 = e9.items[c21].dataRef.current.domRef;
          if (
            ((l19 = o20.current) == null
              ? void 0
              : l19.previousElementSibling) === u25.current ||
            ((a28 = u25.current) == null
              ? void 0
              : a28.previousElementSibling) === null
          )
            return { ...t14, activeItemIndex: c21 };
        }
      }
    } else if (i16.focus === c12.Next) {
      let d14 = e9.activeItemIndex;
      if (d14 !== null) {
        let o20 = e9.items[d14].dataRef.current.domRef,
          c21 = f14(i16, {
            resolveItems: () => e9.items,
            resolveActiveIndex: () => e9.activeItemIndex,
            resolveId: (u25) => u25.id,
            resolveDisabled: (u25) => u25.dataRef.current.disabled,
          });
        if (c21 !== null) {
          let u25 = e9.items[c21].dataRef.current.domRef;
          if (
            ((I10 = o20.current) == null ? void 0 : I10.nextElementSibling) ===
              u25.current ||
            ((f21 = u25.current) == null ? void 0 : f21.nextElementSibling) ===
              null
          )
            return { ...t14, activeItemIndex: c21 };
        }
      }
    }
    let n17 = x9(e9),
      r22 = f14(i16, {
        resolveItems: () => n17.items,
        resolveActiveIndex: () => n17.activeItemIndex,
        resolveId: (d14) => d14.id,
        resolveDisabled: (d14) => d14.dataRef.current.disabled,
      });
    return { ...t14, ...n17, activeItemIndex: r22 };
  },
  [3]: (e9, i16) => {
    let n17 = e9.searchQuery !== "" ? 0 : 1,
      r22 = e9.searchQuery + i16.value.toLowerCase(),
      l19 = (
        e9.activeItemIndex !== null
          ? e9.items
              .slice(e9.activeItemIndex + n17)
              .concat(e9.items.slice(0, e9.activeItemIndex + n17))
          : e9.items
      ).find((I10) => {
        var f21;
        return (
          ((f21 = I10.dataRef.current.textValue) == null
            ? void 0
            : f21.startsWith(r22)) && !I10.dataRef.current.disabled
        );
      }),
      a28 = l19 ? e9.items.indexOf(l19) : -1;
    return a28 === -1 || a28 === e9.activeItemIndex
      ? { ...e9, searchQuery: r22 }
      : { ...e9, searchQuery: r22, activeItemIndex: a28, activationTrigger: 1 };
  },
  [4](e9) {
    return e9.searchQuery === ""
      ? e9
      : { ...e9, searchQuery: "", searchActiveItemIndex: null };
  },
  [5]: (e9, i16) => {
    let t14 = e9.items.concat(i16.items.map((r22) => r22)),
      n17 = e9.activeItemIndex;
    return (
      e9.pendingFocus.focus !== c12.Nothing &&
        (n17 = f14(e9.pendingFocus, {
          resolveItems: () => t14,
          resolveActiveIndex: () => e9.activeItemIndex,
          resolveId: (r22) => r22.id,
          resolveDisabled: (r22) => r22.dataRef.current.disabled,
        })),
      {
        ...e9,
        items: t14,
        activeItemIndex: n17,
        pendingFocus: { focus: c12.Nothing },
        pendingShouldSort: true,
      }
    );
  },
  [6]: (e9, i16) => {
    let t14 = e9.items,
      n17 = [],
      r22 = new Set(i16.items);
    for (let [s20, l19] of t14.entries())
      if (
        r22.has(l19.id) &&
        (n17.push(s20), r22.delete(l19.id), r22.size === 0)
      )
        break;
    if (n17.length > 0) {
      t14 = t14.slice();
      for (let s20 of n17.reverse()) t14.splice(s20, 1);
    }
    return { ...e9, items: t14, activationTrigger: 1 };
  },
  [7]: (e9, i16) =>
    e9.buttonElement === i16.element
      ? e9
      : { ...e9, buttonElement: i16.element },
  [8]: (e9, i16) =>
    e9.itemsElement === i16.element ? e9 : { ...e9, itemsElement: i16.element },
  [9]: (e9) =>
    e9.pendingShouldSort ? { ...e9, ...x9(e9), pendingShouldSort: false } : e9,
  [10](e9) {
    return e9.buttonPositionState.kind !== "Tracked"
      ? e9
      : { ...e9, buttonPositionState: c16.Moved };
  },
};
var h11 = class _h extends T3 {
  constructor(t14) {
    super(t14);
    S9(this, "actions", {
      registerItem: k3(() => {
        let t15 = [],
          n17 = /* @__PURE__ */ new Set();
        return [
          (r22, s20) => {
            n17.has(s20) || (n17.add(s20), t15.push({ id: r22, dataRef: s20 }));
          },
          () => (n17.clear(), this.send({ type: 5, items: t15.splice(0) })),
        ];
      }),
      unregisterItem: k3(() => {
        let t15 = [];
        return [
          (n17) => t15.push(n17),
          () => this.send({ type: 6, items: t15.splice(0) }),
        ];
      }),
    });
    S9(this, "selectors", {
      activeDescendantId(t15) {
        var s20;
        let n17 = t15.activeItemIndex,
          r22 = t15.items;
        return n17 === null || (s20 = r22[n17]) == null ? void 0 : s20.id;
      },
      isActive(t15, n17) {
        var l19;
        let r22 = t15.activeItemIndex,
          s20 = t15.items;
        return r22 !== null
          ? ((l19 = s20[r22]) == null ? void 0 : l19.id) === n17
          : false;
      },
      shouldScrollIntoView(t15, n17) {
        return t15.__demoMode ||
          t15.menuState !== 0 ||
          t15.activationTrigger === 0
          ? false
          : this.isActive(t15, n17);
      },
      didButtonMove(t15) {
        return t15.buttonPositionState.kind === "Moved";
      },
    });
    this.on(5, () => {
      this.disposables.requestAnimationFrame(() => {
        this.send({ type: 9 });
      });
    });
    {
      let n17 = this.state.id,
        r22 = x2.get(null);
      (this.disposables.add(
        r22.on(k4.Push, (s20) => {
          !r22.selectors.isTop(s20, n17) &&
            this.state.menuState === 0 &&
            this.send({ type: 1 });
        }),
      ),
        this.on(0, () => r22.actions.push(n17)),
        this.on(1, () => r22.actions.pop(n17)));
    }
    this.disposables.group((n17) => {
      this.on(1, (r22) => {
        r22.buttonElement &&
          (n17.dispose(),
          n17.add(
            p6(r22.buttonElement, r22.buttonPositionState, () => {
              this.send({ type: 10 });
            }),
          ));
      });
    });
  }
  static new({ id: t14, __demoMode: n17 = false }) {
    return new _h({
      id: t14,
      __demoMode: n17,
      menuState: n17 ? 0 : 1,
      buttonElement: null,
      itemsElement: null,
      items: [],
      searchQuery: "",
      activeItemIndex: null,
      activationTrigger: 1,
      pendingShouldSort: false,
      pendingFocus: { focus: c12.Nothing },
      buttonPositionState: c16.Idle,
    });
  }
  reduce(t14, n17) {
    return u(n17.type, k10, t14, n17);
  }
};

// node_modules/@headlessui/react/dist/components/menu/menu-machine-glue.js
var import_react108 = __toESM(require_react(), 1);
var a25 = (0, import_react108.createContext)(null);
function p11(t14) {
  let n17 = (0, import_react108.useContext)(a25);
  if (n17 === null) {
    let e9 = new Error(`<${t14} /> is missing a parent <Menu /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, s17), e9);
  }
  return n17;
}
function s17({ id: t14, __demoMode: n17 = false }) {
  let e9 = (0, import_react108.useMemo)(
    () => h11.new({ id: t14, __demoMode: n17 }),
    [],
  );
  return (c13(() => e9.dispose()), e9);
}

// node_modules/@headlessui/react/dist/components/menu/menu.js
var Ze = import_react109.Fragment;
function et(m10, y10) {
  let l19 = (0, import_react51.useId)(),
    { __demoMode: a28 = false, ...p13 } = m10,
    s20 = s17({ id: l19, __demoMode: a28 }),
    [n17, M12, f21] = S3(s20, (d14) => [
      d14.menuState,
      d14.itemsElement,
      d14.buttonElement,
    ]),
    _10 = y(y10),
    o20 = x2.get(null),
    F7 = S3(
      o20,
      (0, import_react109.useCallback)(
        (d14) => o20.selectors.isTop(d14, l19),
        [o20, l19],
      ),
    );
  k5(F7, [f21, M12], (d14, T10) => {
    var P8;
    (s20.send({ type: C9.CloseMenu }),
      H4(T10, I4.Loose) ||
        (d14.preventDefault(),
        (P8 = s20.state.buttonElement) == null || P8.focus()));
  });
  let I10 = o4(() => {
      s20.send({ type: C9.CloseMenu });
    }),
    b14 = n2({ open: n17 === P7.Open, close: I10 }),
    i16 = { ref: _10 },
    g6 = K();
  return import_react109.default.createElement(
    Ae,
    null,
    import_react109.default.createElement(
      a25.Provider,
      { value: s20 },
      import_react109.default.createElement(
        c11,
        { value: u(n17, { [P7.Open]: i10.Open, [P7.Closed]: i10.Closed }) },
        g6({
          ourProps: i16,
          theirProps: p13,
          slot: b14,
          defaultTag: Ze,
          name: "Menu",
        }),
      ),
    ),
  );
}
var tt = "button";
function ot(m10, y10) {
  let l19 = p11("Menu.Button"),
    a28 = (0, import_react51.useId)(),
    {
      id: p13 = `headlessui-menu-button-${a28}`,
      disabled: s20 = false,
      autoFocus: n17 = false,
      ...M12
    } = m10,
    f21 = (0, import_react109.useRef)(null),
    _10 = be(),
    o20 = y(
      y10,
      f21,
      Fe(),
      o4((t14) => l19.send({ type: C9.SetButtonElement, element: t14 })),
    ),
    F7 = o4((t14) => {
      switch (t14.key) {
        case o8.Space:
        case o8.Enter:
        case o8.ArrowDown:
          (t14.preventDefault(),
            t14.stopPropagation(),
            l19.send({ type: C9.OpenMenu, focus: { focus: c12.First } }));
          break;
        case o8.ArrowUp:
          (t14.preventDefault(),
            t14.stopPropagation(),
            l19.send({ type: C9.OpenMenu, focus: { focus: c12.Last } }));
          break;
      }
    }),
    I10 = o4((t14) => {
      switch (t14.key) {
        case o8.Space:
          t14.preventDefault();
          break;
      }
    }),
    [b14, i16, g6] = S3(l19, (t14) => [
      t14.menuState,
      t14.buttonElement,
      t14.itemsElement,
    ]),
    d14 = b14 === P7.Open;
  L4(d14, {
    trigger: i16,
    action: (0, import_react109.useCallback)(
      (t14) => {
        if (i16 != null && i16.contains(t14.target)) return S5.Ignore;
        let S10 = t14.target.closest('[role="menuitem"]:not([data-disabled])');
        return n5(S10)
          ? S5.Select(S10)
          : g6 != null && g6.contains(t14.target)
            ? S5.Ignore
            : S5.Close;
      },
      [i16, g6],
    ),
    close: (0, import_react109.useCallback)(
      () => l19.send({ type: C9.CloseMenu }),
      [],
    ),
    select: (0, import_react109.useCallback)((t14) => t14.click(), []),
  });
  let T10 = s8((t14) => {
      var S10;
      s20 ||
        (b14 === P7.Open
          ? ((0, import_react_dom11.flushSync)(() =>
              l19.send({ type: C9.CloseMenu }),
            ),
            (S10 = f21.current) == null || S10.focus({ preventScroll: true }))
          : (t14.preventDefault(),
            l19.send({
              type: C9.OpenMenu,
              focus: { focus: c12.Nothing },
              trigger: D11.Pointer,
            })));
    }),
    { isFocusVisible: P8, focusProps: L7 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: n17 }),
    { isHovered: O5, hoverProps: v11 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: s20 }),
    { pressed: D12, pressProps: U3 } = w({ disabled: s20 }),
    H9 = n2({
      open: b14 === P7.Open,
      active: D12 || b14 === P7.Open,
      disabled: s20,
      hover: O5,
      focus: P8,
      autofocus: n17,
    }),
    G6 = V(
      _10(),
      {
        ref: o20,
        id: p13,
        type: e5(m10, f21.current),
        "aria-haspopup": "menu",
        "aria-controls": g6 == null ? void 0 : g6.id,
        "aria-expanded": b14 === P7.Open,
        disabled: s20 || void 0,
        autoFocus: n17,
        onKeyDown: F7,
        onKeyUp: I10,
      },
      T10,
      L7,
      v11,
      U3,
    );
  return K()({
    ourProps: G6,
    theirProps: M12,
    slot: H9,
    defaultTag: tt,
    name: "Menu.Button",
  });
}
var nt = "div";
var rt = A.RenderStrategy | A.Static;
function at(m10, y10) {
  let l19 = (0, import_react51.useId)(),
    {
      id: a28 = `headlessui-menu-items-${l19}`,
      anchor: p13,
      portal: s20 = false,
      modal: n17 = true,
      transition: M12 = false,
      ...f21
    } = m10,
    _10 = ye(p13),
    o20 = p11("Menu.Items"),
    [F7, I10] = Re(_10),
    b14 = Te(),
    [i16, g6] = (0, import_react109.useState)(null),
    d14 = y(
      y10,
      _10 ? F7 : null,
      o4((e9) => o20.send({ type: C9.SetItemsElement, element: e9 })),
      g6,
    ),
    [T10, P8] = S3(o20, (e9) => [e9.menuState, e9.buttonElement]),
    L7 = u13(P8),
    O5 = u13(i16);
  _10 && (s20 = true);
  let v11 = u17(),
    [D12, U3] = N2(
      M12,
      i16,
      v11 !== null ? (v11 & i10.Open) === i10.Open : T10 === P7.Open,
    );
  p5(D12, P8, () => {
    o20.send({ type: C9.CloseMenu });
  });
  let H9 = S3(o20, (e9) => e9.__demoMode),
    G6 = H9 ? false : n17 && T10 === P7.Open;
  f11(G6, O5);
  let w12 = H9 ? false : n17 && T10 === P7.Open;
  y4(w12, {
    allowed: (0, import_react109.useCallback)(() => [P8, i16], [P8, i16]),
  });
  let S10 = S3(o20, o20.selectors.didButtonMove) ? false : D12;
  ((0, import_react109.useEffect)(() => {
    let e9 = i16;
    e9 && T10 === P7.Open && (d2(e9) || e9.focus({ preventScroll: true }));
  }, [T10, i16]),
    F2(T10 === P7.Open, {
      container: i16,
      accept(e9) {
        return e9.getAttribute("role") === "menuitem"
          ? NodeFilter.FILTER_REJECT
          : e9.hasAttribute("role")
            ? NodeFilter.FILTER_SKIP
            : NodeFilter.FILTER_ACCEPT;
      },
      walk(e9) {
        e9.setAttribute("role", "none");
      },
    }));
  let z4 = p(),
    le = o4((e9) => {
      var N4, Y4, Z4;
      switch ((z4.dispose(), e9.key)) {
        case o8.Space:
          if (o20.state.searchQuery !== "")
            return (
              e9.preventDefault(),
              e9.stopPropagation(),
              o20.send({ type: C9.Search, value: e9.key })
            );
        case o8.Enter:
          if (
            (e9.preventDefault(),
            e9.stopPropagation(),
            o20.state.activeItemIndex !== null)
          ) {
            let { dataRef: de6 } = o20.state.items[o20.state.activeItemIndex];
            (Y4 = (N4 = de6.current) == null ? void 0 : N4.domRef.current) ==
              null || Y4.click();
          }
          (o20.send({ type: C9.CloseMenu }), K2(o20.state.buttonElement));
          break;
        case o8.ArrowDown:
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            o20.send({ type: C9.GoToItem, focus: c12.Next })
          );
        case o8.ArrowUp:
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            o20.send({ type: C9.GoToItem, focus: c12.Previous })
          );
        case o8.Home:
        case o8.PageUp:
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            o20.send({ type: C9.GoToItem, focus: c12.First })
          );
        case o8.End:
        case o8.PageDown:
          return (
            e9.preventDefault(),
            e9.stopPropagation(),
            o20.send({ type: C9.GoToItem, focus: c12.Last })
          );
        case o8.Escape:
          (e9.preventDefault(),
            e9.stopPropagation(),
            (0, import_react_dom11.flushSync)(() =>
              o20.send({ type: C9.CloseMenu }),
            ),
            (Z4 = o20.state.buttonElement) == null ||
              Z4.focus({ preventScroll: true }));
          break;
        case o8.Tab:
          (e9.preventDefault(),
            e9.stopPropagation(),
            (0, import_react_dom11.flushSync)(() =>
              o20.send({ type: C9.CloseMenu }),
            ),
            R3(o20.state.buttonElement, e9.shiftKey ? T4.Previous : T4.Next));
          break;
        default:
          e9.key.length === 1 &&
            (o20.send({ type: C9.Search, value: e9.key }),
            z4.setTimeout(() => o20.send({ type: C9.ClearSearch }), 350));
          break;
      }
    }),
    pe4 = o4((e9) => {
      switch (e9.key) {
        case o8.Space:
          e9.preventDefault();
          break;
      }
    }),
    ie4 = n2({ open: T10 === P7.Open }),
    ue5 = V(_10 ? b14() : {}, {
      "aria-activedescendant": S3(o20, o20.selectors.activeDescendantId),
      "aria-labelledby": S3(o20, (e9) => {
        var N4;
        return (N4 = e9.buttonElement) == null ? void 0 : N4.id;
      }),
      id: a28,
      onKeyDown: le,
      onKeyUp: pe4,
      role: "menu",
      tabIndex: T10 === P7.Open ? 0 : void 0,
      ref: d14,
      style: {
        ...f21.style,
        ...I10,
        "--button-width": w5(D12, P8, true).width,
      },
      ...x4(U3),
    }),
    me5 = K();
  return import_react109.default.createElement(
    te,
    { enabled: s20 ? m10.static || D12 : false, ownerDocument: L7 },
    me5({
      ourProps: ue5,
      theirProps: f21,
      slot: ie4,
      defaultTag: nt,
      features: rt,
      visible: S10,
      name: "Menu.Items",
    }),
  );
}
var st = import_react109.Fragment;
function lt(m10, y10) {
  let l19 = (0, import_react51.useId)(),
    {
      id: a28 = `headlessui-menu-item-${l19}`,
      disabled: p13 = false,
      ...s20
    } = m10,
    n17 = p11("Menu.Item"),
    M12 = S3(n17, (t14) => n17.selectors.isActive(t14, a28)),
    f21 = (0, import_react109.useRef)(null),
    _10 = y(y10, f21),
    o20 = S3(n17, (t14) => n17.selectors.shouldScrollIntoView(t14, a28));
  n(() => {
    if (o20)
      return o2().requestAnimationFrame(() => {
        var t14, S10;
        (S10 = (t14 = f21.current) == null ? void 0 : t14.scrollIntoView) ==
          null || S10.call(t14, { block: "nearest" });
      });
  }, [o20, f21]);
  let F7 = s16(f21),
    I10 = (0, import_react109.useRef)({
      disabled: p13,
      domRef: f21,
      get textValue() {
        return F7();
      },
    });
  (n(() => {
    I10.current.disabled = p13;
  }, [I10, p13]),
    n(
      () => (
        n17.actions.registerItem(a28, I10),
        () => n17.actions.unregisterItem(a28)
      ),
      [I10, a28],
    ));
  let b14 = o4(() => {
      n17.send({ type: C9.CloseMenu });
    }),
    i16 = o4((t14) => {
      if (p13) return t14.preventDefault();
      (n17.send({ type: C9.CloseMenu }), K2(n17.state.buttonElement));
    }),
    g6 = o4(() => {
      if (p13) return n17.send({ type: C9.GoToItem, focus: c12.Nothing });
      n17.send({ type: C9.GoToItem, focus: c12.Specific, id: a28 });
    }),
    d14 = u15(),
    T10 = o4((t14) => d14.update(t14)),
    P8 = o4((t14) => {
      d14.wasMoved(t14) &&
        (p13 ||
          M12 ||
          n17.send({
            type: C9.GoToItem,
            focus: c12.Specific,
            id: a28,
            trigger: D11.Pointer,
          }));
    }),
    L7 = o4((t14) => {
      d14.wasMoved(t14) &&
        (p13 ||
          (M12 &&
            n17.state.activationTrigger === D11.Pointer &&
            n17.send({ type: C9.GoToItem, focus: c12.Nothing })));
    }),
    [O5, v11] = V2(),
    [D12, U3] = H3(),
    H9 = n2({ active: M12, focus: M12, disabled: p13, close: b14 }),
    G6 = {
      id: a28,
      ref: _10,
      role: "menuitem",
      tabIndex: p13 === true ? void 0 : -1,
      "aria-disabled": p13 === true ? true : void 0,
      "aria-labelledby": O5,
      "aria-describedby": D12,
      disabled: void 0,
      onClick: i16,
      onFocus: g6,
      onPointerEnter: T10,
      onMouseEnter: T10,
      onPointerMove: P8,
      onMouseMove: P8,
      onPointerLeave: L7,
      onMouseLeave: L7,
    },
    w12 = K();
  return import_react109.default.createElement(
    v11,
    null,
    import_react109.default.createElement(
      U3,
      null,
      w12({
        ourProps: G6,
        theirProps: s20,
        slot: H9,
        defaultTag: st,
        name: "Menu.Item",
      }),
    ),
  );
}
var pt = "div";
function it(m10, y10) {
  let [l19, a28] = V2(),
    p13 = m10,
    s20 = { ref: y10, "aria-labelledby": l19, role: "group" },
    n17 = K();
  return import_react109.default.createElement(
    a28,
    null,
    n17({
      ourProps: s20,
      theirProps: p13,
      slot: {},
      defaultTag: pt,
      name: "Menu.Section",
    }),
  );
}
var ut = "header";
function mt(m10, y10) {
  let l19 = (0, import_react51.useId)(),
    { id: a28 = `headlessui-menu-heading-${l19}`, ...p13 } = m10,
    s20 = C4();
  n(() => s20.register(a28), [a28, s20.register]);
  let n17 = { id: a28, ref: y10, role: "presentation", ...s20.props };
  return K()({
    ourProps: n17,
    theirProps: p13,
    slot: {},
    defaultTag: ut,
    name: "Menu.Heading",
  });
}
var dt = "div";
function Tt(m10, y10) {
  let l19 = m10,
    a28 = { ref: y10, role: "separator" };
  return K()({
    ourProps: a28,
    theirProps: l19,
    slot: {},
    defaultTag: dt,
    name: "Menu.Separator",
  });
}
var ct = Y(et);
var ft = Y(ot);
var yt = Y(at);
var gt2 = Y(lt);
var Pt2 = Y(it);
var Et2 = Y(mt);
var Mt2 = Y(Tt);
var lo = Object.assign(ct, {
  Button: ft,
  Items: yt,
  Item: gt2,
  Section: Pt2,
  Heading: Et2,
  Separator: Mt2,
});

// node_modules/@headlessui/react/dist/components/popover/popover.js
var import_react111 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/components/popover/popover-machine.js
var f18 = Object.defineProperty;
var b12 = (t14, n17, e9) =>
  n17 in t14
    ? f18(t14, n17, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: e9,
      })
    : (t14[n17] = e9);
var p12 = (t14, n17, e9) => (
  b12(t14, typeof n17 != "symbol" ? n17 + "" : n17, e9),
  e9
);
var v9 = ((e9) => (
  (e9[(e9.Open = 0)] = "Open"),
  (e9[(e9.Closed = 1)] = "Closed"),
  e9
))(v9 || {});
var h13 = ((r22) => (
  (r22[(r22.OpenPopover = 0)] = "OpenPopover"),
  (r22[(r22.ClosePopover = 1)] = "ClosePopover"),
  (r22[(r22.SetButton = 2)] = "SetButton"),
  (r22[(r22.SetButtonId = 3)] = "SetButtonId"),
  (r22[(r22.SetPanel = 4)] = "SetPanel"),
  (r22[(r22.SetPanelId = 5)] = "SetPanelId"),
  r22
))(h13 || {});
var E11 = {
  [0]: (t14) =>
    t14.popoverState === 0
      ? t14
      : { ...t14, popoverState: 0, __demoMode: false },
  [1](t14) {
    return t14.popoverState === 1
      ? t14
      : { ...t14, popoverState: 1, __demoMode: false };
  },
  [2](t14, n17) {
    return t14.button === n17.button ? t14 : { ...t14, button: n17.button };
  },
  [3](t14, n17) {
    return t14.buttonId === n17.buttonId
      ? t14
      : { ...t14, buttonId: n17.buttonId };
  },
  [4](t14, n17) {
    return t14.panel === n17.panel ? t14 : { ...t14, panel: n17.panel };
  },
  [5](t14, n17) {
    return t14.panelId === n17.panelId ? t14 : { ...t14, panelId: n17.panelId };
  },
};
var d13 = class _d extends T3 {
  constructor(e9) {
    super(e9);
    p12(this, "actions", {
      close: () => this.send({ type: 1 }),
      refocusableClose: (e10) => {
        this.actions.close();
        let o20 = (() =>
          e10
            ? n5(e10)
              ? e10
              : "current" in e10 && n5(e10.current)
                ? e10.current
                : this.state.button
            : this.state.button)();
        o20 == null || o20.focus();
      },
      open: () => this.send({ type: 0 }),
      setButtonId: (e10) => this.send({ type: 3, buttonId: e10 }),
      setButton: (e10) => this.send({ type: 2, button: e10 }),
      setPanelId: (e10) => this.send({ type: 5, panelId: e10 }),
      setPanel: (e10) => this.send({ type: 4, panel: e10 }),
    });
    p12(this, "selectors", {
      isPortalled: (e10) => {
        var i16;
        if (!e10.button || !e10.panel) return false;
        let o20 = (i16 = l(e10.button)) != null ? i16 : document;
        for (let u25 of o20.querySelectorAll("body > *"))
          if (
            Number(u25 == null ? void 0 : u25.contains(e10.button)) ^
            Number(u25 == null ? void 0 : u25.contains(e10.panel))
          )
            return true;
        let l19 = x3(o20),
          s20 = l19.indexOf(e10.button),
          r22 = (s20 + l19.length - 1) % l19.length,
          c21 = (s20 + 1) % l19.length,
          S10 = l19[r22],
          m10 = l19[c21];
        return !e10.panel.contains(S10) && !e10.panel.contains(m10);
      },
    });
    {
      let o20 = this.state.id,
        l19 = x2.get(null);
      (this.on(0, () => l19.actions.push(o20)),
        this.on(1, () => l19.actions.pop(o20)));
    }
  }
  static new({ id: e9, __demoMode: o20 = false }) {
    return new _d({
      id: e9,
      __demoMode: o20,
      popoverState: o20 ? 0 : 1,
      buttons: { current: [] },
      button: null,
      buttonId: null,
      panel: null,
      panelId: null,
      beforePanelSentinel: { current: null },
      afterPanelSentinel: { current: null },
      afterButtonSentinel: { current: null },
    });
  }
  reduce(e9, o20) {
    return u(o20.type, E11, e9, o20);
  }
};

// node_modules/@headlessui/react/dist/components/popover/popover-machine-glue.js
var import_react110 = __toESM(require_react(), 1);
var a26 = (0, import_react110.createContext)(null);
function u24(r22) {
  let o20 = (0, import_react110.useContext)(a26);
  if (o20 === null) {
    let e9 = new Error(`<${r22} /> is missing a parent <Popover /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, u24), e9);
  }
  return o20;
}
function f19({ id: r22, __demoMode: o20 = false }) {
  let e9 = (0, import_react110.useMemo)(
    () => d13.new({ id: r22, __demoMode: o20 }),
    [],
  );
  return (c13(() => e9.dispose()), e9);
}

// node_modules/@headlessui/react/dist/components/popover/popover.js
var Fe3 = (0, import_react111.createContext)(null);
Fe3.displayName = "PopoverGroupContext";
function we2() {
  return (0, import_react111.useContext)(Fe3);
}
var de5 = (0, import_react111.createContext)(null);
de5.displayName = "PopoverPanelContext";
function mt2() {
  return (0, import_react111.useContext)(de5);
}
var vt2 = "div";
function Tt2(E13, O5) {
  var M12;
  let R7 = (0, import_react51.useId)(),
    { __demoMode: B2 = false, ...T10 } = E13,
    n17 = f19({ id: R7, __demoMode: B2 }),
    b14 = (0, import_react111.useRef)(null),
    t14 = y(
      O5,
      T((r22) => {
        b14.current = r22;
      }),
    ),
    [A5, d14, o20, C11, y10] = S3(
      n17,
      (0, import_react111.useCallback)(
        (r22) => [
          r22.popoverState,
          r22.button,
          r22.panel,
          r22.buttonId,
          r22.panelId,
        ],
        [],
      ),
    ),
    D12 = c6((M12 = b14.current) != null ? M12 : d14),
    _10 = s3(C11),
    a28 = s3(y10),
    u25 = (0, import_react111.useMemo)(
      () => ({ buttonId: _10, panelId: a28, close: n17.actions.close }),
      [_10, a28, n17],
    ),
    f21 = we2(),
    l19 = f21 == null ? void 0 : f21.registerPopover,
    c21 = o4(() => {
      var F7, G6;
      let r22 = e((F7 = b14.current) != null ? F7 : d14);
      return (G6 = f21 == null ? void 0 : f21.isFocusWithinPopoverGroup()) !=
        null
        ? G6
        : r22 &&
            ((d14 == null ? void 0 : d14.contains(r22)) ||
              (o20 == null ? void 0 : o20.contains(r22)));
    });
  (0, import_react111.useEffect)(
    () => (l19 == null ? void 0 : l19(u25)),
    [l19, u25],
  );
  let [m10, W5] = ee(),
    V6 = x6(d14),
    j11 = S8({
      mainTreeNode: V6,
      portals: m10,
      defaultContainers: [
        {
          get current() {
            return n17.state.button;
          },
        },
        {
          get current() {
            return n17.state.panel;
          },
        },
      ],
    });
  E7(
    D12,
    "focus",
    (r22) => {
      var F7, G6, h15, k13, I10, H9;
      r22.target !== window &&
        i4(r22.target) &&
        n17.state.popoverState === v9.Open &&
        (c21() ||
          (n17.state.button &&
            n17.state.panel &&
            (j11.contains(r22.target) ||
              ((G6 =
                (F7 = n17.state.beforePanelSentinel.current) == null
                  ? void 0
                  : F7.contains) != null &&
                G6.call(F7, r22.target)) ||
              ((k13 =
                (h15 = n17.state.afterPanelSentinel.current) == null
                  ? void 0
                  : h15.contains) != null &&
                k13.call(h15, r22.target)) ||
              ((H9 =
                (I10 = n17.state.afterButtonSentinel.current) == null
                  ? void 0
                  : I10.contains) != null &&
                H9.call(I10, r22.target)) ||
              n17.actions.close())));
    },
    true,
  );
  let L7 = A5 === v9.Open;
  k5(L7, j11.resolveContainers, (r22, F7) => {
    (n17.actions.close(),
      H4(F7, I4.Loose) || (r22.preventDefault(), d14 == null || d14.focus()));
  });
  let Y4 = n2({ open: A5 === v9.Open, close: n17.actions.refocusableClose }),
    $6 = S3(
      n17,
      (0, import_react111.useCallback)(
        (r22) =>
          u(r22.popoverState, { [v9.Open]: i10.Open, [v9.Closed]: i10.Closed }),
        [],
      ),
    ),
    Q7 = { ref: t14 },
    Z4 = K();
  return import_react111.default.createElement(
    j9,
    { node: V6 },
    import_react111.default.createElement(
      Ae,
      null,
      import_react111.default.createElement(
        de5.Provider,
        { value: null },
        import_react111.default.createElement(
          a26.Provider,
          { value: n17 },
          import_react111.default.createElement(
            C5,
            { value: n17.actions.refocusableClose },
            import_react111.default.createElement(
              c11,
              { value: $6 },
              import_react111.default.createElement(
                W5,
                null,
                Z4({
                  ourProps: Q7,
                  theirProps: T10,
                  slot: Y4,
                  defaultTag: vt2,
                  name: "Popover",
                }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
var Et3 = "button";
function bt(E13, O5) {
  let R7 = (0, import_react51.useId)(),
    {
      id: B2 = `headlessui-popover-button-${R7}`,
      disabled: T10 = false,
      autoFocus: n17 = false,
      ...b14
    } = E13,
    t14 = u24("Popover.Button"),
    [A5, d14, o20, C11, y10, D12, _10] = S3(
      t14,
      (0, import_react111.useCallback)(
        (e9) => [
          e9.popoverState,
          t14.selectors.isPortalled(e9),
          e9.button,
          e9.buttonId,
          e9.panel,
          e9.panelId,
          e9.afterButtonSentinel,
        ],
        [],
      ),
    ),
    a28 = (0, import_react111.useRef)(null),
    u25 = `headlessui-focus-sentinel-${(0, import_react51.useId)()}`,
    f21 = we2(),
    l19 = f21 == null ? void 0 : f21.closeOthers,
    m10 = mt2() !== null;
  (0, import_react111.useEffect)(() => {
    if (!m10)
      return (t14.actions.setButtonId(B2), () => t14.actions.setButtonId(null));
  }, [m10, B2, t14]);
  let [W5] = (0, import_react111.useState)(() => Symbol()),
    V6 = y(
      a28,
      O5,
      Fe(),
      o4((e9) => {
        if (!m10) {
          if (e9) t14.state.buttons.current.push(W5);
          else {
            let p13 = t14.state.buttons.current.indexOf(W5);
            p13 !== -1 && t14.state.buttons.current.splice(p13, 1);
          }
          (t14.state.buttons.current.length > 1 &&
            console.warn(
              "You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported.",
            ),
            e9 && t14.actions.setButton(e9));
        }
      }),
    ),
    j11 = y(a28, O5),
    L7 = o4((e9) => {
      var p13, i16, x10;
      if (m10) {
        if (t14.state.popoverState === v9.Closed) return;
        switch (e9.key) {
          case o8.Space:
          case o8.Enter:
            (e9.preventDefault(),
              (i16 = (p13 = e9.target).click) == null || i16.call(p13),
              t14.actions.close(),
              (x10 = t14.state.button) == null || x10.focus());
            break;
        }
      } else
        switch (e9.key) {
          case o8.Space:
          case o8.Enter:
            (e9.preventDefault(),
              e9.stopPropagation(),
              t14.state.popoverState === v9.Closed
                ? (l19 == null || l19(t14.state.buttonId), t14.actions.open())
                : t14.actions.close());
            break;
          case o8.Escape:
            if (t14.state.popoverState !== v9.Open)
              return l19 == null ? void 0 : l19(t14.state.buttonId);
            if (!a28.current) return;
            let S10 = e(a28.current);
            if (S10 && !a28.current.contains(S10)) return;
            (e9.preventDefault(), e9.stopPropagation(), t14.actions.close());
            break;
        }
    }),
    Y4 = o4((e9) => {
      m10 || (e9.key === o8.Space && e9.preventDefault());
    }),
    $6 = o4((e9) => {
      var p13, i16;
      s6(e9.currentTarget) ||
        T10 ||
        (m10
          ? (t14.actions.close(),
            (p13 = t14.state.button) == null || p13.focus())
          : (e9.preventDefault(),
            e9.stopPropagation(),
            t14.state.popoverState === v9.Closed
              ? (l19 == null || l19(t14.state.buttonId), t14.actions.open())
              : t14.actions.close(),
            (i16 = t14.state.button) == null || i16.focus()));
    }),
    Q7 = o4((e9) => {
      (e9.preventDefault(), e9.stopPropagation());
    }),
    { isFocusVisible: Z4, focusProps: M12 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: n17 }),
    { isHovered: r22, hoverProps: F7 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: T10 }),
    { pressed: G6, pressProps: h15 } = w({ disabled: T10 }),
    k13 = A5 === v9.Open,
    I10 = n2({
      open: k13,
      active: G6 || k13,
      disabled: T10,
      hover: r22,
      focus: Z4,
      autofocus: n17,
    }),
    H9 = e5(E13, o20),
    fe7 = m10
      ? V(
          {
            ref: j11,
            type: H9,
            onKeyDown: L7,
            onClick: $6,
            disabled: T10 || void 0,
            autoFocus: n17,
          },
          M12,
          F7,
          h15,
        )
      : V(
          {
            ref: V6,
            id: C11,
            type: H9,
            "aria-expanded": A5 === v9.Open,
            "aria-controls": y10 ? D12 : void 0,
            disabled: T10 || void 0,
            autoFocus: n17,
            onKeyDown: L7,
            onKeyUp: Y4,
            onClick: $6,
            onMouseDown: Q7,
          },
          M12,
          F7,
          h15,
        ),
    ae5 = u21(),
    Pe2 = o4(() => {
      if (!n5(t14.state.panel)) return;
      let e9 = t14.state.panel;
      function p13() {
        u(ae5.current, {
          [a21.Forwards]: () => v5(e9, T4.First),
          [a21.Backwards]: () => v5(e9, T4.Last),
        }) === A2.Error &&
          v5(
            x3(r3(t14.state.button)).filter(
              (x10) => x10.dataset.headlessuiFocusGuard !== "true",
            ),
            u(ae5.current, {
              [a21.Forwards]: T4.Next,
              [a21.Backwards]: T4.Previous,
            }),
            { relativeTo: t14.state.button },
          );
      }
      p13();
    }),
    s20 = K();
  return import_react111.default.createElement(
    import_react111.default.Fragment,
    null,
    s20({
      ourProps: fe7,
      theirProps: b14,
      slot: I10,
      defaultTag: Et3,
      name: "Popover.Button",
    }),
    k13 &&
      !m10 &&
      d14 &&
      import_react111.default.createElement(f4, {
        id: u25,
        ref: _10,
        features: s5.Focusable,
        "data-headlessui-focus-guard": true,
        as: "button",
        type: "button",
        onFocus: Pe2,
      }),
  );
}
var yt2 = "div";
var gt3 = A.RenderStrategy | A.Static;
function Ne2(E13, O5) {
  let R7 = (0, import_react51.useId)(),
    {
      id: B2 = `headlessui-popover-backdrop-${R7}`,
      transition: T10 = false,
      ...n17
    } = E13,
    b14 = u24("Popover.Backdrop"),
    t14 = S3(
      b14,
      (0, import_react111.useCallback)((l19) => l19.popoverState, []),
    ),
    [A5, d14] = (0, import_react111.useState)(null),
    o20 = y(O5, d14),
    C11 = u17(),
    [y10, D12] = N2(
      T10,
      A5,
      C11 !== null ? (C11 & i10.Open) === i10.Open : t14 === v9.Open,
    ),
    _10 = o4((l19) => {
      if (s6(l19.currentTarget)) return l19.preventDefault();
      b14.actions.close();
    }),
    a28 = n2({ open: t14 === v9.Open }),
    u25 = { ref: o20, id: B2, "aria-hidden": true, onClick: _10, ...x4(D12) };
  return K()({
    ourProps: u25,
    theirProps: n17,
    slot: a28,
    defaultTag: yt2,
    features: gt3,
    visible: y10,
    name: "Popover.Backdrop",
  });
}
var Rt2 = "div";
var Ft2 = A.RenderStrategy | A.Static;
function Bt2(E13, O5) {
  let R7 = (0, import_react51.useId)(),
    {
      id: B2 = `headlessui-popover-panel-${R7}`,
      focus: T10 = false,
      anchor: n17,
      portal: b14 = false,
      modal: t14 = false,
      transition: A5 = false,
      ...d14
    } = E13,
    o20 = u24("Popover.Panel"),
    C11 = S3(o20, o20.selectors.isPortalled),
    [y10, D12, _10, a28, u25] = S3(
      o20,
      (0, import_react111.useCallback)(
        (s20) => [
          s20.popoverState,
          s20.button,
          s20.__demoMode,
          s20.beforePanelSentinel,
          s20.afterPanelSentinel,
        ],
        [],
      ),
    ),
    f21 = `headlessui-focus-sentinel-before-${R7}`,
    l19 = `headlessui-focus-sentinel-after-${R7}`,
    c21 = (0, import_react111.useRef)(null),
    m10 = ye(n17),
    [W5, V6] = Re(m10),
    j11 = Te();
  m10 && (b14 = true);
  let [L7, Y4] = (0, import_react111.useState)(null),
    $6 = y(c21, O5, m10 ? W5 : null, o20.actions.setPanel, Y4),
    Q7 = u13(D12),
    Z4 = u13(c21.current);
  n(
    () => (o20.actions.setPanelId(B2), () => o20.actions.setPanelId(null)),
    [B2, o20],
  );
  let M12 = u17(),
    [r22, F7] = N2(
      A5,
      L7,
      M12 !== null ? (M12 & i10.Open) === i10.Open : y10 === v9.Open,
    );
  (p5(r22, D12, o20.actions.close), f11(_10 ? false : t14 && r22, Z4));
  let h15 = o4((s20) => {
    var e9;
    switch (s20.key) {
      case o8.Escape:
        if (o20.state.popoverState !== v9.Open || !c21.current) return;
        let p13 = e(c21.current);
        if (p13 && !c21.current.contains(p13)) return;
        (s20.preventDefault(),
          s20.stopPropagation(),
          o20.actions.close(),
          (e9 = o20.state.button) == null || e9.focus());
        break;
    }
  });
  ((0, import_react111.useEffect)(() => {
    var s20;
    E13.static ||
      (y10 === v9.Closed &&
        ((s20 = E13.unmount) == null || s20) &&
        o20.actions.setPanel(null));
  }, [y10, E13.unmount, E13.static, o20]),
    (0, import_react111.useEffect)(() => {
      if (_10 || !T10 || y10 !== v9.Open || !c21.current) return;
      let s20 = e(c21.current);
      c21.current.contains(s20) || v5(c21.current, T4.First);
    }, [_10, T10, c21.current, y10]));
  let k13 = n2({ open: y10 === v9.Open, close: o20.actions.refocusableClose }),
    I10 = V(m10 ? j11() : {}, {
      ref: $6,
      id: B2,
      onKeyDown: h15,
      onBlur:
        T10 && y10 === v9.Open
          ? (s20) => {
              var p13, i16, x10, S10, me5;
              let e9 = s20.relatedTarget;
              e9 &&
                c21.current &&
                (((p13 = c21.current) != null && p13.contains(e9)) ||
                  (o20.actions.close(),
                  (((x10 =
                    (i16 = a28.current) == null ? void 0 : i16.contains) !=
                    null &&
                    x10.call(i16, e9)) ||
                    ((me5 =
                      (S10 = u25.current) == null ? void 0 : S10.contains) !=
                      null &&
                      me5.call(S10, e9))) &&
                    e9.focus({ preventScroll: true })));
            }
          : void 0,
      tabIndex: -1,
      style: {
        ...d14.style,
        ...V6,
        "--button-width": w5(r22, D12, true).width,
      },
      ...x4(F7),
    }),
    H9 = u21(),
    fe7 = o4(() => {
      let s20 = c21.current;
      if (!s20) return;
      function e9() {
        u(H9.current, {
          [a21.Forwards]: () => {
            var i16;
            v5(s20, T4.First) === A2.Error &&
              ((i16 = o20.state.afterPanelSentinel.current) == null ||
                i16.focus());
          },
          [a21.Backwards]: () => {
            var p13;
            (p13 = o20.state.button) == null ||
              p13.focus({ preventScroll: true });
          },
        });
      }
      e9();
    }),
    ae5 = o4(() => {
      let s20 = c21.current;
      if (!s20) return;
      function e9() {
        u(H9.current, {
          [a21.Forwards]: () => {
            var Be4;
            if (!o20.state.button) return;
            let p13 =
                (Be4 = r3(o20.state.button)) != null ? Be4 : document.body,
              i16 = x3(p13),
              x10 = i16.indexOf(o20.state.button),
              S10 = i16.slice(0, x10 + 1),
              se2 = [...i16.slice(x10 + 1), ...S10];
            for (let ve3 of se2.slice())
              if (
                ve3.dataset.headlessuiFocusGuard === "true" ||
                (L7 != null && L7.contains(ve3))
              ) {
                let Ae7 = se2.indexOf(ve3);
                Ae7 !== -1 && se2.splice(Ae7, 1);
              }
            v5(se2, T4.First, { sorted: false });
          },
          [a21.Backwards]: () => {
            var i16;
            v5(s20, T4.Previous) === A2.Error &&
              ((i16 = o20.state.button) == null || i16.focus());
          },
        });
      }
      e9();
    }),
    Pe2 = K();
  return import_react111.default.createElement(
    s13,
    null,
    import_react111.default.createElement(
      de5.Provider,
      { value: B2 },
      import_react111.default.createElement(
        C5,
        { value: o20.actions.refocusableClose },
        import_react111.default.createElement(
          te,
          { enabled: b14 ? E13.static || r22 : false, ownerDocument: Q7 },
          r22 &&
            C11 &&
            import_react111.default.createElement(f4, {
              id: f21,
              ref: a28,
              features: s5.Focusable,
              "data-headlessui-focus-guard": true,
              as: "button",
              type: "button",
              onFocus: fe7,
            }),
          Pe2({
            ourProps: I10,
            theirProps: d14,
            slot: k13,
            defaultTag: Rt2,
            features: Ft2,
            visible: r22,
            name: "Popover.Panel",
          }),
          r22 &&
            C11 &&
            import_react111.default.createElement(f4, {
              id: l19,
              ref: u25,
              features: s5.Focusable,
              "data-headlessui-focus-guard": true,
              as: "button",
              type: "button",
              onFocus: ae5,
            }),
        ),
      ),
    ),
  );
}
var At2 = "div";
function _t2(E13, O5) {
  let R7 = (0, import_react111.useRef)(null),
    B2 = y(R7, O5),
    [T10, n17] = (0, import_react111.useState)([]),
    b14 = o4((a28) => {
      n17((u25) => {
        let f21 = u25.indexOf(a28);
        if (f21 !== -1) {
          let l19 = u25.slice();
          return (l19.splice(f21, 1), l19);
        }
        return u25;
      });
    }),
    t14 = o4((a28) => (n17((u25) => [...u25, a28]), () => b14(a28))),
    A5 = o4(() => {
      var f21;
      let a28 = r3(R7.current);
      if (!a28) return false;
      let u25 = e(R7.current);
      return (f21 = R7.current) != null && f21.contains(u25)
        ? true
        : T10.some((l19) => {
            var c21, m10;
            return (
              ((c21 = a28.getElementById(l19.buttonId.current)) == null
                ? void 0
                : c21.contains(u25)) ||
              ((m10 = a28.getElementById(l19.panelId.current)) == null
                ? void 0
                : m10.contains(u25))
            );
          });
    }),
    d14 = o4((a28) => {
      for (let u25 of T10) u25.buttonId.current !== a28 && u25.close();
    }),
    o20 = (0, import_react111.useMemo)(
      () => ({
        registerPopover: t14,
        unregisterPopover: b14,
        isFocusWithinPopoverGroup: A5,
        closeOthers: d14,
      }),
      [t14, b14, A5, d14],
    ),
    C11 = n2({}),
    y10 = E13,
    D12 = { ref: B2 },
    _10 = K();
  return import_react111.default.createElement(
    j9,
    null,
    import_react111.default.createElement(
      Fe3.Provider,
      { value: o20 },
      _10({
        ourProps: D12,
        theirProps: y10,
        slot: C11,
        defaultTag: At2,
        name: "Popover.Group",
      }),
    ),
  );
}
var Ct2 = Y(Tt2);
var Dt2 = Y(bt);
var Ot = Y(Ne2);
var xt2 = Y(Ne2);
var Lt2 = Y(Bt2);
var ht3 = Y(_t2);
var vo = Object.assign(Ct2, {
  Button: Dt2,
  Backdrop: xt2,
  Overlay: Ot,
  Panel: Lt2,
  Group: ht3,
});

// node_modules/@headlessui/react/dist/components/radio-group/radio-group.js
var import_react112 = __toESM(require_react(), 1);
var Ie3 = ((e9) => (
  (e9[(e9.RegisterOption = 0)] = "RegisterOption"),
  (e9[(e9.UnregisterOption = 1)] = "UnregisterOption"),
  e9
))(Ie3 || {});
var Fe4 = {
  [0](o20, t14) {
    let e9 = [
      ...o20.options,
      { id: t14.id, element: t14.element, propsRef: t14.propsRef },
    ];
    return { ...o20, options: G2(e9, (n17) => n17.element.current) };
  },
  [1](o20, t14) {
    let e9 = o20.options.slice(),
      n17 = o20.options.findIndex((P8) => P8.id === t14.id);
    return n17 === -1 ? o20 : (e9.splice(n17, 1), { ...o20, options: e9 });
  },
};
var X4 = (0, import_react112.createContext)(null);
X4.displayName = "RadioGroupDataContext";
function z2(o20) {
  let t14 = (0, import_react112.useContext)(X4);
  if (t14 === null) {
    let e9 = new Error(
      `<${o20} /> is missing a parent <RadioGroup /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, z2), e9);
  }
  return t14;
}
var q3 = (0, import_react112.createContext)(null);
q3.displayName = "RadioGroupActionsContext";
function Q5(o20) {
  let t14 = (0, import_react112.useContext)(q3);
  if (t14 === null) {
    let e9 = new Error(
      `<${o20} /> is missing a parent <RadioGroup /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(e9, Q5), e9);
  }
  return t14;
}
function Ue2(o20, t14) {
  return u(t14.type, Fe4, o20, t14);
}
var we3 = "div";
function Se3(o20, t14) {
  let e9 = (0, import_react51.useId)(),
    n17 = a3(),
    {
      id: P8 = `headlessui-radiogroup-${e9}`,
      value: R7,
      form: D12,
      name: i16,
      onChange: c21,
      by: d14,
      disabled: a28 = n17 || false,
      defaultValue: h15,
      tabIndex: f21 = 0,
      ...L7
    } = o20,
    T10 = u9(d14),
    [v11, y10] = (0, import_react112.useReducer)(Ue2, { options: [] }),
    p13 = v11.options,
    [k13, G6] = V2(),
    [I10, F7] = H3(),
    E13 = (0, import_react112.useRef)(null),
    m10 = y(E13, t14),
    b14 = l3(h15),
    [s20, x10] = b2(R7, c21, b14),
    g6 = (0, import_react112.useMemo)(
      () => p13.find((r22) => !r22.propsRef.current.disabled),
      [p13],
    ),
    O5 = (0, import_react112.useMemo)(
      () => p13.some((r22) => T10(r22.propsRef.current.value, s20)),
      [p13, s20],
    ),
    l19 = o4((r22) => {
      var U3;
      if (a28 || T10(r22, s20)) return false;
      let S10 =
        (U3 = p13.find((u25) => T10(u25.propsRef.current.value, r22))) == null
          ? void 0
          : U3.propsRef.current;
      return S10 != null && S10.disabled
        ? false
        : (x10 == null || x10(r22), true);
    }),
    ce3 = o4((r22) => {
      if (!E13.current) return;
      let U3 = p13
        .filter((u25) => u25.propsRef.current.disabled === false)
        .map((u25) => u25.element.current);
      switch (r22.key) {
        case o8.Enter:
          g(r22.currentTarget);
          break;
        case o8.ArrowLeft:
        case o8.ArrowUp:
          if (
            (r22.preventDefault(),
            r22.stopPropagation(),
            v5(U3, T4.Previous | T4.WrapAround) === A2.Success)
          ) {
            let A5 = p13.find((N4) => d2(N4.element.current));
            A5 && l19(A5.propsRef.current.value);
          }
          break;
        case o8.ArrowRight:
        case o8.ArrowDown:
          if (
            (r22.preventDefault(),
            r22.stopPropagation(),
            v5(U3, T4.Next | T4.WrapAround) === A2.Success)
          ) {
            let A5 = p13.find((N4) => d2(N4.element.current));
            A5 && l19(A5.propsRef.current.value);
          }
          break;
        case o8.Space:
          {
            (r22.preventDefault(), r22.stopPropagation());
            let u25 = p13.find((A5) => d2(A5.element.current));
            u25 && l19(u25.propsRef.current.value);
          }
          break;
      }
    }),
    Y4 = o4(
      (r22) => (y10({ type: 0, ...r22 }), () => y10({ type: 1, id: r22.id })),
    ),
    fe7 = (0, import_react112.useMemo)(
      () => ({
        value: s20,
        firstOption: g6,
        containsCheckedOption: O5,
        disabled: a28,
        compare: T10,
        tabIndex: f21,
        ...v11,
      }),
      [s20, g6, O5, a28, T10, f21, v11],
    ),
    Te5 = (0, import_react112.useMemo)(
      () => ({ registerOption: Y4, change: l19 }),
      [Y4, l19],
    ),
    me5 = {
      ref: m10,
      id: P8,
      role: "radiogroup",
      "aria-labelledby": k13,
      "aria-describedby": I10,
      onKeyDown: ce3,
    },
    Re4 = n2({ value: s20 }),
    ye4 = (0, import_react112.useCallback)(() => {
      if (b14 !== void 0) return l19(b14);
    }, [l19, b14]),
    be3 = K();
  return import_react112.default.createElement(
    F7,
    { name: "RadioGroup.Description" },
    import_react112.default.createElement(
      G6,
      { name: "RadioGroup.Label" },
      import_react112.default.createElement(
        q3.Provider,
        { value: Te5 },
        import_react112.default.createElement(
          X4.Provider,
          { value: fe7 },
          i16 != null &&
            import_react112.default.createElement(j2, {
              disabled: a28,
              data: { [i16]: s20 || "on" },
              overrides: { type: "radio", checked: s20 != null },
              form: D12,
              onReset: ye4,
            }),
          be3({
            ourProps: me5,
            theirProps: L7,
            slot: Re4,
            defaultTag: we3,
            name: "RadioGroup",
          }),
        ),
      ),
    ),
  );
}
var Me = "div";
function He3(o20, t14) {
  var g6;
  let e9 = z2("RadioGroup.Option"),
    n17 = Q5("RadioGroup.Option"),
    P8 = (0, import_react51.useId)(),
    {
      id: R7 = `headlessui-radiogroup-option-${P8}`,
      value: D12,
      disabled: i16 = e9.disabled || false,
      autoFocus: c21 = false,
      ...d14
    } = o20,
    a28 = (0, import_react112.useRef)(null),
    h15 = y(a28, t14),
    [f21, L7] = V2(),
    [T10, v11] = H3(),
    y10 = s3({ value: D12, disabled: i16 });
  n(
    () => n17.registerOption({ id: R7, element: a28, propsRef: y10 }),
    [R7, n17, a28, y10],
  );
  let p13 = o4((O5) => {
      var l19;
      if (s6(O5.currentTarget)) return O5.preventDefault();
      n17.change(D12) && ((l19 = a28.current) == null || l19.focus());
    }),
    k13 = ((g6 = e9.firstOption) == null ? void 0 : g6.id) === R7,
    { isFocusVisible: G6, focusProps: I10 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: c21 }),
    { isHovered: F7, hoverProps: E13 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: i16 }),
    m10 = e9.compare(e9.value, D12),
    b14 = V(
      {
        ref: h15,
        id: R7,
        role: "radio",
        "aria-checked": m10 ? "true" : "false",
        "aria-labelledby": f21,
        "aria-describedby": T10,
        "aria-disabled": i16 ? true : void 0,
        tabIndex: (() =>
          i16
            ? -1
            : m10 || (!e9.containsCheckedOption && k13)
              ? e9.tabIndex
              : -1)(),
        onClick: i16 ? void 0 : p13,
        autoFocus: c21,
      },
      I10,
      E13,
    ),
    s20 = n2({
      checked: m10,
      disabled: i16,
      active: G6,
      hover: F7,
      focus: G6,
      autofocus: c21,
    }),
    x10 = K();
  return import_react112.default.createElement(
    v11,
    { name: "RadioGroup.Description" },
    import_react112.default.createElement(
      L7,
      { name: "RadioGroup.Label" },
      x10({
        ourProps: b14,
        theirProps: d14,
        slot: s20,
        defaultTag: Me,
        name: "RadioGroup.Option",
      }),
    ),
  );
}
var Ne3 = "span";
function We2(o20, t14) {
  var g6;
  let e9 = z2("Radio"),
    n17 = Q5("Radio"),
    P8 = (0, import_react51.useId)(),
    R7 = u4(),
    D12 = a3(),
    {
      id: i16 = R7 || `headlessui-radio-${P8}`,
      value: c21,
      disabled: d14 = e9.disabled || D12 || false,
      autoFocus: a28 = false,
      ...h15
    } = o20,
    f21 = (0, import_react112.useRef)(null),
    L7 = y(f21, t14),
    T10 = N(),
    v11 = w3(),
    y10 = s3({ value: c21, disabled: d14 });
  n(
    () => n17.registerOption({ id: i16, element: f21, propsRef: y10 }),
    [i16, n17, f21, y10],
  );
  let p13 = o4((O5) => {
      var l19;
      if (s6(O5.currentTarget)) return O5.preventDefault();
      n17.change(c21) && ((l19 = f21.current) == null || l19.focus());
    }),
    { isFocusVisible: k13, focusProps: G6 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: a28 }),
    { isHovered: I10, hoverProps: F7 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: d14 }),
    E13 = ((g6 = e9.firstOption) == null ? void 0 : g6.id) === i16,
    m10 = e9.compare(e9.value, c21),
    b14 = V(
      {
        ref: L7,
        id: i16,
        role: "radio",
        "aria-checked": m10 ? "true" : "false",
        "aria-labelledby": T10,
        "aria-describedby": v11,
        "aria-disabled": d14 ? true : void 0,
        tabIndex: (() =>
          d14
            ? -1
            : m10 || (!e9.containsCheckedOption && E13)
              ? e9.tabIndex
              : -1)(),
        autoFocus: a28,
        onClick: d14 ? void 0 : p13,
      },
      G6,
      F7,
    ),
    s20 = n2({
      checked: m10,
      disabled: d14,
      hover: I10,
      focus: k13,
      autofocus: a28,
    });
  return K()({
    ourProps: b14,
    theirProps: h15,
    slot: s20,
    defaultTag: Ne3,
    name: "Radio",
  });
}
var Be2 = Y(Se3);
var Ve2 = Y(He3);
var Ke4 = Y(We2);
var $e2 = Z;
var je2 = M2;
var yt3 = Object.assign(Be2, {
  Option: Ve2,
  Radio: Ke4,
  Label: $e2,
  Description: je2,
});

// node_modules/@headlessui/react/dist/components/select/select.js
var H7 = "select";
function B(r22, l19) {
  let s20 = (0, import_react51.useId)(),
    a28 = u4(),
    i16 = a3(),
    {
      id: p13 = a28 || `headlessui-select-${s20}`,
      disabled: e9 = i16 || false,
      invalid: t14 = false,
      autoFocus: o20 = false,
      ...d14
    } = r22,
    n17 = N(),
    c21 = w3(),
    { isFocusVisible: m10, focusProps: f21 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: o20 }),
    { isHovered: u25, hoverProps: T10 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e9 }),
    { pressed: b14, pressProps: y10 } = w({ disabled: e9 }),
    P8 = V(
      {
        ref: l19,
        id: p13,
        "aria-labelledby": n17,
        "aria-describedby": c21,
        "aria-invalid": t14 ? "true" : void 0,
        disabled: e9 || void 0,
        autoFocus: o20,
      },
      f21,
      T10,
      y10,
    ),
    S10 = n2({
      disabled: e9,
      invalid: t14,
      hover: u25,
      focus: m10,
      active: b14,
      autofocus: o20,
    });
  return K()({
    ourProps: P8,
    theirProps: d14,
    slot: S10,
    defaultTag: H7,
    name: "Select",
  });
}
var k12 = Y(B);

// node_modules/@headlessui/react/dist/components/switch/switch.js
var import_react113 = __toESM(require_react(), 1);
var E12 = (0, import_react113.createContext)(null);
E12.displayName = "GroupContext";
var ve = import_react113.Fragment;
function xe3(n17) {
  var c21;
  let [t14, a28] = (0, import_react113.useState)(null),
    [f21, h15] = V2(),
    [b14, o20] = H3(),
    s20 = (0, import_react113.useMemo)(
      () => ({ switch: t14, setSwitch: a28 }),
      [t14, a28],
    ),
    T10 = {},
    y10 = n17,
    p13 = K();
  return import_react113.default.createElement(
    o20,
    { name: "Switch.Description", value: b14 },
    import_react113.default.createElement(
      h15,
      {
        name: "Switch.Label",
        value: f21,
        props: {
          htmlFor: (c21 = s20.switch) == null ? void 0 : c21.id,
          onClick(u25) {
            t14 &&
              (m4(u25.currentTarget) && u25.preventDefault(),
              t14.click(),
              t14.focus({ preventScroll: true }));
          },
        },
      },
      import_react113.default.createElement(
        E12.Provider,
        { value: s20 },
        p13({
          ourProps: T10,
          theirProps: y10,
          slot: {},
          defaultTag: ve,
          name: "Switch.Group",
        }),
      ),
    ),
  );
}
var Ce3 = "button";
function Le4(n17, t14) {
  var g6;
  let a28 = (0, import_react51.useId)(),
    f21 = u4(),
    h15 = a3(),
    {
      id: b14 = f21 || `headlessui-switch-${a28}`,
      disabled: o20 = h15 || false,
      checked: s20,
      defaultChecked: T10,
      onChange: y10,
      name: p13,
      value: c21,
      form: u25,
      autoFocus: S10 = false,
      ...C11
    } = n17,
    _10 = (0, import_react113.useContext)(E12),
    [L7, R7] = (0, import_react113.useState)(null),
    G6 = (0, import_react113.useRef)(null),
    A5 = y(G6, t14, _10 === null ? null : _10.setSwitch, R7),
    l19 = l3(T10),
    [d14, r22] = b2(s20, y10, l19 != null ? l19 : false),
    F7 = p(),
    [H9, P8] = (0, import_react113.useState)(false),
    D12 = o4(() => {
      (P8(true),
        r22 == null || r22(!d14),
        F7.nextFrame(() => {
          P8(false);
        }));
    }),
    k13 = o4((e9) => {
      if (s6(e9.currentTarget)) return e9.preventDefault();
      (e9.preventDefault(), D12());
    }),
    M12 = o4((e9) => {
      e9.key === o8.Space
        ? (e9.preventDefault(), D12())
        : e9.key === o8.Enter && g(e9.currentTarget);
    }),
    U3 = o4((e9) => e9.preventDefault()),
    I10 = N(),
    B2 = w3(),
    { isFocusVisible: K4, focusProps: O5 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: S10 }),
    { isHovered: W5, hoverProps: N4 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: o20 }),
    { pressed: J4, pressProps: V6 } = w({ disabled: o20 }),
    X5 = n2({
      checked: d14,
      disabled: o20,
      hover: W5,
      focus: K4,
      active: J4,
      autofocus: S10,
      changing: H9,
    }),
    j11 = V(
      {
        id: b14,
        ref: A5,
        role: "switch",
        type: e5(n17, L7),
        tabIndex:
          n17.tabIndex === -1 ? 0 : (g6 = n17.tabIndex) != null ? g6 : 0,
        "aria-checked": d14,
        "aria-labelledby": I10,
        "aria-describedby": B2,
        disabled: o20 || void 0,
        autoFocus: S10,
        onClick: k13,
        onKeyUp: M12,
        onKeyPress: U3,
      },
      O5,
      N4,
      V6,
    ),
    $6 = (0, import_react113.useCallback)(() => {
      if (l19 !== void 0) return r22 == null ? void 0 : r22(l19);
    }, [r22, l19]),
    q5 = K();
  return import_react113.default.createElement(
    import_react113.default.Fragment,
    null,
    p13 != null &&
      import_react113.default.createElement(j2, {
        disabled: o20,
        data: { [p13]: c21 || "on" },
        overrides: { type: "checkbox", checked: d14 },
        form: u25,
        onReset: $6,
      }),
    q5({
      ourProps: j11,
      theirProps: C11,
      slot: X5,
      defaultTag: Ce3,
      name: "Switch",
    }),
  );
}
var Re3 = Y(Le4);
var Ge = xe3;
var Ae6 = Z;
var Fe5 = M2;
var tt2 = Object.assign(Re3, { Group: Ge, Label: Ae6, Description: Fe5 });

// node_modules/@headlessui/react/dist/components/tabs/tabs.js
var import_react115 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/internal/focus-sentinel.js
var import_react114 = __toESM(require_react(), 1);
function b13({ onFocus: n17 }) {
  let [r22, o20] = (0, import_react114.useState)(true),
    u25 = f17();
  return r22
    ? import_react114.default.createElement(f4, {
        as: "button",
        type: "button",
        features: s5.Focusable,
        onFocus: (a28) => {
          a28.preventDefault();
          let e9,
            i16 = 50;
          function t14() {
            if (i16-- <= 0) {
              e9 && cancelAnimationFrame(e9);
              return;
            }
            if (n17()) {
              if ((cancelAnimationFrame(e9), !u25.current)) return;
              o20(false);
              return;
            }
            e9 = requestAnimationFrame(t14);
          }
          e9 = requestAnimationFrame(t14);
        },
      })
    : null;
}

// node_modules/@headlessui/react/dist/utils/stable-collection.js
var l18 = __toESM(require_react(), 1);
var s19 = l18.createContext(null);
function a27() {
  return {
    groups: /* @__PURE__ */ new Map(),
    get(o20, e9) {
      var i16;
      let t14 = this.groups.get(o20);
      t14 || ((t14 = /* @__PURE__ */ new Map()), this.groups.set(o20, t14));
      let n17 = (i16 = t14.get(e9)) != null ? i16 : 0;
      t14.set(e9, n17 + 1);
      let r22 = Array.from(t14.keys()).indexOf(e9);
      function u25() {
        let c21 = t14.get(e9);
        c21 > 1 ? t14.set(e9, c21 - 1) : t14.delete(e9);
      }
      return [r22, u25];
    },
  };
}
function f20({ children: o20 }) {
  let e9 = l18.useRef(a27());
  return l18.createElement(s19.Provider, { value: e9 }, o20);
}
function C10(o20) {
  let e9 = l18.useContext(s19);
  if (!e9)
    throw new Error("You must wrap your component in a <StableCollection>");
  let t14 = l18.useId(),
    [n17, r22] = e9.current.get(o20, t14);
  return (l18.useEffect(() => r22, []), n17);
}

// node_modules/@headlessui/react/dist/components/tabs/tabs.js
var Le5 = ((t14) => (
  (t14[(t14.Forwards = 0)] = "Forwards"),
  (t14[(t14.Backwards = 1)] = "Backwards"),
  t14
))(Le5 || {});
var _e3 = ((l19) => (
  (l19[(l19.Less = -1)] = "Less"),
  (l19[(l19.Equal = 0)] = "Equal"),
  (l19[(l19.Greater = 1)] = "Greater"),
  l19
))(_e3 || {});
var Se4 = ((n17) => (
  (n17[(n17.SetSelectedIndex = 0)] = "SetSelectedIndex"),
  (n17[(n17.RegisterTab = 1)] = "RegisterTab"),
  (n17[(n17.UnregisterTab = 2)] = "UnregisterTab"),
  (n17[(n17.RegisterPanel = 3)] = "RegisterPanel"),
  (n17[(n17.UnregisterPanel = 4)] = "UnregisterPanel"),
  n17
))(Se4 || {});
var De4 = {
  [0](e9, r22) {
    var d14;
    let t14 = G2(e9.tabs, (u25) => u25.current),
      l19 = G2(e9.panels, (u25) => u25.current),
      a28 = t14.filter((u25) => {
        var T10;
        return !((T10 = u25.current) != null && T10.hasAttribute("disabled"));
      }),
      n17 = { ...e9, tabs: t14, panels: l19 };
    if (r22.index < 0 || r22.index > t14.length - 1) {
      let u25 = u(Math.sign(r22.index - e9.selectedIndex), {
        [-1]: () => 1,
        [0]: () =>
          u(Math.sign(r22.index), {
            [-1]: () => 0,
            [0]: () => 0,
            [1]: () => 1,
          }),
        [1]: () => 0,
      });
      if (a28.length === 0) return n17;
      let T10 = u(u25, {
        [0]: () => t14.indexOf(a28[0]),
        [1]: () => t14.indexOf(a28[a28.length - 1]),
      });
      return { ...n17, selectedIndex: T10 === -1 ? e9.selectedIndex : T10 };
    }
    let s20 = t14.slice(0, r22.index),
      f21 = [...t14.slice(r22.index), ...s20].find((u25) => a28.includes(u25));
    if (!f21) return n17;
    let b14 = (d14 = t14.indexOf(f21)) != null ? d14 : e9.selectedIndex;
    return (
      b14 === -1 && (b14 = e9.selectedIndex),
      { ...n17, selectedIndex: b14 }
    );
  },
  [1](e9, r22) {
    if (e9.tabs.includes(r22.tab)) return e9;
    let t14 = e9.tabs[e9.selectedIndex],
      l19 = G2([...e9.tabs, r22.tab], (n17) => n17.current),
      a28 = e9.selectedIndex;
    return (
      e9.info.current.isControlled ||
        ((a28 = l19.indexOf(t14)), a28 === -1 && (a28 = e9.selectedIndex)),
      { ...e9, tabs: l19, selectedIndex: a28 }
    );
  },
  [2](e9, r22) {
    return { ...e9, tabs: e9.tabs.filter((t14) => t14 !== r22.tab) };
  },
  [3](e9, r22) {
    return e9.panels.includes(r22.panel)
      ? e9
      : { ...e9, panels: G2([...e9.panels, r22.panel], (t14) => t14.current) };
  },
  [4](e9, r22) {
    return { ...e9, panels: e9.panels.filter((t14) => t14 !== r22.panel) };
  },
};
var z3 = (0, import_react115.createContext)(null);
z3.displayName = "TabsDataContext";
function h14(e9) {
  let r22 = (0, import_react115.useContext)(z3);
  if (r22 === null) {
    let t14 = new Error(
      `<${e9} /> is missing a parent <Tab.Group /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(t14, h14), t14);
  }
  return r22;
}
var V5 = (0, import_react115.createContext)(null);
V5.displayName = "TabsActionsContext";
function Q6(e9) {
  let r22 = (0, import_react115.useContext)(V5);
  if (r22 === null) {
    let t14 = new Error(
      `<${e9} /> is missing a parent <Tab.Group /> component.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(t14, Q6), t14);
  }
  return r22;
}
function Fe6(e9, r22) {
  return u(r22.type, De4, e9, r22);
}
var Ie4 = "div";
function he2(e9, r22) {
  let {
    defaultIndex: t14 = 0,
    vertical: l19 = false,
    manual: a28 = false,
    onChange: n17,
    selectedIndex: s20 = null,
    ...g6
  } = e9;
  const f21 = l19 ? "vertical" : "horizontal",
    b14 = a28 ? "manual" : "auto";
  let d14 = s20 !== null,
    u25 = s3({ isControlled: d14 }),
    T10 = y(r22),
    [p13, c21] = (0, import_react115.useReducer)(Fe6, {
      info: u25,
      selectedIndex: s20 != null ? s20 : t14,
      tabs: [],
      panels: [],
    }),
    v11 = n2({ selectedIndex: p13.selectedIndex }),
    m10 = s3(n17 || (() => {})),
    C11 = s3(p13.tabs),
    D12 = (0, import_react115.useMemo)(
      () => ({ orientation: f21, activation: b14, ...p13 }),
      [f21, b14, p13],
    ),
    P8 = o4(
      (i16) => (c21({ type: 1, tab: i16 }), () => c21({ type: 2, tab: i16 })),
    ),
    R7 = o4(
      (i16) => (
        c21({ type: 3, panel: i16 }),
        () => c21({ type: 4, panel: i16 })
      ),
    ),
    A5 = o4((i16) => {
      (L7.current !== i16 && m10.current(i16),
        d14 || c21({ type: 0, index: i16 }));
    }),
    L7 = s3(d14 ? e9.selectedIndex : p13.selectedIndex),
    _10 = (0, import_react115.useMemo)(
      () => ({ registerTab: P8, registerPanel: R7, change: A5 }),
      [],
    );
  (n(() => {
    c21({ type: 0, index: s20 != null ? s20 : t14 });
  }, [s20]),
    n(() => {
      if (L7.current === void 0 || p13.tabs.length <= 0) return;
      let i16 = G2(p13.tabs, (S10) => S10.current);
      i16.some((S10, $6) => p13.tabs[$6] !== S10) &&
        A5(i16.indexOf(p13.tabs[L7.current]));
    }));
  let J4 = { ref: T10 },
    X5 = K();
  return import_react115.default.createElement(
    f20,
    null,
    import_react115.default.createElement(
      V5.Provider,
      { value: _10 },
      import_react115.default.createElement(
        z3.Provider,
        { value: D12 },
        D12.tabs.length <= 0 &&
          import_react115.default.createElement(b13, {
            onFocus: () => {
              var i16, M12;
              for (let S10 of C11.current)
                if (((i16 = S10.current) == null ? void 0 : i16.tabIndex) === 0)
                  return ((M12 = S10.current) == null || M12.focus(), true);
              return false;
            },
          }),
        X5({
          ourProps: J4,
          theirProps: g6,
          slot: v11,
          defaultTag: Ie4,
          name: "Tabs",
        }),
      ),
    ),
  );
}
var ve2 = "div";
function Ce4(e9, r22) {
  let { orientation: t14, selectedIndex: l19 } = h14("Tab.List"),
    a28 = y(r22),
    n17 = n2({ selectedIndex: l19 }),
    s20 = e9,
    g6 = { ref: a28, role: "tablist", "aria-orientation": t14 };
  return K()({
    ourProps: g6,
    theirProps: s20,
    slot: n17,
    defaultTag: ve2,
    name: "Tabs.List",
  });
}
var Me2 = "button";
function Ge2(e9, r22) {
  var Y4, Z4;
  let t14 = (0, import_react51.useId)(),
    {
      id: l19 = `headlessui-tabs-tab-${t14}`,
      disabled: a28 = false,
      autoFocus: n17 = false,
      ...s20
    } = e9,
    {
      orientation: g6,
      activation: f21,
      selectedIndex: b14,
      tabs: d14,
      panels: u25,
    } = h14("Tab"),
    T10 = Q6("Tab"),
    p13 = h14("Tab"),
    [c21, v11] = (0, import_react115.useState)(null),
    m10 = (0, import_react115.useRef)(null),
    C11 = y(m10, r22, v11);
  n(() => T10.registerTab(m10), [T10, m10]);
  let D12 = C10("tabs"),
    P8 = d14.indexOf(m10);
  P8 === -1 && (P8 = D12);
  let R7 = P8 === b14,
    A5 = o4((o20) => {
      let E13 = o20();
      if (E13 === A2.Success && f21 === "auto") {
        let ee7 = e(m10.current),
          B2 = p13.tabs.findIndex((ce3) => ce3.current === ee7);
        B2 !== -1 && T10.change(B2);
      }
      return E13;
    }),
    L7 = o4((o20) => {
      let E13 = d14.map((B2) => B2.current).filter(Boolean);
      if (o20.key === o8.Space || o20.key === o8.Enter) {
        (o20.preventDefault(), o20.stopPropagation(), T10.change(P8));
        return;
      }
      switch (o20.key) {
        case o8.Home:
        case o8.PageUp:
          return (
            o20.preventDefault(),
            o20.stopPropagation(),
            A5(() => v5(E13, T4.First))
          );
        case o8.End:
        case o8.PageDown:
          return (
            o20.preventDefault(),
            o20.stopPropagation(),
            A5(() => v5(E13, T4.Last))
          );
      }
      if (
        A5(() =>
          u(g6, {
            vertical() {
              return o20.key === o8.ArrowUp
                ? v5(E13, T4.Previous | T4.WrapAround)
                : o20.key === o8.ArrowDown
                  ? v5(E13, T4.Next | T4.WrapAround)
                  : A2.Error;
            },
            horizontal() {
              return o20.key === o8.ArrowLeft
                ? v5(E13, T4.Previous | T4.WrapAround)
                : o20.key === o8.ArrowRight
                  ? v5(E13, T4.Next | T4.WrapAround)
                  : A2.Error;
            },
          }),
        ) === A2.Success
      )
        return o20.preventDefault();
    }),
    _10 = (0, import_react115.useRef)(false),
    J4 = o4(() => {
      var o20;
      _10.current ||
        ((_10.current = true),
        (o20 = m10.current) == null || o20.focus({ preventScroll: true }),
        T10.change(P8),
        t(() => {
          _10.current = false;
        }));
    }),
    X5 = o4((o20) => {
      o20.preventDefault();
    }),
    { isFocusVisible: i16, focusProps: M12 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: n17 }),
    { isHovered: S10, hoverProps: $6 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: a28 }),
    { pressed: pe4, pressProps: ue5 } = w({ disabled: a28 }),
    Te5 = n2({
      selected: R7,
      hover: S10,
      active: pe4,
      focus: i16,
      autofocus: n17,
      disabled: a28,
    }),
    de6 = V(
      {
        ref: C11,
        onKeyDown: L7,
        onMouseDown: X5,
        onClick: J4,
        id: l19,
        role: "tab",
        type: e5(e9, c21),
        "aria-controls":
          (Z4 = (Y4 = u25[P8]) == null ? void 0 : Y4.current) == null
            ? void 0
            : Z4.id,
        "aria-selected": R7,
        tabIndex: R7 ? 0 : -1,
        disabled: a28 || void 0,
        autoFocus: n17,
      },
      M12,
      $6,
      ue5,
    );
  return K()({
    ourProps: de6,
    theirProps: s20,
    slot: Te5,
    defaultTag: Me2,
    name: "Tabs.Tab",
  });
}
var Ue3 = "div";
function He4(e9, r22) {
  let { selectedIndex: t14 } = h14("Tab.Panels"),
    l19 = y(r22),
    a28 = n2({ selectedIndex: t14 }),
    n17 = e9,
    s20 = { ref: l19 };
  return K()({
    ourProps: s20,
    theirProps: n17,
    slot: a28,
    defaultTag: Ue3,
    name: "Tabs.Panels",
  });
}
var we4 = "div";
var Oe4 = A.RenderStrategy | A.Static;
function Ne4(e9, r22) {
  var R7, A5, L7, _10;
  let t14 = (0, import_react51.useId)(),
    {
      id: l19 = `headlessui-tabs-panel-${t14}`,
      tabIndex: a28 = 0,
      ...n17
    } = e9,
    { selectedIndex: s20, tabs: g6, panels: f21 } = h14("Tab.Panel"),
    b14 = Q6("Tab.Panel"),
    d14 = (0, import_react115.useRef)(null),
    u25 = y(d14, r22);
  n(() => b14.registerPanel(d14), [b14, d14]);
  let T10 = C10("panels"),
    p13 = f21.indexOf(d14);
  p13 === -1 && (p13 = T10);
  let c21 = p13 === s20,
    { isFocusVisible: v11, focusProps: m10 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f(),
    C11 = n2({ selected: c21, focus: v11 }),
    D12 = V(
      {
        ref: u25,
        id: l19,
        role: "tabpanel",
        "aria-labelledby":
          (A5 = (R7 = g6[p13]) == null ? void 0 : R7.current) == null
            ? void 0
            : A5.id,
        tabIndex: c21 ? a28 : -1,
      },
      m10,
    ),
    P8 = K();
  return !c21 &&
    ((L7 = n17.unmount) == null || L7) &&
    !((_10 = n17.static) != null && _10)
    ? import_react115.default.createElement(f4, {
        "aria-hidden": "true",
        ...D12,
      })
    : P8({
        ourProps: D12,
        theirProps: n17,
        slot: C11,
        defaultTag: we4,
        features: Oe4,
        visible: c21,
        name: "Tabs.Panel",
      });
}
var ke = Y(Ge2);
var Be3 = Y(he2);
var We3 = Y(Ce4);
var je3 = Y(He4);
var Ke5 = Y(Ne4);
var dt2 = Object.assign(ke, { Group: Be3, List: We3, Panels: je3, Panel: Ke5 });

// node_modules/@headlessui/react/dist/components/textarea/textarea.js
var L6 = "textarea";
function H8(a28, t14) {
  let s20 = (0, import_react51.useId)(),
    l19 = u4(),
    d14 = a3(),
    {
      id: i16 = l19 || `headlessui-textarea-${s20}`,
      disabled: e9 = d14 || false,
      autoFocus: r22 = false,
      invalid: o20 = false,
      ...p13
    } = a28,
    n17 = N(),
    T10 = w3(),
    { isFocused: f21, focusProps: m10 } =
      $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: r22 }),
    { isHovered: u25, hoverProps: b14 } =
      $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e9 }),
    y10 = V(
      {
        ref: t14,
        id: i16,
        "aria-labelledby": n17,
        "aria-describedby": T10,
        "aria-invalid": o20 ? "true" : void 0,
        disabled: e9 || void 0,
        autoFocus: r22,
      },
      m10,
      b14,
    ),
    x10 = n2({
      disabled: e9,
      invalid: o20,
      hover: u25,
      focus: f21,
      autofocus: r22,
    });
  return K()({
    ourProps: y10,
    theirProps: p13,
    slot: x10,
    defaultTag: L6,
    name: "Textarea",
  });
}
var M11 = Y(H8);
export {
  L as Button,
  Ke as Checkbox,
  y2 as CloseButton,
  Ht as Combobox,
  Bo as ComboboxButton,
  ko as ComboboxInput,
  No as ComboboxLabel,
  Ho as ComboboxOption,
  Uo as ComboboxOptions,
  b8 as DataInteractive,
  M2 as Description,
  ht as Dialog,
  Lt as DialogBackdrop,
  xt as DialogDescription,
  ze as DialogPanel,
  Qe as DialogTitle,
  Xe2 as Disclosure,
  xe2 as DisclosureButton,
  Le3 as DisclosurePanel,
  W3 as Field,
  I9 as Fieldset,
  ge2 as FocusTrap,
  G4 as FocusTrapFeatures,
  X3 as Input,
  Z as Label,
  d12 as Legend,
  Mo2 as Listbox,
  Mt as ListboxButton,
  wt as ListboxLabel,
  It as ListboxOption,
  Bt as ListboxOptions,
  kt as ListboxSelectedOption,
  lo as Menu,
  ft as MenuButton,
  Et2 as MenuHeading,
  gt2 as MenuItem,
  yt as MenuItems,
  Pt2 as MenuSection,
  Mt2 as MenuSeparator,
  vo as Popover,
  xt2 as PopoverBackdrop,
  Dt2 as PopoverButton,
  ht3 as PopoverGroup,
  Ot as PopoverOverlay,
  Lt2 as PopoverPanel,
  te as Portal,
  Ke4 as Radio,
  yt3 as RadioGroup,
  je2 as RadioGroupDescription,
  $e2 as RadioGroupLabel,
  Ve2 as RadioGroupOption,
  k12 as Select,
  tt2 as Switch,
  Fe5 as SwitchDescription,
  Ge as SwitchGroup,
  Ae6 as SwitchLabel,
  dt2 as Tab,
  Be3 as TabGroup,
  We3 as TabList,
  Ke5 as TabPanel,
  je3 as TabPanels,
  M11 as Textarea,
  Ke2 as Transition,
  Oe as TransitionChild,
  u8 as useClose,
};
//# sourceMappingURL=@headlessui_react.js.map
