"""Encryption utilities for sensitive data at rest.

In production, `ENCRYPTION_KEY` MUST be set to a 32-byte url-safe base64 Fernet
key (generate with `Fernet.generate_key()`). In dev we fall back to deriving a
key from `SECRET_KEY` so local work doesn't break — but we log loudly.

The `EncryptedText` TypeDecorator transparently encrypts on write and decrypts
on read. Existing plaintext rows (from before this column was encrypted) are
detected via the Fernet `gAAAAA` prefix and passed through unchanged on read,
so we don't have to backfill before deploying.
"""

import base64
import logging
import os

from cryptography.fernet import Fernet, InvalidToken
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from sqlalchemy.types import Text, TypeDecorator

logger = logging.getLogger(__name__)

# Fernet ciphertext is url-safe base64 of a token starting with version byte 0x80.
# Encoded, that always begins with "gAAAAA" — useful as a "this is encrypted" sentinel.
_FERNET_PREFIX = "gAAAAA"


class EncryptionManager:
    """Wraps Fernet symmetric encryption."""

    def __init__(self):
        key = os.environ.get("ENCRYPTION_KEY")

        if not key:
            if os.environ.get("FLASK_ENV") == "production":
                raise RuntimeError("ENCRYPTION_KEY environment variable is required in production")
            logger.warning("ENCRYPTION_KEY not set — deriving from SECRET_KEY (dev only)")
            password = (os.environ.get("SECRET_KEY") or "default-secret-key").encode()
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=b"aftercallpro-salt-2024",
                iterations=100000,
                backend=default_backend(),
            )
            key = base64.urlsafe_b64encode(kdf.derive(password))

        if isinstance(key, str):
            key = key.encode()
        self.cipher = Fernet(key)

    def encrypt(self, plaintext: str) -> str:
        if plaintext is None or plaintext == "":
            return plaintext
        return self.cipher.encrypt(plaintext.encode()).decode()

    def decrypt(self, ciphertext: str) -> str:
        """Decrypt; if the value is legacy plaintext, return it as-is."""
        if ciphertext is None or ciphertext == "":
            return ciphertext
        if not ciphertext.startswith(_FERNET_PREFIX):
            return ciphertext
        try:
            return self.cipher.decrypt(ciphertext.encode()).decode()
        except InvalidToken:
            logger.error("Failed to decrypt field — wrong ENCRYPTION_KEY or corrupted ciphertext")
            return ciphertext


encryption_manager = EncryptionManager()


def encrypt_field(value: str) -> str:
    return encryption_manager.encrypt(value)


def decrypt_field(value: str) -> str:
    return encryption_manager.decrypt(value)


class EncryptedText(TypeDecorator):
    """SQLAlchemy column type that transparently encrypts on write, decrypts on read."""

    impl = Text
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return encryption_manager.encrypt(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return encryption_manager.decrypt(value)

