"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.RESET = exports.stopSubmit = exports.STOP_SUBMIT = exports.startSubmit = exports.START_SUBMIT = void 0;
var START_SUBMIT = "@@formikRedux/START_SUBMIT";
exports.START_SUBMIT = START_SUBMIT;

var startSubmit = function startSubmit(form) {
  return {
    type: START_SUBMIT,
    payload: form
  };
};

exports.startSubmit = startSubmit;
var STOP_SUBMIT = "@@formikRedux/STOP_SUBMIT";
exports.STOP_SUBMIT = STOP_SUBMIT;

var stopSubmit = function stopSubmit(form, error) {
  return {
    type: STOP_SUBMIT,
    payload: form,
    error: error
  };
};

exports.stopSubmit = stopSubmit;
var RESET = "@@formikRedux/RESET";
exports.RESET = RESET;

var reset = function reset(form) {
  return {
    type: RESET,
    payload: form
  };
};

exports.reset = reset;