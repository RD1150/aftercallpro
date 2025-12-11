import React, { useState } from "react";

export default function BusinessSettings() {
  const [form, setForm] = useState({
    businessName: "",
    phoneNumber: "",
    timezone: "",
    industry: "",
    autoReply: "",
  });

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Business Settings Saved:", form);
    // Later: send to backend
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

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BUSINESS NAME */}
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
              placeholder="Your business name"
              required
            />
          </div>

          {/* PHONE NUMBER */}
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
              placeholder="(555) 123-4567"
            />
          </div>

          {/* TIMEZONE */}
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

          {/* INDUSTRY */}
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

          {/* AUTO REPLY */}
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
              placeholder="Hi! Thanks for calling — we’ll get back to you shortly."
            ></textarea>
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition"
          >
            Save Settings
          </button>
        </form>
      </div>
    </main>
  );
}
