import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plug, CheckCircle, AlertCircle } from "lucide-react";

// CRM integrations we plan to build, grouped by vertical. Each entry pings
// support@ via a mailto when the user asks for early access — that's the
// signal we use to prioritize which vertical to ship first.
//
// Real-estate CRMs (FollowUpBoss, kvCORE, Lofty, BoomTown) are intentionally
// excluded — see memory: aftercallpro_no_crm + aftercallpro_icp.
const CRM_GROUPS = [
  {
    label: "General",
    items: [
      { name: "HubSpot", desc: "Push leads + call summaries into HubSpot contacts." },
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
  {
    label: "Anything else",
    items: [
      { name: "Webhook", desc: "Fire a JSON POST to your URL on every captured call. Wire it to anything." },
      { name: "Zapier", desc: "Trigger Zaps from new calls, captured leads, or booked appointments." },
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

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Integrations</h1>
        <p className="text-slate-600 mb-10">
          Connect your CRM, calendar, and automation tools.
        </p>

        {/* CALENDAR CARD — real and working */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Plug className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Calendar Integration</h2>
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

        {/* CRM SECTION — coming soon, mailto request to gauge demand */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Push leads to your CRM</h2>
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
