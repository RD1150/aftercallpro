// Floating AI chat assistant for the marketing site. Answers visitor
// questions about AfterCallPro via POST /api/assistant/chat.
//
// Rendered globally in App.jsx. Conversation lives in component state only —
// nothing is persisted. Styling matches the site's navy/gold palette
// (see SaleBanner.jsx) with inline styles, no extra dependencies.

import { useEffect, useRef, useState } from "react";

const GOLD = "#f7c948";
const NAVY_DEEP = "#0b1220";
const NAVY_MID = "#0f1c34";
const NAVY_PANEL = "#111f38";
const TEXT_PRIMARY = "#E6EDF3";
const TEXT_SECONDARY = "#9BA8B8";

const GREETING =
  "Hi! I'm the AfterCallPro assistant. Ask me anything about how it works, " +
  "pricing, integrations, or getting started.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  // messages: [{ role: "user" | "assistant", content: string }]
  const [messages, setMessages] = useState([
    { role: "assistant", content: GREETING },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, sending]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send only user/assistant turns (drop the local greeting bubble).
        body: JSON.stringify({
          messages: next
            .filter((m, i) => !(i === 0 && m.role === "assistant"))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      const reply =
        data.reply ||
        "Sorry — I'm having trouble right now. Please email support@aftercallpro.com.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry — I couldn't reach the server. Please email support@aftercallpro.com.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div style={styles.root}>
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <div>
              <div style={styles.headerTitle}>AfterCallPro Assistant</div>
              <div style={styles.headerSub}>Typically replies instantly</div>
            </div>
            <button
              aria-label="Close chat"
              style={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div style={styles.messages} ref={scrollRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.bubble,
                  ...(m.role === "user" ? styles.bubbleUser : styles.bubbleBot),
                }}
              >
                {m.content}
              </div>
            ))}
            {sending && (
              <div style={{ ...styles.bubble, ...styles.bubbleBot }}>…</div>
            )}
          </div>

          <div style={styles.inputRow}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask a question…"
              style={styles.input}
            />
            <button
              onClick={send}
              disabled={sending || !input.trim()}
              style={{
                ...styles.sendBtn,
                ...(sending || !input.trim() ? styles.sendBtnDisabled : {}),
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        aria-label={open ? "Close chat" : "Open chat"}
        style={styles.launcher}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "Chat with us"}
      </button>
    </div>
  );
}

const styles = {
  root: {
    position: "fixed",
    bottom: "1.25rem",
    right: "1.25rem",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  launcher: {
    background: `linear-gradient(90deg, ${GOLD} 0%, #e0a82e 100%)`,
    color: NAVY_DEEP,
    border: "none",
    borderRadius: "999px",
    padding: "0.75rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
  },
  panel: {
    width: "min(360px, calc(100vw - 2.5rem))",
    height: "min(520px, calc(100vh - 7rem))",
    marginBottom: "0.75rem",
    background: NAVY_DEEP,
    border: `1px solid ${NAVY_PANEL}`,
    borderRadius: "14px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: NAVY_MID,
    padding: "0.85rem 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${NAVY_PANEL}`,
  },
  headerTitle: { color: TEXT_PRIMARY, fontWeight: 700, fontSize: "0.95rem" },
  headerSub: { color: TEXT_SECONDARY, fontSize: "0.75rem", marginTop: "2px" },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: TEXT_SECONDARY,
    fontSize: "1.5rem",
    lineHeight: 1,
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  bubble: {
    maxWidth: "85%",
    padding: "0.6rem 0.8rem",
    borderRadius: "12px",
    fontSize: "0.88rem",
    lineHeight: 1.45,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  bubbleBot: {
    background: NAVY_PANEL,
    color: TEXT_PRIMARY,
    alignSelf: "flex-start",
    borderBottomLeftRadius: "4px",
  },
  bubbleUser: {
    background: GOLD,
    color: NAVY_DEEP,
    alignSelf: "flex-end",
    fontWeight: 600,
    borderBottomRightRadius: "4px",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
    padding: "0.75rem",
    borderTop: `1px solid ${NAVY_PANEL}`,
    background: NAVY_MID,
  },
  input: {
    flex: 1,
    resize: "none",
    background: NAVY_DEEP,
    color: TEXT_PRIMARY,
    border: `1px solid ${NAVY_PANEL}`,
    borderRadius: "8px",
    padding: "0.55rem 0.7rem",
    fontSize: "0.88rem",
    fontFamily: "inherit",
    outline: "none",
  },
  sendBtn: {
    background: `linear-gradient(90deg, ${GOLD} 0%, #e0a82e 100%)`,
    color: NAVY_DEEP,
    border: "none",
    borderRadius: "8px",
    padding: "0 1rem",
    fontWeight: 700,
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  sendBtnDisabled: { opacity: 0.5, cursor: "default" },
};
