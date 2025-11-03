# AfterCallPro Data Storage & Security Documentation

## Current Data Storage Architecture

### **Database Type**
- **SQLite** database stored at `/tmp/app.db` on Render
- Lightweight, file-based relational database
- Suitable for small to medium-scale applications

### **Data Models**

#### **1. User Model** (`src/models/user.py`)
Stores user account information:
- User ID (primary key)
- Email address
- Password (hashed)
- Name
- Account creation date
- Subscription information

#### **2. Business Model** (`src/models/call.py`)
Stores business/customer information:
- Business ID (primary key)
- Business name
- Phone number
- Email
- Greeting message
- Business hours
- Subscription tier (free, basic, pro, enterprise)
- Monthly minutes limit
- Minutes used
- Call forwarding settings

#### **3. Call Model** (`src/models/call.py`)
Stores call records:
- Call ID (primary key)
- Business ID (foreign key)
- Caller phone number
- Call duration
- Call timestamp
- Call recording URL (Twilio-hosted)
- Call transcript
- Call status (completed, missed, forwarded)
- Call type (inbound, outbound)

#### **4. Appointment Model** (`src/models/appointment.py`)
Stores appointment bookings:
- Appointment ID (primary key)
- Business ID (foreign key)
- Customer name
- Customer phone
- Customer email
- Appointment date/time
- Service type
- Status (pending, confirmed, cancelled)
- Notes

---

## Current Security Measures

### **✅ What's Already Implemented**

1. **Password Hashing**
   - Passwords are hashed using industry-standard algorithms (likely bcrypt or similar)
   - Never stored in plain text

2. **Session Management**
   - Flask sessions with secret key
   - HTTP-only cookies (prevents JavaScript access)
   - SameSite cookie policy (CSRF protection)

3. **CORS Configuration**
   - Cross-Origin Resource Sharing enabled for API routes
   - Credentials support for authenticated requests

4. **Environment Variables**
   - Sensitive credentials stored in `.env` file (not committed to Git)
   - Secret keys, API keys, database paths

---

## Security Gaps & Recommendations

### **🚨 Critical Issues**

#### **1. Database Location**
**Problem:** Database stored in `/tmp` directory
- `/tmp` is **ephemeral** on Render - data is lost on restart
- No persistence across deployments
- No backups

**Solution:**
```python
# Use persistent storage or cloud database
# Option A: Render Disk Storage (persistent volume)
db_path = os.getenv('DATABASE_PATH', '/opt/render/project/data/app.db')

# Option B: PostgreSQL (recommended for production)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
```

#### **2. No Encryption at Rest**
**Problem:** SQLite database file is not encrypted
- Anyone with file access can read all data
- Call recordings, transcripts, customer info exposed

**Solution:**
```python
# Use SQLCipher for encrypted SQLite
from sqlcipher3 import dbapi2 as sqlite3

# Or migrate to PostgreSQL with encryption
```

#### **3. Call Recordings Stored Externally**
**Problem:** Call recordings hosted on Twilio servers
- You don't control the storage
- Subject to Twilio's retention policies
- Potential compliance issues

**Solution:**
- Download and store recordings on your own encrypted S3 bucket
- Implement automatic deletion after retention period
- Use signed URLs for temporary access

#### **4. No Data Encryption in Transit**
**Problem:** No explicit HTTPS enforcement
- Data can be intercepted in transit

**Solution:**
```python
# Force HTTPS in production
if not app.debug:
    from flask_talisman import Talisman
    Talisman(app, force_https=True)
```

#### **5. No Access Control/Authorization**
**Problem:** No role-based access control (RBAC)
- All authenticated users may have same permissions
- No audit logging

**Solution:**
- Implement user roles (admin, business owner, staff)
- Add permission checks on sensitive routes
- Log all data access and modifications

#### **6. No Input Validation/Sanitization**
**Problem:** Potential SQL injection, XSS vulnerabilities
- User inputs may not be properly validated

**Solution:**
```python
from flask_wtf import FlaskForm
from wtforms import StringField, validators

# Use WTForms for input validation
class BusinessForm(FlaskForm):
    name = StringField('Name', [validators.Length(min=1, max=100)])
    phone = StringField('Phone', [validators.Regexp(r'^\+?1?\d{10,15}$')])
```

---

