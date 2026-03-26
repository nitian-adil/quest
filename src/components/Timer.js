import { useEffect, useState } from "react";

export default function Timer({ startTime }) {
  const TOTAL_TIME = 60 * 60; // 1 hour in seconds

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = TOTAL_TIME - elapsed;

      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const format = (t) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;

    return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#000",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "10px",
        fontWeight: "bold",
        zIndex: 999,
      }}
    >
      ⏳ {format(timeLeft)}
    </div>
  );
}