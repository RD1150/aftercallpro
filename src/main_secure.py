import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, request
from flask_cors import CORS
from dotenv import load_dotenv
from src.models.user import db
from src.models.call import Business, Call
from src.models.audit import AuditLog  # Import audit model
from src.routes.user import user_bp
from src.routes.voice import voice_bp
from src.routes.business import business_bp
from src.routes.auth import auth_bp
from src.routes.payments import payments_bp
from src.routes.appointments import appointments_bp

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Security configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')
app.config['SESSION_COOKIE_SECURE'] = True  # Require HTTPS for cookies
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to cookies
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # CSRF protection
app.config['PERMANENT_SESSION_LIFETIME'] = 3600  # 1 hour session timeout

# Database configuration - PostgreSQL with fallback to SQLite
database_url = os.getenv('DATABASE_URL')
if database_url:
    # PostgreSQL (production)
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_size': 10,
        'pool_recycle': 3600,
        'pool_pre_ping': True,
    }
else:
    # SQLite (development fallback)
    db_path = os.getenv('DATABASE_PATH', os.path.join('/tmp', 'app.db'))
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for API routes with credentials support
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('ALLOWED_ORIGINS', '*').split(','),
        "supports_credentials": True,
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})

# Security headers middleware
@app.after_request
def set_security_headers(response):
    """Add security headers to all responses"""
    # Prevent clickjacking
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    
    # Prevent MIME type sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Enable XSS protection
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    # Referrer policy
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    
    # Content Security Policy
    if not app.debug:
        response.headers['Content-Security-Policy'] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://js.stripe.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https:; "
            "connect-src 'self' https://api.stripe.com;"
        )
    
    # HSTS (HTTP Strict Transport Security) - only in production
    if not app.debug and request.is_secure:
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    return response

# Rate limiting setup
try:
    from flask_limiter import Limiter
    from flask_limiter.util import get_remote_address
    
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        default_limits=["200 per day", "50 per hour"],
        storage_uri=os.getenv('REDIS_URL', 'memory://')
    )
    
    # Apply rate limiting to auth routes
    @limiter.limit("5 per minute")
    def rate_limit_auth():
        pass
    
except ImportError:
    print("flask-limiter not installed, rate limiting disabled")
    limiter = None

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(voice_bp, url_prefix='/api/voice')
app.register_blueprint(business_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(payments_bp, url_prefix='/api/payments')
app.register_blueprint(appointments_bp, url_prefix='/api/appointments')

# Initialize database
db.init_app(app)

# Create all database tables
with app.app_context():
    db.create_all()
    
    # Create a demo business if none exists
    if Business.query.count() == 0:
        demo_business = Business(
            name="Demo Business",
            phone_number="+1234567890",
            email="demo@example.com",
            greeting_message="Thank you for calling Demo Business. Our AI assistant is here to help you 24/7.",
            subscription_tier="pro",
            monthly_minutes_limit=2000
        )
        db.session.add(demo_business)
        db.session.commit()
        print("Demo business created successfully!")

# Privacy policy route
@app.route('/privacy')
def privacy():
    return send_from_directory(app.static_folder, 'privacy.html')

# Terms of service route
@app.route('/terms')
def terms():
    return send_from_directory(app.static_folder, 'terms.html')

# Health check endpoint
@app.route('/health')
def health():
    return {'status': 'healthy', 'timestamp': os.popen('date').read().strip()}

# Serve React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    # Force HTTPS in production
    if not app.debug:
        try:
            from flask_talisman import Talisman
            Talisman(app, force_https=True)
        except ImportError:
            print("flask-talisman not installed, HTTPS enforcement disabled")
    
    app.run(host='0.0.0.0', port=5000, debug=True)

