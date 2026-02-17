import React from 'react';
import useLoginLogic from './login.jsx'; // Import the logic hook
import './login.css';

const LoginView = () => {
    // Get everything we need from the logic file
    const { setEmail, setPassword, error, handleLogin } = useLoginLogic();

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>SMS Admin Login</h2>
                <p>Please enter your credentials</p>
                
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="login-input" 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;