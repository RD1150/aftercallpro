import React, { useState } from "react";

export default function BusinessSettings() {
  const [form, setForm] = useState({
    businessName: "",
    phoneNumber: "",
    timezone: "",
    industry: "",
    autoReply: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const timezones = [
    "Pacific (PST)",
    "Mountain (MST)",
    "Central (CST)",
    "Eastern (EST)",
  ];

  const industries = [
    "Real Estate",
    "Service Business",
    "Healthcare",
    "Coaching",
    "Legal",
    "Other",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/business/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      setMessage("Settings saved successfully.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Business Settings
        </h1>

        <p className="text-slate-600 mb-8">
          Customize how AfterCallPro handles your business information and automated replies.
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Timezone
            </label>
            <select
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your timezone</option>
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Industry
            </label>
            <select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Default Auto-Reply Message
            </label>
            <textarea
              name="autoReply"
              value={form.autoReply}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </main>
  );
}
