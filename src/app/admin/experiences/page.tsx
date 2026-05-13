// app/admin/experiences/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/lib/api';
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Edit, Trash2, Loader, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Experience {
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
    technologies: string[];
    order: number;
    location?: string;
    current?: boolean;
    achievement?: string;
    stats?: string[];
    highlight?: string;
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
        location: '',
        current: false,
        achievement: '',
        stats: '',
        highlight: ''
    });
    // At the top of your component (or outside it)
    const normalizeExperiences = (data: Experience[]) =>
        data.map((exp) => ({
            ...exp,
            stats: exp.stats || [],
            technologies: exp.technologies || [],
        }));
    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                setLoading(true);
                const data = await getExperiences();
                console.log('Raw fetched experiences:', data);
     
                const mapped = normalizeExperiences(data);
                setExperiences(mapped);
                console.log('Fetched experiences:', mapped);

                setExperiences(mapped);
            } catch (err: any) {
                setError(err.message);
                toast.error(err.message);
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
            location: '',
            current: false,
            achievement: '',
            stats: '',
            highlight: ''
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
            location: exp.location || '',
            current: exp.current || false,
            achievement: exp.achievement || '',
            stats: Array.isArray(exp.stats) ? exp.stats.join(', ') : exp.stats || '',
            highlight: exp.highlight || ''
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
                location: formData.location || '',
                current: formData.current || false,
                achievement: formData.achievement || '',
                stats: formData.stats ? formData.stats.split(',').map(s => s.trim()) : [],
                highlight: formData.highlight || ''
            };

            if (editingId) {
                await updateExperience(editingId, data);
                toast.success('Experience updated successfully!');
            } else {
                await createExperience(data);
                toast.success('Experience added successfully!');
            }

            const updated = await getExperiences();
            setExperiences(normalizeExperiences(updated));

            setIsModalOpen(false);
        } catch (err: any) {

            toast.error(err.message || 'An error occurred. Please try again.');
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            await deleteExperience(id);
            setExperiences(experiences.filter(e => e.id !== id));
            toast.success('Experience deleted successfully!');
        } catch (err: any) {
            toast.error(err.message || 'An error occurred. Please try again.');
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
                            {Array.isArray(exp.stats) && exp.stats.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {exp.stats.map((stat, i) => (
                                        <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded font-medium">
                                            {typeof stat === 'object' && stat !== null && 'value' in stat ? (stat as any).value : String(stat)}
                                        </span>
                                    ))}
                                </div>
                            )}
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
                    {/* Additional fields in your <form> inside Modal */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location || ''}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Bhaktapur, Nepal"
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.current || false}
                            onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-600"
                        />
                        <label className="text-sm text-slate-700">Current Job</label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Achievement</label>
                        <textarea
                            value={formData.achievement || ''}
                            onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                            rows={2}
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Launched portfolio site, promoted to team lead..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stats (comma separated)</label>
                        <input
                            type="text"
                            value={formData.stats || ''}
                            onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                            placeholder="10+ projects, Led 3-person team"
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Highlight</label>
                        <input
                            type="text"
                            value={formData.highlight || ''}
                            onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                            placeholder="Key contributor in full-stack development"
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
