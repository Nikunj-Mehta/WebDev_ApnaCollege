const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); // for static files css, js common for all webpages.

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); // Jo humne listingSchema create kra hai using Joi uske andr hum check kr rhe hai ki jo bhi req ki body m hai vo valid hai ya nhi.
  if(error) {
    let errMsg = error.details.map((el) => el.message).join(","); // join all the error details or multiple details with ,
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

// Index Route
app.get("/listings", wrapAsync(async (req, res) => {
  let allListings = await Listing.find({}); // storing all data present in collection named "listings" in a var named "allListings".
  res.render("listings/index.ejs", { allListings });
}));


// Create: New Route Must be written before as it might be interpreted as listings/:id
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => { // importing and using wrapAsync.
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));


// Read: Show route
app.get("/listings/:id", wrapAsync(async (req,res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));


// Edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

// Update route
app.put("/listings/:id", validateListing, wrapAsync(async(req, res) => { // passing server side schema validator as middleware.
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing}); // deconstruct and fill the fields by updated values
  res.redirect(`/listings/${id}`);
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

// Testing Route
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangutte, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful test");
// });

// Catch-all route for 404 errors
app.all("*", (req, res, next) => { // If the request is not accepted by any of the above then the req will be accepted here and the response will be sent form here.
  const err = new ExpressError(404, "Page Not Found!"); // to make this work download "express": "^4.18.2", current was 5.0.1 which is unstable.
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Something went wrong"} = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is listening to port: 8080");
});