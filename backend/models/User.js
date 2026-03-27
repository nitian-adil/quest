const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  roll: String,
  teamName: String,

  puzzle1Time: Number, // seconds
  puzzle2Time: Number,
  puzzle3Time: Number,

  timeTaken: Number // total seconds
});

module.exports = mongoose.model("User", userSchema);