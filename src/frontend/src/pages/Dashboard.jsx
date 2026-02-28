import { useAuth } from "../AuthProvider";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: "3rem", fontFamily: "system-ui" }}>
      <h1>Dashboard</h1>
      <p>Your app is working.</p>

      <button onClick={logout} style={{ marginTop: "2rem" }}>
        Log Out
      </button>
    </div>
  );
}
