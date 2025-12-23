import React, { useState, useEffect } from 'react';

// Define Course Interface
interface Course {
    _id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    externalUrl?: string;
    techStack?: string[]; // Added techStack array
    userId: { username: string };
}

const AdminCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        difficulty: 'Beginner',
        externalUrl: '',
        techStack: ''
    });
    const [loading, setLoading] = useState(false);

    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE}/api/admin/courses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setCourses(data);
            }
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const token = localStorage.getItem('authToken');
            const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
            await fetch(`${API_BASE}/api/admin/courses/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchCourses();
        } catch (error) {
            console.error("Failed to delete course", error);
        }
    };

    const handleEdit = (course: Course) => {
        setFormData({
            title: course.title,
            description: course.description,
            duration: course.duration,
            difficulty: course.difficulty,
            externalUrl: course.externalUrl || '',
            techStack: course.techStack ? course.techStack.join(', ') : ''
        });
        setEditingId(course._id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            // Convert techStack string to array
            const courseData = {
                ...formData,
                techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== "")
            };

            const url = editingId ? `${API_BASE}/api/admin/courses/${editingId}` : `${API_BASE}/api/admin/courses`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(courseData)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ title: '', description: '', duration: '', difficulty: 'Beginner', externalUrl: '', techStack: '' });
                setEditingId(null);
                fetchCourses();
            }
        } catch (error) {
            console.error("Failed to save course", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
            <div className="mb-4">
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', description: '', duration: '', difficulty: 'Beginner', externalUrl: '', techStack: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add New Course
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Course' : 'Add New Course'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                className="w-full p-2 border rounded"
                                placeholder="Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full p-2 border rounded"
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <input
                                className="w-full p-2 border rounded"
                                placeholder="Duration (e.g., 2 hours)"
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            />
                            <input
                                className="w-full p-2 border rounded"
                                placeholder="Course Link (External URL)"
                                value={formData.externalUrl}
                                onChange={e => setFormData({ ...formData, externalUrl: e.target.value })}
                                required
                            />
                            <input
                                className="w-full p-2 border rounded"
                                placeholder="Tech Stack (comma separated, e.g. React, Node)"
                                value={formData.techStack}
                                onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                            />
                            <select
                                className="w-full p-2 border rounded"
                                value={formData.difficulty}
                                onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
                                    {editingId ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.length > 0 ? courses.map(course => (
                            <tr key={course._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.difficulty}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {course.techStack ? course.techStack.join(', ') : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {course.externalUrl ? <a href={course.externalUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Link</a> : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button onClick={() => handleEdit(course)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={6}>No courses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCourses;
