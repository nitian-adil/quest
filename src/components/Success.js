import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Success() {
  const nav = useNavigate();

const API = import.meta.env.VITE_API_URL;

useEffect(() => {
  const startTime = Number(localStorage.getItem("startTime")); // ✅ FIX
  const time = Date.now() - startTime;

  fetch(`${API}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: localStorage.getItem("name"),
      roll: localStorage.getItem("roll"),
      timeTaken: Math.floor(time / 1000)
    })
  });
}, []);

  return (
    <div className="success-container">
      <div className="success-card">

        <h1 className="success-title">
          🎉 Congratulations!
        </h1>

        <p className="success-text">
          You have successfully completed all the puzzles 🚀
        </p>

        <button 
          className="success-btn"
          onClick={() => nav("/leaderboard")}
        >
          View Leaderboard 🏆
        </button>

      </div>
    </div>
  );
}