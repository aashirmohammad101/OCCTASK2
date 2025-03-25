import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import Registerpage from "./pages/Registerpage.jsx";
import Carboncalculator from "./pages/Carboncalculator.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/carboncalculator" element={<Carboncalculator />} />
      </Routes>
    </Router>
  );
}
export default App;