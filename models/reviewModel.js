const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: String,
  rating: Number,
  createdAt: Date.now(),
  tour: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  ],
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'Review must belong to a user'],
    },
  ],
 },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model('Tour', reviewSchema);

module.exports = Review;
