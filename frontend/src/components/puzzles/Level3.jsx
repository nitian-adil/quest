import { useState, useEffect } from "react";

export default function Level3({ submit }) {
  const [realAns, setRealAns] = useState("");
  const [fakeTime, setFakeTime] = useState(60);

  // 🔴 moving red button (CENTER AREA ONLY)
  const [btnPos, setBtnPos] = useState({
    top: "50%",
    left: "50%",
  });

const moveButton = () => {
  setBtnPos({
    top: `${20 + Math.random() * 60}%`,   // stays inside small box
    left: `${20 + Math.random() * 60}%`,
  });
};
  // ⏳ TIMER (STOP AT 5)
  useEffect(() => {
    const t = setInterval(() => {
      setFakeTime((prev) => {
        if (prev <= 5) return 5;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  // 🧠 auto reset input
  useEffect(() => {
    const reset = setInterval(() => {
      if (Math.random() > 0.7) {
        setRealAns("");
      }
    }, 4000);
    return () => clearInterval(reset);
  }, []);

 

  return (
    <div
     
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        backgroundImage: "url('/images/ipl.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
        }}
      />

      {/* ⏳ TIMER */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          background: "#ff0000",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "10px",
          fontWeight: "bold",
          zIndex: 9999,
        }}
      >
        ⏳ Time Left: {fakeTime}s
      </div>

      {/* 🔥 LEFT → LINKEDIN (FAKE) */}
     {/* 🔥 LEFT → LINKEDIN (FAKE) */}
<div
  style={{
    position: "absolute",
    left: "80px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "230px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    zIndex: 2,
  }}
>
  <img src="/images/linkdin.png" style={{ width: "45px", marginBottom: "10px" }} />
  <p>Try here?</p>

  <input
    placeholder="Type here..."
    style={{
      width: "100%",
      padding: "8px",
      marginTop: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    }}
  />

  {/* 🔴 MOVING BUTTON INSIDE BOX */}
  <div
    style={{
      position: "relative",
      height: "60px",
      marginTop: "10px",
      overflow: "hidden",
    }}
  >
    <button
      onMouseEnter={moveButton}
      style={{
        position: "absolute",
        top: btnPos.top,
        left: btnPos.left,
        transform: "translate(-50%, -50%)",
        background: "red",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "12px",
        transition: "0.2s",
      }}
    >
      ✔
    </button>
  </div>
</div>

  
      {/* 🔥 RIGHT → FACEBOOK (REAL) */}
      <div
        style={{
          position: "absolute",
          right: "80px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "230px",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <img src="/images/facebook.png" style={{ width: "45px", marginBottom: "10px" }} />
        <p>Try here 👇 (nickname)</p>

        <input
          value={realAns}
          onChange={(e) => setRealAns(e.target.value)}
          placeholder="Type here..."
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={() => submit(realAns)}
          style={{
            width: "100%",
            padding: "8px",
            background: "green",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✔ 
        </button>
      </div>

      {/* 🎯 CENTER PUZZLE */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: "340px",
          padding: "25px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <img src="/images/insta.png" style={{ width: "70px" }} />

        <p style={{ color: "red", fontWeight: "bold" }}>
          "Most followed, yet not the world's crown 👑"
        </p>

      
      </div>

      {/* FOOTER */}
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "50px",
          background: "#111",
          color: "#facc15",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
          fontSize: "13px",
          zIndex: 5,
          boxSizing: "border-box",
        }}
      >
        <div>
          🎓 Organized by <b style={{ color: "#fff" }}>CollegeDekho</b>
        </div>

        <div>
          ✨ Created by <b style={{ color: "#fff" }}>Adil Ahmad</b>
        </div>
      </footer>
    </div>
  );
}