import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import '../styles/Homepage.css';
import { Link } from 'react-router-dom';

const images1 = [
  "/assets/eagle.jpg",
  "/assets/elephant.jpg",
  "/assets/lion.jpg",
  "/assets/tiger.jpg",
  "/assets/lizard.jpg",
];

const HomePage = () => {
  const [currentIndex1, setCurrentIndex1] = useState(0);

  const handlePrev1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === 0 ? images1.length - 1 : prevIndex - 1
    );
  };

  const handleNext1 = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === images1.length - 1 ? 0 : prevIndex + 1
    );
  };


  return (
      <div className="home-page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
        </motion.div>
        <Navbar />

        {/* Page Content */}
        <motion.h1 style={{ color: 'black',marginTop:"30px"}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
  
        >
          Welcome to Rolsa
        </motion.h1>

        <motion.p style={{ color: 'black', marginTop:"0px"}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
            Speak to one of our representatives for a detailed consultation
          <div className="button-container" style={{ background: "transparent",marginTop:"15px"}}>
            <Link to="/zoo-booking">
              <button className="button">Book your consultation</button>
            </Link>
          </div>
            <hr style={{width:"1912px"}}/>
        <div className='reasons-container'>
            6 REASONS TO CHOOSE ROLSA
        </div>
        </motion.p>

      </div>

      
  );
};

export default HomePage;