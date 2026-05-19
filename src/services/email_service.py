import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

class EmailService:
    """Service for sending email notifications"""
    
    def __init__(self):
        # render.yaml declares SMTP_HOST; older config used SMTP_SERVER. Accept either.
        self.smtp_server = os.getenv('SMTP_HOST') or os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('FROM_EMAIL', 'noreply@aftercallpro.com')
        self.from_name = 'AfterCallPro'
    
    def send_email(self, to_email, subject, html_body, text_body=None):
        """Send an email"""
        if not self.smtp_username or not self.smtp_password:
            print("Email credentials not configured, skipping email send")
            return False
        
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = to_email
            
            # Add text and HTML parts
            if text_body:
                part1 = MIMEText(text_body, 'plain')
                msg.attach(part1)
            
            part2 = MIMEText(html_body, 'html')
            msg.attach(part2)
            
            # Send email. Port 465 is implicit TLS (SMTPS) -> SMTP_SSL;
            # 587/25 are plaintext-then-STARTTLS. Using the wrong one hangs
            # the connection until timeout ("Connection unexpectedly closed").
            context = ssl.create_default_context()
            if self.smtp_port == 465:
                with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port, context=context) as server:
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls(context=context)
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)

            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    def send_monthly_roi(self, business, period_label, data):
        """Send the monthly 'here's what AfterCallPro caught for you' recap."""
        base_url = os.environ.get('APP_BASE_URL', 'https://aftercallpro.com').rstrip('/')
        subject = f"Your {period_label} recap — AfterCallPro caught {data['calls_answered']} calls"

        if data.get('estimated_value') is not None:
            appts = data['appointments_booked']
            value_block = (
                f"<p style='font-size:30px;font-weight:800;color:#16a34a;margin:0'>"
                f"${data['estimated_value']:,}</p>"
                f"<p style='font-size:13px;color:#64748b;margin:4px 0 0'>"
                f"estimated booked value — {appts} appointment{'' if appts == 1 else 's'} "
                f"&times; ${data['avg_job_value']:,} avg job</p>"
            )
        else:
            value_block = (
                "<p style='font-size:13px;color:#64748b;margin:0'>"
                "Set your average job value in the dashboard to see the estimated "
                "revenue this represents.</p>"
            )

        def tile(num, label):
            return (
                "<td width='25%' style='padding:6px'>"
                "<div style='background:#f8fafc;border-radius:10px;padding:16px 8px;text-align:center'>"
                f"<div style='font-size:26px;font-weight:700;color:#2563eb'>{num}</div>"
                f"<div style='font-size:11px;color:#64748b;margin-top:4px'>{label}</div>"
                "</div></td>"
            )

        html_body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
          <div style="background:#0f172a;color:#fff;padding:24px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;font-size:20px">What AfterCallPro caught for you</h2>
            <p style="margin:4px 0 0;color:#94a3b8;font-size:14px">{period_label}</p>
          </div>
          <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 12px 12px">
            <p style="margin:0 0 16px">Hi {business.name}, here's what your AI receptionist handled last month:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate">
              <tr>
                {tile(data['calls_answered'], 'Calls answered')}
                {tile(data['after_hours_calls'], 'After-hours caught')}
                {tile(data['leads_captured'], 'Leads captured')}
                {tile(data['appointments_booked'], 'Appointments booked')}
              </tr>
            </table>
            <div style="border-top:1px solid #f1f5f9;margin-top:20px;padding-top:20px">
              {value_block}
            </div>
            <div style="text-align:center;margin-top:24px">
              <a href="{base_url}/dashboard" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600">View your dashboard</a>
            </div>
          </div>
          <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px">AfterCallPro — your 24/7 AI receptionist</p>
        </div>
        """

        text_body = (
            f"What AfterCallPro caught for you — {period_label}\n\n"
            f"Calls answered: {data['calls_answered']}\n"
            f"After-hours calls caught: {data['after_hours_calls']}\n"
            f"Leads captured: {data['leads_captured']}\n"
            f"Appointments booked: {data['appointments_booked']}\n\n"
            f"View your dashboard: {base_url}/dashboard\n"
        )

        return self.send_email(business.email, subject, html_body, text_body)

    def send_welcome_email(self, business):
        """Send welcome email to new customer"""
        subject = "Welcome to AfterCallPro! 🎉"
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
                .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to AfterCallPro!</h1>
                    <p>Your 24/7 AI Call Assistant is Ready</p>
                </div>
                <div class="content">
                    <h2>Hi {business.name}! 👋</h2>
                    <p>Thank you for choosing AfterCallPro. Your AI assistant is now set up and ready to handle calls for your business.</p>
                    
                    <h3>Your Account Details:</h3>
                    <ul>
                        <li><strong>Business Name:</strong> {business.name}</li>
                        <li><strong>Phone Number:</strong> {business.phone_number}</li>
                        <li><strong>Plan:</strong> {business.subscription_tier.title()}</li>
                        <li><strong>Monthly Minutes:</strong> {business.monthly_minutes_limit}</li>
                    </ul>
                    
                    <h3>Next Steps:</h3>
                    <ol>
                        <li>Customize your AI greeting in Settings</li>
                        <li>Configure your business hours</li>
                        <li>Make a test call to your number</li>
                        <li>Review the call transcript in your dashboard</li>
                    </ol>
                    
                    <a href="https://aftercallpro.com" class="button">Go to Dashboard</a>
                    
                    <p>If you have any questions, just reply to this email. We're here to help!</p>
                    
                    <p>Best regards,<br>The AfterCallPro Team</p>
                </div>
                <div class="footer">
                    <p>© 2025 AfterCallPro. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_body = f"""
        Welcome to AfterCallPro!
        
        Hi {business.name},
        
        Thank you for choosing AfterCallPro. Your AI assistant is now set up and ready to handle calls for your business.
        
        Your Account Details:
        - Business Name: {business.name}
        - Phone Number: {business.phone_number}
        - Plan: {business.subscription_tier.title()}
        - Monthly Minutes: {business.monthly_minutes_limit}
        
        Next Steps:
        1. Customize your AI greeting in Settings
        2. Configure your business hours
        3. Make a test call to your number
        4. Review the call transcript in your dashboard
        
        Visit your dashboard: https://aftercallpro.com
        
        If you have any questions, just reply to this email.
        
        Best regards,
        The AfterCallPro Team
        """
        
        return self.send_email(business.email, subject, html_body, text_body)
    
    def send_new_call_notification(self, business, call):
        """Send notification about a new call"""
        subject = f"New Call from {call.from_number}"
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
                .call-details {{ background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }}
                .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>📞 New Call Received</h2>
                </div>
                <div class="content">
                    <div class="call-details">
                        <p><strong>Caller:</strong> {call.from_number}</p>
                        <p><strong>Time:</strong> {call.started_at.strftime('%B %d, %Y at %I:%M %p')}</p>
                        <p><strong>Duration:</strong> {call.duration} seconds</p>
                        <p><strong>Status:</strong> {call.status}</p>
                    </div>
                    
                    <h3>Transcript:</h3>
                    <p style="background: white; padding: 15px; border-radius: 5px; white-space: pre-wrap;">{call.transcript or 'No transcript available'}</p>
                    
                    <a href="https://aftercallpro.com/calls" class="button">View Full Details</a>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_body = f"""
        New Call Received
        
        Caller: {call.from_number}
        Time: {call.started_at.strftime('%B %d, %Y at %I:%M %p')}
        Duration: {call.duration} seconds
        Status: {call.status}
        
        Transcript:
        {call.transcript or 'No transcript available'}
        
        View full details: https://aftercallpro.com/calls
        """
        
        return self.send_email(business.email, subject, html_body, text_body)
    
    def send_password_reset(self, user, reset_url):
        """Send password reset email with a one-time link."""
        subject = "Reset your AfterCallPro password"

        html_body = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2>Reset your password</h2>
                <p>We received a request to reset the password for {user.email}.</p>
                <p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
                <p>
                    <a href="{reset_url}" style="display:inline-block; padding:12px 24px; background:#667eea; color:#fff; text-decoration:none; border-radius:6px;">
                        Reset password
                    </a>
                </p>
                <p style="color:#666; font-size:12px;">Or paste this link into your browser:<br>{reset_url}</p>
            </div>
        </body>
        </html>
        """

        text_body = (
            f"Reset your AfterCallPro password\n\n"
            f"We received a request to reset the password for {user.email}.\n"
            f"This link expires in 1 hour.\n\n"
            f"{reset_url}\n\n"
            f"If you didn't request this, you can ignore this email."
        )

        return self.send_email(user.email, subject, html_body, text_body)

    def send_daily_summary(self, business, calls):
        """Send daily summary of calls"""
        subject = f"Daily Call Summary - {datetime.now().strftime('%B %d, %Y')}"
        
        total_calls = len(calls)
        total_duration = sum(call.duration for call in calls)
        avg_duration = total_duration // total_calls if total_calls > 0 else 0
        
        calls_html = ""
        for call in calls[:10]:  # Show up to 10 most recent calls
            calls_html += f"""
            <tr>
                <td>{call.from_number}</td>
                <td>{call.started_at.strftime('%I:%M %p')}</td>
                <td>{call.duration}s</td>
                <td>{call.status}</td>
            </tr>
            """
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
                .stats {{ display: flex; justify-content: space-around; margin: 20px 0; }}
                .stat {{ text-align: center; background: white; padding: 20px; border-radius: 5px; flex: 1; margin: 0 10px; }}
                .stat-number {{ font-size: 32px; font-weight: bold; color: #667eea; }}
                table {{ width: 100%; background: white; border-radius: 5px; margin: 20px 0; }}
                th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
                th {{ background: #667eea; color: white; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>📊 Daily Call Summary</h2>
                    <p>{datetime.now().strftime('%B %d, %Y')}</p>
                </div>
                <div class="content">
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-number">{total_calls}</div>
                            <div>Total Calls</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">{avg_duration}s</div>
                            <div>Avg Duration</div>
                        </div>
                    </div>
                    
                    <h3>Recent Calls:</h3>
                    <table>
                        <tr>
                            <th>Caller</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Status</th>
                        </tr>
                        {calls_html}
                    </table>
                    
                    <a href="https://aftercallpro.com/calls" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">View All Calls</a>
                </div>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(business.email, subject, html_body)

# Global email service instance
email_service = EmailService()

