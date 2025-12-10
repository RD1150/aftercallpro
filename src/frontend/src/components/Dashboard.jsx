import React from "react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 pt-28 pb-20">
      <div className="max-w-screen-xl mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Overview of your AI receptionist activity.
          </p>
        </div>

        {/* TOP METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {/* Metric Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm">Missed Calls Captured</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">42</h2>
          </div>

          {/* Metric Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm">Appointments Booked</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">17</h2>
          </div>

          {/* Metric Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm">Follow-Up Messages Sent</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">109</h2>
          </div>

          {/* Metric Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm">Response Rate</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">86%</h2>
          </div>
        </div>

        {/* ACTIVITY FEED */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h3 className="text-2xl font-semibold mb-6 text-slate-900">Recent Activity</h3>

          <div className="space-y-5">

            {/* Activity Item */}
            <div className="border-b border-gray-100 pb-4">
              <p className="font-medium text-slate-800">Missed call captured</p>
              <p className="text-sm text-slate-500">Caller: (805) 555-1923 — 2 hours ago</p>
            </div>

            {/* Activity Item */}
            <div className="border-b border-gray-100 pb-4">
              <p className="font-medium text-slate-800">Appointment booked</p>
              <p className="text-sm text-slate-500">With: Sarah Lewis — Tomorrow at 3:00 PM</p>
            </div>

            {/* Activity Item */}
            <div className="border-b border-gray-100 pb-4">
              <p className="font-medium text-slate-800">Follow-up message sent</p>
              <p className="text-sm text-slate-500">Lead responded "Thank you!" — Yesterday</p>
            </div>

            {/* Activity Item */}
            <div className="">
              <p className="font-medium text-slate-800">New script update</p>
              <p className="text-sm text-slate-500">Your AI now uses the updated intro message.</p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
