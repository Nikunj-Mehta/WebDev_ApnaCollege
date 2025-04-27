const express = require("express");
const router =  express.Router({mergeParams: true}); // Created a router object. to get parent params.
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview } = require("../middleware.js");

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
  req.flash("success", "New Review Created!");

  res.redirect(`/listings/${listing._id}`)
}));

// Reviews: Delete route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}) // $pull is a mongoose operator which removes the review which match the id form reviews array.
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`)
}));

module.exports = router;