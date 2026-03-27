import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.REACT_APP_API;

  useEffect(() => {
    if (!API) return;

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API}/leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");

        const leaderboardData = await res.json();

        // Sort by time (ascending)
        const sorted = leaderboardData
          .filter((u) => u.timeTaken)
          .sort((a, b) => a.timeTaken - b.timeTaken);

        setData(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      }
    };

    fetchLeaderboard();

    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, [API]);

  return (
    <div style={{ padding: "20px", color: "#000" }}>
      <h1 style={{ textAlign: "center" }}>🏆 Leaderboard</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No participants yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
          border="1"
          cellPadding="10"
        >
          <thead style={{ background: "#eee" }}>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {data.map((u, i) => (
              <tr
                key={u._id || i}
                style={{
                  background:
                    i === 0
                      ? "#ffd700"
                      : i === 1
                      ? "#c0c0c0"
                      : i === 2
                      ? "#cd7f32"
                      : "#fff",
                  fontWeight: i < 3 ? "bold" : "normal",
                }}
              >
                <td>
                  {i === 0
                    ? "🥇"
                    : i === 1
                    ? "🥈"
                    : i === 2
                    ? "🥉"
                    : i + 1}
                </td>

                <td>{u.name || "-"}</td>

                <td>
                  {u.timeTaken
                    ? `${Math.floor(u.timeTaken)}s`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}