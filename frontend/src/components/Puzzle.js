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

  const API = process.env.REACT_APP_API;

  // ================= LEVEL TIMER =================
  const [levelStart, setLevelStart] = useState(Date.now());

  useEffect(() => {
    setLevelStart(Date.now());
  }, [id]);

  // ================= GLOBAL TIMER =================
  const getRemainingTime = () => {
    const endTime = Number(localStorage.getItem("endTime"));
    if (!endTime) return 3600;

    const remaining = Math.floor((endTime - Date.now()) / 1000);
    return Math.max(remaining, 0);
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
        setTimeout(() => {
          setShowError(false);
          nav("/"); // optional redirect
        }, 3000);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // ================= LOAD PUZZLE =================
  useEffect(() => {
    if (!API) return;

    const loadPuzzle = async () => {
      try {
        const res = await fetch(`${API}/puzzle/${id}`);
        if (!res.ok) throw new Error("Failed to load puzzle");

        const data = await res.json();
        setP(data);
      } catch (err) {
        console.log("Error loading puzzle:", err);
        setP({});
      }
    };

    loadPuzzle();
  }, [id, API]);

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, answer })
      });

      if (!res.ok) throw new Error("Check failed");

      const d = await res.json();

      if (d.correct) {
        const levelEnd = Date.now();
        const levelTime = Math.floor((levelEnd - levelStart) / 1000);

        const startTime = Number(localStorage.getItem("startTime"));
        const totalTime = Math.floor((levelEnd - startTime) / 1000);

        const name = localStorage.getItem("name");
        const roll = localStorage.getItem("roll");
        const teamName = localStorage.getItem("team");

        // ================= SAVE =================
        const saveRes = await fetch(`${API}/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            roll,
            teamName,
            puzzle: Number(id),
            levelTime,
            totalTime
          })
        });

        if (!saveRes.ok) throw new Error("Save failed");

        const nextPuzzleNum = Number(id) + 1;

        // SUCCESS UI
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);

          if (Number(id) === 3) {
            localStorage.setItem("submitted", "true");
            setShowModal(true);
          } else {
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
      console.error("Submit error:", err);
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

      {/* FINAL */}
      {showModal && (
        <Modal bg="#111" color="#FFD700">
          🎉 All Levels Cleared!
        </Modal>
      )}

      {/* ERROR */}
      {showError && (
        <Popup bg="#ff4d4f">❌ Wrong Answer or Time Up!</Popup>
      )}

      {/* SUCCESS */}
      {showSuccess && (
        <Modal bg="#FFD700" color="#000">
          ✅ Level {id} Cleared!
        </Modal>
      )}

      {/* NEXT */}
      {showNextLevel && (
        <Modal bg="#000" color="#FFD700">
          🚀 Welcome to Level {nextLevelNum}
        </Modal>
      )}
    </>
  );
}

// ================= UI COMPONENTS =================
const timerStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#000",
  color: "#FFD700",
  padding: "10px 20px",
  borderRadius: "10px",
  fontSize: "18px",
  zIndex: 999
};

const Modal = ({ children, bg, color }) => (
  <div style={overlayStyle}>
    <div style={{ ...modalBox, background: bg, color }}>
      {children}
    </div>
  </div>
);

const Popup = ({ children, bg }) => (
  <div style={{ ...popupStyle, background: bg }}>
    {children}
  </div>
);

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modalBox = {
  padding: "30px 50px",
  borderRadius: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  boxShadow: "0 0 30px rgba(255,215,0,0.5)"
};

const popupStyle = {
  position: "fixed",
  top: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  color: "#fff",
  padding: "14px 25px",
  borderRadius: "12px",
  fontWeight: "bold",
  zIndex: 9999
};