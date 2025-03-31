import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookingReceipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state;

    if (!booking) {
        navigate('/'); // Redirect to home if no booking data is available
        return null;
      }
    
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <div className="card p-4 shadow-lg">
              <h2 className="text-center text-success mb-4">-Booking Confirmed-</h2>
              <h3 className="text-center text-success mb-4">Below are your booking details</h3>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Booking Type:</strong> {booking.bookingType}</p>
              <div className="text-center mt-4">
                <button className="btn btn-success" onClick={() => navigate('/yourbookings')}>View booking</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default BookingReceipt;