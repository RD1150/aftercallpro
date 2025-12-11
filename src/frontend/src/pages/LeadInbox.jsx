import React, { useState, useEffect } from "react";

export default function LeadInbox() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("new"); // new | active | closed

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`/api/leads?filter=${filter}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getBadgeColor = (stage) => {
    switch (stage) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "active":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Lead Inbox</h1>
        <p className="text-slate-600 mb-8">
          View and manage all leads captured by AfterCallPro.
        </p>

        {/* FILTER TABS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <nav className="flex gap-6 px-6 py-4 text-sm">
            {["new", "active", "closed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`pb-2 border-b-2 capitalize ${
                  filter === type
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </nav>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading leads...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && leads.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <p className="text-slate-700 text-lg mb-2">No leads found</p>
            <p className="text-slate-500">
              Leads will automatically appear here as your AI assistant captures them.
            </p>
          </div>
        )}

        {/* LEAD LIST */}
        {!loading && leads.length > 0 && (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    {/* NAME */}
                    <h3 className="text-lg font-semibold text-slate-900">
                      {lead.name || "Unknown Caller"}
                    </h3>

                    {/* CONTACT INFO */}
                    <p className="text-slate-600 mt-1">{lead.phone}</p>
                    {lead.email && (
                      <p className="text-slate-600">{lead.email}</p>
                    )}

                    {/* MESSAGE */}
                    {lead.message && (
                      <p className="mt-3 text-slate-700 bg-gray-50 p-3 rounded-lg text-sm">
                        {lead.message}
                      </p>
                    )}

                    {/* DATE */}
                    <p className="text-xs text-slate-400 mt-3">
                      Received on {formatDate(lead.created_at)}
                    </p>
                  </div>

                  {/* STATUS BADGE */}
                  <span
                    className={`px-3 py-1 text-sm rounded-full capitalize font-medium ${getBadgeColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 mt-6">
                  <button className="text-blue-600 hover:underline text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-slate-600 hover:underline text-sm">
                    Add Note
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

