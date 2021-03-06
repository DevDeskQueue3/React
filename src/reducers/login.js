import {
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    ADD_USER_ROLE,
    CLEAR_ERROR
} from "../actions/login";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
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
                error: {}
            };
        case FETCH_LOGIN_FAILURE: 
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        case ADD_USER_ROLE: 
            return {
                ...state,
                user: {
                    ...state.user,
                    roles: action.payload.roles
                }
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: {}
            }
        default: 
            return state;
    }
}