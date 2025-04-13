const express = require("express");
const router =  express.Router({mergeParams: true}); // Created a router object. to get parent params.
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


// to validate server side review using joi
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); // Jo humne listingSchema create kra hai using Joi uske andr hum check kr rhe hai ki jo bhi req ki body m hai vo valid hai ya nhi.
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(","); // join all the error details or multiple details with ,
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Post Review route
router.post("/", validateReview, wrapAsync(async (req, res) => {
  // let { id } = req.params;
  // let{ rating, comment } = req.body.review;
  // console.log(id);
  // console.log(rating);
  // console.log(comment);

  console.log(req.params.id); // No id parameter is received in here.

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview); // uss listing ki review array m add kr do review jo aya tha as an object.

  await newReview.save(); // First save review
  await listing.save(); // then save that added review in listing.

  // console.log("new review saved");

  res.redirect(`/listings/${listing._id}`)
}));

// Reviews: Delete route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}) // $pull is a mongoose operator which removes the review which match the id form reviews array.
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`)
}));

module.exports = router;