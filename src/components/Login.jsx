import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Zap,
  Target,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inspirationalQuotes = [
    {
      quote:
        "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
    },
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
  ];

  const randomQuote =
    inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, accept any email/password combination
      if (data.email && data.password) {
        const userData = {
          id: 1,
          name: data.email.split("@")[0],
          email: data.email,
          role: "student",
        };

        localStorage.setItem("skillsphere-token", "demo-token-123");
        localStorage.setItem("skillsphere-user", JSON.stringify(userData));

        toast.success("Welcome back! You've successfully logged in.");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
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
              <h1>Welcome Back</h1>
              <p>Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
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

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
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
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                  Sign up for free
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Quote */}
          <motion.div
            className="auth-quote-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="quote-content">
              <div className="quote-icon">
                <Target size={48} />
              </div>
              <blockquote className="quote-text">
                "{randomQuote.quote}"
              </blockquote>
              <cite className="quote-author">— {randomQuote.author}</cite>

              <div className="quote-features">
                <div className="feature-item">
                  <Zap size={20} />
                  <span>Learn at your own pace</span>
                </div>
                <div className="feature-item">
                  <BookOpen size={20} />
                  <span>Access to 200+ courses</span>
                </div>
                <div className="feature-item">
                  <Target size={20} />
                  <span>Earn certificates</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
