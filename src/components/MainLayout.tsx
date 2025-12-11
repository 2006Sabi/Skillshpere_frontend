// src/layouts/MainLayout.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  BookOpen,
  FolderOpen,
  Code,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import {
  getUserProfile,
  clearAuthToken,
  getAuthToken,
} from "../utils/localStorage";

/**
 * MainLayout
 * - updates automatically when user signs in/out (listens to localStorage changes)
 * - shows different UI when userProfile is present vs not
 *
 * Ensure getUserProfile() returns null when not logged in (shape used below).
 */

interface MainLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void; // optional callback from parent to perform logout actions
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(() => getUserProfile());
  const navigate = useNavigate();
  const location = useLocation();

  // update profile from localStorage helper
  const refreshProfile = useCallback(() => {
    setUserProfile(getUserProfile());
  }, []);

  // run on mount: animate in and load profile
  useEffect(() => {
    setIsVisible(true);
    refreshProfile();
    // also refresh when route changes (in case login redirects)
  }, [refreshProfile]);

  // when location changes, refresh profile (useful if login/signup happened and route changed)
  useEffect(() => {
    refreshProfile();
  }, [location.pathname, refreshProfile]);

  // Listen for storage events to update UI when auth is changed in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "authToken" || e.key === "userProfile") {
        refreshProfile();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refreshProfile]);

  // handle logout
  const handleLogout = () => {
    // parent-level logout (clear token, etc.)
    if (onLogout) {
      try {
        onLogout();
      } catch (err) {
        // ignore
      }
    }
    // local fallback: clear token and profile if parent didn't
    try {
      clearAuthToken();
      // some apps store profile separately — remove if present
      localStorage.removeItem("userProfile");
    } catch (err) {
      // ignore
    }
    setUserProfile(null);
    navigate("/");
  };

  // Menu items shown when authenticated
  const authMenuItems = [
    {
      path: "/dashboard/home",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      description: "Overview and quick access",
    },
    {
      path: "/dashboard/roadmap",
      label: "Learning Path",
      icon: <Map className="w-5 h-5" />,
      description: "Your MERN stack journey",
    },
    {
      path: "/dashboard/courses",
      label: "Courses",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Browse and learn courses",
    },
    {
      path: "/dashboard/projects",
      label: "Projects",
      icon: <FolderOpen className="w-5 h-5" />,
      description: "Build and showcase projects",
    },
    {
      path: "/dashboard/compiler",
      label: "Code Editor",
      icon: <Code className="w-5 h-5" />,
      description: "Practice coding online",
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      description: "Manage your account",
    },
  ];

  // Menu items shown when NOT authenticated
  const publicMenuItems = [
    {
      path: "/",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      description: "Landing page",
    },
    {
      path: "/courses",
      label: "Courses",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Browse courses",
    },
    {
      path: "/projects",
      label: "Projects",
      icon: <FolderOpen className="w-5 h-5" />,
      description: "Explore project ideas",
    },
    {
      path: "/compiler",
      label: "Playground",
      icon: <Code className="w-5 h-5" />,
      description: "Try the code editor",
    },
  ];

  const menuItems = userProfile ? authMenuItems : publicMenuItems;

  // avatar safe helper
  const avatarSrc =
    userProfile?.avatar && typeof userProfile.avatar === "string"
      ? userProfile.avatar
      : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Skillsphere</h1>
                <p className="text-xs text-gray-500">Learning Platform</p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User Profile section */}
          {userProfile ? (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={userProfile.username || "avatar"}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {(
                        (userProfile.firstName?.[0] ||
                          userProfile.username?.[0]) +
                        (userProfile.lastName?.[0] || "")
                      ).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {userProfile.fullName || userProfile.username}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    @{userProfile.username}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {userProfile.completedCourses?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Courses</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {userProfile.currentProjects?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Projects</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {userProfile.achievements?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Badges</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 border-b border-gray-200">
              <div className="text-sm text-gray-700">
                <div className="font-semibold">Welcome!</div>
                <div className="text-xs text-gray-500 mt-1">
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Sign in
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:underline"
                  >
                    create an account
                  </Link>{" "}
                  to access dashboard features.
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        isActive ? "text-indigo-500" : "text-gray-400"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="ml-3">Settings</span>
            </Link>

            {userProfile ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors group"
              >
                <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                <span className="ml-3">Sign Out</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav for mobile */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                StackBuilder
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </button>

              {userProfile ? (
                <img
                  src={avatarSrc || "/placeholder-avatar.png"}
                  alt={userProfile.username || "avatar"}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              ) : (
                <Link to="/login" className="text-sm text-indigo-600">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden lg:flex bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex-1 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, projects, or resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </button>

              {userProfile ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {userProfile.fullName || userProfile.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      Learning since{" "}
                      {userProfile.joinedDate
                        ? new Date(userProfile.joinedDate).getFullYear()
                        : "—"}
                    </div>
                  </div>
                  <img
                    src={avatarSrc || "/placeholder-avatar.png"}
                    alt={userProfile.username || "avatar"}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-200"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm text-indigo-600">
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm bg-indigo-600 px-3 py-2 rounded-lg text-white"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
