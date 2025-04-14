const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


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

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000, // Date.now() returns exact time in milliseconds.
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // to prevent cross scripting attacks.
  },
};

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});


app.use(session(sessionOptions));
app.use(flash()); // always use before routes.

app.use((req, res, next) => { // middleware
  res.locals.success = req.flash("success");
  // console.log(res.locals.success); // gives an array. If nothing done then empty array.
  
  res.locals.error = req.flash("error");
  next();
});

app.use("/listings", listings); // instead of listing we are using a single line.
app.use("/listings/:id/reviews", reviews); // return here is parent route "/listing/:id/reviews"

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