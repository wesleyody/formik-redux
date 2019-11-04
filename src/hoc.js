import PropTypes from "prop-types";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { compose } from "recompose";

import { isSubmitting, getSubmitError } from "./selectors";

const mapStateToProps = form => state => ({
    submitting: isSubmitting( form )( state ),
    error: getSubmitError( form )( state )
});

const Hoc = options => WrappedComponent => {
    return compose(
        connect( mapStateToProps( options.form ) ),
        withFormik({ displayName: options.form, ...options })
    )( WrappedComponent );
};

Hoc.propTypes = {
    form: PropTypes.string.isRequired
};

export default Hoc;