import React, { useState, useEffect } from 'react';

// Define Project Interface
interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    difficulty: string;
    status: string;
}

const AdminProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        difficulty: 'Intermediate',
        status: 'planning',
        steps: [] as { title: string; description: string; order: number }[]
    });

    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE}/api/admin/projects`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const token = localStorage.getItem('authToken');
            const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
            await fetch(`${API_BASE}/api/admin/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project", error);
        }
    };

    const handleEdit = (project: Project & { steps?: any[] }) => {
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack ? project.techStack.join(', ') : '',
            difficulty: project.difficulty,
            status: project.status,
            steps: project.steps || []
        });
        setEditingId(project._id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const payload = {
                ...formData,
                techStack: formData.techStack.split(',').map(s => s.trim()) // Convert comma-separated string to array
            };

            const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
            const url = editingId ? `${API_BASE}/api/admin/projects/${editingId}` : `${API_BASE}/api/admin/projects`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ title: '', description: '', techStack: '', difficulty: 'Intermediate', status: 'planning', steps: [] });
                setEditingId(null);
                fetchProjects();
            }
        } catch (error) {
            console.error("Failed to save project", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
            <div className="mb-4">
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', description: '', techStack: '', difficulty: 'Intermediate', status: 'planning', steps: [] });
                        setIsModalOpen(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add New Project
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                className="w-full p-2 border rounded"
                                placeholder="Project Title"
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
                                placeholder="Tech Stack (comma separated)"
                                value={formData.techStack}
                                onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                            />

                            {/* Steps Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-sm">Project Steps</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({
                                            ...formData,
                                            steps: [...formData.steps, { title: '', description: '', order: formData.steps.length + 1 }]
                                        })}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                                    >
                                        + Add Step
                                    </button>
                                </div>
                                {formData.steps.map((step, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded border space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs font-bold">Step {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSteps = formData.steps.filter((_, i) => i !== index);
                                                    setFormData({ ...formData, steps: newSteps });
                                                }}
                                                className="text-xs text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <input
                                            className="w-full p-1 border rounded text-sm"
                                            placeholder="Step Title"
                                            value={step.title}
                                            onChange={e => {
                                                const newSteps = [...formData.steps];
                                                newSteps[index].title = e.target.value;
                                                setFormData({ ...formData, steps: newSteps });
                                            }}
                                        />
                                        <textarea
                                            className="w-full p-1 border rounded text-sm"
                                            placeholder="Step Description"
                                            value={step.description}
                                            onChange={e => {
                                                const newSteps = [...formData.steps];
                                                newSteps[index].description = e.target.value;
                                                setFormData({ ...formData, steps: newSteps });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="w-full p-2 border rounded"
                                    value={formData.difficulty}
                                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="planning">Planning</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="paused">Paused</option>
                                </select>
                            </div>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.length > 0 ? projects.map(project => (
                            <tr key={project._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex flex-wrap gap-1">
                                        {project.techStack?.map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{tech}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.difficulty}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button onClick={() => handleEdit(project)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={5}>No projects found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProjects;
