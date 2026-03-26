import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const API = import.meta.env.VITE_API_URL; // ✅ Use live backend

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API}/leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const leaderboardData = await res.json();
        setData(leaderboardData);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();

    // Optional: refresh leaderboard every 5 seconds
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, [API]);

  return (
    <div className="container" style={{ padding: "20px", color: "#000" }}>
      <h1 style={{ textAlign: "center" }}>🏆 Leaderboard</h1>
      {data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No participants yet.</p>
      ) : (
        <ol>
          {data.map((u, i) => (
            <li key={i}>
              {u.name} - {u.timeTaken ? u.timeTaken.toFixed(2) + "s" : "-"}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}