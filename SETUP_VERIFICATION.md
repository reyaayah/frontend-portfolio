# ✅ Setup Verification Checklist

Complete this checklist to verify your portfolio application is properly configured and ready to use.

---

## 📋 Prerequisites

### System Requirements
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm latest version (`npm --version`)
- [ ] MySQL 5.7+ installed (`mysql --version`)
- [ ] Git installed (`git --version`)
- [ ] 500MB free disk space
- [ ] Internet connection for npm packages

### Verify with Commands
```bash
node --version    # Should show v18.x or higher
npm --version     # Should show 8.x or higher
mysql --version   # Should show mysql Ver 5.7 or higher
git --version     # Should show git version
```

---

## 🗄️ Database Setup

### Create Database
```sql
-- Run in MySQL console
CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

### Verify Database
```bash
# Test connection
mysql -u portfolio_user -p portfolio_db -e "SELECT 1;"

# Should output:
# +---+
# | 1 |
# +---+
# | 1 |
# +---+
```

**Checklist:**
- [ ] MySQL server running
- [ ] Database `portfolio_db` created
- [ ] User `portfolio_user` created
- [ ] User has all privileges
- [ ] Can connect with test query

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

**Verify:**
- [ ] In `/backend` directory
- [ ] Can see `src/`, `package.json`, `seed.js`

### Step 2: Install Dependencies
```bash
npm install
```

**Verify:**
- [ ] No error messages
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` created

### Step 3: Create Environment File
```bash
cp .env.example .env.local
```

**Or manually create `.env.local`:**
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=your_password
JWT_SECRET=your-very-long-secret-key-at-least-32-characters-long
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Verify:**
- [ ] `.env.local` file exists in `/backend`
- [ ] All required variables set
- [ ] JWT_SECRET is strong (min 32 chars)

### Step 4: Seed Database
```bash
npm run seed
```

**Expected Output:**
```
✓ Inserted admin user
✓ Inserted projects
✓ Inserted experiences
✓ Inserted skills
✓ Seeding completed
```

**Verify:**
- [ ] No errors during seeding
- [ ] Check database:
  ```bash
  mysql -u portfolio_user -p portfolio_db
  SELECT COUNT(*) FROM admins;      # Should be 1
  SELECT COUNT(*) FROM projects;    # Should be 3+
  SELECT COUNT(*) FROM experiences; # Should be 3+
  SELECT COUNT(*) FROM skills;      # Should be 10+
  ```

### Step 5: Start Backend
```bash
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
API documentation available at http://localhost:5000/api-docs
```

**Verify:**
- [ ] No error messages
- [ ] Server running on port 5000
- [ ] Can access http://localhost:5000/api-docs (Swagger docs)
- [ ] Open new terminal (keep this one open)

### Step 6: Test Backend Endpoints
```bash
# Test public endpoint (no auth needed)
curl http://localhost:5000/api/projects

# Should return JSON array of projects
# [{"id":1,"title":"...","description":"..."}]

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@riyaawal.com","password":"admin123"}'

# Should return: {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

**Verify:**
- [ ] GET /api/projects returns 200 with data
- [ ] POST /api/auth/login returns 200 with token
- [ ] Swagger UI loads at /api-docs

---

## 🎨 Frontend Setup

### Step 1: Open New Terminal and Navigate to Frontend
```bash
# In new terminal window
cd /path/to/portfolio
# (should be parent of backend folder)
```

**Verify:**
- [ ] In root portfolio directory
- [ ] Can see `src/`, `next.config.ts`, `package.json`

### Step 2: Install Dependencies
```bash
npm install
```

**Verify:**
- [ ] No error messages
- [ ] `node_modules/` folder created
- [ ] Takes 2-3 minutes

### Step 3: Create Environment File
```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF
```

**Or manually create `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Verify:**
- [ ] `.env.local` file exists in project root
- [ ] Contains `NEXT_PUBLIC_API_URL=http://localhost:5000`

### Step 4: Start Frontend
```bash
npm run dev
```

**Expected Output:**
```
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

**Verify:**
- [ ] No error messages
- [ ] Frontend running on http://localhost:3000

---

## 🧪 Integration Test

### Test Full Workflow: Public Access
```bash
# 1. Visit home page
curl http://localhost:3000

