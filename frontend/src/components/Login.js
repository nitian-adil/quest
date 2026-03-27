import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, TextField, Button, Card, Typography, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function Login() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [teamName, setTeamName] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("error");

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const API = process.env.REACT_APP_API;

  const start = async () => {
    if (!API) {
      setAlertMsg("❌ API not configured");
      setOpenAlert(true);
      return;
    }

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
      setLoading(true);

      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, roll, teamName })
      });

      if (!res.ok) throw new Error("Register failed");

      // RESET SESSION
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
      setAlertMsg("❌ Server error. Try again.");
      setAlertType("error");
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.page}>
      {/* BLOBS */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      {/* TITLE */}
      <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Typography sx={styles.title}>🧩 QUEST CHALLENGE</Typography>
      </motion.div>

      <Typography sx={styles.organizer}>
        🎓 Organized by CollegeDekho
      </Typography>

      {/* CARD */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <Card sx={styles.card}>
          <Typography sx={styles.heading}>
            Login to Start 🚀
          </Typography>

          <TextField
            fullWidth
            label="Name"
            sx={styles.input}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Roll Number"
            sx={styles.input}
            onChange={(e) => setRoll(e.target.value)}
          />

          <TextField
            fullWidth
            label="Team Name"
            sx={styles.input}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <Button onClick={start} sx={styles.button} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "🚀 Start Quest"}
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
        <Alert severity={alertType} sx={styles.alert}>
          {alertMsg}
        </Alert>
      </Snackbar>

      {/* ANIMATIONS */}
      <style>
        {`
        @keyframes float {
          0% {transform: translateY(0px);}
          50% {transform: translateY(-30px);}
          100% {transform: translateY(0px);}
        }
        `}
      </style>
    </Box>
  );
}