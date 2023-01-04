import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reset } from "./actions";
import { isSubmitting, getSubmitError } from "./selectors";
import { usePrevious } from "./utils";

export const useForm = ({ form, ...props }) => {
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
        }
    }, [ error, submitting, prevSubmitting, resetState, formik ] );

    useEffect( () => {
        return resetState;
    }, [ resetState ] );

    return {
        ...formik,
        submitting,
        error,
    };
};

useForm.propTypes = {
    form: PropTypes.string.isRequired
};

export default { useForm };