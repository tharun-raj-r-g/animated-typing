"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AnimatedTyping;
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function AnimatedTyping(_ref) {
  var _ref$text = _ref.text,
    text = _ref$text === void 0 ? [] : _ref$text,
    onComplete = _ref.onComplete;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    typedText = _useState2[0],
    setTypedText = _useState2[1];
  var _useState3 = (0, _react.useState)('transparent'),
    _useState4 = _slicedToArray(_useState3, 2),
    cursorColor = _useState4[0],
    setCursorColor = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    messageIndex = _useState6[0],
    setMessageIndex = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    textIndex = _useState8[0],
    setTextIndex = _useState8[1];
  var timeoutsRef = (0, _react.useRef)({});
  var textRef = (0, _react.useRef)('');
  var cursorColorRef = (0, _react.useRef)(cursorColor);
  var messageIndexRef = (0, _react.useRef)(messageIndex);
  var textIndexRef = (0, _react.useRef)(textIndex);
  (0, _react.useEffect)(function () {
    textRef.current = typedText;
    cursorColorRef.current = cursorColor;
    messageIndexRef.current = messageIndex;
    textIndexRef.current = textIndex;
  });
  var _typingAnimation = function typingAnimation() {
    var currentMessage = text[messageIndexRef.current];
    if (textIndexRef.current < currentMessage.length) {
      setTypedText(textRef.current + currentMessage.charAt(textIndexRef.current));
      setTextIndex(function (prev) {
        return prev + 1;
      });
      timeoutsRef.current.typingTimeout = setTimeout(_typingAnimation, 50);
    } else if (messageIndexRef.current + 1 < text.length) {
      setMessageIndex(function (prev) {
        return prev + 1;
      });
      setTextIndex(0);
      timeoutsRef.current.firstNewLineTimeout = setTimeout(function () {
        setTypedText(function (prev) {
          return prev + '\n';
        });
      }, 120);
      timeoutsRef.current.secondNewLineTimeout = setTimeout(function () {
        setTypedText(function (prev) {
          return prev + '\n';
        });
      }, 200);
      timeoutsRef.current.typingTimeout = setTimeout(_typingAnimation, 280);
    } else {
      clearInterval(timeoutsRef.current.cursorTimeout);
      setCursorColor('transparent');
      if (onComplete) onComplete();
    }
  };
  var cursorAnimation = function cursorAnimation() {
    setCursorColor(function (prev) {
      return prev === 'transparent' ? '#8EA960' : 'transparent';
    });
  };
  (0, _react.useEffect)(function () {
    timeoutsRef.current.typingTimeout = setTimeout(_typingAnimation, 500);
    timeoutsRef.current.cursorTimeout = setInterval(cursorAnimation, 250);
    return function () {
      clearTimeout(timeoutsRef.current.typingTimeout);
      clearTimeout(timeoutsRef.current.firstNewLineTimeout);
      clearTimeout(timeoutsRef.current.secondNewLineTimeout);
      clearInterval(timeoutsRef.current.cursorTimeout);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("pre", {
    style: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16
    }
  }, typedText, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      color: cursorColor
    }
  }, "|"));
}