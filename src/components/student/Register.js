import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as MUI from '../../MaterialUI/index';
import { theme, ColorButton } from "../../MaterialUI/useStyles";

import useForm from '../../hooks/useForm';

import { registerFormSchema } from '../../utils/loginFormValidation';
import { getToken, clearError } from '../../actions/login';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const StudentRegister = props => {
    const classes = MUI.useStyles();

    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.login);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [values, handleChanges, formErrors] = useForm(initialValues, registerFormSchema);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newData = {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            password: values.password,
            role: 'STUDENT'
        };

        console.log(newData);

        dispatch(getToken(newData));
    };

    useEffect(() => {
        

        if(localStorage.getItem("token")) {
            const token = JSON.parse(localStorage.getItem("token"));
            
            if(token){
                props.history.push("/tickets");
            } 
            
        }
    }, [isFetching, props.history]);

    useEffect(() => {
        registerFormSchema.isValid(values).then((valid) => {
            setButtonDisabled(!valid);
        });
    },[values]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    useEffect(() => dispatch(clearError()), [dispatch]);

    return (
        <div className='login-container'>
            <div className='top-text'>
                <h1>Student Sign Up</h1>
                <p>Create an account to create and track your help tickets.</p>
                Not a Student? <Link to='/helper/signup'>Click here</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <MUI.ThemeProvider theme={theme}>
                    <div className='input-group'>
                        <div className='name-group'>
                            <MUI.TextField className={classes.loginInput}
                                        type='text'
                                        value={values.firstName}
                                        onChange={handleChanges}
                                        id='firstName'
                                        error = {formErrors.firstName.length > 0}
                                        helperText={formErrors.firstName.length > 0 && <span data-cy='firstName-error'>{formErrors.firstName}</span>}
                                        name='firstName'
                                        label='First Name' />
                            <MUI.TextField className={classes.loginInput}
                                        type='text'
                                        value={values.lastName}
                                        onChange={handleChanges}
                                        id='lastName'
                                        error = {formErrors.lastName.length > 0}
                                        helperText={formErrors.lastName.length > 0 && <span data-cy='lastName-error'>{formErrors.lastName}</span>}
                                        name='lastName'
                                        label='Last Name' />
                        </div>
                    </div>
                    <MUI.FormControl className={classes.margin}>
                        <MUI.TextField id='email'
                            onChange={handleChanges}
                            label='Email Address'
                            data-cy='email'
                            name = "email"
                            value = {values.email}
                            error = {formErrors.email.length > 0}
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
                    </MUI.FormControl>
                    <MUI.FormControl className={classes.margin}>
                        <MUI.TextField id='password'
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            data-cy='password'
                            name = "password"
                            value = {values.password}
                            onChange={handleChanges}
                            error = {formErrors.password.length > 0}
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
                    </MUI.FormControl>

                    {error.code && <span className = "form-error">{
                        error.code === 500 ? "Email Account already exists. if you have a helper account, you can add the student role in the account settings." : 
                        error.message}</span>}

                    <div className = 'button-group'>
                        {isFetching ? <MUI.CircularProgress /> : <ColorButton size='large' color='primary' type='submit' disabled={buttonDisabled}>Create Account</ColorButton>}
                    </div>
                    <Link to='/student/login'>Already have an account?</Link>
                </MUI.ThemeProvider>
            </form>
        </div>
    );
};

export default StudentRegister;