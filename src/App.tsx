// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import MainLayout from "./components/MainLayout";
import HomePage from "./components/HomePage";
import RoadmapPage from "./components/RoadmapPage";
import CoursesPage from "./components/CoursesPage";
import ProjectsPage from "./components/ProjectsPage";
import CompilerPage from "./components/CompilerPage";
import ProfilePage from "./components/ProfilePage";

import TasksPage from "./components/Tasks"; // <-- Ensure this file exists
import AdminRoutes from "./admin/routes/AdminRoutes";
import {
  isUserAuthenticated,
  getAuthData,
  clearAuthData,
  addActivity,
  generateId,
} from "./utils/localStorage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status from localStorage on app load
    const checkAuth = () => {
      const authenticated = isUserAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Add login activity
    addActivity({
      id: generateId(),
      type: "login",
      title: "Logged In",
      description: "Successfully logged into Skillsphere",
      timestamp: new Date().toISOString(),
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearAuthData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading Skillsphere...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <MainLayout onLogout={handleLogout}>
                  <Routes>
                    {/* main dashboard routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="roadmap" element={<RoadmapPage />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="compiler" element={<CompilerPage />} />
                    <Route path="profile" element={<ProfilePage />} />

                    {/* Tasks route: /dashboard/tasks */}
                    <Route path="tasks" element={<TasksPage />} />

                    {/* You can add other /dashboard/* routes here */}
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
