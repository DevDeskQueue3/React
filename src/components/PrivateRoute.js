import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, ...props}) => {
    return (
        <Route {...props} render = {props => {
            if(localStorage.getItem("devdesk-auth")) {
                return <Component {...props} />
            }
            return <Redirect to = "/student/login" />
        }} />
    );
};

export default PrivateRoute;