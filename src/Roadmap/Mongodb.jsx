import React from "react";
import "./Mongodb.css";

const Mongodb = () => {
  return (
      <div className="timeline">
        <h1>RoadMap for MongoDB</h1>

        <div className="container left-container">
          <div className="text-box">
            <h2>MongoDB Basics</h2>
            <p>
              MongoDB is an open-source, document-oriented database that stores
              data in collections and documents.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <div className="text-box">
            <h2>Data Models and Datatypes</h2>
            <p>
              Data models define how data is organized in collections, typically
              using schemas for structure. Data types include strings, numbers,
              arrays, objects, dates, and more, representing BSON (Binary JSON)
              format.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <div className="text-box">
            <h2>Collections and Methods</h2>
            <p>
              Collections store related documents, and methods like insertOne(),
              find(), updateOne(), and deleteOne() perform CRUD operations and
              data aggregation.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <div className="text-box">
            <h2>Query Operators</h2>
            <p>
              MongoDB query operators include comparison ($eq, $gt), logical
              ($and, $or), element ($exists), array ($all), and evaluation
              ($regex).
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <div className="text-box">
            <h2>Performance Optimization</h2>
            <p>
              Performance optimization in MongoDB involves indexing, query
              optimization, sharding, schema design, and limiting unnecessary
              data transfers.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <div className="text-box">
            <h2>MongoDB Aggregation</h2>
            <p>
              MongoDB Aggregation processes data through a pipeline of stages
              (e.g., $match, $group, $project, $sort) to transform and analyze
              it efficiently.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <div className="text-box">
            <h2>Transactions</h2>
            <p>
              MongoDB transactions allow multiple operations to be executed as a
              single unit, ensuring atomicity, consistency, isolation, and
              durability (ACID) across multiple documents and collections.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <div className="text-box">
            <h2>Developer Tools</h2>
            <p>
              MongoDB developer tools include MongoDB Compass (GUI for managing
              databases), mongodump/mongorestore (for backup and restore), mongo
              shell (interactive shell for queries), and Mongoose (Node.js ODM
              for MongoDB).
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="container left-container">
          <div className="text-box">
            <h2>Scaling MongoDB</h2>
            <p>
              Scaling MongoDB can be achieved through sharding (distributing
              data across multiple servers) and replication (creating copies of
              data for high availability).
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="container right-container">
          <div className="text-box">
            <h2>MongoDB Security</h2>
            <p>
              MongoDB security features include authentication (user login with
              roles), authorization (access control with roles and privileges),
              encryption (data-at-rest and in-transit), and audit logging
              (tracking operations).
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>
      </div>
  );
};

export default Mongodb;
