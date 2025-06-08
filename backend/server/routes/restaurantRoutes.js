const express = require('express');
const router = express.Router();

const {
  registerRestaurant,
  loginRestaurant,
} = require('../controllers/restaurantController');

// POST /api/restaurants/register - Register a new restaurant
router.post('/register', registerRestaurant);

// POST /api/restaurants/login - Login for restaurant
router.post('/login', loginRestaurant);

module.exports = router;
