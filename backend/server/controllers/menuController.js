const MenuItem = require('../models/MenuItem');

// CREATE a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantId, name, description, price, category, image } = req.body;

    const menuItem = new MenuItem({
      restaurant: restaurantId,
      name,
      description,
      price,
      category,
      image,
    });

    await menuItem.save();
    res.status(201).json({ message: 'Menu item created', menuItem });
  } catch (err) {
    console.error('Error creating menu item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ all menu items for a restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await MenuItem.find({ restaurant: restaurantId });
    res.status(200).json(menu);
  } catch (err) {
    console.error('Error fetching menu:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ a single menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (err) {
    console.error('Error fetching menu item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated', menuItem: updatedItem });
  } catch (err) {
    console.error('Error updating menu item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (err) {
    console.error('Error deleting menu item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
