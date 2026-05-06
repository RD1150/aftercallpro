import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plug, CheckCircle, AlertCircle } from "lucide-react";

// CRM integrations not yet shipped — listed here so the user can request
// access. Each "Request access" link opens a mailto so we can prioritize
// by demand. HubSpot moved out of this list once it went live.
//
// Real-estate CRMs (FollowUpBoss, kvCORE, Lofty, BoomTown) are intentionally
// excluded — see memory: aftercallpro_no_crm + aftercallpro_icp.
const CRM_GROUPS = [
  {
    label: "General",
    items: [
      { name: "Pipedrive", desc: "Drop callers into a Pipedrive deal pipeline." },
    ],
  },
  {
    label: "Trades & home services",
    items: [
      { name: "Housecall Pro", desc: "Create a customer + estimate request on every captured call." },
      { name: "Jobber", desc: "New caller → Jobber client + work request." },
      { name: "ServiceTitan", desc: "Inbound calls become ServiceTitan customer records and bookable jobs." },
    ],
  },
  {
    label: "Law & professional services",
    items: [
      { name: "Clio", desc: "Capture intake calls as Clio matters with the AI's notes attached." },
    ],
  },
  {
    label: "Dental & medical",
    items: [
      { name: "Dentrix", desc: "Push patient inquiries into Dentrix as new patient leads." },
    ],
  },
];

const REQUEST_EMAIL = "mindrocketsystems@gmail.com";

function requestMailto(name) {
  const subject = encodeURIComponent(`AfterCallPro integration request: ${name}`);
  const body = encodeURIComponent(
    `Hi,\n\nI'd like early access to the ${name} integration in AfterCallPro.\n\n— Sent from /integrations`
  );
  return `mailto:${REQUEST_EMAIL}?subject=${subject}&body=${body}`;
}

