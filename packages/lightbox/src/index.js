'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lightbox = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
var react_slot_1 = require("@radix-ui/react-slot");
var react_1 = __importDefault(require("react"));
var assets_1 = require("./assets");
var helpers_1 = require("./helpers");
require("./styles.css");
var hooks_1 = require("./hooks");
var LightboxContext = react_1.default.createContext(null);
var useLightbox = function () {
    var context = react_1.default.useContext(LightboxContext);
    if (!context) {
        throw new Error('useLightbox must be used within a LightboxProvider');
    }
    return context;
};
var LightboxRoot = function (props) {
    var _a = react_1.default.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_1.default.useState(0), activeItemIndex = _b[0], setActiveItemIndex = _b[1];
    var toPrev = react_1.default.useCallback(function () {
        setActiveItemIndex(function (current) {
            var prevIndex = current - 1;
            if (prevIndex < 0) {
                return 0;
            }
            return prevIndex;
        });
    }, []);
    var toNext = react_1.default.useCallback(function () {
        setActiveItemIndex(function (current) {
            var nextIndex = current + 1;
            if (nextIndex >= items.length) {
                return items.length - 1;
            }
            return nextIndex;
        });
    }, [items.length]);
    // Handle keyboard navigation
    react_1.default.useEffect(function () {
        var handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    toPrev();
                    break;
                case 'ArrowRight':
                    toNext();
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () { return document.removeEventListener('keydown', handleKeyDown); };
    }, [toPrev, toNext]);
    var contextValue = react_1.default.useMemo(function () { return ({
        items: items,
        setItems: setItems,
        activeItemIndex: activeItemIndex,
        setActiveItemIndex: setActiveItemIndex,
        toPrev: toPrev,
        toNext: toNext,
    }); }, [items, activeItemIndex, toPrev, toNext]);
    return ((0, jsx_runtime_1.jsx)(LightboxContext.Provider, { value: contextValue, children: (0, jsx_runtime_1.jsx)(DialogPrimitive.Root, __assign({}, props)) }));
};
var LightboxTrigger = react_1.default.forwardRef(function (_a, forwardedRef) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Trigger, __assign({ ref: forwardedRef }, props, { children: children })));
});
LightboxTrigger.displayName = 'LightboxTrigger';
var LightboxContent = react_1.default.forwardRef(function (_a, forwardedRef) {
    var title = _a.title, description = _a.description, children = _a.children, className = _a.className, container = _a.container, props = __rest(_a, ["title", "description", "children", "className", "container"]);
    return ((0, jsx_runtime_1.jsxs)(DialogPrimitive.Portal, { container: container, children: [(0, jsx_runtime_1.jsx)(DialogPrimitive.Title, { "data-tinylight-title": "", children: title }), (0, jsx_runtime_1.jsx)(DialogPrimitive.Description, { "data-tinylight-description": "", children: description }), (0, jsx_runtime_1.jsx)(DialogPrimitive.Overlay, { "data-tinylight-overlay": "", children: (0, jsx_runtime_1.jsx)(DialogPrimitive.Content, __assign({ "data-tinylight-content": "", ref: forwardedRef }, props, { children: children })) })] }));
});
LightboxContent.displayName = 'LightboxContent';
var LightboxItems = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = useLightbox(), setItems = _b.setItems, activeItemIndex = _b.activeItemIndex, setActiveItemIndex = _b.setActiveItemIndex;
    var validChildren = (0, helpers_1.getValidChildren)(children);
    var containerRef = react_1.default.useRef(null);
    var scrollTimeoutRef = react_1.default.useRef(null);
    // Update the active slide based on scroll position
    var handleScroll = react_1.default.useCallback(function () {
        var _a;
        if (!containerRef.current)
            return;
        var container = containerRef.current;
        var slideWidth = ((_a = container.firstElementChild) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0;
        var newIndex = Math.round(container.scrollLeft / slideWidth);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(function () {
            setActiveItemIndex(newIndex);
        }, 100);
    }, [setActiveItemIndex]);
    react_1.default.useEffect(function () {
        return function () {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);
    react_1.default.useEffect(function () {
        if (!containerRef.current)
            return;
        var container = containerRef.current;
        var activeItem = container.children[activeItemIndex];
        if (activeItem) {
            container.scrollTo({
                left: activeItem.offsetLeft,
                behavior: 'smooth',
            });
        }
    }, [activeItemIndex]);
    react_1.default.useEffect(function () {
        var container = containerRef.current;
        if (!container)
            return;
        container.addEventListener('scroll', handleScroll);
        return function () { return container.removeEventListener('scroll', handleScroll); };
    }, [handleScroll]);
    (0, hooks_1.useIsomorphicLayoutEffect)(function () {
        setItems(validChildren);
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ "data-tinylight-items": "", ref: containerRef }, props, { children: validChildren.map(function (child, i) {
            return ((0, jsx_runtime_1.jsx)("div", { "data-tinylight-item": "", "data-tinylight-active-item": activeItemIndex === i, children: react_1.default.cloneElement(child, {}) }, child.key));
        }) })));
};
var LightboxImage = function (_a) {
    var asChild = _a.asChild, props = __rest(_a, ["asChild"]);
    var Component = asChild ? react_slot_1.Slot : 'img';
    return (0, jsx_runtime_1.jsx)(Component, __assign({}, props));
};
var LightboxVideo = function (_a) {
    var _b, _c;
    var asChild = _a.asChild, props = __rest(_a, ["asChild"]);
    var Component = asChild ? react_slot_1.Slot : 'video';
    var videoRef = react_1.default.useRef(null);
    if (!((_b = videoRef.current) === null || _b === void 0 ? void 0 : _b.parentNode.querySelector('[data-tinylight-active-item]'))) {
        (_c = videoRef.current) === null || _c === void 0 ? void 0 : _c.pause();
    }
    return (0, jsx_runtime_1.jsx)(Component, __assign({}, props, { ref: videoRef }));
};
var LightboxThumbs = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = useLightbox(), items = _b.items, activeItemIndex = _b.activeItemIndex, setActiveItemIndex = _b.setActiveItemIndex;
    var containerRef = react_1.default.useRef(null);
    react_1.default.useEffect(function () {
        if (containerRef.current && items.length > 0) {
            var container = containerRef.current;
            var activeChild = container.children[activeItemIndex];
            var containerCenter = container.offsetWidth / 2;
            var childCenter = activeChild.offsetLeft + activeChild.offsetWidth / 2;
            container.scrollTo({
                left: childCenter - containerCenter,
                behavior: 'smooth',
            });
        }
    }, [activeItemIndex, items.length]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ "data-tinylight-thumbs": "", ref: containerRef }, props, { children: items.map(function (item, index) {
            var isLightboxVideoProps = function (props) {
                return 'poster' in props;
            };
            var _a = item.props, asChild = _a.asChild, props = __rest(_a, ["asChild"]);
            var isVideo = item.type === LightboxVideo;
            var Comp = asChild ? react_slot_1.Slot : 'img';
            var imgSrc = isVideo
                ? item.props.poster
                : asChild && item.props.children
                    ? isLightboxVideoProps(item.props.children.props)
                        ? item.props.children.props.poster
                        : item.props.children.props.src
                    : item.props.src;
            return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setActiveItemIndex(index); }, type: "button", "data-tinylight-thumb": "", "data-tinylight-active-thumb": activeItemIndex === index, style: { animationDelay: "".concat(index * 100, "ms") }, children: (0, jsx_runtime_1.jsx)(Comp, __assign({}, props, { src: imgSrc, alt: "" })) }, item.key));
        }) })));
};
var LightboxClose = function (_a) {
    var Icon = _a.icon, ref = _a.ref, props = __rest(_a, ["icon", "ref"]);
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Close, __assign({ "data-tinylight-close-button": "", ref: ref }, props, { children: Icon !== null && Icon !== void 0 ? Icon : (0, jsx_runtime_1.jsx)(assets_1.Close, {}) })));
};
var LightboxPrevButton = function (_a) {
    var Icon = _a.icon, ref = _a.ref, props = __rest(_a, ["icon", "ref"]);
    var _b = useLightbox(), toPrev = _b.toPrev, activeItemIndex = _b.activeItemIndex;
    return ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: toPrev, ref: ref, disabled: activeItemIndex === 0, "aria-label": "Previous item", "data-tinylight-prev-button": "", "data-tinylight-nav-button": "" }, props, { children: Icon !== null && Icon !== void 0 ? Icon : (0, jsx_runtime_1.jsx)(assets_1.PreviousArrow, {}) })));
};
var LightboxNextButton = function (_a) {
    var Icon = _a.icon, ref = _a.ref, props = __rest(_a, ["icon", "ref"]);
    var _b = useLightbox(), toNext = _b.toNext, activeItemIndex = _b.activeItemIndex, items = _b.items;
    return ((0, jsx_runtime_1.jsx)("button", __assign({ onClick: toNext, ref: ref, disabled: activeItemIndex === items.length - 1, "aria-label": "Next item", "data-tinylight-next-button": "", "data-tinylight-nav-button": "" }, props, { children: Icon !== null && Icon !== void 0 ? Icon : (0, jsx_runtime_1.jsx)(assets_1.NextArrow, {}) })));
};
exports.Lightbox = {
    Root: LightboxRoot,
    Trigger: LightboxTrigger,
    Content: LightboxContent,
    Items: LightboxItems,
    Image: LightboxImage,
    Video: LightboxVideo,
    Thumbs: LightboxThumbs,
    Close: LightboxClose,
    PrevButton: LightboxPrevButton,
    NextButton: LightboxNextButton,
};
