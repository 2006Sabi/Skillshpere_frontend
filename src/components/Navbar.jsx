import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  BookOpen,
  Search,
  Bell,
} from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("skillsphere-token");
    const userData = localStorage.getItem("skillsphere-user");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("skillsphere-token");
    localStorage.removeItem("skillsphere-user");
    setIsAuthenticated(false);
    setUser(null);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Roadmaps", path: "/roadmaps" },
    { name: "About", path: "/about" },
  ];

  const userMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <BookOpen size={16} /> },
    { name: "Profile", path: "/profile", icon: <User size={16} /> },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <BookOpen size={24} />
            </div>
            <span className="logo-text">SkillSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            {/* Search Button */}
            <Link to="/search" className="action-btn">
              <Search size={20} />
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="action-btn">
                <Bell size={20} />
              </button>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="action-btn theme-toggle">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <div className="user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-menu-trigger"
                >
                  <div className="user-avatar">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className="user-menu"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="user-info">
                        <div className="user-name">{user?.name || "User"}</div>
                        <div className="user-email">{user?.email}</div>
                      </div>

                      <div className="user-menu-items">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="user-menu-item"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <div className="user-menu-divider" />

                      <button
                        onClick={handleLogout}
                        className="user-menu-item logout"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-nav-items">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`mobile-nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <div className="mobile-nav-divider" />
                    <Link
                      to="/dashboard"
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="mobile-nav-link logout"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mobile-nav-divider" />
                    <Link
                      to="/login"
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
