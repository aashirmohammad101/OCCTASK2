import React, { useState } from 'react';
import "../styles/Loginpage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';

const LoginForm = () => {
    return (
        <>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <br/>
        <Navbar />
        <div className="login-page">
            <div className="wrapper">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
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