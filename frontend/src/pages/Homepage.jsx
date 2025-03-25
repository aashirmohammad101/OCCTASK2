import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/Homepage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="home-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
      </motion.div>
      <Navbar />
      {/* Page Content */}
      <motion.h1 style={{ color: 'black', marginTop: "30px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        Welcome to Rolsa
      </motion.h1>

      <motion.p style={{ color: 'black', marginTop: "0px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        Speak to one of our representatives for a detailed consultation
        <div className="button-container" style={{ background: "transparent", marginTop: "15px" }}>
          <Link to="/zoo-booking">
            <button className="button">Book your consultation</button>
          </Link>
        </div>
        <hr style={{ width: "100%" }} />
        <div className='reasons-container'>8 REASONS TO CHOOSE ROLSA</div>
      </motion.p>
      <motion.p style={{ color: 'black', marginTop: "0px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
      {/* 8 Reasons Section */}
      <div className="reasons-grid">
        <div className="reason-card"><h3>Lowest Prices</h3><p>By buying in bulk, we offer the best prices.</p></div>
        <div className="reason-card"><h3>Impartial Advice</h3><p>Our friendly solar experts help you choose the best product.</p></div>
        <div className="reason-card"><h3>Recommended</h3><p>Award-winning customer satisfaction.</p></div>
        <div className="reason-card"><h3>Unique Price Guarantee</h3><p>We beat any like-for-like quote by £100.</p></div>
        <div className="reason-card"><h3>Quality Control</h3><p>100% audited installations.</p></div>
        <div className="reason-card"><h3>Fast Installations</h3><p>We install in as little as 2-4 weeks.</p></div>
        <div className="reason-card"><h3>Long Warranty</h3><p>30-year warranty for peace of mind.</p></div>
        <div className="reason-card"><h3>Quality</h3><p>Regulated by MCS, NICEIC, and HIES.</p></div>
      </div>
      </motion.p>
    </div>
  );
};

export default HomePage;
