import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Clock,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const benefits = [
    {
      icon: <BookOpen size={24} />,
      title: "200+ Expert Courses",
      description: "Learn from industry professionals",
    },
    {
      icon: <Users size={24} />,
      title: "Community Support",
      description: "Join thousands of learners",
    },
    {
      icon: <Award size={24} />,
      title: "Earn Certificates",
      description: "Get recognized for your skills",
    },
    {
      icon: <Clock size={24} />,
      title: "Learn at Your Pace",
      description: "24/7 access to all content",
    },
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, create a new user
      const userData = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        role: "student",
      };

      localStorage.setItem("skillsphere-token", "demo-token-123");
      localStorage.setItem("skillsphere-user", JSON.stringify(userData));

      toast.success(
        "Welcome to SkillSphere! Your account has been created successfully."
      );
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          {/* Left Side - Form */}
          <motion.div
            className="auth-form-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="auth-header">
              <Link to="/" className="auth-logo">
                <BookOpen size={32} />
                <span>SkillSphere</span>
              </Link>
              <h1>Join SkillSphere</h1>
              <p>Start your learning journey today</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-group">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Enter your full name"
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-group">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className={`form-input ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    {...register("terms", {
                      required: "You must accept the terms and conditions",
                    })}
                  />
                  <span className="checkmark"></span>I agree to the{" "}
                  <Link to="/terms" className="auth-link">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="auth-link">
                    Privacy Policy
                  </Link>
                </label>
                {errors.terms && (
                  <span className="error-message">{errors.terms.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg auth-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Benefits */}
          <motion.div
            className="auth-quote-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="quote-content">
              <div className="quote-header">
                <h2>Why Choose SkillSphere?</h2>
                <p>
                  Join thousands of learners who have transformed their careers
                </p>
              </div>

              <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="benefit-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="benefit-icon">{benefit.icon}</div>
                    <div className="benefit-content">
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="stats-preview">
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Active Students</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Expert Courses</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
