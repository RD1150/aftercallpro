"""Email each active business its previous calendar month's ROI summary.

Run once a month — e.g. a Render Cron Job on the 1st of each month:
    PYTHONPATH=. python3 scripts/send_monthly_summaries.py

Businesses with no calls last month are skipped (no all-zeros email).
"""

import os
import sys
from datetime import datetime, timedelta

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.call import Business
from src.routes.analytics import compute_roi
from src.services.email_service import email_service


def main():
    with app.app_context():
        now = datetime.utcnow()
        this_month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        # First day of the previous calendar month.
        last_month_start = (this_month_start - timedelta(days=1)).replace(
            day=1, hour=0, minute=0, second=0, microsecond=0
        )
        period_label = last_month_start.strftime("%B %Y")
        print(f"Monthly ROI summaries for {period_label}\n")

        businesses = Business.query.filter(
            Business.subscription_status.in_(["active", "trialing"])
        ).all()

        sent = skipped = failed = 0
        for biz in businesses:
            if not biz.email:
                skipped += 1
                continue
            data = compute_roi(biz, last_month_start, until=this_month_start)
            # No activity, no email — don't send an all-zeros recap.
            if data["calls_answered"] == 0:
                skipped += 1
                continue
            if email_service.send_monthly_roi(biz, period_label, data):
                sent += 1
                print(f"  sent: {biz.email} ({data['calls_answered']} calls)")
            else:
                failed += 1
                print(f"  FAILED: {biz.email}")

        print(f"\ndone — {sent} sent, {skipped} skipped, {failed} failed")


if __name__ == "__main__":
    main()
