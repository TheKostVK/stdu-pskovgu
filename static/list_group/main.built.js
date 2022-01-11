!function t(e, i, s) {
    function n(a, o) {
        if (!i[a]) {
            if (!e[a]) {
                var h = "function" == typeof require && require;
                if (!o && h) return h(a, !0);
                if (r) return r(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = i[a] = {exports: {}};
            e[a][0].call(c.exports, (function (t) {
                return n(e[a][1][t] || t)
            }), c, c.exports, t, e, i, s)
        }
        return i[a].exports
    }

    for (var r = "function" == typeof require && require, a = 0; a < s.length; a++) n(s[a]);
    return n
}({
    1: [function (t, e, i) {
        "use strict";
        var s = t(8), n = t(9), r = t(12), a = t(24).EventEmitterMicro, o = a.prototype, h = t(17), l = t(19),
            c = [h.BUSY, h.CHECKED, h.DISABLED, h.EXPANDED, h.HIDDEN, h.INVALID, h.PRESSED, h.SELECTED],
            u = function (t, e) {
                a.call(this), this._options = e || {}, this._selector = e.selector || ".navitem", this._allowMultiSelection = e.multiSelection || !1;
                var i = c.indexOf(e.state) > -1 ? e.state : h.SELECTED;
                this.el = t, this._navItems = t.querySelectorAll(this._selector), this._navItems = Array.prototype.slice.call(this._navItems), this._state = i, this._navKeys = {}, this.selectOption = this.selectOption.bind(this), this._handleKeyDown = this._handleKeyDown.bind(this), this._setup()
            };
        u.ONSELECT = "onSelect", u.ONFOCUS = "onFocus";
        var d = u.prototype = Object.create(o);
        d._setup = function () {
            for (var t = [l.ARROW_DOWN, l.ARROW_RIGHT], e = [l.ARROW_UP, l.ARROW_LEFT], i = [l.ENTER, l.SPACEBAR], s = 0; s < t.length; s++) this.addNavkey(t[s], this._arrowDown.bind(this, !0)), this.addNavkey(e[s], this._arrowDown.bind(this, null)), this.addNavkey(i[s], this.selectOption);
            this._setupNavItems()
        }, d._setupNavItems = function () {
            if (this._navItems.length) {
                for (var t = 0; t < this._navItems.length; t++) this._setTabbingByIndex(t);
                void 0 !== this.focusedNavItemIndex && void 0 !== this.selectedNavitemIndex || this.setSelectedItemByIndex(0, !0)
            }
        }, d._setTabbingByIndex = function (t) {
            var e = this._navItems[t];
            r(e.getAttribute(this._state)) && (this.focusedNavItemIndex = t, this.selectedNavitemIndex = t), r(e.getAttribute(h.DISABLED)) ? s(e) : n(e)
        }, d.start = function () {
            this._navItems.length < 1 || (this.el.addEventListener("keydown", this._handleKeyDown), this.el.addEventListener("click", this.selectOption))
        }, d.stop = function () {
            this.el.removeEventListener("keydown", this._handleKeyDown), this.el.removeEventListener("click", this.selectOption)
        }, d._handleKeyDown = function (t) {
            if (t.ctrlKey || t.altKey || t.metaKey) return !0;
            this._navKeys[t.keyCode] && this._navKeys[t.keyCode](t)
        }, d._arrowDown = function (t, e, i) {
            e.preventDefault(), this.previousNavItemIndex = this.focusedNavItemIndex, this.focusedNavItemIndex = this._calculateIndex(t, this.focusedNavItemIndex), this._navItems[this.focusedNavItemIndex].focus(), i || this.trigger(u.ONFOCUS, {
                event: e,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }, d.selectOption = function (t, e) {
            t.preventDefault();
            var i = this._navItems.indexOf(document.activeElement);
            i > -1 && document.activeElement !== this._navItems[this.focusedNavItemIndex] && (this.focusedNavItemIndex = i), this._allowMultiSelection ? this._toggleState() : (this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"), this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")), this.selectedNavitemIndex = this.focusedNavItemIndex, e || this.trigger(u.ONSELECT, {
                event: t,
                index: this.selectedNavitemIndex,
                el: this._navItems[this.selectedNavitemIndex]
            })
        }, d._toggleState = function () {
            var t = this._navItems[this.focusedNavItemIndex].getAttribute(this._state);
            r(t) ? this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "false") : this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")
        }, d._calculateIndex = function (t, e) {
            var i = e;
            if (!0 === t) {
                if (i = ++i >= this._navItems.length ? 0 : i, !r(this._navItems[i].getAttribute(h.DISABLED)) || this._navItems[i].hasAttribute("disabled")) return i
            } else if (i = --i < 0 ? this._navItems.length - 1 : i, !r(this._navItems[i].getAttribute(h.DISABLED)) || this._navItems[i].hasAttribute("disabled")) return i;
            return this._calculateIndex(t, i)
        }, d.updateNavItems = function () {
            var t = this.el.querySelectorAll(this._selector);
            this._navItems = Array.prototype.slice.call(t)
        }, d.addNavItem = function (t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (r(t.getAttribute(h.DISABLED)) || n(t), this._navItems.push(t))
        }, d.setSelectedItemByIndex = function (t, e) {
            this._allowMultiSelection || isNaN(this.selectedNavitemIndex) || this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"), this.focusedNavItemIndex = t, this.selectedNavitemIndex = t, this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "true"), e || this.trigger(u.ONSELECT, {
                event: null,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }, d.getSelectedItem = function () {
            return this._navItems[this.selectedNavitemIndex]
        }, d.getFocusedItem = function (t) {
            return this._navItems[this.focusedNavItemIndex]
        }, d.addNavkey = function (t, e) {
            "function" == typeof e && "number" == typeof t ? this._navKeys[t] = e : console.warn("incorrect types arguments were passed")
        }, d.removeNavkey = function (t) {
            delete this._navKeys[t]
        }, d.destroy = function () {
            for (var t in o.destroy.call(this), this.stop(), this.el = null, this._options = null, this._selector = null, this.focusedNavItemIndex = null, this.selectedNavitemIndex = null, this._navItems = null, this._state = null, this.selectOption = null, this._handleKeyDown = null, this._navKeys) this._navKeys.hasOwnProperty(t) && this.removeNavkey(t);
            this._navKeys = null
        }, e.exports = u
    }, {12: 12, 17: 17, 19: 19, 24: 24, 8: 8, 9: 9}],
    2: [function (t, e, i) {
        "use strict";
        var s = t(7), n = t(11), r = t(16), a = function (t, e) {
            e = e || {}, this._tabbables = null, this._excludeHidden = e.excludeHidden, this._firstTabbableElement = e.firstFocusElement, this._lastTabbableElement = null, this._relatedTarget = null, this.el = t, this._handleOnFocus = this._handleOnFocus.bind(this)
        }, o = a.prototype;
        o.start = function () {
            this.updateTabbables(), n(this.el, null, this._excludeHidden), this._firstTabbableElement ? this.el.contains(document.activeElement) || this._firstTabbableElement.focus() : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."), this._relatedTarget = document.activeElement, document.addEventListener("focus", this._handleOnFocus, !0)
        }, o.stop = function () {
            r(this.el), document.removeEventListener("focus", this._handleOnFocus, !0)
        }, o.updateTabbables = function () {
            this._tabbables = s.getTabbableElements(this.el, this._excludeHidden), this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0], this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]
        }, o._handleOnFocus = function (t) {
            if (this.el.contains(t.target)) this._relatedTarget = t.target; else {
                if (t.preventDefault(), this.updateTabbables(), this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget) return this._firstTabbableElement.focus(), void (this._relatedTarget = this._firstTabbableElement);
                if (this._relatedTarget === this._firstTabbableElement && this._lastTabbableElement) return this._lastTabbableElement.focus(), void (this._relatedTarget = this._lastTabbableElement)
            }
        }, o.destroy = function () {
            this.stop(), this.el = null, this._tabbables = null, this._firstTabbableElement = null, this._lastTabbableElement = null, this._relatedTarget = null, this._handleOnFocus = null
        }, e.exports = a
    }, {11: 11, 16: 16, 7: 7}],
    3: [function (t, e, i) {
        "use strict";
        var s = t(19), n = 0,
            r = ["button", "checkbox", "listbox", "option", "menuitem", "menuitemradio", "menuitemcheckbox", "tab"],
            a = t(23), o = function () {
                this._elements = {}, this._callbacks = {}, this._bindEvents(), this._proxies = {}, this._setup()
            }, h = o.prototype;
        h._bindEvents = function () {
            this._handleKeydown = this._handleKeydown.bind(this), this._handleHover = this._handleHover.bind(this)
        }, h._setup = function () {
            this._addProxy("click", this._clickProxy), this._addProxy("hover", this._hoverProxy)
        }, h._addProxy = function (t, e) {
            this._proxies[t] = this._proxies[t] || [], this._proxies[t].push(e)
        }, h._removeProxy = function (t, e) {
            if (this._proxies[t]) {
                var i = this._proxies[t].indexOf(e);
                i > -1 && this._proxies[t].splice(i, 1), 0 === this._proxies[t].length && delete this._proxies[t]
            }
        }, h.addEventListener = function (t, e, i) {
            this._proxies[e] && (this._proxies[e].forEach(function (s) {
                s.call(this, t, e, i)
            }.bind(this)), t.addEventListener(e, i))
        }, h.removeEventListener = function (t, e, i) {
            this._proxies[e] && (this._proxies[e].forEach(function (s) {
                s.call(this, t, e, i, !0)
            }.bind(this)), t.removeEventListener(e, i))
        }, h._clickProxy = function (t, e, i, s) {
            var n = t.getAttribute("role");
            r.indexOf(n) < 0 && a("element's role is not set to any of the following " + r.join(", ")), s ? (t.removeEventListener("keydown", this._handleKeydown), this._removeCallback(t, e, i)) : (t.addEventListener("keydown", this._handleKeydown), this._addCallback(t, e, i))
        }, h._hoverProxy = function (t, e, i, s) {
            s ? (t.removeEventListener("focus", this._handleHover, !0), t.removeEventListener("blur", this._handleHover, !0), i && this._removeCallback(t, e, i)) : (t.addEventListener("focus", this._handleHover, !0), t.addEventListener("blur", this._handleHover, !0), i && this._addCallback(t, e, i))
        }, h._handleKeydown = function (t) {
            if (t.ctrlKey || t.altKey || t.metaKey) return !0;
            t.keyCode !== s.SPACEBAR && t.keyCode !== s.ENTER || this._executeCallback(t, "click")
        }, h._handleHover = function (t) {
            "focus" === t.type ? t.currentTarget.classList.add("hover") : t.currentTarget.classList.remove("hover"), this._executeCallback(t, "hover")
        }, h._executeCallback = function (t, e) {
            var i = this._getCallbacksByElement(t.currentTarget, e);
            if (i) for (var s = 0; s < i.length; s++) i[s](t)
        }, h._addCallback = function (t, e, i) {
            var s = this._getIDByElement(t) || this._generateId();
            this._elements[s] = t, i instanceof Function && (this._callbacks[s] = this._callbacks[s] || {}, this._callbacks[s][e] = this._callbacks[s][e] || [], this._callbacks[s][e].push(i))
        }, h._removeCallback = function (t, e, i) {
            var s = this._getIDByElement(t), n = this._callbacks[s];
            if (n && n[e]) {
                var r = n[e].indexOf(i);
                n[e].splice(r, 1), 0 === n[e].length && (delete n[e], this._isEmpty(n) && (delete this._callbacks[s], delete this._elements[s]))
            }
        }, h._getIDByElement = function (t) {
            for (var e in this._elements) if (this._elements.hasOwnProperty(e) && this._elements[e] === t) return e
        }, h._getCallbacksByElement = function (t, e) {
            var i = this._getIDByElement(t);
            if (i) return this._callbacks[i][e]
        }, h._generateId = function () {
            return (++n).toString()
        }, h._isEmpty = function (t) {
            for (var e in t) if (t.hasOwnProperty(e)) return !1;
            return !0
        }, e.exports = new o
    }, {19: 19, 23: 23}],
    4: [function (t, e, i) {
        "use strict";
        var s = t(17), n = t(20), r = t(9), a = t(8), o = t(12), h = t(1), l = h.prototype, c = function (t, e) {
            e = e || {}, h.call(this, t, {
                selector: e.selector || "*[role=" + n.OPTION + "]",
                state: e.state || s.SELECTED
            })
        }, u = c.prototype = Object.create(l);
        u._setTabbingByIndex = function (t) {
            var e = this._navItems[t];
            o(e.getAttribute(this._state)) ? (this.focusedNavItemIndex = t, this.selectedNavitemIndex = t, this._enableElement(e)) : this._disableElement(e)
        }, u.setSelectedItemByIndex = function (t, e) {
            isNaN(this.selectedNavitemIndex) || this._disableElement(this._navItems[this.selectedNavitemIndex]), l.setSelectedItemByIndex.call(this, t, e), this._enableElement(this._navItems[this.selectedNavitemIndex])
        }, u.addNavItem = function (t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (o(t.getAttribute(s.DISABLED)) || this._disableElement(t), this._navItems.push(t))
        }, u._arrowDown = function (t, e) {
            l._arrowDown.call(this, t, e, !0), this.selectOption(e)
        }, u._enableElement = function (t) {
            r(t), t.setAttribute(this._state, "true")
        }, u._disableElement = function (t) {
            a(t), t.setAttribute(this._state, "false")
        }, u.selectOption = function (t) {
            a(this._navItems[this.selectedNavitemIndex]), l.selectOption.call(this, t), r(this._navItems[this.focusedNavItemIndex])
        }, e.exports = c
    }, {1: 1, 12: 12, 17: 17, 20: 20, 8: 8, 9: 9}],
    5: [function (t, e, i) {
        "use strict";

        function s() {
            this._createElemnts(), this._bindEvents()
        }

        var n = s.prototype;
        n._bindEvents = function () {
            this._onResize = this._resize.bind(this)
        }, n._createElemnts = function () {
            this.span = document.createElement("span");
            var t = this.span.style;
            t.visibility = "hidden", t.position = "absolute", t.top = "0", t.bottom = "0", t.zIndex = "-1", this.span.innerHTML = "&nbsp;", this.iframe = document.createElement("iframe");
            var e = this.iframe.style;
            e.position = "absolute", e.top = "0", e.left = "0", e.width = "100%", e.height = "100%", this.span.appendChild(this.iframe), document.body.appendChild(this.span)
        }, n.detect = function (t) {
            this.originalSize = t || 17, this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]), this.currentSize > this.originalSize && this._onResize(), this.isDetecting || (this.iframe.contentWindow.addEventListener("resize", this._onResize), this.isDetecting = !0)
        }, n._resize = function (t) {
            this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]), this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"), window.dispatchEvent(new Event("resize")), window.dispatchEvent(new CustomEvent("resize:text-zoom", {detail: this}))
        }, n.getScale = function () {
            return this.currentSize / this.originalSize
        }, n.remove = function () {
            this.isDetecting && (this.iframe.contentWindow.removeEventListener("resize", this._onResize), this.isDetecting = !1)
        }, n.destroy = function () {
            this.remove(), this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span), this.span = null, this.iframe = null
        }, e.exports = new s
    }, {}],
    6: [function (t, e, i) {
        "use strict";
        e.exports = {
            keyMap: t(19),
            ariaMap: t(17),
            roleMap: t(20),
            focusableElement: t(18),
            disableTabbable: t(8),
            enableTabbable: t(9),
            hideSiblingElements: t(11),
            showSiblingElements: t(16),
            hide: t(10),
            show: t(15),
            setAttributeForElements: t(14),
            removeAttributes: t(13),
            EventProxy: t(3),
            TabManager: t(7),
            ArrowNavigation: t(1),
            RoamingTabIndex: t(4),
            CircularTab: t(2),
            TextZoom: t(5)
        }
    }, {
        1: 1,
        10: 10,
        11: 11,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        19: 19,
        2: 2,
        20: 20,
        3: 3,
        4: 4,
        5: 5,
        7: 7,
        8: 8,
        9: 9
    }],
    7: [function (t, e, i) {
        "use strict";
        var s = t(18), n = function () {
            this.focusableSelectors = s.selectors
        }, r = n.prototype;
        r.isFocusableElement = function (t, e, i) {
            return !(e && !this._isDisplayed(t)) && (s.nodeName[t.nodeName] ? !t.disabled : !t.contentEditable || (i = i || parseFloat(t.getAttribute("tabindex")), !isNaN(i)))
        }, r.isTabbableElement = function (t, e) {
            if (e && !this._isDisplayed(t)) return !1;
            var i = t.getAttribute("tabindex");
            return i = parseFloat(i), isNaN(i) ? this.isFocusableElement(t, e, i) : i >= 0
        }, r._isDisplayed = function (t) {
            var e = t.getBoundingClientRect();
            return (0 !== e.top || 0 !== e.left || 0 !== e.width || 0 !== e.height) && "hidden" !== window.getComputedStyle(t).visibility
        }, r.getTabbableElements = function (t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++) this.isTabbableElement(i[r], e) && n.push(i[r]);
            return n
        }, r.getFocusableElements = function (t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++) this.isFocusableElement(i[r], e) && n.push(i[r]);
            return n
        }, e.exports = new n
    }, {18: 18}],
    8: [function (t, e, i) {
        "use strict";
        e.exports = function (t) {
            t.setAttribute("tabindex", "-1")
        }
    }, {}],
    9: [function (t, e, i) {
        "use strict";
        var s = t(7);
        let n = t => {
            s.isTabbableElement(t) || t.setAttribute("tabindex", "0")
        };
        e.exports = function (t) {
            t instanceof Node ? n(t) : t.forEach(t => {
                n(t)
            })
        }
    }, {7: 7}],
    10: [function (t, e, i) {
        "use strict";
        var s = t(17), n = t(7), r = function (t, e) {
            var i = t.getAttribute("data-original-" + e);
            i || (i = t.getAttribute(e) || "", t.setAttribute("data-original-" + e, i))
        };
        e.exports = function (t, e) {
            if (n.isFocusableElement(t, e)) r(t, "tabindex"), t.setAttribute("tabindex", "-1"); else for (var i = n.getTabbableElements(t, e), a = i.length; a--;) r(i[a], "tabindex"), i[a].setAttribute("tabindex", "-1");
            r(t, s.HIDDEN), t.setAttribute(s.HIDDEN, "true")
        }
    }, {17: 17, 7: 7}],
    11: [function (t, e, i) {
        "use strict";
        var s = t(10);
        e.exports = function t(e, i, n) {
            i = i || document.body;
            for (var r = e, a = e; r = r.previousElementSibling;) s(r, n);
            for (; a = a.nextElementSibling;) s(a, n);
            e.parentElement && e.parentElement !== i && t(e.parentElement, i, n)
        }
    }, {10: 10}],
    12: [function (t, e, i) {
        "use strict";
        e.exports = function (t) {
            return "string" == typeof t ? "true" === (t = t.toLowerCase()) : t
        }
    }, {}],
    13: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
            let i;
            i = t instanceof NodeList ? t : [].concat(t), e = Array.isArray(e) ? e : [].concat(e), i.forEach(t => {
                e.forEach(e => {
                    t.removeAttribute(e)
                })
            })
        }
    }, {}],
    14: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
            let s;
            "string" != typeof i && (i = i.toString()), s = t instanceof NodeList ? t : [].concat(t), s.forEach(t => {
                t.setAttribute(e, i)
            })
        }
    }, {}],
    15: [function (t, e, i) {
        "use strict";
        var s = t(13), n = t(17), r = "data-original-", a = function (t, e) {
            var i = t.getAttribute(r + e);
            null !== i && ("" === i ? s(t, e) : t.setAttribute(e, i), s(t, r + e))
        };
        e.exports = function (t) {
            a(t, "tabindex"), a(t, n.HIDDEN);
            for (var e = t.querySelectorAll("[".concat(r + "tabindex", "]")), i = e.length; i--;) a(e[i], "tabindex")
        }
    }, {13: 13, 17: 17}],
    16: [function (t, e, i) {
        "use strict";
        var s = t(15);
        e.exports = function t(e, i) {
            i = i || document.body;
            for (var n = e, r = e; n = n.previousElementSibling;) s(n);
            for (; r = r.nextElementSibling;) s(r);
            e.parentElement && e.parentElement !== i && t(e.parentElement, i)
        }
    }, {15: 15}],
    17: [function (t, e, i) {
        "use strict";
        e.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }, {}],
    18: [function (t, e, i) {
        "use strict";
        e.exports = {
            selectors: ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "[tabindex]", "[contenteditable]"].join(","),
            nodeName: {
                INPUT: "input",
                SELECT: "select",
                TEXTAREA: "textarea",
                BUTTON: "button",
                OPTGROUP: "optgroup",
                OPTION: "option",
                MENUITEM: "menuitem",
                FIELDSET: "fieldset",
                OBJECT: "object",
                A: "a"
            }
        }
    }, {}],
    19: [function (t, e, i) {
        "use strict";
        e.exports = t(26)
    }, {26: 26}],
    20: [function (t, e, i) {
        "use strict";
        e.exports = {
            ALERT: "alert",
            ALERTDIALOG: "alertdialog",
            BUTTON: "button",
            CHECKBOX: "checkbox",
            DIALOG: "dialog",
            GRIDCELL: "gridcell",
            LINK: "link",
            LOG: "log",
            MARQUEE: "marquee",
            MENUITEM: "menuitem",
            MENUITEMCHECKBOX: "menuitemcheckbox",
            MENUITEMRADIO: "menuitemradio",
            OPTION: "option",
            PROGRESSBAR: "progressbar",
            RADIO: "radio",
            SCROLLBAR: "scrollbar",
            SLIDER: "slider",
            SPINBUTTON: "spinbutton",
            STATUS: "status",
            SWITCH: "switch",
            TAB: "tab",
            TABPANEL: "tabpanel",
            TEXTBOX: "textbox",
            TIMER: "timer",
            TOOLTIP: "tooltip",
            TREEITEM: "treeitem",
            COMBOBOX: "combobox",
            GRID: "grid",
            LISTBOX: "listbox",
            MENU: "menu",
            MENUBAR: "menubar",
            RADIOGROUP: "radiogroup",
            TABLIST: "tablist",
            TREE: "tree",
            TREEGRID: "treegrid",
            ARTICLE: "article",
            COLUMNHEADER: "columnheader",
            DEFINITION: "definition",
            DIRECTORY: "directory",
            DOCUMENT: "document",
            GROUP: "group",
            HEADING: "heading",
            IMG: "img",
            LIST: "list",
            LISTITEM: "listitem",
            MATH: "math",
            NOTE: "note",
            PRESENTATION: "presentation",
            REGION: "region",
            ROW: "row",
            ROWGROUP: "rowgroup",
            ROWHEADER: "rowheader",
            SEPARATOR: "separator",
            TOOLBAR: "toolbar",
            APPLICATION: "application",
            BANNER: "banner",
            COMPLEMENTARY: "complementary",
            CONTENTINFO: "contentinfo",
            FORM: "form",
            MAIN: "main",
            NAVIGATION: "navigation",
            SEARCH: "search"
        }
    }, {}],
    21: [function (t, e, i) {
        "use strict";
        var s = !1, n = window || self;
        try {
            s = !!n.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0")
        } catch (t) {
        }
        e.exports = s
    }, {}],
    22: [function (t, e, i) {
        "use strict";
        var s = t(21);
        e.exports = function (t) {
            return function () {
                if (s && "object" == typeof window.console && "function" == typeof console[t]) return console[t].apply(console, Array.prototype.slice.call(arguments, 0))
            }
        }
    }, {21: 21}],
    23: [function (t, e, i) {
        "use strict";
        e.exports = t(22)("warn")
    }, {22: 22}],
    24: [function (t, e, i) {
        "use strict";
        e.exports = {EventEmitterMicro: t(25)}
    }, {25: 25}],
    25: [function (t, e, i) {
        "use strict";

        function s() {
            this._events = {}
        }

        var n = s.prototype;
        n.on = function (t, e) {
            this._events[t] = this._events[t] || [], this._events[t].unshift(e)
        }, n.once = function (t, e) {
            var i = this;
            this.on(t, (function s(n) {
                i.off(t, s), void 0 !== n ? e(n) : e()
            }))
        }, n.off = function (t, e) {
            if (this.has(t)) {
                if (1 === arguments.length) return this._events[t] = null, void delete this._events[t];
                var i = this._events[t].indexOf(e);
                -1 !== i && this._events[t].splice(i, 1)
            }
        }, n.trigger = function (t, e) {
            if (this.has(t)) for (var i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }, n.has = function (t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }, n.destroy = function () {
            for (var t in this._events) this._events[t] = null;
            this._events = null
        }, e.exports = s
    }, {}],
    26: [function (t, e, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }, {}],
    27: [function (t, e, i) {
        "use strict";
        e.exports = {majorVersionNumber: "3.x"}
    }, {}],
    28: [function (t, e, i) {
        "use strict";
        var s, n = t(24).EventEmitterMicro, r = t(37), a = t(36);

        function o(t) {
            t = t || {}, n.call(this), this.id = a.getNewID(), this.executor = t.executor || r, this._reset(), this._willRun = !1, this._didDestroy = !1
        }

        (s = o.prototype = Object.create(n.prototype)).run = function () {
            return this._willRun || (this._willRun = !0), this._subscribe()
        }, s.cancel = function () {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
        }, s.destroy = function () {
            var t = this.willRun();
            return this.cancel(), this.executor = null, n.prototype.destroy.call(this), this._didDestroy = !0, t
        }, s.willRun = function () {
            return this._willRun
        }, s.isRunning = function () {
            return this._isRunning
        }, s._subscribe = function () {
            return this.executor.subscribe(this)
        }, s._unsubscribe = function () {
            return this.executor.unsubscribe(this)
        }, s._onAnimationFrameStart = function (t) {
            this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", t))
        }, s._onAnimationFrameEnd = function (t) {
            this._willRun || (this.trigger("stop", t), this._reset())
        }, s._reset = function () {
            this._didEmitFrameData = !1, this._isRunning = !1
        }, e.exports = o
    }, {24: 24, 36: 36, 37: 37}],
    29: [function (t, e, i) {
        "use strict";
        var s, n = t(25);

        function r(t) {
            t = t || {}, this._reset(), this.updatePhases(), this.eventEmitter = new n, this._willRun = !1, this._totalSubscribeCount = -1, this._requestAnimationFrame = window.requestAnimationFrame, this._cancelAnimationFrame = window.cancelAnimationFrame, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }

        (s = r.prototype).frameRequestedPhase = "requested", s.startPhase = "start", s.runPhases = ["update", "external", "draw"], s.endPhase = "end", s.disabledPhase = "disabled", s.beforePhaseEventPrefix = "before:", s.afterPhaseEventPrefix = "after:", s.subscribe = function (t, e) {
            return this._totalSubscribeCount++, this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id), this._nextFrameSubscribers[t.id] = t, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
        }, s.subscribeImmediate = function (t, e) {
            return this._totalSubscribeCount++, this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id), this._subscribers[t.id] = t, this._subscriberArrayLength++, this._subscriberCount++), this._totalSubscribeCount
        }, s.unsubscribe = function (t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
        }, s.getSubscribeID = function () {
            return this._totalSubscribeCount += 1
        }, s.destroy = function () {
            var t = this._cancel();
            return this.eventEmitter.destroy(), this.eventEmitter = null, this.phases = null, this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, t
        }, s.useExternalAnimationFrame = function (t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = t, t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }, s.updatePhases = function () {
            this.phases || (this.phases = []), this.phases.length = 0, this.phases.push(this.frameRequestedPhase), this.phases.push(this.startPhase), Array.prototype.push.apply(this.phases, this.runPhases), this.phases.push(this.endPhase), this._runPhasesLength = this.runPhases.length, this._phasesLength = this.phases.length
        }, s._run = function () {
            if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this.phase === this.disabledPhase && (this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex]), !0
        }, s._cancel = function () {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, t = !0), this._isRunning || this._reset(), t
        }, s._onAnimationFrame = function (t) {
            for (this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex], this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = t - this.lastFrameTime, this.lastFrameTime = t, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = t, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._willRun ? (this.phaseIndex = 0, this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
        }, s._onExternalAnimationFrame = function (t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }, s._reset = function () {
            this._rafData || (this._rafData = {}), this._rafData.time = 0, this._rafData.delta = 0, this._rafData.fps = 0, this._rafData.naturalFps = 0, this._rafData.timeNow = 0, this._subscribers = {}, this._subscribersOrder = [], this._currentSubscriberIndex = -1, this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0, this._runPhaseIndex = -1, this.phaseIndex = -1, this.phase = this.disabledPhase
        }, e.exports = r
    }, {25: 25}],
    30: [function (t, e, i) {
        "use strict";
        var s = t(32), n = function (t) {
            this.phase = t, this.rafEmitter = new s, this._cachePhaseIndex(), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this), this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this), this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this), this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)), this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart), this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase), this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase), this._frameCallbacks = [], this._currentFrameCallbacks = [], this._nextFrameCallbacks = [], this._phaseActive = !1, this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._currentFrameCallbacksLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
        }, r = n.prototype;
        r.requestAnimationFrame = function (t, e) {
            return !0 === e && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0), this._frameCallbacks.push(this._currentFrameID, t), this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1), this._currentFrameCallbacks.push(this._currentFrameID, t), this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, t), this._nextFrameCallbacksLength += 2), this._currentFrameID
        }, r.cancelAnimationFrame = function (t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t), this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
        }, r._onRAFExecuted = function (t) {
            for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
            this._frameCallbacks.length = 0, this._frameCallbackLength = 0
        }, r._onBeforeRAFExecutorStart = function () {
            Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)), this._currentFrameCallbacksLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks.length = 0, this._nextFrameCallbacksLength = 0
        }, r._onBeforeRAFExecutorPhase = function () {
            this._phaseActive = !0, Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)), this._frameCallbackLength = this._currentFrameCallbacksLength, this._currentFrameCallbacks.length = 0, this._currentFrameCallbacksLength = 0
        }, r._onAfterRAFExecutorPhase = function () {
            this._phaseActive = !1
        }, r._cachePhaseIndex = function () {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
        }, r._cancelRunningAnimationFrame = function () {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2), this._frameCallbackLength -= 2
        }, r._cancelCurrentAnimationFrame = function () {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2), this._currentFrameCallbacksLength -= 2
        }, r._cancelNextAnimationFrame = function () {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
        }, e.exports = n
    }, {32: 32}],
    31: [function (t, e, i) {
        "use strict";
        var s = t(30), n = function () {
            this.events = {}
        }, r = n.prototype;
        r.requestAnimationFrame = function (t) {
            return this.events[t] || (this.events[t] = new s(t)), this.events[t].requestAnimationFrame
        }, r.cancelAnimationFrame = function (t) {
            return this.events[t] || (this.events[t] = new s(t)), this.events[t].cancelAnimationFrame
        }, e.exports = new n
    }, {30: 30}],
    32: [function (t, e, i) {
        "use strict";
        var s = t(28), n = function (t) {
            s.call(this, t)
        };
        (n.prototype = Object.create(s.prototype))._subscribe = function () {
            return this.executor.subscribe(this, !0)
        }, e.exports = n
    }, {28: 28}],
    33: [function (t, e, i) {
        "use strict";
        var s = t(31);
        e.exports = s.cancelAnimationFrame("update")
    }, {31: 31}],
    34: [function (t, e, i) {
        "use strict";
        var s = t(31);
        e.exports = s.requestAnimationFrame("draw")
    }, {31: 31}],
    35: [function (t, e, i) {
        "use strict";
        var s = t(31);
        e.exports = s.requestAnimationFrame("external")
    }, {31: 31}],
    36: [function (t, e, i) {
        "use strict";
        var s = t(39).SharedInstance, n = t(27).majorVersionNumber, r = function () {
            this._currentID = 0
        };
        r.prototype.getNewID = function () {
            return this._currentID++, "raf:" + this._currentID
        }, e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, r)
    }, {27: 27, 39: 39}],
    37: [function (t, e, i) {
        "use strict";
        var s = t(39).SharedInstance, n = t(27).majorVersionNumber, r = t(29);
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, r)
    }, {27: 27, 29: 29, 39: 39}],
    38: [function (t, e, i) {
        "use strict";
        var s = t(31);
        e.exports = s.requestAnimationFrame("update")
    }, {31: 31}],
    39: [function (t, e, i) {
        "use strict";
        e.exports = {SharedInstance: t(40)}
    }, {40: 40}],
    40: [function (t, e, i) {
        "use strict";
        var s, n = window, r = n.AC, a = (s = {}, {
            get: function (t, e) {
                var i = null;
                return s[t] && s[t][e] && (i = s[t][e]), i
            }, set: function (t, e, i) {
                return s[t] || (s[t] = {}), s[t][e] = "function" == typeof i ? new i : i, s[t][e]
            }, share: function (t, e, i) {
                var s = this.get(t, e);
                return s || (s = this.set(t, e, i)), s
            }, remove: function (t, e) {
                var i = typeof e;
                if ("string" !== i && "number" !== i) s[t] && (s[t] = null); else {
                    if (!s[t] || !s[t][e]) return;
                    s[t][e] = null
                }
            }
        });
        r || (r = n.AC = {}), r.SharedInstance || (r.SharedInstance = a), e.exports = r.SharedInstance
    }, {}],
    41: [function (t, e, i) {
        "use strict";

        class s {
            constructor(t = {}) {
                this.options = t, "loading" === document.readyState ? document.addEventListener("readystatechange", t => {
                    "interactive" === document.readyState && this._init()
                }) : this._init()
            }

            _init() {
                if (this._images = Array.from(document.querySelectorAll("*[".concat(s.DATA_ATTRIBUTE, "]"))), this.AnimSystem = this._findAnim(), null === this.AnimSystem) return null;
                this._addKeyframesToImages()
            }

            _defineKeyframeOptions(t = null) {
                const e = t.getAttribute(s.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
                return Object.assign({}, {start: "t - 200vh", end: "b + 100vh", event: "AnimLazyImage"}, JSON.parse(e))
            }

            _addKeyframesToImages() {
                this._scrollGroup = this.AnimSystem.getGroupForTarget(document.body), this._images.forEach(t => {
                    this.AnimSystem.getGroupForTarget(t) && (this._scrollGroup = this.AnimSystem.getGroupForTarget(t));
                    let e = this._defineKeyframeOptions(t);
                    this._scrollGroup.addKeyframe(t, e).controller.once("AnimLazyImage:enter", () => {
                        this._imageIsInLoadRange(t)
                    })
                })
            }

            _cleanUpImageAttributes(t) {
                let e = !1;
                try {
                    e = this._scrollGroup.getControllerForTarget(t).getNearestKeyframeForAttribute("AnimLazyImage").isCurrentlyInRange
                } catch (t) {
                    e = !1
                }
                e || t.setAttribute(s.DATA_ATTRIBUTE, "")
            }

            _downloadingImageAttributes(t) {
                t.removeAttribute(s.DATA_ATTRIBUTE)
            }

            _imageIsInLoadRange(t) {
                this._downloadImage(t)
            }

            _downloadImage(t) {
                this._downloadingImageAttributes(t)
            }

            _findAnim() {
                var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return t.map(t => t._animInfo ? t._animInfo.group : null).filter(t => null !== t), t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("AnimLazyImage: AnimSystem not found, please initialize anim before instantiating"), null)
            }
        }

        s.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe", s.DATA_ATTRIBUTE = "data-anim-lazy-image", e.exports = s
    }, {}],
    42: [function (t, e, i) {
        "use strict";
        e.exports = {version: "3.3.5", major: "3.x", majorMinor: "3.3"}
    }, {}],
    43: [function (t, e, i) {
        "use strict";
        const s = t(24).EventEmitterMicro, n = t(50), r = t(45), a = t(46), o = t(48), h = t(65), l = t(66), c = t(67),
            u = t(42), d = {};
        "undefined" != typeof window && (d.update = t(38), d.cancelUpdate = t(33), d.external = t(35), d.draw = t(34));
        let m = null;

        class p extends s {
            constructor() {
                if (super(), m) throw"You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                m = this, this.groups = [], this.scrollSystems = [], this.timeSystems = [], this.tweenGroup = null, this._forceUpdateRAFId = -1, this.initialized = !1, this.model = n, this.version = u.version, this._resolveReady = () => {
                }, this.ready = new Promise(t => this._resolveReady = t), this.onScroll = this.onScroll.bind(this), this.onResizedDebounced = this.onResizedDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this)
            }

            initialize() {
                return this.initialized || "undefined" == typeof window || (this.initialized = !0, this.timeSystems = [], this.scrollSystems = [], this.groups = [], this.setupEvents(), this.initializeResizeFilter(), this.initializeModel(), this.createDOMGroups(), this.createDOMKeyframes(), this.tweenGroup = new c(null, this), this.groups.push(this.tweenGroup), this._resolveReady()), this.ready
            }

            remove() {
                return this.initialized ? Promise.all(this.groups.map(t => t.remove())).then(() => {
                    this.groups = null, this.scrollSystems = null, this.timeSystems = null, window.clearTimeout(n.RESIZE_TIMEOUT), window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate), this._events = {}, this.initialized = !1, this.ready = new Promise(t => this._resolveReady = t)
                }) : (this.ready = new Promise(t => this._resolveReady = t), Promise.resolve())
            }

            destroy() {
                return this.remove()
            }

            createTimeGroup(t) {
                let e = new l(t, this);
                return this.groups.push(e), this.timeSystems.push(e), this.trigger(n.EVENTS.ON_GROUP_CREATED, e), e
            }

            createScrollGroup(t) {
                if (!t) throw"AnimSystem scroll based groups must supply an HTMLElement";
                let e = new h(t, this);
                return this.groups.push(e), this.scrollSystems.push(e), this.trigger(n.EVENTS.ON_GROUP_CREATED, e), e
            }

            removeGroup(t) {
                return Promise.all(t.keyframeControllers.map(e => t.removeKeyframeController(e))).then(() => {
                    let e = this.groups.indexOf(t);
                    -1 !== e && this.groups.splice(e, 1), e = this.scrollSystems.indexOf(t), -1 !== e && this.scrollSystems.splice(e, 1), e = this.timeSystems.indexOf(t), -1 !== e && this.timeSystems.splice(e, 1), t.destroy()
                })
            }

            createDOMGroups() {
                document.body.setAttribute("data-anim-scroll-group", "body"), document.querySelectorAll("[data-anim-scroll-group]").forEach(t => this.createScrollGroup(t)), document.querySelectorAll("[data-anim-time-group]").forEach(t => this.createTimeGroup(t)), this.trigger(n.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
            }

            createDOMKeyframes() {
                let t = [];
                ["data-anim-keyframe", r.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE].forEach((function (e) {
                    for (let i = 0; i < 12; i++) t.push(e + (0 === i ? "" : "-" + (i - 1)))
                }));
                for (let e = 0; e < t.length; e++) {
                    let i = t[e], s = document.querySelectorAll("[" + i + "]");
                    for (let t = 0; t < s.length; t++) {
                        const e = s[t], n = JSON.parse(e.getAttribute(i));
                        this.addKeyframe(e, n)
                    }
                }
                d.update(() => {
                    null !== this.groups && (this.groups.forEach(t => t.onKeyframesDirty({silent: !0})), this.groups.forEach(t => t.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)), this.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, this), this.groups.forEach(t => {
                        t.forceUpdate({waitForNextUpdate: !1, silent: !0}), t.reconcile()
                    }), this.onScroll())
                }, !0)
            }

            initializeResizeFilter() {
                if (n.cssDimensionsTracker) return;
                const t = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
                t.setAttribute("cssDimensionsTracker", "true"), t.style.position = "fixed", t.style.top = "0", t.style.width = "100%", t.style.height = "100vh", t.style.pointerEvents = "none", t.style.visibility = "hidden", t.style.zIndex = "-1", document.documentElement.appendChild(t), n.cssDimensionsTracker = t
            }

            initializeModel() {
                n.pageMetrics.windowHeight = n.cssDimensionsTracker.clientHeight, n.pageMetrics.windowWidth = n.cssDimensionsTracker.clientWidth, n.pageMetrics.scrollY = window.scrollY || window.pageYOffset, n.pageMetrics.scrollX = window.scrollX || window.pageXOffset, n.pageMetrics.breakpoint = n.getBreakpoint();
                let t = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = t.left + n.pageMetrics.scrollX, n.pageMetrics.documentOffsetY = t.top + n.pageMetrics.scrollY
            }

            setupEvents() {
                window.removeEventListener("scroll", this.onScroll), window.addEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate), window.addEventListener("resize", this.onResizeImmediate)
            }

            onScroll() {
                n.pageMetrics.scrollY = window.scrollY || window.pageYOffset, n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                for (let t = 0, e = this.scrollSystems.length; t < e; t++) this.scrollSystems[t].updateTimeline();
                this.trigger(n.PageEvents.ON_SCROLL, n.pageMetrics)
            }

            onResizeImmediate() {
                let t = n.cssDimensionsTracker.clientWidth, e = n.cssDimensionsTracker.clientHeight;
                if (t === n.pageMetrics.windowWidth && e === n.pageMetrics.windowHeight) return;
                n.pageMetrics.windowWidth = t, n.pageMetrics.windowHeight = e, n.pageMetrics.scrollY = window.scrollY || window.pageYOffset, n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                let i = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = i.left + n.pageMetrics.scrollX, n.pageMetrics.documentOffsetY = i.top + n.pageMetrics.scrollY, window.clearTimeout(n.RESIZE_TIMEOUT), n.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250), this.trigger(n.PageEvents.ON_RESIZE_IMMEDIATE, n.pageMetrics)
            }

            onResizedDebounced() {
                d.update(() => {
                    let t = n.pageMetrics.breakpoint, e = n.getBreakpoint();
                    if (e !== t) {
                        n.pageMetrics.previousBreakpoint = t, n.pageMetrics.breakpoint = e;
                        for (let t = 0, e = this.groups.length; t < e; t++) this.groups[t]._onBreakpointChange();
                        this.trigger(n.PageEvents.ON_BREAKPOINT_CHANGE, n.pageMetrics)
                    }
                    for (let t = 0, e = this.groups.length; t < e; t++) this.groups[t].forceUpdate({waitForNextUpdate: !1});
                    this.trigger(n.PageEvents.ON_RESIZE_DEBOUNCED, n.pageMetrics)
                }, !0)
            }

            forceUpdate({waitForNextUpdate: t = !0, silent: e = !1} = {}) {
                -1 !== this._forceUpdateRAFId && d.cancelUpdate(this._forceUpdateRAFId);
                let i = () => {
                    for (let t = 0, i = this.groups.length; t < i; t++) {
                        this.groups[t].forceUpdate({waitForNextUpdate: !1, silent: e})
                    }
                    return -1
                };
                this._forceUpdateRAFId = t ? d.update(i, !0) : i()
            }

            addKeyframe(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body), i.addKeyframe(t, e)
            }

            addEvent(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body), i.addEvent(t, e)
            }

            getTimeGroupForTarget(t) {
                return this._getGroupForTarget(t, t => t instanceof l)
            }

            getScrollGroupForTarget(t) {
                return this._getGroupForTarget(t, t => !(t instanceof l))
            }

            getGroupForTarget(t) {
                return this._getGroupForTarget(t, () => !0)
            }

            _getGroupForTarget(t, e) {
                if (t._animInfo && t._animInfo.group && e(t._animInfo.group)) return t._animInfo.group;
                let i = t;
                for (; i;) {
                    if (i._animInfo && i._animInfo.isGroup && e(i._animInfo.group)) return i._animInfo.group;
                    i = i.parentElement
                }
            }

            getControllerForTarget(t) {
                return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
            }

            addTween(t, e) {
                return this.tweenGroup.addKeyframe(t, e)
            }
        }

        e.exports = "undefined" == typeof window ? new p : window.AC.SharedInstance.share("AnimSystem", u.major, p), e.exports.default = e.exports
    }, {24: 24, 33: 33, 34: 34, 35: 35, 38: 38, 42: 42, 45: 45, 46: 46, 48: 48, 50: 50, 65: 65, 66: 66, 67: 67}],
    44: [function (t, e, i) {
        "use strict";
        const s = t(50);

        class n {
            constructor(t, e) {
                this._index = 0, this.keyframe = t, e && (this.name = e)
            }

            get start() {
                return this.keyframe.jsonProps.start
            }

            set index(t) {
                this._index = t
            }

            get index() {
                return this._index
            }
        }

        e.exports = class {
            constructor(t) {
                this.timeGroup = t, this.chapters = [], this.chapterNames = {}, this.currentChapter = null, this.clip = null
            }

            addChapter(t) {
                const {position: e, name: i} = t;
                if (void 0 === e) throw ReferenceError("Cannot add chapter without target position.");
                t._impIsFirst || 0 !== this.chapters.length || this.addChapter({position: 0, _impIsFirst: !0});
                let s = this.timeGroup.addKeyframe(this, {start: e, end: e, event: "Chapter"});
                this.timeGroup.forceUpdate({waitForNextFrame: !1, silent: !0});
                const r = new n(s, i);
                if (this.chapters.push(r), i) {
                    if (this.chapterNames.hasOwnProperty(i)) throw ReferenceError('Duplicate chapter name assigned - "'.concat(i, '" is already in use'));
                    this.chapterNames[i] = r
                }
                return this.chapters.sort((t, e) => t.start - e.start).forEach((t, e) => t.index = e), this.currentChapter = this.currentChapter || this.chapters[0], r
            }

            playToChapter(t) {
                let e;
                if (t.hasOwnProperty("index")) e = this.chapters[t.index]; else {
                    if (!t.hasOwnProperty("name")) throw ReferenceError("Cannot play to chapter without target index or name");
                    e = this.chapterNames[t.name]
                }
                if (!e || this.currentChapter === e && !0 !== t.force) return;
                let i = t.ease || "easeInOutCubic";
                this.clip && (this.clip.destroy(), i = "easeOutQuint"), this.timeGroup.timeScale(t.timeScale || 1);
                const n = void 0 !== t.duration ? t.duration : this.getDurationToChapter(e), r = this.timeGroup.time(),
                    a = e.start;
                let o = !1;
                this.tween = this.timeGroup.anim.addTween({time: r}, {
                    easeFunction: i,
                    duration: n,
                    time: [r, a],
                    onStart: () => this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, {player: this, next: e}),
                    onDraw: t => {
                        let i = t.tweenProps.time.current;
                        this.timeGroup.time(i), t.keyframe.curvedT > .5 && !o && (o = !0, this.currentIndex = e.index, this.currentChapter = e, this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, {
                            player: this,
                            current: e
                        }))
                    },
                    onComplete: () => {
                        this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, {
                            player: this,
                            current: e
                        }), this.timeGroup.paused(!0), this.clip = null
                    }
                })
            }

            getDurationToChapter(t) {
                const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
                return Math.abs(e.start - t.start)
            }
        }
    }, {50: 50}],
    45: [function (t, e, i) {
        "use strict";
        const s = t(50), n = t(58), r = t(75), a = t(52), o = t(61), h = t(57), l = t(68), c = t(69), u = t(60);

        class d {
            constructor(t, e) {
                this.controller = t, this.anchors = [], this.jsonProps = e, this.ease = t.group.defaultEase, this.easeFunction = a.linear, this.start = 0, this.end = 0, this.localT = 0, this.curvedT = 0, this.id = 0, this.event = "", this.needsEventDispatch = !1, this.snapAtCreation = !1, this.isEnabled = !1, this.animValues = {}, this.breakpointMask = "SMLX", this.disabledWhen = [], this.keyframeType = s.KeyframeTypes.Interpolation, this.hold = !1, this.preserveState = !1, this.markedForRemoval = !1;
                let i = !1;
                Object.defineProperty(this, "hidden", {
                    get: () => i, set(e) {
                        i = e, t.group.keyframesDirty = !0
                    }
                }), this.uuid = u(), this.destroyed = !1
            }

            destroy() {
                this.destroyed = !0, this.controller = null, this.disabledWhen = null, this.anchors = null, this.jsonProps = null, this.easeFunction = null, this.animValues = null
            }

            remove() {
                return this.controller.removeKeyframe(this)
            }

            parseOptions(t) {
                this.jsonProps = t, t.relativeTo && console.error("KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"".concat(t.relativeTo, '"')), void 0 === t.end && void 0 === t.duration && (t.end = t.start), "" !== t.anchors && t.anchors ? (this.anchors = [], t.anchors = Array.isArray(t.anchors) ? t.anchors : [t.anchors], t.anchors.forEach((e, i) => {
                    let s = c(e, this.controller.group.element);
                    if (!s) {
                        let s = "";
                        return "string" == typeof e && (s = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."), void console.warn("Keyframe on", this.controller.element, " failed to find anchor at index ".concat(i, " in array"), t.anchors, ". Anchors must be JS Object references, Elements references, or valid query selector strings. ".concat(s))
                    }
                    this.anchors.push(s), this.controller.group.metrics.add(s)
                })) : (this.anchors = [], t.anchors = []), t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease, t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation, t.easeFunction || (t.easeFunction = s.KeyframeDefaults.easeFunctionString), t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask, t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen, t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold, t.hasOwnProperty("preserveState") ? this.preserveState = t.preserveState : t.preserveState = s.KeyframeDefaults.preserveState, this.easeFunction = a[t.easeFunction], a.hasOwnProperty(t.easeFunction) || (t.easeFunction.includes("bezier") ? this.easeFunction = o.fromCSSString(t.easeFunction) : t.easeFunction.includes("spring") ? this.easeFunction = h.fromCSSString(t.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + t.easeFunction + "'"));
                for (let e in t) {
                    if (-1 !== s.KeyframeJSONReservedWords.indexOf(e)) continue;
                    let i = t[e];
                    if (!Array.isArray(i)) continue;
                    if (1 === i.length && (i[0] = null, i[1] = i[0]), this.animValues[e] = this.controller.group.expressionParser.parseArray(this, i), void 0 === this.controller.tweenProps[e] || !this.controller._ownerIsElement) {
                        let t = 0;
                        this.controller._ownerIsElement || (t = this.controller.element[e] || 0);
                        let i = new n(t, s.KeyframeDefaults.epsilon, this.snapAtCreation);
                        this.controller.tweenProps[e] = i
                    }
                    let r = this.controller.tweenProps[e];
                    if (t.epsilon) r.epsilon = t.epsilon; else {
                        let t = Math.abs(this.animValues[e][0] - this.animValues[e][1]),
                            i = Math.min(.001 * t, r.epsilon, s.KeyframeDefaults.epsilon);
                        r.epsilon = Math.max(i, 1e-4)
                    }
                }
                this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation, t.event && (this.event = t.event)
            }

            overwriteProps(t) {
                this.animValues = {};
                let e = Object.assign({}, this.jsonProps, t);
                this.controller.updateKeyframe(this, e)
            }

            updateLocalProgress(t) {
                if (this.start === this.end || t < this.start || t > this.end) return this.localT = t < this.start ? this.hold ? this.localT : 0 : t > this.end ? 1 : 0, void (this.curvedT = this.easeFunction(this.localT));
                const e = (t - this.start) / (this.end - this.start), i = this.hold ? this.localT : 0;
                this.localT = r.clamp(e, i, 1), this.curvedT = this.easeFunction(this.localT)
            }

            reconcile(t) {
                let e = this.animValues[t], i = this.controller.tweenProps[t];
                i.initialValue = e[0], i.target = e[0] + this.curvedT * (e[1] - e[0]), i.current !== i.target && (i.current = i.target, this.needsEventDispatch || (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this)))
            }

            reset(t) {
                this.localT = t || 0;
                var e = this.ease;
                this.ease = 1;
                for (let t in this.animValues) this.reconcile(t);
                this.ease = e
            }

            onDOMRead(t) {
                let e = this.animValues[t], i = this.controller.tweenProps[t];
                i.target = e[0] + this.curvedT * (e[1] - e[0]);
                let s = i.current;
                i.current += (i.target - i.current) * this.ease;
                let n = i.current - i.target;
                n < i.epsilon && n > -i.epsilon && (i.current = i.target, n = 0), "" === this.event || this.needsEventDispatch || (n > i.epsilon || n < -i.epsilon || 0 === n && s !== i.current) && (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this))
            }

            isInRange(t) {
                return t >= this.start && t <= this.end
            }

            setEnabled(t) {
                t = t || l(Array.from(document.documentElement.classList));
                let e = -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint), i = !1;
                return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(e => void 0 !== t[e])), this.isEnabled = e && !i, this.isEnabled
            }

            evaluateConstraints() {
                this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start), this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end), this.evaluateInterpolationConstraints()
            }

            evaluateInterpolationConstraints() {
                for (let t in this.animValues) {
                    let e = this.jsonProps[t];
                    this.animValues[t] = this.controller.group.expressionParser.parseArray(this, e)
                }
            }
        }

        d.DATA_ATTRIBUTE = "data-anim-tween", e.exports = d
    }, {50: 50, 52: 52, 57: 57, 58: 58, 60: 60, 61: 61, 68: 68, 69: 69, 75: 75}],
    46: [function (t, e, i) {
        "use strict";
        const s = t(45), n = t(50), r = t(58);

        class a extends s {
            constructor(t, e) {
                super(t, e), this.keyframeType = n.KeyframeTypes.CSSClass, this._triggerType = a.TRIGGER_TYPE_CSS_CLASS, this.cssClass = "", this.friendlyName = "", this.style = {
                    on: null,
                    off: null
                }, this.toggle = !1, this.isApplied = !1
            }

            parseOptions(t) {
                if (!this.controller._ownerIsElement) throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                if (t.x = void 0, t.y = void 0, t.z = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotationX = void 0, t.rotationY = void 0, t.rotationZ = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, void 0 !== t.toggle && (this.toggle = t.toggle), void 0 !== t.cssClass) this._triggerType = a.TRIGGER_TYPE_CSS_CLASS, this.cssClass = t.cssClass, this.friendlyName = "." + this.cssClass, void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                    add: [],
                    remove: []
                }); else {
                    if (void 0 === t.style || !this.isValidStyleProperty(t.style)) throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                    if (this._triggerType = a.TRIGGER_TYPE_STYLE_PROPERTY, this.style = t.style, this.friendlyName = "style", this.toggle = void 0 !== this.style.off || this.toggle, this.toggle && void 0 === this.style.off) {
                        this.style.off = {};
                        for (let t in this.style.on) this.style.off[t] = ""
                    }
                    void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                }
                if (void 0 === t.end && (t.end = t.start), t.toggle = this.toggle, this._triggerType === a.TRIGGER_TYPE_CSS_CLASS) this.isApplied = this.controller.element.classList.contains(this.cssClass); else {
                    let t = getComputedStyle(this.controller.element);
                    this.isApplied = !0;
                    for (let e in this.style.on) if (t[e] !== this.style.on[e]) {
                        this.isApplied = !1;
                        break
                    }
                }
                s.prototype.parseOptions.call(this, t), this.animValues[this.friendlyName] = [0, 0], void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new r(0, 1, !1)), this.keyframeType = n.KeyframeTypes.CSSClass
            }

            updateLocalProgress(t) {
                this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
            }

            _apply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.add.push(this.cssClass), this.controller.needsClassUpdate = !0; else {
                    for (let t in this.style.on) this.controller.tweenProps.targetStyles[t] = this.style.on[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !0
            }

            _unapply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.remove.push(this.cssClass), this.controller.needsClassUpdate = !0; else {
                    for (let t in this.style.off) this.controller.tweenProps.targetStyles[t] = this.style.off[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !1
            }

            isValidStyleProperty(t) {
                if (!t.hasOwnProperty("on")) return !1;
                if ("object" != typeof t.on) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                if (this.toggle && t.hasOwnProperty("off") && "object" != typeof t.off) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                return !0
            }

            reconcile(t) {
            }

            onDOMRead(t) {
            }

            evaluateInterpolationConstraints() {
            }
        }

        a.TRIGGER_TYPE_CSS_CLASS = 0, a.TRIGGER_TYPE_STYLE_PROPERTY = 1, a.DATA_ATTRIBUTE = "data-anim-classname", e.exports = a
    }, {45: 45, 50: 50, 58: 58}],
    47: [function (t, e, i) {
        "use strict";
        const s = t(50), n = t(58), r = t(51), a = t(54), o = t(49), h = (t(45), t(46)), l = t(55), c = t(68),
            u = t(60), d = t(24).EventEmitterMicro, m = t(73), p = {};
        "undefined" != typeof window && (p.update = t(38), p.external = t(35), p.draw = t(34));
        const f = Math.PI / 180,
            _ = ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
            g = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"],
            E = ["currentTime", "scrollLeft", "scrollTop"],
            v = {create: t(78), rotateX: t(79), rotateY: t(80), rotateZ: t(81), scale: t(82)};
        e.exports = class extends d {
            constructor(t, e) {
                super(), this._events.draw = [], this.uuid = u(), this.group = t, this.element = e, this._ownerIsElement = this.element instanceof Element, this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid, this.element._animInfo = this.element._animInfo || new o(t, this), this.element._animInfo.controller = this, this.element._animInfo.group = this.group, this.element._animInfo.controllers.push(this), this.tweenProps = this.element._animInfo.tweenProps, this.eventObject = new a(this), this.needsStyleUpdate = !1, this.needsClassUpdate = !1, this.elementMetrics = this.group.metrics.add(this.element), this.attributes = [], this.cssAttributes = [], this.domAttributes = [], this.keyframes = {}, this._allKeyframes = [], this._activeKeyframes = [], this.keyframesRequiringDispatch = [], this.updateCachedValuesFromElement(), this.boundsMin = 0, this.boundsMax = 0, this.mat2d = new Float32Array(6), this.mat4 = v.create(), this.needsWrite = !0, this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
            }

            destroy() {
                if (this.element._animInfo) {
                    this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                    let t = this.element._animInfo.controllers.indexOf(this);
                    if (-1 !== t && this.element._animInfo.controllers.splice(t, 1), 0 === this.element._animInfo.controllers.length) this.element._animInfo = null; else {
                        let t = this.element._animInfo.controllers.find(t => t.group !== t.group.anim.tweenGroup);
                        t && (this.element._animInfo.controller = t, this.element._animInfo.group = t.group)
                    }
                }
                this.eventObject.controller = null, this.eventObject.element = null, this.eventObject.keyframe = null, this.eventObject.tweenProps = null, this.eventObject = null, this.elementMetrics = null, this.group = null, this.keyframesRequiringDispatch = null;
                for (let t = 0; t < this._allKeyframes.length; t++) this._allKeyframes[t].destroy();
                this._allKeyframes = null, this._activeKeyframes = null, this.attributes = null, this.keyframes = null, this.element = null, this.tweenProps = null, this.destroyed = !0, super.destroy()
            }

            remove() {
                return this.group.removeKeyframeController(this)
            }

            updateCachedValuesFromElement() {
                if (!this._ownerIsElement) return;
                const t = getComputedStyle(this.element);
                let e = new DOMMatrix(t.getPropertyValue("transform")), i = m(e), a = s.KeyframeDefaults.epsilon;
                ["x", "y", "z"].forEach((t, e) => {
                    this.tweenProps[t] = new n(i.translation[e], a, !1)
                }), this.tweenProps.rotation = new n(i.rotation[2], a, !1), ["rotationX", "rotationY", "rotationZ"].forEach((t, e) => {
                    this.tweenProps[t] = new n(i.rotation[e], a, !1)
                }), this.tweenProps.scale = new n(i.scale[0], a, !1), ["scaleX", "scaleY", "scaleZ"].forEach((t, e) => {
                    this.tweenProps[t] = new n(i.scale[e], a, !1)
                }), g.forEach(e => {
                    let i = ["zIndex"].includes(e), s = ["opacity", "zIndex", "fontWeight"].includes(e) ? void 0 : "px",
                        n = parseFloat(t[e]);
                    isNaN(n) && (n = 0), this.tweenProps[e] = new r(n, a, !1, e, i, s)
                }), E.forEach(t => {
                    let e = isNaN(this.element[t]) ? 0 : this.element[t];
                    this.tweenProps[t] = new r(e, a, !1, t, !1)
                })
            }

            addKeyframe(t) {
                let e = l(t);
                if (!e) throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
                let i = new e(this, t);
                return i.parseOptions(t), i.id = this._allKeyframes.length, this._allKeyframes.push(i), i
            }

            needsUpdate() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t], i = this.tweenProps[e];
                    if (Math.abs(i.current - i.target) > i.epsilon) return !0
                }
                return !1
            }

            updateLocalProgress(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e], s = this.keyframes[this.attributes[e]];
                    if (1 === s.length) {
                        s[0].updateLocalProgress(t);
                        continue
                    }
                    let n = this.getNearestKeyframeForAttribute(i, t);
                    n && n.updateLocalProgress(t)
                }
            }

            reconcile() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t], i = this.getNearestKeyframeForAttribute(e, this.group.position.local);
                    i.updateLocalProgress(this.group.position.local), i.snapAtCreation && i.reconcile(e)
                }
            }

            determineActiveKeyframes(t) {
                t = t || c(Array.from(document.documentElement.classList));
                let e = this._activeKeyframes, i = this.attributes, s = {};
                this._activeKeyframes = [], this.attributes = [], this.keyframes = {};
                for (let e = 0; e < this._allKeyframes.length; e++) {
                    let i = this._allKeyframes[e];
                    if (i.markedForRemoval || i.hidden || !i.setEnabled(t)) for (let t in i.animValues) this.tweenProps[t].isActive = i.preserveState, i.preserveState && (s[t] = !0); else {
                        this._activeKeyframes.push(i);
                        for (let t in i.animValues) this.keyframes[t] = this.keyframes[t] || [], this.keyframes[t].push(i), -1 === this.attributes.indexOf(t) && (s[t] = !0, this.attributes.push(t), this.tweenProps[t].isActive = !0)
                    }
                }
                this.attributes.forEach(t => this.tweenProps[t].isActive = !0), this.cssAttributes = g.filter(t => this.attributes.includes(t)).map(t => this.tweenProps[t]), this.domAttributes = E.filter(t => this.attributes.includes(t)).map(t => this.tweenProps[t]);
                let n = e.filter(t => -1 === this._activeKeyframes.indexOf(t));
                if (0 === n.length) return;
                let r = i.filter(t => -1 === this.attributes.indexOf(t) && !s.hasOwnProperty(t));
                if (0 !== r.length) if (this.needsWrite = !0, this._ownerIsElement) p.external(() => {
                    let t = r.some(t => _.includes(t)), e = t && Object.keys(s).some(t => _.includes(t));
                    t && !e && this.element.style.removeProperty("transform");
                    for (let t = 0, e = r.length; t < e; ++t) {
                        let e = r[t], i = this.tweenProps[e], s = i.isActive ? i.target : i.initialValue;
                        i.current = i.target = s, !i.isActive && g.includes(e) && (this.element.style[e] = null)
                    }
                    for (let t = 0, e = n.length; t < e; ++t) {
                        let e = n[t];
                        e instanceof h && !e.preserveState && e._unapply()
                    }
                }, !0); else for (let t = 0, e = r.length; t < e; ++t) {
                    let e = this.tweenProps[r[t]];
                    e.current = e.target, e.isActive = !1
                }
            }

            onDOMRead(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e];
                    this.tweenProps[i].previousValue = this.tweenProps[i].current;
                    let s = this.getNearestKeyframeForAttribute(i, t);
                    s && s.onDOMRead(i), this.tweenProps[i].previousValue !== this.tweenProps[i].current && (this.needsWrite = !0)
                }
            }

            onDOMWrite() {
                (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1, this.onDOMWriteImp(), this.handleEventDispatch())
            }

            onDOMWriteForObject() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t];
                    this.element[e] = this.tweenProps[e].current
                }
            }

            onDOMWriteForElement() {
                let t = this.element.style;
                this.handleStyleTransform();
                for (let e = 0, i = this.cssAttributes.length; e < i; e++) this.cssAttributes[e].set(t);
                for (let t = 0, e = this.domAttributes.length; t < e; t++) this.domAttributes[t].set(this.element);
                if (this.needsStyleUpdate) {
                    for (let t in this.tweenProps.targetStyles) null !== this.tweenProps.targetStyles[t] && (this.element.style[t] = this.tweenProps.targetStyles[t]), this.tweenProps.targetStyles[t] = null;
                    this.needsStyleUpdate = !1
                }
                this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add), this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove), this.tweenProps.targetClasses.add.length = 0, this.tweenProps.targetClasses.remove.length = 0, this.needsClassUpdate = !1)
            }

            handleStyleTransform() {
                let t = this.tweenProps, e = this.element.style;
                if (t.z.isActive || t.rotationX.isActive || t.rotationY.isActive) {
                    const i = this.mat4;
                    i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = 1, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = 1, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1;
                    const s = t.x.current, n = t.y.current, r = t.z.current;
                    if (i[12] = i[0] * s + i[4] * n + i[8] * r + i[12], i[13] = i[1] * s + i[5] * n + i[9] * r + i[13], i[14] = i[2] * s + i[6] * n + i[10] * r + i[14], i[15] = i[3] * s + i[7] * n + i[11] * r + i[15], 0 !== t.rotation.current || 0 !== t.rotationZ.current) {
                        const e = (t.rotation.current || t.rotationZ.current) * f;
                        v.rotateZ(i, i, e)
                    }
                    if (0 !== t.rotationX.current) {
                        const e = t.rotationX.current * f;
                        v.rotateX(i, i, e)
                    }
                    if (0 !== t.rotationY.current) {
                        const e = t.rotationY.current * f;
                        v.rotateY(i, i, e)
                    }
                    1 === t.scale.current && 1 === t.scaleX.current && 1 === t.scaleY.current || v.scale(i, i, [t.scale.current, t.scale.current, 1]), e.transform = "matrix3d(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + "," + i[6] + "," + i[7] + "," + i[8] + "," + i[9] + "," + i[10] + "," + i[11] + "," + i[12] + "," + i[13] + "," + i[14] + "," + i[15] + ")"
                } else if (t.x.isActive || t.y.isActive || t.rotation.isActive || t.rotationZ.isActive || t.scale.isActive || t.scaleX.isActive || t.scaleY.isActive) {
                    const i = this.mat2d;
                    i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 1, i[4] = 0, i[5] = 0;
                    const s = t.x.current, n = t.y.current, r = i[0], a = i[1], o = i[2], h = i[3], l = i[4], c = i[5];
                    if (i[0] = r, i[1] = a, i[2] = o, i[3] = h, i[4] = r * s + o * n + l, i[5] = a * s + h * n + c, 0 !== t.rotation.current || 0 !== t.rotationZ.current) {
                        const e = (t.rotation.current || t.rotationZ.current) * f, s = i[0], n = i[1], r = i[2],
                            a = i[3], o = i[4], h = i[5], l = Math.sin(e), c = Math.cos(e);
                        i[0] = s * c + r * l, i[1] = n * c + a * l, i[2] = s * -l + r * c, i[3] = n * -l + a * c, i[4] = o, i[5] = h
                    }
                    t.scaleX.isActive || t.scaleY.isActive ? (i[0] = i[0] * t.scaleX.current, i[1] = i[1] * t.scaleX.current, i[2] = i[2] * t.scaleY.current, i[3] = i[3] * t.scaleY.current) : (i[0] = i[0] * t.scale.current, i[1] = i[1] * t.scale.current, i[2] = i[2] * t.scale.current, i[3] = i[3] * t.scale.current), e.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")"
                }
            }

            handleEventDispatch() {
                if (0 !== this.keyframesRequiringDispatch.length) {
                    for (let t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                        let e = this.keyframesRequiringDispatch[t];
                        e.needsEventDispatch = !1, this.eventObject.keyframe = e, this.eventObject.pageMetrics = s.pageMetrics, this.eventObject.event = e.event, this.trigger(e.event, this.eventObject)
                    }
                    this.keyframesRequiringDispatch.length = 0
                }
                if (0 !== this._events.draw.length) {
                    this.eventObject.keyframe = null, this.eventObject.event = "draw";
                    for (var t = this._events.draw.length - 1; t >= 0; t--) this._events.draw[t](this.eventObject)
                }
            }

            updateAnimationConstraints() {
                for (let t = 0, e = this._activeKeyframes.length; t < e; t++) this._activeKeyframes[t].evaluateConstraints();
                this.attributes.forEach(t => {
                    1 !== this.keyframes[t].length && this.keyframes[t].sort(s.KeyframeComparison)
                }), this.updateDeferredPropertyValues()
            }

            refreshMetrics() {
                let t = new Set([this.element]);
                this._allKeyframes.forEach(e => e.anchors.forEach(e => t.add(e))), this.group.metrics.refreshCollection(t), this.group.keyframesDirty = !0
            }

            updateDeferredPropertyValues() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t], i = this.keyframes[e];
                    if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward)) for (let t = 0, s = i.length; t < s; t++) {
                        let n = i[t];
                        null === n.jsonProps[e][0] && (0 === t ? n.jsonProps[e][0] = n.animValues[e][0] = this.tweenProps[e].current : n.animValues[e][0] = i[t - 1].animValues[e][1]), null === n.jsonProps[e][1] && (n.animValues[e][1] = t === s - 1 ? this.tweenProps[e].current : i[t + 1].animValues[e][0]), n.snapAtCreation && (n.jsonProps[e][0] = n.animValues[e][0], n.jsonProps[e][1] = n.animValues[e][1])
                    }
                }
            }

            getBounds(t) {
                this.boundsMin = Number.MAX_VALUE, this.boundsMax = -Number.MAX_VALUE;
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.keyframes[this.attributes[e]];
                    for (let e = 0; e < i.length; e++) {
                        let s = i[e];
                        this.boundsMin = Math.min(s.start, this.boundsMin), this.boundsMax = Math.max(s.end, this.boundsMax), t.min = Math.min(s.start, t.min), t.max = Math.max(s.end, t.max)
                    }
                }
            }

            getNearestKeyframeForAttribute(t, e) {
                e = void 0 !== e ? e : this.group.position.local;
                let i = null, s = Number.POSITIVE_INFINITY, n = this.keyframes[t];
                if (void 0 === n) return null;
                let r = n.length;
                if (0 === r) return null;
                if (1 === r) return n[0];
                for (let t = 0; t < r; t++) {
                    let r = n[t];
                    if (r.isInRange(e)) {
                        i = r;
                        break
                    }
                    let a = Math.min(Math.abs(e - r.start), Math.abs(e - r.end));
                    a < s && (s = a, i = r)
                }
                return i
            }

            getAllKeyframesForAttribute(t) {
                return this.keyframes[t]
            }

            updateKeyframe(t, e) {
                t.parseOptions(e), t.evaluateConstraints(), this.group.keyframesDirty = !0, p.update(() => {
                    this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t), this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t)
                }, !0)
            }

            removeKeyframe(t) {
                return t.controller !== this ? Promise.resolve(null) : (t.markedForRemoval = !0, this.group.keyframesDirty = !0, new Promise(e => {
                    this.group.rafEmitter.executor.eventEmitter.once("before:draw", () => {
                        e(t), t.destroy();
                        let i = this._allKeyframes.indexOf(t);
                        -1 !== i && this._allKeyframes.splice(i, 1)
                    })
                }))
            }

            updateAnimation(t, e) {
                return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"), this.updateKeyframe(t, e)
            }
        }
    }, {
        24: 24,
        34: 34,
        35: 35,
        38: 38,
        45: 45,
        46: 46,
        49: 49,
        50: 50,
        51: 51,
        54: 54,
        55: 55,
        58: 58,
        60: 60,
        68: 68,
        73: 73,
        78: 78,
        79: 79,
        80: 80,
        81: 81,
        82: 82
    }],
    48: [function (t, e, i) {
        "use strict";
        const s = t(45), n = t(50), r = t(58);

        class a extends s {
            constructor(t, e) {
                super(t, e), this.keyframeType = n.KeyframeTypes.Event, this.isApplied = !1, this.hasDuration = !1, this.isCurrentlyInRange = !1
            }

            parseOptions(t) {
                t.x = void 0, t.y = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotation = void 0, t.style = void 0, t.cssClass = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, this.event = t.event, this.animValues[this.event] = [0, 0], void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new r(0, 1, !1)), super.parseOptions(t), this.keyframeType = n.KeyframeTypes.Event
            }

            updateLocalProgress(t) {
                if (this.hasDuration) {
                    let e = this.isCurrentlyInRange, i = t >= this.start && t <= this.end;
                    if (e === i) return;
                    return this.isCurrentlyInRange = i, void (i && !e ? this._trigger(this.event + ":enter") : e && !i && this._trigger(this.event + ":exit"))
                }
                !this.isApplied && t >= this.start ? (this.isApplied = !0, this._trigger(this.event)) : this.isApplied && t < this.start && (this.isApplied = !1, this._trigger(this.event + ":reverse"))
            }

            _trigger(t) {
                this.controller.eventObject.event = t, this.controller.eventObject.keyframe = this, this.controller.trigger(t, this.controller.eventObject)
            }

            evaluateConstraints() {
                super.evaluateConstraints(), this.hasDuration = this.start !== this.end
            }

            reset(t) {
                this.isApplied = !1, this.isCurrentlyInRange = !1, super.reset(t)
            }

            onDOMRead(t) {
            }

            reconcile(t) {
            }

            evaluateInterpolationConstraints() {
            }
        }

        a.DATA_ATTRIBUTE = "data-anim-event", e.exports = a
    }, {45: 45, 50: 50, 58: 58}],
    49: [function (t, e, i) {
        "use strict";
        const s = t(59);
        e.exports = class {
            constructor(t, e, i = !1) {
                this.isGroup = i, this.group = t, this.controller = e, this.controllers = [], this.tweenProps = new s
            }
        }
    }, {59: 59}],
    50: [function (t, e, i) {
        "use strict";
        const s = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "anim-ui.position",
                GroupCollapsedStates: "anim-ui.group-collapsed-states",
                scrollY: "anim-ui.scrollY-position",
                path: "anim-ui.path"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{name: "S", mediaQuery: "only screen and (max-width: 734px)"}, {
                name: "M",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {name: "L", mediaQuery: "only screen and (min-width: 1069px)"}],
            getBreakpoint: function () {
                for (let t = 0; t < s.BREAKPOINTS.length; t++) {
                    let e = s.BREAKPOINTS[t];
                    if (window.matchMedia(e.mediaQuery).matches) return e.name
                }
            },
            KeyframeDefaults: {
                ease: 1,
                epsilon: .05,
                preserveState: !1,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {Interpolation: 0, InterpolationForward: 1, CSSClass: 2, Event: 3},
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
                ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
                ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
                ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TweenProps: t(59),
            TargetValue: t(58),
            CSSTargetValue: t(51),
            pageMetrics: new function () {
                this.scrollX = 0, this.scrollY = 0, this.windowWidth = 0, this.windowHeight = 0, this.documentOffsetX = 0, this.documentOffsetY = 0, this.previousBreakpoint = "", this.breakpoint = ""
            },
            KeyframeComparison: function (t, e) {
                return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
            }
        };
        e.exports = s
    }, {51: 51, 58: 58, 59: 59}],
    51: [function (t, e, i) {
        "use strict";
        const s = t(58);
        e.exports = class extends s {
            constructor(t, e, i, s, n = !1, r) {
                super(t, e, i), this.key = s, this.round = n, this.suffix = r
            }

            set(t) {
                let e = this.current;
                this.round && (e = Math.round(e)), this.suffix && (e += this.suffix), t[this.key] = e
            }
        }
    }, {58: 58}],
    52: [function (t, e, i) {
        "use strict";
        e.exports = new class {
            constructor() {
                this.linear = function (t) {
                    return t
                }, this.easeInQuad = function (t) {
                    return t * t
                }, this.easeOutQuad = function (t) {
                    return t * (2 - t)
                }, this.easeInOutQuad = function (t) {
                    return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
                }, this.easeInSin = function (t) {
                    return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
                }, this.easeOutSin = function (t) {
                    return Math.sin(Math.PI / 2 * t)
                }, this.easeInOutSin = function (t) {
                    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
                }, this.easeInElastic = function (t) {
                    return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
                }, this.easeOutElastic = function (t) {
                    return .04 * t / --t * Math.sin(25 * t)
                }, this.easeInOutElastic = function (t) {
                    return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
                }, this.easeOutBack = function (t) {
                    return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
                }, this.easeInCubic = function (t) {
                    return t * t * t
                }, this.easeOutCubic = function (t) {
                    return --t * t * t + 1
                }, this.easeInOutCubic = function (t) {
                    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                }, this.easeInQuart = function (t) {
                    return t * t * t * t
                }, this.easeOutQuart = function (t) {
                    return 1 - --t * t * t * t
                }, this.easeInOutQuart = function (t) {
                    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
                }, this.easeInQuint = function (t) {
                    return t * t * t * t * t
                }, this.easeOutQuint = function (t) {
                    return 1 + --t * t * t * t * t
                }, this.easeInOutQuint = function (t) {
                    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
                }
            }
        }
    }, {}],
    53: [function (t, e, i) {
        "use strict";
        const s = t(50), n = (t, e) => null == t ? e : t;

        class r {
            constructor(t) {
                this.top = 0, this.bottom = 0, this.left = 0, this.right = 0, this.height = 0, this.width = 0
            }

            toString() {
                return "top:".concat(this.top, ", bottom:").concat(this.bottom, ", left:").concat(this.left, ", right:").concat(this.right, ", height:").concat(this.height, ", width:").concat(this.width)
            }

            toObject() {
                return {
                    top: this.top,
                    bottom: this.bottom,
                    left: this.left,
                    right: this.right,
                    height: this.height,
                    width: this.width
                }
            }
        }

        e.exports = class {
            constructor() {
                this.clear()
            }

            clear() {
                this._metrics = new WeakMap
            }

            destroy() {
                this._metrics = null
            }

            add(t) {
                let e = this._metrics.get(t);
                if (e) return e;
                let i = new r(t);
                return this._metrics.set(t, i), this._refreshMetrics(t, i)
            }

            get(t) {
                return this._metrics.get(t)
            }

            refreshCollection(t) {
                t.forEach(t => this._refreshMetrics(t, null))
            }

            refreshMetrics(t) {
                return this._refreshMetrics(t)
            }

            _refreshMetrics(t, e) {
                if (e = e || this._metrics.get(t), !(t instanceof Element)) return e.width = n(t.width, 0), e.height = n(t.height, 0), e.top = n(t.top, n(t.y, 0)), e.left = n(t.left, n(t.x, 0)), e.right = e.left + e.width, e.bottom = e.top + e.height, e;
                if (void 0 === t.offsetWidth) {
                    let i = t.getBoundingClientRect();
                    return e.width = i.width, e.height = i.height, e.top = s.pageMetrics.scrollY + i.top, e.left = s.pageMetrics.scrollX + i.left, e.right = e.left + e.width, e.bottom = e.top + e.height, e
                }
                e.width = t.offsetWidth, e.height = t.offsetHeight, e.top = s.pageMetrics.documentOffsetY, e.left = s.pageMetrics.documentOffsetX;
                let i = t;
                for (; i;) e.top += i.offsetTop, e.left += i.offsetLeft, i = i.offsetParent;
                return e.right = e.left + e.width, e.bottom = e.top + e.height, e
            }
        }
    }, {50: 50}],
    54: [function (t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t) {
                this.controller = t, this.element = this.controller.element, this.keyframe = null, this.event = "", this.tweenProps = this.controller.tweenProps
            }
        }
    }, {}],
    55: [function (t, e, i) {
        "use strict";
        const s = t(50), n = t(45), r = t(48), a = t(46), o = function (t) {
            for (let e in t) {
                let i = t[e];
                if (-1 === s.KeyframeJSONReservedWords.indexOf(e) && Array.isArray(i)) return !0
            }
            return !1
        };
        e.exports = function (t) {
            if (void 0 !== t.cssClass || void 0 !== t.style) {
                if (o(t)) throw"CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return a
            }
            if (o(t)) return n;
            if (t.event) return r;
            throw delete t.anchors, "Could not determine tween type based on ".concat(JSON.stringify(t))
        }
    }, {45: 45, 46: 46, 48: 48, 50: 50}],
    56: [function (t, e, i) {
        "use strict";
        e.exports = class {
            constructor() {
                this.local = 0, this.localUnclamped = 0, this.lastPosition = 0
            }
        }
    }, {}],
    57: [function (t, e, i) {
        "use strict";
        const {map: s} = t(75), n = {};

        class r {
            constructor(t, e, i, s) {
                this.mass = t, this.stiffness = e, this.damping = i, this.initialVelocity = s, this.m_w0 = Math.sqrt(this.stiffness / this.mass), this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)), this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta), this.m_A = 1, this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0, this.m_A = 1, this.m_B = -this.initialVelocity + this.m_w0)
            }

            solve(t) {
                return 1 - (t = this.m_zeta < 1 ? Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t)) : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
            }
        }

        const a = /\d*\.?\d+/g;
        r.fromCSSString = function (t) {
            let e = t.match(a);
            if (4 !== e.length) throw"SpringEasing could not convert ".concat(cssString, " to spring params");
            let i = e.map(Number), o = new r(...i);
            const h = o.solve.bind(o);
            let l = 0;
            let c = function () {
                if (n[t]) return n[t];
                let e, i = 0;
                for (; ;) {
                    l += 1 / 6;
                    if (1 === h(l)) {
                        if (i++, i >= 16) {
                            e = l * (1 / 6);
                            break
                        }
                    } else i = 0
                }
                return n[t] = e, n[t]
            }();
            return function (t) {
                return 0 === t || 1 === t ? t : h(s(t, 0, 1, 0, c))
            }
        }, e.exports = r
    }, {75: 75}],
    58: [function (t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e, i) {
                this.epsilon = parseFloat(e), this.snapAtCreation = i, this.initialValue = t, this.target = t, this.current = t, this.previousValue = t, this.isActive = !1
            }
        }
    }, {}],
    59: [function (t, e, i) {
        "use strict";
        e.exports = class {
        }
    }, {}],
    60: [function (t, e, i) {
        "use strict";
        e.exports = () => Math.random().toString(16).slice(-4)
    }, {}],
    61: [function (t, e, i) {
        "use strict";
        const s = Math.abs;

        class n {
            constructor(t, e, i, s) {
                this.cp = new Float32Array(6), this.cp[0] = 3 * t, this.cp[1] = 3 * (i - t) - this.cp[0], this.cp[2] = 1 - this.cp[0] - this.cp[1], this.cp[3] = 3 * e, this.cp[4] = 3 * (s - e) - this.cp[3], this.cp[5] = 1 - this.cp[3] - this.cp[4]
            }

            sampleCurveX(t) {
                return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
            }

            sampleCurveY(t) {
                return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
            }

            sampleCurveDerivativeX(t) {
                return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
            }

            solveCurveX(t) {
                var e, i, n, r, a, o;
                for (n = t, o = 0; o < 5; o++) {
                    if (r = this.sampleCurveX(n) - t, s(r) < 1e-5) return n;
                    if (a = this.sampleCurveDerivativeX(n), s(a) < 1e-5) break;
                    n -= r / a
                }
                if ((n = t) < (e = 0)) return e;
                if (n > (i = 1)) return i;
                for (; e < i;) {
                    if (r = this.sampleCurveX(n), s(r - t) < 1e-5) return n;
                    t > r ? e = n : i = n, n = .5 * (i - e) + e
                }
                return n
            }

            solve(t) {
                return this.sampleCurveY(this.solveCurveX(t))
            }
        }

        const r = /\d*\.?\d+/g;
        n.fromCSSString = function (t) {
            let e = t.match(r);
            if (4 !== e.length) throw"UnitBezier could not convert ".concat(t, " to cubic-bezier");
            let i = e.map(Number), s = new n(i[0], i[1], i[2], i[3]);
            return s.solve.bind(s)
        }, e.exports = n
    }, {}],
    62: [function (t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e) {
                this.a = t.top - e, this.a < 0 && (this.a = t.top), this.b = t.top, this.d = t.bottom, this.c = Math.max(this.d - e, this.b)
            }
        }
    }, {}],
    63: [function (t, e, i) {
        "use strict";
        const s = t(64), n = new (t(53));

        class r {
            constructor(t) {
                this.group = t, this.data = {target: null, anchors: null, metrics: this.group.metrics}
            }

            parseArray(t, e) {
                return [this.parseExpression(t, e[0]), this.parseExpression(t, e[1])]
            }

            parseExpression(t, e) {
                if (!e) return null;
                if ("number" == typeof e) return e;
                if ("string" != typeof e) throw"Expression must be a string, received ".concat(typeof e, ": ").concat(e);
                return this.data.target = t.controller.element, this.data.anchors = t.anchors, this.data.keyframe = t.keyframe, r._parse(e, this.data)
            }

            parseTimeValue(t, e) {
                if ("number" == typeof e) return e;
                let i = this.group.expressionParser.parseExpression(t, e);
                return this.group.convertScrollPositionToTValue(i)
            }

            destroy() {
                this.group = null
            }

            static parse(t, e) {
                return (e = e || {}) && (n.clear(), e.target && n.add(e.target), e.anchors && e.anchors.forEach(t => n.add(t))), e.metrics = n, r._parse(t, e)
            }

            static _parse(t, e) {
                return s.Parse(t).execute(e)
            }
        }

        r.programs = s.programs, "undefined" != typeof window && (window.ExpressionParser = r), e.exports = r
    }, {53: 53, 64: 64}],
    64: [function (t, e, i) {
        "use strict";
        const s = t(50), n = t(75), r = {}, a = {
            smoothstep: (t, e, i) => (i = a.clamp((i - t) / (e - t), 0, 1)) * i * (3 - 2 * i),
            deg: t => 180 * t / Math.PI,
            rad: t => t * Math.PI / 180,
            random: (t, e) => Math.random() * (e - t) + t,
            atan: Math.atan2
        };
        Object.getOwnPropertyNames(Math).forEach(t => a[t] ? null : a[t.toLowerCase()] = Math[t]), Object.getOwnPropertyNames(n).forEach(t => a[t] ? null : a[t.toLowerCase()] = n[t]);
        let o = null;
        const h = "a", l = "ALPHA", c = "(", u = ")", d = "PLUS", m = "MINUS", p = "MUL", f = "DIV",
            _ = "INTEGER_CONST", g = "FLOAT_CONST", E = ",", v = "EOF", b = {
                NUMBERS: /\d|\d\.\d/,
                DIGIT: /\d/,
                OPERATOR: /[-+*/]/,
                PAREN: /[()]/,
                WHITE_SPACE: /\s/,
                ALPHA: /[a-zA-Z]|%/,
                ALPHANUMERIC: /[a-zA-Z0-9]/,
                OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
                GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
                ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
                MATH_FUNCTION: new RegExp("\\b(".concat(Object.keys(a).join("|"), ")\\b"), "i")
            }, y = function (t, e, i, s = "") {
                let n = e.slice(Math.max(i, 0), Math.min(e.length, i + 3)),
                    r = new Error("Expression Error. ".concat(t, ' in expression "').concat(e, '", near "').concat(n, '"'));
                throw console.error(r.message, o ? o.keyframe || o.target : ""), r
            }, w = {
                round: 1,
                clamp: 3,
                lerp: 3,
                random: 2,
                atan: 2,
                floor: 1,
                ceil: 1,
                abs: 1,
                cos: 1,
                sin: 1,
                smoothstep: 3,
                rad: 1,
                deg: 1,
                pow: 2,
                calc: 1
            };

        class T {
            constructor(t, e) {
                this.type = t, this.value = e
            }
        }

        T.ONE = new T("100", 100), T.EOF = new T(v, null);

        class I {
            constructor(t) {
                this.type = t
            }
        }

        class x extends I {
            constructor(t, e) {
                super("UnaryOp"), this.token = this.op = t, this.expr = e
            }
        }

        class A extends I {
            constructor(t, e, i) {
                super("BinOp"), this.left = t, this.op = e, this.right = i
            }
        }

        class S extends I {
            constructor(t, e) {
                if (super("MathOp"), this.op = t, this.list = e, w[t.value] && e.length !== w[t.value]) throw new Error("Incorrect number of arguments for '".concat(t.value, "'. Received ").concat(e.length, ", expected ").concat(w[t.value]))
            }
        }

        class O extends I {
            constructor(t) {
                super("Num"), this.token = t, this.value = t.value
            }
        }

        class C extends I {
            constructor(t, e, i) {
                super("RefValue"), this.num = t, this.ref = e, this.unit = i
            }
        }

        class P extends I {
            constructor(t, e) {
                super("CSSValue"), this.ref = t, this.propertyName = e
            }
        }

        class R extends I {
            constructor(t, e) {
                super("PropValue"), this.ref = t, this.propertyName = e
            }
        }

        class M {
            constructor(t) {
                let e;
                for (this.text = t, this.pos = 0, this.char = this.text[this.pos], this.tokens = []; (e = this.getNextToken()) && e !== T.EOF;) this.tokens.push(e);
                this.tokens.push(e)
            }

            advance() {
                this.char = this.text[++this.pos]
            }

            skipWhiteSpace() {
                for (; null != this.char && b.WHITE_SPACE.test(this.char);) this.advance()
            }

            name() {
                let t = "";
                for (; null != this.char && b.ALPHA.test(this.char);) t += this.char, this.advance();
                return new T(l, t)
            }

            number() {
                let t = "";
                for ("." === this.char && (t += this.char, this.advance()); null != this.char && b.DIGIT.test(this.char);) t += this.char, this.advance();
                if (null != this.char && "." === this.char) for (t.includes(".") && y("Number appears to contain 2 decimal points", this.text, this.pos), t += this.char, this.advance(); null != this.char && b.DIGIT.test(this.char);) t += this.char, this.advance();
                return "." === t && y("Attempted to parse a number, but found only a decimal point", this.text, this.pos), t.includes(".") ? new T(g, parseFloat(t)) : new T(_, parseInt(t))
            }

            getNextToken() {
                for (; null != this.char;) if (b.WHITE_SPACE.test(this.char)) this.skipWhiteSpace(); else {
                    if ("." === this.char || b.DIGIT.test(this.char)) return this.number();
                    if ("," === this.char) return this.advance(), new T(E, ",");
                    if (b.OPERATOR.test(this.char)) {
                        let t = "", e = this.char;
                        switch (e) {
                            case"+":
                                t = d;
                                break;
                            case"-":
                                t = m;
                                break;
                            case"*":
                                t = p;
                                break;
                            case"/":
                                t = f
                        }
                        return this.advance(), new T(t, e)
                    }
                    if (b.PAREN.test(this.char)) {
                        let t = "", e = this.char;
                        switch (e) {
                            case"(":
                                t = c;
                                break;
                            case")":
                                t = u
                        }
                        return this.advance(), new T(t, e)
                    }
                    if (b.ALPHA.test(this.char)) return this.name();
                    y('Unexpected character "'.concat(this.char, '"'), this.text, this.pos)
                }
                return T.EOF
            }
        }

        class k {
            constructor(t) {
                this.lexer = t, this.pos = 0
            }

            get currentToken() {
                return this.lexer.tokens[this.pos]
            }

            error(t, e = "") {
                y(t, e, this.lexer.text, this.pos)
            }

            consume(t) {
                let e = this.currentToken;
                return e.type === t ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(t)), e
            }

            consumeList(t) {
                t.includes(this.currentToken) ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(tokenType))
            }

            expr() {
                let t = this.term();
                for (; this.currentToken.type === d || this.currentToken.type === m;) {
                    const e = this.currentToken;
                    switch (e.value) {
                        case"+":
                            this.consume(d);
                            break;
                        case"-":
                            this.consume(m)
                    }
                    t = new A(t, e, this.term())
                }
                return t
            }

            term() {
                let t = this.factor();
                for (; this.currentToken.type === p || this.currentToken.type === f;) {
                    const e = this.currentToken;
                    switch (e.value) {
                        case"*":
                            this.consume(p);
                            break;
                        case"/":
                            this.consume(f)
                    }
                    t = new A(t, e, this.factor())
                }
                return t
            }

            factor() {
                if (this.currentToken.type === d) return new x(this.consume(d), this.factor());
                if (this.currentToken.type === m) return new x(this.consume(m), this.factor());
                if (this.currentToken.type === _ || this.currentToken.type === g) {
                    let t = new O(this.currentToken);
                    if (this.pos += 1, b.OPERATOR.test(this.currentToken.value) || this.currentToken.type === u || this.currentToken.type === E || this.currentToken.type === v) return t;
                    if (this.currentToken.type === l && this.currentToken.value === h) return this.consume(l), new C(t, this.anchorIndex(), this.unit(b.ANY_UNIT));
                    if (this.currentToken.type === l) return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"), new C(t, null, this.unit());
                    this.error("Expected a scaling unit type", "Such as 'h' / 'w'")
                } else {
                    if (b.OBJECT_UNIT.test(this.currentToken.value)) return new C(new O(T.ONE), null, this.unit());
                    if (this.currentToken.value === h) {
                        this.consume(l);
                        const t = this.anchorIndex();
                        if (b.OBJECT_UNIT.test(this.currentToken.value)) return new C(new O(T.ONE), t, this.unit())
                    } else if (this.currentToken.type === l) {
                        if ("calc" === this.currentToken.value) return this.consume(l), this.expr();
                        if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                            const t = "prop" !== this.currentToken.value ? P : R;
                            this.consume(l), this.consume(c);
                            const e = this.propertyName();
                            let i = null;
                            return this.currentToken.type === E && (this.consume(E), this.consume(l), i = this.anchorIndex()), this.consume(u), new t(i, e)
                        }
                        if (b.MATH_FUNCTION.test(this.currentToken.value)) {
                            const t = this.currentToken.value.toLowerCase();
                            if ("number" == typeof a[t]) return this.consume(l), new O(new T(l, a[t]));
                            const e = T[t] || new T(t, t), i = [];
                            this.consume(l), this.consume(c);
                            let s = null;
                            do {
                                this.currentToken.value === E && this.consume(E), s = this.expr(), i.push(s)
                            } while (this.currentToken.value === E);
                            return this.consume(u), new S(e, i)
                        }
                    } else if (this.currentToken.type === c) {
                        this.consume(c);
                        let t = this.expr();
                        return this.consume(u), t
                    }
                }
                this.error("Unexpected token ".concat(this.currentToken.value))
            }

            propertyName() {
                let t = "";
                for (; this.currentToken.type === l || this.currentToken.type === m;) t += this.currentToken.value, this.pos += 1;
                return t
            }

            unit(t = b.ANY_UNIT) {
                const e = this.currentToken;
                if (e.type === l && t.test(e.value)) return this.consume(l), new T(l, e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"));
                this.error("Expected unit type")
            }

            anchorIndex() {
                const t = this.currentToken;
                if (t.type === _) return this.consume(_), new O(t);
                this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
            }

            parse() {
                const t = this.expr();
                return this.currentToken !== T.EOF && this.error("Unexpected token ".concat(this.currentToken.value)), t
            }
        }

        class D {
            constructor(t) {
                this.parser = t, this.root = t.parse()
            }

            visit(t) {
                let e = this[t.type];
                if (!e) throw new Error("No visit method named, ".concat(e));
                return e.call(this, t)
            }

            BinOp(t) {
                switch (t.op.type) {
                    case d:
                        return this.visit(t.left) + this.visit(t.right);
                    case m:
                        return this.visit(t.left) - this.visit(t.right);
                    case p:
                        return this.visit(t.left) * this.visit(t.right);
                    case f:
                        return this.visit(t.left) / this.visit(t.right)
                }
            }

            RefValue(t) {
                let e = this.unwrapReference(t), i = t.unit.value, n = t.num.value;
                const r = o.metrics.get(e);
                switch (i) {
                    case"h":
                        return .01 * n * r.height;
                    case"t":
                        return .01 * n * r.top;
                    case"vh":
                        return .01 * n * s.pageMetrics.windowHeight;
                    case"vw":
                        return .01 * n * s.pageMetrics.windowWidth;
                    case"px":
                        return n;
                    case"w":
                        return .01 * n * r.width;
                    case"b":
                        return .01 * n * r.bottom;
                    case"l":
                        return .01 * n * r.left;
                    case"r":
                        return .01 * n * r.right
                }
            }

            PropValue(t) {
                return (null === t.ref ? o.target : o.anchors[t.ref.value])[t.propertyName]
            }

            CSSValue(t) {
                let e = this.unwrapReference(t);
                const i = getComputedStyle(e).getPropertyValue(t.propertyName);
                return "" === i ? 0 : D.Parse(i).execute(o)
            }

            Num(t) {
                return t.value
            }

            UnaryOp(t) {
                return t.op.type === d ? +this.visit(t.expr) : t.op.type === m ? -this.visit(t.expr) : void 0
            }

            MathOp(t) {
                let e = t.list.map(t => this.visit(t));
                return a[t.op.value].apply(null, e)
            }

            unwrapReference(t) {
                return null === t.ref ? o.target : (t.ref.value >= o.anchors.length && console.error("Not enough anchors supplied for expression ".concat(this.parser.lexer.text), o.target), o.anchors[t.ref.value])
            }

            execute(t) {
                return o = t, this.visit(this.root)
            }

            static Parse(t) {
                return r[t] || (r[t] = new D(new k(new M(t))))
            }
        }

        D.programs = r, e.exports = D
    }, {50: 50, 75: 75}],
    65: [function (t, e, i) {
        "use strict";
        const s = t(24).EventEmitterMicro, n = t(75), r = t(68), a = t(50), o = t(49), h = t(56), l = t(62), c = t(53),
            u = t(63), d = t(47), m = {};
        "undefined" != typeof window && (m.create = t(28), m.update = t(38), m.draw = t(34));
        let p = 0;
        e.exports = class extends s {
            constructor(t, e) {
                super(), this.anim = e, this.element = t, this.name = this.name || t.getAttribute("data-anim-scroll-group"), this.isEnabled = !0, this.position = new h, this.metrics = new c, this.metrics.add(this.element), this.expressionParser = new u(this), this.boundsMin = 0, this.boundsMax = 0, this.timelineUpdateRequired = !1, this._keyframesDirty = !1, this.viewableRange = this.createViewableRange(), this.defaultEase = a.KeyframeDefaults.ease, this.keyframeControllers = [], this.updateProgress(this.getPosition()), this.onDOMRead = this.onDOMRead.bind(this), this.onDOMWrite = this.onDOMWrite.bind(this), this.gui = null, this.finalizeInit()
            }

            finalizeInit() {
                this.element._animInfo = new o(this, null, !0), this.setupRAFEmitter()
            }

            destroy() {
                this.destroyed = !0, this.expressionParser.destroy(), this.expressionParser = null;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].destroy();
                this.keyframeControllers = null, this.position = null, this.viewableRange = null, this.gui && (this.gui.destroy(), this.gui = null), this.metrics.destroy(), this.metrics = null, this.rafEmitter.destroy(), this.rafEmitter = null, this.anim = null, this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null, this.element._animInfo = null), this.element = null, this.isEnabled = !1, super.destroy()
            }

            removeKeyframeController(t) {
                return this.keyframeControllers.includes(t) ? (t._allKeyframes.forEach(t => t.markedForRemoval = !0), this.keyframesDirty = !0, new Promise(e => {
                    m.draw(() => {
                        const i = this.keyframeControllers.indexOf(t);
                        -1 !== i ? (this.keyframeControllers.splice(i, 1), t.onDOMWrite(), t.destroy(), this.gui && this.gui.create(), e()) : e()
                    })
                })) : Promise.resolve()
            }

            remove() {
                return this.anim.removeGroup(this)
            }

            clear() {
                return Promise.all(this.keyframeControllers.map(t => this.removeKeyframeController(t)))
            }

            setupRAFEmitter(t) {
                this.rafEmitter && this.rafEmitter.destroy(), this.rafEmitter = t || new m.create, this.rafEmitter.on("update", this.onDOMRead), this.rafEmitter.on("draw", this.onDOMWrite), this.rafEmitter.once("external", () => this.reconcile())
            }

            requestDOMChange() {
                return !!this.isEnabled && this.rafEmitter.run()
            }

            onDOMRead() {
                this.keyframesDirty && this.onKeyframesDirty();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMRead(this.position.local)
            }

            onDOMWrite() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMWrite();
                this.needsUpdate() && this.requestDOMChange()
            }

            needsUpdate() {
                if (this._keyframesDirty) return !0;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) if (this.keyframeControllers[t].needsUpdate()) return !0;
                return !1
            }

            addKeyframe(t, e) {
                let i = this.getControllerForTarget(t);
                return null === i && (i = new d(this, t), this.keyframeControllers.push(i)), this.keyframesDirty = !0, i.addKeyframe(e)
            }

            addEvent(t, e) {
                e.event = e.event || "Generic-Event-Name-" + p++;
                let i = void 0 !== e.end && e.end !== e.start;
                const s = this.addKeyframe(t, e);
                return i ? (e.onEnterOnce && s.controller.once(e.event + ":enter", e.onEnterOnce), e.onExitOnce && s.controller.once(e.event + ":exit", e.onExitOnce), e.onEnter && s.controller.on(e.event + ":enter", e.onEnter), e.onExit && s.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && s.controller.once(e.event, e.onEventOnce), e.onEventReverseOnce && s.controller.once(e.event + ":reverse", e.onEventReverseOnce), e.onEvent && s.controller.on(e.event, e.onEvent), e.onEventReverse && s.controller.on(e.event + ":reverse", e.onEventReverse)), s
            }

            forceUpdate({waitForNextUpdate: t = !0, silent: e = !1} = {}) {
                this.isEnabled && (this.refreshMetrics(), this.timelineUpdateRequired = !0, t ? this.keyframesDirty = !0 : this.onKeyframesDirty({silent: e}))
            }

            onKeyframesDirty({silent: t = !1} = {}) {
                this.determineActiveKeyframes(), this.keyframesDirty = !1, this.metrics.refreshMetrics(this.element), this.viewableRange = this.createViewableRange();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateAnimationConstraints();
                this.updateBounds(), this.updateProgress(this.getPosition()), t || this.updateTimeline(), this.gui && this.gui.create()
            }

            refreshMetrics() {
                let t = new Set([this.element]);
                this.keyframeControllers.forEach(e => {
                    t.add(e.element), e._allKeyframes.forEach(e => e.anchors.forEach(e => t.add(e)))
                }), this.metrics.refreshCollection(t), this.viewableRange = this.createViewableRange()
            }

            reconcile() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].reconcile()
            }

            determineActiveKeyframes(t) {
                t = t || r(Array.from(document.documentElement.classList));
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].determineActiveKeyframes(t)
            }

            updateBounds() {
                if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void (this.boundsMax = 0);
                let t = {min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY};
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].getBounds(t);
                let e = this.convertTValueToScrollPosition(t.min), i = this.convertTValueToScrollPosition(t.max);
                i - e < a.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(e - .5 * a.pageMetrics.windowHeight), t.max = this.convertScrollPositionToTValue(i + .5 * a.pageMetrics.windowHeight)) : (t.min -= .001, t.max += .001), this.boundsMin = t.min, this.boundsMax = t.max, this.timelineUpdateRequired = !0
            }

            createViewableRange() {
                return new l(this.metrics.get(this.element), a.pageMetrics.windowHeight)
            }

            _onBreakpointChange(t, e) {
                this.keyframesDirty = !0, this.determineActiveKeyframes()
            }

            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a), this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }

            performTimelineDispatch() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateLocalProgress(this.position.local);
                this.trigger(a.EVENTS.ON_TIMELINE_UPDATE, this.position.local), this.trigger("update", this.position.local), this.timelineUpdateRequired = !1, this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START, this), this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START + ":reverse", this), this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE, this), this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this), this.trigger("complete:reverse", this))), null !== this.gui && this.gui.onScrollUpdate(this.position)
            }

            updateTimeline(t) {
                if (!this.isEnabled) return !1;
                void 0 === t && (t = this.getPosition()), this.updateProgress(t);
                let e = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax,
                    i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
                if (!this.timelineUpdateRequired && e && i && this.position.lastPosition === t) return void (this.position.local = this.position.localUnclamped);
                if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax) return this.performTimelineDispatch(), this.requestDOMChange(), void (this.position.lastPosition = this.position.localUnclamped);
                let s = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax,
                    n = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
                if (s && n) return this.performTimelineDispatch(), this.requestDOMChange(), void (this.position.lastPosition = this.position.localUnclamped);
                const r = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax,
                    a = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
                (r || a) && (this.performTimelineDispatch(), this.requestDOMChange(), this.position.lastPosition = this.position.localUnclamped), null !== this.gui && this.gui.onScrollUpdate(this.position)
            }

            _onScroll(t) {
                this.updateTimeline(t)
            }

            convertScrollPositionToTValue(t) {
                return this.hasDuration() ? n.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
            }

            convertTValueToScrollPosition(t) {
                return this.hasDuration() ? n.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
            }

            hasDuration() {
                return this.viewableRange.a !== this.viewableRange.d
            }

            getPosition() {
                return a.pageMetrics.scrollY
            }

            getControllerForTarget(t) {
                if (!t._animInfo || !t._animInfo.controllers) return null;
                if (t._animInfo.controller && t._animInfo.controller.group === this) return t._animInfo.controller;
                const e = t._animInfo.controllers;
                for (let t = 0, i = e.length; t < i; t++) if (e[t].group === this) return e[t];
                return null
            }

            trigger(t, e) {
                if (void 0 !== this._events[t]) for (let i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
            }

            set keyframesDirty(t) {
                this._keyframesDirty = t, this._keyframesDirty && this.requestDOMChange()
            }

            get keyframesDirty() {
                return this._keyframesDirty
            }
        }
    }, {24: 24, 28: 28, 34: 34, 38: 38, 47: 47, 49: 49, 50: 50, 53: 53, 56: 56, 62: 62, 63: 63, 68: 68, 75: 75}],
    66: [function (t, e, i) {
        "use strict";
        const s = t(65), n = t(44), r = t(75);
        let a = 0;
        const o = {};
        "undefined" != typeof window && (o.create = t(28));

        class h extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TimeGroup-" + a++), super(t, e), this.name = this.name || t.getAttribute("data-anim-time-group"), this._isPaused = !0, this._repeats = 0, this._isReversed = !1, this._timeScale = 1, this._chapterPlayer = new n(this), this.now = performance.now()
            }

            finalizeInit() {
                if (!this.anim) throw"TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this), super.finalizeInit()
            }

            progress(t) {
                if (void 0 === t) return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                let e = t * this.boundsMax;
                this.timelineUpdateRequired = !0, this.updateTimeline(e)
            }

            time(t) {
                if (void 0 === t) return this.position.local;
                t = r.clamp(t, this.boundsMin, this.duration), this.timelineUpdateRequired = !0, this.updateTimeline(t)
            }

            play(t) {
                this.reversed(!1), this.isEnabled = !0, this._isPaused = !1, this.time(t), this.now = performance.now(), this._playheadEmitter.run()
            }

            reverse(t) {
                this.reversed(!0), this.isEnabled = !0, this._isPaused = !1, this.time(t), this.now = performance.now(), this._playheadEmitter.run()
            }

            reversed(t) {
                if (void 0 === t) return this._isReversed;
                this._isReversed = t
            }

            restart() {
                this._isReversed ? (this.progress(1), this.reverse(this.time())) : (this.progress(0), this.play(this.time()))
            }

            pause(t) {
                this.time(t), this._isPaused = !0
            }

            paused(t) {
                return void 0 === t ? this._isPaused : (this._isPaused = t, this._isPaused || this.play(), this)
            }

            onPlayTimeUpdate() {
                if (this._isPaused) return;
                let t = performance.now(), e = (t - this.now) / 1e3;
                this.now = t, this._isReversed && (e = -e);
                let i = this.time() + e * this._timeScale;
                if (this._repeats === h.REPEAT_FOREVER || this._repeats > 0) {
                    let t = !1;
                    !this._isReversed && i > this.boundsMax ? (i -= this.boundsMax, t = !0) : this._isReversed && i < 0 && (i = this.boundsMax + i, t = !0), t && (this._repeats = this._repeats === h.REPEAT_FOREVER ? h.REPEAT_FOREVER : this._repeats - 1)
                }
                this.time(i);
                let s = !this._isReversed && this.position.local !== this.duration,
                    n = this._isReversed && 0 !== this.position.local;
                s || n ? this._playheadEmitter.run() : this.paused(!0)
            }

            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = t, this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }

            updateBounds() {
                if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void (this.boundsMax = 0);
                let t = {min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY};
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].getBounds(t);
                this.boundsMin = 0, this.boundsMax = t.max, this.viewableRange.a = this.viewableRange.b = 0, this.viewableRange.c = this.viewableRange.d = this.boundsMax, this.timelineUpdateRequired = !0
            }

            setupRAFEmitter(t) {
                this._playheadEmitter = new o.create, this._playheadEmitter.on("update", this.onPlayTimeUpdate), super.setupRAFEmitter(t)
            }

            get duration() {
                return this.keyframesDirty && this.onKeyframesDirty({silent: !0}), this.boundsMax
            }

            timeScale(t) {
                return void 0 === t ? this._timeScale : (this._timeScale = t, this)
            }

            repeats(t) {
                if (void 0 === t) return this._repeats;
                this._repeats = t
            }

            getPosition() {
                return this.position.local
            }

            addChapter(t) {
                return this._chapterPlayer.addChapter(t)
            }

            playToChapter(t) {
                this._chapterPlayer.playToChapter(t)
            }

            convertScrollPositionToTValue(t) {
                return t
            }

            convertTValueToScrollPosition(t) {
                return t
            }

            hasDuration() {
                return this.duration > 0
            }

            destroy() {
                this._playheadEmitter.destroy(), this._playheadEmitter = null, super.destroy()
            }

            set timelineProgress(t) {
                this.progress(t)
            }

            get timelineProgress() {
                return this.progress()
            }
        }

        h.REPEAT_FOREVER = -1, e.exports = h
    }, {28: 28, 44: 44, 65: 65, 75: 75}],
    67: [function (t, e, i) {
        "use strict";
        const s = t(65), n = (t(44), t(75));
        let r = 0;
        const a = {};
        "undefined" != typeof window && (a.create = t(28));
        e.exports = class extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TweenGroup-" + r++), super(t, e), this.name = "Tweens", this.keyframes = [], this._isPaused = !1, this.now = performance.now()
            }

            finalizeInit() {
                this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this), this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this), super.finalizeInit()
            }

            destroy() {
                this._timeEmitter.destroy(), this._timeEmitter = null, this._keyframes = [], super.destroy()
            }

            setupRAFEmitter(t) {
                this.now = performance.now(), this._timeEmitter = new a.create, this._timeEmitter.on("update", this.onTimeEmitterUpdate), this._timeEmitter.run(), super.setupRAFEmitter(t)
            }

            addKeyframe(t, e) {
                if (void 0 !== e.start || void 0 !== e.end) throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
                if ("number" != typeof e.duration) throw Error("Tween options.duration is undefined, or is not a number");
                let i, s;
                e.start = (e.delay || 0) + this.position.localUnclamped, e.end = e.start + e.duration, e.preserveState = !0, e.snapAtCreation = !0, t._animInfo && (i = t._animInfo.group, s = t._animInfo.controller);
                let n = super.addKeyframe(t, e);
                return t._animInfo.group = i, t._animInfo.controller = s, e.onStart && n.controller.once("draw", t => {
                    t.keyframe = n, e.onStart(t), t.keyframe = null
                }), e.onDraw && n.controller.on("draw", t => {
                    t.keyframe = n, e.onDraw(t), t.keyframe = null
                }), this.removeOverlappingProps(n), this.keyframes.push(n), this._timeEmitter.willRun() || (this.now = performance.now(), this._timeEmitter.run()), n
            }

            removeOverlappingProps(t) {
                if (t.controller._allKeyframes.length <= 1) return;
                let e = Object.keys(t.animValues), i = t.controller;
                for (let s = 0, n = i._allKeyframes.length; s < n; s++) {
                    const n = i._allKeyframes[s];
                    if (n === t) continue;
                    if (n.markedForRemoval) continue;
                    let r = Object.keys(n.animValues), a = r.filter(t => e.includes(t));
                    a.length !== r.length ? a.forEach(t => delete n.animValues[t]) : n.markedForRemoval = !0
                }
            }

            onTimeEmitterUpdate(t) {
                if (this._isPaused || 0 === this.keyframeControllers.length) return;
                let e = performance.now(), i = (e - this.now) / 1e3;
                this.now = e;
                let s = this.position.local + i;
                this.position.local = this.position.localUnclamped = s, this.onTimeUpdate()
            }

            onTimeUpdate() {
                for (let t = 0, e = this.keyframes.length; t < e; t++) this.keyframes[t].updateLocalProgress(this.position.localUnclamped);
                this.requestDOMChange(), this._timeEmitter.run(), null !== this.gui && this.gui.onScrollUpdate(this.position)
            }

            onDOMRead() {
                if (this.keyframesDirty && this.onKeyframesDirty(), 0 !== this.keyframes.length) for (let t = 0, e = this.keyframes.length; t < e; t++) {
                    this.keyframes[t].controller.needsWrite = !0;
                    for (let e in this.keyframes[t].animValues) this.keyframes[t].onDOMRead(e)
                }
            }

            onDOMWrite() {
                super.onDOMWrite(), this.removeExpiredKeyframes()
            }

            removeExpiredKeyframes() {
                let t = this.keyframes.length, e = t;
                for (; t--;) {
                    let e = this.keyframes[t];
                    e.destroyed ? this.keyframes.splice(t, 1) : (e.markedForRemoval && (e.jsonProps.onComplete && 1 === e.localT && (e.controller.eventObject.keyframe = e, e.jsonProps.onComplete(e.controller.eventObject), e.jsonProps.onComplete = null), null !== this.gui && this.gui.isDraggingPlayhead || (e.remove(), this.keyframes.splice(t, 1))), 1 === e.localT && (e.markedForRemoval = !0))
                }
                this.keyframes.length === e && 0 !== this.keyframes.length || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers)
            }

            removeExpiredKeyframeControllers() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
                    let e = !0, i = this.keyframeControllers[t];
                    for (let t = 0, s = i._allKeyframes.length; t < s; t++) if (!i._allKeyframes[t].destroyed) {
                        e = !1;
                        break
                    }
                    e && i.remove()
                }
            }

            updateBounds() {
                this.boundsMin = Math.min(...this.keyframes.map(t => t.start)), this.boundsMax = Math.max(...this.keyframes.map(t => t.end))
            }

            play() {
                this.isEnabled = !0, this._isPaused = !1, this.now = performance.now(), this._timeEmitter.run()
            }

            pause() {
                this._isPaused = !0
            }

            paused() {
                return this._isPaused
            }

            time(t) {
                if (void 0 === t) return this.position.local;
                this.position.local = this.position.localUnclamped = n.clamp(t, this.boundsMin, this.boundsMax), this.onTimeUpdate()
            }

            performTimelineDispatch() {
            }

            hasDuration() {
                return !0
            }

            getPosition() {
                return this.position.local
            }

            updateProgress(t) {
            }

            get duration() {
                return this.boundsMax
            }
        }
    }, {28: 28, 44: 44, 65: 65, 75: 75}],
    68: [function (t, e, i) {
        "use strict";
        e.exports = function (t) {
            return t.reduce((t, e) => (t[e] = e, t), {})
        }
    }, {}],
    69: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e) {
            if ("string" != typeof t) return t;
            try {
                return (e || document).querySelector(t) || document.querySelector(t)
            } catch (t) {
                return !1
            }
        }
    }, {}],
    70: [function (t, e, i) {
        "use strict";
        const s = t(24).EventEmitterMicro, n = t(50), r = {create: t(28), update: t(38), draw: t(34)}, a = () => {
        };
        let o = 0;
        e.exports = class extends s {
            constructor(t) {
                super(), this.el = t.el, this.gum = t.gum, this.componentName = t.componentName, this._keyframeController = null
            }

            destroy() {
                this.el = null, this.gum = null, this._keyframeController = null, super.destroy()
            }

            addKeyframe(t) {
                const e = t.el || this.el;
                return (t.group || this.anim).addKeyframe(e, t)
            }

            addDiscreteEvent(t) {
                t.event = t.event || "Generic-Event-Name-" + o++;
                let e = void 0 !== t.end && t.end !== t.start;
                const i = this.addKeyframe(t);
                return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce), t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce), t.onEnter && i.controller.on(t.event + ":enter", t.onEnter), t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce), t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce), t.onEvent && i.controller.on(t.event, t.onEvent), t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)), i
            }

            addRAFLoop(t) {
                let e = ["start", "end"];
                if (!e.every(e => t.hasOwnProperty(e))) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                const i = new r.create;
                i.on("update", t.onUpdate || a), i.on("draw", t.onDraw || a), i.on("draw", () => i.run());
                const {onEnter: s, onExit: n} = t;
                return t.onEnter = () => {
                    i.run(), s && s()
                }, t.onExit = () => {
                    i.cancel(), n && n()
                }, this.addDiscreteEvent(t)
            }

            addContinuousEvent(t) {
                t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"), t.event = t.event || "Generic-Event-Name-" + o++;
                let e = this.addKeyframe(t);
                return e.controller.on(t.event, t.onDraw), e
            }

            mounted() {
            }

            onResizeImmediate(t) {
            }

            onResizeDebounced(t) {
            }

            onBreakpointChange(t) {
            }

            get anim() {
                return this.gum.anim
            }

            get keyframeController() {
                return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
            }

            get pageMetrics() {
                return n.pageMetrics
            }
        }
    }, {24: 24, 28: 28, 34: 34, 38: 38, 50: 50}],
    71: [function (t, e, i) {
        "use strict";
        const s = t(24).EventEmitterMicro, n = t(74), r = t(43), a = t(50), o = t(72), h = {};

        class l extends s {
            constructor(t, e = {}) {
                super(), this.el = t, this.anim = r, this.componentAttribute = e.attribute || "data-component-list", this.components = [], this.componentsInitialized = !1, this.el.getAttribute("data-anim-scroll-group") || this.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"), n.add(() => {
                    r.initialize().then(() => {
                        this.initComponents(), this.setupEvents(), this.components.forEach(t => t.mounted()), this.trigger(l.EVENTS.DOM_COMPONENTS_MOUNTED)
                    })
                })
            }

            initComponents() {
                const t = Array.prototype.slice.call(this.el.querySelectorAll("[".concat(this.componentAttribute, "]")));
                this.el.hasAttribute(this.componentAttribute) && t.push(this.el);
                for (let e = 0; e < t.length; e++) {
                    let i = t[e], s = i.getAttribute(this.componentAttribute).split(" ");
                    for (let t = 0, e = s.length; t < e; t++) {
                        let e = s[t];
                        "" !== e && " " !== e && this.addComponent({el: i, componentName: e})
                    }
                }
                this.componentsInitialized = !0
            }

            setupEvents() {
                this.onResizeDebounced = this.onResizeDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), this.onBreakpointChange = this.onBreakpointChange.bind(this), r.on(a.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate), r.on(a.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced), r.on(a.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
            }

            addComponent(t) {
                const {el: e, componentName: i, data: s} = t;
                if (!o.hasOwnProperty(i)) throw"BubbleGum::addComponent could not add component to '" + e.className + "'. No component type '" + i + "' found!";
                const n = o[i];
                if (!l.componentIsSupported(n, i)) return void 0 === h[i] && (console.log("BubbleGum::addComponent unsupported component '" + i + "'. Reason: '" + i + ".IS_SUPPORTED' returned false"), h[i] = !0), null;
                let r = e.dataset.componentList || "";
                r.includes(i) || (e.dataset.componentList = r.split(" ").concat(i).join(" "));
                let c = new n({el: e, data: s, componentName: t.componentName, gum: this, pageMetrics: a.pageMetrics});
                return this.components.push(c), this.componentsInitialized && c.mounted(), c
            }

            removeComponent(t) {
                const e = this.components.indexOf(t);
                -1 !== e && (this.components.splice(e, 1), t.el.dataset.componentList = t.el.dataset.componentList.split(" ").filter(e => e !== t.componentName).join(" "), t.destroy())
            }

            getComponentOfType(t, e = document.documentElement) {
                const i = "[".concat(this.componentAttribute, "*=").concat(t, "]"),
                    s = e.matches(i) ? e : e.querySelector(i);
                return s ? this.components.find(e => e instanceof o[t] && e.el === s) : null
            }

            getComponentsOfType(t, e = document.documentElement) {
                const i = "[".concat(this.componentAttribute, "*=").concat(t, "]"),
                    s = e.matches(i) ? [e] : Array.from(e.querySelectorAll(i));
                return this.components.filter(e => e instanceof o[t] && s.includes(e.el))
            }

            getComponentsForElement(t) {
                return this.components.filter(e => e.el === t)
            }

            onResizeImmediate() {
                this.components.forEach(t => t.onResizeImmediate(a.pageMetrics))
            }

            onResizeDebounced() {
                this.components.forEach(t => t.onResizeDebounced(a.pageMetrics))
            }

            onBreakpointChange() {
                this.components.forEach(t => t.onBreakpointChange(a.pageMetrics))
            }

            static componentIsSupported(t, e) {
                const i = t.IS_SUPPORTED;
                if (void 0 === i) return !0;
                if ("function" != typeof i) return console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0;
                const s = t.IS_SUPPORTED();
                return void 0 === s ? (console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0) : s
            }
        }

        l.EVENTS = {DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"}, e.exports = l
    }, {24: 24, 43: 43, 50: 50, 72: 72, 74: 74}],
    72: [function (t, e, i) {
        "use strict";
        e.exports = {BaseComponent: t(70)}
    }, {70: 70}],
    73: [function (t, e, i) {
        "use strict";
        "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
        const s = 180 / Math.PI, n = t => Math.round(1e6 * t) / 1e6;

        function r(t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
        }

        function a(t, e) {
            return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e]
        }

        function o(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }

        function h(t, e, i, s) {
            return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s]
        }

        function l(t) {
            const e = new Float32Array(4), i = new Float32Array(3), l = new Float32Array(3), c = new Float32Array(3);
            c[0] = t[3][0], c[1] = t[3][1], c[2] = t[3][2];
            const u = new Array(3);
            for (let e = 0; e < 3; e++) u[e] = t[e].slice(0, 3);
            i[0] = r(u[0]), u[0] = a(u[0], i[0]), l[0] = o(u[0], u[1]), u[1] = h(u[1], u[0], 1, -l[0]), i[1] = r(u[1]), u[1] = a(u[1], i[1]), l[0] /= i[1], l[1] = o(u[0], u[2]), u[2] = h(u[2], u[0], 1, -l[1]), l[2] = o(u[1], u[2]), u[2] = h(u[2], u[1], 1, -l[2]), i[2] = r(u[2]), u[2] = a(u[2], i[2]), l[1] /= i[2], l[2] /= i[2];
            const d = (m = u[1], p = u[2], [m[1] * p[2] - m[2] * p[1], m[2] * p[0] - m[0] * p[2], m[0] * p[1] - m[1] * p[0]]);
            var m, p;
            if (o(u[0], d) < 0) for (let t = 0; t < 3; t++) i[t] *= -1, u[t][0] *= -1, u[t][1] *= -1, u[t][2] *= -1;
            let f;
            return e[0] = .5 * Math.sqrt(Math.max(1 + u[0][0] - u[1][1] - u[2][2], 0)), e[1] = .5 * Math.sqrt(Math.max(1 - u[0][0] + u[1][1] - u[2][2], 0)), e[2] = .5 * Math.sqrt(Math.max(1 - u[0][0] - u[1][1] + u[2][2], 0)), e[3] = .5 * Math.sqrt(Math.max(1 + u[0][0] + u[1][1] + u[2][2], 0)), u[2][1] > u[1][2] && (e[0] = -e[0]), u[0][2] > u[2][0] && (e[1] = -e[1]), u[1][0] > u[0][1] && (e[2] = -e[2]), f = e[0] < .001 && e[0] >= 0 && e[1] < .001 && e[1] >= 0 ? [0, 0, n(180 * Math.atan2(u[0][1], u[0][0]) / Math.PI)] : function (t) {
                const [e, i, r, a] = t, o = e * e, h = i * i, l = r * r, c = e * i + r * a, u = a * a + o + h + l;
                return c > .49999 * u ? [0, 2 * Math.atan2(e, a) * s, 90] : c < -.49999 * u ? [0, -2 * Math.atan2(e, a) * s, -90] : [n(Math.atan2(2 * e * a - 2 * i * r, 1 - 2 * o - 2 * l) * s), n(Math.atan2(2 * i * a - 2 * e * r, 1 - 2 * h - 2 * l) * s), n(Math.asin(2 * e * i + 2 * r * a) * s)]
            }(e), {translation: c, rotation: f, eulerRotation: f, scale: [n(i[0]), n(i[1]), n(i[2])]}
        }

        e.exports = function (t) {
            t instanceof Element && (t = String(getComputedStyle(t).transform).trim());
            let e = new DOMMatrix(t);
            const i = new Array(4);
            for (let t = 1; t < 5; t++) {
                const s = i[t - 1] = new Float32Array(4);
                for (let i = 1; i < 5; i++) s[i - 1] = e["m".concat(t).concat(i)]
            }
            return l(i)
        }
    }, {}],
    74: [function (t, e, i) {
        "use strict";
        let s = !1, n = !1, r = [], a = -1;
        e.exports = {
            NUMBER_OF_FRAMES_TO_WAIT: 30, add: function (t) {
                if (n && t(), r.push(t), s) return;
                s = !0;
                let e = document.documentElement.scrollHeight, i = 0;
                const o = () => {
                    let t = document.documentElement.scrollHeight;
                    if (e !== t) i = 0; else if (i++, i >= this.NUMBER_OF_FRAMES_TO_WAIT) return void r.forEach(t => t());
                    e = t, a = requestAnimationFrame(o)
                };
                a = requestAnimationFrame(o)
            }, reset() {
                cancelAnimationFrame(a), s = !1, n = !1, r = []
            }
        }
    }, {}],
    75: [function (t, e, i) {
        "use strict";
        e.exports = {
            lerp: function (t, e, i) {
                return e + (i - e) * t
            }, map: function (t, e, i, s, n) {
                return s + (n - s) * (t - e) / (i - e)
            }, mapClamp: function (t, e, i, s, n) {
                var r = s + (n - s) * (t - e) / (i - e);
                return Math.max(s, Math.min(n, r))
            }, norm: function (t, e, i) {
                return (t - e) / (i - e)
            }, clamp: function (t, e, i) {
                return Math.max(e, Math.min(i, t))
            }, randFloat: function (t, e) {
                return Math.random() * (e - t) + t
            }, randInt: function (t, e) {
                return Math.floor(Math.random() * (e - t) + t)
            }
        }
    }, {}],
    76: [function (t, e, i) {
        "use strict";
        var s = t(24).EventEmitterMicro, n = t(38), r = "viewport-emitter", a = {removeNamespace: !0},
            o = "data-viewport-emitter-dispatch", h = "data-viewport-emitter-state",
            l = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
            c = "only screen and (orientation: portrait)", u = "only screen and (orientation: landscape)",
            d = "change:any", m = "change:orientation", p = "change:retina", f = "change:viewport";

        function _(t, e) {
            s.call(this), this._id = t || r, this._options = Object.assign({}, a, e), this._allowDOMEventDispatch = !1, this._allowElementStateData = !1, this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace, this._el = this._initViewportEl(this._id), this._resizing = !1, this._mediaQueryLists = {
                resolution: {retina: window.matchMedia(l)},
                orientation: {portrait: window.matchMedia(c), landscape: window.matchMedia(u)}
            }, this._viewport = this._getViewport(this._options.removeNamespace), this._retina = this._getRetina(this._mediaQueryLists.resolution.retina), this._orientation = this._initOrientation(), this._addListeners(), this._updateElementStateData()
        }

        Object.defineProperty(_, "DOM_DISPATCH_ATTRIBUTE", {
            get: function () {
                return o
            }
        }), Object.defineProperty(_, "DOM_STATE_ATTRIBUTE", {
            get: function () {
                return h
            }
        });
        var g = _.prototype = Object.create(s.prototype);
        Object.defineProperty(g, "id", {
            get: function () {
                return this._id
            }
        }), Object.defineProperty(g, "element", {
            get: function () {
                return this._el
            }
        }), Object.defineProperty(g, "mediaQueryLists", {
            get: function () {
                return this._mediaQueryLists
            }
        }), Object.defineProperty(g, "viewport", {
            get: function () {
                return this._viewport
            }
        }), Object.defineProperty(g, "retina", {
            get: function () {
                return this._retina
            }
        }), Object.defineProperty(g, "orientation", {
            get: function () {
                return this._orientation
            }
        }), Object.defineProperty(g, "hasDomDispatch", {
            get: function () {
                return this._allowDOMEventDispatch
            }
        }), g.destroy = function () {
            for (var t in this._removeListeners(), this._options) this._options[t] = null;
            for (var e in this._mediaQueryLists) {
                var i = this._mediaQueryLists[e];
                for (var n in i) i[n] = null
            }
            this._id = null, this._el = null, this._viewport = null, this._retina = null, this._orientation = null, s.prototype.destroy.call(this)
        }, g._initViewportEl = function (t) {
            var e = document.getElementById(t);
            return e || ((e = document.createElement("div")).id = t, e = document.body.appendChild(e)), e.hasAttribute(o) || (e.setAttribute(o, ""), this._allowDOMEventDispatch = !0), e.hasAttribute(h) || (this._allowElementStateData = !0), e
        }, g._dispatch = function (t, e) {
            var i = {viewport: this._viewport, orientation: this._orientation, retina: this._retina};
            if (this._allowDOMEventDispatch) {
                var s = new CustomEvent(t, {detail: e}), n = new CustomEvent(d, {detail: i});
                this._el.dispatchEvent(s), this._el.dispatchEvent(n)
            }
            this.trigger(t, e), this.trigger(d, i)
        }, g._addListeners = function () {
            this._onOrientationChange = this._onOrientationChange.bind(this), this._onRetinaChange = this._onRetinaChange.bind(this), this._onViewportChange = this._onViewportChange.bind(this), this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this), this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange), this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange), this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange), window.addEventListener("resize", this._onViewportChange)
        }, g._removeListeners = function () {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange), this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange), this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange), window.removeEventListener("resize", this._onViewportChange)
        }, g._updateElementStateData = function () {
            if (this._allowElementStateData) {
                var t = JSON.stringify({
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                });
                this._el.setAttribute(h, t)
            }
        }, g._getViewport = function (t) {
            var e = window.getComputedStyle(this._el, "::before").content;
            return e ? (e = e.replace(/["']/g, ""), t ? e.split(":").pop() : e) : null
        }, g._getRetina = function (t) {
            return t.matches
        }, g._getOrientation = function (t) {
            var e = this._orientation;
            if (t.matches) {
                return t.media.match(/portrait|landscape/)[0]
            }
            return e
        }, g._initOrientation = function () {
            var t = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return t || this._getOrientation(this._mediaQueryLists.orientation.landscape)
        }, g._onViewportChange = function () {
            this._resizing || (this._resizing = !0, n(this._onViewportChangeUpdate))
        }, g._onViewportChangeUpdate = function () {
            var t = this._viewport;
            if (this._viewport = this._getViewport(this._options.removeNamespace), t !== this._viewport) {
                var e = {from: t, to: this._viewport};
                this._updateElementStateData(), this._dispatch(f, e)
            }
            this._resizing = !1
        }, g._onRetinaChange = function (t) {
            var e = this._retina;
            if (this._retina = this._getRetina(t), e !== this._retina) {
                var i = {from: e, to: this._retina};
                this._updateElementStateData(), this._dispatch(p, i)
            }
        }, g._onOrientationChange = function (t) {
            var e = this._orientation;
            if (this._orientation = this._getOrientation(t), e !== this._orientation) {
                var i = {from: e, to: this._orientation};
                this._updateElementStateData(), this._dispatch(m, i)
            }
        }, e.exports = _
    }, {24: 24, 38: 38}],
    77: [function (t, e, i) {
        "use strict";
        var s = t(76);
        e.exports = new s
    }, {76: 76}],
    78: [function (t, e, i) {
        "use strict";
        e.exports = function () {
            var t = new Float32Array(16);
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }
    }, {}],
    79: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
            var s = Math.sin(i), n = Math.cos(i), r = e[4], a = e[5], o = e[6], h = e[7], l = e[8], c = e[9], u = e[10],
                d = e[11];
            e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[4] = r * n + l * s, t[5] = a * n + c * s, t[6] = o * n + u * s, t[7] = h * n + d * s, t[8] = l * n - r * s, t[9] = c * n - a * s, t[10] = u * n - o * s, t[11] = d * n - h * s, t
        }
    }, {}],
    80: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
            var s = Math.sin(i), n = Math.cos(i), r = e[0], a = e[1], o = e[2], h = e[3], l = e[8], c = e[9], u = e[10],
                d = e[11];
            e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[0] = r * n - l * s, t[1] = a * n - c * s, t[2] = o * n - u * s, t[3] = h * n - d * s, t[8] = r * s + l * n, t[9] = a * s + c * n, t[10] = o * s + u * n, t[11] = h * s + d * n, t
        }
    }, {}],
    81: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
            var s = Math.sin(i), n = Math.cos(i), r = e[0], a = e[1], o = e[2], h = e[3], l = e[4], c = e[5], u = e[6],
                d = e[7];
            e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[0] = r * n + l * s, t[1] = a * n + c * s, t[2] = o * n + u * s, t[3] = h * n + d * s, t[4] = l * n - r * s, t[5] = c * n - a * s, t[6] = u * n - o * s, t[7] = d * n - h * s, t
        }
    }, {}],
    82: [function (t, e, i) {
        "use strict";
        e.exports = function (t, e, i) {
            var s = i[0], n = i[1], r = i[2];
            return t[0] = e[0] * s, t[1] = e[1] * s, t[2] = e[2] * s, t[3] = e[3] * s, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * r, t[9] = e[9] * r, t[10] = e[10] * r, t[11] = e[11] * r, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }
    }, {}],
    83: [function (t, e, i) {
        "use strict";
        const s = t(70), n = t(7), r = t(6).enableTabbable, a = t(6).disableTabbable;
        e.exports = class extends s {
            constructor(t) {
                super(t), this.questions = [...document.querySelectorAll("[data-accordion]")], this.collection = {}, this.toggleAccordion = this.toggleAccordion.bind(this), this.createElCollection(), this.setDefaultValues(), this.setTransitionDivHeight()
            }

            createElCollection() {
                this.questions.forEach(t => {
                    const e = t.dataset.accordion, i = this.el.querySelector("#".concat(e)), s = i.firstElementChild;
                    this.collection[e] = {
                        question: t,
                        answer: i,
                        child: s,
                        tabbableEls: n.getTabbableElements(i),
                        button: t.querySelector("button"),
                        ariaOpen: t.querySelector(".open-aria"),
                        ariaClose: t.querySelector(".close-aria"),
                        analyticsClick: t.dataset.analyticsClick,
                        height: s.offsetHeight,
                        open: !1
                    }
                })
            }

            setDefaultValues() {
                for (const t in this.collection) {
                    this.collection[t].tabbableEls.forEach(t => a(t))
                }
            }

            setTransitionDivHeight() {
                Object.values(this.collection).filter(t => t.open).forEach(t => {
                    this.setElHeight(t.answer, "".concat(t.height, "px"))
                })
            }

            updateCachedTransitionDivHeight() {
                Object.values(this.collection).forEach(t => t.height = t.child.offsetHeight)
            }

            toggleAccordion(t) {
                const e = t.currentTarget.dataset.accordion;
                this.collection[e].button.classList.toggle("expanded"), this.collection[e].open = this.collection[e].open ? this.closeAccordion(e) : this.openAccordion(e)
            }

            openAccordion(t) {
                const e = this.collection[t];
                return this.setElHeight(e.answer, "".concat(e.height, "px")), e.question.setAttribute("data-analytics-click", e.analyticsClick), e.answer.removeAttribute("aria-hidden"), e.button.setAttribute("aria-expanded", "true"), e.ariaOpen.removeAttribute("aria-hidden"), e.ariaClose.setAttribute("aria-hidden", "true"), e.tabbableEls.forEach(t => r(t)), !0
            }

            closeAccordion(t) {
                const e = this.collection[t];
                return this.setElHeight(e.answer, null), e.question.removeAttribute("data-analytics-click", e.analyticsClick), e.answer.setAttribute("aria-hidden", "true"), e.button.removeAttribute("aria-expanded"), e.ariaOpen.setAttribute("aria-hidden", "true"), e.ariaClose.removeAttribute("aria-hidden"), e.tabbableEls.forEach(t => a(t)), !1
            }

            setElHeight(t, e) {
                t.style.height = e
            }

            handleClick() {
                this.questions.forEach(t => {
                    t.addEventListener("click", this.toggleAccordion)
                })
            }

            mounted() {
                this.handleClick()
            }

            onResizeDebounced() {
                this.updateCachedTransitionDivHeight(), this.setTransitionDivHeight()
            }

            static IS_SUPPORTED() {
                return !document.documentElement.classList.contains("base-experience")
            }
        }
    }, {6: 6, 7: 7, 70: 70}],
    84: [function (t, e, i) {
        "use strict";
        const s = t(71), n = t(70), r = t(43), a = t(50), o = t(63);
        let h;
        try {
            h = t("@marcom/ac-analytics")
        } catch (t) {
        }
        e.exports = class extends n {
            constructor(t) {
                super(t), this.globalNav = document.querySelector("#ac-globalnav"), this.heroVideoContainer = this.el.querySelector(".hero-video-container"), this.heroVideoEndframe = this.heroVideoContainer.querySelector("[data-video-endframe]"), this.animationGroup0 = [...this.el.querySelectorAll(".group-0")], this.animationGroup1 = [...this.el.querySelectorAll(".group-1")], this.animationGroup2 = [...this.el.querySelectorAll(".group-2")], this.heroIntro = this.el.querySelector(".intro"), this.cards = [...this.el.querySelectorAll(".card.fade-in")], this.isStatic = document.documentElement.classList.contains("reduced-motion"), this.scrolled = !1, this.buildInComplete = !1, this.timelineKeyframes = [], this.addEventListeners = this.addEventListeners.bind(this), this.currentBreakpoint = t.pageMetrics.breakpoint, this.cardTriggerPointExpression = "S" === this.currentBreakpoint ? "a0t - 100vh" : "a0t - 90vh", this.getCardsInfo(), this.gum.on(s.EVENTS.DOM_COMPONENTS_MOUNTED, this.addEventListeners), this.timeline = r.createTimeGroup(), this.timeline.name = "Hero - Build-in", "S" === this.currentBreakpoint ? this.createSmallTimeline() : this.createTimeline(), this.createCardTimeline(), this.addTimelineListeners(), this.addScrollListener()
            }

            addTimelineListeners() {
                this.timeline.on(a.EVENTS.ON_TIMELINE_COMPLETE, () => {
                    this.scrolled || this.isStatic ? this.cardsTimeline.play() : this.cardsBuildInChapter && this.cardsTimeline.playToChapter({name: this.cardsBuildInChapter})
                }), this.cardsTimeline.on(a.EVENTS.ON_CHAPTER_COMPLETED, t => {
                    "row-L-1" !== t.current.name && "row-M-1" !== t.current.name && "row-S-1" !== t.current.name || (this.buildInComplete = !0, this.handleTallerViewport())
                })
            }

            firstCardPlayed() {
                const t = new CustomEvent("card-one-played-small");
                window.dispatchEvent(t)
            }

            addScrollListener() {
                r.on(a.PageEvents.ON_SCROLL, t => {
                    t.scrollY > this.heroVideoContainer.offsetTop && !this.scrolled && !this.buildInComplete && this.handleEarlyScroll()
                })
            }

            getCardsInfo() {
                const t = this.el.querySelector("[data-cards]");
                this.cardInfo = t && t.dataset.cards ? JSON.parse(t.dataset.cards) : ""
            }

            addEventListeners() {
                this.heroInlineVideo = this.gum.getComponentOfType("InlineVideo", this.heroVideoContainer), this.heroInlineVideo.videoKeyframe.controller.once("Video: Play", () => {
                    this.scrolled || this.heroInlineVideo.videoComponent.queueVideoPlayback()
                }), setTimeout(() => {
                    this.scrolled || this.isStatic || this.heroInlineVideo.videoLoaded || this.switchToFallback()
                }, 3e3), this.heroInlineVideo.videoComponent.video.addEventListener("ended", () => {
                    this.scrolled || (this.timeline.play(), this.heroPlayState(this.getHeroPlayState("full")))
                })
            }

            getHeroPlayState(t) {
                return {eVar70: "{PAGE_NAME} - ".concat(t)}
            }

            switchToFallback() {
                this.heroInlineVideo && this.heroInlineVideo.killVideoPlay(), this.heroPlayState(this.getHeroPlayState("static")), this.switchToStatic(), this.timeline.timeScale(3), this.timeline.play()
            }

            heroPlayState(t) {
                h && h.passiveTracker(t)
            }

            handleEarlyScroll() {
                this.scrolled = !0, this.switchToFallback(), this.heroPlayState(this.getHeroPlayState("partial"))
            }

            createTimeline() {
                this.timelineKeyframes.push(this.timeline.addKeyframe(this.heroVideoEndframe, {
                    start: 0,
                    end: 1,
                    easeFunction: "cubic-bezier(0.03,0.06,0.46,0.94)",
                    scale: [1, "a1h / h"],
                    y: [null, "css(padding-top, a0) - (100vh - h)/2"],
                    anchors: [this.heroIntro, this.animationGroup0[0]],
                    breakpointMask: "MLX",
                    disabledWhen: ["hero-static"]
                })), this.timeline.addKeyframe(this.heroVideoEndframe, {
                    start: 0,
                    end: 1.1,
                    cssClass: "will-change",
                    toggle: !0,
                    breakpointMask: "MLX",
                    disabledWhen: ["hero-static"]
                }), this.animationGroup1.forEach(t => {
                    this.timelineKeyframes.push(this.timeline.addKeyframe(t, {
                        start: .2,
                        end: 1,
                        easeFunction: "cubic-bezier(0.03,0.06,0.46,0.94)",
                        y: [null, 0],
                        opacity: [0, 1],
                        breakpointMask: "MLX",
                        disabledWhen: ["hero-static"]
                    }))
                }), this.animationGroup2.forEach(t => {
                    this.timelineKeyframes.push(this.timeline.addKeyframe(t, {
                        start: 1.1,
                        end: 2,
                        y: [null, 0],
                        opacity: [0, 1],
                        easeFunction: "cubic-bezier(0.03,0.06,0.46,0.94)",
                        breakpointMask: "MLX",
                        disabledWhen: ["hero-static"]
                    }))
                })
            }

            createSmallTimeline() {
                this.timelineKeyframes.push(this.timeline.addKeyframe(this.heroVideoEndframe, {
                    start: 0,
                    end: .5,
                    y: [null, "-5vh"],
                    opacity: [null, 0],
                    breakpointMask: "S",
                    disabledWhen: ["hero-static"]
                })), this.timelineKeyframes.push(this.timeline.addKeyframe(this.heroIntro, {
                    start: .6,
                    end: 1,
                    y: [null, 0],
                    opacity: [0, 1],
                    breakpointMask: "S",
                    disabledWhen: ["hero-static"]
                }))
            }

            createCardTimeline() {
                this.cardsTimeline = r.createTimeGroup(), this.cardsTimeline.name = "Hero - Triggered Row Timeline";
                const t = [];
                let e = "S" === this.currentBreakpoint ? .4 : .2, i = 0;
                this.cards.forEach((s, n) => {
                    const r = (n + 1) * e;
                    t.push(this.cardsTimeline.addKeyframe(s, {
                        start: i,
                        end: r,
                        y: [null, 0],
                        z: [0, 0],
                        opacity: [0, 1],
                        disabledWhen: ["hero-static"]
                    })), this.cardsTimeline.addKeyframe(s, {
                        start: i - .1,
                        end: r + .1,
                        cssClass: "will-change",
                        toggle: !0,
                        disabledWhen: ["hero-static"]
                    }), 0 === n && this.cardsTimeline.addEvent(s, {
                        start: r,
                        event: "played-first-card",
                        onEventOnce: () => this.firstCardPlayed(),
                        disabledWhen: ["hero-static"]
                    }), i = r
                });
                const s = this.cardInfo[this.currentBreakpoint];
                s && s.forEach((e, i) => {
                    this.cardsTimeline.addChapter({
                        position: t[e].jsonProps.end,
                        name: "row-".concat(this.currentBreakpoint, "-").concat(i + 1)
                    }), this.isRowPastTriggerPoint(e) ? this.cardsBuildInChapter = "row-".concat(this.currentBreakpoint, "-").concat(i + 1) : this.addDiscreteEvent({
                        event: "Hero Cards: Row ".concat(i + 1, " - ").concat(this.currentBreakpoint),
                        start: this.cardTriggerPointExpression,
                        anchors: [this.cards[e]],
                        onEventOnce: () => {
                            this.cardsTimeline.playToChapter({name: "row-".concat(this.currentBreakpoint, "-").concat(i + 1)})
                        },
                        disabledWhen: ["hero-static"]
                    })
                })
            }

            handleTallerViewport() {
                this.cardInfo[this.currentBreakpoint] && this.cardInfo[this.currentBreakpoint].forEach((t, e) => {
                    this.isRowPastTriggerPoint(t) && this.cardsTimeline.playToChapter({name: "row-".concat(this.currentBreakpoint, "-").concat(e + 1)})
                })
            }

            isRowPastTriggerPoint(t) {
                return o.parse(this.cardTriggerPointExpression, {
                    target: this.el,
                    anchors: [this.cards[t]]
                }) <= this.pageMetrics.scrollY
            }

            onResizeDebounced() {
                this.switchToFallback(), this.playCardsTimeline()
            }

            onBreakpointChange(t) {
                this.currentBreakpoint = t.breakpoint
            }

            playCardsTimeline() {
                this.cardsTimeline.timeScale(3), this.cardsTimeline.play()
            }

            switchToStatic() {
                this.isStatic = !0, document.documentElement.classList.add("hero-static")
            }

            static IS_SUPPORTED() {
                const t = !document.documentElement.classList.contains("base-experience") && !document.documentElement.classList.contains("aow");
                return h && !t && h.passiveTracker({eVar70: "{PAGE_NAME} - static"}), t
            }
        }
    }, {43: 43, 50: 50, 63: 63, 70: 70, 71: 71, undefined: void 0}],
    85: [function (t, e, i) {
        "use strict";
        const s = t(70);
        e.exports = class extends s {
            constructor(t) {
                super(t), this.videoLoaded = !1, this.videoEl = this.el.querySelector("video") || this.el, this.pauseRelativeTo = this.el.dataset.pauseRelativeTo || this.el, this.onMediaEnded = this._onMediaEnded.bind(this), this.onPlay = this._onPlay.bind(this)
            }

            mounted() {
                this.endFrame = this.el.querySelector("[data-video-endframe]"), this.startFrame = this.el.querySelector("[data-video-startframe]"), this.videoComponent = this.gum.getComponentOfType("VideoViewportSource", this.videoEl), this.videoComponent.video.addEventListener("ended", this.onMediaEnded), this.videoComponent.video.addEventListener("play", this.onPlay), this.videoKeyframe = this.addDiscreteEvent({
                    event: "Video: Play",
                    start: this.el.dataset.animStart || "a0t - 50vh",
                    end: this.el.dataset.animEnd || "a0b",
                    anchors: [this.pauseRelativeTo],
                    onEnter: () => {
                        this.videoComponent.queueVideoPlayback()
                    },
                    onExit: () => {
                        this.videoComponent.pauseVideoPlayback()
                    },
                    disabledWhen: ["base-experience"]
                })
            }

            _onMediaEnded() {
                this.hideVideo(), this.showEndFrame()
            }

            hideStartFrame() {
                this.startFrame && this.startFrame.classList.add("hide")
            }

            showEndFrame() {
                this.endFrame && this.endFrame.classList.remove("hide")
            }

            hideEndFrame() {
                this.endFrame && this.endFrame.classList.add("hide")
            }

            hideVideo() {
                this.videoComponent.video.classList.add("hide")
            }

            showVideo() {
                this.videoComponent.video.classList.remove("hide")
            }

            killVideoPlay() {
                this.hideVideo(), this.hideStartFrame(), this.videoComponent.pauseVideoPlayback(), this.videoComponent.video.removeEventListener("ended", this.onMediaEnded), this.videoComponent.video.removeEventListener("play", this.onPlay)
            }

            _onPlay() {
                this.videoLoaded = !0, this.hideStartFrame(), this.showVideo()
            }

            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("inline-video") && !document.documentElement.classList.contains("aow")
            }
        }
    }, {70: 70}],
    86: [function (t, e, i) {
        "use strict";
        const s = t(70);
        e.exports = class extends s {
            constructor(t) {
                super(t), this.localNav = document.querySelector("#ac-localnav")
            }

            initializeKeyframe() {
                this.addDiscreteEvent({
                    event: "Local Nav: Light Theme",
                    start: "a0t",
                    end: "a1t",
                    anchors: [this.el, ".section-faq"],
                    onEnter: () => {
                        this.addTheme()
                    },
                    onExit: () => {
                        this.removeTheme()
                    }
                })
            }

            mounted() {
                this.initializeKeyframe()
            }

            removeTheme() {
                this.localNav.classList.remove("theme-light")
            }

            addTheme() {
                this.localNav.classList.add("theme-light")
            }

            IS_SUPPORTED() {
                return !0
            }
        }
    }, {70: 70}],
    87: [function (t, e, i) {
        "use strict";
        const s = t(70);
        e.exports = class extends s {
            constructor(t) {
                super(t);
                const e = document.getElementById("main"), i = document.querySelector(".button-sticky"),
                    s = document.querySelector(".section-hero .card");
                this.anim.addKeyframe(e, {
                    start: "a0t - 100vh + 125px",
                    end: "a0t - 100vh + 125px + css(--button-offset-bottom, a1)",
                    snapAtCreation: !0,
                    breakpointMask: "S",
                    anchors: [s, i],
                    ease: .3,
                    transY: [0, "css(--button-offset-bottom, a1) * -1"]
                }).controller.on("draw", t => {
                    i.style.transform = "translateY(".concat(t.tweenProps.transY.current, "px)")
                }), this.addDiscreteEvent({
                    el: e,
                    start: "a0b - 100vh + css(--getstarted-space, a1) * -1",
                    anchors: [".section-discover", this.el],
                    breakpointMask: "S",
                    event: "Sticky Button:Button Style",
                    onEvent: () => this.el.classList.remove("sticking"),
                    onEventReverse: () => this.el.classList.add("sticking")
                }), this.showStickyButton = this.showStickyButton.bind(this), window.addEventListener("card-one-played-small", this.showStickyButton)
            }

            showStickyButton() {
                this.el.classList.add("show"), window.removeEventListener("card-one-played-small", this.showStickyButton)
            }

            static IS_SUPPORTED() {
                return !document.documentElement.classList.contains("base-experience") && !document.documentElement.classList.contains("aow")
            }
        }
    }, {70: 70}],
    88: [function (t, e, i) {
        "use strict";
        const s = t(70);
        e.exports = class extends s {
            constructor(t) {
                super(t), this.animStart = this.el.dataset.animStart || "a0t - 90vh", this.animEnd = this.el.dataset.animEnd || "a0b", this.breakpointMask = this.el.dataset.breakpointMask || "SMLX", this.anchors = this.el.dataset.anchors ? JSON.parse(this.el.dataset.anchors) : [this.el]
            }

            mounted() {
                this._initialize()
            }

            _initialize() {
                this._onTileEnter = this._onTileEnter.bind(this), this._onWillChangeEnter = this._onWillChangeEnter.bind(this), this._onWillChangeExit = this._onWillChangeExit.bind(this), this.addDiscreteEvent({
                    start: this.animStart,
                    end: this.animEnd,
                    anchors: this.anchors,
                    breakpointMask: this.breakpointMask,
                    event: "triggered-animation",
                    onEnterOnce: this._onTileEnter
                }), this.addDiscreteEvent({
                    start: "".concat(this.animStart, " - 2vh"),
                    end: "".concat(this.animEnd, " + 2vh"),
                    anchors: this.anchors,
                    breakpointMask: this.breakpointMask,
                    event: "animation-will-change",
                    onEnterOnce: this._onWillChangeEnter,
                    onExitOnce: this._onWillChangeExit
                })
            }

            _onTileEnter() {
                this.el.classList.add("animate")
            }

            _onWillChangeEnter() {
                this.el.classList.add("will-change")
            }

            _onWillChangeExit() {
                this.el.classList.remove("will-change")
            }

            static IS_SUPPORTED() {
                return !document.documentElement.classList.contains("base-experience")
            }
        }
    }, {70: 70}],
    89: [function (t, e, i) {
        "use strict";
        const s = t(70), n = t(77), r = t(90);
        e.exports = class extends s {
            constructor(t) {
                let e;
                super(t), this.video = this.el, this.options = t.data || {}, this.sources = {}, this.enableRetina = this.video.hasAttribute("data-enable-retina"), Object.entries(this.video.dataset).filter(([t]) => 0 === t.indexOf("src")).forEach(([t, e]) => {
                    const i = t.replace(/^src/, "").toLowerCase();
                    this.sources[i] = e
                }), Object.defineProperty(this, "currentViewport", {
                    set: t => {
                        e = r(t), this.load(e)
                    }, get: () => e
                }), this.currentViewport = t.pageMetrics.breakpoint, this.previousSource = null, this.inLoadArea = !1, this.enableRetina && (this.isRetina = n._retina, n.on("change:retina", t => {
                    this.isRetina = !0 === t.to, this.load(this.currentViewport)
                }))
            }

            mounted() {
                this.addDiscreteEvent({
                    event: "Video: Load", start: "t - 200vh", end: "b + 100vh", onEnter: () => {
                        this.inLoadArea = !0, this.load()
                    }, onExit: () => {
                        this.inLoadArea = !1
                    }
                })
            }

            onBreakpointChange(t) {
                this.currentViewport = t.breakpoint
            }

            load(t) {
                if (!this.inLoadArea) return;
                t = t || this.currentViewport;
                const e = this.isRetina ? this.sources[t].replace(".mp4", "_2x.mp4") : this.sources[t];
                e && e !== this.previousSource && (this.video.autoplay = this.video.readyState >= 3 && !this.video.paused, this.video.src = this.previousSource = e, this.video.load())
            }

            queueVideoPlayback() {
                "function" == typeof this._onCanPlay && this.video.removeEventListener("canplay", this._onCanPlay), this.video.readyState < 3 ? (this._onCanPlay = () => {
                    this.video.play(), this.video.removeEventListener("canplay", this._onCanPlay)
                }, this.video.addEventListener("canplay", this._onCanPlay)) : this.video.play()
            }

            pauseVideoPlayback() {
                this.video.paused || this.video.pause()
            }

            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("inline-video") && !document.documentElement.classList.contains("aow")
            }
        }
    }, {70: 70, 77: 77, 90: 90}],
    90: [function (t, e, i) {
        "use strict";
        e.exports = t => ({X: "xlarge", L: "large", M: "medium", S: "small"}[t])
    }, {}],
    91: [function (t, e, i) {
        "use strict";
        const s = t(5), n = t(71), r = t(72), a = t(41), o = t(50), h = t(92);
        Object.assign(r, h);
        new n(document.querySelector(".main")).anim.on(o.EVENTS.ON_DOM_GROUPS_CREATED, () => {
            new a
        }), function () {
            let e, i;
            try {
                e = t("@marcom/data-relay")
            } catch (t) {
            }
            e && (i = new e)
        }(), s.detect()
    }, {41: 41, 5: 5, 50: 50, 71: 71, 72: 72, 92: 92, undefined: void 0}],
    92: [function (t, e, i) {
        "use strict";
        e.exports = {
            VideoViewportSource: t(89),
            InlineVideo: t(85),
            TriggerAnimation: t(88),
            Hero: t(84),
            Accordion: t(83),
            LocalNavThemeSwitcher: t(86),
            StickyButton: t(87)
        }
    }, {83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89}]
}, {}, [91]);