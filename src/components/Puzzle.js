import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Level1 from "./puzzles/Level1";
import Level2 from "./puzzles/Level2";
import Level3 from "./puzzles/Level3";

export default function Puzzle() {
  const { id } = useParams();
  const nav = useNavigate();

  const [p, setP] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNextLevel, setShowNextLevel] = useState(false);
  const [nextLevelNum, setNextLevelNum] = useState(null);

  // ⏱ LEVEL TIMER
  const [levelStart, setLevelStart] = useState(Date.now());

  useEffect(() => {
    setLevelStart(Date.now());
  }, [id]);

  // ================= TIMER =================
  const getRemainingTime = () => {
    const endTime = Number(localStorage.getItem("endTime"));
    if (!endTime) return 3600;

    const remaining = Math.floor((endTime - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  };

  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingTime();

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        localStorage.setItem("timeUp", "true");

        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // ================= DATA =================
 const API = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${API}/puzzle/${id}`)
    .then((r) => r.json())
    .then((data) => setP(data))
    .catch(() => setP({}));
}, [id]);

  const isLocked = localStorage.getItem("timeUp") === "true";

  // ================= SUBMIT =================
  const submit = async (answer) => {
    if (isLocked) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    try {
    const res = await fetch(`${API}/check`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id, answer }),
});
      const d = await res.json();

      if (d.correct) {
        // ✅ CALCULATE TIME HERE (IMPORTANT)
        const levelEnd = Date.now();
        const levelTime = Math.floor((levelEnd - levelStart) / 1000);

        const startTime = Number(localStorage.getItem("startTime"));
        const totalTime = Math.floor((levelEnd - startTime) / 1000);

        const name = localStorage.getItem("name");
        const roll = localStorage.getItem("roll");
        const teamName = localStorage.getItem("team");

        // ✅ SAVE TO DB
    
await fetch(`${API}/save`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    roll,
    teamName,
    puzzle: Number(id),
    levelTime,
    totalTime,
  }),
});

        const nextPuzzleNum = Number(id) + 1;

        // 🎉 STEP 1: SUCCESS
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);

          if (Number(id) === 3) {
            // 🏁 FINAL
            localStorage.setItem("submitted", "true");
            setShowModal(true);
          } else {
            // 🚀 STEP 2: NEXT LEVEL
            setNextLevelNum(nextPuzzleNum);
            setShowNextLevel(true);

            setTimeout(() => {
              setShowNextLevel(false);
              nav(`/puzzle/${nextPuzzleNum}`);
            }, 3000);
          }
        }, 2000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    } catch (err) {
      console.error(err);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  // ================= UI =================
  return (
    <>
      {/* TIMER */}
      <div style={timerStyle}>
        ⏳ {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      {/* PUZZLES */}
      {Number(id) === 1 && <Level1 p={p} submit={submit} />}
      {Number(id) === 2 && <Level2 submit={submit} />}
      {Number(id) === 3 && <Level3 submit={submit} />}

      {/* FINAL MODAL */}
      {showModal && (
        <Modal bg="#111" color="#FFD700">
          🎉 All Levels Cleared!
        </Modal>
      )}

      {/* ERROR */}
      {showError && (
        <Popup bg="#ff4d4f">❌ Wrong Answer! Try Again</Popup>
      )}

      {/* SUCCESS */}
      {showSuccess && (
        <Modal bg="#FFD700" color="#000">
          ✅ Level {id} Cleared!
        </Modal>
      )}

      {/* NEXT LEVEL */}
      {showNextLevel && (
        <Modal bg="#000" color="#FFD700">
          🚀 Welcome to Level {nextLevelNum}
        </Modal>
      )}
    </>
  );
}

// 🎨 SMALL REUSABLE UI
const timerStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#000",
  color: "#FFD700",
  padding: "10px 20px",
  borderRadius: "10px",
  fontSize: "18px",
  zIndex: 999,
};

const Modal = ({ children, bg, color }) => (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  }}>
    <div style={{
      background: bg,
      color: color,
      padding: "30px 50px",
      borderRadius: "15px",
      fontSize: "20px",
      fontWeight: "bold",
      boxShadow: "0 0 30px rgba(255,215,0,0.5)",
    }}>
      {children}
    </div>
  </div>
);

const Popup = ({ children, bg }) => (
  <div style={{
    position: "fixed",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    background: bg,
    color: "#fff",
    padding: "14px 25px",
    borderRadius: "12px",
    fontWeight: "bold",
    zIndex: 9999,
  }}>
    {children}
  </div>
);