import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        // Send a POST request to the backend using Axios
        const response = await axios.post(
          "https://skillsphere-backend-1.onrender.com/api/register",
          formData
        );

        // Extract data from response
        const { message, user } = response.data;

        alert(message); // Show success message

        navigate("/login"); // Redirect to login page
      } catch (error) {
        // Handle errors from the backend
        if (error.response) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert("Server error. Please try again later.");
        }
      }
  };

  return (
    <div id="login" className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
