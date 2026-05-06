"""Generic per-provider integration record.

Stores OAuth tokens + provider config for any third-party CRM/automation
integration (HubSpot first; Pipedrive, Housecall Pro, etc. follow the
same shape). Tokens are encrypted at rest via EncryptedText.
"""

from datetime import datetime
from src.models.user import db
from src.utils.encryption import EncryptedText


class Integration(db.Model):
    __tablename__ = "integrations"

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    provider = db.Column(db.String(50), nullable=False)  # 'hubspot', 'pipedrive', ...

    # OAuth tokens — encrypted because they grant access to the customer's CRM
    access_token = db.Column(EncryptedText, nullable=True)
    refresh_token = db.Column(EncryptedText, nullable=True)
    token_expires_at = db.Column(db.DateTime, nullable=True)

    # Provider-side identifiers
    provider_account_id = db.Column(db.String(200), nullable=True)  # e.g. HubSpot hub_id
    scopes = db.Column(db.Text, nullable=True)

    # Per-provider config (default pipeline id, field mappings, etc.) as JSON
    settings = db.Column(db.JSON, nullable=True)

    enabled = db.Column(db.Boolean, default=True, nullable=False)
    last_sync_at = db.Column(db.DateTime, nullable=True)
    last_error = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    business = db.relationship("Business", backref="integrations")

    __table_args__ = (
        db.UniqueConstraint("business_id", "provider", name="uq_integration_business_provider"),
    )

    def to_public_dict(self):
        """Public-safe representation — never leaks tokens."""
        return {
            "id": self.id,
            "provider": self.provider,
            "enabled": self.enabled,
            "provider_account_id": self.provider_account_id,
            "scopes": self.scopes,
            "last_sync_at": self.last_sync_at.isoformat() if self.last_sync_at else None,
            "last_error": self.last_error,
            "connected_at": self.created_at.isoformat() if self.created_at else None,
        }
