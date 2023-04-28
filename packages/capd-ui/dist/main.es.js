var createAnatomy = (name, parts2 = []) => ({
  parts: (...values) => {
    if (isEmpty(parts2)) {
      return createAnatomy(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy(name, [...parts2, ...values]),
  build: () => [...new Set(parts2)].reduce((prev, part) => Object.assign(prev, {
    [part]: {
      selector: [
        `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
        `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
      ].join(", "),
      attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
    }
  }), {})
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;
var anatomy = createAnatomy("combobox").parts("root", "label", "input", "positioner", "control", "trigger", "content", "clearTrigger", "option", "optionGroup");
var parts = anatomy.build();
function raf(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function getEventTarget(event) {
  var _a, _b;
  return (_b = (_a = event.composedPath) == null ? void 0 : _a.call(event)[0]) != null ? _b : event.target;
}
function isHTMLElement$3(value) {
  return typeof value === "object" && (value == null ? void 0 : value.nodeType) === Node.ELEMENT_NODE && typeof (value == null ? void 0 : value.nodeName) === "string";
}
function queryAll(root, selector) {
  var _a;
  return Array.from((_a = root == null ? void 0 : root.querySelectorAll(selector)) != null ? _a : []);
}
var dataAttr = (guard) => {
  return guard ? "" : void 0;
};
var ariaAttr = (guard) => {
  return guard ? "true" : void 0;
};
function contains(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement$3(parent) || !isHTMLElement$3(child))
    return false;
  return parent === child || parent.contains(child);
}
var getDocument$1 = (node) => {
  var _a;
  if (node.nodeType === Node.DOCUMENT_NODE)
    return node;
  return (_a = node.ownerDocument) != null ? _a : document;
};
function createScope(methods) {
  const screen = {
    getRootNode: (ctx) => {
      var _a, _b;
      return (_b = (_a = ctx.getRootNode) == null ? void 0 : _a.call(ctx)) != null ? _b : document;
    },
    getDoc: (ctx) => getDocument$1(screen.getRootNode(ctx)),
    getWin: (ctx) => {
      var _a;
      return (_a = screen.getDoc(ctx).defaultView) != null ? _a : window;
    },
    getActiveElement: (ctx) => screen.getDoc(ctx).activeElement,
    getById: (ctx, id) => screen.getRootNode(ctx).getElementById(id),
    queryById: (ctx, id) => {
      const el = screen.getById(ctx, id);
      if (!el)
        throw new Error(`Element with id "${id}" not found.`);
      return el;
    }
  };
  return { ...screen, ...methods };
}
var isDocument = (el) => el.nodeType === Node.DOCUMENT_NODE;
function getDocument(el) {
  var _a;
  if (isDocument(el))
    return el;
  return (_a = el == null ? void 0 : el.ownerDocument) != null ? _a : document;
}
function getWindow$1(el) {
  var _a;
  return (_a = el == null ? void 0 : el.ownerDocument.defaultView) != null ? _a : window;
}
function itemById(v, id) {
  return v.find((node) => node.id === id);
}
function indexOfId(v, id) {
  const item = itemById(v, id);
  return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  if (idx === -1)
    return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}
var first = (v) => v[0];
var last = (v) => v[v.length - 1];
var callAll$1 = (...fns) => (...a2) => {
  fns.forEach(function(fn) {
    fn == null ? void 0 : fn(...a2);
  });
};
function compact$1(obj) {
  if (!isPlainObject$1(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact$1(value);
    }
  }
  return filtered;
}
var isPlainObject$1 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
var dom$1 = createScope({
  getRootId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.root) != null ? _b : `combobox:${ctx.id}`;
  },
  getLabelId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.label) != null ? _b : `combobox:${ctx.id}:label`;
  },
  getControlId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.control) != null ? _b : `combobox:${ctx.id}:control`;
  },
  getInputId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.input) != null ? _b : `combobox:${ctx.id}:input`;
  },
  getContentId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.content) != null ? _b : `combobox:${ctx.id}:listbox`;
  },
  getPositionerId: (ctx) => `combobox:${ctx.id}:popper`,
  getTriggerId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.trigger) != null ? _b : `combobox:${ctx.id}:toggle-btn`;
  },
  getClearTriggerId: (ctx) => {
    var _a, _b;
    return (_b = (_a = ctx.ids) == null ? void 0 : _a.clearTrigger) != null ? _b : `combobox:${ctx.id}:clear-btn`;
  },
  getOptionId: (ctx, id, index) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = ctx.ids) == null ? void 0 : _a.option) == null ? void 0 : _b.call(_a, id, index)) != null ? _c : [`combobox:${ctx.id}:option:${id}`, index].filter((v) => v != null).join(":");
  },
  getActiveOptionEl: (ctx) => ctx.focusedId ? dom$1.getById(ctx, ctx.focusedId) : null,
  getContentEl: (ctx) => dom$1.getById(ctx, dom$1.getContentId(ctx)),
  getInputEl: (ctx) => dom$1.getById(ctx, dom$1.getInputId(ctx)),
  getPositionerEl: (ctx) => dom$1.getById(ctx, dom$1.getPositionerId(ctx)),
  getControlEl: (ctx) => dom$1.getById(ctx, dom$1.getControlId(ctx)),
  getTriggerEl: (ctx) => dom$1.getById(ctx, dom$1.getTriggerId(ctx)),
  getClearTriggerEl: (ctx) => dom$1.getById(ctx, dom$1.getClearTriggerId(ctx)),
  getElements: (ctx) => queryAll(dom$1.getContentEl(ctx), "[role=option]:not([aria-disabled=true])"),
  getFocusedOptionEl: (ctx) => {
    var _a;
    if (!ctx.focusedId)
      return null;
    const selector = `[role=option][id=${CSS.escape(ctx.focusedId)}]`;
    return (_a = dom$1.getContentEl(ctx)) == null ? void 0 : _a.querySelector(selector);
  },
  getFirstEl: (ctx) => first(dom$1.getElements(ctx)),
  getLastEl: (ctx) => last(dom$1.getElements(ctx)),
  getPrevEl: (ctx, id) => prevById(dom$1.getElements(ctx), id, ctx.loop),
  getNextEl: (ctx, id) => nextById(dom$1.getElements(ctx), id, ctx.loop),
  isInputFocused: (ctx) => dom$1.getDoc(ctx).activeElement === dom$1.getInputEl(ctx),
  getOptionData: (el) => {
    var _a, _b;
    return {
      value: (_a = el == null ? void 0 : el.getAttribute("data-value")) != null ? _a : "",
      label: (_b = el == null ? void 0 : el.getAttribute("data-label")) != null ? _b : ""
    };
  },
  getOptionCount: (ctx) => {
    var _a, _b;
    const listbox = dom$1.getContentEl(ctx);
    const count = (_a = listbox == null ? void 0 : listbox.querySelector("[role=option]")) == null ? void 0 : _a.getAttribute("aria-setsize");
    if (count != null)
      return parseInt(count);
    return (_b = listbox == null ? void 0 : listbox.querySelectorAll("[role=option]").length) != null ? _b : 0;
  },
  getMatchingOptionEl: (ctx, value) => {
    if (!value)
      return null;
    const selector = `[role=option][data-value="${CSS.escape(value)}"`;
    const listbox = dom$1.getContentEl(ctx);
    if (!listbox)
      return null;
    return listbox.querySelector(selector);
  },
  focusInput: (ctx) => {
    const input2 = dom$1.getInputEl(ctx);
    if (dom$1.getDoc(ctx).activeElement !== input2) {
      input2 == null ? void 0 : input2.focus();
    }
    if (ctx.selectInputOnFocus) {
      input2 == null ? void 0 : input2.select();
    }
  },
  getClosestSectionLabel(ctx) {
    var _a;
    if (!ctx.focusedId)
      return;
    const group = (_a = dom$1.getActiveOptionEl(ctx)) == null ? void 0 : _a.closest("[data-part=option-group]");
    return group == null ? void 0 : group.getAttribute("aria-label");
  },
  getValueLabel: (ctx, value) => {
    const el = dom$1.getMatchingOptionEl(ctx, value);
    return dom$1.getOptionData(el).label;
  }
});
var addDomEvent$1 = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node == null ? void 0 : node.addEventListener(eventName, handler, options);
  return () => {
    node == null ? void 0 : node.removeEventListener(eventName, handler, options);
  };
};
var state = "default";
var userSelect = "";
var elementMap = /* @__PURE__ */ new WeakMap();
var isIos = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
var nextTick = (fn) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fn();
    });
  });
};
function disableTextSelection({ target, doc } = {}) {
  const _document = doc != null ? doc : document;
  const rootEl = _document.documentElement;
  if (isIos()) {
    if (state === "default") {
      userSelect = rootEl.style.webkitUserSelect;
      rootEl.style.webkitUserSelect = "none";
    }
    state = "disabled";
  } else if (target) {
    elementMap.set(target, target.style.userSelect);
    target.style.userSelect = "none";
  }
  return () => restoreTextSelection({ target, doc: _document });
}
function restoreTextSelection({ target, doc } = {}) {
  const _document = doc != null ? doc : document;
  const rootEl = _document.documentElement;
  if (isIos()) {
    if (state !== "disabled")
      return;
    state = "restoring";
    setTimeout(() => {
      nextTick(() => {
        if (state === "restoring") {
          if (rootEl.style.webkitUserSelect === "none") {
            rootEl.style.webkitUserSelect = userSelect || "";
          }
          userSelect = "";
          state = "default";
        }
      });
    }, 300);
  } else {
    if (target && elementMap.has(target)) {
      let prevUserSelect = elementMap.get(target);
      if (target.style.userSelect === "none") {
        target.style.userSelect = prevUserSelect != null ? prevUserSelect : "";
      }
      if (target.getAttribute("style") === "") {
        target.removeAttribute("style");
      }
      elementMap.delete(target);
    }
  }
}
function isVirtualPointerEvent(e2) {
  return e2.width === 0 && e2.height === 0 || e2.width === 1 && e2.height === 1 && e2.pressure === 0 && e2.detail === 0 && e2.pointerType === "mouse";
}
function isVirtualClick(e2) {
  if (e2.mozInputSource === 0 && e2.isTrusted)
    return true;
  return e2.detail === 0 && !e2.pointerType;
}
var isLeftClick = (e2) => e2.button === 0;
var isContextMenuEvent = (e2) => {
  return e2.button === 2 || isCtrlKey(e2) && e2.button === 0;
};
var isMac = () => /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
var isCtrlKey = (e2) => isMac() ? e2.metaKey && !e2.ctrlKey : e2.ctrlKey && !e2.metaKey;
function fireCustomEvent(el, type, init) {
  if (!el)
    return;
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}
var keyMap = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
  var _a;
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = (_a = keyMap[key]) != null ? _a : key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) {
    key = rtlKeyMap[key];
  }
  return key;
}
function getNativeEvent(event) {
  var _a;
  return (_a = event.nativeEvent) != null ? _a : event;
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data: data2,
      reset
    } = await fn({
      x,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data2
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
      continue;
    }
  }
  return {
    x,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(state2, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state2;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x,
    y: y2
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const min$1 = Math.min;
const max$1 = Math.max;
function within(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}
const arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state2) {
    const {
      element,
      padding = 0
    } = options || {};
    const {
      x,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements
    } = state2;
    if (element == null) {
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x,
      y: y2
    };
    const axis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const min2 = paddingObject[minProp];
    const max2 = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = within(min2, center, max2);
    const shouldAddOffset = getAlignment(placement) != null && center != offset2 && rects.reference[length] / 2 - (center < min2 ? paddingObject[minProp] : paddingObject[maxProp]) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min2 ? min2 - center : max2 - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2
      }
    };
  }
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
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
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state2) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state2;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state2, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[main], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b) => a2.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b) => a2[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
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
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state2, value) {
  const {
    placement,
    platform: platform2,
    elements
  } = state2;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === "function" ? value(state2) : value;
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    async fn(state2) {
      const {
        x,
        y: y2
      } = state2;
      const diffCoords = await convertValueToCoords(state2, value);
      return {
        x: x + diffCoords.x,
        y: y2 + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getCrossAxis(axis) {
  return axis === "x" ? "y" : "x";
}
const shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state2) {
      const {
        x,
        y: y2,
        placement
      } = state2;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y3
            } = _ref;
            return {
              x: x2,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x,
        y: y2
      };
      const overflow = await detectOverflow(state2, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state2,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y2
        }
      };
    }
  };
};
const size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state2) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state2;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = options;
      const overflow = await detectOverflow(state2, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const axis = getMainAxisFromPlacement(placement);
      const isXAxis = axis === "x";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state2.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isXAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min$1(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min$1(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max$1(overflow.left, 0);
        const xMax = max$1(overflow.right, 0);
        const yMin = max$1(overflow.top, 0);
        const yMax = max$1(overflow.bottom, 0);
        if (isXAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max$1(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max$1(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state2,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getWindow(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function getNodeName(node) {
  return isNode(node) ? (node.nodeName || "").toLowerCase() : "";
}
let uaString;
function getUAString() {
  if (uaString) {
    return uaString;
  }
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    uaString = uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
    return uaString;
  }
  return navigator.userAgent;
}
function isHTMLElement$2(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  const backdropFilter = css.backdropFilter || css.WebkitBackdropFilter;
  return css.transform !== "none" || css.perspective !== "none" || (backdropFilter ? backdropFilter !== "none" : false) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective"].some((value) => css.willChange.includes(value)) || ["paint", "layout", "strict", "content"].some((value) => {
    const contain = css.contain;
    return contain != null ? contain.includes(value) : false;
  });
}
function isClientRectVisualViewportBased() {
  return /^((?!chrome|android).)*safari/i.test(getUAString());
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
const min = Math.min;
const max = Math.max;
const round$1 = Math.round;
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width);
  let height = parseFloat(css.height);
  const hasOffset = isHTMLElement$2(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round$1(width) !== offsetWidth || round$1(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    fallback: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
const FALLBACK_SCALE = {
  x: 1,
  y: 1
};
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement$2(domElement)) {
    return FALLBACK_SCALE;
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    fallback
  } = getCssDimensions(domElement);
  let x = (fallback ? round$1(rect.width) : rect.width) / width;
  let y2 = (fallback ? round$1(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x,
    y: y2
  };
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  var _win$visualViewport, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = FALLBACK_SCALE;
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const win = domElement ? getWindow(domElement) : window;
  const addVisualOffsets = isClientRectVisualViewportBased() && isFixedStrategy;
  let x = (clientRect.left + (addVisualOffsets ? ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0 : 0)) / scale.x;
  let y2 = (clientRect.top + (addVisualOffsets ? ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0 : 0)) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win2 = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win2.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win2) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      iframeRect.x += (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      iframeRect.y += (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += iframeRect.x;
      y2 += iframeRect.y;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y: y2
  });
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement$2(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = {
    x: 1,
    y: 1
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement$2(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return parentNode.ownerDocument.body;
  }
  if (isHTMLElement$2(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isClientRectVisualViewportBased();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement$2(element) ? getScale(element) : {
    x: 1,
    y: 1
  };
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const mutableRect = {
      ...clippingAncestor
    };
    if (isClientRectVisualViewportBased()) {
      var _win$visualViewport, _win$visualViewport2;
      const win = getWindow(element);
      mutableRect.x -= ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0;
      mutableRect.y -= ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0;
    }
    rect = mutableRect;
  }
  return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const containingBlock = isContainingBlock(currentNode);
    const shouldIgnoreCurrentNode = computedStyle.position === "fixed";
    if (shouldIgnoreCurrentNode) {
      currentContainingBlockComputedStyle = null;
    } else {
      const shouldDropCurrentNode = elementIsFixed ? !containingBlock && !currentContainingBlockComputedStyle : !containingBlock && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  return getCssDimensions(element);
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement$2(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement$2(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement$2(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement$2(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, true, strategy === "fixed", offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement$2(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getScale,
  async getElementRects(_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...await getDimensionsFn(floating)
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
const computePosition = (reference, floating, options) => {
  const cache2 = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache2
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var rafId;
var observedElements = /* @__PURE__ */ new Map();
function trackElementRect(el, fn, options = {}) {
  const { scope = "rect" } = options;
  const loop = getLoopFn(scope);
  const data2 = observedElements.get(el);
  if (!data2) {
    observedElements.set(el, {
      rect: {},
      callbacks: [fn]
    });
    if (observedElements.size === 1) {
      rafId = requestAnimationFrame(loop);
    }
  } else {
    data2.callbacks.push(fn);
    fn(el.getBoundingClientRect());
  }
  return function unobserve() {
    const data22 = observedElements.get(el);
    if (!data22)
      return;
    const index = data22.callbacks.indexOf(fn);
    if (index > -1) {
      data22.callbacks.splice(index, 1);
    }
    if (data22.callbacks.length === 0) {
      observedElements.delete(el);
      if (observedElements.size === 0) {
        cancelAnimationFrame(rafId);
      }
    }
  };
}
function getLoopFn(scope) {
  const isEqual = getEqualityFn(scope);
  return function loop() {
    const changedRectsData = [];
    observedElements.forEach((data2, element) => {
      const newRect = element.getBoundingClientRect();
      if (!isEqual(data2.rect, newRect)) {
        data2.rect = newRect;
        changedRectsData.push(data2);
      }
    });
    changedRectsData.forEach((data2) => {
      data2.callbacks.forEach((callback) => callback(data2.rect));
    });
    rafId = requestAnimationFrame(loop);
  };
}
var isEqualSize = (a2, b) => a2.width === b.width && a2.height === b.height;
var isEqualPosition = (a2, b) => a2.top === b.top && a2.right === b.right && a2.bottom === b.bottom && a2.left === b.left;
var isEqualRect = (a2, b) => isEqualSize(a2, b) && isEqualPosition(a2, b);
function getEqualityFn(scope) {
  if (scope === "size")
    return isEqualSize;
  if (scope === "position")
    return isEqualPosition;
  return isEqualRect;
}
var callAll = (...fns) => () => fns.forEach((fn) => fn());
var isHTMLElement$1 = (el) => {
  return typeof el === "object" && el !== null && el.nodeType === 1;
};
var addDomEvent = (el, type, fn, options) => {
  el.addEventListener(type, fn, options);
  return () => el.removeEventListener(type, fn, options);
};
function resolveOptions(option2) {
  var _a, _b, _c;
  const bool = typeof option2 === "boolean";
  return {
    ancestorResize: bool ? option2 : (_a = option2.ancestorResize) != null ? _a : true,
    ancestorScroll: bool ? option2 : (_b = option2.ancestorScroll) != null ? _b : true,
    referenceResize: bool ? option2 : (_c = option2.referenceResize) != null ? _c : true
  };
}
function autoUpdate(reference, floating, update, options = false) {
  const { ancestorScroll, ancestorResize, referenceResize } = resolveOptions(options);
  const useAncestors = ancestorScroll || ancestorResize;
  const ancestors = [];
  if (useAncestors && isHTMLElement$1(reference)) {
    ancestors.push(...getOverflowAncestors(reference));
  }
  function addResizeListeners() {
    let cleanups = [trackElementRect(floating, update, { scope: "size" })];
    if (referenceResize && isHTMLElement$1(reference)) {
      cleanups.push(trackElementRect(reference, update));
    }
    cleanups.push(callAll(...ancestors.map((el) => addDomEvent(el, "resize", update))));
    return () => cleanups.forEach((fn) => fn());
  }
  function addScrollListeners() {
    return callAll(...ancestors.map((el) => addDomEvent(el, "scroll", update, { passive: true })));
  }
  return callAll(addResizeListeners(), addScrollListeners());
}
var toVar = (value) => ({ variable: value, reference: `var(${value})` });
var cssVars = {
  arrowSize: toVar("--arrow-size"),
  arrowSizeHalf: toVar("--arrow-size-half"),
  arrowBg: toVar("--arrow-background"),
  transformOrigin: toVar("--transform-origin"),
  arrowOffset: toVar("--arrow-offset")
};
var getTransformOrigin = (arrow2) => ({
  top: "bottom center",
  "top-start": arrow2 ? `${arrow2.x}px bottom` : "left bottom",
  "top-end": arrow2 ? `${arrow2.x}px bottom` : "right bottom",
  bottom: "top center",
  "bottom-start": arrow2 ? `${arrow2.x}px top` : "top left",
  "bottom-end": arrow2 ? `${arrow2.x}px top` : "top right",
  left: "right center",
  "left-start": arrow2 ? `right ${arrow2.y}px` : "right top",
  "left-end": arrow2 ? `right ${arrow2.y}px` : "right bottom",
  right: "left center",
  "right-start": arrow2 ? `left ${arrow2.y}px` : "left top",
  "right-end": arrow2 ? `left ${arrow2.y}px` : "left bottom"
});
var transformOrigin = {
  name: "transformOrigin",
  fn({ placement, elements, middlewareData }) {
    const { arrow: arrow2 } = middlewareData;
    const transformOrigin2 = getTransformOrigin(arrow2)[placement];
    const { floating } = elements;
    floating.style.setProperty(cssVars.transformOrigin.variable, transformOrigin2);
    return {
      data: { transformOrigin: transformOrigin2 }
    };
  }
};
var shiftArrow = (opts) => ({
  name: "shiftArrow",
  fn({ placement, middlewareData }) {
    const { element: arrow2 } = opts;
    if (middlewareData.arrow) {
      const { x, y: y2 } = middlewareData.arrow;
      const dir = placement.split("-")[0];
      Object.assign(arrow2.style, {
        left: x != null ? `${x}px` : "",
        top: y2 != null ? `${y2}px` : "",
        [dir]: `calc(100% + ${cssVars.arrowOffset.reference})`
      });
    }
    return {};
  }
});
var defaultOptions = {
  strategy: "absolute",
  placement: "bottom",
  listeners: true,
  gutter: 8,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
function getPlacement(reference, floating, opts = {}) {
  if (!floating || !reference)
    return;
  const options = Object.assign({}, defaultOptions, opts);
  const arrowEl = floating.querySelector("[data-part=arrow]");
  const middleware = [];
  const boundary = typeof options.boundary === "function" ? options.boundary() : options.boundary;
  if (options.flip) {
    middleware.push(flip({
      boundary,
      padding: options.overflowPadding
    }));
  }
  if (options.gutter || options.offset) {
    const arrowOffset = arrowEl ? arrowEl.offsetHeight / 2 : 0;
    const data2 = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if ((data2 == null ? void 0 : data2.mainAxis) != null)
      data2.mainAxis += arrowOffset;
    middleware.push(offset(data2));
  }
  middleware.push(shift({
    boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }), shiftArrow({ element: arrowEl }));
  }
  middleware.push(transformOrigin);
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      const referenceWidth = Math.round(rects.reference.width);
      floating.style.setProperty("--reference-width", `${referenceWidth}px`);
      floating.style.setProperty("--available-width", `${availableWidth}px`);
      floating.style.setProperty("--available-height", `${availableHeight}px`);
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${referenceWidth}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute(config = {}) {
    if (!reference || !floating)
      return;
    const { placement, strategy, onComplete } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy,
      ...config
    }).then((data2) => {
      const x = Math.round(data2.x);
      const y2 = Math.round(data2.y);
      Object.assign(floating.style, {
        position: data2.strategy,
        top: "0px",
        left: "0px",
        transform: `translate3d(${x}px, ${y2}px, 0)`
      });
      onComplete == null ? void 0 : onComplete(data2);
    });
  }
  compute();
  return callAll$1(options.listeners ? autoUpdate(reference, floating, compute, options.listeners) : void 0, options.onCleanup);
}
var ARROW_FLOATING_STYLE = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function getPlacementStyles(options) {
  const { placement = "bottom" } = options;
  return {
    arrow: {
      position: "absolute",
      width: cssVars.arrowSize.reference,
      height: cssVars.arrowSize.reference,
      [cssVars.arrowSizeHalf.variable]: `calc(${cssVars.arrowSize.reference} / 2)`,
      [cssVars.arrowOffset.variable]: `calc(${cssVars.arrowSizeHalf.reference} * -1)`
    },
    arrowTip: {
      transform: ARROW_FLOATING_STYLE[placement.split("-")[0]],
      background: cssVars.arrowBg.reference,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "inherit"
    },
    floating: {
      position: "absolute",
      minWidth: "max-content",
      top: "0px",
      left: "0px"
    }
  };
}
function connect$1(state2, send, normalize) {
  var _a, _b, _c;
  const translations = state2.context.translations;
  const isDisabled = state2.context.disabled;
  const isInteractive = state2.context.isInteractive;
  const isInvalid = state2.context.invalid;
  const isReadOnly = state2.context.readOnly;
  const isOpen = state2.hasTag("open");
  const isFocused = state2.hasTag("focused");
  const isIdle = state2.hasTag("idle");
  const autofill = isOpen && state2.context.navigationData && state2.context.autoComplete;
  const showClearButton = (!isIdle || state2.context.isHovering) && !state2.context.isInputValueEmpty;
  const value = autofill ? (_a = state2.context.navigationData) == null ? void 0 : _a.label : state2.context.inputValue;
  const popperStyles = getPlacementStyles({
    placement: state2.context.currentPlacement
  });
  const api = {
    isFocused,
    isOpen,
    isInputValueEmpty: state2.context.isInputValueEmpty,
    inputValue: state2.context.inputValue,
    focusedOption: state2.context.focusedOptionData,
    selectedValue: (_b = state2.context.selectionData) == null ? void 0 : _b.value,
    setValue(value2) {
      let data2;
      if (typeof value2 === "string") {
        data2 = { value: value2, label: dom$1.getValueLabel(state2.context, value2) };
      } else {
        data2 = value2;
      }
      send({ type: "SET_VALUE", ...data2 });
    },
    setInputValue(value2) {
      send({ type: "SET_INPUT_VALUE", value: value2 });
    },
    clearValue() {
      send("CLEAR_VALUE");
    },
    focus() {
      var _a2;
      (_a2 = dom$1.getInputEl(state2.context)) == null ? void 0 : _a2.focus();
    },
    rootProps: normalize.element({
      ...parts.root.attrs,
      id: dom$1.getRootId(state2.context),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly)
    }),
    labelProps: normalize.label({
      ...parts.label.attrs,
      htmlFor: dom$1.getInputId(state2.context),
      id: dom$1.getLabelId(state2.context),
      "data-readonly": dataAttr(isReadOnly),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-focus": dataAttr(isFocused)
    }),
    controlProps: normalize.element({
      ...parts.control.attrs,
      id: dom$1.getControlId(state2.context),
      "data-expanded": dataAttr(isOpen),
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      onPointerOver() {
        if (!isInteractive)
          return;
        send("POINTER_OVER");
      },
      onPointerLeave() {
        if (!isInteractive)
          return;
        send("POINTER_LEAVE");
      }
    }),
    positionerProps: normalize.element({
      ...parts.positioner.attrs,
      id: dom$1.getPositionerId(state2.context),
      "data-expanded": dataAttr(isOpen),
      hidden: !isOpen,
      style: popperStyles.floating
    }),
    inputProps: normalize.input({
      ...parts.input.attrs,
      "aria-invalid": ariaAttr(isInvalid),
      "data-invalid": dataAttr(isInvalid),
      name: state2.context.name,
      form: state2.context.form,
      disabled: isDisabled,
      autoFocus: state2.context.autoFocus,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "none",
      spellCheck: "false",
      readOnly: isReadOnly,
      placeholder: state2.context.placeholder,
      id: dom$1.getInputId(state2.context),
      type: "text",
      role: "combobox",
      defaultValue: value,
      "data-value": value,
      "aria-autocomplete": state2.context.autoComplete ? "both" : "list",
      "aria-controls": isOpen ? dom$1.getContentId(state2.context) : void 0,
      "aria-expanded": isOpen,
      "aria-activedescendant": (_c = state2.context.focusedId) != null ? _c : void 0,
      onClick() {
        if (!isInteractive)
          return;
        send("CLICK_INPUT");
      },
      onFocus() {
        if (isDisabled)
          return;
        send("FOCUS");
      },
      onChange(event) {
        const evt = getNativeEvent(event);
        if (evt.isComposing)
          return;
        send({ type: "CHANGE", value: event.currentTarget.value });
      },
      onKeyDown(event) {
        if (!isInteractive)
          return;
        const evt = getNativeEvent(event);
        if (evt.ctrlKey || evt.shiftKey || evt.isComposing)
          return;
        let prevent = false;
        const keymap = {
          ArrowDown(event2) {
            send(event2.altKey ? "ALT_ARROW_DOWN" : "ARROW_DOWN");
            prevent = true;
          },
          ArrowUp() {
            send(event.altKey ? "ALT_ARROW_UP" : "ARROW_UP");
            prevent = true;
          },
          Home(event2) {
            const isCtrlKey2 = event2.ctrlKey || event2.metaKey;
            if (isCtrlKey2)
              return;
            send({ type: "HOME", preventDefault: () => event2.preventDefault() });
          },
          End(event2) {
            const isCtrlKey2 = event2.ctrlKey || event2.metaKey;
            if (isCtrlKey2)
              return;
            send({ type: "END", preventDefault: () => event2.preventDefault() });
          },
          Enter() {
            send("ENTER");
            prevent = true;
          },
          Escape() {
            send("ESCAPE");
            prevent = true;
          },
          Tab() {
            send("TAB");
          }
        };
        const key = getEventKey(event, state2.context);
        const exec2 = keymap[key];
        exec2 == null ? void 0 : exec2(event);
        if (prevent) {
          event.preventDefault();
        }
      }
    }),
    triggerProps: normalize.button({
      ...parts.trigger.attrs,
      id: dom$1.getTriggerId(state2.context),
      "aria-haspopup": "listbox",
      type: "button",
      tabIndex: -1,
      "aria-label": translations.triggerLabel,
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? dom$1.getContentId(state2.context) : void 0,
      disabled: isDisabled,
      "data-readonly": dataAttr(isReadOnly),
      "data-disabled": dataAttr(isDisabled),
      onPointerDown(event) {
        const evt = getNativeEvent(event);
        if (!isInteractive || !isLeftClick(evt) || evt.pointerType === "touch")
          return;
        send("CLICK_BUTTON");
        event.preventDefault();
      },
      onPointerUp(event) {
        if (event.pointerType !== "touch")
          return;
        send("CLICK_BUTTON");
      }
    }),
    contentProps: normalize.element({
      ...parts.content.attrs,
      id: dom$1.getContentId(state2.context),
      role: "listbox",
      hidden: !isOpen,
      "aria-labelledby": dom$1.getLabelId(state2.context),
      onPointerDown(event) {
        event.preventDefault();
      }
    }),
    clearTriggerProps: normalize.button({
      ...parts.clearTrigger.attrs,
      id: dom$1.getClearTriggerId(state2.context),
      type: "button",
      tabIndex: -1,
      disabled: isDisabled,
      "aria-label": translations.clearTriggerLabel,
      hidden: !showClearButton,
      onPointerDown(event) {
        const evt = getNativeEvent(event);
        if (!isInteractive || !isLeftClick(evt))
          return;
        send("CLEAR_VALUE");
        event.preventDefault();
      }
    }),
    getOptionState(props) {
      var _a2;
      const { value: value2, index, disabled } = props;
      const id = dom$1.getOptionId(state2.context, value2, index);
      const focused = state2.context.focusedId === id;
      const checked = ((_a2 = state2.context.selectionData) == null ? void 0 : _a2.value) === value2;
      return { disabled, focused, checked };
    },
    getOptionProps(props) {
      const { value: value2, label, index, count } = props;
      const id = dom$1.getOptionId(state2.context, value2, index);
      const optionState = api.getOptionState(props);
      return normalize.element({
        ...parts.option.attrs,
        id,
        role: "option",
        tabIndex: -1,
        "data-highlighted": dataAttr(optionState.focused),
        "data-disabled": dataAttr(optionState.disabled),
        "data-checked": dataAttr(optionState.checked),
        "aria-selected": optionState.focused,
        "aria-disabled": optionState.disabled,
        "aria-posinset": count && index != null ? index + 1 : void 0,
        "aria-setsize": count,
        "data-value": value2,
        "data-label": label,
        onPointerMove() {
          if (optionState.disabled)
            return;
          send({ type: "POINTEROVER_OPTION", id, value: value2, label });
        },
        onPointerUp() {
          if (optionState.disabled)
            return;
          send({ type: "CLICK_OPTION", src: "pointerup", id, value: value2, label });
        },
        onClick() {
          if (optionState.disabled)
            return;
          send({ type: "CLICK_OPTION", src: "click", id, value: value2, label });
        },
        onAuxClick(event) {
          if (optionState.disabled)
            return;
          event.preventDefault();
          send({ type: "CLICK_OPTION", src: "auxclick", id, value: value2, label });
        }
      });
    },
    getOptionGroupProps(props) {
      const { label } = props;
      return normalize.element({
        ...parts.optionGroup.attrs,
        role: "group",
        "aria-label": label
      });
    }
  };
  return api;
}
var elementCountMap = /* @__PURE__ */ new WeakMap();
function isLiveRegion(node, win) {
  return node instanceof win.HTMLElement && node.dataset.liveAnnouncer === "true";
}
function ariaHidden(targets, rootEl) {
  var _a;
  const exclude = targets.filter(Boolean);
  if (exclude.length === 0)
    return;
  const doc = exclude[0].ownerDocument || document;
  const win = (_a = doc.defaultView) != null ? _a : window;
  const visibleNodes = new Set(exclude);
  const hiddenNodes = /* @__PURE__ */ new Set();
  const root = rootEl != null ? rootEl : doc.body;
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node2) {
      if (isLiveRegion(node2, win)) {
        visibleNodes.add(node2);
      }
      if (visibleNodes.has(node2) || hiddenNodes.has(node2.parentElement)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node2 instanceof win.HTMLElement && node2.getAttribute("role") === "row") {
        return NodeFilter.FILTER_SKIP;
      }
      if (exclude.some((target) => node2.contains(target))) {
        return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const hide = (node2) => {
    var _a2;
    let refCount = (_a2 = elementCountMap.get(node2)) != null ? _a2 : 0;
    if (node2.getAttribute("aria-hidden") === "true" && refCount === 0) {
      return;
    }
    if (refCount === 0) {
      node2.setAttribute("aria-hidden", "true");
    }
    hiddenNodes.add(node2);
    elementCountMap.set(node2, refCount + 1);
  };
  let node = walker.nextNode();
  while (node != null) {
    hide(node);
    node = walker.nextNode();
  }
  const observer = new win.MutationObserver((changes) => {
    for (let change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0)
        continue;
      if (![...visibleNodes, ...hiddenNodes].some((node2) => node2.contains(change.target))) {
        for (const node2 of change.addedNodes) {
          if (isLiveRegion(node2, win)) {
            visibleNodes.add(node2);
          } else if (node2 instanceof win.Element) {
            hide(node2);
          }
        }
      }
    }
  });
  observer.observe(root, { childList: true, subtree: true });
  return () => {
    observer.disconnect();
    for (let node2 of hiddenNodes) {
      let count = elementCountMap.get(node2);
      if (count === 1) {
        node2.removeAttribute("aria-hidden");
        elementCountMap.delete(node2);
        continue;
      }
      if (count !== void 0) {
        elementCountMap.set(node2, count - 1);
      }
    }
  };
}
var runIfFn = (v, ...a2) => {
  const res = typeof v === "function" ? v(...a2) : v;
  return res != null ? res : void 0;
};
var cast = (v) => v;
var noop$2 = () => {
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
const t$1 = Symbol();
const s$1 = Object.getPrototypeOf, c$1 = /* @__PURE__ */ new WeakMap(), l$1 = (e2) => e2 && (c$1.has(e2) ? c$1.get(e2) : s$1(e2) === Object.prototype || s$1(e2) === Array.prototype), y = (e2) => l$1(e2) && e2[t$1] || null, h = (e2, t2 = true) => {
  c$1.set(e2, t2);
};
var isObject$2 = (x) => typeof x === "object" && x !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject$2(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache2 = snapCache.get(target);
  if ((cache2 == null ? void 0 : cache2[0]) === version) {
    return cache2[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet.has(value)) {
      h(value, false);
      snap[key] = value;
    } else if (value instanceof Promise) {
      Object.defineProperty(snap, key, {
        get() {
          return handlePromise(value);
        }
      });
    } else if (proxyStateMap.has(value)) {
      snap[key] = snapshot(value, handlePromise);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = (initialObject) => {
  if (!isObject$2(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      var _a;
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject$2(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if ((_a = Object.getOwnPropertyDescriptor(target, prop)) == null ? void 0 : _a.set)
        ;
      else if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e2) => {
          value.status = "rejected";
          value.reason = e2;
          notifyUpdate(["reject", [prop], e2]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxy(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  proxyFunction2,
  proxyStateMap,
  refSet,
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return proxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
function proxyWithComputed(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set2 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot(proxyObject));
    if (set2) {
      desc.set = (newValue) => set2(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy(initialObject);
  return proxyObject;
}
var defaultCompareFn = (prev, next) => Object.is(prev, next);
function subscribeKey(obj, key, fn, sync, compareFn) {
  let prev = Reflect.get(snapshot(obj), key);
  const isEqual = compareFn || defaultCompareFn;
  function onSnapshotChange() {
    const snap = snapshot(obj);
    if (isEqual(prev, snap[key]))
      return;
    fn(snap[key]);
    prev = Reflect.get(snap, key);
  }
  return subscribe(obj, onSnapshotChange, sync);
}
function createProxy(config) {
  var _a, _b, _c;
  const computedContext = (_a = config.computed) != null ? _a : cast({});
  const initialContext = (_b = config.context) != null ? _b : cast({});
  const state2 = proxy({
    value: (_c = config.initial) != null ? _c : "",
    previousValue: "",
    event: cast({}),
    previousEvent: cast({}),
    context: proxyWithComputed(initialContext, computedContext),
    done: false,
    tags: [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast(this).nextEvents.includes(event);
    },
    get nextEvents() {
      var _a2, _b2, _c2, _d;
      const stateEvents = (_c2 = (_b2 = (_a2 = config.states) == null ? void 0 : _a2[this.value]) == null ? void 0 : _b2["on"]) != null ? _c2 : {};
      const globalEvents = (_d = config == null ? void 0 : config.on) != null ? _d : {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast(state2);
}
var isDev = () => false;
var isArray$1 = (v) => Array.isArray(v);
var isObject$1 = (v) => !(v == null || typeof v !== "object" || isArray$1(v));
var isNumber$3 = (v) => typeof v === "number" && !Number.isNaN(v);
var isString$2 = (v) => typeof v === "string";
var isFunction$1 = (v) => typeof v === "function";
function compact(obj) {
  if (!isPlainObject(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var isPlainObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function deepMerge(source, ...objects) {
  for (const obj of objects) {
    const target = compact(obj);
    for (const key in target) {
      if (isObject$1(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function warn(...a2) {
  const m = a2.length === 1 ? a2[0] : a2[1];
  const c2 = a2.length === 2 ? a2[0] : true;
  if (c2 && false) {
    console.warn(m);
  }
}
function invariant(...a2) {
  const m = a2.length === 1 ? a2[0] : a2[1];
  const c2 = a2.length === 2 ? a2[0] : true;
  if (c2 && false) {
    throw new Error(m);
  }
}
function determineDelayFn(delay, delaysMap) {
  return (context, event) => {
    if (isNumber$3(delay))
      return delay;
    if (isFunction$1(delay)) {
      return delay(context, event);
    }
    if (isString$2(delay)) {
      const value = Number.parseFloat(delay);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap == null ? void 0 : delaysMap[delay];
        invariant(valueOrFn == null, `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``);
        return isFunction$1(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function set(obj, key, val) {
  if (typeof val.value === "object")
    val.value = klona(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function klona(x) {
  if (typeof x !== "object")
    return x;
  var i2 = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(x.__proto__ || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(klona(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
  } else if (str === "[object Date]") {
    tmp = new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(klona(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i2 < list.length; i2++) {
      set(tmp, list[i2], Object.getOwnPropertyDescriptor(x, list[i2]));
    }
    for (i2 = 0, list = Object.getOwnPropertyNames(x); i2 < list.length; i2++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i2]) && tmp[k] === x[k])
        continue;
      set(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
function structuredClone(v) {
  return klona(v);
}
function toEvent(event) {
  const obj = isString$2(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value)
    return [];
  return isArray$1(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject$1(value) && value.predicate != null;
}
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    var _a;
    if (isString$2(guard)) {
      return !!((_a = guardMap[guard]) == null ? void 0 : _a.call(guardMap, ctx, event, meta));
    }
    if (isFunction$1(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and$1(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not$1(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or, and: and$1, not: not$1, stateIn };
function determineGuardFn(guard, guardMap) {
  guard = guard != null ? guard : Truthy;
  return (context, event, meta) => {
    if (isString$2(guard)) {
      const value = guardMap[guard];
      return isFunction$1(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard == null ? void 0 : guard(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function toTarget(target) {
  return isString$2(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      var _a;
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return (_a = guard != null ? guard : transition.target) != null ? _a : transition.actions;
    });
  };
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function clear(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var Machine = class {
  constructor(config, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    __publicField(this, "status", "Not Started");
    __publicField(this, "state");
    __publicField(this, "initialState");
    __publicField(this, "initialContext");
    __publicField(this, "id");
    __publicField(this, "type", "machine");
    __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextListeners", /* @__PURE__ */ new Set());
    __publicField(this, "eventListeners", /* @__PURE__ */ new Set());
    __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField(this, "removeStateListener", noop$2);
    __publicField(this, "removeEventListener", noop$2);
    __publicField(this, "removeContextListener", noop$2);
    __publicField(this, "parent");
    __publicField(this, "children", /* @__PURE__ */ new Map());
    __publicField(this, "guardMap");
    __publicField(this, "actionMap");
    __publicField(this, "delayMap");
    __publicField(this, "activityMap");
    __publicField(this, "sync");
    __publicField(this, "options");
    __publicField(this, "config");
    __publicField(this, "start", (init) => {
      this.state.value = "";
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe(this.state, () => {
        this.stateListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
      }, this.sync);
      this.removeEventListener = subscribeKey(this.state, "event", (event22) => {
        this.executeActions(this.config.onEvent, event22);
        this.eventListeners.forEach((listener) => {
          listener(event22);
        });
      }, this.sync);
      this.removeContextListener = subscribe(this.state.context, () => {
        this.log("Context:", this.contextSnapshot);
        this.contextListeners.forEach((listener) => {
          listener(this.contextSnapshot);
        });
      }, this.sync || this.options.debug);
      this.setupContextWatchers();
      this.executeActivities(toEvent("machine.start"), toArray(this.config.activities), "machine.start");
      this.executeActions(this.config.entry, toEvent("machine.start"));
      const event2 = toEvent("machine.init");
      const target = isObject$1(init) ? init.value : init;
      const context = isObject$1(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target != null ? target : this.config.initial
      };
      const next = this.getNextStateInfo(transition, event2);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event2);
      return this;
    });
    __publicField(this, "setupContextWatchers", () => {
      var _a2, _b2;
      for (const [key, fn] of Object.entries((_a2 = this.config.watch) != null ? _a2 : {})) {
        const compareFn = (_b2 = this.options.compareFns) == null ? void 0 : _b2[key];
        const cleanup = subscribeKey(this.state.context, key, () => {
          this.executeActions(fn, this.state.event);
        }, this.sync, compareFn);
        this.contextWatchers.add(cleanup);
      }
    });
    __publicField(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent("machine.stop"));
      this.executeActions(this.config.exit, toEvent("machine.stop"));
      this.setState("");
      this.setEvent("machine.stop");
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.stopEventListeners();
      this.stopContextListeners();
      this.status = "Stopped";
      return this;
    });
    __publicField(this, "stopEventListeners", () => {
      this.eventListeners.clear();
      this.removeEventListener();
    });
    __publicField(this, "stopContextListeners", () => {
      this.contextListeners.clear();
      this.removeContextListener();
    });
    __publicField(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state2) => {
        state2.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField(this, "stopActivities", (state2) => {
      var _a2, _b2;
      if (state2) {
        (_a2 = this.activityEvents.get(state2)) == null ? void 0 : _a2.forEach((stop) => stop());
        (_b2 = this.activityEvents.get(state2)) == null ? void 0 : _b2.clear();
        this.activityEvents.delete(state2);
      } else {
        this.activityEvents.forEach((state22) => {
          state22.forEach((stop) => stop());
          state22.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField(this, "sendChild", (evt, to) => {
      const event2 = toEvent(evt);
      const id = runIfFn(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant(`[@zag-js/core] Cannot send '${event2.type}' event to unknown child`);
      }
      child.send(event2);
    });
    __publicField(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField(this, "spawn", (src, id) => {
      const actor = runIfFn(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast(ref(actor));
    });
    __publicField(this, "addActivityCleanup", (state2, cleanup) => {
      var _a2;
      if (!state2)
        return;
      if (!this.activityEvents.has(state2)) {
        this.activityEvents.set(state2, /* @__PURE__ */ new Set([cleanup]));
      } else {
        (_a2 = this.activityEvents.get(state2)) == null ? void 0 : _a2.add(cleanup);
      }
    });
    __publicField(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear(this.state.tags);
      } else {
        this.state.tags = toArray(stateNode == null ? void 0 : stateNode.tags);
      }
    });
    __publicField(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge(this.state.context, context);
    });
    __publicField(this, "withContext", (context) => {
      const newContext = { ...this.config.context, ...compact(context) };
      return new Machine({ ...this.config, context: newContext }, this.options);
    });
    __publicField(this, "setOptions", (options2) => {
      const opts = compact(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField(this, "getStateNode", (state2) => {
      var _a2;
      if (!state2)
        return;
      return (_a2 = this.config.states) == null ? void 0 : _a2[state2];
    });
    __publicField(this, "getNextStateInfo", (transitions, event2) => {
      var _a2;
      const transition = this.determineTransition(transitions, event2);
      const isTargetless = !(transition == null ? void 0 : transition.target);
      const target = (_a2 = transition == null ? void 0 : transition.target) != null ? _a2 : this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !(transition == null ? void 0 : transition.internal);
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event2.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField(this, "getActionFromDelayedTransition", (transition) => {
      const event2 = toEvent("machine.after");
      const determineDelay = determineDelayFn(transition.delay, this.delayMap);
      const delay = determineDelay(this.contextSnapshot, event2);
      let id;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, event2);
            this.performStateChangeEffects(this.state.value, next, event2);
          }, delay);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField(this, "getDelayedEventActions", (state2) => {
      const stateNode = this.getStateNode(state2);
      const event2 = toEvent("machine.after");
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray$1(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event2);
        if (!transition)
          return;
        const actions = this.getActionFromDelayedTransition(transition);
        entries.push(actions.entry);
        exits.push(actions.exit);
      } else if (isObject$1(stateNode.after)) {
        for (const delay in stateNode.after) {
          const transition = stateNode.after[delay];
          let resolvedTransition = {};
          if (isArray$1(transition)) {
            const picked = this.determineTransition(transition, event2);
            if (picked)
              resolvedTransition = picked;
          } else if (isString$2(transition)) {
            resolvedTransition = { target: transition, delay };
          } else {
            resolvedTransition = { ...transition, delay };
          }
          const actions = this.getActionFromDelayedTransition(resolvedTransition);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField(this, "executeActions", (actions, event2) => {
      var _a2;
      const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event2, this.guardMeta);
      for (const action of toArray(pickedActions)) {
        const fn = isString$2(action) ? (_a2 = this.actionMap) == null ? void 0 : _a2[action] : action;
        warn(isString$2(action) && !fn, `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``);
        fn == null ? void 0 : fn(this.state.context, event2, this.meta);
      }
    });
    __publicField(this, "executeActivities", (event2, activities, state2) => {
      var _a2;
      for (const activity of activities) {
        const fn = isString$2(activity) ? (_a2 = this.activityMap) == null ? void 0 : _a2[activity] : activity;
        if (!fn) {
          warn(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event2, this.meta);
        if (cleanup) {
          this.addActivityCleanup(state2 != null ? state2 : this.state.value, cleanup);
        }
      }
    });
    __publicField(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      const event2 = toEvent("machine.every");
      if (isArray$1(every)) {
        const picked = toArray(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
          const delay2 = determineDelay2(this.contextSnapshot, event2);
          const determineGuard = determineGuardFn(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, event2, this.guardMeta);
          return guard != null ? guard : delay2 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn(picked.delay, this.delayMap);
        const delay = determineDelay(this.contextSnapshot, event2);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, event2);
          }, delay);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every == null ? void 0 : every[interval];
          const determineDelay = determineDelayFn(interval, this.delayMap);
          const delay = determineDelay(this.contextSnapshot, event2);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, event2);
            }, delay);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField(this, "setEvent", (event2) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref(toEvent(event2));
    });
    __publicField(this, "performExitEffects", (current, event2) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn(stateNode == null ? void 0 : stateNode.exit, this.guardMap)(this.contextSnapshot, event2, this.guardMeta);
      const exitActions = toArray(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event2);
      this.eventListeners.clear();
    });
    __publicField(this, "performEntryEffects", (next, event2) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray(stateNode == null ? void 0 : stateNode.activities);
      this.createEveryActivities(stateNode == null ? void 0 : stateNode.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event2, activities);
      }
      const pickedActions = determineActionsFn(stateNode == null ? void 0 : stateNode.entry, this.guardMap)(this.contextSnapshot, event2, this.guardMeta);
      const entryActions = toArray(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if ((stateNode == null ? void 0 : stateNode.after) && afterActions) {
        this.delayedEvents.set(next, afterActions == null ? void 0 : afterActions.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event2);
      if ((stateNode == null ? void 0 : stateNode.type) === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField(this, "performTransitionEffects", (transitions, event2) => {
      const transition = this.determineTransition(transitions, event2);
      this.executeActions(transition == null ? void 0 : transition.actions, event2);
    });
    __publicField(this, "performStateChangeEffects", (current, next, event2) => {
      this.setEvent(event2);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event2);
      }
      this.performTransitionEffects(next.transition, event2);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event2);
      }
    });
    __publicField(this, "determineTransition", (transition, event2) => {
      const fn = determineTransitionFn(transition, this.guardMap);
      return fn == null ? void 0 : fn(this.contextSnapshot, event2, this.guardMeta);
    });
    __publicField(this, "sendParent", (evt) => {
      var _a2;
      if (!this.parent) {
        invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event2 = toEvent(evt);
      (_a2 = this.parent) == null ? void 0 : _a2.send(event2);
    });
    __publicField(this, "log", (...args) => {
      if (isDev() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField(this, "send", (evt) => {
      const event2 = toEvent(evt);
      this.transition(this.state.value, event2);
    });
    __publicField(this, "transition", (state2, evt) => {
      var _a2, _b2, _c2;
      const stateNode = isString$2(state2) ? this.getStateNode(state2) : state2 == null ? void 0 : state2.stateNode;
      const event2 = toEvent(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state2}, \`event\`: ${event2.type}`;
        warn(msg);
        return;
      }
      const transitions = (_c2 = (_a2 = stateNode == null ? void 0 : stateNode.on) == null ? void 0 : _a2[event2.type]) != null ? _c2 : (_b2 = this.config.on) == null ? void 0 : _b2[event2.type];
      const next = this.getNextStateInfo(transitions, event2);
      this.performStateChangeEffects(this.state.value, next, event2);
      return next.stateNode;
    });
    __publicField(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    __publicField(this, "onChange", (listener) => {
      this.contextListeners.add(listener);
      return this;
    });
    __publicField(this, "onEvent", (listener) => {
      this.eventListeners.add(listener);
      return this;
    });
    this.config = structuredClone(config);
    this.options = structuredClone(options != null ? options : {});
    this.id = (_a = this.config.id) != null ? _a : `machine-${uuid()}`;
    this.guardMap = (_c = (_b = this.options) == null ? void 0 : _b.guards) != null ? _c : {};
    this.actionMap = (_e = (_d = this.options) == null ? void 0 : _d.actions) != null ? _e : {};
    this.delayMap = (_g = (_f = this.options) == null ? void 0 : _f.delays) != null ? _g : {};
    this.activityMap = (_i = (_h = this.options) == null ? void 0 : _h.activities) != null ? _i : {};
    this.sync = (_k = (_j = this.options) == null ? void 0 : _j.sync) != null ? _k : false;
    this.state = createProxy(this.config);
    this.initialContext = snapshot(this.state.context);
    const event = toEvent("machine.created");
    this.executeActions((_l = this.config) == null ? void 0 : _l.created, event);
  }
  get stateSnapshot() {
    return cast(snapshot(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  get self() {
    const self = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      get state() {
        return self.stateSnapshot;
      },
      get initialContext() {
        return self.initialContext;
      },
      get initialState() {
        var _a, _b;
        return (_b = (_a = self.initialState) == null ? void 0 : _a.target) != null ? _b : "";
      }
    };
  }
  get meta() {
    var _a, _b;
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: (_b = (_a = this.initialState) == null ? void 0 : _a.target) != null ? _b : "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
};
var createMachine = (config, options) => new Machine(config, options);
function observeAttributes(node, attributes, fn) {
  if (!node)
    return;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}
function observeChildren(node, fn) {
  if (!node)
    return;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver(fn);
  obs.observe(node, { childList: true, subtree: true });
  return () => obs.disconnect();
}
function getWindowFrames(win) {
  const frames = {
    each(cb) {
      var _a;
      for (let i2 = 0; i2 < ((_a = win.frames) == null ? void 0 : _a.length); i2 += 1) {
        const frame = win.frames[i2];
        if (frame)
          cb(frame);
      }
    },
    addEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.addEventListener(event, listener, options);
        } catch (err) {
          console.warn(err);
        }
      });
      return () => {
        try {
          frames.removeEventListener(event, listener, options);
        } catch (err) {
          console.warn(err);
        }
      };
    },
    removeEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.removeEventListener(event, listener, options);
        } catch (err) {
          console.warn(err);
        }
      });
    }
  };
  return frames;
}
var isHTMLElement = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
function isVisible(el) {
  if (!isHTMLElement(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable(element) {
  if (!element)
    return false;
  return element.matches(focusableSelector) && isVisible(element);
}
var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function isComposedPathFocusable(event) {
  var _a;
  const composedPath = (_a = event.composedPath()) != null ? _a : [event.target];
  for (const node of composedPath) {
    if (isHTMLElement$3(node) && isFocusable(node))
      return true;
  }
  return false;
}
function trackInteractOutside(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside } = options;
  if (!node)
    return;
  const doc = getDocument(node);
  const win = getWindow$1(node);
  const frames = getWindowFrames(win);
  function isEventOutside(event) {
    const target = getEventTarget(event);
    if (!isHTMLElement$3(target)) {
      return false;
    }
    if (contains(node, target)) {
      return false;
    }
    return !(exclude == null ? void 0 : exclude(target));
  }
  let clickHandler;
  function onPointerDown(event) {
    function handler() {
      if (!node || !isEventOutside(event))
        return;
      if (onPointerDownOutside || onInteractOutside) {
        const handler2 = callAll$1(onPointerDownOutside, onInteractOutside);
        node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
      }
      fireCustomEvent(node, POINTER_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: isContextMenuEvent(event),
          focusable: isComposedPathFocusable(event)
        }
      });
    }
    if (event.pointerType === "touch") {
      frames.removeEventListener("click", handler);
      doc.removeEventListener("click", handler);
      clickHandler = handler;
      doc.addEventListener("click", handler, { once: true });
      frames.addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  }
  const cleanups = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups.add(frames.addEventListener("pointerdown", onPointerDown, true));
    cleanups.add(addDomEvent$1(doc, "pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    if (!node || !isEventOutside(event))
      return;
    if (onFocusOutside || onInteractOutside) {
      const handler = callAll$1(onFocusOutside, onInteractOutside);
      node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
    }
    fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: event,
        contextmenu: false,
        focusable: isFocusable(getEventTarget(event))
      }
    });
  }
  cleanups.add(addDomEvent$1(doc, "focusin", onFocusin, true));
  cleanups.add(frames.addEventListener("focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    if (clickHandler) {
      frames.removeEventListener("click", clickHandler);
      doc.removeEventListener("click", clickHandler);
    }
    cleanups.forEach((fn) => fn());
  };
}
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};
function setVisuallyHidden(el) {
  Object.assign(el.style, visuallyHiddenStyle);
}
var ID = "__live-region__";
function createLiveRegion(opts = {}) {
  var _a;
  const { level = "polite", document: doc = document, root, delay: _delay = 0 } = opts;
  const win = (_a = doc.defaultView) != null ? _a : window;
  const parent = root != null ? root : doc.body;
  function announce(message, delay) {
    const oldRegion = doc.getElementById(ID);
    oldRegion == null ? void 0 : oldRegion.remove();
    delay = delay != null ? delay : _delay;
    const region = doc.createElement("span");
    region.id = ID;
    region.dataset.liveAnnouncer = "true";
    const role = level !== "assertive" ? "status" : "alert";
    region.setAttribute("aria-live", level);
    region.setAttribute("role", role);
    setVisuallyHidden(region);
    parent.appendChild(region);
    win.setTimeout(() => {
      region.textContent = message;
    }, delay);
  }
  function destroy() {
    const oldRegion = doc.getElementById(ID);
    oldRegion == null ? void 0 : oldRegion.remove();
  }
  return {
    announce,
    destroy,
    toJSON() {
      return ID;
    }
  };
}
var { and, not } = guards;
function machine$1(userContext) {
  const ctx = compact$1(userContext);
  return createMachine({
    id: "combobox",
    initial: ctx.autoFocus ? "focused" : "idle",
    context: {
      loop: true,
      openOnClick: false,
      ariaHidden: true,
      focusedId: null,
      focusedOptionData: null,
      navigationData: null,
      selectionData: null,
      inputValue: "",
      liveRegion: null,
      focusOnClear: true,
      selectInputOnFocus: false,
      selectOnTab: true,
      isHovering: false,
      isKeyboardEvent: false,
      allowCustomValue: false,
      isCustomValue: (data2) => data2.inputValue !== data2.previousValue,
      inputBehavior: "none",
      selectionBehavior: "set",
      ...ctx,
      positioning: {
        placement: "bottom",
        flip: false,
        sameWidth: true,
        ...ctx.positioning
      },
      translations: {
        triggerLabel: "Toggle suggestions",
        clearTriggerLabel: "Clear value",
        navigationHint: "use the up and down keys to navigate. Press the enter key to select",
        countAnnouncement: (count) => `${count} ${count === 1 ? "option" : "options"} available`,
        ...ctx.translations
      }
    },
    computed: {
      isInputValueEmpty: (ctx2) => ctx2.inputValue.length === 0,
      isInteractive: (ctx2) => !(ctx2.readOnly || ctx2.disabled),
      autoComplete: (ctx2) => ctx2.inputBehavior === "autocomplete",
      autoHighlight: (ctx2) => ctx2.inputBehavior === "autohighlight"
    },
    watch: {
      inputValue: "invokeOnInputChange",
      navigationData: "invokeOnHighlight",
      selectionData: ["invokeOnSelect", "blurInputIfNeeded"],
      focusedId: "setSectionLabel"
    },
    entry: ["setupLiveRegion"],
    exit: ["removeLiveRegion"],
    activities: ["syncInputValue"],
    on: {
      SET_VALUE: {
        actions: ["setInputValue", "setSelectionData"]
      },
      SET_INPUT_VALUE: {
        actions: "setInputValue"
      },
      CLEAR_VALUE: [
        {
          guard: "focusOnClear",
          target: "focused",
          actions: ["clearInputValue", "clearSelectedValue"]
        },
        {
          actions: ["clearInputValue", "clearSelectedValue"]
        }
      ],
      POINTER_OVER: {
        actions: "setIsHovering"
      },
      POINTER_LEAVE: {
        actions: "clearIsHovering"
      }
    },
    states: {
      idle: {
        tags: ["idle"],
        entry: ["scrollToTop", "clearFocusedOption"],
        on: {
          CLICK_BUTTON: {
            target: "interacting",
            actions: ["focusInput", "invokeOnOpen"]
          },
          CLICK_INPUT: {
            guard: "openOnClick",
            target: "interacting",
            actions: "invokeOnOpen"
          },
          FOCUS: "focused"
        }
      },
      focused: {
        tags: ["focused"],
        entry: ["focusInput", "scrollToTop", "clearFocusedOption"],
        activities: ["trackInteractOutside"],
        on: {
          CHANGE: {
            target: "suggesting",
            actions: "setInputValue"
          },
          BLUR: "idle",
          ESCAPE: {
            guard: and("isCustomValue", not("allowCustomValue")),
            actions: "revertInputValue"
          },
          CLICK_INPUT: {
            guard: "openOnClick",
            target: "interacting",
            actions: ["focusInput", "invokeOnOpen"]
          },
          CLICK_BUTTON: {
            target: "interacting",
            actions: ["focusInput", "invokeOnOpen"]
          },
          POINTER_OVER: {
            actions: "setIsHovering"
          },
          ARROW_UP: [
            {
              guard: "autoComplete",
              target: "interacting",
              actions: "invokeOnOpen"
            },
            {
              target: "interacting",
              actions: ["focusLastOption", "invokeOnOpen"]
            }
          ],
          ARROW_DOWN: [
            {
              guard: "autoComplete",
              target: "interacting",
              actions: "invokeOnOpen"
            },
            {
              target: "interacting",
              actions: ["focusFirstOption", "invokeOnOpen"]
            }
          ],
          ALT_ARROW_DOWN: {
            target: "interacting",
            actions: ["focusInput", "invokeOnOpen"]
          }
        }
      },
      suggesting: {
        tags: ["open", "focused"],
        activities: [
          "trackInteractOutside",
          "scrollOptionIntoView",
          "computePlacement",
          "trackOptionNodes",
          "hideOtherElements"
        ],
        entry: ["focusInput", "invokeOnOpen"],
        on: {
          ARROW_DOWN: {
            target: "interacting",
            actions: "focusNextOption"
          },
          ARROW_UP: {
            target: "interacting",
            actions: "focusPrevOption"
          },
          ALT_ARROW_UP: "focused",
          HOME: {
            target: "interacting",
            actions: ["focusFirstOption", "preventDefault"]
          },
          END: {
            target: "interacting",
            actions: ["focusLastOption", "preventDefault"]
          },
          ENTER: [
            {
              guard: and("hasFocusedOption", "autoComplete"),
              target: "focused",
              actions: "selectActiveOption"
            },
            {
              guard: "hasFocusedOption",
              target: "focused",
              actions: "selectOption"
            }
          ],
          CHANGE: [
            {
              guard: "autoHighlight",
              actions: ["clearFocusedOption", "setInputValue", "focusFirstOption"]
            },
            {
              actions: ["clearFocusedOption", "setInputValue"]
            }
          ],
          ESCAPE: {
            target: "focused",
            actions: "invokeOnClose"
          },
          POINTEROVER_OPTION: [
            {
              guard: "autoComplete",
              target: "interacting",
              actions: "setActiveOption"
            },
            {
              target: "interacting",
              actions: ["setActiveOption", "setNavigationData"]
            }
          ],
          BLUR: {
            target: "idle",
            actions: "invokeOnClose"
          },
          CLICK_BUTTON: {
            target: "focused",
            actions: "invokeOnClose"
          },
          CLICK_OPTION: {
            target: "focused",
            actions: ["selectOption", "invokeOnClose"]
          }
        }
      },
      interacting: {
        tags: ["open", "focused"],
        activities: ["scrollOptionIntoView", "trackInteractOutside", "computePlacement", "hideOtherElements"],
        entry: "focusMatchingOption",
        on: {
          HOME: {
            actions: ["focusFirstOption", "preventDefault"]
          },
          END: {
            actions: ["focusLastOption", "preventDefault"]
          },
          ARROW_DOWN: [
            {
              guard: and("autoComplete", "isLastOptionFocused"),
              actions: ["clearFocusedOption", "scrollToTop"]
            },
            { actions: "focusNextOption" }
          ],
          ARROW_UP: [
            {
              guard: and("autoComplete", "isFirstOptionFocused"),
              actions: "clearFocusedOption"
            },
            {
              actions: "focusPrevOption"
            }
          ],
          ALT_UP: {
            target: "focused",
            actions: ["selectOption", "invokeOnClose"]
          },
          CLEAR_FOCUS: {
            actions: "clearFocusedOption"
          },
          TAB: {
            guard: "selectOnTab",
            target: "idle",
            actions: ["selectOption", "invokeOnClose"]
          },
          ENTER: {
            target: "focused",
            actions: ["selectOption", "invokeOnClose"]
          },
          CHANGE: [
            {
              guard: "autoComplete",
              target: "suggesting",
              actions: ["commitNavigationData", "setInputValue"]
            },
            {
              target: "suggesting",
              actions: ["clearFocusedOption", "setInputValue"]
            }
          ],
          POINTEROVER_OPTION: [
            {
              guard: "autoComplete",
              actions: "setActiveOption"
            },
            {
              actions: ["setActiveOption", "setNavigationData"]
            }
          ],
          CLICK_OPTION: {
            target: "focused",
            actions: ["selectOption", "invokeOnClose"]
          },
          ESCAPE: {
            target: "focused",
            actions: "invokeOnClose"
          },
          CLICK_BUTTON: {
            target: "focused",
            actions: "invokeOnClose"
          },
          BLUR: {
            target: "idle",
            actions: "invokeOnClose"
          }
        }
      }
    }
  }, {
    guards: {
      openOnClick: (ctx2) => !!ctx2.openOnClick,
      isInputValueEmpty: (ctx2) => ctx2.isInputValueEmpty,
      focusOnClear: (ctx2) => !!ctx2.focusOnClear,
      autoFocus: (ctx2) => !!ctx2.autoFocus,
      autoComplete: (ctx2) => ctx2.autoComplete,
      autoHighlight: (ctx2) => ctx2.autoHighlight,
      isFirstOptionFocused: (ctx2) => {
        var _a;
        return ((_a = dom$1.getFirstEl(ctx2)) == null ? void 0 : _a.id) === ctx2.focusedId;
      },
      isLastOptionFocused: (ctx2) => {
        var _a;
        return ((_a = dom$1.getLastEl(ctx2)) == null ? void 0 : _a.id) === ctx2.focusedId;
      },
      isCustomValue: (ctx2) => {
        var _a, _b;
        return !!((_b = ctx2.isCustomValue) == null ? void 0 : _b.call(ctx2, { inputValue: ctx2.inputValue, previousValue: (_a = ctx2.selectionData) == null ? void 0 : _a.value }));
      },
      allowCustomValue: (ctx2) => !!ctx2.allowCustomValue,
      hasFocusedOption: (ctx2) => !!ctx2.focusedId,
      selectOnTab: (ctx2) => !!ctx2.selectOnTab
    },
    activities: {
      syncInputValue: (ctx2) => {
        const input2 = dom$1.getInputEl(ctx2);
        return observeAttributes(input2, ["data-value"], () => {
          if (!input2)
            return;
          const value = input2.dataset.value || "";
          input2.value = value;
          input2.selectionStart = value.length;
          input2.selectionEnd = value.length;
        });
      },
      trackInteractOutside(ctx2, _evt, { send }) {
        return trackInteractOutside(dom$1.getInputEl(ctx2), {
          exclude(target) {
            const ignore = [dom$1.getContentEl(ctx2), dom$1.getTriggerEl(ctx2)];
            return ignore.some((el) => contains(el, target));
          },
          onInteractOutside(event) {
            var _a;
            (_a = ctx2.onInteractOutside) == null ? void 0 : _a.call(ctx2, event);
            if (event.defaultPrevented)
              return;
            send({ type: "BLUR", src: "interact-outside" });
          }
        });
      },
      hideOtherElements(ctx2) {
        if (!ctx2.ariaHidden)
          return;
        return ariaHidden([dom$1.getInputEl(ctx2), dom$1.getContentEl(ctx2), dom$1.getTriggerEl(ctx2)]);
      },
      computePlacement(ctx2) {
        ctx2.currentPlacement = ctx2.positioning.placement;
        return getPlacement(dom$1.getControlEl(ctx2), dom$1.getPositionerEl(ctx2), {
          ...ctx2.positioning,
          onComplete(data2) {
            ctx2.currentPlacement = data2.placement;
          },
          onCleanup() {
            ctx2.currentPlacement = void 0;
          }
        });
      },
      trackOptionNodes(ctx2, evt, meta) {
        if (!ctx2.autoHighlight)
          return;
        const focusFirstOption = meta.getAction("focusFirstOption");
        const exec2 = () => focusFirstOption(ctx2, evt, meta);
        exec2();
        return observeChildren(dom$1.getContentEl(ctx2), exec2);
      },
      scrollOptionIntoView(ctx2, _evt, { getState }) {
        const input2 = dom$1.getInputEl(ctx2);
        return observeAttributes(input2, ["aria-activedescendant"], () => {
          const evt = getState().event;
          const isKeyboardEvent = /(ARROW_UP|ARROW_DOWN|HOME|END|TAB)/.test(evt.type);
          if (!isKeyboardEvent)
            return;
          const option2 = dom$1.getActiveOptionEl(ctx2);
          option2 == null ? void 0 : option2.scrollIntoView({ block: "nearest" });
          if (ctx2.autoComplete) {
            dom$1.focusInput(ctx2);
          }
        });
      }
    },
    actions: {
      setupLiveRegion(ctx2) {
        ctx2.liveRegion = createLiveRegion({
          level: "assertive",
          document: dom$1.getDoc(ctx2)
        });
      },
      removeLiveRegion(ctx2) {
        var _a;
        (_a = ctx2.liveRegion) == null ? void 0 : _a.destroy();
      },
      setActiveOption(ctx2, evt) {
        const { label, id, value } = evt;
        ctx2.focusedId = id;
        ctx2.focusedOptionData = { label, value };
      },
      setNavigationData(ctx2, evt) {
        const { label, value } = evt;
        ctx2.navigationData = { label, value };
      },
      clearNavigationData(ctx2) {
        ctx2.navigationData = null;
      },
      commitNavigationData(ctx2) {
        if (!ctx2.navigationData)
          return;
        ctx2.inputValue = ctx2.navigationData.label;
        ctx2.navigationData = null;
      },
      clearFocusedOption(ctx2) {
        ctx2.focusedId = null;
        ctx2.focusedOptionData = null;
        ctx2.navigationData = null;
      },
      selectActiveOption(ctx2) {
        if (!ctx2.focusedOptionData)
          return;
        ctx2.selectionData = ctx2.focusedOptionData;
        ctx2.inputValue = ctx2.focusedOptionData.label;
      },
      selectOption(ctx2, evt) {
        const isOptionEvent = !!evt.value && !!evt.label;
        ctx2.selectionData = isOptionEvent ? {
          label: evt.label,
          value: evt.value
        } : ctx2.navigationData;
        let value;
        if (!ctx2.selectionData)
          return;
        if (ctx2.selectionBehavior === "set") {
          value = ctx2.selectionData.label;
        }
        if (ctx2.selectionBehavior === "clear") {
          value = "";
        }
        if (value != null) {
          ctx2.inputValue = value;
        }
      },
      blurInputIfNeeded(ctx2) {
        if (ctx2.autoComplete || !ctx2.blurOnSelect)
          return;
        raf(() => {
          var _a;
          (_a = dom$1.getInputEl(ctx2)) == null ? void 0 : _a.blur();
        });
      },
      focusInput(ctx2, evt) {
        if (evt.type === "CHANGE")
          return;
        dom$1.focusInput(ctx2);
      },
      setInputValue(ctx2, evt) {
        const value = evt.type === "SET_VALUE" ? evt.label : evt.value;
        ctx2.inputValue = value;
      },
      clearInputValue(ctx2) {
        ctx2.inputValue = "";
      },
      revertInputValue(ctx2) {
        if (!ctx2.selectionData)
          return;
        ctx2.inputValue = ctx2.selectionData.label;
      },
      setSelectionData(ctx2, evt) {
        const { label, value } = evt;
        ctx2.selectionData = { label, value };
      },
      clearSelectedValue(ctx2) {
        ctx2.selectionData = null;
      },
      scrollToTop(ctx2) {
        const listbox = dom$1.getContentEl(ctx2);
        if (!listbox)
          return;
        listbox.scrollTop = 0;
      },
      invokeOnInputChange(ctx2) {
        var _a;
        (_a = ctx2.onInputChange) == null ? void 0 : _a.call(ctx2, { value: ctx2.inputValue });
      },
      invokeOnHighlight(ctx2) {
        var _a, _b;
        const { label, value } = (_a = ctx2.navigationData) != null ? _a : {};
        const relatedTarget = dom$1.getMatchingOptionEl(ctx2, value);
        (_b = ctx2.onHighlight) == null ? void 0 : _b.call(ctx2, { label, value, relatedTarget });
      },
      invokeOnSelect(ctx2) {
        var _a, _b;
        const { label, value } = (_a = ctx2.selectionData) != null ? _a : {};
        const relatedTarget = dom$1.getMatchingOptionEl(ctx2, value);
        (_b = ctx2.onSelect) == null ? void 0 : _b.call(ctx2, { label, value, relatedTarget });
      },
      invokeOnOpen(ctx2) {
        var _a;
        (_a = ctx2.onOpen) == null ? void 0 : _a.call(ctx2);
      },
      invokeOnClose(ctx2) {
        var _a;
        (_a = ctx2.onClose) == null ? void 0 : _a.call(ctx2);
      },
      highlightFirstOption(ctx2) {
        raf(() => {
          setHighlight(ctx2, dom$1.getFirstEl(ctx2));
        });
      },
      focusFirstOption(ctx2) {
        raf(() => {
          setFocus(ctx2, dom$1.getFirstEl(ctx2));
        });
      },
      focusLastOption(ctx2) {
        raf(() => {
          setFocus(ctx2, dom$1.getLastEl(ctx2));
        });
      },
      focusNextOption(ctx2) {
        raf(() => {
          var _a;
          const option2 = dom$1.getNextEl(ctx2, (_a = ctx2.focusedId) != null ? _a : "");
          setFocus(ctx2, option2);
        });
      },
      focusPrevOption(ctx2) {
        raf(() => {
          var _a;
          let option2 = dom$1.getPrevEl(ctx2, (_a = ctx2.focusedId) != null ? _a : "");
          setFocus(ctx2, option2);
        });
      },
      focusMatchingOption(ctx2) {
        raf(() => {
          var _a;
          const option2 = dom$1.getMatchingOptionEl(ctx2, (_a = ctx2.selectionData) == null ? void 0 : _a.value);
          option2 == null ? void 0 : option2.scrollIntoView({ block: "nearest" });
          setFocus(ctx2, option2);
        });
      },
      announceOptionCount(ctx2) {
        raf(() => {
          var _a;
          const count = dom$1.getOptionCount(ctx2);
          if (!count)
            return;
          const text = ctx2.translations.countAnnouncement(count);
          (_a = ctx2.liveRegion) == null ? void 0 : _a.announce(text);
        });
      },
      setIsHovering(ctx2) {
        ctx2.isHovering = true;
      },
      clearIsHovering(ctx2) {
        ctx2.isHovering = false;
      },
      preventDefault(_ctx, evt) {
        evt.preventDefault();
      },
      setSectionLabel(ctx2) {
        const label = dom$1.getClosestSectionLabel(ctx2);
        if (!label)
          return;
        ctx2.sectionLabel = label;
      }
    }
  });
}
function setHighlight(ctx, option2) {
  if (!option2)
    return;
  const data2 = dom$1.getOptionData(option2);
  ctx.focusedId = option2.id;
  ctx.focusedOptionData = data2;
  return data2;
}
function setFocus(ctx, option2) {
  if (!option2 || option2.id === ctx.focusedId)
    return;
  const data2 = setHighlight(ctx, option2);
  ctx.navigationData = data2;
}
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};
function toHyphenLower(match) {
  return "-" + match.toLowerCase();
}
function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }
  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
}
var isArray = (v) => Array.isArray(v);
var isObject = (v) => !(v == null || typeof v !== "object" || isArray(v));
var isNumber$2 = (v) => typeof v === "number" && !Number.isNaN(v);
var isString$1 = (v) => typeof v === "string";
var format = (v) => v.startsWith("--") ? v : hyphenateStyleName(v);
function cssify(style2) {
  let css = {};
  for (const property in style2) {
    const value = style2[property];
    if (!isString$1(value) && !isNumber$2(value))
      continue;
    css[format(property)] = value;
  }
  return css;
}
function createNormalizer(fn) {
  return new Proxy({}, {
    get() {
      return fn;
    }
  });
}
var eventMap = {
  onFocus: "onFocusIn",
  onBlur: "onFocusOut",
  onDoubleClick: "onDblClick",
  onChange: "onInput",
  defaultChecked: "checked",
  defaultValue: "value",
  htmlFor: "for",
  className: "class"
};
function toSolidProp(prop) {
  return prop in eventMap ? eventMap[prop] : prop;
}
var normalizeProps = createNormalizer((props) => {
  const normalized = {};
  for (const key in props) {
    const value = props[key];
    if (key === "style" && isObject(value)) {
      normalized["style"] = cssify(value);
      continue;
    }
    if (key === "children") {
      if (isString$1(value)) {
        normalized["textContent"] = value;
      }
      continue;
    }
    normalized[toSolidProp(key)] = value;
  }
  return normalized;
});
const sharedConfig = {
  context: void 0,
  registry: void 0
};
const equalFn = (a2, b) => a2 === b;
const $PROXY = Symbol("solid-proxy");
const $TRACK = Symbol("solid-track");
const $DEVCOMP = Symbol("solid-dev-component");
const signalOptions = {
  equals: equalFn
};
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Owner = null;
let Transition = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
const [transPending, setTransPending] = /* @__PURE__ */ createSignal(false);
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, unowned = fn.length === 0, root = unowned ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: null,
    owner: detachedOwner === void 0 ? owner : detachedOwner
  }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s2 = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || void 0
  };
  const setter = (value2) => {
    if (typeof value2 === "function") {
      value2 = value2(s2.value);
    }
    return writeSignal(s2, value2);
  };
  return [readSignal.bind(s2), setter];
}
function createComputed(fn, value, options) {
  const c2 = createComputation(fn, value, true, STALE);
  updateComputation(c2);
}
function createRenderEffect(fn, value, options) {
  const c2 = createComputation(fn, value, false, STALE);
  updateComputation(c2);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c2 = createComputation(fn, value, false, STALE);
  c2.user = true;
  Effects ? Effects.push(c2) : updateComputation(c2);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c2 = createComputation(fn, value, true, 0);
  c2.observers = null;
  c2.observerSlots = null;
  c2.comparator = options.equals || void 0;
  updateComputation(c2);
  return readSignal.bind(c2);
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (Listener === null)
    return fn();
  const listener = Listener;
  Listener = null;
  try {
    return fn();
  } finally {
    Listener = listener;
  }
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null)
    ;
  else if (Owner.cleanups === null)
    Owner.cleanups = [fn];
  else
    Owner.cleanups.push(fn);
  return fn;
}
function getListener() {
  return Listener;
}
function startTransition(fn) {
  const l2 = Listener;
  const o2 = Owner;
  return Promise.resolve().then(() => {
    Listener = l2;
    Owner = o2;
    let t2;
    runUpdates(fn, false);
    Listener = Owner = null;
    return t2 ? t2.done : void 0;
  });
}
function useTransition() {
  return [transPending, startTransition];
}
function createContext(defaultValue, options) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== void 0 ? ctx : context.defaultValue;
}
function children(fn) {
  const children2 = createMemo(fn);
  const memo = createMemo(() => resolveChildren(children2()));
  memo.toArray = () => {
    const c2 = memo();
    return Array.isArray(c2) ? c2 : c2 != null ? [c2] : [];
  };
  return memo;
}
function readSignal() {
  if (this.sources && this.state) {
    if (this.state === STALE)
      updateComputation(this);
    else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
          const o2 = node.observers[i2];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o2))
            ;
          if (TransitionRunning ? !o2.tState : !o2.state) {
            if (o2.pure)
              Updates.push(o2);
            else
              Effects.push(o2);
            if (o2.observers)
              markDownstream(o2);
          }
          if (!TransitionRunning)
            o2.state = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if (false)
            ;
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn)
    return;
  cleanNode(node);
  const owner = Owner, listener = Listener, time2 = ExecCount;
  Listener = Owner = node;
  runComputation(node, node.value, time2);
  Listener = listener;
  Owner = owner;
}
function runComputation(node, value, time2) {
  let nextValue;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time2 + 1;
    return handleError(err);
  }
  if (!node.updatedAt || node.updatedAt <= time2) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue);
    } else
      node.value = nextValue;
    node.updatedAt = time2;
  }
}
function createComputation(fn, init, pure, state2 = STALE, options) {
  const c2 = {
    fn,
    state: state2,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: null,
    pure
  };
  if (Owner === null)
    ;
  else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned)
        Owner.owned = [c2];
      else
        Owner.owned.push(c2);
    }
  }
  return c2;
}
function runTop(node) {
  if (node.state === 0)
    return;
  if (node.state === PENDING)
    return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback))
    return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state)
      ancestors.push(node);
  }
  for (let i2 = ancestors.length - 1; i2 >= 0; i2--) {
    node = ancestors[i2];
    if (node.state === STALE) {
      updateComputation(node);
    } else if (node.state === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates)
    return fn();
  let wait = false;
  if (!init)
    Updates = [];
  if (Effects)
    wait = true;
  else
    Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait)
      Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait)
    return;
  const e2 = Effects;
  Effects = null;
  if (e2.length)
    runUpdates(() => runEffects(e2), false);
}
function runQueue(queue) {
  for (let i2 = 0; i2 < queue.length; i2++)
    runTop(queue[i2]);
}
function runUserEffects(queue) {
  let i2, userLength = 0;
  for (i2 = 0; i2 < queue.length; i2++) {
    const e2 = queue[i2];
    if (!e2.user)
      runTop(e2);
    else
      queue[userLength++] = e2;
  }
  for (i2 = 0; i2 < userLength; i2++)
    runTop(queue[i2]);
}
function lookUpstream(node, ignore) {
  node.state = 0;
  for (let i2 = 0; i2 < node.sources.length; i2 += 1) {
    const source = node.sources[i2];
    if (source.sources) {
      const state2 = source.state;
      if (state2 === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount))
          runTop(source);
      } else if (state2 === PENDING)
        lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
    const o2 = node.observers[i2];
    if (!o2.state) {
      o2.state = PENDING;
      if (o2.pure)
        Updates.push(o2);
      else
        Effects.push(o2);
      o2.observers && markDownstream(o2);
    }
  }
}
function cleanNode(node) {
  let i2;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n2 = obs.pop(), s2 = source.observerSlots.pop();
        if (index < obs.length) {
          n2.sourceSlots[s2] = index;
          obs[index] = n2;
          source.observerSlots[index] = s2;
        }
      }
    }
  }
  if (node.owned) {
    for (i2 = node.owned.length - 1; i2 >= 0; i2--)
      cleanNode(node.owned[i2]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i2 = node.cleanups.length - 1; i2 >= 0; i2--)
      node.cleanups[i2]();
    node.cleanups = null;
  }
  node.state = 0;
  node.context = null;
}
function handleError(err) {
  throw err;
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== void 0 ? owner.context[key] : lookup(owner.owner, key) : void 0;
}
function resolveChildren(children2) {
  if (typeof children2 === "function" && !children2.length)
    return resolveChildren(children2());
  if (Array.isArray(children2)) {
    const results2 = [];
    for (let i2 = 0; i2 < children2.length; i2++) {
      const result = resolveChildren(children2[i2]);
      Array.isArray(result) ? results2.push.apply(results2, result) : results2.push(result);
    }
    return results2;
  }
  return children2;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(() => res = untrack(() => {
      Owner.context = {
        [id]: props.value
      };
      return children(() => props.children);
    }), void 0);
    return res;
  };
}
const FALLBACK = Symbol("fallback");
function dispose(d) {
  for (let i2 = 0; i2 < d.length; i2++)
    d[i2]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [], i2, j;
    newItems[$TRACK];
    return untrack(() => {
      let newLen = newItems.length, newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      } else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++)
          ;
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = /* @__PURE__ */ new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i2 = newIndices.get(item);
          newIndicesNext[j] = i2 === void 0 ? -1 : i2;
          newIndices.set(item, j);
        }
        for (i2 = start; i2 <= end; i2++) {
          item = items[i2];
          j = newIndices.get(item);
          if (j !== void 0 && j !== -1) {
            temp[j] = mapped[i2];
            tempdisposers[j] = disposers[i2];
            indexes && (tempIndexes[j] = indexes[i2]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else
            disposers[i2]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else
            mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s2, set2] = createSignal(j);
        indexes[j] = set2;
        return mapFn(newItems[j], s2);
      }
      return mapFn(newItems[j]);
    }
  };
}
function createComponent(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
const propTraps = {
  get(_, property, receiver) {
    if (property === $PROXY)
      return receiver;
    return _.get(property);
  },
  has(_, property) {
    if (property === $PROXY)
      return true;
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn
    };
  },
  ownKeys(_) {
    return _.keys();
  }
};
function resolveSource(s2) {
  return !(s2 = typeof s2 === "function" ? s2() : s2) ? {} : s2;
}
function mergeProps(...sources) {
  let proxy2 = false;
  for (let i2 = 0; i2 < sources.length; i2++) {
    const s2 = sources[i2];
    proxy2 = proxy2 || !!s2 && $PROXY in s2;
    sources[i2] = typeof s2 === "function" ? (proxy2 = true, createMemo(s2)) : s2;
  }
  if (proxy2) {
    return new Proxy({
      get(property) {
        for (let i2 = sources.length - 1; i2 >= 0; i2--) {
          const v = resolveSource(sources[i2])[property];
          if (v !== void 0)
            return v;
        }
      },
      has(property) {
        for (let i2 = sources.length - 1; i2 >= 0; i2--) {
          if (property in resolveSource(sources[i2]))
            return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i2 = 0; i2 < sources.length; i2++)
          keys.push(...Object.keys(resolveSource(sources[i2])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const target = {};
  for (let i2 = sources.length - 1; i2 >= 0; i2--) {
    if (sources[i2]) {
      const descriptors = Object.getOwnPropertyDescriptors(sources[i2]);
      for (const key in descriptors) {
        if (key in target)
          continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i3 = sources.length - 1; i3 >= 0; i3--) {
              const v = (sources[i3] || {})[key];
              if (v !== void 0)
                return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const blocked = new Set(keys.flat());
  if ($PROXY in props) {
    const res = keys.map((k) => {
      return new Proxy({
        get(property) {
          return k.includes(property) ? props[property] : void 0;
        },
        has(property) {
          return k.includes(property) && property in props;
        },
        keys() {
          return k.filter((property) => property in props);
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? void 0 : props[property];
      },
      has(property) {
        return blocked.has(property) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter((k) => !blocked.has(k));
      }
    }, propTraps));
    return res;
  }
  const descriptors = Object.getOwnPropertyDescriptors(props);
  keys.push(Object.keys(descriptors).filter((k) => !blocked.has(k)));
  return keys.map((k) => {
    const clone = {};
    for (let i2 = 0; i2 < k.length; i2++) {
      const key = k[i2];
      if (!(key in props))
        continue;
      Object.defineProperty(clone, key, descriptors[key] ? descriptors[key] : {
        get() {
          return props[key];
        },
        set() {
          return true;
        },
        enumerable: true
      });
    }
    return clone;
  });
}
let counter = 0;
function createUniqueId() {
  const ctx = sharedConfig.context;
  return ctx ? `${ctx.id}${ctx.count++}` : `cl-${counter++}`;
}
const narrowedError = (name) => `Stale read from <${name}>.`;
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
}
function Show(props) {
  const keyed = props.keyed;
  const condition = createMemo(() => props.when, void 0, {
    equals: (a2, b) => keyed ? a2 === b : !a2 === !b
  });
  return createMemo(() => {
    const c2 = condition();
    if (c2) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      return fn ? untrack(() => child(keyed ? c2 : () => {
        if (!untrack(condition))
          throw narrowedError("Show");
        return props.when;
      })) : child;
    }
    return props.fallback;
  }, void 0, void 0);
}
const $RAW = Symbol("store-raw"), $NODE = Symbol("store-node");
function wrap$1(value) {
  let p2 = value[$PROXY];
  if (!p2) {
    Object.defineProperty(value, $PROXY, {
      value: p2 = new Proxy(value, proxyTraps$1)
    });
    if (!Array.isArray(value)) {
      const keys = Object.keys(value), desc = Object.getOwnPropertyDescriptors(value);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const prop = keys[i2];
        if (desc[prop].get) {
          Object.defineProperty(value, prop, {
            enumerable: desc[prop].enumerable,
            get: desc[prop].get.bind(p2)
          });
        }
      }
    }
  }
  return p2;
}
function isWrappable(obj) {
  let proto;
  return obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj));
}
function unwrap(item, set2 = /* @__PURE__ */ new Set()) {
  let result, unwrapped, v, prop;
  if (result = item != null && item[$RAW])
    return result;
  if (!isWrappable(item) || set2.has(item))
    return item;
  if (Array.isArray(item)) {
    if (Object.isFrozen(item))
      item = item.slice(0);
    else
      set2.add(item);
    for (let i2 = 0, l2 = item.length; i2 < l2; i2++) {
      v = item[i2];
      if ((unwrapped = unwrap(v, set2)) !== v)
        item[i2] = unwrapped;
    }
  } else {
    if (Object.isFrozen(item))
      item = Object.assign({}, item);
    else
      set2.add(item);
    const keys = Object.keys(item), desc = Object.getOwnPropertyDescriptors(item);
    for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
      prop = keys[i2];
      if (desc[prop].get)
        continue;
      v = item[prop];
      if ((unwrapped = unwrap(v, set2)) !== v)
        item[prop] = unwrapped;
    }
  }
  return item;
}
function getDataNodes(target) {
  let nodes = target[$NODE];
  if (!nodes)
    Object.defineProperty(target, $NODE, {
      value: nodes = /* @__PURE__ */ Object.create(null)
    });
  return nodes;
}
function getDataNode(nodes, property, value) {
  return nodes[property] || (nodes[property] = createDataNode(value));
}
function proxyDescriptor$1(target, property) {
  const desc = Reflect.getOwnPropertyDescriptor(target, property);
  if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE)
    return desc;
  delete desc.value;
  delete desc.writable;
  desc.get = () => target[$PROXY][property];
  return desc;
}
function trackSelf(target) {
  if (getListener()) {
    const nodes = getDataNodes(target);
    (nodes._ || (nodes._ = createDataNode()))();
  }
}
function ownKeys(target) {
  trackSelf(target);
  return Reflect.ownKeys(target);
}
function createDataNode(value) {
  const [s2, set2] = createSignal(value, {
    equals: false,
    internal: true
  });
  s2.$ = set2;
  return s2;
}
const proxyTraps$1 = {
  get(target, property, receiver) {
    if (property === $RAW)
      return target;
    if (property === $PROXY)
      return receiver;
    if (property === $TRACK) {
      trackSelf(target);
      return receiver;
    }
    const nodes = getDataNodes(target);
    const tracked = nodes[property];
    let value = tracked ? tracked() : target[property];
    if (property === $NODE || property === "__proto__")
      return value;
    if (!tracked) {
      const desc = Object.getOwnPropertyDescriptor(target, property);
      if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get))
        value = getDataNode(nodes, property, value)();
    }
    return isWrappable(value) ? wrap$1(value) : value;
  },
  has(target, property) {
    if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === "__proto__")
      return true;
    this.get(target, property, target);
    return property in target;
  },
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  ownKeys,
  getOwnPropertyDescriptor: proxyDescriptor$1
};
function setProperty(state2, property, value, deleting = false) {
  if (!deleting && state2[property] === value)
    return;
  const prev = state2[property], len = state2.length;
  if (value === void 0)
    delete state2[property];
  else
    state2[property] = value;
  let nodes = getDataNodes(state2), node;
  if (node = getDataNode(nodes, property, prev))
    node.$(() => value);
  if (Array.isArray(state2) && state2.length !== len)
    (node = getDataNode(nodes, "length", len)) && node.$(state2.length);
  (node = nodes._) && node.$();
}
function mergeStoreNode(state2, value) {
  const keys = Object.keys(value);
  for (let i2 = 0; i2 < keys.length; i2 += 1) {
    const key = keys[i2];
    setProperty(state2, key, value[key]);
  }
}
function updateArray(current, next) {
  if (typeof next === "function")
    next = next(current);
  next = unwrap(next);
  if (Array.isArray(next)) {
    if (current === next)
      return;
    let i2 = 0, len = next.length;
    for (; i2 < len; i2++) {
      const value = next[i2];
      if (current[i2] !== value)
        setProperty(current, i2, value);
    }
    setProperty(current, "length", len);
  } else
    mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part, prev = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part, isArray2 = Array.isArray(current);
    if (Array.isArray(part)) {
      for (let i2 = 0; i2 < part.length; i2++) {
        updatePath(current, [part[i2]].concat(path), traversed);
      }
      return;
    } else if (isArray2 && partType === "function") {
      for (let i2 = 0; i2 < current.length; i2++) {
        if (part(current[i2], i2))
          updatePath(current, [i2].concat(path), traversed);
      }
      return;
    } else if (isArray2 && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i2 = from; i2 <= to; i2 += by) {
        updatePath(current, [i2].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    prev = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(prev, traversed);
    if (value === prev)
      return;
  }
  if (part === void 0 && value == void 0)
    return;
  value = unwrap(value);
  if (part === void 0 || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(prev, value);
  } else
    setProperty(current, part, value);
}
function createStore(...[store, options]) {
  const unwrappedStore = unwrap(store || {});
  const isArray2 = Array.isArray(unwrappedStore);
  const wrappedStore = wrap$1(unwrappedStore);
  function setStore(...args) {
    batch(() => {
      isArray2 && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
    });
  }
  return [wrappedStore, setStore];
}
const $ROOT = Symbol("store-root");
function applyState(target, parent, property, merge, key) {
  const previous = parent[property];
  if (target === previous)
    return;
  if (property !== $ROOT && (!isWrappable(target) || !isWrappable(previous) || key && target[key] !== previous[key])) {
    setProperty(parent, property, target);
    return;
  }
  if (Array.isArray(target)) {
    if (target.length && previous.length && (!merge || key && target[0] && target[0][key] != null)) {
      let i2, j, start, end, newEnd, item, newIndicesNext, keyVal;
      for (start = 0, end = Math.min(previous.length, target.length); start < end && (previous[start] === target[start] || key && previous[start] && target[start] && previous[start][key] === target[start][key]); start++) {
        applyState(target[start], previous, start, merge, key);
      }
      const temp = new Array(target.length), newIndices = /* @__PURE__ */ new Map();
      for (end = previous.length - 1, newEnd = target.length - 1; end >= start && newEnd >= start && (previous[end] === target[newEnd] || key && previous[start] && target[start] && previous[end][key] === target[newEnd][key]); end--, newEnd--) {
        temp[newEnd] = previous[end];
      }
      if (start > newEnd || start > end) {
        for (j = start; j <= newEnd; j++)
          setProperty(previous, j, target[j]);
        for (; j < target.length; j++) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        }
        if (previous.length > target.length)
          setProperty(previous, "length", target.length);
        return;
      }
      newIndicesNext = new Array(newEnd + 1);
      for (j = newEnd; j >= start; j--) {
        item = target[j];
        keyVal = key && item ? item[key] : item;
        i2 = newIndices.get(keyVal);
        newIndicesNext[j] = i2 === void 0 ? -1 : i2;
        newIndices.set(keyVal, j);
      }
      for (i2 = start; i2 <= end; i2++) {
        item = previous[i2];
        keyVal = key && item ? item[key] : item;
        j = newIndices.get(keyVal);
        if (j !== void 0 && j !== -1) {
          temp[j] = previous[i2];
          j = newIndicesNext[j];
          newIndices.set(keyVal, j);
        }
      }
      for (j = start; j < target.length; j++) {
        if (j in temp) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        } else
          setProperty(previous, j, target[j]);
      }
    } else {
      for (let i2 = 0, len = target.length; i2 < len; i2++) {
        applyState(target[i2], previous, i2, merge, key);
      }
    }
    if (previous.length > target.length)
      setProperty(previous, "length", target.length);
    return;
  }
  const targetKeys = Object.keys(target);
  for (let i2 = 0, len = targetKeys.length; i2 < len; i2++) {
    applyState(target[targetKeys[i2]], previous, targetKeys[i2], merge, key);
  }
  const previousKeys = Object.keys(previous);
  for (let i2 = 0, len = previousKeys.length; i2 < len; i2++) {
    if (target[previousKeys[i2]] === void 0)
      setProperty(previous, previousKeys[i2], void 0);
  }
}
function reconcile(value, options = {}) {
  const {
    merge,
    key = "id"
  } = options, v = unwrap(value);
  return (state2) => {
    if (!isWrappable(state2) || !isWrappable(v))
      return v;
    const res = applyState(v, {
      [$ROOT]: state2
    }, $ROOT, merge, key);
    return res === void 0 ? state2 : res;
  };
}
function useService(machine2, options) {
  const { actions, state: hydratedState, context } = options != null ? options : {};
  const service = (() => {
    const _machine = typeof machine2 === "function" ? machine2() : machine2;
    const contextValue = typeof context === "function" ? context() : context;
    return contextValue ? _machine.withContext(contextValue) : _machine;
  })();
  onMount(() => {
    service.start(hydratedState);
    if (service.state.can("SETUP")) {
      service.send("SETUP");
    }
    onCleanup(() => {
      service.stop();
    });
  });
  createEffect(() => {
    const contextValue = typeof context === "function" ? context() : context;
    service.setContext(contextValue);
  });
  createEffect(() => {
    service.setOptions({ actions });
  });
  return service;
}
function useMachine(machine2, options) {
  const service = useService(machine2, options);
  const [state2, setState] = createStore(service.getState());
  onMount(() => {
    const unsubscribe = service.subscribe((nextState) => {
      setState(reconcile(nextState));
    });
    onCleanup(() => {
      unsubscribe();
    });
  });
  return [state2, service.send, service];
}
function twJoin() {
  var index = 0;
  var argument;
  var resolvedValue;
  var string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix2) {
  if (typeof mix2 === "string") {
    return mix2;
  }
  var resolvedValue;
  var string = "";
  for (var k = 0; k < mix2.length; k++) {
    if (mix2[k]) {
      if (resolvedValue = toValue(mix2[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var CLASS_PART_SEPARATOR = "-";
function createClassUtils(config) {
  var classMap = createClassMap(config);
  var conflictingClassGroups = config.conflictingClassGroups, _config$conflictingCl = config.conflictingClassGroupModifiers, conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
  function getClassGroupId(className2) {
    var classParts = className2.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className2);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    var conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [].concat(conflicts, conflictingClassGroupModifiers[classGroupId]);
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  var _a;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  var currentClassPart = classParts[0];
  var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  var classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(function(_ref) {
    var validator = _ref.validator;
    return validator(classRest);
  })) == null ? void 0 : _a.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className2) {
  if (arbitraryPropertyRegex.test(className2)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className2)[1];
    var property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  var theme = config.theme, prefix = config.prefix;
  var classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(function(_ref2) {
    var classGroupId = _ref2[0], classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(function(classDefinition) {
    if (typeof classDefinition === "string") {
      var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(function(_ref3) {
      var key = _ref3[0], classGroup2 = _ref3[1];
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function(pathPart) {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(function(_ref4) {
    var classGroupId = _ref4[0], classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function(classDefinition) {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(function(_ref5) {
          var key = _ref5[0], value = _ref5[1];
          return [prefix + key, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: function get() {
        return void 0;
      },
      set: function set2() {
      }
    };
  }
  var cacheSize = 0;
  var cache2 = /* @__PURE__ */ new Map();
  var previousCache = /* @__PURE__ */ new Map();
  function update(key, value) {
    cache2.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache2;
      cache2 = /* @__PURE__ */ new Map();
    }
  }
  return {
    get: function get(key) {
      var value = cache2.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set: function set2(key, value) {
      if (cache2.has(key)) {
        cache2.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}
var IMPORTANT_MODIFIER = "!";
function createSplitModifiers(config) {
  var separator = config.separator || ":";
  var isSeparatorSingleCharacter = separator.length === 1;
  var firstSeparatorCharacter = separator[0];
  var separatorLength = separator.length;
  return function splitModifiers(className2) {
    var modifiers = [];
    var bracketDepth = 0;
    var modifierStart = 0;
    var postfixModifierPosition;
    for (var index = 0; index < className2.length; index++) {
      var currentCharacter = className2[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className2.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className2.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    var baseClassNameWithImportantModifier = modifiers.length === 0 ? className2 : className2.substring(modifierStart);
    var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    var maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function(modifier) {
    var isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList2, configUtils) {
  var splitModifiers = configUtils.splitModifiers, getClassGroupId = configUtils.getClassGroupId, getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  var classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList2.trim().split(SPLIT_CLASSES_REGEX).map(function(originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName), modifiers = _splitModifiers.modifiers, hasImportantModifier = _splitModifiers.hasImportantModifier, baseClassName = _splitModifiers.baseClassName, maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
    var classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    var hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    var variantModifier = sortModifiers(modifiers).join(":");
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter(function(parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId, classGroupId = parsed.classGroupId, hasPostfixModifier = parsed.hasPostfixModifier;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function(group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function(parsed) {
    return parsed.originalClassName;
  }).join(" ");
}
function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList2) {
    var firstCreateConfig = createConfig[0], restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function(previousConfig, createConfigCurrent) {
      return createConfigCurrent(previousConfig);
    }, firstCreateConfig());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList2);
  }
  function tailwindMerge(classList2) {
    var cachedResult = cacheGet(classList2);
    if (cachedResult) {
      return cachedResult;
    }
    var result = mergeClassList(classList2, configUtils);
    cacheSet(classList2, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key) {
  var themeGetter = function themeGetter2(theme) {
    return theme[key] || [];
  };
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))/;
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(value) {
  return isNumber$1(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, "size", isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryUrl(value) {
  return getIsArbitraryValue(value, "url", isUrl);
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber$1);
}
function isNumber$1(value) {
  return !Number.isNaN(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber$1(value.slice(0, -1));
}
function isInteger(value) {
  return isIntegerOnly(value) || getIsArbitraryValue(value, "number", isIntegerOnly);
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isAny() {
  return true;
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function getIsArbitraryValue(value, label, testValue) {
  var result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return result[1] === label;
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value);
}
function isNever() {
  return false;
}
function isUrl(value) {
  return value.startsWith("url(");
}
function isIntegerOnly(value) {
  return Number.isInteger(Number(value));
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function getDefaultConfig() {
  var colors = fromTheme("colors");
  var spacing = fromTheme("spacing");
  var blur = fromTheme("blur");
  var brightness = fromTheme("brightness");
  var borderColor = fromTheme("borderColor");
  var borderRadius = fromTheme("borderRadius");
  var borderSpacing = fromTheme("borderSpacing");
  var borderWidth = fromTheme("borderWidth");
  var contrast = fromTheme("contrast");
  var grayscale = fromTheme("grayscale");
  var hueRotate = fromTheme("hueRotate");
  var invert = fromTheme("invert");
  var gap = fromTheme("gap");
  var gradientColorStops = fromTheme("gradientColorStops");
  var gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  var inset = fromTheme("inset");
  var margin = fromTheme("margin");
  var opacity = fromTheme("opacity");
  var padding = fromTheme("padding");
  var saturate = fromTheme("saturate");
  var scale = fromTheme("scale");
  var sepia = fromTheme("sepia");
  var skew = fromTheme("skew");
  var space = fromTheme("space");
  var translate = fromTheme("translate");
  var getOverscroll = function getOverscroll2() {
    return ["auto", "contain", "none"];
  };
  var getOverflow = function getOverflow2() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  };
  var getSpacingWithAuto = function getSpacingWithAuto2() {
    return ["auto", spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty2() {
    return ["", isLength];
  };
  var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary2() {
    return ["auto", isNumber$1, isArbitraryValue];
  };
  var getPositions = function getPositions2() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  };
  var getLineStyles = function getLineStyles2() {
    return ["solid", "dashed", "dotted", "double", "none"];
  };
  var getBlendModes = function getBlendModes2() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  };
  var getAlign = function getAlign2() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  };
  var getZeroAndEmpty = function getZeroAndEmpty2() {
    return ["", "0", isArbitraryValue];
  };
  var getBreaks = function getBreaks2() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  };
  var getNumber = function getNumber2() {
    return [isNumber$1, isArbitraryNumber];
  };
  var getNumberAndArbitrary = function getNumberAndArbitrary2() {
    return [isNumber$1, isArbitraryValue];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ["none", "", isTshirtSize, isArbitraryLength],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryLength],
      borderSpacing: [spacing],
      borderWidth: getLengthWithEmpty(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: [spacing],
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAuto(),
      margin: getSpacingWithAuto(),
      opacity: getNumber(),
      padding: [spacing],
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: [spacing],
      translate: [spacing]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      container: ["container"],
      columns: [{
        columns: [isTshirtSize]
      }],
      "break-after": [{
        "break-after": getBreaks()
      }],
      "break-before": [{
        "break-before": getBreaks()
      }],
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      box: [{
        box: ["border", "content"]
      }],
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      "float": [{
        "float": ["right", "left", "none"]
      }],
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      "object-position": [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      overflow: [{
        overflow: getOverflow()
      }],
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      overscroll: [{
        overscroll: getOverscroll()
      }],
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: [inset]
      }],
      "inset-x": [{
        "inset-x": [inset]
      }],
      "inset-y": [{
        "inset-y": [inset]
      }],
      start: [{
        start: [inset]
      }],
      end: [{
        end: [inset]
      }],
      top: [{
        top: [inset]
      }],
      right: [{
        right: [inset]
      }],
      bottom: [{
        bottom: [inset]
      }],
      left: [{
        left: [inset]
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: ["auto", isInteger]
      }],
      basis: [{
        basis: [spacing]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      grow: [{
        grow: getZeroAndEmpty()
      }],
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      order: [{
        order: ["first", "last", "none", isInteger]
      }],
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      "col-start-end": [{
        col: ["auto", {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      gap: [{
        gap: [gap]
      }],
      "gap-x": [{
        "gap-x": [gap]
      }],
      "gap-y": [{
        "gap-y": [gap]
      }],
      "justify-content": [{
        justify: ["normal"].concat(getAlign())
      }],
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      "align-content": [{
        content: ["normal"].concat(getAlign(), ["baseline"])
      }],
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      "place-content": [{
        "place-content": [].concat(getAlign(), ["baseline"])
      }],
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      p: [{
        p: [padding]
      }],
      px: [{
        px: [padding]
      }],
      py: [{
        py: [padding]
      }],
      ps: [{
        ps: [padding]
      }],
      pe: [{
        pe: [padding]
      }],
      pt: [{
        pt: [padding]
      }],
      pr: [{
        pr: [padding]
      }],
      pb: [{
        pb: [padding]
      }],
      pl: [{
        pl: [padding]
      }],
      m: [{
        m: [margin]
      }],
      mx: [{
        mx: [margin]
      }],
      my: [{
        my: [margin]
      }],
      ms: [{
        ms: [margin]
      }],
      me: [{
        me: [margin]
      }],
      mt: [{
        mt: [margin]
      }],
      mr: [{
        mr: [margin]
      }],
      mb: [{
        mb: [margin]
      }],
      ml: [{
        ml: [margin]
      }],
      "space-x": [{
        "space-x": [space]
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": [space]
      }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{
        w: ["auto", "min", "max", "fit", spacing]
      }],
      "min-w": [{
        "min-w": ["min", "max", "fit", isLength]
      }],
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryLength]
      }],
      h: [{
        h: [spacing, "auto", "min", "max", "fit"]
      }],
      "min-h": [{
        "min-h": ["min", "max", "fit", isLength]
      }],
      "max-h": [{
        "max-h": [spacing, "min", "max", "fit"]
      }],
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      "font-family": [{
        font: [isAny]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryLength]
      }],
      "line-clamp": [{
        "line-clamp": ["none", isNumber$1, isArbitraryNumber]
      }],
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength]
      }],
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "placeholder-color": [{
        placeholder: [colors]
      }],
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "text-color": [{
        text: [colors]
      }],
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [].concat(getLineStyles(), ["wavy"])
      }],
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength]
      }],
      "underline-offset": [{
        "underline-offset": ["auto", isLength]
      }],
      "text-decoration-color": [{
        decoration: [colors]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      indent: [{
        indent: [spacing]
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryLength]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      "break": [{
        "break": ["normal", "words", "all", "keep"]
      }],
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      content: [{
        content: ["none", isArbitraryValue]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryUrl]
      }],
      "bg-color": [{
        bg: [colors]
      }],
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      rounded: [{
        rounded: [borderRadius]
      }],
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      "border-w": [{
        border: [borderWidth]
      }],
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      "border-style": [{
        border: [].concat(getLineStyles(), ["hidden"])
      }],
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      "divide-style": [{
        divide: getLineStyles()
      }],
      "border-color": [{
        border: [borderColor]
      }],
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      "divide-color": [{
        divide: [borderColor]
      }],
      "outline-style": [{
        outline: [""].concat(getLineStyles())
      }],
      "outline-offset": [{
        "outline-offset": [isLength]
      }],
      "outline-w": [{
        outline: [isLength]
      }],
      "outline-color": [{
        outline: [colors]
      }],
      "ring-w": [{
        ring: getLengthWithEmpty()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: [colors]
      }],
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      "ring-offset-w": [{
        "ring-offset": [isLength]
      }],
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      "shadow-color": [{
        shadow: [isAny]
      }],
      opacity: [{
        opacity: [opacity]
      }],
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      filter: [{
        filter: ["", "none"]
      }],
      blur: [{
        blur: [blur]
      }],
      brightness: [{
        brightness: [brightness]
      }],
      contrast: [{
        contrast: [contrast]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      grayscale: [{
        grayscale: [grayscale]
      }],
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      invert: [{
        invert: [invert]
      }],
      saturate: [{
        saturate: [saturate]
      }],
      sepia: [{
        sepia: [sepia]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      scale: [{
        scale: [scale]
      }],
      "scale-x": [{
        "scale-x": [scale]
      }],
      "scale-y": [{
        "scale-y": [scale]
      }],
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      "translate-x": [{
        "translate-x": [translate]
      }],
      "translate-y": [{
        "translate-y": [translate]
      }],
      "skew-x": [{
        "skew-x": [skew]
      }],
      "skew-y": [{
        "skew-y": [skew]
      }],
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      accent: [{
        accent: ["auto", colors]
      }],
      appearance: ["appearance-none"],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      "caret-color": [{
        caret: [colors]
      }],
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scroll-m": [{
        "scroll-m": [spacing]
      }],
      "scroll-mx": [{
        "scroll-mx": [spacing]
      }],
      "scroll-my": [{
        "scroll-my": [spacing]
      }],
      "scroll-ms": [{
        "scroll-ms": [spacing]
      }],
      "scroll-me": [{
        "scroll-me": [spacing]
      }],
      "scroll-mt": [{
        "scroll-mt": [spacing]
      }],
      "scroll-mr": [{
        "scroll-mr": [spacing]
      }],
      "scroll-mb": [{
        "scroll-mb": [spacing]
      }],
      "scroll-ml": [{
        "scroll-ml": [spacing]
      }],
      "scroll-p": [{
        "scroll-p": [spacing]
      }],
      "scroll-px": [{
        "scroll-px": [spacing]
      }],
      "scroll-py": [{
        "scroll-py": [spacing]
      }],
      "scroll-ps": [{
        "scroll-ps": [spacing]
      }],
      "scroll-pe": [{
        "scroll-pe": [spacing]
      }],
      "scroll-pt": [{
        "scroll-pt": [spacing]
      }],
      "scroll-pr": [{
        "scroll-pr": [spacing]
      }],
      "scroll-pb": [{
        "scroll-pb": [spacing]
      }],
      "scroll-pl": [{
        "scroll-pl": [spacing]
      }],
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      fill: [{
        fill: [colors, "none"]
      }],
      "stroke-w": [{
        stroke: [isLength, isArbitraryNumber]
      }],
      stroke: [{
        stroke: [colors, "none"]
      }],
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
const sizeToClass$1 = {
  20: "w-5 h-5 text-[20px]",
  24: "w-5 h-5 text-[24px]",
  40: "w-5 h-5 text-[40px]",
  48: "w-5 h-5 text-[48px]"
};
const Icon$1 = ({ name, size: size2, className: className2, inline }) => {
  const sizeClass = size2 ? sizeToClass$1[size2] : sizeToClass$1[20];
  return /* @__PURE__ */ React.createElement("span", {
    class: twMerge("material-icon", !inline && sizeClass, className2),
    style: {
      "font-variation-settings": `'FILL' 1, 'wght' 600, 'opsz' ${size2 || 20}`
    }
  }, name);
};
const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const Properties = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
const ChildProperties = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
});
const PropAliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});
function getPropAlias(prop, tagName) {
  const a2 = PropAliases[prop];
  return typeof a2 === "object" ? a2[tagName] ? a2["$"] : void 0 : a2;
}
const DelegatedEvents = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
const SVGElements = /* @__PURE__ */ new Set([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "color-profile",
  "cursor",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignObject",
  "g",
  "glyph",
  "glyphRef",
  "hkern",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "missing-glyph",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tref",
  "tspan",
  "use",
  "view",
  "vkern"
]);
const SVGNamespace = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function reconcileArrays(parentNode, a2, b) {
  let bLength = b.length, aEnd = a2.length, bEnd = bLength, aStart = 0, bStart = 0, after = a2[aEnd - 1].nextSibling, map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a2[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a2[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd)
        parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a2[aStart]))
          a2[aStart].remove();
        aStart++;
      }
    } else if (a2[aStart] === b[bEnd - 1] && b[bStart] === a2[aEnd - 1]) {
      const node = a2[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a2[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a2[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i2 = bStart;
        while (i2 < bEnd)
          map.set(b[i2], i2++);
      }
      const index = map.get(a2[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i2 = aStart, sequence = 1, t2;
          while (++i2 < aEnd && i2 < bEnd) {
            if ((t2 = map.get(a2[i2])) == null || t2 !== index + sequence)
              break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a2[aStart];
            while (bStart < index)
              parentNode.insertBefore(b[bStart++], node);
          } else
            parentNode.replaceChild(b[bStart++], a2[aStart++]);
        } else
          aStart++;
      } else
        a2[aStart++].remove();
    }
  }
}
const $$EVENTS = "_$DX_DELEGATE";
function delegateEvents(eventNames, document2 = window.document) {
  const e2 = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
  for (let i2 = 0, l2 = eventNames.length; i2 < l2; i2++) {
    const name = eventNames[i2];
    if (!e2.has(name)) {
      e2.add(name);
      document2.addEventListener(name, eventHandler);
    }
  }
}
function setAttribute(node, name, value) {
  if (value == null)
    node.removeAttribute(name);
  else
    node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
  if (value == null)
    node.removeAttributeNS(namespace, name);
  else
    node.setAttributeNS(namespace, name, value);
}
function className(node, value) {
  if (value == null)
    node.removeAttribute("class");
  else
    node.className = value;
}
function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else
      node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    const handlerFn = handler[0];
    node.addEventListener(name, handler[0] = (e2) => handlerFn.call(node, handler[1], e2));
  } else
    node.addEventListener(name, handler);
}
function classList(node, value, prev = {}) {
  const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
  let i2, len;
  for (i2 = 0, len = prevKeys.length; i2 < len; i2++) {
    const key = prevKeys[i2];
    if (!key || key === "undefined" || value[key])
      continue;
    toggleClassKey(node, key, false);
    delete prev[key];
  }
  for (i2 = 0, len = classKeys.length; i2 < len; i2++) {
    const key = classKeys[i2], classValue = !!value[key];
    if (!key || key === "undefined" || prev[key] === classValue || !classValue)
      continue;
    toggleClassKey(node, key, true);
    prev[key] = classValue;
  }
  return prev;
}
function style$1(node, value, prev) {
  if (!value)
    return prev ? setAttribute(node, "style") : value;
  const nodeStyle = node.style;
  if (typeof value === "string")
    return nodeStyle.cssText = value;
  typeof prev === "string" && (nodeStyle.cssText = prev = void 0);
  prev || (prev = {});
  value || (value = {});
  let v, s2;
  for (s2 in prev) {
    value[s2] == null && nodeStyle.removeProperty(s2);
    delete prev[s2];
  }
  for (s2 in value) {
    v = value[s2];
    if (v !== prev[s2]) {
      nodeStyle.setProperty(s2, v);
      prev[s2] = v;
    }
  }
  return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
  const prevProps = {};
  if (!skipChildren) {
    createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
  }
  createRenderEffect(() => props.ref && props.ref(node));
  createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
  return prevProps;
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
  props || (props = {});
  for (const prop in prevProps) {
    if (!(prop in props)) {
      if (prop === "children")
        continue;
      prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef);
    }
  }
  for (const prop in props) {
    if (prop === "children") {
      if (!skipChildren)
        insertExpression(node, props.children);
      continue;
    }
    const value = props[prop];
    prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef);
  }
}
function getNextElement(template) {
  let key;
  {
    if (!template)
      throw new Error("Unrecoverable Hydration Mismatch. No template for key: " + key);
    return template();
  }
}
function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
  const classNames = key.trim().split(/\s+/);
  for (let i2 = 0, nameLen = classNames.length; i2 < nameLen; i2++)
    node.classList.toggle(classNames[i2], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef) {
  let isCE, isProp, isChildProp, propAlias, forceProp;
  if (prop === "style")
    return style$1(node, value, prev);
  if (prop === "classList")
    return classList(node, value, prev);
  if (value === prev)
    return prev;
  if (prop === "ref") {
    if (!skipRef)
      value(node);
  } else if (prop.slice(0, 3) === "on:") {
    const e2 = prop.slice(3);
    prev && node.removeEventListener(e2, prev);
    value && node.addEventListener(e2, value);
  } else if (prop.slice(0, 10) === "oncapture:") {
    const e2 = prop.slice(10);
    prev && node.removeEventListener(e2, prev, true);
    value && node.addEventListener(e2, value, true);
  } else if (prop.slice(0, 2) === "on") {
    const name = prop.slice(2).toLowerCase();
    const delegate = DelegatedEvents.has(name);
    if (!delegate && prev) {
      const h2 = Array.isArray(prev) ? prev[0] : prev;
      node.removeEventListener(name, h2);
    }
    if (delegate || value) {
      addEventListener(node, name, value, delegate);
      delegate && delegateEvents([name]);
    }
  } else if (prop.slice(0, 5) === "attr:") {
    setAttribute(node, prop.slice(5), value);
  } else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || !isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-"))) {
    if (forceProp) {
      prop = prop.slice(5);
      isProp = true;
    }
    if (prop === "class" || prop === "className")
      className(node, value);
    else if (isCE && !isProp && !isChildProp)
      node[toPropertyName(prop)] = value;
    else
      node[propAlias || prop] = value;
  } else {
    const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
    if (ns)
      setAttributeNS(node, ns, prop, value);
    else
      setAttribute(node, Aliases[prop] || prop, value);
  }
  return value;
}
function eventHandler(e2) {
  const key = `$$${e2.type}`;
  let node = e2.composedPath && e2.composedPath()[0] || e2.target;
  if (e2.target !== node) {
    Object.defineProperty(e2, "target", {
      configurable: true,
      value: node
    });
  }
  Object.defineProperty(e2, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  while (node) {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data2 = node[`${key}Data`];
      data2 !== void 0 ? handler.call(node, data2, e2) : handler.call(node, e2);
      if (e2.cancelBubble)
        return;
    }
    node = node._$host || node.parentNode || node.host;
  }
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  while (typeof current === "function")
    current = current();
  if (value === current)
    return current;
  const t2 = typeof value, multi = marker !== void 0;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t2 === "string" || t2 === "number") {
    if (t2 === "number")
      value = value.toString();
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data = value;
      } else
        node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else
        current = parent.textContent = value;
    }
  } else if (value == null || t2 === "boolean") {
    current = cleanChildren(parent, current, marker);
  } else if (t2 === "function") {
    createRenderEffect(() => {
      let v = value();
      while (typeof v === "function")
        v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi)
        return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else
        reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value instanceof Node) {
    if (Array.isArray(current)) {
      if (multi)
        return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else
      parent.replaceChild(value, parent.firstChild);
    current = value;
  } else
    console.warn(`Unrecognized value. Skipped inserting`, value);
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap2) {
  let dynamic = false;
  for (let i2 = 0, len = array.length; i2 < len; i2++) {
    let item = array[i2], prev = current && current[i2];
    if (item instanceof Node) {
      normalized.push(item);
    } else if (item == null || item === true || item === false)
      ;
    else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if (typeof item === "function") {
      if (unwrap2) {
        while (typeof item === "function")
          item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3) {
        prev.data = value;
        normalized.push(prev);
      } else
        normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i2 = 0, len = array.length; i2 < len; i2++)
    parent.insertBefore(array[i2], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === void 0)
    return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i2 = current.length - 1; i2 >= 0; i2--) {
      const el = current[i2];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i2)
          isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
        else
          isParent && el.remove();
      } else
        inserted = true;
    }
  } else
    parent.insertBefore(node, marker);
  return [node];
}
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function createElement(tagName, isSVG = false) {
  return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
}
function Dynamic(props) {
  const [p2, others] = splitProps(props, ["component"]);
  const cached = createMemo(() => p2.component);
  return createMemo(() => {
    const component = cached();
    switch (typeof component) {
      case "function":
        Object.assign(component, {
          [$DEVCOMP]: true
        });
        return untrack(() => component(others));
      case "string":
        const isSvg = SVGElements.has(component);
        const el = sharedConfig.context ? getNextElement() : createElement(component, isSvg);
        spread(el, others, isSvg);
        return el;
    }
  });
}
const withInitialClass = (defaultClasses, Component) => {
  return (props) => {
    return /* @__PURE__ */ React.createElement(Dynamic, {
      component: Component,
      ...props,
      class: twMerge(defaultClasses, props.class)
    });
  };
};
const transitionQuick = "transition duration-quick ease-out";
const comboboxStyles = {
  container: "z-10 relative",
  input: twMerge("w-full rounded-md border-0 bg-white dark:bg-gray-900 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 sm:text-sm sm:leading-6", transitionQuick),
  inputButton: twMerge("absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 dark:text-gray-500 hover:text-primary-500", transitionQuick),
  optionContainer: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
  option: twMerge("relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900"),
  option_focused: "bg-primary-600 text-white",
  option_checked: "font-semibold",
  optionLabel: "block truncate",
  optionIcon: twMerge("absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"),
  optionIcon_focused: "text-white"
};
const { container, input, inputButton, optionContainer, option, optionLabel, optionIcon } = comboboxStyles;
const Container = withInitialClass(container, "div");
const Input = withInitialClass(input, "input");
const InputButton = withInitialClass(inputButton, "button");
const OptionContainer = withInitialClass(optionContainer, "div");
const Option = withInitialClass(option, "li");
const OptionLabel = withInitialClass(optionLabel, "span");
const OptionIcon = withInitialClass(optionIcon, "span");
function addUniqueItem(array, item) {
  array.indexOf(item) === -1 && array.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}
const clamp = (min2, max2, v) => Math.min(Math.max(v, min2), max2);
const defaults = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
};
const isNumber = (value) => typeof value === "number";
const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);
const wrap = (min2, max2, v) => {
  const rangeSize = max2 - min2;
  return ((v - min2) % rangeSize + rangeSize) % rangeSize + min2;
};
function getEasingForSegment(easing, i2) {
  return isEasingList(easing) ? easing[wrap(0, easing.length, i2)] : easing;
}
const mix = (min2, max2, progress2) => -progress2 * min2 + progress2 * max2 + min2;
const noop$1 = () => {
};
const noopReturn = (v) => v;
const progress = (min2, max2, value) => max2 - min2 === 0 ? 1 : (value - min2) / (max2 - min2);
function fillOffset(offset2, remaining) {
  const min2 = offset2[offset2.length - 1];
  for (let i2 = 1; i2 <= remaining; i2++) {
    const offsetProgress = progress(0, remaining, i2);
    offset2.push(mix(min2, 1, offsetProgress));
  }
}
function defaultOffset(length) {
  const offset2 = [0];
  fillOffset(offset2, length - 1);
  return offset2;
}
function interpolate(output, input2 = defaultOffset(output.length), easing = noopReturn) {
  const length = output.length;
  const remainder = length - input2.length;
  remainder > 0 && fillOffset(input2, remainder);
  return (t2) => {
    let i2 = 0;
    for (; i2 < length - 2; i2++) {
      if (t2 < input2[i2 + 1])
        break;
    }
    let progressInRange = clamp(0, 1, progress(input2[i2], input2[i2 + 1], t2));
    const segmentEasing = getEasingForSegment(easing, i2);
    progressInRange = segmentEasing(progressInRange);
    return mix(output[i2], output[i2 + 1], progressInRange);
  };
}
const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);
const isEasingGenerator = (easing) => typeof easing === "object" && Boolean(easing.createAnimation);
const isFunction = (value) => typeof value === "function";
const isString = (value) => typeof value === "string";
const time = {
  ms: (seconds) => seconds * 1e3,
  s: (milliseconds) => milliseconds / 1e3
};
const calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i2 = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}
const steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};
const namedEasings = {
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  "ease-in": cubicBezier(0.42, 0, 1, 1),
  "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
  "ease-out": cubicBezier(0, 0, 0.58, 1)
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
  if (isFunction(definition))
    return definition;
  if (isCubicBezier(definition))
    return cubicBezier(...definition);
  if (namedEasings[definition])
    return namedEasings[definition];
  if (definition.startsWith("steps")) {
    const args = functionArgsRegex.exec(definition);
    if (args) {
      const argsArray = args[1].split(",");
      return steps(parseFloat(argsArray[0]), argsArray[1].trim());
    }
  }
  return noopReturn;
}
class Animation {
  constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset: offset2, direction = "normal" } = {}) {
    this.startTime = null;
    this.rate = 1;
    this.t = 0;
    this.cancelTimestamp = null;
    this.easing = noopReturn;
    this.duration = 0;
    this.totalDuration = 0;
    this.repeat = 0;
    this.playState = "idle";
    this.finished = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    easing = easing || defaults.easing;
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      initialDuration = custom.duration || initialDuration;
    }
    this.repeat = repeat;
    this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
    this.updateDuration(initialDuration);
    const interpolate$1 = interpolate(keyframes, offset2, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
    this.tick = (timestamp) => {
      var _a;
      delay = delay;
      let t2 = 0;
      if (this.pauseTime !== void 0) {
        t2 = this.pauseTime;
      } else {
        t2 = (timestamp - this.startTime) * this.rate;
      }
      this.t = t2;
      t2 /= 1e3;
      t2 = Math.max(t2 - delay, 0);
      if (this.playState === "finished" && this.pauseTime === void 0) {
        t2 = this.totalDuration;
      }
      const progress2 = t2 / this.duration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      const iterationIsOdd = currentIteration % 2;
      if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
        iterationProgress = 1 - iterationProgress;
      }
      const p2 = t2 >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
      const latest = interpolate$1(this.easing(p2));
      output(latest);
      const isAnimationFinished = this.pauseTime === void 0 && (this.playState === "finished" || t2 >= this.totalDuration + endDelay);
      if (isAnimationFinished) {
        this.playState = "finished";
        (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
      } else if (this.playState !== "idle") {
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
    };
    this.play();
  }
  play() {
    const now = performance.now();
    this.playState = "running";
    if (this.pauseTime !== void 0) {
      this.startTime = now - this.pauseTime;
    } else if (!this.startTime) {
      this.startTime = now;
    }
    this.cancelTimestamp = this.startTime;
    this.pauseTime = void 0;
    this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused";
    this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished";
    this.tick(0);
  }
  stop() {
    var _a;
    this.playState = "idle";
    if (this.frameRequestId !== void 0) {
      cancelAnimationFrame(this.frameRequestId);
    }
    (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
  }
  cancel() {
    this.stop();
    this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(duration) {
    this.duration = duration;
    this.totalDuration = duration * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t2) {
    if (this.pauseTime !== void 0 || this.rate === 0) {
      this.pauseTime = t2;
    } else {
      this.startTime = performance.now() - t2 / this.rate;
    }
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(rate) {
    this.rate = rate;
  }
}
class MotionValue {
  setAnimation(animation) {
    this.animation = animation;
    animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const data = /* @__PURE__ */ new WeakMap();
function getAnimationData(element) {
  if (!data.has(element)) {
    data.set(element, {
      transforms: [],
      values: /* @__PURE__ */ new Map()
    });
  }
  return data.get(element);
}
function getMotionValue(motionValues, name) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new MotionValue());
  }
  return motionValues.get(name);
}
const axes = ["", "X", "Y", "Z"];
const order = ["translate", "scale", "rotate", "skew"];
const transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
const rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v) => v + "deg"
};
const baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v) => v + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
const transformDefinitions = /* @__PURE__ */ new Map();
const asTransformCssVar = (name) => `--motion-${name}`;
const transforms = ["x", "y", "z"];
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
const compareTransformOrder = (a2, b) => transforms.indexOf(a2) - transforms.indexOf(b);
const transformLookup = new Set(transforms);
const isTransform = (name) => transformLookup.has(name);
const addTransformToElement = (element, name) => {
  if (transformAlias[name])
    name = transformAlias[name];
  const { transforms: transforms2 } = getAnimationData(element);
  addUniqueItem(transforms2, name);
  element.style.transform = buildTransformTemplate(transforms2);
};
const buildTransformTemplate = (transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;
const isCssVar = (name) => name.startsWith("--");
const registeredProperties = /* @__PURE__ */ new Set();
function registerCssVariable(name) {
  if (registeredProperties.has(name))
    return;
  registeredProperties.add(name);
  try {
    const { syntax, initialValue } = transformDefinitions.has(name) ? transformDefinitions.get(name) : {};
    CSS.registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue
    });
  } catch (e2) {
  }
}
const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
const featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] });
    } catch (e2) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e2) {
      return false;
    }
    return true;
  }
};
const results = {};
const supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
  let points = "";
  const numPoints = Math.round(duration / resolution);
  for (let i2 = 0; i2 < numPoints; i2++) {
    points += easing(progress(0, numPoints - 1, i2)) + ", ";
  }
  return points.substring(0, points.length - 2);
};
const convertEasing = (easing, duration) => {
  if (isFunction(easing)) {
    return supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : defaults.easing;
  } else {
    return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
  }
};
const cubicBezierAsString = ([a2, b, c2, d]) => `cubic-bezier(${a2}, ${b}, ${c2}, ${d})`;
function hydrateKeyframes(keyframes, readInitialValue) {
  for (let i2 = 0; i2 < keyframes.length; i2++) {
    if (keyframes[i2] === null) {
      keyframes[i2] = i2 ? keyframes[i2 - 1] : readInitialValue();
    }
  }
  return keyframes;
}
const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];
function getStyleName(key) {
  if (transformAlias[key])
    key = transformAlias[key];
  return isTransform(key) ? asTransformCssVar(key) : key;
}
const style = {
  get: (element, name) => {
    name = getStyleName(name);
    let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
    if (!value && value !== 0) {
      const definition = transformDefinitions.get(name);
      if (definition)
        value = definition.initialValue;
    }
    return value;
  },
  set: (element, name, value) => {
    name = getStyleName(name);
    if (isCssVar(name)) {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }
};
function stopAnimation(animation, needsCommit = true) {
  if (!animation || animation.playState === "finished")
    return;
  try {
    if (animation.stop) {
      animation.stop();
    } else {
      needsCommit && animation.commitStyles();
      animation.cancel();
    }
  } catch (e2) {
  }
}
function getUnitConverter(keyframes, definition) {
  var _a;
  let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
  const finalKeyframe = keyframes[keyframes.length - 1];
  if (isString(finalKeyframe)) {
    const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
    if (unit)
      toUnit = (value) => value + unit;
  }
  return toUnit;
}
function getDevToolsRecord() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
  const record = getDevToolsRecord();
  const isRecording = options.record !== false && record;
  let animation;
  let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, persist = false, direction, offset: offset2, allowWebkitAcceleration = false } = options;
  const data2 = getAnimationData(element);
  const valueIsTransform = isTransform(key);
  let canAnimateNatively = supports.waapi();
  valueIsTransform && addTransformToElement(element, key);
  const name = getStyleName(key);
  const motionValue = getMotionValue(data2.values, name);
  const definition = transformDefinitions.get(name);
  stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) && options.record !== false);
  return () => {
    const readInitialValue = () => {
      var _a, _b;
      return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
    };
    let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
    const toUnit = getUnitConverter(keyframes, definition);
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      duration = custom.duration || duration;
    }
    if (isCssVar(name)) {
      if (supports.cssRegisterProperty()) {
        registerCssVariable(name);
      } else {
        canAnimateNatively = false;
      }
    }
    if (valueIsTransform && !supports.linearEasing() && (isFunction(easing) || isEasingList(easing) && easing.some(isFunction))) {
      canAnimateNatively = false;
    }
    if (canAnimateNatively) {
      if (definition) {
        keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
      }
      if (keyframes.length === 1 && (!supports.partialKeyframes() || isRecording)) {
        keyframes.unshift(readInitialValue());
      }
      const animationOptions = {
        delay: time.ms(delay),
        duration: time.ms(duration),
        endDelay: time.ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing, duration) : void 0,
        direction,
        iterations: repeat + 1,
        fill: "both"
      };
      animation = element.animate({
        [name]: keyframes,
        offset: offset2,
        easing: isEasingList(easing) ? easing.map((thisEasing) => convertEasing(thisEasing, duration)) : void 0
      }, animationOptions);
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve;
          animation.oncancel = reject;
        });
      }
      const target = keyframes[keyframes.length - 1];
      animation.finished.then(() => {
        if (persist)
          return;
        style.set(element, name, target);
        animation.cancel();
      }).catch(noop$1);
      if (!allowWebkitAcceleration)
        animation.playbackRate = 1.000001;
    } else if (AnimationPolyfill && valueIsTransform) {
      keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue()));
      }
      animation = new AnimationPolyfill((latest) => {
        style.set(element, name, toUnit ? toUnit(latest) : latest);
      }, keyframes, Object.assign(Object.assign({}, options), {
        duration,
        easing
      }));
    } else {
      const target = keyframes[keyframes.length - 1];
      style.set(element, name, definition && isNumber(target) ? definition.toDefaultUnit(target) : target);
    }
    if (isRecording) {
      record(element, key, keyframes, {
        duration,
        delay,
        easing,
        repeat,
        offset: offset2
      }, "motion-one");
    }
    motionValue.setAnimation(animation);
    return animation;
  };
}
const getOptions = (options, key) => options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);
function resolveElements(elements, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}
function __rest(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
}
const thresholds = {
  any: 0,
  all: 1
};
function inView$1(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
  if (typeof IntersectionObserver === "undefined") {
    return () => {
    };
  }
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (isFunction(newOnEnd)) {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function hasChanged(a2, b) {
  if (typeof a2 !== typeof b)
    return true;
  if (Array.isArray(a2) && Array.isArray(b))
    return !shallowCompare(a2, b);
  return a2 !== b;
}
function shallowCompare(next, prev) {
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i2 = 0; i2 < prevLength; i2++) {
    if (prev[i2] !== next[i2])
      return false;
  }
  return true;
}
function isVariant(definition) {
  return typeof definition === "object";
}
function resolveVariant(definition, variants) {
  if (isVariant(definition)) {
    return definition;
  } else if (definition && variants) {
    return variants[definition];
  }
}
let scheduled = void 0;
function processScheduledAnimations() {
  if (!scheduled)
    return;
  const generators = scheduled.sort(compareByDepth).map(fireAnimateUpdates);
  generators.forEach(fireNext);
  generators.forEach(fireNext);
  scheduled = void 0;
}
function scheduleAnimation(state2) {
  if (!scheduled) {
    scheduled = [state2];
    requestAnimationFrame(processScheduledAnimations);
  } else {
    addUniqueItem(scheduled, state2);
  }
}
function unscheduleAnimation(state2) {
  scheduled && removeItem(scheduled, state2);
}
const compareByDepth = (a2, b) => a2.getDepth() - b.getDepth();
const fireAnimateUpdates = (state2) => state2.animateUpdates();
const fireNext = (iterator) => iterator.next();
const motionEvent = (name, target) => new CustomEvent(name, { detail: { target } });
function dispatchPointerEvent(element, name, event) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
}
function dispatchViewEvent(element, name, entry) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
}
const inView = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
    const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
    return inView$1(element, (enterEntry) => {
      enable();
      dispatchViewEvent(element, "viewenter", enterEntry);
      if (!once) {
        return (leaveEntry) => {
          disable();
          dispatchViewEvent(element, "viewleave", leaveEntry);
        };
      }
    }, viewOptions);
  }
};
const mouseEvent = (element, name, action) => (event) => {
  if (event.pointerType && event.pointerType !== "mouse")
    return;
  action();
  dispatchPointerEvent(element, name, event);
};
const hover = {
  isActive: (options) => Boolean(options.hover),
  subscribe: (element, { enable, disable }) => {
    const onEnter = mouseEvent(element, "hoverstart", enable);
    const onLeave = mouseEvent(element, "hoverend", disable);
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }
};
const press = {
  isActive: (options) => Boolean(options.press),
  subscribe: (element, { enable, disable }) => {
    const onPointerUp = (event) => {
      disable();
      dispatchPointerEvent(element, "pressend", event);
      window.removeEventListener("pointerup", onPointerUp);
    };
    const onPointerDown = (event) => {
      enable();
      dispatchPointerEvent(element, "pressstart", event);
      window.addEventListener("pointerup", onPointerUp);
    };
    element.addEventListener("pointerdown", onPointerDown);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }
};
const gestures = { inView, hover, press };
const stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];
const mountedStates = /* @__PURE__ */ new WeakMap();
function createMotionState(options = {}, parent) {
  let element;
  let depth = parent ? parent.getDepth() + 1 : 0;
  const activeStates = { initial: true, animate: true };
  const gestureSubscriptions = {};
  const context = {};
  for (const name of stateTypes) {
    context[name] = typeof options[name] === "string" ? options[name] : parent === null || parent === void 0 ? void 0 : parent.getContext()[name];
  }
  const initialVariantSource = options.initial === false ? "animate" : "initial";
  let _a = resolveVariant(options[initialVariantSource] || context[initialVariantSource], options.variants) || {}, target = __rest(_a, ["transition"]);
  const baseTarget = Object.assign({}, target);
  function* animateUpdates() {
    var _a2, _b;
    const prevTarget = target;
    target = {};
    const animationOptions = {};
    for (const name of stateTypes) {
      if (!activeStates[name])
        continue;
      const variant = resolveVariant(options[name]);
      if (!variant)
        continue;
      for (const key in variant) {
        if (key === "transition")
          continue;
        target[key] = variant[key];
        animationOptions[key] = getOptions((_b = (_a2 = variant.transition) !== null && _a2 !== void 0 ? _a2 : options.transition) !== null && _b !== void 0 ? _b : {}, key);
      }
    }
    const allTargetKeys = /* @__PURE__ */ new Set([
      ...Object.keys(target),
      ...Object.keys(prevTarget)
    ]);
    const animationFactories = [];
    allTargetKeys.forEach((key) => {
      var _a3;
      if (target[key] === void 0) {
        target[key] = baseTarget[key];
      }
      if (hasChanged(prevTarget[key], target[key])) {
        (_a3 = baseTarget[key]) !== null && _a3 !== void 0 ? _a3 : baseTarget[key] = style.get(element, key);
        animationFactories.push(animateStyle(element, key, target[key], animationOptions[key], Animation));
      }
    });
    yield;
    const animations = animationFactories.map((factory) => factory()).filter(Boolean);
    if (!animations.length)
      return;
    const animationTarget = target;
    element.dispatchEvent(motionEvent("motionstart", animationTarget));
    Promise.all(animations.map((animation) => animation.finished)).then(() => {
      element.dispatchEvent(motionEvent("motioncomplete", animationTarget));
    }).catch(noop$1);
  }
  const setGesture = (name, isActive) => () => {
    activeStates[name] = isActive;
    scheduleAnimation(state2);
  };
  const updateGestureSubscriptions = () => {
    for (const name in gestures) {
      const isGestureActive = gestures[name].isActive(options);
      const remove = gestureSubscriptions[name];
      if (isGestureActive && !remove) {
        gestureSubscriptions[name] = gestures[name].subscribe(element, {
          enable: setGesture(name, true),
          disable: setGesture(name, false)
        }, options);
      } else if (!isGestureActive && remove) {
        remove();
        delete gestureSubscriptions[name];
      }
    }
  };
  const state2 = {
    update: (newOptions) => {
      if (!element)
        return;
      options = newOptions;
      updateGestureSubscriptions();
      scheduleAnimation(state2);
    },
    setActive: (name, isActive) => {
      if (!element)
        return;
      activeStates[name] = isActive;
      scheduleAnimation(state2);
    },
    animateUpdates,
    getDepth: () => depth,
    getTarget: () => target,
    getOptions: () => options,
    getContext: () => context,
    mount: (newElement) => {
      element = newElement;
      mountedStates.set(element, state2);
      updateGestureSubscriptions();
      return () => {
        mountedStates.delete(element);
        unscheduleAnimation(state2);
        for (const key in gestureSubscriptions) {
          gestureSubscriptions[key]();
        }
      };
    },
    isMounted: () => Boolean(element)
  };
  return state2;
}
function createStyles(keyframes) {
  const initialKeyframes = {};
  const transformKeys = [];
  for (let key in keyframes) {
    const value = keyframes[key];
    if (isTransform(key)) {
      if (transformAlias[key])
        key = transformAlias[key];
      transformKeys.push(key);
      key = asTransformCssVar(key);
    }
    let initialKeyframe = Array.isArray(value) ? value[0] : value;
    const definition = transformDefinitions.get(key);
    if (definition) {
      initialKeyframe = isNumber(value) ? definition.toDefaultUnit(value) : value;
    }
    initialKeyframes[key] = initialKeyframe;
  }
  if (transformKeys.length) {
    initialKeyframes.transform = buildTransformTemplate(transformKeys);
  }
  return initialKeyframes;
}
var defaultElementPredicate = (item) => item instanceof Element;
function getFirstChild(value, predicate) {
  if (predicate(value))
    return value;
  if (typeof value === "function" && !value.length)
    return getFirstChild(value(), predicate);
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = getFirstChild(item, predicate);
      if (result)
        return result;
    }
  }
  return null;
}
function resolveFirst(fn, predicate = defaultElementPredicate, serverPredicate = defaultElementPredicate) {
  const children2 = createMemo(fn);
  return createMemo(() => getFirstChild(children2(), predicate));
}
var noop = () => {
};
var noopTransition = (el, done) => done();
function createSwitchTransition(source, options) {
  const initSource = untrack(source);
  const initReturned = initSource ? [initSource] : [];
  const { onEnter = noopTransition, onExit = noopTransition } = options;
  const [returned, setReturned] = createSignal(options.appear ? [] : initReturned);
  const [isTransitionPending] = useTransition();
  let next;
  let isExiting = false;
  function exitTransition(el, after) {
    if (!el)
      return after && after();
    isExiting = true;
    onExit(el, () => {
      batch(() => {
        isExiting = false;
        setReturned((p2) => p2.filter((e2) => e2 !== el));
        after && after();
      });
    });
  }
  function enterTransition(after) {
    const el = next;
    if (!el)
      return after && after();
    next = void 0;
    setReturned((p2) => [el, ...p2]);
    onEnter(el, after != null ? after : noop);
  }
  const triggerTransitions = options.mode === "out-in" ? (prev) => isExiting || exitTransition(prev, enterTransition) : options.mode === "in-out" ? (prev) => enterTransition(() => exitTransition(prev)) : (prev) => {
    enterTransition();
    exitTransition(prev);
  };
  createComputed((prev) => {
    const el = source();
    if (untrack(isTransitionPending)) {
      isTransitionPending();
      return prev;
    }
    if (el !== prev) {
      next = el;
      batch(() => untrack(() => triggerTransitions(prev)));
    }
    return el;
  }, options.appear ? void 0 : initSource);
  return returned;
}
var extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
function stringStyleToObject(style2) {
  const object = {};
  let match;
  while (match = extractCSSregex.exec(style2)) {
    object[match[1]] = match[2];
  }
  return object;
}
function combineStyle(a2, b) {
  if (typeof a2 === "object" && typeof b === "object")
    return { ...a2, ...b };
  if (typeof a2 === "string" && typeof b === "string")
    return `${a2};${b}`;
  const objA = typeof a2 === "object" ? a2 : stringStyleToObject(a2);
  const objB = typeof b === "object" ? b : stringStyleToObject(b);
  return { ...objA, ...objB };
}
const PresenceContext = createContext();
const Presence = (props) => {
  let initial = props.initial !== false;
  const render = createComponent(PresenceContext.Provider, {
    value: () => initial,
    get children() {
      return createComponent(ParentContext.Provider, {
        value: void 0,
        get children() {
          return createSwitchTransition(resolveFirst(() => props.children), {
            appear: initial,
            mode: props.exitBeforeEnter ? "out-in" : "parallel",
            onExit(el, remove) {
              const state2 = mountedStates.get(el);
              if (state2 && state2.getOptions().exit)
                onCompleteExit(el, remove);
              else
                remove();
            }
          });
        }
      });
    }
  });
  initial = true;
  return render;
};
const onCompleteExit = (el, fn) => el.addEventListener("motioncomplete", fn);
function createAndBindMotionState(el, options, presenceState, parentState) {
  const state2 = createMotionState((presenceState == null ? void 0 : presenceState()) === false ? {
    ...options(),
    initial: false
  } : options(), parentState);
  onMount(() => {
    const unmount = state2.mount(el());
    onCleanup(() => {
      if (presenceState && options().exit) {
        state2.setActive("exit", true);
        onCompleteExit(el(), unmount);
      } else
        unmount();
    });
    isFunction(options) && createEffect(() => state2.update(options()));
  });
  return [state2, createStyles(state2.getTarget())];
}
const OPTION_KEYS = ["initial", "animate", "inView", "inViewOptions", "hover", "press", "variants", "transition", "exit"];
const ATTR_KEYS = ["tag", "ref", "style", "onMotionStart", "onMotionComplete", "onHoverStart", "onHoverEnd", "onPressStart", "onPressEnd", "onViewEnter", "onViewLeave"];
const ParentContext = createContext();
const MotionComponent = (props) => {
  const [options, , attrs] = splitProps(props, OPTION_KEYS, ATTR_KEYS);
  const [state2, style2] = createAndBindMotionState(() => root, () => ({
    ...options
  }), useContext(PresenceContext), useContext(ParentContext));
  let root;
  return createComponent(ParentContext.Provider, {
    value: state2,
    get children() {
      return createComponent(Dynamic, mergeProps({
        ref: (el) => {
          var _a;
          root = el;
          (_a = props.ref) == null ? void 0 : _a.call(props, el);
        },
        get component() {
          return props.tag || "div";
        },
        get style() {
          return createMemo(() => !!props.style, true)() ? combineStyle(props.style, style2) : style2;
        },
        get ["on:motionstart"]() {
          return props.onMotionStart;
        },
        get ["on:motioncomplete"]() {
          return props.onMotionComplete;
        },
        get ["on:hoverstart"]() {
          return props.onHoverStart;
        },
        get ["on:hoverend"]() {
          return props.onHoverEnd;
        },
        get ["on:pressstart"]() {
          return props.onPressStart;
        },
        get ["on:pressend"]() {
          return props.onPressEnd;
        },
        get ["on:viewenter"]() {
          return props.onViewEnter;
        },
        get ["on:viewleave"]() {
          return props.onViewLeave;
        }
      }, attrs));
    }
  });
};
const Motion = new Proxy(MotionComponent, {
  get: (_, tag) => (props) => createComponent(MotionComponent, mergeProps(props, {
    tag
  }))
});
let e = { data: "" }, t = (t2) => typeof window == "object" ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n = /\n+/g, o = (e2, t2) => {
  let r = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    n2[0] == "@" ? n2[1] == "i" ? r = n2 + " " + c2 + ";" : l2 += n2[1] == "f" ? o(c2, n2) : n2 + "{" + o(c2, n2[1] == "k" ? "" : t2) + "}" : typeof c2 == "object" ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/(^:.*)|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : c2 != null && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
}, c = {}, s = (e2) => {
  if (typeof e2 == "object") {
    let t2 = "";
    for (let r in e2)
      t2 += r + s(e2[r]);
    return t2;
  }
  return e2;
}, i = (e2, t2, r, i2, p2) => {
  let u2 = s(e2), d = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r2 = 11;
    for (; t3 < e3.length; )
      r2 = 101 * r2 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r2;
  })(u2));
  if (!c[d]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r2, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? o2.shift() : t4[3] ? (r2 = t4[3].replace(n, " ").trim(), o2.unshift(o2[0][r2] = o2[0][r2] || {})) : o2[0][t4[1]] = t4[2].replace(n, " ").trim();
      return o2[0];
    })(e2);
    c[d] = o(p2 ? { ["@keyframes " + d]: t3 } : t3, r ? "" : "." + d);
  }
  let f = r && c.g ? c.g : null;
  return r && (c.g = c[d]), ((e3, t3, r2, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : t3.data.indexOf(e3) === -1 && (t3.data = r2 ? e3 + t3.data : t3.data + e3);
  })(c[d], t2, i2, f), d;
}, p = (e2, t2, r) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && typeof e4 == "object" ? e4.props ? "" : o(e4, "") : e4 === false ? "" : e4;
  }
  return e3 + l2 + (n2 == null ? "" : n2);
}, "");
function u(e2) {
  let r = this || {}, l2 = e2.call ? e2(r.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r.p) : t2), {}) : l2, t(r.target), r.g, r.o, r.k);
}
u.bind({ g: 1 });
u.bind({ k: 1 });
const ThemeContext = createContext();
function makeStyled(tag) {
  let _ctx = this || {};
  return (...args) => {
    const Styled = (props) => {
      const theme = useContext(ThemeContext);
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        get class() {
          const pClass = withTheme.class, append = "class" in withTheme && /^go[0-9]+/.test(pClass);
          let className2 = u.apply({ target: _ctx.target, o: append, p: withTheme, g: _ctx.g }, args);
          return [pClass, className2].filter(Boolean).join(" ");
        }
      });
      const [local, newProps] = splitProps(clone, ["as", "theme"]);
      const htmlProps = newProps;
      const createTag = local.as || tag;
      let el;
      if (typeof createTag === "function") {
        el = createTag(htmlProps);
      } else {
        {
          if (_ctx.g == 1) {
            el = document.createElement(createTag);
            spread(el, htmlProps);
          } else {
            el = Dynamic(mergeProps({ component: createTag }, htmlProps));
          }
        }
      }
      return el;
    };
    Styled.class = (props) => {
      return untrack(() => {
        return u.apply({ target: _ctx.target, p: props, g: _ctx.g }, args);
      });
    };
    return Styled;
  };
}
const styled = new Proxy(makeStyled, {
  get(target, tag) {
    return target(tag);
  }
});
var dMMono = {
  familyName: "DM Mono",
  category: "monospace",
  capHeight: 700,
  ascent: 992,
  descent: -310,
  lineGap: 0,
  unitsPerEm: 1e3,
  xHeight: 496,
  xWidthAvg: 600
};
function normaliseOptions(options) {
  if ("leading" in options && "lineGap" in options) {
    throw new Error("Only a single line height style can be provided. Please pass either `lineGap` OR `leading`.");
  }
  if ("capHeight" in options && "fontSize" in options) {
    throw new Error("Please pass either `capHeight` OR `fontSize`, not both.");
  }
  const {
    fontMetrics
  } = options;
  const capHeightScale = fontMetrics.capHeight / fontMetrics.unitsPerEm;
  let specifiedFontSize;
  let specifiedCapHeight;
  if ("capHeight" in options) {
    specifiedFontSize = options.capHeight / capHeightScale;
    specifiedCapHeight = options.capHeight;
  } else if ("fontSize" in options) {
    specifiedFontSize = options.fontSize;
    specifiedCapHeight = options.fontSize * capHeightScale;
  } else {
    throw new Error("Please pass either `capHeight` OR `fontSize`.");
  }
  let specifiedLineHeight;
  if ("lineGap" in options) {
    specifiedLineHeight = specifiedCapHeight + options.lineGap;
  } else if ("leading" in options) {
    specifiedLineHeight = options.leading;
  }
  return {
    fontSize: specifiedFontSize,
    lineHeight: specifiedLineHeight,
    fontMetrics
  };
}
const round = (value) => parseFloat(value.toFixed(4));
function precomputeValues(options) {
  const {
    fontSize,
    lineHeight,
    fontMetrics
  } = normaliseOptions(options);
  const absoluteDescent = Math.abs(fontMetrics.descent);
  const capHeightScale = fontMetrics.capHeight / fontMetrics.unitsPerEm;
  const descentScale = absoluteDescent / fontMetrics.unitsPerEm;
  const ascentScale = fontMetrics.ascent / fontMetrics.unitsPerEm;
  const lineGapScale = fontMetrics.lineGap / fontMetrics.unitsPerEm;
  const contentArea = fontMetrics.ascent + fontMetrics.lineGap + absoluteDescent;
  const lineHeightScale = contentArea / fontMetrics.unitsPerEm;
  const lineHeightNormal = lineHeightScale * fontSize;
  const allowForLineHeight = (trim) => {
    if (lineHeight) {
      const specifiedLineHeightOffset = (lineHeightNormal - lineHeight) / 2;
      return trim - specifiedLineHeightOffset / fontSize;
    }
    return trim;
  };
  const capHeightTrim = allowForLineHeight(ascentScale - capHeightScale + lineGapScale / 2) * -1;
  const baselineTrim = allowForLineHeight(descentScale + lineGapScale / 2) * -1;
  return {
    fontSize: "".concat(round(fontSize), "px"),
    lineHeight: lineHeight ? "".concat(round(lineHeight), "px") : "normal",
    capHeightTrim: "".concat(round(capHeightTrim), "em"),
    baselineTrim: "".concat(round(baselineTrim), "em")
  };
}
const _createStyleObject = (_ref) => {
  let {
    lineHeight,
    fontSize,
    capHeightTrim,
    baselineTrim
  } = _ref;
  return {
    fontSize,
    lineHeight,
    "::before": {
      content: "''",
      marginBottom: capHeightTrim,
      display: "table"
    },
    "::after": {
      content: "''",
      marginTop: baselineTrim,
      display: "table"
    }
  };
};
function createStyleObject(args) {
  if ("capHeightTrim" in args) {
    return _createStyleObject(args);
  }
  return _createStyleObject(precomputeValues(args));
}
const fontSizeToCapHeight = {
  xs: { capHeight: 9, lineGap: 9 },
  sm: { capHeight: 10, lineGap: 10 },
  base: { capHeight: 11, lineGap: 11 },
  lg: { capHeight: 12, lineGap: 12 },
  xl: { capHeight: 14, lineGap: 14 },
  "2xl": { capHeight: 18, lineGap: 18 },
  "3xl": { capHeight: 22, lineGap: 22 },
  "4xl": { capHeight: 26, lineGap: 26 },
  "5xl": { capHeight: 32, lineGap: 32 },
  "6xl": { capHeight: 40, lineGap: 40 },
  "7xl": { capHeight: 56, lineGap: 28 },
  "8xl": { capHeight: 68, lineGap: 34 },
  "9xl": { capHeight: 92, lineGap: 46 }
};
const styledDynamic = styled(Dynamic);
const fixStyleObject = (rawStyles) => Object.entries(rawStyles).reduce((acc, [key, value]) => {
  const newKey = key == "::before" || key == "::after" ? `&${key}` : key;
  return {
    ...acc,
    [newKey]: value
  };
}, {});
const Capd = styledDynamic(({ fontSize, lineGap, className: className2 }) => {
  var _a, _b;
  if (className2 == null ? void 0 : className2.includes("leading"))
    throw new Error("Capd component cannot have leading class");
  const styles = createStyleObject({
    capHeight: typeof fontSize === "number" ? fontSize : ((_a = fontSizeToCapHeight[fontSize]) == null ? void 0 : _a.capHeight) || fontSizeToCapHeight.base.capHeight,
    lineGap: lineGap || ((_b = fontSizeToCapHeight[fontSize]) == null ? void 0 : _b.lineGap) || fontSizeToCapHeight.base.lineGap,
    fontMetrics: dMMono
  });
  return fixStyleObject(styles);
});
const withCustomStyles = (Component, stylesOverride) => (props) => /* @__PURE__ */ React.createElement(Dynamic, {
  component: Component,
  ...props,
  stylesOverride
});
const { option_focused, option_checked, optionIcon_focused } = comboboxStyles;
const Combobox = ({ context, defaultValue, placeholder, stylesOverride, setApiRef, ...props }) => {
  const [options, setOptions] = createSignal(props.options);
  const [state2, send] = useMachine(machine$1({
    id: createUniqueId(),
    onOpen() {
      setOptions(props.options);
    },
    onInputChange({ value }) {
      const filtered = props.options.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
      setOptions(filtered.length > 0 ? filtered : props.options);
    },
    ...context
  }));
  const api = createMemo(() => connect$1(state2, send, normalizeProps));
  onMount(() => {
    if (setApiRef) {
      setApiRef(api());
    }
    if (defaultValue && api()) {
      api().setValue({ value: defaultValue, label: defaultValue });
    }
  });
  return /* @__PURE__ */ React.createElement(Container, {
    class: stylesOverride == null ? void 0 : stylesOverride.container
  }, /* @__PURE__ */ React.createElement("div", {
    ...api().rootProps
  }, /* @__PURE__ */ React.createElement("div", {
    ...api().controlProps
  }, /* @__PURE__ */ React.createElement(Input, {
    ...api().inputProps,
    placeholder,
    class: twMerge(stylesOverride == null ? void 0 : stylesOverride.input)
  }), /* @__PURE__ */ React.createElement(InputButton, {
    ...api().triggerProps,
    class: stylesOverride == null ? void 0 : stylesOverride.inputButton
  }, /* @__PURE__ */ React.createElement(Icon$1, {
    name: "unfold_more"
  })))), /* @__PURE__ */ React.createElement(Presence, {
    exitBeforeEnter: true
  }, /* @__PURE__ */ React.createElement(Show, {
    when: api().isOpen
  }, /* @__PURE__ */ React.createElement(Motion.div, {
    initial: { opacity: 0, scale: 0.75 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.1, easing: "ease-out" }
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      transition: { duration: 0.1, easing: "ease-in" }
    }
  }, /* @__PURE__ */ React.createElement(OptionContainer, {
    ...api().positionerProps,
    class: stylesOverride == null ? void 0 : stylesOverride.optionContainer
  }, /* @__PURE__ */ React.createElement("ul", {
    ...api().contentProps
  }, /* @__PURE__ */ React.createElement(For, {
    each: options()
  }, (item, index) => {
    var _a, _b, _c;
    const optionState = createMemo(() => api().getOptionState({
      label: item.label,
      value: item.label,
      index: index(),
      disabled: item.disabled
    }));
    return /* @__PURE__ */ React.createElement(Option, {
      ...api().getOptionProps({
        label: item.label,
        value: item.label,
        index: index(),
        disabled: item.disabled
      }),
      class: twMerge(stylesOverride == null ? void 0 : stylesOverride.option, ((_a = optionState()) == null ? void 0 : _a.focused) && ((stylesOverride == null ? void 0 : stylesOverride.option_focused) || option_focused), ((_b = optionState()) == null ? void 0 : _b.checked) && ((stylesOverride == null ? void 0 : stylesOverride.option_checked) || option_checked))
    }, /* @__PURE__ */ React.createElement(OptionLabel, {
      class: stylesOverride == null ? void 0 : stylesOverride.optionLabel
    }, item.label), optionState().checked && /* @__PURE__ */ React.createElement(OptionIcon, {
      class: twMerge(stylesOverride == null ? void 0 : stylesOverride.optionIcon, ((_c = optionState()) == null ? void 0 : _c.focused) && ((stylesOverride == null ? void 0 : stylesOverride.optionIcon_focused) || optionIcon_focused))
    }, /* @__PURE__ */ React.createElement(Icon$1, {
      name: "check"
    })));
  })))))));
};
const pressableStyles = {
  base: twMerge("inline-flex font-black shadow-sm", transitionQuick),
  size: {
    xs: "rounded px-2 py-1 text-xs",
    sm: "rounded px-2 py-1 text-sm",
    md: "rounded-md px-2.5 py-1.5 text-sm",
    lg: "rounded-md px-3 py-2 text-sm",
    xl: "rounded-md px-3.5 py-2.5 text-sm"
  },
  variant: {
    primary: "bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
    secondary: "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-primary-600",
    soft: "bg-primary-50 text-primary-600 shadow-sm hover:bg-primary-100 focus-visible:outline-primary-600",
    primaryOnDark: "bg-primary-500 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
    secondaryOnDark: "bg-white/10 text-white shadow-sm hover:bg-white/20 focus-visible:outline-primary-500",
    black: "bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500",
    outline: "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-50 focus-visible:outline-primary-600"
  }
};
var dom = createScope({
  getPressableId: (ctx) => `pressable:${ctx.id}`,
  getPressableEl: (ctx) => dom.getById(ctx, dom.getPressableId(ctx))
});
function isValidKeyboardEvent(event) {
  const { key, target } = event;
  const element = target;
  const { tagName, isContentEditable } = element;
  const role = element.getAttribute("role");
  if (tagName !== "INPUT" && tagName !== "TEXTAREA" && isContentEditable)
    return false;
  return (key === "Enter" || key === " ") && (!isHTMLAnchorLink(element) || role === "button" && key !== "Enter") && !(role === "link" && key !== "Enter");
}
function isHTMLAnchorLink(target) {
  return target.tagName === "A" && target.hasAttribute("href");
}
function shouldPreventDefaultKeyboard(target) {
  return !((target.tagName === "INPUT" || target.tagName === "BUTTON") && target.type === "submit");
}
function shouldPreventDefault(target) {
  return !isHTMLElement$3(target) || !target.draggable;
}
function isOverTarget(point, target) {
  if (!target)
    return;
  let rect = target.getBoundingClientRect();
  let pointRect = getPointClientRect(point);
  return areRectanglesOverlapping(rect, pointRect);
}
function getPointClientRect(point) {
  let offsetX = point.width ? point.width / 2 : point.radiusX || 0;
  let offsetY = point.height ? point.height / 2 : point.radiusY || 0;
  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX
  };
}
function areRectanglesOverlapping(a2, b) {
  if (a2.left > b.right || b.left > a2.right) {
    return false;
  }
  if (a2.top > b.bottom || b.top > a2.bottom) {
    return false;
  }
  return true;
}
function connect(state2, send, normalize) {
  const isPressed = state2.hasTag("pressed");
  const isDisabled = state2.context.disabled;
  return {
    isPressed,
    pressableProps: normalize.element({
      id: dom.getPressableId(state2.context),
      "data-disabled": dataAttr(isDisabled),
      "data-pressed": dataAttr(isPressed),
      onKeyDown(event) {
        const evt = getNativeEvent(event);
        if (!isValidKeyboardEvent(evt))
          return;
        if (!contains(event.currentTarget, event.target))
          return;
        if (!event.repeat) {
          send({ type: "KEY_DOWN", event, pointerType: "keyboard" });
        }
        if (shouldPreventDefaultKeyboard(event.target)) {
          event.preventDefault();
        }
      },
      onKeyUp(event) {
        const evt = getNativeEvent(event);
        if (!isValidKeyboardEvent(evt) || event.repeat)
          return;
        if (!contains(event.currentTarget, event.target))
          return;
        send({ type: "KEY_UP", event, pointerType: "keyboard" });
      },
      onClick(event) {
        const evt = getNativeEvent(event);
        if (!contains(event.currentTarget, event.target) || event.button !== 0)
          return;
        const ctx = state2.context;
        if (ctx.disabled) {
          event.preventDefault();
        }
        const isVirtual = ctx.pointerType === "virtual" || isVirtualClick(evt);
        if (!ctx.ignoreClickAfterPress && isVirtual) {
          send({ type: "CLICK", event, pointerType: "virtual" });
        }
      },
      onPointerDown(event) {
        if (state2.context.disabled) {
          return;
        }
        if (event.button !== 0 || !contains(event.currentTarget, event.target)) {
          return;
        }
        if (shouldPreventDefault(event.currentTarget)) {
          event.preventDefault();
        }
        const evt = getNativeEvent(event);
        const pointerType = isVirtualPointerEvent(evt) ? "virtual" : event.pointerType;
        send({ type: "POINTER_DOWN", event, pointerType });
      },
      onMouseDown(event) {
        if (event.button !== 0)
          return;
        if (shouldPreventDefault(event.currentTarget)) {
          event.preventDefault();
        }
      },
      onDragStart(event) {
        send({ type: "DRAG_START", event });
      }
    })
  };
}
function machine(userContext) {
  const ctx = compact$1(userContext);
  return createMachine({
    id: "pressable",
    initial: "idle",
    context: {
      ...ctx,
      ignoreClickAfterPress: false,
      activePointerId: null,
      target: null,
      pointerType: null,
      pointerdownEvent: null,
      cleanups: ref([]),
      wasPressedDown: false
    },
    exit: ["restoreTextSelection", "removeDocumentListeners"],
    states: {
      idle: {
        entry: ["removeDocumentListeners", "resetContext", "restoreTextSelection", "resetIgnoreClick"],
        on: {
          POINTER_DOWN: [
            {
              guard: "isVirtualPointerEvent",
              actions: "setPointerType"
            },
            {
              target: "pressed:in",
              actions: [
                "setPressedDown",
                "setPointerType",
                "setPointerId",
                "setTarget",
                "focusIfNeeded",
                "disableTextSelection",
                "invokeOnPressStart",
                "trackDocumentPointerEvents"
              ]
            }
          ],
          KEY_DOWN: {
            target: "pressed:in",
            actions: ["setTarget", "invokeOnPressStart", "trackDocumentKeyup"]
          },
          CLICK: {
            actions: ["focusIfNeeded", "invokeOnPressStart", "invokeOnPressEnd", "invokeOnPress", "resetIgnoreClick"]
          }
        }
      },
      "pressed:in": {
        tags: "pressed",
        entry: "preventContextMenu",
        after: {
          500: {
            guard: "wasPressedDown",
            actions: ["clearPressedDown", "invokeOnLongPress"]
          }
        },
        on: {
          POINTER_LEAVE: [
            {
              guard: "cancelOnPointerExit",
              target: "idle",
              actions: ["clearPressedDown", "invokeOnPressEnd"]
            },
            {
              target: "pressed:out",
              actions: ["invokeOnPressEnd"]
            }
          ],
          DOC_POINTER_UP: [
            {
              guard: "wasPressedDown",
              target: "idle",
              actions: ["clearPressedDown", "invokeOnPressUp", "invokeOnPressEnd", "invokeOnPress"]
            },
            {
              target: "idle",
              actions: ["clearPressedDown", "invokeOnPressUp", "invokeOnPressEnd"]
            }
          ],
          DOC_KEY_UP: {
            target: "idle",
            actions: ["clearPressedDown", "invokeOnPressEnd", "triggerClick"]
          },
          KEY_UP: {
            target: "idle",
            actions: ["clearPressedDown", "invokeOnPressUp"]
          },
          DOC_POINTER_CANCEL: { target: "idle", actions: "clearPressedDown" },
          DRAG_START: { target: "idle", actions: "clearPressedDown" }
        }
      },
      "pressed:out": {
        on: {
          POINTER_ENTER: {
            target: "pressed:in",
            actions: "invokeOnPressStart"
          },
          DOC_POINTER_UP: {
            target: "idle"
          },
          DOC_POINTER_CANCEL: "idle",
          DRAG_START: "idle"
        }
      }
    }
  }, {
    guards: {
      isVirtualPointerEvent: (_ctx, evt) => evt.pointerType === "virtual",
      cancelOnPointerExit: (ctx2) => !!ctx2.cancelOnPointerExit,
      wasPressedDown: (ctx2) => ctx2.wasPressedDown
    },
    actions: {
      trackDocumentPointerEvents(ctx2, _evt, { send }) {
        const doc = dom.getDoc(ctx2);
        const onPointerMove = (event) => {
          if (event.pointerId !== ctx2.activePointerId)
            return;
          const isOver = isOverTarget(event, ctx2.target);
          send({ type: isOver ? "POINTER_ENTER" : "POINTER_LEAVE", event });
        };
        const onPointerUp = (event) => {
          if (event.pointerId !== ctx2.activePointerId || event.button !== 0)
            return;
          send({ type: "DOC_POINTER_UP", event });
        };
        const onPointerCancel = (event) => {
          send({ type: "DOC_POINTER_CANCEL", event });
        };
        const cleanup = [
          addDomEvent$1(doc, "pointermove", onPointerMove, false),
          addDomEvent$1(doc, "pointerup", onPointerUp, false),
          addDomEvent$1(doc, "pointercancel", onPointerCancel, false)
        ];
        if (ctx2.pointerType !== "touch") {
          cleanup.push(addDomEvent$1(doc, "contextmenu", onPointerCancel, false));
        }
        ctx2.cleanups.push(...cleanup);
      },
      trackDocumentKeyup(ctx2, _evt, { send }) {
        const doc = dom.getDoc(ctx2);
        const onKeyup = (event) => {
          if (!isValidKeyboardEvent(event))
            return;
          if (shouldPreventDefaultKeyboard(event.target)) {
            event.preventDefault();
          }
          send({ type: "DOC_KEY_UP", event });
        };
        const cleanup = addDomEvent$1(doc, "keyup", onKeyup, false);
        ctx2.cleanups.push(cleanup);
      },
      removeDocumentListeners(ctx2) {
        ctx2.cleanups.forEach((fn) => fn == null ? void 0 : fn());
        ctx2.cleanups = ref([]);
      },
      resetContext(ctx2) {
        ctx2.activePointerId = null;
        ctx2.pointerType = null;
        ctx2.pointerdownEvent = null;
      },
      restoreTextSelection(ctx2) {
        if (ctx2.allowTextSelectionOnPress || !ctx2.target)
          return;
        restoreTextSelection({ target: ctx2.target, doc: dom.getDoc(ctx2) });
      },
      setPointerToVirtual(ctx2) {
        ctx2.pointerType = "virtual";
      },
      setPointerType(ctx2, { event }) {
        ctx2.pointerType = event.pointerType;
      },
      setPointerId(ctx2, { event }) {
        ctx2.activePointerId = event.pointerId;
        ctx2.pointerdownEvent = ref(event);
      },
      setTarget(ctx2, { event }) {
        ctx2.target = ref(event.currentTarget);
      },
      focusIfNeeded(ctx2, { event }) {
        if (ctx2.disabled || ctx2.preventFocusOnPress)
          return;
        event.currentTarget.focus({ preventScroll: true });
      },
      invokeOnPressStart(ctx2, evt) {
        var _a;
        if (ctx2.disabled)
          return;
        let { event: originalEvent, pressEvent, pointerType } = evt;
        const event = pressEvent || originalEvent;
        (_a = ctx2.onPressStart) == null ? void 0 : _a.call(ctx2, {
          type: "pressstart",
          pointerType: pointerType || ctx2.pointerType,
          target: event.currentTarget,
          originalEvent: event
        });
      },
      disableTextSelection(ctx2) {
        if (!ctx2.target || ctx2.allowTextSelectionOnPress)
          return;
        disableTextSelection({ target: ctx2.target, doc: dom.getDoc(ctx2) });
      },
      invokeOnPressUp(ctx2, { event, pointerType }) {
        var _a;
        if (ctx2.disabled)
          return;
        (_a = ctx2.onPressUp) == null ? void 0 : _a.call(ctx2, {
          type: "pressup",
          pointerType: pointerType || ctx2.pointerType,
          target: event.currentTarget,
          originalEvent: event
        });
      },
      invokeOnPressEnd(ctx2, { event, pointerType }) {
        var _a;
        ctx2.ignoreClickAfterPress = true;
        (_a = ctx2.onPressEnd) == null ? void 0 : _a.call(ctx2, {
          type: "pressend",
          pointerType: pointerType || ctx2.pointerType,
          target: event.currentTarget,
          originalEvent: event
        });
      },
      invokeOnPress(ctx2, { event, pointerType }) {
        var _a;
        if (ctx2.disabled)
          return;
        (_a = ctx2.onPress) == null ? void 0 : _a.call(ctx2, {
          type: "press",
          pointerType: pointerType || ctx2.pointerType,
          target: event.currentTarget,
          originalEvent: event
        });
      },
      triggerClick(ctx2, { event }) {
        let target = event.target;
        if (!isHTMLElement$3(ctx2.target)) {
          return;
        }
        const isAnchor = isHTMLAnchorLink(ctx2.target) || ctx2.target.getAttribute("role") === "link";
        if (ctx2.target.contains(target) && isAnchor) {
          ctx2.target.click();
        }
      },
      dispatchPointerCancel(ctx2) {
        if (!ctx2.target)
          return;
        const win = dom.getWin(ctx2);
        const evt = new win.PointerEvent("pointercancel", { bubbles: true });
        ctx2.target.dispatchEvent(evt);
      },
      invokeOnLongPress(ctx2, { pointerType }) {
        var _a;
        if (!ctx2.target)
          return;
        (_a = ctx2.onLongPress) == null ? void 0 : _a.call(ctx2, {
          type: "longpress",
          pointerType: pointerType || ctx2.pointerType,
          target: ctx2.target,
          originalEvent: ctx2.pointerdownEvent
        });
      },
      resetIgnoreClick(ctx2) {
        ctx2.ignoreClickAfterPress = false;
      },
      setPressedDown(ctx2) {
        ctx2.wasPressedDown = true;
      },
      clearPressedDown(ctx2) {
        ctx2.wasPressedDown = false;
      },
      preventContextMenu(ctx2) {
        if (ctx2.pointerType !== "touch" || !ctx2.onLongPress)
          return;
        const onContextMenu = (event) => event.preventDefault();
        const cleanup = addDomEvent$1(ctx2.target, "contextmenu", onContextMenu, { once: true });
        const onPointerUp = () => void setTimeout(cleanup, 30);
        addDomEvent$1(dom.getWin(ctx2), "pointerup", onPointerUp, { once: true });
      }
    }
  });
}
const Pressable = ({ context, variant, size: size2, component, ...props }) => {
  const [state2, send] = useMachine(machine({
    id: createUniqueId(),
    preventFocusOnPress: true,
    ...context
  }));
  const classList2 = twMerge(pressableStyles.base, variant ? pressableStyles.variant[variant] : pressableStyles.variant.primary, size2 ? pressableStyles.size[size2] : pressableStyles.size.md);
  const api = createMemo(() => connect(state2, send, normalizeProps));
  onMount(() => {
    if (props.setApiRef) {
      props.setApiRef(api());
    }
  });
  return /* @__PURE__ */ React.createElement(Dynamic, {
    component: component || "button",
    ...api().pressableProps,
    ...props,
    class: twMerge(classList2, props.class)
  });
};
const sizeToClass = {
  20: "w-5 h-5 text-[20px]",
  24: "w-5 h-5 text-[24px]",
  40: "w-5 h-5 text-[40px]",
  48: "w-5 h-5 text-[48px]"
};
const Icon = ({ name, size: size2, className: className2, inline }) => {
  const sizeClass = size2 ? sizeToClass[size2] : sizeToClass[20];
  return /* @__PURE__ */ React.createElement("span", {
    class: twMerge("material-icon", !inline && sizeClass, className2),
    style: {
      "font-variation-settings": `'FILL' 1, 'wght' 600, 'opsz' ${size2 || 20}`
    }
  }, name);
};
export { Capd, Combobox, Icon, Pressable, fontSizeToCapHeight, pressableStyles, withCustomStyles, withInitialClass };
