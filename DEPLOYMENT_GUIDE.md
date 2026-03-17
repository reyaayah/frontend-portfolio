# Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] Test all admin features locally
- [ ] Create new admin account (change from seed credentials)
- [ ] Backup MySQL database
- [ ] Update environment variables for production
- [ ] Verify CORS settings for production domain
- [ ] Test file uploads with production server
- [ ] Set strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS on both frontend and backend
- [ ] Test full authentication flow
- [ ] Review all error messages are user-friendly

---

## 🗄️ Database Setup (Production)

### Option 1: AWS RDS (Recommended)
1. Create RDS MySQL instance
2. Note hostname, username, password
3. Whitelist your server IP in security group
4. Create portfolio database
5. Run migration scripts

### Option 2: DigitalOcean MySQL
1. Create managed MySQL cluster
2. Get connection details
3. Allow backend server IP access
4. Initial database setup

### Option 3: Traditional VPS (Manual MySQL)
```bash
# SSH into VPS
ssh user@your-server.com

# Install MySQL
sudo apt update
sudo apt install mysql-server

# Create database
mysql -u root
CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

### Run Migration
```bash
# Copy seed.js to production server
scp seed.js user@server:/app/backend/

# SSH and run
ssh user@server
cd /app/backend
mysql -u portfolio_user -p portfolio_db < migrations.sql
node seed.js
```

---

## 🔧 Backend Deployment

### Option 1: Render (Recommended for Beginners)

**Setup:**
1. Push backend code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub repo (select `/backend` directory)
5. Set build command: `npm install`
6. Set start command: `npm run start`

**Environment Variables:**
```
DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=your_strong_password
JWT_SECRET=your_secret_key_min_32_chars
PORT=5000
NODE_ENV=production
```

**After Deployment:**
- Get URL (e.g., `https://portfolio-api.onrender.com`)
- Test health check: `GET /api/projects`
- Update frontend `NEXT_PUBLIC_API_URL`

### Option 2: Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project
4. Connect GitHub repo
5. Add MySQL plugin
6. Set environment variables
7. Deploy

**Connect MySQL:**
- Railway auto-creates connection string
- Set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

### Option 3: DigitalOcean App Platform

1. Connect GitHub account
2. Select backend directory
3. Configure build: `npm install`
4. Configure start: `npm run start`
5. Add environment variables
6. Deploy

### Option 4: VPS (Advanced)

```bash
# SSH to VPS
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone repository
cd /var/www
git clone https://github.com/yourusername/portfolio.git
cd portfolio/backend

# Install dependencies
npm install

# Create .env.production
cat > .env.production << EOF
DB_HOST=localhost
DB_PORT=3306
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=5000
EOF

# Install PM2 (process manager)
sudo npm install -g pm2

# Start app with PM2
pm2 start src/server.js --name "portfolio-api"
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

**Nginx config (add to server block):**
```nginx
location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

**Enable HTTPS with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

**Setup:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your portfolio repository
5. Install Vercel CLI: `npm i -g vercel`
6. Deploy: `vercel --prod`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url
```

**Auto-deployment:**
- Vercel auto-deploys on GitHub push
- Preview deployments for pull requests
- Automatic HTTPS

### Option 2: Netlify

1. Connect GitHub to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url
   ```
5. Deploy

**Note:** Netlify requires special config for Next.js public routes
Add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Traditional Hosting

```bash
# Build locally
npm run build

# Files in .next directory are production-ready
# Upload to your hosting provider

# Set environment variable on hosting:
NEXT_PUBLIC_API_URL=https://your-backend-domain

# Deploy:
npm run build
# Upload .next, public, package.json, package-lock.json
```

### Option 4: Self-Hosted VPS

```bash
# SSH to your server
ssh root@your-server-ip

# Clone repository
cd /var/www
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create .env.production.local
echo "NEXT_PUBLIC_API_URL=https://your-backend-url" > .env.production.local

# Build
npm run build

# Install PM2
sudo npm install -g pm2

# Start Next.js
pm2 start npm --name "portfolio-web" -- start
pm2 startup
pm2 save

# Setup Nginx
sudo apt install nginx
# Forward requests to :3000
sudo nano /etc/nginx/sites-available/default
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**SSL Certificate:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔐 Production Security

### Backend (.env.production)
```
# Use strong secret key (generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-very-long-random-string-min-32-chars

# Hide sensitive info
DB_PASSWORD=use_strong_password
NODE_ENV=production

# CORS for production domain only
CORS_ORIGIN=https://yourdomain.com

