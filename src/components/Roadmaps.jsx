import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "../style/Roadmaps.css";
import mongoLogo from "../images/mongodb-logo.jpg";
import expressLogo from "../images/express-logo.jpg";
import reactLogo from "../images/react-logo.jpg";
import nodeLogo from "../images/node-logo.jpg";

const Roadmap = () => {
  const navigate = useNavigate(); // Use navigate for navigation

  return (
    <div className="roadmap">

      <h1>Roadmap for MERN Stack Developer</h1>

      {/* Buttons Section */}
      <div className="roadmap-buttons">
        <button
          className="roadmap-button"
          onClick={() => navigate("/roadmap/mongodb")}
        >
          <img src={mongoLogo} alt="MongoDB" />
          MongoDB
        </button>
        <button
          className="roadmap-button"
          onClick={() => navigate("/roadmap/express")}
        >
          <img src={expressLogo} alt="Express" />
          Express
        </button>
        <button
          className="roadmap-button"
          onClick={() => navigate("/roadmap/react")}
        >
          <img src={reactLogo} alt="React" />
          React
        </button>
        <button
          className="roadmap-button"
          onClick={() => navigate("/roadmap/node")}
        >
          <img src={nodeLogo} alt="Node.js" />
          Node.js
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
