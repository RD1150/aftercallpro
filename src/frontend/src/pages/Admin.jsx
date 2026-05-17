import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function formatPhone(p) {
  if (!p) return "";
  const d = p.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return p;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [listError, setListError] = useState("");
  const [fetching, setFetching] = useState(false);
  // Per-business UI state, keyed by business id.
  const [rowState, setRowState] = useState({});

  // Non-admins don't belong here.
  useEffect(() => {
    if (loading) return;
    if (!user) { navigate("/login"); return; }
    if (user.role !== "admin") { navigate("/dashboard"); return; }
  }, [user, loading]);

  const load = useCallback((term) => {
    setFetching(true);
    setListError("");
    fetch(`/api/admin/businesses?search=${encodeURIComponent(term || "")}`, { credentials: "include" })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "Failed to load businesses");
        setBusinesses(data.businesses || []);
      })
      .catch((e) => setListError(e.message))
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") load("");
  }, [user, load]);

  const setRow = (id, patch) =>
    setRowState((s) => ({ ...s, [id]: { ...s[id], ...patch } }));

  const provision = (biz) => {
    const rs = rowState[biz.id] || {};
    setRow(biz.id, { busy: true, msg: "", error: "" });
    fetch(`/api/admin/businesses/${biz.id}/provision-number`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        area_code: (rs.areaCode || "").trim() || undefined,
        comp: !!rs.comp,
      }),
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "Provisioning failed");
        // Swap the updated business record into the list.
        setBusinesses((list) =>
          list.map((b) => (b.id === biz.id ? data.business : b))
        );
        setRow(biz.id, {
          busy: false,
          msg: data.status === "already_provisioned"
            ? "Already had a number — no charge."
            : "Number provisioned.",
          error: "",
        });
      })
      .catch((e) => setRow(biz.id, { busy: false, error: e.message, msg: "" }));
  };

  if (loading || !user || user.role !== "admin") {
    return <div style={s.page}><div style={s.container}>Loading…</div></div>;
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <h1 style={s.title}>Admin — Number Provisioning</h1>
        <p style={s.sub}>
          Manually assign a Twilio number to comped or free accounts that
          never run through Stripe checkout. Tick <strong>Comp</strong> to also
          mark the account active so it can take calls.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); load(search); }}
          style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone…"
            style={s.input}
          />
          <button type="submit" style={s.btn} disabled={fetching}>
            {fetching ? "Searching…" : "Search"}
          </button>
        </form>

        {listError && <div style={s.errorBanner}>{listError}</div>}

        {businesses.length === 0 && !fetching && (
          <div style={s.empty}>No businesses found.</div>
        )}

        {businesses.map((b) => {
          const rs = rowState[b.id] || {};
          return (
            <div key={b.id} style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={s.bizName}>{b.name}</div>
                  <div style={s.bizMeta}>{b.email} · {formatPhone(b.phone_number)}</div>
                  <div style={s.bizMeta}>
                    Plan: {b.subscription_tier || "—"} · Status: {b.subscription_status || "—"}
                    {b.founding_member ? " · Founding member" : ""}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={s.numLabel}>AfterCallPro number</div>
                  <div style={b.twilio_number ? s.numLive : s.numNone}>
                    {b.twilio_number ? formatPhone(b.twilio_number) : "Not provisioned"}
                  </div>
                </div>
              </div>

              {!b.twilio_number && (
                <div style={s.actionRow}>
                  <input
                    value={rs.areaCode || ""}
                    onChange={(e) => setRow(b.id, { areaCode: e.target.value })}
                    placeholder="Area code (optional)"
                    style={{ ...s.input, maxWidth: "180px" }}
                  />
                  <label style={s.checkLabel}>
                    <input
                      type="checkbox"
                      checked={!!rs.comp}
                      onChange={(e) => setRow(b.id, { comp: e.target.checked })}
                    />
                    Comp this account
                  </label>
                  <button
                    onClick={() => provision(b)}
                    disabled={rs.busy}
                    style={s.btn}
                  >
                    {rs.busy ? "Provisioning…" : "Provision number"}
                  </button>
                </div>
              )}

              {rs.msg && <div style={s.okMsg}>{rs.msg}</div>}
              {rs.error && <div style={s.errMsg}>{rs.error}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f8fafc", padding: "40px 20px", fontFamily: "Inter, system-ui, sans-serif" },
  container: { width: "100%", maxWidth: "760px", margin: "0 auto" },
  title: { fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" },
  sub: { fontSize: "14px", color: "#64748b", margin: "0 0 24px 0", lineHeight: "1.6" },
  input: { flex: 1, padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  btn: { padding: "10px 20px", borderRadius: "8px", border: "none", background: "#2563eb", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "18px", marginBottom: "12px" },
  bizName: { fontSize: "16px", fontWeight: "700", color: "#0f172a" },
  bizMeta: { fontSize: "13px", color: "#64748b", marginTop: "2px" },
  numLabel: { fontSize: "11px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" },
  numLive: { fontSize: "16px", fontWeight: "700", color: "#16a34a", fontFamily: "monospace" },
  numNone: { fontSize: "14px", color: "#94a3b8" },
  actionRow: { display: "flex", alignItems: "center", gap: "12px", marginTop: "14px", flexWrap: "wrap" },
  checkLabel: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#374151" },
  okMsg: { marginTop: "10px", fontSize: "13px", color: "#16a34a", fontWeight: "600" },
  errMsg: { marginTop: "10px", fontSize: "13px", color: "#b91c1c", fontWeight: "600" },
  errorBanner: { background: "#fee2e2", color: "#b91c1c", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" },
  empty: { textAlign: "center", color: "#94a3b8", fontSize: "14px", padding: "32px" },
};
