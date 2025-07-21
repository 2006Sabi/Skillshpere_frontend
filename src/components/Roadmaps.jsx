import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { FiArrowRight } from "react-icons/fi";
import "../style/Roadmaps.css";
import mongoLogo from "../images/mongodb-logo.jpg";
import expressLogo from "../images/express-logo.jpg";
import reactLogo from "../images/react-logo.jpg";
import nodeLogo from "../images/node-logo.jpg";

const Roadmaps = () => {
  const navigate = useNavigate(); // Use navigate for navigation

  const roadmaps = [
    {
      id: "mongodb",
      title: "MongoDB",
      description:
        "Master NoSQL database design, queries, and optimization techniques",
      icon: mongoLogo,
      path: "/roadmap/mongodb",
      badge: "Database",
    },
    {
      id: "express",
      title: "Express.js",
      description:
        "Build robust backend APIs with Node.js and Express framework",
      icon: expressLogo,
      path: "/roadmap/express",
      badge: "Backend",
    },
    {
      id: "react",
      title: "React.js",
      description: "Create dynamic user interfaces with modern React patterns",
      icon: reactLogo,
      path: "/roadmap/react",
      badge: "Frontend",
    },
    {
      id: "node",
      title: "Node.js",
      description: "Server-side JavaScript development and runtime environment",
      icon: nodeLogo,
      path: "/roadmap/node",
      badge: "Runtime",
    },
  ];

  return (
    <div className="roadmaps">
      <div className="container">
        <div className="roadmaps-hero fade-in-up">
          <h1 className="heading-1">MERN Stack Learning Roadmaps</h1>
          <p className="roadmaps-description">
            Follow our comprehensive roadmaps to master each technology in the
            MERN stack. Each path is designed to take you from beginner to
            advanced level with hands-on projects.
          </p>
        </div>

        <div className="roadmaps-grid">
          {roadmaps.map((roadmap, index) => (
            <div
              key={roadmap.id}
              className={`roadmap-card ${roadmap.id} fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(roadmap.path)}
            >
              <img
                src={roadmap.icon}
                alt={roadmap.title}
                className="roadmap-icon"
              />
              <h3 className="roadmap-title">{roadmap.title}</h3>
              <p className="roadmap-description">{roadmap.description}</p>
              <div className="roadmap-badge">{roadmap.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
