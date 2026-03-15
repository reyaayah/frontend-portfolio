// app/admin/settings/page.tsx

'use client';

import { useState } from 'react';
import { changeAdminPassword } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import PageHeader from '@/components/admin/PageHeader';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function SettingsPage() {
    const { admin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            await changeAdminPassword(formData.oldPassword, formData.newPassword);
            setSuccess('Password changed successfully!');
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

            // Clear success after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your account and preferences"
            />

            <div className="max-w-2xl space-y-8">
                {/* Account Information */}
                <div className="bg-white rounded-lg border border-slate-200 p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Account Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={admin?.email || ''}
                                disabled
                                className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed"
                            />
                        </div>

                        <p className="text-sm text-slate-600">
                            Your email is used to log in to the admin panel.
                        </p>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-lg border border-slate-200 p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Change Password</h3>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 mb-6">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 mb-6">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-green-700">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={formData.oldPassword}
                                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">At least 6 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Change Password'
                            )}
                        </button>
                    </form>
                </div>

                {/* Security Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Security Tips</h4>
                    <ul className="text-blue-800 text-sm space-y-2">
                        <li>• Use a strong password with uppercase, lowercase, and numbers</li>
                        <li>• Never share your password with anyone</li>
                        <li>• Log out when using public computers</li>
                        <li>• Change your password regularly</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
