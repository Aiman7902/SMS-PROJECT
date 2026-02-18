import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLoginLogic = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await Promise.all([
                fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                }).then(async (response) => {
                    const data = await response.json();

                    if (data.success) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        navigate('/', { replace: true });
                    } else {
                        setError(data.message || 'Invalid credentials');
                    }
                }),
                new Promise(resolve => setTimeout(resolve, 1000)) // Minimum 1s loading
            ]);
        } catch (err) {
            setError('Server error. Check if the backend rocket is running!');
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, error, loading, handleLogin };
};

export default useLoginLogic;