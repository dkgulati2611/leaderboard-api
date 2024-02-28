// models/leaderboard.js

const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  UID: String,
  Name: String,
  Score: Number,
  Country: String,
  TimeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
