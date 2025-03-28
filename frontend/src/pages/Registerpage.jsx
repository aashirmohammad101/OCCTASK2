import {useState} from "react";
import "../styles/Registerpage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <>
        <motion.p initial={{ opacity: 0,y:50 }} animate={{ opacity: 1,y:0 }} transition={{ duration: 1 }}>
        <br/>
        <Navbar />
        <div className="register-page">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-box">
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Enter Name" 
                            required 
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Enter Email" 
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
                    <div className="input-box">
                        <input 
                            type="password" 
                            name="confirmPassword"
                            placeholder="Confirm Password" 
                            required 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
        </motion.p>
        </>
    );
};

export default RegisterForm;