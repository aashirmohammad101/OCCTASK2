import React, { useState } from 'react';
import "../styles/Loginpage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/'); // Redirect to home page after successful login
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <>
        <motion.p initial={{ opacity: 0,y:50 }} animate={{ opacity: 1,y:0 }} transition={{ duration: 1 }}>
        <br/>
        <Navbar />
        <div className="login-page">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            required 
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember</label>
                        <a href="/">Forgot Password</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
        </motion.p>
        </>
    );
};

export default LoginForm;