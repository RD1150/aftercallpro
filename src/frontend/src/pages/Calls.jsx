import React, { useState } from "react";
import { Phone, Search, Filter, Clock, User, MessageSquare } from "lucide-react";

export default function Calls() {
  // Placeholder call data
  const calls = [
    {
      id: 1,
      name: "Kelly S.",
      phone: "(805) 555-2204",
      time: "10:42 AM",
      status: "AI Answered",
      summary: "Requested home value.",
    },
    {
      id: 2,
      name: "Unknown",
      phone: "N/A",
      time: "9:18 AM",
      status: "Voicemail Transcribed",
      summary: "General inquiry.",
    },
    {
      id: 3,
      name: "Mark D.",
      phone: "(818) 555-9021",
      time: "Yesterday",
      status: "Missed - Text Sent",
      summary: "Buyer consult request.",
    },
  ];

  const [search, setSearch] = useState("");

  const filtered = calls.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Call History</h1>
          <p className="text-slate-600 mt-1">
            Review missed calls, AI responses, and call summaries.
          </p>
        </header>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2 w-full md:w-80">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search calls..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-slate-700"
            />
          </div>

          {/* FILTER BUTTON (placeholder) */}
          <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-100 transition">
            <Filter className="w-4 h-4" />
            <span className="text-sm text-slate-700">Filter</span>
          </button>
        </div>

        {/* CALL LIST */}
        <div className="space-y-4">
          {filtered.map((call) => (
            <div
              key={call.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between">
                
                {/* LEFT */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{call.name}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {call.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {call.time}
                    </span>
                  </div>

                  <p className="mt-3 text-slate-700 text-sm">
                    {call.summary}
                  </p>
                </div>

                {/* STATUS TAG */}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    call.status === "AI Answered"
                      ? "bg-green-100 text-green-700"
                      : call.status.includes("Missed")
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {call.status}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
