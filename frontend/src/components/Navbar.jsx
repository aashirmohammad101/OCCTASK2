import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdMenu } from "react-icons/io";
import logo from "../components/logo.png"



const Navbar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

  return (
    <nav className="navbar">
        <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontWeight:"bold", fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className='menu-links'>
            <Link to="/" onClick={handleClose}>Account</Link>
            <hr style={{width:"65px"}}/>
            <Link to="/" onClick={handleClose}>Your Bookings</Link>
            <hr style={{width:"110px"}}/>
            <Link to="/" onClick={handleClose}>Shop Our Products</Link>
            <hr style={{width:"145px"}}/>
            <Link to="/" onClick={handleClose}>Carbon Footprint History</Link>
            <hr style={{width:"192px"}}/>
            <Link to="/" onClick={handleClose}>Your energy usage history</Link>
            <hr style={{width:"220px"}}/>
            <Link to="/" onClick={handleClose}>About Us</Link>
            <hr style={{width:"160px"}}/>
            <Link to="/" onClick={handleClose}>Contact Us</Link>
            <hr style={{width:"80px"}}/>
            <Link to="/register" onClick={handleClose}>Sign Up</Link>
            <br/>
            <Link to="/login" onClick={handleClose}>Log In</Link>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="navbar-container">
        <div className='navbar-logo'>
        <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '60px', }} />
          </Link>
          </div>
      <Button style={{color:"black",backgroundColor:"transparent",border:"none",fontSize:"25px",}} variant="primary" onClick={toggleShow} >
        <IoMdMenu />
        </Button>
        <div className="navbar-links">
          <Link to="/">Book your consultation</Link>
          <Link to="/">Shop our products</Link>
          <Link to="/">Our Services</Link>
          <Link to="/carboncalculator">Calculate your carbon footprint</Link>
          <Link to="/">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;