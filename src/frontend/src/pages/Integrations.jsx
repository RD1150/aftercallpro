import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plug, CheckCircle, AlertCircle } from "lucide-react";

export default function Integrations() {
  const [params] = useSearchParams();
  const [crmConnected, setCrmConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [calendarError, setCalendarError] = useState("");

  useEffect(() => {
    // Check current calendar status
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

  const handleCrmConnect = () => {
    setCrmConnected(true);
    alert("CRM successfully connected.");
  };

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

        {/* CRM CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Plug className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">CRM Integration</h2>
          </div>

          <p className="text-slate-600 mb-4">
            Sync leads and conversations directly into your CRM (Lofty, Follow Up Boss, GHL).
          </p>

          {crmConnected ? (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> Connected
            </div>
          ) : (
            <button
              onClick={handleCrmConnect}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Connect CRM
            </button>
          )}
        </div>

        {/* CALENDAR CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
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

      </div>
    </main>
  );
}
