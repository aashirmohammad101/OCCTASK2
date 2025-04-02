import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';
import "../styles/Contactpage.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/contactus", formData);
      setResponse(res.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setResponse("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <h1 style={{marginTop:"40px", marginBottom:"-50px"}}>Contact Us</h1>
      <motion.div
        className="contact-container"
        initial={{ opacity: 0,y:50 }}
        animate={{ opacity: 1,y:0 }}
        transition={{ duration: 1 }}
      >
        <div className="contact-left">
          <h2>Got questions?</h2>
          <p>Don’t hesitate to send us a message</p>
        </div>
        <div className="contact-right">

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">Send</button>
          </form>
          {response && <p className="response-message">{response}</p>}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;