module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user); // whenever the user logs in it's related information is stored in request object. next part in middleware.js file.
  if(!req.isAuthenticated()) { // isAuthenticated: is a passport method which checks whether the user is logged in or not. If not it returns false.  And that user related info triggers isAuthenticated method
    req.flash("error", "You must be logged in to create listing!");
    return res.redirect("/login");
  }
  next(); // if user is authenticated.
}