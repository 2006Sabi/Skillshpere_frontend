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
  Home,
  GraduationCap,
  Map,
  Info,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ theme, toggleTheme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("skillsphere-token");
    localStorage.removeItem("skillsphere-user");
    setIsAuthenticated(false);
    setUser(null);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Courses", path: "/courses", icon: <GraduationCap size={20} /> },
    { name: "Roadmaps", path: "/roadmaps", icon: <Map size={20} /> },
    { name: "About", path: "/about", icon: <Info size={20} /> },
  ];

  const userMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <BookOpen size={16} /> },
    { name: "Profile", path: "/profile", icon: <User size={16} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <div className="logo-icon">
              <BookOpen size={24} />
            </div>
            {!isCollapsed && <span className="logo-text">SkillSphere</span>}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="sidebar-toggle"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Navigation</h3>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`nav-item ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="nav-text">{item.name}</span>
                    )}
                    {isActive(item.path) && (
                      <motion.div
                        className="nav-indicator"
                        layoutId="nav-indicator"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="nav-section">
            <h3 className="nav-section-title">Quick Actions</h3>
            <ul className="nav-list">
              <li>
                <Link
                  to="/search"
                  className={`nav-item ${isActive("/search") ? "active" : ""}`}
                  title={isCollapsed ? "Search" : ""}
                >
                  <span className="nav-icon">
                    <Search size={20} />
                  </span>
                  {!isCollapsed && <span className="nav-text">Search</span>}
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <button
                    className="nav-item"
                    title={isCollapsed ? "Notifications" : ""}
                  >
                    <span className="nav-icon">
                      <Bell size={20} />
                    </span>
                    {!isCollapsed && (
                      <span className="nav-text">Notifications</span>
                    )}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* User Section */}
          {isAuthenticated && (
            <div className="nav-section">
              <h3 className="nav-section-title">Account</h3>
              <ul className="nav-list">
                {userMenuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`nav-item ${
                        isActive(item.path) ? "active" : ""
                      }`}
                      title={isCollapsed ? item.name : ""}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="nav-text">{item.name}</span>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-item logout"
                    title={isCollapsed ? "Logout" : ""}
                  >
                    <span className="nav-icon">
                      <LogOut size={20} />
                    </span>
                    {!isCollapsed && <span className="nav-text">Logout</span>}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={
              isCollapsed
                ? theme === "light"
                  ? "Switch to Dark"
                  : "Switch to Light"
                : ""
            }
          >
            <span className="nav-icon">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </span>
            {!isCollapsed && (
              <span className="nav-text">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            )}
          </button>

          {/* User Info (when not collapsed) */}
          {isAuthenticated && !isCollapsed && (
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
              <div className="user-details">
                <div className="user-name">{user?.name || "User"}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          )}

          {/* Collapsed User Avatar */}
          {isAuthenticated && isCollapsed && (
            <div className="user-avatar-collapsed">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}

          {/* Auth Buttons (when not authenticated) */}
          {!isAuthenticated && !isCollapsed && (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Toggle Button */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>
    </>
  );
};

export default Sidebar;
