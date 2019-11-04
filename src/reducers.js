import * as actions from "./actions";

export default function ( state = {}, action ) {
    switch ( action.type ) {
        case actions.START_SUBMIT:
            return {
                ...state,
                [ action.payload ]: {
                    submitting: true,
                    error: null
                }
            };
        case actions.STOP_SUBMIT:
            return {
                ...state,
                [ action.payload ]: {
                    submitting: false,
                    error: action.error
                }
            };
        case actions.RESET:
            return {
                ...state,
                [ action.payload ]: {
                    submitting: false,
                    error: null
                }
            };
        default:
            return state;
    }
}