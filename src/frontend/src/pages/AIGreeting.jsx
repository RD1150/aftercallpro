import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";

const GREETING_TEMPLATES = [
  {
    id: "professional",
    label: "Professional",
    text: "Thank you for calling {business_name}. We're unable to take your call right now. Please leave your name and the reason for your call, and we'll get back to you as soon as possible.",
  },
  {
    id: "friendly",
    label: "Friendly & Warm",
    text: "Hi there! You've reached {business_name}. We're busy helping other customers right now, but we don't want to miss you. Please tell us your name and how we can help, and we'll call you right back!",
  },
  {
    id: "after_hours",
    label: "After Hours",
    text: "You've reached {business_name}. Our office is currently closed. Our hours are Monday through Friday, 9 AM to 5 PM. Please leave your name and number and we'll return your call on the next business day.",
  },
  {
    id: "medical",
    label: "Medical / Healthcare",
    text: "Thank you for calling {business_name}. If this is a medical emergency, please hang up and dial 911. Otherwise, please leave your name, date of birth, and reason for calling, and our team will return your call within one business day.",
  },
  {
    id: "real_estate",
    label: "Real Estate",
    text: "Hi, you've reached {business_name}. I'm currently with a client or showing a property. Please leave your name, number, and the property you're interested in, and I'll get back to you shortly.",
  },
  {
    id: "custom",
    label: "Custom",
    text: "",
  },
];

const VOICES = [
  { id: "alloy", label: "Alloy", desc: "Neutral, clear" },
  { id: "echo", label: "Echo", desc: "Male, warm" },
  { id: "fable", label: "Fable", desc: "British accent" },
  { id: "onyx", label: "Onyx", desc: "Deep, authoritative" },
  { id: "nova", label: "Nova", desc: "Female, friendly" },
  { id: "shimmer", label: "Shimmer", desc: "Female, soft" },
];

