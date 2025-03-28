import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Youraccount.css';
import { motion } from 'framer-motion';

const YourAccount = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div>
            <Navbar />
            <div className="your-account">
                <h1>Your Account</h1>
                {user ? (
                    <div className="account-details">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User ID:</strong> {user.id}</p>
                    </div>
                ) : (
                    <p>No user information found. Please log in.</p>
                )}
            </div>
        </div>
        </motion.div>
    );
};

export default YourAccount;