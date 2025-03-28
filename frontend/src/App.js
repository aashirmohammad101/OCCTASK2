// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.jsx"
import RegisterPage from "./pages/Registerpage.jsx"
import LoginPage from "./pages/Loginpage.jsx"
import Carboncalculator from "./pages/Carboncalculator.jsx"
import BookingPage from "./pages/Bookingpage.jsx";
import ContactPage from "./pages/Contactpage.jsx"
import AboutUs from "./pages/Aboutuspage.jsx";
import Services from "./pages/Servicespage.jsx";
import Yourbookings from "./pages/Yourbookings.jsx";
import Youraccount from "./pages/Youraccount.jsx";
import EVchargingmap from "./pages/EVchargingmap.jsx"

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/carboncalculator" element={<Carboncalculator />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ourservices" element={<Services />} />
        <Route path="/yourbookings" element={<Yourbookings />} />
        <Route path="/youraccount" element={<Youraccount />} />
        <Route path="/evchargingmap" element={<EVchargingmap />} />
      </Routes>
    </Router>
  );
}
export default App;