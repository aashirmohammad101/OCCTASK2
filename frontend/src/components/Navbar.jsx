import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../components/logo.png";

const Navbar = ({ cartItemCount = 0, onCartClick }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [cart, setCart] = useState([]);
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

        // Get cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Update cart when it changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            } else {
                setCart([]);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setEmail(''); // Reset email state
        window.location.reload();
        navigate('/login'); // Redirect to login page
    };

    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        if (onCartClick) {
            onCartClick();
        } else {
            navigate('/shop');
        }
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
                        <Link to="/your-orders" onClick={handleClose}>Your Orders</Link>
                        <hr style={{ width: "65px" }} />
                        <Link to="/yourbookings" onClick={handleClose}>View Your Bookings</Link>
                        <hr style={{ width: "110px" }} />
                        <Link to="/shop" onClick={handleClose}>Shop Our Products</Link>
                        <hr style={{ width: "192px" }} />
                        <Link to="/energy-history" onClick={handleClose}>Your energy usage history</Link>
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
                    <Link to="/shop">Shop our products</Link>
                    <Link to="/ourservices">Our services</Link>
                    <Link to="/">Home</Link>
                    <Link to="/carboncalculator">Calculate your carbon footprint</Link>
                    <Link to="/energy-usage">Track your energy usage</Link>
                    <span>
                        Signed in as: <span style={{ color: "green"}}>{name || "Guest"}</span>
                    </span>
                </div>
                <div className="cart-icon-container">
                    <button className="cart-button" onClick={handleCartClick}>
                        <FaShoppingCart />
                        {(cartItemCount > 0 || getCartItemCount() > 0) && (
                            <span className="cart-count">
                                {cartItemCount || getCartItemCount()}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;