import PropTypes from "prop-types";
import { withFormik } from "formik";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { reset } from "./actions";
import { isSubmitting, getSubmitError } from "./selectors";

const mapStateToProps = form => state => ({
    submitting: isSubmitting( form )( state ),
    error: getSubmitError( form )( state )
});

const mapDispatchToProps = form => dispatch => ({
    resetState () {
        dispatch( reset( form ) );
    }
});

const Hoc = ({ form, ...options }) => WrappedComponent => {

    class HocComponent extends PureComponent {

        componentDidUpdate ( prevProps ) {
            if ( prevProps.submitting && !this.props.submitting && !this.props.error ) {
                this.props.resetForm();
                this.props.resetState();
            }
        }

        componentWillUnmount () {
            this.props.resetState();
        }

        render () {

            return (
                <WrappedComponent { ...this.props }/>
            );
        }

    }

    return compose(
        connect( mapStateToProps( form ), mapDispatchToProps( form ) ),
        withFormik({ displayName: form, ...options })
    )( HocComponent );
};

Hoc.propTypes = {
    form: PropTypes.string.isRequired
};

export default Hoc;