# 2. Visit projects page
curl http://localhost:3000/projects

# 3. Visit experience page
curl http://localhost:3000/experience
```

**Verify:**
- [ ] Pages load without errors
- [ ] No 404 errors

### Test Full Workflow: Admin Login

**Step 1: Visit login page**
```
URL: http://localhost:3000/admin/login
```

**Verify in browser:**
- [ ] Page loads
- [ ] Email field visible
- [ ] Password field visible
- [ ] "Login" button visible

**Step 2: Login with default credentials**
- Email: `admin@riyaawal.com`
- Password: `admin123`

**Verify:**
- [ ] No validation errors
- [ ] Redirected to dashboard
- [ ] Dashboard loads successfully

**Step 3: Verify Dashboard Stats**
- [ ] Shows "Projects" count (should be 3+)
- [ ] Shows "Messages" count
- [ ] Shows "Unread Messages" count
- [ ] Shows "Skills" count

### Test Admin Features

**1. Projects Page**
```
URL: http://localhost:3000/admin/projects
```
- [ ] List of projects displays
- [ ] "+ New Project" button visible
- [ ] Each project has Edit/Delete buttons

**2. Experiences Page**
```
URL: http://localhost:3000/admin/experiences
```
- [ ] List of experiences displays
- [ ] "+ Add Experience" button visible
- [ ] Each experience shows company, role, duration

**3. Skills Page**
```
URL: http://localhost:3000/admin/skills
```
- [ ] List of skills with proficiency bars
- [ ] "+ Add Skill" button visible
- [ ] Skills color-coded by category

**4. Messages Page**
```
URL: http://localhost:3000/admin/contacts
```
- [ ] Can view contact messages
- [ ] Shows unread count
- [ ] Can mark as read

**5. Resume Page**
```
URL: http://localhost:3000/admin/resume
```
- [ ] Upload area visible
- [ ] Can select PDF file

**6. Settings Page**
```
URL: http://localhost:3000/admin/settings
```
- [ ] Shows admin email (read-only)
- [ ] Password change form visible
- [ ] "Change Password" button visible

**7. Logout**
- [ ] Click "Logout" in sidebar
- [ ] Redirected to home page
- [ ] Cannot access admin pages without login

---

## 📊 API Testing

### Use Swagger Documentation
Visit: http://localhost:5000/api-docs

**Test Each Endpoint:**

**Public Endpoints (no auth required):**
- [ ] GET /api/projects → Returns 200
- [ ] GET /api/projects/featured → Returns 200
- [ ] GET /api/experiences → Returns 200
- [ ] GET /api/skills → Returns 200

**Auth Endpoint:**
- [ ] POST /api/auth/login → Returns 200 with token

**Protected Endpoints (need token):**
Get token first, then:
- [ ] GET /api/dashboard/stats → Returns 200
- [ ] POST /api/projects (create) → Returns 201
- [ ] PUT /api/projects/{id} (update) → Returns 200
- [ ] DELETE /api/projects/{id} (delete) → Returns 200

---

## 🔐 Security Verification

### JWT Token
```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@riyaawal.com","password":"admin123"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Verify token works
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/dashboard/stats

# Should return: {"totalProjects":3,"totalMessages":...}
```

**Verify:**
- [ ] Token obtained successfully
- [ ] Token works with protected endpoints
- [ ] Invalid token returns 401

### CORS
```bash
# Test CORS headers
curl -i http://localhost:5000/api/projects

# Check response headers
# Should include: Access-Control-Allow-Origin: http://localhost:3000
```

**Verify:**
- [ ] CORS headers present
- [ ] Correct origin whitelisted

---

## 📁 File Structure Verification

### Backend Files
```bash
cd backend

# Verify all files exist:
ls src/config/db.js              # ✓
ls src/middleware/auth.js        # ✓
ls src/middleware/validators.js  # ✓
ls src/models/projectModel.js    # ✓
ls src/controllers/projectController.js # ✓
ls src/routes/projectRoutes.js   # ✓
ls src/app.js                    # ✓
ls src/server.js                 # ✓
ls seed.js                       # ✓
ls package.json                  # ✓
```

**Verify:** All files exist with ✓

### Frontend Files
```bash
cd ..  # Back to root

