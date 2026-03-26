import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, TextField, Button, Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Login() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [teamName, setTeamName] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("error");

  const nav = useNavigate();
  const API = import.meta.env.VITE_API_URL;
 const start = async () => {
  if (!name || !roll || !teamName) {
    setAlertMsg("⚠️ Please fill all fields");
    setAlertType("error");
    setOpenAlert(true);
    return;
  }

  // ADMIN LOGIN
  if (
    name.toLowerCase() === "adil" &&
    roll.toLowerCase() === "adil" &&
    teamName.toLowerCase() === "adil"
  ) {
    nav("/admin");
    return;
  }

  try {
    // ✅ SEND DATA TO BACKEND
     await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        roll,
        teamName,
      }),
    });

    // ✅ RESET SESSION
    localStorage.clear();

    localStorage.setItem("name", name);
    localStorage.setItem("roll", roll);
    localStorage.setItem("team", teamName);

    const startTime = Date.now();
    const endTime = startTime + 60 * 60 * 1000;

    localStorage.setItem("startTime", startTime);
    localStorage.setItem("endTime", endTime);

    nav("/puzzle/1");

  } catch (err) {
    console.error(err);
    setAlertMsg("❌ Server error");
    setAlertType("error");
    setOpenAlert(true);
  }
};

  return (
    <Box sx={styles.page}>
      {/* 🔥 Animated Blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      {/* TITLE */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography sx={styles.title}>
          🧩 QUEST CHALLENGE
        </Typography>
      </motion.div>

      {/* ORGANIZER */}
      <Typography sx={styles.organizer}>
        🎓 Organized by CollegeDekho
      </Typography>

      {/* CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={styles.card}>
          <Typography sx={styles.heading}>
            Login to Start 🚀
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={styles.input}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Roll Number"
            variant="outlined"
            sx={styles.input}
            onChange={(e) => setRoll(e.target.value)}
          />

          <TextField
            fullWidth
            label="Team Name"
            variant="outlined"
            sx={styles.input}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <Button onClick={start} sx={styles.button}>
            🚀 Start Quest
          </Button>
        </Card>
      </motion.div>

      {/* FOOTER */}
      <Typography sx={styles.footer}>
        ✨ Designed by Adil Ahmad
      </Typography>

      {/* ALERT */}
    <Snackbar
  open={openAlert}
  autoHideDuration={2500}
  onClose={() => setOpenAlert(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    severity={alertType}
    sx={styles.alert}
  >
    {alertMsg}
  </Alert>
</Snackbar>

      {/* GLOBAL ANIMATIONS */}
      <style>
        {`
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }

        @keyframes float {
          0% {transform: translateY(0px);}
          50% {transform: translateY(-30px);}
          100% {transform: translateY(0px);}
        }

        @keyframes pulseGlow {
          0% {box-shadow: 0 0 10px #8a2be2;}
          50% {box-shadow: 0 0 30px #00eaff;}
          100% {box-shadow: 0 0 10px #8a2be2;}
        }
        `}
      </style>
    </Box>
  );
}

// 🎨 STYLES
const styles = {
  page: {
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "radial-gradient(circle at top, #111 20%, #000 80%)",
    color: "#fff",
  },

  title: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: "42px",
    textShadow: "0 0 10px #FFD700, 0 0 30px #ffcc00",
  },

  organizer: {
    color: "#ffcc00",
    marginBottom: "20px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  card: {
    p: 4,
    width: 320,
    borderRadius: "20px",
    backdropFilter: "blur(20px)",
    background: "rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,215,0,0.3)",
    boxShadow: "0 0 30px rgba(255,215,0,0.3)",
  },

  heading: {
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  input: {
    mb: 2,
    input: { color: "#fff" },
    label: { color: "#aaa" },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#555",
      },
      "&:hover fieldset": {
        borderColor: "#FFD700",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFD700",
        boxShadow: "0 0 10px #FFD700",
      },
    },
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #FFD700, #ffcc00)",
    color: "#000",
    boxShadow: "0 0 15px #FFD700",
    transition: "0.3s",

    "&:hover": {
      transform: "scale(1.05)",
      background: "linear-gradient(45deg, #ffcc00, #FFD700)",
      boxShadow: "0 0 25px #FFD700",
    },
  },

  footer: {
    position: "absolute",
    bottom: "10px",
    color: "#888",
    fontSize: "12px",
  },

  alert: {
    borderRadius: "10px",
    fontWeight: "bold",
    background: "#111",
    color: "#FFD700",
    border: "1px solid #FFD700",
    boxShadow: "0 0 20px rgba(255,215,0,0.5)",
  },

  blob1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#FFD700",
    borderRadius: "50%",
    filter: "blur(140px)",
    top: "10%",
    left: "10%",
    opacity: 0.2,
    animation: "float 6s ease-in-out infinite",
  },

  blob2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#ffcc00",
    borderRadius: "50%",
    filter: "blur(140px)",
    bottom: "10%",
    right: "10%",
    opacity: 0.2,
    animation: "float 8s ease-in-out infinite",
  },
};