import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from src.models.user import db
from src.models.call import Business, Call
from src.routes.user import user_bp
from src.routes.voice import voice_bp
from src.routes.business import business_bp
from src.routes.auth import auth_bp
from src.routes.payments import payments_bp

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Enable CORS for API routes with credentials support
CORS(app, resources={r"/api/*": {"origins": "*", "supports_credentials": True}})

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(voice_bp, url_prefix='/api/voice')
app.register_blueprint(business_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(payments_bp, url_prefix='/api/payments')

# Database configuration
# Use /tmp for database on Render (writable directory)
db_path = os.getenv('DATABASE_PATH', os.path.join('/tmp', 'app.db'))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
    app.run(host='0.0.0.0', port=5000, debug=True)

