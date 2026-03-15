// app/admin/projects/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/api';
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Edit, Trash2, Loader, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    order: number;
    image?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        order: 0,
        image: null as File | null,
    });

    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await getProjects();
                console.log('Fetched projects:', data);
                setProjects(data);
                setError('');
            } catch (err: any) {
                setError(err.message || 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Open modal for creating
    const handleCreate = () => {
        setFormData({
            title: '',
            description: '',
            techStack: '',
            githubUrl: '',
            liveUrl: '',
            featured: false,
            order: 0,
            image: null,
        });
        setEditingId(null);
        setIsModalOpen(true);
    };

    // Open modal for editing
    const handleEdit = (project: Project) => {
        setFormData({
            title: project.title,
            description: project.description,
            techStack: Array.isArray(project.techStack)
                ? project.techStack.join(', ')
                : project.techStack,
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            featured: project.featured,
            order: project.order,
            image: null,
        });
        setEditingId(project.id);
        setIsModalOpen(true);
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.techStack) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            setSubmitting(true);

            const form = new FormData();
            form.append('title', formData.title);
            form.append('description', formData.description);

            const techArray = formData.techStack
                .split(',')
                .map(t => t.trim())
                .filter(Boolean);

            techArray.forEach((t) => form.append('techStack', t));

            if (formData.githubUrl) form.append('githubUrl', formData.githubUrl);
            if (formData.liveUrl) form.append('liveUrl', formData.liveUrl);
            form.append('featured', formData.featured ? 'true' : 'false'); // keep as string
            form.append('order', String(formData.order));

            if (formData.image) {
                form.append('image', formData.image);
            }

            if (editingId) {
                await updateProject(editingId, form);
                toast.success('Project updated successfully 🎉');
            } else {
                await createProject(form);
                toast.success('Project created successfully 🚀');
            }

            const data = await getProjects();
            setProjects(data);

            // Reset form
            setFormData({
                title: '',
                description: '',
                techStack: '',
                githubUrl: '',
                liveUrl: '',
                featured: false,
                order: 0,
                image: null,
            });

            setEditingId(null);
            setIsModalOpen(false);
            setError('');

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Something went wrong');
            setError(err.message || 'Failed to save project');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
            toast.success('Project deleted successfully 🗑️');
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete project');
            setError(err.message || 'Failed to delete project');
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Projects"
                description="Manage your portfolio projects"
                action={{ label: '+ New Project', onClick: handleCreate }}
            />

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-purple-600" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                    <p className="text-slate-600">No projects yet. Create your first one!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                        >
                            {project.image && (
                                <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            )}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                                    <p className="text-slate-600 text-sm mt-1">{project.description}</p>
                                </div>
                                {project.featured && (
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {Array.isArray(project.techStack) &&
                                    project.techStack.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                >
                                    <Edit size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? 'Edit Project' : 'Create Project'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="text-black w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Tech Stack (comma separated) *
                        </label>
                        <input
                            type="text"
                            value={formData.techStack}
                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                            placeholder="React, Node.js, MongoDB"
                            className=" text-black w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                GitHub URL
                            </label>
                            <input
                                type="url"
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                className="text-black w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Live URL
                            </label>
                            <input
                                type="url"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className="text-black w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({ ...formData, image: e.target.files?.[0] || null })
                            }
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 rounded"
                                />
                                <span className="text-sm font-medium text-slate-700">Featured</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Order
                            </label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                                className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting
                            ? editingId
                                ? 'Updating...'
                                : 'Creating...'
                            : editingId
                                ? 'Update Project'
                                : 'Create Project'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
