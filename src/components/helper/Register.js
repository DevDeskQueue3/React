import React from 'react';
import useForm from "../../hooks/useForm";
import axiosWithAuth from '../../utils/axiosWithAuth';
import * as MUI from "../../MaterialUI";

const Register = () => {
    const classes = MUI.useStyles();
    const error = "";
    const [helper, handleChanges] = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const postSignup = e => {
        e.preventDefault();

        const newHelper = {
            //name: helper.firstName + " " + helper.lastName,
            email: helper.email,
            password: helper.password
        }
        if(newHelper.email.length > 0) {
            axiosWithAuth()
            .post("/register", newHelper)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message, err.response));
        }
        
    }


    return (
        <div className = "login-container">
            <div className = "top-text">
            <h2>Helper Sign Up</h2>
                <p>Create an account and start helping.<br />
                    Not a helper? <a href = "#">Click Here</a>.</p>
            </div>

            <form onSubmit = {postSignup}>
                <div className = "input-group">
                    <div className = "name-group">
                        <MUI.TextField className = {classes.loginInput} error = {error} helperText = {error && error} id = "firstName" type = "text" name = "firstName" value = {helper.firstName} onChange = {handleChanges} label = "First Name" />

                        <MUI.TextField className = {classes.loginInput} error = {error} helperText = {error && error} id = "lastName" type = "text" name = "lastName" value = {helper.lastName} onChange = {handleChanges} label = "Last Name" />
                    </div>

                    <MUI.TextField className = {classes.loginInput} error = {error} helperText = {error && error} id = "email" type = "email" name = "email" value = {helper.email} onChange = {handleChanges} label = "Email Address" />

                    <MUI.TextField className = {classes.loginInput} error = {error} helperText = {error && error} id = "password" type = "password" name = "password" value = {helper.password} onChange = {handleChanges} label = "Password" />
                </div>

                <div className = "button-group">
                    <button type = "submit" disabled>Create Account</button>
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

export default Register;