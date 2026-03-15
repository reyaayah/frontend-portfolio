// app/admin/experiences/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/lib/api';
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Edit, Trash2, Loader, AlertCircle } from 'lucide-react';

interface Experience {
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
    technologies: string[];
    order: number;
}

export default function ExperiencesPage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        duration: '',
        description: '',
        technologies: '',
        order: 0,
    });

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setLoading(true);
                const data = await getExperiences();
                setExperiences(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const handleCreate = () => {
        setFormData({
            company: '',
            role: '',
            duration: '',
            description: '',
            technologies: '',
            order: 0,
        });
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleEdit = (exp: Experience) => {
        setFormData({
            company: exp.company,
            role: exp.role,
            duration: exp.duration,
            description: exp.description,
            technologies: Array.isArray(exp.technologies)
                ? exp.technologies.join(', ')
                : exp.technologies,
            order: exp.order,
        });
        setEditingId(exp.id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = {
                company: formData.company,
                role: formData.role,
                duration: formData.duration,
                description: formData.description,
                technologies: formData.technologies.split(',').map(t => t.trim()),
                order: formData.order,
            };

            if (editingId) {
                await updateExperience(editingId, data);
            } else {
                await createExperience(data);
            }

            const updated = await getExperiences();
            setExperiences(updated);
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            await deleteExperience(id);
            setExperiences(experiences.filter(e => e.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Experiences"
                description="Manage your work experience"
                action={{ label: '+ Add Experience', onClick: handleCreate }}
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
            ) : experiences.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                    <p className="text-slate-600">No experiences yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                                    <p className="text-slate-600 text-sm">{exp.company}</p>
                                    <p className="text-slate-500 text-xs mt-1">{exp.duration}</p>
                                </div>
                            </div>

                            <p className="text-slate-700 text-sm mb-3">{exp.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {Array.isArray(exp.technologies) &&
                                    exp.technologies.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded"
                                >
                                    <Edit size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(exp.id)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? 'Edit Experience' : 'Add Experience'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Company *</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Role *</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full text-black  px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Duration *</label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="Jan 2023 - Present"
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Technologies (comma separated) *
                        </label>
                        <input
                            type="text"
                            value={formData.technologies}
                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                            placeholder="React, Node.js, MongoDB"
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                    >
                        {editingId ? 'Update' : 'Add'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
