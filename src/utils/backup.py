"""
Backup and data retention utilities
"""
import os
import subprocess
from datetime import datetime, timedelta
import boto3
from botocore.exceptions import ClientError


class BackupManager:
    """Manages database backups and data retention"""
    
    def __init__(self):
        self.s3_client = None
        self.s3_bucket = os.getenv('BACKUP_S3_BUCKET')
        self.aws_access_key = os.getenv('AWS_ACCESS_KEY_ID')
        self.aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        self.aws_region = os.getenv('AWS_REGION', 'us-east-1')
        
        if self.aws_access_key and self.aws_secret_key:
            self.s3_client = boto3.client(
                's3',
                aws_access_key_id=self.aws_access_key,
                aws_secret_access_key=self.aws_secret_key,
                region_name=self.aws_region
            )
    
    def create_database_backup(self):
        """
        Create a backup of the PostgreSQL database
        Returns the backup file path or None if failed
        """
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            print("DATABASE_URL not set, skipping backup")
            return None
        
        # Generate backup filename with timestamp
        timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
        backup_filename = f'aftercallpro_backup_{timestamp}.sql'
        backup_path = f'/tmp/{backup_filename}'
        
        try:
            # Use pg_dump to create backup
            # Parse DATABASE_URL to get connection details
            # Format: postgresql://user:password@host:port/dbname
            if database_url.startswith('postgres://'):
                database_url = database_url.replace('postgres://', 'postgresql://', 1)
            
            # Run pg_dump
            result = subprocess.run(
                ['pg_dump', database_url, '-f', backup_path],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                print(f"Database backup created: {backup_path}")
                return backup_path
            else:
                print(f"Backup failed: {result.stderr}")
                return None
        
        except Exception as e:
            print(f"Error creating backup: {e}")
            return None
    
    def upload_backup_to_s3(self, backup_path):
        """
        Upload backup file to S3
        Returns True if successful, False otherwise
        """
        if not self.s3_client or not self.s3_bucket:
            print("S3 not configured, skipping upload")
            return False
        
        try:
            filename = os.path.basename(backup_path)
            s3_key = f'backups/{filename}'
            
            self.s3_client.upload_file(
                backup_path,
                self.s3_bucket,
                s3_key,
                ExtraArgs={'ServerSideEncryption': 'AES256'}  # Encrypt at rest
            )
            
            print(f"Backup uploaded to S3: s3://{self.s3_bucket}/{s3_key}")
            
            # Delete local backup file after successful upload
            os.remove(backup_path)
            
            return True
        
        except ClientError as e:
            print(f"Error uploading to S3: {e}")
            return False
    
    def cleanup_old_backups(self, retention_days=30):
        """
        Delete backups older than retention_days from S3
        """
        if not self.s3_client or not self.s3_bucket:
            print("S3 not configured, skipping cleanup")
            return
        
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=retention_days)
            
            # List all backups
            response = self.s3_client.list_objects_v2(
                Bucket=self.s3_bucket,
                Prefix='backups/'
            )
            
            if 'Contents' not in response:
                print("No backups found")
                return
            
            deleted_count = 0
            for obj in response['Contents']:
                if obj['LastModified'].replace(tzinfo=None) < cutoff_date:
                    self.s3_client.delete_object(
                        Bucket=self.s3_bucket,
                        Key=obj['Key']
                    )
                    deleted_count += 1
                    print(f"Deleted old backup: {obj['Key']}")
            
            print(f"Cleaned up {deleted_count} old backups")
        
        except ClientError as e:
            print(f"Error cleaning up backups: {e}")
    
    def perform_full_backup(self):
        """
        Perform a full backup: create, upload, and cleanup
        """
        print("Starting database backup...")
        
        # Create backup
        backup_path = self.create_database_backup()
        if not backup_path:
            print("Backup creation failed")
            return False
        
        # Upload to S3
        if self.upload_backup_to_s3(backup_path):
            print("Backup uploaded successfully")
        else:
            print("Backup upload failed, keeping local copy")
        
        # Cleanup old backups
        self.cleanup_old_backups()
        
        return True


def cleanup_old_call_recordings(retention_days=30):
    """
    Delete call recordings older than retention_days
    This should be run as a scheduled job
    """
    from src.models.call import Call
    from src.models.user import db
    from datetime import datetime, timedelta
    
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=retention_days)
        
        # Find old calls with recordings
        old_calls = Call.query.filter(
            Call.timestamp < cutoff_date,
            Call.recording_url.isnot(None)
        ).all()
        
        deleted_count = 0
        for call in old_calls:
            # TODO: Delete recording from Twilio or S3
            # For now, just remove the URL reference
            call.recording_url = None
            deleted_count += 1
        
        db.session.commit()
        print(f"Cleaned up {deleted_count} old call recordings")
        
        return deleted_count
    
    except Exception as e:
        print(f"Error cleaning up call recordings: {e}")
        db.session.rollback()
        return 0


def cleanup_old_transcripts(retention_days=90):
    """
    Delete call transcripts older than retention_days
    """
    from src.models.call import Call
    from src.models.user import db
    from datetime import datetime, timedelta
    
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=retention_days)
        
        # Find old calls with transcripts
        old_calls = Call.query.filter(
            Call.timestamp < cutoff_date,
            Call.transcript.isnot(None)
        ).all()
        
        deleted_count = 0
        for call in old_calls:
            call.transcript = None
            deleted_count += 1
        
        db.session.commit()
        print(f"Cleaned up {deleted_count} old call transcripts")
        
        return deleted_count
    
    except Exception as e:
        print(f"Error cleaning up call transcripts: {e}")
        db.session.rollback()
        return 0

