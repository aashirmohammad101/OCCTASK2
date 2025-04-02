import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/Yourbookings.css';
import { motion } from 'framer-motion';

const YourBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editingBooking, setEditingBooking] = useState(null); // Track the booking being edited
    const [editFormData, setEditFormData] = useState({
        date: '',
        time: '',
        bookingType: ''
    });

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

    const handleEditClick = (booking) => {
        setEditingBooking(booking._id);
        setEditFormData({
            date: booking.date.split('T')[0], // Format date for input
            time: booking.time,
            bookingType: booking.bookingType
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/bookings/${editingBooking}`,
                editFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccess('Booking updated successfully!');
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === editingBooking ? response.data.booking : booking
                )
            );
            setEditingBooking(null); // Exit edit mode
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating booking');
        }
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className='page'>
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
                                    {editingBooking === booking._id ? (
                                        <form onSubmit={handleEditSubmit}>
                                            <label>
                                                Date:
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={editFormData.date}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Time:
                                                <input
                                                    type="time"
                                                    name="time"
                                                    value={editFormData.time}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Booking Type:
                                                <select
                                                    name="bookingType"
                                                    value={editFormData.bookingType}
                                                    onChange={handleEditChange}
                                                    required
                                                >
                                                    <option value="Normal Consultation">Normal Consultation</option>
                                                    <option value="Physical Installation Booking">
                                                        Physical Installation Booking
                                                    </option>
                                                </select>
                                            </label>
                                            <button type="submit" className="save-button">
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                className="cancel-button"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <p>
                                                <strong>Name:</strong> {booking.name}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {booking.email}
                                            </p>
                                            <p>
                                                <strong>Date:</strong>{' '}
                                                {new Date(booking.date).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Time:</strong> {booking.time}
                                            </p>
                                            <p>
                                                <strong>Booking Type:</strong> {booking.bookingType}
                                            </p>
                                            <button
                                                className="edit-button"
                                                onClick={() => handleEditClick(booking)}
                                            >
                                                Edit Booking
                                            </button>
                                            <button
                                                className="cancel-button"
                                                onClick={() => handleCancel(booking._id)}
                                            >
                                                Cancel Booking
                                            </button>
                                        </>
                                    )}
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