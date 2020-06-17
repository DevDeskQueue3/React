import React from 'react';
import useForm from "../../hooks/useForm";
import axiosWithAuth from '../../utils/axiosWithAuth';

const Login = () => {
    const [helper, handleChanges] = useForm({email: "", password: ""});

    const postLogin = e => {
        e.preventDefault();

        axiosWithAuth()
            .post("/login", helper)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message, err.response.data));
    }
    return (
        <div className = "helper-login-container">
            <h2>Helper Login</h2>
            <p>Login to your account and start Helping.</p>
            <p>Not a helper? <a href = "#">Click Here</a>.</p>

            <form onSubmit = {postLogin}>
                <label htmlFor = "email">Email Address</label>
                <input id = "email" type = "email" name = "email" value = {helper.email} onChange = {handleChanges} placeholder = "Email Address" />

                <label htmlFor = "password">Password</label>
                <input id = "password" type = "password" name = "password" value = {helper.password} onChange = {handleChanges} placeholder = "Password" />

                <button type = "submit">Login</button>

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