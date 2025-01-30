import React from "react";
import "./Node.css";

const Node = () => {
  return (
      <div className="timeline3">
        <h1>RoadMap for Node</h1>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Basics of JavaScript</h2>
            <p>
              Master core JavaScript concepts (ES6+, async/await, closures,
              promises).
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Introduction to Node.js</h2>
            <p>
              Understand the event-driven, non-blocking I/O model, and core
              Node.js modules (fs, path, http).
            </p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Creating a Basic Server</h2>
            <p>Learn to set up a simple HTTP server using http module.</p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Express.js</h2>
            <p>
              Learn Express.js for building RESTful APIs and handling routing
              and middleware.
            </p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Asynchronous Programming</h2>
            <p>
              Deep dive into async programming, handling callbacks, promises,
              and async/await.
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>File System and Streams</h2>
            <p>Work with files and streams for handling large data.</p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Package Management</h2>
            <p>
              Understand npm (Node Package Manager) for managing dependencies
              and creating custom modules.
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Database Integration</h2>
            <p>
              Integrate databases (MongoDB with Mongoose, SQL with Sequelize) to
              handle persistent storage.
            </p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Authentication & Authorization</h2>
            <p>
              Implement user authentication using JWT, Passport.js, or OAuth.
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Testing</h2>
            <p>Write tests using testing frameworks like Mocha, Chai, Jest.</p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Debugging and Error Handling</h2>
            <p>
              Implement proper error handling, logging, and debugging techniques
              for production.
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Security</h2>
            <p>
              Learn security best practices such as input validation, preventing
              SQL injection, CSRF, and using HTTPS.
            </p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>WebSockets & Real-time Apps</h2>
            <p>
              Learn WebSocket integration for real-time communication with
              Socket.io.
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Deployment</h2>
            <p>
              Learn to deploy Node.js applications using services like Heroku,
              AWS, or DigitalOcean.
            </p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 left-container3">
          <div className="text-box3">
            <h2>Performance Optimization</h2>
            <p>
              Focus on caching, clustering, load balancing, and optimizing code
              for scalability.
            </p>
            <span className="left-container3-arrow"></span>
          </div>
        </div>
        <div className="container3 right-container3">
          <div className="text-box3">
            <h2>Advanced Topics</h2>
            <p>
              Explore microservices, GraphQL, Docker, or serverless architecture
              for advanced projects.
            </p>
            <span className="right-container3-arrow"></span>
          </div>
        </div>
      </div>
  );
};

export default Node;
