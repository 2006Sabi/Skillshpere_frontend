import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  Play,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Heart,
  Code,
  Database,
  Globe,
  Shield,
} from "lucide-react";

const Homepage = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals with years of real-world experience in their fields.",
    },
    {
      icon: <Users size={32} />,
      title: "Community Learning",
      description:
        "Join a community of learners, share knowledge, and collaborate on projects together.",
    },
    {
      icon: <Award size={32} />,
      title: "Certification",
      description:
        "Earn certificates upon completion to showcase your skills to employers worldwide.",
    },
    {
      icon: <Clock size={32} />,
      title: "Flexible Learning",
      description:
        "Learn at your own pace with 24/7 access to course materials and resources.",
    },
  ];

  const techStack = [
    { icon: <Code size={24} />, name: "React.js", color: "#61DAFB" },
    { icon: <Database size={24} />, name: "Node.js", color: "#339933" },
    { icon: <Globe size={24} />, name: "MongoDB", color: "#47A248" },
    { icon: <Shield size={24} />, name: "Express.js", color: "#000000" },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "React.js Mastery",
      description:
        "Master React.js from basics to advanced concepts including hooks, context, and performance optimization.",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1247,
      price: "$99",
      icon: "⚛️",
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js, Express, and MongoDB.",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 892,
      price: "$89",
      icon: "🟢",
    },
    {
      id: 3,
      title: "MongoDB Database Design",
      description:
        "Learn MongoDB from fundamentals to advanced aggregation and optimization techniques.",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 1563,
      price: "$79",
      icon: "🍃",
    },
  ];

  const testimonials = [
    {
      id: 1,
      content:
        "SkillSphere transformed my career. The hands-on projects and expert guidance helped me land my dream job as a full-stack developer.",
      author: "Sarah Johnson",
      role: "Full-Stack Developer",
      company: "TechCorp",
      avatar: "SJ",
    },
    {
      id: 2,
      content:
        "The community aspect is incredible. I've made connections with developers worldwide and learned so much from peer feedback.",
      author: "Michael Chen",
      role: "Frontend Developer",
      company: "StartupXYZ",
      avatar: "MC",
    },
    {
      id: 3,
      content:
        "Best investment I've made in my education. The courses are well-structured and the instructors are truly passionate about teaching.",
      author: "Emily Rodriguez",
      role: "Backend Engineer",
      company: "InnovateTech",
      avatar: "ER",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "200+", label: "Expert Courses" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>
                Master Modern Web Development with{" "}
                <span className="text-gradient">SkillSphere</span>
              </h1>
              <p>
                Join thousands of developers learning React, Node.js, MongoDB,
                and more. Build real-world projects, earn certificates, and
                advance your career with our expert-led courses.
              </p>
              <div className="hero-buttons">
                <Link to="/courses" className="hero-btn-primary">
                  <Play size={20} />
                  Start Learning
                </Link>
                <Link to="/about" className="hero-btn-secondary">
                  Learn More
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="grid grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item glass-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Master Modern Technologies</h2>
              <p>
                Learn the most in-demand technologies used by top companies
                worldwide.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="glass-card"
                style={{
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "var(--spacing-8)",
                }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="feature-icon"
                  style={{
                    color: tech.color,
                    marginBottom: "var(--spacing-4)",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  }}
                >
                  {tech.icon}
                </div>
                <h3
                  style={{ color: "white", marginBottom: "var(--spacing-2)" }}
                >
                  {tech.name}
                </h3>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    background: tech.color,
                    borderRadius: "2px",
                    marginTop: "var(--spacing-2)",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Why Choose SkillSphere?</h2>
              <p>
                We're committed to providing the best learning experience with
                cutting-edge technology and proven teaching methods.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card glass-card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Featured Courses</h2>
              <p>
                Start your journey with our most popular courses, designed to
                take you from beginner to professional developer.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="course-card glass-card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="course-image">
                  <span style={{ fontSize: "3rem" }}>{course.icon}</span>
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <div className="course-meta">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      {course.rating}
                    </span>
                  </div>
                  <p className="course-description">{course.description}</p>
                  <div className="course-footer">
                    <div className="course-price">{course.price}</div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/courses" className="btn btn-outline btn-lg">
              View All Courses
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>What Our Students Say</h2>
              <p>
                Join thousands of satisfied learners who have transformed their
                careers with SkillSphere.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card glass-card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <p className="testimonial-content">{testimonial.content}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Transform Your Career?</h2>
            <p>
              Join SkillSphere today and start building the future with modern
              web technologies. Your journey to becoming a professional
              developer starts here.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register" className="btn btn-primary btn-lg">
                <Zap size={20} />
                Get Started Free
              </Link>
              <Link
                to="/courses"
                className="btn btn-outline btn-lg"
                style={{ color: "white", borderColor: "white" }}
              >
                <Target size={20} />
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
