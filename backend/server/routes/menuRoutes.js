const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// STATIC routes first
router.post('/create', menuController.createMenuItem);
router.get('/restaurant/:restaurantId', menuController.getMenuByRestaurant);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

// DYNAMIC route at the end
router.get('/:id', menuController.getMenuItemById);

module.exports = router;
