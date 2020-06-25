import axiosWithAuth from "../utils/axiosWithAuth";

export const FETCH_LOGIN_START = "FETCH_LOGIN_START";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";
export const ADD_USER_ROLE = "ADD_USER_ROLE";
export const CLEAR_ERROR = "CLEAR_ERROR";

export const getToken = user => dispatch => {
    dispatch({type: FETCH_LOGIN_START});

    const url = user.roles ? "register" : "login";

    axiosWithAuth()
        .post(`/auth/${url}`, user)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: FETCH_LOGIN_SUCCESS,
                payload: res.data
            });
            localStorage.setItem("devdesk-auth", res.data.token);
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

export const addUserRole = user => dispatch => {
    const userData = JSON.parse(localStorage.getItem("user"));

    axiosWithAuth()
        .put(`/users/${user.id}`, user)
        .then(res => {
            dispatch({
                type: ADD_USER_ROLE,
                payload: res.data
            });

            localStorage.setItem("user", JSON.stringify({
                ...userData,
                roles: user.roles
            }));
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

export const clearError = () => dispatch => {
    dispatch({type: CLEAR_ERROR});
}