import React from "react";
import "../styles/Servicespage.css";
import Navbar from "../components/Navbar.jsx";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

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
      <motion.p initial={{ opacity: 0,y:50 }} animate={{ opacity: 1,y:0 }} transition={{ duration: 1 }}>
        <Navbar />
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
        </div>
        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Transform Your Energy Usage?</h2>
          <p>Contact us today to schedule a consultation or learn more about our services.</p>
          <Link to={"/booking"}>
          <button className="appointment-button">Book an Appointment</button>
          </Link>
        </div>
        {/* Footer */}
        <div className="footer">
          <p>&copy; 2025 Energy Solutions Inc. All rights reserved.</p>
        </div>
      </motion.p>
    </div>
  );
};

export default Services;
