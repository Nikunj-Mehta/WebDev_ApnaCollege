const express = require("express");
const router =  express.Router(); // Created a router object.
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

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
  // console.log(req.user); // Passport object stores all the current user related info in our req object and we can verify that here.
  newListing.owner = req.user._id; // to add owner who is logged in on our website as the owner of the new listing.
  await newListing.save();
  req.flash("success", "New Lisiting Created!");
  res.redirect("/listings");
}));


// Read: Show route
router.get("/:id", wrapAsync(async (req,res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate({
    path: "reviews",
     populate: { // nested populate.
      path: "author", // for every review we need its author's details too. 
     },
    }).populate("owner"); // .populate("reviews") to get all the detail ie entire object in review doc. all to get all info about owner instead of just getting their objectId.
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}));


// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  
  res.render("listings/edit.ejs", { listing });
}));

// Update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async(req, res) => { // passing server side schema validator as middleware.
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing}); // deconstruct and fill the fields by updated values
  req.flash("success", "Lisiting Updated!");
  res.redirect(`/listings/${id}`);
}));

// Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Lisiting Deleted!");
  res.redirect("/listings");
}));

module.exports = router;
