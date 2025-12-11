import React from "react";

export default function CallHistory() {
  // Temporary static data; real API can replace this later
  const calls = [
    {
      name: "Michael P.",
      number: "(818) 555-1290",
      type: "missed",
      time: "2 minutes ago",
    },
    {
      name: "Redwood Dental",
      number: "(805) 223-9184",
      type: "answered",
      time: "Today • 10:14 AM",
    },
    {
      name: "Sarah W.",
      number: "(310) 445-1188",
      type: "missed",
      time: "Today • 9:03 AM",
    },
    {
      name: "Unknown Caller",
      number: "(---) --------",
      type: "voicemail",
      time: "Yesterday",
    },
  ];

  return (
    <div className="p-6 md:p-10 w-full">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Call History</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
          All
        </button>
        <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
          Missed
        </button>
        <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
          Answered
        </button>
        <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
          Voicemail
        </button>
      </div>

      {/* CALL LIST */}
      <div className="space-y-4">
        {calls.map((call, index) => (
          <div
            key={index}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold text-slate-800">{call.name}</p>
              <p className="text-sm text-slate-500">{call.number}</p>
            </div>

            <div className="text-right">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  call.type === "missed"
                    ? "bg-red-100 text-red-600"
                    : call.type === "answered"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
              </span>
              <p className="text-sm text-slate-500 mt-1">{call.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
