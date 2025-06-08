const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

app.use(express.json({ strict: false }));

// Test routes
app.get('/api/restaurants/test', (req, res) => {
  res.json({ message: 'Restaurant test route works!' });
});
app.get('/api/users/test', (req, res) => {
  res.json({ message: 'User test route works!' });
});
//Testing routes on postman 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
