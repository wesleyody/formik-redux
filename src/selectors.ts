type FormikState = {
    formik: Record< string, any >
}

type AppState = FormikState & Record< string, any >;

export const isSubmitting = ( form: string ) => ( state: AppState ): boolean =>
    state.formik && state.formik[ form ] ? state.formik[ form ].submitting : false;
export const getSubmitError = ( form: string ) => ( state: AppState ): string | undefined =>
    state.formik && state.formik[ form ] && state.formik[ form ].error;