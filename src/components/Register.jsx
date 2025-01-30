import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../style/Register.css"; // Import the CSS file
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const navigate = useNavigate(); 
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      // If already registered, redirect to the Login page
      // navigate("/login");
    }
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!["user", "admin"].includes(formData.role)) {
      alert("Invalid role selected! Choose either 'user' or 'admin'.");
      return;
    } 
    const fakeToken = "some-jwt-token";  
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", formData.email); 

  try {
    // Send a request to the backend
    const response = await fetch(
      "https://skillsphere-backend.onrender.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirect to Login page
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Server error. Please try again later.");
  }
    alert("Registration successful! Please log in.");

    navigate("/about");
  };

  return (
    <div id="contact" className="contact-container">
      <h1 className="contact-heading">Register Here</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
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
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
