import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);

  // ✅ Use live backend from env
  const API = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();

      const sorted = data
        .filter((u) => u.timeTaken)
        .sort((a, b) => a.timeTaken - b.timeTaken);

      setUsers(sorted);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers(); // initial fetch
    const interval = setInterval(fetchUsers, 3000); // refresh every 3s
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1 style={{ textAlign: "center", color: "black" }}>
        🏆 Admin Leaderboard
      </h1>

      <table
        border="1"
        cellPadding="12"
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
          color: "black",
        }}
      >
        <thead style={{ background: "#ddd", color: "black" }}>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Roll</th>
            <th>Team</th>
            <th>P1 (sec)</th>
            <th>P2 (sec)</th>
            <th>P3 (sec)</th>
            <th>Total (sec)</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8">No participants yet.</td>
            </tr>
          ) : (
            users.map((u, i) => (
              <tr
                key={i}
                style={{
                  color: "black",
                  background:
                    i === 0
                      ? "#ffd700"
                      : i === 1
                      ? "#c0c0c0"
                      : i === 2
                      ? "#cd7f32"
                      : "#fff",
                }}
              >
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.roll}</td>
                <td>{u.teamName}</td>
                <td>{u.puzzle1Time ? u.puzzle1Time + "s" : "-"}</td>
                <td>{u.puzzle2Time ? u.puzzle2Time + "s" : "-"}</td>
                <td>{u.puzzle3Time ? u.puzzle3Time + "s" : "-"}</td>
                <td>{u.timeTaken ? u.timeTaken.toFixed(2) + "s" : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}