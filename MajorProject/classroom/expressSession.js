const express = require("express");
const app = express();
const session = require("express-session"); // npm package, middleware.
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring", // secret use to sign the cookie.(Signed cookie)
  resave: false, 
  saveUninitialized: true
};

app.use(session(sessionOptions)); // for every req we will get a sessionId stored in our browser in the form of a cookie and that sessionId will be same for all the type of requests and routes. The data related to 1 sesssion is stored by express-session and also creates a sessionId of that session, this sessionId is stored in client's browser as cookie. (last two name-value pairs)To remove the warning.
app.use(flash());  // using this we can flash msg and they gets deleted once displayed.

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success"); // used to pass variables to templates rendered by res.render
  res.locals.errorMsg = req.flash("error");
  next();
})

// Storing and using info
app.get("/register", (req, res) => { // we will extract name form query string.
  let { name="anonymous" } = req.query; // default value to name = anonymous.
  // console.log(req.session); // It is an object
  req.session.name = name; // We can create new variables. We can store the info in this way
  console.log(req.session.name); // Now we can access this value in different functions too.
  
  if(name === "anonymous") {
    req.flash("error", "User not registered");
  } else {
    req.flash("success", "User registered successfully"); // flash msg is created, but to display it we need to pass the message to ejs template.
  }

  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  // console.log(req.flash("success")); // by using the key "success" we can access the message.
  
  res.render("page.ejs", {name: req.session.name}); // we can access the stored info in diff routes(pages) in this way.
});

// app.get("/reqcount", (req, res) => {
//   if(req.session.count) { // req.session = Tracks a single session and req.session.count = counts the no of times req is sent in a single session, whethre from same tab or from different tab but in same browser.
//     req.session.count++;
//   } else {
//     req.session.count = 1; // we can define our variables in req.session it .count
//   }
//   res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successful");
// });

app.listen(3000, () => {
  console.log("Server is listenig through port: 3000")
});