import React from "react";
import "./Express.css";

const Mongodb = () => {
  return (
      <div className="timeline2">
        <h1>RoadMap for Express</h1>

        <div className="container2 left-container2">
          <div className="text-box2">
            <h2>Learning Basic Setup</h2>
            <p>
              Understanding routing, middleware, and creating basic servers.
            </p>
            <span className="left-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 right-container2">
          <div className="text-box2">
            <h2>Building APIs</h2>
            <p>
              Implementing RESTful API routes with proper HTTP methods (GET,
              POST, PUT, DELETE).
            </p>
            <span className="right-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 left-container2">
          <div className="text-box2">
            <h2>Middleware Usage</h2>
            <p>
              Using built-in and custom middleware for tasks like
              authentication, logging, and error handling.
            </p>
            <span className="left-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 right-container2">
          <div className="text-box2">
            <h2>Database Integration</h2>
            <p>
              Connecting to databases (MongoDB, MySQL, etc.) using ORMs/ODM like
              Mongoose or Sequelize.
            </p>
            <span className="right-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 left-container2">
          <div className="text-box2">
            <h2>Authentication & Authorization</h2>
            <p>Implementing JWT, OAuth, or session-based authentication.</p>
            <span className="left-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 right-container2">
          <div className="text-box2">
            <h2>Error Handling & Debugging</h2>
            <p>
              Proper error handling and debugging techniques for a production
              environment.
            </p>
            <span className="right-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 left-container2">
          <div className="text-box2">
            <h2>Testing</h2>
            <p>Writing tests with libraries like Mocha, Chai, or Jest.</p>
            <span className="left-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 right-container2">
          <div className="text-box2">
            <h2>Performance Optimization</h2>
            <p>
              Using caching, load balancing, and optimizing request handling.
            </p>
            <span className="right-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 left-container2">
          <div className="text-box2">
            <h2>Security Best Practices</h2>
            <p>
              Implementing security features like HTTPS, rate limiting, and
              input validation.
            </p>
            <span className="left-container2-arrow"></span>
          </div>
        </div>

        <div className="container2 right-container2">
          <div className="text-box2">
            <h2>Deployment</h2>
            <p>
              Deploying applications on cloud services like Heroku, AWS, or
              DigitalOcean.
            </p>
            <span className="right-container2-arrow"></span>
          </div>
        </div>
      </div>
  );
};

export default Mongodb;
