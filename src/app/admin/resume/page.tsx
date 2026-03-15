// app/admin/resume/page.tsx

'use client';

import { useState } from 'react';
import { uploadResume, getResumeDownloadUrl } from '@/lib/api';
import PageHeader from '@/components/admin/PageHeader';
import { Upload, Download, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function ResumePage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Only PDF files are allowed');
                setFile(null);
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            await uploadResume(file);
            setSuccess('Resume uploaded successfully!');
            setFile(null);

            // Reset after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to upload resume');
        } finally {
            setLoading(false);
        }
    };

    const downloadUrl = getResumeDownloadUrl();

    return (
        <div className="space-y-6">
            <PageHeader
                title="Resume"
                description="Manage your resume PDF"
            />

            <div className="max-w-2xl">
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

                {/* Upload Form */}
                <div className="bg-white rounded-lg border border-slate-200 p-8 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* File Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-4">
                                Upload PDF Resume
                            </label>

                            <div
                                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
                                onClick={() => document.getElementById('file-input')?.click()}
                            >
                                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                <p className="text-slate-900 font-medium mb-1">
                                    {file ? file.name : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-slate-500 text-sm">PDF up to 5MB</p>

                                <input
                                    id="file-input"
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {file && (
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-blue-900 font-medium">Selected: {file.name}</p>
                                <p className="text-blue-700 text-sm">
                                    Size: {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!file || loading}
                            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Upload Resume
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Download Section */}
                <div className="bg-white rounded-lg border border-slate-200 p-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Current Resume</h3>
                    <a
                        href={downloadUrl}
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
                    >
                        <Download className="w-4 h-4" />
                        Download Resume
                    </a>
                    <p className="text-slate-600 text-sm mt-4">
                        Latest resume is available for download. Share this link with recruiters.
                    </p>
                </div>
            </div>
        </div>
    );
}
