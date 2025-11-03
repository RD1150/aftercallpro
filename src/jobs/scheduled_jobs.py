"""
Scheduled jobs for backups, cleanup, and maintenance
Run this script with cron or a task scheduler
"""
import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from src.utils.backup import BackupManager, cleanup_old_call_recordings, cleanup_old_transcripts
from src.utils.gdpr import GDPRManager
from datetime import datetime


def daily_backup():
    """Run daily database backup"""
    print(f"\n{'='*50}")
    print(f"Daily Backup Job - {datetime.utcnow().isoformat()}")
    print(f"{'='*50}\n")
    
    backup_manager = BackupManager()
    success = backup_manager.perform_full_backup()
    
    if success:
        print("✅ Daily backup completed successfully")
    else:
        print("❌ Daily backup failed")
    
    return success


def weekly_cleanup():
    """Run weekly data cleanup"""
    print(f"\n{'='*50}")
    print(f"Weekly Cleanup Job - {datetime.utcnow().isoformat()}")
    print(f"{'='*50}\n")
    
    # Cleanup old call recordings (30 days)
    print("Cleaning up old call recordings...")
    recordings_deleted = cleanup_old_call_recordings(retention_days=30)
    print(f"✅ Deleted {recordings_deleted} old call recordings")
    
    # Cleanup old transcripts (90 days)
    print("\nCleaning up old call transcripts...")
    transcripts_deleted = cleanup_old_transcripts(retention_days=90)
    print(f"✅ Deleted {transcripts_deleted} old call transcripts")
    
    print("\n✅ Weekly cleanup completed successfully")


def monthly_anonymization():
    """Run monthly data anonymization for old records"""
    print(f"\n{'='*50}")
    print(f"Monthly Anonymization Job - {datetime.utcnow().isoformat()}")
    print(f"{'='*50}\n")
    
    gdpr_manager = GDPRManager()
    success, message = gdpr_manager.anonymize_old_data(days_old=365)
    
    if success:
        print(f"✅ {message}")
    else:
        print(f"❌ Anonymization failed: {message}")
    
    return success


def run_all_jobs():
    """Run all scheduled jobs (for testing)"""
    print(f"\n{'='*60}")
    print(f"Running All Scheduled Jobs - {datetime.utcnow().isoformat()}")
    print(f"{'='*60}\n")
    
    daily_backup()
    weekly_cleanup()
    monthly_anonymization()
    
    print(f"\n{'='*60}")
    print("All jobs completed")
    print(f"{'='*60}\n")


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Run scheduled maintenance jobs')
    parser.add_argument('--job', choices=['backup', 'cleanup', 'anonymize', 'all'], 
                       default='all', help='Job to run')
    
    args = parser.parse_args()
    
    if args.job == 'backup':
        daily_backup()
    elif args.job == 'cleanup':
        weekly_cleanup()
    elif args.job == 'anonymize':
        monthly_anonymization()
    else:
        run_all_jobs()

