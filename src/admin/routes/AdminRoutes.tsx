import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../dashboard/AdminDashboard'; // Assuming you kept the dashboard component or will create it
import AdminUsers from '../users/AdminUsers'; // Assuming you kept the users component
import AdminCourses from '../pages/AdminCourses';
import AdminProjects from '../pages/AdminProjects';


const AdminRoutes = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/courses" element={<AdminCourses />} />
                <Route path="/projects" element={<AdminProjects />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminRoutes;
