webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/House.js":
/*!*****************************!*\
  !*** ./components/House.js ***!
  \*****************************/
/*! exports provided: House */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "House", function() { return House; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/hamadoudiallo/Desktop/airbnbClone/components/House.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

var House = function House() {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, "House"));
};

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _houses_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./houses.json */ "./pages/houses.json");
var _houses_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./houses.json */ "./pages/houses.json", 1);
/* harmony import */ var _components_House__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/House */ "./components/House.js");

var _jsxFileName = "/Users/hamadoudiallo/Desktop/airbnbClone/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



var Index = function Index() {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, "Houses to stay"), __jsx("div", {
    className: "houses",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, _houses_json__WEBPACK_IMPORTED_MODULE_2__.map(function (house) {
    return __jsx(_components_House__WEBPACK_IMPORTED_MODULE_3__["House"], Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      key: idx
    }, _houses_json__WEBPACK_IMPORTED_MODULE_2__, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: this
    }));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.125f874655595d91de5a.hot-update.js.map