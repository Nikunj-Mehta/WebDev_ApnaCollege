const Listing = require("../models/listing.js");

// Its job is to render all the listings.
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({}); // storing all data present in collection named "listings" in a var named "allListings".
  res.render("listings/index.ejs", { allListings });
};

// If the user wants to add a new listing, it will render a form asking for the required listing information.
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// After receiving data from the new listing form, save it to the database and re-render the listings page with the new listing included.
module.exports.createListing = async (req, res, next) => { // importing and using wrapAsync. we need isLoggedIn here because if someone sends post req from hoppscotch.
  const newListing = new Listing(req.body.listing);
  // console.log(req.user); // Passport object stores all the current user related info in our req object and we can verify that here.
  newListing.owner = req.user._id; // to add owner who is logged in on our website as the owner of the new listing.
  await newListing.save();
  req.flash("success", "New Lisiting Created!");
  res.redirect("/listings");
};

// Takes the ID of the clicked listing(as all listings are enclosed in anchor tag <a> clicking anywhere on card will redirect to listings/:id), finds it from the database, and displays it.
module.exports.showListing = async (req,res) => {
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
};

// Takes the ID of the clicked listing(where the edit button is), renders the edit form if the listing exists; otherwise, displays an error message and redirects to /listings.
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  
  res.render("listings/edit.ejs", { listing });
};

// Takes the data from the edit form, updates it in the database, and re-renders the listing with the changes.
module.exports.updateListing = async(req, res) => { // passing server side schema validator as middleware.
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing}); // deconstruct and fill the fields by updated values
  req.flash("success", "Lisiting Updated!");
  res.redirect(`/listings/${id}`);
};

// Takes the ID of the clicked listing (where the delete button is), finds it in the database, and deletes it.
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Lisiting Deleted!");
  res.redirect("/listings");
};

