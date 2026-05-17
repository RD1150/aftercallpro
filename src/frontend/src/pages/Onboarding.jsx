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

function formatPhoneE164(p) {
  if (!p) return "";
  const d = p.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) {
    return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  }
  if (d.length === 10) {
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return p;
}

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [businessTwilioNumber, setBusinessTwilioNumber] = useState("");
  const [subStatus, setSubStatus] = useState(null);
  const [pollAttempts, setPollAttempts] = useState(0);

  const [form, setForm] = useState({
    business_name: "",
    business_type: "",
    phone_number: "",
    ai_greeting: "Thank you for calling {business_name}. Sorry we missed your call — please tell me what you need and we'll get right back to you.",
    sms_template: "Hi, this is {business_name}. We missed your call. Please reply with your request or call us back. Reply STOP to opt out.",
    ai_voice: "nova",
  });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    // Pre-fill from user data + pull live business row so we can show the
    // real provisioned Twilio number on the forwarding step.
    fetch("/api/business/settings", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const b = data?.business || data || {};
        setForm((f) => ({
          ...f,
          business_name: b.name || f.business_name,
          business_type: b.industry || f.business_type,
          phone_number: b.phone_number || f.phone_number,
          ai_greeting: b.greeting_message || f.ai_greeting,
          sms_template: b.sms_template || f.sms_template,
          ai_voice: b.ai_voice || f.ai_voice,
        }));
        if (b.twilio_number) setBusinessTwilioNumber(b.twilio_number);
        if (b.subscription_status) setSubStatus(b.subscription_status);
      })
      .catch(() => {});
  }, [user]);

  // On the forwarding step, keep checking for the provisioned number so it
  // appears automatically — provisioning finishes on the Stripe webhook,
  // which can land after this page has already loaded. Stops once we have it.
  useEffect(() => {
    if (step !== 2 || businessTwilioNumber) return;
    let cancelled = false;
    const poll = () => {
      setPollAttempts((n) => n + 1);
      fetch("/api/business/settings", { credentials: "include" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (cancelled || !data) return;
          const b = data?.business || data || {};
          if (b.twilio_number) setBusinessTwilioNumber(b.twilio_number);
          if (b.subscription_status) setSubStatus(b.subscription_status);
        })
        .catch(() => {});
    };
    poll();
    const id = setInterval(poll, 5000);
    return () => { cancelled = true; clearInterval(id); };
  }, [step, businessTwilioNumber]);

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

  // Treat unknown status as "in progress" so a paid user is never wrongly
  // told to go pay; only a known non-paid status shows the pending message.
  const awaitingPayment = subStatus != null && !["active", "trialing"].includes(subStatus);
  // ~12 polls at 5s each ≈ 1 min. Past that, provisioning genuinely failed —
  // stop showing the "Provisioning…" dots, which would otherwise stay forever.
  const provisionStuck = !businessTwilioNumber && !awaitingPayment && pollAttempts >= 12;

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
                <option value="home_services">Home services (HVAC, plumbing, electrical)</option>
                <option value="contractor">General contractor / handyman</option>
                <option value="cleaning">Cleaning / landscaping / pool</option>
                <option value="locksmith">Locksmith / towing / roadside</option>
                <option value="dental">Dental / medical / med spa</option>
                <option value="legal">Legal / law firm</option>
                <option value="financial">Financial / accounting / mortgage</option>
                <option value="auto">Auto repair / body shop</option>
                <option value="pet">Pet services (grooming, boarding, vet)</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2 — Phone Forwarding */}
        {step === 2 && (
          <div style={s.stepCard}>
            <h2 style={s.stepTitle}>Forward your calls to AfterCallPro</h2>
            <p style={s.stepDesc}>
              We provisioned a dedicated AfterCallPro number for your business. Set up
              call forwarding from your existing line so missed or after-hours calls
              get sent here.
            </p>

            <div style={s.fieldGroup}>
              <label style={s.label}>Your business phone number</label>
              <input name="phone_number" value={form.phone_number} onChange={handleChange}
                style={s.input} placeholder="+1 (555) 000-0000" />
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                The number customers already call. This is the line you'll forward — not where calls go.
              </div>
            </div>

            <div style={{ ...s.fieldGroup, marginTop: "8px" }}>
              <label style={s.label}>Your AfterCallPro number (forward calls to this)</label>
              <div style={{
                background: "#0f172a", color: "#fff", borderRadius: "10px",
                padding: "16px 18px", fontSize: "20px", fontWeight: "700",
                letterSpacing: "0.02em", textAlign: "center", fontFamily: "monospace",
              }}>
                {businessTwilioNumber
                  ? formatPhoneE164(businessTwilioNumber)
                  : awaitingPayment
                    ? "Pending activation"
                    : provisionStuck
                      ? "Setup needed"
                      : "Provisioning…"}
              </div>
              {!businessTwilioNumber && (
                <div style={{ fontSize: "12px", color: provisionStuck ? "#b45309" : "#64748b", marginTop: "6px" }}>
                  {awaitingPayment
                    ? "Your dedicated number is assigned once your subscription is active. Finish checkout and it will appear here automatically — no need to refresh."
                    : provisionStuck
                      ? "We couldn't finish setting up your number automatically. Email mindrocketsystems@gmail.com and we'll assign it by hand right away."
                      : "We're setting up your dedicated number — this usually takes a few seconds. It will appear here automatically, no need to refresh."}
                </div>
              )}
            </div>

            <div style={s.infoBox}>
              <div style={s.infoTitle}>📞 How to set up forwarding</div>
              <div style={{ ...s.infoText, lineHeight: "1.7" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Conditional forwarding</strong> sends calls to AfterCallPro only when you're busy or don't answer. From the phone you want to forward:
                </div>
                <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                  <li><strong>iPhone (most carriers):</strong> Settings → Phone → Call Forwarding → toggle on, enter the AfterCallPro number above.</li>
                  <li><strong>AT&amp;T / Verizon / T-Mobile:</strong> dial <code style={s.code}>*71{businessTwilioNumber || "<your AfterCallPro #>"}</code> then send. Confirms with a tone.</li>
                  <li><strong>Google Voice / VoIP:</strong> add the AfterCallPro number under "Forwarding numbers" with "After unanswered" rules.</li>
                  <li><strong>Office PBX (RingCentral, 8x8, etc.):</strong> set this number as the after-hours / overflow destination.</li>
                </ul>
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#1e3a8a" }}>
                  Not sure what your carrier wants? Email <a href="mailto:mindrocketsystems@gmail.com" style={{ color: "#1d4ed8" }}>mindrocketsystems@gmail.com</a> with your carrier name and we'll send the exact dial code.
                </div>
              </div>
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
              Your AI receptionist is live. Two quick things will make sure it's actually working before your first real customer calls.
            </p>

            <div style={{ ...s.infoBox, textAlign: "left", marginTop: "16px" }}>
              <div style={s.infoTitle}>📞 1. Make a test call</div>
              <div style={s.infoText}>
                From your cell phone, dial{" "}
                <strong style={{ fontFamily: "monospace" }}>
                  {businessTwilioNumber ? formatPhoneE164(businessTwilioNumber) : "your AfterCallPro number"}
                </strong>{" "}
                and have a 30-second conversation. The AI will answer with your greeting, take a message, and you'll see the call appear under <strong>Leads</strong> in your dashboard.
              </div>
            </div>

            <div style={{ ...s.infoBox, textAlign: "left", background: "#fef3c7", borderColor: "#fde68a" }}>
              <div style={{ ...s.infoTitle, color: "#92400e" }}>🔌 2. (Optional) Connect a CRM</div>
              <div style={{ ...s.infoText, color: "#78350f" }}>
                Push every captured lead into your existing CRM via HubSpot, a webhook, or Zapier. Skip if you'd rather just use the built-in lead log.
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/calls")} style={s.nextBtn}>
                See my leads →
              </button>
              <button onClick={() => navigate("/integrations")} style={{ ...s.nextBtn, background: "#fff", color: "#0f172a", border: "1px solid #e2e8f0" }}>
                Connect a CRM
              </button>
              <button onClick={() => navigate("/dashboard")} style={{ ...s.nextBtn, background: "transparent", color: "#64748b" }}>
                Go to dashboard
              </button>
            </div>
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
