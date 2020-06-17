import React, { useState } from 'react';

import { 
    Container,
    FormControl,
    InputLabel,
    Input,
    TextField,
    IconButton,
    makeStyles,
    InputAdornment
} from '@material-ui/core';

import {
    AccountCircle,
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

import './student.css';

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

    const handleChanges = (e) => {
        e.persist();


    };

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
            <Container className='login-wrapper'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='email-input'>Email Address</InputLabel>
                        <Input id='email-input'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='password-input'>Password</InputLabel>
                        <TextField id='password-input'
                               variant='outlined'
                               type={showPassword ? 'text' : 'password'}
                               value={loginData.password}
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
                </form>
            </Container>
        </>
    );
};

export default StudentLogin;