export default function AIGreeting() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [greetingText, setGreetingText] = useState(GREETING_TEMPLATES[0].text);
  const [selectedVoice, setSelectedVoice] = useState("nova");
  const [businessName, setBusinessName] = useState("");
  const [afterHoursEnabled, setAfterHoursEnabled] = useState(false);
  const [afterHoursText, setAfterHoursText] = useState(GREETING_TEMPLATES[2].text);
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchSettings();
  }, [user]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/business/settings`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setSettings(data);
        setBusinessName(data.name || data.business_name || "");
        if (data.ai_greeting) setGreetingText(data.ai_greeting);
        if (data.ai_voice) setSelectedVoice(data.ai_voice);
        if (data.after_hours_greeting) setAfterHoursText(data.after_hours_greeting);
        if (data.after_hours_enabled !== undefined) setAfterHoursEnabled(data.after_hours_enabled);
        if (data.language) setLanguage(data.language);
      }
    } catch { setError("Failed to load settings."); }
    finally { setLoading(false); }
  };

  const handleTemplateSelect = (tpl) => {
    setSelectedTemplate(tpl.id);
    if (tpl.id !== "custom") {
      setGreetingText(tpl.text.replace("{business_name}", businessName || "our business"));
    }
  };

  const handleSave = async () => {
    setSaving(true); setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/api/business/settings`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ai_greeting: greetingText,
          ai_voice: selectedVoice,
          after_hours_greeting: afterHoursText,
          after_hours_enabled: afterHoursEnabled,
          language,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setSuccess("✓ AI greeting settings saved successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleTestGreeting = async () => {
    setTesting(true); setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/api/voice/test-greeting`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: greetingText, voice: selectedVoice }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Test failed");
      setSuccess("✓ Test call initiated! You should receive a call shortly.");
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) { setError(err.message); }
    finally { setTesting(false); }
  };

  const preview = greetingText.replace("{business_name}", businessName || "Your Business");

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>AI Greeting & Voice</h1>
          <p style={s.subtitle}>Customize what your AI receptionist says and how it sounds</p>
        </div>
        <button onClick={() => navigate("/dashboard")} style={s.backBtn}>← Dashboard</button>
      </div>

      {loading ? (
        <div style={s.empty}>Loading settings…</div>
      ) : (
        <>
          {error && <div style={s.errorBanner}>{error}</div>}
          {success && <div style={s.successBanner}>{success}</div>}

          {/* Greeting Templates */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Greeting Template</h2>
            <p style={s.sectionDesc}>Choose a starting template or write your own.</p>
            <div style={s.templateGrid}>
              {GREETING_TEMPLATES.map(tpl => (
                <button key={tpl.id} onClick={() => handleTemplateSelect(tpl)}
                  style={{ ...s.templateBtn, ...(selectedTemplate === tpl.id ? s.templateBtnActive : {}) }}>
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Greeting Text */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Greeting Message</h2>
            <p style={s.sectionDesc}>
              Use <code style={s.code}>{"{business_name}"}</code> as a placeholder for your business name.
            </p>
            <textarea
              value={greetingText}
              onChange={e => { setGreetingText(e.target.value); setSelectedTemplate("custom"); }}
              style={s.textarea}
              placeholder="Type your custom greeting here…"
              rows={5}
            />
            <div style={s.previewBox}>
              <div style={s.previewLabel}>Preview</div>
              <div style={s.previewText}>{preview}</div>
            </div>
          </div>

          {/* Voice Selection */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>AI Voice</h2>
            <p style={s.sectionDesc}>Select the voice your AI receptionist will use.</p>
            <div style={s.voiceGrid}>
              {VOICES.map(v => (
                <button key={v.id} onClick={() => setSelectedVoice(v.id)}
                  style={{ ...s.voiceBtn, ...(selectedVoice === v.id ? s.voiceBtnActive : {}) }}>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>{v.label}</div>
                  <div style={{ fontSize: "12px", color: selectedVoice === v.id ? "#93c5fd" : "#94a3b8", marginTop: "2px" }}>{v.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Language</h2>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={s.select}>
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-US">Spanish (US)</option>
              <option value="es-ES">Spanish (Spain)</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="pt-BR">Portuguese (Brazil)</option>
            </select>
          </div>

          {/* After Hours */}
          <div style={s.section}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <h2 style={{ ...s.sectionTitle, margin: 0 }}>After-Hours Greeting</h2>
              <label style={s.toggle}>
                <input type="checkbox" checked={afterHoursEnabled}
                  onChange={e => setAfterHoursEnabled(e.target.checked)} style={{ display: "none" }} />
                <div style={{ ...s.toggleTrack, background: afterHoursEnabled ? "#2563eb" : "#e2e8f0" }}>
                  <div style={{ ...s.toggleThumb, transform: afterHoursEnabled ? "translateX(20px)" : "translateX(0)" }} />
                </div>
                <span style={{ fontSize: "13px", color: "#64748b" }}>{afterHoursEnabled ? "Enabled" : "Disabled"}</span>
              </label>
            </div>
            {afterHoursEnabled && (
              <textarea
                value={afterHoursText}
                onChange={e => setAfterHoursText(e.target.value)}
                style={s.textarea}
                placeholder="After-hours greeting message…"
                rows={4}
              />
            )}
          </div>

          {/* Actions */}
          <div style={s.actions}>
            <button onClick={handleTestGreeting} disabled={testing} style={s.testBtn}>
              {testing ? "Calling…" : "📞 Test Greeting"}
            </button>
            <button onClick={handleSave} disabled={saving} style={s.saveBtn}>
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const s = {
  page: { maxWidth: "800px", margin: "0 auto", padding: "32px 24px", fontFamily: "Inter, system-ui, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  backBtn: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" },
  section: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", marginBottom: "20px" },
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px 0" },
  sectionDesc: { fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" },
  templateGrid: { display: "flex", flexWrap: "wrap", gap: "8px" },
  templateBtn: { padding: "8px 16px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
  templateBtnActive: { background: "#2563eb", color: "#fff", borderColor: "#2563eb" },
  textarea: { width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", lineHeight: "1.6", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  previewBox: { marginTop: "12px", background: "#f8fafc", borderRadius: "8px", padding: "14px", border: "1px solid #e2e8f0" },
  previewLabel: { fontSize: "11px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" },
  previewText: { fontSize: "14px", color: "#374151", lineHeight: "1.6", fontStyle: "italic" },
  code: { background: "#f1f5f9", padding: "1px 6px", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace", color: "#2563eb" },
  voiceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" },
  voiceBtn: { padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", textAlign: "left" },
  voiceBtnActive: { background: "#1e3a5f", borderColor: "#2563eb", color: "#fff" },
  select: { padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", background: "#fff", cursor: "pointer", width: "100%", maxWidth: "300px" },
  toggle: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  toggleTrack: { width: "40px", height: "22px", borderRadius: "11px", position: "relative", transition: "background 0.2s" },
  toggleThumb: { position: "absolute", top: "3px", left: "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", transition: "transform 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" },
  actions: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" },
  testBtn: { padding: "12px 24px", borderRadius: "8px", border: "1px solid #2563eb", background: "#fff", color: "#2563eb", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
  saveBtn: { padding: "12px 28px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
  errorBanner: { background: "#fee2e2", color: "#b91c1c", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" },
  successBanner: { background: "#dcfce7", color: "#15803d", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" },
  empty: { textAlign: "center", padding: "60px 20px", color: "#94a3b8", fontSize: "15px" },
};
