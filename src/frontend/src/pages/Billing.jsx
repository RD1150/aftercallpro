import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const API_BASE = "";

const PLANS = [
  {
    id: "core",
    name: "Core",
    monthlyPrice: 99,
    yearlyTotal: 990,
    yearlyMonthly: 82,
    minutes: 1500,
    features: [
      "1,500 AI minutes/month",
      "24/7 AI call answering",
      "Call transcripts & summaries",
      "SMS follow-up automation",
      "Appointment booking",
      "Lead tracking & inbox",
      "Email notifications",
      "Missed call recovery",
    ],
    color: "#2563eb",
    featured: false,
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: 297,
    yearlyTotal: 2970,
    yearlyMonthly: 248,
    minutes: 5000,
    features: [
      "5,000 AI minutes/month",
      "Everything in Core",
      "No-show recovery sequences",
      "Advanced analytics & reporting",
      "Priority support",
      "Custom AI greeting & voice",
      "Multi-location support",
      "White-glove onboarding",
    ],
    color: "#7c3aed",
    featured: true,
  },
];

const PRICE_IDS = {
  core:  { monthly: "price_1SdJ4iFdaiPvq2Of6qx8oK7G", yearly: "price_1SdJ4iFdaiPvq2OfQQbvUxyV" },
  elite: { monthly: "price_1T3AYpFdaiPvq2OfEVuJYK2P", yearly: "price_1T3AYpFdaiPvq2OfZZoxetL8" },
};

const STATUS_LABELS = {
  active:    { label: "Active",    color: "#16a34a", bg: "#dcfce7" },
  cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fef2f2" },
  past_due:  { label: "Past Due",  color: "#b45309", bg: "#fef9c3" },
  trialing:  { label: "Trial",     color: "#0891b2", bg: "#e0f2fe" },
};

