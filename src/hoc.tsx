import React from "react";
import { FormikProps, FormikValues, withFormik, WithFormikConfig } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { reset } from "./actions";
import { isSubmitting, getSubmitError } from "./selectors";
import { usePrevious } from "./utils";

interface HocProps< Props, Values extends FormikValues = FormikValues, DeprecatedPayload = Values > extends WithFormikConfig< Props, Values, DeprecatedPayload > {
    form: string;
}

type InjectedProps< T extends FormikValues > = FormikProps< T > & {
    submitting: boolean;
    error: string | undefined;
};

function withForm< T extends object, Values extends FormikValues, Payload = Values > ( formProps: HocProps< T, Values, Payload > ) {
    return ( WrappedComponent: React.ComponentType< InjectedProps< Values > > ) => {
        const { form, ...options } = formProps;

        const Component = ( props: FormikProps< Values > ) => {
            const dispatch = useDispatch();

            const submitting = useSelector( isSubmitting( form ) );
            const error = useSelector( getSubmitError( form ) );
            const { resetForm } = props;

            const prevSubmitting = usePrevious( submitting );

            const handleReset = React.useCallback( () => {
                dispatch( reset( form ) );
                resetForm();
            }, [ dispatch, resetForm ] );

            React.useEffect( () => {
                if ( prevSubmitting && !submitting && !error ) {
                    handleReset();
                }
            }, [ prevSubmitting, submitting, error, handleReset ] );
            React.useEffect( () => {
                return () => {
                    handleReset();
                };
            }, [ handleReset ] );

            return <WrappedComponent { ...props } submitting={ submitting } error={ error } />;
        };
        return withFormik({ displayName: form, ...options })( Component );
    };
}

export default withForm;