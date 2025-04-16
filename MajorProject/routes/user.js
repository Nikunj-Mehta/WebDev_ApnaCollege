const express = require("express");
const router =  express.Router(); // Created a router object. to get parent params.
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");


router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req,res) => {
  try{
    let { username, email, password } = req.body;
    const newUser = new User({username, email});
    const registeredUser = await User.register(newUser, password); // this method authomatically forces user to enter unique username. if not it will give "user with this username already exists." error
    console.log(registeredUser);
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
  } catch(err) {
    req.flash("error", err.message);
    res.redirect("/signup"); // we used try catch to avoid going to random page and stay on sign-Up page if any error occured
  }
}));

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), wrapAsync(async (req, res) => { // passport.authenticate: used as route middleware to authenticate requests. failureRedirect in case of failure redirect to /login page, failureFlash if any error occurs or user enters wrong username or password then that is displayed as a flash msg.
  req.flash("success", "Welcome back to Wanderlust");
  res.redirect("/listings");
}))


module.exports = router;