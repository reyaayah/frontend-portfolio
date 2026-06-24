// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export class APIError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

// Helper function to make API requests
async function apiCall(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false
) {
    const url = `${API_URL}${endpoint}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (includeAuth) {
        const token =
            typeof window !== 'undefined'
                ? localStorage.getItem('token')
                : null;

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: 'Unknown error' }));

        throw new APIError(response.status, error.message || 'API request failed');
    }

    return response.json();
}

// ============ Admin APIs ============

export async function adminLogin(email: string, password: string) {
    return apiCall('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export async function getCurrentAdmin() {
    return apiCall('/api/admin/me', {}, true);
}

export async function changeAdminPassword(oldPassword: string, newPassword: string) {
    return apiCall(
        '/api/admin/change-password',
        {
            method: 'PUT',
            body: JSON.stringify({ oldPassword, newPassword }),
        },
        true
    );
}

// ============ Projects APIs ============

export async function getProjects() {
    return apiCall('/api/projects');
}

export async function getFeaturedProjects() {
    return apiCall('/api/projects/featured');
}

export async function getProject(id: number) {
    return apiCall(`/api/projects/${id}`);
}

export async function createProject(data: FormData) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: data,
    });

    if (!response.ok) {
        throw new APIError(response.status, 'Failed to create project');
    }

    return response.json();
}

export async function updateProject(id: number, data: FormData) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: data,
    });

    if (!response.ok) {
        throw new APIError(response.status, 'Failed to update project');
    }

    return response.json();
}

export async function deleteProject(id: number) {
    return apiCall(`/api/projects/${id}`, { method: 'DELETE' }, true);
}

// ============ Experiences APIs ============

export async function getExperiences() {
    return apiCall('/api/experiences');
}

export async function createExperience(data: any) {
    return apiCall(
        '/api/experiences',
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        true
    );
}

export async function updateExperience(id: number, data: any) {
    return apiCall(
        `/api/experiences/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
        },
        true
    );
}

export async function deleteExperience(id: number) {
    return apiCall(`/api/experiences/${id}`, { method: 'DELETE' }, true);
}

// ============ Skills APIs ============

export async function getSkills() {
    return apiCall('/api/skills');
}

export async function createSkill(data: any) {
    return apiCall(
        '/api/skills',
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        true
    );
}

export async function updateSkill(id: number, data: any) {
    return apiCall(
        `/api/skills/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
        },
        true
    );
}

export async function deleteSkill(id: number) {
    return apiCall(`/api/skills/${id}`, { method: 'DELETE' }, true);
}

// ============ Contacts APIs ============

export async function submitContact(data: any) {
    return apiCall('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getContacts() {
    return apiCall('/api/contacts', {}, true);
}

export async function markContactAsRead(id: number, isRead: boolean) {
    return apiCall(
        `/api/contacts/${id}/read`,
        {
            method: 'PATCH',
            body: JSON.stringify({ isRead }),
        },
        true
    );
}

export async function deleteContact(id: number) {
    return apiCall(`/api/contacts/${id}`, { method: 'DELETE' }, true);
}

// ============ Resume APIs ============

export async function uploadResume(file: File) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch(`${API_URL}/api/resume/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new APIError(response.status, 'Failed to upload resume');
    }

    return response.json();
}

export function getResumeDownloadUrl() {
    return `${API_URL}/api/resume/download`;
}

// ============ Dashboard APIs ============

export async function getDashboardStats() {
    return apiCall('/api/dashboard/stats', {}, true);
}

// ─────────────────────────────────────────────────────────────────────────────
// Additions to merge into your existing lib/api.ts
// (Keep all your existing exports – add these below them)
// ─────────────────────────────────────────────────────────────────────────────

export type Profile = {
    id: number;
    name: string;
    title: string;
    tagline: string;
    bio: string;
    github_url: string | null;
    linkedin_url: string | null;
    email: string | null;
    avatar_url: string | null;
    available_for_work: boolean | number;
};

export async function getProfile(): Promise<Profile> {
    const res = await fetch(`${API_URL}/api/profile`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
}

export async function updateProfile(
    formData: FormData,
    token: string
): Promise<{ message: string; profile: Profile }> {
    const res = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
    }
    return res.json();
}

// NOTE: API_URL should already exist in your lib/api.ts
// (e.g. const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000')
// If it is named differently in your file, update the references above to match.
