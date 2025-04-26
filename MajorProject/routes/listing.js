const express = require("express");
const router =  express.Router(); // Created a router object.
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");

// to validate server side listing using joi
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); // Jo humne listingSchema create kra hai using Joi uske andr hum check kr rhe hai ki jo bhi req ki body m hai vo valid hai ya nhi.
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(","); // join all the error details or multiple details with ,
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


// Index Route
router.get("/", wrapAsync(async (req, res) => {
  let allListings = await Listing.find({}); // storing all data present in collection named "listings" in a var named "allListings".
  res.render("listings/index.ejs", { allListings });
}));


// Create: New Route Must be written before as it might be interpreted as listings/:id
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs"); 
});

// Create route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => { // importing and using wrapAsync. we need isLoggedIn here because if someone sends post req from hoppscotch.
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success", "New Lisiting Created!");
  res.redirect("/listings");
}));


// Read: Show route
router.get("/:id", wrapAsync(async (req,res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate("reviews"); // .populate("reviews") to get all the detail ie entire object in review doc.
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));


// Edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  
  res.render("listings/edit.ejs", { listing });
}));

// Update route
router.put("/:id", isLoggedIn, validateListing, wrapAsync(async(req, res) => { // passing server side schema validator as middleware.
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing}); // deconstruct and fill the fields by updated values
  req.flash("success", "Lisiting Updated!");
  res.redirect(`/listings/${id}`);
}));

// Delete route
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Lisiting Deleted!");
  res.redirect("/listings");
}));

module.exports = router;
