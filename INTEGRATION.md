# Frontend & Backend Integration Guide

## 🔗 Setup Instructions

### 1. Environment Configuration

Create `.env.local` file in your Next.js root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production:

```
NEXT_PUBLIC_API_URL=https://api.riyaawal.com
```

### 2. Start Both Services

**Backend:**
```bash
cd backend
npm install
npm run seed  # Optional: populate sample data
npm run dev
```

**Frontend:**
```bash
npm install
npm run dev
```

Access:
- Portfolio: `http://localhost:3000`
- Admin Login: `http://localhost:3000/admin/login`
- Swagger API Docs: `http://localhost:5000/api-docs`

---

## 🔐 Authentication Flow

### Admin Login

1. Navigate to `/admin/login`
2. Enter credentials (default from seed: `admin@riyaawal.com` / `admin123`)
3. JWT token automatically saved to `localStorage`
4. Redirected to `/admin/dashboard`

### How It Works

The `AuthContext` manages:
- JWT token storage in `localStorage`
- Admin info caching
- Login/logout functionality
- Protected routes via `layout.tsx`

```typescript
// Example: Using auth in components
import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { isAuthenticated, admin, logout } = useAuth();
  
  if (!isAuthenticated) return <div>Not logged in</div>;
  
  return <div>Welcome {admin?.email}</div>;
}
```

---

## 📡 Using the API Service

### Import and Use

```typescript
import { getProjects, submitContact, uploadResume } from '@/lib/api';

// Fetch projects (public)
const projects = await getProjects();

// Submit contact (public)
await submitContact({
  name: 'John',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'Great work!'
});

// Upload resume (requires auth)
const file = new File([...], 'resume.pdf');
await uploadResume(file);
```

---

## 📊 Data Fetching Examples

### Client Components (CSR)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/api';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### Using Cached Data

```typescript
import { getProjectsData } from '@/lib/client-data';

// Automatically caches for 5 minutes
const projects = await getProjectsData();
```

---

## 🔄 API Methods Reference

### Projects

```typescript
// Public
getProjects()              // All projects
getFeaturedProjects()      // Featured only
getProject(id)             // Single project

// Admin only
createProject(formData)    // Create (with image)
updateProject(id, formData) // Update (with image)
deleteProject(id)          // Delete
```

### Experiences

```typescript
// Public
getExperiences()           // All experiences

// Admin only
createExperience(data)     // Create
updateExperience(id, data) // Update
deleteExperience(id)       // Delete
```

### Skills

```typescript
// Public
getSkills()                // All skills

// Admin only
createSkill(data)          // Create
updateSkill(id, data)      // Update
deleteSkill(id)            // Delete
```

### Contacts

```typescript
// Public
submitContact(data)        // Submit form

// Admin only
getContacts()              // All messages
markContactAsRead(id, bool) // Mark read/unread
deleteContact(id)          // Delete
```

### Resume

```typescript
// Public
getResumeDownloadUrl()    // Download link

// Admin only
uploadResume(file)        // Upload PDF
```

### Admin

```typescript
adminLogin(email, password)      // Get JWT token
getCurrentAdmin()                // Get current admin info
changeAdminPassword(old, new)    // Change password
```

### Dashboard

```typescript
getDashboardStats()      // Get totals (admin only)
```

---

## 🛠️ Updating Components to Use API

### Example: Update Projects Page

**Before (Static Data):**
```typescript
// src/data/projects.ts
export const projects = [
  { title: "Project 1", ... },
  { title: "Project 2", ... }
];

// src/app/projects/page.tsx
import { projects } from '@/data/projects';
export default function ProjectsPage() {
  return projects.map(p => <div key={p.title}>{p.title}</div>);
}
```

**After (API Data):**
```typescript
// src/app/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return projects.map(p => <div key={p.id}>{p.title}</div>);
}
```

---

## 📝 File Upload Example

### Upload Project Image

```typescript
'use client';

import { createProject } from '@/lib/api';
import { useRef, useState } from 'react';

export default function CreateProjectForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add file if selected
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.set('image', file);
      }

      await createProject(formData);
      alert('Project created!');
    } catch (error) {
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <textarea name="description" placeholder="Description" required />
      <input name="techStack" placeholder='["React","Node.js"]' required />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
}
```

---

## ⚠️ Error Handling

```typescript
import { APIError, submitContact } from '@/lib/api';

try {
  await submitContact(data);
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error (${error.status}): ${error.message}`);
  } else {
    console.error('Unknown error:', error);
  }
}
```

---

## 🔒 Protected Routes

Admin-only pages are protected by `AuthContext`:

```typescript
// src/app/admin/layout.tsx
export default function AdminLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  // Automatically redirects to /admin/login if not authenticated
  return isAuthenticated ? <>{children}</> : null;
}
```

---

## 🌍 Testing the Integration

### Test Login
```bash
# POST to /api/admin/login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@riyaawal.com","password":"admin123"}'
```

### Test with Token
```bash
# Use token from login response
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer <token>"
```

### From Frontend
- Open browser DevTools → Application → localStorage
- Should see `token` after logging in
- All subsequent API calls automatically include it

---

## 🚀 Deployment Checklist

- [ ] Backend running on production server (Render/Railway/VPS)
- [ ] `.env.local` updated with production API URL
- [ ] CORS configured in backend for your domain
- [ ] Database migrations applied
- [ ] `npm run seed` executed (or admin user created)
- [ ] Frontend deployed (Netlify/Vercel)
- [ ] Test admin login on production
- [ ] Test data fetching from production API

---

## 📞 Troubleshooting

### "API request failed"
- Check backend is running
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for CORS errors
- Check backend logs for errors

### "Invalid token"
- Log out and log in again
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET matches on backend

### "Cannot find module '@/lib/api'"
- Ensure `jsconfig.json` or `tsconfig.json` has path aliases configured
- Restart Next.js dev server

### Image upload fails
- Check file size (should be reasonable)
- Verify `uploads/projects/` directory exists and is writable
- Check file MIME type (only images allowed)

---

**Integration is now complete!** 🎉  
Your frontend can now fully communicate with the backend API.
