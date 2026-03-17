# API Reference

## Base URL

**Development:** `http://localhost:5000`  
**Production:** `https://your-api-domain.com`

## Authentication

### Login (Get Token)
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@riyaawal.com",
  "password": "admin123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Usage:** Include token in Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Change Password (Protected)
```
POST /api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "current_password",
  "newPassword": "new_password"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

---

## Projects

### Get All Projects
```
GET /api/projects

Response: 200 OK
[
  {
    "id": 1,
    "title": "E-commerce Platform",
    "description": "Full-stack e-commerce...",
    "techStack": ["React", "Node.js", "MongoDB"],
    "image": "filename.jpg",
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://project.com",
    "featured": true,
    "order": 1,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Featured Projects
```
GET /api/projects/featured

Response: 200 OK
[
  {
    "id": 1,
    "title": "E-commerce Platform",
    ...
  },
  ...
]
```

### Get Single Project
```
GET /api/projects/:id

Response: 200 OK
{
  "id": 1,
  "title": "E-commerce Platform",
  ...
}
```

### Create Project (Protected)
```
POST /api/projects
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- title: string (required)
- description: string (required)
- techStack: string (comma-separated, required)
- image: file (optional)
- githubUrl: string (optional)
- liveUrl: string (optional)
- featured: boolean (optional)
- order: number (optional)

Response: 201 Created
{
  "id": 1,
  "title": "E-commerce Platform",
  ...
}
```

### Update Project (Protected)
```
PUT /api/projects/:id
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data: Same as Create

Response: 200 OK
{
  "id": 1,
  "title": "Updated Title",
  ...
}
```

### Delete Project (Protected)
```
DELETE /api/projects/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Project deleted successfully"
}
```

---

## Experiences

### Get All Experiences
```
GET /api/experiences

Response: 200 OK
[
  {
    "id": 1,
    "company": "Tech Company A",
    "role": "Senior Developer",
    "duration": "Jan 2023 - Present",
    "description": "Led development of...",
    "technologies": ["React", "Node.js"],
    "order": 1,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Single Experience
```
GET /api/experiences/:id

Response: 200 OK
{
  "id": 1,
  "company": "Tech Company A",
  ...
}
```

### Create Experience (Protected)
```
POST /api/experiences
Authorization: Bearer {token}
Content-Type: application/json

{
  "company": "Tech Company",
  "role": "Developer",
  "duration": "Jan 2023 - Dec 2023",
  "description": "Responsibilities...",
  "technologies": ["React", "Node.js"],
  "order": 1
}

Response: 201 Created
{
  "id": 1,
  "company": "Tech Company",
  ...
}
```

### Update Experience (Protected)
```
PUT /api/experiences/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "company": "Updated Company",
  "role": "Updated Role",
  ...
}

Response: 200 OK
{
  "id": 1,
  "company": "Updated Company",
  ...
}
```

### Delete Experience (Protected)
```
DELETE /api/experiences/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Experience deleted successfully"
}
```

---

## Skills

### Get All Skills
```
GET /api/skills

Response: 200 OK
[
  {
    "id": 1,
    "name": "React",
    "category": "Frontend",
    "level": 95,
    "order": 1,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Single Skill
```
GET /api/skills/:id

Response: 200 OK
{
  "id": 1,
  "name": "React",
  "category": "Frontend",
  "level": 95,
  "order": 1
}
```

### Create Skill (Protected)
```
POST /api/skills
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "React",
  "category": "Frontend",
  "level": 95,
  "order": 1
}

Response: 201 Created
{
  "id": 1,
  "name": "React",
  ...
}
```

### Update Skill (Protected)
```
PUT /api/skills/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "React",
  "category": "Frontend",
  "level": 90,
  "order": 1
}

Response: 200 OK
{
  "id": 1,
  "name": "React",
  "level": 90,
  ...
}
```

### Delete Skill (Protected)
```
DELETE /api/skills/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Skill deleted successfully"
}
```

---

## Contacts / Messages

### Get All Contacts (Protected)
```
GET /api/contacts
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'm interested in your project...",
    "read": false,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Create Contact (Public)
```
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in..."
}

Response: 201 Created
{
  "id": 1,
  "message": "Message sent successfully"
}
```

### Mark Contact as Read (Protected)
```
PUT /api/contacts/:id/read
Authorization: Bearer {token}
Content-Type: application/json

{
  "read": true
}

Response: 200 OK
{
  "id": 1,
  "read": true
}
```

### Delete Contact (Protected)
```
DELETE /api/contacts/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Contact deleted successfully"
}
```

---

## Resume

### Get Latest Resume (Protected)
```
GET /api/resume
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "filename": "resume_2024.pdf",
  "uploadedAt": "2024-01-15T10:30:00Z",
  "downloadUrl": "/uploads/resumes/resume_2024.pdf"
}
```

### Upload Resume (Protected)
```
POST /api/resume
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: file (PDF, max 5MB, required)

Response: 200 OK
{
  "message": "Resume uploaded successfully",
  "filename": "resume_2024.pdf",
  "downloadUrl": "/uploads/resumes/resume_2024.pdf"
}
```

### Download Resume (Public)
```
GET /uploads/resumes/{filename}

Response: 200 OK
[Binary PDF data]
```

---

## Dashboard Statistics

### Get Dashboard Stats (Protected)
```
GET /api/dashboard/stats
Authorization: Bearer {token}

Response: 200 OK
{
  "totalProjects": 8,
  "totalMessages": 12,
  "unreadMessages": 3,
  "totalSkills": 20
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Project not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server Error",
  "message": "Something went wrong"
}
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid token |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal issue |

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `X-RateLimit-Remaining`: requests left
- **Status 429**: Too Many Requests (rate limit exceeded)

---

## CORS Headers

**Development:**
```
Access-Control-Allow-Origin: http://localhost:3000
```

**Production:**
```
Access-Control-Allow-Origin: https://yourdomain.com
```

---

## File Upload Limits

| Type | Max Size | Formats |
|------|----------|---------|
| Project Image | 5MB | jpg, jpeg, png, webp, gif |
| Resume PDF | 5MB | pdf |

---

## Example Requests (Frontend)

### Login
```typescript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@riyaawal.com',
    password: 'admin123'
  })
});
const { token } = await response.json();
```

### Get Projects
```typescript
const response = await fetch('http://localhost:5000/api/projects');
const projects = await response.json();
```

### Create Project with File
```typescript
const formData = new FormData();
formData.append('title', 'My Project');
formData.append('description', 'Description...');
formData.append('techStack', 'React,Node.js');
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/projects', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

---

## Swagger Documentation

Full interactive API documentation available at:
- **Development**: `http://localhost:5000/api-docs`
- **Production**: `https://your-api-domain.com/api-docs`

Test endpoints directly in Swagger UI!

---

**Last Updated**: 2024
