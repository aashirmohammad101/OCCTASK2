import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/Yourbookings.css';
import { motion } from 'framer-motion';

const YourBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const handleCancel = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess('Booking canceled successfully!');
            setBookings(bookings.filter((booking) => booking._id !== bookingId)); // Remove the canceled booking from the list
        } catch (err) {
            setError(err.response?.data?.message || 'Error canceling booking');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div>
                <Navbar />
                <div className="your-bookings">
                    <h1>Your Bookings</h1>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
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
                                    <p><strong>Booking Type:</strong> {booking.bookingType}</p>
                                    <button
                                        className="cancel-button"
                                        onClick={() => handleCancel(booking._id)}
                                    >
                                        Cancel Booking
                                    </button>
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