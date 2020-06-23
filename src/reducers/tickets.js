import { FETCH_TICKETS_START, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE, SET_LOGGEDUSER_ROLE, CREATE_TICKET, UPDATE_TICKETS, DELETE_TICKET } from "../actions/tickets";

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
        case CREATE_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                error: {}
            };
        case UPDATE_TICKETS:
            return {
                ...state,
                tickets: state.tickets.map(ticket => {
                    if(ticket.ticket_id === action.payload.ticket_id){
                        return action.payload;
                    }
                    return ticket;
                })
            };
        case DELETE_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket.ticket_id !== action.payload),
                error: {}
            }
        default: 
            return state;
    }
}