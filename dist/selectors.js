"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubmitError = exports.isSubmitting = void 0;

var isSubmitting = function isSubmitting(form) {
  return function (state) {
    return state.formik && state.formik[form] ? state.formik[form].submitting : false;
  };
};

exports.isSubmitting = isSubmitting;

var getSubmitError = function getSubmitError(form) {
  return function (state) {
    return state.formik && state.formik[form] && state.formik[form].error;
  };
};

exports.getSubmitError = getSubmitError;