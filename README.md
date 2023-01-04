# Formik + Redux
Combines the performance of Formik with the state control of Redux

## How it works
The start and stop of the form submit, is controlled by de redux state while all the other features is controlled by Formik

When you submit your form, you should:
```javascript
import { compose } from "redux";
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

## Motivation
Redux-form has became too much complex and lacks performance, in the other hand, Formik is much more simple and has better performance because every *keystroke* doesn't trigger a render event in every component. But it's not that simple to control the form submit with Formik. When you use, `redux-saga`, for instance, you won't be able to control the form from there.
So here we are, dispatching actions now can trigger the Formik submit.

## Getting Started

### Prerequisites
- `formik@2.x`
- `react@16.x || 17.x || 18.x`
- `react-redux@7`
- `redux@4`

### Install
```
npm install --save formik-redux
```

### Usage
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

#### HOC
In your form component, use the hoc:
```javascript
import { withForm } from "formik-redux";

const DummyForm = props => <form onSubmit={ props.handleSubmit }></form>;

export default withForm({ form: "heygoodlooking" })( DummyForm );
```
You `must` pass the form prop. All the other props will be passed to Formik (see [docs](https://formik.org/docs/api/withFormik) for more details).

To indicate to redux that the submit started or stopped, you must dispatch the appropriate action.

```javascript
import { startSubmit, stopSubmit, withForm } from "formik-redux";
import { connect } from "react-redux";
import { compose } from "recompose";

const FORM_NAME = "myBeautifulForm";

const DummyForm = ({ handleSubmit, submitting }) => (
    <form onSubmit={ handleSubmit }>
        <button type="submit" disabled={ submitting }></button>
    </form>
);

async function onSubmit ( values, { props } ) {
    await props.dispatch( startSubmit( FORM_NAME ) );
    await props.dispatch( stopSubmit( FORM_NAME ) );
};

export default compose(
    connect( null, {
        startSubmit,
        stopSubmit
    }),
    withForm({
        form: FORM_NAME,
        handleSubmit: onSubmit
    })
)( DummyForm );
```

As you can see in the example above, is injected the prop `submitting` in the component to indicate if the submit finished or not.

##### Submit error
If there was some problem in the submit, to pass the error, you should use the second argument of the `stopSubmit` action.

```javascript
const DummyForm = ({ handleSubmit, error, submitting }) => (
    <form onSubmit={ handleSubmit }>
        <button type="submit" disabled={ submitting }></button>
        { error && <span>{ error }</span> }
    </form>
);

async function onSubmit ( values, { props } ) {
    await props.dispatch( stopSubmit( FORM_NAME, "Something went wrong" ) );
};
```

In the component will be injected the prop `error`.

#### Hook
To use the hook, you must import `useForm` and pass the prop `form`.

```javascript
import { useForm } from "formik-redux";

const FORM_NAME = "foobar";

const DummyForm = () => {
    const { error, submitting, ...formikProps } = useForm({
        form: FORM_NAME,
        // ...form props of Formik
    });
};

```

The hook will return the props `error`, `submitting` and the other formik props (see [docs](https://formik.org/docs/api/useFormik) for more details).