import React, { useState, useEffect } from 'react';
import useForm from "../../hooks/useForm";
import { registerFormSchema } from "../../utils/loginFormValidation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, clearError } from "../../actions/login";
import * as MUI from "../../MaterialUI";
import { theme, ColorButton } from "../../MaterialUI/useStyles";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const Register = props => {
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.login);

    const classes = MUI.useStyles();
    const [helper, handleChanges, formErrors] = useForm(initialValues, registerFormSchema);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

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

        dispatch(getToken(newHelper));
        
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if(localStorage.getItem("token")) {
            props.history.push("/tickets");
        }
    }, [isFetching, props.history]);

    useEffect(() => dispatch(clearError()), [dispatch]);

    return (
        <div className = "login-container">
            <div className = "top-text">
            <h1>Helper Sign Up</h1>
                <p>Create an account and start helping.<br />
                    Not a helper? <Link to = "/student/signup">Click Here</Link>.</p>
            </div>

            <form onSubmit = {postSignup}>
                <MUI.ThemeProvider theme = {theme}>
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
                        type = {showPassword ? "text" : "password"} 
                        name = "password" 
                        value = {helper.password} 
                        onChange = {handleChanges} 
                        label = "Password" 
                        InputProps = {{
                            endAdornment: (
                                <MUI.InputAdornment position = "end">
                                    <MUI.IconButton aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <MUI.Visibility /> : <MUI.VisibilityOff />}
                                        </MUI.IconButton>
                                </MUI.InputAdornment>
                            )
                        }}
                    />

                    {error.code && <span className = "form-error">{
                        error.code === 500 ? "Email Account already exists" : 
                        error.message}</span>}
                </div>
                

                <div className = "button-group">
                    {isFetching ? <MUI.CircularProgress /> : <ColorButton size="large" color="primary" type = "submit" disabled = {buttonDisabled}>Create Account</ColorButton>}
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
                </MUI.ThemeProvider>
            </form>
        </div>
    );
};

export default Register;