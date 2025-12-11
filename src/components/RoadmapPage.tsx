import React, { useState, useEffect } from "react";

const RoadmapPage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems([0, 1, 2, 3]);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "10px 20px",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "60px",
    },
    title: {
      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "20px",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#5a6c7d",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    roadmapGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "40px",
    },
    technologyCard: {
      background: "white",
      borderRadius: "20px",
      padding: "40px 30px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "1px solid #f0f0f0",
      position: "relative" as const,
      overflow: "hidden",
    },
    techIcon: {
      width: "60px",
      height: "60px",
      marginBottom: "20px",
      borderRadius: "12px",
    },
    techTitle: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "15px",
    },
    techDescription: {
      color: "#5a6c7d",
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "25px",
    },
    topicsList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    topicItem: {
      padding: "8px 0",
      color: "#4a5568",
      fontSize: "0.95rem",
      borderBottom: "1px solid #f0f0f0",
      display: "flex",
      alignItems: "center",
    },
    topicLink: {
      textDecoration: "none",
      color: "#4a5568",
      transition: "color 0.2s",
    },
    topicLinkHover: {
      color: "#2b6cb0",
    },
    checkIcon: {
      width: "16px",
      height: "16px",
      marginRight: "10px",
      color: "#48bb78",
    },
    cardGradient: {
      position: "absolute" as const,
      top: "0",
      left: "0",
      right: "0",
      height: "4px",
    },
  };

  // 📌 MASTER TOPIC LINKS (official documentation)
  const topicLinks: Record<string, string> = {
    // MongoDB
    "Database Design & Schema":
      "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/",
    "Collections & Documents":
      "https://www.mongodb.com/docs/manual/core/databases-and-collections/",
    "CRUD Operations": "https://www.mongodb.com/docs/manual/crud/",
    "Aggregation Pipeline": "https://www.mongodb.com/docs/manual/aggregation/",
    "Indexing & Performance": "https://www.mongodb.com/docs/manual/indexes/",
    "MongoDB Atlas": "https://www.mongodb.com/atlas",

    // Express.js
    "Routing & Middleware": "https://expressjs.com/en/guide/routing.html",
    "RESTful API Design": "https://expressjs.com/en/guide/routing.html",
    "Authentication & Security":
      "https://expressjs.com/en/advanced/best-practice-security.html",
    "Error Handling": "https://expressjs.com/en/guide/error-handling.html",
    "Template Engines":
      "https://expressjs.com/en/guide/using-template-engines.html",
    "Deployment Strategies":
      "https://expressjs.com/en/advanced/best-practice-performance.html",

    // React.js
    "Components & JSX": "https://react.dev/learn/writing-markup-with-jsx",
    "State Management": "https://react.dev/learn/state-a-components-memory",
    "Hooks & Lifecycle": "https://react.dev/reference/react",
    "Props & Event Handling":
      "https://react.dev/learn/passing-props-to-a-component",
    "Routing with React Router":
      "https://reactrouter.com/en/main/start/overview",
    "Context API & Redux":
      "https://medium.com/@balankdharan/react-context-api-vs-redux-differences-benefits-and-use-cases-1478e75d65ec",

    // Node.js
    "Event-Driven Architecture":
      "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",
    "File System Operations": "https://nodejs.org/api/fs.html",
    "NPM Package Management": "https://docs.npmjs.com/",
    "Asynchronous Programming":
      "https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking",
    "API Development":
      "https://www.freecodecamp.org/news/learn-api-fundamentals-and-architecture/",
    "Server-Side Rendering": "https://react.dev/reference/react-dom/server",
  };

  const technologies = [
    {
      title: "MongoDB",
      description: "NoSQL database for storing and retrieving data efficiently",
      icon: "https://cdn-icons-png.flaticon.com/512/4492/4492311.png",
      gradient: "linear-gradient(90deg, #4DB33D, #3F9A2F)",
      topics: [
        "Database Design & Schema",
        "Collections & Documents",
        "CRUD Operations",
        "Aggregation Pipeline",
        "Indexing & Performance",
        "MongoDB Atlas",
      ],
    },
    {
      title: "Express.js",
      description: "Fast, unopinionated web framework for Node.js applications",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      gradient: "linear-gradient(90deg, #303030, #505050)",
      topics: [
        "Routing & Middleware",
        "RESTful API Design",
        "Authentication & Security",
        "Error Handling",
        "Template Engines",
        "Deployment Strategies",
      ],
    },
    {
      title: "React.js",
      description: "A JavaScript library for building user interfaces",
      icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
      gradient: "linear-gradient(90deg, #61DAFB, #21AECF)",
      topics: [
        "Components & JSX",
        "State Management",
        "Hooks & Lifecycle",
        "Props & Event Handling",
        "Routing with React Router",
        "Context API & Redux",
      ],
    },
    {
      title: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      gradient: "linear-gradient(90deg, #68A063, #4F7942)",
      topics: [
        "Event-Driven Architecture",
        "File System Operations",
        "NPM Package Management",
        "Asynchronous Programming",
        "API Development",
        "Server-Side Rendering",
      ],
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>MERN Stack Roadmap</h1>
        <p style={styles.subtitle}>
          Master full-stack development with MongoDB, Express.js, React, and
          Node.js. Follow this comprehensive roadmap to become a proficient MERN
          stack developer.
        </p>
      </div>

      <div style={styles.roadmapGrid}>
        {technologies.map((tech, index) => (
          <div
            key={index}
            style={{
              ...styles.technologyCard,
              transform: visibleItems.includes(index)
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)",
              opacity: visibleItems.includes(index) ? 1 : 0,
              transitionDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{ ...styles.cardGradient, background: tech.gradient }}
            ></div>

            <img src={tech.icon} alt={tech.title} style={styles.techIcon} />

            <h2 style={styles.techTitle}>{tech.title}</h2>
            <p style={styles.techDescription}>{tech.description}</p>

            <h3
              style={{
                color: "#2c3e50",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              Key Topics:
            </h3>

            <ul style={styles.topicsList}>
              {tech.topics.map((topic, topicIndex) => (
                <li key={topicIndex} style={styles.topicItem}>
                  <span style={{ ...styles.checkIcon, fontSize: "14px" }}>
                    ✓
                  </span>

                  {/* CLICKABLE TOPIC LINK */}
                  <a
                    href={topicLinks[topic]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.topicLink}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#2b6cb0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#4a5568")
                    }
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
