import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginFormSchema } from "../../utils/loginFormValidation";
import { theme, ColorButton } from "../../MaterialUI/useStyles";

import * as MUI from '../../MaterialUI/index';

import './student.css';

import useForm from '../../hooks/useForm';
import { getToken, clearError } from '../../actions/login';
import { setLoggedUserRole } from '../../actions/tickets';

const initialValues = {
    email: '',
    password: ''
};

const StudentLogin = props => {
    const classes = MUI.useStyles();

    const dispatch = useDispatch();

    const { isFetching, error } = useSelector(state => state.login);
    const [loginError, setLoginError] = useState("");

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const [values, handleChanges, formErrors] = useForm(initialValues, loginFormSchema);

    useEffect(() => {
        loginFormSchema.isValid(values).then((valid) => {
            setButtonDisabled(!valid);
        });
    },[values]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newData = {
            email: values.email,
            password: values.password
        };

        dispatch(getToken(newData));
    };

    useEffect(() => {
        if(localStorage.getItem("token")) {
            const userData = JSON.parse(localStorage.getItem("user"));
            
            if(userData.roles.includes("STUDENT")){
                dispatch(setLoggedUserRole("STUDENT"));
                props.history.push("/tickets");
                setLoginError("");
            } else {
                setLoginError("Your account is not a student account, sign in using the helper link at the bottom.");
                localStorage.removeItem("token");
                localStorage.removeItem("user");

            }
            
        }
    }, [dispatch, isFetching, props.history]);

    useEffect(() => dispatch(clearError()), [dispatch]);

    return (
        <MUI.Container className='login-container'>
            <div className='top-text'>
                <h1>We're here to help.</h1>
                <p>Login to your account and we'll connect you with a Lambda School Helper.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <MUI.ThemeProvider theme={theme}>
                    <div className = "input-group">
                            <MUI.TextField 
                                className = {classes.loginInput}
                                id='email'
                                name='email'
                                onChange={handleChanges}
                                error={formErrors.email.length > 0}
                                value={values.email}
                                data-cy='email'
                                label='Email Address'
                                helperText={formErrors.email.length > 0 && <span data-cy='email-error'>{formErrors.email}</span>}
                                InputProps={{
                                    endAdornment: (
                                        <MUI.InputAdornment position='end'>
                                            <MUI.IconButton>
                                                <MUI.AccountCircle />
                                            </MUI.IconButton>
                                        </MUI.InputAdornment>
                                    )
                                }}
                            />
                            <MUI.TextField 
                                className = {classes.loginInput}
                                id='password'
                                name='password'
                                error={formErrors.password.length > 0}
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChanges}
                                data-cy='password'
                                label='Password'
                                helperText={formErrors.password.length > 0 && <span data-cy='password-error'>{formErrors.password}</span>}
                                InputProps={{
                                    endAdornment: (
                                        <MUI.InputAdornment position='end'>
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
                        error.code === 404 ? "No account found with that email address. Check your email and try again" : 
                        error.code === 401 ? "Email or Password is incorrect" :
                        error.message}</span>}
                        {loginError.length > 0 && <span className = "form-error">{loginError}</span>}

                    </div>

                    <div className = "button-group">
                        {isFetching ? <MUI.CircularProgress /> : <ColorButton  size="large" color="primary" type = "submit" disabled = {buttonDisabled}>Login</ColorButton>}
                    </div>

                    <Link to = "/student/signup">Don't have an account?</Link>

                </MUI.ThemeProvider>
            </form>
            <div className='divider'>or</div>
            <section className='login-links'>
                {/* <Link href='#'
                        target='_blank'
                        rel='noopener'
                >Connect using Slack</Link> */}
                <span>Lambda school employee? </span>
                <Link to='/helper/login'>Click here</Link>
            </section>
        </MUI.Container>
    );
};

export default StudentLogin;