import React, { useState } from 'react';

import { 
    Container,
    FormControl,
    InputLabel,
    Button,
    Link,
    FilledInput,
    IconButton,
    makeStyles,
    withStyles,
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

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700]
        }
    }
}))(Button);

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
                        <ColorButton size='large'
                                color='primary'
                        >Create Account</ColorButton>
                    </ThemeProvider>
                </form>
                <div className='divider'>or</div>
                <section className='login-links'>
                    <Link href='#'
                            target='_blank'
                            rel='noopener'
                    >Connect using Slack</Link>
                    <span>Lambda school employee? </span>
                    <Link href='#'
                            target='_blank'
                            rel='noopener'
                    >Click here</Link>
                </section>
            </Container>
        </>
    );
};

export default StudentLogin;