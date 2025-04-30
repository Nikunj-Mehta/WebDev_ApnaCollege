const express = require("express");
const router =  express.Router(); // Created a router object. to get parent params.
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");

// MVC
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignupFrom);

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", userController.renderLoginFrom);

router.post("/login",
  saveRedirectUrl,  // just before passport logges in user we need to save the value in locals. For that we called this function because passport resets all values but can't reset locals.
  passport.authenticate("local", { // passport.authenticate: used as route middleware to authenticate requests. 
    failureRedirect: "/login", // failureRedirect in case of failure redirect to /login page.
    failureFlash: true // failureFlash if any error occurs or user enters wrong username or password then that is displayed as a flash msg.
  }), 
  wrapAsync(userController.login));

router.get("/logout", isLoggedIn, userController.logout);

module.exports = router;