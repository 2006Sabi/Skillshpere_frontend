import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../style/Courses.css";
import mongoLogo from "../images/mongodb-logo.jpg";
import expressLogo from "../images/express-logo.jpg";
import reactLogo from "../images/react-logo.jpg";
import nodeLogo from "../images/node-logo.jpg";

const Courses = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="courses">
      <h1>Explore Our Courses</h1>

      {/* Course Boxes */}
      <div className="courses-container">
        <button
          className="course-box"
          onClick={() => navigate("/courses/mongodb")}
        >
          <img src={mongoLogo} alt="MongoDB" />
          <span>MongoDB</span>
        </button>
        <button
          className="course-box"
          onClick={() => navigate("/courses/express")}
        >
          <img src={expressLogo} alt="Express" />
          <span>Express.js</span>
        </button>
        <button
          className="course-box"
          onClick={() => navigate("/courses/react")}
        >
          <img src={reactLogo} alt="React" />
          <span>React.js</span>
        </button>
        <button
          className="course-box"
          onClick={() => navigate("/courses/node")}
        >
          <img src={nodeLogo} alt="Node.js" />
          <span>Node.js</span>
        </button>
      </div>
    </div>
  );
};

export default Courses;
