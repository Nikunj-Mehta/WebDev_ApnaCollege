const express = require("express");
const router =  express.Router(); // Created a router object.
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js"); // MVC
const multer = require("multer"); // to parse form's data we are using multer
const upload = multer(({dest: "uploads/"})); // Multer will extract files from form's data and it will upload it in a folder named uploads which is created automatically. We are storing it in a folder for now but later we will put it on cloud.


// Router.route a way to group together routes with different verbs but same path.
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index Route
  // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing)); // Create route
  .post(upload.single('listing[image]'), (req, res) => { // Jaise he post req aye "/" pr waise he multer jo listingImage se single image aa rhe hai vo uploads naam k folder m upload kr de.
    res.send(req.file); // becz we are using multer and all file related data will appear here.
  })
// Create: New Route Must be written before as it might be interpreted as listings/:id
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Read: Show route
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)) // Update route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete route

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
