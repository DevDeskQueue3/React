import React, { useState } from 'react';

import { 
    Container,
    FormControl,
    InputLabel,
    Input,
    makeStyles,
    InputAdornment
} from '@material-ui/core';

import {AccountCircle} from '@material-ui';

import './student.css';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
}));

const StudentLogin = () => {
    const classes = useStyles();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

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
                </form>
            </Container>
        </>
    );
};

export default StudentLogin;