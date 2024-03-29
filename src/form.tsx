import React from "react";
import { FormikProvider, FormikContextType } from "formik";

type FormProps< P > = Pick<
    React.FormHTMLAttributes< HTMLFormElement >,
    Exclude< keyof React.FormHTMLAttributes< HTMLFormElement >, "onReset" | "onSubmit" >
> & {
    children: React.ReactNode;
    formik: FormikContextType< P >;
};

function Form< P > ({ children, formik, ...props }: FormProps< P >) {
    const resetForm = React.useMemo( () => formik.resetForm, [ formik.resetForm ] );

    React.useEffect( () => {
        return () => {
            resetForm();
        };
    }, [ resetForm ] );

    return (
        <FormikProvider value={ formik }>
            <form onReset={ formik.handleReset } onSubmit={ formik.handleSubmit } { ...props }>
                { children }
            </form>
        </FormikProvider>
    );
};

export default Form;
