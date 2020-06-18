import React, { useState } from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, ...props}) => {
    const token = localStorage.getItem("token");
    const user = useState(() => {
        let item = localStorage.getItem("user");
        return item ? JSON.parse(item) : null
    });

    
    
    return (
        <Route {...props} render = {props => {
            if(token) {
                return <Component {...props} user = {user} />
            }
            return <Redirect to = "/student/login" />
        }} />
    );
};

export default PrivateRoute;