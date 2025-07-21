import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import "../style/Navbar.css"; // Import the CSS file

const Navbar = ({ theme, toggleTheme }) => {
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
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-text">
            SkillSphere
          </Link>
        </div>

        <div className="navbar-menu">
          <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
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
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {!isLoggedIn ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          )}
        </div>

        <div
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
