import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        if (email === 'example@example.com' && password === 'password') {
            setError('');
            console.log('Logged in successfully!');
        } else {
            setError('Invalid email or password');
        }
    }

    const handleRegister = () => {
        // Handle register logic here
        console.log('Redirecting to register page...');
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <label style={{ color: 'red' }}>{error}</label>}
            <br />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Login;
