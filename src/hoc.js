import { withFormik } from "formik";
import { connect } from "react-redux";
import { compose } from "recompose";

import { isSubmitting, getSubmitError } from "./selectors";

const mapStateToProps = ( state, props ) => ({
    isSubmitting: isSubmitting( props.form )( state ),
    error: getSubmitError( props.form )( state )
});

const Hoc = options => WrappedComponent => {
    return compose(
        connect( mapStateToProps ),
        withFormik({ displayName: options.form, ...options })
    )( WrappedComponent );
};

export default Hoc;