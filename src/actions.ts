export const START_SUBMIT = "@@formikRedux/START_SUBMIT";
export const startSubmit = ( form: string ) => ({
    type: START_SUBMIT,
    payload: form
});

export const STOP_SUBMIT = "@@formikRedux/STOP_SUBMIT";
export const stopSubmit = ( form: string, error: string | undefined ) => ({
    type: STOP_SUBMIT,
    payload: form,
    error
});

export const RESET = "@@formikRedux/RESET";
export const reset = ( form: string ) => ({
    type: RESET,
    payload: form
});