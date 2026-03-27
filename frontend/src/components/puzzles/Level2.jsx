import { useState } from "react";
import "../../level2.css";

export default function Level2({ submit }) {
  const [ans, setAns] = useState("");
  // const [hintIndex, setHintIndex] = useState(0);
  const [shake, setShake] = useState(false);

  // const hints = [
  //   "💰 It stores money...",
  //   "✈️ It travels long distances...",
  //   "🐪 It survives in desert..."
  // ];

  const placeholders = [
    "Enter your answer...",
    "Think again...",
    "Are you sure? 😏",
    "Try something else..."
  ];

  const handleSubmit = () => {
    if (ans.toLowerCase() !== "camel") {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    submit(ans);
  };

  return (
    <div className="level2-container">

      <div className="level2-card">
        <h1 className="level2-title">🧩 Level 2</h1>

        {/* RIDDLE */}
        <p className="level2-riddle">
          "Not a bank, yet I store; not a traveler, yet I journey far.
          In the harshest lands, I thrive where others fall."
        </p>

        {/* 🔥 FAKE CLUES */}
        <div className="fake-clues">
          <span>💰 Bank</span>
          <span>✈️ Travel</span>
        
          <span>💾 Storage</span>
        </div>

        {/* INPUT */}
        <input
          className={`level2-input ${shake ? "shake" : ""}`}
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]}
        />

        {/* BUTTONS */}
        <button className="level2-btn" onClick={handleSubmit}>
          🚀 Submit Answer
        </button>

        {/* 🔥 HINT BUTTON */}
    

        {/* SHOW HINT */}
      </div>

      {/* FOOTER */}
      <footer className="level2-footer">
        <div>🎓 Organized by <b>CollegeDekho</b></div>
        <div>✨ Created by <b>Adil Ahmad</b></div>
      </footer>
    </div>
  );
}