# Verify all files exist:
ls src/context/AuthContext.tsx          # ✓
ls src/lib/api.ts                       # ✓
ls src/components/admin/AdminSidebar.tsx # ✓
ls src/app/admin/login/page.tsx         # ✓
ls src/app/admin/dashboard/page.tsx     # ✓
ls src/app/admin/projects/page.tsx      # ✓
ls src/app/layout.tsx                   # ✓
ls package.json                         # ✓
```

**Verify:** All files exist with ✓

---

## 🚀 Production Readiness Checklist

### Before Deployment
- [ ] All features tested locally
- [ ] Admin can login and manage content
- [ ] File uploads working (projects, resume)
- [ ] API endpoints responding correctly
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Database backups automated
- [ ] Environment variables configured
- [ ] HTTPS ready (for production)
- [ ] Custom domain configured (for production)

### Database Backup
```bash
# Create backup
mysqldump -u portfolio_user -p portfolio_db > backup.sql

# Verify backup
ls -lh backup.sql  # Should show file size > 0
```

**Verify:**
- [ ] Backup file created
- [ ] Backup is > 1KB (has data)

---

## ⚡ Performance Verification

### Frontend Performance
```bash
# Build for production
npm run build

# Check build size
ls -lh .next

# Should be < 100MB
```

**Verify:**
- [ ] Build completes without errors
- [ ] `.next` folder reasonable size

### API Response Time
```bash
# Test API response time
time curl http://localhost:5000/api/projects

# Should complete in < 200ms
```

**Verify:**
- [ ] API responds within 200ms
- [ ] No timeouts

---

## 🐛 Troubleshooting Verification

### If Backend Won't Start
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Check .env.local exists
cat backend/.env.local

# Check port 5000 is free
lsof -i :5000
```

**Fix:**
- [ ] Verify .env.local has correct credentials
- [ ] Kill process on port 5000
- [ ] Restart MySQL service

### If Frontend Won't Start
```bash
# Check .env.local exists
cat .env.local

# Check NEXT_PUBLIC_API_URL is correct
grep NEXT_PUBLIC_API_URL .env.local

# Should show: NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Fix:**
- [ ] Verify .env.local points to backend
- [ ] Clear cache: rm -rf .next
- [ ] Reinstall: rm -rf node_modules && npm install

### If API Calls Fail
```bash
# Test API directly
curl -i http://localhost:5000/api/projects

# Check CORS headers
# Check token in browser localStorage
# Open DevTools → Application → localStorage
```

**Fix:**
- [ ] Check CORS_ORIGIN in backend .env.local
- [ ] Verify backend is running
- [ ] Check browser console for errors

---

## ✨ Final Verification

### Run All Checks
- [ ] Database created and seeded
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:5000/api-docs
- [ ] Can login with admin@riyaawal.com/admin123
- [ ] Can view dashboard
- [ ] Can manage projects
- [ ] Can manage experiences
- [ ] Can manage skills
- [ ] Can view messages
- [ ] Can upload resume
- [ ] Can logout

### System Status Summary
```bash
# Quick status check
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "MySQL: $(mysql --version)"
echo "Backend running: $(curl -s http://localhost:5000/api-docs | head -1)"
echo "Frontend running: $(curl -s http://localhost:3000 | head -1)"
```

---

## ✅ Ready for Use

If all checkboxes are checked ✅, your portfolio application is:
- ✅ Properly configured
- ✅ Fully functional
- ✅ Ready for content creation
- ✅ Ready for deployment

**Next Steps:**
1. Read [Admin Guide](./ADMIN_GUIDE.md) to learn features
2. Read [Deployment Guide](./DEPLOYMENT_GUIDE.md) to deploy
3. Start creating your portfolio content!

---

**Need Help?**
- Check browser console (F12) for errors
- Check backend logs for API issues
- Verify MySQL is running with credentials
- Review relevant documentation files

**Questions?** Review:
- [Admin Guide](./ADMIN_GUIDE.md) - How to use features
- [API Reference](./API_REFERENCE.md) - API endpoints
- [Developer Guide](./DEVELOPER_GUIDE.md) - How to extend features
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - How to deploy

---

**Congratulations!** 🎉 Your portfolio is ready!

Version: 1.0.0  
Last Updated: January 2024
