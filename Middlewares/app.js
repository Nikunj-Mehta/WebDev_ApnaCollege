const express = require("express");
const app = express();

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
  throw new Error("ACCESS DENIED!"); // we can throw user defined error.
};

// // Express default error handler -> middleware
// app.get("/wrong", (req, res) => {
//   abcd = abcd;
// });

app.get("/api", checkToken, (req, res) => { // middleware passed as a function.
  res.send("data");
});

app.get("/", (req, res) => {
  res.send("Hello, I am root");
});

app.get("/random", (req, res) => {
  res.send("This is a random page");
});

app.listen(8080, () => {
  console.log("Server is listening to port: 8080");
});