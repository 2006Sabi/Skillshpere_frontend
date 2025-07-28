import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  Calendar,
  Target,
  Star,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import "../style/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const userData = localStorage.getItem("skillsphere-user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const stats = [
    {
      icon: <BookOpen size={24} />,
      label: "Courses Enrolled",
      value: "12",
      change: "+2 this month",
      color: "var(--primary-600)",
    },
    {
      icon: <Clock size={24} />,
      label: "Hours Learned",
      value: "48",
      change: "+12 this week",
      color: "var(--success-600)",
    },
    {
      icon: <Award size={24} />,
      label: "Certificates",
      value: "5",
      change: "+1 this month",
      color: "var(--warning-600)",
    },
    {
      icon: <TrendingUp size={24} />,
      label: "Current Streak",
      value: "7 days",
      change: "Personal best!",
      color: "var(--error-600)",
    },
  ];

  const currentCourses = [
    {
      id: 1,
      title: "React.js Mastery",
      progress: 75,
      nextLesson: "Advanced Hooks & Custom Hooks",
      instructor: "Sarah Johnson",
      thumbnail: "⚛️",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      progress: 45,
      nextLesson: "Express.js Middleware",
      instructor: "Mike Chen",
      thumbnail: "🟢",
      dueDate: "2024-01-20",
    },
    {
      id: 3,
      title: "MongoDB Database Design",
      progress: 90,
      nextLesson: "Final Project Submission",
      instructor: "Emily Rodriguez",
      thumbnail: "🍃",
      dueDate: "2024-01-10",
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "TypeScript Fundamentals",
      description:
        "Learn TypeScript from scratch and build type-safe applications",
      instructor: "David Wilson",
      rating: 4.8,
      students: 2341,
      price: "$89",
      thumbnail: "📘",
    },
    {
      id: 5,
      title: "GraphQL API Development",
      description: "Master GraphQL and build efficient APIs",
      instructor: "Lisa Park",
      rating: 4.9,
      students: 1892,
      price: "$99",
      thumbnail: "🔗",
    },
    {
      id: 6,
      title: "Docker & Kubernetes",
      description: "Containerize your applications and deploy with confidence",
      instructor: "Alex Thompson",
      rating: 4.7,
      students: 1567,
      price: "$79",
      thumbnail: "🐳",
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "React.js Final Project",
      course: "React.js Mastery",
      dueDate: "2024-01-15",
      type: "project",
    },
    {
      id: 2,
      title: "MongoDB Quiz",
      course: "MongoDB Database Design",
      dueDate: "2024-01-10",
      type: "quiz",
    },
    {
      id: 3,
      title: "Node.js Assignment",
      course: "Node.js Backend Development",
      dueDate: "2024-01-20",
      type: "assignment",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed lesson",
      course: "React.js Mastery",
      lesson: "State Management with Redux",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Earned certificate",
      course: "JavaScript Fundamentals",
      time: "1 day ago",
    },
    {
      id: 3,
      action: "Started course",
      course: "Node.js Backend Development",
      time: "3 days ago",
    },
    {
      id: 4,
      action: "Submitted assignment",
      course: "MongoDB Database Design",
      time: "1 week ago",
    },
  ];

  const getDeadlineTypeIcon = (type) => {
    switch (type) {
      case "project":
        return <Target size={16} />;
      case "quiz":
        return <BarChart3 size={16} />;
      case "assignment":
        return <BookOpen size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  const getDeadlineTypeColor = (type) => {
    switch (type) {
      case "project":
        return "var(--error-600)";
      case "quiz":
        return "var(--warning-600)";
      case "assignment":
        return "var(--primary-600)";
      default:
        return "var(--gray-600)";
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="welcome-section">
            <h1>
              {greeting()}, {user?.name || "Learner"}! 👋
            </h1>
            <p>
              Ready to continue your learning journey? Here's what's happening
              today.
            </p>
          </div>
          <div className="current-time">
            <Clock size={20} />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-change">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="dashboard-content">
          {/* Left Column */}
          <div className="dashboard-main">
            {/* Current Courses */}
            <motion.section
              className="dashboard-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="section-header">
                <h2>Continue Learning</h2>
                <Link to="/courses" className="view-all-link">
                  View All Courses
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="courses-grid">
                {currentCourses.map((course) => (
                  <div key={course.id} className="course-progress-card">
                    <div className="course-header">
                      <div className="course-thumbnail">
                        <span style={{ fontSize: "2rem" }}>
                          {course.thumbnail}
                        </span>
                      </div>
                      <div className="course-info">
                        <h3>{course.title}</h3>
                        <p>by {course.instructor}</p>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="next-lesson">
                      <Play size={16} />
                      <span>Next: {course.nextLesson}</span>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Continue Learning
                    </Link>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Recommended Courses */}
            <motion.section
              className="dashboard-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="section-header">
                <h2>Recommended for You</h2>
                <Link to="/courses" className="view-all-link">
                  Browse All
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="recommended-grid">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="recommended-card">
                    <div className="course-thumbnail-large">
                      <span style={{ fontSize: "3rem" }}>
                        {course.thumbnail}
                      </span>
                    </div>
                    <div className="course-details">
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="course-meta">
                        <span>by {course.instructor}</span>
                        <span className="rating">
                          <Star size={14} fill="currentColor" />
                          {course.rating}
                        </span>
                        <span>{course.students} students</span>
                      </div>
                      <div className="course-footer">
                        <span className="course-price">{course.price}</span>
                        <Link
                          to={`/courses/${course.id}`}
                          className="btn btn-outline btn-sm"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Sidebar */}
          <div className="dashboard-sidebar">
            {/* Upcoming Deadlines */}
            <motion.section
              className="sidebar-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="section-header">
                <h3>Upcoming Deadlines</h3>
                <Calendar size={20} />
              </div>

              <div className="deadlines-list">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="deadline-item">
                    <div
                      className="deadline-icon"
                      style={{ color: getDeadlineTypeColor(deadline.type) }}
                    >
                      {getDeadlineTypeIcon(deadline.type)}
                    </div>
                    <div className="deadline-content">
                      <h4>{deadline.title}</h4>
                      <p>{deadline.course}</p>
                      <span className="deadline-date">{deadline.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Recent Activity */}
            <motion.section
              className="sidebar-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="section-header">
                <h3>Recent Activity</h3>
                <BarChart3 size={20} />
              </div>

              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <CheckCircle size={16} />
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>{activity.action}</strong>
                        {activity.course && ` in ${activity.course}`}
                        {activity.lesson && `: ${activity.lesson}`}
                      </p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
              className="sidebar-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="section-header">
                <h3>Quick Actions</h3>
              </div>

              <div className="quick-actions">
                <Link to="/courses" className="quick-action-btn">
                  <BookOpen size={20} />
                  Browse Courses
                </Link>
                <Link to="/roadmaps" className="quick-action-btn">
                  <Target size={20} />
                  View Roadmaps
                </Link>
                <Link to="/search" className="quick-action-btn">
                  <BarChart3 size={20} />
                  Search Content
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
