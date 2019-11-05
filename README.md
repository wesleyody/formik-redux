# Formik + Redux
Combines the performance of Formik with the state control of Redux

## How it works
The start and stop of the form submit, is controlled by de redux state while all the other features is controlled by Formik

When you submit your form, you should:
```javascript
import { compose } from "recompose";
import { connect } from "react-redux";
import { startSubmit, stopSubmit, withForm } from "formik-redux";

const FORM_NAME = "yourForm";

export const mapDispatchToProps = dispatch => ({
    onSubmit () {
        dispatch( startSubmit( FORM_NAME ) );
    },
    onSubmitSuccess () {
        dispatch( stopSubmit( FORM_NAME ) );
    }
});

const DummyForm = props => <div { ...props }/>;

export default compose(
    connect( null, mapDispatchToProps ),
    withForm({
        form: FORM_NAME, //required
        handleSubmit: ( values, { onSubmit, submitSuccess } ) => {
            onSubmit();
            onSubmitSuccess();
        },
        // ...form props of Formik
    })
)( DummyForm );
```
This examples uses [recompose](https://github.com/acdlite/recompose)

## Motivation
Redux-form has became too much complex and lacks performance, in the other hand, Formik is much more simple and has better performance because every *keystroke* doesn't trigger a render event in every component. But it's not that simple to control the form submit with Formik. When you use, `redux-saga`, for instance, you won't be able to control the form from there.
So here we are, dispatching actions now can trigger the Formik submit.

## Getting Started

#### Install
```
npm install --save formik-redux
```
*You must have installed `react@16.x`.*

#### Usage
In your root reducer, you must add our reducer:
```javascript
import { reducer as formik } from "formik-redux"; // it must be formik the reducer name
import { combineReducers } from "redux";

import { otherReducer } from "./reducers";

export const appReducer = combineReducers({
    formik,
    otherReducer
});
```

In your form component, use the hoc:
```javascript
import { withForm } from "formik-redux";

const DummyForm = props => <form onSubmit={ props.handleSubmit }></form>;

export default withForm({ form: "heygoodlooking" })( DummyForm );
```
You `must` pass the form prop. All the other props will be passed to Formik (see [docs](https://jaredpalmer.com/formik/docs/api/withFormik) for more details).
