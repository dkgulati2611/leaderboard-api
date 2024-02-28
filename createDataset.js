const mongoose = require('mongoose');
const Leaderboard = require('./models/leaderboard');

const dotenv = require("dotenv");

dotenv.config();
const url = process.env.MONGO_URL;
// Connect to MongoDB
mongoose.connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to generate random timestamp between two dates
function getRandomDate(startDate, endDate) {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

// Function to generate random leaderboard data
function generateRandomLeaderboardData() {
  const countries = ['US', 'UK', 'DE', 'FR', 'CA', 'AU', 'JP', 'CN', 'IN', 'BR']; // Add more countries if needed
  const names = ['John', 'Alice', 'Bob', 'Emily', 'Michael', 'Sophia', 'Jacob', 'Olivia', 'Daniel', 'Emma']; // Add more names if needed

  const randomUID = () => Math.random().toString(36).substr(2, 5);
  const randomName = () => names[Math.floor(Math.random() * names.length)];
  const randomScore = () => Math.floor(Math.random() * 1000);
  const randomCountry = () => countries[Math.floor(Math.random() * countries.length)];
  const randomTimeStamp = () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 14); // Last two weeks
    return getRandomDate(startDate, endDate);
  };

  const data = [];
  for (let i = 0; i < 10000; i++) {
    data.push({
      UID: randomUID(),
      Name: randomName(),
      Score: randomScore(),
      Country: randomCountry(),
      TimeStamp: randomTimeStamp()
    });
  }
  return data;
}

// Insert random leaderboard data into MongoDB
async function insertRandomData() {
  try {
    const data = generateRandomLeaderboardData();
    await Leaderboard.insertMany(data);
    console.log('Inserted 10000 rows of data into MongoDB.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}

// Call function to insert random data
insertRandomData();
