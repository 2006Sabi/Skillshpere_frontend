import React from "react";
import "../style/Aboutus.css";

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      <div id="aboutus" className="aboutus">
        <div className="aboutus-content">
          <h2>
            About <span>SkillSphere</span>
          </h2>
          <p>
            SkillSphere is a personalized learning platform designed to empower
            individuals in their journey to master cutting-edge skills. Our
            platform focuses on interactive and engaging learning experiences
            tailored to each user's needs.
          </p>
          <h3>Our Vision</h3>
          <p>
            We aim to bridge the gap between learners and the rapidly evolving
            tech industry by providing hands-on, practical, and project-oriented
            learning opportunities.
          </p>
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Customized learning paths for every skill level</li>
            <li>Interactive content with real-world applications</li>
            <li>Community support and expert guidance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
