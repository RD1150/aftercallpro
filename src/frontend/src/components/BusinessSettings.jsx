import React, { useEffect, useState } from "react";

const TIMEZONES = [
  { value: "America/Los_Angeles", label: "Pacific (Los Angeles)" },
  { value: "America/Denver",      label: "Mountain (Denver)" },
  { value: "America/Phoenix",     label: "Mountain - no DST (Phoenix)" },
  { value: "America/Chicago",     label: "Central (Chicago)" },
  { value: "America/New_York",    label: "Eastern (New York)" },
  { value: "America/Anchorage",   label: "Alaska" },
  { value: "Pacific/Honolulu",    label: "Hawaii" },
];

export default function BusinessSettings() {
  const [form, setForm] = useState({
    business_name: "",
    phone_number: "",
    timezone: "",
    ai_greeting: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/business/settings", { credentials: "include" });
        if (!res.ok) throw new Error("load failed");
        const data = await res.json();
        setForm({
          business_name: data.business_name || data.name || "",
          phone_number: data.phone_number || "",
          timezone: data.timezone || "",
          ai_greeting: data.ai_greeting || "",
        });
      } catch {
        setError("Couldn't load your settings. You can still save new values below.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/business/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("save failed");
      setMessage("Settings saved.");
    } catch {
      setError("Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Settings</h1>
        <p className="text-slate-600 mb-8">
          Customize how AfterCallPro handles your business information.
        </p>

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                name="business_name"
                value={form.business_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
              <select
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select your timezone</option>
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Used when the AI books appointments and reads back times.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">AI Greeting</label>
              <textarea
                name="ai_greeting"
                value={form.ai_greeting}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
