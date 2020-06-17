import React from 'react';
import useForm from "../../hooks/useForm";
import axiosWithAuth from '../../utils/axiosWithAuth';

const Register = () => {
    const [helper, handleChanges] = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const postSignup = e => {
        e.preventDefault();

        const newHelper = {
            //name: helper.firstName + " " + helper.lastName,
            email: helper.email,
            password: helper.password
        }
        if(newHelper.email.length > 0) {
            axiosWithAuth()
            .post("/register", newHelper)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message, err.response));
        }
        
    }


    return (
        <div className = "helper-login-container">
            <h2>Helper Sign Up</h2>
            <p>Create an account and start helping.</p>
            <p>Not a helper? <a href="#">Click Here</a>.</p>

            <form onSubmit = {postSignup}>
                <label htmlFor = "firstName">First Name:</label>
                <input id = "firstName" type = "text" name = "firstName" value = {helper.firstName} onChange = {handleChanges} placeholder = "First Name" />

                <label htmlFor = "lastName">Last Name:</label>
                <input id = "lastName" type = "text" name = "lastName" value = {helper.lastName} onChange = {handleChanges} placeholder = "Last Name" />

                <label htmlFor = "email">Email Address</label>
                <input id = "email" type = "email" name = "email" value = {helper.email} onChange = {handleChanges} placeholder = "Email Address" />

                <label htmlFor = "password">Password</label>
                <input id = "password" type = "password" name = "password" value = {helper.password} onChange = {handleChanges} placeholder = "Password" />

                <button type = "submit">Create Account</button>

                {/* 
                    //Stretch to add Slack login

                    <div className = "login-divider">
                        <div className = "line" />
                        <span>or</span>
                        <div className = "line" />
                    </div>

                    <a href = "#">Connect using Slack</a>
                */}
            </form>
        </div>
    );
};

export default Register;