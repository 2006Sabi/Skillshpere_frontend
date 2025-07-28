// Search Index for SkillSphere Platform
// This file contains indexed content for search functionality

const indexedContent = [
  // Courses
  {
    id: "react-course",
    title: "React.js Mastery",
    type: "course",
    category: "frontend",
    difficulty: "intermediate",
    url: "/courses/react",
    description:
      "Master React.js from basics to advanced concepts including hooks, context, and performance optimization.",
    tags: [
      "react",
      "javascript",
      "frontend",
      "hooks",
      "context",
      "performance",
    ],
    matchedSections: [
      "Introduction to React",
      "Hooks and State Management",
      "Advanced Patterns",
    ],
  },
  {
    id: "node-course",
    title: "Node.js Backend Development",
    type: "course",
    category: "backend",
    difficulty: "intermediate",
    url: "/courses/node",
    description:
      "Build scalable backend applications with Node.js, Express, and MongoDB.",
    tags: ["nodejs", "express", "backend", "api", "server"],
    matchedSections: [
      "Node.js Fundamentals",
      "Express.js Framework",
      "API Development",
    ],
  },
  {
    id: "mongodb-course",
    title: "MongoDB Database Design",
    type: "course",
    category: "database",
    difficulty: "beginner",
    url: "/courses/mongodb",
    description:
      "Learn MongoDB from fundamentals to advanced aggregation and optimization techniques.",
    tags: ["mongodb", "database", "nosql", "aggregation", "optimization"],
    matchedSections: [
      "MongoDB Basics",
      "Data Modeling",
      "Aggregation Pipeline",
    ],
  },
  {
    id: "express-course",
    title: "Express.js Framework",
    type: "course",
    category: "backend",
    difficulty: "intermediate",
    url: "/courses/express",
    description:
      "Master Express.js for building robust web applications and APIs.",
    tags: ["express", "nodejs", "backend", "middleware", "routing"],
    matchedSections: [
      "Express Setup",
      "Middleware",
      "Routing",
      "Error Handling",
    ],
  },

  // Roadmaps
  {
    id: "react-roadmap",
    title: "React Developer Roadmap",
    type: "roadmap",
    category: "frontend",
    difficulty: "intermediate",
    url: "/roadmap/react",
    description:
      "Complete roadmap to become a React.js developer from beginner to expert.",
    tags: ["react", "roadmap", "frontend", "career", "learning-path"],
    matchedSections: [
      "Fundamentals",
      "Advanced Concepts",
      "Ecosystem",
      "Best Practices",
    ],
  },
  {
    id: "node-roadmap",
    title: "Node.js Developer Roadmap",
    type: "roadmap",
    category: "backend",
    difficulty: "intermediate",
    url: "/roadmap/node",
    description:
      "Step-by-step guide to mastering Node.js and backend development.",
    tags: ["nodejs", "roadmap", "backend", "server", "api"],
    matchedSections: [
      "JavaScript Fundamentals",
      "Node.js Core",
      "Frameworks",
      "Deployment",
    ],
  },
  {
    id: "mongodb-roadmap",
    title: "MongoDB Learning Path",
    type: "roadmap",
    category: "database",
    difficulty: "beginner",
    url: "/roadmap/mongodb",
    description:
      "Comprehensive learning path for MongoDB database administration and development.",
    tags: ["mongodb", "roadmap", "database", "nosql", "administration"],
    matchedSections: [
      "Database Concepts",
      "CRUD Operations",
      "Indexing",
      "Performance",
    ],
  },
  {
    id: "express-roadmap",
    title: "Express.js Learning Path",
    type: "roadmap",
    category: "backend",
    difficulty: "intermediate",
    url: "/roadmap/express",
    description: "Complete learning path for Express.js web framework mastery.",
    tags: ["express", "roadmap", "backend", "web-framework", "api"],
    matchedSections: ["Framework Basics", "Middleware", "Security", "Testing"],
  },

  // Additional Content
  {
    id: "typescript-course",
    title: "TypeScript Fundamentals",
    type: "course",
    category: "frontend",
    difficulty: "intermediate",
    url: "/courses/typescript",
    description:
      "Learn TypeScript from scratch and build type-safe applications.",
    tags: ["typescript", "javascript", "types", "frontend"],
    matchedSections: [
      "Type System",
      "Interfaces",
      "Generics",
      "Advanced Types",
    ],
  },
  {
    id: "graphql-course",
    title: "GraphQL API Development",
    type: "course",
    category: "backend",
    difficulty: "advanced",
    url: "/courses/graphql",
    description:
      "Master GraphQL and build efficient APIs for modern applications.",
    tags: ["graphql", "api", "backend", "schema", "resolvers"],
    matchedSections: [
      "GraphQL Schema",
      "Resolvers",
      "Mutations",
      "Subscriptions",
    ],
  },
  {
    id: "docker-course",
    title: "Docker & Kubernetes",
    type: "course",
    category: "devops",
    difficulty: "intermediate",
    url: "/courses/docker",
    description:
      "Containerize your applications and deploy with confidence using Docker and Kubernetes.",
    tags: ["docker", "kubernetes", "containers", "devops", "deployment"],
    matchedSections: [
      "Container Basics",
      "Docker Compose",
      "Kubernetes",
      "CI/CD",
    ],
  },
];

// Search function that performs fuzzy search on content
export const searchContent = (query) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results = [];

  indexedContent.forEach((item) => {
    let relevance = 0;
    const matchedSections = [];

    // Search in title
    if (item.title.toLowerCase().includes(searchTerm)) {
      relevance += 10;
    }

    // Search in description
    if (item.description.toLowerCase().includes(searchTerm)) {
      relevance += 5;
    }

    // Search in tags
    item.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(searchTerm)) {
        relevance += 3;
      }
    });

    // Search in matched sections
    item.matchedSections.forEach((section) => {
      if (section.toLowerCase().includes(searchTerm)) {
        relevance += 2;
        matchedSections.push(section);
      }
    });

    // Search in category and type
    if (item.category.toLowerCase().includes(searchTerm)) {
      relevance += 2;
    }
    if (item.type.toLowerCase().includes(searchTerm)) {
      relevance += 2;
    }
    if (item.difficulty.toLowerCase().includes(searchTerm)) {
      relevance += 1;
    }

    // If we found matches, add to results
    if (relevance > 0) {
      results.push({
        ...item,
        relevance,
        matchedSections:
          matchedSections.length > 0 ? matchedSections : item.matchedSections,
      });
    }
  });

  // Sort by relevance (highest first)
  return results.sort((a, b) => b.relevance - a.relevance);
};

// Get all indexed content for browsing
export const getAllIndexedContent = () => {
  return indexedContent.map((item) => ({
    ...item,
    relevance: 0,
    matchedSections: item.matchedSections,
  }));
};

// Get content by category
export const getContentByCategory = (category) => {
  return indexedContent.filter((item) => item.category === category);
};

// Get content by type
export const getContentByType = (type) => {
  return indexedContent.filter((item) => item.type === type);
};

// Get content by difficulty
export const getContentByDifficulty = (difficulty) => {
  return indexedContent.filter((item) => item.difficulty === difficulty);
};
