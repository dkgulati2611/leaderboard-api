const express = require("express");
const mongoose = require("mongoose");
const Leaderboard = require("./models/leaderboard");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.get("/leaderboard/current-week", async (req, res) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date();
    endOfWeek.setHours(23, 59, 59, 999);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    const leaderboard = await Leaderboard.find({
      TimeStamp: { $gte: startOfWeek, $lte: endOfWeek },
    })
      .sort({ Score: -1 })
      .limit(200);

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching current week leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function getCountryCode(countryName) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const countryCode = response.data[0]?.cca2; // Extract ISO 2-letter country code
    return countryCode;
  } catch (error) {
    console.error("Error resolving country name:", error);
    return null;
  }
}

// Usage example
app.get("/leaderboard/last-week/:country", async (req, res) => {
  try {
    const countryName = req.params.country;
    const countryCode = await getCountryCode(countryName);

    if (!countryCode) {
      res.status(400).json({ error: "Invalid country name" });
      return;
    }

    const endOfWeek = new Date();
    endOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() - 1);

    const startOfWeek = new Date(endOfWeek);
    startOfWeek.setDate(startOfWeek.getDate() - 6);

    const leaderboard = await Leaderboard.find({
      TimeStamp: { $gte: startOfWeek, $lte: endOfWeek },
      Country: countryCode,
    })
      .sort({ Score: -1 })
      .limit(200);

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching last week leaderboard by country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/rank/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await Leaderboard.findOne({ UID: userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const rank =
      (await Leaderboard.countDocuments({ Score: { $gt: user.Score } })) + 1;

    res.json({ ...user.toObject(), Rank: rank });
  } catch (error) {
    console.error("Error fetching user rank:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
