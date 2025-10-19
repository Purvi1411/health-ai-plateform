const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5002;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user routes for any URL starting with /api/users
app.use('/api/users', userRoutes);

// A simple welcome route for the root URL
app.get('/', (req, res) => {
  res.json({ message: "Welcome! The AI Healthcare Platform API is running. 🩺" });
});

// Start the server
// Start the server
app.listen(PORT, () => {
  // THIS IS THE TEST MESSAGE WE NEED TO SEE
  console.log(`--- SERVER RESTARTED AT: ${new Date().toLocaleTimeString()} ---`);

  console.log(`Server is running on http://localhost:${PORT}`);
});