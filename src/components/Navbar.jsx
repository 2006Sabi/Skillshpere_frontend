import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css"; // Import the CSS file
import logo from "../images/logo.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Here you can check if the user is logged in (e.g., checking JWT token)
    // Simulating login status for now
    const user = localStorage.getItem("user"); // Assuming user data is stored in localStorage
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove token or user data from storage (simulate logout)
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
      </div>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/roadmaps" onClick={() => setMenuOpen(false)}>
            Roadmaps
          </Link>
        </li>
        <li>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>
        </li>
        <li>
          <Link to="/feedback" onClick={() => setMenuOpen(false)}>
            Feedback
          </Link>
        </li>
      </ul>

      {!isLoggedIn ? (
        <Link to="/login" className="cta-button">
          Login
        </Link>
      ) : (
        <button onClick={handleLogout} className="cta-button">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
