import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_LOGIN_START = "FETCH_LOGIN_START";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";

export const getToken = user => dispatch => {
    dispatch({type: FETCH_LOGIN_START});

    const url = user.role ? "/register" : "/login";

    axiosWithAuth()
        .post(url, user)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: FETCH_LOGIN_SUCCESS,
                payload: res.data
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(err => {
            //console.log(err.message, err.response.data);
            dispatch({
                type: FETCH_LOGIN_FAILURE,
                payload: {
                    code: err.response.status, 
                    message: err.response.data.message
                }
            });
        });
}