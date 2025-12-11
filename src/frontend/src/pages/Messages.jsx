import React, { useState } from "react";
import { Send, MessageCircle, User, Phone, Clock } from "lucide-react";

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Sample placeholder conversation list
  const conversations = [
    {
      id: 1,
      name: "Jennifer Lopez",
      phone: "(805) 555-1299",
      lastMessage: "Thank you so much!",
      time: "2:15 PM",
    },
    {
      id: 2,
      name: "Mark Davidson",
      phone: "(818) 555-8821",
      lastMessage: "Can we talk tomorrow?",
      time: "11:03 AM",
    }
  ];

  // Sample placeholder conversation messages
  const messages = [
    { id: 1, from: "customer", text: "Hi, I’m interested in your services!", time: "2:12 PM" },
    { id: 2, from: "agent", text: "Great! How can I help you today?", time: "2:13 PM" },
    { id: 3, from: "customer", text: "What is your pricing?", time: "2:15 PM" }
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex">

      {/* LEFT COLUMN — CONVERSATION LIST */}
      <aside className="w-80 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Messages</h2>

        <div className="space-y-4">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedConversation(c)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                selectedConversation?.id === c.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-slate-500">{c.lastMessage}</p>
              <p className="text-xs text-slate-400 mt-1">{c.time}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT COLUMN — MESSAGE THREAD */}
      <section className="flex-1 p-10">

        {!selectedConversation ? (
          <div className="h-full flex items-center justify-center text-slate-500">
            <MessageCircle className="w-6 h-6 mr-2" />
            Select a conversation to view messages
          </div>
        ) : (
          <>
            {/* HEADER */}
            <header className="flex items-center justify-between border-b pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedConversation.name}</h3>
                <div className="flex items-center space-x-4 text-slate-600 text-sm mt-1">
                  <span className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {selectedConversation.phone}</span>
                </div>
              </div>
            </header>

            {/* MESSAGE THREAD */}
            <div className="space-y-4 mb-8">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-md p-3 rounded-lg ${
                    m.from === "agent"
                      ? "bg-blue-100 text-slate-900 ml-auto"
                      : "bg-gray-200 text-slate-800"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{m.time}</p>
                </div>
              ))}
            </div>

            {/* INPUT BOX */}
            <form className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

      </section>
    </main>
  );
}
