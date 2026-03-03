import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE = "";

const PLAN_LABELS = {
  free: { label: "Free", color: "#64748b" },
  starter: { label: "Starter — $39/mo", color: "#0891b2" },
  core: { label: "Core — $99/mo", color: "#2563eb" },
  elite: { label: "Elite — $249/mo", color: "#7c3aed" },
};

const STATUS_LABELS = {
  active: { label: "Active", color: "#16a34a", bg: "#dcfce7" },
  cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fef2f2" },
  past_due: { label: "Past Due", color: "#b45309", bg: "#fef9c3" },
  trialing: { label: "Trial", color: "#0891b2", bg: "#e0f2fe" },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [subInfo, setSubInfo] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Show success message if coming back from Stripe checkout
    if (searchParams.get("subscription") === "success") {
      setSuccessMsg("🎉 Subscription activated! Welcome aboard.");
    }
    fetchSubInfo();
  }, []);

  const fetchSubInfo = async () => {
    setSubLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/subscription-info`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSubInfo(data);
      }
    } catch (err) {
      console.error("Failed to load subscription info", err);
    } finally {
      setSubLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/payments/create-customer-portal-session`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Could not open billing portal.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    setUpgradeLoading(planId);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Could not start checkout.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setUpgradeLoading(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const minutesPct = subInfo
    ? Math.min(100, Math.round((subInfo.minutes_used / (subInfo.minutes_limit || 1)) * 100))
    : 0;

  const planInfo = subInfo ? PLAN_LABELS[subInfo.plan] || PLAN_LABELS.free : null;
  const statusInfo = subInfo ? STATUS_LABELS[subInfo.status] || STATUS_LABELS.active : null;

  return (
    <div style={styles.page}>
      {/* Top nav */}
      <nav style={styles.nav}>
        <span style={styles.navBrand}>AfterCallPro</span>
        <div style={styles.navRight}>
          <span style={styles.navEmail}>{user?.email}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Log out
          </button>
        </div>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.heading}>Dashboard</h1>

        {successMsg && (
          <div style={styles.successBanner}>{successMsg}</div>
        )}
        {error && (
          <div style={styles.errorBanner}>{error}</div>
        )}

        {/* Subscription card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Your Subscription</h2>
            {!subLoading && subInfo?.has_active_subscription && (
              <button
                onClick={handleManageBilling}
                disabled={portalLoading}
                style={styles.manageBtn}
              >
                {portalLoading ? "Loading…" : "Manage Billing"}
              </button>
            )}
          </div>

          {subLoading ? (
            <p style={styles.muted}>Loading subscription info…</p>
          ) : subInfo ? (
            <div>
              <div style={styles.planRow}>
                <div>
                  <p style={styles.label}>Current Plan</p>
                  <p style={{ ...styles.planName, color: planInfo?.color }}>
                    {planInfo?.label || subInfo.plan}
                  </p>
                </div>
                <div>
                  <p style={styles.label}>Status</p>
                  <span
                    style={{
                      ...styles.statusBadge,
                      color: statusInfo?.color,
                      background: statusInfo?.bg,
                    }}
                  >
                    {statusInfo?.label || subInfo.status}
                  </span>
                </div>
              </div>

              {subInfo.minutes_limit > 0 && (
                <div style={styles.usageSection}>
                  <div style={styles.usageHeader}>
                    <p style={styles.label}>Minutes Used This Month</p>
                    <p style={styles.usageCount}>
                      {subInfo.minutes_used} / {subInfo.minutes_limit} min
                    </p>
                  </div>
                  <div style={styles.progressTrack}>
                    <div
                      style={{
                        ...styles.progressBar,
                        width: `${minutesPct}%`,
                        background: minutesPct > 85 ? "#ef4444" : "#2563eb",
                      }}
                    />
                  </div>
                  <p style={styles.usagePct}>{minutesPct}% used</p>
                </div>
              )}

              {subInfo.plan === "free" && (
                <div style={styles.upgradePrompt}>
                  <p style={styles.upgradeText}>
                    You're on the Free plan. Upgrade to unlock more minutes, SMS follow-up, and advanced features.
                  </p>
                  <div style={styles.upgradeButtons}>
                    {["starter", "core", "elite"].map((p) => (
                      <button
                        key={p}
                        onClick={() => handleUpgrade(p)}
                        disabled={upgradeLoading === p}
                        style={styles.upgradeBtn}
                      >
                        {upgradeLoading === p ? "Loading…" : `Upgrade to ${p.charAt(0).toUpperCase() + p.slice(1)}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={styles.muted}>Could not load subscription info.</p>
          )}
        </div>

        {/* Quick links */}
        <div style={styles.quickGrid}>
          <div style={styles.quickCard}>
            <h3 style={styles.quickTitle}>📞 Call Log</h3>
            <p style={styles.quickDesc}>View all incoming calls, transcripts, and AI summaries.</p>
            <button style={styles.quickBtn} onClick={() => navigate("/calls")}>View Calls</button>
          </div>
          <div style={styles.quickCard}>
            <h3 style={styles.quickTitle}>👥 Leads</h3>
            <p style={styles.quickDesc}>Manage captured leads and follow-up status.</p>
            <button style={styles.quickBtn} onClick={() => navigate("/leads")}>View Leads</button>
          </div>
          <div style={styles.quickCard}>
            <h3 style={styles.quickTitle}>📅 Appointments</h3>
            <p style={styles.quickDesc}>Track scheduled appointments and no-shows.</p>
            <button style={styles.quickBtn} onClick={() => navigate("/appointments")}>View Appointments</button>
          </div>
          <div style={styles.quickCard}>
            <h3 style={styles.quickTitle}>⚙️ Settings</h3>
            <p style={styles.quickDesc}>Update your business info, greeting, and AI voice.</p>
            <button style={styles.quickBtn} onClick={() => navigate("/settings")}>Open Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  nav: {
    background: "#0f172a",
    padding: "0 24px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBrand: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "18px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  navEmail: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #475569",
    color: "#cbd5e1",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 24px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "24px",
  },
  successBanner: {
    background: "#dcfce7",
    border: "1px solid #86efac",
    color: "#166534",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
  },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "20px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "28px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
    margin: 0,
  },
  manageBtn: {
    background: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  planRow: {
    display: "flex",
    gap: "40px",
    marginBottom: "24px",
  },
  label: {
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px",
  },
  planName: {
    fontSize: "20px",
    fontWeight: "700",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  },
  usageSection: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: "20px",
  },
  usageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  usageCount: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f172a",
  },
  progressTrack: {
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: "999px",
    transition: "width 0.4s ease",
  },
  usagePct: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "6px",
  },
  upgradePrompt: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "20px",
  },
  upgradeText: {
    color: "#1e40af",
    fontSize: "14px",
    marginBottom: "16px",
  },
  upgradeButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  upgradeBtn: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
  muted: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  quickCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  quickTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "6px",
  },
  quickDesc: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "14px",
    lineHeight: "1.5",
  },
  quickBtn: {
    background: "#f1f5f9",
    border: "none",
    borderRadius: "6px",
    padding: "7px 14px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#0f172a",
  },
};
