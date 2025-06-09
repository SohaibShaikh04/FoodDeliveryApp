const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

// Create a new order
router.post('/create', createOrder);

// Get orders for a user
router.get('/user/:userId', getOrdersByUser);

// Update order status
router.put('/update/:orderId', updateOrderStatus);

// Delete an order
router.delete('/delete/:orderId', deleteOrder);

module.exports = router;
