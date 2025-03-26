import {useState} from "react";
import "../styles/Registerpage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';

const RegisterForm = () =>{
    
    return (
        <>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <br/>
        <Navbar />
        <div className="register-page">
            <div className="wrapper">
                <form>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Enter Email"required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="/login">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
        </motion.p>
        </>
    );
};

export default RegisterForm;