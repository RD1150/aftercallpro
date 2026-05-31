// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthProvider";

// Mirrors backend validate_password_strength (src/utils/security.py)
function validatePassword(pw) {
  if (pw.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(pw)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(pw)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(pw)) return "Password must contain at least one number";
  if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(pw)) return "Password must contain at least one special character";
  return null;
}

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [smsConsent, setSmsConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!smsConsent) {
      setError("Please check the SMS consent box to continue.");
      return;
    }

    const pwError = validatePassword(formData.password);
    if (pwError) {
      setError(pwError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const planParam = searchParams.get("plan") || undefined;
      const res = await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.phone_number,
        planParam
      );

      if (!res?.success) {
        setError("Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // Record SMS consent linked to the new business so STOP/UNSUBSCRIBE works
      // and we have an audit trail for carrier compliance.
      if (smsConsent && res.business?.id) {
        try {
          await fetch("/api/sms/opt-in", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: formData.phone_number,
              business_id: res.business.id,
              source: "signup_form",
              consent_text:
                "I agree to receive texts from AfterCallPro at the mobile number provided. " +
                "I am not required to consent as a condition of purchase. Reply STOP to opt out. " +
                "Msg & data rates may apply.",
            }),
          });
        } catch (err) {
          console.error("SMS opt-in record failed:", err);
        }
      }

      // Account created — next step is choosing a plan and paying. There is
      // no free tier, so we always route to /pricing (not /onboarding);
      // onboarding starts after payment clears.
      const plan = searchParams.get("plan");
      navigate(plan ? `/pricing?plan=${encodeURIComponent(plan)}` : "/pricing");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>
        <p style={styles.subtitle}>Create your account — you'll choose a plan next.</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Business Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Acme Plumbing"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              placeholder="+15551234567"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Min. 8 characters"
              style={styles.input}
            />
            <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.4rem", lineHeight: 1.4 }}>
              At least 8 characters, with one uppercase letter, one number, and one symbol.
            </p>
          </div>

          {/* SMS CONSENT CHECKBOX */}
          <div
            style={{
              ...styles.consentBox,
              borderColor: smsConsent ? "#16a34a" : "#d1d5db",
              background: smsConsent ? "#f0fdf4" : "#f9fafb",
            }}
          >
            <label style={styles.consentLabel}>
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.consentText}>
                Yes! I agree to receive texts from AfterCallPro to my mobile
                telephone number provided above. I understand that I am{" "}
                <strong>not required</strong> to agree to the receipt of texts
                as a condition of purchasing any good or service from
                AfterCallPro and that I may opt-out at any time. Standard Msg
                &amp; Data Rates apply. Text <strong>HELP</strong> for help and{" "}
                <strong>STOP</strong> to opt-out. View our{" "}
                <Link to="/sms-policy" style={styles.link}>
                  SMS Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p style={styles.legalText}>
            By creating an account, you agree to our{" "}
            <Link to="/terms" style={styles.link}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" style={styles.link}>
              Privacy Policy
            </Link>
            .
          </p>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "24px",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    marginBottom: "16px",
  },
  field: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  consentBox: {
    border: "1.5px solid",
    borderRadius: "10px",
    padding: "12px 14px",
    marginBottom: "16px",
    marginTop: "4px",
    transition: "border-color 0.2s, background 0.2s",
  },
  consentLabel: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    cursor: "pointer",
  },
  checkbox: {
    marginTop: "2px",
    width: "16px",
    height: "16px",
    flexShrink: 0,
    cursor: "pointer",
    accentColor: "#0f172a",
  },
  consentText: {
    fontSize: "12px",
    color: "#374151",
    lineHeight: "1.65",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  legalText: {
    marginTop: "12px",
    fontSize: "11px",
    color: "#94a3b8",
    lineHeight: "1.6",
    textAlign: "center",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  },
};
