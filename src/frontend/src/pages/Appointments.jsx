import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";

const STATUS_COLORS = {
  scheduled: { bg: "#dbeafe", text: "#1d4ed8", label: "Scheduled" },
  confirmed:  { bg: "#dcfce7", text: "#15803d", label: "Confirmed" },
  completed:  { bg: "#f1f5f9", text: "#475569", label: "Completed" },
  cancelled:  { bg: "#fee2e2", text: "#b91c1c", label: "Cancelled" },
  no_show:    { bg: "#fef9c3", text: "#92400e", label: "No Show" },
};

function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || { bg: "#f1f5f9", text: "#475569", label: status };
  return (
    <span style={{ background: s.bg, color: s.text, padding: "3px 10px",
      borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
      {s.label}
    </span>
  );
}

function AppointmentModal({ appt, onClose, onSave }) {
  const [form, setForm] = useState({
    customer_name: appt?.customer_name || "",
    customer_phone: appt?.customer_phone || "",
    customer_email: appt?.customer_email || "",
    appointment_datetime: appt?.appointment_datetime
      ? new Date(appt.appointment_datetime).toISOString().slice(0, 16) : "",
    duration_minutes: appt?.duration_minutes || 60,
    appointment_type: appt?.appointment_type || "",
    notes: appt?.notes || "",
    status: appt?.status || "scheduled",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = appt?.id ? `${API_BASE}/api/appointments/${appt.id}` : `${API_BASE}/api/appointments`;
      const method = appt?.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method, credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={mS.overlay} onClick={onClose}>
      <div style={mS.modal} onClick={e => e.stopPropagation()}>
        <div style={mS.header}>
          <h2 style={mS.title}>{appt?.id ? "Edit Appointment" : "New Appointment"}</h2>
          <button onClick={onClose} style={mS.closeBtn}>✕</button>
        </div>
        {error && <div style={mS.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ padding: "20px 24px" }}>
          <div style={mS.row}>
            <div style={mS.field}>
              <label style={mS.label}>Customer Name *</label>
              <input name="customer_name" value={form.customer_name} onChange={handleChange}
                required style={mS.input} placeholder="Jane Smith" />
            </div>
            <div style={mS.field}>
              <label style={mS.label}>Phone</label>
              <input name="customer_phone" value={form.customer_phone} onChange={handleChange}
                style={mS.input} placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          <div style={mS.row}>
            <div style={mS.field}>
              <label style={mS.label}>Email</label>
              <input name="customer_email" value={form.customer_email} onChange={handleChange}
                type="email" style={mS.input} placeholder="jane@example.com" />
            </div>
            <div style={mS.field}>
              <label style={mS.label}>Date & Time *</label>
              <input name="appointment_datetime" value={form.appointment_datetime}
                onChange={handleChange} required type="datetime-local" style={mS.input} />
            </div>
          </div>
          <div style={mS.row}>
            <div style={mS.field}>
              <label style={mS.label}>Duration</label>
              <select name="duration_minutes" value={form.duration_minutes}
                onChange={handleChange} style={mS.input}>
                {[15,30,45,60,90,120].map(d => <option key={d} value={d}>{d} min</option>)}
              </select>
            </div>
            <div style={mS.field}>
              <label style={mS.label}>Appointment Type</label>
              <input name="appointment_type" value={form.appointment_type} onChange={handleChange}
                style={mS.input} placeholder="Consultation, Showing, etc." />
            </div>
          </div>
          {appt?.id && (
            <div style={{ marginBottom: "16px" }}>
              <label style={mS.label}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={mS.input}>
                {Object.entries(STATUS_COLORS).map(([k,v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          )}
          <div style={{ marginBottom: "16px" }}>
            <label style={mS.label}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange}
              style={{ ...mS.input, height: "80px", resize: "vertical" }}
              placeholder="Any additional notes..." />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button type="button" onClick={onClose} style={mS.cancelBtn}>Cancel</button>
            <button type="submit" disabled={saving} style={mS.saveBtn}>
              {saving ? "Saving…" : appt?.id ? "Save Changes" : "Create Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Appointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editAppt, setEditAppt] = useState(null);
  const [sendingReminder, setSendingReminder] = useState(null);
  const [reminderMsg, setReminderMsg] = useState("");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) setAppointments(Array.isArray(data) ? data : data.appointments || []);
      else setError(data.error || "Failed to load appointments");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleSave = (saved) => {
    setAppointments(prev => {
      const idx = prev.findIndex(a => a.id === saved.id);
      if (idx >= 0) { const u = [...prev]; u[idx] = saved; return u; }
      return [saved, ...prev];
    });
    setShowModal(false); setEditAppt(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment? This also removes it from Google Calendar.")) return;
    const res = await fetch(`${API_BASE}/api/appointments/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      setError("Failed to delete appointment.");
      return;
    }
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleSendReminder = async (appt) => {
    setSendingReminder(appt.id); setReminderMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/appointments/${appt.id}/send-reminder`, {
        method: "POST", credentials: "include",
      });
      const data = await res.json();
      setReminderMsg(res.ok ? "✓ Reminder sent!" : data.error || "Failed to send reminder");
      setTimeout(() => setReminderMsg(""), 3000);
    } catch { setReminderMsg("Network error."); }
    finally { setSendingReminder(null); }
  };

  const filtered = appointments.filter(a => {
    const matchFilter = filter === "all" || a.status === filter;
    const matchSearch = !search ||
      a.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.customer_phone?.includes(search) ||
      a.appointment_type?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = {
    total: appointments.length,
    scheduled: appointments.filter(a => a.status === "scheduled").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    noShow: appointments.filter(a => a.status === "no_show").length,
  };

  const now = new Date();
  const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcoming = appointments
    .filter(a => { const d = new Date(a.appointment_datetime); return d >= now && d <= in7 && a.status !== "cancelled"; })
    .sort((a, b) => new Date(a.appointment_datetime) - new Date(b.appointment_datetime));

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Appointments</h1>
          <p style={s.subtitle}>Manage bookings, send reminders, and track no-shows</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => navigate("/dashboard")} style={s.backBtn}>← Dashboard</button>
          <button onClick={() => { setEditAppt(null); setShowModal(true); }} style={s.newBtn}>
            + New Appointment
          </button>
        </div>
      </div>

      <div style={s.statsGrid}>
        {[
          { label: "Total", value: stats.total, color: "#2563eb" },
          { label: "Scheduled", value: stats.scheduled, color: "#0891b2" },
          { label: "Confirmed", value: stats.confirmed, color: "#16a34a" },
          { label: "No Shows", value: stats.noShow, color: "#b45309" },
        ].map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={{ fontSize: "36px", fontWeight: "800", color: st.color, lineHeight: 1 }}>{st.value}</div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "6px", fontWeight: "500" }}>{st.label}</div>
          </div>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <h2 style={s.sectionTitle}>Upcoming This Week</h2>
          <div style={s.upcomingGrid}>
            {upcoming.slice(0, 4).map(a => (
              <div key={a.id} style={s.upcomingCard}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>{formatDateTime(a.appointment_datetime)}</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "2px" }}>{a.customer_name}</div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>{a.appointment_type || "Appointment"}</div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={s.controls}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, phone, or type…" style={s.searchInput} />
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["all","scheduled","confirmed","completed","cancelled","no_show"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ ...s.filterBtn, ...(filter === f ? s.filterBtnActive : {}) }}>
              {f === "all" ? "All" : STATUS_COLORS[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      {reminderMsg && (
        <div style={{ padding: "10px 16px", borderRadius: "8px", marginBottom: "12px", fontSize: "14px",
          fontWeight: "500", background: reminderMsg.startsWith("✓") ? "#dcfce7" : "#fee2e2",
          color: reminderMsg.startsWith("✓") ? "#15803d" : "#b91c1c" }}>
          {reminderMsg}
        </div>
      )}

      {loading ? (
        <div style={s.empty}>Loading appointments…</div>
      ) : error ? (
        <div style={{ ...s.empty, color: "#b91c1c" }}>{error}</div>
      ) : filtered.length === 0 ? (
        <div style={s.empty}>
          {appointments.length === 0 ? "No appointments yet. Create your first one above." : "No appointments match your filter."}
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                {["Customer","Date & Time","Type","Duration","Status","Actions"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={s.td}>
                    <div style={{ fontWeight: "600", color: "#0f172a" }}>{a.customer_name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{a.customer_phone}</div>
                  </td>
                  <td style={s.td}>{formatDateTime(a.appointment_datetime)}</td>
                  <td style={s.td}>{a.appointment_type || "—"}</td>
                  <td style={s.td}>{a.duration_minutes} min</td>
                  <td style={s.td}><StatusBadge status={a.status} /></td>
                  <td style={s.td}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => { setEditAppt(a); setShowModal(true); }} style={s.editBtn}>Edit</button>
                      <button onClick={() => handleSendReminder(a)}
                        disabled={sendingReminder === a.id || a.status === "cancelled"} style={s.remindBtn}>
                        {sendingReminder === a.id ? "…" : "Remind"}
                      </button>
                      <button onClick={() => handleDelete(a.id)} style={s.deleteBtn}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AppointmentModal
          appt={editAppt}
          onClose={() => { setShowModal(false); setEditAppt(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

const s = {
  page: { maxWidth: "1100px", margin: "0 auto", padding: "32px 24px", fontFamily: "Inter, system-ui, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  backBtn: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", cursor: "pointer", fontSize: "14px" },
  newBtn: { padding: "10px 20px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" },
  statCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", textAlign: "center" },
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" },
  upcomingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" },
  upcomingCard: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" },
  controls: { display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" },
  searchInput: { flex: "1", minWidth: "200px", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none" },
  filterBtn: { padding: "6px 14px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "13px" },
  filterBtnActive: { background: "#2563eb", color: "#fff", borderColor: "#2563eb" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "14px 16px", fontSize: "14px", color: "#374151", verticalAlign: "middle" },
  editBtn: { padding: "4px 10px", borderRadius: "6px", border: "1px solid #2563eb", background: "#fff", color: "#2563eb", cursor: "pointer", fontSize: "12px" },
  remindBtn: { padding: "4px 10px", borderRadius: "6px", border: "1px solid #16a34a", background: "#fff", color: "#16a34a", cursor: "pointer", fontSize: "12px" },
  deleteBtn: { padding: "4px 10px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#b91c1c", cursor: "pointer", fontSize: "12px" },
  empty: { textAlign: "center", padding: "60px 20px", color: "#94a3b8", fontSize: "15px" },
};

const mS = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
  modal: { background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #e2e8f0" },
  title: { fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  error: { margin: "12px 24px", padding: "10px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", fontSize: "14px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" },
  input: { padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" },
  cancelBtn: { padding: "10px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", cursor: "pointer", fontSize: "14px" },
  saveBtn: { padding: "10px 24px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px" },
};
