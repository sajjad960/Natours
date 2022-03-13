const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//creating a test schema indexing
//sometimes this type index doesn't get set immidiately
reviewSchema.index({tour: 1, user: 1}, {unique: true})

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'users',
    select: 'name photo',
  })
})

const Review = mongoose.model('Tour', reviewSchema);

module.exports = Review;


// All about nested route example
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// GET /tour/234fad4/reviews/8789778da
