import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_TICKETS_START = "FETCH_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";
export const UPDATE_TICKETS = "UPDATE_TICKETS";
export const UPDATE_TICKETS_FAILURE = "UPDATE_TICKETS_FAILURE";
export const SET_LOGGEDUSER_ROLE = "SET_LOGGEDUSER_ROLE";

const filterByInitialValue = {
    status: ""
}

export const getTickets = (filterBy = filterByInitialValue) => dispatch => {
    dispatch({type: FETCH_TICKETS_START});

    
    axiosWithAuth()
        .get(`/tickets?status=${filterBy.status}`)
        .then(res => {
            // console.log(res.data);
            dispatch({
                type: FETCH_TICKETS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_TICKETS_FAILURE,
                payload: {
                    code: err.response.status, 
                    message: err.response.data.message
                }
            })
        });
}

export const createTicket = (ticket) => dispatch => {
    axiosWithAuth()
        .post("/tickets", ticket)
        .then(res => {
            console.log("createTicket action: res.data: ", res.data);
            dispatch({
                type: UPDATE_TICKETS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log({code: err.response.status, message: err.response.data.message})
            dispatch({
                type: UPDATE_TICKETS_FAILURE,
                payload: {code: err.response.status, message: err.response.data.message}
            });
        });
}

export const editTicket = ticket => dispatch => {
    axiosWithAuth()
        .put(`/tickets/${ticket.id}`, ticket)
        .then(res => {
            dispatch({
                type: UPDATE_TICKETS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log({code: err.response.status, message: err.response.data.message});
            dispatch({
                type: UPDATE_TICKETS_FAILURE,
                payload: {code: err.response.status, message: err.response.data.message}
            });
        });
}

export const deleteTicket = id => dispatch => {
    axiosWithAuth()
        .delete(`/tickets/${id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log({code: err.response.status, message: err.response.data.message});
        })
}

export const setLoggedUserRole = role => dispatch => {
    dispatch({type: SET_LOGGEDUSER_ROLE, payload: role});
    localStorage.setItem("loggedUserRole", role);
}