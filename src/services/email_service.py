import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

class EmailService:
    """Service for sending email notifications"""
    
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
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
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
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
        subject = f"New Call from {call.caller_number}"
        
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
                        <p><strong>Caller:</strong> {call.caller_number}</p>
                        <p><strong>Time:</strong> {call.timestamp.strftime('%B %d, %Y at %I:%M %p')}</p>
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
        
        Caller: {call.caller_number}
        Time: {call.timestamp.strftime('%B %d, %Y at %I:%M %p')}
        Duration: {call.duration} seconds
        Status: {call.status}
        
        Transcript:
        {call.transcript or 'No transcript available'}
        
        View full details: https://aftercallpro.com/calls
        """
        
        return self.send_email(business.email, subject, html_body, text_body)
    
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
                <td>{call.caller_number}</td>
                <td>{call.timestamp.strftime('%I:%M %p')}</td>
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

