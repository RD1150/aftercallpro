import React, { useState } from "react";
import { Search, User, Phone, Mail, Calendar, Star } from "lucide-react";

export default function Leads() {
  const [search, setSearch] = useState("");

  const leads = [
    {
      id: 1,
      name: "Kelly S.",
      phone: "(805) 555-1284",
      email: "kelly@example.com",
      source: "AI Missed Call",
      rating: 5,
      status: "Hot",
      lastContact: "2 hrs ago",
    },
    {
      id: 2,
      name: "Mark D.",
      phone: "(818) 555-9234",
      email: "mark@example.com",
      source: "Website Form",
      rating: 3,
      status: "Warm",
      lastContact: "Yesterday",
    },
    {
      id: 3,
      name: "New Lead",
      phone: "(310) 555-8822",
      email: "—",
      source: "AI Text-Back",
      rating: 4,
      status: "New",
      lastContact: "Just now",
    },
  ];

  const filtered = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Leads</h1>

          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search leads..."
              className="outline-none text-sm w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-slate-700 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Lead</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Source</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Last Contact</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    {lead.name}
                  </td>

                  <td className="py-4 px-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {lead.phone}
                    </div>
                    {lead.email !== "—" && (
                      <div className="flex items-center gap-1 mt-1">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {lead.email}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4 text-sm text-slate-600">{lead.source}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {[...Array(lead.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === "Hot"
                          ? "bg-red-100 text-red-700"
                          : lead.status === "Warm"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {lead.lastContact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}
