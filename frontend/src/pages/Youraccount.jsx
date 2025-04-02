import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Youraccount.css';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

const YourAccount = () => {
    const [user, setUser] = useState(null);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handlePasswordEdit = () => {
        setIsEditingPassword(true);
        setNewPassword(''); // Clear the new password field
    };

    const handlePasswordSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not authorized to perform this action.');
                return;
            }

            const response = await axios.put(
                'http://localhost:5000/api/user/password',
                { newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(response.data.message);
            setIsEditingPassword(false);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while updating the password.');
        }
    };

    const handlePasswordCancel = () => {
        setIsEditingPassword(false);
        setNewPassword('');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className='page'>
                <Navbar />
                <div className="your-account">
                    <h1>Account Settings</h1>
                    {user ? (
                        <form className="account-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={user.name || ''} readOnly />
                            </div>
                            <div className="form-group">
                                <label>User ID</label>
                                <input type="text" value={user.id || ''} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={user.email || ''} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="password-field">
                                    {isEditingPassword ? (
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                        />
                                    ) : (
                                        <input type="password" value="********" readOnly />
                                    )}
                                    {!isEditingPassword && (
                                        <FaEdit className="edit-icon" onClick={handlePasswordEdit} />
                                    )}
                                </div>
                            </div>
                            {isEditingPassword && (
                                <div className="form-actions">
                                    <button type="button" className="save-btn" onClick={handlePasswordSave}>
                                        Save
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={handlePasswordCancel}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}
                        </form>
                    ) : (
                        <p>No user information found. Please log in.</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default YourAccount;