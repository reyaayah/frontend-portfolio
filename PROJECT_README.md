# 🚀 Riyaa Awal Portfolio - Full-Stack Application

A complete, production-ready portfolio management system built with **Next.js**, **Node.js/Express**, and **MySQL**. Features a public-facing portfolio website with an admin dashboard for managing all portfolio content.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Default Credentials](#default-credentials)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### 🌐 Public Portfolio Website
- Showcase projects with images, tech stack, and links
- Professional experience timeline
- Skills display with proficiency levels
- Contact form for inquiries
- Responsive design for all devices
- SEO optimized

### 🔐 Admin Dashboard
- **Secure authentication** with JWT tokens
- **Projects management** - Create, edit, delete with image uploads
- **Experience management** - Track work history
- **Skills management** - Track technical skills with proficiency levels
- **Message inbox** - View and manage contact form submissions
- **Resume management** - Upload and share PDF resume
- **Account settings** - Change password
- **Dashboard overview** - Quick statistics and links
- **Responsive interface** - Works on desktop, tablet, and mobile

### 🎯 Backend API
- RESTful architecture with 25+ endpoints
- JWT authentication
- File upload handling (images and PDFs)
- Input validation with Joi
- Error handling and logging
- Rate limiting for security
- CORS configuration
- Swagger API documentation

### 🗄️ Database
- MySQL with 6 tables
- Proper schema with relationships
- Seeding script for development
- Ready for production deployment

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **React Context** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File uploads
- **Joi** - Data validation
- **Helmet** - Security headers
- **Swagger** - API documentation

### Tools & Services
- **Vercel/Netlify** - Frontend hosting
- **Render/Railway/VPS** - Backend hosting
- **Let's Encrypt** - SSL certificates
- **Git** - Version control

---

## 📁 Project Structure

```
portfolio/
├── src/                          # Frontend (Next.js)
│   ├── app/
│   │   ├── admin/               # Admin pages (protected)
│   │   │   ├── login/          # Login form
│   │   │   ├── dashboard/      # Dashboard overview
│   │   │   ├── projects/       # Project management
│   │   │   ├── experiences/    # Experience management
│   │   │   ├── skills/         # Skills management
│   │   │   ├── contacts/       # Message inbox
│   │   │   ├── resume/         # Resume upload
│   │   │   ├── settings/       # Account settings
│   │   │   └── layout.tsx      # Admin layout with sidebar
│   │   ├── projects/           # Public projects page
│   │   ├── experience/         # Public experience page
│   │   ├── contact/            # Public contact page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── admin/              # Admin UI components
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── Modal.tsx
│   │   ├── navbar.tsx          # Main navigation
│   │   ├── ProjectCard.tsx     # Project card
│   │   └── FeaturedVideos.tsx  # Videos component
│   ├── context/
│   │   └── AuthContext.tsx     # JWT auth state
│   ├── lib/
│   │   ├── api.ts             # API service layer
│   │   └── getGithubStats.ts
│   └── data/
│       ├── projects.ts         # Static project data
│       └── experience.ts       # Static experience data
│
├── backend/                      # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MySQL connection setup
│   │   ├── controllers/        # Request handlers (7 files)
│   │   │   ├── adminController.js
│   │   │   ├── projectController.js
│   │   │   ├── experienceController.js
│   │   │   ├── skillController.js
│   │   │   ├── contactController.js
│   │   │   ├── resumeController.js
│   │   │   └── dashboardController.js
│   │   ├── models/            # Database queries (6 files)
│   │   │   ├── adminModel.js
│   │   │   ├── projectModel.js
│   │   │   ├── experienceModel.js
│   │   │   ├── skillModel.js
│   │   │   ├── contactModel.js
│   │   │   └── resumeModel.js
│   │   ├── routes/            # Express routes (7 files)
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── experienceRoutes.js
│   │   │   ├── skillRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── resumeRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js        # JWT verification
│   │   │   └── validators.js  # Input validation
│   │   ├── utils/
│   │   │   └── sql.js         # Query wrapper
│   │   ├── app.js             # Express configuration
│   │   └── server.js          # Entry point
│   ├── seed.js                # Database seeding
│   ├── .env.example           # Environment template
│   └── package.json
│
├── public/                      # Static files
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── ADMIN_GUIDE.md             # Admin panel guide
├── ADMIN_QUICK_REFERENCE.md   # Quick reference
├── API_REFERENCE.md           # API documentation
├── DEPLOYMENT_GUIDE.md        # Deployment instructions
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 5.7+
- npm or yarn

### 1. Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Configure database (edit .env.local)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portfolio_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your-very-long-secret-key-min-32-chars

# Create database
mysql -u root -p << EOF
CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EOF

# Seed database with sample data
npm run seed

# Start backend
npm run dev
# Backend running at http://localhost:5000
```

### 2. Setup Frontend

```bash
# Install dependencies
npm install

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF

# Start frontend development server
npm run dev
# Frontend running at http://localhost:3000
```

### 3. Access Application

- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **API Docs**: http://localhost:5000/api-docs
- **Admin Email**: admin@riyaawal.com
- **Admin Password**: admin123

---

## 📚 Documentation

### Administrative Guides
- **[Admin Panel Guide](./ADMIN_GUIDE.md)** - Complete guide for managing portfolio content
- **[Quick Reference](./ADMIN_QUICK_REFERENCE.md)** - Keyboard shortcuts and common tasks

### Technical Documentation
- **[API Reference](./API_REFERENCE.md)** - All API endpoints with examples
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions

### Key Concepts

**JWT Authentication**
- Login generates secure token (7-day expiration)
- Token stored in localStorage
- Automatically sent with protected requests
- Logout clears token and redirects to home

**File Uploads**
- Project images: max 5MB (jpg, png, webp, gif)
- Resume PDF: max 5MB
- Automatically served from backend `/uploads` directory

**Database Schema**
- `admins` - Admin accounts with hashed passwords
- `projects` - Portfolio projects with tech stack
- `experiences` - Work history and roles
- `skills` - Technical skills with proficiency levels
- `contacts` - Contact form messages
- `resumes` - Resume files with timestamps

---

## 🌐 Environment Variables

### Backend (.env.local or .env.production)

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-very-long-random-secret-key-min-32-chars

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Frontend (.env.local or .env.production.local)

```bash
# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based auth  
✅ **Password Hashing** - bcrypt with 10 rounds  
✅ **Input Validation** - Joi schemas on all endpoints  
✅ **CORS Protection** - Whitelist allowed origins  
✅ **Rate Limiting** - 100 requests per 15 min  
✅ **Security Headers** - Helmet.js configuration  
✅ **SQL Injection Protection** - Parameterized queries  
✅ **File Type Validation** - Only allowed formats  

---

## 🧪 Testing

### Test Admin Login
```bash
# 1. Start backend: npm run dev (in backend folder)
# 2. Start frontend: npm run dev
# 3. Visit http://localhost:3000/admin/login
# 4. Use default credentials:
#    Email: admin@riyaawal.com
#    Password: admin123
```

### Test API Endpoints
```bash
# Get all projects (public)
curl http://localhost:5000/api/projects

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@riyaawal.com","password":"admin123"}'

# Or visit Swagger docs: http://localhost:5000/api-docs
```

---

## 📝 Default Credentials

**Development Only!** 
Change these immediately in production.

| Email | Password | Role |
|-------|----------|------|
| admin@riyaawal.com | admin123 | Administrator |

Change password in `/admin/settings` after first login.

---

## 🚀 Deployment

### Quick Deploy (Recommended)
1. **Backend**: Deploy to [Render](https://render.com) or [Railway](https://railway.app)
2. **Frontend**: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. **Database**: Use managed MySQL from hosting provider

### Full Instructions
See **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** for detailed steps including:
- Render / Railway setup
- Vercel / Netlify deployment
- VPS deployment
- Domain setup
- SSL/HTTPS configuration
- Production security checklist

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Check port 5000 is available
lsof -i :5000

# Clear node_modules and reinstall
rm -rf backend/node_modules
npm install
```

### Admin Page Shows "Not Logged In"
- Clear localStorage: Dev Tools → Application → localStorage → clear
- Check NEXT_PUBLIC_API_URL in `.env.local`
- Verify token is valid (check browser console)

### File Upload Fails
- Check file size (< 5MB)
- Check file format (jpg/png for images, pdf for resume)
- Verify `/uploads` directory exists in backend
- Check disk space available

### API Calls Return 401
- Token expired (7 days) - login again
- Token wasn't sent - check Authorization header
- Backend JWT_SECRET mismatch - ensure same value

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
- MySQL not running: `mysql.server start` (Mac) or service start mysql (Windows)
- Wrong credentials: verify .env.local
- Database doesn't exist: run `npm run seed`

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
- Check CORS_ORIGIN in backend .env.local
- Should match your frontend URL
- Frontend: `http://localhost:3000` (dev)
- Backend: `http://localhost:5000`

### "Cannot find module" errors
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Performance Tips

- **Images**: Compress before uploading (use TinyPNG)
- **Database**: Create backups regularly
- **Monitoring**: Check logs for errors: `pm2 logs`
- **Caching**: Set appropriate cache headers
- **SEO**: Add Open Graph meta tags

---

## 🔄 Updates & Maintenance

### Regular Tasks
```bash
# Weekly
npm update                    # Update dependent packages
npm audit                     # Check for vulnerabilities

# Monthly
npm audit fix                 # Apply security patches
mysql -u root -p < backup.sql # Backup database

# Quarterly
Review and update dependencies
Monitor API usage and performance
```

### Scaling Considerations
- Switch to managed MySQL for better performance
- Add Redis for caching
- Implement CDN for static assets
- Consider load balancing for high traffic

---

## 📞 Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io)

### Troubleshooting
1. Check browser console for errors (F12)
2. Check backend logs: `pm2 logs`
3. Check database connectivity
4. Visit Swagger docs: `/api-docs`
5. Review error messages carefully

---

## 📄 License

This project is private and confidential.

---

## 🎯 Next Steps

✅ **Completed**
- Full-stack application setup
- Admin dashboard with all features
- Database seeding and migration
- API documentation

⏳ **Recommended Next Steps**
1. Update public pages to fetch from API (instead of static data)
2. Deploy to production
3. Configure custom domain
4. Enable analytics
5. Monitor performance

**First Deploy?** Start here: [Deployment Guide](./DEPLOYMENT_GUIDE.md)

**Need Admin Help?** See: [Admin Guide](./ADMIN_GUIDE.md)

**API Questions?** Check: [API Reference](./API_REFERENCE.md)

---

## ✨ Credits

Built with modern web technologies and best practices for a production-ready portfolio platform.

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Status**: Production Ready ✅

For questions or issues, check the relevant documentation file or debug using browser dev tools and server logs.

**Happy coding! 🚀**
