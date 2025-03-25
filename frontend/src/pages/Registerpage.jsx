import React from "react";
import "../styles/Registerpage.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";

const RegisterForm = () => {
    return (
        <>
        <br/>
        <Navbar />
        <div className="register-page">
            <div className="wrapper">
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Repeat Password" required />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="/login">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default RegisterForm;