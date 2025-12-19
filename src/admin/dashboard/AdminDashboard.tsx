import React, { useEffect, useState } from 'react';
import { Users, BookOpen, FolderOpen, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalProjects: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const res = await fetch('/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <Users className="h-8 w-8 text-indigo-600" />, bg: "bg-indigo-100" },
        { title: 'Active Courses', value: stats.totalCourses, icon: <BookOpen className="h-8 w-8 text-green-600" />, bg: "bg-green-100" },
        { title: 'Projects', value: stats.totalProjects, icon: <FolderOpen className="h-8 w-8 text-orange-600" />, bg: "bg-orange-100" },
        { title: 'Growth', value: '+12%', icon: <TrendingUp className="h-8 w-8 text-blue-600" />, bg: "bg-blue-100" },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-lg ${card.bg}`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{card.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="text-sm text-gray-500">No recent activity</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">System Health</h3>
                    <div className="text-sm text-green-600 font-medium">All systems operational</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
