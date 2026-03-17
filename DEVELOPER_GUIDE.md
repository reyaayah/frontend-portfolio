# Developer Guide

Complete technical guide for developing, extending, and maintaining the portfolio application.

---

## 📚 Table of Contents

- [Project Architecture](#project-architecture)
- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [Database](#database)
- [Common Tasks](#common-tasks)
- [Code Patterns](#code-patterns)
- [Error Handling](#error-handling)
- [Git Workflow](#git-workflow)
- [Performance Optimization](#performance-optimization)

---

## 🏗️ Project Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────┐
│         Public Internet / Browser             │
└────────────────┬────────────────────────────┘
                 │
         ┌───────▼────────┐
         │  Next.js App   │
         │  (Port 3000)   │
         └────────┬───────┘
                  │
        ┌─────────┼─────────┐
        │                   │
  ┌─────▼─────┐     ┌──────▼──────┐
  │ Public    │     │ Admin Pages  │
  │ Pages     │     │ (Protected)  │
  │ (Static   │     │              │
  │  Data)    │     │ /admin/*     │
  └─────┬─────┘     └──────┬───────┘
        │                  │
        └────────┬─────────┘
                 │
           AuthContext
           (JWT Token)
                 │
        ┌────────▼────────────┐
        │   API Service       │
        │   (lib/api.ts)      │
        │                     │
        │ • adminLogin()      │
        │ • getProjects()     │
        │ • createProject()   │
        │ • etc...            │
        └────────┬────────────┘
                 │
        HTTP/CORS│(JSON)
                 │
        ┌────────▼─────────────────┐
        │   Express Backend        │
        │   (Port 5000)            │
        │                          │
        │ Routes:                  │
        │ • /api/auth/*            │
        │ • /api/projects/*        │
        │ • /api/experiences/*     │
        │ • /api/skills/*          │
        │ • /api/contacts/*        │
        │ • /api/resume/*          │
        └────────┬──────────────────┘
                 │
        ┌────────▼─────────────────┐
        │   Controllers/Models      │
        │   (Business Logic)        │
        │                          │
        │ Validation               │
        │ Authorization Check      │
        │ File Handling            │
        └────────┬──────────────────┘
                 │
        ┌────────▼─────────────────┐
        │   MySQL Database         │
        │                          │
        │ • admins                 │
        │ • projects               │
        │ • experiences            │
        │ • skills                 │
        │ • contacts               │
        │ • resumes                │
        └──────────────────────────┘
```

### Data Flow Examples

**Read Data (Public):**
```
Browser GET /projects 
  → Next.js page 
  → api.getProjects() 
  → fetch GET /api/projects 
  → Express route 
  → projectController.all() 
  → projectModel.all() 
  → MySQL query 
  → Return JSON
  → Render in browser
```

**Write Data (Protected):**
```
Admin form submission
  → handleSubmit()
  → useAuth() checks isAuthenticated
  → api.createProject(formData, token)
  → fetch POST with Bearer {token}
  → Express auth middleware checks token
  → projectController.create()
  → Validation (Joi schemas)
  → File upload (Multer)
  → projectModel.create()
  → MySQL INSERT
  → Return new project
  → Update UI
```

---

## 🎨 Frontend Development

### File Structure

```
src/
├── app/
│   ├── admin/                    # Protected admin pages
│   │   ├── layout.tsx           # Admin layout wrapper (checks auth)
│   │   ├── login/page.tsx       # Login form
│   │   ├── dashboard/page.tsx   # Dashboard with stats
│   │   ├── projects/page.tsx    # Full CRUD for projects
│   │   ├── experiences/page.tsx # Experience management
│   │   ├── skills/page.tsx      # Skills management
│   │   ├── contacts/page.tsx    # Message inbox
│   │   ├── resume/page.tsx      # Resume upload
│   │   └── settings/page.tsx    # Password change
│   ├── projects/page.tsx        # Public projects page
│   ├── experience/page.tsx      # Public experience page
│   ├── contact/page.tsx         # Public contact page
│   ├── layout.tsx               # Root layout (AuthProvider)
│   └── page.tsx                 # Home page
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx    # Navigation sidebar
│   │   ├── PageHeader.tsx      # Section header component
│   │   └── Modal.tsx           # Reusable modal dialog
│   ├── navbar.tsx              # Main navigation
│   ├── ProjectCard.tsx         # Project display card
│   └── FeaturedVideos.tsx      # Video section
├── context/
│   └── AuthContext.tsx         # JWT auth state management
├── lib/
│   ├── api.ts                  # API service layer
│   └── getGithubStats.ts       # GitHub API integration
└── data/
    ├── projects.ts            # Static project data
    └── experience.ts          # Static experience data
```

### Key Components

**AuthContext.tsx**
```typescript
// Provides isAuthenticated, admin, token, login, logout
const AuthProvider = ({ children }) => {
  // useEffect checks localStorage for token on mount
  // login() calls API and saves token
  // logout() removes token
  // checkAuth() validates token expiration
}
```

**Admin Pages Pattern**
```typescript
// All admin pages follow this pattern:

'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // 1. useEffect to fetch data
  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [isAuthenticated]);

  // 2. CRUD handlers
  const handleCreate = async () => {
    try {
      await api.create(formData);
      setItems(await api.getAll());
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Render with forms and lists
  return (
    <div>
      <PageHeader title="Section" action="+ Add" />
      {/* Modal for create/edit */}
      <Modal isOpen={isModalOpen} onClose={...}>
        {/* Form */}
      </Modal>
      {/* List display */}
    </div>
  );
}
```

### API Service Layer (lib/api.ts)

Each API function:
1. Takes arguments
2. Constructs request (headers with token if protected)
3. Calls fetch
4. Parses response
5. Throws APIError on failure
6. Returns typed data

```typescript
export async function createProject(formData: FormData, token?: string) {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new APIError(error.message, response.status);
  }
  
  return response.json();
}
```

### Form Handling

**File Upload Pattern:**
```typescript
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setFormData(prev => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const form = new FormData();
  form.append('title', formData.title);
  // ... other fields
  if (formData.image instanceof File) {
    form.append('image', formData.image);
  }
  
  await api.createProject(form, token);
};
```

### Authentication Pattern

```typescript
// In protected page:
'use client';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedPage() {
  const { isAuthenticated, token } = useAuth();
  
  useEffect(() => {
    // If not authenticated, redirect happens in layout.tsx
    // This is backup check
    if (!isAuthenticated) return;
    
    // Fetch protected data
    fetchData();
  }, [isAuthenticated]);
  
  // Always include token when calling API
  const data = await api.getData(token);
}
```

---

## ⚙️ Backend Development

### File Structure

```
backend/src/
├── config/
│   └── db.js                  # MySQL pool setup
├── middleware/
│   ├── auth.js               # JWT verification middleware
│   └── validators.js         # Joi validation schemas
├── models/                   # Database query functions (6 files)
│   ├── adminModel.js
│   ├── projectModel.js
│   ├── experienceModel.js
│   ├── skillModel.js
│   ├── contactModel.js
│   └── resumeModel.js
├── controllers/              # Request handlers (7 files)
│   ├── adminController.js
│   ├── projectController.js
│   ├── experienceController.js
│   ├── skillController.js
│   ├── contactController.js
│   ├── resumeController.js
│   └── dashboardController.js
├── routes/                   # Express routes (7 files)
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── experienceRoutes.js
│   ├── skillRoutes.js
│   ├── contactRoutes.js
│   ├── resumeRoutes.js
│   └── dashboardRoutes.js
├── utils/
│   └── sql.js               # Query execution wrapper
├── app.js                   # Express app setup
└── server.js                # Entry point
```

### MVC Pattern Implementation

**Route Definition** (projectRoutes.js):
```javascript
const router = express.Router();

// Public routes
router.get('/', projectController.all);
router.get('/featured', projectController.featured);
router.get('/:id', projectController.find);

// Protected routes
router.post('/', protect, validate.project, projectController.create);
router.put('/:id', protect, validate.project, projectController.update);
router.delete('/:id', protect, projectController.remove);

module.exports = router;
```

**Controller** (projectController.js):
```javascript
exports.all = async (req, res) => {
  try {
    const projects = await projectModel.all();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Validation already done by middleware
    const { title, description, techStack, ...rest } = req.body;
    const filename = req.file?.filename;
    
    const project = await projectModel.create({
      title,
      description,
      techStack: JSON.stringify(techStack.split(',')),
      image: filename,
      ...rest
    });
    
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

**Model** (projectModel.js):
```javascript
const sql = require('../utils/sql');

exports.all = () => {
  return sql('SELECT * FROM projects ORDER BY `order`');
};

exports.create = (data) => {
  const query = `
    INSERT INTO projects 
    (title, description, techStack, image, githubUrl, liveUrl, featured, \`order\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.title,
    data.description,
    data.techStack,
    data.image,
    data.githubUrl || null,
    data.liveUrl || null,
    data.featured || false,
    data.order || 0
  ];
  return sql(query, values);
};
```

### Middleware

**Authentication (auth.js):**
```javascript
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { protect };
```

**Validation (validators.js):**
```javascript
const Joi = require('joi');

const schemas = {
  project: Joi.object().keys({
    title: Joi.string().required().error(() => 'Title required'),
    description: Joi.string().required(),
    techStack: Joi.string().required(),
    githubUrl: Joi.string().uri().optional(),
    liveUrl: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
    order: Joi.number().optional()
  })
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = { validate, schemas };
```

### File Upload Handling

```javascript
const multer = require('multer');
const path = require('path');

// Setup multer
const projectStorage = multer.diskStorage({
  destination: 'uploads/projects',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}${ext}`;
    cb(null, name);
  }
});

const upload = multer({
  storage: projectStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    ext in allowed ? cb(null, true) : cb(new Error('Invalid file type'));
  }
});

// Use in route
router.post('/', protect, upload.single('image'), controller.create);

// Access file in controller
const filename = req.file?.filename; // 1704067200.jpg
```

### Error Handling Pattern

```javascript
// Consistent error responses
exports.create = async (req, res) => {
  try {
    // Validation by middleware already done
    // If validation fails, middleware returns 400
    
    // Business logic
    const data = await model.create(req.body);
    
    // Success
    res.status(201).json(data);
  } catch (err) {
    // Consistent error response
    console.error(err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
```

---

## 🗄️ Database

### Schema

**admins**
```sql
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**projects**
```sql
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  techStack JSON,
  image VARCHAR(255),
  githubUrl VARCHAR(500),
  liveUrl VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  `order` INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**experiences**
```sql
CREATE TABLE experiences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  technologies JSON,
  `order` INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**skills**
```sql
CREATE TABLE skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  `level` INT DEFAULT 50,
  `order` INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**contacts**
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  `read` BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**resumes**
```sql
CREATE TABLE resumes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Common Queries

```javascript
// Get all with filters
SELECT * FROM projects WHERE featured = true ORDER BY `order`;

// Update with JSON
UPDATE projects SET techStack = JSON_ARRAY('React', 'Node.js') WHERE id = 1;

// Count by category
SELECT category, COUNT(*) as count FROM skills GROUP BY category;

// Find by email
SELECT * FROM admins WHERE email = ?;

// Get recent
SELECT * FROM contacts ORDER BY createdAt DESC LIMIT 10;
```

---

## 🔧 Common Tasks

### Adding a New Feature

**Example: Add "Tags" to Projects**

1. **Database Migration**
```sql
ALTER TABLE projects ADD COLUMN tags JSON;
```

2. **Update Model**
```javascript
// projectModel.js
exports.create = (data) => {
  const query = `
    INSERT INTO projects (..., tags)
    VALUES (..., ?)
  `;
  const values = [..., JSON.stringify(data.tags)];
  return sql(query, values);
};
```

3. **Update Validation**
```javascript
// validators.js
const project = Joi.object().keys({
  // ... existing fields
  tags: Joi.array().items(Joi.string()).optional()
});
```

4. **Update Controller**
```javascript
// projectController.js - no changes needed (already uses req.body)
```

5. **Update Frontend Form**
```typescript
// src/app/admin/projects/page.tsx
const [tags, setTags] = useState<string[]>([]);

const handleAddTag = (tag: string) => {
  setTags([...tags, tag]);
};

const handleSubmit = async () => {
  const form = new FormData();
  form.append('tags', JSON.stringify(tags));
  // ... other fields
  await api.createProject(form, token);
};
```

6. **Update API Service**
```typescript
// lib/api.ts
form.append('tags', JSON.stringify(formData.tags));
```

### Adding a New Route

**Example: Add Statistics Endpoint**

1. **Create Controller**
```javascript
// controllers/statsController.js
exports.getStats = async (req, res) => {
  try {
    const projects = await sql('SELECT COUNT(*) as count FROM projects');
    res.json({ projectCount: projects[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

2. **Create Route**
```javascript
// routes/statsRoutes.js
const router = express.Router();
const { protect } = require('../middleware/auth');
const controller = require('../controllers/statsController');

router.get('/', protect, controller.getStats);

module.exports = router;
```

3. **Register Route in app.js**
```javascript
app.use('/api/stats', require('./routes/statsRoutes'));
```

4. **Add to API Service**
```typescript
// lib/api.ts
export async function getStats(token: string) {
  const response = await fetch(`${API_URL}/stats`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new APIError('Failed to fetch stats');
  return response.json();
}
```

### Database Backup

```bash
# Backup
mysqldump -u root -p portfolio_db > backup_$(date +%Y%m%d).sql

# Restore
mysql -u root -p portfolio_db < backup_20240115.sql
```

---

## 💡 Code Patterns

### Error Handling (Consistent)

```typescript
// Frontend
try {
  const data = await api.createProject(formData, token);
  setSuccess('Created successfully');
} catch (err) {
  if (err instanceof APIError) {
    setError(err.message);
  } else {
    setError('An unexpected error occurred');
  }
}

// Backend
try {
  const result = await model.create(data);
  res.status(201).json(result);
} catch (err) {
  console.error(err);
  res.status(500).json({ 
    error: 'Server error',
    ...(process.env.NODE_ENV === 'dev' && { details: err.message })
  });
}
```

### Async/Await Pattern

```typescript
// Good
async function loadData() {
  try {
    const projects = await api.getProjects();
    setProjects(projects);
  } catch (err) {
    setError(err.message);
  }
}

// Avoid
function loadData() {
  api.getProjects().then(projects => {
    setProjects(projects);
  }).catch(err => {
    setError(err.message);
  });
}
```

### State Management Pattern

```typescript
// Good - separate concerns
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Avoid - too much state
const [state, setState] = useState({
  data: [],
  loading: false,
  error: null,
  // ... too many properties
});
```

---

## 🐛 Debugging Tips

### Frontend Debugging
```bash
# Browser DevTools (F12)
# 1. Console tab - logs and errors
# 2. Network tab - API calls
# 3. Application tab - localStorage, cookies
# 4. Elements tab - DOM inspection
# 5. Sources tab - breakpoints and stepping

# Common errors:
# "Unauthorized" → Check token in localStorage
# "CORS error" → Check backend CORS_ORIGIN
# "404 API" → Check NEXT_PUBLIC_API_URL
```

### Backend Debugging
```bash
# PM2 logs
pm2 logs portfolio-api
pm2 logs portfolio-api --lines 100

# Add logging in code
console.log('Debug:', variable);
console.error('Error:', error);

# MySQL query logging
Enable general_log in MySQL
SELECT * FROM mysql.general_log;
```

### Database Debugging
```bash
# Connect to database
mysql -u root -p portfolio_db

# View data
SELECT * FROM projects;
SELECT COUNT(*) FROM contacts;

# Check schema
DESCRIBE projects;

# Check slow queries
SHOW VARIABLES LIKE 'slow_query_log';
```

---

## 📊 Performance Optimization

### Frontend
```typescript
// 1. Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return largeDataSet.map(item => process.(item));
}, [largeDataSet]);

// 2. Use useCallback for callbacks
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);

// 3. Lazy load components
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <div>Loading...</div>
});

// 4. Image optimization
<Image
  src={project.image}
  alt={project.title}
  width={300}
  height={200}
  priority={isFeatured}
/>
```

### Backend
```javascript
// 1. Add database indexes
CREATE INDEX idx_email ON admins(email);
CREATE INDEX idx_featured ON projects(featured);

// 2. Pagination
SELECT * FROM projects LIMIT 10 OFFSET 0;

// 3. Caching
const cache = {};
if (cache.projects) return cache.projects;

// 4. Query optimization
SELECT id, title FROM projects; // Don't select unnecessary columns

// 5. Connection pooling (already done in db.js)
```

### Monitoring
```bash
# Check API response times
Add timing logs: console.time('query'); ... console.timeEnd('query');

# Monitor database size
SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) FROM information_schema.tables;

# Check Node.js memory
node --expose-gc app.js
global.gc(); // Force garbage collection
```

---

## 🔄 Git Workflow

### Branch Strategy
```bash
# Main branch - production code
git checkout -b feature/add-tags

# Make changes
git add .
git commit -m "feat: add tags to projects"

# Create pull request
git push origin feature/add-tags

# After review, merge to main
git checkout main
git merge feature/add-tags
```

### Commit Messages
```
feat: add new feature
fix: fix bug
refactor: reorganize code
docs: update documentation
style: formatting changes
test: add tests
chore: maintenance
```

### Deployment Process
```bash
# Development
npm run dev  # Runs locally at localhost:3000 and :5000

# Production
npm run build  # Frontend
npm run start   # Backend
```

---

## 📖 Resources & References

### Documentation Tools
- Swagger UI at `/api-docs`
- Console logs with F12
- MySQL CLI for database inspection

### Learning Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Patterns](https://react.dev/)
- [MySQL Manual](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)

### Tools
- VS Code for editing
- MySQL Workbench for database
- Postman for API testing
- Git for version control
- PM2 for process management

---

**Version**: 1.0.0  
**Last Updated**: January 2024

Questions? Check the relevant documentation or search the codebase for examples!
