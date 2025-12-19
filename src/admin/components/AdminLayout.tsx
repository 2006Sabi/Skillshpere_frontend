import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    Users,
    BookOpen,
    FolderOpen,
    Code,
    LogOut,
    Menu,
    X,
    Settings,
    ShieldAlert
} from "lucide-react";
import {
    getUserProfile,
    clearAuthToken,
} from "../../utils/localStorage";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(getUserProfile());
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        clearAuthToken();
        localStorage.removeItem("userProfile");
        setUserProfile(null);
        navigate("/login");
    };

    const menuItems = [
        {
            path: "/admin",
            label: "Dashboard",
            icon: <Home className="w-5 h-5" />,
            description: "Admin Overview",
        },
        {
            path: "/admin/users",
            label: "User Management",
            icon: <Users className="w-5 h-5" />,
            description: "Manage Users",
        },
        {
            path: "/admin/courses",
            label: "Course Management",
            icon: <BookOpen className="w-5 h-5" />,
            description: "Add/Edit Courses",
        },
        {
            path: "/admin/projects",
            label: "Project Management",
            icon: <FolderOpen className="w-5 h-5" />,
            description: "Add/Edit Projects",
        },
        {
            path: "/dashboard",
            label: "User View",
            icon: <Code className="w-5 h-5" />,
            description: "Switch to User View",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "translate-x-0 visible" : "-translate-x-full invisible lg:visible"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                                <ShieldAlert className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-xs text-gray-500">System Control</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Admin Info */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-semibold">
                                AD
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                    Administrator
                                </h3>
                                <p className="text-xs text-gray-500 truncate">
                                    System Admin
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-red-50 text-red-700 shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <div
                                        className={`flex-shrink-0 transition-colors ${isActive
                                            ? "text-red-600"
                                            : "text-gray-400 group-hover:text-gray-600"
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="text-sm font-medium">{item.label}</div>
                                        <div className="text-xs text-gray-400">{item.description}</div>
                                    </div>
                                    {isActive && (
                                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors group"
                        >
                            <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                            <span className="ml-3">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <span className="text-lg font-bold text-gray-900">Admin Panel</span>
                        <div className="w-8"></div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
