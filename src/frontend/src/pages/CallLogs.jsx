import React, { useState, useEffect } from "react";

export default function CallLogs() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | missed | answered | ai

  useEffect(() => {
    fetchCalls();
  }, [filter]);

  const fetchCalls = async () => {
    try {
      const response = await fetch(`/api/calls?filter=${filter}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCalls(data.calls || []);
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
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

  const formatTime = (d) => {
    const date = new Date(d);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "missed":
        return "bg-red-100 text-red-700";
      case "answered":
        return "bg-green-100 text-green-700";
      case "ai":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Call Logs</h1>
        <p className="text-slate-600 mb-8">View all calls handled by AfterCallPro.</p>

        {/* FILTER TABS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <nav className="flex gap-6 px-6 py-4 text-sm">
            {["all", "missed", "answered", "ai"].map((type) => (
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
            <p className="mt-4 text-gray-600">Loading calls...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && calls.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <p className="text-slate-700 text-lg mb-
