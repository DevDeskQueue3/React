import React, { useState, useEffect } from 'react';
import useForm from "../../hooks/useForm";
import { loginFormSchema } from "../../utils/loginFormValidation";
import * as MUI from "../../MaterialUI";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../actions/login";

const initialValues = {
    email: "",
    password: ""
}
const Login = () => {
    const dispatch = useDispatch();

    const classes = MUI.useStyles();
    const [helper, handleChanges, formErrors] = useForm(initialValues, loginFormSchema);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        loginFormSchema.isValid(helper).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [helper])

    const postLogin = e => {
        e.preventDefault();

        console.log(helper)

        //dispatch(getToken(helper));
    }
    return (
        <div className = "login-container">
            <div className = "top-text">
            <h2>Helper Login</h2>
                <p>Login to your account and start Helping. <br />
                    Not a helper? <Link to = "/student/login">Click Here</Link>.</p>
            </div>

            <form onSubmit = {postLogin}>
                <div className = "input-group">
                    <MUI.TextField 
                        error = {formErrors.email.length > 0} 
                        helperText = {formErrors.email.length > 0 && formErrors.email} 
                        className = {classes.loginInput} 
                        id = "email" 
                        type = "email" 
                        name = "email" 
                        value = {helper.email} 
                        onChange = {handleChanges} 
                        label = "Email Address" 
                    />

                    <MUI.TextField 
                        error = {formErrors.password.length > 0} 
                        helperText = {formErrors.password.length > 0 && formErrors.password}
                        className = {classes.loginInput} 
                        id = "password" type = "password" 
                        name = "password" 
                        value = {helper.password} 
                        onChange = {handleChanges} 
                        label = "Password" 
                    />
                </div>
                
                <div className = "button-group">
                    <button type = "submit" disabled = {buttonDisabled}>Login</button>
                </div>

                <Link to = "/helper/signup">Don't have an account?</Link>

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