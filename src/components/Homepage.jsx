import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaBook, FaUsers, FaChartLine } from "react-icons/fa"; // Import icons
import Feedback from "./Feedback"; // Import Feedback component
import "../style/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/register");
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <FaRocket className="icon" />
            <span>Start Your Journey</span>
          </div>
          <h1>
            Unlock Your Potential with{" "}
            <span className="highlight">SkillSphere</span>
          </h1>
          <p className="hero-description">
            Your gateway to mastering the MERN stack. Our platform offers
            interactive tutorials, comprehensive roadmaps, and a vibrant
            community to help you succeed.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={handleGetStartedClick}>
              <span>Get Started</span>
              <FaRocket className="icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="text-center">
            <h2>Why Choose SkillSphere?</h2>
            <p>
              We provide the tools and resources you need to excel in your
              learning journey.
            </p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <FaBook className="feature-icon" />
              <h3>Comprehensive Courses</h3>
              <p>
                In-depth courses on MongoDB, Express, React, and Node.js,
                designed by industry experts.
              </p>
            </div>
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3>Structured Roadmaps</h3>
              <p>
                Clear and concise roadmaps to guide you from beginner to expert
                in the MERN stack.
              </p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>Community Support</h3>
              <p>
                Join a thriving community of learners and mentors to collaborate
                and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="grid-4">
            <div className="stat-item">
              <h3 className="stat-number">10,000+</h3>
              <p className="stat-label">Students Enrolled</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Courses</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">200+</h3>
              <p className="stat-label">Hours of Content</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">98%</h3>
              <p className="stat-label">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section">
        <div className="container">
          <Feedback />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
