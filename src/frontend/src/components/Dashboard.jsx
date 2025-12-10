import React from "react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">
          A simple preview dashboard. When you're ready, we’ll integrate real data from your backend.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        <div className="bg-white p-8 shadow rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900">128</h2>
          <p className="text-slate-600 mt-1">Missed Calls Captured</p>
        </div>

        <div className="bg-white p-8 shadow rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900">92</h2>
          <p className="text-slate-600 mt-1">Auto Follow-Ups Sent</p>
        </div>

        <div className="bg-white p-8 shadow rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900">34</h2>
          <p className="text-slate-600 mt-1">Appointments Booked</p>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl border border-gray-200 p-8">

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>

        <ul className="space-y-4">

          <li className="flex justify-between items-center border-b pb-4">
            <span className="text-slate-700">New missed call captured from (805) 555-9123</span>
            <span className="text-slate-500 text-sm">2 min ago</span>
          </li>

          <li className="flex justify-between items-center border-b pb-4">
            <span className="text-slate-700">Auto-reply sent to (323) 555-4410</span>
            <span className="text-slate-500 text-sm">7 min ago</span>
          </li>

          <li className="flex justify-between items-center border-b pb-4">
            <span className="text-slate-700">Appointment booked via SMS assistant</span>
            <span className="text-slate-500 text-sm">22 min ago</span>
          </li>

          <li className="flex justify-between items-center">
            <span className="text-slate-700">Lead synced to CRM (Lofty)</span>
            <span className="text-slate-500 text-sm">1 hour ago</span>
          </li>

        </ul>
      </div>

    </main>
  );
}
