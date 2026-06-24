"use client";

import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile, type Profile } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
    User,
    Mail,
    Github,
    Linkedin,
    FileText,
    ToggleLeft,
    ToggleRight,
    Upload,
    Save,
    Loader2,
} from "lucide-react";

export default function AdminProfilePage() {
    const { token } = useAuth();
    const fileRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [form, setForm] = useState({
        name: "",
        title: "",
        tagline: "",
        bio: "",
        github_url: "",
        linkedin_url: "",
        email: "",
        available_for_work: true,
    });

    useEffect(() => {
        getProfile()
            .then((p) => {
                setForm({
                    name: p.name || "",
                    title: p.title || "",
                    tagline: p.tagline || "",
                    bio: p.bio || "",
                    github_url: p.github_url || "",
                    linkedin_url: p.linkedin_url || "",
                    email: p.email || "",
                    available_for_work:
                        p.available_for_work === 1 || p.available_for_work === true,
                });
                if (p.avatar_url) setPreview(p.avatar_url);
            })
            .catch(() => toast.error("Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!token) return;
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
            if (avatarFile) fd.append("avatar", avatarFile);

            await updateProfile(fd, token);
            toast.success("Profile updated!");
        } catch (err: any) {
            toast.error(err.message || "Failed to update");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
                <p className="text-slate-500 mt-1">
                    This controls what appears on the public Hero section.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Avatar Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center gap-4">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Avatar preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                                <User className="w-16 h-16 text-purple-200" />
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => fileRef.current?.click()}
                        className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-200 rounded-full px-4 py-2 hover:bg-purple-50 transition-colors"
                    >
                        <Upload className="w-4 h-4" />
                        Change Photo
                    </button>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFile}
                    />

                    {/* Availability toggle */}
                    <div className="w-full border-t border-slate-100 pt-4 mt-2">
                        <p className="text-xs text-slate-500 font-medium mb-2 text-center">
                            Availability Status
                        </p>
                        <button
                            onClick={() =>
                                setForm((f) => ({ ...f, available_for_work: !f.available_for_work }))
                            }
                            className={`w-full flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${form.available_for_work
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                        >
                            {form.available_for_work ? (
                                <>
                                    <ToggleRight className="w-5 h-5" />
                                    Open to Work
                                </>
                            ) : (
                                <>
                                    <ToggleLeft className="w-5 h-5" />
                                    Not Available
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
                    <Field
                        icon={<User className="w-4 h-4" />}
                        label="Full Name"
                        value={form.name}
                        onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                        placeholder="Riya Awal"
                    />
                    <Field
                        icon={<FileText className="w-4 h-4" />}
                        label="Job Title"
                        value={form.title}
                        onChange={(v) => setForm((f) => ({ ...f, title: v }))}
                        placeholder="Frontend Developer"
                    />
                    <Field
                        icon={<FileText className="w-4 h-4" />}
                        label="Tagline / Status"
                        value={form.tagline}
                        onChange={(v) => setForm((f) => ({ ...f, tagline: v }))}
                        placeholder="Available for opportunities"
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Bio
                        </label>
                        <textarea
                            rows={4}
                            value={form.bio}
                            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                            placeholder="A short paragraph about yourself..."
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                        />
                    </div>
                    <Field
                        icon={<Mail className="w-4 h-4" />}
                        label="Email"
                        value={form.email}
                        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                        placeholder="hello@example.com"
                        type="email"
                    />
                    <Field
                        icon={<Github className="w-4 h-4" />}
                        label="GitHub URL"
                        value={form.github_url}
                        onChange={(v) => setForm((f) => ({ ...f, github_url: v }))}
                        placeholder="https://github.com/username"
                        type="url"
                    />
                    <Field
                        icon={<Linkedin className="w-4 h-4" />}
                        label="LinkedIn URL"
                        value={form.linkedin_url}
                        onChange={(v) => setForm((f) => ({ ...f, linkedin_url: v }))}
                        placeholder="https://linkedin.com/in/username"
                        type="url"
                    />

                    <div className="pt-2">
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Reusable input row ───────────────────────────────────────────────────────

function Field({
    icon,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </span>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>
        </div>
    );
}