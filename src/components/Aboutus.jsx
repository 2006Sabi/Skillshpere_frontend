import React from "react";
import { FiTarget, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";
import "../style/Aboutus.css";

const Aboutus = () => {
  return (
    <div className="aboutus">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content fade-in-up">
            <h1 className="heading-1">
              About <span className="highlight">SkillSphere</span>
            </h1>
            <p className="about-description">
              We're on a mission to democratize tech education and empower the
              next generation of developers with cutting-edge skills and
              real-world experience.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision">
          <div className="grid grid-2">
            <div className="card">
              <div className="card-icon">
                <FiTarget />
              </div>
              <h3 className="heading-3">Our Mission</h3>
              <p>
                To provide accessible, high-quality tech education that bridges
                the gap between academic learning and industry requirements. We
                believe everyone deserves the opportunity to build a successful
                career in technology.
              </p>
            </div>
            <div className="card">
              <div className="card-icon">
                <FiTrendingUp />
              </div>
              <h3 className="heading-3">Our Vision</h3>
              <p>
                To become the world's leading platform for practical tech
                education, where learners gain not just knowledge, but the
                confidence and skills to excel in their careers.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values">
          <h2 className="heading-2 text-center">Our Core Values</h2>
          <div className="grid grid-3">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h4>Excellence</h4>
              <p>We strive for the highest quality in everything we do</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h4>Community</h4>
              <p>Learning is better together - we foster collaboration</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h4>Innovation</h4>
              <p>We embrace new technologies and teaching methods</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💡</div>
              <h4>Accessibility</h4>
              <p>Quality education should be available to everyone</p>
            </div>
            <div className="value-item">
              <div className="value-icon">📈</div>
              <h4>Growth</h4>
              <p>We're committed to continuous improvement and learning</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🎨</div>
              <h4>Creativity</h4>
              <p>We encourage creative problem-solving and innovation</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="grid grid-2">
            <div className="content-section">
              <h2 className="heading-2">Why Choose SkillSphere?</h2>
              <div className="features-list">
                <div className="feature-item">
                  <FiUsers className="feature-icon" />
                  <div>
                    <h4>Expert Instructors</h4>
                    <p>
                      Learn from industry professionals with years of real-world
                      experience
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <FiAward className="feature-icon" />
                  <div>
                    <h4>Practical Projects</h4>
                    <p>
                      Build a portfolio with real-world projects that employers
                      value
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <FiTarget className="feature-icon" />
                  <div>
                    <h4>Personalized Learning</h4>
                    <p>
                      Adaptive learning paths that match your pace and goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="stats-section">
              <div className="stat-grid">
                <div className="stat-box">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Job Placement Rate</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">15K+</div>
                  <div className="stat-label">Graduates</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">4.9/5</div>
                  <div className="stat-label">Student Rating</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Partner Companies</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Aboutus;
