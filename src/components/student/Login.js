import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import * as MUI from '../../MaterialUI/index';
import * as Styles from '../../MaterialUI/useStyles';

import { orange } from '@material-ui/core/colors';

import './student.css';

import * as yup from 'yup';

import useForm from '../../hooks/useForm';

const StudentLogin = () => {
    const classes = MUI.useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const formSchema = yup.object().shape({
        email: yup.string().email("Value is not a valid email address").required("Email is a required field"),
        password: yup.string().required("Password is a required field")
    });

    const { values, handleChanges, formErrors} = useForm(loginData, formSchema);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = () => {

    };

    return (
        <>
            <MUI.Container className='login-container'>
                <div className='top-text'>
                    <h1>We're here to help.</h1>
                    <p>Login to your account and we'll connect you with a Lambda School Helper.</p>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <MUI.ThemeProvider theme={Styles.theme}>
                        <MUI.FormControl className={classes.margin}>
                            <MUI.InputLabel htmlFor='email-input'>Email Address</MUI.InputLabel>
                            <MUI.Input id='email-input'
                                onChange={handleChanges}
                                value={values.email}
                                endAdornment={
                                    <MUI.InputAdornment position='end'>
                                        <MUI.IconButton>
                                            <MUI.AccountCircle />
                                        </MUI.IconButton>
                                    </MUI.InputAdornment>
                                }
                            />
                        </MUI.FormControl>
                        <MUI.FormControl className={classes.margin}>
                            <MUI.InputLabel htmlFor='password-input'>Password</MUI.InputLabel>
                            <MUI.Input id='password-input'
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
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
                        </MUI.FormControl>
                        <Styles.ColorButton size='large'
                                color='primary'
                        >Login</Styles.ColorButton>
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