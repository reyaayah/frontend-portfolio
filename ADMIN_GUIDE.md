# Admin Panel Guide

## 🔐 Authentication

### Login
1. Navigate to `http://localhost:3000/admin/login` (or your deployment URL)
2. Default credentials (from seed):
   - Email: `admin@riyaawal.com`
   - Password: `admin123`
3. JWT token automatically saved to browser localStorage
4. Session persists across browser tabs and reloads

### Logout
- Click "Logout" button in sidebar or dashboard
- Automatically redirects to home page
- Token cleared from localStorage

---

## 📊 Dashboard

**Access:** `/admin/dashboard` or first item in sidebar

Shows real-time statistics:
- Total Projects
- Total Messages (contact form submissions)
- Unread Messages count
- Total Skills

Quick action links:
- API Documentation (Swagger)
- View Portfolio (live site)

---

## 🎨 Projects Management

**Access:** `/admin/projects`

### View All Projects
- List of all portfolio projects
- Each shows title, description, technologies, and featured status
- Sorted by custom order

### Create Project
1. Click "+ New Project" button
2. Fill in form:
   - **Title** * (required)
   - **Description** * (required)
   - **Tech Stack** * (comma-separated, e.g., "React, Node.js, MongoDB")
   - **GitHub URL** (optional)
   - **Live URL** (optional)
   - **Image** (project screenshot, optional)
   - **Featured** checkbox (highlight on homepage)
   - **Order** (display order in list)
3. Click "Create Project"
4. Image automatically uploaded to backend

### Edit Project
1. Click "Edit" button on any project card
2. Modify fields as needed
3. Upload new image if desired (replaces old one)
4. Click "Update Project"

### Delete Project
1. Click "Delete" button
2. Confirm deletion
3. Project removed permanently

---

## 💼 Experience Management

**Access:** `/admin/experiences`

### Add Experience
1. Click "+ Add Experience"
2. Fill in:
   - **Company** * (required)
   - **Role** * (required)
   - **Duration** * (e.g., "Jan 2023 - Present")
   - **Description** * (job responsibilities)
   - **Technologies** * (comma-separated skills used)
   - **Order** (display order)
3. Click "Add"

### Edit Experience
1. Click "Edit" on any experience card
2. Update fields
3. Click "Update"

### Delete Experience
1. Click "Delete"
2. Confirm deletion

---

## 💻 Skills Management

**Access:** `/admin/skills`

### Add Skill
1. Click "+ Add Skill"
2. Fill in:
   - **Name** * (e.g., "React", "Python")
   - **Category** * (Frontend, Backend, Tools, Other)
   - **Proficiency Level** (1-100%, visual slider)
   - **Order** (display order)
3. Click "Add"

### Features
- Visual proficiency bar (shows level as percentage)
- Color-coded by category:
  - Frontend: Blue
  - Backend: Green
  - Tools: Purple
  - Other: Gray
- Grid layout (3 columns on desktop)

### Edit/Delete
- Same as other sections

---

## 💬 Messages Management

**Access:** `/admin/contacts`

### View Messages
- List all contact form submissions
- Shows sender name, email, subject, date
- "New" badge for unread messages
- Blue highlight for unread messages
- Unread count in page header

### Read Message
1. Click on any message card to expand and read full message
2. Click again to collapse

### Mark as Read/Unread
1. Click "Mark Read" (for unread) or "Mark Unread" (for read)
2. Status updates instantly
3. Used to track which messages you've responded to

### Delete Message
1. Click "Delete"
2. Confirm deletion
3. Message permanently removed

### Features
- Sort by most recent first
- Sender email and date included
- Full message body visible when expanded
- Bulk actions available

---

## 📄 Resume Management

**Access:** `/admin/resume`

### Upload Resume
1. Click in the upload area or select file
2. Choose a PDF file (max 5MB)
3. Supported format: `.pdf`
4. Click "Upload Resume"
5. Success message confirms upload

### Download Resume
- Click "Download Resume" button
- Latest uploaded resume PDF downloads to your computer
- Share the download link with recruiters

### Features
- File size validation (max 5MB)
- File type validation (PDF only)
- Shows selected filename before upload
- Direct download link for sharing

---

## ⚙️ Settings

**Access:** `/admin/settings`

### Account Information
- Displays your admin email (read-only)
- Cannot be changed from this panel

### Change Password
1. Enter current password
2. Enter new password (min 6 characters)
3. Confirm new password (must match)
4. Click "Change Password"
5. Success message confirms change
6. You remain logged in

### Security Tips
Built-in security reminders:
- Use strong passwords
- Don't share your password
- Log out on public computers
- Change password regularly

---

## 🔄 Real-time Updates

When you make changes:
1. **Create/Edit/Delete** - list automatically refreshes
2. **Error handling** - clear error messages shown
3. **Success feedback** - confirmation messages displayed
4. **Loading states** - spinner shown during API calls

---

## 📱 Responsive Design

### Desktop (1024px+)
- Full sidebar always visible
- Multi-column grids (3+ columns)
- Full width content

### Tablet (768px - 1023px)  
- Persistent sidebar
- 2-3 column grids
- Touch-friendly buttons

### Mobile (< 768px)
- Floating menu button (bottom-right)
- Slide-out sidebar with overlay
- Single column layout
- Optimized touch targets

---

## 🛡️ Security Features

✅ **JWT Authentication**
- Token stored in browser localStorage
- Automatically sent with protected requests
- 7-day expiration

✅ **Protected Routes**
- Automatically redirects to login if token invalid/expired
- Cannot access admin pages without authentication

✅ **Form Validation**
- Client-side validation for all inputs
- Server-side validation on backend
- Clear error messages

✅ **HTTPS Ready**
- Works on production HTTPS domains
- Secure token transmission

---

## 🚀 Tips & Best Practices

1. **Projects Order**: Set numeric order to control display sequence
2. **Featured Projects**: Mark your best 3-5 projects as featured for homepage
3. **Skill Categories**: Properly categorize tech stack for better organization
4. **Message Management**: Mark messages as read after responding
5. **Resume Updates**: Keep resume up-to-date for recruiters
6. **Regular Backups**: Periodically export/backup your portfolio data
7. **Change Password**: Change password periodically for security
8. **Tech Stack**: Use consistent naming (e.g., "React" not "react" or "ReactJS")

---

## ❓ Troubleshooting

### "You are not logged in"
- Session expired; go to login page
- Clear browser cache and reload
- Check localStorage is enabled

### "Upload failed"
- Check file size (max 5MB)
- Check file format (PDF for resume, images for projects)
- Check internet connection

### "Changes not saved"
- Check error message for validation issues
- Ensure all required fields (*) are filled
- Try again or refresh page

### "Backend connection error"
- Check backend server is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

---

## 📞 Support

For issues:
1. Check browser console for errors (F12)
2. Check backend logs
3. Verify environment variables
4. Check API documentation at `/api-docs`

---

**Happy managing! 🎉**
