import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Bookingpage.css'; // Custom styling for greenery and green earth vibes
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

function BookingPage() {

  // List of available timeslots
  const timeslots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

  return (
    <div className='page'>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
      <Navbar />
    
    <div className="BookingPage">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5 p-4 shadow-lg">
              <h2 className="text-center text-green mb-4">Book Your Consultation</h2>
              <form>
                {/* Name Input */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>

                {/* Date Selection */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    required
                  />
                </div>

                {/* Time Selection */}
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Select Time</label>
                  <select
                    className="form-control"
                    id="time"
                    required
                  >
                    <option value="">Choose a time</option>
                    {timeslots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">Book Consultation</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
    </div>
  );
}

export default BookingPage;
