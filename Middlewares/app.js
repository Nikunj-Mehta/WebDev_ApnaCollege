const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// Middleware -> response send, if middleware sends some other response then the "Hello, I am root" will not be printed even if the req is sent to "/" route.
// app.use((req, res) => {
//   let { query } = req.query; // generally middleware's work is not to send response, their work is next jo cheez hone wali hai usse execute krvana. 
//   console.log(query);
//   console.log("Hi, I am middleware"); // If we send req to localhost:8080 then the middleware will come in between we can see console.log but the "/" route's content will not appear due to middleware.
//   res.send("Middleware finished"); // always this response will come even if we send req to "/random" because app.use sends responose to every request route doesn't matter.
// });

// app.use((req, res, next) => {
//   console.log("Hi, I am 1st middleware");
//   next(); // jis route pr request aye hai no hona start ho jyega next kaam jo bhi hai vo hona start ho jyega. Pr Agar middle ware hai to next() middleware ko call krega.
// });

// app.use((req, res, next) => {
//   console.log("Hi, I am 2nd middleware");
//   next(); // jis route pr request aye hai no hona start ho jyega next kaam jo bhi hai vo hona start ho jyega.
// });

// Path specific middleware
// app.use("/random", (req, res, next) => {
//   console.log("I am middleware only for random"); // work for /random/anything.
//   next();
// });

// Utility middleware: useful middleware.
// logger - morgan.
// app.use( (req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

// custom error
// app.use((req, res) => {
//   res.status(404).send("Page not found!"); // if req matches any of the path above then this will not run as res is sent. If not then this will be executed.
// });

// Using middleware to verify data
const checkToken = (req, res, next) => {
  let { token } = req.query;
  if(token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "ACCESS DENIED!"); // we can throw user defined error.
};

app.get("/api", checkToken, (req, res) => { // middleware passed as a function.
  res.send("data");
});

app.get("/", (req, res) => {
  res.send("Hello, I am root");
});

app.get("/random", (req, res) => {
  res.send("This is a random page");
});

// Express default error handler -> middleware
app.get("/err", (req, res) => {
  abcd = abcd; 
});

// Error handling middleware: custom error handler
app.use((err, req, res, next) => {
  let {status = 500, message = "Some error occurred"} = err; // Extracting status and message. Given default value 500 to status
  // next(err); // next() will return page not found, eventhough the page exists. but if we use next(err) this will trigger express default error handler.
  res.status(status).send(message); // it will return user defined err, instead of express default err.
});

// app.use((err, req, res, next) => {
//   console.log("--------ERROR 2 Middleware -----------"); // After first this error handler will be called and after this
//   next(err); // Express default error handler will be called.
// });



app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden");
});

app.listen(8080, () => {
  console.log("Server is listening to port: 8080");
});