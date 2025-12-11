import React from "react";
import {
  Bell,
  Phone,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-[#1a2c45] mb-8">
          AfterCallPro
        </h1>

        {/* NAVIGATION */}
        <nav className="space-y-4">
          <NavItem icon={<Users size={18} />} label="Dashboard" active />
          <NavItem icon={<Phone size={18} />} label="Calls" />
          <NavItem icon={<MessageSquare size={18} />} label="Messages" />
          <NavItem icon={<Users size={18} />} label="Leads" />
          <NavItem icon={<Settings size={18} />} label="Integrations" />
          <NavItem icon={<CreditCard size={18} />} label="Billing" />
          <NavItem icon={<HelpCircle size={18} />} label="Support" />
        </nav>

        <div className="mt-auto text-xs text-gray-400">
          AfterCallPro © {new Date().getFullYear()}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {/* TOP BAR */}
        <header className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-semibold text-[#1a2c45]">
            Dashboard
          </h2>
          <Bell className="text-gray-600 cursor-pointer hover:text-[#1a2c45]" size={22} />
        </header>

        {/* KPI CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <KpiCard title="Missed Calls Saved" value="17" />
          <KpiCard title="New Leads Captured" value="9" />
          <KpiCard title="Appointments Booked" value="4" />
          <KpiCard title="Avg Response Time" value="0.9 sec" />
        </section>

        {/* GRID | LIVE CALL FEED + TODAY TASKS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* LIVE CALL FEED */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[#1a2c45] mb-4">
              Live Call Feed
            </h3>

            <CallItem number="(805) 555-1284" status="AI answered" />
            <CallItem number="(818) 899-2301" status="Transcription ready" />
            <CallItem number="Unknown" status="Voicemail converted" />

            <button className="mt-4 text-sm text-[#1a2c45] font-medium hover:underline">
              View all calls →
            </button>
          </div>

          {/* TODAY’S FOLLOW UPS */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[#1a2c45] mb-4">
              Today’s Follow-Ups
            </h3>

            <TaskItem task="Follow up with lead: Jennifer L." />
            <TaskItem task="Send intro text to: Matt P." />
            <TaskItem task="Review yesterday’s call log" />

            <button className="mt-4 text-sm text-[#1a2c45] font-medium hover:underline">
              View lead inbox →
            </button>
          </div>
        </section>

        {/* RECENT CALL SUMMARIES */}
        <section className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-10">
          <h3 className="text-lg font-semibold text-[#1a2c45] mb-4">
            Recent Call Summaries
          </h3>

          <SummaryItem
            name="Kelly S."
            topic="Requesting home value"
            status="Hot Lead – Needs follow-up within 4 hrs"
          />
          <SummaryItem
            name="Mark D."
            topic="Buyer consult"
            status="Booked for Thursday"
          />
        </section>

        {/* PIPELINE */}
        <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1a2c45] mb-4">
            Lead Pipeline
          </h3>

          <div className="flex items-center justify-between">
            {["New", "Contacted", "Qualified", "Booked", "Closed"].map(
              (stage, idx) => (
                <PipelineStage
                  key={idx}
                  label={stage}
                  count={Math.floor(Math.random() * 10) + 1}
                />
              )
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

/* COMPONENTS -------------------------------------------------------------- */

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
        active
          ? "bg-gray-100 text-[#1a2c45] font-semibold"
          : "text-gray-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-bold text-[#1a2c45] mt-2">{value}</p>
    </div>
  );
}

function CallItem({ number, status }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <div>
        <p className="font-medium">{number}</p>
        <p className="text-sm text-gray-500">{status}</p>
      </div>
      <Phone size={18} className="text-[#1a2c45]" />
    </div>
  );
}

function TaskItem({ task }) {
  return (
    <div className="py-2 border-b border-gray-100 text-gray-700">{task}</div>
  );
}

function SummaryItem({ name, topic, status }) {
  return (
    <div className="py-3 border-b border-gray-100">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600">Topic: {topic}</p>
      <p className="text-sm text-[#1a2c45] font-medium">{status}</p>
    </div>
  );
}

function PipelineStage({ label, count }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-[#1a2c45] text-white flex items-center justify-center font-semibold">
        {count}
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
}