export default function Billing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [subInfo, setSubInfo]             = useState(null);
  const [subLoading, setSubLoading]       = useState(true);
  const [billing, setBilling]             = useState("monthly");
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError]                 = useState("");
  const [successMsg, setSuccessMsg]       = useState("");

  useEffect(() => {
    if (searchParams.get("subscription") === "success") {
      setSuccessMsg("🎉 Subscription activated! Your AI receptionist is now live.");
    }
    if (searchParams.get("subscription") === "cancelled") {
      setError("Checkout was cancelled. No charge was made.");
    }
    fetchSubInfo();
  }, []);

  const fetchSubInfo = async () => {
    setSubLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/subscription-info`, {
        credentials: "include",
      });
      if (res.ok) setSubInfo(await res.json());
    } catch (e) {
      console.error("Failed to load subscription info", e);
    } finally {
      setSubLoading(false);
    }
  };

  const handleCheckout = async (planId) => {
    setCheckoutLoading(planId);
    setError("");
    try {
      const priceId = PRICE_IDS[planId][billing];
      const res = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, price_id: priceId, billing }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Could not start checkout. Please try again.");
        setCheckoutLoading(null);
      }
    } catch (e) {
      setError("Network error. Please check your connection and try again.");
      setCheckoutLoading(null);
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
        setPortalLoading(false);
      }
    } catch (e) {
      setError("Network error. Please try again.");
      setPortalLoading(false);
    }
  };

  const currentPlan  = subInfo?.plan;
  const hasActiveSub = subInfo?.has_active_subscription && subInfo?.status !== "cancelled";
  const statusInfo   = subInfo ? STATUS_LABELS[subInfo.status] || STATUS_LABELS.active : null;
  const minutesPct   = subInfo
    ? Math.min(100, Math.round((subInfo.minutes_used / (subInfo.minutes_limit || 1)) * 100))
    : 0;

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.navBrand}>AfterCallPro</span>
        <div style={styles.navRight}>
          <button onClick={() => navigate("/dashboard")} style={styles.navLink}>Dashboard</button>
          <span style={styles.navEmail}>{user?.email}</span>
        </div>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.heading}>Billing & Subscription</h1>

        {successMsg && <div style={styles.successBanner}>{successMsg}</div>}
        {error      && <div style={styles.errorBanner}>{error}</div>}

        {/* Current subscription status */}
        {!subLoading && subInfo && (
          <div style={styles.statusCard}>
            <div style={styles.statusRow}>
              <div>
                <p style={styles.statusLabel}>Current Plan</p>
                <p style={styles.statusValue}>
                  {currentPlan && currentPlan !== "free"
                    ? currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)
                    : "No active plan"}
                </p>
              </div>
              <div>
                <p style={styles.statusLabel}>Status</p>
                <span style={{ ...styles.statusBadge, color: statusInfo?.color, background: statusInfo?.bg }}>
                  {statusInfo?.label || subInfo.status}
                </span>
              </div>
              {subInfo.minutes_limit > 0 && (
                <div style={{ flex: 1 }}>
                  <p style={styles.statusLabel}>
                    Minutes Used — {subInfo.minutes_used} / {subInfo.minutes_limit}
                  </p>
                  <div style={styles.progressTrack}>
                    <div
                      style={{
                        ...styles.progressBar,
                        width: `${minutesPct}%`,
                        background: minutesPct > 85 ? "#ef4444" : "#2563eb",
                      }}
                    />
                  </div>
                  <p style={styles.progressPct}>{minutesPct}% used this month</p>
                </div>
              )}
              {hasActiveSub && (
                <button
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                  style={styles.portalBtn}
                >
                  {portalLoading ? "Loading…" : "Manage / Cancel"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Billing toggle */}
        <div style={styles.toggleWrap}>
          <div style={styles.toggle}>
            <button
              onClick={() => setBilling("monthly")}
              style={{ ...styles.toggleBtn, ...(billing === "monthly" ? styles.toggleActive : {}) }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              style={{ ...styles.toggleBtn, ...(billing === "yearly" ? styles.toggleActive : {}) }}
            >
              Annual&nbsp;
              <span style={styles.saveBadge}>Save 2 months</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div style={styles.planGrid}>
          {PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.id && hasActiveSub;
            const price = billing === "yearly" ? plan.yearlyMonthly : plan.monthlyPrice;
            const billingNote = billing === "yearly"
              ? `$${plan.yearlyTotal}/yr — save $${plan.monthlyPrice * 12 - plan.yearlyTotal}`
              : "Billed monthly · Cancel anytime";

            return (
              <div
                key={plan.id}
                style={{
                  ...styles.planCard,
                  ...(plan.featured ? styles.planCardFeatured : {}),
                  ...(isCurrent ? styles.planCardCurrent : {}),
                }}
              >
                {plan.featured && !isCurrent && (
                  <div style={styles.featuredBadge}>Most Popular</div>
                )}
                {isCurrent && (
                  <div style={{ ...styles.featuredBadge, background: "#16a34a" }}>Current Plan</div>
                )}

                <h2 style={{ ...styles.planName, color: plan.color }}>{plan.name}</h2>
                <div style={styles.priceRow}>
                  <span style={styles.price}>${price}</span>
                  <span style={styles.priceMo}>/mo</span>
                </div>
                <p style={styles.billingNote}>{billingNote}</p>

                <button
                  onClick={() => !isCurrent && handleCheckout(plan.id)}
                  disabled={isCurrent || checkoutLoading === plan.id}
                  style={{
                    ...styles.planBtn,
                    ...(plan.featured ? styles.planBtnPrimary : styles.planBtnOutline),
                    ...(isCurrent ? styles.planBtnDisabled : {}),
                  }}
                >
                  {checkoutLoading === plan.id
                    ? "Redirecting…"
                    : isCurrent
                    ? "Current Plan"
                    : hasActiveSub
                    ? `Switch to ${plan.name}`
                    : `Get ${plan.name}`}
                </button>

                <ul style={styles.featureList}>
                  {plan.features.map((f) => (
                    <li key={f} style={styles.featureItem}>
                      <span style={{ ...styles.featureCheck, color: plan.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p style={styles.footer}>
          14-day money-back guarantee on all plans. Questions?{" "}
          <a href="mailto:support@aftercallpro.com" style={styles.footerLink}>
            support@aftercallpro.com
          </a>
        </p>
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
  navBrand: { color: "#fff", fontWeight: "700", fontSize: "18px" },
  navRight: { display: "flex", alignItems: "center", gap: "16px" },
  navLink: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "14px",
    padding: 0,
  },
  navEmail: { color: "#94a3b8", fontSize: "14px" },
  container: { maxWidth: "860px", margin: "0 auto", padding: "40px 24px 80px" },
  heading: { fontSize: "28px", fontWeight: "700", color: "#0f172a", marginBottom: "28px" },
  successBanner: {
    background: "#dcfce7", border: "1px solid #86efac", color: "#166534",
    borderRadius: "8px", padding: "12px 16px", marginBottom: "20px",
  },
  errorBanner: {
    background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c",
    borderRadius: "8px", padding: "12px 16px", marginBottom: "20px",
  },
  statusCard: {
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px",
    padding: "24px 28px", marginBottom: "32px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  statusRow: { display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" },
  statusLabel: {
    fontSize: "11px", color: "#64748b", textTransform: "uppercase",
    letterSpacing: "0.06em", marginBottom: "4px",
  },
  statusValue: { fontSize: "18px", fontWeight: "700", color: "#0f172a" },
  statusBadge: {
    display: "inline-block", padding: "4px 10px", borderRadius: "999px",
    fontSize: "13px", fontWeight: "600",
  },
  progressTrack: {
    height: "6px", background: "#e2e8f0", borderRadius: "999px",
    overflow: "hidden", marginTop: "6px",
  },
  progressBar: { height: "100%", borderRadius: "999px", transition: "width 0.4s ease" },
  progressPct: { fontSize: "11px", color: "#64748b", marginTop: "4px" },
  portalBtn: {
    background: "#0f172a", color: "#fff", border: "none", borderRadius: "8px",
    padding: "10px 18px", cursor: "pointer", fontSize: "14px", fontWeight: "500",
    whiteSpace: "nowrap", alignSelf: "center",
  },
  toggleWrap: { textAlign: "center", marginBottom: "36px" },
  toggle: {
    display: "inline-flex", background: "#f1f5f9", borderRadius: "50px",
    padding: "4px", border: "1px solid #e2e8f0",
  },
  toggleBtn: {
    padding: "10px 24px", borderRadius: "50px", border: "none", cursor: "pointer",
    fontWeight: "600", fontSize: "14px", background: "transparent", color: "#64748b",
    display: "flex", alignItems: "center", gap: "6px",
  },
  toggleActive: { background: "#2563eb", color: "#fff", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" },
  saveBadge: {
    background: "#10b981", color: "#fff", fontSize: "11px",
    padding: "2px 8px", borderRadius: "20px", fontWeight: "700",
  },
  planGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  planCard: {
    background: "#fff", border: "1px solid #e5e7eb", borderRadius: "20px",
    padding: "36px 32px", position: "relative", display: "flex", flexDirection: "column",
  },
  planCardFeatured: {
    border: "2px solid #2563eb",
    boxShadow: "0 12px 40px rgba(37,99,235,0.12)",
  },
  planCardCurrent: {
    border: "2px solid #16a34a",
    boxShadow: "0 4px 16px rgba(22,163,74,0.1)",
  },
  featuredBadge: {
    position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
    background: "#2563eb", color: "#fff", fontSize: "12px", fontWeight: "700",
    padding: "4px 16px", borderRadius: "20px", whiteSpace: "nowrap",
  },
  planName: { fontSize: "26px", fontWeight: "700", marginBottom: "8px" },
  priceRow: { display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "4px" },
  price: { fontSize: "52px", fontWeight: "800", color: "#0f172a", lineHeight: 1 },
  priceMo: { fontSize: "18px", color: "#64748b", fontWeight: "500" },
  billingNote: { fontSize: "13px", color: "#64748b", marginBottom: "24px" },
  planBtn: {
    padding: "14px 20px", borderRadius: "10px", textAlign: "center",
    fontWeight: "700", fontSize: "15px", cursor: "pointer", marginBottom: "28px",
    transition: "opacity 0.2s",
  },
  planBtnPrimary: { background: "#2563eb", color: "#fff", border: "none" },
  planBtnOutline: { background: "transparent", color: "#2563eb", border: "2px solid #2563eb" },
  planBtnDisabled: { opacity: 0.5, cursor: "default" },
  featureList: { listStyle: "none", paddingLeft: 0, margin: 0, flexGrow: 1 },
  featureItem: {
    padding: "7px 0", fontSize: "14px", color: "#374151",
    borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "flex-start", gap: "8px",
  },
  featureCheck: { fontWeight: "700", flexShrink: 0 },
  footer: { textAlign: "center", fontSize: "13px", color: "#64748b" },
  footerLink: { color: "#2563eb" },
};
