const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String }, // e.g., Starter, Main Course
  image: String, // (optional) for future upload feature
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
