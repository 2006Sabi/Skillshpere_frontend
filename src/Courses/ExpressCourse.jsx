import React from "react";
import "./ExpressCourse.css";

const ExpressCourse = () => {
  return (
    <div className="express-page">
      <h1>Express.js Overview</h1>

      {/* Introduction */}
      <section className="express-section">
        <h2>Introduction</h2>
        <p>
          Express.js is a fast, unopinionated, and minimalist web framework for
          Node.js. It simplifies backend development by providing a set of
          powerful tools for handling requests, responses, and middleware.
        </p>
      </section>

      {/* Key Features */}
      <section className="express-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Lightweight & Fast:</strong> Minimalist design with
            essential features.
          </li>
          <li>
            <strong>Middleware Support:</strong> Use middleware functions to
            handle requests efficiently.
          </li>
          <li>
            <strong>Routing:</strong> Define routes easily using simple and
            intuitive syntax.
          </li>
          <li>
            <strong>Template Engines:</strong> Supports Pug, EJS, and Handlebars
            for dynamic HTML.
          </li>
        </ul>
      </section>

      {/* Installing Express.js */}
      <section className="express-section">
        <h2>Installing Express.js</h2>
        <p>Install Express.js globally using npm:</p>
        <pre>
          {`# Install Express
npm install express`}
        </pre>
      </section>

      {/* Creating a Basic Server */}
      <section className="express-section">
        <h2>Creating a Basic Server</h2>
        <p>Create a simple Express.js server with routing:</p>
        <pre>
          {`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => console.log('Server running on port 3000'));`}
        </pre>
      </section>

      {/* Express Routing */}
      <section className="express-section">
        <h2>Routing in Express.js</h2>
        <p>Define routes for different HTTP methods:</p>
        <pre>
          {`app.get('/home', (req, res) => res.send('Welcome to Home Page!'));

app.post('/submit', (req, res) => res.send('Form Submitted!'));

app.put('/update', (req, res) => res.send('Data Updated!'));

app.delete('/delete', (req, res) => res.send('Data Deleted!'));`}
        </pre>
      </section>

      {/* Middleware */}
      <section className="express-section">
        <h2>Using Middleware</h2>
        <p>
          Middleware functions allow request processing before reaching the
          final handler:
        </p>
        <pre>
          {`const logger = (req, res, next) => {
  console.log(\`Request received: \${req.method} \${req.url}\`);
  next();
};

app.use(logger);`}
        </pre>
      </section>

      {/* Handling JSON Requests */}
      <section className="express-section">
        <h2>Handling JSON Requests</h2>
        <p>Express can handle JSON requests using built-in middleware:</p>
        <pre>
          {`app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});`}
        </pre>
      </section>

      {/* Connecting to MongoDB */}
      <section className="express-section">
        <h2>Connecting to MongoDB</h2>
        <p>Use Mongoose to connect Express.js with MongoDB:</p>
        <pre>
          {`const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));`}
        </pre>
      </section>

      {/* Getting Started */}
      <section className="express-section">
        <h2>Getting Started</h2>
        <ol>
          <li>
            <strong>Install Express.js:</strong> Run{" "}
            <code>npm install express</code>.
          </li>
          <li>
            <strong>Set Up Server:</strong> Create an <code>index.js</code> file
            and import Express.
          </li>
          <li>
            <strong>Define Routes:</strong> Handle different HTTP methods.
          </li>
          <li>
            <strong>Use Middleware:</strong> Implement middleware functions.
          </li>
          <li>
            <strong>Connect Database:</strong> Use MongoDB or another database
            for data storage.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default ExpressCourse;
