import { withFormik } from "formik";
import { connect } from "react-redux";
import { compose } from "recompose";

import { isSubmitting, getSubmitError } from "./selectors";

const mapStateToProps = form => state => {
    return ({
        submitting: isSubmitting( form )( state ),
        error: getSubmitError( form )( state )
    });
};

const Hoc = options => WrappedComponent => {
    return compose(
        connect( mapStateToProps( options.form ) ),
        withFormik({ displayName: options.form, ...options })
    )( WrappedComponent );
};

export default Hoc;