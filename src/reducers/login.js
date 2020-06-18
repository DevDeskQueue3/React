import {
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE
} from "../actions/login";

const initialState = {
    user: {},
    isFetching: false,
    error: {}
}

export const login = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOGIN_START:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isFetching: false,
                error: ""
            };
        case FETCH_LOGIN_FAILURE: 
            return {
                ...state,
                error: action.payload,
                isFetching: false
            }
        default: 
            return state;
    }
}