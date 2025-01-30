import React from "react";
import "./MongoDBPage.css";

const MongoDBPage = () => {
  return (
    <div className="mongodb-page">
      <h1>MongoDB Overview</h1>

      {/* Introduction */}
      <section className="mongodb-section">
        <h2>Introduction</h2>
        <p>
          MongoDB is a document-oriented NoSQL database designed for high
          performance, scalability, and flexibility. Unlike traditional
          relational databases, MongoDB stores data in JSON-like documents,
          allowing for a dynamic schema and more natural data modeling.
        </p>
      </section>

      {/* Key Features */}
      <section className="mongodb-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Flexible Schema:</strong> Unlike SQL databases, MongoDB
            allows documents in a collection to have different structures.
          </li>
          <li>
            <strong>Scalability:</strong> Supports horizontal scaling through
            sharding, distributing data across multiple servers.
          </li>
          <li>
            <strong>High Performance:</strong> Optimized for high-speed read and
            write operations.
          </li>
          <li>
            <strong>Rich Query Language:</strong> Supports advanced queries,
            filtering, indexing, and real-time aggregation.
          </li>
        </ul>
      </section>

      {/* Core Concepts */}
      <section className="mongodb-section">
        <h2>Core Concepts</h2>
        <ul>
          <li>
            <strong>Document:</strong> The fundamental data unit, stored in BSON
            format.
          </li>
          <li>
            <strong>Collection:</strong> A group of documents, similar to a
            table in SQL databases.
          </li>
          <li>
            <strong>Replica Set:</strong> A cluster of MongoDB nodes ensuring
            redundancy and high availability.
          </li>
          <li>
            <strong>Sharding:</strong> A technique for distributing large
            datasets across multiple servers.
          </li>
        </ul>
      </section>

      {/* CRUD Operations */}
      <section className="mongodb-section">
        <h2>CRUD Operations</h2>
        <p>MongoDB provides the following essential operations:</p>
        <ul>
          <li>
            <strong>Create:</strong> Insert new documents into collections.
          </li>
          <li>
            <strong>Read:</strong> Query documents using flexible filtering
            criteria.
          </li>
          <li>
            <strong>Update:</strong> Modify existing documents based on
            conditions.
          </li>
          <li>
            <strong>Delete:</strong> Remove documents from collections.
          </li>
        </ul>
      </section>

      {/* Data Modeling */}
      <section className="mongodb-section">
        <h2>Data Modeling</h2>
        <p>
          MongoDB allows both embedded (denormalized) and referenced
          (normalized) data models. Choosing between them depends on your
          application’s data access patterns.
        </p>
      </section>

      {/* Indexing */}
      <section className="mongodb-section">
        <h2>Indexing</h2>
        <p>
          Indexes enhance query performance by allowing MongoDB to locate
          documents efficiently. Index types include single-field, compound,
          text, and geospatial indexes.
        </p>
      </section>

      {/* Aggregation Framework */}
      <section className="mongodb-section">
        <h2>Aggregation Framework</h2>
        <p>
          MongoDB's aggregation framework processes and transforms data using a
          pipeline approach, enabling operations like filtering, grouping, and
          calculating aggregate values.
        </p>
      </section>

      {/* Replication */}
      <section className="mongodb-section">
        <h2>Replication</h2>
        <p>
          MongoDB uses replica sets to ensure data redundancy. If the primary
          node fails, a secondary node automatically takes over.
        </p>
      </section>

      {/* Sharding */}
      <section className="mongodb-section">
        <h2>Sharding</h2>
        <p>
          Sharding enables horizontal scaling by distributing data across
          multiple servers, preventing performance bottlenecks in large-scale
          applications.
        </p>
      </section>

      {/* Security */}
      <section className="mongodb-section">
        <h2>Security</h2>
        <p>
          MongoDB offers robust security features, including authentication,
          authorization, encryption, and auditing to safeguard data integrity.
        </p>
      </section>

      {/* Getting Started */}
      <section className="mongodb-section">
        <h2>Getting Started</h2>
        <ol>
          <li>
            <strong>Install MongoDB:</strong> Download and install from the{" "}
            <a
              href="https://www.mongodb.com/docs/manual/installation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              official MongoDB website
            </a>
            .
          </li>
          <li>
            <strong>Start the MongoDB Server:</strong> Run <code>mongod</code>{" "}
            in the terminal.
          </li>
          <li>
            <strong>Create a Database:</strong> Use <code>use myDatabase</code>{" "}
            in the MongoDB shell.
          </li>
          <li>
            <strong>Insert Documents:</strong> Use{" "}
            <code>{'db.collection.insertOne({ name: "John", age: 30 })'}</code>.
          </li>
          <li>
            <strong>Query Documents:</strong> Use{" "}
            <code>{"db.collection.find({ age: 30 })"}</code> to retrieve data.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default MongoDBPage;
