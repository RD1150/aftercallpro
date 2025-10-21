# AfterCallPro - AI Call Answering Service

Professional 24/7 AI-powered call answering service for businesses.

## Features

- 🤖 AI-powered call handling with GPT-4
- 📞 Twilio integration for telephony
- 📊 Real-time analytics dashboard
- 💳 Stripe subscription management
- 📧 Email notifications
- 🎨 Sophisticated sage green design
- 🔐 Secure authentication
- 📱 Responsive web interface

## Tech Stack

- **Backend:** Python/Flask
- **Frontend:** React + Vite + Tailwind CSS
- **Database:** SQLite (upgradable to PostgreSQL)
- **AI:** OpenAI GPT-4
- **Telephony:** Twilio
- **Payments:** Stripe

## Deployment to Render

### Prerequisites

- Render account
- Twilio account (for phone calls)
- OpenAI API key (for AI)
- Stripe account (optional, for payments)

### Environment Variables

Set these in Render dashboard:

```
# Required
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
OPENAI_API_KEY=your_openai_key
SECRET_KEY=your_secret_key_here

# Optional
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_password
```

### Deploy Steps

1. Connect this repo to Render
2. Create a new Web Service
3. Build Command: `pip install -r requirements.txt && cd src/frontend && pnpm install && pnpm run build && cd ../.. && cp -r src/frontend/dist/* src/static/`
4. Start Command: `gunicorn -w 4 -b 0.0.0.0:$PORT src.main:app`
5. Add environment variables
6. Deploy!

## Local Development

```bash
# Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 src/main.py

# Frontend
cd src/frontend
pnpm install
pnpm run dev
```

## Documentation

- `AFTERCALLPRO_SETUP_GUIDE.md` - Complete setup instructions
- `TWILIO_SETUP_GUIDE.md` - Twilio configuration
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `business_plan.md` - Business strategy

## License

Private - All Rights Reserved

## Contact

AfterCallPro - AI Call Service

