import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Aboutus from "./components/Aboutus.jsx";
import Roadmaps from "./components/Roadmaps.jsx";
import Mongodb from "./Roadmap/Mongodb.jsx";
import ReactPage from "./Roadmap/ReactPage.jsx";
import Navbar from "./components/Navbar.jsx";
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
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Protected Routes using PrivateRoute */}
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
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
