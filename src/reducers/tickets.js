import { FETCH_TICKETS_START, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE } from "../actions/tickets";

const initialState = {
    tickets: [],
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
        default: 
            return state;
    }
}