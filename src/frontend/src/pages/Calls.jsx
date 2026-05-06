import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const STATUS_LABELS = {
  new: "New",
  called_back: "Called back",
  done: "Done",
};

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "called_back", label: "Called back" },
  { key: "done", label: "Done" },
];

function formatPhone(p) {
  if (!p) return "Unknown";
  const d = p.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) {
    return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  }
  if (d.length === 10) {
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return p;
}

function formatWhen(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  const isYest = d.toDateString() === yest.toDateString();
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `Today, ${time}`;
  if (isYest) return `Yesterday, ${time}`;
  return d.toLocaleDateString([], { month: "short", day: "numeric" }) + `, ${time}`;
}

export default function Calls() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [calls, setCalls] = useState([]);
  const [counts, setCounts] = useState({ new: 0, called_back: 0, done: 0 });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [sendingId, setSendingId] = useState(null);
  const [smsBody, setSmsBody] = useState("");
  const [toast, setToast] = useState(null);

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);
      if (search) params.set("q", search);
      const res = await fetch(`/api/calls?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setCalls(data.calls || []);
      setCounts(data.counts_by_status || { new: 0, called_back: 0, done: 0 });
    } catch (e) {
      setToast({ type: "error", msg: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [filter, search]);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const updateStatus = async (call, status) => {
    try {
      const res = await fetch(`/api/calls/${call.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handled_status: status }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setCalls((prev) => prev.map((c) => (c.id === call.id ? updated : c)));
      fetchCalls();
    } catch (e) {
      setToast({ type: "error", msg: e.message });
    }
  };

  const sendRetargetSms = async (call) => {
    if (!smsBody.trim()) return;
    setSendingId(call.id);
    try {
      const res = await fetch(`/api/calls/${call.id}/retarget-sms`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: smsBody.trim() }),
      });
      const data = await res.json();
      if (data.sent) {
        setToast({ type: "success", msg: "SMS sent." });
        setSmsBody("");
        if (data.call) {
          setCalls((prev) => prev.map((c) => (c.id === call.id ? data.call : c)));
        }
        fetchCalls();
      } else {
        const reasonMsg = {
          opted_out: "Recipient has opted out of SMS.",
          rate_limited: "SMS rate limit hit; try again later.",
          idempotent_replay: "This SMS was just sent.",
        }[data.reason] || `Send failed: ${data.reason || "unknown"}`;
        setToast({ type: "error", msg: reasonMsg });
      }
    } catch (e) {
      setToast({ type: "error", msg: e.message });
    } finally {
      setSendingId(null);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const total = useMemo(
    () => (counts.new || 0) + (counts.called_back || 0) + (counts.done || 0),
    [counts]
  );

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navBrand}>AfterCallPro</span>
        <div style={styles.navRight}>
          <button onClick={() => navigate("/dashboard")} style={styles.navLink}>Dashboard</button>
          <button onClick={() => navigate("/appointments")} style={styles.navLink}>Appointments</button>
          <button onClick={() => navigate("/settings")} style={styles.navLink}>Settings</button>
          <span style={styles.navEmail}>{user?.email}</span>
        </div>
      </nav>

      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.h1}>Leads</h1>
          <p style={styles.subtitle}>
            Every inbound call your AI receptionist handled. Mark them as you follow up.
          </p>
        </header>

        <div style={styles.controls}>
          <div style={styles.filters}>
            {STATUS_FILTERS.map((f) => {
              const active = filter === f.key;
              const count = f.key === "all" ? total : counts[f.key] ?? 0;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    ...styles.filterBtn,
                    ...(active ? styles.filterBtnActive : {}),
                  }}
                >
                  {f.label} <span style={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search phone, intent, summary…"
            style={styles.search}
          />
        </div>

        {loading ? (
          <div style={styles.empty}>Loading…</div>
        ) : calls.length === 0 ? (
          <div style={styles.empty}>
            {filter === "all" && !search
              ? "No calls yet. Once your AI takes its first call, it'll show up here."
              : "No calls match this filter."}
          </div>
        ) : (
          <div style={styles.list}>
            {calls.map((call) => {
              const isOpen = expanded === call.id;
              return (
                <div key={call.id} style={styles.row}>
                  <div
                    style={styles.rowHead}
                    onClick={() => {
                      setExpanded(isOpen ? null : call.id);
                      if (!isOpen) setSmsBody("");
                    }}
                  >
                    <div style={styles.rowLeft}>
                      <div style={styles.phone}>{formatPhone(call.from_number)}</div>
                      <div style={styles.preview}>
                        {call.caller_intent || call.summary || "—"}
                      </div>
                    </div>
                    <div style={styles.rowRight}>
                      <span style={statusBadgeStyle(call.handled_status)}>
                        {STATUS_LABELS[call.handled_status] || "New"}
                      </span>
                      <span style={styles.when}>{formatWhen(call.started_at)}</span>
                    </div>
                  </div>

                  {isOpen && (
                    <div style={styles.rowBody}>
                      {call.summary && (
                        <div style={styles.field}>
                          <div style={styles.fieldLabel}>Summary</div>
                          <div style={styles.fieldVal}>{call.summary}</div>
                        </div>
                      )}
                      {call.transcript && (
                        <div style={styles.field}>
                          <div style={styles.fieldLabel}>Transcript</div>
                          <pre style={styles.transcript}>{call.transcript}</pre>
                        </div>
                      )}

                      <div style={styles.actions}>
                        <div style={styles.statusBlock}>
                          <label style={styles.fieldLabel}>Status</label>
                          <select
                            value={call.handled_status}
                            onChange={(e) => updateStatus(call, e.target.value)}
                            style={styles.select}
                          >
                            <option value="new">New</option>
                            <option value="called_back">Called back</option>
                            <option value="done">Done</option>
                          </select>
                        </div>

                        <a href={`tel:${call.from_number}`} style={styles.btnGhost}>
                          Call back
                        </a>
                      </div>

                      <div style={styles.smsBlock}>
                        <div style={styles.fieldLabel}>Send follow-up SMS</div>
                        <textarea
                          value={smsBody}
                          onChange={(e) => setSmsBody(e.target.value)}
                          placeholder="Hi, this is us following up on your call. How can we help?"
                          rows={3}
                          maxLength={1000}
                          style={styles.textarea}
                        />
                        <div style={styles.smsActions}>
                          <span style={styles.smsHint}>
                            Sent from your AfterCallPro number. Opt-outs and rate limits enforced automatically.
                          </span>
                          <button
                            onClick={() => sendRetargetSms(call)}
                            disabled={!smsBody.trim() || sendingId === call.id}
                            style={{
                              ...styles.btnPrimary,
                              ...((!smsBody.trim() || sendingId === call.id) ? styles.btnDisabled : {}),
                            }}
                          >
                            {sendingId === call.id ? "Sending…" : "Send SMS"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast && (
        <div style={{ ...styles.toast, ...(toast.type === "error" ? styles.toastError : styles.toastSuccess) }}>
          {toast.msg}
        </div>
      )}
    </main>
  );
}

function statusBadgeStyle(status) {
  const base = {
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    letterSpacing: "0.02em",
  };
  if (status === "called_back") return { ...base, background: "#fef3c7", color: "#92400e" };
  if (status === "done") return { ...base, background: "#dcfce7", color: "#166534" };
  return { ...base, background: "#dbeafe", color: "#1e40af" };
}

const NAVY = "#0b1220";
const GOLD = "#f7c948";

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" },
  nav: {
    background: NAVY,
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBrand: { color: "#E6EDF3", fontWeight: 700, fontSize: "1.15rem" },
  navRight: { display: "flex", gap: "1.25rem", alignItems: "center" },
  navLink: {
    background: "transparent",
    border: "none",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  navEmail: { color: "#94a3b8", fontSize: "0.85rem" },

  content: { maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" },
  header: { marginBottom: "1.75rem" },
  h1: { fontSize: "2rem", fontWeight: 700, color: "#0b1524", margin: 0 },
  subtitle: { color: "#64748b", marginTop: "0.4rem" },

  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.25rem",
  },
  filters: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  filterBtn: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "999px",
    padding: "0.4rem 0.95rem",
    fontSize: "0.85rem",
    color: "#334155",
    cursor: "pointer",
    fontWeight: 500,
  },
  filterBtnActive: {
    background: NAVY,
    borderColor: NAVY,
    color: "#fff",
  },
  filterCount: {
    fontSize: "0.7rem",
    fontWeight: 700,
    marginLeft: "0.4rem",
    opacity: 0.8,
  },
  search: {
    flex: "1 1 280px",
    maxWidth: "360px",
    padding: "0.55rem 0.9rem",
    border: "1px solid #e2e8f0",
    borderRadius: "0.6rem",
    fontSize: "0.9rem",
    background: "#fff",
    outline: "none",
  },

  empty: {
    background: "#fff",
    border: "1px dashed #cbd5e1",
    borderRadius: "0.75rem",
    padding: "3rem 1.5rem",
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.95rem",
  },
  list: { display: "flex", flexDirection: "column", gap: "0.6rem" },
  row: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "0.75rem",
    overflow: "hidden",
  },
  rowHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.95rem 1.1rem",
    cursor: "pointer",
    gap: "1rem",
  },
  rowLeft: { display: "flex", flexDirection: "column", gap: "0.25rem", minWidth: 0, flex: 1 },
  phone: { fontWeight: 600, color: "#0b1524", fontSize: "0.97rem" },
  preview: { color: "#64748b", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  rowRight: { display: "flex", alignItems: "center", gap: "0.85rem", flexShrink: 0 },
  when: { color: "#94a3b8", fontSize: "0.8rem", whiteSpace: "nowrap" },

  rowBody: {
    borderTop: "1px solid #f1f5f9",
    padding: "1rem 1.1rem 1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#fafbfd",
  },
  field: { display: "flex", flexDirection: "column", gap: "0.3rem" },
  fieldLabel: { fontSize: "0.72rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" },
  fieldVal: { color: "#0b1524", fontSize: "0.92rem", lineHeight: 1.55 },
  transcript: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "0.7rem 0.85rem",
    fontSize: "0.83rem",
    color: "#334155",
    maxHeight: "240px",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    fontFamily: "'Inter', system-ui, sans-serif",
    margin: 0,
  },

  actions: { display: "flex", gap: "0.75rem", alignItems: "flex-end", flexWrap: "wrap" },
  statusBlock: { display: "flex", flexDirection: "column", gap: "0.3rem" },
  select: {
    padding: "0.45rem 0.7rem",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    fontSize: "0.88rem",
    background: "#fff",
    cursor: "pointer",
  },
  btnGhost: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.95rem",
    fontSize: "0.88rem",
    color: "#0b1524",
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
  },

  smsBlock: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  textarea: {
    width: "100%",
    padding: "0.65rem 0.8rem",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    resize: "vertical",
    background: "#fff",
    boxSizing: "border-box",
  },
  smsActions: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" },
  smsHint: { color: "#94a3b8", fontSize: "0.78rem" },
  btnPrimary: {
    background: NAVY,
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.55rem 1.1rem",
    fontSize: "0.88rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  btnDisabled: { background: "#cbd5e1", cursor: "not-allowed" },

  toast: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    padding: "0.7rem 1.1rem",
    borderRadius: "0.5rem",
    fontSize: "0.88rem",
    fontWeight: 500,
    boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
    zIndex: 50,
  },
  toastSuccess: { background: "#0b1524", color: GOLD },
  toastError: { background: "#7f1d1d", color: "#fee2e2" },
};
