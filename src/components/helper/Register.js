import React, { useState, useEffect } from 'react';
import useForm from "../../hooks/useForm";
import { registerFormSchema } from "../../utils/loginFormValidation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../actions/login";
import * as MUI from "../../MaterialUI";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const Register = () => {
    const dispatch = useDispatch();

    const classes = MUI.useStyles();
    const [helper, handleChanges, formErrors] = useForm(initialValues, registerFormSchema);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        registerFormSchema.isValid(helper).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [helper])
    

    const postSignup = e => {
        e.preventDefault();

        const newHelper = {
            name: helper.firstName + " " + helper.lastName,
            email: helper.email,
            password: helper.password,
            role: "HELPER"
        }

        console.log(newHelper);

        //dispatch(getToken(newHelper));
        
    }


    return (
        <div className = "login-container">
            <div className = "top-text">
            <h2>Helper Sign Up</h2>
                <p>Create an account and start helping.<br />
                    Not a helper? <Link to = "/student/signup">Click Here</Link>.</p>
            </div>

            <form onSubmit = {postSignup}>
                <div className = "input-group">
                    <div className = "name-group">
                        <MUI.TextField 
                            className = {classes.loginInput} 
                            error = {formErrors.firstName.length > 0} 
                            helperText = {formErrors.firstName.length > 0 && formErrors.firstName} 
                            id = "firstName" 
                            type = "text" 
                            name = "firstName" 
                            value = {helper.firstName} 
                            onChange = {handleChanges} 
                            label = "First Name" 
                        />

                        <MUI.TextField 
                            className = {classes.loginInput}
                            error = {formErrors.lastName.length > 0} 
                            helperText = {formErrors.lastName.length > 0 && formErrors.lastName}
                            id = "lastName" 
                            type = "text" 
                            name = "lastName" 
                            value = {helper.lastName} 
                            onChange = {handleChanges} 
                            label = "Last Name" 
                        />
                    </div>

                    <MUI.TextField 
                        className = {classes.loginInput} 
                        error = {formErrors.email.length > 0} 
                        helperText = {formErrors.email.length > 0 && formErrors.email} 
                        id = "email" 
                        type = "email" 
                        name = "email" 
                        value = {helper.email} 
                        onChange = {handleChanges} 
                        label = "Email Address" 
                    />

                    <MUI.TextField 
                        className = {classes.loginInput} 
                        error = {formErrors.password.length > 0} 
                        helperText = {formErrors.password.length > 0 && formErrors.password} 
                        id = "password" 
                        type = "password" 
                        name = "password" 
                        value = {helper.password} 
                        onChange = {handleChanges} 
                        label = "Password" 
                    />
                </div>

                <div className = "button-group">
                    <button type = "submit" disabled = {buttonDisabled}>Create Account</button>
                </div>

                <Link to = "/helper/login">Already have an account?</Link>

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