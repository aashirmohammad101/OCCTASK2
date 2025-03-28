import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdMenu } from "react-icons/io";
import logo from "../components/logo.png";

const Navbar = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            setEmail(user.email);
        }
        if (user && user.name) {
            setName(user.name);
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setEmail(''); // Reset email state
        window.location.reload();
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll={false}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ fontWeight: "bold", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>
                        Dashboard
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='menu-links'>
                        <Link to="/" onClick={handleClose}>Home</Link>
                        <hr style={{ width: "65px" }} />
                        <Link to="/youraccount" onClick={handleClose}>Account</Link>
                        <hr style={{ width: "65px" }} />
                        <Link to="/yourbookings" onClick={handleClose}>Your Bookings</Link>
                        <hr style={{ width: "110px" }} />
                        <Link to="/" onClick={handleClose}>Shop Our Products</Link>
                        <hr style={{ width: "145px" }} />
                        <Link to="/" onClick={handleClose}>Carbon Footprint History</Link>
                        <hr style={{ width: "192px" }} />
                        <Link to="/" onClick={handleClose}>Your energy usage history</Link>
                        <hr style={{ width: "220px" }} />
                        <Link to="/evchargingmap" onClick={handleClose}>EV Charging Stations</Link>
                        <hr style={{ width: "220px" }} />
                        <Link to="/aboutus" onClick={handleClose}>About Us</Link>
                        <hr style={{ width: "160px" }} />
                        <Link to="/contactus" onClick={handleClose}>Contact Us</Link>
                        <hr style={{ width: "80px" }} />
                        {!email && (
                            <>
                                <Link to="/register" onClick={handleClose}>Sign Up</Link>
                                <br />
                                <Link to="/login" onClick={handleClose}>Log In</Link>
                                <br />
                            </>
                        )}
                    </div>
                    {email && <Link onClick={handleLogout} className="logout-button">Log-out</Link>}
                </Offcanvas.Body>
            </Offcanvas>
            <div className="navbar-container">
                <div className='navbar-logo'>
                    <Link to="/">
                        <img src={logo} alt="Logo" style={{ height: '60px' }} />
                    </Link>
                </div>
                <Button style={{ color: "black", backgroundColor: "transparent", border: "none", fontSize: "25px" }} variant="primary" onClick={toggleShow}>
                    <IoMdMenu />
                </Button>
                <div className="navbar-links">
                    <Link to="/booking">Book your consultation</Link>
                    <Link to="/">Shop our products</Link>
                    <Link to="/ourservices">Our services</Link>
                    <Link to="/carboncalculator">Calculate your carbon footprint</Link>
                    <Link to="/">Track your energy usage</Link>
                    <Link to="/">Home</Link>
                    <span>
                        Signed in as: <span style={{ color: "green" }}>{name || "Guest"}</span>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;