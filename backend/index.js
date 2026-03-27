require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());
// ✅ CONNECT TO MONGO ATLAS
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ SAMPLE PUZZLES
const puzzles = [
  { id: 1, type: "image", question: "Unscramble the word from the image", image: "/images/planet.png", answer: "LIBRARY" },
  { id: 2, type: "image", question: "Guess the animal", image: "/images/camel.png", answer: "camel" },
  { id: 3, type: "custom", question: "Instagram puzzle", answer: "chiku" }
];

// ✅ GET PUZZLE
app.get("/puzzle/:id", (req, res) => {
  const puzzle = puzzles.find(p => p.id == req.params.id);
  if (!puzzle) return res.json({ error: "Puzzle not found" });
  res.json(puzzle);
});

// ✅ CHECK ANSWER
app.post("/check", (req, res) => {
  const { id, answer } = req.body;
  const puzzle = puzzles.find(p => p.id == id);
  if (!puzzle || !answer) return res.json({ correct: false });
  const correct = puzzle.answer.toLowerCase().trim() === answer.toLowerCase().trim();
  res.json({ correct });
});

// ✅ REGISTER USER
app.post("/register", async (req, res) => {
  try {
    const { name, roll, teamName } = req.body;
    let user = await User.findOne({ roll });
    if (!user) {
      user = new User({ name, roll, teamName });
      await user.save();
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// ✅ SAVE PUZZLE PROGRESS
app.post("/save", async (req, res) => {
  try {
    const { name, roll, teamName, puzzle, levelTime, totalTime } = req.body;
    let user = await User.findOne({ roll });
    if (!user) user = new User({ name, roll, teamName });

    if (puzzle === 1) user.puzzle1Time = levelTime;
    if (puzzle === 2) user.puzzle2Time = levelTime;
    if (puzzle === 3) user.puzzle3Time = levelTime;

    user.timeTaken = totalTime;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// ✅ LEADERBOARD (TOP 10)
app.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ timeTaken: 1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.json([]);
  }
});

// ✅ ALL USERS (Admin)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ timeTaken: 1 });
    res.json(users);
  } catch (err) {
    res.json([]);
  }
});

// ✅ START SERVER
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));