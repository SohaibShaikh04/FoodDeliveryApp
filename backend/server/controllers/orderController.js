const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, totalPrice, deliveryTime } = req.body;

    const newOrder = new Order({
      user: userId,
      restaurant: restaurantId,
      items,
      totalPrice,
      deliveryTime,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// Get all orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate('items.menuItem', 'name price') // Populating menu item name & price
      .populate('restaurant', 'name');

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err.message);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).json({ message: 'Server error while updating order' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err.message);
    res.status(500).json({ message: 'Server error while deleting order' });
  }
};
