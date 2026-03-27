import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Success() {
  const nav = useNavigate();
  const API = process.env.REACT_APP_API;

  const [loading, setLoading] = useState(true);

  // 🔥 Prevent double execution (React Strict Mode fix)
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (!API) return;
    if (localStorage.getItem("submitted")) {
      setLoading(false);
      return;
    }
    if (hasSubmitted.current) return;

    hasSubmitted.current = true;

    const submitData = async () => {
      try {
        const startTime = Number(localStorage.getItem("startTime"));
        const name = localStorage.getItem("name");
        const roll = localStorage.getItem("roll");

        if (!startTime || !name || !roll) {
          setLoading(false);
          return;
        }

        const time = Date.now() - startTime;

        const res = await fetch(`${API}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            roll,
            timeTaken: Math.floor(time / 1000)
          })
        });

        if (!res.ok) throw new Error("Submit failed");

        localStorage.setItem("submitted", "true");

      } catch (err) {
        console.log("Error submitting:", err);
      } finally {
        setLoading(false);
      }
    };

    submitData();
  }, [API]);

  return (
    <div className="success-container">
      <div className="success-card">

        <h1 className="success-title">
          🎉 Congratulations!
        </h1>

        <p className="success-text">
          {loading
            ? "Submitting your result..."
            : "You have successfully completed all the puzzles 🚀"}
        </p>

        <button
          className="success-btn"
          onClick={() => nav("/leaderboard")}
          disabled={loading}
        >
          {loading ? "Please wait..." : "View Leaderboard 🏆"}
        </button>

      </div>
    </div>
  );
}