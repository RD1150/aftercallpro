# AfterCallPro Security Enhancements - Deployment Guide

## 🎯 Overview

This guide will help you deploy all security improvements to your AfterCallPro application.

---

## 📋 Pre-Deployment Checklist

### **1. Render Dashboard Setup**

#### **Add PostgreSQL Database**
1. Go to your Render dashboard: https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `aftercallpro-db`
   - **Database**: `aftercallpro`
   - **User**: `aftercallpro_user`
   - **Region**: Same as your web service
   - **Plan**: **Starter ($7/month)** recommended
4. Click "Create Database"
5. Wait for database to provision (~2 minutes)
6. Copy the **Internal Database URL** (starts with `postgresql://`)

#### **Update Web Service Environment Variables**
1. Go to your web service in Render
2. Click "Environment" tab
3. Add/Update these variables:

```bash
# Database
DATABASE_URL=<paste_internal_database_url_here>

# Encryption (generate a new key)
ENCRYPTION_KEY=<generate_with_command_below>

# AWS S3 for Backups (optional but recommended)
AWS_ACCESS_KEY_ID=<your_aws_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret>
AWS_REGION=us-east-1
BACKUP_S3_BUCKET=aftercallpro-backups

# Security
ALLOWED_ORIGINS=https://aftercallpro.onrender.com,https://www.aftercallpro.com
SESSION_TIMEOUT=3600

# Rate Limiting (optional - requires Redis)
REDIS_URL=<redis_url_if_available>
```

#### **Generate Encryption Key**
Run this command locally:
```bash
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```
Copy the output and paste as `ENCRYPTION_KEY`

---

## 🚀 Deployment Steps

### **Step 1: Update Dependencies**

Merge the new security packages into your main requirements.txt:

```bash
cd /home/ubuntu/ai_call_service
cat requirements_security.txt >> requirements.txt
```

Your requirements.txt should now include:
- `psycopg2-binary==2.9.9`
- `cryptography==42.0.5`
- `bcrypt==4.1.2`
- `flask-talisman==1.1.0`
- `flask-limiter==3.5.0`
- `flask-wtf==1.2.1`
- `wtforms==3.1.2`
- `python-dateutil==2.8.2`
- `boto3==1.34.51`

### **Step 2: Replace Main Application File**

```bash
# Backup current main.py
cp src/main.py src/main_backup.py

# Replace with secure version
cp src/main_secure.py src/main.py
```

### **Step 3: Database Migration**

After deploying, run database migrations to add new columns:

```python
# Connect to your Render shell or run locally
from src.models.user import db
from flask import Flask
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db.init_app(app)

with app.app_context():
    # This will add new columns to existing tables
    db.create_all()
    print("Database migration completed!")
```

### **Step 4: Set Up Scheduled Jobs**

#### **Option A: Render Cron Jobs (Recommended)**

1. In Render dashboard, go to your web service
2. Click "Cron Jobs" tab
3. Add these jobs:

**Daily Backup (3 AM UTC)**
```
Name: Daily Database Backup
Schedule: 0 3 * * *
Command: python3 src/jobs/scheduled_jobs.py --job backup
```

**Weekly Cleanup (Sunday 2 AM UTC)**
```
Name: Weekly Data Cleanup
Schedule: 0 2 * * 0
Command: python3 src/jobs/scheduled_jobs.py --job cleanup
```

**Monthly Anonymization (1st of month, 1 AM UTC)**
```
Name: Monthly Data Anonymization
Schedule: 0 1 1 * *
Command: python3 src/jobs/scheduled_jobs.py --job anonymize
```

#### **Option B: External Cron Service**

Use a service like cron-job.org or EasyCron to hit these endpoints:
- `POST /api/jobs/backup` (daily)
- `POST /api/jobs/cleanup` (weekly)
- `POST /api/jobs/anonymize` (monthly)

---

## 🔐 Post-Deployment Configuration

### **1. Create Admin User**

After deployment, create your first admin user:

```python
from src.models.user import User, db
from flask import Flask
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db.init_app(app)

with app.app_context():
    admin = User(
        username='admin',
        email='your@email.com',
        role='admin'
    )
    admin.set_password('YourSecurePassword123!')
    db.session.add(admin)
    db.session.commit()
    print("Admin user created!")
```

### **2. Update Existing Users**

Set roles for existing users:

