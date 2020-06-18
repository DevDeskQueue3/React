import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as MUI from '../../MaterialUI/index';
import * as Styles from '../../MaterialUI/useStyles';

import useForm from '../../hooks/useForm';

import { registerFormSchema } from '../../utils/loginFormValidation';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const StudentRegister = () => {
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.login);
    
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [values, handleChanges, formErrors] = useForm(initialValues, registerFormSchema);

    //Note: onSubmit, when creating the new state data, don't forget to add the student role
    // and concatenate the names

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <MUI.Container fixed>
                <div className='top-text'>
                    <h1>Student Sign Up</h1>
                    <p>Create an account to create and track your help tickets.</p>
                    <Link to='/helper/signup'>Click here</Link>
                </div>
                <form onSubmit={handleSubmit}>
                <MUI.ThemeProvider theme={Styles.theme}>
                        <MUI.FormControl className={useStyles.margin}>
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
                        <MUI.FormControl className={useStyles.margin}>
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
                        <div className = "button-group">
                        {isFetching ? <MUI.CircularProgress /> : <Styles.ColorButton size='large' color='primary' type='submit' disabled={buttonDisabled}>Create Account</Styles.ColorButton>}
                </div>
                    </MUI.ThemeProvider>
                </form>
            </MUI.Container>
        </>
    );
};

export default StudentRegister;