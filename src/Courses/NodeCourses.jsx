import React from "react";
import "./NodeCourses.css";

const NodeCourses = () => {
  return (
    <div className="node-page">
      <h1>Node.js Overview</h1>

      {/* Introduction */}
      <section className="node-section">
        <h2>Introduction</h2>
        <p>
          Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows
          you to run JavaScript on the server side and build scalable network
          applications.
        </p>
      </section>

      {/* Key Features */}
      <section className="node-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Asynchronous & Event-Driven:</strong> Non-blocking I/O for
            high performance.
          </li>
          <li>
            <strong>Single Programming Language:</strong> JavaScript can be used
            on both client and server.
          </li>
          <li>
            <strong>Fast Execution:</strong> Uses Chrome's V8 engine to execute
            JavaScript efficiently.
          </li>
          <li>
            <strong>Rich Package Ecosystem:</strong> Access thousands of
            libraries via npm.
          </li>
        </ul>
      </section>

      {/* Installing Node.js */}
      <section className="node-section">
        <h2>Installing Node.js</h2>
        <p>
          Download and install Node.js from the{" "}
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            official website
          </a>
          .
        </p>
        <pre>
          {`# Verify Installation
node -v
npm -v`}
        </pre>
      </section>

      {/* Creating a Simple Server */}
      <section className="node-section">
        <h2>Creating a Simple Server</h2>
        <p>
          Use the built-in <code>http</code> module to create a server:
        </p>
        <pre>
          {`const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js!');
});

server.listen(3000, () => console.log('Server running on port 3000'));`}
        </pre>
      </section>

      {/* Express.js */}
      <section className="node-section">
        <h2>Building APIs with Express.js</h2>
        <p>
          Express.js is a popular framework for building web applications with
          Node.js.
        </p>
        <pre>
          {`const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello, Express!'));

app.listen(3000, () => console.log('Server running on port 3000'));`}
        </pre>
      </section>

      {/* Working with Databases */}
      <section className="node-section">
        <h2>Working with Databases</h2>
        <p>
          Node.js supports various databases like MongoDB, MySQL, and
          PostgreSQL.
        </p>
        <pre>
          {`// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));`}
        </pre>
      </section>

      {/* Getting Started */}
      <section className="node-section">
        <h2>Getting Started</h2>
        <ol>
          <li>
            <strong>Install Node.js:</strong> Download from{" "}
            <a href="https://nodejs.org">nodejs.org</a>.
          </li>
          <li>
            <strong>Initialize Project:</strong> Run <code>npm init -y</code> to
            create a <code>package.json</code>.
          </li>
          <li>
            <strong>Install Dependencies:</strong> Use{" "}
            <code>npm install express</code> for web frameworks.
          </li>
          <li>
            <strong>Run Server:</strong> Start the application using{" "}
            <code>node server.js</code>.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default NodeCourses;
