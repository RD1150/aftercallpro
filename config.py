"""
Production Configuration for AfterCallPro
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    # Flask
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "dev-secret-key-change-in-production")
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    
    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///aftercallpro.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Security
    ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    
    # API Keys
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
    TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
    TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
    
    # AWS S3
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_S3_BUCKET = os.getenv("AWS_S3_BUCKET", "aftercallpro-backups")
    
    # Rate Limiting
    RATELIMIT_STORAGE_URL = os.getenv("RATELIMIT_STORAGE_URL", "memory://")
    
    # Logging
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    FLASK_ENV = "development"

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    FLASK_ENV = "production"
    
    # Enforce HTTPS
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    
    # Security headers
    TALISMAN_FORCE_HTTPS = True
    TALISMAN_STRICT_TRANSPORT_SECURITY = True
    TALISMAN_CONTENT_SECURITY_POLICY = {
        'default-src': "'self'",
        'script-src': "'self' 'unsafe-inline'",
        'style-src': "'self' 'unsafe-inline'"
    }

# Configuration dictionary
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}

def get_config():
    """Get configuration based on environment"""
    env = os.getenv("FLASK_ENV", "development")
    return config.get(env, config["default"])

