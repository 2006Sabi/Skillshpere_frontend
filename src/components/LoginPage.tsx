import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, Code, ArrowLeft } from "lucide-react";
import {
  saveAuthData,
  generateId,
  saveUserProfile,
  setAuthToken,
} from "../utils/localStorage";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Role Toggle State
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({ username: "", password: "" });

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: formData.username,
          password: formData.password,
          role: role,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let errorMessage = "Login failed";
        try {
          const data = JSON.parse(text);
          errorMessage = data.message || errorMessage;
        } catch (e) {
          errorMessage = text || "Server error";
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();

      // Check if role matches (Redundant with backend check but good for safety)
      // Backend now returns 403 if role mismatch, which is caught below as error message

      // Save authentication token to localStorage
      setAuthToken(data.token, {
        userId: data.user.id || data.user._id,
        username: data.user.username
      });

      // Construct and save user profile
      if (data.user) {
        const userProfile = {
          id: data.user.id || data.user._id,
          username: data.user.username,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          fullName: `${data.user.firstName} ${data.user.lastName || ""}`.trim(),
          bio: data.user.bio,
          avatar: data.user.avatarUrl || null,
          joinedDate: data.user.createdAt,
          skills: data.user.skills || [],
          completedCourses: data.user.completedCourses || [],
          currentProjects: [],
          achievements: [],
          skillLevel: data.user.skillLevel || "Beginner",
          role: data.user.role || 'user'
        };
        saveUserProfile(userProfile);

        // Notify other components
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "userProfile",
            newValue: JSON.stringify(userProfile),
          })
        );
      }

      setIsLoading(false);
      onLogin();

      if (role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err: any) {
      console.error("Login error:", err);
      setErrors({ username: err.message, password: "" });
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to home button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>

        {/* Login form */}
        <div
          className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 transition-all duration-700 ${isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
            }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'user'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              User Login
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'admin'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Admin Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.username
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                    }`}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                    }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                <span className="text-xl">🌐</span>
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                <span className="text-xl">📱</span>
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            Demo Credentials
          </h4>
          <p className="text-xs text-blue-700">
            Username:{" "}
            <span className="font-mono bg-blue-100 px-1 rounded">demo</span> |
            Password:{" "}
            <span className="font-mono bg-blue-100 px-1 rounded">demo123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
