const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

app.use(express.json());

// Existing routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));

// Add order routes here
app.use('/api/orders', require('./routes/orderRoutes'));

// 404 handler and error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
