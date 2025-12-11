import React, { useState, useEffect } from "react";

const ProjectsPage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeProjectKey, setActiveProjectKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(Array.from({ length: 12 }, (_, i) => i));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "10px 20px",
    },

    header: {
      textAlign: "center",
      marginBottom: "50px",
    },

    title: {
      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "20px",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text" as any,
      WebkitTextFillColor: "transparent" as any,
    },

    subtitle: {
      fontSize: "1.2rem",
      color: "#5a6c7d",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: 1.6,
    },

    levelSection: {
      marginBottom: "60px",
    },

    levelTitle: {
      fontSize: "1.8rem",
      fontWeight: 700,
      color: "#2c3e50",
      marginBottom: "30px",
      paddingLeft: "20px",
      borderLeft: "4px solid #667eea",
    },

    // grid container now keeps items in fixed columns but overlay will not change layout
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "30px",
      alignItems: "start",
    },

    // Card - uniform sizing & layout
    projectCard: {
      background: "white",
      borderRadius: "16px",
      padding: "25px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      border: "1px solid #f0f0f0",
      cursor: "pointer",
      position: "relative",
      overflow: "visible", // allow overlay to appear outside card
      minHeight: "360px", // uniform card height
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    projectHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "15px",
      gap: "12px",
    },

    projectTitle: {
      fontSize: "1.3rem",
      fontWeight: 600,
      color: "#2c3e50",
      margin: 0,
      flex: 1,
      lineHeight: 1.15,
    },

    difficultyBadge: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },

    projectDescription: {
      color: "#5a6c7d",
      fontSize: "0.95rem",
      lineHeight: 1.6,
      marginBottom: "14px",
      maxHeight: "108px", // prevent long descriptions from expanding card content
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    techStack: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "12px",
    },

    techTag: {
      padding: "4px 10px",
      background: "#f7fafc",
      color: "#4a5568",
      fontSize: "0.8rem",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
    },

    // footer pinned at bottom of card
    projectFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "12px",
      flexShrink: 0,
    },

    duration: {
      color: "#718096",
      fontSize: "0.85rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },

    startButton: {
      padding: "8px 20px",
      background: "linear-gradient(45deg, #667eea, #764ba2)",
      color: "white",
      border: "none",
      borderRadius: "20px",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "transform 0.15s ease",
    },

    levelBadge: {
      position: "absolute",
      top: "15px",
      right: "15px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
    },

    // overlay steps panel — absolute positioned so it doesn't affect grid row height
    stepsOverlay: {
      position: "absolute",
      top: "calc(100% + 12px)",
      left: 0,
      width: "100%",
      background: "white",
      borderRadius: "12px",
      padding: "18px",
      boxShadow: "0 20px 40px rgba(2,6,23,0.16)",
      border: "1px solid #e6edf3",
      zIndex: 120,
      maxHeight: "360px",
      overflowY: "auto",
    },

    stepsContainer: {
      marginTop: "16px",
      paddingTop: "12px",
      borderTop: "1px solid #e2e8f0",
    },

    stepsTitle: {
      fontSize: "0.95rem",
      fontWeight: 600,
      marginBottom: "8px",
      color: "#2d3748",
    },

    stepsList: {
      margin: 0,
      paddingLeft: "18px",
      fontSize: "0.95rem",
      color: "#4a5568",
      lineHeight: 1.8,
    },

    // small responsive helpers you can use conditionally in component
    smallCardMinHeight: {
      minHeight: "320px",
    },
    compactPadding: {
      padding: "16px",
    },
  };


  const projects = {
    beginner: [
      {
        title: "Todo List App",
        description:
          "A simple CRUD application to manage daily tasks with React frontend and Express backend.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        duration: "1-2 weeks",
        difficulty: "Beginner",
        color: "#48bb78",
        steps: [
          "Initialize project: create React app (e.g. `npx create-react-app todo-app --template typescript`) and a backend folder (`server`). Commit initial repo and create basic README.",
          "Frontend components: Create TaskList, TaskItem, AddTaskForm, and Header. Implement local UI state initially (useState) and style components. Use controlled inputs and basic validation for required fields.",
          "Backend API: Initialize Express server (`npm init`, install express, mongoose, cors). Create routes: GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id. Use JSON body parsing and basic error handling.",
          "Database model: Create Mongoose model (Todo) with fields { title: String, completed: Boolean, createdAt: Date, dueDate?: Date, notes?: String } and add indexes if needed.",
          "Connect frontend to backend: Use Axios or fetch. Implement CRUD calls and update UI after each response (optimistic update optional). Handle loading and error states.",
          "Update flow details: For editing a task, populate the form with current values, call PUT /tasks/:id with changed fields, and update local state upon success. Validate inputs on both client and server.",
          'Edge cases & polishing: Add "mark all completed", filter by status (all/completed/pending), and persist preferences in localStorage. Add unit tests for the backend route handlers if possible.',
          "Deployment: Deploy backend (Heroku/Render/Cyclic) and frontend (Vercel/Netlify). Set environment variables for MONGO_URI, and ensure CORS allows your frontend origin. Add CI step (GitHub Actions) to run tests on push.",
        ],
      },
      {
        title: "Personal Blog",
        description:
          "Create a personal blogging platform where users can write, edit, and publish articles.",
        techStack: ["React", "Express", "MongoDB", "JWT"],
        duration: "2-3 weeks",
        difficulty: "Beginner",
        color: "#48bb78",
        steps: [
          "Project scaffolding: Create mono-repo or two folders (client/server). Initialize React app and Express server. Set up ESLint and Prettier and a gitignore.",
          "Auth system (basic): Implement user model with fields {username, email, passwordHash}. Create /auth/register and /auth/login endpoints. Use bcrypt to hash passwords and jsonwebtoken to sign tokens (short expiry + refresh token optional).",
          "Post model & API: Create Post model { title, body, authorId, tags, published, createdAt, updatedAt }. Implement endpoints GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id. Protect create/update/delete with JWT middleware.",
          "Frontend pages: Home showing list of posts, Post detail page, Login/Register pages, Create/Edit post page. Use React Router for navigation. For Create/Edit, use a controlled form or rich text editor (React Quill).",
          "Update flow and draft support: Allow saving drafts (published: false). For updates, fetch post data into the edit form, validate fields, and call PUT /posts/:id. Store updatedAt on each update and show author & timestamps.",
          "Images & uploads: Add image upload with multer on server and store images on disk or AWS S3 for production. Secure uploads (size limits, MIME type checks).",
          "Polish & deploy: Add tags and search, add pagination, add basic SEO (meta tags), integrate comment system (optional). Deploy backend and frontend, set environment variables and secure JWT secret.",
        ],
      },
      {
        title: "Weather Dashboard",
        description:
          "Build a weather application that displays current weather and forecasts using external APIs.",
        techStack: ["React", "Node.js", "API Integration"],
        duration: "1 week",
        difficulty: "Beginner",
        color: "#48bb78",
        steps: [
          "Design UI: Create a small React app with a search input and a WeatherCard component. Decide the data to show: temperature, description, humidity, wind, icon, and forecast.",
          "Choose API & key management: Sign up for OpenWeatherMap (or other). For security, either use client-side (if key allows) or create a small Node proxy endpoint to keep the key secret (`/api/weather?city=...`).",
          "Backend proxy (optional): In Express create GET /api/weather which fetches data from OpenWeatherMap and returns only needed fields. This prevents exposing API key in client code.",
          "Integrate & display: Use fetch/axios from React to call the backend or directly the API. Map the JSON to your UI fields and show appropriate icons for weather codes. Show a 3-5 day forecast if available.",
          "Update & caching: Cache last successful search in localStorage and use it as initial view. Implement debounce (300ms) for search input to avoid many API calls.",
          "Polish & deploy: Add loading skeletons, error messages for invalid city, and mobile-friendly layout. Deploy to Vercel/Netlify and backend to Render/Cyclic if used.",
        ],
      },
      {
        title: "Recipe Finder",
        description:
          "An app to search and display recipes from various cuisines with ingredient lists.",
        techStack: ["React", "Express", "MongoDB", "API"],
        duration: "2 weeks",
        difficulty: "Beginner",
        color: "#48bb78",
        steps: [
          "App skeleton: Initialize React and Express. Decide whether you’ll save favorites to your DB or just use client-only favorites (localStorage).",
          "Integrate recipe API: Register for Spoonacular/Edamam, implement server-side proxy route /api/recipes?query=... to call the external API and normalize results (title, image, ingredients, instructions, cuisine).",
          "Search UI and results: Build the search input, results grid, and RecipeDetail page. Display list of ingredients and step-by-step instructions. Include filters (vegetarian, cuisine, time).",
          "Favorites & persistence: Add a favorites endpoint (POST /favorites, GET /favorites) and a Mongoose model for saved recipes if you want server persistence. Otherwise store favorites in localStorage.",
          "Update & improvements: Add pagination or infinite scroll for results. Allow users to save notes per saved recipe. For updating saved recipe notes, use PUT /favorites/:id.",
          "Security & deployment: Validate inputs to avoid malformed API calls. Deploy backend (set API key env var) and frontend and test end-to-end.",
        ],
      },
    ],
    intermediate: [
      {
        title: "E-commerce Store",
        description:
          "Full-featured online store with product catalog, shopping cart, user authentication, and payment integration.",
        techStack: ["React", "Redux", "Express", "MongoDB", "Stripe"],
        duration: "4-6 weeks",
        difficulty: "Intermediate",
        color: "#ed8936",
        steps: [
          "Domain modeling & planning: Define Mongoose schemas for User, Product, Cart (or Cart items), Order, and Review. Decide fields: product {title, price, inventory, images, description, categories}.",
          "Auth & user roles: Implement JWT auth (register/login) and user roles (admin/customer). Protect admin routes with role middleware and standardize error responses.",
          "Product APIs: Build endpoints GET /products, GET /products/:id, POST /products (admin), PUT /products/:id, DELETE /products/:id. Add search, filter, and pagination on the server side.",
          "Cart & checkout flow: Implement cart on frontend (Redux) and a cart API backend to persist cart for logged-in users. Create order endpoints: POST /orders to create order and store transactions.",
          "Payment integration: Integrate Stripe Checkout or Payment Intents. Server-side create payment session and handle webhooks (/api/webhooks/stripe) to mark orders paid.",
          "Update flows: For updating product inventory after payment, run inventory decrement as part of order processing. Add admin order status updates (shipped/delivered) via PUT /orders/:id.",
          "Testing & scaling: Add unit tests for payment-critical paths and mock Stripe in tests. Add caching for product listing (Redis optional). Deploy backend with environment variables and enable HTTPS for payment callbacks.",
        ],
      },
      {
        title: "Social Media Platform",
        description:
          "Build a social networking app with user profiles, posts, comments, likes, and real-time messaging.",
        techStack: ["React", "Socket.io", "Express", "MongoDB", "JWT"],
        duration: "6-8 weeks",
        difficulty: "Intermediate",
        color: "#ed8936",
        steps: [
          "Data modeling: Create schemas for User (profile info), Post (content, authorId, likesCount), Comment, and Follow relationships. Add indexes for feed queries (createdAt, author).",
          "Auth & profiles: Implement JWT auth with refresh tokens. Build profile editing routes and privacy settings. Use middleware to attach req.user from JWT.",
          "Posting & feed: Create APIs for creating posts, fetching a feed (home/timeline), liking/unliking posts, adding comments. Implement server-side pagination and sorting (cursor-based recommended).",
          "Real-time features: Use Socket.io for direct messaging and for notifications (likes/comments). Architect graceful reconnection and presence indicators.",
          "Update & edit flows: Allow editing/deleting posts with proper authorization checks. For content moderation, consider soft-deletes and an admin report endpoint.",
          "Performance & polishing: Implement image uploads (AWS S3), use CDN for assets, add optimistic UI updates (client assumes success then reverts on error), and deploy with horizontal scaling in mind.",
        ],
      },
      {
        title: "Project Management Tool",
        description:
          "Create a collaborative project management application with teams, tasks, deadlines, and progress tracking.",
        techStack: ["React", "Redux", "Express", "MongoDB", "WebSockets"],
        duration: "5-7 weeks",
        difficulty: "Intermediate",
        color: "#ed8936",
        steps: [
          "Requirements & schema: Define Project, Task, User, Team models. Task should include fields like {title, description, assigneeId, status, priority, dueDate, comments}.",
          "API endpoints: Build REST API for projects and tasks (CRUD). Add endpoints for assigning users and changing task status. Implement task history logging for auditing updates.",
          "Frontend boards & UI: Implement Kanban-style board (columns per status) and task details modal. Use Redux to keep global state for selected project and filtering options.",
          "Real-time collaboration: Add WebSocket support to broadcast task updates, status changes, comments, and presence to project members in real-time.",
          "Update flows & conflict handling: When multiple users edit a task, implement optimistic locking or conflict resolution (Etag/version fields). Provide activity feed to show recent changes.",
          "Reporting & deploy: Add project progress charts, export tasks to CSV, and deploy backend and frontend. Consider background jobs for reminders (cron or queue) and email notifications.",
        ],
      },
      {
        title: "Online Learning Platform",
        description:
          "Educational platform with course creation, video streaming, quizzes, and progress tracking.",
        techStack: ["React", "Express", "MongoDB", "AWS S3", "JWT"],
        duration: "6-8 weeks",
        difficulty: "Intermediate",
        color: "#ed8936",
        steps: [
          "Modeling & roles: Create Course, Lesson, User, Enrollment schemas. Include roles for instructors and students with authorization checks.",
          "Video upload pipeline: Use multipart upload to S3 and store metadata in MongoDB. For large files, implement signed URLs and server-side validation.",
          "Course CRUD & lesson player: Build APIs for course creation/editing (instructor) and a secure lesson playback endpoint for enrolled users. Use signed URLs with expiry for video files.",
          "Quizzes & tracking: Implement quiz engine (questions, choices, grading) and track progress in Enrollment records (lessonsCompleted, quizScores).",
          "Update & content revision: Allow instructors to edit course content; when editing lessons, version content or mark lessons as updated for enrolled students.",
          "Certification & deploy: On completion, generate certificates (PDF) and add analytics dashboards for instructors. Deploy and secure S3 buckets and server endpoints.",
        ],
      },
    ],
    advanced: [
      {
        title: "Video Streaming Platform",
        description:
          "Netflix-like application with video upload, streaming, user subscriptions, and content management.",
        techStack: ["React", "Redux", "Express", "MongoDB", "AWS", "FFmpeg"],
        duration: "8-12 weeks",
        difficulty: "Advanced",
        color: "#e53e3e",
        steps: [
          "High-level architecture: Design services for upload, processing, metadata, streaming, user, and billing. Plan storage (S3), CDN (CloudFront), and processing pipeline (FFmpeg jobs).",
          "Upload & processing: Implement chunked uploads to S3 with server-side orchestration. After upload, run FFmpeg jobs to create multiple resolutions, HLS segments, and thumbnails.",
          "Metadata & streaming: Store video metadata in MongoDB. Serve video using signed CloudFront URLs or HLS playlists. Implement a video player (hls.js) in React that supports adaptive bitrate.",
          "Subscriptions & payments: Integrate Stripe subscriptions, store subscription state, and protect streaming endpoints so only active subscribers can play content.",
          "Admin tooling & content management: Build admin UI for content ingestion, metadata editing, and moderation. Add analytics (views, watch time).",
          "Delivery & scaling: Configure CDN, caching policies, and monitoring. Automate deployment (CI/CD), auto-scaling workers for transcoding, and handle regional compliance if needed.",
        ],
      },
      {
        title: "Real-time Trading Platform",
        description:
          "Stock trading application with real-time data, portfolio management, and transaction history.",
        techStack: [
          "React",
          "Redux",
          "Express",
          "MongoDB",
          "WebSockets",
          "Chart.js",
        ],
        duration: "10-14 weeks",
        difficulty: "Advanced",
        color: "#e53e3e",
        steps: [
          "Market data & ingestion: Choose a market data provider and normalize feeds. Build a backend service that ingests and rebroadcasts a cleaned feed to clients.",
          "Realtime channel: Use WebSockets to deliver ticks, orderbook snapshots, and trade events. Design channels and topics carefully for subscriptions and bandwidth management.",
          "Trading simulation & state: Design order lifecycle (new, filled, partial, cancelled) and simulate matching in a controlled environment. Persist trades and positions to MongoDB.",
          "Frontend dashboards: Implement live charts (Chart.js or TradingView), watchlists, portfolio views, and order entry forms. Ensure UI updates are debounced and replayable.",
          "Update & reconciliation: On reconnect, reconcile client state with server (get latest positions and trade history). Implement idempotent order APIs to avoid duplicates.",
          "Security & deployment: Secure APIs and websockets (authentication tokens), rate-limit, and deploy with low-latency hosting. Add monitoring and a replay system for debugging.",
        ],
      },
      {
        title: "Healthcare Management System",
        description:
          "Comprehensive healthcare platform with patient records, appointment scheduling, and telemedicine features.",
        techStack: [
          "React",
          "Express",
          "MongoDB",
          "Socket.io",
          "HIPAA Compliance",
        ],
        duration: "12-16 weeks",
        difficulty: "Advanced",
        color: "#e53e3e",
        steps: [
          "Data modeling & compliance planning: Define privacy-first schemas for Patients, Providers, Appointments, and Records. Plan encryption at rest and in transit and logging for audits.",
          "Auth & RBAC: Implement strict role-based access controls for patients, clinicians, and admins. Use short-lived tokens and consider multi-factor auth for clinicians.",
          "Records & storage: Store structured records with versioning and audit trails. Use encrypted storage (KMS) and ensure backups are encrypted and tested.",
          "Telemedicine & realtime: Implement secure video using WebRTC (STUN/TURN) and Socket.io for signaling and chat. Ensure recordings (if any) are encrypted and access-controlled.",
          "Appointment flows & updates: Build appointment creation, rescheduling, cancellations, and notify via email/SMS. For updates to records, add explicit consent and logging.",
          "Harden & deploy: Perform threat modeling, pen-tests, and implement logging/monitoring. Host on HIPAA-compliant infrastructure (if required) and ensure BAAs/contracts with vendors.",
        ],
      },
      {
        title: "Multi-vendor Marketplace",
        description:
          "Complex marketplace with vendor management, order processing, payment splitting, and analytics.",
        techStack: [
          "React",
          "Redux",
          "Express",
          "MongoDB",
          "Microservices",
          "Docker",
        ],
        duration: "14-18 weeks",
        difficulty: "Advanced",
        color: "#e53e3e",
        steps: [
          "Domain decomposition & service boundaries: Break the app into user, vendor, product, order, payment, and analytics services. Define API contracts and auth between services.",
          "Data partitioning: Decide which services own which data. Use separate databases per service or logical separation to avoid tight coupling.",
          "Payments & payouts: Implement payment provider integration that supports splitting or payout flows to vendors (Stripe Connect). Handle refunds and disputes.",
          "Microservices & containers: Containerize each service with Docker and define compose/k8s manifests. Use a service discovery or API gateway for routing.",
          "Order lifecycle & idempotency: Design reliable order handling (queue jobs for inventory checks, payment verification). Ensure idempotent operations for retries.",
          "Observability & scale: Add centralized logging, metrics, tracing, and autoscaling. Consider role-based vendor dashboards and analytics for vendor performance.",
        ],
      },
    ],
  };

  const getDifficultyStyles = (difficulty: string) => {
    const styles_diff: { [key: string]: any } = {
      Beginner: { backgroundColor: "#c6f6d5", color: "#22543d" },
      Intermediate: { backgroundColor: "#fed7cc", color: "#c05621" },
      Advanced: { backgroundColor: "#fed7d7", color: "#c53030" },
    };
    return styles_diff[difficulty] || styles_diff["Beginner"];
  };

  const handleStartClick = (key: string) => {
    setActiveProjectKey((prev) => (prev === key ? null : key));
    setTimeout(() => {
      const el = document.getElementById(`card-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Project Ideas</h1>
        <p style={styles.subtitle}>
          Build your portfolio with these hands-on MERN stack projects. Start
          with beginner projects and gradually work your way up to advanced
          applications.
        </p>
      </div>

      {Object.entries(projects).map(([level, projectList], sectionIndex) => (
        <div key={level} style={styles.levelSection}>
          <h2 style={styles.levelTitle}>
            {level.charAt(0).toUpperCase() + level.slice(1)} Projects
          </h2>
          <div style={styles.projectsGrid}>
            {projectList.map((project: any, projectIndex: number) => {
              const itemIndex = sectionIndex * 4 + projectIndex;
              const cardKey = `${level}-${projectIndex}`;
              const isActive = activeProjectKey === cardKey;

              return (
                <div
                  id={`card-${cardKey}`}
                  key={cardKey}
                  style={{
                    ...styles.projectCard,
                    zIndex: isActive ? 110 : 1,
                    transform: visibleItems.includes(itemIndex)
                      ? "translateY(0) scale(1)"
                      : "translateY(20px) scale(0.98)",
                    transitionDelay: `${itemIndex * 0.06}s`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform =
                        "translateY(-8px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(0,0,0,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(0,0,0,0.1)";
                    }
                  }}
                >
                  <div
                    style={{
                      ...styles.levelBadge,
                      backgroundColor: project.color,
                    }}
                  />

                  <div style={styles.projectHeader}>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <div
                      style={{
                        ...styles.difficultyBadge,
                        ...getDifficultyStyles(project.difficulty),
                      }}
                    >
                      {project.difficulty}
                    </div>
                  </div>

                  <p style={styles.projectDescription}>{project.description}</p>

                  <div style={styles.techStack}>
                    {project.techStack.map(
                      (tech: string, techIndex: number) => (
                        <span key={techIndex} style={styles.techTag}>
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                  <div style={styles.projectFooter}>
                    <span style={styles.duration}>⏱️ {project.duration}</span>
                    <button
                      style={styles.startButton}
                      onClick={() => handleStartClick(cardKey)}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background =
                            "linear-gradient(45deg, #5a67d8, #6b46c1)";
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background =
                          "linear-gradient(45deg, #667eea, #764ba2)";
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "translateY(0)";
                      }}
                    >
                      {isActive ? "Hide Steps" : "Start Project"}
                    </button>
                  </div>

                  {isActive && (
                    <div style={styles.stepsOverlay}>
                      <div style={styles.stepsTitle}>
                        Steps to build this project:
                      </div>
                      <ul style={styles.stepsList}>
                        {project.steps.map((step: string, i: number) => (
                          <li key={i} style={{ marginBottom: 12 }}>
                            <span style={{ fontWeight: 700 }}>
                              Step {i + 1}:
                            </span>
                            &nbsp;
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsPage;
