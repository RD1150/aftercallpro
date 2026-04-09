import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";

function MetricCard({ label, value, sub, color = "#2563eb", icon }) {
  return (
    <div style={s.metricCard}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500", marginBottom: "8px" }}>{label}</div>
          <div style={{ fontSize: "32px", fontWeight: "800", color, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>{sub}</div>}
        </div>
        {icon && <div style={{ fontSize: "28px", opacity: 0.3 }}>{icon}</div>}
      </div>
    </div>
  );
}

function MiniBar({ label, value, max, color = "#2563eb" }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "13px", color: "#374151" }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{value}</span>
      </div>
      <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "4px", transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

function CallVolumeChart({ data }) {
  if (!data || data.length === 0) return (
    <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No call data yet</div>
  );
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px", padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div style={{ fontSize: "10px", color: "#64748b" }}>{d.count}</div>
          <div style={{
            width: "100%", background: "#2563eb", borderRadius: "4px 4px 0 0",
            height: `${(d.count / max) * 90}px`, minHeight: d.count > 0 ? "4px" : "0",
            transition: "height 0.4s ease",
          }} />
          <div style={{ fontSize: "9px", color: "#94a3b8", textAlign: "center" }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("30");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchAnalytics();
  }, [user, period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/analytics?days=${period}`, { credentials: "include" });
      const json = await res.json();
      if (res.ok) setData(json);
      else setError(json.error || "Failed to load analytics");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const minutesPct = data
    ? Math.min(Math.round((data.minutes_used / Math.max(data.minutes_limit, 1)) * 100), 100)
    : 0;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Analytics</h1>
          <p style={s.subtitle}>Call performance, lead tracking, and usage insights</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <select value={period} onChange={e => setPeriod(e.target.value)} style={s.periodSelect}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button onClick={() => navigate("/dashboard")} style={s.backBtn}>← Dashboard</button>
        </div>
      </div>

      {loading ? (
        <div style={s.empty}>Loading analytics…</div>
      ) : error ? (
        <div style={{ ...s.empty, color: "#b91c1c" }}>{error}</div>
      ) : (
        <>
          {/* Key Metrics */}
          <div style={s.metricsGrid}>
            <MetricCard label="Total Calls" value={data?.total_calls ?? 0} icon="📞"
              sub={`${data?.calls_today ?? 0} today`} color="#2563eb" />
            <MetricCard label="Missed Calls" value={data?.missed_calls ?? 0} icon="📵"
              sub={`${data?.missed_pct ?? 0}% of total`} color="#b91c1c" />
            <MetricCard label="SMS Sent" value={data?.sms_sent ?? 0} icon="💬"
              sub="Follow-up messages" color="#0891b2" />
            <MetricCard label="Leads Captured" value={data?.leads_captured ?? 0} icon="🎯"
              sub="From missed calls" color="#7c3aed" />
            <MetricCard label="Appointments" value={data?.appointments_booked ?? 0} icon="📅"
              sub="Booked via AI" color="#16a34a" />
            <MetricCard label="Avg Call Duration" value={`${data?.avg_duration_sec ?? 0}s`} icon="⏱"
              sub="Per call" color="#f59e0b" />
          </div>

          {/* Minutes Usage */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>AI Minutes Usage</h2>
            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", color: "#374151" }}>
                  {data?.minutes_used ?? 0} of {data?.minutes_limit ?? 0} minutes used
                </span>
                <span style={{ fontSize: "14px", fontWeight: "700",
                  color: minutesPct > 85 ? "#b91c1c" : minutesPct > 60 ? "#f59e0b" : "#16a34a" }}>
                  {minutesPct}%
                </span>
              </div>
              <div style={{ height: "12px", background: "#f1f5f9", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: "6px", transition: "width 0.6s ease",
                  width: `${minutesPct}%`,
                  background: minutesPct > 85 ? "#ef4444" : minutesPct > 60 ? "#f59e0b" : "#2563eb",
                }} />
              </div>
              {minutesPct > 80 && (
                <div style={{ marginTop: "10px", padding: "8px 12px", background: "#fef9c3",
                  borderRadius: "8px", fontSize: "13px", color: "#92400e" }}>
                  ⚠️ You've used {minutesPct}% of your monthly minutes.{" "}
                  <span onClick={() => navigate("/pricing")}
                    style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }}>
                    Upgrade your plan
                  </span>{" "}to avoid interruptions.
                </div>
              )}
            </div>
          </div>

          {/* Call Volume Chart + Sentiment */}
          <div style={s.twoCol}>
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Call Volume</h2>
              <div style={s.card}>
                <CallVolumeChart data={data?.call_volume_chart ?? []} />
              </div>
            </div>
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Call Sentiment</h2>
              <div style={s.card}>
                <MiniBar label="Positive" value={data?.sentiment?.positive ?? 0}
                  max={data?.total_calls ?? 1} color="#16a34a" />
                <MiniBar label="Neutral" value={data?.sentiment?.neutral ?? 0}
                  max={data?.total_calls ?? 1} color="#64748b" />
                <MiniBar label="Negative" value={data?.sentiment?.negative ?? 0}
                  max={data?.total_calls ?? 1} color="#ef4444" />
              </div>
            </div>
          </div>

          {/* Top Call Reasons */}
          {data?.top_reasons && data.top_reasons.length > 0 && (
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Top Call Reasons</h2>
              <div style={s.card}>
                {data.top_reasons.map((r, i) => (
                  <MiniBar key={i} label={r.reason} value={r.count}
                    max={data.total_calls ?? 1} color="#2563eb" />
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {data?.recent_calls && data.recent_calls.length > 0 && (
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Recent Calls</h2>
              <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                  <thead style={{ background: "#f8fafc" }}>
                    <tr>
                      {["Caller","Time","Duration","Status","Sentiment"].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent_calls.map(c => (
                      <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={s.td}>{c.caller_number || "Unknown"}</td>
                        <td style={s.td}>{new Date(c.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</td>
                        <td style={s.td}>{c.duration_seconds ? `${c.duration_seconds}s` : "—"}</td>
                        <td style={s.td}>
                          <span style={{ padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "600",
                            background: c.status === "completed" ? "#dcfce7" : c.status === "missed" ? "#fee2e2" : "#f1f5f9",
                            color: c.status === "completed" ? "#15803d" : c.status === "missed" ? "#b91c1c" : "#475569" }}>
                            {c.status || "—"}
                          </span>
                        </td>
                        <td style={s.td}>{c.sentiment || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
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
  periodSelect: { padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", background: "#fff", cursor: "pointer" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" },
  metricCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" },
  section: { marginBottom: "24px" },
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px 16px", fontSize: "13px", color: "#374151" },
  empty: { textAlign: "center", padding: "60px 20px", color: "#94a3b8", fontSize: "15px" },
};