export default function Integrations() {
  const [params] = useSearchParams();
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [calendarError, setCalendarError] = useState("");

  const [hubspotConnected, setHubspotConnected] = useState(false);
  const [hubspotError, setHubspotError] = useState("");

  const [webhookSaved, setWebhookSaved] = useState(null); // null | {url, has_secret}
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [webhookError, setWebhookError] = useState("");
  const [webhookTesting, setWebhookTesting] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState(null);

  useEffect(() => {
    fetch("/api/appointments/calendar/settings", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.google_calendar_enabled) setCalendarConnected(true);
      })
      .catch(() => {});

    if (params.get("calendar") === "connected") {
      setCalendarConnected(true);
    }

    fetch("/api/integrations", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = data?.integrations || [];
        if (list.some((i) => i.provider === "hubspot" && i.enabled)) {
          setHubspotConnected(true);
        }
        const wh = list.find((i) => i.provider === "webhook" && i.enabled);
        if (wh) {
          setWebhookSaved({ url: wh.url, has_secret: wh.has_secret });
          setWebhookUrl(wh.url || "");
        }
      })
      .catch(() => {});

    const hubspotParam = params.get("hubspot");
    if (hubspotParam === "connected") {
      setHubspotConnected(true);
    } else if (hubspotParam === "error") {
      setHubspotError(params.get("reason") || "Could not finish connecting HubSpot.");
    }
  }, [params]);

  const handleCalendarConnect = async () => {
    setCalendarError("");
    try {
      const res = await fetch("/api/appointments/calendar/connect", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.authorization_url) {
        setCalendarError(data.error || "Could not start Google connection.");
        return;
      }
      window.location.href = data.authorization_url;
    } catch (err) {
      setCalendarError("Network error connecting to Google.");
    }
  };

  const handleCalendarDisconnect = async () => {
    try {
      await fetch("/api/appointments/calendar/disconnect", {
        method: "POST",
        credentials: "include",
      });
      setCalendarConnected(false);
    } catch (err) {
      // ignore
    }
  };

  const handleHubspotConnect = async () => {
    setHubspotError("");
    try {
      const res = await fetch("/api/integrations/hubspot/connect", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.authorization_url) {
        setHubspotError(data.error || "Could not start HubSpot connection.");
        return;
      }
      window.location.href = data.authorization_url;
    } catch (err) {
      setHubspotError("Network error connecting to HubSpot.");
    }
  };

  const handleHubspotDisconnect = async () => {
    try {
      await fetch("/api/integrations/hubspot/disconnect", {
        method: "POST",
        credentials: "include",
      });
      setHubspotConnected(false);
    } catch (err) {
      // ignore
    }
  };

  const handleWebhookSave = async (e) => {
    e?.preventDefault?.();
    setWebhookError("");
    setWebhookTestResult(null);
    try {
      const res = await fetch("/api/integrations/webhook", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: webhookUrl,
          secret: webhookSecret || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setWebhookError(data.error || "Could not save webhook.");
        return;
      }
      setWebhookSaved({ url: data.url, has_secret: data.has_secret });
      setWebhookSecret("");
    } catch (err) {
      setWebhookError("Network error saving webhook.");
    }
  };

  const handleWebhookTest = async () => {
    setWebhookTesting(true);
    setWebhookTestResult(null);
    try {
      const res = await fetch("/api/integrations/webhook/test", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setWebhookTestResult(data);
    } catch (err) {
      setWebhookTestResult({ sent: false, reason: "network_error" });
    } finally {
      setWebhookTesting(false);
    }
  };

  const handleWebhookDisconnect = async () => {
    try {
      await fetch("/api/integrations/webhook", {
        method: "DELETE",
        credentials: "include",
      });
      setWebhookSaved(null);
      setWebhookUrl("");
      setWebhookSecret("");
      setWebhookTestResult(null);
    } catch (err) {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Integrations</h1>
        <p className="text-slate-600 mb-10">
          Connect your CRM, calendar, and automation tools.
        </p>

        {/* CALENDAR — real */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Plug className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Google Calendar</h2>
          </div>

          <p className="text-slate-600 mb-4">
            Enable appointment booking and availability checking via Google Calendar.
            Once connected, the AI receptionist can offer real time slots and book
            appointments directly on your calendar.
          </p>

          {calendarError && (
            <div className="flex items-center gap-2 text-red-600 mb-3">
              <AlertCircle className="w-5 h-5" /> {calendarError}
            </div>
          )}

          {calendarConnected ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" /> Connected
              </div>
              <button
                onClick={handleCalendarDisconnect}
                className="text-sm text-slate-500 underline hover:text-slate-700"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleCalendarConnect}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Connect Google Calendar
            </button>
          )}
        </div>

        {/* HUBSPOT — real */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Plug className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-slate-900">HubSpot</h2>
          </div>

          <p className="text-slate-600 mb-4">
            Push every captured caller into HubSpot as a contact, with the AI's
            call summary attached as a note. Existing contacts are matched by
            phone number and updated.
          </p>

          {hubspotError && (
            <div className="flex items-center gap-2 text-red-600 mb-3">
              <AlertCircle className="w-5 h-5" /> {hubspotError}
            </div>
          )}

          {hubspotConnected ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" /> Connected
              </div>
              <button
                onClick={handleHubspotDisconnect}
                className="text-sm text-slate-500 underline hover:text-slate-700"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleHubspotConnect}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Connect HubSpot
            </button>
          )}
        </div>

        {/* WEBHOOK — real, generic */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Plug className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-slate-900">Webhook (Zapier, Make, custom)</h2>
          </div>

          <p className="text-slate-600 mb-4">
            We POST a JSON payload to your URL on every captured call. Use it
            with Zapier or Make to push leads into any CRM, with n8n or your own
            server for custom workflows. Optional shared secret signs the
            payload with HMAC-SHA256 in <code className="text-sm bg-slate-100 px-1 rounded">X-AfterCallPro-Signature</code>.
          </p>

          {webhookError && (
            <div className="flex items-center gap-2 text-red-600 mb-3">
              <AlertCircle className="w-5 h-5" /> {webhookError}
            </div>
          )}

          {webhookSaved ? (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5" /> Connected
                </div>
                <span className="text-sm text-slate-500 font-mono break-all">
                  {webhookSaved.url}
                </span>
                {webhookSaved.has_secret && (
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    Signed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleWebhookTest}
                  disabled={webhookTesting}
                  className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 disabled:opacity-50"
                >
                  {webhookTesting ? "Sending…" : "Send test ping"}
                </button>
                <button
                  onClick={handleWebhookDisconnect}
                  className="text-sm text-slate-500 underline hover:text-slate-700"
                >
                  Disconnect
                </button>
                {webhookTestResult && (
                  <span
                    className={
                      webhookTestResult.sent
                        ? "text-sm text-green-700"
                        : "text-sm text-red-600"
                    }
                  >
                    {webhookTestResult.sent
                      ? `Sent · ${webhookTestResult.status_code}`
                      : `Failed · ${webhookTestResult.reason || "unknown"}`}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleWebhookSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Destination URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://hooks.zapier.com/…"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Shared secret <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Any random string — used to sign the payload"
                  value={webhookSecret}
                  onChange={(e) => setWebhookSecret(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save webhook
              </button>
            </form>
          )}
        </div>

        {/* CRM SECTION — coming soon */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">More CRMs coming soon</h2>
          <p className="text-slate-600 mt-1">
            We're building these one at a time, prioritized by which gets the most
            requests. Tap "Request access" and we'll let you know when yours ships.
          </p>
        </div>

        {CRM_GROUPS.map((group) => (
          <section key={group.label} className="mb-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {group.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{item.name}</h4>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Coming soon
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                  <a
                    href={requestMailto(item.name)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Request access →
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
