const express = require("express");
const router =  express.Router(); // Created a router object. to get parent params.
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");


router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req,res) => {
  try{
    let { username, email, password } = req.body;
    const newUser = new User({username, email});
    const registeredUser = await User.register(newUser, password); // this method authomatically forces user to enter unique username. if not it will give "user with this username already exists." error
    console.log(registeredUser);

    // Method to login after signup without this method we need to login explicitly after signup. It takes 2 params one is user and other is callback.
    req.login(registeredUser, (err) => { // if any error occured then it will be stored in err.
      if(err) {
        return next(err); // this will call error middleware 
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    }); // when login operation completed, user will be assigned to req.user. other req.user is undefined.
 
  } catch(err) {
    req.flash("error", err.message);
    res.redirect("/signup"); // we used try catch to avoid going to random page and stay on sign-Up page if any error occured
  }
}));

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post("/login",
  saveRedirectUrl,  // just before passport logges in user we need to save the value in locals.
  passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true
  }), 
  wrapAsync(async (req, res) => { // passport.authenticate: used as route middleware to authenticate requests. failureRedirect in case of failure redirect to /login page, failureFlash if any error occurs or user enters wrong username or password then that is displayed as a flash msg.
  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl ? res.locals.redirectUrl : "/listings"; 
  res.redirect(redirectUrl);
}));

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout((err) => { // if any error occured then it will be stored in err. It takes callback as an argument. It will remove the req.user and will make it undefined again.
    if(err) {
      return next(err); // this will call error middleware 
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;