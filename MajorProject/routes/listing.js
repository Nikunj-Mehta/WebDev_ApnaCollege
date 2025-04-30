const express = require("express");
const router =  express.Router(); // Created a router object.
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// MVC
const listingController = require("../controllers/listings.js");


// Index Route
router.get("/", wrapAsync(listingController.index));


// Create: New Route Must be written before as it might be interpreted as listings/:id
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create route
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));


// Read: Show route
router.get("/:id", wrapAsync(listingController.showListing));


// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
