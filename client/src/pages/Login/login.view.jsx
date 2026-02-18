import useLoginLogic from './login.jsx';
import './login.css';

const LoginView = () => {
    const { setEmail, setPassword, error, loading, handleLogin } = useLoginLogic();

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>SMS Admin Login</h2>
                <p>Please enter your credentials</p>
                
                {error && <p className="login-error">{error}</p>}
                
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="login-input" 
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="login-input" 
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required 
                    />
                    <button 
                        type="submit" 
                        className="login-button" 
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="login-button-loading">
                                <span className="spinner"></span>
                                Logging in...
                            </span>
                        ) : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;