## Recommended Security Enhancements

### **Priority 1: Data Persistence & Backup**

1. **Migrate to PostgreSQL**
   ```bash
   # Add to requirements.txt
   psycopg2-binary==2.9.9
   
   # Update DATABASE_URL in Render environment
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```

2. **Implement Automated Backups**
   - Daily database backups to S3
   - 30-day retention policy
   - Encrypted backup files

### **Priority 2: Data Encryption**

1. **Encrypt Sensitive Fields**
   ```python
   from cryptography.fernet import Fernet
   
   class Business(db.Model):
       phone_number = db.Column(db.String(20))  # Encrypted
       
       def set_phone(self, phone):
           cipher = Fernet(os.getenv('ENCRYPTION_KEY'))
           self.phone_number = cipher.encrypt(phone.encode()).decode()
   ```

2. **Encrypt Call Transcripts**
   - Store transcripts encrypted
   - Decrypt only when displayed to authorized users

### **Priority 3: Access Control**

1. **Implement RBAC**
   ```python
   from functools import wraps
   
   def require_role(role):
       def decorator(f):
           @wraps(f)
           def decorated_function(*args, **kwargs):
               if current_user.role != role:
                   abort(403)
               return f(*args, **kwargs)
           return decorated_function
       return decorator
   ```

2. **Add Audit Logging**
   ```python
   class AuditLog(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       user_id = db.Column(db.Integer)
       action = db.Column(db.String(50))  # 'view', 'edit', 'delete'
       resource = db.Column(db.String(50))  # 'call', 'business'
       timestamp = db.Column(db.DateTime)
   ```

### **Priority 4: Compliance**

1. **GDPR Compliance**
   - Right to access (export user data)
   - Right to deletion (delete all user data)
   - Data portability
   - Consent management

2. **HIPAA Compliance** (if serving healthcare)
   - BAA with Twilio
   - Encrypted storage
   - Access logs
   - Data retention policies

3. **TCPA Compliance** (for outbound calls)
   - Consent tracking
   - Do Not Call list integration
   - Call time restrictions

---

## Data Retention Policy

### **Recommended Retention Periods**

| Data Type | Retention Period | Reason |
|-----------|------------------|--------|
| Call recordings | 30 days | Legal/compliance, storage costs |
| Call transcripts | 90 days | Customer service, analytics |
| Call metadata | 1 year | Billing, analytics |
| User accounts | Until deletion request | GDPR compliance |
| Audit logs | 2 years | Security, compliance |
| Backups | 30 days | Disaster recovery |

### **Implementation**
```python
from datetime import datetime, timedelta

def cleanup_old_data():
    # Delete call recordings older than 30 days
    cutoff_date = datetime.utcnow() - timedelta(days=30)
    old_calls = Call.query.filter(Call.timestamp < cutoff_date).all()
    
    for call in old_calls:
        # Delete recording from storage
        delete_recording(call.recording_url)
        # Keep metadata but remove recording URL
        call.recording_url = None
        db.session.commit()
```

---

## Security Checklist

### **Before Launch**
- [ ] Migrate from SQLite to PostgreSQL
- [ ] Enable HTTPS/SSL certificates
- [ ] Implement password strength requirements
- [ ] Add rate limiting on API endpoints
- [ ] Enable two-factor authentication (2FA)
- [ ] Encrypt sensitive database fields
- [ ] Set up automated backups
- [ ] Implement audit logging
- [ ] Add CAPTCHA on signup/login
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerts
- [ ] Create incident response plan
- [ ] Draft privacy policy and terms of service
- [ ] Obtain necessary compliance certifications

### **Ongoing**
- [ ] Regular security audits
- [ ] Penetration testing
- [ ] Dependency updates (security patches)
- [ ] Review access logs
- [ ] Test backup restoration
- [ ] Update legal documents
- [ ] Train staff on security practices

---

## Conclusion

**Current State:** Basic security with significant gaps
**Risk Level:** Medium-High (data loss risk, compliance issues)
**Priority Actions:**
1. Migrate to PostgreSQL with persistent storage
2. Implement data encryption
3. Set up automated backups
4. Add access control and audit logging
5. Ensure HTTPS enforcement

**Estimated Time:** 2-3 weeks for full implementation
**Cost:** $50-200/month for PostgreSQL + S3 storage

