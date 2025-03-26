import React from "react";
import "../styles/Servicespage.css";
import Navbar from "../components/Navbar.jsx"
import { motion } from 'framer-motion';

const services = [
  {
    title: "Solar Panel Installation",
    image: "/solar-panel.jpg",
    description: "Expert installation of high-efficiency solar panels for your home or business."
  },
  {
    title: "EV Charging Solutions",
    image: "/ev-charger.jpg",
    description: "Smart and fast EV charging stations tailored to your needs."
  },
  {
    title: "Smart Home Automation",
    image: "/smart-home.jpg",
    description: "Integrate AI-powered automation for a more efficient and secure home."
  },
  {
    title: "Expert Consultations",
    image: "/consultation.jpg",
    description: "Get free advice from our fully qualified and experienced experts on your energy moves."
  },
  {
    title: "Home Energy Planning",
    image: "/energy-planning.jpeg",
    description: "Plan your home energy usage and how to reduce with us via booking a consultation."
  },
];

const Services = () => {
  return (
    <div className="page"> 
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <Navbar/>
    <div className="services-container">
      <div className="services-header">
        <h1>Our Services</h1>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <div className="cta-section">
        <h2>Book Now and Get 15% Off Any Service</h2>
        <button className="appointment-button">Book a consultation</button>
      </div>
      <footer className="footer">
        <p>Contact us at: info@example.com | Call: 1800 254 2681</p>
        <p>123 Fifth Avenue, New York, NY 10160, USA</p>
      </footer>
    </div>
    </motion.p>
    </div>
  );
};

export default Services;
