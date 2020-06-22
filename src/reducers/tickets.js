import { FETCH_TICKETS_START, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE, SET_LOGGEDUSER_ROLE } from "../actions/tickets";

const initialState = {
    tickets: [],
    loggedUserRole: "",
    isFetching: false,
    error: {}
}

export const tickets = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TICKETS_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                tickets: action.payload,
                isFetching: false,
                error: {}
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case SET_LOGGEDUSER_ROLE: {
            return {
                ...state,
                loggedUserRole: action.payload,
            }
        }
        default: 
            return state;
    }
}