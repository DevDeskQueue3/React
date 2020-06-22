import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_TICKETS_START = "FETCH_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";
export const SET_LOGGEDUSER_ROLE = "SET_LOGGEDUSER_ROLE";

export const getTickets = (id = "") => dispatch => {
    dispatch({type: FETCH_TICKETS_START});

    axiosWithAuth()
        .get(`/tickets/${id}`)
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

export const setLoggedUserRole = role => dispatch => {
    dispatch({type: SET_LOGGEDUSER_ROLE, payload: role});
    localStorage.setItem("loggedUserRole", role);
}