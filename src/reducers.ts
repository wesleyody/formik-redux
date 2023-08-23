import * as actions from "./actions";

type Action = {
    type: string;
    payload: string;
    error: string | undefined;
}

export default function ( state = {}, action: Action ) {
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