import React from "react";
import "../styles/Aboutuspage.css";
import Navbar from "../components/Navbar.jsx"
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
    <div className="page">
        <Navbar/>
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p style={{marginRight:"100px"}}>
            We are pioneers in solar panel installation, EV charging solutions,
            and smart home automation. Our mission is to make sustainable
            energy accessible, affordable, and efficient for everyone.
          </p>
          <h2>Our Mission</h2>
          <p style={{marginRight:"100px"}}>
            Our goal is to revolutionize the way people consume energy by
            providing cutting-edge technology and eco-friendly solutions that
            help reduce carbon footprints while optimizing efficiency.
          </p>
        </div>
        <div className="about-image">
          <img src="/about-us.png" alt="About Us" />
        </div>
      </div>
      <div className="cta-section">
        <h2>Join Us in Building a Sustainable Future</h2>
        <button className="contact-button">Contact Us</button>
      </div>
      <footer className="footer">
        <p>Contact us at: info@example.com | Call: 1800 254 2681</p>
        <p>123 Fifth Avenue, New York, NY 10160, USA</p>
      </footer>
    </div>
    </div>
    </motion.div>
  );
};

export default AboutUs;