import React from 'react';

const Login = () => {
    return (
        <div className = "helper-login-container">
            <h2>Helper Login</h2>
            <p>Login to your account and start Helping.</p>
            <p>Not a helper? <a href = "#">Click Here</a>.</p>

            <form>
                <label htmlFor = "email">Email Address</label>
                <input id = "email" type = "email" name = "email" placeholder = "Email Address" />

                <label htmlFor = "password">Password</label>
                <input id = "password" type = "password" name = "password" placeholder = "Password" />

                <button>Login</button>

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

export default Login;