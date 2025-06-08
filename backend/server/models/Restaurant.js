const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  cuisine: [String], // e.g., ['Indian', 'Chinese']
  rating: {
    type: Number,
    default: 4,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
}, { timestamps: true });

restaurantSchema.index({ location: "2dsphere" }); // for geolocation queries

module.exports = mongoose.model("Restaurant", restaurantSchema);
