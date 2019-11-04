export const isSubmitting = form => state =>
    state.formik && state.formik[ form ] ? state.formik[ form ].submitting : false;
export const getSubmitError = form => state =>
    state.formik && state.formik[ form ] && state.formik[ form ].error;