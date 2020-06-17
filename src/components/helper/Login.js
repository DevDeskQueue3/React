import React from 'react';
import useForm from "../../hooks/useForm";
import axiosWithAuth from '../../utils/axiosWithAuth';
import * as MUI from "../../MaterialUI";

const Login = () => {
    const classes = MUI.useStyles();
    const [helper, handleChanges] = useForm({email: "", password: ""});
    const error = "";

    const postLogin = e => {
        e.preventDefault();

        axiosWithAuth()
            .post("/login", helper)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message, err.response.data));
    }
    return (
        <div className = "login-container">
            <div className = "top-text">
            <h2>Helper Login</h2>
                <p>Login to your account and start Helping. <br />
                    Not a helper? <a href = "#">Click Here</a>.</p>
            </div>

            <form onSubmit = {postLogin}>
                <div className = "input-group">
                    <MUI.TextField error = {error} helperText = {error && error} className = {classes.loginInput} id = "email" type = "email" name = "email" value = {helper.email} onChange = {handleChanges} label = "Email Address" />

                    <MUI.TextField error = {error} helperText = {error && error} className = {classes.loginInput} id = "password" type = "password" name = "password" value = {helper.password} onChange = {handleChanges} label = "Password" />
                </div>
                
                <div className = "button-group">
                    <button type = "submit" disabled>Login</button>
                </div>
                {/* 
                    //Stretch to add Slack login

                    <div className = "login-divider">
                        <div className = "line" />
                        <span>or</span>
                        <div className = "line" />
                    </div>

                    <a href = "#">Connect using Slack</a>
                */}
            </form>
        </div>
    );
};

export default Login;