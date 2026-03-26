import { useState } from "react";
import "../../style.css";

export default function Level1({ submit }) {
  const [ans, setAns] = useState("");

  const letters = ["B", "L", "A", "Y", "E", "I", "X", "Q", "R", "M", "R", "A"];

  return (
    <div className="level1-container">

      {/* MAIN CONTENT */}
      <div className="level1-main">

        {/* LEFT → LETTERS */}
        <div className="level1-left">
          {letters.map((l, i) => (
            <span key={i} className={`letter letter-${i}`}>
              {l}
            </span>
          ))}
        </div>

        {/* RIGHT → INPUT */}
        <div className="level1-right">
          <div className="right-content">
            <h1>🧩 Level 1</h1>
            <p>Arrange the letters to find the correct word 🔤</p>

            <input
              value={ans}
              onChange={(e) => setAns(e.target.value)}
              placeholder="Enter your answer..."
            />

            <button onClick={() => submit(ans)}>
              🚀 Submit Answer
            </button>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="level1-footer">
        <div className="footer-left">
          🎓 Organized by <b>CollegeDekho</b>
        </div>

        <div className="footer-right">
          ✨ Created by <b>Adil Ahmad</b>
        </div>
      </footer>

    </div>
  );
}