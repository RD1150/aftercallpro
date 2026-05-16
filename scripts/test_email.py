"""Diagnose why outbound email stopped working.

Run this in the Render Shell (Render dashboard -> AfterCallPro -> Shell),
where the SMTP_* env vars are present:

    PYTHONPATH=. python3 scripts/test_email.py
    PYTHONPATH=. python3 scripts/test_email.py you@example.com   # also send a test

It walks the SMTP send one step at a time -- connect, STARTTLS, login, send --
and reports exactly which step fails, so we know if it's a network block
(Render egress), a TLS problem, or bad credentials.
"""

import os
import smtplib
import ssl
import sys
from email.mime.text import MIMEText


def main():
    # email_service.py reads SMTP_SERVER; render.yaml declares SMTP_HOST. Show both.
    server_var = os.getenv("SMTP_SERVER")
    host_var = os.getenv("SMTP_HOST")
    host = server_var or host_var or "smtp.gmail.com"
    port = int(os.getenv("SMTP_PORT", "587"))
    username = os.getenv("SMTP_USERNAME")
    password = os.getenv("SMTP_PASSWORD")
    from_email = os.getenv("FROM_EMAIL", "noreply@aftercallpro.com")

    print("=== SMTP config ===")
    print(f"SMTP_SERVER  : {server_var!r}")
    print(f"SMTP_HOST    : {host_var!r}")
    print(f"-> using host: {host}")
    print(f"SMTP_PORT    : {port}")
    print(f"SMTP_USERNAME: {username!r}")
    print(f"SMTP_PASSWORD: {'set, length ' + str(len(password)) if password else 'MISSING'}")
    print(f"FROM_EMAIL   : {from_email!r}")

    if not username or not password:
        print("\nFAIL: SMTP_USERNAME / SMTP_PASSWORD not set on this environment.")
        return

    # Port 465 = implicit TLS (SMTPS); 587/25 = plaintext then STARTTLS.
    use_ssl = port == 465
    print(f"\n=== Step 1: {'SMTPS' if use_ssl else 'TCP'} connect to {host}:{port} ===")
    try:
        if use_ssl:
            server = smtplib.SMTP_SSL(host, port, timeout=20, context=ssl.create_default_context())
        else:
            server = smtplib.SMTP(host, port, timeout=20)
        print("OK: connection established")
    except Exception as e:
        print(f"FAIL at connect: {type(e).__name__}: {e}")
        print(">>> Network-level block (Render egress / firewall). SMTP can't")
        print(">>> leave the box at all. Fix = switch to an email API (HTTPS).")
        return

    try:
        if use_ssl:
            print("\n=== Step 2: STARTTLS (skipped - port 465 is already TLS) ===")
        else:
            print("\n=== Step 2: STARTTLS ===")
            server.starttls(context=ssl.create_default_context())
        print("OK: TLS negotiated")

        print("\n=== Step 3: login ===")
        server.login(username, password)
        print("OK: authenticated")

        recipient = sys.argv[1] if len(sys.argv) > 1 else username
        print(f"\n=== Step 4: send test email to {recipient} ===")
        msg = MIMEText("AfterCallPro SMTP diagnostic - if you received this, email works.")
        msg["Subject"] = "AfterCallPro SMTP test"
        msg["From"] = from_email
        msg["To"] = recipient
        server.send_message(msg)
        print("OK: test email accepted by server")
        print(f"\nSUCCESS - SMTP works end to end. Check {recipient}'s inbox.")
    except smtplib.SMTPAuthenticationError as e:
        print(f"FAIL at login: {e}")
        print(">>> Credentials rejected. For Gmail you need an APP PASSWORD")
        print(">>> (not the account password), with 2-step verification on.")
        print(">>> Regenerate the app password and update SMTP_PASSWORD on Render.")
    except smtplib.SMTPServerDisconnected as e:
        print(f"FAIL: server disconnected: {e}")
        print(">>> This is the 'Connection unexpectedly closed' error.")
        print(">>> The server dropped the connection mid-handshake -- almost")
        print(">>> always Render blocking SMTP egress, or the provider")
        print(">>> rejecting the IP. Fix = switch to an email API (HTTPS).")
    except Exception as e:
        print(f"FAIL: {type(e).__name__}: {e}")
    finally:
        try:
            server.quit()
        except Exception:
            pass


if __name__ == "__main__":
    main()