# Rate limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Frontend (.env.production.local)
```
# Use full HTTPS URL to backend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Database
```sql
-- Create database user with limited permissions
CREATE USER 'portfolio_app'@'your-app-server-ip' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON portfolio_db.* TO 'portfolio_app'@'your-app-server-ip';
FLUSH PRIVILEGES;
```

### HTTPS
- Enable SSL/TLS on both domains
- Redirect HTTP to HTTPS
- Set secure cookie flags
- Use Content Security Policy headers

---

## 🚀 Deployment Steps (Summary)

### Quick Deploy (Render + Vercel)

**1. Deploy Backend (5 min)**
```bash
# Push to GitHub
git push origin main

# Go to render.com
# Connect repo, set env vars, deploy
```

**2. Deploy Frontend (5 min)**
```bash
# Go to vercel.com
# Import project, set NEXT_PUBLIC_API_URL
# Auto-deploys on push
```

**3. Test**
```bash
# Visit your domain
# Login with admin account
# Create/edit content
# Verify everything works
```

### Advanced Deploy (Full VPS)

1. Setup VPS (DigitalOcean, Linode, AWS EC2)
2. Install Node.js + MySQL
3. Clone repository
4. Setup environment variables
5. Install PM2
6. Setup Nginx + SSL
7. Start services
8. Monitor logs

---

## 📊 Post-Deployment

### Monitoring

**Error Tracking:**
- Backend logs: Check PM2 logs
- Frontend errors: Check browser console
- Database issues: MySQL error logs

**Performance:**
- Monitor API response times
- Check database query performance
- Monitor server CPU/memory usage

**Uptime:**
- Setup uptime monitoring (UptimeRobot.com)
- Get alerts for downtime
- Test endpoints regularly

### Maintenance

```bash
# Update dependencies
npm update

# Clear cache
npm cache clean --force

# Check for vulnerabilities
npm audit
npm audit fix

# Monitor database size
mysql> SELECT table_schema, SUM(data_length + index_length) FROM information_schema.tables GROUP BY table_schema;

# Backup database
mysqldump -u user -p portfolio_db > backup_$(date +%Y%m%d).sql
```

### Logs

**Backend logs:**
```bash
pm2 logs portfolio-api
pm2 logs portfolio-api --lines 100
```

**Frontend logs:**
```bash
pm2 logs portfolio-web
pm2 logs portfolio-web --lines 100
```

---

## 🔄 Rollback

If something breaks:

**Backend:**
```bash
# SSH to server
git revert HEAD
npm install
npm run build
pm2 restart portfolio-api
```

**Frontend:**
- Vercel: One-click rollback in dashboard
- Self-hosted:
  ```bash
  git revert HEAD
  npm run build
  pm2 restart portfolio-web
  ```

**Database:**
```bash
# Restore from backup
mysql -u user -p portfolio_db < backup_date.sql
```

---

## 📝 Domain Setup

### DNS Configuration

1. Buy domain (godaddy.com, namecheap.com, etc)
2. Update nameservers to your hosting provider
3. Add DNS records:

```
Record Type    | Host      | Value
---------------|-----------|------------------
A              | @         | Backend IP (if VPS)
A              | www       | Frontend IP
CNAME          | api       | Backend domain
CNAME          | cdn       | CDN (optional)
```

### SSL Certificate

- Vercel: Auto-manages SSL
- Netlify: Auto-manages SSL
- Self-hosted: Use certbot for Let's Encrypt

### Email (Optional)

Add MX records for email at your domain
```
Record Type | Priority | Value
------------|----------|--------
MX          | 10       | mail.yourdomain.com
MX          | 20       | mail2.yourdomain.com
```

---

## ✅ Deployment Checklist (Final)

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Admin login works
- [ ] HTTPS on both domains
- [ ] Database backups configured
- [ ] Error logs collecting properly
- [ ] Uptime monitoring active
- [ ] DNS records point correctly
- [ ] Forms send data correctly
- [ ] File uploads work
- [ ] Images load properly
- [ ] SEO meta tags in place
- [ ] Analytics configured (optional)
- [ ] Admin can login and edit content
- [ ] Public pages load from database

---

**Congratulations! 🎉 Your portfolio is live!**

For issues during deployment, check:
1. Environment variables (all set correctly?)
2. CORS settings (domain whitelisted?)
3. Database credentials (can connect?)
4. Firewall rules (ports open?)
5. HTTPS certificates (valid?)

Good luck!
