// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Modular MongoDB connection

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB(); // Call the connection function

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Import and use routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('SugarRush API is running 🚀');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
