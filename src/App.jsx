import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

// Import components
import Homepage from "./components/Homepage.jsx";
import Aboutus from "./components/Aboutus.jsx";
import Roadmaps from "./components/Roadmaps.jsx";
import Mongodb from "./Roadmap/Mongodb.jsx";
import ReactPage from "./Roadmap/ReactPage.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Courses from "./components/Courses.jsx";
import Mongodbpage from "./Courses/MongoDBPage.jsx";
import ReactPageCourse from "./Courses/ReactCourse.jsx";
import NodeCourses from "./Courses/NodeCourses.jsx";
import Noderoadmap from "./Roadmap/Node.jsx";
import Expressroadmap from "./Roadmap/Express.jsx";
import Expresscourse from "./Courses/ExpressCourse.jsx";
import Register from "./components/Register.jsx";
import Feedback from "./components/Feedback.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Search from "./components/Search.jsx";

// Import styles
import "./App.css";
import "./style/Sidebar.css";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("skillsphere-theme");
    return savedTheme || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("skillsphere-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content sidebar-layout">
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/search" element={<Search />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/roadmap/mongodb"
              element={<PrivateRoute element={<Mongodb />} />}
            />
            <Route
              path="/roadmap/react"
              element={<PrivateRoute element={<ReactPage />} />}
            />
            <Route
              path="/roadmap/node"
              element={<PrivateRoute element={<Noderoadmap />} />}
            />
            <Route
              path="/roadmap/express"
              element={<PrivateRoute element={<Expressroadmap />} />}
            />
            <Route
              path="/courses"
              element={<PrivateRoute element={<Courses />} />}
            />
            <Route
              path="/courses/mongodb"
              element={<PrivateRoute element={<Mongodbpage />} />}
            />
            <Route
              path="/courses/react"
              element={<PrivateRoute element={<ReactPageCourse />} />}
            />
            <Route
              path="/courses/node"
              element={<PrivateRoute element={<NodeCourses />} />}
            />
            <Route
              path="/courses/express"
              element={<PrivateRoute element={<Expresscourse />} />}
            />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <div className="container section">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      404 - Page Not Found
                    </h1>
                    <p className="text-lg mb-6">
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="btn btn-primary">
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--gray-800)",
              color: "var(--gray-100)",
              border: "1px solid var(--gray-700)",
            },
            success: {
              iconTheme: {
                primary: "var(--success-500)",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--error-500)",
                secondary: "white",
              },
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
};

export default App;
