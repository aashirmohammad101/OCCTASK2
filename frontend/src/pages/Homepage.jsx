import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/Homepage.css';
import { Link } from 'react-router-dom';
import jhon from "../components/jhon.png";
import jane from "../components/jane.jpg";
import micheal from "../components/micheal.png";
import image1 from "../components/image1.jpg"; // Replace with your actual image path
import image2 from "../components/image2.jpg"; // Replace with your actual image path

const HomePage = () => {
  return (
    <div className="home-page">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0  }} transition={{ duration: 1.5 }}>
      
      {/* Page Content */}
      <Navbar />
      <motion.h1 style={{ color: 'black', marginTop: "30px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        Welcome to Rolsa
      </motion.h1>

      <motion.p style={{ color: 'black', marginTop: "0px",fontSize:"18px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        Speak to one of our representatives for a detailed consultation
        <div className="button-container" style={{ background: "transparent", marginTop: "15px" }}>
          <Link to="/booking">
            <button className="button">Book your consultation</button>
          </Link>
        </div>
        <hr style={{ width: "100%" }} />
      

      {/* Image Section */}
      <div className="image-section">
        <div className="image-card">
          <img src={image1} alt="Image 1" className="image-card-img" />
          <div className="image-card-content">
            <h2>Shop</h2>
            <p>Shop our products with the lowest prices</p>
            <Link to="/shop">
              <button className="image-card-button">Shop Now</button>
            </Link>
          </div>
        </div>
        <div className="image-card">
          <img src={image2} alt="Image 2" className="image-card-img" />
          <div className="image-card-content">
            <h2>Book an installation</h2>
            <p>Book an installation with us</p>
            <Link to="/booking">
              <button className="image-card-button">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
      </motion.p>
      </motion.div>

      {/* Enhanced Section */}
      <motion.div className="reasons-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}>
        <h2 className="reasons-title">6 Reasons to Choose Rolsa</h2>
        <div className="reasons-grid">
          {[
            { title: "Lowest Prices", desc: "By buying in bulk, we offer the best prices." },
            { title: "Impartial Advice", desc: "Our friendly solar experts help you choose the best product." },
            { title: "Recommended", desc: "Award-winning customer satisfaction." },
            { title: "Price Guarantee", desc: "We beat any like-for-like quote by £100." },
            { title: "Quality Control", desc: "100% audited installations." },
            { title: "Fast Installations", desc: "We install in as little as 2-4 weeks." },
          ].map((reason, index) => (
            <motion.div className="reason-card" key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Testimonials Section */}
      <motion.div className="testimonials-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}>
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {[
            { 
              name: "John Doe", 
              feedback: "Rolsa provided excellent service and the best prices!", 
              rating: 5, 
              image: jhon 
            },
            { 
              name: "Jane Smith", 
              feedback: "The installation was quick and hassle-free. Highly recommend!", 
              rating: 4, 
              image: jane 
            },
            { 
              name: "Michael Brown", 
              feedback: "Amazing customer support and quality products.", 
              rating: 5, 
              image: micheal 
            },
          ].map((testimonial, index) => (
            <motion.div className="testimonial-card" key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="testimonial-image" 
              />
              <p className="testimonial-feedback">"{testimonial.feedback}"</p>
              <div className="testimonial-rating">
                {"★".repeat(testimonial.rating) + "☆".repeat(5 - testimonial.rating)}
              </div>
              <h4 className="testimonial-name">- {testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Call-to-Action Banner */}
      <motion.div className="cta-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}>
        <h2>Ready to Go Solar?</h2>
        <p>Join thousands of satisfied customers and start saving today!</p>
        <Link to="/booking">
          <button className="cta-button">Book a consultation</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
