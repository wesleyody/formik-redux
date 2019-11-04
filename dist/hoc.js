"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formik = require("formik");

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _selectors = require("./selectors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapStateToProps = function mapStateToProps(state, props) {
  console.log(state);
  return {
    submitting: (0, _selectors.isSubmitting)(props.form)(state),
    error: (0, _selectors.getSubmitError)(props.form)(state)
  };
};

var Hoc = function Hoc(options) {
  return function (WrappedComponent) {
    return (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), (0, _formik.withFormik)(_objectSpread({
      displayName: options.form
    }, options)))(WrappedComponent);
  };
};

var _default = Hoc;
exports["default"] = _default;