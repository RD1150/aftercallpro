import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";

const STEPS = [
  { id: 1, title: "Business Info", desc: "Tell us about your business" },
  { id: 2, title: "Phone Number", desc: "Connect your Twilio number" },
  { id: 3, title: "AI Greeting", desc: "Set your greeting message" },
  { id: 4, title: "SMS Template", desc: "Customize your follow-up SMS" },
  { id: 5, title: "You're Live!", desc: "Start receiving AI-handled calls" },
];

function StepIndicator({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap", gap: "4px" }}>
      {STEPS.map((step, i) => (
        <React.Fragment key={step.id}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px",
              background: step.id < current ? "#16a34a" : step.id === current ? "#2563eb" : "#e2e8f0",
              color: step.id <= current ? "#fff" : "#94a3b8",
              transition: "all 0.3s",
            }}>
              {step.id < current ? "✓" : step.id}
            </div>
            <div style={{ fontSize: "11px", color: step.id === current ? "#2563eb" : "#94a3b8", fontWeight: step.id === current ? "600" : "400", textAlign: "center", maxWidth: "70px" }}>
              {step.title}
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: "40px", height: "2px", background: step.id < current ? "#16a34a" : "#e2e8f0", marginBottom: "22px", transition: "background 0.3s" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    business_name: "",
    business_type: "",
    website: "",
    address: "",
    phone_number: "",
    twilio_number: "",
    ai_greeting: "Thank you for calling {business_name}. We're unable to take your call right now. Please leave your name and reason for calling and we'll get back to you shortly.",
    sms_template: "Hi, this is {business_name}. We missed your call. Please reply with your request or call us back. Reply STOP to opt out.",
    ai_voice: "nova",
  });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    // Pre-fill from user data
    if (user.company_name) setForm(f => ({ ...f, business_name: user.company_name }));
    if (user.phone) setForm(f => ({ ...f, phone_number: user.phone }));
  }, [user]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleNext = async () => {
    setError("");
    if (step === 1 && !form.business_name.trim()) {
      setError("Business name is required."); return;
    }
    if (step < STEPS.length) {
      setStep(s => s + 1);
    }
  };

  const handleFinish = async () => {
    setSaving(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/api/business/onboarding`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save onboarding");
      setStep(5);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const greetingPreview = form.ai_greeting.replace("{business_name}", form.business_name || "Your Business");
  const smsPreview = form.sms_template.replace("{business_name}", form.business_name || "Your Business");

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>AfterCallPro</div>
          <div style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>Setup Wizard</div>
        </div>

        <StepIndicator current={step} />

        {error && <div style={s.errorBanner}>{error}</div>}

        {/* Step 1 — Business Info */}
        {step === 1 && (
          <div style={s.stepCard}>
            <h2 style={s.stepTitle}>Tell us about your business</h2>
            <p style={s.stepDesc}>This information helps your AI receptionist introduce your business correctly.</p>
            <div style={s.fieldGroup}>
              <label style={s.label}>Business Name *</label>
              <input name="business_name" value={form.business_name} onChange={handleChange}
                style={s.input} placeholder="e.g. Smith Plumbing" />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Business Type</label>
              <select name="business_type" value={form.business_type} onChange={handleChange} style={s.input}>
                <option value="">Select your industry…</option>
                <option value="real_estate">Real Estate</option>
                <option value="medical">Medical / Healthcare</option>
                <option value="legal">Legal</option>
                <option value="home_services">Home Services</option>
                <option value="restaurant">Restaurant / Food</option>
                <option value="retail">Retail</option>
                <option value="financial">Financial Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Website</label>
              <input name="website" value={form.website} onChange={handleChange}
                style={s.input} placeholder="https://yourbusiness.com" />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Business Address</label>
              <input name="address" value={form.address} onChange={handleChange}
                style={s.input} placeholder="123 Main St, City, State" />
            </div>
          </div>
        )}

        {/* Step 2 — Phone Number */}
        {step === 2 && (
          <div style={s.stepCard}>
            <h2 style={s.stepTitle}>Connect your phone number</h2>
            <p style={s.stepDesc}>Enter the phone number you want AfterCallPro to manage. This is the number your customers call.</p>
            <div style={s.fieldGroup}>
              <label style={s.label}>Your Business Phone Number</label>
              <input name="phone_number" value={form.phone_number} onChange={handleChange}
                style={s.input} placeholder="+1 (555) 000-0000" />
            </div>
            <div style={s.infoBox}>
              <div style={s.infoTitle}>📞 How it works</div>
              <div style={s.infoText}>
                AfterCallPro uses a Twilio number to handle your calls. When a customer calls your number and you can't answer, the call is forwarded to your AfterCallPro AI receptionist which answers, takes a message, and sends an SMS follow-up.
              </div>
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>AfterCallPro Number (assigned)</label>
              <input name="twilio_number" value={form.twilio_number || "(844) 745-3471"}
                onChange={handleChange} style={{ ...s.input, background: "#f8fafc", color: "#64748b" }}
                readOnly />
            </div>
          </div>
        )}

        {/* Step 3 — AI Greeting */}
        {step === 3 && (
          <div style={s.stepCard}>
            <h2 style={s.stepTitle}>Set your AI greeting</h2>
            <p style={s.stepDesc}>This is what your AI receptionist will say when answering calls. Use <code style={s.code}>{"{business_name}"}</code> as a placeholder.</p>
            <div style={s.fieldGroup}>
              <label style={s.label}>Greeting Message</label>
              <textarea name="ai_greeting" value={form.ai_greeting} onChange={handleChange}
                style={s.textarea} rows={5} />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>AI Voice</label>
              <select name="ai_voice" value={form.ai_voice} onChange={handleChange} style={s.input}>
                <option value="nova">Nova (Female, Friendly)</option>
                <option value="shimmer">Shimmer (Female, Soft)</option>
                <option value="alloy">Alloy (Neutral)</option>
                <option value="echo">Echo (Male, Warm)</option>
                <option value="onyx">Onyx (Male, Deep)</option>
                <option value="fable">Fable (British)</option>
              </select>
            </div>
            <div style={s.previewBox}>
              <div style={s.previewLabel}>Preview</div>
              <div style={s.previewText}>"{greetingPreview}"</div>
            </div>
          </div>
        )}

        {/* Step 4 — SMS Template */}
        {step === 4 && (
          <div style={s.stepCard}>
            <h2 style={s.stepTitle}>Customize your follow-up SMS</h2>
            <p style={s.stepDesc}>This message is sent automatically when you miss a call. Use <code style={s.code}>{"{business_name}"}</code> as a placeholder.</p>
            <div style={s.fieldGroup}>
              <label style={s.label}>SMS Message</label>
              <textarea name="sms_template" value={form.sms_template} onChange={handleChange}
                style={s.textarea} rows={4} />
            </div>
            <div style={s.previewBox}>
              <div style={s.previewLabel}>Preview</div>
              <div style={s.previewText}>{smsPreview}</div>
            </div>
            <div style={s.infoBox}>
              <div style={s.infoTitle}>✅ TCPA Compliance</div>
              <div style={s.infoText}>
                Your message includes "Reply STOP to opt out" which is required for SMS compliance. Do not remove this language.
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Done */}
        {step === 5 && (
          <div style={{ ...s.stepCard, textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ ...s.stepTitle, textAlign: "center" }}>You're all set!</h2>
            <p style={{ ...s.stepDesc, textAlign: "center" }}>
              AfterCallPro is now configured and ready to handle your calls. Your AI receptionist will answer missed calls, take messages, and send SMS follow-ups automatically.
            </p>
            <div style={s.successGrid}>
              {[
                { icon: "📞", label: "AI Call Answering", status: "Active" },
                { icon: "💬", label: "SMS Follow-up", status: "Active" },
                { icon: "📋", label: "Lead Tracking", status: "Active" },
                { icon: "📅", label: "Appointment Booking", status: "Active" },
              ].map(item => (
                <div key={item.label} style={s.successItem}>
                  <div style={{ fontSize: "24px" }}>{item.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: "600" }}>✓ {item.status}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/dashboard")} style={{ ...s.nextBtn, marginTop: "24px" }}>
              Go to Dashboard →
            </button>
          </div>
        )}

        {/* Navigation */}
        {step < 5 && (
          <div style={s.navRow}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} style={s.backBtn}>← Back</button>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <button onClick={handleNext} style={s.nextBtn}>Continue →</button>
            ) : (
              <button onClick={handleFinish} disabled={saving} style={s.nextBtn}>
                {saving ? "Saving…" : "Finish Setup →"}
              </button>
            )}
          </div>
        )}

        {step < 5 && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button onClick={() => navigate("/dashboard")} style={s.skipBtn}>
              Skip setup for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", fontFamily: "Inter, system-ui, sans-serif" },
  container: { width: "100%", maxWidth: "600px" },
  stepCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "32px", marginBottom: "20px" },
  stepTitle: { fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px 0" },
  stepDesc: { fontSize: "14px", color: "#64748b", margin: "0 0 24px 0", lineHeight: "1.6" },
  fieldGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" },
  input: { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  textarea: { width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", lineHeight: "1.6", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  previewBox: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "14px" },
  previewLabel: { fontSize: "11px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" },
  previewText: { fontSize: "14px", color: "#374151", lineHeight: "1.6", fontStyle: "italic" },
  code: { background: "#f1f5f9", padding: "1px 6px", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace", color: "#2563eb" },
  infoBox: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "14px", marginBottom: "20px" },
  infoTitle: { fontSize: "13px", fontWeight: "700", color: "#1d4ed8", marginBottom: "6px" },
  infoText: { fontSize: "13px", color: "#1e40af", lineHeight: "1.6" },
  navRow: { display: "flex", alignItems: "center", gap: "12px" },
  backBtn: { padding: "12px 24px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  nextBtn: { padding: "12px 28px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
  skipBtn: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "13px", textDecoration: "underline" },
  errorBanner: { background: "#fee2e2", color: "#b91c1c", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" },
  successGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "24px 0" },
  successItem: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
};
