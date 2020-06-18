import {
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE
} from "../actions/login";

const initialState = {
    user: {
        id: 4,
        name: "Mannie Alvarez",
        email: "carlos.alvarezberrio@gmail.com",
        role: "HELPER",
        token: "$2a$08$bosi0lzAK4eOEiA3eBeyz.16KThu0rIQDRFjJ1CoB2ZmSmhokNfKK",
    },
    isFetching: false,
    error: {}
}

export const login = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_LOGIN_START:
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