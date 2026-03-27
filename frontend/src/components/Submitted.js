import { useNavigate } from "react-router-dom";
import "../style.css";

export default function Submitted() {
  const nav = useNavigate();

  return (
   <div
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white"
  }}
>
  <div
    style={{
      background: "white",
      padding: "40px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      borderTop: "6px solid #ff4e50"
    }}
  >
    <h1
      style={{
        fontSize: "28px",
        marginBottom: "15px",
        color: "#b31217"
      }}
    >
      ✅ Submitted Successfully!
    </h1>

    <p
      style={{
        fontSize: "18px",
        color: "#444"
      }}
    >
      You have successfully submitted All the levels 🎉
    </p>
  </div>
</div>
  );
}