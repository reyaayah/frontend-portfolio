# Riya Awal Portfolio Backend

Complete production-ready backend for portfolio management with JWT authentication, file uploads, and API documentation.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create MySQL Database

```sql
CREATE DATABASE portfolio;
USE portfolio;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  techStack JSON NOT NULL,
  githubUrl VARCHAR(512),
  liveUrl VARCHAR(512),
  image VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  `order` INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  technologies JSON NOT NULL,
  `order` INT DEFAULT 0
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  level INT NOT NULL,
  `order` INT DEFAULT 0
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(512) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=portfolio
JWT_SECRET=supersecretjwtkey
FRONTEND_URL=https://riyaawal.netlify.app
ADMIN_PASSWORD=admin123
```

### 4. Seed Database (Optional)

```bash
npm run seed
```

This creates:
- Admin account (email: `admin@riyaawal.com`, password: from `.env`)
- Sample projects, experiences, and skills
- Sample contact messages

### 5. Start Server

```bash
npm run dev      # Development with nodemon
npm start        # Production
```

Server runs on `http://localhost:5000`

---

## 📚 Swagger API Documentation

**Access Swagger UI:**

```
http://localhost:5000/api-docs
```

All endpoints are documented with:
- Request/response examples
- Parameter descriptions
- Authentication requirements
- Error codes

---

## 🔐 Authentication

### Get JWT Token

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@riyaawal.com","password":"admin123"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Use Token in Requests

Add header:
```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints Summary

### Auth (Admin)
- `POST /api/admin/login` - Login
- `GET /api/admin/me` - Current admin (protected)
- `PUT /api/admin/change-password` - Change password (protected)

### Projects
- `GET /api/projects` - All projects
- `GET /api/projects/featured` - Featured projects
- `GET /api/projects/:id` - Single project
- `POST /api/projects` - Create (protected, multer)
- `PUT /api/projects/:id` - Update (protected, multer)
- `DELETE /api/projects/:id` - Delete (protected)

### Experiences
- `GET /api/experiences` - All experiences
- `POST /api/experiences` - Create (protected)
- `PUT /api/experiences/:id` - Update (protected)
- `DELETE /api/experiences/:id` - Delete (protected)

### Skills
- `GET /api/skills` - All skills
- `POST /api/skills` - Create (protected)
- `PUT /api/skills/:id` - Update (protected)
- `DELETE /api/skills/:id` - Delete (protected)

### Contacts
- `POST /api/contacts` - Submit form (public)
- `GET /api/contacts` - All messages (protected)
- `PATCH /api/contacts/:id/read` - Mark read (protected)
- `DELETE /api/contacts/:id` - Delete (protected)

### Resume
- `GET /api/resume/download` - Download latest resume (public)
- `POST /api/resume/upload` - Upload resume (protected, multer)

### Dashboard
- `GET /api/dashboard/stats` - Statistics (protected)

---

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                # MySQL pool configuration
│   │   └── swagger.js           # Swagger API docs config
│   ├── controllers/             # Business logic
│   ├── middleware/              # Auth, validation, error handling
│   ├── models/                  # Database queries
│   ├── routes/                  # API routes with swagger docs
│   ├── utils/
│   │   └── sql.js              # Database query wrapper
│   ├── app.js                  # Express app setup
│   └── server.js               # Server entry point
├── uploads/
│   ├── projects/               # Project images
│   └── resume/                 # Resume PDFs
├── seed.js                     # Database seeding script
├── package.json
├── .env.example
└── README.md
```

---

## 🔒 Security Features

✅ JWT Authentication (7-day expiration)  
✅ Bcrypt password hashing (10 rounds)  
✅ Helmet security headers  
✅ CORS configured for frontend domain  
✅ Rate limiting (100 requests/15 min)  
✅ Input validation with Joi  
✅ Protected routes middleware  

---

## 📤 File Uploads

### Project Images

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>" \
  -F "title=My Project" \
  -F "description=..." \
  -F "techStack=[\"React\",\"Node.js\"]" \
  -F "image=@/path/to/image.jpg"
```

Files stored in: `uploads/projects/`

### Resume PDF

```bash
curl -X POST http://localhost:5000/api/resume/upload \
  -H "Authorization: Bearer <token>" \
  -F "resume=@/path/to/resume.pdf"
```

Files stored in: `uploads/resume/`

Download via: `GET /api/resume/download`

---

## 🐛 Error Handling

All errors return JSON:

```json
{
  "message": "Error description"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Validation error
- `401` - Unauthorized/Invalid token
- `404` - Not found
- `500` - Server error

---

## 🧪 Testing with Postman

1. **Import Collection** (optional)
   - Create requests for each endpoint
   - Set environment variables for `baseUrl` and `token`

2. **Login First**
   - POST `/api/admin/login`
   - Copy token from response

3. **Set Token in Postman**
   - Environment variable: `{{token}}`
   - Use in Authorization header: `Bearer {{token}}`

4. **Test File Uploads**
   - Use Body → form-data
   - File field type: File
   - Select image/PDF from computer

---

## 🚀 Deployment

### Render

1. Connect to GitHub repo
2. Set environment variables
3. Build command: `npm install`
4. Start command: `npm start`
5. Add persistent disk for `/uploads`

### Railway

1. `railway init`
2. Add MySQL plugin
3. Set environment variables
4. `railway up`

### VPS (PM2 + Nginx)

```bash
# Clone repo
git clone <repo>
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with production values

# Start with PM2
pm2 start src/server.js --name portfolio-backend

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

Nginx config:
```nginx
server {
    listen 80;
    server_name api.riyaawal.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Reload: `sudo nginx -s reload`

---

## 💻 Frontend Integration

### Next.js Example

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fetch projects
async function getProjects() {
  const res = await fetch(`${API_URL}/api/projects`);
  return res.json();
}

// Login
async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { token } = await res.json();
  localStorage.setItem('token', token);
}

// Authenticated request
async function createProject(data: any) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// File upload
async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append('resume', file);
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/resume/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  return res.json();
}
```

---

## 📊 Database Schema

### Admins
```
id (PK), email (UNIQUE), password, role, createdAt
```

### Projects
```
id (PK), title, description, techStack (JSON), githubUrl, 
liveUrl, image, featured, order, createdAt
```

### Experiences
```
id (PK), company, role, duration, description, 
technologies (JSON), order
```

### Skills
```
id (PK), name, category (enum), level (1-100), order
```

### Contacts
```
id (PK), name, email, subject, message, isRead, createdAt
```

### Resumes
```
id (PK), path, filename, createdAt
```

---

## 📝 Notes

- All date fields use MySQL `TIMESTAMP` with `CURRENT_TIMESTAMP`
- JSON fields stored as strings, parsed in code
- `order` field controls display ordering
- `featured` boolean highlights important projects
- Upload directory must be writable by Node process
- Environment variables required before starting

---

## 📞 Support

For issues or questions:
1. Check `.env` is properly configured
2. Verify MySQL tables are created
3. Check Swagger docs at `/api-docs`
4. Review server logs for errors

---

**Built with ❤️ for Riya Awal Portfolio**
