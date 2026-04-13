import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.REACT_APP_API;

  const fetchUsers = async () => {
    if (!API) return;

    try {
      const res = await fetch(`${API}/users`);

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();

      const sorted = data
        .filter((u) => u.timeTaken)
        .sort((a, b) => a.timeTaken - b.timeTaken);

      setUsers(sorted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  // ✅ DELETE FUNCTION
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      console.log("API URL:", API);
      const res = await fetch(`${API}/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      // Remove from UI instantly
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(fetchUsers, 5000);

    return () => clearInterval(interval);
  }, [API]);

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1 style={{ textAlign: "center" }}>
        🏆 Admin Leaderboard
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading data...</p>
      ) : (
        <table
          border="1"
          cellPadding="12"
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
        <thead style={{ background: "#ddd" }}>
  <tr>
    <th>Rank</th>
    <th>Name</th>
    <th>Roll</th>
    <th>Team</th>
    <th>P1 (sec)</th>
    <th>P2 (sec)</th>
    <th>P3 (sec)</th>
    <th>Total (sec)</th>
    <th>Action</th>
  </tr>
</thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
<td colSpan="9">No participants yet.</td>
              </tr>
            ) : (
              users.map((u, i) => (
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
                  }}
                >
                  <td>{i + 1}</td>
                  <td>{u.name || "-"}</td>
                  <td>{u.roll || "-"}</td>
                  <td>{u.teamName || "-"}</td>

                  <td>{u.puzzle1Time ? `${u.puzzle1Time}s` : "-"}</td>
                  <td>{u.puzzle2Time ? `${u.puzzle2Time}s` : "-"}</td>
                  <td>{u.puzzle3Time ? `${u.puzzle3Time}s` : "-"}</td>

                  <td>
                    {u.timeTaken
                      ? `${Math.floor(u.timeTaken)}s`
                      : "-"}
                  </td>

                  {/* ✅ DELETE BUTTON */}
                  <td>
                    <button
                      onClick={() => deleteUser(u._id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}