import { FormikProps, FormikConfig, FormikValues, useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reset } from "./actions";
import { isSubmitting, getSubmitError } from "./selectors";
import { usePrevious } from "./utils";

type UseFormProps< T > = FormikConfig< T > & {
    form: string;
    onSubmitSuccess?: () => void;
}

type UseFormValues< T > = FormikProps< T > & {
    submitting: boolean;
    error: string | undefined;
}

export function useForm< T extends FormikValues > ({ form, onSubmitSuccess, ...props }: UseFormProps< T > ): UseFormValues< T > {
    const dispatch = useDispatch();

    const formik = useFormik( props );

    const error = useSelector( getSubmitError( form ) );
    const submitting = useSelector( isSubmitting( form ) );

    const prevSubmitting = usePrevious( submitting );

    const resetState = useCallback( () => {
        dispatch( reset( form ) );
    }, [ form, dispatch ] );

    useEffect( () => {
        if ( prevSubmitting && !submitting && !error ) {
            formik.resetForm();
            resetState();
            onSubmitSuccess && onSubmitSuccess();
        }
    }, [ error, submitting, prevSubmitting, onSubmitSuccess, resetState, formik ] );

    useEffect( () => {
        return resetState;
    }, [ resetState ] );

    return {
        ...formik,
        submitting,
        error,
    };
}

export default { useForm };