import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../style/Homepage.css"; // Import your CSS file

const Homepage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGetStartedClick = () => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("token"); // Use "token" or your key used for login state

    console.log("Is Logged In: ", isLoggedIn); // Log if user is logged in or not

    if (!isLoggedIn) {
      // If not logged in, redirect to the register page
      console.log("Redirecting to register page...");
    }
          navigate("/register");

    // If logged in, you can redirect elsewhere (add your own logic here if necessary)
  };

  return (
    <div id="home" className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay">
          <div className="hero-text">
            <div className="home-col-1">
              <h1>SkillSphere learning for limitless possibilities</h1>
              <p>
                SkillSphere is your gateway to mastering the MERN stack. Our
                platform offers interactive tutorials and resources tailored to
                help you succeed.
              </p>
              {/* Button triggers handleGetStartedClick */}
              <button className="cta-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
