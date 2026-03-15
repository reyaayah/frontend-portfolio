// app/admin/skills/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api';
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Edit, Trash2, Loader, AlertCircle } from 'lucide-react';

interface Skill {
    id: number;
    name: string;
    category: 'frontend' | 'backend' | 'tools' | 'other';
    level: number;
    order: number;
}
type SkillCategory = 'frontend' | 'backend' | 'tools' | 'other';

interface SkillFormData {
    name: string;
    category: SkillCategory;
    level: number;
    order: number;
}
export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<SkillFormData>({
        name: '',
        category: 'frontend',
        level: 50,
        order: 0,
    });

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true);
                const data = await getSkills();
                setSkills(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const handleCreate = () => {
        setFormData({
            name: '',
            category: 'frontend',
            level: 50,
            order: 0,
        });
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setFormData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            order: skill.order,
        });
        setEditingId(skill.id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingId) {
                await updateSkill(editingId, formData);
            } else {
                await createSkill(formData);
            }

            const updated = await getSkills();
            setSkills(updated);
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            await deleteSkill(id);
            setSkills(skills.filter(s => s.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const categoryColors: Record<string, string> = {
        frontend: 'bg-blue-100 text-blue-700',
        backend: 'bg-green-100 text-green-700',
        tools: 'bg-purple-100 text-purple-700',
        other: 'bg-gray-100 text-gray-700',
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Skills"
                description="Manage your technical skills"
                action={{ label: '+ Add Skill', onClick: handleCreate }}
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
            ) : skills.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                    <p className="text-slate-600">No skills yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-md font-bold text-slate-900">{skill.name}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${categoryColors[skill.category]}`}>
                                    {skill.category}
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-600">Proficiency</span>
                                    <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded"
                                >
                                    <Edit size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded"
                                >
                                    <Trash2 size={14} />
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
                title={editingId ? 'Edit Skill' : 'Add Skill'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="React, Python, etc."
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full text-black px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="tools">Tools</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Proficiency Level: {formData.level}%
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                            className="w-full"
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
