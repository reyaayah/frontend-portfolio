# Admin Panel Quick Reference

## 🔗 Quick Links

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/admin/login` | Admin authentication |
| Dashboard | `/admin/dashboard` | Overview & stats |
| Projects | `/admin/projects` | CRUD projects |
| Experiences | `/admin/experiences` | Manage work history |
| Skills | `/admin/skills` | Track tech stack |
| Messages | `/admin/contacts` | View contact form submissions |
| Resume | `/admin/resume` | Manage PDF |
| Settings | `/admin/settings` | Account & password |
| API Docs | `http://localhost:5000/api-docs` | Swagger documentation |

---

## 🎯 Common Tasks

### Add a Project
```
1. /admin/projects → "+ New Project"
2. Fill form (title, description, tech stack, image)
3. Click "Create Project"
```

### Report an Issue
```
1. /admin/contacts → View messages
2. Get sender email
3. Respond directly to their email
4. Mark as "Mark Read" when done
```

### Update Skills
```
1. /admin/skills → "+ Add Skill"  
2. Enter name, category, proficiency level
3. Click "Add"
```

### Upload New Resume
```
1. /admin/resume → Drop PDF or select file
2. Max 5MB, PDF format only
3. Download link auto-generated
```

### Change Password
```
1. /admin/settings → "Change Password"
2. Enter old password, new password, confirm
3. Click "Change Password"
```

---

## 📊 Statistics (Dashboard)

- **Total Projects**: Count of all portfolio items
- **Total Messages**: All contact form submissions
- **Unread Messages**: New submissions not yet reviewed
- **Total Skills**: All tech stack items

---

## 🏷️ Skill Categories

| Category | Color | Use For |
|----------|-------|---------|
| Frontend | Blue | React, Vue, CSS, HTML, etc |
| Backend | Green | Node.js, Python, Java, Databases, etc |
| Tools | Purple | Git, Docker, AWS, etc |
| Other | Gray | Miscellaneous |

---

## 📋 Form Validation Rules

| Field | Rules |
|-------|-------|
| Email | Valid email format |
| Password | Min 6 characters |
| Tech Stack | Comma-separated list |
| Duration | User-defined format |
| Proficiency | 1-100 range |
| File Upload | Size <5MB, correct format |

---

## 🔐 Security Reminders

✓ Don't share your password  
✓ Log out on public computers  
✓ Change password every 3 months  
✓ Clear browser history if using shared device  
✓ Logout automatically expires after 7 days  

---

## 🆘 When Stuck

| Issue | Solution |
|-------|----------|
| Forgot password | Backend admin needs to reset via DB (dev only) |
| Can't login | Check email/password, clear cache |
| Upload failed | Check file size/format |
| Not seeing changes | Refresh page (Ctrl+R) |
| Backend offline | Check if server running: `npm run dev` in /backend |

---

## 🚀 Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Logout | Click sidebar "Logout" button |
| Quick reload | Ctrl+R (Cmd+R on Mac) |
| Dev tools | F12 |
| Mobile view | Ctrl+Shift+M (Cmd+Shift+M) |

---

## 📱 Mobile Usage

- **Bottom-right button**: Toggle sidebar on mobile
- **Single column layout**: Optimized for phones
- **Touch-friendly**: Large buttons, good spacing
- **Sidebar overlay**: Tap overlay to close sidebar

---

## 🔄 API Integration

All operations are API-backed:
- **Backend**: Node.js + Express at `http://localhost:5000`
- **Database**: MySQL with 6 tables
- **Frontend**: Next.js fetches from `/api/*` routes
- **Auth**: JWT tokens in localStorage
- **Swagger Docs**: Available at `/api-docs`

---

**Last Updated**: 2024
