import React from "react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold text-[var(--navy)] mb-8">AfterCallPro</h2>

        <nav className="flex flex-col space-y-4 text-slate-700">
          <a href="/dashboard" className="hover:text-blue-600 font-medium">
            Overview
          </a>

          <a href="/calls" className="hover:text-blue-600">Calls</a>
          <a href="/messages" className="hover:text-blue-600">Messages</a>
          <a href="/appointments" className="hover:text-blue-600">Appointments</a>
          <a href="/settings" className="hover:text-blue-600">Settings</a>
        </nav>

        <div className="mt-auto">
          <button className="w-full bg-red-100 text-red-600 hover:bg-red-200 font-semibold py-2 rounded-lg transition">
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-6 md:p-10">

        {/* TOP BAR FOR MOBILE */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Menu</button>
        </div>

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Welcome back!</h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <p className="text-sm text-slate-500">Missed Calls Captured</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">184</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <p className="text-sm text-slate-500">Appointments Booked</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">62</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <p className="text-sm text-slate-500">AI Follow-Ups Sent</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">431</h2>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>

        <div className="space-y-4">

          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <p className="font-medium text-slate-800">
              Missed call from <span className="text-blue-600">Michael P.</span>
            </p>
            <p className="text-sm text-slate-500">AI sent SMS follow-up • 2 minutes ago</p>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <p className="font-medium text-slate-800">
              New appointment booked with <span className="text-blue-600">Sarah W.</span>
            </p>
            <p className="text-sm text-slate-500">Today at 1:00 PM</p>
          </div>

          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <p className="font-medium text-slate-800">
              AI follow-up sent to <span className="text-blue-600">Leads List</span>
            </p>
            <p className="text-sm text-slate-500">Yesterday • 5:45 PM</p>
          </div>

        </div>

      </section>
    </main>
  );
}
