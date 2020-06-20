import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_TICKETS_START = "FETCH_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";

export const getTickets = () => dispatch => {
    dispatch({type: FETCH_TICKETS_START});

    axiosWithAuth()
        .get("/tickets")
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
                    code: err.response, 
                    message: err.message
                }
            })
        });
}