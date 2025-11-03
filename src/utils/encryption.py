"""
Encryption utilities for sensitive data
"""
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2
from cryptography.hazmat.backends import default_backend
import base64


class EncryptionManager:
    """Manages encryption and decryption of sensitive data"""
    
    def __init__(self):
        # Get encryption key from environment or generate one
        self.encryption_key = os.getenv('ENCRYPTION_KEY')
        if not self.encryption_key:
            # Generate a key from a password (in production, set ENCRYPTION_KEY env var)
            password = os.getenv('SECRET_KEY', 'default-secret-key').encode()
            salt = b'aftercallpro-salt-2024'  # In production, use a random salt stored securely
            kdf = PBKDF2(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=100000,
                backend=default_backend()
            )
            key = base64.urlsafe_b64encode(kdf.derive(password))
            self.encryption_key = key
        
        if isinstance(self.encryption_key, str):
            self.encryption_key = self.encryption_key.encode()
            
        self.cipher = Fernet(self.encryption_key)
    
    def encrypt(self, plaintext: str) -> str:
        """Encrypt a string and return base64 encoded ciphertext"""
        if not plaintext:
            return plaintext
        
        try:
            encrypted = self.cipher.encrypt(plaintext.encode())
            return encrypted.decode()
        except Exception as e:
            print(f"Encryption error: {e}")
            return plaintext  # Fallback to plaintext if encryption fails
    
    def decrypt(self, ciphertext: str) -> str:
        """Decrypt a base64 encoded ciphertext and return plaintext"""
        if not ciphertext:
            return ciphertext
        
        try:
            decrypted = self.cipher.decrypt(ciphertext.encode())
            return decrypted.decode()
        except Exception as e:
            print(f"Decryption error: {e}")
            return ciphertext  # Fallback to returning as-is if decryption fails


# Global encryption manager instance
encryption_manager = EncryptionManager()


def encrypt_field(value: str) -> str:
    """Convenience function to encrypt a field"""
    return encryption_manager.encrypt(value)


def decrypt_field(value: str) -> str:
    """Convenience function to decrypt a field"""
    return encryption_manager.decrypt(value)

