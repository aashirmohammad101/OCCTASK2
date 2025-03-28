
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/Yourbookings.css';
import { motion } from 'framer-motion';

const YourBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/bookings/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching bookings');
            }
        };

        fetchBookings();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div>
            <Navbar />
            <div className="your-bookings">
                <h1>Your Bookings</h1>
                {error && <p className="error">{error}</p>}
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking._id}>
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {booking.time}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </motion.div>
    );
};

export default YourBookings;