import React from 'react';

const Register = () => {
    return (
        <div className = "helper-login-container">
            <h2>Helper Sign Up</h2>
            <p>Create an account and start helping.</p>
            <p>Not a helper? <a href = "#">Click Here</a>.</p>

            <form>
                <label htmlFor = "firstName">First Name:</label>
                <input id = "firstName" type = "text" name = "firstName" placeholder = "First Name" />

                <label htmlFor = "lastName">Last Name:</label>
                <input id = "lastName" type = "text" name = "lastName" placeholder = "Last Name" />

                <label htmlFor = "email">Email Address</label>
                <input id = "email" type = "email" name = "email" placeholder = "Email Address" />

                <label htmlFor = "password">Password</label>
                <input id = "password" type = "password" name = "password" placeholder = "Password" />

                <button>Create Account</button>

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