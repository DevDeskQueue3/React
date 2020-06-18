import React, { useState } from 'react';

import { 
    Container,
    FormControl,
    InputLabel,
    Button,
    FilledInput,
    IconButton,
    makeStyles,
    ThemeProvider,
    InputAdornment,
    createMuiTheme
} from '@material-ui/core';

import {
    AccountCircle,
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

import { orange } from '@material-ui/core/colors';

import './student.css';

import * as yup from 'yup';

import useForm from '../../hooks/useForm';

const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
}));

const StudentLogin = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const formSchema = yup.object().shape({
        email: yup.string().email("Value is not a valid email address").required("Email is a required field"),
        password: yup.string().required("Password is a required field")
    });

    const { values, handleChanges, handleSubmit, formErrors} = useForm(loginData, formSchema);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Container className='login-wrapper'>
                <h1>We're here to help.</h1>
                <p>Create a help ticket and we'll connect you with a Lambda School Helper.</p>
                <form className='login-form' onSubmit={handleSubmit}>
                    <ThemeProvider theme={theme}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor='email-input'>Email Address</InputLabel>
                            <FilledInput id='email-input'
                                onChange={handleChanges}
                                value={values.email}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor='password-input'>Password</InputLabel>
                            <FilledInput id='password-input'
                                variant='outlined'
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button size='large'
                                color='primary'
                        >Create Account</Button>
                    </ThemeProvider>
                </form>
            </Container>
        </>
    );
};

export default StudentLogin;