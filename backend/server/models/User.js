const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'restaurant'], default: 'customer' },
  address: {
    type: String,
    required: function () {
      return this.role === 'customer'; // address only required for customers
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0] // [lng, lat]
    }
  }
}, { timestamps: true });

// Index for geospatial queries (useful for customer location-based delivery)
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
