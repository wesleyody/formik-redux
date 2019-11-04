export const START_SUBMIT = "@@formikRedux/START_SUBMIT";
export const startSubmit = form => ({
    type: START_SUBMIT,
    payload: form
});

export const STOP_SUBMIT = "@@formikRedux/STOP_SUBMIT";
export const stopSubmit = ( form, error ) => ({
    type: STOP_SUBMIT,
    payload: form,
    error
});