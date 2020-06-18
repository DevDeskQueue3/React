import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginFormSchema } from "../../utils/loginFormValidation";
import { theme, ColorButton } from "../../MaterialUI/useStyles";

import * as MUI from '../../MaterialUI/index';
import * as Styles from '../../MaterialUI/useStyles';

import './student.css';

import * as yup from 'yup';

import useForm from '../../hooks/useForm';
import { getToken } from '../../actions/login';

const initialValues = {
    email: '',
    password: ''
};

const StudentLogin = () => {
    const classes = MUI.useStyles();

    const dispatch = useDispatch();

    const { isFetching, error } = useSelector(state => state.login);

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

    return (
        <>
            <MUI.Container className='login-container'>
                <div className='top-text'>
                    <h1>We're here to help.</h1>
                    <p>Login to your account and we'll connect you with a Lambda School Helper.</p>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <MUI.ThemeProvider theme={theme}>
                        <MUI.FormControl className={classes.margin}>
                            <MUI.InputLabel htmlFor='email'>Email Address</MUI.InputLabel>
                            <MUI.Input id='email'
                                name='email'
                                onChange={handleChanges}
                                value={values.email}
                                data-cy='email'
                                endAdornment={
                                    <MUI.InputAdornment position='end'>
                                        <MUI.IconButton>
                                            <MUI.AccountCircle />
                                        </MUI.IconButton>
                                    </MUI.InputAdornment>
                                }
                            />
                            {formErrors.email.length > 0 && <p data-cy='email-error'>{formErrors.email}</p>}
                        </MUI.FormControl>
                        <MUI.FormControl className={classes.margin}>
                            <MUI.InputLabel htmlFor='password'>Password</MUI.InputLabel>
                            <MUI.Input id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChanges}
                                data-cy='password'
                                endAdornment={
                                    <MUI.InputAdornment position='end'>
                                        <MUI.IconButton aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <MUI.Visibility /> : <MUI.VisibilityOff />}
                                        </MUI.IconButton>
                                    </MUI.InputAdornment>
                                }
                            />
                            {formErrors.password.length > 0 && <p data-cy='password-error'>{formErrors.password}</p>}
                        </MUI.FormControl>
                        {error.code && <span className = "form-error">{
                        error.code === 404 ? "No account found with that email address. Check your email and try again" : 
                        error.code === 401 ? "Email or Password is incorrect" :
                        error.message}</span>}
                        <div className = "button-group">
                            {isFetching ? <MUI.CircularProgress /> : <ColorButton size="large" color="primary" type = "submit" disabled = {buttonDisabled}>Login</ColorButton>}
                        </div>
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
        </>
    );
};

export default StudentLogin;