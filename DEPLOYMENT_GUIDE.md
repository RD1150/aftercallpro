# AfterCallPro Production Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file with your production credentials:

```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env
```

### 2. Database Setup (PostgreSQL)

**On Render.com:**
1. Create a new PostgreSQL database
2. Copy the "Internal Database URL"
3. Add to `.env` as `DATABASE_URL`

**Initialize tables:**
```bash
python init_db.py
```

### 3. Generate Encryption Key

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Add the output to `.env` as `ENCRYPTION_KEY`

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run Locally (Testing)

```bash
python app.py
```

### 6. Deploy to Production

**Render.com deployment:**
- The `render.yaml` file is already configured
- Push to GitHub
- Render will auto-deploy

**Environment variables to set in Render:**
- `OPENAI_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `FLASK_SECRET_KEY`
- `ENCRYPTION_KEY`
- `JWT_SECRET_KEY`
- `DATABASE_URL` (auto-set by Render)
- `FLASK_ENV=production`

---

## 🔒 Security Checklist

### Before Going Live:

- [ ] PostgreSQL database provisioned
- [ ] Encryption key generated and set
- [ ] All API keys in environment variables (not code)
- [ ] HTTPS enforced (Render does this automatically)
- [ ] Rate limiting enabled
- [ ] Database backups configured
- [ ] Error logging set up

---

## 📞 Twilio Configuration

### 1. Buy a Phone Number
- Go to Twilio Console → Phone Numbers
- Buy a number with Voice capabilities

### 2. Configure Webhooks
Set these URLs in your Twilio number settings:

**Voice:**
- **A Call Comes In:** `https://your-app.onrender.com/voice` (HTTP POST)
- **Call Status Changes:** `https://your-app.onrender.com/status` (HTTP POST)

**Messaging:**
- **A Message Comes In:** `https://your-app.onrender.com/sms` (HTTP POST)

**Fallback:**
- **Primary Handler Fails:** `https://your-app.onrender.com/fallback` (HTTP POST)

---

## 🧪 Testing

### Test Voice Call:
1. Call your Twilio number
2. AI should greet you and start conversation
3. Try booking an appointment
4. Check logs for conversation history

### Test SMS:
1. Send SMS to your Twilio number
2. Should receive auto-reply

### Test API:
```bash
curl https://your-app.onrender.com/status
```

---

## 📊 Monitoring

### Check Logs:
```bash
# On Render
View logs in Render dashboard

# Locally
tail -f app.log
```

### Database Queries:
```python
from models import db, Conversation, Lead
from app import app

with app.app_context():
    # Get all conversations
    conversations = Conversation.query.all()
    
    # Get all leads
    leads = Lead.query.all()
    
    # Get recent calls
    recent = Conversation.query.order_by(Conversation.started_at.desc()).limit(10).all()
```

---

## 🔧 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'flask_jwt_extended'"
**Fix:** Run `pip install -r requirements.txt`

### Issue: "OpenAI API error"
**Fix:** Check `OPENAI_API_KEY` is set correctly

### Issue: "Database connection failed"
**Fix:** Verify `DATABASE_URL` format: `postgresql://user:pass@host:5432/dbname`

### Issue: "Twilio webhook not working"
**Fix:** 
1. Check webhook URLs in Twilio console
2. Ensure app is deployed and accessible
3. Check Twilio debugger for error details

---

## 📈 Scaling

### Performance Tips:
1. **Use Gunicorn** (already configured in `render.yaml`)
2. **Add Redis** for session storage and rate limiting
3. **Enable caching** for frequent API calls
4. **Database indexing** on frequently queried fields
5. **CDN** for static assets

### Cost Optimization:
- **OpenAI:** Use GPT-3.5-turbo instead of GPT-4 for lower costs
- **Twilio:** Monitor usage, set alerts
- **Database:** Regular cleanup of old conversations

---

## 🆘 Support

For issues:
1. Check logs first
2. Review Twilio debugger
3. Test API endpoints manually
4. Contact: hello@mindrocket.app

---

## 📝 Next Steps

After successful deployment:
1. ✅ Test with real calls
2. ✅ Train AI with business-specific information
3. ✅ Set up customer dashboard
4. ✅ Configure email notifications
5. ✅ Add analytics tracking
6. ✅ Implement appointment booking integration
7. ✅ Set up automated backups

---

**Last Updated:** November 2025  
**Version:** 1.0.0

