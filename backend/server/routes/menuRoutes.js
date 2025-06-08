const express = require('express');
const router = express.Router();
const {
  createMenuItem,
  getMenuByRestaurant,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

// CREATE
router.post('/', createMenuItem);

// READ all menu items for a restaurant
router.get('/restaurant/:restaurantId', getMenuByRestaurant);

// READ one item by ID
router.get('/:id', getMenuItemById);

// UPDATE
router.put('/:id', updateMenuItem);

// DELETE
router.delete('/:id', deleteMenuItem);

module.exports = router;