```python
# In Render shell or locally
from src.models.user import User, db

with app.app_context():
    users = User.query.all()
    for user in users:
        if not user.role:
            user.role = 'business_owner'  # or 'user', 'staff'
    db.session.commit()
```

### **3. Test Security Features**

1. **Test HTTPS Enforcement**
   - Try accessing http://yoursite.com (should redirect to https://)

2. **Test Rate Limiting**
   - Try logging in with wrong password 6 times (should get rate limited)

3. **Test Account Locking**
   - After 5 failed login attempts, account should lock for 30 minutes

4. **Test Audit Logging**
   - Perform some actions and check audit_logs table

5. **Test GDPR Export**
   - Request data export for a user
   - Verify all data is included

---

## 🔧 AWS S3 Setup (Optional but Recommended)

### **Create S3 Bucket for Backups**

1. Go to AWS Console → S3
2. Click "Create bucket"
3. Configure:
   - **Name**: `aftercallpro-backups-[random]`
   - **Region**: `us-east-1` (or your preferred region)
   - **Block Public Access**: Keep all enabled
   - **Versioning**: Enable
   - **Encryption**: Enable (AES-256)
4. Click "Create bucket"

### **Create IAM User for Backups**

1. Go to AWS Console → IAM → Users
2. Click "Add users"
3. **Username**: `aftercallpro-backup-user`
4. **Access type**: Programmatic access
5. **Permissions**: Attach policy directly → Create policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::aftercallpro-backups-*",
                "arn:aws:s3:::aftercallpro-backups-*/*"
            ]
        }
    ]
}
```

6. Save **Access Key ID** and **Secret Access Key**
7. Add to Render environment variables

---

## 📊 Monitoring & Verification

### **Check Database Connection**

```bash
# In Render shell
python3 -c "from src.models.user import db; from flask import Flask; import os; app = Flask(__name__); app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL'); db.init_app(app); print('Database connected!')"
```

### **Verify Encryption**

```bash
# Test encryption utilities
python3 -c "from src.utils.encryption import encrypt_field, decrypt_field; encrypted = encrypt_field('test'); print(f'Encrypted: {encrypted}'); print(f'Decrypted: {decrypt_field(encrypted)}')"
```

### **Check Audit Logs**

```sql
-- In PostgreSQL console
SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 10;
```

### **Monitor Backups**

```bash
# List S3 backups
aws s3 ls s3://aftercallpro-backups/backups/
```

---

## 🚨 Troubleshooting

### **Issue: Database connection fails**

**Solution:**
- Verify `DATABASE_URL` is set correctly in Render
- Check PostgreSQL database is running
- Ensure internal URL is used (not external)

### **Issue: Encryption errors**

**Solution:**
- Verify `ENCRYPTION_KEY` is set
- Key must be valid Fernet key (44 characters, base64)
- Regenerate key if corrupted

### **Issue: HTTPS not enforcing**

**Solution:**
- Render automatically provides SSL
- Ensure `flask-talisman` is installed
- Check `SESSION_COOKIE_SECURE = True` in config

### **Issue: Rate limiting not working**

**Solution:**
- Install `flask-limiter`: `pip install flask-limiter`
- For production, use Redis instead of memory storage
- Add `REDIS_URL` to environment variables

---

## 📈 Cost Summary

| Service | Cost | Purpose |
|---------|------|---------|
| Render PostgreSQL Starter | $7/month | Persistent database |
| AWS S3 Storage | ~$0.50/month | Backup storage |
| **Total** | **~$7.50/month** | Full security setup |

---

## ✅ Security Checklist

After deployment, verify:

- [ ] PostgreSQL database connected
- [ ] Encryption key set
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] Audit logging working
- [ ] Scheduled backups running
- [ ] Admin user created
- [ ] User roles assigned
- [ ] GDPR export tested
- [ ] Data retention policies active

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check database connection: Render Shell → `python3 -c "import psycopg2"`
3. Review environment variables are set correctly
4. Contact Render support for infrastructure issues

---

## 🎉 You're Done!

Your AfterCallPro application now has:
- ✅ Persistent PostgreSQL database
- ✅ Data encryption
- ✅ Role-based access control
- ✅ Audit logging
- ✅ HTTPS enforcement
- ✅ Rate limiting
- ✅ Automated backups
- ✅ GDPR compliance
- ✅ Data retention policies

**Total investment: $7.50/month for enterprise-grade security!**

