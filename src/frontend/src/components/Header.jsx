@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global base */
:root {
  --navy: #0b1524;
  --navy-2: #142137;
  --gold: #c9a227;
  --text: #0f172a;
  --muted: #475569;
  --bg: #f8fafc;
  --card: #ffffff;
  --border: #e5e7eb;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
}

/* Optional helpers (safe even if unused) */
.container-max {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.acp-shadow {
  box-shadow: 0 12px 40px rgba(2, 6, 23, 0.08);
}

.acp-btn {
  background: var(--navy);
  color: white;
  border-radius: 0.75rem;
  padding: 0.85rem 1.1rem;
  font-weight: 600;
  transition: background 200ms ease, transform 200ms ease;
}

.acp-btn:hover {
  background: var(--navy-2);
  transform: translateY(-1px);
}

.acp-btn-outline {
  background: white;
  color: var(--navy);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.85rem 1.1rem;
  font-weight: 600;
  transition: border-color 200ms ease, transform 200ms ease;
}

.acp-btn-outline:hover {
  border-color: rgba(15, 23, 42, 0.35);
  transform: translateY(-1px);
}
