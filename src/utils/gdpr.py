"""
GDPR compliance utilities for data export and deletion
"""
import json
from datetime import datetime
from src.models.user import User, db
from src.models.call import Business, Call
from src.models.audit import AuditLog


class GDPRManager:
    """Manages GDPR compliance operations"""
    
    @staticmethod
    def export_user_data(user_id):
        """
        Export all user data in machine-readable format (GDPR Right to Access)
        Returns a dictionary with all user data
        """
        user = User.query.get(user_id)
        if not user:
            return None
        
        # Collect all user data
        data = {
            'export_date': datetime.utcnow().isoformat(),
            'user_profile': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role,
                'created_at': user.created_at.isoformat() if user.created_at else None,
                'last_login': user.last_login.isoformat() if user.last_login else None,
                'two_factor_enabled': user.two_factor_enabled,
                'data_processing_consent': user.data_processing_consent,
                'marketing_consent': user.marketing_consent,
                'consent_date': user.consent_date.isoformat() if user.consent_date else None
            },
            'businesses': [],
            'calls': [],
            'audit_logs': []
        }
        
        # Get businesses owned by user (if applicable)
        # Assuming there's a relationship or owner_id field
        # For now, we'll skip this if not implemented
        
        # Get audit logs for this user
        audit_logs = AuditLog.query.filter_by(user_id=user_id).all()
        data['audit_logs'] = [log.to_dict() for log in audit_logs]
        
        return data
    
    @staticmethod
    def export_business_data(business_id):
        """
        Export all business data including calls and appointments
        """
        business = Business.query.get(business_id)
        if not business:
            return None
        
        data = {
            'export_date': datetime.utcnow().isoformat(),
            'business_profile': {
                'id': business.id,
                'name': business.name,
                'phone_number': business.phone_number,
                'email': business.email,
                'greeting_message': business.greeting_message,
                'subscription_tier': business.subscription_tier,
                'created_at': business.created_at.isoformat() if hasattr(business, 'created_at') and business.created_at else None
            },
            'calls': [],
            'appointments': []
        }
        
        # Get all calls for this business
        calls = Call.query.filter_by(business_id=business_id).all()
        for call in calls:
            data['calls'].append({
                'id': call.id,
                'caller_number': call.caller_number,
                'duration': call.duration,
                'timestamp': call.timestamp.isoformat() if call.timestamp else None,
                'status': call.status if hasattr(call, 'status') else None,
                'transcript': call.transcript if hasattr(call, 'transcript') else None
            })
        
        # Get all appointments for this business
        # TODO: Add appointment export when model is available
        
        return data
    
    @staticmethod
    def delete_user_data(user_id, keep_audit_logs=True):
        """
        Delete all user data (GDPR Right to Erasure)
        
        Args:
            user_id: ID of the user to delete
            keep_audit_logs: Whether to keep audit logs for legal compliance
        
        Returns:
            (success, message)
        """
        try:
            user = User.query.get(user_id)
            if not user:
                return False, "User not found"
            
            # Log the deletion request
            from src.models.audit import log_action
            log_action(
                user_id=user_id,
                action='data_deletion_requested',
                resource_type='user',
                resource_id=str(user_id),
                details='GDPR Right to Erasure'
            )
            
            # Delete or anonymize related data
            # For audit logs, we might want to keep them but anonymize
            if not keep_audit_logs:
                AuditLog.query.filter_by(user_id=user_id).delete()
            else:
                # Anonymize audit logs instead of deleting
                audit_logs = AuditLog.query.filter_by(user_id=user_id).all()
                for log in audit_logs:
                    log.user_id = None  # Anonymize
            
            # Delete user account
            db.session.delete(user)
            db.session.commit()
            
            return True, "User data deleted successfully"
        
        except Exception as e:
            db.session.rollback()
            return False, f"Error deleting user data: {str(e)}"
    
    @staticmethod
    def delete_business_data(business_id):
        """
        Delete all business data including calls and appointments
        """
        try:
            business = Business.query.get(business_id)
            if not business:
                return False, "Business not found"
            
            # Delete all calls
            Call.query.filter_by(business_id=business_id).delete()
            
            # Delete all appointments
            # TODO: Add when appointment model is available
            
            # Delete business
            db.session.delete(business)
            db.session.commit()
            
            return True, "Business data deleted successfully"
        
        except Exception as e:
            db.session.rollback()
            return False, f"Error deleting business data: {str(e)}"
    
    @staticmethod
    def anonymize_old_data(days_old=365):
        """
        Anonymize data older than specified days for privacy
        """
        from datetime import timedelta
        
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=days_old)
            
            # Anonymize old calls
            old_calls = Call.query.filter(Call.timestamp < cutoff_date).all()
            for call in old_calls:
                if hasattr(call, 'caller_number'):
                    # Anonymize phone number (keep last 4 digits)
                    if call.caller_number and len(call.caller_number) > 4:
                        call.caller_number = 'XXX-XXX-' + call.caller_number[-4:]
                
                # Remove transcript but keep metadata
                if hasattr(call, 'transcript'):
                    call.transcript = '[Anonymized]'
            
            db.session.commit()
            return True, f"Anonymized {len(old_calls)} old calls"
        
        except Exception as e:
            db.session.rollback()
            return False, f"Error anonymizing data: {str(e)}"
    
    @staticmethod
    def record_consent(user_id, consent_type, granted=True):
        """
        Record user consent for data processing
        
        Args:
            user_id: ID of the user
            consent_type: Type of consent ('data_processing', 'marketing')
            granted: Whether consent was granted or revoked
        """
        try:
            user = User.query.get(user_id)
            if not user:
                return False, "User not found"
            
            if consent_type == 'data_processing':
                user.data_processing_consent = granted
            elif consent_type == 'marketing':
                user.marketing_consent = granted
            else:
                return False, "Invalid consent type"
            
            user.consent_date = datetime.utcnow()
            
            # Log the consent action
            from src.models.audit import log_action
            log_action(
                user_id=user_id,
                action='consent_updated',
                resource_type='user',
                resource_id=str(user_id),
                details=f'{consent_type}: {granted}'
            )
            
            db.session.commit()
            return True, "Consent recorded successfully"
        
        except Exception as e:
            db.session.rollback()
            return False, f"Error recording consent: {str(e)}"

